function parseCSV(text) {
  // 逐個字元解析：引號入面可以有逗號、換行（Google Sheet 儲存格內 Alt+Enter），"" 代表一個引號
  const src = String(text).replace(/^\uFEFF/, '');
  const rows = [];
  let row = [], cur = '', inQ = false;
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (inQ) {
      if (ch === '"') { if (src[i+1] === '"') { cur += '"'; i++; } else inQ = false; }
      else cur += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(cur.trim()); cur = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && src[i+1] === '\n') i++;
      row.push(cur.trim()); cur = '';
      rows.push(row); row = [];
    } else cur += ch;
  }
  if (cur !== '' || row.length) { row.push(cur.trim()); rows.push(row); }
  const lines = rows.filter(r => r.some(v => v !== ''));
  if (!lines.length) return [];
  const headers = lines[0].map(h => h.trim());
  return lines.slice(1).map(vals => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = (vals[i] || ''));
    return obj;
  }).filter(r => Object.values(r).some(v => v));
}

// ── STATE ─────────────────────────────────────────────────────

const S = {
  tab: 'home',
  data: { vocab:[], dialogue:[], classifier:[], sentence:[], lessons:[] },
  vocabType: null, vocabSub: null, vocabIdx: 0,
  ssPatternId: null,
  dlCat: 'all', dlId: null,
  showJyut: true, showThai: true,
  gameTab: 'color',
  totalScore: 0,
  scoreHistory: [],
  speech: { speaking: null, autoIdx: null, autoTimer: null },
};

// ── TONES ─────────────────────────────────────────────────────

const TONES = [
  {num:1,name:'陰平',desc:'高平調',color:'#dc2626',thai:'เสียงสูงระดับ'},
  {num:2,name:'陰上',desc:'高升調',color:'#ea580c',thai:'เสียงสูงขึ้น'},
  {num:3,name:'陰去',desc:'中平調',color:'#ca8a04',thai:'เสียงกลางระดับ'},
  {num:4,name:'陽平',desc:'低降調',color:'#16a34a',thai:'เสียงต่ำลง'},
  {num:5,name:'陽上',desc:'低升調',color:'#2563eb',thai:'เสียงต่ำขึ้น'},
  {num:6,name:'陽去',desc:'低平調',color:'#9333ea',thai:'เสียงต่ำระดับ'},
];

// ── Color pools ──────────────────────────────────────────────

const BASIC_COLORS = [
  {char:'紅色',  jyutping:'hung4 sik1',      thai:'สีแดง',       hex:'#dc2626'},
  {char:'橙色',  jyutping:'caang2 sik1',     thai:'สีส้ม',       hex:'#ea580c'},
  {char:'黃色',  jyutping:'wong4 sik1',      thai:'สีเหลือง',    hex:'#eab308'},
  {char:'綠色',  jyutping:'luk6 sik1',       thai:'สีเขียว',     hex:'#16a34a'},
  {char:'藍色',  jyutping:'laam4 sik1',      thai:'สีน้ำเงิน',   hex:'#2563eb'},
  {char:'紫色',  jyutping:'zi2 sik1',        thai:'สีม่วง',      hex:'#9333ea'},
  {char:'黑色',  jyutping:'haak1 sik1',      thai:'สีดำ',        hex:'#111827'},
  {char:'白色',  jyutping:'baak6 sik1',      thai:'สีขาว',       hex:'#f1f5f9'},
  {char:'灰色',  jyutping:'fui1 sik1',       thai:'สีเทา',       hex:'#6b7280'},
];
const HARD_COLORS = [
  {char:'粉紅色', jyutping:'fan2 hung4 sik1', thai:'สีชมพู',      hex:'#f472b6'},
  {char:'深紅色', jyutping:'sam1 hung4 sik1', thai:'สีแดงเข้ม',   hex:'#7f1d1d'},
  {char:'米色',  jyutping:'mai5 sik1',        thai:'สีครีม',      hex:'#d4b483'},
  {char:'深綠色', jyutping:'sam1 luk6 sik1',  thai:'สีเขียวเข้ม', hex:'#14532d'},
  {char:'淺綠色', jyutping:'cin2 luk6 sik1',  thai:'สีเขียวอ่อน', hex:'#86efac'},
  {char:'深藍色', jyutping:'sam1 laam4 sik1', thai:'สีน้ำเงินเข้ม',hex:'#1e3a8a'},
  {char:'淺藍色', jyutping:'cin2 laam4 sik1', thai:'สีฟ้าอ่อน',   hex:'#93c5fd'},
  {char:'天藍色', jyutping:'tin1 laam4 sik1', thai:'สีฟ้า',       hex:'#38bdf8'},
  {char:'啡色',  jyutping:'fe1 sik1',         thai:'สีน้ำตาล',    hex:'#92400e'},
  {char:'青色',  jyutping:'ceng1 sik1',       thai:'สีเขียวอมฟ้า',hex:'#0891b2'},
];
const ALL_COLORS = [...BASIC_COLORS, ...HARD_COLORS];

// Build LV1 pool: ~70% basic, ~30% hard, shuffled

function buildLv1Pool() {
  const b = shuffle(BASIC_COLORS);
  const h = shuffle(HARD_COLORS).slice(0, 3);
  return shuffle([...b, ...h]);
}


const DIR_SCENARIOS = [
  {scene:'⬆️',   q:'箭頭指住邊個方向？', qjyut:'zin3 tau4 zi2 zyu6 bin1 go3 fong1 heung3?', answer:'上面', validWrongs:['下面','左面','右面']},
  {scene:'⬇️',   q:'箭頭指住邊個方向？', qjyut:'zin3 tau4 zi2 zyu6 bin1 go3 fong1 heung3?', answer:'下面', validWrongs:['上面','左面','右面']},
  {scene:'⬅️',   q:'箭頭指住邊個方向？', qjyut:'zin3 tau4 zi2 zyu6 bin1 go3 fong1 heung3?', answer:'左面', validWrongs:['右面','上面','下面']},
  {scene:'➡️',   q:'箭頭指住邊個方向？', qjyut:'zin3 tau4 zi2 zyu6 bin1 go3 fong1 heung3?', answer:'右面', validWrongs:['左面','上面','下面']},
  {scene:'🌞\n🏠', q:'太陽喺屋嘅咩位置？',  qjyut:'taai3 joeng4 hai2 uk1 ge3 me1 wai2 zi3?', answer:'上面', validWrongs:['下面','左面','右面']},
  {scene:'🏠\n🌊', q:'海浪喺屋嘅咩位置？', qjyut:'hoi2 long6 hai2 uk1 ge3 me1 wai2 zi3?',   answer:'下面', validWrongs:['上面','左面','右面']},
  {scene:'🍎 🍊', q:'蘋果喺橙嘅咩位置？', qjyut:'ping4 gwo2 hai2 caang2 ge3 me1 wai2 zi3?', answer:'左面', validWrongs:['右面','上面','下面']},
  {scene:'🍊 🍎', q:'蘋果喺橙嘅咩位置？', qjyut:'ping4 gwo2 hai2 caang2 ge3 me1 wai2 zi3?', answer:'右面', validWrongs:['左面','上面','下面']},
  {scene:'🐱 🐶', q:'貓喺狗嘅咩位置？',   qjyut:'maau1 hai2 gau2 ge3 me1 wai2 zi3?',       answer:'左面', validWrongs:['右面','上面','下面']},
  {scene:'🐶 🐱', q:'貓喺狗嘅咩位置？',   qjyut:'maau1 hai2 gau2 ge3 me1 wai2 zi3?',       answer:'右面', validWrongs:['左面','上面','下面']},
  {scene:'📦 🐈', q:'貓喺箱嘅咩位置？',   qjyut:'maau1 hai2 soeng1 ge3 me1 wai2 zi3?',     answer:'右面', validWrongs:['左面','上面','下面']},
  {scene:'🐈 📦', q:'貓喺箱嘅咩位置？',   qjyut:'maau1 hai2 soeng1 ge3 me1 wai2 zi3?',     answer:'左面', validWrongs:['右面','上面','下面']},
  {scene:'🪑 🖥', q:'電腦喺椅子嘅咩位置？',qjyut:'din6 nou5 hai2 yi2 zi2 ge3 me1 wai2 zi3?', answer:'右面', validWrongs:['左面','上面','下面']},
  {scene:'🖥 🪑', q:'椅子喺電腦嘅咩位置？',qjyut:'yi2 zi2 hai2 din6 nou5 ge3 me1 wai2 zi3?', answer:'右面', validWrongs:['左面','上面','下面']},
  {scene:'🧍🏻 🚪', q:'人企喺門嘅咩位置？', qjyut:'jan4 kei5 hai2 mun4 ge3 me1 wai2 zi3?', answer:'前面', validWrongs:['後面','左面','右面']},
  {scene:'🚪 🧍🏻', q:'人企喺門嘅咩位置？', qjyut:'jan4 kei5 hai2 mun4 ge3 me1 wai2 zi3?', answer:'後面', validWrongs:['前面','左面','右面']},
  {scene:'🧍🏻 🪞', q:'人企喺鏡嘅咩位置？', qjyut:'jan4 kei5 hai2 geng3 ge3 me1 wai2 zi3?', answer:'前面', validWrongs:['後面','左面','右面']},
  {scene:'🌙\n⭐',  q:'星星喺月亮嘅咩位置？',qjyut:'sing1 sing1 hai2 jyut6 loeng4 ge3 me1 wai2 zi3?', answer:'下面', validWrongs:['上面','左面','右面']},
];
const DIR_ALL = ['上面','下面','左面','右面','前面','後面'];
const DIR_JYUT = {'上面':'soeng6 min6','下面':'haa6 min6','左面':'zo2 min6','右面':'jau6 min6','前面':'cin4 min6','後面':'hau6 min6'};

const CLF_QUESTIONS = [
  {noun:'一___ 人',jyut_noun:'jat1 ___ jan4',answer:'個',hint:'人物'},
  {noun:'一___ 蘋果',jyut_noun:'jat1 ___ ping4 gwo2',answer:'個',hint:'圓形水果'},
  {noun:'一___ 狗',jyut_noun:'jat1 ___ gau2',answer:'隻',hint:'動物'},
  {noun:'一___ 貓',jyut_noun:'jat1 ___ maau1',answer:'隻',hint:'動物'},
  {noun:'一___ 魚',jyut_noun:'jat1 ___ jyu2',answer:'條',hint:'細長形'},
  {noun:'一___ 褲',jyut_noun:'jat1 ___ fu3',answer:'條',hint:'長形衫褲'},
  {noun:'一___ 紙',jyut_noun:'jat1 ___ zi2',answer:'張',hint:'扁平嘅嘢'},
  {noun:'一___ 枱',jyut_noun:'jat1 ___ toi2',answer:'張',hint:'扁平面傢俬'},
  {noun:'一___ 書',jyut_noun:'jat1 ___ syu1',answer:'本',hint:'有頁讀物'},
  {noun:'一___ 雜誌',jyut_noun:'jat1 ___ zaap6 zi3',answer:'本',hint:'有頁讀物'},
  {noun:'一___ 茶',jyut_noun:'jat1 ___ caa4',answer:'杯',hint:'飲品容器'},
  {noun:'一___ 咖啡',jyut_noun:'jat1 ___ gaa3 fe1',answer:'杯',hint:'飲品容器'},
  {noun:'一___ 飯',jyut_noun:'jat1 ___ faan6',answer:'碗',hint:'用碗裝'},
  {noun:'一___ 湯',jyut_noun:'jat1 ___ tong1',answer:'碗',hint:'用碗裝'},
  {noun:'一___ 屋',jyut_noun:'jat1 ___ uk1',answer:'間',hint:'建築物/空間'},
  {noun:'一___ 舖',jyut_noun:'jat1 ___ pou3',answer:'間',hint:'建築物/空間'},
];

// ── SPEECH ────────────────────────────────────────────────────

const Speech = {
  supported: 'speechSynthesis' in window,
  voices: [],
  init() {
    if (!this.supported) return;
    const load = () => { this.voices = speechSynthesis.getVoices(); };
    load();
    speechSynthesis.onvoiceschanged = load;
  },
  speak(text, onEnd) {
    if (!this.supported) return;
    speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    const v = this.voices.find(v=>v.lang==='zh-HK')
           || this.voices.find(v=>v.lang==='zh-TW')
           || this.voices.find(v=>v.lang.startsWith('zh'));
    if (v) utt.voice = v;
    utt.lang = 'zh-HK'; utt.rate = 0.85;
    utt.onend = onEnd || null;
    utt.onerror = onEnd || null;
    speechSynthesis.speak(utt);
  },
  stop() { if (this.supported) speechSynthesis.cancel(); }
};

// ── HELPERS ───────────────────────────────────────────────────
const $ = id => document.getElementById(id);

function shuffle(arr) {
  const a=[...arr];
  for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
  return a;
}
function h(tag, cls, inner='') {
  const el = document.createElement(tag);
  if (cls) el.className = cls;
  if (inner) el.innerHTML = inner;
  return el;
}

// ── INIT ALL ──────────────────────────────────────────────────

