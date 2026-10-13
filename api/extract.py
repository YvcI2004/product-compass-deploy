# -*- coding: utf-8 -*-
"""
选品罗盘 · 商品页文本提取器（v7.3 智能分析第一步）
============================================================
你把正在看的 Amazon 页面 Ctrl+A → Ctrl+C，整页文字粘进来；
本模块从这段纯文本里提取 ASIN、标题、价格、评分、评论数、BSR、
搜索结果数、最新评论日期——替你抄掉那 6 个数。

合规边界（和 analyzer.py 同一套世界观）：
  这里没有任何网络请求——只处理「用户人工复制来的文本」。
  页面还是人打开的，只是抄数这一步从 3 分钟降到 10 秒。

隐私边界：
  粘贴的整页文本可能含收货地址等个人信息——本模块不落盘、不打日志，
  main.py 的 /api/extract 接口同样只透传结果、永不保存。

运行自测（在 api 目录）：
  .venv\\Scripts\\python.exe extract.py
"""

import re
from datetime import date

# 上限：整页 Ctrl+A 一般在 100k–300k 字符，500k 足够且防滥用
MAX_TEXT = 500_000

# Amazon 评论日期里会出现的 12 个月份（美国站格式：October 8, 2026）
_MONTHS = {
    "january": 1, "february": 2, "march": 3, "april": 4, "may": 5, "june": 6,
    "july": 7, "august": 8, "september": 9, "october": 10, "november": 11, "december": 12,
}

# 评分行的样子：4.4 out of 5 stars（复制时星级文字和数字常挤在一行）
RATING_RE = re.compile(r"(\d\.\d)\s+out\s+of\s+5\s+stars?", re.I)
# 评分行后面紧跟的评论数：2310 global ratings / 2310 ratings / 2310 votes
REVIEWS_RE = re.compile(r"([\d,]+)\s+(?:global\s+)?(?:ratings|votes|reviews)", re.I)
# 价格：$39.99 / $ 39.99（Amazon 复制文本里 $ 后偶尔带空格）
PRICE_RE = re.compile(r"\$\s?([\d,]+\.\d{2})")
# 搜索结果数：1-16 of 5,000 results for "…"（搜索页左上角）
RESULTS_RE = re.compile(r"[\d,]*\s*results\s+for\b", re.I)
RESULTS_NUM_RE = re.compile(r"([\d,]+)\s+results\b", re.I)
# BSR：#1,560 in Pet Supplies（先锚 Best Sellers Rank 再取其后第一个）
BSR_ANCHOR_RE = re.compile(r"Best\s+Sellers?\s+Rank", re.I)
BSR_RE = re.compile(r"#?([\d,]+)\s+in\s+([A-Za-z&'’ \-]{2,40})")
# 评论日期：Reviewed in the United States on October 8, 2026 / on October 8, 2026
DATE_RE = re.compile(r"\bon\s+([A-Z][a-z]+)\s+(\d{1,2}),\s*(\d{4})")
# ASIN：链接形态 /dp/B0XXXXXXXX 等（与 analyzer.py 同一套规则，独立副本避免循环依赖）
ASIN_URL_RE = re.compile(r"/(?:dp|gp/product|gp/aw/d)/([A-Z0-9]{10})", re.I)
ASIN_BARE_HINT_RE = re.compile(r"\bB0[A-Z0-9]{8}\b", re.I)

# 价格候选的「噪声词」：出现在候选同一行里就降分
# （这些 $ 数字是运费/划线价/总价/定金，不是当前售价）
PRICE_NOISE_WORDS = [
    "delivery", "shipping", "ship ", "list price", "total", "deposit",
    "coupon", "gift card", "per month", "per case", "subscribe",
]
# 价格候选的「加分词」：更可能是主售价（buybox 一带常有这些词）
PRICE_GOOD_WORDS = ["buy new", "price:"]


