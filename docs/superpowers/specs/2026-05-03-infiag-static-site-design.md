# Infinity Agentic 多語靜態網站基礎建設 — 設計規格

- **狀態**：Draft（待 user review）
- **建立日期**：2026-05-03
- **作者**：Claude (Opus 4.7) + luke@infiag.com
- **專案根目錄**：`/home/sss2500/codejobs/infiag.com`

---

## 1. 目標與範圍

### 1.1 目標

建立 Infinity Agentic 無限智能（AI/VR 開放生態平台）的官方靜態網站基礎結構。重點是「**基礎**」— 完成可運作的多頁多語架構與設計系統，內容文案先用佔位/從 BM.md 萃取的草稿。

### 1.2 主要受眾

依 banner 訊息推斷，網站主要為 B2B 招商導向：

1. 想加盟的代理商（國級 / 省級）
2. 策略合作企業（硬體廠 / 軟體廠 / 醫療運動機構）
3. 投資人 / 政府單位

### 1.3 範圍內

- 8 個主要頁面（含 3 個 solutions 子頁），三語系 → 共 24 個靜態頁
- Tailwind + shadcn-vue 設計系統，深色科技感主題
- mailto 為唯一表單機制
- Markdown 長文 + i18n JSON UI 字串雙軌內容流
- `nuxi generate` SSG，部署到 Cloudflare R2

### 1.4 範圍外（YAGNI）

明確排除：light mode、後端 API、CMS、登入驗證、3D WebGL、部落格、搜尋、單元測試、自動部署 CI。

---

## 2. 決策清單

| 項目 | 選擇 | 理由 |
|---|---|---|
| Framework | Nuxt 3 + Vue 3 + TS | 用戶指定 |
| 套件管理 | npm | 環境僅有 npm 可用（無 pnpm） |
| 頁面 | 8 主 + 3 子 = 11 個 page templates | 涵蓋 B2B 招商需求 |
| 語系 | zh-TW（預設）/ zh-CN / en，prefix 路由 | 涵蓋國省級代理（中國）+ 國際投資人 |
| UI 系統 | Tailwind CSS + shadcn-vue | ui-ux-pro-max 直接支援，dark/glass 現成 |
| 動畫等級 | 中量（`@vueuse/motion` + 粒子/SVG） | banner 已展現視覺強度，不需額外 3D |
| 內容 | Nuxt Content (Markdown) + i18n JSON | 長文走 MD，UI 字串走 JSON |
| 表單 | 純 mailto（`luke@infiag.com`） | 純靜態無後端 |
| 投資人區 | 公開頁面 | 純靜態不適合敏感資料；敏感內容 mailto 索取 |
| Logo | 暫用 banner 切版 | 之後另提供獨立 SVG |
| 域名 | `https://infiag.com` | 影響 sitemap/canonical/OG |
| 部署 | Cloudflare R2 static website hosting | 用戶指定 |
| 部署方式 | 手動上傳 | 用戶指定不自動化 |

---

## 3. 技術堆疊

```
Runtime:    Node.js 20.20.2 / npm 10.8.2
Framework:  Nuxt 3 (latest stable, ≥ 3.14) with compatibilityVersion: 4
View:       Vue 3 + TypeScript
Build:      nuxi generate（純 SSG → .output/public/）
```

**版本鎖定**

| 套件 | 版本 | 備註 |
|---|---|---|
| `nuxt` | `^3.14.0` | `nuxt.config.ts` 設 `future.compatibilityVersion: 4` 啟用 `app/` 目錄 |
| `vue` | `^3.5.0` | Nuxt 自動帶 |
| `typescript` | `^5.5.0` | dev dep |
| `@nuxtjs/i18n` | `^9.0.0` | 9.x 為當前 stable |
| `@nuxt/content` | `^3.0.0` | **v3** API = `queryCollection`（與 v2 的 `queryContent` 不相容） |
| `@nuxtjs/tailwindcss` | `^6.12.0` | |
| `shadcn-nuxt` | `^1.0.0` | |
| `@vueuse/motion` | `^2.2.0` | |
| `@nuxtjs/seo` | `^2.0.0` | |
| `@nuxt/image` | `^1.8.0` | |
| `@nuxt/icon` | `^1.10.0` | |

### 3.1 Nuxt Modules

