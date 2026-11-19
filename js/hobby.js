/* ═══ 興趣：興趣／頻率尺／句式／遊戲（新分頁）═══
   Shadow DOM 隔離：CSS 同全域變數（$、H、G、CATS、speak …）唔會同主頁撞名 */
(function(){
'use strict';
var host=document.getElementById('hb-host'); if(!host||!host.attachShadow)return;
var CSS_TEXT="*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%;--bg:#F1F0E4;--surface:#fff;--surface2:#E7E6D6;--border:#D9D6C4;--text:#22261F;--sub:#666B5C;--muted:#9AA091;--accent:#0E6B57;--accent-bg:#E3EFE9;--yellow:#A9701C;--yellow-bg:#F8EDDA;--green:#1D8A5C;--green-bg:#E6F4EC;--red:#C1402A;--red-bg:#FAEAE4;--serif:'Noto Serif TC',serif;--shadow:0 1px 4px rgba(0,0,0,.08)}\n.page{display:none}.page.act{display:block}\n.sec{font-family:var(--serif);font-size:15px;font-weight:700;margin:20px 0 10px}\n.sec:first-child{margin-top:0}\n.thai{font-family:'Noto Sans Thai'}\n.jy{font-family:'Space Mono',monospace}\n/* hero */\n.hero{background:var(--surface);border:1.5px solid var(--border);border-left:5px solid var(--red);border-radius:6px;padding:20px;margin-bottom:16px;position:relative;overflow:hidden}\n.hero::after{content:'';position:absolute;right:-30px;top:-30px;width:120px;height:120px;border-radius:50%;background:var(--accent-bg)}\n.hero h2{font-family:var(--serif);font-size:21px;font-weight:900;position:relative;z-index:1}\n.hero p{font-size:13px;color:var(--sub);position:relative;z-index:1}\n/* categories */\n.cat-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}\n.cat{background:var(--surface);border:2px solid var(--border);border-radius:14px;padding:14px 12px;text-align:center;cursor:pointer;transition:transform .15s,border-color .15s,background .15s;box-shadow:var(--shadow);font-family:inherit;color:var(--text)}\n.cat:hover{transform:translateY(-2px)}\n.cat .em{font-size:34px;line-height:1.2}\n.cat .nm{font-family:var(--serif);font-weight:900;font-size:17px;margin-top:2px}\n.cat .th{font-size:11px;color:var(--sub);font-family:'Noto Sans Thai'}\n.cat .ct{font-size:11px;color:var(--muted);margin-top:2px}\n.cat.act{background:var(--accent-bg);border-color:var(--accent)}\n.cat:last-child:nth-child(odd){grid-column:1/-1}\n@media(min-width:720px){.cat-grid{grid-template-columns:repeat(5,1fr)}.cat:last-child:nth-child(odd){grid-column:auto}}\n/* hobby list */\n.hobby-wrap{margin-top:16px;animation:fadeUp .3s ease}\n@keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}\n.hobby{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;margin-bottom:8px;box-shadow:var(--shadow);overflow:hidden;transition:border-color .15s}\n.hobby.open{border-color:var(--accent)}\n.h-head{display:flex;align-items:center;gap:12px;padding:11px 14px;cursor:pointer}\n.h-em{font-size:30px;width:40px;text-align:center}\n.h-main{flex:1;min-width:0}\n.h-j{font-family:'Space Mono';font-size:11px;color:var(--accent)}\n.h-c{font-size:19px;font-weight:700}\n.h-t{font-family:'Noto Sans Thai';font-size:12px;color:var(--sub)}\n.vchip{font-size:13px;font-weight:900;font-family:var(--serif);color:#fff;border-radius:8px;padding:2px 9px;flex-shrink:0}\n.chev{color:var(--muted);transition:transform .2s}\n.hobby.open .chev{transform:rotate(90deg)}\n.h-body{display:none;border-top:1.5px solid var(--border);padding:14px;background:#FCFCF7}\n.hobby.open .h-body{display:block;animation:fadeUp .25s ease}\n.lbl{font-size:11px;font-weight:700;color:var(--muted);letter-spacing:.5px;margin-bottom:6px}\n.vbox{display:flex;gap:12px;align-items:center;border-radius:10px;padding:10px 12px;margin-bottom:12px}\n.vbig{font-family:var(--serif);font-size:34px;font-weight:900;color:#fff;width:54px;height:54px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0}\n.vtxt{font-size:12px;font-family:'Noto Sans Thai';color:var(--text)}\n.vtxt b{font-family:'Noto Sans TC'}\n.also{display:flex;flex-wrap:wrap;gap:6px;margin-top:5px}\n.also span{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:1px 9px;font-size:12px}\n.ex{background:var(--surface);border:1.5px solid var(--border);border-radius:10px;padding:10px 12px}\n.ex-c{font-size:17px;font-weight:500}\n.ex-c mark{background:var(--yellow-bg);color:var(--yellow);border-radius:4px;padding:0 3px;font-weight:700}\n.ex-j{font-family:'Space Mono';font-size:11px;color:var(--accent);margin-top:2px}\n.ex-t{font-family:'Noto Sans Thai';font-size:12px;color:var(--sub);margin-top:2px}\n.spk{margin-top:8px;background:var(--accent-bg);border:1px solid #bcd9cd;color:var(--accent);border-radius:8px;padding:4px 12px;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}\n/* 再深入 */\n.sub{margin-top:14px;border-top:1.5px dashed var(--border);padding-top:12px}\n.sub-q{display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;margin-bottom:8px}\n.sub-q b{font-family:var(--serif);font-size:17px}\n.sub-q .jy{font-size:10px;color:var(--accent)}\n.sub-q .thai{font-size:12px;color:var(--sub)}\n.sub-chips{display:flex;flex-wrap:wrap;gap:8px}\n.sub-chip{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:6px 12px;cursor:pointer;font-family:inherit;color:var(--text);text-align:center;transition:all .15s}\n.sub-chip:hover{border-color:var(--accent)}\n.sub-chip.on{border-color:var(--accent);background:var(--accent-bg)}\n.sub-chip .sc{font-family:var(--serif);font-size:17px;font-weight:900;display:block}\n.sub-chip .sj{font-family:'Space Mono';font-size:9px;color:var(--accent);display:block}\n.sub-chip .st{font-family:'Noto Sans Thai';font-size:11px;color:var(--sub);display:block}\n.sub-out{display:none;margin-top:10px;background:var(--yellow-bg);border:1.5px solid #ecd9b0;border-radius:10px;padding:10px 12px;animation:fadeUp .25s ease}\n.sub-hint{font-size:11px;color:var(--muted);font-family:'Noto Sans Thai';margin-top:6px}\n.sub-qbox{background:var(--accent-bg);border-radius:10px;padding:8px 12px;margin-bottom:10px;border-left:4px solid var(--accent)}\n.sub-grps{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px}\n.sub-grp{border:1.5px solid var(--border);background:var(--surface);border-radius:20px;padding:4px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;color:var(--sub)}\n.sub-grp.on{background:var(--accent);border-color:var(--accent);color:#fff}\n/* freq ruler */\n.ruler{background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:16px 14px;box-shadow:var(--shadow)}\n.bar{height:12px;border-radius:6px;background:linear-gradient(90deg,#d7d4c0,#9fd2bd,#0E6B57);margin:6px 4px 14px}\n.fl{display:flex;flex-direction:column;gap:8px}\n.fr{display:flex;align-items:center;gap:10px;border:1.5px solid var(--border);border-radius:10px;padding:8px 12px;cursor:pointer;background:var(--surface);transition:all .15s;font-family:inherit;text-align:left;color:var(--text);width:100%}\n.fr:hover{border-color:var(--accent)}\n.fr.on{border-color:var(--accent);background:var(--accent-bg)}\n.fr .fw{font-family:var(--serif);font-size:19px;font-weight:900;min-width:92px}\n.fr .fj{font-family:'Space Mono';font-size:10px;color:var(--accent);display:block;font-weight:400}\n.fr .ft{font-family:'Noto Sans Thai';font-size:12px;color:var(--sub);flex:1}\n.pct{width:70px;height:8px;background:var(--surface2);border-radius:5px;overflow:hidden;flex-shrink:0}\n.pct i{display:block;height:100%;background:var(--accent);border-radius:5px}\n.fdetail{margin-top:12px;background:var(--yellow-bg);border-radius:10px;padding:10px 12px;font-size:13px;min-height:44px}\n.week{display:flex;gap:6px;justify-content:center;margin:8px 0}\n.day{width:34px;text-align:center}\n.day i{display:block;width:26px;height:26px;border-radius:50%;margin:0 auto 2px;background:var(--surface2);border:1.5px solid var(--border)}\n.day.on i{background:var(--accent);border-color:var(--accent)}\n.day span{font-size:11px;color:var(--sub)}\n/* patterns */\n.pat{background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:14px;margin-bottom:12px;box-shadow:var(--shadow)}\n.pat-h{display:flex;align-items:center;gap:8px;margin-bottom:8px}\n.pat-n{background:var(--accent);color:#fff;border-radius:50%;width:24px;height:24px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;flex-shrink:0}\n.pat-t{font-weight:700;font-size:15px}\n.pat-th{font-family:'Noto Sans Thai';font-size:12px;color:var(--sub)}\n.toks{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0}\n.tok{border:2px solid;border-radius:10px;padding:5px 9px;text-align:center;background:var(--surface)}\n.tok .r{font-size:10px;font-weight:700}\n.tok .c{font-family:var(--serif);font-size:20px;font-weight:900}\n.tok .j{font-family:'Space Mono';font-size:9px;color:var(--sub)}\n.tip{background:var(--yellow-bg);border-radius:8px;padding:7px 10px;font-size:12px;font-family:'Noto Sans Thai';color:#6d4a12;margin-top:6px}\n/* games */\n.gtabs{display:flex;gap:6px;margin-bottom:14px}\n.gt{flex:1;padding:8px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;color:var(--sub)}\n.gt.act{background:var(--accent);border-color:var(--accent);color:#fff}\n.g-hdr{display:flex;justify-content:space-between;margin-bottom:10px}\n.pill{background:var(--yellow-bg);border:1.5px solid #fde68a;color:var(--yellow);padding:3px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:13px}\n.pill.r{background:var(--surface2);border-color:var(--border);color:var(--sub)}\n.q-card{background:var(--surface);border:1.5px solid var(--border);border-radius:14px;padding:16px;text-align:center;box-shadow:var(--shadow);margin-bottom:12px}\n.q-em{font-size:52px;line-height:1.2}\n.q-s{font-size:22px;font-weight:700;margin-top:4px}\n.q-s u{display:inline-block;min-width:70px;text-decoration:none;border-bottom:3px dashed var(--yellow);color:var(--yellow);margin:0 2px}\n.q-t{font-family:'Noto Sans Thai';font-size:12px;color:var(--sub);margin-top:4px}\n.opts{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.opt{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:12px 8px;cursor:pointer;font-family:inherit;color:var(--text);box-shadow:var(--shadow);transition:all .15s}\n.opt:hover:not(:disabled){border-color:var(--accent);background:var(--accent-bg)}\n.opt .oc{font-family:var(--serif);font-size:22px;font-weight:900;display:block}\n.opt .oj{font-family:'Space Mono';font-size:10px;color:var(--accent)}\n.opt.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.opt.no{border-color:var(--red)!important;background:var(--red-bg)!important}\n.opt.dim{opacity:.35}\n.fb{margin-top:12px;padding:10px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid}\n.fb.ok{background:var(--green-bg);color:var(--green);border-color:#bbf7d0}\n.fb.err{background:var(--red-bg);color:var(--red);border-color:#fecaca}\n.next{display:block;margin:12px auto 0;background:var(--accent);color:#fff;border:none;border-radius:20px;padding:9px 26px;font-weight:700;font-family:inherit;cursor:pointer;font-size:14px}\n.result{background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:30px 20px;text-align:center;box-shadow:var(--shadow);animation:fadeUp .4s ease}\n.result .big{font-size:52px}\n.result .sc{font-family:'Space Mono';font-size:32px;font-weight:700;color:var(--accent)}\n\n@media(min-width:900px){.opts{grid-template-columns:repeat(4,1fr)}}\n";
var SR=host.attachShadow({mode:'open'});
SR.innerHTML='<style>'+CSS_TEXT+'</style>'+"\n  <div class=\"page act\" id=\"p-hobby\">\n    <div class=\"hero\">\n      <h2>你鐘意做咩？<\/h2>\n      <p class=\"thai\">คุณชอบทำอะไร? เลือกหมวดแล้วกดดูรายละเอียด<\/p>\n      <p style=\"margin-top:4px\">① 揀類別　② 揀興趣　③ 睇動詞同例句<\/p>\n    <\/div>\n    <div class=\"cat-grid\" id=\"catGrid\"><\/div>\n    <div id=\"hobbyWrap\"><\/div>\n  <\/div>\n\n  <!-- 頻率尺 -->\n  <div class=\"page\" id=\"p-freq\">\n    <div class=\"sec\">📏 幾耐做一次？ <span class=\"thai\" style=\"font-size:12px;font-weight:400;color:var(--sub)\">ทำบ่อยแค่ไหน<\/span><\/div>\n    <div class=\"ruler\">\n      <div class=\"bar\"><\/div>\n      <div class=\"fl\" id=\"freqList\"><\/div>\n      <div class=\"fdetail\" id=\"freqDetail\"><span class=\"thai\">👆 กดคำใดคำหนึ่งเพื่อดูตัวอย่างและจำนวนวันใน 1 สัปดาห์<\/span><\/div>\n    <\/div>\n    <div class=\"sec\">⏱ 講次數 <span class=\"thai\" style=\"font-size:12px;font-weight:400;color:var(--sub)\">บอกจำนวนครั้ง<\/span><\/div>\n    <div class=\"ruler\" style=\"font-size:14px\">\n      <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:8px\">\n        <div class=\"ex\"><b>一個星期<\/b><div class=\"jy\" style=\"font-size:10px;color:var(--accent)\">jat1 go3 sing1 kei4<\/div><div class=\"thai\" style=\"font-size:12px;color:var(--sub)\">สัปดาห์ละ<\/div><\/div>\n        <div class=\"ex\"><b>一個月<\/b><div class=\"jy\" style=\"font-size:10px;color:var(--accent)\">jat1 go3 jyut6<\/div><div class=\"thai\" style=\"font-size:12px;color:var(--sub)\">เดือนละ<\/div><\/div>\n        <div class=\"ex\"><b>一年<\/b><div class=\"jy\" style=\"font-size:10px;color:var(--accent)\">jat1 nin4<\/div><div class=\"thai\" style=\"font-size:12px;color:var(--sub)\">ปีละ<\/div><\/div>\n        <div class=\"ex\"><b>每日／晚晚<\/b><div class=\"jy\" style=\"font-size:10px;color:var(--accent)\">mui5 jat6 / maan5 maan5<\/div><div class=\"thai\" style=\"font-size:12px;color:var(--sub)\">ทุกวัน / ทุกคืน<\/div><\/div>\n      <\/div>\n      <div class=\"tip\" style=\"margin-top:10px\">公式：時間 ＋ 動詞 ＋ <b>數字＋次<\/b> ＋ 嘢<br>一個星期做<b>三次<\/b>運動 ／ 一個月睇<b>一次<\/b>戲<\/div>\n    <\/div>\n  <\/div>\n\n  <!-- 句式 -->\n  <div class=\"page\" id=\"p-pat\">\n    <div class=\"sec\">📐 五個新句式 <span class=\"thai\" style=\"font-size:12px;font-weight:400;color:var(--sub)\">ประโยคใหม่ 5 แบบ<\/span><\/div>\n    <div id=\"patList\"><\/div>\n  <\/div>\n\n  <!-- 遊戲 -->\n  <div class=\"page\" id=\"p-game\">\n    <div class=\"gtabs\">\n      <button class=\"gt act\" data-g=\"freq\">📏 頻率配對<\/button>\n      <button class=\"gt\" data-g=\"verb\">🔗 動詞配對<\/button>\n    <\/div>\n    <div id=\"gameArea\"><\/div>";
// ───────── 資料 ─────────
const CATS=[
 {id:'sport',em:'⚽',c:'運動',j:'wan6 dung6',t:'กีฬา'},
 {id:'music',em:'🎵',c:'音樂',j:'jam1 ngok6',t:'ดนตรี'},
 {id:'art',em:'🎨',c:'藝術手工',j:'ngai6 seot6 sau2 gung1',t:'ศิลปะ-งานฝีมือ'},
 {id:'cook',em:'🍳',c:'煮嘢食',j:'zyu2 je5 sik6',t:'ทำอาหาร'},
 {id:'chill',em:'📺',c:'休閒',j:'jau1 haan4',t:'พักผ่อน'},
];
// [cat, emoji, 詞, 粵拼, 泰文, 動詞, 例句, 例句粵拼, 例句泰文, 例句裡嘅頻率詞（用嚟標黃）]
const H=[
 ['sport','🏀','打籃球','daa2 laam4 kau4','เล่นบาสเกตบอล','打','我一個星期打兩次籃球。','ngo5 jat1 go3 sing1 kei4 daa2 loeng5 ci3 laam4 kau4.','ฉันเล่นบาสสัปดาห์ละสองครั้ง','一個星期'],
 ['sport','⚽','踢足球','tek3 zuk1 kau4','เตะฟุตบอล','踢','爸爸間中踢足球。','baa4 baa1 gaan3 zung1 tek3 zuk1 kau4.','พ่อนานๆ ครั้งเตะฟุตบอล','間中'],
 ['sport','🏊','游水','jau4 seoi2','ว่ายน้ำ','游','佢每日都游水。','keoi5 mui5 jat6 dou1 jau4 seoi2.','เขา/เธอว่ายน้ำทุกวัน','每日'],
 ['sport','🏃','跑步','paau2 bou6','วิ่ง','跑','我平時鐘意跑下步。','ngo5 ping4 si4 zung1 ji3 paau2 haa5 bou6.','ปกติฉันชอบวิ่งเล่นๆ','平時'],
 ['sport','🧘','做瑜伽','zou6 jyu4 gaa1','ทำโยคะ','做','我一個星期做三次瑜伽。','ngo5 jat1 go3 sing1 kei4 zou6 saam1 ci3 jyu4 gaa1.','ฉันทำโยคะสัปดาห์ละสามครั้ง','一個星期'],
 ['sport','🥾','行山','haang4 saan1','เดินป่า/ปีนเขา','行','婆婆好少行山。','po4 po2 hou2 siu2 haang4 saan1.','คุณยายแทบไม่ค่อยไปเดินป่า','好少'],
 ['sport','🏸','打羽毛球','daa2 jyu5 mou4 kau4','เล่นแบดมินตัน','打','我哋經常打羽毛球。','ngo5 dei6 ging1 soeng4 daa2 jyu5 mou4 kau4.','พวกเราเล่นแบดมินตันเป็นประจำ','經常'],
 ['music','🥁','打鼓','daa2 gu2','ตีกลอง','打','媽媽成日都打鼓。','maa1 maa1 seng4 jat6 dou1 daa2 gu2.','แม่ตีกลองบ่อยๆ','成日'],
 ['music','🎸','彈結他','taan4 git3 taa1','เล่นกีตาร์','彈','哥哥間中彈結他。','go4 go1 gaan3 zung1 taan4 git3 taa1.','พี่ชายนานๆ ครั้งเล่นกีตาร์','間中'],
 ['music','🎹','彈鋼琴','taan4 gong3 kam4','เล่นเปียโน','彈','妹妹每日都彈鋼琴。','mui6 mui2 mui5 jat6 dou1 taan4 gong3 kam4.','น้องสาวเล่นเปียโนทุกวัน','每日'],
 ['music','🎻','拉小提琴','laai1 siu2 tai4 kam4','สีไวโอลิน','拉','我一個星期拉兩次小提琴。','ngo5 jat1 go3 sing1 kei4 laai1 loeng5 ci3 siu2 tai4 kam4.','ฉันสีไวโอลินสัปดาห์ละสองครั้ง','一個星期'],
 ['music','🪈','吹笛','ceoi1 dek6','เป่าขลุ่ย','吹','爺爺幾乎唔會吹笛。','je4 je2 gei1 fu4 m4 wui5 ceoi1 dek6.','คุณปู่แทบไม่เป่าขลุ่ยเลย','幾乎唔會'],
 ['music','🎤','唱歌','coeng3 go1','ร้องเพลง','唱','佢平時鐘意唱下歌。','keoi5 ping4 si4 zung1 ji3 coeng3 haa5 go1.','ปกติเขา/เธอชอบร้องเพลงเล่นๆ','平時'],
 ['art','🖌️','畫畫','waa6 waa2','วาดรูป','畫','我平時鐘意畫下畫。','ngo5 ping4 si4 zung1 ji3 waa6 haa5 waa2.','ปกติฉันชอบวาดรูปเล่นๆ','平時'],
 ['art','📷','影相','jing2 soeng2','ถ่ายรูป','影','我去旅行經常影相。','ngo5 heoi3 leoi5 hang4 ging1 soeng4 jing2 soeng2.','ฉันไปเที่ยวก็ถ่ายรูปบ่อยๆ','經常'],
 ['art','🧶','編織','pin1 zik1','ถักทอ','編','婆婆成日都編織。','po4 po2 seng4 jat6 dou1 pin1 zik1.','คุณยายถักไหมพรมบ่อยๆ','成日'],
 ['art','✂️','做手工','zou6 sau2 gung1','ทำงานฝีมือ','做','我一個月做一次手工。','ngo5 jat1 go3 jyut6 zou6 jat1 ci3 sau2 gung1.','ฉันทำงานฝีมือเดือนละครั้ง','一個月'],
 ['art','🖋️','寫書法','se2 syu1 faat3','เขียนพู่กันจีน','寫','爺爺每日都寫書法。','je4 je2 mui5 jat6 dou1 se2 syu1 faat3.','คุณปู่เขียนพู่กันจีนทุกวัน','每日'],
 ['art','🦢','摺紙','zip3 zi2','พับกระดาษ','摺','佢哋間中摺紙。','keoi5 dei6 gaan3 zung1 zip3 zi2.','พวกเขานานๆ ครั้งพับกระดาษ','間中'],
 ['cook','🍲','煮嘢食','zyu2 je5 sik6','ทำอาหาร','煮','媽媽每日都煮嘢食。','maa1 maa1 mui5 jat6 dou1 zyu2 je5 sik6.','แม่ทำอาหารทุกวัน','每日'],
 ['cook','🎂','焗蛋糕','guk6 daan2 gou1','อบเค้ก','焗','我好少焗蛋糕。','ngo5 hou2 siu2 guk6 daan2 gou1.','ฉันแทบไม่ค่อยอบเค้ก','好少'],
 ['cook','🥟','整點心','zing2 dim2 sam1','ทำติ่มซำ','整','我一個月整兩次點心。','ngo5 jat1 go3 jyut6 zing2 loeng5 ci3 dim2 sam1.','ฉันทำติ่มซำเดือนละสองครั้ง','一個月'],
 ['cook','🍜','煲湯','bou1 tong1','ต้มซุป(นานๆ)','煲','婆婆經常煲湯。','po4 po2 ging1 soeng4 bou1 tong1.','คุณยายต้มซุปเป็นประจำ','經常'],
 ['cook','🥠','包餃子','baau1 gaau2 zi2','ห่อเกี๊ยว','包','我哋過年先包餃子。','ngo5 dei6 gwo3 nin4 sin1 baau1 gaau2 zi2.','พวกเราถึงตรุษจีนถึงจะห่อเกี๊ยว','過年'],
 ['chill','📺','睇電視','tai2 din6 si6','ดูทีวี','睇','佢幾乎唔會睇電視。','keoi5 gei1 fu4 m4 wui5 tai2 din6 si6.','เขา/เธอแทบไม่ดูทีวีเลย','幾乎唔會'],
 ['chill','🎬','睇戲','tai2 hei3','ดูหนัง','睇','我一個月睇一次戲。','ngo5 jat1 go3 jyut6 tai2 jat1 ci3 hei3.','ฉันดูหนังเดือนละครั้ง','一個月'],
 ['chill','🎮','打機','daa2 gei1','เล่นเกม','打','弟弟成日都打機。','dai6 dai2 seng4 jat6 dou1 daa2 gei1.','น้องชายเล่นเกมบ่อยๆ','成日'],
 ['chill','📖','睇書','tai2 syu1','อ่านหนังสือ','睇','我晚晚都睇書。','ngo5 maan5 maan5 dou1 tai2 syu1.','ฉันอ่านหนังสือทุกคืน','晚晚'],
 ['chill','🛍️','行街','haang4 gaai1','เดินเล่น/ช้อปปิ้ง','行','我週末經常行街。','ngo5 zau1 mut6 ging1 soeng4 haang4 gaai1.','ฉันเดินเล่นช้อปปิ้งเป็นประจำวันหยุด','經常'],
 ['chill','🀄','打麻雀','daa2 maa4 zoek3','เล่นไพ่นกกระจอก','打','婆婆間中打麻雀。','po4 po2 gaan3 zung1 daa2 maa4 zoek3.','คุณยายนานๆ ครั้งเล่นไพ่นกกระจอก','間中'],
];
const VERBS={
 '打':['ตี/เล่น — ลูกบอล เครื่องเคาะ เกม ไพ่','打波・打鼓・打機・打麻雀','#C1402A'],
 '踢':['เตะ — ใช้เท้า','踢足球','#A9701C'],
 '彈':['ดีด/เล่น — กีตาร์ เปียโน','彈結他・彈鋼琴','#8A4B3B'],
 '拉':['สี/ดึง — ไวโอลิน','拉小提琴','#7B5EA7'],
 '吹':['เป่า — ขลุ่ย แตร','吹笛・吹口琴','#2C7DA0'],
 '唱':['ร้อง','唱歌・唱K','#C2185B'],
 '畫':['วาด','畫畫・畫公仔','#D2691E'],
 '做':['ทำ — กิจกรรมทั่วไป','做運動・做瑜伽・做手工','#0E6B57'],
 '整':['ทำ/ประกอบ — ขนม งานทำเอง','整蛋糕・整點心','#5B8C2A'],
 '煮':['ทำอาหาร (ต้ม ผัด)','煮飯・煮嘢食','#B5451B'],
 '焗':['อบ','焗蛋糕・焗飯','#9C6B1E'],
 '煲':['ต้ม/ตุ๋นนานๆ','煲湯・煲粥','#1D8A5C'],
 '包':['ห่อ','包餃子・包粽','#6B7A8F'],
 '睇':['ดู/อ่าน','睇戲・睇書・睇電視','#2563A8'],
 '行':['เดิน','行山・行街','#3F7D58'],
 '游':['ว่าย','游水','#0891b2'],
 '跑':['วิ่ง','跑步','#E0662B'],
 '影':['ถ่าย (รูป)','影相','#555B8C'],
 '寫':['เขียน','寫書法・寫字','#8B5A2B'],
 '摺':['พับ','摺紙・摺衫','#AD6A8F'],
 '編':['ถัก/สาน','編織','#7A6C2F'],
};
const FREQ=[
 {c:'每日',j:'mui5 jat6',t:'ทุกวัน',p:100,days:7,ex:'佢每日都游水。',exj:'keoi5 mui5 jat6 dou1 jau4 seoi2.',ext:'เขาว่ายน้ำทุกวัน',note:'มักใช้คู่กับ 都 (dou1)'},
 {c:'成日',j:'seng4 jat6',t:'บ่อยๆ (ภาษาพูด)',p:85,days:5,ex:'媽媽成日都打鼓。',exj:'maa1 maa1 seng4 jat6 dou1 daa2 gu2.',ext:'แม่ตีกลองบ่อยๆ',note:'ภาษาพูดมาก ใช้ 都 ตามหลังได้'},
 {c:'經常',j:'ging1 soeng4',t:'เป็นประจำ',p:70,days:4,ex:'我哋經常打羽毛球。',exj:'ngo5 dei6 ging1 soeng4 daa2 jyu5 mou4 kau4.',ext:'พวกเราเล่นแบดมินตันเป็นประจำ',note:'สุภาพกว่า 成日 เล็กน้อย'},
 {c:'間中',j:'gaan3 zung1',t:'นานๆ ครั้ง/บางครั้ง',p:40,days:2,ex:'爸爸間中踢足球。',exj:'baa4 baa1 gaan3 zung1 tek3 zuk1 kau4.',ext:'พ่อนานๆ ครั้งเตะฟุตบอล',note:'ไม่ได้ทำสม่ำเสมอ'},
 {c:'好少',j:'hou2 siu2',t:'น้อยมาก',p:20,days:1,ex:'婆婆好少行山。',exj:'po4 po2 hou2 siu2 haang4 saan1.',ext:'คุณยายแทบไม่ค่อยไปเดินป่า',note:'ใช้ในประโยคบอกเล่า ไม่ต้องใส่ 唔'},
 {c:'幾乎唔會',j:'gei1 fu4 m4 wui5',t:'แทบจะไม่เคย',p:6,days:0,ex:'佢幾乎唔會睇電視。',exj:'keoi5 gei1 fu4 m4 wui5 tai2 din6 si6.',ext:'เขาแทบไม่ดูทีวีเลย',note:'อยู่ตรงกลางระหว่าง 好少 กับ 從來冇'},
 {c:'從來冇',j:'cung4 loi4 mou5',t:'ไม่เคยเลย',p:0,days:0,ex:'我從來冇打過機。',exj:'ngo5 cung4 loi4 mou5 daa2 gwo3 gei1.',ext:'ฉันไม่เคยเล่นเกมเลย',note:'ใช้คู่กับ 過 (gwo3) = ประสบการณ์'},
];
const PATS=[
 {t:'講次數',th:'บอกจำนวนครั้ง',toks:[['我','ngo5','主語','#dc2626'],['一個星期','jat1 go3 sing1 kei4','時間','#2563eb'],['做','zou6','動詞','#16a34a'],['三次','saam1 ci3','次數','#ea580c'],['運動','wan6 dung6','賓語','#ca8a04']],ex:'我一個星期做三次運動。',j:'ngo5 jat1 go3 sing1 kei4 zou6 saam1 ci3 wan6 dung6.',tt:'ฉันออกกำลังกายสัปดาห์ละสามครั้ง',tip:'「時間」放前面，「次數」放喺動詞後面（做三次），唔係動詞前。'},
 {t:'習慣：V＋下',th:'ชอบทำเล่นๆ สบายๆ',toks:[['我','ngo5','主語','#dc2626'],['平時','ping4 si4','時間','#2563eb'],['鐘意','zung1 ji3','動詞','#16a34a'],['畫下畫','waa6 haa5 waa2','動作＋下','#9333ea']],ex:'我平時鐘意畫下畫。',j:'ngo5 ping4 si4 zung1 ji3 waa6 haa5 waa2.',tt:'ปกติฉันชอบวาดรูปเล่นๆ',tip:'動詞＋下＋賓語：畫下畫、行下街、唱下歌 = ทำเบาๆ ไม่จริงจัง ไม่หนักหนา'},
 {t:'頻率詞＋都',th:'บ่อยๆ / ทุกวัน',toks:[['媽媽','maa1 maa1','主語','#dc2626'],['成日都','seng4 jat6 dou1','頻率','#ea580c'],['打鼓','daa2 gu2','動詞＋賓語','#16a34a']],ex:'媽媽成日都打鼓。',j:'maa1 maa1 seng4 jat6 dou1 daa2 gu2.',tt:'แม่ตีกลองบ่อยๆ',tip:'頻率詞放喺動詞前面。每日／成日 好多時加 都（dou1）。'},
 {t:'否定頻率',th:'แทบไม่เคย',toks:[['佢','keoi5','主語','#dc2626'],['幾乎唔會','gei1 fu4 m4 wui5','頻率','#ea580c'],['睇電視','tai2 din6 si6','動詞＋賓語','#16a34a']],ex:'佢幾乎唔會睇電視。',j:'keoi5 gei1 fu4 m4 wui5 tai2 din6 si6.',tt:'เขา/เธอแทบไม่ดูทีวีเลย',tip:'幾乎唔會 ＋ 動詞 = 差唔多冇做。好少 就唔使加 唔：「佢好少睇電視」。'},
 {t:'每…都…',th:'ทุก… ก็…',toks:[['每個星期日','mui5 go3 sing1 kei4 jat6','時間','#2563eb'],['我','ngo5','主語','#dc2626'],['都','dou1','都','#9333ea'],['去行山','heoi3 haang4 saan1','動詞','#16a34a']],ex:'每個星期日我都去行山。',j:'mui5 go3 sing1 kei4 jat6 ngo5 dou1 heoi3 haang4 saan1.',tt:'ทุกวันอาทิตย์ฉันก็ไปเดินป่า',tip:'有「每」就要有「都」，兩個一齊用。'},
];

const VJ={'打':'daa2','踢':'tek3','彈':'taan4','拉':'laai1','吹':'ceoi1','唱':'coeng3','畫':'waa6','做':'zou6','整':'zing2','煮':'zyu2','焗':'guk6','煲':'bou1','包':'baau1','睇':'tai2','行':'haang4','游':'jau4','跑':'paau2','影':'jing2','寫':'se2','摺':'zip3','編':'pin1'};

// 再深入：跟住上面例句嘅人物去問同答
// q=[問題,粵拼,泰文]（前面自動加例句嘅人物，例如「爸爸」）；a=[答句模板,粵拼,泰文]（前面自動換成「佢／我」）
// items=[[詞,粵拼,泰文,(句中用嘅說法),(說法粵拼)]]；g=[{n:組名,items,a?}] 可以再多一層分組
const SUBJ=[
 ['我哋',['你哋','nei5 dei6','พวกคุณ'],['我哋','ngo5 dei6','พวกเรา']],
 ['佢哋',['佢哋','keoi5 dei6','พวกเขา'],['佢哋','keoi5 dei6','พวกเขา']],
 ['我',['你','nei5','คุณ'],['我','ngo5','ฉัน']],
 ['佢',['佢','keoi5','เขา/เธอ'],['佢','keoi5','เขา/เธอ']],
 ['媽媽',['媽媽','maa1 maa1','แม่'],['佢','keoi5','เธอ']],
 ['爸爸',['爸爸','baa4 baa1','พ่อ'],['佢','keoi5','เขา']],
 ['婆婆',['婆婆','po4 po2','คุณยาย'],['佢','keoi5','เธอ']],
 ['爺爺',['爺爺','je4 je2','คุณปู่'],['佢','keoi5','เขา']],
 ['哥哥',['哥哥','go4 go1','พี่ชาย'],['佢','keoi5','เขา']],
 ['妹妹',['妹妹','mui6 mui2','น้องสาว'],['佢','keoi5','เธอ']],
 ['弟弟',['弟弟','dai6 dai2','น้องชาย'],['佢','keoi5','เขา']],
];
function subjOf(i){const t=H[i][6];return SUBJ.find(s=>t.startsWith(s[0]))||SUBJ[2];}

const SUB={
 '打籃球':{q:['想練咩動作？','soeng2 lin6 me1 dung6 zok3?','อยากฝึกท่าอะไร'],a:['想練{}。','soeng2 lin6 {}.','อยากฝึก{}'],items:[['投籃','tau4 laam4','ยิงลูก'],['運球','wan6 kau4','เลี้ยงบอล'],['傳球','cyun4 kau4','ส่งบอล'],['搶籃板','coeng2 laam4 baan2','แย่งรีบาวด์']]},
 '踢足球':{q:['鐘意踢咩位置？','zung1 ji3 tek3 me1 wai2 zi3?','ชอบเตะตำแหน่งอะไร'],a:['鐘意做{}。','zung1 ji3 zou6 {}.','ชอบเล่นตำแหน่ง{}'],items:[['守門員','sau2 mun4 jyun4','ผู้รักษาประตู'],['前鋒','cin4 fung1','กองหน้า'],['中場','zung1 coeng4','กองกลาง'],['後衛','hau6 wai6','กองหลัง']]},
 '游水':{q:['識游咩姿勢？','sik1 jau4 me1 zi1 sai3?','ว่ายท่าอะไรเป็นบ้าง'],a:['識游{}。','sik1 jau4 {}.','ว่าย{}เป็น'],items:[['自由式','zi6 jau4 sik1','ฟรีสไตล์'],['蛙式','waa1 sik1','ท่ากบ'],['背泳','bui3 wing6','ท่ากรรเชียง'],['蝶式','dip6 sik1','ท่าผีเสื้อ']]},
 '跑步':{q:['鐘意喺邊度跑步？','zung1 ji3 hai2 bin1 dou6 paau2 bou6?','ชอบวิ่งที่ไหน'],a:['鐘意喺{}跑步。','zung1 ji3 hai2 {} paau2 bou6.','ชอบวิ่งที่{}'],items:[['公園','gung1 jyun2','สวนสาธารณะ'],['海旁','hoi2 pong4','ริมทะเล'],['運動場','wan6 dung6 coeng4','สนามกีฬา'],['跑步機','paau2 bou6 gei1','ลู่วิ่งไฟฟ้า']]},
 '做瑜伽':{q:['最鐘意做咩姿勢？','zeoi3 zung1 ji3 zou6 me1 zi1 sai3?','ชอบทำท่าอะไรที่สุด'],a:['最鐘意做{}。','zeoi3 zung1 ji3 zou6 {}.','ชอบทำท่า{}ที่สุด'],items:[['樹式','syu6 sik1','ต้นไม้'],['貓式','maau1 sik1','แมว'],['戰士式','zin3 si6 sik1','นักรบ'],['嬰兒式','jing1 ji4 sik1','เด็ก']]},
 '行山':{q:['行過邊度？','haang4 gwo3 bin1 dou6?','เคยเดินที่ไหน'],a:['行過{}。','haang4 gwo3 {}.','เคยเดิน{}'],items:[['獅子山','si1 zi2 saan1','เขาไลออนร็อก'],['太平山','taai3 ping4 saan1','เดอะพีค'],['鳳凰山','fung6 wong4 saan1','เขาฟีนิกซ์'],['麥理浩徑','mak6 lei5 hou6 ging3','เส้นทางแมคเลโฮส']]},
 '打羽毛球':{q:['通常點樣打？','tung1 soeng4 dim2 joeng2 daa2?','ปกติเล่นแบบไหน'],a:['通常打{}。','tung1 soeng4 daa2 {}.','ปกติเล่น{}'],items:[['單打','daan1 daa2','เดี่ยว'],['雙打','soeng1 daa2','คู่'],['混雙','wan6 soeng1','คู่ผสม']]},
 '打鼓':{q:['打咩鼓？','daa2 me1 gu2?','ตีกลองอะไร'],a:['打{}。','daa2 {}.','ตี{}'],items:[['爵士鼓','zoek3 si6 gu2','กลองชุดแจ๊ส'],['大鼓','daai6 gu2','กลองใหญ่'],['小鼓','siu2 gu2','กลองสแนร์'],['手鼓','sau2 gu2','กลองมือ']]},
 '彈結他':{q:['鐘意彈咩結他？','zung1 ji3 taan4 me1 git3 taa1?','ชอบเล่นกีตาร์แบบไหน'],a:['鐘意彈{}。','zung1 ji3 taan4 {}.','ชอบเล่น{}'],items:[['木結他','muk6 git3 taa1','กีตาร์โปร่ง'],['電結他','din6 git3 taa1','กีตาร์ไฟฟ้า'],['低音結他','dai1 jam1 git3 taa1','กีตาร์เบส']]},
 '彈鋼琴':{q:['鐘意彈咩歌？','zung1 ji3 taan4 me1 go1?','ชอบเล่นเพลงอะไร'],a:['鐘意彈{}。','zung1 ji3 taan4 {}.','ชอบเล่น{}'],items:[['古典音樂','gu2 din2 jam1 ngok6','เพลงคลาสสิก'],['流行曲','lau4 hang4 kuk1','เพลงป๊อป'],['爵士樂','zoek3 si6 ngok6','เพลงแจ๊ส'],['兒歌','ji4 go1','เพลงเด็ก']]},
 '拉小提琴':{q:['鐘意拉咩音樂？','zung1 ji3 laai1 me1 jam1 ngok6?','ชอบสีเพลงแนวไหน'],a:['鐘意拉{}。','zung1 ji3 laai1 {}.','ชอบสี{}'],items:[['古典音樂','gu2 din2 jam1 ngok6','เพลงคลาสสิก'],['民謠','man4 jiu4','เพลงพื้นบ้าน'],['電影配樂','din6 jing2 pui3 ngok6','ดนตรีประกอบหนัง'],['流行曲','lau4 hang4 kuk1','เพลงป๊อป']]},
 '吹笛':{q:['識吹咩笛？','sik1 ceoi1 me1 dek6?','เป่าขลุ่ยอะไรเป็น'],a:['識吹{}。','sik1 ceoi1 {}.','เป่า{}เป็น'],items:[['直笛','zik6 dek6','รีคอร์เดอร์'],['橫笛','waang4 dek6','ขลุ่ยฝรั่ง'],['竹笛','zuk1 dek6','ขลุ่ยไม้ไผ่']]},
 '唱歌':{q:['鐘意唱咩歌？','zung1 ji3 coeng3 me1 go1?','ชอบร้องเพลงอะไร'],a:['鐘意唱{}。','zung1 ji3 coeng3 {}.','ชอบร้อง{}'],items:[['粵語歌','jyut6 jyu5 go1','เพลงกวางตุ้ง'],['國語歌','gwok3 jyu5 go1','เพลงจีนกลาง'],['英文歌','jing1 man2 go1','เพลงอังกฤษ'],['泰文歌','taai3 man2 go1','เพลงไทย']]},
 '畫畫':{q:['鐘意畫咩？','zung1 ji3 waa6 me1?','ชอบวาดอะไร'],a:['鐘意畫{}。','zung1 ji3 waa6 {}.','ชอบวาด{}'],items:[['風景','fung1 ging2','ทิวทัศน์'],['人像','jan4 zoeng6','ภาพบุคคล'],['動物','dung6 mat6','สัตว์'],['花','faa1','ดอกไม้']]},
 '影相':{q:['鐘意影咩？','zung1 ji3 jing2 me1?','ชอบถ่ายอะไร'],a:['鐘意影{}。','zung1 ji3 jing2 {}.','ชอบถ่าย{}'],items:[['風景','fung1 ging2','ทิวทัศน์'],['食物','sik6 mat6','อาหาร'],['日落','jat6 lok6','พระอาทิตย์ตก'],['動物','dung6 mat6','สัตว์']]},
 '編織':{q:['成日織咩？','seng4 jat6 zik1 me1?','ถักอะไรบ่อยๆ'],a:['成日織{}。','seng4 jat6 zik1 {}.','ถัก{}บ่อยๆ'],items:[['冷衫','laang5 saam1','เสื้อไหมพรม'],['頸巾','geng2 gan1','ผ้าพันคอ'],['帽','mou2','หมวก'],['手襪','sau2 mat6','ถุงมือ']]},
 '做手工':{q:['想做咩手工？','soeng2 zou6 me1 sau2 gung1?','อยากทำงานฝีมืออะไร'],a:['想做{}。','soeng2 zou6 {}.','อยากทำ{}'],items:[['賀卡','ho6 kaat1','การ์ดอวยพร'],['手繩','sau2 sing4','สร้อยข้อมือเชือก'],['燈籠','dang1 lung4','โคมไฟ'],['肥皂','fei4 zaau2','สบู่']]},
 '寫書法':{q:['識寫咩字？','sik1 se2 me1 zi6?','เขียนตัวอะไรเป็น'],a:['識寫「{}」字。','sik1 se2 {} zi6.','เขียนตัว「{}」เป็น'],items:[['福','fuk1','พร/โชคดี'],['春','ceon1','ฤดูใบไม้ผลิ'],['龍','lung4','มังกร'],['愛','oi3','ความรัก']]},
 '摺紙':{q:['摺咩嘢？','zip3 me1 je5?','พับอะไร'],a:['摺{}。','zip3 {}.','พับ{}'],items:[['紙鶴','zi2 hok6','นกกระเรียนกระดาษ'],['紙飛機','zi2 fei1 gei1','เครื่องบินกระดาษ'],['紙船','zi2 syun4','เรือกระดาษ'],['青蛙','ceng1 waa1','กบ']]},
 '煮嘢食':{q:['最叻整咩餸？','zeoi3 lik1 zing2 me1 sung3?','ทำกับข้าวอะไรเก่งที่สุด'],a:['最叻{}。','zeoi3 lik1 {}.','ทำ{}เก่งที่สุด'],
  methods:[['蒸','zing1','นึ่ง'],['炒','caau2','ผัด'],['煎','zin1','ทอดน้ำมันน้อย'],['灼','coek3','ลวก'],['煲','bou1','ต้ม/ตุ๋น'],['炸','zaa3','ทอดน้ำมันท่วม']],
  tip:'💡 菜名入面已經有「蒸／炒／煎／煲／灼」，前面唔使再加「煮／整」：✓ 蒸魚　✗ 煮蒸魚。<br>冇煮法嘅菜（例如冬蔭功）先加「煮」，沙律同甜品用「整」。<div class="thai" style="margin-top:4px">ชื่อเมนูที่มีวิธีทำอยู่แล้ว ไม่ต้องเติม 煮/整 ข้างหน้า</div>',
  g:[
   {n:'🇭🇰 廣東菜',items:[['白灼蝦','baak6 coek3 haa1','กุ้งลวก'],['豉汁蒸排骨','si6 zap1 zing1 paai4 gwat1','ซี่โครงหมูนึ่งซอสถั่วดำ'],['蒸魚','zing1 jyu2','ปลานึ่ง'],['蕃茄炒蛋','faan1 ke2 caau2 daan2','ไข่ผัดมะเขือเทศ'],['乾炒牛河','gon1 caau2 ngau4 ho2','ก๋วยเตี๋ยวเส้นใหญ่ผัดแห้งเนื้อ'],['煎蛋','zin1 daan2','ไข่ดาว'],['煲仔飯','bou1 zai2 faan6','ข้าวหม้อดิน']]},
   {n:'🇹🇭 泰國菜',items:[['冬蔭功','dung1 jam3 gung1','ต้มยำกุ้ง','煮冬蔭功','zyu2 dung1 jam3 gung1'],['青咖喱雞','ceng1 gaa1 lei1 gai1','แกงเขียวหวานไก่','煮青咖喱雞','zyu2 ceng1 gaa1 lei1 gai1'],['泰式炒金邊粉','taai3 sik1 caau2 gam1 bin1 fan2','ผัดไทย'],['菠蘿炒飯','bo1 lo4 caau2 faan6','ข้าวผัดสับปะรด'],['青木瓜沙律','ceng1 muk6 gwaa1 saa1 leot2','ส้มตำ','整青木瓜沙律','zing2 ceng1 muk6 gwaa1 saa1 leot2'],['芒果糯米飯','mong1 gwo2 no6 mai5 faan6','ข้าวเหนียวมะม่วง','整芒果糯米飯','zing2 mong1 gwo2 no6 mai5 faan6']]}
  ]},
 '焗蛋糕':{q:['想焗咩蛋糕？','soeng2 guk6 me1 daan2 gou1?','อยากอบเค้กอะไร'],a:['想焗{}蛋糕。','soeng2 guk6 {} daan2 gou1.','อยากอบเค้ก{}'],items:[['芝士','zi1 si2','ชีส'],['朱古力','zyu1 gu1 lik1','ช็อกโกแลต'],['戚風','cik1 fung1','ชิฟฟ่อน'],['紅蘿蔔','hung4 lo4 baak6','แครอท']]},
 '整點心':{q:['想整咩點心？','soeng2 zing2 me1 dim2 sam1?','อยากทำติ่มซำอะไร'],a:['想整{}。','soeng2 zing2 {}.','อยากทำ{}'],items:[['蝦餃','haa1 gaau2','ฮะเก๋า'],['燒賣','siu1 maai2','ซิวไม'],['蘿蔔糕','lo4 baak6 gou1','ขนมหัวผักกาด'],['腸粉','coeng2 fan2','เกี๊ยวเตี๋ยวนึ่ง'],['叉燒包','caa1 siu1 baau1','ซาลาเปาหมูแดง']]},
 '煲湯':{q:['經常煲咩湯？','ging1 soeng4 bou1 me1 tong1?','ต้มซุปอะไรเป็นประจำ'],a:['經常煲{}湯。','ging1 soeng4 bou1 {} tong1.','ต้มซุป{}เป็นประจำ'],items:[['西洋菜','sai1 joeng4 coi3','ผักสลัดน้ำ'],['粟米','suk1 mai5','ข้าวโพด'],['蘿蔔','lo4 baak6','หัวไชเท้า'],['冬瓜','dung1 gwaa1','ฟักเขียว'],['蓮藕','lin4 ngau5','รากบัว']]},
 '包餃子':{q:['包咩餃？','baau1 me1 gaau2?','ห่อเกี๊ยวอะไร'],a:['包{}。','baau1 {}.','ห่อเกี๊ยว{}'],tip:'💡 餃名已經有「餃」，唔使再加「子」：✓ 韭菜餃　✗ 韭菜餃子。<div class="thai" style="margin-top:4px">ถ้าบอกชื่อไส้แล้ว ใช้ 餃 ได้เลย ไม่ต้องมี 子</div>',items:[['韭菜餃','gau2 coi3 gaau2','ไส้กุยช่าย'],['白菜豬肉餃','baak6 coi3 zyu1 juk6 gaau2','ไส้ผักกาดขาวหมู'],['蝦餃','haa1 gaau2','ไส้กุ้ง'],['粟米餃','suk1 mai5 gaau2','ไส้ข้าวโพด']]},
 '睇電視':{q:['偶然會睇咩節目？','ngau5 jin4 wui5 tai2 me1 zit3 muk6?','บางครั้งจะดูรายการอะไร'],a:['偶然會睇{}。','ngau5 jin4 wui5 tai2 {}.','บางครั้งจะดู{}'],items:[['新聞','san1 man4','ข่าว'],['電視劇','din6 si6 kek6','ละครทีวี'],['綜藝節目','zung1 ji6 zit3 muk6','รายการวาไรตี้'],['天氣預報','tin1 hei3 jyu6 bou3','พยากรณ์อากาศ'],['卡通片','kaa1 tung1 pin2','การ์ตูน'],['紀錄片','gei3 luk6 pin2','สารคดี']]},
 '睇戲':{q:['鐘意睇咩戲？','zung1 ji3 tai2 me1 hei3?','ชอบดูหนังประเภทไหน'],a:['鐘意睇{}。','zung1 ji3 tai2 {}.','ชอบดู{}'],items:[['愛情片','oi3 cing4 pin2','หนังรัก'],['動作片','dung6 zok3 pin2','หนังแอ็กชัน'],['喜劇','hei2 kek6','หนังตลก'],['恐怖片','hung2 bou3 pin2','หนังสยองขวัญ'],['卡通片','kaa1 tung1 pin2','การ์ตูน']]},
 '打機':{q:['鐘意玩咩遊戲？','zung1 ji3 waan2 me1 jau4 hei3?','ชอบเล่นเกมอะไร'],a:['鐘意玩{}。','zung1 ji3 waan2 {}.','ชอบเล่น{}'],
  tip:'💡「打機」係固定講法；講具體遊戲名就用「玩」：玩 Candy Crush、玩 Hay Day。<div class="thai" style="margin-top:4px">พูดถึงชื่อเกมเฉพาะ ให้ใช้ 玩 (waan2) แทน 打</div>',
  g:[
   {n:'📱 手機遊戲',a:['鐘意用手機玩{}，每日都玩一陣。','zung1 ji3 jung6 sau2 gei1 waan2 {}, mui5 jat6 dou1 waan2 jat1 zan6.','ชอบใช้มือถือเล่น{} เล่นทุกวันสักพัก'],items:[['Candy Crush','Candy Crush','เกมจับคู่ลูกกวาด'],['Hay Day','Hay Day','เกมทำฟาร์ม'],['Pokémon GO','Pokémon GO','เกมจับโปเกมอน']]},
   {n:'💻 電腦遊戲',a:['鐘意用電腦玩{}，放假仲會同朋友一齊玩。','zung1 ji3 jung6 din6 nou5 waan2 {}, fong3 gaa3 zung6 wui5 tung4 pang4 jau5 jat1 cai4 waan2.','ชอบใช้คอมพิวเตอร์เล่น{} วันหยุดยังเล่นกับเพื่อนด้วย'],items:[['Minecraft','Minecraft','เกมสร้างโลกบล็อก'],['Roblox','Roblox','เกมออนไลน์หลายผู้เล่น'],['FIFA','FIFA','เกมฟุตบอล']]},
   {n:'🎮 遊戲機',a:['鐘意用遊戲機玩{}，通常喺屋企玩。','zung1 ji3 jung6 jau4 hei3 gei1 waan2 {}, tung1 soeng4 hai2 uk1 kei2 waan2.','ชอบใช้เครื่องเกมเล่น{} ปกติเล่นที่บ้าน'],items:[['Mario Kart','Mario Kart','เกมแข่งรถมาริโอ'],['Switch Sports','Switch Sports','เกมกีฬาบน Switch']]}
  ]},
 '睇書':{q:['晚晚都睇咩書？','maan5 maan5 dou1 tai2 me1 syu1?','ทุกคืนอ่านหนังสืออะไร'],a:['晚晚都睇{}。','maan5 maan5 dou1 tai2 {}.','ทุกคืนอ่าน{}'],items:[['小說','siu2 syut3','นิยาย'],['漫畫','maan6 waa2','การ์ตูน'],['雜誌','zaap6 zi3','นิตยสาร'],['報紙','bou3 zi2','หนังสือพิมพ์'],['故事書','gu3 si6 syu1','หนังสือนิทาน']]},
 '行街':{q:['鐘意去邊度行街？','zung1 ji3 heoi3 bin1 dou6 haang4 gaai1?','ชอบไปเดินเล่นที่ไหน'],a:['鐘意去{}行街。','zung1 ji3 heoi3 {} haang4 gaai1.','ชอบไปเดินเล่นที่{}'],items:[['商場','soeng1 coeng4','ห้างสรรพสินค้า'],['街市','gaai1 si5','ตลาดสด'],['夜市','je6 si5','ตลาดกลางคืน'],['旺角','wong6 gok3','มงก๊ก']]},
 '打麻雀':{q:['打麻雀要識咩？','daa2 maa4 zoek3 jiu3 sik1 me1?','เล่นไพ่นกกระจอกต้องรู้อะไร'],a:['要識{}。','jiu3 sik1 {}.','ต้องรู้{}'],items:[['洗牌','sai2 paai2','สับไพ่'],['摸牌','mo2 paai2','จั่วไพ่'],['出牌','ceot1 paai2','ลงไพ่']]},
};
function subPlan(sb){return sb.g||[{n:'',items:sb.items}];}
function subAnswer(i,gi,k){
 const sb=SUB[H[i][2]],g=subPlan(sb)[gi],it=g.items[k],a=g.a||sb.a,sj=subjOf(i)[2];
 const vp=it[3]||it[0],vj=it[4]||it[1];
 return {c:sj[0]+a[0].replace('{}',vp),j:sj[1]+' '+a[1].replace('{}',vj),t:sj[2]+a[2].replace('{}',it[2])};
}
function subChips(i,gi){
 const g=subPlan(SUB[H[i][2]])[gi];
 return g.items.map((it,k)=>`<button class="sub-chip" data-i="${i}" data-g="${gi}" data-k="${k}"><span class="sc">${it[0]}</span><span class="sj">${it[1]}</span><span class="st">${it[2]}</span></button>`).join('');
}
function subHtml(i){
 const sb=SUB[H[i][2]];if(!sb)return '';
 const q=sb.q,sq=subjOf(i)[1],plan=subPlan(sb);
 const grp=sb.g?`<div class="sub-grps">${plan.map((g,gi)=>`<button class="sub-grp${gi===0?' on':''}" data-i="${i}" data-g="${gi}">${g.n}</button>`).join('')}</div>`:'';
 const meth=sb.methods?`<div class="lbl" style="margin-top:12px">煮法</div><div class="also">${sb.methods.map(m=>`<span>${m[0]} <small class="jy">${m[1]}</small> <small class="thai">${m[2]}</small></span>`).join('')}</div>`:'';
 const tip=sb.tip?`<div class="tip">${sb.tip}</div>`:'';
 return `<div class="sub"><div class="lbl">🔍 再深入（跟住上面例句）</div>
 <div class="sub-qbox"><div class="ex-c">${sq[0]}${q[0]}</div><div class="ex-j">${sq[1]} ${q[1]}</div><div class="ex-t">${sq[2]}${q[2]}</div></div>
 ${grp}<div class="sub-chips">${subChips(i,0)}</div><div class="sub-out"></div><div class="sub-hint">👆 กดเลือกคำตอบ</div>${meth}${tip}</div>`;
}

// ───────── 工具 ─────────
const $=id=>SR.getElementById(id);
const shuffle=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};

const Speech={ok:'speechSynthesis' in window,voices:[],
  init(){if(!this.ok)return;const l=()=>{this.voices=speechSynthesis.getVoices();};l();speechSynthesis.addEventListener('voiceschanged',l);},
  say(t){if(!this.ok)return;
    const go=()=>{const u=new SpeechSynthesisUtterance(String(t));
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.indexOf('zh')===0);
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=.85;speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();}};   // Chrome：cancel 後即刻 speak 會被吞
Speech.init();
function addScore(n){award(n);}
function speak(t){Speech.say(String(t).replace(/彈/g,'壇'));}   // 「彈」讀錯，用「壇」代替

function award(n){   // 計入主 App 嘅 ★ 總分
  try{
    var prev=S.totalScore;S.totalScore+=n;
    var chip=document.getElementById('totalScore');
    animateNumber(chip,prev,S.totalScore,600,'','★ ');
    chip.classList.remove('bump');void chip.offsetWidth;chip.classList.add('bump');
  }catch(e){console.warn('[計分失敗]',e);}
}
function logHist(score,key){   // 完成一輪 → 寫入「得分紀錄」（分數已經逐題加咗入 ★，唔重複加）
  try{S.scoreHistory.push({game:key,score:score,time:new Date().toLocaleTimeString('en-HK',{hour:'2-digit',minute:'2-digit'})});if(typeof renderHistory==='function')renderHistory();}catch(e){}
}

// ───────── 興趣 ─────────
let openCat=null,openHobby=null;
function renderCats(){
 $('catGrid').innerHTML=CATS.map(c=>`<button class="cat${c.id===openCat?' act':''}" data-c="${c.id}"><div class="em">${c.em}</div><div class="nm">${c.c}</div><div class="jy" style="font-size:10px;color:var(--accent)">${c.j}</div><div class="th">${c.t}</div><div class="ct">${H.filter(h=>h[0]===c.id).length} 個興趣</div></button>`).join('');
}
function renderHobbies(){
 if(!openCat){$('hobbyWrap').innerHTML='';return}
 const list=H.map((h,i)=>({h,i})).filter(x=>x.h[0]===openCat);
 $('hobbyWrap').innerHTML='<div class="hobby-wrap">'+list.map(({h,i})=>{
  const v=VERBS[h[5]]||['','','#0E6B57'];const open=openHobby===i;
  const ex=h[6].replace(h[9],'<mark>'+h[9]+'</mark>');
  const same=H.filter((x,k)=>x[5]===h[5]&&k!==i).slice(0,5).map(x=>`<span>${x[2]}</span>`).join('');
  return `<div class="hobby${open?' open':''}" data-i="${i}">
   <div class="h-head" data-i="${i}"><div class="h-em">${h[1]}</div><div class="h-main"><div class="h-j">${h[3]}</div><div class="h-c">${h[2]}</div><div class="h-t">${h[4]}</div></div><span class="vchip" style="background:${v[2]}">${h[5]}</span><span class="chev">›</span></div>
   <div class="h-body">
    <div class="lbl">🔑 動詞搭配</div>
    <div class="vbox" style="background:${v[2]}14;border:1.5px solid ${v[2]}55"><div class="vbig" style="background:${v[2]}">${h[5]}</div><div class="vtxt"><b>${h[5]}</b> = ${v[0]}<br>${v[1]}</div></div>
    ${same?`<div class="lbl">同一個動詞仲有</div><div class="also" style="margin-bottom:12px">${same}</div>`:''}
    <div class="lbl">💬 例句（<mark style="background:var(--yellow-bg);color:var(--yellow);border-radius:4px;padding:0 3px">黃色</mark> = 時間／頻率）</div>
    <div class="ex"><div class="ex-c">${ex}</div><div class="ex-j">${h[7]}</div><div class="ex-t">${h[8]}</div><button class="spk" data-s="${i}">🔊 聽</button></div>${subHtml(i)}
   </div></div>`}).join('')+'</div>';
}
$('catGrid').addEventListener('click',e=>{const b=e.target.closest('.cat');if(!b)return;
 openCat=openCat===b.dataset.c?null:b.dataset.c;openHobby=null;renderCats();renderHobbies();
 if(openCat)$('hobbyWrap').scrollIntoView({behavior:'smooth',block:'nearest'})});
$('hobbyWrap').addEventListener('click',e=>{
 const s=e.target.closest('.spk');if(s){speak(s.dataset.say||H[+s.dataset.s][6]);return}
 const gb=e.target.closest('.sub-grp');
 if(gb){const i=+gb.dataset.i,gi=+gb.dataset.g,wrap=gb.closest('.sub');
  wrap.querySelectorAll('.sub-grp').forEach(x=>x.classList.toggle('on',x===gb));
  wrap.querySelector('.sub-chips').innerHTML=subChips(i,gi);
  const o=wrap.querySelector('.sub-out');o.style.display='none';o.innerHTML='';return}
 const c=e.target.closest('.sub-chip');
 if(c){const i=+c.dataset.i,gi=+c.dataset.g,k=+c.dataset.k;if(!SUB[H[i][2]])return;
  const r=subAnswer(i,gi,k),wrap=c.closest('.sub');
  wrap.querySelectorAll('.sub-chip').forEach(x=>x.classList.toggle('on',x===c));
  const box=wrap.querySelector('.sub-out');
  box.innerHTML=`<div class="ex-c">${r.c}</div><div class="ex-j">${r.j}</div><div class="ex-t">${r.t}</div><button class="spk" data-say="${r.c}">🔊 聽</button>`;
  box.style.display='block';return}
 const hd=e.target.closest('.h-head');if(!hd)return;const i=+hd.dataset.i;
 openHobby=openHobby===i?null:i;renderHobbies()});

// ───────── 頻率尺 ─────────
function renderFreq(){
 $('freqList').innerHTML=FREQ.map((f,i)=>`<button class="fr" data-i="${i}"><span class="fw">${f.c}<span class="fj">${f.j}</span></span><span class="ft">${f.t}</span><span class="pct"><i style="width:${f.p}%"></i></span></button>`).join('');
}
$('freqList').addEventListener('click',e=>{const b=e.target.closest('.fr');if(!b)return;const f=FREQ[+b.dataset.i];
 SR.querySelectorAll('.fr').forEach(x=>x.classList.toggle('on',x===b));
 const names=['一','二','三','四','五','六','日'];
 const wk=names.map((n,k)=>`<div class="day${k<f.days?' on':''}"><i></i><span>${n}</span></div>`).join('');
 $('freqDetail').innerHTML=`<div class="thai" style="font-size:12px;margin-bottom:2px">📅 ประมาณใน 1 สัปดาห์${f.days===0?' (แทบไม่ได้ทำเลย)':''}</div><div class="week">${wk}</div>
 <div style="font-size:16px;font-weight:700">${f.ex}</div><div class="jy" style="font-size:11px;color:var(--accent)">${f.exj}</div><div class="thai" style="font-size:12px;color:var(--sub)">${f.ext}</div>
 <div class="thai" style="font-size:12px;margin-top:6px">💡 ${f.note}</div><button class="spk" id="fSpk">🔊 聽</button>`;
 $('fSpk').onclick=()=>speak(f.ex)});

// ───────── 句式 ─────────
function renderPats(){
 $('patList').innerHTML=PATS.map((p,i)=>`<div class="pat"><div class="pat-h"><div class="pat-n">${i+1}</div><div><div class="pat-t">${p.t}</div><div class="pat-th">${p.th}</div></div></div>
 <div class="toks">${p.toks.map(t=>`<div class="tok" style="border-color:${t[3]}"><div class="r" style="color:${t[3]}">${t[2]}</div><div class="c">${t[0]}</div><div class="j">${t[1]}</div></div>`).join('')}</div>
 <div class="ex"><div class="ex-c">${p.ex}</div><div class="ex-j">${p.j}</div><div class="ex-t">${p.tt}</div><button class="spk" data-p="${i}">🔊 聽</button></div>
 <div class="tip">💡 ${p.tip}</div></div>`).join('');
}
$('patList').addEventListener('click',e=>{const s=e.target.closest('.spk');if(s)speak(PATS[+s.dataset.p].ex)});

// ───────── 遊戲 ─────────
const ROUNDS=8;
let G={mode:'freq',score:0,round:0,q:null,answered:false,done:false};
SR.querySelector('.gtabs').addEventListener('click',e=>{const b=e.target.closest('.gt');if(!b)return;
 SR.querySelectorAll('.gt').forEach(x=>x.classList.toggle('act',x===b));startGame(b.dataset.g)});
function startGame(m){G={mode:m,score:0,round:0,q:null,answered:false,done:false};newQ();renderGame()}
const GF=[{c:'每日',j:'mui5 jat6',d:[7]},{c:'成日',j:'seng4 jat6',d:[5,6]},{c:'經常',j:'ging1 soeng4',d:[3,4]},{c:'間中',j:'gaan3 zung1',d:[2]},{c:'好少',j:'hou2 siu2',d:[1]},{c:'從來冇',j:'cung4 loi4 mou5',d:[0]}];
const WHO=['媽媽','爸爸','婆婆','爺爺','哥哥','妹妹'];
function newQ(){
 if(G.mode==='freq'){
  const f=GF[Math.floor(Math.random()*GF.length)];
  const h=H[Math.floor(Math.random()*H.length)];
  const days=f.d[Math.floor(Math.random()*f.d.length)];
  G.q={f,h,days,who:WHO[Math.floor(Math.random()*WHO.length)],opts:shuffle([f,...shuffle(GF.filter(x=>x!==f)).slice(0,3)])};
 }else{
  const h=H[Math.floor(Math.random()*H.length)];
  const vs=Object.keys(VERBS);
  const wrong=shuffle(vs.filter(v=>v!==h[5])).slice(0,3);
  G.q={h,opts:shuffle([h[5],...wrong])};
 }
 G.answered=false;
}
function renderGame(){
 const a=$('gameArea');
 if(G.done){a.innerHTML=`<div class="result"><div class="big">🎉</div><div style="font-family:var(--serif);font-size:20px;font-weight:700">完成！</div><div class="sc">${G.score} / ${ROUNDS*10}</div><div class="thai" style="color:var(--sub)">เก่งมาก! 叻仔！</div><button class="next" data-restart="${G.mode}">再玩一次</button></div>`;return}
 const hdr=`<div class="g-hdr"><span class="pill">★ ${G.score}</span><span class="pill r">${G.round+1} / ${ROUNDS}</span></div>`;
 const q=G.q;let body='';
 if(G.mode==='freq'){
  const names=['一','二','三','四','五','六','日'];
  const wk=names.map((n,k)=>`<div class="day${k<q.days?' on':''}"><i></i><span>${n}</span></div>`).join('');
  const sent=`${q.who}<u>${G.answered?q.f.c:'　　'}</u>${q.h[2]}`;
  body=`<div class="q-card"><div class="thai" style="font-size:12px;color:var(--sub)">看看一個星期做幾日 👇</div><div class="week">${wk}</div><div class="q-em">${q.h[1]}</div><div class="q-s">${sent}</div><div class="q-t">${q.h[4]}</div></div>
  <div class="opts">${q.opts.map((o,i)=>{let c='opt';if(G.answered)c+=o===q.f?' ok':(G.pick===i?' no':' dim');return `<button class="${c}" ${G.answered?'disabled':''} data-i="${i}"><span class="oc">${o.c}</span><span class="oj">${o.j}</span></button>`}).join('')}</div>`;
 }else{
  const rest=q.h[2].slice(q.h[5].length);
  const sent=`<u>${G.answered?q.h[5]:'　'}</u>${rest}`;
  body=`<div class="q-card"><div class="thai" style="font-size:12px;color:var(--sub)">揀啱嘅動詞 👇</div><div class="q-em">${q.h[1]}</div><div class="q-s">${sent}</div><div class="q-t">${q.h[4]}</div></div>
  <div class="opts">${q.opts.map((o,i)=>{let c='opt';if(G.answered)c+=o===q.h[5]?' ok':(G.pick===i?' no':' dim');return `<button class="${c}" ${G.answered?'disabled':''} data-i="${i}"><span class="oc">${o}</span><span class="oj">${VJ[o]}</span></button>`}).join('')}</div>`;
 }
 let fb='';
 if(G.answered){
  const ok=G.correct;
  const full=G.mode==='freq'?`${q.who}${q.f.c}${q.h[2]}`:q.h[2];
  const jy=G.mode==='freq'?`${q.f.j} · ${q.h[3]}`:q.h[3];
  fb=`<div class="fb ${ok?'ok':'err'}">${ok?'✓ 啱！ +10':'✗ 正確答案'}　${full}<div class="jy" style="font-size:11px;font-weight:400">${jy}</div></div><button class="next" id="nextBtn">${G.round+1>=ROUNDS?'睇成績 ➜':'下一題 ➜'}</button>`;
 }
 a.innerHTML=hdr+body+fb;
}
$('gameArea').addEventListener('click',e=>{
 const rs=e.target.closest('[data-restart]');if(rs){startGame(rs.dataset.restart);return}
 if(e.target.closest('#nextBtn')){G.round++;if(G.round>=ROUNDS){G.done=true;logHist(G.score,'hb')}else newQ();renderGame();return}
 const b=e.target.closest('.opt');if(!b||G.answered)return;
 const i=+b.dataset.i;G.pick=i;G.answered=true;
 G.correct=G.mode==='freq'?G.q.opts[i]===G.q.f:G.q.opts[i]===G.q.h[5];
 if(G.correct){G.score+=10;addScore(10)}
 speak(G.mode==='freq'?G.q.who+G.q.f.c+G.q.h[2]:G.q.h[2]);
 renderGame()});

// ───────── 啟動 ─────────
/* ── 外面分頁列 ── */
const barEl=document.getElementById('hb-bar');
const TABS=[['hobby','🎈 興趣'],['freq','📏 頻率尺'],['pat','📐 句式'],['game','🎮 遊戲']];
let cur='hobby';
function setSub(p,scrollTop){
  cur=p;
  barEl.innerHTML=TABS.map(t=>'<button class="tm-tab'+(t[0]===cur?' act':'')+'" data-ht="'+t[0]+'">'+t[1]+'</button>').join('');
  TABS.forEach(t=>{SR.getElementById('p-'+t[0]).classList.toggle('act',t[0]===cur);});
  if(scrollTop){try{window.scrollTo(0,0);}catch(e){}}
}
barEl.addEventListener('click',e=>{const b=e.target.closest('[data-ht]');if(b)setSub(b.dataset.ht,true);});
window.hbShow=function(){setSub(cur,false);};
window.hbLeave=function(){try{speechSynthesis.cancel();}catch(e){}};
renderCats();renderFreq();renderPats();startGame('freq');
setSub('hobby',false);
})();
