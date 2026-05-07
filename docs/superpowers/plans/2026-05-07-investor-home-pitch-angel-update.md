# 投資人專區 + 首頁 pitch-angel 整合 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 pitch-angel.html 的關鍵敘事（資本後盾、APAC 市場、三條收益、退場路徑）+ 公司使命「讓全天下沒有學不會 AI 的銀髮族」+ 林偉賢老師真情推薦詞，整合到首頁、投資人專區與 About 三個頁面。

**Architecture:** 沿用既有 Nuxt 3 + Tailwind + shadcn-vue 架構與三語 i18n（zh-TW / zh-CN / en）。新增 5 個元件（MissionBar / CapitalBackers / AdvisorCard / RevenueStreams / ExitPaths）。改寫 2 個元件（PainPointStats → MarketOpportunity；BusinessFlywheel 內容）。投資人頁全面重寫為 LUMI 主軸，拿掉舊的 Qualcomm/PlayStation/Android 平台論述。AdvisorCard 用 shadcn-vue Dialog 展開全文（首頁/投資人頁），About 頁直接 inline 全文。

**Tech Stack:** Nuxt 3 + Vue 3 + TypeScript + Tailwind + shadcn-vue + @nuxt/content + @nuxtjs/i18n + @vueuse/motion

**Verification:** 此專案無單元測試框架。每個 task 的驗證方式為：
- `pnpm generate` 必須通過（含 prerender + verify-jsonld.mjs）
- 三語視覺檢查（dev server + Playwright MCP screenshot）
- i18n key 完整性檢查：grep 確認 .vue 引用的 key 在三個 locale 檔皆存在

**Spec reference:** `docs/superpowers/specs/2026-05-07-investor-home-pitch-angel-update-design.md`

---

## 預設指引

- 每個 task 完成後 commit 一次（feat / refactor / chore 視類型）
- i18n 異動三檔（zh-TW.json / zh-CN.json / en.json）必須同步；zh-TW 為主語、zh-CN 為簡體鏡像、en 為英譯
- 元件遵循既有風格：v-motion + FadeInUp + glass-card + grid-tech 背景 + lumi-purple/lumi-pink 漸層
- 路徑前綴 `/home/sss2500/codejobs/infiag.com` 全部省略

---

## Task 1: 壓縮 Marvel logo

**Files:**
- Modify: `public/img/backers/marvel.png` (1.1MB → < 80KB)

- [ ] **Step 1: 用 ImageMagick 壓縮 Marvel logo 為較小的 png（保留透明度）**

```bash
cd /home/sss2500/codejobs/infiag.com
# 先看是否有 ImageMagick
which magick convert
# 取現原始尺寸
identify public/img/backers/marvel.png
```

預期輸出：原檔約 1.1MB，可能尺寸過大。

- [ ] **Step 2: 縮圖到合理寬度 + 重壓**

```bash
cd /home/sss2500/codejobs/infiag.com
# 備份
cp public/img/backers/marvel.png public/img/backers/marvel.original.png
# 縮為 max-width 800px + 高品質 png 壓縮
magick public/img/backers/marvel.original.png -resize '800x>' -strip -define png:compression-level=9 public/img/backers/marvel.png
ls -la public/img/backers/marvel.png
# 確認 < 80KB
```

預期：marvel.png < 80KB，視覺品質維持。如果 ImageMagick 不可用，改用 `pnpm dlx sharp-cli` 或同等工具。

- [ ] **Step 3: 刪除備份**

```bash
cd /home/sss2500/codejobs/infiag.com
rm public/img/backers/marvel.original.png
```

- [ ] **Step 4: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add public/img/backers/marvel.png
git commit -m "chore(assets): compress marvel.png from 1.1MB to <80KB

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 2: 加裝 shadcn-vue Dialog 元件

**Files:**
- Create: `app/components/ui/dialog/Dialog.vue` 等（shadcn CLI 自動產生）
- Create: `app/components/ui/dialog/index.ts`

- [ ] **Step 1: 用 shadcn-vue CLI 加 Dialog**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dlx shadcn-vue@latest add dialog
```

預期：CLI 互動詢問位置（依 components.json，會放到 `app/components/ui/dialog/`）。如果 CLI 詢問是否覆寫、是否啟用 TypeScript 等，全部接受預設。

- [ ] **Step 2: 確認生成的檔案結構**

```bash
ls app/components/ui/dialog/
```

預期輸出包含：Dialog.vue, DialogContent.vue, DialogDescription.vue, DialogFooter.vue, DialogHeader.vue, DialogTitle.vue, DialogTrigger.vue, DialogClose.vue, index.ts

- [ ] **Step 3: 快速 smoke test — 建議在 `app/pages/index.vue` 暫時插入一個 Dialog 確認可正常運作**

不需要實際插入，僅確認 import 不會錯。執行：
```bash
cd /home/sss2500/codejobs/infiag.com
pnpm install  # 確保依賴對齊
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW > /dev/null && echo OK
kill %1 2>/dev/null
```

預期：頁面正常 200。

- [ ] **Step 4: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add app/components/ui/dialog/ package.json pnpm-lock.yaml 2>/dev/null
git commit -m "feat(ui): add shadcn-vue dialog component for advisor full-speech modal

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 3: 加 Mission i18n key + 建 MissionBar 元件

**Files:**
- Modify: `i18n/locales/zh-TW.json` (新增 `home.lumi.mission`)
- Modify: `i18n/locales/zh-CN.json`
- Modify: `i18n/locales/en.json`
- Create: `app/components/home/MissionBar.vue`
- Modify: `app/pages/index.vue` (新增使用 MissionBar)

- [ ] **Step 1: 加 i18n keys（zh-TW）**

`i18n/locales/zh-TW.json` 中於 `home.lumi.hero` 之前插入：

```json
"mission": {
  "eyebrow_mission": "使命 · MISSION",
  "mission": "讓全天下沒有學不會 AI 的銀髮族",
  "eyebrow_value": "核心價值 · CORE VALUE",
  "value": "長者為重"
},
```

- [ ] **Step 2: 加 i18n keys（zh-CN）— 同上但簡體**

```json
"mission": {
  "eyebrow_mission": "使命 · MISSION",
  "mission": "让全天下没有学不会 AI 的银发族",
  "eyebrow_value": "核心价值 · CORE VALUE",
  "value": "长者为重"
},
```

- [ ] **Step 3: 加 i18n keys（en）— 英譯**

```json
"mission": {
  "eyebrow_mission": "MISSION",
  "mission": "No senior left behind in the AI era",
  "eyebrow_value": "CORE VALUE",
  "value": "Elders First"
},
```

- [ ] **Step 4: 建立 `app/components/home/MissionBar.vue`**

```vue
<script setup lang="ts">
defineProps<{
  eyebrowMission: string
  mission: string
  eyebrowValue: string
  value: string
}>()
</script>

<template>
  <section class="py-12 lg:py-14 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-r from-lumi-purple/8 via-lumi-pink/6 to-lumi-purple/8" />
    <div class="absolute inset-0 grid-tech opacity-30 pointer-events-none" />
    <div class="container-tight relative">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
        <FadeInUp :delay="0">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink mb-2">
            {{ eyebrowMission }}
          </p>
          <p class="text-xl md:text-2xl lg:text-3xl font-display font-bold text-fg-primary leading-tight">
            {{ mission }}
          </p>
        </FadeInUp>
        <FadeInUp :delay="120">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink mb-2 md:text-right">
            {{ eyebrowValue }}
          </p>
          <p class="text-xl md:text-2xl lg:text-3xl font-display font-bold text-lumi-gradient md:text-right">
            {{ value }}
          </p>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 5: 在 `app/pages/index.vue` 引入 MissionBar — 插在 Hero 與 StuckPersonSection 之間**

於 `<HeroLumi />` 結尾後（`<!-- 2. Stuck person opening -->` 之前）插入：

```vue
    <!-- 1.5. Mission bar -->
    <MissionBar
      :eyebrow-mission="t('home.lumi.mission.eyebrow_mission')"
      :mission="t('home.lumi.mission.mission')"
      :eyebrow-value="t('home.lumi.mission.eyebrow_value')"
      :value="t('home.lumi.mission.value')"
    />
```

- [ ] **Step 6: 驗證 dev server 正常 + 三語切換**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW | grep -c "讓全天下沒有學不會"
curl -s http://localhost:3000/zh-CN | grep -c "让全天下没有学不会"
curl -s http://localhost:3000/en | grep -c "No senior left behind"
kill %1 2>/dev/null
```

預期每個都 ≥ 1。

- [ ] **Step 7: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add i18n/locales/ app/components/home/MissionBar.vue app/pages/index.vue
git commit -m "feat(home): add MissionBar with company mission and core value

讓全天下沒有學不會 AI 的銀髮族 / 長者為重 — 在 Hero 下方薄條露出。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 4: 加 Backers i18n + 建 CapitalBackers 元件 + 接首頁

**Files:**
- Modify: `i18n/locales/{zh-TW,zh-CN,en}.json` (新增 `home.lumi.backers`)
- Create: `app/components/home/CapitalBackers.vue`
- Modify: `app/pages/index.vue`

- [ ] **Step 1: i18n keys（zh-TW）**

`i18n/locales/zh-TW.json` 中 `home.lumi.mission` 之後新增：

```json
"backers": {
  "eyebrow": "關鍵合夥人 · STRATEGIC BACKERS",
  "b1_role": "Capital · 種子輪領投",
  "b2_role": "Capital · 種子輪共投",
  "b3_role": "Holdings · 種子輪共投",
  "headline": "亞太區三家資深金融機構 · 已承諾 Infinity Agentic 種子輪"
},
```

- [ ] **Step 2: i18n keys（zh-CN）**

```json
"backers": {
  "eyebrow": "关键合伙人 · STRATEGIC BACKERS",
  "b1_role": "Capital · 种子轮领投",
  "b2_role": "Capital · 种子轮共投",
  "b3_role": "Holdings · 种子轮共投",
  "headline": "亚太区三家资深金融机构 · 已承诺 Infinity Agentic 种子轮"
},
```

- [ ] **Step 3: i18n keys（en）**

```json
"backers": {
  "eyebrow": "STRATEGIC BACKERS",
  "b1_role": "Capital · Lead Seed Investor",
  "b2_role": "Capital · Co-investor",
  "b3_role": "Holdings · Co-investor",
  "headline": "Three senior financial institutions across APAC have committed to Infinity Agentic's seed round."
},
```

- [ ] **Step 4: 建立 `app/components/home/CapitalBackers.vue`**

```vue
<script setup lang="ts">
defineProps<{
  eyebrow: string
  b1Role: string
  b2Role: string
  b3Role: string
  headline: string
}>()

const backers = [
  { name: 'Blackwell Global', logo: '/img/backers/blackwell.jpeg', dark: false, role: 'b1Role' as const },
  { name: 'Eongen', logo: '/img/backers/eongen.png', dark: false, role: 'b2Role' as const },
  { name: 'Marvel Capital 万丰资本', logo: '/img/backers/marvel.png', dark: true, role: 'b3Role' as const },
]
</script>

