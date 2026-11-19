/* ═══ 身體：部位／邊度痛／量詞／左右／功能／練習（新分頁）═══
   Shadow DOM 隔離：CSS 同全域變數（$、S、PR、Speech、shuffle、esc …）唔會同主頁撞名。
   模組內 `document` 指向 shadow root（見下面 shim）；inline onclick 一律經 window.BD。 */
(function(){
'use strict';
var host=window.document.getElementById('bd-host'); if(!host||!host.attachShadow)return;
var SR=host.attachShadow({mode:'open'});
var BD=window.BD={};
var CSS_TEXT="*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}\n:host{display:block;color:var(--text);font-family:'Noto Sans TC','Noto Sans Thai',sans-serif;font-size:15px;line-height:1.6;-webkit-text-size-adjust:100%;\n--bg:#F1F0E4;--surface:#ffffff;--surface2:#E7E6D6;--border:#D9D6C4;\n--text:#22261F;--text-sub:#666B5C;--text-muted:#9AA091;\n--accent:#0E6B57;--accent-bg:#E3EFE9;\n--yellow:#A9701C;--yellow-bg:#F8EDDA;\n--green:#1D8A5C;--green-bg:#E6F4EC;\n--red:#C1402A;--red-bg:#FAEAE4;\n--radius:12px;--shadow:0 1px 4px rgba(0,0,0,0.08);\n--serif:'Noto Serif TC',serif;\n}\n/* HEADER */\n.page{display:none}.page.act{display:block}\n.sec{font-family:var(--serif);font-size:16px;font-weight:700;margin:22px 0 10px;display:flex;align-items:center;gap:7px;scroll-margin-top:120px}\n.sec small{font-family:'Noto Sans Thai';font-size:12px;font-weight:400;color:var(--text-sub)}\n/* shared small controls */\n.toolbar{display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:12px}\n.toolbar .sp{flex:1}\n.tog{padding:5px 12px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:12px;cursor:pointer;font-family:inherit;font-weight:500;transition:all .15s}\n.tog.on{background:var(--accent-bg);color:var(--accent);border-color:#9BC9BB;font-weight:700}\n.play-btn{display:flex;align-items:center;gap:6px;background:var(--accent-bg);border:1.5px solid #9BC9BB;border-radius:20px;padding:5px 14px;cursor:pointer;font-size:12px;font-weight:600;color:var(--accent);font-family:inherit}\n.play-btn.playing{background:var(--red-bg);border-color:#E3A091;color:var(--red)}\n.filter-bar{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:12px;padding-bottom:2px}\n.filter-bar::-webkit-scrollbar{display:none}\n.f-btn{flex-shrink:0;padding:6px 14px;border-radius:20px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:13px;cursor:pointer;font-family:inherit;font-weight:500}\n.f-btn.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.f-btn small{font-family:'Noto Sans Thai';font-size:10px;opacity:.8;margin-left:4px;font-weight:400}\n.hint-box{background:var(--yellow-bg);border:1px solid #E8D3A8;border-radius:10px;padding:8px 12px;font-size:12px;color:var(--yellow);margin-bottom:12px}\n.note{background:var(--accent-bg);border:1px solid #BFD9CF;border-radius:10px;padding:10px 12px;font-size:13px;margin-bottom:12px;line-height:1.7}\n.note b{color:var(--accent)}\n.note .thn{font-family:'Noto Sans Thai';color:var(--text-sub);display:block;margin-top:3px}\n/* ruby: 粵拼喺字上面，逐個字對齊 */\n/* STAGE */\n.bd-wrap{container-type:inline-size;width:100%;max-width:640px;margin:0 auto}\n.bd-stage{position:relative;width:100%;--u:calc(100cqw / var(--sw))}\n.bd-img{position:absolute;top:0;height:auto;pointer-events:none;user-select:none}\n.bd-svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;overflow:visible}\n.bd-lab{position:absolute;transform:translateY(-50%);cursor:pointer;padding:calc(var(--u)*4) calc(var(--u)*6);border-radius:calc(var(--u)*10);border:1.5px solid transparent;line-height:1.15;-webkit-tap-highlight-color:transparent}\n.bd-lab.L{text-align:right}.bd-lab.R{text-align:left}\n.bd-lab .zh{font-size:calc(var(--u)*23);font-weight:700;font-family:var(--serif);white-space:nowrap}\n.bd-lab rt[data-j]{font-size:calc(var(--u)*15)}\n.bd-lab .th{font-family:'Noto Sans Thai';font-size:calc(var(--u)*18);color:var(--text-sub);margin-top:calc(var(--u)*1)}\n.bd-lab.on{background:var(--yellow-bg);border-color:var(--yellow)}\n.bd-lab.on .zh{color:#B0300F}\n.arr{--ac:#0E6B57}\n.arr.on{--ac:#D4380D}\n.arr line.halo{stroke:#fff;stroke-width:5.5;stroke-linecap:round;opacity:.92}\n.arr line.main{stroke:var(--ac);stroke-width:2.4;stroke-linecap:round}\n.arr .head{fill:var(--ac);stroke:#fff;stroke-width:2.2;paint-order:stroke;stroke-linejoin:round}\n.arr .dot{fill:var(--ac);stroke:#fff;stroke-width:2}\n.arr .ring{fill:none;stroke:var(--ac);stroke-width:3;opacity:0;transform-box:fill-box;transform-origin:center}\n.arr.on .ring{opacity:1;animation:pulse 1.1s ease-out infinite}\n@keyframes pulse{0%{transform:scale(.5);opacity:1}100%{transform:scale(1.7);opacity:0}}\n.tap-dot{fill:rgba(14,107,87,.38);stroke:#fff;stroke-width:2.5}\n.tap-dot.good{fill:rgba(29,138,92,.85)}\n.tap-dot.bad{fill:rgba(193,64,42,.85)}\n.tap-ring{fill:none;stroke:var(--green);stroke-width:4;transform-box:fill-box;transform-origin:center;animation:pulse 1.1s ease-out infinite}\n#askStage{cursor:pointer;-webkit-tap-highlight-color:transparent}\n.next-btn{display:block;width:100%;max-width:640px;margin:14px auto 0;background:var(--accent);color:#fff;border:none;border-radius:var(--radius);padding:11px;font-weight:700;cursor:pointer;font-family:inherit;font-size:14px}\n.next-btn.alt{background:var(--surface);color:var(--accent);border:1.5px solid var(--accent)}\n/* VOCAB LIST */\n.vocab-list{display:flex;flex-direction:column;gap:7px}\n.v-row{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:8px 14px;display:flex;align-items:center;justify-content:space-between;cursor:pointer;box-shadow:var(--shadow);gap:8px}\n.v-row.on{border-color:var(--yellow);background:var(--yellow-bg)}\n.v-row .zh{font-size:20px;font-weight:700;font-family:var(--serif)}\n.v-row rt[data-j]{font-size:11px}\n.v-row .th{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub);text-align:right}\n.v-spk{flex-shrink:0;background:var(--surface2);border:1px solid var(--border);border-radius:7px;padding:3px 9px;font-size:11px;color:var(--text-sub);font-family:inherit;cursor:pointer}\n/* EXAMPLE ROWS / CARDS */\n.ex-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:8px}\n.ex{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:8px 12px;cursor:pointer;box-shadow:var(--shadow);display:flex;gap:8px;align-items:center;justify-content:space-between}\n.ex.on{border-color:var(--yellow);background:var(--yellow-bg)}\n.ex .zh{font-size:19px;font-weight:700;font-family:var(--serif);line-height:1.55}\n.ex rt[data-j]{font-size:10.5px}\n.ex .th{font-family:'Noto Sans Thai';font-size:13px;color:var(--text-sub);margin-top:1px}\n.pn{font-family:var(--serif)}\n.wgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(125px,1fr));gap:8px}\n.wd{background:var(--surface);border:1.5px solid var(--border);border-radius:12px;padding:8px 6px;text-align:center;cursor:pointer;box-shadow:var(--shadow)}\n.wd.on{border-color:var(--yellow);background:var(--yellow-bg)}\n.wd .zh{font-size:21px;font-weight:700;font-family:var(--serif);line-height:1.6}\n.wd rt[data-j]{font-size:10.5px}\n.wd .th{font-family:'Noto Sans Thai';font-size:12px;color:var(--text-sub)}\n.cl-head{display:flex;align-items:center;gap:12px;background:var(--accent-bg);border:1.5px solid #BFD9CF;border-radius:12px;padding:8px 14px;margin:14px 0 8px}\n.cl-head .big{font-family:var(--serif);font-size:30px;font-weight:900;color:var(--accent);line-height:1.5;min-width:46px;text-align:center}\n.cl-head .big rt[data-j]{font-size:11px}\n.cl-head .exp{font-family:'Noto Sans Thai';font-size:13px;color:var(--text);line-height:1.5}\n.fn-card{display:flex;gap:10px;align-items:center}\n.fn-card .em{font-size:28px;flex-shrink:0;width:38px;text-align:center}\n/* BUILDER */\n.chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px}\n.chip{padding:3px 10px 2px;border-radius:12px;border:1.5px solid var(--border);background:var(--surface);color:var(--text);cursor:pointer;font-family:var(--serif);font-weight:700;font-size:16px;line-height:1.55}\n.chip rt[data-j]{font-size:9px}\n.chip.on{background:var(--accent);border-color:var(--accent);color:#fff}\n.chip.on rt[data-j]{color:#cfe9df}\n.chip.dis{opacity:.3;pointer-events:none}\n.b-lab{font-size:12px;color:var(--text-sub);margin:6px 0 4px;font-family:'Noto Sans Thai','Noto Sans TC'}\n.b-out{background:var(--surface);border:2px solid var(--accent);border-radius:14px;padding:12px 14px;text-align:center;margin-top:6px;cursor:pointer}\n.b-out .zh{font-size:28px;font-weight:900;font-family:var(--serif);line-height:1.6}\n.b-out rt[data-j]{font-size:12px}\n.b-out .th{font-family:'Noto Sans Thai';font-size:14px;color:var(--text-sub)}\n/* DIALOGUES */\n.dlg-head{display:flex;align-items:center;justify-content:space-between;gap:8px;margin:16px 0 8px}\n.dlg-head .t{font-family:var(--serif);font-weight:700;font-size:15px}\n.dlg-head .t small{display:block;font-family:'Noto Sans Thai';font-weight:400;font-size:12px;color:var(--text-sub)}\n.dlg{display:flex;flex-direction:column;gap:8px}\n.bub{max-width:94%;border-radius:14px;padding:7px 12px;cursor:pointer;border:1.5px solid var(--border);background:var(--surface);box-shadow:var(--shadow)}\n.bub.C{align-self:flex-start;border-top-left-radius:4px}\n.bub.P{align-self:flex-end;background:var(--yellow-bg);border-color:#E8D3A8;border-top-right-radius:4px}\n.bub.on{outline:2.5px solid var(--accent)}\n.bub .who{font-size:11px;color:var(--text-muted);font-family:'Noto Sans Thai','Noto Sans TC'}\n.bub .zh{font-size:18px;font-weight:700;font-family:var(--serif);line-height:1.55}\n.bub rt[data-j]{font-size:10px}\n.bub .th{font-family:'Noto Sans Thai';font-size:12.5px;color:var(--text-sub)}\n.warn{background:var(--red-bg);border:1px solid #E9B7A9;color:var(--red);border-radius:10px;padding:7px 12px;font-size:12.5px;margin-top:8px}\n/* X-RAY */\n.xr{position:relative;width:100%;max-width:400px;margin:0 auto;aspect-ratio:428/1013}\n.xr img{position:absolute;bottom:0;left:50%;transform:translateX(-50%);height:100%;width:auto;pointer-events:none;user-select:none}\n.xr-ctl{max-width:400px;margin:14px auto 0;text-align:center}\n.xr-ctl input[type=range]{width:100%;accent-color:var(--accent)}\n.xr-btns{display:flex;justify-content:space-between;gap:6px;margin-top:6px}\n.xr-name{font-family:var(--serif);font-size:20px;font-weight:900;margin:2px 0 4px}\n/* PRACTICE */\n.g-tab-bar{display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:12px}\n.g-tab-bar::-webkit-scrollbar{display:none}\n.g-tab{flex-shrink:0;padding:7px 14px;border-radius:10px;border:1.5px solid var(--border);background:var(--surface);color:var(--text-sub);font-size:13px;cursor:pointer;font-family:inherit;font-weight:500}\n.g-tab.act{background:var(--accent);border-color:var(--accent);color:#fff;font-weight:700}\n.g-tab.topic.act{background:var(--yellow);border-color:var(--yellow)}\n.g-hdr{display:flex;justify-content:space-between;width:100%;margin-bottom:10px}\n.score-pill{background:var(--yellow-bg);border:1.5px solid #E8D3A8;color:var(--yellow);padding:4px 14px;border-radius:20px;font-weight:700;font-family:'Space Mono';font-size:14px}\n.round-pill{background:var(--surface2);border:1.5px solid var(--border);padding:4px 14px;border-radius:20px;font-family:'Space Mono';font-size:13px;color:var(--text-sub)}\n.g-instr{color:var(--text-sub);font-size:13px;text-align:center;margin-bottom:8px}\n.q-card{background:var(--surface);border:2px solid var(--border);border-radius:14px;padding:14px 18px;text-align:center;box-shadow:var(--shadow);margin-bottom:12px}\n.q-zh{font-size:36px;font-weight:900;font-family:var(--serif);line-height:1.7}\n.q-zh rt[data-j]{font-size:13px}\n.q-zh.m{font-size:26px}\n.q-th{font-family:'Noto Sans Thai';font-size:34px;font-weight:700;line-height:1.3}\n.q-th.m{font-size:24px}\n.q-sub{font-size:12px;color:var(--text-muted);margin-top:4px;font-family:'Noto Sans Thai'}\n.q-tag{display:inline-block;background:var(--yellow-bg);color:var(--yellow);border-radius:10px;padding:0 9px;font-size:11px;margin-top:4px}\n.blank{display:inline-block;min-width:1.8em;border-bottom:3px solid var(--yellow);margin:0 .12em;vertical-align:baseline}\n.spk-big{margin-top:8px;background:var(--accent-bg);border:1px solid #9BC9BB;border-radius:20px;padding:5px 16px;color:var(--accent);font-size:13px;font-weight:600;cursor:pointer;font-family:inherit}\n.opts-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;max-width:640px;margin:12px auto 0}\n.opts-grid.one{grid-template-columns:1fr}\n.opt-btn{background:var(--surface);border:1.5px solid var(--border);border-radius:var(--radius);padding:10px 8px;cursor:pointer;color:var(--text);font-family:inherit;display:flex;align-items:center;justify-content:center;min-height:62px;box-shadow:var(--shadow)}\n.opt-btn:hover{border-color:var(--accent);background:var(--accent-bg)}\n.opt-btn .zh{font-size:22px;font-weight:700;font-family:var(--serif)}\n.opt-btn .sen{font-size:18px;font-weight:700;font-family:var(--serif);line-height:1.55}\n.opt-btn rt[data-j]{font-size:11px}\n.opt-btn .sen rt[data-j]{font-size:10px}\n.opt-btn.ok{border-color:var(--green)!important;background:var(--green-bg)!important}\n.opt-btn.no{border-color:var(--red)!important;background:var(--red-bg)!important}\n.opt-btn.dim{opacity:.35;pointer-events:none}\n.fb{width:100%;max-width:640px;margin:12px auto 0;padding:10px 14px;border-radius:10px;text-align:center;font-weight:700;font-size:13px;border:1.5px solid}\n.fb.ok{background:var(--green-bg);color:var(--green);border-color:#bbf7d0}\n.fb.err{background:var(--red-bg);color:var(--red);border-color:#fecaca}\n.fb .th{font-family:'Noto Sans Thai';font-weight:600}\n.result-card{position:relative;overflow:hidden;background:var(--surface);border:1.5px solid var(--border);border-radius:20px;padding:30px 20px;text-align:center;display:flex;flex-direction:column;align-items:center;gap:8px;box-shadow:var(--shadow);animation:resultIn .4s ease}\n@keyframes resultIn{0%{opacity:0;transform:translateY(8px) scale(.97)}100%{opacity:1;transform:none}}\n.result-emoji{font-size:52px}\n.result-title{font-family:var(--serif);font-size:20px;font-weight:700}\n.result-score{font-family:'Space Mono';font-size:34px;font-weight:700;color:var(--accent)}\n.result-thai{font-size:13px;color:var(--text-sub);font-family:'Noto Sans Thai'}\n.retry-btn{background:linear-gradient(135deg,var(--accent),var(--yellow));color:#fff;border:none;border-radius:10px;padding:10px 28px;font-weight:700;cursor:pointer;font-family:inherit;font-size:14px;margin-top:6px}\n.confetti{position:absolute;top:-10px;width:7px;height:12px;opacity:0;animation:confettiFall 1.1s ease-in forwards}\n@keyframes confettiFall{0%{opacity:1;transform:translateY(0) rotate(0)}100%{opacity:0;transform:translateY(180px) rotate(300deg)}}\n/* RESPONSIVE */\n@media (min-width:1000px){\n.learn-grid{display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:24px;align-items:start}\n.learn-grid .list-col{position:sticky;top:96px;max-height:calc(100vh - 120px);overflow-y:auto;padding-right:4px}\n#page-practice{max-width:700px;margin:0 auto}\n}\n.retry-btn rt[data-j]{color:#fff}\n:host(.hide-jy) .bd-lab rt{display:none}\n.f-btn.act rt[data-j],.g-tab.act rt[data-j],.next-btn rt[data-j]{color:rgba(255,255,255,.92)}";
SR.innerHTML='<style>'+CSS_TEXT+'</style><div class="page act" id="page-learn"></div><div class="page" id="page-pain"></div><div class="page" id="page-cl"></div><div class="page" id="page-lr"></div><div class="page" id="page-fn"></div><div class="page" id="page-practice"></div>';
const document={getElementById:function(i){return SR.getElementById(i);},querySelector:function(s){return SR.querySelector(s);},querySelectorAll:function(s){return SR.querySelectorAll(s);},createElement:function(t){return window.document.createElement(t);}};
const award=window.APP_AWARD,logHist=window.APP_LOGHIST;
/* ═════════ 部位資料：座標由 parts.json 產生（x,y 係圖片像素位置）═════════ */
const PARTS = {"outer": {"title": "外觀", "titleThai": "ภายนอก", "emoji": "🧍", "w": 428, "h": 1013, "items": [{"id": "hair", "c": "頭髮", "j": "tau4 faat3", "th": "ผม", "x": 172, "y": 60, "side": "L"}, {"id": "eye", "c": "眼", "j": "ngaan5", "th": "ตา", "x": 193, "y": 103, "side": "L"}, {"id": "nose", "c": "鼻哥", "j": "bei6 go1", "th": "จมูก", "x": 210, "y": 124, "side": "L"}, {"id": "chin", "c": "下巴", "j": "haa5 baa1", "th": "คาง", "x": 202, "y": 158, "side": "L"}, {"id": "shoulder", "c": "膊頭", "j": "bok3 tau2", "th": "ไหล่", "x": 128, "y": 213, "side": "L"}, {"id": "chest", "c": "胸", "j": "hung1", "th": "หน้าอก", "x": 250, "y": 268, "side": "R"}, {"id": "elbow", "c": "手踭", "j": "sau2 zaang1", "th": "ข้อศอก", "x": 100, "y": 365, "side": "L"}, {"id": "hand", "c": "手", "j": "sau2", "th": "มือ", "x": 48, "y": 512, "side": "L"}, {"id": "thigh", "c": "大腿", "j": "daai6 teoi2", "th": "ต้นขา", "x": 150, "y": 600, "side": "L"}, {"id": "knee", "c": "膝頭哥", "j": "sat1 tau4 go1", "th": "หัวเข่า", "x": 165, "y": 690, "side": "L"}, {"id": "ankle", "c": "腳眼", "j": "goek3 ngaan5", "th": "ข้อเท้า", "x": 150, "y": 925, "side": "L"}, {"id": "toe", "c": "腳趾", "j": "goek3 zi2", "th": "นิ้วเท้า", "x": 140, "y": 1000, "side": "L"}, {"id": "forehead", "c": "額頭", "j": "ngaak2 tau4", "th": "หน้าผาก", "x": 225, "y": 83, "side": "R"}, {"id": "ear", "c": "耳仔", "j": "ji5 zai2", "th": "หู", "x": 264, "y": 108, "side": "R"}, {"id": "mouth", "c": "口/嘴", "j": "hau2 _ zeoi2", "th": "ปาก", "x": 222, "y": 142, "side": "R", "say": "口，嘴"}, {"id": "neck", "c": "頸", "j": "geng2", "th": "คอ", "x": 226, "y": 186, "side": "R"}, {"id": "arm", "c": "手臂", "j": "sau2 bei3", "th": "แขน", "x": 322, "y": 290, "side": "R"}, {"id": "waist", "c": "腰", "j": "jiu1", "th": "เอว", "x": 272, "y": 376, "side": "R"}, {"id": "navel", "c": "肚臍", "j": "tou5 cai4", "th": "สะดือ", "x": 214, "y": 396, "side": "R"}, {"id": "finger", "c": "手指", "j": "sau2 zi2", "th": "นิ้วมือ", "x": 398, "y": 538, "side": "R"}, {"id": "shin", "c": "小腿", "j": "siu2 teoi2", "th": "ขาท่อนล่าง", "x": 276, "y": 820, "side": "R"}, {"id": "foot", "c": "腳", "j": "goek3", "th": "เท้า", "x": 288, "y": 968, "side": "R"}]}, "skeleton": {"title": "骨骼", "titleThai": "โครงกระดูก", "emoji": "🦴", "w": 417, "h": 1002, "items": [{"id": "skull", "c": "頭骨", "j": "tau4 gwat1", "th": "กะโหลกศีรษะ", "x": 190, "y": 40, "side": "L"}, {"id": "clavicle", "c": "鎖骨", "j": "so2 gwat1", "th": "กระดูกไหปลาร้า", "x": 150, "y": 178, "side": "L"}, {"id": "armbone", "c": "手骨", "j": "sau2 gwat1", "th": "กระดูกแขน", "x": 100, "y": 260, "side": "L"}, {"id": "pelvis", "c": "骨盆", "j": "gwat1 pun4", "th": "กระดูกเชิงกราน", "x": 160, "y": 402, "side": "L"}, {"id": "kneecap", "c": "膝頭骨", "j": "sat1 tau4 gwat1", "th": "กระดูกสะบ้า", "x": 164, "y": 652, "side": "L"}, {"id": "footbone", "c": "腳骨", "j": "goek3 gwat1", "th": "กระดูกเท้า", "x": 145, "y": 960, "side": "L"}, {"id": "teeth", "c": "牙齒", "j": "ngaa4 ci2", "th": "ฟัน", "x": 210, "y": 100, "side": "R"}, {"id": "sternum", "c": "胸骨", "j": "hung1 gwat1", "th": "กระดูกอก", "x": 208, "y": 225, "side": "R"}, {"id": "rib", "c": "肋骨", "j": "lak6 gwat1", "th": "ซี่โครง", "x": 262, "y": 255, "side": "R"}, {"id": "spine", "c": "脊骨", "j": "zek3 gwat1", "th": "กระดูกสันหลัง", "x": 208, "y": 335, "side": "R"}, {"id": "femur", "c": "大腿骨", "j": "daai6 teoi2 gwat1", "th": "กระดูกต้นขา", "x": 256, "y": 545, "side": "R"}, {"id": "tibia", "c": "小腿骨", "j": "siu2 teoi2 gwat1", "th": "กระดูกหน้าแข้ง", "x": 254, "y": 800, "side": "R"}]}, "organs": {"title": "內臟", "titleThai": "อวัยวะภายใน", "emoji": "🫀", "w": 426, "h": 1006, "items": [{"id": "brain", "c": "腦", "j": "nou5", "th": "สมอง", "x": 200, "y": 45, "side": "L"}, {"id": "lung", "c": "肺", "j": "fai3", "th": "ปอด", "x": 165, "y": 250, "side": "L"}, {"id": "liver", "c": "肝", "j": "gon1", "th": "ตับ", "x": 188, "y": 310, "side": "L"}, {"id": "smallint", "c": "小腸", "j": "siu2 coeng2", "th": "ลำไส้เล็ก", "x": 212, "y": 405, "side": "L"}, {"id": "largeint", "c": "大腸", "j": "daai6 coeng2", "th": "ลำไส้ใหญ่", "x": 168, "y": 400, "side": "L"}, {"id": "throat", "c": "食道", "j": "sik6 dou6", "th": "หลอดอาหาร", "x": 210, "y": 150, "side": "R"}, {"id": "heart", "c": "心臟", "j": "sam1 zong6", "th": "หัวใจ", "x": 224, "y": 250, "side": "R"}, {"id": "stomach", "c": "胃", "j": "wai6", "th": "กระเพาะอาหาร", "x": 242, "y": 320, "side": "R"}, {"id": "vessel", "c": "血管", "j": "hyut3 gun2", "th": "หลอดเลือด", "x": 322, "y": 335, "side": "R"}]}, "back": {"title": "背面", "titleThai": "ด้านหลัง", "emoji": "🔄", "w": 429, "h": 1013, "items": [{"id": "b-hair", "c": "頭髮", "j": "tau4 faat3", "th": "ผม", "x": 172, "y": 72, "side": "L"}, {"id": "b-neck", "c": "後頸", "j": "hau6 geng2", "th": "ต้นคอด้านหลัง", "x": 210, "y": 178, "side": "R"}, {"id": "b-shoulder", "c": "膊頭", "j": "bok3 tau2", "th": "ไหล่", "x": 118, "y": 222, "side": "L"}, {"id": "b-arm", "c": "手臂", "j": "sau2 bei3", "th": "แขน", "x": 326, "y": 300, "side": "R"}, {"id": "b-spine", "c": "背脊", "j": "bui3 zek3", "th": "หลัง", "x": 214, "y": 372, "side": "R"}, {"id": "b-elbow", "c": "手踭", "j": "sau2 zaang1", "th": "ข้อศอก", "x": 88, "y": 392, "side": "L"}, {"id": "b-waist", "c": "腰", "j": "jiu1", "th": "เอว", "x": 260, "y": 404, "side": "R"}, {"id": "b-hand", "c": "手背", "j": "sau2 bui3", "th": "หลังมือ", "x": 30, "y": 540, "side": "L"}, {"id": "b-butt", "c": "屁股", "j": "pei3 gu2", "th": "ก้น", "x": 268, "y": 512, "side": "R"}, {"id": "b-thigh", "c": "大腿", "j": "daai6 teoi2", "th": "ต้นขา", "x": 150, "y": 650, "side": "L"}, {"id": "b-knee", "c": "膝頭窩", "j": "sat1 tau4 wo1", "th": "ข้อพับเข่า", "x": 262, "y": 745, "side": "R"}, {"id": "b-calf", "c": "腿肚", "j": "teoi2 tou5", "th": "น่อง", "x": 140, "y": 860, "side": "L"}, {"id": "b-heel", "c": "腳踭", "j": "goek3 zaang1", "th": "ส้นเท้า", "x": 286, "y": 985, "side": "R"}]}, "lr": {"outer": {"shoulder": {"imgL": [128, 213], "imgR": [300, 213]}, "elbow": {"imgL": [100, 365], "imgR": [328, 365]}, "hand": {"imgL": [48, 512], "imgR": [380, 512]}, "knee": {"imgL": [165, 690], "imgR": [263, 690]}, "foot": {"imgL": [140, 968], "imgR": [288, 968]}}, "back": {"shoulder": {"imgL": [118, 222], "imgR": [310, 222]}, "elbow": {"imgL": [88, 392], "imgR": [340, 392]}, "hand": {"imgL": [30, 540], "imgR": [398, 538]}, "knee": {"imgL": [155, 745], "imgR": [262, 745]}, "foot": {"imgL": [140, 985], "imgR": [286, 985]}}}};
const LAYERS = ['outer','back','skeleton','organs'];
const VIEWS  = ['outer','back','skeleton','organs','xray'];
const $ = id => document.getElementById(id);
// 粵拼用全站統一嘅 <ruby class="jr"><rt data-j>（由全站引擎排版、開閂）
function rubyCh(ch,r){return r?'<ruby class="jr">'+ch+'<rt data-j="'+r+'"></rt></ruby>':ch;}

/* ═════════ 工具 ═════════ */
function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');}
// 粵拼逐個字對齊喺字上面（"_" 代表冇粵拼，例如 /）
function ruby(c,j){const js=String(j||'').split(' ');return [...c].map((ch,i)=>rubyCh(ch,(js[i]&&js[i]!=='_')?js[i]:'')).join('');}
// 句子格式："字:粵拼 字詞:粵拼-粵拼 ，"（冇冒號 = 標點）
function sRuby(s){
  return s.split(/\s+/).filter(Boolean).map(tok=>{
    const k=tok.indexOf(':');
    if(k<0)return '<span class="pn">'+tok+'</span>';
    const c=tok.slice(0,k),js=tok.slice(k+1).split('-');
    return [...c].map((ch,i)=>rubyCh(ch,(js[i]&&js[i]!=='_')?js[i]:'')).join('');
  }).join('');
}
function plain(s){return s.split(/\s+/).filter(Boolean).map(t=>t.split(':')[0]).join('');}
const T=(c,j)=>c+':'+String(j).replace(/ /g,'-');
function itemById(layer,id){return PARTS[layer].items.find(i=>i.id===id);}

/* ═════════ 語音 ═════════ */
const Speech={
  supported:'speechSynthesis' in window,voices:[],
  init(){if(!this.supported)return;const load=()=>{this.voices=speechSynthesis.getVoices();};load();speechSynthesis.addEventListener('voiceschanged',load);},
  speak(text,onEnd){
    if(!this.supported){if(onEnd)setTimeout(onEnd,600);return;}
    const go=()=>{
      const u=new SpeechSynthesisUtterance(text);
      const v=this.voices.find(v=>v.lang==='zh-HK')||this.voices.find(v=>/yue/i.test(v.lang))||this.voices.find(v=>v.lang==='zh-TW')||this.voices.find(v=>v.lang.startsWith('zh'));
      if(v)u.voice=v;u.lang=(v&&v.lang)||'zh-HK';u.rate=0.8;
      u.onend=onEnd||null;u.onerror=onEnd||null;
      speechSynthesis.speak(u);};
    let busy=false;try{busy=speechSynthesis.speaking||speechSynthesis.pending;}catch(e){}
    if(busy){speechSynthesis.cancel();setTimeout(go,80);}else go();   // Chrome：cancel 後即刻 speak 會被吞
  },
  stop(){if(this.supported)speechSynthesis.cancel();}
};

/* ═════════ 狀態 ═════════ */
const S={tab:'learn',view:'outer',showJyut:true,showThai:true,active:null,total:0,autoIdx:null,autoTimer:null,xray:0,lrView:'outer',lrActive:null};
Object.defineProperty(S,'showJyut',{get:()=>!host.classList.contains('hide-jy')});
Object.defineProperty(S,'showThai',{get:()=>!host.classList.contains('hide-th')});   // 跟頂部全站「粵拼／泰文」掣
const B={p:0,sym:'痛',deg:'好'};
const DP={i:null,k:0,timer:null};

function animateNumber(el,from,to,dur,suffix,prefix){
  let start=null;suffix=suffix||'';prefix=prefix||'';
  function step(ts){if(!start)start=ts;const p=Math.min((ts-start)/dur,1);el.textContent=prefix+Math.round(from+(to-from)*p)+suffix;if(p<1)requestAnimationFrame(step);}
  requestAnimationFrame(step);
}
function addTotal(n){logHist(n,'bd');}   // 完成一輪 → 寫入得分紀錄（分數已逐題計入 ★）

/* ═════════ 箭嘴 SVG ═════════ */
function arrowSvg(x1,y1,x2,y2,id,cls){
  const dx=x2-x1,dy=y2-y1,len=Math.hypot(dx,dy)||1,ux=dx/len,uy=dy/len;
  const ex=x2-ux*7,ey=y2-uy*7;
  const bx=ex-ux*16,by=ey-uy*16;
  const hw=9;
  const f=n=>n.toFixed(1);
  const p1=f(bx-uy*hw)+','+f(by+ux*hw);
  const p2=f(bx+uy*hw)+','+f(by-ux*hw);
  return '<g class="arr '+(cls||'')+'" data-id="'+id+'">'
    +'<line class="halo" x1="'+f(x1)+'" y1="'+f(y1)+'" x2="'+f(bx)+'" y2="'+f(by)+'"/>'
    +'<line class="main" x1="'+f(x1)+'" y1="'+f(y1)+'" x2="'+f(bx)+'" y2="'+f(by)+'"/>'
    +'<polygon class="head" points="'+f(ex)+','+f(ey)+' '+p1+' '+p2+'"/>'
    +'<circle class="dot" cx="'+f(x2)+'" cy="'+f(y2)+'" r="4.5"/>'
    +'<circle class="ring" cx="'+f(x2)+'" cy="'+f(y2)+'" r="16"/></g>';
}
function imgTag(layer,sw){
  const L=PARTS[layer],ox=(sw-L.w)/2;
  return '<img class="bd-img" alt="" src="'+BD_IMGS[layer]+'" style="left:'+(ox/sw*100).toFixed(3)+'%;width:'+(L.w/sw*100).toFixed(3)+'%">';
}
/* 標籤排位：逼得太近就左右對稱推開，唔重疊，盡量貼近目標位置 */
function layoutLabels(items,H,gap){
  const out={},min=gap/2,max=H-gap/2;
  ['L','R'].forEach(side=>{
    const a=items.filter(i=>i.side===side).sort((p,q)=>p.y-q.y);
    const ys=a.map(i=>Math.min(max,Math.max(min,i.y)));
    for(let n=0;n<500;n++){
      let moved=false;
      for(let k=1;k<ys.length;k++){const d=ys[k]-ys[k-1];if(d<gap-0.01){const m=(gap-d)/2;ys[k-1]-=m;ys[k]+=m;moved=true;}}
      for(let k=0;k<ys.length;k++)ys[k]=Math.min(max,Math.max(min,ys[k]));
      if(!moved)break;
    }
    for(let k=1;k<ys.length;k++)if(ys[k]<ys[k-1]+gap)ys[k]=ys[k-1]+gap;
    for(let k=ys.length-1;k>=0;k--){const lim=k===ys.length-1?max:ys[k+1]-gap;if(ys[k]>lim)ys[k]=lim;}
    a.forEach((it,k)=>out[it.id]=ys[k]);
  });
  return out;
}
/* 有箭嘴同標籤嘅圖（部位／左右都用呢個）*/
function stageHtml(layer,items,handler,activeId,stageId){
  const L=PARTS[layer],ox=166,SWl=L.w+2*ox,H=L.h;
  const gap=S.showThai?72:54;
  const ys=layoutLabels(items,H,gap);
  let svg='',labs='';
  items.forEach(it=>{
    const ly=ys[it.id],tx=ox+it.x,ty=it.y,on=activeId===it.id;
    const sx=it.side==='L'?ox-10:ox+L.w+10;
    svg+=arrowSvg(sx,ly,tx,ty,it.id,on?'on':'');
    const left=it.side==='L'?2:ox+L.w+14;
    const w=it.side==='L'?ox-16:SWl-2-(ox+L.w+14);
    labs+='<div class="bd-lab '+it.side+(on?' on':'')+'" data-id="'+it.id+'" onclick="BD.'+handler+'(\''+it.id+'\')" style="top:'+(ly/H*100).toFixed(3)+'%;left:'+(left/SWl*100).toFixed(3)+'%;width:'+(w/SWl*100).toFixed(3)+'%">'
      +'<div class="zh">'+ruby(it.c,it.j)+'</div><div class="th">'+it.th+'</div></div>';
  });
  return '<div class="bd-wrap"><div class="bd-stage" id="'+stageId+'" style="--sw:'+SWl+';aspect-ratio:'+SWl+'/'+H+'">'
    +imgTag(layer,SWl)
    +'<svg class="bd-svg" viewBox="0 0 '+SWl+' '+H+'" preserveAspectRatio="none">'+svg+'</svg>'
    +labs+'</div></div>';
}
function hl(scopeSel,id){
  const root=document.querySelector(scopeSel);if(!root)return;
  root.querySelectorAll('[data-id]').forEach(el=>{
    const on=el.getAttribute('data-id')===id;
    if(el.classList.contains('arr'))el.setAttribute('class','arr'+(on?' on':''));
    else el.classList.toggle('on',on);
  });
}

/* ═════════ 內容資料 ═════════ */
// 身體量詞
const CLS=[{c:'對',j:'deoi3'},{c:'隻',j:'zek3'},{c:'個',j:'go3'},{c:'條',j:'tiu4'},{c:'張',j:'zoeng1'},{c:'塊',j:'faai3'},{c:'口',j:'hau2'},{c:'頭',j:'tau4'}];
const CL=[
 {c:'頭',j:'tau4',th:'หัว',cl:'個',clj:'go3',hint:'หัว (ทั่วไป)'},
 {c:'眼',j:'ngaan5',th:'ตา',cl:'對',clj:'deoi3',hint:'ตาสองข้าง (คู่)'},
 {c:'眼',j:'ngaan5',th:'ตา',cl:'隻',clj:'zek3',hint:'ตาข้างเดียว'},
 {c:'耳仔',j:'ji5 zai2',th:'หู',cl:'對',clj:'deoi3',hint:'หูสองข้าง (คู่)'},
 {c:'鼻哥',j:'bei6 go1',th:'จมูก',cl:'個',clj:'go3',hint:'จมูก'},
 {c:'嘴',j:'zeoi2',th:'ปาก',cl:'張',clj:'zoeng1',hint:'ปาก',alt:['個']},
 {c:'牙',j:'ngaa4',th:'ฟัน',cl:'隻',clj:'zek3',hint:'ฟันซี่เดียว'},
 {c:'牙',j:'ngaa4',th:'ฟัน',cl:'口',clj:'hau2',hint:'ฟันทั้งปาก'},
 {c:'頭髮',j:'tau4 faat3',th:'ผม',cl:'頭',clj:'tau4',hint:'ผมทั้งหัว'},
 {c:'頸',j:'geng2',th:'คอ',cl:'條',clj:'tiu4',hint:'คอ'},
 {c:'手',j:'sau2',th:'มือ',cl:'隻',clj:'zek3',hint:'มือข้างเดียว'},
 {c:'手臂',j:'sau2 bei3',th:'แขน',cl:'條',clj:'tiu4',hint:'แขนข้างเดียว',alt:['隻']},
 {c:'手指',j:'sau2 zi2',th:'นิ้วมือ',cl:'隻',clj:'zek3',hint:'นิ้วมือหนึ่งนิ้ว',alt:['條']},
 {c:'腳',j:'goek3',th:'เท้า/ขา',cl:'隻',clj:'zek3',hint:'เท้าหรือขาข้างเดียว'},
 {c:'腳趾',j:'goek3 zi2',th:'นิ้วเท้า',cl:'隻',clj:'zek3',hint:'นิ้วเท้าหนึ่งนิ้ว',alt:['條']},
 {c:'膝頭哥',j:'sat1 tau4 go1',th:'หัวเข่า',cl:'個',clj:'go3',hint:'หัวเข่าข้างเดียว',alt:['隻']},
 {c:'膝頭哥',j:'sat1 tau4 go1',th:'หัวเข่า',cl:'對',clj:'deoi3',hint:'หัวเข่าสองข้าง (คู่)'},
 {c:'肚',j:'tou5',th:'ท้อง',cl:'個',clj:'go3',hint:'ท้อง'},
 {c:'腰',j:'jiu1',th:'เอว',cl:'條',clj:'tiu4',hint:'เอว'},
 {c:'背脊',j:'bui3 zek3',th:'หลัง',cl:'條',clj:'tiu4',hint:'หลัง/กระดูกสันหลัง'},
 {c:'屁股',j:'pei3 gu2',th:'ก้น',cl:'個',clj:'go3',hint:'ก้น'},
 {c:'肺',j:'fai3',th:'ปอด',cl:'對',clj:'deoi3',hint:'ปอดสองข้าง (คู่)'},
 {c:'胃',j:'wai6',th:'กระเพาะอาหาร',cl:'個',clj:'go3',hint:'กระเพาะอาหาร'},
 {c:'腸',j:'coeng2',th:'ลำไส้',cl:'條',clj:'tiu4',hint:'ลำไส้'},
 {c:'血管',j:'hyut3 gun2',th:'หลอดเลือด',cl:'條',clj:'tiu4',hint:'หลอดเลือด'},
 {c:'面',j:'min6',th:'ใบหน้า',cl:'塊',clj:'faai3',hint:'ใบหน้า',alt:['個','張']}
].map((e,i)=>Object.assign({id:i},e));
const CL_GROUPS=[
 ['對','deoi3','คู่ — ใช้กับสิ่งที่มีเป็นคู่ เช่น ตา หู ปอด หัวเข่า (一對 = 2 ข้าง)',['對']],
 ['隻','zek3','ข้าง / ชิ้น — ใช้กับอวัยวะที่แยกเป็นข้างหรือเป็นชิ้น เช่น มือ เท้า ฟัน นิ้ว',['隻']],
 ['個','go3','ใช้ทั่วไป — หัว จมูก ท้อง ก้น กระเพาะอาหาร',['個']],
 ['條','tiu4','ของยาว ๆ — คอ แขน เอว หลัง ลำไส้ หลอดเลือด',['條']],
 ['其他','','ใช้เฉพาะ — 一張嘴 (ปาก) 一塊面 (หน้า) 一口牙 (ฟันทั้งปาก) 一頭頭髮 (ผมทั้งหัว)',['張','塊','口','頭']]
];
const HAVE=[
 ['我:ngo5 有:jau5 一:jat1 個:go3 頭:tau4 。','ฉันมีหัวหนึ่งหัว'],
 ['我:ngo5 有:jau5 兩:loeng5 隻:zek3 眼:ngaan5 。','ฉันมีตาสองข้าง'],
 ['我:ngo5 有:jau5 兩:loeng5 隻:zek3 耳仔:ji5-zai2 。','ฉันมีหูสองข้าง'],
 ['我:ngo5 有:jau5 一:jat1 個:go3 鼻哥:bei6-go1 。','ฉันมีจมูกหนึ่งอัน'],
 ['我:ngo5 有:jau5 一:jat1 張:zoeng1 嘴:zeoi2 。','ฉันมีปากหนึ่งปาก'],
 ['我:ngo5 有:jau5 一:jat1 條:tiu4 頸:geng2 。','ฉันมีคอหนึ่งอัน'],
 ['我:ngo5 有:jau5 兩:loeng5 隻:zek3 手:sau2 ， 兩:loeng5 隻:zek3 腳:goek3 。','ฉันมีสองมือ สองเท้า'],
 ['我:ngo5 有:jau5 十:sap6 隻:zek3 手指:sau2-zi2 ， 十:sap6 隻:zek3 腳趾:goek3-zi2 。','ฉันมีนิ้วมือสิบนิ้ว นิ้วเท้าสิบนิ้ว'],
 ['我:ngo5 有:jau5 一:jat1 口:hau2 牙:ngaa4 。','ฉันมีฟันเต็มปาก'],
 ['我:ngo5 有:jau5 一:jat1 頭:tau4 頭髮:tau4-faat3 。','ฉันมีผมเต็มหัว']
];
const NUMS=[['一','jat1','1'],['兩','loeng5','2'],['三','saam1','3'],['四','sei3','4'],['五','ng5','5'],['十','sap6','10']];

// 「我個頭好痛」句式工廠（cl = 我＋量詞＋部位）
const BP=[
 {c:'頭',j:'tau4',th:'หัว',cl:'個',clj:'go3',v:'ปวด',sym:['痛','暈']},
 {c:'眼',j:'ngaan5',th:'ตา',cl:'對',clj:'deoi3',v:'เจ็บ',sym:['痛','痕']},
 {c:'耳仔',j:'ji5 zai2',th:'หู',cl:'隻',clj:'zek3',v:'เจ็บ',sym:['痛']},
 {c:'鼻哥',j:'bei6 go1',th:'จมูก',cl:'個',clj:'go3',v:'เจ็บ',sym:['痛']},
 {c:'嘴',j:'zeoi2',th:'ปาก',cl:'個',clj:'go3',v:'เจ็บ',sym:['痛']},
 {c:'牙',j:'ngaa4',th:'ฟัน',cl:'隻',clj:'zek3',v:'ปวด',sym:['痛']},
 {c:'頸',j:'geng2',th:'คอ',cl:'條',clj:'tiu4',v:'เจ็บ',sym:['痛','酸']},
 {c:'膊頭',j:'bok3 tau2',th:'ไหล่',cl:'個',clj:'go3',v:'เจ็บ',sym:['痛','酸']},
 {c:'手臂',j:'sau2 bei3',th:'แขน',cl:'條',clj:'tiu4',v:'เจ็บ',sym:['痛','酸','麻']},
 {c:'手踭',j:'sau2 zaang1',th:'ข้อศอก',cl:'隻',clj:'zek3',v:'เจ็บ',sym:['痛','酸']},
 {c:'手',j:'sau2',th:'มือ',cl:'隻',clj:'zek3',v:'เจ็บ',sym:['痛','麻','痕']},
 {c:'手指',j:'sau2 zi2',th:'นิ้วมือ',cl:'隻',clj:'zek3',v:'เจ็บ',sym:['痛','麻']},
 {c:'心口',j:'sam1 hau2',th:'หน้าอก',cl:'個',clj:'go3',v:'เจ็บ',sym:['痛']},
 {c:'肚',j:'tou5',th:'ท้อง',cl:'個',clj:'go3',v:'ปวด',sym:['痛']},
 {c:'腰',j:'jiu1',th:'เอว',cl:'條',clj:'tiu4',v:'ปวด',sym:['痛','酸']},
 {c:'背脊',j:'bui3 zek3',th:'หลัง',cl:'條',clj:'tiu4',v:'ปวด',sym:['痛','酸']},
 {c:'屁股',j:'pei3 gu2',th:'ก้น',cl:'個',clj:'go3',v:'เจ็บ',sym:['痛']},
 {c:'大腿',j:'daai6 teoi2',th:'ต้นขา',cl:'條',clj:'tiu4',v:'เจ็บ',sym:['痛','酸']},
 {c:'膝頭哥',j:'sat1 tau4 go1',th:'หัวเข่า',cl:'個',clj:'go3',v:'เจ็บ',sym:['痛','酸']},
 {c:'腳',j:'goek3',th:'เท้า',cl:'隻',clj:'zek3',v:'เจ็บ',sym:['痛','酸','麻','痕']},
 {c:'腳趾',j:'goek3 zi2',th:'นิ้วเท้า',cl:'隻',clj:'zek3',v:'เจ็บ',sym:['痛','麻']}
];
const SYMJ={'痛':'tung3','酸':'syun1','麻':'maa4','痕':'han4','暈':'wan4'};
const SYMTH={'痛':'เจ็บ/ปวด','酸':'เมื่อย','麻':'ชา','痕':'คัน','暈':'เวียน'};
function bThai(p,sym,deg){
  const dg=deg==='好'?'มาก':'นิดหน่อย';
  if(sym==='痛')return 'ฉัน'+p.v+p.th+dg;
  if(sym==='酸')return 'ฉันเมื่อย'+p.th+dg;
  if(sym==='暈')return 'ฉันเวียนหัว'+dg;
  if(sym==='麻')return p.th+'ของฉันชา'+dg;
  return p.th+'ของฉันคัน'+dg;
}
function bSentence(){
  const p=BP[B.p];
  return ['我:ngo5',T(p.cl,p.clj),T(p.c,p.j),T(B.deg,B.deg==='好'?'hou2':'jau5 di1'),T(B.sym,SYMJ[B.sym]),'。'].join(' ');
}

// 例句（[粵語句子, 泰文]）
const ASK=[
 ['你:nei5 邊度:bin1-dou6 唔舒服:m4-syu1-fuk6 呀:aa3 ？','คุณไม่สบายตรงไหน?'],
 ['邊度:bin1-dou6 痛:tung3 呀:aa3 ？','เจ็บตรงไหน?'],
 ['邊:bin1 隻:zek3 手:sau2 痛:tung3 呀:aa3 ？','มือข้างไหนเจ็บ?'],
 ['痛:tung3 唔:m4 痛:tung3 呀:aa3 ？','เจ็บไหม?'],
 ['呢度:ni1-dou6 痛:tung3 唔:m4 痛:tung3 ？','ตรงนี้เจ็บไหม?'],
 ['痛:tung3 咗:zo2 幾耐:gei2-noi6 呀:aa3 ？','เจ็บมานานแค่ไหนแล้ว?'],
 ['有:jau5 幾:gei2 痛:tung3 呀:aa3 ？','เจ็บมากแค่ไหน?'],
 ['你:nei5 有:jau5 冇:mou5 跌親:dit3-can1 呀:aa3 ？','คุณล้มหรือเปล่า?'],
 ['你:nei5 覺得:gok3-dak1 點:dim2 呀:aa3 ？','รู้สึกยังไงบ้าง?'],
 ['有:jau5 冇:mou5 發燒:faat3-siu1 呀:aa3 ？','มีไข้ไหม?'],
 ['你:nei5 有:jau5 冇:mou5 頭暈:tau4-wan4 呀:aa3 ？','เวียนหัวไหม?'],
 ['食:sik6 咗:zo2 藥:joek6 未:mei6 呀:aa3 ？','กินยาหรือยัง?']
];
const SAY=[
 ['我:ngo5 個:go3 頭:tau4 好:hou2 痛:tung3 。','ฉันปวดหัวมาก'],
 ['我:ngo5 個:go3 肚:tou5 好:hou2 痛:tung3 。','ฉันปวดท้องมาก'],
 ['我:ngo5 隻:zek3 腳:goek3 好:hou2 痛:tung3 。','เท้า/ขาของฉันเจ็บมาก'],
 ['我:ngo5 條:tiu4 腰:jiu1 好:hou2 痛:tung3 。','ฉันปวดเอวมาก'],
 ['我:ngo5 個:go3 膝頭哥:sat1-tau4-go1 好:hou2 痛:tung3 。','หัวเข่าของฉันเจ็บมาก'],
 ['我:ngo5 條:tiu4 頸:geng2 好:hou2 痛:tung3 。','คอของฉันเจ็บมาก'],
 ['我:ngo5 條:tiu4 背脊:bui3-zek3 好:hou2 痛:tung3 。','ฉันปวดหลังมาก'],
 ['我:ngo5 隻:zek3 手踭:sau2-zaang1 有:jau5 啲:di1 痛:tung3 。','ข้อศอกของฉันเจ็บนิดหน่อย'],
 ['我:ngo5 隻:zek3 牙:ngaa4 好:hou2 痛:tung3 。','ฉันปวดฟันมาก'],
 ['我:ngo5 隻:zek3 耳仔:ji5-zai2 好:hou2 痛:tung3 。','หูของฉันเจ็บมาก'],
 ['我:ngo5 個:go3 屁股:pei3-gu2 好:hou2 痛:tung3 。','ก้นของฉันเจ็บมาก'],
 ['我:ngo5 個:go3 心口:sam1-hau2 好:hou2 痛:tung3 。','ฉันเจ็บหน้าอกมาก']
];
const OTHER=[
 ['我:ngo5 好:hou2 頭暈:tau4-wan4 。','ฉันเวียนหัวมาก'],
 ['我:ngo5 發燒:faat3-siu1 。','ฉันมีไข้'],
 ['我:ngo5 覺得:gok3-dak1 好:hou2 熱:jit6 。','ฉันรู้สึกร้อนมาก'],
 ['我:ngo5 覺得:gok3-dak1 好:hou2 冷:laang5 。','ฉันรู้สึกหนาวมาก'],
 ['我:ngo5 想:soeng2 嘔:au2 。','ฉันคลื่นไส้'],
 ['我:ngo5 肚屙:tou5-o1 。','ฉันท้องเสีย'],
 ['我:ngo5 冇:mou5 胃口:wai6-hau2 。','ฉันเบื่ออาหาร'],
 ['我:ngo5 好:hou2 攰:gui6 。','ฉันเหนื่อยมาก'],
 ['我:ngo5 冇:mou5 力:lik6 。','ฉันไม่มีแรง'],
 ['我:ngo5 咳:kat1 咗:zo2 兩:loeng5 日:jat6 。','ฉันไอมาสองวันแล้ว'],
 ['我:ngo5 流:lau4 鼻水:bei6-seoi2 。','ฉันน้ำมูกไหล'],
 ['我:ngo5 隻:zek3 手:sau2 腫:zung2 咗:zo2 。','มือของฉันบวม'],
 ['我:ngo5 隻:zek3 腳:goek3 好:hou2 麻:maa4 。','เท้าของฉันชามาก'],
 ['我:ngo5 隻:zek3 腳:goek3 好:hou2 酸:syun1 。','ขาของฉันเมื่อยมาก'],
 ['我:ngo5 隻:zek3 手:sau2 好:hou2 痕:han4 。','มือของฉันคันมาก'],
 ['我:ngo5 隻:zek3 腳:goek3 瘀:jyu1 咗:zo2 。','ขาของฉันช้ำ'],
 ['我:ngo5 隻:zek3 手:sau2 流:lau4 血:hyut3 。','มือของฉันเลือดออก'],
 ['我:ngo5 跌:dit3 咗:zo2 一交:jat1-gaau1 。','ฉันล้ม'],
 ['我:ngo5 透:tau3 唔:m4 到:dou3 氣:hei3 。','ฉันหายใจไม่ออก']
];
const DEG=[
 ['有:jau5 啲:di1 痛:tung3 。','เจ็บนิดหน่อย'],
 ['好:hou2 痛:tung3 。','เจ็บมาก'],
 ['痛:tung3 到:dou3 唔:m4 得:dak1 。','เจ็บจนทนไม่ไหว'],
 ['唔:m4 係:hai6 好:hou2 痛:tung3 。','ไม่ค่อยเจ็บ'],
 ['唔:m4 痛:tung3 。','ไม่เจ็บ'],
 ['痛:tung3 咗:zo2 兩:loeng5 日:jat6 。','เจ็บมาสองวันแล้ว'],
 ['今朝:gam1-ziu1 開始:hoi1-ci2 痛:tung3 。','เริ่มเจ็บตั้งแต่เช้านี้'],
 ['痛:tung3 咗:zo2 好:hou2 耐:noi6 。','เจ็บมานานแล้ว'],
 ['一陣:jat1-zan6 痛:tung3 ， 一陣:jat1-zan6 唔:m4 痛:tung3 。','เจ็บบ้างไม่เจ็บบ้าง']
];
const CARE=[
 ['你:nei5 唔好:m4-hou2 郁:juk1 。','อย่าขยับนะ'],
 ['慢慢:maan6-maan6 嚟:lai4 。','ค่อย ๆ นะ'],
 ['細心:sai3-sam1 啲:di1 。','ระวังหน่อยนะ'],
 ['我:ngo5 扶:fu4 你:nei5 起身:hei2-san1 。','ฉันพยุงคุณลุกขึ้น'],
 ['我:ngo5 幫:bong1 你:nei5 探熱:taam3-jit6 。','ฉันวัดไข้ให้'],
 ['你:nei5 瞓:fan3 一陣:jat1-zan6 。','คุณนอนพักสักครู่'],
 ['飲:jam2 多:do1 啲:di1 水:seoi2 。','ดื่มน้ำเยอะ ๆ'],
 ['我哋:ngo5-dei6 去:heoi3 睇:tai2 醫生:ji1-sang1 。','เราไปหาหมอกันนะ'],
 ['好:hou2 啲:di1 未:mei6 呀:aa3 ？','ดีขึ้นหรือยัง?'],
 ['好:hou2 啲:di1 喇:laa3 。','ดีขึ้นแล้ว'],
 ['叫:giu3 救護車:gau3-wu6-ce1 。','เรียกรถพยาบาล']
];
// 對話：C = 照顧者，P = 老人家
const DLG=[
 {t:'頭痛、頭暈',th:'ปวดหัว เวียนหัว มีไข้',e:'👵',who:'婆婆',lines:[
  ['C','婆婆:po4-po2 ， 你:nei5 邊度:bin1-dou6 唔舒服:m4-syu1-fuk6 呀:aa3 ？','คุณยาย ไม่สบายตรงไหนคะ?'],
  ['P','我:ngo5 個:go3 頭:tau4 好:hou2 痛:tung3 ， 仲:zung6 有:jau5 啲:di1 暈:wan4 。','ฉันปวดหัวมาก แล้วก็เวียนหัวนิดหน่อย'],
  ['C','你:nei5 有:jau5 冇:mou5 發燒:faat3-siu1 呀:aa3 ？ 我:ngo5 幫:bong1 你:nei5 探熱:taam3-jit6 。','มีไข้ไหมคะ? หนูวัดไข้ให้นะ'],
  ['P','好:hou2 呀:aa3 。','ได้จ้ะ'],
  ['C','三十八:saam1-sap6-baat3 度:dou6 ， 有:jau5 啲:di1 發燒:faat3-siu1 。','38 องศา มีไข้นิดหน่อยค่ะ'],
  ['C','你:nei5 瞓:fan3 一陣:jat1-zan6 ， 我:ngo5 拎:ling1 藥:joek6 畀:bei2 你:nei5 食:sik6 。','คุณนอนพักสักครู่ หนูเอายามาให้กินนะ'],
  ['P','唔該:m4-goi1 晒:saai3 。','ขอบใจมากนะ']
 ]},
 {t:'跌倒',th:'ล้ม เจ็บหัวเข่า ข้อศอก',e:'👴',who:'公公',lines:[
  ['C','公公:gung1-gung1 ， 你:nei5 有:jau5 冇:mou5 跌親:dit3-can1 呀:aa3 ？','คุณตา ล้มหรือเปล่าคะ?'],
  ['P','有:jau5 ， 我:ngo5 喺:hai2 廁所:ci3-so2 跌:dit3 咗:zo2 一交:jat1-gaau1 。','มี ฉันล้มในห้องน้ำ'],
  ['C','邊度:bin1-dou6 痛:tung3 呀:aa3 ？','เจ็บตรงไหนคะ?'],
  ['P','我:ngo5 個:go3 膝頭哥:sat1-tau4-go1 同:tung4 隻:zek3 手踭:sau2-zaang1 好:hou2 痛:tung3 。','หัวเข่ากับข้อศอกของฉันเจ็บมาก'],
  ['C','你:nei5 唔好:m4-hou2 郁:juk1 ， 我:ngo5 睇:tai2 下:haa5 。 呢度:ni1-dou6 痛:tung3 唔:m4 痛:tung3 ？','อย่าขยับนะคะ หนูดูให้ ตรงนี้เจ็บไหมคะ?'],
  ['P','好:hou2 痛:tung3 呀:aa3 ！','เจ็บมากเลย!'],
  ['C','我哋:ngo5-dei6 叫:giu3 救護車:gau3-wu6-ce1 ， 去:heoi3 醫院:ji1-jyun2 睇:tai2 醫生:ji1-sang1 。','เราเรียกรถพยาบาล ไปโรงพยาบาลหาหมอนะคะ']
 ]},
 {t:'發燒、頭暈、冇胃口',th:'ร้อน เวียนหัว คลื่นไส้ เบื่ออาหาร',e:'👵',who:'婆婆',lines:[
  ['P','我:ngo5 覺得:gok3-dak1 好:hou2 熱:jit6 ， 個:go3 頭:tau4 好:hou2 暈:wan4 ， 仲:zung6 想:soeng2 嘔:au2 。','ฉันรู้สึกร้อนมาก เวียนหัวมาก แล้วก็คลื่นไส้'],
  ['C','你:nei5 食:sik6 咗:zo2 飯:faan6 未:mei6 呀:aa3 ？','ทานข้าวหรือยังคะ?'],
  ['P','我:ngo5 冇:mou5 胃口:wai6-hau2 ， 食:sik6 唔:m4 落:lok6 。','ฉันเบื่ออาหาร กินไม่ลง'],
  ['C','你:nei5 飲:jam2 多:do1 啲:di1 水:seoi2 ， 食:sik6 完:jyun4 藥:joek6 再:zoi3 瞓:fan3 。','ดื่มน้ำเยอะ ๆ กินยาเสร็จแล้วค่อยนอนนะคะ'],
  ['P','我:ngo5 好:hou2 攰:gui6 ， 冇:mou5 力:lik6 。','ฉันเหนื่อยมาก ไม่มีแรง'],
  ['C','如果:jyu4-gwo2 仲係:zung6-hai6 好:hou2 暈:wan4 ， 就:zau6 要:jiu3 睇:tai2 醫生:ji1-sang1 。','ถ้ายังเวียนหัวมาก ก็ต้องไปหาหมอนะคะ']
 ]},
 {t:'肚痛、肚屙',th:'ปวดท้อง ท้องเสีย (ใช้ 上面/下面/左邊)',e:'👴',who:'公公',lines:[
  ['C','公公:gung1-gung1 ， 你:nei5 個:go3 肚:tou5 痛:tung3 唔:m4 痛:tung3 呀:aa3 ？','คุณตา ปวดท้องไหมคะ?'],
  ['P','痛:tung3 ， 痛:tung3 喺:hai2 呢度:ni1-dou6 。','เจ็บ เจ็บตรงนี้'],
  ['C','係:hai6 上面:soeng6-min6 定係:ding6-hai6 下面:haa6-min6 呀:aa3 ？','ข้างบนหรือข้างล่างคะ?'],
  ['P','下面:haa6-min6 ， 左邊:zo2-bin1 。','ข้างล่าง ฝั่งซ้าย'],
  ['C','你:nei5 有:jau5 冇:mou5 肚屙:tou5-o1 呀:aa3 ？','ท้องเสียไหมคะ?'],
  ['P','有:jau5 ， 今朝:gam1-ziu1 屙:o1 咗:zo2 三:saam1 次:ci3 。','มี เช้านี้ถ่ายสามครั้ง'],
  ['C','好:hou2 ， 我哋:ngo5-dei6 去:heoi3 睇:tai2 醫生:ji1-sang1 。','ค่ะ เราไปหาหมอกันนะคะ']
 ]},
 {t:'腰痛、腳麻',th:'ปวดเอว เท้าชา (ซ้าย/ขวา)',e:'👵',who:'婆婆',lines:[
  ['P','我:ngo5 條:tiu4 腰:jiu1 好:hou2 痛:tung3 ， 行:haang4 唔:m4 到:dou3 路:lou6 。','เอวฉันเจ็บมาก เดินไม่ไหว'],
  ['C','左邊:zo2-bin1 定係:ding6-hai6 右邊:jau6-bin1 呀:aa3 ？','ข้างซ้ายหรือข้างขวาคะ?'],
  ['P','右邊:jau6-bin1 ， 仲:zung6 有:jau5 隻:zek3 右:jau6 腳:goek3 好:hou2 麻:maa4 。','ข้างขวา แล้วเท้าขวาก็ชามากด้วย'],
  ['C','你:nei5 坐:co5 低:dai1 先:sin1 ， 我:ngo5 幫:bong1 你:nei5 搓:co1 下:haa5 。','นั่งลงก่อนนะคะ หนูนวดให้'],
  ['P','好:hou2 舒服:syu1-fuk6 呀:aa3 。','สบายจัง'],
  ['C','聽日:ting1-jat6 我哋:ngo5-dei6 去:heoi3 睇:tai2 醫生:ji1-sang1 。','พรุ่งนี้เราไปหาหมอนะคะ']
 ]},
 {t:'心口痛（緊急）',th:'เจ็บหน้าอก หายใจไม่ออก — ฉุกเฉิน',e:'👴',who:'公公',emergency:true,lines:[
  ['P','我:ngo5 個:go3 心口:sam1-hau2 好:hou2 痛:tung3 ， 透:tau3 唔:m4 到:dou3 氣:hei3 。','ฉันเจ็บหน้าอกมาก หายใจไม่ออก'],
  ['C','你:nei5 唔好:m4-hou2 郁:juk1 ， 坐:co5 低:dai1 先:sin1 。','อย่าขยับ นั่งลงก่อนนะคะ'],
  ['C','我:ngo5 即刻:zik1-hak1 打:daa2 九九九:gau2-gau2-gau2 ， 叫:giu3 救護車:gau3-wu6-ce1 ！','หนูโทร 999 เรียกรถพยาบาลเดี๋ยวนี้เลย!']
 ]}
];
// 配對題：邊類問題配邊類答案（type 唔同先會做干擾項）
const QA=[
 ['where','你:nei5 邊度:bin1-dou6 唔舒服:m4-syu1-fuk6 呀:aa3 ？','คุณไม่สบายตรงไหน?','我:ngo5 個:go3 肚:tou5 好:hou2 痛:tung3 。','ฉันปวดท้องมาก'],
 ['where','邊度:bin1-dou6 痛:tung3 呀:aa3 ？','เจ็บตรงไหน?','我:ngo5 個:go3 膝頭哥:sat1-tau4-go1 好:hou2 痛:tung3 。','หัวเข่าของฉันเจ็บมาก'],
 ['dur','痛:tung3 咗:zo2 幾耐:gei2-noi6 呀:aa3 ？','เจ็บมานานแค่ไหนแล้ว?','痛:tung3 咗:zo2 兩:loeng5 日:jat6 。','เจ็บมาสองวันแล้ว'],
 ['fever','你:nei5 有:jau5 冇:mou5 發燒:faat3-siu1 呀:aa3 ？','มีไข้ไหม?','有:jau5 ， 三十八:saam1-sap6-baat3 度:dou6 。','มี 38 องศา'],
 ['deg','有:jau5 幾:gei2 痛:tung3 呀:aa3 ？','เจ็บมากแค่ไหน?','痛:tung3 到:dou3 唔:m4 得:dak1 。','เจ็บจนทนไม่ไหว'],
 ['fall','你:nei5 有:jau5 冇:mou5 跌親:dit3-can1 呀:aa3 ？','คุณล้มหรือเปล่า?','有:jau5 ， 我:ngo5 跌:dit3 咗:zo2 一交:jat1-gaau1 。','มี ฉันล้ม'],
 ['med','食:sik6 咗:zo2 藥:joek6 未:mei6 呀:aa3 ？','กินยาหรือยัง?','食:sik6 咗:zo2 喇:laa3 。','กินแล้ว'],
 ['sleep','你:nei5 想:soeng2 唔:m4 想:soeng2 瞓:fan3 一陣:jat1-zan6 呀:aa3 ？','อยากนอนพักสักครู่ไหม?','想:soeng2 ， 我:ngo5 好:hou2 攰:gui6 。','อยาก ฉันเหนื่อยมาก']
];

// 左右（對稱部位）
const PAIRS=[
 {k:'shoulder',c:'膊頭',j:'bok3 tau2',th:'ไหล่'},
 {k:'elbow',c:'手踭',j:'sau2 zaang1',th:'ข้อศอก'},
 {k:'hand',c:'手',j:'sau2',th:'มือ',short:true},
 {k:'knee',c:'膝頭',j:'sat1 tau4',th:'หัวเข่า'},
 {k:'foot',c:'腳',j:'goek3',th:'เท้า',short:true}
];
function lrName(p,side){
  const sj=side==='L'?'zo2':'jau6',sc=side==='L'?'左':'右',st=side==='L'?'ซ้าย':'ขวา';
  return {c:sc+p.c,j:sj+' '+p.j,th:p.th+st};
}
function imgSideOf(view,side){return ((view==='outer')===(side==='R'))?'imgL':'imgR';}  // 正面：人嘅右手喺圖左邊；背面相反
function lrItems(view){
  const items=[];
  PAIRS.forEach(p=>['L','R'].forEach(side=>{
    const is=imgSideOf(view,side),pt=PARTS.lr[view][p.k][is],n=lrName(p,side);
    items.push({id:'lr-'+p.k+side,c:n.c,j:n.j,th:n.th,x:pt[0],y:pt[1],side:is==='imgL'?'L':'R'});
  }));
  return items;
}
const DIRW=[
 {c:'左',j:'zo2',th:'ซ้าย'},{c:'右',j:'jau6',th:'ขวา'},
 {c:'左邊',j:'zo2 bin1',th:'ด้านซ้าย'},{c:'右邊',j:'jau6 bin1',th:'ด้านขวา'},
 {c:'兩邊',j:'loeng5 bin1',th:'ทั้งสองข้าง'},
 {c:'前面',j:'cin4 min6',th:'ข้างหน้า'},{c:'後面',j:'hau6 min6',th:'ข้างหลัง'},
 {c:'上面',j:'soeng6 min6',th:'ข้างบน'},{c:'下面',j:'haa6 min6',th:'ข้างล่าง'},
 {c:'入面',j:'jap6 min6',th:'ข้างใน'},{c:'出面',j:'ceot1 min6',th:'ข้างนอก'},
 {c:'中間',j:'zung1 gaan1',th:'ตรงกลาง'},{c:'隔離',j:'gaak3 lei4',th:'ข้าง ๆ'},
 {c:'手心',j:'sau2 sam1',th:'ฝ่ามือ'},{c:'手背',j:'sau2 bui3',th:'หลังมือ'},
 {c:'腳板底',j:'goek3 baan2 dai2',th:'ฝ่าเท้า'},{c:'腳背',j:'goek3 bui3',th:'หลังเท้า'}
];
const LRS=[
 ['我:ngo5 左手:zo2-sau2 好:hou2 痛:tung3 。','มือซ้ายของฉันเจ็บมาก'],
 ['我:ngo5 右腳:jau6-goek3 有:jau5 啲:di1 腫:zung2 。','เท้าขวาของฉันบวมนิดหน่อย'],
 ['左邊:zo2-bin1 膝頭哥:sat1-tau4-go1 好:hou2 痛:tung3 ， 右邊:jau6-bin1 唔:m4 痛:tung3 。','หัวเข่าซ้ายเจ็บมาก ข้างขวาไม่เจ็บ'],
 ['我:ngo5 兩:loeng5 隻:zek3 腳:goek3 都:dou1 好:hou2 酸:syun1 。','เท้า/ขาทั้งสองข้างของฉันเมื่อยมาก'],
 ['你:nei5 邊:bin1 隻:zek3 手:sau2 痛:tung3 呀:aa3 ？','มือข้างไหนของคุณเจ็บ?'],
 ['痛:tung3 喺:hai2 左邊:zo2-bin1 定係:ding6-hai6 右邊:jau6-bin1 呀:aa3 ？','เจ็บข้างซ้ายหรือข้างขวา?'],
 ['我:ngo5 隻:zek3 手背:sau2-bui3 好:hou2 痕:han4 。','หลังมือของฉันคันมาก'],
 ['我:ngo5 隻:zek3 腳踭:goek3-zaang1 好:hou2 痛:tung3 。','ส้นเท้าของฉันเจ็บมาก'],
 ['膝頭哥:sat1-tau4-go1 喺:hai2 前面:cin4-min6 ， 膝頭窩:sat1-tau4-wo1 喺:hai2 後面:hau6-min6 。','หัวเข่าอยู่ข้างหน้า ข้อพับเข่าอยู่ข้างหลัง'],
 ['肚:tou5 喺:hai2 前面:cin4-min6 ， 背脊:bui3-zek3 喺:hai2 後面:hau6-min6 。','ท้องอยู่ข้างหน้า หลังอยู่ข้างหลัง'],
 ['心:sam1 喺:hai2 入面:jap6-min6 ， 皮膚:pei4-fu1 喺:hai2 出面:ceot1-min6 。','หัวใจอยู่ข้างใน ผิวหนังอยู่ข้างนอก'],
 ['鼻哥:bei6-go1 喺:hai2 兩:loeng5 隻:zek3 眼:ngaan5 中間:zung1-gaan1 。','จมูกอยู่ตรงกลางระหว่างตาสองข้าง'],
 ['兩:loeng5 隻:zek3 耳仔:ji5-zai2 喺:hai2 個:go3 頭:tau4 嘅:ge3 兩邊:loeng5-bin1 。','หูสองข้างอยู่สองด้านของศีรษะ']
];
// 器官功能
const FN=[
 {g:'outer',e:'👁️',p:'眼',pj:'ngaan5',pth:'ตา',fs:'睇:tai2',v:'มอง'},
 {g:'outer',e:'👂',p:'耳仔',pj:'ji5 zai2',pth:'หู',fs:'聽:teng1',v:'ฟัง'},
 {g:'outer',e:'👃',p:'鼻哥',pj:'bei6 go1',pth:'จมูก',fs:'聞:man4',v:'ดมกลิ่น'},
 {g:'outer',e:'👄',p:'口',pj:'hau2',pth:'ปาก',fs:'講嘢:gong2-je5',v:'พูด'},
 {g:'outer',e:'👄',p:'口',pj:'hau2',pth:'ปาก',fs:'食嘢:sik6-je5',v:'กินอาหาร',nq:true},
 {g:'outer',e:'🦷',p:'牙',pj:'ngaa4',pth:'ฟัน',fs:'咬嘢:aau5-je5',v:'กัด/เคี้ยวของ'},
 {g:'outer',e:'✋',p:'手',pj:'sau2',pth:'มือ',fs:'拎嘢:ling1-je5',v:'หยิบจับของ'},
 {g:'outer',e:'🦶',p:'腳',pj:'goek3',pth:'เท้า',fs:'行路:haang4-lou6',v:'เดิน'},
 {g:'inner',e:'🧠',p:'腦',pj:'nou5',pth:'สมอง',fs:'諗嘢:nam2-je5',v:'คิด'},
 {g:'inner',e:'❤️',p:'心臟',pj:'sam1 zong6',pth:'หัวใจ',fs:'泵血:bang1-hyut3',v:'สูบฉีดเลือด'},
 {g:'inner',e:'🫁',p:'肺',pj:'fai3',pth:'ปอด',fs:'呼吸:fu1-kap1',v:'หายใจ'},
 {g:'inner',e:'🍽️',p:'胃',pj:'wai6',pth:'กระเพาะอาหาร',fs:'消化:siu1-faa3 食物:sik6-mat6',v:'ย่อยอาหาร'},
 {g:'inner',e:'🌀',p:'小腸',pj:'siu2 coeng2',pth:'ลำไส้เล็ก',fs:'吸收:kap1-sau1 營養:jing4-joeng5',v:'ดูดซึมสารอาหาร'},
 {g:'inner',e:'🧪',p:'肝',pj:'gon1',pth:'ตับ',fs:'解毒:gaai2-duk6',v:'ล้างพิษ'},
 {g:'inner',e:'🩸',p:'血管',pj:'hyut3 gun2',pth:'หลอดเลือด',fs:'運送:wan6-sung3 血液:hyut3-jik6',v:'ลำเลียงเลือด'},
 {g:'bone',e:'💀',p:'頭骨',pj:'tau4 gwat1',pth:'กะโหลกศีรษะ',fs:'保護:bou2-wu6 個:go3 腦:nou5',v:'ปกป้องสมอง'},
 {g:'bone',e:'🦴',p:'肋骨',pj:'lak6 gwat1',pth:'ซี่โครง',fs:'保護:bou2-wu6 心:sam1 同:tung4 肺:fai3',v:'ปกป้องหัวใจและปอด'},
 {g:'bone',e:'🦴',p:'脊骨',pj:'zek3 gwat1',pth:'กระดูกสันหลัง',fs:'撐住:caang3-zyu6 個:go3 身:san1',v:'ค้ำจุนร่างกาย'}
];
function fnSent(e){return T(e.p,e.pj)+' 用嚟:jung6-lai4 '+e.fs+' 。';}

/* ═════════ 例句行／對話 ═════════ */
function exRow(s,th){
  return '<div class="ex" onclick="BD.sayEx(this)" data-say="'+esc(plain(s))+'"><div><div class="zh">'+sRuby(s)+'</div><div class="th">'+th+'</div></div><button class="v-spk" tabindex="-1">🔊</button></div>';
}
function sayEx(el){
  stopAuto();stopDlg();
  document.querySelectorAll('.ex.on,.wd.on').forEach(e=>e.classList.remove('on'));
  el.classList.add('on');Speech.speak(el.dataset.say);
}
function wdCard(c,j,th){
  return '<div class="wd" onclick="BD.sayEx(this)" data-say="'+esc(c)+'"><div class="zh">'+ruby(c,j)+'</div><div class="th">'+th+'</div></div>';
}
function jump(id){const el=$(id);if(el)el.scrollIntoView({behavior:'smooth',block:'start'});}
function navBar(list){return '<div class="filter-bar">'+list.map(x=>'<button class="f-btn" onclick="BD.jump(\''+x[0]+'\')">'+x[1]+'</button>').join('')+'</div>';}
function goBtn(topic,label){return '<button class="next-btn" onclick="BD.goPractice(\''+topic+'\')">🎮 '+label+' ➜</button>';}

function dlgHtml(i){
  const d=DLG[i];
  const head='<div class="dlg-head"><div class="t">'+(i+1)+'. '+d.t+'<small>'+d.th+'</small></div><button class="play-btn" id="dlgBtn'+i+'" onclick="BD.playDlg('+i+')">▶ 播放對話</button></div>';
  const bubs=d.lines.map(l=>{
    const who=l[0]==='C'?'🧑‍⚕️ 照顧者 · ผู้ดูแล':d.e+' '+d.who;
    return '<div class="bub '+l[0]+'" onclick="BD.sayBub(this)" data-say="'+esc(plain(l[1]))+'"><div class="who">'+who+'</div><div class="zh">'+sRuby(l[1])+'</div><div class="th">'+l[2]+'</div></div>';
  }).join('');
  return head+'<div class="dlg" id="dlg'+i+'">'+bubs+'</div>'+(d.emergency?'<div class="warn">⚠️ 心口痛＋透唔到氣 = 緊急！要即刻打 999 叫救護車。 · เจ็บหน้าอกและหายใจไม่ออก = ฉุกเฉิน โทร 999 ทันที</div>':'');
}
function sayBub(el){
  stopDlg();stopAuto();
  document.querySelectorAll('.bub.on').forEach(e=>e.classList.remove('on'));
  el.classList.add('on');Speech.speak(el.dataset.say);
}
function playDlg(i){
  if(DP.i===i){stopDlg();return;}
  stopDlg();stopAuto();DP.i=i;DP.k=0;
  const b=$('dlgBtn'+i);if(b){b.textContent='■ 停止';b.classList.add('playing');}
  stepDlg();
}
function stepDlg(){
  if(DP.i===null)return;
  const bubs=document.querySelectorAll('#dlg'+DP.i+' .bub');
  if(DP.k>=bubs.length){stopDlg();return;}
  const b=bubs[DP.k];
  document.querySelectorAll('.bub.on').forEach(e=>e.classList.remove('on'));
  b.classList.add('on');
  const r=b.getBoundingClientRect();if(r.bottom>innerHeight-40||r.top<110)b.scrollIntoView({block:'center',behavior:'smooth'});
  Speech.speak(b.dataset.say,()=>{if(DP.i===null)return;DP.timer=setTimeout(()=>{if(DP.i===null)return;DP.k++;stepDlg();},450);});
}
function stopDlg(){
  const i=DP.i;DP.i=null;clearTimeout(DP.timer);
  if(i!==null){Speech.stop();const b=$('dlgBtn'+i);if(b){b.textContent='▶ 播放對話';b.classList.remove('playing');}}
}

/* ═════════ ① 部位學習頁 ═════════ */
function listHtml(layer){
  const items=[...PARTS[layer].items].sort((a,b)=>a.y-b.y);
  return '<div class="vocab-list">'+items.map(it=>
    '<div class="v-row'+(S.active===it.id?' on':'')+'" data-id="'+it.id+'" onclick="BD.pick(\''+it.id+'\')">'
    +'<div class="zh">'+ruby(it.c,it.j)+'</div><div class="th">'+it.th+'</div></div>').join('')+'</div>';
}
function stepBar(){
  const names={outer:['① 外觀','ด้านหน้า'],back:['② 背面','ด้านหลัง'],skeleton:['③ 骨骼','กระดูก'],organs:['④ 內臟','อวัยวะ'],xray:['🔍 透視','เอกซเรย์']};
  return '<div class="filter-bar">'+VIEWS.map(v=>
    '<button class="f-btn'+(S.view===v?' act':'')+'" onclick="BD.setView(\''+v+'\')">'+names[v][0]+'<small>'+names[v][1]+'</small></button>').join('')+'</div>';
}
function renderLearn(){
  stopAuto();
  const v=S.view;let html=stepBar();
  if(v==='xray'){
    html+='<div class="hint-box">拖動滑桿，由皮膚一層一層睇入去：外觀 → 內臟 → 骨骼（位置係大約對齊）。</div>'
      +'<div class="xr">'+['outer','organs','skeleton'].map(l=>'<img id="xr-'+l+'" alt="" src="'+BD_IMGS[l]+'">').join('')+'</div>'
      +'<div class="xr-ctl"><div class="xr-name" id="xrName"></div>'
      +'<input type="range" id="xrRange" min="0" max="100" step="1" value="'+S.xray+'" oninput="BD.setXray(+this.value)">'
      +'<div class="xr-btns"><button class="tog" onclick="BD.setXray(0)">外觀</button><button class="tog" onclick="BD.setXray(50)">內臟</button><button class="tog" onclick="BD.setXray(100)">骨骼</button></div></div>';
    html+='<button class="next-btn alt" onclick="BD.setView(\'outer\')">↺ 由頭再學一次</button>'
      +'<button class="next-btn" onclick="BD.showTab(\'pain\')">🩺 學埋「邊度痛？」➜</button>';
    $('page-learn').innerHTML=html;setXray(S.xray);return;
  }
  const idx=VIEWS.indexOf(v),next=VIEWS[idx+1];
  html+='<div class="toolbar"><button class="play-btn" id="autoBtn" onclick="BD.toggleAuto()">▶ 逐個播放</button><span class="sp"></span>'
    +'<span style="font-size:12px;color:var(--text-sub)">撳標籤可以聽發音</span></div>'
    +'<div class="learn-grid"><div class="stage-col">'+stageHtml(v,PARTS[v].items,'pick',S.active,'stage')+'</div>'
    +'<div class="list-col"><div class="sec" style="margin-top:4px">📋 '+PARTS[v].emoji+' '+PARTS[v].title+'詞彙（'+PARTS[v].items.length+'）</div>'+listHtml(v)+'</div></div>'
    +'<button class="next-btn" onclick="BD.setView(\''+next+'\')">'+(next==='xray'?'🔍 最後：透視睇晒三層':'下一層 ➜ '+({back:'背面 🔄',skeleton:'骨骼 🦴',organs:'內臟 🫀'}[next]))+'</button>'
    +goBtn('body','即刻練習：部位');
  $('page-learn').innerHTML=html;
}
function setView(v){S.view=v;S.active=null;renderLearn();window.scrollTo({top:0,behavior:'smooth'});}
function pick(id){
  if(S.autoIdx!==null)stopAuto();
  S.active=id;hl('#page-learn',id);
  const it=itemById(S.view,id);if(it)Speech.speak(it.say||it.c);
  const st=$('stage');
  if(st){const r=st.getBoundingClientRect();if(r.bottom<60||r.top>innerHeight-60)st.scrollIntoView({block:'center',behavior:'smooth'});}
}
function toggleAuto(){if(S.autoIdx!==null)stopAuto();else startAuto();}
function startAuto(){
  const items=[...PARTS[S.view].items].sort((a,b)=>a.y-b.y);
  S.autoIdx=0;const b=$('autoBtn');if(b){b.textContent='■ 停止';b.classList.add('playing');}
  (function step(){
    if(S.autoIdx===null)return;
    if(S.autoIdx>=items.length){stopAuto();return;}
    const it=items[S.autoIdx];
    S.active=it.id;hl('#page-learn',it.id);
    Speech.speak(it.say||it.c,()=>{if(S.autoIdx===null)return;S.autoTimer=setTimeout(()=>{if(S.autoIdx===null)return;S.autoIdx++;step();},700);});
  })();
}
function stopAuto(){
  const was=S.autoIdx!==null;S.autoIdx=null;clearTimeout(S.autoTimer);if(was)Speech.stop();
  const b=$('autoBtn');if(b){b.textContent='▶ 逐個播放';b.classList.remove('playing');}
}
function setXray(v){
  S.xray=v;
  const o=Math.max(0,1-v/50),k=Math.max(0,(v-50)/50),g=v<=50?v/50:(100-v)/50;
  const set=(id,op)=>{const e=$('xr-'+id);if(e)e.style.opacity=op.toFixed(3);};
  set('outer',o);set('organs',g);set('skeleton',k);
  const r=$('xrRange');if(r&&+r.value!==v)r.value=v;
  const n=$('xrName');
  if(n)n.innerHTML=v<25?ruby('外觀','ngoi6 gun1'):v<75?ruby('內臟','noi6 zong6'):ruby('骨骼','gwat1 gaak3');
}

/* ═════════ ② 邊度痛 ═════════ */
function builderInner(){
  const p=BP[B.p];
  if(!p.sym.includes(B.sym))B.sym=p.sym[0];
  const parts=BP.map((x,i)=>'<button class="chip'+(i===B.p?' on':'')+'" onclick="BD.bSet(\'p\','+i+')">'+ruby(x.c,x.j)+'</button>').join('');
  const syms=['痛','酸','麻','痕','暈'].map(s=>'<button class="chip'+(s===B.sym?' on':'')+(p.sym.includes(s)?'':' dis')+'" onclick="BD.bSet(\'sym\',\''+s+'\')">'+ruby(s,SYMJ[s])+'</button>').join('');
  const degs=[['好','hou2'],['有啲','jau5 di1']].map(d=>'<button class="chip'+(d[0]===B.deg?' on':'')+'" onclick="BD.bSet(\'deg\',\''+d[0]+'\')">'+ruby(d[0],d[1])+'</button>').join('');
  const s=bSentence();
  return '<div class="b-lab">① 揀部位 · เลือกอวัยวะ</div><div class="chips">'+parts+'</div>'
    +'<div class="b-lab">② 揀症狀 · อาการ（痛 เจ็บ／酸 เมื่อย／麻 ชา／痕 คัน／暈 เวียน）</div><div class="chips">'+syms+'</div>'
    +'<div class="b-lab">③ 揀程度 · ระดับ（好 มาก／有啲 นิดหน่อย）</div><div class="chips">'+degs+'</div>'
    +'<div class="b-out" onclick="BD.Speech.speak(\''+plain(s)+'\')"><div class="zh">'+sRuby(s)+'</div><div class="th">'+bThai(p,B.sym,B.deg)+'</div><button class="spk-big">🔊 聽發音</button></div>'
    +'<div style="text-align:center;margin-top:8px"><button class="tog" onclick="BD.bRandom()">🎲 隨機一句</button></div>';
}
function bSet(k,v){B[k]=v;$('builder').innerHTML=builderInner();}
function bRandom(){
  B.p=Math.floor(Math.random()*BP.length);
  const p=BP[B.p];B.sym=p.sym[Math.floor(Math.random()*p.sym.length)];B.deg=Math.random()<.6?'好':'有啲';
  $('builder').innerHTML=builderInner();Speech.speak(plain(bSentence()));
}
function exSection(id,title,th,list){
  return '<div class="sec" id="'+id+'">'+title+' <small>'+th+'</small></div><div class="ex-grid">'+list.map(x=>exRow(x[0],x[1])).join('')+'</div>';
}
function renderPain(){
  let h='<div class="note"><b>邊度唔舒服？</b> 句式：<b>我＋量詞＋部位＋好痛</b>（我個頭好痛）<span class="thn">โครงสร้างประโยค: 我 + ลักษณนาม + อวัยวะ + 好痛 — เรียนลักษณนามต่อที่แท็บ 🔢 量詞 · ใช้เล่นกับคุณยาย/คุณตาได้เลย</span></div>';
  h+=navBar([['pain-fac','🛠 句式工廠'],['pain-ask','❓ 問'],['pain-say','🗣 講邊度痛'],['pain-other','🤒 其他症狀'],['pain-deg','📏 程度／時間'],['pain-dlg','💬 對話'],['pain-care','🤝 照顧']]);
  h+='<div class="sec" id="pain-fac">🛠 句式工廠 <small>เลือกแล้วประโยคจะเปลี่ยนเอง</small></div><div id="builder">'+builderInner()+'</div>';
  h+=exSection('pain-ask','❓ 問：邊度唔舒服？','ถามอาการ',ASK);
  h+=exSection('pain-say','🗣 講：邊度痛','บอกว่าเจ็บตรงไหน',SAY);
  h+=exSection('pain-other','🤒 其他唔舒服','อาการอื่น ๆ',OTHER);
  h+=exSection('pain-deg','📏 痛嘅程度、幾耐','ระดับความเจ็บ ระยะเวลา',DEG);
  h+='<div class="sec" id="pain-dlg">💬 對話 <small>6 บทสนทนา — ผู้ดูแล 🧑‍⚕️ กับผู้สูงอายุ</small></div>';
  h+=DLG.map((d,i)=>dlgHtml(i)).join('');
  h+=exSection('pain-care','🤝 照顧用語','ประโยคที่ผู้ดูแลใช้บ่อย',CARE);
  h+=goBtn('pain','練習：邊度痛');
  $('page-pain').innerHTML=h;
}

/* ═════════ ③ 量詞 ═════════ */
function renderCL(){
  let h='<div class="note"><b>身體嘅量詞</b>：數字＋量詞＋部位，例如 <b>一對眼、一隻手、一隻腳、一個頭、一條頸</b>。<span class="thn">ตัวเลข + ลักษณนาม + อวัยวะ · 一對眼 = 兩隻眼 (一對 = 2 ข้าง)</span></div>';
  h+='<div class="sec">🔢 數字 <small>ตัวเลข</small></div><div class="wgrid">'+NUMS.map(n=>wdCard(n[0],n[1],n[2])).join('')+'</div>';
  CL_GROUPS.forEach(g=>{
    const list=CL.filter(e=>g[3].includes(e.cl));
    h+='<div class="cl-head"><div class="big">'+(g[1]?ruby(g[0],g[1]):g[0])+'</div><div class="exp">'+g[2]+'</div></div>';
    h+='<div class="ex-grid">'+list.map(e=>exRow('一:jat1 '+T(e.cl,e.clj)+' '+T(e.c,e.j),e.th+' · '+e.hint)).join('')+'</div>';
  });
  h+='<div class="sec">🙋 我有… <small>ฉันมี…</small></div><div class="ex-grid">'+HAVE.map(x=>exRow(x[0],x[1])).join('')+'</div>';
  h+=goBtn('cl','練習：量詞');
  $('page-cl').innerHTML=h;
}

/* ═════════ ④ 左右 ═════════ */
function lrStage(){return stageHtml(S.lrView,lrItems(S.lrView),'pickLR',S.lrActive,'lrStage');}
function renderLR(){
  let h='<div class="note"><b>左、右</b>係以<b>圖入面個人</b>做準。<b>睇正面</b>：佢嘅左手喺我哋嘅右邊；<b>睇背面</b>：佢嘅左手喺我哋嘅左邊。<span class="thn">ซ้าย/ขวา ดูจาก "ตัวคนในรูป": ด้านหน้า — มือซ้ายของเขาอยู่ฝั่งขวาของเรา · ด้านหลัง — มือซ้ายของเขาอยู่ฝั่งซ้ายของเรา</span></div>';
  h+='<div class="filter-bar"><button class="f-btn'+(S.lrView==='outer'?' act':'')+'" onclick="BD.setLR(\'outer\')">正面<small>ด้านหน้า</small></button><button class="f-btn'+(S.lrView==='back'?' act':'')+'" onclick="BD.setLR(\'back\')">背面<small>ด้านหลัง</small></button></div>';
  h+='<div id="lrBox">'+lrStage()+'</div>';
  h+='<div class="sec">🧭 方向詞 <small>คำบอกทิศทาง (ต่อจากหน้าทิศทาง)</small></div><div class="wgrid">'+DIRW.map(d=>wdCard(d.c,d.j,d.th)).join('')+'</div>';
  h+='<div class="sec">💬 例句 <small>ประโยคตัวอย่าง</small></div><div class="ex-grid">'+LRS.map(x=>exRow(x[0],x[1])).join('')+'</div>';
  h+=goBtn('lr','練習：左右');
  $('page-lr').innerHTML=h;
}
function setLR(v){S.lrView=v;S.lrActive=null;renderLR();}
function pickLR(id){
  S.lrActive=id;hl('#lrBox',id);
  const it=lrItems(S.lrView).find(x=>x.id===id);if(it)Speech.speak(it.c);
}

/* ═════════ ⑤ 功能 ═════════ */
function renderFN(){
  let h='<div class="note"><b>用嚟</b> = ใช้สำหรับ… 句式：<b>肺用嚟呼吸</b>、<b>眼用嚟睇</b>。<span class="thn">อวัยวะ + 用嚟 + กริยา = "…ใช้สำหรับ…" · 口 ใช้ทั้ง 講嘢 (พูด) และ 食嘢 (กิน)</span></div>';
  [['outer','👀 外觀嘅器官','อวัยวะภายนอก'],['inner','🫀 內臟','อวัยวะภายใน'],['bone','🦴 骨骼','กระดูก']].forEach(g=>{
    h+='<div class="sec">'+g[1]+' <small>'+g[2]+'</small></div><div class="ex-grid">';
    FN.filter(e=>e.g===g[0]).forEach(e=>{
      const s=fnSent(e);
      h+='<div class="ex" onclick="BD.sayEx(this)" data-say="'+esc(plain(s))+'"><div class="fn-card"><div class="em">'+e.e+'</div><div><div class="zh">'+sRuby(s)+'</div><div class="th">'+e.pth+'ใช้'+e.v+'</div></div></div><button class="v-spk" tabindex="-1">🔊</button></div>';
    });
    h+='</div>';
  });
  h+=goBtn('fn','練習：功能');
  $('page-fn').innerHTML=h;
}

/* ═════════ 練習 ═════════ */
const PR={topic:'body',mode:'A',layer:'outer',round:0,score:0,done:false,q:null,opts:null,fb:null,picked:null,tapped:null,deck:[],di:0,timer:null,gq:null,seen:new Set()};
const TOTAL=10,ASW=520;
const TOPICS=[['body','🧍 部位'],['pain','🩺 邊度痛'],['cl','🔢 量詞'],['lr','↔️ 左右'],['fn','⚙️ 功能']];
function prPool(){const ls=PR.layer==='all'?LAYERS:[PR.layer];return ls.flatMap(l=>PARTS[l].items.map(i=>Object.assign({layer:l},i)));}
function pickUnseen(pool,keyFn){
  for(let t=0;t<40;t++){const x=pool[Math.floor(Math.random()*pool.length)];const k=keyFn(x);if(!PR.seen.has(k)){PR.seen.add(k);return x;}}
  PR.seen.clear();return pool[Math.floor(Math.random()*pool.length)];
}
function prStart(){
  clearTimeout(PR.timer);Speech.stop();
  PR.round=0;PR.score=0;PR.done=false;PR.deck=shuffle(prPool());PR.di=0;PR.seen=new Set();prNext(true);
}
function prNext(first){
  if(!first)PR.round++;
  if(PR.round>=TOTAL){PR.done=true;addTotal(PR.score);renderPractice();return;}
  PR.fb=null;PR.picked=null;PR.tapped=null;
  if(PR.topic!=='body'){PR.gq=genQ(PR.topic);renderPractice();if(PR.gq.autoSay)setTimeout(()=>Speech.speak(PR.gq.say),250);return;}
  if(PR.di>=PR.deck.length){PR.deck=shuffle(prPool());PR.di=0;}
  PR.q=PR.deck[PR.di++];
  const same=PARTS[PR.q.layer].items.filter(i=>i.id!==PR.q.id).map(i=>Object.assign({layer:PR.q.layer},i));
  PR.opts=shuffle(shuffle(same).slice(0,3).concat([PR.q]));
  renderPractice();
  if(PR.mode==='B')setTimeout(()=>Speech.speak(PR.q.say||PR.q.c),250);
}
function prFinish(ok){
  PR.fb=ok?'ok':'bad';if(ok){PR.score+=10;award(10);}
  renderPractice();
  if(PR.topic!=='body'&&PR.gq&&PR.gq.say&&ok)Speech.speak(PR.gq.say);
  clearTimeout(PR.timer);PR.timer=setTimeout(()=>prNext(),ok?1300:2300);
}
BD.prPick=function(i){if(PR.fb)return;PR.picked=i;prFinish(PR.opts[i].id===PR.q.id);};
BD.prPickG=function(i){if(PR.fb)return;PR.picked=i;prFinish(PR.gq.opts[i].id===PR.gq.correct);};
BD.prTap=function(ev){
  if(PR.fb||PR.mode!=='B'||PR.topic!=='body')return;
  const st=$('askStage');if(!st)return;
  const L=PARTS[PR.q.layer],r=st.getBoundingClientRect(),ox=(ASW-L.w)/2;
  const ux=(ev.clientX-r.left)/r.width*ASW-ox,uy=(ev.clientY-r.top)/r.height*L.h;
  let best=null,bd=1e9;
  L.items.forEach(it=>{const d=Math.hypot(it.x-ux,it.y-uy);if(d<bd){bd=d;best=it;}});
  if(!best||bd>70)return;
  PR.tapped=best.id;prFinish(best.id===PR.q.id);
};
/* 有一支箭嘴指住某點嘅圖（練習用）*/
function figArrow(layer,x,y,id){
  const L=PARTS[layer],ox=(ASW-L.w)/2,H=L.h,tx=ox+x,left=x<L.w/2;
  const x1=left?Math.max(6,tx-125):Math.min(ASW-6,tx+125);
  return '<div class="bd-wrap" style="max-width:460px"><div class="bd-stage" style="--sw:'+ASW+';aspect-ratio:'+ASW+'/'+H+'">'
    +imgTag(layer,ASW)+'<svg class="bd-svg" viewBox="0 0 '+ASW+' '+H+'" preserveAspectRatio="none">'+arrowSvg(x1,y,tx,y,id,'on')+'</svg></div></div>';
}
function askStage(){
  const q=PR.q,L=PARTS[q.layer],ox=(ASW-L.w)/2,H=L.h;let svg='';
  if(PR.mode==='A'){return figArrow(q.layer,q.x,q.y,q.id);}
  L.items.forEach(it=>{
    let cls='tap-dot';
    if(PR.fb){if(it.id===q.id)cls+=' good';else if(it.id===PR.tapped)cls+=' bad';}
    svg+='<circle class="'+cls+'" cx="'+(ox+it.x)+'" cy="'+it.y+'" r="9"/>';
  });
  if(PR.fb)svg+='<circle class="tap-ring" cx="'+(ox+q.x)+'" cy="'+q.y+'" r="18"/>';
  return '<div class="bd-wrap" style="max-width:460px"><div class="bd-stage" id="askStage" style="--sw:'+ASW+';aspect-ratio:'+ASW+'/'+H+'" onclick="BD.prTap(event)">'
    +imgTag(q.layer,ASW)+'<svg class="bd-svg" viewBox="0 0 '+ASW+' '+H+'" preserveAspectRatio="none">'+svg+'</svg></div></div>';
}
function optsHtml(){
  return '<div class="opts-grid">'+PR.opts.map((o,i)=>{
    let cls='opt-btn';
    if(PR.fb){if(o.id===PR.q.id)cls+=' ok';else if(i===PR.picked)cls+=' no';else cls+=' dim';}
    return '<button class="'+cls+'" '+(PR.fb?'':'onclick="BD.prPick('+i+')"')+'><span class="zh">'+ruby(o.c,o.j)+'</span></button>';
  }).join('')+'</div>';
}
function fbHtml(){
  if(!PR.fb)return '';
  const q=PR.q,t=ruby(q.c,q.j)+' <span class="th">— '+q.th+'</span>';
  return '<div class="fb '+(PR.fb==='ok'?'ok':'err')+'">'+(PR.fb==='ok'?'✓ 啱！ ':'✗ 正確係：')+t+'</div>';
}
function gOptsHtml(){
  const q=PR.gq;
  return '<div class="opts-grid'+(q.wide?' one':'')+'">'+q.opts.map((o,i)=>{
    let cls='opt-btn';
    if(PR.fb){if(o.id===q.correct)cls+=' ok';else if(i===PR.picked)cls+=' no';else cls+=' dim';}
    return '<button class="'+cls+'" '+(PR.fb?'':'onclick="BD.prPickG('+i+')"')+'><span class="'+(q.wide?'sen':'zh')+'">'+o.html+'</span></button>';
  }).join('')+'</div>';
}
function gFbHtml(){
  if(!PR.fb)return '';
  return '<div class="fb '+(PR.fb==='ok'?'ok':'err')+'">'+(PR.fb==='ok'?'✓ 啱！ ':'✗ 正確係：')+PR.gq.ans+'</div>';
}
function renderPractice(){
  const root=$('page-practice');
  let html='<div class="g-tab-bar">'+TOPICS.map(t=>'<button class="g-tab topic'+(PR.topic===t[0]?' act':'')+'" onclick="BD.prTopic(\''+t[0]+'\')">'+t[1]+'</button>').join('')+'</div>';
  if(PR.topic==='body'){
    const modes=[['A','🎯 睇箭嘴揀名'],['B','👆 聽/睇字撳位置'],['C','🈯 泰文揀廣東話']];
    const layers=[['outer','🧍 外觀'],['back','🔄 背面'],['skeleton','🦴 骨骼'],['organs','🫀 內臟'],['all','🔀 全部']];
    html+='<div class="g-tab-bar">'+modes.map(m=>'<button class="g-tab'+(PR.mode===m[0]?' act':'')+'" onclick="BD.prMode(\''+m[0]+'\')">'+m[1]+'</button>').join('')+'</div>'
      +'<div class="filter-bar">'+layers.map(l=>'<button class="f-btn'+(PR.layer===l[0]?' act':'')+'" onclick="BD.prLayer(\''+l[0]+'\')">'+l[1]+'</button>').join('')+'</div>';
  }
  if(PR.done){
    root.innerHTML=html+'<div class="result-card"><div class="result-emoji">'+(PR.score>=80?'🏆':PR.score>=50?'👏':'💪')+'</div><div class="result-title">完成！</div>'
      +'<div class="result-score" id="resScore">0 / '+TOTAL*10+'</div><div class="result-thai">เก่งมาก! 叻仔！</div>'
      +'<button class="retry-btn" onclick="BD.prStart()">再玩一次</button></div>';
    celebrate();return;
  }
  html+='<div class="g-hdr"><span class="score-pill">★ '+PR.score+'</span><span class="round-pill">'+(PR.round+1)+' / '+TOTAL+'</span></div>';
  if(PR.topic!=='body'){
    const q=PR.gq;
    html+='<div class="q-card">'+q.prompt+(q.sub||'')
      +(q.say&&q.speakBtn?'<button class="spk-big" onclick="BD.Speech.speak(BD.PR.gq.say)">🔊 聽發音</button>':'')+'</div>'
      +(q.instr?'<p class="g-instr">'+q.instr+'</p>':'')+(q.fig||'')+gOptsHtml()+gFbHtml();
    root.innerHTML=html;return;
  }
  const q=PR.q,tag='<span class="q-tag">'+PARTS[q.layer].emoji+' '+PARTS[q.layer].title+'</span>';
  if(PR.mode==='A'){
    html+='<p class="g-instr">箭嘴指住邊個部位？ '+tag+'</p>'+askStage()+optsHtml()+fbHtml();
  }else if(PR.mode==='B'){
    html+='<div class="q-card"><div class="q-zh">'+ruby(q.c,q.j)+'</div><div class="th q-sub" style="font-size:15px">'+q.th+'</div>'
      +'<button class="spk-big" onclick="BD.Speech.speak(BD.PR.q.say||BD.PR.q.c)">🔊 聽發音</button></div>'
      +'<p class="g-instr">喺圖上面撳出呢個部位 👇 '+tag+'</p>'+askStage()+fbHtml();
  }else{
    html+='<div class="q-card"><div class="q-th">'+q.th+'</div><div class="q-sub">'+tag+'</div></div>'
      +'<p class="g-instr">廣東話點講？</p>'+optsHtml()+fbHtml();
  }
  root.innerHTML=html;
}
BD.prTopic=function(t){PR.topic=t;prStart();};
BD.prMode=function(m){PR.mode=m;prStart();};
BD.prLayer=function(l){PR.layer=l;prStart();};
function goPractice(topic){showTab('practice');PR.topic=topic;prStart();window.scrollTo({top:0,behavior:'smooth'});}
function celebrate(){
  const card=document.querySelector('.result-card');if(!card)return;
  const cols=['#0E6B57','#C1402A','#A9701C','#8A4B3B'];let f='';
  for(let i=0;i<18;i++){f+='<span class="confetti" style="left:'+(Math.random()*100)+'%;background:'+cols[i%4]+';border-radius:'+(Math.random()<.5?'0':'50%')+';animation-delay:'+(Math.random()*.3).toFixed(2)+'s"></span>';}
  card.insertAdjacentHTML('beforeend',f);
  const n=$('resScore');if(n)animateNumber(n,0,PR.score,700,' / '+TOTAL*10);
}

/* ═════════ 各主題出題 ═════════ */
function genQ(topic){return {pain:genPain,cl:genCL,lr:genLR,fn:genFN}[topic]();}
function opt(id,html){return {id:id,html:html};}

function genCL(){
  const e=pickUnseen(CL,x=>'cl'+x.id);
  const bad=new Set([e.cl].concat(e.alt||[]));
  const ds=shuffle(CLS.filter(x=>!bad.has(x.c))).slice(0,3);
  const opts=shuffle([opt(e.cl,ruby(e.cl,e.clj))].concat(ds.map(x=>opt(x.c,ruby(x.c,x.j)))));
  const full='一:jat1 '+T(e.cl,e.clj)+' '+T(e.c,e.j);
  return {
    prompt:'<div class="q-zh">'+sRuby('一:jat1')+'<span class="blank"></span>'+sRuby(T(e.c,e.j))+'</div>',
    sub:'<div class="q-sub">'+e.th+' · '+e.hint+'</div>',
    instr:'揀啱嘅量詞',opts:opts,correct:e.cl,
    ans:sRuby(full)+' <span class="th">— '+e.th+'</span>',say:plain(full)
  };
}
function genFN(){
  const pool=FN.filter(x=>!x.nq);
  const e=pickUnseen(pool,x=>'fn'+x.p);
  const sent=fnSent(e);
  const base={ans:sRuby(sent)+' <span class="th">— '+e.pth+'ใช้'+e.v+'</span>',say:plain(sent)};
  if(Math.random()<0.5){
    const ds=shuffle(pool.filter(x=>x.fs!==e.fs&&x.p!==e.p)).slice(0,3);
    return Object.assign({
      prompt:'<div class="q-zh">'+sRuby(T(e.p,e.pj)+' 用嚟:jung6-lai4')+'<span class="blank"></span></div>',
      sub:'<div class="q-sub">'+e.pth+'ใช้…? '+e.e+'</div>',instr:'揀啱嘅功能',
      opts:shuffle([opt(e.fs,sRuby(e.fs))].concat(ds.map(x=>opt(x.fs,sRuby(x.fs))))),correct:e.fs},base);
  }
  const ds=shuffle(pool.filter(x=>x.p!==e.p&&x.fs!==e.fs)).slice(0,3);
  return Object.assign({
    prompt:'<div class="q-zh m">'+sRuby('邊個:bin1-go3 用嚟:jung6-lai4 '+e.fs+' ？')+'</div>',
    sub:'<div class="q-sub">อะไรใช้'+e.v+'? '+e.e+'</div>',instr:'揀啱嘅部位',
    opts:shuffle([opt(e.p,ruby(e.p,e.pj))].concat(ds.map(x=>opt(x.p,ruby(x.p,x.pj))))),correct:e.p},base);
}
function genLR(){
  if(Math.random()<0.65){
    const combos=[];['outer','back'].forEach(v=>PAIRS.forEach(p=>['L','R'].forEach(s=>combos.push({v:v,p:p,s:s}))));
    const e=pickUnseen(combos,x=>'lr'+x.v+x.p.k+x.s);
    const opp=e.s==='L'?'R':'L';
    const cor=lrName(e.p,e.s),oth=lrName(e.p,opp);
    const others=shuffle(combos.filter(x=>x.v==='outer'&&x.p.k!==e.p.k)).slice(0,2).map(x=>lrName(x.p,x.s));
    const pt=PARTS.lr[e.v][e.p.k][imgSideOf(e.v,e.s)];
    return {
      prompt:'<div class="q-zh m">'+sRuby('箭嘴:zin3-zeoi2 指住:zi2-zyu6 邊個:bin1-go3 ？')+'</div>',
      sub:'<div class="q-sub">'+sRuby(e.v==='outer'?'正面:zing3-min6':'背面:bui3-min6')+' · ซ้าย/ขวา ดูจากตัวคนในรูป</div>',
      fig:figArrow(e.v,pt[0],pt[1],'q'),
      opts:shuffle([opt(cor.c,ruby(cor.c,cor.j)),opt(oth.c,ruby(oth.c,oth.j))].concat(others.map(n=>opt(n.c,ruby(n.c,n.j))))),
      correct:cor.c,ans:ruby(cor.c,cor.j)+' <span class="th">— '+cor.th+'</span>',say:cor.c
    };
  }
  const e=pickUnseen(DIRW,x=>'dw'+x.c);
  const ds=shuffle(DIRW.filter(x=>x.c!==e.c)).slice(0,3);
  return {
    prompt:'<div class="q-th">'+e.th+'</div>',sub:'<div class="q-sub">方向詞 · คำบอกทิศทาง</div>',instr:'廣東話點講？',
    opts:shuffle([opt(e.c,ruby(e.c,e.j))].concat(ds.map(x=>opt(x.c,ruby(x.c,x.j))))),
    correct:e.c,ans:ruby(e.c,e.j)+' <span class="th">— '+e.th+'</span>',say:e.c
  };
}
function genPain(){
  if(Math.random()<0.6){
    const G={ask:ASK,say:SAY,other:OTHER,deg:DEG,care:CARE};
    const all=[];Object.keys(G).forEach(k=>G[k].forEach((x,i)=>all.push({g:k,s:x[0],th:x[1],k:k+i})));
    const e=pickUnseen(all,x=>'pa'+x.k);
    const ds=shuffle(all.filter(x=>x.g===e.g&&plain(x.s)!==plain(e.s))).slice(0,3);
    return {
      prompt:'<div class="q-th m">'+e.th+'</div>',sub:'<div class="q-sub">ภาษากวางตุ้งพูดว่าอย่างไร?</div>',instr:'廣東話點講？',wide:true,
      opts:shuffle([opt(e.k,sRuby(e.s))].concat(ds.map(x=>opt(x.k,sRuby(x.s))))),
      correct:e.k,ans:sRuby(e.s)+' <span class="th">— '+e.th+'</span>',say:plain(e.s)
    };
  }
  const e=pickUnseen(QA,x=>'qa'+x[1]+x[3]);
  const ds=[];
  shuffle(QA.filter(x=>x[0]!==e[0])).forEach(x=>{if(ds.length<3&&!ds.some(d=>d[0]===x[0]))ds.push(x);});
  return {
    prompt:'<div class="q-zh m">'+sRuby(e[1])+'</div>',
    sub:'<div class="q-sub">'+e[2]+'</div>',speakBtn:true,say:plain(e[1]),
    instr:'邊句係啱嘅回答？ · ตอบอย่างไรจึงเหมาะสม?',wide:true,
    opts:shuffle([opt(e[3],sRuby(e[3]))].concat(ds.map(x=>opt(x[3],sRuby(x[3]))))),
    correct:e[3],ans:sRuby(e[3])+' <span class="th">— '+e[4]+'</span>'
  };
}

/* ═════════ 分頁／開關 ═════════ */
function stopAll(){stopAuto();stopDlg();Speech.stop();}
function showTab(t){
  stopAll();S.tab=t;
  setBar(t);
  ['learn','pain','cl','lr','fn','practice'].forEach(p=>$('page-'+p).classList.toggle('act',p===t));
  if(t==='learn')renderLearn();
  else if(t==='pain')renderPain();
  else if(t==='cl')renderCL();
  else if(t==='lr')renderLR();
  else if(t==='fn')renderFN();
  else{if(!PR.q&&!PR.gq)prStart();else renderPractice();}
}
const BD_TABS=[['learn','📖 部位'],['pain','🩺 邊度痛'],['cl','🔢 量詞'],['lr','↔️ 左右'],['fn','⚙️ 功能'],['practice','🎮 練習']];
const barEl=window.document.getElementById('bd-bar');
function setBar(t){barEl.innerHTML=BD_TABS.map(x=>'<button class="tm-tab'+(x[0]===t?' act':'')+'" type="button" data-bt="'+x[0]+'">'+x[1]+'</button>').join('');}
barEl.addEventListener('click',e=>{const b=e.target.closest('[data-bt]');if(b){showTab(b.dataset.bt);window.scrollTo({top:0});}});
function init(){
  Speech.init();
  // 全站「泰文」掣轉咗，圖上標籤間距要重排
  new MutationObserver(()=>{if(S.tab==='learn'&&S.view!=='xray')renderLearn();else if(S.tab==='lr')renderLR();}).observe(host,{attributes:true,attributeFilter:['class']});
  setBar('learn');
  renderLearn();
}

init();
['bRandom','bSet','goPractice','jump','pick','playDlg','prStart','sayBub','sayEx','setLR','setView','setXray','showTab','toggleAuto','pickLR'].forEach(function(n){BD[n]=eval(n);});
BD.Speech=Speech;BD.PR=PR;
window.bdShow=function(){showTab(S.tab);};
window.bdLeave=function(){stopAll();};

})();
