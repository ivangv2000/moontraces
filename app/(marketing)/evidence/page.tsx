import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, Camera, ChevronDown, GalleryHorizontal, Radio, Satellite } from 'lucide-react'
import { PageHero } from '@/components/marketing/page-hero'
import { EvidenceCategorySection } from '@/components/evidence/evidence-category-section'
import {
  EVIDENCE_CATEGORY_ORDER,
  evidenceCatalog,
  evidencePageCopy,
  groupEvidenceByCategory,
} from '@/data/evidence-catalog'
import type { EvidenceCategoryId } from '@/types/evidence'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { GlassCard } from '@/components/marketing/glass-card'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'

export const metadata: Metadata = definePageMetadata({
  title: 'Evidence catalogue',
  description:
    'Catalogue of Apollo-related evidence: LRO narrow-angle imagery, hardware seen from orbit, lunar laser ranging arrays, historical vs modern photo checks, and NASA archives—each entry links to primary sources.',
  pathname: '/evidence',
})

const CATEGORY_ICONS: Record<EvidenceCategoryId, typeof Satellite> = {
  'orbital-imagery': Satellite,
  'visible-hardware': Camera,
  'retroreflectors-llr': Radio,
  'historical-vs-modern': GalleryHorizontal,
  'nasa-documentation': BookOpen,
}

export default function EvidencePage() {
  const grouped = groupEvidenceByCategory(evidenceCatalog)

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden border-b border-border/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `radial-gradient(ellipse 80% 60% at 50% -20%, oklch(0.72 0.14 250 / 0.35), transparent 55%),
              radial-gradient(ellipse 50% 40% at 100% 50%, oklch(0.55 0.08 250 / 0.2), transparent 50%)`,
          }}
          aria-hidden
        />
        <PageHero
          label={evidencePageCopy.hero.label}
          title={evidencePageCopy.hero.title}
          description={evidencePageCopy.hero.description}
          className="relative pb-12 pt-28 md:pb-16 md:pt-32"
        >
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-4 border-y border-border/40 py-8 md:gap-6">
            {evidencePageCopy.stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-serif text-2xl tabular-nums text-foreground md:text-3xl">{s.value}</p>
                <p className={cn('mt-1', ed.metaLabel)}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center gap-2">
            <Link href="#orbital-imagery" className={ed.jumpLink}>
              Browse evidence categories
              <ChevronDown className="size-4 opacity-75" aria-hidden />
            </Link>
          </div>
        </PageHero>
      </section>

      <section className={ed.introY} aria-label="Introduction">
        <div className={ed.wrapIntro}>
          <p className={ed.eyebrow}>Introduction</p>
          <p className={cn(ed.introPull, 'mt-3')}>{evidencePageCopy.intro.lead}</p>
          <div className={cn('mt-7 space-y-4', ed.body)}>
            {evidencePageCopy.intro.paragraphs.map((p, idx) => (
              <p key={idx} className="max-w-prose">
                {p}
              </p>
            ))}
            <p className="max-w-prose">
              For a plain-language overview of how these categories reinforce one another, read{' '}
              <Link href="/how-we-know" className="text-accent underline-offset-4 hover:underline">
                How we know
              </Link>{' '}
              before diving into individual catalogue rows.
            </p>
          </div>
        </div>
      </section>

      {EVIDENCE_CATEGORY_ORDER.map((categoryId, i) => (
        <EvidenceCategorySection
          key={categoryId}
          categoryId={categoryId}
          entries={grouped[categoryId]}
          icon={CATEGORY_ICONS[categoryId]}
          muted={i % 2 === 1}
        />
      ))}

      <section className={cn(ed.sectionY, ed.wrapIntro)} aria-label="Related guides">
        <GlassCard className="border-border/45 bg-card/25 p-8 text-center backdrop-blur-md md:p-10">
          <h2 className={cn(ed.h2, 'mx-auto max-w-lg')}>Related guides</h2>
          <p className={cn(ed.body, 'mx-auto mt-4 max-w-xl text-pretty')}>
            Open the{' '}
            <Link href="/explore" className="text-accent underline-offset-4 hover:underline">
              interactive Moon map
            </Link>{' '}
            to place each artefact in geographic context, read{' '}
            <Link href="/how-we-know" className="text-accent underline-offset-4 hover:underline">
              how the evidence lines converge
            </Link>
            , or browse{' '}
            <Link href="/missions" className="text-accent underline-offset-4 hover:underline">
              mission-by-mission dossiers
            </Link>
            . For LRO narrow-angle coverage of every crewed landing, use{' '}
            <Link href="/apollo-landing-sites-from-orbit" className="text-accent underline-offset-4 hover:underline">
              Apollo landing sites from orbit
            </Link>
            —then audit claims in the{' '}
            <Link href="/sources" className="text-accent underline-offset-4 hover:underline">
              primary source index
            </Link>
            .
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Button asChild size="lg">
              <Link href="/explore">Open Moon map</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/55 bg-background/30">
              <Link href="/apollo-landing-sites-from-orbit">LROC landing-site table</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/55 bg-background/30">
              <Link href="/missions">Mission pages</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-border/55 bg-background/30">
              <Link href="/sources">Primary sources</Link>
            </Button>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}
