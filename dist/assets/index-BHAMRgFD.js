(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const Rt={name:"选品罗盘",type:"真数据工作空间"},h="";let $=!1;const Ut=window.fetch.bind(window);let ct=0;function mt(){var t;(t=document.getElementById("top-progress"))==null||t.classList.toggle("on",ct>0)}window.fetch=(t,s={})=>(ct++,mt(),Ut(t,s).finally(()=>{ct--,mt()}));let xt=Rt,k={keywords:[],events:[]},G=!0,S=[],J=!0,x=[],at=!0,L=[],W=!0,y=null;async function zt(){try{const t=await fetch(`${h}/api/bootstrap`);if(!t.ok)throw new Error(`HTTP ${t.status}`);xt=(await t.json()).workspace,$=!0,console.log(`[选品罗盘] 已连接后端 ${h}`)}catch{console.log("[选品罗盘] 后端未启动，界面可浏览，数据功能需后端在线")}}async function St(){if(!(!$||!G))try{const t=await fetch(`${h}/api/radar`);if(!t.ok)throw new Error(`HTTP ${t.status}`);k=await t.json(),G=!1,["#/","#/workbench","#/radar"].includes(location.hash||"#/")&&v()}catch{}}async function pt(){if(!(!$||!J))try{const t=await fetch(`${h}/api/analyses`);if(!t.ok)throw new Error(`HTTP ${t.status}`);S=(await t.json()).analyses||[],J=!1,["#/","#/workbench","#/analyze"].includes(location.hash||"#/")&&v()}catch{}}async function ut(){if(!(!$||!at))try{const t=await fetch(`${h}/api/projects`);if(!t.ok)throw new Error(`HTTP ${t.status}`);x=(await t.json()).projects||[],at=!1,["#/","#/workbench","#/projects"].includes(location.hash||"#/")&&v()}catch{}}async function Dt(){if(!(!$||!W))try{const t=await fetch(`${h}/api/suppliers`);if(!t.ok)throw new Error(`HTTP ${t.status}`);L=(await t.json()).suppliers||[],W=!1,(location.hash||"#/")==="#/suppliers"&&v()}catch{}}const q=t=>String(t).padStart(2,"0"),i=t=>String(t).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),I=t=>Number(t).toLocaleString("en-US"),K=t=>`#${Number(t).toLocaleString("en-US")}`,Tt=t=>`$${t}`;function d(t,s=!1){var a;(a=document.getElementById("toast"))==null||a.remove();const e=document.createElement("div");e.id="toast",e.className=s?"ok":"",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.remove(),2600)}const qt=`
  <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#ffffff" stroke="#e4e7ef"/>
    <circle cx="24" cy="24" r="14.5" fill="none" stroke="#2563eb" stroke-width="2.4" opacity=".92"/>
    <path d="M24 12.5 L27.4 24 L20.6 24 Z" fill="#2563eb"/>
    <path d="M24 35.5 L27.4 24 L20.6 24 Z" fill="#a7c3f7"/>
    <circle cx="24" cy="24" r="2.4" fill="#ffffff" stroke="#2563eb" stroke-width="1.6"/>
  </svg>`,Gt={workbench:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5"/><rect x="13.5" y="12" width="7.5" height="9" rx="1.5"/><rect x="3" y="16" width="7.5" height="5" rx="1.5"/></svg>',radar:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/><path d="M12 3v2.4M21 12h-2.4M12 21v-2.4M3 12h2.4"/></svg>',search:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.8 16.8 21 21"/></svg>',calc:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M8 7.5h8"/><path d="M8.6 15h2.6M8.6 18h2.6M14.2 13.4v5.2M11.6 16h5.2"/></svg>',box:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 21 7.8v8.4L12 21 3 16.2V7.8Z"/><path d="M3 7.8 12 12.6 21 7.8"/><path d="M12 12.6V21"/></svg>',board:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="4" width="4.6" height="16" rx="1.4"/><rect x="9.7" y="4" width="4.6" height="10.5" rx="1.4"/><rect x="15.9" y="4" width="4.6" height="13.5" rx="1.4"/></svg>',studio:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 12.5 11.5"/><path d="m16 4 .9 2.1L19 7l-2.1.9L16 10l-.9-2.1L13 7l2.1-.9Z"/><path d="m19.5 12.5 .6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z"/><path d="m6.5 4.5.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z"/></svg>'},Jt=[{hash:"#/",icon:"workbench",label:"监控总览",group:"总览"},{hash:"#/radar",icon:"radar",label:"关键词雷达",group:"调研分析",badge:()=>k.keywords.length},{hash:"#/analyze",icon:"search",label:"ASIN 分析",group:"调研分析",badge:()=>S.length},{hash:"#/studio",icon:"studio",label:"AI 作图工坊",group:"调研分析"},{hash:"#/profit",icon:"calc",label:"利润计算器",group:"测算与跟进"},{hash:"#/suppliers",icon:"box",label:"供应商库",group:"测算与跟进",badge:()=>L.length},{hash:"#/projects",icon:"board",label:"立项看板",group:"测算与跟进",badge:()=>x.filter(t=>t.stage!=="已放弃").length}];function Kt(t){let s="";const e=Jt.map(a=>{const n=a.group&&a.group!==s?`<div class="nav-label">${a.group}</div>`:"";return s=a.group,`${n}
    <a class="nav-item ${a.hash===t?"active":""}" href="${a.hash}">
      ${Gt[a.icon]}<span>${a.label}</span>
      ${a.badge&&a.badge()>0?`<span class="nav-badge">${q(a.badge())}</span>`:""}
    </a>`}).join("");return`
  <aside class="sidebar">
    <div class="logo-row">
      ${qt}
      <div>
        <div class="logo-name">选品罗盘</div>
        <div class="logo-sub">选品工作台</div>
      </div>
    </div>
    ${e}
    <div class="demo-box">
      <b>半自动 · 差值引擎</b>
      <p>人工采集约 3 分钟/轮，评分、差值与告知全自动执行。</p>
      <span>● 数据存储于本地后端</span>
    </div>
  </aside>`}function Zt(t){return`
  <header class="topbar">
    <div class="crumb">${i(xt.type)} <span>/</span> <b>${i(t)}</b></div>
    <div class="top-right">
      <span class="top-chip"><span class="dot"></span>${$?"后端已连接":"后端离线"}</span>
      <button class="btn btn-ghost btn-sm" data-action="guide">使用指南</button>
    </div>
  </header>`}const Wt=()=>`
  <footer class="footer">
    <span>真实数据 · 半自动采集 · 全部存在本地</span>
    <span>选品罗盘 · 半自动选品工作台</span>
  </footer>`;function jt(t,s){if(!s)return'<span class="delta-chip new">新</span>';const e=t.score-s.score;return e>0?`<span class="delta-chip up">↑${e}</span>`:e<0?`<span class="delta-chip down">↓${Math.abs(e)}</span>`:'<span class="delta-chip flat">→</span>'}const et=["#2563eb","#5b8def","#8fb3f7","#1e40af","#64748b","#c9d6f0"];function Mt(t,{h:s=210}={}){const a=s,n=36,o=12,r=14,l=24,u=t.filter(f=>f.points.length>=2);if(!u.length)return'<div class="chart-empty">完成第 2 轮采集后，这里出现趋势线。</div>';const T=Math.max(...u.map(f=>f.points.length)),E=u.flatMap(f=>f.points);let _=Math.min(...E),m=Math.max(...E);if(m-_<4){const f=(m+_)/2;_=f-2,m=f+2}const b=640-n-o,w=a-r-l,M=f=>n+f*b/(T-1),C=f=>r+w-(f-_)/(m-_)*w,it=[0,.5,1].map(f=>{const A=r+w*f,Q=Math.round(m-(m-_)*f);return`<line x1="${n}" y1="${A.toFixed(1)}" x2="${640-o}" y2="${A.toFixed(1)}" class="c-grid"/>
            <text x="${n-7}" y="${(A+3.5).toFixed(1)}" text-anchor="end" class="c-label">${Q}</text>`}).join(""),Z=[...new Set([0,Math.round((T-1)/2),T-1])].map(f=>`<text x="${M(f).toFixed(1)}" y="${a-6}" text-anchor="${f===0?"start":f===T-1?"end":"middle"}" class="c-label">第 ${f+1} 轮</text>`).join(""),F=u.map((f,A)=>{const Q=f.color||et[A%et.length],Bt=f.points.map((Ht,Ot)=>`${M(Ot).toFixed(1)},${C(Ht).toFixed(1)}`).join(" "),$t=f.points[f.points.length-1];return`<polyline points="${Bt}" fill="none" stroke="${Q}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="${M(f.points.length-1).toFixed(1)}" cy="${C($t).toFixed(1)}" r="3.4" fill="${Q}"><title>${i(f.name)} · 第 ${f.points.length} 轮 · ${$t} 分</title></circle>`}).join("");return`<svg viewBox="0 0 640 ${a}" class="chart" role="img">${it}${F}${Z}</svg>`}const Xt=t=>`
  <div class="chart-legend">${t.map(s=>`
    <span class="lg-item"><i style="background:${s.color}"></i>${i(s.name)}</span>`).join("")}
  </div>`;function Vt(t){const s=t.reduce((r,l)=>r+l.value,0);if(!s)return'<div class="chart-empty">还没有已评分的关键词。</div>';const e=54,a=2*Math.PI*e;let n=0;const o=t.map(r=>{const l=r.value/s,u=`<circle r="${e}" cx="70" cy="70" fill="none" stroke="${r.color}" stroke-width="15"
      stroke-dasharray="${Math.max(0,l*a-2).toFixed(1)} ${(a-Math.max(0,l*a-2)).toFixed(1)}"
      stroke-dashoffset="${(-n*a).toFixed(1)}" transform="rotate(-90 70 70)"/>`;return n+=l,u}).join("");return`
  <div class="donut-wrap">
    <svg viewBox="0 0 140 140" class="donut">
      <circle r="${e}" cx="70" cy="70" fill="none" stroke="#eef0f5" stroke-width="15"/>
      ${o}
      <text x="70" y="70" text-anchor="middle" class="dn-total">${s}</text>
      <text x="70" y="86" text-anchor="middle" class="dn-total-label">监控词</text>
    </svg>
    <div class="dn-legend">
      ${t.map(r=>`
      <div class="dn-row">
        <span class="dn-dot" style="background:${r.color}"></span>
        <span class="dn-name">${i(r.label)}</span>
        <b>${r.value}</b>
        <span class="dn-pct">${Math.round(r.value/s*100)}%</span>
      </div>`).join("")}
    </div>
  </div>`}function Qt(t,s=116){const a=2*Math.PI*52,n=Math.max(0,Math.min(100,t))/100,o=t>=75?"#2563eb":t>=55?"#7ea4f5":"#a3a8b8";return`
  <svg viewBox="0 0 140 140" class="gauge" style="width:${s}px;height:${s}px">
    <circle r="52" cx="70" cy="70" fill="none" stroke="#eef0f5" stroke-width="11"/>
    <circle r="52" cx="70" cy="70" fill="none" stroke="${o}" stroke-width="11" stroke-linecap="round"
      stroke-dasharray="${(n*a).toFixed(1)} ${a.toFixed(1)}" transform="rotate(-90 70 70)"/>
    <text x="70" y="72" text-anchor="middle" class="gg-score">${t}</text>
    <text x="70" y="90" text-anchor="middle" class="gg-label">机会指数</text>
  </svg>`}function Yt(t,s=250){const o=t.length,r=(m,b)=>{const w=-Math.PI/2+m*2*Math.PI/o;return[130+Math.cos(w)*72*b,108+Math.sin(w)*72*b]},l=[.25,.5,.75,1].map(m=>`<polygon points="${t.map((b,w)=>r(w,m).map(M=>M.toFixed(1)).join(",")).join(" ")}" class="rd-ring"/>`).join(""),u=t.map((m,b)=>{const[w,M]=r(b,1);return`<line x1="130" y1="108" x2="${w.toFixed(1)}" y2="${M.toFixed(1)}" class="rd-ring"/>`}).join(""),T=t.map((m,b)=>r(b,Math.max(.05,m.value)).map(w=>w.toFixed(1)).join(",")).join(" "),E=t.map((m,b)=>{const[w,M]=r(b,Math.max(.05,m.value));return`<circle cx="${w.toFixed(1)}" cy="${M.toFixed(1)}" r="2.8" fill="#2563eb"><title>${i(m.label)} ${Math.round(m.value*100)}</title></circle>`}).join(""),_=t.map((m,b)=>{const[w,M]=r(b,1.26),C=Math.abs(w-130)<8?"middle":w>130?"start":"end";return`<text x="${w.toFixed(1)}" y="${(M+3.5).toFixed(1)}" text-anchor="${C}" class="rd-label">${i(m.label)}</text>`}).join("");return`
  <svg viewBox="0 0 260 216" class="radar" style="width:${s}px" overflow="visible">
    ${l}${u}
    <polygon points="${T}" fill="rgba(37,99,235,.18)" stroke="#2563eb" stroke-width="2"/>
    ${E}${_}
  </svg>`}function ts(){if(!x.length)return'<div class="empty slim">还没有立项项目——报告页「转为立项」后，这里显示跟进漏斗。</div>';const t=N.map(e=>({s:e,n:x.filter(a=>a.stage===e).length})),s=Math.max(1,...t.map(e=>e.n));return`
  <div class="funnel">
    ${t.map(e=>`
    <div class="fn-row">
      <span class="fn-label">${e.s}</span>
      <div class="fn-track"><div class="fn-bar ${e.s==="已放弃"?"dead":""}" style="width:${e.n?Math.max(8,e.n/s*100):0}%"></div></div>
      <b class="fn-n">${e.n}</b>
    </div>`).join("")}
  </div>`}const P=(t=3)=>`
  <div class="sk-card">${'<div class="sk-line"></div>'.repeat(t)}</div>`;function Y(t,s,e){const a=Math.max(1,...e.map(n=>n.n));return`
  <div class="lens-card">
    <div class="lens-title">${t}<span>${s}</span></div>
    ${e.map(n=>`
    <div class="fn-row">
      <span class="fn-label">${n.label}</span>
      <div class="fn-track"><div class="fn-bar ${n.dim?"dead":""}" style="width:${n.n?Math.max(8,n.n/a*100):0}%"></div></div>
      <b class="fn-n">${n.n}</b>
    </div>`).join("")}
  </div>`}function ss(t){if(!t.length)return"";const s=t.map(n=>n.cur),e=(n,o,r,l=!1)=>({label:r,n:s.filter(u=>u.price>=n&&u.price<o).length,dim:l}),a=(n,o)=>o.map(([r,l,u])=>({label:u,n:s.filter(T=>{const E=n(T);return E>=r&&E<l}).length}));return`
  <section class="section">
    <div class="sec-head">
      <h2>市场结构透视</h2>
      <span class="sec-sub">同一批监控词的四个角度 · 只统计最新一轮</span>
    </div>
    <div class="lens-grid">
      ${Y("价格带","头部价格（美元）",[e(0,15,"15 以下 · 利润薄",!0),e(15,45,"15–45 · 黄金带"),e(45,80,"45–80 · 中高客单"),e(80,1e9,"80 以上 · 高客单")])}
      ${Y("竞争梯度","搜索结果数",a(n=>n.results,[[0,1001,"1千以内 · 稀缺"],[1001,10001,"1千–1万 · 宽松"],[10001,100001,"1万–10万 · 一般"],[100001,1e12,"10万以上 · 红海"]]))}
      ${Y("需求活跃度","最新评论距今",a(n=>n.days,[[0,4,"3天内 · 极活跃"],[4,15,"4–14天 · 活跃"],[15,31,"15–30天 · 转冷"],[31,1e9,"30天以上 · 休眠"]]))}
      ${Y("排名梯度","头部大类排名",a(n=>n.bsr,[[0,1001,"1千以内 · 头部"],[1001,10001,"1千–1万 · 靠前"],[10001,50001,"1万–5万 · 中游"],[50001,1e12,"5万以上 · 长尾"]]))}
    </div>
  </section>`}function bt(){St(),pt(),ut();const t=k.keywords||[],s=t.filter(l=>l.rounds.length).map(l=>({k:l,cur:l.rounds[l.rounds.length-1],prev:l.rounds[l.rounds.length-2]||null})).sort((l,u)=>u.cur.score-l.cur.score),e=s.filter(l=>l.cur.grade_cls!=="g-c").length,a=t.reduce((l,u)=>l+u.rounds.length,0),n=x.filter(l=>l.stage!=="已放弃").length,o=t.length||S.length,r=$&&!o&&(G||J);return`
  <div class="page-head ph-row">
    <div>
      <h1>监控总览</h1>
      <p>关键词雷达与单品分析的工作总览——重点机会、市场信号与跟进进度，一处掌握。</p>
    </div>
    <div class="ph-actions">
      <a class="btn btn-primary btn-sm" href="#/radar">＋ 关键词</a>
      <a class="btn btn-ghost btn-sm" href="#/analyze">ASIN 分析</a>
      <button class="btn btn-ghost btn-sm" data-action="quick-profit">快速测算</button>
    </div>
  </div>

  <div class="statbar">
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':q(t.length)}</b><span>监控关键词</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':q(e)}</b><span>重点机会 A/B</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':q(a)}</b><span>累计采集轮次</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':q(S.length)}</b><span>ASIN 报告</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':q(n)}</b><span>立项进行中</span></div>
  </div>

  ${o?"":es()}
  ${$?"":O()}

  <div class="dash">
    <div class="dash-main">
      <section class="chart-card">
        <div class="sec-head">
          <h2>机会指数趋势</h2>
          <span class="sec-sub">各关键词历史轮次得分 · 悬停圆点看数值</span>
        </div>
        ${r?P(5):as(s)}
      </section>

      ${s.length||r?`
      <section class="section">
        <div class="sec-head">
          <h2>类目机会排行</h2>
          <span class="sec-sub">点击任意一行，打开类目分析面板</span>
        </div>
        <div class="rank-list">${s.length?s.map(ns).join(""):P(3)}</div>
      </section>`:""}

      ${s.length?ss(s):""}

      <section class="section">
        <div class="sec-head">
          <h2>单品分析速览</h2>
          <span class="sec-sub">客户单品报告 · 点击回看</span>
        </div>
        <div class="recent-grid">${r?P(2):os()}</div>
      </section>
    </div>

    <div class="dash-side">
      <section class="chart-card">
        <div class="sec-head"><h2>评级分布</h2><span class="sec-sub">最新一轮</span></div>
        ${Vt([{label:"A 类 · 优先评估",value:s.filter(l=>l.cur.grade_cls==="g-a").length,color:"#2563eb"},{label:"B 类 · 跟进观察",value:s.filter(l=>l.cur.grade_cls==="g-b").length,color:"#8fb3f7"},{label:"C 类 · 暂缓投入",value:s.filter(l=>l.cur.grade_cls==="g-c").length,color:"#c9cdd9"}])}
      </section>

      <section class="chart-card">
        <div class="sec-head"><h2>立项漏斗</h2><a class="sec-sub" href="#/projects">进入看板 →</a></div>
        ${ts()}
      </section>

      <section class="section">
        <div class="sec-head">
          <h2>市场信号</h2>
          <span class="sec-sub">差值引擎自动告知</span>
        </div>
        ${r?P(3):is()}
      </section>
    </div>
  </div>`}function as(t){const s=t.slice(0,6).map((a,n)=>({name:a.k.keyword,color:et[n%et.length],points:a.k.rounds.map(o=>o.score)})),e=s.filter(a=>a.points.length>=2);return e.length?Mt(s)+Xt(e):'<div class="chart-empty">完成第 2 轮采集后，这里出现各关键词的机会指数趋势线。</div>'}function es(){return`
  <section class="an-card onboard">
    <b>开始第一轮监控（约 5 分钟）</b>
    <ol>
      <li>在「<b>关键词雷达</b>」添加关注的类目词（如 dog bed）</li>
      <li>到 amazon.com 搜索该词，打开第 1 名商品页，采集 5 个公开数据（约 2 分钟）</li>
      <li>提交采集——差值引擎自动评分；第 2 轮起自动对比涨跌、推送重点机会信号</li>
    </ol>
    <a class="btn btn-primary" href="#/radar">添加第一个关键词</a>
  </section>`}function O(){return`
  <div class="an-offline">
    <b>后端未启动。</b>数据功能需后端在线：在 <code>api</code> 目录运行
    <code>.venv\\Scripts\\python.exe -m uvicorn main:app --reload --port 8000</code>
    后刷新页面。<span>（历史数据都存在后端文件里，不会丢）</span>
  </div>`}function ns(t,s){const{k:e,cur:a,prev:n}=t;return`
  <div class="rank-row" data-action="kw-detail" data-id="${e.id}" role="button" tabindex="0">
    <div class="rank-no">${s+1}</div>
    <div class="row-main">
      <div class="row-name">${i(e.keyword)}</div>
      <div class="row-meta">结果 ${I(a.results)} · 头部 BSR ${K(a.bsr)} · ${i(a.collected_at)}</div>
    </div>
    ${jt(a,n)}
    <span class="chip-soft ${a.grade_cls}">${i(a.grade.split(" · ")[0])}</span>
    <div class="score" title="机会指数">${a.score}</div>
    <span class="row-go">›</span>
  </div>`}function is(){const t=k.events||[];return t.length?`
  <div class="radar-feed">
    ${t.slice(0,6).map(s=>`
    <div class="rf-item">
      <span class="rf-dot"></span>
      <div>
        <div class="rf-text">${i(s.text)}</div>
        <div class="rf-time">${i(s.at)}</div>
      </div>
    </div>`).join("")}
  </div>`:'<div class="empty slim">完成第一轮采集后，变化动态会出现在这里（升降级、竞争加剧、需求走强…自动告知）。</div>'}function os(){return S.length?S.slice(0,3).map(t=>`
  <div class="recent-card" data-action="open-analysis" data-id="${t.id}">
    <div>
      <div class="rc-name">${i(t.name)}</div>
      <div class="rc-meta">ASIN ${i(t.asin)} · ${i(t.collected_at)}</div>
    </div>
    <div class="rc-right">
      <div class="score sm">${t.score}</div>
      <span class="chip-soft ${t.grade_cls}">${i(t.grade.split(" · ")[0])}</span>
    </div>
  </div>`).join(""):'<div class="empty slim">还没有 ASIN 分析——客户发来商品链接时，用「ASIN 分析」出可交付报告。</div>'}let lt=null,nt="";function rs(){St(),pt();const t=k.keywords||[],s=t.filter(a=>!a.rounds.length),e=t.filter(a=>a.rounds.length).sort((a,n)=>n.rounds[n.rounds.length-1].score-a.rounds[a.rounds.length-1].score);return`
  <div class="page-head">
    <h1>关键词雷达</h1>
    <p>不定期采集你关注的类目词，差值引擎自动对比每一轮——机会指数涨跌、竞争变化、升降级告知全自动。</p>
  </div>
  ${$?"":O()}
  <div class="an-card">
    <div class="an-parse-row">
      <input id="kw-input" class="input grow" placeholder="输入要监控的类目关键词，如 dog bed / kitchen organizer…"
             value="${i(nt)}" autocomplete="off">
      <button class="btn btn-soft" data-action="add-keyword">＋ 添加监控</button>
    </div>
    <div class="f-hint" style="margin-top:8px">建议选「客户问得多 + 你有供应链优势」的词；先加 3–5 个跑起来，不定期采集即可。</div>
  </div>
  ${t.length?"":$&&G?`<section class="an-card">${P(4)}</section>`:'<div class="empty">还没有监控关键词——上面输入第一个，开始你的雷达。</div>'}
  ${[...s.map(cs),...e.map(ls)].join("")}`}function cs(t){return`
  <section class="an-card kcard pending">
    <div class="kcard-head">
      <div class="kcard-title">
        <span class="kcard-kw">${i(t.keyword)}</span>
        <span class="chip-soft">待首轮采集 · ${i(t.created_at)} 加入</span>
      </div>
      <button class="btn btn-danger btn-sm" data-action="del-keyword" data-id="${t.id}">删除</button>
    </div>
    <div class="kcard-reason">还没采集过。打开 amazon.com 搜索「${i(t.keyword)}」，抄 5 个数完成第 1 轮，即可进入重点机会榜。</div>
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="collect-open" data-id="${t.id}">完成第 1 轮采集</button>
    </div>
  </section>`}function H(t,s,e,a,n){let o;if(e==null)o='<span class="rm-sub flat">首轮</span>';else{const r=s-e;if(!r)o=`<span class="rm-sub flat">→ 上轮 ${a(e)}</span>`;else{const l=n==="up"?r>0:n==="down"?r<0:null;o=`<span class="rm-sub ${l===null?"flat":l?"up":"down"}">${r>0?"↑":"↓"} 上轮 ${a(e)}</span>`}}return`
  <div class="rm">
    <div class="rm-label">${t}</div>
    <div class="rm-value">${a(s)}</div>
    ${o}
  </div>`}function ls(t){const s=t.rounds[t.rounds.length-1],e=t.rounds[t.rounds.length-2]||null,a=lt===t.id;return`
  <section class="an-card kcard">
    <div class="kcard-head">
      <div class="kcard-title">
        <span class="kcard-kw">${i(t.keyword)}</span>
        <span class="chip-soft">第 ${t.rounds.length} 轮 · ${i(s.collected_at)}</span>
      </div>
      <button class="btn btn-danger btn-sm" data-action="del-keyword" data-id="${t.id}">删除</button>
    </div>
    <div class="kcard-score">
      <div class="score">${s.score}<small>/100</small></div>
      <span class="anr-grade ${s.grade_cls}">${i(s.grade)}</span>
      ${jt(s,e)}
      <span class="rm-sub flat" style="margin-left:auto">头部预估月销 ${i(s.est_sales)}</span>
    </div>
    <div class="kcard-metrics">
      ${H("搜索结果",s.results,e==null?void 0:e.results,I,"down")}
      ${H("头部 BSR",s.bsr,e==null?void 0:e.bsr,K,"down")}
      ${H("头部评论",s.reviews,e==null?void 0:e.reviews,I,"up")}
      ${H("头部价格",s.price,e==null?void 0:e.price,Tt,null)}
    </div>
    <div class="kcard-reason">${s.reason_lines.map(i).join("<br>")}</div>
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="collect-open" data-id="${t.id}">本轮采集</button>
      <button class="btn btn-ghost" data-action="kw-detail" data-id="${t.id}">分析面板</button>
      <button class="btn btn-ghost" data-action="kw-toggle" data-id="${t.id}">${a?"收起历史":`历史 ${t.rounds.length} 轮`}</button>
      <button class="btn btn-ghost" data-action="brief-export" data-id="${t.id}">简报 PDF</button>
    </div>
    ${a?ds(t):""}
  </section>`}function ds(t){const s=[...t.rounds].reverse();return`
  <table class="an-table kw-history">
    <thead><tr><th>采集时间</th><th>轮次</th><th>指数</th><th>Δ</th><th>结果数</th><th>BSR</th><th>评论</th><th>价格</th><th>评论距今</th></tr></thead>
    <tbody>
      ${s.map((e,a)=>{const n=s[a+1],o=n?e.score-n.score:null;return`
        <tr>
          <td class="agt-time">${i(e.collected_at)}</td>
          <td>第 ${e.round_no} 轮</td>
          <td><b>${e.score}</b></td>
          <td>${o===null?'<span class="rm-sub flat">—</span>':`<span class="rm-sub ${o>0?"up":o<0?"down":"flat"}">${o>0?"↑"+o:o<0?"↓"+Math.abs(o):"→"}</span>`}</td>
          <td>${I(e.results)}</td>
          <td>${K(e.bsr)}</td>
          <td>${I(e.reviews)}</td>
          <td>$${e.price}</td>
          <td>${e.days} 天</td>
        </tr>`}).join("")}
    </tbody>
  </table>`}async function It(){var s;if(!$){d("需要后端在线——启动方法见页面提示");return}const t=nt.trim()||(((s=document.getElementById("kw-input"))==null?void 0:s.value)||"").trim();if(!t){d("先输入一个关键词，比如 dog bed");return}try{const e=await fetch(`${h}/api/radar/keyword`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword:t})}),a=await e.json();if(!e.ok){d(`⚠️ ${a.detail||"添加失败"}`);return}k.keywords.push(a),k.events.unshift({at:a.created_at,kw:a.keyword,text:`新增监控关键词「${a.keyword}」——去 Amazon 搜索并完成第 1 轮采集`}),G=!1,nt="",v()}catch{d("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}function ps(t){lt=lt===t?null:t,v()}async function us(t){const s=k.keywords.find(a=>a.id===t);if(!(!s||!await D({title:`删除「${s.keyword}」？`,text:"它的全部采集轮次与动态会一起删除，删除后不可恢复。",ok:"删除",danger:!0}))){try{const a=await fetch(`${h}/api/radar/keyword/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{d("⚠️ 删除失败，请确认后端在线");return}k.keywords=k.keywords.filter(a=>a.id!==t),k.events=k.events.filter(a=>a.kw!==s.keyword),v()}}function fs(t){const s=[["c-results","搜索结果数",`搜「${t.keyword}」后左上角「X results」`],["c-bsr","头部 BSR 排名","第 1 名商品页「Best Sellers Rank」第一行数字"],["c-reviews","头部评论数","第 1 名星级旁 ratings 数量"],["c-price","头部价格（美元）","第 1 名当前售价"],["c-days","头部最新评论距今天数","第 1 名评论区第一条日期距今天数（今天 = 0）"]];z(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>「${i(t.keyword)}」第 ${t.rounds.length+1} 轮采集</h3>
    <p class="m-sub">打开 amazon.com 搜索「${i(t.keyword)}」→ 打开第 1 名商品页，抄 5 个数（约 2 分钟）。提交后差值引擎自动对比上一轮。</p>
    <div class="an-grid">
      ${s.map(([e,a,n])=>`
      <div class="field">
        <label>${a}</label>
        <input id="${e}" class="input cm-input" placeholder="${i(n)}">
        <div class="f-hint">${n}</div>
      </div>`).join("")}
    </div>
    <div class="m-actions">
      <button class="btn btn-primary" data-action="collect-submit" data-id="${t.id}">提交本轮采集</button>
    </div>
    <div class="m-note">每一轮都留档不覆盖——回看趋势全靠历史轮次。</div>`)}async function vs(t){if(!$){d("需要后端在线");return}const s=a=>{var n;return(((n=document.getElementById(a))==null?void 0:n.value)||"").trim()},e=document.querySelector('[data-action="collect-submit"]');j(e,!0,"提交中…");try{const a=await fetch(`${h}/api/radar/collect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword_id:t,results:s("c-results"),bsr:s("c-bsr"),reviews:s("c-reviews"),price:s("c-price"),days:s("c-days")})}),n=await a.json();if(!a.ok){d(`⚠️ ${n.detail||"提交失败"}`);return}const o=k.keywords.findIndex(r=>r.id===t);o>=0&&(k.keywords[o]=n.keyword),k.events=n.delta_events.map(r=>({at:n.round.collected_at,kw:n.keyword.keyword,text:r})).concat(k.events),G=!1,U(),d(`✅ 第 ${n.round.round_no} 轮已入库：机会指数 ${n.round.score}`,!0),v()}catch{d("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{j(e,!1)}}const hs=/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i,$s=/^[A-Z0-9]{10}$/i;let st=!1,p={raw:"",asin:null,source:"",parseError:"",name:"",keyword:"",price:"",rating:"",reviews:"",bsr:"",results:"",days:"",paste:"",extractMeta:null,bsrCategory:""};const Et=["name","price","rating","reviews","bsr","results","days"],ms=[{key:"name",label:"商品名称",ph:"复制商品页标题（可只留核心部分）",hint:"商品页顶部的商品标题"},{key:"keyword",label:"搜索关键词",ph:"dog bed for large dogs",hint:"你在 Amazon 搜索框用的词——多个 ASIN 按它归成一类对比"},{key:"price",label:"价格（美元）",ph:"29.99",hint:"商品页当前售价（不看划线价）"},{key:"rating",label:"评分",ph:"4.4",hint:"星级分数，如 4.4"},{key:"reviews",label:"评论总数",ph:"2310",hint:"星级旁 ratings 数量，去逗号：2,310 → 2310"},{key:"bsr",label:"大类 BSR 排名",ph:"1560",hint:"商品信息区「Best Sellers Rank」第一行：#1,560 in Pet Supplies → 填 1560"},{key:"results",label:"搜索结果数",ph:"5000",hint:"用上面的关键词搜索后，左上角「5,000 results」→ 填 5000"},{key:"days",label:"最新评论距今天数",ph:"今天 = 0，昨天 = 1",hint:"评论区第一条的日期（Reviewed … on October 8, 2026）距今几天；评论数为 0 可不填"}];function _t(){var n;const t=(((n=document.getElementById("an-raw"))==null?void 0:n.value)||p.raw||"").trim();p.raw=t,p.parseError="";const s=hs.exec(t),e=$s.test(t.toUpperCase())?t.toUpperCase():null,a=s?s[1].toUpperCase():e;a?(p.asin=a,p.source=s?"识别自链接":"手动输入"):(p.asin=null,p.parseError=/amzn\.to/i.test(t)?"amzn.to 短链请先在浏览器打开，再复制地址栏的完整链接":"没识别到 ASIN：需要完整链接（含 /dp/B0… 部分）或 10 位 ASIN"),v()}function bs(){p={...p,raw:"https://www.amazon.com/dp/B0TEST0001",asin:"B0TEST0001",source:"示例数据",parseError:"",name:"示例 · 大型犬高支撑可拆洗宠物床",keyword:"dog bed for large dogs",price:"39.99",rating:"4.3",reviews:"2310",bsr:"1560",results:"5000",days:"1",extractMeta:null,bsrCategory:""},v()}function gs(){p.asin=null,p.source="",p.parseError="",v()}async function ys(){const t=(p.paste||"").trim();if(!t){d("先把商品页文字粘贴到框里（Ctrl+A → Ctrl+C → 粘贴）");return}if(!$){d("自动提取需要后端在线——启动方法见页面顶部提示");return}const s=document.querySelector('[data-action="extract-paste"]');j(s,!0,"提取中…");try{const e=await fetch(`${h}/api/extract`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t})}),a=await e.json();if(!e.ok){d(`⚠️ ${a.detail||"提取失败"}`);return}ws(a)}catch{d("⚠️ 连不上后端，请确认后端还在运行")}finally{st=!1,j(s,!1)}}function ws(t){const s={found:t.found||[],warnings:t.warnings||[],filled:[],at:new Date().toLocaleTimeString()};t.asin&&!p.asin&&(p.raw=t.asin,p.asin=t.asin,p.source="整页粘贴识别",p.parseError=""),Et.forEach(e=>{var n;const a=(n=t.fields)==null?void 0:n[e];a&&a.value!==""&&a.value!=null&&String(p[e]??"").trim()===""&&(p[e]=String(a.value),s.filled.push(e))}),p.bsrCategory=t.bsr_category||"",p.extractMeta=s,v(),s.filled.length?d(`✅ 已预填 ${s.filled.length} 项（绿色标记），瞄一眼改漏的`,!0):d("⚠️ 没提取到新数字——请手动填写，或检查粘贴的是不是商品页")}function ks(){p.bsrCategory&&!String(p.keyword||"").trim()&&(p.keyword=p.bsrCategory,v())}function xs(){const t=p.extractMeta;if(!t)return"";const s=p.bsrCategory&&!String(p.keyword||"").trim()?`<button class="chip-x kw" data-action="apply-kw" title="BSR 类目词，点击填入">类目词建议：${i(p.bsrCategory)}</button>`:"";return`
  <div class="an-extract-meta">
    <span class="chip-x ${t.filled.length?"hit":"miss"}">${t.at} 提取 ${t.found.length} 项 · 预填 ${t.filled.length} 项</span>
    ${s}
    ${t.warnings.map(e=>`<span class="an-extract-warn">⚠️ ${i(e)}</span>`).join("")}
  </div>`}function Ss(t){const s=p.extractMeta;return s?s.filled.includes(t)?'<span class="chip-x hit">提取</span>':Et.includes(t)?'<span class="chip-x miss">未提取</span>':"":""}async function Ts(){if(st)return;if(!$){d("ASIN 分析需要后端在线——启动方法见页面顶部提示");return}if(!p.asin){d("先在第 1 步解析出 ASIN");return}st=!0;const t=document.querySelector('[data-action="analyze-submit"]');j(t,!0,"分析中…");try{const s=await fetch(`${h}/api/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({link:p.raw,name:p.name,keyword:p.keyword,price:p.price,rating:p.rating,reviews:p.reviews,bsr:p.bsr,results:p.results,days:p.days})}),e=await s.json();if(!s.ok){d(`⚠️ ${e.detail||"分析失败"}`);return}y=e,S.unshift(e),J=!1,v(),setTimeout(()=>{var a;return(a=document.getElementById("an-report"))==null?void 0:a.scrollIntoView({behavior:"smooth"})},80)}catch{d("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{st=!1,j(t,!1)}}function js(t){const s=S.find(e=>e.id===t);s&&(y=s,U(),(location.hash||"#/")!=="#/analyze"?location.hash="#/analyze":v(),setTimeout(()=>{var e;return(e=document.getElementById("an-report"))==null?void 0:e.scrollIntoView({behavior:"smooth"})},120))}async function Ms(t){if(await D({title:"删除这条分析记录？",text:"报告与利润测算存档会一起删除，历史不可恢复。",ok:"删除",danger:!0})){try{const e=await fetch(`${h}/api/analyses/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`)}catch{d("⚠️ 删除失败，请确认后端在线");return}S=S.filter(e=>e.id!==t),(y==null?void 0:y.id)===t&&(y=null),v()}}function Is(t){if(t.confidence==null)return"";const s=t.confidence_level||"—",e=t.confidence>=90?"hi":t.confidence>=75?"mid":t.confidence>=60?"low":"min",a=(t.confidence_hints||[]).join("；");return`<span class="anr-conf ${e}" ${a?`title="${i(a)}"`:""}>置信度 ${t.confidence} · ${i(s)}${(t.inferred||[]).length?` · ${t.inferred.length} 项推补`:""}</span>`}function Es(t){const s=t.flags||[];if(!s.length)return"";const e={risk:"⛔",warn:"⚠️",info:"ℹ️"};return`
  <div class="m-label">风险旗标</div>
  <div class="anr-flags">
    ${s.map(a=>`<div class="anr-flag lv-${a.level}"><span class="fi">${e[a.level]||"•"}</span>${i(a.text)}</div>`).join("")}
  </div>`}function _s(t){const s=t.advice||[];return s.length?`
  <div class="m-label">行动建议</div>
  <ol class="anr-advice">
    ${s.map(e=>`<li>${i(e)}</li>`).join("")}
  </ol>`:""}function Ls(t){return`
  <div id="an-report" class="an-report">
    <div class="anr-top">
      <div>
        <div class="anr-name">${i(t.name)}</div>
        <div class="meta-row">
          <span class="pm pm-amazon">a</span><span>ASIN ${i(t.asin)}</span>·
          <span>关键词「${i(t.keyword)}」</span>
          <span class="chip-soft">${i(t.collected_at)} 采集</span>
          ${Is(t)}
        </div>
      </div>
      <div class="anr-score-wrap">
        <div class="score big">${t.score}<small>/100</small></div>
        <span class="anr-grade ${t.grade_cls}">${i(t.grade)}</span>
      </div>
    </div>
    <div class="anr-est">预估月销 <b>${i(t.est_sales)}</b><small>${i(t.est_sales_note)}</small></div>
    <div class="anr-visual">
      <div class="anr-radar">${Yt(t.dimensions)}</div>
      <div class="anr-dims">
        ${t.dimensions.map(s=>`
        <div class="dim">
          <div class="dim-head"><span>${i(s.label)}</span><span class="dim-val">${Math.round(s.value*100)}</span></div>
          <div class="dim-bar"><i style="width:${Math.min(100,Math.round(s.value*100))}%"></i></div>
          <div class="dim-text">${i(s.text)}</div>
        </div>`).join("")}
      </div>
    </div>
    ${Es(t)}
    <div class="m-label">判断依据</div>
    <div class="anr-reason">${t.reason_lines.map(i).join("<br>")}</div>
    ${_s(t)}
    <div class="anr-risk">⚠️ ${i(t.risk)}</div>
    ${t.profit?Rs(t.profit):""}
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="profit-open">利润测算${t.profit?"（修改）":""}</button>
      ${Os(t.id)?'<span class="chip-soft" title="已在立项看板">已立项</span>':'<button class="btn btn-ghost" data-action="project-add">转为立项</button>'}
      <button class="btn btn-ghost" data-action="copy-report">复制报告文本</button>
      <button class="btn btn-ghost" data-action="lf-copywriting" data-id="${t.id}" title="用 LinkFoxAI 生成客户话术（按 token 计费，最低 1 点）">AI 写话术</button>
      <button class="btn btn-ghost" data-action="export-pdf" title="备用：浏览器打印另存为 PDF">导出 PDF</button>
    </div>
  </div>`}function As(){if(!$)return'<div class="empty slim">历史记录需要后端在线。</div>';if(!S.length)return $&&J?P(4):'<div class="empty slim">还没有分析记录——完成第 1、2 步就会出现第一份报告。</div>';const t=new Map;return S.forEach(s=>{t.has(s.keyword)||t.set(s.keyword,[]),t.get(s.keyword).push(s)}),[...t.entries()].map(([s,e])=>`
  <div class="an-group">
    <div class="an-group-title">关键词「${i(s)}」<span>${e.length} 个商品</span></div>
    <table class="an-table">
      <thead><tr><th>#</th><th>商品 / ASIN</th><th>机会指数</th><th>等级</th><th>预估月销</th><th>毛利率</th><th>采集时间</th><th></th></tr></thead>
      <tbody>
        ${[...e].sort((a,n)=>n.score-a.score).map((a,n)=>`
        <tr>
          <td>${n+1}</td>
          <td>
            <div class="agt-name" data-action="open-analysis" data-id="${a.id}" title="点击查看完整报告">${i(a.name)}${(a.inferred||[]).length?'<span class="dot-infer" title="含推补值（部分数字缺省推断）"></span>':""}</div>
            <div class="agt-asin">ASIN ${i(a.asin)}</div>
          </td>
          <td><span class="score sm">${a.score}</span></td>
          <td><span class="chip-soft ${a.grade_cls}">${i(a.grade)}</span></td>
          <td>${i(a.est_sales)}</td>
          <td>${a.profit?`<span class="rm-sub ${a.profit.result.verdict_cls}">${a.profit.result.margin}%</span>`:'<span class="rm-sub flat">未测算</span>'}</td>
          <td class="agt-time">${i(a.collected_at)}</td>
          <td><button class="btn btn-danger btn-sm" data-action="del-analysis" data-id="${a.id}">删除</button></td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>`).join("")}function Ps(){return pt(),ut(),`
  <div class="page-head">
    <h1>ASIN 分析 <span class="an-live-chip">真实数据</span></h1>
    <p>粘贴 Amazon 美国站商品链接或 ASIN，按采集清单抄 6 个公开数字，生成可导出 PDF 的选品分析报告。</p>
  </div>
  ${$?"":O()}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">1</span>
      <div class="an-step-title"><b>输入商品</b><span>支持完整链接（含 /dp/B0… 部分）或直接输入 10 位 ASIN</span></div>
    </div>
    <div class="an-parse-row">
      <input id="an-raw" class="input af-input grow" data-field="raw" autocomplete="off"
             placeholder="https://www.amazon.com/dp/B0… 或 B0ABCDEFGHI"
             value="${i(p.raw)}" ${p.asin?"disabled":""}>
      ${p.asin?`<span class="an-asin-ok">ASIN ${i(p.asin)}（${i(p.source)}）</span>
           <button class="btn btn-ghost" data-action="reset-asin">重新输入</button>`:'<button class="btn btn-soft" data-action="parse-asin">解析</button>'}
    </div>
    ${p.parseError?`<div class="an-err">⚠️ ${i(p.parseError)}</div>`:""}
    <div class="an-paste">
      <div class="an-paste-label">
        <b>省事通道 · 整页粘贴</b>
        <span>打开 amazon.com 商品页 → Ctrl+A 全选 → Ctrl+C 复制 → 粘贴到这里 → 点「自动提取」。识别 ASIN + 预填全部数字，绿的已填、琥珀的没认出来再手补。粘贴内容只用于提取，不保存。</span>
      </div>
      <textarea class="input af-input an-paste-ta" data-field="paste" rows="3"
        placeholder="商品页整页文字粘到这里（也认搜索页——只提取结果数）">${i(p.paste)}</textarea>
      <div class="an-paste-row">
        <button class="btn btn-soft" data-action="extract-paste">自动提取</button>
        ${xs()}
      </div>
    </div>
  </section>
  ${p.asin?`
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">2</span>
      <div class="an-step-title"><b>核对采集清单 —— 数字不全也没关系</b><span>提取值会自动带进来；缺的数系统按中性市场推补继续算，报告挂「置信度」如实打折</span></div>
      <button class="btn btn-ghost btn-sm" data-action="fill-sample">填入示例数据</button>
    </div>
    <div class="an-grid">
      ${ms.map(t=>`
      <div class="field">
        <label>${t.label} ${Ss(t.key)}</label>
        <input class="input af-input" data-field="${t.key}" placeholder="${i(t.ph)}" value="${i(p[t.key]??"")}">
        <div class="f-hint">${t.hint}</div>
      </div>`).join("")}
    </div>
    <div class="an-actions">
      <button class="btn btn-primary" data-action="analyze-submit">开始分析</button>
      <span class="an-tip">公式与关键词雷达同一套透明世界观，参数在 api/analyzer.py 可调</span>
    </div>
  </section>`:`
  <div class="empty slim">解析出 ASIN 后，这里会出现采集清单。</div>`}
  ${y?`
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">3</span>
      <div class="an-step-title"><b>分析报告</b><span>可导出 PDF 或复制文本直接发给客户</span></div>
    </div>
    ${Ls(y)}
  </section>`:""}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">4</span>
      <div class="an-step-title"><b>历史与类目对比</b><span>同一关键词下的多个 ASIN 自动归成一类，按机会指数排序</span></div>
    </div>
    ${As()}
  </section>`}function z(t){document.getElementById("modal-root").innerHTML=`
    <div class="modal-backdrop">
      <div class="modal">${t}</div>
    </div>`}function U(){if(document.getElementById("modal-root").innerHTML="",R){const t=R;R=null,t(null)}}let R=null;function D({title:t,text:s,ok:e="确定",danger:a=!1}){return new Promise(n=>{var o;R=n,z(`
      <div class="dlg">
        <h3>${i(t)}</h3>
        <p class="dlg-text">${i(s)}</p>
        <div class="m-actions dlg-actions">
          <button class="btn btn-ghost" data-action="dialog-cancel">取消</button>
          <button class="btn ${a?"btn-danger":"btn-primary"}" data-action="dialog-ok" id="dlg-ok">${i(e)}</button>
        </div>
      </div>`),(o=document.getElementById("dlg-ok"))==null||o.focus()})}function Lt({title:t,text:s,label:e,value:a="",ok:n="保存"}){return new Promise(o=>{R=o,z(`
      <div class="dlg">
        <h3>${i(t)}</h3>
        <p class="dlg-text">${i(s)}</p>
        <div class="field">
          <label>${i(e)}</label>
          <input id="dlg-input" class="input" value="${i(a)}" maxlength="200" autocomplete="off">
        </div>
        <div class="m-actions dlg-actions">
          <button class="btn btn-ghost" data-action="dialog-cancel">取消</button>
          <button class="btn btn-primary" data-action="dialog-ok" id="dlg-ok">${i(n)}</button>
        </div>
      </div>`);const r=document.getElementById("dlg-input");r==null||r.focus(),r==null||r.select()})}function dt(t){const s=R;R=null,document.getElementById("modal-root").innerHTML="",s&&s(t)}function j(t,s,e="处理中…"){t&&(s?(t.dataset.label=t.textContent,t.textContent=e,t.classList.add("is-loading")):(t.textContent=t.dataset.label||t.textContent,t.classList.remove("is-loading")))}function Ns(){z(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>使用指南</h3>
    <p class="m-sub">真数据工作流，4 步循环：</p>
    <div class="guide-steps">
      ${[["加关键词","「关键词雷达」添加你关注的类目词，随时可加、不定期采集（建议先 3–5 个）。"],["抄 5 个数","amazon.com 搜索该词 → 打开第 1 名商品页，抄结果数、BSR、评论数、价格、最新评论天数，约 2 分钟。"],["看差值","提交后差值引擎自动对比上一轮：机会指数涨跌、竞争变化、升降级——工作台榜单和动态自动更新。"],["出报告","客户发来具体商品链接时，用「ASIN 分析」生成可导出 PDF 的单品报告，直接交付。"]].map((s,e)=>`
        <div class="g-step">
          <div class="g-num">${e+1}</div>
          <div class="g-text"><b>${s[0]}</b> — ${s[1]}</div>
        </div>`).join("")}
    </div>
    <div class="m-note">全部数据为人工采集，存储在本地后端（api/pipeline/generated），不连接任何平台、不上传云端。</div>`)}function Cs(t){return`
  <div class="pr-page">
    <div class="pr-head">
      <div class="pr-brand">选品罗盘 · 选品分析报告</div>
      <div class="pr-time">生成于 ${i(t.collected_at)} · Amazon 美国站</div>
    </div>
    <h1 class="pr-name">${i(t.name)}</h1>
    <div class="pr-meta">ASIN ${i(t.asin)} · 关键词「${i(t.keyword)}」</div>
    <div class="pr-score-row">
      <div class="pr-score">${t.score}<small>/100</small></div>
      <div>
        <div class="pr-grade">${i(t.grade)}</div>
        <div class="pr-sales">预估月销 ${i(t.est_sales)}（${i(t.est_sales_note)}）</div>
        ${t.confidence!=null?`<div class="pr-conf">数据置信度 ${t.confidence}/100（${i(t.confidence_level)}）${(t.inferred||[]).length?` · 推补 ${(t.inferred||[]).length} 项`:""}</div>`:""}
      </div>
    </div>
    <table class="pr-dims">
      ${t.dimensions.map(s=>`
      <tr>
        <td class="pr-dim-label">${i(s.label)}</td>
        <td class="pr-dim-bar"><i style="width:${Math.min(100,Math.round(s.value*100))}%"></i></td>
        <td class="pr-dim-score">${Math.round(s.value*100)}</td>
        <td class="pr-dim-text">${i(s.text)}</td>
      </tr>`).join("")}
    </table>
    ${(t.flags||[]).length?`
    <div class="pr-sec">风险旗标</div>
    ${(t.flags||[]).map(s=>`<p class="pr-line pr-flag-${s.level}">· ${i(s.text)}</p>`).join("")}`:""}
    <div class="pr-sec">判断依据</div>
    ${t.reason_lines.map(s=>`<p class="pr-line">· ${i(s)}</p>`).join("")}
    ${(t.advice||[]).length?`
    <div class="pr-sec">行动建议</div>
    ${(t.advice||[]).map(s=>`<p class="pr-line">· ${i(s)}</p>`).join("")}`:""}
    <p class="pr-risk">⚠️ ${i(t.risk)}</p>
    ${t.profit?`
    <div class="pr-sec">利润测算（随报告存档）</div>
    <table class="pr-table">
      <tr><th>售价</th><th>单件总成本</th><th>单件毛利</th><th>毛利率</th><th>保本售价</th>${t.profit.result.monthly_profit!=null?"<th>月利润</th>":""}</tr>
      <tr>
        <td>$${t.profit.inputs.price}</td>
        <td>$${t.profit.result.total_cost}</td>
        <td>$${t.profit.result.profit_per}</td>
        <td><b>${t.profit.result.margin}%</b></td>
        <td>$${t.profit.result.breakeven??"—"}</td>
        ${t.profit.result.monthly_profit!=null?`<td>$${Math.round(t.profit.result.monthly_profit).toLocaleString("en-US")}</td>`:""}
      </tr>
    </table>
    <p class="pr-line">${i(t.profit.result.verdict)}</p>`:""}
    <div class="pr-foot">选品罗盘 · 人工智能提供证据，团队保留最终判断</div>
  </div>`}function Fs(){y&&(document.getElementById("print-area").innerHTML=Cs(y),window.print())}function Bs(t){const s=a=>"▮".repeat(Math.round(a*10)).padEnd(10,"▯"),e=["📊 选品分析报告 · 选品罗盘",`商品：${t.name}`,`ASIN：${t.asin}（amazon.com）`,`关键词：${t.keyword}`,`采集时间：${t.collected_at}`,"",`机会指数：${t.score} / 100 —— ${t.grade}`,`预估月销：${t.est_sales}`];return t.confidence!=null&&e.push(`数据置信度：${t.confidence}/100（${t.confidence_level}）${(t.inferred||[]).length?` · 推补 ${(t.inferred||[]).length} 项`:""}`),e.push("","五维评估：",...t.dimensions.map(a=>`· ${a.label} ${s(a.value)} ${Math.round(a.value*100)} —— ${a.text}`)),(t.flags||[]).length&&e.push("","风险旗标：",...(t.flags||[]).map(a=>`· ${a.text}`)),e.push("","判断依据：",...t.reason_lines.map(a=>`· ${a}`)),(t.advice||[]).length&&e.push("","行动建议：",...(t.advice||[]).map(a=>`· ${a}`)),e.push("",`⚠️ ${t.risk}`,"—— 选品罗盘 生成"),e.join(`
`)}async function Hs(){if(!y)return;const t=Bs(y);try{await navigator.clipboard.writeText(t),d("✅ 报告文本已复制，可直接粘贴给客户",!0)}catch{const s=document.createElement("textarea");s.value=t,document.body.appendChild(s),s.select();try{document.execCommand("copy"),d("✅ 报告文本已复制",!0)}catch{d("⚠️ 复制失败，请手动选中报告内容复制")}s.remove()}}const Os=t=>x.some(s=>s.analysis_id===t);function Rs(t){const s=t.result;return`
  <div class="profit-strip ${s.verdict_cls}">
    <b>利润测算</b>
    <span>毛利率 <b>${s.margin}%</b></span>
    <span>单件毛利 $${s.profit_per}</span>
    ${s.monthly_profit!=null?`<span>月利润 <b>$${Math.round(s.monthly_profit).toLocaleString("en-US")}</b></span>`:""}
    <span class="pv">${i(s.verdict)}</span>
  </div>`}function gt(t){var r;const s=(t==null?void 0:t.input)||{},e=((r=t==null?void 0:t.profit)==null?void 0:r.inputs)||{},a=(t==null?void 0:t.est_sales)||"",n=((t==null?void 0:t.inferred)||[]).includes("price"),o=[["pf-price","售价（美元）",e.price??s.price??"",n?"⚠️ 带入的是推补价格（$12.99 中性假设）——请先在商品页核实真实售价":"默认带入商品售价"],["pf-purchase","采购成本/件",e.purchase??"","供应商报价 + 国内运费"],["pf-inbound","头程物流/件",e.inbound??"","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费/件",e.fba??"","按尺寸重量，用亚马逊物流计算器查"],["pf-other","其他成本/件",e.other??0,"包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率 %",e.ref_pct??15,"大部分类目 15%"],["pf-monthly","预估月销量",e.monthly??"",a?`报告预估：${a}`:"填写后估算月利润"]];z(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>${t?`利润测算 · ${i(t.name)}`:"快速利润测算"}</h3>
    <p class="m-sub">FBA 毛利模型：售价 − 佣金 − FBA − 采购 − 头程 − 其他。改动任一数字，下方实时重算。</p>
    <div class="an-grid">
      ${o.map(([l,u,T,E])=>`
      <div class="field">
        <label>${u}</label>
        <input id="${l}" class="input pf-input" value="${i(String(T??""))}" placeholder="0" autocomplete="off">
        <div class="f-hint">${i(E)}</div>
      </div>`).join("")}
    </div>
    <div id="pf-result" class="pf-result"></div>
    <div class="m-actions">
      ${t?'<button class="btn btn-primary" data-action="profit-save">存入报告</button>':""}
      <button class="btn btn-ghost" data-action="close-modal">关闭</button>
    </div>
    ${t?'<div class="m-note">测算结果随报告存档，自动同步到类目简报；已立项的项目会更新看板毛利率。</div>':'<div class="m-note">快速测算不保存；需要在报告里留档时，请从 ASIN 分析报告页进入。</div>'}`),ft()}function ft(){const t=document.getElementById("pf-result");if(!t)return;const s=F=>{var f;return parseFloat(String(((f=document.getElementById(F))==null?void 0:f.value)||"").replace(/,/g,""))},e=s("pf-price"),a=s("pf-purchase"),n=s("pf-inbound"),o=s("pf-fba"),r=Number.isFinite(s("pf-other"))?s("pf-other"):0,l=s("pf-ref_pct")||15,u=s("pf-monthly")||0;if(!([e,a,n,o].every(Number.isFinite)&&e>0)){t.innerHTML=`
      <div class="pf-tiles">
        <div class="pf-tile"><span>单件毛利</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>毛利率</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>保本售价</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>月利润</span><b class="mut">—</b></div>
      </div>
      <div class="pf-verdict muted">填完上方 售价 / 采购 / 头程 / FBA 四项，这里实时出结果</div>`;return}const E=e*l/100,_=a+n+o+r,m=e-_-E,b=m/e*100,w=l<100?_/(1-l/100):null,M=u>0?m*u:null,C=b>=30?"up":b>=20?"flat":"down",it=b>=30?`毛利率 ${b.toFixed(0)}%，达到优秀线（≥30%），值得推进`:b>=20?`毛利率 ${b.toFixed(0)}%，可做，需控制物流与推广成本`:`毛利率 ${b.toFixed(0)}%，低于红线 20%，建议重新谈价、换头程方案或提高售价`,Z=[["佣金",E,"#8fb3f7"],["FBA",o,"#5b8def"],["采购",a,"#2563eb"],["头程",n,"#1e40af"],["其他",r,"#a8b2c3"]].filter(F=>F[1]>.004);m>0&&Z.push(["毛利",m,"#1f9d61"]),t.innerHTML=`
    <div class="pf-tiles">
      <div class="pf-tile"><span>单件毛利</span><b class="${C}">$${m.toFixed(2)}</b></div>
      <div class="pf-tile"><span>毛利率</span><b class="${C}">${b.toFixed(1)}%</b></div>
      <div class="pf-tile"><span>保本售价</span><b>${w!=null?`$${w.toFixed(2)}`:"—"}</b></div>
      <div class="pf-tile"><span>月利润</span><b>${M!=null?`$${Math.round(M).toLocaleString("en-US")}`:"—"}</b></div>
    </div>
    <div class="pf-verdict ${C}">${it}</div>
    <div class="pf-costbar">
      <div class="pf-bar">${Z.map(([F,f,A])=>`<i style="width:${Math.max(0,Math.min(100,f/e*100)).toFixed(1)}%;background:${A}"></i>`).join("")}</div>
      <div class="pf-costlegend">${Z.map(([F,f,A])=>`<em><i style="background:${A}"></i>${F} $${f.toFixed(2)}</em>`).join("")}</div>
    </div>`}async function Us(){if(!y||!$){d("需要后端在线");return}const t=e=>{var a;return(((a=document.getElementById(e))==null?void 0:a.value)||"").trim()},s=document.querySelector('[data-action="profit-save"]');j(s,!0,"保存中…");try{const e=await fetch(`${h}/api/analyses/${y.id}/profit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({price:t("pf-price"),purchase:t("pf-purchase"),inbound:t("pf-inbound"),fba:t("pf-fba"),other:t("pf-other"),ref_pct:t("pf-ref_pct"),monthly:t("pf-monthly")})}),a=await e.json();if(!e.ok){d(`⚠️ ${a.detail||"保存失败"}`);return}const n=S.findIndex(r=>r.id===a.id);n>=0&&(S[n]=a),(y==null?void 0:y.id)===a.id&&(y=a),J=!1,U(),d("✅ 利润测算已存入报告",!0);const o=x.find(r=>r.analysis_id===a.id);o?vt(o.id,{margin:a.profit.result.margin}):v()}catch{d("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{j(s,!1)}}const N=["待评估","测算中","已立项","样品中","已放弃"];function zs(){return ut(),x.length?`
  <div class="page-head">
    <h1>立项看板</h1>
    <p>共 ${x.length} 个项目 · 阶段推进与备注随手记，跟进进度一目了然。</p>
  </div>
  ${$?"":O()}
  <div class="pj-board">
    ${N.map(t=>Ds(t,x.filter(s=>s.stage===t))).join("")}
  </div>`:`
    <div class="page-head">
      <h1>立项看板</h1>
      <p>从 ASIN 分析转入的跟进项目——测算利润、推进样品，每个机会都不跟丢。</p>
    </div>
    ${$?"":O()}
    <div class="empty">看板还是空的——在「ASIN 分析」的报告页点「转为立项」，通过验证的机会会出现在这里。</div>
    <section class="an-card onboard">
      <b>这一环怎么用</b>
      <ol>
        <li>雷达发现类目机会，用「ASIN 分析」验证具体单品</li>
        <li>报告页点「转为立项」，项目以「待评估」进入看板</li>
        <li>完成利润测算 → 用 ← / → 推进阶段，随时点「备注」记录供应商与报价</li>
      </ol>
      <a class="btn btn-primary" href="#/analyze">去 ASIN 分析</a>
    </section>`}function Ds(t,s){return`
  <div class="pj-col ${t==="已放弃"?"dead":""}">
    <div class="pj-col-head">${t}<span>${s.length}</span></div>
    ${s.map(qs).join("")||'<div class="pj-empty">暂无项目</div>'}
  </div>`}function qs(t){const s=N.indexOf(t.stage),e=s>0?N[s-1]:null,a=s>=0&&s<N.length-1?N[s+1]:null,n=t.margin!=null?`<span class="rm-sub ${t.margin>=30?"up":t.margin>=20?"flat":"down"}">毛利 ${t.margin}%</span>`:'<button class="pj-mini" data-action="quick-profit" title="还没测算过利润">未测算</button>';return`
  <div class="pj-card">
    <div class="pj-name" data-action="open-analysis" data-id="${t.analysis_id}" title="点击回看分析报告">${i(t.name)}</div>
    <div class="pj-meta">ASIN ${i(t.asin)} · ${i(t.keyword)}</div>
    <div class="pj-chips">
      <span class="chip-soft ${t.grade_cls}">指数 ${t.score}</span>
      ${n}
    </div>
    ${t.note?`<div class="pj-note">${i(t.note)}</div>`:""}
    <div class="pj-ops">
      ${e?`<button class="pj-arrow" data-action="project-move" data-id="${t.id}" data-dir="back" title="退回：${e}">←</button>`:"<span></span>"}
      <button class="pj-mini" data-action="project-note" data-id="${t.id}">备注</button>
      <button class="pj-mini danger" data-action="project-del" data-id="${t.id}">删除</button>
      ${a?`<button class="pj-arrow" data-action="project-move" data-id="${t.id}" data-dir="next" title="推进：${a}">→</button>`:"<span></span>"}
    </div>
    <div class="pj-time">更新于 ${i(t.updated_at)}</div>
  </div>`}async function vt(t,s){try{const e=await fetch(`${h}/api/projects/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),a=await e.json();if(!e.ok)return d(`⚠️ ${a.detail||"更新失败"}`),null;const n=x.findIndex(o=>o.id===t);return n>=0&&(x[n]=a),at=!1,v(),a}catch{return d("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function Gs(t,s){const e=x.find(l=>l.id===t);if(!e)return;const n=N.indexOf(e.stage)+(s==="next"?1:-1);if(n<0||n>=N.length)return;const o=N[n];if(o==="已放弃"&&!await D({title:"标记为「已放弃」？",text:"不会删除记录，也不影响 ASIN 分析；之后可用 ← 按钮退回上一阶段。",ok:"确认放弃"}))return;await vt(t,{stage:o})&&d(`已移到「${o}」`,!0)}async function Js(t){const s=x.find(a=>a.id===t);if(!s)return;const e=await Lt({title:"项目备注",text:"记录供应商、报价、样品进度……随时可改。",label:"备注（200 字内）",value:s.note||""});e!==null&&vt(t,{note:e})}async function Ks(){if(!y||!$){d("需要后端在线");return}try{const t=await fetch(`${h}/api/projects`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysis_id:y.id})}),s=await t.json();if(!t.ok){d(`⚠️ ${s.detail||"转入失败"}`);return}x.unshift(s),at=!1,v(),d("✅ 已转入立项看板（待评估）",!0)}catch{d("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}async function Zs(t){const s=x.find(a=>a.id===t);if(!(!s||!await D({title:`从看板删除「${s.name}」？`,text:"只删除看板卡片，不影响 ASIN 分析记录。",ok:"删除",danger:!0}))){try{const a=await fetch(`${h}/api/projects/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{d("⚠️ 删除失败，请确认后端在线");return}x=x.filter(a=>a.id!==t),v()}}function Ws(){const t=[["pf-price","售价","$","目标卖价，如 29.99"],["pf-purchase","采购成本","$/件","供应商报价 + 国内运费"],["pf-inbound","头程物流","$/件","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费","$/件","按尺寸重量，用亚马逊物流计算器查"]],s=[["pf-other","其他成本","$/件","包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率","%","大部分类目 15"],["pf-monthly","预估月销量","件","填了多一行月利润"]];return setTimeout(ft,0),`
  <div class="page-head">
    <h1>利润计算器</h1>
    <p>FBA 毛利模型：售价 − 佣金 − 配送费 − 采购 − 头程 − 其他。改任一数字，结果实时重算。</p>
  </div>
  ${$?"":O()}
  <section class="an-card">
    <div class="pf-sec-label">成本输入<span>前 4 项必填</span></div>
    <div class="pf-row pf-row-4">${t.map(yt).join("")}</div>
    <div class="pf-sec-label">可选参数<span>有数就算，没数按默认</span></div>
    <div class="pf-row pf-row-3">${s.map(yt).join("")}</div>
  </section>
  <section class="an-card">
    <div class="pf-sec-label">实时结果<span>改上方任一数字立即重算</span></div>
    <div id="pf-result" class="pf-result"></div>
  </section>
  <section class="an-card">
    <div class="pf-sec-label">没有准确数？先按经验值估</div>
    <div class="est-grid">
      <div class="est-card"><b>采购成本</b><p>1688 询价后加 10% 余量，再折成美元</p></div>
      <div class="est-card"><b>头程物流</b><p>海运约 2–4 元/件（小件），空运约 8–15 元/件</p></div>
      <div class="est-card"><b>FBA 配送费</b><p>小标准件约 3–4 美元，大件 6 美元以上</p></div>
    </div>
    <div class="m-note">这一页是随手速算、不保存；要把测算随报告存档，请到「ASIN 分析」的报告页点「利润测算」。</div>
  </section>`}function yt([t,s,e,a]){return`
  <div class="field">
    <label>${s}</label>
    <div class="pf-inbox">
      <input id="${t}" class="input pf-input" placeholder="0" autocomplete="off">
      <span class="pf-unit">${e}</span>
    </div>
    <div class="f-hint">${a}</div>
  </div>`}function Xs(){return Dt(),`
  <div class="page-head ph-row">
    <div>
      <h1>供应商库</h1>
      <p>谈完一家记一家——报价、起订量、联系方式集中在这里，立项后找货不翻聊天记录。</p>
    </div>
    <div class="ph-actions">
      <button class="btn btn-primary btn-sm" data-action="supplier-add">＋ 供应商</button>
    </div>
  </div>
  ${$?"":O()}
  ${L.length?`
  <section class="an-card" style="padding:4px 14px">
    <table class="an-table">
      <thead><tr><th>供应商</th><th>主营类目</th><th>当前报价</th><th>起订量</th><th>联系方式</th><th>备注</th><th>更新</th><th></th></tr></thead>
      <tbody>
        ${L.map(t=>`
        <tr>
          <td><div class="agt-name">${i(t.name)}</div></td>
          <td>${i(t.category)||'<span class="rm-sub flat">—</span>'}</td>
          <td>${t.quote?`<b>${i(t.quote)}</b>`:'<span class="rm-sub flat">未报价</span>'}</td>
          <td>${i(t.moq)||'<span class="rm-sub flat">—</span>'}</td>
          <td>${i(t.contact)||'<span class="rm-sub flat">—</span>'}</td>
          <td class="sp-note">${i(t.note)||'<span class="rm-sub flat">—</span>'}</td>
          <td class="agt-time">${i(t.updated_at)}</td>
          <td class="row-actions">
            <button class="pj-mini" data-action="supplier-quote" data-id="${t.id}">改报价</button>
            <button class="pj-mini" data-action="supplier-note" data-id="${t.id}">备注</button>
            <button class="pj-mini danger" data-action="supplier-del" data-id="${t.id}">删除</button>
          </td>
        </tr>`).join("")}
      </tbody>
    </table>
  </section>`:$&&W?`<section class="an-card">${P(4)}</section>`:'<div class="empty">还没有供应商记录——谈完第一家就记进来：名称、报价、起订量。</div>'}`}function Vs(){if(!$){d("需要后端在线——启动方法见页面提示");return}z(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>添加供应商</h3>
    <p class="m-sub">只有名称必填，其余谈完随时补。</p>
    <div class="an-grid">
      ${[["sp-name","供应商名称（必填）","如：宁波某某家居用品厂"],["sp-category","主营类目","如：宠物窝垫 / 厨房收纳"],["sp-quote","当前报价","如 $8.5/件 或 62元/件"],["sp-moq","起订量","如 500"],["sp-contact","联系方式","微信 / 电话 / 1688 店铺名"],["sp-note","备注","打样费、交期、账期、配合度……"]].map(([s,e,a])=>`
      <div class="field">
        <label>${e}</label>
        <input id="${s}" class="input sp-input" placeholder="${i(a)}" autocomplete="off">
      </div>`).join("")}
    </div>
    <div class="m-actions">
      <button class="btn btn-primary" data-action="supplier-save">保存</button>
    </div>`)}async function At(){const t=e=>{var a;return(((a=document.getElementById(e))==null?void 0:a.value)||"").trim()};if(!t("sp-name")){d("供应商名称不能为空");return}const s=document.querySelector('[data-action="supplier-save"]');j(s,!0,"保存中…");try{const e=await fetch(`${h}/api/suppliers`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t("sp-name"),category:t("sp-category"),quote:t("sp-quote"),moq:t("sp-moq"),contact:t("sp-contact"),note:t("sp-note")})}),a=await e.json();if(!e.ok){d(`⚠️ ${a.detail||"保存失败"}`);return}L.unshift(a),W=!1,U(),d("✅ 已记录供应商",!0),v()}catch{d("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{j(s,!1)}}async function Qs(t,s){try{const e=await fetch(`${h}/api/suppliers/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),a=await e.json();if(!e.ok)return d(`⚠️ ${a.detail||"更新失败"}`),null;const n=L.findIndex(o=>o.id===t);return n>=0&&(L[n]=a),W=!1,v(),a}catch{return d("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function wt(t,s,e,a){const n=L.find(r=>r.id===t);if(!n)return;const o=await Lt({title:e,text:`${n.name} 的当前${a}，直接改成新内容。`,label:a,value:n[s]||""});o!==null&&await Qs(t,{[s]:o})&&d("已更新",!0)}async function Ys(t){const s=L.find(a=>a.id===t);if(!(!s||!await D({title:`删除「${s.name}」？`,text:"这条供应商记录会一起删掉，不可恢复。",ok:"删除",danger:!0}))){try{const a=await fetch(`${h}/api/suppliers/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{d("⚠️ 删除失败，请确认后端在线");return}L=L.filter(a=>a.id!==t),v()}}function Pt(t){const s=t.rounds[t.rounds.length-1],e=t.rounds[t.rounds.length-2]||null,a=S.filter(u=>(u.keyword||"").toLowerCase()===t.keyword.toLowerCase()).sort((u,T)=>T.score-u.score),n=a.filter(u=>u.profit),o=n.length?n.reduce((u,T)=>T.profit.result.margin>u.profit.result.margin?T:u):null,r=e?s.score>e.score?`机会指数较上轮上升 ${s.score-e.score} 分`:s.score<e.score?`机会指数较上轮下降 ${e.score-s.score} 分`:"机会指数与上轮持平":"首轮采集，暂无趋势",l=[`关键词「${t.keyword}」当前 ${s.grade}（机会指数 ${s.score}/100），${r}。`,a.length?`已深度分析 ${a.length} 个相关 ASIN，最高机会指数 ${Math.max(...a.map(u=>u.score))}${o?`，测算毛利率最高 ${o.profit.result.margin}%（${o.name}）`:""}。`:"尚未对该关键词下的具体商品做深度分析，建议先对头部商品跑一轮 ASIN 分析。",s.grade_cls!=="g-c"?"建议：维持当前监控节奏，优先对头部商品完成 ASIN 分析与利润测算，达到立项标准即转入看板跟进。":"建议：该类目当前竞争或需求信号偏弱，保持低频监控，暂不投入选品资源。"];return{cur:s,prev:e,related:a,trend:r,conclusion:l}}function ta(t){const s=S.filter(e=>(e.keyword||"").toLowerCase()===t.toLowerCase()).sort((e,a)=>a.score-e.score);return s.length?s.map(e=>`
    <div class="rel-row" data-action="open-analysis" data-id="${e.id}" role="button" tabindex="0">
      <div class="rel-main">
        <div class="rel-name">${i(e.name)}</div>
        <div class="rel-meta">ASIN ${i(e.asin)}${e.profit?` · 毛利率 ${e.profit.result.margin}%`:""}</div>
      </div>
      <div class="rel-bar"><i style="width:${e.score}%"></i></div>
      <b class="rel-score">${e.score}</b>
    </div>`).join(""):'<div class="empty slim">该关键词下还没有 ASIN 分析——用「ASIN 分析」页对头部商品跑一份。</div>'}function Nt(t){const s=k.keywords.find(u=>u.id===t);if(!s||!s.rounds.length){d("这个关键词还没有采集轮次，先完成第 1 轮");return}const{cur:e,prev:a,related:n,trend:o,conclusion:r}=Pt(s),l=[{name:s.keyword,points:s.rounds.map(u=>u.score)}];document.getElementById("modal-root").innerHTML=`
  <div class="modal-backdrop drawer-on">
    <div class="drawer">
      <div class="dr-head">
        <div>
          <div class="dr-kw">${i(s.keyword)}</div>
          <div class="dr-sub">共 ${s.rounds.length} 轮采集 · 最新 ${i(e.collected_at)} · ${i(o)}</div>
        </div>
        <div class="dr-head-right">
          <span class="anr-grade ${e.grade_cls}">${i(e.grade)}</span>
          <button class="m-close" data-action="close-modal">✕</button>
        </div>
      </div>

      <div class="dr-score-row">
        ${Qt(e.score)}
        <div class="dr-score-facts">
          <div class="dr-fact"><b>${e.score}</b><span>当前指数</span></div>
          <div class="dr-fact"><b>${a?e.score>a.score?"↑":e.score<a.score?"↓":"→":"—"}</b><span>较上轮</span></div>
          <div class="dr-fact"><b>${s.rounds.length}</b><span>采集轮次</span></div>
          <div class="dr-fact"><b>${n.length}</b><span>相关 ASIN</span></div>
        </div>
      </div>

      <div class="m-label">机会指数走势</div>
      <div class="dr-chart">${Mt(l,{h:190})}</div>

      <div class="m-label">最新一轮核心指标</div>
      <div class="kcard-metrics">
        ${H("搜索结果",e.results,a==null?void 0:a.results,I,"down")}
        ${H("头部 BSR",e.bsr,a==null?void 0:a.bsr,K,"down")}
        ${H("头部评论",e.reviews,a==null?void 0:a.reviews,I,"up")}
        ${H("头部价格",e.price,a==null?void 0:a.price,Tt,null)}
      </div>

      <div class="m-label">判断依据（最新一轮）</div>
      <div class="anr-reason">${e.reason_lines.map(i).join("<br>")}</div>

      <div class="m-label">相关 ASIN 分析（${n.length}）</div>
      ${ta(s.keyword)}

      <div class="m-label">综合结论</div>
      <div class="anr-reason dr-conclusion">${r.map(i).join("<br><br>")}</div>

      <div class="dr-actions">
        <button class="btn btn-primary" data-action="collect-open" data-id="${s.id}">采集下一轮</button>
        <button class="btn btn-ghost" data-action="brief-export" data-id="${s.id}">简报 PDF（备用）</button>
      </div>
    </div>
  </div>`}function sa(t){const s=k.keywords.find(e=>e.id===t);if(!s||!s.rounds.length){d("这个关键词还没有采集轮次，先完成第 1 轮");return}document.getElementById("print-area").innerHTML=aa(s),window.print()}function aa(t){const{cur:s,related:e,trend:a,conclusion:n}=Pt(t);return`
  <div class="pr-page">
    <div class="pr-head">
      <div class="pr-brand">选品罗盘 · 类目机会简报</div>
      <div class="pr-time">生成于 ${i(s.collected_at)} · Amazon 美国站</div>
    </div>
    <h1 class="pr-name">关键词「${i(t.keyword)}」</h1>
    <div class="pr-meta">共 ${t.rounds.length} 轮采集 · 最新一轮 ${i(s.collected_at)}</div>
    <div class="pr-score-row">
      <div class="pr-score">${s.score}<small>/100</small></div>
      <div>
        <div class="pr-grade">${i(s.grade)}</div>
        <div class="pr-sales">${i(a)}</div>
      </div>
    </div>
    <div class="pr-sec">最新一轮核心指标</div>
    <table class="pr-table">
      <tr><th>搜索结果数</th><th>头部 BSR</th><th>头部评论</th><th>头部价格</th><th>评论距今</th></tr>
      <tr><td>${I(s.results)}</td><td>${K(s.bsr)}</td><td>${I(s.reviews)}</td><td>$${s.price}</td><td>${s.days} 天</td></tr>
    </table>
    <div class="pr-sec">采集历史（近 8 轮）</div>
    <table class="pr-table">
      <tr><th>轮次</th><th>时间</th><th>指数</th><th>评级</th><th>结果数</th><th>BSR</th></tr>
      ${[...t.rounds].slice(-8).reverse().map(o=>`
      <tr><td>第 ${o.round_no} 轮</td><td>${i(o.collected_at)}</td><td><b>${o.score}</b></td><td>${i(o.grade.split(" · ")[0])}</td><td>${I(o.results)}</td><td>${K(o.bsr)}</td></tr>`).join("")}
    </table>
    <div class="pr-sec">判断依据（最新一轮）</div>
    ${s.reason_lines.map(o=>`<p class="pr-line">· ${i(o)}</p>`).join("")}
    ${e.length?`
    <div class="pr-sec">相关 ASIN 分析（${e.length}）</div>
    <table class="pr-table">
      <tr><th>商品</th><th>ASIN</th><th>机会指数</th><th>毛利率</th></tr>
      ${e.map(o=>`
      <tr><td>${i(o.name)}</td><td>${i(o.asin)}</td><td>${o.score}</td><td>${o.profit?o.profit.result.margin+"%":"—"}</td></tr>`).join("")}
    </table>`:""}
    <div class="pr-sec">综合结论</div>
    ${n.map(o=>`<p class="pr-line">· ${i(o)}</p>`).join("")}
    <div class="pr-foot">选品罗盘 · 数据为人工采集的公开信息 · 人工智能提供证据，团队保留最终判断</div>
  </div>`}const ht=[{kind:"cutout",name:"自动抠图",desc:"商品抠图 / 白底图",price:10},{kind:"sceneFission",name:"场景裂变",desc:"同款商品换场景",price:20},{kind:"similarFission",name:"相似图裂变",desc:"裂变相似新款图",price:20},{kind:"imageEdit",name:"智能修图",desc:"一句话改图（多模型）",price:null},{kind:"changeModel",name:"换模特",desc:"服装图一键换模特",price:20}],c={fn:"cutout",imageUrl:"",pickTarget:"imageUrl",params:{subType:"3",clothClass:"",strength:"0.5",fissionMode:"SCENE_FISSION_REALISTIC",weight:"2",scale:"1:1",provider:"KONTEXT",modelHeadImageUrl:"",sceneImgUrl:"",sceneStrength:"0.7",modelPrompt:"",customPrompt:"",customNegPrompt:"",genOriRes:"false",realModel:"true",outputNum:"1",note:""},plan:null,planError:"",tasks:[],tasksStale:!0};let tt=null,B=null,Ct="";function ea(t){const s=ht.find(e=>e.kind===t);return s?s.price:null}function Ft(){const t=ea(c.fn);if(t===null)return null;let s=t;c.fn==="changeModel"&&String(c.params.genOriRes)==="true"&&(s=25);const e=Math.max(1,Math.min(4,Number(c.params.outputNum)||1));return s*e}async function V(t=!1){if(!(c.plan&&!t)){try{const s=await fetch(`${h}/api/linkfox/plan`);if(!s.ok){const a=await s.json().catch(()=>({}));throw new Error(a.detail||`HTTP ${s.status}`)}const e=await s.json();c.plan=e.plan,c.planError=""}catch(s){c.planError=s.message}location.hash==="#/studio"&&v()}}async function na(){if($)try{const t=await fetch(`${h}/api/linkfox/tasks`);if(!t.ok)return;c.tasks=(await t.json()).tasks||[],c.tasksStale=!1}catch{}}function ia(){tt||(tt=setInterval(async()=>{if((location.hash||"")!=="#/studio"){clearInterval(tt),tt=null;return}const t=c.tasks.filter(e=>e.status===1||e.status===2);if(!t.length)return;let s=!1;for(const e of t)try{const a=e.kind==="text"?"text":"task",n=await fetch(`${h}/api/linkfox/${a}/${e.task_id}`,{method:"POST"});if(!n.ok)continue;const o=await n.json(),r=c.tasks.findIndex(l=>l.task_id===e.task_id);r>=0&&(o.status!==c.tasks[r].status||(o.images||[]).length!==(c.tasks[r].images||[]).length||(o.content||"")!==(c.tasks[r].content||""))&&(c.tasks[r]={...c.tasks[r],...o},s=!0)}catch{}s&&(v(),c.tasks.every(e=>e.status===3||e.status===4)&&V(!0))},1e4))}function oa(){return V(),c.tasksStale&&na().then(()=>{location.hash==="#/studio"&&v()}),ia(),`
  <div class="page-head">
    <h1>AI 作图工坊 <span class="an-live-chip">紫鸟算力</span></h1>
    <p>白底图、场景图、模特图、一句话修图——图片由 LinkFoxAI（紫鸟）算力生成，每次提交前先报价确认。</p>
  </div>
  ${$?"":O()}
  ${ra()}
  <section class="sf-card">
    <div class="sf-sec-title">选择功能 <span>标价为单张点数；实耗以平台为准</span></div>
    <div class="sf-fns">${ht.map(t=>`
      <button class="sf-fn ${c.fn===t.kind?"on":""}" data-action="sf-set-fn" data-id="${t.kind}">
        <b>${t.name}</b><span>${t.price?`${t.price} 点/张`:"动态计费"}</span><small>${t.desc}</small>
      </button>`).join("")}
    </div>
    ${ca()}
  </section>
  <section class="sf-card">
    <div class="sf-sec-title">任务记录 <span>结果图地址 8 小时内有效，过期用「换新地址」；记录最多保留 60 条</span></div>
    ${la()}
  </section>`}function ra(){if(c.planError)return`
  <div class="sf-plan err">
    <div>算力查询失败：${i(c.planError)}</div>
    <button class="btn btn-ghost btn-sm" data-action="sf-refresh-plan">重试</button>
  </div>`;if(!c.plan)return P(2);const t=c.plan,s=t.total?Math.min(100,Math.round(t.usage/t.total*100)):0,e=String(t.expire_time||""),a=/^\d{8}$/.test(e)?new Date(+e.slice(0,4),+e.slice(4,6)-1,+e.slice(6,8)):null,n=a?Math.ceil((a-new Date)/864e5):null;return`
  <div class="sf-plan">
    <div class="sf-plan-num">
      <b>${I(t.remaining)}</b><span>剩余算力点</span>
      <em>总 ${I(t.total)} · 已用 ${I(t.usage)}（${s}%）</em>
    </div>
    <div class="sf-plan-bar"><i style="width:${100-s}%"></i></div>
    <div class="sf-plan-meta">
      ${a?`<span class="sf-expire ${n!==null&&n<=20?"warn":""}">套餐 ${a.getMonth()+1} 月 ${a.getDate()} 日到期${n!==null?`（剩 ${n} 天）`:""}——点数月底清零，抓紧用</span>`:""}
      <button class="btn btn-ghost btn-sm" data-action="sf-refresh-plan">刷新余额</button>
    </div>
  </div>`}const g=(t,s,e="")=>`
  <div class="field">
    <label>${t}</label>
    ${s}
    ${e?`<div class="f-hint">${e}</div>`:""}
  </div>`;function ot(t,s="上传本地图片"){return`<button class="btn btn-ghost btn-sm" data-action="sf-pick-file" data-target="${t}">${s}</button>`}function ca(){const t=c.params,s=(o,r)=>`
    <select class="input sf-input" data-field="${o}">
      ${r.map(([l,u])=>`<option value="${l}" ${String(t[o])===String(l)?"selected":""}>${u}</option>`).join("")}
    </select>`,e=(o,r,l=600)=>`
    <input class="input sf-input" data-field="${o}" placeholder="${i(r)}" maxlength="${l}" value="${i(t[o]??"")}">`;let a="";c.fn==="cutout"?a=g("抠图类型",s("subType",[["3","商品（默认）"],["1","通用"],["2","人像"],["9","服饰"],["12","头发"],["13","人脸"]]))+(String(t.subType)==="9"?g("服饰部位（多选用逗号隔开）",e("clothClass","如 tops,skirt,bag",60),"可选：tops / coat / skirt / pants / bag / shoes / hat"):""):c.fn==="sceneFission"?a=g("与原图相似度",s("strength",[["0.3","0.3（场景变化大）"],["0.5","0.5（默认均衡）"],["0.7","0.7"],["0.9","0.9（场景变化小）"]]))+g("裂变模式",s("fissionMode",[["SCENE_FISSION_REALISTIC","写实（默认）"],["SCENE_FISSION_SIMPLE","简约"],["SCENE_FISSION_INTELLIGENT","智能"]]))+g("场景描述（可选）",e("prompt","如：北欧风客厅，清晨自然光，木桌面"),"不填则按原图自动提取，最长 600 字"):c.fn==="similarFission"?a=g("生图描述（可选）",e("prompt","如：换成莫兰迪配色的同款马克杯"))+g("与参考图相似度",s("weight",[["2","2 · 最像（默认）"],["1","1 · 中等"],["0","0 · 发散"]]))+g("输出比例",s("scale",[["1:1","1:1 方图"],["3:4","3:4 竖图"],["4:3","4:3 横图"],["9:16","9:16 手机屏"],["16:9","16:9 宽幅"]])):c.fn==="imageEdit"?a=g("想怎么改（必填）",`
      <textarea class="input sf-input sf-ta" data-field="prompt" rows="3" maxlength="3000"
        placeholder="如：把背景换成纯白底，商品居中占画面 80%，加轻微投影">${i(t.prompt??"")}</textarea>`,"一句话描述即可，最长 3000 字")+g("模型",s("provider",[["KONTEXT","KONTEXT（默认 · 稳）"],["GPT_2_5_IMAGE","GPT 2.5 Image"],["GPT_2_5_F_IMAGE","GPT 2.5 F Image"],["GPT_2_IMAGE","GPT 2 Image"],["BANANA_PRO","Banana Pro"],["QWEN_IMAGE_3_PRO","Qwen Image 3 Pro"]]),"不同模型扣点不同，以实际扣点为准"):c.fn==="changeModel"&&(a=g("模特头部图地址（必填）",e("modelHeadImageUrl","https://… 头部正脸照，512×512～2048×2048",500),"用旁边的「上传」按钮传本地图更方便")+g("",ot("modelHeadImageUrl","上传模特头部图"))+g("场景参考图（可选，建议用）",e("sceneImgUrl","https://… 768×768～4096×4096",500))+g("",ot("sceneImgUrl","上传场景参考图"))+g("场景相似度",s("sceneStrength",[["0.4","0.4（场景变化大）"],["0.7","0.7（默认）"],["0.9","0.9（贴场景）"]]))+g("模特特征（多选逗号隔开）",e("modelPrompt","如：微笑,坐着,苗条",100),"可选：微笑 / 大笑 / 坐着 / 躺着 / 肥胖 / 微胖 / 苗条 / 侧身 / 侧脸 / 背面 / 光头")+g("自定义描述（可选）",e("customPrompt","额外要求，最长 600 字"))+g("原图是真人还是人台",s("realModel",[["true","真人模特（默认）"],["false","人台 / 假模"]]))+g("输出尺寸",s("genOriRes",[["false","标准尺寸（20 点/张）"],["true","原分辨率（25 点/张）"]])));const n=Ft();return`
  <div class="sf-form">
    <div class="sf-src">
      ${g(c.fn==="changeModel"?"模特原图地址":"原图地址",`
        <input class="input sf-input" data-field="imageUrl" data-scope="top" placeholder="https://… 图片公网地址"
          value="${i(c.imageUrl)}">`,"jpg / png / webp；本地图点「上传本地图片」转成公网地址（免费不扣点）")}
      <div class="sf-src-btns">${ot("imageUrl")}${c.imageUrl?`<img class="sf-thumb" src="${i(c.imageUrl)}" alt="原图预览" referrerpolicy="no-referrer">`:""}</div>
    </div>
    ${a}
    ${c.fn!=="cutout"?g("输出张数",s("outputNum",[["1","1 张"],["2","2 张"],["3","3 张"],["4","4 张"]])):""}
    ${g("备注（写给自己看）",e("note","如：A 客户保温杯主图",120))}
    <div class="sf-submit-row">
      <button class="btn btn-primary" data-action="sf-submit">${n!==null?`提交任务 · 预估 ${n} 点`:"提交任务 · 以实际扣点为准"}</button>
      <span class="sf-tip">提交前会再弹一次报价确认；生成约需 30 秒～2 分钟</span>
    </div>
  </div>
  <input type="file" id="sf-file" accept=".jpg,.jpeg,.png,.webp" hidden>`}function la(){return $?c.tasks.length?`<div class="sf-tasks">${c.tasks.map(da).join("")}</div>`:c.tasksStale?P(3):'<div class="empty slim">还没有任务——选好功能、放好图，提交第一个任务（提交前会先报价确认）。</div>':'<div class="empty slim">任务记录需要后端在线。</div>'}function da(t){const s=t.status===1||t.status===2;return`
  <div class="sf-task st${t.status}">
    <div class="sf-task-top">
      <b>${i(t.kind_name)}</b>
      ${t.note?`<span class="chip-soft">${i(t.note)}</span>`:""}
      <span class="sf-st">${s?'<span class="sf-spin"></span>':""}${i(t.status_text)}</span>
      ${t.status===3&&t.count!=null?`<span class="sf-cost">实耗 ${t.count} 点</span>`:""}
      ${t.estimate!=null?`<span class="sf-est">预估 ${t.estimate} 点</span>`:'<span class="sf-est">动态计费</span>'}
      <span class="sf-task-time">${i(t.created_at)}</span>
      <button class="btn btn-danger btn-sm" data-action="sf-del-task" data-id="${i(t.task_id)}">删除</button>
    </div>
    ${t.kind!=="text"&&(t.images||[]).length?`
    <div class="sf-grid">
      ${t.images.map(e=>`
      <figure class="sf-shot">
        <img src="${i(e.url)}" alt="结果图" loading="lazy" referrerpolicy="no-referrer">
        <figcaption>
          <a href="${i(e.url)}" target="_blank" rel="noopener">打开原图</a>
          <a href="${h}/api/linkfox/download?url=${encodeURIComponent(e.url)}">下载</a>
          ${e.id?`<button class="linklike" data-action="sf-refresh-img" data-id="${i(e.id)}" title="地址 8 小时过期后换新的">换新地址</button>`:""}
        </figcaption>
      </figure>`).join("")}
    </div>`:""}
    ${t.kind==="text"&&t.content?`
    <div class="sf-text-out">${i(t.content)}</div>
    <button class="btn btn-ghost btn-sm" data-action="sf-copy-text" data-id="${i(t.task_id)}">复制文案</button>`:""}
    ${s?'<div class="sf-hint-run">生成中，页面开着会自动刷新（约 10 秒一查）……</div>':""}
    ${t.status===4?`<div class="sf-err">失败：${i(t.error||"平台未返回原因")}</div>`:""}
  </div>`}async function pa(t){const s=ht.find(r=>r.kind===c.fn),e=c.imageUrl.trim();if(!e){d("请先填原图地址，或用「上传本地图片」");return}if(c.fn==="changeModel"&&!String(c.params.modelHeadImageUrl||"").trim()){d("换模特必填「模特头部图」——填地址或点上传按钮");return}if(c.fn==="imageEdit"&&!String(c.params.prompt||"").trim()){d("智能修图要填一句「想怎么改」");return}const a=Ft(),n=c.plan?`，当前剩余 ${I(c.plan.remaining)} 点`:"";if(await D({title:`提交「${s.name}」任务`,text:a!==null?`预估消耗 ${a} 点${n}，实际以平台扣点为准。确定提交？`:`智能修图按所选模型动态计费${n}，实际以平台扣点为准。确定提交？`,ok:"提交任务"})){j(t,!0,"提交中…");try{const r=await fetch(`${h}/api/linkfox/task`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:c.fn,...c.params,imageUrl:e})}),l=await r.json().catch(()=>({}));if(!r.ok)throw new Error(l.detail||`HTTP ${r.status}`);c.tasks.unshift(l),c.params.note="",d(`已提交，平台排队中（任务号 …${String(l.task_id).slice(-6)}）`,!0),v(),V(!0)}catch(r){d(`提交失败：${r.message}`),j(t,!1)}}}async function ua(t,s,e){if(t.size>10*1024*1024){d("图片超过 10MB 上限——先压缩再传");return}j(e,!0,"上传中…");try{const a=await new Promise((r,l)=>{const u=new FileReader;u.onload=()=>r(String(u.result).replace(/^data:[^,]+,/,"")),u.onerror=()=>l(new Error("本地文件读取失败")),u.readAsDataURL(t)}),n=await fetch(`${h}/api/linkfox/upload`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fileName:t.name,base64:a})}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.detail||`HTTP ${n.status}`);s==="imageUrl"?c.imageUrl=o.url:c.params[s]=o.url,d("上传成功，已回填地址（上传免费不扣点）",!0),v()}catch(a){d(`上传失败：${a.message}`),j(e,!1)}}async function fa(t,s){var e;try{const a=await fetch(`${h}/api/linkfox/refresh`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({imageId:t})}),n=await a.json().catch(()=>({}));if(!a.ok)throw new Error(n.detail||`HTTP ${a.status}`);const o=(e=s.closest("figure"))==null?void 0:e.querySelector("img");o&&(o.src=n.url);try{await navigator.clipboard.writeText(n.url),d("已换新地址（也复制了一份）",!0)}catch{d("已换新地址",!0)}}catch(a){d(`换地址失败：${a.message}`)}}async function va(t){if(await D({title:"删除任务记录",text:"只删本地存档，不影响平台侧已扣点数。确定删除？",ok:"删除",danger:!0}))try{const e=await fetch(`${h}/api/linkfox/tasks/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`);c.tasks=c.tasks.filter(a=>a.task_id!==t),v()}catch(e){d(`删除失败：${e.message}`)}}async function kt(t){try{await navigator.clipboard.writeText(t),d("已复制",!0)}catch{d("复制失败——请手动全选复制")}}function ha(t){const s=`商品：${t.name}（ASIN ${t.asin}）
关键词：${t.keyword}
机会指数：${t.score}/100（${t.grade}）
预估月销：${t.est_sales}${t.profit?`
毛利率：${t.profit.result.margin}%`:""}`;return{letter:`你是资深跨境电商选品顾问。根据下面的 Amazon 商品分析数据，写一封发给客户的中文开发信（首次触达）：简短问候 → 用数据点出这个品的机会 → 介绍我们能提供的服务（选品分析 / 供应链对接 / 利润测算）→ 给出明确的下一步行动。语气专业不油腻，300 字以内。

${s}`,follow:`你是资深跨境电商选品顾问。客户之前看过下面这个 Amazon 商品的分析报告但还没回复，写一封中文跟进邮件：礼貌唤起记忆 → 补充一个新角度的价值点（结合数据）→ 低压力地推动下一步。200 字以内，别催促感太重。

${s}`,pitch:`你是跨境电商运营专家。根据下面的 Amazon 商品分析数据，写一段发在客户群/朋友圈的中文新品推荐文案：一个抓人的开头 + 3 个数据支撑的卖点（用 emoji 分隔）+ 一句行动召唤。150 字以内。

${s}`}}function $a(t){c.copy={report:t,preset:"letter",prompts:ha(t),result:null},X()}function X(){const t=c.copy;if(!t)return;const s=[["letter","开发信（首次触达）"],["follow","跟进邮件"],["pitch","新品推荐文案"]],e=t.result?t.result.status===3?`<div class="sf-text-out">${i(t.result.content)}</div>
           <div class="m-actions"><button class="btn btn-primary btn-sm" data-action="lf-cw-copy">复制文案</button>
           <span class="sf-cost">本次消耗 ${t.result.count??"?"} 点</span></div>`:`<div class="sf-err">生成失败：${i(t.result.error||"平台未返回原因")}（失败不扣点）</div>`:'<div class="sf-hint-run">生成中，通常 10～30 秒……</div><div class="sf-text-out ghost">等待 LinkFoxAI 返回</div>';z(`
    <h3>AI 写话术 <span class="chip-soft">按 token 计费 · 最低 1 点</span></h3>
    <p class="dlg-text">已把报告数据（${i(t.report.name)}）拼进提示词，可直接改。</p>
    <div class="sf-cw-presets">${s.map(([a,n])=>`<button class="sf-fn mini ${t.preset===a?"on":""}" data-action="lf-cw-preset" data-id="${a}">${n}</button>`).join("")}
    </div>
    <div class="field">
      <label>提示词（可编辑）</label>
      <textarea id="lf-cw-prompt" class="input sf-ta" rows="7">${i(t.prompts[t.preset])}</textarea>
    </div>
    ${t.result?"":`<div class="m-actions dlg-actions">
      <button class="btn btn-ghost" data-action="close-modal">取消</button>
      <button class="btn btn-primary" data-action="lf-cw-submit" id="lf-cw-go">生成（约 1～5 点）</button>
    </div>`}
    <div class="m-label" style="margin-top:12px">生成结果</div>
    <div id="lf-cw-out">${e}</div>`)}async function ma(t){var a;const s=c.copy;if(!s)return;const e=(((a=document.getElementById("lf-cw-prompt"))==null?void 0:a.value)||"").trim();if(!e){d("提示词不能为空");return}j(t,!0,"提交中…");try{const n=await fetch(`${h}/api/linkfox/text`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e,model:"GEM_3_7_FLASH",note:`${s.report.name} 话术`})}),o=await n.json().catch(()=>({}));if(!n.ok)throw new Error(o.detail||`HTTP ${n.status}`);s.result={status:1},X(),ba(o.task_id)}catch(n){d(`提交失败：${n.message}`),j(t,!1)}}function ba(t){clearInterval(B),B=setInterval(async()=>{if(!document.getElementById("lf-cw-out")){clearInterval(B),B=null;return}try{const e=await fetch(`${h}/api/linkfox/text/${t}`,{method:"POST"});if(!e.ok)return;const a=await e.json();a.status===3?(clearInterval(B),B=null,c.copy.result={status:3,content:a.content,count:a.count},Ct=a.content,X(),V(!0)):a.status===4&&(clearInterval(B),B=null,c.copy.result={status:4,error:a.error},X())}catch{}},3e3)}const rt={"#/":{render:bt,page:"监控总览"},"#/workbench":{render:bt,page:"监控总览"},"#/radar":{render:rs,page:"关键词雷达"},"#/analyze":{render:Ps,page:"ASIN 分析"},"#/studio":{render:oa,page:"AI 作图工坊"},"#/profit":{render:Ws,page:"利润计算器"},"#/suppliers":{render:Xs,page:"供应商库"},"#/projects":{render:zs,page:"立项看板"}};function v(){const t=location.hash||"#/",s=rt[t]||rt["#/"];document.getElementById("app").innerHTML=`
    <div class="layout">
      ${Kt(rt[t]?t:"#/")}
      <div class="main">
        ${Zt(s.page)}
        <div class="content">${s.render()}${Wt()}</div>
      </div>
    </div>`}window.addEventListener("hashchange",v);document.addEventListener("click",t=>{var o;const s=t.target.closest("[data-action]");if(!s){t.target.classList&&t.target.classList.contains("modal-backdrop")&&U();return}const{action:e,id:a,dir:n}=s.dataset;switch(e){case"guide":Ns();break;case"close-modal":U();break;case"dialog-ok":{const r=document.getElementById("dlg-input");dt(r?r.value.trim().slice(0,200):!0);break}case"dialog-cancel":dt(null);break;case"add-keyword":It();break;case"kw-toggle":ps(a);break;case"collect-open":fs(k.keywords.find(r=>r.id===a));break;case"collect-submit":vs(a);break;case"del-keyword":us(a);break;case"kw-detail":Nt(a);break;case"brief-export":sa(a);break;case"open-analysis":js(a);break;case"parse-asin":_t();break;case"reset-asin":gs();break;case"fill-sample":bs();break;case"extract-paste":ys();break;case"apply-kw":ks();break;case"analyze-submit":Ts();break;case"del-analysis":Ms(a);break;case"export-pdf":Fs();break;case"copy-report":Hs();break;case"profit-open":gt(y);break;case"quick-profit":gt(null);break;case"profit-save":Us();break;case"project-add":Ks();break;case"project-move":Gs(a,n);break;case"project-note":Js(a);break;case"project-del":Zs(a);break;case"supplier-add":Vs();break;case"supplier-save":At();break;case"supplier-quote":wt(a,"quote","改报价","报价");break;case"supplier-note":wt(a,"note","供应商备注","备注");break;case"supplier-del":Ys(a);break;case"sf-set-fn":c.fn=a,v();break;case"sf-submit":pa(s);break;case"sf-pick-file":c.pickTarget=s.dataset.target||"imageUrl",(o=document.getElementById("sf-file"))==null||o.click();break;case"sf-refresh-plan":V(!0);break;case"sf-del-task":va(a);break;case"sf-refresh-img":fa(a,s);break;case"sf-copy-text":kt((c.tasks.find(r=>r.task_id===a)||{}).content||"");break;case"lf-copywriting":$a(S.find(r=>r.id===a)||y);break;case"lf-cw-preset":c.copy&&(c.copy.preset=a,X());break;case"lf-cw-submit":ma(s);break;case"lf-cw-copy":kt(Ct);break}});document.addEventListener("input",t=>{t.target.classList.contains("af-input")&&t.target.dataset.field&&(p[t.target.dataset.field]=t.target.value),t.target.classList.contains("sf-input")&&t.target.dataset.field&&(t.target.dataset.scope==="top"?c.imageUrl=t.target.value:c.params[t.target.dataset.field]=t.target.value),t.target.classList.contains("pf-input")&&ft(),t.target.id==="kw-input"&&(nt=t.target.value)});document.addEventListener("change",t=>{var e;if(t.target.id!=="sf-file"||!((e=t.target.files)!=null&&e.length))return;const s=document.querySelector(`[data-action="sf-pick-file"][data-target="${c.pickTarget}"]`);ua(t.target.files[0],c.pickTarget,s),t.target.value=""});document.addEventListener("keydown",t=>{var s;t.key==="Enter"&&t.target.id==="kw-input"&&It(),t.key==="Enter"&&t.target.id==="an-raw"&&_t(),t.key==="Enter"&&((s=t.target.dataset)==null?void 0:s.action)==="kw-detail"&&Nt(t.target.dataset.id),t.key==="Enter"&&t.target.id==="dlg-input"&&dt(t.target.value.trim().slice(0,200)),t.key==="Enter"&&t.target.id==="sp-name"&&At(),t.key==="Escape"&&U()});zt().then(v);
