# -*- coding: utf-8 -*-
"""
选品罗盘 · 关键词雷达（差值引擎）
============================================================
你定期/不定期去 Amazon 搜一遍关键词，抄 5 个数（约 2 分钟）；
本模块负责剩下的全部「智能」：

  打分   与 ASIN 分析同一套透明世界观，给关键词（类目）算机会指数
  差值   自动对比上一轮：机会指数、竞争、需求、头部卖家全算涨跌
  告知   变化自动生成中文动态（「竞争缓解」「升到 A 类」…）推给工作台

为什么不爬虫：Amazon 反爬 + 条款禁止，工具不稳定 = 交付事故。
行业做法 = 人工小批量采集（或付费 API）+ 系统自动算差值。
以后接 Keepa 时，只需把「人工抄 5 个数」换成 API 查询，本文件一行不动。

自测（api 目录）：
  .venv\\Scripts\\python.exe radar.py
"""

from datetime import datetime

# 复用 ASIN 分析器的维度函数与参数表（同一套世界观，客户问起口径一致）
from analyzer import (
    AnalysisError,
    _num,
    dim_activity,
    dim_compete,
    dim_demand,
    dim_price,
)

# 关键词（类目）级权重：没有单品的痛点维度，那 10 分并入价格空间
# 需求 35 / 竞争 25 / 活跃 20 / 价格 20，合计 100
SCORE_WEIGHTS = {"demand": 35, "compete": 25, "activity": 20, "price": 20}

GRADE_A = 75   # ≥ 75 → A 类 · 建议优先评估
GRADE_B = 55   # ≥ 55 → B 类 · 值得跟进观察

COLLECT_FIELDS = [
    # (字段, 中文说明, 最小, 最大, 是否整数)
    ("results", "搜索结果数", 0, 100000000, True),
    ("bsr",     "头部 BSR 排名", 1, 10000000, True),
    ("reviews", "头部评论数", 0, 1000000, True),
    ("price",   "头部价格", 0.5, 5000, False),
    ("days",    "头部最新评论距今天数", 0, 3650, True),
]


def validate_collect(payload):
    """把前端表单原样数据校验成规范数字 dict；不合格时抛中文 AnalysisError。"""
    out = {}
    for key, label, lo, hi, as_int in COLLECT_FIELDS:
        v = _num(payload.get(key), label, lo, hi)
        out[key] = int(v) if as_int else round(float(v), 2)
    return out


def _grade_of(score):
    if score >= GRADE_A:
        return "A 类 · 建议优先评估", "g-a"
    if score >= GRADE_B:
        return "B 类 · 值得跟进观察", "g-b"
    return "C 类 · 建议暂缓", "g-c"


def score_round(data):
    """给一轮采集打分。data 需先过 validate_collect。"""
    d_val, sales_text, d_text = dim_demand(data["bsr"])
    c_val, c_label, c_text = dim_compete(data["results"])
    a_val, a_label, a_text = dim_activity(data["days"], data["reviews"])
    p_val, p_note, p_text = dim_price(data["price"])

    score = max(0, min(100, round(
        SCORE_WEIGHTS["demand"] * d_val
        + SCORE_WEIGHTS["compete"] * c_val
        + SCORE_WEIGHTS["activity"] * a_val
        + SCORE_WEIGHTS["price"] * p_val
    )))
    grade, grade_cls = _grade_of(score)

    if score >= GRADE_A:
        verdict = "类目信号整体占优，建议安排选品与样品评估。"
    elif score >= GRADE_B:
        verdict = "有亮点也有短板，保持监控节奏，等待信号进一步确认。"
    else:
        verdict = "当前信号偏弱，降低关注优先级。"

    reason_lines = [
        f"需求端：头部商品 BSR 第 {data['bsr']:,} 名（预估月销 {sales_text}）。",
        f"竞争端：搜索结果约 {data['results']:,} 条，{c_label}。",
        f"活跃度：头部最新评论 {data['days']} 天前，{a_label}。",
        f"价格端：头部价格 ${data['price']:g}，{p_note}。",
        f"结论：机会指数 {score}/100（{grade}）——{verdict}",
    ]

    return {
        "results": data["results"], "bsr": data["bsr"], "reviews": data["reviews"],
        "price": data["price"], "days": data["days"],
        "score": score, "grade": grade, "grade_cls": grade_cls,
        "est_sales": sales_text,
        "dimensions": [
            {"key": "demand",   "label": "需求规模",  "value": round(d_val, 2), "text": d_text},
            {"key": "compete",  "label": "竞争友好度", "value": round(c_val, 2), "text": c_text},
            {"key": "activity", "label": "市场活跃度", "value": round(a_val, 2), "text": a_text},
            {"key": "price",    "label": "价格空间",  "value": round(p_val, 2), "text": p_text},
        ],
        "reason_lines": reason_lines,
    }


