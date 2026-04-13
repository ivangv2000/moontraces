"use client"

import { useEffect, useRef, useState } from "react"
import type OpenSeadragon from "openseadragon"
import type { MissionSiteImageSlot } from "@/types/mission-site-imagery"
import { missionSiteImageSlotToOpenSeadragonTileSource } from "@/lib/map/mission-site-openseadragon-tile-source"
import { cn } from "@/lib/utils"

type OpenSeadragonViewer = ReturnType<typeof OpenSeadragon>

export type MissionSiteImageryLoadStatus = "loading" | "ready" | "error"

const OSD_IMAGE_PREFIX =
  "https://cdn.jsdelivr.net/npm/openseadragon@6.0.2/build/openseadragon/images/"

interface MissionSiteOpenSeadragonViewerProps {
  activeSlot: MissionSiteImageSlot
  className?: string
  /** Fired when the viewer instance is ready or after destroy (null). */
  onViewerReady?: (viewer: OpenSeadragonViewer | null) => void
  /** Loading / ready / error for the active tile source (OpenSeadragon `open` / `open-failed`). */
  onImageryStatusChange?: (status: MissionSiteImageryLoadStatus) => void
}

/**
 * OpenSeadragon viewer for one imagery slot (context or evidence).
 */
export function MissionSiteOpenSeadragonViewer({
  activeSlot,
  className,
  onViewerReady,
  onImageryStatusChange,
}: MissionSiteOpenSeadragonViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<OpenSeadragonViewer | null>(null)
  const onViewerReadyRef = useRef(onViewerReady)
  onViewerReadyRef.current = onViewerReady
  const onImageryStatusChangeRef = useRef(onImageryStatusChange)
  onImageryStatusChangeRef.current = onImageryStatusChange
  const [status, setStatus] = useState<MissionSiteImageryLoadStatus>("loading")

  const slotKey = `${activeSlot.tileSourceKind}:${activeSlot.imageUrl}:${activeSlot.dziUrl ?? ""}`

  useEffect(() => {
    setStatus("loading")
    onImageryStatusChangeRef.current?.("loading")
    const el = containerRef.current
    if (!el) return

    let cancelled = false
    let resizeObserver: ResizeObserver | null = null

    void import("openseadragon")
      .then((mod) => {
        const OpenSeadragon = mod.default
        if (cancelled || !containerRef.current) return

        const tileSources = missionSiteImageSlotToOpenSeadragonTileSource(activeSlot)

        let viewer: OpenSeadragonViewer
        try {
          viewer = OpenSeadragon({
            element: el,
            prefixUrl: OSD_IMAGE_PREFIX,
            tileSources,
            showNavigationControl: false,
            showZoomControl: false,
            showFullPageControl: false,
            showHomeControl: false,
            showSequenceControl: false,
            showNavigator: false,
            animationTime: 0.28,
            blendTime: 0.12,
            constrainDuringPan: true,
            maxZoomPixelRatio: 4,
            minZoomImageRatio: 0.85,
            visibilityRatio: 1,
            gestureSettingsMouse: {
              clickToZoom: true,
              dblClickToZoom: true,
              flickEnabled: true,
              pinchToZoom: true,
            },
            gestureSettingsTouch: {
              clickToZoom: false,
              dblClickToZoom: true,
              flickEnabled: true,
              pinchToZoom: true,
            },
          })
        } catch {
          if (!cancelled) {
            setStatus("error")
            onImageryStatusChangeRef.current?.("error")
            onViewerReadyRef.current?.(null)
          }
          return
        }

        if (cancelled) {
          viewer.destroy()
          return
        }

        viewerRef.current = viewer
        onViewerReadyRef.current?.(viewer)

        const onOpen = () => {
          if (cancelled) return
          setStatus("ready")
          onImageryStatusChangeRef.current?.("ready")
        }

        const onOpenFailed = () => {
          if (cancelled) return
          setStatus("error")
          onImageryStatusChangeRef.current?.("error")
          onViewerReadyRef.current?.(null)
          const v = viewerRef.current
          viewerRef.current = null
          if (v && !v.isDestroyed()) {
            v.destroy()
          }
        }

        viewer.addHandler("open", onOpen)
        viewer.addHandler("open-failed", onOpenFailed)

        resizeObserver = new ResizeObserver(() => {
          if (viewer.isDestroyed()) return
          viewer.forceResize()
          viewer.forceRedraw()
        })
        resizeObserver.observe(el)
      })
      .catch(() => {
        if (!cancelled) {
          setStatus("error")
          onImageryStatusChangeRef.current?.("error")
          onViewerReadyRef.current?.(null)
        }
      })

    return () => {
      cancelled = true
      resizeObserver?.disconnect()
      onViewerReadyRef.current?.(null)
      const v = viewerRef.current
      if (v && !v.isDestroyed()) {
        v.destroy()
      }
      viewerRef.current = null
    }
  }, [slotKey])

  return (
    <div
      className={cn("absolute inset-0 min-h-[280px] overflow-hidden bg-[#070708]", className)}
      data-mission-site-osd-wrap
    >
      <div
        ref={containerRef}
        className={cn(
          "absolute inset-0 min-h-[280px] transition-opacity duration-500 ease-out [&_.openseadragon-container]:!bg-[#070708] [&_canvas]:outline-none",
          status === "ready" ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
        data-mission-site-osd
        role="img"
        aria-label={activeSlot.title}
      />
      <div
        className={cn(
          "osd-mission-loading pointer-events-none absolute inset-0 z-[2] flex flex-col items-center justify-center gap-4 bg-[#070708] transition-opacity duration-500 ease-out",
          status === "loading" ? "opacity-100" : "opacity-0",
        )}
        aria-hidden={status !== "loading"}
        aria-busy={status === "loading"}
      >
        <div className="relative h-px w-24 overflow-hidden rounded-full bg-border/40">
          <div className="osd-mission-loading__bar absolute inset-y-0 w-1/3 rounded-full bg-accent/45" />
        </div>
        <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground/90">
          Loading imagery
        </p>
      </div>
    </div>
  )
}
