import type { SourceCatalogEntry, SourceCatalogGroupId } from '@/types/sources-catalog'
import { sourceCatalogGroupMeta } from '@/data/sources-catalog'
import { SourceCatalogCard } from '@/components/sources/source-catalog-card'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface SourcesGroupSectionProps {
  groupId: SourceCatalogGroupId
  entries: SourceCatalogEntry[]
  muted?: boolean
}

export function SourcesGroupSection({ groupId, entries, muted = false }: SourcesGroupSectionProps) {
  const meta = sourceCatalogGroupMeta[groupId]
  if (entries.length === 0) return null

  return (
    <section
      id={meta.sectionId}
      className={cn(ed.sectionY, 'scroll-mt-24 border-b border-border/35', muted && 'bg-secondary/[0.055]')}
      aria-labelledby={`${meta.sectionId}-heading`}
    >
      <div className={ed.wrap}>
        <header className={cn('mb-9 max-w-3xl md:mb-10', ed.sectionHeaderRule)}>
          <p className={ed.eyebrow}>Source group</p>
          <h2 id={`${meta.sectionId}-heading`} className={cn(ed.h2Lead, 'mt-2')}>
            {meta.title}
          </h2>
          <p className={cn(ed.body, 'mt-3 max-w-2xl text-pretty')}>{meta.subtitle}</p>
        </header>

        <div className="grid gap-6 md:grid-cols-2 md:gap-7">
          {entries.map((e) => (
            <SourceCatalogCard key={e.id} entry={e} />
          ))}
        </div>
      </div>
    </section>
  )
}
