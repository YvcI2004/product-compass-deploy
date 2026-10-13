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

    price = _num(payload.get("price"), "价格", 0.5, 5000)
    rating = _num(payload.get("rating"), "评分", 0, 5)
    reviews = int(_num(payload.get("reviews"), "评论数", 0, 1000000))
    bsr = int(_num(payload.get("bsr"), "大类 BSR 排名", 1, 10000000))
    results = int(_num(payload.get("results"), "搜索结果数", 0, 100000000))
    days = _num(payload.get("days"), "最新评论距今天数", 0, 3650, required=False)

    # ---- 五个维度 ----
    d_val, sales_text, d_text = dim_demand(bsr)
    c_val, c_label, c_text = dim_compete(results)
    a_val, a_label, a_text = dim_activity(days, reviews)
    p_val, p_text = dim_painpoint(rating, reviews)
    pr_val, pr_note, pr_text = dim_price(price)

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
        f"竞争端：核心词「{keyword}」搜索结果约 {results:,} 条，{c_label}。",
        f"活跃度：最新评论 {int(days)} 天前，链接{a_label}。" if days is not None else "活跃度：暂无评论数据。",
        p_text + "。",
        f"价格端：${price:g}，{pr_note}。",
        f"综合结论：机会指数 {score}/100（{grade}）——{verdict}",
    ]

    return {
        "id": f"AN-{uuid.uuid4().hex[:8]}",
        "collected_at": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "asin": asin,
        "name": name,
        "keyword": keyword,
        "source_url": str(payload.get("link") or "").strip(),
        "input": {
            "price": price, "rating": rating, "reviews": reviews,
            "bsr": bsr, "results": results, "days": days,
        },
        "score": score,
        "grade": grade,
        "grade_cls": grade_cls,
        "est_sales": sales_text,
        "est_sales_note": f"由 BSR #{bsr:,} 按行业经验曲线估算",
        "dimensions": [
            {"key": "demand",    "label": "需求规模",  "value": round(d_val, 2),  "text": d_text},
            {"key": "compete",   "label": "竞争友好度", "value": round(c_val, 2), "text": c_text},
            {"key": "activity",  "label": "市场活跃度", "value": round(a_val, 2), "text": a_text},
            {"key": "painpoint", "label": "痛点机会",  "value": round(p_val, 2),  "text": p_text},
            {"key": "price",     "label": "价格空间",  "value": round(pr_val, 2), "text": pr_text},
        ],
        "reason_lines": reason_lines,
        "risk": RISK_TEXT,
    }


# ============================================================
# 自测：直接运行本文件，看两份对比示例报告
# ============================================================
if __name__ == "__main__":
    samples = [
        ("优秀示例 · 大型犬高支撑宠物床",
         "https://www.amazon.com/Furhaven-Orthopedic/dp/B0TEST0001/ref=sr_1_1",
         dict(name="优秀示例 · 大型犬高支撑宠物床", keyword="dog bed for large dogs",
              price=39.99, rating=4.3, reviews=2310, bsr=1560, results=5000, days=1)),
        ("冷门示例 · 不锈钢宠物碗",
         "B0TEST0002",
         dict(name="冷门示例 · 不锈钢宠物碗", keyword="stainless dog bowl",
              price=6.99, rating=4.8, reviews=5000, bsr=80000, results=60000, days=45)),
    ]
    for title, link, extra in samples:
        r = analyze({"link": link, **extra})
        print("=" * 60)
        print(f"{r['name']}   ASIN {r['asin']}   {r['collected_at']}")
        print(f"机会指数 {r['score']}/100  {r['grade']}   预估月销 {r['est_sales']}")
        for d in r["dimensions"]:
            bar = "█" * int(d["value"] * 10)
            print(f"  {d['label']}  {bar:<10} {int(d['value']*100):>3}  {d['text']}")
        for line in r["reason_lines"]:
            print(f"  · {line}")
    print("=" * 60)
    print("自测完成，没有报错。")
