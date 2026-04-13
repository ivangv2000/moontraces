import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { PageHero } from '@/components/marketing/page-hero'
import { SourcesGroupSection } from '@/components/sources/sources-group-section'
import {
  SOURCE_CATALOG_GROUP_ORDER,
  sourcesByGroup,
  sourcesPageCopy,
} from '@/data/sources-catalog'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'

export const metadata: Metadata = definePageMetadata({
  title: 'Sources',
  description:
    'Primary portals and datasets cited on this site: NASA, LROC at Arizona State University, ILRS lunar laser ranging, Apollo documentation, and mission imagery—grouped for verification at the host.',
  pathname: '/sources',
})

export default function SourcesPage() {
  const grouped = sourcesByGroup()

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.11]"
          style={{
            backgroundImage: `radial-gradient(ellipse 70% 50% at 50% -20%, oklch(0.68 0.1 250 / 0.35), transparent 55%)`,
          }}
          aria-hidden
        />
        <PageHero
          label={sourcesPageCopy.hero.label}
          title={sourcesPageCopy.hero.title}
          description={sourcesPageCopy.hero.description}
          className="relative pb-12 pt-28 md:pb-16 md:pt-32"
        >
          <div className="mt-10 flex flex-col items-center gap-2">
            <Link href="#sources-nasa" className={ed.jumpLink}>
              Browse by institution
              <ChevronDown className="size-4 opacity-75" aria-hidden />
            </Link>
          </div>
        </PageHero>
      </section>

      <section className={ed.introY} aria-label="Introduction">
        <div className={ed.wrapIntro}>
          <p className={ed.eyebrow}>Using this page</p>
          <div className={cn('mt-4 space-y-4', ed.body)}>
            {sourcesPageCopy.intro.paragraphs.map((p, idx) => (
              <p key={idx} className="max-w-prose">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {SOURCE_CATALOG_GROUP_ORDER.map((groupId, i) => (
        <SourcesGroupSection key={groupId} groupId={groupId} entries={grouped[groupId]} muted={i % 2 === 1} />
      ))}
    </div>
  )
}
