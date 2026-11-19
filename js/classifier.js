/* ═══ 量詞進階版（取代舊「量詞」頁）：學習／組合器／句子遊戲 ＋ 由「遊戲」頁搬入嘅舊量詞配對 ═══
   Shadow DOM 隔離：CSS 同全域變數（$、shuffle、G、B、L、CLF、key、pick、rand …）唔會同主頁撞名 */
(function(){
'use strict';
var host=document.getElementById('clf-host'); if(!host||!host.attachShadow)return;
var CSS_TEXT="*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%;--bg:#F1F0E4;--surface:#fff;--surface2:#E7E6D6;--border:#D9D6C4;--text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;--accent:#0E6B57;--accent-bg:#E3EFE9;--yellow:#A9701C;--yellow-bg:#F8EDDA;--green:#1D8A5C;--green-bg:#E6F4EC;--red:#C1402A;--red-bg:#FAEAE4;--radius:12px;--shadow:0 1px 4px rgba(0,0,0,.08);--serif:'Noto Serif TC',serif}\n.page{display:none}.page.act{display:block}\n.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:20px 0 10px}\n.sec:first-child{margin-top:0}\n.card{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px;box-shadow:var(--shadow)}\n.note{font-size:12px;color:var(--text-sub);font-family:'Noto Sans Thai','Noto Sans TC'}\n/* token chips */\n.tks{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 6px}\n.tk{background:var(--surface);border:2px solid;border-radius:10px;padding:5px 8px;text-align:center;min-width:44px}\n.tk-r{font-size:9px;font-weight:700}\n.tk-c{font-family:var(--serif);font-size:20px;font-weight:900;line-height:1.2}\n.tk-j{font-family:'Space Mono';font-size:9px;color:var(--text-sub)}\n.zh{font-family:var(--serif);font-size:20px;font-weight:700}\n.jy{font-family:'Space Mono';font-size:11px;color:var(--accent)}\n.th{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub)}\n.spk{background:var(--accent-bg);border:1px solid #c3d9d0;color:var(--accent);border-radius:8px;padding:3px 10px;font-size:12px;cursor:pointer;font-family:inherit;flex-shrink:0}\n/* tips */\n.tip{padding:10px 0;border-top:1px dashed var(--border)}\n.tip:first-child{border-top:none;padding-top:0}\n.tip-t{font-weight:700;font-size:13px;margin-bottom:3px}\n/* classifier cards */\n.cc{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);margin-bottom:10px;box-shadow:var(--shadow);overflow:hidden}\n.cc-h{display:flex;align-items:center;gap:12px;padding:12px 14px;cursor:pointer}\n.cc-c{font-family:var(--serif);font-size:34px;font-weight:900;min-width:44px;text-align:center}\n.cc-m{flex:1;min-width:0}\n.cc-j{font-family:'Space Mono';font-size:12px;color:var(--accent)}\n.cc-t{font-size:13px;font-weight:600}\n.cc-th{font-size:11px;color:var(--text-sub);font-family:'Noto Sans Thai'}\n.chev{color:var(--text-muted);transition:transform .2s}\n.cc.open .chev{transform:rotate(90deg)}\n.cc-b{display:none;border-top:1.5px solid var(--border);padding:12px 14px}\n.cc.open .cc-b{display:block}\n.new{background:var(--yellow-bg);color:var(--yellow);font-size:10px;padding:1px 6px;border-radius:10px;font-family:'Noto Sans TC';margin-left:4px}\n.it{padding:10px 0;border-top:1px solid var(--surface2)}\n.it:first-child{border-top:none;padding-top:0}\n.it-h{display:flex;align-items:center;gap:8px;margin-bottom:6px}\n.it-e{font-size:26px}\n.it-n{font-weight:700}\n.ln{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:5px 0 5px 10px;border-left:3px solid var(--accent-bg)}\n.go-b{border:1.5px solid var(--border);background:var(--surface);border-radius:16px;padding:3px 12px;font-size:12px;cursor:pointer;font-family:inherit;color:var(--text-sub);margin-top:6px}\n/* builder */\n.row-l{font-size:11px;font-weight:700;color:var(--text-muted);margin:12px 0 5px}\n.chips{display:flex;flex-wrap:wrap;gap:6px}\n.chip{padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:13px;cursor:pointer;font-family:inherit;font-weight:500;display:inline-flex;align-items:center;gap:5px}\n.chip.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.dot{display:block;width:14px;height:14px;border-radius:50%;border:1.5px solid rgba(0,0,0,.25)}\n.chip .dot{display:inline-block}\n.out{background:var(--surface);border:2px solid var(--accent);border-radius:var(--radius);padding:14px;margin:12px 0;box-shadow:var(--shadow)}\n.scene{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:flex-end;padding:10px 4px;min-height:60px}\n.sc-one{text-align:center;line-height:1.1}\n.sc-one .gs{filter:grayscale(1)}\n.sc-one .dot{margin:3px auto 0}\n.tips-b{background:var(--yellow-bg);border-radius:10px;padding:8px 12px;font-size:12px;color:var(--yellow);margin-top:10px}\n.tips-b div+div{margin-top:3px}\n/* game */\n.level-bar{display:flex;gap:8px;margin-bottom:12px}\n.lv-btn{flex:1;padding:8px 6px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}\n.lv-btn.act{background:var(--accent);border-color:var(--accent);color:#fff}\n.lv-badge{display:block;font-size:10px;font-weight:400;opacity:.85}\n.g-hdr{display:flex;justify-content:space-between;margin-bottom:10px}\n.pill{background:var(--yellow-bg);border:1.5px solid #e9d6ae;color:var(--yellow);padding:3px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:13px}\n.pill.r{background:var(--surface2);border-color:var(--border);color:var(--text-sub)}\n.opts{display:flex;flex-direction:column;gap:8px;margin-top:10px}\n.opt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 14px;cursor:pointer;text-align:left;font-family:inherit;color:var(--text);box-shadow:var(--shadow)}\n.opt:hover{border-color:var(--accent);background:var(--accent-bg)}\n.opt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.opt.bad{border-color:var(--red)!important;background:var(--red-bg)!important}\n.opt.dim{opacity:.4;pointer-events:none}\n.grid2{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}\n.sopt{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:6px;cursor:pointer;font-family:inherit;box-shadow:var(--shadow)}\n.sopt:hover{border-color:var(--accent)}\n.sopt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.sopt.bad{border-color:var(--red)!important;background:var(--red-bg)!important}\n.sopt.dim{opacity:.4;pointer-events:none}\n.fb{padding:9px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid;margin-top:12px}\n.fb.ok{background:var(--green-bg);color:var(--green);border-color:#bbf7d0}\n.fb.err{background:var(--red-bg);color:var(--red);border-color:#fecaca}\n.slots{display:flex;flex-wrap:wrap;gap:8px;padding:10px;background:var(--surface2);border-radius:var(--radius);min-height:80px;margin:10px 0}\n.slot{min-width:64px;min-height:62px;border:2px dashed var(--border);border-radius:12px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.5);color:var(--text-muted);font-family:'Space Mono';font-size:12px}\n.slot.f{border:none;background:transparent}\n.pool{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}\n.sg-card{background:var(--surface);border:2px solid var(--border);border-radius:12px;padding:6px 12px;min-width:60px;text-align:center;cursor:pointer;font-family:inherit;box-shadow:var(--shadow)}\n.sg-card.ok{background:var(--green-bg);border-color:var(--green)!important}\n.sg-card.bad{background:var(--red-bg);border-color:var(--red)!important}\n.sg-card:disabled{cursor:default}\n.sg-c{font-family:var(--serif);font-size:20px;font-weight:700;color:var(--text)}\n.sg-j{font-family:'Space Mono';font-size:9px;color:var(--text-sub)}\n.sg-r{font-size:9px;font-weight:700}\n.acts{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px}\n.btn{border:1.5px solid var(--border);background:var(--surface);border-radius:20px;padding:8px 20px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;color:var(--text-sub)}\n.btn.p{background:var(--accent);border-color:var(--accent);color:#fff}\n.btn:disabled{opacity:.4;cursor:not-allowed}\n.mini{border:1.5px solid var(--border);background:var(--surface);border-radius:16px;padding:3px 12px;font-size:12px;cursor:pointer;font-family:inherit;color:var(--text-sub);margin-right:6px}\n.mini.on{background:var(--yellow-bg);border-color:var(--yellow);color:var(--yellow)}\n.result{text-align:center;padding:30px 16px}\n.result .big{font-size:52px}\n.result .sc{font-family:'Space Mono';font-size:32px;font-weight:700;color:var(--accent)}\n\n@media(min-width:900px){.cc-b{padding:14px 18px}.grid2{grid-template-columns:repeat(4,1fr)}.opts{display:grid;grid-template-columns:1fr 1fr}}\n";
var SR=host.attachShadow({mode:'open'});
SR.innerHTML='<style>'+CSS_TEXT+'</style><div class="page act" id="p-learn"></div><div class="page" id="p-build"></div><div class="page" id="p-game"></div>';
const $=id=>SR.getElementById(id);
const rand=n=>Math.floor(Math.random()*n);
const pick=a=>a[rand(a.length)];
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=rand(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}

/* ── 語音 ── */
const Speech={ok:'speechSynthesis' in window,voices:[],
  init(){if(!this.ok)return;const l=()=>{this.voices=speechSynthesis.getVoices();};l();speechSynthesis.addEventListener('voiceschanged',l);},
  say(t){if(!this.ok)return;
    const go=()=>{const u=new SpeechSynthesisUtterance(String(t));
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.indexOf('zh')===0);
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();}};   // Chrome：cancel 後即刻 speak 會被吞
Speech.init();
function sp(t){Speech.say(t);}

/* ── 資料 ── */
const NUM=[null,['一','jat1','หนึ่ง'],['兩','loeng5','สอง'],['三','saam1','สาม'],['四','sei3','สี่'],['五','ng5','ห้า'],['六','luk6','หก'],['七','cat1','เจ็ด'],['八','baat3','แปด'],['九','gau2','เก้า'],['十','sap6','สิบ']];
const COL={
 red:['紅色','hung4 sik1','แดง','#dc2626'],yellow:['黃色','wong4 sik1','เหลือง','#eab308'],green:['綠色','luk6 sik1','เขียว','#16a34a'],
 blue:['藍色','laam4 sik1','น้ำเงิน','#2563eb'],black:['黑色','haak1 sik1','ดำ','#111827'],white:['白色','baak6 sik1','ขาว','#f1f5f9'],
 brown:['啡色','fe1 sik1','น้ำตาล','#92400e'],orange:['橙色','caang2 sik1','ส้ม','#ea580c'],purple:['紫色','zi2 sik1','ม่วง','#9333ea'],
 pink:['粉紅色','fan2 hung4 sik1','ชมพู','#f472b6'],grey:['灰色','fui1 sik1','เทา','#6b7280']};
const ADJ={big:['大','daai6','ใหญ่'],small:['細','sai3','เล็ก'],new:['新','san1','ใหม่'],old:['舊','gau6','เก่า'],pretty:['靚','leng3','สวย'],
 long:['長','coeng4','ยาว'],short:['短','dyun2','สั้น'],thick:['厚','hau5','หนา'],thin:['薄','bok6','บาง'],hot:['熱','jit6','ร้อน'],cold:['凍','dung3','เย็น'],tall:['高','gou1','สูง']};
const FRAMES=[
 {label:'（冇句頭）',t:[],th:''},
 {label:'我有…',t:[['我','ngo5'],['有','jau5']],th:'ฉันมี'},
 {label:'我想要…',t:[['我','ngo5'],['想','soeng2'],['要','jiu3']],th:'ฉันอยากได้'},
 {label:'呢度有…',t:[['呢','ni1'],['度','dou6'],['有','jau5']],th:'ตรงนี้มี'}];
const ROLE={frame:['#2563eb','句頭'],num:['#dc2626','數字'],clf:['#ea580c','量詞'],col:['#9333ea','顏色'],ge:['#6b7280','助詞'],adj:['#16a34a','形容詞'],noun:['#ca8a04','名詞']};

// 名詞：[中文, 粵拼, 泰文, 泰文量詞, emoji, 顏色, 形容詞]
const CLF=[
 {c:'個',j:'go3',tip:'通用／圓形嘅嘢',th:'ลักษณนามทั่วไป / ของกลม',items:[
  ['蘋果','ping4 gwo2','แอปเปิ้ล','ลูก','🍎','red,green,yellow','big,small'],
  ['橙','caang2','ส้ม','ลูก','🍊','','big,small'],
  ['波','bo1','ลูกบอล','ลูก','⚽','white,red,blue','big,small,new,old'],
  ['蛋糕','daan6 gou1','เค้ก','ก้อน','🎂','brown,pink','big,small']]},
 {c:'隻',j:'zek3',tip:'動物／成對嘅其中一隻',th:'สัตว์ / ของที่เป็นคู่',items:[
  ['狗','gau2','หมา','ตัว','🐕','black,white,brown,grey','big,small,pretty'],
  ['貓','maau1','แมว','ตัว','🐈','black,white,brown,grey,yellow','big,small,pretty'],
  ['雀仔','zoek3 zai2','นก','ตัว','🐦','blue,yellow,red','small'],
  ['兔','tou3','กระต่าย','ตัว','🐇','white,brown,grey','big,small'],
  ['豬','zyu1','หมู','ตัว','🐖','pink,black','big,small']]},
 {c:'條',j:'tiu4',tip:'細長嘅嘢',th:'ของยาวเรียว',items:[
  ['魚','jyu2','ปลา','ตัว','🐟','red,yellow,blue,black','big,small'],
  ['褲','fu3','กางเกง','ตัว','👖','blue,black,white,brown','long,short,new,old'],
  ['蛇','se4','งู','ตัว','🐍','green,black,yellow','long,big,small'],
  ['裙','kwan4','กระโปรง','ตัว','👗','red,black,white,pink','long,short,new,pretty']]},
 {c:'張',j:'zoeng1',tip:'扁平嘅嘢／有平面嘅傢俬',th:'ของแบน',items:[
  ['紙','zi2','กระดาษ','แผ่น','📄','white,yellow,blue','big,small'],
  ['椅','ji2','เก้าอี้','ตัว','🪑','brown,black,white','big,small,new,old'],
  ['床','cong4','เตียง','เตียง','🛏️','white,blue,brown','big,small,new,old'],
  ['地圖','dei6 tou4','แผนที่','แผ่น','🗺️','','big,small,new,old'],
  ['卡','kaat1','การ์ด','ใบ','💳','blue,red,black,white','new,old']]},
 {c:'本',j:'bun2',tip:'有頁嘅讀物',th:'หนังสือ / สมุด',items:[
  ['書','syu1','หนังสือ','เล่ม','📖','red,blue,green,black','thick,thin,new,old'],
  ['雜誌','zaap6 zi3','นิตยสาร','เล่ม','📰','','thick,thin,new,old'],
  ['簿','bou2','สมุด','เล่ม','📓','red,blue,black','thick,thin,big,small']]},
 {c:'杯',j:'bui1',tip:'用杯裝嘅飲品',th:'เครื่องดื่มในแก้ว',items:[
  ['茶','caa4','ชา','แก้ว','🍵','green,brown','hot,cold'],
  ['咖啡','gaa3 fe1','กาแฟ','แก้ว','☕','','hot,cold'],
  ['果汁','gwo2 zap1','น้ำผลไม้','แก้ว','🍹','orange,red,green','cold'],
  ['水','seoi2','น้ำ','แก้ว','💧','','hot,cold']]},
 {c:'碗',j:'wun2',tip:'用碗裝嘅食物',th:'อาหารในชาม',items:[
  ['飯','faan6','ข้าว','ชาม','🍚','white','hot'],
  ['湯','tong1','ซุป','ชาม','🥣','','hot'],
  ['麵','min6','บะหมี่','ชาม','🍜','','hot']]},
 {c:'間',j:'gaan1',tip:'屋、舖頭、學校等有空間嘅建築',th:'บ้าน / ร้าน / อาคาร',items:[
  ['屋','uk1','บ้าน','หลัง','🏠','white,blue,red','big,small,new,old,pretty'],
  ['舖','pou3','ร้าน','ร้าน','🏪','','big,small,new,old'],
  ['學校','hok6 haau6','โรงเรียน','แห่ง','🏫','','big,small,new,old'],
  ['酒店','zau2 dim3','โรงแรม','แห่ง','🏨','','big,new,old,pretty']]},
 {c:'件',j:'gin6',tip:'上身衫褲、一件件嘅嘢',th:'เสื้อผ้า / ของเป็นชิ้น',isNew:1,items:[
  ['衫','saam1','เสื้อ','ตัว','👕','red,blue,white,black,yellow,green','new,old,pretty,big,small'],
  ['外套','ngoi6 tou3','เสื้อโค้ท','ตัว','🧥','black,brown,grey,blue','new,old,thick,big'],
  ['蛋糕','daan6 gou1','เค้ก (ชิ้น)','ชิ้น','🍰','brown,pink','big,small']]},
 {c:'部',j:'bou6',tip:'電子機器',th:'เครื่องใช้ไฟฟ้า / เครื่องจักร',isNew:1,items:[
  ['電話','din6 waa2','โทรศัพท์','เครื่อง','📱','black,white,blue,red','new,old,big,small'],
  ['電腦','din6 nou5','คอมพิวเตอร์','เครื่อง','💻','black,white,grey','new,old,big,small'],
  ['洗衣機','sai2 ji1 gei1','เครื่องซักผ้า','เครื่อง','🧺','white,grey','new,old,big,small'],
  ['焗爐','guk6 lou4','เตาอบ','เครื่อง','♨️','black,white,grey','new,old,big,small'],
  ['電視機','din6 si6 gei1','โทรทัศน์','เครื่อง','📺','black,white','new,old,big,small'],
  ['雪櫃','syut3 gwai6','ตู้เย็น','ตู้','🧊','white,grey,black','new,old,big,small'],
  ['冷氣機','laang5 hei3 gei1','แอร์','เครื่อง','❄️','white,grey','new,old,big,small'],
  ['相機','soeng3 gei1','กล้องถ่ายรูป','ตัว','📷','black,white,red','new,old,big,small'],
  ['打印機','daa2 jan3 gei1','เครื่องพิมพ์','เครื่อง','🖨️','black,white,grey','new,old,big,small']]},
 {c:'架',j:'gaa3',tip:'車、飛機等大型交通工具',th:'ยานพาหนะ',isNew:1,items:[
  ['車','ce1','รถ','คัน','🚗','red,white,black,blue,yellow','new,old,big,small,pretty','部|bou6'],
  ['飛機','fei1 gei1','เครื่องบิน','ลำ','✈️','white,blue','big,small']]},
 {c:'枝',j:'zi1',tip:'幼長嘅棒狀嘢',th:'ของเป็นแท่ง',isNew:1,items:[
  ['筆','bat1','ปากกา','ด้าม','🖊️','blue,black,red','long,short,new,old'],
  ['牙刷','ngaa4 caat3','แปรงสีฟัน','ด้าม','🪥','blue,red,white,green,pink','new,old'],
  ['花','faa1','ดอกไม้','ดอก','🌹','red,yellow,white,pink,purple','big,small,pretty']]},
 {c:'雙',j:'soeng1',alt:{c:'對',j:'deoi3'},tip:'成雙成對嘅嘢（雙／對都得）',th:'ของเป็นคู่',isNew:1,items:[
  ['鞋','haai4','รองเท้า','คู่','👟','white,black,red,blue','new,old,big,small,pretty'],
  ['襪','mat6','ถุงเท้า','คู่','🧦','white,black,red,blue,grey','new,old,long,short'],
  ['筷子','faai3 zi2','ตะเกียบ','คู่','🥢','brown,black,red','new,old,long,short']]},
 {c:'盒',j:'hap6',tip:'用盒裝嘅嘢',th:'ของในกล่อง',isNew:1,items:[
  ['果汁','gwo2 zap1','น้ำผลไม้','กล่อง','🧃','orange,red,green','cold'],
  ['牛奶','ngau4 naai5','นม','กล่อง','🥛','','cold'],
  ['朱古力','zyu1 gu1 lik1','ช็อกโกแลต','กล่อง','🍫','',''],
  ['紙巾','zi2 gan1','กระดาษทิชชู่','กล่อง','🧻','white,pink','']]},
 {c:'把',j:'baa2',tip:'有柄、用手握嘅嘢',th:'ของที่มีด้ามจับ',isNew:1,items:[
  ['遮','ze1','ร่ม','คัน','☂️','black,blue,red,yellow,pink','big,small,new,old'],
  ['剪刀','zin2 dou1','กรรไกร','เล่ม','✂️','red,blue,black','big,small,new,old'],
  ['刀','dou1','มีด','เล่ม','🔪','','long,short,new,old']]},
 {c:'座',j:'zo6',tip:'山、橋、大廈呢啲大型固定嘅嘢',th:'ภูเขา / สะพาน / ตึก',isNew:1,items:[
  ['山','saan1','ภูเขา','ลูก','⛰️','green,brown,grey','big,small,tall'],
  ['橋','kiu4','สะพาน','แห่ง','🌉','','big,small,long,new,old'],
  ['塔','taap3','หอคอย','แห่ง','🗼','','tall,new,old'],
  ['大廈','daai6 haa6','ตึก','ตึก','🏢','white,blue,grey','tall,new,old,big']]},
 {c:'粒',j:'nap1',tip:'細細粒嘅嘢',th:'ของเม็ดเล็กๆ',isNew:1,items:[
  ['糖','tong2','ลูกอม','เม็ด','🍬','red,blue,green,yellow,orange,pink','big,small'],
  ['提子','tai4 zi2','องุ่น','ลูก','🍇','purple,green','big,small'],
  ['花生','faa1 sang1','ถั่วลิสง','เม็ด','🥜','brown','big,small']]},
 {c:'塊',j:'faai3',tip:'一塊塊嘅食物、扁身嘅嘢',th:'ของเป็นก้อน / แผ่น',isNew:1,items:[
  ['餅乾','beng2 gon1','คุกกี้','ชิ้น','🍪','brown','big,small'],
  ['薯片','syu4 pin2','มันฝรั่งทอดกรอบ','แผ่น','🍘','','big,small'],
  ['麵包','min6 baau1','ขนมปัง','ก้อน','🍞','','big,small'],
  ['芝士','zi1 si2','ชีส','ก้อน','🧀','yellow','big,small']]}
];
CLF.forEach(g=>g.items=g.items.map(a=>({zh:a[0],j:a[1],th:a[2],thc:a[3],em:a[4],colors:a[5]?a[5].split(','):[],adjs:a[6]?a[6].split(','):[],alt:a[7]?{c:a[7].split('|')[0],j:a[7].split('|')[1]}:null})));

/* ── 組句 ── */
function phrase(s){
  const g=CLF[s.g],it=g.items[s.it],F=FRAMES[s.frame||0],cg=s.wrongG!==undefined?CLF[s.wrongG]:((s.alt&&(it.alt||g.alt))||g),T=[];
  F.t.forEach(x=>T.push({t:x[0],j:x[1],r:'frame'}));
  T.push({t:NUM[s.n][0],j:NUM[s.n][1],r:'num'});
  T.push({t:cg.c,j:cg.j,r:'clf'});
  if(s.col){const c=COL[s.col];T.push({t:c[0],j:c[1],r:'col'},{t:'嘅',j:'ge3',r:'ge'});}
  if(s.adj){const a=ADJ[s.adj];T.push({t:a[0],j:a[1],r:'adj'});}
  T.push({t:it.zh,j:it.j,r:'noun'});
  const th=F.th+it.th+(s.adj?ADJ[s.adj][2]:'')+(s.col?'สี'+COL[s.col][2]:'')+NUM[s.n][2]+it.thc;
  return {T,zh:T.map(x=>x.t).join('')+(F.t.length?'。':''),j:T.map(x=>x.j).join(' '),th};
}
function tkHtml(T){
  return '<div class="tks">'+T.map(t=>{const r=ROLE[t.r];
    return '<div class="tk" style="border-color:'+r[0]+'"><div class="tk-r" style="color:'+r[0]+'">'+r[1]+'</div><div class="tk-c">'+t.t+'</div><div class="tk-j">'+t.j+'</div></div>';}).join('')+'</div>';
}
function sceneHtml(s,small){
  const it=CLF[s.g].items[s.it];
  const fs=s.adj==='big'?(small?36:54):s.adj==='small'?(small?15:24):(small?24:38);
  const dot=s.col?COL[s.col][3]:null;
  const one='<div class="sc-one"><span class="'+(dot?'gs':'')+'" style="font-size:'+fs+'px">'+it.em+'</span>'+(dot?'<i class="dot" style="background:'+dot+'"></i>':'')+'</div>';
  return '<div class="scene">'+Array(s.n).fill(one).join('')+'</div>';
}
function speakBtn(zh){return '<button class="spk" data-t="'+zh.replace(/。/g,'')+'" onclick="CD.sp(this.dataset.t)">🔊</button>';}

/* ── 分頁（分頁列喺 shadow 外面，同「時間／方向」一樣）── */
function showTab(p){setSub(p,true);}
function addScore(n){if(n)award(n);}

function award(n){   // 計入主 App 嘅 ★ 總分
  try{
    var prev=S.totalScore;S.totalScore+=n;
    var chip=document.getElementById('totalScore');
    animateNumber(chip,prev,S.totalScore,600,'','★ ');
    chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');
  }catch(e){console.warn('[計分失敗]',e);}
}
function logHist(score,key){   // 完成一輪 → 寫入「得分紀錄」（分數已經逐題加咗入 ★，唔重複加）
  try{S.scoreHistory.push({game:key,score:score,time:new Date().toLocaleTimeString('en-HK',{hour:'2-digit',minute:'2-digit'})});if(typeof renderHistory==='function')renderHistory();}catch(e){}
}

/* ══ 學習 ══ */
const L={open:0};
function renderLearn(){
  const demo=phrase({g:1,it:0,n:2,col:'black',adj:'big'});
  let h='<div class="sec">📐 進階句型公式</div><div class="card">'
   +'<div class="note">เรียงลำดับ: จำนวน + ลักษณนาม + สี + 嘅 + คำคุณศัพท์ + คำนาม</div>'
   +tkHtml(demo.T)
   +'<div class="ln" style="margin-top:6px"><div><div class="zh">'+demo.zh+'</div><div class="jy">'+demo.j+'</div><div class="th">'+demo.th+'</div></div>'+speakBtn(demo.zh)+'</div></div>';
  const tips=[
   ['① 數字 2 讀「兩」，唔係「二」',{g:1,it:0,n:2},'ใช้ 兩 แทน 二 เมื่อนับของ'],
   ['② 單字形容詞（大、細、新、舊…）直接放喺量詞後面',{g:1,it:1,n:1,adj:'big'},'คำคุณศัพท์พยางค์เดียววางหลังลักษณนามได้เลย'],
   ['③ 顏色後面要加「嘅」',{g:1,it:1,n:3,col:'white'},'สีต้องตามด้วย 嘅'],
   ['④ 顏色＋大細：顏色先，大細後',{g:1,it:0,n:1,col:'brown',adj:'small'},'สีมาก่อน แล้วค่อยขนาด'],
   ['⑤ 杯／碗嘅大細要放喺數字後面',null,'ขนาดของแก้ว/ชามอยู่หลังตัวเลข']];
  h+='<div class="sec">💡 五個重點</div><div class="card">'+tips.map(t=>{
    let ex='';
    if(t[1]){const p=phrase(t[1]);ex='<div class="ln"><div><div class="zh" style="font-size:17px">'+p.zh+'</div><div class="jy">'+p.j+'</div><div class="th">'+p.th+'</div></div>'+speakBtn(p.zh)+'</div>';}
    else ex='<div class="ln"><div><div class="zh" style="font-size:17px">一大杯茶</div><div class="jy">jat1 daai6 bui1 caa4</div><div class="th">ชาแก้วใหญ่หนึ่งแก้ว</div></div>'+speakBtn('一大杯茶')+'</div>';
    return '<div class="tip"><div class="tip-t">'+t[0]+'</div><div class="note">'+t[2]+'</div>'+ex+'</div>';}).join('')+'</div>';
  h+='<div class="sec">🀄 量詞 ＋ 例子（撳開睇）</div>';
  CLF.forEach((g,gi)=>{
    h+='<div class="cc'+(L.open===gi?' open':'')+'"><div class="cc-h" onclick="CD.toggleCc('+gi+')"><span class="cc-c">'+g.c+(g.alt?'<small style="font-size:18px">／'+g.alt.c+'</small>':'')+'</span><div class="cc-m"><div class="cc-j">'+g.j+(g.alt?' / '+g.alt.j:'')+(g.isNew?'<span class="new">新增</span>':'')+'</div><div class="cc-t">'+g.tip+'</div><div class="cc-th">'+g.th+'</div></div><span class="chev">›</span></div><div class="cc-b">';
    g.items.forEach((it,ii)=>{
      const lines=[{g:gi,it:ii,n:1}];if(it.alt||g.alt)lines.push({g:gi,it:ii,n:1,alt:1});
      if(it.colors.length)lines.push({g:gi,it:ii,n:2,col:it.colors[0]});
      if(it.adjs.length)lines.push({g:gi,it:ii,n:3,adj:it.adjs[0]});
      if(it.colors.length&&it.adjs.some(a=>a==='big'||a==='small'))lines.push({g:gi,it:ii,n:2,col:it.colors[it.colors.length-1],adj:it.adjs.find(a=>a==='big'||a==='small')});
      h+='<div class="it"><div class="it-h"><span class="it-e">'+it.em+'</span><span class="it-n">'+it.zh+'</span><span class="jy">'+it.j+'</span><span class="th">· '+it.th+'</span></div>'
       +lines.map(s=>{const p=phrase(s);return '<div class="ln"><div><div class="zh" style="font-size:17px">'+p.zh+'</div><div class="jy">'+p.j+'</div><div class="th">'+p.th+'</div></div>'+speakBtn(p.zh)+'</div>';}).join('')
       +'<button class="go-b" onclick="CD.goBuild('+gi+','+ii+')">🧩 去組合器試下</button></div>';
    });
    h+='</div></div>';
  });
  $('p-learn').innerHTML=h;
}
function toggleCc(i){L.open=L.open===i?-1:i;renderLearn();}
function goBuild(g,i){B.g=g;B.it=i;B.col=null;B.adj=null;renderBuild();showTab('build');}

/* ══ 組合器 ══ */
const B={g:1,it:0,n:2,col:'black',adj:null,frame:1,alt:false};
function chip(label,act,fn,extra){return '<button class="chip'+(act?' act':'')+'" onclick="'+fn+'">'+(extra||'')+label+'</button>';}
function renderBuild(){
  const g=CLF[B.g],it=g.items[B.it];
  if(B.col&&!it.colors.includes(B.col))B.col=null;
  if(B.adj&&!it.adjs.includes(B.adj))B.adj=null;
  if(!(it.alt||g.alt))B.alt=false;
  const s={g:B.g,it:B.it,n:B.n,col:B.col,adj:B.adj,frame:B.frame,alt:B.alt};
  const p=phrase(s);
  let h='<div class="out">'+tkHtml(p.T)
   +'<div class="ln" style="margin-top:6px"><div><div class="zh">'+p.zh+'</div><div class="jy">'+p.j+'</div><div class="th">'+p.th+'</div></div>'+speakBtn(p.zh)+'</div>'
   +sceneHtml({...s,n:Math.min(B.n,10)},false);
  const tips=[];
  if(B.n===2)tips.push('✔ 2 要讀「兩」loeng5，唔係「二」');
  if(B.col)tips.push('✔ 顏色後面要加「嘅」');
  if(B.col&&B.adj)tips.push('✔ 顏色先，形容詞後：顏色＋嘅＋形容詞＋名詞');
  if(B.adj&&!B.col)tips.push('✔ 單字形容詞直接放喺量詞同名詞中間，唔使加「嘅」');
  if(g.c==='杯'||g.c==='碗')tips.push('✔ 杯／碗嘅大細放喺數字後面，例如「一大'+g.c+it.zh+'」');
  if(g.c==='雙')tips.push('✔ 雙同對都得，意思差唔多（一雙鞋／一對鞋）');
  if(B.alt&&it.alt)tips.push('✔ '+g.c+it.zh+'同'+it.alt.c+it.zh+'都啱，一般口語兩樣都會講');
  if(tips.length)h+='<div class="tips-b">'+tips.map(t=>'<div>'+t+'</div>').join('')+'</div>';
  h+='</div>';
  h+='<div class="row-l">① 量詞</div><div class="chips">'+CLF.map((x,i)=>chip(x.c,i===B.g,'CD.bSet(\'g\','+i+')')).join('')+'</div>';
  h+='<div class="row-l">② 名詞</div><div class="chips">'+g.items.map((x,i)=>chip(x.zh,i===B.it,'CD.bSet(\'it\','+i+')',x.em+' ')).join('')+'</div>';
  h+='<div class="row-l">③ 數量</div><div class="chips">'+NUM.slice(1).map((x,i)=>chip(x[0],i+1===B.n,'CD.bSet(\'n\','+(i+1)+')')).join('')+'</div>';
  h+='<div class="row-l">④ 顏色</div><div class="chips">'+chip('冇',!B.col,'CD.bSet(\'col\',-1)')
    +it.colors.map(c=>chip(COL[c][0],B.col===c,'CD.bSet(\'col\',\''+c+'\')','<i class="dot" style="background:'+COL[c][3]+'"></i>')).join('')+'</div>';
  h+='<div class="row-l">⑤ 形容詞</div><div class="chips">'+chip('冇',!B.adj,'CD.bSet(\'adj\',-1)')
    +it.adjs.map(a=>chip(ADJ[a][0]+' '+ADJ[a][1],B.adj===a,'CD.bSet(\'adj\',\''+a+'\')')).join('')+'</div>';
  h+='<div class="row-l">⑥ 句頭</div><div class="chips">'+FRAMES.map((f,i)=>chip(f.label,i===B.frame,'CD.bSet(\'frame\','+i+')')).join('')+'</div>';
  const alt=it.alt||g.alt;
  if(alt)h+='<div class="row-l">⑦ 量詞用字</div><div class="chips">'+chip(g.c+' '+g.j,!B.alt,'CD.bSet(\'alt\',false)')+chip(alt.c+' '+alt.j,B.alt,'CD.bSet(\'alt\',true)')+'</div>';
  $('p-build').innerHTML=h;
}
function bSet(k,v){
  if(k==='g'){B.g=v;B.it=0;B.col=null;B.adj=null;B.alt=false;}
  else if(k==='col'||k==='adj'){B[k]=v===-1?null:v;}
  else{B[k]=v;if(k==='it')B.alt=false;}
  renderBuild();
}

/* ══ 遊戲 ══ */
const GT=8;
let G={lv:1,i:0,score:0,done:true};
const key=s=>[s.g,s.it,s.n,s.col||'',s.adj||'',s.wrongG===undefined?'':s.wrongG].join('|');
function genScene(lvl,frame){
  for(let k=0;k<80;k++){
    const g=rand(CLF.length),it=rand(CLF[g].items.length),I=CLF[g].items[it];
    const hasC=I.colors.length>0,sz=I.adjs.filter(a=>a==='big'||a==='small'),hasS=sz.length>0,o=[];
    if(hasC)o.push('c');if(hasS)o.push('s');if(hasC&&hasS&&lvl>1)o.push('b','b');
    if(!o.length)continue;
    const t=pick(o),s={g,it,n:1+rand(lvl===1?4:5),frame:frame||0};
    if(t==='c'||t==='b')s.col=pick(I.colors);
    if(t==='s'||t==='b')s.adj=pick(sz);
    return s;
  }
}
function mutate(s,k){
  const m={...s},G0=CLF[s.g],I=G0.items[s.it];
  if(k==='n'){do{m.n=1+rand(5);}while(m.n===s.n);}
  else if(k==='col'){if(!s.col)return null;const o=I.colors.filter(c=>c!==s.col);if(!o.length)return null;m.col=pick(o);}
  else if(k==='adj'){if(!s.adj)return null;m.adj=s.adj==='big'?'small':'big';}
  else if(k==='clf'){m.wrongG=pick(CLF.map((_,i)=>i).filter(i=>i!==s.g));}
  else if(k==='item'){
    const c=G0.items.map((_,i)=>i).filter(i=>i!==s.it&&(!s.col||G0.items[i].colors.includes(s.col))&&(!s.adj||G0.items[i].adjs.includes(s.adj)));
    if(!c.length)return null;m.it=pick(c);}
  return m;
}
function distractors(s,kinds,need){
  const out=[],seen=new Set([key(s)]);
  for(let t=0;t<120&&out.length<need;t++){
    const m=mutate(s,t<60?pick(kinds):'n');if(!m)continue;
    const k=key(m);if(seen.has(k))continue;seen.add(k);out.push(m);}
  return out;
}
function gStart(lv){clearTimeout(G.timer);G={lv,i:0,score:0,done:false,fb:null};gNew();gRender();}
function gNew(){
  const lv=G.lv;G.fb=null;G.sel=null;
  const s=genScene(lv===1?1:2,lv===2?1:0);G.s=s;
  if(lv===1){G.opts=shuffle([s,...distractors(s,['n','col','adj','clf'],3)]);}
  else if(lv===3){G.opts=shuffle([s,...distractors(s,['n','col','adj','item'],3)]);}
  else{
    const p=phrase(s);G.T=p.T;G.p=p;
    let pool=shuffle(p.T.map((_,k)=>k));
    G.pool=pool;G.slots=p.T.map(()=>null);G.tries=0;G.hint=false;G.marks=null;G.msg='';G.gave=false;
  }
}
function gLvBar(){
  const L3=[['睇圖揀句','1'],['砌句','2'],['聽句揀圖','3']];
  return '<div class="level-bar">'+L3.map((x,i)=>'<button class="lv-btn'+(G.lv===i+1?' act':'')+'" onclick="CD.gStart('+(i+1)+')">Lv '+(i+1)+'<span class="lv-badge">'+x[0]+'</span></button>').join('')+'</div>';
}
function gHdr(){return '<div class="g-hdr"><span class="pill">★ '+G.score+'</span><span class="pill r">'+Math.min(G.i+1,GT)+' / '+GT+'</span></div>';}
function renderGame(){
  if(G.done&&G.i===undefined)return;
  gRender();
}
function gRender(){
  const el=$('p-game');
  if(G.done&&G.i>=GT){
    el.innerHTML=gLvBar()+'<div class="card result"><div class="big">🎉</div><div class="zh">完成！叻仔！</div><div class="sc">'+G.score+' / '+(GT*10)+'</div><div class="th" style="margin:6px 0 14px">เก่งมาก!</div><button class="btn p" onclick="CD.gStart('+G.lv+')">再玩一次</button></div>';
    return;
  }
  if(G.done){ // 未開始
    el.innerHTML=gLvBar()+'<div class="card" style="text-align:center"><div style="font-size:40px">🀄</div><div class="note" style="margin:8px 0 14px">揀一個難度開始 · เลือกระดับเพื่อเริ่ม</div><button class="btn p" onclick="CD.gStart(1)">開始 Lv 1</button></div>';
    return;
  }
  if(G.lv===1)el.innerHTML=gHdr()+gLvBar()+lv1Html();
  else if(G.lv===2)el.innerHTML=gHdr()+gLvBar()+lv2Html();
  else el.innerHTML=gHdr()+gLvBar()+lv3Html();
}
function gAnswer(ok,msgOk,msgErr){
  G.fb=ok?'ok':'err';G.fbMsg=ok?msgOk:msgErr;
  if(ok){G.score+=10;addScore(10);}
  gRender();
  G.timer=setTimeout(gNextQ,1500);
}
function gNextQ(){
  G.i++;
  if(G.i>=GT){G.done=true;logHist(G.score,'cd');gRender();return;}
  gNew();gRender();
}
/* Lv1 */
function lv1Html(){
  const s=G.s,right=key(s);
  const opts=G.opts.map((o,i)=>{const p=phrase(o);
    let c='opt';if(G.fb){if(key(o)===right)c+=' ok';else if(G.sel===i)c+=' bad';else c+=' dim';}
    return '<button class="'+c+'" '+(G.fb?'':'onclick="CD.lv1Pick('+i+')"')+'><div class="zh" style="font-size:18px">'+p.zh+'</div><div class="jy">'+p.j+'</div></button>';}).join('');
  const p=phrase(s);
  return '<div class="card"><div class="note" style="text-align:center">睇圖：幾多個？乜顏色？大定細？（圓點＝顏色，emoji 已轉灰色）</div>'+sceneHtml(s,false)+'</div><div class="opts">'+opts+'</div>'
   +(G.fb?'<div class="fb '+G.fb+'">'+(G.fb==='ok'?'✓ 啱喇！':'✗ 正確係「'+p.zh+'」')+'<div class="th" style="font-weight:400">'+p.th+'</div></div>':'');
}
function lv1Pick(i){if(G.fb)return;G.sel=i;const ok=key(G.opts[i])===key(G.s);gAnswer(ok);}
/* Lv3 */
function lv3Html(){
  const s=G.s,p=phrase(s),right=key(s);
  const opts=G.opts.map((o,i)=>{let c='sopt';if(G.fb){if(key(o)===right)c+=' ok';else if(G.sel===i)c+=' bad';else c+=' dim';}
    return '<button class="'+c+'" '+(G.fb?'':'onclick="CD.lv3Pick('+i+')"')+'>'+sceneHtml(o,true)+'</button>';}).join('');
  return '<div class="card" style="text-align:center"><div class="note">邊幅圖啱？ · ภาพไหนถูก?</div><div class="zh" style="margin-top:6px">'+p.zh+'</div><div class="jy">'+p.j+'</div><div style="margin-top:6px">'+speakBtn(p.zh)+'</div></div>'
   +'<div class="grid2">'+opts+'</div>'
   +(G.fb?'<div class="fb '+G.fb+'">'+(G.fb==='ok'?'✓ 啱喇！':'✗ 睇返個答案')+'<div class="th" style="font-weight:400">'+p.th+'</div></div>':'');
}
function lv3Pick(i){if(G.fb)return;G.sel=i;gAnswer(key(G.opts[i])===key(G.s));}
/* Lv2 */
function cardHtml(k,cls,fn,role){
  const t=G.T[k];const r=ROLE[t.r];
  return '<button class="sg-card'+(cls||'')+'" style="'+(role?'border-color:'+r[0]:'')+'" '+(fn?'onclick="'+fn+'"':'disabled')+'>'+(role?'<div class="sg-r" style="color:'+r[0]+'">'+r[1]+'</div>':'')+'<div class="sg-c">'+t.t+'</div><div class="sg-j">'+t.j+'</div></button>';
}
function lv2Html(){
  const placed=new Set(G.slots.filter(k=>k!==null)),full=G.slots.every(k=>k!==null),reveal=G.hint||G.fb==='done';
  const slots=G.slots.map((k,i)=>{
    if(k===null)return '<div class="slot">'+(i+1)+'</div>';
    const cls=G.fb==='done'?' ok':(G.marks?(G.marks[i]?' ok':' bad'):'');
    return '<div class="slot f">'+cardHtml(k,cls,G.fb==='done'?'':'CD.g2Back('+i+')',reveal)+'</div>';}).join('');
  const pool=G.fb==='done'?'':'<div class="pool">'+G.pool.filter(k=>!placed.has(k)).map(k=>cardHtml(k,'','CD.g2Place('+k+')',G.hint)).join('')+'</div>';
  let acts;
  if(G.fb==='done')acts='<button class="btn p" onclick="CD.g2Next()">'+(G.i+1>=GT?'睇成績 ➜':'下一題 ➜')+'</button>';
  else acts='<button class="btn p" '+(full?'':'disabled')+' onclick="CD.g2Check()">檢查答案</button><button class="btn" onclick="CD.g2Reset()">🔄 重來</button>'+(G.tries>=2?'<button class="btn" onclick="CD.g2Give()">👀 睇答案</button>':'');
  return '<div class="card"><div class="note">將卡牌排成正確句子 👇</div><div class="th" style="font-size:16px;margin:6px 0">'+G.p.th+'</div>'+sceneHtml(G.s,true)
   +'<div><button class="mini'+(G.hint?' on':'')+'" onclick="CD.g2Hint()">💡 顯示詞性</button><button class="mini" onclick="CD.say()">🔊 聽句子</button></div></div>'
   +'<div class="slots">'+slots+'</div>'+pool
   +(G.msg?'<div class="fb '+(G.fb==='done'&&!G.gave?'ok':'err')+'">'+G.msg+'</div>':'')
   +'<div class="acts">'+acts+'</div>'
   +(G.fb==='done'?'<div class="card" style="margin-top:12px"><div class="zh">'+G.p.zh+'</div><div class="jy">'+G.p.j+'</div><div class="th">'+G.p.th+'</div></div>':'');
}
function g2Place(k){if(G.fb==='done')return;const i=G.slots.indexOf(null);if(i<0)return;G.slots[i]=k;G.marks=null;G.msg='';gRender();}
function g2Back(i){if(G.fb==='done')return;G.slots[i]=null;G.marks=null;G.msg='';gRender();}
function g2Reset(){G.slots=G.T.map(()=>null);G.marks=null;G.msg='';gRender();}
function g2Hint(){G.hint=!G.hint;gRender();}
function g2Check(){
  const marks=G.slots.map((k,i)=>G.T[k].t===G.T[i].t);
  if(marks.every(Boolean)){const pts=G.tries===0?10:G.tries===1?5:2;G.score+=pts;addScore(pts);G.fb='done';G.marks=null;G.msg='✅ 啱！+'+pts+' 分';}
  else{G.tries++;G.marks=marks;G.msg='❌ 有 '+marks.filter(x=>!x).length+' 個位未啱（紅色），撳紅色卡牌拎走再試';}
  gRender();
}
function g2Give(){G.slots=G.T.map((_,i)=>i);G.fb='done';G.gave=true;G.marks=null;G.msg='正確答案如下，下次加油 💪';gRender();}
function g2Next(){G.i++;if(G.i>=GT){G.done=true;logHist(G.score,'cd');gRender();return;}gNew();gRender();}

/* ── 外面分頁列 ＋ 舊量詞配對 ── */
const barEl=document.getElementById('clf-bar'),gameBox=document.getElementById('clf-gamebox');
const TABS=[['learn','📖 學習'],['build','🧩 組合器'],['game','🎮 句子遊戲'],['old','🎲 量詞配對']];
let cur='learn';
function leaveOld(){try{clearTimeout(GS.timer);clearTimeout(GS._clfSortTimer);}catch(e){}}
function setSub(p,scrollTop){
  if(cur==='old'&&p!=='old')leaveOld();
  cur=p;
  barEl.innerHTML=TABS.map(t=>'<button class="tm-tab'+(t[0]===cur?' act':'')+'" data-ct="'+t[0]+'">'+t[1]+'</button>').join('');
  ['learn','build','game'].forEach(k=>{SR.getElementById('p-'+k).classList.toggle('act',k===cur);});
  const isOld=cur==='old';
  host.style.display=isOld?'none':'';gameBox.style.display=isOld?'':'none';
  if(isOld){initGame('classifier');}    // 原本「遊戲」入面嘅量詞配對（Lv1–3），已搬入呢頁
  if(scrollTop){try{window.scrollTo(0,0);}catch(e){}}
}
barEl.addEventListener('click',e=>{const b=e.target.closest('[data-ct]');if(b)setSub(b.dataset.ct,false);});
window.CD={toggleCc,goBuild,bSet,gStart,lv1Pick,lv3Pick,g2Place,g2Back,g2Reset,g2Hint,g2Check,g2Give,g2Next,sp:sp,say:function(){sp(G.p.zh.replace(/。/g,''));}};
window.clfShow=function(){setSub(cur,false);};
window.clfLeave=function(){leaveOld();try{clearTimeout(G.timer);speechSynthesis.cancel();}catch(e){}};
/* ── 起動 ── */
renderLearn();renderBuild();gRender();
setSub('learn',false);
})();