const INLINE = {
  vocab: `id,jyutping,char,thai,english,tone,category
1,nei5 hou2,你好,สวัสดี,Hello,5-2,greetings
2,m4 goi1,唔該,ขอบคุณ/ขอโทษ,Thank you / Excuse me,4-1,greetings
3,do1 ze6,多謝,ขอบคุณมาก,Thank you (gift),1-6,greetings
4,baai3 baai3,拜拜,ลาก่อน,Goodbye,3-3,greetings
5,hai6,係,ใช่,Yes / Is,6,basics
6,m4 hai6,唔係,ไม่ใช่,No / Is not,4-6,basics
7,hou2,好,ดี,Good,2,basics
8,m4 hou2,唔好,ไม่ดี,Not good,4-2,basics
9,ngo5,我,ฉัน/ผม,I / Me,5,pronouns
10,nei5,你,คุณ,You,5,pronouns
11,keoi5,佢,เขา/เธอ,He / She,5,pronouns
12,sik6 fan6,食飯,กินข้าว,Eat a meal,6-6,food
13,jam2 seoi2,飲水,ดื่มน้ำ,Drink water,2-2,food
14,hou2 sik6,好食,อร่อย,Delicious,2-6,food
15,gei2 do1 cin2,幾多錢,เท่าไหร่,How much?,2-1-2,shopping`,

  dialogue: `dialogue_id,title,titleThai,emoji,category,line_order,speaker,jyutping,cantonese,thai
1,自我介紹,แนะนำตัว,👋,original,1,A,nei5 hou2! ngo5 giu3 aa3 ming4.,你好！我叫阿明。,สวัสดี! ฉันชื่ออาหมิง
1,自我介紹,แนะนำตัว,👋,original,2,B,nei5 hou2! nei5 hai6 m4 hai6 hoeng1 gong2 jan4?,你好！你係唔係香港人？,สวัสดี! คุณเป็นคนฮ่องกงไหม?
1,自我介紹,แนะนำตัว,👋,original,3,A,hai6 ngo5 hai6 hoeng1 gong2 jan4. nei5 ne1?,係，我係香港人。你呢？,ใช่ ฉันเป็นคนฮ่องกง แล้วคุณล่ะ?
1,自我介紹,แนะนำตัว,👋,original,4,B,ngo5 hai6 taai3 gwok3 jan4.,我係泰國人。,ฉันเป็นคนไทย
2,買嘢,ช้อปปิ้ง,🛍️,original,1,顧客,ni1 go3 gei2 do1 cin2?,呢個幾多錢？,อันนี้เท่าไหร่?
2,買嘢,ช้อปปิ้ง,🛍️,original,2,店員,ng5 sap6 man1.,五十蚊。,ห้าสิบดอลลาร์
2,買嘢,ช้อปปิ้ง,🛍️,original,3,顧客,jau5 mou5 peng4 di1?,有冇平啲？,มีถูกกว่านี้ไหม?
2,買嘢,ช้อปปิ้ง,🛍️,original,4,店員,sei3 sap6 ng5 man1 zeoi3 peng4 laa3.,四十五蚊，最平喇。,สี่สิบห้า ถูกสุดแล้ว
3,去飲茶,ไปยำชา,🍵,original,1,侍應,nei5 dei6 jiu3 jam2 me1 caa4?,你哋要飲咩茶？,คุณต้องการดื่มชาอะไร?
3,去飲茶,ไปยำชา,🍵,original,2,客人,pou2 lei5 caa4 m4 goi1.,普洱茶，唔該。,ชาผู่เอ่อ ขอบคุณ
3,去飲茶,ไปยำชา,🍵,original,3,侍應,jiu3 m4 jiu3 dim2 sam1?,要唔要點心？,ต้องการติ่มซำไหม?
3,去飲茶,ไปยำชา,🍵,original,4,客人,jiu3 haa1 gaau2 tung4 siu1 maai2 do1 ze6!,要，蝦餃同燒賣，多謝！,ต้องการ ฮาเกาและซิวไม ขอบคุณ!
4,早晨問候,ทักทายตอนเช้า,🌅,care,1,姐姐,po4 po2 zou2 san4 aa3 nei5 seng2 zo2 mei6 aa3?,婆婆，早晨呀，你醒咗未呀？,คุณยาย อรุณสวัสดิ์ ตื่นแล้วหรือยัง?
4,早晨問候,ทักทายตอนเช้า,🌅,care,2,婆婆,seng2 zo2 laa3 bat1 gwo3 zung6 jau5 siu2 siu2 gui6.,醒咗喇，不過仲有少少攰。,ตื่นแล้ว แต่ยังเหนื่อยนิดหน่อย
4,早晨問候,ทักทายตอนเช้า,🌅,care,3,姐姐,jiu3 m4 jiu3 zoi3 fan3 jat1 zan6?,要唔要再瞓一陣？,จะนอนต่ออีกสักครู่ไหม?
4,早晨問候,ทักทายตอนเช้า,🌅,care,4,婆婆,m4 fan3 laa3 bong1 ngo5 fu2 hei2 san1.,唔瞓喇，幫我扶起身。,ไม่นอนแล้ว ช่วยพยุงฉันลุกขึ้นด้วย
4,早晨問候,ทักทายตอนเช้า,🌅,care,5,姐姐,hou2 aa3 nei5 maan6 maan6 ngo5 fu2 zyu6 nei5.,好呀，你慢慢，我扶住你。,ได้เลย ค่อยๆ นะ ฉันพยุงไว้
4,早晨問候,ทักทายตอนเช้า,🌅,care,6,婆婆,hou2 do1 ze6 nei5 aa3.,好，多謝你呀。,ขอบคุณนะ
5,食早餐,กินอาหารเช้า,🍳,care,1,姐姐,po4 po2 ngo5 zing2 zo2 zuk1 tung4 gai1 daan2 nei5 soeng2 sik6 bin1 joeng6 sin1?,婆婆，我整咗粥同雞蛋，你想食邊樣先？,คุณยาย ฉันทำโจ๊กกับไข่ไว้แล้ว อยากกินอะไรก่อน?
5,食早餐,กินอาหารเช้า,🍳,care,2,婆婆,ngo5 sik6 siu2 siu2 zuk1 sin1 laa1.,我食少少粥先啦。,กินโจ๊กนิดหน่อยก่อนแล้วกัน
5,食早餐,กินอาหารเช้า,🍳,care,3,姐姐,hou2 aa3 siu2 sam1 jit6 ngo5 bong1 nei5 ceoi1 jat1 ceoi1.,好呀，小心熱，我幫你吹一吹。,ได้เลย ระวังร้อนนะ ฉันเป่าให้หน่อย
5,食早餐,กินอาหารเช้า,🍳,care,4,婆婆,hou2 m4 goi1 nei5.,好，唔該你。,ขอบคุณ
6,提醒食藥,เตือนกินยา,💊,care,1,姐姐,po4 po2 ji4 gaa1 caa1 m4 do1 si4 gaan3 sik6 joek3 laa3.,婆婆，依家差唔多時間食藥喇。,คุณยาย ใกล้เวลากินยาแล้ว
6,提醒食藥,เตือนกินยา,💊,care,2,婆婆,gam3 faai3 jau6 jiu3 sik6 laa3?,咁快又要食喇？,เร็วจังต้องกินอีกแล้วหรือ?
6,提醒食藥,เตือนกินยา,💊,care,3,姐姐,ji1 sang1 waa6 jiu3 zeon2 si4 sik6 deoi3 san1 tai2 hou2 di1.,醫生話要準時食，對身體好啲。,หมอบอกต้องกินตรงเวลา ดีต่อร่างกาย
6,提醒食藥,เตือนกินยา,💊,care,4,婆婆,hou2 laa1 nei5 bong1 ngo5 ning4 lai4.,好啦，你幫我拎嚟。,ได้ ช่วยเอามาให้ด้วย
6,提醒食藥,เตือนกินยา,💊,care,5,姐姐,ni1 dou6 jau5 seoi2 nei5 maan6 maan2 tan1.,呢度有水，你慢慢吞。,นี่มีน้ำแล้ว ค่อยๆ กลืนนะ
6,提醒食藥,เตือนกินยา,💊,care,6,婆婆,hou2 do1 ze6 nei5 tai4 sing3.,好，多謝你提醒。,ขอบคุณที่เตือน
7,婆婆跌倒,คุณยายล้ม,🚨,emergency,1,婆婆,aai3 jaa3 ngo5 dit3 zo2 aa3!,哎呀，我跌咗呀！,โอ๊ย ฉันล้มแล้ว!
7,婆婆跌倒,คุณยายล้ม,🚨,emergency,2,姐姐,po4 po2! nei5 jau5 mou5 zing2 can1 bin1 dou6?,婆婆！你有冇整親邊度？,คุณยาย! เจ็บตรงไหนบ้างไหม?
7,婆婆跌倒,คุณยายล้ม,🚨,emergency,3,婆婆,zek3 goek3 jau5 di1 tung3 hei2 m4 dou2 san1.,隻腳有啲痛，起唔到身。,ขาเจ็บนิดหน่อย ลุกขึ้นไม่ได้
7,婆婆跌倒,คุณยายล้ม,🚨,emergency,4,姐姐,m4 hou2 juk1 zyu6 ngo5 ji4 gaa1 fu2 nei5 maan6 maan2 hei2 san1.,唔好郁住，我而家扶你慢慢起身。,อย่าขยับก่อน ฉันจะพยุงให้ลุกขึ้นช้าๆ
7,婆婆跌倒,คุณยายล้ม,🚨,emergency,5,姐姐,jyu4 gwo2 zung6 tung3 ngo5 dei6 jiu3 heoi3 tai2 ji1 sang1.,如果仲痛，我哋要去睇醫生。,ถ้ายังเจ็บอยู่ เราต้องไปหาหมอ
8,發燒頭暈,เป็นไข้/เวียนหัว,🤒,emergency,1,姐姐,po4 po2 nei5 go3 san1 hou2 ci5 hou2 jit6 wo3.,婆婆，你個身好似好熱喎。,คุณยาย ร่างกายดูร้อนมากเลยนะ
8,發燒頭暈,เป็นไข้/เวียนหัว,🤒,emergency,2,婆婆,hai6 aa3 ngo5 jau5 di1 wan4 tung4 tau4 tung3.,係呀，我有啲暈同頭痛。,ใช่ ฉันรู้สึกเวียนหัวและปวดหัว
8,發燒頭暈,เป็นไข้/เวียนหัว,🤒,emergency,3,姐姐,ngo5 bong1 nei5 taam3 haa6 jit6 sin1.,我幫你探下熱先。,ฉันจะวัดไข้ให้ก่อนนะ
8,發燒頭暈,เป็นไข้/เวียนหัว,🤒,emergency,4,姐姐,ngo5 bong1 nei5 jam2 seoi2 tung4 jau1 sik3 tai2 haa6 jiu3 m4 jiu3 sik6 joek3.,我幫你飲水同休息，睇下要唔要食藥。,ให้ดื่มน้ำและพักผ่อนก่อน แล้วดูว่าต้องกินยาไหม
8,發燒頭暈,เป็นไข้/เวียนหัว,🤒,emergency,5,婆婆,hou2 do1 ze6 nei5 ziu3 gu3 ngo5.,好，多謝你照顧我。,ขอบคุณที่ดูแลฉัน
9,街市買菜,ซื้อผักที่ตลาด,🥬,market,1,姐姐,ni1 di1 coi3 gei2 do1 cin2 jat1 gan1 aa3?,呢啲菜幾多錢一斤呀？,ผักนี่กิโลกรัมละเท่าไหร่?
9,街市買菜,ซื้อผักที่ตลาด,🥬,market,2,檔主,ji6 sap6 man1 jat1 gan1 hou2 san1 sin1.,二十蚊一斤，好新鮮。,ยี่สิบดอลลาร์หนึ่งกิโล สดมาก
9,街市買菜,ซื้อผักที่ตลาด,🥬,market,3,姐姐,ho2 m4 ho2 ji3 peng4 siu2 siu2?,可唔可以平少少？,ลดราคาได้ไหม?
9,街市買菜,ซื้อผักที่ตลาด,🥬,market,4,檔主,nei5 maai5 do1 di1 zau6 peng4 di1 bei2 nei5.,你買多啲就平啲畀你。,ซื้อมากกว่านี้ก็ลดให้
9,街市買菜,ซื้อผักที่ตลาด,🥬,market,5,姐姐,hou2 aa3 gam2 ngo5 jiu3 loeng5 gan1.,好呀，咁我要兩斤。,ได้เลย งั้นขอสองกิโล
9,街市買菜,ซื้อผักที่ตลาด,🥬,market,6,檔主,hou2 bong1 nei5 gaan2 leng3 di1.,好，幫你揀靚啲。,ได้ เดี๋ยวเลือกอันสวยให้
10,買魚,ซื้อปลา,🐟,market,1,姐姐,ni1 tiu4 jyu2 san1 m4 san1 sin1?,呢條魚新唔新鮮？,ปลาตัวนี้สดไหม?
10,買魚,ซื้อปลา,🐟,market,2,檔主,gam1 jat6 ngaam1 ngaam1 dou3 hou2 san1 sin1.,今日啱啱到，好新鮮。,เพิ่งมาถึงวันนี้เลย สดมาก
10,買魚,ซื้อปลา,🐟,market,3,姐姐,ho2 m4 ho2 ji3 bong1 ngo5 cing1 lei5?,可唔可以幫我清理？,ช่วยทำความสะอาดให้ได้ไหม?
10,買魚,ซื้อปลา,🐟,market,4,檔主,ho2 ji3 bong1 nei5 tong1 hou2.,可以，幫你劏好。,ได้เลย จัดการให้
10,買魚,ซื้อปลา,🐟,market,5,姐姐,hou2 aa3 m4 goi1 nei5.,好呀，唔該你。,ดีเลย ขอบคุณ
10,買魚,ซื้อปลา,🐟,market,6,檔主,dang2 jat1 dang2 hou2 faai3 hou2.,等一等，好快好。,รอแป๊บนึง เดี๋ยวเสร็จ`,

  classifier: `char,jyutping,thai,english,example1_char,example1_jyut,example2_char,example2_jyut
個,go3,ลักษณนามทั่วไป,general (person/thing),一個人,jat1 go3 jan4,一個蘋果,jat1 go3 ping4 gwo2
隻,zek3,สัตว์/สิ่งเป็นคู่,animals / one of a pair,一隻狗,jat1 zek3 gau2,一隻手,jat1 zek3 sau2
條,tiu4,สิ่งยาว,long thin things,一條魚,jat1 tiu4 jyu2,一條褲,jat1 tiu4 fu3
張,zoeng1,สิ่งแบน,flat things,一張紙,jat1 zoeng1 zi2,一張枱,jat1 zoeng1 toi2
本,bun2,หนังสือ/สมุด,books/notebooks,一本書,jat1 bun2 syu1,一本雜誌,jat1 bun2 zaap6 zi3
杯,bui1,แก้ว/ถ้วย,cups/glasses,一杯茶,jat1 bui1 caa4,一杯水,jat1 bui1 seoi2
碗,wun2,ชาม,bowls,一碗飯,jat1 wun2 faan6,一碗湯,jat1 wun2 tong1
間,gaan1,ห้อง/ร้าน/บ้าน,rooms/shops/houses,一間屋,jat1 gaan1 uk1,一間舖,jat1 gaan1 pou3`,

  sentence: `pattern_id,title,titleThai,example,jyutping,thai,part_order,text,jyut,role,roleThai,color
1,基本句式,ประโยคพื้นฐาน,一個男仔食飯,jat1 go3 naam4 zai2 sik6 faan6,เด็กผู้ชายคนหนึ่งกินข้าว,1,一,jat1,數量,จำนวน,#dc2626
1,基本句式,ประโยคพื้นฐาน,一個男仔食飯,jat1 go3 naam4 zai2 sik6 faan6,เด็กผู้ชายคนหนึ่งกินข้าว,2,個,go3,量詞,ลักษณนาม,#ea580c
1,基本句式,ประโยคพื้นฐาน,一個男仔食飯,jat1 go3 naam4 zai2 sik6 faan6,เด็กผู้ชายคนหนึ่งกินข้าว,3,男仔,naam4 zai2,名詞,คำนาม,#ca8a04
1,基本句式,ประโยคพื้นฐาน,一個男仔食飯,jat1 go3 naam4 zai2 sik6 faan6,เด็กผู้ชายคนหนึ่งกินข้าว,4,食飯,sik6 faan6,動詞,คำกริยา,#16a34a
2,位置句式,ประโยคแสดงตำแหน่ง,個男仔企喺枱嘅右面,go3 naam4 zai2 kei5 hai2 toi2 ge3 jau6 min6,เด็กผู้ชายยืนอยู่ด้านขวาของโต๊ะ,1,個,go3,量詞,ลักษณนาม,#ea580c
2,位置句式,ประโยคแสดงตำแหน่ง,個男仔企喺枱嘅右面,go3 naam4 zai2 kei5 hai2 toi2 ge3 jau6 min6,เด็กผู้ชายยืนอยู่ด้านขวาของโต๊ะ,2,男仔,naam4 zai2,名詞,คำนาม,#ca8a04
2,位置句式,ประโยคแสดงตำแหน่ง,個男仔企喺枱嘅右面,go3 naam4 zai2 kei5 hai2 toi2 ge3 jau6 min6,เด็กผู้ชายยืนอยู่ด้านขวาของโต๊ะ,3,企,kei5,動詞,คำกริยา,#16a34a
2,位置句式,ประโยคแสดงตำแหน่ง,個男仔企喺枱嘅右面,go3 naam4 zai2 kei5 hai2 toi2 ge3 jau6 min6,เด็กผู้ชายยืนอยู่ด้านขวาของโต๊ะ,4,喺,hai2,介詞,คำบุพบท,#2563eb
2,位置句式,ประโยคแสดงตำแหน่ง,個男仔企喺枱嘅右面,go3 naam4 zai2 kei5 hai2 toi2 ge3 jau6 min6,เด็กผู้ชายยืนอยู่ด้านขวาของโต๊ะ,5,枱,toi2,名詞,คำนาม,#ca8a04
2,位置句式,ประโยคแสดงตำแหน่ง,個男仔企喺枱嘅右面,go3 naam4 zai2 kei5 hai2 toi2 ge3 jau6 min6,เด็กผู้ชายยืนอยู่ด้านขวาของโต๊ะ,6,嘅,ge3,助詞,คำช่วย,#9333ea
2,位置句式,ประโยคแสดงตำแหน่ง,個男仔企喺枱嘅右面,go3 naam4 zai2 kei5 hai2 toi2 ge3 jau6 min6,เด็กผู้ชายยืนอยู่ด้านขวาของโต๊ะ,7,右面,jau6 min6,方向,ทิศทาง,#0891b2
3,動作句式,ประโยคแสดงการกระทำ,姐姐幫婆婆飲水,ze4 ze1 bong1 po4 po2 jam2 seoi2,พี่สาวช่วยคุณยายดื่มน้ำ,1,姐姐,ze4 ze1,主語,ประธาน,#dc2626
3,動作句式,ประโยคแสดงการกระทำ,姐姐幫婆婆飲水,ze4 ze1 bong1 po4 po2 jam2 seoi2,พี่สาวช่วยคุณยายดื่มน้ำ,2,幫,bong1,動詞,คำกริยา,#16a34a
3,動作句式,ประโยคแสดงการกระทำ,姐姐幫婆婆飲水,ze4 ze1 bong1 po4 po2 jam2 seoi2,พี่สาวช่วยคุณยายดื่มน้ำ,3,婆婆,po4 po2,賓語,กรรม,#ca8a04
3,動作句式,ประโยคแสดงการกระทำ,姐姐幫婆婆飲水,ze4 ze1 bong1 po4 po2 jam2 seoi2,พี่สาวช่วยคุณยายดื่มน้ำ,4,飲水,jam2 seoi2,動作,การกระทำ,#2563eb
4,疑問句式,ประโยคคำถาม,你食咗飯未呀？,nei5 sik6 zo2 faan6 mei6 aa3?,คุณกินข้าวหรือยัง?,1,你,nei5,主語,ประธาน,#dc2626
4,疑問句式,ประโยคคำถาม,你食咗飯未呀？,nei5 sik6 zo2 faan6 mei6 aa3?,คุณกินข้าวหรือยัง?,2,食,sik6,動詞,คำกริยา,#16a34a
4,疑問句式,ประโยคคำถาม,你食咗飯未呀？,nei5 sik6 zo2 faan6 mei6 aa3?,คุณกินข้าวหรือยัง?,3,咗,zo2,完成時,สำเร็จ,#9333ea
4,疑問句式,ประโยคคำถาม,你食咗飯未呀？,nei5 sik6 zo2 faan6 mei6 aa3?,คุณกินข้าวหรือยัง?,4,飯,faan6,賓語,กรรม,#ca8a04
4,疑問句式,ประโยคคำถาม,你食咗飯未呀？,nei5 sik6 zo2 faan6 mei6 aa3?,คุณกินข้าวหรือยัง?,5,未,mei6,疑問,คำถาม,#ea580c
4,疑問句式,ประโยคคำถาม,你食咗飯未呀？,nei5 sik6 zo2 faan6 mei6 aa3?,คุณกินข้าวหรือยัง?,6,呀,aa3,語氣詞,คำเน้น,#6b7280`,

  lessons: `lesson_id,type,chapter,title,soundcloud_url,youtube_url,vocab_ids,order,unlocked_by_default,password
ch00_jyutping,Chapter,0,Jyutping,,https://youtu.be/HNAF8k69COo,,1,TRUE,
ch00_tones,Chapter,0,Tone Rules,,https://youtu.be/fmqHaywHB4Q,,1,TRUE,
ch00_pos,Chapter,0,Part of Speech,,https://youtu.be/8O9naHnUX0Q,,1,TRUE,
ch01,Chapter,1,ngo5 hai6... 我係...,https://on.soundcloud.com/SYKe7UKWQsdnlrnhYn,https://youtu.be/5SLLIBbaVq4,,1,TRUE,
extra01,Extra,1,Housework,,https://youtu.be/QmikHwvngEM,,2,FALSE,
grammar01,Grammar,1,(num) (class) (n),,https://youtu.be/624IrnIIFEw,,3,FALSE,
ch02,Chapter,2,lei1 dou6 呢度 go2 gou6 嗰度,https://on.soundcloud.com/pCYvoHCJuE0TJ7Mb2m,https://youtu.be/BcUzgIzc6VU,,4,FALSE,
ch03,Chapter,3,nei5 hou2! 你好！,https://on.soundcloud.com/F67LN3ylkSr43m5p3V,https://youtu.be/EppwYVxuRnw,,5,FALSE,
grammar02,Grammar,2,hou2(adj) 好(adj),,https://youtu.be/OKL1ET6tE9s,,6,FALSE,
grammar03,Grammar,3,bin2 dou6? 邊度？,,https://youtu.be/jFmGBW-9zes,,7,FALSE,
grammar04,Grammar,4,gei2 do1(class)? 幾多(class)?,,https://youtu.be/6czCuHYHDrE,,8,FALSE,`
};

// ── AI Chat config: 填返你自己嘅 backend 網址同 Google Client ID ──
const AI_CONFIG = {
  BACKEND_URL: 'https://cantonese-backend-eo4p.onrender.com',
  GOOGLE_CLIENT_ID: '220650090056-l25iob9csvlbve46stpjtdbe68m0faj5.apps.googleusercontent.com',
};

// ── Google Sheets URLs (primary source) ──────────────────────

const SHEET_URLS = {
  vocab:      'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNbMKKRPjdRLCIJlgK9SZvNu2pbqUzaMCR2RuxDHQ1LWKXw6jjeBYjH6_wPKI7S2TtiEg00cqcSM7d/pub?gid=0&single=true&output=csv',
  dialogue:   'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNbMKKRPjdRLCIJlgK9SZvNu2pbqUzaMCR2RuxDHQ1LWKXw6jjeBYjH6_wPKI7S2TtiEg00cqcSM7d/pub?gid=950167970&single=true&output=csv',
  classifier: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNbMKKRPjdRLCIJlgK9SZvNu2pbqUzaMCR2RuxDHQ1LWKXw6jjeBYjH6_wPKI7S2TtiEg00cqcSM7d/pub?gid=232509116&single=true&output=csv',
  sentence:   'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNbMKKRPjdRLCIJlgK9SZvNu2pbqUzaMCR2RuxDHQ1LWKXw6jjeBYjH6_wPKI7S2TtiEg00cqcSM7d/pub?gid=1005757231&single=true&output=csv',
  lessons:    'https://docs.google.com/spreadsheets/d/e/2PACX-1vRNbMKKRPjdRLCIJlgK9SZvNu2pbqUzaMCR2RuxDHQ1LWKXw6jjeBYjH6_wPKI7S2TtiEg00cqcSM7d/pub?gid=1206393447&single=true&output=csv',
};


function setLoadMsg(msg) {
  const el = $('loadingScreen');
  if (el) el.innerHTML = '<div class="spinner"></div><div style="margin-top:12px;font-size:14px">' + msg + '</div>';
}


// ── STATE ─────────────────────────────────────────────────────
function loadData() {
  // STEP 1: Load inline data immediately so app is usable right away
  S.data.vocab      = parseCSV(INLINE.vocab);
  S.data.dialogue   = parseCSV(INLINE.dialogue);
  S.data.classifier = parseCSV(INLINE.classifier);
  S.data.sentence   = parseCSV(INLINE.sentence);
  S.data.lessons    = parseCSV(INLINE.lessons);
  S.sourceStatus = { vocab:'fallback', dialogue:'fallback', classifier:'fallback', sentence:'fallback', lessons:'fallback' };

  S.data.vocab.forEach(w => {
    if (w.tone && w.tone.includes('/')) w.tone = w.tone.split('/').pop().trim();
  });

  normalizeSheetData();

  // Hide loading, launch app immediately
  $('loadingScreen').style.display = 'none';
  initAll();

  // STEP 2: Try to refresh from Google Sheets in background (non-blocking)
  refreshFromSheets();
}

window.manualRefreshSheets = function(){
  renderSyncStatus(true);
  refreshFromSheets();
};

function renderSyncStatus(loading){
  const el = $('syncStatus');
  if (!el) return;
  const allLive = Object.values(S.sourceStatus).every(v => v === 'live');
  const failedList = Object.entries(S.sourceStatus).filter(([k,v]) => v === 'fallback').map(([k]) => k);
  el.style.display = 'flex';
  if (loading) {
    el.className = 'sync-status ok';
    el.innerHTML = '<span>🔄 讀緊 Google Sheet 最新資料…</span>';
  } else if (allLive) {
    el.className = 'sync-status ok';
    el.innerHTML = '<span>✅ 資料已連接 Google Sheet（即時）</span><span class="refresh-hint">撳一下重新整理</span>';
  } else {
    el.className = 'sync-status fail';
    el.innerHTML = '<span>⚠️ 讀取唔到：'+failedList.join('、')+'（用緊備用資料，可能過時）</span><span class="refresh-hint">撳一下重試</span>';
  }
}

async function refreshFromSheets() {
  renderSyncStatus(true);
  try {
    const results = await Promise.allSettled([
      tryFetchSheet('vocab',      SHEET_URLS.vocab),
      tryFetchSheet('dialogue',   SHEET_URLS.dialogue),
      tryFetchSheet('classifier', SHEET_URLS.classifier),
      tryFetchSheet('sentence',   SHEET_URLS.sentence),
      tryFetchSheet('lessons',    SHEET_URLS.lessons),
    ]);
    const [v,d,c,s,l] = results.map(r => r.status === 'fulfilled' ? r.value : null);
    let updated = false;
    if (v) { S.data.vocab      = v; updated = true; S.sourceStatus.vocab = 'live'; } else { S.sourceStatus.vocab = 'fallback'; }
    if (d) { S.data.dialogue   = d; updated = true; S.sourceStatus.dialogue = 'live'; } else { S.sourceStatus.dialogue = 'fallback'; }
    if (c) { S.data.classifier = c; updated = true; S.sourceStatus.classifier = 'live'; } else { S.sourceStatus.classifier = 'fallback'; }
    if (s) { S.data.sentence   = s; updated = true; S.sourceStatus.sentence = 'live'; } else { S.sourceStatus.sentence = 'fallback'; }
    if (l) { S.data.lessons    = l; updated = true; S.sourceStatus.lessons = 'live'; } else { S.sourceStatus.lessons = 'fallback'; }
    renderSyncStatus(false);
    if (updated) {
      S.data.vocab.forEach(w => {
        if (w.tone && w.tone.includes('/')) w.tone = w.tone.split('/').pop().trim();
      });
      normalizeSheetData();
      console.log('[Sheets] Background refresh done — data updated');
      // Silently re-render current tab
      if (v)                      { buildVocab(); }
      if (S.tab === 'dialogue')   { renderDlTitles(); }
      if (S.tab === 'sentence')   { buildSentence(); }
      if (l || v)                 { buildLessons(); }
    }
  } catch(e) {
    console.warn('[Sheets] Background refresh failed:', e.message);
    renderSyncStatus(false);
  }
}


// ── CSV PARSER ─────────────────────────────────────────────────
function initAll() {
  try {
    buildHome();
    buildVocab();
    buildSentence();
    buildDialogue();
    buildGame();
    buildLessons();
    setupTabs();
    initAiChat();
    showPage('home');
    if (window.qzResume) window.qzResume();
    Speech.init();
    if (!Speech.supported) $('noSpeechNote').style.display='block';
  } catch(e) {
    console.error('initAll error:', e);
    $('loadingScreen').style.display = 'flex';
    $('loadingScreen').innerHTML = '<div class="error-box">⚠️ 初始化出錯：' + e.message + '<br><button onclick="location.reload()" style="margin-top:8px;padding:7px 16px;background:#0E6B57;color:#fff;border:none;border-radius:8px;cursor:pointer">重新載入</button></div>';
  }
}

// ── TABS ──────────────────────────────────────────────────────
function setupTabs() {
  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{ showTab(btn.dataset.tab); });
  });
  document.querySelectorAll('.g-tab').forEach(btn=>{
    btn.addEventListener('click',()=>{ setGameTab(btn.dataset.game); });
  });
}
function showTab(tab) {
  if (window.qzGuard && !window.qzGuard(tab)) return;
  if (S.tab === 'quiz' && tab !== 'quiz' && window.qzLeave) window.qzLeave();
  if (S.tab === 'time' && tab !== 'time' && window.tmLeave) window.tmLeave();
  if (tab === 'time' && window.tmShow) window.tmShow();
  if (S.tab === 'dir' && tab !== 'dir' && window.dirLeave) window.dirLeave();
  if (tab === 'dir' && window.dirShow) window.dirShow();
  if (S.tab === 'anto' && tab !== 'anto' && window.antoLeave) window.antoLeave();
  if (tab === 'anto' && window.antoShow) window.antoShow();
  if (S.tab === 'classifier' && tab !== 'classifier' && window.clfLeave) window.clfLeave();
  if (tab === 'classifier' && window.clfShow) window.clfShow();
  if (S.tab === 'hobby' && tab !== 'hobby' && window.hbLeave) window.hbLeave();
  if (tab === 'hobby' && window.hbShow) window.hbShow();
  if (S.tab === 'body' && tab !== 'body' && window.bdLeave) window.bdLeave();
  if (tab === 'body' && window.bdShow) window.bdShow();
  if (S.tab === 'family' && tab !== 'family' && window.famLeave) window.famLeave();
  if (tab === 'family' && window.famShow) window.famShow();
  if (S.tab === 'shopping' && tab !== 'shopping' && window.fsLeave) window.fsLeave();
  if (tab === 'shopping' && window.fsShow) window.fsShow();
  if (S.tab === 'weather' && tab !== 'weather' && window.wxLeave) window.wxLeave();
  if (tab === 'weather' && window.wxShow) window.wxShow();
  if (tab === 'game' && (GS.tab === 'time' || GS.tab === 'direction' || GS.tab === 'classifier')) setGameTab(S.gameTab);   // 時間遊戲已搬去「時間」頁，遊戲頁回復自己嘅遊戲
  if (tab === 'quiz' && window.qzShow) window.qzShow();
  if (S.tab === 'soundalike' && tab !== 'soundalike' && window.saLeave) window.saLeave();
  S.tab = tab;
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('act', b.dataset.tab===tab));
  showPage(tab);
  if (tab !== 'dialogue') stopAutoPlay();
  if (tab === 'ai') renderAiUI();
}
function showPage(id) {
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('act'));
  const p = $('page-'+id);
  if (p) p.classList.add('act');
}

