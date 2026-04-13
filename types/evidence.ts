export type EvidenceCategoryId =
  | 'orbital-imagery'
  | 'visible-hardware'
  | 'retroreflectors-llr'
  | 'historical-vs-modern'
  | 'nasa-documentation'

export interface EvidenceCatalogImage {
  src: string
  alt: string
}

export interface EvidenceCatalogComparisonImage extends EvidenceCatalogImage {
  caption?: string
}

export interface EvidenceCatalogSource {
  id: string
  label: string
  href: string
}

export interface EvidenceCatalogEntry {
  id: string
  title: string
  summary: string
  category: EvidenceCategoryId
  missionSlugs: string[]
  image: EvidenceCatalogImage
  /** Optional second frame (e.g. historical vs modern). */
  comparisonImage?: EvidenceCatalogComparisonImage
  sources: EvidenceCatalogSource[]
  /** Short line under the primary figure. */
  caption?: string
  /** Optional label under the primary image in a comparison layout. */
  primaryImageCaption?: string
  /** Editorial “so what” — why this line of evidence matters. */
  whatThisProves?: string
  /** Larger treatment within its category section. */
  prominence?: 'standard' | 'spotlight'
}

export interface SourceLink {
  id: string
  label: string
  href: string
  external?: boolean
  description?: string
}
