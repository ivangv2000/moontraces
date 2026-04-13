import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import type { EvidenceCatalogEntry, EvidenceCategoryId } from '@/types/evidence'
import { evidenceCategoryCopy } from '@/data/evidence-catalog'
import { EvidenceCatalogPanel } from '@/components/evidence/evidence-catalog-panel'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface EvidenceCategorySectionProps {
  categoryId: EvidenceCategoryId
  entries: EvidenceCatalogEntry[]
  icon: LucideIcon
  muted?: boolean
}

export function EvidenceCategorySection({
  categoryId,
  entries,
  icon: Icon,
  muted = false,
}: EvidenceCategorySectionProps) {
  const copy = evidenceCategoryCopy[categoryId]
  if (entries.length === 0) return null

  return (
    <section
      id={copy.sectionId}
      className={cn(ed.sectionY, 'scroll-mt-24', muted && 'bg-secondary/[0.055]')}
      aria-labelledby={`${copy.sectionId}-heading`}
    >
      <div className={ed.wrap}>
        <header className={cn('mb-9 md:mb-10', ed.sectionHeaderRule)}>
          <div className="flex max-w-3xl gap-4 md:gap-5">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-accent/16 bg-accent/[0.07] md:size-12">
              <Icon className="size-[1.15rem] text-accent md:size-5" aria-hidden />
            </div>
            <div className="min-w-0">
              <p className={ed.eyebrow}>Evidence</p>
              <h2 id={`${copy.sectionId}-heading`} className={cn(ed.h2, 'mt-2')}>
                {copy.title}
              </h2>
              <p className={cn(ed.body, 'mt-3 max-w-2xl text-pretty')}>{copy.subtitle}</p>
              {copy.pillarLink ? (
                <p className="mt-3">
                  <Link
                    href={copy.pillarLink.href}
                    className="text-sm font-medium text-accent/90 underline-offset-4 hover:text-accent hover:underline"
                  >
                    {copy.pillarLink.label}
                  </Link>
                </p>
              ) : null}
            </div>
          </div>
        </header>

        <div className="flex flex-col gap-9 md:gap-11">
          {entries.map((entry) => (
            <EvidenceCatalogPanel key={entry.id} entry={entry} />
          ))}
        </div>
      </div>
    </section>
  )
}
