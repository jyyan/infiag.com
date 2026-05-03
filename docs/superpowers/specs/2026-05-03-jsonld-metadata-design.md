# JSON-LD Metadata Design — infiag.com

**Date**: 2026-05-03
**Author**: Luke + Claude
**Status**: Approved (pending Luke final review)

## 目的

依 [schema.org](https://schema.org/docs/documents.html) 規範在 infiag.com 全站注入 JSON-LD 結構化資料,讓 B2B 商務 AI agent(投資人 / 合作夥伴的 AI 助理)與搜尋引擎(Google AI Overview、Perplexity 等)都能快速、無歧義地擷取公司資訊、服務範圍與聯絡管道。

招商導向的網站,被推薦給對的合作對象 = 商業價值。`knowsAbout` / `Service` / `ContactPoint` 是這份設計的商業核心。

## 範圍

- 站別:infiag.com(Nuxt 3 SSG,三語 zh-TW / zh-CN / en)
- 頁面:`/`, `/about`, `/platform`, `/solutions/{golf,ski,vision}`, `/partners`, `/developers`, `/investors`, `/contact` × 三語 = 24 個 URL
- 不在範圍內:`BreadcrumbList`、`FAQPage`、`Article` 集合、`InvestmentOrDeposit`(語意不對)、`SearchAction`(站內無搜尋)— 全數 YAGNI 留待後續

## 設計決策(brainstorming 結論)

| 軸向 | 決策 | 理由 |
|---|---|---|
| 服務對象 | B2B AI + 搜尋引擎雙重最佳化 | 兩者欄位 80% 重疊,一次到位 |
| Schema 類型佈局 | 全站基底 `Organization`+`WebSite`,各頁加對應類型 | 語意清楚,結構不過度 |
| 多語策略 | 每 URL 一份 JSON-LD,標 `inLanguage` | 與 hreflang 慣例一致,parser 支援度最佳 |
| Organization 欄位深度 | 招商強化版(含 `knowsAbout`、`founder`、`address`) | B2B 招商導向,語意關鍵字直接影響 AI 推薦匹配 |
| 實作方式 | 用 `@nuxtjs/seo` 內建 `useSchemaOrg()` / `defineOrganization()` 等 helper | 已安裝、有 TS 型別、自動處理 context / inLanguage / url |

## 架構

### 全站基底(由 `app.vue` 注入,所有頁面共用)

- `Organization` — 公司主檔
- `WebSite` — 站點本身,以 `@id` 供其他物件參照

### 各頁追加(由各 page 的 `useSchemaOrg` 注入)

| 路由 | 追加類型 |
|---|---|
| `/` | `WebPage` |
| `/about` | `AboutPage` |
| `/platform` | `WebPage` + `Service` |
| `/solutions/golf` | `WebPage` + `Service` |
| `/solutions/ski` | `WebPage` + `Service` |
| `/solutions/vision` | `WebPage` + `Service` |
| `/partners` | `WebPage` + `Service` |
| `/developers` | `WebPage` |
| `/investors` | `WebPage` |
| `/contact` | `ContactPage` + 額外 `ContactPoint`(拆 customer service / investor relations) |

### 多語

- 每個 URL 出一份 JSON-LD
- 標 `inLanguage`(`zh-Hant` / `zh-Hans` / `en-US`)
- `WebPage.@id` 為該 URL,各語言版本透過 hreflang 已標示對應關係,JSON-LD 不重複多語內容

## 欄位明細

### Organization(全站基底)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://infiag.com/#organization",
  "name": "Infinity Agentic 無限智能",
  "legalName": "無限智能股份有限公司",
  "alternateName": ["Infinity Agentic", "無限智能"],
  "url": "https://infiag.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://infiag.com/logo.png"
  },
  "description": "(各語言 hero subtitle,從 i18n schema.org.description 讀取)",
  "slogan": "打造 AI/VR 開放生態合作平台",
  "foundingDate": "2026-05-02",
  "founder": {
    "@type": "Organization",
    "name": "BSE#91 營銷一組 董事會"
  },
  "address": {
    "@type": "PostalAddress",
    "name": "BSE#91 營銷一組",
    "streetAddress": "21, Jalan Tasik Permaisuri 2",
    "addressLocality": "Bandar Tun Razak",
    "postalCode": "56000",
    "addressRegion": "Wilayah Persekutuan Kuala Lumpur",
    "addressCountry": "MY"
  },
  "contactPoint": [
    {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "jeff@infiag.com",
      "availableLanguage": ["zh-Hant", "zh-Hans", "en"],
      "areaServed": ["TW", "CN", "MY", "Global"]
    },
    {
      "@type": "ContactPoint",
      "contactType": "investor relations",
      "email": "jeff@infiag.com",
      "availableLanguage": ["zh-Hant", "zh-Hans", "en"]
    }
  ],
  "knowsAbout": [
    "(從 i18n schema.org.knowsAbout 讀取,各語言對應該語境關鍵字)"
  ]
}
```

**i18n `knowsAbout` 對照**:

- `zh-TW`: 人工智慧, 虛擬實境, 智能眼鏡, AI/VR 開放生態, 高爾夫模擬, 滑雪訓練, 兒童近視矯正, B2B 合作, 軟硬體聯盟
- `zh-CN`: 人工智能, 虚拟现实, 智能眼镜, AI/VR 开放生态, 高尔夫模拟, 滑雪训练, 儿童近视矫正, B2B 合作, 软硬件联盟
- `en`: Artificial Intelligence, Virtual Reality, Smart Glasses, AI/VR Open Ecosystem, Golf Simulation, Ski Training, Pediatric Myopia Correction, B2B Partnership, Hardware-Software Alliance

**暫不放(無資料)**: `sameAs`, `numberOfEmployees`, `award`, `memberOf`, `parentOrganization`, `subOrganization`。Luke 之後有資料再補。

### WebSite(全站基底)

```json
{
  "@type": "WebSite",
  "@id": "https://infiag.com/#website",
  "url": "https://infiag.com",
  "name": "Infinity Agentic 無限智能",
  "inLanguage": "(zh-Hant / zh-Hans / en-US,依當前 locale)",
  "publisher": { "@id": "https://infiag.com/#organization" }
}
```

### WebPage / AboutPage / ContactPage(每頁通用骨架)

```json
{
  "@type": "WebPage",
  "@id": "<page-url>#webpage",
  "url": "<page-url>",
  "name": "(頁標題,i18n)",
  "description": "(頁敘述,i18n)",
  "inLanguage": "(依當前 locale)",
  "isPartOf": { "@id": "https://infiag.com/#website" },
  "about": { "@id": "https://infiag.com/#organization" }
}
```

`/about` 用 `@type: AboutPage`,`/contact` 用 `@type: ContactPage`,其餘用 `WebPage`。

### Service(/platform, /solutions/{golf,ski,vision}, /partners)

```json
{
  "@type": "Service",
  "@id": "<page-url>#service",
  "name": "(從 i18n schema.solutions.<key>.name)",
  "description": "(從 i18n schema.solutions.<key>.description)",
  "serviceType": "(英文標籤,例: 'Golf Simulation Platform')",
  "areaServed": ["TW", "CN", "Global"],
  "provider": { "@id": "https://infiag.com/#organization" },
  "audience": {
    "@type": "Audience",
    "audienceType": "(Business / Investor / Partner / Developer)"
  }
}
```

各 service 的 `audienceType`:

- `/platform` → `Business`
- `/solutions/{golf,ski,vision}` → `Business`
- `/partners` → `Partner`

`offers` 不放(無實際定價,放了會誤導)。

## 實作方式

使用 `@nuxtjs/seo` 內建的 `nuxt-schema-org` 子模組(已隨 v5.1.3 安裝)。

### 檔案結構

```
app/
├─ composables/
│  └─ useSiteSchema.ts        # 匯出 buildOrganization() / buildWebSite() 工廠函數
├─ app.vue                    # 全站呼叫 useSchemaOrg([buildOrganization(), buildWebSite()])
└─ pages/
   ├─ index.vue               # useSchemaOrg([defineWebPage()])
   ├─ about.vue               # useSchemaOrg([defineWebPage({'@type':'AboutPage'})])
   ├─ contact.vue             # useSchemaOrg([defineWebPage({'@type':'ContactPage'})])
   ├─ platform.vue            # useSchemaOrg([defineWebPage(), defineService(...)])
   ├─ partners.vue            # useSchemaOrg([defineWebPage(), defineService(...)])
   ├─ developers.vue          # useSchemaOrg([defineWebPage()])
   ├─ investors.vue           # useSchemaOrg([defineWebPage()])
   └─ solutions/
      ├─ golf.vue             # useSchemaOrg([defineWebPage(), defineService(...)])
      ├─ ski.vue              # 同上
      └─ vision.vue           # 同上

