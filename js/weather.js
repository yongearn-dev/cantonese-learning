/* ═══ 香港天氣（四季／警告信號／詞彙／對話／練習）═══
   同 classifier.js 一樣用 Shadow DOM 隔離；需要 #wx-bar、#wx-host（index.html）
   粵拼：<ruby class="jr"><rt data-j>（同全站引擎一致）；泰文 .thx 跟全站「粵拼／泰文」掣（host 嘅 hide-jy／hide-th）
   計分：答啱一題 APP_AWARD(10)；完成一輪 APP_LOGHIST(分數,'wx')；console 打 __wxMiss 睇邊啲字冇粵拼 */
(function(){
'use strict';
var host=document.getElementById('wx-host');if(!host||!host.attachShadow)return;
var CSS_TEXT=`*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%;--bg:#F1F0E4;--surface:#fff;--surface2:#E7E6D6;--border:#D9D6C4;--text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;--accent:#0E6B57;--accent-bg:#E3EFE9;--yellow:#A9701C;--yellow-bg:#F8EDDA;--green:#1D8A5C;--green-bg:#E6F4EC;--red:#C1402A;--red-bg:#FAEAE4;--radius:12px;--shadow:0 1px 4px rgba(0,0,0,.08);--serif:'Noto Serif TC',serif}
.page{display:none}.page.act{display:block}
.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:22px 0 10px}
.sec:first-child{margin-top:0}
.note{font-size:12px;color:var(--text-sub);margin-bottom:12px}
ruby{margin:0 1px}
:host(.hide-th) .th{display:none}:host(.hide-jy) .jy{display:none}
.th{font-family:'Noto Sans Thai';color:var(--text-sub);font-size:12px;margin-top:3px}
.spk{border:1px solid var(--border);background:var(--surface2);border-radius:7px;padding:2px 9px;font-size:11px;color:var(--text-sub);cursor:pointer;font-family:inherit;flex-shrink:0}
.spk:hover{border-color:var(--accent);color:var(--accent)}
.zrow{display:flex;align-items:flex-end;justify-content:space-between;gap:8px}.zrow>.rb{flex:1;min-width:0}
.hero{position:relative;background:var(--surface);border:1.5px solid var(--border);border-left:5px solid var(--accent);border-radius:4px;padding:20px 18px;margin-bottom:16px;overflow:hidden}
.hero::before{content:'';position:absolute;top:-30px;right:-30px;width:120px;height:120px;border-radius:50%;background:var(--accent-bg)}
.hero>*{position:relative}
.hero-t{font-family:var(--serif);font-size:22px;font-weight:900}
.hero-th{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub)}
.season-grid{display:grid;grid-template-columns:1fr;gap:12px}
.s-card{background:var(--surface);border:1.5px solid var(--border);border-top:5px solid;border-radius:var(--radius);padding:14px;box-shadow:var(--shadow)}
.s-head{display:flex;align-items:center;gap:10px;margin-bottom:8px}
.s-ico{font-size:34px}
.s-name{font-family:var(--serif);font-size:24px;font-weight:900}
.s-meta{font-size:12px;color:var(--text-sub)}
.temp-bar{position:relative;height:10px;border-radius:5px;background:var(--surface2);margin:10px 0 2px}
.temp-fill{position:absolute;top:0;bottom:0;border-radius:5px}
.temp-lbl{display:flex;justify-content:space-between;font-family:'Space Mono';font-size:10px;color:var(--text-muted)}
.s-sent{font-size:17px;margin:12px 0 4px}
.chips{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.chip{background:var(--surface2);border:1px solid var(--border);border-radius:10px;padding:4px 9px;font-size:13px}
.chip .th{margin-top:0;font-size:11px}
.s-lbl{font-size:11px;font-weight:700;color:var(--text-muted);margin-top:10px;letter-spacing:.4px}
.strip{display:flex;align-items:center;gap:4px;overflow-x:auto;scrollbar-width:none;margin-bottom:6px;padding-bottom:4px}
.bdg{width:44px;height:44px;border-radius:12px;color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Space Mono';font-weight:700;font-size:20px;flex-shrink:0;box-shadow:0 2px 6px rgba(0,0,0,.18)}
.bdg.round{border-radius:50%}.bdg.sm{font-size:18px}.bdg.emo{font-size:22px}
.w-card{background:var(--surface);border:1.5px solid var(--border);border-left:5px solid;border-radius:var(--radius);padding:13px 14px;margin-bottom:10px;box-shadow:var(--shadow)}
.w-head{display:flex;gap:12px;align-items:center;margin-bottom:8px}
.w-name{font-size:16px;font-weight:700}
.w-row{margin-top:8px}
.w-lbl{font-size:10px;font-weight:700;color:var(--text-muted);margin-bottom:2px}
.w-act{background:var(--accent-bg);border-radius:8px;padding:7px 10px;margin-top:8px}
.w-extra{font-size:12px;color:var(--text-sub);margin-top:8px;border-top:1px dashed var(--border);padding-top:6px}
.w-extra .chips{margin-top:4px}
.box{background:var(--yellow-bg);border:1px solid #ecd8ad;border-radius:var(--radius);padding:12px 14px;margin-bottom:12px}
.box .th{color:var(--yellow)}
.sig{display:block;flex-shrink:0;filter:drop-shadow(0 2px 3px rgba(0,0,0,.2))}
.mini4{display:grid;grid-template-columns:1fr 1fr;gap:2px;flex-shrink:0}
.mini4 .sig{width:100%;height:auto;filter:none}
.sig-grid{display:grid;gap:10px;max-width:420px;margin:8px 0 14px}
.sig-grid.c4{grid-template-columns:repeat(4,1fr)}
.sig-grid.c3{grid-template-columns:repeat(3,1fr);max-width:330px}
.sig-grid .sig{width:100%;height:auto}
.chip.dir{display:flex;align-items:center;gap:8px;padding:4px 10px 4px 4px}
.w-shape{margin-top:8px}
.tip-t{font-size:16px;font-weight:700;margin:2px 0 6px}
.tip-i{display:flex;gap:10px;padding:8px 0;border-top:1px dashed #e2cf9f}
.tip-n{width:22px;height:22px;border-radius:50%;background:var(--yellow);color:#fff;font:700 12px 'Space Mono',monospace;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:16px}
.tip-i .rb{font-size:15px}
.box.tip .th{color:var(--text-sub)}
.v-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.v-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:9px 11px;box-shadow:var(--shadow);cursor:pointer}
.v-card:hover{border-color:var(--accent)}
.v-card .rb{font-size:20px;font-weight:700}
.v-card .th{font-size:12px}
.filter-bar{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:12px}
.f-btn{flex-shrink:0;padding:5px 13px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;cursor:pointer;font-family:inherit;font-weight:500}
.f-btn.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}
.phrase{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 12px;margin-bottom:8px;box-shadow:var(--shadow)}
.phrase .rb{font-size:17px}
.dl-title{font-size:16px;font-weight:700;margin-bottom:8px}
.dl-line{display:flex;gap:10px;margin-bottom:10px}
.dl-sp{font-size:11px;font-weight:700;color:var(--accent);min-width:22px;padding-top:18px}
.dl-b{flex:1;background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:8px 12px;box-shadow:var(--shadow)}
.dl-b .rb{font-size:16px}
.q-hdr{display:flex;justify-content:space-between;margin-bottom:12px}
.pill{background:var(--yellow-bg);border:1.5px solid #ecd8ad;color:var(--yellow);padding:3px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:13px}
.pill.g{background:var(--surface2);border-color:var(--border);color:var(--text-sub)}
.q-card{background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:16px;margin-bottom:12px;text-align:center;box-shadow:var(--shadow)}
.q-card .rb{font-size:19px}
.q-hint{font-size:12px;color:var(--text-sub);margin-bottom:8px}
.opts{display:grid;grid-template-columns:1fr;gap:8px}
.opt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 12px;cursor:pointer;font-family:inherit;text-align:left;color:var(--text);box-shadow:var(--shadow);display:flex;align-items:center;gap:10px}
.opt:hover{border-color:var(--accent);background:var(--accent-bg)}
.opt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}
.opt.bad{border-color:var(--red)!important;background:var(--red-bg)!important}
.opt.dim{opacity:.4;pointer-events:none}
.opt .rb{font-size:16px}
.fb{padding:10px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid;margin-top:10px}
.fb.ok{background:var(--green-bg);color:var(--green);border-color:#bbf7d0}
.fb.err{background:var(--red-bg);color:var(--red);border-color:#fecaca}
.btn{background:var(--accent);color:#fff;border:none;border-radius:10px;padding:10px 26px;font-weight:700;cursor:pointer;font-family:inherit;font-size:14px;margin-top:10px}
.btn.g{background:var(--surface2);color:var(--text)}
.result{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:30px 20px;text-align:center;box-shadow:var(--shadow)}
.result .big{font-family:'Space Mono';font-size:34px;font-weight:700;color:var(--accent)}
.mode-card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:13px 14px;display:flex;align-items:center;gap:12px;margin-bottom:8px;cursor:pointer;box-shadow:var(--shadow)}
.mode-card:hover{border-color:var(--accent)}
.mode-card .m-ico{font-size:26px}.mode-card .m-t{font-weight:700;font-size:14px}.mode-card .m-s{font-size:12px;color:var(--text-sub)}
.f-btn.act rt[data-j],.btn rt[data-j]{color:#fff}.btn.g rt[data-j]{color:var(--accent)}
@media(min-width:900px){.season-grid{grid-template-columns:1fr 1fr}.v-grid{grid-template-columns:repeat(3,1fr)}.opts{grid-template-columns:1fr 1fr}#p-quiz{max-width:680px;margin:0 auto}}
`;
var SR=host.attachShadow({mode:'open'});
var GRAD='<svg width="0" height="0" style="position:absolute" aria-hidden="true" data-jyr-no><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#707070"/><stop offset="1" stop-color="#262626"/></linearGradient></defs></svg>';
SR.innerHTML='<style>'+CSS_TEXT+'</style>'+GRAD+['season','warn','vocab','talk','quiz'].map(function(p,i){return '<div class="page'+(i?'':' act')+'" id="p-'+p+'"></div>';}).join('');

var $=function(id){return SR.getElementById(id);};
var HAN=/[㐀-鿿]/,CJK=HAN;
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;');}
function xesc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
/* ── 語音（同 classifier.js 一樣） ── */
const Speech={ok:'speechSynthesis' in window,voices:[],
  init(){if(!this.ok)return;const l=()=>{this.voices=speechSynthesis.getVoices();};l();speechSynthesis.addEventListener('voiceschanged',l);},
  say(t){if(!this.ok)return;
    const go=()=>{const u=new SpeechSynthesisUtterance(String(t));
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.indexOf('zh')===0);
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();}};
Speech.init();
/* ── 粵拼：資料入面嘅「中文＋粵拼」全部學起身，其餘純中文（介面字）靠 autoRuby 配返；仲有漏嘅交俾全站引擎 JYM ── */
var WD={},CD={},MISS={};
function L(zh,jy){if(!jy)return;var s=String(jy).match(/[a-z]+[1-6]/g)||[],k=0;
  if(s.length!==Array.from(zh).filter(function(c){return HAN.test(c);}).length)return;
  (zh.match(/[㐀-鿿]+/g)||[]).forEach(function(run){var part=s.slice(k,k+run.length);k+=run.length;
    if(run.length>1&&!WD[run])WD[run]=part;Array.from(run).forEach(function(c,i){if(!CD[c])CD[c]=part[i];});});}
function rubyRun(r){var out='',i=0,n=r.length;
  while(i<n){var hit=null,l;for(l=Math.min(14,n-i);l>=2;l--){var w=WD[r.substr(i,l)];if(w){hit=w;break;}}
    if(hit){for(var k=0;k<l;k++)out+='<ruby class="jr">'+r[i+k]+'<rt data-j="'+hit[k]+'"></rt></ruby>';i+=l;}
    else{var c=r[i],j=CD[c];if(j)out+='<ruby class="jr">'+c+'<rt data-j="'+j+'"></rt></ruby>';else{out+=c;if(!MISS[c]){MISS[c]=1;}}i++;}}
  return out;}
function walkText(root,test,skip,fn){var tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),ns=[],n;while((n=tw.nextNode()))ns.push(n);
  ns.forEach(function(n){var p=n.parentNode;if(!p||!test.test(n.nodeValue))return;if(p.closest&&p.closest(skip))return;var d=document.createElement('span');d.innerHTML=fn(n.nodeValue);var f=document.createDocumentFragment();while(d.firstChild)f.appendChild(d.firstChild);p.replaceChild(f,n);});}
function autoRuby(root){walkText(root,/[㐀-鿿]/,'ruby,rt,style,script,svg',function(v){return v.split(/([㐀-鿿]+)/).map(function(x,i){return i%2?rubyRun(x):xesc(x);}).join('');});}
var THR=/([(（]?[฀-๿](?:[฀-๿​\s\d.,\/'"%+:\-·–]*[฀-๿])?[)）]?)/;
function tagThai(root){walkText(root,/[฀-๿]/,'.thx,style,script,svg',function(v){return v.split(THR).map(function(x,i){return i%2?'<span class="thx">'+xesc(x)+'</span>':xesc(x);}).join('');});}
// 粵拼放喺每個字上面（<ruby class="jr"><rt data-j>，同全站引擎一樣）；標點冇粵拼
function rb(zh,jp){
  L(zh,String(jp||'').replace(/[,.?!，。？！]/g,' '));
  const syl=String(jp||'').replace(/[,.?!，。？！]/g,' ').trim().split(/\s+/).filter(Boolean);
  const n=Array.from(zh).filter(c=>HAN.test(c)).length;
  if(syl.length!==n){console.warn('[wx rb] 粵拼數量唔對',zh,jp);return '<span class="rb">'+xesc(zh)+'</span>';}
  let k=0,out='';
  for(const ch of zh){out+=HAN.test(ch)?'<ruby class="jr">'+ch+'<rt data-j="'+syl[k++]+'"></rt></ruby>':xesc(ch);}
  return '<span class="rb">'+out+'</span>';
}
function th(t){return '<div class="th">'+t+'</div>';}
function spk(text){if(!Speech.ok)return'';return '<button class="spk" data-t="'+esc(text)+'" onclick="WX.say(this.dataset.t)">▶ 聽</button>';}
var SUP=[
 ['香港有四季','hoeng1 gong2 jau5 sei3 gwai3'],
 ['香港喺亞熱帶','hoeng1 gong2 hai2 aa3 jit6 daai3'],
 ['夏天又長又熱','haa6 tin1 jau6 coeng4 jau6 jit6'],
 ['冬天好短','dung1 tin1 hou2 dyun2'],
 ['春天同秋天都唔長','ceon1 tin1 tung4 cau1 tin1 dou1 m4 coeng4'],
 ['仲有','zung6 jau5'],
 ['冇雪㗎','mou5 syut3 gaa3'],
 ['溫度係大約數字','wan1 dou6 hai6 daai6 joek3 sou3 zi6'],
 ['每年唔同','mui5 nin4 m4 tung4'],
 ['大約','daai6 joek3'],
 ['常見天氣詞','soeng4 gin3 tin1 hei3 ci4'],
 ['著咩衫','zoek3 me1 saam1'],
 ['帶咩','daai3 me1'],
 ['天氣警告信號','tin1 hei3 ging2 gou3 seon3 hou6'],
 ['天文台會發出唔同嘅警告','tin1 man4 toi4 wui5 faat3 ceot1 m4 tung4 ge3 ging2 gou3'],
 ['最緊要記住','zeoi3 gan2 jiu3 gei3 zyu6'],
 ['八號風球','baat3 hou6 fung1 kau4'],
 ['黑色暴雨','hak1 sik1 bou6 jyu5'],
 ['風球同暴雨嘅符號跟天文台嘅圖案畫','fung1 kau4 tung4 bou6 jyu5 ge3 fu4 hou6 gan1 tin1 man4 toi4 ge3 tou4 on3 waak6'],
 ['掛','gwaa3'],
 ['除風球','ceoi4 fung1 kau4'],
 ['符號形狀','fu4 hou6 jing4 zong6'],
 ['意思','ji3 si1'],
 ['點做','dim2 zou6'],
 ['小提示','siu2 tai4 si6'],
 ['天氣詞彙','tin1 hei3 ci4 wui6'],
 ['撳一下詞語就可以聽發音','gam6 jat1 haa5 ci4 jyu5 zau6 ho2 ji5 teng1 faat3 jam1'],
 ['常用句子','soeng4 jung6 geoi3 zi2'],
 ['聽','teng1'],
 ['天氣','tin1 hei3'],
 ['感覺','gam2 gok3'],
 ['預報','jyu6 bou3'],
 ['用品','jung6 ban2'],
 ['天氣對話','tin1 hei3 deoi3 waa6'],
 ['今日好熱','gam1 jat6 hou2 jit6'],
 ['天氣練習','tin1 hei3 lin6 zaap6'],
 ['揀一個練習','gaan2 jat1 go3 lin6 zaap6'],
 ['每次','mui5 ci3'],
 ['題','tai4'],
 ['睇描述','tai2 miu4 seot6'],
 ['揀信號','gaan2 seon3 hou6'],
 ['見到信號','gin3 dou2 seon3 hou6'],
 ['呢個係邊個季節','ni1 go3 hai6 bin1 go3 gwai3 zit3'],
 ['睇符號','tai2 fu4 hou6'],
 ['認信號','jing6 seon3 hou6'],
 ['呢個警告係咩意思','ni1 go3 ging2 gou3 hai6 me1 ji3 si1'],
 ['見到呢個信號','gin3 dou2 ni1 go3 seon3 hou6'],
 ['應該點做','jing1 goi1 dim2 zou6'],
 ['呢個符號係咩信號','ni1 go3 fu4 hou6 hai6 me1 seon3 hou6'],
 ['完成','jyun4 sing4'],
 ['叻仔','lek1 zai2'],
 ['再玩一次','zoi3 waan2 jat1 ci3'],
 ['揀其他練習','gaan2 kei4 taa1 lin6 zaap6'],
 ['睇成績','tai2 sing4 zik1'],
 ['下一題','haa6 jat1 tai4'],
 ['返回','faan2 wui4'],
 ['啱','ngaam1'],
 ['答案','daap3 on3'],
 ['四季','sei3 gwai3'],
 ['警告信號','ging2 gou3 seon3 hou6'],
 ['詞彙','ci4 wui6'],
 ['對話','deoi3 waa6'],
 ['練習','lin6 zaap6'],
 ['同','tung4']];

/* ═══════════════ DATA（用戶原稿，冇改） ═══════════════ */
const SEASONS = [
  {id:'spring', ico:'🌸', color:'#C1704F', zh:'春天', jp:'ceon1 tin1', th:'ฤดูใบไม้ผลิ',
   mz:'三月至五月', mj:'saam1 jyut6 zi3 ng5 jyut6', mt:'มีนาคม – พฤษภาคม', lo:17, hi:27,
   sz:'春天又濕又暖，間中有霧。', sj:'ceon1 tin1 jau6 sap1 jau6 nyun5, gaan3 zung1 jau5 mou6.', st:'ฤดูใบไม้ผลิทั้งชื้นทั้งอุ่น บางครั้งมีหมอก',
   words:[['濕','sap1','ชื้น'],['霧','mou6','หมอก'],['回南天','wui4 naam4 tin1','ช่วงอากาศชื้นจัด ผนังและพื้นเปียก']],
   wear:[['外套','ngoi6 tou3','เสื้อคลุม']]},
  {id:'summer', ico:'☀️', color:'#D9622B', zh:'夏天', jp:'haa6 tin1', th:'ฤดูร้อน',
   mz:'六月至八月', mj:'luk6 jyut6 zi3 baat3 jyut6', mt:'มิถุนายน – สิงหาคม', lo:26, hi:32,
   sz:'夏天好熱，仲有颱風同雷暴。', sj:'haa6 tin1 hou2 jit6, zung6 jau5 toi4 fung1 tung4 leoi4 bou6.', st:'ฤดูร้อนร้อนมาก และมีไต้ฝุ่นกับพายุฝนฟ้าคะนอง',
   words:[['颱風','toi4 fung1','ไต้ฝุ่น'],['雷暴','leoi4 bou6','พายุฝนฟ้าคะนอง'],['驟雨','zau6 jyu5','ฝนซู่'],['悶焗','mun6 guk6','อบอ้าว']],
   wear:[['短袖','dyun2 zau6','เสื้อแขนสั้น'],['遮','ze1','ร่ม']]},
  {id:'autumn', ico:'🍂', color:'#A9701C', zh:'秋天', jp:'cau1 tin1', th:'ฤดูใบไม้ร่วง',
   mz:'九月至十一月', mj:'gau2 jyut6 zi3 sap6 jat1 jyut6', mt:'กันยายน – พฤศจิกายน', lo:21, hi:29,
   sz:'秋天天氣最舒服，又乾爽又涼快。', sj:'cau1 tin1 tin1 hei3 zeoi3 syu1 fuk6, jau6 gon1 song2 jau6 loeng4 faai3.', st:'ฤดูใบไม้ร่วงอากาศสบายที่สุด แห้งและเย็นสบาย',
   words:[['乾爽','gon1 song2','แห้งสบาย'],['涼快','loeng4 faai3','เย็นสบาย']],
   wear:[['薄外套','bok6 ngoi6 tou3','เสื้อคลุมบาง']]},
  {id:'winter', ico:'❄️', color:'#2563eb', zh:'冬天', jp:'dung1 tin1', th:'ฤดูหนาว',
   mz:'十二月至二月', mj:'sap6 ji6 jyut6 zi3 ji6 jyut6', mt:'ธันวาคม – กุมภาพันธ์', lo:13, hi:20,
   sz:'冬天好乾，有冷鋒就會好凍。', sj:'dung1 tin1 hou2 gon1, jau5 laang5 fung1 zau6 wui5 hou2 dung3.', st:'ฤดูหนาวแห้งมาก ถ้ามีมวลอากาศเย็นก็จะหนาวมาก',
   words:[['乾','gon1','แห้ง'],['冷鋒','laang5 fung1','แนวปะทะอากาศเย็น'],['凍','dung3','หนาว']],
   wear:[['大褸','daai6 lau1','เสื้อโค้ทหนา'],['頸巾','geng2 gan1','ผ้าพันคอ']]},
];

const WARNS = [
  // ── 熱帶氣旋信號（風球）
  {id:'t1', g:'tc', bd:'1', shz:'一個「T」字', shj:'jat1 go3 zi6', sht:'รูปตัว T', color:'#1D8A5C', nz:'一號戒備信號', nj:'jat1 hou6 gaai3 bei6 seon3 hou6', nt:'สัญญาณเตรียมพร้อมหมายเลข 1',
   dz:'熱帶氣旋喺香港附近，要留意天氣。', dj:'jit6 daai3 hei3 syun4 hai2 hoeng1 gong2 fu6 gan6, jiu3 lau4 ji3 tin1 hei3.', dt:'พายุหมุนเขตร้อนอยู่ใกล้ฮ่องกง ควรติดตามสภาพอากาศ (ห่างไม่เกินราว 800 กม.)',
   az:'返學返工照常。', aj:'faan1 hok6 faan1 gung1 ziu3 soeng4.', at:'ไปเรียนไปทำงานตามปกติ'},
  {id:'t3', g:'tc', bd:'3', shz:'一個倒轉嘅「T」字', shj:'jat1 go3 dou3 zyun2 ge3 zi6', sht:'รูปตัว T กลับหัว', color:'#A9701C', nz:'三號強風信號', nj:'saam1 hou6 koeng4 fung1 seon3 hou6', nt:'สัญญาณลมแรงหมายเลข 3',
   dz:'風力變強，出街要小心。', dj:'fung1 lik6 bin3 koeng4, ceot1 gaai1 jiu3 siu2 sam1.', dt:'ลมแรงขึ้น ออกไปข้างนอกต้องระวัง (ลมต่อเนื่อง 41–62 กม./ชม.)',
   az:'返學返工照常，唔好去海邊。', aj:'faan1 hok6 faan1 gung1 ziu3 soeng4, m4 hou2 heoi3 hoi2 bin1.', at:'ไปเรียน/ทำงานตามปกติ แต่อย่าไปริมทะเล'},
  {id:'t8', g:'tc', bd:'8', shz:'三角形（向上或者向下）', shj:'saam1 gok3 jing4 hoeng3 soeng6 waak6 ze2 hoeng3 haa6', sht:'สามเหลี่ยมชี้ขึ้นหรือชี้ลง', color:'#D9622B', nz:'八號烈風或暴風信號', nj:'baat3 hou6 lit6 fung1 waak6 bou6 fung1 seon3 hou6', nt:'สัญญาณพายุแรง/พายุหมายเลข 8',
   dz:'風好大，好危險，要留喺屋企。', dj:'fung1 hou2 daai6, hou2 ngai4 him2, jiu3 lau4 hai2 uk1 kei2.', dt:'ลมแรงมากและอันตราย ต้องอยู่บ้าน (ลมต่อเนื่อง 63–117 กม./ชม.)',
   az:'學校停課，好多公司都放假。', aj:'hok6 haau6 ting4 fo3, hou2 do1 gung1 si1 dou1 fong3 gaa3.', at:'โรงเรียนหยุด หลายบริษัทก็หยุดด้วย',
   extra:'八號分四個風向。向上係北，向下係南，一個三角形係西，兩個三角形係東。', ej:'baat3 hou6 fan1 sei3 go3 fung1 hoeng3. hoeng3 soeng6 hai6 bak1, hoeng3 haa6 hai6 naam4, jat1 go3 saam1 gok3 jing4 hai6 sai1, loeng5 go3 saam1 gok3 jing4 hai6 dung1.', et:'สัญญาณ 8 แบ่งเป็น 4 ทิศทางลม สามเหลี่ยมชี้ขึ้น = เหนือ ชี้ลง = ใต้ สามเหลี่ยม 1 อัน = ตะวันตก 2 อัน = ตะวันออก',
   chips:[['東北','dung1 bak1','ตะวันออกเฉียงเหนือ','8NE'],['西北','sai1 bak1','ตะวันตกเฉียงเหนือ','8NW'],['東南','dung1 naam4','ตะวันออกเฉียงใต้','8SE'],['西南','sai1 naam4','ตะวันตกเฉียงใต้','8SW']]},
  {id:'t9', g:'tc', bd:'9', shz:'兩個三角形，好似沙漏', shj:'loeng5 go3 saam1 gok3 jing4 hou2 ci5 saa1 lau6', sht:'สามเหลี่ยมสองอัน คล้ายนาฬิกาทราย', color:'#C1402A', nz:'九號烈風或暴風風力增強信號', nj:'gau2 hou6 lit6 fung1 waak6 bou6 fung1 fung1 lik6 zang1 koeng4 seon3 hou6', nt:'สัญญาณลมแรงขึ้นอีกหมายเลข 9',
   dz:'風力仲會增強，更加危險。', dj:'fung1 lik6 zung6 wui5 zang1 koeng4, gang3 gaa1 ngai4 him2.', dt:'ลมจะแรงขึ้นอีก อันตรายยิ่งขึ้น',
   az:'留喺屋企，唔好出街。', aj:'lau4 hai2 uk1 kei2, m4 hou2 ceot1 gaai1.', at:'อยู่บ้าน อย่าออกไปข้างนอก'},
  {id:'t10', g:'tc', bd:'10', shz:'一個十字', shj:'jat1 go3 sap6 zi6', sht:'เครื่องหมายบวก (กากบาท)', color:'#7f1d1d', nz:'十號颶風信號', nj:'sap6 hou6 geoi6 fung1 seon3 hou6', nt:'สัญญาณเฮอริเคนหมายเลข 10',
   dz:'最危險，風力好似颶風咁強。', dj:'zeoi3 ngai4 him2, fung1 lik6 hou2 ci5 geoi6 fung1 gam3 koeng4.', dt:'อันตรายที่สุด ลมแรงเท่าเฮอริเคน (ตั้งแต่ 118 กม./ชม.ขึ้นไป)',
   az:'一定要留喺安全嘅地方。', aj:'jat1 ding6 jiu3 lau4 hai2 on1 cyun4 ge3 dei6 fong1.', at:'ต้องอยู่ในที่ปลอดภัยเท่านั้น'},
  // ── 暴雨警告
  {id:'ra', g:'rain', bd:'💧', emo:true, round:true, color:'#E5A400', nz:'黃色暴雨警告信號', nj:'wong4 sik1 bou6 jyu5 ging2 gou3 seon3 hou6', nt:'เตือนฝนตกหนัก สีเหลือง',
   dz:'一個鐘頭落多過三十毫米雨。', dj:'jat1 go3 zung1 tau4 lok6 do1 gwo3 saam1 sap6 hou4 mai5 jyu5.', dt:'ฝนตกเกิน 30 มม. ใน 1 ชั่วโมง',
   az:'出街要帶遮，小心水浸。', aj:'ceot1 gaai1 jiu3 daai3 ze1, siu2 sam1 seoi2 zam3.', at:'ออกไปข้างนอกต้องพกร่ม ระวังน้ำท่วม'},
  {id:'rr', g:'rain', bd:'💧', emo:true, round:true, color:'#D32F2F', nz:'紅色暴雨警告信號', nj:'hung4 sik1 bou6 jyu5 ging2 gou3 seon3 hou6', nt:'เตือนฝนตกหนัก สีแดง',
   dz:'一個鐘頭落多過五十毫米雨。', dj:'jat1 go3 zung1 tau4 lok6 do1 gwo3 ng5 sap6 hou4 mai5 jyu5.', dt:'ฝนตกเกิน 50 มม. ใน 1 ชั่วโมง',
   az:'盡量唔好出街。', aj:'zeon6 loeng6 m4 hou2 ceot1 gaai1.', at:'พยายามอย่าออกไปข้างนอก'},
  {id:'rb', g:'rain', bd:'💧', emo:true, round:true, color:'#1A1A1A', nz:'黑色暴雨警告信號', nj:'hak1 sik1 bou6 jyu5 ging2 gou3 seon3 hou6', nt:'เตือนฝนตกหนัก สีดำ',
   dz:'一個鐘頭落多過七十毫米雨。', dj:'jat1 go3 zung1 tau4 lok6 do1 gwo3 cat1 sap6 hou4 mai5 jyu5.', dt:'ฝนตกเกิน 70 มม. ใน 1 ชั่วโมง',
   az:'一定要留喺安全嘅地方。', aj:'jat1 ding6 jiu3 lau4 hai2 on1 cyun4 ge3 dei6 fong1.', at:'ต้องอยู่ในที่ปลอดภัยเท่านั้น',
   extra:'學校：八號風球同黑雨通常都會停課。返工就要睇公司同政府公布。', ej:'hok6 haau6 baat3 hou6 fung1 kau4 tung4 hak1 jyu5 tung1 soeng4 dou1 wui5 ting4 fo3. faan1 gung1 zau6 jiu3 tai2 gung1 si1 tung4 zing3 fu2 gung1 bou3.', et:'โรงเรียนมักหยุดเมื่อมีสัญญาณ 8 หรือฝนดำ ส่วนการทำงานให้ดูประกาศของบริษัทและรัฐบาล'},
  // ── 其他警告
  {id:'hot', g:'other', bd:'🌡', emo:true, color:'#D9622B', nz:'酷熱天氣警告', nj:'huk6 jit6 tin1 hei3 ging2 gou3', nt:'เตือนอากาศร้อนจัด',
   dz:'預計氣溫會去到三十三度或者以上。', dj:'jyu6 gei3 hei3 wan1 wui5 heoi3 dou3 saam1 sap6 saam1 dou6 waak6 ze2 ji5 soeng6.', dt:'คาดว่าอุณหภูมิจะถึง 33 องศาขึ้นไป',
   az:'多啲飲水，唔好喺太陽下面做運動。', aj:'do1 di1 jam2 seoi2, m4 hou2 hai2 taai3 joeng4 haa6 min6 zou6 wan6 dung6.', at:'ดื่มน้ำเยอะๆ อย่าออกกำลังกายกลางแดด'},
  {id:'cold', g:'other', bd:'🥶', emo:true, color:'#2563eb', nz:'寒冷天氣警告', nj:'hon4 laang5 tin1 hei3 ging2 gou3', nt:'เตือนอากาศหนาวเย็น',
   dz:'預計氣溫會跌到十二度或者以下。', dj:'jyu6 gei3 hei3 wan1 wui5 dit3 dou3 sap6 ji6 dou6 waak6 ze2 ji5 haa6.', dt:'คาดว่าอุณหภูมิจะลดลงถึง 12 องศาหรือต่ำกว่า',
   az:'著多啲衫，保暖。', aj:'zoek3 do1 di1 saam1, bou2 nyun5.', at:'ใส่เสื้อผ้าหนาๆ ให้อบอุ่น'},
  {id:'mon', g:'other', bd:'🌬', emo:true, color:'#0891b2', nz:'強烈季候風信號', nj:'koeng4 lit6 gwai3 hau6 fung1 seon3 hou6', nt:'สัญญาณมรสุมแรง',
   dz:'北風好大，海邊同山頂要小心。', dj:'bak1 fung1 hou2 daai6, hoi2 bin1 tung4 saan1 deng2 jiu3 siu2 sam1.', dt:'ลมเหนือแรง ระวังชายทะเลและยอดเขา (มักเกิดในหน้าหนาว)',
   az:'唔好去海邊。', aj:'m4 hou2 heoi3 hoi2 bin1.', at:'อย่าไปริมทะเล'},
  {id:'thu', g:'other', bd:'⚡', emo:true, color:'#9333ea', nz:'雷暴警告', nj:'leoi4 bou6 ging2 gou3', nt:'เตือนพายุฝนฟ้าคะนอง',
   dz:'好快會打雷閃電，有大雨。', dj:'hou2 faai3 wui5 daa2 leoi4 sim2 din6, jau5 daai6 jyu5.', dt:'เร็วๆ นี้จะมีฟ้าร้องฟ้าผ่า และฝนตกหนัก',
   az:'即刻入屋，唔好企喺樹下面。', aj:'zik1 hak1 jap6 uk1, m4 hou2 kei5 hai2 syu6 haa6 min6.', at:'เข้าไปในอาคารทันที อย่ายืนใต้ต้นไม้'},
  {id:'slip', g:'other', bd:'⛰', emo:true, color:'#92400e', nz:'山泥傾瀉警告', nj:'saan1 nai4 king1 se3 ging2 gou3', nt:'เตือนดินถล่ม',
   dz:'大雨之後，斜坡會比較危險。', dj:'daai6 jyu5 zi1 hau6, ce4 bo1 wui5 bei2 gaau3 ngai4 him2.', dt:'หลังฝนตกหนัก ทางลาดชันจะอันตรายกว่าปกติ',
   az:'唔好行近斜坡。', aj:'m4 hou2 haang4 gan6 ce4 bo1.', at:'อย่าเดินใกล้ทางลาดชัน'},
];

const WGROUPS = {
  tc:{zh:'熱帶氣旋警告信號', jp:'jit6 daai3 hei3 syun4 ging2 gou3 seon3 hou6', th:'สัญญาณพายุหมุนเขตร้อน (風球)'},
  rain:{zh:'暴雨警告信號', jp:'bou6 jyu5 ging2 gou3 seon3 hou6', th:'สัญญาณเตือนฝนตกหนัก'},
  other:{zh:'其他天氣警告', jp:'kei4 taa1 tin1 hei3 ging2 gou3', th:'สัญญาณเตือนอื่นๆ'},
};

const VOCAB = {
  '天氣':[['晴天','cing4 tin1','ฟ้าแจ่มใส'],['陰天','jam1 tin1','ฟ้าครึ้ม'],['多雲','do1 wan4','เมฆมาก'],['落雨','lok6 jyu5','ฝนตก'],['毛毛雨','mou4 mou4 jyu5','ฝนปรอย'],['大雨','daai6 jyu5','ฝนตกหนัก'],['打雷','daa2 leoi4','ฟ้าร้อง'],['閃電','sim2 din6','ฟ้าแลบ'],['起霧','hei2 mou6','หมอกลง'],['吹風','ceoi1 fung1','ลมพัด'],['大風','daai6 fung1','ลมแรง'],['水浸','seoi2 zam3','น้ำท่วม']],
  '感覺':[['熱','jit6','ร้อน'],['凍','dung3','หนาว'],['涼快','loeng4 faai3','เย็นสบาย'],['暖','nyun5','อุ่น'],['濕','sap1','ชื้น'],['乾','gon1','แห้ง'],['悶焗','mun6 guk6','อบอ้าว']],
  '預報':[['天氣預報','tin1 hei3 jyu6 bou3','พยากรณ์อากาศ'],['天文台','tin1 man4 toi4','หอดูดาว (หน่วยงานอุตุฯ)'],['氣溫','hei3 wan1','อุณหภูมิ'],['濕度','sap1 dou6','ความชื้น'],['颱風','toi4 fung1','ไต้ฝุ่น'],['風球','fung1 kau4','สัญญาณพายุ'],['掛風球','gwaa3 fung1 kau4','ชู/ประกาศสัญญาณพายุ'],['除風球','ceoi4 fung1 kau4','ยกเลิกสัญญาณพายุ'],['黃雨','wong4 jyu5','ฝนเหลือง'],['紅雨','hung4 jyu5','ฝนแดง'],['黑雨','hak1 jyu5','ฝนดำ']],
  '用品':[['遮','ze1','ร่ม'],['雨衣','jyu5 ji1','เสื้อกันฝน'],['冷氣','laang5 hei3','แอร์'],['大褸','daai6 lau1','เสื้อโค้ทหนา'],['太陽','taai3 joeng4','ดวงอาทิตย์'],['紫外線','zi2 ngoi6 sin3','รังสียูวี']],
};

const PHRASES = [
  ['今日天氣點呀？','gam1 jat6 tin1 hei3 dim2 aa3?','วันนี้อากาศเป็นยังไงบ้าง'],
  ['今日好熱。','gam1 jat6 hou2 jit6.','วันนี้ร้อนมาก'],
  ['今日幾多度呀？','gam1 jat6 gei2 do1 dou6 aa3?','วันนี้กี่องศา'],
  ['出面落緊雨。','ceot1 min6 lok6 gan2 jyu5.','ข้างนอกฝนกำลังตก'],
  ['聽日會唔會落雨呀？','ting1 jat6 wui5 m4 wui5 lok6 jyu5 aa3?','พรุ่งนี้ฝนจะตกไหม'],
  ['天氣預報話聽日有颱風。','tin1 hei3 jyu6 bou3 waa6 ting1 jat6 jau5 toi4 fung1.','พยากรณ์อากาศบอกว่าพรุ่งนี้มีไต้ฝุ่น'],
  ['記得帶遮呀！','gei3 dak1 daai3 ze1 aa3!','อย่าลืมพกร่มนะ'],
  ['好悶焗呀，開冷氣啦。','hou2 mun6 guk6 aa3, hoi1 laang5 hei3 laa1.','อบอ้าวจัง เปิดแอร์เถอะ'],
];

const DIALOGS = [
  {t:'今日好熱', ico:'☀️', thai:'วันนี้ร้อนมาก', lines:[
    ['A','今日天氣點呀？','gam1 jat6 tin1 hei3 dim2 aa3?','วันนี้อากาศเป็นยังไงบ้าง'],
    ['B','好熱呀，三十三度。','hou2 jit6 aa3, saam1 sap6 saam1 dou6.','ร้อนมาก 33 องศา'],
    ['A','酷熱天氣警告生效，記得飲多啲水。','huk6 jit6 tin1 hei3 ging2 gou3 saang1 haau6, gei3 dak1 jam2 do1 di1 seoi2.','มีประกาศเตือนอากาศร้อนจัด อย่าลืมดื่มน้ำเยอะๆ'],
    ['B','好呀，多謝提醒。','hou2 aa3, do1 ze6 tai4 sing2.','ได้เลย ขอบคุณที่เตือน']]},
  {t:'八號風球', ico:'🌀', thai:'สัญญาณพายุหมายเลข 8', lines:[
    ['A','天文台掛咗八號風球喇！','tin1 man4 toi4 gwaa3 zo2 baat3 hou6 fung1 kau4 laa3!','หอดูดาวประกาศสัญญาณพายุหมายเลข 8 แล้ว!'],
    ['B','咁聽日唔使返學喇。','gam3 ting1 jat6 m4 sai2 faan1 hok6 laa3.','งั้นพรุ่งนี้ไม่ต้องไปโรงเรียนแล้ว'],
    ['A','係呀，不過今晚風大，唔好出街。','hai6 aa3, bat1 gwo3 gam1 maan5 fung1 daai6, m4 hou2 ceot1 gaai1.','ใช่ แต่คืนนี้ลมแรง อย่าออกไปข้างนอก'],
    ['B','我哋留喺屋企睇電視啦。','ngo5 dei6 lau4 hai2 uk1 kei2 tai2 din6 si6 laa1.','พวกเราอยู่บ้านดูทีวีกันเถอะ']]},
  {t:'黑色暴雨', ico:'⛈️', thai:'ฝนดำ', lines:[
    ['A','出面落緊黑雨呀！','ceot1 min6 lok6 gan2 hak1 jyu5 aa3!','ข้างนอกฝนดำกำลังตก!'],
    ['B','咁我哋唔好出去喇。','gam3 ngo5 dei6 m4 hou2 ceot1 heoi3 laa3.','งั้นเราอย่าออกไปเลย'],
    ['A','係呀，等雨停咗先走。','hai6 aa3, dang2 jyu5 ting4 zo2 sin1 zau2.','ใช่ รอฝนหยุดก่อนค่อยไป'],
    ['B','好，我同你喺度等。','hou2, ngo5 tung4 nei5 hai2 dou6 dang2.','ได้ เดี๋ยวฉันรอกับคุณที่นี่']]},
];
const TIP={
  t:['點解只有八號分方向？','dim2 gaai2 zi2 jau5 baat3 hou6 fan1 fong1 hoeng3','ทำไมมีเฉพาะสัญญาณ 8 ที่แบ่งทิศทาง?'],
  items:[
   ['八號嘅意思係：烈風或者暴風會由信號所指嘅方向吹嚟。','baat3 hou6 ge3 ji3 si1 hai6, lit6 fung1 waak6 ze2 bou6 fung1 wui5 jau4 seon3 hou6 so2 zi2 ge3 fong1 hoeng3 ceoi1 lai4.','หมายเลข 8 หมายถึง ลมแรงหรือพายุจะพัดมาจากทิศที่สัญญาณบอก'],
   ['熱帶氣旋喺唔同位置經過，香港受到嘅風向都唔同。','jit6 daai3 hei3 syun4 hai2 m4 tung4 wai6 zi3 ging1 gwo3, hoeng1 gong2 sau6 dou3 ge3 fung1 hoeng3 dou1 m4 tung4.','พายุหมุนเขตร้อนผ่านคนละตำแหน่ง ฮ่องกงก็รับลมคนละทิศ'],
   ['所以八號要分東北、西北、東南、西南，等大家知道風從邊度嚟。','so2 ji5 baat3 hou6 jiu3 fan1 dung1 bak1, sai1 bak1, dung1 naam4, sai1 naam4, dang2 daai6 gaa1 zi1 dou6 fung1 cung4 bin1 dou6 lai4.','ดังนั้นสัญญาณ 8 จึงแบ่งเป็น 4 ทิศ (ตะวันออกเฉียงเหนือ ตะวันตกเฉียงเหนือ ตะวันออกเฉียงใต้ ตะวันตกเฉียงใต้) เพื่อให้รู้ว่าลมพัดมาจากทางไหน'],
   ['其他風球唔講方向：一號講距離，三號講強風，九號同十號講風力加強。','kei4 taa1 fung1 kau4 m4 gong2 fong1 hoeng3, jat1 hou6 gong2 geoi6 lei4, saam1 hou6 gong2 koeng4 fung1, gau2 hou6 tung4 sap6 hou6 gong2 fung1 lik6 gaa1 koeng4.','สัญญาณอื่นไม่ระบุทิศทาง: 1 บอกระยะห่าง 3 บอกลมแรง 9 และ 10 บอกว่าลมแรงขึ้นอีก']
  ]
};

/* ═══════════════ 信號圖 ═══════════════ */
const SIGS={
 '1':{s:'<rect x="12" y="28" width="40" height="10" rx="1"/><rect x="26" y="38" width="12" height="26" rx="1"/>',n:'1',a:'一號戒備信號'},
 '3':{s:'<rect x="26" y="28" width="12" height="26" rx="1"/><rect x="12" y="54" width="40" height="10" rx="1"/>',n:'3',a:'三號強風信號'},
 '8NE':{s:'<polygon points="32,22 12,42 52,42"/><polygon points="32,44 12,64 52,64"/>',n:'8',l:'NE 東北',a:'八號東北'},
 '8NW':{s:'<polygon points="32,32 12,58 52,58"/>',n:'8',l:'NW 西北',a:'八號西北'},
 '8SE':{s:'<polygon points="12,22 52,22 32,42"/><polygon points="12,44 52,44 32,64"/>',n:'8',l:'SE 東南',a:'八號東南'},
 '8SW':{s:'<polygon points="12,32 52,32 32,58"/>',n:'8',l:'SW 西南',a:'八號西南'},
 '9':{s:'<polygon points="12,24 52,24 32,44"/><polygon points="32,44 12,64 52,64"/>',n:'9',a:'九號烈風或暴風風力增強信號'},
 '10':{s:'<rect x="9" y="39" width="46" height="12" rx="1"/><rect x="26" y="22" width="12" height="46" rx="1"/>',n:'10',a:'十號颶風信號'}
};
const RAIN_LAB={ra:['黃色暴雨','Amber'],rr:['紅色暴雨','Red'],rb:['黑色暴雨','Black']};
const FF='font-family="Noto Sans TC,sans-serif"';
// 颱風信號圖：跟天文台符號（T、倒轉T、三角形、沙漏、十字）
function sigSVG(key,size,bare){
  const d=SIGS[key];
  const num=bare?'':'<text x="'+(d.n.length>1?56:60)+'" y="56" font-size="'+(d.n.length>1?26:32)+'" font-weight="900" fill="#333" font-family="Space Mono,monospace">'+d.n+'</text>';
  const lab=(!bare&&d.l)?'<text x="48" y="86" text-anchor="middle" font-size="11" font-weight="700" fill="#333" '+FF+'>'+d.l+'</text>':'';
  const sh=bare?'<g transform="translate(16,0)">'+d.s+'</g>':d.s;
  return '<svg data-jyr-no class="sig" width="'+size+'" height="'+size+'" viewBox="0 0 96 96" role="img" aria-label="'+d.a+'"><rect x="4" y="4" width="88" height="88" rx="16" fill="#fff" stroke="#d9b4ba" stroke-width="2.5"/><g fill="url(#sg)" stroke="#2b2b2b" stroke-width="1" stroke-linejoin="round">'+sh+'</g>'+num+lab+'</svg>';
}
// 暴雨信號圖：雲＋雨點，黑／紅／黃（Amber）
function rainSVG(color,zh,en,size,bare){
  let drops='';
  for(let i=0;i<5;i++){const x=30+i*10;drops+='<line x1="'+x+'" y1="54" x2="'+(x-5)+'" y2="65"/>';}
  const lab=bare?'':'<text x="48" y="77" text-anchor="middle" font-size="12" font-weight="900" fill="'+color+'" '+FF+'>'+zh+'</text><text x="48" y="85" text-anchor="middle" font-size="7" font-weight="700" fill="'+color+'" '+FF+'>'+en+' Rainstorm</text>';
  return '<svg data-jyr-no class="sig" width="'+size+'" height="'+size+'" viewBox="0 0 96 96" role="img" aria-label="'+zh+'"><rect x="4" y="4" width="88" height="88" rx="18" fill="'+color+'"/><rect x="9" y="9" width="78" height="78" rx="14" fill="#fff"/>'
   +'<g'+(bare?' transform="translate(0,8)"':'')+'><g fill="'+color+'"><circle cx="34" cy="38" r="11"/><circle cx="48" cy="30" r="15"/><circle cx="63" cy="39" r="10"/><rect x="24" y="38" width="49" height="12" rx="6"/></g>'
   +'<g stroke="'+color+'" stroke-width="3.5" stroke-linecap="round">'+drops+'</g></g>'+lab+'</svg>';
}
function badge(w,size,bare){
  size=size||56;
  if(w.g==='tc'){
    if(w.id==='t8') return '<div class="mini4" style="width:'+size+'px">'+['8NE','8NW','8SE','8SW'].map(k=>sigSVG(k,size/2)).join('')+'</div>';
    return sigSVG(w.bd,size,bare);
  }
  if(w.g==='rain'){const L=RAIN_LAB[w.id];return rainSVG(w.color,L[0],L[1],size,bare);}
  return '<div class="bdg'+(w.round?' round':'')+(w.emo?' emo':'')+'" style="background:'+w.color+'">'+w.bd+'</div>';
}

/* ═══════════════ 四季 ═══════════════ */
function buildSeason(){
  const MIN=10,MAX=34;
  const cards=SEASONS.map(s=>{
    const l=(s.lo-MIN)/(MAX-MIN)*100,r=(s.hi-MIN)/(MAX-MIN)*100;
    return '<div class="s-card" style="border-top-color:'+s.color+'">'
     +'<div class="s-head"><div class="s-ico">'+s.ico+'</div><div style="flex:1"><div class="zrow"><div class="s-name">'+rb(s.zh,s.jp)+'</div>'+spk(s.zh)+'</div>'+th(s.th)+'</div></div>'
     +'<div class="s-meta">'+rb(s.mz,s.mj)+th(s.mt)+'</div>'
     +'<div class="temp-bar"><div class="temp-fill" style="left:'+l+'%;width:'+(r-l)+'%;background:'+s.color+'"></div></div>'
     +'<div class="temp-lbl"><span>10°C</span><span style="color:'+s.color+';font-weight:700">大約 '+s.lo+'–'+s.hi+' °C</span><span>34°C</span></div>'
     +'<div class="s-sent"><div class="zrow">'+rb(s.sz,s.sj)+spk(s.sz)+'</div>'+th(s.st)+'</div>'
     +'<div class="s-lbl">常見天氣詞</div><div class="chips">'+s.words.map(w=>'<div class="chip">'+rb(w[0],w[1])+th(w[2])+'</div>').join('')+'</div>'
     +'<div class="s-lbl">著咩衫／帶咩</div><div class="chips">'+s.wear.map(w=>'<div class="chip">'+rb(w[0],w[1])+th(w[2])+'</div>').join('')+'</div>'
     +'</div>';
  }).join('');
  $('p-season').innerHTML=
    '<div class="hero"><div class="hero-t">香港有四季？</div><div class="hero-th">ฮ่องกงมี 4 ฤดูไหม?</div>'
    +'<p style="font-size:13px;margin-top:8px">香港喺亞熱帶，夏天又長又熱，冬天好短。春天同秋天都唔長，仲有，冇雪㗎！</p>'
    +th('ฮ่องกงอยู่เขตกึ่งร้อน ฤดูร้อนยาวและร้อน ฤดูหนาวสั้น ฤดูใบไม้ผลิและใบไม้ร่วงไม่นาน และไม่มีหิมะ')+'</div>'
    +'<div class="note">溫度係大約數字，每年唔同。ตัวเลขอุณหภูมิเป็นค่าประมาณ แต่ละปีไม่เหมือนกัน</div>'
    +'<div class="season-grid">'+cards+'</div>';
}

/* ═══════════════ 警告信號 ═══════════════ */
function warnCard(w){
  const chips=w.chips?'<div class="chips">'+w.chips.map(c=>'<div class="chip dir">'+sigSVG(c[3],52)+'<div>'+rb(c[0],c[1])+th(c[2])+'</div></div>').join('')+'</div>':'';
  const extra=w.extra?'<div class="w-extra">'+rb(w.extra,w.ej)+th(w.et)+chips+'</div>':'';
  return '<div class="w-card" style="border-left-color:'+w.color+'">'
   +'<div class="w-head">'+badge(w,64)+'<div style="flex:1"><div class="w-name">'+rb(w.nz,w.nj)+'</div>'+th(w.nt)+'</div>'+spk(w.nz)+'</div>'
   +(w.shz?'<div class="w-row w-shape"><div class="w-lbl">符號形狀</div>'+rb(w.shz,w.shj)+th(w.sht)+'</div>':'')+'<div class="w-row"><div class="w-lbl">意思</div><div class="zrow">'+rb(w.dz,w.dj)+spk(w.dz)+'</div>'+th(w.dt)+'</div>'
   +'<div class="w-act"><div class="w-lbl">點做</div>'+rb(w.az,w.aj)+th(w.at)+'</div>'
   +extra+'</div>';
}
function buildWarn(){
  const tcGrid='<div class="sig-grid c4">'+['1','3','8NE','8NW','8SE','8SW','9','10'].map(k=>sigSVG(k,96)).join('')+'</div>';
  const tipBox='<div class="box tip"><div class="w-lbl">💡 小提示</div><div class="tip-t">'+rb(TIP.t[0],TIP.t[1])+th(TIP.t[2])+'</div>'
    +TIP.items.map((it,i)=>'<div class="tip-i"><span class="tip-n">'+(i+1)+'</span><div>'+rb(it[0],it[1])+th(it[2])+'</div></div>').join('')+'</div>';
  const rainGrid='<div class="sig-grid c3">'+['rb','rr','ra'].map(id=>badge(WARNS.find(x=>x.id===id),96)).join('')+'</div>';
  let html='<div class="hero"><div class="hero-t">天氣警告信號</div><div class="hero-th">สัญญาณเตือนภัยสภาพอากาศ</div>'
    +'<p style="font-size:13px;margin-top:8px">天文台會發出唔同嘅警告。最緊要記住：<b>八號風球</b>同<b>黑色暴雨</b>。</p>'
    +th('หอดูดาวฮ่องกงจะประกาศสัญญาณเตือนต่างๆ ที่ต้องจำให้ได้คือ สัญญาณพายุหมายเลข 8 และฝนดำ')+'</div>';
  html+='<div class="note">風球同暴雨嘅符號跟天文台嘅圖案畫。สัญลักษณ์พายุและฝนตกหนักวาดตามรูปของหอดูดาวฮ่องกง</div>';
  html+='<div class="box"><div class="w-lbl">掛／除風球</div>'
    +'<div class="chips" style="margin-top:2px"><div class="chip">'+rb('掛風球','gwaa3 fung1 kau4')+th('ประกาศ/ชูสัญญาณ')+'</div><div class="chip">'+rb('除風球','ceoi4 fung1 kau4')+th('ยกเลิกสัญญาณ')+'</div></div>'
    +'<div style="margin-top:8px">'+rb('天文台掛咗八號風球。','tin1 man4 toi4 gwaa3 zo2 baat3 hou6 fung1 kau4.')+th('หอดูดาวประกาศสัญญาณพายุหมายเลข 8 แล้ว')+'</div></div>';
  Object.keys(WGROUPS).forEach(g=>{
    const G=WGROUPS[g];
    html+='<div class="sec">'+rb(G.zh,G.jp)+'</div>'+th(G.th);
    if(g==='tc')html+=tcGrid+tipBox;
    if(g==='rain')html+=rainGrid;
    html+='<div style="margin-top:8px">'+WARNS.filter(w=>w.g===g).map(warnCard).join('')+'</div>';
  });
  $('p-warn').innerHTML=html;
}

/* ═══════════════ 詞彙 ═══════════════ */
let vocabCat=Object.keys(VOCAB)[0];
function buildVocab(){
  const cats=Object.keys(VOCAB);
  const bar='<div class="filter-bar">'+cats.map(c=>'<button class="f-btn'+(c===vocabCat?' act':'')+'" onclick="WX.cat(\''+c+'\')">'+c+'</button>').join('')+'</div>';
  const cards='<div class="v-grid">'+VOCAB[vocabCat].map(v=>{
    return '<div class="v-card" data-t="'+esc(v[0])+'" onclick="WX.say(this.dataset.t)">'+rb(v[0],v[1])+th(v[2])+'</div>';
  }).join('')+'</div>';
  const phr='<div class="sec">💬 常用句子</div>'+PHRASES.map(p=>'<div class="phrase"><div class="zrow">'+rb(p[0],p[1])+spk(p[0])+'</div>'+th(p[2])+'</div>').join('');
  $('p-vocab').innerHTML='<div class="sec">📚 天氣詞彙</div><div class="note">撳一下詞語就可以聽發音。แตะที่คำเพื่อฟังเสียง</div>'+bar+cards+phr;
}
function setVocabCat(c){vocabCat=c;buildVocab();}

/* ═══════════════ 對話 ═══════════════ */
function buildTalk(){
  $('p-talk').innerHTML='<div class="sec">💬 天氣對話</div>'+DIALOGS.map(d=>
    '<div style="margin-bottom:22px"><div class="dl-title">'+d.ico+' '+d.t+'</div>'+th(d.thai)+'<div style="margin-top:10px">'
    +d.lines.map(l=>'<div class="dl-line"><div class="dl-sp">'+l[0]+'</div><div class="dl-b"><div class="zrow">'+rb(l[1],l[2])+spk(l[1])+'</div>'+th(l[3])+'</div></div>').join('')
    +'</div></div>').join('');
}

/* ═══════════════ 練習 ═══════════════ */
const SEASON_QS=[
  ...SEASONS.map(s=>({zh:s.sz,jp:s.sj,th:s.st,a:s.id})),
  ...SEASONS.map(s=>({zh:s.mz,jp:s.mj,th:s.mt,a:s.id})),
  {zh:'回南天',jp:'wui4 naam4 tin1',th:'ช่วงอากาศชื้นจัด',a:'spring'},
  {zh:'大褸',jp:'daai6 lau1',th:'เสื้อโค้ทหนา',a:'winter'},
  {zh:'短袖',jp:'dyun2 zau6',th:'เสื้อแขนสั้น',a:'summer'},
  {zh:'冷鋒',jp:'laang5 fung1',th:'แนวปะทะอากาศเย็น',a:'winter'},
];
const MODES=[
  {id:'A',ico:'🔍',t:'睇描述，揀信號',s:'ดูคำอธิบาย เลือกสัญญาณ'},
  {id:'B',ico:'🧭',t:'見到信號，點做？',s:'เห็นสัญญาณแล้วควรทำอย่างไร'},
  {id:'C',ico:'🍃',t:'呢個係邊個季節？',s:'นี่คือฤดูอะไร'},
  {id:'D',ico:'🔺',t:'睇符號，認信號',s:'ดูสัญลักษณ์ แล้วบอกว่าเป็นสัญญาณอะไร'},
];
const QZ={mode:null,qs:[],i:0,score:0,picked:null,done:false};
function mkQuestions(mode){
  const out=[];
  if(mode==='A'){
    shuffle(WARNS).slice(0,10).forEach(w=>{
      const wr=shuffle(WARNS.filter(x=>x.id!==w.id)).slice(0,3);
      out.push({hint:'呢個警告係咩意思？ — ข้อความนี้คือสัญญาณอะไร',prompt:'<div class="zrow" style="justify-content:center;gap:12px">'+rb(w.dz,w.dj)+spk(w.dz)+'</div>'+th(w.dt),
        opts:shuffle([w,...wr]).map(x=>({html:rb(x.nz,x.nj),ok:x.id===w.id})),
        explain:'答案：'+w.nz});
    });
  }else if(mode==='B'){
    shuffle(WARNS).slice(0,10).forEach(w=>{
      const seen={};seen[w.az]=1;const wr=[];
      shuffle(WARNS).forEach(x=>{if(wr.length<3&&!seen[x.az]){seen[x.az]=1;wr.push(x);}});
      out.push({hint:'見到呢個信號，應該點做？ — เห็นสัญญาณนี้ ควรทำอย่างไร',prompt:'<div style="display:flex;align-items:center;justify-content:center;gap:12px">'+badge(w)+rb(w.nz,w.nj)+'</div>'+th(w.nt),
        opts:shuffle([w,...wr]).map(x=>({html:'<div>'+rb(x.az,x.aj)+th(x.at)+'</div>',ok:x.az===w.az})),
        explain:'答案：'+w.az});
    });
  }else if(mode==='D'){
    const pool=WARNS.filter(w=>w.g!=='other');
    shuffle(pool).slice(0,10).forEach(w=>{
      const wr=shuffle(pool.filter(x=>x.id!==w.id)).slice(0,3);
      const ico=w.id==='t8'?sigSVG(shuffle(['8NE','8NW','8SE','8SW'])[0],96,true):badge(w,96,true);
      out.push({hint:'呢個符號係咩信號？ — สัญลักษณ์นี้คือสัญญาณอะไร',prompt:'<div style="display:flex;justify-content:center">'+ico+'</div>',
        opts:shuffle([w,...wr]).map(x=>({html:'<div>'+rb(x.nz,x.nj)+th(x.nt)+'</div>',ok:x.id===w.id})),
        explain:'答案：'+w.nz});
    });
  }else{
    shuffle(SEASON_QS).slice(0,10).forEach(q=>{
      out.push({hint:'呢個係邊個季節？ — นี่คือฤดูอะไร',prompt:'<div class="zrow" style="justify-content:center;gap:12px">'+rb(q.zh,q.jp)+spk(q.zh)+'</div>'+th(q.th),
        opts:shuffle(SEASONS).map(s=>({html:'<span style="font-size:22px">'+s.ico+'</span>'+rb(s.zh,s.jp),ok:s.id===q.a})),
        explain:'答案：'+SEASONS.find(s=>s.id===q.a).zh});
    });
  }
  return out;
}
function buildQuiz(){
  if(!QZ.mode){
    $('p-quiz').innerHTML='<div class="sec">🎮 天氣練習</div><div class="note">揀一個練習，每次 10 題。เลือกแบบฝึกหัด ครั้งละ 10 ข้อ</div>'
      +MODES.map(m=>'<div class="mode-card" onclick="WX.start(\''+m.id+'\')"><div class="m-ico">'+m.ico+'</div><div><div class="m-t">'+m.t+'</div><div class="m-s">'+m.s+'</div></div></div>').join('');
    return;
  }
  if(QZ.done){
    $('p-quiz').innerHTML='<div class="result"><div style="font-size:48px">'+(QZ.score>=8?'🎉':QZ.score>=5?'👍':'💪')+'</div><div style="font-family:var(--serif);font-size:20px;font-weight:700;margin:6px 0">完成！</div><div class="big">'+QZ.score+' / '+QZ.qs.length+'</div><div class="th" style="font-size:13px">เก่งมาก! 叻仔！</div>'
      +'<button class="btn" onclick="WX.start(\''+QZ.mode+'\')">再玩一次</button> <button class="btn g" onclick="WX.menu()">揀其他練習</button></div>';
    return;
  }
  const q=QZ.qs[QZ.i],picked=QZ.picked;
  const opts=q.opts.map((o,k)=>{
    let cls='opt';
    if(picked!==null){cls+=o.ok?' ok':(k===picked?' bad':' dim');}
    return '<button class="'+cls+'" '+(picked===null?'onclick="WX.pick('+k+')"':'')+'>'+o.html+'</button>';
  }).join('');
  let fb='';
  if(picked!==null){
    const good=q.opts[picked].ok;
    fb='<div class="fb '+(good?'ok':'err')+'">'+(good?'✓ 啱！ ถูกต้อง!':'✗ '+q.explain)+'</div><div style="text-align:center"><button class="btn" onclick="WX.next()">'+(QZ.i+1>=QZ.qs.length?'睇成績':'下一題 ›')+'</button></div>';
  }
  $('p-quiz').innerHTML='<div class="q-hdr"><span class="pill">★ '+QZ.score*10+'</span><button class="f-btn" onclick="WX.menu()">‹ 返回</button><span class="pill g">'+(QZ.i+1)+' / '+QZ.qs.length+'</span></div>'
    +'<div class="q-card"><div class="q-hint">'+q.hint+'</div>'+q.prompt+'</div><div class="opts">'+opts+'</div>'+fb;
}
function startQuiz(m){QZ.mode=m;QZ.qs=mkQuestions(m);QZ.i=0;QZ.score=0;QZ.picked=null;QZ.done=false;buildQuiz();}
function quizMenu(){QZ.mode=null;try{speechSynthesis.cancel();}catch(e){}buildQuiz();}
function pickOpt(k){if(QZ.picked!==null)return;QZ.picked=k;if(QZ.qs[QZ.i].opts[k].ok){QZ.score++;try{window.APP_AWARD(10);}catch(e){}}buildQuiz();}
function nextQ(){if(QZ.i+1>=QZ.qs.length){QZ.done=true;try{window.APP_LOGHIST(QZ.score*10,'wx');}catch(e){}}else{QZ.i++;QZ.picked=null;}buildQuiz();}

/* ═══════════════ 分頁（分頁列喺 shadow 外面，同其他模組一樣）═══════════════ */
const barEl=document.getElementById('wx-bar'),TABS=[['season','🍃 四季'],['warn','🚩 警告信號'],['vocab','📚 詞彙'],['talk','💬 對話'],['quiz','🎮 練習']];
let cur='season';
function setSub(p){cur=p;
  barEl.innerHTML=TABS.map(t=>'<button class="tm-tab'+(t[0]===cur?' act':'')+'" type="button" data-ct="'+t[0]+'">'+t[1]+'</button>').join('');
  autoRuby(barEl);
  TABS.forEach(t=>{$('p-'+t[0]).classList.toggle('act',t[0]===cur);});
  try{window.scrollTo(0,0);}catch(e){}}
barEl.addEventListener('click',e=>{const b=e.target.closest('[data-ct]');if(b)setSub(b.dataset.ct);});
window.WX={say:t=>Speech.say(t),cat:setVocabCat,start:startQuiz,menu:quizMenu,pick:pickOpt,next:nextQ};
window.wxShow=function(){setSub(cur);};
window.wxLeave=function(){try{speechSynthesis.cancel();}catch(e){}};
/* ── 起動 ── */
SUP.forEach(a=>L(a[0],a[1]));
[SEASONS.map(s=>[[s.zh,s.jp],[s.mz,s.mj],[s.sz,s.sj]].concat(s.words.map(w=>[w[0],w[1]])).concat(s.wear.map(w=>[w[0],w[1]]))),
 WARNS.map(w=>[[w.nz,w.nj],[w.dz,w.dj],[w.az,w.aj],w.shz?[w.shz,w.shj]:null,w.extra?[w.extra,w.ej]:null].concat((w.chips||[]).map(c=>[c[0],c[1]]))),
 Object.keys(WGROUPS).map(g=>[[WGROUPS[g].zh,WGROUPS[g].jp]]),
 Object.keys(VOCAB).map(c=>VOCAB[c].map(v=>[v[0],v[1]])),PHRASES.map(p=>[p[0],p[1]]),DIALOGS.map(d=>d.lines.map(l=>[l[1],l[2]])),
 [TIP.t,[TIP.t[0],TIP.t[1]]].slice(1).concat(TIP.items.map(i=>[i[0],i[1]]))
].forEach(function f(x){if(Array.isArray(x)&&typeof x[0]==='string'&&typeof x[1]==='string')L(x[0],x[1]);else if(Array.isArray(x))x.forEach(f);});
buildSeason();buildWarn();buildVocab();buildTalk();buildQuiz();setSub('season');
var busy=false;function pass(){if(busy)return;busy=true;try{tagThai(SR);autoRuby(SR);}finally{busy=false;}}
var mo=new MutationObserver(function(){mo.disconnect();pass();mo.observe(SR,{childList:true,subtree:true});});
pass();mo.observe(SR,{childList:true,subtree:true});
window.__wxMiss=MISS;
})();
