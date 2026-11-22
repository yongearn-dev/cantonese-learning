/* 課堂測驗題目＋設定（l15_19b = 測驗（三）B卷）。引擎：js/quiz-l15-19.js（同A卷共用）；改題目只需改呢個檔 */
window.QZ_DATA=window.QZ_DATA||{};
window.QZ_DATA.l15_19b=(function(){
'use strict';
var CFG={
  DURATION_MIN:60,
  QUIZ_ID:'cantonese-l15-19b-v1',
  FORM_ENDPOINT:'https://formspree.io/f/xbgdbeje',
  TEACHER_EMAIL:'yongearn@gmail.com',
  AUDIO:{n:'',s:''}, // 可選：聽力錄音 mp3（正常／慢速）；冇填就用瀏覽器語音
  MAX_PLAYS:3, QA_MAX_PLAYS:3, SHOW_POS:true, VOCAB_COUNT:20,
  CHAPTER_MIN:15, CHAPTER_MAX:19,
  LOCK_NAV:true
};
var PTS={listen:1,vocab:1,qa:1,sent:2,hob:1,clf:1};
var FILE='課堂測驗(三)B卷_第15-19課', SUBJECT='廣東話課堂測驗（三）B卷 第15-19課';
var TITLE='課堂測驗（三）B卷 · 第15–19課', TITLE_TH='แบบทดสอบในชั้นเรียน (3) ชุด B บทที่ 15–19';

/* ── 一、聽力：另一位工人姐姐自我介紹 ＋ 10 題（每題 1 分）；正確答案放喺 o 第一個，出卷時會打亂 ── */
var PASSAGE='大家好！我叫阿美，今年二十八歲，係印尼人。我有兩個仔，大仔八歲，細仔五歲。我之前喺餐廳做過，而家想去香港做工人姐姐，因為想賺多啲錢。我識煮飯、洗衫，仲識熨衫。我每日朝早六點鐘起身，一個星期行三次街，成日聽歌，好少打電話。上個星期我跌低，左手有啲痛，不過而家冇事喇。多謝大家！';
var LQ=[
 {q:'佢叫咩名？',th:'เธอชื่ออะไร',o:[['阿美','อาเหม่ย'],['阿芬','อาเฟิน'],['阿敏','อาหมิน'],['阿琴','อาฉิน']]},
 {q:'佢今年幾多歲？',th:'ปีนี้เธออายุเท่าไร',o:[['二十八歲','อายุ 28 ปี'],['十八歲','อายุ 18 ปี'],['三十八歲','อายุ 38 ปี'],['二十五歲','อายุ 25 ปี']]},
 {q:'佢係邊度人？',th:'เธอเป็นคนชาติไหน',o:[['印尼人','คนอินโดนีเซีย'],['泰國人','คนไทย'],['菲律賓人','คนฟิลิปปินส์'],['日本人','คนญี่ปุ่น']]},
 {q:'佢有幾多個仔？',th:'เธอมีลูกกี่คน',o:[['兩個','สองคน'],['一個','หนึ่งคน'],['三個','สามคน'],['冇','ไม่มี']]},
 {q:'細仔幾多歲？',th:'ลูกคนเล็กอายุเท่าไร',o:[['五歲','ห้าขวบ'],['八歲','แปดขวบ'],['三歲','สามขวบ'],['十歲','สิบขวบ']]},
 {q:'佢而家想去香港做咩？',th:'ตอนนี้เธออยากไปทำอะไรที่ฮ่องกง',o:[['做工人姐姐','ทำงานเป็นแม่บ้าน'],['做廚師','ทำงานเป็นพ่อครัว'],['讀書','เรียนหนังสือ'],['做老師','เป็นครู']]},
 {q:'佢每日朝早幾點鐘起身？',th:'ทุกเช้าเธอตื่นกี่โมง',o:[['六點鐘','หกโมง'],['七點鐘','เจ็ดโมง'],['五點鐘','ห้าโมง'],['八點鐘','แปดโมง']]},
 {q:'佢一個星期行幾多次街？',th:'เธอไปเดินเที่ยวสัปดาห์ละกี่ครั้ง',o:[['三次','สามครั้ง'],['兩次','สองครั้ง'],['五次','ห้าครั้ง'],['每日','ทุกวัน']]},
 {q:'佢好少做咩？',th:'เธอแทบไม่ค่อยทำอะไร',o:[['打電話','โทรศัพท์'],['聽歌','ฟังเพลง'],['煮飯','ทำอาหาร'],['洗衫','ซักผ้า']]},
 {q:'佢上個星期跌低，邊度有啲痛？',th:'สัปดาห์ที่แล้วเธอล้ม ตอนนี้เจ็บตรงไหน',o:[['左手','มือซ้าย'],['右手','มือขวา'],['左腳','เท้าซ้าย'],['右腳','เท้าขวา']]}
];

/* ── 三、問答選擇題（冇泰文）：['問題', ['正確答案','錯誤1','錯誤2','錯誤3']]，每個字寫 '字:粵拼'（多音節用 _ 連接）；出卷時打亂 ── */
var QA=[
 ['你:nei5 幾時:gei2_si4 抹:maat3 窗:coeng1 呀:aa3 ？',['聽日:ting1_jat6 抹:maat3','三十:saam1_sap6 蚊:man1','喺:hai2 學校:hok6_haau6','唔係:m4_hai6 我:ngo5 嘅:ge3']],
 ['你:nei5 一日:jat1_jat6 洗:sai2 幾多:gei2_do1 次:ci3 碗:wun2 呀:aa3 ？',['三次:saam1_ci3','好:hou2 乾淨:gon1_zeng6','喺:hai2 廚房:cyu4_fong2','阿媽:aa3_maa1 嘅:ge3']],
 ['你:nei5 頭先:tau4_sin1 去:heoi3 咗:zo2 邊度:bin1_dou6 呀:aa3 ？',['我:ngo5 去:heoi3 咗:zo2 超市:ciu1_si5','星期三:sing1_kei4_saam1','好:hou2 鍾意:zung1_ji3','四十:sei3_sap6 歲:seoi3']],
 ['你:nei5 肚餓:tou5_ngo6 唔:m4 肚餓:tou5_ngo6 呀:aa3 ？',['有啲:jau5_di1 肚餓:tou5_ngo6','喺:hai2 公園:gung1_jyun2','兩點半:loeng5_dim2_bun3','買:maai5 咗:zo2 啲:di1 菜:coi3']],
 ['你:nei5 星期幾:sing1_kei4_gei2 帶:daai3 婆婆:po4_po2 睇:tai2 醫生:ji1_sang1 呀:aa3 ？',['星期四:sing1_kei4_sei3','好:hou2 貴:gwai3','一個:jat1_go3 人:jan4','喺:hai2 屋企:uk1_kei2']],
 ['你哋:nei5_dei6 屋企:uk1_kei2 有:jau5 幾多:gei2_do1 個:go3 人:jan4 呀:aa3 ？',['我哋:ngo5_dei6 四個:sei3_go3 人:jan4','好:hou2 大間:daai6_gaan1','星期日:sing1_kei4_jat6','我:ngo5 鍾意:zung1_ji3 食:sik6']],
 ['你:nei5 邊:bin1 隻:zek3 手:sau2 受傷:sau6_soeng1 呀:aa3 ？',['我:ngo5 隻:zek3 左手:zo2_sau2 跌傷:dit3_soeng1 咗:zo2','我:ngo5 鍾意:zung1_ji3 聽歌:teng1_go1','三個:saam1_go3 鐘頭:zung1_tau4','喺:hai2 花園:faa1_jyun2']],
 ['你:nei5 每日:mui5_jat6 幾點鐘:gei2_dim2_zung1 起身:hei2_san1 呀:aa3 ？',['六點鐘:luk6_dim2_zung1','好:hou2 高興:gou1_hing3','去:heoi3 街市:gaai1_si5','我:ngo5 嘅:ge3 朋友:pang4_jau5']],
 ['你:nei5 得閒:dak1_haan4 鍾意:zung1_ji3 做:zou6 啲:di1 咩:me1 呀:aa3 ？',['我:ngo5 鍾意:zung1_ji3 睇書:tai2_syu1','喺:hai2 銀行:ngan4_hong4','三百:saam1_baak3 蚊:man1','琴日:kam4_jat6 去:heoi3']],
 ['你:nei5 點樣:dim2_joeng2 去:heoi3 醫院:ji1_jyun2 呀:aa3 ？',['我:ngo5 搭:daap3 巴士:baa1_si2 去:heoi3','四十:sei3_sap6 歲:seoi3','好:hou2 痛:tung3','我哋:ngo5_dei6 六個:luk6_go3 人:jan4']]
];
function parseSeg(s){return s.split(' ').map(function(t){var i=t.indexOf(':');return i<0?[t,'']:[t.slice(0,i),t.slice(i+1).replace(/_/g,' ')];});}
function segText(g){return g.map(function(x){return x[0];}).join('');}
QA=QA.map(function(x){return {q:parseSeg(x[0]),o:x[1].map(function(o){return {seg:parseSeg(o)};})};});

/* ── 四、句子重組（5 題 × 2 分）：[字, 粵拼, 詞類, 後面標點]；alts＝其他都接受嘅完整次序 ── */
var SENTS=[
 {th:'วันนี้ฉันเวียนหัวมาก',alts:[[1,0,2,3,4,5]],
  t:[['今日','gam1 jat6','時間詞'],['我','ngo5','代詞'],['個','go3','量詞'],['頭','tau4','名詞'],['好','hou2','副詞'],['暈','wan4','形容詞','。']]},
 {th:'นายจ้างไปสวนสาธารณะสัปดาห์ละสองครั้ง',alts:[[1,0,2,3,4]],
  t:[['先生','sin1 saang1','名詞'],['一個星期','jat1 go3 sing1 kei4','時間詞'],['去','heoi3','動詞'],['兩次','loeng5 ci3','數量'],['公園','gung1 jyun2','名詞','。']]},
 {th:'บางครั้งเจ้านายอ่านหนังสือพิมพ์ในห้องหนังสือ',alts:[[1,0,2,3,4,5]],
  t:[['老闆','lou5 baan2','名詞'],['有時','jau5 si4','副詞'],['喺','hai2','介詞'],['書房','syu1 fong2','名詞'],['睇','tai2','動詞'],['報紙','bou3 zi2','名詞','。']]},
 {th:'ลูกชายบางครั้งปวดฟัน จึงไม่กินลูกอม',alts:[[1,0,2,3,4,5,6,7]],
  t:[['阿仔','aa3 zai2','名詞'],['間中','gaan3 zung1','副詞'],['牙','ngaa4','名詞'],['痛','tung3','形容詞','，'],['所以','so2 ji5','連詞'],['唔','m4','副詞'],['食','sik6','動詞'],['糖','tong2','名詞','。']]},
 {th:'ทุกวันอาทิตย์คุณพ่อก็ปลูกดอกไม้ที่ระเบียง',alts:[[1,0,2,3,4,5]],
  t:[['每個星期日','mui5 go3 sing1 kei4 jat6','時間詞'],['爸爸','baa4 baa1','名詞'],['都','dou1','副詞'],['喺','hai2','介詞'],['陽台','joeng4 toi4','名詞'],['種花','zung3 faa1','動詞','。']]}
];

/* ── 五、興趣配對（10 組 × 1 分）：[名詞, 粵拼, 動詞, 粵拼]（動詞全部唔同） ── */
var HOB=[
 ['乒乓球','bing1 bam1 kau4','打','daa2'],['鋼琴','gong3 kam4','彈','taan4'],['山','saan1','行','haang4'],['蛋糕','daan2 gou1','焗','guk6'],['魚','jyu2','釣','diu3'],
 ['相','soeng2','影','jing2'],['笛','dek6','吹','ceoi1'],['舞','mou5','跳','tiu3'],['遊戲','jau4 hei3','玩','waan2'],['歌','go1','聽','teng1']
];
/* ── 六、量詞配對（10 組 × 1 分）：頭 5 組係身體量詞；[名詞, 粵拼, 量詞, 粵拼]；右邊冇「隻」，避免「耳仔」有兩個啱答案 ── */
var CLF=[
 ['脷','lei6','條','tiu4'],['肚','tou5','個','go3'],['耳仔','ji5 zai2','對','deoi3'],['眼淚','ngaan5 leoi6','滴','dik6'],['頭髮','tau4 faat3','頭','tau4'],
 ['紙','zi2','張','zoeng1'],['茶','caa4','杯','bui1'],['遮','ze1','把','baa2'],['飛機','fei1 gei1','架','gaa3'],['書','syu1','本','bun2']
];
var MDATA={hob:HOB,clf:CLF};
return {FILE:FILE,SUBJECT:SUBJECT,CFG:CFG,PTS:PTS,TITLE:TITLE,TITLE_TH:TITLE_TH,PASSAGE:PASSAGE,LQ:LQ,QA:QA,SENTS:SENTS,HOB:HOB,CLF:CLF,MDATA:MDATA,parseSeg:parseSeg,segText:segText};
})();
