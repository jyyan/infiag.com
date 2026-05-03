# Infinity Agentic 多語靜態網站基礎建設 — 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page (8 pages × 3 locales = 24 URLs) static website foundation for Infinity Agentic with deep-space tech aesthetic, ready to deploy to Cloudflare R2.

**Architecture:** Nuxt 3 (compatibilityVersion 4) SSG + Vue 3 + TypeScript. Tailwind + shadcn-vue for design system. `@nuxtjs/i18n` v9 for three locales (zh-TW default / zh-CN / en) with prefix routing. Long content in Markdown via Nuxt Content v3 collections; UI strings in i18n JSON. Mailto-only forms. Manual deploy to Cloudflare R2 static hosting.

**Tech Stack:** Nuxt 3.14+, Vue 3.5+, TS 5.5+, Tailwind 6.12, shadcn-nuxt 1.0, @nuxtjs/i18n 9.0, @nuxt/content 3.0, @vueuse/motion 2.2, @nuxtjs/seo 2.0, @nuxt/image 1.8, @nuxt/icon 1.10, npm 10.

**Working directory:** `/home/sss2500/codejobs/infiag.com`

**Reference spec:** `docs/superpowers/specs/2026-05-03-infiag-static-site-design.md`

**No formal tests** (per spec §1.4 YAGNI). Verification per task = dev server boots, build succeeds, browser visual check.

---

## File Structure (locked from spec §4)

```
infiag.com/
├── nuxt.config.ts               # Nuxt entry config
├── tailwind.config.ts           # Tailwind theme extension
├── tsconfig.json                # TS config (auto-managed by Nuxt)
├── package.json                 # npm scripts + deps
├── components.json              # shadcn-vue CLI config
├── content.config.ts            # Nuxt Content v3 collection schema
├── app/
│   ├── app.vue                  # Root layout entry
│   ├── layouts/default.vue      # Header + slot + Footer
│   ├── pages/
│   │   ├── index.vue            # Home (6 sections)
│   │   ├── about.vue
│   │   ├── platform.vue
│   │   ├── solutions/
│   │   │   ├── index.vue
│   │   │   ├── golf.vue
│   │   │   ├── ski.vue
│   │   │   └── vision.vue
│   │   ├── partners.vue
│   │   ├── developers.vue
│   │   ├── investors.vue
│   │   └── contact.vue
│   ├── components/
│   │   ├── ui/                  # shadcn-vue (auto-generated, no hand-edit)
│   │   ├── layout/              # AppHeader / AppFooter / NavMenu / LangSwitcher / MobileDrawer
│   │   ├── hero/                # HeroBanner / HeroParticles / InfinityLogoSVG
│   │   ├── sections/            # SectionContainer / FeatureCard / SolutionCard / CTASection / StatNumber
│   │   └── motion/              # FadeInUp / ScrollReveal / TypeWriter
│   ├── composables/
│   │   ├── useMailto.ts
│   │   └── usePageSeo.ts
│   └── assets/
│       ├── css/tailwind.css
│       └── images/              # banner crops, logo
├── content/
│   ├── zh-TW/{solutions/{golf,ski,vision}.md, partners.md, investors.md}
│   ├── zh-CN/{...same...}
│   └── en/{...same...}
├── i18n/
│   └── locales/{zh-TW,zh-CN,en}.json
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── og-default.png           # placeholder
├── ref/                         # existing (banner PNGs + BM.md), do not modify
└── docs/superpowers/{specs,plans}/   # existing spec + this plan
```

---

## Task 1: Initialize git repo and Node project

**Files:**
- Create: `.gitignore`
- Create: `package.json`
- Create: `README.md` (minimal)

- [ ] **Step 1: Initialize git in project root**

```bash
cd /home/sss2500/codejobs/infiag.com
git init
git config user.email "luke@infiag.com"
git config user.name "luke"
```

Expected: `Initialized empty Git repository`.

- [ ] **Step 2: Create `.gitignore`**

```
# Nuxt
.nuxt/
.output/
.data/
.cache/

# Node
node_modules/
*.log
.DS_Store

# Env
.env
.env.local

# Editor
.vscode/
.idea/
*.swp
```

- [ ] **Step 3: Create minimal `README.md`**

```markdown
# infiag.com

Infinity Agentic 無限智能 — official static site.

## Stack

Nuxt 3 + Vue 3 + TypeScript + Tailwind CSS + shadcn-vue. Three locales (zh-TW / zh-CN / en). Static-generated and deployed to Cloudflare R2.

## Develop

\`\`\`bash
npm install
npm run dev          # http://localhost:3000
\`\`\`

## Build

\`\`\`bash
npm run generate     # → .output/public/
\`\`\`

Then upload `.output/public/` to Cloudflare R2 bucket via dashboard or wrangler.

## Documentation

- Spec: `docs/superpowers/specs/2026-05-03-infiag-static-site-design.md`
- Plan: `docs/superpowers/plans/2026-05-03-infiag-static-site-implementation.md`
```

- [ ] **Step 4: First commit**

```bash
git add .gitignore README.md docs/ ref/
git commit -m "chore: initial repo with spec, plan, and reference assets"
```

Expected: Commit succeeds with these files.

---

## Task 2: Scaffold Nuxt 3 with compatibilityVersion 4

**Files:**
- Create: `package.json` (overwritten by Nuxt init)
- Create: `nuxt.config.ts`
- Create: `tsconfig.json`
- Create: `app/app.vue`

- [ ] **Step 1: Initialize Nuxt project**

```bash
cd /home/sss2500/codejobs/infiag.com
npx nuxi@latest init . --packageManager npm --no-gitInit --force
```

Note: `--force` allows init in non-empty dir. `--no-gitInit` because we already have git.

Expected: Creates `package.json`, `nuxt.config.ts`, `tsconfig.json`, `app.vue`, etc.

- [ ] **Step 2: Move `app.vue` to `app/app.vue`** (Nuxt 4 style)

```bash
mkdir -p app
mv app.vue app/app.vue 2>/dev/null || true
```

- [ ] **Step 3: Replace `nuxt.config.ts` with our config**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  compatibilityDate: '2026-05-03',
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  ssr: true,
  app: {
    head: {
      htmlAttrs: { lang: 'zh-TW' },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&family=JetBrains+Mono:wght@400;700&display=swap' },
      ],
    },
  },
  modules: [
    // additions in later tasks: '@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/i18n',
    // '@nuxt/content', '@vueuse/motion/nuxt', '@nuxtjs/seo', '@nuxt/image', '@nuxt/icon',
  ],
})
```

- [ ] **Step 4: Replace `app/app.vue` with placeholder using layout**

```vue
<!-- app/app.vue -->
<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
```

- [ ] **Step 5: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` populated, no errors.

- [ ] **Step 6: Smoke test dev server**

```bash
npm run dev
```

