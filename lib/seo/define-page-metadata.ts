import type { Metadata } from 'next'
import { SITE_NAME, absoluteUrl } from '@/lib/site-config'

type DefinePageMetadataOptions = {
  /** Segment before the site name (applied via root `title.template`). Use `SITE_NAME` for the home page only. */
  title: string
  description: string
  pathname: string
}

/**
 * Consistent canonical, Open Graph, and Twitter metadata for marketing routes.
 * Home: pass `title: SITE_NAME` to emit a single absolute title (no template suffix).
 */
export function definePageMetadata({
  title,
  description,
  pathname,
}: DefinePageMetadataOptions): Metadata {
  const canonical = absoluteUrl(pathname)
  const pageTitle: Metadata['title'] =
    title === SITE_NAME ? { absolute: SITE_NAME } : title
  const sharingTitle = title === SITE_NAME ? SITE_NAME : `${title} | ${SITE_NAME}`

  return {
    title: pageTitle,
    description,
    alternates: { canonical },
    openGraph: {
      title: sharingTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: sharingTitle,
      description,
    },
  }
}
