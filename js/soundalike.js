(function(){
'use strict';

/* ========= 資料：音近詞配對 =========
   type: 聲調 / 韻母 / 韻尾 / 同音 / 詞組
   jp 粵拼；th 泰文意思 */
var PAIRS=[
 {id:1,type:'韻母',a:{zh:'九點',jp:'gau2 dim2',th:'เก้าโมง'},b:{zh:'搞掂',jp:'gaau2 dim6',th:'เรียบร้อย / จัดการเสร็จ'},tip:'「九點」係 9:00；「搞掂」係「搞定咗」。gau 同 gaau 嘅元音唔同，dim2 同 dim6 聲調都唔同。'},
 {id:2,type:'聲調',a:{zh:'四',jp:'sei3',th:'เลขสี่'},b:{zh:'死',jp:'sei2',th:'ตาย'},tip:'同一個音節，只係聲調唔同：四（第3聲，平）、死（第2聲，上升）。講錯會好尷尬！'},
 {id:3,type:'聲調',a:{zh:'買',jp:'maai5',th:'ซื้อ'},b:{zh:'賣',jp:'maai6',th:'ขาย'},tip:'買（第5聲，低升）同 賣（第6聲，低平）。一買一賣，意思相反，聲調要分清。'},
 {id:4,type:'韻母',a:{zh:'雞',jp:'gai1',th:'ไก่'},b:{zh:'街',jp:'gaai1',th:'ถนน'},tip:'gai 嘅 a 短，gaai 嘅 aa 長。聲調相同（第1聲），只係元音長短唔同。'},
 {id:5,type:'聲調',a:{zh:'魚',jp:'jyu4',th:'ปลา'},b:{zh:'雨',jp:'jyu5',th:'ฝน'},tip:'魚（第4聲，低降）同 雨（第5聲，低升）。'},
 {id:6,type:'聲調',a:{zh:'係',jp:'hai6',th:'ใช่ / เป็น'},b:{zh:'喺',jp:'hai2',th:'อยู่ที่'},tip:'「係」＝是；「喺」＝在。我係老師 ≠ 我喺老師。泰語學生好易搞錯，要特別練。'},
 {id:7,type:'聲調',a:{zh:'糖',jp:'tong4',th:'น้ำตาล / ลูกอม'},b:{zh:'湯',jp:'tong1',th:'ซุป'},tip:'糖（第4聲，低降）同 湯（第1聲，高平）。'},
 {id:8,type:'韻尾',a:{zh:'三',jp:'saam1',th:'เลขสาม'},b:{zh:'山',jp:'saan1',th:'ภูเขา'},tip:'韻尾 -m（閉埋嘴）同 -n（舌尖頂上顎）。泰語都有 -m／-n 分別，可以用泰語嘅感覺去聽。'},
 {id:9,type:'韻尾',a:{zh:'心',jp:'sam1',th:'หัวใจ'},b:{zh:'新',jp:'san1',th:'ใหม่'},tip:'-m 同 -n 結尾：心（閉口）、新（舌尖）。'},
 {id:10,type:'韻尾',a:{zh:'十',jp:'sap6',th:'เลขสิบ'},b:{zh:'食',jp:'sik6',th:'กิน'},tip:'入聲韻尾 -p 同 -k：十 sap6、食 sik6。尾音要「收」住，唔好放出氣。'},
 {id:11,type:'聲調',a:{zh:'痛',jp:'tung3',th:'เจ็บ'},b:{zh:'同',jp:'tung4',th:'ด้วยกัน / และ'},tip:'痛（第3聲，中平）同 同（第4聲，低降）。照顧長者好常用「痛」。'},
 {id:12,type:'聲調',a:{zh:'老',jp:'lou5',th:'แก่'},b:{zh:'路',jp:'lou6',th:'ทาง'},tip:'老（第5聲，低升）同 路（第6聲，低平）。'},
 {id:13,type:'聲調',a:{zh:'錢',jp:'cin2',th:'เงิน'},b:{zh:'前',jp:'cin4',th:'ข้างหน้า'},tip:'錢（第2聲，高升）同 前（第4聲，低降）。'},
 {id:14,type:'韻母',a:{zh:'煲',jp:'bou1',th:'หม้อ / ต้ม'},b:{zh:'包',jp:'baau1',th:'ซาลาเปา / ห่อ'},tip:'bou 同 baau 嘅元音唔同，聲調同樣係第1聲。'},
 {id:15,type:'聲調',a:{zh:'水',jp:'seoi2',th:'น้ำ'},b:{zh:'稅',jp:'seoi3',th:'ภาษี'},tip:'水（第2聲，高升）同 稅（第3聲，中平）。'},
 {id:16,type:'聲調',a:{zh:'野',jp:'je5',th:'ของ / สิ่งของ'},b:{zh:'夜',jp:'je6',th:'กลางคืน'},tip:'野（第5聲，低升）同 夜（第6聲，低平）。「食野」＝食嘢（吃東西）。'},
 {id:17,type:'聲調',a:{zh:'鞋',jp:'haai4',th:'รองเท้า'},b:{zh:'蟹',jp:'haai5',th:'ปู'},tip:'鞋（第4聲，低降）同 蟹（第5聲，低升）。'},
 {id:18,type:'同音',a:{zh:'九',jp:'gau2',th:'เลขเก้า'},b:{zh:'狗',jp:'gau2',th:'หมา'},tip:'完全同音！要靠上文下理分：「九個」定「狗」？粵語有好多同音字。'},
 {id:19,type:'聲調',a:{zh:'豬',jp:'zyu1',th:'หมู'},b:{zh:'煮',jp:'zyu2',th:'ทำอาหาร / ต้ม'},tip:'豬（第1聲，高平）同 煮（第2聲，高升）。'},
 {id:20,type:'聲調',a:{zh:'返',jp:'faan1',th:'กลับ'},b:{zh:'飯',jp:'faan6',th:'ข้าว'},tip:'返（第1聲，高平）同 飯（第6聲，低平）。「返屋企」＝返家，「食飯」＝食飯。'},
 {id:21,type:'聲調',a:{zh:'試',jp:'si3',th:'ลอง'},b:{zh:'時',jp:'si4',th:'เวลา'},tip:'試（第3聲，中平）同 時（第4聲，低降）。'},
 {id:22,type:'詞組',a:{zh:'鬆化',jp:'sung1 faa3',th:'นุ่มฟู / ร่วนซุย'},b:{zh:'餸飯',jp:'sung3 faan6',th:'ข้าวราดแกง / ข้าวกับกับ'},tip:'「鬆化」形容食物鬆軟；「餸飯」係一碟餸配白飯嘅套餐。sung1 同 sung3 聲調唔同；faa3 同 faan6 除咗聲調，韻尾都唔同（冇尾 vs -n）。'},
 {id:23,type:'詞組',a:{zh:'衣架',jp:'ji1 gaa2',th:'ไม้แขวนเสื้อ'},b:{zh:'宜家',jp:'ji4 gaa1',th:'ตอนนี้'},tip:'聲調唔同：衣（第1聲）架（第2聲） vs 宜（第4聲）家（第1聲）。「宜家」即係「而家」（現在），日常多寫「而家」；宜家亦係 IKEA 嘅中文名。'},
 {id:24,type:'詞組',a:{zh:'嘔吐',jp:'au2 tou3',th:'อาเจียน'},b:{zh:'牛肚',jp:'ngau4 tou5',th:'กระเพาะวัว'},tip:'「牛肚」係牛嘅胃，火鍋同點心常見。au2 同 ngau4：有冇 ng- 聲母，聲調都唔同（泰文有 ง，所以 ng- 對泰語學生唔難）；tou3 同 tou5 聲調唔同。'},
 {id:25,type:'詞組',a:{zh:'八個',jp:'baat3 go3',th:'แปดอัน / แปดชิ้น'},b:{zh:'不過',jp:'bat1 gwo3',th:'แต่ / อย่างไรก็ตาม'},tip:'八 baat3 同 不 bat1：元音長短（aa vs a）同聲調唔同；個 go3 同 過 gwo3：有冇 w 圓唇。'},
 {id:26,type:'詞組',a:{zh:'好濕',jp:'hou2 sap1',th:'เปียกมาก / ชื้นมาก'},b:{zh:'六十',jp:'luk6 sap6',th:'หกสิบ'},tip:'後面 sap1（高平）同 sap6（低平）只係聲調唔同；前面 hou2 同 luk6 唔同音，但快講嘅時候好易聽錯。'},
 {id:27,type:'詞組',a:{zh:'洗衣機',jp:'sai2 ji1 gei1',th:'เครื่องซักผ้า'},b:{zh:'洗自己',jp:'sai2 zi6 gei2',th:'ล้างตัวเอง / อาบน้ำเอง'},tip:'頭一個字 sai2 一樣；後面「衣機」ji1 gei1 同「自己」zi6 gei2 聲調同聲母（j- vs z-）都有分別。講錯就變咗「洗自己」！'}
];
var TYPES=['全部','聲調','韻母','韻尾','同音','詞組'];
var TYPE_CLASS={'聲調':'t1','韻母':'t2','韻尾':'t3','同音':'t4','詞組':'t5'};

/* ========= 小工具 ========= */
var ROOT=document.getElementById('sa-root');
function $(s,r){return (r||ROOT).querySelector(s);}
function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e;}
function shuffle(arr){var a=arr.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
function wordHTML(w){return '<span class="jp">'+w.jp+'</span><span class="zh">'+w.zh+'</span><span class="th">'+w.th+'</span>';}

/* ========= 朗讀 ========= */
var voice=null, SLOW=false, SYN=window.speechSynthesis||null, cancelAt=0;
function showVoiceWarn(){$('#sa-banner').style.display='block';}
function pickVoice(){
  if(!SYN){showVoiceWarn();return;}
  var vs=SYN.getVoices()||[];
  voice=null;
  for(var i=0;i<vs.length;i++){if(/zh[-_]HK|yue/i.test(vs[i].lang)){voice=vs[i];break;}}
  if(vs.length&&!voice)showVoiceWarn();
}
function stopSpeech(){try{if(SYN&&(SYN.speaking||SYN.pending)){SYN.cancel();cancelAt=Date.now();}}catch(e){}}
function speak(text){
  if(!SYN)return;
  try{
    var say=function(){
      var u=new SpeechSynthesisUtterance(text);
      u.lang=voice?voice.lang:'zh-HK';
      if(voice)u.voice=voice;
      u.rate=SLOW?0.55:0.85;
      SYN.speak(u);
    };
    if(SYN.speaking||SYN.pending){SYN.cancel();cancelAt=Date.now();}
    var wait=80-(Date.now()-cancelAt);              // cancel 之後即刻 speak，Chrome 有時會吞咗，所以隔少少先講
    if(wait>0)setTimeout(say,wait);else say();
  }catch(e){}
}
if(SYN){
  pickVoice();
  if(SYN.addEventListener)SYN.addEventListener('voiceschanged',pickVoice);   // 唔用 onvoiceschanged：會蓋走主 App 自己嘅設定
}else showVoiceWarn();

/* ========= 彩帶 ========= */
function confetti(){
  var cv=$('#sa-cf'),ctx=cv.getContext('2d');
  cv.width=window.innerWidth;cv.height=window.innerHeight;
  var cols=['#1f7a64','#c8372d','#c9a227','#fffdf7'];
  var ps=[];
  for(var i=0;i<90;i++){ps.push({x:Math.random()*cv.width,y:-20-Math.random()*cv.height*0.4,vx:(Math.random()-.5)*3,vy:2+Math.random()*4,s:5+Math.random()*7,r:Math.random()*6,vr:(Math.random()-.5)*.3,c:cols[i%cols.length]});}
  var t0=performance.now();
  function frame(t){
    var el_=t-t0;
    ctx.clearRect(0,0,cv.width,cv.height);
    for(var i=0;i<ps.length;i++){var p=ps[i];p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=p.c;ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s*0.6);ctx.restore();}
    if(el_<2600)requestAnimationFrame(frame);else ctx.clearRect(0,0,cv.width,cv.height);
  }
  requestAnimationFrame(frame);
}
function countUp(node,to){
  var t0=performance.now(),dur=700;
  function f(t){var k=Math.min(1,(t-t0)/dur);node.textContent=Math.round(to*k);if(k<1)requestAnimationFrame(f);}
  requestAnimationFrame(f);
}

/* ========= 路由 ========= */
var view=$('#sa-view'),titleEl=$('#sa-title'),backBtn=$('#sa-back');
function setHeader(title,showBack){titleEl.textContent=title;backBtn.style.display=showBack?'':'none';}
function go(name){
  stopSpeech();
  M.token=(M.token||0)+1;                      // 離開／重玩之後，唔好再跳「全部配啱」
  view.innerHTML='';
  view.className=(name==='gallery')?'sa-wide':'';
  if(name==='gallery')renderGallery();
  else if(name==='listen')startListen();
  else if(name==='memory')startMemory();
  else renderHome();
  window.scrollTo(0,0);
}
backBtn.addEventListener('click',function(){go('home');});
$('#sa-slow').addEventListener('click',function(){
  SLOW=!SLOW;this.textContent=SLOW?'🐇 正常':'🐢 慢';
});

/* ========= 首頁 ========= */
function renderHome(){
  setHeader('音近卡牌',false);
  var d=PAIRS[0];
  var h=el('div','sa-hero','<div class="big">聽<em>啱</em>未？</div><p>分清啲「好似噉」嘅廣東話</p>');
  view.appendChild(h);
  var menu=el('div','menu');
  var items=[
    ['gallery','🃏','音近卡牌圖鑑','睇每一組嘅粵拼、泰文意思同分別，撳卡仔聽發音'],
    ['listen','👂','聽音辨詞','聽一個音，揀返啱嘅字（10題）'],
    ['memory','🧩','翻牌配對','將漢字同泰文意思配成對，易混淆嘅字會一齊出現']
  ];
  items.forEach(function(it){
    var b=el('button','mbtn','<div class="ic">'+it[1]+'</div><div><b>'+it[2]+'</b><span>'+it[3]+'</span></div>');
    b.addEventListener('click',function(){go(it[0]);});
    menu.appendChild(b);
  });
  view.appendChild(menu);
  var demo=el('div','demo','<div style="font-size:13px;color:var(--mute);margin-bottom:8px">例子</div>');
  var row=el('div','row');
  [d.a,d.b].forEach(function(w,i){
    if(i===1)row.appendChild(el('span','vs','vs'));
    var bt=el('button','word',wordHTML(w));
    bt.addEventListener('click',function(){speak(w.zh);});
    row.appendChild(bt);
  });
  demo.appendChild(row);
  view.appendChild(demo);
}

/* ========= 圖鑑 ========= */
function renderGallery(){
  setHeader('音近卡牌圖鑑',true);
  var chips=el('div','chips');
  var list=el('div','sa-list');
  var cur='全部';
  function draw(){
    list.innerHTML='';
    PAIRS.filter(function(p){return cur==='全部'||p.type===cur;}).forEach(function(p){
      var t=el('div','twin');
      t.appendChild(el('div','top','<span class="badge '+TYPE_CLASS[p.type]+'">'+p.type+(p.type==='詞組'?'易混':'分別')+'</span><span style="font-size:12px;color:var(--mute)">#'+p.id+'</span>'));
      var pr=el('div','pair');
      [p.a,p.b].forEach(function(w,i){
        if(i===1)pr.appendChild(el('span','vs','vs'));
        var b=el('button','word',wordHTML(w));
        b.addEventListener('click',function(){
          b.classList.add('speaking');
          setTimeout(function(){b.classList.remove('speaking');},700);
          speak(w.zh);
        });
        pr.appendChild(b);
      });
      t.appendChild(pr);
      t.appendChild(el('div','tip',p.tip));
      list.appendChild(t);
    });
  }
  TYPES.forEach(function(ty){
    var c=el('button','chip'+(ty===cur?' on':''),ty);
    c.addEventListener('click',function(){
      cur=ty;
      var all=chips.querySelectorAll('.chip');
      for(var i=0;i<all.length;i++)all[i].classList.toggle('on',all[i].textContent===ty);
      draw();
    });
    chips.appendChild(c);
  });
  view.appendChild(chips);
  view.appendChild(list);
  draw();
}

/* ========= 聽音辨詞 ========= */
var L={};
function startListen(){
  setHeader('聽音辨詞',true);
  var pool=PAIRS.filter(function(p){return p.type!=='同音';});
  L.rounds=shuffle(pool).slice(0,10).map(function(p){
    var side=Math.random()<0.5?'a':'b';
    return {p:p,target:side,flip:Math.random()<0.5};
  });
  L.i=0;L.score=0;
  renderListenRound();
}
function renderListenRound(){
  view.innerHTML='';
  var r=L.rounds[L.i],p=r.p,total=L.rounds.length;
  var prog=el('div','prog','<i style="width:'+(L.i/total*100)+'%"></i>');
  view.appendChild(prog);
  view.appendChild(el('div','stat','<span>第 '+(L.i+1)+' / '+total+' 題</span><span>得分 '+L.score+'</span>'));
  view.appendChild(el('div','q','聽一聽，係邊個字？'));
  var pl=el('div','play');
  var pb=el('button','playbtn','🔊');
  pb.addEventListener('click',function(){speak(p[r.target].zh);});
  pl.appendChild(pb);view.appendChild(pl);
  var opts=el('div','opts');
  var order=r.flip?['b','a']:['a','b'];
  var btns=[];
  var fb=el('div','sa-fb');
  var next=el('button','main-btn',L.i+1===total?'睇結果':'下一題 ›');
  next.style.display='none';
  order.forEach(function(side){
    var w=p[side];
    var b=el('button','opt','<span class="jp">'+w.jp+'</span><span class="zh">'+w.zh+'</span><span class="th">'+w.th+'</span>');
    b.addEventListener('click',function(){
      btns.forEach(function(x){x.disabled=true;x.classList.add('show');});
      var ok=(side===r.target);
      if(ok){L.score++;b.classList.add('right');fb.innerHTML='✅ 啱！<b>'+w.zh+'</b> '+w.jp;}
      else{
        b.classList.add('wrong');
        btns.forEach(function(x){if(x.dataset.side===r.target)x.classList.add('right');});
        fb.innerHTML='❌ 聽到嘅係 <b>'+p[r.target].zh+'</b> '+p[r.target].jp+'<br><span style="font-size:13px;color:var(--mute)">'+p.tip+'</span>';
      }
      next.style.display='block';
      prog.firstChild.style.width=((L.i+1)/total*100)+'%';
    });
    b.dataset.side=side;
    btns.push(b);opts.appendChild(b);
  });
  view.appendChild(opts);
  view.appendChild(fb);
  view.appendChild(next);
  next.addEventListener('click',function(){
    L.i++;
    if(L.i>=total)renderListenResult();else renderListenRound();
  });
  speak(p[r.target].zh);
}
function renderListenResult(){
  view.innerHTML='';
  var total=L.rounds.length;
  var stars=L.score>=9?'⭐⭐⭐':L.score>=6?'⭐⭐':L.score>=3?'⭐':'☆';
  var msg=L.score>=9?'好叻！耳仔好靈！':L.score>=6?'幾好，繼續加油！':'多啲聽多啲練，會進步㗎！';
  var res=el('div','result','<div>成績</div><div class="score"><span id="sa-sc">0</span><span style="font-size:26px;color:var(--mute)"> / '+total+'</span></div><div class="stars">'+stars+'</div><p>'+msg+'</p>');
  view.appendChild(res);
  var again=el('button','main-btn','再玩一次');
  again.addEventListener('click',startListen);
  var home=el('button','main-btn alt','返回主頁');
  home.addEventListener('click',function(){go('home');});
  view.appendChild(again);view.appendChild(home);
  countUp($('#sa-sc'),L.score);
  if(L.score>=7)confetti();
}

/* ========= 翻牌配對 ========= */
var M={};
function startMemory(){
  setHeader('翻牌配對',true);
  var pool=PAIRS.slice();
  var picks=shuffle(pool).slice(0,3);
  var words=[];
  picks.forEach(function(p){words.push({k:p.id+'a',w:p.a});words.push({k:p.id+'b',w:p.b});});
  var cards=[];
  words.forEach(function(x){
    cards.push({k:x.k,kind:'zh',w:x.w});
    cards.push({k:x.k,kind:'th',w:x.w});
  });
  M.cards=shuffle(cards);
  M.open=[];M.done=0;M.moves=0;M.lock=false;M.total=words.length;M.token=(M.token||0)+1;
  renderMemory();
}
function renderMemory(){
  view.innerHTML='';
  view.appendChild(el('div','q','將漢字同泰文意思配成對'));
  var stat=el('div','stat','<span id="sa-mv">步數 0</span><span id="sa-pr">已配 0 / '+M.total+'</span>');
  view.appendChild(stat);
  var grid=el('div','mgrid');
  M.cards.forEach(function(c,idx){
    var b=el('button','mcard');
    var front=c.kind==='zh'
      ?'<div class="face front"><span class="jp">'+c.w.jp+'</span><span class="zh'+(c.w.zh.length>=3?' sm':'')+'">'+c.w.zh+'</span></div>'
      :'<div class="face front thai"><span class="th">'+c.w.th+'</span></div>';
    b.innerHTML='<div class="inner"><div class="face back">粵</div>'+front+'</div>';
    b.addEventListener('click',function(){onFlip(b,c);});
    grid.appendChild(b);
  });
  view.appendChild(grid);
  var rs=el('button','main-btn alt','重新洗牌');
  rs.style.marginTop='18px';
  rs.addEventListener('click',startMemory);
  view.appendChild(rs);
}
function onFlip(node,c){
  if(M.lock||node.classList.contains('flip')||node.classList.contains('done'))return;
  node.classList.add('flip');
  if(c.kind==='zh')speak(c.w.zh);
  M.open.push({node:node,c:c});
  if(M.open.length<2)return;
  M.moves++;
  $('#sa-mv').textContent='步數 '+M.moves;
  var a=M.open[0],b=M.open[1];
  M.open=[];
  if(a.c.k===b.c.k&&a.c.kind!==b.c.kind){
    a.node.classList.add('done');b.node.classList.add('done');
    M.done++;
    $('#sa-pr').textContent='已配 '+M.done+' / '+M.total;
    if(M.done===M.total){var tk=M.token;setTimeout(function(){if(tk===M.token)memoryWin();},500);}
  }else{
    M.lock=true;
    setTimeout(function(){
      a.node.classList.remove('flip');b.node.classList.remove('flip');
      M.lock=false;
    },900);
  }
}
function memoryWin(){
  confetti();
  var box=el('div','result','<div class="stars">🎉</div><div style="font-family:var(--serif);font-weight:900;font-size:22px;color:var(--jade-d)">全部配啱！</div><p>用咗 '+M.moves+' 步</p>');
  var again=el('button','main-btn','再玩一次');
  again.addEventListener('click',startMemory);
  var home=el('button','main-btn alt','返回主頁');
  home.addEventListener('click',function(){go('home');});
  box.appendChild(again);box.appendChild(home);
  view.appendChild(box);
  box.scrollIntoView({behavior:'smooth',block:'center'});
}

/* ========= 啟動（放最尾，避免 TDZ） ========= */
renderHome();
window.saLeave=stopSpeech;
})();