<template>
  <section class="py-12 lg:py-16">
    <div class="container-tight">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink text-center mb-8">
        {{ eyebrow }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
        <FadeInUp v-for="(b, i) in backers" :key="b.name" :delay="i * 100">
          <div
            class="rounded-2xl p-6 lg:p-7 min-h-[180px] flex flex-col items-center justify-center gap-3 shadow-lg"
            :class="b.dark ? 'bg-[#0A1428]' : 'bg-white'"
          >
            <img
              :src="b.logo"
              :alt="b.name"
              class="max-w-[88%] max-h-[110px] object-contain"
              loading="lazy"
            />
            <div
              class="font-mono text-[10px] tracking-[0.18em] uppercase font-semibold text-center"
              :class="b.dark ? 'text-slate-400' : 'text-slate-500'"
            >
              {{ b.role === 'b1Role' ? b1Role : b.role === 'b2Role' ? b2Role : b3Role }}
            </div>
          </div>
        </FadeInUp>
      </div>
      <p class="text-center text-fg-secondary text-sm md:text-base mt-8 max-w-3xl mx-auto leading-relaxed">
        {{ headline }}
      </p>
    </div>
  </section>
</template>
```

- [ ] **Step 5: 在 `app/pages/index.vue` 引入 — 在 MissionBar 之後、StuckPersonSection 之前**

```vue
    <!-- 1.7. Capital backers trust bar -->
    <CapitalBackers
      :eyebrow="t('home.lumi.backers.eyebrow')"
      :b1-role="t('home.lumi.backers.b1_role')"
      :b2-role="t('home.lumi.backers.b2_role')"
      :b3-role="t('home.lumi.backers.b3_role')"
      :headline="t('home.lumi.backers.headline')"
    />
```

- [ ] **Step 6: 驗證**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW | grep -c "Blackwell Global"
curl -s http://localhost:3000/en | grep -c "STRATEGIC BACKERS"
kill %1 2>/dev/null
```

預期 ≥ 1。

- [ ] **Step 7: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add i18n/locales/ app/components/home/CapitalBackers.vue app/pages/index.vue
git commit -m "feat(home): add CapitalBackers trust bar with Blackwell/Eongen/Marvel logos

亞太三家資本後盾 trust bar，置於 Hero 與 Stuck person 之間。

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 5: 改寫 PainPointStats → MarketOpportunity（含 APAC 國家表）

**Files:**
- Delete: `app/components/home/PainPointStats.vue`
- Create: `app/components/home/MarketOpportunity.vue`
- Modify: `i18n/locales/{zh-TW,zh-CN,en}.json` — 新增 `home.lumi.market`，移除 `home.lumi.pain.{i1,i2,i3,i4}_*` 但**保留** `home.lumi.pain.{title, subtitle, scenarios, closing}`
- Modify: `app/pages/index.vue`

- [ ] **Step 1: i18n keys（zh-TW）— 新增 `home.lumi.market`**

`i18n/locales/zh-TW.json` 中 `home.lumi.pain` 之前新增：

```json
"market": {
  "eyebrow_macro": "MARKET · 市場規模",
  "title": "老齡化是 21 世紀最大的不可逆趨勢",
  "subtitle": "亞太是震央 — 你的爸媽也是其中之一。",
  "kpi": {
    "i1": { "stat": "3-5 個", "label": "每位銀髮族每天", "desc": "遇到的科技操作問題。", "icon": "message-circle-question" },
    "i2": { "stat": "14 億", "label": "2030 全球 60+ 銀髮族", "desc": "高齡化是不可逆的長期趨勢。", "icon": "globe" },
    "i3": { "stat": "5.7 億", "label": "2030 亞太 60+ 銀髮族", "desc": "佔全球 60+ 的 40%。", "icon": "compass" },
    "i4": { "stat": "+25 萬", "label": "每天新增銀髮族", "desc": "市場每天都在成長。", "icon": "trending-up" }
  },
  "apac": {
    "title": "東亞 + 東南亞 — 爆發點國家",
    "header_country": "國家 / 地區",
    "header_2020": "2020 60+ 人口",
    "header_2030": "2030 預估",
    "header_2050_share": "2050 60+ 佔比",
    "source_note": "資料來源：UN World Population Prospects",
    "countries": [
      { "name": "中國", "c2020": "2.6 億", "c2030": "4 億", "c2050": "34%" },
      { "name": "日本", "c2020": "4,200 萬", "c2030": "4,500 萬", "c2050": "42%（世界最高）" },
      { "name": "韓國", "c2020": "1,300 萬", "c2030": "1,800 萬", "c2050": "40%" },
      { "name": "台灣", "c2020": "460 萬", "c2030": "650 萬", "c2050": "40%" },
      { "name": "泰國", "c2020": "1,300 萬（18%）", "c2030": "1,700 萬（24%）", "c2050": "33%" },
      { "name": "越南", "c2020": "1,100 萬", "c2030": "1,800 萬", "c2050": "26%" },
      { "name": "新加坡", "c2020": "90 萬（16%）", "c2030": "130 萬（24%）", "c2050": "33%" },
      { "name": "東南亞合計", "c2020": "6,500 萬（9.8%）", "c2030": "1 億（14%）", "c2050": "1.6 億（22%）" }
    ]
  }
},
```

- [ ] **Step 2: i18n keys（zh-CN）— 簡體鏡像**

```json
"market": {
  "eyebrow_macro": "MARKET · 市场规模",
  "title": "老龄化是 21 世纪最大的不可逆趋势",
  "subtitle": "亚太是震央 — 你的爸妈也是其中之一。",
  "kpi": {
    "i1": { "stat": "3-5 个", "label": "每位银发族每天", "desc": "遇到的科技操作问题。", "icon": "message-circle-question" },
    "i2": { "stat": "14 亿", "label": "2030 全球 60+ 银发族", "desc": "高龄化是不可逆的长期趋势。", "icon": "globe" },
    "i3": { "stat": "5.7 亿", "label": "2030 亚太 60+ 银发族", "desc": "占全球 60+ 的 40%。", "icon": "compass" },
    "i4": { "stat": "+25 万", "label": "每天新增银发族", "desc": "市场每天都在成长。", "icon": "trending-up" }
  },
  "apac": {
    "title": "东亚 + 东南亚 — 爆发点国家",
    "header_country": "国家 / 地区",
    "header_2020": "2020 60+ 人口",
    "header_2030": "2030 预估",
    "header_2050_share": "2050 60+ 占比",
    "source_note": "资料来源：UN World Population Prospects",
    "countries": [
      { "name": "中国", "c2020": "2.6 亿", "c2030": "4 亿", "c2050": "34%" },
      { "name": "日本", "c2020": "4,200 万", "c2030": "4,500 万", "c2050": "42%（世界最高）" },
      { "name": "韩国", "c2020": "1,300 万", "c2030": "1,800 万", "c2050": "40%" },
      { "name": "台湾", "c2020": "460 万", "c2030": "650 万", "c2050": "40%" },
      { "name": "泰国", "c2020": "1,300 万（18%）", "c2030": "1,700 万（24%）", "c2050": "33%" },
      { "name": "越南", "c2020": "1,100 万", "c2030": "1,800 万", "c2050": "26%" },
      { "name": "新加坡", "c2020": "90 万（16%）", "c2030": "130 万（24%）", "c2050": "33%" },
      { "name": "东南亚合计", "c2020": "6,500 万（9.8%）", "c2030": "1 亿（14%）", "c2050": "1.6 亿（22%）" }
    ]
  }
},
```

- [ ] **Step 3: i18n keys（en）— 英譯**

```json
"market": {
  "eyebrow_macro": "MARKET · OPPORTUNITY",
  "title": "Aging is the largest irreversible trend of the 21st century",
  "subtitle": "APAC is the epicenter — your parents are part of it.",
  "kpi": {
    "i1": { "stat": "3–5", "label": "Tech problems per day", "desc": "Each senior runs into 3–5 daily tech-operation issues.", "icon": "message-circle-question" },
    "i2": { "stat": "1.4B", "label": "Global 60+ by 2030", "desc": "Aging is an irreversible long-term trend.", "icon": "globe" },
    "i3": { "stat": "570M", "label": "APAC 60+ by 2030", "desc": "40% of the world's 60+ population.", "icon": "compass" },
    "i4": { "stat": "+250K", "label": "New seniors daily", "desc": "The market grows every single day.", "icon": "trending-up" }
  },
  "apac": {
    "title": "East Asia + Southeast Asia — Inflection-point countries",
    "header_country": "Country / Region",
    "header_2020": "60+ in 2020",
    "header_2030": "60+ in 2030 (est.)",
    "header_2050_share": "60+ share in 2050",
    "source_note": "Source: UN World Population Prospects",
    "countries": [
      { "name": "China", "c2020": "260M", "c2030": "400M", "c2050": "34%" },
      { "name": "Japan", "c2020": "42M", "c2030": "45M", "c2050": "42% (world top)" },
      { "name": "Korea", "c2020": "13M", "c2030": "18M", "c2050": "40%" },
      { "name": "Taiwan", "c2020": "4.6M", "c2030": "6.5M", "c2050": "40%" },
      { "name": "Thailand", "c2020": "13M (18%)", "c2030": "17M (24%)", "c2050": "33%" },
      { "name": "Vietnam", "c2020": "11M", "c2030": "18M", "c2050": "26%" },
      { "name": "Singapore", "c2020": "0.9M (16%)", "c2030": "1.3M (24%)", "c2050": "33%" },
      { "name": "SEA total", "c2020": "65M (9.8%)", "c2030": "100M (14%)", "c2050": "160M (22%)" }
    ]
  }
},
```

- [ ] **Step 4: 移除舊 keys — `home.lumi.pain.{i1,i2,i3,i4}_*`（三檔皆刪）**

刪除每個 locale 的 `home.lumi.pain` 物件下的 `i1_stat / i1_label / i1_desc / i2_stat / i2_label / i2_desc / i3_stat / i3_label / i3_desc / i4_stat / i4_label / i4_desc`（共 12 條）。**保留** `title / subtitle / scenarios / closing`。

- [ ] **Step 5: 建立 `app/components/home/MarketOpportunity.vue`**

```vue
<script setup lang="ts">
type KPI = { stat: string; label: string; desc: string; icon: string }
type Country = { name: string; c2020: string; c2030: string; c2050: string }

defineProps<{
  eyebrowMacro: string
  title: string
  subtitle: string
  kpis: KPI[]
  apacTitle: string
  apacSourceNote: string
  headerCountry: string
  header2020: string
  header2030: string
  header2050Share: string
  countries: Country[]
}>()
</script>

<template>
  <section class="py-20 lg:py-28 grid-tech">
    <div class="container-tight">
      <div class="text-center mb-12 lg:mb-16 space-y-4">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink">
          {{ eyebrowMacro }}
        </p>
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>
      </div>

      <!-- 4 KPIs -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6 mb-16 lg:mb-20">
        <FadeInUp v-for="(item, i) in kpis" :key="item.label" :delay="i * 100">
          <div class="glass-card p-6 lg:p-7 h-full space-y-4 group hover:border-lumi-purple/50 transition-colors">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-bg-elevated flex items-center justify-center border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow">
                <Icon :name="`lucide:${item.icon}`" class="w-5 h-5 text-lumi-pink" />
              </div>
            </div>
            <div class="text-4xl lg:text-5xl font-display font-bold text-lumi-gradient">
              {{ item.stat }}
            </div>
            <div class="text-sm uppercase tracking-wider text-fg-primary">{{ item.label }}</div>
            <p class="text-fg-secondary text-sm leading-relaxed">{{ item.desc }}</p>
          </div>
        </FadeInUp>
      </div>

      <!-- APAC country table -->
      <FadeInUp :delay="0">
        <div class="rounded-2xl border border-lumi-purple/30 bg-bg-glass backdrop-blur-glass p-6 lg:p-10">
          <h3 class="text-xl md:text-2xl font-display font-bold text-fg-primary text-center mb-6">
            {{ apacTitle }}
          </h3>

          <!-- Desktop: full table -->
          <div class="hidden md:block overflow-x-auto">
            <table class="w-full text-sm lg:text-base">
              <thead>
                <tr class="border-b border-lumi-purple/30 text-fg-muted font-mono uppercase tracking-wider text-xs">
                  <th class="text-left py-3 px-3">{{ headerCountry }}</th>
                  <th class="text-right py-3 px-3">{{ header2020 }}</th>
                  <th class="text-right py-3 px-3">{{ header2030 }}</th>
                  <th class="text-right py-3 px-3">{{ header2050Share }}</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="c in countries"
                  :key="c.name"
                  class="border-b border-lumi-purple/10 hover:bg-lumi-purple/5 transition-colors"
                  :class="c.name.includes('合計') || c.name.includes('合计') || c.name === 'SEA total' ? 'font-bold text-lumi-pink' : 'text-fg-secondary'"
                >
                  <td class="py-3 px-3">{{ c.name }}</td>
                  <td class="py-3 px-3 text-right">{{ c.c2020 }}</td>
                  <td class="py-3 px-3 text-right">{{ c.c2030 }}</td>
                  <td class="py-3 px-3 text-right">{{ c.c2050 }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Mobile: stacked cards -->
          <div class="md:hidden space-y-3">
            <div
              v-for="c in countries"
              :key="c.name"
              class="rounded-xl border border-lumi-purple/20 p-4 bg-bg-elevated/30"
              :class="c.name.includes('合計') || c.name.includes('合计') || c.name === 'SEA total' ? 'border-lumi-pink/40' : ''"
            >
              <div class="font-display font-bold text-fg-primary mb-2">{{ c.name }}</div>
              <div class="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p class="text-fg-muted uppercase tracking-wider mb-1">{{ header2020 }}</p>
                  <p class="text-fg-secondary">{{ c.c2020 }}</p>
                </div>
                <div>
                  <p class="text-fg-muted uppercase tracking-wider mb-1">{{ header2030 }}</p>
                  <p class="text-fg-secondary">{{ c.c2030 }}</p>
                </div>
                <div>
                  <p class="text-fg-muted uppercase tracking-wider mb-1">{{ header2050Share }}</p>
                  <p class="text-lumi-pink">{{ c.c2050 }}</p>
                </div>
              </div>
            </div>
          </div>

          <p class="text-xs text-fg-muted italic text-center mt-6">
            {{ apacSourceNote }}
          </p>
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
```

- [ ] **Step 6: 修改 `app/pages/index.vue` — 拿掉 PainPointStats，引入 MarketOpportunity**

替換現有 `<PainPointStats ... />` 區塊（包含 `painPoints` computed）為：

ts 區（將 `painPoints` 替換為 `marketKpis`）：

```ts
const marketKpis = computed(() => [
  { stat: t('home.lumi.market.kpi.i1.stat'), label: t('home.lumi.market.kpi.i1.label'), desc: t('home.lumi.market.kpi.i1.desc'), icon: t('home.lumi.market.kpi.i1.icon') },
  { stat: t('home.lumi.market.kpi.i2.stat'), label: t('home.lumi.market.kpi.i2.label'), desc: t('home.lumi.market.kpi.i2.desc'), icon: t('home.lumi.market.kpi.i2.icon') },
  { stat: t('home.lumi.market.kpi.i3.stat'), label: t('home.lumi.market.kpi.i3.label'), desc: t('home.lumi.market.kpi.i3.desc'), icon: t('home.lumi.market.kpi.i3.icon') },
  { stat: t('home.lumi.market.kpi.i4.stat'), label: t('home.lumi.market.kpi.i4.label'), desc: t('home.lumi.market.kpi.i4.desc'), icon: t('home.lumi.market.kpi.i4.icon') },
])

const apacCountries = computed(() => {
  const list = tm('home.lumi.market.apac.countries') as Array<{ name: string; c2020: string; c2030: string; c2050: string }>
  return list ?? []
})
```

注意：`tm` 是 `useI18n()` 提供的取出 message-as-array 的方法，需於 useI18n() 解構出來：`const { t, tm, locale } = useI18n()`。

template 區替換：

```vue
    <!-- 3. Market opportunity (replaces PainPointStats) -->
    <MarketOpportunity
      :eyebrow-macro="t('home.lumi.market.eyebrow_macro')"
      :title="t('home.lumi.market.title')"
      :subtitle="t('home.lumi.market.subtitle')"
      :kpis="marketKpis"
      :apac-title="t('home.lumi.market.apac.title')"
      :apac-source-note="t('home.lumi.market.apac.source_note')"
      :header-country="t('home.lumi.market.apac.header_country')"
      :header-2020="t('home.lumi.market.apac.header_2020')"
      :header-2030="t('home.lumi.market.apac.header_2030')"
      :header-2050-share="t('home.lumi.market.apac.header_2050_share')"
      :countries="apacCountries"
    />
```

- [ ] **Step 7: 刪除 `app/components/home/PainPointStats.vue`**

```bash
cd /home/sss2500/codejobs/infiag.com
rm app/components/home/PainPointStats.vue
```

- [ ] **Step 8: 確認沒有殘留引用**

```bash
cd /home/sss2500/codejobs/infiag.com
grep -rn "PainPointStats" app/ 2>/dev/null
grep -rn "home.lumi.pain.i" app/ 2>/dev/null
```

預期皆無輸出。

- [ ] **Step 9: 驗證**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW | grep -c "5.7 億"
curl -s http://localhost:3000/zh-CN | grep -c "5.7 亿"
curl -s http://localhost:3000/en | grep -c "570M"
kill %1 2>/dev/null
```

預期皆 ≥ 1。

- [ ] **Step 10: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add i18n/locales/ app/components/home/ app/pages/index.vue
git commit -m "refactor(home): replace PainPointStats with MarketOpportunity (4 KPI + APAC table)

- 加入 5.7 億 APAC 60+ KPI（取代原 \$240 子女付費意願 — 移到 RevenueFlywheel）
- 加入 7 國 + 東南亞合計國家明細表（桌機表格、手機卡片）
- 移除 home.lumi.pain.{i1~i4}_* keys，新增 home.lumi.market.* 結構
- pain.scenarios / pain.closing 保留供 PainPointScenarios

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 6: 改寫 BusinessFlywheel 為 RevenueFlywheel（三條收益 × 三段飛輪）

**Files:**
- Modify: `app/components/home/BusinessFlywheel.vue`（內容改寫，檔名保留）
- Modify: `i18n/locales/{zh-TW,zh-CN,en}.json`
- Modify: `app/pages/index.vue`

- [ ] **Step 1: i18n 重寫（zh-TW）— 整個 `home.lumi.flywheel` 物件替換**

```json
"flywheel": {
  "title": "為什麼這是會複利的生意",
  "subtitle": "三條收益、三段飛輪 — 每一輪都讓下一輪更快。",
  "i1": {
    "share": "55%",
    "title": "訂閱黏性",
    "desc": "子女付費 × 父母使用 — 年流失 < 8%，遠高於工具型 AI 的家庭黏性。",
    "detail": "USD $9.99/月 個人方案 · USD $19.99/月 家庭方案（可加 4 位長輩）",
    "icon": "users"
  },
  "i2": {
    "share": "25%",
    "title": "行為大模型",
    "desc": "每一次「陪做完」都在累積全球第一個 60+ 銀髮族操作行為資料庫。",
    "detail": "授權給 AI 公司 / 保險 / 長照 / 政府",
    "icon": "database"
  },
  "i3": {
    "share": "20%",
    "title": "IP 衍生",
    "desc": "Lumi 公仔、聯名、表情包、AR 濾鏡 — 從工具走向品牌，毛利 90%+。",
    "detail": "Hello Kitty 模式：品牌授權 + 周邊商品",
    "icon": "sparkles"
  },
  "arr_label": "2027 ARR · 年度經常收入",
  "arr_value": "USD $20M",
  "gross_margin_label": "毛利率",
  "gross_margin_value": "87%",
  "closing_note": "三條收入彼此獨立又互相加成"
},
```

- [ ] **Step 2: i18n 重寫（zh-CN）**

```json
"flywheel": {
  "title": "为什么这是会复利的生意",
  "subtitle": "三条收益、三段飞轮 — 每一轮都让下一轮更快。",
  "i1": {
    "share": "55%",
    "title": "订阅黏性",
    "desc": "子女付费 × 父母使用 — 年流失 < 8%，远高于工具型 AI 的家庭黏性。",
    "detail": "USD $9.99/月 个人方案 · USD $19.99/月 家庭方案（可加 4 位长辈）",
    "icon": "users"
  },
  "i2": {
    "share": "25%",
    "title": "行为大模型",
    "desc": "每一次「陪做完」都在累积全球第一个 60+ 银发族操作行为数据库。",
    "detail": "授权给 AI 公司 / 保险 / 长照 / 政府",
    "icon": "database"
  },
  "i3": {
    "share": "20%",
    "title": "IP 衍生",
    "desc": "Lumi 公仔、联名、表情包、AR 滤镜 — 从工具走向品牌，毛利 90%+。",
    "detail": "Hello Kitty 模式：品牌授权 + 周边商品",
    "icon": "sparkles"
  },
  "arr_label": "2027 ARR · 年度经常收入",
  "arr_value": "USD $20M",
  "gross_margin_label": "毛利率",
  "gross_margin_value": "87%",
  "closing_note": "三条收入彼此独立又互相加成"
},
```

- [ ] **Step 3: i18n 重寫（en）**

```json
"flywheel": {
  "title": "Why this business compounds",
  "subtitle": "Three revenue streams, three flywheels — each accelerates the next.",
  "i1": {
    "share": "55%",
    "title": "Subscription stickiness",
    "desc": "Children pay × parents use — annual churn under 8%, far above tool-AI family retention.",
    "detail": "USD $9.99/mo individual · USD $19.99/mo family (up to 4 elders)",
    "icon": "users"
  },
  "i2": {
    "share": "25%",
    "title": "Behavior data engine",
    "desc": "Every walk-through builds the world's first 60+ senior behavior dataset.",
    "detail": "Licensed to AI companies, insurers, eldercare, governments",
    "icon": "database"
  },
  "i3": {
    "share": "20%",
    "title": "IP & merchandise",
    "desc": "Lumi figurines, collabs, stickers, AR filters — from tool to brand, 90%+ margin.",
    "detail": "Hello-Kitty playbook: brand licensing + merchandise",
    "icon": "sparkles"
  },
  "arr_label": "2027 ARR · Annual recurring revenue",
  "arr_value": "USD $20M",
  "gross_margin_label": "Gross margin",
  "gross_margin_value": "87%",
  "closing_note": "Three streams that compound independently and reinforce each other."
},
```

- [ ] **Step 4: 改寫 `app/components/home/BusinessFlywheel.vue`**

```vue
<script setup lang="ts">
type Stream = {
  share: string
  title: string
  desc: string
  detail: string
  icon: string
}

defineProps<{
  title: string
  subtitle: string
  streams: Stream[]
  arrLabel: string
  arrValue: string
  grossMarginLabel: string
  grossMarginValue: string
  closingNote: string
}>()
</script>

<template>
  <section class="py-20 lg:py-28 grid-tech">
    <div class="container-tight">
      <div class="text-center mb-12 lg:mb-16 space-y-4">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
        <FadeInUp v-for="(s, i) in streams" :key="s.title" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full flex flex-col gap-4 group hover:border-lumi-purple/40 transition-colors">
            <div class="flex items-baseline justify-between">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow"
                style="background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.18), hsl(var(--lumi-pink) / 0.18));"
              >
                <Icon :name="`lucide:${s.icon}`" class="w-6 h-6 text-lumi-pink" />
              </div>
              <div class="text-4xl lg:text-5xl font-display font-bold text-lumi-gradient">{{ s.share }}</div>
            </div>
            <h3 class="text-xl font-display font-bold text-fg-primary">{{ s.title }}</h3>
            <p class="text-fg-secondary leading-relaxed">{{ s.desc }}</p>
            <p class="text-xs font-mono text-fg-muted leading-relaxed pt-2 border-t border-lumi-purple/15 mt-auto">
              {{ s.detail }}
            </p>
          </div>
        </FadeInUp>
      </div>

      <FadeInUp :delay="100">
        <div class="rounded-2xl border border-lumi-pink/40 bg-bg-glass backdrop-blur-glass p-8 lg:p-10 text-center max-w-3xl mx-auto">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted mb-3">
            {{ arrLabel }}
          </p>
          <div class="flex items-baseline justify-center gap-6 lg:gap-10 flex-wrap">
            <div class="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-lumi-gradient">
              {{ arrValue }}
            </div>
            <div class="font-mono text-sm uppercase tracking-wider text-fg-muted">·</div>
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">{{ grossMarginLabel }}</p>
              <p class="text-3xl md:text-4xl font-display font-bold text-lumi-pink">{{ grossMarginValue }}</p>
            </div>
          </div>
          <p class="text-fg-secondary text-sm mt-4 italic">{{ closingNote }}</p>
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
```

- [ ] **Step 5: 修改 `app/pages/index.vue` — 替換 flywheel 用法**

替換現有 `flywheel` computed：

```ts
const revenueStreams = computed(() => [
  { share: t('home.lumi.flywheel.i1.share'), title: t('home.lumi.flywheel.i1.title'), desc: t('home.lumi.flywheel.i1.desc'), detail: t('home.lumi.flywheel.i1.detail'), icon: t('home.lumi.flywheel.i1.icon') },
  { share: t('home.lumi.flywheel.i2.share'), title: t('home.lumi.flywheel.i2.title'), desc: t('home.lumi.flywheel.i2.desc'), detail: t('home.lumi.flywheel.i2.detail'), icon: t('home.lumi.flywheel.i2.icon') },
  { share: t('home.lumi.flywheel.i3.share'), title: t('home.lumi.flywheel.i3.title'), desc: t('home.lumi.flywheel.i3.desc'), detail: t('home.lumi.flywheel.i3.detail'), icon: t('home.lumi.flywheel.i3.icon') },
])
```

template 區替換現有 `<BusinessFlywheel ... />`：

```vue
    <!-- 6. Revenue flywheel: 3 streams × 3 flywheels -->
    <BusinessFlywheel
      :title="t('home.lumi.flywheel.title')"
      :subtitle="t('home.lumi.flywheel.subtitle')"
      :streams="revenueStreams"
      :arr-label="t('home.lumi.flywheel.arr_label')"
      :arr-value="t('home.lumi.flywheel.arr_value')"
      :gross-margin-label="t('home.lumi.flywheel.gross_margin_label')"
      :gross-margin-value="t('home.lumi.flywheel.gross_margin_value')"
      :closing-note="t('home.lumi.flywheel.closing_note')"
    />
```

- [ ] **Step 6: 驗證**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW | grep -c 'USD \$20M'
curl -s http://localhost:3000/zh-TW | grep -c "訂閱黏性"
curl -s http://localhost:3000/en | grep -c "Subscription stickiness"
kill %1 2>/dev/null
```

預期皆 ≥ 1。

- [ ] **Step 7: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add i18n/locales/ app/components/home/BusinessFlywheel.vue app/pages/index.vue
git commit -m "refactor(home): rebuild BusinessFlywheel as RevenueFlywheel (3 streams × 3 flywheels)

- 三條收益（55% 訂閱 / 25% 數據 / 20% IP）合併三段飛輪敘事
- 拿掉舊「健康守護延伸」（與 v3 Roadmap 重複）
- 新增 \$20M ARR · 87% 毛利大字收尾
- i18n flywheel.* 全段重寫

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 7: 加 Advisor i18n + 建 AdvisorCard 元件（compact 變體）+ 接首頁

**Files:**
- Modify: `i18n/locales/{zh-TW,zh-CN,en}.json`
- Create: `public/img/advisors/.gitkeep`（佔位目錄）
- Create: `app/components/home/AdvisorCard.vue`
- Modify: `app/pages/index.vue`

- [ ] **Step 1: i18n keys（zh-TW）— `home.lumi.advisor`**

```json
"advisor": {
  "eyebrow": "商業模式顧問",
  "name": "林偉賢 老師",
  "title": "實踐家董事長 · 全球商業模式設計權威",
  "role_extended": "全球華人商業模式設計第一人，三十餘年企業育成、商業模式創新、財富自由領導力課程經驗。BSE 全球商業模式設計學院創辦人，協助無數華人企業家完成商業模式重構。",
  "headline": "真情推薦",
  "quotes": [
    "嚕米嚕米，按一下就通，手機電腦它都聽得懂。",
    "我要推薦無限智能的嚕米嚕米服務 — 讓全天下沒有不會用 AI 的銀髮族。",
    "長者優先的價值觀，正是我最想分享的路。"
  ],
  "expand_label": "展開完整推薦詞",
  "video_label": "真情推薦 Video",
  "full_speech": "嚕米嚕米，按一下就通，\n手機電腦它都聽得懂。\n字太小、畫面亂，點來點去頭發懵，\nLINE 不會傳，相片也常常存不成。\n\n以前總要打電話，問兒子問到他很忙，\n現在不一樣，嚕米就在你手上。\n不用等週末，不用看時間，\n它不嫌你慢，只怕你不按。\n\n嚕米嚕米，慢慢說它都會懂，\n視訊不會開，密碼忘了也不慌。\n瀏覽器跳廣告，不用自己心驚慌，\n一句幫幫我，問題就有方向。\n\n我要推薦無限智能的嚕米嚕米服務，\n讓全天下沒有不會用 AI 的銀髮族。\n長者優先的價值觀，正是我最想分享的路，\n也是我向各位傑出企業家推薦無限智能的原因。\n\n滑手機卡卡的，電腦不會開，\n別不好意思，叫嚕米就好啦。\n它不趕時間，也不嫌你問太多，\n像個老朋友，陪你一步一步做。\n\n嚕米嚕米，按一下就通，\n嚕米嚕米，隨時都在你手中。\n兒子啊，有嚕米以後，\n真的不用再麻煩你啦。"
},
```

- [ ] **Step 2: i18n keys（zh-CN）— 簡體**

```json
"advisor": {
  "eyebrow": "商业模式顾问",
  "name": "林伟贤 老师",
  "title": "实践家董事长 · 全球商业模式设计权威",
  "role_extended": "全球华人商业模式设计第一人，三十余年企业育成、商业模式创新、财富自由领导力课程经验。BSE 全球商业模式设计学院创办人，协助无数华人企业家完成商业模式重构。",
  "headline": "真情推荐",
  "quotes": [
    "噜米噜米，按一下就通，手机电脑它都听得懂。",
    "我要推荐无限智能的噜米噜米服务 — 让全天下没有不会用 AI 的银发族。",
    "长者优先的价值观，正是我最想分享的路。"
  ],
  "expand_label": "展开完整推荐词",
  "video_label": "真情推荐 Video",
  "full_speech": "噜米噜米，按一下就通，\n手机电脑它都听得懂。\n字太小、画面乱，点来点去头发懵，\nLINE 不会传，相片也常常存不成。\n\n以前总要打电话，问儿子问到他很忙，\n现在不一样，噜米就在你手上。\n不用等周末，不用看时间，\n它不嫌你慢，只怕你不按。\n\n噜米噜米，慢慢说它都会懂，\n视讯不会开，密码忘了也不慌。\n浏览器跳广告，不用自己心惊慌，\n一句帮帮我，问题就有方向。\n\n我要推荐无限智能的噜米噜米服务，\n让全天下没有不会用 AI 的银发族。\n长者优先的价值观，正是我最想分享的路，\n也是我向各位杰出企业家推荐无限智能的原因。\n\n滑手机卡卡的，电脑不会开，\n别不好意思，叫噜米就好啦。\n它不赶时间，也不嫌你问太多，\n像个老朋友，陪你一步一步做。\n\n噜米噜米，按一下就通，\n噜米噜米，随时都在你手中。\n儿子啊，有噜米以后，\n真的不用再麻烦你啦。"
},
```

- [ ] **Step 3: i18n keys（en）— 英譯**

英譯保留中文原意但採韻文 / 自然散文（推薦詞韻味重，全韻不易，採韻散結合）：

```json
"advisor": {
  "eyebrow": "Business Model Advisor",
  "name": "Mr. Lin Wei-Hsien",
  "title": "Chairman of Doers · Global Authority on Business Model Design",
  "role_extended": "The leading authority on Chinese-language business model design, with three decades of experience in enterprise incubation, business model innovation, and wealth-freedom leadership programs. Founder of BSE Global Business Model Design Academy.",
  "headline": "Heartfelt Recommendation",
  "quotes": [
    "LUMI, LUMI — one tap and it just works. Phones, computers, it understands them all.",
    "I recommend Infinity Agentic's LUMI service — so no senior is left behind in the AI era.",
    "Putting elders first is the path I most want to share."
  ],
  "expand_label": "Read full recommendation",
  "video_label": "Recommendation Video",
  "full_speech": "LUMI, LUMI — one tap and it just works,\nphones and computers, it understands them all.\nText too tiny, screens too cluttered, taps that lose their way,\nLINE messages won't send, photos won't save.\n\nIt used to take a phone call — bothering my busy son.\nNow it's different. LUMI is right in your hand.\nNo need to wait for the weekend, no need to watch the clock.\nIt doesn't mind if you're slow — only if you don't try.\n\nLUMI, LUMI — speak slowly, it still understands.\nCan't open a video call? Forgot the password? No panic.\nBrowser pop-ups won't startle you.\nJust say \"help me,\" and the answer is on its way.\n\nI recommend Infinity Agentic's LUMI service,\nso no senior is left behind in the AI era.\nPutting elders first — that's the path I most want to share,\nand the reason I recommend Infinity Agentic to every distinguished entrepreneur here.\n\nWhen the phone won't scroll, when the computer won't start,\ndon't be shy — just call LUMI.\nIt won't rush you, won't mind your many questions,\nlike an old friend who walks you through, step by step.\n\nLUMI, LUMI — one tap and it just works.\nLUMI, LUMI — always there in your hand.\nMy dear son, with LUMI now,\nyou really don't have to bother again."
},
```

- [ ] **Step 4: 建立 advisor 圖片佔位目錄**

```bash
cd /home/sss2500/codejobs/infiag.com
mkdir -p public/img/advisors
touch public/img/advisors/.gitkeep
```

- [ ] **Step 5: 建立 `app/components/home/AdvisorCard.vue`**

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const props = defineProps<{
  variant?: 'compact' | 'full'
  eyebrow: string
  name: string
  title: string
  roleExtended?: string
  headline: string
  quotes: string[]
  expandLabel: string
  videoLabel: string
  fullSpeech: string
  videoHref: string
  photoSrc?: string
}>()

const open = ref(false)
const isFull = props.variant === 'full'
</script>

<template>
  <section class="py-12 lg:py-16">
    <div class="container-tight max-w-5xl">
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink text-center mb-6">
        — {{ eyebrow }} —
      </p>

      <FadeInUp :delay="0">
        <div class="glass-card p-6 lg:p-10 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 lg:gap-10 items-start">
          <!-- Photo slot -->
          <div class="mx-auto md:mx-0">
            <div
              class="w-32 h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-2xl overflow-hidden border-2 border-lumi-purple/40 shadow-lumi-glow flex items-center justify-center"
              :style="!photoSrc ? 'background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.45), hsl(var(--lumi-pink) / 0.45));' : ''"
            >
              <img v-if="photoSrc" :src="photoSrc" :alt="name" class="w-full h-full object-cover" />
              <span v-else class="text-5xl lg:text-6xl font-display font-bold text-white">林</span>
            </div>
          </div>

          <!-- Content -->
          <div class="space-y-4">
            <div>
              <h3 class="text-2xl lg:text-3xl font-display font-bold text-fg-primary mb-1">
                {{ name }} <span class="text-lumi-gradient">{{ headline }}</span>
              </h3>
              <p class="text-fg-secondary text-sm md:text-base">{{ title }}</p>
              <p v-if="isFull && roleExtended" class="text-fg-secondary text-sm leading-relaxed mt-3">{{ roleExtended }}</p>
            </div>

            <!-- Compact: 3 quotes + expand button -->
            <template v-if="!isFull">
              <ul class="space-y-2 border-l-2 border-lumi-pink/40 pl-4">
                <li v-for="q in quotes" :key="q" class="text-fg-primary italic text-base leading-relaxed">
                  「{{ q }}」
                </li>
              </ul>

              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <Dialog v-model:open="open">
                  <DialogTrigger as-child>
                    <button class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full border border-lumi-purple/50 text-lumi-pink hover:bg-lumi-purple/10 transition-colors text-sm font-medium">
                      {{ expandLabel }}
                      <Icon name="lucide:book-open" class="w-4 h-4" />
                    </button>
                  </DialogTrigger>
                  <DialogContent class="max-w-2xl max-h-[85vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle class="text-xl font-display">
                        {{ name }} · {{ headline }}
                      </DialogTitle>
                    </DialogHeader>
                    <div class="prose prose-invert max-w-none whitespace-pre-line text-fg-primary leading-relaxed pt-2">
                      {{ fullSpeech }}
                    </div>
                  </DialogContent>
                </Dialog>

                <a
                  :href="videoHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-lumi-purple/15 border border-lumi-purple/60 text-lumi-pink hover:bg-lumi-purple/25 transition-colors text-sm font-medium"
                >
                  {{ videoLabel }}
                  <Icon name="lucide:external-link" class="w-4 h-4" />
                </a>
              </div>
            </template>

            <!-- Full: inline full speech + video button -->
            <template v-else>
              <div class="pt-4 border-t border-lumi-purple/20">
                <p class="font-mono text-xs uppercase tracking-[0.2em] text-lumi-pink mb-4">— {{ headline }} —</p>
                <div class="whitespace-pre-line text-fg-primary leading-loose text-base">{{ fullSpeech }}</div>
              </div>
              <div class="pt-4">
                <a
                  :href="videoHref"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lumi-purple/15 border border-lumi-purple/60 text-lumi-pink hover:bg-lumi-purple/25 transition-colors text-sm font-medium"
                >
                  {{ videoLabel }}
                  <Icon name="lucide:external-link" class="w-4 h-4" />
                </a>
              </div>
            </template>
          </div>
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
```

- [ ] **Step 6: 在 `app/pages/index.vue` 引入 — Founders 區段之後、For Business 之前**

於 `<!-- 8. For Business entry -->` 之前插入：

```vue
    <!-- 7.5. Advisor: 林偉賢 -->
    <AdvisorCard
      variant="compact"
      :eyebrow="t('home.lumi.advisor.eyebrow')"
      :name="t('home.lumi.advisor.name')"
      :title="t('home.lumi.advisor.title')"
      :headline="t('home.lumi.advisor.headline')"
      :quotes="(tm('home.lumi.advisor.quotes') as string[])"
      :expand-label="t('home.lumi.advisor.expand_label')"
      :video-label="t('home.lumi.advisor.video_label')"
      :full-speech="t('home.lumi.advisor.full_speech')"
      video-href="https://91bse.org/"
    />
```

確保 useI18n() 結構含 tm: `const { t, tm, locale } = useI18n()`。

- [ ] **Step 7: 驗證**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW | grep -c "林偉賢"
curl -s http://localhost:3000/zh-TW | grep -c "真情推薦"
curl -s http://localhost:3000/en | grep -c "Lin Wei-Hsien"
kill %1 2>/dev/null
```

預期皆 ≥ 1。

- [ ] **Step 8: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add i18n/locales/ public/img/advisors/ app/components/home/AdvisorCard.vue app/pages/index.vue
git commit -m "feat(home): add AdvisorCard with 林偉賢 真情推薦 (compact variant + Dialog)

- 3 句摘錄金句 + Dialog 展開 22 行完整推薦詞
- 真情推薦 Video 按鈕外連 https://91bse.org/
- 大頭照欄位先留空（漸層底 + 「林」字佔位），user 後補

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 8: 投資人頁全面重寫 — Step 1：移除舊內容 + 改寫 content/.md

**Files:**
- Modify: `content/zh-TW/investors.md`
- Modify: `content/zh-CN/investors.md`
- Modify: `content/en/investors.md`

- [ ] **Step 1: 改寫 `content/zh-TW/investors.md`**

```markdown
---
title: 投資人專區
description: 為了我媽，我們造了她 — LUMI 將陪世界上 8 億個爸爸媽媽，把每一步走完。
features:
  - icon: heart-handshake
    title: L1 銀髮陪伴
    desc: LUMI v1 螢幕陪伴，從手機走進客廳、走進健康守護
  - icon: database
    title: L2 行為大模型
    desc: 全球第一個 60+ 銀髮族操作行為資料集，會複利的資產
  - icon: building-2
    title: L3 企業模組
    desc: 預裝授權給長照機構、保險公司、AARP 與政府數位平權專案
---

## 投資論述總結

我們不是「服務所有 AI 用戶」這種模糊定位。我們專攻一件事：**銀髮族日常科技痛點 + 子女付費 + APAC 老齡化震央**。

完整 Pitch Deck、財務預測、估值與投資條款請透過下方按鈕索取。我們會在保密協議下分享。
```

- [ ] **Step 2: 改寫 `content/zh-CN/investors.md`**

```markdown
---
title: 投资人专区
description: 为了我妈，我们造了她 — LUMI 将陪世界上 8 亿个爸爸妈妈，把每一步走完。
features:
  - icon: heart-handshake
    title: L1 银发陪伴
    desc: LUMI v1 屏幕陪伴，从手机走进客厅、走进健康守护
  - icon: database
    title: L2 行为大模型
    desc: 全球第一个 60+ 银发族操作行为数据集，会复利的资产
  - icon: building-2
    title: L3 企业模块
    desc: 预装授权给长照机构、保险公司、AARP 与政府数位平权专案
---

## 投资论述总结

我们不是「服务所有 AI 用户」这种模糊定位。我们专攻一件事：**银发族日常科技痛点 + 子女付费 + APAC 老龄化震央**。

完整 Pitch Deck、财务预测、估值与投资条款请透过下方按钮索取。我们会在保密协议下分享。
```

- [ ] **Step 3: 改寫 `content/en/investors.md`**

```markdown
---
title: Investor Center
description: I built her for my mother — LUMI will walk through every step with 800 million parents around the world.
features:
  - icon: heart-handshake
    title: L1 — Senior Companion
    desc: LUMI v1 on-screen companion, extending from phone to living room and health monitoring
  - icon: database
    title: L2 — Behavior Data Engine
    desc: The first 60+ senior behavior dataset on the planet — an asset that compounds
  - icon: building-2
    title: L3 — Enterprise Modules
    desc: Pre-installed licensing for eldercare, insurance, AARP, and government digital-equity programs
---

## Investment Thesis Summary

We are not "an AI for everyone." We focus on one thing: **everyday tech pain points for seniors + paying adult children + the APAC aging epicenter**.

Request the full Pitch Deck, financial projections, valuation and investment terms via the button below — we share under NDA.
```

- [ ] **Step 4: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add content/
git commit -m "refactor(investors,content): rewrite investor markdown to LUMI thesis

- 拿掉 Qualcomm/PlayStation/Android 平台論述（移到 /platform · /partners 即可）
- frontmatter features 改為 LUMI 三大支柱（L1 銀髮陪伴 / L2 行為大模型 / L3 企業模組）
- Markdown 主體濃縮為一段定位總結，細節改由 vue 元件呈現

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 9: 投資人頁加 i18n + 建 RevenueStreams 元件

**Files:**
- Modify: `i18n/locales/{zh-TW,zh-CN,en}.json` — 新增 `investors.*` 結構
- Create: `app/components/sections/RevenueStreams.vue`

- [ ] **Step 1: i18n keys（zh-TW）— 新增頂層 `investors`**

於 `i18n/locales/zh-TW.json` 中 `home` 與 `founders` 之間插入：

```json
"investors": {
  "mission": {
    "eyebrow": "我們存在是為了",
    "mission": "讓全天下沒有學不會 AI 的銀髮族",
    "value_eyebrow": "核心價值",
    "value": "長者為重"
  },
  "revenue": {
    "title": "三條收益模型",
    "subtitle": "USD $20M ARR · 2027 目標 · 毛利率 87%",
    "r1": {
      "share": "55%",
      "title": "家庭訂閱",
      "amount": "USD $11M",
      "lines": [
        "USD $9.99 / 月 · 個人方案",
        "USD $19.99 / 月 · 家庭方案（可加 4 位長輩）",
        "8 萬戶付費家庭"
      ],
      "icon": "users"
    },
    "r2": {
      "share": "25%",
      "title": "協助用戶的數據",
      "amount": "USD $5M",
      "lines": [
        "匿名化銀髮族操作行為數據",
        "授權給 AI 公司、保險、長照、政府",
        "B2B 數據 API 授權"
      ],
      "icon": "database"
    },
    "r3": {
      "share": "20%",
      "title": "IP · Lumi 周邊",
      "amount": "USD $4M",
      "lines": [
        "公仔 / 聯名 / 表情包 / AR 濾鏡",
        "品牌授權（Hello Kitty 模式）",
        "毛利 90%+"
      ],
      "icon": "sparkles"
    },
    "arr_label": "2027 ARR · 年度經常收入",
    "arr_value": "USD $20M",
    "gross_margin_label": "毛利率",
    "gross_margin_value": "87%",
    "closing_note": "三條收入彼此獨立又互相加成"
  },
  "exits": {
    "title": "三條退場路徑（同時開啟）",
    "subtitle": "三條退場彼此獨立，無一單一依賴。",
    "e1": {
      "code": "01",
      "title": "被併購",
      "desc": "Apple / Google / Amazon Alexa+ / 長照集團 / AARP"
    },
    "e2": {
      "code": "02",
      "title": "獨立上市",
      "desc": "美股（Nasdaq）或港股 / 銀髮科技類股當紅賽道"
    },
    "e3": {
      "code": "03",
      "title": "戰略合併",
      "desc": "與機器人公司（Figure / 1X）合併，進入 v4 沉浸關懷階段"
    }
  }
},
```

- [ ] **Step 2: i18n keys（zh-CN）**

```json
"investors": {
  "mission": {
    "eyebrow": "我们存在是为了",
    "mission": "让全天下没有学不会 AI 的银发族",
    "value_eyebrow": "核心价值",
    "value": "长者为重"
  },
  "revenue": {
    "title": "三条收益模型",
    "subtitle": "USD $20M ARR · 2027 目标 · 毛利率 87%",
    "r1": {
      "share": "55%",
      "title": "家庭订阅",
      "amount": "USD $11M",
      "lines": [
        "USD $9.99 / 月 · 个人方案",
        "USD $19.99 / 月 · 家庭方案（可加 4 位长辈）",
        "8 万户付费家庭"
      ],
      "icon": "users"
    },
    "r2": {
      "share": "25%",
      "title": "协助用户的数据",
      "amount": "USD $5M",
      "lines": [
        "匿名化银发族操作行为数据",
        "授权给 AI 公司、保险、长照、政府",
        "B2B 数据 API 授权"
      ],
      "icon": "database"
    },
    "r3": {
      "share": "20%",
      "title": "IP · Lumi 周边",
      "amount": "USD $4M",
      "lines": [
        "公仔 / 联名 / 表情包 / AR 滤镜",
        "品牌授权（Hello Kitty 模式）",
        "毛利 90%+"
      ],
      "icon": "sparkles"
    },
    "arr_label": "2027 ARR · 年度经常收入",
    "arr_value": "USD $20M",
    "gross_margin_label": "毛利率",
    "gross_margin_value": "87%",
    "closing_note": "三条收入彼此独立又互相加成"
  },
  "exits": {
    "title": "三条退场路径（同时开启）",
    "subtitle": "三条退场彼此独立，无一单一依赖。",
    "e1": {
      "code": "01",
      "title": "被并购",
      "desc": "Apple / Google / Amazon Alexa+ / 长照集团 / AARP"
    },
    "e2": {
      "code": "02",
      "title": "独立上市",
      "desc": "美股（Nasdaq）或港股 / 银发科技类股当红赛道"
    },
    "e3": {
      "code": "03",
      "title": "战略合并",
      "desc": "与机器人公司（Figure / 1X）合并，进入 v4 沉浸关怀阶段"
    }
  }
},
```

- [ ] **Step 3: i18n keys（en）**

```json
"investors": {
  "mission": {
    "eyebrow": "WE EXIST TO ENSURE",
    "mission": "No senior is left behind in the AI era",
    "value_eyebrow": "CORE VALUE",
    "value": "Elders First"
  },
  "revenue": {
    "title": "Three revenue streams",
    "subtitle": "USD $20M ARR · 2027 target · 87% gross margin",
    "r1": {
      "share": "55%",
      "title": "Family subscriptions",
      "amount": "USD $11M",
      "lines": [
        "USD $9.99 / mo · Individual plan",
        "USD $19.99 / mo · Family plan (up to 4 elders)",
        "80,000 paying households"
      ],
      "icon": "users"
    },
    "r2": {
      "share": "25%",
      "title": "Behavior data",
      "amount": "USD $5M",
      "lines": [
        "Anonymized senior operation-behavior data",
        "Licensed to AI companies, insurers, eldercare, governments",
        "B2B data API licensing"
      ],
      "icon": "database"
    },
    "r3": {
      "share": "20%",
      "title": "IP · LUMI merchandise",
      "amount": "USD $4M",
      "lines": [
        "Figurines · Collabs · Stickers · AR filters",
        "Brand licensing (Hello Kitty playbook)",
        "90%+ gross margin"
      ],
      "icon": "sparkles"
    },
    "arr_label": "2027 ARR · Annual recurring revenue",
    "arr_value": "USD $20M",
    "gross_margin_label": "Gross margin",
    "gross_margin_value": "87%",
    "closing_note": "Three streams that compound independently and reinforce each other."
  },
  "exits": {
    "title": "Three exit paths (open simultaneously)",
    "subtitle": "Three independent exits, none reliant on a single dependency.",
    "e1": {
      "code": "01",
      "title": "Acquisition",
      "desc": "Apple / Google / Amazon Alexa+ / Eldercare groups / AARP"
    },
    "e2": {
      "code": "02",
      "title": "Independent IPO",
      "desc": "Nasdaq or HKEX / senior-tech sector momentum"
    },
    "e3": {
      "code": "03",
      "title": "Strategic merger",
      "desc": "Merge with robotics companies (Figure / 1X) into v4 immersive care"
    }
  }
},
```

- [ ] **Step 4: 建立 `app/components/sections/RevenueStreams.vue`**

```vue
<script setup lang="ts">
type Stream = {
  share: string
  title: string
  amount: string
  lines: string[]
  icon: string
}

defineProps<{
  title: string
  subtitle: string
  streams: Stream[]
  arrLabel: string
  arrValue: string
  grossMarginLabel: string
  grossMarginValue: string
  closingNote: string
}>()
</script>

<template>
  <section class="py-20 lg:py-24">
    <div class="container-tight">
      <div class="text-center mb-12 lg:mb-16 space-y-4">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p class="text-fg-secondary text-base md:text-lg">{{ subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
        <FadeInUp v-for="(s, i) in streams" :key="s.title" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full flex flex-col gap-4">
            <div class="flex items-baseline justify-between">
              <div
                class="w-12 h-12 rounded-xl flex items-center justify-center border border-lumi-purple/30"
                style="background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.18), hsl(var(--lumi-pink) / 0.18));"
              >
                <Icon :name="`lucide:${s.icon}`" class="w-6 h-6 text-lumi-pink" />
              </div>
              <div class="text-4xl lg:text-5xl font-display font-bold text-lumi-gradient">{{ s.share }}</div>
            </div>
            <h3 class="text-xl font-display font-bold text-fg-primary">{{ s.title }}</h3>
            <p class="text-2xl font-display font-bold text-lumi-pink">{{ s.amount }}</p>
            <ul class="space-y-1 text-sm text-fg-secondary leading-relaxed">
              <li v-for="line in s.lines" :key="line" class="flex gap-2">
                <span class="text-lumi-pink mt-1">·</span>
                <span>{{ line }}</span>
              </li>
            </ul>
          </div>
        </FadeInUp>
      </div>

      <FadeInUp :delay="100">
        <div class="rounded-2xl border border-lumi-pink/40 bg-bg-glass backdrop-blur-glass p-8 lg:p-10 text-center max-w-3xl mx-auto">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-fg-muted mb-3">
            {{ arrLabel }}
          </p>
          <div class="flex items-baseline justify-center gap-6 lg:gap-10 flex-wrap">
            <div class="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-lumi-gradient">
              {{ arrValue }}
            </div>
            <div class="font-mono text-sm uppercase tracking-wider text-fg-muted">·</div>
            <div>
              <p class="font-mono text-xs uppercase tracking-[0.2em] text-fg-muted">{{ grossMarginLabel }}</p>
              <p class="text-3xl md:text-4xl font-display font-bold text-lumi-pink">{{ grossMarginValue }}</p>
            </div>
          </div>
          <p class="text-fg-secondary text-sm mt-4 italic">{{ closingNote }}</p>
        </div>
      </FadeInUp>
    </div>
  </section>
</template>
```

- [ ] **Step 5: Commit（i18n + 元件，先不接頁面）**

```bash
cd /home/sss2500/codejobs/infiag.com
git add i18n/locales/ app/components/sections/RevenueStreams.vue
git commit -m "feat(investors): add investors i18n keys + RevenueStreams component

- investors.{mission, revenue, exits} 三段新鍵值（三語）
- RevenueStreams 元件詳列三條收益（含金額、單價、戶數）
- 等待 Task 11 接入 investors.vue

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 10: 建 ExitPaths 元件

**Files:**
- Create: `app/components/sections/ExitPaths.vue`

- [ ] **Step 1: 建立元件**

```vue
<script setup lang="ts">
type Exit = {
  code: string
  title: string
  desc: string
}

defineProps<{
  title: string
  subtitle: string
  exits: Exit[]
}>()
</script>

<template>
  <section class="py-20 lg:py-24 grid-tech">
    <div class="container-tight">
      <div class="text-center mb-12 lg:mb-16 space-y-4">
        <h2
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto">{{ subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FadeInUp v-for="(e, i) in exits" :key="e.code" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full space-y-4 group hover:border-lumi-purple/40 transition-colors relative">
            <span class="absolute top-4 right-4 font-mono text-2xl text-lumi-purple/40 font-bold">{{ e.code }}</span>
            <h3 class="text-xl font-display font-bold text-fg-primary pr-12">{{ e.title }}</h3>
            <p class="text-fg-secondary leading-relaxed">{{ e.desc }}</p>
          </div>
        </FadeInUp>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 2: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add app/components/sections/ExitPaths.vue
git commit -m "feat(investors): add ExitPaths component (3 exit-strategy cards)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 11: 重寫 `app/pages/investors.vue` — 全面替換為 LUMI 主軸

**Files:**
- Modify: `app/pages/investors.vue`（全面重寫）

- [ ] **Step 1: 全面替換 `app/pages/investors.vue` 為新版**

```vue
<script setup lang="ts">
const { t, tm, locale } = useI18n()
const { pitchDeck } = useMailto()

const { data } = await useAsyncData(
  () => `investors-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value.toLowerCase()}/investors`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })

const lang = useLocaleLang()
useSchemaOrg([
  defineWebPage({
    '@id': 'https://infiag.com/investors#webpage',
    url: 'https://infiag.com/investors',
    name: () => t('nav.investors'),
    description: () => t('schema.org.description'),
    inLanguage: lang,
    isPartOf: { '@id': 'https://infiag.com/#website' },
    about: { '@id': 'https://infiag.com/#organization' },
  }),
])

const isEn = computed(() => locale.value === 'en')
const isCN = computed(() => locale.value === 'zh-CN')

// L1/L2/L3 vision pillars (LUMI 主軸)
const visionLabel = computed(() => isEn.value ? 'INVESTMENT THESIS' : (isCN.value ? '投資主軸' : '投資主軸'))
const visionTitle = computed(() => isEn.value
  ? 'Three layers of compounding value'
  : (isCN.value ? '三层复利价值' : '三層複利價值'))
const visionSubtitle = computed(() => isEn.value
  ? 'LUMI is the entry point — the long-term thesis is a behavior-data flywheel that powers a multi-product, multi-market company.'
  : (isCN.value
    ? 'LUMI 是入口 — 但长期主轴是行为数据飞轮所驱动、跨产品跨市场的多轨成长。'
    : 'LUMI 是入口 — 但長期主軸是行為數據飛輪所驅動、跨產品跨市場的多軌成長。'))

const pillars = computed(() => [
  {
    icon: 'heart-handshake',
    code: 'L1',
    title: isEn.value ? 'Senior companion' : (isCN.value ? '银发陪伴' : '銀髮陪伴'),
    desc: isEn.value
      ? 'LUMI v1 ships as an on-screen senior companion. Studio (AR) and Effects (VR) extend the same companion across modalities.'
      : (isCN.value
        ? 'LUMI v1 率先上线屏幕陪伴。Studio (AR) 与 Effects (VR) 把同一个同伴延伸到不同模态。'
        : 'LUMI v1 率先上線螢幕陪伴。Studio (AR) 與 Effects (VR) 把同一個同伴延伸到不同模態。'),
  },
  {
    icon: 'database',
    code: 'L2',
    title: isEn.value ? 'Behavior data engine' : (isCN.value ? '行为大模型' : '行為大模型'),
    desc: isEn.value
      ? 'Every walked-through task contributes to the first-of-its-kind 60+ senior behavior dataset — the asset that compounds.'
      : (isCN.value
        ? '每一次「陪做完」都在累积全球第一个 60+ 银发族操作行为资料集 — 这是真正会复利的资产。'
        : '每一次「陪做完」都在累積全球第一個 60+ 銀髮族操作行為資料集 — 這是真正會複利的資產。'),
  },
  {
    icon: 'building-2',
    code: 'L3',
    title: isEn.value ? 'Enterprise modules' : (isCN.value ? '企业模块变现' : '企業模組變現'),
    desc: isEn.value
      ? 'LUMI for Business licenses the engine — to eldercare, insurance, AARP and government digital-equity programs.'
      : (isCN.value
        ? 'LUMI for Business 把引擎授权给企业 — 长照机构、保险公司、AARP、政府数位平权专案。'
        : 'LUMI for Business 把引擎授權給企業 — 長照機構、保險公司、AARP、政府數位平權專案。'),
  },
])

// Growth visual (保留 30× 示意，守 NDA 線)
const growthTitle = computed(() => isEn.value ? 'Five-year ambition' : (isCN.value ? '五年目标' : '五年目標'))
const growthSubtitle = computed(() => isEn.value
  ? 'A multi-fold ARR ambition between 2026 launch and 2030. Detailed financials shared under NDA.'
  : (isCN.value
    ? '从 2026 上线到 2030 的多倍 ARR 愿景。详细财务数字于 NDA 后分享。'
    : '從 2026 上線到 2030 的多倍 ARR 願景。詳細財務數字於 NDA 後分享。'))
const growthFromLabel = computed(() => isEn.value ? '2026 launch' : (isCN.value ? '2026 起点' : '2026 起點'))
const growthToLabel = computed(() => isEn.value ? '2030 target' : (isCN.value ? '2030 愿景' : '2030 願景'))
const growthNote = computed(() => isEn.value
  ? 'Multiplier shown for direction, not as guidance. Request the deck for figures.'
  : (isCN.value
    ? '倍数仅示意方向，非营运指引。完整数字请索取 Pitch Deck。'
    : '倍數僅示意方向，非營運指引。完整數字請索取 Pitch Deck。'))

// Market data (重用首頁 i18n key)
const marketKpis = computed(() => [
  { stat: t('home.lumi.market.kpi.i1.stat'), label: t('home.lumi.market.kpi.i1.label'), desc: t('home.lumi.market.kpi.i1.desc'), icon: t('home.lumi.market.kpi.i1.icon') },
  { stat: t('home.lumi.market.kpi.i2.stat'), label: t('home.lumi.market.kpi.i2.label'), desc: t('home.lumi.market.kpi.i2.desc'), icon: t('home.lumi.market.kpi.i2.icon') },
  { stat: t('home.lumi.market.kpi.i3.stat'), label: t('home.lumi.market.kpi.i3.label'), desc: t('home.lumi.market.kpi.i3.desc'), icon: t('home.lumi.market.kpi.i3.icon') },
  { stat: t('home.lumi.market.kpi.i4.stat'), label: t('home.lumi.market.kpi.i4.label'), desc: t('home.lumi.market.kpi.i4.desc'), icon: t('home.lumi.market.kpi.i4.icon') },
])
const apacCountries = computed(() => (tm('home.lumi.market.apac.countries') as Array<{ name: string; c2020: string; c2030: string; c2050: string }>) ?? [])

// Revenue streams
const revenueStreams = computed(() => [
  { share: t('investors.revenue.r1.share'), title: t('investors.revenue.r1.title'), amount: t('investors.revenue.r1.amount'), lines: tm('investors.revenue.r1.lines') as string[], icon: t('investors.revenue.r1.icon') },
  { share: t('investors.revenue.r2.share'), title: t('investors.revenue.r2.title'), amount: t('investors.revenue.r2.amount'), lines: tm('investors.revenue.r2.lines') as string[], icon: t('investors.revenue.r2.icon') },
  { share: t('investors.revenue.r3.share'), title: t('investors.revenue.r3.title'), amount: t('investors.revenue.r3.amount'), lines: tm('investors.revenue.r3.lines') as string[], icon: t('investors.revenue.r3.icon') },
])

// Exit paths
const exits = computed(() => [
  { code: t('investors.exits.e1.code'), title: t('investors.exits.e1.title'), desc: t('investors.exits.e1.desc') },
  { code: t('investors.exits.e2.code'), title: t('investors.exits.e2.title'), desc: t('investors.exits.e2.desc') },
  { code: t('investors.exits.e3.code'), title: t('investors.exits.e3.title'), desc: t('investors.exits.e3.desc') },
])
</script>

<template>
  <div v-if="data">
    <!-- 1. Hero -->
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />

    <!-- 2. Mission / Values (大字版) -->
    <SectionContainer variant="tight">
      <div class="text-center space-y-4 max-w-3xl mx-auto">
        <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink">
          {{ t('investors.mission.eyebrow') }}
        </p>
        <h2 class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient leading-tight">
          {{ t('investors.mission.mission') }}
        </h2>
        <div class="pt-4">
          <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink">
            {{ t('investors.mission.value_eyebrow') }}
          </p>
          <p class="text-2xl md:text-3xl font-display font-bold text-lumi-gradient">
            {{ t('investors.mission.value') }}
          </p>
        </div>
      </div>
    </SectionContainer>

    <!-- 3. Vision pillars -->
    <SectionContainer
      :title="visionTitle"
      :subtitle="visionSubtitle"
    >
      <p class="font-mono text-xs uppercase tracking-[0.25em] text-lumi-pink text-center -mt-8 mb-10">
        {{ visionLabel }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FadeInUp v-for="(p, i) in pillars" :key="p.code" :delay="i * 120">
          <div class="glass-card p-6 lg:p-8 h-full space-y-4 group hover:border-lumi-purple/40 transition-colors relative">
            <span class="absolute top-4 right-4 font-mono text-xs text-fg-muted">{{ p.code }}</span>
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center border border-lumi-purple/30 group-hover:shadow-lumi-glow transition-shadow"
              style="background: linear-gradient(135deg, hsl(var(--lumi-purple) / 0.18), hsl(var(--lumi-pink) / 0.18));"
            >
              <Icon :name="`lucide:${p.icon}`" class="w-6 h-6 text-lumi-pink" />
            </div>
            <h3 class="text-xl font-display font-bold text-fg-primary">{{ p.title }}</h3>
            <p class="text-fg-secondary leading-relaxed">{{ p.desc }}</p>
          </div>
        </FadeInUp>
      </div>
    </SectionContainer>

    <!-- 4. Advisor (compact) -->
    <AdvisorCard
      variant="compact"
      :eyebrow="t('home.lumi.advisor.eyebrow')"
      :name="t('home.lumi.advisor.name')"
      :title="t('home.lumi.advisor.title')"
      :headline="t('home.lumi.advisor.headline')"
      :quotes="(tm('home.lumi.advisor.quotes') as string[])"
      :expand-label="t('home.lumi.advisor.expand_label')"
      :video-label="t('home.lumi.advisor.video_label')"
      :full-speech="t('home.lumi.advisor.full_speech')"
      video-href="https://91bse.org/"
    />

    <!-- 5. Capital backers -->
    <CapitalBackers
      :eyebrow="t('home.lumi.backers.eyebrow')"
      :b1-role="t('home.lumi.backers.b1_role')"
      :b2-role="t('home.lumi.backers.b2_role')"
      :b3-role="t('home.lumi.backers.b3_role')"
      :headline="t('home.lumi.backers.headline')"
    />

    <!-- 6. Market opportunity -->
    <MarketOpportunity
      :eyebrow-macro="t('home.lumi.market.eyebrow_macro')"
      :title="t('home.lumi.market.title')"
      :subtitle="t('home.lumi.market.subtitle')"
      :kpis="marketKpis"
      :apac-title="t('home.lumi.market.apac.title')"
      :apac-source-note="t('home.lumi.market.apac.source_note')"
      :header-country="t('home.lumi.market.apac.header_country')"
      :header-2020="t('home.lumi.market.apac.header_2020')"
      :header-2030="t('home.lumi.market.apac.header_2030')"
      :header-2050-share="t('home.lumi.market.apac.header_2050_share')"
      :countries="apacCountries"
    />

    <!-- 7. Revenue streams (詳版) -->
    <RevenueStreams
      :title="t('investors.revenue.title')"
      :subtitle="t('investors.revenue.subtitle')"
      :streams="revenueStreams"
      :arr-label="t('investors.revenue.arr_label')"
      :arr-value="t('investors.revenue.arr_value')"
      :gross-margin-label="t('investors.revenue.gross_margin_label')"
      :gross-margin-value="t('investors.revenue.gross_margin_value')"
      :closing-note="t('investors.revenue.closing_note')"
    />

    <!-- 8. 30× growth visual (保留 NDA 線) -->
    <SectionContainer variant="tight">
      <div class="rounded-2xl border border-lumi-purple/30 bg-bg-glass backdrop-blur-glass p-8 lg:p-12 relative overflow-hidden">
        <div class="absolute inset-0 grid-tech opacity-25 pointer-events-none" />
        <div class="relative space-y-8">
          <div class="text-center space-y-3">
            <h3 class="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-gradient">
              {{ growthTitle }}
            </h3>
            <p class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto">
              {{ growthSubtitle }}
            </p>
          </div>
          <div class="grid grid-cols-[1fr_auto_2fr] items-end gap-4 lg:gap-6 max-w-3xl mx-auto pt-4">
            <div class="space-y-2 text-right">
              <p class="font-mono text-xs uppercase tracking-wider text-fg-muted">{{ growthFromLabel }}</p>
              <div class="h-12 lg:h-14 rounded-md bg-lumi-purple/30 border border-lumi-purple/40 ml-auto" style="width: 30%;" />
              <p class="font-display text-2xl font-bold text-lumi-pink">1×</p>
            </div>
            <div class="flex flex-col items-center justify-end pb-12">
              <Icon name="lucide:arrow-right" class="w-8 h-8 text-lumi-pink animate-pulse" />
            </div>
            <div class="space-y-2">
              <p class="font-mono text-xs uppercase tracking-wider text-fg-muted">{{ growthToLabel }}</p>
              <div
                class="h-32 lg:h-40 rounded-md border border-lumi-pink shadow-lumi-glow"
                style="width: 100%; background: linear-gradient(180deg, hsl(var(--lumi-purple)) 0%, hsl(var(--lumi-pink)) 100%);"
              />
              <p class="font-display text-4xl lg:text-5xl font-bold text-lumi-gradient">30×</p>
            </div>
          </div>
          <p class="text-center text-xs text-fg-muted italic max-w-xl mx-auto">
            {{ growthNote }}
          </p>
        </div>
      </div>
    </SectionContainer>

    <!-- 9. Exit paths -->
    <ExitPaths
      :title="t('investors.exits.title')"
      :subtitle="t('investors.exits.subtitle')"
      :exits="exits"
    />

    <!-- 10. Features (LUMI 三大支柱) -->
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>

    <!-- 11. Markdown summary -->
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>

    <!-- 12. CTA -->
    <CTASection
      :title="t('cta.request_deck')"
      :subtitle="locale === 'en'
        ? 'Receive our full materials under NDA.'
        : '我們會在保密協議下分享完整資料'"
      :cta-label="t('cta.request_deck')"
      :cta-href="pitchDeck(locale)"
    />
  </div>
</template>
```

