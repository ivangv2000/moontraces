"use client"

import { useEffect, useRef } from "react"
import type { Viewer } from "cesium"
import { createApolloLandingMarkers, type ApolloLandingMarkersHandle } from "@/lib/cesium/apollo-landing-markers"
import {
  destroyMoonViewer,
  getMoonZoomPercent,
  initMoonViewer,
  resetMoonCamera,
  setMoonSurfaceVisibility,
} from "@/lib/cesium/init-viewer"
import type { Explore3dLayerId } from "@/data/explore-3d-layers"
import { getAllMissions } from "@/lib/missions"

/** Cesium 3D viewer controller — experimental path only. */
export interface MoonViewer3dExperimentalController {
  zoomIn: () => void
  zoomOut: () => void
  resetView: () => void
}

interface MoonViewer3dExperimentalProps {
  activeLayers: Explore3dLayerId[]
  selectedSlug: string
  onMissionSelect?: (slug: string) => void
  onControllerReady?: (controller: MoonViewer3dExperimentalController | null) => void
  onZoomChange?: (zoomPercent: number) => void
}

/**
 * Cesium Ion / globe Moon viewer — preserved for experimentation, not the primary MVP explorer.
 */
export function MoonViewer3dExperimental({
  activeLayers,
  selectedSlug,
  onMissionSelect,
  onControllerReady,
  onZoomChange,
}: MoonViewer3dExperimentalProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const viewerRef = useRef<Viewer | null>(null)
  const markersRef = useRef<ApolloLandingMarkersHandle | null>(null)
  const onMissionSelectRef = useRef(onMissionSelect)
  onMissionSelectRef.current = onMissionSelect

  const onControllerReadyRef = useRef(onControllerReady)
  onControllerReadyRef.current = onControllerReady
  const onZoomChangeRef = useRef(onZoomChange)
  onZoomChangeRef.current = onZoomChange

  const selectedSlugRef = useRef(selectedSlug)
  selectedSlugRef.current = selectedSlug
  const activeLayersRef = useRef(activeLayers)
  activeLayersRef.current = activeLayers

  const cameraListenerRef = useRef<{ viewer: Viewer; syncZoom: () => void } | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    void (async () => {
      try {
        const viewer = await initMoonViewer({ container })
        if (cancelled) {
          destroyMoonViewer(viewer)
          return
        }

        viewerRef.current = viewer

        const missions = getAllMissions()
        const markers = await createApolloLandingMarkers(viewer, missions, (slug) => {
          onMissionSelectRef.current?.(slug)
        })
        if (cancelled) {
          markers.dispose()
          destroyMoonViewer(viewer)
          return
        }
        markersRef.current = markers

        const layers = activeLayersRef.current
        setMoonSurfaceVisibility(viewer, layers.includes("surface"))
        markers.setLabelsVisible(layers.includes("labels"))

        const slug = selectedSlugRef.current
        markers.applySelection(slug)
        markers.flyToMission(slug)

        const controller: MoonViewer3dExperimentalController = {
          zoomIn: () => viewer.camera.zoomIn(140_000),
          zoomOut: () => viewer.camera.zoomOut(180_000),
          resetView: () => resetMoonCamera(viewer),
        }
        onControllerReadyRef.current?.(controller)

        const syncZoom = () => {
          onZoomChangeRef.current?.(getMoonZoomPercent(viewer))
        }
        viewer.camera.changed.addEventListener(syncZoom)
        cameraListenerRef.current = { viewer, syncZoom }
        syncZoom()
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[Moon 3D experimental] Failed to initialize Cesium viewer.", error)
        }
      }
    })()

    return () => {
      cancelled = true
      const listener = cameraListenerRef.current
      if (listener && !listener.viewer.isDestroyed()) {
        listener.viewer.camera.changed.removeEventListener(listener.syncZoom)
      }
      cameraListenerRef.current = null

      markersRef.current?.dispose()
      markersRef.current = null

      onControllerReadyRef.current?.(null)
      destroyMoonViewer(viewerRef.current)
      viewerRef.current = null
    }
  }, [])

  useEffect(() => {
    const viewer = viewerRef.current
    if (!viewer || viewer.isDestroyed()) return
    setMoonSurfaceVisibility(viewer, activeLayers.includes("surface"))
  }, [activeLayers])

  useEffect(() => {
    const markers = markersRef.current
    if (!markers) return
    markers.setLabelsVisible(activeLayers.includes("labels"))
  }, [activeLayers])

  useEffect(() => {
    const viewer = viewerRef.current
    const markers = markersRef.current
    if (!viewer || viewer.isDestroyed() || !markers) return
    markers.applySelection(selectedSlug)
    markers.flyToMission(selectedSlug)
  }, [selectedSlug])

  return (
    <div className="absolute inset-0 moon-viewer-container">
      <div ref={containerRef} className="h-full w-full" aria-label="Experimental 3D Moon viewer (Cesium)" />
    </div>
  )
}
