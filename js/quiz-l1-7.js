/* ══ 課堂測驗（一）· 第1–7課 ══ 詞彙用主 App 已讀入嘅 Google Sheet（S.data.vocab） */
(function(){
'use strict';
var ROOT=document.getElementById('qz-root'); if(!ROOT)return;
var CFG={
  DURATION_MIN:60,             // 測驗時間（分鐘），撳「開始測驗」即計時
  QUIZ_ID:'cantonese-l1-7-v3', // 改呢個＝新一輪測驗（學生記錄會重置）
  FORM_ENDPOINT:'https://formspree.io/f/xbgdbeje', // Formspree：成績自動寄去老師 email
  TEACHER_EMAIL:'yongearn@gmail.com', // 後備：冇 FORM_ENDPOINT 先用 mailto（學生要自己撳「傳送」）
  AUDIO_NORMAL:'', AUDIO_SLOW:'', // 可選：自己錄嘅 mp3 網址（冇填就用瀏覽器語音）
  MAX_PLAYS:3, SHOW_POS:true, VOCAB_COUNT:20,
  VOCAB_MAX_PLAYS:3,           // 詞彙題喇叭：每題最多聽幾次
  PTS:{listen:2, vocab:1, sent:3, sentBonus:1, clf:2}, // 每題分數；sentBonus＝句子重組全對額外加分
  CHAPTER_MIN:1, CHAPTER_MAX:7,
  LOCK_NAV:true                // 測驗進行中，鎖住其他分頁（防止偷睇詞彙卡）
};
var TITLE='課堂測驗（一）· 第1–7課', TITLE_TH='แบบทดสอบประจำบท ครั้งที่ 1 · บทที่ 1–7';
var LISTEN_TEXT='我叫藍天城，今年36歲，係一個日本人，冇兄弟姊妹。鍾意食壽司同飯團。每日7點鐘起身。識講小小廣東話。';
var LISTEN_Q=[
  {q:'佢叫咩名？',qj:'keoi5 giu3 me1 meng2',th:'เขาชื่ออะไร',fixed:true,ans:1,opts:[['林田成','lam4 tin4 sing4'],['藍天城','laam4 tin1 sing4'],['李田生','lei5 tin4 saang1'],['金城藍','gam1 sing4 laam4']]},
  {q:'佢今年幾多歲？',th:'เขาอายุเท่าไร',ans:0,opts:[['36歲','saam1 sap6 luk6 seoi3'],['63歲','luk6 sap6 saam1 seoi3'],['34歲','saam1 sap6 sei3 seoi3'],['46歲','sei3 sap6 luk6 seoi3']]},
  {q:'佢係邊度人？',th:'เขาเป็นคนชาติไหน',ans:0,opts:[['日本人','jat6 bun2 jan4'],['泰國人','taai3 gwok3 jan4'],['香港人','hoeng1 gong2 jan4'],['韓國人','hon4 gwok3 jan4']]},
  {q:'佢有冇兄弟姊妹？',th:'เขามีพี่น้องไหม',ans:0,opts:[['冇兄弟姊妹','mou5 hing1 dai6 zi2 mui6'],['有一個細佬','jau5 jat1 go3 sai3 lou2'],['有一個妹妹','jau5 jat1 go3 mui6 mui2'],['有兩個哥哥','jau5 loeng5 go3 go4 go1']]},
  {q:'佢鍾意食乜？',th:'เขาชอบกินอะไร',ans:0,opts:[['壽司同飯團','sau6 si1 tung4 faan6 tyun4'],['壽司同蘋果','sau6 si1 tung4 ping4 gwo2'],['麵包同牛奶','min6 baau1 tung4 ngau4 naai5'],['雞蛋同飯團','gai1 daan2 tung4 faan6 tyun4']]},
  {q:'佢每日幾點鐘起身？',th:'เขาตื่นนอนกี่โมงทุกวัน',ans:0,opts:[['7點鐘','cat1 dim2 zung1'],['6點鐘','luk6 dim2 zung1'],['8點鐘','baat3 dim2 zung1'],['9點鐘','gau2 dim2 zung1']]},
  {q:'佢識講幾多廣東話？',th:'เขาพูดกวางตุ้งได้แค่ไหน',ans:0,opts:[['識講小小','sik1 gong2 siu2 siu2'],['講得好好','gong2 dak1 hou2 hou2'],['一啲都唔識','jat1 di1 dou1 m4 sik1'],['淨係識寫','zing6 hai6 sik1 se2']]}
];
// [字, 粵拼, 詞類, 後面標點]
var SENTS=[  // swap：呢兩個字塊調轉次序都照計分
 {th:'น้องสาวที่ชอบสีแดงมาก กำลังกินแอปเปิลอยู่ที่บ้าน',
  t:[['一個','jat1 go3','數量'],['好','hou2','副詞'],['鍾意','zung1 ji3','動詞'],['紅色','hung4 sik1','名詞'],['嘅','ge3','助詞'],['妹妹','mui6 mui2','名詞'],['喺','hai2','介詞'],['屋企','uk1 kei2','名詞'],['食','sik6','動詞'],['蘋果','ping4 gwo2','名詞','。']]},
 {th:'ตอนเช้า พ่อกับแม่ไม่ได้กินอาหารเช้าเลย',swap:[1,2],
  t:[['朝頭早','ziu1 tau4 zou2','時間詞','，'],['爸爸','baa1 baa1','名詞'],['媽媽','maa1 maa1','名詞'],['都','dou1','副詞'],['冇','mou5','副詞'],['食','sik6','動詞'],['早餐','zou2 caan1','名詞','。']]},
 {th:'ในครัวของเขามีชามหนึ่งใบกับตะเกียบสิบคู่',
  t:[['佢','keoi5','代詞'],['廚房','cyu4 fong2','名詞'],['有','jau5','動詞'],['一隻','jat1 zek3','數量'],['碗','wun2','名詞'],['同','tung4','連詞'],['十對','sap6 deoi3','數量'],['筷子','faai3 zi2','名詞','。']]},
 {th:'คุณปู่คุณย่าเลี้ยงลูกสุนัข 3 ตัว และกบ 8 ตัว',swap:[0,1],
  t:[['爺爺','je4 je4','名詞'],['嫲嫲','maa4 maa4','名詞'],['養','joeng5','動詞'],['咗','zo2','助詞'],['3隻','saam1 zek3','數量'],['狗仔','gau2 zai2','名詞'],['同','tung4','連詞'],['8隻','baat3 zek3','數量'],['青蛙','ceng1 waa1','名詞','。']]},
 {th:'คุณนายหลี่ปีนี้น่าจะอายุ 54 ปีแล้ว เธอมีน้องชายหนึ่งคนอาศัยอยู่ที่ประเทศไทย',
  t:[['李太','lei5 taai2','名詞'],['今年','gam1 nin4','時間詞'],['好似','hou2 ci5','副詞'],['54歲','ng5 sap6 sei3 seoi3','數量'],['啦','laa1','助詞','，'],['佢','keoi5','代詞'],['有','jau5','動詞'],['1個','jat1 go3','數量'],['細佬','sai3 lou2','名詞'],['喺','hai2','介詞'],['泰國','taai3 gwok3','名詞'],['住','zyu6','動詞','。']]}
];

// 量詞配對：[名詞, 粵拼, 量詞, 粵拼]
var CLF=[['雪櫃','syut3 gwai6','部','bou6'],['蘋果','ping4 gwo2','個','go3'],['老師','lou5 si1','位','wai2'],['貓','maau1','隻','zek3'],['屋企','uk1 kei2','間','gaan1'],
 ['魚','jyu4','條','tiu4'],['木瓜','muk6 gwaa1','個','go3'],['枕頭','zam2 tau4','個','go3'],['床','cong4','張','zoeng1'],['豬','zyu1','隻','zek3']];

/* ── 工具 ── */
function q(s){return ROOT.querySelector(s);}
var KEY='cq_'+CFG.QUIZ_ID;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
var Z=null, ticking=null;
function load(){try{return JSON.parse(localStorage.getItem(KEY));}catch(e){return null;}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(Z));}catch(e){}}
if(location.search.indexOf('reset=teacher')>=0){try{localStorage.removeItem(KEY);}catch(e){} try{history.replaceState(null,'',location.pathname+location.hash);}catch(e){}}
function inProgress(){return !!(Z&&Z.quiz&&!Z.submitted);}
(window.qzExams=window.qzExams||{})[1]={prog:inProgress,show:function(){if(!Z)renderStart();}};
function hubR(){if(window.qzHubRefresh)window.qzHubRefresh();}

