/* ══ 課堂測驗（三）· 第15–19課 ══ 詞彙用主 App 已讀入嘅 Google Sheet（S.data.vocab） */
window.QZ_L15=function(C){
'use strict';
var P=C.prefix;
var ROOT=document.getElementById(C.root); if(!ROOT)return;
var D=window.QZ_DATA&&window.QZ_DATA[C.data]; if(!D)return;
var CFG=D.CFG,PTS=D.PTS,TITLE=D.TITLE,TITLE_TH=D.TITLE_TH,PASSAGE=D.PASSAGE,LQ=D.LQ,QA=D.QA,SENTS=D.SENTS,HOB=D.HOB,CLF=D.CLF,MDATA=D.MDATA,parseSeg=D.parseSeg,segText=D.segText,FILE=D.FILE,SUBJECT=D.SUBJECT;
function q(s){return ROOT.querySelector(s);}
var KEY='cq_'+CFG.QUIZ_ID,HK=CFG.QUIZ_ID;
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
var Z=null,ticking=null,msel={hob:null,clf:null};
function load(){try{return JSON.parse(localStorage.getItem(KEY));}catch(e){return null;}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(Z));}catch(e){}}
if(location.search.indexOf('reset=teacher')>=0){try{localStorage.removeItem(KEY);}catch(e){} if(window.QZA)QZA.clear(HK);}
function inProgress(){return !!(Z&&Z.quiz&&!Z.submitted);}
(window.qzExams=window.qzExams||{})[C.n]={prog:inProgress,show:function(){if(!Z)renderStart();}};
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

