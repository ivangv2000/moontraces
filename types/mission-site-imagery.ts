/**
 * Evidence-first Site Detail imagery: regional context vs. tight LROC hardware / traverse evidence.
 * `tileSourceKind: 'image'` uses OpenSeadragon plain image + client-side pyramid; `'dzi'` for future pyramids.
 */

export type MissionSiteTileSourceKind = "image" | "dzi"

/** One raster used in Site Detail (context or evidence slot). */
export interface MissionSiteImageSlot {
  imageUrl: string
  tileSourceKind: MissionSiteTileSourceKind
  dziUrl?: string
  title: string
  caption: string
  attribution: string
  /** Primary NASA / LROC product or gallery page for this frame */
  officialSourceUrl: string
  /** Optional file page (e.g. Wikimedia Commons) */
  catalogUrl?: string
}

export interface MissionSiteImagery {
  missionSlug: string
  /** Heading for the Site detail imagery block */
  title: string
  contextImage: MissionSiteImageSlot
  /** Strongest tight LROC evidence view; null if not yet curated separately from context */
  evidenceImage: MissionSiteImageSlot | null
  /**
   * When `evidenceImage` is null, preferred URL for the empty-state “official source” link
   * (e.g. LROC featured site). Falls back to `contextImage.officialSourceUrl` if omitted.
   */
  evidencePendingOfficialUrl?: string
  /** Dataset / curation notes (e.g. pending higher-res NAC) */
  notes?: string
}
