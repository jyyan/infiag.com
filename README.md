# infiag.com

Infinity Agentic 無限智能 — official multi-locale static site.

## Stack

- **Framework:** Nuxt 4 (`compatibilityVersion: 4`) + Vue 3 + TypeScript
- **Styling:** Tailwind CSS + shadcn-vue (deep-space tech theme, dark only)
- **i18n:** `@nuxtjs/i18n` v10 — three locales: zh-TW (default) / zh-CN / en, prefix routing
- **Content:** `@nuxt/content` v3 — Markdown for long-form copy via `queryCollection('pages')`
- **Animation:** `@vueuse/motion` (scroll reveal) + custom canvas particles + SVG line draw
- **SEO:** `@nuxtjs/seo` (sitemap + hreflang + OG + robots)
- **Forms:** `mailto:` only (no backend) — three B2B presets in `useMailto`
- **Deploy:** Cloudflare Pages (Workers Static Assets) — manual `npx wrangler deploy`

## Site Map

11 page templates × 3 locales = **33 unique URLs**.

```
/zh-TW/                     /zh-CN/                     /en/
/zh-TW/about                /zh-CN/about                /en/about
/zh-TW/platform             /zh-CN/platform             /en/platform
/zh-TW/solutions            /zh-CN/solutions            /en/solutions
/zh-TW/solutions/golf       /zh-CN/solutions/golf       /en/solutions/golf
/zh-TW/solutions/ski        /zh-CN/solutions/ski        /en/solutions/ski
/zh-TW/solutions/vision     /zh-CN/solutions/vision     /en/solutions/vision
/zh-TW/partners             /zh-CN/partners             /en/partners
/zh-TW/developers           /zh-CN/developers           /en/developers
/zh-TW/investors            /zh-CN/investors            /en/investors
/zh-TW/contact              /zh-CN/contact              /en/contact
```

`/` (root) serves a Nuxt SPA fallback (`200.html` → `index.html`) that detects the
browser language and redirects to the matching locale (default `/zh-TW/`).

## Develop

```bash
npm install
npm run dev          # → http://localhost:3000
```

The dev server serves all three locales with HMR for components, content, and i18n
strings.

## Build

```bash
npm run generate     # → .output/public/
```

`generate` runs `nuxi generate` then copies `200.html` to `index.html` so the root
URL has a working entry point on Cloudflare Pages (which otherwise 404s when no
explicit `index.html` exists at the root).

Output is approximately **5 MB** of HTML, hashed JS/CSS bundles in `_nuxt/`,
sitemaps under `__sitemap__/` and `sitemap_index.xml`, plus an `og-default.png`
fallback OG image.

## Deploy

See `docs/deployment.md` — manual `npx wrangler deploy` to Cloudflare Pages
(Workers Static Assets) configured via `wrangler.jsonc`.

## Project Structure

```
app/
├── app.vue                 NuxtLayout + NuxtPage
├── layouts/default.vue     Header + slot + Footer
├── pages/                  11 page templates (i18n auto-prefixes routes)
├── components/
│   ├── ui/                 shadcn-vue (do not hand-edit)
│   ├── layout/             AppHeader, AppFooter, NavMenu, LangSwitcher, MobileDrawer
│   ├── hero/               HeroBanner, HeroParticles, InfinityLogoSVG
│   ├── sections/           SectionContainer, FeatureCard, SolutionCard, CTASection, StatNumber
│   └── motion/             FadeInUp, ScrollReveal, TypeWriter
├── composables/
│   ├── useMailto.ts        mailto builder + alliance/pitchDeck/agent presets
│   └── usePageSeo.ts       useSeoMeta wrapper
├── lib/utils.ts            shadcn `cn()` helper
└── assets/css/tailwind.css Tailwind layers + design tokens

content/
├── zh-TW/{solutions/{golf,ski,vision}.md, partners.md, investors.md}
├── zh-CN/  (same structure)
└── en/     (same structure)

i18n/locales/
├── zh-TW.json              UI strings (nav/cta/site/home/footer/lang)
├── zh-CN.json
└── en.json

ref/                        Brand assets (banner PNGs + BM.md business model)
docs/superpowers/           Spec, implementation plan, deployment runbook
```

## Design System

Deep-space tech aesthetic, dark only. Tokens in `app/assets/css/tailwind.css`:

| Role | Token |
|---|---|
| Deep background | `bg-bg-deep` (#0a1228) |
| Base background | `bg-bg-base` (#0d1b3a) |
| Elevated card | `bg-bg-elevated` (#1a2a52) |
| Glass surface | `.glass`, `.glass-card` |
| Accent (glow) | `accent-glow` (#3aa9ff) |
| Accent (bright) | `accent-bright` (#4dd0ff) |
| Primary text | `text-fg-primary` |
| Glow utilities | `.text-glow`, `.text-gradient`, `.btn-glow`, `.shadow-glow*` |
| Tech grid | `.grid-tech` |
| Container | `.container-tight` (max-w-7xl, padded) |

Custom keyframes: `pulse-glow`, `orbit`, `particle`, `draw-line`. All animations
respect `prefers-reduced-motion: reduce`.

## Maintenance

**Updating content:**
- UI strings (buttons, nav, CTAs): edit `i18n/locales/{locale}.json`
- Long-form copy (solutions, partners, investors): edit `content/{locale}/*.md`
- Page layouts: edit `app/pages/*.vue`
- Components: edit `app/components/**/*.vue`

**shadcn-vue components:**
Files in `app/components/ui/` are owned by the shadcn-vue CLI — do not hand-edit.
To add more, use `npx shadcn-vue@latest add <component>`.

**Email contact point:**
`jeff@infiag.com` is hard-coded in `app/composables/useMailto.ts`. Change there to
update every CTA across the site.

## Documentation

- Design spec: `docs/superpowers/specs/2026-05-03-infiag-static-site-design.md`
- Implementation plan: `docs/superpowers/plans/2026-05-03-infiag-static-site-implementation.md`
- Deployment runbook: `docs/deployment.md`

## License

Proprietary — © 2026 無限智能股份有限公司. All rights reserved.
