/* ══ 課堂測驗（三）· 第15–19課 ══ 詞彙用主 App 已讀入嘅 Google Sheet（S.data.vocab） */
(function(){
'use strict';
var ROOT=document.getElementById('qz4-root'); if(!ROOT)return;
var CFG={
  DURATION_MIN:60,
  QUIZ_ID:'cantonese-l15-19-v1',
  FORM_ENDPOINT:'https://formspree.io/f/xbgdbeje',
  TEACHER_EMAIL:'yongearn@gmail.com',
  AUDIO:{n:'',s:''}, // 可選：聽力錄音 mp3（正常／慢速）；冇填就用瀏覽器語音
  MAX_PLAYS:3, QA_MAX_PLAYS:3, SHOW_POS:true, VOCAB_COUNT:20,
  CHAPTER_MIN:15, CHAPTER_MAX:19,
  LOCK_NAV:true
};
var PTS={listen:1,vocab:1,qa:1,sent:2,hob:1,clf:1};
var TITLE='課堂測驗（三）· 第15–19課', TITLE_TH='แบบทดสอบในชั้นเรียน (3) บทที่ 15–19';

/* ── 一、聽力：工人姐姐自我介紹 ＋ 10 題（每題 1 分）；正確答案放喺 o 第一個，出卷時會打亂 ── */
var PASSAGE='大家好！我叫阿蘭，今年三十二歲，係泰國人。我屋企有六個人：爸爸、媽媽、一個細佬、兩個妹妹同我。我想去香港做工人姐姐，因為香港嘅人工好啲。我識做家務，識煮嘢食，仲識照顧老人家。我一個星期游兩次水，間中彈結他，好少睇電視。琴日我踩單車跌低，而家右腳有啲痛。我希望可以搵到一個好顧主，多謝大家！';
var LQ=[
 {q:'佢叫咩名？',th:'เธอชื่ออะไร',o:[['阿蘭','อาหลาน'],['阿萍','อาผิง'],['阿珍','อาเจิน'],['阿玲','อาหลิง']]},
 {q:'佢今年幾多歲？',th:'ปีนี้เธออายุเท่าไร',o:[['三十二歲','อายุ 32 ปี'],['二十三歲','อายุ 23 ปี'],['三十三歲','อายุ 33 ปี'],['四十二歲','อายุ 42 ปี']]},
 {q:'佢係邊度人？',th:'เธอเป็นคนชาติไหน',o:[['泰國人','คนไทย'],['菲律賓人','คนฟิลิปปินส์'],['印尼人','คนอินโดนีเซีย'],['香港人','คนฮ่องกง']]},
 {q:'佢屋企有幾多個人？',th:'ที่บ้านของเธอมีกี่คน',o:[['六個人','หกคน'],['五個人','ห้าคน'],['四個人','สี่คน'],['七個人','เจ็ดคน']]},
 {q:'佢想去香港做咩？',th:'เธออยากไปทำอะไรที่ฮ่องกง',o:[['做工人姐姐','ทำงานเป็นแม่บ้าน'],['讀書','เรียนหนังสือ'],['旅行','ท่องเที่ยว'],['探朋友','ไปเยี่ยมเพื่อน']]},
 {q:'點解佢想去香港工作？',th:'ทำไมเธออยากไปทำงานที่ฮ่องกง',o:[['因為香港嘅人工好啲','เพราะค่าแรงที่ฮ่องกงดีกว่า'],['因為香港好近','เพราะฮ่องกงอยู่ใกล้'],['因為佢鍾意買嘢','เพราะเธอชอบซื้อของ'],['因為屋企人喺香港','เพราะครอบครัวอยู่ที่ฮ่องกง']]},
 {q:'佢一個星期游幾多次水？',th:'เธอว่ายน้ำสัปดาห์ละกี่ครั้ง',o:[['兩次','สองครั้ง'],['三次','สามครั้ง'],['一次','หนึ่งครั้ง'],['每日','ทุกวัน']]},
 {q:'佢好少做咩？',th:'เธอแทบไม่ค่อยทำอะไร',o:[['睇電視','ดูทีวี'],['彈結他','เล่นกีตาร์'],['游水','ว่ายน้ำ'],['煮嘢食','ทำอาหาร']]},
 {q:'佢琴日做咩跌低？',th:'เมื่อวานเธอล้มตอนทำอะไร',o:[['踩單車','ปั่นจักรยาน'],['跑步','วิ่ง'],['行山','เดินป่า'],['打羽毛球','เล่นแบดมินตัน']]},
 {q:'佢而家邊度有啲痛？',th:'ตอนนี้เธอเจ็บตรงไหน',o:[['右腳','เท้าขวา'],['左腳','เท้าซ้าย'],['右手','มือขวา'],['左手','มือซ้าย']]}
];

/* ── 三、問答選擇題：工人姐姐喺顧主屋企嘅生活問答（10 題 × 1 分） ──
   格式：'字:粵拼 字:粵拼 …'（多個音節用 _ 連接；標點直接寫）；正確答案放第一個，出卷時打亂；錯誤選項可以唔係嗰個場景（測聽力） */
var QA=[
 ['你:nei5 幾時:gei2_si4 洗:sai2 廁所:ci3_so2 ？','คุณล้างห้องน้ำเมื่อไร',[['一陣:jat1_zan6 洗:sai2','ล้างอีกสักครู่'],['瞓:fan3 咗:zo2 覺:gaau3','นอนหลับไปแล้ว'],['冇:mou5 出街:ceot1_gaai1','ไม่ได้ออกไปข้างนอก'],['唔:m4 想:soeng2 做:zou6','ไม่อยากทำ']]],
 ['你:nei5 一個星期:jat1_go3_sing1_kei4 洗:sai2 幾多:gei2_do1 次:ci3 衫:saam1 ？','หนึ่งสัปดาห์คุณซักเสื้อผ้ากี่ครั้ง',[['兩次:loeng5_ci3','สองครั้ง'],['喺:hai2 屋企:uk1_kei2','ที่บ้าน'],['好:hou2 大:daai6 件:gin6','ตัวใหญ่มาก'],['我:ngo5 嘅:ge3 朋友:pang4_jau5','เพื่อนของฉัน']]],
 ['你:nei5 星期幾:sing1_kei4_gei2 放假:fong3_gaa3 呀:aa3 ？','คุณหยุดวันไหนของสัปดาห์',[['星期日:sing1_kei4_jat6','วันอาทิตย์'],['三十:saam1_sap6 歲:seoi3','อายุสามสิบปี'],['好:hou2 鍾意:zung1_ji3','ชอบมาก'],['喺:hai2 公園:gung1_jyun2','ที่สวนสาธารณะ']]],
 ['你:nei5 放假:fong3_gaa3 鍾意:zung1_ji3 做:zou6 啲:di1 咩:me1 呀:aa3 ？','วันหยุดคุณชอบทำอะไร',[['我:ngo5 鍾意:zung1_ji3 踩:caai2 單車:daan1_ce1','ฉันชอบปั่นจักรยาน'],['我:ngo5 係:hai6 泰國人:taai3_gwok3_jan4','ฉันเป็นคนไทย'],['星期二:sing1_kei4_ji6 兩點:loeng5_dim2','วันอังคารสองโมง'],['一:jat1 碗:wun2 飯:faan6','ข้าวหนึ่งชาม']]],
 ['你:nei5 買:maai5 咗:zo2 幾多:gei2_do1 條:tiu4 魚:jyu2 呀:aa3 ？','คุณซื้อปลาไปกี่ตัว',[['買:maai5 咗:zo2 三:saam1 條:tiu4','ซื้อสามตัว'],['琴日:kam4_jat6 去:heoi3','ไปเมื่อวาน'],['喺:hai2 街市:gaai1_si5','ที่ตลาด'],['阿仔:aa3_zai2 鍾意:zung1_ji3','ลูกชายชอบ']]],
 ['你:nei5 平時:ping4_si4 睇唔睇:tai2_m4_tai2 電視:din6_si6 呀:aa3 ？','ปกติคุณดูทีวีไหม',[['我:ngo5 好少:hou2_siu2 睇:tai2 電視:din6_si6','ฉันแทบไม่ดูทีวี'],['我哋:ngo5_dei6 六個:luk6_go3 人:jan4','พวกเรามีหกคน'],['喺:hai2 廚房:cyu4_fong2','ที่ห้องครัว'],['好:hou2 高興:gou1_hing3','ดีใจมาก']]],
 ['你:nei5 而家:ji4_gaa1 喺:hai2 邊度:bin1_dou6 呀:aa3 ？','ตอนนี้คุณอยู่ที่ไหน',[['我:ngo5 喺:hai2 廚房:cyu4_fong2','ฉันอยู่ในครัว'],['我:ngo5 叫:giu3 阿蘭:aa3_laan4','ฉันชื่ออาหลาน'],['三點半:saam1_dim2_bun3','สามโมงครึ่ง'],['好:hou2 痛:tung3','เจ็บมาก']]],
 ['你:nei5 幾點鐘:gei2_dim2_zung1 去:heoi3 接:zip3 阿仔:aa3_zai2 放學:fong3_hok6 呀:aa3 ？','คุณไปรับลูกชายเลิกเรียนกี่โมง',[['三點半:saam1_dim2_bun3','สามโมงครึ่ง'],['好:hou2 遠:jyun5','ไกลมาก'],['兩個:loeng5_go3 人:jan4','สองคน'],['唔係:m4_hai6 我:ngo5 嘅:ge3','ไม่ใช่ของฉัน']]],
 ['你:nei5 點樣:dim2_joeng2 去:heoi3 街市:gaai1_si5 呀:aa3 ？','คุณไปตลาดยังไง',[['我:ngo5 行路:haang4_lou6 去:heoi3','ฉันเดินไป'],['三十五:saam1_sap6_ng5 歲:seoi3','อายุสามสิบห้าปี'],['一百:jat1_baak3 蚊:man1','หนึ่งร้อยดอลลาร์'],['好:hou2 新鮮:san1_sin1','สดมาก']]],
 ['你:nei5 今朝:gam1_ziu1 點:dim2 呀:aa3 ？','เช้านี้คุณเป็นยังไงบ้าง',[['我:ngo5 右:jau6 眼:ngaan5 好:hou2 攰:gui6','ตาขวาฉันเหนื่อยมาก'],['一:jat1 隻:zek3 狗:gau2','สุนัขหนึ่งตัว'],['喺:hai2 屋企:uk1_kei2','ที่บ้าน'],['星期六:sing1_kei4_luk6','วันเสาร์']]]
];
function parseSeg(s){return s.split(' ').map(function(t){var i=t.indexOf(':');return i<0?[t,'']:[t.slice(0,i),t.slice(i+1).replace(/_/g,' ')];});}
function segText(g){return g.map(function(x){return x[0];}).join('');}
QA=QA.map(function(x){return {q:parseSeg(x[0]),th:x[1],o:x[2].map(function(o){return {seg:parseSeg(o[0]),th:o[1]};})};});

/* ── 四、句子重組（5 題 × 2 分）：[字, 粵拼, 詞類, 後面標點]；swap／alts 同 B卷 ── */
var SENTS=[
 {th:'เช้านี้ตาขวาของฉันเหนื่อยมาก',alts:[[1,0,2,3,4,5]],
  t:[['今朝','gam1 ziu1','時間詞'],['我','ngo5','代詞'],['右','jau6','方位詞'],['眼','ngaan5','名詞'],['好','hou2','副詞'],['攰','gui6','形容詞','。']]},
 {th:'ฉันว่ายน้ำสัปดาห์ละสองครั้ง',alts:[[1,0,2,3,4]],
  t:[['我','ngo5','代詞'],['一個星期','jat1 go3 sing1 kei4','時間詞'],['游','jau4','動詞'],['兩次','loeng5 ci3','數量'],['水','seoi2','名詞','。']]},
 {th:'บางครั้งอาหลานปั่นจักรยานที่สวนสาธารณะ',alts:[[1,0,2,3,4,5]],
  t:[['阿蘭','aa3 laan4','名詞'],['有時','jau5 si4','副詞'],['喺','hai2','介詞'],['公園','gung1 jyun2','名詞'],['踩','caai2','動詞'],['單車','daan1 ce1','名詞','。']]},
 {th:'คุณยายแทบไม่ค่อยไปเดินป่า เพราะเท้าขวาของท่านเจ็บมาก',
  t:[['婆婆','po4 po2','名詞'],['好少','hou2 siu2','副詞'],['行山','haang4 saan1','動詞','，'],['因為','jan1 wai6','連詞'],['佢','keoi5','代詞'],['隻','zek3','量詞'],['右','jau6','方位詞'],['腳','goek3','名詞'],['好','hou2','副詞'],['痛','tung3','形容詞','。']]},
 {th:'ทุกวันอาทิตย์ฉันก็เล่นแบดมินตันกับเพื่อน',alts:[[1,0,2,3,4,5,6]],
  t:[['每個星期日','mui5 go3 sing1 kei4 jat6','時間詞'],['我','ngo5','代詞'],['都','dou1','副詞'],['同','tung4','介詞'],['朋友','pang4 jau5','名詞'],['打','daa2','動詞'],['羽毛球','jyu5 mou4 kau4','名詞','。']]}
];

/* ── 五、興趣配對（10 組 × 1 分）：[名詞, 粵拼, 動詞, 粵拼]（動詞全部唔同） ── */
var HOB=[
 ['羽毛球','jyu5 mou4 kau4','打','daa2'],['結他','git3 taa1','彈','taan4'],['單車','daan1 ce1','踩','caai2'],['嘢食','je5 sik6','煮','zyu2'],['家務','gaa1 mou6','做','zou6'],
 ['足球','zuk1 kau4','踢','tek3'],['電視','din6 si6','睇','tai2'],['小提琴','siu2 tai4 kam4','拉','laai1'],['歌','go1','唱','coeng3'],['書法','syu1 faat3','寫','se2']
];
/* ── 六、量詞配對（10 組 × 1 分）：頭 5 組係身體量詞；[名詞, 粵拼, 量詞, 粵拼] ── */
var CLF=[
 ['頸','geng2','條','tiu4'],['鼻哥','bei6 go1','個','go3'],['頭髮','tau4 faat3','頭','tau4'],['眼','ngaan5','對','deoi3'],['牙','ngaa4','口','hau2'],
 ['書','syu1','本','bun2'],['衫','saam1','件','gin6'],['洗衣機','sai2 ji1 gei1','部','bou6'],['飯','faan6','碗','wun2'],['屋','uk1','間','gaan1']
];
var MDATA={hob:HOB,clf:CLF};

function q(s){return ROOT.querySelector(s);}
var KEY='cq_'+CFG.QUIZ_ID;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
var Z=null,ticking=null,msel={hob:null,clf:null};
function load(){try{return JSON.parse(localStorage.getItem(KEY));}catch(e){return null;}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(Z));}catch(e){}}
if(location.search.indexOf('reset=teacher')>=0){try{localStorage.removeItem(KEY);}catch(e){}}
function inProgress(){return !!(Z&&Z.quiz&&!Z.submitted);}
(window.qzExams=window.qzExams||{})[4]={prog:inProgress,show:function(){if(!Z)renderStart();}};
function hubR(){if(window.qzHubRefresh)window.qzHubRefresh();}

