/* 課堂測驗題目＋設定（l1_7）。引擎：js/quiz-l1-7.js；改題目只需改呢個檔 */
window.QZ_DATA=window.QZ_DATA||{};
window.QZ_DATA.l1_7=(function(){
'use strict';
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
return {CFG:CFG,TITLE:TITLE,TITLE_TH:TITLE_TH,LISTEN_TEXT:LISTEN_TEXT,LISTEN_Q:LISTEN_Q,SENTS:SENTS,CLF:CLF};
})();
