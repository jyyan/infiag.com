# Infinity Agentic Favicon 設計規格

- **狀態**：Draft（待 user review）
- **建立日期**：2026-05-03
- **作者**：Claude (Opus 4.7) + luke@infiag.com
- **專案根目錄**：`/home/sss2500/codejobs/infiag.com`
- **相關 spec**：`docs/superpowers/specs/2026-05-03-infiag-static-site-design.md` §13/§14（既有 spec 將獨立 logo SVG 列為迭代項目，本 spec 為其落地）

---

## 1. 目標與範圍

### 1.1 目標

為 infiag.com 設計與交付完整 favicon 套組，覆蓋瀏覽器頁籤、iOS 主畫面、Android / PWA 加入主畫面三類情境。同時建立可重複執行的 SVG → PNG/ICO 產生流程，方便未來迭代。

### 1.2 範圍內

- ∞ 圖形 SVG 源檔（兩份：透明版、深色方塊版）
- 5 個交付檔案放入 `public/`
- Node 產生腳本 `scripts/generate-favicons.mjs`
- `nuxt.config.ts` 的 `app.head` link 串接
- 一次性 `npm run favicon` 指令

### 1.3 範圍外（YAGNI）

- PWA `manifest.webmanifest`（之後做 PWA 再寫，不在本 spec）
- maskable icon 專用版（`icon-512.png` 已在 maskable safe zone 內，多數情境足夠）
- Safari pinned tab 單色 SVG
- 自動 CI 產生（與既有 spec 一致：手動執行）

---

## 2. 設計決策清單

| 項目 | 選擇 | 理由 |
|---|---|---|
| 核心符號 | ∞ 無限符號 | 直接對應品牌名 Infinity Agentic 無限智能；既有 spec 已預設 |
| 形體 | 古典 lemniscate（雙正圓交叉） | 16×16 辨識度最高，與 banner 圓潤光感一致 |
| 線條/填色 | 線條型，stroke 圓角端點 | 線條保留輕盈科技感；交叉處微縮（taper）做立體穿越感 |
| 主色 | linear gradient `#3aa9ff → #4dd0ff`（左→右） | 對應既有 spec design token `--accent-glow → --accent-bright` |
| 外發光 | `feGaussianBlur stdDeviation=1.2`，`#3aa9ff` @ 60% opacity | 呼應 banner 科技質感；小尺寸不過頭 |
| 透明檔背景 | 透明 | favicon.ico / favicon.svg 用，瀏覽器頁籤自然嵌入 |
| 方塊檔背景 | 深空藍 `#0a1228`（`--bg-deep`），不預先圓角 | OS 自動套遮罩；不預圓角避免雙層遮罩衝突 |
| ∞ 在方塊中佔比 | 約 60%（落在中央 80% maskable safe zone 內） | 兼容 Android 自適應遮罩，未來轉 PWA 不必重做 |

---

## 3. SVG 源檔規格

### 3.1 `app/assets/brand/favicon-source.svg`（透明版）

- `viewBox="0 0 64 64"`
- ∞ 兩個圓中心：`(20, 32)` 與 `(44, 32)`，半徑 `12`
- ∞ 描繪以單一 `<path>` 表示 lemniscate（兩圓交織，於 `(32, 32)` 交叉）
- `stroke-width: 6.5`、`stroke-linecap: round`、`stroke-linejoin: round`、`fill: none`
- `<linearGradient id="grad">`：`stop-0 #3aa9ff` → `stop-100 #4dd0ff`
- `<filter id="glow">`：`feGaussianBlur stdDeviation="1.2"` + `feMerge`，發光色 `#3aa9ff` @ 0.6 opacity
- 整體 ∞ 寬度約佔 viewBox 80%（左 6 → 右 58）

### 3.2 `app/assets/brand/favicon-tile.svg`（方塊版）

- `viewBox="0 0 512 512"`（高解析度，避免縮放鋸齒）
- 全幅深空藍方塊：`<rect width="512" height="512" fill="#0a1228"/>`
- ∞ 圖形等比放大置中，整體寬度約 **60%** of viewBox（即 `308px`），確保在 maskable safe zone（中央 80% = 410px）內
- 漸層與發光同 §3.1，發光半徑等比放大

兩個 SVG 共用相同的幾何路徑常數，差別僅在 viewBox 與外圍 rect。

---

## 4. 交付檔案清單

