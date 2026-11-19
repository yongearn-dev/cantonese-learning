(function(){
var TONES=[
  {num:1,name:'陰平',desc:'高平調',color:'#dc2626',thai:'เสียงสูงระดับ'},
  {num:2,name:'陰上',desc:'高升調',color:'#ea580c',thai:'เสียงสูงขึ้น'},
  {num:3,name:'陰去',desc:'中平調',color:'#ca8a04',thai:'เสียงกลางระดับ'},
  {num:4,name:'陽平',desc:'低降調',color:'#16a34a',thai:'เสียงต่ำลง'},
  {num:5,name:'陽上',desc:'低升調',color:'#2563eb',thai:'เสียงต่ำขึ้น'},
  {num:6,name:'陽去',desc:'低平調',color:'#9333ea',thai:'เสียงต่ำระดับ'}
];
var PITCH=[[5,5],[2,5],[3,3],[2,1],[1,3],[2,2]];   // 五度標記起點→終點：55 25 33 21 13 22
var INIT=[
  [['b','ป'],['p','พ'],['m','ม'],['f','ฟ'],['d','ต'],['t','ท'],['n','น'],['l','ล']],
  [['g','ก'],['k','ค'],['ng','ง'],['h','ฮ'],['w','ว'],['gw','กว'],['kw','คว']],
  [['z','จ'],['c','ช'],['s','ซ'],['j','ย']]
];
var FINAL=[
  [['- i','-ย'],['- u','-ว'],['- m','-ม'],['- n','-น']],
  [['- ng','-ง'],['- p','-พ'],['- t','-ท'],['- k','-ค']]
];
var VOWEL=[
  {j:'aa',t:'-า'},{j:'a',t:'-ะ'},{j:'e',t:'แ-'},
  {j:'i',t:'-ี',x:['ยกเว้น ing , ik','เ-ง / เ-ค']},
  {j:'o',t:'-อ',x:['ยกเว้น ou','โ-ว']},
  {j:'u',t:'-ู',x:['ยกเว้น ung , uk','โ-ง / โ-ค']},
  {j:'oe',t:'เ-อ'},{j:'eo',t:'เ-อะ'},{j:'m',t:'อืม'},{j:'ng',t:'อึง'},
  {j:'yu',t:'“-ี” แต่ปาก “-ู”',span:1}
];
function row(p){return '<div class="jc-row"><span class="jc-l">'+p[0]+'</span><span class="jc-v">'+p[1]+'</span></div>';}
function group(pairs,cls){return '<div class="jc-grp '+cls+'">'+pairs.map(row).join('')+'</div>';}
function head(cls,zh,th){return '<div class="jc-h '+cls+'"><span>'+zh+'</span><span class="jc-hth">'+th+'</span></div>';}
// 音高線：高／中／低 三條參考線＋走勢線＋終點圓點
function toneSvg(a,b){
  var W=104,H=64,x1=14,x2=88,y=function(l){return 52-(l-1)*10;};
  var g=[[5,'H'],[3,'M'],[1,'L']].map(function(q){
    return '<line x1="'+x1+'" x2="'+(W-6)+'" y1="'+y(q[0])+'" y2="'+y(q[0])+'" stroke="#fff" stroke-opacity=".45" stroke-width="1" stroke-dasharray="3 3"/><text x="1" y="'+(y(q[0])+3)+'" font-size="8" fill="#fff" fill-opacity=".85" font-family="Noto Sans Thai,sans-serif">'+q[1]+'</text>';
  }).join('');
  return '<svg viewBox="0 0 '+W+' '+H+'" role="img" aria-label="tone contour">'+g
    +'<line x1="'+x1+'" y1="'+y(a)+'" x2="'+x2+'" y2="'+y(b)+'" stroke="#fff" stroke-width="5" stroke-linecap="round"/><circle cx="'+x2+'" cy="'+y(b)+'" r="6" fill="#fff"/></svg>';
}
function build(){
  var h='';
  h+='<section class="jc-sec">'+head('init','聲母','พยัญชนะต้น')+'<div class="jc-cols c3">'+INIT.map(function(g){return group(g,'c-init');}).join('')+'</div></section>';
  h+='<section class="jc-sec">'+head('fin','韻尾','พยัญชนะสะกด')+'<div class="jc-cols c2">'+FINAL.map(function(g){return group(g,'c-fin');}).join('')+'</div></section>';
  h+='<section class="jc-sec">'+head('vow','韻母','สระ')+'<div class="jc-vgrid">'+VOWEL.map(function(v){
    return '<div class="jc-vc'+(v.span?' span':'')+'">'+row([v.j,v.t])+(v.x?'<div class="jc-ex"><span>'+v.x[0]+' →</span><b>'+v.x[1]+'</b></div>':'')+'</div>';
  }).join('')+'</div></section>';
  h+='<section class="jc-sec">'+head('tone','六個聲調','การผันวรรณยุกต์')+'<div class="jc-tones">'+TONES.map(function(t,i){
    return '<div class="jc-tone" style="background:'+t.color+'"><div class="jc-ttop"><div class="jc-tn">'+t.num+'</div><div class="jc-ti"><div class="jc-tname">'+t.name+'</div><div class="jc-tdesc">'+t.desc+'</div><div class="jc-tthai">'+t.thai+'</div></div></div>'
      +'<div class="jc-chart">'+toneSvg(PITCH[i][0],PITCH[i][1])+'</div><div class="jc-tex" data-nojy="1">gaa'+t.num+'</div></div>';
  }).join('')+'</div><div class="jc-legend">H = สูง (高) · M = กลาง (中) · L = ต่ำ (低) &nbsp;|&nbsp; ● = จุดสิ้นสุดของเสียง</div></section>';
  document.getElementById('jc-content').innerHTML=h;
}
build();
var bar=document.getElementById('jp-bar');
window.__jpView='chart';
bar.addEventListener('click',function(e){
  var b=e.target.closest('[data-jp]');if(!b)return;
  var v=b.dataset.jp;window.__jpView=v;
  bar.querySelectorAll('.tm-tab').forEach(function(x){x.classList.toggle('act',x===b);});
  document.getElementById('jc-root').style.display=v==='chart'?'':'none';
  document.getElementById('jp-practice').style.display=v==='practice'?'':'none';
  window.scrollTo(0,0);
});
})();
