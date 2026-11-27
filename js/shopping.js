/* ═══ 落街買餸（落街買餸／紙幣硬幣／菜檔／豬肉檔／魚檔／生果舖／雜貨舖／急凍舖／家常菜／練習）═══
   同 classifier.js 一樣用 Shadow DOM 隔離；需要 #fs-bar、#fs-host（index.html）＋ img/pork-cuts.jpg
   粵拼：輸出 <ruby class="jr"><rt data-j>（同全站引擎一致）；泰文用 .thx，跟全站「粵拼／泰文」掣（host 嘅 hide-jy／hide-th）
   計分：window.APP_AWARD／APP_LOGHIST（score-bridge.js），得分紀錄 key = 'food' */
(function(){
'use strict';
var host=document.getElementById('fs-host');if(!host||!host.attachShadow)return;
var PORK_IMG='img/pork-cuts.jpg?v=20261127';
var CSS_TEXT="*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;--bg:#F1F0E4;--surface:#fff;--surface2:#E7E6D6;--border:#D9D6C4;--text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;--accent:#0E6B57;--accent-bg:#E3EFE9;--yellow:#A9701C;--yellow-bg:#F8EDDA;--green:#1D8A5C;--green-bg:#E6F4EC;--red:#C1402A;--red-bg:#FAEAE4;--radius:12px;--shadow:0 1px 4px rgba(0,0,0,.08);--serif:'Noto Serif TC',serif}\n"
+".page{display:none}.page.act{display:block}\n.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:22px 0 10px}.sec:first-child{margin-top:0}\n"
+".card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px;box-shadow:var(--shadow)}\n.note{font-size:12px;color:var(--text-sub);font-family:'Noto Sans Thai','Noto Sans TC'}\n"
+".zh{font-family:var(--serif);font-size:20px;font-weight:700}.zh.sm{font-size:17px}\n.jy{font-family:'Space Mono';font-size:11px;color:var(--accent)}\n.th{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub)}\n"
+".spk{background:var(--accent-bg);border:1px solid #c3d9d0;color:var(--accent);border-radius:8px;padding:3px 10px;font-size:12px;cursor:pointer;font-family:inherit;flex-shrink:0}\n"
+".ln{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:5px 0 5px 10px;border-left:3px solid var(--accent-bg);margin-top:6px}\n"
+".wg{display:grid;grid-template-columns:1fr 1fr;gap:8px}\n.wc{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px;box-shadow:var(--shadow);display:flex;gap:8px;align-items:flex-start}\n.wc .em{font-size:28px;line-height:1.1}.wc .m{flex:1;min-width:0}\n.buy{font-size:12px;color:var(--yellow);background:var(--yellow-bg);border-radius:8px;padding:2px 8px;margin-top:4px;display:inline-block}\n"
+".dl{display:flex;margin:8px 0}.dl.me{justify-content:flex-end}.bub{max-width:90%;padding:8px 12px;border-radius:14px;border:1.5px solid var(--border);background:var(--surface)}.me .bub{background:var(--accent-bg);border-color:#c3d9d0}.who{font-size:10px;color:var(--text-muted)}.bub .r{display:flex;gap:8px;align-items:center;justify-content:space-between}\n"
+".mr{display:flex;align-items:center;gap:12px;padding:8px 0;border-top:1px solid var(--surface2)}.mr:first-child{border-top:none;padding-top:0}.mr .m{flex:1;min-width:0}\n"
+".nt{width:104px;height:50px;border-radius:7px;display:flex;align-items:center;justify-content:center;color:#fff;font-family:'Space Mono';font-weight:700;font-size:20px;flex-shrink:0;border:2px solid rgba(255,255,255,.5);box-shadow:inset 0 0 0 2px rgba(0,0,0,.12)}\n"
+".coin{width:52px;height:52px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Space Mono';font-weight:700;font-size:14px;border:3px solid rgba(0,0,0,.22);flex-shrink:0;color:#333}\n"
+".tks{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 6px}.tk{background:var(--surface);border:2px solid;border-radius:10px;padding:5px 8px;text-align:center;min-width:50px}\n.tk-r{font-size:9px;font-weight:700}.tk-c{font-family:var(--serif);font-size:20px;font-weight:900;line-height:1.2}.tk-j{font-family:'Space Mono';font-size:9px;color:var(--text-sub)}.tk-t{font-family:'Noto Sans Thai';font-size:10px;color:var(--text-sub)}\n"
+".tip{padding:10px 0;border-top:1px dashed var(--border)}.tip:first-child{border-top:none;padding-top:0}.tip-t{font-weight:700;font-size:13px;margin-bottom:3px}\n"
+".cc{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);margin-bottom:10px;box-shadow:var(--shadow);overflow:hidden}.cc-h{display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer}.cc-m{flex:1;min-width:0}.cc-e{font-size:30px}.chev{color:var(--text-muted);transition:transform .2s}.cc.open .chev{transform:rotate(90deg)}.cc-b{display:none;border-top:1.5px solid var(--border);padding:12px 14px}.cc.open .cc-b{display:block}\n"
+".chips{display:flex;flex-wrap:wrap;gap:6px}.chip{padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:13px;cursor:pointer;font-family:inherit;font-weight:500}.chip.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.row-l{font-size:11px;font-weight:700;color:var(--text-muted);margin:12px 0 5px}\n"
+".out{background:var(--surface);border:2px solid var(--accent);border-radius:var(--radius);padding:14px;margin:12px 0;box-shadow:var(--shadow)}\n.tips-b{background:var(--yellow-bg);border-radius:10px;padding:8px 12px;font-size:12px;color:var(--yellow);margin-top:10px}\n"
+".map{position:relative;border:1.5px solid var(--border);border-radius:var(--radius);overflow:hidden;background:#fff;box-shadow:var(--shadow);margin-bottom:10px}.map img{display:block;width:100%;height:auto}\n.hs{position:absolute;border:2.5px solid transparent;border-radius:14px;background:transparent;cursor:pointer}.hs:hover{border-color:rgba(14,107,87,.5)}.hs.on{border-color:var(--accent);background:rgba(14,107,87,.22)}.hs.ok{border-color:var(--green);background:rgba(29,138,92,.4)}.hs.bad{border-color:var(--red);background:rgba(193,64,42,.35)}\n"
+".pn{border-left:5px solid var(--accent)}.pn .big{font-family:var(--serif);font-size:26px;font-weight:900}\n.lt{display:inline-block;background:var(--accent);color:#fff;border-radius:50%;width:26px;height:26px;text-align:center;line-height:26px;font-weight:700;font-family:'Space Mono';font-size:13px;margin-right:8px}\n"
+".g-hdr{display:flex;justify-content:space-between;margin-bottom:10px}.pill{background:var(--yellow-bg);border:1.5px solid #e9d6ae;color:var(--yellow);padding:3px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:13px}.pill.r{background:var(--surface2);border-color:var(--border);color:var(--text-sub)}\n"
+".opts{display:flex;flex-direction:column;gap:8px;margin-top:10px}.opt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 14px;cursor:pointer;text-align:left;font-family:inherit;color:var(--text);box-shadow:var(--shadow)}.opt:hover{border-color:var(--accent);background:var(--accent-bg)}.opt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}.opt.bad{border-color:var(--red)!important;background:var(--red-bg)!important}.opt.dim{opacity:.4;pointer-events:none}\n"
+".fb{padding:9px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid;margin-top:12px}.fb.ok{background:var(--green-bg);color:var(--green);border-color:#bbf7d0}.fb.err{background:var(--red-bg);color:var(--red);border-color:#fecaca}\n"
+".acts{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px}.btn{border:1.5px solid var(--border);background:var(--surface);border-radius:20px;padding:8px 20px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;color:var(--text-sub)}.btn.p{background:var(--accent);border-color:var(--accent);color:#fff}\n"
+".result{text-align:center;padding:30px 16px}.result .big{font-size:52px}.result .sc{font-family:'Space Mono';font-size:32px;font-weight:700;color:var(--accent)}\n"
+"ruby{ruby-align:center;ruby-position:over;margin:0 1px}ruby.jr rt[data-j]{text-align:center}.buy rt[data-j],.chip.act rt[data-j],.btn.p rt[data-j],.lt rt[data-j]{color:inherit}.chip.act rt[data-j],.btn.p rt[data-j],.lt rt[data-j]{color:#fff}.tq{font-size:15px;color:var(--text)}\n:host(.hide-jy) .jy{display:none}\n"
+"@media(min-width:900px){.wg{grid-template-columns:repeat(3,1fr)}.opts{display:grid;grid-template-columns:1fr 1fr}}\n";
var SR=host.attachShadow({mode:'open'});
var PAGES=['shop','money','veg','pork','fish','fruit','groc','frz','dish','prac'];
SR.innerHTML='<style>'+CSS_TEXT+'</style>'+PAGES.map(function(p,i){return '<div class="page'+(i?'':' act')+'" id="p-'+p+'"></div>';}).join('');
var $=function(id){return SR.getElementById(id);};
var rand=function(n){return Math.floor(Math.random()*n);},pick=function(a){return a[rand(a.length)];};
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=rand(i+1),t=a[i];a[i]=a[j];a[j]=t;}return a;}

