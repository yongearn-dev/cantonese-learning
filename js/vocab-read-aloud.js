const VR=(function(){
  const HAN=/[\u3400-\u9fff\uf900-\ufaff]/;
  const LIB_URL='https://cdn.jsdelivr.net/npm/to-jyutping@3.1.1/+esm';
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  const UA=(navigator.userAgent||'');
  // iPhone／iPad／Mac Safari 用 zh-HK（Apple 嘅廣東話聽寫）；Chrome／Edge 用 yue-Hant-HK
  const APPLE=/iPhone|iPad|iPod/.test(UA)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1)||(/Safari/.test(UA)&&!/Chrome|Chromium|CriOS|Edg|OPR|Android|Firefox/.test(UA));
  const LANGS=APPLE?['zh-HK','yue-Hant-HK']:['yue-Hant-HK','zh-HK'];
  const CFG={startMs:6000,stopMs:2500};          // 6 秒內未開始收音／撳停止後 2.5 秒未收尾，就當辨識冇反應
  const ERR={'not-allowed':'請允許使用咪高峰（網址列左邊嘅鎖頭圖示）','service-not-allowed':'呢部機未開語音辨識：iPhone 請去「設定 → 一般 → 鍵盤」開啟「啟用聽寫」，並允許 Safari 使用語音辨識','no-speech':'聽唔到聲，請再試','audio-capture':'搵唔到咪高峰','language-not-supported':'呢部機唔支援廣東話辨識，建議用 Chrome 或 Edge','network':'語音辨識需要網絡，請檢查連線','start-failed':'開唔到咪高峰，請再試','no-response':'語音辨識冇反應：請確認已允許咪高峰同語音辨識（iPhone 要喺「設定 → 一般 → 鍵盤」開啟「啟用聽寫」），然後再試一次'};
  let lib=null,libP=null,langIdx=0;

  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const isHan=c=>HAN.test(c);
  const withTimeout=(p,ms)=>Promise.race([p,new Promise(r=>setTimeout(()=>r(null),ms))]);

  // 粵拼字庫：背景載入，唔阻住頁面；失敗就退回「淨係比較文字」
  function loadLib(){
    if(lib)return Promise.resolve(lib);
    if(!libP)libP=import(LIB_URL).then(m=>{lib=(m.default&&m.default.getJyutpingList)?m.default:m;return lib;}).catch(e=>{console.warn('[粵拼字庫] 載入失敗',e);libP=null;return null;});
    return libP;
  }
  // 每個字一個項目 [{c, j}]；j＝粵拼（連聲調），冇就係 ''
  function chars(text,L){
    const arr=[...String(text||'')];
    if(!L||!arr.length)return arr.map(c=>({c,j:''}));
    try{
      const out=[];
      L.getJyutpingList(arr.join('')).forEach(([s,j])=>{
        const first=j?String(Array.isArray(j)?j[0]:j).split(/\s+/)[0]:'';
        const cs=[...s];
        if(cs.length===1)out.push({c:cs[0],j:first});else cs.forEach(c=>out.push({c,j:''}));
      });
      if(out.length===arr.length)return out;
    }catch(e){}
    return arr.map(c=>({c,j:''}));
  }
  const hanChars=(text,L)=>chars(text,L).filter(x=>isHan(x.c));

  // ── 評分：逐個字配對（可以漏字／多字）──
  // 字一樣＝啱；字唔同但粵拼一樣＝讀音啱；聲母韻母一樣、聲調唔同＝半分；其他＝錯
  const base=j=>j.replace(/[1-6]$/,'');
  function pair(t,h){
    if(t.c===h.c)return{s:1,t:'ok'};
    if(t.j&&h.j){
      if(t.j===h.j)return{s:1,t:'same'};
      if(base(t.j)===base(h.j))return{s:.5,t:'tone'};
    }
    return{s:0,t:'bad'};
  }
  function align(T,H){
    const n=T.length,m=H.length;
    const dp=Array.from({length:n+1},()=>new Float64Array(m+1));
    for(let i=n-1;i>=0;i--)for(let j=m-1;j>=0;j--)
      dp[i][j]=Math.max(dp[i+1][j],dp[i][j+1],dp[i+1][j+1]+pair(T[i],H[j]).s);
    const res=T.map(t=>({t,h:null,type:'bad',s:0}));
    let i=0,j=0;
    while(i<n&&j<m){
      const p=pair(T[i],H[j]);
      if(Math.abs(dp[i][j]-(dp[i+1][j+1]+p.s))<1e-9){res[i]={t:T[i],h:H[j],type:p.t,s:p.s};i++;j++;}
      else if(dp[i+1][j]>=dp[i][j+1])i++;
      else j++;
    }
    return res;
  }
  function scoreOne(T,text,L){
    const H=hanChars(text,L);
    const items=align(T,H);
    const sum=items.reduce((a,x)=>a+x.s,0);
    return{pct:Math.round(sum/(Math.max(T.length,H.length)||1)*100),items,heard:text,nHeard:H.length};
  }
  // alts＝辨識引擎俾嘅幾個候選答案，取得分最高嗰個
  function score(T,alts,L){
    let best=null;
    (alts.length?alts:['']).forEach(a=>{const r=scoreOne(T,a,L);if(!best||r.pct>best.pct)best=r;});
    return best;
  }
  // 目標：中文字 + 粵拼。有 Sheet 粵拼（音節數一樣）就以老師嘅粵拼為準
  function target(w,L){
    const arr=hanChars(w.char,L);
    const toks=String(w.jyutping||'').toLowerCase().match(/[a-z]+[1-6]/g)||[];
    if(toks.length===arr.length)arr.forEach((x,i)=>{x.j=toks[i];});
    return arr;
  }
  function verdict(p){
    return p>=90?['🌟🌟🌟','好叻！讀得好清楚']:p>=70?['🌟🌟','幾好，再清楚啲就更好']:p>=40?['🌟','有進步空間，留意橙色同紅色嘅字']:['💪','再試一次，講慢啲、咬字清楚啲'];
  }
  function tips(items,hasLib){
    const out=[];
    items.forEach(x=>{
      if(x.type==='tone'&&x.h)out.push('「'+x.t.c+'」應該係 '+x.t.j+'，聽落似 '+x.h.j+'（聲調唔同）');
      else if(x.type==='bad'&&x.h)out.push('「'+x.t.c+'」聽成「'+x.h.c+'」'+(x.h.j?'（'+x.h.j+'）':''));
      else if(x.type==='bad')out.push('漏咗或者聽唔清「'+x.t.c+'」');
    });
    if(!hasLib)out.push('粵拼字庫未載入到，今次只比較文字，唔計聲調。');
    return out.slice(0,5);
  }
  const MARK={ok:'✓',same:'✓',tone:'▲',bad:'✗'};
  const LABEL={ok:'啱',same:'讀音啱',tone:'聲調唔準',bad:'錯／漏'};
  function chip(x){
    return '<span class="vr-chip c-'+x.type+'" title="'+LABEL[x.type]+'"><b>'+esc(x.t.c)+'</b><small>'+esc(x.t.j||'')+'</small><i>'+MARK[x.type]+'</i></span>';
  }
  // 逐字配粵拼嘅 ruby HTML；classAt(第幾個漢字) 決定顏色 class
  function ruby(text,L,classAt,fmt){
    let hi=0;
    return chars(text,L).map(x=>{
      if(!isHan(x.c))return esc(x.c);
      const cls=classAt?(classAt(hi)||''):'';hi++;
      const rt=x.j?(fmt?fmt(x.j):x.j):'';
      return rt?'<ruby class="'+cls+'">'+esc(x.c)+'<rt>'+esc(rt)+'</rt></ruby>':'<span class="'+cls+'">'+esc(x.c)+'</span>';
    }).join('');
  }

  // ── 語音辨識：按平台揀語言、自動換語言重試、冇反應就逾時收尾（唔會一直卡喺「聽緊」）──
  function diag(ev){
    const f=x=>x?'✓':'✗';
    return (ev.lang||'-')+' · 啟動'+f(ev.start)+' 收音'+f(ev.audio)+' 有聲'+f(ev.sound)+' 語音'+f(ev.speech)+' 結果'+f(ev.result);
  }
  function listen(o){
    const ev={start:false,audio:false,sound:false,speech:false,result:false,lang:''};
    const st={rec:null,dead:false,ended:false,retry:false,startT:null,stopT:null,errT:null};
    function clearT(){clearTimeout(st.startT);clearTimeout(st.stopT);clearTimeout(st.errT);}
    function finish(forced){
      if(st.dead||st.ended)return;
      st.ended=true;clearT();
      if(o.onEnd)o.onEnd(ev,!!forced);
    }
    const ctl={
      ev,
      stop(){
        try{st.rec&&st.rec.stop();}catch(e){}
        clearTimeout(st.stopT);st.stopT=setTimeout(()=>finish(true),CFG.stopMs);   // stop 之後冇收尾就強制收尾
      },
      abort(){st.dead=true;clearT();try{st.rec&&st.rec.abort();}catch(e){}}
    };
    function begin(){
      const L=LANGS[langIdx];ev.lang=L;
      const rec=new SR();st.rec=rec;
      rec.lang=L;rec.continuous=!!o.continuous;rec.interimResults=true;rec.maxAlternatives=o.maxAlt||1;
      rec.onstart=()=>{ev.start=true;clearTimeout(st.startT);if(!st.dead&&o.onStart)o.onStart();};
      rec.onaudiostart=()=>{ev.audio=true;};
      rec.onsoundstart=()=>{ev.sound=true;};
      rec.onspeechstart=()=>{ev.speech=true;};
      rec.onresult=e=>{ev.result=true;if(!st.dead&&o.onResult)o.onResult(e);};
      rec.onerror=e=>{
        if(st.dead||st.ended||e.error==='aborted')return;
        if(e.error==='language-not-supported'&&langIdx<LANGS.length-1){langIdx++;st.retry=true;return;}   // 等 onend 再用下一個語言重試
        if(o.onError)o.onError(e.error);
        clearTimeout(st.errT);st.errT=setTimeout(()=>finish(true),1500);                                    // 有啲瀏覽器出錯後唔會觸發 onend
      };
      rec.onend=()=>{
        if(st.dead)return;
        if(st.retry){st.retry=false;begin();return;}
        finish(false);
      };
      // 啟動 watchdog：一直收唔到 start 事件（常見於 iPhone 語言／聽寫未開）就換語言，仍然冇就報錯
      clearTimeout(st.startT);
      st.startT=setTimeout(()=>{
        if(ev.start||st.dead||st.ended)return;
        rec.onend=rec.onerror=rec.onresult=rec.onstart=null;
        try{rec.abort();}catch(e){}
        if(langIdx<LANGS.length-1){langIdx++;begin();return;}
        if(o.onError)o.onError('no-response');
        finish(true);
      },CFG.startMs);
      try{rec.start();}catch(err){clearTimeout(st.startT);if(o.onError)o.onError('start-failed');finish(true);}
    }
    begin();
    return ctl;
  }
  return{supported:!!SR,ERR,CFG,diag,LANGS,esc,isHan,loadLib,withTimeout,chars,hanChars,score,target,verdict,tips,chip,ruby,listen,align,pair};
})();