i18n/locales/{zh-TW,zh-CN,en}.json
└─ 新增 schema.* namespace,放需要翻譯的欄位

scripts/
└─ verify-jsonld.mjs          # build 後驗證腳本(見「驗證」章節)
```

### `useSiteSchema.ts` 草案

```ts
import { useI18n } from '#imports'

// Note: vue-i18n v9+ uses `tm()` to access array/object message values.
// `t()` returns string only; `tm()` returns the raw message structure.
export function useSiteSchema() {
  const { t, tm, locale } = useI18n()
  const lang = locale.value === 'zh-TW' ? 'zh-Hant'
            : locale.value === 'zh-CN' ? 'zh-Hans'
            : 'en-US'

  const organization = defineOrganization({
    '@id': 'https://infiag.com/#organization',
    name: t('site.name'),
    legalName: t('site.company'),
    alternateName: ['Infinity Agentic', '無限智能'],
    url: 'https://infiag.com',
    logo: 'https://infiag.com/logo.png',
    description: t('schema.org.description'),
    slogan: t('site.tagline'),
    foundingDate: '2026-05-02',
    founder: { '@type': 'Organization', name: 'BSE#91 營銷一組 董事會' },
    address: {
      '@type': 'PostalAddress',
      name: 'BSE#91 營銷一組',
      streetAddress: '21, Jalan Tasik Permaisuri 2',
      addressLocality: 'Bandar Tun Razak',
      postalCode: '56000',
      addressRegion: 'Wilayah Persekutuan Kuala Lumpur',
      addressCountry: 'MY',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'jeff@infiag.com',
        availableLanguage: ['zh-Hant', 'zh-Hans', 'en'],
        areaServed: ['TW', 'CN', 'MY', 'Global'],
      },
      {
        '@type': 'ContactPoint',
        contactType: 'investor relations',
        email: 'jeff@infiag.com',
        availableLanguage: ['zh-Hant', 'zh-Hans', 'en'],
      },
    ],
    knowsAbout: tm('schema.org.knowsAbout') as string[],
  })

  const website = defineWebSite({
    '@id': 'https://infiag.com/#website',
    url: 'https://infiag.com',
    name: t('site.name'),
    inLanguage: lang,
    publisher: { '@id': 'https://infiag.com/#organization' },
  })

  return { organization, website, lang }
}
```

### i18n 新增欄位範例(zh-TW)

```json
"schema": {
  "org": {
    "description": "打造 AI/VR 開放生態合作平台,結合硬體、軟體與運動醫療機構建立跨品牌相容標準",
    "knowsAbout": [
      "人工智慧", "虛擬實境", "智能眼鏡",
      "AI/VR 開放生態", "高爾夫模擬", "滑雪訓練",
      "兒童近視矯正", "B2B 合作", "軟硬體聯盟"
    ]
  },
  "solutions": {
    "golf": {
      "name": "AI/VR 高爾夫模擬解決方案",
      "description": "..."
    },
    "ski": { "name": "...", "description": "..." },
    "vision": { "name": "...", "description": "..." }
  },
  "platform": { "name": "...", "description": "..." },
  "partners": { "name": "...", "description": "..." }
}
```

zh-CN / en 對應產出。

## 驗證

### 靜態驗證(build 時 + CI)

腳本 `scripts/verify-jsonld.mjs`,加進 `package.json` 的 `postgenerate` hook:

```
"generate": "nuxt generate && cp .output/public/200.html .output/public/index.html && node scripts/verify-jsonld.mjs"
```

腳本掃 `.output/public/**/index.html`,檢查每頁:

1. 至少存在一個 `<script type="application/ld+json">` 區塊
2. JSON 合法可 `JSON.parse()`
3. `@context === "https://schema.org"`(對單物件或陣列)
4. 路由對應正確 `@type`:
   - 全頁面都應有 `Organization` + `WebSite` + 一個以 `WebPage` / `AboutPage` / `ContactPage` 為主的物件
   - `/solutions/{golf,ski,vision}`、`/platform`、`/partners` 應額外有 `Service`
5. `inLanguage` 與該頁 locale 路徑前綴一致(`/zh-CN/...` → `zh-Hans`)
6. 所有 `@id` URL 有效(同 origin、無 typo)

### 外部驗證(手動,deploy 前)

- [Schema.org Validator](https://validator.schema.org)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- 至少跑 home / solutions/golf / contact 三語版本,確認無 error / warning

### AI agent 抓取測試(deploy 後)

- `curl https://infiag.com` 確認 SSG 已內嵌 JSON-LD(非 client-render)
- 用 ChatGPT / Claude / Perplexity 的 web 工具 query:
  - 「Infinity Agentic 是做什麼的?」→ 應引用 `description` / `knowsAbout`
  - 「Infinity Agentic 的合作聯絡方式?」→ 應引用 `contactPoint.email`
  - 「Infinity Agentic 提供什麼解決方案?」→ 應引用 `Service.name`

