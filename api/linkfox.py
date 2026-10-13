# -*- coding: utf-8 -*-
"""
选品罗盘 · LinkFoxAI 开放平台客户端（v8「AI 作图工坊」的后端引擎）
------------------------------------------------------------
把紫鸟/LinkFoxAI 的算力接进罗盘：抠图、场景裂变、相似图裂变、
智能修图、换模特、AI 文案。全部走 https://ai-api.linkfox.com 的
开放 REST 接口，纯 Python 标准库实现（urllib），零新依赖。

密钥安全（三条铁律）：
  1. API Key 只存在 api/linkfox_key.txt（已进 .gitignore，绝不进仓库）；
  2. Key 只在后端出现，前端永远只跟本机 /api/linkfox/* 打交道；
  3. 云端部署时密钥文件通过 PythonAnywhere Files API 单独上传。

调用模型（官方文档 docs/linkfox-ai）：
  提交任务 → 拿 data.id（按字符串保存，防 JS 大整数丢精度）
  → 每 ≥10 秒 POST 查询 → status 1排队/2生成/3成功/4失败
  → 成功后 resultList[].url 取图（地址 8 小时有效，可刷新）。

扣费：按张计费的功能提交即受理、成功后扣点；文案按 token 计费
（最低 1 点）。查询接口的 data.count 是实际扣点，一律以它为准。

自测：python linkfox.py —— 只调免费的余额接口，不花点数。
"""

import json
import re
import urllib.error
import urllib.request
from pathlib import Path

API_DIR = Path(__file__).resolve().parent
KEY_FILE = API_DIR / "linkfox_key.txt"     # 第一行 = API Key
BASE = "https://ai-api.linkfox.com"
TIMEOUT = 60                                # 生图接口偶尔慢，给足


class LinkFoxError(Exception):
    """给用户看的中文错误（前端直接 toast 这段话）。"""


# ---------------- 密钥 ----------------
def load_key():
    """读取 API Key；文件缺失/为空时给出可操作的提示。"""
    if KEY_FILE.exists():
        for line in KEY_FILE.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line:
                return line
    raise LinkFoxError(
        "还没有配置 LinkFoxAI 的 API Key——把 Key 写进 api/linkfox_key.txt "
        "（第一行，sk- 开头）再重启后端"
    )


# ---------------- 底层请求 ----------------
# 官方错误码 → 中文处理建议（intro.html 常见错误表）
_FRIENDLY = {
    "ERR_FILED_VALIDATE": "请求参数不符合要求，请检查图片地址和张数",
    "ERR_VALIDATE_FAIL": "参数校验未通过，请检查图片格式与尺寸限制",
    "ERR_IMAGE_MAKE_AUDIT": "图片或描述未通过平台审核——换一张图或调整描述后重试",
    "ERR_IMAGE_MAKE_WILL_OUT": "算力点数不足——去紫鸟/LinkFoxAI 后台充值，或减少输出张数",
    "ERR_FORBIDDEN": "无权访问该任务（任务不属于当前团队）",
    "ERR_NOT_HAVE_TEAM_PRIVILEGE": "账号未绑定团队——先在 LinkFoxAI 完成团队绑定",
    "TEAM_PERMISSION_DISABLE_USER": "账号已被团队禁用，请联系管理员",
    "TEAM_PERMISSION_EXPIRE": "套餐已过期或尚未购买——检查 LinkFoxAI 套餐状态",
}


