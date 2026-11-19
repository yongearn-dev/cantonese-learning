(function(){
'use strict';
var host=document.getElementById('tm-host'); if(!host||!host.attachShadow)return;
var CSS_TEXT=":host{--bg:#F1F0E4;--surface:#ffffff;--surface2:#E7E6D6;--border:#D9D6C4;--text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;--accent:#0E6B57;--accent-bg:#E3EFE9;--yellow:#A9701C;--yellow-bg:#F8EDDA;--green:#1D8A5C;--green-bg:#E6F4EC;--red:#C1402A;--red-bg:#FAEAE4;--radius:12px;--shadow:0 1px 4px rgba(0,0,0,0.08);--serif:'Noto Serif TC',serif;\ndisplay:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%}\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:22px 0 10px;display:flex;align-items:center;gap:7px}\n.sec:first-child{margin-top:0}\n.lead{font-size:12px;color:var(--text-sub);font-family:'Noto Sans Thai','Noto Sans TC';margin:-4px 0 12px}\n/* 通用元件 */\n.card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:10px;box-shadow:var(--shadow)}\n.jy{font-family:'Space Mono',monospace;color:var(--accent);font-size:11px;margin-bottom:2px;word-break:break-word}\n.th{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub)}\n.hide-j .jy{display:none}.hide-th .th{display:none}\n.filter-bar{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:14px;padding-bottom:2px}\n.filter-bar::-webkit-scrollbar{display:none}\n.f-btn{flex-shrink:0;padding:5px 13px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;cursor:pointer;font-family:inherit;font-weight:500}\n.f-btn.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.tog-row{display:flex;gap:6px;margin-bottom:12px}\n.tog{padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;cursor:pointer;font-family:inherit;font-weight:500}\n.tog.on{background:var(--accent-bg);color:var(--accent);border-color:#9CC9BA;font-weight:700}\n.spk{flex-shrink:0;background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:3px 9px;cursor:pointer;font-size:11px;color:var(--text-sub);font-family:inherit}\n.spk:hover{border-color:var(--accent);color:var(--accent)}\n.tip{background:var(--yellow-bg);border:1px solid #E8D3A8;border-radius:10px;padding:9px 12px;font-size:12.5px;color:#7A5214;margin:10px 0}\n.tip b{color:var(--red)}\n.tip .th{color:#7A5214;font-size:12px}\n.big{font-family:var(--serif);font-weight:900}\n\n/* 一日時段 */\n.dayline{display:flex;height:46px;border-radius:12px;overflow:hidden;box-shadow:var(--shadow);border:1.5px solid var(--border)}\n.seg-b{display:flex;align-items:center;justify-content:center;font-size:17px;cursor:pointer;border:none;color:#fff;transition:filter .15s,transform .15s;padding:0}\n.seg-b:hover{filter:brightness(1.12)}\n.seg-b.sel{filter:brightness(1.15);box-shadow:inset 0 -4px 0 rgba(255,255,255,.85)}\n.ticks{display:flex;font-family:'Space Mono';font-size:10px;color:var(--text-muted);margin:4px 0 14px;position:relative;height:14px}\n.ticks span{position:absolute;transform:translateX(-50%)}\n.per-card{border-left:5px solid;display:flex;gap:12px;align-items:flex-start;cursor:pointer;transition:transform .12s}\n.per-card.sel{background:var(--accent-bg)}\n.per-main{flex:1;min-width:0}\n.per-c{font-family:var(--serif);font-size:24px;font-weight:900;line-height:1.2}\n.per-alt{font-size:12px;color:var(--text-sub);margin-top:2px}\n.per-hours{font-family:'Space Mono';font-size:11px;color:var(--text-muted);white-space:nowrap}\n.per-ex{margin-top:8px;padding-top:8px;border-top:1px dashed var(--border)}\n.per-ex .ex-c{font-size:17px;font-weight:700}\n\n/* 點鐘 */\n.hour-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.hr-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:8px 6px;text-align:center;box-shadow:var(--shadow);cursor:pointer}\n.hr-card:hover{border-color:var(--accent)}\n.hr-card svg{width:64px;height:64px}\n.hr-c{font-family:var(--serif);font-size:18px;font-weight:900}\n.hr-d{font-family:'Nunito';font-weight:900;color:var(--text-muted);font-size:12px}\n.hr-card.warn{border-color:var(--red)}\n\n/* 字 · 搭 表 */\n.ztable{width:100%;border-collapse:separate;border-spacing:0 6px;font-size:14px}\n.ztable th{font-size:11px;color:var(--text-muted);font-weight:500;text-align:left;padding:0 8px}\n.ztable td{background:var(--surface);padding:8px;border-top:1.5px solid var(--border);border-bottom:1.5px solid var(--border);vertical-align:middle}\n.ztable td:first-child{border-left:1.5px solid var(--border);border-radius:10px 0 0 10px}\n.ztable td:last-child{border-right:1.5px solid var(--border);border-radius:0 10px 10px 0}\n.ztable .mn{font-family:'Nunito';font-weight:900;font-size:18px;color:var(--accent);white-space:nowrap}\n.ztable .mn small{font-family:'Noto Sans TC';font-weight:500;font-size:11px;color:var(--text-muted)}\n.ztable .zc{font-size:16px;font-weight:700}\n.ztable .rare{opacity:.55}\n.ztable tr.special td{background:var(--yellow-bg)}\n.clk-wrap{display:flex;gap:14px;align-items:center;justify-content:center;flex-wrap:wrap}\n.clk-big svg{width:150px;height:150px;filter:drop-shadow(0 2px 8px rgba(0,0,0,.10))}\n.digital{font-family:'Nunito';font-weight:900;font-size:44px;color:var(--accent);line-height:1}\n.slider-row{display:flex;align-items:center;gap:10px;margin:10px 0}\n.slider-row label{font-size:12px;color:var(--text-sub);min-width:46px}\n.slider-row input[type=range]{flex:1;accent-color:var(--accent)}\n.slider-row .val{font-family:'Space Mono';font-size:12px;min-width:52px;text-align:right;color:var(--text)}\n.row-x{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px dashed var(--border)}\n.row-x:last-child{border-bottom:none}\n.chip{font-size:10px;font-weight:700;padding:2px 8px;border-radius:12px;white-space:nowrap;flex-shrink:0;min-width:54px;text-align:center}\n.chip.k1{background:var(--accent-bg);color:var(--accent)}\n.chip.k2{background:var(--yellow-bg);color:var(--yellow)}\n.chip.k3{background:var(--red-bg);color:var(--red)}\n.chip.k4{background:var(--green-bg);color:var(--green)}\n.row-x .mid{flex:1;min-width:0}\n.row-x .cc{font-size:17px;font-weight:700}\n\n/* 近似講法 + 句子 */\n.ex-card{display:flex;gap:10px;align-items:flex-start}\n.ex-card .mid{flex:1;min-width:0}\n.ex-c{font-size:18px;font-weight:700}\n.ex-note{font-size:12px;color:var(--text-sub);margin-top:3px}\n.tag{display:inline-block;font-size:10px;font-weight:700;padding:1px 8px;border-radius:10px;margin-bottom:4px}\n.sen-c{font-family:var(--serif);font-size:19px;font-weight:700;line-height:1.5}\n.sen-card{display:flex;gap:10px;align-items:flex-start}\n.sen-card .mid{flex:1;min-width:0}\n\n/* 小測 */\n.g-hdr{display:flex;justify-content:space-between;margin-bottom:12px}\n.score-pill{background:var(--yellow-bg);border:1.5px solid #E8D3A8;color:var(--yellow);padding:4px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:14px}\n.round-pill{background:var(--surface2);border:1.5px solid var(--border);padding:4px 14px;border-radius:20px;font-family:'Space Mono';font-size:13px;color:var(--text-sub)}\n.q-card{background:var(--surface);border:1.5px solid var(--border);border-radius:16px;padding:16px;text-align:center;box-shadow:var(--shadow);margin-bottom:12px}\n.q-prompt{font-size:13px;color:var(--text-sub);margin-bottom:8px}\n.q-main{font-family:var(--serif);font-size:26px;font-weight:900;line-height:1.35}\n.q-jy{font-family:'Space Mono';font-size:12px;color:var(--accent);margin-top:2px}\n.q-per{display:inline-block;background:var(--accent-bg);color:var(--accent);font-weight:700;border-radius:14px;padding:2px 12px;font-size:13px;margin-bottom:6px}\n.opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.opt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:11px 8px;cursor:pointer;color:var(--text);font-family:inherit;display:flex;flex-direction:column;align-items:center;gap:3px;box-shadow:var(--shadow);transition:border-color .15s,background .15s}\n.opt:hover{border-color:var(--accent);background:var(--accent-bg)}\n.opt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.opt.bad{border-color:var(--red)!important;background:var(--red-bg)!important}\n.opt.dim{opacity:.35;pointer-events:none}\n.opt .oj{font-family:'Space Mono';font-size:10.5px;color:var(--accent)}\n.opt .oc{font-size:16px;font-weight:700}\n.opt .od{font-family:'Nunito';font-weight:900;font-size:26px;color:var(--text)}\n.fb{padding:10px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid;margin-top:12px}\n.fb.ok{background:var(--green-bg);color:var(--green);border-color:#BFE3CF}\n.fb.err{background:var(--red-bg);color:var(--red);border-color:#EBC1B6}\n.result{position:relative;overflow:hidden;background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:30px 20px;text-align:center;box-shadow:var(--shadow);animation:rIn .4s ease}\n@keyframes rIn{0%{opacity:0;transform:translateY(8px) scale(.97)}100%{opacity:1;transform:none}}\n.result .re{font-size:50px}.result .rs{font-family:'Space Mono';font-size:34px;font-weight:700;color:var(--accent)}\n.retry{background:linear-gradient(135deg,var(--accent),var(--yellow));color:#fff;border:none;border-radius:10px;padding:10px 28px;font-weight:700;cursor:pointer;font-family:inherit;font-size:14px;margin-top:10px}\n.confetti{position:absolute;top:-10px;width:7px;height:12px;opacity:0;animation:cf 1.1s ease-in forwards}\n@keyframes cf{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(170px) rotate(300deg)}}\n\n@media (min-width:720px){.hour-grid{grid-template-columns:repeat(4,1fr)}.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px}.grid2 .card{margin-bottom:0}}\n@media (min-width:1100px){.hour-grid{grid-template-columns:repeat(6,1fr)}.sec{font-size:17px}}\n";
// ═════════ 資料 ═════════
let SR=host.attachShadow({mode:'open'});
SR.innerHTML='<style>'+CSS_TEXT+'</style><div id="view"></div>';
const $=id=>SR.getElementById(id);
const SP=[];                       // 語音文字登記（避免喺 onclick 入面逃脫引號）
function sp(t){SP.push(t);return SP.length-1;}
function spk(t){return '<button class="spk" data-a="speak" data-i="'+sp(t)+'">▶ 聽</button>';}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function pad2(n){return n<10?'0'+n:''+n;}

// 數字：點鐘／個字（2 讀「兩」）同 搭／分鐘（2 讀「二」）
const H=[null,['一','jat1'],['兩','loeng5'],['三','saam1'],['四','sei3'],['五','ng5'],['六','luk6'],['七','cat1'],['八','baat3'],['九','gau2'],['十','sap6'],['十一','sap6 jat1'],['十二','sap6 ji6']];
const D=H.map(x=>x?x.slice():x);D[2]=['二','ji6'];
const DIG=[['零','ling4'],['一','jat1'],['二','ji6'],['三','saam1'],['四','sei3'],['五','ng5'],['六','luk6'],['七','cat1'],['八','baat3'],['九','gau2']];
function numP(n){            // 0–59 → 粵語數字（用喺「分」）
  if(n<10)return DIG[n];
  const t=Math.floor(n/10),o=n%10;
  let c=(t>1?DIG[t][0]:'')+'十'+(o?DIG[o][0]:''),j=(t>1?DIG[t][1]+' ':'')+'sap6'+(o?' '+DIG[o][1]:'');
  return [c,j];
}
function hourP(h){return {c:H[h][0]+'點',j:H[h][1]+' dim2'};}
function ziP(h,m){          // 點 + 字
  const b=hourP(h);
  if(m===0)return {c:b.c+'正',j:b.j+' zeng3'};
  if(m===30)return {c:b.c+'半',j:b.j+' bun3'};
  const z=H[m/5];return {c:b.c+z[0]+'個字',j:b.j+' '+z[1]+' go3 zi6'};
}
function daP(h,m){          // 搭
  const b=hourP(h),d=D[m/5];return {c:b.c+'搭'+d[0],j:b.j+' daap3 '+d[1]};
}
function minP(h,m){         // 分鐘版：九點零五分／九點十五分
  const b=hourP(h),n=numP(m);
  const lead=m<10?'零'+n[0]:n[0],jl=m<10?'ling4 '+n[1]:n[1];
  return {c:b.c+lead+'分',j:b.j+' '+jl+' fan1'};
}
const nextH=h=>h%12+1, prevH=h=>(h+10)%12+1;
const h12of=h24=>h24%12||12;

const PERIODS=[
 {id:'ling',c:'凌晨',j:'ling4 san4',alt:'半夜 bun3 je6（12 點後深夜）',from:0,to:5,col:'#55607A',em:'🌙',
  th:'หลังเที่ยงคืน–ก่อนรุ่งสาง (ตี 1–ตี 5)',exH:3,exTh:'ตีสาม'},
 {id:'zou',c:'朝早',j:'ziu1 zou2',alt:'朝頭早 ziu1 tau4 zou2 · 早上 zou2 soeng6',from:5,to:9,col:'#C9902F',em:'🌅',
  th:'เช้า (6–8 โมงเช้า)',exH:7,exTh:'เจ็ดโมงเช้า'},
 {id:'soeng',c:'上晝',j:'soeng6 zau3',alt:'上午 · 十一點前後都叫上晝',from:9,to:12,col:'#1D8A5C',em:'☀️',
  th:'สาย / ก่อนเที่ยง (9–11 โมง)',exH:10,exTh:'สิบโมง'},
 {id:'zung',c:'中午',j:'zung1 ng5',alt:'晏晝 aan3 zau3（食晏 sik6 aan3 = 食午飯）',from:12,to:14,col:'#C1402A',em:'🍱',
  th:'เที่ยง–บ่ายต้นๆ',exH:12,exTh:'เที่ยง'},
 {id:'haa',c:'下晝',j:'haa6 zau3',alt:'下午',from:14,to:18,col:'#A9701C',em:'🌤️',
  th:'บ่าย (บ่ายสอง–บ่ายห้า)',exH:15,exTh:'บ่ายสามโมง'},
 {id:'wong',c:'黃昏',j:'wong4 fan1',alt:'日落前後，好短',from:18,to:19,col:'#8A4B3B',em:'🌇',
  th:'เย็น / พลบค่ำ (หกโมงเย็น)',exH:18,exTh:'หกโมงเย็น'},
 {id:'je',c:'夜晚',j:'je6 maan5',alt:'晚黑 maan5 hak1（口語）· 晚上',from:19,to:24,col:'#2B3A55',em:'🌃',
  th:'ค่ำ–กลางคืน (1–5 ทุ่ม)',exH:20,exTh:'สองทุ่ม'}
];
function perOf(h24){return PERIODS.find(p=>h24>=p.from&&h24<p.to);}
function perPrefix(h24){return h24===0?{c:'半夜',j:'bun3 je6'}:{c:perOf(h24).c,j:perOf(h24).j};}
const THN=['','หนึ่ง','สอง','สาม','สี่','ห้า','หก','เจ็ด','แปด','เก้า','สิบ','สิบเอ็ด','สิบสอง'];
function thaiHour(h){
  if(h===0)return 'เที่ยงคืน';if(h<=5)return 'ตี'+THN[h];if(h<=11)return THN[h]+'โมงเช้า';
  if(h===12)return 'เที่ยง';if(h===13)return 'บ่ายโมง';if(h<=15)return 'บ่าย'+THN[h-12]+'โมง';
  if(h<=18)return THN[h-12]+'โมงเย็น';return THN[h-18]+'ทุ่ม';
}
function thaiTime(h,m){return thaiHour(h)+(m===0?'':m===30?'ครึ่ง':' '+m+' นาที');}

// 近似講法
const EXPR=[
 {g:'around',c:'九點左右',j:'gau2 dim2 zo2 jau6',th:'ประมาณเก้าโมง',note:'前後都得，唔係好準'},
 {g:'around',c:'大概九點',j:'daai6 koi3 gau2 dim2',th:'ราวๆ เก้าโมง',note:'同「左右」差唔多，放喺時間前面'},
 {g:'around',c:'九點半左右',j:'gau2 dim2 bun3 zo2 jau6',th:'ประมาณเก้าโมงครึ่ง',note:''},
 {g:'after',c:'九點幾',j:'gau2 dim2 gei2',th:'เก้าโมงกว่าๆ',note:'已經過咗九點，但唔記得／唔講幾多分'},
 {g:'after',c:'九點零啲',j:'gau2 dim2 ling4 di1',th:'เก้าโมงนิดหน่อย',note:'剛剛過咗少少'},
 {g:'after',c:'過咗九點',j:'gwo3 zo2 gau2 dim2',th:'เลยเก้าโมงมาแล้ว',note:'「咗」表示已經過咗'},
 {g:'before',c:'差唔多九點',j:'caa1 m4 do1 gau2 dim2',th:'เกือบเก้าโมงแล้ว',note:'未到九點，快到'},
 {g:'before',c:'就嚟九點喇',j:'zau6 lai4 gau2 dim2 laa3',th:'จะเก้าโมงอยู่แล้ว',note:'「就嚟」= 就快要，未到'},
 {g:'before',c:'仲有五分鐘',j:'zung6 jau5 ng5 fan1 zung1',th:'เหลืออีกห้านาที',note:'「仲有」= 還有（未到嘅時間）'},
 {g:'before',c:'仲有一個字',j:'zung6 jau5 jat1 go3 zi6',th:'เหลืออีกหนึ่ง「字」(5 นาที)',note:'一個字 = 五分鐘'},
 {g:'before',c:'仲有一個字就九點',j:'zung6 jau5 jat1 go3 zi6 zau6 gau2 dim2',th:'อีกห้านาทีจะเก้าโมง',note:'即係而家 8:55'},
 {g:'before',c:'差一個字九點',j:'caa1 jat1 go3 zi6 gau2 dim2',th:'เก้าโมงขาดห้านาที (8:55)',note:'「差」+ 數量 + 整點'},
 {g:'exact',c:'九點正',j:'gau2 dim2 zeng3',th:'เก้าโมงตรง',note:'一個字都唔多，成點'},
 {g:'exact',c:'啱啱九點',j:'ngaam1 ngaam1 gau2 dim2',th:'เพิ่งเก้าโมงพอดี',note:'剛剛到九點'},
 {g:'exact',c:'準時九點',j:'zeon2 si4 gau2 dim2',th:'เก้าโมงตรงเวลา',note:'唔早唔遲'},
 {g:'late',c:'仲早',j:'zung6 zou2',th:'ยังเช้า / ยังเร็วอยู่',note:'例：仲早喎，先七點。'},
 {g:'late',c:'好夜喇',j:'hou2 je6 laa3',th:'ดึกมากแล้ว',note:'夜 = 遲（晚）'},
 {g:'late',c:'遲到',j:'ci4 dou3',th:'มาสาย',note:'反義：早到 zou2 dou3'},
 {g:'late',c:'遲咗五分鐘',j:'ci4 zo2 ng5 fan1 zung1',th:'สายไปห้านาที',note:'= 遲咗一個字'},
 {g:'late',c:'早咗一個字',j:'zou2 zo2 jat1 go3 zi6',th:'เร็วไปห้านาที / มาก่อนห้านาที',note:''},
 {g:'long',c:'一個鐘',j:'jat1 go3 zung1',th:'หนึ่งชั่วโมง',note:'「鐘」= 時間長度；幾點用「點」'},
 {g:'long',c:'半個鐘',j:'bun3 go3 zung1',th:'ครึ่งชั่วโมง',note:'30 分鐘'},
 {g:'long',c:'一個半鐘',j:'jat1 go3 bun3 zung1',th:'หนึ่งชั่วโมงครึ่ง',note:'1.5 小時'},
 {g:'long',c:'一刻鐘',j:'jat1 hak1 zung1',th:'สิบห้านาที',note:'「一刻」= 15 分鐘；三點一刻 = 3:15'},
 {g:'long',c:'等陣 / 一陣',j:'dang2 zan6 / jat1 zan6',th:'เดี๋ยว / สักครู่',note:'陣間 zan6 gaan1 = 一陣之後'}
];
const EGROUP=[['all','全部'],['around','🎯 大概'],['before','⏳ 快到'],['after','⌛ 剛過'],['exact','✅ 準確'],['late','🏃 早／遲'],['long','⏱ 長度']];
const EG_LABEL={around:['大概','#2B3A55'],before:['未到','#C1402A'],after:['過咗','#A9701C'],exact:['準確','#1D8A5C'],late:['早／遲','#8A4B3B'],long:['長度','#0E6B57']};

// 句子
const SENS=[
 {g:'basic',c:'而家朝早七點。',j:'ji4 gaa1 ziu1 zou2 cat1 dim2.',th:'ตอนนี้เจ็ดโมงเช้า'},
 {g:'basic',c:'你幾點返工？我八點半返工。',j:'nei5 gei2 dim2 faan1 gung1? ngo5 baat3 dim2 bun3 faan1 gung1.',th:'คุณเข้างานกี่โมง? ฉันเข้างานแปดโมงครึ่ง'},
 {g:'basic',c:'我哋夜晚九點三個字出發。',j:'ngo5 dei6 je6 maan5 gau2 dim2 saam1 go3 zi6 ceot1 faat3.',th:'พวกเราออกเดินทางสามทุ่มสิบห้านาที'},
 {g:'basic',c:'下晝三點開會。',j:'haa6 zau3 saam1 dim2 hoi1 wui2.',th:'ประชุมบ่ายสามโมง'},
 {g:'basic',c:'過咗十二點喇，食晏啦。',j:'gwo3 zo2 sap6 ji6 dim2 laa3, sik6 aan3 laa1.',th:'เลยเที่ยงแล้ว ไปกินข้าวกลางวันกันเถอะ'},
 {g:'care',c:'婆婆朝早七點三個字起身。',j:'po4 po2 ziu1 zou2 cat1 dim2 saam1 go3 zi6 hei2 san1.',th:'คุณยายตื่นเจ็ดโมงเช้าสิบห้านาที'},
 {g:'care',c:'婆婆，下晝三點要食藥。',j:'po4 po2, haa6 zau3 saam1 dim2 jiu3 sik6 joek6.',th:'คุณยาย บ่ายสามโมงต้องกินยานะ'},
 {g:'care',c:'婆婆夜晚九點瞓覺。',j:'po4 po2 je6 maan5 gau2 dim2 fan3 gaau3.',th:'คุณยายนอนสามทุ่ม'},
 {g:'care',c:'婆婆凌晨三點起身去洗手間。',j:'po4 po2 ling4 san4 saam1 dim2 hei2 san1 heoi3 sai2 sau2 gaan1.',th:'คุณยายตื่นไปห้องน้ำตอนตีสาม'},
 {g:'care',c:'九點左右食早餐。',j:'gau2 dim2 zo2 jau6 sik6 zou2 caan1.',th:'กินอาหารเช้าประมาณเก้าโมง'},
 {g:'near',c:'差唔多九點喇，快啲啦！',j:'caa1 m4 do1 gau2 dim2 laa3, faai3 di1 laa1!',th:'เกือบเก้าโมงแล้ว เร็วเข้า!'},
 {g:'near',c:'就嚟九點喇。仲有五分鐘。',j:'zau6 lai4 gau2 dim2 laa3. zung6 jau5 ng5 fan1 zung1.',th:'จะเก้าโมงแล้ว เหลืออีกห้านาที'},
 {g:'near',c:'仲有一個字就九點。',j:'zung6 jau5 jat1 go3 zi6 zau6 gau2 dim2.',th:'อีกห้านาทีจะเก้าโมง'},
 {g:'near',c:'而家八點五十五分，即係差一個字九點。',j:'ji4 gaa1 baat3 dim2 ng5 sap6 ng5 fan1, zik1 hai6 caa1 jat1 go3 zi6 gau2 dim2.',th:'ตอนนี้แปดโมงห้าสิบห้านาที คือเก้าโมงขาดห้านาที'},
 {g:'near',c:'而家一點搭二，即係一點十分。',j:'ji4 gaa1 jat1 dim2 daap3 ji6, zik1 hai6 jat1 dim2 sap6 fan1.',th:'ตอนนี้บ่ายโมงสิบนาที (นาฬิกาชี้เลข 2)'},
 {g:'near',c:'啱啱十一點半，仲有半個鐘就食晏。',j:'ngaam1 ngaam1 sap6 jat1 dim2 bun3, zung6 jau5 bun3 go3 zung1 zau6 sik6 aan3.',th:'เพิ่งสิบเอ็ดโมงครึ่ง อีกครึ่งชั่วโมงถึงเวลาข้าวกลางวัน'},
 {g:'late',c:'你遲咗兩個字。',j:'nei5 ci4 zo2 loeng5 go3 zi6.',th:'คุณมาสายไปสิบนาที'},
 {g:'late',c:'仲早喎，先七點鐘。',j:'zung6 zou2 wo3, sin1 cat1 dim2 zung1.',th:'ยังเช้าอยู่นะ เพิ่งเจ็ดโมงเอง'},
 {g:'late',c:'好夜喇，快啲瞓啦。',j:'hou2 je6 laa3, faai3 di1 fan3 laa1.',th:'ดึกมากแล้ว รีบนอนเถอะ'},
 {g:'late',c:'半個鐘之後出發，等陣先。',j:'bun3 go3 zung1 zi1 hau6 ceot1 faat3, dang2 zan6 sin1.',th:'อีกครึ่งชั่วโมงค่อยออกเดินทาง รอเดี๋ยวก่อน'},
 {g:'late',c:'我等咗一個半鐘。',j:'ngo5 dang2 zo2 jat1 go3 bun3 zung1.',th:'ฉันรอมาหนึ่งชั่วโมงครึ่งแล้ว'}
];
const SGROUP=[['all','全部'],['basic','📌 基本'],['care','👵 照顧'],['near','⏳ 快到／搭'],['late','🏃 早遲／長度']];

// ═════════ 狀態 ═════════
const T={tab:'per',per:null,ws:{h24:7,m:15},eg:'all',sg:'all',showJ:true,showTh:true};
const TABS=[['dian','🧠 點·鐘·時間'],['per','🌅 一日時段'],['hour','🕘 點鐘'],['zi','🔢 字·搭'],['near','📍 近似講法'],['sen','💬 句子'],['dur','⏳ 時長'],['date','📅 日期星期'],['nan','👵 婆婆日程'],['dq','🎯 點/鐘小測'],['quiz','📝 小測'],['game','🎮 時間遊戲']];

// ═════════ 時鐘 SVG ═════════
function clockSVG(h,m,sz){
  const ha=((h%12)+m/60)*30,ma=m*6;
  const hand=(a,len,w,c)=>{const r=(a-90)*Math.PI/180;return '<line x1="50" y1="50" x2="'+(50+len*Math.cos(r)).toFixed(1)+'" y2="'+(50+len*Math.sin(r)).toFixed(1)+'" stroke="'+c+'" stroke-width="'+w+'" stroke-linecap="round"/>';};
  let t='',nums='';
  for(let i=0;i<12;i++){
    const a=(i*30-90)*Math.PI/180;
    t+='<line x1="'+(50+42*Math.cos(a)).toFixed(1)+'" y1="'+(50+42*Math.sin(a)).toFixed(1)+'" x2="'+(50+37*Math.cos(a)).toFixed(1)+'" y2="'+(50+37*Math.sin(a)).toFixed(1)+'" stroke="#9ca3a0" stroke-width="2"/>';
    if(sz==='big'){const n=i===0?12:i;nums+='<text x="'+(50+30*Math.cos(a)).toFixed(1)+'" y="'+(50+30*Math.sin(a)+3.2).toFixed(1)+'" font-size="9" text-anchor="middle" font-family="Nunito" font-weight="900" fill="#666B5C">'+n+'</text>';}
  }
  return '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="#fff" stroke="#e2e0d8" stroke-width="2"/>'+t+nums+hand(ha,sz==='big'?20:22,4.5,'#22261F')+hand(ma,sz==='big'?32:33,3,'#0E6B57')+'<circle cx="50" cy="50" r="3.2" fill="#0E6B57"/></svg>';
}

// ═════════ 各頁 ═════════
function viewPer(){
  const sel=T.per;
  let bar='<div class="dayline">'+PERIODS.map((p,i)=>'<button class="seg-b'+(sel===p.id?' sel':'')+'" style="flex:'+(p.to-p.from)+';background:'+p.col+'" data-a="per" data-id="'+p.id+'" title="'+p.c+'">'+p.em+'</button>').join('')+'</div>';
  const tk=[0,5,9,12,14,18,19,24].map(x=>'<span style="left:'+(x/24*100)+'%">'+x+'</span>').join('');
  bar+='<div class="ticks">'+tk+'</div>';
  const cards=PERIODS.map(p=>{
    const exC=perPrefix(p.exH).c+hourP(h12of(p.exH)).c, exJ=perPrefix(p.exH).j+' '+hourP(h12of(p.exH)).j;
    return '<div class="card per-card'+(sel===p.id?' sel':'')+'" style="border-left-color:'+p.col+'" data-a="per" data-id="'+p.id+'">'
      +'<div class="per-main"><div class="jy">'+p.j+'</div><div class="per-c">'+p.em+' '+p.c+'</div><div class="per-alt">'+p.alt+'</div><div class="th">'+p.th+'</div>'
      +'<div class="per-ex"><div class="jy">'+exJ+'</div><div class="ex-c">'+exC+' <span class="th">= '+p.exTh+'</span> '+spk(exC)+'</div></div></div>'
      +'<div class="per-hours">'+pad2(p.from)+':00<br>–'+pad2(p.to===24?0:p.to)+':00</div></div>';
  }).join('');
  return '<div class="sec">🌅 一日嘅時段</div><p class="lead">ช่วงเวลาในหนึ่งวัน — กดที่แถบสีหรือการ์ดเพื่อดู</p>'+bar+cards
   +'<div class="tip"><b>注意：</b>廣東話用「時段 + 幾點」，唔使講 24 小時制。下晝三點 = 15:00，夜晚八點 = 20:00。<div class="th">ใช้「ช่วงเวลา + กี่โมง」ไม่ต้องพูดแบบ 24 ชั่วโมง เช่น 下晝三點 = บ่ายสามโมง</div></div>'
   +'<div class="tip"><b>早晨</b>（zou2 san4）係問候語「早安」，唔係「早上」嘅時段；講時間要用「朝早」。<div class="th">早晨 คือคำทักทาย "อรุณสวัสดิ์" ไม่ใช่ช่วงเวลา</div></div>'
   +'<div class="tip">各時段嘅界線係大約，每個人習慣唔同（例如「晏晝」有人指 12–14 點，有人指成個下午）。<div class="th">ช่วงเวลาเป็นค่าประมาณ แต่ละคนอาจใช้ต่างกันเล็กน้อย</div></div>';
}
function viewHour(){
  const cards=[1,2,3,4,5,6,7,8,9,10,11,12].map(h=>{
    const p=hourP(h);
    return '<div class="hr-card'+(h===2?' warn':'')+'" data-a="speak" data-i="'+sp(p.c)+'">'+clockSVG(h,0)+'<div class="hr-d">'+pad2(h)+':00</div><div class="jy">'+p.j+'</div><div class="hr-c">'+p.c+'</div></div>';
  }).join('');
  return '<div class="sec">🕘 一點至十二點</div><p class="lead">กดที่การ์ดเพื่อฟังเสียง · 1–12 โมง</p><div class="hour-grid">'+cards+'</div>'
   +'<div class="tip"><b>兩點，唔係「二點」！</b>點鐘同「個字」嘅 2 都讀「兩」(loeng5)。<div class="th">เลข 2 ในเวลาอ่านว่า 兩 (loeng5) ไม่ใช่ 二</div></div>'
   +'<div class="sec">⌚ 「點」同「鐘」唔同</div>'
   +'<div class="grid2"><div class="card"><div class="jy">saam1 dim2</div><div class="ex-c">三點</div><div class="th">สามโมง (เวลา)</div>'+spk('三點')+'</div>'
   +'<div class="card"><div class="jy">saam1 go3 zung1</div><div class="ex-c">三個鐘</div><div class="th">สามชั่วโมง (ระยะเวลา)</div>'+spk('三個鐘')+'</div></div>'
   +'<div class="tip">講「幾點」（時間點）用「點」；講「幾耐」（時間長度）用「個鐘」。「點鐘」都得：<b>三點鐘</b> = 三點。<div class="th">เวลาตรงจุดใช้ 點 ส่วนระยะเวลาใช้ 個鐘</div></div>'
   +'<div class="sec">❓ 問時間</div>'
   +[['而家幾點？','ji4 gaa1 gei2 dim2?','ตอนนี้กี่โมง?'],['幾點鐘返工？','gei2 dim2 zung1 faan1 gung1?','เข้างานกี่โมง?'],['幾時食藥？','gei2 si4 sik6 joek6?','กินยาเมื่อไหร่?']].map(q=>'<div class="card ex-card"><div class="mid"><div class="jy">'+q[1]+'</div><div class="ex-c">'+q[0]+'</div><div class="th">'+q[2]+'</div></div>'+spk(q[0])+'</div>').join('');
}
function viewZi(){
  const rows=[];
  for(let n=0;n<=11;n++){
    const m=n*5,h=9;
    const z=ziP(h,m);
    let da=null;
    if(n>=1&&n<=5)da=daP(h,m);
    if(n>=7)da=daP(h,m);
    const rare=n>=7;
    const special=m===0||m===30;
    let zc=z.c,zj=z.j;
    if(m===0){zc='九點正';zj='gau2 dim2 zeng3';}
    rows.push('<tr class="'+(special?'special':'')+'"><td class="mn">'+m+'<small> 分</small></td><td><div class="jy">'+z.j+'</div><div class="zc">'+z.c+'</div></td><td class="'+(rare?'rare':'')+'">'+(da?'<div class="jy">'+da.j+'</div><div class="zc">'+da.c+'</div>':'<span class="th">—</span>')+'</td><td>'+spk(z.c)+'</td></tr>');
  }
  const ws=wsHTML();
  return '<div class="sec">🔢 「字」同「搭」</div><p class="lead">1 個字 = 5 นาที · 看เข็มนาทีชี้เลขอะไร</p>'
   +'<div class="tip">鐘面上每個數字相隔 5 分鐘，所以<b>一個字 = 5 分鐘</b>。「搭」= 分針「疊住」個數字：<b>一點搭二</b> = 1:10（分針疊住個 2 字）。<div class="th">เข็มนาทีทับเลขไหน ก็บอกเลขนั้น: 一點搭二 = 1:10</div></div>'
   +'<table class="ztable"><tr><th>分鐘</th><th>點 + 個字</th><th>搭</th><th></th></tr>'+rows.join('')+'</table>'
   +'<div class="tip"><b>兩個字</b>（loeng5）但 <b>搭二</b>（ji6）——「個字」前面讀「兩」，「搭」後面讀「二」。<div class="th">兩個字 ใช้ 兩 แต่ 搭二 ใช้ 二</div></div>'
   +'<div class="tip">「搭」多數用喺過咗正點之後（淡色嘅 35 分以後較少聽到）；過咗半點之後更常用「差」。<div class="th">搭 มักใช้หลังชั่วโมงตรง ส่วนช่วงหลังครึ่งชั่วโมงนิยมใช้ 差 (ขาดอีก…)</div></div>'
   +'<div class="sec">🎛 時間工作坊</div><p class="lead">เลื่อนเวลา แล้วดูวิธีพูดทุกแบบ</p>'+ws;
}
function wsHTML(){
  return '<div class="card"><div class="clk-wrap"><div class="clk-big" id="wsClock"></div><div style="text-align:center"><div class="digital" id="wsDig"></div><div class="q-per" id="wsPer" style="margin-top:8px"></div><div class="th" id="wsTh"></div></div></div>'
   +'<div class="slider-row"><label>鐘點</label><input type="range" id="sH" min="0" max="23" step="1" value="'+T.ws.h24+'"><span class="val" id="vH"></span></div>'
   +'<div class="slider-row"><label>分鐘</label><input type="range" id="sM" min="0" max="55" step="5" value="'+T.ws.m+'"><span class="val" id="vM"></span></div></div>'
   +'<div class="card" id="wsOut"></div>';
}
function wsUpdate(){
  const h24=T.ws.h24,m=T.ws.m,h=h12of(h24),pre=perPrefix(h24);
  $('wsClock').innerHTML=clockSVG(h,m,'big');
  $('wsDig').textContent=pad2(h24)+':'+pad2(m);
  $('wsPer').textContent=pre.c+' '+pre.j;
  $('wsTh').textContent=thaiTime(h24,m);
  $('vH').textContent=pre.c+h+'點';$('vM').textContent=m+' 分';
  const rows=[];const add=(k,chip,c,j,th)=>rows.push('<div class="row-x"><span class="chip k'+k+'">'+chip+'</span><div class="mid"><div class="jy">'+pre.j+' '+j+'</div><div class="cc">'+pre.c+c+'</div>'+(th?'<div class="th">'+th+'</div>':'')+'</div>'+spk(pre.c+c)+'</div>');
  const z=ziP(h,m);
  add(1,m===0?'正點':m===30?'半':'字',z.c,z.j,'');
  if(m>0&&m!==30){const mp=minP(h,m);add(2,'分鐘',mp.c,mp.j,'');}
  if(m>=5&&m<=25){const d=daP(h,m);add(2,'搭',d.c,d.j,'分針疊住 '+(m/5)+' 字');}
  if(m===15||m===45){const b=hourP(h);add(2,'一刻',b.c+(m===15?'一刻':'三刻'),b.j+(m===15?' jat1 hak1':' saam1 hak1'),'一刻 = 15 分鐘');}
  const nh=hourP(nextH(h));
  if(m>=45){const n=(60-m)/5;
    add(3,'差','差'+H[n][0]+'個字'+nh.c,'caa1 '+H[n][1]+' go3 zi6 '+nh.j,'');
    add(3,'仲有','仲有'+H[n][0]+'個字就'+nh.c,'zung6 jau5 '+H[n][1]+' go3 zi6 zau6 '+nh.j,'還有 '+(60-m)+' 分鐘到下一點');}
  if(m>=50)add(3,'就嚟','就嚟'+nh.c+'喇','zau6 lai4 '+nh.j+' laa3','快要到下一點');
  if(m===0){add(4,'準確','啱啱'+hourP(h).c,'ngaam1 ngaam1 '+hourP(h).j,'');add(4,'準時','準時'+hourP(h).c,'zeon2 si4 '+hourP(h).j,'');}
  if(m===5||m===10)add(4,'剛過',hourP(h).c+'零啲',hourP(h).j+' ling4 di1','剛剛過咗少少');
  if(m>=5&&m<=15)add(4,'過咗','過咗'+hourP(h).c,'gwo3 zo2 '+hourP(h).j,'已經過咗');
  if(m>=25&&m<=35)add(1,'大概',hourP(h).c+'半左右',hourP(h).j+' bun3 zo2 jau6','');
  $('wsOut').innerHTML=rows.join('');
}
function viewNear(){
  const bar='<div class="filter-bar">'+EGROUP.map(g=>'<button class="f-btn'+(T.eg===g[0]?' act':'')+'" data-a="eg" data-id="'+g[0]+'">'+g[1]+'</button>').join('')+'</div>';
  const list=EXPR.filter(e=>T.eg==='all'||e.g===T.eg).map(e=>{
    const L=EG_LABEL[e.g];
    return '<div class="card ex-card"><div class="mid"><span class="tag" style="background:'+L[1]+'1F;color:'+L[1]+'">'+L[0]+'</span><div class="jy">'+e.j+'</div><div class="ex-c">'+e.c+'</div><div class="th">'+e.th+'</div>'+(e.note?'<div class="ex-note">'+e.note+'</div>':'')+'</div>'+spk(e.c.split(' / ')[0])+'</div>';
  }).join('');
  return '<div class="sec">📍 九點左右・差唔多九點・就嚟九點</div><p class="lead">คำบอกเวลาโดยประมาณ — เกือบ / เลย / พอดี</p>'+bar
   +'<div class="grid2">'+list+'</div>'
   +'<div class="tip"><b>三組好易撈亂：</b><br>• <b>差唔多九點</b>＝未到（快到）<br>• <b>九點幾</b>＝過咗（8:xx 唔係）<br>• <b>九點左右</b>＝前後都得<div class="th">เกือบเก้าโมง = ยังไม่ถึง · เก้าโมงกว่า = เลยแล้ว · ราวเก้าโมง = ก่อนหรือหลังก็ได้</div></div>';
}
function viewSen(){
  const bar='<div class="filter-bar">'+SGROUP.map(g=>'<button class="f-btn'+(T.sg===g[0]?' act':'')+'" data-a="sg" data-id="'+g[0]+'">'+g[1]+'</button>').join('')+'</div>';
  const list=SENS.filter(s=>T.sg==='all'||s.g===T.sg).map(s=>'<div class="card sen-card"><div class="mid"><div class="jy">'+s.j+'</div><div class="sen-c">'+s.c+'</div><div class="th">'+s.th+'</div></div>'+spk(s.c)+'</div>').join('');
  return '<div class="sec">💬 例句</div><p class="lead">ประโยคตัวอย่าง</p>'+bar+'<div>'+list+'</div>';
}

// ═════════ 擴充：點·鐘·時間／時長／日期星期／婆婆日程／點鐘專項小測 ═════════
// 呢段會插入「時間」模組（Shadow DOM IIFE）入面、「小測」之前，可以直接用模組嘅 $、sp、spk、shuffle、pad2、H、D、DIG、numP、hourP、ziP、h12of、perPrefix、thaiTime、THN、clockSVG、T、SR、render、alive。
const XCSS2=`
.cc ruby,.xbig ruby{margin:0 1px}
.rn{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px}
.xrres{background:var(--accent-bg);border-radius:12px;padding:10px 12px;margin-top:6px}
.xrres .cc{font-size:22px;font-weight:900;font-family:var(--serif)}
.xtoday{background:var(--accent-bg);border-radius:10px;padding-left:6px;padding-right:6px}
`;
const XCSS=`
.lead{margin-top:-4px}
.xg{display:grid;grid-template-columns:1fr;gap:10px;margin-bottom:12px}
.xc{text-align:center}
.xbig{font-family:var(--serif);font-size:40px;font-weight:900;line-height:1.2}
.xrole{font-weight:700;font-size:13px;margin-top:4px}
.xq{display:inline-block;margin:8px 0;background:var(--accent-bg);color:var(--accent);border-radius:14px;padding:2px 12px;font-size:13px;font-weight:700}
.xex{border-top:1px dashed var(--border);padding-top:8px;margin-top:4px;text-align:left}
.xex .cc{font-size:18px;font-weight:700}
.xline{position:relative;height:104px;margin:14px 20px 4px}
.xbar{position:absolute;left:0;right:0;top:41px;height:6px;border-radius:3px;background:var(--surface2)}
.xseg{position:absolute;top:41px;height:6px;border-radius:3px;background:var(--red)}
.xtk{position:absolute;top:35px;transform:translateX(-50%);text-align:center}
.xtk i{display:block;width:16px;height:16px;border-radius:50%;background:#fff;border:2px solid var(--border);margin:0 auto}
.xtk.on i{background:var(--accent);border-color:var(--accent);transform:scale(1.35)}
.xtk span{display:block;font-family:'Nunito';font-weight:900;font-size:12px;color:var(--text-muted);margin-top:4px}
.xtk.on span{color:var(--accent);font-size:14px}
.xpt{position:absolute;top:6px;transform:translateX(-50%);font-size:13px;font-weight:700;color:var(--accent);white-space:nowrap;background:var(--accent-bg);border-radius:10px;padding:1px 8px}
.xseglab{position:absolute;top:80px;transform:translateX(-50%);font-family:var(--serif);font-weight:900;color:var(--red);font-size:15px;white-space:nowrap;background:var(--red-bg);border-radius:10px;padding:1px 10px}
.xer{padding:10px 0;border-top:1px dashed var(--border)}
.xer:first-child{border-top:none;padding-top:0}
.xno{color:var(--red);text-decoration:line-through;font-size:16px}
.xyes{font-size:18px;font-weight:700;color:var(--green)}
.xwhy{font-size:12px;color:var(--text-sub);margin-top:2px}
.xgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:12px}
.xcell{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:8px 6px;text-align:center;box-shadow:var(--shadow)}
.xcell .cc{font-family:var(--serif);font-size:18px;font-weight:900}
.xev{display:flex;gap:10px;align-items:center}
.xev svg{width:56px;height:56px;flex-shrink:0}
.xev .cc{font-size:17px;font-weight:700}
.xin{border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;font-size:16px;font-family:inherit;background:var(--surface);color:var(--text);margin-bottom:10px}
.xclk{padding:8px}
.xclk svg{width:88px;height:88px}
.xblank{display:inline-block;min-width:56px;border-bottom:3px dashed var(--yellow)}
.fillx{color:var(--green)}
.xoc{display:flex;gap:10px;align-items:center;width:100%;text-align:left;background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:10px 12px;margin-bottom:8px;cursor:pointer;font-family:inherit;color:var(--text);box-shadow:var(--shadow)}
.xoc:hover{border-color:var(--accent)}
.xoc.done{background:var(--green-bg);border-color:var(--green);cursor:default}
.xnum{flex-shrink:0;width:26px;height:26px;border-radius:50%;background:var(--accent);color:#fff;font-weight:700;display:flex;align-items:center;justify-content:center;font-size:13px}
@media (min-width:720px){.xg{grid-template-columns:repeat(3,1fr)}.xgrid{grid-template-columns:repeat(4,1fr)}}
`;
SR.querySelector('style').textContent+=XCSS+XCSS2;
T.tab='dian';   // 入「時間」頁預設見到新分頁

/* ── 共用 ── */
function xrow(c,j,t,say){return '<div class="row-x"><div class="mid"><div class="jy">'+j+'</div><div class="cc">'+c+'</div><div class="th">'+t+'</div></div>'+spk(say||c)+'</div>';}
function xsec(t,th){return '<div class="sec">'+t+'</div>'+(th?'<p class="lead">'+th+'</p>':'');}
function xaward(n){   // 逐題計入主 App ★（唔寫得分紀錄）
  try{
    var prev=S.totalScore;S.totalScore+=n;
    var chip=document.getElementById('totalScore');
    animateNumber(chip,prev,S.totalScore,600,'','★ ');
    chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');
  }catch(e){console.warn('[時間] 計分失敗',e);}
}
function xlog(score){   // 完成一輪先寫入得分紀錄
  try{S.scoreHistory.push({game:'tq',score:score,time:new Date().toLocaleTimeString('en-HK',{hour:'2-digit',minute:'2-digit'})});if(typeof renderHistory==='function')renderHistory();}catch(e){}
}

/* ══════════ 🧠 點·鐘·時間 ══════════ */
const XD={s:2,e:5};
function xdLineHtml(){
  const s=XD.s,e=XD.e,n=e-s,pos=h=>(h-1)/11*100;
  let tk='';
  for(let h=1;h<=12;h++)tk+='<div class="xtk'+(h===s||h===e?' on':'')+'" style="left:'+pos(h)+'%"><i></i><span>'+h+'</span></div>';
  return '<div class="xline"><div class="xbar"></div><div class="xseg" style="left:'+pos(s)+'%;width:'+(pos(e)-pos(s))+'%"></div>'+tk
    +'<div class="xpt" style="left:'+pos(s)+'%">'+H[s][0]+'點</div><div class="xpt" style="left:'+pos(e)+'%">'+H[e][0]+'點</div>'
    +'<div class="xseglab" style="left:'+((pos(s)+pos(e))/2)+'%">⟷ '+H[n][0]+'個鐘</div></div>';
}
function xdOutHtml(){
  const s=XD.s,e=XD.e,n=e-s;
  return xrow('由'+H[s][0]+'點到'+H[e][0]+'點','jau4 '+H[s][1]+' dim2 dou3 '+H[e][1]+' dim2','ตั้งแต่ '+THN[s]+' โมง ถึง '+THN[e]+' โมง · 兩個「點」＝兩個時間點')
    +xrow('用咗'+H[n][0]+'個鐘','jung6 zo2 '+H[n][1]+' go3 zung1','ใช้เวลา '+THN[n]+' ชั่วโมง · 兩點之間嘅距離＝個鐘')
    +xrow('由'+H[s][0]+'點到'+H[e][0]+'點，一共'+H[n][0]+'個鐘。','jau4 '+H[s][1]+' dim2 dou3 '+H[e][1]+' dim2, jat1 gung6 '+H[n][1]+' go3 zung1.','ตั้งแต่ '+THN[s]+' โมง ถึง '+THN[e]+' โมง รวม '+THN[n]+' ชั่วโมง');
}
function xdUpd(){
  $('xdLine').innerHTML=xdLineHtml();$('xdOut').innerHTML=xdOutHtml();
  $('xvS').textContent=XD.s+' 點';$('xvE').textContent=XD.e+' 點';
  $('xsS').value=XD.s;$('xsE').value=XD.e;
}
function xdBind(){
  $('xsS').addEventListener('input',ev=>{XD.s=+ev.target.value;if(XD.e<=XD.s)XD.e=XD.s+1;xdUpd();});
  $('xsE').addEventListener('input',ev=>{XD.e=+ev.target.value;if(XD.s>=XD.e)XD.s=XD.e-1;xdUpd();});
  xdUpd();
}
const XERR=[
 ['我睇咗三點電視','我睇咗三個鐘電視。','ngo5 tai2 zo2 saam1 go3 zung1 din6 si6.','ฉันดูทีวีไปสามชั่วโมง','睇咗「幾耐」＝時長 → 個鐘'],
 ['而家三個鐘','而家三點（鐘）。','ji4 gaa1 saam1 dim2 (zung1).','ตอนนี้สามโมง','講「幾點」＝時間點 → 點'],
 ['我冇點','我冇時間。','ngo5 mou5 si4 gaan3.','ฉันไม่มีเวลา','「冇空」係泛指時間 → 時間'],
 ['佢瞓咗八點','佢瞓咗八個鐘。','keoi5 fan3 zo2 baat3 go3 zung1.','เขานอนไปแปดชั่วโมง','瞓咗幾耐＝時長 → 個鐘'],
 ['我哋六個鐘出發','我哋六點出發。','ngo5 dei6 luk6 dim2 ceot1 faat3.','พวกเราออกเดินทางหกโมง','出發嘅時刻＝時間點 → 點']
];
const XQS3=[
 ['幾點','gei2 dim2','กี่โมง','問鐘面上嘅時間點','而家幾點？','ji4 gaa1 gei2 dim2?','ตอนนี้กี่โมง?','三點。','saam1 dim2.','สามโมง'],
 ['幾時','gei2 si4','เมื่อไหร่','問「幾時」，答案可以係時間點、日子、星期…','你幾時食藥？','nei5 gei2 si4 sik6 joek6?','คุณกินยาเมื่อไหร่?','三點／聽日／星期三。','saam1 dim2 / ting1 jat6 / sing1 kei4 saam1.','สามโมง / พรุ่งนี้ / วันพุธ'],
 ['幾耐','gei2 noi6','นานเท่าไร','問時長（亦可以講「幾個鐘」）','你等咗幾耐？','nei5 dang2 zo2 gei2 noi6?','คุณรอมานานเท่าไร?','兩個鐘。','loeng5 go3 zung1.','สองชั่วโมง']
];
function viewDian(){
  const cs=[
   ['點','dim2','โมง','時間「點」：鐘面上嘅一個位置','จุดเวลาบนหน้าปัด','幾點？','三點','saam1 dim2','สามโมง','#0E6B57'],
   ['個鐘','go3 zung1','ชั่วโมง','時間「長度」：過咗幾耐','ระยะเวลาที่ผ่านไป','幾耐？／幾個鐘？','三個鐘','saam1 go3 zung1','สามชั่วโมง','#C1402A'],
   ['時間','si4 gaan3','เวลา','泛指嘅「時間」：有冇空','เวลา (กว้างๆ) / เวลาว่าง','有冇時間？','我冇時間','ngo5 mou5 si4 gaan3','ฉันไม่มีเวลา','#A9701C']
  ];
  const cards='<div class="xg">'+cs.map(c=>'<div class="card xc" style="border-top:5px solid '+c[9]+'"><div class="jy">'+c[1]+'</div><div class="xbig" style="color:'+c[9]+'">'+c[0]+'</div><div class="th">≈ '+c[2]+'</div><div class="xrole">'+c[3]+'</div><div class="th">'+c[4]+'</div><div class="xq">問：'+c[5]+'</div><div class="xex"><div class="jy">'+c[7]+'</div><div class="cc">'+c[6]+'</div><div class="th">= '+c[8]+'</div>'+spk(c[6])+'</div></div>').join('')+'</div>';
  const err='<div class="card">'+XERR.map(x=>'<div class="xer"><div class="xno">✗ '+x[0]+'</div><div class="jy">'+x[2]+'</div><div class="xyes">✓ '+x[1]+' '+spk(x[1])+'</div><div class="th">'+x[3]+'</div><div class="xwhy">'+x[4]+'</div></div>').join('')+'</div>';
  const qs=XQS3.map(q=>'<div class="card"><div style="display:flex;gap:10px;align-items:baseline;flex-wrap:wrap"><span class="big" style="font-size:24px">'+q[0]+'</span><span class="jy">'+q[1]+'</span><span class="th">'+q[2]+'</span></div><div class="th" style="margin:2px 0 6px">'+q[3]+'</div>'
     +xrow(q[4],q[5],q[6])+xrow(q[7],q[8],q[9])+'</div>').join('');
  return xsec('🧠 點、個鐘、時間，有咩分別？','โมง ชั่วโมง เวลา — ต่างกันอย่างไร')
   +cards
   +'<div class="tip"><b>用泰文諗就易：</b>點 ＝ โมง　·　個鐘 ＝ ชั่วโมง　·　時間 ＝ เวลา。<div class="th">เหมือนภาษาไทยที่แยก "กี่โมง" (จุดเวลา) กับ "กี่ชั่วโมง" (ระยะเวลา)</div></div>'
   +xsec('🎛 拉一拉：點 vs 個鐘','เลื่อนแถบ ดูจุดเวลา (点) กับระยะเวลา (個鐘)')
   +'<div class="card"><div class="slider-row"><label>開始</label><input type="range" id="xsS" min="1" max="11" step="1" value="'+XD.s+'"><span class="val" id="xvS"></span></div>'
   +'<div class="slider-row"><label>結束</label><input type="range" id="xsE" min="2" max="12" step="1" value="'+XD.e+'"><span class="val" id="xvE"></span></div>'
   +'<div id="xdLine"></div><div id="xdOut"></div></div>'
   +'<div class="tip">「點」係線上面嘅<b>一個位置</b>，「個鐘」係兩個位置之間嘅<b>一段距離</b>。<div class="th">點 = จุดบนเส้นเวลา · 個鐘 = ความยาวระหว่างสองจุด</div></div>'
   +xsec('❌ 常見錯誤','ข้อผิดพลาดที่พบบ่อย')+err
   +xsec('❓ 三個問句：幾點／幾時／幾耐','ถามเวลา 3 แบบ')+qs
   +'<div class="tip"><b>輕輕提一句：</b><br>• 「鐘」本身亦可以解「時鐘」（一個鐘＝一個時鐘），要靠上文分。<br>• 「點」亦可以解 how／why：點樣 dim2 joeng2、點解 dim2 gaai2。<div class="th">鐘 อาจแปลว่า "นาฬิกา" ก็ได้ · 點 อาจแปลว่า "อย่างไร/ทำไม" ก็ได้ ดูจากบริบท</div></div>';
}

/* ══════════ ⏳ 時長 ══════════ */
const XUN=[['分鐘','fan1 zung1','นาที'],['個鐘','go3 zung1','ชั่วโมง'],['日','jat6','วัน'],['個星期','go3 sing1 kei4','สัปดาห์'],['個月','go3 jyut6','เดือน'],['年','nin4','ปี']];
const XU={n:3,u:1};
const XCONV=[['一個字','jat1 go3 zi6','5 นาที'],['一刻鐘','jat1 hak1 zung1','15 นาที'],['三個字','saam1 go3 zi6','15 นาที'],['半個鐘','bun3 go3 zung1','30 นาที'],['三刻鐘','saam1 hak1 zung1','45 นาที'],['一個鐘','jat1 go3 zung1','60 นาที'],['一個半鐘','jat1 go3 bun3 zung1','90 นาที']];
const XDP=[
 ['① 用咗＋時長','ใช้เวลา…','我用咗兩個鐘做功課。','ngo5 jung6 zo2 loeng5 go3 zung1 zou6 gung1 fo3.','ฉันใช้เวลาสองชั่วโมงทำการบ้าน','時長放喺「用咗」後面，之後先講做乜。'],
 ['② 動詞＋咗＋時長','…ไปเป็นเวลา…','我睇咗三個鐘電視。','ngo5 tai2 zo2 saam1 go3 zung1 din6 si6.','ฉันดูทีวีไปสามชั่วโมง','時長喺動詞後面；「點」就喺動詞前面：我三點睇電視。'],
 ['③ 由…到…，一共…','ตั้งแต่…ถึง… รวม…','由三點到五點，一共兩個鐘。','jau4 saam1 dim2 dou3 ng5 dim2, jat1 gung6 loeng5 go3 zung1.','ตั้งแต่สามโมงถึงห้าโมง รวมสองชั่วโมง','兩個「點」之間就係「個鐘」。'],
 ['④ 要…先（得）','ต้อง…ถึงจะ…','煲湯要一個半鐘先得。','bou1 tong1 jiu3 jat1 go3 bun3 zung1 sin1 dak1.','ต้มซุปต้องใช้หนึ่งชั่วโมงครึ่งถึงจะได้','要＋時長＋先＝需要咁耐先夠。'],
 ['⑤ 問：幾耐？','นานเท่าไร','你等咗幾耐？我等咗半個鐘。','nei5 dang2 zo2 gei2 noi6? ngo5 dang2 zo2 bun3 go3 zung1.','คุณรอมานานเท่าไร? ฉันรอมาครึ่งชั่วโมง','幾耐＝時長，答案用「個鐘／日／個月」等。']
];
function xuHtml(){
  const u=XUN[XU.u],c=H[XU.n][0]+u[0],j=H[XU.n][1]+' '+u[1];
  const nums='<div class="filter-bar" style="flex-wrap:wrap">'+[1,2,3,4,5,6,7,8,9,10].map(n=>'<button class="f-btn'+(n===XU.n?' act':'')+'" data-x="un" data-v="'+n+'">'+H[n][0]+'</button>').join('')+'</div>';
  const units='<div class="filter-bar" style="flex-wrap:wrap">'+XUN.map((x,i)=>'<button class="f-btn'+(i===XU.u?' act':'')+'" data-x="uu" data-v="'+i+'">'+x[0]+'</button>').join('')+'</div>';
  return nums+units+xrow(c,j,THN[XU.n]+' '+u[2])+(XU.n===2?'<div class="tip">2 讀「兩」loeng5，唔係「二」。<div class="th">เลข 2 อ่านว่า 兩</div></div>':'');
}
function viewDur(){
  return xsec('⏳ 時長：過咗幾耐？','ระยะเวลา — ผ่านไปนานเท่าไร')
   +'<div class="card" id="xuBox">'+xuHtml()+'</div>'
   +'<div class="tip"><b>「個」嘅規則：</b>個鐘、個星期、個月 要加「個」；<b>分鐘、日、年</b> 唔使。<div class="th">ชั่วโมง/สัปดาห์/เดือน ใช้ 個 · นาที/วัน/ปี ไม่ใช้ 個</div></div>'
   +xsec('🧮 換算','แปลงหน่วยเวลา')
   +'<div class="card">'+XCONV.map(x=>xrow(x[0],x[1],x[2])).join('')+'</div>'
   +xsec('📐 五個句型','ประโยคที่ใช้บ่อย')
   +XDP.map(p=>'<div class="card"><div style="font-weight:700;font-family:var(--serif)">'+p[0]+'</div><div class="th">'+p[1]+'</div>'+xrow(p[2],p[3],p[4])+'<div class="tip" style="margin-bottom:0">'+p[5]+'</div></div>').join('')
   +'<div class="tip"><b>語序：</b>時間點喺動詞<b>前面</b>（三點睇電視），時長喺動詞<b>後面</b>（睇咗三個鐘電視）。<div class="th">จุดเวลาอยู่หน้ากริยา · ระยะเวลาอยู่หลังกริยา</div></div>';
}

/* ══════════ 📅 日期星期 ══════════ */
const XW=[['日','jat6','อาทิตย์'],['一','jat1','จันทร์'],['二','ji6','อังคาร'],['三','saam1','พุธ'],['四','sei3','พฤหัสบดี'],['五','ng5','ศุกร์'],['六','luk6','เสาร์']];
const XTM=['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
const XREL=[   // [偏移, 中文, 粵拼, 泰文, 朗讀]
 ['🗓 日 · วัน',[[-3,'大前日','daai6 cin4 jat6','3 วันก่อน'],[-2,'前日','cin4 jat6','เมื่อวานซืน'],[-1,'琴日','kam4 jat6','เมื่อวาน'],[0,'今日','gam1 jat6','วันนี้'],[1,'聽日','ting1 jat6','พรุ่งนี้'],[2,'後日','hau6 jat6','มะรืนนี้'],[3,'大後日','daai6 hau6 jat6','อีก 3 วัน']]],
 ['📆 星期 · สัปดาห์',[[-2,'上上個星期','soeng6 soeng6 go3 sing1 kei4','สัปดาห์ก่อนสัปดาห์ที่แล้ว'],[-1,'上個星期','soeng6 go3 sing1 kei4','สัปดาห์ที่แล้ว'],[0,'今個星期','gam1 go3 sing1 kei4','สัปดาห์นี้'],[1,'下個星期','haa6 go3 sing1 kei4','สัปดาห์หน้า'],[2,'下下個星期','haa6 haa6 go3 sing1 kei4','อีก 2 สัปดาห์ (ถัดจากสัปดาห์หน้า)']]],
 ['🈷 月 · เดือน',[[-2,'上上個月','soeng6 soeng6 go3 jyut6','เดือนก่อนเดือนที่แล้ว'],[-1,'上個月','soeng6 go3 jyut6','เดือนที่แล้ว'],[0,'今個月','gam1 go3 jyut6','เดือนนี้'],[1,'下個月','haa6 go3 jyut6','เดือนหน้า'],[2,'下下個月','haa6 haa6 go3 jyut6','อีก 2 เดือน (ถัดจากเดือนหน้า)']]],
 ['🎆 年 · ปี',[[-3,'大前年','daai6 cin4 nin4','3 ปีก่อน'],[-2,'前年','cin4 nin4','2 ปีก่อน (ก่อนปีที่แล้ว)'],[-1,'舊年／上年／去年','gau6 nin4 / soeng6 nin4 / heoi3 nin4','ปีที่แล้ว'],[0,'今年','gam1 nin4','ปีนี้'],[1,'出年／明年／下年','ceot1 nin4 / ming4 nin4 / haa6 nin4','ปีหน้า'],[2,'後年','hau6 nin4','อีก 2 ปี (ถัดจากปีหน้า)'],[3,'大後年','daai6 hau6 nin4','อีก 3 ปี']]]
];
function xtlRow(x){
  const off=x[0],lab=(off>0?'+':off<0?'−':'')+Math.abs(off);
  return '<div class="row-x'+(off===0?' xtoday':'')+'"><span class="chip '+(off<0?'k2':off>0?'k4':'k1')+'" style="min-width:34px">'+(off===0?'今':lab)+'</span><div class="mid"><div class="jy">'+x[2]+'</div><div class="cc">'+x[1]+'</div><div class="th">'+x[3]+'</div></div>'+spk(x[1].split('／')[0])+'</div>';
}
/* 幾日／幾個月／幾年 前後 計算器 */
const XRN={n:3,u:3,d:0};
const XRU=[['日','jat6','วัน',0],['星期','sing1 kei4','สัปดาห์',1],['月','jyut6','เดือน',1],['年','nin4','ปี',0]];
function xrHtml(){
  const u=XRU[XRN.u],n=XRN.n,dir=XRN.d?['後','hau6']:['前','cin4'],nc=H[n];
  const c=nc[0]+(u[3]?'個':'')+u[0]+dir[0],j=nc[1]+(u[3]?' go3':'')+' '+u[1]+' '+dir[1];
  const t=XRN.d?'อีก '+n+' '+u[2]:'เมื่อ '+n+' '+u[2]+'ก่อน';
  const why=[];if(n===2)why.push('2 讀「兩」loeng5（唔係「二」）');why.push(u[3]?'「'+u[0]+'」前面要加「個」go3':'「'+u[0]+'」前面唔使加「個」');why.push('「'+dir[0]+'」放喺最尾');
  const btn=(a,v,lab,on)=>'<button class="f-btn'+(on?' act':'')+'" data-x="'+a+'" data-v="'+v+'">'+lab+'</button>';
  let ns='';for(let i=1;i<=10;i++)ns+=btn('rn',i,i,n===i);
  return '<div class="rn">'+ns+'</div>'
   +'<div class="rn">'+XRU.map((x,i)=>btn('ru',i,x[0],XRN.u===i)).join('')+'</div>'
   +'<div class="rn">'+btn('rd',0,'前 · ก่อน',!XRN.d)+btn('rd',1,'後 · หลัง',XRN.d)+'</div>'
   +'<div class="xrres"><div class="jy">'+j+'</div><div class="cc">'+c+'</div><div class="th">'+t+'</div><div style="margin-top:6px">'+spk(c)+'</div><div class="xwhy" style="margin-top:6px">'+why.join(' · ')+'</div></div>';
}
const XDT={v:null};
function xToday(){const d=new Date();return d.getFullYear()+'-'+pad2(d.getMonth()+1)+'-'+pad2(d.getDate());}
function xDateInfo(d){
  const y=d.getFullYear(),m=d.getMonth()+1,day=d.getDate(),w=d.getDay();
  const yc=String(y).split('').map(x=>DIG[+x]),mp=numP(m),dp=numP(day);
  return {
    c:yc.map(x=>x[0]).join('')+'年'+mp[0]+'月'+dp[0]+'號，星期'+XW[w][0],
    j:yc.map(x=>x[1]).join(' ')+' nin4 '+mp[1]+' jyut6 '+dp[1]+' hou6, sing1 kei4 '+XW[w][1],
    t:'วัน'+XW[w][2]+'ที่ '+day+' '+XTM[m-1]+' ค.ศ. '+y+' (พ.ศ. '+(y+543)+')'
  };
}
function xDateOut(){
  const p=(XDT.v||xToday()).split('-').map(Number);
  const d=new Date(p[0],p[1]-1,p[2]);
  if(isNaN(d.getTime()))return '';
  const prev=new Date(p[0],p[1]-1,p[2]-1),next=new Date(p[0],p[1]-1,p[2]+1);
  const row=(lab,dt)=>{const r=xDateInfo(dt);return '<div class="row-x"><span class="chip k1">'+lab+'</span><div class="mid"><div class="jy">'+r.j+'</div><div class="cc">'+r.c+'</div><div class="th">'+r.t+'</div></div>'+spk(r.c)+'</div>';};
  return row('琴日',prev)+row('呢日',d)+row('聽日',next);
}
function viewDate(){
  const wk=[1,2,3,4,5,6,0].map(i=>'<div class="xcell"><div class="jy">sing1 kei4 '+XW[i][1]+'</div><div class="cc">星期'+XW[i][0]+'</div><div class="th">วัน'+XW[i][2]+'</div>'+spk('星期'+XW[i][0])+'</div>').join('');
  const mo=[];for(let n=1;n<=12;n++){const p=numP(n);mo.push('<div class="xcell"><div class="jy">'+p[1]+' jyut6</div><div class="cc">'+p[0]+'月</div><div class="th">'+XTM[n-1]+'</div>'+spk(p[0]+'月')+'</div>');}
  const rel=XREL.map(g=>'<div class="card"><div class="th" style="font-weight:700;margin-bottom:4px">'+g[0]+'</div>'+g[1].map(xtlRow).join('')+'</div>').join('');
  const fx=[['兩年前','loeng5 nin4 cin4','เมื่อสองปีก่อน'],['三年前','saam1 nin4 cin4','เมื่อสามปีก่อน'],['兩年後','loeng5 nin4 hau6','อีกสองปี'],['三年後','saam1 nin4 hau6','อีกสามปี'],['半年前','bun3 nin4 cin4','เมื่อครึ่งปีก่อน'],['半年後','bun3 nin4 hau6','อีกครึ่งปี'],['三個月前','saam1 go3 jyut6 cin4','เมื่อสามเดือนก่อน'],['三個月後','saam1 go3 jyut6 hau6','อีกสามเดือน'],['兩個星期前','loeng5 go3 sing1 kei4 cin4','เมื่อสองสัปดาห์ก่อน'],['三日後','saam1 jat6 hau6','อีกสามวัน']];
  const vg=[['前兩日','cin4 loeng5 jat6','เมื่อสองสามวันก่อน (ประมาณ ไม่ใช่สองวันพอดี)'],['前幾日','cin4 gei2 jat6','เมื่อไม่กี่วันก่อน'],['呢幾日','ni1 gei2 jat6','ช่วงไม่กี่วันนี้'],['過兩日','gwo3 loeng5 jat6','อีกสองสามวัน'],['過幾日','gwo3 gei2 jat6','อีกไม่กี่วัน'],['後幾日','hau6 gei2 jat6','ไม่กี่วันข้างหน้า（後幾日都會落雨）'],['前排','cin4 paai2','เมื่อสักพักก่อน'],['過排','gwo3 paai2','อีกสักพัก']];
  const ex=[['我三年前嚟香港。','ngo5 saam1 nin4 cin4 lai4 hoeng1 gong2.','ฉันมาฮ่องกงเมื่อสามปีก่อน'],['我舊年開始學廣東話。','ngo5 gau6 nin4 hoi1 ci2 hok6 gwong2 dung1 waa2.','ฉันเริ่มเรียนกวางตุ้งเมื่อปีที่แล้ว'],['出年我會去日本。','ceot1 nin4 ngo5 wui5 heoi3 jat6 bun2.','ปีหน้าฉันจะไปญี่ปุ่น'],['佢兩年後畢業。','keoi5 loeng5 nin4 hau6 bat1 jip6.','อีกสองปีเขาจะเรียนจบ'],['我哋三個月後去旅行。','ngo5 dei6 saam1 go3 jyut6 hau6 heoi3 leoi5 hang4.','อีกสามเดือนเราจะไปเที่ยว'],['我半年前搬咗屋。','ngo5 bun3 nin4 cin4 bun1 zo2 uk1.','ฉันย้ายบ้านเมื่อครึ่งปีก่อน'],['我前兩日見過佢。','ngo5 cin4 loeng5 jat6 gin3 gwo3 keoi5.','เมื่อสองสามวันก่อนฉันเจอเขา'],['過幾日再傾啦。','gwo3 gei2 jat6 zoi3 king1 laa1.','ไว้อีกไม่กี่วันค่อยคุยกันนะ']];
  const qs=[['今日星期幾？','gam1 jat6 sing1 kei4 gei2?','วันนี้วันอะไร?'],['今日幾月幾號？','gam1 jat6 gei2 jyut6 gei2 hou6?','วันนี้วันที่เท่าไร?'],['你幾時生日？','nei5 gei2 si4 sang1 jat6?','คุณเกิดเมื่อไหร่/วันเกิดวันไหน?']];
  return xsec('📅 日期同星期','วันที่และวันในสัปดาห์')
   +'<div class="card"><div class="th" style="margin-bottom:6px">揀一日，睇點講 · เลือกวันที่ ดูวิธีพูด</div><input type="date" class="xin" id="xDate" value="'+(XDT.v||xToday())+'"><div id="xDateOut">'+xDateOut()+'</div></div>'
   +'<div class="tip"><b>日期次序：</b>年 → 月 → 號 → 星期（由大到細）。年份逐個數字讀：2026＝二零二六年。<div class="th">เรียง ปี → เดือน → วันที่ → วัน · อ่านปีทีละตัวเลข</div></div>'
   +xsec('📆 星期','วันในสัปดาห์')+'<div class="xgrid">'+wk+'</div>'
   +'<div class="tip">星期日亦可以講星期天（sing1 kei4 tin1）。<div class="th">星期日 = 星期天</div></div>'
   +xsec('🈷 月份','เดือน')+'<div class="xgrid">'+mo.join('')+'</div>'
   +'<div class="tip">月份用「二」唔係「兩」：二月 ji6 jyut6。幾號：一號 jat1 hou6 … 三十一號。<div class="th">เดือน/วันที่ใช้ 二 ไม่ใช่ 兩</div></div>'
   +xsec('⏮⏭ 前・舊・今・出・後','ก่อน — ตอนนี้ — หลัง')+'<div class="tip">「大」＝再多一日／一年：前日 → 大前日；後年 → 大後年。<div class="th">大 = เพิ่มอีกหนึ่งหน่วย</div></div>'+rel
   +'<div class="tip"><b>記住對應：</b>前年＝兩年前 · 後年＝兩年後 · 大前年＝三年前 · 大後年＝三年後 · 前日＝兩日前 · 後日＝兩日後。<div class="th">คำเฉพาะ = ตัวเลข + ก่อน/หลัง</div></div>'
   +xsec('📏 幾日・幾個月・幾年 前／後','กี่วัน/เดือน/ปี ก่อน–หลัง')
   +'<div class="card"><div class="th" style="margin-bottom:6px">自己砌砌睇 · ลองประกอบเอง</div><div id="xrBox">'+xrHtml()+'</div></div>'
   +'<div class="tip"><b>公式：</b>數字＋(個)＋單位＋前／後。「日、年」唔使個；「星期、月」要個。時間詞放喺動詞前面：我<b>三年前</b>嚟香港。<div class="th">เวลาอยู่หน้ากริยา · 日/年 ไม่ต้องมี 個 · 星期/月 ต้องมี 個</div></div>'
   +'<div class="card">'+fx.map(q=>xrow(q[0],q[1],q[2])).join('')+'</div>'
   +xsec('🌫 唔講確數嘅講法','บอกเวลาแบบประมาณ')
   +'<div class="tip">「前兩日」（前＋數字）係<b>大約</b>幾日前；「兩日前」（數字＋前）先係<b>剛好</b>兩日前。<div class="th">前兩日 = ประมาณสองสามวันก่อน · 兩日前 = สองวันก่อนพอดี</div></div>'
   +'<div class="card">'+vg.map(q=>xrow(q[0],q[1],q[2])).join('')+'</div>'
   +xsec('💬 例句','ประโยคตัวอย่าง')+'<div class="card">'+ex.map(q=>xrow(q[0],q[1],q[2])).join('')+'</div>'
   +xsec('❓ 問日期','ถามวันที่')+'<div class="card">'+qs.map(q=>xrow(q[0],q[1],q[2])).join('')+'</div>';
}

/* ══════════ 👵 婆婆日程 ══════════ */
const XE=[
 [7,0,'起身','hei2 san1','ตื่นนอน'],[7,30,'食早餐','sik6 zou2 caan1','กินอาหารเช้า'],[9,0,'食藥','sik6 joek6','กินยา'],
 [10,0,'落公園行下','lok6 gung1 jyun2 haang4 haa5','ลงไปเดินเล่นที่สวน'],[12,30,'食晏','sik6 aan3','กินข้าวเที่ยง'],
 [14,0,'瞓一陣','fan3 jat1 zan6','งีบสักพัก'],[15,0,'食藥','sik6 joek6','กินยา'],
 [18,0,'食晚飯','sik6 maan5 faan6','กินข้าวเย็น'],[21,0,'瞓覺','fan3 gaau3','เข้านอน']
];
function xEv(k){
  const e=XE[k],h24=e[0],m=e[1],h=h12of(h24),pre=perPrefix(h24),tp=m===30?ziP(h,30):hourP(h);
  const tc=pre.c+tp.c,tj=pre.j+' '+tp.j;
  return {k:k,h24:h24,m:m,h:h,
    c:'婆婆'+tc+e[2]+'。',
    j:'po4 po2 '+tj+' '+e[3]+'.',
    t:'คุณยาย'+thaiTime(h24,m)+' '+e[4]};
}
const XN={mode:'list'};
function xListHtml(){
  const rows=XE.map((_,k)=>{const v=xEv(k);return '<div class="card xev"><div>'+clockSVG(v.h,v.m)+'</div><div class="mid" style="flex:1;min-width:0"><div class="jy">'+v.j+'</div><div class="cc">'+v.c+'</div><div class="th">'+v.t+'</div></div>'+spk(v.c)+'</div>';}).join('');
  const fact='<div class="card" style="border-left:5px solid var(--red)"><div class="th" style="font-weight:700">點 vs 個鐘</div>'
    +xrow('婆婆夜晚九點瞓覺，朝早七點起身，瞓咗十個鐘。','po4 po2 je6 maan5 gau2 dim2 fan3 gaau3, ziu1 zou2 cat1 dim2 hei2 san1, fan3 zo2 sap6 go3 zung1.','คุณยายเข้านอนสามทุ่ม ตื่นเจ็ดโมงเช้า นอนไปสิบชั่วโมง')
    +'<div class="tip" style="margin-bottom:0">「九點」「七點」係時間點；「十個鐘」係瞓咗幾耐。<div class="th">เก้าโมง/เจ็ดโมง = จุดเวลา · สิบชั่วโมง = ระยะเวลาที่นอน</div></div></div>';
  return xsec('👵 婆婆一日時間表','ตารางเวลาของคุณยายทั้งวัน')+rows+fact;
}
/* 睇句揀鐘面 */
const XC={i:0,score:0,cur:null,fb:null,done:false,total:6,tok:0};
function xcNew(){
  const v=xEv(Math.floor(Math.random()*XE.length)),key=(h,m)=>h+':'+m,seen={};
  const opts=[{h:v.h,m:v.m}];seen[key(v.h,v.m)]=1;
  while(opts.length<4){const h=1+Math.floor(Math.random()*12),m=Math.random()<.5?0:30;if(!seen[key(h,m)]){seen[key(h,m)]=1;opts.push({h:h,m:m});}}
  XC.cur={v:v,opts:shuffle(opts)};XC.fb=null;
}
function xcRestart(){XC.i=0;XC.score=0;XC.cur=null;XC.fb=null;XC.done=false;XC.tok++;}
function xClockHtml(){
  if(XC.done)return '<div class="result"><div class="re">🎉</div><div class="big" style="font-size:20px">完成！</div><div class="rs">'+XC.score+' / '+XC.total*10+'</div><div class="th">เก่งมาก! 叻仔！</div><button class="retry" data-x="crestart">再玩一次</button></div>';
  if(!XC.cur)xcNew();
  const c=XC.cur,v=c.v;
  const opts='<div class="opts">'+c.opts.map((o,i)=>{
    const ok=o.h===v.h&&o.m===v.m;
    const cls='opt xclk'+(XC.fb?(ok?' ok':(XC.fb.pick===i?' bad':' dim')):'');
    return '<button class="'+cls+'" '+(XC.fb?'':'data-x="cpick" data-v="'+i+'"')+'>'+clockSVG(o.h,o.m)+'</button>';
  }).join('')+'</div>';
  return '<div class="g-hdr"><span class="score-pill">★ '+XC.score+'</span><span class="round-pill">'+(XC.i+1)+' / '+XC.total+'</span></div>'
    +'<div class="q-card"><div class="q-prompt">睇／聽句子，揀返啱嘅鐘</div><div class="q-jy">'+v.j+'</div><div class="q-main" style="font-size:20px">'+v.c+'</div><div class="th">'+v.t+'</div><div style="margin-top:6px">'+spk(v.c)+'</div></div>'
    +opts+(XC.fb?'<div class="fb '+(XC.fb.ok?'ok':'err')+'">'+(XC.fb.ok?'✓ 啱喇！':'✗ 正確係 '+pad2(v.h)+':'+pad2(v.m)+'（'+v.t.replace('คุณยาย','')+'）')+'</div>':'');
}
function xcPick(i){
  if(XC.fb||XC.done||!XC.cur)return;
  const c=XC.cur,o=c.opts[i],ok=o.h===c.v.h&&o.m===c.v.m,tok=XC.tok;
  XC.fb={pick:i,ok:ok};if(ok){XC.score+=10;xaward(10);}
  render();
  setTimeout(()=>{
    if(tok!==XC.tok)return;
    XC.i++;XC.fb=null;XC.cur=null;
    if(XC.i>=XC.total){XC.done=true;xlog(XC.score);}
    if(T.tab==='nan'&&XN.mode==='clock'&&alive())render();
  },1300);
}
/* 排順序 */
const XO={cur:null,msg:''};
function xoNew(){
  const items=shuffle(XE.map((_,k)=>k)).slice(0,4).map(xEv);
  const sorted=items.slice().sort((a,b)=>a.h24*60+a.m-(b.h24*60+b.m)).map(x=>x.k);
  XO.cur={items:shuffle(items),sorted:sorted,picked:[],wrong:0,done:false};XO.msg='';
}
function xOrderHtml(){
  if(!XO.cur)xoNew();
  const c=XO.cur;
  const done=c.picked.map((k,n)=>{const v=xEv(k);return '<div class="xoc done"><span class="xnum">'+(n+1)+'</span><div><div class="jy">'+v.j+'</div><div class="cc" style="font-weight:700">'+v.c+'</div><div class="th">'+v.t+'</div></div></div>';}).join('');
  const rest=c.items.filter(v=>c.picked.indexOf(v.k)<0).map(v=>'<button class="xoc" data-x="opick" data-v="'+v.k+'"><div><div class="jy">'+v.j+'</div><div class="cc" style="font-weight:700">'+v.c+'</div><div class="th">'+v.t+'</div></div></button>').join('');
  let fb='';
  if(c.done)fb='<div class="fb ok">'+(c.wrong===0?'✓ 全部排啱！ +10':'✓ 排好咗 +5（錯咗 '+c.wrong+' 次）')+'</div><div style="text-align:center"><button class="retry" data-x="onext">下一題 ➜</button></div>';
  else if(XO.msg)fb='<div class="fb err">'+XO.msg+'</div>';
  return '<div class="q-card"><div class="q-prompt">由最早排到最遲，逐個撳</div><div class="th">เรียงกิจกรรมของคุณยาย จากเช้าสุดไปดึกสุด แตะทีละใบ</div></div>'+done+(c.done?'':rest)+fb;
}
function xoPick(k){
  const c=XO.cur;if(!c||c.done)return;
  if(k===c.sorted[c.picked.length]){
    c.picked.push(k);XO.msg='';
    if(c.picked.length===c.items.length){c.done=true;xaward(c.wrong===0?10:5);}
  }else{c.wrong++;XO.msg='唔係呢個，再睇清楚時間 · ยังไม่ใช่ ดูเวลาอีกครั้ง';}
  render();
}
function viewNan(){
  const modes=[['list','📋 時間表'],['clock','🕒 睇句揀鐘面'],['order','🔢 排順序']];
  const bar='<div class="filter-bar">'+modes.map(m=>'<button class="f-btn'+(XN.mode===m[0]?' act':'')+'" data-x="nm" data-v="'+m[0]+'">'+m[1]+'</button>').join('')+'</div>';
  return bar+(XN.mode==='clock'?xClockHtml():XN.mode==='order'?xOrderHtml():xListHtml());
}

/* ══════════ 🎯 點／個鐘 專項小測 ══════════ */
const XQSET=[
 [['點','dim2'],['個鐘','go3 zung1'],['時間','si4 gaan3']],
 [['幾點','gei2 dim2'],['幾時','gei2 si4'],['幾耐','gei2 noi6']]
];
const qa=(s,j,t,ans,why)=>({s:s,j:j,t:t,set:0,ok:[ans],best:ans,why:why});
const qb=(s,j,t,ok,why)=>({s:s,j:j,t:t,set:1,ok:ok,best:ok[0],why:why});
const XQA=[
 qa('我哋三___開會。','ngo5 dei6 saam1 ___ hoi1 wui2.','พวกเราประชุมสามโมง',0,'鐘面上嘅時間點 → 點'),
 qa('我睇咗兩___電視。','ngo5 tai2 zo2 loeng5 ___ din6 si6.','ฉันดูทีวีไปสองชั่วโมง',1,'睇咗幾耐＝時長 → 個鐘'),
 qa('對唔住，我冇___。','deoi3 m4 zyu6, ngo5 mou5 ___.','ขอโทษ ฉันไม่มีเวลา',2,'有冇空＝泛指時間 → 時間'),
 qa('婆婆七___起身。','po4 po2 cat1 ___ hei2 san1.','คุณยายตื่นเจ็ดโมง',0,'起身嘅時刻＝時間點 → 點'),
 qa('煲湯要兩___先得。','bou1 tong1 jiu3 loeng5 ___ sin1 dak1.','ต้มซุปต้องสองชั่วโมงถึงจะได้',1,'要幾耐＝時長 → 個鐘'),
 qa('而家幾___？','ji4 gaa1 gei2 ___?','ตอนนี้กี่โมง?',0,'問鐘面時間 → 幾點'),
 qa('你有冇___食飯？','nei5 jau5 mou5 ___ sik6 faan6?','คุณมีเวลากินข้าวไหม?',2,'有冇時間＝有冇空 → 時間'),
 qa('佢瞓咗八___。','keoi5 fan3 zo2 baat3 ___.','เขานอนไปแปดชั่วโมง',1,'瞓咗幾耐＝時長 → 個鐘'),
 qa('我哋九___出發。','ngo5 dei6 gau2 ___ ceot1 faat3.','พวกเราออกเดินทางเก้าโมง',0,'出發嘅時刻＝時間點 → 點'),
 qa('做功課用咗好多___。','zou6 gung1 fo3 jung6 zo2 hou2 do1 ___.','ทำการบ้านใช้เวลาไปมาก',2,'好多＝泛指 → 時間'),
 qa('等咗三___都未到。','dang2 zo2 saam1 ___ dou1 mei6 dou3.','รอมาสามชั่วโมงยังไม่ถึง',1,'等咗幾耐＝時長 → 個鐘'),
 qa('聽日我冇___，唔得閒。','ting1 jat6 ngo5 mou5 ___, m4 dak1 haan4.','พรุ่งนี้ฉันไม่มีเวลา ไม่ว่าง',2,'冇空＝泛指 → 時間')
];
const XQB=[
 qb('A：你___起身？　B：七點半。','A: nei5 ___ hei2 san1? B: cat1 dim2 bun3.','A: คุณตื่นกี่โมง? B: เจ็ดโมงครึ่ง',[0,1],'答鐘面時間 → 幾點（幾時都得，但幾點最準確）'),
 qb('A：你睇咗___電視？　B：兩個鐘。','A: nei5 tai2 zo2 ___ din6 si6? B: loeng5 go3 zung1.','A: คุณดูทีวีไปนานเท่าไร? B: สองชั่วโมง',[2],'答時長（兩個鐘）→ 幾耐'),
 qb('A：你___去旅行？　B：聽日。','A: nei5 ___ heoi3 leoi5 hang4? B: ting1 jat6.','A: คุณไปเที่ยวเมื่อไหร่? B: พรุ่งนี้',[1],'答日子（聽日）→ 幾時'),
 qb('A：你等咗___？　B：半個鐘。','A: nei5 dang2 zo2 ___? B: bun3 go3 zung1.','A: คุณรอมานานเท่าไร? B: ครึ่งชั่วโมง',[2],'答時長 → 幾耐'),
 qb('A：你___食藥？　B：下晝三點。','A: nei5 ___ sik6 joek6? B: haa6 zau3 saam1 dim2.','A: คุณกินยากี่โมง? B: บ่ายสามโมง',[0,1],'答鐘面時間 → 幾點（幾時都得）'),
 qb('A：佢___生日？　B：下個月。','A: keoi5 ___ sang1 jat6? B: haa6 go3 jyut6.','A: วันเกิดเขาเมื่อไหร่? B: เดือนหน้า',[1],'答日子／月份 → 幾時'),
 qb('A：你學咗廣東話___？　B：一年。','A: nei5 hok6 zo2 gwong2 dung1 waa2 ___? B: jat1 nin4.','A: คุณเรียนกวางตุ้งมานานเท่าไร? B: หนึ่งปี',[2],'答時長（一年）→ 幾耐'),
 qb('A：你___返工？　B：星期一。','A: nei5 ___ faan1 gung1? B: sing1 kei4 jat1.','A: คุณไปทำงานเมื่อไหร่? B: วันจันทร์',[1],'答星期 → 幾時')
];
const XQ={list:null,i:0,score:0,fb:null,done:false,tok:0};
function xqStart(){
  XQ.list=shuffle(shuffle(XQA).slice(0,6).concat(shuffle(XQB).slice(0,4)));
  XQ.i=0;XQ.score=0;XQ.fb=null;XQ.done=false;XQ.tok++;
}
function viewDq(){
  if(!XQ.list)xqStart();
  if(XQ.done)return '<div class="result"><div class="re">🎉</div><div class="big" style="font-size:20px">完成！</div><div class="rs">'+XQ.score+' / '+XQ.list.length*10+'</div><div class="th">เก่งมาก! 叻仔！</div><button class="retry" data-x="qrestart">再玩一次</button></div>';
  const q=XQ.list[XQ.i],S2=XQSET[q.set],b=S2[q.best];
  const stem=q.s.replace('___',XQ.fb?'<b class="fillx">'+b[0]+'</b>':'<span class="xblank">　　</span>');
  const jy=q.j.replace('___',XQ.fb?b[1]:'___');
  const opts='<div class="opts">'+S2.map((o,i)=>{
    const ok=q.ok.indexOf(i)>=0;
    const cls='opt'+(XQ.fb?(ok?' ok':(XQ.fb.pick===i?' bad':' dim')):'');
    return '<button class="'+cls+'" '+(XQ.fb?'':'data-x="qpick" data-v="'+i+'"')+'><span class="oj">'+o[1]+'</span><span class="oc">'+o[0]+'</span></button>';
  }).join('')+'</div>';
  const fb=XQ.fb?'<div class="fb '+(XQ.fb.ok?'ok':'err')+'">'+(XQ.fb.ok?'✓ 啱喇！':'✗ 正確係「'+b[0]+'」')+'<div class="th" style="font-weight:400">'+q.why+'</div></div>':'';
  return xsec('🎯 點／個鐘／時間 專項小測','ฝึกแยก โมง ชั่วโมง เวลา')
    +'<div class="g-hdr"><span class="score-pill">★ '+XQ.score+'</span><span class="round-pill">'+(XQ.i+1)+' / '+XQ.list.length+'</span></div>'
    +'<div class="q-card"><div class="q-prompt">填入啱嘅詞 · เลือกคำที่ถูกต้อง</div><div class="q-jy">'+jy+'</div><div class="q-main" style="font-size:22px;line-height:1.7">'+stem+'</div><div class="th">'+q.t+'</div></div>'
    +opts+fb;
}
function xqPick(i){
  if(XQ.fb||XQ.done||!XQ.list)return;
  const q=XQ.list[XQ.i],ok=q.ok.indexOf(i)>=0,tok=XQ.tok;
  XQ.fb={pick:i,ok:ok};if(ok){XQ.score+=10;xaward(10);}
  render();
  setTimeout(()=>{
    if(tok!==XQ.tok)return;
    XQ.i++;XQ.fb=null;
    if(XQ.i>=XQ.list.length){XQ.done=true;xlog(XQ.score);}
    if(T.tab==='dq'&&alive())render();
  },1800);
}


/* ── 事件（用 data-x，唔會同模組原有 data-a 撞） ── */
SR.addEventListener('click',function(e){
  const b=e.target.closest('[data-x]');if(!b)return;
  const a=b.dataset.x,v=b.dataset.v;
  if(a==='un'){XU.n=+v;$('xuBox').innerHTML=xuHtml();}
  else if(a==='uu'){XU.u=+v;$('xuBox').innerHTML=xuHtml();}
  else if(a==='rn'||a==='ru'||a==='rd'){if(a==='rn')XRN.n=+v;else if(a==='ru')XRN.u=+v;else XRN.d=+v;$('xrBox').innerHTML=xrHtml();}
  else if(a==='nm'){XN.mode=v;render();}
  else if(a==='cpick')xcPick(+v);
  else if(a==='crestart'){xcRestart();render();}
  else if(a==='opick')xoPick(+v);
  else if(a==='onext'){xoNew();render();}
  else if(a==='qpick')xqPick(+v);
  else if(a==='qrestart'){xqStart();render();}
});
SR.addEventListener('input',function(e){
  if(e.target.id==='xDate'){XDT.v=e.target.value||null;const o=$('xDateOut');if(o)o.innerHTML=xDateOut();}
});


// ═════════ 小測 ═════════
const Q={i:0,score:0,cur:null,fb:null,done:false,total:10};
const KIND_OPT={before:['未到','ยังไม่ถึง'],after:['過咗','เลยมาแล้ว'],around:['前後都得','ประมาณ'],exact:['啱啱好','พอดี']};
function qDigital(h,m){return pad2(h)+':'+pad2(m);}
function uniq(arr,key){const s={},o=[];arr.forEach(x=>{if(!s[key(x)]){s[key(x)]=1;o.push(x);}});return o;}
function newQ(){
  const type=['A','B','C','D'][Math.floor(Math.random()*4)];
  if(type==='A'){
    const h24=5+Math.floor(Math.random()*19),h=h12of(h24),m=Math.floor(Math.random()*12)*5;
    const pre=perPrefix(h24),ans=ziP(h,m);
    let cand=[ans,ziP(h,(m+5*(1+Math.floor(Math.random()*5)))%60),ziP(nextH(h),m),ziP(h,(60-m)%60),ziP(prevH(h),m)];
    cand=uniq(cand,x=>x.c);
    const opts=shuffle(cand.slice(0,1).concat(shuffle(cand.slice(1)).slice(0,3)));
    return {type,h,m,pre,ans:ans.c,opts:opts.map(o=>({c:pre.c+o.c,j:pre.j+' '+o.j})),right:pre.c+ans.c};
  }
  if(type==='B'){
    const N=1+Math.floor(Math.random()*4),H1=1+Math.floor(Math.random()*12);
    const useCha=Math.random()<.5, prompt=useCha?'差'+H[N][0]+'個字'+H[H1][0]+'點':'仲有'+H[N][0]+'個字就'+H[H1][0]+'點';
    const pj=useCha?'caa1 '+H[N][1]+' go3 zi6 '+H[H1][1]+' dim2':'zung6 jau5 '+H[N][1]+' go3 zi6 zau6 '+H[H1][1]+' dim2';
    const hp=prevH(H1),ans=[hp,60-5*N];
    const opts=shuffle([ans,[H1,5*N],[H1,60-5*N],[hp,5*N]]);
    return {type,prompt,pj,ask:'而家幾點？',opts:opts.map(o=>({d:qDigital(o[0],o[1])})),right:qDigital(ans[0],ans[1])};
  }
  if(type==='C'){
    const X=1+Math.floor(Math.random()*5),H1=1+Math.floor(Math.random()*12);
    const prompt=H[H1][0]+'點搭'+D[X][0],pj=H[H1][1]+' dim2 daap3 '+D[X][1];
    const hp=prevH(H1),ans=[H1,5*X];
    const opts=shuffle([ans,[H1,60-5*X],[hp,60-5*X],[hp,5*X]]);
    return {type,prompt,pj,ask:'分針疊住個「'+X+'」字 — 係幾點幾分？',opts:opts.map(o=>({d:qDigital(o[0],o[1])})),right:qDigital(ans[0],ans[1])};
  }
  const pool=[['差唔多H點','caa1 m4 do1 H dim2','before'],['就嚟H點喇','zau6 lai4 H dim2 laa3','before'],['仲有一個字就H點','zung6 jau5 jat1 go3 zi6 zau6 H dim2','before'],['H點左右','H dim2 zo2 jau6','around'],['大概H點','daai6 koi3 H dim2','around'],['H點幾','H dim2 gei2','after'],['H點零啲','H dim2 ling4 di1','after'],['過咗H點','gwo3 zo2 H dim2','after'],['啱啱H點','ngaam1 ngaam1 H dim2','exact'],['H點正','H dim2 zeng3','exact'],['準時H點','zeon2 si4 H dim2','exact']];
  const it=pool[Math.floor(Math.random()*pool.length)],H1=1+Math.floor(Math.random()*12);
  const c=it[0].replace('H',H[H1][0]),j=it[1].replace('H',H[H1][1]);
  const order=['before','after','around','exact'];
  return {type:'D',prompt:c,pj:j,ask:'呢句嘅意思係？',kinds:order,opts:order.map(k=>({k})),right:it[2],isKind:true};
}
function viewQuiz(){
  if(Q.done){
    return '<div class="result" id="res"><div class="re">🎉</div><div class="big" style="font-size:20px">完成！</div><div class="rs" id="rs">0 / '+Q.total*10+'</div><div class="th">เก่งมาก! 叻仔！</div><button class="retry" data-a="qrestart">再玩一次</button></div>';
  }
  if(!Q.cur)Q.cur=newQ();
  const q=Q.cur;let body='';
  const hdr='<div class="g-hdr"><span class="score-pill">★ '+Q.score+'</span><span class="round-pill">'+(Q.i+1)+' / '+Q.total+'</span></div>';
  if(q.type==='A'){
    body='<div class="q-card"><div class="q-prompt">而家幾點？揀啱嘅講法</div><span class="q-per">'+q.pre.c+'</span><div style="display:flex;justify-content:center"><div style="width:140px">'+clockSVG(q.h,q.m,'big')+'</div></div></div>';
  }else{
    body='<div class="q-card"><div class="q-prompt">'+q.ask+'</div><div class="q-jy">'+q.pj+'</div><div class="q-main">'+q.prompt+'</div><div style="margin-top:6px">'+spk(q.prompt)+'</div></div>';
  }
  const opts='<div class="opts">'+q.opts.map((o,i)=>{
    const val=q.isKind?o.k:(o.c||o.d);
    const cls='opt'+(Q.fb?(val===q.right?' ok':(Q.fb.pick===i?' bad':' dim')):'');
    let inner;
    if(q.isKind)inner='<span class="oc">'+KIND_OPT[o.k][0]+'</span><span class="th">'+KIND_OPT[o.k][1]+'</span>';
    else if(o.d)inner='<span class="od">'+o.d+'</span>';
    else inner='<span class="oj">'+o.j+'</span><span class="oc">'+o.c+'</span>';
    return '<button class="'+cls+'" '+(Q.fb?'':'data-a="qans" data-i="'+i+'"')+'>'+inner+'</button>';
  }).join('')+'</div>';
  let fb='';
  if(Q.fb){
    const rightTxt=q.isKind?KIND_OPT[q.right][0]:q.right;
    fb='<div class="fb '+(Q.fb.ok?'ok':'err')+'">'+(Q.fb.ok?'✓ 啱喇！':'✗ 正確係：'+rightTxt)+(q.type==='B'||q.type==='C'?'　（'+q.prompt+'）':'')+'</div>';
  }
  return hdr+body+opts+fb;
}
function qAnswer(i){
  if(Q.fb||Q.done)return;
  const q=Q.cur,o=q.opts[i],val=q.isKind?o.k:(o.c||o.d),ok=val===q.right;
  Q.fb={ok,pick:i};if(ok){Q.score+=10;}
  render();
  setTimeout(()=>{
    Q.i++;Q.fb=null;Q.cur=null;
    if(Q.i>=Q.total){Q.done=true;award(Q.score);}
    if(T.tab==='quiz'&&alive())render();
  },1300);
}
function celebrate(){
  const r=$('res');if(!r)return;
  const cols=['#0E6B57','#C1402A','#A9701C','#8A4B3B'];let f='';
  for(let i=0;i<18;i++)f+='<span class="confetti" style="left:'+Math.random()*100+'%;background:'+cols[i%4]+';border-radius:'+(Math.random()<.5?'0':'50%')+';animation-delay:'+(Math.random()*.3).toFixed(2)+'s"></span>';
  r.insertAdjacentHTML('beforeend',f);
  const el=$('rs'),to=Q.score;let st=null;
  const step=ts=>{if(!st)st=ts;const p=Math.min((ts-st)/700,1);el.textContent=Math.round(to*p)+' / '+Q.total*10;if(p<1)requestAnimationFrame(step);};
  requestAnimationFrame(step);
}


// ═════════ 語音（唔蓋走主 App 嘅 onvoiceschanged） ═════════
const Speech={voices:[],ok:'speechSynthesis' in window,
  init(){if(!this.ok)return;const l=()=>{this.voices=speechSynthesis.getVoices();};l();if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',l);},
  say(t){if(!this.ok)return;
    const go=()=>{const u=new SpeechSynthesisUtterance(t);
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.startsWith('zh'));
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();}};   // Chrome：cancel 後即刻 speak 會被吞

// ═════════ 同主 App 接駁 ═════════
const barEl=document.getElementById('tm-bar'),hostEl=document.getElementById('tm-host'),gameBox=document.getElementById('tm-gamebox');
function alive(){return !!(hostEl&&hostEl.offsetParent!==null);}
function award(n){   // 小測得分計入主 App 嘅 ★ 總分
  try{
    var prev=S.totalScore;S.totalScore+=n;
    var chip=document.getElementById('totalScore');
    animateNumber(chip,prev,S.totalScore,600,'','★ ');
    chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');
    S.scoreHistory.push({game:'tq',score:n,time:new Date().toLocaleTimeString('en-HK',{hour:'2-digit',minute:'2-digit'})});
    if(typeof renderHistory==='function')renderHistory();
  }catch(e){console.warn('[時間] 計分失敗',e);}
}
function stopGameTimer(){try{if(typeof GS!=='undefined'&&GS.tab==='time')clearTimeout(GS.timer);}catch(e){}}
function render(){
  barEl.innerHTML=TABS.map(t=>'<button class="tm-tab'+(T.tab===t[0]?' act':'')+'" data-tm="'+t[0]+'">'+t[1]+'</button>').join('');
  const isGame=T.tab==='game';
  hostEl.style.display=isGame?'none':'';gameBox.style.display=isGame?'':'none';
  if(isGame){initGame('time');return;}      // 原本「遊戲」入面嘅時間遊戲（Lv1–3），已搬入呢頁
  stopGameTimer();
  const v=$('view');
  SP.length=0;
  if(T.tab==='per')v.innerHTML=viewPer();
  else if(T.tab==='hour')v.innerHTML=viewHour();
  else if(T.tab==='zi'){v.innerHTML=viewZi();wsBind();wsUpdate();}
  else if(T.tab==='near')v.innerHTML=viewNear();
  else if(T.tab==='sen')v.innerHTML=viewSen();
  else if(T.tab==='dian'){v.innerHTML=viewDian();xdBind();}
  else if(T.tab==='dur')v.innerHTML=viewDur();
  else if(T.tab==='date')v.innerHTML=viewDate();
  else if(T.tab==='nan')v.innerHTML=viewNan();
  else if(T.tab==='dq')v.innerHTML=viewDq();
  else {v.innerHTML=viewQuiz();if(Q.done)celebrate();}
}
function wsBind(){
  $('sH').addEventListener('input',e=>{T.ws.h24=+e.target.value;SP.length=0;wsUpdate();});
  $('sM').addEventListener('input',e=>{T.ws.m=+e.target.value;SP.length=0;wsUpdate();});
}
barEl.addEventListener('click',e=>{
  const b=e.target.closest('[data-tm]');if(!b)return;
  if(T.tab==='game')stopGameTimer();
  T.tab=b.dataset.tm;
  try{window.scrollTo(0,0);}catch(_){}
  render();
});
SR.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]');if(!el)return;
  const a=el.dataset.a;
  if(a==='speak'){e.stopPropagation();Speech.say(SP[+el.dataset.i]);return;}
  if(a==='per'){T.per=T.per===el.dataset.id?null:el.dataset.id;render();}
  else if(a==='eg'){T.eg=el.dataset.id;render();}
  else if(a==='sg'){T.sg=el.dataset.id;render();}
  else if(a==='qans'){qAnswer(+el.dataset.i);}
  else if(a==='qrestart'){Q.i=0;Q.score=0;Q.cur=null;Q.fb=null;Q.done=false;render();}
});
window.tmShow=function(){render();};                                   // 入返「時間」分頁
window.tmLeave=function(){stopGameTimer();try{speechSynthesis.cancel();}catch(e){}};
Speech.init();
render();
})();

