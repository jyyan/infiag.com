# Deploying to Cloudflare Pages

This site is deployed to Cloudflare Pages (Workers Static Assets — see
`wrangler.jsonc` at the repo root). No CI/CD is set up; deploys are run
manually with `wrangler`.

## One-Time Setup

1. Install wrangler: `npm install -g wrangler`
2. Authenticate: `wrangler login`
3. Map the custom domain `infiag.com` to the Worker / Pages project in the
   Cloudflare dashboard (DNS handled there).

## Each Deployment

1. From repo root, build the static site:

   ```bash
   npm run generate
   ```

   This produces `.output/public/` with all 24 localized HTML pages,
   sitemap.xml, robots.txt, and hashed assets in `_nuxt/`.

2. Deploy via wrangler — it reads `wrangler.jsonc` and uploads
   `.output/public/` as static assets:

   ```bash
   npx wrangler deploy
   ```

3. Visit `https://infiag.com/` to verify.

## Cache Invalidation

Cloudflare's CDN caches aggressively. After deploying:
- New JS/CSS in `_nuxt/` use hashed filenames (auto-busted).
- HTML files share the same path — purge them via:
  - Cloudflare Dashboard → Caching → Configuration → **Purge Everything**
    (or specific URLs).

## Rollback

- Re-checkout the prior git commit.
- Run `npm run generate` again.
- Re-run `npx wrangler deploy`.