def normalize(text):
    """
    把复制来的整页文本整理成好处理的样子：
      NBSP 等特殊空格 → 普通空格；零宽字符删掉；每行内的连续空格压成一个；
      行首尾空白去掉；空行保留（行结构是 BSR/标题定位的依据）。
    """
    t = str(text or "")
    for ch in (" ", " ", " ", " "):   # 各种窄空格
        t = t.replace(ch, " ")
    for ch in ("​", "﻿", "⁠"):             # 零宽字符
        t = t.replace(ch, "")
    t = t.replace("\t", " ").replace("\r\n", "\n").replace("\r", "\n")
    lines = [re.sub(r" {2,}", " ", ln).strip() for ln in t.split("\n")]
    return "\n".join(lines)


def detect_page_type(text):
    """
    判断粘贴的是商品页还是搜索页（防串味的关键）：
      商品页 → 全量提取；
      搜索页 → 只提取「搜索结果数」，其余字段不动（页面上根本没有）。
    判定顺序有讲究：先认商品页特征——商品页评论区也有 "Sort by"，
    若先查搜索特征会把商品页误判成搜索页。
    返回 "product" / "search" / "unknown"。
    """
    t = text.lower()
    if "best sellers rank" in t or "about this item" in t or "add to cart" in t:
        return "product"
    if re.search(r"[\d,]+\s+results\s+for\b", t) or re.search(r"\bof\s+[\d,]+\s+results\b", t):
        return "search"
    if "results" in t and "sort by" in t:
        return "search"
    return "unknown"


def parse_review_dates(text):
    """
    收集文本里所有「on 月份 数字, 年份」形式的评论日期，返回 date 列表。
    未来日期直接丢弃——那是配送日期（delivery on October 20），不是评论；
    不丢会把「最新评论距今天数」算成 0 天，活跃度虚高。
    """
    today = date.today()
    dates = []
    for m in DATE_RE.finditer(text):
        mon = _MONTHS.get(m.group(1).lower())
        if not mon:
            continue
        try:
            d = date(int(m.group(3)), mon, int(m.group(2)))
        except ValueError:
            continue
        if date(2000, 1, 1) <= d <= today:   # 评论日期不可能在未来
            dates.append(d)
    return dates


def days_from_dates(dates, today=None):
    """
    用「全部日期里的最大值」算最新评论距今天数。
    为什么取最大：Amazon 默认按 Top reviews 排序，第一条不一定最新，
    取首条会系统性高估活跃天数；取最大值才是「最近一条评论」。
    """
    if not dates:
        return None
    today = today or date.today()
    return max(0, (today - max(dates)).days)


def _pick_price(text):
    """
    从一堆 $ 数字里挑出「当前售价」。
    打分制，上下文只看候选所在的「同一行」——Amazon 复制文本里
    划线价/售价/运费各占一行，跨行取上下文会把隔壁行的 "Buy new:"
    记到划线价头上（实测踩坑）。同行内：噪声词 -3，加分词 +1；
    同分取先出现的。
    """
    candidates = []
    for m in PRICE_RE.finditer(text):
        try:
            value = float(m.group(1).replace(",", ""))
        except ValueError:
            continue
        if not (0.5 <= value <= 5000):
            continue
        line_start = text.rfind("\n", 0, m.start()) + 1
        line_end = text.find("\n", m.end())
        if line_end == -1:
            line_end = len(text)
        ctx = text[line_start:line_end].lower()
        score = -3 * sum(1 for w in PRICE_NOISE_WORDS if w in ctx)
        score += sum(1 for w in PRICE_GOOD_WORDS if w in ctx)
        candidates.append((score, m.start(), value))
    if not candidates:
        return None
    candidates.sort(key=lambda c: (-c[0], c[1]))
    return candidates[0][2]


def _pick_reviews(text):
    """
    评论总数：优先取评分行紧邻的「X ratings」。
    先在评分行上下文里找，找不到再全局兜底（取最大值——页脚汇总数最大）。
    """
    m = RATING_RE.search(text)
    if m:
        nearby = text[m.end():m.end() + 60]
        r = REVIEWS_RE.search(nearby)
        if r:
            return int(r.group(1).replace(",", ""))
    nums = [int(m.group(1).replace(",", "")) for m in REVIEWS_RE.finditer(text)]
    return max(nums) if nums else None


