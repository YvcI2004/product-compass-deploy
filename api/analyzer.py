# -*- coding: utf-8 -*-
"""
选品罗盘 · ASIN 单品分析器（真 demo 第一步：Amazon 美国站 · 半自动采集版）
============================================================
客户给你一个 Amazon 商品链接或 ASIN → 你在商品页抄 6 个公开数字
→ 本模块用透明公式算出机会指数（0-100）→ 前端生成可导出 PDF 的分析报告。

为什么是「半自动」：
  Amazon 没有免费官方数据接口，直接爬页面又违反平台条款。
  所以 v1 的分工是——页面数字人工抄（约 3 分钟/品），计算全部自动。
  以后接入 Keepa 等付费数据源时，只需替换「采集」这一步，公式一行不动。

运行自测（在 api 目录）：
  .venv\\Scripts\\python.exe analyzer.py
"""

import re
import uuid
from datetime import datetime


# ============================================================
# 可调参数（worldview 和管线一样透明，客户问起就这么解释）
# ============================================================

# 五维权重（合计 100）：需求最重要，其次竞争，再是市场活跃度
SCORE_WEIGHTS = {"demand": 35, "compete": 25, "activity": 20, "painpoint": 10, "price": 10}

GRADE_A = 75   # ≥ 75 → A 类 · 建议优先评估
GRADE_B = 55   # ≥ 55 → B 类 · 值得跟进观察

# 预估月销达到 3000 件，需求维度算满格（与管线 DEMAND_BASE 同一口径）
DEMAND_FULL = 3000

# BSR → 月销估算区间（Amazon 美国站大类经验曲线：排名越靠前卖得越多）
# 每行含义：BSR ≤ 第一列 → 月销大约在 (低, 高) 件之间
BSR_TIERS = [
    (100,    (8000, 30000)),
    (500,    (3000, 10000)),
    (1000,   (1500, 5000)),
    (5000,   (600, 2000)),
    (10000,  (300, 1000)),
    (50000,  (50, 300)),
]
BSR_TAIL = (0, 100)   # 排在 50,000 名以外：长尾链接

# 关键词搜索结果数 → 竞争友好度（分越高代表越容易切进去）
COMPETE_TIERS = [
    (1000,    1.0,  "供给稀缺"),
    (5000,    0.7,  "竞争较小"),
    (20000,   0.45, "竞争中等"),
    (100000,  0.2,  "竞争较大"),
]
COMPETE_TAIL = (0.05, "红海市场")

# 最新评论距今天数 → 市场活跃度（评论区是免费的销售探测器：
# 卖得越快的链接，新评论来得越勤）
ACTIVITY_TIERS = [
    (1,   1.0,  "极活跃（几乎每天都有新评论）"),
    (3,   0.8,  "活跃"),
    (7,   0.6,  "稳定出单"),
    (15,  0.35, "趋缓"),
    (30,  0.15, "转冷"),
]
ACTIVITY_TAIL = (0.0, "基本休眠")
ACTIVITY_NO_REVIEW = (0.25, "无评论（新链接或冷门品）")

# 价格带 → 价格空间（亚马逊精品的经典黄金价格带是 $15–45：
# 有毛利，又不至于客单太高压资金）
PRICE_BANDS = [
    (8,    0.2,  "利润太薄，难覆盖物流与佣金"),
    (15,   0.7,  "可做，毛利偏薄"),
    (45,   1.0,  "黄金价格带 $15–45"),
    (80,   0.7,  "可做，客单偏高"),
]
PRICE_TAIL = (0.45, "高客单，资金与售后门槛高")

RISK_TEXT = (
    "本报告基于 Amazon 商品页公开信息的人工采集数据，非 Keepa/卖家精灵等付费数据源；"
    "立项或下单前建议复核价格历史与销量曲线。"
)

# ============================================================
# v7.3 智能分析：缺数推补 · 置信度 · 风险旗标 · 行动建议
# ============================================================

# 保险丝：一键关掉整套推补逻辑，回到「五项全填才给算」的老行为
INFER_ENABLED = True