Expected: server boots at `http://localhost:3000`, shows Nuxt welcome page (since no pages yet, may show 404 — that's fine). Stop server with Ctrl-C.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts tsconfig.json app/
git commit -m "feat: scaffold Nuxt 3 with compatibilityVersion 4"
```

---

## Task 3: Install Tailwind CSS + design tokens

**Files:**
- Modify: `package.json` (deps via npm)
- Modify: `nuxt.config.ts` (add module)
- Create: `tailwind.config.ts`
- Create: `app/assets/css/tailwind.css`

- [ ] **Step 1: Install Tailwind module**

```bash
npm install -D @nuxtjs/tailwindcss
```

- [ ] **Step 2: Add module to `nuxt.config.ts`**

Edit `modules` array — add `'@nuxtjs/tailwindcss'` and add `css` config:

```ts
// nuxt.config.ts (relevant additions)
export default defineNuxtConfig({
  // ...existing config...
  modules: [
    '@nuxtjs/tailwindcss',
  ],
  css: ['~/assets/css/tailwind.css'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
    configPath: '~/tailwind.config.ts',
  },
})
```

- [ ] **Step 3: Create `tailwind.config.ts` with design tokens**

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/composables/**/*.ts',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './content/**/*.md',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          deep:     'hsl(var(--bg-deep))',
          base:     'hsl(var(--bg-base))',
          elevated: 'hsl(var(--bg-elevated))',
          glass:    'hsl(var(--bg-glass))',
        },
        accent: {
          glow:    'hsl(var(--accent-glow))',
          bright:  'hsl(var(--accent-bright))',
          deep:    'hsl(var(--accent-deep))',
        },
        fg: {
          primary:   'hsl(var(--fg-primary))',
          secondary: 'hsl(var(--fg-secondary))',
          muted:     'hsl(var(--fg-muted))',
        },
        // shadcn-vue token bridge (filled in Task 4)
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        ring: 'hsl(var(--ring))',
      },
      backgroundImage: {
        'gradient-hero':  'radial-gradient(ellipse at top, hsl(var(--accent-deep) / 0.4), transparent 70%)',
        'gradient-glow':  'linear-gradient(135deg, hsl(var(--accent-glow)) 0%, hsl(var(--accent-bright)) 100%)',
        'gradient-text':  'linear-gradient(90deg, #fff 0%, hsl(var(--accent-bright)) 100%)',
      },
      boxShadow: {
        'glow-sm':    '0 0 12px hsl(var(--accent-glow) / 0.4)',
        'glow':       '0 0 24px hsl(var(--accent-glow) / 0.5)',
        'glow-lg':    '0 0 48px hsl(var(--accent-glow) / 0.6)',
        'inner-glow': 'inset 0 0 16px hsl(var(--accent-glow) / 0.3)',
      },
      backdropBlur: { glass: '12px' },
      fontFamily: {
        display: ['"Noto Serif TC"', '"Noto Serif SC"', 'serif'],
        sans:    ['"Noto Sans TC"', '"Noto Sans SC"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'orbit':      'orbit 20s linear infinite',
        'particle':   'particle 8s ease-in-out infinite',
        'draw-line':  'drawLine 2s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 12px hsl(var(--accent-glow) / 0.4)' },
          '50%':      { boxShadow: '0 0 32px hsl(var(--accent-glow) / 0.8)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg) translateX(40px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(40px) rotate(-360deg)' },
        },
        particle: {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: '0.4' },
          '50%':      { transform: 'translateY(-20px) translateX(10px)', opacity: '1' },
        },
        drawLine: {
          'from': { strokeDashoffset: '1000' },
          'to':   { strokeDashoffset: '0' },
        },
      },
    },
  },
}
```

- [ ] **Step 4: Create `app/assets/css/tailwind.css`**

```css
/* app/assets/css/tailwind.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Project design tokens (HSL components, no hsl() wrapper) */
    --bg-deep:       222 65% 8%;
    --bg-base:       222 55% 11%;
    --bg-elevated:   222 45% 16%;
    --bg-glass:      222 50% 20% / 0.5;

    --accent-glow:   202 100% 62%;
    --accent-bright: 196 100% 75%;
    --accent-deep:   215 85% 45%;

    --fg-primary:    210 40% 98%;
    --fg-secondary:  215 25% 75%;
    --fg-muted:      215 20% 55%;

    --border-glow:   202 100% 62% / 0.25;
    --border-subtle: 222 30% 25%;

    /* shadcn-vue token bridge — point to project tokens */
    --background:           var(--bg-base);
    --foreground:           var(--fg-primary);
    --primary:              var(--accent-glow);
    --primary-foreground:   var(--bg-deep);
    --secondary:            var(--bg-elevated);
    --secondary-foreground: var(--fg-primary);
    --muted:                var(--bg-elevated);
    --muted-foreground:     var(--fg-muted);
    --accent:               var(--accent-glow);
    --accent-foreground:    var(--bg-deep);
    --destructive:          0 84% 60%;
    --destructive-foreground: 0 0% 98%;
    --card:                 var(--bg-elevated);
    --card-foreground:      var(--fg-primary);
    --popover:              var(--bg-elevated);
    --popover-foreground:   var(--fg-primary);
    --border:               var(--border-subtle);
    --input:                var(--border-subtle);
    --ring:                 var(--accent-glow);
    --radius:               0.5rem;
  }

  html, body {
    @apply bg-bg-base text-fg-primary font-sans antialiased;
    color-scheme: dark;
  }
}

@layer components {
  .glass {
    @apply bg-bg-glass backdrop-blur-glass border border-white/5;
  }
  .glass-card {
    @apply glass rounded-2xl shadow-glow-sm hover:shadow-glow transition-shadow duration-300;
  }
  .text-glow {
    @apply text-accent-bright;
    text-shadow: 0 0 8px hsl(var(--accent-glow) / 0.6);
  }
  .text-gradient {
    @apply bg-gradient-text bg-clip-text text-transparent;
  }
  .btn-glow {
    @apply relative inline-flex items-center justify-center rounded-full
           bg-gradient-glow text-bg-deep font-bold px-6 py-3
           shadow-glow hover:shadow-glow-lg transition-all duration-200
           hover:scale-[1.02] active:scale-[0.98];
  }
  .grid-tech {
    background-image:
      linear-gradient(hsl(var(--accent-glow) / 0.06) 1px, transparent 1px),
      linear-gradient(90deg, hsl(var(--accent-glow) / 0.06) 1px, transparent 1px);
    background-size: 48px 48px;
  }
  .container-tight {
    @apply mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 5: Smoke test**

```bash
npm run dev
```

Open `http://localhost:3000` — body should have dark background `#0d1b3a`. Stop server.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts tailwind.config.ts app/assets/
git commit -m "feat: add Tailwind with project design tokens (deep-space tech theme)"
```

---

## Task 4: Install shadcn-vue via shadcn-nuxt

**Files:**
- Modify: `package.json`
- Modify: `nuxt.config.ts`
- Create: `components.json`

- [ ] **Step 1: Install shadcn-nuxt module**

```bash
npm install -D shadcn-nuxt
```

- [ ] **Step 2: Add to `nuxt.config.ts` modules and configure**

```ts
// nuxt.config.ts (relevant additions)
modules: [
  '@nuxtjs/tailwindcss',
  'shadcn-nuxt',
],
shadcn: {
  prefix: '',
  componentDir: './app/components/ui',
},
```

- [ ] **Step 3: Initialize shadcn-vue CLI**

```bash
npx shadcn-vue@latest init
```

When prompted, accept defaults except:
- Style: `Default`
- Base color: `Slate`
- Components dir: `./app/components/ui`
- Tailwind config: `./tailwind.config.ts`
- Tailwind CSS: `./app/assets/css/tailwind.css`
- Use TypeScript: `Yes`

This creates `components.json` and may overwrite parts of `tailwind.config.ts`/`tailwind.css` — review the diff carefully.

- [ ] **Step 4: Restore our `tailwind.config.ts` and `tailwind.css` if shadcn overwrote them**

After init, run `git diff tailwind.config.ts app/assets/css/tailwind.css`. If shadcn removed our extensions, merge them back (keep both shadcn additions and our tokens). The shadcn CSS variables in `:root` should already match our bridge in Step 4 of Task 3 — keep ours.

- [ ] **Step 5: Add core shadcn components**

```bash
npx shadcn-vue@latest add button card sheet dropdown-menu input textarea label separator
```

Expected: Files in `app/components/ui/` (button/, card/, etc.).

- [ ] **Step 6: Smoke test by adding shadcn Button to a temp test page**

Create `app/pages/index.vue`:

```vue
<!-- app/pages/index.vue (temporary smoke test) -->
<script setup lang="ts">
import { Button } from '~/components/ui/button'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center grid-tech">
    <div class="text-center space-y-6">
      <h1 class="text-5xl font-display text-gradient">Infinity Agentic</h1>
      <p class="text-fg-secondary">無限智能 — 設計系統測試</p>
      <Button class="btn-glow">聯絡結盟</Button>
    </div>
  </div>
</template>
```

Run `npm run dev`. Visit `http://localhost:3000`. Expected: dark page, gradient title, glowing button. Stop server.

- [ ] **Step 7: Commit**

```bash
git add components.json app/components/ui app/pages/index.vue tailwind.config.ts app/assets/css/tailwind.css package.json package-lock.json nuxt.config.ts
git commit -m "feat: add shadcn-vue with deep-space theme overrides"
```

---

## Task 5: Configure i18n (zh-TW / zh-CN / en)

**Files:**
- Modify: `package.json`
- Modify: `nuxt.config.ts`
- Create: `i18n/locales/zh-TW.json`
- Create: `i18n/locales/zh-CN.json`
- Create: `i18n/locales/en.json`

- [ ] **Step 1: Install @nuxtjs/i18n**

```bash
npm install @nuxtjs/i18n@^9
```

- [ ] **Step 2: Add to `nuxt.config.ts`**

```ts
// nuxt.config.ts (relevant additions)
modules: [
  '@nuxtjs/tailwindcss',
  'shadcn-nuxt',
  '@nuxtjs/i18n',
],
i18n: {
  defaultLocale: 'zh-TW',
  strategy: 'prefix',
  langDir: 'locales',
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
},
```

- [ ] **Step 3: Create `i18n/locales/zh-TW.json`**

```json
{
  "site": {
    "name": "Infinity Agentic 無限智能",
    "tagline": "打造 AI/VR 開放生態合作平台",
    "company": "無限智能股份有限公司"
  },
  "nav": {
    "home": "首頁",
    "about": "關於我們",
    "platform": "開放平台",
    "solutions": "解決方案",
    "solutions_golf": "高爾夫",
    "solutions_ski": "滑雪",
    "solutions_vision": "兒童近視矯正",
    "partners": "合作加盟",
    "developers": "開發者",
    "investors": "投資人",
    "contact": "聯絡我們"
  },
  "cta": {
    "alliance": "聯絡結盟",
    "learn_platform": "了解平台",
    "contact": "立即聯繫",
    "request_deck": "索取 Pitch Deck",
    "become_partner": "成為合作夥伴"
  },
  "home": {
    "hero_title_1": "打造 AI/VR",
    "hero_title_2": "開放生態合作平台",
    "hero_subtitle": "徵求策略合作企業 · 國級/省級代理火熱召集",
    "problem_title": "市場痛點",
    "problem_subtitle": "AI/VR 眼鏡規格分歧，閉鎖應用軟體讓消費者重複付費",
    "solutions_title": "三大利基市場",
    "solutions_subtitle": "首發專注高消費力、高需求的專業場景",
    "ecosystem_title": "開放生態系",
    "ecosystem_subtitle": "硬體廠 · 軟體廠 · 醫療運動機構共生共榮",
    "aspiration_title": "成為 AI/VR 界的「高通」與「安卓」",
    "aspiration_subtitle": "建立跨品牌相容的標準規範"
  },
  "footer": {
    "sitemap": "網站地圖",
    "contact": "聯絡資訊",
    "legal": "法律",
    "privacy": "隱私政策",
    "terms": "使用條款",
    "copyright": "© 2026 無限智能股份有限公司. All rights reserved."
  },
  "lang": {
    "switch": "語言"
  }
}
```

- [ ] **Step 4: Create `i18n/locales/zh-CN.json`** (simplified Chinese)

```json
{
  "site": {
    "name": "Infinity Agentic 无限智能",
    "tagline": "打造 AI/VR 开放生态合作平台",
    "company": "无限智能股份有限公司"
  },
  "nav": {
    "home": "首页",
    "about": "关于我们",
    "platform": "开放平台",
    "solutions": "解决方案",
    "solutions_golf": "高尔夫",
    "solutions_ski": "滑雪",
    "solutions_vision": "儿童近视矫正",
    "partners": "合作加盟",
    "developers": "开发者",
    "investors": "投资人",
    "contact": "联系我们"
  },
  "cta": {
    "alliance": "联系结盟",
    "learn_platform": "了解平台",
    "contact": "立即联系",
    "request_deck": "索取 Pitch Deck",
    "become_partner": "成为合作伙伴"
  },
  "home": {
    "hero_title_1": "打造 AI/VR",
    "hero_title_2": "开放生态合作平台",
    "hero_subtitle": "征求策略合作企业 · 国级/省级代理火热召集",
    "problem_title": "市场痛点",
    "problem_subtitle": "AI/VR 眼镜规格分歧，闭锁应用软件让消费者重复付费",
    "solutions_title": "三大利基市场",
    "solutions_subtitle": "首发专注高消费力、高需求的专业场景",
    "ecosystem_title": "开放生态系",
    "ecosystem_subtitle": "硬件厂 · 软件厂 · 医疗运动机构共生共荣",
    "aspiration_title": "成为 AI/VR 界的「高通」与「安卓」",
    "aspiration_subtitle": "建立跨品牌相容的标准规范"
  },
  "footer": {
    "sitemap": "网站地图",
    "contact": "联系信息",
    "legal": "法律",
    "privacy": "隐私政策",
    "terms": "使用条款",
    "copyright": "© 2026 无限智能股份有限公司. All rights reserved."
  },
  "lang": {
    "switch": "语言"
  }
}
```

- [ ] **Step 5: Create `i18n/locales/en.json`**

```json
{
  "site": {
    "name": "Infinity Agentic",
    "tagline": "Open Platform for AI/VR Strategic Alliances",
    "company": "Infinity Agentic Inc."
  },
  "nav": {
    "home": "Home",
    "about": "About",
    "platform": "Platform",
    "solutions": "Solutions",
    "solutions_golf": "Golf",
    "solutions_ski": "Ski",
    "solutions_vision": "Children Vision",
    "partners": "Partners",
    "developers": "Developers",
    "investors": "Investors",
    "contact": "Contact"
  },
  "cta": {
    "alliance": "Form an Alliance",
    "learn_platform": "Learn About the Platform",
    "contact": "Contact Us",
    "request_deck": "Request Pitch Deck",
    "become_partner": "Become a Partner"
  },
  "home": {
    "hero_title_1": "Building the AI/VR",
    "hero_title_2": "Open Ecosystem Platform",
    "hero_subtitle": "Seeking strategic partners · National & regional agents",
    "problem_title": "Market Pain Points",
    "problem_subtitle": "Fragmented AI/VR specs and locked-in software make consumers pay twice",
    "solutions_title": "Three Niche Markets",
    "solutions_subtitle": "Launching with high-value professional verticals",
    "ecosystem_title": "Open Ecosystem",
    "ecosystem_subtitle": "Hardware makers · Software developers · Sports & medical institutions",
    "aspiration_title": "The Qualcomm & Android of AI/VR",
    "aspiration_subtitle": "Establishing cross-brand interoperability standards"
  },
  "footer": {
    "sitemap": "Sitemap",
    "contact": "Contact",
    "legal": "Legal",
    "privacy": "Privacy Policy",
    "terms": "Terms of Use",
    "copyright": "© 2026 Infinity Agentic Inc. All rights reserved."
  },
  "lang": {
    "switch": "Language"
  }
}
```

- [ ] **Step 6: Smoke test routing**

Update `app/pages/index.vue`:

```vue
<script setup lang="ts">
import { Button } from '~/components/ui/button'
const { t, locale, locales } = useI18n()
</script>

<template>
  <div class="min-h-screen flex items-center justify-center grid-tech">
    <div class="text-center space-y-6">
      <h1 class="text-5xl font-display text-gradient">{{ t('site.name') }}</h1>
      <p class="text-fg-secondary">{{ t('site.tagline') }}</p>
      <p class="text-fg-muted text-sm">Current locale: {{ locale }}</p>
      <Button class="btn-glow">{{ t('cta.alliance') }}</Button>
    </div>
  </div>
</template>
```

Run `npm run dev`. Visit:
- `http://localhost:3000/zh-TW/` → Traditional Chinese title
- `http://localhost:3000/zh-CN/` → Simplified Chinese
- `http://localhost:3000/en/` → English
- `http://localhost:3000/` → redirects to one of the above based on browser

Stop server.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts i18n/ app/pages/index.vue
git commit -m "feat: add @nuxtjs/i18n with zh-TW/zh-CN/en prefix routing"
```

---

## Task 6: Add @nuxt/content v3 with collection schema

**Files:**
- Modify: `package.json`
- Modify: `nuxt.config.ts`
- Create: `content.config.ts`
- Create: `content/zh-TW/solutions/golf.md` (placeholder)
- Create: `content/zh-CN/solutions/golf.md` (placeholder)
- Create: `content/en/solutions/golf.md` (placeholder)

- [ ] **Step 1: Install @nuxt/content**

```bash
npm install @nuxt/content@^3
```

- [ ] **Step 2: Add to `nuxt.config.ts`**

```ts
// nuxt.config.ts (relevant additions)
modules: [
  '@nuxtjs/tailwindcss',
  'shadcn-nuxt',
  '@nuxtjs/i18n',
  '@nuxt/content',
],
```

- [ ] **Step 3: Create `content.config.ts`**

```ts
// content.config.ts
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const featureSchema = z.object({
  icon: z.string(),
  title: z.string(),
  desc: z.string(),
})

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        hero_image: z.string().optional(),
        features: z.array(featureSchema).optional(),
      }),
    }),
  },
})
```

- [ ] **Step 4: Create three locale stubs for golf**

```md
<!-- content/zh-TW/solutions/golf.md -->
---
title: 高爾夫智能訓練
description: AI 即時揮桿分析 + VR 沉浸式練習場
hero_image: /images/golf-hero.jpg
features:
  - icon: target
    title: 揮桿軌跡分析
    desc: 毫秒級 AI 動作捕捉，給出即時改進建議
  - icon: vr
    title: 全球名場虛擬重現
    desc: 在家即可體驗 St Andrews、Pebble Beach
  - icon: trend-up
    title: 個人化進步追蹤
    desc: 累積數據生成長期表現報表
---

## 為何選擇我們

高爾夫是技術精度與心理穩定並重的運動。傳統訓練需要昂貴的教練時間與練習場地。Infinity Agentic 的 AI/VR 整合方案，讓你在家就能獲得專業教練等級的反饋。

## 技術亮點

- 開源 LMM 大運動模型，跨品牌硬體相容
- 與運動科學機構合作驗證
- 雲端同步，隨時回顧訓練紀錄
```

```md
<!-- content/zh-CN/solutions/golf.md -->
---
title: 高尔夫智能训练
description: AI 实时挥杆分析 + VR 沉浸式练习场
hero_image: /images/golf-hero.jpg
features:
  - icon: target
    title: 挥杆轨迹分析
    desc: 毫秒级 AI 动作捕捉，给出实时改进建议
  - icon: vr
    title: 全球名场虚拟重现
    desc: 在家即可体验 St Andrews、Pebble Beach
  - icon: trend-up
    title: 个人化进步追踪
    desc: 累积数据生成长期表现报表
---

## 为何选择我们

高尔夫是技术精度与心理稳定并重的运动。传统训练需要昂贵的教练时间与练习场地。Infinity Agentic 的 AI/VR 整合方案，让你在家就能获得专业教练等级的反馈。

## 技术亮点

