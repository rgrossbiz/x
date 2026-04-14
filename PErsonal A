import React, { useState, useMemo } from "react";

const ALLOC=596;
const DAYS=["SUN","MON","TUE","WED","THU","FRI","SAT"];
const MO=["January","February","March","April","May","June","July","August","September","October","November","December"];
const HOURS=Array.from({length:25},(_,i)=>i);

const PAL={Chase:{bg:"#B2EBF2",bd:"#00838F"},Josh:{bg:"#C8E6C9",bd:"#2E7D32"},Wendy:{bg:"#FFCC80",bd:"#E65100"},EV:{bg:"#FFF59D",bd:"#F9A825"},Darrin:{bg:"#CE93D8",bd:"#7B1FA2"},Daniel:{bg:"#F48FB1",bd:"#C2185B"}};
const gc=p=>PAL[p]||{bg:"#A5D6A7",bd:"#2E7D32"};

const f12=h=>{const hh=h%24;if(hh===0||hh===24)return"12 AM";if(hh===12)return"12 PM";return hh>12?`${hh-12} PM`:`${hh} AM`;};
const f12s=h=>{const hh=h%24;if(hh===0||hh===24)return"12a";if(hh===12)return"12p";return hh>12?`${hh-12}p`:`${hh}a`;};

const ORIG=[
  {p:"Chase",d:0,s:0,e:5},{p:"Wendy",d:0,s:8,e:10},
  {p:"Josh",d:1,s:0,e:9},{p:"EV",d:1,s:9,e:19},{p:"Chase",d:1,s:19,e:24},
  {p:"Chase",d:2,s:0,e:2},{p:"Wendy",d:2,s:8,e:23},
  {p:"Josh",d:3,s:0,e:9},{p:"EV",d:3,s:9,e:19},{p:"Darrin",d:3,s:19,e:24},
  {p:"Darrin",d:4,s:0,e:2},{p:"Josh",d:4,s:2,e:10},{p:"EV",d:4,s:10,e:19},{p:"Chase",d:4,s:19,e:24},
  {p:"Chase",d:5,s:0,e:2},{p:"Josh",d:5,s:2,e:10},{p:"EV",d:5,s:10,e:21},{p:"Daniel",d:5,s:22,e:24},
  {p:"Daniel",d:6,s:0,e:6},{p:"Darrin",d:6,s:13,e:22},{p:"Chase",d:6,s:22,e:24},
];

function getOvernightPairs(sched){
  const pairs=[],used=new Set();
  sched.forEach((a,ai)=>{
    if(a.e===24){const nd=(a.d+1)%7;const bi=sched.findIndex((b,j)=>j!==ai&&b.p===a.p&&b.d===nd&&b.s===0&&!used.has(j));
    if(bi>=0){pairs.push({evIdx:ai,amIdx:bi,person:a.p,dayStart:a.d,startH:a.s,dayEnd:nd,endH:sched[bi].e,totalH:(24-a.s)+sched[bi].e});used.add(ai);used.add(bi);}}
  });
  return{pairs,usedIndices:used};
}

const dcounts=(y,m)=>{const c=[0,0,0,0,0,0,0],dim=new Date(y,m,0).getDate();for(let d=1;d<=dim;d++)c[new Date(y,m-1,d).getDay()]++;return{c,dim};};
function calc(sched,spare,year){
  const dh=[0,0,0,0,0,0,0],wbp={};
  sched.forEach(s=>{if(s.e>s.s){dh[s.d]+=s.e-s.s;wbp[s.p]=(wbp[s.p]||0)+s.e-s.s;}});
  const wt=dh.reduce((a,b)=>a+b,0),ms=[];
  for(let m=1;m<=12;m++){const{c,dim}=dcounts(year,m);const used=c.reduce((s,ct,i)=>s+ct*dh[i],0),left=ALLOC-used;const nW=c[0]+c[6],avail=Math.max(0,left-spare),maxD=nW>0?Math.floor(avail/nW):0,newT=maxD*nW;
  ms.push({m,nm:MO[m-1],dim,nSun:c[0],nSat:c[6],nW,used,left,avail,maxD,newT,grand:used+newT,sp:ALLOC-used-newT});}
  return{ms,wt,dh,wbp};
}

function HourSelect({value,onChange,isEnd}){
  const opts=isEnd?HOURS.filter(h=>h>=1):HOURS.filter(h=>h<=23);
  return <select value={value} onChange={onChange} style={IS}>{opts.map(h=><option key={h} value={h}>{f12(h)}</option>)}</select>;
}

const LS={fontSize:12,color:"#555",fontWeight:700,display:"block",marginBottom:4,letterSpacing:0.3};
const IS={padding:"9px 11px",borderRadius:8,border:"2px solid #D4D6DC",fontSize:15,fontWeight:600,fontFamily:"'DM Sans',sans-serif",background:"#FAFBFD",width:"100%"};
const TH={padding:"12px 8px",textAlign:"center",color:"#555",fontSize:12,fontWeight:800,letterSpacing:0.5,borderBottom:"3px solid #D4D6DC"};
const BTN=(bg,fg)=>({padding:"10px 20px",borderRadius:8,border:"none",background:bg,color:fg,fontWeight:800,fontSize:14,letterSpacing:0.3});

function Tag({bg,c,t}){return <span style={{fontSize:10,background:bg,color:c,padding:"2px 7px",borderRadius:4,fontWeight:800,letterSpacing:0.3}}>{t}</span>;}
function Bx({l,v,s,a}){return <div style={{background:"#fff",borderRadius:14,padding:"14px 18px",border:"2px solid #E4E6EC"}}><div style={{fontSize:11,color:"#888",fontWeight:700,letterSpacing:1.2}}>{l}</div><div style={{fontSize:28,fontWeight:800,color:a,fontFamily:"'DM Mono',monospace",margin:"4px 0"}}>{v}</div>{s&&<div style={{fontSize:12,color:"#AAA",fontWeight:600}}>{s}</div>}</div>;}