## 驗收條件

1. 24 個 URL(8 頁 × 3 語)都有合法 JSON-LD,`verify-jsonld.mjs` 全綠
2. Schema.org validator 對抽樣 3 頁 × 3 語 = 9 個 URL 無 error
3. AI agent query 三題能回出正確欄位內容(至少 2/3 通過)

## 開放項目(等 Luke 補資料即可加入)

- `sameAs`(社群連結):LinkedIn / X / YouTube / 微信公眾號 / Facebook 等
- `numberOfEmployees`
- `award` / `memberOf` / `parentOrganization` / `subOrganization`
- `logo` 實際路徑與尺寸(目前用 `/logo.png` placeholder,需確認檔案存在)
- 各 `Service` 物件的 `name` / `description` 三語文案(`schema.solutions.{golf,ski,vision}` / `schema.platform` / `schema.partners`):實作時可先從現有頁面文案抽取,Luke 再潤飾

## 不做(YAGNI)

- `BreadcrumbList`:現站結構淺,使用者體驗不需要
- `FAQPage`:目前無 FAQ 區塊,有了再加
- `Article` / `TechArticle` 集合(developers 頁):內容尚未成熟
- `InvestmentOrDeposit`:schema.org 該類型語意是金融商品,與「給投資人看的頁面」語意不符
- `SearchAction`:站內無搜尋功能
- 三語 JSON-LD 同頁並存:違反 schema.org 慣例,讓 HTML 變胖
