/** Layer toggles for `/explore-3d-experimental` only — maps to Cesium surface + entity labels (not 2D atlas semantics). */
export type Explore3dLayerId = "surface" | "labels"

export type Explore3dLayerOption = {
  id: Explore3dLayerId
  label: string
  description: string
}

export const explore3dLayerOptions: Explore3dLayerOption[] = [
  {
    id: "surface",
    label: "Moon surface",
    description:
      "Cesium Ion Moon 3D Tiles when a token is set; otherwise a textured globe (local color + relief atlas).",
  },
  {
    id: "labels",
    label: "Labels",
    description:
      "Apollo site names. Far out: selected only. Mid range: selected plus sites near the center of view. Close: all sites.",
  },
]
