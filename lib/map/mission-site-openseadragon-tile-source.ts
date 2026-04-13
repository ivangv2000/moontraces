import type { MissionSiteImageSlot } from "@/types/mission-site-imagery"

/**
 * Maps a slot to OpenSeadragon `tileSources`.
 * For DZI: pass the `.dzi` URL string (OSD loads the pyramid).
 */
export function missionSiteImageSlotToOpenSeadragonTileSource(
  slot: MissionSiteImageSlot,
): string | Record<string, unknown> {
  if (slot.tileSourceKind === "dzi" && slot.dziUrl) {
    return slot.dziUrl
  }

  return {
    type: "image",
    url: slot.imageUrl,
    crossOriginPolicy: "Anonymous",
    buildPyramid: true,
  }
}
