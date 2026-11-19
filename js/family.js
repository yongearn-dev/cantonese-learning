/* ═══ 家庭：家譜／結婚生仔／遊戲／句子（新分頁）═══
   Shadow DOM 隔離；模組內 `document` 指向 shadow root；inline onclick 經 window.FTM。 */
(function(){
'use strict';
var host=window.document.getElementById('fm-host'); if(!host||!host.attachShadow)return;
var SR=host.attachShadow({mode:'open'});
var CSS_TEXT="*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%;\n--bg:#F1F0E4;--surface:#fff;--surface2:#E7E6D6;--border:#D9D6C4;\n--text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;\n--accent:#0E6B57;--accent-bg:#E3EFE9;\n--yellow:#A9701C;--yellow-bg:#F8EDDA;\n--green:#1D8A5C;--green-bg:#E6F4EC;\n--red:#C1402A;--red-bg:#FAEAE4;\n--purple:#8A4B3B;\n--radius:12px;--shadow:0 1px 4px rgba(0,0,0,.08);\n--serif:'Noto Serif TC',serif;\n}\n.page{display:none}.page.act{display:block}\n.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:20px 0 8px}\n.sec:first-child{margin-top:0}\n.sub{font-size:12px;color:var(--text-sub);font-family:'Noto Sans Thai';margin-bottom:12px}\n.filter-bar{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:14px}\n.filter-bar::-webkit-scrollbar{display:none}\n.f-btn{flex-shrink:0;padding:5px 13px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;cursor:pointer;font-family:inherit;font-weight:500}\n.f-btn.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n/* tree */\n.gen{margin-bottom:14px}\n.gen-label{font-size:11px;font-weight:700;color:var(--text-muted);margin-bottom:6px;display:flex;align-items:center;gap:8px}\n.gen-label::after{content:'';flex:1;height:1px;background:var(--border)}\n.chips{display:flex;flex-wrap:wrap;gap:7px}\n.chip{background:var(--surface);border:2px solid var(--border);border-radius:10px;padding:6px 10px;text-align:center;cursor:pointer;min-width:62px;font-family:inherit;box-shadow:var(--shadow);transition:transform .12s}\n.chip:active{transform:scale(.96)}\n.chip .z{font-family:var(--serif);font-size:18px;font-weight:900;color:var(--text);display:block}\n.chip .j{font-family:var(--f-jy);font-size:9px;color:var(--text-sub);display:block}\n.chip.p{border-color:#1D8A5C;background:#F2FAF5}\n.chip.m{border-color:#C98A2A;background:#FDF6E8}\n.chip.me{border-color:var(--red);background:var(--red-bg)}\n.chip.self{border-color:var(--accent)}\n.chip.marry{border-style:dashed}\n.chip.sel{outline:3px solid #F4D58D}\n.legend{display:flex;flex-wrap:wrap;gap:10px;font-size:11px;color:var(--text-sub);margin-bottom:14px}\n.legend i{display:inline-block;width:12px;height:12px;border-radius:3px;border:2px solid;vertical-align:-2px;margin-right:4px}\n.tip{background:var(--surface);border:1.5px solid var(--border);border-left:4px solid var(--yellow);border-radius:var(--radius);padding:12px 14px;margin-bottom:10px;box-shadow:var(--shadow);font-size:13px}\n.tip b{font-family:var(--serif)}\n.tip .th{font-family:'Noto Sans Thai';color:var(--text-sub);font-size:12px;margin-top:4px}\n.tools{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:10px}\n.tg{padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}\n.tg.act{background:var(--yellow-bg);border-color:#E6D3A8;color:var(--yellow)}\n.tree-wrap{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);box-shadow:var(--shadow);padding:10px 4px;overflow-x:auto;margin-bottom:10px}\nsvg.tree{display:block;margin:0 auto}\n.tree .ln{stroke:#8E9A86;stroke-width:2;fill:none;stroke-linejoin:round;stroke-linecap:round}\n.tree .ln.cp{stroke:#C1402A;stroke-width:2.5}\n.tree .nd{cursor:pointer}\n.tree .nd .c{fill:#fff;stroke-width:3}\n.tree .nd.p .c{stroke:#1D8A5C;fill:#F2FAF5}\n.tree .nd.m .c{stroke:#C98A2A;fill:#FDF6E8}\n.tree .nd.self .c{stroke:#0E6B57;fill:#E3EFE9}\n.tree .nd.me .c{stroke:#C1402A;fill:#FAEAE4;stroke-width:4}\n.tree .nd.marry .c{stroke-dasharray:5 3}\n.tree .nd.sel .c{stroke:#E0A82E;stroke-width:5}\n.tree .nd text{text-anchor:middle;user-select:none;-webkit-user-select:none}\n.tree .em{font-size:22px}\n.tree .zh{font-family:'Noto Serif TC',serif;font-weight:900;font-size:15px;fill:#22261F}\n.tree .jy{font-family:var(--f-jy);font-size:8px;fill:#666B5C}\n.tree-cap{margin-bottom:8px}\n.sh-col{margin:6px 0 10px}\n.sh-col-t{font-size:12px;font-weight:700;color:var(--yellow);margin-bottom:4px}\n.colrow{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;width:100%;text-align:left;background:var(--yellow-bg);border:1px solid #E6D3A8;border-radius:10px;padding:6px 10px;margin-bottom:5px;font-family:inherit;cursor:pointer;color:var(--text)}\n.colrow b{font-family:var(--serif);font-size:17px}\n.colrow span{font-family:var(--f-jy);font-size:10px;color:var(--text-sub)}\n.colrow small{font-size:11px;color:var(--text-sub);flex-basis:100%}\n.nb{white-space:nowrap}\n.fb rt[data-j],.mcard rt[data-j]{color:inherit;opacity:.85}\n.chip .cth{font-family:'Noto Sans Thai',sans-serif;font-size:10px;color:var(--text-sub);display:block;margin-top:1px}\n.tree .nth{font-family:'Noto Sans Thai',sans-serif;font-size:9px;fill:#8A4B3B}\n.story-th{font-family:'Noto Sans Thai',sans-serif;font-size:12px;color:var(--text-sub);margin-top:2px}\n.ct td small{display:block;font-family:'Noto Sans Thai',sans-serif;font-size:11px;color:var(--text-sub);font-weight:400}\n.ct .grp td .th-t{font-weight:400}\n.kid{line-height:1.2}\n.q-th{font-family:'Noto Sans Thai',sans-serif;font-size:13px;color:var(--text-sub);margin-top:6px}\n.pat{position:relative;padding-right:34px}\n.pplay{position:absolute;right:12px;top:12px;color:var(--accent);font-size:14px}\n.pat .pz{line-height:1.9}\n.sh-zh{line-height:1.7}\n.colrow b{line-height:1.7}\n/* sheet */\n.sheet{position:fixed;left:0;right:0;bottom:0;z-index:200;max-width:480px;margin:0 auto;background:var(--surface);border-top:3px solid var(--accent);border-radius:18px 18px 0 0;box-shadow:0 -6px 24px rgba(0,0,0,.18);padding:14px 18px 20px;max-height:75vh;overflow-y:auto;transform:translateY(110%);transition:transform .25s}\n.sheet.open{transform:translateY(0)}\n.sh-close{position:absolute;right:14px;top:10px;background:none;border:none;font-size:20px;color:var(--text-muted);cursor:pointer}\n.sh-zh{font-family:var(--serif);font-size:34px;font-weight:900}\n.sh-j{font-family:var(--f-jy);color:var(--accent);font-size:14px}\n.sh-th{font-family:'Noto Sans Thai';font-size:15px;color:var(--text-sub);margin:2px 0 8px}\n.sh-chain{background:var(--accent-bg);border-radius:10px;padding:8px 12px;font-size:14px;font-weight:700;margin-bottom:6px}\n.sh-chain small{display:block;font-family:var(--f-jy);font-weight:400;font-size:10px;color:var(--text-sub)}\n.sh-note{font-size:12px;color:var(--yellow);background:var(--yellow-bg);border-radius:8px;padding:6px 10px;margin-bottom:8px}\n.btn{border:1.5px solid var(--border);background:var(--surface);border-radius:20px;padding:8px 18px;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;color:var(--text-sub)}\n.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}\n.btn:disabled{opacity:.4;cursor:not-allowed}\n/* story */\n.card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px;box-shadow:var(--shadow)}\n.couple{display:flex;align-items:center;justify-content:center;gap:12px;font-size:44px;text-align:center}\n.couple small{display:block;font-size:12px;font-family:'Noto Sans TC';color:var(--text-sub)}\n.couple .heart{font-size:28px}\n.story-line{font-family:var(--serif);font-size:18px;font-weight:700;margin-top:10px}\n.story-j{font-family:var(--f-jy);font-size:11px;color:var(--text-sub)}\n.kids{display:flex;flex-wrap:wrap;gap:8px;margin-top:10px}\n.kid{background:var(--accent-bg);border-radius:10px;padding:6px 12px;text-align:center}\n.kid span{display:block;font-size:11px;font-family:var(--f-jy);color:var(--text-sub)}\n.row-btns{display:flex;gap:8px;flex-wrap:wrap;margin-top:12px}\n.ct{width:100%;border-collapse:collapse;font-size:13px}\n.ct td{padding:7px 4px;border-bottom:1px solid var(--border)}\n.ct td:last-child{text-align:right;font-weight:700;color:var(--accent);cursor:pointer}\n.ct .grp td{background:var(--surface2);font-size:11px;font-weight:700;color:var(--text-sub);text-align:left;cursor:default}\n/* games */\n.g-hdr{display:flex;justify-content:space-between;margin-bottom:10px}\n.score-pill{background:var(--yellow-bg);border:1.5px solid #E6D3A8;color:var(--yellow);padding:4px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:14px}\n.round-pill{background:var(--surface2);border:1.5px solid var(--border);padding:4px 14px;border-radius:20px;font-family:'Space Mono';font-size:13px;color:var(--text-sub)}\n.level-bar{display:flex;gap:8px;margin-bottom:12px}\n.lv-btn{flex:1;padding:8px 6px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}\n.lv-btn.act{background:var(--accent);border-color:var(--accent);color:#fff}\n.lv-btn span{display:block;font-size:10px;font-weight:400;opacity:.85}\n.q-card{background:var(--surface);border:2px solid var(--border);border-radius:14px;padding:16px;text-align:center;box-shadow:var(--shadow);margin-bottom:12px}\n.q-big{font-family:var(--serif);font-size:22px;font-weight:900}\n.q-j{font-family:var(--f-jy);font-size:11px;color:var(--accent);margin-top:4px}\n.q-hint{font-size:12px;color:var(--text-muted);margin-top:6px}\n.opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.opt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 8px;cursor:pointer;font-family:inherit;color:var(--text);display:flex;flex-direction:column;align-items:center;gap:2px;box-shadow:var(--shadow);min-height:64px;justify-content:center}\n.opt .oj{font-family:var(--f-jy);font-size:10px;color:var(--accent)}\n.opt .oc{font-size:18px;font-weight:700;font-family:var(--serif)}\n.opt .ot{font-size:12px;font-family:'Noto Sans Thai';line-height:1.3}\n.opt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.opt.bad{border-color:var(--red)!important;background:var(--red-bg)!important}\n.opt.dim{opacity:.35;pointer-events:none}\n.fb{margin-top:12px;padding:10px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid}\n.fb.ok{background:var(--green-bg);color:var(--green);border-color:#bde3cd}\n.fb.err{background:var(--red-bg);color:var(--red);border-color:#f0c4b8}\n.result{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:30px 20px;text-align:center;box-shadow:var(--shadow)}\n.result .big{font-size:50px}\n.result .sc{font-family:'Space Mono';font-size:32px;font-weight:700;color:var(--accent)}\n.mgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}\n.mcard{min-height:74px;border-radius:10px;border:2px solid var(--border);background:var(--accent);color:transparent;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;text-align:center;padding:4px;font-size:12px;line-height:1.3}\n.mcard.up{background:var(--surface);color:var(--text);border-color:var(--accent)}\n.mcard.done{background:var(--green-bg);color:var(--green);border-color:var(--green);cursor:default}\n.mcard.zh{font-family:var(--serif);font-size:18px;font-weight:900}\n.mcard.th{font-family:'Noto Sans Thai';font-size:12px}\n/* sentence */\n.seg{display:inline-flex;background:var(--surface2);border-radius:20px;padding:3px;margin-bottom:14px;gap:2px}\n.seg-btn{border:none;background:transparent;padding:6px 14px;border-radius:17px;font-size:13px;font-weight:600;color:var(--text-sub);cursor:pointer;font-family:inherit}\n.seg-btn.act{background:var(--surface);color:var(--accent);box-shadow:var(--shadow)}\n.pat{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:12px 14px;margin-bottom:10px;box-shadow:var(--shadow);cursor:pointer}\n.pat .pz{font-family:var(--serif);font-size:18px;font-weight:700}\n.pat .pj{font-family:var(--f-jy);font-size:10px;color:var(--text-sub)}\n.pat .pt{font-family:'Noto Sans Thai';font-size:12px;color:var(--text-sub)}\n.sg-slots{display:flex;flex-wrap:wrap;gap:8px;padding:12px;background:var(--surface2);border-radius:var(--radius);min-height:84px;margin:12px 0}\n.sg-slot{min-width:70px;min-height:62px;border:2px dashed var(--border);border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.5);color:var(--text-muted);font-family:'Space Mono';font-size:13px}\n.sg-slot.filled{border:none;background:transparent}\n.sg-pool{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:6px 0}\n.sg-card{background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:6px 12px;min-width:62px;text-align:center;cursor:pointer;font-family:inherit;box-shadow:var(--shadow)}\n.sg-card:disabled{cursor:default}\n.sg-card.ok{background:var(--green-bg);border-color:var(--green)}\n.sg-card.bad{background:var(--red-bg);border-color:var(--red)}\n.sg-char{font-family:var(--serif);font-size:20px;font-weight:700;color:var(--text);line-height:1.8}\n.sg-jyut{font-family:var(--f-jy);font-size:9px;color:var(--text-sub)}\n.sg-actions{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:12px}\n.sg-msg{text-align:center;font-size:13px;margin-top:10px;color:var(--text-sub)}\n.sg-msg.good{color:var(--green);font-weight:700}\n@media (min-width:720px){\n.sheet{max-width:760px}\n.chip{min-width:74px}\n}\n.retry-btn rt[data-j]{color:#fff}\n.f-btn.act rt[data-j],.lv-btn.act rt[data-j],.btn.primary rt[data-j]{color:rgba(255,255,255,.92)}\n:host(.hide-jy) text.jy{display:none}\n:host(.hide-th) text.nth{display:none}\n.tree .jy{font-weight:700}\n.content-pad{padding-bottom:120px}";
SR.innerHTML='<style>'+CSS_TEXT+'</style>'+"<!-- 家譜 -->\n  <div class=\"page act\" id=\"pg-learn\">\n    <div class=\"sec\">🌳 家庭樹</div>\n    <div class=\"sub th-t\">แตะที่ตัวละครเพื่อดูคำอ่าน ความหมาย และวิธีนับญาติ</div>\n    <div class=\"filter-bar\" id=\"views\"></div>\n    <div class=\"tools\" id=\"tools\"></div>\n    <div class=\"legend\">\n      <span><i style=\"border-color:#1D8A5C;background:#F2FAF5\"></i>爸爸邊</span>\n      <span><i style=\"border-color:#C98A2A;background:#FDF6E8\"></i>媽媽邊</span>\n      <span><i style=\"border-color:#0E6B57;background:#E3EFE9\"></i>自己嘅屋企</span>\n      <span><i style=\"border-color:#0E6B57;border-style:dashed;background:#fff\"></i>結婚之後嘅親戚（姻親）</span>\n    </div>\n    <div class=\"tree-wrap\" id=\"treeWrap\"></div>\n    <div class=\"tree-cap\" id=\"treeCap\"></div>\n    <div class=\"sec\">💡 記住呢幾點</div>\n    <div id=\"tips\"></div>\n    <div class=\"sec\">📋 稱呼一覽</div>\n    <div class=\"filter-bar\" id=\"filters\"></div>\n    <div id=\"list\"></div>\n  </div>\n\n  <!-- 結婚生仔 -->\n  <div class=\"page\" id=\"pg-story\">\n    <div class=\"sec\">💍 結婚、生仔，稱呼點變？</div>\n    <div class=\"sub th-t\">ดูว่าเมื่อแต่งงานและมีลูก คนในครอบครัวเรียกกันว่าอย่างไร</div>\n    <div id=\"storyBox\"></div>\n  </div>\n\n  <!-- 遊戲 -->\n  <div class=\"page\" id=\"pg-game\">\n    <div class=\"filter-bar\" id=\"gModes\"></div>\n    <div id=\"gLv\"></div>\n    <div id=\"gArea\"></div>\n  </div>\n\n  <!-- 句子 -->\n  <div class=\"page\" id=\"pg-sent\">\n    <div class=\"seg\" id=\"sMode\"></div>\n    <div id=\"sArea\"></div>\n  </div>\n</div>\n<div class=\"sheet\" id=\"sheet\"></div>";
const document={getElementById:function(i){return SR.getElementById(i);},querySelector:function(s){return SR.querySelector(s);},querySelectorAll:function(s){return SR.querySelectorAll(s);},createElement:function(t){return window.document.createElement(t);}};
const $=id=>document.getElementById(id);
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const S={total:0,tab:'learn',filter:'all',sel:null,view:'main',col:false,g:'m',poly:false,zoom:'auto',eff:'fit'};
const award=window.APP_AWARD,logHist=window.APP_LOGHIST;
function addScore(n){if(n)award(n);}

/* ── 語音 ── */
const Speech={
  ok:'speechSynthesis' in window,voices:[],
  init(){if(!this.ok)return;const l=()=>{this.voices=speechSynthesis.getVoices();};l();speechSynthesis.addEventListener('voiceschanged',l);},
  speak(t,cb){
    if(!this.ok)return;
    const go=()=>{
      const u=new SpeechSynthesisUtterance(t);
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.startsWith('zh'));
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;
      if(cb){u.onend=cb;u.onerror=cb;}
      speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();   // Chrome：cancel 後即刻 speak 會被吞
  }
};
Speech.init();

/* ── 資料 ── */
const STEP={'爸爸':'baa4 baa1','媽媽':'maa4 maa1','哥哥':'go4 go1','家姐':'gaa1 ze1','弟弟':'dai6 dai2','妹妹':'mui6 mui2','老公':'lou5 gung1','老婆':'lou5 po4','仔':'zai2','女':'neoi2'};
// id, 中文, 粵拼, 泰文, 輩分, 邊(p爸爸邊/m媽媽邊/self), 姻親(1/0), 難度, 路徑
const RAW=[
 ['daama','大嫲','daai6 maa4','ย่าคนแรก (ภรรยาคนแรกของปู่)',2,'p',0,3,null,'爺爺嘅第一個太太','je4 je2 ge3 dai6 jat1 go3 taai3 taai2'],
 ['saimaa','細嫲','sai3 maa4','ย่าคนที่สอง (ภรรยาคนที่สองของปู่)',2,'p',0,3,null,'爺爺嘅第二個太太','je4 je2 ge3 dai6 ji6 go3 taai3 taai2'],
 ['yeye','爺爺','je4 je2','ปู่ (พ่อของพ่อ)',2,'p',0,1,['爸爸','爸爸']],
 ['maa2','嫲嫲','maa4 maa2','ย่า (แม่ของพ่อ)',2,'p',0,1,['爸爸','媽媽']],
 ['gung','公公','gung1 gung1','ตา (พ่อของแม่)',2,'m',0,1,['媽媽','爸爸']],
 ['po','婆婆','po4 po2','ยาย (แม่ของแม่)',2,'m',0,1,['媽媽','媽媽']],
 ['baba','爸爸','baa4 baa1','พ่อ',1,'self',0,0,['爸爸']],
 ['mama','媽媽','maa4 maa1','แม่',1,'self',0,0,['媽媽']],
 ['bakfu','伯父','baak3 fu2','ลุง (พี่ชายพ่อ)',1,'p',0,1,['爸爸','哥哥']],
 ['bakniang','伯娘','baak3 noeng4','ป้า (ภรรยาของลุง)',1,'p',1,2,['爸爸','哥哥','老婆']],
 ['suk','叔叔','suk1 suk1','อา (น้องชายพ่อ)',1,'p',0,1,['爸爸','弟弟']],
 ['sam','嬸嬸','sam2 sam2','อา (ภรรยาของอาชาย)',1,'p',1,2,['爸爸','弟弟','老婆']],
 ['gumaa','姑媽','gu1 maa1','ป้า (พี่สาวพ่อ)',1,'p',0,1,['爸爸','家姐']],
 ['guze','姑姐','gu1 ze2','อา (น้องสาวพ่อ)',1,'p',0,1,['爸爸','妹妹']],
 ['gujeung','姑丈','gu1 zoeng2','อาเขย/ลุงเขย (สามีของพี่น้องสาวพ่อ)',1,'p',1,2,['爸爸','家姐','老公']],
 ['gaufu','舅父','gau5 fu2','น้าชาย/ลุง (พี่น้องชายของแม่)',1,'m',0,1,['媽媽','哥哥']],
 ['gaumou','舅母','gau5 mou5','น้าสะใภ้ (ภรรยาของพี่น้องชายแม่)',1,'m',1,2,['媽媽','哥哥','老婆']],
 ['jimaa','姨媽','ji4 maa1','ป้า (พี่สาวแม่)',1,'m',0,1,['媽媽','家姐']],
 ['ayi','阿姨','aa3 ji4','น้า (น้องสาวแม่)',1,'m',0,1,['媽媽','妹妹']],
 ['jijeung','姨丈','ji4 zoeng2','น้าเขย/ลุงเขย (สามีของพี่น้องสาวแม่)',1,'m',1,2,['媽媽','家姐','老公']],
 ['gaagung','家公','gaa1 gung1','พ่อสามี',1,'self',1,2,['老公','爸爸']],
 ['gaapo','家婆','gaa1 po4','แม่สามี',1,'self',1,2,['老公','媽媽']],
 ['ngoifu','外父','ngoi6 fu2','พ่อภรรยา',1,'self',1,2,['老婆','爸爸']],
 ['ngoimou','外母','ngoi6 mou5','แม่ภรรยา',1,'self',1,2,['老婆','媽媽']],
 ['gogo','哥哥','go4 go1','พี่ชาย',0,'self',0,0,['哥哥']],
 ['gaaze','家姐','gaa1 ze1','พี่สาว',0,'self',0,0,['家姐']],
 ['daidai','弟弟','dai6 dai2','น้องชาย',0,'self',0,0,['弟弟']],
 ['muimui','妹妹','mui6 mui2','น้องสาว',0,'self',0,0,['妹妹']],
 ['loukung','老公','lou5 gung1','สามี',0,'self',1,0,['老公']],
 ['loupo','老婆','lou5 po4','ภรรยา',0,'self',1,0,['老婆']],
 ['zefu','姐夫','ze2 fu1','พี่เขย (สามีของพี่สาว)',0,'self',1,2,['家姐','老公']],
 ['sousou','嫂嫂','sou2 sou2','พี่สะใภ้ (ภรรยาของพี่ชาย)',0,'self',1,2,['哥哥','老婆']],
 ['muifu','妹夫','mui6 fu1','น้องเขย (สามีของน้องสาว)',0,'self',1,2,['妹妹','老公']],
 ['daifu','弟婦','dai6 fu5','น้องสะใภ้ (ภรรยาของน้องชาย)',0,'self',1,2,['弟弟','老婆']],
 ['tong','堂兄弟姊妹','tong4 hing1 dai6 zi2 mui6','ญาติพี่น้อง (ลูกพี่น้องฝั่งพ่อ แซ่เดียวกัน)',0,'p',0,3,null,'爸爸嘅兄弟嘅仔／女','baa4 baa1 ge3 hing1 dai6 ge3 zai2 / neoi2'],
 ['biu','表兄弟姊妹','biu2 hing1 dai6 zi2 mui6','ญาติพี่น้อง (ฝั่งแม่ / ลูกพี่น้องสาวของพ่อ)',0,'m',0,3,null,'媽媽嘅兄弟姊妹嘅仔／女','maa4 maa1 ge3 hing1 dai6 zi2 mui6 ge3 zai2 / neoi2'],
 ['zai','仔','zai2','ลูกชาย',-1,'self',0,0,['仔']],
 ['neoi','女','neoi2','ลูกสาว',-1,'self',0,0,['女']],
 ['sanpou','新抱','san1 pou5','ลูกสะใภ้',-1,'self',1,3,['仔','老婆']],
 ['neoisai','女婿','neoi5 sai3','ลูกเขย',-1,'self',1,3,['女','老公']],
 ['zatzai','姪仔','zat6 zai2','หลานชาย (ลูกของพี่น้องชาย)',-1,'self',0,3,['哥哥','仔']],
 ['zatneoi','姪女','zat6 neoi2','หลานสาว (ลูกของพี่น้องชาย)',-1,'self',0,3,['哥哥','女']],
 ['ngoisaang','外甥','ngoi6 saang1','หลานชาย (ลูกของพี่น้องสาว)',-1,'self',0,3,['家姐','仔']],
 ['ngoisaangneoi','外甥女','ngoi6 saang1 neoi2','หลานสาว (ลูกของพี่น้องสาว)',-1,'self',0,3,['家姐','女']],
 ['syunzai','孫仔','syun1 zai2','หลานชาย (ลูกชายของลูกชาย)',-2,'self',0,3,['仔','仔']],
 ['syunneoi','孫女','syun1 neoi2','หลานสาว (ลูกสาวของลูกชาย)',-2,'self',0,3,['仔','女']],
 ['ngoisyun','外孫','ngoi6 syun1','หลานชาย (ลูกชายของลูกสาว)',-2,'self',0,3,['女','仔']],
 ['ngoisyunneoi','外孫女','ngoi6 syun1 neoi2','หลานสาว (ลูกสาวของลูกสาว)',-2,'self',0,3,['女','女']],
];
const NOTES={
 daama:'爺爺有兩個太太：第一個叫大嫲，第二個叫細嫲。叫法每個家庭可能唔同。',saimaa:'爺爺有兩個太太：第一個叫大嫲，第二個叫細嫲。叫法每個家庭可能唔同。',
 yeye:'有啲家庭叫「阿爺」(aa3 je4)。',maa2:'有啲家庭叫「阿嫲」(aa3 maa4)。',
 gung:'有啲家庭叫「外公」(ngoi6 gung1)，意思一樣。',po:'有啲家庭叫「外婆」(ngoi6 po4)，意思一樣。',
 bakfu:'口語都叫「伯伯」(baak3 baak3)。',gaufu:'媽媽嘅哥哥同弟弟，全部都叫舅父。',
 gujeung:'姑媽同姑姐嘅老公，全部都叫姑丈。',jijeung:'姨媽同阿姨嘅老公，全部都叫姨丈。',
 zatzai:'弟弟嘅仔都叫姪仔。',zatneoi:'弟弟嘅女都叫姪女。',ngoisaang:'妹妹嘅仔都叫外甥。',ngoisaangneoi:'妹妹嘅女都叫外甥女。',
 tong:'堂哥 tong4 go1 · 堂姐 tong4 ze2 · 堂弟 tong4 dai6 · 堂妹 tong4 mui6',
 biu:'表哥 biu2 go1 · 表姐 biu2 ze2 · 表弟 biu2 dai6 · 表妹 biu2 mui6',
 gaagung:'老婆叫老公嘅爸爸做家公。',ngoifu:'老公叫老婆嘅爸爸做外父。',
 loukung:'日常都可以叫「先生」(sin1 saang1)；呢度講最基本嘅叫法。'
};
const TERMS=RAW.map(r=>({id:r[0],zh:r[1],j:r[2],th:r[3],gen:r[4],side:r[5],marry:!!r[6],lv:r[7],path:r[8],relz:r[9],relj:r[10],note:NOTES[r[0]]||''}));
const T={};TERMS.forEach(t=>T[t.id]=t);
const byZh=z=>TERMS.find(t=>t.zh===z);
function relOf(t){
  if(t.relz)return{z:t.relz,j:t.relj};
  return{z:t.path.join('嘅'),j:t.path.map(s=>STEP[s]).join(' ge3 ')};
}
function chainOf(t){
  if(t.relz)return null;
  return'我 ➜ '+t.path.join(' ➜ ');
}
const GEN_LABEL={2:'祖輩 · รุ่นปู่ย่าตายาย',1:'父母輩 · รุ่นพ่อแม่',0:'同輩 · รุ่นเดียวกัน',[-1]:'下一輩 · รุ่นลูก/หลาน',[-2]:'孫輩 · รุ่นหลาน'};
const FILTERS=[['all','全部'],['p','🟢 爸爸邊'],['m','🟡 媽媽邊'],['marry','💍 姻親'],['self','🏠 我自己屋企']];

/* ── 頁籤 ── */
function showTab(t){
  S.tab=t;
  setBar(t);
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('act',p.id==='pg-'+t));
  closeSheet();
  if(t==='story')renderStory();
  if(t==='game')renderGame();
  if(t==='sent')renderSent();
}

/* ── 家譜 ── */
const P_SET=new Set(['yeye','maa2','daama','saimaa','baba','bakfu','bakniang','suk','sam','gumaa','guze','gujeung','tong']);
const M_SET=new Set(['gung','po','mama','gaufu','gaumou','jimaa','ayi','jijeung','biu']);
const EMO={yeye:'👴',maa2:'👵',daama:'👵',saimaa:'👵',gung:'👴',po:'👵',baba:'👨',mama:'👩',bakfu:'🧔',bakniang:'👩',suk:'👨',sam:'👩',gumaa:'👩',guze:'👩',gujeung:'👨',gaufu:'🧔',gaumou:'👩',jimaa:'👩',ayi:'👩',jijeung:'👨',gaagung:'👴',gaapo:'👵',ngoifu:'👴',ngoimou:'👵',gogo:'👨',gaaze:'👩',daidai:'👦',muimui:'👧',loukung:'👨',loupo:'👩',zefu:'👨',sousou:'👩',muifu:'👨',daifu:'👩',tong:'🧒',biu:'🧒',zai:'👦',neoi:'👧',sanpou:'👩',neoisai:'👨',zatzai:'👦',zatneoi:'👧',ngoisaang:'👦',ngoisaangneoi:'👧',syunzai:'👦',syunneoi:'👧',ngoisyun:'👦',ngoisyunneoi:'👧',me:'🙂'};
const JT={tong:['tong4'],biu:['biu2']};
/* 口語叫法：[字, 粵拼, 備註] */
const COL={
 baba:[['老豆','lou5 dau6','最口語；同朋友講起：「我老豆」'],['阿爸','aa3 baa1','當面叫'],['爹哋','de1 di4','比較「洋」，細路叫得多']],
 mama:[['阿媽','aa3 maa1','當面叫；講起都得：「我阿媽」'],['媽咪','maa1 mi4','比較「洋」，細路叫得多'],['老母','lou5 mou5','好口語，同朋友講起先用']],
 yeye:[['阿爺','aa3 je4','當面叫']],
 maa2:[['阿嫲','aa3 maa4','當面叫']],
 gung:[['外公','ngoi6 gung1','香港最常用'],['阿公','aa3 gung1','當面叫']],
 po:[['外婆','ngoi6 po4','香港最常用'],['阿婆','aa3 po4','當面叫']],
 gogo:[['大佬','daai6 lou2','口語：哥哥'],['阿哥','aa3 go1','當面叫']],
 daidai:[['細佬','sai3 lou2','口語：弟弟'],['阿弟','aa3 dai6','當面叫']],
 gaaze:[['阿姐','aa3 ze1','當面叫'],['大家姐','daai6 gaa1 ze1','最大嗰個家姐']],
 muimui:[['細妹','sai3 mui2','口語：妹妹'],['阿妹','aa3 mui2','當面叫']],
 bakfu:[['伯伯','baak3 baak3','親切叫法'],['阿伯','aa3 baak3','路上叫年長男人都得']],
 suk:[['阿叔','aa3 suk1','路上叫中年男人都得']],
 sam:[['阿嬸','aa3 sam2','叫中年女人']],
 gaufu:[['阿舅','aa3 gau5','當面叫']],
 sousou:[['阿嫂','aa3 sou2','當面叫']],
 zefu:[['家姐夫','gaa1 ze1 fu1','口語']],
 loukung:[['先生','sin1 saang1','介紹：「呢位係我先生」']],
 loupo:[['太太','taai3 taai2','介紹：「呢位係我太太」']],
 zai:[['大仔','daai6 zai2','最大嗰個仔'],['孻仔','laai1 zai2','最細嗰個仔'],['細路','sai3 lou6','小朋友（唔分男女）']],
 neoi:[['大女','daai6 neoi2','最大嗰個女'],['孻女','laai1 neoi2','最細嗰個女']],
 ngoifu:[['阿爸','aa3 baa1','當面叫外父，同叫自己爸爸一樣']],
 ngoimou:[['阿媽','aa3 maa1','當面叫外母']],
 gaagung:[['阿爸','aa3 baa1','當面叫家公']],
 gaapo:[['阿媽','aa3 maa1','當面叫家婆']],
 tong:[['叔伯兄弟','suk1 baak3 hing1 dai6','爸爸兄弟嘅仔（口語）']]
};
const COLT={};
['baba','mama','yeye','maa2','gung','po','gogo','daidai','gaaze','muimui','bakfu','suk','sam','gaufu','sousou','zefu','loukung','loupo','ngoifu','ngoimou','gaagung','gaapo'].forEach(id=>{COLT[id]=[COL[id][0][0],COL[id][0][1]];});
const COLCNT={};Object.values(COL).forEach(a=>a.forEach(c=>{COLCNT[c[0]]=(COLCNT[c[0]]||0)+1;}));

function lab(id){
  if(id==='me')return{zh:'我',j:'ngo5'};
  const t=T[id];
  if(S.col&&COLT[id])return{zh:COLT[id][0],j:COLT[id][1]};
  return{zh:t.zh,j:t.j};
}
function jyLines(id,j){
  if(!S.col&&JT[id])return JT[id];
  const out=[];let cur='';
  j.split(' ').forEach(w=>{if(cur&&(cur+' '+w).length>12){out.push(cur);cur=w;}else cur=cur?cur+' '+w:w;});
  if(cur)out.push(cur);return out;
}
function zhLines(z){const h=Math.ceil(z.length/2);return z.length>=4?[z.slice(0,h),z.slice(h)]:[z];}
function nodeSvg(n){
  const id=n.id,l=lab(id),t=T[id];
  const cls='nd '+(id==='me'?'me':P_SET.has(id)?'p':M_SET.has(id)?'m':'self')+(t&&t.marry?' marry':'');
  const zl=zhLines(l.zh),jl=jyLines(id,l.j).slice(0,2);
  let s='';
  const off=(2-jl.length)*9;
  jl.forEach((j,i)=>{s+='<text class="jy" data-nojy="1" y="'+(R+11+off+i*9)+'">'+j+'</text>';});
  zl.forEach((z,i)=>{s+='<text class="zh" y="'+(R+36+i*15)+'">'+z+'</text>';});
  s+='<text class="nth" y="'+(R+36+(NZ-1)*15+13)+'">'+(id==='me'?'ฉัน':thShort(id))+'</text>';
  return'<g class="'+cls+'" data-id="'+id+'" transform="translate('+n.x+' '+n.y+')"><circle class="c" r="'+R+'"/><text class="em" y="8">'+(EMO[id]||'🙂')+'</text>'+s+'</g>';
}
/* 版面引擎 */
const R=21,SL=63,TOP=30;
let ROWH=128,LB=73,NZ=1;
const rowY=r=>TOP+r*ROWH;
function newV(){return{n:[],l:[],c:[],maxRow:0};}
function addNode(V,id,x,row){V.n.push({id,x,y:rowY(row)});if(row>V.maxRow)V.maxRow=row;}
function coupleLn(V,x1,x2,row){const y=rowY(row);V.c.push('M'+(x1+R)+' '+y+'H'+(x2-R));}
function dropLn(V,px,row,single,xs,kr){
  const y=rowY(row),y0=single?y+LB+1:y,bar=y+LB+8,ky=rowY(kr)-R,all=[px].concat(xs);
  let d='M'+px+' '+y0+'V'+bar+'M'+Math.min(...all)+' '+bar+'H'+Math.max(...all);
  xs.forEach(x=>{d+='M'+x+' '+bar+'V'+ky;});
  V.l.push(d);
}
function uw(u){u.k=u.k||[];u.ks=u.k.reduce((s,c)=>s+uw(c),0);const own=(u.c?3.3:u.b?2:1)*SL;u.w=Math.max(own,u.ks);return u.w;}
function place(V,u,x0,row){
  const cx=x0+u.w/2;let single=true;
  if(u.c){const g=SL*1.1;addNode(V,u.b,cx-g,row);addNode(V,u.a,cx,row);addNode(V,u.c,cx+g,row);coupleLn(V,cx-g,cx,row);coupleLn(V,cx,cx+g,row);u.ax=cx;}
  else if(u.b){addNode(V,u.a,cx-SL/2,row);addNode(V,u.b,cx+SL/2,row);coupleLn(V,cx-SL/2,cx+SL/2,row);u.ax=cx-SL/2;single=false;}
  else{addNode(V,u.a,cx,row);u.ax=cx;}
  if(u.k.length){
    let kx=x0+(u.w-u.ks)/2;const xs=[];
    u.k.forEach(c=>{place(V,c,kx,row+1);xs.push(c.ax);kx+=c.w;});
    dropLn(V,cx,row,single,xs,row+1);
  }
}
const sp=()=>S.g==='m'?'loupo':'loukung';
const inl=()=>S.g==='m'?['ngoifu','ngoimou']:['gaagung','gaapo'];
const KIDS5=()=>[{a:'gogo'},{a:'gaaze'},{a:'me'},{a:'daidai'},{a:'muimui'}];
const NK=(a,b)=>[{a:a},{a:b}];
function buildView(){
  const V=newV(),v=S.view;
  NZ=(v==='p'||v==='m')?2:1;LB=R+36+(NZ-1)*15+16;ROWH=LB+55;
  if(v==='main'){
    addNode(V,'yeye',141,0);addNode(V,'maa2',199,0);coupleLn(V,141,199,0);
    addNode(V,'gung',281,0);addNode(V,'po',339,0);coupleLn(V,281,339,0);
    addNode(V,'baba',170,1);addNode(V,'mama',310,1);coupleLn(V,170,310,1);
    dropLn(V,170,0,false,[170],1);dropLn(V,310,0,false,[310],1);
    const ids=['gogo','gaaze','me','daidai','muimui'],xs=[70,140,215,345,415];
    ids.forEach((id,i)=>addNode(V,id,xs[i],2));
    addNode(V,sp(),275,2);coupleLn(V,215,275,2);
    dropLn(V,240,1,false,xs,2);
    addNode(V,'zai',175,3);addNode(V,'neoi',315,3);dropLn(V,245,2,false,[175,315],3);
    addNode(V,'syunzai',140,4);addNode(V,'syunneoi',210,4);dropLn(V,175,3,true,[140,210],4);
    addNode(V,'ngoisyun',280,4);addNode(V,'ngoisyunneoi',350,4);dropLn(V,315,3,true,[280,350],4);
    return V;
  }
  let root;
  if(v==='p'){
    const k=[{a:'bakfu',b:'bakniang',k:[{a:'tong'}]},{a:'baba',b:'mama',k:KIDS5()},{a:'suk',b:'sam',k:[{a:'tong'}]},{a:'gumaa',b:'gujeung',k:[{a:'biu'}]},{a:'guze',k:[{a:'biu'}]}];
    root=S.poly?{a:'yeye',b:'daama',c:'saimaa',k}:{a:'yeye',b:'maa2',k};
  }else if(v==='m'){
    root={a:'gung',b:'po',k:[{a:'gaufu',b:'gaumou',k:[{a:'biu'}]},{a:'mama',b:'baba',k:KIDS5()},{a:'jimaa',b:'jijeung',k:[{a:'biu'}]},{a:'ayi',k:[{a:'biu'}]}]};
  }else if(v==='sib'){
    root={a:'baba',b:'mama',k:[
      {a:'gogo',b:'sousou',k:NK('zatzai','zatneoi')},
      {a:'gaaze',b:'zefu',k:NK('ngoisaang','ngoisaangneoi')},
      {a:'me',b:sp()},
      {a:'daidai',b:'daifu',k:NK('zatzai','zatneoi')},
      {a:'muimui',b:'muifu',k:NK('ngoisaang','ngoisaangneoi')}]};
  }else{
    const i=inl();
    root={a:i[0],b:i[1],k:[{a:sp(),b:'me',k:[
      {a:'zai',b:'sanpou',k:NK('syunzai','syunneoi')},
      {a:'neoi',b:'neoisai',k:NK('ngoisyun','ngoisyunneoi')}]}]};
  }
  uw(root);place(V,root,0,0);
  return V;
}
const VIEWS=[['main','🌳 直系'],['p','🟢 爸爸邊'],['m','🟡 媽媽邊'],['sib','👫 同輩'],['inlaw','💍 姻親']];
const CAP={
 main:['直系親屬：祖輩 ➜ 爸媽 ➜ 我同兄弟姊妹 ➜ 仔女 ➜ 孫。爸爸嘅爸媽叫<b>爺爺／嫲嫲</b>，媽媽嘅爸媽叫<b>公公／婆婆</b>。','ปู่ย่า (ฝั่งพ่อ) = 爺爺/嫲嫲 · ตายาย (ฝั่งแม่) = 公公/婆婆 · หลาน: 孫 (ลูกของลูกชาย) 外孫 (ลูกของลูกสาว)'],
 p:['爸爸嘅哥哥＝<b>伯父</b>（太太＝伯娘）、弟弟＝<b>叔叔</b>（太太＝嬸嬸）；家姐＝<b>姑媽</b>（老公＝姑丈）、妹妹＝<b>姑姐</b>。伯父、叔叔嘅仔女叫<b>堂</b>，姑媽、姑姐嘅仔女叫<b>表</b>。','พี่ชายพ่อ=伯父 น้องชายพ่อ=叔叔 พี่สาวพ่อ=姑媽 น้องสาวพ่อ=姑姐 · ลูกของพี่น้องชายพ่อ=堂 ลูกของพี่น้องสาวพ่อ=表'],
 m:['媽媽嘅兄弟（哥哥、弟弟都一樣）＝<b>舅父</b>（太太＝舅母）；家姐＝<b>姨媽</b>（老公＝姨丈）、妹妹＝<b>阿姨</b>。佢哋嘅仔女全部叫<b>表</b>。','พี่น้องชายแม่=舅父 พี่สาวแม่=姨媽 น้องสาวแม่=阿姨 · ลูกของพี่น้องแม่ทั้งหมด=表'],
 sib:['哥哥、弟弟嘅仔女叫<b>姪仔／姪女</b>；家姐、妹妹嘅仔女叫<b>外甥／外甥女</b>。哥哥嘅太太＝<b>嫂嫂</b>，弟弟嘅太太＝<b>弟婦</b>，家姐嘅老公＝<b>姐夫</b>，妹妹嘅老公＝<b>妹夫</b>。','ลูกของพี่น้องชาย=姪 · ลูกของพี่น้องสาว=外甥 · ภรรยาพี่ชาย=嫂嫂 ภรรยาน้องชาย=弟婦 สามีพี่สาว=姐夫 สามีน้องสาว=妹夫'],
 inlaw:['老公叫老婆嘅爸媽做<b>外父／外母</b>；老婆叫老公嘅爸媽做<b>家公／家婆</b>。仔嘅老婆叫<b>新抱</b>，女嘅老公叫<b>女婿</b>。','สามีเรียกพ่อแม่ภรรยา=外父/外母 · ภรรยาเรียกพ่อแม่สามี=家公/家婆 · ลูกสะใภ้=新抱 ลูกเขย=女婿']
};
function renderTree(){
  const V=buildView(),wrap=$('treeWrap');
  const xs=V.n.map(n=>n.x),minX=Math.min(...xs)-36,maxX=Math.max(...xs)+36,w=maxX-minX,h=rowY(V.maxRow)+LB+8;
  const cw=wrap.clientWidth||440;
  const mode=S.zoom==='auto'?(w<=cw*1.4?'fit':'full'):S.zoom;
  S.eff=mode;
  const st=mode==='fit'?'width:100%;max-width:'+Math.round(w*1.3)+'px;height:auto':'width:'+w+'px;max-width:none;height:auto';
  wrap.innerHTML='<svg class="tree" data-jyr-no="1" xmlns="http://www.w3.org/2000/svg" viewBox="'+minX+' 0 '+w+' '+h+'" style="'+st+'">'
    +V.l.map(d=>'<path class="ln" d="'+d+'"/>').join('')+V.c.map(d=>'<path class="ln cp" d="'+d+'"/>').join('')+V.n.map(nodeSvg).join('')+'</svg>';
  if(mode==='full'){const me=V.n.find(n=>n.id==='me');wrap.scrollLeft=Math.max(0,(me?me.x-minX:w/2)-wrap.clientWidth/2);}else wrap.scrollLeft=0;
  const cp=CAP[S.view];
  $('treeCap').innerHTML='<div class="tip"><div>'+cp[0]+'</div><div class="th">'+cp[1]+'</div></div>'+(S.view==='p'&&S.poly?'<div class="tip"><div>爺爺有兩個太太：第一個叫<b>大嫲</b>，第二個叫<b>細嫲</b>。爸爸嘅媽媽係大嫲定細嫲，睇你屋企。</div><div class="th">ถ้าปู่มีภรรยาสองคน: คนแรก 大嫲 คนที่สอง 細嫲 (แม่ของพ่ออาจเป็นคนใดคนหนึ่ง ขึ้นกับครอบครัว)</div></div>':'');
  renderTools();markSel();
}
function renderTools(){
  const v=S.view;
  $('views').innerHTML=VIEWS.map(x=>'<button class="f-btn'+(v===x[0]?' act':'')+'" data-v="'+x[0]+'">'+x[1]+'</button>').join('');
  let h='<button class="tg'+(S.col?' act':'')+'" data-t="col">🗣 口語叫法</button>';
  if(v==='main'||v==='sib'||v==='inlaw')h+='<button class="tg" data-t="g">我係：'+(S.g==='m'?'👨 男':'👩 女')+'</button>';
  if(v==='p')h+='<button class="tg'+(S.poly?' act':'')+'" data-t="poly">👵👵 兩個嫲嫲</button>';
  h+='<button class="tg" data-t="zoom">'+(S.eff==='fit'?'🔍 放大':'↔ 縮到合螢幕')+'</button>';
  $('tools').innerHTML=h;
}
function markSel(){document.querySelectorAll('#pg-learn [data-id]').forEach(el=>el.classList.toggle('sel',el.dataset.id===S.sel));}
$('views').onclick=e=>{const b=e.target.closest('[data-v]');if(!b)return;S.view=b.dataset.v;renderTree();};
$('tools').onclick=e=>{
  const b=e.target.closest('[data-t]');if(!b)return;const t=b.dataset.t;
  if(t==='col')S.col=!S.col;else if(t==='g')S.g=S.g==='m'?'f':'m';else if(t==='poly')S.poly=!S.poly;else if(t==='zoom')S.zoom=S.eff==='fit'?'full':'fit';
  renderTree();renderList();
};
$('treeWrap').onclick=e=>{const c=e.target.closest('[data-id]');if(c)openSheet(c.dataset.id);};
$('list').onclick=e=>{const c=e.target.closest('[data-id]');if(c)openSheet(c.dataset.id);};
$('filters').onclick=e=>{const b=e.target.closest('[data-f]');if(!b)return;S.filter=b.dataset.f;renderList();};

/* 稱呼一覽 */
function chipHtml(t){
  const l=lab(t.id);
  const cls=['chip',t.side==='p'?'p':t.side==='m'?'m':'self',t.marry?'marry':'',S.sel===t.id?'sel':''].join(' ');
  return'<button class="'+cls+'" data-id="'+t.id+'"><span class="z">'+rb(l.zh,l.j)+'</span><span class="cth">'+thShort(t.id)+'</span></button>';
}
function renderList(){
  const f=S.filter;
  $('filters').innerHTML=FILTERS.map(x=>'<button class="f-btn'+(x[0]===f?' act':'')+'" data-f="'+x[0]+'">'+x[1]+'</button>').join('');
  const show=t=>f==='all'||(f==='p'&&t.side==='p')||(f==='m'&&t.side==='m')||(f==='marry'&&t.marry)||(f==='self'&&t.side==='self'&&!t.marry);
  let html='';
  [2,1,0,-1,-2].forEach(g=>{
    let chips=TERMS.filter(t=>t.gen===g&&show(t)).map(chipHtml).join('');
    if(g===0&&(f==='all'||f==='self'))chips='<button class="chip me" data-id="me"><span class="z">'+rb('我','ngo5')+'</span><span class="cth">ฉัน</span></button>'+chips;
    if(!chips)return;
    html+='<div class="gen"><div class="gen-label">'+GEN_LABEL[g]+'</div><div class="chips">'+chips+'</div></div>';
  });
  $('list').innerHTML=html;
}
/* 彈出卡 */
function openSheet(id){
  S.sel=id;
  const sh=$('sheet');
  if(id==='me'){
    sh.innerHTML='<button class="sh-close" onclick="FTM.closeSheet()">✕</button><div class="sh-zh">'+rb('我','ngo5')+'</div><div class="sh-th">ฉัน · ทุกอย่างนับจากตัวเรา</div><div class="sh-chain">所有稱呼都由「我」開始數<small>ทุกคำเรียกนับจากตัวเรา</small></div><button class="btn primary" data-speak="我">▶ 聽發音</button>';
  }else{
    const t=T[id],r=relOf(t),ch=chainOf(t);
    const cl=COL[id]?'<div class="sh-col"><div class="sh-col-t">🗣 口語叫法 · คำพูดปากภาษา</div>'+COL[id].map(c=>'<button class="colrow" data-speak="'+c[0]+'"><b>'+rb(c[0],c[1])+'</b><small>'+c[2]+' ▶</small></button>').join('')+'</div>':'';
    sh.innerHTML='<button class="sh-close" onclick="FTM.closeSheet()">✕</button><div class="sh-zh">'+rb(t.zh,t.j)+'</div><div class="sh-th">'+t.th+'</div>'
      +(ch&&t.path.length>1?'<div class="sh-chain">我'+r.z+' = '+t.zh+'<small>'+ch+'</small></div>':(t.relz?'<div class="sh-chain">我'+r.z+' = '+t.zh+'</div>':''))
      +(t.note?'<div class="sh-note">💡 '+t.note+'</div>':'')
      +cl
      +'<button class="btn primary" data-speak="'+t.zh+'">▶ 聽發音</button>';
  }
  sh.classList.add('open');markSel();
}
function closeSheet(){S.sel=null;$('sheet').classList.remove('open');markSel();}
$('sheet').onclick=e=>{const b=e.target.closest('[data-speak]');if(b){if(!Speech.ok){alert('你嘅瀏覽器唔支援語音');return;}Speech.speak(b.dataset.speak);}};
/* ── 粵拼（ruby：粵拼喺中文字上面，逐字置中）── */
const CJK=/[㐀-鿿]/;
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
/* 已有粵拼資料：逐字對齊（<ruby class="jr">，由全站引擎排版）；音節數對唔上就交俾全站字典補 */
function rb(zh,j){
  if(!j)return zh;
  const syl=j.replace(/[.,?!/]/g,' ').trim().split(/\s+/).filter(Boolean);
  const chars=[...zh];
  const nC=chars.filter(c=>CJK.test(c)).length;
  if(syl.length&&syl.length===nC){let k=0;return chars.map(c=>CJK.test(c)?'<ruby class="jr">'+c+'<rt data-j="'+syl[k++]+'"></rt></ruby>':c).join('');}
  console.warn('[family] 粵拼字數唔夾',zh,j);
  return zh;
}
function thShort(id){return T[id]?T[id].th.split(' (')[0]:'';}

function renderTips(){
  const tips=[
   ['爸爸邊 vs 媽媽邊','爸爸嘅爸爸媽媽＝<b>爺爺／嫲嫲</b>；媽媽嘅爸爸媽媽＝<b>公公／婆婆</b>。','พ่อของพ่อ/แม่ของพ่อ = 爺爺/嫲嫲 · พ่อของแม่/แม่ของแม่ = 公公/婆婆'],
   ['大嫲、細嫲','如果爺爺有兩個太太：第一個叫<b>大嫲</b> (daai6 maa4)，第二個叫<b>細嫲</b> (sai3 maa4)。大嫲、細嫲嘅叫法每個家庭可能唔同，以屋企習慣為準。','ถ้าปู่มีภรรยาสองคน: คนแรก 大嫲 คนที่สอง 細嫲 (วิธีเรียกอาจต่างกันตามครอบครัว)'],
   ['爸爸邊嘅叔伯姑','爸爸嘅哥哥＝<b>伯父</b>，弟弟＝<b>叔叔</b>；爸爸嘅家姐＝<b>姑媽</b>，妹妹＝<b>姑姐</b>。','พี่ชายพ่อ=ลุง น้องชายพ่อ=อา · พี่สาวพ่อ=姑媽 น้องสาวพ่อ=姑姐'],
   ['媽媽邊嘅舅姨','媽媽嘅兄弟＝<b>舅父</b>（哥哥弟弟都一樣）；媽媽嘅家姐＝<b>姨媽</b>，妹妹＝<b>阿姨</b>。','พี่น้องชายแม่ = 舅父 · พี่สาวแม่ = 姨媽 · น้องสาวแม่ = 阿姨'],
   ['堂 vs 表','爸爸兄弟嘅仔女（同姓）叫<b>堂</b>；其他（媽媽邊、爸爸姊妹嘅仔女）叫<b>表</b>。','ลูกของพี่น้องชายพ่อ (แซ่เดียวกัน) = 堂 · นอกนั้น = 表'],
   ['姪 vs 外甥','哥哥弟弟嘅仔女叫<b>姪仔／姪女</b>；家姐妹妹嘅仔女叫<b>外甥／外甥女</b>。','ลูกพี่น้องชาย = 姪 · ลูกพี่น้องสาว = 外甥'],
   ['孫 vs 外孫','仔嘅仔女叫<b>孫仔／孫女</b>；女嘅仔女叫<b>外孫／外孫女</b>。','ลูกของลูกชาย = 孫 · ลูกของลูกสาว = 外孫'],
   ['🗣 口語叫法（當面叫）','口語會加「阿」：<b>阿爺、阿嫲、阿叔、阿嬸、阿伯</b>；爸爸叫<b>老豆</b>、哥哥叫<b>大佬</b>、弟弟叫<b>細佬</b>、妹妹叫<b>細妹</b>。撳「🗣 口語叫法」，成棵樹會變口語。','พูดจริงมักเติม 阿 นำหน้า · พ่อ=老豆 พี่ชาย=大佬 น้องชาย=細佬 น้องสาว=細妹 · กดปุ่ม 🗣 เพื่อสลับป้ายชื่อบนแผนภูมิ'],
   ['排行：大、細、孻','有幾個兄弟姊妹，會加排行：<b>大佬／細佬</b>、<b>大家姐／細妹</b>、<b>大仔／細仔／孻仔</b>（孻 = 最細嗰個）。','大 = คนโต · 細 = คนเล็ก · 孻 = คนสุดท้อง'],
   ['當面叫 vs 同人講起','當面叫：「阿爸！」「阿叔！」；同朋友講起：「我老豆」「我阿叔」。','เรียกต่อหน้า vs พูดถึงลับหลัง'],
  ];
  $('tips').innerHTML=tips.map(t=>'<div class="tip"><b>'+t[0]+'</b><div>'+t[1]+'</div><div class="th">'+t[2]+'</div></div>').join('');
}

/* ── 結婚生仔 ── */
const ST={married:false,boys:0,girls:0};
const NUM={1:['一','jat1'],2:['兩','loeng5'],3:['三','saam1']};
const ORD={1:['大','daai6'],2:['二','ji6'],3:['三','saam1']};
function renderStory(){
  const NTH={1:'หนึ่ง',2:'สอง',3:'สาม'};
  let h='<div class="card"><div class="couple"><div>👨<small>'+rb('阿明','aa3 ming4')+'</small></div>'+(ST.married?'<div class="heart">💍</div>':'<div class="heart" style="opacity:.3">＋</div>')+'<div>👩<small>'+rb('阿芳','aa3 fong1')+'</small></div></div>';
  if(!ST.married){
    h+='<div class="row-btns" style="justify-content:center"><button class="btn primary" data-act="marry">💍 結婚 (git3 fan1)</button></div>';
  }else{
    h+='<div class="story-line">'+rb('阿明同阿芳結婚。佢哋係老公同老婆。','aa3 ming4 tung4 aa3 fong1 git3 fan1. keoi5 dei6 hai6 lou5 gung1 tung4 lou5 po4.')+'</div><div class="story-th th-t">อาหมิงกับอาฟางแต่งงานกัน พวกเขาเป็นสามีภรรยากัน</div>';
    const parts=[],pj=[],pt=[];
    if(ST.boys){parts.push(NUM[ST.boys][0]+'個仔');pj.push(NUM[ST.boys][1]+' go3 zai2');pt.push('ลูกชาย'+NTH[ST.boys]+'คน');}
    if(ST.girls){parts.push(NUM[ST.girls][0]+'個女');pj.push(NUM[ST.girls][1]+' go3 neoi2');pt.push('ลูกสาว'+NTH[ST.girls]+'คน');}
    let z='';
    if(parts.length){
      z='佢哋生咗'+parts.join('同')+'。';
      const j='keoi5 dei6 saang1 zo2 '+pj.join(' tung4 ')+'.';
      h+='<div class="story-line" style="margin-top:8px">'+rb(z,j)+'</div><div class="story-th th-t">พวกเขามี'+pt.join(' และ ')+'</div>';
      h+='<div class="kids">';
      for(let i=1;i<=ST.boys;i++)h+='<div class="kid">👦 '+rb(ORD[i][0]+'仔',ORD[i][1]+' zai2')+'</div>';
      for(let i=1;i<=ST.girls;i++)h+='<div class="kid">👧 '+rb(ORD[i][0]+'女',ORD[i][1]+' neoi2')+'</div>';
      h+='</div>';
    }
    h+='<div class="row-btns"><button class="btn primary" data-act="boy" '+(ST.boys>=3?'disabled':'')+'>👦 生仔</button><button class="btn primary" data-act="girl" '+(ST.girls>=3?'disabled':'')+'>👧 生女</button>'+(parts.length?'<button class="btn" data-act="say" data-say="'+z+'">▶ 聽</button>':'')+'<button class="btn" data-act="reset">🔄 重新開始</button></div>';
  }
  h+='</div>';
  if(ST.married){
    const hasK=ST.boys+ST.girls>0;
    const rows=[
      ['👶 細路（佢哋嘅仔女）叫：','เด็ก (ลูกของพวกเขา) เรียกว่า:'],
      ['阿明','baba','อาหมิง'],['阿芳','mama','อาฟาง'],['阿明嘅爸爸','yeye','พ่อของอาหมิง'],['阿明嘅媽媽','maa2','แม่ของอาหมิง'],['阿芳嘅爸爸','gung','พ่อของอาฟาง'],['阿芳嘅媽媽','po','แม่ของอาฟาง'],
      ['阿明嘅哥哥','bakfu','พี่ชายของอาหมิง'],['阿明嘅弟弟','suk','น้องชายของอาหมิง'],['阿明嘅家姐','gumaa','พี่สาวของอาหมิง'],['阿明嘅妹妹','guze','น้องสาวของอาหมิง'],
      ['阿芳嘅兄弟','gaufu','พี่น้องชายของอาฟาง'],['阿芳嘅家姐','jimaa','พี่สาวของอาฟาง'],['阿芳嘅妹妹','ayi','น้องสาวของอาฟาง'],
      ['💑 老公、老婆互相叫對方屋企人：','สามีภรรยาเรียกครอบครัวของอีกฝ่าย:'],
      ['阿明叫阿芳嘅爸爸','ngoifu','อาหมิงเรียกพ่อของอาฟาง'],['阿明叫阿芳嘅媽媽','ngoimou','อาหมิงเรียกแม่ของอาฟาง'],['阿芳叫阿明嘅爸爸','gaagung','อาฟางเรียกพ่อของอาหมิง'],['阿芳叫阿明嘅媽媽','gaapo','อาฟางเรียกแม่ของอาหมิง'],
    ];
    if(ST.boys)rows.push(['👴 爺爺嫲嫲叫阿明嘅仔：','ปู่ย่าตายายเรียกลูกชาย:'],['阿明嘅爸爸媽媽叫細路（仔）','syunzai','พ่อแม่ของอาหมิงเรียกลูกชาย'],['阿芳嘅爸爸媽媽叫細路（仔）','ngoisyun','พ่อแม่ของอาฟางเรียกลูกชาย']);
    if(ST.girls)rows.push(['👵 公公婆婆叫阿芳嘅女：','ปู่ย่าตายายเรียกลูกสาว:'],['阿明嘅爸爸媽媽叫細路（女）','syunneoi','พ่อแม่ของอาหมิงเรียกลูกสาว'],['阿芳嘅爸爸媽媽叫細路（女）','ngoisyunneoi','พ่อแม่ของอาฟางเรียกลูกสาว']);
    h+='<div class="card"><table class="ct">'+rows.map(r=>r.length===2?'<tr class="grp"><td colspan="2">'+r[0]+' <span class="th-t">'+r[1]+'</span></td></tr>':'<tr><td>'+r[0]+'<small class="th-t">'+r[2]+'</small></td><td data-act="term" data-id="'+r[1]+'">'+rb(T[r[1]].zh,T[r[1]].j)+' ▶</td></tr>').join('')+'</table></div>';
    if(!hasK)h+='<div class="sub" style="text-align:center">撳「生仔」或者「生女」，睇下多咗啲咩稱呼 👆 <span class="th-t">· กด 生仔/生女 เพื่อดูคำเรียกที่เพิ่มขึ้น</span></div>';
  }
  $('storyBox').innerHTML=h;
}
$('storyBox').onclick=e=>{
  const b=e.target.closest('[data-act]');if(!b)return;
  const a=b.dataset.act;
  if(a==='marry'){ST.married=true;addScore(2);}
  else if(a==='boy'&&ST.boys<3){ST.boys++;addScore(1);}
  else if(a==='girl'&&ST.girls<3){ST.girls++;addScore(1);}
  else if(a==='reset'){ST.married=false;ST.boys=0;ST.girls=0;}
  else if(a==='say'){Speech.speak(b.dataset.say);return;}
  else if(a==='term'){Speech.speak(T[b.dataset.id].zh);return;}
  renderStory();
};

/* ── 遊戲 ── */
const G={mode:'rel',lv:1,qs:[],i:0,score:0,fb:null,done:false,cur:null,mem:null};
const MODES=[['rel','🧮 稱呼計算'],['listen','👂 聽音揀意思'],['match','🃏 配對卡'],['col','🗣 口語叫法']];
const GTOTAL=10;
function renderGame(){
  $('gModes').innerHTML=MODES.map(m=>'<button class="f-btn'+(m[0]===G.mode?' act':'')+'" data-m="'+m[0]+'">'+m[1]+'</button>').join('');
  $('gLv').innerHTML=G.mode==='rel'?'<div class="level-bar">'+[1,2,3].map(l=>'<button class="lv-btn'+(G.lv===l?' act':'')+'" data-lv="'+l+'">Lv '+l+'<span>'+['叔伯姑舅姨','配偶同姻親','下輩同堂表'][l-1]+'</span></button>').join('')+'</div>':'';
  if(!G.cur&&!G.done&&G.mode!=='match')newQ();
  if(G.mode==='match'&&!G.mem&&!G.done)startMatch();
  drawGame();
}
$('gModes').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;G.mode=b.dataset.m;startGame();renderGame();};
$('gLv').onclick=e=>{const b=e.target.closest('[data-lv]');if(!b)return;G.lv=+b.dataset.lv;startGame();renderGame();};
function startGame(){G.i=0;G.score=0;G.fb=null;G.done=false;G.cur=null;G.mem=null;G.qs=[];if(G.pool)delete G.pool;clearTimeout(G.t);}
function poolFor(){
  if(G.mode==='rel')return TERMS.filter(t=>t.lv===G.lv&&(t.relz||t.path.length>1));
  if(G.mode==='col')return TERMS.filter(t=>COL[t.id]&&COL[t.id].some(c=>COLCNT[c[0]]===1));
  return TERMS.filter(t=>t.lv>0||t.gen!==0).filter(t=>true);
}
function newQ(){
  if(!G.qs.length)G.qs=shuffle(poolFor());
  const ans=G.qs[G.i%G.qs.length];
  let pool=(G.mode==='rel'||G.mode==='col')?poolFor():TERMS;
  const wrongs=shuffle(pool.filter(t=>t.id!==ans.id&&(G.mode==='rel'||t.th!==ans.th))).slice(0,3);
  G.cur={ans,opts:shuffle([ans,...wrongs])};
  if(G.mode==='col'){const e=COL[ans.id].filter(c=>COLCNT[c[0]]===1);G.cur.cq=e[Math.floor(Math.random()*e.length)];}
  if(G.mode==='listen')setTimeout(()=>Speech.ok&&Speech.speak(ans.zh),250);
}
function drawGame(){drawGame0();}
function drawGame0(){
  const a=$('gArea');
  if(G.done){
    a.innerHTML='<div class="result"><div class="big">🎉</div><div style="font-family:var(--serif);font-size:20px;font-weight:700">完成！</div><div class="sc">'+G.score+'</div><div class="sub" style="margin:6px 0 14px">เก่งมาก! 叻仔！</div><button class="btn primary" data-act="again">再玩一次</button></div>';
    return;
  }
  if(G.mode==='match'){drawMatch();return;}
  const c=G.cur,t=c.ans;
  let q='';
  if(G.mode==='rel'){
    const r=relOf(t);
    q='<div class="q-card"><div class="q-hint">我嘅……</div><div class="q-big" style="line-height:1.9">'+rb(r.z,r.j)+'</div><div class="q-hint">廣東話點叫？ <span class="th-t">· ภาษากวางตุ้งเรียกว่าอะไร?</span></div></div>';
  }else if(G.mode==='col'){
    const cq=c.cq;
    q='<div class="q-card"><div class="q-hint">🗣 口語叫法 <span class="th-t">· แปลว่าอะไร?</span></div><div class="q-big" style="font-size:34px;margin-top:6px;line-height:1.9">'+rb(cq[0],cq[1])+'</div><button class="btn primary" style="margin-top:8px" data-act="replay">▶ 聽</button></div>';
  }else{
    q='<div class="q-card"><div style="font-size:42px">🔊</div><div class="q-hint">聽一聽，呢個稱呼係咩意思？ <span class="th-t">· ฟังแล้วเลือกความหมาย</span></div><button class="btn primary" style="margin-top:8px" data-act="replay">▶ 再聽一次</button>'+(Speech.ok?'':'<div class="q-hint" style="color:var(--red)">你嘅瀏覽器唔支援語音，將會顯示文字</div>')+(Speech.ok&&G.fb===null?'':'<div class="q-big" style="margin-top:8px;line-height:1.9">'+rb(t.zh,t.j)+'</div>')+'</div>';
  }
  const opts='<div class="opts">'+c.opts.map((o,i)=>{
    let cls='opt';
    if(G.fb){if(o.id===t.id)cls+=' ok';else if(G.fb.pick===i)cls+=' bad';else cls+=' dim';}
    const inner=G.mode==='rel'?'<span class="oc">'+rb(o.zh,o.j)+'</span>':'<span class="ot">'+o.th+'</span>';
    return'<button class="'+cls+'" data-opt="'+i+'">'+inner+'</button>';
  }).join('')+'</div>';
  let fb='';
  if(G.fb){const ok=G.fb.ok;const core=G.mode==='col'?'「'+rb(c.cq[0],c.cq[1])+'」＝ '+rb(t.zh,t.j):(ok?rb(t.zh,t.j):'係「'+rb(t.zh,t.j)+'」');fb='<div class="fb '+(ok?'ok':'err')+'">'+(ok?'✓ 啱！ ':'✗ ')+core+' <span class="th-t">— '+t.th+'</span></div>'+(G.mode==='col'&&c.cq[2]?'<div class="sub" style="text-align:center;margin-top:6px">💡 '+c.cq[2]+'</div>':'');}
  a.innerHTML='<div class="g-hdr"><span class="score-pill">★ '+G.score+'</span><span class="round-pill">'+(G.i+1)+' / '+GTOTAL+'</span></div>'+q+opts+fb;
}
$('gArea').onclick=e=>{
  const b=e.target.closest('[data-opt],[data-act],[data-mc]');if(!b)return;
  if(b.dataset.act==='again'){startGame();renderGame();return;}
  if(b.dataset.act==='replay'){G.cur&&Speech.speak(G.mode==='col'&&G.cur.cq?G.cur.cq[0]:G.cur.ans.zh);return;}
  if(b.dataset.mc!==undefined){flipMatch(+b.dataset.mc);return;}
  if(G.fb)return;
  const i=+b.dataset.opt,ok=G.cur.opts[i].id===G.cur.ans.id;
  G.fb={ok,pick:i};if(ok)G.score+=10;
  drawGame();
  G.t=setTimeout(()=>{
    G.i++;G.fb=null;G.cur=null;
    if(G.i>=GTOTAL){G.done=true;addScore(G.score);logHist(G.score,'ft');}else newQ();
    drawGame();
  },1300);
};
/* 配對卡 */
function startMatch(){
  const pairs=shuffle(TERMS.filter(t=>t.lv>0&&t.th.length<26)).slice(0,6);
  let cards=[];pairs.forEach(t=>{cards.push({id:t.id,k:'zh',txt:t.zh});cards.push({id:t.id,k:'th',txt:t.th});});
  G.mem={cards:shuffle(cards),up:[],done:{},moves:0,lock:false};
}
function drawMatch(){drawMatch0();}
function drawMatch0(){
  const m=G.mem;
  $('gArea').innerHTML='<div class="g-hdr"><span class="score-pill">★ '+G.score+'</span><span class="round-pill">步數 '+m.moves+'</span></div><div class="sub">揀兩張卡：廣東話 ＝ 泰文意思 <span class="th-t">· เลือกการ์ดสองใบ</span></div><div class="mgrid">'
   +m.cards.map((c,i)=>{
     const up=m.up.includes(i),dn=m.done[c.id];
     return'<button class="mcard '+c.k+(up?' up':'')+(dn?' done':'')+'" data-mc="'+i+'">'+((up||dn)?(c.k==='zh'?rb(c.txt,T[c.id].j):c.txt):'?')+'</button>';
   }).join('')+'</div>';
}
function flipMatch(i){
  const m=G.mem;
  if(m.lock||m.up.includes(i)||m.done[m.cards[i].id])return;
  m.up.push(i);
  if(m.up.length===2){
    m.moves++;
    const [a,b]=m.up.map(x=>m.cards[x]);
    if(a.id===b.id&&a.k!==b.k){
      m.done[a.id]=true;m.up=[];G.score+=5;
      Speech.ok&&Speech.speak(T[a.id].zh);
      if(Object.keys(m.done).length===6){drawMatch();G.t=setTimeout(()=>{G.done=true;addScore(G.score);logHist(G.score,'ft');drawGame();},900);return;}
    }else{
      m.lock=true;drawMatch();
      G.t=setTimeout(()=>{m.up=[];m.lock=false;drawMatch();},900);return;
    }
  }
  drawMatch();
}

