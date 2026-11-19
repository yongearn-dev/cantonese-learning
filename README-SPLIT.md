# 拆檔說明（第 1 步）

```
index.html          主檔（原 cantonese-app.html，已抽走人體圖同粵拼引擎）
js/jy-engine.js     全站粵拼／泰文引擎＋補音字典 JYM（原檔尾 <script id="jy-engine">）
img/body-*.webp     身體分頁 4 張人體圖（原 base64）
tools/build-single.py   合併返做單一 HTML：python3 tools/build-single.py
tools/split-step1.py    本次拆檔腳本（記錄用）
```
- 部署：成個資料夾放上 GitHub Pages（保持相對路徑）。
- 改 js/jy-engine.js 或圖片後，將 index.html 入面 `?v=20261119` 改做新日期，避免舊快取。
- 要離線備份／直接開單一檔：跑 build-single.py。
- 改 JYM 字典：`node update-jym.js js/jy-engine.js`（路徑由 cantonese-app.html 改做 js/jy-engine.js）。
- 拆前後已用 Playwright 逐個分頁對比（粵拼 ruby 數量、版面文字量、人體圖載入、無 JS 錯誤），一致。
