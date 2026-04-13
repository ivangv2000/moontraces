/** Approximate centroids for orientation — paired with Apollo landing geography. */
export type LunarAtlasRegionLabel = {
  id: string
  name: string
  longitude: number
  latitude: number
}

export const lunarAtlasRegionLabels: LunarAtlasRegionLabel[] = [
  { id: "mare-tranquillitatis", name: "Mare Tranquillitatis", longitude: 18, latitude: 9 },
  { id: "oceanus-procellarum", name: "Oceanus Procellarum", longitude: -54, latitude: 20 },
  { id: "mare-imbrium", name: "Mare Imbrium", longitude: -8, latitude: 34 },
  { id: "fra-mauro", name: "Fra Mauro", longitude: -19, latitude: -4 },
  { id: "palus-putredinis", name: "Palus Putredinis", longitude: 1.5, latitude: 24.5 },
  { id: "descartes", name: "Descartes highlands", longitude: 16, latitude: -10 },
  { id: "taurus-littrow", name: "Taurus–Littrow", longitude: 30, latitude: 21 },
  { id: "copernicus", name: "Copernicus", longitude: -20.08, latitude: 10.12 },
  { id: "tycho", name: "Tycho", longitude: -11.36, latitude: -43.3 },
]