function getPool(){
  var seen={},pool=[];
  ((typeof S!=='undefined'&&S.data&&S.data.vocab)||[]).forEach(function(w){
    if(w._type!=='Chapter')return;
    var ch=w._num; if(!(ch>=CFG.CHAPTER_MIN&&ch<=CFG.CHAPTER_MAX))return;
    var zh=String(w.char||'').trim(),jp=String(w.jyutping||'').trim(),th=String(w.thai||'').trim();
    if(!zh||!th)return;
    var k=zh+'|'+th; if(seen[k])return; seen[k]=1;
    pool.push([ch,zh,jp,th]);
  });
  return pool;
}
function vocabLive(){return !!(typeof S!=='undefined'&&S.sourceStatus&&S.sourceStatus.vocab==='live');}

function buildQuiz(pool){
  var byCh={}; pool.forEach(function(w){(byCh[w[0]]=byCh[w[0]]||[]).push(w);});
  var lists=shuffle(Object.keys(byCh)).map(function(c){return shuffle(byCh[c]);});
  var picked=[];
  while(picked.length<CFG.VOCAB_COUNT&&lists.some(function(l){return l.length;})){
    for(var i=0;i<lists.length;i++){var l=lists[i]; if(l.length&&picked.length<CFG.VOCAB_COUNT)picked.push(l.pop());}
  }
  picked=shuffle(picked);
  var allTh=[]; pool.forEach(function(x){if(allTh.indexOf(x[3])<0)allTh.push(x[3]);});
  var vocab=picked.map(function(w){
    var wrong=shuffle(allTh.filter(function(t){return t!==w[3];})).slice(0,3);
    var opts=shuffle([w[3]].concat(wrong));
    return {ch:w[0],zh:w[1],jp:w[2],opts:opts,ans:opts.indexOf(w[3])};
  });
  var listen=LQ.map(function(x){var opts=shuffle(x.o);return {q:x.q,th:x.th,opts:opts,ans:opts.indexOf(x.o[0])};});
  var qa=QA.map(function(x){var opts=shuffle(x.o);return {opts:opts,ans:opts.indexOf(x.o[0])};});
  var sent=SENTS.map(function(s){
    var id=s.t.map(function(_,i){return i;}),o=shuffle(id),n=0;
    while(o.every(function(v,i){return v===i;})&&n++<20)o=shuffle(id);
    return {order:o};
  });
  var idx=function(a){return a.map(function(_,i){return i;});};
  return {listen:listen,vocab:vocab,qa:qa,sent:sent,hob:{nouns:shuffle(idx(HOB)),cls:shuffle(idx(HOB))},clf:{nouns:shuffle(idx(CLF)),cls:shuffle(idx(CLF))}};
}
function maxTotal(nV){return LQ.length*PTS.listen+nV*PTS.vocab+QA.length*PTS.qa+SENTS.length*PTS.sent+HOB.length*PTS.hob+CLF.length*PTS.clf;}

