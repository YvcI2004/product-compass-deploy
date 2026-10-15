# -*- coding: utf-8 -*-
"""
选品罗盘 · 亚马逊选品数据客户端（v8.2「联网查询自动填表」的后端引擎）
------------------------------------------------------------
LinkFox 开放平台的「亚马逊选品」MCP 服务，网关地址：
  https://mcp-tool-gateway.linkfox.com/mcp/amazon-product-selection

一把钥匙开两扇门：鉴权与 AI 作图工坊（linkfox.py）完全相同——
同一个 Bearer Key（api/linkfox_key.txt），纯标准库 urllib，零新依赖。

MCP 网关是无状态 JSON-RPC（实测不需要先 initialize，直接 POST 即可）。
本模块只封两个业务口，供 main.py 的 /api/amz/* 路由调用：
  /amazon/product/detail   ASIN → 商品详情（标题/价格/评分/评论/BSR…按每 ASIN 计费）
  /amazon/search           关键词 → 搜索结果数（前端填 results 字段用）

花钱纪律（与作图工坊同一原则）：
  本模块自己**绝不主动发起计费调用**——自测（python amz_mcp.py）只调
  tools/list 元数据接口验证钥匙与链路；首次真实查询永远由用户在页面上
  点「查询」按钮触发（前端另有确认弹窗）。

返回值映射是「宽容」的：MCP 数据服务返回结构可能调整，_hunt 按层广度
优先找字段（key 大小写/驼峰下划线归一），找不到就报 missing，由用户在
「核对采集清单」里手补——公式与置信度体系照常兜底。
"""

import json
import re
import urllib.error
import urllib.request

import linkfox   # 复用：load_key() / LinkFoxError / 密钥文件三条铁律

MCP_URL = "https://mcp-tool-gateway.linkfox.com/mcp/amazon-product-selection"
TOOL_DETAIL = "/amazon/product/detail"   # 亚马逊前端-商品详情
TOOL_SEARCH = "/amazon/search"           # 亚马逊前端搜索模拟
TIMEOUT = 120                            # 前端模拟类工具偶尔慢，给足
RAW_PREVIEW = 3000                       # 给前端的原始返回预览长度（排查映射用）

ASIN_RE = re.compile(r"^[A-Z0-9]{10}$")


