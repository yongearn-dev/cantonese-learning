/* 新專題頁（身體、家庭）嘅計分橋：計入主 App ★ 同得分紀錄 */
window.APP_AWARD=function(n){
  try{var prev=S.totalScore;S.totalScore+=n;var chip=document.getElementById('totalScore');
    animateNumber(chip,prev,S.totalScore,600,'','★ ');chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');}catch(e){console.warn('[計分失敗]',e);}
};
window.APP_LOGHIST=function(score,key){
  try{S.scoreHistory.push({game:key,score:score,time:new Date().toLocaleTimeString('en-HK',{hour:'2-digit',minute:'2-digit'})});if(typeof renderHistory==='function')renderHistory();}catch(e){}
};