| Module | 用途 |
|---|---|
| `@nuxtjs/tailwindcss` | Tailwind 整合 |
| `shadcn-nuxt` | shadcn-vue CLI 整合（自動生成 components/ui/） |
| `@nuxtjs/i18n` | 三語系路由、locale 切換、SEO hreflang |
| `@nuxt/content` | Markdown 內容管理（`content/{locale}/...`） |
| `@vueuse/motion/nuxt` | 滾動進入動畫、視差 |
| `@nuxtjs/seo` | sitemap + robots + OG + canonical + hreflang |
| `@nuxt/image` | banner 大圖優化（webp/avif 自動轉換） |
| `@nuxt/icon` | 統一 icon 系統（lucide / iconify） |

---

## 4. 目錄結構

```
infiag.com/
├── nuxt.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── components.json              # shadcn-vue 設定
├── content.config.ts            # Nuxt Content v3 collection 定義
├── app/
│   ├── app.vue
│   ├── layouts/
│   │   └── default.vue          # Header + Footer
│   ├── pages/
│   │   ├── index.vue            # /
│   │   ├── about.vue            # /about
│   │   ├── platform.vue         # /platform
│   │   ├── solutions/
│   │   │   ├── index.vue        # /solutions
│   │   │   ├── golf.vue         # /solutions/golf
│   │   │   ├── ski.vue          # /solutions/ski
│   │   │   └── vision.vue       # /solutions/vision
│   │   ├── partners.vue         # /partners
│   │   ├── developers.vue       # /developers
│   │   ├── investors.vue        # /investors
│   │   └── contact.vue          # /contact
│   ├── components/
│   │   ├── ui/                  # shadcn-vue 自動生成
│   │   ├── layout/              # AppHeader / AppFooter / NavMenu / LangSwitcher / MobileDrawer
│   │   ├── hero/                # HeroBanner / HeroParticles / InfinityLogoSVG
│   │   ├── sections/            # SectionContainer / FeatureCard / SolutionCard / CTASection / StatNumber
│   │   └── motion/              # FadeInUp / ScrollReveal / TypeWriter
│   ├── composables/
│   │   ├── useMailto.ts         # mailto 連結組裝器
│   │   └── usePageSeo.ts        # 統一 SEO 設定
│   └── assets/
│       ├── css/
│       │   └── tailwind.css
│       └── images/              # banner 切圖、logo
├── content/
│   ├── zh-TW/
│   │   ├── solutions/
│   │   │   ├── golf.md
│   │   │   ├── ski.md
│   │   │   └── vision.md
│   │   ├── partners.md
│   │   └── investors.md
│   ├── zh-CN/                   # 相同結構
│   └── en/                      # 相同結構
├── i18n/
│   └── locales/
│       ├── zh-TW.json
│       ├── zh-CN.json
│       └── en.json
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-default.png
├── ref/                         # 既有：banner 原圖、BM.md
└── docs/
    └── superpowers/specs/       # 本 spec 所在
```

**重點規範**

- `app/` 目錄需設 `future.compatibilityVersion: 4`（Nuxt 4 風格目錄）。Nuxt 3 預設仍可用 root-level `pages/`/`components/`，但本專案統一採新版風格。
- `pages/` 不分 locale 子資料夾 — `@nuxtjs/i18n` 自動以 prefix 處理
- `content/` 分 locale 子資料夾 — Nuxt Content v3 透過 collection 機制 + `queryCollection({ where: { _path: ... } })` 取資料
- `content.config.ts`（根目錄）需定義 collection schema 給 Nuxt Content v3 用
- `components/ui/` 由 shadcn-vue CLI 生成，**不要手改**（會被 CLI 覆寫）
- 共用文案集中放 `i18n/locales/{lang}.json`，避免散落各 .vue 檔
- mailto 連結一律走 `composables/useMailto.ts` 集中產生

---

## 5. 路由與 i18n

### 5.1 i18n 配置

```ts
// nuxt.config.ts
i18n: {
  defaultLocale: 'zh-TW',
  strategy: 'prefix',
  locales: [
    { code: 'zh-TW', language: 'zh-TW', name: '繁體中文', file: 'zh-TW.json', dir: 'ltr' },
    { code: 'zh-CN', language: 'zh-CN', name: '简体中文', file: 'zh-CN.json', dir: 'ltr' },
    { code: 'en',    language: 'en-US', name: 'English',  file: 'en.json',    dir: 'ltr' },
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root',
    fallbackLocale: 'zh-TW',
  },
}
```

