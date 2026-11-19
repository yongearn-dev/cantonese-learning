/* ══ 課堂測驗（二）B卷 · 第8–14課 ══ 詞彙用主 App 已讀入嘅 Google Sheet（S.data.vocab） */
(function(){
'use strict';
var ROOT=document.getElementById('qz3-root'); if(!ROOT)return;
var CFG={
  DURATION_MIN:60,
  QUIZ_ID:'cantonese-l8-14-b-v1',
  FORM_ENDPOINT:'https://formspree.io/f/xbgdbeje',
  TEACHER_EMAIL:'yongearn@gmail.com',
  AUDIO:[{n:'',s:''},{n:'',s:''},{n:'',s:''},{n:'',s:''}], // 可選：四段聽力嘅 mp3
  MAX_PLAYS:3, SHOW_POS:true, VOCAB_COUNT:20,
  CHAPTER_MIN:8, CHAPTER_MAX:14,
  LOCK_NAV:true
};
var PTS={listen:2,vocab:1,sent:2,opp:1};
var TITLE='課堂測驗（二）B卷 · 第8–14課', TITLE_TH='แบบทดสอบในชั้นเรียน (2) ชุด B บทที่ 8–14';
var PASSAGES=[
 {text:'我嫲嫲六十八歲，佢養咗一隻狗同三條魚，每日朝早七點鐘帶狗去公園行一個鐘。',
  qs:[
   {q:'嫲嫲幾多歲？',th:'คุณย่าอายุเท่าไร',opts:[['68歲','อายุ 68 ปี'],['86歲','อายุ 86 ปี'],['58歲','อายุ 58 ปี'],['78歲','อายุ 78 ปี']]},
   {q:'嫲嫲養咗啲乜嘢？',th:'คุณย่าเลี้ยงอะไรบ้าง',opts:[['一隻狗同三條魚','สุนัขหนึ่งตัวและปลาสามตัว'],['兩隻貓同三條魚','แมวสองตัวและปลาสามตัว'],['一隻狗同三隻雀仔','สุนัขหนึ่งตัวและนกสามตัว'],['一隻貓同兩條魚','แมวหนึ่งตัวและปลาสองตัว']]},
   {q:'嫲嫲幾點鐘帶狗去公園？',th:'คุณย่าพาสุนัขไปสวนสาธารณะกี่โมง',opts:[['七點鐘','7 โมงเช้า'],['八點鐘','8 โมงเช้า'],['六點鐘','6 โมงเช้า'],['九點鐘','9 โมงเช้า']]}]},
 {text:'我哥哥叫王大文，佢係一個又高又肥嘅泰國人，鍾意喺廚房食嘢。',
  qs:[
   {q:'哥哥係一個點樣嘅人？',th:'พี่ชายเป็นคนแบบไหน',opts:[['又高又肥嘅泰國人','คนไทยที่สูงและอ้วน'],['又高又瘦嘅泰國人','คนไทยที่สูงและผอม'],['又矮又肥嘅泰國人','คนไทยที่เตี้ยและอ้วน'],['又高又肥嘅香港人','คนฮ่องกงที่สูงและอ้วน']]},
   {q:'哥哥鍾意喺邊度食嘢？',th:'พี่ชายชอบกินของที่ไหน',opts:[['廚房','ห้องครัว'],['廁所','ห้องน้ำ'],['公園','สวนสาธารณะ'],['房間','ห้องนอน']]}]},
 {text:'學校前面有一間好細嘅診所，行五分鐘就到，星期一好多人睇醫生，所以星期二去人會少啲。',
  qs:[
   {q:'行去診所要幾耐？',th:'เดินไปคลินิกใช้เวลานานเท่าไร',opts:[['五分鐘','5 นาที'],['十五分鐘','15 นาที'],['七分鐘','7 นาที'],['十分鐘','10 นาที']]},
   {q:'點解話星期二去會好啲？',th:'ทำไมถึงบอกว่าไปวันอังคารจะดีกว่า',opts:[['因為星期二人少啲','เพราะวันอังคารคนน้อยกว่า'],['因為星期二診所放假','เพราะวันอังคารคลินิกปิด'],['因為星期二醫生更多','เพราะวันอังคารมีหมอมากกว่า'],['因為星期二唔使錢','เพราะวันอังคารไม่เสียเงิน']]}]},
 {text:'爸爸同公公星期六八點去飲茶，跟住去街市買餸，下晝返屋企煮飯，晚飯後去公園行下，九點鐘上床瞓覺。',
  qs:[
   {q:'爸爸同公公幾時去飲茶？',th:'พ่อกับคุณตาไปดื่มชา (ยำฉ่า) เมื่อไร',opts:[['星期六八點','วันเสาร์ 8 โมง'],['星期六九點','วันเสาร์ 9 โมง'],['星期日八點','วันอาทิตย์ 8 โมง'],['星期五八點','วันศุกร์ 8 โมง']]},
   {q:'飲完茶之後佢哋去邊度？',th:'หลังดื่มชา พวกเขาไปที่ไหนต่อ',opts:[['街市','ตลาด'],['公園','สวนสาธารณะ'],['超級市場','ซูเปอร์มาร์เก็ต'],['診所','คลินิก']]},
   {q:'佢哋幾點鐘上床瞓覺？',th:'พวกเขาขึ้นเตียงนอนกี่โมง',opts:[['九點鐘','3 ทุ่ม (21:00 น.)'],['十點鐘','4 ทุ่ม (22:00 น.)'],['八點鐘','2 ทุ่ม (20:00 น.)'],['十一點鐘','5 ทุ่ม (23:00 น.)']]}]}
];
var SENTS=[ // swap：呢兩個字塊調轉次序都照計分；alts：其他都接受嘅完整次序
 {th:'คุณยายกับคุณตาไปตลาดซื้อกับข้าวด้วยกัน',swap:[0,2],
  t:[['婆婆','po4 po2','名詞'],['同','tung4','連詞'],['公公','gung1 gung1','名詞'],['一齊','jat1 cai4','副詞'],['去','heoi3','動詞'],['街市','gaai1 si5','名詞'],['買餸','maai5 sung3','動詞','。']]},
 {th:'ลิงสามตัวนั่งอยู่บนต้นไม้ กินกล้วย',
  t:[['三','saam1','數詞'],['隻','zek3','量詞'],['馬騮','maa5 lau1','名詞'],['坐','co5','動詞'],['喺','hai2','介詞'],['樹','syu6','名詞'],['上面','soeng6 min6','方位詞'],['食','sik6','動詞'],['香蕉','hoeng1 ziu1','名詞','。']]},
 {th:'พี่ชายเพิ่งซื้อกระเป๋าสตางค์ใบใหม่หนึ่งใบที่ซูเปอร์มาร์เก็ต',alts:[[1,0,2,3,4,5,6,7,8]],
  t:[['哥哥','go4 go1','名詞'],['啱啱','ngaam1 ngaam1','副詞'],['喺','hai2','介詞'],['超級市場','ciu1 kap1 si5 coeng4','名詞'],['買','maai5','動詞'],['咗','zo2','助詞'],['一個','jat1 go3','數量'],['新','san1','形容詞'],['銀包','ngan4 baau1','名詞','。']]},
 {th:'ในโรงเรียนมีนักเรียนสิบคนและครูหนึ่งท่าน',
  t:[['學校','hok6 haau6','名詞'],['裡面','leoi5 min6','方位詞'],['有','jau5','動詞'],['十個','sap6 go3','數量'],['學生','hok6 saang1','名詞'],['同','tung4','連詞'],['一位','jat1 wai2','數量'],['老師','lou5 si1','名詞','。']]},
 {th:'แม่ไปเดินเล่นที่สวนสาธารณะหลังกินข้าวเย็นทุกวัน',alts:[[1,2,0,3,4,5],[0,2,1,3,4,5]],
  t:[['媽媽','maa1 maa1','名詞'],['每日','mui5 jat6','時間詞'],['晚飯後','maan5 faan6 hau6','時間詞'],['去','heoi3','動詞'],['公園','gung1 jyun2','名詞'],['行下','haang4 haa5','動詞','。']]}
];
var OPP=[
 {s:'我屋企嗰隻狗好大',th:'สุนัขที่บ้านของฉันตัวใหญ่มาก',cw:'狗',c:['隻','本','張'],aw:'大',o:['細','長']},
 {s:'細佬着住一條好長嘅褲',th:'น้องชายใส่กางเกงขายาวมากหนึ่งตัว',cw:'褲',c:['條','間','隻'],aw:'長',o:['短','肥']},
 {s:'媽媽杯水好凍',th:'น้ำแก้วของแม่เย็นมาก',cw:'水',c:['杯','本','條'],aw:'凍',o:['熱','甜']},
 {s:'前面間診所好近',th:'คลินิกที่อยู่ข้างหน้าอยู่ใกล้มาก',cw:'診所',c:['間','隻','本'],aw:'近',o:['遠','細']},
 {s:'呢個蘋果好貴',th:'แอปเปิลลูกนี้แพงมาก',cw:'蘋果',c:['個','隻','條'],aw:'貴',o:['平','舊']},
 {s:'嗰個學生好矮',th:'นักเรียนคนนั้นเตี้ยมาก',cw:'學生',c:['個','本','條'],aw:'矮',o:['高','多']},
 {s:'樹上面有兩隻雀仔好嘈',th:'บนต้นไม้มีนกสองตัวเสียงดังมาก',cw:'雀仔',c:['隻','條','張'],aw:'嘈',o:['靜','臭']},
 {s:'呢張枱好重',th:'โต๊ะตัวนี้หนักมาก',cw:'枱',c:['張','隻','本'],aw:'重',o:['輕','厚']},
 {s:'嗰隻馬騮行得好慢',th:'ลิงตัวนั้นเดินช้ามาก',cw:'馬騮',c:['隻','條','張'],aw:'慢',o:['快','高']},
 {s:'嗰位婆婆好瘦',th:'คุณยายท่านนั้นผอมมาก',cw:'婆婆',c:['位','隻','條'],aw:'瘦',o:['肥','矮']}
];
var OTH={};
var JPW={'條':'tiu4','件':'gin6','張':'zoeng1','碗':'wun2','杯':'bui1','隻':'zek3','本':'bun2','間':'gaan1','首':'sau2','個':'go3','位':'wai2',
 '細':'sai3','長':'coeng4','短':'dyun2','熱':'jit6','甜':'tim4','遠':'jyun5','平':'peng4','舊':'gau6','高':'gou1','多':'do1','靜':'zing6','臭':'cau3','輕':'hing1','厚':'hau5','快':'faai3','肥':'fei4','矮':'ai2','貴':'gwai3','凍':'dung3','大':'daai6'};
var OPPX=[
 {cj:'gau2',aj:'daai6',seg:[['我','ngo5'],['屋企','uk1 kei2'],['嗰','go2'],['隻','zek3','c'],['狗','gau2'],['好','hou2'],['大','daai6','a']]},
 {cj:'fu3',aj:'coeng4',seg:[['細佬','sai3 lou2'],['着住','zoek3 zyu6'],['一','jat1'],['條','tiu4','c'],['好','hou2'],['長','coeng4','a'],['嘅','ge3'],['褲','fu3']]},
 {cj:'seoi2',aj:'dung3',seg:[['媽媽','maa1 maa1'],['杯','bui1','c'],['水','seoi2'],['好','hou2'],['凍','dung3','a']]},
 {cj:'can2 so2',aj:'gan6',seg:[['前面','cin4 min6'],['間','gaan1','c'],['診所','can2 so2'],['好','hou2'],['近','gan6','a']]},
 {cj:'ping4 gwo2',aj:'gwai3',seg:[['呢','ni1'],['個','go3','c'],['蘋果','ping4 gwo2'],['好','hou2'],['貴','gwai3','a']]},
 {cj:'hok6 saang1',aj:'ai2',seg:[['嗰','go2'],['個','go3','c'],['學生','hok6 saang1'],['好','hou2'],['矮','ai2','a']]},
 {cj:'zoek3 zai2',aj:'cou4',seg:[['樹上面','syu6 soeng6 min6'],['有','jau5'],['兩','loeng5'],['隻','zek3','c'],['雀仔','zoek3 zai2'],['好','hou2'],['嘈','cou4','a']]},
 {cj:'toi2',aj:'cung5',seg:[['呢','ni1'],['張','zoeng1','c'],['枱','toi2'],['好','hou2'],['重','cung5','a']]},
 {cj:'maa5 lau1',aj:'maan6',seg:[['嗰','go2'],['隻','zek3','c'],['馬騮','maa5 lau1'],['行','haang4'],['得','dak1'],['好','hou2'],['慢','maan6','a']]},
 {cj:'po4 po2',aj:'sau3',seg:[['嗰','go2'],['位','wai2','c'],['婆婆','po4 po2'],['好','hou2'],['瘦','sau3','a']]}
];

function q(s){return ROOT.querySelector(s);}
var KEY='cq_'+CFG.QUIZ_ID;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
var Z=null,ticking=null;
function load(){try{return JSON.parse(localStorage.getItem(KEY));}catch(e){return null;}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(Z));}catch(e){}}
if(location.search.indexOf('reset=teacher')>=0){try{localStorage.removeItem(KEY);}catch(e){}}
function inProgress(){return !!(Z&&Z.quiz&&!Z.submitted);}
(window.qzExams=window.qzExams||{})[3]={prog:inProgress,show:function(){if(!Z)renderStart();}};
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
  var listen=[];
  PASSAGES.forEach(function(p,pi){p.qs.forEach(function(x){var norm=x.opts.map(function(o){return Array.isArray(o)?o:[o,OTH[o]||''];});var opts=shuffle(norm);listen.push({pi:pi,q:x.q,th:x.th,opts:opts,ans:opts.map(function(o){return o[0];}).indexOf(norm[0][0])});});});
  var opp=OPP.map(function(x){var oc=shuffle(x.c),oo=shuffle(x.o);return {oc:oc,cAns:oc.indexOf(x.c[0]),oo:oo,oAns:oo.indexOf(x.o[0])};});
  var sent=SENTS.map(function(s){
    var id=s.t.map(function(_,i){return i;}),o=shuffle(id),n=0;
    while(o.every(function(v,i){return v===i;})&&n++<20)o=shuffle(id);
    return {order:o};
  });
  return {listen:listen,vocab:vocab,opp:opp,sent:sent};
}

