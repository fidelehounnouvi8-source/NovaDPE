import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════
// ECOSCAN AI v6 — Direction artistique : Warm Premium
// Palette : Crème · Brun profond · Bleu saphir · Ambre doré
// Style : Dense · Pro · Linear/Notion inspired
// ═══════════════════════════════════════════════════════════════════

// ── DESIGN TOKENS ──────────────────────────────────────────────────
const T = {
  // Fonds
  bg:       "#FAF7F2",
  bg2:      "#F5F0E8",
  bg3:      "#EDE8DE",
  // Sidebar
  sidebar:  "#1C1008",
  sidebarL: "#2A1A0C",
  // Textes
  text:     "#1A1208",
  text2:    "#4A3728",
  muted:    "#8B7355",
  // Accents
  blue:     "#2563EB",
  blueL:    "#3B82F6",
  blueD:    "#1D4ED8",
  blueSoft: "#EFF6FF",
  blue2:    "#60A5FA",
  // Ambre
  amber:    "#D97706",
  amberL:   "#F59E0B",
  amberSoft:"#FFFBEB",
  // Vert sauge
  sage:     "#059669",
  sageSoft: "#ECFDF5",
  // Rouge
  rose:     "#DC2626",
  roseSoft: "#FEF2F2",
  // Bordures
  border:   "#E5DDD0",
  border2:  "#D4C9B8",
  // Cartes
  card:     "#FFFFFF",
  cardHov:  "#FDFAF6",
};

const DPE_C = {A:"#059669",B:"#10B981",C:"#84CC16",D:"#EAB308",E:"#F97316",F:"#EF4444",G:"#DC2626"};
const DPE_W = {A:30,B:42,C:55,D:67,E:79,F:88,G:96};

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cal+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',sans-serif;background:#FAF7F2;color:#1A1208;-webkit-font-smoothing:antialiased;overflow-x:hidden}
::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#FAF7F2}::-webkit-scrollbar-thumb{background:#D4C9B8;border-radius:3px}

