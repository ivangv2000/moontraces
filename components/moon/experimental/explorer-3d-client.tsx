"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/marketing/glass-card"
import { Viewer3dLoadingState } from "@/components/moon/experimental/viewer-3d-loading-state"
import { explore3dLayerOptions, type Explore3dLayerId } from "@/data/explore-3d-layers"
import { missions } from "@/data/missions"
import { getMissionBySlug } from "@/lib/missions"
import type { MoonViewer3dExperimentalController } from "@/components/moon/experimental/moon-viewer-3d-client"
import {
  ChevronRight,
  ExternalLink,
  Globe,
  Grid3X3,
  MapPin,
  RotateCcw,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react"
import { cn } from "@/lib/utils"

const MoonViewer3dExperimental = dynamic(
  () =>
    import("@/components/moon/experimental/moon-viewer-3d-client").then((m) => m.MoonViewer3dExperimental),
  {
    ssr: false,
    loading: () => <Viewer3dLoadingState />,
  },
)

/**
 * Full-screen Cesium 3D explorer — experimental; primary product explorer is 2D at `/explore`.
 */
export function Explorer3dExperimentalClient() {
  const [selectedMission, setSelectedMission] = useState(missions[0])
  const [activeLayers, setActiveLayers] = useState<Explore3dLayerId[]>(["surface", "labels"])
  const [zoom, setZoom] = useState(50)
  const [viewerController, setViewerController] = useState<MoonViewer3dExperimentalController | null>(null)

  const toggleLayer = (layer: Explore3dLayerId) => {
    setActiveLayers((prev) => (prev.includes(layer) ? prev.filter((l) => l !== layer) : [...prev, layer]))
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="relative min-w-0 flex-1 bg-[oklch(0.07_0.02_260)]">
          <MoonViewer3dExperimental
            activeLayers={activeLayers}
            selectedSlug={selectedMission.slug}
            onMissionSelect={(slug) => {
              const next = getMissionBySlug(slug)
              if (next) setSelectedMission(next)
            }}
            onControllerReady={setViewerController}
            onZoomChange={setZoom}
          />

          <div className="pointer-events-none absolute left-0 right-0 top-4 z-20 flex justify-center px-4">
            <p className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/72 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground backdrop-blur-md">
              <Sparkles className="size-3 text-accent/90" aria-hidden />
              Experimental · orientation
            </p>
          </div>

          <div className="pointer-events-auto absolute left-[max(1rem,env(safe-area-inset-left,0px))] top-[max(3.25rem,env(safe-area-inset-top,0px))] z-20 flex max-w-[min(100%,18rem)] flex-col gap-2">
            <GlassCard className="border-border/45 bg-card/40 p-2 shadow-sm backdrop-blur-md">
              <p className="px-2 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Globe
              </p>
              <div className="flex flex-col gap-0.5">
                {explore3dLayerOptions.map((layer) => (
                  <button
                    key={layer.id}
                    type="button"
                    title={layer.description}
                    onClick={() => toggleLayer(layer.id)}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-all duration-200",
                      activeLayers.includes(layer.id)
                        ? "bg-accent/18 text-accent ring-1 ring-accent/22"
                        : "text-foreground/75 hover:bg-secondary/70 hover:text-foreground/92",
                    )}
                  >
                    {layer.id === "surface" && <Globe className="size-4 shrink-0 opacity-90" aria-hidden />}
                    {layer.id === "labels" && <Grid3X3 className="size-4 shrink-0 opacity-90" aria-hidden />}
                    {layer.label}
                  </button>
                ))}
              </div>
              <p className="mt-2 border-t border-border/35 px-2 pb-0.5 pt-2.5 text-[10px] leading-relaxed text-muted-foreground/88">
                Rotate and fly for context. Maps and evidence live in the{" "}
                <Link href="/explore" className="text-foreground/80 underline decoration-border underline-offset-2 hover:text-accent">
                  2D explorer
                </Link>
                .
              </p>
            </GlassCard>
          </div>

          <div className="pointer-events-auto absolute z-20 flex flex-col gap-2 left-[max(1rem,env(safe-area-inset-left,0px))] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))]">
            <GlassCard className="border-border/45 bg-card/45 p-1 shadow-sm backdrop-blur-md">
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  disabled={zoom >= 100}
                  title={zoom >= 100 ? "Maximum zoom for this view" : undefined}
                  onClick={() => viewerController?.zoomIn()}
                  className={cn(
                    "rounded-md p-2 text-foreground/85 transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    zoom >= 100 && "cursor-not-allowed opacity-35 hover:bg-transparent",
                  )}
                  aria-label="Zoom in"
                >
                  <ZoomIn className="size-4" />
                </button>
                <div className="px-2 py-1 text-center font-mono text-[10px] tabular-nums text-muted-foreground">
                  {zoom}%
                </div>
                <button
                  type="button"
                  disabled={zoom <= 0}
                  title={zoom <= 0 ? "Fully zoomed out" : undefined}
                  onClick={() => viewerController?.zoomOut()}
                  className={cn(
                    "rounded-md p-2 text-foreground/85 transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    zoom <= 0 && "cursor-not-allowed opacity-35 hover:bg-transparent",
                  )}
                  aria-label="Zoom out"
                >
                  <ZoomOut className="size-4" />
                </button>
                <div className="my-1 h-px bg-border/60" />
                <button
                  type="button"
                  onClick={() => viewerController?.resetView()}
                  className="rounded-md p-2 text-foreground/85 transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  aria-label="Reset view"
                >
                  <RotateCcw className="size-4" />
                </button>
              </div>
            </GlassCard>
          </div>

          <div className="pointer-events-auto absolute bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] left-1/2 z-20 max-w-[calc(100%-2rem)] -translate-x-1/2 pl-[max(0px,env(safe-area-inset-left,0px))] pr-[max(0px,env(safe-area-inset-right,0px))]">
            <GlassCard className="border-border/45 bg-card/45 px-2 py-2 shadow-sm backdrop-blur-md">
              <div className="flex max-w-[min(100vw-2rem,40rem)] flex-wrap items-center justify-center gap-1">
                {missions.map((mission) => (
                  <button
                    key={mission.id}
                    type="button"
                    onClick={() => setSelectedMission(mission)}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200",
                      selectedMission.id === mission.id
                        ? "bg-accent text-accent-foreground shadow-sm ring-1 ring-accent/25"
                        : "text-foreground/68 hover:bg-secondary/75 hover:text-foreground/95",
                    )}
                  >
                    {mission.name.replace("Apollo ", "A")}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <aside className="hidden w-96 shrink-0 overflow-y-auto border-l border-border/50 bg-background/55 backdrop-blur-md lg:block">
          <div className="space-y-6 p-6 md:p-7">
            <p className="text-[10px] leading-relaxed text-muted-foreground">
              Context panel — for landing-scale maps and hardware evidence, use{" "}
              <Link href="/explore" className="text-accent/90 underline-offset-2 hover:underline">
                Site detail
              </Link>{" "}
              in the 2D explorer.
            </p>
            <div className="space-y-2 border-b border-border/35 pb-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent/95">
                Landed {selectedMission.landingDate}
              </p>
              <h2 className="font-serif text-3xl tracking-tight text-foreground">{selectedMission.name}</h2>
              <p className="text-sm text-muted-foreground">{selectedMission.landingSite.name}</p>
            </div>
            <GlassCard className="border-border/45 bg-card/30 p-4">
              <div className="mb-3 flex items-center gap-2">
                <MapPin className="size-4 text-accent" aria-hidden />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  Landing coordinates
                </span>
              </div>
              <p className="font-mono text-sm text-foreground/95">
                {selectedMission.landingSite.latitude.toFixed(5)}°, {selectedMission.landingSite.longitude.toFixed(5)}°
              </p>
            </GlassCard>
            <section>
              <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Crew</h3>
              <div className="space-y-2.5">
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">Commander</span>
                  <span className="text-right text-foreground">{selectedMission.commander}</span>
                </div>
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">CM Pilot</span>
                  <span className="text-right text-foreground">{selectedMission.pilotCM}</span>
                </div>
                <div className="flex justify-between gap-3 text-sm">
                  <span className="text-muted-foreground">LM Pilot</span>
                  <span className="text-right text-foreground">{selectedMission.pilotLM}</span>
                </div>
              </div>
            </section>
            <section>
              <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Evidence at site
              </h3>
              <div className="flex flex-wrap gap-2">
                {selectedMission.evidenceTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-border/45 bg-secondary/80 px-2.5 py-1 text-xs text-foreground/95"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>
            <p className="text-sm leading-relaxed text-muted-foreground">{selectedMission.description}</p>
            <section>
              <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Sources</h3>
              <ul className="space-y-2.5">
                {selectedMission.sourceLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent/90 transition-colors hover:text-accent hover:underline"
                    >
                      {link.label}
                      {link.external !== false && <ExternalLink className="size-3 shrink-0 opacity-70" />}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
            <Button asChild className="w-full shadow-sm">
              <Link href={`/missions/${selectedMission.slug}`}>
                View full mission details
                <ChevronRight className="ml-2 size-4" />
              </Link>
            </Button>
          </div>
        </aside>
      </div>
    </div>
  )
}