function renderStart(){
  ROOT.classList.remove('qz-pm');
  var pool=getPool(),live=vocabLive(),ready=live&&pool.length>=Math.max(8,CFG.VOCAB_COUNT);
  var h='<div class="qz-card qz-intro"><h2>'+TITLE+'</h2><div class="qz-th" style="color:var(--mute);font-size:13px">'+TITLE_TH+'</div><ul>'+
    '<li>限時 <b>'+CFG.DURATION_MIN+' 分鐘</b>，撳「開始測驗」即倒數 <span class="qz-th">· จับเวลา '+CFG.DURATION_MIN+' นาทีทันทีที่เริ่ม</span></li>'+
    '<li>一、聽力 '+LQ.length+' 題（每題'+PTS.listen+'分）　二、詞彙 '+CFG.VOCAB_COUNT+' 題（每題'+PTS.vocab+'分）　三、問答選擇題 '+QA.length+' 題（每題'+PTS.qa+'分）　四、句子重組 '+SENTS.length+' 題（每題'+PTS.sent+'分）　五、興趣配對 '+HOB.length+' 組（每組'+PTS.hob+'分）　六、量詞配對 '+CLF.length+' 組（每組'+PTS.clf+'分）　<b>共 '+maxTotal(CFG.VOCAB_COUNT)+' 分</b></li>'+
    '<li>開始後<b>唔可以轉去其他分頁</b>，離開頁面會被記錄 <span class="qz-th">· ห้ามออกจากหน้านี้ ระบบจะบันทึกไว้</span></li>'+
    '<li>提交後唔可以再改；時間到會自動提交 <span class="qz-th">· ส่งแล้วแก้ไขไม่ได้</span></li></ul>';
  if(ready)h+='<div class="qz-ok">✅ 詞彙已準備好（第'+CFG.CHAPTER_MIN+'–'+CFG.CHAPTER_MAX+'課，共 '+pool.length+' 個）</div><button class="qz-btn big" id="qz4-start">開始測驗 · เริ่มทำข้อสอบ</button>';
  else h+='<div class="qz-err">⚠️ 未讀到最新詞彙（'+(live?'第'+CFG.CHAPTER_MIN+'–'+CFG.CHAPTER_MAX+'課嘅詞彙太少：'+pool.length+' 個':'Google Sheet 未連接')+'），暫時唔可以開考。<br><span class="qz-th">ยังโหลดคำศัพท์ไม่สำเร็จ ยังเริ่มสอบไม่ได้</span></div><button class="qz-btn" id="qz4-reload">🔄 重新載入詞彙 · โหลดใหม่</button>';
  h+='</div>';
  if(/check=teacher/.test(location.search)){
    var cnt={}; pool.forEach(function(w){cnt[w[0]]=(cnt[w[0]]||0)+1;});
    h+='<div class="qz-card"><b>【老師檢查】詞彙共 '+pool.length+' 個</b><br>'+Object.keys(cnt).sort(function(a,b){return a-b;}).map(function(c){return '第'+c+'課：'+cnt[c];}).join('　')+
      '<br><br><table class="qz-tbl"><tr><th>課</th><th>中文</th><th>粵拼</th><th>泰文</th></tr>'+pool.map(function(w){return '<tr><td>'+w[0]+'</td><td>'+esc(w[1])+'</td><td>'+esc(w[2])+'</td><td class="qz-th">'+esc(w[3])+'</td></tr>';}).join('')+'</table></div>';
  }
  ROOT.innerHTML=h;
}
function startExam(){
  var pool=getPool(); if(!vocabLive()||pool.length<Math.max(8,CFG.VOCAB_COUNT))return renderStart();
  if(!confirm('開始後即時倒數 '+CFG.DURATION_MIN+' 分鐘，同埋唔可以轉去其他分頁。\nเริ่มแล้วจับเวลาทันที และออกจากหน้านี้ไม่ได้\n\n確定開始？ ยืนยันเริ่ม?'))return;
  var nul=function(a){return a.map(function(){return null;});};
  Z={start:Date.now(),name:'',leaves:0,plays:{n:0,s:0},qplays:QA.map(function(){return 0;}),submitted:false};
  Z.quiz=buildQuiz(pool);
  Z.ans={listen:nul(Z.quiz.listen),vocab:nul(Z.quiz.vocab),qa:nul(QA),sent:SENTS.map(function(){return [];}),hob:nul(HOB),clf:nul(CLF)};
  save(); render(); startTick(); hubR();
  try{window.scrollTo(0,0);}catch(e){}
}

