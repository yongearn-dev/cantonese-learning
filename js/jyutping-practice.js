(function(){
const root=document.getElementById('pj-root');
if(!root)return;
const $=id=>document.getElementById(id);

// 音節＋漢字（只收真實存在嘅音節＋聲調）
const RAW=`baa1爸 baa2把 baa3霸 gaa1家 gaa2假 gaa3嫁 faa1花 waa4華 waa6話 caa4茶 saa1沙 maa1媽 maa4麻 maa5馬 maa6罵 naa4拿 daa2打 taa1他
ji1衣 ji4而 ji5耳 ji6二 si1詩 si4時 si6是 ci2此 ci3次 ci4池 fu2苦 fu6父 gu1姑 gu3故 wu4胡 wu6戶
ho2可 ho4河 lo4羅 do1多 to1拖 to4駝 ce1車 se2寫 se6射 ze1遮 ze3蔗 je4爺 je5野 je6夜
sam1心 gam1今 gam2感 jam2飲 jat1一 jat6日 sik1色 sap6十 hok6學 fong1方 saan1山 faan1翻 faan6飯 gaan1間 jan4人 sai3世 hoi2海
maai5買 maai6賣 naam4男 sou3掃 dou1都 dou6道 tou4桃 gau2九 sau2手 jau5有 lau4流 jiu3要 siu2小 tiu4條
ming4名 ping4平 ting1聽 ling4零 sing1星 ding6定 cing4情 fung1風 dung1冬 gung1工 hung4紅 lung4龍 tung4同
baak3百 baat3八 saat3殺 faat3發 gaak3格 luk6六 juk6肉 muk6木
zoeng1張 soeng1傷 soeng6上 loeng4涼 loeng5兩 joeng4羊 joeng6樣 koeng4強 hoeng1香 hoeng2響 coeng4長 zoek3雀 goek3腳 joek6藥 joek3約
zeoi3最 seoi2水 leoi6淚 heoi3去 deoi3對 ceoi1吹 ceon1春 seon3信 seon4純 zeon2準
gwok3國 gwai3貴 gwong1光 gwong2廣 gwaan1關 kwan4群 kwong4狂 gwaa1瓜 gwan1軍 gwo3過
jyu5雨 syu1書 zyu3住 cyu4除 jyut6月 syut3雪 jyun4圓 syun1酸 tyun4團 zyun2轉 hyun3勸
ngo5我 ngaan5眼 ngoi6外 ngaa4牙 ngau4牛 ng5五 m4唔`;
const TH_I={b:'ป',p:'พ',m:'ม',f:'ฟ',d:'ต',t:'ท',n:'น',l:'ล',g:'ก',k:'ค',ng:'ง',h:'ฮ',w:'ว',gw:'กว',kw:'คว',z:'จ',c:'ช',s:'ซ',j:'ย'};
const TH_V={aa:'-า',a:'-ะ',e:'แ-',i:'-ี',o:'-อ',u:'-ู',oe:'เ-อ',eo:'เ-อะ',yu:'อี แต่ปาก "อู"'};
const TH_C={i:'-ย',u:'-ว',m:'-ม',n:'-น',ng:'-ง',p:'-พ',t:'-ท',k:'-ค'};
const TONE=['高平','高升','中平','低降','低升','低平'];
// 聲調曲線（五度標記：1=55 2=35 3=33 4=21 5=23 6=22），y 越細越高
const TP=[[[0,4],[60,4]],[[4,16],[56,4]],[[0,16],[60,16]],[[4,16],[56,30]],[[4,28],[56,16]],[[0,28],[60,28]]];
const LV=[['easy','初級'],['mid','中級'],['hard','困難'],['all','全部']];

const DB=RAW.split(/\s+/).map(t=>{
  const m=t.match(/^([a-z]+)([1-6])(.+)$/);
  const syl=m[1],tone=+m[2],zi=m[3];
  let ini='',fin=syl;
  if(syl!=='m'&&syl!=='ng'){
    const im=syl.match(/^(ng|gw|kw|[bpmfdtnlgkhwzcsj])(.*)$/);
    if(im){ini=im[1];fin=im[2];}
  }
  const nm=fin.match(/^(oe|eo|yu|aa|a|e|i|o|u)(.*)$/);
  const nuc=nm?nm[1]:'',cod=nm?nm[2]:'';
  const hard=/oe|eo|yu/.test(fin)||/^(gw|kw|ng)$/.test(ini)||syl==='ng'||syl==='m';
  const easy=!hard&&/^(aa|e|i|o|u)$/.test(fin);
  return{syl,ini,fin,nuc,cod,tone,zi,lv:hard?'hard':easy?'easy':'mid'};
});

let diff='mid',cur=null,last=null,shown=false,ok=0,tot=0,streak=0,voice=null,toastT=null;

// ── 粵語語音（淨係用粵語 voice；冇就唔讀，避免讀成普通話） ──
function loadVoice(){
  if(!('speechSynthesis' in window)){voice=null;return;}
  voice=speechSynthesis.getVoices().find(v=>/zh[-_]HK|yue/i.test(v.lang))||null;
  $('pj-vs').textContent=voice?'🔊 有粵語語音':'🔇 呢部機冇粵語語音';
}
if('speechSynthesis' in window){loadVoice();speechSynthesis.addEventListener?speechSynthesis.addEventListener('voiceschanged',loadVoice):(speechSynthesis.onvoiceschanged=loadVoice);}
else $('pj-vs').textContent='🔇 呢個瀏覽器唔支援語音';
function toast(msg){
  const t=$('pj-toast');t.textContent=msg;clearTimeout(toastT);toastT=setTimeout(()=>{t.textContent='';},3500);
}
function say(text,rate,onEnd){
  if(!voice)loadVoice();
  if(!voice){toast('呢部機冇粵語語音，聽唔到發音（可以試下 Chrome／Safari）。');if(onEnd)onEnd();return;}
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);u.voice=voice;u.lang=voice.lang;u.rate=rate||.8;
  if(onEnd){u.onend=onEnd;u.onerror=onEnd;}
  speechSynthesis.speak(u);
}
const speakCard=()=>{if(cur)say(cur.zi,.8);};

// 標題旁邊嘅喇叭：隨時聽「三碗細牛腩麵」
$('pj-spk').onclick=()=>{
  const b=$('pj-spk');
  b.classList.add('on');
  say('三碗細牛腩麵',.7,()=>b.classList.remove('on'));
};

// ── 出題 ──
const pool=()=>DB.filter(d=>diff==='all'||d.lv===diff);
function draw(){
  const p=pool();let c;
  do{c=p[Math.floor(Math.random()*p.length)];}while(p.length>1&&c===last);
  last=cur=c;shown=false;render();
}
function thaiFin(c){
  if(c.syl==='m')return'อืม';
  if(c.syl==='ng')return'อึง';
  return(TH_V[c.nuc]||'')+(c.cod?' + '+TH_C[c.cod]:'');
}
function setTh(id,txt){const e=$(id);e.textContent=txt;e.classList.toggle('sm',txt.length>6);}
function render(){
  const c=cur,th=$('pj-thai').checked;
  $('pj-vi').textContent=c.ini||'—';
  $('pj-vf').textContent=(c.syl==='m'||c.syl==='ng')?c.syl:(c.fin||'—');
  $('pj-vt').textContent=c.tone;
  setTh('pj-ti',th?(TH_I[c.ini]||''):'');
  setTh('pj-tf',th?thaiFin(c):'');
  const p=TP[c.tone-1];
  $('pj-tsvg').innerHTML='<line x1="0" y1="4" x2="60" y2="4" stroke="currentColor" opacity=".15"/><line x1="0" y1="16" x2="60" y2="16" stroke="currentColor" opacity=".15"/><line x1="0" y1="28" x2="60" y2="28" stroke="currentColor" opacity=".15"/><line x1="'+p[0][0]+'" y1="'+p[0][1]+'" x2="'+p[1][0]+'" y2="'+p[1][1]+'" stroke="currentColor" stroke-width="4" stroke-linecap="round"/>';
  $('pj-tn').textContent=TONE[c.tone-1];
  const a=$('pj-ans'),r=$('pj-row');
  if(!shown){
    a.innerHTML='<div class="pj-cover">將三塊拼埋，讀出嚟，再揭曉</div>';
    r.innerHTML='<button type="button" class="pj-btn" id="pj-rev">揭曉答案</button>';
    $('pj-rev').onclick=reveal;
  }else{
    const sn=voice?'<button type="button" class="pj-btn snd" id="pj-snd">🔊 聽發音</button>':'';
    a.innerHTML='<div class="pj-jp"><span class="a">'+c.ini+'</span><span class="b">'+c.fin+'</span><span class="c">'+c.tone+'</span></div><div class="pj-zi">'+c.zi+'</div>'+sn+'<div class="pj-note">'+(voice?'':'呢部機冇粵語語音，以中文字（廣東話）作答案。')+'</div>';
    if(voice)$('pj-snd').onclick=speakCard;
    r.innerHTML='<button type="button" class="pj-btn no" id="pj-bn">未識</button><button type="button" class="pj-btn ok" id="pj-by">識</button>';
    $('pj-bn').onclick=()=>next(false);$('pj-by').onclick=()=>next(true);
  }
}
function reveal(){shown=true;render();if($('pj-auto').checked)speakCard();}
function stats(){$('pj-st').textContent='答對 '+ok+' / '+tot+(tot?'（'+Math.round(ok/tot*100)+'%）':'');$('pj-sk').textContent='連續 '+streak;}
function next(good){
  tot++;if(good){ok++;streak++;}else streak=0;
  stats();draw();
}

// ── 難度掣 ──
function buildDiff(){
  const box=$('pj-diff');box.innerHTML='';
  LV.forEach(([k,label])=>{
    const n=DB.filter(d=>k==='all'||d.lv===k).length;
    const b=document.createElement('button');
    b.type='button';b.dataset.d=k;b.setAttribute('aria-pressed',k===diff);
    b.innerHTML=label+' <small>'+n+'</small>';
    b.onclick=()=>{diff=k;box.querySelectorAll('button').forEach(x=>x.setAttribute('aria-pressed',x===b));draw();};
    box.appendChild(b);
  });
}
$('pj-thai').onchange=render;
$('pj-reset').onclick=()=>{ok=tot=streak=0;stats();draw();};

// ── 鍵盤：空白鍵／Enter 揭曉；← 未識；→ 識（淨係喺呢頁、冇喺輸入框時）──
function active(){const pg=root.closest('.page');return !pg||pg.classList.contains('act');}
document.addEventListener('keydown',e=>{
  if(!active()||window.__jpView==='chart'||e.ctrlKey||e.metaKey||e.altKey)return;
  const tg=e.target&&e.target.tagName;
  if(tg==='INPUT'||tg==='TEXTAREA'||tg==='SELECT'||tg==='BUTTON')return;
  if(!shown&&(e.key===' '||e.key==='Enter')){e.preventDefault();reveal();}
  else if(shown&&e.key==='ArrowLeft'){e.preventDefault();next(false);}
  else if(shown&&e.key==='ArrowRight'){e.preventDefault();next(true);}
});

buildDiff();stats();draw();
window.__pj={DB,say};
})();
