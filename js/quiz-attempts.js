/* 測驗重考＋作答比較（共用模組）。用法見 js/quiz-l15-19.js。
   紀錄存喺 localStorage['cqh_<QUIZ_ID>']（呢部瀏覽器），每次提交一筆：
   {n,t,total,max,auto,sc:[L,V,A,R,H,C],mx:[…],items:[[sec,key,label,ok,學生答案,正確答案],…],vocab:[[課,字,粵拼,泰文],…]}
   sec：L 聽力 V 詞彙 A 問答 R 句子重組 H 興趣配對 C 量詞配對；key：跨次比較用嘅題目識別碼 */
(function(){
'use strict';
var HMAX=12, SEC=['L','V','A','R','H','C'];
function hkey(id){return 'cqh_'+id;}
function list(id){try{var a=JSON.parse(localStorage.getItem(hkey(id)));return Array.isArray(a)?a:[];}catch(e){return [];}}
function push(id,att){var a=list(id);a.push(att);if(a.length>HMAX)a=a.slice(-HMAX);try{localStorage.setItem(hkey(id),JSON.stringify(a));}catch(e){}return a;}
function clear(id){try{localStorage.removeItem(hkey(id));}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function when(t){try{return new Date(t).toLocaleString('zh-HK',{timeZone:'Asia/Hong_Kong',hour12:false,month:'numeric',day:'numeric',hour:'2-digit',minute:'2-digit'});}catch(e){return '';}}
var ST={
  up:  {ic:'⬆',zh:'進步',th:'ดีขึ้น'},
  both:{ic:'❌',zh:'兩次都錯',th:'ผิดทั้งสองครั้ง'},
  down:{ic:'⬇',zh:'退步',th:'แย่ลง'},
  same:{ic:'✅',zh:'保持正確',th:'ถูกทั้งสองครั้ง'},
  none:{ic:'·',zh:'只有一次',th:'ทำครั้งเดียว'}
};
function status(a,b){
  if(!a||!b)return 'none';
  if(!a[3]&&b[3])return 'up';
  if(a[3]&&!b[3])return 'down';
  if(!a[3]&&!b[3])return 'both';
  return 'same';
}
/* 預設比較「上一次」同「今次」；回傳初始 state */
function initState(id){var n=list(id).length;return {a:Math.max(0,n-2),b:Math.max(0,n-1),f:'all'};}
function html(id,st,titles){
  var H=list(id),n=H.length;
  if(!n)return '<div class="qzc-empty">未有作答紀錄 · ยังไม่มีบันทึก</div>';
  st=st||initState(id); st.a=Math.min(st.a,n-1); st.b=Math.min(st.b,n-1);
  var A=H[st.a],B=H[st.b],h='';
  /* 1) 每次作答總覽 */
  h+='<table class="qzc-tbl"><tr><th>次<br><span class="qz-th">ครั้ง</span></th><th>時間</th><th>總分</th>'+SEC.map(function(s){return '<th>'+esc(titles[s]||s)+'</th>';}).join('')+'</tr>';
  H.forEach(function(r,i){
    var prev=i?H[i-1]:null,d=prev?r.total-prev.total:null;
    h+='<tr'+(i===st.a||i===st.b?' class="sel"':'')+'><td>'+r.n+'</td><td>'+when(r.t)+'</td><td><b>'+r.total+'/'+r.max+'</b>'+
       (d==null?'':'<span class="qzc-d '+(d>0?'up':d<0?'dn':'eq')+'">'+(d>0?'▲+'+d:d<0?'▼'+d:'＝')+'</span>')+'</td>'+
       SEC.map(function(s,k){var v=r.sc[k],pv=prev?prev.sc[k]:null,dd=pv==null?'':(v>pv?'<i class="up">▲</i>':v<pv?'<i class="dn">▼</i>':'');return '<td>'+v+'/'+r.mx[k]+dd+'</td>';}).join('')+'</tr>';
  });
  h+='</table>';
  if(n<2)return h+'<div class="qzc-empty">再做多一次，就可以比較每題嘅進步／退步<br><span class="qz-th">ทำอีกครั้งเพื่อเปรียบเทียบผล</span></div>';
  /* 2) 揀邊兩次比較 */
  var opt=function(sel){return H.map(function(r,i){return '<option value="'+i+'"'+(i===sel?' selected':'')+'>第'+r.n+'次（'+r.total+'/'+r.max+'）</option>';}).join('');};
  h+='<div class="qzc-pick"><b>比較 · เปรียบเทียบ</b> <select data-cmp-sel="a">'+opt(st.a)+'</select> <span>→</span> <select data-cmp-sel="b">'+opt(st.b)+'</select></div>';
  /* 3) 配對每一題 */
  var amap={}; A.items.forEach(function(it){amap[it[1]]=it;});
  var rows=[],cnt={up:0,both:0,down:0,same:0,none:0};
  B.items.forEach(function(it){var a=amap[it[1]],s=status(a,it);cnt[s]++;rows.push({s:s,a:a,b:it});});
  var chips=[['all','全部 · ทั้งหมด',rows.length],['up',ST.up.ic+' '+ST.up.zh,cnt.up],['both',ST.both.ic+' '+ST.both.zh,cnt.both],['down',ST.down.ic+' '+ST.down.zh,cnt.down],['same',ST.same.ic+' '+ST.same.zh,cnt.same]];
  h+='<div class="qzc-chips">'+chips.map(function(c){return '<button class="qzc-chip '+c[0]+(st.f===c[0]?' on':'')+'" data-cmp="filter" data-f="'+c[0]+'">'+c[1]+' <b>'+c[2]+'</b></button>';}).join('')+'</div>';
  h+='<div class="qzc-note">第'+A.n+'次 → 第'+B.n+'次　<span class="qz-th">'+ST.up.th+' / '+ST.both.th+' / '+ST.down.th+'</span></div>';
  SEC.forEach(function(sec){
    var rs=rows.filter(function(r){return r.b[0]===sec&&(st.f==='all'||r.s===st.f);});
    if(!rs.length)return;
    h+='<div class="qzc-sec">'+esc(titles[sec]||sec)+'</div>';
    rs.forEach(function(r){
      var a=r.a,b=r.b,S=ST[r.s],bad=(a&&!a[3])||!b[3];
      h+='<div class="qzc-row s-'+r.s+'"><span class="qzc-badge">'+S.ic+'<small>'+S.zh+'</small></span><div class="qzc-main"><div class="qzc-lab">'+esc(b[2])+'</div>'+
        '<div class="qzc-ans"><span class="qzc-t">第'+A.n+'次</span> '+(a?(a[3]?'<span class="ok">✓</span>':'<span class="no">✗</span> '+esc(a[4]||'未答')):'<span class="qzc-na">—</span>')+
        '　<span class="qzc-t">第'+B.n+'次</span> '+(b[3]?'<span class="ok">✓</span>':'<span class="no">✗</span> '+esc(b[4]||'未答'))+'</div>'+
        (bad?'<div class="qzc-corr">正確答案：<b>'+esc(b[5])+'</b></div>':'')+'</div></div>';
    });
  });
  if(st.f!=='all'&&!rows.some(function(r){return r.s===st.f;}))h+='<div class="qzc-empty">呢類冇題目 · ไม่มีข้อในหมวดนี้</div>';
  return h;
}
window.QZA={list:list,push:push,clear:clear,html:html,initState:initState,status:status,ST:ST};
})();