(function(){
  const btn=document.getElementById('fcMicBtn'),panel=document.getElementById('vrPanel');
  if(!btn||!panel||typeof VR==='undefined')return;
  let ctl=null,busy=false,session=0,timer=null,lastL=null;
  const show=h=>{panel.style.display='';panel.innerHTML=h;};
  const hide=()=>{panel.style.display='none';panel.innerHTML='';};
  const curWord=()=>{const f=filtered();return f[S.vocabIdx]||null;};
  function stopAll(){session++;clearTimeout(timer);if(ctl){try{ctl.abort();}catch(e){}ctl=null;}busy=false;btn.classList.remove('rec');}
  window.vrReset=function(){stopAll();hide();};     // 換咗張卡就清走上一個結果

  function renderResult(w,r,L,note){
    const v=VR.verdict(r.pct),cls=r.pct>=80?'hi':r.pct>=50?'mid':'lo';
    const heard=r.heard?VR.ruby(r.heard,L,null):'<span style="color:var(--text-muted,#999);font-size:14px">（辨識唔到）</span>';
    const tips=note?[note]:VR.tips(r.items,!!L);
    return '<div class="vr-card">'
      +'<div class="vr-top"><div class="vr-pct '+cls+'">'+r.pct+'<small>%</small></div><div><div class="vr-stars">'+v[0]+'</div><div class="vr-verdict">'+v[1]+'</div></div></div>'
      +'<div class="vr-row"><span class="vr-lab">目標</span><div class="vr-chips">'+r.items.map(VR.chip).join('')+'</div></div>'
      +'<div class="vr-row"><span class="vr-lab">聽到</span><div class="vr-heard">'+heard+'</div></div>'
      +'<div class="vr-legend"><span class="c-ok">✓ 啱</span><span class="c-same">✓ 讀音啱（字唔同）</span><span class="c-tone">▲ 聲調唔準</span><span class="c-bad">✗ 錯／漏</span></div>'
      +(tips.length?'<ul class="vr-tips">'+tips.map(t=>'<li>'+VR.esc(t)+'</li>').join('')+'</ul>':'')
      +'<div class="vr-actions"><button class="vr-btn" data-act="again">🎤 再讀一次</button><button class="vr-btn ghost" data-act="hear">▶ 聽標準讀音</button></div></div>';
  }
  function err(msg,ev){
    show('<div class="vr-err">'+VR.esc(msg)+(ev?'<div style="margin-top:6px;font-size:11px;opacity:.7">診斷：'+VR.esc(VR.diag(ev))+'</div>':'')+'</div><div class="vr-actions"><button class="vr-btn" data-act="again">🎤 再試一次</button></div>');
  }

  function start(){
    if(busy){if(ctl)ctl.stop();return;}                 // 讀緊再撳＝提早停止
    const w=curWord();if(!w)return;
    if(!VR.supported){err('呢個瀏覽器唔支援語音辨識，請用 Chrome、Edge 或 Safari。');return;}
    try{if(window.speechSynthesis)speechSynthesis.cancel();}catch(e){}   // 唔好俾 App 自己把聲收入咪
    VR.loadLib();                                        // 同時喺背景載入粵拼字庫
    stopAll();const my=session;busy=true;
    let alts=[],interim='',error='';
    const note=(html)=>show('<div class="vr-listen"><span class="vr-dot"></span><span>'+html+'</span></div>');
    note('準備緊咪高峰…');btn.classList.add('rec');
    ctl=VR.listen({
      continuous:false,maxAlt:3,
      onStart(){
        if(my!==session)return;
        note('聽緊…請讀出「<b>'+VR.esc(w.char)+'</b>」');
        timer=setTimeout(()=>{if(ctl)ctl.stop();},8000);  // 開始收音後最長 8 秒自動停
      },
      onResult(e){
        if(my!==session)return;
        const res=e.results[e.results.length-1];
        const list=[];for(let i=0;i<res.length;i++){const t=(res[i].transcript||'').trim();if(t)list.push(t);}
        if(res.isFinal)alts=list;else{interim=list[0]||'';note('聽緊…請讀出「<b>'+VR.esc(w.char)+'</b>」　<span style="opacity:.6">'+VR.esc(interim)+'</span>');}
      },
      onError(code){if(my===session)error=code;},
      async onEnd(ev){
        if(my!==session)return;
        clearTimeout(timer);busy=false;btn.classList.remove('rec');ctl=null;
        if(error){err(VR.ERR[error]||('出錯：'+error),ev);return;}
        if(!alts.length&&interim)alts=[interim];
        const L=await VR.withTimeout(VR.loadLib(),4000);
        if(my!==session||curWord()!==w)return;           // 期間轉咗卡就唔顯示
        const T=VR.target(w,L);
        if(!alts.length){
          if(!ev.start){err(VR.ERR['no-response'],ev);return;}
          if(ev.sound||ev.speech){                        // 聽到有出聲，但引擎辨識唔到係咩字 → 當讀得唔清楚，計 0 分
            show(renderResult(w,VR.score(T,[],L),L,'系統聽到你出聲，但辨識唔到係「'+w.char+'」。通常係聲調或者咬字同標準差好遠，聽多一次標準讀音再試。'));
            return;
          }
          err('聽唔到你嘅聲音，請靠近啲咪高峰、讀大聲啲再試。',ev);return;
        }
        show(renderResult(w,VR.score(T,alts,L),L));
      }
    });
  }
  btn.addEventListener('click',e=>{e.stopPropagation();start();});
  panel.addEventListener('click',e=>{
    const b=e.target.closest('[data-act]');if(!b)return;
    if(b.dataset.act==='again')start();
    else if(b.dataset.act==='hear'){const w=curWord();if(w&&typeof Speech!=='undefined')Speech.speak(w.char);}
  });
})();