function buildQuiz(pool,reuse){
  var byCh={}; pool.forEach(function(w){(byCh[w[0]]=byCh[w[0]]||[]).push(w);});
  var lists=shuffle(Object.keys(byCh)).map(function(c){return shuffle(byCh[c]);});
  var picked=[];
  if(reuse&&reuse.length){   // 重考：用返上次同一批詞彙（選項同次序重新打亂）
    picked=shuffle(reuse.map(function(w){return w.slice();}));
    reuse.forEach(function(w){if(!pool.some(function(p){return p[1]===w[1]&&p[3]===w[3];}))pool.push(w);});
  }else{
    while(picked.length<CFG.VOCAB_COUNT&&lists.some(function(l){return l.length;})){
      for(var i=0;i<lists.length;i++){var l=lists[i]; if(l.length&&picked.length<CFG.VOCAB_COUNT)picked.push(l.pop());}
    }
    picked=shuffle(picked);
  }
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
  if(ready)h+='<div class="qz-ok">✅ 詞彙已準備好（第'+CFG.CHAPTER_MIN+'–'+CFG.CHAPTER_MAX+'課，共 '+pool.length+' 個）</div><button class="qz-btn big" id="'+P+'start">開始測驗 · เริ่มทำข้อสอบ</button>';
  else h+='<div class="qz-err">⚠️ 未讀到最新詞彙（'+(live?'第'+CFG.CHAPTER_MIN+'–'+CFG.CHAPTER_MAX+'課嘅詞彙太少：'+pool.length+' 個':'Google Sheet 未連接')+'），暫時唔可以開考。<br><span class="qz-th">ยังโหลดคำศัพท์ไม่สำเร็จ ยังเริ่มสอบไม่ได้</span></div><button class="qz-btn" id="'+P+'reload">🔄 重新載入詞彙 · โหลดใหม่</button>';
  h+='</div>';
  if(/check=teacher/.test(location.search)){
    var cnt={}; pool.forEach(function(w){cnt[w[0]]=(cnt[w[0]]||0)+1;});
    h+='<div class="qz-card"><b>【老師檢查】詞彙共 '+pool.length+' 個</b><br>'+Object.keys(cnt).sort(function(a,b){return a-b;}).map(function(c){return '第'+c+'課：'+cnt[c];}).join('　')+
      '<br><br><table class="qz-tbl"><tr><th>課</th><th>中文</th><th>粵拼</th><th>泰文</th></tr>'+pool.map(function(w){return '<tr><td>'+w[0]+'</td><td>'+esc(w[1])+'</td><td>'+esc(w[2])+'</td><td class="qz-th">'+esc(w[3])+'</td></tr>';}).join('')+'</table></div>';
  }
  ROOT.innerHTML=h;
}
function startExam(reuse,keepName){
  var pool=getPool(); if(!reuse&&(!vocabLive()||pool.length<Math.max(8,CFG.VOCAB_COUNT)))return renderStart();
  if(!reuse&&!confirm('開始後即時倒數 '+CFG.DURATION_MIN+' 分鐘，同埋唔可以轉去其他分頁。\nเริ่มแล้วจับเวลาทันที และออกจากหน้านี้ไม่ได้\n\n確定開始？ ยืนยันเริ่ม?'))return;
  var nul=function(a){return a.map(function(){return null;});};
  Z={start:Date.now(),name:keepName||'',attempt:QZA.list(HK).length+1,leaves:0,plays:{n:0,s:0},qplays:QA.map(function(){return 0;}),submitted:false};
  Z.quiz=buildQuiz(pool,reuse);
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
  q('#'+P+'ans'+i).innerHTML=placed.map(function(t){return tileHtml(i,t,true);}).join('');
  q('#'+P+'pool'+i).innerHTML=pool.map(function(t){return tileHtml(i,t,false);}).join('');
}
function secHead(zh,th,pts){return '<div class="qz-sec">'+zh+' <span class="qz-th" style="font-size:14px;color:var(--mute)">'+th+'</span><span class="qz-spt">'+pts+'</span></div>';}
function optBtns(k,i,opts,sel,cls){return opts.map(function(o,j){
  var inner=cls==='qz-lopt'?'<b class="qz-let">'+'ABCD'[j]+'</b><span class="qz-oz">'+esc(o[0])+(o[1]?'<span class="qz-oth qz-th">'+esc(o[1])+'</span>':'')+'</span>':
            cls==='qz-lopt qa'?'<b class="qz-let">'+'ABCD'[j]+'</b><span class="qz-oz">'+segHtml(o.seg)+'</span>':esc(o);
  return '<button class="qz-opt '+cls+(sel===j?' on':'')+'" data-k="'+k+'" data-i="'+i+'" data-j="'+j+'">'+inner+'</button>';}).join('');}