// ── HOME ──────────────────────────────────────────────────────
function jyRuby(zh,jp){var q=(jp||'').trim().split(/\s+/).filter(Boolean),k=0,h='';Array.from(zh).forEach(function(c){if(/[\u3400-\u9fff]/.test(c)&&k<q.length)h+='<ruby class="jr">'+c+'<rt data-j="'+q[k++]+'"></rt></ruby>';else h+=c;});return h;}
function buildHome() {
  const modules=[{icon:'🔤',title:'粵拼',jp:'jyut6 ping3',sub:'聲母＋韻母＋聲調 卡牌練習',tab:'jyutping'},{icon:'🃏',title:'音近卡牌',jp:'jam1 gan6 kaat1 paai2',sub:'分清「好似噉」嘅廣東話：圖鑑、聽音辨詞、翻牌配對',tab:'soundalike'},{icon:'📚',title:'詞彙學習卡',jp:'ci4 wui6 hok6 zaap6 kaat1',sub:'翻卡練習基本詞彙',tab:'vocab'},{icon:'📐',title:'句子結構',jp:'geoi3 zi2 git3 kau3',sub:'睇清楚廣東話句式',tab:'sentence'},{icon:'🀄',title:'量詞',jp:'loeng6 ci4',sub:'個・隻・條・張・件・部…＋顏色大細・組合器・句子遊戲・量詞配對',tab:'classifier'},{icon:'🎈',title:'興趣',jp:'hing3 ceoi3',sub:'運動・音樂・藝術手工・煮嘢食・休閒・頻率尺・句式・遊戲',tab:'hobby'},{icon:'🫀',title:'身體',jp:'san1 tai2',sub:'部位・邊度痛・量詞・左右・功能・練習',tab:'body'},{icon:'👨‍👩‍👧‍👦',title:'家庭',jp:'gaa1 ting4',sub:'家譜・結婚生仔・稱呼遊戲・句子',tab:'family'},{icon:'⏰',title:'認識時間',jp:'jan6 sik1 si4 gaan3',sub:'點·鐘·時間分別・一日時段・點鐘・字同搭・近似講法・例句・時長・日期星期・婆婆日程・小測・時間遊戲',tab:'time'},{icon:'🧭',title:'方向',jp:'fong1 hoeng3',sub:'位置・東南西北・入面出面・嚟去・句型・練習・方向遊戲',tab:'dir'},{icon:'↔',title:'相反詞',jp:'soeng1 faan2 ci4',sub:'高矮肥瘦・快慢輕重…・程度詞・練習',tab:'anto'},{icon:'🛒',title:'落街買餸',jp:'lok6 gaai1 maai5 sung3',sub:'街市菜檔・豬肉檔・魚檔・生果舖・雜貨舖・紙幣硬幣・家常菜・練習',tab:'shopping'},{icon:'🌦',title:'天氣',jp:'tin1 hei3',sub:'四季・警告信號（風球／暴雨）・詞彙・對話・練習',tab:'weather'},{icon:'💬',title:'情景對話',jp:'cing4 ging2 deoi3 waa6',sub:'照顧・街市・緊急情況',tab:'dialogue'},{icon:'📖',title:'課堂材料',jp:'fo3 tong4 coi4 liu2',sub:'Chapter・Grammar・Extra',tab:'lessons'},{icon:'📝',title:'測驗',jp:'cak1 jim6',sub:'課堂測驗（一）第1–7課・（二）A／B卷 第8–14課・限時60分鐘',tab:'quiz'},{icon:'🎮',title:'互動遊戲',jp:'wu6 dung6 jau4 hei3',sub:'顏色遊戲（時間、方向、量詞遊戲喺各自分頁入面）',tab:'game'}];
  $('navCards').innerHTML = modules.map(m=>'<div class="nav-card" onclick="showTab(\''+m.tab+'\')"><div class="nav-row"><span class="nav-icon">'+m.icon+'</span><span class="nav-title">'+jyRuby(m.title,m.jp)+'</span></div><div class="nav-sub">'+m.sub+'</div></div>').join('');
}

// ── VOCAB ─────────────────────────────────────────────────────
// 分類排序：Extra → Gram → Ch01…Ch58（按數字）→ Song → 其他
// ── 詞彙／課堂：分類（Chapter／Extra／Song／Grammar → 再分第幾課）──
const VOCAB_TYPE_ORDER=['Chapter','Extra','Song','Grammar'];
function normType(t){
  const x=String(t||'').trim().toLowerCase();
  if(!x)return '';
  if(x==='chapter'||x==='ch')return 'Chapter';
  if(x==='extra')return 'Extra';
  if(x==='song'||x==='songs')return 'Song';
  if(x==='grammar'||x==='gram')return 'Grammar';
  return x.charAt(0).toUpperCase()+x.slice(1);
}
// 由一行資料（詞彙或課堂都用得）攞出 {type, num}
// 新格式：type + chapter 欄；舊格式：category 欄（例如 "Ch01"、"Extra"、"Song"）
function vocabKeyOf(r){
  let type=normType(r.type);
  let num=null;
  const cn=String(r.chapter==null?'':r.chapter).trim();
  if(/^\d+$/.test(cn))num=parseInt(cn,10);
  const cat=String(r.category||'').trim();
  const lid=String(r.lesson_id||'').trim();
  if(!type&&cat){
    const m=/^(extra|gram(?:mar)?|song)/i.exec(cat);
    type=m?normType(m[1]):(/^ch/i.test(cat)?'Chapter':normType(cat));
  }
  if(!type&&lid){
    const m=/^(extra|gram(?:mar)?|song)/i.exec(lid);
    type=m?normType(m[1]):'Chapter';
  }
  if(!type)type='Chapter';
  if(num===null&&cat){const m=/ch\s*0*(\d+)/i.exec(cat);if(m)num=parseInt(m[1],10);}
  if(num===null&&lid){const m=/(\d+)/.exec(lid);if(m)num=parseInt(m[1],10);}
  return {type,num};
}
function normalizeSheetData(){
  // 跳過空白行：只填咗 lesson_id／type／chapter、但 jyutping／char／thai 都空嘅行（會變成空白卡）
  const before=S.data.vocab.length;
  const blankRows=[];
  S.data.vocab=S.data.vocab.filter(w=>{
    const ok=String(w.char||'').trim()||String(w.jyutping||'').trim()||String(w.thai||'').trim();
    if(!ok)blankRows.push((w.type||'')+' '+(w.chapter||w.lesson_id||'?'));
    return !!ok;
  });
  if(blankRows.length)console.warn('[詞彙] 已跳過 '+blankRows.length+' 行空白（'+before+' → '+S.data.vocab.length+'）。涉及：',[...new Set(blankRows)].join(' / '));
  S.data.vocab.forEach(w=>{const k=vocabKeyOf(w);w._type=k.type;w._num=k.num;});
  // 同一個 lesson_id 可以有 Chapter／Extra／Grammar 幾行，所以用 lesson_id+type 做唯一 key（撞咗就加序號）
  const seen={};
  S.data.lessons.forEach(l=>{
    l.title=String(l.title||'').replace(/\s*[\r\n]+\s*/g,' ｜ ');
    let k=(String(l.lesson_id||'x')+'_'+String(l.type||'')).toLowerCase().replace(/[^a-z0-9_]+/g,'_');
    if(seen[k]){seen[k]++;k+='_'+seen[k];}else{seen[k]=1;}
    l._key=k;
  });
}

// ── 詞彙頁：第一行揀類別（Chapter／Extra／Song…），第二行揀第幾課（1–52…）──
function vocabTypes(){
  const set=new Set(S.data.vocab.map(w=>w._type).filter(Boolean));
  const rank=t=>{const i=VOCAB_TYPE_ORDER.indexOf(t);return i<0?99:i;};
  return [...set].sort((a,b)=>rank(a)-rank(b)||a.localeCompare(b));
}
// 呢個類別有邊啲「課」：[{v:1,label:'1',count:n}, …]，冇課號嘅字歸入「其他」
function vocabSubs(type){
  const cnt={};let misc=0;
  S.data.vocab.forEach(w=>{
    if(w._type!==type)return;
    if(w._num===null)misc++;else cnt[w._num]=(cnt[w._num]||0)+1;
  });
  const subs=Object.keys(cnt).map(Number).sort((a,b)=>a-b).map(n=>({v:n,label:String(n),count:cnt[n]}));
  if(subs.length&&misc)subs.push({v:'misc',label:'其他',count:misc});
  return subs;
}
function defaultSub(type){const subs=vocabSubs(type);return subs.length?subs[0].v:'all';}
function filtered(){
  return S.data.vocab.filter(w=>{
    if(w._type!==S.vocabType)return false;
    if(S.vocabSub==='all')return true;
    if(S.vocabSub==='misc')return w._num===null;
    return w._num===S.vocabSub;
  });
}
function renderVocabBars(){
  const bar=$('vocabFilterBar'),sub=$('vocabSubBar');
  bar.innerHTML='';
  vocabTypes().forEach(t=>{
    const btn=h('button','f-btn'+(t===S.vocabType?' act':''),t);
    btn.addEventListener('click',()=>{S.vocabType=t;S.vocabSub=defaultSub(t);S.vocabIdx=0;renderVocabBars();renderVocab();});
    bar.appendChild(btn);
  });
  sub.innerHTML='';
  const subs=vocabSubs(S.vocabType);
  if(!subs.length){sub.style.display='none';return;}
  sub.style.display='flex';
  const mk=(v,label,title)=>{
    const btn=h('button','sub-btn'+(v===S.vocabSub?' act':''),label);
    btn.title=title;
    btn.addEventListener('click',()=>{S.vocabSub=v;S.vocabIdx=0;renderVocabBars();renderVocab();});
    sub.appendChild(btn);
  };
  mk('all','全部',S.vocabType+' 全部');
  subs.forEach(x=>mk(x.v,x.label,(x.v==='misc'?'其他':S.vocabType+' '+x.label)+' · '+x.count+' 個詞'));
}
function buildVocab() {
  const types=vocabTypes();
  if(!types.length)return;
  if(!types.includes(S.vocabType))S.vocabType=types[0];
  const valid=S.vocabSub==='all'||vocabSubs(S.vocabType).some(x=>x.v===S.vocabSub);
  if(!valid)S.vocabSub=defaultSub(S.vocabType);
  renderVocabBars();
  if(!S.vocabBound){
    S.vocabBound=true;
    $('fcPrev').addEventListener('click',()=>{const f=filtered();if(!f.length)return;S.vocabIdx=(S.vocabIdx-1+f.length)%f.length;renderCard();});
    $('fcNext').addEventListener('click',()=>{const f=filtered();if(!f.length)return;S.vocabIdx=(S.vocabIdx+1)%f.length;renderCard();});
    $('fcWrap').addEventListener('click',()=>$('fcWrap').classList.toggle('flip'));
    $('fcSpeakBtn').addEventListener('click',e=>{e.stopPropagation();const w=filtered()[S.vocabIdx];if(w)Speech.speak(w.char);});
  }
  if(S.vocabIdx>=filtered().length)S.vocabIdx=0;
  renderVocab();
}
function renderVocab(){renderCard();renderVocabList();}
function renderCard(){
  if(window.vrReset)window.vrReset();
  const f=filtered(),w=f[S.vocabIdx];
  if(!w){
    $('fcJyut').textContent='';$('fcChar').textContent='—';$('fcThai').textContent='';
    $('fcCharSm').textContent='';$('fcTone').textContent='';$('fcCount').textContent='0 / 0';
    return;
  }
  $('fcWrap').classList.remove('flip');
  $('fcJyut').textContent=w.jyutping;$('fcChar').textContent=w.char;
  { const jl=String(w.jyutping||'').length; $('fcJyut').style.fontSize=jl>28?'18px':jl>14?'22px':''; }  // 好長嘅詞組自動縮細啲，唔會爆出卡牌
  $('fcThai').textContent=w.thai;// english hidden
  $('fcCharSm').textContent=w.char;$('fcTone').textContent='tone: '+w.tone;
  $('fcCount').textContent=(S.vocabIdx+1)+' / '+f.length;
  if(!Speech.supported)$('fcSpeakBtn').style.display='none';
}
function vocabRowHtml(w,i){
  return'<div class="v-row'+(i===S.vocabIdx?' act':'')+'" onclick="selectVocab('+i+')"><div><div class="v-jyut">'+w.jyutping+'</div><div class="v-char">'+w.char+'</div></div><div class="v-right"><div class="v-thai">'+w.thai+'</div></div></div>';
}
function renderVocabList(){
  const list=filtered();
  const unitOf=w=>((w.unit||'').trim());
  if(!list.some(unitOf)){
    $('vocabList').innerHTML=list.map(vocabRowHtml).join('');
    return;
  }
  // unit 欄（如有）就按 unit 分組
  const groups=[],byUnit={};
  list.forEach((w,i)=>{
    const u=unitOf(w)||'';
    if(!byUnit[u]){byUnit[u]={label:u,rows:[]};groups.push(byUnit[u]);}
    byUnit[u].rows.push({w,i});
  });
  $('vocabList').innerHTML=groups.map(g=>'<div class="v-unit-label">'+g.label+'</div>'+g.rows.map(r=>vocabRowHtml(r.w,r.i)).join('')).join('');
}
window.selectVocab=i=>{S.vocabIdx=i;renderVocab();};

// ── SENTENCE STRUCTURE ────────────────────────────────────────
// 將「句式」Sheet 拆成一句一句：同一個 pattern_id 底下可以放好多句。
// 新一句嘅起點 = pattern_id 轉咗，或 example 轉咗，或 part_order 返轉頭（例如 4 → 1）
const SS_GAME_KEY='重組';   // title 有呢個字嘅 pattern 就當係遊戲題庫
function ssSentences(){
  const out=[];
  let cur=null,lastPid=null,lastOrd=0,lastEx=null;
  S.data.sentence.forEach(r=>{
    const pid=String(r.pattern_id||'').trim();
    if(!pid)return;
    const ord=+r.part_order||0;
    const ex=String(r.example||'').trim();
    const isNew=!cur||pid!==lastPid||(ex&&lastEx&&ex!==lastEx)||(ord>0&&lastOrd>0&&ord<=lastOrd);
    if(isNew){cur={pid,all:[]};out.push(cur);lastEx=null;}
    cur.all.push(r);
    lastPid=pid;if(ord>0)lastOrd=ord;if(ex)lastEx=ex;
  });
  return out.map(c=>{
    const pick=k=>{const r=c.all.find(x=>String(x[k]||'').trim());return r?String(r[k]).trim():'';};
    const rows=c.all.filter(r=>String(r.text||'').trim()).sort((x,y)=>(+x.part_order||0)-(+y.part_order||0));
    return {pid:c.pid,title:pick('title'),titleThai:pick('titleThai'),example:pick('example'),jyutping:pick('jyutping'),thai:pick('thai'),rows};
  });
}
function ssIsGame(sen){return String(sen.title||'').indexOf(SS_GAME_KEY)>=0;}

function buildSentence(){
  const sens=ssSentences();
  const learnSens=sens.filter(x=>!ssIsGame(x));   // 「重組句子」題庫唔喺學習模式出現
  const ids=[...new Set(learnSens.map(x=>x.pid))];
  if(!ids.includes(S.ssPatternId))S.ssPatternId=ids[0];
  const mode=$('ssMode');mode.innerHTML='';
  [['learn','📖 學習'],['game','🎮 重組句子'],['challenge','⏱ 重組挑戰']].forEach(([m,label])=>{
    const b=h('button','seg-btn'+(SG.mode===m?' act':''),label);
    b.addEventListener('click',()=>{if(SG.mode===m)return;chStop();CH.view='menu';SG.mode=m;if(m==='game')startSsGame();buildSentence();});
    mode.appendChild(b);
  });
  const learn=SG.mode==='learn';
  $('ssFilterBar').style.display=learn?'':'none';
  $('ssContent').style.display=learn?'':'none';
  $('ssGame').style.display=learn?'none':'';
  if(!learn){
    if(SG.mode==='challenge'){renderChallenge();return;}
    if(!SG.queue.length)startSsGame();
    renderSsGame();return;
  }
  const bar=$('ssFilterBar');bar.innerHTML='';
  ids.forEach(id=>{
    const meta=learnSens.find(x=>x.pid===id);
    const btn=h('button','f-btn'+(id===S.ssPatternId?' act':''),meta.title);
    btn.addEventListener('click',()=>{S.ssPatternId=id;renderSentence();bar.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('act'));btn.classList.add('act');});
    bar.appendChild(btn);
  });
  renderSentence();
}
function renderSentence(){
  const list=ssSentences().filter(x=>x.pid===S.ssPatternId&&!ssIsGame(x));
  if(!list.length){$('ssContent').innerHTML='';return;}
  $('ssContent').innerHTML=list.map(meta=>'<div class="ss-card"><div style="font-size:12px;color:var(--text-sub);font-family:\'Noto Sans Thai\';margin-bottom:8px">'+meta.titleThai+'</div><div class="ss-ex">'+meta.example+'</div><div class="ss-jyut">'+meta.jyutping+'</div><div class="ss-thai">'+meta.thai+'</div></div><div class="ss-tokens" style="margin-bottom:18px">'+meta.rows.map(t=>'<div class="ss-tok" style="border-color:'+t.color+'"><div class="tok-role" style="color:'+t.color+'">'+t.role+'</div><div class="tok-char">'+t.text+'</div><div class="tok-jyut">'+t.jyut+'</div><div class="tok-thai">'+t.roleThai+'</div></div>').join('')+'</div>').join('');
}

