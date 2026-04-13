import Feature from "ol/Feature"
import Point from "ol/geom/Point"
import VectorLayer from "ol/layer/Vector"
import VectorSource from "ol/source/Vector"
import { Fill, Stroke, Style, Circle as CircleStyle, Text } from "ol/style"
import { lunarAtlasRegionLabels } from "@/data/lunar-atlas-region-labels"
import { missions } from "@/data/missions"

const missionBaseStyle = new Style({
  zIndex: 2,
  image: new CircleStyle({
    radius: 7,
    fill: new Fill({ color: "oklch(0.62 0.11 220 / 0.9)" }),
    stroke: new Stroke({ color: "oklch(0.96 0 0 / 0.72)", width: 2 }),
  }),
})

const missionHoverStyle = new Style({
  zIndex: 2,
  image: new CircleStyle({
    radius: 8.5,
    fill: new Fill({ color: "oklch(0.68 0.14 220 / 0.95)" }),
    stroke: new Stroke({ color: "oklch(0.99 0.02 220 / 0.88)", width: 2.25 }),
  }),
})

/** Soft glow so the active site reads clearly against mare and highlands. */
const missionSelectedHaloStyle = new Style({
  zIndex: 1,
  image: new CircleStyle({
    radius: 16,
    fill: new Fill({ color: "oklch(0.58 0.14 220 / 0.2)" }),
    stroke: new Stroke({ color: "oklch(0.82 0.1 220 / 0.45)", width: 1.25 }),
  }),
})

const missionSelectedStyle = new Style({
  zIndex: 3,
  image: new CircleStyle({
    radius: 11,
    fill: new Fill({ color: "oklch(0.66 0.2 220 / 0.99)" }),
    stroke: new Stroke({ color: "oklch(0.99 0.03 220 / 0.98)", width: 3 }),
  }),
})

function missionLabelStyle(name: string, emphasis: "base" | "hover" | "selected"): Style {
  const selected = emphasis === "selected"
  const hover = emphasis === "hover"
  return new Style({
    text: new Text({
      text: name.replace(/^Apollo /, "A"),
      font: selected
        ? '700 12.5px ui-sans-serif, system-ui, sans-serif'
        : hover
          ? '600 11.5px ui-sans-serif, system-ui, sans-serif'
          : '600 11px ui-sans-serif, system-ui, sans-serif',
      fill: new Fill({
        color: selected
          ? "oklch(0.99 0 0 / 0.99)"
          : hover
            ? "oklch(0.97 0.01 220 / 0.97)"
            : "oklch(0.93 0 0 / 0.93)",
      }),
      stroke: new Stroke({
        color: "oklch(0.1 0.02 260 / 0.92)",
        width: selected ? 4 : hover ? 3.25 : 3,
      }),
      offsetY: selected ? -19 : hover ? -16.5 : -15,
      padding: [2, 5, 2, 5],
    }),
    zIndex: selected ? 5 : hover ? 3 : 2,
  })
}

function regionLabelStyle(name: string): Style {
  return new Style({
    text: new Text({
      text: name,
      font: '600 10.5px ui-sans-serif, system-ui, sans-serif',
      fill: new Fill({ color: "oklch(0.82 0.05 260 / 0.9)" }),
      stroke: new Stroke({ color: "oklch(0.11 0.02 260 / 0.88)", width: 3.5 }),
      padding: [2, 4, 2, 4],
    }),
    zIndex: 0,
  })
}

export type AnnotationFeatureProps = {
  kind: "mission" | "region"
  slug?: string
  name: string
}

export type LunarAtlasAnnotationState = {
  selectedSlug: string
  /** Mission under cursor (pointer); refines marker/label without changing selection. */
  hoveredSlug: string | null
}

export function buildLunarAtlasAnnotationFeatures(): Feature<Point>[] {
  const out: Feature<Point>[] = []

  for (const m of missions) {
    const f = new Feature<Point>(new Point([m.landingSite.longitude, m.landingSite.latitude]))
    f.setProperties({ kind: "mission" as const, slug: m.slug, name: m.name })
    out.push(f)
  }

  for (const r of lunarAtlasRegionLabels) {
    const f = new Feature<Point>(new Point([r.longitude, r.latitude]))
    f.setProperties({ kind: "region" as const, name: r.name })
    out.push(f)
  }

  return out
}

export function createLunarAtlasAnnotationsLayer(
  source: VectorSource<Feature<Point>>,
  getState: () => LunarAtlasAnnotationState,
): VectorLayer<VectorSource<Feature<Point>>> {
  return new VectorLayer({
    className: "moon-atlas-annotations",
    source,
    zIndex: 4,
    style: (feature) => {
      const { selectedSlug, hoveredSlug } = getState()
      const kind = feature.get("kind") as AnnotationFeatureProps["kind"]
      const name = feature.get("name") as string
      const slug = feature.get("slug") as string | undefined

      if (kind === "mission") {
        const selected = Boolean(slug && selectedSlug === slug)
        const hovered = Boolean(slug && hoveredSlug === slug && !selected)
        const styles: Style[] = []
        if (selected) {
          styles.push(missionSelectedHaloStyle, missionSelectedStyle)
          styles.push(missionLabelStyle(name, "selected"))
        } else {
          styles.push(hovered ? missionHoverStyle : missionBaseStyle)
          styles.push(missionLabelStyle(name, hovered ? "hover" : "base"))
        }
        return styles
      }

      if (kind === "region") {
        return regionLabelStyle(name)
      }

      return missionBaseStyle
    },
    declutter: false,
    updateWhileAnimating: true,
    updateWhileInteracting: true,
  })
}