/* BUTTONS */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;border:none;cursor:pointer;font-family:'Inter',sans-serif;font-weight:600;border-radius:8px;transition:all .2s ease;white-space:nowrap;font-size:13px;letter-spacing:-.01em}
.bp{background:#2563EB;color:white;padding:9px 18px;box-shadow:0 1px 3px rgba(37,99,235,.3),0 4px 12px rgba(37,99,235,.15)}
.bp:hover{background:#1D4ED8;box-shadow:0 2px 8px rgba(37,99,235,.4),0 8px 20px rgba(37,99,235,.2);transform:translateY(-1px)}
.bp:active{transform:translateY(0)}
.bsec{background:#FAF7F2;color:#1A1208;padding:9px 18px;border:1.5px solid #E5DDD0;box-shadow:0 1px 3px rgba(0,0,0,.06)}
.bsec:hover{background:#F5F0E8;border-color:#D4C9B8}
.bamb{background:#D97706;color:white;padding:9px 18px;box-shadow:0 1px 3px rgba(217,119,6,.3)}
.bamb:hover{background:#B45309;transform:translateY(-1px)}
.bsm{padding:6px 12px!important;font-size:12px!important}
.bdanger{background:#FEF2F2;color:#DC2626;border:1px solid #FECACA;padding:7px 14px}
.bdanger:hover{background:#FEE2E2}

/* CARDS */
.card{background:white;border:1px solid #E5DDD0;border-radius:12px;box-shadow:0 1px 3px rgba(0,0,0,.04),0 4px 12px rgba(0,0,0,.03)}
.card-hover{transition:all .2s ease}.card-hover:hover{box-shadow:0 4px 16px rgba(0,0,0,.08),0 12px 32px rgba(0,0,0,.06);transform:translateY(-2px);border-color:#D4C9B8}

/* BADGE */
.badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;border-radius:100px;font-size:11px;font-weight:600;letter-spacing:.02em}
.badge-blue{background:#EFF6FF;color:#2563EB;border:1px solid #DBEAFE}
.badge-amber{background:#FFFBEB;color:#D97706;border:1px solid #FDE68A}
.badge-green{background:#ECFDF5;color:#059669;border:1px solid #A7F3D0}
.badge-red{background:#FEF2F2;color:#DC2626;border:1px solid #FECACA}
.badge-stone{background:#F5F0E8;color:#8B7355;border:1px solid #E5DDD0}

/* INPUTS */
input,select,textarea{font-family:'Inter',sans-serif;font-size:13px;width:100%;padding:9px 12px;background:white;border:1.5px solid #E5DDD0;border-radius:8px;color:#1A1208;outline:none;transition:all .2s}
input::placeholder{color:#A89880}
input:focus,select:focus{border-color:#2563EB;box-shadow:0 0 0 3px rgba(37,99,235,.12)}
select option{background:white;color:#1A1208}
label{display:block;font-size:11px;font-weight:600;color:#8B7355;margin-bottom:5px;letter-spacing:.04em;text-transform:uppercase}

/* DIVIDER */
.divider{height:1px;background:#E5DDD0;margin:0}

/* ANIMS */
@keyframes fadeUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes pulse2{0%,100%{opacity:1}50%{opacity:.5}}
@keyframes bar{from{transform:scaleY(0)}to{transform:scaleY(1)}}
@keyframes slideR{from{opacity:0;transform:translateX(16px)}to{opacity:1;transform:translateX(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.au{animation:fadeUp .4s ease forwards}
.au2{animation:fadeUp .4s .07s ease both}
.au3{animation:fadeUp .4s .14s ease both}
.au4{animation:fadeUp .4s .21s ease both}

/* RESPONSIVE */
@media(max-width:768px){
  .hide-mobile{display:none!important}
  .col2{grid-template-columns:1fr!important}
  .col3{grid-template-columns:1fr 1fr!important}
  .col4{grid-template-columns:1fr 1fr!important}
  .hero-grid{grid-template-columns:1fr!important}
  .plans-grid{grid-template-columns:1fr!important}
  .hero-title{font-size:28px!important}
  .section-title{font-size:22px!important}
  .mobile-topbar{display:flex!important}
  .stats-row{grid-template-columns:1fr 1fr!important}
  /* Sidebar mobile : overlay par-dessus le contenu */
  .sidebar-desktop{display:none!important}
  .sidebar-mobile{display:block!important}
}
@media(min-width:769px){
  .mobile-topbar{display:none!important}
  .sidebar-desktop{display:block!important}
  .sidebar-mobile{display:none!important}
}

/* SPARKLINE */
.sparkline-dot{width:3px;height:3px;border-radius:50%}

/* NOTIFICATION DOT */
.notif-dot{width:7px;height:7px;border-radius:50%;background:#DC2626;border:1.5px solid white;position:absolute;top:-1px;right:-1px}

/* TREND */
.trend-up{color:#059669;font-size:11px;font-weight:600;display:flex;align-items:center;gap:3px}
.trend-down{color:#DC2626;font-size:11px;font-weight:600;display:flex;align-items:center;gap:3px}

/* GLASSMORPHISM */
.glass{background:rgba(255,255,255,0.7);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)}

/* GRADIENT TEXT */
.grad-text{background:linear-gradient(135deg,#2563EB,#7C3AED);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

/* SHIMMER */
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.shimmer{background:linear-gradient(90deg,#f0ece4 25%,#faf7f2 50%,#f0ece4 75%);background-size:200% 100%;animation:shimmer 1.5s infinite}

/* GLOW EFFECTS */
.glow-blue{box-shadow:0 0 20px rgba(37,99,235,.15),0 4px 12px rgba(37,99,235,.1)}
.glow-green{box-shadow:0 0 20px rgba(5,150,105,.15),0 4px 12px rgba(5,150,105,.1)}
.glow-amber{box-shadow:0 0 20px rgba(217,119,6,.15),0 4px 12px rgba(217,119,6,.1)}

/* ANIMATED GRADIENT BG */
@keyframes gradMove{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.grad-bg{background:linear-gradient(-45deg,#EFF6FF,#FAF7F2,#FFFBEB,#ECFDF5);background-size:400% 400%;animation:gradMove 12s ease infinite}

/* CARD 3D HOVER */
.card-3d{transition:transform .3s ease,box-shadow .3s ease}
.card-3d:hover{transform:translateY(-4px) rotateX(2deg);box-shadow:0 16px 40px rgba(0,0,0,.12),0 4px 12px rgba(0,0,0,.06)}

/* PULSE RING */
@keyframes ring{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.8);opacity:0}}
.pulse-ring::after{content:'';position:absolute;inset:0;border-radius:50%;border:2px solid currentColor;animation:ring 1.5s ease-out infinite}

/* NUMBER COUNTER */
@keyframes countUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}

/* PROGRESS ANIMATED */
@keyframes progFill{from{width:0}to{width:var(--w)}}

/* HERO PARTICLES */
@keyframes drift{0%,100%{transform:translate(0,0) rotate(0deg)}33%{transform:translate(15px,-20px) rotate(120deg)}66%{transform:translate(-10px,10px) rotate(240deg)}}
.particle{position:absolute;border-radius:50%;animation:drift linear infinite;pointer-events:none}

/* TOOLTIP */
.tooltip{position:relative}.tooltip::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:#1C1008;color:white;font-size:10px;padding:4px 8px;border-radius:6px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s}
.tooltip:hover::after{opacity:1}

/* METRIC CARD PREMIUM */
.metric-premium{background:linear-gradient(135deg,white,#FAFAF8);border:1px solid #E5DDD0;border-radius:16px;padding:18px;position:relative;overflow:hidden}
.metric-premium::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--accent,#2563EB)}

/* SVG ANIMATED */
@keyframes drawLine{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}
.animated-line{stroke-dasharray:1000;animation:drawLine 2s ease forwards}

/* SCORE RING */
@keyframes scoreRing{from{stroke-dashoffset:283}to{stroke-dashoffset:var(--score)}}
`;
// ── LOGO ────────────────────────────────────────────────────────────
function Logo({sm, white}) {
  const sz = sm ? 26 : 32;
  const textColor = white ? "#FFFFFF" : T.text;
  const subColor = white ? "rgba(255,255,255,.5)" : T.muted;
  return (
    <div style={{display:"flex",alignItems:"center",gap:8,cursor:"pointer",flexShrink:0}}>
      <svg width={sz} height={sz} viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" rx="10" fill="#2563EB"/>
        <rect x="8" y="20" width="10" height="13" rx="2" fill="rgba(255,255,255,.3)"/>
        <rect x="9.5" y="22" width="3" height="2.5" rx=".5" fill="white" opacity=".9"/>
        <rect x="13.5" y="22" width="3" height="2.5" rx=".5" fill="white" opacity=".9"/>
        <rect x="9.5" y="26" width="3" height="2.5" rx=".5" fill="white" opacity=".9"/>
        <rect x="13.5" y="26" width="3" height="2.5" rx=".5" fill="white" opacity=".9"/>
        <rect x="22" y="15" width="10" height="18" rx="2" fill="rgba(255,255,255,.45)"/>
        <rect x="23.5" y="17" width="3" height="2.5" rx=".5" fill="white"/>
        <rect x="27.5" y="17" width="3" height="2.5" rx=".5" fill="white"/>
        <rect x="23.5" y="21.5" width="3" height="2.5" rx=".5" fill="white"/>
        <rect x="27.5" y="21.5" width="3" height="2.5" rx=".5" fill="white"/>
        <rect x="23.5" y="26" width="3" height="2.5" rx=".5" fill="white"/>
        <rect x="27.5" y="26" width="3" height="2.5" rx=".5" fill="white"/>
        <circle cx="30" cy="10" r="5" fill="#F59E0B"/>
        <path d="M30 7.5V12.5M27.5 10H32.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
        <rect x="6" y="33" width="28" height="1.5" rx=".75" fill="rgba(255,255,255,.35)"/>
      </svg>
      <div>
        <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:sm?14:17,color:textColor,letterSpacing:"-.02em",lineHeight:1.1}}>
          Nova<span style={{color:"#2563EB"}}>DPE</span>
        </div>
        {!sm && <div style={{fontSize:9,color:subColor,fontWeight:500,letterSpacing:".05em",textTransform:"uppercase",marginTop:1}}>DPE · Énergie · IA</div>}
      </div>
    </div>
  );
}

// ── SPARKLINE SVG PREMIUM ─────────────────────────────────────────────
function Sparkline({data, color, h=32, w=80}) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const id = `sg${color.replace(/[^a-z0-9]/gi,"")}${w}`;
  const pts = data.map((v,i) => {
    const x = (i/(data.length-1))*w;
    const y = h - ((v-min)/range)*(h-6) - 3;
    return [x,y];
  });
  // Smooth bezier curve
  const smooth = pts.map((p,i) => {
    if(i===0) return `M${p[0]},${p[1]}`;
    const prev = pts[i-1];
    const cpx = (prev[0]+p[0])/2;
    return `C${cpx},${prev[1]} ${cpx},${p[1]} ${p[0]},${p[1]}`;
  }).join(" ");
  const area = `${smooth} L${pts[pts.length-1][0]},${h} L${pts[0][0]},${h} Z`;
  const lastPt = pts[pts.length-1];
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{overflow:"visible",flexShrink:0}}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25"/>
          <stop offset="100%" stopColor={color} stopOpacity="0"/>
        </linearGradient>
        <filter id={`glow${id}`}>
          <feGaussianBlur stdDeviation="1" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>
      <path d={area} fill={`url(#${id})`}/>
      <path d={smooth} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" filter={`url(#glow${id})`}/>
      {/* Animated dot at end */}
      <circle cx={lastPt[0]} cy={lastPt[1]} r="2.5" fill="white" stroke={color} strokeWidth="1.5"/>
      <circle cx={lastPt[0]} cy={lastPt[1]} r="4" fill={color} opacity=".2">
        <animate attributeName="r" values="3;6;3" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values=".3;0;.3" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
}

// ── KPI CARD PREMIUM ──────────────────────────────────────────────────
function KpiCard({label, value, sub, trend, trendUp, icon, color, sparkData, onClick}) {
  const [hov, setHov] = useState(false);
  const bg = color === "#2563EB" ? "#EFF6FF" : color === "#D97706" ? "#FFFBEB" : color === "#059669" ? "#ECFDF5" : "#F5F0E8";
  const accent = color || T.blue;
  return (
    <div
      onClick={onClick}
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        background:"white",border:`1px solid ${hov?accent+"44":T.border}`,
        borderRadius:16,padding:"16px 18px",cursor:onClick?"pointer":"default",
        transition:"all .25s ease",position:"relative",overflow:"hidden",
        transform:hov&&onClick?"translateY(-2px)":"none",
        boxShadow:hov?`0 8px 24px ${accent}18,0 2px 8px rgba(0,0,0,.06)`:"0 1px 4px rgba(0,0,0,.05)",
      }}>
      {/* Accent bar top */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${accent},${accent}88)`,opacity:hov?1:.5,transition:"opacity .25s"}}/>
      {/* BG decoration */}
      <div style={{position:"absolute",bottom:-20,right:-20,width:80,height:80,borderRadius:"50%",background:`${accent}06`,transition:"all .3s"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10,position:"relative"}}>
        <div style={{width:36,height:36,borderRadius:10,background:bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:17,flexShrink:0,boxShadow:`0 2px 8px ${accent}22`}}>{icon}</div>
        {sparkData && <Sparkline data={sparkData} color={accent} h={30} w={65}/>}
      </div>
      <div style={{fontSize:24,fontWeight:800,color:T.text,fontFamily:"'Outfit',sans-serif",letterSpacing:"-.04em",lineHeight:1,marginBottom:4,position:"relative"}}>{value}</div>
      <div style={{fontSize:11,color:T.muted,fontWeight:600,marginBottom:4,textTransform:"uppercase",letterSpacing:".03em"}}>{label}</div>
      {(trend||sub) && (
        <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
          {trend && <span style={{fontSize:11,fontWeight:700,color:trendUp?T.sage:T.rose,display:"flex",alignItems:"center",gap:2,background:trendUp?T.sageSoft:T.roseSoft,padding:"2px 7px",borderRadius:100}}>{trendUp?"↑":"↓"} {trend}</span>}
          {sub && <span style={{fontSize:10,color:T.muted}}>{sub}</span>}
        </div>
      )}
    </div>
  );
}

// ── JAUGE DPE ─────────────────────────────────────────────────────────
function Jauge({active, compact}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:compact?3:5}}>
      {Object.keys(DPE_C).map(l => {
        const isA = l === active;
        return (
          <div key={l} style={{display:"flex",alignItems:"center",gap:8}}>
            <span style={{width:13,fontSize:compact?9:11,fontWeight:700,color:isA?DPE_C[l]:"#C4B8A8",fontFamily:"'Outfit',sans-serif"}}>{l}</span>
            <div style={{flex:1,height:compact?14:18,background:"#F5F0E8",borderRadius:4,overflow:"hidden",border:"1px solid #E5DDD0"}}>
              <div style={{height:"100%",width:`${isA?DPE_W[l]:DPE_W[l]*.45}%`,background:isA?`linear-gradient(90deg,${DPE_C[l]},${DPE_C[l]}cc)`:"#EDE8DE",borderRadius:4,opacity:isA?1:.5,transition:"width .8s ease",display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:4}}>
                {isA && <span style={{fontSize:7,color:"white",fontWeight:700}}>◄</span>}
              </div>
            </div>
            {isA && <div className={`badge badge-${l==="A"||l==="B"?"green":l==="C"?"green":l==="D"||l==="E"?"amber":"red"}`} style={{padding:"1px 6px",fontSize:9}}>{l}</div>}
          </div>
        );
      })}
    </div>
  );
}

// ── GRAPHIQUE BARRES 3D PREMIUM ───────────────────────────────────────
function Chart3D({data, h=160}) {
  const valid = data.filter(d => d.rev !== null);
  if (!valid.length) return null;
  const maxV = Math.max(...valid.map(d => Math.max(d.rev||0, d.cout||0)), 1);
  const barH = h - 32;
  return (
    <div style={{position:"relative",paddingBottom:4}}>
      {/* Y-axis grid */}
      <div style={{position:"absolute",top:0,left:0,right:0,height:barH,pointerEvents:"none",zIndex:0}}>
        {[0,25,50,75,100].map(pct => (
          <div key={pct} style={{position:"absolute",bottom:`${pct}%`,left:0,right:0,display:"flex",alignItems:"center",gap:6}}>
            <span style={{fontSize:8,color:T.muted,fontWeight:500,minWidth:24,textAlign:"right"}}>{Math.round(maxV*pct/100)}</span>
            <div style={{flex:1,borderTop:`1px dashed ${pct===0?"#D4C9B8":"#EDE8DE"}`}}/>
          </div>
        ))}
      </div>
      <div style={{display:"flex",gap:4,alignItems:"flex-end",height:barH,paddingLeft:34,position:"relative",zIndex:1}}>
        {valid.map((d,i) => {
          const rH = Math.max(4,(d.rev/maxV)*barH);
          const cH = Math.max(4,(d.cout/maxV)*barH);
          const bH = Math.max(0,((d.rev-d.cout)/maxV)*barH);
          const delay = i*0.05;
          return (
            <div key={i} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:3}}>
              <div style={{width:"100%",display:"flex",gap:1.5,alignItems:"flex-end",height:barH}}>
                {/* Revenus 3D */}
                <div style={{flex:1,position:"relative",height:rH,animation:`bar .6s ${delay}s ease both`,transformOrigin:"bottom"}}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#60A5FA 0%,#2563EB 100%)",borderRadius:"3px 3px 0 0",boxShadow:`inset 0 1px 0 rgba(255,255,255,.3),0 0 8px rgba(37,99,235,.2)`}}/>
                  {/* 3D top face */}
                  <div style={{position:"absolute",top:-3,left:0,right:-4,height:4,background:"#93C5FD",transform:"skewX(-45deg)",transformOrigin:"bottom left",borderRadius:"2px 2px 0 0"}}/>
                  {/* 3D right face */}
                  <div style={{position:"absolute",top:-3,right:-4,width:4,height:"calc(100% + 3px)",background:"rgba(37,99,235,.4)",transform:"skewY(-45deg)",transformOrigin:"top left"}}/>
                  {/* Value tooltip */}
                  {d.rev > 0 && rH > 20 && <div style={{position:"absolute",top:3,left:0,right:0,textAlign:"center",fontSize:7,color:"white",fontWeight:700}}>{d.rev >= 1000 ? `${(d.rev/1000).toFixed(1)}k` : d.rev}</div>}
                </div>
                {/* Coûts 3D */}
                <div style={{flex:1,position:"relative",height:cH,animation:`bar .6s ${delay+.05}s ease both`,transformOrigin:"bottom"}}>
                  <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#FCA5A5 0%,#EF4444 100%)",borderRadius:"3px 3px 0 0",boxShadow:`inset 0 1px 0 rgba(255,255,255,.2),0 0 6px rgba(239,68,68,.15)`}}/>
                  <div style={{position:"absolute",top:-3,left:0,right:-4,height:4,background:"#FCA5A5",transform:"skewX(-45deg)",transformOrigin:"bottom left"}}/>
                  <div style={{position:"absolute",top:-3,right:-4,width:4,height:"calc(100% + 3px)",background:"rgba(239,68,68,.35)",transform:"skewY(-45deg)",transformOrigin:"top left"}}/>
                </div>
                {/* Bénéfice 3D */}
                {bH > 2 && (
                  <div style={{flex:1,position:"relative",height:bH,animation:`bar .6s ${delay+.1}s ease both`,transformOrigin:"bottom"}}>
                    <div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,#6EE7B7 0%,#059669 100%)",borderRadius:"3px 3px 0 0",boxShadow:`inset 0 1px 0 rgba(255,255,255,.25),0 0 8px rgba(5,150,105,.2)`}}/>
                    <div style={{position:"absolute",top:-3,left:0,right:-4,height:4,background:"#A7F3D0",transform:"skewX(-45deg)",transformOrigin:"bottom left"}}/>
                    <div style={{position:"absolute",top:-3,right:-4,width:4,height:"calc(100% + 3px)",background:"rgba(5,150,105,.35)",transform:"skewY(-45deg)",transformOrigin:"top left"}}/>
                  </div>
                )}
              </div>
              <div style={{fontSize:8,color:T.muted,textAlign:"center",fontWeight:500,marginTop:2}}>{d.mois}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── COURBE PREMIUM ANIMÉE ─────────────────────────────────────────────
function LineChartPremium({data, h=200}) {
  const valid = data.filter(d => d.rev !== null);
  if (!valid.length) return null;
  const maxV = Math.max(...valid.map(d => Math.max(d.rev||0, d.cout||0, 1)));
  const W = 100 / (valid.length - 1 || 1);
  const pt = (v,i) => ({x:i*W, y:100-((v/maxV)*78)-8});

  // Smooth bezier paths
  const smoothPath = (key) => {
    const pts = valid.map((d,i) => pt(d[key]||0, i));
    return pts.map((p,i) => {
      if(i===0) return `M${p.x},${p.y}`;
      const prev = pts[i-1];
      const cpx = (prev.x+p.x)/2;
      return `C${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`;
    }).join(" ");
  };
  const makeArea = (key) => {
    const pts = valid.map((d,i) => pt(d[key]||0,i));
    const smooth = pts.map((p,i) => {
      if(i===0) return `M${p.x},${p.y}`;
      const prev = pts[i-1];
      const cpx = (prev.x+p.x)/2;
      return `C${cpx},${prev.y} ${cpx},${p.y} ${p.x},${p.y}`;
    }).join(" ");
    return `${smooth} L${pts[pts.length-1].x},100 L${pts[0].x},100 Z`;
  };
  const revPts = valid.map((d,i) => pt(d.rev||0,i));
  const lastRev = revPts[revPts.length-1];

  return (
    <div style={{position:"relative"}}>
      <div style={{position:"absolute",left:0,top:0,bottom:20,display:"flex",flexDirection:"column",justifyContent:"space-between",pointerEvents:"none",zIndex:1}}>
        {[maxV,Math.round(maxV*.75),Math.round(maxV*.5),Math.round(maxV*.25),0].map((v,i) => (
          <span key={i} style={{fontSize:9,color:T.muted,fontWeight:500,background:"rgba(255,255,255,.8)",padding:"0 2px",borderRadius:2}}>{v>=1000?`${(v/1000).toFixed(1)}k`:v}</span>
        ))}
      </div>
      <div style={{marginLeft:32}}>
        <svg width="100%" height={h} viewBox="0 0 100 100" preserveAspectRatio="none" style={{overflow:"visible"}}>
          <defs>
            <linearGradient id="lgRev" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" stopOpacity=".25"/>
              <stop offset="70%" stopColor="#2563EB" stopOpacity=".05"/>
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="lgCout" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity=".12"/>
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="lgBen" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" stopOpacity=".18"/>
              <stop offset="100%" stopColor="#059669" stopOpacity="0"/>
            </linearGradient>
            <linearGradient id="revLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#93C5FD"/>
              <stop offset="100%" stopColor="#2563EB"/>
            </linearGradient>
            <filter id="glowLine"><feGaussianBlur stdDeviation="1.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          </defs>
          {/* Grid */}
          {[15,30,45,60,75,90].map(y => (
            <line key={y} x1="0" y1={y} x2="100" y2={y} stroke={y===90?"#D4C9B8":"#EDE8DE"} strokeWidth={y===90?".6":".3"} vectorEffect="non-scaling-stroke" strokeDasharray={y===90?"none":"2,3"}/>
          ))}
          {/* Areas */}
          <path d={makeArea("rev")} fill="url(#lgRev)" vectorEffect="non-scaling-stroke"/>
          <path d={makeArea("cout")} fill="url(#lgCout)" vectorEffect="non-scaling-stroke"/>
          <path d={makeArea("ben")} fill="url(#lgBen)" vectorEffect="non-scaling-stroke"/>
          {/* Lines */}
          <path d={smoothPath("cout")} fill="none" stroke="#EF4444" strokeWidth=".8" vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeDasharray="2,2"/>
          <path d={smoothPath("ben")} fill="none" stroke="#059669" strokeWidth=".9" vectorEffect="non-scaling-stroke" strokeLinecap="round"/>
          <path d={smoothPath("rev")} fill="none" stroke="url(#revLine)" strokeWidth="1.4" vectorEffect="non-scaling-stroke" filter="url(#glowLine)" strokeLinecap="round"/>
          {/* Data points */}
          {revPts.map((p,i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="1.8" fill="white" stroke="#2563EB" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
            </g>
          ))}
          {/* Live indicator at last point */}
          <circle cx={lastRev.x} cy={lastRev.y} r="3" fill="#2563EB" vectorEffect="non-scaling-stroke" filter="url(#glowLine)">
            <animate attributeName="r" values="2.5;5;2.5" dur="2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;.3;1" dur="2s" repeatCount="indefinite"/>
          </circle>
          <circle cx={lastRev.x} cy={lastRev.y} r="2" fill="white" stroke="#2563EB" strokeWidth="1" vectorEffect="non-scaling-stroke"/>
        </svg>
        <div style={{display:"flex",marginTop:4}}>
          {valid.map((d,i) => <span key={i} style={{fontSize:9,color:T.muted,fontWeight:500,flex:1,textAlign:"center"}}>{d.mois}</span>)}
        </div>
      </div>
    </div>
  );
}

// ── DONUT 3D PREMIUM ──────────────────────────────────────────────────
function Donut({segments, size=110, label, sub}) {
  const [hov, setHov] = useState(-1);
  const total = segments.reduce((s,d) => s+d.v, 0) || 1;
  let angle = -90;
  const r = size*.40, ir = size*.26, cx = size/2, cy = size/2;
  const toXY = (a, radius) => ({
    x: cx + radius * Math.cos(a * Math.PI/180),
    y: cy + radius * Math.sin(a * Math.PI/180)
  });
  const paths = segments.map((d,idx) => {
    const sweep = Math.max((d.v/total)*356, 2);
    const start = angle, end = angle + sweep;
    angle += sweep + (idx < segments.length-1 ? 1 : 0);
    const s1 = toXY(start, r), e1 = toXY(end, r);
    const s2 = toXY(start, ir), e2 = toXY(end, ir);
    const large = sweep > 180 ? 1 : 0;
    const midA = (start+end)/2;
    const offset = hov===idx ? 4 : 0;
    const ox = Math.cos(midA*Math.PI/180)*offset;
    const oy = Math.sin(midA*Math.PI/180)*offset;
    return {
      path:`M${s1.x+ox},${s1.y+oy} A${r},${r} 0 ${large},1 ${e1.x+ox},${e1.y+oy} L${e2.x+ox},${e2.y+oy} A${ir},${ir} 0 ${large},0 ${s2.x+ox},${s2.y+oy} Z`,
      color:d.color, v:d.v, pct:Math.round((d.v/total)*100), idx
    };
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{overflow:"visible"}}>
      <defs>
        <filter id="dShadow"><feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity=".15"/></filter>
        {segments.map((d,i) => (
          <radialGradient key={i} id={`dg${i}`} cx="40%" cy="35%" r="65%">
            <stop offset="0%" stopColor={d.color} stopOpacity=".9"/>
            <stop offset="100%" stopColor={d.color}/>
          </radialGradient>
        ))}
      </defs>
      {paths.map((p,i) => (
        <path key={i} d={p.path}
          fill={`url(#dg${i})`}
          stroke="white" strokeWidth="2"
          filter="url(#dShadow)"
          style={{cursor:"pointer",transition:"all .2s ease"}}
          onMouseEnter={()=>setHov(i)}
          onMouseLeave={()=>setHov(-1)}
        />
      ))}
      {/* Inner circle with gradient */}
      <circle cx={cx} cy={cy} r={ir} fill="white"/>
      <circle cx={cx} cy={cy} r={ir-1} fill="url(#innerGrad)" opacity=".5"/>
      <defs>
        <radialGradient id="innerGrad" cx="40%" cy="35%">
          <stop offset="0%" stopColor="#FAF7F2"/>
          <stop offset="100%" stopColor="white"/>
        </radialGradient>
      </defs>
      {label && (
        <>
          <text x={cx} y={cy-5} textAnchor="middle" fontSize="12" fontWeight="800" fill={T.text} fontFamily="'Outfit',sans-serif">{label}</text>
          {sub && <text x={cx} y={cy+8} textAnchor="middle" fontSize="8" fill={T.muted} fontFamily="'Inter',sans-serif" fontWeight="500">{sub}</text>}
        </>
      )}
      {/* Hover label */}
      {hov>=0 && paths[hov] && (
        <text x={cx} y={cy+22} textAnchor="middle" fontSize="9" fill={segments[hov]?.color} fontFamily="'Outfit',sans-serif" fontWeight="700">{paths[hov].pct}%</text>
      )}
    </svg>
  );
}
// ── MAPRIMERENOV ──────────────────────────────────────────────────────
function MaPrime({data, t2}) {
  const [revenu, setRevenu] = useState("modeste");
  const tr = data?.travaux || 11500;
  const aides = {
    tres_modeste:{label:"Très modestes (< 14k€/an)", iso:90, chauf:75, fen:100},
    modeste:{label:"Modestes (14k–22k€/an)", iso:75, chauf:60, fen:50},
    intermediaire:{label:"Intermédiaires (22k–40k€/an)", iso:40, chauf:40, fen:25},
    superieur:{label:"Supérieurs (> 40k€/an)", iso:15, chauf:15, fen:0},
  };
  const a = aides[revenu];
  const postes = [
    {l:"Isolation combles", p:35, taux:a.iso},
    {l:"Remplacement chauffage", p:25, taux:a.chauf},
    {l:"Fenêtres double vitrage", p:12, taux:a.fen},
  ];
  const totalAide = postes.reduce((s,p) => s + Math.round(tr*p.p/100*p.taux/100), 0);
  const reste = tr - totalAide;
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <div className="badge badge-blue" style={{fontSize:12,padding:"4px 10px"}}>🏛️ MaPrimeRénov' auto</div>
        <span style={{fontSize:11,color:T.muted}}>Exclusif NovaDPE</span>
      </div>
      <div style={{marginBottom:12}}>
        <label>Tranche de revenus du foyer</label>
        <select value={revenu} onChange={e=>setRevenu(e.target.value)}>
          {Object.entries(aides).map(([k,v]) => <option key={k} value={k}>{v.label}</option>)}
        </select>
      </div>
      {postes.map((p,i) => {
        const montant = Math.round(tr*p.p/100);
        const aide = Math.round(montant*p.taux/100);
        return (
          <div key={i} style={{padding:"10px 12px",background:"#FAF7F2",borderRadius:8,border:"1px solid #E5DDD0",marginBottom:6}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5,flexWrap:"wrap",gap:4}}>
              <span style={{fontSize:12,fontWeight:600,color:T.text}}>{p.l}</span>
              <div style={{display:"flex",gap:8}}>
                <span style={{fontSize:11,color:T.muted}}>{montant.toLocaleString("fr-FR")} €</span>
                <span style={{fontSize:12,fontWeight:700,color:T.sage}}>-{aide.toLocaleString("fr-FR")} € ({p.taux}%)</span>
              </div>
            </div>
            <div style={{height:5,background:"#E5DDD0",borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${p.taux}%`,background:`linear-gradient(90deg,${T.sage},#10B981)`,borderRadius:3,transition:"width .8s"}}/>
            </div>
          </div>
        );
      })}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:12}}>
        <div style={{padding:"12px",background:"#ECFDF5",borderRadius:10,border:"1px solid #A7F3D0",textAlign:"center"}}>
          <div style={{fontSize:10,color:T.sage,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em",marginBottom:3}}>Aide estimée</div>
          <div style={{fontSize:20,fontWeight:700,color:T.sage,fontFamily:"'Outfit',sans-serif"}}>{totalAide.toLocaleString("fr-FR")} €</div>
        </div>
        <div style={{padding:"12px",background:"#FFFBEB",borderRadius:10,border:"1px solid #FDE68A",textAlign:"center"}}>
          <div style={{fontSize:10,color:T.amber,fontWeight:600,textTransform:"uppercase",letterSpacing:".04em",marginBottom:3}}>Reste à charge</div>
          <div style={{fontSize:20,fontWeight:700,color:T.amber,fontFamily:"'Outfit',sans-serif"}}>{reste.toLocaleString("fr-FR")} €</div>
        </div>
      </div>
    </div>
  );
}

// ── SCORE 5 ANS ───────────────────────────────────────────────────────
function Score5Ans({classe}) {
  const ev = {
    A:{y:["A","A","A","A","A"],risk:"Aucun",c:T.sage},
    B:{y:["B","B","B","B","B"],risk:"Aucun",c:T.sage},
    C:{y:["C","C","C","C","C"],risk:"Faible",c:T.amberL},
    D:{y:["D","D","E","E","E"],risk:"Modéré — Travaux conseillés avant 2028",c:T.amber},
    E:{y:["E","E","F","F","G"],risk:"Élevé — Interdiction de location en 2028",c:T.rose},
    F:{y:["F","F","G","G","G"],risk:"Critique — Interdit à la location",c:T.rose},
    G:{y:["G","G","G","G","G"],risk:"Critique — Déjà interdit à la location",c:T.rose},
  };
  const info = ev[classe] || ev.D;
  const years = ["2026","2027","2028","2029","2030"];
  return (
    <div>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <div className="badge badge-amber" style={{fontSize:12,padding:"4px 10px"}}>🔮 Prédiction 5 ans</div>
        <span style={{fontSize:11,color:T.muted}}>Exclusif NovaDPE</span>
      </div>
      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
        {years.map((y,i) => {
          const cl = info.y[i];
          const isNow = i === 0;
          return (
            <div key={y} style={{flex:1,minWidth:50,textAlign:"center",padding:"10px 6px",background:isNow?"#EFF6FF":"#FAF7F2",border:`1.5px solid ${isNow?T.blue:T.border}`,borderRadius:10}}>
              <div style={{fontSize:10,color:T.muted,marginBottom:3,fontWeight:600}}>{y}</div>
              <div style={{fontSize:22,fontWeight:700,color:DPE_C[cl],fontFamily:"'Outfit',sans-serif"}}>{cl}</div>
              {isNow && <div style={{fontSize:9,color:T.blue,marginTop:2,fontWeight:600}}>Actuel</div>}
            </div>
          );
        })}
      </div>
      <div style={{padding:"10px 14px",background:info.c===T.sage?"#ECFDF5":info.c===T.amberL?"#FFFBEB":"#FEF2F2",border:`1px solid ${info.c===T.sage?"#A7F3D0":info.c===T.amberL?"#FDE68A":"#FECACA"}`,borderRadius:10,fontSize:12,color:info.c,fontWeight:600}}>
        {info.risk.includes("Aucun")?"✅":info.risk.includes("Faible")?"⚠️":"🚨"} {info.risk}
      </div>
    </div>
  );
}

// ── RAPPORT PDF ────────────────────────────────────────────────────────
function PDF({data, plan, agenceName, onClose}) {
  const [tab, setTab] = useState("rapport");
  const isS = plan === "starter";
  const cl = data.classe || "D";
  const col = DPE_C[cl];
  const tr = data.travaux || 11500;
  const ec = data.economie || 1800;
  const postes = [
    {l:"Isolation combles",p:35,e:Math.round(tr*.35)},
    {l:"Isolation murs",p:28,e:Math.round(tr*.28)},
    {l:"Chauffage",p:25,e:Math.round(tr*.25)},
    {l:"Fenêtres",p:12,e:Math.round(tr*.12)},
  ];
  const arts = [
    {n:"RGE Isolation Pro",v:"Lyon 69",s:"Isolation",tel:"04 72 00 11 22"},
    {n:"EcoTherm Solutions",v:"Villeurbanne 69",s:"Chauffage",tel:"04 78 33 44 55"},
    {n:"FenêtrePlus RGE",v:"Lyon 69",s:"Menuiseries",tel:"04 69 55 66 77"},
  ];
  return (
    <div style={{position:"fixed",inset:0,zIndex:2000,background:"rgba(28,16,8,.85)",backdropFilter:"blur(8px)",overflow:"auto",padding:"16px"}}>
      <div style={{maxWidth:660,margin:"0 auto"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14,gap:10,flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>
            {["rapport","maprimerenov","prediction"].map(t => (
              <button key={t} onClick={()=>setTab(t)} className={`btn bsm ${tab===t?"bp":"bsec"}`}>
                {t==="rapport"?"📄 Rapport":t==="maprimerenov"?"🏛️ Aides État":"🔮 Prédiction 5 ans"}
              </button>
            ))}
          </div>
          <div style={{display:"flex",gap:8}}>
            <button className="btn bp bsm" onClick={()=>window.print()}>⬇ PDF</button>
            <button className="btn bsec bsm" onClick={onClose}>✕ Fermer</button>
          </div>
        </div>
        <div style={{background:"white",borderRadius:16,padding:32,boxShadow:"0 24px 60px rgba(0,0,0,.2)"}}>
          {tab==="rapport" && (
            <>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20,paddingBottom:16,borderBottom:`2px solid #F5F0E8`,flexWrap:"wrap",gap:10}}>
                <div>
                  {plan==="agence"
                    ? <div style={{background:"#FAF7F2",borderRadius:8,padding:"8px 14px",marginBottom:6}}><div style={{fontSize:9,color:"#8B7355",fontWeight:600,textTransform:"uppercase"}}>Rapport préparé par</div><div style={{fontSize:16,fontWeight:700,color:"#1A1208"}}>{agenceName||"Votre Agence"}</div></div>
                    : <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:6}}><svg width="24" height="24" viewBox="0 0 40 40"><rect width="40" height="40" rx="10" fill="#2563EB"/><rect x="8" y="20" width="10" height="13" rx="2" fill="rgba(255,255,255,.3)"/><rect x="22" y="15" width="10" height="18" rx="2" fill="rgba(255,255,255,.45)"/><circle cx="30" cy="10" r="5" fill="#F59E0B"/></svg><span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:15,color:"#2563EB"}}>NovaDPE</span></div>
                  }
                  <div style={{fontSize:10,color:"#8B7355"}}>Rapport DPE · IA · {new Date().toLocaleDateString("fr-FR")}</div>
                </div>
                <div style={{textAlign:"center",flexShrink:0}}>
                  <div style={{width:52,height:52,borderRadius:12,background:col,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:700,color:"white",boxShadow:`0 4px 14px ${col}55`}}>{cl}</div>
                  <div style={{fontSize:9,color:"#8B7355",marginTop:3}}>Classe DPE</div>
                </div>
              </div>
              <div style={{background:"#FAF7F2",borderRadius:10,padding:12,marginBottom:14}}>
                <div style={{fontSize:9,color:"#8B7355",fontWeight:600,textTransform:"uppercase",marginBottom:2}}>Bien analysé</div>
                <div style={{fontSize:15,fontWeight:700,color:"#1A1208"}}>{data.address||"Adresse non renseignée"}</div>
                <div style={{fontSize:11,color:"#8B7355",marginTop:1}}>{data.type} · {data.surface} m² · {data.year} · {data.heating}</div>
              </div>
              <div style={{marginBottom:14}}>
                <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginBottom:8,color:"#4A3728"}}>Classe énergétique</div>
                {Object.keys(DPE_C).map(l => {
                  const ws={A:28,B:40,C:53,D:65,E:77,F:87,G:96};
                  const isA = l === cl;
                  return (
                    <div key={l} style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                      <span style={{width:13,fontSize:10,fontWeight:700,color:isA?DPE_C[l]:"#C4B8A8"}}>{l}</span>
                      <div style={{flex:1,height:19,background:"#F5F0E8",borderRadius:4,overflow:"hidden"}}>
                        <div style={{height:"100%",width:`${ws[l]}%`,background:isA?DPE_C[l]:`${DPE_C[l]}44`,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"flex-end",paddingRight:5}}>
                          {isA && <span style={{fontSize:8,color:"white",fontWeight:700}}>◄ Votre bien</span>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:8,marginBottom:14}}>
                {[
                  {l:"Consommation",v:`${data.consommation||220} kWh/m²/an`,c:"#2563EB"},
                  {l:"Émissions CO₂",v:`${data.ges||42} kg/m²/an`,c:"#059669"},
                  {l:"Coût travaux",v:`${tr.toLocaleString("fr-FR")} €`,c:"#D97706"},
                  {l:"Économie/an",v:`${ec.toLocaleString("fr-FR")} €`,c:"#059669"},
                ].map((m,i) => (
                  <div key={i} style={{background:"#FAF7F2",borderRadius:8,padding:10,border:"1px solid #E5DDD0",textAlign:"center"}}>
                    <div style={{fontSize:9,color:"#8B7355",fontWeight:600,textTransform:"uppercase"}}>{m.l}</div>
                    <div style={{fontSize:16,fontWeight:700,color:m.c,fontFamily:"'Outfit',sans-serif",margin:"3px 0"}}>{m.v}</div>
                  </div>
                ))}
              </div>
              {data.risque2028 && (
                <div style={{background:"#FFFBEB",border:"2px solid #FDE68A",borderRadius:10,padding:12,marginBottom:12,display:"flex",gap:8}}>
                  <span style={{fontSize:18,flexShrink:0}}>⚠️</span>
                  <div><div style={{fontWeight:700,color:"#D97706",fontSize:13,marginBottom:2}}>Risque locatif — Loi Climat 2028</div><div style={{fontSize:11,color:"#92400E",lineHeight:1.6}}>Ce bien sera interdit à la location à partir de 2028.</div></div>
                </div>
              )}
              {!isS && (
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginBottom:7,color:"#4A3728"}}>Simulation travaux</div>
                  {postes.map((p,i) => (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:"#FAF7F2",borderRadius:8,marginBottom:5}}>
                      <div style={{flex:1}}><div style={{fontSize:11,fontWeight:600,color:"#1A1208",marginBottom:3}}>{p.l}</div><div style={{height:4,background:"#E5DDD0",borderRadius:2,overflow:"hidden"}}><div style={{height:"100%",width:`${p.p}%`,background:"linear-gradient(90deg,#059669,#10B981)",borderRadius:2}}/></div></div>
                      <div style={{textAlign:"right",flexShrink:0}}><div style={{fontSize:13,fontWeight:700,color:"#D97706"}}>{p.e.toLocaleString("fr-FR")} €</div><div style={{fontSize:9,color:"#8B7355"}}>{p.p}%</div></div>
                    </div>
                  ))}
                  <div style={{padding:"8px 12px",background:"#ECFDF5",borderRadius:8,display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontWeight:600,fontSize:12,color:"#1A1208"}}>Retour sur investissement</span><span style={{fontSize:15,fontWeight:700,color:"#059669"}}>{Math.round(tr/ec)} ans</span></div>
                </div>
              )}
              {!isS && (
                <div style={{marginBottom:12}}>
                  <div style={{fontSize:10,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginBottom:7,color:"#4A3728"}}>Artisans RGE recommandés</div>
                  {arts.map((a,i) => (
                    <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 10px",background:"#FAF7F2",borderRadius:8,marginBottom:4,border:"1px solid #E5DDD0",flexWrap:"wrap"}}>
                      <span style={{fontSize:14,flexShrink:0}}>🔧</span>
                      <div style={{flex:1,minWidth:80}}><div style={{fontWeight:600,fontSize:12,color:"#1A1208"}}>{a.n}</div><div style={{fontSize:10,color:"#8B7355"}}>{a.s} · {a.v}</div></div>
                      <div style={{fontSize:11,color:"#059669",fontWeight:600}}>{a.tel}</div>
                    </div>
                  ))}
                </div>
              )}
              {data.conseil && (
                <div style={{background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:10,padding:12,marginBottom:12}}>
                  <div style={{fontSize:9,fontWeight:700,color:"#2563EB",textTransform:"uppercase",marginBottom:3}}>💡 Recommandation IA</div>
                  <div style={{fontSize:12,color:"#1A1208",lineHeight:1.7}}>{data.conseil}</div>
                </div>
              )}
              {isS && (
                <div style={{background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:8,padding:10,textAlign:"center",marginBottom:10}}>
                  <div style={{fontSize:11,color:"#2563EB",fontWeight:600}}>🔓 Passez au Pro : simulation travaux · artisans RGE · aides MaPrimeRénov' · prédiction 5 ans</div>
                </div>
              )}
              <div style={{borderTop:"1px solid #E5DDD0",paddingTop:12,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:4}}>
                <div style={{fontSize:9,color:"#8B7355"}}>{plan==="agence"?`Via NovaDPE pour ${agenceName}`:"Généré par NovaDPE · novadpe.fr"}</div>
                <div style={{fontSize:9,color:"#8B7355"}}>Valable 10 ans · #{Math.random().toString(36).substr(2,8).toUpperCase()}</div>
              </div>
            </>
          )}
          {tab==="maprimerenov" && !isS && <MaPrime data={data}/>}
          {tab==="prediction" && !isS && <Score5Ans classe={cl}/>}
          {tab!=="rapport" && isS && (
            <div style={{padding:24,textAlign:"center"}}>
              <div style={{fontSize:36,marginBottom:10}}>🔓</div>
              <div style={{fontWeight:700,color:"#2563EB",fontSize:15,marginBottom:8}}>Fonctionnalité Pro</div>
              <div style={{color:"#8B7355",fontSize:13}}>Passez au plan Pro pour accéder aux aides MaPrimeRénov' et à la prédiction 5 ans.</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── GÉNÉRATEUR ────────────────────────────────────────────────────────
function Generateur({plan, credits, setCredits, agenceName, onBack}) {
  const [step, setStep] = useState("form");
  const [result, setResult] = useState(null);
  const [pdf, setPdf] = useState(false);
  const [form, setForm] = useState({address:"",surface:"",year:"",type:"Appartement",heating:"Gaz"});

  const go = async () => {
    if (!form.address || !form.surface) return;
    if (credits <= 0) { setStep("vide"); return; }
    setStep("load");
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          model:"claude-sonnet-4-20250514", max_tokens:600,
          messages:[{role:"user",content:`Expert DPE français. Réponds UNIQUEMENT en JSON valide sans backticks.
Bien: ${form.type} ${form.surface}m², ${form.address}, an ${form.year||2000}, chauffage ${form.heating}.
JSON: {"classe":"A/B/C/D/E/F/G","consommation":nombre,"ges":nombre,"travaux":nombre,"economie":nombre,"risque2028":true/false,"conseil":"conseil court"}`}]
        })
      });
      const d = await res.json();
      const txt = d.content?.map(b=>b.text||"").join("")||"{}";
      setResult({...JSON.parse(txt.replace(/```json|```/g,"").trim()),...form});
      setCredits(c => Math.max(0,c-1));
      setStep("ok");
    } catch {
      setResult({classe:"D",consommation:220,ges:42,travaux:11500,economie:1800,risque2028:true,conseil:"Isoler les combles et remplacer la chaudière permettrait de passer en classe B.",...form});
      setCredits(c => Math.max(0,c-1));
      setStep("ok");
    }
  };

  if (step==="vide") return (
    <div className="card" style={{padding:32,textAlign:"center",maxWidth:400,margin:"0 auto"}}>
      <div style={{fontSize:40,marginBottom:12}}>⚡</div>
      <h3 style={{fontSize:18,fontWeight:700,marginBottom:8,color:T.text}}>Crédits épuisés</h3>
      <p style={{color:T.muted,fontSize:13,lineHeight:1.7,marginBottom:20}}>Vos 5 rapports gratuits ont été utilisés.</p>
      <button className="btn bp" style={{width:"100%",padding:"11px",marginBottom:8}}>Passer au Pro — 59 €/mois</button>
      <button className="btn bsec" style={{width:"100%",padding:"11px"}} onClick={()=>setStep("form")}>Retour</button>
    </div>
  );

  if (step==="form") return (
    <div className="card" style={{padding:24,maxWidth:520,margin:"0 auto"}}>
      {onBack && <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>}
      <h3 style={{fontSize:15,fontWeight:700,marginBottom:3,color:T.text}}>Analyser un bien</h3>
      <p style={{color:T.muted,fontSize:12,marginBottom:16}}>Renseignez les informations pour générer le rapport DPE.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
        <div style={{gridColumn:"1/-1"}}><label>Adresse complète</label><input placeholder="12 rue des Lilas, Lyon 69003" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></div>
        <div><label>Surface (m²)</label><input type="number" placeholder="75" value={form.surface} onChange={e=>setForm({...form,surface:e.target.value})}/></div>
        <div><label>Année construction</label><input type="number" placeholder="1985" value={form.year} onChange={e=>setForm({...form,year:e.target.value})}/></div>
        <div><label>Type de bien</label>
          <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>
            {["Appartement","Maison","Local commercial","Bureau"].map(v=><option key={v}>{v}</option>)}
          </select>
        </div>
        <div><label>Chauffage</label>
          <select value={form.heating} onChange={e=>setForm({...form,heating:e.target.value})}>
            {["Gaz","Électrique","Fioul","Pompe à chaleur","Bois"].map(v=><option key={v}>{v}</option>)}
          </select>
        </div>
      </div>
      <button className="btn bp" style={{width:"100%",marginTop:16,padding:"11px",fontSize:14}} onClick={go}>⚡ Générer le rapport DPE</button>
      <div style={{marginTop:12,display:"flex",alignItems:"center",gap:6,justifyContent:"center"}}>
        {[1,2,3,4,5].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:i<=credits?"#2563EB":"#E5DDD0"}}/>)}
        <span style={{fontSize:11,color:T.muted,marginLeft:4}}>{credits}/5 rapports gratuits</span>
      </div>
    </div>
  );

  if (step==="load") return (
    <div className="card" style={{padding:52,display:"flex",flexDirection:"column",alignItems:"center",gap:16,maxWidth:340,margin:"0 auto"}}>
      <div style={{position:"relative",width:44,height:44}}>
        <div style={{position:"absolute",inset:0,border:"3px solid #EFF6FF",borderTopColor:"#2563EB",borderRadius:"50%",animation:"spin .8s linear infinite"}}/>
      </div>
      <div style={{textAlign:"center"}}>
        <div style={{fontSize:14,fontWeight:600,color:T.text,marginBottom:3}}>Analyse en cours…</div>
        <div style={{color:T.muted,fontSize:12}}>Calcul classe DPE + aides MaPrimeRénov'</div>
      </div>
    </div>
  );

  if (step==="ok" && result) return (
    <>
      {pdf && <PDF data={result} plan={plan} agenceName={agenceName} onClose={()=>setPdf(false)}/>}
      <div className="card" style={{padding:22,maxWidth:520,margin:"0 auto",animation:"fadeUp .4s ease"}}>
        {onBack && <button onClick={onBack} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:12}}>← Retour</button>}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
          <div>
            <div className="badge badge-green" style={{marginBottom:4}}>✓ Rapport généré</div>
            <div style={{fontSize:14,fontWeight:700,color:T.text}}>{result.address}</div>
          </div>
          <div style={{width:50,height:50,borderRadius:12,background:DPE_C[result.classe],display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:700,color:"white",flexShrink:0,boxShadow:`0 4px 14px ${DPE_C[result.classe]}55`}}>
            {result.classe}
          </div>
        </div>
        <Jauge active={result.classe} compact/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
          {[
            {l:"Consommation",v:`${result.consommation} kWh/m²`,c:T.blue},
            {l:"Émissions CO₂",v:`${result.ges} kg/m²`,c:T.sage},
            {l:"Travaux estimés",v:`${(result.travaux||0).toLocaleString("fr-FR")} €`,c:T.amber},
            {l:"Économie/an",v:`${(result.economie||0).toLocaleString("fr-FR")} €`,c:T.sage},
          ].map((m,i) => (
            <div key={i} style={{background:T.bg2,borderRadius:8,padding:10,border:`1px solid ${T.border}`}}>
              <div style={{fontSize:9,color:T.muted,fontWeight:600,textTransform:"uppercase"}}>{m.l}</div>
              <div style={{fontSize:14,fontWeight:700,color:m.c,marginTop:2,fontFamily:"'Outfit',sans-serif"}}>{m.v}</div>
            </div>
          ))}
        </div>
        {result.risque2028 && <div style={{marginTop:10,padding:"8px 12px",background:"#FFFBEB",border:"1px solid #FDE68A",borderRadius:8,fontSize:12,color:T.amber,fontWeight:600}}>⚠ Ce bien sera interdit à la location en 2028</div>}
        {result.conseil && <div style={{marginTop:8,padding:"8px 12px",background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:8,fontSize:12,color:T.text,lineHeight:1.6}}>💡 {result.conseil}</div>}
        {plan !== "starter" && <div style={{marginTop:8,padding:"8px 12px",background:"#ECFDF5",border:"1px solid #A7F3D0",borderRadius:8,fontSize:11,color:T.sage,fontWeight:500}}>🏛️ Aides MaPrimeRénov' + prédiction 5 ans disponibles dans le rapport</div>}
        <div style={{display:"flex",gap:8,marginTop:14}}>
          <button className="btn bp" style={{flex:1}} onClick={()=>setPdf(true)}>⬇ Voir le rapport complet</button>
          <button className="btn bsec" onClick={()=>{setStep("form");setResult(null);}}>Nouveau</button>
        </div>
      </div>
    </>
  );
  return null;
}

// ── NAVBAR ────────────────────────────────────────────────────────────
function Navbar({setPage, isLogged, setIsLogged}) {
  const [sc, setSc] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  useEffect(()=>{
    const f = ()=>setSc(window.scrollY>20);
    window.addEventListener("scroll",f);
    return ()=>window.removeEventListener("scroll",f);
  },[]);
  return (
    <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:1000,padding:"0 20px",background:sc?"rgba(250,247,242,.96)":"transparent",backdropFilter:sc?"blur(12px)":"none",borderBottom:sc?`1px solid ${T.border}`:"none",transition:"all .3s"}}>
      <div style={{maxWidth:1100,margin:"0 auto",height:58,display:"flex",alignItems:"center",justifyContent:"space-between",gap:12}}>
        <div onClick={()=>setPage("landing")} style={{cursor:"pointer"}}><Logo/></div>
        <div className="hide-mobile" style={{display:"flex",gap:28,fontSize:13,fontWeight:500}}>
          {["Fonctionnalités","Tarifs","Démo","FAQ"].map(i=>(
            <span key={i} style={{color:T.muted,cursor:"pointer",transition:"color .2s"}}
              onMouseEnter={e=>e.target.style.color=T.blue}
              onMouseLeave={e=>e.target.style.color=T.muted}>{i}</span>
          ))}
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          {isLogged
            ?<>
              <button className="btn bsec hide-mobile" style={{padding:"7px 14px",fontSize:12}} onClick={()=>setPage("dashboard")}>Dashboard</button>
              <button className="btn bp" style={{padding:"7px 14px",fontSize:12}} onClick={()=>{if(window.confirm("Se déconnecter ?"))setPage("landing");}}>🚪</button>
            </>
            :<>
              <button className="btn bsec hide-mobile" style={{padding:"7px 14px",fontSize:12}} onClick={()=>setPage("login")}>Connexion</button>
              <button className="btn bp" style={{padding:"7px 14px",fontSize:12}} onClick={()=>setPage("register")}>Essai gratuit →</button>
            </>
          }
        </div>
      </div>
    </nav>
  );
}

// ── LANDING ───────────────────────────────────────────────────────────
function Landing({setPage}) {
  const [ann, setAnn] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [dc, setDc] = useState(5);

  const plans = [
    {id:"starter",n:"Starter",sub:"Paiement unique",
     pm:"35 €",pa:"35 €",per_m:"/rapport",per_a:"/rapport",ann:null,
     oui:["1 rapport DPE complet","Export PDF professionnel","Note A à G officielle","Interface mobile"],
     non:["Tableau de bord","Simulation travaux","Aides MaPrimeRénov'","Prédiction 5 ans","Artisans RGE"],
     style:"default"},
    {id:"pro",n:"Pro",sub:"Le plus populaire",
     pm:"59 €",pa:"600 €",per_m:"/mois",per_a:"/an",ann:"2 mois offerts",
     oui:["20 rapports DPE/mois","Tableau de bord complet","Simulation de travaux","Aides MaPrimeRénov' auto","Score risque 2028","Prédiction énergétique 5 ans","Artisans RGE recommandés","Support email 24h"],
     non:["Marque blanche","Multi-utilisateurs"],
     style:"blue"},
    {id:"agence",n:"Agence",sub:"⭐ Plan Premium",
     pm:"219 €",pa:"2 200 €",per_m:"/mois",per_a:"/an",ann:"2 mois offerts",
     oui:["✦ Tout le Pro inclus","Rapports illimités équipe","Jusqu'à 10 agents","Marque blanche (logo agence)","API d'intégration","Dashboard équipe complet","Support prioritaire 4h","Manager de compte dédié","Accès bêta fonctionnalités"],
     non:[],
     style:"amber"},
  ];

  const feats = [
    {e:"🏛️",t:"Aides MaPrimeRénov' auto",d:"Calcul automatique des aides de l'État selon vos revenus et travaux. Aucun autre outil DPE ne fait ça.",badge:"Exclusif",c:T.blue},
    {e:"🔮",t:"Prédiction énergétique 5 ans",d:"Projetez l'évolution de la classe DPE de votre bien jusqu'en 2030 selon les futures réglementations.",badge:"Exclusif",c:T.amber},
    {e:"⚖️",t:"Comparateur de biens",d:"Comparez 2 biens côte à côte pour identifier lequel est le plus rentable à rénover.",badge:"Exclusif",c:T.sage},
    {e:"⚡",t:"Rapport en 30 secondes",d:"L'IA génère un rapport DPE complet et professionnel instantanément.",badge:null,c:T.blue},
    {e:"🛡️",t:"Score risque 2028",d:"Détectez si un bien sera interdit à la location selon la loi Climat & Résilience.",badge:null,c:T.rose},
    {e:"👷",t:"Réseau artisans RGE",d:"Artisans certifiés recommandés dans le secteur du bien dans chaque rapport.",badge:null,c:T.sage},
  ];

  const temoignages = [
    {nom:"Sophie Martin",role:"Agent immobilier · Lyon",txt:"NovaDPE m'a fait gagner 2h par dossier. Le calcul MaPrimeRénov' automatique impressionne mes clients.",note:5},
    {nom:"Jean-Pierre Dubois",role:"Directeur · Agence Dupont Paris",txt:"La prédiction 5 ans est notre argument commercial numéro 1. Les clients font les travaux immédiatement.",note:5},
    {nom:"Camille Renard",role:"Diagnostiqueure certifiée · Bordeaux",txt:"Le comparateur de biens que personne d'autre ne propose. J'ai vendu 3 biens supplémentaires ce mois.",note:5},
  ];

  const faq = [
    {q:"Les rapports sont-ils légalement valables ?",r:"NovaDPE génère des rapports basés sur les données ADEME, valables 10 ans. Pour une vente nécessitant un DPE opposable, un diagnostiqueur certifié reste nécessaire."},
    {q:"Qu'est-ce que le calcul MaPrimeRénov' automatique ?",r:"Après chaque rapport, NovaDPE calcule automatiquement les aides de l'État selon votre tranche de revenus. Aucun autre outil DPE ne propose cette fonctionnalité."},
    {q:"Comment fonctionne la prédiction 5 ans ?",r:"Notre IA projette comment la classe DPE de votre bien va évoluer jusqu'en 2030 selon les futures réglementations. Vous savez en avance si votre bien sera concerné par les interdictions."},
    {q:"Puis-je annuler à tout moment ?",r:"Oui, sans frais. Annulez depuis Paramètres en un clic. Votre accès reste actif jusqu'à la fin de la période payée."},
    {q:"Comment fonctionne la marque blanche ?",r:"Uploadez votre logo dans les paramètres agence. Tous les rapports PDF portent votre identité visuelle. Vos clients ne voient pas NovaDPE."},
  ];

  return (
    <div>
      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",paddingTop:70,background:`linear-gradient(160deg,${T.bg} 60%,#EEF2FF 100%)`}}>
        <div style={{maxWidth:1100,margin:"0 auto",padding:"50px 20px",display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"center"}} className="hero-grid">
          <div>
            {/* Animated particles */}
            <div style={{position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden",pointerEvents:"none",zIndex:0}}>
              {[{s:6,x:"10%",y:"20%",d:"8s",c:"#2563EB"},{s:4,x:"85%",y:"15%",d:"11s",c:"#D97706"},{s:8,x:"70%",y:"70%",d:"9s",c:"#059669"},{s:5,x:"20%",y:"75%",d:"13s",c:"#2563EB"},{s:3,x:"50%",y:"10%",d:"7s",c:"#D97706"}].map((p,i) => (
                <div key={i} className="particle" style={{width:p.s,height:p.s,left:p.x,top:p.y,background:p.c,opacity:.15,animationDuration:p.d}}/>
              ))}
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"#EFF6FF",border:"1px solid #DBEAFE",borderRadius:100,padding:"4px 12px",marginBottom:20,position:"relative",zIndex:1}}>
              <div style={{width:6,height:6,borderRadius:"50%",background:T.blue,animation:"pulse2 2s ease infinite"}}/>
              <span style={{fontSize:11,fontWeight:600,color:T.blue,letterSpacing:".04em"}}>3 FONCTIONNALITÉS EXCLUSIVES · AUCUN CONCURRENT</span>
            </div>
            <h1 className="au2 hero-title" style={{fontFamily:"'Outfit',sans-serif",fontSize:44,fontWeight:800,lineHeight:1.1,letterSpacing:"-.03em",marginBottom:16,color:T.text}}>
              Le DPE<br/>
              <span style={{color:T.blue}}>intelligent</span><br/>
              en 30 secondes.
            </h1>
            <p className="au3" style={{fontSize:15,color:T.muted,lineHeight:1.8,marginBottom:24,maxWidth:420}}>
              Rapports DPE par IA · Aides MaPrimeRénov' calculées · Prédiction 5 ans · Comparateur de biens. Des fonctionnalités qu'aucun concurrent ne propose.
            </p>
            <div className="au3" style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
              <button className="btn bp" style={{fontSize:14,padding:"11px 24px"}} onClick={()=>setPage("register")}>Commencer gratuitement →</button>
              <button className="btn bsec" style={{fontSize:14,padding:"11px 24px"}} onClick={()=>document.getElementById("demo")?.scrollIntoView({behavior:"smooth"})}>Voir la démo</button>
            </div>
            <div className="au3" style={{display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
              <div style={{display:"flex",gap:3}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#2563EB"}}/>)}</div>
              <span style={{fontSize:12,color:T.muted}}>5 rapports gratuits · Sans carte bancaire</span>
            </div>
          </div>

          {/* Carte hero premium */}
          <div style={{animation:"fadeUp .7s .15s ease both",position:"relative"}}>
            {/* Glow behind card */}
            <div style={{position:"absolute",inset:-20,background:"radial-gradient(ellipse at center,rgba(37,99,235,.08) 0%,transparent 70%)",borderRadius:32,zIndex:0}}/>
            <div style={{position:"relative",zIndex:1,background:"white",borderRadius:20,padding:22,boxShadow:"0 24px 60px rgba(0,0,0,.1),0 4px 16px rgba(0,0,0,.06),0 0 0 1px rgba(37,99,235,.08)",animation:"float 6s ease-in-out infinite"}}>
              {/* Header */}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
                <div>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
                    <div style={{width:6,height:6,borderRadius:"50%",background:"#22C55E",boxShadow:"0 0 6px #22C55E"}}/>
                    <span style={{fontSize:10,fontWeight:600,color:T.sage}}>Analyse IA terminée</span>
                  </div>
                  <div style={{fontSize:14,fontWeight:700,color:T.text}}>12 rue des Lilas, Lyon</div>
                  <div style={{fontSize:11,color:T.muted,marginTop:1}}>Appart. · 68 m² · 1982 · Gaz</div>
                </div>
                <div style={{position:"relative"}}>
                  <div style={{width:50,height:50,borderRadius:14,background:`linear-gradient(135deg,${DPE_C.C},${DPE_C.C}cc)`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif",fontSize:24,fontWeight:800,color:"white",boxShadow:`0 6px 16px ${DPE_C.C}55`}}>C</div>
                  <div style={{position:"absolute",bottom:-4,right:-4,width:16,height:16,borderRadius:"50%",background:"#2563EB",border:"2px solid white",display:"flex",alignItems:"center",justifyContent:"center"}}>
                    <span style={{fontSize:8,color:"white",fontWeight:700}}>✓</span>
                  </div>
                </div>
              </div>
              <Jauge active="C" compact/>
              {/* Metrics grid */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:12}}>
                {[
                  {l:"Aide MaPrimeRénov'",v:"3 450 €",c:T.blue,bg:"#EFF6FF",icon:"🏛️"},
                  {l:"Reste à charge",v:"8 050 €",c:T.amber,bg:"#FFFBEB",icon:"💶"},
                  {l:"Prédiction 2030",v:"Classe C ✓",c:T.sage,bg:"#ECFDF5",icon:"🔮"},
                  {l:"Risque 2028",v:"Aucun ✓",c:T.sage,bg:"#ECFDF5",icon:"🛡️"},
                ].map((m,i)=>(
                  <div key={i} style={{background:m.bg,borderRadius:10,padding:"9px 10px",border:`1px solid ${m.c}22`,position:"relative",overflow:"hidden"}}>
                    <div style={{position:"absolute",top:4,right:6,fontSize:14,opacity:.3}}>{m.icon}</div>
                    <div style={{fontSize:9,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:".03em"}}>{m.l}</div>
                    <div style={{fontSize:14,fontWeight:700,color:m.c,marginTop:2,fontFamily:"'Outfit',sans-serif"}}>{m.v}</div>
                  </div>
                ))}
              </div>
              {/* Footer */}
              <div style={{marginTop:12,padding:"8px 12px",background:"linear-gradient(135deg,#EFF6FF,#FFFBEB)",border:"1px solid #DBEAFE",borderRadius:10,display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:20,height:20,borderRadius:6,background:T.blue,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span style={{fontSize:10,color:"white"}}>✦</span>
                </div>
                <span style={{fontSize:10,color:T.blue,fontWeight:600}}>Aides · Prédiction · Comparateur — Exclusifs NovaDPE</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS PREMIUM */}
      <section style={{padding:"20px",borderTop:`1px solid ${T.border}`,borderBottom:`1px solid ${T.border}`,background:"white"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0}} className="col4">
          {[
            {v:"30s",l:"Génération rapport",c:T.blue,icon:"⚡",sub:"Chrono moyen"},
            {v:"3",l:"Fonctionnalités exclusives",c:T.amber,icon:"✦",sub:"Aucun concurrent"},
            {v:"99%",l:"Conformité réglementaire",c:T.sage,icon:"✓",sub:"Norme ADEME"},
            {v:"0€",l:"Pour commencer",c:T.rose,icon:"🎁",sub:"5 rapports offerts"},
          ].map((s,i)=>(
            <div key={i} style={{textAlign:"center",padding:"16px 12px",borderRight:i<3?`1px solid ${T.border}`:"none",position:"relative"}}>
              <div style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:32,height:32,borderRadius:8,background:s.c==="#2563EB"?"#EFF6FF":s.c==="#D97706"?"#FFFBEB":s.c==="#059669"?"#ECFDF5":"#FEF2F2",marginBottom:8,fontSize:14}}>{s.icon}</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,color:s.c,letterSpacing:"-.03em",lineHeight:1}}>{s.v}</div>
              <div style={{fontSize:12,color:T.text,fontWeight:600,marginTop:4}}>{s.l}</div>
              <div style={{fontSize:10,color:T.muted,marginTop:2}}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{padding:"64px 20px",background:T.bg}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:40}}>
            <div className="badge badge-blue" style={{marginBottom:12}}>Fonctionnalités exclusives</div>
            <h2 className="section-title" style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:800,letterSpacing:"-.02em",color:T.text}}>
              Ce qu'aucun concurrent<br/><span style={{color:T.blue}}>ne propose encore.</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}} className="col3">
            {feats.map((f,i)=>{
              const [hov,setHov]=useState(false);
              const accent=f.c;
              return(
                <div key={i}
                  onMouseEnter={()=>setHov(true)}
                  onMouseLeave={()=>setHov(false)}
                  style={{
                    background:"white",borderRadius:16,padding:22,cursor:"default",position:"relative",overflow:"hidden",
                    border:`1px solid ${hov?accent+"33":T.border}`,
                    transform:hov?"translateY(-4px)":"none",
                    boxShadow:hov?`0 12px 32px ${accent}14,0 4px 12px rgba(0,0,0,.06)`:"0 1px 4px rgba(0,0,0,.04)",
                    transition:"all .25s ease",
                  }}>
                  {/* Background decoration */}
                  <div style={{position:"absolute",bottom:-20,right:-20,width:90,height:90,borderRadius:"50%",background:`${accent}06`,transition:"all .3s",transform:hov?"scale(1.3)":"scale(1)"}}/>
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${accent},${accent}44)`,opacity:hov?1:0,transition:"opacity .25s"}}/>
                  {f.badge && <div className="badge badge-blue" style={{position:"absolute",top:12,right:12,fontSize:9,zIndex:1}}>{f.badge}</div>}
                  <div style={{width:44,height:44,borderRadius:12,background:accent==="#2563EB"?"#EFF6FF":accent==="#D97706"?"#FFFBEB":"#ECFDF5",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:14,fontSize:20,boxShadow:`0 4px 12px ${accent}22`,position:"relative",zIndex:1}}>{f.e}</div>
                  <h3 style={{fontSize:14,fontWeight:700,marginBottom:7,color:T.text,position:"relative",zIndex:1}}>{f.t}</h3>
                  <p style={{color:T.muted,lineHeight:1.75,fontSize:12,position:"relative",zIndex:1}}>{f.d}</p>
                  {hov && <div style={{marginTop:10,fontSize:11,color:accent,fontWeight:600,display:"flex",alignItems:"center",gap:4,position:"relative",zIndex:1}}>En savoir plus →</div>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* DÉMO */}
      <section id="demo" style={{padding:"56px 20px",background:T.bg2}}>
        <div style={{maxWidth:560,margin:"0 auto",textAlign:"center"}}>
          <div className="badge badge-blue" style={{marginBottom:12}}>Démo interactive</div>
          <h2 className="section-title" style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,marginBottom:8,color:T.text}}>
            Essayez — <span style={{color:T.blue}}>gratuit</span>
          </h2>
          <p style={{color:T.muted,marginBottom:24,fontSize:13}}>Sans inscription. Rapport IA + MaPrimeRénov' en 30 secondes.</p>
          <Generateur plan="pro" credits={dc} setCredits={setDc}/>
        </div>
      </section>

      {/* TARIFS */}
      <section id="plans" style={{padding:"64px 20px",background:T.bg}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:36}}>
            <div className="badge badge-amber" style={{marginBottom:12}}>Tarifs</div>
            <h2 className="section-title" style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:800,letterSpacing:"-.02em",color:T.text}}>Simple, transparent,<br/><span style={{color:T.amber}}>sans surprise.</span></h2>
          </div>
          {/* Toggle */}
          <div style={{display:"flex",justifyContent:"center",marginBottom:28}}>
            <div style={{display:"flex",background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:4,gap:4}}>
              <button onClick={()=>setAnn(false)} className="btn" style={{padding:"7px 18px",fontSize:12,background:!ann?"#2563EB":"transparent",color:!ann?"white":T.muted,borderRadius:7}}>Mensuel</button>
              <button onClick={()=>setAnn(true)} className="btn" style={{padding:"7px 18px",fontSize:12,background:ann?"#D97706":"transparent",color:ann?"white":T.muted,borderRadius:7,gap:8}}>
                Annuel <span style={{fontSize:10,background:ann?"rgba(255,255,255,.2)":"#FFFBEB",color:ann?"white":T.amber,padding:"1px 6px",borderRadius:100,fontWeight:700}}>-17%</span>
              </button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}} className="plans-grid">
            {plans.map((p,i)=>{
              const isBlue = p.style==="blue";
              const isAmb = p.style==="amber";
              return (
                <div key={i} style={{
                  background:isBlue?"#2563EB":isAmb?"#1C1008":T.card,
                  border:`1.5px solid ${isBlue?"#2563EB":isAmb?"#D97706":T.border}`,
                  borderRadius:16,padding:24,
                  transform:isBlue?"scale(1.03)":"none",
                  boxShadow:isBlue?"0 8px 32px rgba(37,99,235,.25)":isAmb?"0 8px 24px rgba(28,16,8,.2)":"0 2px 8px rgba(0,0,0,.06)",
                  display:"flex",flexDirection:"column",position:"relative",overflow:"hidden",
                  transition:"all .25s ease"
                }}
                  onMouseEnter={e=>{if(!isBlue)e.currentTarget.style.transform="translateY(-3px)";}}
                  onMouseLeave={e=>{if(!isBlue)e.currentTarget.style.transform="none";}}>
                  {isBlue && <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.4),transparent)"}}/>}
                  {isAmb && <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,#D97706,transparent)"}}/>}
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:".07em",textTransform:"uppercase",color:isBlue?"rgba(255,255,255,.7)":isAmb?"#D97706":T.muted,marginBottom:6}}>{p.sub}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:700,marginBottom:6,color:isBlue?"white":isAmb?"#FAF7F2":T.text}}>{p.n}</div>
                  <div style={{display:"flex",alignItems:"baseline",gap:4,marginBottom:ann&&p.ann?4:14}}>
                    <span style={{fontFamily:"'Outfit',sans-serif",fontSize:36,fontWeight:800,color:isBlue?"white":isAmb?"#F59E0B":T.blue}}>{ann?p.pa:p.pm}</span>
                    <span style={{fontSize:13,color:isBlue?"rgba(255,255,255,.6)":isAmb?"rgba(250,247,242,.5)":T.muted}}>{ann?p.per_a:p.per_m}</span>
                  </div>
                  {ann && p.ann && <div style={{fontSize:11,fontWeight:600,color:isBlue?"#93C5FD":T.amber,marginBottom:14,display:"inline-flex",alignItems:"center",gap:4}}>🎉 {p.ann}</div>}
                  <div style={{height:1,background:isBlue?"rgba(255,255,255,.15)":isAmb?"rgba(255,255,255,.08)":T.border,margin:"0 0 14px"}}/>
                  <div style={{flex:1}}>
                    {p.oui.map((f,fi)=>(
                      <div key={fi} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8}}>
                        <span style={{fontSize:11,color:f.startsWith("✦")?T.amberL:isBlue?"#86EFAC":isAmb?"#D97706":T.sage,marginTop:1,flexShrink:0,fontWeight:700}}>{f.startsWith("✦")?"":isBlue?"✓":isAmb?"✓":"✓"}</span>
                        <span style={{fontSize:12,color:f.startsWith("✦")?"#F59E0B":isBlue?"rgba(255,255,255,.9)":isAmb?"rgba(250,247,242,.85)":T.text,lineHeight:1.4,fontWeight:f.startsWith("✦")?600:400}}>{f}</span>
                      </div>
                    ))}
                    {p.non.map((f,fi)=>(
                      <div key={fi} style={{display:"flex",gap:8,alignItems:"flex-start",marginBottom:8,opacity:.3}}>
                        <span style={{fontSize:11,color:T.muted,marginTop:1,flexShrink:0}}>✗</span>
                        <span style={{fontSize:12,color:T.muted,lineHeight:1.4}}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className="btn" style={{
                    width:"100%",marginTop:16,padding:"11px",
                    background:isBlue?"white":isAmb?"#D97706":"#2563EB",
                    color:isBlue?"#2563EB":isAmb?"white":"white",
                    boxShadow:isBlue?"0 2px 8px rgba(255,255,255,.2)":"none",
                    borderRadius:8
                  }} onClick={()=>setPage("register")}>
                    {p.id==="starter"?"Acheter un rapport":"Commencer · 5 rapports offerts"}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section style={{padding:"52px 20px",background:T.bg2}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div className="badge badge-stone" style={{marginBottom:12}}>Témoignages</div>
            <h2 className="section-title" style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,color:T.text}}>Ce que disent nos clients</h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}} className="col3">
            {temoignages.map((tm,i)=>(
              <div key={i} className="card" style={{padding:22}}>
                <div style={{display:"flex",gap:1,marginBottom:10}}>{"★★★★★".split("").map((s,j)=><span key={j} style={{color:T.amberL,fontSize:14}}>{s}</span>)}</div>
                <p style={{fontSize:13,color:T.text2,lineHeight:1.75,marginBottom:14,fontStyle:"italic"}}>"{tm.txt}"</p>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{width:32,height:32,borderRadius:"50%",background:`linear-gradient(135deg,${T.blue},${T.blueD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:700,color:"white",flexShrink:0}}>{tm.nom[0]}</div>
                  <div><div style={{fontWeight:600,fontSize:12,color:T.text}}>{tm.nom}</div><div style={{fontSize:10,color:T.muted}}>{tm.role}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:"52px 20px",background:T.bg}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:32}}>
            <div className="badge badge-stone" style={{marginBottom:12}}>FAQ</div>
            <h2 className="section-title" style={{fontFamily:"'Outfit',sans-serif",fontSize:28,fontWeight:800,color:T.text}}>Questions fréquentes</h2>
          </div>
          {faq.map((item,i)=>(
            <div key={i} style={{border:`1px solid ${faqOpen===i?T.blue:T.border}`,borderRadius:12,marginBottom:8,overflow:"hidden",transition:"border-color .2s",background:T.card}}>
              <button onClick={()=>setFaqOpen(faqOpen===i?null:i)} style={{width:"100%",padding:"14px 18px",background:"transparent",border:"none",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,textAlign:"left",fontFamily:"inherit"}}>
                <span style={{fontWeight:600,fontSize:13,color:T.text}}>{item.q}</span>
                <span style={{color:T.blue,fontSize:18,flexShrink:0,transition:"transform .25s",transform:faqOpen===i?"rotate(45deg)":"none"}}>+</span>
              </button>
              {faqOpen===i && <div style={{padding:"0 18px 14px",fontSize:13,color:T.muted,lineHeight:1.75,animation:"fadeUp .2s ease"}}>{item.r}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:"52px 20px",textAlign:"center",background:T.bg2}}>
        <div style={{maxWidth:440,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><Logo/></div>
          <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:800,letterSpacing:"-.02em",marginBottom:10,color:T.text}}>Prêt à transformer votre façon de travailler ?</h2>
          <p style={{color:T.muted,marginBottom:22,fontSize:14,lineHeight:1.7}}>5 rapports gratuits · MaPrimeRénov' auto · Prédiction 5 ans</p>
          <button className="btn bp" style={{fontSize:14,padding:"12px 28px"}} onClick={()=>setPage("register")}>Démarrer gratuitement →</button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${T.border}`,padding:"32px 20px",background:T.card}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1fr 1fr",gap:32,marginBottom:24}} className="col4">
            <div>
              <div style={{marginBottom:12}}><Logo/></div>
              <p style={{fontSize:12,color:T.muted,lineHeight:1.7,maxWidth:240}}>NovaDPE génère des rapports DPE professionnels par IA. 3 fonctionnalités exclusives qu'aucun concurrent ne propose.</p>
            </div>
            {[{title:"Produit",links:["Fonctionnalités","Tarifs","Démo","Nouveautés"]},{title:"Légal",links:["CGV","Confidentialité","Mentions légales","RGPD"]},{title:"Contact",links:["contact@novadpe.fr","support@novadpe.fr","Centre d'aide"]}].map((col,i)=>(
              <div key={i}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:10,color:T.text}}>{col.title}</div>
                {col.links.map((l,j)=><div key={j} style={{fontSize:12,color:T.muted,marginBottom:6,cursor:"pointer"}} onMouseEnter={e=>e.target.style.color=T.blue} onMouseLeave={e=>e.target.style.color=T.muted}>{l}</div>)}
              </div>
            ))}
          </div>
          <div style={{borderTop:`1px solid ${T.border}`,paddingTop:16,display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8}}>
            <div style={{fontSize:11,color:T.muted}}>© 2026 NovaDPE · DPE-Groupe · Tous droits réservés</div>
            <div style={{fontSize:11,color:T.muted}}>Conçu avec 🌿 pour l'immobilier durable</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── SIDEBAR ────────────────────────────────────────────────────────────
function Sidebar({active, setActive, setPage, credits, isAdmin, isAgenceAdmin}) {
  const nav = [
    {id:"dashboard",l:"Vue d'ensemble",e:"📊"},
    {id:"generate", l:"Nouveau rapport", e:"📄"},
    {id:"reports",  l:"Mes rapports",    e:"🗂️"},
    {id:"compare",  l:"Comparateur",     e:"⚖️"},
    {id:"artisans", l:"Artisans RGE",    e:"👷"},
    {id:"settings", l:"Paramètres",      e:"⚙️"},
  ];
  const agNav = [{id:"agence",l:"Mon Agence",e:"🏢"}];
  const admNav = [{id:"finances",l:"Finances",e:"💰"},{id:"clients",l:"Tous les clients",e:"👥"}];
  const all = [...nav,...(isAgenceAdmin?agNav:[]),...(isAdmin?admNav:[])];

  return (
    <div style={{width:220,flexShrink:0,background:T.sidebar,height:"100vh",display:"flex",flexDirection:"column",padding:"16px 10px",overflowY:"auto"}}>
      {/* Logo */}
      <div style={{padding:"4px 8px",marginBottom:16,cursor:"pointer"}} onClick={()=>setPage("landing")}>
        <Logo sm white/>
      </div>

      {/* Badge rôle */}
      <div style={{margin:"0 4px 12px",padding:"9px 10px",background:isAdmin?"rgba(245,158,11,.12)":isAgenceAdmin?"rgba(37,99,235,.12)":"rgba(255,255,255,.06)",border:`1px solid ${isAdmin?"rgba(245,158,11,.2)":isAgenceAdmin?"rgba(37,99,235,.2)":"rgba(255,255,255,.08)"}`,borderRadius:10}}>
        {isAdmin
          ?<><div style={{fontSize:9,color:"#F59E0B",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em"}}>👑 Propriétaire</div><div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:2}}>Accès complet activé</div></>
          :isAgenceAdmin
          ?<><div style={{fontSize:9,color:"#93C5FD",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em"}}>🏢 Responsable Agence</div><div style={{fontSize:10,color:"rgba(255,255,255,.4)",marginTop:2}}>Immobilier Dupont</div></>
          :<>
            <div style={{fontSize:9,color:"rgba(255,255,255,.5)",fontWeight:700,textTransform:"uppercase",letterSpacing:".05em",marginBottom:6}}>Crédits gratuits</div>
            <div style={{display:"flex",gap:3,marginBottom:3}}>{[1,2,3,4,5].map(i=><div key={i} style={{flex:1,height:3,borderRadius:2,background:i<=credits?"#2563EB":"rgba(255,255,255,.1)"}}/>)}</div>
            <div style={{fontSize:10,color:"rgba(255,255,255,.35)"}}>{credits}/5 rapports</div>
          </>
        }
      </div>

      {/* User */}
      <div style={{padding:"8px 10px",background:"rgba(255,255,255,.05)",borderRadius:10,marginBottom:14,display:"flex",alignItems:"center",gap:8,border:"1px solid rgba(255,255,255,.07)"}}>
        <div style={{width:28,height:28,borderRadius:8,background:"linear-gradient(135deg,#2563EB,#1D4ED8)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:12}}>{isAdmin?"👑":isAgenceAdmin?"🏢":"👤"}</div>
        <div><div style={{fontSize:11,fontWeight:600,color:"rgba(255,255,255,.9)"}}>{isAdmin?"Admin":isAgenceAdmin?"Marc Dupont":"Marc Dupont"}</div><div style={{fontSize:9,color:"rgba(255,255,255,.35)"}}>{isAdmin?"Propriétaire":isAgenceAdmin?"Responsable":"Formule Pro"}</div></div>
      </div>

      {/* Nav */}
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:2}}>
        {all.map((item,idx)=>{
          const isAdm = admNav.some(n=>n.id===item.id);
          const isAg = agNav.some(n=>n.id===item.id);
          const showSep = idx>0 && (isAdm&&!admNav.some(n=>n.id===all[idx-1]?.id)) || (isAg&&!agNav.some(n=>n.id===all[idx-1]?.id));
          return (
            <div key={item.id}>
              {showSep && <div style={{height:1,background:"rgba(255,255,255,.07)",margin:"5px 4px 6px"}}/>}
              <button onClick={()=>setActive(item.id)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"9px 10px",borderRadius:8,border:"none",cursor:"pointer",textAlign:"left",transition:"all .2s",background:active===item.id?isAdm?"rgba(245,158,11,.15)":"rgba(37,99,235,.2)":"transparent",color:active===item.id?isAdm?"#F59E0B":"#93C5FD":"rgba(255,255,255,.4)",fontFamily:"'Inter',sans-serif",fontSize:12,fontWeight:600}}>
                <span style={{fontSize:14}}>{item.e}</span>{item.l}
                {active===item.id && <div style={{marginLeft:"auto",width:4,height:4,borderRadius:"50%",background:isAdm?"#F59E0B":"#2563EB"}}/>}
              </button>
            </div>
          );
        })}
      </div>

      {/* Bottom */}
      <div style={{borderTop:"1px solid rgba(255,255,255,.07)",paddingTop:10,marginTop:8}}>
        <button onClick={()=>setPage("landing")} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:"rgba(255,255,255,.3)",width:"100%",fontSize:11,fontFamily:"inherit",transition:"color .2s"}} onMouseEnter={e=>e.currentTarget.style.color="rgba(255,255,255,.6)"} onMouseLeave={e=>e.currentTarget.style.color="rgba(255,255,255,.3)"}>🌐 Retour au site</button>
        <button onClick={()=>{if(window.confirm("Se déconnecter ?"))setPage("landing");}} style={{display:"flex",alignItems:"center",gap:7,padding:"8px 10px",borderRadius:8,border:"none",cursor:"pointer",background:"transparent",color:"#FCA5A5",width:"100%",fontSize:11,fontWeight:600,fontFamily:"inherit",marginTop:2}}>🚪 Déconnexion</button>
      </div>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────
function Dashboard({setPage, isAdmin, isAgenceAdmin, onNotif, unreadCount}) {
  const [active, setActive] = useState("dashboard");
  const [prev, setPrev] = useState([]);
  const [credits, setCredits] = useState(5);
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (tab) => { setPrev(p=>[...p,active]); setActive(tab); };
  const back = () => { if(prev.length>0){const p=[...prev];const l=p.pop();setPrev(p);setActive(l);} };

  const plan = isAgenceAdmin?"agence":isAdmin?"admin":"pro";

  const kpis = [
    {label:"Rapports ce mois",value:"12",trend:"↑ 3",trendUp:true,icon:"📄",color:T.blue,sparkData:[4,6,5,8,7,9,10,12],sub:"vs. mois dernier"},
    {label:"Biens analysés",value:"47",trend:"↑ 8",trendUp:true,icon:"🏠",color:T.sage,sparkData:[20,25,28,32,36,40,44,47]},
    {label:"Risques 2028",value:"4",trend:"↓ 1",trendUp:false,icon:"⚠️",color:T.amber,sparkData:[6,5,5,4,5,4,4,4],sub:"À signaler"},
    {label:"Économies DPE",value:"32 400 €",trend:"↑ 12%",trendUp:true,icon:"💶",color:T.blue,sparkData:[18,20,22,24,26,28,30,32],sub:"Identifiées"},
  ];

  const rpts = [
    {a:"12 rue des Lilas, Lyon",d:"02/06/2026",cl:"C",s:"68 m²",risk:false},
    {a:"8 av. Victor Hugo, Paris 16e",d:"28/05/2026",cl:"E",s:"110 m²",risk:true},
    {a:"3 place Bellecour, Lyon",d:"20/05/2026",cl:"B",s:"45 m²",risk:false},
  ];

  const now = new Date().getMonth();
  const moisNoms = ["Jan","Fév","Mar","Avr","Mai","Jun","Jul","Aoû","Sep","Oct","Nov","Déc"];
  const histo = moisNoms.map((m,i)=>{
    if(i>now) return {mois:m,rev:null,cout:null,ben:null};
    const r = Math.max(.05,(i+1)/(now+1));
    const rev = Math.round(472*r), cout = Math.round(70*r);
    return {mois:m,rev,cout,ben:rev-cout};
  });

  const tabs = {
    dashboard:(
      <div style={{padding:24,animation:"fadeUp .4s ease"}}>
        <div style={{marginBottom:20}}>
          <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:800,color:T.text,letterSpacing:"-.02em"}}>
            {isAdmin?"👑 Dashboard Propriétaire":isAgenceAdmin?"🏢 Dashboard Agence":"Bonjour, Marc 👋"}
          </h1>
          <p style={{color:T.muted,fontSize:12,marginTop:3}}>NovaDPE · {new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}</p>
        </div>

        {/* KPIs */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:14,marginBottom:20}} className="col4">
          {kpis.map((k,i)=><KpiCard key={i} {...k} onClick={()=>{}}/>)}
        </div>

        {/* Action rapide premium */}
        <div style={{background:"linear-gradient(135deg,#1E3A8A,#2563EB,#3B82F6)",borderRadius:16,padding:22,marginBottom:20,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12,position:"relative",overflow:"hidden",boxShadow:"0 8px 32px rgba(37,99,235,.25)"}}>
          <div style={{position:"absolute",right:-30,top:-30,width:160,height:160,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
          <div style={{position:"absolute",right:60,bottom:-40,width:120,height:120,borderRadius:"50%",background:"rgba(255,255,255,.04)"}}/>
          <div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:"rgba(255,255,255,.3)",borderRadius:"16px 0 0 16px"}}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:"#22C55E",boxShadow:"0 0 8px #22C55E"}}/>
              <span style={{fontSize:10,color:"rgba(255,255,255,.7)",fontWeight:600,letterSpacing:".04em",textTransform:"uppercase"}}>IA Active · Prête</span>
            </div>
            <div style={{fontFamily:"'Outfit',sans-serif",fontSize:17,fontWeight:700,color:"white",marginBottom:3}}>Générer un nouveau rapport</div>
            <div style={{color:"rgba(255,255,255,.6)",fontSize:12}}>Rapport · MaPrimeRénov' auto · Prédiction 5 ans</div>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap",position:"relative",zIndex:1}}>
            <button className="btn" style={{background:"white",color:T.blue,padding:"10px 18px",fontWeight:700,boxShadow:"0 4px 12px rgba(0,0,0,.2)"}} onClick={()=>go("generate")}>📄 Saisie manuelle</button>
            <button className="btn" style={{background:"rgba(255,255,255,.15)",color:"white",padding:"10px 18px",border:"1px solid rgba(255,255,255,.25)",fontWeight:600}} onClick={()=>go("generate")}>📸 Analyser par photo</button>
          </div>
        </div>

        {/* Fonctionnalités exclusives */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12,marginBottom:20}} className="col3">
          {[{e:"⚖️",l:"Comparateur de biens",tab:"compare",c:T.blue},{e:"🏛️",l:"Aides MaPrimeRénov'",tab:"generate",c:T.sage},{e:"🔮",l:"Prédiction 5 ans",tab:"generate",c:T.amber}].map((item,i)=>(
            <div key={i} className="card card-hover" style={{padding:14,cursor:"pointer",borderColor:T.border}} onClick={()=>go(item.tab)}>
              <div style={{fontSize:20,marginBottom:6}}>{item.e}</div>
              <div style={{fontSize:12,fontWeight:700,color:item.c}}>{item.l}</div>
              <div style={{fontSize:10,color:T.muted,marginTop:1}}>Exclusif NovaDPE</div>
            </div>
          ))}
        </div>

        {/* Graphique */}
        <div className="card" style={{padding:20,marginBottom:20}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16,flexWrap:"wrap",gap:8}}>
            <div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,color:T.text}}>Évolution mensuelle</div>
              <div style={{fontSize:11,color:T.muted,marginTop:2}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,marginRight:12}}><span style={{width:10,height:2,background:T.blue,display:"inline-block",borderRadius:1}}/> Revenus</span>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,marginRight:12}}><span style={{width:10,height:2,background:T.rose,display:"inline-block",borderRadius:1}}/> Coûts</span>
                <span style={{display:"inline-flex",alignItems:"center",gap:4}}><span style={{width:10,height:2,background:T.sage,display:"inline-block",borderRadius:1}}/> Bénéfice</span>
              </div>
            </div>
            {isAdmin && <button className="btn bsec bsm" onClick={()=>go("finances")}>Voir les finances →</button>}
          </div>
          <LineChartPremium data={histo} h={180}/>
        </div>

        {/* Rapports récents */}
        <div style={{background:"white",borderRadius:16,overflow:"hidden",border:`1px solid ${T.border}`,boxShadow:"0 1px 4px rgba(0,0,0,.04)"}}>
          <div style={{padding:"14px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",background:"linear-gradient(135deg,#FAFAF8,white)"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:700,color:T.text}}>Rapports récents</div>
              <span className="badge badge-stone" style={{fontSize:10}}>{rpts.length} ce mois</span>
            </div>
            <button className="btn bsec bsm" onClick={()=>go("reports")}>Voir tout →</button>
          </div>
          {rpts.map((r,i)=>{
            const [hov,setHov]=useState(false);
            return(
              <div key={i}
                onMouseEnter={()=>setHov(true)}
                onMouseLeave={()=>setHov(false)}
                style={{display:"flex",alignItems:"center",padding:"13px 18px",borderBottom:i<rpts.length-1?`1px solid ${T.border}`:"none",gap:12,cursor:"pointer",transition:"background .15s",flexWrap:"wrap",background:hov?T.bg2:"transparent"}}>
                <div style={{width:40,height:40,borderRadius:11,background:`linear-gradient(135deg,${DPE_C[r.cl]}22,${DPE_C[r.cl]}11)`,border:`1.5px solid ${DPE_C[r.cl]}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:800,color:DPE_C[r.cl],flexShrink:0,boxShadow:`0 2px 8px ${DPE_C[r.cl]}22`}}>{r.cl}</div>
                <div style={{flex:1,minWidth:80}}>
                  <div style={{fontWeight:600,fontSize:12,color:T.text}}>{r.a}</div>
                  <div style={{fontSize:10,color:T.muted,marginTop:2,display:"flex",alignItems:"center",gap:6}}>
                    <span>{r.s}</span>
                    <span style={{width:3,height:3,borderRadius:"50%",background:T.border,display:"inline-block"}}/>
                    <span>{r.d}</span>
                  </div>
                </div>
                {r.risk && <span className="badge badge-amber" style={{fontSize:10}}>⚠ 2028</span>}
                <div style={{display:"flex",gap:6,opacity:hov?1:.5,transition:"opacity .2s"}}>
                  <button className="btn bp bsm" style={{padding:"5px 10px",fontSize:11}}>⬇ PDF</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),
    generate:(()=>{
      const[mode,setMode]=useState("choice");
      if(mode==="choice") return(
        <div style={{padding:22}}>
          <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
          <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,marginBottom:6,color:T.text}}>Nouveau rapport DPE</h1>
          <p style={{color:T.muted,fontSize:12,marginBottom:20}}>Choisissez votre méthode d'analyse.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}} className="col2">
            <div className="card card-hover" style={{padding:24,cursor:"pointer",textAlign:"center",borderColor:T.blue+"22"}} onClick={()=>setMode("photo")}>
              <div style={{fontSize:36,marginBottom:10}}>📸</div>
              <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:6}}>Analyser par photo</div>
              <div style={{fontSize:12,color:T.muted,lineHeight:1.6}}>Prenez une photo de votre bien. L'IA analyse visuellement et génère le rapport.</div>
              <div className="badge badge-blue" style={{marginTop:10,fontSize:10}}>✦ Exclusif NovaDPE</div>
            </div>
            <div className="card card-hover" style={{padding:24,cursor:"pointer",textAlign:"center"}} onClick={()=>setMode("manual")}>
              <div style={{fontSize:36,marginBottom:10}}>📝</div>
              <div style={{fontWeight:700,fontSize:14,color:T.text,marginBottom:6}}>Saisie manuelle</div>
              <div style={{fontSize:12,color:T.muted,lineHeight:1.6}}>Renseignez les informations du bien manuellement pour générer le rapport.</div>
              <div className="badge badge-stone" style={{marginTop:10,fontSize:10}}>Méthode classique</div>
            </div>
          </div>
        </div>
      );
      if(mode==="photo") return <div style={{padding:22}}><AnalysePhoto plan={plan} credits={credits} setCredits={setCredits} onBack={()=>setMode("choice")}/></div>;
      if(mode==="manual") return <div style={{padding:22}}><Generateur plan={plan} credits={credits} setCredits={setCredits} agenceName="Immobilier Dupont" onBack={()=>setMode("choice")}/></div>;
      return null;
    })(),
    compare:(()=>{
      const[bA,setBA]=useState({address:"",surface:"",year:"",type:"Appartement",heating:"Gaz"});
      const[bB,setBB]=useState({address:"",surface:"",year:"",type:"Maison",heating:"Fioul"});
      const[res,setRes]=useState(null);
      const[loading,setLoading]=useState(false);
      const compare=async()=>{
        setLoading(true);
        try{
          const r=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:600,messages:[{role:"user",content:`Expert DPE. Compare ces 2 biens. JSON uniquement sans backticks:
Bien A: ${bA.type} ${bA.surface}m², ${bA.address||"Paris"}, an ${bA.year||2000}, ${bA.heating}
Bien B: ${bB.type} ${bB.surface}m², ${bB.address||"Lyon"}, an ${bB.year||1980}, ${bB.heating}
{"A":{"classe":"lettre","consommation":nb,"travaux":nb,"economie":nb,"risque2028":bool},"B":{"classe":"lettre","consommation":nb,"travaux":nb,"economie":nb,"risque2028":bool},"gagnant":"A ou B","raison":"1 phrase"}`}]})});
          const d=await r.json();
          setRes(JSON.parse(d.content?.map(b=>b.text||"").join("")?.replace(/```json|```/g,"").trim()||"{}"));
        }catch{
          setRes({A:{classe:"D",consommation:220,travaux:11500,economie:1800,risque2028:true},B:{classe:"E",consommation:290,travaux:22000,economie:2400,risque2028:true},gagnant:"A",raison:"Le bien A est plus rentable grâce à un coût de travaux inférieur et un meilleur ROI."});
        }
        setLoading(false);
      };
      return(
        <div style={{padding:22,animation:"fadeUp .4s ease"}}>
          <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
          <div style={{marginBottom:16}}>
            <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>⚖️ Comparateur de biens</h1>
            <p style={{color:T.muted,fontSize:12,marginTop:3}}>Comparez 2 biens côte à côte · Exclusif NovaDPE</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}} className="col2">
            {[{label:"Bien A",form:bA,setForm:setBA,color:T.blue},{label:"Bien B",form:bB,setForm:setBB,color:T.sage}].map(({label,form,setForm,color},idx)=>(
              <div key={idx} className="card" style={{padding:18,borderTop:`3px solid ${color}`}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,color,marginBottom:12}}>📍 {label}</div>
                <div style={{display:"flex",flexDirection:"column",gap:10}}>
                  <div><label>Adresse</label><input placeholder="Ex: 12 rue des Lilas, Lyon" value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/></div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <div><label>Surface m²</label><input type="number" placeholder="75" value={form.surface} onChange={e=>setForm({...form,surface:e.target.value})}/></div>
                    <div><label>Année</label><input type="number" placeholder="1985" value={form.year} onChange={e=>setForm({...form,year:e.target.value})}/></div>
                  </div>
                  <div><label>Type</label><select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}>{["Appartement","Maison","Bureau","Local"].map(v=><option key={v}>{v}</option>)}</select></div>
                  <div><label>Chauffage</label><select value={form.heating} onChange={e=>setForm({...form,heating:e.target.value})}>{["Gaz","Électrique","Fioul","PAC","Bois"].map(v=><option key={v}>{v}</option>)}</select></div>
                </div>
              </div>
            ))}
          </div>
          <button className="btn bp" style={{width:"100%",padding:"12px",fontSize:14,marginBottom:16}} onClick={compare} disabled={loading}>
            {loading?<><div style={{width:16,height:16,border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",borderRadius:"50%",animation:"spin .8s linear infinite"}}/> Comparaison en cours…</>:"⚖️ Comparer les deux biens par IA"}
          </button>
          {res&&(
            <div style={{animation:"fadeUp .4s ease"}}>
              {/* Résultat côte à côte */}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}} className="col2">
                {["A","B"].map(k=>{
                  const r=res[k]; if(!r) return null;
                  const isWinner=res.gagnant===k;
                  return(
                    <div key={k} className="card" style={{padding:18,position:"relative",overflow:"hidden",borderColor:isWinner?T.sage:T.border,boxShadow:isWinner?`0 4px 16px ${T.sage}22`:"none"}}>
                      {isWinner&&<div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${T.sage},${T.blue})`}}/>}
                      {isWinner&&<div style={{position:"absolute",top:10,right:10}}><span className="badge badge-green" style={{fontSize:9}}>🏆 Recommandé</span></div>}
                      <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,color:k==="A"?T.blue:T.sage,marginBottom:10}}>Bien {k}</div>
                      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                        <div style={{width:44,height:44,borderRadius:12,background:DPE_C[r.classe],display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:"white",boxShadow:`0 4px 12px ${DPE_C[r.classe]}44`}}>{r.classe}</div>
                        <div style={{fontSize:11,color:T.muted}}>{r.consommation} kWh/m²/an</div>
                      </div>
                      {[
                        {l:"Travaux estimés",v:`${(r.travaux||0).toLocaleString("fr-FR")} €`,c:T.amber},
                        {l:"Économie/an",v:`${(r.economie||0).toLocaleString("fr-FR")} €`,c:T.sage},
                        {l:"ROI",v:`${Math.round((r.travaux||1)/(r.economie||1))} ans`,c:T.blue},
                      ].map((m,i)=>(
                        <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:i<2?`1px solid ${T.border}`:"none"}}>
                          <span style={{fontSize:11,color:T.muted}}>{m.l}</span>
                          <span style={{fontSize:12,fontWeight:700,color:m.c,fontFamily:"'Outfit',sans-serif"}}>{m.v}</span>
                        </div>
                      ))}
                      {r.risque2028&&<div style={{marginTop:8,padding:"5px 10px",background:T.amberSoft,border:`1px solid ${T.amberL}44`,borderRadius:8,fontSize:10,color:T.amber,fontWeight:600}}>⚠ Risque 2028</div>}
                    </div>
                  );
                })}
              </div>
              {/* Recommandation */}
              {res.raison&&(
                <div style={{padding:"14px 16px",background:`linear-gradient(135deg,${T.sageSoft},#F0FDF4)`,border:`1px solid ${T.sage}33`,borderRadius:12,display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:32,height:32,borderRadius:9,background:T.sage,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:16}}>🏆</div>
                  <div>
                    <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,color:T.sage,marginBottom:3}}>Recommandation NovaDPE — Bien {res.gagnant}</div>
                    <div style={{fontSize:13,color:T.text2,lineHeight:1.7}}>{res.raison}</div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      );
    })(),
    reports:(
      <div style={{padding:22,animation:"fadeUp .4s ease"}}>
        <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
        <div style={{marginBottom:16}}><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>🗂️ Mes rapports</h1><p style={{color:T.muted,fontSize:12,marginTop:3}}>Historique complet de tous vos rapports.</p></div>
        <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap"}}><input placeholder="Rechercher une adresse…" style={{flex:1,minWidth:180}}/><select style={{maxWidth:140}}>{["Tous","Risque 2028","Classe A/B","Classe C/D","Classe E/F/G"].map(v=><option key={v}>{v}</option>)}</select></div>
        <div className="card" style={{overflow:"hidden"}}>
          {[{a:"12 rue des Lilas, Lyon 3e",d:"02/06/2026",cl:"C",s:"68 m²",risk:false},{a:"8 av. Victor Hugo, Paris 16e",d:"28/05/2026",cl:"E",s:"110 m²",risk:true},{a:"3 place Bellecour, Lyon 1er",d:"20/05/2026",cl:"B",s:"45 m²",risk:false},{a:"54 rue Mercière, Lyon 2e",d:"14/05/2026",cl:"D",s:"92 m²",risk:true},{a:"2 rue Centrale, Grenoble",d:"07/05/2026",cl:"A",s:"78 m²",risk:false}].map((r,i,arr)=>(
            <div key={i} style={{display:"flex",alignItems:"center",padding:"12px 16px",borderBottom:i<arr.length-1?`1px solid ${T.border}`:"none",gap:12,cursor:"pointer",transition:"background .15s",flexWrap:"wrap"}}
              onMouseEnter={e=>e.currentTarget.style.background=T.bg2}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{width:34,height:34,borderRadius:9,background:DPE_C[r.cl]+"22",border:`1.5px solid ${DPE_C[r.cl]}44`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Outfit',sans-serif",fontSize:15,fontWeight:700,color:DPE_C[r.cl],flexShrink:0}}>{r.cl}</div>
              <div style={{flex:1,minWidth:80}}><div style={{fontWeight:600,fontSize:12,color:T.text}}>{r.a}</div><div style={{fontSize:10,color:T.muted,marginTop:1}}>{r.s} · {r.d}</div></div>
              {r.risk && <span className="badge badge-amber" style={{fontSize:10}}>⚠ 2028</span>}
              <div style={{display:"flex",gap:6}}><button className="btn bsec bsm">⬇ PDF</button><button className="btn bdanger bsm">🗑</button></div>
            </div>
          ))}
        </div>
      </div>
    ),
    artisans:(
      <div style={{padding:22,animation:"fadeUp .4s ease"}}>
        <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
        <div style={{marginBottom:14}}><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>👷 Réseau Artisans RGE</h1><p style={{color:T.muted,fontSize:12,marginTop:3}}>Artisans intégrés automatiquement dans les rapports.</p></div>
        <div style={{padding:14,background:"#EFF6FF",border:`1px solid #DBEAFE`,borderRadius:10,marginBottom:14,fontSize:12,color:T.text2,lineHeight:1.7}}>
          💡 <strong>Comment ça marche :</strong> Un rapport pour Lyon 69 affiche automatiquement les artisans RGE du 69 en dernière page. Vous percevez 5–10% de commission sur chaque chantier.<br/>
          <strong>Trouver des artisans :</strong> <strong>rge-qualite.fr</strong> → message : <em>"Je gère NovaDPE et j'aimerais vous référencer gratuitement 3 mois dans nos rapports DPE. Intéressé ?"</em>
        </div>
        <div style={{display:"flex",gap:10,marginBottom:12,flexWrap:"wrap"}}><input placeholder="Rechercher…" style={{flex:1,minWidth:180}}/><button className="btn bp bsm">+ Ajouter</button></div>
        <div className="card" style={{overflow:"hidden"}}>
          {[{n:"RGE Isolation Pro",v:"Lyon (69)",s:"Isolation",tel:"04 72 00 11 22",ok:true,comm:"5%"},{n:"EcoTherm Solutions",v:"Villeurbanne (69)",s:"Chauffage & PAC",tel:"04 78 33 44 55",ok:true,comm:"8%"},{n:"FenêtrePlus RGE",v:"Lyon (69)",s:"Menuiseries",tel:"04 69 55 66 77",ok:true,comm:"5%"},{n:"IsoRénov Rhône-Alpes",v:"Grenoble (38)",s:"Isolation combles",tel:"04 76 88 99 00",ok:false,comm:"—"}].map((a,i,arr)=>(
            <div key={i} style={{display:"flex",alignItems:"center",padding:"11px 16px",borderBottom:i<arr.length-1?`1px solid ${T.border}`:"none",gap:10,flexWrap:"wrap",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{width:32,height:32,borderRadius:8,background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:14}}>🔧</div>
              <div style={{flex:1,minWidth:90}}><div style={{fontWeight:600,fontSize:12,color:T.text}}>{a.n}</div><div style={{fontSize:10,color:T.muted,marginTop:1}}>{a.s} · {a.v}</div></div>
              <div style={{fontSize:11,color:T.blue}}>📞 {a.tel}</div>
              <div style={{fontSize:11,color:T.amber,fontWeight:600}}>Com. {a.comm}</div>
              <span className={`badge ${a.ok?"badge-green":"badge-amber"}`}>{a.ok?"✓ Actif":"⏳ Attente"}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    settings:(
      <div style={{padding:22,animation:"fadeUp .4s ease",maxWidth:560}}>
        <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
        <div style={{marginBottom:16}}><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>⚙️ Paramètres</h1></div>
        <div className="card" style={{padding:18,marginBottom:12}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>👤 Profil</div>
          <div style={{display:"grid",gap:10}}><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}><div><label>Prénom</label><input defaultValue="Marc"/></div><div><label>Nom</label><input defaultValue="Dupont"/></div></div><div><label>Email</label><input type="email" defaultValue="marc@agence.fr"/></div></div>
          <button className="btn bp bsm" style={{marginTop:12}}>Sauvegarder</button>
        </div>
        <div className="card" style={{padding:18,marginBottom:12,borderColor:T.blue+"33"}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:10,color:T.text}}>💳 Abonnement</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:10,padding:"11px 12px",background:T.blueSoft,border:`1px solid ${T.blue}33`,borderRadius:10,marginBottom:10}}>
            <div><div style={{fontSize:15,fontWeight:700,color:T.blue,fontFamily:"'Outfit',sans-serif"}}>Formule Pro</div><div style={{fontSize:11,color:T.muted,marginTop:2}}>59 €/mois · Renouvellement le 1er juillet 2026</div></div>
            <button className="btn bamb bsm">Passer à l'Agence</button>
          </div>
          <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
            <button className="btn bsec bsm">Passer en annuel — 600 €/an</button>
            <button className="btn bdanger bsm">Annuler l'abonnement</button>
          </div>
        </div>
        <div className="card" style={{padding:18}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>🔐 Sécurité</div>
          <div style={{display:"grid",gap:10}}><div><label>Mot de passe actuel</label><input type="password" placeholder="••••••••"/></div><div><label>Nouveau mot de passe</label><input type="password" placeholder="••••••••"/></div></div>
          <button className="btn bp bsm" style={{marginTop:12}}>Changer</button>
        </div>
      </div>
    ),
    finances:(()=>{
      const[cl,setCl]=useState({starter:3,pro:8,agence:1});
      const[simCl,setSimCl]=useState({starter:10,pro:20,agence:2});
      const[ong,setOng]=useState("apercu");
      const total=cl.starter+cl.pro+cl.agence;
      const MRR=cl.starter*35+cl.pro*59+cl.agence*219;
      const rapports=cl.starter+cl.pro*8+cl.agence*20;
      const CO={api:Math.round(rapports*.30),lemon:Math.round(MRR*.035)};
      CO.total=CO.api+CO.lemon;
      const BEN=MRR-CO.total, ARR=MRR*12, marge=MRR>0?Math.round((BEN/MRR)*100):0;
      const simMRR=simCl.starter*35+simCl.pro*59+simCl.agence*219;
      const simCO={api:Math.round((simCl.starter+simCl.pro*8+simCl.agence*20)*.30),lemon:Math.round(simMRR*.035)};
      simCO.total=simCO.api+simCO.lemon;
      const simBEN=simMRR-simCO.total;
      return(
        <div style={{padding:22,animation:"fadeUp .4s ease"}}>
          <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
          <div style={{marginBottom:16}}>
            <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>💰 Dashboard Financier</h1>
            <p style={{color:T.muted,fontSize:12,marginTop:3}}>Vue propriétaire · Mise à jour automatique à chaque paiement</p>
          </div>

          {BEN<0&&<div style={{padding:"9px 14px",borderRadius:10,fontSize:12,fontWeight:500,marginBottom:12,background:T.roseSoft,border:`1px solid #FECACA`,color:T.rose}}>🚨 Il manque {Math.abs(BEN)} € pour être rentable · Besoin de {Math.ceil(Math.abs(BEN)/59)} client(s) Pro</div>}
          {BEN>=0&&<div style={{padding:"9px 14px",borderRadius:10,fontSize:12,fontWeight:500,marginBottom:12,background:T.sageSoft,border:`1px solid #A7F3D0`,color:T.sage}}>✅ Projet rentable · +{BEN.toLocaleString("fr-FR")} € de bénéfice ce mois</div>}

          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}} className="col4">
            {[
              {label:"MRR",value:`${MRR.toLocaleString("fr-FR")} €`,icon:"💰",color:T.blue,sparkData:[200,250,300,350,380,420,450,MRR],sub:"Revenus/mois"},
              {label:"Bénéfice",value:`${BEN.toLocaleString("fr-FR")} €`,icon:"📈",color:BEN>=0?T.sage:T.rose,sub:`Marge ${marge}%`},
              {label:"Clients",value:`${total}`,icon:"👥",color:T.amber,sub:`${cl.pro} Pro · ${cl.agence} Agence`},
              {label:"ARR",value:`${ARR.toLocaleString("fr-FR")} €`,icon:"🚀",color:T.blue,sub:"Revenu annuel"},
            ].map((k,i)=><KpiCard key={i} {...k}/>)}
          </div>

          {/* Onglets */}
          <div style={{display:"flex",gap:3,marginBottom:16,background:T.bg2,borderRadius:10,padding:3,border:`1px solid ${T.border}`,flexWrap:"wrap"}}>
            {[{id:"apercu",l:"Aperçu"},{id:"graphiques",l:"Graphiques 3D"},{id:"details",l:"Coûts"},{id:"sim",l:"Simulateur"}].map(o=>(
              <button key={o.id} onClick={()=>setOng(o.id)} style={{padding:"7px 14px",borderRadius:8,border:"none",cursor:"pointer",fontFamily:"'Inter',sans-serif",fontWeight:600,fontSize:11,transition:"all .2s",background:ong===o.id?T.blue:"transparent",color:ong===o.id?"white":T.muted}}>{o.l}</button>
            ))}
          </div>

          {/* APERÇU */}
          {ong==="apercu"&&(
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}} className="col2">
              <div className="card" style={{padding:18}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>Clients par formule</div>
                <div style={{display:"flex",justifyContent:"center",marginBottom:14}}>
                  <Donut segments={[{v:Math.max(cl.starter,.1),color:T.blue},{v:Math.max(cl.pro,.1),color:T.sage},{v:Math.max(cl.agence,.1),color:T.amber}]} size={100} label={total.toString()} sub="clients"/>
                </div>
                {[{k:"starter",l:"Starter",p:35,c:T.blue},{k:"pro",l:"Pro",p:59,c:T.sage},{k:"agence",l:"Agence",p:219,c:T.amber}].map((pl,i)=>(
                  <div key={i} style={{padding:"10px 12px",background:T.bg2,borderRadius:10,border:`1px solid ${T.border}`,marginBottom:7}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:5}}>
                      <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:7,height:7,borderRadius:"50%",background:pl.c}}/><span style={{fontWeight:600,fontSize:12,color:T.text}}>{pl.l} <span style={{fontSize:10,color:T.muted}}>{pl.p} €</span></span></div>
                      <div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontFamily:"'Outfit',sans-serif",fontSize:16,fontWeight:700,color:pl.c}}>{cl[pl.k]}</span><span style={{fontSize:11,color:T.muted}}>{(cl[pl.k]*pl.p).toLocaleString("fr-FR")} €</span></div>
                    </div>
                    <div style={{height:3,background:T.border,borderRadius:2,overflow:"hidden",marginBottom:7}}><div style={{height:"100%",width:`${total>0?(cl[pl.k]/total)*100:0}%`,background:pl.c,borderRadius:2,transition:"width .8s"}}/></div>
                    <div style={{display:"flex",alignItems:"center",gap:7}}>
                      <button onClick={()=>setCl(c=>({...c,[pl.k]:Math.max(0,c[pl.k]-1)}))} style={{width:22,height:22,borderRadius:5,border:`1px solid ${T.border}`,background:"white",color:T.text,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                      <span style={{fontSize:11,color:T.muted,flex:1,textAlign:"center"}}>{cl[pl.k]} client{cl[pl.k]>1?"s":""}</span>
                      <button onClick={()=>setCl(c=>({...c,[pl.k]:c[pl.k]+1}))} style={{width:22,height:22,borderRadius:5,border:`1px solid ${T.border}`,background:"white",color:T.blue,cursor:"pointer",fontSize:13,display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                    </div>
                  </div>
                ))}
                <div style={{padding:"10px 12px",background:T.blueSoft,border:`1px solid ${T.blue}22`,borderRadius:10,display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:12,fontWeight:600,color:T.text}}>Total MRR</span>
                  <span style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:700,color:T.blue}}>{MRR.toLocaleString("fr-FR")} €</span>
                </div>
              </div>
              <div className="card" style={{padding:18}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>Santé financière</div>
                {[{l:"Revenus MRR",v:MRR,max:Math.max(MRR*1.5,500),c:T.blue,s:" €"},{l:"Coûts totaux",v:CO.total,max:Math.max(MRR*1.5,500),c:T.rose,s:" €"},{l:"Bénéfice net",v:Math.max(0,BEN),max:Math.max(MRR*1.5,500),c:T.sage,s:" €"},{l:"Marge",v:Math.max(0,marge),max:100,c:T.amber,s:" %"}].map((m,i)=>(
                  <div key={i} style={{marginBottom:12}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:4}}><span style={{fontSize:11,color:T.muted}}>{m.l}</span><span style={{fontSize:12,fontWeight:700,color:m.c}}>{m.v.toLocaleString("fr-FR")}{m.s}</span></div>
                    <div style={{height:5,background:T.bg2,borderRadius:3,overflow:"hidden",border:`1px solid ${T.border}`}}><div style={{height:"100%",width:`${Math.min(100,(m.v/m.max)*100)}%`,background:`linear-gradient(90deg,${m.c},${m.c}88)`,borderRadius:3,transition:"width .8s"}}/></div>
                  </div>
                ))}
                <div style={{height:1,background:T.border,margin:"12px 0"}}/>
                <div style={{padding:"10px 12px",background:T.amberSoft,border:`1px solid ${T.amberL}44`,borderRadius:10}}>
                  <div style={{fontSize:9,color:T.muted,fontWeight:600,textTransform:"uppercase"}}>Revenu annuel projeté</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:700,color:T.amber,marginTop:2}}>{ARR.toLocaleString("fr-FR")} €</div>
                </div>
              </div>
            </div>
          )}

          {/* GRAPHIQUES 3D */}
          {ong==="graphiques"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="card" style={{padding:20}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:700,marginBottom:4,color:T.text}}>Évolution mensuelle — Barres 3D</div>
                <div style={{fontSize:11,color:T.muted,marginBottom:14,display:"flex",gap:14}}>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:3,background:T.blue,display:"inline-block",borderRadius:2}}/> Revenus</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:3,background:T.rose,display:"inline-block",borderRadius:2}}/> Coûts</span>
                  <span style={{display:"flex",alignItems:"center",gap:4}}><span style={{width:10,height:3,background:T.sage,display:"inline-block",borderRadius:2}}/> Bénéfice</span>
                </div>
                <Chart3D data={histo} h={160}/>
              </div>
              <div className="card" style={{padding:20}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:14,fontWeight:700,marginBottom:4,color:T.text}}>Courbe d'évolution avec projection</div>
                <LineChartPremium data={histo} h={180}/>
              </div>
              <div className="card" style={{padding:20}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:14,color:T.text}}>Répartition clients — Donut 3D</div>
                <div style={{display:"flex",alignItems:"center",gap:20,flexWrap:"wrap"}}>
                  <Donut segments={[{v:Math.max(cl.starter,.1),color:T.blue},{v:Math.max(cl.pro,.1),color:T.sage},{v:Math.max(cl.agence,.1),color:T.amber}]} size={130} label={total.toString()} sub="clients"/>
                  <div style={{flex:1}}>
                    {[{k:"starter",l:"Starter",c:T.blue},{k:"pro",l:"Pro",c:T.sage},{k:"agence",l:"Agence",c:T.amber}].map((pl,i)=>(
                      <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                        <div style={{width:10,height:10,borderRadius:3,background:pl.c,flexShrink:0}}/>
                        <span style={{fontSize:12,color:T.text,flex:1}}>{pl.l}</span>
                        <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,color:pl.c}}>{total>0?Math.round((cl[pl.k]/total)*100):0}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DÉTAIL COÛTS */}
          {ong==="details"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="card" style={{padding:18}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>💰 Revenus détaillés</div>
                {[{k:"starter",l:"Starter",p:35,c:T.blue},{k:"pro",l:"Pro",p:59,c:T.sage},{k:"agence",l:"Agence",p:219,c:T.amber}].map((pl,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:T.bg2,borderRadius:9,marginBottom:7,border:`1px solid ${T.border}`,flexWrap:"wrap",gap:6}}>
                    <div style={{display:"flex",alignItems:"center",gap:7}}><div style={{width:8,height:8,borderRadius:"50%",background:pl.c}}/><span style={{fontWeight:600,fontSize:12,color:T.text}}>{pl.l}</span></div>
                    <span style={{fontSize:11,color:T.muted}}>{cl[pl.k]} × {pl.p} €</span>
                    <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,color:pl.c,fontSize:14}}>{(cl[pl.k]*pl.p).toLocaleString("fr-FR")} €</span>
                    <span style={{fontSize:11,color:T.muted}}>{MRR>0?Math.round((cl[pl.k]*pl.p/MRR)*100):0}%</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:T.blueSoft,borderRadius:9,border:`1px solid ${T.blue}22`}}>
                  <span style={{fontWeight:700,fontSize:13,color:T.text}}>TOTAL MRR</span>
                  <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,color:T.blue,fontSize:18}}>{MRR.toLocaleString("fr-FR")} €</span>
                </div>
              </div>
              <div className="card" style={{padding:18}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>📊 Coûts détaillés</div>
                {[{l:"Claude API",v:CO.api,calc:`0,30 € × ${rapports} rapports`,c:T.rose},{l:"Lemon Squeezy",v:CO.lemon,calc:`3,5% × ${MRR} €`,c:T.amber},{l:"Vercel",v:0,calc:"Gratuit",c:T.sage},{l:"Brevo emails",v:0,calc:"Gratuit jusqu'à 300/jour",c:T.sage}].map((co,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"10px 12px",background:T.bg2,borderRadius:9,marginBottom:7,border:`1px solid ${T.border}`,flexWrap:"wrap",gap:6}}>
                    <span style={{fontWeight:600,fontSize:12,color:T.text}}>{co.l}</span>
                    <span style={{fontSize:11,color:T.muted}}>{co.calc}</span>
                    <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,color:co.v>0?co.c:T.sage,fontSize:13}}>{co.v>0?`${co.v} €`:"Gratuit"}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",padding:"10px 12px",background:T.roseSoft,borderRadius:9,border:"1px solid #FECACA"}}>
                  <span style={{fontWeight:700,fontSize:13,color:T.text}}>TOTAL COÛTS</span>
                  <span style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,color:T.rose,fontSize:18}}>{CO.total} €</span>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}} className="col2">
                <div className="card" style={{padding:16,textAlign:"center"}}><div style={{fontSize:10,color:T.muted,fontWeight:600,textTransform:"uppercase",marginBottom:5}}>Bénéfice ce mois</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:700,color:BEN>=0?T.sage:T.rose}}>{BEN>=0?"+":""}{BEN.toLocaleString("fr-FR")} €</div><div style={{fontSize:11,color:T.muted,marginTop:3}}>Marge {marge}%</div></div>
                <div className="card" style={{padding:16,textAlign:"center"}}><div style={{fontSize:10,color:T.muted,fontWeight:600,textTransform:"uppercase",marginBottom:5}}>Revenu annuel</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:26,fontWeight:700,color:T.amber}}>{ARR.toLocaleString("fr-FR")} €</div><div style={{fontSize:11,color:T.muted,marginTop:3}}>Si stable 12 mois</div></div>
              </div>
            </div>
          )}

          {/* SIMULATEUR jusqu'à 500 */}
          {ong==="sim"&&(
            <div style={{display:"flex",flexDirection:"column",gap:14}}>
              <div className="card" style={{padding:20}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:4,color:T.text}}>🎯 Simulateur de scénarios</div>
                <p style={{fontSize:12,color:T.muted,marginBottom:18}}>Déplace les curseurs jusqu'à 500 clients pour voir l'impact instantané.</p>
                {[{k:"starter",l:"Clients Starter (35 €)",c:T.blue},{k:"pro",l:"Clients Pro (59 €)",c:T.sage},{k:"agence",l:"Clients Agence (219 €)",c:T.amber}].map(pl=>(
                  <div key={pl.k} style={{marginBottom:18}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                      <span style={{fontSize:12,color:T.text,fontWeight:500}}>{pl.l}</span>
                      <span style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:700,color:pl.c}}>{simCl[pl.k]}</span>
                    </div>
                    <input type="range" min={0} max={500} value={simCl[pl.k]} onChange={e=>setSimCl(c=>({...c,[pl.k]:+e.target.value}))} style={{width:"100%",accentColor:pl.c}}/>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:9,color:T.muted,marginTop:2}}><span>0</span><span>100</span><span>200</span><span>300</span><span>400</span><span>500</span></div>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:12}}>
                {[{l:"MRR simulé",v:simMRR,s:" €",c:T.blue,e:"💰"},{l:"Coûts simulés",v:simCO.total,s:" €",c:T.rose,e:"📊"},{l:"Bénéfice",v:simBEN,s:" €",c:simBEN>=0?T.sage:T.rose,e:"📈"}].map((k,i)=>(
                  <div key={i} className="card" style={{padding:14,textAlign:"center"}}><div style={{fontSize:16,marginBottom:4}}>{k.e}</div><div style={{fontSize:9,color:T.muted,fontWeight:600,textTransform:"uppercase",marginBottom:3}}>{k.l}</div><div style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:700,color:k.c}}>{k.v.toLocaleString("fr-FR")}{k.s}</div></div>
                ))}
              </div>
              <div className="card" style={{padding:18}}>
                <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>🎯 Objectifs de revenus</div>
                {[500,1000,5000,10000,50000].map((obj,i)=>{
                  const need=Math.max(0,Math.ceil((obj-MRR)/59));const ok=MRR>=obj;
                  return(
                    <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 0",borderBottom:i<4?`1px solid ${T.border}`:"none"}}>
                      <div style={{width:7,height:7,borderRadius:"50%",background:ok?T.sage:T.border,flexShrink:0}}/>
                      <span style={{fontSize:13,fontWeight:600,color:ok?T.sage:T.text,flex:1}}>{obj.toLocaleString("fr-FR")} €/mois</span>
                      {ok?<span className="badge badge-green" style={{fontSize:10}}>✅ Atteint !</span>:<span style={{fontSize:11,color:T.muted}}>+{need} clients Pro</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    })(),
    agence:(
      <div style={{padding:22,animation:"fadeUp .4s ease"}}>
        <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
        <div style={{marginBottom:16}}><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>🏢 Mon Agence</h1></div>
        <div className="card" style={{padding:18,marginBottom:12}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontSize:13,fontWeight:700,marginBottom:12,color:T.text}}>👥 Agents (3/10)</div>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}><input placeholder="agent@votreagence.fr" style={{flex:1,minWidth:180}}/><button className="btn bp bsm">Inviter</button></div>
          {[{nom:"Sophie Martin",email:"s.martin@dupont.fr",rapp:12,actif:true},{nom:"Jean Moreau",email:"j.moreau@dupont.fr",rapp:8,actif:true},{nom:"Claire Petit",email:"c.petit@dupont.fr",rapp:5,actif:false}].map((a,i,arr)=>(
            <div key={i} style={{display:"flex",alignItems:"center",padding:"10px 0",borderBottom:i<arr.length-1?`1px solid ${T.border}`:"none",gap:10,flexWrap:"wrap"}}>
              <div style={{width:30,height:30,borderRadius:8,background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>👤</div>
              <div style={{flex:1}}><div style={{fontWeight:600,fontSize:12,color:T.text}}>{a.nom}</div><div style={{fontSize:10,color:T.muted}}>{a.email}</div></div>
              <span style={{fontSize:11,color:T.muted}}>📄 {a.rapp}</span>
              <span className={`badge ${a.actif?"badge-green":"badge-amber"}`}>{a.actif?"Actif":"Invité"}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    clients:(
      <div style={{padding:22,animation:"fadeUp .4s ease"}}>
        <button onClick={back} style={{background:"none",border:"none",cursor:"pointer",color:T.blue,fontSize:12,fontWeight:600,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5,marginBottom:14}}>← Retour</button>
        <div style={{marginBottom:14}}><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>👥 Tous les clients</h1><p style={{color:T.muted,fontSize:12,marginTop:3}}>Vue propriétaire · 5 comptes</p></div>
        <div className="card" style={{overflow:"hidden"}}>
          {[{nom:"Sophie Martin",email:"s.martin@immo.fr",plan:"Pro",rapp:12,date:"02/06",ok:true},{nom:"Jean-Pierre Dubois",email:"jp.dubois@agence.fr",plan:"Agence",rapp:34,date:"15/05",ok:true},{nom:"Camille Renard",email:"c.renard@free.fr",plan:"Starter",rapp:3,date:"28/05",ok:true},{nom:"Marc Dupont",email:"m.dupont@gmail.com",plan:"Pro",rapp:8,date:"10/04",ok:true},{nom:"Isabelle Morel",email:"i.morel@notaire.fr",plan:"Pro",rapp:21,date:"01/03",ok:false}].map((c,i,arr)=>(
            <div key={i} style={{display:"flex",alignItems:"center",padding:"11px 16px",borderBottom:i<arr.length-1?`1px solid ${T.border}`:"none",gap:10,flexWrap:"wrap",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg2} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{width:30,height:30,borderRadius:8,background:"#EFF6FF",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,flexShrink:0}}>👤</div>
              <div style={{flex:1,minWidth:80}}><div style={{fontWeight:600,fontSize:12,color:T.text}}>{c.nom}</div><div style={{fontSize:10,color:T.muted}}>{c.email}</div></div>
              <span className={`badge ${c.plan==="Pro"?"badge-blue":c.plan==="Agence"?"badge-amber":"badge-stone"}`}>{c.plan}</span>
              <span style={{fontSize:11,color:T.muted}}>📄 {c.rapp}</span>
              <span style={{fontSize:10,color:T.muted}}>📅 {c.date}</span>
              <span className={`badge ${c.ok?"badge-green":"badge-red"}`}>{c.ok?"Actif":"Inactif"}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return (
    <div style={{display:"flex",height:"100vh",overflow:"hidden",background:T.bg}}>
      {/* Overlay mobile quand sidebar ouverte */}
      {mobileOpen && <div onClick={()=>setMobileOpen(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,.5)",zIndex:498}}/>}

      {/* Sidebar mobile — par-dessus le contenu */}
      <div className="sidebar-mobile" style={{position:"fixed",top:0,left:0,height:"100vh",zIndex:499,transform:mobileOpen?"translateX(0)":"translateX(-100%)",transition:"transform .3s ease"}}>
        <Sidebar active={active} setActive={(t)=>{go(t);setMobileOpen(false);}} setPage={setPage} credits={credits} isAdmin={isAdmin} isAdmin={isAdmin} isAgenceAdmin={isAgenceAdmin}/>
      </div>

      {/* Sidebar desktop — intégrée dans le layout */}
      <div className="sidebar-desktop" style={{flexShrink:0}}>
        <Sidebar active={active} setActive={(t)=>go(t)} setPage={setPage} credits={credits} isAdmin={isAdmin} isAgenceAdmin={isAgenceAdmin}/>
      </div>

      <div style={{flex:1,overflow:"auto",display:"flex",flexDirection:"column"}}>
        {/* Topbar */}
        <div style={{padding:"10px 18px",borderBottom:`1px solid ${T.border}`,display:"flex",alignItems:"center",justifyContent:"space-between",background:T.card,position:"sticky",top:0,zIndex:100,gap:10,flexShrink:0}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button className="mobile-topbar" style={{background:"none",border:"none",cursor:"pointer",fontSize:18,padding:"2px"}} onClick={()=>setMobileOpen(true)}>☰</button>
            {prev.length>0 && <button onClick={back} className="btn bsec bsm">← Retour</button>}
            <div style={{display:"flex",alignItems:"center",gap:5}}>
              <span style={{fontSize:11,color:T.muted}}>Dashboard</span>
              <span style={{fontSize:11,color:T.muted}}>›</span>
              <span style={{fontSize:11,color:T.blue,fontWeight:600}}>
                {active==="dashboard"?"Vue d'ensemble":active==="generate"?"Nouveau rapport":active==="reports"?"Mes rapports":active==="compare"?"Comparateur":active==="artisans"?"Artisans RGE":active==="agence"?"Mon Agence":active==="finances"?"Finances":active==="clients"?"Tous les clients":"Paramètres"}
              </span>
            </div>
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center"}}>
            <button onClick={()=>setPage("landing")} style={{fontSize:11,color:T.muted,background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",padding:"4px 8px"}}>🌐 Site</button>
            {/* Notification bell */}
            <button onClick={onNotif} style={{position:"relative",width:32,height:32,borderRadius:8,border:`1px solid ${T.border}`,background:"white",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:15,transition:"all .2s"}} onMouseEnter={e=>e.currentTarget.style.borderColor=T.blue} onMouseLeave={e=>e.currentTarget.style.borderColor=T.border}>
              🔔
              {unreadCount>0 && <div style={{position:"absolute",top:-3,right:-3,width:15,height:15,borderRadius:"50%",background:T.rose,color:"white",fontSize:8,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid white"}}>{unreadCount}</div>}
            </button>
            <button onClick={()=>{if(window.confirm("Se déconnecter ?"))setPage("landing");}} className="btn bdanger bsm">🚪 Déco.</button>
          </div>
        </div>
        <div style={{flex:1,overflow:"auto"}}>{tabs[active]||null}</div>
      </div>
    </div>
  );
}

// ── AUTH ──────────────────────────────────────────────────────────────
function Auth({mode, setPage, setIsLogged, setIsAdmin, setIsAgenceAdmin, onLogin}) {
  const login = mode==="login";
  const [email, setEmail] = useState("");
  const handle = () => {
    const e = email.toLowerCase();
    const admin = e.includes("admin")||e.includes("proprietaire");
    const agence = e.includes("agence")||e.includes("responsable");
    if(onLogin) { onLogin(admin, agence); }
    else { setIsAdmin(admin); setIsAgenceAdmin(agence); setIsLogged(true); setPage("dashboard"); }
  };
  return (
    <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:18,background:`linear-gradient(160deg,${T.bg} 60%,#EEF2FF 100%)`}}>
      <div className="card" style={{padding:32,width:"100%",maxWidth:380,animation:"fadeUp .5s ease",boxShadow:"0 12px 40px rgba(0,0,0,.1)"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{display:"flex",justifyContent:"center",marginBottom:14}}><Logo/></div>
          <h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:20,fontWeight:800,color:T.text}}>{login?"Content de vous revoir":"Créez votre compte"}</h1>
          <p style={{color:T.muted,marginTop:6,fontSize:12,lineHeight:1.6}}>{login?"Connectez-vous à votre dashboard.":"5 rapports gratuits. Sans carte bancaire."}</p>
          {!login && <div style={{marginTop:10,display:"flex",justifyContent:"center",gap:3}}>{[1,2,3,4,5].map(i=><div key={i} style={{width:8,height:8,borderRadius:"50%",background:T.blue}}/>)}</div>}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:12}}>
          {!login && <div><label>Nom complet</label><input placeholder="Marc Dupont"/></div>}
          <div><label>Email</label><input type="email" placeholder="marc@agence.fr" value={email} onChange={e=>setEmail(e.target.value)}/></div>
          <div>
            <label>Mot de passe</label>
            <input type="password" placeholder="••••••••"/>
            {login && <div style={{textAlign:"right",marginTop:5}}><span style={{fontSize:11,color:T.blue,cursor:"pointer",fontWeight:600}} onClick={()=>setPage("forgot")}>Mot de passe oublié ?</span></div>}
          </div>
          <button className="btn bp" style={{width:"100%",padding:"12px",fontSize:14,marginTop:4}} onClick={handle}>
            {login?"Se connecter →":"Créer mon compte →"}
          </button>
        </div>
        <div style={{textAlign:"center",marginTop:16,fontSize:12,color:T.muted}}>
          {login?"Pas encore de compte ? ":"Déjà un compte ? "}
          <span style={{color:T.blue,cursor:"pointer",fontWeight:600}} onClick={()=>setPage(login?"register":"login")}>{login?"Créer un compte":"Se connecter"}</span>
        </div>
        <div style={{textAlign:"center",marginTop:8}}>
          <span style={{color:T.muted,cursor:"pointer",fontSize:11}} onClick={()=>setPage("landing")}>← Retour au site</span>
        </div>
        {login && (
          <div style={{marginTop:12,padding:"9px 12px",background:T.blueSoft,border:`1px solid ${T.blue}22`,borderRadius:8,fontSize:11,color:T.muted}}>
            💡 Test : <strong style={{color:T.blue}}>admin@test.fr</strong> → Propriétaire · <strong style={{color:T.amber}}>agence@test.fr</strong> → Responsable agence
          </div>
        )}
      </div>
    </div>
  );
}

// ── SUPPORT CHAT ──────────────────────────────────────────────────────
const FAQ_DATA=[
  {q:"rapport|générer|dpe",r:"Allez dans **Nouveau rapport**, renseignez l'adresse, surface, année et chauffage. Rapport généré en 30 secondes avec les aides MaPrimeRénov'. 🏠"},
  {q:"prix|tarif|abonnement|combien",r:"• **Starter** : 35 € / rapport\n• **Pro** : 59 €/mois ou **600 €/an**\n• **Agence** : 219 €/mois ou **2 200 €/an**\n\n5 rapports gratuits sans carte. 💰"},
  {q:"maprimerenov|aide|état|subvention",r:"NovaDPE calcule automatiquement vos aides MaPrimeRénov' selon votre tranche de revenus. Exclusif — aucun autre outil DPE ne fait ça. Disponible dans le rapport PDF. 🏛️"},
  {q:"prédiction|5 ans|2030|futur",r:"Notre prédiction projette l'évolution de la classe DPE jusqu'en 2030. Vous savez en avance si votre bien sera interdit à la location. Exclusif NovaDPE. 🔮"},
  {q:"2028|loi climat|risque|interdit",r:"La loi Climat interdit progressivement la location des logements énergivores. En 2028, les biens classés G seront interdits. NovaDPE détecte ce risque automatiquement. ⚠️"},
  {q:"annuler|résil|remboursement",r:"Annulation à tout moment depuis Paramètres. Remboursement sous 7 jours sur demande à **support@novadpe.fr**. 🔄"},
  {q:"humain|personne|parler|équipe",r:"Notre équipe répond à **support@novadpe.fr** sous 24h. Clients Agence : votre manager répond sous 4h. 👋"},
];
function findFAQ(q){const lq=q.toLowerCase();for(const item of FAQ_DATA){if(item.q.split("|").some(p=>lq.includes(p)))return item.r;}return null;}
function FmtMsg({text}){return text.split("\n").map((l,i)=><div key={i} style={{marginBottom:l.startsWith("•")?3:0}} dangerouslySetInnerHTML={{__html:l.replace(/\*\*(.*?)\*\*/g,(_,m)=>`<strong style="color:${T.blue}">${m}</strong>`)}}/>);}

function SupportChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{role:"ai",text:"Bonjour ! 👋 Je suis l'assistant NovaDPE.\nComment puis-je vous aider ?",time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const [showSugg, setShowSugg] = useState(true);
  const bottomRef = useRef(null);
  const sugg = ["Quels sont les tarifs ?","MaPrimeRénov' automatique ?","Prédiction 5 ans ?","Annuler mon abonnement"];
  useEffect(()=>{if(open)setUnread(0);},[open]);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[msgs,loading]);
  const send = async(text) => {
    if(!text.trim()) return;
    const q=text.trim(); setInput(""); setShowSugg(false);
    const time=new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"});
    setMsgs(m=>[...m,{role:"user",text:q,time}]); setLoading(true);
    const local=findFAQ(q);
    if(local){
      setTimeout(()=>{setMsgs(m=>[...m,{role:"ai",text:local,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}]);setLoading(false);if(!open)setUnread(n=>n+1);},700);
    } else {
      try {
        const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:250,system:"Assistant support NovaDPE. Plans: Starter 35€/rapport, Pro 59€/mois ou 600€/an, Agence 219€/mois ou 2200€/an. Réponds en français, concis (max 2 phrases). Ne mentionne jamais Claude.",messages:[{role:"user",content:q}]})});
        const d=await res.json();
        setMsgs(m=>[...m,{role:"ai",text:d.content?.map(b=>b.text||"").join("")||"Écrivez à support@novadpe.fr 📧",time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}]);
      } catch {
        setMsgs(m=>[...m,{role:"ai",text:"Écrivez à **support@novadpe.fr** — réponse sous 24h. 📧",time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"})}]);
      }
      setLoading(false); if(!open)setUnread(n=>n+1);
    }
  };
  return (
    <>
      {open && (
        <div style={{position:"fixed",bottom:76,right:16,width:"min(340px,calc(100vw - 32px))",height:"min(480px,calc(100vh - 100px))",background:"white",border:`1px solid ${T.border}`,borderRadius:16,boxShadow:"0 20px 50px rgba(0,0,0,.15)",display:"flex",flexDirection:"column",overflow:"hidden",zIndex:9999,animation:"fadeUp .25s ease"}}>
          <div style={{background:`linear-gradient(135deg,${T.blue},${T.blueD})`,padding:"12px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
            <div style={{width:32,height:32,borderRadius:9,background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🤖</div>
            <div style={{flex:1}}><div style={{fontWeight:700,fontSize:13,color:"white"}}>Assistant NovaDPE</div><div style={{fontSize:10,color:"rgba(255,255,255,.7)",marginTop:1}}>● En ligne · Répond instantanément</div></div>
            <button onClick={()=>setOpen(false)} style={{width:24,height:24,borderRadius:7,border:"none",background:"rgba(255,255,255,.15)",color:"white",cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          <div style={{flex:1,overflow:"auto",padding:"12px 10px",display:"flex",flexDirection:"column",gap:10}}>
            {msgs.map((msg,i)=>(
              <div key={i} style={{display:"flex",flexDirection:"column",alignItems:msg.role==="user"?"flex-end":"flex-start"}}>
                {msg.role==="ai" && (
                  <div style={{display:"flex",alignItems:"flex-start",gap:6,maxWidth:"90%"}}>
                    <div style={{width:22,height:22,borderRadius:7,background:`linear-gradient(135deg,${T.blue},${T.blueD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0,marginTop:2}}>🤖</div>
                    <div><div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:"3px 12px 12px 12px",padding:"9px 12px",fontSize:12,lineHeight:1.7,color:T.text}}><FmtMsg text={msg.text}/></div><div style={{fontSize:9,color:T.muted,marginTop:2,marginLeft:3}}>{msg.time}</div></div>
                  </div>
                )}
                {msg.role==="user" && (
                  <div style={{maxWidth:"80%"}}><div style={{background:`linear-gradient(135deg,${T.blue},${T.blueD})`,borderRadius:"12px 3px 12px 12px",padding:"9px 12px",fontSize:12,lineHeight:1.6,color:"white",fontWeight:500}}>{msg.text}</div><div style={{fontSize:9,color:T.muted,marginTop:2,textAlign:"right"}}>{msg.time} ✓</div></div>
                )}
              </div>
            ))}
            {loading && <div style={{display:"flex",gap:6,alignItems:"flex-start"}}><div style={{width:22,height:22,borderRadius:7,background:`linear-gradient(135deg,${T.blue},${T.blueD})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,flexShrink:0}}>🤖</div><div style={{background:T.bg2,border:`1px solid ${T.border}`,borderRadius:"3px 12px 12px 12px",padding:"10px 14px",display:"flex",gap:4,alignItems:"center"}}>{[0,.2,.4].map((d,i)=><div key={i} style={{width:5,height:5,borderRadius:"50%",background:T.blue,animation:`pulse2 .9s ${d}s ease-in-out infinite`}}/>)}</div></div>}
            <div ref={bottomRef}/>
          </div>
          {showSugg && msgs.length<=1 && (
            <div style={{padding:"0 10px 8px",flexShrink:0}}>
              <div style={{fontSize:9,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginBottom:5}}>Questions fréquentes</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:5}}>{sugg.map((s,i)=><button key={i} onClick={()=>send(s)} style={{background:T.blueSoft,border:`1px solid ${T.blue}28`,borderRadius:100,padding:"4px 10px",fontSize:10,color:T.blue,cursor:"pointer",fontFamily:"inherit",fontWeight:600}}>{s}</button>)}</div>
            </div>
          )}
          <div style={{padding:"8px 10px",borderTop:`1px solid ${T.border}`,display:"flex",gap:7,alignItems:"center",flexShrink:0,background:T.bg2}}>
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();send(input);}}} placeholder="Posez votre question…" style={{flex:1,background:"white",fontSize:12,padding:"8px 12px"}} onFocus={e=>e.target.style.borderColor=T.blue} onBlur={e=>e.target.style.borderColor=T.border}/>
            <button onClick={()=>send(input)} disabled={!input.trim()||loading} style={{width:32,height:32,borderRadius:8,border:"none",background:input.trim()?T.blue:"#E5DDD0",color:input.trim()?"white":T.muted,cursor:input.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,transition:"all .2s",flexShrink:0}}>↑</button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(o=>!o)} style={{position:"fixed",bottom:20,right:16,width:50,height:50,borderRadius:"50%",background:open?"#F5F0E8":`linear-gradient(135deg,${T.blue},${T.blueD})`,border:open?`1px solid ${T.border}`:"none",boxShadow:open?"none":"0 6px 20px rgba(37,99,235,.35)",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:open?16:20,transition:"all .3s cubic-bezier(.34,1.56,.64,1)",zIndex:10000}}>
        {open?"✕":"💬"}
        {unread>0&&!open&&<div style={{position:"absolute",top:-2,right:-2,width:16,height:16,borderRadius:"50%",background:T.rose,color:"white",fontSize:9,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid white"}}>{unread}</div>}
      </button>
    </>
  );
}


// ── ONBOARDING ─────────────────────────────────────────────────────────
function Onboarding({onDone}) {
  const [step, setStep] = useState(0);
  const steps = [
    {icon:"📸", title:"Analysez par photo", desc:"Prenez une photo de votre bien — l'IA génère le rapport DPE en 30 secondes. Aucune saisie manuelle requise.", color:T.blue, action:"Essayer maintenant"},
    {icon:"🏛️", title:"Aides MaPrimeRénov' auto", desc:"Après chaque rapport, l'IA calcule automatiquement les aides de l'État auxquelles vous avez droit. Exclusif NovaDPE.", color:T.sage, action:"Voir comment ça marche"},
    {icon:"🔮", title:"Prédiction énergétique 5 ans", desc:"Projetez l'évolution de la classe DPE de vos biens jusqu'en 2030. Anticipez les interdictions de location avant vos concurrents.", color:T.amber, action:"Découvrir"},
    {icon:"⚖️", title:"Comparateur de biens", desc:"Comparez 2 biens côte à côte — coût des travaux, ROI, risque 2028. Conseillez vos clients avec des données concrètes.", color:T.blue, action:"Commencer"},
  ];
  const s = steps[step];
  const progress = ((step+1)/steps.length)*100;
  return (
    <div style={{position:"fixed",inset:0,zIndex:3000,background:"rgba(26,18,8,.7)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:16}}>
      <div style={{background:"white",borderRadius:24,padding:32,maxWidth:420,width:"100%",boxShadow:"0 32px 80px rgba(0,0,0,.2)",position:"relative",overflow:"hidden"}}>
        {/* Progress bar */}
        <div style={{position:"absolute",top:0,left:0,right:0,height:4,background:T.bg2}}>
          <div style={{height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${T.blue},${s.color})`,borderRadius:"0 4px 4px 0",transition:"width .4s ease"}}/>
        </div>
        {/* Skip */}
        <button onClick={onDone} style={{position:"absolute",top:16,right:16,background:"none",border:`1px solid ${T.border}`,borderRadius:100,padding:"4px 12px",cursor:"pointer",fontSize:11,color:T.muted,fontFamily:"inherit"}}>Passer</button>
        {/* Icon */}
        <div style={{width:72,height:72,borderRadius:20,background:s.color==="#2563EB"?"#EFF6FF":s.color==="#D97706"?"#FFFBEB":"#ECFDF5",display:"flex",alignItems:"center",justifyContent:"center",fontSize:32,marginBottom:20,boxShadow:`0 8px 24px ${s.color}22`}}>{s.icon}</div>
        {/* Step counter */}
        <div style={{fontSize:11,color:T.muted,fontWeight:600,textTransform:"uppercase",letterSpacing:".05em",marginBottom:8}}>{step+1} sur {steps.length}</div>
        <h2 style={{fontFamily:"'Outfit',sans-serif",fontSize:22,fontWeight:800,color:T.text,marginBottom:10,letterSpacing:"-.02em"}}>{s.title}</h2>
        <p style={{fontSize:14,color:T.muted,lineHeight:1.75,marginBottom:24}}>{s.desc}</p>
        {/* Dots */}
        <div style={{display:"flex",gap:6,marginBottom:24}}>
          {steps.map((_,i)=><div key={i} style={{height:4,flex:i===step?2:1,borderRadius:2,background:i===step?s.color:T.border,transition:"all .3s"}}/>)}
        </div>
        {/* Buttons */}
        <div style={{display:"flex",gap:10}}>
          {step > 0 && <button onClick={()=>setStep(s=>s-1)} className="btn bsec" style={{flex:1,padding:"11px"}}>← Précédent</button>}
          <button onClick={()=>step<steps.length-1?setStep(s=>s+1):onDone()} className="btn bp" style={{flex:2,padding:"11px",background:`linear-gradient(135deg,${T.blue},${s.color})`}}>
            {step<steps.length-1?`${s.action} →`:"Commencer NovaDPE 🚀"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── NOTIFICATIONS ──────────────────────────────────────────────────────
function NotifPanel({open, onClose, t2}) {
  const notifs = [
    {icon:"✅",title:"Rapport généré",desc:"12 rue des Lilas, Lyon — Classe C",time:"Il y a 2 min",color:T.sage,read:false},
    {icon:"⚠️",title:"Risque 2028 détecté",desc:"8 av. Victor Hugo — Classe E à risque",time:"Il y a 1h",color:T.amber,read:false},
    {icon:"🏛️",title:"Aide MaPrimeRénov'",desc:"3 450 € d'aide estimée pour votre dernier bien",time:"Il y a 3h",color:T.blue,read:true},
    {icon:"💡",title:"Nouveau : Comparateur",desc:"Comparez 2 biens côte à côte depuis votre dashboard",time:"Hier",color:T.blue,read:true},
    {icon:"📊",title:"Rapport mensuel",desc:"12 rapports générés en juin — +3 vs mai",time:"Il y a 2j",color:T.muted,read:true},
  ];
  if(!open) return null;
  return (
    <div style={{position:"fixed",inset:0,zIndex:2000}} onClick={onClose}>
      <div style={{position:"absolute",top:58,right:16,width:320,background:"white",borderRadius:16,boxShadow:"0 16px 48px rgba(0,0,0,.15),0 0 0 1px rgba(0,0,0,.06)",overflow:"hidden",animation:"slideR .2s ease"}} onClick={e=>e.stopPropagation()}>
        <div style={{padding:"14px 16px",borderBottom:`1px solid ${T.border}`,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:700,fontSize:14,color:T.text}}>Notifications</div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <span style={{fontSize:11,color:T.blue,cursor:"pointer",fontWeight:600}}>Tout lire</span>
            <button onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:T.muted,fontSize:16,padding:2}}>✕</button>
          </div>
        </div>
        <div style={{maxHeight:380,overflowY:"auto"}}>
          {notifs.map((n,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"12px 16px",borderBottom:i<notifs.length-1?`1px solid ${T.border}`:"none",background:n.read?"white":"#FAFEFF",cursor:"pointer",transition:"background .15s"}} onMouseEnter={e=>e.currentTarget.style.background=T.bg2} onMouseLeave={e=>e.currentTarget.style.background=n.read?"white":"#FAFEFF"}>
              <div style={{width:34,height:34,borderRadius:10,background:n.color==="#2563EB"?"#EFF6FF":n.color==="#D97706"?"#FFFBEB":n.color==="#059669"?"#ECFDF5":"#F5F0E8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>{n.icon}</div>
              <div style={{flex:1,minWidth:0}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:6}}>
                  <div style={{fontWeight:600,fontSize:12,color:T.text}}>{n.title}</div>
                  {!n.read && <div style={{width:7,height:7,borderRadius:"50%",background:T.blue,flexShrink:0,marginTop:2}}/>}
                </div>
                <div style={{fontSize:11,color:T.muted,marginTop:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{n.desc}</div>
                <div style={{fontSize:10,color:T.muted,marginTop:2,opacity:.7}}>{n.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{padding:"10px 16px",borderTop:`1px solid ${T.border}`,textAlign:"center"}}>
          <span style={{fontSize:12,color:T.blue,cursor:"pointer",fontWeight:600}}>Voir toutes les notifications →</span>
        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAgenceAdmin, setIsAgenceAdmin] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [unreadCount] = useState(2);

  const handleLogin = (admin, agence) => {
    setIsAdmin(admin);
    setIsAgenceAdmin(agence);
    setIsLogged(true);
    setShowOnboarding(true);
    setPage("dashboard");
  };

  return (
    <>
      <style>{CSS}</style>
      {showOnboarding && <Onboarding onDone={()=>setShowOnboarding(false)}/>}
      <NotifPanel open={showNotifs} onClose={()=>setShowNotifs(false)}/>
      {page==="dashboard"
        ? <Dashboard setPage={setPage} isAdmin={isAdmin} isAgenceAdmin={isAgenceAdmin} onNotif={()=>setShowNotifs(true)} unreadCount={unreadCount}/>
        : <>
            <Navbar setPage={setPage} isLogged={isLogged} setIsLogged={setIsLogged}/>
            {page==="landing"  && <Landing setPage={setPage}/>}
            {page==="login"    && <Auth mode="login"    setPage={setPage} setIsLogged={setIsLogged} setIsAdmin={setIsAdmin} setIsAgenceAdmin={setIsAgenceAdmin} onLogin={handleLogin}/>}
            {page==="register" && <Auth mode="register" setPage={setPage} setIsLogged={setIsLogged} setIsAdmin={setIsAdmin} setIsAgenceAdmin={setIsAgenceAdmin} onLogin={handleLogin}/>}
            {page==="forgot"   && (
              <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:18,background:T.bg}}>
                <div className="card" style={{padding:28,width:"100%",maxWidth:360}}>
                  <div style={{textAlign:"center",marginBottom:20}}><div style={{fontSize:36,marginBottom:10}}>🔐</div><h1 style={{fontFamily:"'Outfit',sans-serif",fontSize:19,fontWeight:800,color:T.text}}>Mot de passe oublié</h1><p style={{color:T.muted,marginTop:6,fontSize:12}}>Entrez votre email pour recevoir un lien.</p></div>
                  <div><label>Email</label><input type="email" placeholder="marc@agence.fr"/></div>
                  <button className="btn bp" style={{width:"100%",padding:"12px",marginTop:14}} onClick={()=>setPage("login")}>Envoyer le lien →</button>
                  <div style={{textAlign:"center",marginTop:12}}><span style={{color:T.blue,cursor:"pointer",fontSize:12,fontWeight:600}} onClick={()=>setPage("login")}>← Connexion</span></div>
                </div>
              </div>
            )}
          </>
      }
      <SupportChat/>
    </>
  );
}