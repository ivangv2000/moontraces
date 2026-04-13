"use client"

import type Feature from "ol/Feature"
import Map from "ol/Map"
import View from "ol/View"
import { defaults as defaultControls } from "ol/control"
import { defaults as defaultInteractions } from "ol/interaction"
import type Point from "ol/geom/Point"
import { get as getProjection } from "ol/proj"
import VectorSource from "ol/source/Vector"
import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import {
  buildLunarAtlasAnnotationFeatures,
  createLunarAtlasAnnotationsLayer,
} from "@/lib/map/lunar-atlas-annotations"
import { createLunarColorImageLayer, createLunarReliefImageLayer } from "@/lib/map/lunar-atlas-layers"
import {
  moonZoomToPercent,
  MOON_MAP_MAX_ZOOM,
  MOON_MAP_MIN_ZOOM,
  MOON_MAP_SITE_FOCUS_ZOOM,
} from "@/lib/map/moon-map-controller"
import { getMissionBySlug } from "@/lib/missions"
import "ol/ol.css"

export interface LunarMapController {
  zoomIn: () => void
  zoomOut: () => void
  resetView: () => void
}

interface OpenLayersMoonMapProps {
  selectedSlug: string
  onMissionSlugSelect?: (slug: string) => void
  onControllerReady?: (controller: LunarMapController | null) => void
  onZoomChange?: (zoomPercent: number) => void
}

/**
 * Global Moon: curated local atlas (color + relief) and mission / region labels — single default presentation.
 */
export function OpenLayersMoonMap({
  selectedSlug,
  onMissionSlugSelect,
  onControllerReady,
  onZoomChange,
}: OpenLayersMoonMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<Map | null>(null)
  const colorRef = useRef<ReturnType<typeof createLunarColorImageLayer> | null>(null)
  const reliefRef = useRef<ReturnType<typeof createLunarReliefImageLayer> | null>(null)
  const annotationsLayerRef = useRef<ReturnType<typeof createLunarAtlasAnnotationsLayer> | null>(null)

  const selectedSlugRef = useRef(selectedSlug)
  const hoveredMissionSlugRef = useRef<string | null>(null)
  const onControllerReadyRef = useRef(onControllerReady)
  const onZoomChangeRef = useRef(onZoomChange)
  const onMissionSlugSelectRef = useRef(onMissionSlugSelect)

  selectedSlugRef.current = selectedSlug
  onControllerReadyRef.current = onControllerReady
  onZoomChangeRef.current = onZoomChange
  onMissionSlugSelectRef.current = onMissionSlugSelect

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const color = createLunarColorImageLayer()
    const relief = createLunarReliefImageLayer()
    color.setVisible(true)
    relief.setVisible(true)
    colorRef.current = color
    reliefRef.current = relief

    const annotationSource = new VectorSource<Feature<Point>>({
      features: buildLunarAtlasAnnotationFeatures(),
    })
    const getAnnotationState = () => ({
      selectedSlug: selectedSlugRef.current,
      hoveredSlug: hoveredMissionSlugRef.current,
    })
    const annotations = createLunarAtlasAnnotationsLayer(annotationSource, getAnnotationState)
    annotationsLayerRef.current = annotations

    const projection = getProjection("EPSG:4326")
    if (!projection) return

    const view = new View({
      projection,
      center: [0, 0],
      zoom: 2,
      minZoom: MOON_MAP_MIN_ZOOM,
      maxZoom: MOON_MAP_MAX_ZOOM,
      extent: [-180, -90, 180, 90],
      constrainResolution: true,
      smoothExtentConstraint: true,
    })

    const map = new Map({
      target: el,
      layers: [color, relief, annotations],
      view,
      controls: defaultControls({ attribution: true, zoom: false, rotate: false }),
      interactions: defaultInteractions({
        altShiftDragRotate: false,
        pinchRotate: false,
        zoomDuration: 220,
      }),
    })

    const syncZoom = () => {
      onZoomChangeRef.current?.(moonZoomToPercent(map))
    }
    map.on("moveend", syncZoom)
    syncZoom()

    mapRef.current = map

    const hitTolerance = 10

    map.on("singleclick", (evt) => {
      const cb = onMissionSlugSelectRef.current
      if (!cb) return
      map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => {
          if (feature.get("kind") === "mission") {
            const slug = feature.get("slug") as string | undefined
            if (slug) cb(slug)
            return true
          }
          return false
        },
        { hitTolerance, layerFilter: (layer) => layer === annotations },
      )
    })

    map.on("pointermove", (evt) => {
      let missionHover: string | null = null
      map.forEachFeatureAtPixel(
        evt.pixel,
        (feature) => {
          if (feature.get("kind") === "mission") {
            const slug = feature.get("slug") as string | undefined
            if (slug) missionHover = slug
            return true
          }
          return false
        },
        { hitTolerance, layerFilter: (layer) => layer === annotations },
      )
      if (missionHover !== hoveredMissionSlugRef.current) {
        hoveredMissionSlugRef.current = missionHover
        annotations.changed()
      }
      el.style.cursor = missionHover ? "pointer" : ""
    })

    const viewport = map.getViewport()
    const clearMissionHover = () => {
      if (hoveredMissionSlugRef.current !== null) {
        hoveredMissionSlugRef.current = null
        annotations.changed()
      }
      el.style.cursor = ""
    }
    viewport.addEventListener("pointerleave", clearMissionHover)

    const controller: LunarMapController = {
      zoomIn: () => {
        const z = view.getZoom() ?? 2
        view.animate({ zoom: Math.min(z + 1, MOON_MAP_MAX_ZOOM), duration: 220 })
      },
      zoomOut: () => {
        const z = view.getZoom() ?? 2
        view.animate({ zoom: Math.max(z - 1, MOON_MAP_MIN_ZOOM), duration: 220 })
      },
      resetView: () => {
        view.cancelAnimations()
        view.animate({ center: [0, 0], zoom: 2, duration: 550 })
      },
    }
    onControllerReadyRef.current?.(controller)

    const ro = new ResizeObserver(() => {
      map.updateSize()
    })
    ro.observe(el)

    return () => {
      viewport.removeEventListener("pointerleave", clearMissionHover)
      ro.disconnect()
      map.un("moveend", syncZoom)
      hoveredMissionSlugRef.current = null
      el.style.cursor = ""
      onControllerReadyRef.current?.(null)
      map.setTarget(undefined)
      mapRef.current = null
      colorRef.current = null
      reliefRef.current = null
      annotationsLayerRef.current = null
    }
  }, [])

  useEffect(() => {
    annotationsLayerRef.current?.changed()
  }, [selectedSlug])

  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    const mission = getMissionBySlug(selectedSlug)
    if (!mission) return
    const view = map.getView()
    view.cancelAnimations()
    view.animate({
      center: [mission.landingSite.longitude, mission.landingSite.latitude],
      zoom: Math.min(MOON_MAP_SITE_FOCUS_ZOOM, MOON_MAP_MAX_ZOOM),
      duration: 600,
    })
  }, [selectedSlug])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 moon-ol-map moon-atlas-rasters--surface bg-[oklch(0.1_0.012_260)]"
      aria-label="Lunar map — global overview"
    />
  )
}