# 推补默认值——刻意选「中性档」，不给推补品白送分数：
#   rating 4.4 + reviews 150 → painpoint 落 0.35 中性分支（不是 1.0 满分）
#   price 12.99 → 价格维度 0.7 档（不是黄金带 1.0）
#   results 20000 → 竞争维度 0.45 档（不是稀缺 1.0）
#   days 7 → 活跃度 0.6 档（不是极活跃 1.0）
# 客户问起就这么解释：缺的数按「不好不坏的中性市场」假设算，置信度会如实打折。
INFER_DEFAULTS = {
    "results": 20000,
    "days": 7,
    "rating": 4.4,
    "reviews": 150,
    "price": 12.99,
}

# 置信度扣分 = 所影响维度权重的约 40%（results→compete 25 分权、days/reviews→activity
# 20 分权……），合计最多 -32，保证最低还剩 68（推补品不至于被贬成「低置信」）
INFER_PENALTY = {"results": 10, "days": 8, "reviews": 6, "rating": 4, "price": 4}

# 推补字段的中文标签（置信度提示和前端展示共用）
INFER_LABELS = {
    "results": "搜索结果数", "days": "最新评论距今天数", "rating": "评分",
    "reviews": "评论总数", "price": "价格",
}

# 疑似大牌词（命中 → 挥「品牌撞车」旗标，提醒授权/侵权风险；
# "lg " 带尾空格防止误中 bulgarian 之类的单词中段）
BRAND_WORDS = [
    "nike", "adidas", "puma", "under armour", "apple", "samsung", "sony", "lg ",
    "philips", "lego", "disney", "marvel", "pokemon", "barbie", "huggies",
    "pampers", "kleenex", "gatorade", "nestle", "coleman", "yeti",
]

# 季节性信号词（命中 → 挥「季节性」旗标，提醒备货节奏；
# 用 "ski" 会误中 skirt，所以只收 skiing/snow/winter 这类整词）
SEASONAL_WORDS = [
    "christmas", "xmas", "halloween", "valentine", "easter", "thanksgiving",
    "4th of july", "independence day", "back to school", "swim", "skiing",
    "snow", "winter", "summer",
]


def infer_missing(values):
    """
    五个可推补字段（price/rating/reviews/results/days）的缺省推断。
    入参 values：{key: 数字或 None}（days 在 reviews==0 时本来就可以是 None）。
    返回 (有效值 dict, 推补键列表, 置信度 int, 提升建议 list)。

    days 的特殊处理：
      评论数为 0 → 不推补（走「无评论」分支，填了反而白扣置信度）；
      评论数缺失或 >0 且 days 缺失 → 按中性档推补。
    """
    vals = dict(values)
    inferred = []
    penalty = 0
    for key in ("price", "rating", "reviews", "results"):
        if vals.get(key) is None:
            vals[key] = INFER_DEFAULTS[key]
            inferred.append(key)
            penalty += INFER_PENALTY[key]

    if vals.get("days") is None and vals["reviews"]:
        vals["days"] = INFER_DEFAULTS["days"]
        inferred.append("days")
        penalty += INFER_PENALTY["days"]

    confidence = max(40, 100 - penalty)
    hints = []
    for key in ("results", "days", "reviews", "rating", "price"):
        if key in inferred:
            up = min(100, confidence + INFER_PENALTY[key])
            hints.append(f"补上「{INFER_LABELS[key]}」→ 置信度升至 {up}")
    return vals, inferred, confidence, hints


def confidence_level(score):
    """数值 → 文字档（不用 A/B/C 字母，避免和机会等级 A类/B类 撞车）。"""
    if score >= 90:
        return "高"
    if score >= 75:
        return "中高"
    if score >= 60:
        return "中"
    return "低"