| 路徑 | 尺寸 | 來源 | 背景 | 用途 |
|---|---|---|---|---|
| `public/favicon.svg` | vector | `favicon-source.svg`（直接複製） | 透明 | 現代瀏覽器頁籤；支援深淺模式 |
| `public/favicon.ico` | 16 / 32 / 48 multi-resolution | `favicon-source.svg` → PNG → ICO | 透明 | 舊瀏覽器頁籤 fallback |
| `public/apple-touch-icon.png` | 180×180 | `favicon-tile.svg` → PNG | 深空藍 | iOS 主畫面 |
| `public/icon-192.png` | 192×192 | `favicon-tile.svg` → PNG | 深空藍 | Android 加入主畫面 |
| `public/icon-512.png` | 512×512 | `favicon-tile.svg` → PNG | 深空藍 | PWA splash / OG fallback / 高解析裝置 |

### 4.1 檔案大小目標（驗收用）

- `favicon.ico` < 10 KB
- `favicon.svg` < 3 KB
- `apple-touch-icon.png` < 20 KB
- `icon-192.png` < 25 KB
- `icon-512.png` < 50 KB

---

## 5. 產生流程

### 5.1 依賴

加入 `package.json` 的 `devDependencies`：

| 套件 | 版本 | 用途 |
|---|---|---|
| `sharp` | `^0.33.0` | SVG → PNG 高品質轉換（含發光、漸層、anti-alias） |
| `png-to-ico` | `^2.1.8` | 多解析度 PNG → 單一 .ico |

### 5.2 腳本：`scripts/generate-favicons.mjs`

職責：
1. 讀 `app/assets/brand/favicon-source.svg` → 直接複製到 `public/favicon.svg`
2. 讀 `favicon-source.svg` → 用 `sharp` 渲染成 16/32/48 PNG buffer → `png-to-ico` 合併 → 寫入 `public/favicon.ico`
3. 讀 `app/assets/brand/favicon-tile.svg` → 用 `sharp` 渲染為 180/192/512 PNG → 寫入對應 `public/*.png`
4. console.log 各檔案最終大小，便於對照 §4.1 驗收

腳本為純 ESM（`.mjs`），無 framework 依賴，未來可獨立呼叫。

### 5.3 npm script

`package.json` 加：

```json
"scripts": {
  "favicon": "node scripts/generate-favicons.mjs"
}
```

執行：`npm run favicon`。產物 commit 進 git（不放 build pipeline，與既有 spec「手動部署」精神一致）。

---

## 6. Nuxt 串接

`nuxt.config.ts` 的 `app.head.link` 改為：

```ts
link: [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  // 既有的 preconnect / fonts stylesheet 保留
],
```

說明：
- 兩個 `rel="icon"` 並存，現代瀏覽器優先用 SVG，舊瀏覽器降級用 ICO
- `icon-192.png` / `icon-512.png` 暫不在 head 引用，待之後做 `manifest.webmanifest` 才會被消費
- 不需修改 `app/app.vue` 或 layouts

---

## 7. 設計原則

1. **單一真相來源**：所有交付檔皆從 2 個 SVG 源檔生成；不手動修 PNG/ICO
2. **可重現**：`npm run favicon` 可隨時重產，diff 應為穩定 binary
3. **與 spec 對齊**：色彩 token 直接引用既有 design token，不另立色號
4. **YAGNI**：不做 PWA manifest、不做 maskable 專版、不做 CI 自動產生
5. **OS-friendly**：方塊版不預先圓角，由 iOS/Android 自帶遮罩處理

---

## 8. 驗收

1. `npm run favicon` 執行成功，產出 5 個檔案於 `public/`
2. 每個檔案大小符合 §4.1 目標
3. `npm run dev` 後 `localhost:3000` 頁籤顯示 ∞ 圖示（不再是預設 Nuxt 圖示）
4. 拖 `favicon.svg` 到瀏覽器：渲染清晰、漸層 + 發光正確
5. 將 `apple-touch-icon.png` 在 macOS Preview 開啟：深空藍方塊 + 中央 ∞，∞ 不貼邊
6. `npm run generate` 不報錯，`.output/public/` 內含所有 5 個 favicon 檔案

---

## 9. 已知限制

- 不做 PWA manifest → Android 加入主畫面在較舊版本可能找不到 `icon-192/512`，會降級用 apple-touch-icon
- 不做 Safari pinned tab → Safari 釘選頁籤會用單色 favicon.ico 自動轉灰，可能略糊
- 發光效果在 16×16 會被 anti-alias 吃掉一些細節，這是物理限制；ICO 多解析度已盡量補救

---

## 10. 後續迭代機會（不在本範圍）

- 寫 `public/manifest.webmanifest` + `nuxt.config.ts` 加 link，正式啟用 PWA
- 加 `safari-pinned-tab.svg`（單色 ∞，Safari 工具列釘選用）
- 加深淺模式自適應 SVG（`<style>` 配合 `prefers-color-scheme`）
- 用 `playwright` 自動截圖 favicon 渲染結果做視覺回歸測試
- 把 ∞ logo 的 SVG 抽成 `<InfinityLogoSVG>` Vue 元件，header / footer / hero 共用同一份幾何
