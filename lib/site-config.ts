/**
 * Canonical site identity and absolute URLs for metadata, sitemap, robots, and JSON-LD.
 *
 * Production (moontraces.com): set `NEXT_PUBLIC_SITE_URL` to the same value as `CANONICAL_PRODUCTION_ORIGIN`
 * so canonicals, Open Graph URLs, and sitemap entries use https://moontraces.com (no trailing slash).
 *
 * Fallbacks when unset:
 * - `VERCEL_URL` (e.g. preview deployments) — use for previews, or override with `NEXT_PUBLIC_SITE_URL` per environment.
 * - Local dev: `http://localhost:3000`
 */
export const SITE_NAME = 'Traces on the Moon'

/** Public marketing domain — site title remains "Traces on the Moon". */
export const CANONICAL_PRODUCTION_ORIGIN = 'https://moontraces.com'

export const SITE_TAGLINE =
  'Editorial guide to official Apollo evidence: landing sites, LROC imagery, retroreflectors, and NASA archives.'

export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, '')
  if (explicit) return explicit
  const vercel = process.env.VERCEL_URL?.trim().replace(/\/$/, '')
  if (vercel) return vercel.startsWith('http') ? vercel : `https://${vercel}`
  return 'http://localhost:3000'
}

export function absoluteUrl(pathname: string): string {
  const base = getSiteUrl()
  if (!pathname || pathname === '/') return `${base}/`
  const p = pathname.startsWith('/') ? pathname : `/${pathname}`
  return `${base}${p}`
}
