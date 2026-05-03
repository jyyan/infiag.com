# JSON-LD Metadata Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Inject schema.org-compliant JSON-LD on all 24 URLs (8 pages × 3 locales) of infiag.com so B2B AI agents and search engines can extract Organization, Service, and ContactPoint data.

**Architecture:** Site-wide `Organization` + `WebSite` injected via `app.vue`; per-page `WebPage` / `AboutPage` / `ContactPage` (+ `Service` for solution pages) injected by each page. All implemented through `@nuxtjs/seo`'s bundled `nuxt-schema-org` module using auto-imported `defineOrganization()` / `defineWebSite()` / `defineWebPage()` helpers and plain objects for `Service` (which is not auto-imported). Translations via i18n's `tm()` (vue-i18n's array-message accessor — **not** `t()` with `returnObjects`).

**Tech Stack:** Nuxt 3 SSG, Vue 3, `@nuxtjs/seo` v5.1.3 (bundles `nuxt-schema-org` v6.0.4), `@nuxtjs/i18n` v10.3.0 (vue-i18n v9), Node ≥18.

**Spec:** `docs/superpowers/specs/2026-05-03-jsonld-metadata-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `scripts/verify-jsonld.mjs` | Create | Static analyzer: walks `.output/public/**/index.html`, parses JSON-LD blocks, asserts route→type expectations |
| `i18n/locales/zh-TW.json` | Modify | Add `schema.*` namespace (description, knowsAbout array, per-service name+description) |
| `i18n/locales/zh-CN.json` | Modify | Same namespace, simplified Chinese |
| `i18n/locales/en.json` | Modify | Same namespace, English |
| `app/composables/useSiteSchema.ts` | Create | Factory that returns `{ organization, website, lang }` for the current locale |
| `app/app.vue` | Modify | Call `useSiteSchema()` and inject Organization+WebSite via `useSchemaOrg([...])` |
| `app/pages/index.vue` | Modify | Add `WebPage` |
| `app/pages/about.vue` | Modify | Add `AboutPage` |
| `app/pages/contact.vue` | Modify | Add `ContactPage` |
| `app/pages/developers.vue` | Modify | Add `WebPage` |
| `app/pages/investors.vue` | Modify | Add `WebPage` |
| `app/pages/platform.vue` | Modify | Add `WebPage` + `Service` |
| `app/pages/partners.vue` | Modify | Add `WebPage` + `Service` |
| `app/pages/solutions/golf.vue` | Modify | Add `WebPage` + `Service` |
| `app/pages/solutions/ski.vue` | Modify | Add `WebPage` + `Service` |
| `app/pages/solutions/vision.vue` | Modify | Add `WebPage` + `Service` |
| `package.json` | Modify | Chain `verify-jsonld.mjs` after `nuxt generate` |

---

## Conventions

- **Working dir:** all relative paths in commands assume cwd = `/home/sss2500/codejobs/infiag.com`
- **Locales:** zh-TW (繁中, default), zh-CN (簡中), en. With `i18n.strategy: 'prefix'`, `nuxt generate` outputs `.output/public/zh-TW/...`, `.output/public/zh-CN/...`, `.output/public/en/...`. Root `index.html` is a redirect produced by `scripts/write-root-redirect.mjs`.
- **Site URL:** `https://infiag.com` (from `nuxt.config.ts` `site.url`)
- **Locale → BCP-47 inLanguage:** `zh-TW → zh-Hant`, `zh-CN → zh-Hans`, `en → en-US`

---

## Task 1: Verification script (TDD anchor)

**Files:**
- Create: `scripts/verify-jsonld.mjs`

- [ ] **Step 1: Create the verifier script**

```js
// scripts/verify-jsonld.mjs
// Walks the built static site and asserts each route has the expected JSON-LD.
// Exit code 0 on success, 1 on any failure.

import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distRoot = join(__dirname, '..', '.output', 'public')

const LOCALES = [
  { dir: 'zh-TW', inLanguage: 'zh-Hant' },
  { dir: 'zh-CN', inLanguage: 'zh-Hans' },
  { dir: 'en',    inLanguage: 'en-US' },
]

// Per-route expectations: each entry is { path, expectedTypes }
// expectedTypes lists @type values that MUST appear in the page's JSON-LD graph.
const ROUTES = [
  { path: '',                  expectedTypes: ['Organization', 'WebSite', 'WebPage'] },
  { path: 'about',             expectedTypes: ['Organization', 'WebSite', 'AboutPage'] },
  { path: 'contact',           expectedTypes: ['Organization', 'WebSite', 'ContactPage'] },
  { path: 'developers',        expectedTypes: ['Organization', 'WebSite', 'WebPage'] },
  { path: 'investors',         expectedTypes: ['Organization', 'WebSite', 'WebPage'] },
  { path: 'platform',          expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'partners',          expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'solutions/golf',    expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'solutions/ski',     expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
  { path: 'solutions/vision',  expectedTypes: ['Organization', 'WebSite', 'WebPage', 'Service'] },
]

const failures = []
const successes = []

function extractJsonLd(html) {
  const blocks = []
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let m
  while ((m = re.exec(html)) !== null) {
    try {
      blocks.push(JSON.parse(m[1].trim()))
    } catch (err) {
      blocks.push({ __parseError: err.message, raw: m[1] })
    }
  }
  return blocks
}

function flattenGraph(parsed) {
  // nuxt-schema-org outputs a single block: { @context, @graph: [...] }
  // Or sometimes an array of blocks. Normalize to an array of nodes.
  const nodes = []
  const visit = (b) => {
    if (Array.isArray(b)) { b.forEach(visit); return }
    if (b && typeof b === 'object') {
      if (Array.isArray(b['@graph'])) { b['@graph'].forEach(visit); return }
      nodes.push(b)
    }
  }
  parsed.forEach(visit)
  return nodes
}

function check(localeDir, inLanguage, route, expectedTypes) {
  const htmlPath = join(distRoot, localeDir, route.path, 'index.html')
  const label = `${localeDir}/${route.path || '(root)'}`

  if (!existsSync(htmlPath)) {
    failures.push(`${label}: missing file at ${htmlPath}`)
    return
  }
  const html = readFileSync(htmlPath, 'utf8')
  const blocks = extractJsonLd(html)
  if (blocks.length === 0) {
    failures.push(`${label}: no <script type="application/ld+json"> block found`)
    return
  }
  const parseErrors = blocks.filter(b => b.__parseError)
  if (parseErrors.length > 0) {
    failures.push(`${label}: JSON parse error: ${parseErrors[0].__parseError}`)
    return
  }
  const nodes = flattenGraph(blocks)
  const types = new Set()
  for (const n of nodes) {
    if (typeof n['@type'] === 'string') types.add(n['@type'])
    else if (Array.isArray(n['@type'])) n['@type'].forEach(t => types.add(t))
  }
  const missing = expectedTypes.filter(t => !types.has(t))
  if (missing.length > 0) {
    failures.push(`${label}: missing @type values [${missing.join(', ')}]; saw [${[...types].join(', ')}]`)
    return
  }
  // Check inLanguage on at least one WebPage-ish node
  const pageNode = nodes.find(n => {
    const t = n['@type']
    return t === 'WebPage' || t === 'AboutPage' || t === 'ContactPage'
  })
  if (pageNode && pageNode.inLanguage !== inLanguage) {
    failures.push(`${label}: page node inLanguage = ${JSON.stringify(pageNode.inLanguage)}, expected ${inLanguage}`)
    return
  }
  successes.push(label)
}

if (!existsSync(distRoot)) {
  console.error(`✗ dist root not found: ${distRoot}`)
  console.error('  Run "nuxt generate" first.')
  process.exit(1)
}

for (const loc of LOCALES) {
  for (const route of ROUTES) {
    check(loc.dir, loc.inLanguage, route, route.expectedTypes)
  }
}

const total = LOCALES.length * ROUTES.length
console.log(`\n=== JSON-LD verification ===`)
console.log(`PASS: ${successes.length}/${total}`)
console.log(`FAIL: ${failures.length}/${total}`)
if (failures.length > 0) {
  console.log(`\nFailures:`)
  failures.forEach(f => console.log(`  ✗ ${f}`))
  process.exit(1)
}
console.log(`✓ All routes have valid JSON-LD with expected @types.`)
```

- [ ] **Step 2: Sanity-run the script (must error because nothing built yet, OR fail with no JSON-LD on existing build)**

Run: `node scripts/verify-jsonld.mjs`

Expected: exit 1. Either "dist root not found" or many "no <script type=\"application/ld+json\">" failures.

- [ ] **Step 3: Commit**

```bash
git add scripts/verify-jsonld.mjs
git commit -m "test(jsonld): add verify-jsonld.mjs to assert route → @type map"
```

---

## Task 2: Add `schema` namespace to all three i18n locale files

**Files:**
- Modify: `i18n/locales/zh-TW.json`
- Modify: `i18n/locales/zh-CN.json`
- Modify: `i18n/locales/en.json`

- [ ] **Step 1: Append `schema` namespace to `i18n/locales/zh-TW.json`**

Open `i18n/locales/zh-TW.json`. Inside the top-level object, before the closing `}`, after the existing `"lang": { "switch": "語言" }` entry, add a comma at the end of the `lang` block and append:

```json
,
"schema": {
  "org": {
    "description": "打造 AI/VR 開放生態合作平台,結合硬體、軟體與運動醫療機構建立跨品牌相容標準",
    "knowsAbout": [
      "人工智慧",
      "虛擬實境",
      "智能眼鏡",
      "AI/VR 開放生態",
      "高爾夫模擬",
      "滑雪訓練",
      "兒童近視矯正",
      "B2B 合作",
      "軟硬體聯盟"
    ]
  },
  "platform": {
    "name": "Infinity Agentic 開放平台",
    "description": "跨品牌相容的 AI/VR 軟硬體標準與 SDK,讓單一程式碼運行於所有相容裝置。"
  },
  "partners": {
    "name": "Infinity Agentic 合作夥伴計畫",
    "description": "硬體廠、軟體廠、運動與醫療機構的策略結盟方案,含捕獲期條款與專利打包授權。"
  },
  "solutions": {
    "golf": {
      "name": "AI/VR 高爾夫模擬解決方案",
      "description": "AI 揮桿分析與沉浸式 VR 練習場,專為高消費力玩家打造。"
    },
    "ski": {
      "name": "AI/VR 滑雪訓練解決方案",
      "description": "雪季前虛擬訓練、雪道上 AR 教練輔助。"
    },
    "vision": {
      "name": "兒童近視矯正解決方案",
      "description": "結合臨床標準的兒童近視預防與矯正系統。"
    }
  }
}
```

- [ ] **Step 2: Append `schema` namespace to `i18n/locales/zh-CN.json`**

Same structure, simplified Chinese:

```json
,
"schema": {
  "org": {
    "description": "打造 AI/VR 开放生态合作平台,结合硬件、软件与运动医疗机构建立跨品牌相容标准",
    "knowsAbout": [
      "人工智能",
      "虚拟现实",
      "智能眼镜",
      "AI/VR 开放生态",
      "高尔夫模拟",
      "滑雪训练",
      "儿童近视矫正",
      "B2B 合作",
      "软硬件联盟"
    ]
  },
  "platform": {
    "name": "Infinity Agentic 开放平台",
    "description": "跨品牌相容的 AI/VR 软硬件标准与 SDK,让单一代码运行于所有相容设备。"
  },
  "partners": {
    "name": "Infinity Agentic 合作伙伴计划",
    "description": "硬件厂、软件厂、运动与医疗机构的策略结盟方案,含捕获期条款与专利打包授权。"
  },
  "solutions": {
    "golf": {
      "name": "AI/VR 高尔夫模拟解决方案",
      "description": "AI 挥杆分析与沉浸式 VR 练习场,专为高消费力玩家打造。"
    },
    "ski": {
      "name": "AI/VR 滑雪训练解决方案",
      "description": "雪季前虚拟训练、雪道上 AR 教练辅助。"
    },
    "vision": {
      "name": "儿童近视矫正解决方案",
      "description": "结合临床标准的儿童近视预防与矫正系统。"
    }
  }
}
```

- [ ] **Step 3: Append `schema` namespace to `i18n/locales/en.json`**

```json
,
"schema": {
  "org": {
    "description": "Building an open AI/VR ecosystem platform that aligns hardware vendors, software developers, and sports/medical institutions on cross-brand interoperability standards.",
    "knowsAbout": [
      "Artificial Intelligence",
      "Virtual Reality",
      "Smart Glasses",
      "AI/VR Open Ecosystem",
      "Golf Simulation",
      "Ski Training",
      "Pediatric Myopia Correction",
      "B2B Partnership",
      "Hardware-Software Alliance"
    ]
  },
  "platform": {
    "name": "Infinity Agentic Open Platform",
    "description": "Cross-brand AI/VR hardware-software standards and SDK — write once, run on any compliant device."
  },
  "partners": {
    "name": "Infinity Agentic Partner Program",
    "description": "Strategic alliance program for hardware makers, software developers, and sports/medical institutions, with capture-period clauses and bundled IP licensing."
  },
  "solutions": {
    "golf": {
      "name": "AI/VR Golf Simulation Solution",
      "description": "AI swing analysis and immersive VR practice for serious players."
    },
    "ski": {
      "name": "AI/VR Ski Training Solution",
      "description": "Pre-season virtual training and on-slope AR coaching for skiers."
    },
    "vision": {
      "name": "Pediatric Myopia Correction Solution",
      "description": "Clinically grounded vision-control system for children."
    }
  }
}
```

- [ ] **Step 4: Validate all three JSON files parse**

Run: `node -e "['zh-TW','zh-CN','en'].forEach(l => JSON.parse(require('fs').readFileSync('i18n/locales/'+l+'.json','utf8')) && console.log('OK',l))"`

Expected: `OK zh-TW`, `OK zh-CN`, `OK en` — no parse errors.

- [ ] **Step 5: Commit**

```bash
git add i18n/locales/zh-TW.json i18n/locales/zh-CN.json i18n/locales/en.json
git commit -m "i18n(schema): add schema.* namespace for JSON-LD content (3 locales)"
```

---

## Task 3: Create the `useSiteSchema` composable

**Files:**
- Create: `app/composables/useSiteSchema.ts`

- [ ] **Step 1: Write the composable**

```ts
// app/composables/useSiteSchema.ts
// Builds the site-wide Organization + WebSite schema for the current locale.
// Called once from app.vue. Returns plain objects ready to pass into useSchemaOrg().
//
// Note on i18n: vue-i18n v9+ uses tm() to access non-string messages (arrays /
// nested objects). t() coerces to string and would return "[object Object]"
// or stringify the array, which is wrong for schema fields.

export function useSiteSchema() {
  const { t, tm, locale } = useI18n()

  const localeToBcp47: Record<string, string> = {
    'zh-TW': 'zh-Hant',
    'zh-CN': 'zh-Hans',
    'en': 'en-US',
  }
  const lang = localeToBcp47[locale.value] ?? 'en-US'

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
    founder: {
      '@type': 'Organization',
      name: 'BSE#91 營銷一組 董事會',
    },
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

- [ ] **Step 2: Type-check the project**

Run: `npx nuxt prepare && npx vue-tsc --noEmit 2>&1 | head -40`

Expected: no errors referencing `useSiteSchema.ts`. (`defineOrganization` / `defineWebSite` / `useI18n` are auto-imported by their respective Nuxt modules; if `vue-tsc` is not installed, run `npx nuxi typecheck` instead.)

- [ ] **Step 3: Commit**

```bash
git add app/composables/useSiteSchema.ts
git commit -m "feat(schema): add useSiteSchema composable for site-wide JSON-LD"
```

---

## Task 4: Wire site-wide schema into `app.vue`

**Files:**
- Modify: `app/app.vue`

- [ ] **Step 1: Replace `app/app.vue` contents**

```vue
<script setup lang="ts">
const { organization, website } = useSiteSchema()
useSchemaOrg([organization, website])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 2: Build the static site**

Run: `npm run generate 2>&1 | tail -30`

Expected: `nuxt generate` finishes, `.output/public/` populated. (Build may take 1-2 min.)

- [ ] **Step 3: Run the verifier — expect partial failure**

Run: `node scripts/verify-jsonld.mjs`

Expected: exit 1. `Organization` and `WebSite` should now be present on every page (no longer reported missing), but the per-page `WebPage` / `AboutPage` / `ContactPage` / `Service` types are still missing — failures will list those.

If `Organization` or `WebSite` are still missing on a sampled page (e.g. `zh-TW/(root)`), inspect `.output/public/zh-TW/index.html` — search for `application/ld+json`. The block must exist; if not, debug `app/app.vue` wiring before continuing.

- [ ] **Step 4: Commit**

```bash
git add app/app.vue
git commit -m "feat(schema): inject site-wide Organization + WebSite via app.vue"
```

---

## Task 5: Add `WebPage` / `AboutPage` to four simple pages (home, about, developers, investors)

**Files:**
- Modify: `app/pages/index.vue`
- Modify: `app/pages/about.vue`
- Modify: `app/pages/developers.vue`
- Modify: `app/pages/investors.vue`

- [ ] **Step 1: Add `WebPage` to `app/pages/index.vue`**

In `app/pages/index.vue`, the `<script setup lang="ts">` block currently begins:

```ts
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { alliance, pitchDeck } = useMailto()

usePageSeo({
  title: t('home.hero_title_1') + ' ' + t('home.hero_title_2'),
})
```

Immediately after the `usePageSeo({...})` call, add:

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/#webpage',
    url: 'https://infiag.com',
    name: () => `${t('home.hero_title_1')} ${t('home.hero_title_2')}`,
    description: () => t('home.hero_subtitle'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
```

- [ ] **Step 2: Add `AboutPage` to `app/pages/about.vue`**

Inspect the existing `<script setup>` to find where i18n is set up (typically `const { t } = useI18n()`). After the `usePageSeo({...})` call (or at the end of the script if no `usePageSeo`), add:

```ts
useSchemaOrg([
  defineWebPage({
    '@type': 'AboutPage',
    '@id': 'https://infiag.com/about#webpage',
    url: 'https://infiag.com/about',
    name: () => t('nav.about'),
    description: () => t('schema.org.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
```

If `t` is not yet imported in `about.vue`, add `const { t } = useI18n()` at the top of the script.

- [ ] **Step 3: Add `WebPage` to `app/pages/developers.vue`**

After existing setup, add:

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/developers#webpage',
    url: 'https://infiag.com/developers',
    name: () => t('nav.developers'),
    description: () => t('schema.org.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
```

If `t` is not yet imported, add `const { t } = useI18n()`.

- [ ] **Step 4: Add `WebPage` to `app/pages/investors.vue`**

After existing setup, add:

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/investors#webpage',
    url: 'https://infiag.com/investors',
    name: () => t('nav.investors'),
    description: () => t('schema.org.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
```

If `t` is not yet imported, add `const { t } = useI18n()`.

- [ ] **Step 5: Build and verify**

Run: `npm run generate 2>&1 | tail -10 && node scripts/verify-jsonld.mjs`

Expected: 4 pages × 3 locales = 12 routes now PASS. Routes still failing: `contact`, `platform`, `partners`, `solutions/{golf,ski,vision}` (each × 3 = 18 remaining).

- [ ] **Step 6: Commit**

```bash
git add app/pages/index.vue app/pages/about.vue app/pages/developers.vue app/pages/investors.vue
git commit -m "feat(schema): add WebPage/AboutPage JSON-LD to home, about, developers, investors"
```

---

## Task 6: Add `ContactPage` to `app/pages/contact.vue`

**Files:**
- Modify: `app/pages/contact.vue`

- [ ] **Step 1: Add `ContactPage` schema**

After existing setup in `app/pages/contact.vue` (add `const { t } = useI18n()` if absent):

```ts
useSchemaOrg([
  defineWebPage({
    '@type': 'ContactPage',
    '@id': 'https://infiag.com/contact#webpage',
    url: 'https://infiag.com/contact',
    name: () => t('nav.contact'),
    description: () => t('schema.org.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])
```

(`ContactPoint` data is already on `Organization` — no separate node needed.)

- [ ] **Step 2: Build and verify**

Run: `npm run generate 2>&1 | tail -10 && node scripts/verify-jsonld.mjs`

Expected: 5 pages × 3 locales = 15 routes PASS. 9 routes still failing (platform, partners, solutions × 3 each).

- [ ] **Step 3: Commit**

```bash
git add app/pages/contact.vue
git commit -m "feat(schema): add ContactPage JSON-LD to contact page"
```

---

## Task 7: Add `WebPage` + `Service` to the three solution pages

**Files:**
- Modify: `app/pages/solutions/golf.vue`
- Modify: `app/pages/solutions/ski.vue`
- Modify: `app/pages/solutions/vision.vue`

- [ ] **Step 1: Add schema to `app/pages/solutions/golf.vue`**

After existing setup (add `const { t } = useI18n()` if absent):

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/solutions/golf#webpage',
    url: 'https://infiag.com/solutions/golf',
    name: () => t('schema.solutions.golf.name'),
    description: () => t('schema.solutions.golf.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/solutions/golf#service',
    name: () => t('schema.solutions.golf.name'),
    description: () => t('schema.solutions.golf.description'),
    serviceType: 'Golf Simulation Platform',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Business' },
  },
])
```

- [ ] **Step 2: Add schema to `app/pages/solutions/ski.vue`**

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/solutions/ski#webpage',
    url: 'https://infiag.com/solutions/ski',
    name: () => t('schema.solutions.ski.name'),
    description: () => t('schema.solutions.ski.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/solutions/ski#service',
    name: () => t('schema.solutions.ski.name'),
    description: () => t('schema.solutions.ski.description'),
    serviceType: 'Ski Training Platform',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Business' },
  },
])
```

- [ ] **Step 3: Add schema to `app/pages/solutions/vision.vue`**

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/solutions/vision#webpage',
    url: 'https://infiag.com/solutions/vision',
    name: () => t('schema.solutions.vision.name'),
    description: () => t('schema.solutions.vision.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/solutions/vision#service',
    name: () => t('schema.solutions.vision.name'),
    description: () => t('schema.solutions.vision.description'),
    serviceType: 'Pediatric Myopia Correction',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Business' },
  },
])
```

- [ ] **Step 4: Build and verify**

Run: `npm run generate 2>&1 | tail -10 && node scripts/verify-jsonld.mjs`

Expected: 8 pages × 3 locales = 24 - 6 = 18 PASS. 6 routes still failing: `platform`, `partners` (× 3 each).

- [ ] **Step 5: Commit**

```bash
git add app/pages/solutions/golf.vue app/pages/solutions/ski.vue app/pages/solutions/vision.vue
git commit -m "feat(schema): add WebPage+Service JSON-LD to three solution pages"
```

---

## Task 8: Add `WebPage` + `Service` to platform and partners

**Files:**
- Modify: `app/pages/platform.vue`
- Modify: `app/pages/partners.vue`

- [ ] **Step 1: Add schema to `app/pages/platform.vue`**

After existing setup (add `const { t } = useI18n()` if absent):

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/platform#webpage',
    url: 'https://infiag.com/platform',
    name: () => t('schema.platform.name'),
    description: () => t('schema.platform.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/platform#service',
    name: () => t('schema.platform.name'),
    description: () => t('schema.platform.description'),
    serviceType: 'AI/VR Open Platform',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Business' },
  },
])
```

- [ ] **Step 2: Add schema to `app/pages/partners.vue`**

```ts
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/partners#webpage',
    url: 'https://infiag.com/partners',
    name: () => t('schema.partners.name'),
    description: () => t('schema.partners.description'),
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
  {
    '@type': 'Service',
    '@id': 'https://infiag.com/partners#service',
    name: () => t('schema.partners.name'),
    description: () => t('schema.partners.description'),
    serviceType: 'B2B Partnership Program',
    areaServed: ['TW', 'CN', 'Global'],
    provider: { '@id': 'https://infiag.com/#organization' },
    audience: { '@type': 'Audience', audienceType: 'Partner' },
  },
])
```

- [ ] **Step 3: Build and verify**

Run: `npm run generate 2>&1 | tail -10 && node scripts/verify-jsonld.mjs`

Expected: ALL 24 routes PASS. Final line: `✓ All routes have valid JSON-LD with expected @types.`

- [ ] **Step 4: Commit**

```bash
git add app/pages/platform.vue app/pages/partners.vue
git commit -m "feat(schema): add WebPage+Service JSON-LD to platform and partners"
```

---

## Task 9: Wire `verify-jsonld.mjs` into the `generate` script

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Inspect current `scripts.generate`**

Run: `node -e "console.log(JSON.parse(require('fs').readFileSync('package.json','utf8')).scripts.generate)"`

Expected output (current):
```
nuxt generate && cp .output/public/200.html .output/public/index.html
```

(There is a separate untracked `scripts/write-root-redirect.mjs` per `git status`. If it has been integrated into `scripts.generate` by the time you reach this step, preserve that chain — only append `&& node scripts/verify-jsonld.mjs` at the end.)

- [ ] **Step 2: Update `scripts.generate` in `package.json`**

Edit `package.json`'s `"scripts"."generate"` to chain the verifier at the end:

```
"generate": "nuxt generate && cp .output/public/200.html .output/public/index.html && node scripts/verify-jsonld.mjs"
```

- [ ] **Step 3: Re-run full generate to confirm chained command succeeds end-to-end**

Run: `npm run generate 2>&1 | tail -20`

Expected: `nuxt generate` runs, copy succeeds, verifier prints `✓ All routes have valid JSON-LD with expected @types.`, exit 0.

- [ ] **Step 4: Commit**

```bash
git add package.json
git commit -m "build: run verify-jsonld after nuxt generate to gate JSON-LD correctness"
```

---

## Task 10: External validation (manual, deploy gate)

**Files:** none (this task is a manual checklist)

- [ ] **Step 1: Inspect a generated page locally**

Run: `grep -A 0 'application/ld+json' .output/public/zh-TW/index.html | head -3`

Expected: at least one `<script type="application/ld+json">` line printed.

Also run: `grep -c 'application/ld+json' .output/public/en/solutions/golf/index.html`

Expected: `1` or higher.

- [ ] **Step 2: Validate sample pages with Schema.org Validator**

Open in a browser:
- https://validator.schema.org

For each of these URLs (after deploying, or paste rendered HTML for local files), confirm zero errors and acceptable warnings:
- `https://infiag.com/zh-TW/`
- `https://infiag.com/en/`
- `https://infiag.com/zh-TW/solutions/golf`
- `https://infiag.com/en/solutions/golf`
- `https://infiag.com/zh-TW/contact`
- `https://infiag.com/en/contact`

Acceptable warnings: missing optional fields like `image`, `sameAs`. Errors must be zero.

- [ ] **Step 3: Validate with Google Rich Results Test**

Open: https://search.google.com/test/rich-results

Test the same URLs. Expected: at least `Organization` detected, no parse errors.

- [ ] **Step 4: Sanity-check live AI extraction (post-deploy)**

After Cloudflare deploy completes, ask Claude.ai or ChatGPT (with web tools) the following queries and confirm answers cite the correct fields:

1. `What is Infinity Agentic and what services do they offer?` → should reference `description` / `knowsAbout` / `Service` names
2. `How can I contact Infinity Agentic for a partnership?` → should surface `jeff@infiag.com` from `ContactPoint`
3. `Where is Infinity Agentic based?` → should reference Malaysia / Kuala Lumpur from `address`

Pass criterion: at least 2 of 3 queries return correct, schema-derived facts.

- [ ] **Step 5: Final commit (if anything was tweaked during validation)**

If validators surfaced fixable issues (e.g. typo in a `serviceType`, missing field), fix and commit:

```bash
git add -p
git commit -m "fix(schema): address validator feedback on <field>"
```

If nothing required changes, no commit needed.

---

## Acceptance Criteria

1. `npm run generate` exits 0 with `✓ All routes have valid JSON-LD with expected @types.`
2. Schema.org Validator reports zero errors on at least 6 sampled URLs (3 pages × 2 locales)
3. Google Rich Results Test detects `Organization` on the home page in all 3 locales
4. AI agent query returns correct schema-derived facts on ≥ 2 of 3 test prompts (manual)

## Out of Scope (per spec)

- `BreadcrumbList`, `FAQPage`, `Article`/`TechArticle`, `InvestmentOrDeposit`, `SearchAction`
- Three-language JSON-LD on a single URL
- `sameAs`, `numberOfEmployees`, `award`, `memberOf`, `parentOrganization`, `subOrganization` — defer until Luke supplies data