function render(){
  ROOT.classList.remove('qz-pm');
  var Q=Z.quiz,nL=Q.listen.length,nV=Q.vocab.length,nA=QA.length,nR=SENTS.length,nH=HOB.length,nC=CLF.length;
  var h='<div class="qz-card"><label class="qz-nm" for="'+P+'nm">姓名 · ชื่อ-นามสกุล</label><input type="text" id="'+P+'nm" autocomplete="off" placeholder="請輸入你嘅名 / กรอกชื่อของคุณ" value="'+esc(Z.name||'')+'"></div>';
  /* 一、聽力 */
  h+=secHead('一、聽力','ฟัง',nL+'題 × '+PTS.listen+'分 = '+nL*PTS.listen+'分');
  h+='<p class="qz-sub">聽一位工人姐姐嘅自我介紹，揀正確答案。每種速度最多播 '+CFG.MAX_PLAYS+' 次。<br><span class="qz-th">ฟังแม่บ้านแนะนำตัว แล้วเลือกคำตอบที่ถูกต้อง เล่นได้สูงสุดความเร็วละ '+CFG.MAX_PLAYS+' ครั้ง</span></p>';
  h+='<div class="qz-card"><div class="qz-ptitle">自我介紹 <span class="qz-th" style="font-weight:600">· แนะนำตัว</span></div><div class="qz-btns"><button class="qz-btn" data-play="n">▶ 正常速度 <span id="'+P+'cN"></span></button><button class="qz-btn slow" data-play="s">🐢 慢速 <span id="'+P+'cS"></span></button></div>';
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
      '<div class="qa-q qz-zh">'+segHtml(x.q)+'</div>'+
      '<div class="qz-btns"><button class="qz-btn" data-qp="'+i+'" data-r="n">🔊 聽問題 <span id="'+P+'qc'+i+'"></span></button><button class="qz-btn slow" data-qp="'+i+'" data-r="s">🐢 慢速</button></div>'+
      '<div class="qz-opts">'+optBtns('qa',i,Q.qa[i].opts,Z.ans.qa[i],'qz-lopt qa')+'</div></div>';
  });
  /* 四、句子重組 */
  h+=secHead('四、句子重組','เรียงประโยค',nR+'題 × '+PTS.sent+'分 = '+nR*PTS.sent+'分');
  h+='<p class="qz-sub">按泰文意思，將字塊砌成正確句子。撳字塊加入，<b>亦可以拖拉字塊改次序</b>（拖出答案欄＝取消），唔洗重頭嚟過。<br><span class="qz-th">เรียงคำให้เป็นประโยคตามความหมายภาษาไทย แตะคำเพื่อเพิ่ม หรือ<b>ลากคำเพื่อสลับตำแหน่ง</b> (ลากออกนอกช่อง = เอาออก) ไม่ต้องเริ่มใหม่</span></p>';
  SENTS.forEach(function(s,i){
    h+='<div class="qz-card"><div class="qz-qt"><span class="qz-num">'+(i+1)+'.</span></div><div class="qz-thai-s qz-th">'+esc(s.th)+'</div><div class="qz-ans" id="'+P+'ans'+i+'"></div><div class="qz-pool" id="'+P+'pool'+i+'"></div><div class="qz-rs"><button class="qz-btn ghost" data-reset="'+i+'" style="padding:6px 12px;font-size:12px">↺ 重來 / เริ่มใหม่</button></div></div>';
  });
  /* 五、興趣配對 */
  h+=secHead('五、興趣配對','จับคู่งานอดิเรก',nH+'組 × '+PTS.hob+'分 = '+nH*PTS.hob+'分');
  h+='<p class="qz-sub">先撳左邊嘅興趣，再撳右邊啱嘅動詞，配成一對（例如：打＋羽毛球）。撳返已配好嘅卡可以取消。<br><span class="qz-th">แตะงานอดิเรกด้านซ้าย แล้วแตะคำกริยาด้านขวาที่ใช้คู่กัน (เช่น 打 + 羽毛球) แตะการ์ดที่จับคู่แล้วเพื่อยกเลิก</span></p><div class="qz-card"><div class="qz-clf" id="'+P+'m-hob"></div></div>';
  /* 六、量詞配對 */
  h+=secHead('六、量詞配對','จับคู่ลักษณนาม',nC+'組 × '+PTS.clf+'分 = '+nC*PTS.clf+'分');
  h+='<p class="qz-sub">先撳左邊嘅物件，再撳右邊啱嘅量詞，配成一對（其中 5 組係身體量詞）。撳返已配好嘅卡可以取消。<br><span class="qz-th">แตะคำนามด้านซ้าย แล้วแตะลักษณนามด้านขวาที่ถูกต้อง (5 ข้อเป็นลักษณนามของอวัยวะ) แตะการ์ดที่จับคู่แล้วเพื่อยกเลิก</span></p><div class="qz-card"><div class="qz-clf" id="'+P+'m-clf"></div></div>';
  h+='<button class="qz-btn big" id="'+P+'submit">提交測驗 · ส่งข้อสอบ</button><p class="qz-note">時間到會自動提交 · หมดเวลาจะส่งอัตโนมัติ</p>';
  ROOT.innerHTML=h;
  SENTS.forEach(function(_,i){renderSent(i);});
  msel={hob:null,clf:null}; renderMatch('hob'); renderMatch('clf');
  updPlays();
}