//  SENTENCE GAME
const SG={mode:'learn',queue:[],i:0,tokens:[],pool:[],slots:[],tries:0,hint:false,done:false,score:0,marks:null,msg:'',gaveUp:false,finished:false};
const SG_ROUND=5;
function ssGamePool(){
  const all=ssSentences().filter(x=>x.rows.length>=2);
  const g=all.filter(ssIsGame);
  return g.length?g:all;   // 有「重組」題庫就淨係用佢，冇就用晒所有句子
}
function startSsGame(){
  SG.queue=shuffle(ssGamePool()).slice(0,SG_ROUND);
  SG.i=0;SG.score=0;SG.finished=false;
  if(SG.queue.length)ssNewQuestion();
}
function ssNewQuestion(){
  const p=SG.queue[SG.i];
  SG.tokens=p.rows.map((r,k)=>({k,text:String(r.text).trim(),jyut:r.jyut||'',role:r.role||'',roleThai:r.roleThai||'',color:r.color||'#0E6B57'}));
  const correct=SG.tokens.map(t=>t.text).join('|');
  const distinct=new Set(SG.tokens.map(t=>t.text)).size>1;
  let pool=shuffle(SG.tokens.map(t=>t.k));
  for(let n=0;n<12&&distinct&&pool.map(k=>SG.tokens[k].text).join('|')===correct;n++)pool=shuffle(pool);
  SG.pool=pool;
  SG.slots=SG.tokens.map(()=>null);
  SG.tries=0;SG.hint=false;SG.done=false;SG.marks=null;SG.msg='';SG.gaveUp=false;
}
function ssAddScore(n){
  if(!n)return;
  SG.score+=n;
  var prev=S.totalScore;S.totalScore+=n;var chip=$('totalScore');
  animateNumber(chip,prev,S.totalScore,600,'','★ ');
  chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');
}
function ssCardHtml(t,extra,onclick,showRole){
  const role=showRole&&t.role?'<div class="sg-role" style="color:'+t.color+'">'+t.role+(t.roleThai?' · '+t.roleThai:'')+'</div>':'';
  return'<button class="sg-card'+(extra||'')+'" style="'+(showRole?'border-color:'+t.color:'')+'" '+(onclick?'onclick="'+onclick+'"':'disabled')+'>'+role+'<div class="sg-char">'+t.text+'</div>'+(t.jyut?'<div class="sg-jyut">'+t.jyut+'</div>':'')+'</button>';
}
function renderSsGame(){
  const box=$('ssGame');
  if(!SG.queue.length){
    box.innerHTML='<div class="ss-card"><div style="font-size:14px;color:var(--text-sub)">「句式」Sheet 暫時未有可以玩嘅句子。每個 pattern_id 要有最少 2 行 token（part_order、text）。</div></div>';
    return;
  }
  if(SG.finished){
    box.innerHTML='<div class="ss-card" style="text-align:center"><div style="font-size:40px">🎉</div><div class="ss-ex">完成晒！</div><div style="margin:8px 0 14px;color:var(--text-sub)">今次得 <b style="color:var(--accent)">'+SG.score+'</b> 分（'+SG.queue.length+' 題）</div><button class="sg-btn primary" onclick="ssRestart()">再玩一次</button></div>';
    return;
  }
  const p=SG.queue[SG.i];
  const placed=new Set(SG.slots.filter(k=>k!==null));
  const allFilled=SG.slots.every(k=>k!==null);
  const reveal=SG.hint||SG.done;
  const slotsHtml=SG.slots.map((k,idx)=>{
    if(k===null)return'<div class="sg-slot"><span class="sg-n">'+(idx+1)+'</span></div>';
    const t=SG.tokens[k];
    const cls=SG.done?' ok':(SG.marks?(SG.marks[idx]?' ok':' bad'):'');
    return'<div class="sg-slot filled">'+ssCardHtml(t,cls,SG.done?'':'ssTakeBack('+idx+')',reveal)+'</div>';
  }).join('');
  const poolHtml=SG.pool.filter(k=>!placed.has(k)).map(k=>ssCardHtml(SG.tokens[k],'','ssPlace('+k+')',SG.hint)).join('');
  let actions='';
  if(SG.done){
    actions='<button class="sg-btn primary" onclick="ssNext()">'+(SG.i+1>=SG.queue.length?'睇成績 ➜':'下一題 ➜')+'</button>';
  }else{
    actions='<button class="sg-btn primary" '+(allFilled?'':'disabled')+' onclick="ssCheck()">檢查答案</button><button class="sg-btn" onclick="ssReset()">🔄 重來</button>'+(SG.tries>=2?'<button class="sg-btn" onclick="ssGiveUp()">👀 睇答案</button>':'');
  }
  const feedback=SG.msg?'<div class="sg-msg '+(SG.done&&!SG.gaveUp?'good':(SG.done?'':'bad'))+'">'+SG.msg+'</div>':'';
  const fullText=SG.tokens.map(t=>t.text).join('');
  const doneCard=SG.done?'<div class="ss-card" style="margin-top:12px"><div class="ss-ex">'+fullText+'</div><div class="ss-jyut">'+(p.jyutping||'')+'</div><div class="ss-thai">'+(p.thai||'')+'</div></div>':'';
  box.innerHTML='<div class="g-hdr"><span class="score-pill">★ '+SG.score+'</span><span class="round-pill">'+(SG.i+1)+' / '+SG.queue.length+'</span></div>'
    +'<div class="ss-card"><div style="font-size:12px;color:var(--text-sub);margin-bottom:6px">將卡牌排成正確嘅句子 👇</div>'
    +(p.thai?'<div class="sg-q" style="font-family:\'Noto Sans Thai\'">'+p.thai+'</div>':'<div class="sg-q">請排出正確嘅句子</div>')
    +'<div class="sg-tools">'+(Speech.supported?'<button class="sg-mini" onclick="ssSpeak()">🔊 聽句子</button>':'')+'<button class="sg-mini'+(SG.hint?' on':'')+'" onclick="ssHint()">💡 顯示詞性</button></div></div>'
    +'<div class="sg-slots">'+slotsHtml+'</div>'
    +(SG.done?'':'<div class="sg-pool">'+poolHtml+'</div>')
    +feedback+'<div class="sg-actions">'+actions+'</div>'+doneCard;
}
window.ssPlace=k=>{if(SG.done)return;const i=SG.slots.indexOf(null);if(i<0)return;SG.slots[i]=k;SG.marks=null;SG.msg='';renderSsGame();};
window.ssTakeBack=i=>{if(SG.done)return;SG.slots[i]=null;SG.marks=null;SG.msg='';renderSsGame();};
window.ssReset=()=>{SG.slots=SG.tokens.map(()=>null);SG.marks=null;SG.msg='';renderSsGame();};
window.ssHint=()=>{SG.hint=!SG.hint;renderSsGame();};
window.ssSpeak=()=>{Speech.speak(SG.tokens.map(t=>t.text).join(''));};
window.ssCheck=()=>{
  const marks=SG.slots.map((k,i)=>SG.tokens[k].text===SG.tokens[i].text);
  if(marks.every(Boolean)){
    const pts=SG.tries===0?10:SG.tries===1?5:2;
    ssAddScore(pts);
    SG.done=true;SG.marks=null;SG.msg='✅ 啱！+'+pts+' 分';
  }else{
    SG.tries++;SG.marks=marks;SG.msg='❌ 有'+marks.filter(x=>!x).length+'個位未啱（紅色嗰啲），撳紅色卡牌拎走再試下';
  }
  renderSsGame();
};
window.ssGiveUp=()=>{
  SG.slots=SG.tokens.map(t=>t.k);
  SG.done=true;SG.gaveUp=true;SG.marks=null;SG.msg='正確答案如下，下次加油 💪';
  renderSsGame();
};
window.ssNext=()=>{
  if(SG.i+1>=SG.queue.length){SG.finished=true;}else{SG.i++;ssNewQuestion();}
  renderSsGame();
};
window.ssRestart=()=>{startSsGame();renderSsGame();};