function renderWeeklyPNG(sched,wbp,wt){
  const W=1920,H=1080,cv=document.createElement("canvas");cv.width=W;cv.height=H;
  const x=cv.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,W,H);
  const TCOL=110,COLW=(W-TCOL-40)/7,HDR=70,TOP=80,RH=(H-TOP-HDR-60)/24;
  x.fillStyle="#1a1a2e";x.font="bold 32px sans-serif";x.fillText("PA Work Schedule",30,42);
  x.fillStyle="#888";x.font="bold 18px sans-serif";x.fillText(`${wt}h/wk  •  12-Hour Format`,30,66);
  x.fillStyle="#F0F1F5";x.fillRect(20,TOP,W-40,HDR-10);
  x.fillStyle="#888";x.font="bold 16px sans-serif";x.fillText("HOUR",35,TOP+42);
  DAYS.forEach((d,i)=>{x.fillStyle=(d==="SUN"||d==="SAT")?"#7B1FA2":"#1a1a2e";x.font="bold 18px sans-serif";x.textAlign="center";x.fillText(d,TCOL+20+i*COLW+COLW/2,TOP+44);x.textAlign="left";});
  const{pairs}=getOvernightPairs(sched);
  for(let h=0;h<24;h++){
    const y=TOP+HDR+h*RH;x.fillStyle=h%2===0?"#FAFBFD":"#fff";x.fillRect(20,y,W-40,RH);
    x.strokeStyle="#EAEAEE";x.lineWidth=0.5;x.beginPath();x.moveTo(20,y);x.lineTo(W-20,y);x.stroke();
    x.fillStyle="#888";x.font="bold 15px monospace";x.textAlign="right";x.fillText(f12(h),TCOL+10,y+RH/2+5);x.textAlign="left";
    for(let d=0;d<7;d++){
      const sh=sched.find(s=>s.d===d&&h>=s.s&&h<s.e);const cx=TCOL+20+d*COLW;
      if(sh){const c=gc(sh.p);x.fillStyle=c.bg+"99";x.fillRect(cx+2,y+1,COLW-4,RH-2);x.fillStyle=c.bd;x.fillRect(cx+2,y+1,5,RH-2);
        if(h===sh.s){const pair=pairs.find(pp=>(sched[pp.evIdx]===sh)||(sched[pp.amIdx]===sh));x.fillStyle=c.bd;x.font="bold 14px sans-serif";
          if(pair&&sched[pair.evIdx]===sh)x.fillText(`${sh.p} ${f12s(pair.startH)}-${f12s(pair.endH)} (${pair.totalH}h)`,cx+12,y+RH/2+5);
          else if(pair&&sched[pair.amIdx]===sh)x.fillText(`↳ cont'd`,cx+12,y+RH/2+5);
          else x.fillText(`${sh.p} ${f12s(sh.s)}-${f12s(sh.e)} (${sh.e-sh.s}h)`,cx+12,y+RH/2+5);}}
      else if(d===0||d===6){x.fillStyle="#F5EEFF";x.fillRect(cx+2,y+1,COLW-4,RH-2);}
    }
  }
  for(let d=0;d<=7;d++){const cx=TCOL+20+d*COLW;x.strokeStyle="#E4E6EC";x.lineWidth=0.5;x.beginPath();x.moveTo(cx,TOP);x.lineTo(cx,TOP+HDR+24*RH);x.stroke();}
  x.strokeStyle="#1a1a2e";x.lineWidth=2;x.strokeRect(20,TOP,W-40,HDR+24*RH);
  const ly=H-38;let lx=TCOL+20;
  Object.entries(wbp).sort((a,b)=>b[1]-a[1]).forEach(([p,hrs])=>{const c=gc(p);x.fillStyle=c.bg;x.fillRect(lx,ly-2,16,16);x.strokeStyle=c.bd;x.lineWidth=2;x.strokeRect(lx,ly-2,16,16);x.fillStyle="#1a1a2e";x.font="bold 16px sans-serif";const lb=`${p} ${hrs}h`;x.fillText(lb,lx+20,ly+11);lx+=x.measureText(lb).width+40;});
  x.fillStyle="#888";x.font="bold 16px sans-serif";x.textAlign="right";x.fillText(`Total: ${wt}h/wk`,W-30,ly+11);x.textAlign="left";
  return cv;
}

function renderCalPNG(sched,wbp,wt,calMonth,calYear,offDates,mData){
  const W=1920,H=1080,cv=document.createElement("canvas");cv.width=W;cv.height=H;
  const x=cv.getContext("2d");x.fillStyle="#fff";x.fillRect(0,0,W,H);
  const dim=new Date(calYear,calMonth,0).getDate(),firstDow=new Date(calYear,calMonth-1,1).getDay();
  const weeks=[];let week=new Array(firstDow).fill(null);
  for(let d=1;d<=dim;d++){week.push(d);if(week.length===7){weeks.push(week);week=[];}}
  if(week.length>0){while(week.length<7)week.push(null);weeks.push(week);}
  const PAD=30,HDR=55,TOP=90,CW=(W-PAD*2)/7,RH=Math.min(160,(H-TOP-HDR-PAD)/weeks.length);
  x.fillStyle="#1a1a2e";x.font="bold 34px sans-serif";x.fillText(`${MO[calMonth-1]} ${calYear} — PA Schedule`,PAD,40);
  x.fillStyle="#888";x.font="bold 18px sans-serif";x.fillText(`${mData.used}h used  /  ${ALLOC}h allocation  /  ${mData.left}h left  /  ${wt}h/wk`,PAD,68);
  x.fillStyle="#F0F1F5";x.fillRect(PAD,TOP,W-PAD*2,HDR);
  DAYS.forEach((d,i)=>{x.fillStyle=(d==="SUN"||d==="SAT")?"#7B1FA2":"#1a1a2e";x.font="bold 18px sans-serif";x.textAlign="center";x.fillText(d,PAD+i*CW+CW/2,TOP+36);x.textAlign="left";});
  const{pairs}=getOvernightPairs(sched);
  weeks.forEach((wk,wi)=>{const wy=TOP+HDR+wi*RH;wk.forEach((day,di)=>{const cx=PAD+di*CW;x.strokeStyle="#E4E6EC";x.lineWidth=0.5;x.strokeRect(cx,wy,CW,RH);if(!day)return;
    const dow=di,isOff=offDates[day];
    if(dow===0||dow===6){x.fillStyle="#FAFAFF";x.fillRect(cx+1,wy+1,CW-2,RH-2);}
    x.fillStyle=(dow===0||dow===6)?"#7B1FA2":"#1a1a2e";x.font="bold 18px sans-serif";x.fillText(String(day),cx+6,wy+22);
    const shifts=sched.filter(s=>s.d===dow);const dayHrs=shifts.reduce((s,sh)=>s+sh.e-sh.s,0);
    x.fillStyle="#BBB";x.font="bold 13px monospace";x.textAlign="right";x.fillText(`${dayHrs}h`,cx+CW-6,wy+20);x.textAlign="left";
    let sy=wy+30;shifts.forEach(s=>{if(sy>wy+RH-10)return;const c=gc(s.p);const bh=18;
      x.fillStyle=c.bg+"CC";x.fillRect(cx+3,sy,CW-6,bh);x.fillStyle=c.bd;x.fillRect(cx+3,sy,4,bh);x.fillStyle=c.bd;x.font="bold 12px sans-serif";
      const pair=pairs.find(pp=>(sched[pp.evIdx]===s)||(sched[pp.amIdx]===s));let txt;
      if(pair&&sched[pair.amIdx]===s)txt=`↳${s.p} to ${f12s(s.e)}`;else if(pair&&sched[pair.evIdx]===s)txt=`${s.p} ${f12s(pair.startH)}-${f12s(pair.endH)}`;else txt=`${s.p} ${f12s(s.s)}-${f12s(s.e)}`;
      // Off inline
      if(isOff&&isOff.name===s.p)txt+=` ❌ OFF`;
      x.fillText(txt,cx+10,sy+13);sy+=bh+2;});
    if(isOff&&!shifts.find(s=>s.p===isOff.name)){x.fillStyle="#C62828";x.font="bold 12px sans-serif";x.fillText(`❌ OFF: ${isOff.name}`,cx+6,sy+12);}
  });});
  return cv;
}

