# -*- coding: utf-8 -*-
"""
选品罗盘 · 评论分析引擎（v8.6「评论分析」页的本地分析部分）
------------------------------------------------------------
输入：amz_mcp.reviews_list() 取回的评论列表（rating/title/content），
输出：差评痛点 / 认可卖点 / 差异化机会 三组结构化结论。

对客户的可解释口径（写死在本注释里，销售话术照此说）：
  1. 本引擎只做「词典命中 + 词频统计」，不生成任何观点——每条结论
     都附真实评论摘录（quote）与提及次数，可回溯到原文核对；
  2. 差评 = 1~3 星，好评 = 4~5 星（与 ASIN 分析报告的痛点维度同口径）；
  3. 词典覆盖常见品类；未覆盖的抱怨会以「差评中的高频原文词组」
     兜底展示（保留英文原文，不翻译以免失真）；
  4. 分析在本地完成，零费用——计费只发生在取评论那一步（数据服务）。

零依赖：纯标准库 re/collections。
"""

import re
from collections import Counter

# ---------------- 词典（键=中文类目，值=英文命中词形） ----------------
# 痛点：买家抱怨什么
PAIN_LEX = {
    "尺码不合":  ["runs small", "runs large", "too small", "too large", "too big",
                 "too tight", "size chart", "sizing", "fit is", "didn't fit",
                 "doesn't fit", "way too"],
    "质量/做工": ["broke", "broken", "fell apart", "cheap quality", "poor quality",
                 "flimsy", "cheaply made", "defective", "stopped working",
                 "ripped", "torn", "cracked", "came apart", "bad quality"],
    "电池/续航": ["battery", "charge", "charging", "dies", "dead", "won't hold",
                 "drains"],
    "气味/材质": ["smell", "smells", "odor", "smells like", "chemical", "plastic smell"],
    "舒适度":    ["uncomfortable", "hurts", "painful", "scratchy", "itchy", "stiff",
                 "dig into"],
    "与描述不符": ["not as described", "not as pictured", "misleading", "different than",
                 "looks nothing like", "false advertising", "not what i expected"],
    "物流/包装": ["arrived damaged", "packaging", "box was crushed", "late",
                 "never arrived", "missing parts", "came in a bag"],
    "退货/售后": ["return", "refund", "returned it", "sending back", "waste of money",
                 "returned this"],
    "颜色/外观": ["color is off", "looks cheap", "color faded", "fades", "discolored",
                 "looks nothing"],
    "安装/使用难": ["hard to install", "difficult to", "instructions", "confusing",
                  "complicated", "hard to use", "hard to put"],
}

# 卖点：买家认可什么
PRAISE_LEX = {
    "质量好":    ["great quality", "good quality", "well made", "sturdy", "solid",
                 "high quality", "well built", "durable"],
    "性价比":    ["great price", "good price", "value for money", "worth the money",
                 "worth every penny", "great value", "affordable"],
    "好用/易用": ["easy to install", "easy to use", "easy to clean", "easy to set up",
                 "works great", "works perfectly", "perfect fit", "plug and play"],
    "外观好看":  ["looks great", "looks beautiful", "looks expensive", "cute",
                 "gorgeous", "sleek", "stylish", "matches"],
    "舒适/合身": ["comfortable", "so comfortable", "fits great", "fits perfectly",
                 "true to size", "perfect size", "soft"],
    "功能有效":  ["works like a charm", "does exactly", "does what it says",
                 "highly effective", "really works"],
    "物流快":    ["fast shipping", "arrived quickly", "quick delivery", "shipped fast",
                 "arrived on time"],
    "喜欢/推荐": ["love it", "loved it", "i love this", "highly recommend",
                 "would recommend", "buy again", "five stars", "perfect"],
}

# 词频兜底用的停用词（只列高频英文虚词，够用即可）
STOPWORDS = set("""
a an the and or but if while of to in on at for with from by as is are was were be
been being this that these those it its i me my we our you your they them he she his
her not no so very just really too more most much many some any all can will would
should could have has had do does did done what which who when where why how out up
down off over under again then once here there about into through during before
after above below both each few other same than only own s t don now d ll m o re ve
y ain aren couldn didn doesn hadn hasn haven isn ma mightn mustn needn shan shouldn
wasn weren won wouldn like get got go went one two also after get go make made still
even because them us am
""".split())

_BIGRAM_RE = re.compile(r"[a-z]+(?:'[a-z]+)?")
_QUOTE_MAX = 180   # 摘录入库上限（字符）


def _words(text):
    return _BIGRAM_RE.findall(str(text or "").lower())


def _phrases2(text):
    """二元词组（保序），用于「差评独有高频词组」兜底。"""
    w = _words(text)
    return set(zip(w, w[1:]))


def _clip(text, limit=_QUOTE_MAX):
    s = re.sub(r"\s+", " ", str(text or "")).strip()
    return s[: limit - 1] + "…" if len(s) > limit else s


def _mine(texts, lexicon, min_hits):
    """词典挖掘：返回 [{key,label,count,quote}] 按命中次数降序。"""
    out = []
    for label, forms in lexicon.items():
        hits, quote = 0, ""
        for t in texts:
            low = " " + " ".join(_words(t)) + " "
            if any(re.search(r"(?<![a-z])" + re.escape(f) + r"(?![a-z])", low)
                   for f in forms):
                hits += 1
                if not quote:
                    quote = _clip(t)
        if hits >= min_hits:
            out.append({"key": label, "label": label, "count": hits, "quote": quote})
    out.sort(key=lambda x: -x["count"])
    return out


