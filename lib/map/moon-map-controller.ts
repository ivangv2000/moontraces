import type Map from 'ol/Map'

const MIN_ZOOM = 0
/** Global Moon is an orientation atlas — cap zoom before rasters turn into obvious upscaling. */
const MAX_ZOOM = 5

/** Regional framing when picking a mission (not close-up; Site detail holds evidence). */
const SITE_FOCUS_ZOOM = 4

export function moonZoomToPercent(map: Map): number {
  const z = map.getView().getZoom() ?? MIN_ZOOM
  const t = (z - MIN_ZOOM) / (MAX_ZOOM - MIN_ZOOM)
  const clamped = Math.min(1, Math.max(0, t))
  return Math.round(clamped * 100)
}

export {
  MIN_ZOOM as MOON_MAP_MIN_ZOOM,
  MAX_ZOOM as MOON_MAP_MAX_ZOOM,
  SITE_FOCUS_ZOOM as MOON_MAP_SITE_FOCUS_ZOOM,
}