def build_flags(inp, name, keyword):
    """
    风险旗标：从已有数据里再榨一层信号（不新增任何采集项）。
    返回 [{key, level, text}]，level ∈ risk(红) / warn(琥珀) / info(蓝灰)。
    """
    flags = []
    blob = f"{name} {keyword}".lower()

    if inp["reviews"] >= 3000 and inp["rating"] >= 4.5:
        flags.append({
            "key": "review_moat", "level": "risk",
            "text": f"评论护城河：{int(inp['reviews']):,} 条评论且评分 {inp['rating']:g}，"
                    "新链接正面切入成本很高，优先考虑差异化改良",
        })
    hit = next((w for w in BRAND_WORDS if w in blob), None)
    if hit:
        flags.append({
            "key": "brand_clash", "level": "warn",
            "text": f"疑似大牌产品（匹配到「{hit.strip()}」）：先排查品牌授权与侵权风险，再决定是否推进",
        })
    if any(w in blob for w in SEASONAL_WORDS):
        flags.append({
            "key": "seasonal", "level": "warn",
            "text": "季节性信号：需求集中在特定节日/季节，旺季前 2–3 个月备货，季末及时清库存",
        })
    if inp["price"] < 8:
        flags.append({
            "key": "price_low", "level": "warn",
            "text": f"售价 ${inp['price']:g} 低于 $8：毛利空间非常薄，难以覆盖 FBA 与推广成本",
        })
    elif inp["price"] > 80:
        flags.append({
            "key": "price_high", "level": "warn",
            "text": f"售价 ${inp['price']:g} 高于 $80：客单高，资金占用与售后门槛都高",
        })
    if inp["reviews"] == 0:
        flags.append({
            "key": "review_zero", "level": "info",
            "text": "无评论链接：早期红利与验证风险并存——评论区验证不了需求，建议小批量试错",
        })
    return flags


# 最弱两个维度的行动建议模板（key 与 dimensions 对齐）
ADVICE_BY_DIM = {
    "demand": "需求端偏弱：核对 BSR 是否大类排名，或换需求更旺的相邻类目词再测一轮。",
    "compete": "竞争偏激烈：换更精准的长尾词重测搜索结果数，或找差异化卖点避开正面竞争。",
    "activity": "活跃度不足：链接可能趋冷，对比同类目其他 ASIN 的评论节奏再下结论。",
    "painpoint": "痛点信号弱：翻看 1–2 星差评区找具体抱怨，确认有可改进的切入点再动手。",
    "price": "价格不在黄金带：用「利润测算」核算物流佣金后的真实毛利，或用组合装/升级材质提客单。",
}
ADVICE_BY_FLAG = {
    "review_moat": "护城河深：考虑细分人群或配件/周边切入，别正面硬刚头部链接。",
    "brand_clash": "先完成品牌授权与合规排查（商标/专利），再投入样品成本。",
    "seasonal": "倒推备货节奏：旺季前 2 个月下大货，季末前清库存回笼资金。",
    "price_low": "低价品建议做组合装或多件优惠拉高客单，否则很难覆盖固定成本。",
    "price_high": "高客单品建议控制首批数量，用空运补货降低库存风险。",
    "review_zero": "无评论品建议首批小量测款，用 Vine 和早期评论人计划快速积累口碑。",
}


def build_advice(dimensions, flags, inferred, hints):
    """
    行动建议：推补提示置顶 → 最弱两维 → 旗标建议，去重封顶 3 条。
    """
    advice = []
    if inferred:
        keys = "、".join(INFER_LABELS[k] for k in inferred)
        advice.append(f"本报告有 {len(inferred)} 项推补值（{keys}），结果仅供参考：{hints[0] if hints else '补齐后重测'}")
    weakest = sorted(dimensions, key=lambda d: d["value"])[:2]
    for d in weakest:
        line = ADVICE_BY_DIM.get(d["key"])
        if line:
            advice.append(line)
    for f in flags:
        line = ADVICE_BY_FLAG.get(f["key"])
        if line:
            advice.append(line)
    out = []
    for a in advice:
        if a not in out:
            out.append(a)
    return out[:3]


