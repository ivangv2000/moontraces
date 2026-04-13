import type { Metadata } from 'next'
import { Explorer2dClient } from '@/components/moon/explorer-2d-client'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'

export const metadata: Metadata = definePageMetadata({
  title: 'Explore the Moon',
  description:
    'Interactive lunar atlas of all six Apollo landing sites. Compare regional context and coordinates, then open LRO-scale site detail for hardware, imagery, and cited sources.',
  pathname: '/explore',
})

export default function ExplorePage() {
  return <Explorer2dClient />
}