function ruby(zh,jp){return jp?'<ruby>'+esc(zh)+'<rt>'+esc(jp)+'</rt></ruby>':esc(zh);}
function segHtml(g){return g.map(function(x){return ruby(x[0],x[1]);}).join('');}
function tileHtml(si,ti,inAns){
  var t=SENTS[si].t[ti];
  return '<button class="qz-tile p-'+t[2]+'" data-s="'+si+'" data-t="'+ti+'" data-in="'+(inAns?1:0)+'">'+ruby(t[0],t[1])+(t[3]||'')+(CFG.SHOW_POS?'<span class="qz-pos">'+t[2]+'</span>':'')+'</button>';
}
function renderSent(i){
  var placed=Z.ans.sent[i];
  var pool=Z.quiz.sent[i].order.filter(function(t){return placed.indexOf(t)<0;});
  q('#qz4-ans'+i).innerHTML=placed.map(function(t){return tileHtml(i,t,true);}).join('');
  q('#qz4-pool'+i).innerHTML=pool.map(function(t){return tileHtml(i,t,false);}).join('');
}
function secHead(zh,th,pts){return '<div class="qz-sec">'+zh+' <span class="qz-th" style="font-size:14px;color:var(--mute)">'+th+'</span><span class="qz-spt">'+pts+'</span></div>';}
function optBtns(k,i,opts,sel,cls){return opts.map(function(o,j){
  var inner=cls==='qz-lopt'?'<b class="qz-let">'+'ABCD'[j]+'</b><span class="qz-oz">'+esc(o[0])+(o[1]?'<span class="qz-oth qz-th">'+esc(o[1])+'</span>':'')+'</span>':
            cls==='qz-lopt qa'?'<b class="qz-let">'+'ABCD'[j]+'</b><span class="qz-oz">'+segHtml(o.seg)+'<span class="qz-oth qz-th">'+esc(o.th)+'</span></span>':esc(o);
  return '<button class="qz-opt '+cls+(sel===j?' on':'')+'" data-k="'+k+'" data-i="'+i+'" data-j="'+j+'">'+inner+'</button>';}).join('');}

function render(){
  ROOT.classList.remove('qz-pm');
  var Q=Z.quiz,nL=Q.listen.length,nV=Q.vocab.length,nA=QA.length,nR=SENTS.length,nH=HOB.length,nC=CLF.length;
  var h='<div class="qz-card"><label class="qz-nm" for="qz4-nm">姓名 · ชื่อ-นามสกุล</label><input type="text" id="qz4-nm" autocomplete="off" placeholder="請輸入你嘅名 / กรอกชื่อของคุณ" value="'+esc(Z.name||'')+'"></div>';
  /* 一、聽力 */
  h+=secHead('一、聽力','ฟัง',nL+'題 × '+PTS.listen+'分 = '+nL*PTS.listen+'分');
  h+='<p class="qz-sub">聽一位工人姐姐嘅自我介紹，揀正確答案。每種速度最多播 '+CFG.MAX_PLAYS+' 次。<br><span class="qz-th">ฟังแม่บ้านแนะนำตัว แล้วเลือกคำตอบที่ถูกต้อง เล่นได้สูงสุดความเร็วละ '+CFG.MAX_PLAYS+' ครั้ง</span></p>';
  h+='<div class="qz-card"><div class="qz-ptitle">自我介紹 <span class="qz-th" style="font-weight:600">· แนะนำตัว</span></div><div class="qz-btns"><button class="qz-btn" data-play="n">▶ 正常速度 <span id="qz4-cN"></span></button><button class="qz-btn slow" data-play="s">🐢 慢速 <span id="qz4-cS"></span></button></div>';
  Q.listen.forEach(function(x,i){
    h+='<div class="qz-q"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span><span class="qz-qzh">'+esc(x.q)+'</span><span class="qz-pt">'+PTS.listen+'分</span><span class="qz-thq qz-th">'+esc(x.th)+'</span></div><div class="qz-opts">'+optBtns('listen',i,x.opts,Z.ans.listen[i],'qz-lopt')+'</div></div>';
  });
  h+='</div>';
  /* 二、詞彙 */
  h+=secHead('二、詞彙選擇題','คำศัพท์',nV+'題 × '+PTS.vocab+'分 = '+nV*PTS.vocab+'分');
  h+='<p class="qz-sub">揀出正確嘅意思<br><span class="qz-th">เลือกความหมายที่ถูกต้อง</span></p><div class="qz-card">';
  Q.vocab.forEach(function(x,i){
    h+='<div class="qz-q qz-vq"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-big qz-zh">'+ruby(x.zh,x.jp)+'</div><div class="qz-opts">'+optBtns('vocab',i,x.opts,Z.ans.vocab[i],'qz-th')+'</div></div>';
  });
  h+='</div>';
  /* 三、問答選擇題 */
  h+=secHead('三、問答選擇題','ถาม-ตอบ',nA+'題 × '+PTS.qa+'分 = '+nA*PTS.qa+'分');
  h+='<p class="qz-sub">想像你係工人姐姐，主人家問你問題。撳 🔊 聽問題（每題最多聽 '+CFG.QA_MAX_PLAYS+' 次），揀最啱嘅答案。<br><span class="qz-th">จินตนาการว่าคุณเป็นแม่บ้าน นายจ้างถามคำถาม กด 🔊 ฟังคำถาม (ฟังได้สูงสุดข้อละ '+CFG.QA_MAX_PLAYS+' ครั้ง) แล้วเลือกคำตอบที่เหมาะสมที่สุด</span></p>';
  QA.forEach(function(x,i){
    h+='<div class="qz-card"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span><span class="qz-pt">'+PTS.qa+'分</span></div>'+
      '<div class="qa-q qz-zh">'+segHtml(x.q)+'</div><div class="qz-thq qz-th" style="margin:0 0 8px">'+esc(x.th)+'</div>'+
      '<div class="qz-btns"><button class="qz-btn" data-qp="'+i+'" data-r="n">🔊 聽問題 <span id="qz4-qc'+i+'"></span></button><button class="qz-btn slow" data-qp="'+i+'" data-r="s">🐢 慢速</button></div>'+
      '<div class="qz-opts">'+optBtns('qa',i,Q.qa[i].opts,Z.ans.qa[i],'qz-lopt qa')+'</div></div>';
  });
  /* 四、句子重組 */
  h+=secHead('四、句子重組','เรียงประโยค',nR+'題 × '+PTS.sent+'分 = '+nR*PTS.sent+'分');
  h+='<p class="qz-sub">按泰文意思，將字塊砌成正確句子。撳字塊加入，<b>亦可以拖拉字塊改次序</b>（拖出答案欄＝取消），唔洗重頭嚟過。<br><span class="qz-th">เรียงคำให้เป็นประโยคตามความหมายภาษาไทย แตะคำเพื่อเพิ่ม หรือ<b>ลากคำเพื่อสลับตำแหน่ง</b> (ลากออกนอกช่อง = เอาออก) ไม่ต้องเริ่มใหม่</span></p>';
  SENTS.forEach(function(s,i){
    h+='<div class="qz-card"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-thai-s qz-th">'+esc(s.th)+'</div><div class="qz-ans" id="qz4-ans'+i+'"></div><div class="qz-pool" id="qz4-pool'+i+'"></div><div class="qz-rs"><button class="qz-btn ghost" data-reset="'+i+'" style="padding:6px 12px;font-size:12px">↺ 重來 / เริ่มใหม่</button></div></div>';
  });
  /* 五、興趣配對 */
  h+=secHead('五、興趣配對','จับคู่งานอดิเรก',nH+'組 × '+PTS.hob+'分 = '+nH*PTS.hob+'分');
  h+='<p class="qz-sub">先撳左邊嘅興趣，再撳右邊啱嘅動詞，配成一對（例如：打＋羽毛球）。撳返已配好嘅卡可以取消。<br><span class="qz-th">แตะงานอดิเรกด้านซ้าย แล้วแตะคำกริยาด้านขวาที่ใช้คู่กัน (เช่น 打 + 羽毛球) แตะการ์ดที่จับคู่แล้วเพื่อยกเลิก</span></p><div class="qz-card"><div class="qz-clf" id="qz4-m-hob"></div></div>';
  /* 六、量詞配對 */
  h+=secHead('六、量詞配對','จับคู่ลักษณนาม',nC+'組 × '+PTS.clf+'分 = '+nC*PTS.clf+'分');
  h+='<p class="qz-sub">先撳左邊嘅物件，再撳右邊啱嘅量詞，配成一對（其中 5 組係身體量詞）。撳返已配好嘅卡可以取消。<br><span class="qz-th">แตะคำนามด้านซ้าย แล้วแตะลักษณนามด้านขวาที่ถูกต้อง (5 ข้อเป็นลักษณนามของอวัยวะ) แตะการ์ดที่จับคู่แล้วเพื่อยกเลิก</span></p><div class="qz-card"><div class="qz-clf" id="qz4-m-clf"></div></div>';
  h+='<button class="qz-btn big" id="qz4-submit">提交測驗 · ส่งข้อสอบ</button><p class="qz-note">時間到會自動提交 · หมดเวลาจะส่งอัตโนมัติ</p>';
  ROOT.innerHTML=h;
  SENTS.forEach(function(_,i){renderSent(i);});
  msel={hob:null,clf:null}; renderMatch('hob'); renderMatch('clf');
  updPlays();
}