### 5.2 完整 URL 表（24 個靜態頁）

```
/zh-TW/                    /zh-CN/                    /en/
/zh-TW/about               /zh-CN/about               /en/about
/zh-TW/platform            /zh-CN/platform            /en/platform
/zh-TW/solutions           /zh-CN/solutions           /en/solutions
/zh-TW/solutions/golf      /zh-CN/solutions/golf      /en/solutions/golf
/zh-TW/solutions/ski       /zh-CN/solutions/ski       /en/solutions/ski
/zh-TW/solutions/vision    /zh-CN/solutions/vision    /en/solutions/vision
/zh-TW/partners            /zh-CN/partners            /en/partners
/zh-TW/developers          /zh-CN/developers          /en/developers
/zh-TW/investors           /zh-CN/investors           /en/investors
/zh-TW/contact             /zh-CN/contact             /en/contact
```

`/`（根）由 i18n 偵測瀏覽器語系後 redirect 至對應 locale 首頁（fallback 為 `/zh-TW/`）。

---

## 6. 全域佈局

### 6.1 Header（sticky）

```
[∞ Logo]  [關於 平台 解決方案▾ 合作 開發者 投資人]  [聯絡我們 CTA]  [語系切換 ▾]
```

- 預設透明背景；滾動超過 80px 後切換為毛玻璃 + 半透明深藍（透過 `useScroll`）
- 行動版：漢堡選單 → shadcn `<Sheet>` 從右側滑入

### 6.2 Footer

四欄 grid：
1. Logo + slogan「打造 AI/VR 開放生態合作平台」
2. Sitemap（內部頁面連結）
3. 聯絡（mailto: luke@infiag.com / BSE#91 營銷第一組）
4. 法律（© 2026 無限智能股份有限公司 / 隱私 / 條款 — 後兩者先佔位）

### 6.3 各頁組成

**`/` 首頁**（6 sections）
1. Hero（banner 主視覺 + 雙 CTA「聯絡結盟」「了解平台」）
2. 問題痛點（規格分歧 / 軟體不相容 — 3 卡片）
3. 三大利基（高爾夫 / 滑雪 / 兒童近視 — hover 發光，連到 solution 子頁）
4. 開放生態系示意（infinity SVG 描繪 + 三圈：硬體廠 / 軟體廠 / 醫療運動機構）
5. SOAR 抱負（成為 AI/VR 界的「高通 / 安卓」）
6. CTA Banner（呼應原 banner「徵求策略合作企業 聯絡結盟」）

**`/about`**：公司簡介 + SOAR 框架 + 團隊（佔位）

**`/platform`**：技術架構 + 開源 LMM 大運動模型 + 專利授權方案（捕獲期條款、第三方打包，內容引自 BM.md）

**`/solutions`**：3 卡導引到子頁

**`/solutions/{golf|ski|vision}`**：場景痛點 → 解決方案 → 技術亮點 → 合作機構（佔位）→ CTA

**`/partners`**（核心招商頁）：
- Hero：「徵求策略合作企業 聯絡結盟」
- 兩條路：策略合作（硬體/軟體/機構）/ 國省級代理
- 條件、流程、利益（引 BM.md 第 3-4 節：捕獲期、打包授權）
- mailto 預填合作意向

**`/developers`**：SDK 介紹「一次開發，跨硬體運行」+ 加盟條件（引 BM.md 第 5 節 Sony PlayStation 啟發）

**`/investors`**（公開）：市場機會 + 商業模式（SOAR）+ SWOT 摘要 + 為何投資 + CTA「索取 Pitch Deck」（mailto）

**`/contact`**：mailto + 營銷組（BSE#91）+ 辦公室地址佔位

### 6.4 共用元件

```
layout/      AppHeader / AppFooter / NavMenu / LangSwitcher / MobileDrawer
hero/        HeroBanner / HeroParticles / InfinityLogoSVG
sections/    SectionContainer / FeatureCard / SolutionCard / CTASection / StatNumber
motion/      FadeInUp / ScrollReveal / TypeWriter
ui/          shadcn-vue: Button / Card / Sheet / Dropdown / Input / Textarea / ...
```

---

## 7. 樣式系統