- 开源 LMM 大运动模型，跨品牌硬件相容
- 与运动科学机构合作验证
- 云端同步，随时回顾训练记录
```

```md
<!-- content/en/solutions/golf.md -->
---
title: Golf AI Training
description: Real-time AI swing analysis + VR immersive driving range
hero_image: /images/golf-hero.jpg
features:
  - icon: target
    title: Swing Trajectory Analysis
    desc: Millisecond-precision AI motion capture with instant feedback
  - icon: vr
    title: World-Class Course Recreation
    desc: Play St Andrews and Pebble Beach from home
  - icon: trend-up
    title: Personalized Progress Tracking
    desc: Long-term performance reports from accumulated data
---

## Why Us

Golf demands technical precision and mental stability. Traditional training requires expensive coach time and range fees. Infinity Agentic's AI/VR integration brings professional-grade feedback to your home.

## Technical Highlights

- Open-source LMM (Large Motion Model), cross-brand hardware compatible
- Validated with sports science institutions
- Cloud-synced for anytime training playback
```

- [ ] **Step 5: Smoke test content query**

Replace `app/pages/index.vue` with:

```vue
<script setup lang="ts">
import { Button } from '~/components/ui/button'
const { t, locale } = useI18n()

const { data: golf } = await useAsyncData(
  () => `golf-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/solutions/golf`).first()
)
</script>

<template>
  <div class="min-h-screen p-12 grid-tech">
    <div class="container-tight space-y-8">
      <h1 class="text-5xl font-display text-gradient">{{ t('site.name') }}</h1>
      <p class="text-fg-secondary">{{ t('site.tagline') }}</p>
      <Button class="btn-glow">{{ t('cta.alliance') }}</Button>
      <hr class="border-border-subtle" />
      <h2 class="text-3xl text-glow">{{ golf?.title }}</h2>
      <p>{{ golf?.description }}</p>
      <ul class="space-y-2">
        <li v-for="f in golf?.features" :key="f.title" class="glass-card p-4">
          <strong>{{ f.title }}</strong>: {{ f.desc }}
        </li>
      </ul>
    </div>
  </div>
</template>
```

Run `npm run dev`. Visit `/zh-TW/`, `/zh-CN/`, `/en/`. Each should render the localized golf content.

If `queryCollection` errors with module not found, restart dev server (Nuxt Content needs initial sqlite setup).

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts content.config.ts content/ app/pages/index.vue
git commit -m "feat: add @nuxt/content v3 with three-locale collection"
```

---

## Task 7: Add @vueuse/motion for animation

**Files:**
- Modify: `package.json`
- Modify: `nuxt.config.ts`

- [ ] **Step 1: Install module**

```bash
npm install @vueuse/motion
```

- [ ] **Step 2: Register in `nuxt.config.ts`**

```ts
// nuxt.config.ts
modules: [
  '@nuxtjs/tailwindcss',
  'shadcn-nuxt',
  '@nuxtjs/i18n',
  '@nuxt/content',
  '@vueuse/motion/nuxt',
],
```

- [ ] **Step 3: Smoke test motion directive**

Edit `app/pages/index.vue` — add `v-motion` to the title:

```vue
<h1
  v-motion
  :initial="{ opacity: 0, y: 30 }"
  :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
  class="text-5xl font-display text-gradient"
>{{ t('site.name') }}</h1>
```

Run `npm run dev` → reload page → title should fade up.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts app/pages/index.vue
git commit -m "feat: add @vueuse/motion for scroll-reveal animations"
```

---

## Task 8: Add SEO, image, icon modules

**Files:**
- Modify: `package.json`
- Modify: `nuxt.config.ts`
- Create: `public/robots.txt`
- Create: `public/og-default.png` (placeholder — see step 5)

- [ ] **Step 1: Install modules**

```bash
npm install @nuxtjs/seo @nuxt/image @nuxt/icon
```

- [ ] **Step 2: Update `nuxt.config.ts`**

```ts
// nuxt.config.ts (modules and site config)
modules: [
  '@nuxtjs/tailwindcss',
  'shadcn-nuxt',
  '@nuxtjs/i18n',
  '@nuxt/content',
  '@vueuse/motion/nuxt',
  '@nuxtjs/seo',
  '@nuxt/image',
  '@nuxt/icon',
],
site: {
  url: 'https://infiag.com',
  name: 'Infinity Agentic 無限智能',
  description: '打造 AI/VR 開放生態合作平台',
  defaultLocale: 'zh-TW',
},
icon: {
  serverBundle: 'local',
},
image: {
  format: ['webp', 'avif', 'jpg'],
},
```

- [ ] **Step 3: Create `public/robots.txt`**

```
User-agent: *
Allow: /
Sitemap: https://infiag.com/sitemap.xml
```

- [ ] **Step 4: Smoke test sitemap**

Run `npm run dev`. Visit `http://localhost:3000/sitemap.xml`. Expected: XML listing all generated routes including hreflang alternates.

- [ ] **Step 5: Placeholder OG image**

For now copy one of the banner crops as default OG:

```bash
cp "ref/ChatGPT Image 2026年5月3日 上午11_47_20.png" public/og-default.png
```

(Real OG should be 1200×630; this is placeholder for now.)

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json nuxt.config.ts public/
git commit -m "feat: add SEO, image, icon modules with site config"
```

---

## Task 9: useMailto composable

**Files:**
- Create: `app/composables/useMailto.ts`

- [ ] **Step 1: Create composable**

```ts
// app/composables/useMailto.ts
export interface MailtoOptions {
  subject?: string
  body?: string
  cc?: string
  bcc?: string
}

const CONTACT_EMAIL = 'luke@infiag.com'

export function useMailto() {
  function buildMailto(options: MailtoOptions = {}): string {
    const params = new URLSearchParams()
    if (options.subject) params.set('subject', options.subject)
    if (options.body) params.set('body', options.body)
    if (options.cc) params.set('cc', options.cc)
    if (options.bcc) params.set('bcc', options.bcc)
    const qs = params.toString()
    return `mailto:${CONTACT_EMAIL}${qs ? '?' + qs : ''}`
  }

  return {
    contactEmail: CONTACT_EMAIL,
    buildMailto,
    /** Common preset: alliance enquiry */
    alliance: (locale: string) => buildMailto({
      subject: locale === 'en' ? 'Strategic Alliance Enquiry' : '策略合作意向',
      body: locale === 'en'
        ? 'Hello Infinity Agentic team,\n\nWe are interested in forming a strategic alliance.\n\nCompany:\nName:\nRole:\nProposed scope:\n\nThank you.'
        : '您好，我們希望了解策略合作機會。\n\n公司：\n姓名：\n職位：\n合作方向：\n\n謝謝。',
    }),
    /** Common preset: investor pitch deck request */
    pitchDeck: (locale: string) => buildMailto({
      subject: locale === 'en' ? 'Pitch Deck Request' : 'Pitch Deck 索取',
      body: locale === 'en'
        ? 'Hello,\n\nI would like to request the latest pitch deck.\n\nName:\nFirm:\nFund stage:\n\nThank you.'
        : '您好，希望索取最新的 Pitch Deck。\n\n姓名：\n公司：\n投資階段：\n\n謝謝。',
    }),
    /** Common preset: regional agent application */
    agent: (locale: string) => buildMailto({
      subject: locale === 'en' ? 'Regional Agent Application' : '國省級代理申請',
      body: locale === 'en'
        ? 'Hello,\n\nWe would like to apply for regional agent rights.\n\nRegion:\nCompany:\nName:\nContact:\n\nThank you.'
        : '您好，我們希望申請地區代理權。\n\n申請地區：\n公司：\n姓名：\n聯絡：\n\n謝謝。',
    }),
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/composables/useMailto.ts
git commit -m "feat: add useMailto composable with B2B presets"
```

---

## Task 10: usePageSeo composable

**Files:**
- Create: `app/composables/usePageSeo.ts`

- [ ] **Step 1: Create composable**

```ts
// app/composables/usePageSeo.ts
interface PageSeoOptions {
  title?: string | null
  description?: string | null
  image?: string | null
}

export function usePageSeo(options: PageSeoOptions = {}) {
  const { t } = useI18n()
  const siteName = t('site.name')
  const siteTagline = t('site.tagline')

  const title = options.title ?? siteTagline
  const description = options.description ?? siteTagline
  const image = options.image ?? '/og-default.png'

  useSeoMeta({
    title: () => `${title} | ${siteName}`,
    description: () => description,
    ogTitle: () => `${title} | ${siteName}`,
    ogDescription: () => description,
    ogImage: () => image,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: () => `${title} | ${siteName}`,
    twitterDescription: () => description,
    twitterImage: () => image,
  })
}
```

- [ ] **Step 2: Commit**

```bash
git add app/composables/usePageSeo.ts
git commit -m "feat: add usePageSeo composable for unified meta tags"
```

---

## Task 11: Layout components — AppHeader

**Files:**
- Create: `app/components/layout/LangSwitcher.vue`
- Create: `app/components/layout/NavMenu.vue`
- Create: `app/components/layout/MobileDrawer.vue`
- Create: `app/components/layout/AppHeader.vue`

- [ ] **Step 1: Create `LangSwitcher.vue`**

```vue
<!-- app/components/layout/LangSwitcher.vue -->
<script setup lang="ts">
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
} from '~/components/ui/dropdown-menu'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const currentLabel = computed(() => {
  const found = locales.value.find(l => (typeof l === 'object' ? l.code : l) === locale.value)
  return typeof found === 'object' ? found?.code.toUpperCase() : locale.value.toUpperCase()
})
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger
      class="px-3 py-1.5 rounded-md text-sm font-mono uppercase
             text-fg-secondary hover:text-accent-bright
             border border-border-subtle hover:border-accent-glow/50
             transition-colors"
    >
      {{ currentLabel }}
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="glass">
      <DropdownMenuItem
        v-for="loc in locales"
        :key="typeof loc === 'object' ? loc.code : loc"
        as-child
      >
        <NuxtLink
          :to="switchLocalePath(typeof loc === 'object' ? loc.code : loc)"
          class="flex items-center gap-2 px-3 py-2 cursor-pointer"
        >
          <span class="font-mono text-xs uppercase">{{ typeof loc === 'object' ? loc.code : loc }}</span>
          <span>{{ typeof loc === 'object' ? loc.name : loc }}</span>
        </NuxtLink>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

- [ ] **Step 2: Create `NavMenu.vue`** (desktop nav)

```vue
<!-- app/components/layout/NavMenu.vue -->
<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const items = computed(() => [
  { to: localePath('/about'),       label: t('nav.about') },
  { to: localePath('/platform'),    label: t('nav.platform') },
  { to: localePath('/solutions'),   label: t('nav.solutions') },
  { to: localePath('/partners'),    label: t('nav.partners') },
  { to: localePath('/developers'),  label: t('nav.developers') },
  { to: localePath('/investors'),   label: t('nav.investors') },
  { to: localePath('/contact'),     label: t('nav.contact') },
])
</script>

<template>
  <nav class="hidden lg:flex items-center gap-1">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="px-3 py-2 text-sm text-fg-secondary hover:text-accent-bright
             transition-colors relative
             after:absolute after:left-3 after:right-3 after:bottom-1
             after:h-px after:bg-accent-glow after:scale-x-0
             hover:after:scale-x-100 after:transition-transform"
      active-class="text-accent-bright after:scale-x-100"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>
```

- [ ] **Step 3: Create `MobileDrawer.vue`**

```vue
<!-- app/components/layout/MobileDrawer.vue -->
<script setup lang="ts">
import {
  Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle,
} from '~/components/ui/sheet'

const { t } = useI18n()
const localePath = useLocalePath()
const open = ref(false)

const items = computed(() => [
  { to: localePath('/'),            label: t('nav.home') },
  { to: localePath('/about'),       label: t('nav.about') },
  { to: localePath('/platform'),    label: t('nav.platform') },
  { to: localePath('/solutions'),   label: t('nav.solutions') },
  { to: localePath('/partners'),    label: t('nav.partners') },
  { to: localePath('/developers'),  label: t('nav.developers') },
  { to: localePath('/investors'),   label: t('nav.investors') },
  { to: localePath('/contact'),     label: t('nav.contact') },
])
</script>

<template>
  <Sheet v-model:open="open">
    <SheetTrigger
      class="lg:hidden p-2 rounded-md text-fg-primary
             hover:bg-bg-elevated transition-colors"
      aria-label="Open menu"
    >
      <Icon name="lucide:menu" class="w-6 h-6" />
    </SheetTrigger>
    <SheetContent side="right" class="bg-bg-base border-border-subtle">
      <SheetHeader>
        <SheetTitle class="text-glow">{{ t('site.name') }}</SheetTitle>
      </SheetHeader>
      <nav class="mt-8 flex flex-col gap-1">
        <NuxtLink
          v-for="item in items"
          :key="item.to"
          :to="item.to"
          class="px-4 py-3 rounded-lg text-fg-secondary hover:text-accent-bright
                 hover:bg-bg-elevated transition-colors"
          active-class="text-accent-bright bg-bg-elevated"
          @click="open = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </SheetContent>
  </Sheet>
</template>
```

- [ ] **Step 4: Create `AppHeader.vue`**

```vue
<!-- app/components/layout/AppHeader.vue -->
<script setup lang="ts">
import { Button } from '~/components/ui/button'
import { useScroll } from '@vueuse/core'

const { t } = useI18n()
const localePath = useLocalePath()
const { y } = useScroll(import.meta.client ? window : null)
const scrolled = computed(() => y.value > 80)
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled
      ? 'glass border-b border-border-subtle py-2'
      : 'bg-transparent py-4'"
  >
    <div class="container-tight flex items-center justify-between gap-4">
      <NuxtLink :to="localePath('/')" class="flex items-center gap-3 group">
        <span class="text-2xl font-display text-glow group-hover:text-accent-bright transition-colors">∞</span>
        <span class="font-display font-bold text-lg hidden sm:inline">
          {{ t('site.name') }}
        </span>
      </NuxtLink>

      <NavMenu />

      <div class="flex items-center gap-2">
        <NuxtLink :to="localePath('/contact')" class="hidden sm:inline-flex">
          <Button class="btn-glow text-sm py-2 px-4">
            {{ t('cta.contact') }}
          </Button>
        </NuxtLink>
        <LangSwitcher />
        <MobileDrawer />
      </div>
    </div>
  </header>
</template>
```

- [ ] **Step 5: Commit**

```bash
git add app/components/layout/
git commit -m "feat: add AppHeader with nav menu, lang switcher, mobile drawer"
```

---

## Task 12: Layout components — AppFooter

**Files:**
- Create: `app/components/layout/AppFooter.vue`

- [ ] **Step 1: Create AppFooter**

```vue
<!-- app/components/layout/AppFooter.vue -->
<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { contactEmail } = useMailto()

const sitemap = computed(() => [
  { to: localePath('/about'),       label: t('nav.about') },
  { to: localePath('/platform'),    label: t('nav.platform') },
  { to: localePath('/solutions'),   label: t('nav.solutions') },
  { to: localePath('/partners'),    label: t('nav.partners') },
  { to: localePath('/developers'),  label: t('nav.developers') },
  { to: localePath('/investors'),   label: t('nav.investors') },
  { to: localePath('/contact'),     label: t('nav.contact') },
])

const legal = computed(() => [
  { to: '#', label: t('footer.privacy') },
  { to: '#', label: t('footer.terms') },
])
</script>

<template>
  <footer class="mt-24 border-t border-border-subtle bg-bg-deep">
    <div class="container-tight py-16">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
        <!-- Brand -->
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="text-3xl font-display text-glow">∞</span>
            <span class="font-display font-bold">{{ t('site.name') }}</span>
          </div>
          <p class="text-fg-secondary text-sm leading-relaxed">{{ t('site.tagline') }}</p>
        </div>

        <!-- Sitemap -->
        <div>
          <h4 class="font-display font-bold mb-4 text-fg-primary">{{ t('footer.sitemap') }}</h4>
          <ul class="space-y-2">
            <li v-for="item in sitemap" :key="item.to">
              <NuxtLink :to="item.to" class="text-sm text-fg-secondary hover:text-accent-bright transition-colors">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h4 class="font-display font-bold mb-4 text-fg-primary">{{ t('footer.contact') }}</h4>
          <ul class="space-y-2 text-sm text-fg-secondary">
            <li>
              <a :href="`mailto:${contactEmail}`" class="hover:text-accent-bright transition-colors">
                {{ contactEmail }}
              </a>
            </li>
            <li class="font-mono text-xs">BSE#91 營銷第一組</li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-display font-bold mb-4 text-fg-primary">{{ t('footer.legal') }}</h4>
          <ul class="space-y-2">
            <li v-for="item in legal" :key="item.label">
              <NuxtLink :to="item.to" class="text-sm text-fg-secondary hover:text-accent-bright transition-colors">
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 pt-8 border-t border-border-subtle">
        <p class="text-xs text-fg-muted text-center">{{ t('footer.copyright') }}</p>
      </div>
    </div>
  </footer>
</template>
```

- [ ] **Step 2: Commit**

```bash
git add app/components/layout/AppFooter.vue
git commit -m "feat: add AppFooter with 4-column sitemap"
```

---

## Task 13: Default layout

**Files:**
- Create: `app/layouts/default.vue`

- [ ] **Step 1: Create layout**

```vue
<!-- app/layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col bg-bg-base text-fg-primary">
    <AppHeader />
    <main class="flex-1 pt-20">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
```

- [ ] **Step 2: Smoke test layout**

Run `npm run dev`. Visit `/zh-TW/`. Expected:
- Sticky header with logo, nav (hidden < lg), CTA, lang switcher, hamburger (< lg)
- Footer at bottom with 4 columns
- Header turns glass on scroll past 80px

Stop server.

- [ ] **Step 3: Commit**

```bash
git add app/layouts/default.vue
git commit -m "feat: wire AppHeader and AppFooter into default layout"
```

---

## Task 14: Section components — SectionContainer + CTASection

**Files:**
- Create: `app/components/sections/SectionContainer.vue`
- Create: `app/components/sections/CTASection.vue`

- [ ] **Step 1: Create `SectionContainer.vue`**

```vue
<!-- app/components/sections/SectionContainer.vue -->
<script setup lang="ts">
defineProps<{
  title?: string
  subtitle?: string
  variant?: 'default' | 'tight' | 'wide' | 'tech'
}>()
</script>

<template>
  <section
    class="py-20 lg:py-28"
    :class="variant === 'tech' ? 'grid-tech' : ''"
  >
    <div
      class="mx-auto px-4 sm:px-6 lg:px-8"
      :class="{
        'max-w-7xl': !variant || variant === 'default' || variant === 'tech',
        'max-w-5xl': variant === 'tight',
        'max-w-screen-2xl': variant === 'wide',
      }"
    >
      <div v-if="title || subtitle" class="text-center mb-12 lg:mb-16 space-y-4">
        <h2
          v-if="title"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
          class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gradient"
        >
          {{ title }}
        </h2>
        <p
          v-if="subtitle"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 150 } }"
          class="text-fg-secondary text-base md:text-lg max-w-2xl mx-auto"
        >
          {{ subtitle }}
        </p>
      </div>
      <slot />
    </div>
  </section>
</template>
```

- [ ] **Step 2: Create `CTASection.vue`**

```vue
<!-- app/components/sections/CTASection.vue -->
<script setup lang="ts">
import { Button } from '~/components/ui/button'

defineProps<{
  title: string
  subtitle?: string
  ctaLabel: string
  ctaHref: string
}>()
</script>

<template>
  <section class="py-20 lg:py-28">
    <div class="container-tight">
      <div
        class="glass-card p-12 lg:p-16 text-center bg-gradient-hero relative overflow-hidden"
      >
        <div class="absolute inset-0 grid-tech opacity-30 pointer-events-none" />
        <div class="relative space-y-6">
          <h3
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
            class="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-glow"
          >
            {{ title }}
          </h3>
          <p v-if="subtitle" class="text-fg-secondary text-lg max-w-2xl mx-auto">
            {{ subtitle }}
          </p>
          <a :href="ctaHref" class="inline-block">
            <Button class="btn-glow text-base px-8 py-4">{{ ctaLabel }}</Button>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 3: Commit**

```bash
git add app/components/sections/
git commit -m "feat: add SectionContainer and CTASection layout primitives"
```

---

## Task 15: Section components — FeatureCard + SolutionCard + StatNumber

**Files:**
- Create: `app/components/sections/FeatureCard.vue`
- Create: `app/components/sections/SolutionCard.vue`
- Create: `app/components/sections/StatNumber.vue`

- [ ] **Step 1: Create `FeatureCard.vue`**

```vue
<!-- app/components/sections/FeatureCard.vue -->
<script setup lang="ts">
defineProps<{
  icon?: string
  title: string
  description: string
}>()
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: 30 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 600 } }"
    class="glass-card p-6 lg:p-8 space-y-4 group"
  >
    <div
      v-if="icon"
      class="w-12 h-12 rounded-xl bg-bg-elevated flex items-center justify-center
             border border-border-subtle group-hover:border-accent-glow/50
             group-hover:shadow-glow-sm transition-all"
    >
      <Icon :name="`lucide:${icon}`" class="w-6 h-6 text-accent-bright" />
    </div>
    <h3 class="text-xl font-display font-bold">{{ title }}</h3>
    <p class="text-fg-secondary leading-relaxed">{{ description }}</p>
  </div>