/* 配對（興趣／量詞）：兩欄卡牌（已打亂），先撳左再撳右；同一個答案（例如兩張一樣嘅量詞）揀邊張都得 */
function partnerOf(g,cid){var A=Z.ans[g];for(var n=0;n<A.length;n++)if(A[n]===cid)return n;return -1;}
function renderMatch(g){
  var el=q('#qz4-m-'+g); if(!el)return;
  var D=MDATA[g],Qm=Z.quiz[g],A=Z.ans[g];
  function card(side,id){
    var paired=side==='n'?A[id]!=null:partnerOf(g,id)>=0;
    var nid=side==='n'?id:partnerOf(g,id);
    var num=paired?Qm.nouns.indexOf(nid)+1:0;
    var sel=msel[g]&&msel[g].side===side&&msel[g].id===id;
    var txt=side==='n'?ruby(D[id][0],D[id][1]):ruby(D[id][2],D[id][3]);
    return '<button class="qz-cc'+(paired?' paired':'')+(sel?' sel':'')+'" data-g="'+g+'" data-side="'+side+'" data-id="'+id+'"'+(paired?' style="--pc:hsl('+(Qm.nouns.indexOf(nid)*36)+',65%,45%)"':'')+'>'+(paired?'<i class="qz-cnum">'+num+'</i>':'')+'<span class="qz-ctx qz-zh">'+txt+'</span></button>';
  }
  el.innerHTML='<div class="qz-ccol">'+Qm.nouns.map(function(id){return card('n',id);}).join('')+'</div><div class="qz-ccol">'+Qm.cls.map(function(id){return card('c',id);}).join('')+'</div>';
}
function matchTap(g,side,id){
  var A=Z.ans[g];
  var paired=side==='n'?A[id]!=null:partnerOf(g,id)>=0;
  if(paired){var n=side==='n'?id:partnerOf(g,id);A[n]=null;msel[g]=null;save();return renderMatch(g);}
  var s=msel[g];
  if(s&&s.side!==side){
    var nn=side==='n'?id:s.id, cc=side==='c'?id:s.id;
    A[nn]=cc;msel[g]=null;save();return renderMatch(g);
  }
  msel[g]=(s&&s.side===side&&s.id===id)?null:{side:side,id:id};
  renderMatch(g);
}
function matchOK(g,i){var a=Z.ans[g][i],D=MDATA[g];return a!=null&&D[a][2]===D[i][2];}

var SYN=window.speechSynthesis||null,VOICE=null,audioEl=null;
function pickVoice(){
  if(!SYN)return; var vs=[]; try{vs=SYN.getVoices()||[];}catch(e){}
  VOICE=vs.filter(function(v){return /zh[-_]HK|yue/i.test(v.lang);})[0]||vs.filter(function(v){return /zh/i.test(v.lang);})[0]||null;
}
if(SYN){pickVoice();if(SYN.addEventListener)SYN.addEventListener('voiceschanged',pickVoice);}
function stopSpeech(){try{if(SYN)SYN.cancel();}catch(e){} try{if(audioEl)audioEl.pause();}catch(e){}}
function speakText(text,rate){
  if(!SYN){alert('呢部機唔支援語音 อุปกรณ์นี้ไม่รองรับเสียง');return false;}
  var busy=false; try{busy=SYN.speaking||SYN.pending;}catch(e){}
  var go=function(){
    var u=new SpeechSynthesisUtterance(text);
    if(VOICE)u.voice=VOICE; u.lang=(VOICE&&VOICE.lang)||'zh-HK'; u.rate=rate;
    SYN.speak(u);
  };
  try{if(audioEl)audioEl.pause();}catch(e){}
  if(busy){SYN.cancel();setTimeout(go,80);}else go();
  return true;
}
function updPlays(){
  var cN=q('#qz4-cN'),cS=q('#qz4-cS');
  if(cN&&cS){
    cN.textContent='('+(CFG.MAX_PLAYS-Z.plays.n)+')'; cS.textContent='('+(CFG.MAX_PLAYS-Z.plays.s)+')';
    q('[data-play="n"]').disabled=Z.plays.n>=CFG.MAX_PLAYS;
    q('[data-play="s"]').disabled=Z.plays.s>=CFG.MAX_PLAYS;
  }
  QA.forEach(function(_,i){
    var left=CFG.QA_MAX_PLAYS-(Z.qplays[i]||0),c=q('#qz4-qc'+i); if(!c)return;
    c.textContent='('+left+')';
    ROOT.querySelectorAll('[data-qp="'+i+'"]').forEach(function(b){b.disabled=left<=0;});
  });
}
function play(kind){
  if(Z.plays[kind]>=CFG.MAX_PLAYS)return;
  var url=CFG.AUDIO[kind],rate=kind==='n'?0.9:0.55;
  if(url){stopSpeech();audioEl=new Audio(url);audioEl.play().catch(function(){alert('播放失敗 เล่นเสียงไม่สำเร็จ');});}
  else if(!speakText(PASSAGE,rate))return;
  Z.plays[kind]++; save(); updPlays();
}
function playQ(i,kind){
  if((Z.qplays[i]||0)>=CFG.QA_MAX_PLAYS)return;
  if(!speakText(segText(QA[i].q),kind==='n'?0.9:0.55))return;
  Z.qplays[i]=(Z.qplays[i]||0)+1; save(); updPlays();
}

