"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import type OpenSeadragon from "openseadragon"
import { GlassCard } from "@/components/marketing/glass-card"
import {
  MissionSiteOpenSeadragonViewer,
  type MissionSiteImageryLoadStatus,
} from "@/components/moon/mission-site-openseadragon-viewer"
import { Button } from "@/components/ui/button"
import { getValidatedAnnotationsForSlot } from "@/data/mission-site-annotations"
import { getMissionSiteImageryBySlug } from "@/data/mission-site-imagery"
import { useMissionSiteOsdAnnotations } from "@/lib/moon/use-mission-site-osd-annotations"
import type { Mission } from "@/types/mission"
import type { MissionSiteImageSlot, MissionSiteImagery } from "@/types/mission-site-imagery"
import { ArrowUpRight, ExternalLink, ImageOff, MapPin, Tags } from "lucide-react"
import { cn } from "@/lib/utils"

type OpenSeadragonViewer = ReturnType<typeof OpenSeadragon>

/** Best mission-level official URL: evidence first, then optional pending-evidence link, then site-map slot. */
function getPrimaryOfficialSourceUrl(imagery: MissionSiteImagery): string {
  return (
    imagery.evidenceImage?.officialSourceUrl ??
    imagery.evidencePendingOfficialUrl ??
    imagery.contextImage.officialSourceUrl
  )
}

function officialSourceActionLabel(url: string): "Open official LROC site" | "View official source" {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "")
    if (host === "lroc.im-ldi.com" || host.endsWith("lroc.asu.edu")) {
      return "Open official LROC site"
    }
  } catch {
    /* invalid URL */
  }
  return "View official source"
}

interface MissionSiteDetailStageProps {
  mission: Mission
}

type SiteImageryLayer = "siteMap" | "evidence"

