import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { SourceCatalogEntry } from '@/types/sources-catalog'
import { sourceTypeLabels } from '@/data/sources-catalog'
import { getMissionBySlug } from '@/lib/missions'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface SourceCatalogCardProps {
  entry: SourceCatalogEntry
  className?: string
}

export function SourceCatalogCard({ entry, className }: SourceCatalogCardProps) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-xl border border-border/45 bg-card/25 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)] backdrop-blur-md transition-colors duration-200 hover:border-border/65 hover:bg-card/32 md:p-6',
        className,
      )}
    >
      <header className="space-y-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded border border-accent/20 bg-accent/[0.08] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-accent/95">
            {sourceTypeLabels[entry.sourceType]}
          </span>
          {entry.tags?.map((t) => (
            <span
              key={t}
              className="rounded-md border border-border/40 bg-secondary/50 px-2 py-0.5 text-[10px] font-medium text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>
        <p className={ed.metaLabel}>{entry.institution}</p>
        <h3 className="font-serif text-lg leading-[1.3] tracking-tight text-foreground md:text-[1.125rem]">{entry.title}</h3>
      </header>

      <p className={cn(ed.body, 'mt-3 flex-1 max-w-prose')}>{entry.description}</p>

      {entry.missionSlugs && entry.missionSlugs.length > 0 ? (
        <div className="mt-4">
          <p className={ed.metaLabel}>Missions</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {entry.missionSlugs.map((slug) => {
              const m = getMissionBySlug(slug)
              return (
                <li key={slug}>
                  <Link
                    href={`/missions/${slug}`}
                    className="inline-flex rounded-md border border-border/50 bg-background/35 px-2.5 py-1 text-xs font-medium text-foreground/88 transition-colors hover:border-accent/28 hover:text-accent"
                  >
                    {m?.name ?? slug}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : null}

      <div className="mt-5 border-t border-border/35 pt-4">
        <a href={entry.url} target="_blank" rel="noopener noreferrer" className={ed.jumpLink}>
          Open official resource
          <ExternalLink className="size-3.5 shrink-0 opacity-70" aria-hidden />
        </a>
        <p className={cn(ed.sourceUrlMonoBlock)} title={entry.url}>
          {entry.url}
        </p>
      </div>
    </article>
  )
}