function chipEl(){return document.getElementById('qz-timer');}
function tick(){
  if(!inProgress())return stopTick();
  var left=CFG.DURATION_MIN*60000-(Date.now()-Z.start),t=chipEl();
  if(left<=0){if(t)t.textContent='00:00';submit(true);return;}
  var s=Math.ceil(left/1000);
  if(t){t.style.display='';t.textContent='⏱ '+String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');t.classList.toggle('qz-warn',s<=300);}
}
function startTick(){stopTick();tick();ticking=setInterval(tick,1000);}
function stopTick(){clearInterval(ticking);ticking=null;var t=chipEl();if(t){t.style.display='none';t.classList.remove('qz-warn');}}

function sentOK(s,i){
  var a=Z.ans.sent[i]; if(a.length!==s.t.length)return false;
  if(a.every(function(v,k){return v===k;}))return true;
  var ok=[];
  if(s.swap){var b=s.t.map(function(_,k){return k;});b[s.swap[0]]=s.swap[1];b[s.swap[1]]=s.swap[0];ok.push(b);}
  (s.alts||[]).forEach(function(o){ok.push(o);});   // alts：其他都接受嘅完整次序
  return ok.some(function(o){return a.every(function(v,k){return v===o[k];});});
}
function isStd(s,i){var a=Z.ans.sent[i];return a.length===s.t.length&&a.every(function(v,k){return v===k;});}
function scoreAll(){
  var Q=Z.quiz,a=Z.ans;
  var nL=Q.listen.filter(function(x,i){return a.listen[i]===x.ans;}).length;
  var nV=Q.vocab.filter(function(x,i){return a.vocab[i]===x.ans;}).length;
  var nA=Q.qa.filter(function(x,i){return a.qa[i]===x.ans;}).length;
  var nR=SENTS.filter(function(s,i){return sentOK(s,i);}).length;
  var nH=HOB.filter(function(_,i){return matchOK('hob',i);}).length;
  var nC=CLF.filter(function(_,i){return matchOK('clf',i);}).length;
  var L=nL*PTS.listen,V=nV*PTS.vocab,A=nA*PTS.qa,R=nR*PTS.sent,H=nH*PTS.hob,C=nC*PTS.clf;
  var max={L:Q.listen.length*PTS.listen,V:Q.vocab.length*PTS.vocab,A:QA.length*PTS.qa,R:SENTS.length*PTS.sent,H:HOB.length*PTS.hob,C:CLF.length*PTS.clf};
  return {L:L,V:V,A:A,R:R,H:H,C:C,total:L+V+A+R+H+C,max:max,maxAll:max.L+max.V+max.A+max.R+max.H+max.C};
}
function report(sc,auto){
  var Q=Z.quiz,a=Z.ans,used=Math.min(CFG.DURATION_MIN*60,Math.round((Z.endAt-Z.start)/1000)),out=[];
  var ok=function(b){return b?'✓':'✗';};
  out.push('姓名：'+(Z.name||'(未填)'));
  out.push('總分：'+sc.total+'/'+sc.maxAll);
  out.push('　聽力 '+sc.L+'/'+sc.max.L+'　詞彙 '+sc.V+'/'+sc.max.V+'　問答 '+sc.A+'/'+sc.max.A+'　句子重組 '+sc.R+'/'+sc.max.R+'　興趣配對 '+sc.H+'/'+sc.max.H+'　量詞配對 '+sc.C+'/'+sc.max.C);
  out.push('用時：'+Math.floor(used/60)+'分'+(used%60)+'秒　'+(auto?'（時間到自動提交）':''));
  out.push('離開頁面次數：'+(Z.leaves||0));
  out.push('提交時間：'+new Date(Z.endAt).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong'}));
  out.push('\n【一、聽力】');
  Q.listen.forEach(function(x,i){out.push((i+1)+'. '+x.q+' → '+(a.listen[i]==null?'(未答)':x.opts[a.listen[i]][0])+' '+(a.listen[i]===x.ans?'✓':'✗（正確：'+x.opts[x.ans][0]+'）'));});
  out.push('\n【二、詞彙】');
  Q.vocab.forEach(function(x,i){out.push((i+1)+'. [L'+x.ch+'] '+x.zh+' → '+(a.vocab[i]==null?'(未答)':x.opts[a.vocab[i]])+' '+(a.vocab[i]===x.ans?'✓':'✗（正確：'+x.opts[x.ans]+'）'));});
  out.push('\n【三、問答選擇題】');
  Q.qa.forEach(function(x,i){out.push((i+1)+'. '+segText(QA[i].q)+' → '+(a.qa[i]==null?'(未答)':segText(x.opts[a.qa[i]].seg))+' '+(a.qa[i]===x.ans?'✓':'✗（正確：'+segText(x.opts[x.ans].seg)+'）')+'　聽 '+(Z.qplays[i]||0)+' 次');});
  out.push('\n【四、句子重組】');
  SENTS.forEach(function(s,i){
    var txt=function(ids){return ids.map(function(t){return s.t[t][0]+(s.t[t][3]||'');}).join(' ');};
    var g=sentOK(s,i),std=isStd(s,i);
    out.push((i+1)+'. '+ok(g)+(g&&!std?'（備選次序，照計分）':'')+' 學生：'+(txt(a.sent[i])||'(未答)')+(g&&std?'':'\n    標準：'+txt(s.t.map(function(_,k){return k;})))+(std?'':'\n    次序碼：['+a.sent[i].join(',')+']（如要接受，將呢組加入呢題嘅 alts）'));
  });
  out.push('\n【五、興趣配對】');
  HOB.forEach(function(c,i){out.push((i+1)+'. '+c[0]+' → '+(a.hob[i]==null?'(未配)':HOB[a.hob[i]][2])+' '+ok(matchOK('hob',i))+(matchOK('hob',i)?'':'（正確：'+c[2]+'）'));});
  out.push('\n【六、量詞配對】');
  CLF.forEach(function(c,i){out.push((i+1)+'. '+c[0]+' → '+(a.clf[i]==null?'(未配)':CLF[a.clf[i]][2])+' '+ok(matchOK('clf',i))+(matchOK('clf',i)?'':'（正確：'+c[2]+'）'));});
  return out.join('\n');
}
async function sendResult(){
  var sc=scoreAll(),body=report(sc,Z.auto);
  var subject='廣東話課堂測驗（三）第15-19課 – '+(Z.name||'未填名')+' – '+sc.total+'/'+sc.maxAll;
  if(CFG.FORM_ENDPOINT){
    try{
      var r=await fetch(CFG.FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({_subject:subject,name:Z.name||'',score:sc.total+'/'+sc.maxAll,message:body})});
      if(r.ok){Z.sent=true;save();return 'ok';}
    }catch(e){}
    return 'fail';
  }
  if(CFG.TEACHER_EMAIL){location.href='mailto:'+CFG.TEACHER_EMAIL+'?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);return 'mailto';}
  return 'noconfig';
}
async function submit(auto){
  if(!inProgress())return;
  if(!auto){
    if(!(Z.name||'').trim()){alert('請先填姓名 กรุณากรอกชื่อก่อน');var n=q('#qz4-nm');if(n)n.focus();return;}
    var a=Z.ans,nn=function(arr){return arr.filter(function(x){return x==null;}).length;};
    var left=nn(a.listen)+nn(a.vocab)+nn(a.qa)+a.sent.filter(function(x){return !x.length;}).length+nn(a.hob)+nn(a.clf);
    var warn=left?'仲有 '+left+' 題未答。\nยังไม่ได้ตอบอีก '+left+' ข้อ\n\n':'';
    if(!confirm(warn+'確定提交？提交後唔可以再改。\nยืนยันการส่ง? ส่งแล้วแก้ไขไม่ได้'))return;
  }
  Z.submitted=true;Z.auto=!!auto;Z.endAt=Date.now();save();
  stopTick();stopSpeech();
  renderPaper();setStatus('wait');hubR();
  setStatus(await sendResult());
}

function setStatus(state){
  var m={wait:['wait','傳送緊… กำลังส่ง…'],ok:['ok','✓ 已寄俾老師 ส่งครูแล้ว'],fail:['bad','✗ 傳送失敗 ส่งไม่สำเร็จ'],mailto:['wait','請喺電郵程式撳「傳送」 กดส่งในแอปอีเมล'],noconfig:['bad','未設定收件電郵，請截圖畀老師 แคปหน้าจอส่งครู']}[state]||['wait',''];
  var el=q('#qz4-stat'); if(!el)return;
  el.className='qz-st '+m[0]; el.textContent=m[1];
  var rb=q('#qz4-resend'); if(rb)rb.style.display=(state==='ok'||state==='wait')?'none':'';
}
function mk(ok){return ok?'<span class="qz-mk ok">✓</span>':'<span class="qz-mk no">✗</span>';}
function chip(got,max){return '<span class="qz-pts '+(got===max?'right':got===0?'wrong':'half')+'">'+got+'/'+max+'分</span>';}
function renderPaper(){
  var Q=Z.quiz,a=Z.ans,sc=scoreAll(),end=Z.endAt||Date.now();
  var used=Math.min(CFG.DURATION_MIN*60,Math.round((end-Z.start)/1000)),pct=Math.round(sc.total/sc.maxAll*100),LT='ABCD';
  var optList=function(opts,ans,mine,thai,fmt){
    fmt=fmt||esc;
    return '<ul class="qz-po">'+opts.map(function(o,j){
      var c=j===ans?'corr':(j===mine?'bad':'');
      var tag=j===ans?'<span class="qz-tag">✓ 正確答案</span>':(j===mine?'<span class="qz-tag">✗ 你嘅答案</span>':'');
      return '<li class="'+c+(thai?' qz-th':'')+'">'+LT[j]+'. '+fmt(o)+(j===ans&&j===mine?'<span class="qz-tag"> · 你嘅答案</span>':'')+tag+'</li>';
    }).join('')+'</ul>'+(mine==null?'<div class="qz-th" style="color:var(--red);font-size:13px;margin-top:4px">未作答 · ไม่ได้ตอบ</div>':'');
  };
  var h='<div class="qz-vbar"><span class="qz-fn">課堂測驗(三)_第15-19課_'+esc(Z.name||'')+'.pdf</span><span class="qz-st wait" id="qz4-stat"></span><button id="qz4-resend" style="display:none">重新傳送</button><button id="qz4-print">🖨 儲存 PDF</button></div><div class="qz-paper">';
  h+='<h2>'+TITLE+'</h2><div class="qz-en">'+TITLE_TH+'</div>';
  h+='<div class="qz-meta"><span><b>姓名：</b>'+esc(Z.name||'')+'</span><span><b>提交：</b>'+esc(new Date(end).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong',hour12:false}))+'</span><span><b>用時：</b>'+Math.floor(used/60)+'分'+(used%60)+'秒'+(Z.auto?'（時間到）':'')+'</span></div>';
  h+='<div class="qz-scorebox"><div class="qz-stamp"><small>總分 SCORE</small>'+sc.total+' / '+sc.maxAll+'<small>'+pct+'%</small></div><div class="qz-parts"><span>一、聽力</span><b>'+sc.L+' / '+sc.max.L+'</b><br><span>二、詞彙</span><b>'+sc.V+' / '+sc.max.V+'</b><br><span>三、問答選擇題</span><b>'+sc.A+' / '+sc.max.A+'</b><br><span>四、句子重組</span><b>'+sc.R+' / '+sc.max.R+'</b><br><span>五、興趣配對</span><b>'+sc.H+' / '+sc.max.H+'</b><br><span>六、量詞配對</span><b>'+sc.C+' / '+sc.max.C+'</b></div></div>';
  /* 一 */
  h+='<div class="qz-psec"><span>一、聽力 <small class="qz-th">ฟัง</small></span><small>'+sc.L+' / '+sc.max.L+'</small></div>';
  h+='<div class="qz-scr"><b>錄音內容：</b>'+esc(PASSAGE)+'</div>';
  Q.listen.forEach(function(x,i){var g=a.listen[i]===x.ans;
    h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'. '+esc(x.q)+'<small>'+esc(x.th)+'</small></span>'+chip(g?PTS.listen:0,PTS.listen)+'</div>'+optList(x.opts,x.ans,a.listen[i],false,function(o){return esc(o[0])+(o[1]?' <span class="qz-th qz-pth">· '+esc(o[1])+'</span>':'');})+'</div>';});
  /* 二 */
  h+='<div class="qz-psec"><span>二、詞彙選擇題 <small class="qz-th">คำศัพท์</small></span><small>'+sc.V+' / '+sc.max.V+'</small></div>';
  Q.vocab.forEach(function(x,i){var g=a.vocab[i]===x.ans;
    h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'.<span class="qz-ch">第'+x.ch+'課</span></span>'+chip(g?PTS.vocab:0,PTS.vocab)+'</div><div class="qz-vw">'+ruby(x.zh,x.jp)+'</div>'+optList(x.opts,x.ans,a.vocab[i],true)+'</div>';});
  /* 三 */
  h+='<div class="qz-psec"><span>三、問答選擇題 <small class="qz-th">ถาม-ตอบ</small></span><small>'+sc.A+' / '+sc.max.A+'</small></div>';
  Q.qa.forEach(function(x,i){var g=a.qa[i]===x.ans;
    h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'.</span>'+chip(g?PTS.qa:0,PTS.qa)+'</div><div class="qz-vw" style="font-size:22px">'+segHtml(QA[i].q)+'</div><div class="qz-thp">'+esc(QA[i].th)+'</div>'+
      optList(x.opts,x.ans,a.qa[i],false,function(o){return segHtml(o.seg)+' <span class="qz-th qz-pth">· '+esc(o.th)+'</span>';})+'</div>';});
  /* 四 */
  h+='<div class="qz-psec"><span>四、句子重組 <small class="qz-th">เรียงประโยค</small></span><small>'+sc.R+' / '+sc.max.R+'</small></div>';
  SENTS.forEach(function(s,i){var g=sentOK(s,i);
    var row=function(ids){return ids.map(function(t){return '<span class="qz-stile">'+ruby(s.t[t][0],s.t[t][1])+esc(s.t[t][3]||'')+'</span>';}).join('');};
    h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'.</span>'+chip(g?PTS.sent:0,PTS.sent)+'</div>'+(g&&!isStd(s,i)?'<div class="qz-th" style="font-size:12px;color:#b36b00">★ 備選次序（同標準答案唔同，但都接受）· ลำดับอื่นที่ยอมรับ</div>':'')+'<div class="qz-thp">'+esc(s.th)+'</div>'+
      '<div class="qz-srow"><b>你嘅答案</b><div class="qz-stiles '+(g?'good':'mine-bad')+'">'+(a.sent[i].length?row(a.sent[i]):'<span class="qz-th" style="font-size:14px;color:var(--red)">未作答 · ไม่ได้ตอบ</span>')+'</div></div>'+
      (g?'':'<div class="qz-srow"><b>正確答案</b><div class="qz-stiles ans-ok">'+row(s.t.map(function(_,k){return k;}))+'</div></div>')+'</div>';});
  /* 五、六：配對 */
  var matchPaper=function(g,title,thai,scv,maxv,pt){
    var D=MDATA[g];
    h+='<div class="qz-psec"><span>'+title+' <small class="qz-th">'+thai+'</small></span><small>'+scv+' / '+maxv+'</small></div>';
    D.forEach(function(c,i){var g2=matchOK(g,i),m=a[g][i];
      h+='<div class="qz-pq '+(g2?'right':'wrong')+'"><div class="qz-pqh">'+mk(g2)+'<span>'+(i+1)+'.</span><span class="qz-vw" style="padding:0;font-size:22px">'+ruby(c[0],c[1])+'</span><span style="margin-left:auto;font-weight:400;font-size:15px">你嘅答案：'+(m==null?'<span class="qz-th" style="color:var(--red)">未配 · ไม่ได้จับคู่</span>':'<b>'+ruby(D[m][2],D[m][3])+'</b>')+(g2?'':'　正確：<b>'+ruby(c[2],c[3])+'</b>')+'</span>'+chip(g2?pt:0,pt)+'</div></div>';});
  };
  matchPaper('hob','五、興趣配對','จับคู่งานอดิเรก',sc.H,sc.max.H,PTS.hob);
  matchPaper('clf','六、量詞配對','จับคู่ลักษณนาม',sc.C,sc.max.C,PTS.clf);
  h+='<div class="qz-foot">— 完 · จบ —<br>此試卷已提交，唯讀 · ส่งแล้ว ไม่สามารถแก้ไขได้</div></div>';
  ROOT.classList.add('qz-pm');
  ROOT.innerHTML=h;
  try{window.scrollTo(0,0);}catch(e){}
  q('#qz4-resend').onclick=async function(){setStatus('wait');setStatus(await sendResult());};
  q('#qz4-print').onclick=function(){
    document.body.classList.add('qz-print');
    var done=function(){document.body.classList.remove('qz-print');window.removeEventListener('afterprint',done);};
    window.addEventListener('afterprint',done);
    window.print(); setTimeout(done,2000);
  };
}

['contextmenu','copy','cut','paste','dragstart','selectstart'].forEach(function(ev){
  ROOT.addEventListener(ev,function(e){if(!(e.target&&e.target.tagName==='INPUT'))e.preventDefault();});
});
function quizVisible(){return ROOT.offsetParent!==null;}
document.addEventListener('keydown',function(e){
  if(!quizVisible())return;
  var k=(e.key||'').toLowerCase(),inInput=e.target&&e.target.tagName==='INPUT',done=Z&&Z.submitted;
  if(e.key==='F12'||((e.ctrlKey||e.metaKey)&&['c','v','x','u','s','a','f'].indexOf(k)>=0&&!inInput)||((e.ctrlKey||e.metaKey)&&k==='p'&&!done)||((e.ctrlKey||e.metaKey)&&e.shiftKey&&['i','j','c'].indexOf(k)>=0))e.preventDefault();
});
document.addEventListener('visibilitychange',function(){if(document.hidden&&inProgress()){Z.leaves=(Z.leaves||0)+1;save();}});
window.addEventListener('beforeunload',function(e){if(inProgress()){e.preventDefault();e.returnValue='';}});

ROOT.addEventListener('click',function(e){
  var t=e.target;
  if(t.closest('#qz4-start'))return startExam();
  if(t.closest('#qz4-reload')){
    var b=t.closest('#qz4-reload'); b.disabled=true; b.textContent='讀緊… กำลังโหลด…';
    Promise.resolve(typeof refreshFromSheets==='function'&&refreshFromSheets()).then(function(){renderStart();},function(){renderStart();});
    return;
  }
  if(!inProgress())return;
  var o=t.closest('.qz-opt');
  if(o){var k=o.dataset.k,i=+o.dataset.i,j=+o.dataset.j;Z.ans[k][i]=j;
    ROOT.querySelectorAll('.qz-opt[data-k="'+k+'"][data-i="'+i+'"]').forEach(function(bt){bt.classList.toggle('on',+bt.dataset.j===j);});save();return;}
  var tl=t.closest('.qz-tile');
  if(tl){var s=+tl.dataset.s,id=+tl.dataset.t,arr=Z.ans.sent[s];
    if(tl.dataset.in==='1')arr.splice(arr.indexOf(id),1);else arr.push(id);
    renderSent(s);save();return;}
  var r=t.closest('[data-reset]');
  if(r){var s2=+r.dataset.reset;Z.ans.sent[s2]=[];renderSent(s2);save();return;}
  var cc=t.closest('.qz-cc'); if(cc)return matchTap(cc.dataset.g,cc.dataset.side,+cc.dataset.id);
  var qp=t.closest('[data-qp]'); if(qp)return playQ(+qp.dataset.qp,qp.dataset.r);
  var p=t.closest('[data-play]'); if(p)return play(p.dataset.play);
  if(t.closest('#qz4-submit'))return submit(false);
});
if(window.qzDrag)window.qzDrag(ROOT,'qz4-',{active:inProgress,arr:function(si){return Z.ans.sent[si];},change:function(si){renderSent(si);save();}});
ROOT.addEventListener('input',function(e){if(e.target.id==='qz4-nm'&&Z){Z.name=e.target.value;save();}});

/* 同主 App 接口：接上測驗（一）（二）已定義嘅 hook */
var g1=window.qzGuard,l1=window.qzLeave,s1=window.qzShow,r1=window.qzResume;
window.qzGuard=function(tab){
  if(g1&&!g1(tab))return false;
  if(!CFG.LOCK_NAV||!inProgress()||tab==='quiz')return true;
  alert('測驗進行中，唔可以離開呢頁。請先提交測驗。\nกำลังสอบอยู่ ออกจากหน้านี้ไม่ได้ กรุณาส่งข้อสอบก่อน');
  return false;
};
window.qzShow=function(){ if(s1)s1(); if(!Z)renderStart(); hubR(); };
window.qzLeave=function(){ if(l1)l1(); stopSpeech(); };
window.qzResume=function(){ if(r1)r1(); if(inProgress()&&typeof showTab==='function')showTab('quiz'); };

Z=load();
if(Z&&Z.submitted){renderPaper();setStatus(Z.sent?'ok':'fail');}
else if(inProgress()){render();startTick();}
else{Z=null;renderStart();}
hubR(); window.qzResume();
})();
