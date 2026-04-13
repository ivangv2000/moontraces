/**
 * Global Moon atlas (simple cylindrical / equirectangular lon–lat extent).
 * Assets live in `public/moon-atlas/` — see repo attribution in `lunar-atlas-layers.ts`.
 */
export const LUNAR_ATLAS_EXTENT_DEG = [-180, -90, 180, 90] as const

/** Color basemap — LROC-based global texture (three.js reference asset, NASA source data). */
export const LUNAR_ATLAS_COLOR_URL = "/moon-atlas/lunar-color.jpg"

/** Shaded relief — NASA Goddard / LOLA (PIA15133), global cylindrical. */
export const LUNAR_ATLAS_RELIEF_URL = "/moon-atlas/lunar-relief.jpg"