function dl(cv,fn){const a=document.createElement("a");a.download=fn;a.href=cv.toDataURL("image/png");a.click();}

export default function App(){
  const[tab,setTab]=useState("grid");
  const[spare,setSpare]=useState(2);
  const[year,setYear]=useState(2026);
  const[sched,setSched]=useState(ORIG.map(s=>({...s})));
  const[ei,setEi]=useState(null);
  const[ep,setEp]=useState("");const[ed,setEd]=useState(0);const[es,setEs]=useState(0);const[ee,setEe]=useState(0);
  const[np,setNp]=useState("New Hire");const[nd,setNd]=useState("0");const[ns,setNs]=useState("10");const[ne,setNe]=useState("18");
  const[calMonth,setCalMonth]=useState(new Date().getMonth()+1);const[calYear,setCalYear]=useState(2026);
  const[offList,setOffList]=useState([]);
  const[offName,setOffName]=useState("");const[offDate,setOffDate]=useState("");const[offNote,setOffNote]=useState("");
  // Hour Bank
  const[bankEntries,setBankEntries]=useState([]);
  const[bkName,setBkName]=useState("");const[bkHrs,setBkHrs]=useState("1");const[bkReason,setBkReason]=useState("");const[bkType,setBkType]=useState("add");

  const base=useMemo(()=>calc(ORIG,spare,year),[spare,year]);
  const live=useMemo(()=>calc(sched,spare,year),[sched,spare,year]);
  const changed=JSON.stringify(sched)!==JSON.stringify(ORIG);
  const pairs=useMemo(()=>getOvernightPairs(sched),[sched]);

  const openEdit=i=>{const s=sched[i];setEi(i);setEp(s.p);setEd(s.d);setEs(s.s);setEe(s.e);};
  const saveEdit=()=>{if(ei===null)return;const u={p:ep,d:+ed,s:+es,e:+ee};if(u.e<=u.s)return;const n=[...sched];n[ei]=u;setSched(n);setEi(null);};
  const del=i=>setSched(sched.filter((_,j)=>j!==i));
  const add=()=>{const s=+ns,e=+ne;if(e>s)setSched([...sched,{p:np||"New Hire",d:+nd,s,e}]);};
  const reset=()=>setSched(ORIG.map(s=>({...s})));
  const addOff=()=>{if(!offName||!offDate)return;setOffList([...offList,{name:offName,date:offDate,note:offNote}]);setOffNote("");setOffDate("");};
  const removeOff=i=>setOffList(offList.filter((_,j)=>j!==i));
  const addBank=()=>{if(!bkName||!bkHrs)return;setBankEntries([...bankEntries,{name:bkName,hrs:+(bkType==="add"?bkHrs:`-${bkHrs}`),reason:bkReason,date:new Date().toLocaleDateString(),type:bkType}]);setBkReason("");};
  const removeBank=i=>setBankEntries(bankEntries.filter((_,j)=>j!==i));

  // Bank totals per person
  const bankTotals=useMemo(()=>{const t={};bankEntries.forEach(e=>{t[e.name]=(t[e.name]||0)+e.hrs;});return t;},[bankEntries]);

  const doGridPNG=()=>{dl(renderWeeklyPNG(sched,live.wbp,live.wt),`PA_Weekly_${new Date().toISOString().slice(0,10)}.png`);};
  const doCalPNG=()=>{
    const offDates={};offList.forEach(o=>{const dt=new Date(o.date+"T12:00:00");if(dt.getMonth()+1===calMonth&&dt.getFullYear()===calYear)offDates[dt.getDate()]=o;});
    dl(renderCalPNG(sched,live.wbp,live.wt,calMonth,calYear,offDates,live.ms[calMonth-1]),`PA_${MO[calMonth-1]}_${calYear}.png`);
  };

  const ov=live.ms.filter(m=>m.left<0);const f8=live.ms.filter(m=>m.maxD>=8);
  const allPeople=[...new Set(sched.map(s=>s.p))];

  return(
    <div style={{fontFamily:"'DM Sans',sans-serif",background:"#F2F3F7",color:"#1a1a2e",minHeight:"100vh",padding:24}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0;}button{font-family:'DM Sans',sans-serif;cursor:pointer;}select{appearance:auto;font-family:'DM Sans',sans-serif;}`}</style>

      <div style={{marginBottom:22}}>
        <div style={{fontSize:12,fontFamily:"'DM Mono',monospace",color:"#C62828",letterSpacing:2.5,fontWeight:800}}>ILLINOIS PCA — {ALLOC} HRS/MONTH FIXED</div>
        <h1 style={{fontSize:30,fontWeight:800,margin:"4px 0",letterSpacing:-0.5}}>PA Schedule Maximizer</h1>
        <p style={{fontSize:14,color:"#777",fontWeight:600}}>12-hour format{changed?" — Modified Schedule":""}</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:12,marginBottom:20}}>
        <Bx l="WEEKLY" v={`${live.wt}h`} a="#1565C0"/>
        <Bx l="OVER BUDGET" v={ov.length} s={ov.map(m=>m.nm.slice(0,3)).join(", ")||"None"} a="#C62828"/>
        <Bx l="FIT 8h WKND" v={f8.length} s={f8.map(m=>m.nm.slice(0,3)).join(", ")||"None"} a="#2E7D32"/>
        <Bx l="ANNUAL NEW" v={`${live.ms.reduce((s,m)=>s+m.newT,0)}h`} a="#00695C"/>
        <Bx l="HOUR BANK" v={`${Object.values(bankTotals).reduce((a,b)=>a+b,0)}h`} s={`${bankEntries.length} entries`} a="#E65100"/>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:18,flexWrap:"wrap"}}>
        {[{id:"grid",l:"Weekly Grid"},{id:"calendar",l:"Monthly Calendar"},{id:"months",l:"Monthly Numbers"},{id:"shifts",l:"Edit Shifts"},{id:"staff",l:"Staff Hours"},{id:"off",l:"Days Off"},{id:"bank",l:"Hour Bank"}].map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"9px 20px",borderRadius:8,border:`2px solid ${tab===t.id?"#1565C0":"#D4D6DC"}`,background:tab===t.id?"#E3F2FD":"#fff",color:tab===t.id?"#1565C0":"#777",fontSize:14,fontWeight:700}}>{t.l}</button>
        ))}
        {changed&&<button onClick={reset} style={{marginLeft:"auto",...BTN("#fff","#C62828"),border:"2px solid #C62828"}}>Reset Original</button>}
      </div>

      {/* SPARE */}
      <div style={{display:"flex",gap:6,marginBottom:18,alignItems:"center"}}>
        <span style={{fontSize:13,fontWeight:700,color:"#888"}}>SPARE TARGET:</span>
        {[0,1,2,3,5].map(v=><button key={v} onClick={()=>setSpare(v)} style={{padding:"6px 14px",borderRadius:8,border:"none",fontSize:16,fontWeight:800,fontFamily:"'DM Mono',monospace",background:spare===v?"#1565C0":"#E8EAF0",color:spare===v?"#fff":"#999"}}>{v}h</button>)}
      </div>

      {/* ===== WEEKLY GRID ===== */}
      {tab==="grid"&&<div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <h2 style={{fontSize:22,fontWeight:800}}>Weekly Schedule — {live.wt}h/wk</h2>
          <button onClick={doGridPNG} style={BTN("#1565C0","#fff")}>📷 Download PNG 1920×1080</button>
        </div>
        <div style={{background:"#fff",borderRadius:14,border:"2px solid #E4E6EC",overflow:"hidden"}}>
          <div style={{display:"grid",gridTemplateColumns:"70px repeat(7,1fr)"}}>
            <div style={{background:"#ECEEF4",padding:10,textAlign:"center",color:"#777",fontWeight:800,fontSize:12}}>HOUR</div>
            {DAYS.map(d=><div key={d} style={{background:"#ECEEF4",padding:10,textAlign:"center",fontWeight:800,fontSize:14,color:d==="SUN"||d==="SAT"?"#7B1FA2":"#1a1a2e",borderLeft:"1px solid #E4E6EC"}}>{d}</div>)}
            {Array.from({length:24}).map((_,h)=><React.Fragment key={h}>
              <div style={{padding:"3px 8px",textAlign:"right",fontSize:13,color:"#888",fontWeight:700,fontFamily:"'DM Mono',monospace",background:h%2===0?"#FAFBFD":"#fff",borderTop:"1px solid #EEEEF2",display:"flex",alignItems:"center",justifyContent:"flex-end",minHeight:26}}>{f12(h)}</div>
              {Array.from({length:7}).map((_,d)=>{
                const sh=sched.find(s=>s.d===d&&h>=s.s&&h<s.e);const top=sh&&h===sh.s;const wk=d===0||d===6;const c=sh?gc(sh.p):null;
                let label=null;
                if(top&&sh){const pair=pairs.pairs.find(pp=>(sched[pp.evIdx]===sh)||(sched[pp.amIdx]===sh));
                  if(pair&&sched[pair.evIdx]===sh)label=`${sh.p} ${f12s(pair.startH)}–${f12s(pair.endH)}`;
                  else if(pair&&sched[pair.amIdx]===sh)label=`↳ cont'd`;
                  else label=sh.p;}
                return <div key={d} style={{borderLeft:"1px solid #EEEEF2",borderTop:"1px solid #EEEEF2",background:sh?c.bg+"55":wk?"#F8F2FF":h%2===0?"#FAFBFD":"#fff",position:"relative",minHeight:26,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {sh&&<div style={{position:"absolute",left:0,top:0,bottom:0,width:4,background:c.bd}}/>}
                  {top&&label&&<span style={{fontSize:11,fontWeight:800,color:c.bd,fontFamily:"'DM Mono',monospace"}}>{label}</span>}
                  {!sh&&wk&&<div style={{width:4,height:4,borderRadius:"50%",background:"#CE93D825"}}/>}
                </div>;
              })}
            </React.Fragment>)}
          </div>
        </div>
        <div style={{display:"flex",gap:16,marginTop:12,flexWrap:"wrap",padding:"12px 16px",background:"#fff",borderRadius:10,border:"2px solid #E4E6EC"}}>
          {Object.entries(live.wbp).sort((a,b)=>b[1]-a[1]).map(([p,h])=>{const c=gc(p);
            return <div key={p} style={{display:"flex",alignItems:"center",gap:7,fontSize:15,fontWeight:700}}>
              <div style={{width:14,height:14,borderRadius:4,background:c.bg,border:`2px solid ${c.bd}`}}/><b style={{color:c.bd}}>{p}</b><span style={{color:"#999"}}>{h}h</span>
            </div>;
          })}
        </div>
      </div>}

      {/* ===== MONTHLY CALENDAR ===== */}
      {tab==="calendar"&&<CalTab sched={sched} calMonth={calMonth} setCalMonth={setCalMonth} calYear={calYear} setCalYear={setCalYear} offList={offList} live={live} pairs={pairs} doCalPNG={doCalPNG} addOff={addOff} offName={offName} setOffName={setOffName} offDate={offDate} setOffDate={setOffDate} offNote={offNote} setOffNote={setOffNote} removeOff={removeOff}/>}

      {/* ===== MONTHLY NUMBERS ===== */}
      {tab==="months"&&<MonthsTab data={live} changed={changed} year={year} setYear={setYear}/>}

      {/* ===== EDIT SHIFTS ===== */}
      {tab==="shifts"&&<ShiftsTab sched={sched} np={np} setNp={setNp} nd={nd} setNd={setNd} ns={ns} setNs={setNs} ne={ne} setNe={setNe} add={add} openEdit={openEdit} del={del} changed={changed} base={base} live={live}/>}

      {/* ===== STAFF ===== */}
      {tab==="staff"&&<StaffTab wbp={live.wbp} wt={live.wt}/>}

      {/* ===== DAYS OFF ===== */}
      {tab==="off"&&<OffTab sched={sched} offList={offList} addOff={addOff} removeOff={removeOff} offName={offName} setOffName={setOffName} offDate={offDate} setOffDate={setOffDate} offNote={offNote} setOffNote={setOffNote}/>}

      {/* ===== HOUR BANK ===== */}
      {tab==="bank"&&<BankTab allPeople={allPeople} bankEntries={bankEntries} bankTotals={bankTotals} addBank={addBank} removeBank={removeBank} bkName={bkName} setBkName={setBkName} bkHrs={bkHrs} setBkHrs={setBkHrs} bkReason={bkReason} setBkReason={setBkReason} bkType={bkType} setBkType={setBkType}/>}

      {/* EDIT MODAL */}
      {ei!==null&&<div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:999}} onClick={()=>setEi(null)}>
        <div style={{background:"#fff",borderRadius:18,padding:30,width:460,maxWidth:"92vw",boxShadow:"0 24px 80px rgba(0,0,0,0.2)"}} onClick={e=>e.stopPropagation()}>
          <h3 style={{fontSize:22,fontWeight:800,marginBottom:20}}>Edit Shift</h3>
          <div style={{display:"grid",gap:14}}>
            <div><label style={LS}>PERSON</label><input value={ep} onChange={e=>setEp(e.target.value)} style={IS}/></div>
            <div><label style={LS}>DAY</label><select value={ed} onChange={e=>setEd(e.target.value)} style={IS}>{DAYS.map((d,i)=><option key={i} value={i}>{d}</option>)}</select></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
              <div><label style={LS}>START</label><HourSelect value={es} onChange={e=>setEs(e.target.value)} isEnd={false}/></div>
              <div><label style={LS}>END</label><HourSelect value={ee} onChange={e=>setEe(e.target.value)} isEnd={true}/></div>
            </div>
            <div style={{fontSize:18,fontFamily:"'DM Mono',monospace",color:"#1565C0",fontWeight:800,textAlign:"center",padding:14,background:"#E3F2FD",borderRadius:10}}>
              {Math.max(0,+ee - +es)}h — {DAYS[+ed]} {f12(+es)} to {f12(+ee)}
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={()=>setEi(null)} style={{flex:1,padding:14,borderRadius:10,border:"2px solid #D4D6DC",background:"#fff",color:"#888",fontWeight:800,fontSize:15}}>Cancel</button>
              <button onClick={saveEdit} style={{flex:1,...BTN("#1565C0","#fff"),padding:14,borderRadius:10,fontSize:15}}>Save</button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  );
}