def _pick_bsr(text):
    """
    大类 BSR：先锚「Best Sellers Rank」再取其后第一行 #1,560 in Pet Supplies。
    返回 (rank:int, category:str|None)——category 只作关键词建议，绝不自动提交。
    """
    anchor = BSR_ANCHOR_RE.search(text)
    scope = text[anchor.end():anchor.end() + 400] if anchor else ""
    m = BSR_RE.search(scope)
    if not m:
        return None, None
    rank = int(m.group(1).replace(",", ""))
    category = m.group(2).strip()
    return rank, (category if 2 <= len(category) <= 40 else None)


# 评分行上方不像标题的行（导航/菜单废料）——末尾 \b 防误杀 "Allen Key Set" 这类标题
_NAV_JUNK_RE = re.compile(
    r"^(?:all|best sellers|new releases|movers & shakers|deliver to|your orders|"
    r"returns & orders|cart|account|lists|menu|sell|customer service|sign in|"
    r"hello,|browse|department|departments|results|sort by|visit the)\b",
    re.I,
)


def _pick_title(text, rating_pos):
    """
    商品标题：评分行上方 15 行里，找最像标题的那一行。
    像标题 = 够长（20–250 字符）、不是导航废料、字母占比过半。
    找不到就放弃（标题手输也快）。
    """
    if rating_pos is None:
        rating_pos = min(len(text), 8000)
    window = text[:rating_pos].split("\n")[-15:]
    best, best_len = None, 0
    for ln in window:
        if not (20 <= len(ln) <= 250):
            continue
        if _NAV_JUNK_RE.match(ln):
            continue
        letters = sum(c.isalpha() or c.isspace() for c in ln)
        if letters / len(ln) < 0.55:
            continue
        if len(ln) > best_len:
            best, best_len = ln, len(ln)
    return best


def extract(text):
    """
    主入口：整页文本 → 结构化提取结果。
    返回（/api/extract 原样透传给前端）：
      {
        "page_type": "product" | "search" | "unknown",
        "asin": "B0XXXXXXXX" | None,
        "fields": { key: {"value": ..., "note": 中文说明} },   # 与前端 AN_FIELDS 对齐
        "found": [提取成功的 key 列表],
        "warnings": [给用户看的中文提示],
        "bsr_category": "Pet Supplies" | None,
      }
    """
    text = normalize(text)[:MAX_TEXT]
    warnings = []
    fields = {}
    page_type = detect_page_type(text)

    # ASIN：链接形态优先；不行再找裸 B0 开头 10 位码
    asin = None
    m = ASIN_URL_RE.search(text)
    if m:
        asin = m.group(1).upper()
    else:
        m = ASIN_BARE_HINT_RE.search(text)
        if m:
            asin = m.group(0).upper()

    # ---- 搜索页：只拿结果数就收工 ----
    if page_type == "search":
        r = RESULTS_NUM_RE.search(text)
        if r:
            fields["results"] = {"value": int(r.group(1).replace(",", "")), "note": "搜索页结果数"}
        else:
            warnings.append("这像是搜索结果页，但没找到「N results」字样，请手动填搜索结果数")
        warnings.append("粘贴的是搜索页：只提取了搜索结果数，其余数字请打开商品页采集")
        return {
            "page_type": page_type, "asin": None, "fields": fields,
            "found": list(fields.keys()), "warnings": warnings, "bsr_category": None,
        }

    # ---- 商品页（或 unknown，尽量提取） ----
    rm = RATING_RE.search(text)
    if rm:
        fields["rating"] = {"value": float(rm.group(1)), "note": "页面星级"}
    reviews = _pick_reviews(text)
    if reviews is not None:
        fields["reviews"] = {"value": reviews, "note": "评分旁的 ratings 数量"}
    price = _pick_price(text)
    if price is not None:
        fields["price"] = {"value": price, "note": "按上下文挑出的主售价，请核对"}
    bsr, category = _pick_bsr(text)
    if bsr is not None:
        fields["bsr"] = {"value": bsr, "note": "Best Sellers Rank 第一行"}
    days = days_from_dates(parse_review_dates(text))
    if days is not None:
        fields["days"] = {"value": days, "note": "按最新一条评论日期计算"}
    title = _pick_title(text, rm.start() if rm else None)
    if title:
        fields["name"] = {"value": title[:200], "note": "页面标题（截取）"}

    if page_type == "unknown":
        warnings.append("没认出这是商品页——已尽力提取，请人工核对各项数字")

    return {
        "page_type": page_type, "asin": asin, "fields": fields,
        "found": list(fields.keys()), "warnings": warnings, "bsr_category": category,
    }


