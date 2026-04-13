import type { ComponentType } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, MapPin, Orbit, Package, Radio, Satellite, Users, Clock, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/marketing/glass-card'
import { retroreflectors } from '@/data/missions'
import { getMissionDossierMediaBySlug } from '@/data/mission-dossier-media'
import { getMissionSiteImageryBySlug } from '@/data/mission-site-imagery'
import { MissionDossierFigure, MissionDossierGalleryStrip } from '@/components/missions/mission-dossier-figure'
import {
  formatLunarLatitude,
  formatLunarLongitude,
  resolvedEvidenceFocus,
  resolvedTimelineHighlights,
} from '@/lib/mission-dossier'
import { MissionEvidenceFaq } from '@/components/missions/mission-evidence-faq'
import type { Mission } from '@/types/mission'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface MissionDossierProps {
  mission: Mission
  prevMission: Mission | null
  nextMission: Mission | null
}

export function MissionDossier({ mission, prevMission, nextMission }: MissionDossierProps) {
  const siteImagery = getMissionSiteImageryBySlug(mission.slug)
  const dossierMedia = getMissionDossierMediaBySlug(mission.slug)
  const timeline = resolvedTimelineHighlights(mission)
  const evidenceItems = resolvedEvidenceFocus(mission)
  const lrrr = retroreflectors.find((r) => r.missionSlug === mission.slug)

  return (
    <div className="min-h-screen pt-24">
      <div className="border-b border-border/40 bg-gradient-to-b from-secondary/[0.08] to-transparent">
        <div className={cn(ed.wrapNarrow, 'pb-14 pt-6')}>
          <Link
            href="/missions"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All missions
          </Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <p className={ed.eyebrowStrong}>{mission.date}</p>
              <h1 className="mt-3 font-serif text-4xl tracking-tight text-foreground md:text-5xl lg:text-6xl">{mission.name}</h1>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">{mission.highlight}</p>
              {mission.spacecraft ? (
                <p className="mt-6 text-sm text-foreground/85">
                  <span className="text-muted-foreground">Spacecraft:</span>{' '}
                  <span className="font-medium">CSM {mission.spacecraft.commandModule}</span>
                  <span className="mx-2 text-border">·</span>
                  <span className="font-medium">LM {mission.spacecraft.lunarModule}</span>
                </p>
              ) : null}
            </div>
            {dossierMedia ? (
              <div className="lg:col-span-5">
                <MissionDossierFigure
                  figure={dossierMedia.hero}
                  variant="hero"
                  sizes="(max-width: 1024px) 100vw, 36vw"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <section className={cn(ed.wrapNarrow, 'py-11 lg:py-12')} aria-label="Key facts">
        <p className={cn(ed.metaLabel, 'mb-5')}>Key facts</p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          <FactCard icon={MapPin} label="Landing site" value={mission.landingSite.name} />
          <FactCard icon={Clock} label="Surface EVA" value={mission.evaTime} />
          <FactCard icon={Package} label="Samples returned" value={mission.samples} />
          <FactCard icon={Satellite} label="Flight duration" value={mission.duration} />
          <FactCard icon={Calendar} label="Launch" value={mission.launchDate} />
          <FactCard icon={Calendar} label="Lunar landing" value={mission.landingDate} />
          <FactCard icon={Calendar} label="Earth return" value={mission.returnDate} className="col-span-2 md:col-span-1" />
          <FactCard icon={Orbit} label="Terrain" value={mission.landingSite.region} className="col-span-2 md:col-span-1" />
        </div>
      </section>

      <section className={cn(ed.wrapNarrow, 'py-11 lg:py-12')} aria-label="Crew and landing site">
        <div className="grid gap-7 lg:grid-cols-2 lg:gap-8">
          <GlassCard className="border-border/45 bg-card/25 p-6 backdrop-blur-md md:p-7">
            <div className="mb-4 flex items-center gap-2.5">
              <Users className="size-5 text-accent" aria-hidden />
              <h2 className="font-serif text-xl tracking-tight text-foreground">Crew</h2>
            </div>
            <dl className="space-y-3.5">
              <div>
                <dt className={ed.metaLabel}>Commander</dt>
                <dd className="mt-1 text-foreground">{mission.commander}</dd>
              </div>
              <div>
                <dt className={ed.metaLabel}>Command module pilot</dt>
                <dd className="mt-1 text-foreground">{mission.pilotCM}</dd>
              </div>
              <div>
                <dt className={ed.metaLabel}>Lunar module pilot</dt>
                <dd className="mt-1 text-foreground">{mission.pilotLM}</dd>
              </div>
            </dl>
          </GlassCard>

          <GlassCard className="border-border/45 bg-card/25 p-6 backdrop-blur-md md:p-7">
            <div className="mb-4 flex items-center gap-2.5">
              <MapPin className="size-5 text-accent" aria-hidden />
              <h2 className="font-serif text-xl tracking-tight text-foreground">Landing site</h2>
            </div>
            <p className={cn(ed.body, 'max-w-prose')}>
              Published coordinates for the landing point in {mission.landingSite.region}. Open Explore for Site detail
              imagery tied to this mission, or read{' '}
              <Link href="/how-we-know#orbital-photography" className="text-accent underline-offset-4 hover:underline">
                how LRO images relate to Apollo
              </Link>{' '}
              and browse{' '}
              <Link href="/evidence#orbital-imagery" className="text-accent underline-offset-4 hover:underline">
                orbital evidence entries
              </Link>
              .
            </p>
            <div className="mt-4 rounded-lg border border-border/40 bg-background/30 p-4 font-mono text-sm tabular-nums text-foreground">
              <p>{formatLunarLatitude(mission.landingSite.latitude)} latitude</p>
              <p className="mt-1">{formatLunarLongitude(mission.landingSite.longitude)} longitude</p>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-5 w-full border-border/55 bg-background/35">
              <Link href="/explore">View in explorer</Link>
            </Button>
          </GlassCard>
        </div>
      </section>

      {dossierMedia ? (
        <section className={cn(ed.wrapNarrow, 'py-10 lg:py-12')} aria-label="Landing zone from orbit">
          <header className={cn('mb-6 md:mb-8', ed.sectionHeaderRule)}>
            <p className={ed.metaLabel}>Orbital context</p>
            <h2 className={cn(ed.h2Lead, 'mt-2')}>LROC imagery of the {mission.name} landing zone</h2>
            <p className={cn(ed.body, 'mt-3 max-w-2xl text-pretty')}>
              LRO narrow-angle camera products georeference hardware and surface disturbance at the published coordinates
              for {mission.landingSite.name}. Featured-site pages and catalogue links below point to the same releases
              cited on the Evidence page.{' '}
              <Link href="/apollo-landing-sites-from-orbit" className="text-accent underline-offset-4 hover:underline">
                All six Apollo sites from orbit
              </Link>{' '}
              lists every crewed zone with LROC featured links in one table.
            </p>
          </header>
          <MissionDossierFigure
            figure={dossierMedia.orbital}
            variant="default"
            sizes="(max-width: 768px) 100vw, min(960px, 85vw)"
          />
        </section>
      ) : null}

      <section className="border-y border-border/35 bg-secondary/[0.04] py-12 lg:py-14" aria-label="Evidence at this site">
        <div className={ed.wrapNarrow}>
          <header className={cn('mb-8 md:mb-9', ed.sectionHeaderRule)}>
            <p className={ed.metaLabel}>Evidence at this site</p>
            <h2 className={cn(ed.h2Lead, 'mt-2')}>
              What LRO, surface photography, and archives show at {mission.landingSite.name}
            </h2>
          </header>
          {dossierMedia ? (
            <div className="mb-8 max-w-3xl md:mb-10">
              <p className={cn(ed.metaLabel, 'mb-3')}>Surface & instruments</p>
              <MissionDossierFigure
                figure={dossierMedia.evidence}
                variant="default"
                sizes="(max-width: 768px) 100vw, min(768px, 70vw)"
              />
            </div>
          ) : null}
          <div className="grid gap-5 md:grid-cols-2 md:gap-6">
            {evidenceItems.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border/45 bg-card/20 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] backdrop-blur-sm md:p-6"
              >
                <h3 className="text-[0.9375rem] font-medium leading-snug text-foreground">{item.headline}</h3>
                <p className={cn(ed.body, 'mt-2')}>{item.detail}</p>
              </div>
            ))}
          </div>
          {lrrr ? (
            <div className={cn('mt-8 flex gap-4 md:items-start', ed.callout)}>
              <Radio className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <div className="min-w-0">
                <p className={ed.metaLabelAccent}>Lunar laser ranging</p>
                <p className="mt-1 font-medium text-foreground">{lrrr.name}</p>
                <p className={cn(ed.body, 'mt-1 text-foreground/88')}>{lrrr.details}</p>
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">Deployed {lrrr.deployedAt}</p>
              </div>
            </div>
          ) : null}
          {dossierMedia?.gallery?.length ? (
            <div className="mt-10">
              <p className={cn(ed.metaLabel, 'mb-4')}>Selected frames</p>
              <MissionDossierGalleryStrip figures={dossierMedia.gallery} />
            </div>
          ) : null}
        </div>
      </section>

      <MissionEvidenceFaq mission={mission} hasRetroreflector={Boolean(lrrr)} />

      {siteImagery ? (
        <section className={cn(ed.wrapNarrow, 'py-12 lg:py-14')} aria-label="Site imagery">
          <header className={cn('mb-7 md:mb-8', ed.sectionHeaderRule)}>
            <p className={ed.metaLabel}>Site imagery</p>
            <h2 className={cn(ed.h2Lead, 'mt-2')}>Curated in explorer Site Detail</h2>
          </header>
          <p className={cn(ed.body, 'max-w-2xl text-pretty')}>
            {siteImagery.title}. Use the explorer’s Site detail tab for the same rasters, or open the official product pages below.
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2 md:gap-7">
            <ImageryLinkCard
              label="Site map"
              slotTitle={siteImagery.contextImage.title}
              caption={siteImagery.contextImage.caption}
              officialHref={siteImagery.contextImage.officialSourceUrl}
              catalogHref={siteImagery.contextImage.catalogUrl}
            />
            {siteImagery.evidenceImage ? (
              <ImageryLinkCard
                label="Evidence close-up"
                slotTitle={siteImagery.evidenceImage.title}
                caption={siteImagery.evidenceImage.caption}
                officialHref={siteImagery.evidenceImage.officialSourceUrl}
                catalogHref={siteImagery.evidenceImage.catalogUrl}
              />
            ) : (
              <GlassCard className="flex flex-col justify-center border-dashed border-border/55 bg-card/15 p-6 text-center backdrop-blur-md md:p-7">
                <p className="text-sm font-medium text-foreground">Dedicated evidence frame</p>
                <p className={cn(ed.body, 'mt-2')}>
                  No separate close-up slot is configured yet. Use the site map product and LROC featured site for orbital context.
                </p>
              </GlassCard>
            )}
          </div>
          <div className="mt-6">
            <Button asChild className="shadow-sm">
              <Link href="/explore">Open explorer — Site detail</Link>
            </Button>
          </div>
        </section>
      ) : null}

      <section className={cn(ed.wrapNarrow, 'py-12 lg:py-14')}>
        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-9 lg:col-span-2">
            <div>
              <p className={ed.metaLabel}>Mission overview</p>
              <p className={cn(ed.body, 'mt-4 max-w-prose text-base text-foreground/90 md:text-[1.0625rem]')}>
                {mission.description}
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl tracking-tight text-foreground">Key achievements</h2>
              <ul className="mt-5 space-y-2.5">
                {mission.achievements.map((a) => (
                  <li key={a} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
                    <span className={cn(ed.bodyTight, 'text-foreground/92')}>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="font-serif text-2xl tracking-tight text-foreground">Surface hardware & experiments</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {mission.equipment.map((eq) => (
                  <li
                    key={eq}
                    className="rounded-md border border-border/45 bg-secondary/60 px-3 py-1.5 text-sm text-foreground/90"
                  >
                    {eq}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <p className={ed.metaLabel}>Timeline highlights</p>
            <ol className="relative mt-5 list-none space-y-6 border-l border-border/50 pl-6">
              {timeline.map((t) => (
                <li key={t.id} className="relative pl-1">
                  <span
                    className="absolute -left-[calc(0.375rem+5px)] top-1.5 size-2.5 rounded-full border border-accent/40 bg-accent/25"
                    aria-hidden
                  />
                  <p className={ed.eyebrow}>{t.dateLabel}</p>
                  <p className="mt-1 font-medium text-foreground">{t.title}</p>
                  <p className={cn(ed.body, 'mt-2')}>{t.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t border-border/40 bg-secondary/[0.05] py-12 lg:py-14" aria-label="Official sources">
        <div className={ed.wrapNarrow}>
          <header className={cn('mb-7 md:mb-8', ed.sectionHeaderRule)}>
            <h2 className={ed.h2}>Official sources</h2>
            <p className={cn(ed.body, 'mt-2 max-w-xl')}>
              Primary portals and data releases for verifying mission-specific claims. Cross-check themes on the{' '}
              <Link href="/evidence" className="text-accent underline-offset-4 hover:underline">
                Evidence catalogue
              </Link>{' '}
              and the wider{' '}
              <Link href="/how-we-know" className="text-accent underline-offset-4 hover:underline">
                How we know
              </Link>{' '}
              overview when you need category-level context.
            </p>
          </header>
          <ul className={ed.sourceList}>
            {mission.sourceLinks.map((s) => (
              <li key={s.id} className={ed.sourceRow}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className={ed.sourceLink}>
                  <span className="min-w-0 break-words">{s.label}</span>
                  <ExternalLink className="size-3.5 shrink-0 opacity-65" aria-hidden />
                </a>
                <span className={ed.sourceUrlMonoEnd} title={s.href}>
                  {s.href}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={cn(ed.wrapNarrow, 'py-11 lg:py-12')}>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
          {prevMission ? (
            <Link
              href={`/missions/${prevMission.slug}`}
              className="group flex flex-1 items-center gap-4 rounded-xl border border-border/45 p-4 transition-colors hover:border-border hover:bg-card/20"
            >
              <ArrowLeft className="size-5 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden />
              <div>
                <p className={ed.metaLabel}>Previous mission</p>
                <p className="mt-0.5 font-medium text-foreground transition-colors group-hover:text-accent">{prevMission.name}</p>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextMission ? (
            <Link
              href={`/missions/${nextMission.slug}`}
              className="group flex flex-1 items-center justify-end gap-4 rounded-xl border border-border/45 p-4 text-right transition-colors hover:border-border hover:bg-card/20 sm:text-right"
            >
              <div>
                <p className={ed.metaLabel}>Next mission</p>
                <p className="mt-0.5 font-medium text-foreground transition-colors group-hover:text-accent">{nextMission.name}</p>
              </div>
              <ArrowRight className="size-5 text-muted-foreground transition-colors group-hover:text-accent" aria-hidden />
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </section>
    </div>
  )
}

function FactCard({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon: ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  label: string
  value: string
  className?: string
}) {
  return (
    <GlassCard className={cn('border-border/45 bg-card/25 p-4 backdrop-blur-md', className)}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
        <div className="min-w-0">
          <p className={ed.metaLabel}>{label}</p>
          <p className="mt-1 text-sm font-medium leading-snug text-foreground">{value}</p>
        </div>
      </div>
    </GlassCard>
  )
}

function ImageryLinkCard({
  label,
  slotTitle,
  caption,
  officialHref,
  catalogHref,
}: {
  label: string
  slotTitle: string
  caption: string
  officialHref: string
  catalogHref?: string
}) {
  return (
    <GlassCard className="flex h-full flex-col border-border/45 bg-card/25 p-5 backdrop-blur-md md:p-6">
      <p className={ed.metaLabelAccent}>{label}</p>
      <h3 className="mt-2 font-serif text-lg tracking-tight text-foreground">{slotTitle}</h3>
      <p className={cn(ed.body, 'mt-2 flex-1 line-clamp-4 text-pretty')}>{caption}</p>
      <div className="mt-4 flex flex-col gap-2 border-t border-border/35 pt-4">
        <a href={officialHref} target="_blank" rel="noopener noreferrer" className={ed.sourceLink}>
          Official LROC / NASA product
          <ExternalLink className="size-3.5 shrink-0 opacity-65" aria-hidden />
        </a>
        {catalogHref ? (
          <a
            href={catalogHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            File / catalog page
            <ExternalLink className="size-3 opacity-55" aria-hidden />
          </a>
        ) : null}
      </div>
    </GlassCard>
  )
}
