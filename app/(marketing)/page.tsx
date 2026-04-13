import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { SectionHeader } from '@/components/marketing/section-header'
import { FeatureCard } from '@/components/marketing/feature-card'
import { GlassCard } from '@/components/marketing/glass-card'
import { missions } from '@/data/missions'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'
import { Satellite, Camera, Target, FileText, Building, ExternalLink, ArrowRight, Globe } from 'lucide-react'
import { JsonLd } from '@/components/seo/json-ld'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'
import { SITE_NAME, SITE_TAGLINE, absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = definePageMetadata({
  title: SITE_NAME,
  description:
    'Explore official, verifiable evidence of human presence on the Moon from the Apollo program—LRO views of landing zones, lunar laser ranging, coordinates, and NASA documentation.',
  pathname: '/',
})

const homeSectionY = 'py-20 md:py-24 lg:py-28'

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: absoluteUrl('/'),
  description: SITE_TAGLINE,
  inLanguage: 'en-US',
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: absoluteUrl('/'),
  },
}

const features = [
  {
    icon: Globe,
    title: 'Apollo Landing Sites',
    description: 'Six successful landing locations photographed by multiple orbital missions.',
    href: '/explore',
  },
  {
    icon: Satellite,
    title: 'Sites from orbit (LROC)',
    description:
      'LRO narrow-angle views of all six landing zones—featured-site links, dates, and paths into the full evidence catalogue.',
    href: '/apollo-landing-sites-from-orbit',
  },
  {
    icon: Camera,
    title: 'Visible Hardware',
    description: 'Descent stages, rovers, flags, and scientific instruments remain visible.',
    href: '/evidence#visible-hardware',
  },
  {
    icon: Target,
    title: 'Retroreflectors',
    description: 'Laser ranging reflectors placed by Apollo astronauts are still used today.',
    href: '/evidence#retroreflectors-llr',
  },
  {
    icon: FileText,
    title: 'Mission Documentation',
    description: 'Flight logs, transcripts, photographs, and video footage from official archives.',
    href: '/evidence#nasa-documentation',
  },
  {
    icon: Building,
    title: 'Official Sources',
    description: 'Evidence sourced from NASA, agencies, and peer-reviewed scientific institutions.',
    href: '/sources',
  },
] as const

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <JsonLd data={websiteJsonLd} />
      <section className="relative flex min-h-screen items-center justify-center px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className={cn(ed.eyebrow, 'mb-7 tracking-[0.22em]')}>Official evidence of human presence</p>
          <h1 className="font-serif text-5xl leading-[1.1] tracking-tight text-balance text-foreground md:text-6xl lg:text-7xl xl:text-8xl">
            Traces on the Moon
          </h1>
          <p className={cn(ed.body, 'mx-auto mt-8 max-w-2xl text-pretty text-base md:text-lg')}>
            Explore official, verifiable evidence of human presence on the Moon from the Apollo missions. From orbital
            imagery to retroreflectors still used today.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="min-w-[180px]">
              <Link href="/explore">
                Explore the Moon
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[180px] border-border/55 bg-background/25">
              <Link href="/evidence">View evidence</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className={cn(homeSectionY, 'px-6 lg:px-8')}>
        <div className="mx-auto max-w-7xl">
          <SectionHeader label="What You Will Discover" title="Evidence Categories" description="Multiple independent lines of evidence confirm human exploration of the Moon." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                href={feature.href}
              />
            ))}
          </div>
        </div>
      </section>

      <section className={cn(homeSectionY, 'bg-secondary/20 px-6 lg:px-8')}>
        <div className="mx-auto max-w-7xl">
          <SectionHeader label="Apollo Program" title="Six Landing Sites" description="Between 1969 and 1972, twelve astronauts walked on the lunar surface across six successful missions." />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {missions.map((mission, index) => (
              <Link key={mission.id} href={`/missions/${mission.slug}`} className="group">
                <GlassCard hover className="h-full">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl font-serif text-accent/50 group-hover:text-accent transition-colors">{String(index + 1).padStart(2, '0')}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-serif text-xl text-foreground mt-4 group-hover:text-accent transition-colors">{mission.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{mission.landingSite.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{mission.date}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(homeSectionY, 'px-6 lg:px-8')}>
        <div className="mx-auto max-w-4xl">
          <GlassCard className="border-border/45 px-8 py-14 text-center backdrop-blur-md md:py-16">
            <p className={cn(ed.eyebrow, 'mb-3')}>Start exploring</p>
            <h2 className="font-serif text-3xl tracking-tight text-balance text-foreground md:text-4xl">
              Discover the evidence yourself
            </h2>
            <p className={cn(ed.body, 'mx-auto mt-5 max-w-xl text-pretty md:mt-6')}>
              Open the interactive lunar map, browse the evidence catalogue, or read how independent lines of proof fit
              together.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button asChild size="lg" className="min-w-[180px]">
                <Link href="/explore">
                  Explore the Moon
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[180px] border-border/55 bg-background/25">
                <Link href="/evidence">View evidence</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="min-w-[180px] border-border/55 bg-background/25">
                <Link href="/missions">Apollo missions</Link>
              </Button>
              <Button asChild variant="ghost" size="lg" className="min-w-[180px] text-muted-foreground hover:text-foreground">
                <Link href="/how-we-know">
                  How we know
                  <ExternalLink className="ml-2 h-4 w-4 opacity-80" />
                </Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
