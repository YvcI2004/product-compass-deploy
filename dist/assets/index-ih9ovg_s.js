(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))e(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&e(o)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function e(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();const Gt={name:"选品罗盘",type:"真数据工作空间"},$="";let h=!1;const Jt=window.fetch.bind(window);let pt=0;function wt(){var t;(t=document.getElementById("top-progress"))==null||t.classList.toggle("on",pt>0)}window.fetch=(t,s={})=>(pt++,wt(),Jt(t,s).finally(()=>{pt--,wt()}));let It=Gt,x={keywords:[],events:[]},Z=!0,T=[],W=!0,S=[],nt=!0,_=[],Q=!0,y=null;async function Kt(){try{const t=await fetch(`${$}/api/bootstrap`);if(!t.ok)throw new Error(`HTTP ${t.status}`);It=(await t.json()).workspace,h=!0,console.log(`[选品罗盘] 已连接后端 ${$}`)}catch{console.log("[选品罗盘] 后端未启动，界面可浏览，数据功能需后端在线")}}async function At(){if(!(!h||!Z))try{const t=await fetch(`${$}/api/radar`);if(!t.ok)throw new Error(`HTTP ${t.status}`);x=await t.json(),Z=!1,["#/","#/workbench","#/radar"].includes(location.hash||"#/")&&f()}catch{}}async function vt(){if(!(!h||!W))try{const t=await fetch(`${$}/api/analyses`);if(!t.ok)throw new Error(`HTTP ${t.status}`);T=(await t.json()).analyses||[],W=!1,["#/","#/workbench","#/analyze"].includes(location.hash||"#/")&&f()}catch{}}async function ht(){if(!(!h||!nt))try{const t=await fetch(`${$}/api/projects`);if(!t.ok)throw new Error(`HTTP ${t.status}`);S=(await t.json()).projects||[],nt=!1,["#/","#/workbench","#/projects"].includes(location.hash||"#/")&&f()}catch{}}async function Zt(){if(!(!h||!Q))try{const t=await fetch(`${$}/api/suppliers`);if(!t.ok)throw new Error(`HTTP ${t.status}`);_=(await t.json()).suppliers||[],Q=!1,(location.hash||"#/")==="#/suppliers"&&f()}catch{}}const K=t=>String(t).padStart(2,"0"),r=t=>String(t).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[s]),L=t=>Number(t).toLocaleString("en-US"),X=t=>`#${Number(t).toLocaleString("en-US")}`,_t=t=>`$${t}`;function l(t,s=!1){var e;(e=document.getElementById("toast"))==null||e.remove();const a=document.createElement("div");a.id="toast",a.className=s?"ok":"",a.textContent=t,document.body.appendChild(a),setTimeout(()=>a.remove(),2600)}const Wt=`
  <svg class="logo-mark" viewBox="0 0 48 48" aria-hidden="true">
    <rect x="1.5" y="1.5" width="45" height="45" rx="12" fill="#ffffff" stroke="#e4e7ef"/>
    <circle cx="24" cy="24" r="14.5" fill="none" stroke="#2563eb" stroke-width="2.4" opacity=".92"/>
    <path d="M24 12.5 L27.4 24 L20.6 24 Z" fill="#2563eb"/>
    <path d="M24 35.5 L27.4 24 L20.6 24 Z" fill="#a7c3f7"/>
    <circle cx="24" cy="24" r="2.4" fill="#ffffff" stroke="#2563eb" stroke-width="1.6"/>
  </svg>`,Xt={workbench:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7.5" height="9" rx="1.5"/><rect x="13.5" y="3" width="7.5" height="5.5" rx="1.5"/><rect x="13.5" y="12" width="7.5" height="9" rx="1.5"/><rect x="3" y="16" width="7.5" height="5" rx="1.5"/></svg>',radar:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="0.6" fill="currentColor"/><path d="M12 3v2.4M21 12h-2.4M12 21v-2.4M3 12h2.4"/></svg>',search:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M16.8 16.8 21 21"/></svg>',calc:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><rect x="4.5" y="3" width="15" height="18" rx="2"/><path d="M8 7.5h8"/><path d="M8.6 15h2.6M8.6 18h2.6M14.2 13.4v5.2M11.6 16h5.2"/></svg>',box:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3 21 7.8v8.4L12 21 3 16.2V7.8Z"/><path d="M3 7.8 12 12.6 21 7.8"/><path d="M12 12.6V21"/></svg>',board:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="4" width="4.6" height="16" rx="1.4"/><rect x="9.7" y="4" width="4.6" height="10.5" rx="1.4"/><rect x="15.9" y="4" width="4.6" height="13.5" rx="1.4"/></svg>',star:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3.5 14.5 9l5.8.5-4.4 3.8 1.3 5.7L12 16l-5.2 3 1.3-5.7L3.7 9.5 9.5 9Z"/></svg>',studio:'<svg class="nav-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20 12.5 11.5"/><path d="m16 4 .9 2.1L19 7l-2.1.9L16 10l-.9-2.1L13 7l2.1-.9Z"/><path d="m19.5 12.5 .6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z"/><path d="m6.5 4.5.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z"/></svg>'},Vt=[{hash:"#/",icon:"workbench",label:"监控总览",group:"总览"},{hash:"#/radar",icon:"radar",label:"关键词雷达",group:"调研分析",badge:()=>x.keywords.length},{hash:"#/analyze",icon:"search",label:"ASIN 分析",group:"调研分析",badge:()=>T.length},{hash:"#/reviews",icon:"star",label:"评论分析",group:"调研分析"},{hash:"#/studio",icon:"studio",label:"AI 作图工坊",group:"调研分析"},{hash:"#/profit",icon:"calc",label:"利润计算器",group:"测算与跟进"},{hash:"#/suppliers",icon:"box",label:"供应商库",group:"测算与跟进",badge:()=>_.length},{hash:"#/projects",icon:"board",label:"立项看板",group:"测算与跟进",badge:()=>S.filter(t=>t.stage!=="已放弃").length}];function Qt(t){let s="";const a=Vt.map(e=>{const n=e.group&&e.group!==s?`<div class="nav-label">${e.group}</div>`:"";return s=e.group,`${n}
    <a class="nav-item ${e.hash===t?"active":""}" href="${e.hash}">
      ${Xt[e.icon]}<span>${e.label}</span>
      ${e.badge&&e.badge()>0?`<span class="nav-badge">${K(e.badge())}</span>`:""}
    </a>`}).join("");return`
  <aside class="sidebar">
    <div class="logo-row">
      ${Wt}
      <div>
        <div class="logo-name">选品罗盘</div>
        <div class="logo-sub">选品工作台</div>
      </div>
    </div>
    ${a}
    <div class="demo-box">
      <b>半自动 · 差值引擎</b>
      <p>人工采集约 3 分钟/轮，评分、差值与告知全自动执行。</p>
      <span>● 数据存储于本地后端</span>
    </div>
  </aside>`}function Yt(t){return`
  <header class="topbar">
    <div class="crumb">${r(It.type)} <span>/</span> <b>${r(t)}</b></div>
    <div class="top-right">
      <span class="top-chip"><span class="dot"></span>${h?"后端已连接":"后端离线"}</span>
      <button class="btn btn-ghost btn-sm" data-action="guide">使用指南</button>
    </div>
  </header>`}const ts=()=>`
  <footer class="footer">
    <span>真实数据 · 半自动采集 · 全部存在本地</span>
    <span>选品罗盘 · 半自动选品工作台</span>
  </footer>`;function Lt(t,s){if(!s)return'<span class="delta-chip new">新</span>';const a=t.score-s.score;return a>0?`<span class="delta-chip up">↑${a}</span>`:a<0?`<span class="delta-chip down">↓${Math.abs(a)}</span>`:'<span class="delta-chip flat">→</span>'}const it=["#2563eb","#5b8def","#8fb3f7","#1e40af","#64748b","#c9d6f0"];function Et(t,{h:s=210}={}){const e=s,n=36,i=12,o=14,c=24,p=t.filter(v=>v.points.length>=2);if(!p.length)return'<div class="chart-empty">完成第 2 轮采集后，这里出现趋势线。</div>';const j=Math.max(...p.map(v=>v.points.length)),I=p.flatMap(v=>v.points);let A=Math.min(...I),b=Math.max(...I);if(b-A<4){const v=(b+A)/2;A=v-2,b=v+2}const m=640-n-i,k=e-o-c,M=v=>n+v*m/(j-1),H=v=>o+k-(v-A)/(b-A)*k,ct=[0,.5,1].map(v=>{const N=o+k*v,tt=Math.round(b-(b-A)*v);return`<line x1="${n}" y1="${N.toFixed(1)}" x2="${640-i}" y2="${N.toFixed(1)}" class="c-grid"/>
            <text x="${n-7}" y="${(N+3.5).toFixed(1)}" text-anchor="end" class="c-label">${tt}</text>`}).join(""),V=[...new Set([0,Math.round((j-1)/2),j-1])].map(v=>`<text x="${M(v).toFixed(1)}" y="${e-6}" text-anchor="${v===0?"start":v===j-1?"end":"middle"}" class="c-label">第 ${v+1} 轮</text>`).join(""),F=p.map((v,N)=>{const tt=v.color||it[N%it.length],qt=v.points.map((Ut,Dt)=>`${M(Dt).toFixed(1)},${H(Ut).toFixed(1)}`).join(" "),yt=v.points[v.points.length-1];return`<polyline points="${qt}" fill="none" stroke="${tt}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"/>
            <circle cx="${M(v.points.length-1).toFixed(1)}" cy="${H(yt).toFixed(1)}" r="3.4" fill="${tt}"><title>${r(v.name)} · 第 ${v.points.length} 轮 · ${yt} 分</title></circle>`}).join("");return`<svg viewBox="0 0 640 ${e}" class="chart" role="img">${ct}${F}${V}</svg>`}const ss=t=>`
  <div class="chart-legend">${t.map(s=>`
    <span class="lg-item"><i style="background:${s.color}"></i>${r(s.name)}</span>`).join("")}
  </div>`;function as(t){const s=t.reduce((o,c)=>o+c.value,0);if(!s)return'<div class="chart-empty">还没有已评分的关键词。</div>';const a=54,e=2*Math.PI*a;let n=0;const i=t.map(o=>{const c=o.value/s,p=`<circle r="${a}" cx="70" cy="70" fill="none" stroke="${o.color}" stroke-width="15"
      stroke-dasharray="${Math.max(0,c*e-2).toFixed(1)} ${(e-Math.max(0,c*e-2)).toFixed(1)}"
      stroke-dashoffset="${(-n*e).toFixed(1)}" transform="rotate(-90 70 70)"/>`;return n+=c,p}).join("");return`
  <div class="donut-wrap">
    <svg viewBox="0 0 140 140" class="donut">
      <circle r="${a}" cx="70" cy="70" fill="none" stroke="#eef0f5" stroke-width="15"/>
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
  </div>`}function es(t,s=116){const e=2*Math.PI*52,n=Math.max(0,Math.min(100,t))/100,i=t>=75?"#2563eb":t>=55?"#7ea4f5":"#a3a8b8";return`
  <svg viewBox="0 0 140 140" class="gauge" style="width:${s}px;height:${s}px">
    <circle r="52" cx="70" cy="70" fill="none" stroke="#eef0f5" stroke-width="11"/>
    <circle r="52" cx="70" cy="70" fill="none" stroke="${i}" stroke-width="11" stroke-linecap="round"
      stroke-dasharray="${(n*e).toFixed(1)} ${e.toFixed(1)}" transform="rotate(-90 70 70)"/>
    <text x="70" y="72" text-anchor="middle" class="gg-score">${t}</text>
    <text x="70" y="90" text-anchor="middle" class="gg-label">机会指数</text>
  </svg>`}function ns(t,s=250){const i=t.length,o=(b,m)=>{const k=-Math.PI/2+b*2*Math.PI/i;return[130+Math.cos(k)*72*m,108+Math.sin(k)*72*m]},c=[.25,.5,.75,1].map(b=>`<polygon points="${t.map((m,k)=>o(k,b).map(M=>M.toFixed(1)).join(",")).join(" ")}" class="rd-ring"/>`).join(""),p=t.map((b,m)=>{const[k,M]=o(m,1);return`<line x1="130" y1="108" x2="${k.toFixed(1)}" y2="${M.toFixed(1)}" class="rd-ring"/>`}).join(""),j=t.map((b,m)=>o(m,Math.max(.05,b.value)).map(k=>k.toFixed(1)).join(",")).join(" "),I=t.map((b,m)=>{const[k,M]=o(m,Math.max(.05,b.value));return`<circle cx="${k.toFixed(1)}" cy="${M.toFixed(1)}" r="2.8" fill="#2563eb"><title>${r(b.label)} ${Math.round(b.value*100)}</title></circle>`}).join(""),A=t.map((b,m)=>{const[k,M]=o(m,1.26),H=Math.abs(k-130)<8?"middle":k>130?"start":"end";return`<text x="${k.toFixed(1)}" y="${(M+3.5).toFixed(1)}" text-anchor="${H}" class="rd-label">${r(b.label)}</text>`}).join("");return`
  <svg viewBox="0 0 260 216" class="radar" style="width:${s}px" overflow="visible">
    ${c}${p}
    <polygon points="${j}" fill="rgba(37,99,235,.18)" stroke="#2563eb" stroke-width="2"/>
    ${I}${A}
  </svg>`}function is(){if(!S.length)return'<div class="empty slim">还没有立项项目——报告页「转为立项」后，这里显示跟进漏斗。</div>';const t=P.map(a=>({s:a,n:S.filter(e=>e.stage===a).length})),s=Math.max(1,...t.map(a=>a.n));return`
  <div class="funnel">
    ${t.map(a=>`
    <div class="fn-row">
      <span class="fn-label">${a.s}</span>
      <div class="fn-track"><div class="fn-bar ${a.s==="已放弃"?"dead":""}" style="width:${a.n?Math.max(8,a.n/s*100):0}%"></div></div>
      <b class="fn-n">${a.n}</b>
    </div>`).join("")}
  </div>`}const R=(t=3)=>`
  <div class="sk-card">${'<div class="sk-line"></div>'.repeat(t)}</div>`;function st(t,s,a){const e=Math.max(1,...a.map(n=>n.n));return`
  <div class="lens-card">
    <div class="lens-title">${t}<span>${s}</span></div>
    ${a.map(n=>`
    <div class="fn-row">
      <span class="fn-label">${n.label}</span>
      <div class="fn-track"><div class="fn-bar ${n.dim?"dead":""}" style="width:${n.n?Math.max(8,n.n/e*100):0}%"></div></div>
      <b class="fn-n">${n.n}</b>
    </div>`).join("")}
  </div>`}function rs(t){if(!t.length)return"";const s=t.map(n=>n.cur),a=(n,i,o,c=!1)=>({label:o,n:s.filter(p=>p.price>=n&&p.price<i).length,dim:c}),e=(n,i)=>i.map(([o,c,p])=>({label:p,n:s.filter(j=>{const I=n(j);return I>=o&&I<c}).length}));return`
  <section class="section">
    <div class="sec-head">
      <h2>市场结构透视</h2>
      <span class="sec-sub">同一批监控词的四个角度 · 只统计最新一轮</span>
    </div>
    <div class="lens-grid">
      ${st("价格带","头部价格（美元）",[a(0,15,"15 以下 · 利润薄",!0),a(15,45,"15–45 · 黄金带"),a(45,80,"45–80 · 中高客单"),a(80,1e9,"80 以上 · 高客单")])}
      ${st("竞争梯度","搜索结果数",e(n=>n.results,[[0,1001,"1千以内 · 稀缺"],[1001,10001,"1千–1万 · 宽松"],[10001,100001,"1万–10万 · 一般"],[100001,1e12,"10万以上 · 红海"]]))}
      ${st("需求活跃度","最新评论距今",e(n=>n.days,[[0,4,"3天内 · 极活跃"],[4,15,"4–14天 · 活跃"],[15,31,"15–30天 · 转冷"],[31,1e9,"30天以上 · 休眠"]]))}
      ${st("排名梯度","头部大类排名",e(n=>n.bsr,[[0,1001,"1千以内 · 头部"],[1001,10001,"1千–1万 · 靠前"],[10001,50001,"1万–5万 · 中游"],[50001,1e12,"5万以上 · 长尾"]]))}
    </div>
  </section>`}function kt(){At(),vt(),ht();const t=x.keywords||[],s=t.filter(c=>c.rounds.length).map(c=>({k:c,cur:c.rounds[c.rounds.length-1],prev:c.rounds[c.rounds.length-2]||null})).sort((c,p)=>p.cur.score-c.cur.score),a=s.filter(c=>c.cur.grade_cls!=="g-c").length,e=t.reduce((c,p)=>c+p.rounds.length,0),n=S.filter(c=>c.stage!=="已放弃").length,i=t.length||T.length,o=h&&!i&&(Z||W);return`
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
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':K(t.length)}</b><span>监控关键词</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':K(a)}</b><span>重点机会 A/B</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':K(e)}</b><span>累计采集轮次</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':K(T.length)}</b><span>ASIN 报告</span></div>
    <div class="sb-item"><b>${o?'<span class="sk-num"></span>':K(n)}</b><span>立项进行中</span></div>
  </div>

  ${i?"":cs()}
  ${h?"":B()}

  <div class="dash">
    <div class="dash-main">
      <section class="chart-card">
        <div class="sec-head">
          <h2>机会指数趋势</h2>
          <span class="sec-sub">各关键词历史轮次得分 · 悬停圆点看数值</span>
        </div>
        ${o?R(5):os(s)}
      </section>

      ${s.length||o?`
      <section class="section">
        <div class="sec-head">
          <h2>类目机会排行</h2>
          <span class="sec-sub">点击任意一行，打开类目分析面板</span>
        </div>
        <div class="rank-list">${s.length?s.map(ls).join(""):R(3)}</div>
      </section>`:""}

      ${s.length?rs(s):""}

      <section class="section">
        <div class="sec-head">
          <h2>单品分析速览</h2>
          <span class="sec-sub">客户单品报告 · 点击回看</span>
        </div>
        <div class="recent-grid">${o?R(2):ps()}</div>
      </section>
    </div>

    <div class="dash-side">
      <section class="chart-card">
        <div class="sec-head"><h2>评级分布</h2><span class="sec-sub">最新一轮</span></div>
        ${as([{label:"A 类 · 优先评估",value:s.filter(c=>c.cur.grade_cls==="g-a").length,color:"#2563eb"},{label:"B 类 · 跟进观察",value:s.filter(c=>c.cur.grade_cls==="g-b").length,color:"#8fb3f7"},{label:"C 类 · 暂缓投入",value:s.filter(c=>c.cur.grade_cls==="g-c").length,color:"#c9cdd9"}])}
      </section>

      <section class="chart-card">
        <div class="sec-head"><h2>立项漏斗</h2><a class="sec-sub" href="#/projects">进入看板 →</a></div>
        ${is()}
      </section>

      <section class="section">
        <div class="sec-head">
          <h2>市场信号</h2>
          <span class="sec-sub">差值引擎自动告知</span>
        </div>
        ${o?R(3):ds()}
      </section>
    </div>
  </div>`}function os(t){const s=t.slice(0,6).map((e,n)=>({name:e.k.keyword,color:it[n%it.length],points:e.k.rounds.map(i=>i.score)})),a=s.filter(e=>e.points.length>=2);return a.length?Et(s)+ss(a):'<div class="chart-empty">完成第 2 轮采集后，这里出现各关键词的机会指数趋势线。</div>'}function cs(){return`
  <section class="an-card onboard">
    <b>开始第一轮监控（约 5 分钟）</b>
    <ol>
      <li>在「<b>关键词雷达</b>」添加关注的类目词（如 dog bed）</li>
      <li>到 amazon.com 搜索该词，打开第 1 名商品页，采集 5 个公开数据（约 2 分钟）</li>
      <li>提交采集——差值引擎自动评分；第 2 轮起自动对比涨跌、推送重点机会信号</li>
    </ol>
    <a class="btn btn-primary" href="#/radar">添加第一个关键词</a>
  </section>`}function B(){return`
  <div class="an-offline">
    <b>后端未启动。</b>数据功能需后端在线：在 <code>api</code> 目录运行
    <code>.venv\\Scripts\\python.exe -m uvicorn main:app --reload --port 8000</code>
    后刷新页面。<span>（历史数据都存在后端文件里，不会丢）</span>
  </div>`}function ls(t,s){const{k:a,cur:e,prev:n}=t;return`
  <div class="rank-row" data-action="kw-detail" data-id="${a.id}" role="button" tabindex="0">
    <div class="rank-no">${s+1}</div>
    <div class="row-main">
      <div class="row-name">${r(a.keyword)}</div>
      <div class="row-meta">结果 ${L(e.results)} · 头部 BSR ${X(e.bsr)} · ${r(e.collected_at)}</div>
    </div>
    ${Lt(e,n)}
    <span class="chip-soft ${e.grade_cls}">${r(e.grade.split(" · ")[0])}</span>
    <div class="score" title="机会指数">${e.score}</div>
    <span class="row-go">›</span>
  </div>`}function ds(){const t=x.events||[];return t.length?`
  <div class="radar-feed">
    ${t.slice(0,6).map(s=>`
    <div class="rf-item">
      <span class="rf-dot"></span>
      <div>
        <div class="rf-text">${r(s.text)}</div>
        <div class="rf-time">${r(s.at)}</div>
      </div>
    </div>`).join("")}
  </div>`:'<div class="empty slim">完成第一轮采集后，变化动态会出现在这里（升降级、竞争加剧、需求走强…自动告知）。</div>'}function ps(){return T.length?T.slice(0,3).map(t=>`
  <div class="recent-card" data-action="open-analysis" data-id="${t.id}">
    <div>
      <div class="rc-name">${r(t.name)}</div>
      <div class="rc-meta">ASIN ${r(t.asin)} · ${r(t.collected_at)}</div>
    </div>
    <div class="rc-right">
      <div class="score sm">${t.score}</div>
      <span class="chip-soft ${t.grade_cls}">${r(t.grade.split(" · ")[0])}</span>
    </div>
  </div>`).join(""):'<div class="empty slim">还没有 ASIN 分析——客户发来商品链接时，用「ASIN 分析」出可交付报告。</div>'}let ut=null,rt="";function us(){At(),vt();const t=x.keywords||[],s=t.filter(e=>!e.rounds.length),a=t.filter(e=>e.rounds.length).sort((e,n)=>n.rounds[n.rounds.length-1].score-e.rounds[e.rounds.length-1].score);return`
  <div class="page-head">
    <h1>关键词雷达</h1>
    <p>不定期采集你关注的类目词，差值引擎自动对比每一轮——机会指数涨跌、竞争变化、升降级告知全自动。</p>
  </div>
  ${h?"":B()}
  <div class="an-card">
    <div class="an-parse-row">
      <input id="kw-input" class="input grow" placeholder="输入要监控的类目关键词，如 dog bed / kitchen organizer…"
             value="${r(rt)}" autocomplete="off">
      <button class="btn btn-soft" data-action="add-keyword">＋ 添加监控</button>
    </div>
    <div class="f-hint" style="margin-top:8px">建议选「客户问得多 + 你有供应链优势」的词；先加 3–5 个跑起来，不定期采集即可。</div>
  </div>
  ${t.length?"":h&&Z?`<section class="an-card">${R(4)}</section>`:'<div class="empty">还没有监控关键词——上面输入第一个，开始你的雷达。</div>'}
  ${[...s.map(fs),...a.map(vs)].join("")}`}function fs(t){return`
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
  </section>`}function z(t,s,a,e,n){let i;if(a==null)i='<span class="rm-sub flat">首轮</span>';else{const o=s-a;if(!o)i=`<span class="rm-sub flat">→ 上轮 ${e(a)}</span>`;else{const c=n==="up"?o>0:n==="down"?o<0:null;i=`<span class="rm-sub ${c===null?"flat":c?"up":"down"}">${o>0?"↑":"↓"} 上轮 ${e(a)}</span>`}}return`
  <div class="rm">
    <div class="rm-label">${t}</div>
    <div class="rm-value">${e(s)}</div>
    ${i}
  </div>`}function vs(t){const s=t.rounds[t.rounds.length-1],a=t.rounds[t.rounds.length-2]||null,e=ut===t.id;return`
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
      ${Lt(s,a)}
      <span class="rm-sub flat" style="margin-left:auto">头部预估月销 ${r(s.est_sales)}</span>
    </div>
    <div class="kcard-metrics">
      ${z("搜索结果",s.results,a==null?void 0:a.results,L,"down")}
      ${z("头部 BSR",s.bsr,a==null?void 0:a.bsr,X,"down")}
      ${z("头部评论",s.reviews,a==null?void 0:a.reviews,L,"up")}
      ${z("头部价格",s.price,a==null?void 0:a.price,_t,null)}
    </div>
    <div class="kcard-reason">${s.reason_lines.map(r).join("<br>")}</div>
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="collect-open" data-id="${t.id}">本轮采集</button>
      <button class="btn btn-ghost" data-action="kw-detail" data-id="${t.id}">分析面板</button>
      <button class="btn btn-ghost" data-action="kw-toggle" data-id="${t.id}">${e?"收起历史":`历史 ${t.rounds.length} 轮`}</button>
      <button class="btn btn-ghost" data-action="brief-export" data-id="${t.id}">简报 PDF</button>
    </div>
    ${e?hs(t):""}
  </section>`}function hs(t){const s=[...t.rounds].reverse();return`
  <table class="an-table kw-history">
    <thead><tr><th>采集时间</th><th>轮次</th><th>指数</th><th>Δ</th><th>结果数</th><th>BSR</th><th>评论</th><th>价格</th><th>评论距今</th></tr></thead>
    <tbody>
      ${s.map((a,e)=>{const n=s[e+1],i=n?a.score-n.score:null;return`
        <tr>
          <td class="agt-time">${r(a.collected_at)}</td>
          <td>第 ${a.round_no} 轮</td>
          <td><b>${a.score}</b></td>
          <td>${i===null?'<span class="rm-sub flat">—</span>':`<span class="rm-sub ${i>0?"up":i<0?"down":"flat"}">${i>0?"↑"+i:i<0?"↓"+Math.abs(i):"→"}</span>`}</td>
          <td>${L(a.results)}</td>
          <td>${X(a.bsr)}</td>
          <td>${L(a.reviews)}</td>
          <td>$${a.price}</td>
          <td>${a.days} 天</td>
        </tr>`}).join("")}
    </tbody>
  </table>`}async function Nt(){var s;if(!h){l("需要后端在线——启动方法见页面提示");return}const t=rt.trim()||(((s=document.getElementById("kw-input"))==null?void 0:s.value)||"").trim();if(!t){l("先输入一个关键词，比如 dog bed");return}try{const a=await fetch(`${$}/api/radar/keyword`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword:t})}),e=await a.json();if(!a.ok){l(`⚠️ ${e.detail||"添加失败"}`);return}x.keywords.push(e),x.events.unshift({at:e.created_at,kw:e.keyword,text:`新增监控关键词「${e.keyword}」——去 Amazon 搜索并完成第 1 轮采集`}),Z=!1,rt="",f()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}function $s(t){ut=ut===t?null:t,f()}async function bs(t){const s=x.keywords.find(e=>e.id===t);if(!(!s||!await E({title:`删除「${s.keyword}」？`,text:"它的全部采集轮次与动态会一起删除，删除后不可恢复。",ok:"删除",danger:!0}))){try{const e=await fetch(`${$}/api/radar/keyword/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}x.keywords=x.keywords.filter(e=>e.id!==t),x.events=x.events.filter(e=>e.kw!==s.keyword),f()}}function ms(t){const s=[["c-results","搜索结果数",`搜「${t.keyword}」后左上角「X results」`],["c-bsr","头部 BSR 排名","第 1 名商品页「Best Sellers Rank」第一行数字"],["c-reviews","头部评论数","第 1 名星级旁 ratings 数量"],["c-price","头部价格（美元）","第 1 名当前售价"],["c-days","头部最新评论距今天数","第 1 名评论区第一条日期距今天数（今天 = 0）"]];J(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>「${r(t.keyword)}」第 ${t.rounds.length+1} 轮采集</h3>
    <p class="m-sub">打开 amazon.com 搜索「${r(t.keyword)}」→ 打开第 1 名商品页，抄 5 个数（约 2 分钟）。提交后差值引擎自动对比上一轮。</p>
    <div class="an-grid">
      ${s.map(([a,e,n])=>`
      <div class="field">
        <label>${e}</label>
        <input id="${a}" class="input cm-input" placeholder="${r(n)}">
        <div class="f-hint">${n}</div>
      </div>`).join("")}
    </div>
    <div class="m-actions">
      <button class="btn btn-primary" data-action="collect-submit" data-id="${t.id}">提交本轮采集</button>
    </div>
    <div class="m-note">每一轮都留档不覆盖——回看趋势全靠历史轮次。</div>`)}async function gs(t){if(!h){l("需要后端在线");return}const s=e=>{var n;return(((n=document.getElementById(e))==null?void 0:n.value)||"").trim()},a=document.querySelector('[data-action="collect-submit"]');w(a,!0,"提交中…");try{const e=await fetch(`${$}/api/radar/collect`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword_id:t,results:s("c-results"),bsr:s("c-bsr"),reviews:s("c-reviews"),price:s("c-price"),days:s("c-days")})}),n=await e.json();if(!e.ok){l(`⚠️ ${n.detail||"提交失败"}`);return}const i=x.keywords.findIndex(o=>o.id===t);i>=0&&(x.keywords[i]=n.keyword),x.events=n.delta_events.map(o=>({at:n.round.collected_at,kw:n.keyword.keyword,text:o})).concat(x.events),Z=!1,D(),l(`✅ 第 ${n.round.round_no} 轮已入库：机会指数 ${n.round.score}`,!0),f()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{w(a,!1)}}const ys=/\/(?:dp|gp\/product|gp\/aw\/d)\/([A-Z0-9]{10})/i,ws=/^[A-Z0-9]{10}$/i;let et=!1,d={raw:"",asin:null,source:"",parseError:"",name:"",keyword:"",price:"",rating:"",reviews:"",bsr:"",results:"",days:"",paste:"",extractMeta:null,bsrCategory:""};const Pt=["name","price","rating","reviews","bsr","results","days"],ks=[{key:"name",label:"商品名称",ph:"复制商品页标题（可只留核心部分）",hint:"商品页顶部的商品标题"},{key:"keyword",label:"搜索关键词",ph:"dog bed for large dogs",hint:"你在 Amazon 搜索框用的词——多个 ASIN 按它归成一类对比"},{key:"price",label:"价格（美元）",ph:"29.99",hint:"商品页当前售价（不看划线价）"},{key:"rating",label:"评分",ph:"4.4",hint:"星级分数，如 4.4"},{key:"reviews",label:"评论总数",ph:"2310",hint:"星级旁 ratings 数量，去逗号：2,310 → 2310"},{key:"bsr",label:"大类 BSR 排名",ph:"1560",hint:"商品信息区「Best Sellers Rank」第一行：#1,560 in Pet Supplies → 填 1560"},{key:"results",label:"搜索结果数",ph:"5000",hint:"用上面的关键词搜索后，左上角「5,000 results」→ 填 5000"},{key:"days",label:"最新评论距今天数",ph:"今天 = 0，昨天 = 1",hint:"评论区第一条的日期（Reviewed … on October 8, 2026）距今几天；评论数为 0 可不填"}];function Ct(){var n;const t=(((n=document.getElementById("an-raw"))==null?void 0:n.value)||d.raw||"").trim();d.raw=t,d.parseError="";const s=ys.exec(t),a=ws.test(t.toUpperCase())?t.toUpperCase():null,e=s?s[1].toUpperCase():a;e?(d.asin=e,d.source=s?"识别自链接":"手动输入"):(d.asin=null,d.parseError=/amzn\.to/i.test(t)?"amzn.to 短链请先在浏览器打开，再复制地址栏的完整链接":"没识别到 ASIN：需要完整链接（含 /dp/B0… 部分）或 10 位 ASIN"),f()}function xs(){d={...d,raw:"https://www.amazon.com/dp/B0TEST0001",asin:"B0TEST0001",source:"示例数据",parseError:"",name:"示例 · 大型犬高支撑可拆洗宠物床",keyword:"dog bed for large dogs",price:"39.99",rating:"4.3",reviews:"2310",bsr:"1560",results:"5000",days:"1",extractMeta:null,bsrCategory:"",apiRaw:""},f()}function Ss(){d.asin=null,d.source="",d.parseError="",f()}async function Ts(){const t=(d.paste||"").trim();if(!t){l("先把商品页文字粘贴到框里（Ctrl+A → Ctrl+C → 粘贴）");return}if(!h){l("自动提取需要后端在线——启动方法见页面顶部提示");return}const s=document.querySelector('[data-action="extract-paste"]');w(s,!0,"提取中…");try{const a=await fetch(`${$}/api/extract`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text:t})}),e=await a.json();if(!a.ok){l(`⚠️ ${e.detail||"提取失败"}`);return}js(e)}catch{l("⚠️ 连不上后端，请确认后端还在运行")}finally{et=!1,w(s,!1)}}function js(t){const s={found:t.found||[],warnings:t.warnings||[],filled:[],at:new Date().toLocaleTimeString()};t.asin&&!d.asin&&(d.raw=t.asin,d.asin=t.asin,d.source="整页粘贴识别",d.parseError=""),Pt.forEach(a=>{var n;const e=(n=t.fields)==null?void 0:n[a];e&&e.value!==""&&e.value!=null&&String(d[a]??"").trim()===""&&(d[a]=String(e.value),s.filled.push(a))}),d.bsrCategory=t.bsr_category||"",d.extractMeta=s,f(),s.filled.length?l(`✅ 已预填 ${s.filled.length} 项（绿色标记），瞄一眼改漏的`,!0):l("⚠️ 没提取到新数字——请手动填写，或检查粘贴的是不是商品页")}function Ms(){d.bsrCategory&&!String(d.keyword||"").trim()&&(d.keyword=d.bsrCategory,f())}const Is={name:"商品名称",price:"价格",rating:"评分",reviews:"评论总数",bsr:"BSR 排名"};async function As(t){if(!d.asin){l("先在第 1 步解析出 ASIN");return}if(!h){l("联网查询需要后端在线——启动方法见页面顶部提示");return}if(!await E({title:"查询商品数据",text:`将联网查询 ASIN ${d.asin} 的公开商品信息（标题、价格、评分、评论、BSR），自动填入第 2 步清单。确定查询？`,ok:"查询"}))return;w(t,!0,"查询中…");const a=$t("an-prog-host","正在读取商品数据");let e=!1;try{const n=await fetch(`${$}/api/amz/detail`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({asin:d.asin})}),i=await n.json();if(!n.ok){l(`⚠️ ${i.detail||"查询失败"}`);return}_s(i),e=!0}catch{l("⚠️ 连不上后端，请确认后端还在运行")}finally{a==null||a.end(e),w(t,!1)}}function _s(t){const s=[];["name","price","rating","reviews","bsr"].forEach(e=>{var i;const n=(i=t.fields)==null?void 0:i[e];n&&n.value!==""&&n.value!=null&&(d[e]=String(n.value),s.push(e))});const a=(t.missing||[]).map(e=>Is[e]||e);d.extractMeta={api:!0,at:new Date().toLocaleTimeString(),found:s,filled:s,warnings:a.length?[`本次没取到：${a.join("、")}——请手补，或用备用通道整页粘贴`]:[]},d.apiRaw=t.raw_preview||"",f(),s.length?l(`✅ 已联网取到 ${s.length} 项（绿色标记），核对后点「开始分析」`,!0):l("⚠️ 查询成功但没识别到可用数字——请手补；排查可展开下方「原始返回」截图发开发者")}async function Ls(t){const s=String(d.keyword||"").trim();if(!s){l("先在第 2 步填「搜索关键词」，再查结果数");return}if(!h){l("联网查询需要后端在线");return}if(!await E({title:"查询搜索结果数",text:`将联网查询关键词「${s}」在 Amazon 的搜索结果数，填进「搜索结果数」一栏。确定查询？`,ok:"查询"}))return;w(t,!0,"查询中…");const e=$t("an-srch-host","正在查询搜索结果数");let n=!1;try{const i=await fetch(`${$}/api/amz/search`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({keyword:s})}),o=await i.json();if(!i.ok){l(`⚠️ ${o.detail||"查询失败"}`);return}if(o.results==null){l("⚠️ 查询成功但没识别到结果数——请手填，或稍后再试");return}d.results=String(o.results);const c=d.extractMeta;c&&c.api?c.filled.includes("results")||c.filled.push("results"):d.extractMeta={api:!0,at:new Date().toLocaleTimeString(),found:["results"],filled:["results"],warnings:[]},f(),l(`✅ 已填入搜索结果数 ${Number(o.results).toLocaleString("en-US")}`,!0),n=!0}catch{l("⚠️ 连不上后端，请确认后端还在运行")}finally{e==null||e.end(n),w(t,!1)}}function Es(){const t=d.extractMeta;if(!t)return"";const s=d.bsrCategory&&!String(d.keyword||"").trim()?`<button class="chip-x kw" data-action="apply-kw" title="BSR 类目词，点击填入">类目词建议：${r(d.bsrCategory)}</button>`:"",a=t.api?"联网查询":"提取";return`
  <div class="an-extract-meta">
    <span class="chip-x ${t.filled.length?"hit":"miss"}">${t.at} ${a} ${t.found.length} 项 · 填入 ${t.filled.length} 项</span>
    ${s}
    ${t.warnings.map(e=>`<span class="an-extract-warn">⚠️ ${r(e)}</span>`).join("")}
  </div>
  ${t.api&&d.apiRaw?`
  <details class="an-raw-view">
    <summary>原始返回（排查映射用，不用管）</summary>
    <pre>${r(d.apiRaw)}</pre>
  </details>`:""}`}function Ns(t){const s=d.extractMeta;return s?s.filled.includes(t)?`<span class="chip-x hit">${s.api?"已查询":"提取"}</span>`:Pt.includes(t)?`<span class="chip-x miss">${s.api?"未取到":"未提取"}</span>`:"":""}async function Ps(){if(et)return;if(!h){l("ASIN 分析需要后端在线——启动方法见页面顶部提示");return}if(!d.asin){l("先在第 1 步解析出 ASIN");return}et=!0;const t=document.querySelector('[data-action="analyze-submit"]');w(t,!0,"分析中…");try{const s=await fetch(`${$}/api/analyze`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({link:d.raw,name:d.name,keyword:d.keyword,price:d.price,rating:d.rating,reviews:d.reviews,bsr:d.bsr,results:d.results,days:d.days})}),a=await s.json();if(!s.ok){l(`⚠️ ${a.detail||"分析失败"}`);return}y=a,T.unshift(a),W=!1,f(),setTimeout(()=>{var e;return(e=document.getElementById("an-report"))==null?void 0:e.scrollIntoView({behavior:"smooth"})},80)}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{et=!1,w(t,!1)}}function Cs(t){const s=T.find(a=>a.id===t);s&&(y=s,D(),(location.hash||"#/")!=="#/analyze"?location.hash="#/analyze":f(),setTimeout(()=>{var a;return(a=document.getElementById("an-report"))==null?void 0:a.scrollIntoView({behavior:"smooth"})},120))}async function Bs(t){if(await E({title:"删除这条分析记录？",text:"报告与利润测算存档会一起删除，历史不可恢复。",ok:"删除",danger:!0})){try{const a=await fetch(`${$}/api/analyses/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}T=T.filter(a=>a.id!==t),(y==null?void 0:y.id)===t&&(y=null),f()}}function Hs(t){if(t.confidence==null)return"";const s=t.confidence_level||"—",a=t.confidence>=90?"hi":t.confidence>=75?"mid":t.confidence>=60?"low":"min",e=(t.confidence_hints||[]).join("；");return`<span class="anr-conf ${a}" ${e?`title="${r(e)}"`:""}>置信度 ${t.confidence} · ${r(s)}${(t.inferred||[]).length?` · ${t.inferred.length} 项推补`:""}</span>`}function Fs(t){const s=t.flags||[];if(!s.length)return"";const a={risk:"⛔",warn:"⚠️",info:"ℹ️"};return`
  <div class="m-label">风险旗标</div>
  <div class="anr-flags">
    ${s.map(e=>`<div class="anr-flag lv-${e.level}"><span class="fi">${a[e.level]||"•"}</span>${r(e.text)}</div>`).join("")}
  </div>`}function Os(t){const s=t.advice||[];return s.length?`
  <div class="m-label">行动建议</div>
  <ol class="anr-advice">
    ${s.map(a=>`<li>${r(a)}</li>`).join("")}
  </ol>`:""}function Rs(t){return`
  <div id="an-report" class="an-report">
    <div class="anr-top">
      <div>
        <div class="anr-name">${r(t.name)}</div>
        <div class="meta-row">
          <span class="pm pm-amazon">a</span><span>ASIN ${r(t.asin)}</span>·
          <span>关键词「${r(t.keyword)}」</span>
          <span class="chip-soft">${r(t.collected_at)} 采集</span>
          ${Hs(t)}
        </div>
      </div>
      <div class="anr-score-wrap">
        <div class="score big">${t.score}<small>/100</small></div>
        <span class="anr-grade ${t.grade_cls}">${r(t.grade)}</span>
      </div>
    </div>
    <div class="anr-est">预估月销 <b>${r(t.est_sales)}</b><small>${r(t.est_sales_note)}</small></div>
    <div class="anr-visual">
      <div class="anr-radar">${ns(t.dimensions)}</div>
      <div class="anr-dims">
        ${t.dimensions.map(s=>`
        <div class="dim">
          <div class="dim-head"><span>${r(s.label)}</span><span class="dim-val">${Math.round(s.value*100)}</span></div>
          <div class="dim-bar"><i style="width:${Math.min(100,Math.round(s.value*100))}%"></i></div>
          <div class="dim-text">${r(s.text)}</div>
        </div>`).join("")}
      </div>
    </div>
    ${Fs(t)}
    <div class="m-label">判断依据</div>
    <div class="anr-reason">${t.reason_lines.map(r).join("<br>")}</div>
    ${Os(t)}
    <div class="anr-risk">⚠️ ${r(t.risk)}</div>
    ${t.profit?Ws(t.profit):""}
    <div class="anr-actions">
      <button class="btn btn-primary" data-action="profit-open">利润测算${t.profit?"（修改）":""}</button>
      ${Zs(t.id)?'<span class="chip-soft" title="已在立项看板">已立项</span>':'<button class="btn btn-ghost" data-action="project-add">转为立项</button>'}
      <button class="btn btn-ghost" data-action="copy-report">复制报告文本</button>
      <button class="btn btn-ghost" data-action="lf-copywriting" data-id="${t.id}" title="AI 生成开发信 / 跟进邮件 / 推荐文案">AI 写话术</button>
      <button class="btn btn-ghost" data-action="export-pdf" title="备用：浏览器打印另存为 PDF">导出 PDF</button>
    </div>
  </div>`}function zs(){if(!h)return'<div class="empty slim">历史记录需要后端在线。</div>';if(!T.length)return h&&W?R(4):'<div class="empty slim">还没有分析记录——完成第 1、2 步就会出现第一份报告。</div>';const t=new Set,s=T.filter(e=>!e.asin||t.has(e.asin)?!1:(t.add(e.asin),!0)),a=new Map;return s.forEach(e=>{a.has(e.keyword)||a.set(e.keyword,[]),a.get(e.keyword).push(e)}),[...a.entries()].map(([e,n])=>`
  <div class="an-group">
    <div class="an-group-title"><span class="agt-kw" title="${r(e)}">关键词「${r(e)}」</span><span>${n.length} 个商品</span></div>
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
  </div>`).join("")}function qs(){return vt(),ht(),`
  <div class="page-head">
    <h1>ASIN 分析 <span class="an-live-chip">真实数据</span></h1>
    <p>输入链接或 ASIN → 联网查询自动填表 → 核对清单 → 五维评分报告。缺数按中性口径推补并标注置信度，评分公式全程透明可调；整页粘贴与手动填写保留为备用通道。</p>
  </div>
  ${h?"":B()}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">1</span>
      <div class="an-step-title"><b>输入商品</b><span>支持完整链接（含 /dp/B0… 部分）或直接输入 10 位 ASIN</span></div>
    </div>
    <div class="an-parse-row">
      <input id="an-raw" class="input af-input grow" data-field="raw" autocomplete="off"
             placeholder="https://www.amazon.com/dp/B0… 或 B0ABCDEFGHI"
             value="${r(d.raw)}" ${d.asin?"disabled":""}>
      ${d.asin?`<span class="an-asin-ok">ASIN ${r(d.asin)}（${r(d.source)}）</span>
           <button class="btn btn-ghost" data-action="reset-asin">重新输入</button>`:'<button class="btn btn-soft" data-action="parse-asin">解析</button>'}
    </div>
    ${d.parseError?`<div class="an-err">⚠️ ${r(d.parseError)}</div>`:""}
    ${d.asin?`
    <div class="an-api-box">
      <div class="an-api-text">
        <b>直接分析 · 联网查询</b>
        <span>点一下自动取该商品的公开数据（标题、价格、评分、评论、BSR）填进第 2 步清单——不用打开 Amazon 抄数。查到的数字仍可逐项修改。</span>
      </div>
      <button class="btn btn-primary" data-action="amz-detail">查询商品数据</button>
    </div>
    <div id="an-prog-host"></div>`:""}
    <div class="an-paste">
      <div class="an-paste-label">
        <b>备用通道 · 整页粘贴</b>
        <span>打开 amazon.com 商品页 → Ctrl+A 全选 → Ctrl+C 复制 → 粘贴到这里 → 点「自动提取」。识别 ASIN + 预填全部数字，绿的已填、琥珀的没认出来再手补。粘贴内容只用于提取，不保存。</span>
      </div>
      <textarea class="input af-input an-paste-ta" data-field="paste" rows="3"
        placeholder="商品页整页文字粘到这里（也认搜索页——只提取结果数）">${r(d.paste)}</textarea>
      <div class="an-paste-row">
        <button class="btn btn-soft" data-action="extract-paste">自动提取</button>
        ${Es()}
      </div>
    </div>
  </section>
  ${d.asin?`
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">2</span>
      <div class="an-step-title"><b>核对采集清单 —— 数字不全也没关系</b><span>提取值会自动带进来；缺的数系统按中性市场推补继续算，报告挂「置信度」如实打折</span></div>
      <button class="btn btn-ghost btn-sm" data-action="fill-sample">填入示例数据</button>
    </div>
    <div class="an-grid">
      ${ks.map(t=>`
      <div class="field">
        <label>${t.label} ${Ns(t.key)}</label>
        <input class="input af-input" data-field="${t.key}" placeholder="${r(t.ph)}" value="${r(d[t.key]??"")}">
        <div class="f-hint">${t.hint}</div>
      </div>`).join("")}
    </div>
    <div class="an-actions">
      <button class="btn btn-primary" data-action="analyze-submit">开始分析</button>
      <button class="btn btn-ghost" data-action="amz-search" title="用「搜索关键词」联网查 Amazon 搜索结果数，自动填进上面">查搜索结果数</button>
      <span class="an-tip">公式与关键词雷达同一套透明世界观，参数在 api/analyzer.py 可调</span>
    </div>
    <div id="an-srch-host"></div>
  </section>`:`
  <div class="empty slim">解析出 ASIN 后，这里会出现采集清单。</div>`}
  ${y?`
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">3</span>
      <div class="an-step-title"><b>分析报告</b><span>可导出 PDF 或复制文本直接发给客户</span></div>
    </div>
    ${Rs(y)}
  </section>`:""}
  <section class="an-card">
    <div class="an-step-head">
      <span class="an-num">4</span>
      <div class="an-step-title"><b>历史与类目对比</b><span>同一关键词下的多个 ASIN 自动归成一类，按机会指数排序</span></div>
    </div>
    ${zs()}
  </section>`}function J(t){document.getElementById("modal-root").innerHTML=`
    <div class="modal-backdrop">
      <div class="modal">${t}</div>
    </div>`}function D(){if(document.getElementById("modal-root").innerHTML="",q){const t=q;q=null,t(null)}}let q=null;function E({title:t,text:s,ok:a="确定",danger:e=!1}){return new Promise(n=>{var i;q=n,J(`
      <div class="dlg">
        <h3>${r(t)}</h3>
        <p class="dlg-text">${r(s)}</p>
        <div class="m-actions dlg-actions">
          <button class="btn btn-ghost" data-action="dialog-cancel">取消</button>
          <button class="btn ${e?"btn-danger":"btn-primary"}" data-action="dialog-ok" id="dlg-ok">${r(a)}</button>
        </div>
      </div>`),(i=document.getElementById("dlg-ok"))==null||i.focus()})}function Bt({title:t,text:s,label:a,value:e="",ok:n="保存"}){return new Promise(i=>{q=i,J(`
      <div class="dlg">
        <h3>${r(t)}</h3>
        <p class="dlg-text">${r(s)}</p>
        <div class="field">
          <label>${r(a)}</label>
          <input id="dlg-input" class="input" value="${r(e)}" maxlength="200" autocomplete="off">
        </div>
        <div class="m-actions dlg-actions">
          <button class="btn btn-ghost" data-action="dialog-cancel">取消</button>
          <button class="btn btn-primary" data-action="dialog-ok" id="dlg-ok">${r(n)}</button>
        </div>
      </div>`);const o=document.getElementById("dlg-input");o==null||o.focus(),o==null||o.select()})}function ft(t){const s=q;q=null,document.getElementById("modal-root").innerHTML="",s&&s(t)}function w(t,s,a="处理中…"){t&&(s?(t.dataset.label=t.textContent,t.textContent=a,t.classList.add("is-loading")):(t.textContent=t.dataset.label||t.textContent,t.classList.remove("is-loading")))}function $t(t,s){const a=document.getElementById(t);if(!a)return null;a.innerHTML="";const e=document.createElement("div");e.className="qprog",e.innerHTML=`
    <div class="qprog-top"><b>${r(s)}</b><span class="qprog-sec">已等待 0 秒</span></div>
    <div class="qprog-track"><div class="qprog-fill"></div></div>
    <p class="qprog-note">平台按真实浏览方式取数，通常 30~90 秒、最长约 2 分钟——进度条只表示「还在取」，请勿关闭页面</p>`,a.appendChild(e);const n=e.querySelector(".qprog-fill"),i=e.querySelector(".qprog-sec");let o=0;n.style.width="6%";const c=setInterval(()=>{o+=1,i.textContent=`已等待 ${o} 秒`,n.style.width=`${Math.min(86,6+o*1.4)}%`},1e3);return{end(p){clearInterval(c),p?(n.style.width="100%",e.classList.add("ok"),setTimeout(()=>{a.innerHTML=""},600)):a.innerHTML=""}}}function Us(){J(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>使用指南</h3>
    <p class="m-sub">真数据工作流，4 步循环：</p>
    <div class="guide-steps">
      ${[["加关键词","「关键词雷达」添加你关注的类目词，随时可加、不定期采集（建议先 3–5 个）。"],["抄 5 个数","amazon.com 搜索该词 → 打开第 1 名商品页，抄结果数、BSR、评论数、价格、最新评论天数，约 2 分钟。"],["看差值","提交后差值引擎自动对比上一轮：机会指数涨跌、竞争变化、升降级——工作台榜单和动态自动更新。"],["出报告","客户发来具体商品链接时，用「ASIN 分析」生成可导出 PDF 的单品报告，直接交付。"]].map((s,a)=>`
        <div class="g-step">
          <div class="g-num">${a+1}</div>
          <div class="g-text"><b>${s[0]}</b> — ${s[1]}</div>
        </div>`).join("")}
    </div>
    <div class="m-note">全部数据为人工采集，存储在本地后端（api/pipeline/generated），不连接任何平台、不上传云端。</div>`)}function Ds(t){return`
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
  </div>`}function Gs(){y&&(document.getElementById("print-area").innerHTML=Ds(y),window.print())}function Js(t){const s=e=>"▮".repeat(Math.round(e*10)).padEnd(10,"▯"),a=["📊 选品分析报告 · 选品罗盘",`商品：${t.name}`,`ASIN：${t.asin}（amazon.com）`,`关键词：${t.keyword}`,`采集时间：${t.collected_at}`,"",`机会指数：${t.score} / 100 —— ${t.grade}`,`预估月销：${t.est_sales}`];return t.confidence!=null&&a.push(`数据置信度：${t.confidence}/100（${t.confidence_level}）${(t.inferred||[]).length?` · 推补 ${(t.inferred||[]).length} 项`:""}`),a.push("","五维评估：",...t.dimensions.map(e=>`· ${e.label} ${s(e.value)} ${Math.round(e.value*100)} —— ${e.text}`)),(t.flags||[]).length&&a.push("","风险旗标：",...(t.flags||[]).map(e=>`· ${e.text}`)),a.push("","判断依据：",...t.reason_lines.map(e=>`· ${e}`)),(t.advice||[]).length&&a.push("","行动建议：",...(t.advice||[]).map(e=>`· ${e}`)),a.push("",`⚠️ ${t.risk}`,"—— 选品罗盘 生成"),a.join(`
`)}async function Ks(){if(!y)return;const t=Js(y);try{await navigator.clipboard.writeText(t),l("✅ 报告文本已复制，可直接粘贴给客户",!0)}catch{const s=document.createElement("textarea");s.value=t,document.body.appendChild(s),s.select();try{document.execCommand("copy"),l("✅ 报告文本已复制",!0)}catch{l("⚠️ 复制失败，请手动选中报告内容复制")}s.remove()}}const Zs=t=>S.some(s=>s.analysis_id===t);function Ws(t){const s=t.result;return`
  <div class="profit-strip ${s.verdict_cls}">
    <b>利润测算</b>
    <span>毛利率 <b>${s.margin}%</b></span>
    <span>单件毛利 $${s.profit_per}</span>
    ${s.monthly_profit!=null?`<span>月利润 <b>$${Math.round(s.monthly_profit).toLocaleString("en-US")}</b></span>`:""}
    <span class="pv">${r(s.verdict)}</span>
  </div>`}function xt(t){var o;const s=(t==null?void 0:t.input)||{},a=((o=t==null?void 0:t.profit)==null?void 0:o.inputs)||{},e=(t==null?void 0:t.est_sales)||"",n=((t==null?void 0:t.inferred)||[]).includes("price"),i=[["pf-price","售价（美元）",a.price??s.price??"",n?"⚠️ 带入的是推补价格（$12.99 中性假设）——请先在商品页核实真实售价":"默认带入商品售价"],["pf-purchase","采购成本/件",a.purchase??"","供应商报价 + 国内运费"],["pf-inbound","头程物流/件",a.inbound??"","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费/件",a.fba??"","按尺寸重量，用亚马逊物流计算器查"],["pf-other","其他成本/件",a.other??0,"包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率 %",a.ref_pct??15,"大部分类目 15%"],["pf-monthly","预估月销量",a.monthly??"",e?`报告预估：${e}`:"填写后估算月利润"]];J(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>${t?`利润测算 · ${r(t.name)}`:"快速利润测算"}</h3>
    <p class="m-sub">FBA 毛利模型：售价 − 佣金 − FBA − 采购 − 头程 − 其他。改动任一数字，下方实时重算。</p>
    <div class="an-grid">
      ${i.map(([c,p,j,I])=>`
      <div class="field">
        <label>${p}</label>
        <input id="${c}" class="input pf-input" value="${r(String(j??""))}" placeholder="0" autocomplete="off">
        <div class="f-hint">${r(I)}</div>
      </div>`).join("")}
    </div>
    <div id="pf-result" class="pf-result"></div>
    <div class="m-actions">
      ${t?'<button class="btn btn-primary" data-action="profit-save">存入报告</button>':""}
      <button class="btn btn-ghost" data-action="close-modal">关闭</button>
    </div>
    ${t?'<div class="m-note">测算结果随报告存档，自动同步到类目简报；已立项的项目会更新看板毛利率。</div>':'<div class="m-note">快速测算不保存；需要在报告里留档时，请从 ASIN 分析报告页进入。</div>'}`),bt()}function bt(){const t=document.getElementById("pf-result");if(!t)return;const s=F=>{var v;return parseFloat(String(((v=document.getElementById(F))==null?void 0:v.value)||"").replace(/,/g,""))},a=s("pf-price"),e=s("pf-purchase"),n=s("pf-inbound"),i=s("pf-fba"),o=Number.isFinite(s("pf-other"))?s("pf-other"):0,c=s("pf-ref_pct")||15,p=s("pf-monthly")||0;if(!([a,e,n,i].every(Number.isFinite)&&a>0)){t.innerHTML=`
      <div class="pf-tiles">
        <div class="pf-tile"><span>单件毛利</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>毛利率</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>保本售价</span><b class="mut">—</b></div>
        <div class="pf-tile"><span>月利润</span><b class="mut">—</b></div>
      </div>
      <div class="pf-verdict muted">填完上方 售价 / 采购 / 头程 / FBA 四项，这里实时出结果</div>`;return}const I=a*c/100,A=e+n+i+o,b=a-A-I,m=b/a*100,k=c<100?A/(1-c/100):null,M=p>0?b*p:null,H=m>=30?"up":m>=20?"flat":"down",ct=m>=30?`毛利率 ${m.toFixed(0)}%，达到优秀线（≥30%），值得推进`:m>=20?`毛利率 ${m.toFixed(0)}%，可做，需控制物流与推广成本`:`毛利率 ${m.toFixed(0)}%，低于红线 20%，建议重新谈价、换头程方案或提高售价`,V=[["佣金",I,"#8fb3f7"],["FBA",i,"#5b8def"],["采购",e,"#2563eb"],["头程",n,"#1e40af"],["其他",o,"#a8b2c3"]].filter(F=>F[1]>.004);b>0&&V.push(["毛利",b,"#1f9d61"]),t.innerHTML=`
    <div class="pf-tiles">
      <div class="pf-tile"><span>单件毛利</span><b class="${H}">$${b.toFixed(2)}</b></div>
      <div class="pf-tile"><span>毛利率</span><b class="${H}">${m.toFixed(1)}%</b></div>
      <div class="pf-tile"><span>保本售价</span><b>${k!=null?`$${k.toFixed(2)}`:"—"}</b></div>
      <div class="pf-tile"><span>月利润</span><b>${M!=null?`$${Math.round(M).toLocaleString("en-US")}`:"—"}</b></div>
    </div>
    <div class="pf-verdict ${H}">${ct}</div>
    <div class="pf-costbar">
      <div class="pf-bar">${V.map(([F,v,N])=>`<i style="width:${Math.max(0,Math.min(100,v/a*100)).toFixed(1)}%;background:${N}"></i>`).join("")}</div>
      <div class="pf-costlegend">${V.map(([F,v,N])=>`<em><i style="background:${N}"></i>${F} $${v.toFixed(2)}</em>`).join("")}</div>
    </div>`}async function Xs(){if(!y||!h){l("需要后端在线");return}const t=a=>{var e;return(((e=document.getElementById(a))==null?void 0:e.value)||"").trim()},s=document.querySelector('[data-action="profit-save"]');w(s,!0,"保存中…");try{const a=await fetch(`${$}/api/analyses/${y.id}/profit`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({price:t("pf-price"),purchase:t("pf-purchase"),inbound:t("pf-inbound"),fba:t("pf-fba"),other:t("pf-other"),ref_pct:t("pf-ref_pct"),monthly:t("pf-monthly")})}),e=await a.json();if(!a.ok){l(`⚠️ ${e.detail||"保存失败"}`);return}const n=T.findIndex(o=>o.id===e.id);n>=0&&(T[n]=e),(y==null?void 0:y.id)===e.id&&(y=e),W=!1,D(),l("✅ 利润测算已存入报告",!0);const i=S.find(o=>o.analysis_id===e.id);i?mt(i.id,{margin:e.profit.result.margin}):f()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{w(s,!1)}}const P=["待评估","测算中","已立项","样品中","已放弃"];function Vs(){return ht(),S.length?`
  <div class="page-head">
    <h1>立项看板</h1>
    <p>共 ${S.length} 个项目 · 阶段推进与备注随手记，跟进进度一目了然。</p>
  </div>
  ${h?"":B()}
  <div class="pj-board">
    ${P.map(t=>Qs(t,S.filter(s=>s.stage===t))).join("")}
  </div>`:`
    <div class="page-head">
      <h1>立项看板</h1>
      <p>从 ASIN 分析转入的跟进项目——测算利润、推进样品，每个机会都不跟丢。</p>
    </div>
    ${h?"":B()}
    <div class="empty">看板还是空的——在「ASIN 分析」的报告页点「转为立项」，通过验证的机会会出现在这里。</div>
    <section class="an-card onboard">
      <b>这一环怎么用</b>
      <ol>
        <li>雷达发现类目机会，用「ASIN 分析」验证具体单品</li>
        <li>报告页点「转为立项」，项目以「待评估」进入看板</li>
        <li>完成利润测算 → 用 ← / → 推进阶段，随时点「备注」记录供应商与报价</li>
      </ol>
      <a class="btn btn-primary" href="#/analyze">去 ASIN 分析</a>
    </section>`}function Qs(t,s){return`
  <div class="pj-col ${t==="已放弃"?"dead":""}">
    <div class="pj-col-head">${t}<span>${s.length}</span></div>
    ${s.map(Ys).join("")||'<div class="pj-empty">暂无项目</div>'}
  </div>`}function Ys(t){const s=P.indexOf(t.stage),a=s>0?P[s-1]:null,e=s>=0&&s<P.length-1?P[s+1]:null,n=t.margin!=null?`<span class="rm-sub ${t.margin>=30?"up":t.margin>=20?"flat":"down"}">毛利 ${t.margin}%</span>`:'<button class="pj-mini" data-action="quick-profit" title="还没测算过利润">未测算</button>';return`
  <div class="pj-card">
    <div class="pj-name" data-action="open-analysis" data-id="${t.analysis_id}" title="点击回看分析报告">${r(t.name)}</div>
    <div class="pj-meta">ASIN ${r(t.asin)} · ${r(t.keyword)}</div>
    <div class="pj-chips">
      <span class="chip-soft ${t.grade_cls}">指数 ${t.score}</span>
      ${n}
    </div>
    ${t.note?`<div class="pj-note">${r(t.note)}</div>`:""}
    <div class="pj-ops">
      ${a?`<button class="pj-arrow" data-action="project-move" data-id="${t.id}" data-dir="back" title="退回：${a}">←</button>`:"<span></span>"}
      <button class="pj-mini" data-action="project-note" data-id="${t.id}">备注</button>
      <button class="pj-mini danger" data-action="project-del" data-id="${t.id}">删除</button>
      ${e?`<button class="pj-arrow" data-action="project-move" data-id="${t.id}" data-dir="next" title="推进：${e}">→</button>`:"<span></span>"}
    </div>
    <div class="pj-time">更新于 ${r(t.updated_at)}</div>
  </div>`}async function mt(t,s){try{const a=await fetch(`${$}/api/projects/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),e=await a.json();if(!a.ok)return l(`⚠️ ${e.detail||"更新失败"}`),null;const n=S.findIndex(i=>i.id===t);return n>=0&&(S[n]=e),nt=!1,f(),e}catch{return l("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function ta(t,s){const a=S.find(c=>c.id===t);if(!a)return;const n=P.indexOf(a.stage)+(s==="next"?1:-1);if(n<0||n>=P.length)return;const i=P[n];if(i==="已放弃"&&!await E({title:"标记为「已放弃」？",text:"不会删除记录，也不影响 ASIN 分析；之后可用 ← 按钮退回上一阶段。",ok:"确认放弃"}))return;await mt(t,{stage:i})&&l(`已移到「${i}」`,!0)}async function sa(t){const s=S.find(e=>e.id===t);if(!s)return;const a=await Bt({title:"项目备注",text:"记录供应商、报价、样品进度……随时可改。",label:"备注（200 字内）",value:s.note||""});a!==null&&mt(t,{note:a})}async function aa(){if(!y||!h){l("需要后端在线");return}try{const t=await fetch(`${$}/api/projects`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({analysis_id:y.id})}),s=await t.json();if(!t.ok){l(`⚠️ ${s.detail||"转入失败"}`);return}S.unshift(s),nt=!1,f(),l("✅ 已转入立项看板（待评估）",!0)}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}}async function ea(t){const s=S.find(e=>e.id===t);if(!(!s||!await E({title:`从看板删除「${s.name}」？`,text:"只删除看板卡片，不影响 ASIN 分析记录。",ok:"删除",danger:!0}))){try{const e=await fetch(`${$}/api/projects/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}S=S.filter(e=>e.id!==t),f()}}function na(){const t=[["pf-price","售价","$","目标卖价，如 29.99"],["pf-purchase","采购成本","$/件","供应商报价 + 国内运费"],["pf-inbound","头程物流","$/件","海运/空运 + 关税，按件摊薄"],["pf-fba","FBA 配送费","$/件","按尺寸重量，用亚马逊物流计算器查"]],s=[["pf-other","其他成本","$/件","包装 / 推广摊薄，可不填"],["pf-ref_pct","佣金率","%","大部分类目 15"],["pf-monthly","预估月销量","件","填了多一行月利润"]];return setTimeout(bt,0),`
  <div class="page-head">
    <h1>利润计算器</h1>
    <p>FBA 毛利模型：售价 − 佣金 − 配送费 − 采购 − 头程 − 其他。改任一数字，结果实时重算。</p>
  </div>
  ${h?"":B()}
  <section class="an-card">
    <div class="pf-sec-label">成本输入<span>前 4 项必填</span></div>
    <div class="pf-row pf-row-4">${t.map(St).join("")}</div>
    <div class="pf-sec-label">可选参数<span>有数就算，没数按默认</span></div>
    <div class="pf-row pf-row-3">${s.map(St).join("")}</div>
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
  </section>`}function St([t,s,a,e]){return`
  <div class="field">
    <label>${s}</label>
    <div class="pf-inbox">
      <input id="${t}" class="input pf-input" placeholder="0" autocomplete="off">
      <span class="pf-unit">${a}</span>
    </div>
    <div class="f-hint">${e}</div>
  </div>`}function ia(){return Zt(),`
  <div class="page-head ph-row">
    <div>
      <h1>供应商库</h1>
      <p>谈完一家记一家——报价、起订量、联系方式集中在这里，立项后找货不翻聊天记录。</p>
    </div>
    <div class="ph-actions">
      <button class="btn btn-primary btn-sm" data-action="supplier-add">＋ 供应商</button>
    </div>
  </div>
  ${h?"":B()}
  ${_.length?`
  <section class="an-card" style="padding:4px 14px">
    <table class="an-table">
      <thead><tr><th>供应商</th><th>主营类目</th><th>当前报价</th><th>起订量</th><th>联系方式</th><th>备注</th><th>更新</th><th></th></tr></thead>
      <tbody>
        ${_.map(t=>`
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
  </section>`:h&&Q?`<section class="an-card">${R(4)}</section>`:'<div class="empty">还没有供应商记录——谈完第一家就记进来：名称、报价、起订量。</div>'}`}function ra(){if(!h){l("需要后端在线——启动方法见页面提示");return}J(`
    <button class="m-close" data-action="close-modal">✕</button>
    <h3>添加供应商</h3>
    <p class="m-sub">只有名称必填，其余谈完随时补。</p>
    <div class="an-grid">
      ${[["sp-name","供应商名称（必填）","如：宁波某某家居用品厂"],["sp-category","主营类目","如：宠物窝垫 / 厨房收纳"],["sp-quote","当前报价","如 $8.5/件 或 62元/件"],["sp-moq","起订量","如 500"],["sp-contact","联系方式","微信 / 电话 / 1688 店铺名"],["sp-note","备注","打样费、交期、账期、配合度……"]].map(([s,a,e])=>`
      <div class="field">
        <label>${a}</label>
        <input id="${s}" class="input sp-input" placeholder="${r(e)}" autocomplete="off">
      </div>`).join("")}
    </div>
    <div class="m-actions">
      <button class="btn btn-primary" data-action="supplier-save">保存</button>
    </div>`)}async function Ht(){const t=a=>{var e;return(((e=document.getElementById(a))==null?void 0:e.value)||"").trim()};if(!t("sp-name")){l("供应商名称不能为空");return}const s=document.querySelector('[data-action="supplier-save"]');w(s,!0,"保存中…");try{const a=await fetch(`${$}/api/suppliers`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t("sp-name"),category:t("sp-category"),quote:t("sp-quote"),moq:t("sp-moq"),contact:t("sp-contact"),note:t("sp-note")})}),e=await a.json();if(!a.ok){l(`⚠️ ${e.detail||"保存失败"}`);return}_.unshift(e),Q=!1,D(),l("✅ 已记录供应商",!0),f()}catch{l("⚠️ 连不上后端，请确认 uvicorn 还在运行")}finally{w(s,!1)}}async function oa(t,s){try{const a=await fetch(`${$}/api/suppliers/${t}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(s)}),e=await a.json();if(!a.ok)return l(`⚠️ ${e.detail||"更新失败"}`),null;const n=_.findIndex(i=>i.id===t);return n>=0&&(_[n]=e),Q=!1,f(),e}catch{return l("⚠️ 连不上后端，请确认 uvicorn 还在运行"),null}}async function Tt(t,s,a,e){const n=_.find(o=>o.id===t);if(!n)return;const i=await Bt({title:a,text:`${n.name} 的当前${e}，直接改成新内容。`,label:e,value:n[s]||""});i!==null&&await oa(t,{[s]:i})&&l("已更新",!0)}async function ca(t){const s=_.find(e=>e.id===t);if(!(!s||!await E({title:`删除「${s.name}」？`,text:"这条供应商记录会一起删掉，不可恢复。",ok:"删除",danger:!0}))){try{const e=await fetch(`${$}/api/suppliers/${t}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`)}catch{l("⚠️ 删除失败，请确认后端在线");return}_=_.filter(e=>e.id!==t),f()}}function Ft(t){const s=t.rounds[t.rounds.length-1],a=t.rounds[t.rounds.length-2]||null,e=T.filter(p=>(p.keyword||"").toLowerCase()===t.keyword.toLowerCase()).sort((p,j)=>j.score-p.score),n=e.filter(p=>p.profit),i=n.length?n.reduce((p,j)=>j.profit.result.margin>p.profit.result.margin?j:p):null,o=a?s.score>a.score?`机会指数较上轮上升 ${s.score-a.score} 分`:s.score<a.score?`机会指数较上轮下降 ${a.score-s.score} 分`:"机会指数与上轮持平":"首轮采集，暂无趋势",c=[`关键词「${t.keyword}」当前 ${s.grade}（机会指数 ${s.score}/100），${o}。`,e.length?`已深度分析 ${e.length} 个相关 ASIN，最高机会指数 ${Math.max(...e.map(p=>p.score))}${i?`，测算毛利率最高 ${i.profit.result.margin}%（${i.name}）`:""}。`:"尚未对该关键词下的具体商品做深度分析，建议先对头部商品跑一轮 ASIN 分析。",s.grade_cls!=="g-c"?"建议：维持当前监控节奏，优先对头部商品完成 ASIN 分析与利润测算，达到立项标准即转入看板跟进。":"建议：该类目当前竞争或需求信号偏弱，保持低频监控，暂不投入选品资源。"];return{cur:s,prev:a,related:e,trend:o,conclusion:c}}function la(t){const s=T.filter(a=>(a.keyword||"").toLowerCase()===t.toLowerCase()).sort((a,e)=>e.score-a.score);return s.length?s.map(a=>`
    <div class="rel-row" data-action="open-analysis" data-id="${a.id}" role="button" tabindex="0">
      <div class="rel-main">
        <div class="rel-name">${r(a.name)}</div>
        <div class="rel-meta">ASIN ${r(a.asin)}${a.profit?` · 毛利率 ${a.profit.result.margin}%`:""}</div>
      </div>
      <div class="rel-bar"><i style="width:${a.score}%"></i></div>
      <b class="rel-score">${a.score}</b>
    </div>`).join(""):'<div class="empty slim">该关键词下还没有 ASIN 分析——用「ASIN 分析」页对头部商品跑一份。</div>'}function Ot(t){const s=x.keywords.find(p=>p.id===t);if(!s||!s.rounds.length){l("这个关键词还没有采集轮次，先完成第 1 轮");return}const{cur:a,prev:e,related:n,trend:i,conclusion:o}=Ft(s),c=[{name:s.keyword,points:s.rounds.map(p=>p.score)}];document.getElementById("modal-root").innerHTML=`
  <div class="modal-backdrop drawer-on">
    <div class="drawer">
      <div class="dr-head">
        <div>
          <div class="dr-kw">${r(s.keyword)}</div>
          <div class="dr-sub">共 ${s.rounds.length} 轮采集 · 最新 ${r(a.collected_at)} · ${r(i)}</div>
        </div>
        <div class="dr-head-right">
          <span class="anr-grade ${a.grade_cls}">${r(a.grade)}</span>
          <button class="m-close" data-action="close-modal">✕</button>
        </div>
      </div>

      <div class="dr-score-row">
        ${es(a.score)}
        <div class="dr-score-facts">
          <div class="dr-fact"><b>${a.score}</b><span>当前指数</span></div>
          <div class="dr-fact"><b>${e?a.score>e.score?"↑":a.score<e.score?"↓":"→":"—"}</b><span>较上轮</span></div>
          <div class="dr-fact"><b>${s.rounds.length}</b><span>采集轮次</span></div>
          <div class="dr-fact"><b>${n.length}</b><span>相关 ASIN</span></div>
        </div>
      </div>

      <div class="m-label">机会指数走势</div>
      <div class="dr-chart">${Et(c,{h:190})}</div>

      <div class="m-label">最新一轮核心指标</div>
      <div class="kcard-metrics">
        ${z("搜索结果",a.results,e==null?void 0:e.results,L,"down")}
        ${z("头部 BSR",a.bsr,e==null?void 0:e.bsr,X,"down")}
        ${z("头部评论",a.reviews,e==null?void 0:e.reviews,L,"up")}
        ${z("头部价格",a.price,e==null?void 0:e.price,_t,null)}
      </div>

      <div class="m-label">判断依据（最新一轮）</div>
      <div class="anr-reason">${a.reason_lines.map(r).join("<br>")}</div>

      <div class="m-label">相关 ASIN 分析（${n.length}）</div>
      ${la(s.keyword)}

      <div class="m-label">综合结论</div>
      <div class="anr-reason dr-conclusion">${o.map(r).join("<br><br>")}</div>

      <div class="dr-actions">
        <button class="btn btn-primary" data-action="collect-open" data-id="${s.id}">采集下一轮</button>
        <button class="btn btn-ghost" data-action="brief-export" data-id="${s.id}">简报 PDF（备用）</button>
      </div>
    </div>
  </div>`}function da(t){const s=x.keywords.find(a=>a.id===t);if(!s||!s.rounds.length){l("这个关键词还没有采集轮次，先完成第 1 轮");return}document.getElementById("print-area").innerHTML=pa(s),window.print()}function pa(t){const{cur:s,related:a,trend:e,conclusion:n}=Ft(t);return`
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
        <div class="pr-sales">${r(e)}</div>
      </div>
    </div>
    <div class="pr-sec">最新一轮核心指标</div>
    <table class="pr-table">
      <tr><th>搜索结果数</th><th>头部 BSR</th><th>头部评论</th><th>头部价格</th><th>评论距今</th></tr>
      <tr><td>${L(s.results)}</td><td>${X(s.bsr)}</td><td>${L(s.reviews)}</td><td>$${s.price}</td><td>${s.days} 天</td></tr>
    </table>
    <div class="pr-sec">采集历史（近 8 轮）</div>
    <table class="pr-table">
      <tr><th>轮次</th><th>时间</th><th>指数</th><th>评级</th><th>结果数</th><th>BSR</th></tr>
      ${[...t.rounds].slice(-8).reverse().map(i=>`
      <tr><td>第 ${i.round_no} 轮</td><td>${r(i.collected_at)}</td><td><b>${i.score}</b></td><td>${r(i.grade.split(" · ")[0])}</td><td>${L(i.results)}</td><td>${X(i.bsr)}</td></tr>`).join("")}
    </table>
    <div class="pr-sec">判断依据（最新一轮）</div>
    ${s.reason_lines.map(i=>`<p class="pr-line">· ${r(i)}</p>`).join("")}
    ${a.length?`
    <div class="pr-sec">相关 ASIN 分析（${a.length}）</div>
    <table class="pr-table">
      <tr><th>商品</th><th>ASIN</th><th>机会指数</th><th>毛利率</th></tr>
      ${a.map(i=>`
      <tr><td>${r(i.name)}</td><td>${r(i.asin)}</td><td>${i.score}</td><td>${i.profit?i.profit.result.margin+"%":"—"}</td></tr>`).join("")}
    </table>`:""}
    <div class="pr-sec">综合结论</div>
    ${n.map(i=>`<p class="pr-line">· ${r(i)}</p>`).join("")}
    <div class="pr-foot">选品罗盘 · 数据为人工采集的公开信息 · 人工智能提供证据，团队保留最终判断</div>
  </div>`}const Rt=[{kind:"cutout",name:"自动抠图",desc:"商品抠图 / 白底图"},{kind:"sceneFission",name:"场景裂变",desc:"同款商品换场景"},{kind:"similarFission",name:"相似图裂变",desc:"裂变相似新款图"},{kind:"imageEdit",name:"智能修图",desc:"一句话改图（多模型）"},{kind:"changeModel",name:"换模特",desc:"服装图一键换模特"}],u={fn:"cutout",imageUrl:"",pickTarget:"imageUrl",params:{subType:"3",clothClass:"",strength:"0.5",fissionMode:"SCENE_FISSION_REALISTIC",weight:"2",scale:"1:1",provider:"KONTEXT",modelHeadImageUrl:"",sceneImgUrl:"",sceneStrength:"0.7",modelPrompt:"",customPrompt:"",customNegPrompt:"",genOriRes:"false",realModel:"true",outputNum:"1",note:""},tasks:[],tasksStale:!0};let at=null,O=null,zt="";async function ua(){if(h)try{const t=await fetch(`${$}/api/linkfox/tasks`);if(!t.ok)return;u.tasks=(await t.json()).tasks||[],u.tasksStale=!1}catch{}}function fa(){at||(at=setInterval(async()=>{if((location.hash||"")!=="#/studio"){clearInterval(at),at=null;return}const t=u.tasks.filter(a=>a.status===1||a.status===2);if(!t.length)return;let s=!1;for(const a of t)try{const e=a.kind==="text"?"text":"task",n=await fetch(`${$}/api/linkfox/${e}/${a.task_id}`,{method:"POST"});if(!n.ok)continue;const i=await n.json(),o=u.tasks.findIndex(c=>c.task_id===a.task_id);o>=0&&(i.status!==u.tasks[o].status||(i.images||[]).length!==(u.tasks[o].images||[]).length||(i.content||"")!==(u.tasks[o].content||""))&&(u.tasks[o]={...u.tasks[o],...i},s=!0)}catch{}s&&f()},1e4))}function va(){return u.tasksStale&&ua().then(()=>{location.hash==="#/studio"&&f()}),fa(),`
  <div class="page-head">
    <h1>AI 作图工坊</h1>
    <p>白底图、场景图、模特图、一句话修图——上传商品图，选好样式一键生成。</p>
  </div>
  ${h?"":B()}
  <section class="sf-card">
    <div class="sf-sec-title">选择功能</div>
    <div class="sf-fns">${Rt.map(t=>`
      <button class="sf-fn ${u.fn===t.kind?"on":""}" data-action="sf-set-fn" data-id="${t.kind}">
        <b>${t.name}</b><small>${t.desc}</small>
      </button>`).join("")}
    </div>
    ${ha()}
  </section>
  <section class="sf-card">
    <div class="sf-sec-title">任务记录 <span>结果图地址 8 小时内有效，过期用「换新地址」；记录最多保留 60 条</span></div>
    ${$a()}
  </section>`}const g=(t,s,a="")=>`
  <div class="field">
    <label>${t}</label>
    ${s}
    ${a?`<div class="f-hint">${a}</div>`:""}
  </div>`;function lt(t,s="上传本地图片"){return`<button class="btn btn-ghost btn-sm" data-action="sf-pick-file" data-target="${t}">${s}</button>`}function ha(){const t=u.params,s=(n,i)=>`
    <select class="input sf-input" data-field="${n}">
      ${i.map(([o,c])=>`<option value="${o}" ${String(t[n])===String(o)?"selected":""}>${c}</option>`).join("")}
    </select>`,a=(n,i,o=600)=>`
    <input class="input sf-input" data-field="${n}" placeholder="${r(i)}" maxlength="${o}" value="${r(t[n]??"")}">`;let e="";return u.fn==="cutout"?e=g("抠图类型",s("subType",[["3","商品（默认）"],["1","通用"],["2","人像"],["9","服饰"],["12","头发"],["13","人脸"]]))+(String(t.subType)==="9"?g("服饰部位（多选用逗号隔开）",a("clothClass","如 tops,skirt,bag",60),"可选：tops / coat / skirt / pants / bag / shoes / hat"):""):u.fn==="sceneFission"?e=g("与原图相似度",s("strength",[["0.3","0.3（场景变化大）"],["0.5","0.5（默认均衡）"],["0.7","0.7"],["0.9","0.9（场景变化小）"]]))+g("裂变模式",s("fissionMode",[["SCENE_FISSION_REALISTIC","写实（默认）"],["SCENE_FISSION_SIMPLE","简约"],["SCENE_FISSION_INTELLIGENT","智能"]]))+g("场景描述（可选）",a("prompt","如：北欧风客厅，清晨自然光，木桌面"),"不填则按原图自动提取，最长 600 字"):u.fn==="similarFission"?e=g("生图描述（可选）",a("prompt","如：换成莫兰迪配色的同款马克杯"))+g("与参考图相似度",s("weight",[["2","2 · 最像（默认）"],["1","1 · 中等"],["0","0 · 发散"]]))+g("输出比例",s("scale",[["1:1","1:1 方图"],["3:4","3:4 竖图"],["4:3","4:3 横图"],["9:16","9:16 手机屏"],["16:9","16:9 宽幅"]])):u.fn==="imageEdit"?e=g("想怎么改（必填）",`
      <textarea class="input sf-input sf-ta" data-field="prompt" rows="3" maxlength="3000"
        placeholder="如：把背景换成纯白底，商品居中占画面 80%，加轻微投影">${r(t.prompt??"")}</textarea>`,"一句话描述即可，最长 3000 字")+g("模型",s("provider",[["KONTEXT","KONTEXT（默认 · 稳）"],["GPT_2_5_IMAGE","GPT 2.5 Image"],["GPT_2_5_F_IMAGE","GPT 2.5 F Image"],["GPT_2_IMAGE","GPT 2 Image"],["BANANA_PRO","Banana Pro"],["QWEN_IMAGE_3_PRO","Qwen Image 3 Pro"]]),"不同模型的速度与风格略有差异，可多试几个"):u.fn==="changeModel"&&(e=g("模特头部图地址（必填）",a("modelHeadImageUrl","https://… 头部正脸照，512×512～2048×2048",500),"用旁边的「上传」按钮传本地图更方便")+g("",lt("modelHeadImageUrl","上传模特头部图"))+g("场景参考图（可选，建议用）",a("sceneImgUrl","https://… 768×768～4096×4096",500))+g("",lt("sceneImgUrl","上传场景参考图"))+g("场景相似度",s("sceneStrength",[["0.4","0.4（场景变化大）"],["0.7","0.7（默认）"],["0.9","0.9（贴场景）"]]))+g("模特特征（多选逗号隔开）",a("modelPrompt","如：微笑,坐着,苗条",100),"可选：微笑 / 大笑 / 坐着 / 躺着 / 肥胖 / 微胖 / 苗条 / 侧身 / 侧脸 / 背面 / 光头")+g("自定义描述（可选）",a("customPrompt","额外要求，最长 600 字"))+g("原图是真人还是人台",s("realModel",[["true","真人模特（默认）"],["false","人台 / 假模"]]))+g("输出尺寸",s("genOriRes",[["false","标准尺寸（默认）"],["true","原分辨率（更清晰，稍慢）"]]))),`
  <div class="sf-form">
    <div class="sf-src">
      ${g(u.fn==="changeModel"?"模特原图地址":"原图地址",`
        <input class="input sf-input" data-field="imageUrl" data-scope="top" placeholder="https://… 图片公网地址"
          value="${r(u.imageUrl)}">`,"jpg / png / webp；本地图点「上传本地图片」自动上传，即刻可用")}
      <div class="sf-src-btns">${lt("imageUrl")}${u.imageUrl?`<img class="sf-thumb" src="${r(u.imageUrl)}" alt="原图预览" referrerpolicy="no-referrer">`:""}</div>
    </div>
    ${e}
    ${u.fn!=="cutout"?g("输出张数",s("outputNum",[["1","1 张"],["2","2 张"],["3","3 张"],["4","4 张"]])):""}
    ${g("备注（写给自己看）",a("note","如：A 客户保温杯主图",120))}
    <div class="sf-submit-row">
      <button class="btn btn-primary" data-action="sf-submit">开始生成</button>
      <span class="sf-tip">提交前会再确认一次；生成约需 30 秒～2 分钟</span>
    </div>
  </div>
  <input type="file" id="sf-file" accept=".jpg,.jpeg,.png,.webp" hidden>`}function $a(){return h?u.tasks.length?`<div class="sf-tasks">${u.tasks.map(ba).join("")}</div>`:u.tasksStale?R(3):'<div class="empty slim">还没有任务——选好功能、放好图，点「开始生成」提交第一个任务。</div>':'<div class="empty slim">任务记录需要后端在线。</div>'}function ba(t){const s=t.status===1||t.status===2;return`
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
      ${t.images.map(a=>`
      <figure class="sf-shot">
        <img src="${r(a.url)}" alt="结果图" loading="lazy" referrerpolicy="no-referrer">
        <figcaption>
          <a href="${r(a.url)}" target="_blank" rel="noopener">打开原图</a>
          <a href="${$}/api/linkfox/download?url=${encodeURIComponent(a.url)}">下载</a>
          ${a.id?`<button class="linklike" data-action="sf-refresh-img" data-id="${r(a.id)}" title="地址 8 小时过期后换新的">换新地址</button>`:""}
        </figcaption>
      </figure>`).join("")}
    </div>`:""}
    ${t.kind==="text"&&t.content?`
    <div class="sf-text-out">${r(t.content)}</div>
    <button class="btn btn-ghost btn-sm" data-action="sf-copy-text" data-id="${r(t.task_id)}">复制文案</button>`:""}
    ${s?'<div class="sf-hint-run">生成中，页面开着会自动刷新（约 10 秒一查）……</div>':""}
    ${t.status===4?`<div class="sf-err">失败：${r(t.error||"平台未返回原因")}</div>`:""}
  </div>`}async function ma(t){const s=Rt.find(n=>n.kind===u.fn),a=u.imageUrl.trim();if(!a){l("请先填原图地址，或用「上传本地图片」");return}if(u.fn==="changeModel"&&!String(u.params.modelHeadImageUrl||"").trim()){l("换模特必填「模特头部图」——填地址或点上传按钮");return}if(u.fn==="imageEdit"&&!String(u.params.prompt||"").trim()){l("智能修图要填一句「想怎么改」");return}if(await E({title:`提交「${s.name}」任务`,text:"将按当前设置生成图片，约需 30 秒～2 分钟。确定提交？",ok:"开始生成"})){w(t,!0,"提交中…");try{const n=await fetch(`${$}/api/linkfox/task`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:u.fn,...u.params,imageUrl:a})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.detail||`HTTP ${n.status}`);u.tasks.unshift(i),u.params.note="",l(`已提交，平台排队中（任务号 …${String(i.task_id).slice(-6)}）`,!0),f()}catch(n){l(`提交失败：${n.message}`),w(t,!1)}}}async function ga(t,s,a){if(t.size>10*1024*1024){l("图片超过 10MB 上限——先压缩再传");return}w(a,!0,"上传中…");try{const e=await new Promise((o,c)=>{const p=new FileReader;p.onload=()=>o(String(p.result).replace(/^data:[^,]+,/,"")),p.onerror=()=>c(new Error("本地文件读取失败")),p.readAsDataURL(t)}),n=await fetch(`${$}/api/linkfox/upload`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({fileName:t.name,base64:e})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.detail||`HTTP ${n.status}`);s==="imageUrl"?u.imageUrl=i.url:u.params[s]=i.url,l("上传成功，已回填地址",!0),f()}catch(e){l(`上传失败：${e.message}`),w(a,!1)}}async function ya(t,s){var a;try{const e=await fetch(`${$}/api/linkfox/refresh`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({imageId:t})}),n=await e.json().catch(()=>({}));if(!e.ok)throw new Error(n.detail||`HTTP ${e.status}`);const i=(a=s.closest("figure"))==null?void 0:a.querySelector("img");i&&(i.src=n.url);try{await navigator.clipboard.writeText(n.url),l("已换新地址（也复制了一份）",!0)}catch{l("已换新地址",!0)}}catch(e){l(`换地址失败：${e.message}`)}}async function wa(t){if(await E({title:"删除任务记录",text:"只删除本地记录，已生成的图片不受影响。确定删除？",ok:"删除",danger:!0}))try{const a=await fetch(`${$}/api/linkfox/tasks/${t}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`);u.tasks=u.tasks.filter(e=>e.task_id!==t),f()}catch(a){l(`删除失败：${a.message}`)}}async function jt(t){try{await navigator.clipboard.writeText(t),l("已复制",!0)}catch{l("复制失败——请手动全选复制")}}function ka(t){const s=`商品：${t.name}（ASIN ${t.asin}）
