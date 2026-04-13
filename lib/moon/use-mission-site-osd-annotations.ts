"use client"

import { useEffect } from "react"
import type OpenSeadragon from "openseadragon"
import type { MissionSiteAnnotation } from "@/types/mission-site-annotations"

type OpenSeadragonViewer = ReturnType<typeof OpenSeadragon>

function buildMarkerEl(a: MissionSiteAnnotation): HTMLDivElement {
  const wrap = document.createElement("div")
  wrap.className = "osd-site-annotation"
  wrap.dataset.siteAnnType = a.type
  wrap.setAttribute("role", "img")
  wrap.setAttribute(
    "aria-label",
    a.description ? `${a.label}. ${a.description}` : a.label,
  )

  const dot = document.createElement("span")
  dot.className = "osd-site-annotation__dot"

  const stem = document.createElement("span")
  stem.className = "osd-site-annotation__stem"
  stem.setAttribute("aria-hidden", "true")

  const label = document.createElement("span")
  label.className = "osd-site-annotation__label"
  label.textContent = a.label

  wrap.append(dot, stem, label)
  return wrap
}

/**
 * Mounts HTML overlays on an OpenSeadragon viewer and keeps them aligned with pan/zoom.
 * Annotations use normalized image coordinates (see data/mission-site-annotations.ts).
 */
export function useMissionSiteOsdAnnotations(
  viewer: OpenSeadragonViewer | null,
  annotations: MissionSiteAnnotation[],
  visible: boolean,
): void {
  useEffect(() => {
    if (!viewer || viewer.isDestroyed()) return

    let cancelled = false
    const elements: HTMLDivElement[] = []
    let detachHandlers: (() => void) | null = null

    const clearOverlays = () => {
      if (!viewer || viewer.isDestroyed()) return
      for (const el of elements) {
        try {
          viewer.removeOverlay(el)
        } catch {
          /* overlay may already be gone */
        }
      }
      elements.length = 0
    }

    void import("openseadragon").then((mod) => {
      if (cancelled || !viewer || viewer.isDestroyed()) return
      const OSD = mod.default

      const syncPositions = () => {
        if (!viewer || viewer.isDestroyed() || !visible || annotations.length === 0) return
        const tiledImage = viewer.world.getItemAt(0)
        if (!tiledImage) return
        const size = tiledImage.getContentSize()
        annotations.forEach((ann, i) => {
          const el = elements[i]
          if (!el) return
          const px = ann.x * size.x
          const py = ann.y * size.y
          const vp = tiledImage.imageToViewportCoordinates(px, py, true)
          viewer.updateOverlay(el, vp, OSD.Placement.TOP_LEFT)
        })
      }

      const mount = () => {
        clearOverlays()
        if (!visible || annotations.length === 0) return
        const tiledImage = viewer.world.getItemAt(0)
        if (!tiledImage) return
        const size = tiledImage.getContentSize()

        for (const ann of annotations) {
          const el = buildMarkerEl(ann)
          const px = ann.x * size.x
          const py = ann.y * size.y
          const vp = tiledImage.imageToViewportCoordinates(px, py, true)
          viewer.addOverlay({
            element: el,
            location: vp,
            placement: OSD.Placement.TOP_LEFT,
          })
          elements.push(el)
        }
      }

      const onOpen = () => {
        mount()
        syncPositions()
      }

      viewer.addHandler("open", onOpen)
      viewer.addHandler("animation", syncPositions)
      viewer.addHandler("resize", syncPositions)
      viewer.addHandler("rotate", syncPositions)

      detachHandlers = () => {
        viewer.removeHandler("open", onOpen)
        viewer.removeHandler("animation", syncPositions)
        viewer.removeHandler("resize", syncPositions)
        viewer.removeHandler("rotate", syncPositions)
      }

      if (viewer.world.getItemAt(0)) {
        onOpen()
      }
    })

    return () => {
      cancelled = true
      detachHandlers?.()
      clearOverlays()
    }
  }, [viewer, visible, annotations])
}