/* ── 句子 ── */
const PATTERNS=[
 ['呢個係我嘅爸爸。','ni1 go3 hai6 ngo5 ge3 baa4 baa1.','นี่คือพ่อของฉัน'],
 ['佢係我媽媽嘅媽媽。','keoi5 hai6 ngo5 maa4 maa1 ge3 maa4 maa1.','เธอคือแม่ของแม่ฉัน (ยาย)'],
 ['我有一個哥哥同兩個妹妹。','ngo5 jau5 jat1 go3 go4 go1 tung4 loeng5 go3 mui6 mui2.','ฉันมีพี่ชายหนึ่งคนและน้องสาวสองคน'],
 ['你有冇兄弟姊妹？','nei5 jau5 mou5 hing1 dai6 zi2 mui6?','คุณมีพี่น้องไหม'],
 ['你屋企有幾多人？','nei5 uk1 kei2 jau5 gei2 do1 jan4?','บ้านคุณมีกี่คน'],
 ['我同老婆結婚好耐喇。','ngo5 tung4 lou5 po4 git3 fan1 hou2 noi6 laa3.','ฉันกับภรรยาแต่งงานกันมานานแล้ว'],
 ['佢哋生咗兩個仔同一個女。','keoi5 dei6 saang1 zo2 loeng5 go3 zai2 tung4 jat1 go3 neoi2.','พวกเขามีลูกชายสองคนและลูกสาวหนึ่งคน'],
 ['我叫媽媽嘅爸爸做公公。','ngo5 giu3 maa4 maa1 ge3 baa4 baa1 zou6 gung1 gung1.','ฉันเรียกพ่อของแม่ว่า 公公'],
 ['我有一個大佬同一個細佬。','ngo5 jau5 jat1 go3 daai6 lou2 tung4 jat1 go3 sai3 lou2.','ฉันมีพี่ชายหนึ่งคนและน้องชายหนึ่งคน (ปากภาษา)'],
 ['阿叔住喺香港。','aa3 suk1 zyu6 hai2 hoeng1 gong2.','อา (น้องชายพ่อ) อาศัยอยู่ที่ฮ่องกง'],
 ['我老豆喺屋企睇報紙。','ngo5 lou5 dau6 hai2 uk1 kei2 tai2 bou3 zi2.','พ่อของฉันอ่านหนังสือพิมพ์อยู่ที่บ้าน'],
];
const SENTS=[
 {th:'นี่คือพ่อของฉัน',p:[['呢個','ni1 go3'],['係','hai6'],['我','ngo5'],['嘅','ge3'],['爸爸','baa4 baa1']]},
 {th:'ฉันมีพี่ชายหนึ่งคนและน้องสาวสองคน',p:[['我','ngo5'],['有','jau5'],['一個','jat1 go3'],['哥哥','go4 go1'],['同','tung4'],['兩個','loeng5 go3'],['妹妹','mui6 mui2']]},
 {th:'เธอคือแม่ของแม่ฉัน',p:[['佢','keoi5'],['係','hai6'],['我','ngo5'],['媽媽','maa4 maa1'],['嘅','ge3'],['媽媽','maa4 maa1']]},
 {th:'ปู่ของฉันอาศัยอยู่ที่ประเทศไทย',p:[['我','ngo5'],['爺爺','je4 je2'],['住','zyu6'],['喺','hai2'],['泰國','taai3 gwok3']]},
 {th:'บ้านคุณมีกี่คน',p:[['你','nei5'],['屋企','uk1 kei2'],['有','jau5'],['幾多','gei2 do1'],['人','jan4']]},
 {th:'ฉันกับภรรยาแต่งงานกันมานานแล้ว',p:[['我','ngo5'],['同','tung4'],['老婆','lou5 po4'],['結婚','git3 fan1'],['好耐','hou2 noi6'],['喇','laa3']]},
 {th:'พวกเขามีลูกชายสองคนและลูกสาวหนึ่งคน',p:[['佢哋','keoi5 dei6'],['生咗','saang1 zo2'],['兩個','loeng5 go3'],['仔','zai2'],['同','tung4'],['一個','jat1 go3'],['女','neoi2']]},
 {th:'คุณมีพี่น้องไหม',p:[['你','nei5'],['有冇','jau5 mou5'],['兄弟姊妹','hing1 dai6 zi2 mui6']]},
 {th:'ลุงของฉันเป็นคนฮ่องกง',p:[['我','ngo5'],['伯父','baak3 fu2'],['係','hai6'],['香港人','hoeng1 gong2 jan4']]},
 {th:'น้า (พี่น้องชายแม่) ของฉันมีลูกสองคน',p:[['我','ngo5'],['舅父','gau5 fu2'],['有','jau5'],['兩個','loeng5 go3'],['仔女','zai2 neoi2']]},
 {th:'ฉันเรียกพ่อของแม่ว่า 公公',p:[['我','ngo5'],['叫','giu3'],['媽媽','maa4 maa1'],['嘅','ge3'],['爸爸','baa4 baa1'],['做','zou6'],['公公','gung1 gung1']]},
 {th:'พ่อของฉันมีพี่ชายหนึ่งคน',p:[['我','ngo5'],['爸爸','baa4 baa1'],['有','jau5'],['一個','jat1 go3'],['哥哥','go4 go1']]},
 {th:'พี่ชายกับน้องชายของฉันชอบเล่นบอล',p:[['我','ngo5'],['大佬','daai6 lou2'],['同','tung4'],['細佬','sai3 lou2'],['都','dou1'],['鍾意','zung1 ji3'],['打波','daa2 bo1']]},
 {th:'อา (น้องชายพ่อ) อาศัยอยู่ที่ฮ่องกง',p:[['阿叔','aa3 suk1'],['住','zyu6'],['喺','hai2'],['香港','hoeng1 gong2']]},
 {th:'พ่อของฉันอ่านหนังสือพิมพ์อยู่ที่บ้าน',p:[['我','ngo5'],['老豆','lou5 dau6'],['喺','hai2'],['屋企','uk1 kei2'],['睇','tai2'],['報紙','bou3 zi2']]},
];
const CLOZE=[
 ['阿明係阿芳嘅老公，阿芳係阿明嘅＿＿。','老婆',['老公','老婆','哥哥','媽媽']],
 ['阿明同阿芳結婚，佢哋生咗一個仔，阿明係個仔嘅＿＿。','爸爸',['爸爸','媽媽','爺爺','伯父']],
 ['細路叫阿明嘅爸爸做＿＿。','爺爺',['爺爺','公公','叔叔','舅父']],
 ['細路叫阿明嘅媽媽做＿＿。','嫲嫲',['婆婆','嫲嫲','姑媽','阿姨']],
 ['細路叫阿芳嘅爸爸做＿＿。','公公',['公公','爺爺','伯父','舅父']],
 ['細路叫阿芳嘅媽媽做＿＿。','婆婆',['婆婆','嫲嫲','姨媽','舅母']],
 ['阿明嘅哥哥，細路叫佢做＿＿。','伯父',['伯父','叔叔','舅父','姨丈']],
 ['阿明嘅弟弟，細路叫佢做＿＿。','叔叔',['伯父','叔叔','舅父','姑丈']],
 ['阿明嘅妹妹，細路叫佢做＿＿。','姑姐',['姑媽','姑姐','姨媽','阿姨']],
 ['阿芳嘅哥哥，細路叫佢做＿＿。','舅父',['舅父','伯父','姑丈','叔叔']],
 ['阿芳嘅家姐，細路叫佢做＿＿。','姨媽',['姨媽','阿姨','姑媽','舅母']],
 ['阿芳嘅妹妹，細路叫佢做＿＿。','阿姨',['姨媽','阿姨','姑姐','嬸嬸']],
 ['阿芳叫阿明嘅爸爸做＿＿。','家公',['家公','外父','爺爺','公公']],
 ['阿明叫阿芳嘅媽媽做＿＿。','外母',['家婆','外母','婆婆','嫲嫲']],
 ['阿明嘅爸爸，叫阿明嘅仔做＿＿。','孫仔',['孫仔','外孫','姪仔','外甥']],
 ['阿芳嘅爸爸，叫阿芳嘅女做＿＿。','外孫女',['孫女','外孫女','姪女','外甥女']],
];
const CLOZE_TH={
 '阿明係阿芳嘅老公，阿芳係阿明嘅＿＿。':'อาหมิงเป็นสามีของอาฟาง อาฟางเป็น ＿＿ ของอาหมิง',
 '阿明同阿芳結婚，佢哋生咗一個仔，阿明係個仔嘅＿＿。':'อาหมิงกับอาฟางแต่งงานกัน มีลูกชายหนึ่งคน อาหมิงเป็น ＿＿ ของลูกชาย',
 '細路叫阿明嘅爸爸做＿＿。':'เด็กเรียกพ่อของอาหมิงว่า ＿＿',
 '細路叫阿明嘅媽媽做＿＿。':'เด็กเรียกแม่ของอาหมิงว่า ＿＿',
 '細路叫阿芳嘅爸爸做＿＿。':'เด็กเรียกพ่อของอาฟางว่า ＿＿',
 '細路叫阿芳嘅媽媽做＿＿。':'เด็กเรียกแม่ของอาฟางว่า ＿＿',
 '阿明嘅哥哥，細路叫佢做＿＿。':'พี่ชายของอาหมิง เด็กเรียกเขาว่า ＿＿',
 '阿明嘅弟弟，細路叫佢做＿＿。':'น้องชายของอาหมิง เด็กเรียกเขาว่า ＿＿',
 '阿明嘅妹妹，細路叫佢做＿＿。':'น้องสาวของอาหมิง เด็กเรียกเธอว่า ＿＿',
 '阿芳嘅哥哥，細路叫佢做＿＿。':'พี่ชายของอาฟาง เด็กเรียกเขาว่า ＿＿',
 '阿芳嘅家姐，細路叫佢做＿＿。':'พี่สาวของอาฟาง เด็กเรียกเธอว่า ＿＿',
 '阿芳嘅妹妹，細路叫佢做＿＿。':'น้องสาวของอาฟาง เด็กเรียกเธอว่า ＿＿',
 '阿芳叫阿明嘅爸爸做＿＿。':'อาฟางเรียกพ่อของอาหมิงว่า ＿＿',
 '阿明叫阿芳嘅媽媽做＿＿。':'อาหมิงเรียกแม่ของอาฟางว่า ＿＿',
 '阿明嘅爸爸，叫阿明嘅仔做＿＿。':'พ่อของอาหมิง เรียกลูกชายของอาหมิงว่า ＿＿',
 '阿芳嘅爸爸，叫阿芳嘅女做＿＿。':'พ่อของอาฟาง เรียกลูกสาวของอาฟางว่า ＿＿'
};
const SS={mode:'learn',q:[],i:0,tokens:[],pool:[],slots:[],tries:0,done:false,marks:null,msg:'',gaveUp:false,score:0,fin:false,
  cz:{q:[],i:0,score:0,fb:null,fin:false,opts:null}};