</template>
```

- [ ] **Step 2: Create `SolutionCard.vue`** (large hero-style card for 3 niches)

```vue
<!-- app/components/sections/SolutionCard.vue -->
<script setup lang="ts">
defineProps<{
  to: string
  icon: string
  title: string
  tagline: string
  description: string
}>()
</script>

<template>
  <NuxtLink
    :to="to"
    v-motion
    :initial="{ opacity: 0, y: 40 }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration: 700 } }"
    class="group relative block overflow-hidden rounded-2xl
           glass border border-border-subtle hover:border-accent-glow/50
           transition-all duration-500
           hover:shadow-glow hover:-translate-y-1"
  >
    <div class="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div class="relative p-8 lg:p-10 space-y-6">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl bg-bg-elevated flex items-center justify-center
                    border border-accent-glow/30 group-hover:shadow-glow transition-shadow">
          <Icon :name="`lucide:${icon}`" class="w-7 h-7 text-accent-bright" />
        </div>
        <span class="font-mono text-xs uppercase text-accent-bright">{{ tagline }}</span>
      </div>
      <h3 class="text-2xl lg:text-3xl font-display font-bold group-hover:text-glow transition-colors">
        {{ title }}
      </h3>
      <p class="text-fg-secondary leading-relaxed">{{ description }}</p>
      <div class="flex items-center gap-2 text-accent-bright text-sm font-medium pt-2
                  group-hover:gap-3 transition-all">
        <span>了解更多</span>
        <Icon name="lucide:arrow-right" class="w-4 h-4" />
      </div>
    </div>
  </NuxtLink>
</template>
```

- [ ] **Step 3: Create `StatNumber.vue`** (animated counter)

```vue
<!-- app/components/sections/StatNumber.vue -->
<script setup lang="ts">
import { useTransition, TransitionPresets, useElementVisibility } from '@vueuse/core'

const props = defineProps<{
  value: number
  label: string
  suffix?: string
  prefix?: string
}>()

const target = ref(0)
const root = ref<HTMLElement | null>(null)
const visible = useElementVisibility(root)
const animated = useTransition(target, {
  duration: 1500,
  transition: TransitionPresets.easeOutCubic,
})

watchOnce(visible, (v) => {
  if (v) target.value = props.value
})
</script>

<template>
  <div ref="root" class="text-center space-y-2">
    <div class="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-glow">
      {{ prefix ?? '' }}{{ Math.round(animated) }}{{ suffix ?? '' }}
    </div>
    <div class="text-fg-secondary text-sm uppercase tracking-wider">{{ label }}</div>
  </div>
</template>
```

- [ ] **Step 4: Commit**

```bash
git add app/components/sections/
git commit -m "feat: add FeatureCard, SolutionCard, StatNumber section components"
```

---

## Task 16: Hero components — HeroParticles + InfinityLogoSVG

**Files:**
- Create: `app/components/hero/HeroParticles.vue`
- Create: `app/components/hero/InfinityLogoSVG.vue`
- Create: `app/components/hero/HeroBanner.vue`

- [ ] **Step 1: Create `HeroParticles.vue`** (lightweight canvas, ~3KB)

```vue
<!-- app/components/hero/HeroParticles.vue -->
<script setup lang="ts">
const props = withDefaults(defineProps<{
  count?: number
  color?: string
}>(), {
  count: 60,
  color: '#4dd0ff',
})

const canvas = ref<HTMLCanvasElement | null>(null)
let raf = 0

interface Particle {
  x: number; y: number; vx: number; vy: number; r: number; a: number
}

function start() {
  if (!canvas.value) return
  const c = canvas.value
  const ctx = c.getContext('2d')
  if (!ctx) return

  const dpr = window.devicePixelRatio || 1
  function resize() {
    if (!c) return
    c.width = c.clientWidth * dpr
    c.height = c.clientHeight * dpr
  }
  resize()
  window.addEventListener('resize', resize)

  const particles: Particle[] = Array.from({ length: props.count }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.5,
    a: Math.random() * 0.5 + 0.2,
  }))

  function tick() {
    if (!ctx || !c) return
    ctx.clearRect(0, 0, c.width, c.height)
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0 || p.x > c.width) p.vx *= -1
      if (p.y < 0 || p.y > c.height) p.vy *= -1
      ctx.beginPath()
      ctx.fillStyle = `rgba(77, 208, 255, ${p.a})`
      ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2)
      ctx.fill()
    }
    raf = requestAnimationFrame(tick)
  }
  tick()
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  start()
})
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <canvas ref="canvas" class="absolute inset-0 w-full h-full pointer-events-none" />
</template>
```

- [ ] **Step 2: Create `InfinityLogoSVG.vue`** (animated stroke draw)

```vue
<!-- app/components/hero/InfinityLogoSVG.vue -->
<script setup lang="ts">
withDefaults(defineProps<{ size?: number; animated?: boolean }>(), {
  size: 120,
  animated: true,
})
</script>

<template>
  <svg
    :width="size"
    :height="size / 2"
    viewBox="0 0 200 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    class="overflow-visible"
  >
    <defs>
      <linearGradient id="infGlow" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="hsl(var(--accent-glow))" />
        <stop offset="100%" stop-color="hsl(var(--accent-bright))" />
      </linearGradient>
      <filter id="infBlur">
        <feGaussianBlur stdDeviation="3" />
      </filter>
    </defs>
    <!-- Glow underlay -->
    <path
      d="M50,50 C50,30 70,30 100,50 C130,70 150,70 150,50 C150,30 130,30 100,50 C70,70 50,70 50,50 Z"
      stroke="url(#infGlow)"
      stroke-width="6"
      filter="url(#infBlur)"
      opacity="0.6"
    />
    <!-- Main stroke (animated) -->
    <path
      d="M50,50 C50,30 70,30 100,50 C130,70 150,70 150,50 C150,30 130,30 100,50 C70,70 50,70 50,50 Z"
      stroke="url(#infGlow)"
      stroke-width="3"
      stroke-linecap="round"
      stroke-dasharray="400"
      :class="animated ? 'animate-draw-line' : ''"
      :stroke-dashoffset="animated ? undefined : 0"
    />
  </svg>
