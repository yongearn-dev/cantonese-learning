(function(){
'use strict';
var host=document.getElementById('dir-host'); if(!host||!host.attachShadow)return;
var CSS_TEXT=":host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%}\n*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:host{\n  --bg:#F1F0E4;--surface:#fff;--surface2:#E7E6D6;--border:#D9D6C4;\n  --text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;\n  --accent:#0E6B57;--accent-bg:#E3EFE9;--yellow:#A9701C;--yellow-bg:#F8EDDA;\n  --green:#1D8A5C;--green-bg:#E6F4EC;--red:#C1402A;--red-bg:#FAEAE4;\n  --radius:12px;--shadow:0 1px 4px rgba(0,0,0,.08);--serif:'Noto Serif TC',serif;\n}\n.opt-bar{display:flex;gap:6px;justify-content:flex-end;margin-bottom:12px}\n.tog{padding:4px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;cursor:pointer;font-family:inherit;font-weight:500}\n.tog.on{background:var(--accent-bg);color:var(--accent);border-color:#9CC9BB;font-weight:700}\n:host(.hide-jyut) .jy{display:none!important}\n:host(.hide-thai) .th{display:none!important}\n.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:22px 0 10px;display:flex;align-items:center;gap:7px}\n.sec:first-child{margin-top:0}\n.sec small{font-family:'Noto Sans Thai';font-weight:400;font-size:12px;color:var(--text-sub)}\n.card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:14px;box-shadow:var(--shadow);margin-bottom:12px}\n.note{background:var(--yellow-bg);border:1px solid #E9D3A6;border-radius:10px;padding:10px 12px;font-size:13px;color:#6B4A12;margin:10px 0}\n.note .th{color:#8A6A2E}\n.note b{color:var(--yellow)}\n.jy{font-family:'Space Mono',monospace;color:var(--accent);font-size:11px;line-height:1.4}\n.zc{font-family:var(--serif);font-weight:700;font-size:20px;color:var(--text);line-height:1.35}\n.th{font-family:'Noto Sans Thai';font-size:12px;color:var(--text-sub)}\n.spk{flex-shrink:0;background:var(--surface2);border:1px solid var(--border);border-radius:8px;padding:3px 9px;cursor:pointer;font-size:12px;color:var(--text-sub)}\n.spk:hover{border-color:var(--accent);color:var(--accent)}\n.ex{display:flex;align-items:center;justify-content:space-between;gap:10px;padding:8px 0;border-top:1px dashed var(--border)}\n.ex:first-of-type{border-top:none}\n.ex .zc{font-size:17px;font-weight:500;font-family:'Noto Sans TC',sans-serif}\n.cross{display:grid;grid-template-columns:repeat(3,1fr);grid-template-areas:\". up .\" \"left mid right\" \". down .\";gap:8px;max-width:340px;margin:0 auto 6px}\n.cx{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 4px;display:flex;flex-direction:column;align-items:center;gap:1px;cursor:pointer;font-family:inherit;box-shadow:var(--shadow)}\n.cx:hover{border-color:var(--accent)}\n.cx .em{font-size:20px}\n.cx .zc{font-size:20px}\n.cx.up{grid-area:up}\n.cx.left{grid-area:left}\n.cx.mid{grid-area:mid;background:var(--accent-bg);border-color:var(--accent)}\n.cx.right{grid-area:right}\n.cx.down{grid-area:down}\n.cx .th{font-size:11px}\n.queue{display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap;font-size:26px;padding:8px 0}\n.queue .qlab{font-size:12px;text-align:center;background:var(--accent-bg);color:var(--accent);border-radius:10px;padding:4px 8px;font-family:inherit;line-height:1.3}\n.queue .qlab b{display:block;font-family:var(--serif);font-size:15px}\n.queue .me{display:flex;flex-direction:column;align-items:center;font-size:26px}\n.queue .me i{font-style:normal;font-size:11px;color:var(--red);font-weight:700}\n.wgrid{display:grid;grid-template-columns:1fr;gap:10px}\n.wcard{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:12px 14px;box-shadow:var(--shadow)}\n.wcard .wh{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}\n.wcard .zc{font-size:24px}\n.wcard .alt{font-size:12px;color:var(--text-muted)}\n.scene{font-size:26px;background:var(--surface2);border-radius:10px;padding:6px 12px;margin:8px 0 4px;text-align:center;white-space:pre-line;letter-spacing:2px;line-height:1.5}\n.rose{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:360px;margin:0 auto 8px}\n.rc{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:8px 2px;text-align:center;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;align-items:center;box-shadow:var(--shadow)}\n.rc:hover{border-color:var(--accent)}\n.rc.main{border-left:4px solid var(--red)}\n.rc.center{background:var(--accent-bg);border-color:var(--accent);cursor:default;font-size:34px;justify-content:center}\n.rc .th{font-size:10px;line-height:1.2}\n.rc .zc{font-size:22px}\n.rule{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px}\n.rule>div{border-radius:var(--radius);padding:12px;text-align:center;border:1.5px solid}\n.rule .lai{background:var(--green-bg);border-color:#9BD3B7}\n.rule .heoi{background:var(--red-bg);border-color:#E3A091}\n.rule .zc{font-size:34px}\n.rule .big{font-size:12px;margin-top:4px;color:var(--text)}\n.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}\n.chip{padding:6px 13px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:13px;cursor:pointer;font-family:inherit;font-weight:500}\n.chip.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.house{display:flex;flex-direction:column;gap:6px;margin-bottom:10px}\n.zone{border-radius:var(--radius);padding:10px 12px;min-height:84px;position:relative}\n.zone.in{background:var(--accent-bg);border:2px solid var(--accent)}\n.zone.out{background:var(--surface);border:2px dashed var(--border)}\n.zone .zl{font-size:11px;font-weight:700;color:var(--accent)}\n.zone.out .zl{color:var(--text-sub)}\n.zone .toks2{display:flex;gap:18px;justify-content:center;align-items:center;min-height:56px}\n.tk{display:flex;flex-direction:column;align-items:center;font-size:30px;line-height:1.1}\n.tk i{font-style:normal;font-size:11px;font-weight:700;color:var(--text-sub)}\n.tk.me i{color:var(--red)}\n.tk .ar{font-size:22px}\n.verdict{text-align:center;padding:10px;border-radius:var(--radius);margin-bottom:8px}\n.verdict.lai{background:var(--green-bg);border:1.5px solid #9BD3B7}\n.verdict.heoi{background:var(--red-bg);border:1.5px solid #E3A091}\n.verdict .zc{font-size:30px}\n.verdict .why{font-size:13px;margin-top:4px}\n.pair{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n.pair>div{border-radius:10px;padding:8px 10px}\n.pair .l{background:var(--green-bg)}\n.pair .r{background:var(--red-bg)}\n.pair .zc{font-size:20px}\n.pair .exs .zc{font-size:14px;font-weight:500;font-family:'Noto Sans TC',sans-serif}\n.pair .exs{margin-top:6px;border-top:1px dashed rgba(0,0,0,.15);padding-top:6px;display:flex;justify-content:space-between;align-items:center;gap:6px}\n.pair .exs .th{font-size:11px}\n.cmp{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n.cmp>div{background:var(--surface);border:1.5px solid var(--border);border-radius:10px;padding:8px 10px}\n.cmp .h{font-size:12px;font-weight:700;color:var(--accent);background:var(--accent-bg);border-color:transparent}\n.toks{display:flex;flex-wrap:wrap;gap:8px;margin:10px 0 8px}\n.tok{background:var(--surface);border:2px solid;border-radius:10px;padding:6px 8px;text-align:center;min-width:52px;box-shadow:var(--shadow)}\n.tok .tr{font-size:10px;font-weight:700}\n.tok .zc{font-size:19px}\n.tok .th{font-size:9px;color:var(--text-muted)}\n.formula{font-family:'Space Mono',monospace;font-size:12px;color:var(--yellow);background:var(--yellow-bg);padding:4px 10px;border-radius:8px;display:inline-block;margin:6px 0}\n.dl{display:flex;gap:10px;margin-bottom:8px}\n.dl .spkr{font-size:12px;font-weight:700;color:var(--accent);min-width:18px;padding-top:8px}\n.dl .bub{flex:1;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:8px 12px;display:flex;justify-content:space-between;align-items:center;gap:8px;box-shadow:var(--shadow)}\n.dl .zc{font-size:16px;font-weight:500;font-family:'Noto Sans TC',sans-serif}\n.rchips{display:flex;flex-wrap:wrap;gap:8px}\n.rchip{background:var(--surface);border:1.5px solid var(--border);border-radius:10px;padding:6px 10px;cursor:pointer;font-family:inherit;text-align:center}\n.rchip:hover{border-color:var(--accent)}\n.rchip .zc{font-size:16px;font-weight:500;font-family:'Noto Sans TC',sans-serif}\n.g-hdr{display:flex;justify-content:space-between;margin-bottom:10px}\n.score-pill{background:var(--yellow-bg);border:1.5px solid #E9D3A6;color:var(--yellow);padding:4px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:14px}\n.round-pill{background:var(--surface2);border:1.5px solid var(--border);padding:4px 14px;border-radius:20px;font-family:'Space Mono';font-size:13px;color:var(--text-sub)}\n.qcard{background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:14px 16px;text-align:center;box-shadow:var(--shadow);margin-bottom:12px}\n.qcard .scene{margin-top:0}\n.qcard .zc{font-size:20px}\n.blank{display:inline-block;min-width:44px;border-bottom:3px solid var(--yellow);color:var(--yellow)}\n.fill{color:var(--green)}\n.qopts{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.qopt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:12px 8px;cursor:pointer;font-family:inherit;display:flex;flex-direction:column;align-items:center;gap:2px;box-shadow:var(--shadow);color:var(--text)}\n.qopt:hover{border-color:var(--accent);background:var(--accent-bg)}\n.qopt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.qopt.bad{border-color:var(--red)!important;background:var(--red-bg)!important}\n.qopt.dim{opacity:.35;pointer-events:none}\n.qopt .zc{font-size:22px}\n.fb{padding:10px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid;margin-top:12px}\n.fb.ok{background:var(--green-bg);color:var(--green);border-color:#BBD9C8}\n.fb.err{background:var(--red-bg);color:var(--red);border-color:#E9BFB3}\n.why2{background:var(--surface);border:1.5px solid var(--border);border-radius:10px;padding:10px 12px;font-size:13px;margin-top:8px}\n.btn{background:var(--accent);color:#fff;border:none;border-radius:20px;padding:10px 26px;font-weight:700;font-size:14px;cursor:pointer;font-family:inherit;margin-top:12px}\n.btn.alt{background:var(--surface);color:var(--text-sub);border:1.5px solid var(--border)}\n.result{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:30px 20px;text-align:center;box-shadow:var(--shadow)}\n.result .big{font-family:'Space Mono';font-size:34px;font-weight:700;color:var(--accent);margin:6px 0}\n.go{display:inline-block;margin-top:6px;background:var(--accent);color:#fff;border:none;border-radius:20px;padding:8px 18px;font-weight:700;font-size:13px;cursor:pointer;font-family:inherit}\n@media (min-width:720px){.wgrid{grid-template-columns:1fr 1fr}}@media (min-width:1100px){.wgrid{grid-template-columns:1fr 1fr 1fr}}\n";
var SR=host.attachShadow({mode:'open'});
SR.innerHTML='<style>'+CSS_TEXT+'</style><div class="opt-bar"><button class="tog on" data-tog="jyut">粵拼</button><button class="tog on" data-tog="thai">泰文</button></div><div id="view"></div>';


/* ── helpers ───────────────────────────────────────────── */
const $ = id => SR.getElementById(id);
const esc = s => String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function shuffle(arr){const a=arr.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

const Speech={ok:'speechSynthesis' in window,supported:'speechSynthesis' in window,voices:[],
  init(){if(!this.ok)return;const l=()=>{this.voices=speechSynthesis.getVoices();};l();if(speechSynthesis.addEventListener)speechSynthesis.addEventListener('voiceschanged',l);},
  say(t){if(!this.ok)return;
    const go=()=>{const u=new SpeechSynthesisUtterance(String(t).replace(/_+/g,' '));
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.indexOf('zh')===0);
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();},   // Chrome：cancel 後即刻 speak 會被吞
  speak(t){this.say(t);}};

function sayBtn(text){ return Speech.supported ? '<button class="spk" data-say="'+esc(text)+'" aria-label="聽發音">🔊</button>' : ''; }
function exRow(e){
  return '<div class="ex"><div><div class="jy">'+e.j+'</div><div class="zc">'+e.zh+'</div><div class="th">'+e.t+'</div></div>'+sayBtn(e.zh)+'</div>';
}
function wordHead(w,j,t,alt){
  return '<div class="wh"><div><div class="jy">'+j+'</div><div class="zc">'+w+'</div></div><div class="th">'+t+'</div>'+(alt?'<div class="alt">'+alt+'</div>':'')+sayBtn(w)+'</div>';
}

/* ── DATA: 位置 ───────────────────────────────────────── */
const CROSS = [
  {k:'up',   em:'⬆️', w:'上面', j:'soeng6 min6', t:'ด้านบน'},
  {k:'left', em:'⬅️', w:'左面', j:'zo2 min6',    t:'ด้านซ้าย'},
  {k:'mid',  em:'⭐', w:'中間', j:'zung1 gaan1', t:'ตรงกลาง'},
  {k:'right',em:'➡️', w:'右面', j:'jau6 min6',   t:'ด้านขวา'},
  {k:'down', em:'⬇️', w:'下面', j:'haa6 min6',   t:'ด้านล่าง'}
];

const WORDS = [
  {w:'前面',j:'cin4 min6',t:'ข้างหน้า',alt:'前邊 cin4 bin1',
   ex:{zh:'我排最後，我前面有三個人。',j:'ngo5 paai4 zeoi3 hau6, ngo5 cin4 min6 jau5 saam1 go3 jan4.',t:'ฉันอยู่ท้ายแถว ข้างหน้ามีสามคน'}},
  {w:'後面',j:'hau6 min6',t:'ข้างหลัง',alt:'後邊 hau6 bin1',
   ex:{zh:'學校後面有一個公園。',j:'hok6 haau6 hau6 min6 jau5 jat1 go3 gung1 jyun2.',t:'ด้านหลังโรงเรียนมีสวนสาธารณะหนึ่งแห่ง'}},
  {w:'左面',j:'zo2 min6',t:'ด้านซ้าย',alt:'左邊 zo2 bin1',
   ex:{zh:'洗手間喺左面。',j:'sai2 sau2 gaan1 hai2 zo2 min6.',t:'ห้องน้ำอยู่ทางซ้าย'}},
  {w:'右面',j:'jau6 min6',t:'ด้านขวา',alt:'右邊 jau6 bin1',
   ex:{zh:'電話喺右面。',j:'din6 waa2 hai2 jau6 min6.',t:'โทรศัพท์อยู่ทางขวา'}},
  {w:'上面',j:'soeng6 min6',t:'ข้างบน / บน',alt:'上邊 soeng6 bin1',
   ex:{zh:'書喺枱上面。',j:'syu1 hai2 toi2 soeng6 min6.',t:'หนังสืออยู่บนโต๊ะ'}},
  {w:'下面',j:'haa6 min6',t:'ข้างล่าง / ใต้',alt:'下邊 haa6 bin1',
   ex:{zh:'貓喺枱下面。',j:'maau1 hai2 toi2 haa6 min6.',t:'แมวอยู่ใต้โต๊ะ'}},
  {w:'中間',j:'zung1 gaan1',t:'ตรงกลาง / ระหว่าง',scene:'🏫 🏪 🏥',
   ex:{zh:'超市喺學校同醫院中間。',j:'ciu1 si5 hai2 hok6 haau6 tung4 ji1 jyun2 zung1 gaan1.',t:'ซูเปอร์มาร์เก็ตอยู่ระหว่างโรงเรียนกับโรงพยาบาล'},
   tip:'講「兩樣嘢之間」用：A 同 B 中間'},
  {w:'隔離',j:'gaak3 lei4',t:'ข้างๆ / ติดกับ',scene:'🏫🏥',
   ex:{zh:'醫院喺學校隔離。',j:'ji1 jyun2 hai2 hok6 haau6 gaak3 lei4.',t:'โรงพยาบาลอยู่ติดกับโรงเรียน'},
   tip:'兩樣嘢緊貼住、中間冇嘢隔開＝隔離'},
  {w:'對面',j:'deoi3 min6',t:'ตรงข้าม',scene:'🏠 🛣️ 🏪',
   ex:{zh:'超市喺屋企對面。',j:'ciu1 si5 hai2 uk1 kei2 deoi3 min6.',t:'ซูเปอร์มาร์เก็ตอยู่ตรงข้ามบ้าน'},
   tip:'中間隔住條路、一堵牆等等，喺相反嘅一面'},
  {w:'旁邊',j:'pong4 bin1',t:'ข้างๆ (ด้านข้าง)',scene:'🌳🧍',
   ex:{zh:'我企喺樹旁邊。',j:'ngo5 kei5 hai2 syu6 pong4 bin1.',t:'ฉันยืนอยู่ข้างต้นไม้'}},
  {w:'附近',j:'fu6 gan6',t:'บริเวณใกล้ๆ / แถวนี้',scene:'📍',
   ex:{zh:'呢度附近有冇洗手間？',j:'ni1 dou6 fu6 gan6 jau5 mou5 sai2 sau2 gaan1?',t:'แถวนี้มีห้องน้ำไหม?'}}
];

/* ── DATA: 東南西北 ───────────────────────────────────── */
const ROSE = [
  {w:'西北',j:'sai1 bak1',t:'ตะวันตกเฉียงเหนือ'},
  {w:'北',j:'bak1',t:'เหนือ',main:1},
  {w:'東北',j:'dung1 bak1',t:'ตะวันออกเฉียงเหนือ'},
  {w:'西',j:'sai1',t:'ตะวันตก',main:1},
  {center:'🧭'},
  {w:'東',j:'dung1',t:'ตะวันออก',main:1},
  {w:'西南',j:'sai1 naam4',t:'ตะวันตกเฉียงใต้'},
  {w:'南',j:'naam4',t:'ใต้',main:1},
  {w:'東南',j:'dung1 naam4',t:'ตะวันออกเฉียงใต้'}
];
const COMPASS_EX = [
  {zh:'香港喺中國嘅南面。',j:'hoeng1 gong2 hai2 zung1 gwok3 ge3 naam4 min6.',t:'ฮ่องกงอยู่ทางใต้ของจีน'},
  {zh:'泰國喺香港嘅西南面。',j:'taai3 gwok3 hai2 hoeng1 gong2 ge3 sai1 naam4 min6.',t:'ประเทศไทยอยู่ทางตะวันตกเฉียงใต้ของฮ่องกง'},
  {zh:'日本喺香港嘅東北面。',j:'jat6 bun2 hai2 hoeng1 gong2 ge3 dung1 bak1 min6.',t:'ญี่ปุ่นอยู่ทางตะวันออกเฉียงเหนือของฮ่องกง'},
  {zh:'太陽喺東面升起，喺西面落山。',j:'taai3 joeng4 hai2 dung1 min6 sing1 hei2, hai2 sai1 min6 lok6 saan1.',t:'พระอาทิตย์ขึ้นทางทิศตะวันออก ตกทางทิศตะวันตก'}
];

/* ── DATA: 入面／出面 ─────────────────────────────────── */
const INOUT = [
  {w:'入面',j:'jap6 min6',t:'ข้างใน',alt:'書面：裡面 lei5 min6',scene:'👜〔📱〕',
   exs:[{zh:'電話喺袋入面。',j:'din6 waa2 hai2 doi2 jap6 min6.',t:'โทรศัพท์อยู่ในกระเป๋า'},
        {zh:'我喺屋企入面食飯。',j:'ngo5 hai2 uk1 kei2 jap6 min6 sik6 faan6.',t:'ฉันกินข้าวอยู่ในบ้าน'}]},
  {w:'出面',j:'ceot1 min6',t:'ข้างนอก',alt:'亦可講：外面 ngoi6 min6',scene:'🏠 ☔',
   exs:[{zh:'出面落緊雨。',j:'ceot1 min6 lok6 gan2 jyu5.',t:'ข้างนอกฝนกำลังตก'},
        {zh:'我喺出面等你。',j:'ngo5 hai2 ceot1 min6 dang2 nei5.',t:'ฉันรอคุณอยู่ข้างนอก'}]}
];
const CONTRAST = [
  [{zh:'我喺入面。',j:'ngo5 hai2 jap6 min6.',t:'ฉันอยู่ข้างใน'},{zh:'我入去。',j:'ngo5 jap6 heoi3.',t:'ฉันเข้าไป'}],
  [{zh:'我喺出面。',j:'ngo5 hai2 ceot1 min6.',t:'ฉันอยู่ข้างนอก'},{zh:'我出去。',j:'ngo5 ceot1 heoi3.',t:'ฉันออกไป'}]
];

/* ── DATA: 嚟／去 ─────────────────────────────────────── */
const SCEN = [
  {chip:'朋友入嚟',me:'in',other:'out',mover:'other',move:'up',ans:'lai',p:'入嚟',pj:'jap6 lai4',pt:'เข้ามา',
   ex:{zh:'外面好凍，你入嚟啦！',j:'ngoi6 min6 hou2 dung3, nei5 jap6 lai4 laa1!',t:'ข้างนอกหนาว เข้ามาเถอะ!'},
   why:'我（講嘢嘅人）喺入面，朋友由出面行向我。',th:'ฉันอยู่ข้างใน เพื่อนเดินเข้ามาหาฉัน'},
  {chip:'朋友出嚟',me:'out',other:'in',mover:'other',move:'down',ans:'lai',p:'出嚟',pj:'ceot1 lai4',pt:'ออกมา',
   ex:{zh:'你出嚟啦，我喺門口等你。',j:'nei5 ceot1 lai4 laa1, ngo5 hai2 mun4 hau2 dang2 nei5.',t:'ออกมาเถอะ ฉันรออยู่หน้าประตู'},
   why:'我喺出面，朋友由入面行向我。',th:'ฉันอยู่ข้างนอก เพื่อนเดินออกมาหาฉัน'},
  {chip:'我出去',me:'in',other:null,mover:'me',move:'down',ans:'heoi',p:'出去',pj:'ceot1 heoi3',pt:'ออกไป',
   ex:{zh:'我出去買嘢。',j:'ngo5 ceot1 heoi3 maai5 je5.',t:'ฉันออกไปซื้อของ'},
   why:'我由而家喺嘅地方（入面）離開，去第度。',th:'ฉันออกจากที่ที่อยู่ตอนนี้ ไปที่อื่น'},
  {chip:'我入去',me:'out',other:null,mover:'me',move:'up',ans:'heoi',p:'入去',pj:'jap6 heoi3',pt:'เข้าไป',
   ex:{zh:'我入去睇下。',j:'ngo5 jap6 heoi3 tai2 haa5.',t:'ฉันเข้าไปดูหน่อย'},
   why:'我喺出面，行入一個我而家唔喺嘅地方。',th:'ฉันอยู่ข้างนอก เดินเข้าไปในที่ที่ฉันไม่ได้อยู่'},
  {chip:'佢出去',me:'in',other:'in',mover:'other',move:'down',ans:'heoi',p:'出去',pj:'ceot1 heoi3',pt:'ออกไป',
   ex:{zh:'佢出去咗。',j:'keoi5 ceot1 heoi3 zo2.',t:'เขาออกไปแล้ว'},
   why:'佢離開我（我留喺入面）。',th:'เขาเดินจากฉันไป ฉันอยู่ข้างในต่อ'},
  {chip:'佢入去',me:'out',other:'out',mover:'other',move:'up',ans:'heoi',p:'入去',pj:'jap6 heoi3',pt:'เข้าไป',
   ex:{zh:'佢入去咗。',j:'keoi5 jap6 heoi3 zo2.',t:'เขาเข้าไปแล้ว'},
   why:'佢離開我（我留喺出面）。',th:'เขาเดินจากฉันไป ฉันอยู่ข้างนอกต่อ'}
];

const PAIRS = [
  {v:'入',vj:'jap6',vt:'เข้า',
   lai:{w:'入嚟',j:'jap6 lai4',t:'เข้ามา',ex:{zh:'請入嚟坐。',j:'cing2 jap6 lai4 co5.',t:'เชิญเข้ามานั่ง'}},
   heoi:{w:'入去',j:'jap6 heoi3',t:'เข้าไป',ex:{zh:'我入去洗手間。',j:'ngo5 jap6 heoi3 sai2 sau2 gaan1.',t:'ฉันเข้าไปห้องน้ำ'}}},
  {v:'出',vj:'ceot1',vt:'ออก',
   lai:{w:'出嚟',j:'ceot1 lai4',t:'ออกมา',ex:{zh:'你出嚟啦，我喺門口等你。',j:'nei5 ceot1 lai4 laa1, ngo5 hai2 mun4 hau2 dang2 nei5.',t:'ออกมาเถอะ ฉันรออยู่หน้าประตู'}},
   heoi:{w:'出去',j:'ceot1 heoi3',t:'ออกไป',ex:{zh:'我出去買嘢。',j:'ngo5 ceot1 heoi3 maai5 je5.',t:'ฉันออกไปซื้อของ'}}},
  {v:'上',vj:'soeng5',vt:'ขึ้น',
   lai:{w:'上嚟',j:'soeng5 lai4',t:'ขึ้นมา',ex:{zh:'你上嚟啦，我喺五樓。',j:'nei5 soeng5 lai4 laa1, ngo5 hai2 ng5 lau2.',t:'ขึ้นมาเถอะ ฉันอยู่ชั้นห้า'}},
   heoi:{w:'上去',j:'soeng5 heoi3',t:'ขึ้นไป',ex:{zh:'我上去拎本書。',j:'ngo5 soeng5 heoi3 ling1 bun2 syu1.',t:'ฉันขึ้นไปเอาหนังสือ'}}},
  {v:'落',vj:'lok6',vt:'ลง',
   lai:{w:'落嚟',j:'lok6 lai4',t:'ลงมา',ex:{zh:'你落嚟啦，我喺下面等你。',j:'nei5 lok6 lai4 laa1, ngo5 hai2 haa6 min6 dang2 nei5.',t:'ลงมาเถอะ ฉันรออยู่ข้างล่าง'}},
   heoi:{w:'落去',j:'lok6 heoi3',t:'ลงไป',ex:{zh:'我落去買嘢。',j:'ngo5 lok6 heoi3 maai5 je5.',t:'ฉันลงไปซื้อของ'}}},
  {v:'過',vj:'gwo3',vt:'ข้าม',
   lai:{w:'過嚟',j:'gwo3 lai4',t:'ข้ามมา / มาทางนี้',ex:{zh:'你過嚟呢邊啦。',j:'nei5 gwo3 lai4 ni1 bin1 laa1.',t:'มาทางฝั่งนี้เถอะ'}},
   heoi:{w:'過去',j:'gwo3 heoi3',t:'ข้ามไป / ไปทางโน้น',ex:{zh:'我過去嗰邊。',j:'ngo5 gwo3 heoi3 go2 bin1.',t:'ฉันไปทางฝั่งโน้น'}}},
  {v:'返',vj:'faan1',vt:'กลับ',
   lai:{w:'返嚟',j:'faan1 lai4',t:'กลับมา',ex:{zh:'你幾時返嚟香港呀？',j:'nei5 gei2 si4 faan1 lai4 hoeng1 gong2 aa3?',t:'คุณจะกลับมาฮ่องกงเมื่อไหร่? (ผู้พูดอยู่ฮ่องกง)'}},
   heoi:{w:'返去',j:'faan1 heoi3',t:'กลับไป',ex:{zh:'佢聽日返去泰國。',j:'keoi5 ting1 jat6 faan1 heoi3 taai3 gwok3.',t:'เขากลับไปเมืองไทยพรุ่งนี้ (ผู้พูดไม่ได้อยู่ไทย)'}}}
];
const DEIX = [
  {w:'呢度',j:'ni1 dou6',t:'ที่นี่'},{w:'嗰度',j:'go2 dou6',t:'ที่โน่น'},
  {w:'呢邊',j:'ni1 bin1',t:'ฝั่งนี้'},{w:'嗰邊',j:'go2 bin1',t:'ฝั่งโน้น'}
];

/* ── DATA: 句型 ───────────────────────────────────────── */
const C = {r:'#C1402A',y:'#A9701C',g:'#1D8A5C',b:'#2563eb',p:'#8A4B3B',t:'#0891b2',a:'#0E6B57'};
const PATS = [
  {title:'A 喺 B 嘅位置',th:'A อยู่ที่ตำแหน่ง...ของ B',formula:'A + 喺 + B + 方位詞',
   tokens:[['書','syu1','主語|ประธาน',C.r],['喺','hai2','介詞|อยู่ที่',C.b],['枱','toi2','地方|สถานที่',C.y],['上面','soeng6 min6','方位詞|ตำแหน่ง',C.a]],
   ex:{zh:'書喺枱上面。',j:'syu1 hai2 toi2 soeng6 min6.',t:'หนังสืออยู่บนโต๊ะ'},
   note:'已經知道嗰樣嘢，講佢喺邊度 → 用「喺」。'},
  {title:'邊度有咩',th:'ตรงไหนมีอะไร',formula:'B + 方位詞 + 有 + 嘢',
   tokens:[['枱','toi2','地方|สถานที่',C.y],['上面','soeng6 min6','方位詞|ตำแหน่ง',C.a],['有','jau5','有|มี',C.g],['一本書','jat1 bun2 syu1','嘢|สิ่งของ',C.r]],
   ex:{zh:'枱上面有一本書。',j:'toi2 soeng6 min6 jau5 jat1 bun2 syu1.',t:'บนโต๊ะมีหนังสือหนึ่งเล่ม'},
   note:'講個地方有啲咩 → 用「有」，地方放前面。比較：書喺枱上面（書喺邊度）／枱上面有書（枱上面有咩）。'},
  {title:'兩樣嘢中間',th:'อยู่ระหว่างสองสิ่ง',formula:'A + 喺 + B + 同 + C + 中間',
   tokens:[['超市','ciu1 si5','主語|ประธาน',C.r],['喺','hai2','介詞|อยู่ที่',C.b],['學校','hok6 haau6','地方|สถานที่',C.y],['同','tung4','連詞|กับ',C.p],['醫院','ji1 jyun2','地方|สถานที่',C.y],['中間','zung1 gaan1','方位詞|ตำแหน่ง',C.a]],
   ex:{zh:'超市喺學校同醫院中間。',j:'ciu1 si5 hai2 hok6 haau6 tung4 ji1 jyun2 zung1 gaan1.',t:'ซูเปอร์มาร์เก็ตอยู่ระหว่างโรงเรียนกับโรงพยาบาล'},
   note:null},
  {title:'喺邊度做嘢',th:'ทำอะไรที่ไหน',formula:'主語 + 喺 + 地方 + 動詞',
   tokens:[['我','ngo5','主語|ประธาน',C.r],['喺','hai2','介詞|ที่',C.b],['出面','ceot1 min6','地方|ข้างนอก',C.a],['等','dang2','動詞|กริยา',C.g],['你','nei5','賓語|กรรม',C.y]],
   ex:{zh:'我喺出面等你。',j:'ngo5 hai2 ceot1 min6 dang2 nei5.',t:'ฉันรอคุณอยู่ข้างนอก'},
   note:'「喺＋地方」放喺動詞前面，同泰文相反（泰文：รอคุณอยู่ข้างนอก）。'},
  {title:'方向動詞 + 嚟／去',th:'กริยาทิศทาง + มา/ไป',formula:'主語 + 出／入／上／落／過／返 + 嚟／去 + 做咩',
   tokens:[['我','ngo5','主語|ประธาน',C.r],['出','ceot1','方向|ทิศทาง',C.a],['去','heoi3','嚟／去|ไป',C.b],['買嘢','maai5 je5','目的|จุดประสงค์',C.g]],
   ex:{zh:'我出去買嘢。',j:'ngo5 ceot1 heoi3 maai5 je5.',t:'ฉันออกไปซื้อของ'},
   note:'嚟／去 緊貼住方向動詞，之後先講目的（買嘢、食飯）。'}
];
const DIALOG = [
  ['A','請問洗手間喺邊度呀？','cing2 man6 sai2 sau2 gaan1 hai2 bin1 dou6 aa3?','ขอถามหน่อย ห้องน้ำอยู่ที่ไหนคะ?'],
  ['B','一直行，轉右就到。','jat1 zik6 haang4, zyun3 jau6 zau6 dou3.','เดินตรงไป แล้วเลี้ยวขวาก็ถึงแล้ว'],
  ['A','喺唔喺超市隔離呀？','hai2 m4 hai2 ciu1 si5 gaak3 lei4 aa3?','อยู่ติดกับซูเปอร์มาร์เก็ตหรือเปล่า?'],
  ['B','係呀，喺超市隔離。','hai6 aa3, hai2 ciu1 si5 gaak3 lei4.','ใช่ อยู่ติดกับซูเปอร์มาร์เก็ต']
];
const ROUTE = [
  {w:'一直行',j:'jat1 zik6 haang4',t:'เดินตรงไป'},
  {w:'轉左',j:'zyun3 zo2',t:'เลี้ยวซ้าย'},
  {w:'轉右',j:'zyun3 jau6',t:'เลี้ยวขวา'},
  {w:'過馬路',j:'gwo3 maa5 lou6',t:'ข้ามถนน'},
  {w:'行到尾',j:'haang4 dou3 mei5',t:'เดินไปจนสุดทาง'},
  {w:'向北行',j:'heung3 bak1 haang4',t:'เดินไปทางเหนือ'}
];

/* ── DATA: 練習 ───────────────────────────────────────── */
const O = (w,j) => ({w:w,j:j});
const QBANK = [
  /* 方位 */
  {cat:'pos',scene:'🏫 🏪 🏥',zh:'超市喺學校同醫院嘅___。',j:'ciu1 si5 hai2 hok6 haau6 tung4 ji1 jyun2 ge3 ___.',t:'ซูเปอร์มาร์เก็ตอยู่ ___ โรงเรียนกับโรงพยาบาล',
   opts:[O('中間','zung1 gaan1'),O('隔離','gaak3 lei4'),O('對面','deoi3 min6'),O('入面','jap6 min6')],ans:0,
   why:'喺兩樣嘢之間 → 中間。',th:'อยู่ระหว่างสองสิ่ง → 中間'},
  {cat:'pos',scene:'☁️\n🏠',zh:'雲喺屋嘅___。',j:'wan4 hai2 uk1 ge3 ___.',t:'เมฆอยู่ ___ บ้าน',
   opts:[O('上面','soeng6 min6'),O('下面','haa6 min6'),O('左面','zo2 min6'),O('入面','jap6 min6')],ans:0,
   why:'雲喺屋上方 → 上面。',th:'เมฆอยู่เหนือบ้าน → 上面'},
  {cat:'pos',scene:'🏥🏫',zh:'醫院喺學校___。',j:'ji1 jyun2 hai2 hok6 haau6 ___.',t:'โรงพยาบาลอยู่ ___ โรงเรียน (ติดกัน)',
   opts:[O('隔離','gaak3 lei4'),O('對面','deoi3 min6'),O('下面','haa6 min6'),O('入面','jap6 min6')],ans:0,
   why:'兩幢樓貼住，中間冇嘢 → 隔離。',th:'สองอาคารติดกัน ไม่มีอะไรคั่น → 隔離'},
  {cat:'pos',scene:'🏠 🛣️ 🏪',zh:'超市喺屋企___，中間有條路。',j:'ciu1 si5 hai2 uk1 kei2 ___, zung1 gaan1 jau5 tiu4 lou6.',t:'ซูเปอร์มาร์เก็ตอยู่ ___ บ้าน มีถนนคั่นกลาง',
   opts:[O('對面','deoi3 min6'),O('隔離','gaak3 lei4'),O('入面','jap6 min6'),O('後面','hau6 min6')],ans:0,
   why:'隔住條路、喺相反嗰面 → 對面。',th:'มีถนนคั่น อยู่คนละฝั่ง → 對面'},
  {cat:'pos',scene:'👜〔📱〕',zh:'電話喺袋___。',j:'din6 waa2 hai2 doi2 ___.',t:'โทรศัพท์อยู่ ___ กระเป๋า',
   opts:[O('入面','jap6 min6'),O('出面','ceot1 min6'),O('上面','soeng6 min6'),O('對面','deoi3 min6')],ans:0,
   why:'電話喺袋裡面 → 入面。',th:'โทรศัพท์อยู่ในกระเป๋า → 入面'},
  {cat:'pos',scene:'☔',zh:'___落緊雨，你帶遮啦。',j:'___ lok6 gan2 jyu5, nei5 daai3 ze1 laa1.',t:'___ ฝนกำลังตก เอาร่มไปด้วยนะ',
   opts:[O('出面','ceot1 min6'),O('入面','jap6 min6'),O('中間','zung1 gaan1'),O('隔離','gaak3 lei4')],ans:0,
   why:'落雨喺屋外 → 出面。',th:'ฝนตกอยู่นอกบ้าน → 出面'},
  {cat:'pos',scene:'🧍 ➡️ 👤👤👤',zh:'我排最後，我___有三個人。',j:'ngo5 paai4 zeoi3 hau6, ngo5 ___ jau5 saam1 go3 jan4.',t:'ฉันอยู่ท้ายแถว ___ ฉันมีสามคน',
   opts:[O('前面','cin4 min6'),O('後面','hau6 min6'),O('隔離','gaak3 lei4'),O('中間','zung1 gaan1')],ans:0,
   why:'我排最後，所有人喺我前面。',th:'ฉันอยู่ท้ายสุด ทุกคนอยู่ข้างหน้าฉัน → 前面'},
  /* 東南西北 */
  {cat:'compass',scene:'🧭 🌅',zh:'太陽喺___面升起。',j:'taai3 joeng4 hai2 ___ min6 sing1 hei2.',t:'พระอาทิตย์ขึ้นทางทิศ ___',
   opts:[O('東','dung1'),O('西','sai1'),O('南','naam4'),O('北','bak1')],ans:0,
   why:'太陽由東面升起。',th:'พระอาทิตย์ขึ้นทางตะวันออก → 東'},
  {cat:'compass',scene:'🇹🇭 ➜ 🇭🇰',zh:'香港喺泰國嘅___面。',j:'hoeng1 gong2 hai2 taai3 gwok3 ge3 ___ min6.',t:'ฮ่องกงอยู่ทางทิศ ___ ของประเทศไทย',
   opts:[O('東北','dung1 bak1'),O('西南','sai1 naam4'),O('東南','dung1 naam4'),O('西北','sai1 bak1')],ans:0,
   why:'由泰國睇，香港喺東面同北面 → 東北。',th:'มองจากไทย ฮ่องกงอยู่ตะวันออกและเหนือ → 東北'},
  {cat:'compass',scene:'🇭🇰 ➜ 🇹🇭',zh:'泰國喺香港嘅___面。',j:'taai3 gwok3 hai2 hoeng1 gong2 ge3 ___ min6.',t:'ประเทศไทยอยู่ทางทิศ ___ ของฮ่องกง',
   opts:[O('西南','sai1 naam4'),O('東北','dung1 bak1'),O('東南','dung1 naam4'),O('西北','sai1 bak1')],ans:0,
   why:'由香港睇，泰國喺西面同南面 → 西南。',th:'มองจากฮ่องกง ไทยอยู่ตะวันตกและใต้ → 西南'},
  {cat:'compass',scene:'🧭',zh:'香港喺中國嘅___面。',j:'hoeng1 gong2 hai2 zung1 gwok3 ge3 ___ min6.',t:'ฮ่องกงอยู่ทางทิศ ___ ของจีน',
   opts:[O('南','naam4'),O('北','bak1'),O('東','dung1'),O('西','sai1')],ans:0,
   why:'香港喺中國最南面。',th:'ฮ่องกงอยู่ทางใต้สุดของจีน → 南'},
  /* 嚟／去 */
  {cat:'lai',scene:'🏠 入面：🙋我\n🚪 出面：🧑媽媽',zh:'媽媽，你___啦！',j:'maa1 maa1, nei5 ___ laa1!',t:'คุณแม่ เข้า___เถอะ (ฉันอยู่ข้างใน)',
   opts:[O('入嚟','jap6 lai4'),O('入去','jap6 heoi3')],ans:0,
   why:'我喺入面，媽媽行向我 → 嚟。',th:'ฉันอยู่ข้างใน แม่เดินเข้าหาฉัน → 嚟 (มา)'},
  {cat:'lai',scene:'🏠 入面：🙋我\n🛒 想去街買嘢',zh:'我___買嘢。',j:'ngo5 ___ maai5 je5.',t:'ฉัน ___ ซื้อของ (ฉันอยู่ข้างใน)',
   opts:[O('出去','ceot1 heoi3'),O('出嚟','ceot1 lai4')],ans:0,
   why:'我離開而家喺嘅地方 → 去。',th:'ฉันจากที่ที่อยู่ไปที่อื่น → 去 (ไป)'},
  {cat:'lai',scene:'🏠 入面：🧑朋友\n🚪 出面：🙋我（等緊）',zh:'你___啦，我喺出面等你！',j:'nei5 ___ laa1, ngo5 hai2 ceot1 min6 dang2 nei5!',t:'___ เถอะ ฉันรออยู่ข้างนอก',
   opts:[O('出嚟','ceot1 lai4'),O('出去','ceot1 heoi3')],ans:0,
   why:'我喺出面，朋友行向我 → 嚟。',th:'ฉันอยู่ข้างนอก เพื่อนเดินมาหาฉัน → 嚟'},
  {cat:'lai',scene:'🏠 入面：🙋我 + 🧑佢\n（佢行出街）',zh:'佢___咗。',j:'keoi5 ___ zo2.',t:'เขา ___ แล้ว (ฉันยังอยู่ข้างใน)',
   opts:[O('出去','ceot1 heoi3'),O('出嚟','ceot1 lai4')],ans:0,
   why:'佢離開我，我仲喺入面 → 去。',th:'เขาเดินจากฉันไป → 去 (ไป)'},
  {cat:'lai',scene:'1樓：🙋我\n5樓：🧑朋友',zh:'你___啦，我喺下面等你。',j:'nei5 ___ laa1, ngo5 hai2 haa6 min6 dang2 nei5.',t:'___ เถอะ ฉันรออยู่ข้างล่าง',
   opts:[O('落嚟','lok6 lai4'),O('落去','lok6 heoi3')],ans:0,
   why:'我喺下面，朋友行向我 → 嚟。',th:'ฉันอยู่ข้างล่าง เพื่อนลงมาหาฉัน → 嚟'},
  {cat:'lai',scene:'5樓：🙋我\n1樓：🛒 買嘢',zh:'我___買嘢。',j:'ngo5 ___ maai5 je5.',t:'ฉัน ___ ซื้อของ (ฉันอยู่ชั้นห้า)',
   opts:[O('落去','lok6 heoi3'),O('落嚟','lok6 lai4')],ans:0,
   why:'我由5樓離開，去1樓 → 去。',th:'ฉันออกจากชั้นห้าไปชั้นหนึ่ง → 去'},
  {cat:'lai',scene:'🇭🇰 我喺香港\n🇹🇭 朋友喺泰國',zh:'你幾時___香港呀？',j:'nei5 gei2 si4 ___ hoeng1 gong2 aa3?',t:'คุณจะ ___ ฮ่องกงเมื่อไหร่? (ผู้พูดอยู่ฮ่องกง)',
   opts:[O('返嚟','faan1 lai4'),O('返去','faan1 heoi3')],ans:0,
   why:'我（講嘢嘅人）就喺香港 → 返嚟。',th:'ผู้พูดอยู่ฮ่องกง → 返嚟'},
  {cat:'lai',scene:'🇹🇭 我喺泰國\n🇭🇰 佢要返香港',zh:'佢聽日___香港。',j:'keoi5 ting1 jat6 ___ hoeng1 gong2.',t:'เขาพรุ่งนี้ ___ ฮ่องกง (ผู้พูดอยู่ไทย)',
   opts:[O('返去','faan1 heoi3'),O('返嚟','faan1 lai4')],ans:0,
   why:'我唔喺香港，佢離開我去香港 → 返去。',th:'ผู้พูดไม่ได้อยู่ฮ่องกง → 返去'},
  {cat:'lai',scene:'☁️ ☀️',zh:'太陽___喇！',j:'taai3 joeng4 ___ laa1!',t:'พระอาทิตย์ ___ แล้ว!',
   opts:[O('出嚟','ceot1 lai4'),O('出去','ceot1 heoi3')],ans:0,
   why:'太陽由雲後面出現喺我哋眼前 → 出嚟（嚟＝向住睇嘅人）。',th:'พระอาทิตย์โผล่ออกมาให้เห็น → 出嚟'},
  {cat:'lai',scene:'🙋我喺呢邊\n🧑朋友喺嗰邊',zh:'你___我呢邊啦！',j:'nei5 ___ ngo5 ni1 bin1 laa1!',t:'___ มาทางฝั่งฉันเถอะ',
   opts:[O('過嚟','gwo3 lai4'),O('過去','gwo3 heoi3')],ans:0,
   why:'朋友行向我呢邊 → 過嚟。',th:'เพื่อนข้ามมาหาฉัน → 過嚟'},
  {cat:'lai',scene:'🙋我喺呢邊\n🏪 對面嗰邊',zh:'我___對面買嘢。',j:'ngo5 ___ deoi3 min6 maai5 je5.',t:'ฉัน ___ ฝั่งตรงข้ามซื้อของ',
   opts:[O('過去','gwo3 heoi3'),O('過嚟','gwo3 lai4')],ans:0,
   why:'我離開呢邊，去對面 → 過去。',th:'ฉันจากฝั่งนี้ไปฝั่งตรงข้าม → 過去'},
  {cat:'lai',scene:'🙋我喺出面\n🏠 想入屋睇下',zh:'我___睇下。',j:'ngo5 ___ tai2 haa5.',t:'ฉัน ___ ดูหน่อย (ฉันอยู่ข้างนอก)',
   opts:[O('入去','jap6 heoi3'),O('入嚟','jap6 lai4')],ans:0,
   why:'我入去一個我而家唔喺嘅地方 → 去。',th:'ฉันเข้าไปในที่ที่ฉันไม่ได้อยู่ → 去'}
];

/* ── STATE ────────────────────────────────────────────── */
const TABS = [['pos','📍 位置'],['compass','🧭 東南西北'],['inout','🚪 入面·出面'],['lai','🏃 出嚟·出去'],['pat','🧱 句型'],['quiz','📝 練習'],['game','🧭 方向遊戲']];
const St = {tab:'pos', scen:0, total:0, Q:null};

/* ── VIEWS ────────────────────────────────────────────── */
function viewPos(){
  const cross = CROSS.map(c=>'<button class="cx '+c.k+'" data-say="'+esc(c.w)+'"><span class="em">'+c.em+'</span><span class="jy">'+c.j+'</span><span class="zc">'+c.w+'</span><span class="th">'+c.t+'</span></button>').join('');
  const words = WORDS.map(w=>
    '<div class="wcard">'+wordHead(w.w,w.j,w.t,w.alt)
    +(w.scene?'<div class="scene">'+w.scene+'</div>':'')
    +(w.tip?'<div class="th" style="margin-bottom:2px">'+w.tip+'</div>':'')
    +exRow(w.ex)+'</div>').join('');
  return '<div class="sec">📍 上、下、左、右 <small>บน ล่าง ซ้าย ขวา</small></div>'
    +'<div class="cross">'+cross+'</div>'
    +'<div class="note"><b>面 同 邊</b>：「左面」同「左邊」意思一樣，日常都可以互換。<div class="th">面 (min6) กับ 邊 (bin1) ใช้แทนกันได้</div></div>'
    +'<div class="sec">🚶 前面、後面 <small>ข้างหน้า ข้างหลัง</small></div>'
    +'<div class="card"><div class="queue"><div class="qlab"><b>後面</b><span class="jy">hau6 min6</span></div><span>👤</span><span>👤</span><div class="me">🧍<i>我 ➡️</i></div><span>👤</span><span>👤</span><div class="qlab"><b>前面</b><span class="jy">cin4 min6</span></div></div>'
    +'<div class="th" style="text-align:center">🧍 面向右邊 → 右邊係前面，左邊係後面</div></div>'
    +'<div class="note"><b>點睇方向？</b> 左／右：以講嘢嗰個人嘅左手、右手做準。前／後：睇個人面向邊度。<div class="th">ซ้าย/ขวา ดูจากมุมของผู้พูด · หน้า/หลัง ดูจากทิศที่หันหน้าไป</div></div>'
    +'<div class="sec">📚 位置詞＋例句 <small>คำบอกตำแหน่ง + ตัวอย่างประโยค</small></div>'
    +'<div class="wgrid">'+words+'</div>';
}

function viewCompass(){
  const rose = ROSE.map(r=>{
    if(r.center) return '<div class="rc center">'+r.center+'</div>';
    return '<button class="rc'+(r.main?' main':'')+'" data-say="'+esc(r.w)+'"><span class="jy">'+r.j+'</span><span class="zc">'+r.w+'</span><span class="th">'+r.t+'</span></button>';
  }).join('');
  return '<div class="sec">🧭 東南西北 <small>ตะวันออก ใต้ ตะวันตก เหนือ</small></div>'
    +'<div class="rose">'+rose+'</div>'
    +'<div class="card" style="text-align:center"><div class="jy">dung1 naam4 sai1 bak1</div><div class="zc">東 → 南 → 西 → 北</div><div class="th">เรียงตามเข็มนาฬิกา · 地圖：上面係北，右面係東</div></div>'
    +'<div class="note"><b>斜角方向</b>：先講東／西，再講南／北，例如：東北、西南。<div class="th">ทิศเฉียงให้พูด 東/西 ก่อน แล้วตามด้วย 南/北 · แผนที่ด้านบนคือทิศเหนือ</div></div>'
    +'<div class="note"><b>加「面」</b>：北面＝北邊 bak1 bin1，東面＝東邊 dung1 bin1。'
    +'<div class="th">เติม 面 หรือ 邊 ต่อท้าย เช่น 北面 = ทางเหนือ</div></div>'
    +'<div class="sec">💬 例句 <small>ตัวอย่างประโยค</small></div>'
    +'<div class="card">'+COMPASS_EX.map(exRow).join('')+'</div>';
}

function viewInout(){
  const cards = INOUT.map(w=>
    '<div class="wcard">'+wordHead(w.w,w.j,w.t,w.alt)+'<div class="scene">'+w.scene+'</div>'+w.exs.map(exRow).join('')+'</div>').join('');
  const rows = CONTRAST.map(r=>
    '<div><div class="jy">'+r[0].j+'</div><div class="zc" style="font-size:17px;font-weight:500">'+r[0].zh+'</div><div class="th">'+r[0].t+'</div>'+sayBtn(r[0].zh)+'</div>'
    +'<div><div class="jy">'+r[1].j+'</div><div class="zc" style="font-size:17px;font-weight:500">'+r[1].zh+'</div><div class="th">'+r[1].t+'</div>'+sayBtn(r[1].zh)+'</div>').join('');
  return '<div class="sec">🚪 入面、出面 <small>ข้างใน ข้างนอก</small></div>'
    +'<div class="wgrid">'+cards+'</div>'
    +'<div class="sec">⚖️ 位置 vs 動作 <small>ตำแหน่ง vs การเคลื่อนที่</small></div>'
    +'<div class="cmp"><div class="h">📍 位置：喺 + 入面／出面<br><span class="th">อยู่ที่ไหน</span></div><div class="h">🏃 動作：入／出 + 嚟／去<br><span class="th">เคลื่อนไปทางไหน</span></div>'+rows+'</div>'
    +'<div class="note"><b>記住</b>：「面」係地方（喺邊度），「嚟／去」係動作（行去邊）。<div class="th">面 = สถานที่ · 嚟/去 = การเคลื่อนไหว</div></div>'
    +'<button class="go" data-go="lai">👉 學：幾時用「出嚟」，幾時用「出去」</button>';
}

function houseHtml(s){
  function tok(who,zone){
    const isMe = who==='me';
    const moving = (s.mover===who);
    let arrow = '';
    if(moving) arrow = '<span class="ar">'+(s.move==='up'?'⬆️':'⬇️')+'</span>';
    return '<div class="tk'+(isMe?' me':'')+'">'+arrow+'<span>'+(isMe?'🙋':'🧑')+'</span><i>'+(isMe?'我':'佢／朋友')+'</i></div>';
  }
  const inT=[], outT=[];
  (s.me==='in'?inT:outT).push(tok('me'));
  if(s.other) (s.other==='in'?inT:outT).push(tok('other'));
  return '<div class="house"><div class="zone in"><div class="zl">🏠 入面 jap6 min6</div><div class="toks2">'+inT.join('')+'</div></div>'
    +'<div class="zone out"><div class="zl">🌳 出面 ceot1 min6</div><div class="toks2">'+outT.join('')+'</div></div></div>';
}

function viewLai(){
  const s = SCEN[St.scen];
  const chips = SCEN.map((c,i)=>'<button class="chip'+(i===St.scen?' act':'')+'" data-scen="'+i+'">'+c.chip+'</button>').join('');
  const toward = s.ans==='lai';
  const pairs = PAIRS.map(p=>
    '<div class="card"><div class="wh" style="margin-bottom:8px"><div><div class="jy">'+p.vj+'</div><div class="zc">'+p.v+'</div></div><div class="th">'+p.vt+'</div></div>'
    +'<div class="pair">'
    +'<div class="l"><div class="jy">'+p.lai.j+'</div><div class="zc">'+p.lai.w+'</div><div class="th">'+p.lai.t+'</div>'
      +'<div class="exs"><div><div class="jy">'+p.lai.ex.j+'</div><div class="zc">'+p.lai.ex.zh+'</div><div class="th">'+p.lai.ex.t+'</div></div>'+sayBtn(p.lai.ex.zh)+'</div></div>'
    +'<div class="r"><div class="jy">'+p.heoi.j+'</div><div class="zc">'+p.heoi.w+'</div><div class="th">'+p.heoi.t+'</div>'
      +'<div class="exs"><div><div class="jy">'+p.heoi.ex.j+'</div><div class="zc">'+p.heoi.ex.zh+'</div><div class="th">'+p.heoi.ex.t+'</div></div>'+sayBtn(p.heoi.ex.zh)+'</div></div>'
    +'</div></div>').join('');
  const deix = DEIX.map(d=>'<button class="rchip" data-say="'+esc(d.w)+'"><div class="jy">'+d.j+'</div><div class="zc">'+d.w+'</div><div class="th">'+d.t+'</div></button>').join('');
  return '<div class="sec">🏃 出嚟 vs 出去 <small>ออกมา vs ออกไป</small></div>'
    +'<div class="rule">'
    +'<div class="lai"><div class="jy">lai4</div><div class="zc">嚟</div><div class="big">向住「我」呢邊 ➜ 🙋</div><div class="th">เคลื่อนเข้าหาผู้พูด = มา</div></div>'
    +'<div class="heoi"><div class="jy">heoi3</div><div class="zc">去</div><div class="big">🙋 ➜ 離開「我」呢邊</div><div class="th">เคลื่อนออกจากผู้พูด = ไป</div></div></div>'
    +'<div class="note"><b>同泰文一樣！</b> 出嚟＝ออกมา，出去＝ออกไป；入嚟＝เข้ามา，入去＝เข้าไป。關鍵係「講嘢嗰個人喺邊」。<div class="th">หลักเดียวกับภาษาไทย: ดูว่า "ผู้พูดอยู่ตรงไหน"</div></div>'
    +'<div class="sec">🔍 試下六個情況 <small>ลองดู 6 สถานการณ์</small></div>'
    +'<div class="chips">'+chips+'</div>'
    +houseHtml(s)
    +'<div class="verdict '+(toward?'lai':'heoi')+'"><div class="th">'+(toward?'箭咀向住我 ➜ 嚟 (มา)':'箭咀離開我 ➜ 去 (ไป)')+'</div><div class="jy">'+s.pj+'</div><div class="zc">'+s.p+'</div><div class="th">'+s.pt+'</div>'
    +'<div class="why">'+s.why+'<div class="th">'+s.th+'</div></div></div>'
    +'<div class="card">'+exRow(s.ex)+'</div>'
    +'<div class="sec">📖 六對動作 <small>6 คู่กริยาทิศทาง</small></div>'
    +pairs
    +'<div class="sec">🧷 指示詞 <small>คำชี้ตำแหน่ง</small></div>'
    +'<div class="rchips">'+deix+'</div>'
    +'<div class="sec">💡 小提示 <small>เคล็ดลับ</small></div>'
    +'<div class="note"><b>1. 睇講嘢嘅人，唔係睇個人去邊。</b>同一個動作，我喺入面同我喺出面，講法唔同。<div class="th">ดูที่ตำแหน่งผู้พูด ไม่ใช่ดูว่าคนนั้นไปไหน</div></div>'
    +'<div class="note"><b>2. 打電話：可以用對方嘅位置做角度。</b>例如我行緊出去見你，可以講「我出嚟喇」（行緊嚟你度）；淨係想講我離開緊呢度，就講「我出去喇」。<div class="th">เวลาคุยโทรศัพท์ จะใช้ตำแหน่งของคู่สนทนาเป็นจุดอ้างอิงก็ได้</div></div>'
    +'<div class="note"><b>3. 出嚟仲可以表示「出現」。</b>例如：太陽出嚟喇（日頭出來），結果出嚟喇（結果出來）。<div class="th">出嚟 ยังหมายถึง "โผล่ออกมา / ปรากฏ" ได้ด้วย</div>'
    +'<div style="margin-top:6px">'+exRow({zh:'太陽出嚟喇！',j:'taai3 joeng4 ceot1 lai4 laa1!',t:'พระอาทิตย์โผล่ออกมาแล้ว!'})+exRow({zh:'結果出嚟喇。',j:'gip3 gwo2 ceot1 lai4 laa1.',t:'ผลออกมาแล้ว'})+'</div></div>';
}

function toks(arr){
  return '<div class="toks">'+arr.map(t=>{
    const r=t[2].split('|');
    return '<div class="tok" style="border-color:'+t[3]+'"><div class="tr" style="color:'+t[3]+'">'+r[0]+'</div><div class="jy">'+t[1]+'</div><div class="zc">'+t[0]+'</div><div class="th">'+(r[1]||'')+'</div></div>';
  }).join('')+'</div>';
}
function viewPat(){
  const pats = PATS.map(p=>
    '<div class="card"><div style="font-weight:700;font-family:var(--serif)">'+p.title+'</div><div class="th">'+p.th+'</div>'
    +'<div class="formula">'+p.formula+'</div>'+toks(p.tokens)+exRow(p.ex)
    +(p.note?'<div class="note" style="margin-bottom:0">'+p.note+'</div>':'')+'</div>').join('');
  const dlg = DIALOG.map(l=>
    '<div class="dl"><div class="spkr">'+l[0]+'</div><div class="bub"><div><div class="jy">'+l[2]+'</div><div class="zc">'+l[1]+'</div><div class="th">'+l[3]+'</div></div>'+sayBtn(l[1])+'</div></div>').join('');
  const route = ROUTE.map(r=>'<button class="rchip" data-say="'+esc(r.w)+'"><div class="jy">'+r.j+'</div><div class="zc">'+r.w+'</div><div class="th">'+r.t+'</div></button>').join('');
  return '<div class="sec">🧱 位置句型 <small>โครงสร้างประโยคบอกตำแหน่ง</small></div>'+pats
    +'<div class="sec">🗺️ 問路 <small>ถามทาง</small></div>'
    +'<div class="rchips" style="margin-bottom:12px">'+route+'</div>'
    +dlg;
}

/* quiz */
function qStart(mode){
  const pool = QBANK.filter(q=>mode==='all'||q.cat===mode);
  St.Q = {mode:mode, list:shuffle(pool).slice(0,10).map(q=>Object.assign({},q,{order:shuffle(q.opts.map((o,i)=>i))})), i:0, score:0, picked:null, done:false};
}
function viewQuiz(){
  if(!St.Q) qStart('all');
  const Q = St.Q;
  const modes = [['all','全部'],['pos','📍 方位'],['compass','🧭 東南西北'],['lai','🏃 嚟／去']];
  const chips = '<div class="chips">'+modes.map(m=>'<button class="chip'+(Q.mode===m[0]?' act':'')+'" data-qmode="'+m[0]+'">'+m[1]+'</button>').join('')+'</div>';
  if(Q.done){
    const max = Q.list.length*10;
    return chips+'<div class="result"><div style="font-size:44px">'+(Q.score>=max*0.8?'🎉':'💪')+'</div><div class="zc">完成！</div><div class="big">'+Q.score+' / '+max+'</div><div class="th">เก่งมาก! 叻仔！</div><button class="btn" data-retry="1">再玩一次</button></div>';
  }
  const q = Q.list[Q.i];
  const answered = Q.picked!==null;
  const right = q.opts[q.ans];
  const fillZh = answered ? '<b class="fill">'+right.w+'</b>' : '<span class="blank">　　</span>';
  const fillJ = answered ? '<b class="fill">'+right.j+'</b>' : '<span class="blank">　　</span>';
  const stemZh = q.zh.replace(/_+/,fillZh);
  const stemJ = q.j.replace(/_+/,fillJ);
  const opts = q.order.map(idx=>{
    const o = q.opts[idx];
    let cls = 'qopt';
    if(answered){ if(idx===q.ans) cls+=' ok'; else if(idx===Q.picked) cls+=' bad'; else cls+=' dim'; }
    return '<button class="'+cls+'" data-opt="'+idx+'"><span class="jy">'+o.j+'</span><span class="zc">'+o.w+'</span></button>';
  }).join('');
  let fb = '';
  if(answered){
    const ok = Q.picked===q.ans;
    fb = '<div class="fb '+(ok?'ok':'err')+'">'+(ok?'✓ 啱喇！ +10':'✗ 唔啱，正確係「'+right.w+'」')+'</div>'
      +'<div class="why2">'+q.why+'<div class="th">'+q.th+'</div></div>'
      +'<div style="text-align:center"><button class="btn" data-next="1">'+(Q.i+1>=Q.list.length?'睇成績 ➜':'下一題 ➜')+'</button></div>';
  }
  return chips+'<div class="g-hdr"><span class="score-pill">★ '+Q.score+'</span><span class="round-pill">'+(Q.i+1)+' / '+Q.list.length+'</span></div>'
    +'<div class="qcard"><div class="scene">'+q.scene+'</div><div class="jy">'+stemJ+'</div><div class="zc">'+stemZh+'</div><div class="th">'+q.t+'</div>'
    +(answered?'<div style="margin-top:6px">'+sayBtn(q.zh.replace(/_+/,right.w))+'</div>':'')+'</div>'
    +'<div class="qopts">'+opts+'</div>'+fb;
}

const VIEWS = {pos:viewPos, compass:viewCompass, inout:viewInout, lai:viewLai, pat:viewPat, quiz:viewQuiz};

/* ── render ── */
const barEl=document.getElementById('dir-bar'),hostEl=document.getElementById('dir-host'),gameBox=document.getElementById('dir-gamebox');
function stopGameTimer(){try{if(typeof GS!=='undefined'&&GS.tab==='direction')clearTimeout(GS.timer);}catch(e){}}
function render(scrollTop){
  barEl.innerHTML=TABS.map(t=>'<button class="tm-tab'+(t[0]===St.tab?' act':'')+'" data-dt="'+t[0]+'">'+t[1]+'</button>').join('');
  const isGame=St.tab==='game';
  hostEl.style.display=isGame?'none':'';gameBox.style.display=isGame?'':'none';
  if(isGame){initGame('direction');}    // 原本「遊戲」入面嘅方向遊戲（Lv1–3），已搬入呢頁
  else{stopGameTimer();$('view').innerHTML=VIEWS[St.tab]();}
  if(scrollTop){try{window.scrollTo(0,0);}catch(e){}}
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

function addScore(n){award(n,'dq',false);}
/* ── events ── */
barEl.addEventListener('click',e=>{const b=e.target.closest('[data-dt]');if(!b)return;if(St.tab==='game')stopGameTimer();St.tab=b.dataset.dt;render(true);});
SR.addEventListener('click', function(e){
  const t = e.target;
  let b;
  if((b=t.closest('[data-say]'))){ Speech.speak(b.getAttribute('data-say')); return; }
  if((b=t.closest('[data-go]'))){ St.tab=b.getAttribute('data-go'); render(true); return; }
  if((b=t.closest('[data-tog]'))){
    const k=b.getAttribute('data-tog');
    const cls = k==='jyut'?'hide-jyut':'hide-thai';
    b.classList.toggle('on');
    host.classList.toggle(cls, !b.classList.contains('on'));
    return;
  }
  if((b=t.closest('[data-scen]'))){ St.scen=+b.getAttribute('data-scen'); render(false); return; }
  if((b=t.closest('[data-qmode]'))){ qStart(b.getAttribute('data-qmode')); render(false); return; }
  if((b=t.closest('[data-retry]'))){ qStart(St.Q.mode); render(false); return; }
  if((b=t.closest('[data-opt]'))){
    const Q=St.Q; if(!Q||Q.picked!==null) return;
    const idx=+b.getAttribute('data-opt');
    Q.picked=idx;
    if(idx===Q.list[Q.i].ans){ Q.score+=10; addScore(10); }
    render(false); return;
  }
  if((b=t.closest('[data-next]'))){
    const Q=St.Q;
    if(Q.i+1>=Q.list.length){ Q.done=true; award(0,'dq',false); } else { Q.i++; Q.picked=null; }
    render(false); return;
  }
});
window.dirShow=function(){render(false);};
window.dirLeave=function(){stopGameTimer();try{speechSynthesis.cancel();}catch(e){}};
Speech.init();
render(false);
})();