/* ── 詞彙：用主 App 已讀入嘅資料（只用 Chapter 第1–7課） ── */
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
  var listen=LISTEN_Q.map(function(x){var opts=x.fixed?x.opts.slice():shuffle(x.opts);return {q:x.q,qj:x.qj||'',th:x.th,opts:opts,ans:opts.indexOf(x.opts[x.ans])};});
  var sent=SENTS.map(function(s){
    var id=s.t.map(function(_,i){return i;}),o=shuffle(id),n=0;
    while(o.every(function(v,i){return v===i;})&&n++<20)o=shuffle(id);
    return {order:o};
  });
  var idx=CLF.map(function(_,i){return i;});
  return {listen:listen,vocab:vocab,sent:sent,clf:{nouns:shuffle(idx),cls:shuffle(idx)}};
}

/* ── 開始畫面 ── */
function renderStart(){
  ROOT.classList.remove('qz-pm');
  var pool=getPool(), live=vocabLive(), ready=live&&pool.length>=8;
  var h='<div class="qz-card qz-intro"><h2>'+TITLE+'</h2><div class="qz-th" style="color:var(--mute);font-size:13px">'+TITLE_TH+'</div><ul>'+
    '<li>限時 <b>'+CFG.DURATION_MIN+' 分鐘</b>，撳「開始測驗」即倒數 <span class="qz-th">· จับเวลา '+CFG.DURATION_MIN+' นาทีทันทีที่เริ่ม</span></li>'+
    '<li>一、聽力 7 題（每題2分）　二、詞彙 '+CFG.VOCAB_COUNT+' 題（每題1分）　三、句子重組 5 題（每題3分，全對再加1分）　四、量詞配對 10 組（每組2分）　<b>共 70 分</b></li>'+
    '<li>開始後<b>唔可以轉去其他分頁</b>，離開頁面會被記錄 <span class="qz-th">· ห้ามออกจากหน้านี้ ระบบจะบันทึกไว้</span></li>'+
    '<li>提交後唔可以再改；時間到會自動提交 <span class="qz-th">· ส่งแล้วแก้ไขไม่ได้</span></li></ul>';
  if(ready)h+='<div class="qz-ok">✅ 詞彙已準備好（第'+CFG.CHAPTER_MIN+'–'+CFG.CHAPTER_MAX+'課，共 '+pool.length+' 個）</div><button class="qz-btn big" id="qz-start">開始測驗 · เริ่มทำข้อสอบ</button>';
  else h+='<div class="qz-err">⚠️ 未讀到最新詞彙（'+(live?'第1–7課嘅詞彙太少：'+pool.length+' 個':'Google Sheet 未連接')+'），暫時唔可以開考。<br><span class="qz-th">ยังโหลดคำศัพท์ไม่สำเร็จ ยังเริ่มสอบไม่ได้</span></div><button class="qz-btn" id="qz-reload">🔄 重新載入詞彙 · โหลดใหม่</button>';
  h+='</div>';
  if(/check=teacher/.test(location.search)){
    var cnt={}; pool.forEach(function(w){cnt[w[0]]=(cnt[w[0]]||0)+1;});
    h+='<div class="qz-card"><b>【老師檢查】詞彙共 '+pool.length+' 個</b><br>'+Object.keys(cnt).sort(function(a,b){return a-b;}).map(function(c){return '第'+c+'課：'+cnt[c];}).join('　')+
      '<br><br><table class="qz-tbl"><tr><th>課</th><th>中文</th><th>粵拼</th><th>泰文</th></tr>'+pool.map(function(w){return '<tr><td>'+w[0]+'</td><td>'+esc(w[1])+'</td><td>'+esc(w[2])+'</td><td class="qz-th">'+esc(w[3])+'</td></tr>';}).join('')+'</table></div>';
  }
  ROOT.innerHTML=h;
}
function startExam(){
  var pool=getPool(); if(!vocabLive()||pool.length<8)return renderStart();
  if(!confirm('開始後即時倒數 '+CFG.DURATION_MIN+' 分鐘，同埋唔可以轉去其他分頁。\nเริ่มแล้วจับเวลาทันที และออกจากหน้านี้ไม่ได้\n\n確定開始？ ยืนยันเริ่ม?'))return;
  Z={start:Date.now(),name:'',leaves:0,plays:{n:0,s:0},vplays:{},submitted:false};
  Z.quiz=buildQuiz(pool);
  Z.ans={listen:Z.quiz.listen.map(function(){return null;}),vocab:Z.quiz.vocab.map(function(){return null;}),sent:SENTS.map(function(){return [];}),clf:CLF.map(function(){return null;})};
  save(); render(); startTick(); hubR();
  try{window.scrollTo(0,0);}catch(e){}
}

