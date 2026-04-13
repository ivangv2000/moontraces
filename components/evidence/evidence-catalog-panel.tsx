import Link from 'next/link'
import { RemoteFillImage } from '@/components/media/remote-fill-image'
import { ExternalLink } from 'lucide-react'
import type { EvidenceCatalogEntry } from '@/types/evidence'
import { getMissionBySlug } from '@/lib/missions'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface EvidenceCatalogPanelProps {
  entry: EvidenceCatalogEntry
}

export function EvidenceCatalogPanel({ entry }: EvidenceCatalogPanelProps) {
  const spotlight = entry.prominence === 'spotlight'
  const hasComparison = Boolean(entry.comparisonImage)
  const captionUnderImage = entry.caption && !hasComparison

  return (
    <article
      className={cn(
        'overflow-hidden rounded-xl border border-border/45 bg-card/25 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] backdrop-blur-md transition-colors duration-300 hover:border-border/60 hover:bg-card/30',
        spotlight && 'ring-1 ring-accent/10',
      )}
    >
      <div className="grid lg:grid-cols-12 lg:gap-0">
        <div
          className={cn(
            'relative border-b border-border/40 bg-[#060607] lg:col-span-7 lg:border-b-0 lg:border-r lg:border-border/35',
            spotlight ? 'min-h-[260px] lg:min-h-[380px]' : 'min-h-[200px] lg:min-h-[300px]',
          )}
        >
          {hasComparison ? (
            <div className="grid h-full min-h-[inherit] grid-cols-1 sm:grid-cols-2">
              <figure className="relative min-h-[190px] border-b border-border/35 sm:min-h-[220px] sm:border-b-0 sm:border-r sm:border-border/35">
                <RemoteFillImage
                  src={entry.image.src}
                  alt={entry.image.alt}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
                {entry.primaryImageCaption ? (
                  <figcaption className={cn('absolute inset-x-0 bottom-0', ed.figcaptionOverlay)}>{entry.primaryImageCaption}</figcaption>
                ) : null}
              </figure>
              <figure className="relative min-h-[190px] sm:min-h-[220px]">
                <RemoteFillImage
                  src={entry.comparisonImage!.src}
                  alt={entry.comparisonImage!.alt}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 35vw"
                />
                {entry.comparisonImage!.caption ? (
                  <figcaption className={cn('absolute inset-x-0 bottom-0', ed.figcaptionOverlay)}>
                    {entry.comparisonImage!.caption}
                  </figcaption>
                ) : null}
              </figure>
            </div>
          ) : (
            <figure className="flex h-full min-h-[inherit] flex-col">
              <div className="relative min-h-[200px] flex-1 lg:min-h-0">
                <RemoteFillImage
                  src={entry.image.src}
                  alt={entry.image.alt}
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority={spotlight}
                />
              </div>
              {captionUnderImage ? <figcaption className={ed.figcaption}>{entry.caption}</figcaption> : null}
            </figure>
          )}
        </div>

        <div className="flex flex-col lg:col-span-5">
          <div className="flex flex-1 flex-col gap-6 p-6 md:gap-7 md:p-7">
            <header className="space-y-2.5">
              {spotlight ? <p className={ed.eyebrowStrong}>Spotlight</p> : null}
              <h3 className="font-serif text-xl leading-[1.25] tracking-tight text-foreground md:text-[1.35rem]">{entry.title}</h3>
              <p className={cn(ed.body, 'max-w-prose')}>{entry.summary}</p>
            </header>

            {entry.whatThisProves ? (
              <div className={ed.callout}>
                <p className={ed.metaLabelAccent}>What this establishes</p>
                <p className="mt-2 text-sm leading-relaxed text-foreground/92 md:text-[0.9375rem]">{entry.whatThisProves}</p>
              </div>
            ) : null}

            <div>
              <p className={ed.metaLabel}>Related missions</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {entry.missionSlugs.map((slug) => {
                  const m = getMissionBySlug(slug)
                  const label = m?.name ?? slug
                  return (
                    <li key={slug}>
                      <Link
                        href={`/missions/${slug}`}
                        className="inline-flex items-center rounded-md border border-border/50 bg-background/40 px-2.5 py-1 text-xs font-medium text-foreground/90 transition-colors hover:border-accent/28 hover:bg-accent/[0.08] hover:text-accent"
                      >
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="mt-auto border-t border-border/35 pt-5">
              <p className={ed.metaLabel}>Official sources</p>
              <ul className={cn(ed.sourceList, 'mt-3')}>
                {entry.sources.map((s) => (
                  <li key={s.id} className={ed.sourceRow}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={ed.sourceLink}
                    >
                      <span className="min-w-0 break-words">{s.label}</span>
                      <ExternalLink className="size-3.5 shrink-0 opacity-65" aria-hidden />
                    </a>
                    <span className={cn(ed.sourceUrlMonoEnd)} title={s.href}>
                      {s.href}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {entry.caption && hasComparison ? (
            <p className={cn(ed.figcaption, 'not-italic border-t border-border/35 px-6 md:px-7')}>{entry.caption}</p>
          ) : null}
        </div>
      </div>
    </article>
  )
}