def _post(path, payload):
    """POST JSON → 解析 → code!=200 抛中文错误，成功返回 data 部分。"""
    body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
    req = urllib.request.Request(
        BASE + path,
        data=body,
        headers={
            "Authorization": "Bearer " + load_key(),
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            result = json.loads(resp.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        # 平台校验失败多走 4xx + JSON 错误体，尽量翻译出来
        try:
            result = json.loads(e.read().decode("utf-8"))
        except Exception:
            raise LinkFoxError(f"LinkFoxAI 接口返回 HTTP {e.code}，请稍后重试")
    except (urllib.error.URLError, TimeoutError) as e:
        msg = str(e)
        if "403" in msg and "Tunnel" in msg:
            # PythonAnywhere 免费档只放行少数白名单域名，ai-api.linkfox.com 不在其中
            raise LinkFoxError(
                "云服务器（PythonAnywhere 免费档）不放行 LinkFoxAI 的域名——"
                "AI 作图工坊请在本地版使用（启动选品罗盘.bat），云上其余功能不受影响")
        raise LinkFoxError(f"连不上 LinkFoxAI（{msg}）——检查网络后重试")
    except json.JSONDecodeError:
        raise LinkFoxError("LinkFoxAI 返回了无法解析的内容，请稍后重试")

    if result.get("code") not in (200, "200"):
        key = str(result.get("msgKey") or "")
        msg = str(result.get("msg") or "调用失败")
        raise LinkFoxError(_FRIENDLY.get(key, f"{msg}（{key}）" if key else msg))
    return result.get("data") or {}


# ---------------- 算力余额（免费接口） ----------------
def plan():
    """套餐与点数：total/usage/剩余/有效期。"""
    d = _post("/v1/userPlan/info", {})
    total = int(d.get("total") or 0)
    usage = int(d.get("usage") or 0)
    return {
        "total": total,
        "usage": usage,
        "remaining": max(0, total - usage),
        "start_time": str(d.get("startTime") or ""),
        "expire_time": str(d.get("expireTime") or ""),
    }


# ---------------- 图片上传（本地图 → 公网地址，免费） ----------------
_UPLOAD_EXT = {"jpeg", "jpg", "png", "webp", "mp4", "mov"}


def upload_base64(file_name, b64):
    """本地图片转公网地址：POST /image/v2/uploadByBase64。≤10MB，最长边 ≤4096。"""
    name = str(file_name or "").strip()
    ext = name.rsplit(".", 1)[-1].lower() if "." in name else ""
    if ext not in _UPLOAD_EXT:
        raise LinkFoxError(f"不支持的文件类型 .{ext or '(无后缀)'}——只认 {'/'.join(sorted(_UPLOAD_EXT))}")
    b64 = re.sub(r"^data:[^,]+,", "", str(b64 or "").strip())   # 容错：剥掉 dataURL 前缀
    if len(b64) > 14_000_000:
        raise LinkFoxError("图片超过 10MB 上限——先压缩再传（最长边也别超过 4096）")
    d = _post("/image/v2/uploadByBase64", {"fileName": name, "base64": b64})
    url = str(d.get("viewUrl") or "")
    if not url:
        raise LinkFoxError("上传成功但没返回地址，请重试")
    return url


# ---------------- 作图任务：提交 ----------------
# 各功能的端点与固定点数（智能修图按模型动态计费，标 None）
KINDS = {
    "cutout":       {"name": "自动抠图", "path": "/image/v2/make/cutout",       "per_image": 10},
    "sceneFission": {"name": "场景裂变", "path": "/image/v2/make/sceneFission", "per_image": 20},
    "similarFission": {"name": "相似图裂变", "path": "/image/v2/make/imageToImage", "per_image": 20},
    "imageEdit":    {"name": "智能修图", "path": "/image/v3/make/imageEdit",    "per_image": None},
    "changeModel":  {"name": "换模特",   "path": "/image/v2/make/changeModel",  "per_image": 20},
}

_URL_RE = re.compile(r"^https?://\S+$", re.I)
_PROMPT_MAX = {"imageEdit": 3000, "default": 600}


def _require_url(value, label):
    url = str(value or "").strip()
    if not _URL_RE.match(url):
        raise LinkFoxError(f"请填有效的{label}（http/https 开头的图片地址），或用「上传本地图片」")
    return url


def _int_in(value, lo, hi, label, default=None):
    try:
        n = int(str(value).strip())
    except (ValueError, AttributeError):
        if default is not None:
            return default
        raise LinkFoxError(f"{label}必须是 {lo}–{hi} 的数字")
    if not lo <= n <= hi:
        raise LinkFoxError(f"{label}取值范围 {lo}–{hi}")
    return n


def _ratio_str(value, lo, hi, label):
    """[lo,hi] 区间的小数参数：官方要字符串（如 strength/sceneStrength）。"""
    s = str(value or "").strip()
    if not s:
        return None
    try:
        v = round(max(lo, min(hi, float(s))), 1)
    except ValueError:
        raise LinkFoxError(f"{label}必须是 {lo}–{hi} 的小数（一位小数即可）")
    return f"{v:.1f}"


def build_payload(kind, p):
    """按功能把前端参数组装成官方请求体（顺手做校验，报错都是中文）。"""
    payload = {"imageUrl": _require_url(p.get("imageUrl"), "原图地址")}

    if kind == "cutout":
        sub = _int_in(p.get("subType"), 1, 13, "抠图类型", default=3)
        if sub not in (1, 2, 3, 9, 12, 13):
            raise LinkFoxError("抠图类型必须是 通用/人像/商品/服饰/头发/人脸 之一")
        payload["subType"] = sub
        if sub == 9:
            cloth = str(p.get("clothClass") or "").strip()
            if cloth:
                payload["clothClass"] = cloth

    elif kind == "sceneFission":
        strength = _ratio_str(p.get("strength"), 0.1, 1.0, "相似度")
        if strength:
            payload["strength"] = strength          # 官方要字符串："0.5"
        mode = str(p.get("fissionMode") or "SCENE_FISSION_REALISTIC")
        if mode not in ("SCENE_FISSION_REALISTIC", "SCENE_FISSION_SIMPLE", "SCENE_FISSION_INTELLIGENT"):
            mode = "SCENE_FISSION_REALISTIC"
        payload["provider"] = mode
        prompt = str(p.get("prompt") or "").strip()
        if prompt:
            payload["prompt"] = prompt[:_PROMPT_MAX["default"]]

    elif kind == "similarFission":
        prompt = str(p.get("prompt") or "").strip()
        if prompt:
            payload["prompt"] = prompt[:_PROMPT_MAX["default"]]
        payload["weight"] = _int_in(p.get("weight"), 0, 2, "相似度", default=2)
        scale = str(p.get("scale") or "").strip()
        if scale:
            if not re.match(r"^\d{1,2}:\d{1,2}$", scale):
                raise LinkFoxError("输出比例格式应如 1:1、9:16")
            payload["scale"] = scale
        else:
            # 官方要求 scale 与自定义宽高必填其一；没填比例就补 1:1
            w = _int_in(p.get("width"), 384, 4096, "输出宽度", default=0)
            h = _int_in(p.get("height"), 384, 4096, "输出高度", default=0)
            if w and h:
                payload["width"], payload["height"] = w, h
            else:
                payload["scale"] = "1:1"

    elif kind == "imageEdit":
        prompt = str(p.get("prompt") or "").strip()
        if not prompt:
            raise LinkFoxError("智能修图必须填一句「想怎么改」的描述")
        payload["prompt"] = prompt[:_PROMPT_MAX["imageEdit"]]
        provider = str(p.get("provider") or "KONTEXT")
        if not re.match(r"^[A-Z0-9_]{2,40}$", provider):
            raise LinkFoxError("模型编码不合法")
        payload["provider"] = provider
        payload["needOptimize"] = str(p.get("needOptimize", "true")).lower() != "false"

    elif kind == "changeModel":
        payload["modelHeadImageUrl"] = _require_url(
            p.get("modelHeadImageUrl"), "模特头部图地址（换模特必填，512×512～2048×2048）")
        scene = str(p.get("sceneImgUrl") or "").strip()
        if scene:
            payload["sceneImgUrl"] = _require_url(scene, "场景参考图地址")
        scene_strength = _ratio_str(p.get("sceneStrength"), 0.0, 1.0, "场景相似度")
        if scene_strength:
            payload["sceneStrength"] = scene_strength   # 字符串，默认 0.7
        model_prompt = str(p.get("modelPrompt") or "").strip()
        if model_prompt:
            payload["modelPrompt"] = model_prompt       # 特征词逗号拼接：微笑,坐着,苗条…
        custom = str(p.get("customPrompt") or "").strip()
        if custom:
            payload["customPrompt"] = custom[:600]
        neg = str(p.get("customNegPrompt") or "").strip()
        if neg:
            payload["customNegPrompt"] = neg
        payload["genOriRes"] = str(p.get("genOriRes", "false")).lower() == "true"  # 原分辨率 25 点/张
        payload["realModel"] = str(p.get("realModel", "true")).lower() != "false"  # 人台图要传 false

    if kind != "cutout":   # 除抠图外都可 1–4 张
        payload["outputNum"] = _int_in(p.get("outputNum"), 1, 4, "输出张数", default=1)
    return payload


def estimate(kind, params):
    """预估本次点数（None=动态计费）。实耗以任务查询的 count 为准。"""
    spec = KINDS.get(kind)
    if not spec:
        return None
    per = spec["per_image"]
    if kind == "changeModel" and str(params.get("genOriRes", "false")).lower() == "true":
        per = 25                      # 原分辨率输出每张 25 点
    if per is None:
        return None
    num = params.get("outputNum", 1)
    try:
        num = int(num)
    except (ValueError, TypeError):
        num = 1
    return per * max(1, min(4, num))


def kinds_spec():
    """给前端的价目表（确认框展示用）。"""
    return [{"kind": k, "name": s["name"], "per_image": s["per_image"]}
            for k, s in KINDS.items()]


def create_task(kind, params):
    """提交作图任务 → 返回任务 ID（字符串）。code=200 只代表已受理。"""
    spec = KINDS.get(kind)
    if not spec:
        raise LinkFoxError(f"未知的作图功能：{kind}")
    data = _post(spec["path"], build_payload(kind, params))
    task_id = str(data.get("id") or "")
    if not task_id:
        raise LinkFoxError("平台受理了任务但没返回任务编号，请稍后在任务列表刷新查看")
    return task_id


# ---------------- 作图任务：查询 ----------------
_STATUS_TEXT = {1: "排队中", 2: "生成中", 3: "成功", 4: "失败"}


def task_info(task_id):
    """查询任务状态 → 归一化 dict（id 全部转字符串，防前端精度丢失）。"""
    tid = str(task_id or "").strip()
    if not tid or not tid.isdigit():
        raise LinkFoxError("任务编号不合法")
    d = _post("/image/v2/make/info", {"id": tid})
    status = int(d.get("status") or 0)
    images = []
    for it in (d.get("resultList") or []):
        if it.get("url"):
            images.append({
                "id": str(it.get("id") or ""),
                "url": str(it["url"]),
                "width": it.get("width"),
                "height": it.get("height"),
            })
    return {
        "id": tid,
        "status": status,
        "status_text": _STATUS_TEXT.get(status, "未知状态"),
        "count": d.get("count"),                     # 实际扣点（成功后才有）
        "error": str(d.get("errorMsg") or "") if status == 4 else "",
        "images": images,
    }


def refresh_image_url(image_id):
    """结果地址 8 小时过期后，用图片 ID 换新地址。"""
    iid = str(image_id or "").strip()
    if not iid.isdigit():
        raise LinkFoxError("图片编号不合法")
    d = _post("/image/v2/info", {"id": int(iid)})
    url = str(d.get("url") or "")
    if not url:
        raise LinkFoxError("没换到新地址，请稍后重试")
    return url


# ---------------- AI 文案（按 token 计费，最低 1 点） ----------------
def text_create(prompt, image_urls=None, model=None):
    """提交文案生成 → 任务 ID。prompt 上限 10 万字符。"""
    prompt = str(prompt or "").strip()
    if not prompt:
        raise LinkFoxError("文案任务不能为空——先写要生成的内容")
    if len(prompt) > 100_000:
        raise LinkFoxError("描述超过 10 万字符上限")
    payload = {"prompt": prompt}
    urls = [u for u in (image_urls or []) if _URL_RE.match(str(u or "").strip())]
    if urls:
        payload["imageUrlList"] = [str(u).strip() for u in urls][:10]
    if model and re.match(r"^[A-Z0-9_]{2,40}$", str(model)):
        payload["model"] = str(model)
    data = _post("/v2/process/result/textGen/create", payload)
    tid = str(data.get("id") or "")
    if not tid:
        raise LinkFoxError("平台没返回任务编号，请重试")
    return tid


def text_info(task_id):
    """查询文案任务 → {status, content, count, error}。官方建议 2–3 秒一查。"""
    tid = str(task_id or "").strip()
    if not tid or not tid.isdigit():
        raise LinkFoxError("任务编号不合法")
    d = _post("/v2/process/result/textGen/info", {"id": tid})
    status = int(d.get("status") or 0)
    result = d.get("result") or {}
    return {
        "id": tid,
        "status": status,
        "status_text": _STATUS_TEXT.get(status, "未知状态"),
        "content": str(result.get("content") or "") if status == 3 else "",
        "count": d.get("count"),
        "error": str(d.get("error") or "") if status == 4 else "",
    }


# ---------------- 图片下载代理（前端「下载到本地」走这里） ----------------
# 只放行 LinkFox 家的域名，防止本接口被当成任意 URL 下载器（SSRF）。
# 图床实测有 linkfoxai-ailab / linkfoxai-ailab-prod 两个桶，统一按前缀+OSS 后缀校验。


def _host_allowed(host):
    return bool(host) and (
        host.endswith("linkfox.com")                                   # 官网及其子域
        or (host.startswith("linkfox") and host.endswith(".aliyuncs.com"))  # LinkFox 的 OSS 桶
    )


def fetch_bytes(url):
    """安全下载结果图 → (字节流, 文件名)。非白名单域名直接拒绝。"""
    from urllib.parse import urlparse
    host = urlparse(str(url)).hostname or ""
    if not _host_allowed(host):
        raise LinkFoxError("只允许下载 LinkFoxAI 返回的结果图地址")
    req = urllib.request.Request(url, headers={"User-Agent": "product-compass/8.0"})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            data = resp.read(30_000_000)   # 上限 30MB，防异常大文件拖死后端
    except (urllib.error.URLError, TimeoutError) as e:
        raise LinkFoxError(f"图片拉取失败（{e}）——稍后再试，或用「打开原图」")
    name = url.rsplit("/", 1)[-1].split("?")[0] or "linkfox.jpg"
    return data, name


# ---------------- 自测（只调免费接口，不扣点） ----------------
if __name__ == "__main__":
    print("== LinkFoxAI 客户端自测 ==")
    try:
        info = plan()
    except LinkFoxError as e:
        print(f"[失败] {e}")
        raise SystemExit(1)
    print(f"[OK] 密钥有效")
    print(f"     当月总点数 {info['total']:,} · 已用 {info['usage']:,} · 剩余 {info['remaining']:,}")
    print(f"     套餐期 {info['start_time']} → {info['expire_time']}")
    print("[OK] 各功能端点：")
    for k, spec in KINDS.items():
        price = f"{spec['per_image']} 点/张" if spec["per_image"] else "按模型动态计费"
        print(f"     {spec['name']:<6} {spec['path']:<32} {price}")
