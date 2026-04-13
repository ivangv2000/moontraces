import ImageLayer from "ol/layer/Image"
import Static from "ol/source/ImageStatic"
import {
  LUNAR_ATLAS_COLOR_URL,
  LUNAR_ATLAS_EXTENT_DEG,
  LUNAR_ATLAS_RELIEF_URL,
} from "@/lib/map/lunar-atlas-config"

const COLOR_ATTR =
  '<a href="https://www.nasa.gov/" target="_blank" rel="noopener noreferrer">NASA</a> / LROC-based color basemap'

const RELIEF_ATTR =
  '<a href="https://images.nasa.gov/details/PIA15133" target="_blank" rel="noopener noreferrer">NASA Goddard — LOLA (PIA15133)</a>'

const extent = [...LUNAR_ATLAS_EXTENT_DEG] as [number, number, number, number]

export function createLunarColorImageLayer(): ImageLayer<Static> {
  return new ImageLayer({
    className: "moon-atlas-color",
    source: new Static({
      url: LUNAR_ATLAS_COLOR_URL,
      projection: "EPSG:4326",
      imageExtent: extent,
      crossOrigin: "anonymous",
      attributions: COLOR_ATTR,
    }),
    zIndex: 0,
  })
}

export function createLunarReliefImageLayer(): ImageLayer<Static> {
  return new ImageLayer({
    className: "moon-atlas-relief",
    source: new Static({
      url: LUNAR_ATLAS_RELIEF_URL,
      projection: "EPSG:4326",
      imageExtent: extent,
      crossOrigin: "anonymous",
      attributions: RELIEF_ATTR,
    }),
    zIndex: 1,
  })
}
