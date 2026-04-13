# Deployment — moontraces.com

Public **site name**: **Traces on the Moon** (branding unchanged).  
Canonical **production origin**: **https://moontraces.com** (apex, no trailing slash).

## Required environment variable

| Variable | Value (production) |
|----------|--------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://moontraces.com` |

Set this on your hosting provider for the **production** environment (e.g. Vercel → Project → Settings → Environment Variables → Production).

- Do **not** add a trailing slash.
- Use **https**.
- This value drives `metadataBase`, per-page canonicals (`definePageMetadata`), `sitemap.xml`, the `Sitemap:` line in `robots.txt`, and JSON-LD absolute URLs (`absoluteUrl` / `getSiteUrl` in `lib/site-config.ts`).

## Optional: previews

If `NEXT_PUBLIC_SITE_URL` is **unset**, the app falls back to `VERCEL_URL` on Vercel (useful for preview deployments). For previews you may leave it unset, or set `NEXT_PUBLIC_SITE_URL` per environment to match a preview domain.

## After deployment — quick checks

1. **`https://moontraces.com/robots.txt`** — `Sitemap:` should list `https://moontraces.com/sitemap.xml`.
2. **`https://moontraces.com/sitemap.xml`** — URLs should start with `https://moontraces.com`.
3. **View page source** on the home page — `<link rel="canonical"` should be `https://moontraces.com/`.
4. **Google Search Console** — add the `https://moontraces.com` property and submit the sitemap.

## DNS and HTTPS (outside this repo)

- Point the **apex** domain `moontraces.com` (and optionally `www`) to your host; enable HTTPS at the edge.
- **www ↔ apex** redirects are **not** defined in this app. Configure canonical host redirects only in **Vercel** (Domains) and/or **Cloudflare** (or your DNS/CDN) so they do not conflict with each other or with “Always Use HTTPS” / flexible SSL modes that can cause redirect loops.

## Code reference

- `lib/site-config.ts` — `getSiteUrl()`, `absoluteUrl()`, `CANONICAL_PRODUCTION_ORIGIN`
- `app/layout.tsx` — `metadataBase`
- `app/sitemap.ts`, `app/robots.ts`
- `lib/seo/define-page-metadata.ts` — canonical + Open Graph `url`