/* ===== CALENDAR TAB ===== */
function CalTab({sched,calMonth,setCalMonth,calYear,setCalYear,offList,live,pairs,doCalPNG,addOff,offName,setOffName,offDate,setOffDate,offNote,setOffNote,removeOff}){
  const dim=new Date(calYear,calMonth,0).getDate(),firstDow=new Date(calYear,calMonth-1,1).getDay();
  const weeks=[];let week=new Array(firstDow).fill(null);
  for(let d=1;d<=dim;d++){week.push(d);if(week.length===7){weeks.push(week);week=[];}}
  if(week.length>0){while(week.length<7)week.push(null);weeks.push(week);}
  const offDates={};offList.forEach(o=>{const dt=new Date(o.date+"T12:00:00");if(dt.getMonth()+1===calMonth&&dt.getFullYear()===calYear)offDates[dt.getDate()]=o;});
  const mData=live.ms[calMonth-1];
  const prev=()=>{if(calMonth===1){setCalMonth(12);setCalYear(calYear-1);}else setCalMonth(calMonth-1);};
  const next=()=>{if(calMonth===12){setCalMonth(1);setCalYear(calYear+1);}else setCalMonth(calMonth+1);};

  return <div>
    <div style={{background:"#fff",borderRadius:14,padding:16,border:"2px solid #E4E6EC",marginBottom:14}}>
      <div style={{display:"flex",gap:8,alignItems:"end",flexWrap:"wrap"}}>
        <div style={{flex:"1 1 120px"}}><label style={LS}>PERSON</label><select value={offName} onChange={e=>setOffName(e.target.value)} style={IS}><option value="">Select...</option>{[...new Set(sched.map(s=>s.p))].map(p=><option key={p} value={p}>{p}</option>)}</select></div>
        <div style={{flex:"1 1 140px"}}><label style={LS}>DATE OFF</label><input type="date" value={offDate} onChange={e=>setOffDate(e.target.value)} style={IS}/></div>
        <div style={{flex:"2 1 180px"}}><label style={LS}>NOTE</label><input value={offNote} onChange={e=>setOffNote(e.target.value)} placeholder="Optional..." style={IS}/></div>
        <button onClick={addOff} style={{...BTN("#7B1FA2","#fff"),height:44}}>+ Day Off</button>
      </div>
    </div>

    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
      <div style={{display:"flex",alignItems:"center",gap:8}}>
        <button onClick={prev} style={{padding:"8px 16px",borderRadius:8,border:"2px solid #D4D6DC",background:"#fff",fontWeight:800,fontSize:20,color:"#1565C0"}}>◀</button>
        <select value={calMonth} onChange={e=>setCalMonth(+e.target.value)} style={{...IS,width:160,fontSize:18,fontWeight:800}}>{MO.map((m,i)=><option key={i} value={i+1}>{m}</option>)}</select>
        <select value={calYear} onChange={e=>setCalYear(+e.target.value)} style={{...IS,width:110,fontSize:18,fontWeight:800}}>{[2025,2026,2027,2028,2029,2030].map(y=><option key={y} value={y}>{y}</option>)}</select>
        <button onClick={next} style={{padding:"8px 16px",borderRadius:8,border:"2px solid #D4D6DC",background:"#fff",fontWeight:800,fontSize:20,color:"#1565C0"}}>▶</button>
      </div>
      <div style={{display:"flex",gap:12,alignItems:"center"}}>
        {mData&&<div style={{fontSize:16,fontWeight:700}}>
          <span style={{color:"#E65100"}}>{mData.used}h</span><span style={{color:"#999"}}> / </span>
          <span style={{color:mData.left>=0?"#2E7D32":"#C62828",fontWeight:800}}>{mData.left}h left</span>
        </div>}
        <button onClick={doCalPNG} style={BTN("#1565C0","#fff")}>📷 PNG 1920×1080</button>
      </div>
    </div>

    {Object.keys(offDates).length>0&&<div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
      {Object.entries(offDates).map(([day,o])=>{const c=gc(o.name);const idx=offList.findIndex(x=>x===o);
        return <div key={day} style={{display:"flex",alignItems:"center",gap:6,padding:"5px 12px",borderRadius:8,background:"#F5EEFF",border:"2px solid #E1BEE7",fontSize:13,fontWeight:700}}>
          <div style={{width:10,height:10,borderRadius:3,background:c.bg,border:`2px solid ${c.bd}`}}/>
          <b style={{color:"#4A148C"}}>{o.name}</b><span style={{color:"#888"}}>off {MO[calMonth-1]} {day}</span>
          <button onClick={()=>removeOff(idx)} style={{border:"none",background:"none",color:"#C62828",fontWeight:800,fontSize:16,padding:0,marginLeft:4}}>×</button>
        </div>;
      })}
    </div>}

    <div style={{background:"#fff",borderRadius:14,border:"2px solid #E4E6EC",overflow:"hidden"}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
        {DAYS.map(d=><div key={d} style={{padding:12,textAlign:"center",fontWeight:800,fontSize:15,color:d==="SUN"||d==="SAT"?"#7B1FA2":"#1a1a2e",background:"#ECEEF4",borderBottom:"2px solid #E4E6EC",borderRight:"1px solid #E4E6EC"}}>{d}</div>)}
      </div>
      {weeks.map((wk,wi)=><div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)"}}>
        {wk.map((day,di)=>{
          const dow=di,isOff=day&&offDates[day];
          const shifts=day?sched.filter(s=>s.d===dow):[];const dayHrs=shifts.reduce((s,sh)=>s+sh.e-sh.s,0);
          return <div key={di} style={{minHeight:110,padding:6,borderRight:"1px solid #E4E6EC",borderBottom:"1px solid #E4E6EC",background:!day?"#F8F8FA":(dow===0||dow===6)?"#FAFAFF":"#fff"}}>
            {day&&<>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
                <span style={{fontSize:16,fontWeight:800,color:(dow===0||dow===6)?"#7B1FA2":"#1a1a2e"}}>{day}</span>
                <span style={{fontSize:12,color:"#BBB",fontFamily:"'DM Mono',monospace",fontWeight:700}}>{dayHrs}h</span>
              </div>
              {shifts.map((s,si)=>{
                const c=gc(s.p);const pair=pairs.pairs.find(pp=>(sched[pp.evIdx]===s)||(sched[pp.amIdx]===s));
                let txt;if(pair&&sched[pair.amIdx]===s)txt=`↳${s.p} to ${f12s(s.e)}`;else if(pair&&sched[pair.evIdx]===s)txt=`${s.p} ${f12s(pair.startH)}–${f12s(pair.endH)}`;else txt=`${s.p} ${f12s(s.s)}–${f12s(s.e)}`;
                const personOff=isOff&&isOff.name===s.p;
                return <div key={si} style={{display:"flex",alignItems:"center",gap:4,padding:"3px 5px",borderRadius:5,background:personOff?c.bg+"44":c.bg+"77",marginBottom:3,borderLeft:`3px solid ${c.bd}`}}>
                  <span style={{fontSize:12,fontWeight:800,color:c.bd,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",flex:1}}>{txt}</span>
                  {personOff&&<span style={{fontSize:9,fontWeight:800,color:"#C62828",background:"#FFEBEE",padding:"1px 5px",borderRadius:3,whiteSpace:"nowrap"}}>OFF</span>}
                </div>;
              })}
              {isOff&&!shifts.find(s=>s.p===isOff.name)&&<div style={{fontSize:10,fontWeight:800,color:"#C62828",background:"#FFEBEE",padding:"2px 6px",borderRadius:4,marginTop:2}}>OFF: {isOff.name}</div>}
            </>}
          </div>;
        })}
      </div>)}
    </div>
  </div>;
}

/* ===== HOUR BANK ===== */
function BankTab({allPeople,bankEntries,bankTotals,addBank,removeBank,bkName,setBkName,bkHrs,setBkHrs,bkReason,setBkReason,bkType,setBkType}){
  return <div>
    <div style={{background:"#fff",borderRadius:14,padding:20,border:"2px solid #E4E6EC",marginBottom:14}}>
      <h3 style={{fontSize:18,fontWeight:800,color:"#E65100",marginBottom:6}}>Hour Bank — Manager Only</h3>
      <p style={{fontSize:14,color:"#888",fontWeight:600,marginBottom:14}}>Track hours when multiple people overlap and only one can clock in. Bank hours for people to catch up later.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr auto 0.7fr 2fr auto",gap:10,alignItems:"end"}}>
        <div><label style={LS}>PERSON</label><select value={bkName} onChange={e=>setBkName(e.target.value)} style={IS}><option value="">Select...</option>{allPeople.map(p=><option key={p} value={p}>{p}</option>)}</select></div>
        <div><label style={LS}>TYPE</label>
          <div style={{display:"flex",gap:4}}>
            <button onClick={()=>setBkType("add")} style={{padding:"8px 14px",borderRadius:8,border:`2px solid ${bkType==="add"?"#2E7D32":"#DDD"}`,background:bkType==="add"?"#E8F5E9":"#fff",color:bkType==="add"?"#2E7D32":"#999",fontWeight:800,fontSize:14}}>+ Add</button>
            <button onClick={()=>setBkType("use")} style={{padding:"8px 14px",borderRadius:8,border:`2px solid ${bkType==="use"?"#E65100":"#DDD"}`,background:bkType==="use"?"#FFF3E0":"#fff",color:bkType==="use"?"#E65100":"#999",fontWeight:800,fontSize:14}}>− Use</button>
          </div>
        </div>
        <div><label style={LS}>HOURS</label><select value={bkHrs} onChange={e=>setBkHrs(e.target.value)} style={IS}>{Array.from({length:24},(_,i)=>i+1).map(h=><option key={h} value={h}>{h}h</option>)}</select></div>
        <div><label style={LS}>REASON</label><input value={bkReason} onChange={e=>setBkReason(e.target.value)} placeholder="Overlap shift, catch-up, etc." style={IS}/></div>
        <button onClick={addBank} style={{...BTN(bkType==="add"?"#2E7D32":"#E65100","#fff"),height:44,whiteSpace:"nowrap"}}>{bkType==="add"?"+ Bank":"− Use"} {bkHrs}h</button>
      </div>
    </div>

    {/* Balances */}
    <div style={{background:"#fff",borderRadius:14,padding:20,border:"2px solid #E4E6EC",marginBottom:14}}>
      <h3 style={{fontSize:16,fontWeight:800,marginBottom:14}}>Hour Bank Balances</h3>
      {Object.keys(bankTotals).length===0?<p style={{color:"#999",fontSize:14,fontWeight:600}}>No banked hours yet. Add hours above when someone works an overlap shift.</p>:
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:12}}>
        {Object.entries(bankTotals).sort((a,b)=>b[1]-a[1]).map(([p,hrs])=>{const c=gc(p);
          return <div key={p} style={{padding:"14px 18px",borderRadius:12,background:hrs>0?"#E8F5E9":"#FFF3E0",border:`2px solid ${hrs>0?"#C8E6C9":"#FFE0B2"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
              <div style={{width:14,height:14,borderRadius:4,background:c.bg,border:`2px solid ${c.bd}`}}/>
              <span style={{fontSize:16,fontWeight:800,color:c.bd}}>{p}</span>
            </div>
            <div style={{fontSize:28,fontWeight:800,fontFamily:"'DM Mono',monospace",color:hrs>0?"#2E7D32":"#E65100"}}>{hrs>0?"+":""}{hrs}h</div>
            <div style={{fontSize:12,color:"#999",fontWeight:600}}>{hrs>0?"available to use":"owes hours"}</div>
          </div>;
        })}
      </div>}
    </div>

    {/* Transaction log */}
    {bankEntries.length>0&&<div style={{background:"#fff",borderRadius:14,padding:20,border:"2px solid #E4E6EC"}}>
      <h3 style={{fontSize:16,fontWeight:800,marginBottom:14}}>Transaction Log</h3>
      {bankEntries.map((e,i)=>{const c=gc(e.name);
        return <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"12px 14px",borderRadius:10,background:e.type==="add"?"#F0FFF0":"#FFF8F0",marginBottom:8,border:`1px solid ${e.type==="add"?"#C8E6C9":"#FFE0B2"}`}}>
          <div style={{width:12,height:12,borderRadius:3,background:c.bg,border:`2px solid ${c.bd}`}}/>
          <div style={{flex:1}}>
            <div style={{fontSize:15,fontWeight:800,color:e.type==="add"?"#2E7D32":"#E65100"}}>{e.type==="add"?"+":"−"}{Math.abs(e.hrs)}h — {e.name}</div>
            <div style={{fontSize:13,color:"#888",fontWeight:600}}>{e.reason||"No reason"} · {e.date}</div>
          </div>
          <button onClick={()=>removeBank(i)} style={{padding:"5px 12px",borderRadius:6,border:"2px solid #C62828",background:"#fff",color:"#C62828",fontWeight:800,fontSize:12}}>Remove</button>
        </div>;
      })}
    </div>}
  </div>;
}

/* ===== REMAINING TABS (condensed) ===== */
function ShiftsTab({sched,np,setNp,nd,setNd,ns,setNs,ne,setNe,add,openEdit,del,changed,base,live}){
  return <div>
    <div style={{background:"#fff",borderRadius:14,padding:18,border:"2px solid #E4E6EC",marginBottom:14}}>
      <h3 style={{fontSize:17,fontWeight:800,color:"#2E7D32",marginBottom:12}}>+ Add Shift</h3>
      <div style={{display:"grid",gridTemplateColumns:"1.5fr 1fr 1fr 1fr auto",gap:10,alignItems:"end"}}>
        <div><label style={LS}>NAME</label><input value={np} onChange={e=>setNp(e.target.value)} style={IS}/></div>
        <div><label style={LS}>DAY</label><select value={nd} onChange={e=>setNd(e.target.value)} style={IS}>{DAYS.map((d,i)=><option key={i} value={i}>{d}</option>)}</select></div>
        <div><label style={LS}>START</label><HourSelect value={ns} onChange={e=>setNs(e.target.value)} isEnd={false}/></div>
        <div><label style={LS}>END</label><HourSelect value={ne} onChange={e=>setNe(e.target.value)} isEnd={true}/></div>
        <button onClick={add} style={{...BTN("#2E7D32","#fff"),height:44}}>+ Add ({Math.max(0,+ne - +ns)}h)</button>
      </div>
    </div>
    <div style={{background:"#fff",borderRadius:14,padding:18,border:"2px solid #E4E6EC"}}>
      <h3 style={{fontSize:17,fontWeight:800,marginBottom:12}}>All Shifts</h3>
      <div style={{maxHeight:500,overflowY:"auto"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
          <thead><tr style={{background:"#F5F6FA",position:"sticky",top:0,zIndex:1}}>{["#","PERSON","DAY","START","END","HRS","",""].map((h,i)=><th key={i} style={TH}>{h}</th>)}</tr></thead>
          <tbody>{sched.map((s,i)=>{const c=gc(s.p);const orig=ORIG[i];const edited=!orig||s.p!==orig.p||s.d!==orig.d||s.s!==orig.s||s.e!==orig.e;const isNew=i>=ORIG.length;
            return <tr key={i} style={{borderBottom:"1px solid #F0F1F5",background:isNew?"#F0FFF0":edited?"#FFFDE7":"#fff"}}>
              <td style={{textAlign:"center",color:isNew?"#2E7D32":"#CCC",fontSize:12,padding:8,fontWeight:700}}>{isNew?"+":i+1}</td>
              <td style={{padding:"8px 10px"}}><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:12,height:12,borderRadius:4,background:c.bg,border:`2px solid ${c.bd}`,flexShrink:0}}/><span style={{fontWeight:800,color:c.bd,fontSize:15}}>{s.p}</span>{isNew&&<Tag bg="#E8F5E9" c="#2E7D32" t="NEW"/>}{edited&&!isNew&&<Tag bg="#FFF3E0" c="#E65100" t="EDITED"/>}</div></td>
              <td style={{textAlign:"center",fontWeight:700,fontSize:14,color:s.d===0||s.d===6?"#7B1FA2":"#1a1a2e"}}>{DAYS[s.d]}</td>
              <td style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:600}}>{f12(s.s)}</td>
              <td style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontSize:14,fontWeight:600}}>{f12(s.e)}</td>
              <td style={{textAlign:"center",fontWeight:800,fontFamily:"'DM Mono',monospace",fontSize:16}}>{s.e-s.s}h</td>
              <td style={{textAlign:"center",padding:4}}><button onClick={()=>openEdit(i)} style={{padding:"6px 14px",borderRadius:6,border:"2px solid #1565C0",background:"#E3F2FD",color:"#1565C0",fontWeight:800,fontSize:12}}>Edit</button></td>
              <td style={{textAlign:"center",padding:4}}><button onClick={()=>del(i)} style={{padding:"6px 12px",borderRadius:6,border:"2px solid #C62828",background:"#fff",color:"#C62828",fontWeight:800,fontSize:12}}>Delete</button></td>
            </tr>;
          })}</tbody>
        </table>
      </div>
    </div>
    {changed&&<CmpView base={base} live={live}/>}
  </div>;
}

function OffTab({sched,offList,addOff,removeOff,offName,setOffName,offDate,setOffDate,offNote,setOffNote}){
  return <div>
    <div style={{background:"#fff",borderRadius:14,padding:20,border:"2px solid #E4E6EC",marginBottom:14}}>
      <h3 style={{fontSize:17,fontWeight:800,color:"#7B1FA2",marginBottom:12}}>Add Day Off — Goes directly on calendar</h3>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 2fr auto",gap:10,alignItems:"end"}}>
        <div><label style={LS}>PERSON</label><select value={offName} onChange={e=>setOffName(e.target.value)} style={IS}><option value="">Select...</option>{[...new Set(sched.map(s=>s.p))].map(p=><option key={p} value={p}>{p}</option>)}</select></div>
        <div><label style={LS}>DATE</label><input type="date" value={offDate} onChange={e=>setOffDate(e.target.value)} style={IS}/></div>
        <div><label style={LS}>NOTE</label><input value={offNote} onChange={e=>setOffNote(e.target.value)} placeholder="Optional..." style={IS}/></div>
        <button onClick={addOff} style={{...BTN("#7B1FA2","#fff"),height:44}}>+ Add</button>
      </div>
    </div>
    {offList.length>0&&<div style={{background:"#fff",borderRadius:14,padding:20,border:"2px solid #E4E6EC"}}>
      <h3 style={{fontSize:17,fontWeight:800,marginBottom:12}}>Scheduled Days Off ({offList.length})</h3>
      {offList.map((o,i)=>{const c=gc(o.name);const dt=new Date(o.date+"T12:00:00");const dn=DAYS[dt.getDay()];
        const shifts=sched.filter(s=>s.p===o.name&&s.d===dt.getDay());const hrsOff=shifts.reduce((s,sh)=>s+sh.e-sh.s,0);
        return <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,background:"#F5EEFF",marginBottom:8,border:"2px solid #E1BEE7"}}>
          <div style={{width:14,height:14,borderRadius:4,background:c.bg,border:`2px solid ${c.bd}`}}/>
          <div style={{flex:1}}><div style={{fontSize:16,fontWeight:800,color:"#4A148C"}}>{o.name} — {dn} {o.date}</div><div style={{fontSize:13,color:"#888",fontWeight:600}}>{hrsOff}h off{o.note?` — ${o.note}`:""}</div></div>
          <button onClick={()=>removeOff(i)} style={{padding:"6px 14px",borderRadius:8,border:"2px solid #C62828",background:"#fff",color:"#C62828",fontWeight:800,fontSize:13}}>Remove</button>
        </div>;
      })}
    </div>}
  </div>;
}

function MonthsTab({data,changed,year,setYear}){
  return <div style={{background:"#fff",borderRadius:14,border:"2px solid #E4E6EC",overflow:"hidden"}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"14px 20px",borderBottom:"2px solid #E4E6EC"}}>
      <h3 style={{fontSize:18,fontWeight:800}}>{changed?"Modified ":""}Monthly Breakdown</h3>
      <div style={{display:"flex",alignItems:"center",gap:8}}><label style={{fontSize:13,color:"#888",fontWeight:700}}>YEAR</label><select value={year} onChange={e=>setYear(+e.target.value)} style={{...IS,width:100}}>{[2025,2026,2027,2028,2029,2030].map(y=><option key={y} value={y}>{y}</option>)}</select></div>
    </div>
    <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
      <thead><tr style={{background:"#F5F6FA"}}>{["MONTH","DAYS","SUN","SAT","STAFF HRS","LEFT","AVAIL","MAX/DAY","NEW HRS","TOTAL","SPARE"].map(h=><th key={h} style={TH}>{h}</th>)}</tr></thead>
      <tbody>{data.ms.map(m=>{const bg=m.left<0?"#FFF5F5":m.maxD>=8?"#F0FFF0":m.maxD>=4?"#FFFDE7":"#FFF8F0";
        return <tr key={m.m} style={{background:bg,borderBottom:"1px solid #F0F1F5"}}>
          <td style={{padding:"12px 16px",fontWeight:800,fontSize:16}}>{m.nm}</td>
          <td style={{textAlign:"center",color:"#888",fontWeight:600}}>{m.dim}</td>
          <td style={{textAlign:"center",color:"#7B1FA2",fontWeight:700}}>{m.nSun}</td>
          <td style={{textAlign:"center",color:"#7B1FA2",fontWeight:700}}>{m.nSat}</td>
          <td style={{textAlign:"center",fontFamily:"'DM Mono',monospace",color:"#E65100",fontWeight:700}}>{m.used}</td>
          <td style={{textAlign:"center",fontWeight:800,fontFamily:"'DM Mono',monospace",color:m.left>0?"#2E7D32":"#C62828",fontSize:16}}>{m.left}</td>
          <td style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontWeight:700,color:m.avail>0?"#2E7D32":"#C62828"}}>{m.avail}</td>
          <td style={{textAlign:"center",fontWeight:800,fontFamily:"'DM Mono',monospace",fontSize:18,color:m.maxD>=8?"#2E7D32":m.maxD>=4?"#F57F17":"#C62828"}}>{m.maxD}h</td>
          <td style={{textAlign:"center",fontWeight:800,fontFamily:"'DM Mono',monospace",color:"#00695C"}}>{m.newT}h</td>
          <td style={{textAlign:"center",fontWeight:800,fontFamily:"'DM Mono',monospace",color:m.grand<=ALLOC?"#2E7D32":"#C62828"}}>{m.grand}</td>
          <td style={{textAlign:"center",fontWeight:800,fontFamily:"'DM Mono',monospace",fontSize:16,color:m.sp>=0?"#2E7D32":"#C62828"}}>{m.sp}</td>
        </tr>;})}</tbody>
    </table></div>
    <div style={{padding:"12px 20px",borderTop:"2px solid #E4E6EC",display:"flex",gap:18,fontSize:13,color:"#888",fontWeight:700,flexWrap:"wrap"}}>
      <span><b style={{color:"#2E7D32"}}>Green</b> = 8h+</span><span><b style={{color:"#F57F17"}}>Yellow</b> = 4-7h</span><span><b style={{color:"#C62828"}}>Red</b> = over</span>
      <span style={{marginLeft:"auto",fontWeight:800,color:"#1a1a2e",fontSize:15}}>Annual: {data.ms.reduce((s,m)=>s+m.newT,0)}h</span>
    </div>
  </div>;
}

function StaffTab({wbp,wt}){
  const sorted=Object.entries(wbp).sort((a,b)=>b[1]-a[1]);const max=Math.max(...sorted.map(s=>s[1]));
  return <div style={{background:"#fff",borderRadius:14,padding:24,border:"2px solid #E4E6EC"}}>
    <h3 style={{fontSize:18,fontWeight:800,marginBottom:18}}>Staff Weekly Hours</h3>
    {sorted.map(([p,hrs])=>{const c=gc(p);return <div key={p} style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}><div style={{width:14,height:14,borderRadius:4,background:c.bg,border:`2px solid ${c.bd}`}}/><span style={{fontSize:17,fontWeight:800,color:c.bd}}>{p}</span></div>
        <span style={{fontFamily:"'DM Mono',monospace",fontSize:17,fontWeight:800}}>{hrs}h/wk</span>
      </div>
      <div style={{height:12,background:"#F0F1F5",borderRadius:6,overflow:"hidden"}}><div style={{width:`${(hrs/max)*100}%`,height:"100%",background:`linear-gradient(90deg,${c.bd},${c.bg})`,borderRadius:6}}/></div>
    </div>;})}
    <div style={{borderTop:"2px solid #E4E6EC",marginTop:18,paddingTop:16,display:"flex",justifyContent:"space-between"}}>
      <span style={{fontSize:16,fontWeight:800,color:"#999"}}>TOTAL</span>
      <span style={{fontSize:24,fontWeight:800,fontFamily:"'DM Mono',monospace"}}>{wt}h/wk</span>
    </div>
  </div>;
}

function CmpView({base,live}){
  const imp=live.ms.filter((m,i)=>m.maxD>base.ms[i].maxD);const wrs=live.ms.filter((m,i)=>m.maxD<base.ms[i].maxD);
  return <div style={{background:"#fff",borderRadius:14,padding:20,border:"2px solid #E4E6EC",marginTop:14}}>
    <h3 style={{fontSize:17,fontWeight:800,marginBottom:12}}>Original vs Modified</h3>
    <div style={{overflowX:"auto"}}><table style={{width:"100%",borderCollapse:"collapse",fontSize:14}}>
      <thead><tr style={{background:"#F5F6FA"}}>{["MONTH","ORIG","MAX/D","MOD","MAX/D",""].map((h,i)=><th key={i} style={TH}>{h}</th>)}</tr></thead>
      <tbody>{base.ms.map((bm,i)=>{const lm=live.ms[i];const b=lm.maxD>bm.maxD;const w=lm.maxD<bm.maxD;
        return <tr key={i} style={{borderBottom:"1px solid #F0F1F5",background:b?"#F0FFF0":w?"#FFF5F5":"#fff"}}>
          <td style={{padding:"10px 14px",fontWeight:800,fontSize:15}}>{bm.nm}</td>
          <td style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontWeight:700}}>{bm.used}h</td>
          <td style={{textAlign:"center",fontWeight:800,color:bm.maxD>=8?"#2E7D32":bm.maxD>=4?"#F57F17":"#C62828"}}>{bm.maxD}h</td>
          <td style={{textAlign:"center",fontFamily:"'DM Mono',monospace",fontWeight:800}}>{lm.used}h</td>
          <td style={{textAlign:"center",fontWeight:800,color:lm.maxD>=8?"#2E7D32":lm.maxD>=4?"#F57F17":"#C62828"}}>{lm.maxD}h</td>
          <td style={{textAlign:"center",fontWeight:800,fontSize:15,color:b?"#2E7D32":w?"#C62828":"#CCC"}}>{b?"▲":w?"▼":"—"}</td>
        </tr>;})}</tbody>
    </table></div>
    <div style={{marginTop:12,padding:12,borderRadius:8,background:imp.length>0?"#F0FFF0":"#FFF8F0",border:`2px solid ${imp.length>0?"#C8E6C9":"#FFE0B2"}`,fontSize:14,fontWeight:800,color:imp.length>0?"#2E7D32":"#F57F17"}}>
      {imp.length} improved{wrs.length>0?` · ${wrs.length} worsened`:""} · Weekly: {base.wt}h → {live.wt}h ({live.wt>base.wt?"+":""}{live.wt-base.wt}h)
    </div>
  </div>;
}