### 7.1 設計 Token（從 banner 萃取）

```css
:root {
  /* 深空藍系 — 背景 */
  --bg-deep:       222 65% 8%;     /* #0a1228 */
  --bg-base:       222 55% 11%;    /* #0d1b3a */
  --bg-elevated:   222 45% 16%;    /* #1a2a52 */
  --bg-glass:      222 50% 20% / 0.5;

  /* 發光青藍系 — 強調 */
  --accent-glow:   202 100% 62%;   /* #3aa9ff */
  --accent-bright: 196 100% 75%;   /* #4dd0ff */
  --accent-deep:   215 85% 45%;    /* #1c5cb8 */

  /* 文字 */
  --fg-primary:    210 40% 98%;
  --fg-secondary:  215 25% 75%;
  --fg-muted:      215 20% 55%;

  /* 邊線 */
  --border-glow:   202 100% 62% / 0.25;
  --border-subtle: 222 30% 25%;
}
```

整站固定深色，不做 light mode。

### 7.2 Tailwind 擴充重點

- `colors`：對應上面 token
- `backgroundImage`：`gradient-hero`、`gradient-glow`、`gradient-text`
- `boxShadow`：`glow-sm` / `glow` / `glow-lg` / `inner-glow`
- `backdropBlur`：`glass: 12px`
- `fontFamily`：`display: Noto Serif TC/SC`、`sans: Noto Sans TC/SC`
- `keyframes`：`pulseGlow` / `orbit` / `particle` / `drawLine`

### 7.3 自訂 Utility（@layer components）

- `.glass` / `.glass-card`：玻璃擬態卡片
- `.text-glow` / `.text-gradient`：發光/漸層文字
- `.btn-glow`：主要 CTA 按鈕
- `.grid-tech`：背景科技格線

### 7.4 shadcn-vue 主題覆寫

shadcn 的 CSS variable（`--background`、`--primary`、`--card`、...）統一指向我們的設計 token，所有 shadcn 元件自動套用深色科技感主題，不需逐一改原始檔。

### 7.5 字體

從 Google Fonts CDN 載入 Noto Sans TC/SC + Noto Serif TC/SC + JetBrains Mono，避免打包字體增加 R2 流量。

---

## 8. 內容資料流

### 8.1 雙軌策略

- **i18n JSON**（`i18n/locales/{lang}.json`）：UI 字串 — 按鈕、選單、CTA、標題短句
- **Markdown**（`content/{locale}/*.md`）：長文 — solutions 內文、partners 條款、investors 簡介

### 8.2 Markdown frontmatter 約定

```yaml
---
title: 高爾夫
description: AI 即時揮桿分析 + VR 沉浸式練習場
hero_image: /images/golf-hero.jpg
features:
  - icon: target
    title: 揮桿軌跡分析
    desc: 毫秒級 AI 動作捕捉
---

## 為何選擇我們
... 文章本文 ...
```

### 8.3 Nuxt Content v3 collection 設定

```ts
// content.config.ts (專案根目錄)
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md',                  // 涵蓋 content/zh-TW/**, zh-CN/**, en/**
      schema: z.object({
        title: z.string(),
        description: z.string(),
        hero_image: z.string().optional(),
        features: z.array(z.object({
          icon: z.string(),
          title: z.string(),
          desc: z.string(),
        })).optional(),
      }),
    }),
  },
})
```

### 8.4 頁面取得內容

```vue
<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()

// Nuxt Content v3 API：queryCollection
const { data } = await useAsyncData(
  `solutions-golf-${locale.value}`,
  () => queryCollection('pages')
    .path(`/${locale.value}/solutions/golf`)
    .first()
)

usePageSeo({
  title: data.value?.title,
  description: data.value?.description,
})
</script>

<template>
  <SectionContainer v-if="data">
    <HeroBanner :title="data.title" :image="data.hero_image" />
    <FeatureGrid :items="data.features" />
    <ContentRenderer :value="data" />
    <CTASection />
  </SectionContainer>
</template>
```

---

## 9. 動畫實作分工