/* 配對（興趣／量詞）：兩欄卡牌（已打亂），先撳左再撳右；同一個答案（例如兩張一樣嘅量詞）揀邊張都得 */
function partnerOf(g,cid){var A=Z.ans[g];for(var n=0;n<A.length;n++)if(A[n]===cid)return n;return -1;}
function renderMatch(g){
  var el=q('#'+P+'m-'+g); if(!el)return;
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
  var cN=q('#'+P+'cN'),cS=q('#'+P+'cS');
  if(cN&&cS){
    cN.textContent='('+(CFG.MAX_PLAYS-Z.plays.n)+')'; cS.textContent='('+(CFG.MAX_PLAYS-Z.plays.s)+')';
    q('[data-play="n"]').disabled=Z.plays.n>=CFG.MAX_PLAYS;
    q('[data-play="s"]').disabled=Z.plays.s>=CFG.MAX_PLAYS;
  }
  QA.forEach(function(_,i){
    var left=CFG.QA_MAX_PLAYS-(Z.qplays[i]||0),c=q('#'+P+'qc'+i); if(!c)return;
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
  out.push('作答次數：第 '+(Z.attempt||1)+' 次');
  var hh=QZA.list(HK); if(hh.length>1)out.push('歷次總分：'+hh.map(function(r){return '第'+r.n+'次 '+r.total+'/'+r.max;}).join('　'));
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
  var subject=SUBJECT+' – '+(Z.name||'未填名')+' – '+sc.total+'/'+sc.maxAll+'（第'+(Z.attempt||1)+'次）';
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
    if(!(Z.name||'').trim()){alert('請先填姓名 กรุณากรอกชื่อก่อน');var n=q('#'+P+'nm');if(n)n.focus();return;}
    var a=Z.ans,nn=function(arr){return arr.filter(function(x){return x==null;}).length;};
    var left=nn(a.listen)+nn(a.vocab)+nn(a.qa)+a.sent.filter(function(x){return !x.length;}).length+nn(a.hob)+nn(a.clf);
    var warn=left?'仲有 '+left+' 題未答。\nยังไม่ได้ตอบอีก '+left+' ข้อ\n\n':'';
    if(!confirm(warn+'確定提交？提交後唔可以再改。\nยืนยันการส่ง? ส่งแล้วแก้ไขไม่ได้'))return;
  }
  Z.submitted=true;Z.auto=!!auto;Z.endAt=Date.now();save();recordAttempt();
  stopTick();stopSpeech();
  renderPaper();setStatus('wait');hubR();
  setStatus(await sendResult());
}

/* ── 重考＋作答比較（共用模組 js/quiz-attempts.js） ── */
var CST=null,CTITLES={L:'一、聽力',V:'二、詞彙',A:'三、問答',R:'四、句子重組',H:'五、興趣配對',C:'六、量詞配對'};
function vbarBtns(cls){
  var n=QZA.list(HK).length,c=cls?'class="'+cls+'" ':'';
  return '<button '+c+'data-cmp="retake">🔁 重考 · ทำซ้ำ</button>'+(n>=2?'<button '+c+'data-cmp="show">📊 比較 · เปรียบเทียบ ('+n+')</button>':'');
}
function collectItems(){
  var Q=Z.quiz,a=Z.ans,it=[];
  Q.listen.forEach(function(x,i){it.push(['L','L'+i,x.q,a.listen[i]===x.ans?1:0,a.listen[i]==null?'':x.opts[a.listen[i]][0],x.opts[x.ans][0]]);});
  Q.vocab.forEach(function(x,i){it.push(['V','V:'+x.zh+'|'+x.opts[x.ans],x.zh+(x.jp?'（'+x.jp+'）':''),a.vocab[i]===x.ans?1:0,a.vocab[i]==null?'':x.opts[a.vocab[i]],x.opts[x.ans]]);});
  Q.qa.forEach(function(x,i){it.push(['A','A'+i,segText(QA[i].q),a.qa[i]===x.ans?1:0,a.qa[i]==null?'':segText(x.opts[a.qa[i]].seg),segText(x.opts[x.ans].seg)]);});
  SENTS.forEach(function(s,i){var txt=function(ids){return ids.map(function(t){return s.t[t][0]+(s.t[t][3]||'');}).join('');};it.push(['R','R'+i,s.th,sentOK(s,i)?1:0,txt(a.sent[i]),txt(s.t.map(function(_,k){return k;}))]);});
  HOB.forEach(function(c,i){it.push(['H','H'+i,c[0],matchOK('hob',i)?1:0,a.hob[i]==null?'':HOB[a.hob[i]][2],c[2]]);});
  CLF.forEach(function(c,i){it.push(['C','C'+i,c[0],matchOK('clf',i)?1:0,a.clf[i]==null?'':CLF[a.clf[i]][2],c[2]]);});
  return it;
}
function recordAttempt(){
  if(Z.recorded)return; Z.recorded=true;
  var sc=scoreAll(),Q=Z.quiz;
  QZA.push(HK,{n:Z.attempt||1,t:Z.endAt,total:sc.total,max:sc.maxAll,auto:!!Z.auto,
    sc:[sc.L,sc.V,sc.A,sc.R,sc.H,sc.C],mx:[sc.max.L,sc.max.V,sc.max.A,sc.max.R,sc.max.H,sc.max.C],
    items:collectItems(),vocab:Q.vocab.map(function(x){return [x.ch,x.zh,x.jp,x.opts[x.ans]];})});
  save();
}
function retake(){
  var H=QZA.list(HK); if(!H.length)return;
  if(CFG.MAX_ATTEMPTS&&H.length>=CFG.MAX_ATTEMPTS){alert('已經用完重考次數 · ใช้สิทธิ์ทำซ้ำครบแล้ว');return;}
  var warn=Z&&Z.submitted&&!Z.sent?'⚠️ 上一次成績仲未寄俾老師（可以先返去試卷撳「重新傳送」）。\n\n':'';
  if(!confirm(warn+'重考會用同一份試卷（詞彙都係同一批字），題目次序同選項會重新打亂；完成後可以同之前比較邊度進步。\n開始後即時倒數 '+CFG.DURATION_MIN+' 分鐘，同埋唔可以轉去其他分頁。\nทำข้อสอบชุดเดิมอีกครั้ง จับเวลาทันที ออกจากหน้านี้ไม่ได้\n\n確定重考？ ยืนยัน?'))return;
  CST=null; startExam(H[H.length-1].vocab,Z&&Z.name);
}
function showCompare(keepY){
  var y=window.scrollY||0;
  if(!CST)CST=QZA.initState(HK);
  ROOT.classList.add('qz-pm');
  ROOT.innerHTML='<div class="qz-vbar"><span class="qz-fn">作答比較 · เปรียบเทียบผล</span><button data-cmp="back">← 返回試卷</button><button data-cmp="retake">🔁 重考 · ทำซ้ำ</button></div><div class="qz-paper qzc"><h2>作答比較</h2><div class="qz-en">'+esc(TITLE)+'</div>'+QZA.html(HK,CST,CTITLES)+'</div>';
  try{window.scrollTo(0,keepY?y:0);}catch(e){}
}
function cmpAct(d){
  if(d.cmp==='retake')return retake();
  if(d.cmp==='show'){CST=null;return showCompare();}
  if(d.cmp==='back'){CST=null;if(Z&&Z.submitted){renderPaper();setStatus(Z.sent?'ok':'fail');}else renderStart();return;}
  if(d.cmp==='filter'){CST=CST||QZA.initState(HK);CST.f=d.f;return showCompare(true);}
}

function setStatus(state){
  var m={wait:['wait','傳送緊… กำลังส่ง…'],ok:['ok','✓ 已寄俾老師 ส่งครูแล้ว'],fail:['bad','✗ 傳送失敗 ส่งไม่สำเร็จ'],mailto:['wait','請喺電郵程式撳「傳送」 กดส่งในแอปอีเมล'],noconfig:['bad','未設定收件電郵，請截圖畀老師 แคปหน้าจอส่งครู']}[state]||['wait',''];
  var el=q('#'+P+'stat'); if(!el)return;
  el.className='qz-st '+m[0]; el.textContent=m[1];
  var rb=q('#'+P+'resend'); if(rb)rb.style.display=(state==='ok'||state==='wait')?'none':'';
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
  var h='<div class="qz-vbar"><span class="qz-fn">'+esc(FILE)+'_'+esc(Z.name||'')+'.pdf</span><span class="qz-st wait" id="'+P+'stat"></span><button id="'+P+'resend" style="display:none">重新傳送</button>'+vbarBtns()+'<button id="'+P+'print">🖨 儲存 PDF</button></div><div class="qz-paper">';
  h+='<h2>'+TITLE+'</h2><div class="qz-en">'+TITLE_TH+'</div>';
  h+='<div class="qz-meta"><span><b>作答：</b>第'+(Z.attempt||1)+'次</span><span><b>姓名：</b>'+esc(Z.name||'')+'</span><span><b>提交：</b>'+esc(new Date(end).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong',hour12:false}))+'</span><span><b>用時：</b>'+Math.floor(used/60)+'分'+(used%60)+'秒'+(Z.auto?'（時間到）':'')+'</span></div>';
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
    h+='<div class="qz-pq '+(g?'right':'wrong')+'"><div class="qz-pqh">'+mk(g)+'<span>'+(i+1)+'.</span>'+chip(g?PTS.qa:0,PTS.qa)+'</div><div class="qz-vw" style="font-size:22px">'+segHtml(QA[i].q)+'</div>'+
      optList(x.opts,x.ans,a.qa[i],false,function(o){return segHtml(o.seg);})+'</div>';});
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
  h+='<div class="qz-retake">'+vbarBtns('qz-btn')+'</div><div class="qz-foot">— 完 · จบ —<br>此試卷已提交，唯讀 · ส่งแล้ว ไม่สามารถแก้ไขได้</div></div>';
  ROOT.classList.add('qz-pm');
  ROOT.innerHTML=h;
  try{window.scrollTo(0,0);}catch(e){}
  q('#'+P+'resend').onclick=async function(){setStatus('wait');setStatus(await sendResult());};
  q('#'+P+'print').onclick=function(){
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
  var cm=t.closest('[data-cmp]'); if(cm)return cmpAct(cm.dataset);
  if(t.closest('#'+P+'start'))return startExam();
  if(t.closest('#'+P+'reload')){
    var b=t.closest('#'+P+'reload'); b.disabled=true; b.textContent='讀緊… กำลังโหลด…';
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
  if(t.closest('#'+P+'submit'))return submit(false);
});
if(window.qzDrag)window.qzDrag(ROOT,''+P+'',{active:inProgress,arr:function(si){return Z.ans.sent[si];},change:function(si){renderSent(si);save();}});
ROOT.addEventListener('change',function(e){var sl=e.target.closest&&e.target.closest('[data-cmp-sel]');if(!sl)return;CST=CST||QZA.initState(HK);CST[sl.dataset.cmpSel]=+sl.value;showCompare(true);});
ROOT.addEventListener('input',function(e){if(e.target.id===''+P+'nm'&&Z){Z.name=e.target.value;save();}});

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
};

window.QZ_L15({n:4,root:'qz4-root',prefix:'qz4-',data:'l15_19'});