/* ── 語音（同 classifier.js 一樣） ── */
var Speech={ok:'speechSynthesis' in window,voices:[],
 init:function(){if(!this.ok)return;var s=this,l=function(){s.voices=speechSynthesis.getVoices();};l();speechSynthesis.addEventListener('voiceschanged',l);},
 say:function(t){if(!this.ok)return;var s=this;
  var go=function(){var u=new SpeechSynthesisUtterance(String(t));
   var v=s.voices.find(function(v){return v.lang==='zh-HK';})||s.voices.find(function(v){return /yue/i.test(v.lang);})||s.voices.find(function(v){return v.lang==='zh-TW';})||s.voices.find(function(v){return v.lang.indexOf('zh')===0;});
   if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;speechSynthesis.speak(u);};
  var busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
  if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();}};
Speech.init();
function sp(t){Speech.say(t);}
function esc(s){return String(s).replace(/"/g,'&quot;');}
var CJK=/[\u3400-\u9fff]/;
var WD={},CD={};
function L(zh,jy){if(!jy)return;var s=String(jy).match(/[a-z]+[1-6]/g)||[],ch=Array.from(zh).filter(function(c){return CJK.test(c);});if(!s.length||s.length!==ch.length)return;
 if(ch.length>1&&!WD[ch.join('')])WD[ch.join('')]=s;ch.forEach(function(c,i){if(!CD[c])CD[c]=s[i];});}
var MISS={};
function rubyRun(r){var out='',i=0,n=r.length;while(i<n){var hit=null,l;for(l=Math.min(14,n-i);l>=2;l--){var w=WD[r.substr(i,l)];if(w){hit=w;break;}}
 if(hit){for(var k=0;k<l;k++)out+='<ruby class="jr">'+r[i+k]+'<rt data-j="'+hit[k]+'"></rt></ruby>';i+=l;}
 else{var c=r[i],j=CD[c];if(j)out+='<ruby class="jr">'+c+'<rt data-j="'+j+'"></rt></ruby>';else{out+=c;if(!MISS[c]){MISS[c]=1;console.warn('[ruby] 缺粵拼：'+c);}}i++;}}return out;}
function xesc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}
function walkText(root,test,skip,fn){var tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT),ns=[],n;while((n=tw.nextNode()))ns.push(n);
 ns.forEach(function(n){var p=n.parentNode;if(!p||!test.test(n.nodeValue))return;if(p.closest&&p.closest(skip))return;var d=document.createElement('span');d.innerHTML=fn(n.nodeValue);var f=document.createDocumentFragment();while(d.firstChild)f.appendChild(d.firstChild);p.replaceChild(f,n);});}
