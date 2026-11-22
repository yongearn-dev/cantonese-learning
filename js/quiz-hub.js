(function(){
var bar=document.getElementById('qz-hub'); if(!bar)return;
var cur=1;
function R(n){return document.getElementById(n===1?'qz-root':'qz'+n+'-root');}
window.qzHubRefresh=function(){
  var E=window.qzExams||{},busy=0;
  [1,2,3,4,5].forEach(function(n){try{if(E[n]&&E[n].prog())busy=n;}catch(e){}});
  if(busy)cur=busy;
  bar.style.display=busy?'none':'';
  [1,2,3,4,5].forEach(function(n){var r=R(n);if(r)r.style.display=cur===n?'':'none';});
  bar.querySelectorAll('button').forEach(function(b){b.classList.toggle('on',+b.dataset.exam===cur);});
};
bar.addEventListener('click',function(e){
  var b=e.target.closest('button[data-exam]'); if(!b)return;
  cur=+b.dataset.exam; window.qzHubRefresh();
  var E=window.qzExams||{}; if(E[cur]&&E[cur].show)E[cur].show();
});
window.qzHubRefresh();
})();

/* 句子重組：拖拉字塊（滑鼠＋觸控），亦保留撳一下加入／取消 */
window.qzDrag=function(ROOT,prefix,cfg){
  var st=null,ghost=null,ph=null,swallow=false;
  function area(si){return ROOT.querySelector('#'+prefix+'ans'+si);}
  function locate(e){
    var a=area(st.si); if(!a)return null;
    var r=a.getBoundingClientRect(),m=14;
    if(e.clientX<r.left-m||e.clientX>r.right+m||e.clientY<r.top-m||e.clientY>r.bottom+m)return null;
    var tiles=[].slice.call(a.querySelectorAll('.qz-tile:not(.qz-dragging)')),idx=tiles.length;
    for(var i=0;i<tiles.length;i++){
      var t=tiles[i].getBoundingClientRect();
      if(e.clientY<t.top){idx=i;break;}
      if(e.clientY<=t.bottom&&e.clientX<t.left+t.width/2){idx=i;break;}
    }
    return {a:a,idx:idx,tiles:tiles};
  }
  function clean(){
    if(ghost&&ghost.parentNode)ghost.parentNode.removeChild(ghost);
    if(ph&&ph.parentNode)ph.parentNode.removeChild(ph);
    if(st&&st.el)st.el.classList.remove('qz-dragging');
    var a=st&&area(st.si); if(a)a.classList.remove('qz-over');
    ghost=ph=null;
  }
  ROOT.addEventListener('pointerdown',function(e){
    if((e.pointerType==='mouse'&&e.button!==0)||!cfg.active())return;
    var t=e.target.closest&&e.target.closest('.qz-tile'); if(!t)return;
    st={el:t,si:+t.dataset.s,id:+t.dataset.t,inAns:t.dataset.in==='1',x:e.clientX,y:e.clientY,drag:false,pid:e.pointerId};
  });
  document.addEventListener('pointermove',function(e){
    if(!st||e.pointerId!==st.pid)return;
    if(!st.drag){
      if(Math.hypot(e.clientX-st.x,e.clientY-st.y)<8)return;
      st.drag=true;
      var r=st.el.getBoundingClientRect();
      ghost=st.el.cloneNode(true); ghost.className='qz-ghost'; ghost.style.width=r.width+'px'; ghost.style.height=r.height+'px';
      var p0=st.el.querySelector('.qz-pos'),p1=ghost.querySelector('.qz-pos');
      if(p0&&p1)p1.style.background=getComputedStyle(p0).backgroundColor;
      document.body.appendChild(ghost);
      st.el.classList.add('qz-dragging');
      ph=document.createElement('span'); ph.className='qz-ph';
    }
    e.preventDefault();
    var gw=ghost.offsetWidth,gh=ghost.offsetHeight;
    ghost.style.left=(e.clientX-gw/2)+'px'; ghost.style.top=(e.clientY-gh/2)+'px';
    var L=locate(e),a=area(st.si);
    if(L){
      a.classList.add('qz-over');
      if(L.idx<L.tiles.length)a.insertBefore(ph,L.tiles[L.idx]);else a.appendChild(ph);
    }else{
      a.classList.remove('qz-over'); if(ph.parentNode)ph.parentNode.removeChild(ph);
    }
  },{passive:false});
  function finish(e,cancel){
    if(!st||e.pointerId!==st.pid)return;
    var s=st; 
    if(!s.drag){st=null;return;}
    var L=cancel?null:locate(e);
    var arr=cfg.arr(s.si);
    if(!cancel){
      if(s.inAns){var from=arr.indexOf(s.id); if(from>=0)arr.splice(from,1);}
      if(L){var at=Math.min(L.idx,arr.length); arr.splice(at,0,s.id);}
      else if(!s.inAns){/* 由字塊池拖去外面：冇變 */}
    }
    clean(); st=null; swallow=true; setTimeout(function(){swallow=false;},80);
    cfg.change(s.si);
  }
  document.addEventListener('pointerup',function(e){finish(e,false);});
  document.addEventListener('pointercancel',function(e){finish(e,true);});
  ROOT.addEventListener('click',function(e){if(swallow){e.stopPropagation();e.preventDefault();swallow=false;}},true);
};

