# -*- coding: utf-8 -*-
"""
选品罗盘 · 后端 API（Flask 版）
------------------------------------------------------------
v7.2 发动机更换：FastAPI → Flask。

为什么换：云部署平台 PythonAnywhere 的免费档只支持 WSGI（Flask/Django），
不支持 ASGI（FastAPI）。接口、路径、数据文件、报错格式全部与 FastAPI 版
保持一致（报错同样是 {"detail": "..."}），前端零改动。

本文件同时托管前端构建产物 dist/（云上一个网址装下整个系统）：
  /            → dist/index.html
  /assets/...  → dist 里的静态文件
  /api/...     → 数据接口

本地启动（在 api 目录，激活虚拟环境后）：
  python main.py        # http://localhost:8000
一键启动器（项目根的 启动选品罗盘.bat）已同步改成这条命令。
"""

import json
import subprocess
import sys
import uuid
from datetime import datetime
from pathlib import Path

from flask import Flask, jsonify, request, send_from_directory

import analyzer
import profit
import radar
from data import PRODUCTS as STATIC_PRODUCTS, INITIAL_ACTIVITIES, TAG_GROUPS, WORKSPACE, CURRENT_USER

API_DIR = Path(__file__).resolve().parent
GENERATED_DIR = API_DIR / "pipeline" / "generated"
PIPELINE_SCRIPT = API_DIR / "pipeline" / "run_pipeline.py"
ANALYSES_FILE = GENERATED_DIR / "analyses.json"   # ASIN 分析的历史记录
RADAR_FILE = GENERATED_DIR / "radar.json"         # 关键词雷达（关键词 + 采集轮次 + 动态）
PROJECTS_FILE = GENERATED_DIR / "projects.json"   # 立项看板（从 ASIN 分析转入的跟进项）
DIST_DIR = API_DIR.parent / "dist"                # 前端构建产物（npm run build 生成）

# 立项看板的阶段（顺序即流程：待评估 → 测算中 → 已立项 → 样品中 → 已放弃）
PROJECT_STAGES = ["待评估", "测算中", "已立项", "样品中", "已放弃"]

app = Flask(__name__)

# 跨域设置：本地开发时前端跑在 5173、后端跑在 8000，需要放行；
# 云上前端和接口同源（同一个网址），不走这段逻辑。
ALLOWED_ORIGINS = {"http://localhost:5173", "http://127.0.0.1:5173"}


@app.after_request
def add_cors(response):
    origin = request.headers.get("Origin", "")
    if origin in ALLOWED_ORIGINS:
        response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type"
    return response


def bad(status, msg):
    """统一报错格式，与原 FastAPI 版完全一致：{"detail": "中文提示"}。"""
    return jsonify({"detail": msg}), status


def get_body():
    """取 JSON 请求体；不是 JSON 对象时返回 None（调用方负责报 400）。"""
    payload = request.get_json(silent=True)
    return payload if isinstance(payload, dict) else None


# ============================================================
# （v7.1 用户系统已移除）单人本地工具，登录墙纯属仪式：
#   删掉了 /api/auth/* 四个接口、会话表和登录中间件，所有接口免令牌直连。
# ============================================================


def get_products():
    """
    每次请求都重新读 generated/products.json：跑完管线刷新浏览器即可生效，
    后端不用重启。（真实项目里这一步可以换成数据库 + 缓存。）
    管线还没跑过或文件损坏时，回退到 data.py 的静态样本。
    """
    f = GENERATED_DIR / "products.json"
    if f.exists():
        try:
            return json.loads(f.read_text(encoding="utf-8"))
        except Exception:
            pass
    return STATIC_PRODUCTS


def run_pipeline():
    """调用数据管线脚本，返回运行报告 dict；失败时给 500。"""
    result = subprocess.run(
        [sys.executable, str(PIPELINE_SCRIPT)],
        capture_output=True, text=True,
    )
    if result.returncode != 0:
        return None, result.stderr[-400:]
    report = json.loads((GENERATED_DIR / "run_report.json").read_text(encoding="utf-8"))
    return report, None


