(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();const Ht={name:"选品罗盘",type:"真数据工作空间"},h="";let m=!1;const Ot=window.fetch.bind(window);let ot=0;function ht(){var t;(t=document.getElementById("top-progress"))==null||t.classList.toggle("on",ot>0)}window.fetch=(t,s={})=>(ot++,ht(),Ot(t,s).finally(()=>{ot--,ht()}));let wt=Ht,x={keywords:[],events:[]},G=!0,T=[],J=!0,S=[],st=!0,E=[],W=!0,y=null;async function Rt(){try{const t=await fetch(`${h}/api/bootstrap`);if(!t.ok)throw new Error(`HTTP ${t.status}`);wt=(await t.json()).workspace,m=!0,console.log(`[选品罗盘] 已连接后端 ${h}`)}catch{console.log("[选品罗盘] 后端未启动，界面可浏览，数据功能需后端在线")}}async function kt(){if(!(!m||!G))try{const t=await fetch(`${h}/api/radar`);if(!t.ok)throw new Error(`HTTP ${t.status}`);x=await t.json(),G=!1,["#/","#/workbench","#/radar"].includes(location.hash||"#/")&&v()}catch{}}async function dt(){if(!(!m||!J))try{const t=await fetch(`${h}/api/analyses`);if(!t.ok)throw new Error(`HTTP ${t.status}`);T=(await t.json()).analyses||[],J=!1,["#/","#/workbench","#/analyze"].includes(location.hash||"#/")&&v()}catch{}}async function pt(){if(!(!m||!st))try{const t=await fetch(`${h}/api/projects`);if(!t.ok)throw new Error(`HTTP ${t.status}`);S=(await t.json()).projects||[],st=!1,["#/","#/workbench","#/projects"].includes(location.hash||"#/")&&v()}catch{}}async function zt(){if(!(!m||!W))try{const t=await fetch(`${h}/api/suppliers`);if(!t.ok)throw new Error(`HTTP ${t.status}`);E=(await t.json()).suppliers||[],W=!1,(location.hash||"#/")==="#/suppliers"&&v()}catch{}}const q=t=>String(t).padStart(2,"0"),r=t=>String(t).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),A=t=>Number(t).toLocaleString("en-US"),K=t=>`#${Number(t).toLocaleString("en-US")}`,xt=t=>`$${t}`;function c(t,s=!1){var a;(a=document.getElementById("toast"))==null||a.remove();const e=document.createElement("div");e.id="toast",e.className=s?"ok":"",e.textContent=t,document.body.appendChild(e),setTimeout(()=>e.remove(),2600)}const Ut=`
  <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#ffffff" stroke="#e4e7ef"/>
    <circle cx="24" cy="24" r="14.5" fill="none" stroke="#2563eb" stroke-width="2.4" opacity=".92"/>
    <path d="M24 12.5 L27.4 24 L20.6 24 Z" fill="#2563eb"/>
    <path d="M24 35.5 L27.4 24 L20.6 24 Z" fill="#a7c3f7"/>
    <circle cx="24" cy="24" r="2.4" fill="#ffffff" stroke="#2563eb" stroke-width="1.6"/>
  </svg>`,Dt={workbench:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5"/><rect x="13.5" y="12" width="7.5" height="9" rx="1.5"/><rect x="3" y="16" width="7.5" height="5" rx="1.5"/></svg>',radar:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/><path d="M12 3v2.4M21 12h-2.4M12 21v-2.4M3 12h2.4"/></svg>',search:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.8 16.8 21 21"/></svg>',calc:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M8 7.5h8"/><path d="M8.6 15h2.6M8.6 18h2.6M14.2 13.4v5.2M11.6 16h5.2"/></svg>',box:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 21 7.8v8.4L12 21 3 16.2V7.8Z"/><path d="M3 7.8 12 12.6 21 7.8"/><path d="M12 12.6V21"/></svg>',board:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="4" width="4.6" height="16" rx="1.4"/><rect x="9.7" y="4" width="4.6" height="10.5" rx="1.4"/><rect x="15.9" y="4" width="4.6" height="13.5" rx="1.4"/></svg>',studio:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 12.5 11.5"/><path d="m16 4 .9 2.1L19 7l-2.1.9L16 10l-.9-2.1L13 7l2.1-.9Z"/><path d="m19.5 12.5 .6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z"/><path d="m6.5 4.5.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z"/></svg>'},qt=[{hash:"#/",icon:"workbench",label:"监控总览",group:"总览"},{hash:"#/radar",icon:"radar",label:"关键词雷达",group:"调研分析",badge:()=>x.keywords.length},{hash:"#/analyze",icon:"search",label:"ASIN 分析",group:"调研分析",badge:()=>T.length},{hash:"#/studio",icon:"studio",label:"AI 作图工坊",group:"调研分析"},{hash:"#/profit",icon:"calc",label:"利润计算器",group:"测算与跟进"},{hash:"#/suppliers",icon:"box",label:"供应商库",group:"测算与跟进",badge:()=>E.length},{hash:"#/projects",icon:"board",label:"立项看板",group:"测算与跟进",badge:()=>S.filter(t=>t.stage!=="已放弃").length}];function Gt(t){let s="";const e=qt.map(a=>{const n=a.group&&a.group!==s?`<div class="nav-label">${a.group}</div>`:"";return s=a.group,`${n}
    <a class="nav-item ${a.hash===t?"active":""}" href="${a.hash}">
      ${Dt[a.icon]}<span>${a.label}</span>
      ${a.badge&&a.badge()>0?`<span class="nav-badge">${q(a.badge())}</span>`:""}
    </a>`}).join("");return`
  <aside class="sidebar">
    <div class="logo-row">
      ${Ut}
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
  </aside>`}function Jt(t){return`
  <header class="topbar">
    <div class="crumb">${r(wt.type)} <span>/</span> <b>${r(t)}</b></div>
    <div class="top-right">
      <span class="top-chip"><span class="dot"></span>${m?"后端已连接":"后端离线"}</span>
      <button class="btn btn-ghost btn-sm" data-action="guide">使用指南</button>
    </div>
  </header>`}const Kt=()=>`
  <footer class="footer">
    <span>真实数据 · 半自动采集 · 全部存在本地</span>
    <span>选品罗盘 · 半自动选品工作台</span>
  </footer>`;function St(t,s){if(!s)return'<span class="delta-chip new">新</span>';const e=t.score-s.score;return e>0?`<span class="delta-chip up">↑${e}</span>`:e<0?`<span class="delta-chip down">↓${Math.abs(e)}</span>`:'<span class="delta-chip flat">→</span>'}const at=["#2563eb","#5b8def","#8fb3f7","#1e40af","#64748b","#c9d6f0"];function Tt(t,{h:s=210}={}){const a=s,n=36,i=12,o=14,d=24,u=t.filter(f=>f.points.length>=2);if(!u.length)return'<div class="chart-empty">完成第 2 轮采集后，这里出现趋势线。</div>';const j=Math.max(...u.map(f=>f.points.length)),M=u.flatMap(f=>f.points);let _=Math.min(...M),b=Math.max(...M);if(b-_<4){const f=(b+_)/2;_=f-2,b=f+2}const $=640-n-i,w=a-o-d,I=f=>n+f*$/(j-1),C=f=>o+w-(f-_)/(b-_)*w,nt=[0,.5,1].map(f=>{const L=o+w*f,V=Math.round(b-(b-_)*f);return`<line x1="${n}" y1="${L.toFixed(1)}" x2="${640-i}" y2="${L.toFixed(1)}" class="c-grid"/>
            <text x="${n-7}" y="${(L+3.5).toFixed(1)}" text-anchor="end" class="c-label">${V}</text>`}).join(""),Z=[...new Set([0,Math.round((j-1)/2),j-1])].map(f=>`<text x="${I(f).toFixed(1)}" y="${a-6}" text-anchor="${f===0?"start":f===j-1?"end":"middle"}" class="c-label">第 ${f+1} 轮</text>`).join(""),B=u.map((f,L)=>{const V=f.color||at[L%at.length],Ct=f.points.map((Bt,Ft)=>`${I(Ft).toFixed(1)},${C(Bt).toFixed(1)}`).join(" "),vt=f.points[f.points.length-1];return`<polyline points="${Ct}" fill="none" stroke="${V}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="${I(f.points.length-1).toFixed(1)}" cy="${C(vt).toFixed(1)}" r="3.4" fill="${V}"><title>${r(f.name)} · 第 ${f.points.length} 轮 · ${vt} 分</title></circle>`}).join("");return`<svg viewBox="0 0 640 ${a}" class="chart" role="img">${nt}${B}${Z}</svg>`}const Zt=t=>`
  <div class="chart-legend">${t.map(s=>`
    <span class="lg-item"><i style="background:${s.color}"></i>${r(s.name)}</span>`).join("")}
  </div>`;function Wt(t){const s=t.reduce((o,d)=>o+d.value,0);if(!s)return'<div class="chart-empty">还没有已评分的关键词。</div>';const e=54,a=2*Math.PI*e;let n=0;const i=t.map(o=>{const d=o.value/s,u=`<circle r="${e}" cx="70" cy="70" fill="none" stroke="${o.color}" stroke-width="15"
      stroke-dasharray="${Math.max(0,d*a-2).toFixed(1)} ${(a-Math.max(0,d*a-2)).toFixed(1)}"
      stroke-dashoffset="${(-n*a).toFixed(1)}" transform="rotate(-90 70 70)"/>`;return n+=d,u}).join("");return`
  <div class="donut-wrap">
    <svg viewBox="0 0 140 140" class="donut">
      <circle r="${e}" cx="70" cy="70" fill="none" stroke="#eef0f5" stroke-width="15"/>
      ${i}
      <text x="70" y="70" text-anchor="middle" class="dn-total">${s}</text>
      <text x="70" y="86" text-anchor="middle" class="dn-total-label">监控词</text>
    </svg>
    <div class="dn-legend">
      ${t.map(o=>`
      <div class="dn-row">
        <span class="dn-dot" style="background:${o.color}"></span>
        <span class="dn-name">${r(o.label)}</span>
        <b>${o.value}</b>
        <span class="dn-pct">${Math.round(o.value/s*100)}%</span>
      </div>`).join("")}
    </div>
  </div>`}function Xt(t,s=116){const a=2*Math.PI*52,n=Math.max(0,Math.min(100,t))/100,i=t>=75?"#2563eb":t>=55?"#7ea4f5":"#a3a8b8";return`
  <svg viewBox="0 0 140 140" class="gauge" style="width:${s}px;height:${s}px">
    <circle r="52" cx="70" cy="70" fill="none" stroke="#eef0f5" stroke-width="11"/>
    <circle r="52" cx="70" cy="70" fill="none" stroke="${i}" stroke-width="11" stroke-linecap="round"
      stroke-dasharray="${(n*a).toFixed(1)} ${a.toFixed(1)}" transform="rotate(-90 70 70)"/>
    <text x="70" y="72" text-anchor="middle" class="gg-score">${t}</text>
    <text x="70" y="90" text-anchor="middle" class="gg-label">机会指数</text>
  </svg>`}function Vt(t,s=250){const i=t.length,o=(b,$)=>{const w=-Math.PI/2+b*2*Math.PI/i;return[130+Math.cos(w)*72*$,108+Math.sin(w)*72*$]},d=[.25,.5,.75,1].map(b=>`<polygon points="${t.map(($,w)=>o(w,b).map(I=>I.toFixed(1)).join(",")).join(" ")}" class="rd-ring"/>`).join(""),u=t.map((b,$)=>{const[w,I]=o($,1);return`<line x1="130" y1="108" x2="${w.toFixed(1)}" y2="${I.toFixed(1)}" class="rd-ring"/>`}).join(""),j=t.map((b,$)=>o($,Math.max(.05,b.value)).map(w=>w.toFixed(1)).join(",")).join(" "),M=t.map((b,$)=>{const[w,I]=o($,Math.max(.05,b.value));return`<circle cx="${w.toFixed(1)}" cy="${I.toFixed(1)}" r="2.8" fill="#2563eb"><title>${r(b.label)} ${Math.round(b.value*100)}</title></circle>`}).join(""),_=t.map((b,$)=>{const[w,I]=o($,1.26),C=Math.abs(w-130)<8?"middle":w>130?"start":"end";return`<text x="${w.toFixed(1)}" y="${(I+3.5).toFixed(1)}" text-anchor="${C}" class="rd-label">${r(b.label)}</text>`}).join("");return`
  <svg viewBox="0 0 260 216" class="radar" style="width:${s}px" overflow="visible">
    ${d}${u}
    <polygon points="${j}" fill="rgba(37,99,235,.18)" stroke="#2563eb" stroke-width="2"/>
    ${M}${_}
  </svg>`}function Qt(){if(!S.length)return'<div class="empty slim">还没有立项项目——报告页「转为立项」后，这里显示跟进漏斗。</div>';const t=N.map(e=>({s:e,n:S.filter(a=>a.stage===e).length})),s=Math.max(1,...t.map(e=>e.n));return`
  <div class="funnel">
    ${t.map(e=>`
    <div class="fn-row">
      <span class="fn-label">${e.s}</span>
      <div class="fn-track"><div class="fn-bar ${e.s==="已放弃"?"dead":""}" style="width:${e.n?Math.max(8,e.n/s*100):0}%"></div></div>
      <b class="fn-n">${e.n}</b>
    </div>`).join("")}
  </div>`}const H=(t=3)=>`
  <div class="sk-card">${'<div class="sk-line"></div>'.repeat(t)}</div>`;function Q(t,s,e){const a=Math.max(1,...e.map(n=>n.n));return`
  <div class="lens-card">
    <div class="lens-title">${t}<span>${s}</span></div>
    ${e.map(n=>`
    <div class="fn-row">
      <span class="fn-label">${n.label}</span>
      <div class="fn-track"><div class="fn-bar ${n.dim?"dead":""}" style="width:${n.n?Math.max(8,n.n/a*100):0}%"></div></div>
      <b class="fn-n">${n.n}</b>
    </div>`).join("")}
  </div>`}function Yt(t){if(!t.length)return"";const s=t.map(n=>n.cur),e=(n,i,o,d=!1)=>({label:o,n:s.filter(u=>u.price>=n&&u.price<i).length,dim:d}),a=(n,i)=>i.map(([o,d,u])=>({label:u,n:s.filter(j=>{const M=n(j);return M>=o&&M<d}).length}));return`
  <section class="section">
    <div class="sec-head">
      <h2>市场结构透视</h2>
      <span class="sec-sub">同一批监控词的四个角度 · 只统计最新一轮</span>
    </div>
    <div class="lens-grid">
      ${Q("价格带","头部价格（美元）",[e(0,15,"15 以下 · 利润薄",!0),e(15,45,"15–45 · 黄金带"),e(45,80,"45–80 · 中高客单"),e(80,1e9,"80 以上 · 高客单")])}
      ${Q("竞争梯度","搜索结果数",a(n=>n.results,[[0,1001,"1千以内 · 稀缺"],[1001,10001,"1千–1万 · 宽松"],[10001,100001,"1万–10万 · 一般"],[100001,1e12,"10万以上 · 红海"]]))}
      ${Q("需求活跃度","最新评论距今",a(n=>n.days,[[0,4,"3天内 · 极活跃"],[4,15,"4–14天 · 活跃"],[15,31,"15–30天 · 转冷"],[31,1e9,"30天以上 · 休眠"]]))}
      ${Q("排名梯度","头部大类排名",a(n=>n.bsr,[[0,1001,"1千以内 · 头部"],[1001,10001,"1千–1万 · 靠前"],[10001,50001,"1万–5万 · 中游"],[50001,1e12,"5万以上 · 长尾"]]))}
    </div>
  </section>`}function mt(){kt(),dt(),pt();const t=x.keywords||[],s=t.filter(d=>d.rounds.length).map(d=>({k:d,cur:d.rounds[d.rounds.length-1],prev:d.rounds[d.rounds.length-2]||null})).sort((d,u)=>u.cur.score-d.cur.score),e=s.filter(d=>d.cur.grade_cls!=="g-c").length,a=t.reduce((d,u)=>d+u.rounds.length,0),n=S.filter(d=>d.stage!=="已放弃").length,i=t.length||T.length,o=m&&!i&&(G||J);return`
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
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':q(t.length)}</b><span>监控关键词</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':q(e)}</b><span>重点机会 A/B</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':q(a)}</b><span>累计采集轮次</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':q(T.length)}</b><span>ASIN 报告</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':q(n)}</b><span>立项进行中</span></div>
  </div>

  ${i?"":ss()}
  ${m?"":R()}

  <div class="dash">
    <div class="dash-main">
      <section class="chart-card">
        <div class="sec-head">
          <h2>机会指数趋势</h2>
          <span class="sec-sub">各关键词历史轮次得分 · 悬停圆点看数值</span>
        </div>
        ${o?H(5):ts(s)}
      </section>

      ${s.length||o?`
      <section class="section">
        <div class="sec-head">
          <h2>类目机会排行</h2>
          <span class="sec-sub">点击任意一行，打开类目分析面板</span>
        </div>
        <div class="rank-list">${s.length?s.map(as).join(""):H(3)}</div>
      </section>`:""}

      ${s.length?Yt(s):""}

      <section class="section">
        <div class="sec-head">
          <h2>单品分析速览</h2>
          <span class="sec-sub">客户单品报告 · 点击回看</span>
        </div>
        <div class="recent-grid">${o?H(2):ns()}</div>
      </section>
    </div>

    <div class="dash-side">
      <section class="chart-card">
        <div class="sec-head"><h2>评级分布</h2><span class="sec-sub">最新一轮</span></div>
        ${Wt([{label:"A 类 · 优先评估",value:s.filter(d=>d.cur.grade_cls==="g-a").length,color:"#2563eb"},{label:"B 类 · 跟进观察",value:s.filter(d=>d.cur.grade_cls==="g-b").length,color:"#8fb3f7"},{label:"C 类 · 暂缓投入",value:s.filter(d=>d.cur.grade_cls==="g-c").length,color:"#c9cdd9"}])}
      </section>

      <section class="chart-card">
        <div class="sec-head"><h2>立项漏斗</h2><a class="sec-sub" href="#/projects">进入看板 →</a></div>
        ${Qt()}
      </section>

      <section class="section">
        <div class="sec-head">
          <h2>市场信号</h2>
          <span class="sec-sub">差值引擎自动告知</span>
        </div>
        ${o?H(3):es()}
      </section>
    </div>
  </div>`}function ts(t){const s=t.slice(0,6).map((a,n)=>({name:a.k.keyword,color:at[n%at.length],points:a.k.rounds.map(i=>i.score)})),e=s.filter(a=>a.points.length>=2);return e.length?Tt(s)+Zt(e):'<div class="chart-empty">完成第 2 轮采集后，这里出现各关键词的机会指数趋势线。</div>'}function ss(){return`
  <section class="an-card onboard">
    <b>开始第一轮监控（约 5 分钟）</b>
    <ol>
      <li>在「<b>关键词雷达</b>」添加关注的类目词（如 dog bed）</li>
      <li>到 amazon.com 搜索该词，打开第 1 名商品页，采集 5 个公开数据（约 2 分钟）</li>
      <li>提交采集——差值引擎自动评分；第 2 轮起自动对比涨跌、推送重点机会信号</li>
    </ol>
    <a class="btn btn-primary" href="#/radar">添加第一个关键词</a>
  </section>`}function R(){return`
  <div class="an-offline">
    <b>后端未启动。</b>数据功能需后端在线：在 <code>api</code> 目录运行
    <code>.venv\\Scripts\\python.exe -m uvicorn main:app --reload --port 8000</code>
    后刷新页面。<span>（历史数据都存在后端文件里，不会丢）</span>
  </div>`}function as(t,s){const{k:e,cur:a,prev:n}=t;return`
  <div class="rank-row" data-action="kw-detail" data-id="${e.id}" role="button" tabindex="0">
    <div class="rank-no">${s+1}</div>
    <div class="row-main">
      <div class="row-name">${r(e.keyword)}</div>
      <div class="row-meta">结果 ${A(a.results)} · 头部 BSR ${K(a.bsr)} · ${r(a.collected_at)}</div>
    </div>
    ${St(a,n)}
    <span class="chip-soft ${a.grade_cls}">${r(a.grade.split(" · ")[0])}</span>
    <div class="score" title="机会指数">${a.score}</div>
    <span class="row-go">›</span>
  </div>`}function es(){const t=x.events||[];return t.length?`
  <div class="radar-feed">
    ${t.slice(0,6).map(s=>`
    <div class="rf-item">
      <span class="rf-dot"></span>
      <div>
        <div class="rf-text">${r(s.text)}</div>
        <div class="rf-time">${r(s.at)}</div>
      </div>
    </div>`).join("")}
  </div>`:'<div class="empty slim">完成第一轮采集后，变化动态会出现在这里（升降级、竞争加剧、需求走强…自动告知）。</div>'}function ns(){return T.length?T.slice(0,3).map(t=>`
  <div class="recent-card" data-action="open-analysis" data-id="${t.id}">
    <div>
      <div class="rc-name">${r(t.name)}</div>
      <div class="rc-meta">ASIN ${r(t.asin)} · ${r(t.collected_at)}</div>
    </div>
    <div class="rc-right">
      <div class="score sm">${t.score}</div>
      <span class="chip-soft ${t.grade_cls}">${r(t.grade.split(" · ")[0])}</span>
    </div>
  </div>`).join(""):'<div class="empty slim">还没有 ASIN 分析——客户发来商品链接时，用「ASIN 分析」出可交付报告。</div>'}let ct=null,et="";function is(){kt(),dt();const t=x.keywords||[],s=t.filter(a=>!a.rounds.length),e=t.filter(a=>a.rounds.length).sort((a,n)=>n.rounds[n.rounds.length-1].score-a.rounds[a.rounds.length-1].score);return`
  <div class="page-head">
    <h1>关键词雷达</h1>
    <p>不定期采集你关注的类目词，差值引擎自动对比每一轮——机会指数涨跌、竞争变化、升降级告知全自动。</p>
  </div>
  ${m?"":R()}
  <div class="an-card">
    <div class="an-parse-row">
      <input id="kw-input" class="input grow" placeholder="输入要监控的类目关键词，如 dog bed / kitchen organizer…"
             value="${r(et)}" autocomplete="off">
      <button class="btn btn-soft" data-action="add-keyword">＋ 添加监控</button>
    </div>
    <div class="f-hint" style="margin-top:8px">建议选「客户问得多 + 你有供应链优势」的词；先加 3–5 个跑起来，不定期采集即可。</div>
  </div>
  ${t.length?"":m&&G?`<section class="an-card">${H(4)}</section>`:'<div class="empty">还没有监控关键词——上面输入第一个，开始你的雷达。</div>'}
  ${[...s.map(rs),...e.map(os)].join("")}`}function rs(t){return`
  <section class="an-card kcard pending">
    <div class="kcard-head">
      <div class="kcard-title">
        <span class="kcard-kw">${r(t.keyword)}</span>
        <span class="chip-soft">待首轮采集 · ${r(t.created_at)} 加入</span>
      </div>
      <button class="btn btn-danger btn-sm" data-action="del-keyword" data-id="${t.id}">删除</button>
    </div>
    <div class="kcard-reason">还没采集过。打开 amazon.com 搜索「${r(t.keyword)}」，抄 5 个数完成第 1 轮，即可进入重点机会榜。</div>
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="collect-open" data-id="${t.id}">完成第 1 轮采集</button>
    </div>
  </section>`}function O(t,s,e,a,n){let i;if(e==null)i='<span class="rm-sub flat">首轮</span>';else{const o=s-e;if(!o)i=`<span class="rm-sub flat">→ 上轮 ${a(e)}</span>`;else{const d=n==="up"?o>0:n==="down"?o<0:null;i=`<span class="rm-sub ${d===null?"flat":d?"up":"down"}">${o>0?"↑":"↓"} 上轮 ${a(e)}</span>`}}return`
  <div class="rm">
    <div class="rm-label">${t}</div>
    <div class="rm-value">${a(s)}</div>
    ${i}
  </div>`}function os(t){const s=t.rounds[t.rounds.length-1],e=t.rounds[t.rounds.length-2]||null,a=ct===t.id;return`
  <section class="an-card kcard">
    <div class="kcard-head">
      <div class="kcard-title">
        <span class="kcard-kw">${r(t.keyword)}</span>
        <span class="chip-soft">第 ${t.rounds.length} 轮 · ${r(s.collected_at)}</span>
      </div>
      <button class="btn btn-danger btn-sm" data-action="del-keyword" data-id="${t.id}">删除</button>
    </div>
    <div class="kcard-score">
      <div class="score">${s.score}<small>/100</small></div>
      <span class="anr-grade ${s.grade_cls}">${r(s.grade)}</span>
      ${St(s,e)}
      <span class="rm-sub flat" style="margin-left:auto">头部预估月销 ${r(s.est_sales)}</span>
    </div>
    <div class="kcard-metrics">
      ${O("搜索结果",s.results,e==null?void 0:e.results,A,"down")}
      ${O("头部 BSR",s.bsr,e==null?void 0:e.bsr,K,"down")}
      ${O("头部评论",s.reviews,e==null?void 0:e.reviews,A,"up")}
      ${O("头部价格",s.price,e==null?void 0:e.price,xt,null)}
    </div>
    <div class="kcard-reason">${s.reason_lines.map(r).join("<br>")}</div>
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="collect-open" data-id="${t.id}">本轮采集</button>
      <button class="btn btn-ghost" data-action="kw-detail" data-id="${t.id}">分析面板</button>
      <button class="btn btn-ghost" data-action="kw-toggle" data-id="${t.id}">${a?"收起历史":`历史 ${t.rounds.length} 轮`}</button>
      <button class="btn btn-ghost" data-action="brief-export" data-id="${t.id}">简报 PDF</button>
    </div>
    ${a?cs(t):""}
  </section>`}function cs(t){const s=[...t.rounds].reverse();return`
  <table class="an-table kw-history">
    <thead><tr><th>采集时间</th><th>轮次</th><th>指数</th><th>Δ</th><th>结果数</th><th>BSR</th><th>评论</th><th>价格</th><th>评论距今</th></tr></thead>
    <tbody>
      ${s.map((e,a)=>{const n=s[a+1],i=n?e.score-n.score:null;return`
        <tr>
          <td class="agt-time">${r(e.collected_at)}</td>
          <td>第 ${e.round_no} 轮</td>
          <td><b>${e.score}</b></td>
          <td>${i===null?'<span class="rm-sub flat">—</span>':`<span class="rm-sub ${i>0?"up":i<0?"down":"flat"}">${i>0?"↑"+i:i<0?"↓"+Math.abs(i):"→"}</span>`}</td>
          <td>${A(e.results)}</td>
          <td>${K(e.bsr)}</td>
          <td>${A(e.reviews)}</td>
          <td>$${e.price}</td>
          <td>${e.days} 天</td>
        </tr>`}).join("")}
    </tbody>
  </table>`}async function jt(){var s;if(!m){c("需要后端在线——启动方法见页面提示");return}const t=et.trim()||(((s=document.getElementById("kw-input"))==null?void 0:s.value)||"").trim();if(!t){c("先输入一个关键词，比如 dog bed");return}try{const e=await fetch(`${h}/api/radar/keyword`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword:t})}),a=await e.json();if(!e.ok){c(`⚠️ ${a.detail||"添加失败"}`);return}x.keywords.push(a),x.events.unshift({at:a.created_at,kw:a.keyword,text:`新增监控关键词「${a.keyword}」——去 Amazon 搜索并完成第 1 轮采集`}),G=!1,et="",v()}catch{c("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}function ls(t){ct=ct===t?null:t,v()}async function ds(t){const s=x.keywords.find(a=>a.id===t);if(!(!s||!await P({title:`删除「${s.keyword}」？`,text:"它的全部采集轮次与动态会一起删除，删除后不可恢复。",ok:"删除",danger:!0}))){try{const a=await fetch(`${h}/api/radar/keyword/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{c("⚠️ 删除失败，请确认后端在线");return}x.keywords=x.keywords.filter(a=>a.id!==t),x.events=x.events.filter(a=>a.kw!==s.keyword),v()}}function ps(t){const s=[["c-results","搜索结果数",`搜「${t.keyword}」后左上角「X results」`],["c-bsr","头部 BSR 排名","第 1 名商品页「Best Sellers Rank」第一行数字"],["c-reviews","头部评论数","第 1 名星级旁 ratings 数量"],["c-price","头部价格（美元）","第 1 名当前售价"],["c-days","头部最新评论距今天数","第 1 名评论区第一条日期距今天数（今天 = 0）"]];D(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>「${r(t.keyword)}」第 ${t.rounds.length+1} 轮采集</h3>
    <p class="m-sub">打开 amazon.com 搜索「${r(t.keyword)}」→ 打开第 1 名商品页，抄 5 个数（约 2 分钟）。提交后差值引擎自动对比上一轮。</p>
    <div class="an-grid">
      ${s.map(([e,a,n])=>`
      <div class="field">
        <label>${a}</label>
        <input id="${e}" class="input cm-input" placeholder="${r(n)}">
        <div class="f-hint">${n}</div>
      </div>`).join("")}
    </div>
    <div class="m-actions">
      <button class="btn btn-primary" data-action="collect-submit" data-id="${t.id}">提交本轮采集</button>
    </div>
    <div class="m-note">每一轮都留档不覆盖——回看趋势全靠历史轮次。</div>`)}async function us(t){if(!m){c("需要后端在线");return}const s=a=>{var n;return(((n=document.getElementById(a))==null?void 0:n.value)||"").trim()},e=document.querySelector('[data-action="collect-submit"]');k(e,!0,"提交中…");try{const a=await fetch(`${h}/api/radar/collect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword_id:t,results:s("c-results"),bsr:s("c-bsr"),reviews:s("c-reviews"),price:s("c-price"),days:s("c-days")})}),n=await a.json();if(!a.ok){c(`⚠️ ${n.detail||"提交失败"}`);return}const i=x.keywords.findIndex(o=>o.id===t);i>=0&&(x.keywords[i]=n.keyword),x.events=n.delta_events.map(o=>({at:n.round.collected_at,kw:n.keyword.keyword,text:o})).concat(x.events),G=!1,U(),c(`✅ 第 ${n.round.round_no} 轮已入库：机会指数 ${n.round.score}`,!0),v()}catch{c("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{k(e,!1)}}const fs=/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i,vs=/^[A-Z0-9]{10}$/i;let tt=!1,l={raw:"",asin:null,source:"",parseError:"",name:"",keyword:"",price:"",rating:"",reviews:"",bsr:"",results:"",days:"",paste:"",extractMeta:null,bsrCategory:""};const It=["name","price","rating","reviews","bsr","results","days"],hs=[{key:"name",label:"商品名称",ph:"复制商品页标题（可只留核心部分）",hint:"商品页顶部的商品标题"},{key:"keyword",label:"搜索关键词",ph:"dog bed for large dogs",hint:"你在 Amazon 搜索框用的词——多个 ASIN 按它归成一类对比"},{key:"price",label:"价格（美元）",ph:"29.99",hint:"商品页当前售价（不看划线价）"},{key:"rating",label:"评分",ph:"4.4",hint:"星级分数，如 4.4"},{key:"reviews",label:"评论总数",ph:"2310",hint:"星级旁 ratings 数量，去逗号：2,310 → 2310"},{key:"bsr",label:"大类 BSR 排名",ph:"1560",hint:"商品信息区「Best Sellers Rank」第一行：#1,560 in Pet Supplies → 填 1560"},{key:"results",label:"搜索结果数",ph:"5000",hint:"用上面的关键词搜索后，左上角「5,000 results」→ 填 5000"},{key:"days",label:"最新评论距今天数",ph:"今天 = 0，昨天 = 1",hint:"评论区第一条的日期（Reviewed … on October 8, 2026）距今几天；评论数为 0 可不填"}];function Mt(){var n;const t=(((n=document.getElementById("an-raw"))==null?void 0:n.value)||l.raw||"").trim();l.raw=t,l.parseError="";const s=fs.exec(t),e=vs.test(t.toUpperCase())?t.toUpperCase():null,a=s?s[1].toUpperCase():e;a?(l.asin=a,l.source=s?"识别自链接":"手动输入"):(l.asin=null,l.parseError=/amzn\.to/i.test(t)?"amzn.to 短链请先在浏览器打开，再复制地址栏的完整链接":"没识别到 ASIN：需要完整链接（含 /dp/B0… 部分）或 10 位 ASIN"),v()}function ms(){l={...l,raw:"https://www.amazon.com/dp/B0TEST0001",asin:"B0TEST0001",source:"示例数据",parseError:"",name:"示例 · 大型犬高支撑可拆洗宠物床",keyword:"dog bed for large dogs",price:"39.99",rating:"4.3",reviews:"2310",bsr:"1560",results:"5000",days:"1",extractMeta:null,bsrCategory:"",apiRaw:""},v()}function bs(){l.asin=null,l.source="",l.parseError="",v()}async function $s(){const t=(l.paste||"").trim();if(!t){c("先把商品页文字粘贴到框里（Ctrl+A → Ctrl+C → 粘贴）");return}if(!m){c("自动提取需要后端在线——启动方法见页面顶部提示");return}const s=document.querySelector('[data-action="extract-paste"]');k(s,!0,"提取中…");try{const e=await fetch(`${h}/api/extract`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t})}),a=await e.json();if(!e.ok){c(`⚠️ ${a.detail||"提取失败"}`);return}gs(a)}catch{c("⚠️ 连不上后端，请确认后端还在运行")}finally{tt=!1,k(s,!1)}}function gs(t){const s={found:t.found||[],warnings:t.warnings||[],filled:[],at:new Date().toLocaleTimeString()};t.asin&&!l.asin&&(l.raw=t.asin,l.asin=t.asin,l.source="整页粘贴识别",l.parseError=""),It.forEach(e=>{var n;const a=(n=t.fields)==null?void 0:n[e];a&&a.value!==""&&a.value!=null&&String(l[e]??"").trim()===""&&(l[e]=String(a.value),s.filled.push(e))}),l.bsrCategory=t.bsr_category||"",l.extractMeta=s,v(),s.filled.length?c(`✅ 已预填 ${s.filled.length} 项（绿色标记），瞄一眼改漏的`,!0):c("⚠️ 没提取到新数字——请手动填写，或检查粘贴的是不是商品页")}function ys(){l.bsrCategory&&!String(l.keyword||"").trim()&&(l.keyword=l.bsrCategory,v())}const ws={name:"商品名称",price:"价格",rating:"评分",reviews:"评论总数",bsr:"BSR 排名"};async function ks(t){if(!l.asin){c("先在第 1 步解析出 ASIN");return}if(!m){c("联网查询需要后端在线——启动方法见页面顶部提示");return}if(await P({title:"查询商品数据",text:`将联网查询 ASIN ${l.asin} 的公开商品信息（标题、价格、评分、评论、BSR），自动填入第 2 步清单。确定查询？`,ok:"查询"})){k(t,!0,"查询中…");try{const e=await fetch(`${h}/api/amz/detail`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({asin:l.asin})}),a=await e.json();if(!e.ok){c(`⚠️ ${a.detail||"查询失败"}`);return}xs(a)}catch{c("⚠️ 连不上后端，请确认后端还在运行")}finally{k(t,!1)}}}function xs(t){const s=[];["name","price","rating","reviews","bsr"].forEach(a=>{var i;const n=(i=t.fields)==null?void 0:i[a];n&&n.value!==""&&n.value!=null&&(l[a]=String(n.value),s.push(a))});const e=(t.missing||[]).map(a=>ws[a]||a);l.extractMeta={api:!0,at:new Date().toLocaleTimeString(),found:s,filled:s,warnings:e.length?[`本次没取到：${e.join("、")}——请手补，或用备用通道整页粘贴`]:[]},l.apiRaw=t.raw_preview||"",v(),s.length?c(`✅ 已联网取到 ${s.length} 项（绿色标记），核对后点「开始分析」`,!0):c("⚠️ 查询成功但没识别到可用数字——请手补；排查可展开下方「原始返回」截图发开发者")}async function Ss(t){const s=String(l.keyword||"").trim();if(!s){c("先在第 2 步填「搜索关键词」，再查结果数");return}if(!m){c("联网查询需要后端在线");return}if(await P({title:"查询搜索结果数",text:`将联网查询关键词「${s}」在 Amazon 的搜索结果数，填进「搜索结果数」一栏。确定查询？`,ok:"查询"})){k(t,!0,"查询中…");try{const a=await fetch(`${h}/api/amz/search`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword:s})}),n=await a.json();if(!a.ok){c(`⚠️ ${n.detail||"查询失败"}`);return}if(n.results==null){c("⚠️ 查询成功但没识别到结果数——请手填，或稍后再试");return}l.results=String(n.results);const i=l.extractMeta;i&&i.api?i.filled.includes("results")||i.filled.push("results"):l.extractMeta={api:!0,at:new Date().toLocaleTimeString(),found:["results"],filled:["results"],warnings:[]},v(),c(`✅ 已填入搜索结果数 ${Number(n.results).toLocaleString("en-US")}`,!0)}catch{c("⚠️ 连不上后端，请确认后端还在运行")}finally{k(t,!1)}}}function Ts(){const t=l.extractMeta;if(!t)return"";const s=l.bsrCategory&&!String(l.keyword||"").trim()?`<button class="chip-x kw" data-action="apply-kw" title="BSR 类目词，点击填入">类目词建议：${r(l.bsrCategory)}</button>`:"",e=t.api?"联网查询":"提取";return`
  <div class="an-extract-meta">
    <span class="chip-x ${t.filled.length?"hit":"miss"}">${t.at} ${e} ${t.found.length} 项 · 填入 ${t.filled.length} 项</span>
    ${s}
    ${t.warnings.map(a=>`<span class="an-extract-warn">⚠️ ${r(a)}</span>`).join("")}
  </div>
  ${t.api&&l.apiRaw?`
  <details class="an-raw-view">
    <summary>原始返回（排查映射用，不用管）</summary>
    <pre>${r(l.apiRaw)}</pre>
  </details>`:""}`}function js(t){const s=l.extractMeta;return s?s.filled.includes(t)?`<span class="chip-x hit">${s.api?"已查询":"提取"}</span>`:It.includes(t)?`<span class="chip-x miss">${s.api?"未取到":"未提取"}</span>`:"":""}async function Is(){if(tt)return;if(!m){c("ASIN 分析需要后端在线——启动方法见页面顶部提示");return}if(!l.asin){c("先在第 1 步解析出 ASIN");return}tt=!0;const t=document.querySelector('[data-action="analyze-submit"]');k(t,!0,"分析中…");try{const s=await fetch(`${h}/api/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({link:l.raw,name:l.name,keyword:l.keyword,price:l.price,rating:l.rating,reviews:l.reviews,bsr:l.bsr,results:l.results,days:l.days})}),e=await s.json();if(!s.ok){c(`⚠️ ${e.detail||"分析失败"}`);return}y=e,T.unshift(e),J=!1,v(),setTimeout(()=>{var a;return(a=document.getElementById("an-report"))==null?void 0:a.scrollIntoView({behavior:"smooth"})},80)}catch{c("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{tt=!1,k(t,!1)}}function Ms(t){const s=T.find(e=>e.id===t);s&&(y=s,U(),(location.hash||"#/")!=="#/analyze"?location.hash="#/analyze":v(),setTimeout(()=>{var e;return(e=document.getElementById("an-report"))==null?void 0:e.scrollIntoView({behavior:"smooth"})},120))}async function _s(t){if(await P({title:"删除这条分析记录？",text:"报告与利润测算存档会一起删除，历史不可恢复。",ok:"删除",danger:!0})){try{const e=await fetch(`${h}/api/analyses/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`)}catch{c("⚠️ 删除失败，请确认后端在线");return}T=T.filter(e=>e.id!==t),(y==null?void 0:y.id)===t&&(y=null),v()}}function Es(t){if(t.confidence==null)return"";const s=t.confidence_level||"—",e=t.confidence>=90?"hi":t.confidence>=75?"mid":t.confidence>=60?"low":"min",a=(t.confidence_hints||[]).join("；");return`<span class="anr-conf ${e}" ${a?`title="${r(a)}"`:""}>置信度 ${t.confidence} · ${r(s)}${(t.inferred||[]).length?` · ${t.inferred.length} 项推补`:""}</span>`}function As(t){const s=t.flags||[];if(!s.length)return"";const e={risk:"⛔",warn:"⚠️",info:"ℹ️"};return`
  <div class="m-label">风险旗标</div>
  <div class="anr-flags">
    ${s.map(a=>`<div class="anr-flag lv-${a.level}"><span class="fi">${e[a.level]||"•"}</span>${r(a.text)}</div>`).join("")}
  </div>`}function Ls(t){const s=t.advice||[];return s.length?`
  <div class="m-label">行动建议</div>
  <ol class="anr-advice">
    ${s.map(e=>`<li>${r(e)}</li>`).join("")}
  </ol>`:""}function Ns(t){return`
  <div id="an-report" class="an-report">
    <div class="anr-top">
      <div>
        <div class="anr-name">${r(t.name)}</div>
        <div class="meta-row">
          <span class="pm pm-amazon">a</span><span>ASIN ${r(t.asin)}</span>·
          <span>关键词「${r(t.keyword)}」</span>
          <span class="chip-soft">${r(t.collected_at)} 采集</span>
          ${Es(t)}
        </div>
      </div>
      <div class="anr-score-wrap">
        <div class="score big">${t.score}<small>/100</small></div>
        <span class="anr-grade ${t.grade_cls}">${r(t.grade)}</span>
      </div>
    </div>
    <div class="anr-est">预估月销 <b>${r(t.est_sales)}</b><small>${r(t.est_sales_note)}</small></div>
    <div class="anr-visual">
      <div class="anr-radar">${Vt(t.dimensions)}</div>
      <div class="anr-dims">
        ${t.dimensions.map(s=>`
        <div class="dim">
          <div class="dim-head"><span>${r(s.label)}</span><span class="dim-val">${Math.round(s.value*100)}</span></div>
          <div class="dim-bar"><i style="width:${Math.min(100,Math.round(s.value*100))}%"></i></div>
          <div class="dim-text">${r(s.text)}</div>
        </div>`).join("")}
      </div>
    </div>
    ${As(t)}
    <div class="m-label">判断依据</div>
    <div class="anr-reason">${t.reason_lines.map(r).join("<br>")}</div>
    ${Ls(t)}
    <div class="anr-risk">⚠️ ${r(t.risk)}</div>
    ${t.profit?Us(t.profit):""}
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="profit-open">利润测算${t.profit?"（修改）":""}</button>
      ${zs(t.id)?'<span class="chip-soft" title="已在立项看板">已立项</span>':'<button class="btn btn-ghost" data-action="project-add">转为立项</button>'}
      <button class="btn btn-ghost" data-action="copy-report">复制报告文本</button>
      <button class="btn btn-ghost" data-action="lf-copywriting" data-id="${t.id}" title="AI 生成开发信 / 跟进邮件 / 推荐文案">AI 写话术</button>
      <button class="btn btn-ghost" data-action="export-pdf" title="备用：浏览器打印另存为 PDF">导出 PDF</button>
    </div>
  </div>`}function Ps(){if(!m)return'<div class="empty slim">历史记录需要后端在线。</div>';if(!T.length)return m&&J?H(4):'<div class="empty slim">还没有分析记录——完成第 1、2 步就会出现第一份报告。</div>';const t=new Set,s=T.filter(a=>!a.asin||t.has(a.asin)?!1:(t.add(a.asin),!0)),e=new Map;return s.forEach(a=>{e.has(a.keyword)||e.set(a.keyword,[]),e.get(a.keyword).push(a)}),[...e.entries()].map(([a,n])=>`
  <div class="an-group">
    <div class="an-group-title"><span class="agt-kw" title="${r(a)}">关键词「${r(a)}」</span><span>${n.length} 个商品</span></div>
    <table class="an-table">
      <thead><tr><th>#</th><th>商品 / ASIN</th><th>机会指数</th><th>等级</th><th>预估月销</th><th>毛利率</th><th>采集时间</th><th></th></tr></thead>
      <tbody>
        ${[...n].sort((i,o)=>o.score-i.score).map((i,o)=>`
        <tr>
          <td>${o+1}</td>
          <td>
            <div class="agt-name" data-action="open-analysis" data-id="${i.id}" title="${r(i.name)}（点击查看完整报告）">${r(i.name)}${(i.inferred||[]).length?'<span class="dot-infer" title="含推补值（部分数字缺省推断）"></span>':""}</div>
            <div class="agt-asin">ASIN ${r(i.asin)}</div>
          </td>
          <td><span class="score sm">${i.score}</span></td>
          <td><span class="chip-soft ${i.grade_cls}">${r(i.grade)}</span></td>
          <td>${r(i.est_sales)}</td>
          <td>${i.profit?`<span class="rm-sub ${i.profit.result.verdict_cls}">${i.profit.result.margin}%</span>`:'<span class="rm-sub flat">未测算</span>'}</td>
          <td class="agt-time">${r(i.collected_at)}</td>
          <td><button class="btn btn-danger btn-sm" data-action="del-analysis" data-id="${i.id}">删除</button></td>
        </tr>`).join("")}
      </tbody>
    </table>
  </div>`).join("")}function Cs(){return dt(),pt(),`
  <div class="page-head">
    <h1>ASIN 分析 <span class="an-live-chip">真实数据</span></h1>
    <p>输入链接或 ASIN → 联网查询自动填表 → 核对清单 → 五维评分报告。缺数按中性口径推补并标注置信度，评分公式全程透明可调；整页粘贴与手动填写保留为备用通道。</p>
  </div>
  ${m?"":R()}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">1</span>
      <div class="an-step-title"><b>输入商品</b><span>支持完整链接（含 /dp/B0… 部分）或直接输入 10 位 ASIN</span></div>
    </div>
    <div class="an-parse-row">
      <input id="an-raw" class="input af-input grow" data-field="raw" autocomplete="off"
             placeholder="https://www.amazon.com/dp/B0… 或 B0ABCDEFGHI"
             value="${r(l.raw)}" ${l.asin?"disabled":""}>
      ${l.asin?`<span class="an-asin-ok">ASIN ${r(l.asin)}（${r(l.source)}）</span>
           <button class="btn btn-ghost" data-action="reset-asin">重新输入</button>`:'<button class="btn btn-soft" data-action="parse-asin">解析</button>'}
    </div>
    ${l.parseError?`<div class="an-err">⚠️ ${r(l.parseError)}</div>`:""}
    ${l.asin?`
    <div class="an-api-box">
      <div class="an-api-text">
        <b>直接分析 · 联网查询</b>
        <span>点一下自动取该商品的公开数据（标题、价格、评分、评论、BSR）填进第 2 步清单——不用打开 Amazon 抄数。查到的数字仍可逐项修改。</span>
      </div>
      <button class="btn btn-primary" data-action="amz-detail">查询商品数据</button>
    </div>`:""}
    <div class="an-paste">
      <div class="an-paste-label">
        <b>备用通道 · 整页粘贴</b>
        <span>打开 amazon.com 商品页 → Ctrl+A 全选 → Ctrl+C 复制 → 粘贴到这里 → 点「自动提取」。识别 ASIN + 预填全部数字，绿的已填、琥珀的没认出来再手补。粘贴内容只用于提取，不保存。</span>
      </div>
      <textarea class="input af-input an-paste-ta" data-field="paste" rows="3"
        placeholder="商品页整页文字粘到这里（也认搜索页——只提取结果数）">${r(l.paste)}</textarea>
      <div class="an-paste-row">
        <button class="btn btn-soft" data-action="extract-paste">自动提取</button>
        ${Ts()}
      </div>
    </div>
  </section>
  ${l.asin?`
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">2</span>
      <div class="an-step-title"><b>核对采集清单 —— 数字不全也没关系</b><span>提取值会自动带进来；缺的数系统按中性市场推补继续算，报告挂「置信度」如实打折</span></div>
      <button class="btn btn-ghost btn-sm" data-action="fill-sample">填入示例数据</button>
    </div>
    <div class="an-grid">
      ${hs.map(t=>`
      <div class="field">
        <label>${t.label} ${js(t.key)}</label>
        <input class="input af-input" data-field="${t.key}" placeholder="${r(t.ph)}" value="${r(l[t.key]??"")}">
        <div class="f-hint">${t.hint}</div>
      </div>`).join("")}
    </div>
    <div class="an-actions">
      <button class="btn btn-primary" data-action="analyze-submit">开始分析</button>
      <button class="btn btn-ghost" data-action="amz-search" title="用「搜索关键词」联网查 Amazon 搜索结果数，自动填进上面">查搜索结果数</button>
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
    ${Ns(y)}
  </section>`:""}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">4</span>
      <div class="an-step-title"><b>历史与类目对比</b><span>同一关键词下的多个 ASIN 自动归成一类，按机会指数排序</span></div>
    </div>
    ${Ps()}
  </section>`}function D(t){document.getElementById("modal-root").innerHTML=`
    <div class="modal-backdrop">
      <div class="modal">${t}</div>
    </div>`}function U(){if(document.getElementById("modal-root").innerHTML="",z){const t=z;z=null,t(null)}}let z=null;function P({title:t,text:s,ok:e="确定",danger:a=!1}){return new Promise(n=>{var i;z=n,D(`
      <div class="dlg">
        <h3>${r(t)}</h3>
        <p class="dlg-text">${r(s)}</p>
        <div class="m-actions dlg-actions">
          <button class="btn btn-ghost" data-action="dialog-cancel">取消</button>
          <button class="btn ${a?"btn-danger":"btn-primary"}" data-action="dialog-ok" id="dlg-ok">${r(e)}</button>
        </div>
      </div>`),(i=document.getElementById("dlg-ok"))==null||i.focus()})}function _t({title:t,text:s,label:e,value:a="",ok:n="保存"}){return new Promise(i=>{z=i,D(`
      <div class="dlg">
        <h3>${r(t)}</h3>
        <p class="dlg-text">${r(s)}</p>
        <div class="field">
          <label>${r(e)}</label>
          <input id="dlg-input" class="input" value="${r(a)}" maxlength="200" autocomplete="off">
        </div>
        <div class="m-actions dlg-actions">
          <button class="btn btn-ghost" data-action="dialog-cancel">取消</button>
          <button class="btn btn-primary" data-action="dialog-ok" id="dlg-ok">${r(n)}</button>
        </div>
      </div>`);const o=document.getElementById("dlg-input");o==null||o.focus(),o==null||o.select()})}function lt(t){const s=z;z=null,document.getElementById("modal-root").innerHTML="",s&&s(t)}function k(t,s,e="处理中…"){t&&(s?(t.dataset.label=t.textContent,t.textContent=e,t.classList.add("is-loading")):(t.textContent=t.dataset.label||t.textContent,t.classList.remove("is-loading")))}function Bs(){D(`
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
    <div class="m-note">全部数据为人工采集，存储在本地后端（api/pipeline/generated），不连接任何平台、不上传云端。</div>`)}function Fs(t){return`
  <div class="pr-page">
    <div class="pr-head">
      <div class="pr-brand">选品罗盘 · 选品分析报告</div>
      <div class="pr-time">生成于 ${r(t.collected_at)} · Amazon 美国站</div>
    </div>
    <h1 class="pr-name">${r(t.name)}</h1>
    <div class="pr-meta">ASIN ${r(t.asin)} · 关键词「${r(t.keyword)}」</div>
    <div class="pr-score-row">
      <div class="pr-score">${t.score}<small>/100</small></div>
      <div>
        <div class="pr-grade">${r(t.grade)}</div>
        <div class="pr-sales">预估月销 ${r(t.est_sales)}（${r(t.est_sales_note)}）</div>
        ${t.confidence!=null?`<div class="pr-conf">数据置信度 ${t.confidence}/100（${r(t.confidence_level)}）${(t.inferred||[]).length?` · 推补 ${(t.inferred||[]).length} 项`:""}</div>`:""}
      </div>
    </div>
    <table class="pr-dims">
      ${t.dimensions.map(s=>`
      <tr>
        <td class="pr-dim-label">${r(s.label)}</td>
        <td class="pr-dim-bar"><i style="width:${Math.min(100,Math.round(s.value*100))}%"></i></td>
        <td class="pr-dim-score">${Math.round(s.value*100)}</td>
        <td class="pr-dim-text">${r(s.text)}</td>
      </tr>`).join("")}
    </table>
    ${(t.flags||[]).length?`
    <div class="pr-sec">风险旗标</div>
    ${(t.flags||[]).map(s=>`<p class="pr-line pr-flag-${s.level}">· ${r(s.text)}</p>`).join("")}`:""}
    <div class="pr-sec">判断依据</div>
    ${t.reason_lines.map(s=>`<p class="pr-line">· ${r(s)}</p>`).join("")}
    ${(t.advice||[]).length?`
    <div class="pr-sec">行动建议</div>
    ${(t.advice||[]).map(s=>`<p class="pr-line">· ${r(s)}</p>`).join("")}`:""}
    <p class="pr-risk">⚠️ ${r(t.risk)}</p>
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
    <p class="pr-line">${r(t.profit.result.verdict)}</p>`:""}
    <div class="pr-foot">选品罗盘 · 人工智能提供证据，团队保留最终判断</div>
  </div>`}function Hs(){y&&(document.getElementById("print-area").innerHTML=Fs(y),window.print())}function Os(t){const s=a=>"▮".repeat(Math.round(a*10)).padEnd(10,"▯"),e=["📊 选品分析报告 · 选品罗盘",`商品：${t.name}`,`ASIN：${t.asin}（amazon.com）`,`关键词：${t.keyword}`,`采集时间：${t.collected_at}`,"",`机会指数：${t.score} / 100 —— ${t.grade}`,`预估月销：${t.est_sales}`];return t.confidence!=null&&e.push(`数据置信度：${t.confidence}/100（${t.confidence_level}）${(t.inferred||[]).length?` · 推补 ${(t.inferred||[]).length} 项`:""}`),e.push("","五维评估：",...t.dimensions.map(a=>`· ${a.label} ${s(a.value)} ${Math.round(a.value*100)} —— ${a.text}`)),(t.flags||[]).length&&e.push("","风险旗标：",...(t.flags||[]).map(a=>`· ${a.text}`)),e.push("","判断依据：",...t.reason_lines.map(a=>`· ${a}`)),(t.advice||[]).length&&e.push("","行动建议：",...(t.advice||[]).map(a=>`· ${a}`)),e.push("",`⚠️ ${t.risk}`,"—— 选品罗盘 生成"),e.join(`
`)}async function Rs(){if(!y)return;const t=Os(y);try{await navigator.clipboard.writeText(t),c("✅ 报告文本已复制，可直接粘贴给客户",!0)}catch{const s=document.createElement("textarea");s.value=t,document.body.appendChild(s),s.select();try{document.execCommand("copy"),c("✅ 报告文本已复制",!0)}catch{c("⚠️ 复制失败，请手动选中报告内容复制")}s.remove()}}const zs=t=>S.some(s=>s.analysis_id===t);function Us(t){const s=t.result;return`
  <div class="profit-strip ${s.verdict_cls}">
    <b>利润测算</b>
    <span>毛利率 <b>${s.margin}%</b></span>
    <span>单件毛利 $${s.profit_per}</span>
    ${s.monthly_profit!=null?`<span>月利润 <b>$${Math.round(s.monthly_profit).toLocaleString("en-US")}</b></span>`:""}
    <span class="pv">${r(s.verdict)}</span>
  </div>`}function bt(t){var o;const s=(t==null?void 0:t.input)||{},e=((o=t==null?void 0:t.profit)==null?void 0:o.inputs)||{},a=(t==null?void 0:t.est_sales)||"",n=((t==null?void 0:t.inferred)||[]).includes("price"),i=[["pf-price","售价（美元）",e.price??s.price??"",n?"⚠️ 带入的是推补价格（$12.99 中性假设）——请先在商品页核实真实售价":"默认带入商品售价"],["pf-purchase","采购成本/件",e.purchase??"","供应商报价 + 国内运费"],["pf-inbound","头程物流/件",e.inbound??"","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费/件",e.fba??"","按尺寸重量，用亚马逊物流计算器查"],["pf-other","其他成本/件",e.other??0,"包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率 %",e.ref_pct??15,"大部分类目 15%"],["pf-monthly","预估月销量",e.monthly??"",a?`报告预估：${a}`:"填写后估算月利润"]];D(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>${t?`利润测算 · ${r(t.name)}`:"快速利润测算"}</h3>
    <p class="m-sub">FBA 毛利模型：售价 − 佣金 − FBA − 采购 − 头程 − 其他。改动任一数字，下方实时重算。</p>
    <div class="an-grid">
      ${i.map(([d,u,j,M])=>`
      <div class="field">
        <label>${u}</label>
        <input id="${d}" class="input pf-input" value="${r(String(j??""))}" placeholder="0" autocomplete="off">
        <div class="f-hint">${r(M)}</div>
      </div>`).join("")}
    </div>
    <div id="pf-result" class="pf-result"></div>
    <div class="m-actions">
      ${t?'<button class="btn btn-primary" data-action="profit-save">存入报告</button>':""}
      <button class="btn btn-ghost" data-action="close-modal">关闭</button>
    </div>
    ${t?'<div class="m-note">测算结果随报告存档，自动同步到类目简报；已立项的项目会更新看板毛利率。</div>':'<div class="m-note">快速测算不保存；需要在报告里留档时，请从 ASIN 分析报告页进入。</div>'}`),ut()}function ut(){const t=document.getElementById("pf-result");if(!t)return;const s=B=>{var f;return parseFloat(String(((f=document.getElementById(B))==null?void 0:f.value)||"").replace(/,/g,""))},e=s("pf-price"),a=s("pf-purchase"),n=s("pf-inbound"),i=s("pf-fba"),o=Number.isFinite(s("pf-other"))?s("pf-other"):0,d=s("pf-ref_pct")||15,u=s("pf-monthly")||0;if(!([e,a,n,i].every(Number.isFinite)&&e>0)){t.innerHTML=`
      <div class="pf-tiles">
        <div class="pf-tile"><span>单件毛利</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>毛利率</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>保本售价</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>月利润</span><b class="mut">—</b></div>
      </div>
      <div class="pf-verdict muted">填完上方 售价 / 采购 / 头程 / FBA 四项，这里实时出结果</div>`;return}const M=e*d/100,_=a+n+i+o,b=e-_-M,$=b/e*100,w=d<100?_/(1-d/100):null,I=u>0?b*u:null,C=$>=30?"up":$>=20?"flat":"down",nt=$>=30?`毛利率 ${$.toFixed(0)}%，达到优秀线（≥30%），值得推进`:$>=20?`毛利率 ${$.toFixed(0)}%，可做，需控制物流与推广成本`:`毛利率 ${$.toFixed(0)}%，低于红线 20%，建议重新谈价、换头程方案或提高售价`,Z=[["佣金",M,"#8fb3f7"],["FBA",i,"#5b8def"],["采购",a,"#2563eb"],["头程",n,"#1e40af"],["其他",o,"#a8b2c3"]].filter(B=>B[1]>.004);b>0&&Z.push(["毛利",b,"#1f9d61"]),t.innerHTML=`
    <div class="pf-tiles">
      <div class="pf-tile"><span>单件毛利</span><b class="${C}">$${b.toFixed(2)}</b></div>
      <div class="pf-tile"><span>毛利率</span><b class="${C}">${$.toFixed(1)}%</b></div>
      <div class="pf-tile"><span>保本售价</span><b>${w!=null?`$${w.toFixed(2)}`:"—"}</b></div>
      <div class="pf-tile"><span>月利润</span><b>${I!=null?`$${Math.round(I).toLocaleString("en-US")}`:"—"}</b></div>
    </div>
    <div class="pf-verdict ${C}">${nt}</div>
    <div class="pf-costbar">
      <div class="pf-bar">${Z.map(([B,f,L])=>`<i style="width:${Math.max(0,Math.min(100,f/e*100)).toFixed(1)}%;background:${L}"></i>`).join("")}</div>
      <div class="pf-costlegend">${Z.map(([B,f,L])=>`<em><i style="background:${L}"></i>${B} $${f.toFixed(2)}</em>`).join("")}</div>
    </div>`}async function Ds(){if(!y||!m){c("需要后端在线");return}const t=e=>{var a;return(((a=document.getElementById(e))==null?void 0:a.value)||"").trim()},s=document.querySelector('[data-action="profit-save"]');k(s,!0,"保存中…");try{const e=await fetch(`${h}/api/analyses/${y.id}/profit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({price:t("pf-price"),purchase:t("pf-purchase"),inbound:t("pf-inbound"),fba:t("pf-fba"),other:t("pf-other"),ref_pct:t("pf-ref_pct"),monthly:t("pf-monthly")})}),a=await e.json();if(!e.ok){c(`⚠️ ${a.detail||"保存失败"}`);return}const n=T.findIndex(o=>o.id===a.id);n>=0&&(T[n]=a),(y==null?void 0:y.id)===a.id&&(y=a),J=!1,U(),c("✅ 利润测算已存入报告",!0);const i=S.find(o=>o.analysis_id===a.id);i?ft(i.id,{margin:a.profit.result.margin}):v()}catch{c("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{k(s,!1)}}const N=["待评估","测算中","已立项","样品中","已放弃"];function qs(){return pt(),S.length?`
  <div class="page-head">
    <h1>立项看板</h1>
    <p>共 ${S.length} 个项目 · 阶段推进与备注随手记，跟进进度一目了然。</p>
  </div>
  ${m?"":R()}
  <div class="pj-board">
    ${N.map(t=>Gs(t,S.filter(s=>s.stage===t))).join("")}
  </div>`:`
    <div class="page-head">
      <h1>立项看板</h1>
      <p>从 ASIN 分析转入的跟进项目——测算利润、推进样品，每个机会都不跟丢。</p>
    </div>
    ${m?"":R()}
    <div class="empty">看板还是空的——在「ASIN 分析」的报告页点「转为立项」，通过验证的机会会出现在这里。</div>
    <section class="an-card onboard">
      <b>这一环怎么用</b>
      <ol>
        <li>雷达发现类目机会，用「ASIN 分析」验证具体单品</li>
        <li>报告页点「转为立项」，项目以「待评估」进入看板</li>
        <li>完成利润测算 → 用 ← / → 推进阶段，随时点「备注」记录供应商与报价</li>
      </ol>
      <a class="btn btn-primary" href="#/analyze">去 ASIN 分析</a>
    </section>`}function Gs(t,s){return`
  <div class="pj-col ${t==="已放弃"?"dead":""}">
    <div class="pj-col-head">${t}<span>${s.length}</span></div>
    ${s.map(Js).join("")||'<div class="pj-empty">暂无项目</div>'}
  </div>`}function Js(t){const s=N.indexOf(t.stage),e=s>0?N[s-1]:null,a=s>=0&&s<N.length-1?N[s+1]:null,n=t.margin!=null?`<span class="rm-sub ${t.margin>=30?"up":t.margin>=20?"flat":"down"}">毛利 ${t.margin}%</span>`:'<button class="pj-mini" data-action="quick-profit" title="还没测算过利润">未测算</button>';return`
  <div class="pj-card">
    <div class="pj-name" data-action="open-analysis" data-id="${t.analysis_id}" title="点击回看分析报告">${r(t.name)}</div>
    <div class="pj-meta">ASIN ${r(t.asin)} · ${r(t.keyword)}</div>
    <div class="pj-chips">
      <span class="chip-soft ${t.grade_cls}">指数 ${t.score}</span>
      ${n}
    </div>
    ${t.note?`<div class="pj-note">${r(t.note)}</div>`:""}
    <div class="pj-ops">
      ${e?`<button class="pj-arrow" data-action="project-move" data-id="${t.id}" data-dir="back" title="退回：${e}">←</button>`:"<span></span>"}
      <button class="pj-mini" data-action="project-note" data-id="${t.id}">备注</button>
      <button class="pj-mini danger" data-action="project-del" data-id="${t.id}">删除</button>
      ${a?`<button class="pj-arrow" data-action="project-move" data-id="${t.id}" data-dir="next" title="推进：${a}">→</button>`:"<span></span>"}
    </div>
    <div class="pj-time">更新于 ${r(t.updated_at)}</div>
  </div>`}async function ft(t,s){try{const e=await fetch(`${h}/api/projects/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),a=await e.json();if(!e.ok)return c(`⚠️ ${a.detail||"更新失败"}`),null;const n=S.findIndex(i=>i.id===t);return n>=0&&(S[n]=a),st=!1,v(),a}catch{return c("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function Ks(t,s){const e=S.find(d=>d.id===t);if(!e)return;const n=N.indexOf(e.stage)+(s==="next"?1:-1);if(n<0||n>=N.length)return;const i=N[n];if(i==="已放弃"&&!await P({title:"标记为「已放弃」？",text:"不会删除记录，也不影响 ASIN 分析；之后可用 ← 按钮退回上一阶段。",ok:"确认放弃"}))return;await ft(t,{stage:i})&&c(`已移到「${i}」`,!0)}async function Zs(t){const s=S.find(a=>a.id===t);if(!s)return;const e=await _t({title:"项目备注",text:"记录供应商、报价、样品进度……随时可改。",label:"备注（200 字内）",value:s.note||""});e!==null&&ft(t,{note:e})}async function Ws(){if(!y||!m){c("需要后端在线");return}try{const t=await fetch(`${h}/api/projects`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysis_id:y.id})}),s=await t.json();if(!t.ok){c(`⚠️ ${s.detail||"转入失败"}`);return}S.unshift(s),st=!1,v(),c("✅ 已转入立项看板（待评估）",!0)}catch{c("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}async function Xs(t){const s=S.find(a=>a.id===t);if(!(!s||!await P({title:`从看板删除「${s.name}」？`,text:"只删除看板卡片，不影响 ASIN 分析记录。",ok:"删除",danger:!0}))){try{const a=await fetch(`${h}/api/projects/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{c("⚠️ 删除失败，请确认后端在线");return}S=S.filter(a=>a.id!==t),v()}}function Vs(){const t=[["pf-price","售价","$","目标卖价，如 29.99"],["pf-purchase","采购成本","$/件","供应商报价 + 国内运费"],["pf-inbound","头程物流","$/件","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费","$/件","按尺寸重量，用亚马逊物流计算器查"]],s=[["pf-other","其他成本","$/件","包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率","%","大部分类目 15"],["pf-monthly","预估月销量","件","填了多一行月利润"]];return setTimeout(ut,0),`
  <div class="page-head">
    <h1>利润计算器</h1>
    <p>FBA 毛利模型：售价 − 佣金 − 配送费 − 采购 − 头程 − 其他。改任一数字，结果实时重算。</p>
  </div>
  ${m?"":R()}
  <section class="an-card">
    <div class="pf-sec-label">成本输入<span>前 4 项必填</span></div>
    <div class="pf-row pf-row-4">${t.map($t).join("")}</div>
    <div class="pf-sec-label">可选参数<span>有数就算，没数按默认</span></div>
    <div class="pf-row pf-row-3">${s.map($t).join("")}</div>
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
  </section>`}function $t([t,s,e,a]){return`
  <div class="field">
    <label>${s}</label>
    <div class="pf-inbox">
      <input id="${t}" class="input pf-input" placeholder="0" autocomplete="off">
      <span class="pf-unit">${e}</span>
    </div>
    <div class="f-hint">${a}</div>
  </div>`}function Qs(){return zt(),`
  <div class="page-head ph-row">
    <div>
      <h1>供应商库</h1>
      <p>谈完一家记一家——报价、起订量、联系方式集中在这里，立项后找货不翻聊天记录。</p>
    </div>
    <div class="ph-actions">
      <button class="btn btn-primary btn-sm" data-action="supplier-add">＋ 供应商</button>
    </div>
  </div>
  ${m?"":R()}
  ${E.length?`
  <section class="an-card" style="padding:4px 14px">
    <table class="an-table">
      <thead><tr><th>供应商</th><th>主营类目</th><th>当前报价</th><th>起订量</th><th>联系方式</th><th>备注</th><th>更新</th><th></th></tr></thead>
      <tbody>
        ${E.map(t=>`
        <tr>
          <td><div class="agt-name">${r(t.name)}</div></td>
          <td>${r(t.category)||'<span class="rm-sub flat">—</span>'}</td>
          <td>${t.quote?`<b>${r(t.quote)}</b>`:'<span class="rm-sub flat">未报价</span>'}</td>
          <td>${r(t.moq)||'<span class="rm-sub flat">—</span>'}</td>
          <td>${r(t.contact)||'<span class="rm-sub flat">—</span>'}</td>
          <td class="sp-note">${r(t.note)||'<span class="rm-sub flat">—</span>'}</td>
          <td class="agt-time">${r(t.updated_at)}</td>
          <td class="row-actions">
            <button class="pj-mini" data-action="supplier-quote" data-id="${t.id}">改报价</button>
            <button class="pj-mini" data-action="supplier-note" data-id="${t.id}">备注</button>
            <button class="pj-mini danger" data-action="supplier-del" data-id="${t.id}">删除</button>
          </td>
        </tr>`).join("")}
      </tbody>
    </table>
  </section>`:m&&W?`<section class="an-card">${H(4)}</section>`:'<div class="empty">还没有供应商记录——谈完第一家就记进来：名称、报价、起订量。</div>'}`}function Ys(){if(!m){c("需要后端在线——启动方法见页面提示");return}D(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>添加供应商</h3>
    <p class="m-sub">只有名称必填，其余谈完随时补。</p>
    <div class="an-grid">
      ${[["sp-name","供应商名称（必填）","如：宁波某某家居用品厂"],["sp-category","主营类目","如：宠物窝垫 / 厨房收纳"],["sp-quote","当前报价","如 $8.5/件 或 62元/件"],["sp-moq","起订量","如 500"],["sp-contact","联系方式","微信 / 电话 / 1688 店铺名"],["sp-note","备注","打样费、交期、账期、配合度……"]].map(([s,e,a])=>`
      <div class="field">
        <label>${e}</label>
        <input id="${s}" class="input sp-input" placeholder="${r(a)}" autocomplete="off">
      </div>`).join("")}
    </div>
    <div class="m-actions">
      <button class="btn btn-primary" data-action="supplier-save">保存</button>
    </div>`)}async function Et(){const t=e=>{var a;return(((a=document.getElementById(e))==null?void 0:a.value)||"").trim()};if(!t("sp-name")){c("供应商名称不能为空");return}const s=document.querySelector('[data-action="supplier-save"]');k(s,!0,"保存中…");try{const e=await fetch(`${h}/api/suppliers`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t("sp-name"),category:t("sp-category"),quote:t("sp-quote"),moq:t("sp-moq"),contact:t("sp-contact"),note:t("sp-note")})}),a=await e.json();if(!e.ok){c(`⚠️ ${a.detail||"保存失败"}`);return}E.unshift(a),W=!1,U(),c("✅ 已记录供应商",!0),v()}catch{c("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{k(s,!1)}}async function ta(t,s){try{const e=await fetch(`${h}/api/suppliers/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),a=await e.json();if(!e.ok)return c(`⚠️ ${a.detail||"更新失败"}`),null;const n=E.findIndex(i=>i.id===t);return n>=0&&(E[n]=a),W=!1,v(),a}catch{return c("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function gt(t,s,e,a){const n=E.find(o=>o.id===t);if(!n)return;const i=await _t({title:e,text:`${n.name} 的当前${a}，直接改成新内容。`,label:a,value:n[s]||""});i!==null&&await ta(t,{[s]:i})&&c("已更新",!0)}async function sa(t){const s=E.find(a=>a.id===t);if(!(!s||!await P({title:`删除「${s.name}」？`,text:"这条供应商记录会一起删掉，不可恢复。",ok:"删除",danger:!0}))){try{const a=await fetch(`${h}/api/suppliers/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{c("⚠️ 删除失败，请确认后端在线");return}E=E.filter(a=>a.id!==t),v()}}function At(t){const s=t.rounds[t.rounds.length-1],e=t.rounds[t.rounds.length-2]||null,a=T.filter(u=>(u.keyword||"").toLowerCase()===t.keyword.toLowerCase()).sort((u,j)=>j.score-u.score),n=a.filter(u=>u.profit),i=n.length?n.reduce((u,j)=>j.profit.result.margin>u.profit.result.margin?j:u):null,o=e?s.score>e.score?`机会指数较上轮上升 ${s.score-e.score} 分`:s.score<e.score?`机会指数较上轮下降 ${e.score-s.score} 分`:"机会指数与上轮持平":"首轮采集，暂无趋势",d=[`关键词「${t.keyword}」当前 ${s.grade}（机会指数 ${s.score}/100），${o}。`,a.length?`已深度分析 ${a.length} 个相关 ASIN，最高机会指数 ${Math.max(...a.map(u=>u.score))}${i?`，测算毛利率最高 ${i.profit.result.margin}%（${i.name}）`:""}。`:"尚未对该关键词下的具体商品做深度分析，建议先对头部商品跑一轮 ASIN 分析。",s.grade_cls!=="g-c"?"建议：维持当前监控节奏，优先对头部商品完成 ASIN 分析与利润测算，达到立项标准即转入看板跟进。":"建议：该类目当前竞争或需求信号偏弱，保持低频监控，暂不投入选品资源。"];return{cur:s,prev:e,related:a,trend:o,conclusion:d}}function aa(t){const s=T.filter(e=>(e.keyword||"").toLowerCase()===t.toLowerCase()).sort((e,a)=>a.score-e.score);return s.length?s.map(e=>`
    <div class="rel-row" data-action="open-analysis" data-id="${e.id}" role="button" tabindex="0">
      <div class="rel-main">
        <div class="rel-name">${r(e.name)}</div>
        <div class="rel-meta">ASIN ${r(e.asin)}${e.profit?` · 毛利率 ${e.profit.result.margin}%`:""}</div>
      </div>
      <div class="rel-bar"><i style="width:${e.score}%"></i></div>
      <b class="rel-score">${e.score}</b>
    </div>`).join(""):'<div class="empty slim">该关键词下还没有 ASIN 分析——用「ASIN 分析」页对头部商品跑一份。</div>'}function Lt(t){const s=x.keywords.find(u=>u.id===t);if(!s||!s.rounds.length){c("这个关键词还没有采集轮次，先完成第 1 轮");return}const{cur:e,prev:a,related:n,trend:i,conclusion:o}=At(s),d=[{name:s.keyword,points:s.rounds.map(u=>u.score)}];document.getElementById("modal-root").innerHTML=`
  <div class="modal-backdrop drawer-on">
    <div class="drawer">
      <div class="dr-head">
        <div>
          <div class="dr-kw">${r(s.keyword)}</div>
          <div class="dr-sub">共 ${s.rounds.length} 轮采集 · 最新 ${r(e.collected_at)} · ${r(i)}</div>
        </div>
        <div class="dr-head-right">
          <span class="anr-grade ${e.grade_cls}">${r(e.grade)}</span>
          <button class="m-close" data-action="close-modal">✕</button>
        </div>
      </div>

      <div class="dr-score-row">
        ${Xt(e.score)}
        <div class="dr-score-facts">
          <div class="dr-fact"><b>${e.score}</b><span>当前指数</span></div>
          <div class="dr-fact"><b>${a?e.score>a.score?"↑":e.score<a.score?"↓":"→":"—"}</b><span>较上轮</span></div>
          <div class="dr-fact"><b>${s.rounds.length}</b><span>采集轮次</span></div>
          <div class="dr-fact"><b>${n.length}</b><span>相关 ASIN</span></div>
        </div>
      </div>

      <div class="m-label">机会指数走势</div>
      <div class="dr-chart">${Tt(d,{h:190})}</div>

      <div class="m-label">最新一轮核心指标</div>
      <div class="kcard-metrics">
        ${O("搜索结果",e.results,a==null?void 0:a.results,A,"down")}
        ${O("头部 BSR",e.bsr,a==null?void 0:a.bsr,K,"down")}
        ${O("头部评论",e.reviews,a==null?void 0:a.reviews,A,"up")}
        ${O("头部价格",e.price,a==null?void 0:a.price,xt,null)}
      </div>

      <div class="m-label">判断依据（最新一轮）</div>
      <div class="anr-reason">${e.reason_lines.map(r).join("<br>")}</div>

      <div class="m-label">相关 ASIN 分析（${n.length}）</div>
      ${aa(s.keyword)}

      <div class="m-label">综合结论</div>
      <div class="anr-reason dr-conclusion">${o.map(r).join("<br><br>")}</div>

      <div class="dr-actions">
        <button class="btn btn-primary" data-action="collect-open" data-id="${s.id}">采集下一轮</button>
        <button class="btn btn-ghost" data-action="brief-export" data-id="${s.id}">简报 PDF（备用）</button>
      </div>
    </div>
  </div>`}function ea(t){const s=x.keywords.find(e=>e.id===t);if(!s||!s.rounds.length){c("这个关键词还没有采集轮次，先完成第 1 轮");return}document.getElementById("print-area").innerHTML=na(s),window.print()}function na(t){const{cur:s,related:e,trend:a,conclusion:n}=At(t);return`
  <div class="pr-page">
    <div class="pr-head">
      <div class="pr-brand">选品罗盘 · 类目机会简报</div>
      <div class="pr-time">生成于 ${r(s.collected_at)} · Amazon 美国站</div>
    </div>
    <h1 class="pr-name">关键词「${r(t.keyword)}」</h1>
    <div class="pr-meta">共 ${t.rounds.length} 轮采集 · 最新一轮 ${r(s.collected_at)}</div>
    <div class="pr-score-row">
      <div class="pr-score">${s.score}<small>/100</small></div>
      <div>
        <div class="pr-grade">${r(s.grade)}</div>
        <div class="pr-sales">${r(a)}</div>
      </div>
    </div>
    <div class="pr-sec">最新一轮核心指标</div>
    <table class="pr-table">
      <tr><th>搜索结果数</th><th>头部 BSR</th><th>头部评论</th><th>头部价格</th><th>评论距今</th></tr>
      <tr><td>${A(s.results)}</td><td>${K(s.bsr)}</td><td>${A(s.reviews)}</td><td>$${s.price}</td><td>${s.days} 天</td></tr>
    </table>
    <div class="pr-sec">采集历史（近 8 轮）</div>
    <table class="pr-table">
      <tr><th>轮次</th><th>时间</th><th>指数</th><th>评级</th><th>结果数</th><th>BSR</th></tr>
      ${[...t.rounds].slice(-8).reverse().map(i=>`
      <tr><td>第 ${i.round_no} 轮</td><td>${r(i.collected_at)}</td><td><b>${i.score}</b></td><td>${r(i.grade.split(" · ")[0])}</td><td>${A(i.results)}</td><td>${K(i.bsr)}</td></tr>`).join("")}
    </table>
    <div class="pr-sec">判断依据（最新一轮）</div>
    ${s.reason_lines.map(i=>`<p class="pr-line">· ${r(i)}</p>`).join("")}
    ${e.length?`
    <div class="pr-sec">相关 ASIN 分析（${e.length}）</div>
    <table class="pr-table">
      <tr><th>商品</th><th>ASIN</th><th>机会指数</th><th>毛利率</th></tr>
      ${e.map(i=>`
      <tr><td>${r(i.name)}</td><td>${r(i.asin)}</td><td>${i.score}</td><td>${i.profit?i.profit.result.margin+"%":"—"}</td></tr>`).join("")}
    </table>`:""}
    <div class="pr-sec">综合结论</div>
    ${n.map(i=>`<p class="pr-line">· ${r(i)}</p>`).join("")}
    <div class="pr-foot">选品罗盘 · 数据为人工采集的公开信息 · 人工智能提供证据，团队保留最终判断</div>
  </div>`}const Nt=[{kind:"cutout",name:"自动抠图",desc:"商品抠图 / 白底图"},{kind:"sceneFission",name:"场景裂变",desc:"同款商品换场景"},{kind:"similarFission",name:"相似图裂变",desc:"裂变相似新款图"},{kind:"imageEdit",name:"智能修图",desc:"一句话改图（多模型）"},{kind:"changeModel",name:"换模特",desc:"服装图一键换模特"}],p={fn:"cutout",imageUrl:"",pickTarget:"imageUrl",params:{subType:"3",clothClass:"",strength:"0.5",fissionMode:"SCENE_FISSION_REALISTIC",weight:"2",scale:"1:1",provider:"KONTEXT",modelHeadImageUrl:"",sceneImgUrl:"",sceneStrength:"0.7",modelPrompt:"",customPrompt:"",customNegPrompt:"",genOriRes:"false",realModel:"true",outputNum:"1",note:""},tasks:[],tasksStale:!0};let Y=null,F=null,Pt="";async function ia(){if(m)try{const t=await fetch(`${h}/api/linkfox/tasks`);if(!t.ok)return;p.tasks=(await t.json()).tasks||[],p.tasksStale=!1}catch{}}function ra(){Y||(Y=setInterval(async()=>{if((location.hash||"")!=="#/studio"){clearInterval(Y),Y=null;return}const t=p.tasks.filter(e=>e.status===1||e.status===2);if(!t.length)return;let s=!1;for(const e of t)try{const a=e.kind==="text"?"text":"task",n=await fetch(`${h}/api/linkfox/${a}/${e.task_id}`,{method:"POST"});if(!n.ok)continue;const i=await n.json(),o=p.tasks.findIndex(d=>d.task_id===e.task_id);o>=0&&(i.status!==p.tasks[o].status||(i.images||[]).length!==(p.tasks[o].images||[]).length||(i.content||"")!==(p.tasks[o].content||""))&&(p.tasks[o]={...p.tasks[o],...i},s=!0)}catch{}s&&v()},1e4))}function oa(){return p.tasksStale&&ia().then(()=>{location.hash==="#/studio"&&v()}),ra(),`
  <div class="page-head">
    <h1>AI 作图工坊</h1>
    <p>白底图、场景图、模特图、一句话修图——上传商品图，选好样式一键生成。</p>
  </div>
  ${m?"":R()}
  <section class="sf-card">
    <div class="sf-sec-title">选择功能</div>
    <div class="sf-fns">${Nt.map(t=>`
      <button class="sf-fn ${p.fn===t.kind?"on":""}" data-action="sf-set-fn" data-id="${t.kind}">
        <b>${t.name}</b><small>${t.desc}</small>
      </button>`).join("")}
    </div>
    ${ca()}
  </section>
  <section class="sf-card">
    <div class="sf-sec-title">任务记录 <span>结果图地址 8 小时内有效，过期用「换新地址」；记录最多保留 60 条</span></div>
    ${la()}
  </section>`}const g=(t,s,e="")=>`
  <div class="field">
    <label>${t}</label>
    ${s}
    ${e?`<div class="f-hint">${e}</div>`:""}
  </div>`;function it(t,s="上传本地图片"){return`<button class="btn btn-ghost btn-sm" data-action="sf-pick-file" data-target="${t}">${s}</button>`}function ca(){const t=p.params,s=(n,i)=>`
    <select class="input sf-input" data-field="${n}">
      ${i.map(([o,d])=>`<option value="${o}" ${String(t[n])===String(o)?"selected":""}>${d}</option>`).join("")}
    </select>`,e=(n,i,o=600)=>`
    <input class="input sf-input" data-field="${n}" placeholder="${r(i)}" maxlength="${o}" value="${r(t[n]??"")}">`;let a="";return p.fn==="cutout"?a=g("抠图类型",s("subType",[["3","商品（默认）"],["1","通用"],["2","人像"],["9","服饰"],["12","头发"],["13","人脸"]]))+(String(t.subType)==="9"?g("服饰部位（多选用逗号隔开）",e("clothClass","如 tops,skirt,bag",60),"可选：tops / coat / skirt / pants / bag / shoes / hat"):""):p.fn==="sceneFission"?a=g("与原图相似度",s("strength",[["0.3","0.3（场景变化大）"],["0.5","0.5（默认均衡）"],["0.7","0.7"],["0.9","0.9（场景变化小）"]]))+g("裂变模式",s("fissionMode",[["SCENE_FISSION_REALISTIC","写实（默认）"],["SCENE_FISSION_SIMPLE","简约"],["SCENE_FISSION_INTELLIGENT","智能"]]))+g("场景描述（可选）",e("prompt","如：北欧风客厅，清晨自然光，木桌面"),"不填则按原图自动提取，最长 600 字"):p.fn==="similarFission"?a=g("生图描述（可选）",e("prompt","如：换成莫兰迪配色的同款马克杯"))+g("与参考图相似度",s("weight",[["2","2 · 最像（默认）"],["1","1 · 中等"],["0","0 · 发散"]]))+g("输出比例",s("scale",[["1:1","1:1 方图"],["3:4","3:4 竖图"],["4:3","4:3 横图"],["9:16","9:16 手机屏"],["16:9","16:9 宽幅"]])):p.fn==="imageEdit"?a=g("想怎么改（必填）",`
      <textarea class="input sf-input sf-ta" data-field="prompt" rows="3" maxlength="3000"
        placeholder="如：把背景换成纯白底，商品居中占画面 80%，加轻微投影">${r(t.prompt??"")}</textarea>`,"一句话描述即可，最长 3000 字")+g("模型",s("provider",[["KONTEXT","KONTEXT（默认 · 稳）"],["GPT_2_5_IMAGE","GPT 2.5 Image"],["GPT_2_5_F_IMAGE","GPT 2.5 F Image"],["GPT_2_IMAGE","GPT 2 Image"],["BANANA_PRO","Banana Pro"],["QWEN_IMAGE_3_PRO","Qwen Image 3 Pro"]]),"不同模型的速度与风格略有差异，可多试几个"):p.fn==="changeModel"&&(a=g("模特头部图地址（必填）",e("modelHeadImageUrl","https://… 头部正脸照，512×512～2048×2048",500),"用旁边的「上传」按钮传本地图更方便")+g("",it("modelHeadImageUrl","上传模特头部图"))+g("场景参考图（可选，建议用）",e("sceneImgUrl","https://… 768×768～4096×4096",500))+g("",it("sceneImgUrl","上传场景参考图"))+g("场景相似度",s("sceneStrength",[["0.4","0.4（场景变化大）"],["0.7","0.7（默认）"],["0.9","0.9（贴场景）"]]))+g("模特特征（多选逗号隔开）",e("modelPrompt","如：微笑,坐着,苗条",100),"可选：微笑 / 大笑 / 坐着 / 躺着 / 肥胖 / 微胖 / 苗条 / 侧身 / 侧脸 / 背面 / 光头")+g("自定义描述（可选）",e("customPrompt","额外要求，最长 600 字"))+g("原图是真人还是人台",s("realModel",[["true","真人模特（默认）"],["false","人台 / 假模"]]))+g("输出尺寸",s("genOriRes",[["false","标准尺寸（默认）"],["true","原分辨率（更清晰，稍慢）"]]))),`
  <div class="sf-form">
    <div class="sf-src">
      ${g(p.fn==="changeModel"?"模特原图地址":"原图地址",`
        <input class="input sf-input" data-field="imageUrl" data-scope="top" placeholder="https://… 图片公网地址"
          value="${r(p.imageUrl)}">`,"jpg / png / webp；本地图点「上传本地图片」自动上传，即刻可用")}
      <div class="sf-src-btns">${it("imageUrl")}${p.imageUrl?`<img class="sf-thumb" src="${r(p.imageUrl)}" alt="原图预览" referrerpolicy="no-referrer">`:""}</div>
    </div>
    ${a}
    ${p.fn!=="cutout"?g("输出张数",s("outputNum",[["1","1 张"],["2","2 张"],["3","3 张"],["4","4 张"]])):""}
    ${g("备注（写给自己看）",e("note","如：A 客户保温杯主图",120))}
    <div class="sf-submit-row">
      <button class="btn btn-primary" data-action="sf-submit">开始生成</button>
      <span class="sf-tip">提交前会再确认一次；生成约需 30 秒～2 分钟</span>
    </div>
  </div>
  <input type="file" id="sf-file" accept=".jpg,.jpeg,.png,.webp" hidden>`}function la(){return m?p.tasks.length?`<div class="sf-tasks">${p.tasks.map(da).join("")}</div>`:p.tasksStale?H(3):'<div class="empty slim">还没有任务——选好功能、放好图，点「开始生成」提交第一个任务。</div>':'<div class="empty slim">任务记录需要后端在线。</div>'}function da(t){const s=t.status===1||t.status===2;return`
  <div class="sf-task st${t.status}">
    <div class="sf-task-top">
      <b>${r(t.kind_name)}</b>
      ${t.note?`<span class="chip-soft">${r(t.note)}</span>`:""}
      <span class="sf-st">${s?'<span class="sf-spin"></span>':""}${r(t.status_text)}</span>
      <span class="sf-task-time">${r(t.created_at)}</span>
      <button class="btn btn-danger btn-sm" data-action="sf-del-task" data-id="${r(t.task_id)}">删除</button>
    </div>
    ${t.kind!=="text"&&(t.images||[]).length?`
    <div class="sf-grid">
      ${t.images.map(e=>`
      <figure class="sf-shot">
        <img src="${r(e.url)}" alt="结果图" loading="lazy" referrerpolicy="no-referrer">
        <figcaption>
          <a href="${r(e.url)}" target="_blank" rel="noopener">打开原图</a>
          <a href="${h}/api/linkfox/download?url=${encodeURIComponent(e.url)}">下载</a>
          ${e.id?`<button class="linklike" data-action="sf-refresh-img" data-id="${r(e.id)}" title="地址 8 小时过期后换新的">换新地址</button>`:""}
        </figcaption>
      </figure>`).join("")}
    </div>`:""}
    ${t.kind==="text"&&t.content?`
    <div class="sf-text-out">${r(t.content)}</div>
    <button class="btn btn-ghost btn-sm" data-action="sf-copy-text" data-id="${r(t.task_id)}">复制文案</button>`:""}
    ${s?'<div class="sf-hint-run">生成中，页面开着会自动刷新（约 10 秒一查）……</div>':""}
    ${t.status===4?`<div class="sf-err">失败：${r(t.error||"平台未返回原因")}</div>`:""}
  </div>`}async function pa(t){const s=Nt.find(n=>n.kind===p.fn),e=p.imageUrl.trim();if(!e){c("请先填原图地址，或用「上传本地图片」");return}if(p.fn==="changeModel"&&!String(p.params.modelHeadImageUrl||"").trim()){c("换模特必填「模特头部图」——填地址或点上传按钮");return}if(p.fn==="imageEdit"&&!String(p.params.prompt||"").trim()){c("智能修图要填一句「想怎么改」");return}if(await P({title:`提交「${s.name}」任务`,text:"将按当前设置生成图片，约需 30 秒～2 分钟。确定提交？",ok:"开始生成"})){k(t,!0,"提交中…");try{const n=await fetch(`${h}/api/linkfox/task`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:p.fn,...p.params,imageUrl:e})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.detail||`HTTP ${n.status}`);p.tasks.unshift(i),p.params.note="",c(`已提交，平台排队中（任务号 …${String(i.task_id).slice(-6)}）`,!0),v()}catch(n){c(`提交失败：${n.message}`),k(t,!1)}}}async function ua(t,s,e){if(t.size>10*1024*1024){c("图片超过 10MB 上限——先压缩再传");return}k(e,!0,"上传中…");try{const a=await new Promise((o,d)=>{const u=new FileReader;u.onload=()=>o(String(u.result).replace(/^data:[^,]+,/,"")),u.onerror=()=>d(new Error("本地文件读取失败")),u.readAsDataURL(t)}),n=await fetch(`${h}/api/linkfox/upload`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fileName:t.name,base64:a})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.detail||`HTTP ${n.status}`);s==="imageUrl"?p.imageUrl=i.url:p.params[s]=i.url,c("上传成功，已回填地址",!0),v()}catch(a){c(`上传失败：${a.message}`),k(e,!1)}}async function fa(t,s){var e;try{const a=await fetch(`${h}/api/linkfox/refresh`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({imageId:t})}),n=await a.json().catch(()=>({}));if(!a.ok)throw new Error(n.detail||`HTTP ${a.status}`);const i=(e=s.closest("figure"))==null?void 0:e.querySelector("img");i&&(i.src=n.url);try{await navigator.clipboard.writeText(n.url),c("已换新地址（也复制了一份）",!0)}catch{c("已换新地址",!0)}}catch(a){c(`换地址失败：${a.message}`)}}async function va(t){if(await P({title:"删除任务记录",text:"只删除本地记录，已生成的图片不受影响。确定删除？",ok:"删除",danger:!0}))try{const e=await fetch(`${h}/api/linkfox/tasks/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`);p.tasks=p.tasks.filter(a=>a.task_id!==t),v()}catch(e){c(`删除失败：${e.message}`)}}async function yt(t){try{await navigator.clipboard.writeText(t),c("已复制",!0)}catch{c("复制失败——请手动全选复制")}}function ha(t){const s=`商品：${t.name}（ASIN ${t.asin}）
关键词：${t.keyword}
机会指数：${t.score}/100（${t.grade}）
预估月销：${t.est_sales}${t.profit?`
毛利率：${t.profit.result.margin}%`:""}`;return{letter:`你是资深跨境电商选品顾问。根据下面的 Amazon 商品分析数据，写一封发给客户的中文开发信（首次触达）：简短问候 → 用数据点出这个品的机会 → 介绍我们能提供的服务（选品分析 / 供应链对接 / 利润测算）→ 给出明确的下一步行动。语气专业不油腻，300 字以内。

${s}`,follow:`你是资深跨境电商选品顾问。客户之前看过下面这个 Amazon 商品的分析报告但还没回复，写一封中文跟进邮件：礼貌唤起记忆 → 补充一个新角度的价值点（结合数据）→ 低压力地推动下一步。200 字以内，别催促感太重。

${s}`,pitch:`你是跨境电商运营专家。根据下面的 Amazon 商品分析数据，写一段发在客户群/朋友圈的中文新品推荐文案：一个抓人的开头 + 3 个数据支撑的卖点（用 emoji 分隔）+ 一句行动召唤。150 字以内。

${s}`}}function ma(t){p.copy={report:t,preset:"letter",prompts:ha(t),result:null},X()}function X(){const t=p.copy;if(!t)return;const s=[["letter","开发信（首次触达）"],["follow","跟进邮件"],["pitch","新品推荐文案"]],e=t.result?t.result.status===3?`<div class="sf-text-out">${r(t.result.content)}</div>
           <div class="m-actions"><button class="btn btn-primary btn-sm" data-action="lf-cw-copy">复制文案</button></div>`:`<div class="sf-err">生成失败：${r(t.result.error||"平台未返回原因")}</div>`:'<div class="sf-hint-run">生成中，通常 10～30 秒……</div><div class="sf-text-out ghost">AI 正在组织语言……</div>';D(`
    <h3>AI 写话术</h3>
    <p class="dlg-text">已把报告数据（${r(t.report.name)}）拼进提示词，可直接改。</p>
    <div class="sf-cw-presets">${s.map(([a,n])=>`<button class="sf-fn mini ${t.preset===a?"on":""}" data-action="lf-cw-preset" data-id="${a}">${n}</button>`).join("")}
    </div>
    <div class="field">
      <label>提示词（可编辑）</label>
      <textarea id="lf-cw-prompt" class="input sf-ta" rows="7">${r(t.prompts[t.preset])}</textarea>
    </div>
    ${t.result?"":`<div class="m-actions dlg-actions">
      <button class="btn btn-ghost" data-action="close-modal">取消</button>
      <button class="btn btn-primary" data-action="lf-cw-submit" id="lf-cw-go">生成文案</button>
    </div>`}
    <div class="m-label" style="margin-top:12px">生成结果</div>
    <div id="lf-cw-out">${e}</div>`)}async function ba(t){var a;const s=p.copy;if(!s)return;const e=(((a=document.getElementById("lf-cw-prompt"))==null?void 0:a.value)||"").trim();if(!e){c("提示词不能为空");return}k(t,!0,"提交中…");try{const n=await fetch(`${h}/api/linkfox/text`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:e,model:"GEM_3_7_FLASH",note:`${s.report.name} 话术`})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.detail||`HTTP ${n.status}`);s.result={status:1},X(),$a(i.task_id)}catch(n){c(`提交失败：${n.message}`),k(t,!1)}}function $a(t){clearInterval(F),F=setInterval(async()=>{if(!document.getElementById("lf-cw-out")){clearInterval(F),F=null;return}try{const e=await fetch(`${h}/api/linkfox/text/${t}`,{method:"POST"});if(!e.ok)return;const a=await e.json();a.status===3?(clearInterval(F),F=null,p.copy.result={status:3,content:a.content,count:a.count},Pt=a.content,X()):a.status===4&&(clearInterval(F),F=null,p.copy.result={status:4,error:a.error},X())}catch{}},3e3)}const rt={"#/":{render:mt,page:"监控总览",eyebrow:"Workbench Overview"},"#/workbench":{render:mt,page:"监控总览",eyebrow:"Workbench Overview"},"#/radar":{render:is,page:"关键词雷达",eyebrow:"Keyword Radar"},"#/analyze":{render:Cs,page:"ASIN 分析",eyebrow:"ASIN Intelligence"},"#/studio":{render:oa,page:"AI 作图工坊",eyebrow:"AI Image Studio"},"#/profit":{render:Vs,page:"利润计算器",eyebrow:"Profit Calculator"},"#/suppliers":{render:Qs,page:"供应商库",eyebrow:"Supplier Directory"},"#/projects":{render:qs,page:"立项看板",eyebrow:"Project Pipeline"}};function v(){const t=location.hash||"#/",s=rt[t]||rt["#/"];document.getElementById("app").innerHTML=`
    <div class="layout">
      ${Gt(rt[t]?t:"#/")}
      <div class="main">
        ${Jt(s.page)}
        <div class="content"><div class="ph-eyebrow">${s.eyebrow}</div>${s.render()}${Kt()}</div>
      </div>
    </div>`}window.addEventListener("hashchange",v);document.addEventListener("click",t=>{var i;const s=t.target.closest("[data-action]");if(!s){t.target.classList&&t.target.classList.contains("modal-backdrop")&&U();return}const{action:e,id:a,dir:n}=s.dataset;switch(e){case"guide":Bs();break;case"close-modal":U();break;case"dialog-ok":{const o=document.getElementById("dlg-input");lt(o?o.value.trim().slice(0,200):!0);break}case"dialog-cancel":lt(null);break;case"add-keyword":jt();break;case"kw-toggle":ls(a);break;case"collect-open":ps(x.keywords.find(o=>o.id===a));break;case"collect-submit":us(a);break;case"del-keyword":ds(a);break;case"kw-detail":Lt(a);break;case"brief-export":ea(a);break;case"open-analysis":Ms(a);break;case"parse-asin":Mt();break;case"reset-asin":bs();break;case"fill-sample":ms();break;case"extract-paste":$s();break;case"amz-detail":ks(s);break;case"amz-search":Ss(s);break;case"apply-kw":ys();break;case"analyze-submit":Is();break;case"del-analysis":_s(a);break;case"export-pdf":Hs();break;case"copy-report":Rs();break;case"profit-open":bt(y);break;case"quick-profit":bt(null);break;case"profit-save":Ds();break;case"project-add":Ws();break;case"project-move":Ks(a,n);break;case"project-note":Zs(a);break;case"project-del":Xs(a);break;case"supplier-add":Ys();break;case"supplier-save":Et();break;case"supplier-quote":gt(a,"quote","改报价","报价");break;case"supplier-note":gt(a,"note","供应商备注","备注");break;case"supplier-del":sa(a);break;case"sf-set-fn":p.fn=a,v();break;case"sf-submit":pa(s);break;case"sf-pick-file":p.pickTarget=s.dataset.target||"imageUrl",(i=document.getElementById("sf-file"))==null||i.click();break;case"sf-del-task":va(a);break;case"sf-refresh-img":fa(a,s);break;case"sf-copy-text":yt((p.tasks.find(o=>o.task_id===a)||{}).content||"");break;case"lf-copywriting":ma(T.find(o=>o.id===a)||y);break;case"lf-cw-preset":p.copy&&(p.copy.preset=a,X());break;case"lf-cw-submit":ba(s);break;case"lf-cw-copy":yt(Pt);break}});document.addEventListener("input",t=>{t.target.classList.contains("af-input")&&t.target.dataset.field&&(l[t.target.dataset.field]=t.target.value),t.target.classList.contains("sf-input")&&t.target.dataset.field&&(t.target.dataset.scope==="top"?p.imageUrl=t.target.value:p.params[t.target.dataset.field]=t.target.value),t.target.classList.contains("pf-input")&&ut(),t.target.id==="kw-input"&&(et=t.target.value)});document.addEventListener("change",t=>{var e;if(t.target.id!=="sf-file"||!((e=t.target.files)!=null&&e.length))return;const s=document.querySelector(`[data-action="sf-pick-file"][data-target="${p.pickTarget}"]`);ua(t.target.files[0],p.pickTarget,s),t.target.value=""});document.addEventListener("keydown",t=>{var s;t.key==="Enter"&&t.target.id==="kw-input"&&jt(),t.key==="Enter"&&t.target.id==="an-raw"&&Mt(),t.key==="Enter"&&((s=t.target.dataset)==null?void 0:s.action)==="kw-detail"&&Lt(t.target.dataset.id),t.key==="Enter"&&t.target.id==="dlg-input"&&lt(t.target.value.trim().slice(0,200)),t.key==="Enter"&&t.target.id==="sp-name"&&Et(),t.key==="Escape"&&U()});Rt().then(v);
