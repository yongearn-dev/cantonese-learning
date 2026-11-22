# 拆檔說明（第 1–2 步）

```
index.html            骨架：全站 CSS（不含測驗）＋所有 .page 的 HTML ＋ <script src> 載入次序
css/quiz.css          四份測驗卷嘅 CSS（原本喺 index.html 中段；載入次序不變）
js/app.js             主程式：資料載入、分頁切換、計分、遊戲、AI
js/jyutping-practice.js  粵拼練習（三碗細牛腩麵）
js/vocab-read-aloud.js   詞彙「跟我讀」（語音評分）
js/soundalike.js      音近卡牌
js/quiz-hub.js        測驗切換列＋拖拉 helper（qzDrag）＋ qzHubRefresh
js/quiz-l1-7.js       測驗（一）引擎（題目喺 js/data/quiz-l1-7.data.js）
js/quiz-l8-14a.js     測驗（二）A卷
js/quiz-l8-14b.js     測驗（二）B卷
js/quiz-attempts.js   重考＋作答比較共用模組（QZA，紀錄存 localStorage cqh_<QUIZ_ID>）
js/quiz-l15-19.js     測驗（三）第15–19課 引擎工廠 window.QZ_L15(C)，A卷喺檔尾啟動（題目喺 js/data/quiz-l15-19.data.js）
js/quiz-l15-19b.js    B卷：只係一行 QZ_L15({n:5,root:'qz5-root',prefix:'qz5-',data:'l15_19b'})（題目喺 js/data/quiz-l15-19b.data.js）
js/time.js  direction.js  antonym.js  classifier.js  hobby.js  tones.js
js/score-bridge.js    APP_AWARD／APP_LOGHIST（身體、家庭計分橋）
js/body.js  family.js 身體、家庭（Shadow DOM）
js/jy-engine.js       全站粵拼／泰文引擎＋補音字典 JYM（必須最後載入）
js/data/*.data.js     每份測驗嘅「設定＋題目」（CFG：QUIZ_ID／課數範圍／時間；聽力稿、問答、句子、配對）
img/body-*.webp       人體圖
tools/build-single.py 合併返做單一 HTML（離線備份）：python3 tools/build-single.py
tools/split-step*.py  拆檔腳本（記錄用，唔使再跑）
```
## 規則
- **載入次序 = index.html 內 <script> 次序**（全部傳統 script，唔好加 defer／type=module，否則 file:// 開唔到，亦會打亂全域變數）。`app.js` 最先，`jy-engine.js` 最後。
- 部署：成個資料夾放上 GitHub Pages，保持相對路徑。
- 改咗任何 js／css／img，將 index.html 入面對應 `?v=20261119` 改做新日期（可以全部一齊改），避免學生手機用舊快取。
- 補音字典：`node update-jym.js js/jy-engine.js`。
- **改題目／改範圍／改時間：** 只改 `js/data/<卷>.data.js`（題目格式見檔內註解），之後更新 index.html 對應 `?v=`。
- **加新一份測驗（同測驗（三）同款題型，例如 C 卷）：** 複製 `data/quiz-l15-19b.data.js` 改名，內裡 `window.QZ_DATA.<新key>`、CFG.QUIZ_ID（每份唔同）、FILE／SUBJECT／TITLE、題目；新增 `js/quiz-l15-19c.js` 一行 `window.QZ_L15({n:6,root:'qz6-root',prefix:'qz6-',data:'<新key>'});`；index.html 加 `<div id="qz6-root" style="display:none">`、hub 掣 `data-exam="6"`、兩個 `<script src>`（data 先，啟動檔後，要喺 quiz-l15-19.js 之後）；quiz-hub.js 嘅 `[1,2,3,4,5]` 加 6；jy-engine.js 嘅 `ZONE_NORB／ZONE_NOTH／EXAM` 同 index.html 內 `.qz-intro rt[data-j]` 名單加 `#qz6-root`；css/quiz.css 所有 `:is(#qz4-root,#qz5-root)` 加 `#qz6-root`（可用全域取代）。

## 重考＋作答比較（測驗三 A/B 卷）
- 提交時 `recordAttempt()` 將每題結果（穩定題目 key：L0／V:字|泰文／A0／R0／H0／C0）存入 `QZA`（最多 12 次，只喺該部瀏覽器）。
- 重考 = 同一批 20 個詞彙，題目選項重新打亂；每次都會 email 老師（標題附「第n次」，內文附歷次總分）。
- 比較頁：總覽表 + 揀任何兩次 + 分類（進步／兩次都錯／退步／保持正確），錯題顯示學生答案同正確答案。
- `?reset=teacher` 會同時清走作答紀錄。
- 舊卷（一、二A、二B）未用呢套機制；如要加，將引擎 submit 內同樣加 `recordAttempt()` 同 `[data-cmp]` handler 即可。
