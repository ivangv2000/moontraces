"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { GlassCard } from "@/components/marketing/glass-card"
import { OpenLayersMoonMap, type LunarMapController } from "@/components/moon/openlayers-moon-map"
import { MissionSiteDetailStage } from "@/components/moon/mission-site-detail-stage"
import { missions } from "@/data/missions"
import { getMissionBySlug } from "@/lib/missions"
import type { Mission } from "@/types/mission"
import {
  MapPin,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronRight,
  ExternalLink,
  Globe,
  Crosshair,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

export type ExplorerLeftMode = "global" | "site"

export function Explorer2dClient() {
  const [selectedMission, setSelectedMission] = useState<Mission>(missions[0])
  const [leftMode, setLeftMode] = useState<ExplorerLeftMode>("global")
  const [zoom, setZoom] = useState(50)
  const [mapController, setMapController] = useState<LunarMapController | null>(null)
  const [isMobileMissionSheetOpen, setIsMobileMissionSheetOpen] = useState(false)

  const selectMission = (mission: Mission) => {
    setSelectedMission(mission)
  }

  const openSiteDetail = () => {
    setLeftMode("site")
    setIsMobileMissionSheetOpen(false)
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        <div className="relative min-w-0 flex-1 bg-secondary/25">
          <div className="pointer-events-auto absolute left-5 top-5 z-20 flex max-w-[min(100%,19rem)] flex-col gap-4 md:left-6 md:top-6">
            <GlassCard className="overflow-hidden rounded-lg border-border/45 bg-card/35 p-1 shadow-sm backdrop-blur-md">
              <p className="px-2 pb-1 pt-1.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                Explorer
              </p>
              <div className="relative grid grid-cols-2 gap-1 p-0.5">
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-y-1 left-1 z-0 w-[calc(50%-0.375rem)] rounded-md border border-accent/18 bg-accent/16 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                    leftMode === "site" && "translate-x-[calc(100%+0.25rem)]",
                  )}
                />
                <button
                  type="button"
                  onClick={() => setLeftMode("global")}
                  className={cn(
                    "relative z-10 flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-medium transition-colors duration-200 ease-out",
                    leftMode === "global" ? "text-accent" : "text-muted-foreground hover:text-foreground/90",
                  )}
                  aria-pressed={leftMode === "global"}
                >
                  <Globe className="size-3.5 shrink-0 opacity-90" aria-hidden />
                  Global Moon
                </button>
                <button
                  type="button"
                  onClick={() => setLeftMode("site")}
                  className={cn(
                    "relative z-10 flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-xs font-medium transition-colors duration-200 ease-out",
                    leftMode === "site" ? "text-accent" : "text-muted-foreground hover:text-foreground/90",
                  )}
                  aria-pressed={leftMode === "site"}
                >
                  <Crosshair className="size-3.5 shrink-0 opacity-90" aria-hidden />
                  Site detail
                </button>
              </div>
            </GlassCard>
          </div>

          <div
            className={cn(
              "absolute inset-0 z-0 transition-[opacity,visibility] duration-300 ease-out",
              leftMode === "global"
                ? "visible opacity-100"
                : "pointer-events-none invisible opacity-0",
            )}
            aria-hidden={leftMode !== "global"}
          >
            <OpenLayersMoonMap
              selectedSlug={selectedMission.slug}
              onMissionSlugSelect={(slug) => {
                const m = getMissionBySlug(slug)
                if (m) setSelectedMission(m)
              }}
              onControllerReady={setMapController}
              onZoomChange={setZoom}
            />

            <div
              className="pointer-events-auto absolute z-20 max-sm:left-5 max-sm:right-5 max-sm:top-[8.25rem] right-5 top-5 w-[min(18rem,calc(100vw-7rem))] max-sm:w-auto md:right-6 md:top-6"
              aria-live="polite"
            >
              <GlassCard className="border-border/50 bg-card/42 p-5 shadow-md backdrop-blur-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent/95">
                  Landed {selectedMission.landingDate}
                </p>
                <h3 className="mt-2 font-serif text-xl leading-tight tracking-tight text-foreground">
                  {selectedMission.name}
                </h3>
                <p className="mt-1.5 text-sm text-foreground/88">{selectedMission.landingSite.name}</p>
                <p className="mt-1 text-xs leading-snug text-muted-foreground">{selectedMission.landingSite.region}</p>
                <p className="mt-2.5 font-mono text-[10px] tabular-nums text-muted-foreground/85">
                  {selectedMission.landingSite.latitude.toFixed(4)}°, {selectedMission.landingSite.longitude.toFixed(4)}°
                </p>
                <Button
                  type="button"
                  size="sm"
                  className="mt-5 w-full bg-accent/92 text-accent-foreground shadow-sm hover:bg-accent"
                  onClick={openSiteDetail}
                >
                  <Crosshair className="mr-2 size-3.5 opacity-90" aria-hidden />
                  Open site detail
                </Button>
                <p className="mt-3.5 text-[10px] leading-relaxed text-muted-foreground/78">
                  Overview atlas — modest zoom. LRO-scale maps and evidence live in site detail.
                </p>
              </GlassCard>
            </div>

            <div
              className="pointer-events-none absolute bottom-[7.75rem] right-5 z-10 hidden max-w-[12.5rem] md:right-6 lg:block"
              aria-hidden
            >
              <GlassCard className="border-border/40 bg-card/38 px-3.5 py-3 shadow-sm backdrop-blur-md">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground/88">
                  Reading the map
                </p>
                <p className="mt-1.5 text-[10px] leading-relaxed text-muted-foreground/82">
                  Dots mark Apollo landings. Lighter names place each site near major maria and highlands.
                </p>
                <div className="mt-2.5 flex items-center gap-2 border-t border-border/35 pt-2.5">
                  <span
                    className="size-2 shrink-0 rounded-full ring-[1.5px] ring-white/55"
                    style={{
                      background: "oklch(0.62 0.11 220 / 0.95)",
                      boxShadow: "0 0 0 1px oklch(0.12 0.02 260 / 0.35)",
                    }}
                  />
                  <span className="text-[10px] leading-tight text-muted-foreground/88">Landing marker</span>
                </div>
              </GlassCard>
            </div>
          </div>

          {leftMode === "site" ? (
            <div
              className="absolute inset-0 z-[5] flex min-h-0 flex-col bg-background/90 backdrop-blur-md"
              aria-label="Site detail"
            >
              <div
                key={selectedMission.slug}
                className="animate-explorer-fade-up flex min-h-0 flex-1 flex-col"
              >
                <MissionSiteDetailStage mission={selectedMission} />
              </div>
            </div>
          ) : null}

          {leftMode === "global" ? (
            <div className="pointer-events-auto absolute z-10 flex flex-col gap-2 left-[max(1.25rem,env(safe-area-inset-left,0px))] bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] md:left-6 md:bottom-7">
              <GlassCard className="border-border/45 bg-card/40 p-1.5 shadow-sm backdrop-blur-md">
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    disabled={zoom >= 100}
                    title={zoom >= 100 ? "Maximum zoom for this atlas view" : undefined}
                    onClick={() => mapController?.zoomIn()}
                    className={cn(
                      "rounded-md p-2 text-foreground/85 transition-colors duration-200 hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
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
                    onClick={() => mapController?.zoomOut()}
                    className={cn(
                      "rounded-md p-2 text-foreground/85 transition-colors duration-200 hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      zoom <= 0 && "cursor-not-allowed opacity-35 hover:bg-transparent",
                    )}
                    aria-label="Zoom out"
                  >
                    <ZoomOut className="size-4" />
                  </button>
                  <div className="my-1 h-px bg-border/60" />
                  <button
                    type="button"
                    onClick={() => mapController?.resetView()}
                    className="rounded-md p-2 text-foreground/85 transition-colors duration-200 hover:bg-secondary/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    aria-label="Reset view"
                  >
                    <RotateCcw className="size-4" />
                  </button>
                </div>
              </GlassCard>
            </div>
          ) : null}

          <div className="pointer-events-auto absolute left-1/2 z-20 max-w-[calc(100%-2.5rem)] -translate-x-1/2 bottom-[calc(1.25rem+env(safe-area-inset-bottom,0px))] pl-[max(0px,env(safe-area-inset-left,0px))] pr-[max(0px,env(safe-area-inset-right,0px))] md:bottom-7">
            <GlassCard className="border-border/45 bg-card/40 px-3 py-2.5 shadow-sm backdrop-blur-md">
              <p
                id="explorer-mission-chips-label"
                className="mb-2 text-center text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground/85"
              >
                Apollo landing sites — shown on the map
              </p>
              <div
                className="flex max-w-[min(100vw-2.5rem,42rem)] flex-wrap items-center justify-center gap-1.5"
                role="group"
                aria-labelledby="explorer-mission-chips-label"
              >
                <Drawer open={isMobileMissionSheetOpen} onOpenChange={setIsMobileMissionSheetOpen}>
                  <DrawerTrigger asChild>
                    <button
                      type="button"
                      className="rounded-md px-3 py-1.5 text-xs font-medium text-foreground/82 transition-all duration-200 ease-out hover:bg-secondary/75 hover:text-foreground/95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <FileText className="size-3.5 shrink-0 opacity-85" aria-hidden />
                        Mission info
                      </span>
                    </button>
                  </DrawerTrigger>
                  <DrawerContent className="border-border/55 bg-background/95 backdrop-blur-md lg:hidden">
                    <DrawerHeader className="pb-2 text-left">
                      <DrawerTitle className="font-serif text-xl tracking-tight text-foreground">
                        {selectedMission.name}
                      </DrawerTitle>
                      <DrawerDescription className="text-xs uppercase tracking-[0.12em] text-accent/90">
                        Landed {selectedMission.landingDate} - {selectedMission.landingSite.name}
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="max-h-[70vh] space-y-5 overflow-y-auto px-4 pb-6">
                      <MissionContextContent
                        mission={selectedMission}
                        onOpenSiteDetail={openSiteDetail}
                        missionDetailsHref={`/missions/${selectedMission.slug}`}
                        mobile
                      />
                      <DrawerClose asChild>
                        <Button variant="ghost" size="sm" className="w-full">
                          Continue exploring
                        </Button>
                      </DrawerClose>
                    </div>
                  </DrawerContent>
                </Drawer>
                {missions.map((mission) => (
                  <button
                    key={mission.id}
                    type="button"
                    title={`Show ${mission.name} on the map`}
                    aria-current={selectedMission.id === mission.id ? "true" : undefined}
                    onClick={() => selectMission(mission)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/45 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                      selectedMission.id === mission.id
                        ? "bg-accent text-accent-foreground shadow-md ring-1 ring-accent/30 ring-offset-2 ring-offset-background/70"
                        : "text-foreground/68 hover:bg-secondary/75 hover:text-foreground/95",
                    )}
                  >
                    {selectedMission.id === mission.id ? (
                      <MapPin className="size-3 shrink-0 opacity-95" aria-hidden />
                    ) : null}
                    {mission.name.replace("Apollo ", "A")}
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        <aside className="hidden w-96 shrink-0 overflow-y-auto border-l border-border/50 bg-background/55 backdrop-blur-md lg:block">
          <div key={selectedMission.id} className="animate-explorer-fade-up space-y-7 p-6 md:p-7">
            <header className="space-y-2 border-b border-border/35 pb-6">
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-accent/95">
                Landed {selectedMission.landingDate}
              </p>
              <h2 className="font-serif text-3xl leading-tight tracking-tight text-foreground">
                {selectedMission.name}
              </h2>
              <p className="text-sm text-muted-foreground">{selectedMission.landingSite.name}</p>
            </header>
            <MissionContextContent
              mission={selectedMission}
              onOpenSiteDetail={() => setLeftMode("site")}
              missionDetailsHref={`/missions/${selectedMission.slug}`}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}

type MissionContextContentProps = {
  mission: Mission
  onOpenSiteDetail: () => void
  missionDetailsHref: string
  mobile?: boolean
}

function MissionContextContent({
  mission,
  onOpenSiteDetail,
  missionDetailsHref,
  mobile = false,
}: MissionContextContentProps) {
  return (
    <>
      <GlassCard className="border-border/45 bg-card/30 p-4">
        <div className="mb-3 flex items-center gap-2">
          <MapPin className="size-4 text-accent" aria-hidden />
          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            Landing coordinates
          </span>
        </div>
        <p className="font-mono text-sm text-foreground/95">
          {mission.landingSite.latitude.toFixed(5)}°, {mission.landingSite.longitude.toFixed(5)}°
        </p>
      </GlassCard>
      <section>
        <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Crew</h3>
        <div className="space-y-2.5">
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-muted-foreground">Commander</span>
            <span className="text-right text-foreground">{mission.commander}</span>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-muted-foreground">CM Pilot</span>
            <span className="text-right text-foreground">{mission.pilotCM}</span>
          </div>
          <div className="flex justify-between gap-3 text-sm">
            <span className="text-muted-foreground">LM Pilot</span>
            <span className="text-right text-foreground">{mission.pilotLM}</span>
          </div>
        </div>
      </section>
      <section>
        <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Evidence at site
        </h3>
        <div className="flex flex-wrap gap-2">
          {mission.evidenceTags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md border border-border/45 bg-secondary/80 px-2.5 py-1 text-xs text-foreground/95"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
      <p className="text-sm leading-relaxed text-muted-foreground">{mission.description}</p>
      <section>
        <h3 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Sources</h3>
        <ul className="space-y-2.5">
          {mission.sourceLinks.map((link) => (
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
      <div className={cn("flex flex-col gap-2.5 border-t border-border/35 pt-2", mobile && "pb-1")}>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full border-border/55 bg-background/40 transition-colors duration-200 hover:border-accent/30 hover:bg-accent/8"
          onClick={onOpenSiteDetail}
        >
          Open site detail
        </Button>
        <Button asChild className="w-full shadow-sm">
          <Link href={missionDetailsHref}>
            View full mission details
            <ChevronRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </>
  )
}