- [ ] **Step 2: 驗證**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW/investors | grep -c "三條收益模型"
curl -s http://localhost:3000/zh-TW/investors | grep -c "退場路徑"
curl -s http://localhost:3000/en/investors | grep -c "Three revenue streams"
curl -s http://localhost:3000/en/investors | grep -c "Acquisition"
kill %1 2>/dev/null
```

預期 ≥ 1。

- [ ] **Step 3: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add app/pages/investors.vue
git commit -m "refactor(investors): rewrite investor page to LUMI thesis (12 sections)

順序：Hero → Mission/Values → L1/L2/L3 Vision → 林偉賢顧問 → 資本後盾 → APAC 市場 → 三條收益（詳版）→ 30× 示意 → 退場路徑 → Features → Markdown → CTA。

- 拿掉 Qualcomm/PlayStation/Android 平台論述
- 重用首頁 CapitalBackers / AdvisorCard / MarketOpportunity 元件
- 新增 RevenueStreams（詳列 \$11M+\$5M+\$4M）+ ExitPaths
- Vision pillars L1/L2/L3 改寫為 LUMI 主軸
- 30× growth visual 保留 NDA 線，未升級為 50×

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 12: About 頁加 Mission + Advisor 完整版（full variant）

**Files:**
- Modify: `app/pages/about.vue`

- [ ] **Step 1: 在 about.vue 開場（hero img 之後）加 MissionBar 元件**

於 `about.vue` template 中第一個 `<SectionContainer ... />` 之前插入：

```vue
    <MissionBar
      :eyebrow-mission="t('home.lumi.mission.eyebrow_mission')"
      :mission="t('home.lumi.mission.mission')"
      :eyebrow-value="t('home.lumi.mission.eyebrow_value')"
      :value="t('home.lumi.mission.value')"
    />