# ============================================================
# ASIN 解析：支持完整链接 / 裸 ASIN
# ============================================================
# Amazon 链接里 ASIN 出现的三种常见位置：
#   https://www.amazon.com/dp/B0XXXXXXXX            ← 最常见
#   https://www.amazon.com/gp/product/B0XXXXXXXX
#   https://www.amazon.com/gp/aw/d/B0XXXXXXXX       ← 手机版
ASIN_IN_URL_RE = re.compile(r"/(?:dp|gp/product|gp/aw/d)/([A-Z0-9]{10})", re.I)
ASIN_BARE_RE = re.compile(r"^[A-Z0-9]{10}$")


def parse_asin(text):
    """
    从用户输入里解析 ASIN。
    输入可以是完整商品链接，也可以直接是 10 位 ASIN。
    解析不到返回 None（amzn.to 短链打不开网络，提示用户先展开）。
    """
    t = (text or "").strip()
    if not t:
        return None
    m = ASIN_IN_URL_RE.search(t)
    if m:
        return m.group(1).upper()
    t_up = t.upper()
    if ASIN_BARE_RE.match(t_up):
        return t_up
    return None


# ============================================================
# 输入校验（出错时返回中文提示，前端直接展示）
# ============================================================
class AnalysisError(ValueError):
    """输入数据不合格——main.py 会把它转成 HTTP 400 返回给前端。"""


def _num(value, field, lo, hi, required=True):
    """把表单值（可能是字符串，可能带逗号）安全地转成数字并检查范围。"""
    if value is None or str(value).strip() == "":
        if required:
            raise AnalysisError(f"「{field}」还没填")
        return None
    try:
        x = float(str(value).replace(",", "").strip())
    except ValueError:
        raise AnalysisError(f"「{field}」填的不是一个数字")
    if lo is not None and x < lo:
        raise AnalysisError(f"「{field}」太小了（最小 {lo}）")
    if hi is not None and x > hi:
        raise AnalysisError(f"「{field}」太大了（最大 {hi}）")
    return x


# ============================================================
# 五个维度各自打分（都是 0-1 的小数，乘上权重就是分数）
# ============================================================
def dim_demand(bsr):
    """需求规模：BSR 越靠前，卖得越多。"""
    rng = BSR_TAIL
    for top, r in BSR_TIERS:
        if bsr <= top:
            rng = r
            break
    mid = (rng[0] + rng[1]) / 2
    value = min(mid / DEMAND_FULL, 1.0)
    sales_text = f"约 {rng[0]:,}–{rng[1]:,} 件/月"
    return value, sales_text, f"BSR 大类第 {int(bsr):,} 名 · 预估月销 {sales_text}"


def dim_compete(results):
    """竞争友好度：核心词搜索结果越少，越容易切进去。"""
    for top, v, label in COMPETE_TIERS:
        if results <= top:
            return v, label, f"搜索结果约 {int(results):,} 条 · {label}"
    return COMPETE_TAIL[0], COMPETE_TAIL[1], f"搜索结果约 {int(results):,} 条 · {COMPETE_TAIL[1]}"


def dim_activity(days, reviews):
    """市场活跃度：最新评论离今天越近，说明卖得越勤。"""
    if not reviews:
        v, label = ACTIVITY_NO_REVIEW
        return v, label, "暂无评论，无法判断活跃度"
    if days is None:
        raise AnalysisError("「最新评论距今天数」还没填（评论数为 0 才可以不填）")
    for top, v, label in ACTIVITY_TIERS:
        if days <= top:
            return v, label, f"最新评论 {int(days)} 天前 · {label}"
    return ACTIVITY_TAIL[0], ACTIVITY_TAIL[1], f"最新评论 {int(days)} 天前 · {ACTIVITY_TAIL[1]}"


