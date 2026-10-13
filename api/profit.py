# -*- coding: utf-8 -*-
"""
选品罗盘 · 利润测算器（跨境电商 FBA 毛利模型）
============================================================
选品工作流的第三环：ASIN 验证完「值得做」，还要算「赚不赚钱」。

  售价
  − 佣金（售价 × 佣金率，默认 15%）
  − FBA 配送费（按件，人工查亚马逊物流计算器后填入）
  − 采购成本（每件）
  − 头程物流（每件摊薄）
  − 其他成本（包装/推广摊薄等，可选）
  = 毛利额 → 毛利率 / 保本售价 / 月利润估算

行业红线：毛利率 < 20% 预警（跨境常规红线），≥ 30% 为优。
纯公式、零外部数据；佣金率与红线在下面可调。

自测（api 目录）：.venv\\Scripts\\python.exe profit.py
"""

from analyzer import AnalysisError, _num

# ---------- 可调参数 ----------
REFERRAL_PCT = 15      # 亚马逊佣金率默认 15%（大部分类目）
MARGIN_RED = 20        # 毛利率红线：低于它预警
MARGIN_GOOD = 30       # 毛利率优秀线

FIELDS = [
    # (字段, 中文说明, 最小, 最大, 是否整数)
    ("price",    "售价",          0.5, 5000, False),
    ("purchase", "采购成本/件",    0, 5000, False),
    ("inbound",  "头程物流/件",    0, 5000, False),
    ("fba",      "FBA 配送费/件", 0, 5000, False),
    ("other",    "其他成本/件",    0, 5000, False),
    ("ref_pct",  "佣金率 %",       1, 50, False),
    ("monthly",  "预估月销量",     0, 1000000, True),
]


def validate(payload):
    """校验并规范化输入；不合格抛中文 AnalysisError。缺省项给默认值。"""
    out = {}
    for key, label, lo, hi, as_int in FIELDS:
        raw = payload.get(key)
        if raw is None or str(raw).strip() == "":
            # 售价/采购成本必填，其余缺省：other=0、ref_pct=15、monthly=0
            defaults = {"other": 0.0, "ref_pct": float(REFERRAL_PCT), "monthly": 0}
            if key in defaults:
                out[key] = defaults[key] if as_int else defaults[key]
                continue
            raise AnalysisError(f"「{label}」还没填")
        v = _num(raw, label, lo, hi)
        out[key] = int(v) if as_int else round(float(v), 2)
    return out


def compute(inputs):
    """核心公式。inputs 需先过 validate。"""
    price = inputs["price"]
    ref_fee = price * inputs["ref_pct"] / 100          # 佣金
    unit_cost = (inputs["purchase"] + inputs["inbound"]
                 + inputs["fba"] + inputs["other"])    # 除佣金外的单件成本
    total_cost = unit_cost + ref_fee                   # 单件总成本
    profit_per = price - total_cost                    # 单件毛利额
    margin = profit_per / price * 100 if price > 0 else 0
    breakeven = unit_cost / (1 - inputs["ref_pct"] / 100) if inputs["ref_pct"] < 100 else None
    monthly_profit = profit_per * inputs["monthly"] if inputs["monthly"] else None

    if margin >= MARGIN_GOOD:
        verdict, verdict_cls = f"毛利率 {margin:.0f}% 达到优秀线（≥{MARGIN_GOOD}%），值得推进", "up"
    elif margin >= MARGIN_RED:
        verdict, verdict_cls = f"毛利率 {margin:.0f}% 可做，但需控制物流与推广成本", "flat"
    else:
        verdict, verdict_cls = (f"⚠️ 毛利率 {margin:.0f}% 低于红线 {MARGIN_RED}%，"
                                "建议重新谈价、换头程方案或提高售价"), "down"

    return {
        "ref_fee": round(ref_fee, 2),
        "unit_cost": round(unit_cost, 2),
        "total_cost": round(total_cost, 2),
        "profit_per": round(profit_per, 2),
        "margin": round(margin, 1),
        "breakeven": round(breakeven, 2) if breakeven is not None else None,
        "monthly_profit": round(monthly_profit, 2) if monthly_profit is not None else None,
        "verdict": verdict,
        "verdict_cls": verdict_cls,
    }


if __name__ == "__main__":
    data = validate({"price": "29.99", "purchase": "6.5", "inbound": "1.8",
                     "fba": "5.22", "other": "", "ref_pct": "", "monthly": "1300"})
    r = compute(data)
    print(f"售价 ${data['price']}  佣金率 {data['ref_pct']}%  月销 {data['monthly']:,}")
    print(f"佣金 ${r['ref_fee']} + 其他单件成本 ${r['unit_cost']} = 总成本 ${r['total_cost']}")
    print(f"单件毛利 ${r['profit_per']}  毛利率 {r['margin']}%  保本售价 ${r['breakeven']}"
          f"  月利润 ${r['monthly_profit']}")
    print(r["verdict"])
    print("自测完成，没有报错。")