</template>
```

- [ ] **Step 3: Create `HeroBanner.vue`** (full-width hero used on home page)

```vue
<!-- app/components/hero/HeroBanner.vue -->
<script setup lang="ts">
import { Button } from '~/components/ui/button'

defineProps<{
  title1: string
  title2: string
  subtitle?: string
  primaryCtaLabel: string
  primaryCtaHref: string
  secondaryCtaLabel?: string
  secondaryCtaTo?: string
  backgroundImage?: string
}>()
</script>

<template>
  <section class="relative min-h-[80vh] lg:min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
    <!-- Background image (banner crop) -->
    <div
      v-if="backgroundImage"
      class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    />
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-gradient-to-b from-bg-deep/80 via-bg-base/60 to-bg-base" />
    <!-- Particle layer -->
    <HeroParticles class="absolute inset-0" />
    <!-- Tech grid -->
    <div class="absolute inset-0 grid-tech opacity-40" />

    <!-- Content -->
    <div class="relative container-tight text-center space-y-8">
      <div class="flex justify-center">
        <InfinityLogoSVG :size="100" />
      </div>
      <h1
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800 } }"
        class="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-tight"
      >
        <span class="block text-fg-primary">{{ title1 }}</span>
        <span class="block text-gradient">{{ title2 }}</span>
      </h1>
      <p
        v-if="subtitle"
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 200 } }"
        class="text-fg-secondary text-lg md:text-xl max-w-3xl mx-auto"
      >
        {{ subtitle }}
      </p>
      <div
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :enter="{ opacity: 1, y: 0, transition: { duration: 800, delay: 400 } }"
        class="flex flex-col sm:flex-row gap-4 justify-center pt-4"
      >
        <a :href="primaryCtaHref">
          <Button class="btn-glow text-base px-8 py-4">{{ primaryCtaLabel }}</Button>
        </a>
        <NuxtLink v-if="secondaryCtaTo" :to="secondaryCtaTo">
          <Button variant="outline" class="text-base px-8 py-4 border-accent-glow/50 text-accent-bright hover:bg-accent-glow/10">
            {{ secondaryCtaLabel }}
          </Button>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
```

- [ ] **Step 4: Commit**

```bash
git add app/components/hero/
git commit -m "feat: add Hero components (banner, particles, infinity logo SVG)"
```

---

## Task 17: Motion components — FadeInUp / ScrollReveal / TypeWriter

**Files:**
- Create: `app/components/motion/FadeInUp.vue`
- Create: `app/components/motion/ScrollReveal.vue`
- Create: `app/components/motion/TypeWriter.vue`

- [ ] **Step 1: Create `FadeInUp.vue`** (wrapper convenience)

```vue
<!-- app/components/motion/FadeInUp.vue -->
<script setup lang="ts">
withDefaults(defineProps<{ delay?: number; duration?: number; offset?: number }>(), {
  delay: 0,
  duration: 600,
  offset: 24,
})
</script>

<template>
  <div
    v-motion
    :initial="{ opacity: 0, y: offset }"
    :visible-once="{ opacity: 1, y: 0, transition: { duration, delay } }"
  >
    <slot />
  </div>
</template>
```

- [ ] **Step 2: Create `ScrollReveal.vue`** (stagger children)

```vue
<!-- app/components/motion/ScrollReveal.vue -->
<script setup lang="ts">
withDefaults(defineProps<{ stagger?: number; duration?: number }>(), {
  stagger: 100,
  duration: 600,
})
</script>

<template>
  <div>
    <slot :stagger="stagger" :duration="duration" />
  </div>
</template>
```

Note: Children opt in via `v-motion` with their own delay; this component just bundles convention. Keep it as a marker so future enhancements (intersection observer for sequential reveal) have a hook.

- [ ] **Step 3: Create `TypeWriter.vue`** (character-by-character reveal)

```vue
<!-- app/components/motion/TypeWriter.vue -->
<script setup lang="ts">
import { useElementVisibility } from '@vueuse/core'

const props = withDefaults(defineProps<{
  text: string
  speed?: number
  startDelay?: number
}>(), {
  speed: 60,
  startDelay: 0,
})

const root = ref<HTMLElement | null>(null)
const visible = useElementVisibility(root)
const shown = ref('')
let started = false

watch(visible, (v) => {
  if (!v || started) return
  started = true
  setTimeout(() => {
    let i = 0
    const tick = () => {
      shown.value = props.text.slice(0, ++i)
      if (i < props.text.length) setTimeout(tick, props.speed)
    }
    tick()
  }, props.startDelay)
})

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    shown.value = props.text
    started = true
  }
})
</script>

<template>
  <span ref="root">{{ shown }}<span v-if="shown.length < text.length" class="inline-block w-0.5 h-[1em] bg-accent-bright align-middle ml-0.5 animate-pulse" /></span>
</template>
```

- [ ] **Step 4: Commit**

```bash
git add app/components/motion/
git commit -m "feat: add motion components (FadeInUp, ScrollReveal, TypeWriter)"
```

---

## Task 18: Home page (/)

**Files:**
- Modify: `app/pages/index.vue` (replaces smoke test)
- Create: `app/assets/images/banner-hero.png` (banner crop, copy via cp)

- [ ] **Step 1: Copy banner crop into assets**

```bash
mkdir -p app/assets/images
cp "ref/ChatGPT Image 2026年5月3日 上午11_47_20.png" app/assets/images/banner-hero.png
```

This is the wide banner with "徵求策略合作企業 聯絡結盟". The PNG with logo embedded is fine for hero background.

- [ ] **Step 2: Replace `app/pages/index.vue` with full home page**

```vue
<!-- app/pages/index.vue -->
<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { alliance } = useMailto()

usePageSeo({
  title: t('home.hero_title_1') + ' ' + t('home.hero_title_2'),
})

import bannerHero from '~/assets/images/banner-hero.png'

const problems = computed(() => [
  { icon: 'puzzle',     title: locale.value === 'en' ? 'Spec Fragmentation' : '規格分歧',
    desc: locale.value === 'en' ? 'AI/VR brands lock users into incompatible ecosystems'
                                 : 'AI/VR 各家硬體規格各自為政，互不相容' },
  { icon: 'lock',       title: locale.value === 'en' ? 'Software Lock-in' : '軟體閉鎖',
    desc: locale.value === 'en' ? 'Apps for Brand A cannot run on Brand B hardware'
                                 : 'A 品牌軟體無法在 B 品牌硬體上運行' },
  { icon: 'wallet',     title: locale.value === 'en' ? 'Wasted Spend' : '消費者重複付費',
    desc: locale.value === 'en' ? 'Consumers pay twice when switching hardware'
                                 : '更換硬體就要重買軟體，造成資源浪費' },
])

const solutions = computed(() => [
  { to: localePath('/solutions/golf'),
    icon: 'flag',
    tagline: locale.value === 'en' ? 'NICHE 01' : '利基市場 01',
    title: t('nav.solutions_golf'),
    description: locale.value === 'en'
      ? 'AI swing analysis and immersive VR practice for serious players'
      : 'AI 揮桿分析、沉浸式 VR 練習場，專為高消費力玩家打造' },
  { to: localePath('/solutions/ski'),
    icon: 'mountain',
    tagline: locale.value === 'en' ? 'NICHE 02' : '利基市場 02',
    title: t('nav.solutions_ski'),
    description: locale.value === 'en'
      ? 'Pre-season virtual training and on-slope AR coaching for skiers'
      : '雪季前虛擬訓練、雪道上 AR 教練輔助' },
  { to: localePath('/solutions/vision'),
    icon: 'eye',
    tagline: locale.value === 'en' ? 'NICHE 03' : '利基市場 03',
    title: t('nav.solutions_vision'),
    description: locale.value === 'en'
      ? 'Clinically-grounded myopia control system for children'
      : '結合臨床標準，給家長與兒童的近視矯正預防方案' },
])
</script>

<template>
  <div>
    <HeroBanner
      :title1="t('home.hero_title_1')"
      :title2="t('home.hero_title_2')"
      :subtitle="t('home.hero_subtitle')"
      :primary-cta-label="t('cta.alliance')"
      :primary-cta-href="alliance(locale)"
      :secondary-cta-label="t('cta.learn_platform')"
      :secondary-cta-to="localePath('/platform')"
      :background-image="bannerHero"
    />

    <SectionContainer
      :title="t('home.problem_title')"
      :subtitle="t('home.problem_subtitle')"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard
          v-for="p in problems"
          :key="p.title"
          :icon="p.icon"
          :title="p.title"
          :description="p.desc"
        />
      </div>
    </SectionContainer>

    <SectionContainer
      :title="t('home.solutions_title')"
      :subtitle="t('home.solutions_subtitle')"
      variant="tech"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <SolutionCard
          v-for="s in solutions"
          :key="s.to"
          :to="s.to"
          :icon="s.icon"
          :tagline="s.tagline"
          :title="s.title"
          :description="s.description"
        />
      </div>
    </SectionContainer>

    <SectionContainer
      :title="t('home.ecosystem_title')"
      :subtitle="t('home.ecosystem_subtitle')"
      variant="tight"
    >
      <FadeInUp>
        <div class="flex justify-center py-8">
          <InfinityLogoSVG :size="240" />
        </div>
      </FadeInUp>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <FeatureCard
          icon="cpu"
          :title="locale === 'en' ? 'Hardware Makers' : '硬體製造商'"
          :description="locale === 'en' ? 'Adopt our standard, save R&D' : '採用我們的規範，降低研發成本'"
        />
        <FeatureCard
          icon="code"
          :title="locale === 'en' ? 'Software Developers' : '軟體開發商'"
          :description="locale === 'en' ? 'Build once, run on every brand' : '一次開發，跨硬體品牌運行'"
        />
        <FeatureCard
          icon="hospital"
          :title="locale === 'en' ? 'Sports & Medical' : '醫療運動機構'"
          :description="locale === 'en' ? 'Professional channel and validation' : '專業通路與背書合作'"
        />
      </div>
    </SectionContainer>

    <SectionContainer variant="tight">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 py-8">
        <StatNumber :value="3" suffix="+" :label="locale === 'en' ? 'Niche Markets' : '利基市場'" />
        <StatNumber :value="100" suffix="%" :label="locale === 'en' ? 'Open Standard' : '開放規範'" />
        <StatNumber :value="1" prefix="∞" suffix="" :label="locale === 'en' ? 'Ecosystem' : '生態系統'" />
      </div>
    </SectionContainer>

    <CTASection
      :title="t('home.aspiration_title')"
      :subtitle="t('home.aspiration_subtitle')"
      :cta-label="t('cta.alliance')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
```

- [ ] **Step 3: Smoke test home**

```bash
npm run dev
```

Visit `http://localhost:3000/zh-TW/`. Expected:
- Hero with banner background, particles, infinity logo, dual CTA
- 3 problem cards
- 3 niche solution cards (with tech grid backdrop)
- Ecosystem section with infinity SVG
- Stat counters
- CTA banner

Test `/zh-CN/` and `/en/` too. Stop server.

- [ ] **Step 4: Commit**

```bash
git add app/pages/index.vue app/assets/images/
git commit -m "feat: home page with hero, problems, solutions, ecosystem, stats, CTA"
```

---

## Task 19: About page

**Files:**
- Create: `app/pages/about.vue`

- [ ] **Step 1: Create page**

```vue
<!-- app/pages/about.vue -->
<script setup lang="ts">
const { t, locale } = useI18n()

const titleByLocale = computed(() => ({
  'zh-TW': '關於 Infinity Agentic',
  'zh-CN': '关于 Infinity Agentic',
  'en':    'About Infinity Agentic',
}[locale.value] ?? '關於 Infinity Agentic'))

const introByLocale = computed(() => ({
  'zh-TW': '我們是一個專注於 AI/VR 開放生態系的平台公司。透過開放專利與技術規範，打破當前市場的閉鎖生態，讓硬體廠、軟體商與消費者三方共贏。',
  'zh-CN': '我们是一个专注于 AI/VR 开放生态系的平台公司。透过开放专利与技术规范，打破当前市场的闭锁生态，让硬件厂、软件商与消费者三方共赢。',
  'en':    'We are a platform company focused on the open AI/VR ecosystem. Through open patents and technical standards, we break the current locked ecosystem and create a win-win for hardware makers, software developers, and consumers.',
}[locale.value] ?? ''))

const soar = computed(() => [
  { letter: 'S', title: locale.value === 'en' ? 'Strengths' : '優勢',
    desc: locale.value === 'en' ? 'Open VR/AI tech foundation, precise niche entry'
                                 : '開放技術底座、精準利基切入' },
  { letter: 'O', title: locale.value === 'en' ? 'Opportunities' : '機會',
    desc: locale.value === 'en' ? 'Eliminate consumer pain points, AI wearable boom'
                                 : '消除消費者痛點、AI 穿戴爆發期' },
  { letter: 'A', title: locale.value === 'en' ? 'Aspirations' : '抱負',
    desc: locale.value === 'en' ? 'Become the Qualcomm/Android of AI/VR'
                                 : '成為 AI/VR 界的「高通」與「安卓」' },
  { letter: 'R', title: locale.value === 'en' ? 'Results' : '結果',
    desc: locale.value === 'en' ? 'Ecosystem expansion + niche penetration metrics'
                                 : '生態系擴張指標、利基市場滲透率' },
])

usePageSeo({ title: titleByLocale.value, description: introByLocale.value })
</script>

<template>
  <div>
    <SectionContainer :title="titleByLocale" :subtitle="introByLocale" variant="tech" />
    <SectionContainer
      :title="locale === 'en' ? 'SOAR Strategic Framework' : 'SOAR 策略框架'"
      :subtitle="locale === 'en'
        ? 'Strengths · Opportunities · Aspirations · Results'
        : '優勢 · 機會 · 抱負 · 結果'"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FeatureCard
          v-for="s in soar"
          :key="s.letter"
          :icon="'star'"
          :title="`${s.letter} — ${s.title}`"
          :description="s.desc"
        />
      </div>
    </SectionContainer>
  </div>
</template>
```