```

- [ ] **Step 2: 在 about.vue 創辦團隊 SectionContainer 結束後新增 AdvisorCard（full variant）**

於 `<!-- close <SectionContainer id="team"> -->` 之後（template 收尾 `</div>` 之前）插入：

```vue
    <AdvisorCard
      variant="full"
      :eyebrow="t('home.lumi.advisor.eyebrow')"
      :name="t('home.lumi.advisor.name')"
      :title="t('home.lumi.advisor.title')"
      :role-extended="t('home.lumi.advisor.role_extended')"
      :headline="t('home.lumi.advisor.headline')"
      :quotes="(tm('home.lumi.advisor.quotes') as string[])"
      :expand-label="t('home.lumi.advisor.expand_label')"
      :video-label="t('home.lumi.advisor.video_label')"
      :full-speech="t('home.lumi.advisor.full_speech')"
      video-href="https://91bse.org/"
    />
```

確保 useI18n() 解構含 tm：`const { t, tm, locale } = useI18n()`。

- [ ] **Step 3: 驗證**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
curl -s http://localhost:3000/zh-TW/about | grep -c "讓全天下沒有學不會"
curl -s http://localhost:3000/zh-TW/about | grep -c "兒子啊，有嚕米以後"
curl -s http://localhost:3000/en/about | grep -c "No senior left behind"
kill %1 2>/dev/null
```