/* ── 作答畫面 ── */
function ruby(zh,jp){return jp?'<ruby>'+esc(zh)+'<rt>'+esc(jp)+'</rt></ruby>':esc(zh);}
function tileHtml(si,ti,inAns){
  var t=SENTS[si].t[ti];
  return '<button class="qz-tile p-'+t[2]+'" data-s="'+si+'" data-t="'+ti+'" data-in="'+(inAns?1:0)+'">'+ruby(t[0],t[1])+(t[3]||'')+(CFG.SHOW_POS?'<span class="qz-pos">'+t[2]+'</span>':'')+'</button>';
}
function renderSent(i){
  var placed=Z.ans.sent[i];
  var pool=Z.quiz.sent[i].order.filter(function(t){return placed.indexOf(t)<0;});
  q('#qz-ans'+i).innerHTML=placed.map(function(t){return tileHtml(i,t,true);}).join('');
  q('#qz-pool'+i).innerHTML=pool.map(function(t){return tileHtml(i,t,false);}).join('');
}
function render(){
  ROOT.classList.remove('qz-pm');
  var Q=Z.quiz;
  var h='<div class="qz-card"><label class="qz-nm" for="qz-nm">姓名 · ชื่อ-นามสกุล</label><input type="text" id="qz-nm" autocomplete="off" placeholder="請輸入你嘅名 / กรอกชื่อของคุณ" value="'+esc(Z.name||'')+'"></div>';
  h+='<div class="qz-sec">一、聽力 <span class="qz-th" style="font-size:14px;color:var(--mute)">ฟัง</span></div><p class="qz-sub">聽錄音，揀正確答案。每種速度最多播 '+CFG.MAX_PLAYS+' 次。<br><span class="qz-th">ฟังแล้วเลือกคำตอบที่ถูกต้อง เล่นได้สูงสุดความเร็วละ '+CFG.MAX_PLAYS+' ครั้ง</span></p><div class="qz-card">'+
    '<div class="qz-btns"><button class="qz-btn" id="qz-pN">▶ 正常速度 <span id="qz-cN"></span></button><button class="qz-btn slow" id="qz-pS">🐢 慢速 <span id="qz-cS"></span></button></div>';
  Q.listen.forEach(function(x,i){
    h+='<div class="qz-q"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span><span class="qz-qzh">'+ruby(x.q,x.qj)+'</span><span class="qz-pt">'+CFG.PTS.listen+'分</span><span class="qz-thq qz-th">'+esc(x.th)+'</span></div><div class="qz-opts">'+
      x.opts.map(function(o,j){return '<button class="qz-opt qz-lopt'+(Z.ans.listen[i]===j?' on':'')+'" data-k="listen" data-i="'+i+'" data-j="'+j+'"><b class="qz-let">'+'ABCD'[j]+'</b><span class="qz-oz">'+ruby(o[0],o[1])+'</span></button>';}).join('')+'</div></div>';
  });
  h+='</div>';
  h+='<div class="qz-sec">二、詞彙選擇題 <span class="qz-th" style="font-size:14px;color:var(--mute)">คำศัพท์</span></div><p class="qz-sub">揀出正確嘅意思（共 '+Q.vocab.length+' 題，每題可以撳 🔊 聽 '+CFG.VOCAB_MAX_PLAYS+' 次）<br><span class="qz-th">เลือกความหมายที่ถูกต้อง</span></p><div class="qz-card">';
  Q.vocab.forEach(function(x,i){
    h+='<div class="qz-q qz-vq"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-big qz-zh">'+ruby(x.zh,x.jp)+'</div><div class="qz-vsp"><button class="qz-btn qz-vspk" data-vp="'+i+'">🔊 聽讀音 <span id="qz-vc'+i+'"></span></button></div><div class="qz-opts">'+
      x.opts.map(function(o,j){return '<button class="qz-opt qz-th'+(Z.ans.vocab[i]===j?' on':'')+'" data-k="vocab" data-i="'+i+'" data-j="'+j+'">'+esc(o)+'</button>';}).join('')+'</div></div>';
  });
  h+='</div>';
  h+='<div class="qz-sec">三、句子重組 <span class="qz-th" style="font-size:14px;color:var(--mute)">เรียงประโยค</span></div><p class="qz-sub">按泰文意思，將字塊砌成正確句子。撳字塊加入，<b>亦可以拖拉字塊改次序</b>（拖出答案欄＝取消），唔洗重頭嚟過。<br><span class="qz-th">เรียงคำให้เป็นประโยคตามความหมายภาษาไทย แตะคำเพื่อเพิ่ม หรือ<b>ลากคำเพื่อสลับตำแหน่ง</b> (ลากออกนอกช่อง = เอาออก) ไม่ต้องเริ่มใหม่</span></p>';
  SENTS.forEach(function(s,i){
    h+='<div class="qz-card"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-thai-s qz-th">'+esc(s.th)+'</div><div class="qz-ans" id="qz-ans'+i+'"></div><div class="qz-pool" id="qz-pool'+i+'"></div><div class="qz-rs"><button class="qz-btn ghost" data-reset="'+i+'" style="padding:6px 12px;font-size:12px">↺ 重來 / เริ่มใหม่</button></div></div>';
  });
  h+='<div class="qz-sec">四、量詞配對 <span class="qz-th" style="font-size:14px;color:var(--mute)">จับคู่ลักษณนาม</span></div><p class="qz-sub">先撳左邊嘅物件，再撳右邊啱嘅量詞，配成一對（每對 '+CFG.PTS.clf+' 分）。撳返已配好嘅卡可以取消。<br><span class="qz-th">แตะคำนามด้านซ้าย แล้วแตะลักษณนามด้านขวาที่ถูกต้อง แตะการ์ดที่จับคู่แล้วเพื่อยกเลิก</span></p><div class="qz-card"><div class="qz-clf" id="qz-clf"></div></div>';
  h+='<button class="qz-btn big" id="qz-submit">提交測驗 · ส่งข้อสอบ</button><p class="qz-note">時間到會自動提交 · หมดเวลาจะส่งอัตโนมัติ</p>';
  ROOT.innerHTML=h;
  SENTS.forEach(function(_,i){renderSent(i);});
  clfSel=null; renderClf();
  Z.quiz.vocab.forEach(function(_,i){updVP(i);});
  updPlays();
}
/* 量詞配對：兩欄卡牌（已打亂），唔使翻牌 */
var clfSel=null;
function clfPartnerOf(cid){for(var n=0;n<Z.ans.clf.length;n++)if(Z.ans.clf[n]===cid)return n;return -1;}
function renderClf(){
  var el=q('#qz-clf'); if(!el)return;
  var Q=Z.quiz.clf,A=Z.ans.clf;
  function card(side,id){
    var paired=side==='n'?A[id]!=null:clfPartnerOf(id)>=0;
    var nid=side==='n'?id:clfPartnerOf(id);
    var num=paired?Q.nouns.indexOf(nid)+1:0;
    var sel=clfSel&&clfSel.side===side&&clfSel.id===id;
    var txt=side==='n'?ruby(CLF[id][0],CLF[id][1]):ruby(CLF[id][2],CLF[id][3]);
    return '<button class="qz-cc'+(paired?' paired':'')+(sel?' sel':'')+'" data-side="'+side+'" data-id="'+id+'"'+(paired?' style="--pc:hsl('+(Q.nouns.indexOf(nid)*36)+',65%,45%)"':'')+'>'+(paired?'<i class="qz-cnum">'+num+'</i>':'')+'<span class="qz-ctx qz-zh">'+txt+'</span></button>';
  }
  el.innerHTML='<div class="qz-ccol">'+Q.nouns.map(function(id){return card('n',id);}).join('')+'</div><div class="qz-ccol">'+Q.cls.map(function(id){return card('c',id);}).join('')+'</div>';
}
function clfTap(side,id){
  var A=Z.ans.clf;
  var paired=side==='n'?A[id]!=null:clfPartnerOf(id)>=0;
  if(paired){var n=side==='n'?id:clfPartnerOf(id);A[n]=null;clfSel=null;save();return renderClf();}
  if(clfSel&&clfSel.side!==side){
    var nn=side==='n'?id:clfSel.id, cc=side==='c'?id:clfSel.id;
    A[nn]=cc;clfSel=null;save();return renderClf();
  }
  clfSel=(clfSel&&clfSel.side===side&&clfSel.id===id)?null:{side:side,id:id};
  renderClf();
}