@app.route("/api/health", methods=["GET"])
def health():
    """健康检查：前端用它探测后端是否在线。"""
    return jsonify({"status": "ok", "service": "product-compass-api"})


@app.route("/api/bootstrap", methods=["GET"])
def bootstrap():
    """一次性返回前端首屏需要的全部数据（workspace / 用户 / 商品 / 动态 / 标签）。"""
    return jsonify({
        "workspace": WORKSPACE,
        "currentUser": CURRENT_USER,
        "products": get_products(),
        "activities": INITIAL_ACTIVITIES,
        "tagGroups": TAG_GROUPS,
    })


@app.route("/api/products", methods=["GET"])
def list_products():
    """
    商品列表，支持筛选：
      /api/products                          全部
      /api/products?platform=Amazon          只看主平台是 Amazon 的
      /api/products?category=宠物用品         只看宠物用品
      /api/products?min_score=75             只看机会指数 ≥ 75
    """
    platform = request.args.get("platform")
    category = request.args.get("category")
    min_score = request.args.get("min_score", default=0, type=int)

    result = [p for p in get_products() if p["score"] >= min_score]
    if platform:
        result = [p for p in result if p["platform"] == platform]
    if category:
        result = [p for p in result if p["category"] == category]
    result.sort(key=lambda p: p["score"], reverse=True)
    return jsonify({"count": len(result), "products": result})


@app.route("/api/products/<product_id>", methods=["GET"])
def get_product(product_id):
    """单个商品详情（例：/api/products/P-001）。"""
    for p in get_products():
        if p["id"] == product_id:
            return jsonify(p)
    return bad(404, f"找不到商品 {product_id}")