function autoRuby(root){walkText(root,/[\u3400-\u9fff]/,'ruby,rt,style,script',function(v){return v.split(/([\u3400-\u9fff]+)/).map(function(x,i){return i%2?rubyRun(x):xesc(x);}).join('');});}
var THR=/([(（]?[\u0E00-\u0E7F](?:[\u0E00-\u0E7F\u200b\s\d.,\/'"%+:\-·]*[\u0E00-\u0E7F])?[)）]?)/;
function tagThai(root){walkText(root,/[\u0E00-\u0E7F]/,'.thx,.tq,style,script',function(v){return v.split(THR).map(function(x,i){return i%2?'<span class="thx">'+xesc(x)+'</span>':xesc(x);}).join('');});}
function rb(zh,jy){if(!jy)return zh;L(zh,jy);var s=String(jy).match(/[a-z]+[1-6]/g)||[],ch=Array.from(zh),n=ch.filter(function(c){return CJK.test(c);}).length;
 if(s.length!==n){console.warn('[rb] 粵拼數量唔對',zh,jy);return zh+'<span class="jy" style="font-size:11px"> '+jy+'</span>';}
 var i=0;return ch.map(function(c){return CJK.test(c)?'<ruby class="jr">'+c+'<rt data-j="'+s[i++]+'"></rt></ruby>':c;}).join('');}
function spk(zh){return '<button class="spk" data-t="'+esc(zh)+'" onclick="FS.sp(this.dataset.t)">🔊</button>';}
function ln(zh,jy,th){return '<div class="ln"><div><div class="zh sm">'+rb(zh,jy)+'</div><div class="th">'+th+'</div></div>'+spk(zh)+'</div>';}
function wc(a){var b=a[4]?'<div class="buy">'+rb('買法','maai5 faat3')+'：'+rb('一'+a[4]+a[0],'jat1 '+a[5]+' '+a[1])+'</div>':'';
 return '<div class="wc"><span class="em">'+a[3]+'</span><div class="m"><div class="zh sm">'+rb(a[0],a[1])+'</div><div class="th">'+a[2]+'</div>'+b+'</div>'+spk(a[0])+'</div>';}
function award(n){try{window.APP_AWARD(n);}catch(e){console.warn('[計分失敗]',e);}}

/* ══ 資料 ══ */
var PLACES=[['街市','gaai1 si5','ตลาดสด','🏬'],['菜檔','coi3 dong3','แผงผัก','🥬'],['豬肉檔','zyu1 juk6 dong3','แผงหมู','🐖'],['魚檔','jyu4 dong3','แผงปลา','🐟'],['超級市場','ciu1 kap1 si5 coeng4','ซูเปอร์มาร์เก็ต','🛒'],['雜貨舖','zaap6 fo3 pou3','ร้านขายของชำ','🏪'],['生果舖','saang1 gwo2 pou3','ร้านผลไม้','🍎'],['急凍舖','gap1 dung3 pou3','ร้านของแช่แข็ง','🧊']];
var DLG=[
 [0,'早晨！想買啲咩呀？','zou2 san4! soeng2 maai5 di1 me1 aa3?','อรุณสวัสดิ์! จะซื้ออะไรดีคะ'],
 [1,'菜心幾多錢一斤呀？','coi3 sam1 gei2 do1 cin2 jat1 gan1 aa3?','ฉ่อยซิมจินละเท่าไหร่คะ'],
 [0,'十五蚊一斤。','sap6 ng5 man1 jat1 gan1.','จินละ 15 ดอลลาร์'],
 [1,'咁俾我半斤，唔該。','gam3 bei2 ngo5 bun3 gan1, m4 goi1.','งั้นขอครึ่งจินค่ะ'],
 [0,'仲要啲乜嘢呀？','zung6 jiu3 di1 mat1 je5 aa3?','เอาอะไรอีกไหมคะ'],
 [1,'再要兩個蕃茄。','zoi3 jiu3 loeng5 go3 faan1 ke2.','ขอมะเขือเทศอีก 2 ลูก'],
 [0,'一共二十一個半。','jat1 gung6 ji6 sap6 jat1 go3 bun3.','รวมทั้งหมด 21.5 ดอลลาร์'],
 [1,'俾你一百蚊。','bei2 nei5 jat1 baak3 man1.','ให้คุณ 100 ดอลลาร์ค่ะ'],
 [0,'找你七十八個半。','zaau2 nei5 cat1 sap6 baat3 go3 bun3.','ทอน 78.5 ดอลลาร์'],
 [1,'唔該晒！','m4 goi1 saai3!','ขอบคุณมากค่ะ']];
var SAY=[['點賣呀？','dim2 maai6 aa3?','ขายยังไง / ราคาเท่าไหร่'],['平啲得唔得呀？','peng4 di1 dak1 m4 dak1 aa3?','ลดหน่อยได้ไหม'],['新唔新鮮呀？','san1 m4 san1 sin1 aa3?','สดไหม'],['要唔要袋呀？','jiu3 m4 jiu3 doi2 aa3?','เอาถุงไหม'],['唔使找喇。','m4 sai2 zaau2 laa3.','ไม่ต้องทอนแล้ว'],['唔該，要單。','m4 goi1, jiu3 daan1.','ขอใบเสร็จด้วย']];
var NOTES=[[10,'十蚊','sap6 man1','綠色','luk6 sik1','เขียว','#4f9d5d'],[20,'廿蚊','jaa6 man1','藍色','laam4 sik1','น้ำเงิน','#3b78c3'],[50,'五十蚊','ng5 sap6 man1','紫色','zi2 sik1','ม่วง','#7a4fa0'],[100,'一百蚊','jat1 baak3 man1','紅色','hung4 sik1','แดง','#c44536'],[500,'五百蚊','ng5 baak3 man1','啡色','fe1 sik1','น้ำตาล','#7b4a2d'],[1000,'一千蚊','jat1 cin1 man1','金色','gam1 sik1','ทอง','#c9971f']];
var SIL='#d9dcde',BRZ='#d3a766';
var COINS=[['$10','十蚊','sap6 man1','เหรียญ 2 สี วงนอกสีทอง ตรงกลางสีเงิน','radial-gradient(circle,'+SIL+' 52%,#c9a14a 54%)'],['$5','五蚊','ng5 man1','เหรียญสีเงิน ใหญ่รองจาก $10',SIL],['$2','兩蚊','loeng5 man1','เหรียญสีเงิน ขอบเป็นคลื่น',SIL],['$1','一蚊','jat1 man1','เหรียญสีเงิน เล็ก',SIL],['50¢','五毫','ng5 hou4','เหรียญสีทองแดง (50 เซนต์)',BRZ],['20¢','兩毫','loeng5 hou4','เหรียญสีทองแดง (20 เซนต์)',BRZ],['10¢','一毫','jat1 hou4','เหรียญสีทองแดง (10 เซนต์)',BRZ]];
var PRICE=[['$2.5','兩個半','loeng5 go3 bun3','2.5 ดอลลาร์ (สองดอลลาร์ครึ่ง)'],['$12.5','十二個半','sap6 ji6 go3 bun3','12.5 ดอลลาร์'],['$20','廿蚊','jaa6 man1','20 ดอลลาร์ (ก็พูดว่า 二十蚊 ได้)'],['$35.8','三十五個八','saam1 sap6 ng5 go3 baat3','35.8 ดอลลาร์'],['$105','一百零五蚊','jat1 baak3 ling4 ng5 man1','105 ดอลลาร์ (零 = ศูนย์ตรงกลาง)']];
var PAYS=[['💵','現金','jin6 gam1','เงินสด','我俾現金。','ngo5 bei2 jin6 gam1.','ฉันจ่ายเงินสด'],['💳','八達通','baat3 daat6 tung1','บัตร Octopus','可唔可以用八達通呀？','ho2 m4 ho2 ji5 jung6 baat3 daat6 tung1 aa3?','ใช้ Octopus ได้ไหม','有冇八達通呀？','jau5 mou5 baat3 daat6 tung1 aa3?','มี (รับ) Octopus ไหม'],['📱','電子支付','din6 zi2 zi1 fu6','จ่ายออนไลน์ (FPS/Alipay/WeChat)','有冇得掃碼呀？','jau5 mou5 dak1 sou3 maa5 aa3?','สแกน QR ได้ไหม'],['💳','信用卡','seon3 jung6 kaat1','บัตรเครดิต','可唔可以碌卡呀？','ho2 m4 ho2 ji5 luk1 kaat1 aa3?','รูดบัตรได้ไหม']];
// 蔬菜：[中文,粵拼,泰文,emoji,買法量詞,量詞粵拼]
var VEG=[['白菜','baak6 coi3','ผักกาดขาว','🥬','棵','fo1'],['菜心','coi3 sam1','ฉ่อยซิม (ผักกวางตุ้ง)','🥬','斤','gan1'],['芥蘭','gaai3 laan2','คะน้า','🥬','斤','gan1'],['生菜','saang1 coi3','ผักกาดหอม','🥬','棵','fo1'],['西蘭花','sai1 laan4 faa1','บรอกโคลี','🥦','個','go3'],['椰菜','je4 coi3','กะหล่ำปลี','🥬','個','go3'],['蕃茄','faan1 ke2','มะเขือเทศ','🍅','個','go3'],['薯仔','syu4 zai2','มันฝรั่ง','🥔','個','go3'],['洋蔥','joeng4 cung1','หอมใหญ่','🧅','個','go3'],['蒜頭','syun3 tau4','กระเทียม','🧄','個','go3'],['薑','goeng1','ขิง','🌿','嚿','gau6'],['蔥','cung1','ต้นหอม','🌿','紮','zaat3'],['青椒','ceng1 ziu1','พริกหยวก','🫑','個','go3'],['辣椒','laat6 ziu1','พริกขี้หนู/พริกแดง','🌶️','條','tiu4'],['紅蘿蔔','hung4 lo4 baak6','แครอท','🥕','條','tiu4'],['青瓜','ceng1 gwaa1','แตงกวา','🥒','條','tiu4'],['冬瓜','dung1 gwaa1','ฟักเขียว','🥒','斤','gan1'],['粟米','suk1 mai5','ข้าวโพด','🌽','條','tiu4'],['冬菇','dung1 gu1','เห็ดหอม','🍄','朵','do2'],['豆腐','dau6 fu6','เต้าหู้','⬜','嚿','gau6']];
var VSAY=[['菜心點賣呀？','coi3 sam1 dim2 maai6 aa3?','ฉ่อยซิมขายยังไง'],['俾我半斤菜。','bei2 ngo5 bun3 gan1 coi3.','ขอผักครึ่งจิน'],['俾半斤菜我。','bei2 bun3 gan1 coi3 ngo5.','ขอผักครึ่งจิน (อีกสำนวนหนึ่ง)'],['俾我一斤菜。','bei2 ngo5 jat1 gan1 coi3.','ขอผัก 1 จิน'],['俾一斤菜我。','bei2 jat1 gan1 coi3 ngo5.','ขอผัก 1 จิน (อีกสำนวนหนึ่ง)'],['呢啲菜靚唔靚呀？','ni1 di1 coi3 leng3 m4 leng3 aa3?','ผักพวกนี้สวยไหม'],['幫我揀靚啲嘅。','bong1 ngo5 gaan2 leng3 di1 ge3.','ช่วยเลือกอันสวยๆ ให้หน่อย']];

var FISH=[['石斑','sek6 baan1','ปลาเก๋า','🐟','條','tiu4'],['鱸魚','lou4 jyu2','ปลากะพง','🐟','條','tiu4'],['鯇魚','waan5 jyu2','ปลาเฉา','🐟','條','tiu4'],['三文魚','saam1 man4 jyu2','แซลมอน','🍣','塊','faai3'],['蝦','haa1','กุ้ง','🦐','斤','gan1'],['蟹','haai5','ปู','🦀','隻','zek3'],['花甲','faa1 gaap3','หอยตลับ','🐚','斤','gan1'],['帶子','daai3 zi2','หอยเชลล์','🐚','隻','zek3'],['魷魚','jau4 jyu2','หมึก','🦑','隻','zek3'],['生蠔','saang1 hou4','หอยนางรม','🦪','隻','zek3']];
var FSAY=[['條魚幾多錢呀？','tiu4 jyu2 gei2 do1 cin2 aa3?','ปลาตัวนี้ราคาเท่าไหร่'],['呢啲蝦生唔生猛㗎？','ni1 di1 haa1 saang1 m4 saang1 maang5 gaa3?','กุ้งพวกนี้ยังสดเป็นๆ ไหม'],['幫我劏埋條魚，唔該。','bong1 ngo5 tong1 maai4 tiu4 jyu2, m4 goi1.','ช่วยขอดเกล็ดควักไส้ปลาให้ด้วย'],['斬件，唔該。','zaam2 gin6, m4 goi1.','ช่วยสับเป็นชิ้น']];
var FRUIT=[['蘋果','ping4 gwo2','แอปเปิล','🍎','個','go3'],['橙','caang2','ส้ม','🍊','個','go3'],['香蕉','hoeng1 ziu1','กล้วย','🍌','梳','so1'],['提子','tai4 zi2','องุ่น','🍇','斤','gan1'],['西瓜','sai1 gwaa1','แตงโม','🍉','個','go3'],['芒果','mong1 gwo2','มะม่วง','🥭','個','go3'],['奇異果','kei4 ji6 gwo2','กีวี','🥝','個','go3'],['士多啤梨','si6 do1 be1 lei2','สตรอว์เบอร์รี','🍓','盒','hap6'],['檸檬','ning4 mung1','มะนาวเหลือง','🍋','個','go3'],['火龍果','fo2 lung4 gwo2','แก้วมังกร','🟣','個','go3'],['荔枝','lai6 zi1','ลิ้นจี่','🍒','斤','gan1'],['菠蘿','bo1 lo4','สับปะรด','🍍','個','go3']];
var FRSAY=[['呢個熟唔熟呀？','ni1 go3 suk6 m4 suk6 aa3?','ลูกนี้สุกไหม'],['可唔可以試食呀？','ho2 m4 ho2 ji5 si3 sik6 aa3?','ขอชิมได้ไหม'],['幫我揀甜啲嘅。','bong1 ngo5 gaan2 tim4 di1 ge3.','ช่วยเลือกอันที่หวานๆ ให้หน่อย'],['酸唔酸㗎？','syun1 m4 syun1 gaa3?','เปรี้ยวไหม']];
var GROC=[['米','mai5','ข้าวสาร','🍚','包','baau1'],['油','jau4','น้ำมัน','🛢️','支','zi1'],['鹽','jim4','เกลือ','🧂','包','baau1'],['糖','tong2','น้ำตาล','🧂','包','baau1'],['豉油','si6 jau4','ซีอิ๊ว','🍶','支','zi1'],['蠔油','hou4 jau4','ซอสหอยนางรม','🍶','支','zi1'],['醋','cou3','น้ำส้มสายชู','🍶','支','zi1'],['麻油','maa4 jau4','น้ำมันงา','🍶','支','zi1'],['雞蛋','gai1 daan2','ไข่ไก่','🥚','盒','hap6'],['罐頭','gun3 tau2','อาหารกระป๋อง','🥫','個','go3'],['米粉','mai5 fan2','เส้นหมี่ข้าว','🍜','包','baau1'],['紙巾','zi2 gan1','กระดาษทิชชู่','🧻','包','baau1']];
var GRSAY=[['豉油喺邊度呀？','si6 jau4 hai2 bin1 dou6 aa3?','ซีอิ๊วอยู่ตรงไหน'],['有冇鹽呀？','jau5 mou5 jim4 aa3?','มีเกลือไหม'],['呢個牌子好唔好呀？','ni1 go3 paai4 zi2 hou2 m4 hou2 aa3?','ยี่ห้อนี้ดีไหม']];
var FRZ=[['雞翼','gai1 jik6','ปีกไก่','🍗','隻','zek3'],['雞髀','gai1 bei2','น่องไก่/ขาไก่','🍗','隻','zek3'],['牛腩','ngau4 naam5','เนื้อวัวส่วนสามชั้น','🥩','斤','gan1'],['牛扒','ngau4 paa2','สเต็กเนื้อ','🥩','塊','faai3'],['魚柳','jyu2 lau5','เนื้อปลาแล่','🐟','塊','faai3'],['蝦仁','haa1 jan4','กุ้งปอกเปลือก','🦐','包','baau1'],['魚蛋','jyu4 daan2','ลูกชิ้นปลา','🍢','包','baau1'],['牛丸','ngau4 jyun2','ลูกชิ้นเนื้อ','🍢','包','baau1'],['餃子','gaau2 zi2','เกี๊ยว','🥟','包','baau1'],['薯條','syu4 tiu2','เฟรนช์ฟรายส์','🍟','包','baau1'],['雪糕','syut3 gou1','ไอศกรีม','🍨','盒','hap6'],['雜菜','zaap6 coi3','ผักรวมแช่แข็ง','🥦','包','baau1']];
var FZSAY=[['呢啲係急凍嘅？','ni1 di1 haai6 gap1 dung3 ge3?','พวกนี้เป็นของแช่แข็งใช่ไหม'],['要解凍先煮。','jiu3 gaai2 dung3 sin1 zyu2.','ต้องละลายก่อนค่อยทำอาหาร'],['去到幾時過期呀？','heoi3 dou3 gei2 si4 gwo3 kei4 aa3?','หมดอายุเมื่อไหร่']];
var ALL=[];[VEG,FISH,FRUIT,GROC,FRZ].forEach(function(a){a.forEach(function(x){if(!ALL.some(function(y){return y[0]===x[0];}))ALL.push(x);});});

// 豬部位：字母對應圖中位置
var CUTS={A:['豬頭','zyu1 tau4','หัวหมู','滷水','ตุ๋นน้ำซอส (ลู่สุ่ย)'],B:['豬頸肉','zyu1 geng2 juk6','คอหมู','炒、燒','ผัด ย่าง'],C:['梅頭','mui4 tau4','ไหล่หมู (ส่วนบน)','叉燒、炒','ทำหมูแดง ผัด'],D:['脊肉','zik3 juk6','สันนอก','豬扒、炒','หมูชิ้นหนาทอด/ย่าง (豬扒) ผัด'],E:['豬柳','zyu1 lau5','สันใน','炒、炸、切絲','ผัด ทอด หั่นเส้น'],F:['腩肉','naam5 juk6','หมูสามชั้น','燒腩仔、炆','ย่างกรอบ เคี่ยวนุ่ม'],G:['豬手','zyu1 sau2','ขาหน้า','滷水、燉湯','ตุ๋นน้ำซอส ต้มซุป'],H:['豬髀','zyu1 bei2','สะโพก/ขาหลัง','切片、炒、煮湯','หั่นแผ่น ผัด ต้มซุป'],I:['豬展','zyu1 zin2','น่องหมู (ส่วนเอ็นแน่น)','滷水、煲湯','ตุ๋นน้ำซอส ต้มซุป'],J:['豬腳','zyu1 goek3','ตีนหมู','豬腳薑、燜','ตุ๋นขิงน้ำส้ม เคี่ยวนุ่ม']};
var HS=[['A',18.5,45.3,8.2,14],['B',26,38.4,7.5,19.8],['C',23.3,19.8,14.4,20.9],['D',37.7,9.3,32.9,22.1],['E',60.5,23.3,13.4,10.5],['F',42.5,38.4,27.4,22.1],['G',33.6,43,7.5,23.3],['H',73.7,17.4,13.3,37.2],['I',74,57,8.9,12.8],['J',28.8,81.4,16.4,11.6],['J',62,80.2,20.5,14]];
var PORK=[['排骨','paai4 gwat1','ซี่โครงหมู','🍖'],['豬骨','zyu1 gwat1','กระดูกหมู (เอาไปต้มซุป)','🦴'],['豬肉碎','zyu1 juk6 seoi3','หมูบด','🥩'],['瘦肉','sau3 juk6','เนื้อแดง (ไม่ติดมัน)','🥩'],['肥肉','fei4 juk6','มันหมู','🥓'],['豬潤','zyu1 jeon2','ตับหมู','🟤'],['豬腰','zyu1 jiu1','ไตหมู','🟤'],['豬肚','zyu1 tou5','กระเพาะหมู','🟤'],['豬紅','zyu1 hung4','เลือดหมู','🟥'],['豬脷','zyu1 lei6','ลิ้นหมู','🟤']];
var PSAY=[['俾我一斤排骨，斬細舊啲。','bei2 ngo5 jat1 gan1 paai4 gwat1, zaam2 sai3 gau6 di1.','ขอซี่โครงหมู 1 จิน สับชิ้นเล็กๆ'],['呢塊肉切片，唔該。','ni1 faai3 juk6 cit3 pin2, m4 goi1.','เนื้อชิ้นนี้ช่วยหั่นเป็นแผ่น'],['幫我絞碎，要瘦啲嘅。','bong1 ngo5 gaau2 seoi3, jiu3 sau3 di1 ge3.','ช่วยบดให้ ขอส่วนที่แดงๆ']];
// 家常菜：tokens = [字,粵拼,泰文,角色]；角色 s調味 g配料 h煮法 m主料
var R={s:['#9333ea','調味','tiu4 mei6'],g:['#16a34a','配料','pui3 liu2'],h:['#dc2626','煮法','zyu2 faat3'],m:['#ca8a04','主料','zyu2 liu2']};
var DISH=[
 ['🍖','ซี่โครงหมูนึ่งเต้าซี่พริก',[['豉','si6','ถั่วเหลืองดำหมัก','s'],['椒','ziu1','พริก','g'],['蒸','zing1','นึ่ง','h'],['排骨','paai4 gwat1','ซี่โครงหมู','m']]],
 ['🐚','หอยตลับผัดเต้าซี่พริก',[['豉','si6','ถั่วเหลืองดำหมัก','s'],['椒','ziu1','พริก','g'],['炒','caau2','ผัด','h'],['花甲','faa1 gaap3','หอยตลับ','m']]],
 ['🍅','ไข่ผัดมะเขือเทศ',[['蕃茄','faan1 ke2','มะเขือเทศ','g'],['炒','caau2','ผัด','h'],['蛋','daan2','ไข่','m']]],
 ['🥬','ฉ่อยซิมผัดกระเทียม',[['蒜蓉','syun3 jung4','กระเทียมสับ','s'],['炒','caau2','ผัด','h'],['菜心','coi3 sam1','ฉ่อยซิม','m']]],
 ['🐟','ปลานึ่งซีอิ๊ว (นึ่งธรรมดา)',[['清','cing1','เรียบๆ ปรุงน้อย','s'],['蒸','zing1','นึ่ง','h'],['魚','jyu2','ปลา','m']]],
 ['🥚','ไข่ตุ๋น',[['蒸','zing1','นึ่ง','h'],['水蛋','seoi2 daan2','ไข่ผสมน้ำ','m']]],
 ['🫑','เนื้อวัวผัดพริกหยวก',[['青椒','ceng1 ziu1','พริกหยวก','g'],['炒','caau2','ผัด','h'],['牛肉','ngau4 juk6','เนื้อวัว','m']]],
 ['🍲','หัวไชเท้าตุ๋นเนื้อวัว (ใส่หม้อ)',[['蘿蔔','lo4 baak6','หัวไชเท้า','g'],['牛腩','ngau4 naam5','เนื้อวัวส่วนสามชั้น','m'],['煲','bou1','ตุ๋น/เคี่ยวในหม้อ','h']]],
 ['🦐','กุ้งลวก',[['白灼','baak6 coek3','ลวกน้ำร้อน','h'],['蝦','haa1','กุ้ง','m']]]];
var METH=[['蒸','zing1','นึ่ง'],['炒','caau2','ผัด'],['煎','zin1','ทอดกระทะ (น้ำมันน้อย)'],['炸','zaa3','ทอดน้ำมันท่วม'],['白灼','baak6 coek3','ลวก'],['煲','bou1','ต้ม/เคี่ยวในหม้อ'],['燜','mun6','ตุ๋นจนเปื่อย']];
var BM=[['蒸','zing1','นึ่ง'],['炒','caau2','ผัด']],BX=[['排骨','paai4 gwat1','ซี่โครงหมู'],['花甲','faa1 gaap3','หอยตลับ'],['魚','jyu2','ปลา'],['牛肉','ngau4 juk6','เนื้อวัว'],['雞','gai1','ไก่']];

/* ── 共用 ── */
function tkHtml(T){return '<div class="tks">'+T.map(function(t){var r=R[t[3]];return '<div class="tk" style="border-color:'+r[0]+'"><div class="tk-r" style="color:'+r[0]+'">'+r[1]+'</div><div class="tk-c">'+rb(t[0],t[1])+'</div><div class="tk-t">'+t[2]+'</div></div>';}).join('')+'</div>';}
function dishInfo(d){var T=d[2];return {zh:T.map(function(t){return t[0];}).join(''),jy:T.map(function(t){return t[1];}).join(' '),th:d[1]};}

/* ══ 落街買餸 ══ */
function renderShop(){
 var h='<div class="sec">🏪 去邊度買餸？</div><div class="wg">'+PLACES.map(wc).join('')+'</div>';
 h+='<div class="sec">💬 街市菜檔對話</div><div class="card">'+DLG.map(function(d){return '<div class="dl'+(d[0]?' me':'')+'"><div class="bub"><div class="who">'+(d[0]?'我':'店員')+'</div><div class="r"><div><div class="zh sm">'+rb(d[1],d[2])+'</div><div class="th">'+d[3]+'</div></div>'+spk(d[1])+'</div></div></div>';}).join('')+'</div>';
 h+='<div class="sec">⚖️ 斤同兩</div><div class="card"><div class="tip"><div class="tip-t">'+rb('斤','gan1')+' ＝ '+rb('十六兩','sap6 luk6 loeng2')+'</div><div class="note">1 斤 ≈ 600 กรัม · 1 兩 ≈ 37.5 กรัม · 半斤 ＝ 八兩 ≈ 300 กรัม</div>'
  +ln('一斤','jat1 gan1','1 จิน (ประมาณ 600 กรัม)')+ln('半斤','bun3 gan1','ครึ่งจิน (8 兩)')+ln('四兩','sei3 loeng2','4 兩 (ประมาณ 150 กรัม)')+'</div>'
  +'<div class="tip"><div class="tip-t">數嘢用量詞（睇「量詞」頁）</div><div class="note">ผักบางอย่างขายเป็นจิน บางอย่างนับเป็นลูก/ต้น/เส้น — ดูหน้า 菜檔 ว่าแต่ละอย่างนับยังไง</div></div></div>';
 h+='<div class="sec">🗣️ 買餸常用句</div><div class="card">'+SAY.map(function(a){return ln(a[0],a[1],a[2]);}).join('')+'</div>';
 $('p-shop').innerHTML=h;}

/* ══ 紙幣硬幣 ══ */
function renderMoney(){
 var h='<div class="sec">📄 紙幣（กี่สี กี่ดอลลาร์）</div><div class="card">'+NOTES.map(function(n){return '<div class="mr"><div class="nt" style="background:'+n[6]+'">$'+n[0]+'</div><div class="m"><div class="zh sm">'+rb(n[1],n[2])+'</div><div>'+rb(n[3],n[4])+'</div><div class="th">สี'+n[5]+'</div></div>'+spk(n[1])+'</div>';}).join('')
  +'<div class="note" style="margin-top:8px">💡 $20 เป็นสีน้ำเงิน $50 สีม่วง — ดูสีก่อน แล้วค่อยดูตัวเลข</div></div>';
 h+='<div class="sec">🪙 硬幣</div><div class="card">'+COINS.map(function(c){return '<div class="mr"><div class="coin" style="background:'+c[4]+'">'+c[0]+'</div><div class="m"><div class="zh sm">'+rb(c[1],c[2])+'</div><div class="th">'+c[3]+'</div></div>'+spk(c[1])+'</div>';}).join('')+'</div>';
 h+='<div class="sec">🧮 點樣讀價錢</div><div class="card"><div class="tip"><div class="tip-t">'+rb('蚊','man1')+' ＝ 元（ดอลลาร์） · '+rb('毫','hou4')+' ＝ 10 เซนต์</div><div class="note">ราคาเต็ม ใช้ 蚊 เช่น 廿蚊 一百蚊 · ถ้ามีเศษ ภาษาพูดใช้ 個 แทน 蚊 แล้วตามด้วยเลขเศษ: 12.5 → 十二個半 (半 = .5) · 35.8 → 三十五個八</div></div>'
  +PRICE.map(function(p){return '<div class="ln"><div><div class="zh sm">'+p[0]+' ＝ '+rb(p[1],p[2])+'</div><div class="th">'+p[3]+'</div></div>'+spk(p[1])+'</div>';}).join('')+'</div>';
 h+='<div class="sec">💳 付款方法</div>'+PAYS.map(function(p){return '<div class="card"><div style="display:flex;gap:10px;align-items:center"><span style="font-size:28px">'+p[0]+'</span><div><div class="zh sm">'+rb(p[1],p[2])+'</div><div class="th">'+p[3]+'</div></div></div>'+ln(p[4],p[5],p[6])+(p[7]?ln(p[7],p[8],p[9]):'')+'</div>';}).join('')
  +'<div class="tips-b">💡 บางแผงในตลาดรับเฉพาะเงินสดหรือบางช่องทาง — ถามก่อนจ่ายนะ：「'+rb('可唔可以用八達通呀？','ho2 m4 ho2 ji5 jung6 baat3 daat6 tung1 aa3')+'」<button class="spk" style="margin-left:6px" data-t="可唔可以用八達通呀？" onclick="FS.sp(this.dataset.t)">🔊</button></div>';
 $('p-money').innerHTML=h;}

/* ══ 菜檔 ══ */
function renderStall(k,t,items,say){$('p-'+k).innerHTML='<div class="sec">'+t+'</div><div class="note" style="margin-bottom:8px">黃色格仔＝買法（量詞）。ตัวอย่างวิธีซื้อ เช่น 一斤菜心、一個蕃茄</div><div class="wg">'+items.map(wc).join('')+'</div><div class="sec">🗣️ 點講</div><div class="card">'+say.map(function(a){return ln(a[0],a[1],a[2]);}).join('')+'</div>';}
function renderVeg(){renderStall('veg','🥬 菜檔有咩買？（撳🔊聽）',VEG,VSAY);}
function renderFish(){renderStall('fish','🐟 魚檔有咩買？',FISH,FSAY);}
function renderFruit(){renderStall('fruit','🍎 生果舖有咩買？',FRUIT,FRSAY);}
function renderGroc(){renderStall('groc','🏪 雜貨舖有咩買？',GROC,GRSAY);}
function renderFrz(){renderStall('frz','🧊 急凍舖有咩買？',FRZ,FZSAY);}

/* ══ 豬肉檔 ══ */
var P={sel:'D'};
function mapHtml(fn,cls){return '<div class="map"><img src="'+PORK_IMG+'" alt="豬嘅部位">'+HS.map(function(h){return '<button class="hs'+(cls(h[0])||'')+'" style="left:'+h[1]+'%;top:'+h[2]+'%;width:'+h[3]+'%;height:'+h[4]+'%" onclick="FS.'+fn+'(\''+h[0]+'\')" aria-label="'+h[0]+'"></button>';}).join('')+'</div>';}
function pkDraw(){
 var c=CUTS[P.sel];
 $('pk-map').innerHTML=mapHtml('cut',function(l){return l===P.sel?' on':'';});
 $('pk-pn').innerHTML='<div class="card pn"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px"><div><span class="lt">'+P.sel+'</span><span class="big">'+rb(c[0],c[1])+'</span><div class="th">'+c[2]+'</div></div>'+spk(c[0])+'</div><div class="tips-b">🍳 常見煮法：'+c[3]+'<br><span class="note" style="color:inherit">'+c[4]+'</span></div></div>'
  +'<div class="chips">'+Object.keys(CUTS).map(function(l){return '<button class="chip'+(l===P.sel?' act':'')+'" onclick="FS.cut(\''+l+'\')">'+l+' '+CUTS[l][0]+'</button>';}).join('')+'</div>';}
function renderPork(){
 $('p-pork').innerHTML='<div class="sec">🐖 豬嘅部位（撳圖中位置）</div><div id="pk-map"></div><div id="pk-pn"></div>'
  +'<div class="note" style="margin-top:8px">ชื่อส่วนต่างๆ เป็นการเรียกที่พบบ่อยในฮ่องกง ตำแหน่งในภาพเป็นแบบคร่าวๆ — แต่ละร้านอาจแล่ไม่เหมือนกัน</div>'
  +'<div class="sec">🥩 豬肉檔仲有咩買？</div><div class="wg">'+PORK.map(wc).join('')+'</div>'
  +'<div class="sec">🗣️ 喺豬肉檔點講</div><div class="card">'+PSAY.map(function(a){return ln(a[0],a[1],a[2]);}).join('')+'<div class="note" style="margin-top:8px">'+rb('斬件','zaam2 gin6')+' = สับเป็นชิ้น · '+rb('切片','cit3 pin2')+' = หั่นแผ่น · '+rb('切絲','cit3 si1')+' = หั่นเส้น · '+rb('絞碎','gaau2 seoi3')+' = บด</div></div>';
 pkDraw();}

/* ══ 家常菜 ══ */
var D={open:0,m:0,x:0,mo:-1};
var MTH=[
['蒸','zing1','นึ่ง','m','ใช้ไอน้ำทำให้สุก รสเบา ได้รสธรรมชาติของวัตถุดิบ',[['清蒸石斑','cing1 zing1 sek6 baan1','ปลาเก๋านึ่งซีอิ๊ว'],['蒸水蛋','zing1 seoi2 daan2','ไข่นึ่ง'],['蒸排骨','zing1 paai4 gwat1','ซี่โครงหมูนึ่ง']]],
['炒','caau2','ผัด','m','ไฟแรง น้ำมันน้อย ทำเร็ว',[['蕃茄炒蛋','faan1 ke2 caau2 daan2','ไข่ผัดมะเขือเทศ'],['青椒炒牛肉','ceng1 ziu1 caau2 ngau4 juk6','เนื้อผัดพริกหยวก'],['蒜蓉炒菜心','syun3 jung4 caau2 coi3 sam1','ฉ่อยซิมผัดกระเทียม']]],
['煎','zin1','ทอดกระทะ','m','ใช้น้ำมันน้อย ทอดสองหน้าจนเหลือง',[['煎蛋','zin1 daan2','ไข่ดาว/ไข่เจียว'],['煎豬扒','zin1 zyu1 paa2','หมูชิ้นหนาทอดกระทะ'],['煎魚','zin1 jyu2','ปลาทอดกระทะ']]],
['炸','zaa3','ทอดน้ำมันท่วม','m','จุ่มในน้ำมันมากๆ กรอบนอก',[['炸雞翼','zaa3 gai1 jik6','ปีกไก่ทอด'],['炸豬扒','zaa3 zyu1 paa2','หมูชุบเกล็ดขนมปังทอด'],['炸魚柳','zaa3 jyu2 lau5','เนื้อปลาชุบแป้งทอด']]],
['白灼','baak6 coek3','ลวก','m','ลวกในน้ำร้อน จิ้มซอสซีอิ๊ว',[['白灼蝦','baak6 coek3 haa1','กุ้งลวก'],['白灼菜心','baak6 coek3 coi3 sam1','ฉ่อยซิมลวก'],['白灼魷魚','baak6 coek3 jau4 jyu2','หมึกลวก']]],
['煲','bou1','ตุ๋น/เคี่ยวในหม้อ','m','ปรุงในหม้อดินหรือหม้อ มีน้ำขลุกขลิก เสิร์ฟร้อนๆ',[['雞煲','gai1 bou1','หม้อไฟไก่'],['蘿蔔牛腩煲','lo4 baak6 ngau4 naam5 bou1','หัวไชเท้าตุ๋นเนื้อวัว'],['魚頭豆腐煲','jyu4 tau4 dau6 fu6 bou1','หัวปลาตุ๋นเต้าหู้']]],
['燜','mun6','ตุ๋นจนเปื่อย','m','ปิดฝาไฟอ่อน ตุ๋นนานจนนุ่ม',[['冬菇燜雞','dung1 gu1 mun6 gai1','ไก่ตุ๋นเห็ดหอม'],['燜豬腳','mun6 zyu1 goek3','ตีนหมูตุ๋น']]],
['紅燒','hung4 siu1','ตุ๋นซีอิ๊วเข้ม','f','ใช้ซีอิ๊วกับน้ำตาล ได้สีน้ำตาลแดง รสเข้มข้น',[['紅燒豆腐','hung4 siu1 dau6 fu6','เต้าหู้ตุ๋นซีอิ๊ว'],['紅燒肉','hung4 siu1 juk6','หมูสามชั้นตุ๋นซีอิ๊ว'],['紅燒乳鴿','hung4 siu1 jyu5 gaap3','นกพิราบทอดซอสแดง']]],
['清蒸','cing1 zing1','นึ่งแบบเรียบๆ','f','นึ่งแล้วราดซีอิ๊ว ใส่ขิงต้นหอม รสสะอาด',[['清蒸石斑','cing1 zing1 sek6 baan1','ปลาเก๋านึ่งซีอิ๊ว'],['清蒸鱸魚','cing1 zing1 lou4 jyu2','ปลากะพงนึ่งซีอิ๊ว']]],
['酸甜／咕嚕','syun1 tim4 / gu1 lou1','เปรี้ยวหวาน','f','ชุบแป้งทอด แล้วคลุกซอสเปรี้ยวหวาน (มักใส่สับปะรด)',[['咕嚕肉','gu1 lou1 juk6','หมูเปรี้ยวหวาน'],['酸甜排骨','syun1 tim4 paai4 gwat1','ซี่โครงหมูเปรี้ยวหวาน'],['咕嚕雞球','gu1 lou1 gai1 kau4','ไก่เปรี้ยวหวาน']]],
['椒鹽','ziu1 jim4','เกลือพริกไทย','f','ทอดกรอบ แล้วคลุกเกลือ พริก กระเทียมเจียว',[['椒鹽排骨','ziu1 jim4 paai4 gwat1','ซี่โครงหมูทอดเกลือพริกไทย'],['椒鹽魷魚','ziu1 jim4 jau4 jyu2','หมึกทอดเกลือพริกไทย'],['椒鹽豆腐','ziu1 jim4 dau6 fu6','เต้าหู้ทอดเกลือพริกไทย']]],
['薑蔥','goeng1 cung1','ขิงกับต้นหอม','f','ใช้ขิงและต้นหอมเป็นเครื่องปรุงหลัก ดับกลิ่นคาว',[['薑蔥炒蟹','goeng1 cung1 caau2 haai5','ปูผัดขิงต้นหอม'],['薑蔥雞','goeng1 cung1 gai1','ไก่ราดซอสขิงต้นหอม']]],
['咖喱','gaa3 lei1','แกงกะหรี่','f','แกงกะหรี่แบบฮ่องกง ข้นหอม เผ็ดน้อย กินกับข้าว',[['咖喱牛腩','gaa3 lei1 ngau4 naam5','เนื้อวัวตุ๋นแกงกะหรี่'],['咖喱雞','gaa3 lei1 gai1','ไก่แกงกะหรี่'],['咖喱魚蛋','gaa3 lei1 jyu4 daan2','ลูกชิ้นปลาแกงกะหรี่']]],
['豉汁','si6 zap1','ซอสเต้าซี่','f','ใช้ถั่วดำหมัก (豆豉) เป็นซอส รสเค็มหอม',[['豉汁蒸排骨','si6 zap1 zing1 paai4 gwat1','ซี่โครงหมูนึ่งเต้าซี่'],['豉汁蒸鳳爪','si6 zap1 zing1 fung6 zaau2','ตีนไก่นึ่งเต้าซี่'],['豉椒炒花甲','si6 ziu1 caau2 faa1 gaap3','หอยตลับผัดเต้าซี่พริก']]],
['滷水','luk6 seoi2','ตุ๋นน้ำลู่สุ่ย','f','ตุ๋นในน้ำซอสสมุนไพรและซีอิ๊ว กินแบบเย็นหรืออุ่น',[['滷水鵝','luk6 seoi2 ngo2','ห่านตุ๋นน้ำลู่สุ่ย'],['滷水豬展','luk6 seoi2 zyu1 zin2','น่องหมูตุ๋นน้ำลู่สุ่ย']]]];
function mthHtml(){var out='',g={m:'🔥 煮法（點煮）',f:'🧂 味型／做法（點調味）'};['m','f'].forEach(function(k){out+='<div class="sec">'+g[k]+'<span class="note" style="font-weight:400;margin-left:6px">撳開睇常見餸名</span></div>';MTH.forEach(function(m,i){if(m[3]!==k)return;out+='<div class="cc'+(D.mo===i?' open':'')+'"><div class="cc-h" onclick="FS.mtog('+i+')"><div class="cc-m"><div class="zh sm">'+rb(m[0],m[1])+'</div><div class="th">'+m[2]+'</div></div><span class="chev">›</span></div><div class="cc-b"><div class="note">'+m[4]+'</div>'+m[5].map(function(e){return ln(e[0],e[1],e[2]);}).join('')+'</div></div>';});});return out;}
function renderDish(){
 var d0=dishInfo(DISH[0]),d1=dishInfo(DISH[1]);
 var h='<div class="sec">🔍 豉椒蒸排骨，咩嚟㗎？</div><div class="card"><div class="note">สูตรชื่ออาหาร: 調味/配料 + 煮法 + 主料 (เครื่องปรุง/เครื่องเคียง + วิธีทำ + วัตถุดิบหลัก)</div>'+tkHtml(DISH[0][2])
  +'<div class="ln"><div><div class="zh">'+rb(d0.zh,d0.jy)+'</div><div class="th">'+d0.th+'</div></div>'+spk(d0.zh)+'</div>'
  +'<div style="margin-top:10px"><div class="tip"><div class="tip-t">'+rb('豉','si6')+' ＝ '+rb('豆豉','dau6 si6')+'</div><div class="note">ถั่วเหลืองหมักสีดำ รสเค็มหอม (เต้าซี่) — ใช้เป็นเครื่องปรุง</div></div>'
  +'<div class="tip"><div class="tip-t">'+rb('椒','ziu1')+' ＝ '+rb('辣椒／青椒','laat6 ziu1 ceng1 ziu1')+'</div><div class="note">พริก — ในจานนี้ใช้พริกแดง/เขียวหั่นชิ้น (ไม่ใช่พริกไทย ซึ่งคือ '+rb('胡椒','wu4 ziu1')+')</div></div>'
  +'<div class="tip"><div class="tip-t">'+rb('蒸','zing1')+' ＝ '+rb('煮法','zyu2 faat3')+'（วิธีทำ）</div><div class="note">นึ่งด้วยไอน้ำ — ดูว่าท้ายชื่อจานคืออะไร ก็รู้ว่าวัตถุดิบหลักคือ 排骨</div></div></div></div>';
 h+='<div class="sec">🔁 換煮法、換主料</div><div class="card"><div class="note">ใช้ 豉椒 เหมือนเดิม เปลี่ยนวิธีทำและวัตถุดิบ — ลองเลือกดู</div>'
  +'<div class="row-l">煮法</div><div class="chips">'+BM.map(function(a,i){return '<button class="chip'+(i===D.m?' act':'')+'" onclick="FS.bm('+i+')">'+a[0]+' '+a[2]+'</button>';}).join('')+'</div>'
  +'<div class="row-l">主料</div><div class="chips">'+BX.map(function(a,i){return '<button class="chip'+(i===D.x?' act':'')+'" onclick="FS.bx('+i+')">'+a[0]+' '+a[2]+'</button>';}).join('')+'</div><div id="ds-out"></div></div>';
 h+='<div class="sec">🍲 香港家常菜（撳開睇拆解）</div>'+DISH.map(function(d,i){var f=dishInfo(d);return '<div class="cc'+(D.open===i?' open':'')+'"><div class="cc-h" onclick="FS.dtog('+i+')"><span class="cc-e">'+d[0]+'</span><div class="cc-m"><div class="zh sm">'+rb(f.zh,f.jy)+'</div><div class="th">'+f.th+'</div></div><span class="chev">›</span></div><div class="cc-b">'+tkHtml(d[2])+'<div style="text-align:right">'+spk(f.zh)+'</div></div></div>';}).join('');
 h+=mthHtml();
 $('p-dish').innerHTML=h;dsDraw();}
function dsDraw(){var m=BM[D.m],x=BX[D.x],zh='豉椒'+m[0]+x[0];
 $('ds-out').innerHTML='<div class="out"><div class="zh">'+rb(zh,'si6 ziu1 '+m[1]+' '+x[1])+'</div><div class="th">'+x[2]+m[2]+'เต้าซี่พริก</div><div style="text-align:right">'+spk(zh)+'</div></div>';}

/* ══ 練習 ══ */
var Q=null,QN=8;
function numZh(n){var d='零一二三四五六七八九';if(n<10)return n===2?'兩':d[n];if(n<20)return '十'+(n%10?d[n%10]:'');return d[Math.floor(n/10)]+'十'+(n%10?d[n%10]:'');}
var DJ=['ling4','jat1','ji6','saam1','sei3','ng5','luk6','cat1','baat3','gau2'];
function numJy(n){if(n<10)return n===2?'loeng5':DJ[n];if(n<20)return 'sap6'+(n%10?' '+DJ[n%10]:'');return DJ[Math.floor(n/10)]+' sap6'+(n%10?' '+DJ[n%10]:'');}
function priceZh(p){var i=Math.floor(p);return p%1?numZh(i)+'個半':numZh(i)+'蚊';}
function priceJy(p){var i=Math.floor(p);return numJy(i)+(p%1?' go3 bun3':' man1');}
function qNew(){Q={i:0,score:0,fb:'',done:false,pickd:null,q:null,t:['chg','cut','dish','veg','chg','cut','dish','veg']};qGen();}
function qGen(){var t=Q.t[Q.i],q={t:t};Q.fb='';Q.pickd=null;
 if(t==='chg'){var pr=rand(40)+3+(rand(2)?.5:0),pay=[20,50,100,500].filter(function(n){return n>pr;})[0],ans=pay-pr;
  var set=[ans];shuffle([ans+1,ans-1,ans+5,ans-5,ans+10,ans+.5,ans-.5]).forEach(function(v){if(v>0&&set.length<4&&set.indexOf(v)<0)set.push(v);});
  set=shuffle(set);q.o=set.map(function(v){return {l:'$'+v};});q.ok=set.indexOf(ans);q.say=priceZh(pr);
  q.p=rb('買嘢使咗','maai5 je5 sai2 zo2')+' <b>$'+pr+'</b>（'+rb(q.say,priceJy(pr))+'），'+rb('俾咗','bei2 zo2')+' <b>$'+pay+'</b>，'+rb('找返幾多？','zaau2 faan2 gei2 do1');}
 else if(t==='dish'){var d=pick(DISH),role=pick(['h','m']),f=dishInfo(d),c=d[2].filter(function(x){return x[3]===role;})[0],seen={};d[2].forEach(function(x){seen[x[0]]=1;});
  var pool=[];DISH.forEach(function(e){e[2].forEach(function(x){if(!seen[x[0]]){seen[x[0]]=1;pool.push(x);}});});
  var os=shuffle([c].concat(shuffle(pool).slice(0,3)));q.o=os.map(function(x){return {l:x[0],j:x[1],s:x[2]};});q.ok=os.indexOf(c);q.say=f.zh;
  q.p='「<b>'+rb(f.zh,f.jy)+'</b>」<br>'+rb('邊個字係','bin1 go3 zi6 hai6')+'<b>'+rb(R[role][1],R[role][2])+'</b>？';}
 else if(t==='veg'){var v=pick(ALL),os2=shuffle([v].concat(shuffle(ALL.filter(function(x){return x[0]!==v[0];})).slice(0,3)));
  q.o=os2.map(function(x){return {l:x[0],j:x[1]};});q.ok=os2.indexOf(v);q.p='<span style="font-size:26px">'+v[3]+'</span> <b class="tq">'+v[2]+'</b><br>'+rb('呢樣嘢廣東話點講？','ni1 joeng6 je5 gwong2 dung1 waa2 dim2 gong2');}
 else{var L=pick(Object.keys(CUTS));q.L=L;q.say=CUTS[L][0];q.p='「<b>'+rb(CUTS[L][0],CUTS[L][1])+'</b>」<br>'+rb('喺圖入面邊個位置？撳一下','hai2 tou4 jap6 min6 bin1 go3 wai6 zi3 gam6 jat1 haa5')+' 👇';}
 Q.q=q;}
function qDraw(){var b=$('p-prac');
 if(Q.done){b.innerHTML='<div class="card result"><div class="big">'+(Q.score>=60?'🎉':'💪')+'</div><div class="zh">'+rb('完成！','jyun4 seng4')+'</div><div class="sc">'+Q.score+' / '+QN*10+'</div><div class="acts"><button class="btn p" onclick="FS.qr()">'+rb('再玩一次','zoi3 waan2 jat1 ci3')+'</button></div></div>';return;}
 var q=Q.q,h='<div class="g-hdr"><span class="pill r">'+(Q.i+1)+' / '+QN+'</span><span class="pill">★ '+Q.score+'</span></div><div class="card"><div class="zh sm" style="font-weight:500">'+q.p+'</div>'+(q.say?'<div style="margin-top:6px">'+spk(q.say)+'</div>':'')+'</div>';
 if(q.t==='cut'){h+=mapHtml('qc',function(l){if(!Q.fb)return '';return l===q.L?' ok':(l===Q.pickd?' bad':'');});}
 else{h+='<div class="opts">'+q.o.map(function(o,i){var c=Q.fb?(i===q.ok?' ok':(i===Q.pickd?' bad':' dim')):'';return '<button class="opt'+c+'" onclick="FS.qa('+i+')"><div class="zh sm">'+rb(o.l,o.j||'')+'</div>'+(o.s?'<div class="th">'+o.s+'</div>':'')+'</button>';}).join('')+'</div>';}
 if(Q.fb)h+='<div class="fb '+Q.fb+'">'+(Q.fb==='ok'?'✅ '+rb('啱！','ngaam1')+' +10':'❌ '+rb('唔啱，睇下綠色嘅答案','m4 ngaam1 tai2 haa5 luk6 sik1 ge3 daap3 on3'))+'</div><div class="acts"><button class="btn p" onclick="FS.qn()">'+(Q.i+1>=QN?rb('睇成績','tai2 sing4 zik1'):rb('下一題','haa6 jat1 tai4'))+' ➜</button></div>';
 b.innerHTML=h;}
function qMark(good){Q.fb=good?'ok':'err';if(good){Q.score+=10;award(10);}qDraw();}

/* ── 分頁 ── */
var barEl=document.getElementById('fs-bar'),TABS=[['shop','🛒 落街買餸'],['money','💵 紙幣硬幣'],['veg','🥬 菜檔'],['pork','🐖 豬肉檔'],['fish','🐟 魚檔'],['fruit','🍎 生果舖'],['groc','🏪 雜貨舖'],['frz','🧊 急凍舖'],['dish','🍲 家常菜'],['prac','🎮 練習']],cur='shop';
function setSub(p){cur=p;barEl.innerHTML=TABS.map(function(t){return '<button class="tm-tab'+(t[0]===cur?' act':'')+'" data-ct="'+t[0]+'">'+t[1]+'</button>';}).join('');
 autoRuby(barEl);PAGES.forEach(function(k){$('p-'+k).classList.toggle('act',k===cur);});try{window.scrollTo(0,0);}catch(e){}}
barEl.addEventListener('click',function(e){var b=e.target.closest('[data-ct]');if(b)setSub(b.dataset.ct);});
window.FS={sp:sp,
 cut:function(l){P.sel=l;pkDraw();},
 bm:function(i){D.m=i;renderDish();},bx:function(i){D.x=i;renderDish();},
 mtog:function(i){D.mo=D.mo===i?-1:i;renderDish();},
 dtog:function(i){D.open=D.open===i?-1:i;renderDish();},
 qa:function(i){if(Q.fb)return;Q.pickd=i;qMark(i===Q.q.ok);},
 qc:function(l){if(Q.fb)return;Q.pickd=l;qMark(l===Q.q.L);},
 qn:function(){Q.i++;if(Q.i>=QN){Q.done=true;try{window.APP_LOGHIST(Q.score,'food');}catch(e){}qDraw();return;}qGen();qDraw();},
 qr:function(){qNew();qDraw();}};
window.fsShow=function(){setSub(cur);};
window.fsLeave=function(){try{speechSynthesis.cancel();}catch(e){}};
var SUP=[['魚','jyu2'],['樣','joeng6'],['去邊度買餸','heoi3 bin1 dou6 maai5 sung3'],['街市菜檔對話','gaai1 si5 coi3 dong3 deoi3 waa6'],['斤同兩','gan1 tung4 loeng2'],['買餸常用句','maai5 sung3 soeng4 jung6 geoi3'],['紙幣','zi2 bai6'],['硬幣','ngaang6 bai6'],['點樣讀價錢','dim2 joeng2 duk6 gaa3 cin2'],['付款方法','fu6 fun2 fong1 faat3'],['菜檔有咩買','coi3 dong3 jau5 me1 maai5'],['撳','gam6'],['聽','teng1'],['點講','dim2 gong2'],['豬嘅部位','zyu1 ge3 bou6 wai2'],['撳圖中位置','gam6 tou4 zung1 wai6 zi3'],['豬肉檔仲有咩買','zyu1 juk6 dong3 zung6 jau5 me1 maai5'],['喺豬肉檔點講','hai2 zyu1 juk6 dong3 dim2 gong2'],['魚檔有咩買','jyu4 dong3 jau5 me1 maai5'],['生果舖有咩買','saang1 gwo2 pou3 jau5 me1 maai5'],['雜貨舖有咩買','zaap6 fo3 pou3 jau5 me1 maai5'],['急凍舖有咩買','gap1 dung3 pou3 jau5 me1 maai5'],['咩嚟㗎','me1 lai4 gaa3'],['換煮法','wun6 zyu2 faat3'],['換主料','wun6 zyu2 liu2'],['香港家常菜','hoeng1 gong2 gaa1 soeng4 coi3'],['撳開睇拆解','gam6 hoi1 tai2 caak3 gaai2'],['點煮','dim2 zyu2'],['味型','mei6 jing4'],['做法','zou6 faat3'],['點調味','dim2 tiu4 mei6'],['撳開睇常見餸名','gam6 hoi1 tai2 soeng4 gin3 sung3 meng2'],['常見煮法','soeng4 gin3 zyu2 faat3'],['煮法','zyu2 faat3'],['主料','zyu2 liu2'],['黃色格仔','wong4 sik1 gaak3 zai2'],['買法','maai5 faat3'],['量詞','loeng6 ci4'],['數嘢用量詞','sou2 je5 jung6 loeng6 ci4'],['睇','tai2'],['頁','jip6'],['我','ngo5'],['店員','dim3 jyun4'],['元','jyun4'],['二十蚊','ji6 sap6 man1'],['叉','caa1'],['炆','man1'],['燉','dan6'],['湯','tong1'],['落街買餸','lok6 gaai1 maai5 sung3'],['紙幣硬幣','zi2 bai6 ngaang6 bai6'],['家常菜','gaa1 soeng4 coi3'],['練習','lin6 zaap6'],['粵拼','jyut6 ping3']];
function learnAll(){SUP.forEach(function(a){L(a[0],a[1]);});
 [PLACES,VEG,FISH,FRUIT,GROC,FRZ,PORK,METH,BM,BX,SAY,VSAY,FSAY,FRSAY,GRSAY,FZSAY,PSAY].forEach(function(A){A.forEach(function(a){L(a[0],a[1]);});});
 DLG.forEach(function(d){L(d[1],d[2]);});NOTES.forEach(function(n){L(n[1],n[2]);L(n[3],n[4]);});COINS.forEach(function(c){L(c[1],c[2]);});PRICE.forEach(function(p){L(p[1],p[2]);});
 PAYS.forEach(function(p){L(p[1],p[2]);L(p[4],p[5]);L(p[7],p[8]);});Object.keys(CUTS).forEach(function(k){L(CUTS[k][0],CUTS[k][1]);});
 DISH.forEach(function(d){d[2].forEach(function(x){L(x[0],x[1]);});var f=dishInfo(d);L(f.zh,f.jy);});MTH.forEach(function(m){L(m[0],m[1]);m[5].forEach(function(e){L(e[0],e[1]);});});Object.keys(R).forEach(function(k){L(R[k][1],R[k][2]);});}
learnAll();
renderShop();renderMoney();renderVeg();renderPork();renderFish();renderFruit();renderGroc();renderFrz();renderDish();qNew();qDraw();setSub('shop');
var busy=false;function pass(){if(busy)return;busy=true;try{tagThai(SR);autoRuby(SR);}finally{busy=false;}}
var mo=new MutationObserver(function(){mo.disconnect();pass();mo.observe(SR,{childList:true,subtree:true});});
pass();mo.observe(SR,{childList:true,subtree:true});
})();
