/**
 * Curated callouts for Site Detail OpenSeadragon imagery.
 * Coordinates are normalized to the raster (0–1), origin top-left.
 *
 * Annotations are registered per exact `MissionSiteImageSlot.imageUrl` and only
 * render when that entry is marked `validated` (see data/mission-site-annotations.ts).
 */

export type MissionSiteAnnotationType =
  | "hardware"
  | "tracks"
  | "traverse"
  | "experiment"
  | "landmark"

export interface MissionSiteAnnotation {
  id: string
  x: number
  y: number
  label: string
  description?: string
  type: MissionSiteAnnotationType
}

/**
 * One annotation set for a single raster (`imageUrl` in mission-site-imagery).
 * Overlays render only when `validated` is true and `annotations` is non-empty.
 */
export interface MissionSiteRasterAnnotationSet {
  validated: boolean
  /** Optional curator note (not shown in UI). */
  curationNote?: string
  annotations: MissionSiteAnnotation[]
}