function renderStart(){
  ROOT.classList.remove('qz-pm');
  var pool=getPool(),live=vocabLive(),ready=live&&pool.length>=Math.max(8,CFG.VOCAB_COUNT);
  var nL=PASSAGES.reduce(function(a,p){return a+p.qs.length;},0);
  var h='<div class="qz-card qz-intro"><h2>'+TITLE+'</h2><div class="qz-th" style="color:var(--mute);font-size:13px">'+TITLE_TH+'</div><ul>'+
    '<li>限時 <b>'+CFG.DURATION_MIN+' 分鐘</b>，撳「開始測驗」即倒數 <span class="qz-th">· จับเวลา '+CFG.DURATION_MIN+' นาทีทันทีที่เริ่ม</span></li>'+
    '<li>一、聽力 '+nL+' 題（每題'+PTS.listen+'分）　二、詞彙 '+CFG.VOCAB_COUNT+' 題（每題'+PTS.vocab+'分）　三、句子重組 '+SENTS.length+' 題（每題'+PTS.sent+'分）　四、相反詞＋量詞 '+OPP.length+' 題（每題'+(PTS.opp*2)+'分）　<b>共 '+(nL*PTS.listen+CFG.VOCAB_COUNT*PTS.vocab+SENTS.length*PTS.sent+OPP.length*PTS.opp*2)+' 分</b></li>'+
    '<li>開始後<b>唔可以轉去其他分頁</b>，離開頁面會被記錄 <span class="qz-th">· ห้ามออกจากหน้านี้ ระบบจะบันทึกไว้</span></li>'+
    '<li>提交後唔可以再改；時間到會自動提交 <span class="qz-th">· ส่งแล้วแก้ไขไม่ได้</span></li></ul>';
  if(ready)h+='<div class="qz-ok">✅ 詞彙已準備好（第'+CFG.CHAPTER_MIN+'–'+CFG.CHAPTER_MAX+'課，共 '+pool.length+' 個）</div><button class="qz-btn big" id="qz3-start">開始測驗 · เริ่มทำข้อสอบ</button>';
  else h+='<div class="qz-err">⚠️ 未讀到最新詞彙（'+(live?'第'+CFG.CHAPTER_MIN+'–'+CFG.CHAPTER_MAX+'課嘅詞彙太少：'+pool.length+' 個':'Google Sheet 未連接')+'），暫時唔可以開考。<br><span class="qz-th">ยังโหลดคำศัพท์ไม่สำเร็จ ยังเริ่มสอบไม่ได้</span></div><button class="qz-btn" id="qz3-reload">🔄 重新載入詞彙 · โหลดใหม่</button>';
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
  Z={start:Date.now(),name:'',leaves:0,plays:PASSAGES.map(function(){return {n:0,s:0};}),submitted:false};
  Z.quiz=buildQuiz(pool);
  Z.ans={listen:Z.quiz.listen.map(function(){return null;}),vocab:Z.quiz.vocab.map(function(){return null;}),sent:SENTS.map(function(){return [];}),oppc:Z.quiz.opp.map(function(){return null;}),oppo:Z.quiz.opp.map(function(){return null;})};
  save(); render(); startTick(); hubR();
  try{window.scrollTo(0,0);}catch(e){}
}