/* ── 語音 ── */
var SYN=window.speechSynthesis||null, VOICE=null, audioEl=null;
function pickVoice(){
  if(!SYN)return; var vs=[]; try{vs=SYN.getVoices()||[];}catch(e){}
  VOICE=vs.filter(function(v){return /zh[-_]HK|yue/i.test(v.lang);})[0]||vs.filter(function(v){return /zh/i.test(v.lang);})[0]||null;
}
if(SYN){pickVoice();if(SYN.addEventListener)SYN.addEventListener('voiceschanged',pickVoice);}
function stopSpeech(){try{if(SYN)SYN.cancel();}catch(e){} try{if(audioEl)audioEl.pause();}catch(e){}}
function updPlays(){
  var n=Z.plays||{n:0,s:0};
  var cN=q('#qz-cN'),cS=q('#qz-cS'),pN=q('#qz-pN'),pS=q('#qz-pS'); if(!cN)return;
  cN.textContent='('+(CFG.MAX_PLAYS-n.n)+')'; cS.textContent='('+(CFG.MAX_PLAYS-n.s)+')';
  pN.disabled=n.n>=CFG.MAX_PLAYS; pS.disabled=n.s>=CFG.MAX_PLAYS;
}
function speakText(text,rate){
  if(!SYN){alert('呢部機唔支援語音 อุปกรณ์นี้ไม่รองรับเสียง');return false;}
  var busy=false; try{busy=SYN.speaking||SYN.pending;}catch(e){}
  var go=function(){
    var u=new SpeechSynthesisUtterance(text);
    if(VOICE)u.voice=VOICE; u.lang=(VOICE&&VOICE.lang)||'zh-HK'; u.rate=rate;
    SYN.speak(u);
  };
  if(busy){SYN.cancel();setTimeout(go,80);}else go();   // Chrome：cancel 之後即刻 speak 會被吞
  return true;
}
function play(kind){
  Z.plays=Z.plays||{n:0,s:0};
  if(Z.plays[kind]>=CFG.MAX_PLAYS)return;
  var url=kind==='n'?CFG.AUDIO_NORMAL:CFG.AUDIO_SLOW, rate=kind==='n'?0.9:0.55;
  if(url){
    stopSpeech(); audioEl=new Audio(url); audioEl.play().catch(function(){alert('播放失敗 เล่นเสียงไม่สำเร็จ');});
  }else if(!speakText(LISTEN_TEXT,rate))return;
  Z.plays[kind]++; save(); updPlays();
}
/* 詞彙題喇叭：正常速度，每題最多 VOCAB_MAX_PLAYS 次 */
function updVP(i){
  var n=(Z.vplays&&Z.vplays[i])||0, c=q('#qz-vc'+i), b=q('[data-vp="'+i+'"]'); if(!c||!b)return;
  c.textContent='('+(CFG.VOCAB_MAX_PLAYS-n)+')'; b.disabled=n>=CFG.VOCAB_MAX_PLAYS;
}
function playVocab(i){
  Z.vplays=Z.vplays||{};
  if((Z.vplays[i]||0)>=CFG.VOCAB_MAX_PLAYS)return;
  if(!speakText(Z.quiz.vocab[i].zh,0.9))return;
  Z.vplays[i]=(Z.vplays[i]||0)+1; save(); updVP(i);
}