def dim_painpoint(rating, reviews):
    """痛点机会：需求被验证（评论多）但评分不高（≤4.3）= 改进切入的好目标。"""
    bad = int(round(reviews * (5 - rating) / 5))   # 粗估不满评价数
    if reviews >= 300 and rating <= 4.3:
        return 1.0, f"评分 {rating}（{int(reviews):,} 条评论，粗估差评 {bad:,} 条）——需求真实且产品有痛点，适合改良切入"
    if reviews >= 300 and rating <= 4.5:
        return 0.6, f"评分 {rating}（{int(reviews):,} 条评论），口碑一般，存在改进空间"
    if rating >= 4.7 and reviews >= 100:
        return 0.15, f"评分 {rating}（{int(reviews):,} 条评论），口碑非常好，正面切入难度大，需要差异化卖点"
    return 0.35, f"评分 {rating}（{int(reviews):,} 条评论），口碑中性，痛点信号不明显"


def dim_price(price):
    """价格空间：$15–45 是亚马逊精品的黄金价格带。"""
    for top, v, note in PRICE_BANDS:
        if price < top:
            return v, note, f"${price:g} · {note}"
    return PRICE_TAIL[0], PRICE_TAIL[1], f"${price:g} · {PRICE_TAIL[1]}"


# ============================================================
# 主入口：analyze(payload) → 完整分析报告 dict
# ============================================================
def analyze(payload):
    """
    payload（前端表单原样传来）：
      link    商品链接或 ASIN 原文
      name    商品名称
      keyword 搜索关键词（用于把多个 ASIN 归成一类对比）
      price   价格 USD
      rating  评分 0-5
      reviews 评论总数
      bsr     大类 Best Sellers Rank 排名
      results 关键词搜索结果数
      days    最新评论距今天数（reviews 为 0 时可不填）
    """
    asin = parse_asin(payload.get("link"))
    if not asin:
        hint = "（amzn.to 短链请先在浏览器打开，再复制地址栏的完整链接）" if "amzn.to" in str(payload.get("link") or "").lower() else ""
        raise AnalysisError(f"无法从输入中识别出 ASIN{hint}")

    name = str(payload.get("name") or "").strip()
    if not name:
        raise AnalysisError("「商品名称」还没填")
    keyword = str(payload.get("keyword") or "").strip()
    if not keyword:
        raise AnalysisError("「搜索关键词」还没填")

    # 五个数改可选（v7.3）：没填的按中性档推补，置信度如实打折；
    # 填了但非法（错别字等）依然报 400，不掩盖输入错误。
    # 关掉 INFER_ENABLED 即回到老的「必填」行为。
    req = not INFER_ENABLED
    price = _num(payload.get("price"), "价格", 0.5, 5000, required=req)
    rating = _num(payload.get("rating"), "评分", 0, 5, required=req)
    reviews = _num(payload.get("reviews"), "评论数", 0, 1000000, required=req)
    bsr = int(_num(payload.get("bsr"), "大类 BSR 排名", 1, 10000000))   # 需求是最大权重，BSR 不推补
    results = _num(payload.get("results"), "搜索结果数", 0, 100000000, required=req)
    days = _num(payload.get("days"), "最新评论距今天数", 0, 3650, required=False)

    if INFER_ENABLED:
        vals, inferred, confidence, hints = infer_missing({
            "price": price, "rating": rating, "reviews": reviews,
            "results": results, "days": days,
        })
        price, rating, reviews, results, days = (
            vals["price"], vals["rating"], vals["reviews"], vals["results"], vals["days"],
        )
    else:
        inferred, confidence, hints = [], 100, []
    reviews, results = int(reviews), int(results)

    # ---- 五个维度 ----
    d_val, sales_text, d_text = dim_demand(bsr)
    c_val, c_label, c_text = dim_compete(results)
    a_val, a_label, a_text = dim_activity(days, reviews)
    p_val, p_text = dim_painpoint(rating, reviews)
    pr_val, pr_note, pr_text = dim_price(price)

    # 维度文本挂上「（推补值）」标记，让报告的每个数字都可追溯
    def mark(text, *keys):
        return text + "（推补值）" if any(k in inferred for k in keys) else text

    d_text, c_text = mark(d_text), mark(c_text, "results")
    a_text = mark(a_text, "days", "reviews")
    p_text, pr_text = mark(p_text, "rating", "reviews"), mark(pr_text, "price")

    score = max(0, min(100, round(
        SCORE_WEIGHTS["demand"] * d_val
        + SCORE_WEIGHTS["compete"] * c_val
        + SCORE_WEIGHTS["activity"] * a_val
        + SCORE_WEIGHTS["painpoint"] * p_val
        + SCORE_WEIGHTS["price"] * pr_val
    )))

    if score >= GRADE_A:
        grade, grade_cls = "A 类 · 建议优先评估", "g-a"
    elif score >= GRADE_B:
        grade, grade_cls = "B 类 · 值得跟进观察", "g-b"
    else:
        grade, grade_cls = "C 类 · 建议暂缓", "g-c"

    if score >= GRADE_A:
        verdict = "五维信号整体占优，建议列入优先评估清单，尽快做小批量试销测算。"
    elif score >= GRADE_B:
        verdict = "有亮点也有短板，建议持续跟踪 1–2 周，或寻找改良切入点再评估。"
    else:
        verdict = "当前信号偏弱，建议暂缓投入，把精力放到其他类目。"

    demand_word = "需求真实存在" if d_val >= 0.1 else "需求偏弱，链接处在类目长尾"
    reason_lines = [
        f"需求端：BSR 大类第 {bsr:,} 名，预估月销 {sales_text}，{demand_word}。",
        f"竞争端：核心词「{keyword}」搜索结果约 {results:,} 条，{c_label}{mark('', 'results')}。",
        (f"活跃度：最新评论 {int(days)} 天前，链接{a_label}{mark('', 'days')}。"
         if days is not None else "活跃度：暂无评论数据。"),
        p_text + "。",
        f"价格端：${price:g}，{pr_note}{mark('', 'price')}。",
        f"综合结论：机会指数 {score}/100（{grade}，数据置信度 {confidence} · {confidence_level(confidence)}）——{verdict}",
    ]

    dimensions = [
        {"key": "demand",    "label": "需求规模",  "value": round(d_val, 2),  "text": d_text},
        {"key": "compete",   "label": "竞争友好度", "value": round(c_val, 2), "text": c_text},
        {"key": "activity",  "label": "市场活跃度", "value": round(a_val, 2), "text": a_text},
        {"key": "painpoint", "label": "痛点机会",  "value": round(p_val, 2),  "text": p_text},
        {"key": "price",     "label": "价格空间",  "value": round(pr_val, 2), "text": pr_text},
    ]
    input_values = {
        "price": price, "rating": rating, "reviews": reviews,
        "bsr": bsr, "results": results, "days": days,
    }
    flags = build_flags(input_values, name, keyword)
    advice = build_advice(dimensions, flags, inferred, hints)

    return {
        "id": f"AN-{uuid.uuid4().hex[:8]}",
        "collected_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "asin": asin,
        "name": name,
        "keyword": keyword,
        "source_url": str(payload.get("link") or "").strip(),
        "input": input_values,
        "score": score,
        "grade": grade,
        "grade_cls": grade_cls,
        "est_sales": sales_text,
        "est_sales_note": f"由 BSR #{bsr:,} 按行业经验曲线估算",
        "dimensions": dimensions,
        "reason_lines": reason_lines,
        # ---- v7.3 智能分析字段（旧记录没有这些键，前端一律 r.flags||[] 兜底）----
        "inferred": inferred,                    # 被推补的字段 key 列表
        "confidence": confidence,                # 数据置信度 0-100
        "confidence_level": confidence_level(confidence),
        "confidence_hints": hints,               # 「补 X → 置信度升至 Y」提示
        "flags": flags,                          # 风险旗标 [{key,level,text}]
        "advice": advice,                        # 行动建议（≤3 条）
        "risk": RISK_TEXT,
    }