- [ ] **Step 2: Verify in browser** — `/zh-TW/about`, `/zh-CN/about`, `/en/about`.

- [ ] **Step 3: Commit**

```bash
git add app/pages/about.vue
git commit -m "feat: about page with company intro and SOAR framework"
```

---

## Task 20: Platform page

**Files:**
- Create: `app/pages/platform.vue`

- [ ] **Step 1: Create page**

```vue
<!-- app/pages/platform.vue -->
<script setup lang="ts">
const { t, locale } = useI18n()
const { alliance } = useMailto()

const titleMap = {
  'zh-TW': '開放平台與技術規範',
  'zh-CN': '开放平台与技术规范',
  'en':    'Open Platform & Standards',
}
const subtitleMap = {
  'zh-TW': '開源 LMM 大運動模型 + VR/AI 專利授權',
  'zh-CN': '开源 LMM 大运动模型 + VR/AI 专利授权',
  'en':    'Open-source LMM (Large Motion Model) + VR/AI patent licensing',
}

const features = computed(() => locale.value === 'en' ? [
  { icon: 'brain',    title: 'Open-source LMM',     desc: 'A large motion model trained for sports and movement, freely available to ecosystem members' },
  { icon: 'shield',   title: 'Patent Licensing',     desc: 'Capture-period clauses ensure licensees access future patents at the same rate' },
  { icon: 'package',  title: 'Bundled IP Package',   desc: 'Third-party patents bundled in one license to lower integration complexity' },
  { icon: 'plug',     title: 'Hardware Compliance',  desc: 'Manufacturing standards make any device on our spec interoperable' },
  { icon: 'layers',   title: 'SDK & Tooling',        desc: 'A unified SDK so apps run cross-brand without re-engineering' },
  { icon: 'handshake',title: 'No Hardware Compete',  desc: 'We license tech, we do not compete with manufacturers — building trust' },
] : [
  { icon: 'brain',    title: '開源 LMM 大運動模型',  desc: '針對運動動作訓練的大模型，開放給生態系夥伴使用' },
  { icon: 'shield',   title: '專利授權方案',          desc: '「捕獲期」條款保證授權廠商在標準產品週期內可使用未來專利，費率不變' },
  { icon: 'package',  title: '第三方專利打包授權',    desc: '一站式打包必需的第三方專利，降低整合難度' },
  { icon: 'plug',     title: '硬體製造規範',          desc: '採用本規範的設備天生跨品牌相容' },
  { icon: 'layers',   title: 'SDK 與工具鏈',          desc: '統一 SDK 讓應用一次開發、跨硬體運行' },
  { icon: 'handshake',title: '不與硬體廠競爭',        desc: '我們提供技術不做硬體，建立廠商信任' },
])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    />
    <SectionContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard
          v-for="f in features"
          :key="f.title"
          :icon="f.icon"
          :title="f.title"
          :description="f.desc"
        />
      </div>
    </SectionContainer>
    <CTASection
      :title="locale === 'en' ? 'Ready to integrate?' : '準備好接入了嗎？'"
      :subtitle="locale === 'en' ? 'Join our growing ecosystem of hardware and software partners.' : '加入我們不斷成長的硬體與軟體合作夥伴生態系。'"
      :cta-label="t('cta.alliance')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
```

- [ ] **Step 2: Verify** — `/zh-TW/platform`, `/zh-CN/platform`, `/en/platform`.

- [ ] **Step 3: Commit**

```bash
git add app/pages/platform.vue
git commit -m "feat: platform page with technology and licensing features"
```

---

## Task 21: Solutions index page

**Files:**
- Create: `app/pages/solutions/index.vue`

- [ ] **Step 1: Create page**

```vue
<!-- app/pages/solutions/index.vue -->
<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()

const titleMap = {
  'zh-TW': '解決方案',
  'zh-CN': '解决方案',
  'en':    'Solutions',
}
const subtitleMap = {
  'zh-TW': '三大利基市場：高消費力、高需求、高技術依賴',
  'zh-CN': '三大利基市场：高消费力、高需求、高技术依赖',
  'en':    'Three niches: high spend, high demand, high technical dependency',
}

const cards = computed(() => [
  { to: localePath('/solutions/golf'),  icon: 'flag',     title: t('nav.solutions_golf'),
    tagline: locale.value === 'en' ? 'Sports' : '運動',
    desc: locale.value === 'en' ? 'AI swing analysis + immersive VR range' : 'AI 揮桿分析 + VR 沉浸式練習場' },
  { to: localePath('/solutions/ski'),   icon: 'mountain', title: t('nav.solutions_ski'),
    tagline: locale.value === 'en' ? 'Sports' : '運動',
    desc: locale.value === 'en' ? 'Pre-season virtual training + on-slope AR' : '雪季前虛擬訓練 + 雪道 AR 教練' },
  { to: localePath('/solutions/vision'), icon: 'eye',     title: t('nav.solutions_vision'),
    tagline: locale.value === 'en' ? 'Healthcare' : '醫療',
    desc: locale.value === 'en' ? 'Clinically-grounded myopia control for children' : '結合臨床標準的兒童近視矯正預防系統' },
])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-8">
        <SolutionCard
          v-for="c in cards"
          :key="c.to"
          :to="c.to"
          :icon="c.icon"
          :tagline="c.tagline"
          :title="c.title"
          :description="c.desc"
        />
      </div>
    </SectionContainer>
  </div>
</template>
```

- [ ] **Step 2: Verify** — three locale routes for `/solutions`.

- [ ] **Step 3: Commit**

```bash
git add app/pages/solutions/index.vue
git commit -m "feat: solutions index page listing three niches"
```

---

## Task 22: Solution sub-pages (golf/ski/vision) using Markdown content

**Files:**
- Create: `app/pages/solutions/golf.vue`
- Create: `app/pages/solutions/ski.vue`
- Create: `app/pages/solutions/vision.vue`
- Create: `content/zh-TW/solutions/{ski,vision}.md`
- Create: `content/zh-CN/solutions/{ski,vision}.md`
- Create: `content/en/solutions/{ski,vision}.md`

(Golf .md files already created in Task 6.)

- [ ] **Step 1: Create ski Markdown — zh-TW**

```md
<!-- content/zh-TW/solutions/ski.md -->
---
title: 滑雪智能訓練
description: 雪季前 VR 虛擬訓練 + 雪道上 AR 教練輔助
hero_image: /images/ski-hero.jpg
features:
  - icon: snowflake
    title: 雪季前 VR 預訓練
    desc: 在家以 1:1 比例還原全球頂級雪場路線
  - icon: gauge
    title: 即時動作偵測
    desc: AI 分析重心、速度、轉彎弧度，給予改進建議
  - icon: shield
    title: 風險預警
    desc: 偵測潛在跌倒風險，提示佩戴者調整動作
---

## 為何選擇我們

滑雪是少數需要「事前訓練 + 現場輔助」的運動。傳統訓練器材笨重昂貴，現場教練也難以即時回饋細微動作。Infinity Agentic 整合 VR 預訓練與 AR 即時輔助，讓滑雪愛好者全季都有最佳的訓練體驗。

## 合作機構

- 全球頂級雪場資料合作（待簽約）
- 國際滑雪總會技術背書（規劃中）
```

- [ ] **Step 2: Create ski Markdown — zh-CN**

```md
<!-- content/zh-CN/solutions/ski.md -->
---
title: 滑雪智能训练
description: 雪季前 VR 虚拟训练 + 雪道上 AR 教练辅助
hero_image: /images/ski-hero.jpg
features:
  - icon: snowflake
    title: 雪季前 VR 预训练
    desc: 在家以 1:1 比例还原全球顶级雪场路线
  - icon: gauge
    title: 实时动作侦测
    desc: AI 分析重心、速度、转弯弧度，给予改进建议
  - icon: shield
    title: 风险预警
    desc: 侦测潜在跌倒风险，提示佩戴者调整动作
---

## 为何选择我们

滑雪是少数需要「事前训练 + 现场辅助」的运动。传统训练器材笨重昂贵，现场教练也难以实时回馈细微动作。Infinity Agentic 整合 VR 预训练与 AR 实时辅助，让滑雪爱好者全季都有最佳的训练体验。

## 合作机构

- 全球顶级雪场数据合作（待签约）
- 国际滑雪总会技术背书（规划中）
```

- [ ] **Step 3: Create ski Markdown — en**

```md
<!-- content/en/solutions/ski.md -->
---
title: Ski AI Training
description: Pre-season VR training + on-slope AR coaching
hero_image: /images/ski-hero.jpg
features:
  - icon: snowflake
    title: Pre-Season VR Training
    desc: Recreate world-class slopes at 1:1 scale at home
  - icon: gauge
    title: Real-Time Motion Detection
    desc: AI analyzes balance, speed, and turn radius with instant suggestions
  - icon: shield
    title: Risk Alerts
    desc: Detect potential fall risks and prompt corrective movements
---

## Why Us

Skiing is one of few sports requiring both pre-season training and on-the-slopes feedback. Traditional gear is bulky and on-site coaches cannot always provide instant feedback on subtle movements. Infinity Agentic integrates VR pre-training and AR real-time assistance for a full-season optimal experience.

## Partners

- World-class slope data partnerships (in progress)
- International ski federation technical endorsement (planned)
```

- [ ] **Step 4: Create vision Markdown — zh-TW**

```md
<!-- content/zh-TW/solutions/vision.md -->
---
title: 兒童近視矯正預防系統
description: 結合臨床標準的 AI/VR 視覺訓練方案
hero_image: /images/vision-hero.jpg
features:
  - icon: eye
    title: 視覺訓練
    desc: 以遊戲化方式進行眼球運動與焦距訓練
  - icon: clipboard
    title: 臨床數據追蹤
    desc: 與眼科診所數據打通，追蹤近視進展
  - icon: bell
    title: 用眼提醒
    desc: 偵測過度近距離用眼並適時提醒
---

## 為何選擇我們

兒童近視是全球公衛議題。傳統矯正手段（角膜塑型、藥物）需要長期配合與專業監控。本方案以 AI/VR 為核心，提供家長可在家執行、由眼科醫師遠端監控的完整流程。

## 合作機構

- 兒童眼科診所合作（規劃中）
- 教育部門科技教學試點（規劃中）

## 注意事項

本系統屬於輔助工具，不取代專業醫療診斷。具體療程請諮詢眼科醫師。
```

- [ ] **Step 5: Create vision Markdown — zh-CN**

```md
<!-- content/zh-CN/solutions/vision.md -->
---
title: 儿童近视矫正预防系统
description: 结合临床标准的 AI/VR 视觉训练方案
hero_image: /images/vision-hero.jpg
features:
  - icon: eye
    title: 视觉训练
    desc: 以游戏化方式进行眼球运动与焦距训练
  - icon: clipboard
    title: 临床数据追踪
    desc: 与眼科诊所数据打通，追踪近视进展
  - icon: bell
    title: 用眼提醒
    desc: 侦测过度近距离用眼并适时提醒
---

## 为何选择我们

儿童近视是全球公卫议题。传统矫正手段（角膜塑型、药物）需要长期配合与专业监控。本方案以 AI/VR 为核心，提供家长可在家执行、由眼科医师远端监控的完整流程。

## 合作机构

- 儿童眼科诊所合作（规划中）
- 教育部门科技教学试点（规划中）

## 注意事项

本系统属于辅助工具，不取代专业医疗诊断。具体疗程请咨询眼科医师。
```

- [ ] **Step 6: Create vision Markdown — en**

```md
<!-- content/en/solutions/vision.md -->
---
title: Children Myopia Control
description: Clinically-grounded AI/VR vision training
hero_image: /images/vision-hero.jpg
features:
  - icon: eye
    title: Vision Training
    desc: Gamified eye movement and focal training exercises
  - icon: clipboard
    title: Clinical Data Tracking
    desc: Sync with optometry clinics to track myopia progression
  - icon: bell
    title: Screen-Time Alerts
    desc: Detect excessive near-vision use and prompt breaks
---

## Why Us

Children's myopia is a global public health concern. Traditional methods (ortho-K, atropine) require long-term commitment and professional monitoring. Our solution combines AI/VR with at-home parent involvement and remote optometrist supervision.

## Partners

- Pediatric optometry clinics (in progress)
- Educational technology pilot programs (planned)

## Disclaimer

This system is a supplemental tool and does not replace professional medical diagnosis. Consult your optometrist for treatment plans.
```

- [ ] **Step 7: Create the three sub-page Vue templates (DRY-shared layout)**

Each page is identical except for the slug. Create one shared component first:

```vue
<!-- app/pages/solutions/golf.vue -->
<script setup lang="ts">
const { locale } = useI18n()
const { alliance } = useMailto()
const { t } = useI18n()

const { data } = await useAsyncData(
  () => `golf-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/solutions/golf`).first()
)

usePageSeo({
  title: data.value?.title,
  description: data.value?.description,
})
</script>

<template>
  <div v-if="data">
    <SectionContainer
      :title="data.title"
      :subtitle="data.description"
      variant="tech"
    />
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard
          v-for="f in data.features"
          :key="f.title"
          :icon="f.icon"
          :title="f.title"
          :description="f.desc"
        />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
    <CTASection
      :title="t('cta.alliance')"
      :cta-label="t('cta.contact')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
```

- [ ] **Step 8: Create `ski.vue` — same structure, slug `ski`**

```vue
<!-- app/pages/solutions/ski.vue -->
<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance } = useMailto()

const { data } = await useAsyncData(
  () => `ski-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/solutions/ski`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
    <CTASection :title="t('cta.alliance')" :cta-label="t('cta.contact')" :cta-href="alliance(locale)" />
  </div>
</template>
```

- [ ] **Step 9: Create `vision.vue` — same structure, slug `vision`**

```vue
<!-- app/pages/solutions/vision.vue -->
<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance } = useMailto()

const { data } = await useAsyncData(
  () => `vision-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/solutions/vision`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
    <CTASection :title="t('cta.alliance')" :cta-label="t('cta.contact')" :cta-href="alliance(locale)" />
  </div>
</template>
```

- [ ] **Step 10: Install Tailwind typography plugin** (for `prose` styles)

```bash
npm install -D @tailwindcss/typography
```

Add to `tailwind.config.ts`:

```ts
import typography from '@tailwindcss/typography'
export default <Partial<Config>>{
  // ...existing...
  plugins: [typography],
}
```

- [ ] **Step 11: Verify** — `/zh-TW/solutions/golf|ski|vision` and same for zh-CN, en.

- [ ] **Step 12: Commit**

```bash
git add app/pages/solutions/ content/ tailwind.config.ts package.json package-lock.json
git commit -m "feat: three solution sub-pages rendering Markdown via Nuxt Content"
```

---

## Task 23: Partners page

**Files:**
- Create: `app/pages/partners.vue`
- Create: `content/{zh-TW,zh-CN,en}/partners.md`

- [ ] **Step 1: Create partners.md zh-TW**

```md
<!-- content/zh-TW/partners.md -->
---
title: 合作加盟
description: 徵求策略合作企業 · 國級/省級代理火熱召集
features:
  - icon: handshake
    title: 策略合作
    desc: 硬體廠商、軟體商、運動/醫療機構皆歡迎
  - icon: map
    title: 國省級代理
    desc: 為大中華區與國際市場招募各層級代理
  - icon: gift
    title: 加盟利益
    desc: 開放專利、技術支援、市場聯合推廣
---

## 加盟條件

我們尋找的夥伴：

- **硬體製造商**：採用我們的開放規範，享受零起步研發紅利
- **軟體開發商**：在開放平台上開發，一次開發、跨硬體運行
- **運動/醫療機構**：作為利基市場通路與專業背書
- **國省級代理**：在大中華區或國際市場深耕分銷網路

## 合作流程

1. 透過下方 mailto 聯繫我們的營銷組（BSE#91 營銷第一組）
2. 我們會在 5 個工作天內回覆，安排線上會議
3. 評估後簽署 NDA，深入討論合作框架
4. 確定合作範圍後簽署正式合約

## 為何加入我們

借鏡 Sony PlayStation 與 Qualcomm 的成功經驗，我們提供：

- **降低開發門檻**：免除高昂前期投入
- **第三方專利打包授權**：一站式解決整合難題
- **「捕獲期」條款**：授權期內持續享有最新技術，費率不變
- **不與夥伴競爭**：純技術提供方，不做硬體競爭
```

- [ ] **Step 2: Create partners.md zh-CN**

```md
<!-- content/zh-CN/partners.md -->
---
title: 合作加盟
description: 征求策略合作企业 · 国级/省级代理火热召集
features:
  - icon: handshake
    title: 策略合作
    desc: 硬件厂商、软件商、运动/医疗机构皆欢迎
  - icon: map
    title: 国省级代理
    desc: 为大中华区与国际市场招募各层级代理
  - icon: gift
    title: 加盟利益
    desc: 开放专利、技术支持、市场联合推广
---

## 加盟条件

我们寻找的伙伴：

- **硬件制造商**：采用我们的开放规范，享受零起步研发红利
- **软件开发商**：在开放平台上开发，一次开发、跨硬件运行
- **运动/医疗机构**：作为利基市场通路与专业背书
- **国省级代理**：在大中华区或国际市场深耕分销网络

## 合作流程

1. 透过下方 mailto 联系我们的营销组（BSE#91 营销第一组）
2. 我们会在 5 个工作天内回复，安排在线会议
3. 评估后签署 NDA，深入讨论合作框架
4. 确定合作范围后签署正式合约

## 为何加入我们

借鉴 Sony PlayStation 与 Qualcomm 的成功经验，我们提供：

- **降低开发门槛**：免除高昂前期投入
- **第三方专利打包授权**：一站式解决整合难题
- **「捕获期」条款**：授权期内持续享有最新技术，费率不变
- **不与伙伴竞争**：纯技术提供方，不做硬件竞争
```

- [ ] **Step 3: Create partners.md en**

```md
<!-- content/en/partners.md -->
---
title: Partners & Alliances
description: Seeking strategic partners · National & regional agents
features:
  - icon: handshake
    title: Strategic Partnerships
    desc: Open to hardware makers, software developers, sports & medical institutions
  - icon: map
    title: Regional Agents
    desc: Recruiting agents at all tiers across Greater China and globally
  - icon: gift
    title: Partner Benefits
    desc: Open patents, technical support, joint go-to-market
---

## Who We Are Looking For

- **Hardware Manufacturers** — adopt our open standard and skip foundational R&D
- **Software Developers** — build once on our platform, run cross-brand
- **Sports & Medical Institutions** — niche-market channels and professional endorsement
- **Regional Agents** — distribution in Greater China or international markets

## How It Works

1. Reach out via the mailto button below to BSE#91 Marketing Group
2. We respond within 5 business days to schedule a call
3. After evaluation we sign an NDA and discuss the partnership framework
4. Once scope is agreed we sign the formal contract

## Why Join Us

Drawing from Sony PlayStation and Qualcomm playbooks, we offer:

- **Low Entry Barrier** — minimal upfront fees
- **Bundled IP Licensing** — third-party patents included
- **"Capture Period" Clause** — same rate for future patents during license term
- **No Hardware Competition** — we license tech, we do not compete with you
```

- [ ] **Step 4: Create `app/pages/partners.vue`**

```vue
<!-- app/pages/partners.vue -->
<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance, agent } = useMailto()

const { data } = await useAsyncData(
  () => `partners-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/partners`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
    <SectionContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a :href="alliance(locale)" class="block">
          <div class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3">
            <Icon name="lucide:handshake" class="w-12 h-12 text-accent-bright mx-auto" />
            <h3 class="text-xl font-display font-bold">
              {{ locale === 'en' ? 'Strategic Partnership' : '策略合作意向' }}
            </h3>
            <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
          </div>
        </a>
        <a :href="agent(locale)" class="block">
          <div class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3">
            <Icon name="lucide:map" class="w-12 h-12 text-accent-bright mx-auto" />
            <h3 class="text-xl font-display font-bold">
              {{ locale === 'en' ? 'Regional Agent Application' : '國省級代理申請' }}
            </h3>
            <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
          </div>
        </a>
      </div>
    </SectionContainer>
  </div>
</template>
```

- [ ] **Step 5: Verify** — `/zh-TW/partners` etc.

- [ ] **Step 6: Commit**

```bash
git add app/pages/partners.vue content/
git commit -m "feat: partners page with two-track CTA (alliance + agent)"
```

---

## Task 24: Developers page

**Files:**
- Create: `app/pages/developers.vue`

- [ ] **Step 1: Create page**

```vue
<!-- app/pages/developers.vue -->
<script setup lang="ts">
const { locale, t } = useI18n()
const { alliance } = useMailto()

const titleMap = { 'zh-TW': '開發者 / SDK', 'zh-CN': '开发者 / SDK', 'en': 'Developers / SDK' }
const subtitleMap = {
  'zh-TW': '一次開發，跨所有採用 Infinity 規範的硬體運行',
  'zh-CN': '一次开发，跨所有采用 Infinity 规范的硬件运行',
  'en':    'Build once, run on every device with the Infinity standard',
}

const benefits = computed(() => locale.value === 'en' ? [
  { icon: 'code',     title: 'Single Codebase',      desc: 'Same code runs across all compatible AI/VR glasses' },
  { icon: 'package',  title: 'Free SDK',             desc: 'Open SDK + comprehensive samples and tutorials' },
  { icon: 'wallet',   title: 'Low Royalty',          desc: 'Reduced or waived initial royalties to lower your risk' },
  { icon: 'users',    title: 'Big User Base',        desc: 'Tap into our growing niche audiences (golf, ski, vision)' },
  { icon: 'chart',    title: 'Revenue Share',        desc: 'Transparent monetization with platform analytics' },
  { icon: 'megaphone',title: 'Marketing Co-op',      desc: 'Featured placement in launch campaigns' },
] : [
  { icon: 'code',     title: '單一程式碼基底',        desc: '同一份程式碼在所有相容硬體上運行' },
  { icon: 'package',  title: '免費 SDK',              desc: '開放 SDK + 完整範例與教學' },
  { icon: 'wallet',   title: '低權利金',              desc: '降低或免除初期權利金，降低風險' },
  { icon: 'users',    title: '龐大用戶基數',          desc: '直接接觸高爾夫、滑雪、兒童近視等利基受眾' },
  { icon: 'chart',    title: '透明分潤',              desc: '透明的變現機制與平台分析' },
  { icon: 'megaphone',title: '聯合行銷',              desc: '上線活動聯合推廣' },
])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    />
    <SectionContainer>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="b in benefits" :key="b.title" :icon="b.icon" :title="b.title" :description="b.desc" />
      </div>
    </SectionContainer>
    <CTASection
      :title="locale === 'en' ? 'Ready to start building?' : '準備好開始開發了嗎？'"
      :subtitle="locale === 'en' ? 'Get early access to our SDK and developer program.' : '取得 SDK 與開發者計畫的早期存取權'"
      :cta-label="t('cta.contact')"
      :cta-href="alliance(locale)"
    />
  </div>
</template>
```

- [ ] **Step 2: Verify and commit**

```bash
git add app/pages/developers.vue
git commit -m "feat: developers page with SDK benefits"
```

---

## Task 25: Investors page

**Files:**
- Create: `app/pages/investors.vue`
- Create: `content/{zh-TW,zh-CN,en}/investors.md`

- [ ] **Step 1: Create investors.md zh-TW**

```md
<!-- content/zh-TW/investors.md -->
---
title: 投資人專區
description: 開放生態系的長期價值投資機會
features:
  - icon: globe
    title: 全球市場機會
    desc: AI 穿戴爆發期 + 跨品牌相容剛需
  - icon: trophy
    title: 利基市場護城河
    desc: 高爾夫、滑雪、兒童近視 — 高消費力 + 高黏性
  - icon: shield
    title: 開放專利護盾
    desc: 借鏡 Qualcomm 模式建立行業標準
---

## 投資亮點

### 1. 解決真實痛點
AI/VR 市場規格分歧、軟體閉鎖。我們的開放平台讓硬體廠、軟體商、消費者三方共贏。

### 2. 雙商業模式
- **B2B 平台費**：硬體廠採用我們規範的授權收入
- **B2B2C 抽成**：軟體商在平台上的營收分潤

### 3. 利基市場高估值
首發三個高消費力利基（高爾夫、滑雪、兒童近視）累積基礎用戶後，反向吸引第三方軟體加盟，形成飛輪。

### 4. 借鏡成功模型
- **Qualcomm**：開放專利打包授權建立行業基礎
- **Sony PlayStation**：第三方軟體生態系權利金
- **Android**：開放規範 + 廣大硬體支持

## 索取詳細資料

完整 Pitch Deck、財務預測、估值與投資條款請透過下方 mailto 索取。我們會在保密協議下分享。
```

- [ ] **Step 2: Create investors.md zh-CN**

```md
<!-- content/zh-CN/investors.md -->
---
title: 投资人专区
description: 开放生态系的长期价值投资机会
features:
  - icon: globe
    title: 全球市场机会
    desc: AI 穿戴爆发期 + 跨品牌相容刚需
  - icon: trophy
    title: 利基市场护城河
    desc: 高尔夫、滑雪、儿童近视 — 高消费力 + 高黏性
  - icon: shield
    title: 开放专利护盾
    desc: 借鉴 Qualcomm 模式建立行业标准
---

## 投资亮点

### 1. 解决真实痛点
AI/VR 市场规格分歧、软件闭锁。我们的开放平台让硬件厂、软件商、消费者三方共赢。

### 2. 双商业模式
- **B2B 平台费**：硬件厂采用我们规范的授权收入
- **B2B2C 分润**：软件商在平台上的营收分润

### 3. 利基市场高估值
首发三个高消费力利基（高尔夫、滑雪、儿童近视）累积基础用户后，反向吸引第三方软件加盟，形成飞轮。

### 4. 借鉴成功模型
- **Qualcomm**：开放专利打包授权建立行业基础
- **Sony PlayStation**：第三方软件生态系权利金
- **Android**：开放规范 + 广大硬件支持

## 索取详细资料

完整 Pitch Deck、财务预测、估值与投资条款请透过下方 mailto 索取。我们会在保密协议下分享。
```

- [ ] **Step 3: Create investors.md en**

