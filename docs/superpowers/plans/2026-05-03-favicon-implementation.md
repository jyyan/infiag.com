# Favicon Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the Infinity Agentic favicon set — two SVG sources, a Node generator producing 5 deliverables in `public/`, and Nuxt head wiring — per spec `2026-05-03-favicon-design.md`.

**Architecture:** Two committed SVG sources (transparent + deep-navy tile) drive a one-shot Node ESM script (`sharp` + `png-to-ico`) that emits `favicon.svg`, `favicon.ico` (16/32/48), `apple-touch-icon.png` (180), and `icon-{192,512}.png` to `public/`. `nuxt.config.ts` wires SVG + ICO + apple-touch-icon into `app.head.link`. No tests exist in this project (per existing site spec §1.4 YAGNI); verification is file-existence + size check + visual smoke test in `npm run dev`.

**Tech Stack:** Node ESM, sharp, png-to-ico, Nuxt 4. SVG hand-authored.

---

## File Structure

| Path | Action | Responsibility |
|---|---|---|
| `app/assets/brand/favicon-source.svg` | Create | ∞ figure-8 path on transparent bg, 64×64 viewBox, gradient + glow filter — single source of truth for the glyph geometry |
| `app/assets/brand/favicon-tile.svg` | Create | Same ∞ scaled into a deep-navy 512×512 tile, ∞ at 56% width inside maskable safe zone |
| `scripts/generate-favicons.mjs` | Create | Pure ESM script: reads both SVGs, emits 5 files to `public/`, prints sizes |
| `package.json` | Modify | Add `sharp`, `png-to-ico` to `devDependencies`; add `"favicon"` npm script |
| `nuxt.config.ts` | Modify | Replace single ICO link with SVG + ICO + apple-touch-icon link entries |
| `public/favicon.ico` | Replace | Currently default Nuxt ICO; will be overwritten by generator |
| `public/favicon.svg` | Create (via generator) | |
| `public/apple-touch-icon.png` | Create (via generator) | |
| `public/icon-192.png` | Create (via generator) | |
| `public/icon-512.png` | Create (via generator) | |

---

## Task 1: Create the transparent ∞ SVG source

**Files:**
- Create: `app/assets/brand/favicon-source.svg`

- [ ] **Step 1: Create the brand assets directory**

```bash
mkdir -p app/assets/brand
```

- [ ] **Step 2: Write the transparent ∞ SVG**

