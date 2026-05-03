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

   ```bash
   npm run generate
   ```

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
     ```bash
     cd .output/public
     find . -type f | while read f; do
       wrangler r2 object put "infiag-com-prod/${f#./}" --file "$f"
     done
     ```

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