export function MissionSiteDetailStage({ mission }: MissionSiteDetailStageProps) {
  const lrocLink = mission.sourceLinks.find((l) => /lroc/i.test(l.label) || /lro/i.test(l.href))
  const siteImagery = getMissionSiteImageryBySlug(mission.slug)

  const [layer, setLayer] = useState<SiteImageryLayer>("siteMap")
  const [osdViewer, setOsdViewer] = useState<OpenSeadragonViewer | null>(null)
  const [annotationsOn, setAnnotationsOn] = useState(true)
  const [imageryStatus, setImageryStatus] = useState<MissionSiteImageryLoadStatus>("loading")

  /** If user was on Evidence close-up but this mission has no image, fall back to Site map. */
  useEffect(() => {
    if (!siteImagery) return
    setLayer((prev) => {
      if (prev === "evidence" && !siteImagery.evidenceImage) return "siteMap"
      return prev
    })
  }, [mission.slug, siteImagery])

  const primaryOfficialUrl = useMemo(() => {
    if (siteImagery) return getPrimaryOfficialSourceUrl(siteImagery)
    return lrocLink?.href ?? null
  }, [siteImagery, lrocLink?.href])

  const primaryOfficialLabel = primaryOfficialUrl
    ? officialSourceActionLabel(primaryOfficialUrl)
    : null

  const osdSlot: MissionSiteImageSlot | null =
    siteImagery && layer === "siteMap"
      ? siteImagery.contextImage
      : siteImagery && layer === "evidence" && siteImagery.evidenceImage
        ? siteImagery.evidenceImage
        : null

  useEffect(() => {
    if (osdSlot) setImageryStatus("loading")
  }, [osdSlot?.imageUrl])

  const showEvidenceEmpty = Boolean(siteImagery && layer === "evidence" && !siteImagery.evidenceImage)

  const detailSlot: MissionSiteImageSlot | null = showEvidenceEmpty
    ? null
    : osdSlot ?? (siteImagery ? siteImagery.contextImage : null)

  const siteAnnotations = useMemo(
    () => getValidatedAnnotationsForSlot(osdSlot),
    [osdSlot?.imageUrl],
  )

  useMissionSiteOsdAnnotations(
    osdViewer,
    siteAnnotations,
    annotationsOn && siteAnnotations.length > 0,
  )

  const officialSourceClassName = cn(
    "group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-lg border px-4 py-3.5 text-sm font-medium transition-all duration-200 ease-out",
    "border-accent/20 bg-gradient-to-b from-accent/[0.08] via-transparent to-transparent text-foreground/95",
    "hover:border-accent/38 hover:from-accent/[0.14] hover:text-accent",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  )

  const sectionEyebrow = "text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground"

  return (
    <div className="flex h-full min-h-0 flex-col gap-5 md:gap-6 p-4 md:p-6 lg:p-7 overflow-y-auto">
      <GlassCard className="shrink-0 border-border/45 bg-card/25 p-4 md:p-5">
        <div className="flex items-start gap-3.5">
          <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/5">
            <MapPin className="size-4 text-accent" aria-hidden />
          </div>
          <div className="min-w-0 space-y-1">
            <p className={sectionEyebrow}>Landing site</p>
            <h2 className="font-serif text-xl leading-snug text-foreground md:text-2xl">
              {mission.landingSite.name}
            </h2>
            <p className="font-mono text-xs text-muted-foreground/95">
              {mission.landingSite.latitude.toFixed(5)}°, {mission.landingSite.longitude.toFixed(5)}°
            </p>
          </div>
        </div>
      </GlassCard>

      {siteImagery ? (
        <>
          <div
            className="relative flex min-h-[min(420px,50vh)] flex-1 flex-col overflow-hidden rounded-xl border border-border/50 bg-[#070708] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)]"
            data-site-detail-viewport
            aria-label="High-resolution site imagery viewer"
          >
            <div className="relative shrink-0 border-b border-border/45 bg-background/40 p-1">
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute inset-y-1 left-1 z-0 w-[calc(50%-0.375rem)] rounded-md border border-accent/15 bg-accent/15 shadow-sm transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform",
                  layer === "evidence" && "translate-x-[calc(100%+0.25rem)]",
                )}
              />
              <div className="relative z-10 grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setLayer("siteMap")}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-center text-xs font-medium transition-colors duration-200 ease-out",
                    layer === "siteMap"
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground/88",
                  )}
                  aria-pressed={layer === "siteMap"}
                >
                  Site map
                </button>
                <button
                  type="button"
                  onClick={() => setLayer("evidence")}
                  disabled={!siteImagery.evidenceImage}
                  title={!siteImagery.evidenceImage ? "No close-up image in the dataset for this mission" : undefined}
                  className={cn(
                    "rounded-md px-3 py-2.5 text-center text-xs font-medium transition-colors duration-200 ease-out",
                    !siteImagery.evidenceImage && "cursor-not-allowed opacity-40",
                    layer === "evidence"
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground/88",
                  )}
                  aria-pressed={layer === "evidence"}
                >
                  Evidence close-up
                </button>
              </div>
            </div>

            <div className="relative min-h-[260px] flex-1">
              {osdSlot ? (
                <>
                  <MissionSiteOpenSeadragonViewer
                    key={osdSlot.imageUrl}
                    activeSlot={osdSlot}
                    onViewerReady={setOsdViewer}
                    onImageryStatusChange={setImageryStatus}
                  />
                  {imageryStatus === "error" ? (
                    <div
                      className="absolute inset-0 z-[30] flex items-center justify-center bg-[#070708]/92 p-5 backdrop-blur-[2px]"
                      role="alert"
                      aria-live="polite"
                    >
                      <GlassCard className="max-w-md border-border/50 bg-card/55 p-6 shadow-lg backdrop-blur-md">
                        <div className="flex flex-col items-center text-center">
                          <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-border/50 bg-background/30 ring-1 ring-border/35">
                            <ImageOff className="size-5 text-muted-foreground" aria-hidden />
                          </div>
                          <p className={cn(sectionEyebrow, "mb-2")}>Imagery unavailable</p>
                          <h3 className="font-serif text-lg leading-snug text-foreground">
                            {layer === "siteMap"
                              ? "Could not load the site map"
                              : "Could not load the evidence close-up"}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            The official LRO image could not be opened in the viewer. It may be
                            temporarily unavailable, blocked by your network, or the link may have
                            changed.
                          </p>
                          <div className="mt-6 flex w-full flex-col gap-2.5">
                            {layer === "evidence" ? (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className="w-full border-border/55 bg-background/40 hover:border-accent/30 hover:bg-accent/8"
                                onClick={() => setLayer("siteMap")}
                              >
                                Back to Site map
                              </Button>
                            ) : null}
                            <a
                              href={osdSlot.officialSourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(officialSourceClassName, "text-xs py-3")}
                            >
                              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              <span className="relative">
                                {officialSourceActionLabel(osdSlot.officialSourceUrl)}
                              </span>
                              <ArrowUpRight className="relative size-4 opacity-70 transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
                            </a>
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  ) : null}
                  {siteAnnotations.length > 0 && imageryStatus === "ready" ? (
                    <button
                      type="button"
                      onClick={() => setAnnotationsOn((v) => !v)}
                      className={cn(
                        "absolute top-2 right-2 z-20 flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium tracking-wide transition-colors",
                        "border-border/50 bg-background/55 text-foreground/90 backdrop-blur-sm",
                        "hover:border-accent/35 hover:bg-accent/10 hover:text-accent",
                        annotationsOn ? "text-accent/95 border-accent/25" : "text-muted-foreground",
                      )}
                      aria-pressed={annotationsOn}
                      title={annotationsOn ? "Hide image labels" : "Show image labels"}
                    >
                      <Tags className="size-3 opacity-80 shrink-0" aria-hidden />
                      <span>Labels</span>
                    </button>
                  ) : null}
                  {imageryStatus === "ready" ? (
                    <p className="pointer-events-none absolute bottom-2 left-3 right-3 z-10 text-[10px] text-muted-foreground/80">
                      Scroll or pinch to zoom · drag to pan · double-click to zoom
                    </p>
                  ) : null}
                </>
              ) : (
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-[#070708] px-8 text-center"
                  role="status"
                  aria-live="polite"
                >
                  <div className="flex size-12 items-center justify-center rounded-full border border-border/50 bg-background/25 ring-1 ring-border/30">
                    <ImageOff className="size-5 text-muted-foreground" aria-hidden />
                  </div>
                  <div className="max-w-sm space-y-2">
                    <p className="font-serif text-base text-foreground/95">Close-up not in dataset</p>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      This mission does not yet have a dedicated evidence frame here. View the{" "}
                      <button
                        type="button"
                        onClick={() => setLayer("siteMap")}
                        className="text-accent/90 underline decoration-accent/30 underline-offset-2 transition-colors hover:text-accent"
                      >
                        Site map
                      </button>{" "}
                      tab, or open the official product page below.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {primaryOfficialUrl && primaryOfficialLabel ? (
            <a
              href={primaryOfficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(officialSourceClassName, "shrink-0")}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">{primaryOfficialLabel}</span>
              <ArrowUpRight className="relative size-4 opacity-70 transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
            </a>
          ) : null}

          <GlassCard className="shrink-0 space-y-3 border-border/45 bg-card/25 p-4 md:p-5">
            {showEvidenceEmpty ? (
              <>
                <div className="space-y-1.5">
                  <p className={sectionEyebrow}>Site imagery</p>
                  <h3 className="font-serif text-lg leading-snug text-foreground md:text-xl">{siteImagery.title}</h3>
                  <p className="text-sm font-medium text-foreground/88">Evidence close-up</p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  No dedicated close-up frame is in the dataset for this mission. Use{" "}
                  <button
                    type="button"
                    onClick={() => setLayer("siteMap")}
                    className="font-medium text-accent/90 underline decoration-accent/25 underline-offset-2 hover:text-accent"
                  >
                    Site map
                  </button>{" "}
                  for the official regional view.
                </p>
                {siteImagery.notes ? (
                  <p className="border-t border-border/40 pt-3 text-xs leading-relaxed text-muted-foreground/90">
                    {siteImagery.notes}
                  </p>
                ) : null}
              </>
            ) : detailSlot ? (
              <>
                <div className="space-y-1.5">
                  <p className={sectionEyebrow}>Site imagery</p>
                  <h3 className="font-serif text-lg leading-snug text-foreground md:text-xl">{siteImagery.title}</h3>
                  <p className="text-sm font-medium text-foreground/88">
                    {layer === "siteMap" ? "Site map" : "Evidence close-up"} — {detailSlot.title}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-foreground/90">{detailSlot.caption}</p>
                <p className="text-xs text-muted-foreground/95">{detailSlot.attribution}</p>
                {siteImagery.notes ? (
                  <p className="border-t border-border/40 pt-3 text-xs leading-relaxed text-muted-foreground/90">
                    {siteImagery.notes}
                  </p>
                ) : null}
                {detailSlot.catalogUrl ? (
                  <div className="pt-1">
                    <a
                      href={detailSlot.catalogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-accent/90 hover:underline inline-flex items-center gap-1"
                    >
                      Catalog / file page
                      <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                    </a>
                  </div>
                ) : null}
              </>
            ) : null}
          </GlassCard>
        </>
      ) : (
        <div
          className="flex min-h-[min(420px,50vh)] flex-1 flex-col items-center justify-center gap-5 rounded-xl border border-dashed border-border/55 bg-background/35 px-6 py-14 text-center"
          data-site-detail-viewport
          aria-label="Site imagery unavailable"
        >
          <div className="flex size-12 items-center justify-center rounded-full border border-border/50 bg-card/30">
            <ImageOff className="size-5 text-muted-foreground" aria-hidden />
          </div>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
            No curated LRO site imagery is configured for this mission in Site Detail yet. Use the official
            source when available.
          </p>
          {primaryOfficialUrl && primaryOfficialLabel ? (
            <a
              href={primaryOfficialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(officialSourceClassName, "max-w-xs")}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="relative">{primaryOfficialLabel}</span>
              <ArrowUpRight className="relative size-4 opacity-70 transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden />
            </a>
          ) : null}
        </div>
      )}

      <GlassCard className="shrink-0 border-border/45 bg-card/25 p-4 md:p-5">
        <p className={cn(sectionEyebrow, "mb-3")}>Evidence focus</p>
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
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          Site-level imagery and measurements will tie to these tags in a later release.
        </p>
      </GlassCard>

      <p className="pb-1 text-center">
        <Link
          href={`/missions/${mission.slug}`}
          className="text-xs font-medium text-accent/90 underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          Full mission page →
        </Link>
      </p>
    </div>
  )
}