預期 ≥ 1。

- [ ] **Step 4: Commit**

```bash
cd /home/sss2500/codejobs/infiag.com
git add app/pages/about.vue
git commit -m "feat(about): add MissionBar + AdvisorCard full-speech inline

- 開場使命條
- 創辦團隊下方加林偉賢老師完整推薦詞（22 行 inline，不用 dialog）

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Task 13: 完整建置驗證 + 三語截圖

**Files:** 無

- [ ] **Step 1: 完整 generate**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm generate
```

預期：成功輸出，且 `verify-jsonld.mjs` 不報錯。如有 prerender error，依錯誤訊息修復對應檔案。

- [ ] **Step 2: 三語首頁 / 投資人頁 / About 頁手動跑 dev server 並截圖**

```bash
cd /home/sss2500/codejobs/infiag.com
pnpm dev &
sleep 10
```

用 Playwright MCP 截圖：
- `/zh-TW`、`/zh-CN`、`/en`（首頁全長）
- `/zh-TW/investors`、`/zh-CN/investors`、`/en/investors`
- `/zh-TW/about`、`/zh-CN/about`、`/en/about`

人工檢查：
- MissionBar 三語顯示
- CapitalBackers 三 logo 正確（Marvel 深底）
- MarketOpportunity 國家表（桌機 + 手機切換）
- RevenueFlywheel 三條收益 + ARR 大字
- AdvisorCard compact Dialog 點擊展開全文
- AdvisorCard full（About 頁）inline 全文
- Investor 頁 12 區塊全部正確顯示