| 場景 | 技術 | 元件 |
|---|---|---|
| 滾動進入時淡入 | `@vueuse/motion` `v-motion` | `<FadeInUp>` |
| 標題逐字浮現 | CSS animation + IntersectionObserver | `<TypeWriter>` |
| 數字滾動到目標 | `useTransition` from `@vueuse/core` | `<StatNumber>` |
| 粒子背景 | 原生 Canvas（自寫，~3KB） | `<HeroParticles>` |
| Infinity Logo 描繪 | SVG `stroke-dasharray` keyframe | `<InfinityLogoSVG>` |
| 卡片 hover 發光 | Tailwind `hover:shadow-glow` | `.glass-card` |
| Header 滾動毛玻璃 | `useScroll` 觸發 class | `<AppHeader>` |

**降級保險**：所有重動畫元件使用 `prefers-reduced-motion` media query 自動降為靜態版本。

---

## 10. SEO 配置

```ts
// nuxt.config.ts
modules: ['@nuxtjs/seo'],
site: {
  url: 'https://infiag.com',
  name: 'Infinity Agentic 無限智能',
  description: '打造 AI/VR 開放生態合作平台',
  defaultLocale: 'zh-TW',
},
```

`@nuxtjs/seo` 自動產出：
- `sitemap.xml`（24 頁 + hreflang 三語對照）
- `robots.txt`
- 各頁 OG / Twitter card meta
- canonical + hreflang link tags

各頁透過 `usePageSeo()`（自訂 composable，包裝 `useSeoMeta`）補頁面 title / description / og:image。

---

## 11. Build & Deploy

### 11.1 Build 指令

```bash
npm run generate      # 等同於 nuxi generate
```

### 11.2 產物結構

```
.output/public/
├── index.html              # 根（含 i18n redirect script）
├── zh-TW/
│   ├── index.html
│   ├── about/index.html
│   ├── solutions/golf/index.html
│   └── ...
├── zh-CN/...
├── en/...
├── _nuxt/                  # 打包 JS/CSS（hash 檔名）
├── images/
├── 200.html                # SPA fallback
├── 404.html                # 錯誤頁
├── sitemap.xml
└── robots.txt
```

### 11.3 Cloudflare R2 設定（一次性）

1. 建 R2 bucket：建議名稱 `infiag-com-prod`
2. **R2 Settings → Public access → Custom Domain**：綁 `infiag.com`
3. **R2 Settings → Public access → Static website hosting**：
   - Index document：`index.html`
   - Error document：`404.html`
4. Cloudflare DNS：`infiag.com` CNAME → R2 bucket（綁 custom domain 時自動完成）

### 11.4 手動部署流程

每次發版步驟：

1. 本機跑 `npm run generate`
2. 確認 `.output/public/` 內容正確（特別是 `_nuxt/` 資源、各語系 index.html）
3. 在 Cloudflare Dashboard 進入 R2 bucket → **Objects** → 上傳資料夾
   - 或自行使用 `wrangler r2 object put` 上傳（自由選擇）
4. 上傳完畢後若有舊檔案需清掉，手動刪除舊版本目錄

**不做自動 CI/CD**（用戶決定）。

---

## 12. 設計原則摘要

1. **單一真相來源**：UI 字串只在 i18n JSON、長文只在 Markdown
2. **元件職責分離**：layout / hero / sections / motion / ui 各自獨立資料夾
3. **shadcn 元件不改原始**：透過 CSS variable 主題覆寫
4. **mailto 集中管理**：`useMailto()` composable 統一組裝
5. **YAGNI**：不做 light mode、不做後端、不做 CMS、不做 3D、不做測試
6. **效能優先**：動畫降級、字體 CDN、Nuxt Image 自動 webp/avif
7. **手動部署**：build 出產物，手動上傳 R2

---

## 13. 已知限制

- 純 mailto 表單 → 訪客需要 email client；行動裝置體驗較弱
- 投資人區公開 → 不適合放敏感財務資料
- 純靜態 → 無法做即時資料（價格、新聞等）
- R2 無內建表單 / Worker → 任何動態功能未來需另外加 Cloudflare Workers
- Logo 使用 banner 切版 → 待用戶提供獨立 SVG 之前，視覺一致性會打折

---

## 14. 後續迭代機會（不在本基礎範圍）

- 換上獨立 logo SVG
- 加入 Cloudflare Worker 處理表單收集
- 加部落格 / 新聞動態
- 投資人區加 Cloudflare Access 保護
- 加入 3D infinity logo（three.js）
- 加 Cloudflare Web Analytics
- 加 GitHub Actions 自動部署
