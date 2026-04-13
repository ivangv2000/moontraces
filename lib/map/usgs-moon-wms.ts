/**
 * USGS Astrogeology planetary WMS — Moon simple cylindrical stack.
 * @see https://planetarymaps.usgs.gov/ — GetCapabilities for `moon_simp_cyl.map`
 *
 * **Note:** `/explore` Global Moon no longer uses this module; the live atlas is local
 * (`lib/map/lunar-atlas-*.ts`). Kept for reference or future WMS/WMTS experiments.
 */

import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'

export const USGS_MOON_WMS_BASE = 'https://planetarymaps.usgs.gov/cgi-bin/mapserv'
export const USGS_MOON_MAPFILE = '/maps/earth/moon_simp_cyl.map'

/** WMS `map=` query; trailing `&` so OpenLayers can append KVP params. */
export const USGS_MOON_WMS_URL = `${USGS_MOON_WMS_BASE}?map=${encodeURIComponent(USGS_MOON_MAPFILE)}&`

/** Published layer ids from GetCapabilities (Clementine UV750 v2 global mosaic). */
export const USGS_MOON_LAYER_BASE = 'uv_v2'
/** LRO LOLA shaded relief (good as a subtle “imagery / relief” overlay). */
export const USGS_MOON_LAYER_RELIEF = 'LOLA_steel'
/** Lunar 1M quad chart outlines and labels. */
export const USGS_MOON_LAYER_QUADS = 'Moon1M_Quads'

const USGS_ATTRIBUTION =
  '© <a href="https://www.usgs.gov/centers/astrogeology-science-center" target="_blank" rel="noopener noreferrer">USGS Astrogeology</a> — Lunar WMS'

function createMoonTileWmsSource(layer: string): TileWMS {
  return new TileWMS({
    url: USGS_MOON_WMS_URL,
    params: {
      LAYERS: layer,
      TILED: true,
      FORMAT: 'image/png',
      VERSION: '1.3.0',
    },
    serverType: 'mapserver',
    crossOrigin: 'anonymous',
    attributions: USGS_ATTRIBUTION,
  })
}

export function createMoonBaseLayer(): TileLayer<TileWMS> {
  return new TileLayer({
    source: createMoonTileWmsSource(USGS_MOON_LAYER_BASE),
    className: 'moon-wms-base',
  })
}

export function createMoonReliefOverlayLayer(): TileLayer<TileWMS> {
  return new TileLayer({
    source: createMoonTileWmsSource(USGS_MOON_LAYER_RELIEF),
    opacity: 0.38,
    className: 'moon-wms-relief',
  })
}

export function createMoonLabelsLayer(): TileLayer<TileWMS> {
  return new TileLayer({
    source: createMoonTileWmsSource(USGS_MOON_LAYER_QUADS),
    opacity: 0.85,
    className: 'moon-wms-labels',
  })
}