// ── SENTENCE CHALLENGE（重組挑戰）─────────────────────────────
// 3 組 × 10 題，每題 2 分（滿分 20），限時；可以不斷重做（每次題目次序同卡牌次序都會重新洗牌）。
// 題庫直接寫喺呢度：p = [[詞, 粵拼], ...]（正確次序）；th = 泰文意思；alt = 其他同樣正確嘅排法（可選）。
// 想改時限：改每組嘅 sec（秒）。計時只會喺「作答中」行，睇答案時會暫停。
const CH_PTS=2;
const CH_SETS=[
 {id:'a',icon:'🌱',name:'第一組・基本句',jp:'dai6 jat1 zou2 · gei1 bun2 geoi3',sec:300,items:[
  {p:[['媽媽','maa1 maa1'],['帶','daai3'],['仔仔','zai2 zai2'],['出街','ceot1 gaai1']],th:'แม่พาลูกไปเที่ยวข้างนอก'},
  {p:[['我','ngo5'],['今日','gam1 jat6'],['去','heoi3'],['學校','hok6 haau6']],th:'วันนี้ฉันไปโรงเรียน',alt:['今日我去學校']},
  {p:[['爸爸','baa4 baa1'],['喺','hai2'],['屋企','uk1 kei2'],['睇','tai2'],['報紙','bou3 zi2']],th:'พ่ออ่านหนังสือพิมพ์อยู่ที่บ้าน'},
  {p:[['家姐','gaa1 ze1'],['飲','jam2'],['咗','zo2'],['一杯','jat1 bui1'],['水','seoi2']],th:'พี่สาวดื่มน้ำไปหนึ่งแก้ว'},
  {p:[['弟弟','dai6 dai2'],['買','maai5'],['咗','zo2'],['三個','saam1 go3'],['麵包','min6 baau1']],th:'น้องชายซื้อขนมปังไปสามชิ้น'},
  {p:[['婆婆','po4 po2'],['喺','hai2'],['公園','gung1 jyun2'],['散步','saan3 bou6']],th:'คุณยายเดินเล่นอยู่ที่สวนสาธารณะ'},
  {p:[['我','ngo5'],['想','soeng2'],['食','sik6'],['炒飯','caau2 faan6']],th:'ฉันอยากกินข้าวผัด'},
  {p:[['老師','lou5 si1'],['教','gaau3'],['我哋','ngo5 dei6'],['廣東話','gwong2 dung1 waa2']],th:'ครูสอนภาษากวางตุ้งให้พวกเรา'},
  {p:[['佢','keoi5'],['每日','mui5 jat6'],['坐','co5'],['巴士','baa1 si2'],['返工','faan1 gung1']],th:'เขานั่งรถบัสไปทำงานทุกวัน',alt:['每日佢坐巴士返工']},
  {p:[['小朋友','siu2 pang4 jau5'],['喺','hai2'],['課室','fo3 sat1'],['做功課','zou6 gung1 fo3']],th:'เด็ก ๆ ทำการบ้านอยู่ในห้องเรียน'}
 ]},
 {id:'b',icon:'🌿',name:'第二組・日常句',jp:'dai6 ji6 zou2 · jat6 soeng4 geoi3',sec:360,items:[
  {p:[['我','ngo5'],['琴日','kam4 jat6'],['喺','hai2'],['屋企','uk1 kei2'],['休息','jau1 sik1']],th:'เมื่อวานฉันพักผ่อนอยู่ที่บ้าน',alt:['琴日我喺屋企休息']},
  {p:[['佢','keoi5'],['今日','gam1 jat6'],['冇','mou5'],['返','faan1'],['學校','hok6 haau6']],th:'วันนี้เขาไม่ได้ไปโรงเรียน',alt:['今日佢冇返學校']},
  {p:[['你','nei5'],['星期日','sing1 kei4 jat6'],['去唔去','heoi3 m4 heoi3'],['行山','haang4 saan1'],['呀','aa3']],th:'วันอาทิตย์คุณจะไปเดินเขาไหม',alt:['星期日你去唔去行山呀']},
  {p:[['呢本','ni1 bun2'],['書','syu1'],['幾多','gei2 do1'],['錢','cin2'],['呀','aa3']],th:'หนังสือเล่มนี้ราคาเท่าไร'},
  {p:[['我哋','ngo5 dei6'],['晏晝','aan3 zau3'],['喺','hai2'],['茶餐廳','caa4 caan1 teng1'],['食飯','sik6 faan6']],th:'พวกเรากินข้าวเที่ยงที่ร้านชาจั๊นเทง',alt:['晏晝我哋喺茶餐廳食飯']},
  {p:[['阿媽','aa3 maa1'],['喺','hai2'],['街市','gaai1 si5'],['買','maai5'],['咗','zo2'],['啲菜','di1 coi3']],th:'แม่ซื้อผักที่ตลาดสด'},
  {p:[['佢','keoi5'],['唔','m4'],['鍾意','zung1 ji3'],['食','sik6'],['辣嘅','laat6 ge3'],['嘢','je5']],th:'เขาไม่ชอบกินของเผ็ด'},
  {p:[['請問','cing2 man6'],['洗手間','sai2 sau2 gaan1'],['喺','hai2'],['邊度','bin1 dou6'],['呀','aa3']],th:'ขอถามหน่อย ห้องน้ำอยู่ที่ไหน'},
  {p:[['我','ngo5'],['想','soeng2'],['買','maai5'],['一部','jat1 bou6'],['新手機','san1 sau2 gei1']],th:'ฉันอยากซื้อโทรศัพท์มือถือเครื่องใหม่'},
  {p:[['阿明','aa3 ming4'],['比','bei2'],['我','ngo5'],['高','gou1'],['好多','hou2 do1']],th:'อาหมิงสูงกว่าฉันมาก'}
 ]},
 {id:'c',icon:'🌳',name:'第三組・進階句',jp:'dai6 saam1 zou2 · zeon3 gaai1 geoi3',sec:420,items:[
  {p:[['我','ngo5'],['同','tung4'],['朋友','pang4 jau5'],['一齊','jat1 cai4'],['去','heoi3'],['食飯','sik6 faan6']],th:'ฉันไปกินข้าวกับเพื่อน'},
  {p:[['佢','keoi5'],['而家','ji4 gaa1'],['喺','hai2'],['廚房','cyu4 fong2'],['煮','zyu2'],['緊','gan2'],['飯','faan6']],th:'ตอนนี้เขากำลังหุงข้าวอยู่ในครัว',alt:['而家佢喺廚房煮緊飯']},
  {p:[['老師','lou5 si1'],['畀','bei2'],['咗','zo2'],['一本','jat1 bun2'],['書','syu1'],['我','ngo5']],th:'ครูให้หนังสือฉันหนึ่งเล่ม',alt:['老師畀咗我一本書']},
  {p:[['因為','jan1 wai6'],['落雨','lok6 jyu5'],['所以','so2 ji5'],['我哋','ngo5 dei6'],['唔','m4'],['出街','ceot1 gaai1']],th:'เพราะฝนตก พวกเราจึงไม่ออกไปข้างนอก'},
  {p:[['我','ngo5'],['食完','sik6 jyun4'],['飯','faan6'],['之後','zi1 hau6'],['去','heoi3'],['洗碗','sai2 wun2']],th:'หลังกินข้าวเสร็จฉันไปล้างจาน'},
  {p:[['我','ngo5'],['阿爺','aa3 je4'],['行','haang4'],['得','dak1'],['好','hou2'],['慢','maan6']],th:'คุณปู่ของฉันเดินช้ามาก'},
  {p:[['呢度','ni1 dou6'],['有','jau5'],['好多','hou2 do1'],['人','jan4'],['喺度','hai2 dou6'],['排隊','paai4 deoi2']],th:'ที่นี่มีคนมากมายกำลังต่อคิวอยู่'},
  {p:[['如果','jyu4 gwo2'],['聽日','ting1 jat6'],['唔','m4'],['落雨','lok6 jyu5'],['我','ngo5'],['就','zau6'],['去','heoi3'],['行山','haang4 saan1']],th:'ถ้าพรุ่งนี้ฝนไม่ตก ฉันก็จะไปเดินเขา'},
  {p:[['我','ngo5'],['從來','cung4 loi4'],['都','dou1'],['冇','mou5'],['食過','sik6 gwo3'],['榴槤','lau4 lin4']],th:'ฉันไม่เคยกินทุเรียนมาก่อนเลย'},
  {p:[['呢個','ni1 go3'],['問題','man6 tai4'],['比','bei2'],['嗰個','go2 go3'],['難','naan4'],['好多','hou2 do1']],th:'ปัญหานี้ยากกว่าข้อนั้นมาก'}
 ]}
];
const CH={view:'menu',set:0,q:[],i:0,tokens:[],pool:[],slots:[],checked:false,ok:false,score:0,total:0,left:0,used:0,results:[],timer:null,jyut:true,timeout:false,newBest:false,prevBest:null};
function chLoadBest(id){try{return JSON.parse(localStorage.getItem('ch_best_'+id)||'null');}catch(e){return null;}}
function chSaveBest(id,v){try{localStorage.setItem('ch_best_'+id,JSON.stringify(v));}catch(e){}}
function chStop(){if(CH.timer){clearInterval(CH.timer);CH.timer=null;}}
function chFmt(s){s=Math.max(0,Math.round(s));return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
function chFull(it){return it.p.map(x=>x[0]).join('');}
function chFullJyut(it){return it.p.map(x=>x[1]).join(' ');}
function chAccept(it){return [chFull(it)].concat(it.alt||[]);}
function chAddTotal(n){
  const prev=S.totalScore;S.totalScore+=n;const chip=$('totalScore');
  if(chip){animateNumber(chip,prev,S.totalScore,600,'','★ ');chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');}
}
window.chStart=function(idx){
  const set=CH_SETS[idx];
  chStop();
  CH.set=idx;CH.q=shuffle(set.items.slice());CH.i=0;CH.score=0;CH.results=[];
  CH.total=set.sec;CH.left=set.sec;CH.used=0;CH.timeout=false;CH.newBest=false;CH.view='run';
  chNewQ();
  CH.timer=setInterval(chTick,1000);
  renderChallenge();
};
function chNewQ(){
  const it=CH.q[CH.i];
  CH.tokens=it.p.map((x,k)=>({k,text:x[0],jyut:x[1]}));
  const correct=chFull(it);
  let pool=shuffle(CH.tokens.map(t=>t.k));
  for(let n=0;n<12&&pool.map(k=>CH.tokens[k].text).join('')===correct;n++)pool=shuffle(pool);
  CH.pool=pool;CH.slots=CH.tokens.map(()=>null);CH.checked=false;CH.ok=false;
}
function chTick(){
  // 離開句式分頁／睇答案時暫停
  if(CH.view!=='run'||CH.checked||SG.mode!=='challenge'||S.tab!=='sentence')return;
  CH.left--;
  const el=$('chTime');
  if(el){el.textContent='⏱ '+chFmt(CH.left);el.classList.toggle('warn',CH.left<=30);}
  if(CH.left<=0)chTimeUp();
}
function chTimeUp(){
  for(let j=CH.i;j<CH.q.length;j++)CH.results.push({it:CH.q[j],ans:null,ok:false});
  chFinish(true);
}
function chFinish(timeout){
  chStop();
  CH.timeout=timeout;CH.used=CH.total-Math.max(0,CH.left);CH.view='result';
  const id=CH_SETS[CH.set].id,rec={score:CH.score,time:CH.used},best=chLoadBest(id);
  CH.prevBest=best;
  CH.newBest=CH.score>0&&(!best||rec.score>best.score||(rec.score===best.score&&rec.time<best.time));
  if(CH.newBest)chSaveBest(id,rec);
  renderChallenge();
}
function chCardHtml(t,extra,onclick){
  return'<button class="sg-card'+(extra||'')+'" '+(onclick?'onclick="'+onclick+'"':'disabled')+'><div class="sg-char">'+t.text+'</div>'+(t.jyut?'<div class="sg-jyut">'+t.jyut+'</div>':'')+'</button>';
}
function renderChallenge(){
  const box=$('ssGame');if(!box)return;
  if(CH.view==='run'){renderChRun(box);return;}
  if(CH.view==='result'){renderChResult(box);return;}
  const max=CH_PTS*10;
  box.innerHTML='<div class="ss-card"><div class="ss-ex">⏱ 重組挑戰</div><div class="ss-jyut">cung4 zou2 teng4 zin3</div>'
    +'<div class="ch-intro">3 組練習，每組 10 題，每題 '+CH_PTS+' 分，滿分 '+max+' 分。要喺限時入面將卡牌排成正確句子，做錯唔扣分。可以重覆挑戰，每次題目次序都唔同，目標係刷新自己嘅最佳成績！</div>'
    +'<div class="ch-intro th-t" style="font-family:\'Noto Sans Thai\'">3 ชุด ชุดละ 10 ข้อ ข้อละ '+CH_PTS+' คะแนน (เต็ม '+max+') เรียงการ์ดให้เป็นประโยคที่ถูกต้องภายในเวลาที่กำหนด ทำซ้ำได้ไม่จำกัด</div></div>'
    +CH_SETS.map((s,i)=>{
      const b=chLoadBest(s.id);
      return'<button class="ch-set" onclick="chStart('+i+')"><span class="ch-set-ic">'+s.icon+'</span><span class="ch-set-main"><div class="ch-set-name">'+s.name+'</div><div class="ch-set-jp">'+s.jp+'</div><div class="ch-set-meta">'+s.items.length+' 題 · 限時 '+chFmt(s.sec)+'</div></span><span class="ch-set-best">'+(b?'🏅 '+b.score+' / '+max+'<br><span style="font-weight:400">'+chFmt(b.time)+'</span>':'未挑戰')+'</span></button>';
    }).join('');
}
function renderChRun(box){
  const it=CH.q[CH.i],n=CH.q.length;
  const placed=new Set(CH.slots.filter(k=>k!==null));
  const allFilled=CH.slots.every(k=>k!==null);
  const slotsHtml=CH.slots.map((k,idx)=>{
    if(k===null)return'<div class="sg-slot"><span class="sg-n">'+(idx+1)+'</span></div>';
    const cls=CH.checked?(CH.ok?' ok':' bad'):'';
    return'<div class="sg-slot filled">'+chCardHtml(CH.tokens[k],cls,CH.checked?'':'chTakeBack('+idx+')')+'</div>';
  }).join('');
  const poolHtml=CH.pool.filter(k=>!placed.has(k)).map(k=>chCardHtml(CH.tokens[k],'','chPlace('+k+')')).join('');
  let actions,fb='';
  if(CH.checked){
    const last=CH.i+1>=n;
    actions='<button class="sg-btn primary" onclick="chNext()">'+(last?'睇成績 ➜':'下一題 ➜')+'</button>';
    fb='<div class="ch-fb '+(CH.ok?'ok':'bad')+'"><div class="ch-fb-t">'+(CH.ok?'✅ 啱！+'+CH_PTS+' 分':'❌ 唔啱，正確答案係：')+'</div>'
      +'<div class="ss-ex">'+chFull(it)+'</div><div class="ss-jyut">'+chFullJyut(it)+'</div><div class="ss-thai">'+it.th+'</div>'
      +(Speech.supported?'<div class="sg-tools" style="margin-top:8px"><button class="sg-mini" onclick="chSpeak()">🔊 聽句子</button></div>':'')+'</div>';
  }else{
    actions='<button class="sg-btn primary" '+(allFilled?'':'disabled')+' onclick="chCheck()">確認答案</button><button class="sg-btn" onclick="chReset()">🔄 重來</button>';
  }
  box.innerHTML='<div class="'+(CH.jyut?'':'ch-nojyut')+'">'
    +'<div class="ch-hdr"><span class="score-pill">★ '+CH.score+'</span><span class="round-pill">'+(CH.i+1)+' / '+n+'</span><span class="ch-time'+(CH.left<=30?' warn':'')+'" id="chTime">⏱ '+chFmt(CH.left)+'</span></div>'
    +'<div class="ch-bar"><i style="width:'+Math.round((CH.i+(CH.checked?1:0))/n*100)+'%"></i></div>'
    +'<div class="ss-card"><div style="font-size:12px;color:var(--text-sub);margin-bottom:6px">'+CH_SETS[CH.set].name+' · 將卡牌排成正確嘅句子 👇</div>'
    +'<div class="sg-q" style="font-family:\'Noto Sans Thai\'">'+it.th+'</div>'
    +'<div class="sg-tools"><button class="sg-mini'+(CH.jyut?' on':'')+'" onclick="chToggleJyut()">粵拼 '+(CH.jyut?'開':'關')+'</button><button class="sg-mini" onclick="chQuit()">✖ 退出</button></div></div>'
    +'<div class="sg-slots">'+slotsHtml+'</div>'
    +(CH.checked?'':'<div class="sg-pool">'+poolHtml+'</div>')
    +fb+'<div class="sg-actions">'+actions+'</div></div>';
}
function renderChResult(box){
  const max=CH_PTS*10,s=CH_SETS[CH.set],pct=CH.score/max;
  const emo=pct>=.9?'🏆':pct>=.7?'🎉':pct>=.5?'👍':'💪';
  const msg=pct>=.9?'好叻呀！':pct>=.7?'做得好！':pct>=.5?'唔錯，再練多次！':'加油，再嚟一次！';
  const rows=CH.results.map(r=>{
    const mine=r.ans===null?'⌛ 時間到，未做':(r.ok?'':'你嘅答案：'+r.ans);
    return'<div class="ch-row"><div class="ch-row-m">'+(r.ok?'✅':'❌')+'</div><div class="ch-row-b"><div class="ch-row-z">'+chFull(r.it)+'</div><div class="ss-jyut">'+chFullJyut(r.it)+'</div><div class="ss-thai">'+r.it.th+'</div>'+(mine?'<div class="ch-row-mine">'+mine+'</div>':'')+'</div></div>';
  }).join('');
  const bestNow=chLoadBest(s.id);
  box.innerHTML='<div class="ss-card" style="text-align:center"><div class="ch-big">'+emo+'</div><div class="ss-ex">'+(CH.timeout?'⏰ 時間到！':msg)+'</div>'
    +'<div class="ch-score">'+CH.score+'<small> / '+max+'</small></div>'
    +'<div class="ch-stats"><span>答啱 '+CH.results.filter(r=>r.ok).length+' / '+CH.q.length+' 題</span><span>⏱ 用時 '+chFmt(CH.used)+'</span>'+(bestNow?'<span>🏅 最佳 '+bestNow.score+' 分 · '+chFmt(bestNow.time)+'</span>':'')+'</div>'
    +(CH.newBest?'<div class="ch-new">🎊 新紀錄！</div>':'')
    +'<div class="sg-actions"><button class="sg-btn primary" onclick="chStart('+CH.set+')">🔁 再做一次</button><button class="sg-btn" onclick="chMenu()">揀其他組</button></div></div>'
    +'<div class="ss-card"><div style="font-size:13px;font-weight:700;margin-bottom:6px">📋 逐題檢討</div>'+rows+'</div>';
}
window.chPlace=k=>{if(CH.checked)return;const i=CH.slots.indexOf(null);if(i<0)return;CH.slots[i]=k;renderChallenge();};
window.chTakeBack=i=>{if(CH.checked)return;CH.slots[i]=null;renderChallenge();};
window.chReset=()=>{if(CH.checked)return;CH.slots=CH.tokens.map(()=>null);renderChallenge();};
window.chToggleJyut=()=>{CH.jyut=!CH.jyut;renderChallenge();};
window.chSpeak=()=>{Speech.speak(chFull(CH.q[CH.i]));};
window.chCheck=()=>{
  if(CH.checked||CH.slots.some(k=>k===null))return;
  const it=CH.q[CH.i];
  const ans=CH.slots.map(k=>CH.tokens[k].text).join('');
  const ok=chAccept(it).indexOf(ans)>=0;
  CH.checked=true;CH.ok=ok;
  if(ok){CH.score+=CH_PTS;chAddTotal(CH_PTS);}
  CH.results.push({it,ans,ok});
  renderChallenge();
};
window.chNext=()=>{
  if(!CH.checked)return;
  if(CH.i+1>=CH.q.length){chFinish(false);return;}
  CH.i++;chNewQ();renderChallenge();
};
window.chQuit=()=>{
  if(!confirm('退出會失去今次成績，確定？'))return;
  chStop();CH.view='menu';renderChallenge();
};
window.chMenu=()=>{chStop();CH.view='menu';renderChallenge();};

// ── CLASSIFIER ────────────────────────────────────────────────
// 量詞頁已換成「量詞進階版」（Shadow DOM 模組，喺檔尾）；舊 Sheet 量詞資料（S.data.classifier）繼續供「量詞配對」遊戲用。

// ── DIALOGUE ─────────────────────────────────────────────────
function buildDialogue(){
  const cats=['all',...new Set(S.data.dialogue.map(r=>r.category))];
  const catLabel={all:'全部',original:'📚 基礎',care:'👵 照顧',emergency:'🚨 緊急',market:'🥬 街市'};
  const catBar=$('dlCatBar');
  cats.forEach(c=>{
    const btn=h('button','f-btn'+(c==='all'?' act':''),catLabel[c]||c);
    btn.addEventListener('click',()=>{S.dlCat=c;S.dlId=null;renderDlTitles();catBar.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('act'));btn.classList.add('act');});
    catBar.appendChild(btn);
  });
  $('togJyut').addEventListener('click',()=>{S.showJyut=!S.showJyut;$('togJyut').classList.toggle('on',S.showJyut);renderDlLines();});
  $('togThai').addEventListener('click',()=>{S.showThai=!S.showThai;$('togThai').classList.toggle('on',S.showThai);renderDlLines();});
  $('playAllBtn').addEventListener('click',()=>{if(S.speech.autoIdx!==null){stopAutoPlay();}else{startAutoPlay();}});
  renderDlTitles();
}
function dlFiltered(){const rows=S.data.dialogue;const ids=[...new Set((S.dlCat==='all'?rows:rows.filter(r=>r.category===S.dlCat)).map(r=>r.dialogue_id))];return ids;}
function renderDlTitles(){
  stopAutoPlay();
  const ids=dlFiltered();
  if(!S.dlId||!ids.includes(S.dlId))S.dlId=ids[0];
  const bar=$('dlTitleBar');bar.innerHTML='';
  const metas={};
  S.data.dialogue.forEach(r=>{if(!metas[r.dialogue_id])metas[r.dialogue_id]={title:r.title,emoji:r.emoji};});
  ids.forEach(id=>{
    const m=metas[id];
    const btn=h('button','f-btn'+(id===S.dlId?' act':''),m.emoji+' '+m.title);
    btn.addEventListener('click',()=>{S.dlId=id;renderDlFull();bar.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('act'));btn.classList.add('act');stopAutoPlay();});
    bar.appendChild(btn);
  });
  renderDlFull();
}
function renderDlFull(){
  const rows=S.data.dialogue.filter(r=>r.dialogue_id===S.dlId).sort((a,b)=>+a.line_order-+b.line_order);
  if(!rows.length)return;
  const meta=rows[0];
  $('dlHeader').innerHTML='<div class="dl-h-title">'+meta.emoji+' '+meta.title+'</div><div class="dl-h-thai">'+meta.titleThai+'</div>';
  renderDlLines();
}
function renderDlLines(){
  const rows=S.data.dialogue.filter(r=>r.dialogue_id===S.dlId).sort((a,b)=>+a.line_order-+b.line_order);
  $('dlLines').innerHTML=rows.map((line,i)=>{
    const isAuto=S.speech.autoIdx!==null;
    const isActive=S.speech.autoIdx===i;
    return '<div class="dl-line'+(isAuto&&!isActive?' dim':'')+'" id="dlLine'+i+'"><div class="dl-spk">'+line.speaker+'</div><div class="dl-bubble'+(isActive?' active':'')+'" id="dlBubble'+i+'">'+(S.showJyut?'<div class="dl-jyut">'+line.jyutping+'</div>':'')+'<div class="dl-canto-row"><div class="dl-canto">'+line.cantonese+'</div>'+(Speech.supported&&!isAuto?'<button class="spk-btn" onclick="speakLine(\''+line.cantonese.replace(/'/g,"\\'")+'\'  ,this)">▶ 聽</button>':'')+'</div>'+(S.showThai?'<div class="dl-thai">'+line.thai+'</div>':'')+'</div></div>';
  }).join('');
}
window.speakLine=(text,btn)=>{
  document.querySelectorAll('.spk-btn').forEach(b=>{b.textContent='▶ 聽';b.classList.remove('playing');});
  btn.textContent='■ 停';btn.classList.add('playing');
  Speech.speak(text,()=>{btn.textContent='▶ 聽';btn.classList.remove('playing');});
};
function startAutoPlay(){
  const rows=S.data.dialogue.filter(r=>r.dialogue_id===S.dlId).sort((a,b)=>+a.line_order-+b.line_order);
  if(!rows.length||!Speech.supported)return;
  $('playAllBtn').textContent='■ 停止';$('playAllBtn').classList.add('playing');
  S.speech.autoIdx=0;playAutoLine(rows);
}
function playAutoLine(rows){
  if(S.speech.autoIdx===null||S.speech.autoIdx>=rows.length){stopAutoPlay();return;}
  renderDlLines();
  Speech.speak(rows[S.speech.autoIdx].cantonese,()=>{
    if(S.speech.autoIdx===null)return;
    S.speech.autoTimer=setTimeout(()=>{if(S.speech.autoIdx!==null){S.speech.autoIdx++;playAutoLine(rows);}},400);
  });
}
function stopAutoPlay(){
  Speech.stop();clearTimeout(S.speech.autoTimer);S.speech.autoIdx=null;
  $('playAllBtn').textContent='▶ 全部播放';$('playAllBtn').classList.remove('playing');
  renderDlLines();
}

// ── GAMES ─────────────────────────────────────────────────────
const GAME_TOTAL=10;
let GS={};
function buildGame(){setGameTab('color');}
function setGameTab(tab){
  S.gameTab=tab;
  document.querySelectorAll('.g-tab').forEach(b=>b.classList.toggle('act',b.dataset.game===tab));
  initGame(tab);
}
function initGame(tab, lv){
  try{clearTimeout(GS.timer);}catch(e){}
  var colorLv = (tab==='color') ? (lv || GS.colorLv || 1) : 1;
  GS={tab,score:0,round:0,done:false,pool:[],pi:0,current:null,options:null,
      clockOpts:null,feedback:null,timer:null,colorLv:colorLv};
  if(tab==='color'){
    if(colorLv===1) GS.pool=buildLv1Pool();
    else GS.pool=shuffle(ALL_COLORS);
  }
  if(tab==='vocab'){GS.vmode=S.vgMode||'listen';GS.pool=shuffle(vgWords());GS.vm=null;}
  if(tab==='direction'){GS.pool=shuffle(DIR_SCENARIOS);GS.gridSel=null;GS.gridSubmitted=false;GS.mapSel=null;GS.mapSubmitted=false;}
  if(tab==='classifier'){
    GS.pool=shuffle(CLF_QUESTIONS);
    GS.clfSortItems=null; GS.clfSortDone=false;
    GS.clfSortAns=[]; GS.clfSortClfs=null;
    GS._clfSortTimer=null;
  }
  renderGame();
}
function nextRound(){
  GS.feedback=null;GS.round++;
  if(GS.round>=GAME_TOTAL){GS.done=true;recordScore();renderGame();return;}
  if(GS.tab==='color'||GS.tab==='direction'||GS.tab==='classifier'||GS.tab==='vocab'){
    GS.pi=(GS.pi+1)%GS.pool.length;
    if(GS.pi===0)GS.pool=shuffle(GS.pool);
  }
  // Reset current for next question
  if(GS.tab==='color'&&(GS.colorLv===2||GS.colorLv===3)) GS.current=null;
  if(GS.tab==='vocab') GS.current=null;
  if(GS.tab==='time'){ GS.current=null; GS.options=null; GS.clockOpts=null; }
  if(GS.tab==='direction'){ GS.current=null; GS.gridSel=null; GS.gridSubmitted=false; GS.mapSel=null; GS.mapSubmitted=false; }
  if(GS.tab==='classifier'){
    GS.current=null; GS.options=null;
    if(CLF_LV!==3){ GS.clfSortItems=null; }
    GS.clfSortDone=false;
  }
  if(GS.tab==='time')GS.current=null;
  renderGame();
}
function recordScore(){
  var prev=S.totalScore;
  S.totalScore+=GS.score;
  var chip=$('totalScore');
  animateNumber(chip,prev,S.totalScore,600,'','★ ');
  chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');
  S.scoreHistory.push({game:GS.tab,score:GS.score,time:new Date().toLocaleTimeString('en-HK',{hour:'2-digit',minute:'2-digit'})});
  renderHistory();
}
function renderHistory(){
  const names={color:'🎨 顏色',time:'⏰ 時間遊戲',tq:'⏰ 時間小測',direction:'🧭 方向遊戲',classifier:'🀄 量詞配對',cd:'🀄 量詞句子遊戲',hb:'🎈 興趣遊戲',bd:'🫀 身體練習',ft:'👨‍👩‍👧‍👦 家庭遊戲',food:'🛒 買餸練習',wx:'🌦 天氣練習',vocab:'🎲 詞彙大雜燴'};
  const recent=S.scoreHistory.slice(-6).reverse();
  if(!recent.length){$('scoreHistory').innerHTML='';return;}
  $('scoreHistory').innerHTML='<div class="sec" style="margin-top:16px">📊 得分紀錄</div>'+recent.map(h=>'<div class="hist-item"><span>'+names[h.game]+'</span><span style="font-family:\'Space Mono\';color:var(--yellow);font-weight:700">'+h.score+'分</span><span style="color:var(--text-muted);font-size:11px">'+h.time+'</span></div>').join('');
}
function answerGame(isCorrect){
  if(GS.feedback)return;
  GS.feedback=isCorrect?'correct':'wrong';
  if(isCorrect)GS.score+=10;
  renderGame();
  clearTimeout(GS.timer);
  GS.timer=setTimeout(()=>{if(!GS.done)nextRound();},1100);
}
function renderFb(isCorrect, okMsg, errMsg){
  return '<div class="fb '+(isCorrect?'ok':'err')+'" style="margin-top:12px">'+(isCorrect?okMsg:errMsg)+'</div>';
}
function gameAreaEl(){return $(GS.tab==='time'?'timeGameArea':GS.tab==='direction'?'dirGameArea':GS.tab==='classifier'?'clfGameArea':'gameArea');}
function renderGame(){
  const a=gameAreaEl();
  if(GS.done){a.innerHTML=renderResult();celebrateResult();return;}
  switch(GS.tab){
    case 'color':a.innerHTML=renderColorGame();break;
    case 'vocab':a.innerHTML=renderVocabGame();break;
    case 'time':renderTimeGame(a);break;
    case 'direction':a.innerHTML=renderDirectionGame();break;
    case 'classifier':a.innerHTML=renderClassifierGame();break;
  }
}
function colorLvBar(){
  return '<div class="level-bar">'
    +'<button class="lv-btn'+(GS.colorLv===1?' act':'')+'" onclick="switchColorLv(1)">Lv 1<span class="lv-badge">睇顏色塊</span></button>'
    +'<button class="lv-btn'+(GS.colorLv===2?' act':'')+'" onclick="switchColorLv(2)">Lv 2<span class="lv-badge">泰文混淆</span></button>'
    +'<button class="lv-btn'+(GS.colorLv===3?' act':'')+'" onclick="switchColorLv(3)">Lv 3<span class="lv-badge">聽音點色</span></button>'
    +'</div>';
}
window.switchColorLv = function(lv){ initGame('color', lv); };

function renderColorGame(){
  const hdr='<div class="g-hdr"><span class="score-pill">★ '+GS.score+'</span><span class="round-pill">'+(GS.round+1)+' / '+GAME_TOTAL+'</span></div>';
  if(GS.colorLv===1) return hdr+colorLvBar()+renderColorLv1();
  if(GS.colorLv===2) return hdr+colorLvBar()+renderColorLv2();
  return hdr+colorLvBar()+renderColorLv3();
}

function colorSwatchHtml(hex,thai){
  var light=['#f1f5f9','#d4b483','#86efac','#93c5fd','#38bdf8','#eab308'].includes(hex);
  var textColor=light?'#374151':'rgba(255,255,255,.85)';
  var border=light?'2px solid #d1d5db':'none';
  return '<div class="color-swatch" style="background:'+hex+';border:'+border+'">'
    +'<span style="font-size:12px;color:'+textColor+';font-family:Noto Sans TC">'+(thai||'')+'</span>'
    +'</div>';
}

// LV1: colour block → pick Cantonese name (basic + some hard)
function renderColorLv1(){
  const c=GS.pool[GS.pi];
  if(!GS.current||GS.current.char!==c.char){
    GS.current=c;
    const others=ALL_COLORS.filter(x=>x.char!==c.char).sort(()=>Math.random()-.5).slice(0,3);
    GS.options=shuffle([...others,c]);
  }
  return '<p class="g-instr">睇顏色，揀正確嘅廣東話！</p>'
    +colorSwatchHtml(GS.current.hex, GS.current.thai)
    +renderOpts(GS.options,'color')
    +(GS.feedback?renderFb(GS.feedback==='correct','✓ ถูกต้อง!','✗ '+GS.current.jyutping+' · '+GS.current.char):'');
}

// LV2: Thai text = TRAP (familiar to Thai students)
// Display colour of the text = CORRECT ANSWER
// e.g. สีส้ม (orange) shown in LIGHT BLUE text → correct = 淺藍色, trap = 橙色
// 4 options: correct (text display colour) + Thai-meaning colour (trap) + 2 other wrong colours
// All options look identical — no labels or hints
function renderColorLv2(){
  if(!GS.current){
    var pool=shuffle(ALL_COLORS);
    var correct=pool[0];          // text DISPLAY colour → this is the correct answer
    var thaiTrap=pool[1];         // Thai text shown → meaning is the TRAP
    var wrong1=pool[2];
    var wrong2=pool[3];
    GS.current={
      correct:correct,            // what the text LOOKS like (display colour)
      thaiTrap:thaiTrap,          // what the text SAYS in Thai (the trap)
    };
    GS.options=shuffle([correct, thaiTrap, wrong1, wrong2]);
  }
  var correct=GS.current.correct;
  var thaiTrap=GS.current.thaiTrap;
  var optsHtml='<div class="opts-grid">'+GS.options.map(function(o,i){
    var isCorrect=o.char===correct.char;
    var cls='opt-btn'+(GS.feedback&&isCorrect?' ok':GS.feedback&&!isCorrect?' dim':'');
    var inner='<span class="opt-j">'+o.jyutping+'</span><span class="opt-c">'+o.char+'</span>';
    var click=!GS.feedback?'onclick="lv2Answer('+i+')"':'';
    return '<button class="'+cls+'" '+click+'>'+inner+'</button>';
  }).join('')+'</div>';
  // Instruction: look at TEXT COLOUR, ignore Thai meaning
  return '<p class="g-instr" style="font-size:12px;text-align:center">'
    +'呢個文字係咩顏色？<br>'
    +'<span style="font-size:11px;color:var(--text-muted)">（泰文意思係陷阱，睇文字顏色！）</span></p>'
    +'<div class="lv2-word" style="color:'+correct.hex+'">'+thaiTrap.thai+'</div>'
    +optsHtml
    +(GS.feedback?renderFb(GS.feedback==='correct',
        '✓ 睇顏色，唔係泰文！',
        '✗ 正確：'+correct.jyutping+' '+correct.char+' — 泰文「'+thaiTrap.thai+'」係陷阱！'):'');
}
window.lv2Answer=function(i){
  if(GS.feedback)return;
  var opt=GS.options[i];
  answerGame(opt.char===GS.current.correct.char);
  GS.current=null;
};

// LV3: 聽音點色 — 聽廣東話顏色名，喺 6 個色塊入面點返啱嗰個
function lv3Say(){ try{ Speech.speak(GS.current.correct.char); }catch(e){} }
window.lv3Say=lv3Say;
function renderColorLv3(){
  if(!GS.current){
    var c=GS.pool[GS.pi];
    var others=shuffle(ALL_COLORS.filter(function(x){return x.hex!==c.hex&&x.char!==c.char;})).slice(0,5);
    GS.current={correct:c,opts:shuffle([c].concat(others))};
    setTimeout(function(){ if(GS.tab==='color'&&GS.colorLv===3&&GS.current&&GS.current.correct===c&&!GS.feedback) lv3Say(); },250);
  }
  var cur=GS.current;
  var light=['#f1f5f9','#d4b483','#86efac','#93c5fd','#38bdf8','#eab308'];
  var grid='<div class="lv3-grid">'+cur.opts.map(function(o,i){
    var isC=o.char===cur.correct.char;
    var cls='lv3-sw'+(light.indexOf(o.hex)>=0?' light':'');
    var mark='';
    if(GS.feedback){
      if(isC){cls+=' ok';mark='✓';}
      else if(GS.lv3Pick===i){cls+=' err';mark='✗';}
      else cls+=' dim';
    }
    return '<button class="'+cls+'" style="background:'+o.hex+'" '+(GS.feedback?'':'onclick="lv3Answer('+i+')"')+' aria-label="swatch">'+mark+'</button>';
  }).join('')+'</div>';
  return '<p class="g-instr">聽聲音，點返啱嗰個顏色！</p>'
    +'<button class="lv3-spk" onclick="lv3Say()">🔊 再聽一次</button>'
    +grid
    +(GS.feedback?renderFb(GS.feedback==='correct','✓ ถูกต้อง! '+cur.correct.jyutping+' '+cur.correct.char,'✗ '+cur.correct.jyutping+' · '+cur.correct.char+' · '+cur.correct.thai):'');
}
window.lv3Answer=function(i){
  if(GS.feedback)return;
  GS.lv3Pick=i;
  answerGame(GS.current.opts[i].char===GS.current.correct.char);
};

// ───────── 🎲 詞彙大雜燴：跨課詞彙遊戲（聽音揀字／睇字揀泰文／配對） ─────────
function vgEsc(t){return String(t==null?'':t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
function vgInScope(w){
  var sc=S.vgScope||'all';
  if(sc==='all')return true;
  var p=sc.split('|'),t=p[0],v=p[1];
  if(w._type!==t)return false;
  if(v==='all')return true;
  if(v==='misc')return w._num===null;
  return w._num===parseInt(v,10);
}
function vgWords(){
  var seenC={};
  return (S.data.vocab||[]).filter(function(w){
    var c=String(w.char||'').trim(),t=String(w.thai||'').trim();
    if(!c||!t||!vgInScope(w))return false;
    if(seenC[c])return false; seenC[c]=1; return true;
  });
}
function vgScopeSelect(){
  var cur=S.vgScope||'all';
  var o='<option value="all"'+(cur==='all'?' selected':'')+'>All lessons</option>';
  vocabTypes().forEach(function(t){
    o+='<option value="'+vgEsc(t)+'|all"'+(cur===t+'|all'?' selected':'')+'>'+vgEsc(t)+' · All</option>';
    vocabSubs(t).forEach(function(sb){
      var val=t+'|'+sb.v;
      o+='<option value="'+vgEsc(val)+'"'+(cur===val?' selected':'')+'>'+vgEsc(t)+' · '+vgEsc(sb.label)+' ('+sb.count+')</option>';
    });
  });
  return '<select class="vg-scope" data-nojy="1" onchange="vgSetScope(this.value)">'+o+'</select>';
}
window.vgSetScope=function(v){S.vgScope=v;initGame('vocab');};
window.vgSetMode=function(m){S.vgMode=m;initGame('vocab');};
function vgModeBar(){
  var m=GS.vmode;
  function b(k,t,sub){return '<button class="lv-btn'+(m===k?' act':'')+'" onclick="vgSetMode(\''+k+'\')">'+t+'<span class="lv-badge">'+sub+'</span></button>';}
  return '<div class="level-bar">'+b('listen','🔊','聽音揀字')+b('thai','🇹🇭','睇字揀泰文')+b('match','🔗','配對')+'</div>';
}
window.vgSay=function(){try{Speech.speak(GS.current.w.char);}catch(e){}};
function renderVocabGame(){
  var hdr='<div class="g-hdr"><span class="score-pill">★ '+GS.score+'</span><span class="round-pill">'+(GS.vmode==='match'?GS.round:GS.round+1)+' / '+GAME_TOTAL+'</span></div>';
  var top=hdr+vgScopeSelect()+vgModeBar();
  var need=GS.vmode==='match'?5:4;
  if(GS.pool.length<need){
    return top+'<div class="vg-empty">呢個範圍嘅詞彙唔夠（最少要 '+need+' 個），揀多啲課啦！</div>';
  }
  if(GS.vmode==='match')return top+renderVgMatch();
  return top+renderVgQuiz();
}
function renderVgQuiz(){
  var w=GS.pool[GS.pi%GS.pool.length];
  if(!GS.current||GS.current.w!==w){
    var others=shuffle(GS.pool.filter(function(x){return x.char!==w.char&&x.thai!==w.thai;})).slice(0,3);
    GS.current={w:w,opts:shuffle([w].concat(others))};
    if(GS.vmode==='listen')setTimeout(function(){if(GS.tab==='vocab'&&GS.vmode==='listen'&&GS.current&&GS.current.w===w&&!GS.feedback)vgSay();},250);
  }
  var cur=GS.current,listen=GS.vmode==='listen';
  var btns='<div class="opts-grid">'+cur.opts.map(function(o,i){
    var isC=o===cur.w;
    var cls='opt-btn'+(GS.feedback&&isC?' ok':GS.feedback&&!isC?' dim':'');
    var inner=listen?'<span class="opt-c" style="font-size:26px">'+vgEsc(o.char)+'</span>':'<span class="vg-th">'+vgEsc(o.thai)+'</span>';
    return '<button class="'+cls+'" '+(GS.feedback?'':'onclick="vgAnswer('+i+')"')+'>'+inner+'</button>';
  }).join('')+'</div>';
  var head=listen
    ?'<p class="g-instr">聽聲音，揀返個啱嘅字！</p><button class="lv3-spk" onclick="vgSay()">🔊 播放</button>'
    :'<p class="g-instr">睇個字，揀返泰文意思！</p><div class="vg-big">'+vgEsc(cur.w.char)+'</div><button class="vg-spk" onclick="vgSay()">🔊</button>';
  var fb=GS.feedback?renderFb(GS.feedback==='correct','✓ ถูกต้อง! '+cur.w.char+' · '+cur.w.thai,'✗ '+cur.w.jyutping+' · '+cur.w.char+' · '+cur.w.thai):'';
  return head+btns+fb;
}
window.vgAnswer=function(i){
  if(GS.feedback)return;
  answerGame(GS.current.opts[i]===GS.current.w);
};
function vgNewBoard(){
  var ws=shuffle(GS.pool).slice(0,5);
  var ord=shuffle([0,1,2,3,4]);
  GS.vm={ws:ws,ord:ord,selL:null,done:{},miss:{},bad:null};
}
function renderVgMatch(){
  if(!GS.vm)vgNewBoard();
  var vm=GS.vm;
  var left=vm.ws.map(function(w,i){
    var cls='vg-card'+(vm.done[i]?' done':'')+(vm.selL===i?' sel':'')+(vm.bad&&vm.bad.l===i?' bad':'');
    return '<button class="'+cls+'" '+(vm.done[i]?'':'onclick="vgPickL('+i+')"')+'>'+vgEsc(w.char)+'</button>';
  }).join('');
  var right=vm.ord.map(function(i){
    var cls='vg-card th'+(vm.done[i]?' done':'')+(vm.bad&&vm.bad.r===i?' bad':'');
    return '<button class="'+cls+'" '+(vm.done[i]?'':'onclick="vgPickR('+i+')"')+'>'+vgEsc(vm.ws[i].thai)+'</button>';
  }).join('');
  return '<p class="g-instr">先點一個字，再點返佢嘅泰文意思！</p><div class="vg-match"><div class="vg-col">'+left+'</div><div class="vg-col">'+right+'</div></div>';
}
window.vgPickL=function(i){
  var vm=GS.vm;if(!vm||vm.done[i]||vm.bad)return;
  vm.selL=i;try{Speech.speak(vm.ws[i].char);}catch(e){}
  renderGame();
};
window.vgPickR=function(r){
  var vm=GS.vm;if(!vm||vm.done[r]||vm.bad)return;
  if(vm.selL===null)return;
  var l=vm.selL;
  if(l===r){
    vm.done[l]=1;vm.selL=null;
    GS.score+=vm.miss[l]?5:10;GS.round++;
    var all=Object.keys(vm.done).length===5;
    if(GS.round>=GAME_TOTAL){GS.done=true;recordScore();renderGame();return;}
    renderGame();
    if(all)GS.timer=setTimeout(function(){if(GS.tab==='vocab'&&!GS.done){GS.vm=null;renderGame();}},700);
  }else{
    vm.miss[l]=1;vm.bad={l:l,r:r};renderGame();
    GS.timer=setTimeout(function(){if(GS.vm===vm){vm.bad=null;vm.selL=null;renderGame();}},600);
  }
};

function renderOpts(opts,type){
  return '<div class="opts-grid">'+opts.map((o,i)=>{
    let isCorrect=false;
    if(type==='color')isCorrect=GS.current&&o.char===GS.current.char;
    if(type==='direction')isCorrect=o===GS.pool[GS.pi].answer;
    if(type==='clf')isCorrect=o.char===GS.pool[GS.pi].answer;
    const cls='opt-btn'+(GS.feedback&&isCorrect?' ok':GS.feedback&&!isCorrect?' dim':'');
    let inner='';
    if(type==='color')inner='<span class="opt-j">'+o.jyutping+'</span><span class="opt-c">'+o.char+'</span>';
    if(type==='direction')inner='<span class="opt-j">'+DIR_JYUT[o]+'</span><span class="opt-c">'+o+'</span>';
    if(type==='clf')inner='<span class="opt-j">'+o.jyutping+'</span><span class="opt-c" style="font-size:26px">'+o.char+'</span>';
    const click=!GS.feedback?'onclick="gameAnswer('+i+',\''+type+'\')"':'';
    return '<button class="'+cls+'" '+click+'>'+inner+'</button>';
  }).join('')+'</div>';
}
function gameAnswer(i,type){
  const opt=GS.options[i];let correct=false;
  if(type==='color')correct=opt.char===GS.current.char;
  if(type==='direction')correct=opt===GS.pool[GS.pi].answer;
  if(type==='clf')correct=opt.char===GS.pool[GS.pi].answer;
  answerGame(correct);
}
window.gameAnswer=gameAnswer;

// ── TIME GAME ("字" system: 1 個字 = 5 分鐘) ─────────────────────
var TIME_HOUR_NUM ={1:'一',2:'兩',3:'三',4:'四',5:'五',6:'六',7:'七',8:'八',9:'九',10:'十',11:'十一',12:'十二'};
var TIME_HOUR_JYUT={1:'jat1',2:'loeng5',3:'saam1',4:'sei3',5:'ng5',6:'luk6',7:'cat1',8:'baat3',9:'gau2',10:'sap6',11:'sap6 jat1',12:'sap6 ji6'};
var TIME_ZI_NUM ={1:'一',2:'兩',3:'三',4:'四',5:'五',6:'六',7:'七',8:'八',9:'九',10:'十',11:'十一'};
var TIME_ZI_JYUT={1:'jat1',2:'loeng5',3:'saam1',4:'sei3',5:'ng5',6:'luk6',7:'cat1',8:'baat3',9:'gau2',10:'sap6',11:'sap6 jat1'};
function timeMinPhrase(m){
  if(m===0)return{char:'正',jyut:'zeng3'};
  if(m===30)return{char:'半',jyut:'bun3'};
  var zi=m/5;
  return{char:TIME_ZI_NUM[zi]+'個字',jyut:TIME_ZI_JYUT[zi]+' go3 zi6'};
}
function timePhrase(h,m){
  var mp=timeMinPhrase(m);
  return{char:TIME_HOUR_NUM[h]+'點'+mp.char,jyut:TIME_HOUR_JYUT[h]+' dim2 '+mp.jyut,hour:h,min:m};
}
function randomTimeQ(){
  var h=1+Math.floor(Math.random()*12);
  var m=Math.floor(Math.random()*12)*5;
  return timePhrase(h,m);
}
function clockSVG(h,m){
  var hourAngle=((h%12)+m/60)*30, minAngle=m*6;
  function hand(angle,len,w,color){
    var rad=(angle-90)*Math.PI/180;
    var x=50+len*Math.cos(rad), y=50+len*Math.sin(rad);
    return '<line x1="50" y1="50" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round"/>';
  }
  var ticks='';
  for(var i=0;i<12;i++){
    var a=(i*30-90)*Math.PI/180;
    var x1=50+42*Math.cos(a), y1=50+42*Math.sin(a), x2=50+38*Math.cos(a), y2=50+38*Math.sin(a);
    ticks+='<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="#9ca3a0" stroke-width="2"/>';
  }
  return '<svg viewBox="0 0 100 100" style="width:150px;height:150px">'
    +'<circle cx="50" cy="50" r="46" fill="#fff" stroke="#e2e0d8" stroke-width="2"/>'+ticks
    +hand(hourAngle,24,4,'#22261F')+hand(minAngle,34,3,'#0E6B57')
    +'<circle cx="50" cy="50" r="3" fill="#0E6B57"/></svg>';
}
function renderTimeGame(a){
  var hdr='<div class="g-hdr"><span class="score-pill">★ '+GS.score+'</span><span class="round-pill">'+(GS.round+1)+' / '+GAME_TOTAL+'</span></div>'+timeLvBar();
  if(TIME_LV===1)return renderTimeLv1(a,hdr);
  if(TIME_LV===3)return renderTimeLv3(a,hdr);
  return renderTimeLv2(a,hdr);
}
var TIME_LV=1;
window.switchTimeLv=function(lv){
  TIME_LV=lv;
  GS.current=null;GS.options=null;
  renderGame();
};
function timeLvBar(){
  return '<div class="level-bar">'
    +'<button class="lv-btn'+(TIME_LV===1?' act':'')+'" onclick="switchTimeLv(1)">Lv 1<span class="lv-badge">數字時鐘</span></button>'
    +'<button class="lv-btn'+(TIME_LV===2?' act':'')+'" onclick="switchTimeLv(2)">Lv 2<span class="lv-badge">圓形時鐘面</span></button>'
    +'<button class="lv-btn'+(TIME_LV===3?' act':'')+'" onclick="switchTimeLv(3)">Lv 3<span class="lv-badge">揀時鐘</span></button>'
    +'</div>';
}
function ensureTimeQ(){
  if(!GS.current){
    var correct=randomTimeQ(), opts=[correct], seen={}; seen[correct.char]=1;
    while(opts.length<4){var cand=randomTimeQ();if(!seen[cand.char]){seen[cand.char]=1;opts.push(cand);}}
    GS.current=correct; GS.options=shuffle(opts);
  }
}
function timeTextOptsHtml(){
  return '<div class="mini-clocks-grid">'+GS.options.map(function(o,i){
    var isCorrect=o.char===GS.current.char;
    var cls='mini-clock-btn'+(GS.feedback&&isCorrect?' ok':GS.feedback&&!isCorrect?' dim':'');
    var click=!GS.feedback?'onclick="timeAnswer('+i+')"':'';
    return '<button class="'+cls+'" '+click+'><span class="opt-j" style="font-size:11px">'+o.jyut+'</span><span class="mini-clock-label">'+o.char+'</span></button>';
  }).join('')+'</div>';
}
function pad2(n){return n<10?'0'+n:''+n;}
// LV1: digital time (09:30) → pick correct Cantonese reading
function renderTimeLv1(a,hdr){
  ensureTimeQ();
  a.innerHTML=hdr+'<p class="g-instr">而家幾點呀？揀啱嘅講法！</p>'
    +'<div style="display:flex;justify-content:center;margin:14px 0"><div class="time-q-card" style="padding:20px"><div class="clock-digits">'+pad2(GS.current.hour)+':'+pad2(GS.current.min)+'</div></div></div>'
    +timeTextOptsHtml()
    +(GS.feedback?renderFb(GS.feedback==='correct','✓ 啱喇！','✗ 係「'+GS.current.char+'」('+GS.current.jyut+')'):'');
}
// LV2: analog clock face → pick correct Cantonese reading
function renderTimeLv2(a,hdr){
  ensureTimeQ();
  a.innerHTML=hdr+'<p class="g-instr">而家幾點呀？揀啱嘅講法！</p>'
    +'<div style="display:flex;justify-content:center;margin:14px 0">'+clockSVG(GS.current.hour,GS.current.min)+'</div>'
    +timeTextOptsHtml()
    +(GS.feedback?renderFb(GS.feedback==='correct','✓ 啱喇！','✗ 係「'+GS.current.char+'」('+GS.current.jyut+')'):'');
}
// LV3: Cantonese reading shown → pick the matching analog clock (reversed direction)
function renderTimeLv3(a,hdr){
  ensureTimeQ();
  var optsHtml='<div class="mini-clocks-grid">'+GS.options.map(function(o,i){
    var isCorrect=o.char===GS.current.char;
    var cls='mini-clock-btn'+(GS.feedback&&isCorrect?' ok':GS.feedback&&!isCorrect?' dim':'');
    var click=!GS.feedback?'onclick="timeAnswer('+i+')"':'';
    return '<button class="'+cls+'" '+click+'>'+clockSVGsmall(o.hour,o.min)+'</button>';
  }).join('')+'</div>';
  a.innerHTML=hdr+'<p class="g-instr">邊個鐘先啱？揀出正確嘅時鐘！</p>'
    +'<div class="time-q-card" style="margin-bottom:14px"><div class="time-q-canto">'+GS.current.char+'</div><div class="time-q-jyut">'+GS.current.jyut+'</div></div>'
    +optsHtml
    +(GS.feedback?renderFb(GS.feedback==='correct','✓ 啱喇！','✗ 揀錯咗時鐘'):'');
}
function clockSVGsmall(h,m){
  var hourAngle=((h%12)+m/60)*30, minAngle=m*6;
  function hand(angle,len,w,color){
    var rad=(angle-90)*Math.PI/180;
    var x=50+len*Math.cos(rad), y=50+len*Math.sin(rad);
    return '<line x1="50" y1="50" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="'+color+'" stroke-width="'+w+'" stroke-linecap="round"/>';
  }
  var ticks='';
  for(var i=0;i<12;i++){
    var a=(i*30-90)*Math.PI/180;
    var x1=50+42*Math.cos(a), y1=50+42*Math.sin(a), x2=50+36*Math.cos(a), y2=50+36*Math.sin(a);
    ticks+='<line x1="'+x1.toFixed(1)+'" y1="'+y1.toFixed(1)+'" x2="'+x2.toFixed(1)+'" y2="'+y2.toFixed(1)+'" stroke="#9ca3a0" stroke-width="2.5"/>';
  }
  return '<svg viewBox="0 0 100 100" style="width:78px;height:78px">'
    +'<circle cx="50" cy="50" r="46" fill="#fff" stroke="#e2e0d8" stroke-width="2"/>'+ticks
    +hand(hourAngle,22,5,'#22261F')+hand(minAngle,32,3.5,'#0E6B57')
    +'<circle cx="50" cy="50" r="3.5" fill="#0E6B57"/></svg>';
}
window.timeAnswer=function(i){
  if(GS.feedback)return;
  var opt=GS.options[i];
  answerGame(opt.char===GS.current.char);
};

// ── DIRECTION GAME: 3 Levels ──────────────────────────────────
var DIR_LV = 1;

window.switchDirLv = function(lv) {
  DIR_LV = lv;
  GS.current = null;
  GS.gridState = null;
  renderGame();
};

function dirLvBar() {
  return '<div class="level-bar">'
    + '<button class="lv-btn'+(DIR_LV===1?' act':'')+'" onclick="switchDirLv(1)">Lv 1<span class="lv-badge">睇圖揀方向</span></button>'
    + '<button class="lv-btn'+(DIR_LV===2?' act':'')+'" onclick="switchDirLv(2)">Lv 2<span class="lv-badge">格子移動</span></button>'
    + '<button class="lv-btn'+(DIR_LV===3?' act':'')+'" onclick="switchDirLv(3)">Lv 3<span class="lv-badge">街道地圖</span></button>'
    + '</div>';
}

function renderDirectionGame() {
  var hdr = '<div class="g-hdr"><span class="score-pill">★ '+GS.score+'</span>'
    + '<span class="round-pill">'+(GS.round+1)+' / '+GAME_TOTAL+'</span></div>';
  if (DIR_LV === 1) return renderDirLv1(hdr);
  if (DIR_LV === 2) return renderDirLv2(hdr);
  return renderDirLv3(hdr);
}

// ─── LV1: original scene → pick direction ────────────────────
function renderDirLv1(hdr) {
  var sc = GS.pool[GS.pi];
  if (!GS.current || GS.current !== sc) {
    GS.current = sc;
    var wrongPool = sc.validWrongs ? sc.validWrongs : DIR_ALL.filter(function(a){return a!==sc.answer;});
    var wrongs = shuffle(wrongPool.filter(function(a){return a!==sc.answer;})).slice(0,3);
    GS.options = shuffle([...wrongs, sc.answer]);
  }
  return hdr + dirLvBar()
    + '<div class="dir-card">'
    +   '<div class="dir-scene">'+sc.scene+'</div>'
    +   '<div style="font-family:monospace;font-size:11px;color:var(--accent);margin-bottom:4px">'+sc.qjyut+'</div>'
    +   '<div class="dir-q">'+sc.q+'</div>'
    + '</div>'
    + renderOpts(GS.options,'direction')
    + (GS.feedback?renderFb(GS.feedback==='correct',
        '✓ '+sc.answer+' ('+DIR_JYUT[sc.answer]+')',
        '✗ 係「'+sc.answer+'」('+DIR_JYUT[sc.answer]+')'):'');
}

// ─── LV2: grid movement ──────────────────────────────────────
// 3×3 grid, character starts at centre (1,1), follow 1-2 step instructions
var GRID_MOVES = [
  { steps:[{dir:'左面',d:[0,-1]}], q:'向左面行一步', char:'🚶', jyut:'heung3 zo2 min6 haang4 jat1 bou6' },
  { steps:[{dir:'右面',d:[0,1]}],  q:'向右面行一步', char:'🚶', jyut:'heung3 jau6 min6 haang4 jat1 bou6' },
  { steps:[{dir:'上面',d:[-1,0]}], q:'向上面行一步', char:'🚶', jyut:'heung3 soeng6 min6 haang4 jat1 bou6' },
  { steps:[{dir:'下面',d:[1,0]}],  q:'向下面行一步', char:'🚶', jyut:'heung3 haa6 min6 haang4 jat1 bou6' },
  { steps:[{dir:'左面',d:[0,-1]},{dir:'上面',d:[-1,0]}], q:'向左面行一步，再向上面行一步', char:'🚶', jyut:'heung3 zo2 min6 haang4 jat1 bou6, zoi3 heung3 soeng6 min6 haang4 jat1 bou6' },
  { steps:[{dir:'右面',d:[0,1]},{dir:'下面',d:[1,0]}],   q:'向右面行一步，再向下面行一步', char:'🚶', jyut:'heung3 jau6 min6 haang4 jat1 bou6, zoi3 heung3 haa6 min6 haang4 jat1 bou6' },
  { steps:[{dir:'上面',d:[-1,0]},{dir:'右面',d:[0,1]}],  q:'向上面行一步，再向右面行一步', char:'🚶', jyut:'heung3 soeng6 min6 haang4 jat1 bou6, zoi3 heung3 jau6 min6 haang4 jat1 bou6' },
  { steps:[{dir:'下面',d:[1,0]},{dir:'左面',d:[0,-1]}],  q:'向下面行一步，再向左面行一步', char:'🚶', jyut:'heung3 haa6 min6 haang4 jat1 bou6, zoi3 heung3 zo2 min6 haang4 jat1 bou6' },
  { steps:[{dir:'左面',d:[0,-1]},{dir:'左面',d:[0,-1]}], q:'向左面行兩步', char:'🚶', jyut:'heung3 zo2 min6 haang4 loeng5 bou6' },
  { steps:[{dir:'右面',d:[0,1]},{dir:'右面',d:[0,1]}],   q:'向右面行兩步', char:'🚶', jyut:'heung3 jau6 min6 haang4 loeng5 bou6' },
  { steps:[{dir:'上面',d:[-1,0]},{dir:'上面',d:[-1,0]}], q:'向上面行兩步', char:'🚶', jyut:'heung3 soeng6 min6 haang4 loeng5 bou6' },
  { steps:[{dir:'下面',d:[1,0]},{dir:'下面',d:[1,0]}],   q:'向下面行兩步', char:'🚶', jyut:'heung3 haa6 min6 haang4 loeng5 bou6' },
];

// Emoji for each grid position (3×3)
var GRID_EMOJIS = [
  ['🌳','🏠','🌳'],
  ['🏪','⭐','🏫'],
  ['🌳','🏥','🌳'],
];

function applySteps(startR, startC, steps) {
  var r = startR, c = startC;
  for (var i = 0; i < steps.length; i++) {
    r = Math.max(0, Math.min(2, r + steps[i].d[0]));
    c = Math.max(0, Math.min(2, c + steps[i].d[1]));
  }
  return {r:r, c:c};
}

function renderGrid(charR, charC, selectedRC, correctRC, showResult) {
  var rows = '';
  for (var r = 0; r < 3; r++) {
    var cells = '';
    for (var c = 0; c < 3; c++) {
      var isChar   = (r===charR && c===charC);
      var isCorrect= correctRC && r===correctRC.r && c===correctRC.c;
      var isSel    = selectedRC && r===selectedRC.r && c===selectedRC.c;
      var bg = '#fff';
      var border = '1.5px solid #e2e0d8';
      if (showResult && isCorrect) { bg='#E6F4EC'; border='2px solid #1D8A5C'; }
      else if (showResult && isSel && !isCorrect) { bg='#FAEAE4'; border='2px solid #C1402A'; }
      else if (!showResult && isSel) { bg='#eff6ff'; border='2px solid #2563eb'; }
      var content = isChar ? '🧍' : GRID_EMOJIS[r][c];
      var clickAttr = (!showResult && !isChar) ? 'onclick="gridSelect('+r+','+c+')"' : '';
      cells += '<td style="width:33%;height:80px;text-align:center;font-size:28px;'
        +'background:'+bg+';border:'+border+';border-radius:8px;cursor:'+(isChar?'default':'pointer')+'" '
        +clickAttr+'>'+content+'</td>';
    }
    rows += '<tr>'+cells+'</tr>';
  }
  return '<table style="width:100%;border-collapse:separate;border-spacing:6px">'+rows+'</table>';
}

function renderDirLv2(hdr) {
  if (!GS.current) {
    var qIdx = Math.floor(Math.random() * GRID_MOVES.length);
    var q = GRID_MOVES[qIdx];
    var startR = 1, startC = 1;
    var endPos = applySteps(startR, startC, q.steps);
    GS.current = { q:q, startR:startR, startC:startC, endPos:endPos };
    GS.gridSel = null;
    GS.gridSubmitted = false;
  }
  var q = GS.current.q;
  var sr = GS.current.startR, sc2 = GS.current.startC;
  var endPos = GS.current.endPos;
  var sel = GS.gridSel;

  var grid = renderGrid(sr, sc2, sel, GS.gridSubmitted?endPos:null, GS.gridSubmitted);

  var submitBtn = !GS.gridSubmitted
    ? '<button class="submit-btn" '+(sel?'':'disabled')+' onclick="gridSubmit()">確認答案</button>'
    : '';

  var fb = '';
  if (GS.gridSubmitted) {
    var correct = sel && sel.r===endPos.r && sel.c===endPos.c;
    fb = renderFb(correct, '✓ 正確！', '✗ 終點係「'+GRID_EMOJIS[endPos.r][endPos.c]+'」格');
    if (!GS._gridTimer) {
      GS._gridTimer = setTimeout(function() {
        GS._gridTimer = null;
        if (correct) GS.score += 10;
        GS.round++;
        if (GS.round >= GAME_TOTAL) { GS.done = true; recordScore(); }
        else { GS.current = null; GS.gridSel = null; GS.gridSubmitted = false; }
        renderGame();
      }, 1600);
    }
  }

  return hdr + dirLvBar()
    + '<div class="time-q-card" style="margin-bottom:10px">'
    +   '<div style="font-size:13px;color:var(--text-sub);font-family:\'Space Mono\';margin-bottom:4px">'+q.jyut+'</div>'
    +   '<div style="font-size:18px;font-weight:700">'+q.q+'</div>'
    +   '<div style="font-size:11px;color:var(--text-muted);margin-top:4px">🧍 = 你而家嘅位置，揀終點格</div>'
    + '</div>'
    + grid + submitBtn + fb;
}

window.gridSelect = function(r, c) {
  if (GS.gridSubmitted) return;
  GS.gridSel = {r:r, c:c};
  renderGame();
};
window.gridSubmit = function() {
  if (!GS.gridSel || GS.gridSubmitted) return;
  GS.gridSubmitted = true;
  renderGame();
};

// ─── LV3: Street map → follow route description ───────────────
// Simple 4×4 grid map with landmarks
// Route described in Cantonese, student picks destination
var MAP_LANDMARKS = {
  '0,0':'🏠', '0,1':'🌳', '0,2':'🏫', '0,3':'🌳',
  '1,0':'🌳', '1,1':'🌳', '1,2':'🌳', '1,3':'🏪',
  '2,0':'🏥', '2,1':'🌳', '2,2':'🌳', '2,3':'🌳',
  '3,0':'🌳', '3,1':'🌳', '3,2':'🏨', '3,3':'⛽',
};
var MAP_NAMED = [
  {emoji:'🏠', name:'屋企', jyut:'uk1 kei2', r:0, c:0},
  {emoji:'🏫', name:'學校', jyut:'hok6 haau6', r:0, c:2},
  {emoji:'🏪', name:'超市', jyut:'ciu1 si5', r:1, c:3},
  {emoji:'🏥', name:'醫院', jyut:'ji1 jyun2', r:2, c:0},
  {emoji:'🏨', name:'酒店', jyut:'zau2 dim3', r:3, c:2},
  {emoji:'⛽', name:'油站', jyut:'jau4 zaam3', r:3, c:3},
];

// Pre-built route questions
var MAP_ROUTES = [
  {
    start:{name:'屋企',emoji:'🏠',r:0,c:0},
    steps:'向右面行兩步，再向下面行兩步',
    jyut:'heung3 jau6 min6 haang4 loeng5 bou6, zoi3 heung3 haa6 min6 haang4 loeng5 bou6',
    end:{r:2,c:2}, endEmoji:'🌳', endName:'草地'
  },
  {
    start:{name:'屋企',emoji:'🏠',r:0,c:0},
    steps:'向右面行兩步',
    jyut:'heung3 jau6 min6 haang4 loeng5 bou6',
    end:{r:0,c:2}, endEmoji:'🏫', endName:'學校'
  },
  {
    start:{name:'屋企',emoji:'🏠',r:0,c:0},
    steps:'向下面行兩步',
    jyut:'heung3 haa6 min6 haang4 loeng5 bou6',
    end:{r:2,c:0}, endEmoji:'🏥', endName:'醫院'
  },
  {
    start:{name:'學校',emoji:'🏫',r:0,c:2},
    steps:'向右面行一步，再向下面行一步',
    jyut:'heung3 jau6 min6 haang4 jat1 bou6, zoi3 heung3 haa6 min6 haang4 jat1 bou6',
    end:{r:1,c:3}, endEmoji:'🏪', endName:'超市'
  },
  {
    start:{name:'超市',emoji:'🏪',r:1,c:3},
    steps:'向下面行兩步，再向左面行一步',
    jyut:'heung3 haa6 min6 haang4 loeng5 bou6, zoi3 heung3 zo2 min6 haang4 jat1 bou6',
    end:{r:3,c:2}, endEmoji:'🏨', endName:'酒店'
  },
  {
    start:{name:'醫院',emoji:'🏥',r:2,c:0},
    steps:'向右面行三步，再向下面行一步',
    jyut:'heung3 jau6 min6 haang4 saam1 bou6, zoi3 heung3 haa6 min6 haang4 jat1 bou6',
    end:{r:3,c:3}, endEmoji:'⛽', endName:'油站'
  },
  {
    start:{name:'酒店',emoji:'🏨',r:3,c:2},
    steps:'向上面行三步，再向左面行兩步',
    jyut:'heung3 soeng6 min6 haang4 saam1 bou6, zoi3 heung3 zo2 min6 haang4 loeng5 bou6',
    end:{r:0,c:0}, endEmoji:'🏠', endName:'屋企'
  },
  {
    start:{name:'油站',emoji:'⛽',r:3,c:3},
    steps:'向左面行一步',
    jyut:'heung3 zo2 min6 haang4 jat1 bou6',
    end:{r:3,c:2}, endEmoji:'🏨', endName:'酒店'
  },
];

function renderMap(startR, startC, highlightR, highlightC, correctR, correctC, showResult) {
  var rows = '';
  for (var r = 0; r < 4; r++) {
    var cells = '';
    for (var c = 0; c < 4; c++) {
      var key = r+','+c;
      var emoji = MAP_LANDMARKS[key] || '🌳';
      var isStart   = (r===startR && c===startC);
      var isHL      = (r===highlightR && c===highlightC);
      var isCorrect = correctR!==undefined && r===correctR && c===correctC;
      var bg = '#fff', border = '1px solid #e2e0d8';
      if (isStart)  { bg='#fef9c3'; border='2px solid #ca8a04'; }
      if (showResult && isCorrect) { bg='#E6F4EC'; border='2px solid #1D8A5C'; }
      else if (showResult && isHL && !isCorrect) { bg='#FAEAE4'; border='2px solid #C1402A'; }
      else if (!showResult && isHL) { bg='#eff6ff'; border='2px solid #2563eb'; }
      var clickAttr = (!showResult && !isStart) ? 'onclick="mapSelect('+r+','+c+')"' : '';
      cells += '<td style="width:25%;height:68px;text-align:center;font-size:24px;'
        +'background:'+bg+';border:'+border+';border-radius:8px;cursor:'+(isStart?'default':'pointer')+'" '
        +clickAttr+'>'+emoji+'</td>';
    }
    rows += '<tr>'+cells+'</tr>';
  }
  return '<table style="width:100%;border-collapse:separate;border-spacing:5px">'+rows+'</table>';
}

function renderDirLv3(hdr) {
  if (!GS.current) {
    var rIdx = Math.floor(Math.random() * MAP_ROUTES.length);
    GS.current = MAP_ROUTES[rIdx];
    GS.mapSel = null;
    GS.mapSubmitted = false;
  }
  var route = GS.current;
  var sel = GS.mapSel;
  var end = route.end;

  var map = renderMap(
    route.start.r, route.start.c,
    sel ? sel.r : -1, sel ? sel.c : -1,
    GS.mapSubmitted ? end.r : undefined,
    GS.mapSubmitted ? end.c : undefined,
    GS.mapSubmitted
  );

  var submitBtn = !GS.mapSubmitted
    ? '<button class="submit-btn" '+(sel?'':'disabled')+' onclick="mapSubmit()">確認答案</button>'
    : '';

  var fb = '';
  if (GS.mapSubmitted) {
    var correct = sel && sel.r===end.r && sel.c===end.c;
    fb = renderFb(correct, '✓ 路線正確！', '✗ 終點係「'+route.endEmoji+' '+route.endName+'」');
    if (!GS._mapTimer) {
      GS._mapTimer = setTimeout(function() {
        GS._mapTimer = null;
        if (correct) GS.score += 10;
        GS.round++;
        if (GS.round >= GAME_TOTAL) { GS.done = true; recordScore(); }
        else { GS.current = null; GS.mapSel = null; GS.mapSubmitted = false; }
        renderGame();
      }, 1600);
    }
  }

  return hdr + dirLvBar()
    + '<div class="time-q-card" style="margin-bottom:8px">'
    +   '<div style="font-size:12px;color:var(--text-sub);font-family:\'Space Mono\';margin-bottom:4px">'+route.jyut+'</div>'
    +   '<div style="font-size:17px;font-weight:700">由 '+route.start.emoji+route.start.name+' 出發：</div>'
    +   '<div style="font-size:16px;margin-top:4px">'+route.steps+'</div>'
    +   '<div style="font-size:11px;color:var(--text-muted);margin-top:6px">🟡 = 出發點　揀終點格</div>'
    + '</div>'
    + map + submitBtn + fb;
}

window.mapSelect = function(r, c) {
  if (GS.mapSubmitted) return;
  var route = GS.current;
  if (r===route.start.r && c===route.start.c) return;
  GS.mapSel = {r:r, c:c};
  renderGame();
};
window.mapSubmit = function() {
  if (!GS.mapSel || GS.mapSubmitted) return;
  GS.mapSubmitted = true;
  renderGame();
};


// ── CLASSIFIER GAME: 3 Levels ─────────────────────────────────
var CLF_LV = 1;

window.switchClfLv = function(lv) {
  CLF_LV = lv;
  GS.current   = null;
  GS.options   = null;
  GS.clfSortItems = null;
  GS.clfSortDone  = false;
  GS.clfSortAns   = {};
  GS.clfSortClfs  = null;
  renderGame();
};

function clfLvBar() {
  return '<div class="level-bar">'
    + '<button class="lv-btn'+(CLF_LV===1?' act':'')+'" onclick="switchClfLv(1)">Lv 1<span class="lv-badge">填空揀量詞</span></button>'
    + '<button class="lv-btn'+(CLF_LV===2?' act':'')+'" onclick="switchClfLv(2)">Lv 2<span class="lv-badge">睇圖揀量詞</span></button>'
    + '<button class="lv-btn'+(CLF_LV===3?' act':'')+'" onclick="switchClfLv(3)">Lv 3<span class="lv-badge">分類排列</span></button>'
    + '</div>';
}

function renderClassifierGame() {
  var hdr = '<div class="g-hdr"><span class="score-pill">★ '+GS.score+'</span>'
    + '<span class="round-pill">'+(GS.round+1)+' / '+GAME_TOTAL+'</span></div>';
  if (CLF_LV === 1) return renderClfLv1(hdr);
  if (CLF_LV === 2) return renderClfLv2(hdr);
  return renderClfLv3(hdr);
}

// ── LV1: fill-in blank ───────────────────────────────────────
function renderClfLv1(hdr) {
  var q = GS.pool[GS.pi];
  if (!GS.current || GS.current !== q) {
    GS.current = q;
    var allC    = S.data.classifier;
    var correctC = allC.find(function(c){ return c.char === q.answer; });
    var wrongCs  = shuffle(allC.filter(function(c){ return c.char !== q.answer; })).slice(0,3);
    GS.options  = shuffle(wrongCs.concat(correctC ? [correctC] : []));
  }
  var ans = S.data.classifier.find(function(c){ return c.char === q.answer; });
  var ansJyut = ans ? ans.jyutping : '';
  var ansThai = ans ? ans.thai : '';
  return hdr + clfLvBar()
    + '<p class="g-instr">揀啱量詞填入空格！</p>'
    + '<div class="clf-q-card">'
    +   '<div class="clf-q-noun">'+q.noun+'</div>'
    +   '<div class="clf-q-jyut">'+q.jyut_noun+'</div>'
    +   '<div class="clf-q-hint">'+q.hint+'</div>'
    + '</div>'
    + renderOpts(GS.options, 'clf')
    + (GS.feedback ? renderFb(GS.feedback==='correct',
        '✓ '+q.answer+' ('+ansJyut+') — '+ansThai,
        '✗ 係「'+q.answer+'」('+ansJyut+') — '+ansThai) : '');
}

// ── Emoji picture bank for LV2 ────────────────────────────────
var CLF_PICS = [
  {emoji:'🍎', label:'蘋果', jyut:'ping4 gwo2', answer:'個'},
  {emoji:'🧑', label:'人',   jyut:'jan4',       answer:'個'},
  {emoji:'📱', label:'電話', jyut:'din6 waa2',  answer:'個'},
  {emoji:'🍊', label:'橙',   jyut:'caang2',     answer:'個'},
  {emoji:'🐕', label:'狗',   jyut:'gau2',       answer:'隻'},
  {emoji:'🐈', label:'貓',   jyut:'maau1',      answer:'隻'},
  {emoji:'🐦', label:'雀仔', jyut:'zoek3 zai2', answer:'隻'},
  {emoji:'🐠', label:'金魚', jyut:'gam1 jyu2',  answer:'條'},
  {emoji:'🐟', label:'魚',   jyut:'jyu2',       answer:'條'},
  {emoji:'👖', label:'褲',   jyut:'fu3',        answer:'條'},
  {emoji:'🐍', label:'蛇',   jyut:'se4',        answer:'條'},
  {emoji:'📄', label:'紙',   jyut:'zi2',        answer:'張'},
  {emoji:'🪑', label:'椅',   jyut:'yi2',        answer:'張'},
  {emoji:'🗺', label:'地圖', jyut:'dei6 tou4',  answer:'張'},
  {emoji:'📖', label:'書',   jyut:'syu1',       answer:'本'},
  {emoji:'📰', label:'雜誌', jyut:'zaap6 zi3',  answer:'本'},
  {emoji:'📓', label:'簿',   jyut:'bou2',       answer:'本'},
  {emoji:'🍵', label:'茶',   jyut:'caa4',       answer:'杯'},
  {emoji:'☕', label:'咖啡', jyut:'gaa3 fe1',   answer:'杯'},
  {emoji:'🧃', label:'果汁', jyut:'gwo2 zap1',  answer:'杯'},
  {emoji:'🍚', label:'飯',   jyut:'faan6',      answer:'碗'},
  {emoji:'🍜', label:'湯',   jyut:'tong1',      answer:'碗'},
  {emoji:'🍝', label:'麵',   jyut:'min6',       answer:'碗'},
  {emoji:'🏠', label:'屋',   jyut:'uk1',        answer:'間'},
  {emoji:'🏪', label:'舖',   jyut:'pou3',       answer:'間'},
  {emoji:'🏫', label:'學校', jyut:'hok6 haau6', answer:'間'},
];

// ── LV2: see emoji → pick classifier ─────────────────────────
var clfPicPool = [];
var clfPicIdx  = 0;

function getClfPic() {
  if (clfPicPool.length === 0 || clfPicIdx >= clfPicPool.length) {
    clfPicPool = shuffle(CLF_PICS);
    clfPicIdx  = 0;
  }
  return clfPicPool[clfPicIdx++];
}

function renderClfLv2(hdr) {
  if (!GS.current) {
    var pic      = getClfPic();
    var allC     = S.data.classifier;
    var correctC = allC.find(function(c){ return c.char === pic.answer; });
    var wrongCs  = shuffle(allC.filter(function(c){ return c.char !== pic.answer; })).slice(0,3);
    GS.current   = pic;
    GS.options   = shuffle(wrongCs.concat(correctC ? [correctC] : []));
  }
  var pic      = GS.current;
  var correctC = S.data.classifier.find(function(c){ return c.char === pic.answer; });
  var cJyut    = correctC ? correctC.jyutping : '';
  var cThai    = correctC ? correctC.thai : '';

  // Custom options using index-based onclick (avoids quote escaping issues)
  var optsHtml = '<div class="opts-grid">' + GS.options.map(function(o, i) {
    var isCorrect = o.char === pic.answer;
    var cls = 'opt-btn' + (GS.feedback && isCorrect ? ' ok' : GS.feedback && !isCorrect ? ' dim' : '');
    var click = !GS.feedback ? 'onclick="clfOpt(' + i + ')"' : '';
    return '<button class="' + cls + '" ' + click + '>'
      + '<span class="opt-j">' + o.jyutping + '</span>'
      + '<span class="opt-c" style="font-size:26px">' + o.char + '</span>'
      + '</button>';
  }).join('') + '</div>';

  return hdr + clfLvBar()
    + '<p class="g-instr">呢樣嘢用咩量詞？</p>'
    + '<div class="clf-q-card">'
    +   '<div style="font-size:72px;margin-bottom:6px">' + pic.emoji + '</div>'
    +   '<div style="font-family:monospace;color:var(--accent);font-size:13px">' + pic.jyut + '</div>'
    +   '<div style="font-size:18px;font-weight:700;margin-top:4px">' + pic.label + '</div>'
    + '</div>'
    + optsHtml
    + (GS.feedback ? renderFb(GS.feedback==='correct',
        '✓ ' + pic.answer + ' (' + cJyut + ') — ' + cThai,
        '✗ 係「' + pic.answer + '」(' + cJyut + ') — ' + cThai) : '');
}

// Handle option click for both LV1 and LV2
window.clfOpt = function(i) {
  if (GS.feedback) return;
  var opt = GS.options[i];
  if (!opt) return;
  if (CLF_LV === 1) {
    // LV1: compare with current question answer
    answerGame(opt.char === GS.pool[GS.pi].answer);
  } else {
    // LV2: compare with pic answer, then reset current
    var correct = opt.char === GS.current.answer;
    answerGame(correct);
    // Reset after feedback timer fires (nextRound handles it)
  }
};

// Override renderOpts for clf to use clfOpt instead of gameAnswer
// (avoids the quote-escaping issue with 'clf' string in onclick)
// We replace the call in renderClfLv1 to use renderClfOpts directly
function renderClfOpts(opts, correctAnswer) {
  return '<div class="opts-grid">' + opts.map(function(o, i) {
    var isCorrect = o.char === correctAnswer;
    var cls = 'opt-btn' + (GS.feedback && isCorrect ? ' ok' : GS.feedback && !isCorrect ? ' dim' : '');
    var click = !GS.feedback ? 'onclick="clfOpt(' + i + ')"' : '';
    return '<button class="' + cls + '" ' + click + '>'
      + '<span class="opt-j">' + o.jyutping + '</span>'
      + '<span class="opt-c" style="font-size:26px">' + o.char + '</span>'
      + '</button>';
  }).join('') + '</div>';
}

// ── LV3: Sort items into classifier buckets ───────────────────
// Full pool with all 8 classifiers well represented
var CLF_SORT_POOL = [
  {emoji:'🍎', label:'蘋果', jyut:'ping4 gwo2', clf:'個'},
  {emoji:'🧑', label:'人',   jyut:'jan4',       clf:'個'},
  {emoji:'📱', label:'電話', jyut:'din6 waa2',  clf:'個'},
  {emoji:'🍊', label:'橙',   jyut:'caang2',     clf:'個'},
  {emoji:'🐕', label:'狗',   jyut:'gau2',       clf:'隻'},
  {emoji:'🐈', label:'貓',   jyut:'maau1',      clf:'隻'},
  {emoji:'🐦', label:'雀仔', jyut:'zoek3 zai2', clf:'隻'},
  {emoji:'🐠', label:'金魚', jyut:'gam1 jyu2',  clf:'條'},
  {emoji:'🐟', label:'魚',   jyut:'jyu2',       clf:'條'},
  {emoji:'👖', label:'褲',   jyut:'fu3',        clf:'條'},
  {emoji:'🐍', label:'蛇',   jyut:'se4',        clf:'條'},
  {emoji:'📄', label:'紙',   jyut:'zi2',        clf:'張'},
  {emoji:'🪑', label:'椅',   jyut:'yi2',        clf:'張'},
  {emoji:'🗺', label:'地圖', jyut:'dei6 tou4',  clf:'張'},
  {emoji:'📖', label:'書',   jyut:'syu1',       clf:'本'},
  {emoji:'📰', label:'雜誌', jyut:'zaap6 zi3',  clf:'本'},
  {emoji:'📓', label:'簿',   jyut:'bou2',       clf:'本'},
  {emoji:'🍵', label:'茶',   jyut:'caa4',       clf:'杯'},
  {emoji:'☕', label:'咖啡', jyut:'gaa3 fe1',   clf:'杯'},
  {emoji:'🧃', label:'果汁', jyut:'gwo2 zap1',  clf:'杯'},
  {emoji:'🍚', label:'飯',   jyut:'faan6',      clf:'碗'},
  {emoji:'🍜', label:'湯',   jyut:'tong1',      clf:'碗'},
  {emoji:'🍝', label:'麵',   jyut:'min6',       clf:'碗'},
  {emoji:'🏠', label:'屋',   jyut:'uk1',        clf:'間'},
  {emoji:'🏪', label:'舖',   jyut:'pou3',       clf:'間'},
  {emoji:'🏫', label:'學校', jyut:'hok6 haau6', clf:'間'},
];

function buildSortQ() {
  var allClf = S.data.classifier;
  if (!allClf || allClf.length === 0) return null;

  // Pick 4 classifiers that each have ≥1 item in pool
  var validClfs = shuffle(allClf).filter(function(clf) {
    return CLF_SORT_POOL.some(function(it){ return it.clf === clf.char; });
  });
  var chosenClfs = validClfs.slice(0, 4);
  if (chosenClfs.length < 2) return null;

  // Pick 1-2 items per chosen classifier (total 4-6 items)
  var items = [];
  chosenClfs.forEach(function(clf) {
    var matching = CLF_SORT_POOL.filter(function(it){ return it.clf === clf.char; });
    var pickCount = matching.length >= 2 ? (Math.random() > 0.5 ? 2 : 1) : 1;
    shuffle(matching).slice(0, pickCount).forEach(function(it){ items.push(it); });
  });

  return { clfs: chosenClfs, items: shuffle(items) };
}

// Store clfSortAns as array indexed by item position
function renderClfLv3(hdr) {
  if (!GS.clfSortItems) {
    var q = buildSortQ();
    if (!q) {
      return hdr + clfLvBar()
        + '<div style="padding:20px;text-align:center;color:var(--text-sub)">資料載入中，請稍後再試</div>';
    }
    GS.clfSortItems = q.items;
    GS.clfSortClfs  = q.clfs;
    GS.clfSortAns   = [];  // array: GS.clfSortAns[itemIdx] = clfChar chosen
    GS.clfSortDone  = false;
    GS._clfSortTimer = null;
  }

  var items = GS.clfSortItems;
  var clfs  = GS.clfSortClfs;

  var itemsHtml = items.map(function(item, itemIdx) {
    var chosen    = GS.clfSortAns[itemIdx];
    var isCorrect = GS.clfSortDone && chosen === item.clf;
    var isWrong   = GS.clfSortDone && chosen && chosen !== item.clf;
    var rowBg     = !GS.clfSortDone ? '#fff' : (isCorrect ? '#f0fdf4' : isWrong ? '#fef2f2' : '#f9fafb');
    var rowBorder = !GS.clfSortDone ? '1.5px solid #D9D6C4' : (isCorrect ? '1.5px solid #1D8A5C' : isWrong ? '1.5px solid #C1402A' : '1.5px solid #D9D6C4');
    var resultMark = GS.clfSortDone ? (isCorrect ? ' ✓' : isWrong ? ' ✗ →' + item.clf : '') : '';

    var clfBtns = clfs.map(function(clf, clfIdx) {
      var isSel  = chosen === clf.char;
      var btnStyle = 'padding:5px 10px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;font-family:inherit;transition:all .15s;';
      if (!GS.clfSortDone) {
        btnStyle += isSel
          ? 'background:#eff6ff;color:#1d4ed8;border:2px solid #93c5fd;'
          : 'background:#f1f5f9;color:#6b7280;border:1.5px solid #e2e0d8;';
      } else {
        if (isSel && isCorrect) btnStyle += 'background:#E6F4EC;color:#1D8A5C;border:2px solid #9BD3B7;';
        else if (isSel && isWrong) btnStyle += 'background:#FAEAE4;color:#C1402A;border:2px solid #E3A091;';
        else btnStyle += 'background:#f1f5f9;color:#9ca3af;border:1.5px solid #e2e0d8;';
      }
      // Use data attributes + a single global handler to avoid quote issues
      var clickAttr = !GS.clfSortDone
        ? 'onclick="clfSortPick(' + itemIdx + ',' + clfIdx + ')"'
        : '';
      return '<button style="' + btnStyle + '" ' + clickAttr + '>' + clf.char + '</button>';
    }).join('');

    return '<div style="display:flex;align-items:center;gap:10px;background:' + rowBg + ';'
      + 'border:' + rowBorder + ';border-radius:10px;padding:9px 12px;margin-bottom:8px;">'
      + '<span style="font-size:28px">' + item.emoji + '</span>'
      + '<div style="flex:1;min-width:0">'
      +   '<div style="font-family:monospace;font-size:10px;color:var(--accent)">' + item.jyut + '</div>'
      +   '<div style="font-size:14px;font-weight:600">' + item.label + resultMark + '</div>'
      + '</div>'
      + '<div style="display:flex;gap:5px;flex-wrap:wrap;justify-content:flex-end">' + clfBtns + '</div>'
      + '</div>';
  }).join('');

  var allAnswered = items.every(function(_, i){ return GS.clfSortAns[i]; });
  var submitBtn = !GS.clfSortDone
    ? '<button class="submit-btn" ' + (allAnswered ? '' : 'disabled') + ' onclick="clfSortSubmit()">'
      + '確認答案</button>'
    : '';

  var fb = '';
  if (GS.clfSortDone) {
    var correctCount = items.filter(function(it, i){ return GS.clfSortAns[i] === it.clf; }).length;
    var allOk = correctCount === items.length;
    fb = renderFb(allOk,
      '✓ 全部正確！(' + correctCount + '/' + items.length + ')',
      correctCount + '/' + items.length + ' 正確，繼續加油！');

    if (!GS._clfSortTimer) {
      GS._clfSortTimer = setTimeout(function() {
        GS._clfSortTimer = null;
        var pts = Math.round((correctCount / items.length) * 10);
        GS.score += pts;
        GS.round++;
        if (GS.round >= GAME_TOTAL) { GS.done = true; recordScore(); }
        else { GS.clfSortItems = null; }
        renderGame();
      }, 2000);
    }
  }

  return hdr + clfLvBar()
    + '<p class="g-instr" style="margin-bottom:10px">揀每樣嘢嘅正確量詞！</p>'
    + '<div style="width:100%">' + itemsHtml + '</div>'
    + submitBtn + fb;
}

// clfSortPick: uses clfIdx to look up the classifier from GS.clfSortClfs
// avoids passing Chinese chars through onclick attributes
window.clfSortPick = function(itemIdx, clfIdx) {
  if (GS.clfSortDone || !GS.clfSortClfs) return;
  GS.clfSortAns[itemIdx] = GS.clfSortClfs[clfIdx].char;
  renderGame();
};
window.clfSortSubmit = function() {
  if (GS.clfSortDone || !GS.clfSortItems) return;
  var allAnswered = GS.clfSortItems.every(function(_, i){ return GS.clfSortAns[i]; });
  if (!allAnswered) return;
  GS.clfSortDone = true;
  renderGame();
};


function renderResult(){
  const emojis={color:'🎨',time:'⏰',direction:'🧭',classifier:'🀄',vocab:'🎲'};
  const colors={color:'#C1402A',time:'#A9701C',direction:'#1D8A5C',classifier:'#8A4B3B',vocab:'#0E6B57'};
  return'<div class="result-card"><div class="result-emoji">'+emojis[GS.tab]+'</div><div class="result-title">完成！</div><div class="result-score" id="resultScoreNum" style="color:'+colors[GS.tab]+'">0 / '+(GAME_TOTAL*10)+'</div><div class="result-thai">เก่งมาก! 叻仔！</div><button class="retry-btn" onclick="initGame(\''+GS.tab+'\')">再玩一次</button></div>';
}
// One orchestrated moment: confetti burst + score count-up when a round finishes
function celebrateResult(){
  var card=gameAreaEl().querySelector('.result-card');
  if(!card)return;
  var petals=['#0E6B57','#C1402A','#A9701C','#8A4B3B'];
  var frag='';
  for(var i=0;i<18;i++){
    var left=Math.random()*100;
    var delay=(Math.random()*0.3).toFixed(2);
    var color=petals[i%petals.length];
    var rot=Math.random()<.5?'0':'50%';
    frag+='<span class="confetti" style="left:'+left+'%;background:'+color+';border-radius:'+rot+';animation-delay:'+delay+'s"></span>';
  }
  card.insertAdjacentHTML('beforeend',frag);
  var numEl=document.getElementById('resultScoreNum');
  if(numEl)animateNumber(numEl,0,GS.score,700,' / '+(GAME_TOTAL*10));
}
function animateNumber(el,from,to,duration,suffix,prefix){
  var start=null;
  suffix=suffix||'';prefix=prefix||'';
  function step(ts){
    if(!start)start=ts;
    var p=Math.min((ts-start)/duration,1);
    var val=Math.round(from+(to-from)*p);
    el.textContent=prefix+val+suffix;
    if(p<1)requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

// ── LESSONS ───────────────────────────────────────────────────
function lsGet(k){try{return localStorage.getItem(k);}catch(e){return null;}}
function lsSet(k,v){try{localStorage.setItem(k,v);}catch(e){}}
function getLessonUnlocked(row){
  if(String(row.unlocked_by_default||'').trim().toUpperCase()==='TRUE')return true;
  return lsGet('unlocked_'+row._key)==='1';
}
function buildLessons(){
  const lessons=S.data.lessons;
  const bar=$('lessonFilterBar');
  bar.innerHTML='';
  if(!lessons.length)return;
  const types=['all',...new Set(lessons.map(l=>l.type).filter(Boolean))];
  const typeLabel={all:'全部'};
  if(!types.includes(S.lessonFilter))S.lessonFilter='all';
  types.forEach(t=>{
    const btn=h('button','f-btn'+(t===S.lessonFilter?' act':''),typeLabel[t]||t);
    btn.addEventListener('click',()=>{bar.querySelectorAll('.f-btn').forEach(b=>b.classList.remove('act'));btn.classList.add('act');renderLessons(t);});
    bar.appendChild(btn);
  });
  renderLessons(S.lessonFilter);
}
function renderLessons(filter){
  S.lessonFilter=filter||'all';
  const lessons=S.data.lessons;
  const filtered=S.lessonFilter==='all'?lessons:lessons.filter(l=>l.type===S.lessonFilter);
  const typeRank=t=>{const i=['chapter','extra','grammar'].indexOf(String(t||'').toLowerCase());return i<0?9:i;};
  const chNum=l=>{const n=parseInt(String(l.chapter||'').trim(),10);return isNaN(n)?9999:n;};
  const sorted=filtered.map((l,i)=>({l,i})).sort((x,y)=>chNum(x.l)-chNum(y.l)||typeRank(x.l.type)-typeRank(y.l.type)||(+x.l.order||0)-(+y.l.order||0)||x.i-y.i).map(o=>o.l);
  const total=lessons.length;
  const unlocked=lessons.filter(l=>getLessonUnlocked(l)).length;
  $('lessonProgress').innerHTML='<div class="lesson-progress">已解鎖 '+unlocked+' / '+total+' 個課堂<div class="progress-bar-wrap"><div class="progress-bar-fill" style="width:'+Math.round(unlocked/Math.max(total,1)*100)+'%"></div></div></div>';
  $('lessonList').innerHTML=sorted.map(l=>{
    const un=getLessonUnlocked(l);
    const k=l._key;
    const chLabel=String(l.chapter==null?'':l.chapter).trim();
    return'<div class="lesson-card" id="lcard-'+k+'"><div class="lc-header" onclick="toggleLesson(\''+k+'\')"><span class="lc-badge '+l.type+'">'+l.type+'</span>'+(chLabel?'<span class="lc-ch">'+chLabel+'</span>':'')+'<span class="lc-title">'+l.title+'</span>'+(un?'<span class="lc-chevron" id="chev-'+k+'">›</span>':'<span style="font-size:14px">🔒</span>')+'</div><div class="lc-body" id="lbody-'+k+'">'+(un?renderLessonBody(l):renderUnlockForm(l))+'</div></div>';
  }).join('');
  if(S.openLesson){
    const body=$('lbody-'+S.openLesson),chev=$('chev-'+S.openLesson);
    if(body)body.classList.add('open');
    if(chev)chev.classList.add('open');
  }
}
function renderLessonBody(l){
  let html='';
  if(l.soundcloud_url&&l.soundcloud_url.trim()){
    html+='<div class="lc-section"><div class="lc-label">🎵 備課收聽（先聽再睇片）</div><a class="media-btn soundcloud" href="'+l.soundcloud_url.trim()+'" target="_blank" rel="noopener"><span class="icon">☁️</span><span class="lbl">SoundCloud — '+l.title+'</span><span class="ext">↗</span></a></div>';
  }
  if(l.youtube_url&&l.youtube_url.trim()){
    const ytLinks=l.youtube_url.trim().split(/\s+/).filter(u=>u.startsWith('http'));
    html+='<div class="lc-section"><div class="lc-label">▶️ 教學影片</div>'+ytLinks.map((url,i)=>'<a class="media-btn youtube" href="'+url+'" target="_blank" rel="noopener"><span class="icon">▶</span><span class="lbl">YouTube'+(ytLinks.length>1?' ('+(i+1)+')':'')+' — '+l.title+'</span><span class="ext">↗</span></a>').join('')+'</div>';
  }
  // 同「詞彙」分頁對返：lesson_id + type（Chapter／Extra／Grammar）+ chapter 一樣就當同一課
  const lk=vocabKeyOf(l);
  const words=S.data.vocab.filter(w=>w._type===lk.type&&w._num===lk.num);
  if(words.length){
    const SHOW=3;   // 每課只顯示 3 個（隨機抽）；想改數量改呢個數字，閃卡練習仍然用晒全部詞彙
    const shown=words.length>SHOW?words.map(w=>[Math.random(),w]).sort((a,b)=>a[0]-b[0]).slice(0,SHOW).map(x=>x[1]):words;
    html+='<div class="lc-section"><div class="lc-label">📚 本課詞彙'+(words.length>SHOW?'（抽 '+SHOW+' 個，共 '+words.length+'）':'（'+words.length+'）')+'</div><div class="lc-vocab-grid">'
      +shown.map(w=>'<div class="lc-vocab-item"><div class="lc-vocab-jyut">'+w.jyutping+'</div><div class="lc-vocab-char">'+w.char+'</div><div class="lc-vocab-thai">'+w.thai+'</div></div>').join('')
      +'</div><button class="unlock-btn" style="margin-top:10px" onclick="practiceLessonVocab(\''+l._key+'\')">🃏 用閃卡練習呢課詞彙</button></div>';
  }
  return html||'<div style="font-size:13px;color:var(--text-muted)">暫冇額外材料</div>';
}
function renderUnlockForm(l){
  const k=l._key;
  return'<div class="locked-overlay">🔒 呢個課堂需要解鎖密碼</div><div class="unlock-form"><input class="unlock-input" type="password" placeholder="輸入老師俾嘅密碼..." id="pw-'+k+'" onkeydown="if(event.key===\'Enter\')tryUnlock(\''+k+'\')"><button class="unlock-btn" onclick="tryUnlock(\''+k+'\')">解鎖</button></div><div class="unlock-err" id="pwerr-'+k+'"></div>';
}
window.toggleLesson=key=>{
  const body=$('lbody-'+key);const chev=$('chev-'+key);if(!body)return;
  const isOpen=body.classList.contains('open');
  document.querySelectorAll('.lc-body').forEach(b=>b.classList.remove('open'));
  document.querySelectorAll('.lc-chevron').forEach(c=>c.classList.remove('open'));
  S.openLesson=isOpen?null:key;
  if(!isOpen){body.classList.add('open');if(chev)chev.classList.add('open');}
};
window.practiceLessonVocab=key=>{
  const l=S.data.lessons.find(x=>x._key===key);if(!l)return;
  const lk=vocabKeyOf(l);
  S.vocabType=lk.type;S.vocabSub=lk.num===null?'all':lk.num;S.vocabIdx=0;
  buildVocab();showTab('vocab');
};
window.tryUnlock=(key)=>{
  const input=$('pw-'+key);const errEl=$('pwerr-'+key);if(!input)return;
  const lesson=S.data.lessons.find(l=>l._key===key);
  const correctPw=lesson&&lesson.password!=null?String(lesson.password).trim():'';
  const showErr=m=>{if(errEl){errEl.textContent=m;setTimeout(()=>{if(errEl)errEl.textContent='';},3500);}};
  if(!correctPw){
    showErr(S.sourceStatus.lessons==='fallback'
      ? '⚠️ 未連到 Google Sheet，暫時核對唔到密碼。請撳頁頂「重新整理」再試。'
      : '呢個課堂喺 Sheet 入面未有設定密碼，請聯絡老師。');
    return;
  }
  if(input.value.trim()===correctPw){
    lsSet('unlocked_'+key,'1');
    S.openLesson=key;
    renderLessons(S.lessonFilter||'all');
  } else {
    showErr('密碼唔啱，請再試。');
  }
};

async function tryFetchSheet(name, url) {
  try {
    const r = await fetch(url + '&_=' + Date.now(), { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const text = await r.text();
    if (!text || text.trim().startsWith('<')) throw new Error('not CSV');
    const rows = parseCSV(text);
    if (rows.length === 0) throw new Error('empty');
    console.log('[Sheet OK]', name, rows.length + ' rows');
    return rows;
  } catch (e) {
    console.warn('[Sheet FAIL]', name, e.message);
    return null;
  }
}

// ── AI CHAT (Google Sign-In + backend Gemini proxy) ─────────────
const AiS = { token:null, user:null, history:[], sending:false };

function parseJwt(token){
  try{
    const base64 = token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    return JSON.parse(decodeURIComponent(atob(base64).split('').map(c=>'%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)).join('')));
  }catch(e){ return null; }
}

function initAiChat(){
  // 試下攞返上次登入嘅 token（未過期就直接用，過期就要求重新登入）
  const saved = localStorage.getItem('ai_id_token');
  if (saved) {
    const payload = parseJwt(saved);
    if (payload && payload.exp*1000 > Date.now()) {
      AiS.token = saved; AiS.user = payload;
    } else {
      localStorage.removeItem('ai_id_token');
    }
  }
  if (!AI_CONFIG.GOOGLE_CLIENT_ID || AI_CONFIG.GOOGLE_CLIENT_ID.indexOf('YOUR_GOOGLE_CLIENT_ID') === 0) {
    showAiSetupNotice('未設定 GOOGLE_CLIENT_ID：請去 script 頭段搵 AI_CONFIG，填返你自己個 Google OAuth Client ID。');
    return;
  }
  // accounts.google.com 個 script 係 async 載入，未必即刻有 → 輪詢等佢載完先 init，
  // 唔係就成個登入掣冇機會顯示出嚟
  let tries = 0;
  const poll = setInterval(function(){
    tries++;
    if (window.google && google.accounts && google.accounts.id) {
      clearInterval(poll);
      google.accounts.id.initialize({
        client_id: AI_CONFIG.GOOGLE_CLIENT_ID,
        callback: onGoogleSignIn,
      });
      const btn = $('gSignInBtn');
      if (btn) google.accounts.id.renderButton(btn, { theme:'outline', size:'large', shape:'pill' });
    } else if (tries > 25) { // 等咗約 5 秒都未載到
      clearInterval(poll);
      showAiSetupNotice('Google 登入元件載入唔到。最常見原因：呢個檔案係用 file:// 直接打開（Google 登入需要用 http(s) 網址，唔可以直接開個 HTML 檔），或者網絡連唔到 accounts.google.com。請用返本機伺服器（例如 npx serve 或者 python -m http.server）打開，先再試多次。');
    }
  }, 200);
}
function showAiSetupNotice(msg){
  const box = $('gSignInBtn');
  if (box) box.innerHTML = '<div style="font-size:12px;color:var(--red);background:var(--red-bg);border:1px solid #f0c4b8;border-radius:10px;padding:10px 12px;text-align:left">⚠️ '+msg+'</div>';
}
function onGoogleSignIn(response){
  AiS.token = response.credential;
  AiS.user = parseJwt(response.credential);
  localStorage.setItem('ai_id_token', response.credential);
  renderAiUI();
}
function aiSignOut(){
  AiS.token = null; AiS.user = null; AiS.history = [];
  localStorage.removeItem('ai_id_token');
  if (window.google && google.accounts) google.accounts.id.disableAutoSelect();
  renderAiUI();
}
function renderAiUI(){
  const loggedIn = !!AiS.token;
  $('aiLoginBox').style.display = loggedIn ? 'none' : 'block';
  $('aiChatBox').style.display = loggedIn ? 'flex' : 'none';
  if (!loggedIn) return;
  $('aiAvatar').src = AiS.user.picture || '';
  $('aiUserName').textContent = AiS.user.name || AiS.user.email || '';
  if (AiS.history.length === 0) {
    $('aiMessages').innerHTML = '<div class="ai-msg bot">你好！想同我練習廣東話定係想問啲咩？隨便打嚟傾下啦！</div>';
  }
}
function addAiMsg(role, text, pending){
  const wrap = $('aiMessages');
  const div = document.createElement('div');
  div.className = 'ai-msg ' + role + (pending ? ' pending' : '');
  div.textContent = text;
  wrap.appendChild(div);
  wrap.scrollTop = wrap.scrollHeight;
  return div;
}
async function sendAiMessage(){
  if (AiS.sending) return;
  const input = $('aiInput');
  const message = input.value.trim();
  if (!message) return;
  input.value = '';
  $('aiError').style.display = 'none';

  addAiMsg('user', message);
  const pendingEl = addAiMsg('bot', '打緊字…', true);
  AiS.sending = true;
  $('aiSendBtn').disabled = true;

  try {
    const res = await fetch(AI_CONFIG.BACKEND_URL + '/api/chat', {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization':'Bearer '+AiS.token },
      body: JSON.stringify({ message, history: AiS.history }),
    });
    const data = await res.json();

    if (res.status === 401) {
      pendingEl.remove();
      aiSignOut();
      showAiError('登入已過期，請重新登入。');
      return;
    }
    if (!res.ok) {
      pendingEl.remove();
      showAiError(data.error || 'AI 服務暫時出錯，請稍後再試。');
      return;
    }

    pendingEl.classList.remove('pending');
    pendingEl.textContent = data.reply;
    AiS.history.push({ role:'user', parts:[{ text: message }] });
    AiS.history.push({ role:'model', parts:[{ text: data.reply }] });
    if (typeof data.usedToday === 'number') {
      $('aiUsage').textContent = '今日已用 ' + data.usedToday + ' / ' + data.dailyLimit;
    }
  } catch(e) {
    pendingEl.remove();
    showAiError('連唔到 AI 服務，請檢查網絡或者稍後再試。（' + e.message + '）');
  } finally {
    AiS.sending = false;
    $('aiSendBtn').disabled = false;
  }
}
function showAiError(msg){
  const box = $('aiError');
  box.textContent = '⚠️ ' + msg;
  box.style.display = 'block';
}

// ── START ─────────────────────────────────────────────────────
// (呢句要留喺成個 script 最尾，等所有 const/function 定義晒先執行，
//  唔係好似之前咁因為 AiS 未 declare 就撞 TDZ 錯誤)
loadData();