# ============================================================
# 差值引擎：对比两轮，自动生成中文「告知」
# ============================================================
def _arrow(delta):
    return "↑" if delta > 0 else "↓" if delta < 0 else "→"


def diff_rounds(keyword, prev, cur, round_no):
    """对比上一轮与本轮，返回事件文本列表（直接进工作台动态流）。"""
    ev = []
    ds = cur["score"] - prev["score"]
    ev.append(
        f"「{keyword}」第 {round_no} 轮采集：机会指数 "
        f"{prev['score']}→{cur['score']} {_arrow(ds)}"
        + (f"（{abs(ds)} 分）" if ds else "")
    )

    # 等级变化（升降级是最值得告知的事）
    if cur["grade_cls"] != prev["grade_cls"]:
        order = ["g-c", "g-b", "g-a"]
        if order.index(cur["grade_cls"]) > order.index(prev["grade_cls"]):
            ev.append(f"「{keyword}」{prev['grade']} → {cur['grade']} 🎉")
        else:
            ev.append(f"「{keyword}」{prev['grade']} → {cur['grade']} ⚠️ 复核原因")

    if ds >= 5:
        ev.append(f"「{keyword}」机会指数明显上升，建议今天重点看一眼")
    elif ds <= -5:
        ev.append(f"「{keyword}」机会指数回落，复核是竞争加剧还是季节波动")

    # 竞争变化：搜索结果数 ±20% 以上才提示（小波动多是算法抖动）
    if prev["results"] and cur["results"]:
        r_pct = (cur["results"] - prev["results"]) / prev["results"]
        if r_pct >= 0.2:
            ev.append(f"「{keyword}」竞争加剧：搜索结果 {prev['results']:,}→{cur['results']:,}")
        elif r_pct <= -0.2:
            ev.append(f"「{keyword}」竞争缓解：搜索结果 {prev['results']:,}→{cur['results']:,}，切入窗口")

    # 需求变化：头部 BSR 明显前进 / 后退（注意 BSR 变小 = 卖得更好）
    if prev["bsr"] and cur["bsr"]:
        b_pct = (prev["bsr"] - cur["bsr"]) / prev["bsr"]
        if b_pct >= 0.2:
            ev.append(f"「{keyword}」头部排名上升（BSR {prev['bsr']:,}→{cur['bsr']:,}），需求走强")
        elif b_pct <= -0.2:
            ev.append(f"「{keyword}」头部排名下滑（BSR {prev['bsr']:,}→{cur['bsr']:,}），需求转弱")

    # 头部评论净增 ≥30：类目在真实出货
    d_rev = cur["reviews"] - prev["reviews"]
    if d_rev >= 30:
        ev.append(f"「{keyword}」头部评论 +{d_rev:,}，类目在真实出货")

    return ev


def first_round_events(keyword, cur):
    """第 1 轮采集没有上轮可比，告知「入榜」这件事本身。"""
    ev = [
        f"「{keyword}」第 1 轮采集完成：机会指数 {cur['score']}/100（{cur['grade']}）",
    ]
    if cur["grade_cls"] in ("g-a", "g-b"):
        ev.append(f"「{keyword}」进入重点机会榜，下轮采集将自动对比变化")
    return ev


# ============================================================
# 自测：两轮对比演示差值引擎
# ============================================================
if __name__ == "__main__":
    kw = "dog bed"
    r1 = score_round(validate_collect(
        {"results": "5,000", "bsr": "1560", "reviews": "2310", "price": "39.99", "days": "1"}))
    r2 = score_round(validate_collect(
        {"results": "5800", "bsr": "980", "reviews": "2510", "price": "39.99", "days": "1"}))
    print(f"第 1 轮：{r1['score']} 分（{r1['grade']}）  头部月销 {r1['est_sales']}")
    print(f"第 2 轮：{r2['score']} 分（{r2['grade']}）  头部月销 {r2['est_sales']}")
    print("-" * 52)
    print("差值引擎自动生成的动态：")
    for line in diff_rounds(kw, r1, r2, 2):
        print(f"  · {line}")
    print("=" * 52)
    print("自测完成，没有报错。")
