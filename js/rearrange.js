/* 重組練習：用 Google Sheet 三張表（ss_patterns／ss_words／ss_combos）即時生成新句。
   掛喺「句式」頁第4個模式（app.js buildSentence 會叫 RA.mount）。計分用 APP_AWARD。 */
window.RA=(function(){
var booted=false;
var TPL='<div id="ra-st" class="st">讀緊 Google Sheet…</div><div class="card">  <div class="row"><select id="ra-lv"><option value="">全部程度</option><option value="1">Lv1</option><option value="2">Lv2</option><option value="3">Lv3</option></select><select id="ra-pt"><option value="">隨機句型</option></select></div>  <div class="row"><label><input type="checkbox" id="ra-tj" checked>粵拼</label><label><input type="checkbox" id="ra-tt" checked>泰文</label><label><input type="checkbox" id="ra-tn">詞性提示</label></div>  <button class="bt pr big" id="ra-gen" disabled>🎲 生成新句</button></div><div id="ra-game"></div><details class="card"><summary>🔍 檢查資料／抽樣</summary>  <div id="ra-diag"></div>  <button class="bt" id="ra-sample" style="margin-top:8px">📋 每個句型抽 2 句</button>  <div id="ra-samp"></div></details>';
function boot(){

const U=g=>'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNbMKKRPjdRLCIJlgK9SZvNu2pbqUzaMCR2RuxDHQ1LWKXw6jjeBYjH6_wPKI7S2TtiEg00cqcSM7d/pub?gid='+g+'&single=true&output=csv';
const GID={p:'612986821',w:'557674036',c:'873126769'};
const $=id=>document.getElementById('ra-'+id);
const rnd=a=>a[Math.random()*a.length|0];
const shuf=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
function csv(s){s=s.replace(/^\uFEFF/,'');const R=[];let r=[],c='',q=0;
 for(let i=0;i<s.length;i++){const h=s[i];
  if(q){if(h==='"'){if(s[i+1]==='"'){c+='"';i++}else q=0}else c+=h}
  else if(h==='"')q=1;else if(h===','){r.push(c.trim());c=''}
  else if(h==='\n'||h==='\r'){if(h==='\r'&&s[i+1]==='\n')i++;r.push(c.trim());c='';R.push(r);r=[]}else c+=h}
 if(c!==''||r.length){r.push(c.trim());R.push(r)}
 const L=R.filter(x=>x.some(v=>v!=='')),H=L[0]||[];
 return L.slice(1).map(v=>{const o={};H.forEach((k,i)=>o[k.trim()]=v[i]||'');return o})}

// ── 資料 ──
let W=[],IDX={},P=[],C=[],PC=[],MISS=new Set();
const AL={'裡面':'入面'};                                   // 別名：sheet 寫「裡面」都得
const look=t=>{t=AL[t]||t;const w=IDX[t];if(!w)MISS.add(t);return w};
const short=s=>(s||'').replace(/\s*\(.*?\)/g,'').split(/\s*\/\s*/)[0].trim();   // 泰文只取第一個意思、去括號
const cat=(c,f)=>W.filter(x=>x.cat===c&&(!f||f(x)));
const DURV=['開','食','飲','睇','聽','用'],BADADJ=['痛','攰'],ADVOK=['仲','都','已經'],DAYP=['早上','早上的','中午','夜晚'];
const KNOWN=['人','地方','動作','動詞','賓語','物','時間','副詞','形容詞','量詞','數量','日常頻率','特定時間','結果動詞'];
function build(p,w,c){
 W=w.filter(x=>x.word);IDX={};MISS=new Set();W.forEach(x=>{if(!IDX[x.word])IDX[x.word]=x});
 P=p.filter(x=>x.pattern_id&&x.slots).map(x=>({id:x.pattern_id,lv:+x.level||1,title:x.title,th:x.thai||'',
  sl:x.slots.split(/\s*\+\s*/).map(s=>{const i=s.indexOf(':');return i<0?{n:s.trim(),v:''}:{n:s.slice(0,i).trim(),v:s.slice(i+1).trim()}}),
  alts:(x.alts||'').split(';').map(s=>{try{return JSON.parse(s)}catch(e){return null}}).filter(Boolean)}));
 C=[];PC=[];let pas=0;const seen=new Set();
 c.forEach(r=>{if((r.place||'').startsWith('--')){pas=1;return}
  if(!r.place||!r.action||!r.object)return;const k=r.place+'|'+r.action+'|'+r.object;if(seen.has(k))return;seen.add(k);
  const o={p:look(r.place),a:look(r.action),o:look(r.object)};if(o.p&&o.a&&o.o)(pas?PC:C).push(o)});
}

// ── 生成一句 ──
function gen(p){
 const S=p.sl,has=n=>S.some(s=>s.n===n),neg=has('NEG'),x={used:new Set(),g:{}};
 const combo=g=>{if(neg)g='';if(!x.g[g]){let pool=C;
  if(has('DUR'))pool=pool.filter(c=>DURV.includes(c.a.word));
  if(has('PLACE')&&has('ACT'))pool=pool.filter(c=>c.p.cat==='地方');
  const used=Object.values(x.g),f=pool.filter(c=>!used.includes(c));pool=f.length?f:pool;x.g[g]=rnd(pool)}return x.g[g]};
 const noun=()=>x.noun||(x.noun=rnd(has('NUM')?W.filter(w=>w.cat==='物'&&w.cl&&IDX[w.cl]):has('LOC')?cat('傢俬').concat(S.find(s=>s.n==='NOUN').v.includes('地方')?cat('地方'):[]):cat('地方')));
 const items=S.map((s,k)=>{
  const b=s.n.replace(/\d+$/,''),g=(s.n.match(/\d+$/)||[''])[0],v=s.v;let r,lit=0;
  if(has('PASS')&&(b==='NP'||b==='V')){const c=x.pc||(x.pc=rnd(PC));r=b==='V'?c.a:g==='1'?c.o:c.p}
  else if(v==='人'){r=rnd(cat('人',w=>!x.used.has(w.word)));x.used.add(r.word)}
  else if(b==='PLACE'&&has('ACT'))r=combo('').p;
  else if(b==='PLACE')r=rnd(cat('地方'));
  else if(b==='NOUN')r=noun();
  else if(b==='CL')r=look(noun().cl);
  else if(b==='LOC'){let o=v.split('/').map(t=>AL[t.trim()]||t.trim());if(o.includes('入面'))o=[x.noun&&x.noun.cat==='地方'?'入面':'上面'];r=look(rnd(o))}
  else if(b==='ACT'){const c=combo(g);r={word:c.a.word+c.o.word,jyut:c.a.jyut+' '+c.o.jyut,thai:short(c.a.thai)+short(c.o.thai)}}
  else if(b==='V'&&has('DIR'))r=rnd(cat('移動'));
  else if(b==='V'&&g==='2'&&neg)r=x.v1;
  else if(v==='動作'||v==='動詞'||v==='結果動詞')r=combo(g).a;
  else if(v==='賓語')r=combo(g).o;
  else if(v==='時間')r=rnd(cat('時間',w=>w.word!=='幾時'));
  else if(v==='日常頻率')r=rnd(cat('日常頻率'));
  else if(v==='特定時間')r=rnd(DAYP.map(t=>IDX[t]).filter(Boolean));
  else if(v==='副詞')r=rnd(ADVOK.map(look).filter(Boolean));
  else if(v==='形容詞')r=rnd(cat('形容詞',w=>!BADADJ.includes(w.word)));
  else if(v==='數量')r=rnd(cat('數量',w=>!'百千萬'.includes(w.word)));
  else if(v==='物')r=rnd(cat('物'));
  else{lit=1;const t=rnd(v.split('/').map(t=>t.trim()));r=look(t)||{word:t,jyut:'?',thai:''}}
  if(b==='V'&&g==='1'&&neg)x.v1=r;
  return{k,tag:s.n,v:KNOWN.includes(v)?v:'詞',lit,w:r.word,j:r.jyut,t:short(r.thai)}});
 const M={};items.forEach(i=>M[i.tag]=i.lit?'':i.t);   // 固定詞（喺／去／咗…）泰文由句型模板自己帶
 const th=p.th.replace(/\{(\w+)\}/g,(m,k)=>M[k]||'').replace(/\s+/g,' ').trim();
 const canon=items.map(i=>i.w).join('|'),acc=new Set([canon]);
 p.alts.filter(o=>o.length===S.length).forEach(o=>acc.add(o.map(i=>items[i].w).join('|')));
 return{p,items,th,canon,acc,zh:items.map(i=>i.w).join(''),jy:items.map(i=>i.j).join(' ')};
}

// ── 遊戲 ──
const G={q:null,sl:[],pool:[],tries:0,done:0,gave:0,marks:null,msg:'',score:0,last:''};
const COL={人:'#dc2626',地方:'#2563eb',動作:'#16a34a',動詞:'#16a34a',結果動詞:'#16a34a',賓語:'#ca8a04',物:'#ca8a04',時間:'#ea580c',數量:'#ea580c',形容詞:'#0891b2'};
const colr=i=>i.lit?'#9333ea':COL[i.v]||'#0E6B57';
function blk(i,cls,a){const h=$('tn').checked;
 return '<button class="b '+cls+'" '+(h?'style="border-color:'+colr(i)+'"':'')+(a?' data-a="'+a+'"':' disabled')+'>'
 +(h?'<small class="tg" style="color:'+colr(i)+'">'+i.tag+(i.lit?'':'·'+i.v)+'</small>':'')
 +'<b class="zh">'+i.w+'</b>'+($('tj').checked&&i.j?'<i class="jy">'+i.j+'</i>':'')+($('tt').checked&&i.t?'<em class="th">'+i.t+'</em>':'')+'</button>'}
function draw(){const q=G.q;if(!q)return;
 const placed=new Set(G.sl.filter(k=>k!==null)),full=G.sl.every(k=>k!==null);
 const slots=G.sl.map((k,n)=>k===null?'<div class="sl"><span>'+(n+1)+'</span></div>'
  :'<div class="sl f">'+blk(q.items[k],G.done?'ok':G.marks?(G.marks[n]?'ok':'bad'):'',G.done?'':'t'+n)+'</div>').join('');
 const pool=G.pool.filter(k=>!placed.has(k)).map(k=>blk(q.items[k],'','p'+k)).join('');
 const acts=G.done?'<button class="bt pr" data-a="gen">下一句 ➜</button>'
  :'<button class="bt pr" data-a="chk" '+(full?'':'disabled')+'>檢查答案</button><button class="bt" data-a="rst">🔄 重來</button>'+(G.tries>=2?'<button class="bt" data-a="giv">👀 睇答案</button>':'');
 const res=G.done?'<div class="card res"><div class="zh">'+q.zh+'</div><div class="j">'+q.jy+'</div><div class="t">'+q.th+'</div><div class="sub" style="margin-top:6px">接受 '+q.acc.size+' 種排法 · <a href="#" data-a="spk">🔊 聽</a></div></div>':'';
 $('game').innerHTML='<div class="card"><span class="chip">'+q.p.id+' · '+q.p.title+' · Lv'+q.p.lv+' · ★ '+G.score+'</span>'
  +'<div class="sub">用下面字塊排出呢句 👇</div><div class="q">'+(q.th||'（呢個句型未有泰文模板）')+'</div></div>'
  +'<div class="slots">'+slots+'</div>'+(G.done?'':'<div class="pool">'+pool+'</div>')
  +(G.msg?'<div class="msg'+(G.msg[0]==='❌'?' bad':'')+'">'+G.msg+'</div>':'')+'<div class="acts">'+acts+'</div>'+res}
function start(q){G.q=q;G.sl=q.items.map(()=>null);G.tries=0;G.done=0;G.gave=0;G.marks=null;G.msg='';
 let pl=shuf(q.items.map((_,k)=>k));
 for(let n=0;n<12&&new Set(q.items.map(i=>i.w)).size>1&&pl.map(k=>q.items[k].w).join('|')===q.canon;n++)pl=shuf(pl);
 G.pool=pl;draw()}
function newQ(){const lv=$('lv').value,pt=$('pt').value;
 const L=pt?P.filter(p=>p.id===pt):P.filter(p=>!lv||p.lv==lv);
 for(let n=0;n<40;n++){try{const q=gen(rnd(L));if(q.zh!==G.last||n>30){G.last=q.zh;start(q);return}}catch(e){}}
 $('game').innerHTML='<div class="card bad">生成唔到句子：呢個選擇暫時缺詞或組合，睇下面「檢查資料」。</div>'}
function chk(){const q=G.q,seq=G.sl.map(k=>q.items[k].w);
 if(q.acc.has(seq.join('|'))){const pts=G.tries?G.tries===1?5:2:10;G.score+=pts;if(window.APP_AWARD)APP_AWARD(pts);G.done=1;G.marks=null;
  G.msg='✅ 啱！+'+pts+' 分'+(seq.join('|')!==q.canon?'（呢個係另一種啱嘅排法）':'')}
 else{G.tries++;const os=[...q.acc].map(s=>s.split('|'));G.marks=seq.map((w,i)=>os.some(o=>o[i]===w));
  G.msg='❌ 有 '+G.marks.filter(m=>!m).length+' 個位未啱（紅色），撳紅色字塊拎走再試'}
 draw()}
$('game').addEventListener('click',e=>{const a=e.target.closest('[data-a]');if(!a||!G.q)return;e.preventDefault();const k=a.dataset.a;
 if(k==='gen')return newQ();
 if(k==='chk')return chk();
 if(k==='rst'){G.sl=G.q.items.map(()=>null);G.marks=null;G.msg='';return draw()}
 if(k==='giv'){G.sl=G.q.items.map((_,i)=>i);G.done=1;G.gave=1;G.marks=null;G.msg='正確答案如下，下次加油 💪';return draw()}
 if(k==='spk'){if(typeof Speech!=='undefined'&&Speech.supported){Speech.speak(G.q.zh)}else if('speechSynthesis'in window){const u=new SpeechSynthesisUtterance(G.q.zh);u.lang='zh-HK';speechSynthesis.speak(u)}return}
 if(G.done)return;
 if(k[0]==='p'){const i=G.sl.indexOf(null);if(i>=0){G.sl[i]=+k.slice(1);G.marks=null;G.msg='';draw()}}
 else if(k[0]==='t'){G.sl[+k.slice(1)]=null;G.marks=null;G.msg='';draw()}});
['tj','tt','tn'].forEach(id=>$(id).addEventListener('change',draw));
$('gen').addEventListener('click',newQ);

// ── 檢查資料 ──
function diag(){const bad=[];
 P.forEach(p=>{let ok=0;for(let n=0;n<10;n++){try{gen(p);ok++}catch(e){}}if(ok<10)bad.push(p.id+(ok?'（偶發失敗）':''))});
 $('diag').innerHTML='<p>句型 '+P.length+' ・ 詞 '+W.length+' ・ 動作組合 '+C.length+' ・ 被動組合 '+PC.length+'</p>'
  +(MISS.size?'<p class="bad">⚠️ words 表缺少：'+[...MISS].join('、')+'（可貼 ss_words_additions.csv）</p>':'<p>✅ 冇缺詞</p>')
  +(bad.length?'<p class="bad">⚠️ 生成唔到：'+bad.join('、')+'</p>':'<p>✅ 所有句型都生成到</p>')}
$('sample').addEventListener('click',()=>{let h='<table>';
 P.forEach(p=>{for(let n=0;n<2;n++){try{const q=gen(p);h+='<tr><td>'+p.id+'</td><td>'+q.zh+'<br><small>'+q.jy+'</small></td><td>'+q.th+'</td></tr>'}
  catch(e){h+='<tr><td>'+p.id+'</td><td colspan="2" class="bad">生成失敗：'+e+'</td></tr>';break}}});
 $('samp').innerHTML=h+'</table>'});

// ── 載入 ──
async function load(){
 try{const f=async g=>{const r=await fetch(U(GID[g]));if(!r.ok)throw g;return csv(await r.text())};
  const[p,w,c]=await Promise.all([f('p'),f('w'),f('c')]);build(p,w,c);
  $('pt').innerHTML='<option value="">隨機句型</option>'+P.map(p=>'<option value="'+p.id+'">'+p.id+' '+p.title+'</option>').join('');
  $('st').textContent='✅ 已讀取 Google Sheet';$('gen').disabled=false;diag();newQ()}
 catch(e){$('st').innerHTML='<span class="bad">❌ 讀唔到 Google Sheet（'+e+'）。請用網站／GitHub Pages 網址開，或確認三張表已發布到網上。</span>'}}
load();

}
return{mount:function(el){if(!booted){el.innerHTML=TPL;booted=true;boot();}}};
})();