function renderSent(){renderSent0();}
function renderSent0(){
  $('sMode').innerHTML=[['learn','📖 句型'],['order','🔀 重組句子'],['cloze','🧩 填空']].map(m=>'<button class="seg-btn'+(SS.mode===m[0]?' act':'')+'" data-m="'+m[0]+'">'+m[1]+'</button>').join('');
  const a=$('sArea');
  if(SS.mode==='learn'){
    a.innerHTML='<div class="sub th-t">แตะประโยคเพื่อฟังเสียง</div>'+PATTERNS.map((p,i)=>'<div class="pat" data-say="'+p[0]+'"><div class="pz">'+rb(p[0],p[1])+'</div><div class="pt">'+p[2]+'</div><div class="pplay">▶</div></div>').join('');
  }else if(SS.mode==='order'){
    if(!SS.q.length||SS.fin&&false)startOrder();
    drawOrder();
  }else{
    if(!SS.cz.q.length)startCloze();
    drawCloze();
  }
}
$('sMode').onclick=e=>{const b=e.target.closest('[data-m]');if(!b)return;SS.mode=b.dataset.m;renderSent();};
$('sArea').onclick=e=>{
  const p=e.target.closest('[data-say]');if(p){Speech.speak(p.dataset.say);return;}
  const b=e.target.closest('[data-do]');if(!b)return;
  const d=b.dataset.do,v=+b.dataset.v;
  const fnMap={place:oPlace,back:oBack,reset:oReset,check:oCheck,giveup:oGive,next:oNext,restart:()=>{startOrder();drawOrder();},speak:()=>Speech.speak(SS.tokens.map(t=>t.t).join('')),
    czpick:czPick,cznext:czNext,czrestart:()=>{startCloze();drawCloze();}};
  if(fnMap[d])fnMap[d](v);
};
/* 重組 */
function startOrder(){SS.q=shuffle(SENTS).slice(0,5);SS.i=0;SS.score=0;SS.fin=false;newOrder();}
function newOrder(){
  const s=SS.q[SS.i];
  SS.tokens=s.p.map((x,k)=>({k,t:x[0],j:x[1]}));
  const correct=SS.tokens.map(t=>t.t).join('|');
  let pool=shuffle(SS.tokens.map(t=>t.k));
  for(let n=0;n<12&&pool.map(k=>SS.tokens[k].t).join('|')===correct;n++)pool=shuffle(pool);
  SS.pool=pool;SS.slots=SS.tokens.map(()=>null);SS.tries=0;SS.done=false;SS.marks=null;SS.msg='';SS.gaveUp=false;
}
function ocard(t,cls,act,v){return'<button class="sg-card'+(cls||'')+'" '+(act?'data-do="'+act+'" data-v="'+v+'"':'disabled')+'><div class="sg-char">'+rb(t.t,t.j)+'</div></button>';}
function drawOrder(){drawOrder0();}
function drawOrder0(){
  const a=$('sArea');
  if(SS.fin){a.innerHTML='<div class="result"><div class="big">🎉</div><div style="font-family:var(--serif);font-size:20px;font-weight:700">完成晒！</div><div class="sc">'+SS.score+'</div><div class="sub" style="margin:6px 0 14px">เก่งมาก!</div><button class="btn primary" data-do="restart">再玩一次</button></div>';return;}
  const s=SS.q[SS.i];
  const placed=new Set(SS.slots.filter(k=>k!==null));
  const full=SS.slots.every(k=>k!==null);
  const slots=SS.slots.map((k,i)=>k===null?'<div class="sg-slot">'+(i+1)+'</div>':'<div class="sg-slot filled">'+ocard(SS.tokens[k],SS.done?' ok':(SS.marks?(SS.marks[i]?' ok':' bad'):''),SS.done?null:'back',i)+'</div>').join('');
  const pool=SS.pool.filter(k=>!placed.has(k)).map(k=>ocard(SS.tokens[k],'','place',k)).join('');
  const acts=SS.done?'<button class="btn primary" data-do="next">'+(SS.i+1>=SS.q.length?'睇成績 ➜':'下一題 ➜')+'</button>':'<button class="btn primary" '+(full?'':'disabled')+' data-do="check">檢查答案</button><button class="btn" data-do="reset">🔄 重來</button>'+(SS.tries>=2?'<button class="btn" data-do="giveup">👀 睇答案</button>':'');
  a.innerHTML='<div class="g-hdr"><span class="score-pill">★ '+SS.score+'</span><span class="round-pill">'+(SS.i+1)+' / '+SS.q.length+'</span></div>'
   +'<div class="card"><div class="sub" style="margin-bottom:4px">將卡牌排成正確嘅句子 👇 <span class="th-t">· เรียงการ์ดให้เป็นประโยคที่ถูกต้อง</span></div><div style="font-family:\'Noto Sans Thai\';font-size:17px;font-weight:600">'+s.th+'</div>'+(Speech.ok&&SS.done?'<button class="btn" style="margin-top:8px" data-do="speak">🔊 聽句子</button>':'')+'</div>'
   +'<div class="sg-slots">'+slots+'</div>'+(SS.done?'':'<div class="sg-pool">'+pool+'</div>')
   +(SS.msg?'<div class="sg-msg'+(SS.done&&!SS.gaveUp?' good':'')+'">'+SS.msg+'</div>':'')
   +'<div class="sg-actions">'+acts+'</div>';
}
function oPlace(k){if(SS.done)return;const i=SS.slots.indexOf(null);if(i<0)return;SS.slots[i]=k;SS.marks=null;SS.msg='';drawOrder();}
function oBack(i){if(SS.done)return;SS.slots[i]=null;SS.marks=null;SS.msg='';drawOrder();}
function oReset(){SS.slots=SS.tokens.map(()=>null);SS.marks=null;SS.msg='';drawOrder();}
function oCheck(){
  const marks=SS.slots.map((k,i)=>SS.tokens[k].t===SS.tokens[i].t);
  if(marks.every(Boolean)){const pts=SS.tries===0?10:SS.tries===1?5:2;SS.score+=pts;addScore(pts);SS.done=true;SS.marks=null;SS.msg='✅ 啱！+'+pts+' 分';}
  else{SS.tries++;SS.marks=marks;SS.msg='❌ 有'+marks.filter(x=>!x).length+'個位未啱（紅色），撳紅色卡拎走再試';}
  drawOrder();
}
function oGive(){SS.slots=SS.tokens.map(t=>t.k);SS.done=true;SS.gaveUp=true;SS.marks=null;SS.msg='正確答案如上，下次加油 💪';drawOrder();}
function oNext(){if(SS.i+1>=SS.q.length){SS.fin=true;logHist(SS.score,'ft');}else{SS.i++;newOrder();}drawOrder();}
/* 填空 */
function startCloze(){SS.cz.q=shuffle(CLOZE).slice(0,8);SS.cz.i=0;SS.cz.score=0;SS.cz.fb=null;SS.cz.fin=false;SS.cz.opts=null;}
function drawCloze(){drawCloze0();}
function drawCloze0(){
  const c=SS.cz,a=$('sArea');
  if(c.fin){a.innerHTML='<div class="result"><div class="big">🎉</div><div style="font-family:var(--serif);font-size:20px;font-weight:700">完成晒！</div><div class="sc">'+c.score+'</div><div class="sub" style="margin:6px 0 14px">เก่งมาก!</div><button class="btn primary" data-do="czrestart">再玩一次</button></div>';return;}
  const q=c.q[c.i];
  if(!c.opts)c.opts=shuffle(q[2]);
  const opts='<div class="opts">'+c.opts.map((z,i)=>{
    const t=byZh(z);let cls='opt';
    if(c.fb){if(z===q[1])cls+=' ok';else if(c.fb.pick===i)cls+=' bad';else cls+=' dim';}
    return'<button class="'+cls+'" data-do="czpick" data-v="'+i+'"><span class="oc">'+rb(z,t?t.j:'')+'</span></button>';
  }).join('')+'</div>';
  const ans=byZh(q[1]);
  const fb=c.fb?'<div class="fb '+(c.fb.ok?'ok':'err')+'">'+(c.fb.ok?'✓ 啱！ '+rb(ans.zh,ans.j):'✗ 答案係「'+rb(ans.zh,ans.j)+'」')+' <span class="th-t">— '+ans.th+'</span></div><div class="sg-actions"><button class="btn primary" data-do="cznext">'+(c.i+1>=c.q.length?'睇成績 ➜':'下一題 ➜')+'</button></div>':'';
  a.innerHTML='<div class="g-hdr"><span class="score-pill">★ '+c.score+'</span><span class="round-pill">'+(c.i+1)+' / '+c.q.length+'</span></div><div class="q-card"><div class="q-hint">阿明 👨 同阿芳 👩 係一對夫婦，有細路 👶 <span class="th-t">· อาหมิงกับอาฟางเป็นสามีภรรยากัน มีลูก</span></div><div class="q-big" style="font-size:19px;line-height:2.1;margin-top:6px">'+q[0]+'</div><div class="q-th th-t">'+(CLOZE_TH[q[0]]||'')+'</div></div>'+opts+fb;
}
function czPick(i){
  const c=SS.cz;if(c.fb)return;
  const q=c.q[c.i],ok=c.opts[i]===q[1];
  c.fb={ok,pick:i};if(ok){c.score+=10;addScore(10);}
  drawCloze();
}
function czNext(){const c=SS.cz;if(c.i+1>=c.q.length){c.fin=true;logHist(c.score,'ft');}else{c.i++;c.fb=null;c.opts=null;}drawCloze();}

/* ── 啟動 ── */
renderTree();renderList();renderTips();

const FT_TABS=[['learn','🌳 家譜'],['story','💍 結婚生仔'],['game','🎮 遊戲'],['sent','✏️ 句子']];
const barEl=window.document.getElementById('fm-bar');
function setBar(t){barEl.innerHTML=FT_TABS.map(x=>'<button class="tm-tab'+(x[0]===t?' act':'')+'" type="button" data-ft="'+x[0]+'">'+x[1]+'</button>').join('');}
barEl.addEventListener('click',e=>{const b=e.target.closest('[data-ft]');if(b){showTab(b.dataset.ft);window.scrollTo({top:0});}});
setBar(S.tab);
window.FTM={closeSheet:closeSheet};
window.famShow=function(){showTab(S.tab);if(S.tab==='learn')renderTree();};   // 切返嚟先量闊度
window.famLeave=function(){closeSheet();try{speechSynthesis.cancel();}catch(e){}};
window.addEventListener('resize',function(){if(S.tab==='learn'&&host.offsetParent)renderTree();});

})();