# ============================================================
# 自测：内嵌两段「真实商品页/搜索页复制文本」的仿真快照
# （结构取自 Amazon 真实页面的复制格式，字段值为示例值）
# ============================================================
if __name__ == "__main__":
    product_page = """
Deliver to Beijing 100000 China
All
Best Sellers
New Releases
Customer Service
Furhaven Plush & Suede Orthopedic Dog Bed for Large Dogs, Washable Cover, Egg Crate Foam, Grey, L
Visit the Furhaven Pet Products Store
4.4 out of 5 stars 2,310 ratings
#1 Best Seller in Dog Beds
List Price: $59.99
$39.99 with 34 percent savings
Buy new: $39.99
FREE Returns
FREE delivery Tuesday, October 20
Or fastest delivery Tomorrow, October 15
In Stock
Ships from Amazon
Sold by Furhaven Pet Products
About this item
Top reviews
Sort by: Top
Reviewed in the United States on October 8, 2026
Size: L
Color: Grey
Verified Purchase
Reviewed in the United States on September 28, 2026
Great bed for the money
Reviewed in the United States on October 10, 2026
Product information
Brand Furhaven
Item Weight 8.8 Pounds
Best Sellers Rank #1,560 in Pet Supplies (See Top 100 in Pet Supplies)
#42 in Dog Beds
Date First Available October 12, 2023
"""

    search_page = """
1-16 of 5,000 results for "dog bed for large dogs"
Results
Check each product page for other buying options.
Sort by: Featured
dog bed for large dogs
Under $25
$25 to $50
Furhaven Dog Bed for Large Dogs
$23.99 with 40 percent savings
4.5 out of 5 stars 8,102
"""

    print("== 商品页快照 ==")
    r1 = extract(product_page)
    assert r1["page_type"] == "product", r1["page_type"]
    f1 = r1["fields"]
    assert f1["rating"]["value"] == 4.4, f1.get("rating")
    assert f1["reviews"]["value"] == 2310, f1.get("reviews")
    assert f1["price"]["value"] == 39.99, f1.get("price")   # 必须避开 59.99 划线价
    assert f1["bsr"]["value"] == 1560, f1.get("bsr")
    assert r1["bsr_category"] == "Pet Supplies", r1.get("bsr_category")
    assert f1["days"]["value"] in (0, 1, 2, 3), f1.get("days")   # 最新评论 10-10，距今很近
    assert "name" in f1 and "Furhaven" in f1["name"]["value"], f1.get("name")
    print("  rating/reviews/price/bsr/days/name 全部通过；warnings:", r1["warnings"])

    print("== 搜索页快照 ==")
    r2 = extract(search_page)
    assert r2["page_type"] == "search", r2["page_type"]
    assert r2["fields"]["results"]["value"] == 5000, r2["fields"]
    assert list(r2["fields"].keys()) == ["results"], r2["fields"]
    assert r2["asin"] is None   # 搜索页里的 ASIN 是广告位商品，不可信，必须丢弃
    print("  只提取 results=5000，其余字段不动 ✓")

    print("== 配送日期不污染评论日期 ==")
    # 陷阱样本：配送日期在未来（10 月 20 日）、真实评论在 10 月 1 日
    trap = "FREE delivery on October 20, 2026\nReviewed in the United States on October 1, 2026\nAbout this item\n"
    r3 = extract(trap)
    assert r3["fields"]["days"]["value"] >= 10, r3["fields"].get("days")   # 只认 10-01 那条
    print("  未来配送日期已过滤，days =", r3["fields"]["days"]["value"], "✓")

    print("== 空文本/短文本 ==")
    r4 = extract("hello world")
    assert r4["page_type"] == "unknown" and not r4["found"]
    print("  unknown + 零字段 ✓")

    print("=" * 50)
    print("extract.py 自测完成，没有报错。")