function ruby(zh,jp){return jp?'<ruby>'+esc(zh)+'<rt>'+esc(jp)+'</rt></ruby>':esc(zh);}
function tileHtml(si,ti,inAns){
  var t=SENTS[si].t[ti];
  return '<button class="qz-tile p-'+t[2]+'" data-s="'+si+'" data-t="'+ti+'" data-in="'+(inAns?1:0)+'">'+ruby(t[0],t[1])+(t[3]||'')+(CFG.SHOW_POS?'<span class="qz-pos">'+t[2]+'</span>':'')+'</button>';
}
function renderSent(i){
  var placed=Z.ans.sent[i];
  var pool=Z.quiz.sent[i].order.filter(function(t){return placed.indexOf(t)<0;});
  q('#qz3-ans'+i).innerHTML=placed.map(function(t){return tileHtml(i,t,true);}).join('');
  q('#qz3-pool'+i).innerHTML=pool.map(function(t){return tileHtml(i,t,false);}).join('');
}
function secHead(zh,th,pts){return '<div class="qz-sec">'+zh+' <span class="qz-th" style="font-size:14px;color:var(--mute)">'+th+'</span><span class="qz-spt">'+pts+'</span></div>';}
function optBtns(k,i,opts,sel,cls){return opts.map(function(o,j){
  var inner=cls==='qz-lopt'?'<b class="qz-let">'+'ABCD'[j]+'</b><span class="qz-oz">'+esc(o[0])+(o[1]?'<span class="qz-oth qz-th">'+esc(o[1])+'</span>':'')+'</span>':cls==='qz-copt'?ruby(o,JPW[o]):esc(o);
  return '<button class="qz-opt '+cls+(sel===j?' on':'')+'" data-k="'+k+'" data-i="'+i+'" data-j="'+j+'">'+inner+'</button>';}).join('');}