Create `app/assets/brand/favicon-source.svg` with this exact content:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="infGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3aa9ff"/>
      <stop offset="1" stop-color="#4dd0ff"/>
    </linearGradient>
    <filter id="infGlow" x="-30%" y="-30%" width="160%" height="160%">
      <feGaussianBlur stdDeviation="1.2" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <path
    d="M 14 32 C 14 22, 22 22, 32 32 C 42 42, 50 42, 50 32 C 50 22, 42 22, 32 32 C 22 42, 14 42, 14 32 Z"
    fill="none"
    stroke="url(#infGrad)"
    stroke-width="6.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    filter="url(#infGlow)"
  />
</svg>
```

Path explanation: a true figure-8 that crosses itself diagonally at `(32, 32)`. Each cubic Bézier sweeps one quarter of a loop. Stroke crosses produce the natural taper / 3D-cross effect at center.

- [ ] **Step 3: Visually verify the SVG**

Run: `xdg-open app/assets/brand/favicon-source.svg` (or open the file in any browser).
Expected: clean ∞ symbol, smooth strokes, cyan-blue gradient left→right, soft outer glow. The two loops cross at the center forming a small "X" of overlapping strokes.

If it looks wrong (squished loops, broken at center, no gradient): the path or gradient ID is mistyped. Fix and re-verify.

- [ ] **Step 4: Commit**

```bash
git add app/assets/brand/favicon-source.svg
git commit -m "feat(brand): add transparent infinity favicon source SVG"
```

---

## Task 2: Create the deep-navy tile SVG source

**Files:**
- Create: `app/assets/brand/favicon-tile.svg`

- [ ] **Step 1: Write the tile SVG**

Create `app/assets/brand/favicon-tile.svg` with this exact content:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="infGradTile" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3aa9ff"/>
      <stop offset="1" stop-color="#4dd0ff"/>
    </linearGradient>
    <filter id="infGlowTile" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="10" result="blur"/>
      <feMerge>
        <feMergeNode in="blur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
  <rect width="512" height="512" fill="#0a1228"/>
  <path
    d="M 112 256 C 112 176, 176 176, 256 256 C 336 336, 400 336, 400 256 C 400 176, 336 176, 256 256 C 176 336, 112 336, 112 256 Z"
    fill="none"
    stroke="url(#infGradTile)"
    stroke-width="52"
    stroke-linecap="round"
    stroke-linejoin="round"
    filter="url(#infGlowTile)"
  />
</svg>
```

Geometry: same path scaled 8×, centered. ∞ spans `x = 112 → 400` (width 288, ≈ 56% of 512), comfortably inside the 80% maskable safe zone (51.2 → 460.8). Stroke 52 (8 × 6.5). Glow `stdDeviation` 10 (8 × 1.2 ≈ 10).

- [ ] **Step 2: Visually verify**

Run: `xdg-open app/assets/brand/favicon-tile.svg` (or open in browser).
Expected: deep navy `#0a1228` square fully covering, with the cyan-blue ∞ centered, glowing softly. ∞ should NOT touch the edges — visible margin on all four sides.

- [ ] **Step 3: Commit**

```bash
git add app/assets/brand/favicon-tile.svg
git commit -m "feat(brand): add navy tile infinity favicon source SVG"
```

---

## Task 3: Install generator dependencies and add npm script

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install sharp and png-to-ico as devDependencies**

Run from project root:

```bash
npm install --save-dev sharp@^0.33.0 png-to-ico@^2.1.8
```

Expected output: install completes; `package.json` `devDependencies` now contains both packages; `node_modules/sharp` and `node_modules/png-to-ico` exist. Some platform-specific binary download messages from `sharp` are normal.

- [ ] **Step 2: Add the favicon script to package.json**

Modify `package.json` `scripts` block. Find:

```json
"scripts": {
  "build": "nuxt build",
  "dev": "nuxt dev",
  "generate": "nuxt generate",
  "preview": "nuxt preview",
  "postinstall": "nuxt prepare"
},
```

Replace with:

```json
"scripts": {
  "build": "nuxt build",
  "dev": "nuxt dev",
  "generate": "nuxt generate",
  "preview": "nuxt preview",
  "postinstall": "nuxt prepare",
  "favicon": "node scripts/generate-favicons.mjs"
},
```

- [ ] **Step 3: Verify `npm run favicon` is recognized**

Run: `npm run favicon`
Expected: fails because `scripts/generate-favicons.mjs` does not exist yet. The error should be `Error: Cannot find module '.../scripts/generate-favicons.mjs'` or similar — confirming npm found the script entry.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add sharp and png-to-ico for favicon generation"
```

---

## Task 4: Write the favicon generator script

**Files:**
- Create: `scripts/generate-favicons.mjs`
- Replace (via running the script): `public/favicon.ico`
- Create (via running the script): `public/favicon.svg`, `public/apple-touch-icon.png`, `public/icon-192.png`, `public/icon-512.png`

- [ ] **Step 1: Create the scripts directory**

```bash
mkdir -p scripts
```

- [ ] **Step 2: Write the generator**

Create `scripts/generate-favicons.mjs` with this exact content:

```js
import { readFile, writeFile, copyFile, mkdir, stat } from 'node:fs/promises'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const SRC = resolve(ROOT, 'app/assets/brand')
const OUT = resolve(ROOT, 'public')

const DENSITY = 384

async function logSize(label, path) {
  const s = await stat(path)
  console.log(`  ${label.padEnd(28)} ${(s.size / 1024).toFixed(1).padStart(6)} KB`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  const sourceSvgPath = resolve(SRC, 'favicon-source.svg')
  const tileSvgPath = resolve(SRC, 'favicon-tile.svg')
  const sourceSvg = await readFile(sourceSvgPath)
  const tileSvg = await readFile(tileSvgPath)

  console.log('Generating favicons →')

  // 1. favicon.svg (direct copy of transparent source)
  await copyFile(sourceSvgPath, resolve(OUT, 'favicon.svg'))
  await logSize('favicon.svg', resolve(OUT, 'favicon.svg'))

  // 2. favicon.ico — 16/32/48 multi-resolution from transparent source
  const icoSizes = [16, 32, 48]
  const icoPngs = await Promise.all(
    icoSizes.map(s =>
      sharp(sourceSvg, { density: DENSITY })
        .resize(s, s, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png()
        .toBuffer(),
    ),
  )
  const icoBuf = await pngToIco(icoPngs)
  await writeFile(resolve(OUT, 'favicon.ico'), icoBuf)
  await logSize('favicon.ico', resolve(OUT, 'favicon.ico'))

  // 3-5. PNG tiles from navy tile source
  const pngTargets = [
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'icon-192.png', size: 192 },
    { name: 'icon-512.png', size: 512 },
  ]
  for (const { name, size } of pngTargets) {
    const buf = await sharp(tileSvg, { density: DENSITY })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer()
    await writeFile(resolve(OUT, name), buf)
    await logSize(name, resolve(OUT, name))
  }

  console.log('Done.')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
```

Key choices:
- `density: 384` rasterizes the SVG at high DPI before resizing → crisp small icons
- `compressionLevel: 9` shrinks PNGs without quality loss
- `fit: 'contain'` with transparent background preserves transparency in `favicon.ico`

- [ ] **Step 3: Run the generator**

```bash
npm run favicon
```

Expected output (sizes are illustrative, not exact):

```
Generating favicons →
  favicon.svg                     0.7 KB
  favicon.ico                     5.2 KB
  apple-touch-icon.png            6.1 KB
  icon-192.png                    6.7 KB
  icon-512.png                   18.3 KB
Done.
```

If sharp throws about missing platform binary, run `npm rebuild sharp` and retry.

- [ ] **Step 4: Verify file sizes against spec §4.1 targets**

Run: `ls -la public/favicon.ico public/favicon.svg public/apple-touch-icon.png public/icon-192.png public/icon-512.png`

Targets (spec §4.1):
- `favicon.ico` < 10 KB
- `favicon.svg` < 3 KB
- `apple-touch-icon.png` < 20 KB
- `icon-192.png` < 25 KB
- `icon-512.png` < 50 KB

If any file exceeds its target by more than 20%, investigate (likely `compressionLevel` or `density` mistuned). Document any deliberate overshoot.

- [ ] **Step 5: Visually verify each output**

Run: `xdg-open public/favicon.svg` — clean transparent ∞.
Run: `xdg-open public/apple-touch-icon.png` — navy square + centered ∞ with margin.
Run: `xdg-open public/icon-512.png` — same as apple-touch-icon at higher res.
Run: `xdg-open public/favicon.ico` — should display 48×48 transparent ∞.

If any output is broken (e.g. ∞ truncated, wrong colors, edges clipped): adjust SVG source or generator and re-run `npm run favicon`.

- [ ] **Step 6: Commit script and outputs together**

```bash
git add scripts/generate-favicons.mjs public/favicon.svg public/favicon.ico public/apple-touch-icon.png public/icon-192.png public/icon-512.png
git commit -m "feat(brand): generate favicon set from SVG sources"
```

---

## Task 5: Wire favicons into Nuxt head and smoke test

**Files:**
- Modify: `nuxt.config.ts:16-21`

- [ ] **Step 1: Update `nuxt.config.ts` head link entries**

Find the existing `link` array in `nuxt.config.ts` (currently lines 16–21):

```ts
link: [
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&family=JetBrains+Mono:wght@400;700&display=swap' },
],
```

Replace with:

```ts
link: [
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
  { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@700;900&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Serif+SC:wght@700;900&family=JetBrains+Mono:wght@400;700&display=swap' },
],
```

(Order matters: SVG icon first so modern browsers prefer it; ICO acts as fallback.)

- [ ] **Step 2: Clear stale Nuxt cache**

```bash
rm -rf .nuxt
```

(Pre-emptive — avoids the same `.nuxt` cache issue that hit during spec drafting.)

- [ ] **Step 3: Start dev server and check head**

```bash
npm run dev
```

Wait for server ready message (`Local: http://localhost:3000/`).

In a browser, open `http://localhost:3000/`. Open DevTools → Elements → `<head>`. Expected three icon-related lines in head:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
```

The browser tab should show the cyan-blue ∞ (not the default Nuxt logo).

- [ ] **Step 4: Confirm static asset routes serve**

In a browser, open each URL and verify the file renders:
- `http://localhost:3000/favicon.svg`
- `http://localhost:3000/favicon.ico`
- `http://localhost:3000/apple-touch-icon.png`
- `http://localhost:3000/icon-192.png`
- `http://localhost:3000/icon-512.png`

Each should return the expected image (no 404, no broken display).

Stop the dev server with Ctrl-C.

- [ ] **Step 5: Run a full static build to confirm CI parity**

```bash
npm run generate
```

Expected: build completes without errors. Then verify all five files are in the prerendered output:

```bash
ls -la .output/public/favicon.svg .output/public/favicon.ico .output/public/apple-touch-icon.png .output/public/icon-192.png .output/public/icon-512.png
```

Expected: all five files exist with sizes matching `public/` originals.

- [ ] **Step 6: Commit**

```bash
git add nuxt.config.ts
git commit -m "feat(seo): wire favicon SVG and apple-touch-icon into head"
```

---

## Self-Review Notes

**Spec coverage check (against `2026-05-03-favicon-design.md`):**
- §3.1 transparent SVG → Task 1 ✓
- §3.2 tile SVG → Task 2 ✓
- §4 five deliverables → Task 4 step 6 ✓
- §4.1 size targets → Task 4 step 4 ✓
- §5.1 deps → Task 3 step 1 ✓
- §5.2 generator → Task 4 step 2 ✓
- §5.3 npm script → Task 3 step 2 ✓
- §6 Nuxt head wiring → Task 5 step 1 ✓
- §8 acceptance criteria 1–6 → spread across Task 4 step 5 + Task 5 steps 3–5 ✓

**Naming consistency:** generator file is `scripts/generate-favicons.mjs` and npm script is `favicon` everywhere (singular `favicon` script wraps plural generator — intentional, shorter to type).

**Replacement of existing `public/favicon.ico`:** Task 4 step 6 stages the new `favicon.ico` which overwrites the existing default Nuxt one; no separate delete step needed since `git add` of the modified file captures the replacement.
