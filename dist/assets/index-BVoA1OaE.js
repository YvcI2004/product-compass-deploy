(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&a(r)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();const At={name:"选品罗盘",type:"真数据工作空间"},y="";let f=!1;const _t=window.fetch.bind(window);let st=0;function dt(){var t;(t=document.getElementById("top-progress"))==null||t.classList.toggle("on",st>0)}window.fetch=(t,s={})=>(st++,dt(),_t(t,s).finally(()=>{st--,dt()}));let ft=At,g={keywords:[],events:[]},R=!0,x=[],z=!0,w=[],V=!0,T=[],U=!0,m=null;async function It(){try{const t=await fetch(`${y}/api/bootstrap`);if(!t.ok)throw new Error(`HTTP ${t.status}`);ft=(await t.json()).workspace,f=!0,console.log(`[选品罗盘] 已连接后端 ${y}`)}catch{console.log("[选品罗盘] 后端未启动，界面可浏览，数据功能需后端在线")}}async function ht(){if(!(!f||!R))try{const t=await fetch(`${y}/api/radar`);if(!t.ok)throw new Error(`HTTP ${t.status}`);g=await t.json(),R=!1,["#/","#/workbench","#/radar"].includes(location.hash||"#/")&&h()}catch{}}async function nt(){if(!(!f||!z))try{const t=await fetch(`${y}/api/analyses`);if(!t.ok)throw new Error(`HTTP ${t.status}`);x=(await t.json()).analyses||[],z=!1,["#/","#/workbench","#/analyze"].includes(location.hash||"#/")&&h()}catch{}}async function it(){if(!(!f||!V))try{const t=await fetch(`${y}/api/projects`);if(!t.ok)throw new Error(`HTTP ${t.status}`);w=(await t.json()).projects||[],V=!1,["#/","#/workbench","#/projects"].includes(location.hash||"#/")&&h()}catch{}}async function Et(){if(!(!f||!U))try{const t=await fetch(`${y}/api/suppliers`);if(!t.ok)throw new Error(`HTTP ${t.status}`);T=(await t.json()).suppliers||[],U=!1,(location.hash||"#/")==="#/suppliers"&&h()}catch{}}const O=t=>String(t).padStart(2,"0"),i=t=>String(t).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),L=t=>Number(t).toLocaleString("en-US"),q=t=>`#${Number(t).toLocaleString("en-US")}`,bt=t=>`$${t}`;function l(t,s=!1){var a;(a=document.getElementById("toast"))==null||a.remove();const e=document.createElement("div");e.id="toast",e.className=s?"ok":"",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.remove(),2600)}const Bt=`
  <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#ffffff" stroke="#e4e7ef"/>
    <circle cx="24" cy="24" r="14.5" fill="none" stroke="#2563eb" stroke-width="2.4" opacity=".92"/>
    <path d="M24 12.5 L27.4 24 L20.6 24 Z" fill="#2563eb"/>
    <path d="M24 35.5 L27.4 24 L20.6 24 Z" fill="#a7c3f7"/>
    <circle cx="24" cy="24" r="2.4" fill="#ffffff" stroke="#2563eb" stroke-width="1.6"/>
  </svg>`,Ct={workbench:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5"/><rect x="13.5" y="12" width="7.5" height="9" rx="1.5"/><rect x="3" y="16" width="7.5" height="5" rx="1.5"/></svg>',radar:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/><path d="M12 3v2.4M21 12h-2.4M12 21v-2.4M3 12h2.4"/></svg>',search:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.8 16.8 21 21"/></svg>',calc:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M8 7.5h8"/><path d="M8.6 15h2.6M8.6 18h2.6M14.2 13.4v5.2M11.6 16h5.2"/></svg>',box:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 21 7.8v8.4L12 21 3 16.2V7.8Z"/><path d="M3 7.8 12 12.6 21 7.8"/><path d="M12 12.6V21"/></svg>',board:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="4" width="4.6" height="16" rx="1.4"/><rect x="9.7" y="4" width="4.6" height="10.5" rx="1.4"/><rect x="15.9" y="4" width="4.6" height="13.5" rx="1.4"/></svg>'},Nt=[{hash:"#/",icon:"workbench",label:"监控总览",group:"总览"},{hash:"#/radar",icon:"radar",label:"关键词雷达",group:"调研分析",badge:()=>g.keywords.length},{hash:"#/analyze",icon:"search",label:"ASIN 分析",group:"调研分析",badge:()=>x.length},{hash:"#/profit",icon:"calc",label:"利润计算器",group:"测算与跟进"},{hash:"#/suppliers",icon:"box",label:"供应商库",group:"测算与跟进",badge:()=>T.length},{hash:"#/projects",icon:"board",label:"立项看板",group:"测算与跟进",badge:()=>w.filter(t=>t.stage!=="已放弃").length}];function Ft(t){let s="";const e=Nt.map(a=>{const n=a.group&&a.group!==s?`<div class="nav-label">${a.group}</div>`:"";return s=a.group,`${n}
    <a class="nav-item ${a.hash===t?"active":""}" href="${a.hash}">
      ${Ct[a.icon]}<span>${a.label}</span>
      ${a.badge&&a.badge()>0?`<span class="nav-badge">${O(a.badge())}</span>`:""}
    </a>`}).join("");return`
  <aside class="sidebar">
    <div class="logo-row">
      ${Bt}
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
  </aside>`}function Pt(t){return`
  <header class="topbar">
    <div class="crumb">${i(ft.type)} <span>/</span> <b>${i(t)}</b></div>
    <div class="top-right">
      <span class="top-chip"><span class="dot"></span>${f?"后端已连接":"后端离线"}</span>
      <button class="btn btn-ghost btn-sm" data-action="guide">使用指南</button>
    </div>
  </header>`}const Ht=()=>`
  <footer class="footer">
    <span>真实数据 · 半自动采集 · 全部存在本地</span>
    <span>选品罗盘 · 半自动选品工作台</span>
  </footer>`;function $t(t,s){if(!s)return'<span class="delta-chip new">新</span>';const e=t.score-s.score;return e>0?`<span class="delta-chip up">↑${e}</span>`:e<0?`<span class="delta-chip down">↓${Math.abs(e)}</span>`:'<span class="delta-chip flat">→</span>'}const X=["#2563eb","#5b8def","#8fb3f7","#1e40af","#64748b","#c9d6f0"];function mt(t,{h:s=210}={}){const a=s,n=36,o=12,r=14,d=24,p=t.filter(u=>u.points.length>=2);if(!p.length)return'<div class="chart-empty">完成第 2 轮采集后，这里出现趋势线。</div>';const k=Math.max(...p.map(u=>u.points.length)),S=p.flatMap(u=>u.points);let M=Math.min(...S),v=Math.max(...S);if(v-M<4){const u=(v+M)/2;M=u-2,v=u+2}const b=640-n-o,$=a-r-d,j=u=>n+u*b/(k-1),E=u=>r+$-(u-M)/(v-M)*$,Y=[0,.5,1].map(u=>{const _=r+$*u,G=Math.round(v-(v-M)*u);return`<line x1="${n}" y1="${_.toFixed(1)}" x2="${640-o}" y2="${_.toFixed(1)}" class="c-grid"/>
            <text x="${n-7}" y="${(_+3.5).toFixed(1)}" text-anchor="end" class="c-label">${G}</text>`}).join(""),J=[...new Set([0,Math.round((k-1)/2),k-1])].map(u=>`<text x="${j(u).toFixed(1)}" y="${a-6}" text-anchor="${u===0?"start":u===k-1?"end":"middle"}" class="c-label">第 ${u+1} 轮</text>`).join(""),B=p.map((u,_)=>{const G=u.color||X[_%X.length],Mt=u.points.map((Tt,Lt)=>`${j(Lt).toFixed(1)},${E(Tt).toFixed(1)}`).join(" "),ct=u.points[u.points.length-1];return`<polyline points="${Mt}" fill="none" stroke="${G}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="${j(u.points.length-1).toFixed(1)}" cy="${E(ct).toFixed(1)}" r="3.4" fill="${G}"><title>${i(u.name)} · 第 ${u.points.length} 轮 · ${ct} 分</title></circle>`}).join("");return`<svg viewBox="0 0 640 ${a}" class="chart" role="img">${Y}${B}${J}</svg>`}const Ot=t=>`
  <div class="chart-legend">${t.map(s=>`
    <span class="lg-item"><i style="background:${s.color}"></i>${i(s.name)}</span>`).join("")}
  </div>`;function Rt(t){const s=t.reduce((r,d)=>r+d.value,0);if(!s)return'<div class="chart-empty">还没有已评分的关键词。</div>';const e=54,a=2*Math.PI*e;let n=0;const o=t.map(r=>{const d=r.value/s,p=`<circle r="${e}" cx="70" cy="70" fill="none" stroke="${r.color}" stroke-width="15"
      stroke-dasharray="${Math.max(0,d*a-2).toFixed(1)} ${(a-Math.max(0,d*a-2)).toFixed(1)}"
      stroke-dashoffset="${(-n*a).toFixed(1)}" transform="rotate(-90 70 70)"/>`;return n+=d,p}).join("");return`
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
  </div>`}function zt(t,s=116){const a=2*Math.PI*52,n=Math.max(0,Math.min(100,t))/100,o=t>=75?"#2563eb":t>=55?"#7ea4f5":"#a3a8b8";return`
  <svg viewBox="0 0 140 140" class="gauge" style="width:${s}px;height:${s}px">
    <circle r="52" cx="70" cy="70" fill="none" stroke="#eef0f5" stroke-width="11"/>
    <circle r="52" cx="70" cy="70" fill="none" stroke="${o}" stroke-width="11" stroke-linecap="round"
      stroke-dasharray="${(n*a).toFixed(1)} ${a.toFixed(1)}" transform="rotate(-90 70 70)"/>
    <text x="70" y="72" text-anchor="middle" class="gg-score">${t}</text>
    <text x="70" y="90" text-anchor="middle" class="gg-label">机会指数</text>
  </svg>`}function qt(t,s=250){const o=t.length,r=(v,b)=>{const $=-Math.PI/2+v*2*Math.PI/o;return[130+Math.cos($)*72*b,108+Math.sin($)*72*b]},d=[.25,.5,.75,1].map(v=>`<polygon points="${t.map((b,$)=>r($,v).map(j=>j.toFixed(1)).join(",")).join(" ")}" class="rd-ring"/>`).join(""),p=t.map((v,b)=>{const[$,j]=r(b,1);return`<line x1="130" y1="108" x2="${$.toFixed(1)}" y2="${j.toFixed(1)}" class="rd-ring"/>`}).join(""),k=t.map((v,b)=>r(b,Math.max(.05,v.value)).map($=>$.toFixed(1)).join(",")).join(" "),S=t.map((v,b)=>{const[$,j]=r(b,Math.max(.05,v.value));return`<circle cx="${$.toFixed(1)}" cy="${j.toFixed(1)}" r="2.8" fill="#2563eb"><title>${i(v.label)} ${Math.round(v.value*100)}</title></circle>`}).join(""),M=t.map((v,b)=>{const[$,j]=r(b,1.26),E=Math.abs($-130)<8?"middle":$>130?"start":"end";return`<text x="${$.toFixed(1)}" y="${(j+3.5).toFixed(1)}" text-anchor="${E}" class="rd-label">${i(v.label)}</text>`}).join("");return`
  <svg viewBox="0 0 260 216" class="radar" style="width:${s}px" overflow="visible">
    ${d}${p}
    <polygon points="${k}" fill="rgba(37,99,235,.18)" stroke="#2563eb" stroke-width="2"/>
    ${S}${M}
  </svg>`}function Dt(){if(!w.length)return'<div class="empty slim">还没有立项项目——报告页「转为立项」后，这里显示跟进漏斗。</div>';const t=I.map(e=>({s:e,n:w.filter(a=>a.stage===e).length})),s=Math.max(1,...t.map(e=>e.n));return`
  <div class="funnel">
    ${t.map(e=>`
    <div class="fn-row">
      <span class="fn-label">${e.s}</span>
      <div class="fn-track"><div class="fn-bar ${e.s==="已放弃"?"dead":""}" style="width:${e.n?Math.max(8,e.n/s*100):0}%"></div></div>
      <b class="fn-n">${e.n}</b>
    </div>`).join("")}
  </div>`}const N=(t=3)=>`
  <div class="sk-card">${'<div class="sk-line"></div>'.repeat(t)}</div>`;function W(t,s,e){const a=Math.max(1,...e.map(n=>n.n));return`
  <div class="lens-card">
    <div class="lens-title">${t}<span>${s}</span></div>
    ${e.map(n=>`
    <div class="fn-row">
      <span class="fn-label">${n.label}</span>
      <div class="fn-track"><div class="fn-bar ${n.dim?"dead":""}" style="width:${n.n?Math.max(8,n.n/a*100):0}%"></div></div>
      <b class="fn-n">${n.n}</b>
    </div>`).join("")}
  </div>`}function Jt(t){if(!t.length)return"";const s=t.map(n=>n.cur),e=(n,o,r,d=!1)=>({label:r,n:s.filter(p=>p.price>=n&&p.price<o).length,dim:d}),a=(n,o)=>o.map(([r,d,p])=>({label:p,n:s.filter(k=>{const S=n(k);return S>=r&&S<d}).length}));return`
  <section class="section">
    <div class="sec-head">
      <h2>市场结构透视</h2>
      <span class="sec-sub">同一批监控词的四个角度 · 只统计最新一轮</span>
    </div>
    <div class="lens-grid">
      ${W("价格带","头部价格（美元）",[e(0,15,"15 以下 · 利润薄",!0),e(15,45,"15–45 · 黄金带"),e(45,80,"45–80 · 中高客单"),e(80,1e9,"80 以上 · 高客单")])}
      ${W("竞争梯度","搜索结果数",a(n=>n.results,[[0,1001,"1千以内 · 稀缺"],[1001,10001,"1千–1万 · 宽松"],[10001,100001,"1万–10万 · 一般"],[100001,1e12,"10万以上 · 红海"]]))}
      ${W("需求活跃度","最新评论距今",a(n=>n.days,[[0,4,"3天内 · 极活跃"],[4,15,"4–14天 · 活跃"],[15,31,"15–30天 · 转冷"],[31,1e9,"30天以上 · 休眠"]]))}
      ${W("排名梯度","头部大类排名",a(n=>n.bsr,[[0,1001,"1千以内 · 头部"],[1001,10001,"1千–1万 · 靠前"],[10001,50001,"1万–5万 · 中游"],[50001,1e12,"5万以上 · 长尾"]]))}
    </div>
  </section>`}function lt(){ht(),nt(),it();const t=g.keywords||[],s=t.filter(d=>d.rounds.length).map(d=>({k:d,cur:d.rounds[d.rounds.length-1],prev:d.rounds[d.rounds.length-2]||null})).sort((d,p)=>p.cur.score-d.cur.score),e=s.filter(d=>d.cur.grade_cls!=="g-c").length,a=t.reduce((d,p)=>d+p.rounds.length,0),n=w.filter(d=>d.stage!=="已放弃").length,o=t.length||x.length,r=f&&!o&&(R||z);return`
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
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':O(t.length)}</b><span>监控关键词</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':O(e)}</b><span>重点机会 A/B</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':O(a)}</b><span>累计采集轮次</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':O(x.length)}</b><span>ASIN 报告</span></div>
    <div class="sb-item"><b>${r?'<span class="sk-num"></span>':O(n)}</b><span>立项进行中</span></div>
  </div>

  ${o?"":Kt()}
  ${f?"":P()}

  <div class="dash">
    <div class="dash-main">
      <section class="chart-card">
        <div class="sec-head">
          <h2>机会指数趋势</h2>
          <span class="sec-sub">各关键词历史轮次得分 · 悬停圆点看数值</span>
        </div>
        ${r?N(5):Ut(s)}
      </section>

      ${s.length||r?`
      <section class="section">
        <div class="sec-head">
          <h2>类目机会排行</h2>
          <span class="sec-sub">点击任意一行，打开类目分析面板</span>
        </div>
        <div class="rank-list">${s.length?s.map(Gt).join(""):N(3)}</div>
      </section>`:""}

      ${s.length?Jt(s):""}

      <section class="section">
        <div class="sec-head">
          <h2>单品分析速览</h2>
          <span class="sec-sub">客户单品报告 · 点击回看</span>
        </div>
        <div class="recent-grid">${r?N(2):Zt()}</div>
      </section>
    </div>

    <div class="dash-side">
      <section class="chart-card">
        <div class="sec-head"><h2>评级分布</h2><span class="sec-sub">最新一轮</span></div>
        ${Rt([{label:"A 类 · 优先评估",value:s.filter(d=>d.cur.grade_cls==="g-a").length,color:"#2563eb"},{label:"B 类 · 跟进观察",value:s.filter(d=>d.cur.grade_cls==="g-b").length,color:"#8fb3f7"},{label:"C 类 · 暂缓投入",value:s.filter(d=>d.cur.grade_cls==="g-c").length,color:"#c9cdd9"}])}
      </section>

      <section class="chart-card">
        <div class="sec-head"><h2>立项漏斗</h2><a class="sec-sub" href="#/projects">进入看板 →</a></div>
        ${Dt()}
      </section>

      <section class="section">
        <div class="sec-head">
          <h2>市场信号</h2>
          <span class="sec-sub">差值引擎自动告知</span>
        </div>
        ${r?N(3):Wt()}
      </section>
    </div>
  </div>`}function Ut(t){const s=t.slice(0,6).map((a,n)=>({name:a.k.keyword,color:X[n%X.length],points:a.k.rounds.map(o=>o.score)})),e=s.filter(a=>a.points.length>=2);return e.length?mt(s)+Ot(e):'<div class="chart-empty">完成第 2 轮采集后，这里出现各关键词的机会指数趋势线。</div>'}function Kt(){return`
  <section class="an-card onboard">
    <b>开始第一轮监控（约 5 分钟）</b>
    <ol>
      <li>在「<b>关键词雷达</b>」添加关注的类目词（如 dog bed）</li>
      <li>到 amazon.com 搜索该词，打开第 1 名商品页，采集 5 个公开数据（约 2 分钟）</li>
      <li>提交采集——差值引擎自动评分；第 2 轮起自动对比涨跌、推送重点机会信号</li>
    </ol>
    <a class="btn btn-primary" href="#/radar">添加第一个关键词</a>
  </section>`}function P(){return`
  <div class="an-offline">
    <b>后端未启动。</b>数据功能需后端在线：在 <code>api</code> 目录运行
    <code>.venv\\Scripts\\python.exe -m uvicorn main:app --reload --port 8000</code>
    后刷新页面。<span>（历史数据都存在后端文件里，不会丢）</span>
  </div>`}function Gt(t,s){const{k:e,cur:a,prev:n}=t;return`
  <div class="rank-row" data-action="kw-detail" data-id="${e.id}" role="button" tabindex="0">
    <div class="rank-no">${s+1}</div>
    <div class="row-main">
      <div class="row-name">${i(e.keyword)}</div>
      <div class="row-meta">结果 ${L(a.results)} · 头部 BSR ${q(a.bsr)} · ${i(a.collected_at)}</div>
    </div>
    ${$t(a,n)}
    <span class="chip-soft ${a.grade_cls}">${i(a.grade.split(" · ")[0])}</span>
    <div class="score" title="机会指数">${a.score}</div>
    <span class="row-go">›</span>
  </div>`}function Wt(){const t=g.events||[];return t.length?`
  <div class="radar-feed">
    ${t.slice(0,6).map(s=>`
    <div class="rf-item">
      <span class="rf-dot"></span>
      <div>
        <div class="rf-text">${i(s.text)}</div>
        <div class="rf-time">${i(s.at)}</div>
      </div>
    </div>`).join("")}
  </div>`:'<div class="empty slim">完成第一轮采集后，变化动态会出现在这里（升降级、竞争加剧、需求走强…自动告知）。</div>'}function Zt(){return x.length?x.slice(0,3).map(t=>`
  <div class="recent-card" data-action="open-analysis" data-id="${t.id}">
    <div>
      <div class="rc-name">${i(t.name)}</div>
      <div class="rc-meta">ASIN ${i(t.asin)} · ${i(t.collected_at)}</div>
    </div>
    <div class="rc-right">
      <div class="score sm">${t.score}</div>
      <span class="chip-soft ${t.grade_cls}">${i(t.grade.split(" · ")[0])}</span>
    </div>
  </div>`).join(""):'<div class="empty slim">还没有 ASIN 分析——客户发来商品链接时，用「ASIN 分析」出可交付报告。</div>'}let at=null,Q="";function Vt(){ht(),nt();const t=g.keywords||[],s=t.filter(a=>!a.rounds.length),e=t.filter(a=>a.rounds.length).sort((a,n)=>n.rounds[n.rounds.length-1].score-a.rounds[a.rounds.length-1].score);return`
  <div class="page-head">
    <h1>关键词雷达</h1>
    <p>不定期采集你关注的类目词，差值引擎自动对比每一轮——机会指数涨跌、竞争变化、升降级告知全自动。</p>
  </div>
  ${f?"":P()}
  <div class="an-card">
    <div class="an-parse-row">
      <input id="kw-input" class="input grow" placeholder="输入要监控的类目关键词，如 dog bed / kitchen organizer…"
             value="${i(Q)}" autocomplete="off">
      <button class="btn btn-soft" data-action="add-keyword">＋ 添加监控</button>
    </div>
    <div class="f-hint" style="margin-top:8px">建议选「客户问得多 + 你有供应链优势」的词；先加 3–5 个跑起来，不定期采集即可。</div>
  </div>
  ${t.length?"":f&&R?`<section class="an-card">${N(4)}</section>`:'<div class="empty">还没有监控关键词——上面输入第一个，开始你的雷达。</div>'}
  ${[...s.map(Xt),...e.map(Qt)].join("")}`}function Xt(t){return`
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
  </section>`}function C(t,s,e,a,n){let o;if(e==null)o='<span class="rm-sub flat">首轮</span>';else{const r=s-e;if(!r)o=`<span class="rm-sub flat">→ 上轮 ${a(e)}</span>`;else{const d=n==="up"?r>0:n==="down"?r<0:null;o=`<span class="rm-sub ${d===null?"flat":d?"up":"down"}">${r>0?"↑":"↓"} 上轮 ${a(e)}</span>`}}return`
  <div class="rm">
    <div class="rm-label">${t}</div>
    <div class="rm-value">${a(s)}</div>
    ${o}
  </div>`}function Qt(t){const s=t.rounds[t.rounds.length-1],e=t.rounds[t.rounds.length-2]||null,a=at===t.id;return`
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
      ${$t(s,e)}
      <span class="rm-sub flat" style="margin-left:auto">头部预估月销 ${i(s.est_sales)}</span>
    </div>
    <div class="kcard-metrics">
      ${C("搜索结果",s.results,e==null?void 0:e.results,L,"down")}
      ${C("头部 BSR",s.bsr,e==null?void 0:e.bsr,q,"down")}
      ${C("头部评论",s.reviews,e==null?void 0:e.reviews,L,"up")}
      ${C("头部价格",s.price,e==null?void 0:e.price,bt,null)}
    </div>
    <div class="kcard-reason">${s.reason_lines.map(i).join("<br>")}</div>
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="collect-open" data-id="${t.id}">本轮采集</button>
      <button class="btn btn-ghost" data-action="kw-detail" data-id="${t.id}">分析面板</button>
      <button class="btn btn-ghost" data-action="kw-toggle" data-id="${t.id}">${a?"收起历史":`历史 ${t.rounds.length} 轮`}</button>
      <button class="btn btn-ghost" data-action="brief-export" data-id="${t.id}">简报 PDF</button>
    </div>
    ${a?Yt(t):""}
  </section>`}function Yt(t){const s=[...t.rounds].reverse();return`
  <table class="an-table kw-history">
    <thead><tr><th>采集时间</th><th>轮次</th><th>指数</th><th>Δ</th><th>结果数</th><th>BSR</th><th>评论</th><th>价格</th><th>评论距今</th></tr></thead>
    <tbody>
      ${s.map((e,a)=>{const n=s[a+1],o=n?e.score-n.score:null;return`
        <tr>
          <td class="agt-time">${i(e.collected_at)}</td>
          <td>第 ${e.round_no} 轮</td>
          <td><b>${e.score}</b></td>
          <td>${o===null?'<span class="rm-sub flat">—</span>':`<span class="rm-sub ${o>0?"up":o<0?"down":"flat"}">${o>0?"↑"+o:o<0?"↓"+Math.abs(o):"→"}</span>`}</td>
          <td>${L(e.results)}</td>
          <td>${q(e.bsr)}</td>
          <td>${L(e.reviews)}</td>
          <td>$${e.price}</td>
          <td>${e.days} 天</td>
        </tr>`}).join("")}
    </tbody>
  </table>`}async function gt(){var s;if(!f){l("需要后端在线——启动方法见页面提示");return}const t=Q.trim()||(((s=document.getElementById("kw-input"))==null?void 0:s.value)||"").trim();if(!t){l("先输入一个关键词，比如 dog bed");return}try{const e=await fetch(`${y}/api/radar/keyword`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword:t})}),a=await e.json();if(!e.ok){l(`⚠️ ${a.detail||"添加失败"}`);return}g.keywords.push(a),g.events.unshift({at:a.created_at,kw:a.keyword,text:`新增监控关键词「${a.keyword}」——去 Amazon 搜索并完成第 1 轮采集`}),R=!1,Q="",h()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}function ts(t){at=at===t?null:t,h()}async function ss(t){const s=g.keywords.find(a=>a.id===t);if(!(!s||!await K({title:`删除「${s.keyword}」？`,text:"它的全部采集轮次与动态会一起删除，删除后不可恢复。",ok:"删除",danger:!0}))){try{const a=await fetch(`${y}/api/radar/keyword/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}g.keywords=g.keywords.filter(a=>a.id!==t),g.events=g.events.filter(a=>a.kw!==s.keyword),h()}}function as(t){const s=[["c-results","搜索结果数",`搜「${t.keyword}」后左上角「X results」`],["c-bsr","头部 BSR 排名","第 1 名商品页「Best Sellers Rank」第一行数字"],["c-reviews","头部评论数","第 1 名星级旁 ratings 数量"],["c-price","头部价格（美元）","第 1 名当前售价"],["c-days","头部最新评论距今天数","第 1 名评论区第一条日期距今天数（今天 = 0）"]];D(`
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
    <div class="m-note">每一轮都留档不覆盖——回看趋势全靠历史轮次。</div>`)}async function es(t){if(!f){l("需要后端在线");return}const s=a=>{var n;return(((n=document.getElementById(a))==null?void 0:n.value)||"").trim()},e=document.querySelector('[data-action="collect-submit"]');A(e,!0,"提交中…");try{const a=await fetch(`${y}/api/radar/collect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword_id:t,results:s("c-results"),bsr:s("c-bsr"),reviews:s("c-reviews"),price:s("c-price"),days:s("c-days")})}),n=await a.json();if(!a.ok){l(`⚠️ ${n.detail||"提交失败"}`);return}const o=g.keywords.findIndex(r=>r.id===t);o>=0&&(g.keywords[o]=n.keyword),g.events=n.delta_events.map(r=>({at:n.round.collected_at,kw:n.keyword.keyword,text:r})).concat(g.events),R=!1,H(),l(`✅ 第 ${n.round.round_no} 轮已入库：机会指数 ${n.round.score}`,!0),h()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{A(e,!1)}}const ns=/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i,is=/^[A-Z0-9]{10}$/i;let Z=!1,c={raw:"",asin:null,source:"",parseError:"",name:"",keyword:"",price:"",rating:"",reviews:"",bsr:"",results:"",days:"",paste:"",extractMeta:null,bsrCategory:""};const yt=["name","price","rating","reviews","bsr","results","days"],os=[{key:"name",label:"商品名称",ph:"复制商品页标题（可只留核心部分）",hint:"商品页顶部的商品标题"},{key:"keyword",label:"搜索关键词",ph:"dog bed for large dogs",hint:"你在 Amazon 搜索框用的词——多个 ASIN 按它归成一类对比"},{key:"price",label:"价格（美元）",ph:"29.99",hint:"商品页当前售价（不看划线价）"},{key:"rating",label:"评分",ph:"4.4",hint:"星级分数，如 4.4"},{key:"reviews",label:"评论总数",ph:"2310",hint:"星级旁 ratings 数量，去逗号：2,310 → 2310"},{key:"bsr",label:"大类 BSR 排名",ph:"1560",hint:"商品信息区「Best Sellers Rank」第一行：#1,560 in Pet Supplies → 填 1560"},{key:"results",label:"搜索结果数",ph:"5000",hint:"用上面的关键词搜索后，左上角「5,000 results」→ 填 5000"},{key:"days",label:"最新评论距今天数",ph:"今天 = 0，昨天 = 1",hint:"评论区第一条的日期（Reviewed … on October 8, 2026）距今几天；评论数为 0 可不填"}];function wt(){var n;const t=(((n=document.getElementById("an-raw"))==null?void 0:n.value)||c.raw||"").trim();c.raw=t,c.parseError="";const s=ns.exec(t),e=is.test(t.toUpperCase())?t.toUpperCase():null,a=s?s[1].toUpperCase():e;a?(c.asin=a,c.source=s?"识别自链接":"手动输入"):(c.asin=null,c.parseError=/amzn\.to/i.test(t)?"amzn.to 短链请先在浏览器打开，再复制地址栏的完整链接":"没识别到 ASIN：需要完整链接（含 /dp/B0… 部分）或 10 位 ASIN"),h()}function rs(){c={...c,raw:"https://www.amazon.com/dp/B0TEST0001",asin:"B0TEST0001",source:"示例数据",parseError:"",name:"示例 · 大型犬高支撑可拆洗宠物床",keyword:"dog bed for large dogs",price:"39.99",rating:"4.3",reviews:"2310",bsr:"1560",results:"5000",days:"1",extractMeta:null,bsrCategory:""},h()}function cs(){c.asin=null,c.source="",c.parseError="",h()}async function ds(){const t=(c.paste||"").trim();if(!t){l("先把商品页文字粘贴到框里（Ctrl+A → Ctrl+C → 粘贴）");return}if(!f){l("自动提取需要后端在线——启动方法见页面顶部提示");return}const s=document.querySelector('[data-action="extract-paste"]');A(s,!0,"提取中…");try{const e=await fetch(`${y}/api/extract`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t})}),a=await e.json();if(!e.ok){l(`⚠️ ${a.detail||"提取失败"}`);return}ls(a)}catch{l("⚠️ 连不上后端，请确认后端还在运行")}finally{Z=!1,A(s,!1)}}function ls(t){const s={found:t.found||[],warnings:t.warnings||[],filled:[],at:new Date().toLocaleTimeString()};t.asin&&!c.asin&&(c.raw=t.asin,c.asin=t.asin,c.source="整页粘贴识别",c.parseError=""),yt.forEach(e=>{var n;const a=(n=t.fields)==null?void 0:n[e];a&&a.value!==""&&a.value!=null&&String(c[e]??"").trim()===""&&(c[e]=String(a.value),s.filled.push(e))}),c.bsrCategory=t.bsr_category||"",c.extractMeta=s,h(),s.filled.length?l(`✅ 已预填 ${s.filled.length} 项（绿色标记），瞄一眼改漏的`,!0):l("⚠️ 没提取到新数字——请手动填写，或检查粘贴的是不是商品页")}function ps(){c.bsrCategory&&!String(c.keyword||"").trim()&&(c.keyword=c.bsrCategory,h())}function us(){const t=c.extractMeta;if(!t)return"";const s=c.bsrCategory&&!String(c.keyword||"").trim()?`<button class="chip-x kw" data-action="apply-kw" title="BSR 类目词，点击填入">类目词建议：${i(c.bsrCategory)}</button>`:"";return`
  <div class="an-extract-meta">
    <span class="chip-x ${t.filled.length?"hit":"miss"}">${t.at} 提取 ${t.found.length} 项 · 预填 ${t.filled.length} 项</span>
    ${s}
    ${t.warnings.map(e=>`<span class="an-extract-warn">⚠️ ${i(e)}</span>`).join("")}
  </div>`}function vs(t){const s=c.extractMeta;return s?s.filled.includes(t)?'<span class="chip-x hit">提取</span>':yt.includes(t)?'<span class="chip-x miss">未提取</span>':"":""}async function fs(){if(Z)return;if(!f){l("ASIN 分析需要后端在线——启动方法见页面顶部提示");return}if(!c.asin){l("先在第 1 步解析出 ASIN");return}Z=!0;const t=document.querySelector('[data-action="analyze-submit"]');A(t,!0,"分析中…");try{const s=await fetch(`${y}/api/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({link:c.raw,name:c.name,keyword:c.keyword,price:c.price,rating:c.rating,reviews:c.reviews,bsr:c.bsr,results:c.results,days:c.days})}),e=await s.json();if(!s.ok){l(`⚠️ ${e.detail||"分析失败"}`);return}m=e,x.unshift(e),z=!1,h(),setTimeout(()=>{var a;return(a=document.getElementById("an-report"))==null?void 0:a.scrollIntoView({behavior:"smooth"})},80)}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{Z=!1,A(t,!1)}}function hs(t){const s=x.find(e=>e.id===t);s&&(m=s,H(),(location.hash||"#/")!=="#/analyze"?location.hash="#/analyze":h(),setTimeout(()=>{var e;return(e=document.getElementById("an-report"))==null?void 0:e.scrollIntoView({behavior:"smooth"})},120))}async function bs(t){if(await K({title:"删除这条分析记录？",text:"报告与利润测算存档会一起删除，历史不可恢复。",ok:"删除",danger:!0})){try{const e=await fetch(`${y}/api/analyses/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}x=x.filter(e=>e.id!==t),(m==null?void 0:m.id)===t&&(m=null),h()}}function $s(t){if(t.confidence==null)return"";const s=t.confidence_level||"—",e=t.confidence>=90?"hi":t.confidence>=75?"mid":t.confidence>=60?"low":"min",a=(t.confidence_hints||[]).join("；");return`<span class="anr-conf ${e}" ${a?`title="${i(a)}"`:""}>置信度 ${t.confidence} · ${i(s)}${(t.inferred||[]).length?` · ${t.inferred.length} 项推补`:""}</span>`}function ms(t){const s=t.flags||[];if(!s.length)return"";const e={risk:"⛔",warn:"⚠️",info:"ℹ️"};return`
  <div class="m-label">风险旗标</div>
  <div class="anr-flags">
    ${s.map(a=>`<div class="anr-flag lv-${a.level}"><span class="fi">${e[a.level]||"•"}</span>${i(a.text)}</div>`).join("")}
  </div>`}function gs(t){const s=t.advice||[];return s.length?`
  <div class="m-label">行动建议</div>
  <ol class="anr-advice">
    ${s.map(e=>`<li>${i(e)}</li>`).join("")}
  </ol>`:""}function ys(t){return`
  <div id="an-report" class="an-report">
    <div class="anr-top">
      <div>
        <div class="anr-name">${i(t.name)}</div>
        <div class="meta-row">
          <span class="pm pm-amazon">a</span><span>ASIN ${i(t.asin)}</span>·
          <span>关键词「${i(t.keyword)}」</span>
          <span class="chip-soft">${i(t.collected_at)} 采集</span>
          ${$s(t)}
        </div>
      </div>
      <div class="anr-score-wrap">
        <div class="score big">${t.score}<small>/100</small></div>
        <span class="anr-grade ${t.grade_cls}">${i(t.grade)}</span>
      </div>
    </div>
    <div class="anr-est">预估月销 <b>${i(t.est_sales)}</b><small>${i(t.est_sales_note)}</small></div>
    <div class="anr-visual">
      <div class="anr-radar">${qt(t.dimensions)}</div>
      <div class="anr-dims">
        ${t.dimensions.map(s=>`
        <div class="dim">
          <div class="dim-head"><span>${i(s.label)}</span><span class="dim-val">${Math.round(s.value*100)}</span></div>
          <div class="dim-bar"><i style="width:${Math.min(100,Math.round(s.value*100))}%"></i></div>
          <div class="dim-text">${i(s.text)}</div>
        </div>`).join("")}
      </div>
    </div>
    ${ms(t)}
    <div class="m-label">判断依据</div>
    <div class="anr-reason">${t.reason_lines.map(i).join("<br>")}</div>
    ${gs(t)}
    <div class="anr-risk">⚠️ ${i(t.risk)}</div>
    ${t.profit?As(t.profit):""}
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="profit-open">利润测算${t.profit?"（修改）":""}</button>
      ${Ls(t.id)?'<span class="chip-soft" title="已在立项看板">已立项</span>':'<button class="btn btn-ghost" data-action="project-add">转为立项</button>'}
      <button class="btn btn-ghost" data-action="copy-report">复制报告文本</button>
      <button class="btn btn-ghost" data-action="export-pdf" title="备用：浏览器打印另存为 PDF">导出 PDF</button>
    </div>
  </div>`}function ws(){if(!f)return'<div class="empty slim">历史记录需要后端在线。</div>';if(!x.length)return f&&z?N(4):'<div class="empty slim">还没有分析记录——完成第 1、2 步就会出现第一份报告。</div>';const t=new Map;return x.forEach(s=>{t.has(s.keyword)||t.set(s.keyword,[]),t.get(s.keyword).push(s)}),[...t.entries()].map(([s,e])=>`
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
  </div>`).join("")}function ks(){return nt(),it(),`
  <div class="page-head">
    <h1>ASIN 分析 <span class="an-live-chip">真实数据</span></h1>
    <p>粘贴 Amazon 美国站商品链接或 ASIN，按采集清单抄 6 个公开数字，生成可导出 PDF 的选品分析报告。</p>
  </div>
  ${f?"":P()}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">1</span>
      <div class="an-step-title"><b>输入商品</b><span>支持完整链接（含 /dp/B0… 部分）或直接输入 10 位 ASIN</span></div>
    </div>
    <div class="an-parse-row">
      <input id="an-raw" class="input af-input grow" data-field="raw" autocomplete="off"
             placeholder="https://www.amazon.com/dp/B0… 或 B0ABCDEFGHI"
             value="${i(c.raw)}" ${c.asin?"disabled":""}>
      ${c.asin?`<span class="an-asin-ok">ASIN ${i(c.asin)}（${i(c.source)}）</span>
           <button class="btn btn-ghost" data-action="reset-asin">重新输入</button>`:'<button class="btn btn-soft" data-action="parse-asin">解析</button>'}
    </div>
    ${c.parseError?`<div class="an-err">⚠️ ${i(c.parseError)}</div>`:""}
    <div class="an-paste">
      <div class="an-paste-label">
        <b>省事通道 · 整页粘贴</b>
        <span>打开 amazon.com 商品页 → Ctrl+A 全选 → Ctrl+C 复制 → 粘贴到这里 → 点「自动提取」。识别 ASIN + 预填全部数字，绿的已填、琥珀的没认出来再手补。粘贴内容只用于提取，不保存。</span>
      </div>
      <textarea class="input af-input an-paste-ta" data-field="paste" rows="3"
        placeholder="商品页整页文字粘到这里（也认搜索页——只提取结果数）">${i(c.paste)}</textarea>
      <div class="an-paste-row">
        <button class="btn btn-soft" data-action="extract-paste">自动提取</button>
        ${us()}
      </div>
    </div>
  </section>
  ${c.asin?`
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">2</span>
      <div class="an-step-title"><b>核对采集清单 —— 数字不全也没关系</b><span>提取值会自动带进来；缺的数系统按中性市场推补继续算，报告挂「置信度」如实打折</span></div>
      <button class="btn btn-ghost btn-sm" data-action="fill-sample">填入示例数据</button>
    </div>
    <div class="an-grid">
      ${os.map(t=>`
      <div class="field">
        <label>${t.label} ${vs(t.key)}</label>
        <input class="input af-input" data-field="${t.key}" placeholder="${i(t.ph)}" value="${i(c[t.key]??"")}">
        <div class="f-hint">${t.hint}</div>
      </div>`).join("")}
    </div>
    <div class="an-actions">
      <button class="btn btn-primary" data-action="analyze-submit">开始分析</button>
      <span class="an-tip">公式与关键词雷达同一套透明世界观，参数在 api/analyzer.py 可调</span>
    </div>
  </section>`:`
  <div class="empty slim">解析出 ASIN 后，这里会出现采集清单。</div>`}
  ${m?`
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">3</span>
      <div class="an-step-title"><b>分析报告</b><span>可导出 PDF 或复制文本直接发给客户</span></div>
    </div>
    ${ys(m)}
  </section>`:""}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">4</span>
      <div class="an-step-title"><b>历史与类目对比</b><span>同一关键词下的多个 ASIN 自动归成一类，按机会指数排序</span></div>
    </div>
    ${ws()}
  </section>`}function D(t){document.getElementById("modal-root").innerHTML=`
    <div class="modal-backdrop">
      <div class="modal">${t}</div>
    </div>`}function H(){if(document.getElementById("modal-root").innerHTML="",F){const t=F;F=null,t(null)}}let F=null;function K({title:t,text:s,ok:e="确定",danger:a=!1}){return new Promise(n=>{var o;F=n,D(`
      <div class="dlg">
        <h3>${i(t)}</h3>
        <p class="dlg-text">${i(s)}</p>
        <div class="m-actions dlg-actions">
          <button class="btn btn-ghost" data-action="dialog-cancel">取消</button>
          <button class="btn ${a?"btn-danger":"btn-primary"}" data-action="dialog-ok" id="dlg-ok">${i(e)}</button>
        </div>
      </div>`),(o=document.getElementById("dlg-ok"))==null||o.focus()})}function kt({title:t,text:s,label:e,value:a="",ok:n="保存"}){return new Promise(o=>{F=o,D(`
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
      </div>`);const r=document.getElementById("dlg-input");r==null||r.focus(),r==null||r.select()})}function et(t){const s=F;F=null,document.getElementById("modal-root").innerHTML="",s&&s(t)}function A(t,s,e="处理中…"){t&&(s?(t.dataset.label=t.textContent,t.textContent=e,t.classList.add("is-loading")):(t.textContent=t.dataset.label||t.textContent,t.classList.remove("is-loading")))}function xs(){D(`
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
    <div class="m-note">全部数据为人工采集，存储在本地后端（api/pipeline/generated），不连接任何平台、不上传云端。</div>`)}function js(t){return`
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
  </div>`}function Ss(){m&&(document.getElementById("print-area").innerHTML=js(m),window.print())}function Ms(t){const s=a=>"▮".repeat(Math.round(a*10)).padEnd(10,"▯"),e=["📊 选品分析报告 · 选品罗盘",`商品：${t.name}`,`ASIN：${t.asin}（amazon.com）`,`关键词：${t.keyword}`,`采集时间：${t.collected_at}`,"",`机会指数：${t.score} / 100 —— ${t.grade}`,`预估月销：${t.est_sales}`];return t.confidence!=null&&e.push(`数据置信度：${t.confidence}/100（${t.confidence_level}）${(t.inferred||[]).length?` · 推补 ${(t.inferred||[]).length} 项`:""}`),e.push("","五维评估：",...t.dimensions.map(a=>`· ${a.label} ${s(a.value)} ${Math.round(a.value*100)} —— ${a.text}`)),(t.flags||[]).length&&e.push("","风险旗标：",...(t.flags||[]).map(a=>`· ${a.text}`)),e.push("","判断依据：",...t.reason_lines.map(a=>`· ${a}`)),(t.advice||[]).length&&e.push("","行动建议：",...(t.advice||[]).map(a=>`· ${a}`)),e.push("",`⚠️ ${t.risk}`,"—— 选品罗盘 生成"),e.join(`
`)}async function Ts(){if(!m)return;const t=Ms(m);try{await navigator.clipboard.writeText(t),l("✅ 报告文本已复制，可直接粘贴给客户",!0)}catch{const s=document.createElement("textarea");s.value=t,document.body.appendChild(s),s.select();try{document.execCommand("copy"),l("✅ 报告文本已复制",!0)}catch{l("⚠️ 复制失败，请手动选中报告内容复制")}s.remove()}}const Ls=t=>w.some(s=>s.analysis_id===t);function As(t){const s=t.result;return`
  <div class="profit-strip ${s.verdict_cls}">
    <b>利润测算</b>
    <span>毛利率 <b>${s.margin}%</b></span>
    <span>单件毛利 $${s.profit_per}</span>
    ${s.monthly_profit!=null?`<span>月利润 <b>$${Math.round(s.monthly_profit).toLocaleString("en-US")}</b></span>`:""}
    <span class="pv">${i(s.verdict)}</span>
  </div>`}function pt(t){var r;const s=(t==null?void 0:t.input)||{},e=((r=t==null?void 0:t.profit)==null?void 0:r.inputs)||{},a=(t==null?void 0:t.est_sales)||"",n=((t==null?void 0:t.inferred)||[]).includes("price"),o=[["pf-price","售价（美元）",e.price??s.price??"",n?"⚠️ 带入的是推补价格（$12.99 中性假设）——请先在商品页核实真实售价":"默认带入商品售价"],["pf-purchase","采购成本/件",e.purchase??"","供应商报价 + 国内运费"],["pf-inbound","头程物流/件",e.inbound??"","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费/件",e.fba??"","按尺寸重量，用亚马逊物流计算器查"],["pf-other","其他成本/件",e.other??0,"包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率 %",e.ref_pct??15,"大部分类目 15%"],["pf-monthly","预估月销量",e.monthly??"",a?`报告预估：${a}`:"填写后估算月利润"]];D(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>${t?`利润测算 · ${i(t.name)}`:"快速利润测算"}</h3>
    <p class="m-sub">FBA 毛利模型：售价 − 佣金 − FBA − 采购 − 头程 − 其他。改动任一数字，下方实时重算。</p>
    <div class="an-grid">
      ${o.map(([d,p,k,S])=>`
      <div class="field">
        <label>${p}</label>
        <input id="${d}" class="input pf-input" value="${i(String(k??""))}" placeholder="0" autocomplete="off">
        <div class="f-hint">${i(S)}</div>
      </div>`).join("")}
    </div>
    <div id="pf-result" class="pf-result"></div>
    <div class="m-actions">
      ${t?'<button class="btn btn-primary" data-action="profit-save">存入报告</button>':""}
      <button class="btn btn-ghost" data-action="close-modal">关闭</button>
    </div>
    ${t?'<div class="m-note">测算结果随报告存档，自动同步到类目简报；已立项的项目会更新看板毛利率。</div>':'<div class="m-note">快速测算不保存；需要在报告里留档时，请从 ASIN 分析报告页进入。</div>'}`),ot()}function ot(){const t=document.getElementById("pf-result");if(!t)return;const s=B=>{var u;return parseFloat(String(((u=document.getElementById(B))==null?void 0:u.value)||"").replace(/,/g,""))},e=s("pf-price"),a=s("pf-purchase"),n=s("pf-inbound"),o=s("pf-fba"),r=Number.isFinite(s("pf-other"))?s("pf-other"):0,d=s("pf-ref_pct")||15,p=s("pf-monthly")||0;if(!([e,a,n,o].every(Number.isFinite)&&e>0)){t.innerHTML=`
      <div class="pf-tiles">
        <div class="pf-tile"><span>单件毛利</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>毛利率</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>保本售价</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>月利润</span><b class="mut">—</b></div>
      </div>
      <div class="pf-verdict muted">填完上方 售价 / 采购 / 头程 / FBA 四项，这里实时出结果</div>`;return}const S=e*d/100,M=a+n+o+r,v=e-M-S,b=v/e*100,$=d<100?M/(1-d/100):null,j=p>0?v*p:null,E=b>=30?"up":b>=20?"flat":"down",Y=b>=30?`毛利率 ${b.toFixed(0)}%，达到优秀线（≥30%），值得推进`:b>=20?`毛利率 ${b.toFixed(0)}%，可做，需控制物流与推广成本`:`毛利率 ${b.toFixed(0)}%，低于红线 20%，建议重新谈价、换头程方案或提高售价`,J=[["佣金",S,"#8fb3f7"],["FBA",o,"#5b8def"],["采购",a,"#2563eb"],["头程",n,"#1e40af"],["其他",r,"#a8b2c3"]].filter(B=>B[1]>.004);v>0&&J.push(["毛利",v,"#1f9d61"]),t.innerHTML=`
    <div class="pf-tiles">
      <div class="pf-tile"><span>单件毛利</span><b class="${E}">$${v.toFixed(2)}</b></div>
      <div class="pf-tile"><span>毛利率</span><b class="${E}">${b.toFixed(1)}%</b></div>
      <div class="pf-tile"><span>保本售价</span><b>${$!=null?`$${$.toFixed(2)}`:"—"}</b></div>
      <div class="pf-tile"><span>月利润</span><b>${j!=null?`$${Math.round(j).toLocaleString("en-US")}`:"—"}</b></div>
    </div>
    <div class="pf-verdict ${E}">${Y}</div>
    <div class="pf-costbar">
      <div class="pf-bar">${J.map(([B,u,_])=>`<i style="width:${Math.max(0,Math.min(100,u/e*100)).toFixed(1)}%;background:${_}"></i>`).join("")}</div>
      <div class="pf-costlegend">${J.map(([B,u,_])=>`<em><i style="background:${_}"></i>${B} $${u.toFixed(2)}</em>`).join("")}</div>
    </div>`}async function _s(){if(!m||!f){l("需要后端在线");return}const t=e=>{var a;return(((a=document.getElementById(e))==null?void 0:a.value)||"").trim()},s=document.querySelector('[data-action="profit-save"]');A(s,!0,"保存中…");try{const e=await fetch(`${y}/api/analyses/${m.id}/profit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({price:t("pf-price"),purchase:t("pf-purchase"),inbound:t("pf-inbound"),fba:t("pf-fba"),other:t("pf-other"),ref_pct:t("pf-ref_pct"),monthly:t("pf-monthly")})}),a=await e.json();if(!e.ok){l(`⚠️ ${a.detail||"保存失败"}`);return}const n=x.findIndex(r=>r.id===a.id);n>=0&&(x[n]=a),(m==null?void 0:m.id)===a.id&&(m=a),z=!1,H(),l("✅ 利润测算已存入报告",!0);const o=w.find(r=>r.analysis_id===a.id);o?rt(o.id,{margin:a.profit.result.margin}):h()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{A(s,!1)}}const I=["待评估","测算中","已立项","样品中","已放弃"];function Is(){return it(),w.length?`
  <div class="page-head">
    <h1>立项看板</h1>
    <p>共 ${w.length} 个项目 · 阶段推进与备注随手记，跟进进度一目了然。</p>
  </div>
  ${f?"":P()}
  <div class="pj-board">
    ${I.map(t=>Es(t,w.filter(s=>s.stage===t))).join("")}
  </div>`:`
    <div class="page-head">
      <h1>立项看板</h1>
      <p>从 ASIN 分析转入的跟进项目——测算利润、推进样品，每个机会都不跟丢。</p>
    </div>
    ${f?"":P()}
    <div class="empty">看板还是空的——在「ASIN 分析」的报告页点「转为立项」，通过验证的机会会出现在这里。</div>
    <section class="an-card onboard">
      <b>这一环怎么用</b>
      <ol>
        <li>雷达发现类目机会，用「ASIN 分析」验证具体单品</li>
        <li>报告页点「转为立项」，项目以「待评估」进入看板</li>
        <li>完成利润测算 → 用 ← / → 推进阶段，随时点「备注」记录供应商与报价</li>
      </ol>
      <a class="btn btn-primary" href="#/analyze">去 ASIN 分析</a>
    </section>`}function Es(t,s){return`
  <div class="pj-col ${t==="已放弃"?"dead":""}">
    <div class="pj-col-head">${t}<span>${s.length}</span></div>
    ${s.map(Bs).join("")||'<div class="pj-empty">暂无项目</div>'}
  </div>`}function Bs(t){const s=I.indexOf(t.stage),e=s>0?I[s-1]:null,a=s>=0&&s<I.length-1?I[s+1]:null,n=t.margin!=null?`<span class="rm-sub ${t.margin>=30?"up":t.margin>=20?"flat":"down"}">毛利 ${t.margin}%</span>`:'<button class="pj-mini" data-action="quick-profit" title="还没测算过利润">未测算</button>';return`
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
  </div>`}async function rt(t,s){try{const e=await fetch(`${y}/api/projects/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),a=await e.json();if(!e.ok)return l(`⚠️ ${a.detail||"更新失败"}`),null;const n=w.findIndex(o=>o.id===t);return n>=0&&(w[n]=a),V=!1,h(),a}catch{return l("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function Cs(t,s){const e=w.find(d=>d.id===t);if(!e)return;const n=I.indexOf(e.stage)+(s==="next"?1:-1);if(n<0||n>=I.length)return;const o=I[n];if(o==="已放弃"&&!await K({title:"标记为「已放弃」？",text:"不会删除记录，也不影响 ASIN 分析；之后可用 ← 按钮退回上一阶段。",ok:"确认放弃"}))return;await rt(t,{stage:o})&&l(`已移到「${o}」`,!0)}async function Ns(t){const s=w.find(a=>a.id===t);if(!s)return;const e=await kt({title:"项目备注",text:"记录供应商、报价、样品进度……随时可改。",label:"备注（200 字内）",value:s.note||""});e!==null&&rt(t,{note:e})}async function Fs(){if(!m||!f){l("需要后端在线");return}try{const t=await fetch(`${y}/api/projects`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysis_id:m.id})}),s=await t.json();if(!t.ok){l(`⚠️ ${s.detail||"转入失败"}`);return}w.unshift(s),V=!1,h(),l("✅ 已转入立项看板（待评估）",!0)}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}async function Ps(t){const s=w.find(a=>a.id===t);if(!(!s||!await K({title:`从看板删除「${s.name}」？`,text:"只删除看板卡片，不影响 ASIN 分析记录。",ok:"删除",danger:!0}))){try{const a=await fetch(`${y}/api/projects/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}w=w.filter(a=>a.id!==t),h()}}function Hs(){const t=[["pf-price","售价","$","目标卖价，如 29.99"],["pf-purchase","采购成本","$/件","供应商报价 + 国内运费"],["pf-inbound","头程物流","$/件","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费","$/件","按尺寸重量，用亚马逊物流计算器查"]],s=[["pf-other","其他成本","$/件","包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率","%","大部分类目 15"],["pf-monthly","预估月销量","件","填了多一行月利润"]];return setTimeout(ot,0),`
  <div class="page-head">
    <h1>利润计算器</h1>
    <p>FBA 毛利模型：售价 − 佣金 − 配送费 − 采购 − 头程 − 其他。改任一数字，结果实时重算。</p>
  </div>
  ${f?"":P()}
  <section class="an-card">
    <div class="pf-sec-label">成本输入<span>前 4 项必填</span></div>
    <div class="pf-row pf-row-4">${t.map(ut).join("")}</div>
    <div class="pf-sec-label">可选参数<span>有数就算，没数按默认</span></div>
    <div class="pf-row pf-row-3">${s.map(ut).join("")}</div>
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
  </section>`}function ut([t,s,e,a]){return`
  <div class="field">
    <label>${s}</label>
    <div class="pf-inbox">
      <input id="${t}" class="input pf-input" placeholder="0" autocomplete="off">
      <span class="pf-unit">${e}</span>
    </div>
    <div class="f-hint">${a}</div>
  </div>`}function Os(){return Et(),`
  <div class="page-head ph-row">
    <div>
      <h1>供应商库</h1>
      <p>谈完一家记一家——报价、起订量、联系方式集中在这里，立项后找货不翻聊天记录。</p>
    </div>
    <div class="ph-actions">
      <button class="btn btn-primary btn-sm" data-action="supplier-add">＋ 供应商</button>
    </div>
  </div>
  ${f?"":P()}
  ${T.length?`
  <section class="an-card" style="padding:4px 14px">
    <table class="an-table">
      <thead><tr><th>供应商</th><th>主营类目</th><th>当前报价</th><th>起订量</th><th>联系方式</th><th>备注</th><th>更新</th><th></th></tr></thead>
      <tbody>
        ${T.map(t=>`
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
  </section>`:f&&U?`<section class="an-card">${N(4)}</section>`:'<div class="empty">还没有供应商记录——谈完第一家就记进来：名称、报价、起订量。</div>'}`}function Rs(){if(!f){l("需要后端在线——启动方法见页面提示");return}D(`
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
    </div>`)}async function xt(){const t=e=>{var a;return(((a=document.getElementById(e))==null?void 0:a.value)||"").trim()};if(!t("sp-name")){l("供应商名称不能为空");return}const s=document.querySelector('[data-action="supplier-save"]');A(s,!0,"保存中…");try{const e=await fetch(`${y}/api/suppliers`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t("sp-name"),category:t("sp-category"),quote:t("sp-quote"),moq:t("sp-moq"),contact:t("sp-contact"),note:t("sp-note")})}),a=await e.json();if(!e.ok){l(`⚠️ ${a.detail||"保存失败"}`);return}T.unshift(a),U=!1,H(),l("✅ 已记录供应商",!0),h()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{A(s,!1)}}async function zs(t,s){try{const e=await fetch(`${y}/api/suppliers/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),a=await e.json();if(!e.ok)return l(`⚠️ ${a.detail||"更新失败"}`),null;const n=T.findIndex(o=>o.id===t);return n>=0&&(T[n]=a),U=!1,h(),a}catch{return l("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function vt(t,s,e,a){const n=T.find(r=>r.id===t);if(!n)return;const o=await kt({title:e,text:`${n.name} 的当前${a}，直接改成新内容。`,label:a,value:n[s]||""});o!==null&&await zs(t,{[s]:o})&&l("已更新",!0)}async function qs(t){const s=T.find(a=>a.id===t);if(!(!s||!await K({title:`删除「${s.name}」？`,text:"这条供应商记录会一起删掉，不可恢复。",ok:"删除",danger:!0}))){try{const a=await fetch(`${y}/api/suppliers/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}T=T.filter(a=>a.id!==t),h()}}function jt(t){const s=t.rounds[t.rounds.length-1],e=t.rounds[t.rounds.length-2]||null,a=x.filter(p=>(p.keyword||"").toLowerCase()===t.keyword.toLowerCase()).sort((p,k)=>k.score-p.score),n=a.filter(p=>p.profit),o=n.length?n.reduce((p,k)=>k.profit.result.margin>p.profit.result.margin?k:p):null,r=e?s.score>e.score?`机会指数较上轮上升 ${s.score-e.score} 分`:s.score<e.score?`机会指数较上轮下降 ${e.score-s.score} 分`:"机会指数与上轮持平":"首轮采集，暂无趋势",d=[`关键词「${t.keyword}」当前 ${s.grade}（机会指数 ${s.score}/100），${r}。`,a.length?`已深度分析 ${a.length} 个相关 ASIN，最高机会指数 ${Math.max(...a.map(p=>p.score))}${o?`，测算毛利率最高 ${o.profit.result.margin}%（${o.name}）`:""}。`:"尚未对该关键词下的具体商品做深度分析，建议先对头部商品跑一轮 ASIN 分析。",s.grade_cls!=="g-c"?"建议：维持当前监控节奏，优先对头部商品完成 ASIN 分析与利润测算，达到立项标准即转入看板跟进。":"建议：该类目当前竞争或需求信号偏弱，保持低频监控，暂不投入选品资源。"];return{cur:s,prev:e,related:a,trend:r,conclusion:d}}function Ds(t){const s=x.filter(e=>(e.keyword||"").toLowerCase()===t.toLowerCase()).sort((e,a)=>a.score-e.score);return s.length?s.map(e=>`
    <div class="rel-row" data-action="open-analysis" data-id="${e.id}" role="button" tabindex="0">
      <div class="rel-main">
        <div class="rel-name">${i(e.name)}</div>
        <div class="rel-meta">ASIN ${i(e.asin)}${e.profit?` · 毛利率 ${e.profit.result.margin}%`:""}</div>
      </div>
      <div class="rel-bar"><i style="width:${e.score}%"></i></div>
      <b class="rel-score">${e.score}</b>
    </div>`).join(""):'<div class="empty slim">该关键词下还没有 ASIN 分析——用「ASIN 分析」页对头部商品跑一份。</div>'}function St(t){const s=g.keywords.find(p=>p.id===t);if(!s||!s.rounds.length){l("这个关键词还没有采集轮次，先完成第 1 轮");return}const{cur:e,prev:a,related:n,trend:o,conclusion:r}=jt(s),d=[{name:s.keyword,points:s.rounds.map(p=>p.score)}];document.getElementById("modal-root").innerHTML=`
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
        ${zt(e.score)}
        <div class="dr-score-facts">
          <div class="dr-fact"><b>${e.score}</b><span>当前指数</span></div>
          <div class="dr-fact"><b>${a?e.score>a.score?"↑":e.score<a.score?"↓":"→":"—"}</b><span>较上轮</span></div>
          <div class="dr-fact"><b>${s.rounds.length}</b><span>采集轮次</span></div>
          <div class="dr-fact"><b>${n.length}</b><span>相关 ASIN</span></div>
        </div>
      </div>

      <div class="m-label">机会指数走势</div>
      <div class="dr-chart">${mt(d,{h:190})}</div>

      <div class="m-label">最新一轮核心指标</div>
      <div class="kcard-metrics">
        ${C("搜索结果",e.results,a==null?void 0:a.results,L,"down")}
        ${C("头部 BSR",e.bsr,a==null?void 0:a.bsr,q,"down")}
        ${C("头部评论",e.reviews,a==null?void 0:a.reviews,L,"up")}
        ${C("头部价格",e.price,a==null?void 0:a.price,bt,null)}
      </div>

      <div class="m-label">判断依据（最新一轮）</div>
      <div class="anr-reason">${e.reason_lines.map(i).join("<br>")}</div>

      <div class="m-label">相关 ASIN 分析（${n.length}）</div>
      ${Ds(s.keyword)}

      <div class="m-label">综合结论</div>
      <div class="anr-reason dr-conclusion">${r.map(i).join("<br><br>")}</div>

      <div class="dr-actions">
        <button class="btn btn-primary" data-action="collect-open" data-id="${s.id}">采集下一轮</button>
        <button class="btn btn-ghost" data-action="brief-export" data-id="${s.id}">简报 PDF（备用）</button>
      </div>
    </div>
  </div>`}function Js(t){const s=g.keywords.find(e=>e.id===t);if(!s||!s.rounds.length){l("这个关键词还没有采集轮次，先完成第 1 轮");return}document.getElementById("print-area").innerHTML=Us(s),window.print()}function Us(t){const{cur:s,related:e,trend:a,conclusion:n}=jt(t);return`
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
      <tr><td>${L(s.results)}</td><td>${q(s.bsr)}</td><td>${L(s.reviews)}</td><td>$${s.price}</td><td>${s.days} 天</td></tr>
    </table>
    <div class="pr-sec">采集历史（近 8 轮）</div>
    <table class="pr-table">
      <tr><th>轮次</th><th>时间</th><th>指数</th><th>评级</th><th>结果数</th><th>BSR</th></tr>
      ${[...t.rounds].slice(-8).reverse().map(o=>`
      <tr><td>第 ${o.round_no} 轮</td><td>${i(o.collected_at)}</td><td><b>${o.score}</b></td><td>${i(o.grade.split(" · ")[0])}</td><td>${L(o.results)}</td><td>${q(o.bsr)}</td></tr>`).join("")}
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
  </div>`}const tt={"#/":{render:lt,page:"监控总览"},"#/workbench":{render:lt,page:"监控总览"},"#/radar":{render:Vt,page:"关键词雷达"},"#/analyze":{render:ks,page:"ASIN 分析"},"#/profit":{render:Hs,page:"利润计算器"},"#/suppliers":{render:Os,page:"供应商库"},"#/projects":{render:Is,page:"立项看板"}};function h(){const t=location.hash||"#/",s=tt[t]||tt["#/"];document.getElementById("app").innerHTML=`
    <div class="layout">
      ${Ft(tt[t]?t:"#/")}
      <div class="main">
        ${Pt(s.page)}
        <div class="content">${s.render()}${Ht()}</div>
      </div>
    </div>`}window.addEventListener("hashchange",h);document.addEventListener("click",t=>{const s=t.target.closest("[data-action]");if(!s){t.target.classList&&t.target.classList.contains("modal-backdrop")&&H();return}const{action:e,id:a,dir:n}=s.dataset;switch(e){case"guide":xs();break;case"close-modal":H();break;case"dialog-ok":{const o=document.getElementById("dlg-input");et(o?o.value.trim().slice(0,200):!0);break}case"dialog-cancel":et(null);break;case"add-keyword":gt();break;case"kw-toggle":ts(a);break;case"collect-open":as(g.keywords.find(o=>o.id===a));break;case"collect-submit":es(a);break;case"del-keyword":ss(a);break;case"kw-detail":St(a);break;case"brief-export":Js(a);break;case"open-analysis":hs(a);break;case"parse-asin":wt();break;case"reset-asin":cs();break;case"fill-sample":rs();break;case"extract-paste":ds();break;case"apply-kw":ps();break;case"analyze-submit":fs();break;case"del-analysis":bs(a);break;case"export-pdf":Ss();break;case"copy-report":Ts();break;case"profit-open":pt(m);break;case"quick-profit":pt(null);break;case"profit-save":_s();break;case"project-add":Fs();break;case"project-move":Cs(a,n);break;case"project-note":Ns(a);break;case"project-del":Ps(a);break;case"supplier-add":Rs();break;case"supplier-save":xt();break;case"supplier-quote":vt(a,"quote","改报价","报价");break;case"supplier-note":vt(a,"note","供应商备注","备注");break;case"supplier-del":qs(a);break}});document.addEventListener("input",t=>{t.target.classList.contains("af-input")&&t.target.dataset.field&&(c[t.target.dataset.field]=t.target.value),t.target.classList.contains("pf-input")&&ot(),t.target.id==="kw-input"&&(Q=t.target.value)});document.addEventListener("keydown",t=>{var s;t.key==="Enter"&&t.target.id==="kw-input"&&gt(),t.key==="Enter"&&t.target.id==="an-raw"&&wt(),t.key==="Enter"&&((s=t.target.dataset)==null?void 0:s.action)==="kw-detail"&&St(t.target.dataset.id),t.key==="Enter"&&t.target.id==="dlg-input"&&et(t.target.value.trim().slice(0,200)),t.key==="Enter"&&t.target.id==="sp-name"&&xt(),t.key==="Escape"&&H()});It().then(h);
