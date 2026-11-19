(function(){
'use strict';
var host=document.getElementById('anto-host'); if(!host||!host.attachShadow)return;
var CSS_TEXT=":host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%}\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:host{\n  --bg:#F1F0E4;--surface:#fff;--surface2:#E7E6D6;--border:#D9D6C4;\n  --text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;\n  --accent:#0E6B57;--accent-bg:#E3EFE9;\n  --yellow:#A9701C;--yellow-bg:#F8EDDA;\n  --green:#1D8A5C;--green-bg:#E6F4EC;\n  --red:#C1402A;--red-bg:#FAEAE4;\n  --radius:12px;--shadow:0 1px 4px rgba(0,0,0,.08);--serif:'Noto Serif TC',serif;\n}\n.page{display:none}\n.page.act{display:block}\n.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:20px 0 4px;display:flex;align-items:center;gap:7px}\n.sec:first-child{margin-top:0}\n.sec-thai{font-family:'Noto Sans Thai';font-size:12px;color:var(--text-sub);margin-bottom:10px}\n.filter-bar{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:14px;padding-bottom:2px}\n.filter-bar::-webkit-scrollbar{display:none}\n.f-btn{flex-shrink:0;padding:5px 13px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;cursor:pointer;font-family:inherit;font-weight:500}\n.f-btn.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.seg{display:inline-flex;background:var(--surface2);border-radius:20px;padding:3px;margin-bottom:12px;gap:2px}\n.seg-btn{border:none;background:transparent;padding:6px 16px;border-radius:17px;font-size:13px;font-weight:600;color:var(--text-sub);cursor:pointer;font-family:inherit}\n.seg-btn.act{background:var(--surface);color:var(--accent);box-shadow:var(--shadow)}\n.pairs{display:grid;grid-template-columns:1fr;gap:10px}\n.pair{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:10px;display:grid;grid-template-columns:1fr auto 1fr;gap:6px;align-items:stretch}\n.pair.solo{grid-template-columns:1fr}\n.vs{display:flex;align-items:center;color:var(--text-muted);font-size:18px}\n.side{border-radius:10px;padding:8px 6px;text-align:center;cursor:pointer;position:relative;transition:transform .12s}\n.side:active{transform:scale(.97)}\n.side.a{background:var(--green-bg)}\n.side.b{background:var(--red-bg)}\n.side .j{font-family:'Space Mono';font-size:11px;color:var(--accent)}\n.side.b .j{color:var(--red)}\n.side .c{font-family:var(--serif);font-size:28px;font-weight:900;line-height:1.3}\n.side .t{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub)}\n.side .sp{position:absolute;top:4px;right:6px;font-size:11px;opacity:.45}\n.note{grid-column:1/-1;font-size:12px;color:var(--yellow);background:var(--yellow-bg);border-radius:8px;padding:6px 10px}\n.deg-row{display:flex;align-items:center;gap:10px;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:9px 12px;margin-bottom:7px;box-shadow:var(--shadow);cursor:pointer}\n.deg-w{min-width:92px}\n.deg-w b{font-family:var(--serif);font-size:18px}\n.deg-w div{font-family:'Space Mono';font-size:10px;color:var(--accent)}\n.deg-bar{flex:1;height:8px;background:var(--surface2);border-radius:8px;overflow:hidden;min-width:40px}\n.deg-bar i{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,#E8B04A,var(--accent))}\n.deg-th{font-family:'Noto Sans Thai';font-size:12px;color:var(--text-sub);min-width:92px;text-align:right}\n.sec-row{display:flex;align-items:flex-end;justify-content:space-between;gap:8px}\n.exp-btn{flex-shrink:0;border:1.5px solid var(--accent);background:var(--accent-bg);color:var(--accent);border-radius:20px;padding:5px 14px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;margin-bottom:10px}\n.dcard{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:16px 14px 12px;text-align:center;cursor:pointer}\n.dcard .dw{font-family:var(--serif);font-size:34px;font-weight:900;line-height:1.3}\n.dcard .dj{font-family:'Space Mono';font-size:12px;color:var(--accent)}\n.dcard .dt{font-family:'Noto Sans Thai';font-size:14px;color:var(--text-sub);margin-top:2px}\n.dcard .da{font-size:11px;color:var(--text-muted);margin-top:2px}\n.dcard .dex{margin:10px auto 8px;background:var(--accent-bg);border-radius:10px;padding:6px 12px;display:inline-block;font-size:14px}\n.dcard .dex small{font-family:'Noto Sans Thai';color:var(--text-sub);margin-left:6px}\n.dcard .deg-bar{height:12px;margin-top:6px}\n.dslide{padding:6px 4px 0}\n.dslide input[type=range]{width:100%;accent-color:var(--accent);height:32px}\n.dslide .ends{display:flex;justify-content:space-between;font-size:12px;color:var(--text-sub);margin-top:-4px}\n.tips{background:var(--yellow-bg);border:1.5px solid #ecd9b0;border-radius:var(--radius);padding:12px 14px;font-size:13px;margin:12px 0;line-height:1.8}\n.tips .tt{font-family:'Noto Sans Thai';font-size:12px;color:var(--text-sub)}\n.sel{width:100%;border:1.5px solid var(--border);background:var(--surface);border-radius:10px;padding:9px 12px;font-size:15px;font-family:inherit;color:var(--text);margin-bottom:12px}\n.lad{display:flex;align-items:center;gap:10px;border-radius:10px;padding:8px 12px;margin-bottom:6px;border:1.5px solid var(--border);background:var(--surface);cursor:pointer}\n.lad .ph{font-family:var(--serif);font-size:20px;font-weight:700;min-width:110px}\n.lad .jt{flex:1;min-width:0}\n.lad .jt div:first-child{font-family:'Space Mono';font-size:11px;color:var(--accent)}\n.lad .jt div:last-child{font-family:'Noto Sans Thai';font-size:12px;color:var(--text-sub)}\n.lad.mid{background:var(--yellow-bg);border-color:#ecd9b0}\n.lad.warn{border-style:dashed}\n.lad .sp{font-size:12px;opacity:.5}\n.empty{font-size:13px;color:var(--text-sub);background:var(--surface2);border-radius:10px;padding:12px;margin-bottom:10px}\n.g-hdr{display:flex;justify-content:space-between;margin-bottom:12px}\n.score-pill{background:var(--yellow-bg);border:1.5px solid #ecd9b0;color:var(--yellow);padding:4px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:14px}\n.round-pill{background:var(--surface2);border:1.5px solid var(--border);padding:4px 14px;border-radius:20px;font-family:'Space Mono';font-size:13px;color:var(--text-sub)}\n.q-card{background:var(--surface);border:2px solid var(--border);border-radius:14px;padding:18px 20px;text-align:center;box-shadow:var(--shadow);margin-bottom:12px}\n.q-card .qc{font-family:var(--serif);font-size:38px;font-weight:900}\n.q-card .qj{font-family:'Space Mono';font-size:12px;color:var(--accent)}\n.q-card .qt{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub);margin-top:4px}\n.opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.opt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:12px 8px;cursor:pointer;font-family:inherit;color:var(--text);display:flex;flex-direction:column;align-items:center;gap:2px;box-shadow:var(--shadow)}\n.opt:hover{border-color:var(--accent);background:var(--accent-bg)}\n.opt .oj{font-family:'Space Mono';font-size:11px;color:var(--accent)}\n.opt .oc{font-size:20px;font-weight:700}\n.opt .ot{font-family:'Noto Sans Thai';font-size:14px;font-weight:600}\n.opt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.opt.no{border-color:var(--red)!important;background:var(--red-bg)!important}\n.opt.dim{opacity:.35;pointer-events:none}\n.fb{margin-top:12px;padding:10px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid}\n.fb.ok{background:var(--green-bg);color:var(--green);border-color:#bde3cd}\n.fb.err{background:var(--red-bg);color:var(--red);border-color:#f0c4b8}\n.result{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:30px 20px;text-align:center;box-shadow:var(--shadow)}\n.result .re{font-size:50px}\n.result .rt{font-family:var(--serif);font-size:20px;font-weight:700}\n.result .rs{font-family:'Space Mono';font-size:32px;font-weight:700;color:var(--accent);margin:6px 0}\n.retry{background:var(--accent);color:#fff;border:none;border-radius:10px;padding:10px 28px;font-weight:700;cursor:pointer;font-family:inherit;font-size:14px;margin-top:8px}\n@media (min-width:720px){.pairs{grid-template-columns:1fr 1fr}\n.side .c{font-size:32px}\n#page-quiz,#page-deg{max-width:640px;margin:0 auto}}@media (min-width:1100px){.pairs{grid-template-columns:1fr 1fr 1fr}#page-quiz,#page-deg{max-width:720px}}\n";
var SR=host.attachShadow({mode:'open'});
SR.innerHTML='<style>'+CSS_TEXT+'</style><div class="page act" id="page-learn"></div><div class="page" id="page-deg"></div><div class="page" id="page-quiz"></div>';
// ═════════ 資料 ═════════
const W=(c,j,t)=>({c,j,t});
// 每組：pairs = [詞A, 詞B（可以係 null＝單獨詞）, 選項]
// 選項：note 備註；spec:false 唔做雙向尺；ng:true 唔適合加程度詞
const GROUPS=[
 {id:'shape',icon:'📏',title:'高矮肥瘦・闊窄長短',thai:'รูปร่างและขนาด',pairs:[
  [W('高','gou1','สูง'),W('矮','ngai2','เตี้ย'),{note:'講人嘅身高：高 ↔ 矮'}],
  [W('肥','fei4','อ้วน'),W('瘦','sau3','ผอม')],
  [W('大','daai6','ใหญ่'),W('細','sai3','เล็ก')],
  [W('長','coeng4','ยาว'),W('短','dyun2','สั้น')],
  [W('闊','fut3','กว้าง'),W('窄','zaak3','แคบ')],
  [W('厚','hau5','หนา'),W('薄','bok6','บาง')],
  [W('粗','cou1','หนา/หยาบ (เส้นใหญ่)'),W('幼','jau3','เล็ก/ละเอียด (เส้นเล็ก)')],
 ]},
 {id:'place',icon:'📍',title:'高低遠近・深淺',thai:'ตำแหน่งและระยะทาง',pairs:[
  [W('高','gou1','สูง'),W('低','dai1','ต่ำ'),{note:'講位置、價錢、聲音：高 ↔ 低'}],
  [W('遠','jyun5','ไกล'),W('近','kan5','ใกล้')],
  [W('深','sam1','ลึก'),W('淺','cin2','ตื้น')],
 ]},
 {id:'speed',icon:'⚡',title:'快慢・輕重・多少・新舊',thai:'ความเร็ว น้ำหนัก ปริมาณ',pairs:[
  [W('快','faai3','เร็ว'),W('慢','maan6','ช้า')],
  [W('早','zou2','เช้า/เร็ว'),W('晚','maan5','ดึก/ค่ำ/ช้า'),{note:'好早 = เช้า/เร็วมาก；好晚 = ดึก/ค่ำมาก'}],
  [W('輕','hing1','เบา'),W('重','cung5','หนัก')],
  [W('多','do1','เยอะ'),W('少','siu2','น้อย')],
  [W('新','san1','ใหม่'),W('舊','gau6','เก่า')],
  [W('貴','gwai3','แพง'),W('平','peng4','ถูก')],
 ]},
 {id:'cond',icon:'✨',title:'乾淨污糟・光暗・靜嘈・軟硬',thai:'สภาพและความรู้สึก',pairs:[
  [W('乾淨','gon1 zeng6','สะอาด'),W('污糟','wu1 zou1','สกปรก'),{note:'邋遢 laat6 taat3 = สกปรกรุงรัง ไม่เป็นระเบียบ (ใช้กับห้อง/คน/ของ)'}],
  [W('乾','gon1','แห้ง'),W('濕','sap1','เปียก/ชื้น')],
  [W('光','gwong1','สว่าง'),W('暗','am3','มืด')],
  [W('靜','zing6','เงียบ'),W('嘈','cou4','หนวกหู/เสียงดัง')],
  [W('硬','ngaang6','แข็ง'),W('淋','lam4','นิ่ม/อ่อน'),{note:'淋 lam4 = นิ่ม ยังพูดว่า 軟 jyun5 ได้'}],
  [W('熱','jit6','ร้อน'),W('凍','dung3','เย็น/หนาว'),{note:'天氣／飲品 都用 凍；冷 laang5 亦得'}],
 ]},
 {id:'taste',icon:'👅',title:'味道：甜酸苦辣鹹・濃淡',thai:'รสชาติ',pairs:[
  [W('濃','nung4','เข้มข้น'),W('淡','daam6','จืด/อ่อน'),{note:'味道濃／味道淡；湯、茶、咖啡都可以講'}],
  [W('好食','hou2 sik6','อร่อย'),W('難食','naan4 sik6','ไม่อร่อย')],
  [W('甜','tim4','หวาน'),null],
  [W('酸','syun1','เปรี้ยว'),null],
  [W('苦','fu2','ขม'),null],
  [W('辣','laat6','เผ็ด'),null,{note:'問：辣唔辣？ 答：好辣／唔辣'}],
  [W('鹹','haam4','เค็ม'),null],
  [W('香','hoeng1','หอม'),null],
  [W('臭','cau3','เหม็น'),null],
 ]},
 {id:'hungry',icon:'🍚',title:'肚餓・飽・夠唔夠',thai:'หิว อิ่ม พอ-ไม่พอ',pairs:[
  [W('肚餓','tou5 ngo6','หิว'),W('飽','baau2','อิ่ม')],
  [W('夠','gau3','พอ'),W('唔夠','m4 gau3','ไม่พอ'),{ng:true,note:'問：夠唔夠？ 答：夠喇／唔夠'}],
  [W('有','jau5','มี'),W('冇','mou5','ไม่มี'),{ng:true,note:'問：有冇？'}],
  [W('渴','hot3','กระหายน้ำ'),null],
 ]},
 {id:'feel',icon:'🙂',title:'人同感覺',thai:'คนและความรู้สึก',pairs:[
  [W('開心','hoi1 sam1','มีความสุข'),W('唔開心','m4 hoi1 sam1','ไม่มีความสุข')],
  [W('精神','zing1 san4','สดชื่น/กระปรี้กระเปร่า'),W('攰','gui6','เหนื่อย')],
  [W('勤力','kan4 lik6','ขยัน'),W('懶','laan5','ขี้เกียจ')],
  [W('靚','leng3','สวย'),W('醜','cau2','น่าเกลียด')],
  [W('好','hou2','ดี'),W('壞','waai6','เสีย')],
  [W('容易','jung4 ji6','ง่าย'),W('難','naan4','ยาก')],
  [W('忙','mong4','ยุ่ง'),W('得閒','dak1 haan4','ว่าง')],
 ]},
];

// 程度詞（由強到弱）
const DEG=[
 {w:'超級',j:'ciu1 kap1',alt:'極度 gik6 dou6',pct:100,th:'สุดๆ / ที่สุด',f:t=>t+'สุดๆ'},
 {w:'非常',j:'fei1 soeng4',alt:'十分 sap6 fan1',pct:88,th:'มากๆ / อย่างยิ่ง',f:t=>t+'มากๆ'},
 {w:'好',j:'hou2',alt:'日常最常用',pct:74,th:'มาก',f:t=>t+'มาก'},
 {w:'都幾',j:'dou1 gei2',alt:'幾 gei2',pct:58,th:'ค่อนข้าง',f:t=>'ค่อนข้าง'+t},
 {w:'有啲',j:'jau5 di1',alt:'',pct:42,th:'นิดหน่อย',f:t=>t+'นิดหน่อย'},
 {w:'唔係太',j:'m4 hai6 taai3',alt:'',pct:26,th:'ไม่ค่อย…',f:t=>'ไม่ค่อย'+t},
 {w:'唔',j:'m4',alt:'',pct:12,th:'ไม่…',f:t=>'ไม่'+t},
 {w:'一啲都唔',j:'jat1 di1 dou1 m4',alt:'',pct:0,th:'ไม่…เลยสักนิด',f:t=>'ไม่'+t+'เลยสักนิด'},
];
const TAAI={w:'太',j:'taai3',th:'…เกินไป',f:t=>t+'เกินไป'};

// ═════════ 工具 ═════════
const $=id=>SR.getElementById(id);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const th1=t=>t.split(/[\/(]/)[0].trim();
const ENT=[];
GROUPS.forEach(g=>g.pairs.forEach(p=>ENT.push({g:g.id,a:p[0],b:p[1],o:p[2]||{}})));
const ladderable=(e,w)=>!e.o.ng&&w.c.indexOf('唔')!==0;
const specOK=e=>!!e.b&&e.o.spec!==false&&!e.o.ng;

const Speech={ok:'speechSynthesis' in window,supported:'speechSynthesis' in window,voices:[],
  init(){if(!this.ok)return;const l=()=>{this.voices=speechSynthesis.getVoices();};l();if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',l);},
  say(t){if(!this.ok)return;
    const go=()=>{const u=new SpeechSynthesisUtterance(String(t).replace(/_+/g,' '));
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.indexOf('zh')===0);
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();},   // Chrome：cancel 後即刻 speak 會被吞
  speak(t){this.say(t);}};

const ST={tab:'learn',grp:'all',sel:0,mode:'spec',side:'a',degOpen:false,degVal:4};

// ═════════ 相反詞頁 ═════════
function wordSide(w,cls){
  return '<div class="side '+cls+'" data-say="'+w.c+'"><span class="sp">🔊</span><div class="j">'+w.j+'</div><div class="c">'+w.c+'</div><div class="t">'+w.t+'</div></div>';
}
function pairHtml(e){
  const note=e.o.note?'<div class="note">💡 '+e.o.note+'</div>':'';
  if(!e.b)return '<div class="pair solo">'+wordSide(e.a,'a')+note+'</div>';
  return '<div class="pair">'+wordSide(e.a,'a')+'<div class="vs">↔</div>'+wordSide(e.b,'b')+note+'</div>';
}
function renderLearn(){
  const bar='<div class="filter-bar">'
    +'<button class="f-btn'+(ST.grp==='all'?' act':'')+'" data-grp="all">全部</button>'
    +GROUPS.map(g=>'<button class="f-btn'+(ST.grp===g.id?' act':'')+'" data-grp="'+g.id+'">'+g.icon+' '+g.title.split('・')[0]+'</button>').join('')
    +'</div>';
  const body=GROUPS.filter(g=>ST.grp==='all'||ST.grp===g.id).map(g=>
    '<div class="sec">'+g.icon+' '+g.title+'</div><div class="sec-thai">'+g.thai+'　（撳卡片可以聽發音）</div>'
    +'<div class="pairs">'+ENT.filter(e=>e.g===g.id).map(pairHtml).join('')+'</div>'
  ).join('');
  $('page-learn').innerHTML=bar+body;
}

// ═════════ 程度頁 ═════════
function ladRow(ph,jy,thai,cls,say){
  return '<div class="lad '+(cls||'')+'" data-say="'+say+'"><div class="ph">'+ph+'</div><div class="jt"><div>'+jy+'</div><div>'+thai+'</div></div><span class="sp">🔊</span></div>';
}
// 滑桿：0 = 一啲都唔（最左）… 7 = 超級（最右）
function degCardInner(){
  const d=DEG[7-ST.degVal];
  return '<div class="dj">'+d.j+'</div><div class="dw">'+d.w+'</div><div class="dt">'+d.th+'</div>'
    +(d.alt?'<div class="da">'+d.alt+'</div>':'')
    +'<div class="dex">例：<b>'+d.w+'大</b><small>'+d.f('ใหญ่')+'</small></div>'
    +'<div class="deg-bar"><i style="width:'+Math.max(d.pct,3)+'%"></i></div>';
}
function renderDeg(){
  const refAll=DEG.map(d=>
    '<div class="deg-row" data-say="'+d.w+'"><div class="deg-w"><b>'+d.w+'</b><div>'+d.j+'</div></div>'
    +'<div class="deg-bar"><i style="width:'+Math.max(d.pct,4)+'%"></i></div>'
    +'<div class="deg-th">'+d.th+'</div></div>'
    +(d.alt?'<div style="font-size:11px;color:var(--text-muted);margin:-3px 0 8px 14px">'+(d.pct===100||d.pct===88?'同義：':'')+d.alt+'</div>':'')
  ).join('');
  const ref=ST.degOpen?refAll
    :'<div class="dcard" id="degCard" data-say-deg="1">'+degCardInner()+'</div>'
     +'<div class="dslide"><input type="range" id="degSlider" min="0" max="7" step="1" value="'+ST.degVal+'">'
     +'<div class="ends"><span>← 一啲都唔</span><span>超級 →</span></div></div>';
  const tips='<div class="tips">'
    +'• <b>好</b> + 形容詞 ＝「很」，唔係「好」嘅意思！好大＝很大<br>'
    +'• 日常最常用：<b>好</b>、<b>都幾</b>；<b>超級／極度／非常／十分</b> 語氣更重<br>'
    +'• <b>太</b> + 形容詞 ＝ 太過頭（太貴＝แพงเกินไป）<br>'
    +'• 小心：<b>唔大</b> ≠ <b>細</b>（ไม่ใหญ่ ≠ เล็ก），<b>唔高</b> ≠ <b>矮</b><br>'
    +'<div class="tt">好 = “มาก” ไม่ใช่ “ดี” · 唔係太 = ไม่ค่อย · 太 = เกินไป · ไม่ใหญ่ ≠ เล็ก</div></div>';

  const opts=GROUPS.map(g=>'<optgroup label="'+g.icon+' '+g.title+'">'
    +ENT.map((e,i)=>({e,i})).filter(x=>x.e.g===g.id).map(x=>'<option value="'+x.i+'"'+(x.i===ST.sel?' selected':'')+'>'+x.e.a.c+(x.e.b?' ↔ '+x.e.b.c:'')+'</option>').join('')
    +'</optgroup>').join('');

  const e=ENT[ST.sel];
  let tool='';
  const canSpec=specOK(e);
  const mode=(ST.mode==='spec'&&canSpec)?'spec':'lad';
  tool+='<div class="seg"><button class="seg-btn'+(mode==='spec'?' act':'')+'" data-mode="spec">↔ 雙向尺</button><button class="seg-btn'+(mode==='lad'?' act':'')+'" data-mode="lad">📶 程度表</button></div>';

  if(mode==='spec'){
    const rows=[];
    for(let i=0;i<4;i++){
      const d=DEG[i];
      rows.push(ladRow(d.w+e.a.c,d.j+' '+e.a.j,d.f(th1(e.a.t)),'" style="background:rgba(14,107,87,'+[.24,.17,.11,.06][i]+')',d.w+e.a.c));
    }
    const single=e.a.c.length===1&&e.b.c.length===1;
    const mc=single?'唔'+e.a.c+'唔'+e.b.c:'一般般';
    const mj=single?'m4 '+e.a.j+' m4 '+e.b.j:'jat1 bun1 bun1';
    rows.push(ladRow(mc,mj,'กลางๆ / พอดี','mid',mc));
    for(let i=3;i>=0;i--){
      const d=DEG[i];
      rows.push(ladRow(d.w+e.b.c,d.j+' '+e.b.j,d.f(th1(e.b.t)),'" style="background:rgba(193,64,42,'+[.22,.15,.10,.05][i]+')',d.w+e.b.c));
    }
    tool+='<div style="font-size:12px;color:var(--text-sub);margin-bottom:8px">由「'+e.a.c+'」到「'+e.b.c+'」，撳每行可以聽發音</div>'+rows.join('');
  }else{
    const hasB=!!e.b;
    const w=(ST.side==='b'&&hasB)?e.b:e.a;
    if(hasB)tool+='<div class="seg" style="margin-left:8px"><button class="seg-btn'+(w===e.a?' act':'')+'" data-side="a">'+e.a.c+'</button><button class="seg-btn'+(w===e.b?' act':'')+'" data-side="b">'+e.b.c+'</button></div>';
    if(!ladderable(e,w)){
      tool+='<div class="empty">「'+w.c+'」唔適合加程度詞（本身已經係否定或者係「有／夠」呢類詞）。試下揀另一邊或者另一組。</div>';
    }else{
      const t=th1(w.t);
      tool+=DEG.map(d=>ladRow(d.w+w.c,d.j+' '+w.j,d.f(t),'',d.w+w.c)).join('');
      tool+=ladRow(TAAI.w+w.c,TAAI.j+' '+w.j,TAAI.f(t)+' ⚠️','warn',TAAI.w+w.c);
    }
  }
  $('page-deg').innerHTML=
    '<div class="sec-row"><div><div class="sec" style="margin-bottom:4px">📏 程度詞一覽</div><div class="sec-thai" style="margin-bottom:10px">'+(ST.degOpen?'คำบอกระดับ จากมากที่สุด → น้อยที่สุด':'ลากแถบซ้าย-ขวา เพื่อดูระดับ')+'</div></div>'
    +'<button class="exp-btn" data-act="degtoggle">'+(ST.degOpen?'收埋 ▴':'展開全部 ▾')+'</button></div>'+ref+tips
    +'<div class="sec">🔧 試下加落形容詞</div><div class="sec-thai">เลือกคู่คำ แล้วดูระดับต่างๆ</div>'
    +'<select class="sel" id="pairSel">'+opts+'</select>'+tool;
}

// ═════════ 練習頁 ═════════
const QN=10;
const Q={mode:'opp',i:0,score:0,cur:null,fb:null,done:false,lock:false,timer:null};
const OPP={};
ENT.forEach(e=>{if(!e.b||e.o.ng)return;(OPP[e.a.c]=OPP[e.a.c]||new Set()).add(e.b.c);(OPP[e.b.c]=OPP[e.b.c]||new Set()).add(e.a.c);});
const WORDS={};
ENT.forEach(e=>{if(e.o.ng)return;WORDS[e.a.c]=e.a;if(e.b)WORDS[e.b.c]=e.b;});
const LADS=[];
ENT.forEach(e=>{[e.a,e.b].forEach(w=>{if(w&&ladderable(e,w)&&!LADS.some(x=>x.c===w.c))LADS.push(w);});});

function newQ(){
  if(Q.mode==='opp'){
    const cands=Object.keys(OPP);
    const x=WORDS[cands[Math.floor(Math.random()*cands.length)]];
    const ops=[...OPP[x.c]];
    const correct=WORDS[ops[Math.floor(Math.random()*ops.length)]];
    const bad=new Set([x.c,...ops]);
    const wrong=shuffle(Object.keys(WORDS).filter(c=>!bad.has(c))).slice(0,3).map(c=>WORDS[c]);
    Q.cur={q:x,correct,options:shuffle([correct,...wrong]),valid:ops};
  }else{
    const w=LADS[Math.floor(Math.random()*LADS.length)];
    const di=Math.floor(Math.random()*DEG.length);
    const t=th1(w.t);
    const others=shuffle(DEG.map((_,k)=>k).filter(k=>k!==di)).slice(0,3);
    const opts=shuffle([di,...others]).map(k=>({k,t:DEG[k].f(t)}));
    Q.cur={w,d:DEG[di],di,options:opts,t:DEG[di].f(t)};
  }
  Q.fb=null;Q.lock=false;
}
function quizStart(mode){
  clearTimeout(Q.timer);
  Q.mode=mode||Q.mode;Q.i=0;Q.score=0;Q.done=false;newQ();renderQuiz();
}
function renderQuiz(){
  const seg='<div class="seg"><button class="seg-btn'+(Q.mode==='opp'?' act':'')+'" data-qmode="opp">↔ 相反詞</button><button class="seg-btn'+(Q.mode==='deg'?' act':'')+'" data-qmode="deg">📏 程度詞</button></div>';
  if(Q.done){
    const pct=Q.score/(QN*10);
    $('page-quiz').innerHTML=seg+'<div class="result"><div class="re">'+(pct>=.8?'🏆':pct>=.5?'👍':'💪')+'</div><div class="rt">完成！</div><div class="rs">'+Q.score+' / '+(QN*10)+'</div><div style="font-family:\'Noto Sans Thai\';font-size:13px;color:var(--text-sub)">เก่งมาก! 叻仔！</div><button class="retry" data-act="restart">再玩一次</button></div>';
    return;
  }
  const c=Q.cur;let card='',opts='',fb='';
  if(Q.mode==='opp'){
    card='<div class="q-card" data-say="'+c.q.c+'"><div style="font-size:12px;color:var(--text-sub);margin-bottom:6px">「'+c.q.c+'」嘅相反詞係？</div><div class="qj">'+c.q.j+'</div><div class="qc">'+c.q.c+'</div><div class="qt">'+c.q.t+'</div></div>';
    opts=c.options.map((o,i)=>{
      const isOk=c.valid.indexOf(o.c)>=0;
      const cls='opt'+(Q.fb?(isOk?' ok':(Q.fb.pick===i?' no':' dim')):'');
      return '<button class="'+cls+'" data-pick="'+i+'"><span class="oj">'+o.j+'</span><span class="oc">'+o.c+'</span></button>';
    }).join('');
    if(Q.fb)fb='<div class="fb '+(Q.fb.ok?'ok':'err')+'">'+(Q.fb.ok?'✓ 啱喇！':'✗ 係「'+c.correct.c+'」('+c.correct.j+') — '+c.correct.t)+'</div>';
  }else{
    card='<div class="q-card" data-say="'+c.d.w+c.w.c+'"><div style="font-size:12px;color:var(--text-sub);margin-bottom:6px">呢句泰文係咩意思？</div><div class="qj">'+c.d.j+' '+c.w.j+'</div><div class="qc">'+c.d.w+c.w.c+'</div></div>';
    opts=c.options.map((o,i)=>{
      const isOk=o.k===c.di;
      const cls='opt'+(Q.fb?(isOk?' ok':(Q.fb.pick===i?' no':' dim')):'');
      return '<button class="'+cls+'" data-pick="'+i+'"><span class="ot">'+o.t+'</span></button>';
    }).join('');
    if(Q.fb)fb='<div class="fb '+(Q.fb.ok?'ok':'err')+'">'+(Q.fb.ok?'✓ 啱喇！':'✗ '+c.d.w+c.w.c+' ＝ '+c.t)+'</div>';
  }
  $('page-quiz').innerHTML=seg
    +'<div class="g-hdr"><span class="score-pill">★ '+Q.score+'</span><span class="round-pill">'+(Q.i+1)+' / '+QN+'</span></div>'
    +card+'<div class="opts">'+opts+'</div>'+fb;
}
function quizPick(i){
  if(Q.lock||Q.done)return;
  const c=Q.cur;const o=c.options[i];
  const ok=Q.mode==='opp'?c.valid.indexOf(o.c)>=0:o.k===c.di;
  Q.lock=true;Q.fb={pick:i,ok};
  if(ok){Q.score+=10;award(10,'aq',false);}
  renderQuiz();
  Q.timer=setTimeout(()=>{
    Q.i++;
    if(Q.i>=QN){Q.done=true;award(0,'aq',false);}else{newQ();}
    renderQuiz();
  },1200);
}

function award(n,key,hist){   // 計入主 App 嘅 ★ 總分
  try{
    var prev=S.totalScore;S.totalScore+=n;
    var chip=document.getElementById('totalScore');
    animateNumber(chip,prev,S.totalScore,600,'','★ ');
    chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');
    if(hist){S.scoreHistory.push({game:key,score:n,time:new Date().toLocaleTimeString('en-HK',{hour:'2-digit',minute:'2-digit'})});if(typeof renderHistory==='function')renderHistory();}
  }catch(e){console.warn('[計分失敗]',e);}
}
// ═════════ 路由／事件 ═════════
const ATABS=[['learn','📖 相反詞'],['deg','📏 程度'],['quiz','📝 練習']];
const barEl=document.getElementById('anto-bar');
function openTab(t){
  ST.tab=t;
  barEl.innerHTML=ATABS.map(x=>'<button class="tm-tab'+(x[0]===t?' act':'')+'" data-at="'+x[0]+'">'+x[1]+'</button>').join('');
  SR.querySelectorAll('.page').forEach(p=>p.classList.toggle('act',p.id==='page-'+t));
  if(t==='learn')renderLearn();
  if(t==='deg')renderDeg();
  if(t==='quiz'){if(!Q.cur)quizStart();else renderQuiz();}
  try{window.scrollTo(0,0);}catch(e){}
}
barEl.addEventListener('click',e=>{const b=e.target.closest('[data-at]');if(b)openTab(b.dataset.at);});
SR.addEventListener('click',e=>{
  const g=e.target.closest('[data-grp]');if(g){ST.grp=g.dataset.grp;renderLearn();return;}
  const m=e.target.closest('[data-mode]');if(m){ST.mode=m.dataset.mode;renderDeg();return;}
  const s=e.target.closest('[data-side]');if(s){ST.side=s.dataset.side;renderDeg();return;}
  const qm=e.target.closest('[data-qmode]');if(qm){quizStart(qm.dataset.qmode);return;}
  const p=e.target.closest('[data-pick]');if(p){quizPick(+p.dataset.pick);return;}
  const a=e.target.closest('[data-act]');
  if(a&&a.dataset.act==='restart'){quizStart();return;}
  if(a&&a.dataset.act==='degtoggle'){ST.degOpen=!ST.degOpen;renderDeg();return;}
  if(e.target.closest('#degCard')){const d=DEG[7-ST.degVal];Speech.say(d.w+'大');return;}
  const sy=e.target.closest('[data-say]');if(sy){Speech.say(sy.dataset.say);}
});
SR.addEventListener('input',e=>{
  if(e.target.id==='degSlider'){ST.degVal=+e.target.value;$('degCard').innerHTML=degCardInner();}
});
SR.addEventListener('change',e=>{
  if(e.target.id==='degSlider'){Speech.say(DEG[7-ST.degVal].w+'大');return;}
  if(e.target.id==='pairSel'){ST.sel=+e.target.value;ST.side='a';renderDeg();}
});
window.antoShow=function(){openTab(ST.tab);};
window.antoLeave=function(){clearTimeout(Q.timer);try{speechSynthesis.cancel();}catch(e){}};
Speech.init();
openTab('learn');
})();

