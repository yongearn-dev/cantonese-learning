# 拆檔說明（第 1–2 步）

```
index.html            骨架：全站 CSS（不含測驗）＋所有 .page 的 HTML ＋ <script src> 載入次序
css/quiz.css          四份測驗卷嘅 CSS（原本喺 index.html 中段；載入次序不變）
js/app.js             主程式：資料載入、分頁切換、計分、遊戲、AI
js/jyutping-practice.js  粵拼練習（三碗細牛腩麵）
js/vocab-read-aloud.js   詞彙「跟我讀」（語音評分）
js/soundalike.js      音近卡牌
js/quiz-hub.js        測驗切換列＋拖拉 helper（qzDrag）＋ qzHubRefresh
js/quiz-l1-7.js       測驗（一）
js/quiz-l8-14a.js     測驗（二）A卷
js/quiz-l8-14b.js     測驗（二）B卷
js/quiz-l15-19.js     測驗（三）第15–19課
js/time.js  direction.js  antonym.js  classifier.js  hobby.js  tones.js
js/score-bridge.js    APP_AWARD／APP_LOGHIST（身體、家庭計分橋）
js/body.js  family.js 身體、家庭（Shadow DOM）
js/jy-engine.js       全站粵拼／泰文引擎＋補音字典 JYM（必須最後載入）
img/body-*.webp       人體圖
tools/build-single.py 合併返做單一 HTML（離線備份）：python3 tools/build-single.py
tools/split-step*.py  拆檔腳本（記錄用，唔使再跑）
```
## 規則
- **載入次序 = index.html 內 <script> 次序**（全部傳統 script，唔好加 defer／type=module，否則 file:// 開唔到，亦會打亂全域變數）。`app.js` 最先，`jy-engine.js` 最後。
- 部署：成個資料夾放上 GitHub Pages，保持相對路徑。
- 改咗任何 js／css／img，將 index.html 入面對應 `?v=20261119` 改做新日期（可以全部一齊改），避免學生手機用舊快取。
- 補音字典：`node update-jym.js js/jy-engine.js`。
- 加新一份測驗：複製 `quiz-l15-19.js`（改 QUIZ_ID、範圍、題目、`qzN-root`、CSS 前綴）→ index.html 加 root div、hub 掣、`<script src>`；hub 同引擎名單（`#qzN-root`）都要加（見 quiz-hub.js、jy-engine.js、css/quiz.css）。
- 拆前後已用 Playwright 逐個分頁對比（粵拼 ruby 數量、文字量、人體圖載入、無 JS 錯誤）同跑晒測驗（三）作答／計分／提交，一致。