def _contrast_phrases(neg_texts, pos_texts, top_n=5):
    """差评里高频、好评里罕见的原文二元词组（兜底，防词典没覆盖到）。"""
    neg_c, pos_c = Counter(), Counter()
    for t in neg_texts:
        neg_c.update(_phrases2(t))
    for t in pos_texts:
        pos_c.update(_phrases2(t))
    out = []
    for (a, b), n in neg_c.most_common(220):
        if n < 2:
            break
        if a in STOPWORDS or b in STOPWORDS:
            continue
        if pos_c.get((a, b), 0) >= n:      # 好评里也高频 → 不算抱怨
            continue
        out.append({"key": f"{a} {b}", "label": f"{a} {b}", "count": n,
                    "quote": ""})
        if len(out) >= top_n:
            break
    return out


def analyze(reviews):
    """主入口。reviews: [{rating:int, title, content, date?}, ...] → 结构化结果。"""
    items = []
    for r in reviews or []:
        rating = r.get("rating") or 0
        try:
            rating = int(float(rating))
        except (TypeError, ValueError):
            rating = 0
        text = " ".join(x for x in [r.get("title"), r.get("content")] if x)
        if rating and text.strip():
            items.append({"rating": rating, "text": text})

    neg = [i["text"] for i in items if i["rating"] <= 3]
    pos = [i["text"] for i in items if i["rating"] >= 4]
    # 门槛：差评样本 >=12 条时要求类目至少出现 2 次；样本少时出现 1 次即列
    min_hits = 2 if len(neg) >= 12 else 1
    min_praise = 2 if len(pos) >= 12 else 1

    pains = _mine(neg, PAIN_LEX, min_hits)
    praises = _mine(pos, PRAISE_LEX, min_praise)

    # 兜底：词典没覆盖的抱怨，用差评独有高频词组补位（最多补到 6 条痛点）
    if len(pains) < 6:
        for extra in _contrast_phrases(neg, pos, top_n=6 - len(pains)):
            pains.append(extra)

    # 差异化机会 = 前 3 条痛点改写成「解决 X」句式（纯模板改写，观点可回溯）
    opportunities = []
    for p in pains[:3]:
        zh = "解决" in p["key"] or all(ord(c) > 127 or c == " " for c in p["key"])
        opportunities.append({
            "key": p["key"],
            "label": (f"在详情页/规格表正面回应「{p['label']}」" if zh
                      else f"针对差评高频词「{p['label']}」做差异化说明"),
            "count": p["count"],
            "quote": p.get("quote", ""),
        })

    by_star = Counter(i["rating"] for i in items)
    summary = {
        "total": len(items),
        "neg_count": len(neg),
        "pos_count": len(pos),
        "by_star": {str(s): by_star.get(s, 0) for s in range(1, 6)},
    }
    if items:
        summary["avg_rating"] = round(sum(i["rating"] for i in items) / len(items), 2)
    return {"summary": summary, "pains": pains[:8],
            "praises": praises[:8], "opportunities": opportunities}


# ---------------- 自测（内嵌英语评论样本，不联网、零费用） ----------------
_FIXTURE = [
    {"rating": 1, "title": "Broke after two days", "content": "Cheap quality plastic. It fell apart when I picked it up. Waste of money, requesting a refund."},
    {"rating": 2, "title": "Runs small", "content": "Order a size up, it runs small and the size chart is wrong. Uncomfortable all day."},
    {"rating": 1, "title": "Battery dies", "content": "Battery dies within an hour. Stopped working completely after a week."},
    {"rating": 2, "title": "Smells like chemicals", "content": "Strong chemical smell out of the box. Had to air it out for days, still smells."},
    {"rating": 3, "title": "Not as described", "content": "Color is off, not as pictured. Smell issue too. Otherwise okay-ish for the price."},
    {"rating": 3, "title": "Confusing setup", "content": "Instructions are confusing and the app is buggy, but support tried to help."},
    {"rating": 5, "title": "Great value", "content": "Great quality for the price, easy to install, works great. Highly recommend!"},
    {"rating": 4, "title": "Solid little gadget", "content": "Well made and sturdy. Easy to use. Wish it came in more colors."},
    {"rating": 5, "title": "Perfect fit", "content": "True to size and so comfortable. Looks expensive, matches my kitchen perfectly."},
    {"rating": 5, "title": "Fast shipping", "content": "Arrived quickly, packaged well. Love it, would recommend to anyone."},
]

if __name__ == "__main__":
    print("== 评论分析引擎自测（本地样本，不联网）==")
    r = analyze(_FIXTURE)
    s = r["summary"]
    assert s["total"] == 10 and s["neg_count"] == 6 and s["pos_count"] == 4, s
    assert s["by_star"]["1"] == 2 and s["by_star"]["5"] == 3, s
    assert abs(s["avg_rating"] - 3.1) < 0.01, s
    keys = [p["key"] for p in r["pains"]]
    assert "质量/做工" in keys and "尺码不合" in keys, keys          # 词典命中
    assert "电池/续航" in keys and "气味/材质" in keys, keys
    assert r["pains"][0]["quote"], "痛点应带摘录"
    pk = [p["key"] for p in r["praises"]]
    assert "质量好" in pk and "喜欢/推荐" in pk, pk
    assert len(r["opportunities"]) == 3 and all(o["count"] for o in r["opportunities"])
    # 空输入不炸
    empty = analyze([])
    assert empty["summary"]["total"] == 0 and empty["pains"] == []
    print(f"[OK] 10 条样本 → 痛点 {len(r['pains'])} 条 / 卖点 {len(r['praises'])} 条 / 机会 {len(r['opportunities'])} 条")
    for p in r["pains"][:3]:
        print(f"     - {p['key']} ×{p['count']}  “{p['quote'][:60]}”")
