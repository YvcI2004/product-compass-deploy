# 选品罗盘 · 云端部署包（公开仓库）

这是「选品罗盘」的**公开部署仓库**，用于部署到 PythonAnywhere 免费档。

- 私有仓库 `product-compass`（含真实业务数据）才是主仓库，日常开发都在那边；
  本仓库只放**代码 + 前端构建产物（dist/）**，不含任何 `pipeline/generated/*.json` 业务数据。
- 后端为 Flask（v7.2 起，PythonAnywhere 免费档只支持 WSGI），见 `api/main.py`——
  它同时托管 `dist/` 前端：访问根路径直接出页面，`/api/*` 是数据接口。
- 前端是 hash 路由（`#/discover` 这种），刷新不会 404，无需 SPA 重写规则。

## 在 PythonAnywhere 上的结构

```
/home/<用户名>/product-compass-deploy/     ← git clone 本仓库
     ├── api/                              ← Flask 后端
     └── dist/                             ← 前端构建产物（已提交进仓库）
```

WSGI 入口：`from main import app as application`（api 目录加入 sys.path）。

线上数据说明：免费档磁盘持久，网页上新增的分析/雷达/立项/供应商会保存在
云端的 `api/pipeline/generated/` 里；重新部署（重新 clone + reload）会回到本仓库的干净状态。
