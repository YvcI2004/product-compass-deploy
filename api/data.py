# -*- coding: utf-8 -*-
"""
选品罗盘 · 后端数据（第 2 步的"单一数据源"）
------------------------------------------------------------
内容和 src/data.js 完全一致 —— 后端在线时，前端以这里为准。

改数据的姿势（FDE 关键）：
  1. 改这个文件里的商品、信号、文案
  2. 保存（uvicorn --reload 会自动重启）
  3. 浏览器刷新 —— 新数据立刻生效，前端无需重新构建

字段说明（和前端一一对应，名字不能改）：
  score    : 机会指数 0-100
  type     : 上升爆款 / 潜力新品 / 异常趋势
  status   : 初始判断状态（演示中用户在浏览器里做的标记存在本地，不会改到这里）
  signals  : 三平台信号，近 30 天
"""

WORKSPACE = {
    "name": "选品罗盘",
    "type": "选品工作空间",
}

CURRENT_USER = {
    "name": "我",
    "role": "选品负责人",
}

PRODUCTS = [
    {
        "id": "P-001",
        "name": "大型犬高支撑可拆洗宠物床",
        "category": "宠物用品",
        "platform": "Amazon",
        "score": 86,
        "type": "上升爆款",
        "status": "待判断",
        "featured": True,
        "reason": "需求已验证，功能组合仍有改进空间：高支撑 + 可拆洗的组合在现有供给中仍然稀缺，Review 中「关节保护」「难清洗」两类反馈同时高频出现。",
        "opportunityTags": ["痛点机会", "产品组合机会"],
        "growth": {"label": "TikTok 30天增长", "value": "+42%"},
        "signals": {
            "Amazon": {"text": "月销量 1,860 · 2,310 条 Review", "delta": "+18%"},
            "TikTok": {"text": "326 条视频 · 84 位达人", "delta": "+42%"},
            "Temu":   {"text": "117 款同类 · 完整功能组合 9 款", "delta": "+21%"},
        },
    },
    {
        "id": "P-002",
        "name": "无线感应宠物饮水机",
        "category": "宠物用品",
        "platform": "TikTok",
        "score": 82,
        "type": "潜力新品",
        "status": "待判断",
        "featured": False,
        "reason": "内容种草起量快，静音与滤芯耗材是差异点：感应出水解决「水不新鲜」的养宠痛点，滤芯复购还能带来后续收入。",
        "opportunityTags": ["场景机会", "痛点机会"],
        "growth": {"label": "TikTok 30天增长", "value": "+35%"},
        "signals": {
            "Amazon": {"text": "月销量 940 · 1,120 条 Review", "delta": "+12%"},
            "TikTok": {"text": "512 条视频 · 63 位达人", "delta": "+35%"},
            "Temu":   {"text": "86 款同类 · 感应款 4 款", "delta": "+9%"},
        },
    },
    {
        "id": "P-003",
        "name": "慢食嗅闻益智玩具",
        "category": "宠物用品",
        "platform": "TikTok",
        "score": 79,
        "type": "上升爆款",
        "status": "待判断",
        "featured": False,
        "reason": "宠物心理健康话题带动，嗅闻垫品类搜索持续上升，内容端天然具备「训练教程」这类可传播素材。",
        "opportunityTags": ["趋势机会"],
        "growth": {"label": "TikTok 30天增长", "value": "+28%"},
        "signals": {
            "Amazon": {"text": "月销量 1,320 · 980 条 Review", "delta": "+15%"},
            "TikTok": {"text": "289 条视频 · 41 位达人", "delta": "+28%"},
            "Temu":   {"text": "64 款同类", "delta": "+6%"},
        },
    },
    {
        "id": "P-004",
        "name": "模块化厨房抽屉收纳盒",
        "category": "家居收纳",
        "platform": "Temu",
        "score": 77,
        "type": "潜力新品",
        "status": "待判断",
        "featured": False,
        "reason": "小户型收纳需求稳定，模块化自由组合在 Temu 现有供给中是稀缺卖点，可按「抽屉尺寸」做场景化详情页。",
        "opportunityTags": ["产品组合机会"],
        "growth": {"label": "Temu 30天增长", "value": "+18%"},
        "signals": {
            "Amazon": {"text": "月销量 2,140 · 3,400 条 Review", "delta": "+7%"},
            "TikTok": {"text": "96 条视频 · 12 位达人", "delta": "+4%"},
            "Temu":   {"text": "142 款同类 · 模块化 6 款", "delta": "+18%"},
        },
    },
    {
        "id": "P-005",
        "name": "便携折叠宠物台阶",
        "category": "宠物用品",
        "platform": "Amazon",
        "score": 74,
        "type": "潜力新品",
        "status": "继续观察",
        "featured": False,
        "reason": "老年宠物与小型犬家庭的刚需品类，等待承重与防滑的测试结果后再做判断。",
        "opportunityTags": ["人群机会"],
        "growth": {"label": "Amazon 30天增长", "value": "+11%"},
        "signals": {
            "Amazon": {"text": "月销量 760 · 1,450 条 Review", "delta": "+11%"},
            "TikTok": {"text": "54 条视频 · 9 位达人", "delta": "+3%"},
            "Temu":   {"text": "73 款同类", "delta": "+5%"},
        },
    },
    {
        "id": "P-006",
        "name": "猫咪自动激光逗猫器",
        "category": "宠物用品",
        "platform": "TikTok",
        "score": 72,
        "type": "上升爆款",
        "status": "待判断",
        "featured": False,
        "reason": "独居养猫人群持续增长，自动陪伴类产品内容易于传播，需注意激光安全性的合规表述。",
        "opportunityTags": ["场景机会"],
        "growth": {"label": "TikTok 30天增长", "value": "+24%"},
        "signals": {
            "Amazon": {"text": "月销量 580 · 720 条 Review", "delta": "+9%"},
            "TikTok": {"text": "341 条视频 · 57 位达人", "delta": "+24%"},
            "Temu":   {"text": "58 款同类 · APP 款 3 款", "delta": "+8%"},
        },
    },
    {
        "id": "P-007",
        "name": "宠物智能定位项圈",
        "category": "宠物用品",
        "platform": "Amazon",
        "score": 69,
        "type": "异常趋势",
        "status": "待判断",
        "featured": False,
        "reason": "搜索热度回落，需判断是季节性波动还是需求退潮；内置 SIM 的订阅模式也抬高了退货率。",
        "opportunityTags": ["趋势机会"],
        "growth": {"label": "Amazon 30天增长", "value": "-9%"},
        "signals": {
            "Amazon": {"text": "月销量 410 · 2,060 条 Review", "delta": "-9%"},
            "TikTok": {"text": "77 条视频 · 14 位达人", "delta": "-6%"},
            "Temu":   {"text": "39 款同类", "delta": "-4%"},
        },
    },
    {
        "id": "P-008",
        "name": "硅胶宠物慢食舔垫",
        "category": "宠物用品",
        "platform": "Temu",
        "score": 58,
        "type": "异常趋势",
        "status": "待判断",
        "featured": False,
        "reason": "同质化严重，价格战已压缩利润空间，除非有材质或结构专利，否则不建议进入。",
        "opportunityTags": ["痛点机会"],
        "growth": {"label": "Temu 30天增长", "value": "-5%"},
        "signals": {
            "Amazon": {"text": "月销量 1,050 · 2,800 条 Review", "delta": "-3%"},
            "TikTok": {"text": "43 条视频 · 6 位达人", "delta": "-8%"},
            "Temu":   {"text": "210 款同类", "delta": "-5%"},
        },
    },
    {
        "id": "P-009",
        "name": "不锈钢防倾翻宠物碗",
        "category": "宠物用品",
        "platform": "Amazon",
        "score": 68,
        "type": "潜力新品",
        "status": "已放弃",
        "featured": False,
        "reason": "头部竞品壁垒高，基础功能差异不足。",
        "opportunityTags": ["痛点机会"],
        "growth": {"label": "Amazon 30天增长", "value": "+2%"},
        "signals": {
            "Amazon": {"text": "月销量 3,200 · 8,900 条 Review", "delta": "+2%"},
            "TikTok": {"text": "31 条视频 · 5 位达人", "delta": "0%"},
            "Temu":   {"text": "180 款同类", "delta": "+1%"},
        },
    },
]

INITIAL_ACTIVITIES = [
    {
        "user": "林晓",
        "date": "2026/9/16",
        "text": "将「便携折叠宠物台阶」标记为",
        "target": "继续观察",
        "comment": "需求有价值，等待承重和防滑测试结果。",
    },
    {
        "user": "林晓",
        "date": "2026/9/15",
        "text": "将「不锈钢防倾翻宠物碗」标记为",
        "target": "已放弃",
        "comment": "头部竞品壁垒高，基础功能差异不足。",
    },
]

TAG_GROUPS = [
    {
        "name": "机会标签",
        "tags": ["痛点机会", "产品组合机会", "场景机会", "趋势机会", "人群机会"],
    },
    {
        "name": "类目标签",
        "tags": ["宠物用品", "家居收纳", "户外运动", "母婴用品"],
    },
]