```bash
kill %1 2>/dev/null
```

- [ ] **Step 3: 確認沒有遺留舊 i18n key 引用**

```bash
cd /home/sss2500/codejobs/infiag.com
grep -rn "home.lumi.pain.i[1-4]_" app/ 2>/dev/null
grep -rn "PainPointStats" app/ 2>/dev/null
grep -rn "Qualcomm\|PlayStation\|Android" app/pages/investors.vue content/ 2>/dev/null
```

預期皆無輸出。

- [ ] **Step 4: 最後 commit（如有任何 generate 修復）**

```bash
cd /home/sss2500/codejobs/infiag.com
git status
# 如有殘留改動：
git add -A
git commit -m "chore: final pnpm generate verification fixes

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Self-Review Checklist

執行時請對照以下項目逐項勾驗：

### Spec coverage
- [x] Spec §2 NDA 線 — Task 8/9/11 守住（30× 示意、無 \$6.5M / \$30M / 18% / 50× 露出）
- [x] Spec §3 使命 + 長者為重 — Task 3 (home) + Task 11 (investor) + Task 12 (about)
- [x] Spec §4.1 MissionBar — Task 3
- [x] Spec §4.2 CapitalBackers — Task 4
- [x] Spec §4.3 MarketOpportunity — Task 5
- [x] Spec §4.4 RevenueFlywheel — Task 6
- [x] Spec §4.5 AdvisorCard (compact) — Task 7
- [x] Spec §5 投資人頁 12 區塊 — Task 11
- [x] Spec §5.4.2 RevenueStreams (詳版) — Task 9
- [x] Spec §5.4.3 ExitPaths — Task 10
- [x] Spec §6 About 頁使命 + Advisor full — Task 12
- [x] Spec §7 i18n 三語同步 — Task 3-12 各 step
- [x] Spec §8 Marvel 壓縮 — Task 1
- [x] Spec §11 驗收條件 — Task 13

### Type 一致性
- AdvisorCard props: `variant`, `eyebrow`, `name`, `title`, `roleExtended?`, `headline`, `quotes[]`, `expandLabel`, `videoLabel`, `fullSpeech`, `videoHref`, `photoSrc?` — 在 Task 7 / 11 / 12 三處使用一致
- MarketOpportunity props: `eyebrowMacro`, `title`, `subtitle`, `kpis[]`, `apacTitle`, `apacSourceNote`, `headerCountry`, `header2020`, `header2030`, `header2050Share`, `countries[]` — Task 5 / 11 一致
- BusinessFlywheel props: `streams[]` (含 share/title/desc/detail/icon) + arrLabel/arrValue/grossMarginLabel/grossMarginValue/closingNote — 改寫後 Task 6 用法一致
- CapitalBackers props: `eyebrow`, `b1Role`, `b2Role`, `b3Role`, `headline` — Task 4 / 11 一致
- RevenueStreams props: `streams[]` (含 share/title/amount/lines/icon) + arr/margin/closing — Task 9 / 11 一致
- ExitPaths props: `title`, `subtitle`, `exits[]` (含 code/title/desc) — Task 10 / 11 一致

### Placeholder scan
無「TODO / TBD / fill in / 略」等遺留。