关键词：${t.keyword}
机会指数：${t.score}/100（${t.grade}）
预估月销：${t.est_sales}${t.profit?`
毛利率：${t.profit.result.margin}%`:""}`;return{letter:`你是资深跨境电商选品顾问。根据下面的 Amazon 商品分析数据，写一封发给客户的中文开发信（首次触达）：简短问候 → 用数据点出这个品的机会 → 介绍我们能提供的服务（选品分析 / 供应链对接 / 利润测算）→ 给出明确的下一步行动。语气专业不油腻，300 字以内。

${s}`,follow:`你是资深跨境电商选品顾问。客户之前看过下面这个 Amazon 商品的分析报告但还没回复，写一封中文跟进邮件：礼貌唤起记忆 → 补充一个新角度的价值点（结合数据）→ 低压力地推动下一步。200 字以内，别催促感太重。

${s}`,pitch:`你是跨境电商运营专家。根据下面的 Amazon 商品分析数据，写一段发在客户群/朋友圈的中文新品推荐文案：一个抓人的开头 + 3 个数据支撑的卖点（用 emoji 分隔）+ 一句行动召唤。150 字以内。

${s}`}}function xa(t){u.copy={report:t,preset:"letter",prompts:ka(t),result:null},Y()}function Y(){const t=u.copy;if(!t)return;const s=[["letter","开发信（首次触达）"],["follow","跟进邮件"],["pitch","新品推荐文案"]],a=t.result?t.result.status===3?`<div class="sf-text-out">${r(t.result.content)}</div>
           <div class="m-actions"><button class="btn btn-primary btn-sm" data-action="lf-cw-copy">复制文案</button></div>`:`<div class="sf-err">生成失败：${r(t.result.error||"平台未返回原因")}</div>`:'<div class="sf-hint-run">生成中，通常 10～30 秒……</div><div class="sf-text-out ghost">AI 正在组织语言……</div>';J(`
    <h3>AI 写话术</h3>
    <p class="dlg-text">已把报告数据（${r(t.report.name)}）拼进提示词，可直接改。</p>
    <div class="sf-cw-presets">${s.map(([e,n])=>`<button class="sf-fn mini ${t.preset===e?"on":""}" data-action="lf-cw-preset" data-id="${e}">${n}</button>`).join("")}
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
    <div id="lf-cw-out">${a}</div>`)}async function Sa(t){var e;const s=u.copy;if(!s)return;const a=(((e=document.getElementById("lf-cw-prompt"))==null?void 0:e.value)||"").trim();if(!a){l("提示词不能为空");return}w(t,!0,"提交中…");try{const n=await fetch(`${$}/api/linkfox/text`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:a,model:"GEM_3_7_FLASH",note:`${s.report.name} 话术`})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i.detail||`HTTP ${n.status}`);s.result={status:1},Y(),Ta(i.task_id)}catch(n){l(`提交失败：${n.message}`),w(t,!1)}}function Ta(t){clearInterval(O),O=setInterval(async()=>{if(!document.getElementById("lf-cw-out")){clearInterval(O),O=null;return}try{const a=await fetch(`${$}/api/linkfox/text/${t}`,{method:"POST"});if(!a.ok)return;const e=await a.json();e.status===3?(clearInterval(O),O=null,u.copy.result={status:3,content:e.content,count:e.count},zt=e.content,Y()):e.status===4&&(clearInterval(O),O=null,u.copy.result={status:4,error:e.error},Y())}catch{}},3e3)}let U={asin:"",plan:"standard"},C=null,ot=[],gt=!0;const G={light:{label:"精简",desc:"每星级 10 条 · 共 50",stars:[10,10,10,10,10]},standard:{label:"标准",desc:"差评加权 · 共 70",stars:[25,15,10,10,10]},deep:{label:"深挖",desc:"痛点深挖 · 共 115",stars:[50,30,15,10,10]}};async function ja(){try{ot=(await(await fetch(`${$}/api/reviews/history`)).json()).reports||[],gt=!1,f()}catch{}}function Ma(){return gt&&h&&ja(),`
  <div class="page-head">
    <h1>评论分析</h1>
    <p>输入 ASIN → 联网按采样方案读取买家评论 → 本地统计「差评痛点 / 认可卖点 / 差异化机会」。每条结论都附真实评论摘录与提及次数，只统计、不编造。</p>
  </div>
  ${h?"":B()}
  ${C?Aa(C):Ia()}
  ${La()}`}function Ia(){const t=Object.entries(G).map(([s,a])=>`
    <button class="rv-plan ${U.plan===s?"on":""}" data-action="rv-plan" data-plan="${s}">
      <b>${a.label}</b><span>${a.desc}</span>
    </button>`).join("");return`
  <section class="an-card rv-hero">
    <div class="rv-hero-l">
      <b>从买家评论中找到市场切入点</b>
      <p>读取真实买家评论：差评里统计高频抱怨，好评里统计认可点，再转成差异化机会。取样偏向差评（痛点信息量最大），差评/好评口径与 ASIN 分析报告一致（1-3 星 / 4-5 星）。</p>
      <div class="rv-legend">
        <span><i></i>差评痛点</span>
        <span><i></i>认可卖点</span>
        <span><i></i>差异化机会</span>
      </div>
    </div>
    <div class="rv-hero-r">
      <label class="rv-label" for="rv-asin">商品 ASIN（Amazon US）</label>
      <input id="rv-asin" class="input rv-input" data-field="asin" placeholder="B0D9RPX853"
             maxlength="10" autocomplete="off" value="${r(U.asin)}">
      <div class="rv-plans">${t}</div>
      <div class="f-hint">仅支持 10 位 ASIN；点「开始分析」后先确认采样方案，再联网读取评论。分析在本地完成，历史只存统计结果与摘录。</div>
      <button class="btn btn-primary" data-action="rv-run">开始分析</button>
      <div id="rv-prog-host"></div>
    </div>
  </section>`}function Aa(t){const s=t.summary||{},a=s.total?Math.round((s.neg_count||0)/s.total*100):0,e=s.total?Math.round((s.pos_count||0)/s.total*100):0,n=G[t.plan]||G.standard,i=(o,c)=>`<div class="rv-tile"><b>${o}</b><span>${c}</span></div>`;return`
  <section class="an-card">
    <div class="rv-res-head">
      <div class="rv-res-title">
        <b>ASIN ${r(t.asin)}</b>
        <span>${r(t.ts||"")} · ${n.label}方案 · 实取 ${s.total??0} 条评论</span>
      </div>
      <button class="btn btn-ghost btn-sm" data-action="rv-reset">再分析一个</button>
    </div>
    <div class="rv-tiles">
      ${i(s.total??0,"采样评论")}
      ${i(`${a}%`,"差评占比（1-3 星）")}
      ${i(`${e}%`,"好评占比（4-5 星）")}
      ${i(s.avg_rating??"-","样本平均星级")}
    </div>
    ${Mt("red","差评痛点","按提及次数排序 · 点条目展开原文摘录",t.pains)}
    ${Mt("green","认可卖点","好评里的高频认可点 · 点条目展开原文摘录",t.praises)}
    ${_a(t.opportunities)}
    <details class="an-raw-view"><summary>数据服务原始返回（排查用）</summary><pre>${r(t.raw_preview||"")}</pre></details>
  </section>`}function Mt(t,s,a,e){const n=e||[],i=Math.max(1,...n.map(c=>c.count||0)),o=n.length?n.map(c=>`
    <div class="rv-row" data-action="rv-row" title="点开/收起原文摘录">
      <span class="rv-row-label">${r(c.label)}</span>
      <div class="rv-track"><div class="rv-bar ${t}" style="width:${Math.max(6,Math.round((c.count||0)/i*100))}%"></div></div>
      <b class="rv-row-n">${c.count||0} 条</b>
      ${c.quote?`<div class="rv-quote">“${r(c.quote)}”</div>`:""}
    </div>`).join(""):'<div class="rv-empty">这一组没有统计到足够的信号。</div>';return`
  <div class="rv-sec">
    <div class="rv-sec-h"><i class="rv-dot ${t}"></i><b>${s}</b><span>${a}</span></div>
    ${o}
  </div>`}function _a(t){const s=t||[];return s.length?`
  <div class="rv-sec">
    <div class="rv-sec-h"><i class="rv-dot blue"></i><b>差异化机会</b><span>由前三条痛点改写——在详情页/规格里正面回应这些抱怨</span></div>
    ${s.map(a=>`
    <div class="rv-opp">
      <b>${r(a.label)}</b>
      <span class="rv-opp-n">${a.count} 条差评提及</span>
      ${a.quote?`<p>“${r(a.quote)}”</p>`:""}
    </div>`).join("")}
  </div>`:""}function La(){return ot.length?`
  <section class="an-card">
    <div class="rv-sec-h"><b>历史分析</b><span>点击回看（存本机后端，仅统计结果与摘录）</span></div>
    ${ot.map(t=>{var s,a;return`
    <button class="rv-hist ${(C==null?void 0:C.id)===t.id?"on":""}" data-action="rv-open" data-id="${r(t.id)}">
      <b>ASIN ${r(t.asin)}</b>
      <span>${r(t.ts||"")} · ${(G[t.plan]||G.standard).label} · ${((s=t.summary)==null?void 0:s.total)??0} 条 · 痛点 ${((a=t.pains)==null?void 0:a.length)??0}</span>
      <i class="rv-chev">›</i>
    </button>`}).join("")}
  </section>`:""}async function Ea(t){const s=String(U.asin||"").trim().toUpperCase();if(!/^[A-Z0-9]{10}$/.test(s)){l("先填 10 位 ASIN（字母数字）");return}if(!h){l("评论分析需要后端在线——启动方法见页面顶部提示");return}const a=G[U.plan]||G.standard,e=a.stars.reduce((c,p)=>c+p,0);if(!await E({title:"分析买家评论",text:`将联网读取 ASIN ${s} 的买家评论（${a.label}方案：1~5 星分别取 ${a.stars.join("/")} 条，最多 ${e} 条），随后在本地统计痛点与卖点。确定开始？`,ok:"开始"}))return;w(t,!0,"读取评论中…");const i=$t("rv-prog-host","正在读取买家评论");let o=!1;try{const c=await fetch(`${$}/api/amz/reviews`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({asin:s,plan:U.plan})}),p=await c.json();if(!c.ok){l(`⚠️ ${p.detail||"分析失败"}`);return}C=p,gt=!0,f(),l(`✅ 已分析 ${p.summary.total} 条评论：痛点 ${p.pains.length} · 卖点 ${p.praises.length} · 机会 ${p.opportunities.length}`,!0),o=!0}catch{l("⚠️ 连不上后端，请确认后端还在运行")}finally{i==null||i.end(o),w(t,!1)}}const dt={"#/":{render:kt,page:"监控总览",eyebrow:"Workbench Overview"},"#/workbench":{render:kt,page:"监控总览",eyebrow:"Workbench Overview"},"#/radar":{render:us,page:"关键词雷达",eyebrow:"Keyword Radar"},"#/analyze":{render:qs,page:"ASIN 分析",eyebrow:"ASIN Intelligence"},"#/reviews":{render:Ma,page:"评论分析",eyebrow:"Review Intelligence"},"#/studio":{render:va,page:"AI 作图工坊",eyebrow:"AI Image Studio"},"#/profit":{render:na,page:"利润计算器",eyebrow:"Profit Calculator"},"#/suppliers":{render:ia,page:"供应商库",eyebrow:"Supplier Directory"},"#/projects":{render:Vs,page:"立项看板",eyebrow:"Project Pipeline"}};function f(){const t=location.hash||"#/",s=dt[t]||dt["#/"];document.getElementById("app").innerHTML=`
    <div class="layout">
      ${Qt(dt[t]?t:"#/")}
      <div class="main">
        ${Yt(s.page)}
        <div class="content"><div class="ph-eyebrow">${s.eyebrow}</div>${s.render()}${ts()}</div>
      </div>
    </div>`}window.addEventListener("hashchange",f);document.addEventListener("click",t=>{var i;const s=t.target.closest("[data-action]");if(!s){t.target.classList&&t.target.classList.contains("modal-backdrop")&&D();return}const{action:a,id:e,dir:n}=s.dataset;switch(a){case"guide":Us();break;case"close-modal":D();break;case"dialog-ok":{const o=document.getElementById("dlg-input");ft(o?o.value.trim().slice(0,200):!0);break}case"dialog-cancel":ft(null);break;case"add-keyword":Nt();break;case"kw-toggle":$s(e);break;case"collect-open":ms(x.keywords.find(o=>o.id===e));break;case"collect-submit":gs(e);break;case"del-keyword":bs(e);break;case"kw-detail":Ot(e);break;case"brief-export":da(e);break;case"open-analysis":Cs(e);break;case"parse-asin":Ct();break;case"reset-asin":Ss();break;case"fill-sample":xs();break;case"extract-paste":Ts();break;case"amz-detail":As(s);break;case"amz-search":Ls(s);break;case"rv-run":Ea(s);break;case"rv-plan":U.plan=s.dataset.plan,f();break;case"rv-reset":C=null,f();break;case"rv-open":C=ot.find(o=>o.id===s.dataset.id)||C,f();break;case"rv-row":s.classList.toggle("open");break;case"apply-kw":Ms();break;case"analyze-submit":Ps();break;case"del-analysis":Bs(e);break;case"export-pdf":Gs();break;case"copy-report":Ks();break;case"profit-open":xt(y);break;case"quick-profit":xt(null);break;case"profit-save":Xs();break;case"project-add":aa();break;case"project-move":ta(e,n);break;case"project-note":sa(e);break;case"project-del":ea(e);break;case"supplier-add":ra();break;case"supplier-save":Ht();break;case"supplier-quote":Tt(e,"quote","改报价","报价");break;case"supplier-note":Tt(e,"note","供应商备注","备注");break;case"supplier-del":ca(e);break;case"sf-set-fn":u.fn=e,f();break;case"sf-submit":ma(s);break;case"sf-pick-file":u.pickTarget=s.dataset.target||"imageUrl",(i=document.getElementById("sf-file"))==null||i.click();break;case"sf-del-task":wa(e);break;case"sf-refresh-img":ya(e,s);break;case"sf-copy-text":jt((u.tasks.find(o=>o.task_id===e)||{}).content||"");break;case"lf-copywriting":xa(T.find(o=>o.id===e)||y);break;case"lf-cw-preset":u.copy&&(u.copy.preset=e,Y());break;case"lf-cw-submit":Sa(s);break;case"lf-cw-copy":jt(zt);break}});document.addEventListener("input",t=>{t.target.classList.contains("af-input")&&t.target.dataset.field&&(d[t.target.dataset.field]=t.target.value),t.target.classList.contains("sf-input")&&t.target.dataset.field&&(t.target.dataset.scope==="top"?u.imageUrl=t.target.value:u.params[t.target.dataset.field]=t.target.value),t.target.classList.contains("rv-input")&&t.target.dataset.field&&(U[t.target.dataset.field]=t.target.value.toUpperCase()),t.target.classList.contains("pf-input")&&bt(),t.target.id==="kw-input"&&(rt=t.target.value)});document.addEventListener("change",t=>{var a;if(t.target.id!=="sf-file"||!((a=t.target.files)!=null&&a.length))return;const s=document.querySelector(`[data-action="sf-pick-file"][data-target="${u.pickTarget}"]`);ga(t.target.files[0],u.pickTarget,s),t.target.value=""});document.addEventListener("keydown",t=>{var s;t.key==="Enter"&&t.target.id==="kw-input"&&Nt(),t.key==="Enter"&&t.target.id==="an-raw"&&Ct(),t.key==="Enter"&&((s=t.target.dataset)==null?void 0:s.action)==="kw-detail"&&Ot(t.target.dataset.id),t.key==="Enter"&&t.target.id==="dlg-input"&&ft(t.target.value.trim().slice(0,200)),t.key==="Enter"&&t.target.id==="sp-name"&&Ht(),t.key==="Escape"&&D()});Kt().then(f);