/* ── 計時（頭部右上角） ── */
function chip(){return document.getElementById('qz-timer');}
function tick(){
  if(!inProgress())return stopTick();
  var left=CFG.DURATION_MIN*60000-(Date.now()-Z.start), t=chip();
  if(left<=0){if(t)t.textContent='00:00';submit(true);return;}
  var s=Math.ceil(left/1000);
  if(t){t.style.display='';t.textContent='⏱ '+String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0');t.classList.toggle('qz-warn',s<=300);}
}
function startTick(){stopTick();tick();ticking=setInterval(tick,1000);}
function stopTick(){clearInterval(ticking);ticking=null;var t=chip();if(t){t.style.display='none';t.classList.remove('qz-warn');}}

/* ── 評分 ── */
function sentOK(s,i){
  var a=Z.ans.sent[i]; if(a.length!==s.t.length)return false;
  if(a.every(function(v,k){return v===k;}))return true;
  if(s.swap){   // 爸爸／媽媽、爺爺／嫲嫲 調轉次序都得
    var b=s.t.map(function(_,k){return k;}); b[s.swap[0]]=s.swap[1]; b[s.swap[1]]=s.swap[0];
    return a.every(function(v,k){return v===b[k];});
  }
  return false;
}
function clfOK(i){var a=Z.ans.clf[i];return a!=null&&CLF[a][2]===CLF[i][2];}   // 同一個量詞（例如三張「個」）揀邊張都得
function scoreAll(){
  var Q=Z.quiz,a=Z.ans,P=CFG.PTS;
  var Lc=Q.listen.filter(function(x,i){return a.listen[i]===x.ans;}).length;
  var Vc=Q.vocab.filter(function(x,i){return a.vocab[i]===x.ans;}).length;
  var Rc=SENTS.filter(function(s,i){return sentOK(s,i);}).length;
  var Cc=CLF.filter(function(_,i){return clfOK(i);}).length;
  var bonus=Rc===SENTS.length?P.sentBonus:0;
  var L=Lc*P.listen,V=Vc*P.vocab,R=Rc*P.sent+bonus,C=Cc*P.clf;
  return {Lc:Lc,Vc:Vc,Rc:Rc,Cc:Cc,L:L,V:V,R:R,C:C,bonus:bonus,total:L+V+R+C,
    maxL:Q.listen.length*P.listen,maxV:Q.vocab.length*P.vocab,maxR:SENTS.length*P.sent+P.sentBonus,maxC:CLF.length*P.clf,
    max:Q.listen.length*P.listen+Q.vocab.length*P.vocab+SENTS.length*P.sent+P.sentBonus+CLF.length*P.clf};
}
function report(sc,auto){
  var Q=Z.quiz,a=Z.ans,used=Math.min(CFG.DURATION_MIN*60,Math.round((Z.endAt-Z.start)/1000)),out=[];
  out.push('姓名：'+(Z.name||'(未填)'));
  out.push('總分：'+sc.total+'/'+sc.max+'（聽力 '+sc.L+'/'+sc.maxL+'　詞彙 '+sc.V+'/'+sc.maxV+'　句子 '+sc.R+'/'+sc.maxR+(sc.bonus?'（含全對加分 +'+sc.bonus+'）':'')+'　量詞配對 '+sc.C+'/'+sc.maxC+'）');
  out.push('用時：'+Math.floor(used/60)+'分'+(used%60)+'秒　'+(auto?'（時間到自動提交）':''));
  out.push('離開頁面／分頁次數：'+(Z.leaves||0));
  out.push('提交時間：'+new Date(Z.endAt).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong'}));
  out.push('\n【聽力】');
  Q.listen.forEach(function(x,i){out.push((i+1)+'. '+x.q+' → '+(a.listen[i]==null?'(未答)':x.opts[a.listen[i]][0])+' '+(a.listen[i]===x.ans?'✓':'✗（正確：'+x.opts[x.ans][0]+'）'));});
  out.push('\n【詞彙】');
  Q.vocab.forEach(function(x,i){out.push((i+1)+'. [L'+x.ch+'] '+x.zh+' → '+(a.vocab[i]==null?'(未答)':x.opts[a.vocab[i]])+' '+(a.vocab[i]===x.ans?'✓':'✗（正確：'+x.opts[x.ans]+'）')+'　喇叭 '+((Z.vplays&&Z.vplays[i])||0)+' 次');});
  out.push('\n【句子重組】');
  SENTS.forEach(function(s,i){
    var txt=function(ids){return ids.map(function(t){return s.t[t][0]+(s.t[t][3]||'');}).join(' ');};
    var ok=sentOK(s,i);
    out.push((i+1)+'. '+(ok?'✓':'✗')+' 學生：'+(txt(a.sent[i])||'(未答)')+(ok?'':'\n    正確：'+txt(s.t.map(function(_,k){return k;}))));
  });
  out.push('\n【量詞配對】');
  CLF.forEach(function(c,i){out.push((i+1)+'. '+c[0]+' → '+(a.clf[i]==null?'(未配)':CLF[a.clf[i]][2])+' '+(clfOK(i)?'✓':'✗（正確：'+c[2]+'）'));});
  return out.join('\n');
}
async function sendResult(){
  var sc=scoreAll(),body=report(sc,Z.auto);
  var subject='廣東話課堂測驗（一）第1-7課 – '+(Z.name||'未填名')+' – '+sc.total+'/'+sc.max;
  if(CFG.FORM_ENDPOINT){
    try{
      var r=await fetch(CFG.FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({_subject:subject,name:Z.name||'',score:sc.total+'/'+sc.max,message:body})});
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
    if(!(Z.name||'').trim()){alert('請先填姓名 กรุณากรอกชื่อก่อน');var n=q('#qz-nm');if(n)n.focus();return;}
    var left=Z.ans.listen.filter(function(x){return x==null;}).length+Z.ans.vocab.filter(function(x){return x==null;}).length+Z.ans.sent.filter(function(x){return !x.length;}).length;
    var warn=left?'仲有 '+left+' 題未答。\nยังไม่ได้ตอบอีก '+left+' ข้อ\n\n':'';
    if(!confirm(warn+'確定提交？提交後唔可以再改。\nยืนยันการส่ง? ส่งแล้วแก้ไขไม่ได้'))return;
  }
  Z.submitted=true;Z.auto=!!auto;Z.endAt=Date.now();save();
  stopTick();stopSpeech();
  renderPaper();setStatus('wait');hubR();
  setStatus(await sendResult());
}

/* ── 完成後：唯讀試卷 ── */
function setStatus(state){
  var m={wait:['wait','傳送緊… กำลังส่ง…'],ok:['ok','✓ 已寄俾老師 ส่งครูแล้ว'],fail:['bad','✗ 傳送失敗 ส่งไม่สำเร็จ'],mailto:['wait','請喺電郵程式撳「傳送」 กดส่งในแอปอีเมล'],noconfig:['bad','未設定收件電郵，請截圖畀老師 แคปหน้าจอส่งครู']}[state]||['wait',''];
  var el=q('#qz-stat'); if(!el)return;
  el.className='qz-st '+m[0]; el.textContent=m[1];
  var rb=q('#qz-resend'); if(rb)rb.style.display=(state==='ok'||state==='wait')?'none':'';
}
function mk(ok){return ok?'<span class="qz-mk ok">✓</span>':'<span class="qz-mk no">✗</span>';}
function renderPaper(){
  var Q=Z.quiz,a=Z.ans,sc=scoreAll(),end=Z.endAt||Date.now(),P=CFG.PTS;
  var used=Math.min(CFG.DURATION_MIN*60,Math.round((end-Z.start)/1000)),pct=Math.round(sc.total/sc.max*100),LET='ABCD';
  var optList=function(opts,ans,mine,thai,rb){
    return '<ul class="qz-po">'+opts.map(function(o,j){
      var c=j===ans?'corr':(j===mine?'bad':'');
      var tag=j===ans?'<span class="qz-tag">✓ 正確答案</span>':(j===mine?'<span class="qz-tag">✗ 你嘅答案</span>':'');
      return '<li class="'+c+(thai?' qz-th':'')+'">'+LET[j]+'. '+(rb?ruby(o[0],o[1]):esc(o))+(j===ans&&j===mine?'<span class="qz-tag"> · 你嘅答案</span>':'')+tag+'</li>';
    }).join('')+'</ul>'+(mine==null?'<div class="qz-th" style="color:var(--red);font-size:13px;margin-top:4px">未作答 · ไม่ได้ตอบ</div>':'');
  };
  var h='<div class="qz-vbar"><span class="qz-fn">廣東話課堂測驗（一）_第1-7課_'+esc(Z.name||'')+'.pdf</span><span class="qz-st wait" id="qz-stat"></span><button id="qz-resend" style="display:none">重新傳送</button><button id="qz-print">🖨 儲存 PDF</button></div><div class="qz-paper">';
  h+='<h2>'+TITLE+'</h2><div class="qz-en">'+TITLE_TH+'</div>';
  h+='<div class="qz-meta"><span><b>姓名：</b>'+esc(Z.name||'')+'</span><span><b>提交：</b>'+esc(new Date(end).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong',hour12:false}))+'</span><span><b>用時：</b>'+Math.floor(used/60)+'分'+(used%60)+'秒'+(Z.auto?'（時間到）':'')+'</span></div>';
  h+='<div class="qz-scorebox"><div class="qz-stamp"><small>總分 SCORE</small>'+sc.total+' / '+sc.max+'<small>'+pct+'%</small></div><div class="qz-parts"><span>一、聽力</span><b>'+sc.L+' / '+sc.maxL+'</b><br><span>二、詞彙</span><b>'+sc.V+' / '+sc.maxV+'</b><br><span>三、句子重組</span><b>'+sc.R+' / '+sc.maxR+'</b>'+(sc.bonus?' <small>（含全對 +'+sc.bonus+'）</small>':'')+'<br><span>四、量詞配對</span><b>'+sc.C+' / '+sc.maxC+'</b></div></div>';
  h+='<div class="qz-psec"><span>一、聽力 <small class="qz-th">ฟัง</small></span><small>'+sc.L+' / '+sc.maxL+'</small></div>';
  Q.listen.forEach(function(x,i){var ok=a.listen[i]===x.ans;
    h+='<div class="qz-pq '+(ok?'right':'wrong')+'"><div class="qz-pqh">'+mk(ok)+'<span>'+(i+1)+'. '+esc(x.q)+'<small>'+esc(x.th)+'</small></span></div>'+optList(x.opts,x.ans,a.listen[i],false,true)+'</div>';});
  h+='<div class="qz-psec"><span>二、詞彙選擇題 <small class="qz-th">คำศัพท์</small></span><small>'+sc.V+' / '+sc.maxV+'</small></div>';
  Q.vocab.forEach(function(x,i){var ok=a.vocab[i]===x.ans;
    h+='<div class="qz-pq '+(ok?'right':'wrong')+'"><div class="qz-pqh">'+mk(ok)+'<span>'+(i+1)+'.<span class="qz-ch">第'+x.ch+'課</span></span></div><div class="qz-vw">'+ruby(x.zh,x.jp)+'</div>'+optList(x.opts,x.ans,a.vocab[i],true,false)+'</div>';});
  h+='<div class="qz-psec"><span>三、句子重組 <small class="qz-th">เรียงประโยค</small></span><small>'+sc.R+' / '+sc.maxR+'</small></div>';
  SENTS.forEach(function(s,i){var ok=sentOK(s,i);
    var row=function(ids){return ids.map(function(t){return '<span class="qz-stile">'+ruby(s.t[t][0],s.t[t][1])+esc(s.t[t][3]||'')+'</span>';}).join('');};
    h+='<div class="qz-pq '+(ok?'right':'wrong')+'"><div class="qz-pqh">'+mk(ok)+'<span>'+(i+1)+'.</span></div><div class="qz-thp">'+esc(s.th)+'</div>'+
      '<div class="qz-srow"><b>你嘅答案</b><div class="qz-stiles '+(ok?'good':'mine-bad')+'">'+(a.sent[i].length?row(a.sent[i]):'<span class="qz-th" style="font-size:14px;color:var(--red)">未作答 · ไม่ได้ตอบ</span>')+'</div></div>'+
      (ok?'':'<div class="qz-srow"><b>正確答案</b><div class="qz-stiles ans-ok">'+row(s.t.map(function(_,k){return k;}))+'</div></div>')+'</div>';});
  if(sc.bonus)h+='<div class="qz-th" style="font-size:13px;color:#1f6f3d;margin:6px 0">★ 句子重組全對，額外加 '+sc.bonus+' 分 · ตอบถูกทุกข้อ ได้โบนัส '+sc.bonus+' คะแนน</div>';
  h+='<div class="qz-psec"><span>四、量詞配對 <small class="qz-th">จับคู่ลักษณนาม</small></span><small>'+sc.C+' / '+sc.maxC+'</small></div>';
  CLF.forEach(function(c,i){var ok=clfOK(i),m=a.clf[i];
    h+='<div class="qz-pq '+(ok?'right':'wrong')+'"><div class="qz-pqh">'+mk(ok)+'<span>'+(i+1)+'.</span><span class="qz-vw" style="padding:0;font-size:22px">'+ruby(c[0],c[1])+'</span><span style="margin-left:auto;font-weight:400;font-size:15px">你嘅答案：'+(m==null?'<span class="qz-th" style="color:var(--red)">未配 · ไม่ได้จับคู่</span>':'<b>'+ruby(CLF[m][2],CLF[m][3])+'</b>')+(ok?'':'　正確：<b>'+ruby(c[2],c[3])+'</b>')+'</span></div></div>';});
  h+='<div class="qz-foot">— 完 · จบ —<br>此試卷已提交，唯讀 · ส่งแล้ว ไม่สามารถแก้ไขได้</div></div>';
  ROOT.classList.add('qz-pm');
  ROOT.innerHTML=h;
  try{window.scrollTo(0,0);}catch(e){}
  q('#qz-resend').onclick=async function(){setStatus('wait');setStatus(await sendResult());};
  q('#qz-print').onclick=function(){
    document.body.classList.add('qz-print');
    var done=function(){document.body.classList.remove('qz-print');window.removeEventListener('afterprint',done);};
    window.addEventListener('afterprint',done);
    window.print(); setTimeout(done,2000);
  };
}

/* ── 鎖定（只喺測驗頁面範圍） ── */
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

/* ── 事件 ── */
ROOT.addEventListener('click',function(e){
  var t=e.target;
  if(t.closest('#qz-start'))return startExam();
  if(t.closest('#qz-reload')){
    var b=t.closest('#qz-reload'); b.disabled=true; b.textContent='讀緊… กำลังโหลด…';
    Promise.resolve(typeof refreshFromSheets==='function'&&refreshFromSheets()).then(function(){renderStart();},function(){renderStart();});
    return;
  }
  if(!inProgress())return;
  var o=t.closest('.qz-opt');
  if(o){var k=o.dataset.k,i=+o.dataset.i,j=+o.dataset.j;Z.ans[k][i]=j;
    ROOT.querySelectorAll('.qz-opt[data-k="'+k+'"][data-i="'+i+'"]').forEach(function(b){b.classList.toggle('on',+b.dataset.j===j);});save();return;}
  var tl=t.closest('.qz-tile');
  if(tl){var s=+tl.dataset.s,id=+tl.dataset.t,arr=Z.ans.sent[s];
    if(tl.dataset.in==='1')arr.splice(arr.indexOf(id),1);else arr.push(id);
    renderSent(s);save();return;}
  var r=t.closest('[data-reset]');
  if(r){var s2=+r.dataset.reset;Z.ans.sent[s2]=[];renderSent(s2);save();return;}
  var vp=t.closest('[data-vp]'); if(vp)return playVocab(+vp.dataset.vp);
  var cc=t.closest('.qz-cc'); if(cc)return clfTap(cc.dataset.side,+cc.dataset.id);
  if(t.closest('#qz-pN'))return play('n');
  if(t.closest('#qz-pS'))return play('s');
  if(t.closest('#qz-submit'))return submit(false);
});
if(window.qzDrag)window.qzDrag(ROOT,'qz-',{active:inProgress,arr:function(si){return Z.ans.sent[si];},change:function(si){renderSent(si);save();}});
ROOT.addEventListener('input',function(e){if(e.target.id==='qz-nm'&&Z){Z.name=e.target.value;save();}});

/* ── 同主 App 嘅接口 ── */
// 測驗進行中，唔俾轉去其他分頁（返 false = 擋住）
window.qzGuard=function(tab){
  if(!CFG.LOCK_NAV||!inProgress()||tab==='quiz')return true;
  alert('測驗進行中，唔可以離開呢頁。請先提交測驗。\nกำลังสอบอยู่ ออกจากหน้านี้ไม่ได้ กรุณาส่งข้อสอบก่อน');
  return false;
};
window.qzShow=function(){ if(!Z)renderStart(); hubR(); };        // 入返測驗分頁：未開始就顯示開始畫面（詞彙可能剛讀完）
window.qzLeave=function(){ stopSpeech(); };
window.qzResume=function(){                               // 重新整理後測驗仍進行中 → 直接返測驗頁
  if(inProgress()&&typeof showTab==='function')showTab('quiz');
};

/* ── 啟動 ── */
Z=load();
if(Z&&Z.submitted){renderPaper();setStatus(Z.sent?'ok':'fail');}
else if(inProgress()){render();startTick();}
else{Z=null;renderStart();}
hubR(); window.qzResume();   // 主 App 可能已經初始化完（連呢個腳本之前），所以呢度都要叫一次
})();