def get_analyses():
    """读取已保存的 ASIN 分析记录（与 products.json 同样：每次请求实时读文件）。"""
    if ANALYSES_FILE.exists():
        try:
            return json.loads(ANALYSES_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    return []


def save_analyses(items):
    """保存分析记录（最新的放最前，最多留 200 条，防止无限膨胀）。"""
    ANALYSES_FILE.write_text(
        json.dumps(items[:200], ensure_ascii=False, indent=2), encoding="utf-8"
    )


@app.route("/api/analyze", methods=["POST"])
def analyze_product():
    """
    ASIN 单品分析（真 demo 核心）：接收「链接/ASIN + 商品页抄来的 6 个数字」，
    用 analyzer 的透明公式算出机会指数，并把报告存进历史记录。
    输入不合格时返回 400，detail 里是能直接给用户看的中文提示。
    """
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    try:
        result = analyzer.analyze(payload)
    except analyzer.AnalysisError as e:
        return bad(400, str(e))
    except Exception as e:
        return bad(500, f"分析出错：{e}")

    analyses = get_analyses()
    analyses.insert(0, result)
    save_analyses(analyses)
    return jsonify(result)


@app.route("/api/analyses", methods=["GET"])
def list_analyses():
    """历史分析记录（按关键词分组对比由前端做，这里只管存取）。"""
    return jsonify({"count": len(get_analyses()), "analyses": get_analyses()})


@app.route("/api/analyses/<analysis_id>", methods=["DELETE"])
def delete_analysis(analysis_id):
    """删除一条分析记录。"""
    analyses = get_analyses()
    remaining = [a for a in analyses if a["id"] != analysis_id]
    if len(remaining) == len(analyses):
        return bad(404, f"找不到分析记录 {analysis_id}")
    save_analyses(remaining)
    return jsonify({"deleted": analysis_id, "count": len(remaining)})


# ============================================================
# 关键词雷达（真 demo 第二步：不定期采集 + 差值引擎）
# ============================================================
def get_radar():
    """读取雷达数据：keywords（每个含采集轮次）+ events（差值引擎生成的动态）。"""
    if RADAR_FILE.exists():
        try:
            data = json.loads(RADAR_FILE.read_text(encoding="utf-8"))
            return {"keywords": data.get("keywords", []), "events": data.get("events", [])}
        except Exception:
            pass
    return {"keywords": [], "events": []}


def save_radar(data):
    data["events"] = data["events"][:120]   # 动态最多留 120 条
    RADAR_FILE.write_text(
        json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def _now():
    return datetime.now().strftime("%Y-%m-%d %H:%M")


@app.route("/api/radar", methods=["GET"])
def radar_status():
    """雷达全量数据（关键词 + 每轮采集 + 动态流），前端工作台和雷达页共用。"""
    return jsonify(get_radar())


@app.route("/api/radar/keyword", methods=["POST"])
def radar_add_keyword():
    """添加监控关键词（去重：忽略大小写和首尾空格）。"""
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    kw = str(payload.get("keyword") or "").strip()
    if not kw or len(kw) > 60:
        return bad(400, "关键词不能为空，且不超过 60 个字符")

    data = get_radar()
    if any(k["keyword"].lower() == kw.lower() for k in data["keywords"]):
        return bad(400, f"「{kw}」已经在监控列表里了")

    entry = {
        "id": f"KW-{uuid.uuid4().hex[:8]}",
        "keyword": kw,
        "created_at": _now(),
        "rounds": [],
    }
    data["keywords"].append(entry)
    data["events"].insert(0, {
        "at": _now(), "kw": kw,
        "text": f"新增监控关键词「{kw}」——去 Amazon 搜索并完成第 1 轮采集",
    })
    save_radar(data)
    return jsonify(entry)


@app.route("/api/radar/collect", methods=["POST"])
def radar_collect():
    """
    提交一轮采集（5 个数）→ 打分 → 与上一轮对比 → 生成差值动态。
    这就是「智能」所在：人只抄数，涨跌和告知全部自动。
    """
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    data = get_radar()
    entry = next((k for k in data["keywords"] if k["id"] == str(payload.get("keyword_id") or "")), None)
    if not entry:
        return bad(404, "找不到这个关键词，可能已被删除，刷新页面试试")

    try:
        numbers = radar.validate_collect(payload)
        scored = radar.score_round(numbers)
    except analyzer.AnalysisError as e:
        return bad(400, str(e))

    prev = entry["rounds"][-1] if entry["rounds"] else None
    round_no = len(entry["rounds"]) + 1
    scored.update({"id": f"R-{uuid.uuid4().hex[:8]}", "collected_at": _now(), "round_no": round_no})
    entry["rounds"].append(scored)

    texts = (radar.diff_rounds(entry["keyword"], prev, scored, round_no) if prev
             else radar.first_round_events(entry["keyword"], scored))
    events = [{"at": _now(), "kw": entry["keyword"], "text": t} for t in texts]
    data["events"] = events + data["events"]

    save_radar(data)
    return jsonify({"round": scored, "delta_events": texts, "keyword": entry})


@app.route("/api/radar/keyword/<keyword_id>", methods=["DELETE"])
def radar_delete_keyword(keyword_id):
    """删除关键词（连同它的采集轮次和动态）。"""
    data = get_radar()
    entry = next((k for k in data["keywords"] if k["id"] == keyword_id), None)
    if not entry:
        return bad(404, "找不到这个关键词")
    data["keywords"] = [k for k in data["keywords"] if k["id"] != keyword_id]
    data["events"] = [e for e in data["events"] if e.get("kw") != entry["keyword"]]
    save_radar(data)
    return jsonify({"deleted": keyword_id, "count": len(data["keywords"])})


# ============================================================
# 利润测算（挂靠在某条 ASIN 分析上，随报告存档、进简报）
# ============================================================
@app.route("/api/analyses/<analysis_id>/profit", methods=["POST"])
def save_profit(analysis_id):
    """
    把一次利润测算存进对应的 ASIN 分析记录（覆盖旧测算）。
    公式在 profit.py：售价 − 佣金 − FBA − 采购 − 头程 − 其他 → 毛利率/保本价/月利润。
    """
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    analyses = get_analyses()
    entry = next((a for a in analyses if a["id"] == analysis_id), None)
    if not entry:
        return bad(404, "找不到这条分析记录")
    try:
        inputs = profit.validate(payload)
        result = profit.compute(inputs)
    except analyzer.AnalysisError as e:
        return bad(400, str(e))
    entry["profit"] = {"inputs": inputs, "result": result}
    save_analyses(analyses)
    return jsonify(entry)


# ============================================================
# 立项看板（选品工作流第四环：验证完 → 跟到样品/下单）
# ============================================================
def get_projects():
    if PROJECTS_FILE.exists():
        try:
            return json.loads(PROJECTS_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    return []


def save_projects(items):
    PROJECTS_FILE.write_text(
        json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8"
    )


@app.route("/api/projects", methods=["GET"])
def list_projects():
    """全部立项项（含已放弃），前端按阶段分列展示。"""
    return jsonify({"count": len(get_projects()), "projects": get_projects()})


@app.route("/api/projects", methods=["POST"])
def add_project():
    """把一条 ASIN 分析转为立项项（同一分析只能立一次项）。"""
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    analysis_id = str(payload.get("analysis_id") or "")
    analyses = get_analyses()
    entry = next((a for a in analyses if a["id"] == analysis_id), None)
    if not entry:
        return bad(404, "找不到对应的分析记录")
    projects = get_projects()
    if any(p["analysis_id"] == analysis_id for p in projects):
        return bad(400, f"「{entry['name']}」已经在看板里了")

    project = {
        "id": f"PJ-{uuid.uuid4().hex[:8]}",
        "analysis_id": analysis_id,
        "name": entry["name"],
        "asin": entry["asin"],
        "keyword": entry["keyword"],
        "score": entry["score"],
        "grade_cls": entry["grade_cls"],
        "margin": entry.get("profit", {}).get("result", {}).get("margin"),
        "stage": "待评估",
        "note": "",
        "created_at": _now(),
        "updated_at": _now(),
    }
    projects.insert(0, project)
    save_projects(projects)
    return jsonify(project)


@app.route("/api/projects/<project_id>", methods=["PATCH"])
def update_project(project_id):
    """移动阶段 / 改备注。"""
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    projects = get_projects()
    project = next((p for p in projects if p["id"] == project_id), None)
    if not project:
        return bad(404, "找不到这个立项项")

    stage = payload.get("stage")
    if stage is not None:
        if stage not in PROJECT_STAGES:
            return bad(400, f"阶段必须是：{' / '.join(PROJECT_STAGES)}")
        project["stage"] = stage
    note = payload.get("note")
    if note is not None:
        project["note"] = str(note).strip()[:200]
    margin = payload.get("margin")          # 报告页保存利润测算后，同步看板上的毛利率
    if margin is not None:
        project["margin"] = margin
    project["updated_at"] = _now()
    save_projects(projects)
    return jsonify(project)


@app.route("/api/projects/<project_id>", methods=["DELETE"])
def delete_project(project_id):
    projects = get_projects()
    remaining = [p for p in projects if p["id"] != project_id]
    if len(remaining) == len(projects):
        return bad(404, "找不到这个立项项")
    save_projects(remaining)
    return jsonify({"deleted": project_id, "count": len(remaining)})


# ============================================================
# 供应商库（工作流的资源侧：谈过的供应商 / 报价 / 起订量）
# ============================================================
SUPPLIERS_FILE = GENERATED_DIR / "suppliers.json"   # 供应商记录


def get_suppliers():
    if SUPPLIERS_FILE.exists():
        try:
            return json.loads(SUPPLIERS_FILE.read_text(encoding="utf-8"))
        except Exception:
            pass
    return []


def save_suppliers(items):
    SUPPLIERS_FILE.write_text(
        json.dumps(items, ensure_ascii=False, indent=2), encoding="utf-8"
    )


def _text(payload, key, limit):
    """取一个可选文本字段：去首尾空格、限长。"""
    return str(payload.get(key) or "").strip()[:limit]


@app.route("/api/suppliers", methods=["GET"])
def list_suppliers():
    """全部供应商记录，前端按表格展示。"""
    return jsonify({"count": len(get_suppliers()), "suppliers": get_suppliers()})


@app.route("/api/suppliers", methods=["POST"])
def add_supplier():
    """添加供应商（只有名称必填，其余随谈随补）。"""
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    name = _text(payload, "name", 80)
    if not name:
        return bad(400, "供应商名称不能为空")
    supplier = {
        "id": f"SP-{uuid.uuid4().hex[:8]}",
        "name": name,
        "category": _text(payload, "category", 60),
        "quote": _text(payload, "quote", 60),
        "moq": _text(payload, "moq", 30),
        "contact": _text(payload, "contact", 60),
        "note": _text(payload, "note", 300),
        "created_at": _now(),
        "updated_at": _now(),
    }
    suppliers = get_suppliers()
    suppliers.insert(0, supplier)
    save_suppliers(suppliers)
    return jsonify(supplier)


@app.route("/api/suppliers/<supplier_id>", methods=["PATCH"])
def update_supplier(supplier_id):
    """改报价 / 备注等任意可编辑字段。"""
    payload = get_body()
    if payload is None:
        return bad(400, "请求体必须是 JSON")
    suppliers = get_suppliers()
    supplier = next((s for s in suppliers if s["id"] == supplier_id), None)
    if not supplier:
        return bad(404, "找不到这条供应商记录")
    for key, limit in [("category", 60), ("quote", 60), ("moq", 30), ("contact", 60), ("note", 300)]:
        if payload.get(key) is not None:
            supplier[key] = _text(payload, key, limit)
    supplier["updated_at"] = _now()
    save_suppliers(suppliers)
    return jsonify(supplier)


@app.route("/api/suppliers/<supplier_id>", methods=["DELETE"])
def delete_supplier(supplier_id):
    suppliers = get_suppliers()
    remaining = [s for s in suppliers if s["id"] != supplier_id]
    if len(remaining) == len(suppliers):
        return bad(404, "找不到这条供应商记录")
    save_suppliers(remaining)
    return jsonify({"deleted": supplier_id, "count": len(remaining)})


@app.route("/api/scan", methods=["POST"])
def scan():
    """
    「AI 发现机会」按钮的真实后端：现场跑一遍数据管线并返回报告。
    读 CSV → 清洗 → 打分 → 生成，全流程真实执行。
    """
    report, err = run_pipeline()
    if report is None:
        return bad(500, f"管线运行失败：{err}")
    products = get_products()
    active = [p for p in products if p["status"] != "已放弃"]
    pending = [p for p in active if p["status"] == "待判断"]
    top = max(active, key=lambda p: p["score"], default=None)
    hint = (
        f"建议优先看「{top['name']}」（机会指数 {top['score']}），还有 {len(pending)} 个机会等待人工判断。"
        if top else "样本库为空。"
    )
    return jsonify({
        "message": (
            f"扫描完成：读取 {report['csv_rows']} 条原始信号，清洗掉 {report['dropped']} 条脏数据，"
            f"重新计算 {report['product_count']} 个商品的机会指数"
            f"（上升爆款 {report['hot']} / 潜力新品 {report['fresh']} / 异常趋势 {report['odd']}）。"
        ),
        "hint": hint,
        "report": report,
    })


# ============================================================
# 前端静态托管（v7.2 新增：云上一个网址装下整个系统）
# 本地开发时前端跑 5173（Vite dev），这两个路由用不上；
# 云上 PythonAnywhere 只跑本文件，访问 / 直接出前端页面。
# ============================================================
def _dist_ready():
    return (DIST_DIR / "index.html").is_file()


@app.route("/", methods=["GET"])
def index():
    if _dist_ready():
        return send_from_directory(DIST_DIR, "index.html")
    return jsonify({"detail": "前端未构建（缺少 dist/），API 正常"})


@app.route("/<path:path>", methods=["GET"])
def static_files(path):
    """assets、logo 等静态文件；其他未知路径回首页（前端是 hash 路由，刷新不 404）。"""
    if _dist_ready():
        if (DIST_DIR / path).is_file():
            return send_from_directory(DIST_DIR, path)
        return send_from_directory(DIST_DIR, "index.html")
    return bad(404, f"前端未构建（缺少 dist/），API 正常，路径 {path} 不存在")


if __name__ == "__main__":
    # 本地开发入口；云上由 PythonAnywhere 的 WSGI 直接加载上面的 app 对象
    app.run(host="127.0.0.1", port=8000)
