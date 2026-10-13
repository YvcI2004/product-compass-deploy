# -*- coding: utf-8 -*-
"""
选品罗盘 · 数据管线（第 3 步的核心）
------------------------------------------------------------
流程（真实 FDE 交付里就是把这里接上真实数据源）：

  raw_signals.csv          读取原始多平台信号（可用 Excel 编辑）
      ↓ 清洗              去重 / 丢掉缺名称或缺增速的行 / 数字规范化（"1,860" → 1860）
      ↓ 聚合              按商品合并三平台信号
      ↓ 打分              透明公式计算机会指数（0-100）
      ↓ 分类              上升爆款 / 潜力新品 / 异常趋势
      ↓ 生成判断依据       按数据自动生成一段中文说明
  generated/products.json   后端每次请求都读它 → 浏览器刷新即见新数据

运行方式（在 api 目录下）：
  .venv\\Scripts\\python.exe pipeline\\run_pipeline.py

只用 Python 标准库，不装任何新依赖。
"""

import csv
import json
from datetime import datetime
from pathlib import Path

# ---------- 路径（以本文件位置为锚，在哪个目录启动都不会错） ----------
BASE = Path(__file__).resolve().parent          # api/pipeline
RAW_CSV = BASE / "raw_signals.csv"
OUT_DIR = BASE / "generated"
OUT_DIR.mkdir(exist_ok=True)

# ---------- 可调参数（给客户调参就改这里） ----------
# 三平台权重：内容平台更能预示早期趋势，所以 TikTok 权重最高
PLATFORM_WEIGHT = {"Amazon": 0.35, "TikTok": 0.40, "Temu": 0.25}
HOT_TREND = 22        # 加权增速 ≥ 22% 判定为「上升爆款」
DEMAND_BASE = 3000    # Amazon 月销达到 3000 视为需求满格
COMPETE_BASE = 200    # Temu 同类达到 200 款视为竞争满格

# 人的判断优先于算法：这些是团队已经做出的结论，管线不改写
# （体现产品理念：AI 提供证据，团队保留最终判断）
STATUS_OVERRIDES = {
    "便携折叠宠物台阶": "继续观察",
    "不锈钢防倾翻宠物碗": "已放弃",
}


# ---------- 小工具 ----------
def parse_int(v):
    """'1,860' → 1860；解析失败返回 None。"""
    v = (v or "").replace(",", "").strip()
    return int(v) if v.isdigit() else None


def parse_pct(v):
    "'+42%' → 42.0；'-9%' → -9.0；解析失败返回 None。"
    v = (v or "").strip().rstrip("%")
    try:
        return float(v)
    except ValueError:
        return None


def fmt_pct(v):
    """42.0 → '+42%'；-9.0 → '-9%'；0 → '0%'（前端按符号显示涨跌颜色）。"""
    r = round(v)
    return "0%" if r == 0 else f"{r:+d}%"


# ============================================================
# 第 1 步：读取 + 清洗
# ============================================================
rows_read = dropped_no_name = dropped_invalid = dropped_dup = 0
products = {}   # 商品名 → { category, tags, rows: {平台: 信号} }
seen = set()    # (商品名, 平台) 去重用

# utf-8-sig：兼容 Excel 另存 CSV 时自动加的 BOM 头
with open(RAW_CSV, encoding="utf-8-sig", newline="") as f:
    for row in csv.DictReader(f):
        rows_read += 1
        name = (row.get("product_name") or "").strip()
        platform = (row.get("platform") or "").strip()

        # 规则 1：没有商品名的行，丢弃
        if not name:
            dropped_no_name += 1
            continue
        # 规则 2：(商品, 平台) 完全重复的行，只保留第一条
        if (name, platform) in seen:
            dropped_dup += 1
            continue
        # 规则 3：增速缺失/无法解析的行，视为脏数据丢弃
        growth = parse_pct(row.get("growth_pct"))
        if growth is None:
            dropped_invalid += 1
            continue

        seen.add((name, platform))
        p = products.setdefault(name, {"category": "", "tags": "", "rows": {}})
        p["category"] = p["category"] or (row.get("category") or "").strip()
        p["tags"] = p["tags"] or (row.get("tags") or "").strip()
        p["rows"][platform] = {
            "sales": parse_int(row.get("monthly_sales")),
            "reviews": parse_int(row.get("review_count")),
            "videos": parse_int(row.get("video_count")),
            "creators": parse_int(row.get("creator_count")),
            "similar": parse_int(row.get("similar_count")),
            "growth": growth,
            "note": (row.get("note") or "").strip(),
        }

# ============================================================
# 第 2 步：打分 + 分类 + 生成文案
# ============================================================
def weighted_trend(rows):
    """三平台加权增速。缺某个平台时，按现有平台权重归一化（不冤枉数据不全的商品）。"""
    total_w = sum(PLATFORM_WEIGHT.get(k, 0) for k in rows)
    if not total_w:
        return 0.0
    return sum(PLATFORM_WEIGHT.get(k, 0) * r["growth"] for k, r in rows.items()) / total_w