# ---------------- JSON-RPC 底层 ----------------
def _rpc(method, params=None, msg_id=1):
    """POST 一条 JSON-RPC 到 MCP 网关 → 返回 result 部分；失败抛中文 LinkFoxError。"""
    body = json.dumps(
        {"jsonrpc": "2.0", "id": msg_id, "method": method,
         "params": params or {}},
        ensure_ascii=False,
    ).encode("utf-8")
    req = urllib.request.Request(
        MCP_URL,
        data=body,
        headers={
            "Authorization": "Bearer " + linkfox.load_key(),
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            raw = resp.read().decode("utf-8")
    except urllib.error.HTTPError as e:
        try:
            err = json.loads(e.read().decode("utf-8"))
        except Exception:
            err = {}
        raise linkfox.LinkFoxError(_friendly(str(err.get("errmsg") or f"HTTP {e.code}")))
    except (urllib.error.URLError, TimeoutError) as e:
        msg = str(e)
        if "403" in msg and "Tunnel" in msg:
            # 与作图工坊同款：PA 免费档不放行 linkfox 家域名
            raise linkfox.LinkFoxError(
                "云服务器（PythonAnywhere 免费档）不放行该数据服务的域名——"
                "联网查询请在本地版使用（启动选品罗盘.bat），云上其余功能不受影响")
        if "timed out" in msg or "timeout" in msg.lower():
            raise linkfox.LinkFoxError("查询超时（平台模拟前台浏览较慢）——稍等一会儿再试")
        raise linkfox.LinkFoxError(f"连不上数据服务（{msg}）——检查网络后重试")

    # 网关两种回包：纯 JSON，或 text/event-stream 里带一行 data: {...}
    if raw.lstrip().startswith("data:"):
        raw = next((ln[5:].strip() for ln in raw.splitlines()
                    if ln.startswith("data:")), "{}")
    try:
        packet = json.loads(raw)
    except json.JSONDecodeError:
        raise linkfox.LinkFoxError("数据服务返回了无法解析的内容，请稍后重试")
    if "error" in packet and packet["error"]:
        raise LinkFoxError(_friendly(str(packet["error"].get("message") or "调用失败")))
    return packet.get("result") or {}


def _friendly(msg):
    """常见平台报错 → 可操作的中文。"""
    m = str(msg)
    for pat, text in [
        ("authorized", "鉴权失败——API Key 可能已失效，请检查 api/linkfox_key.txt"),
        ("PERMISSION", "当前账号无权使用该数据服务（可能需要对应的订阅/套餐）"),
        ("QUOTA", "调用额度不足——到平台后台确认该数据服务的余量"),
        ("rate", "查询太频繁，被平台限流——等一分钟再试"),
    ]:
        if pat.lower() in m.lower():
            return text
    return m


def _call_tool(tool, arguments):
    """tools/call → 归一化出 dict/list/文本；isError=True 时抛中文错误。"""
    result = _rpc("tools/call", {"name": tool, "arguments": arguments})
    if result.get("isError"):
        texts = " ".join(str(c.get("text") or "") for c in result.get("content") or [])
        raise LinkFoxError(_friendly(texts.strip() or "数据服务返回了错误"))
    # 优先 structuredContent（新规范），否则把 content 里的 text 拼起来按 JSON 解析
    data = result.get("structuredContent")
    if data is not None:
        return data
    texts = [str(c.get("text") or "")
             for c in result.get("content") or [] if c.get("type") == "text"]
    joined = "\n".join(t for t in texts if t)
    if joined:
        try:
            return json.loads(joined)
        except json.JSONDecodeError:
            return joined
    # 有的网关把数据直接放 result 里（非标准但见过）
    return {k: v for k, v in result.items() if k not in ("content", "isError")} or {}


# ---------------- 宽容字段映射 ----------------
def _norm_key(k):
    """key 归一：小写 + 去下划线，让 camelCase / snake_case / 全小写互相认亲。"""
    return re.sub(r"[_\-\s]", "", str(k)).lower()


def _hunt(obj, names, accept=None, depth=0):
    """按层广度优先找第一个 key 匹配的字段值（浅的优先，防止钻进无关子结构）。
    accept(v) 不通过就继续找；返回 (value, 原始key) 或 None。"""
    if depth > 6:
        return None
    want = {re.sub(r"[_\-\s]", "", n).lower() for n in names}
    queue = [obj]
    # 先扫当前层
    for node in queue:
        if isinstance(node, dict):
            for k, v in node.items():
                if _norm_key(k) in want:
                    val = _unwrap_scalar(v)
                    if accept is None or (val is not None and accept(val)):
                        return val, str(k)
    # 再递归下一层（dict 值与 list 元素）
    deeper = []
    for node in queue:
        if isinstance(node, dict):
            deeper.extend(v for v in node.values() if isinstance(v, (dict, list)))
        elif isinstance(node, list):
            deeper.extend(v for v in node if isinstance(v, (dict, list)))
    for sub in deeper:
        hit = _hunt(sub, want, accept, depth + 1)
        if hit is not None:
            return hit
    return None


def _unwrap_scalar(v):
    """值可能是 {amount: 29.99} / {url: ...} / [ {...} ] 这类包装，剥出标量。"""
    if isinstance(v, dict):
        for k in ("amount", "value", "text", "url", "display", "number", "count"):
            if k in v and not isinstance(v[k], (dict, list)):
                return v[k]
        return None
    if isinstance(v, list):
        return _unwrap_scalar(v[0]) if v else None
    if isinstance(v, bool) or v is None:
        return None
    return v


_FLOAT_RE = re.compile(r"-?\d+(?:\.\d+)?")
_INT_RE = re.compile(r"\d[\d,]*")


def _to_float(v):
    """'$29.99' / '1,234' / 4.4 / '4.4 out of 5 stars' → float；解析不出给 None。"""
    s = str(v).replace(",", "").replace("$", "").strip()
    m = _FLOAT_RE.search(s)
    return float(m.group()) if m else None


def _to_int(v):
    m = _INT_RE.search(str(v))
    return int(m.group().replace(",", "")) if m else None


# 各字段的候选 key（归一后匹配）与合法性过滤
_FIELD_SPECS = {
    "name":    (["title", "producttitle", "productname", "name"],
                lambda v: 3 < len(str(v).strip()) < 300),
    "price":   (["price", "buyboxprice", "listprice", "dealprice", "priceamount",
                 "currentprice", "sellingprice"],
                lambda v: (x := _to_float(v)) is not None and 0 < x < 100000),
    "rating":  (["rating", "starrating", "averagerating", "ratingvalue", "stars",
                 "ratingaverage"],
                lambda v: (x := _to_float(v)) is not None and 0 < x <= 5),
    "reviews": (["ratingstotal", "reviewstotal", "ratingcount", "reviewscount",
                 "totalreviews", "ratingscount", "reviewcount", "numratings",
                 "totalratings"],
                lambda v: (x := _to_int(v)) is not None and 0 <= x <= 50_000_000),
    "bsr":     (["bsr", "bestsellerrank", "bestsellersrank", "salesrank",
                 "categoryrank", "rank"],
                lambda v: (x := _to_int(v)) is not None and 1 <= x <= 100_000_000),
    "brand":   (["brand", "bylineinfo", "byline", "manufacturer"],
                lambda v: 1 < len(str(v).strip()) < 80),
    "image":   (["mainimage", "heroimage", "imageurl", "image", "thumbnail",
                 "primaryimage"],
                lambda v: str(v).startswith("http")),
}

# 映射到前端表单字段的顺序（与 AN_FIELDS 对齐的部分）
_FILLABLE = ["name", "price", "rating", "reviews", "bsr"]


def map_product(raw):
    """把工具返回的原始结构宽容映射成表单字段。返回 (fields, missing, preview)。"""
    fields = {}
    for key in _FILLABLE + ["brand", "image"]:
        names, accept = _FIELD_SPECS[key]
        hit = _hunt(raw, names, accept)
        if hit is None:
            continue
        val, src_key = hit
        if key in ("price", "rating"):
            fields[key] = {"value": _to_float(val), "note": src_key}
        elif key in ("reviews", "bsr"):
            fields[key] = {"value": _to_int(val), "note": src_key}
        else:
            fields[key] = {"value": str(val).strip(), "note": src_key}
    missing = [k for k in _FILLABLE if k not in fields]
    preview = json.dumps(raw, ensure_ascii=False, indent=1)[:RAW_PREVIEW]
    return fields, missing, preview


def product_detail(asin):
    """ASIN → 商品详情（一次计费调用；由用户在页面点击触发）。"""
    asin = str(asin or "").strip().upper()
    if not ASIN_RE.match(asin):
        raise linkfox.LinkFoxError("ASIN 格式不对——需要 10 位字母数字（如 B0D9RPX853）")
    raw = _call_tool(TOOL_DETAIL, {
        "asins": asin,
        "amazonDomain": "amazon.com",
        "language": "en_US",
        "deliveryZip": "10001",      # 亚马逊前台常用邮编（纽约），保证价格/库存口径稳定
        "device": "desktop",
    })
    fields, missing, preview = map_product(raw)
    return {"asin": asin, "fields": fields, "missing": missing, "raw_preview": preview}


def search(keyword):
    """关键词 → 搜索结果数（一次计费调用；填 results 字段用）。"""
    kw = str(keyword or "").strip()
    if not kw or len(kw) > 120:
        raise linkfox.LinkFoxError("关键词不能为空，且不超过 120 个字符")
    raw = _call_tool(TOOL_SEARCH, {
        "keyword": kw,
        "page": 1,
        "amazonDomain": "amazon.com",
        "language": "en_US",
        "deliveryZip": "10001",
        "device": "desktop",
    })
    hit = _hunt(raw, ["totalresults", "resultscount", "resultcount", "total",
                      "totalcount", "totalresultscount", "resultscounttext"],
                lambda v: (x := _to_int(v)) is not None and 0 <= x <= 2_000_000_000)
    results = _to_int(hit[0]) if hit else None
    preview = json.dumps(raw, ensure_ascii=False, indent=1)[:RAW_PREVIEW]
    return {"keyword": kw, "results": results, "raw_preview": preview}


def tools_count():
    """tools/list 元数据（免费）——自测用：验证钥匙与网关链路。"""
    result = _rpc("tools/list")
    return len(result.get("tools") or [])


# ---------------- v8.6 · 评论分析（按星级取样） ----------------
TOOL_REVIEWS = "/amazon/reviews/list"      # 精品服务-商品评论（单 ASIN/次）


def _iter_lists(obj, depth=0):
    """深度优先枚举结构里所有 list（供找评论数组用）。"""
    if depth > 7:
        return
    if isinstance(obj, list):
        yield obj
        for v in obj:
            yield from _iter_lists(v, depth + 1)
    elif isinstance(obj, dict):
        for v in obj.values():
            yield from _iter_lists(v, depth + 1)


def _is_review_dict(d):
    """像评论的 dict：有正文类字段，或（星级+标题）；排除表格列定义等元数据。"""
    keys = {_norm_key(k) for k in d}
    if keys & {"celltype", "sortable", "filterable", "field", "columntype"}:
        return False                       # 表格列定义（真实返回里踩过：列也有 title）
    has_content = bool(keys & {"content", "text", "reviewcontent", "comment",
                               "body", "reviewtext"})
    has_rating = bool(keys & {"rating", "star", "stars", "rate", "ratingvalue",
                              "starnum", "ratingtext"})
    return has_content or (has_rating and bool(keys & {"title", "reviewtitle"}))


def _find_reviews(data):
    """在任意结构里找「评论数组」：元素是 dict 且长得像评论，按命中密度选最优。
    每条归一成 {rating:int, title, content, date}；rating 解析不出保 0。"""
    best, best_score = [], 0
    for lst in _iter_lists(data):
        dicts = [x for x in lst if isinstance(x, dict)]
        if len(dicts) < len(lst) * 0.6 or len(dicts) < 3:
            continue
        score = sum(1 for d in dicts[:50] if _is_review_dict(d))
        if score > best_score:
            best, best_score = dicts, score
    if best_score < 3:
        return []

    def _field(d, names):
        hit = _hunt(d, names)
        if hit is None:
            return ""
        return str(hit[0]).strip()

    out = []
    for d in best:
        rating = _to_float(_field(d, ["rating", "star", "stars", "rate",
                                      "ratingvalue", "starnum"]))
        if rating is None:   # 形如 "FIVE_STAR" / "5星" 的兜底
            raw = _field(d, ["rating", "star", "ratingtext"]).lower()
            for word, num in [("five", 5), ("four", 4), ("three", 3),
                              ("two", 2), ("one", 1)]:
                if word in raw:
                    rating = float(num)
                    break
        out.append({
            "rating": int(rating) if rating else 0,
            "title": _field(d, ["title", "reviewtitle"])[:200],
            "content": _field(d, ["content", "text", "reviewcontent", "comment",
                                  "body", "reviewtext"])[:2000],
            "date": _field(d, ["date", "reviewdate", "creattime", "createtime",
                               "timestamp", "reviewtime"])[:40],
        })
    return out


def _reviews_call(args):
    """单次评论调用：归一化 + 顺带提炼服务自己的 errcode/total（仅数字，供排查）。"""
    raw = _call_tool(TOOL_REVIEWS, args)
    items = _find_reviews(raw)
    meta = {}
    if isinstance(raw, dict):
        for k in ("errcode", "total"):
            try:
                meta[k] = int(raw.get(k))
            except (TypeError, ValueError):
                pass
    preview = json.dumps(raw, ensure_ascii=False, indent=1)[:RAW_PREVIEW]
    return items, meta, preview


def reviews_list(asin, star_nums=None, sort_by="recent", domain_code="com"):
    """按星级取样商品评论（计费调用；由用户在页面上点按钮触发）。
    star_nums: {1:n,…,5:n}——传了就只取这些星级；None = 服务默认每档 10 条。

    v8.7 教训：只传 asin+sortBy+星级时，平台多次「成功但 0 条」（errcode=200,
    total=0）。schema 里还有 domainCode/mediaType/formatType/reviewerType 四个
    有默认值的参数——全部显式传上规避。星级取样仍取到 0 条时，自动退回服务端
    默认口径（完全不传星级=每档 10 条）再试一次，两次都空才算失败。
    返回 (items, preview, diag)；diag 为各次尝试的数字摘要（写日志/报错用）。"""
    asin = str(asin or "").strip().upper()
    if not ASIN_RE.match(asin):
        raise linkfox.LinkFoxError("ASIN 格式不对——需要 10 位字母数字（如 B0D9RPX853）")
    base = {"asin": asin, "sortBy": sort_by, "domainCode": domain_code,
            "mediaType": "all_contents", "formatType": "all_formats",
            "reviewerType": "all_reviews"}
    args = dict(base)
    for s in range(1, 6):
        if star_nums and s in star_nums:
            args[f"star{s}Num"] = max(0, min(100, int(star_nums[s])))
    items, meta, preview = _reviews_call(args)
    diag = [f"星级取样 errcode={meta.get('errcode', '?')} total={meta.get('total', '?')} 取到{len(items)}条"]
    if len(items) < 3:
        items2, meta2, preview2 = _reviews_call(dict(base))
        diag.append(f"默认取样 errcode={meta2.get('errcode', '?')} total={meta2.get('total', '?')} 取到{len(items2)}条")
        if len(items2) > len(items):
            return items2, preview2, "；".join(diag)
    return items, preview, "；".join(diag)


LinkFoxError = linkfox.LinkFoxError   # 本模块与 linkfox 共用同一个异常类型


# ---------------- 自测（只调免费的 tools/list，绝不发起计费查询） ----------------
if __name__ == "__main__":
    print("== 亚马逊选品数据客户端自测（免费元数据，不产生查询费用）==")
    try:
        n = tools_count()
    except linkfox.LinkFoxError as e:
        print(f"[失败] {e}")
        raise SystemExit(1)
    print(f"[OK] 密钥有效，网关可达，「亚马逊选品」服务共 {n} 个工具")
    print("     本模块不自动发起计费查询——首次真实查询请在页面上点「查询」按钮")
