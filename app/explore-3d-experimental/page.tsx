import type { Metadata } from 'next'
import { Explorer3dExperimentalClient } from '@/components/moon/experimental/explorer-3d-client'

export const metadata: Metadata = {
  title: '3D Moon (experimental)',
  description: 'Experimental 3D view of the Moon. The main explorer remains the 2D atlas at /explore.',
  robots: { index: false, follow: false },
}

export default function Explore3dExperimentalPage() {
  return <Explorer3dExperimentalClient />
}
