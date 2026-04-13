import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/marketing/page-hero'
import { MissionCard } from '@/components/missions/mission-card'
import { GlassCard } from '@/components/marketing/glass-card'
import { missions } from '@/data/missions'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'

export const metadata: Metadata = definePageMetadata({
  title: 'Apollo missions',
  description:
    'Six crewed Apollo landings (1969–1972): landing sites, commanders, mission highlights, and links to the interactive map, evidence catalogue, and primary sources.',
  pathname: '/missions',
})

export default function MissionsPage() {
  return (
    <div className="min-h-screen">
      <PageHero
        label="Apollo Program"
        title="The Moon Missions"
        description="Between 1969 and 1972, twelve astronauts walked on the lunar surface across six successful landings—each site since revisited by orbiters such as LRO."
        className="relative pb-14 pt-28 md:pb-16 md:pt-32"
      />

      <section className={cn(ed.introY, ed.wrapIntro)} aria-label="How to use this section">
        <p className={cn(ed.body, 'max-w-prose text-pretty')}>
          Use the{' '}
          <Link href="/explore" className="text-accent underline-offset-4 hover:underline">
            interactive Moon map
          </Link>{' '}
          for geographic context, the{' '}
          <Link href="/evidence" className="text-accent underline-offset-4 hover:underline">
            evidence catalogue
          </Link>{' '}
          for LRO, LLR, and archival entries, and the{' '}
          <Link href="/sources" className="text-accent underline-offset-4 hover:underline">
            sources index
          </Link>{' '}
          to open NASA, ASU/LROC, and partner archives directly.
        </p>
      </section>

      <section className={cn(ed.sectionY, ed.wrapNarrow)} aria-label="Program summary">
        <GlassCard className="border-border/45 p-8 backdrop-blur-md md:p-9">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4 md:gap-6">
            <div>
              <p className="font-serif text-3xl tabular-nums text-foreground">6</p>
              <p className={cn(ed.metaLabel, 'mt-2')}>Successful landings</p>
            </div>
            <div>
              <p className="font-serif text-3xl tabular-nums text-foreground">12</p>
              <p className={cn(ed.metaLabel, 'mt-2')}>Moonwalkers</p>
            </div>
            <div>
              <p className="font-serif text-3xl tabular-nums text-foreground">80+</p>
              <p className={cn(ed.metaLabel, 'mt-2')}>Hours on surface</p>
            </div>
            <div>
              <p className="font-serif text-3xl tabular-nums text-foreground">382</p>
              <p className={cn(ed.metaLabel, 'mt-2')}>kg of samples</p>
            </div>
          </div>
        </GlassCard>
      </section>

      <section className={cn(ed.sectionY, ed.wrapNarrow)} aria-label="Mission list">
        <div className="relative">
          <div className="absolute bottom-0 left-0 top-0 hidden w-px bg-gradient-to-b from-accent via-accent/50 to-accent/10 md:block" />
          <div className="space-y-5 md:space-y-6">
            {missions.map((mission) => (
              <MissionCard
                key={mission.id}
                name={mission.name}
                date={mission.date}
                commander={mission.commander}
                landingSite={mission.landingSite.name}
                slug={mission.slug}
                highlight={mission.highlight}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
