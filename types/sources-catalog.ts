export type SourceCatalogGroupId =
  | 'nasa'
  | 'lroc-asu'
  | 'ilrs-llr'
  | 'apollo-documentation'
  | 'mission-imagery'

/** High-level kind of resource (shown as a badge). */
export type SourceEntryType =
  | 'portal'
  | 'dataset'
  | 'archive'
  | 'documentation'
  | 'images'
  | 'data-access'
  | 'program'
  | 'transcripts'

export interface SourceCatalogEntry {
  id: string
  title: string
  institution: string
  description: string
  sourceType: SourceEntryType
  url: string
  /** Apollo landing missions this entry most directly supports (slugs). */
  missionSlugs?: string[]
  /** Free-form filters, e.g. "LLR", "NAC", "Samples". */
  tags?: string[]
  group: SourceCatalogGroupId
}

export interface SourcesPageCopy {
  hero: {
    label: string
    title: string
    description: string
  }
  intro: {
    paragraphs: string[]
  }
}