def build_product(name, p):
    rows = p["rows"]
    amazon, tiktok, temu = rows.get("Amazon", {}), rows.get("TikTok", {}), rows.get("Temu", {})
    trend = weighted_trend(rows)

    # ---- 机会指数 = 基础分 + 趋势分 + 需求分 - 竞争分 ----
    demand = min((amazon.get("sales") or 0) / DEMAND_BASE, 1)       # 需求规模：Amazon 月销
    compete = min((temu.get("similar") or 0) / COMPETE_BASE, 1)     # 竞争密度：Temu 同类数
    score = max(0, min(100, round(50 + 1.1 * trend + 25 * demand - 20 * compete)))

    # ---- 分类 ----
    if trend >= HOT_TREND:
        ptype = "上升爆款"
    elif trend < 0:
        ptype = "异常趋势"
    else:
        ptype = "潜力新品"

    # ---- 主平台：增速最高的信号渠道（= 最早发现机会的地方）----
    main_platform = max(rows, key=lambda k: rows[k]["growth"])

    # ---- 三平台信号文案（用真实数字拼出来，不是写死的）----
    a_parts, t_parts = [], []
    if amazon.get("sales"):
        a_parts.append(f"月销量 {amazon['sales']:,}")
    if amazon.get("reviews"):
        a_parts.append(f"{amazon['reviews']:,} 条 Review")
    if tiktok.get("videos"):
        t_parts.append(f"{tiktok['videos']} 条视频")
    if tiktok.get("creators"):
        t_parts.append(f"{tiktok['creators']} 位达人")
    u_text = f"{temu['similar']} 款同类" if temu.get("similar") else "暂无同类数据"
    if temu.get("note"):
        u_text += f" · {temu['note']}"

    signals = {
        "Amazon": {"text": " · ".join(a_parts) or "暂无销售数据", "delta": fmt_pct(amazon.get("growth", 0))},
        "TikTok": {"text": " · ".join(t_parts) or "暂无内容数据", "delta": fmt_pct(tiktok.get("growth", 0))},
        "Temu":   {"text": u_text, "delta": fmt_pct(temu.get("growth", 0))},
    }

    # ---- 自动生成「AI 判断依据」 ----
    if ptype == "上升爆款":
        reason = (
            f"TikTok 内容端起量（{tiktok.get('videos', 0)} 条视频 / {tiktok.get('creators', 0)} 位达人，"
            f"{fmt_pct(tiktok.get('growth', 0))}），Amazon 月销 {amazon.get('sales', 0):,} 验证真实需求，"
            f"Temu 同类 {temu.get('similar', 0)} 款、供给尚未饱和——建议尽快评估切入。"
        )
    elif ptype == "异常趋势":
        reason = f"三平台加权增速 {fmt_pct(trend)}，信号整体回落，需人工复核是季节性波动还是需求退潮，暂缓判断。"
    else:
        reason = (
            f"信号处于早期：三平台加权增速 {fmt_pct(trend)}，Amazon 月销 {amazon.get('sales', 0):,}，"
            f"Temu 同类 {temu.get('similar', 0)} 款，建议持续观察、等待更多数据验证。"
        )

    return {
        "id": None,  # 稍后统一编号
        "name": name,
        "category": p["category"] or "未分类",
        "platform": main_platform,
        "score": score,
        "type": ptype,
        "status": STATUS_OVERRIDES.get(name, "待判断"),
        "featured": False,  # 稍后把最高分的设为 True
        "reason": reason,
        "opportunityTags": [t.strip() for t in p["tags"].split("|") if t.strip()],
        "growth": {"label": "三平台加权增速", "value": fmt_pct(trend)},
        "signals": signals,
    }


result = [build_product(name, p) for name, p in products.items()]

# ---- 稳定编号：按商品名排序编 P-001…（数据变了编号也不乱，浏览器里的标记才能对得上）----
result.sort(key=lambda x: x["name"])
for i, p in enumerate(result, 1):
    p["id"] = f"P-{i:03d}"

# ---- 最高分设为工作台重点推荐 ----
if result:
    best = max(result, key=lambda p: p["score"])
    best["featured"] = True

# 输出按分数从高到低，方便人直接看
result.sort(key=lambda p: p["score"], reverse=True)

# ============================================================
# 第 3 步：写出结果 + 运行报告
# ============================================================
(OUT_DIR / "products.json").write_text(
    json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8"
)

report = {
    "ran_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    "csv_rows": rows_read,
    "dropped": dropped_no_name + dropped_invalid + dropped_dup,
    "dropped_no_name": dropped_no_name,
    "dropped_invalid": dropped_invalid,
    "dropped_duplicate": dropped_dup,
    "product_count": len(result),
    "hot": sum(1 for p in result if p["type"] == "上升爆款"),
    "fresh": sum(1 for p in result if p["type"] == "潜力新品"),
    "odd": sum(1 for p in result if p["type"] == "异常趋势"),
}
(OUT_DIR / "run_report.json").write_text(
    json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8"
)

# ---- 控制台摘要 ----
print("=" * 56)
print("选品罗盘 · 数据管线运行完成")
print("=" * 56)
print(f"原始信号   : {rows_read} 行")
print(f"清洗丢弃   : {dropped_no_name + dropped_invalid + dropped_dup} 行"
      f"（缺名称 {dropped_no_name} / 数据无效 {dropped_invalid} / 重复 {dropped_dup}）")
print(f"生成商品   : {report['product_count']} 个"
      f"（上升爆款 {report['hot']} / 潜力新品 {report['fresh']} / 异常趋势 {report['odd']}）")
print("-" * 56)
for p in result:
    star = " ★" if p["featured"] else ""
    print(f"{p['score']:>3}  {p['type']}  {p['name']}{star}")
print("-" * 56)
print(f"已写入: {OUT_DIR / 'products.json'}")
print("浏览器刷新前端页面即可看到新数据（后端每次请求都会重新读这个文件）")