# ============================================================
# 自测：直接运行本文件，覆盖三种典型场景 + 断言推补逻辑
# ============================================================
if __name__ == "__main__":
    samples = [
        ("场景 1 · 全量输入（优秀示例）",
         "https://www.amazon.com/Furhaven-Orthopedic/dp/B0TEST0001/ref=sr_1_1",
         dict(name="优秀示例 · 大型犬高支撑宠物床", keyword="dog bed for large dogs",
              price=39.99, rating=4.3, reviews=2310, bsr=1560, results=5000, days=1)),
        ("场景 2 · 只填核心四项（其余全部推补）",
         "B0TEST0002",
         dict(name="场景 2 · 不锈钢宠物碗（只填了名称/关键词/BSR）", keyword="stainless dog bowl",
              bsr=80000)),
        ("场景 3 · 只缺 days（有评论但没填最新评论日期）",
         "B0TEST0003",
         dict(name="场景 3 · 不锈钢宠物碗", keyword="stainless dog bowl",
              price=6.99, rating=4.8, reviews=5000, bsr=80000, results=60000)),
        ("场景 4 · 新链接无评论（reviews=0，days 不推补）",
         "B0TEST0004",
         dict(name="场景 4 · 全新圣诞宠物玩具", keyword="christmas dog toy",
              price=19.99, rating=0, reviews=0, bsr=45000, results=8000)),
    ]
    for title, link, extra in samples:
        r = analyze({"link": link, **extra})
        print("=" * 60)
        print(f"{r['name']}   ASIN {r['asin']}   {r['collected_at']}")
        print(f"机会指数 {r['score']}/100  {r['grade']}   预估月销 {r['est_sales']}")
        print(f"置信度 {r['confidence']} · {r['confidence_level']}   推补字段：{r['inferred'] or '无'}")
        for d in r["dimensions"]:
            bar = "█" * int(d["value"] * 10)
            print(f"  {d['label']}  {bar:<10} {int(d['value']*100):>3}  {d['text']}")
        for line in r["reason_lines"]:
            print(f"  · {line}")
        if r["flags"]:
            print("  旗标：")
            for f in r["flags"]:
                print(f"    [{f['level']}] {f['text']}")
        if r["advice"]:
            print("  建议：")
            for a in r["advice"]:
                print(f"    → {a}")

    # ---- 推补逻辑断言 ----
    r2 = analyze({"link": "B0TEST0002", "name": "场景 2", "keyword": "k", "bsr": 80000})
    assert set(r2["inferred"]) == {"price", "rating", "reviews", "results", "days"}, r2["inferred"]
    assert r2["confidence"] == 68 and r2["confidence_level"] == "中", r2["confidence"]
    assert r2["input"]["price"] == 12.99 and r2["input"]["results"] == 20000   # 中性默认值
    r3 = analyze({"link": "B0TEST0003", "name": "场景 3", "keyword": "k",
                  "price": 6.99, "rating": 4.8, "reviews": 5000, "bsr": 80000, "results": 60000})
    assert r3["inferred"] == ["days"] and r3["confidence"] == 92, (r3["inferred"], r3["confidence"])
    r4 = analyze({"link": "B0TEST0004", "name": "场景 4 · 全新圣诞宠物玩具", "keyword": "christmas dog toy",
                  "price": 19.99, "rating": 0, "reviews": 0, "bsr": 45000, "results": 8000})
    assert "days" not in r4["inferred"], "评论数为 0 时不应推补 days"
    assert any(f["key"] == "seasonal" for f in r4["flags"]), r4["flags"]
    assert any(f["key"] == "review_zero" for f in r4["flags"]), r4["flags"]
    # 填了但非法依然报错（不掩盖输入错误）
    try:
        analyze({"link": "B0TEST0009", "name": "x", "keyword": "k", "bsr": 100, "price": "abc"})
        raise SystemExit("价格填 abc 应该报错却没报")
    except AnalysisError as e:
        print(f"非法输入正确拦截：{e}")
    # BSR 缺失仍然必须报错（需求是最大权重维度，不推补）
    try:
        analyze({"link": "B0TEST0009", "name": "x", "keyword": "k"})
        raise SystemExit("BSR 缺失应该报错却没报")
    except AnalysisError as e:
        print(f"BSR 缺失正确拦截：{e}")
    print("=" * 60)
    print("自测完成，没有报错。")