```md
<!-- content/en/investors.md -->
---
title: Investors
description: Long-term value investment in the open AI/VR ecosystem
features:
  - icon: globe
    title: Global Market Opportunity
    desc: AI wearable boom × cross-brand compatibility necessity
  - icon: trophy
    title: Niche Market Moats
    desc: Golf, ski, children vision — high spend, high stickiness
  - icon: shield
    title: Open Patent Shield
    desc: Qualcomm-style industry standard establishment
---

## Investment Highlights

### 1. Solving Real Pain Points
The AI/VR market suffers from spec fragmentation and software lock-in. Our open platform creates win-win for hardware makers, software developers, and consumers.

### 2. Dual Business Model
- **B2B Platform Fees** — licensing revenue from hardware adopters
- **B2B2C Revenue Share** — share of software sales on our platform

### 3. High-Value Niches
Launching with three high-spend niches (golf, ski, children vision) builds a base user audience that flywheels third-party developers.

### 4. Proven Reference Models
- **Qualcomm** — bundled patent licensing as industry foundation
- **Sony PlayStation** — third-party software ecosystem royalties
- **Android** — open standard + broad hardware adoption

## Request Detailed Materials

For our full pitch deck, financial projections, valuation and term sheet, please request via the mailto button. We share under NDA.
```

- [ ] **Step 4: Create `app/pages/investors.vue`**

```vue
<!-- app/pages/investors.vue -->
<script setup lang="ts">
const { locale, t } = useI18n()
const { pitchDeck } = useMailto()

const { data } = await useAsyncData(
  () => `investors-${locale.value}`,
  () => queryCollection('pages').path(`/${locale.value}/investors`).first()
)
usePageSeo({ title: data.value?.title, description: data.value?.description })
</script>

<template>
  <div v-if="data">
    <SectionContainer :title="data.title" :subtitle="data.description" variant="tech" />
    <SectionContainer v-if="data.features?.length">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        <FeatureCard v-for="f in data.features" :key="f.title" :icon="f.icon" :title="f.title" :description="f.desc" />
      </div>
    </SectionContainer>
    <SectionContainer variant="tight">
      <article class="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-glow">
        <ContentRenderer :value="data" />
      </article>
    </SectionContainer>
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

- [ ] **Step 5: Verify and commit**

```bash
git add app/pages/investors.vue content/
git commit -m "feat: investors page (public) with NDA-gated detail request CTA"
```

---

## Task 26: Contact page

**Files:**
- Create: `app/pages/contact.vue`

- [ ] **Step 1: Create page**

```vue
<!-- app/pages/contact.vue -->
<script setup lang="ts">
const { locale, t } = useI18n()
const { contactEmail, alliance, agent, pitchDeck } = useMailto()

const titleMap = { 'zh-TW': '聯絡我們', 'zh-CN': '联系我们', 'en': 'Contact Us' }
const subtitleMap = {
  'zh-TW': '無限智能股份有限公司 · BSE#91 營銷第一組',
  'zh-CN': '无限智能股份有限公司 · BSE#91 营销第一组',
  'en':    'Infinity Agentic Inc. · BSE#91 Marketing Group',
}

const channels = computed(() => [
  { icon: 'handshake',  title: locale.value === 'en' ? 'Strategic Alliance'        : '策略合作', href: alliance(locale.value) },
  { icon: 'map',        title: locale.value === 'en' ? 'Regional Agent'            : '國省級代理', href: agent(locale.value) },
  { icon: 'briefcase',  title: locale.value === 'en' ? 'Investor Relations'        : '投資人關係', href: pitchDeck(locale.value) },
])

usePageSeo({ title: titleMap[locale.value] ?? titleMap['zh-TW'] })
</script>

<template>
  <div>
    <SectionContainer
      :title="titleMap[locale] ?? titleMap['zh-TW']"
      :subtitle="subtitleMap[locale] ?? subtitleMap['zh-TW']"
      variant="tech"
    >
      <div class="text-center mt-8 space-y-2">
        <a
          :href="`mailto:${contactEmail}`"
          class="inline-flex items-center gap-2 text-2xl font-display text-glow hover:text-accent-bright transition-colors"
        >
          <Icon name="lucide:mail" class="w-6 h-6" />
          {{ contactEmail }}
        </a>
      </div>
    </SectionContainer>

    <SectionContainer
      :title="locale === 'en' ? 'Choose a Channel' : '依您的需求'"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <a
          v-for="c in channels"
          :key="c.title"
          :href="c.href"
          class="glass-card p-8 text-center hover:shadow-glow-lg transition-shadow space-y-3"
        >
          <Icon :name="`lucide:${c.icon}`" class="w-12 h-12 text-accent-bright mx-auto" />
          <h3 class="text-xl font-display font-bold">{{ c.title }}</h3>
          <p class="text-sm text-fg-secondary">{{ t('cta.contact') }}</p>
        </a>
      </div>
    </SectionContainer>

    <SectionContainer variant="tight">
      <div class="glass-card p-8 lg:p-12 text-center space-y-4">
        <h3 class="text-xl font-display font-bold">
          {{ locale === 'en' ? 'Office (Coming Soon)' : '辦公室（佔位）' }}
        </h3>
        <p class="text-fg-muted">
          {{ locale === 'en' ? 'Address details to be confirmed.' : '辦公地址確認中。' }}
        </p>
      </div>
    </SectionContainer>
  </div>
</template>
```

- [ ] **Step 2: Verify and commit**

```bash
git add app/pages/contact.vue
git commit -m "feat: contact page with email, three channel CTAs, office placeholder"
```

---

## Task 27: Verify full build (`nuxi generate`)

**Files:** none modified

- [ ] **Step 1: Run generate**

```bash
cd /home/sss2500/codejobs/infiag.com
npm run generate
```

Expected: Build completes; outputs to `.output/public/`. No errors. Warnings about missing images are acceptable for hero placeholders.

- [ ] **Step 2: Verify produced URL structure**

```bash
ls -la .output/public/
ls -la .output/public/zh-TW/
ls -la .output/public/zh-TW/solutions/
ls -la .output/public/en/
```

Expected:
- `.output/public/index.html` exists
- `.output/public/zh-TW/index.html` exists
- `.output/public/zh-TW/about/index.html` exists
- `.output/public/zh-TW/solutions/golf/index.html` exists
- Same for `zh-CN/` and `en/`
- `.output/public/sitemap.xml` exists
- `.output/public/robots.txt` exists
- `.output/public/_nuxt/` directory with hashed JS/CSS

- [ ] **Step 3: Smoke serve the static output locally**

```bash
npx http-server .output/public -p 8080 -o /zh-TW/
```

Open `http://localhost:8080/zh-TW/`. Click around all 8 pages, swap languages. All routes resolve. Stop with Ctrl-C.

- [ ] **Step 4: Verify sitemap content**

```bash
cat .output/public/sitemap.xml | head -80
```

Expected: 24+ `<url>` entries with `<xhtml:link rel="alternate" hreflang="...">` for each language.

- [ ] **Step 5: Commit any auto-generated cache files (or add to gitignore)**

If anything was generated under `.cache/` or `.data/`, ensure `.gitignore` covers it (already done in Task 1).

```bash
git status
git add .gitignore  # only if changed
git commit -m "chore: confirm full SSG build with 24 localized URLs" --allow-empty
```

---

## Task 28: Add deployment runbook

**Files:**
- Create: `docs/deployment.md`

- [ ] **Step 1: Create runbook**

```markdown
<!-- docs/deployment.md -->
# Deploying to Cloudflare R2

This site is deployed manually to a Cloudflare R2 bucket configured for static
website hosting. No CI/CD is set up.

## One-Time Setup

1. Log in to Cloudflare Dashboard → R2.
2. Create a bucket. Suggested name: `infiag-com-prod`.
3. Open bucket → Settings → **Public Access**:
   - Enable **Custom Domain** and add `infiag.com`.
   - Enable **Static Website Hosting**:
     - Index document: `index.html`
     - Error document: `404.html`
4. Cloudflare automatically configures the DNS record for the custom domain.

## Each Deployment

1. From repo root, build the site:

   \`\`\`bash
   npm run generate
   \`\`\`

   This produces `.output/public/` with all 24 localized HTML pages,
   sitemap.xml, robots.txt, and hashed assets in `_nuxt/`.

2. Upload `.output/public/` contents to the R2 bucket. Two options:

   **Option A — Cloudflare Dashboard (drag-drop)**
   - Open bucket → **Objects** tab.
   - Drag the contents of `.output/public/` into the upload area.
   - Wait for upload to complete.

   **Option B — wrangler CLI (faster for repeat deploys)**
   - Install wrangler once: `npm install -g wrangler`
   - Authenticate once: `wrangler login`
   - Upload:
     \`\`\`bash
     cd .output/public
     find . -type f | while read f; do
       wrangler r2 object put "infiag-com-prod/${f#./}" --file "$f"
     done
     \`\`\`

3. After upload, visit `https://infiag.com/` to verify.

## Cache Invalidation

R2 + Cloudflare CDN caches aggressively. After deploying:
- New JS/CSS in `_nuxt/` use hashed filenames (auto-busted).
- HTML files share the same path — purge them via:
  - Cloudflare Dashboard → Caching → Configuration → **Purge Everything** (or specific URLs).

## Removing Stale Files

If you renamed or removed pages, delete corresponding old paths from the bucket
manually via Dashboard → Objects, or use `wrangler r2 object delete`.

## Rollback

R2 has no built-in versioning by default. To roll back:
- Re-checkout the prior git commit.
- Run `npm run generate` again.
- Re-upload.

(For real production safety, consider enabling R2 bucket versioning later.)
```

- [ ] **Step 2: Commit**

```bash
git add docs/deployment.md
git commit -m "docs: add manual Cloudflare R2 deployment runbook"
```

---

## Task 29: Final cleanup and root README polish

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Update `README.md`**

```markdown
# infiag.com

Infinity Agentic 無限智能 — official static site.

## Stack

- **Framework:** Nuxt 3 (compatibilityVersion 4) + Vue 3 + TypeScript
- **Styling:** Tailwind CSS + shadcn-vue (deep-space tech theme, dark only)
- **i18n:** `@nuxtjs/i18n` v9 — three locales: zh-TW (default) / zh-CN / en
- **Content:** `@nuxt/content` v3 — Markdown for long copy
- **Animation:** `@vueuse/motion` + custom canvas particles + SVG line draw
- **SEO:** `@nuxtjs/seo` (sitemap, OG, hreflang)
- **Forms:** `mailto:` only (no backend)
- **Deploy:** Cloudflare R2 static website hosting (manual upload)

## Develop

\`\`\`bash
npm install
npm run dev          # http://localhost:3000
\`\`\`

## Build

\`\`\`bash
npm run generate     # → .output/public/
\`\`\`

See `docs/deployment.md` for upload steps.

## Project Structure

- `app/pages/` — 11 page templates (i18n auto-prefixes routes)
- `app/components/{layout,hero,sections,motion,ui}/` — UI by responsibility
- `content/{zh-TW,zh-CN,en}/` — Markdown long copy per locale
- `i18n/locales/` — UI strings JSON per locale
- `app/composables/` — `useMailto`, `usePageSeo`
- `ref/` — original brand assets (banners, BM.md), do not modify

## Documentation

- Spec: `docs/superpowers/specs/2026-05-03-infiag-static-site-design.md`
- Plan: `docs/superpowers/plans/2026-05-03-infiag-static-site-implementation.md`
- Deployment: `docs/deployment.md`

## License

Proprietary.
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: update README with full stack and structure overview"
```

---

## Self-Review Checklist (run after writing this plan)

**Spec coverage:**
- [x] §1 Goals → Task 1–29 collectively
- [x] §3 Tech stack & versions → Task 2 (Nuxt), 3 (Tailwind), 4 (shadcn), 5 (i18n), 6 (Content), 7 (motion), 8 (SEO/image/icon)
- [x] §4 Directory structure → laid out at top of plan; built across tasks
- [x] §5 Routes & i18n → Task 5 + Task 18-26 (each page with localePath)
- [x] §6 Layout → Task 11 (Header), 12 (Footer), 13 (default layout)
- [x] §7 Styling system → Task 3 (tokens), 4 (shadcn theme bridge)
- [x] §8 Content data flow → Task 6 (collection schema), 22-25 (Markdown-driven pages)
- [x] §9 Animation → Task 7 (motion module), 16 (particles, SVG), 17 (FadeInUp/ScrollReveal/TypeWriter), 14-15 (used in sections)
- [x] §10 SEO → Task 8 (modules), Task 10 (usePageSeo), every page calls usePageSeo
- [x] §11 Build & Deploy → Task 27 (build verify), 28 (deployment runbook)
- [x] §13 Limitations / §14 Future ideas → out of scope, acknowledged in Task 29 README

**No placeholders found.** All tasks have concrete code blocks and exact paths.

**Type/symbol consistency:**
- `useMailto()` exposes: `contactEmail`, `buildMailto`, `alliance(locale)`, `pitchDeck(locale)`, `agent(locale)` — used consistently in Task 11 (Footer), 18 (home), 22 (solutions), 23 (partners), 24 (developers), 25 (investors), 26 (contact).
- `usePageSeo({ title, description, image })` — used consistently in every page.
- `queryCollection('pages').path(...).first()` — same Nuxt Content v3 API everywhere.
- Component prop names match across pages (`SolutionCard` `to/icon/title/tagline/description`, `FeatureCard` `icon/title/description`, `CTASection` `title/subtitle/ctaLabel/ctaHref`).

**Frequent commits:** Every task ends in a commit. ~29 commits total.