/* 句子（含粵拼）：mode 'c'＝量詞變 X；'a'＝標出要問相反詞嘅字；'full'＝完整 */
function oppSent(i,mode){
  return OPPX[i].seg.map(function(g){
    if((mode==='c'||mode==='a')&&g[2]==='c')return '<span class="qz-blank">X</span>';   // 量詞兩題都用 X，唔俾睇到答案
    if(mode==='a'&&g[2]==='a')return '<mark class="qz-hl">'+ruby(g[0],g[1])+'</mark>';
    return ruby(g[0],g[1]);
  }).join('');
}
function render(){
  ROOT.classList.remove('qz-pm');
  var Q=Z.quiz,nL=Q.listen.length,nV=Q.vocab.length,nR=SENTS.length,nO=Q.opp.length;
  var h='<div class="qz-card"><label class="qz-nm" for="qz3-nm">姓名 · ชื่อ-นามสกุล</label><input type="text" id="qz3-nm" autocomplete="off" placeholder="請輸入你嘅名 / กรอกชื่อของคุณ" value="'+esc(Z.name||'')+'"></div>';
  h+=secHead('一、聽力','ฟัง',nL+'題 × '+PTS.listen+'分 = '+nL*PTS.listen+'分');
  h+='<p class="qz-sub">聽四段錄音，揀正確答案。每段每種速度最多播 '+CFG.MAX_PLAYS+' 次。<br><span class="qz-th">ฟังเสียง 4 ตอน แล้วเลือกคำตอบที่ถูกต้อง แต่ละตอนเล่นได้สูงสุดความเร็วละ '+CFG.MAX_PLAYS+' ครั้ง</span></p>';
  PASSAGES.forEach(function(p,pi){
    h+='<div class="qz-card"><div class="qz-ptitle">第 '+(pi+1)+' 段 <span class="qz-th" style="font-weight:600">· ตอนที่ '+(pi+1)+'</span></div><div class="qz-btns"><button class="qz-btn" data-play="n" data-p="'+pi+'">▶ 正常速度 <span id="qz3-cN'+pi+'"></span></button><button class="qz-btn slow" data-play="s" data-p="'+pi+'">🐢 慢速 <span id="qz3-cS'+pi+'"></span></button></div>';
    Q.listen.forEach(function(x,i){if(x.pi!==pi)return;
      h+='<div class="qz-q"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span><span class="qz-qzh">'+esc(x.q)+'</span><span class="qz-pt">'+PTS.listen+'分</span><span class="qz-thq qz-th">'+esc(x.th)+'</span></div><div class="qz-opts">'+optBtns('listen',i,x.opts,Z.ans.listen[i],'qz-lopt')+'</div></div>';});
    h+='</div>';
  });
  h+=secHead('二、詞彙選擇題','คำศัพท์',nV+'題 × '+PTS.vocab+'分 = '+nV*PTS.vocab+'分');
  h+='<p class="qz-sub">揀出正確嘅意思<br><span class="qz-th">เลือกความหมายที่ถูกต้อง</span></p><div class="qz-card">';
  Q.vocab.forEach(function(x,i){
    h+='<div class="qz-q qz-vq"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-big qz-zh">'+ruby(x.zh,x.jp)+'</div><div class="qz-opts">'+optBtns('vocab',i,x.opts,Z.ans.vocab[i],'qz-th')+'</div></div>';
  });
  h+='</div>';
  h+=secHead('三、句子重組','เรียงประโยค',nR+'題 × '+PTS.sent+'分 = '+nR*PTS.sent+'分');
  h+='<p class="qz-sub">按泰文意思，將字塊砌成正確句子。撳字塊加入，<b>亦可以拖拉字塊改次序</b>（拖出答案欄＝取消），唔洗重頭嚟過。<br><span class="qz-th">เรียงคำให้เป็นประโยคตามความหมายภาษาไทย แตะคำเพื่อเพิ่ม หรือ<b>ลากคำเพื่อสลับตำแหน่ง</b> (ลากออกนอกช่อง = เอาออก) ไม่ต้องเริ่มใหม่</span></p>';
  SENTS.forEach(function(s,i){
    h+='<div class="qz-card"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-thai-s qz-th">'+esc(s.th)+'</div><div class="qz-ans" id="qz3-ans'+i+'"></div><div class="qz-pool" id="qz3-pool'+i+'"></div><div class="qz-rs"><button class="qz-btn ghost" data-reset="'+i+'" style="padding:6px 12px;font-size:12px">↺ 重來 / เริ่มใหม่</button></div></div>';
  });
  h+=secHead('四、相反詞 + 量詞','คำตรงข้าม + ลักษณนาม',nO+'題 × '+PTS.opp*2+'分 = '+nO*PTS.opp*2+'分');
  h+='<p class="qz-sub">睇句子同泰文意思：(a) 揀量詞（'+PTS.opp+'分）；(b) 揀相反詞（'+PTS.opp+'分）。<br><span class="qz-th">อ่านประโยคและความหมายภาษาไทย (a) เลือกลักษณนาม (b) เลือกคำตรงข้าม ข้อละ '+PTS.opp+' คะแนน</span></p>';
  Q.opp.forEach(function(x,i){var O=OPP[i],X=OPPX[i];
    h+='<div class="qz-card"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-thai-s qz-th">'+esc(O.th)+'</div>'+
      '<div class="qz-q"><div class="qz-osent qz-zh">'+oppSent(i,'c')+'</div><div class="qz-qt"><span>(a) 「'+ruby(O.cw,X.cj)+'」'+ruby('嘅','ge3')+ruby('量詞','loeng6 ci4')+ruby('係','hai6')+'？</span><span class="qz-thq qz-th">ลักษณนามของ「'+esc(O.cw)+'」คือข้อใด (X = ช่องว่างลักษณนาม)</span></div><div class="qz-opts qz-cols">'+optBtns('oppc',i,x.oc,Z.ans.oppc[i],'qz-copt')+'</div></div>'+
      '<div class="qz-q"><div class="qz-osent qz-zh">'+oppSent(i,'a')+'</div><div class="qz-qt"><span>(b) 「'+ruby(O.aw,X.aj)+'」'+ruby('嘅','ge3')+ruby('相反詞','soeng1 faan2 ci4')+ruby('係','hai6')+'？</span><span class="qz-thq qz-th">คำตรงข้ามของ「'+esc(O.aw)+'」คือข้อใด</span></div><div class="qz-opts qz-cols">'+optBtns('oppo',i,x.oo,Z.ans.oppo[i],'qz-copt')+'</div></div></div>';
  });
  h+='<button class="qz-btn big" id="qz3-submit">提交測驗 · ส่งข้อสอบ</button><p class="qz-note">時間到會自動提交 · หมดเวลาจะส่งอัตโนมัติ</p>';
  ROOT.innerHTML=h;
  SENTS.forEach(function(_,i){renderSent(i);});
  updPlays();
}

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
  PASSAGES.forEach(function(_,pi){
    var n=Z.plays[pi]; if(!n)return;
    var cN=q('#qz3-cN'+pi),cS=q('#qz3-cS'+pi); if(!cN)return;
    cN.textContent='('+(CFG.MAX_PLAYS-n.n)+')'; cS.textContent='('+(CFG.MAX_PLAYS-n.s)+')';
    q('[data-play="n"][data-p="'+pi+'"]').disabled=n.n>=CFG.MAX_PLAYS;
    q('[data-play="s"][data-p="'+pi+'"]').disabled=n.s>=CFG.MAX_PLAYS;
  });
}
function play(pi,kind){
  if(Z.plays[pi][kind]>=CFG.MAX_PLAYS)return;
  var url=(CFG.AUDIO[pi]||{})[kind],rate=kind==='n'?0.9:0.55;
  if(url){stopSpeech();audioEl=new Audio(url);audioEl.play().catch(function(){alert('播放失敗 เล่นเสียงไม่สำเร็จ');});}
  else if(!speakText(PASSAGES[pi].text,rate))return;
  Z.plays[pi][kind]++; save(); updPlays();
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
  var nR=SENTS.filter(function(s,i){return sentOK(s,i);}).length;
  var nC=Q.opp.filter(function(x,i){return a.oppc[i]===x.cAns;}).length;
  var nO=Q.opp.filter(function(x,i){return a.oppo[i]===x.oAns;}).length;
  var L=nL*PTS.listen,V=nV*PTS.vocab,R=nR*PTS.sent,O=(nC+nO)*PTS.opp;
  var max={L:Q.listen.length*PTS.listen,V:Q.vocab.length*PTS.vocab,R:SENTS.length*PTS.sent,O:Q.opp.length*2*PTS.opp};
  return {L:L,V:V,R:R,O:O,nC:nC,nO:nO,total:L+V+R+O,max:max,maxAll:max.L+max.V+max.R+max.O};
}
function report(sc,auto){
  var Q=Z.quiz,a=Z.ans,used=Math.min(CFG.DURATION_MIN*60,Math.round((Z.endAt-Z.start)/1000)),out=[];
  var ok=function(b){return b?'✓':'✗';};
  out.push('姓名：'+(Z.name||'(未填)'));
  out.push('總分：'+sc.total+'/'+sc.maxAll);
  out.push('　聽力 '+sc.L+'/'+sc.max.L+'　詞彙 '+sc.V+'/'+sc.max.V+'　句子重組 '+sc.R+'/'+sc.max.R+'　相反詞+量詞 '+sc.O+'/'+sc.max.O+'（量詞 '+sc.nC+'/'+Q.opp.length+'、相反詞 '+sc.nO+'/'+Q.opp.length+'）');
  out.push('用時：'+Math.floor(used/60)+'分'+(used%60)+'秒　'+(auto?'（時間到自動提交）':''));
  out.push('離開頁面次數：'+(Z.leaves||0));
  out.push('提交時間：'+new Date(Z.endAt).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong'}));
  out.push('\n【一、聽力】');
  Q.listen.forEach(function(x,i){out.push((i+1)+'. [第'+(x.pi+1)+'段] '+x.q+' → '+(a.listen[i]==null?'(未答)':x.opts[a.listen[i]][0])+' '+(a.listen[i]===x.ans?'✓':'✗（正確：'+x.opts[x.ans][0]+'）'));});
  out.push('\n【二、詞彙】');
  Q.vocab.forEach(function(x,i){out.push((i+1)+'. [L'+x.ch+'] '+x.zh+' → '+(a.vocab[i]==null?'(未答)':x.opts[a.vocab[i]])+' '+(a.vocab[i]===x.ans?'✓':'✗（正確：'+x.opts[x.ans]+'）'));});
  out.push('\n【三、句子重組】');
  SENTS.forEach(function(s,i){
    var txt=function(ids){return ids.map(function(t){return s.t[t][0]+(s.t[t][3]||'');}).join(' ');};
    var g=sentOK(s,i),std=isStd(s,i);
    out.push((i+1)+'. '+ok(g)+(g&&!std?'（備選次序，照計分）':'')+' 學生：'+(txt(a.sent[i])||'(未答)')+(g&&std?'':'\n    標準：'+txt(s.t.map(function(_,k){return k;})))+(std?'':'\n    次序碼：['+a.sent[i].join(',')+']（如要接受，將呢組加入呢題嘅 alts）'));
  });
  out.push('\n【四、相反詞 + 量詞】');
  Q.opp.forEach(function(x,i){var O=OPP[i];
    out.push((i+1)+'. '+O.s);
    out.push('   量詞（'+O.cw+'）→ '+(a.oppc[i]==null?'(未答)':x.oc[a.oppc[i]])+' '+ok(a.oppc[i]===x.cAns)+(a.oppc[i]===x.cAns?'':'（正確：'+x.oc[x.cAns]+'）'));
    out.push('   相反詞（'+O.aw+'）→ '+(a.oppo[i]==null?'(未答)':x.oo[a.oppo[i]])+' '+ok(a.oppo[i]===x.oAns)+(a.oppo[i]===x.oAns?'':'（正確：'+x.oo[x.oAns]+'）'));
  });
  return out.join('\n');
}
async function sendResult(){
  var sc=scoreAll(),body=report(sc,Z.auto);
  var subject='廣東話課堂測驗（二）B卷 第8-14課 – '+(Z.name||'未填名')+' – '+sc.total+'/'+sc.maxAll;
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
    if(!(Z.name||'').trim()){alert('請先填姓名 กรุณากรอกชื่อก่อน');var n=q('#qz3-nm');if(n)n.focus();return;}
    var a=Z.ans;
    var left=a.listen.filter(function(x){return x==null;}).length+a.vocab.filter(function(x){return x==null;}).length+a.sent.filter(function(x){return !x.length;}).length+a.oppc.filter(function(x){return x==null;}).length+a.oppo.filter(function(x){return x==null;}).length;
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
  var el=q('#qz3-stat'); if(!el)return;
  el.className='qz-st '+m[0]; el.textContent=m[1];
  var rb=q('#qz3-resend'); if(rb)rb.style.display=(state==='ok'||state==='wait')?'none':'';
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
  var h='<div class="qz-vbar"><span class="qz-fn">課堂測驗(二)B卷_第8-14課_'+esc(Z.name||'')+'.pdf</span><span class="qz-st wait" id="qz3-stat"></span><button id="qz3-resend" style="display:none">重新傳送</button><button id="qz3-print">🖨 儲存 PDF</button></div><div class="qz-paper">';
  h+='<h2>'+TITLE+'</h2><div class="qz-en">'+TITLE_TH+'</div>';
  h+='<div class="qz-meta"><span><b>姓名：</b>'+esc(Z.name||'')+'</span><span><b>提交：</b>'+esc(new Date(end).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong',hour12:false}))+'</span><span><b>用時：</b>'+Math.floor(used/60)+'分'+(used%60)+'秒'+(Z.auto?'（時間到）':'')+'</span></div>';
  h+='<div class="qz-scorebox"><div class="qz-stamp"><small>總分 SCORE</small>'+sc.total+' / '+sc.maxAll+'<small>'+pct+'%</small></div><div class="qz-parts"><span>一、聽力</span><b>'+sc.L+' / '+sc.max.L+'</b><br><span>二、詞彙</span><b>'+sc.V+' / '+sc.max.V+'</b><br><span>三、句子重組</span><b>'+sc.R+' / '+sc.max.R+'</b><br><span>四、相反詞 + 量詞</span><b>'+sc.O+' / '+sc.max.O+'</b></div></div>';
  h+='<div class="qz-psec"><span>一、聽力 <small class="qz-th">ฟัง</small></span><small>'+sc.L+' / '+sc.max.L+'</small></div>';
  PASSAGES.forEach(function(p,pi){
    h+='<div class="qz-scr"><b>第 '+(pi+1)+' 段錄音內容：</b>'+esc(p.text)+'</div>';
    Q.listen.forEach(function(x,i){if(x.pi!==pi)return;var g=a.listen[i]===x.ans;
      h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'. '+esc(x.q)+'<small>'+esc(x.th)+'</small></span>'+chip(g?PTS.listen:0,PTS.listen)+'</div>'+optList(x.opts,x.ans,a.listen[i],false,function(o){return esc(o[0])+(o[1]?' <span class="qz-th qz-pth">· '+esc(o[1])+'</span>':'');})+'</div>';});
  });
  h+='<div class="qz-psec"><span>二、詞彙選擇題 <small class="qz-th">คำศัพท์</small></span><small>'+sc.V+' / '+sc.max.V+'</small></div>';
  Q.vocab.forEach(function(x,i){var g=a.vocab[i]===x.ans;
    h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'.<span class="qz-ch">第'+x.ch+'課</span></span>'+chip(g?PTS.vocab:0,PTS.vocab)+'</div><div class="qz-vw">'+ruby(x.zh,x.jp)+'</div>'+optList(x.opts,x.ans,a.vocab[i],true)+'</div>';});
  h+='<div class="qz-psec"><span>三、句子重組 <small class="qz-th">เรียงประโยค</small></span><small>'+sc.R+' / '+sc.max.R+'</small></div>';
  SENTS.forEach(function(s,i){var g=sentOK(s,i);
    var row=function(ids){return ids.map(function(t){return '<span class="qz-stile">'+ruby(s.t[t][0],s.t[t][1])+esc(s.t[t][3]||'')+'</span>';}).join('');};
    h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'.</span>'+chip(g?PTS.sent:0,PTS.sent)+'</div>'+(g&&!isStd(s,i)?'<div class="qz-th" style="font-size:12px;color:#b36b00">★ 備選次序（同標準答案唔同，但都接受）· ลำดับอื่นที่ยอมรับ</div>':'')+'<div class="qz-thp">'+esc(s.th)+'</div>'+
      '<div class="qz-srow"><b>你嘅答案</b><div class="qz-stiles '+(g?'good':'mine-bad')+'">'+(a.sent[i].length?row(a.sent[i]):'<span class="qz-th" style="font-size:14px;color:var(--red)">未作答 · ไม่ได้ตอบ</span>')+'</div></div>'+
      (g?'':'<div class="qz-srow"><b>正確答案</b><div class="qz-stiles ans-ok">'+row(s.t.map(function(_,k){return k;}))+'</div></div>')+'</div>';});
  h+='<div class="qz-psec"><span>四、相反詞 + 量詞 <small class="qz-th">คำตรงข้าม + ลักษณนาม</small></span><small>'+sc.O+' / '+sc.max.O+'</small></div>';
  Q.opp.forEach(function(x,i){var O=OPP[i],X=OPPX[i],rj=function(o){return ruby(o,JPW[o]);};
    var okc=a.oppc[i]===x.cAns,oko=a.oppo[i]===x.oAns,got=((okc?1:0)+(oko?1:0))*PTS.opp,cls=got===2*PTS.opp?'right':got===0?'wrong':'half';
    h+='<div class="qz-pq '+cls+'"><div class="qz-pqh">'+(cls==='right'?mk(true):cls==='wrong'?mk(false):'<span class="qz-mk half">½</span>')+'<span>'+(i+1)+'.</span>'+chip(got,2*PTS.opp)+'</div>'+
      '<div class="qz-vw" style="font-size:20px">'+oppSent(i,'full')+'</div><div class="qz-thp">'+esc(O.th)+'</div>'+
      '<div class="qz-sub2">'+mk(okc)+'<span>(a)「'+ruby(O.cw,X.cj)+'」嘅量詞</span>'+chip(okc?PTS.opp:0,PTS.opp)+'</div>'+optList(x.oc,x.cAns,a.oppc[i],false,rj)+
      '<div class="qz-sub2">'+mk(oko)+'<span>(b)「'+ruby(O.aw,X.aj)+'」嘅相反詞</span>'+chip(oko?PTS.opp:0,PTS.opp)+'</div>'+optList(x.oo,x.oAns,a.oppo[i],false,rj)+'</div>';});
  h+='<div class="qz-foot">— 完 · จบ —<br>此試卷已提交，唯讀 · ส่งแล้ว ไม่สามารถแก้ไขได้</div></div>';
  ROOT.classList.add('qz-pm');
  ROOT.innerHTML=h;
  try{window.scrollTo(0,0);}catch(e){}
  q('#qz3-resend').onclick=async function(){setStatus('wait');setStatus(await sendResult());};
  q('#qz3-print').onclick=function(){
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
  if(t.closest('#qz3-start'))return startExam();
  if(t.closest('#qz3-reload')){
    var b=t.closest('#qz3-reload'); b.disabled=true; b.textContent='讀緊… กำลังโหลด…';
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
  var p=t.closest('[data-play]'); if(p)return play(+p.dataset.p,p.dataset.play);
  if(t.closest('#qz3-submit'))return submit(false);
});
if(window.qzDrag)window.qzDrag(ROOT,'qz3-',{active:inProgress,arr:function(si){return Z.ans.sent[si];},change:function(si){renderSent(si);save();}});
ROOT.addEventListener('input',function(e){if(e.target.id==='qz3-nm'&&Z){Z.name=e.target.value;save();}});

/* 同主 App 接口：接上測驗（一）已定義嘅 hook */
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

