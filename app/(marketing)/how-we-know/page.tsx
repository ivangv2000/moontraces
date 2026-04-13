import type { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { PageHero } from '@/components/marketing/page-hero'
import { GlassCard } from '@/components/marketing/glass-card'
import { Button } from '@/components/ui/button'
import { HowWeKnowSection } from '@/components/how-we-know/how-we-know-section'
import { HowWeKnowFaq } from '@/components/how-we-know/how-we-know-faq'
import { JsonLd } from '@/components/seo/json-ld'
import { howWeKnowContent } from '@/data/how-we-know'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'

export const metadata: Metadata = definePageMetadata({
  title: 'How we know',
  description:
    'How LRO and LROC orbital imagery, visible hardware, lunar laser ranging, and NASA archives independently support the Apollo lunar landings—convergence, not a single proof.',
  pathname: '/how-we-know',
})

export default function HowWeKnowPage() {
  const { hero, intro, pullQuote, sections, faq, closing } = howWeKnowContent

  const faqJsonLd =
    faq && faq.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faq.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: item.answer,
            },
          })),
        }
      : null

  return (
    <div className="min-h-screen">
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <section className="relative overflow-hidden border-b border-border/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(ellipse 75% 55% at 50% -25%, oklch(0.7 0.12 250 / 0.4), transparent 55%),
              radial-gradient(ellipse 45% 35% at 0% 40%, oklch(0.5 0.06 250 / 0.18), transparent 50%)`,
          }}
          aria-hidden
        />
        <PageHero
          label={hero.label}
          title={hero.title}
          description={hero.description}
          className="relative pb-14 pt-28 md:pb-16 md:pt-32"
        >
          {hero.stats && hero.stats.length > 0 ? (
            <div className="mx-auto mt-12 grid max-w-xl grid-cols-3 gap-4 border-y border-border/40 py-8 md:max-w-2xl md:gap-6">
              {hero.stats.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="font-serif text-xl tabular-nums text-foreground md:text-2xl">{s.value}</p>
                  <p className={cn('mt-1', ed.metaLabel)}>{s.label}</p>
                </div>
              ))}
            </div>
          ) : null}
          <div className="mt-8 flex flex-col items-center gap-2">
            <Link href="#orbital-photography" className={ed.jumpLink}>
              Read the five evidence themes
              <ChevronDown className="size-4 opacity-75" aria-hidden />
            </Link>
          </div>
        </PageHero>
      </section>

      <section className={ed.introY} aria-label="Introduction">
        <div className={ed.wrapIntro}>
          <p className={ed.eyebrow}>Overview</p>
          <div className={cn('mt-4 space-y-4', ed.body)}>
            {intro.paragraphs.map((p, idx) => (
              <p key={idx} className="max-w-prose">
                {p}
              </p>
            ))}
          </div>

          <figure className={cn('mt-10', ed.callout)}>
            <blockquote className="font-serif text-lg leading-snug text-foreground/95 md:text-xl text-pretty">
              &ldquo;{pullQuote.text}&rdquo;
            </blockquote>
            {pullQuote.attribution ? (
              <figcaption className={cn('mt-4', ed.metaLabel)}>— {pullQuote.attribution}</figcaption>
            ) : null}
          </figure>
        </div>
      </section>

      {sections.map((section, i) => (
        <HowWeKnowSection key={section.id} section={section} index={i} muted={i % 2 === 1} />
      ))}

      {faq?.length ? <HowWeKnowFaq items={faq} /> : null}

      <section className={cn(ed.sectionY, 'border-t border-border/35')} aria-label="Next steps">
        <div className={ed.wrapIntro}>
          <GlassCard className="border-border/45 bg-card/25 p-8 text-center backdrop-blur-md md:p-10">
            <h2 className={cn(ed.h2, 'mx-auto max-w-lg')}>{closing.title}</h2>
            <p className={cn(ed.body, 'mx-auto mt-4 max-w-xl')}>{closing.body}</p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <Button asChild size="lg">
                <Link href="/evidence">Browse evidence catalogue</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/55 bg-background/30">
                <Link href="/explore">Open explorer</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/55 bg-background/30">
                <Link href="/missions">Mission pages</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-border/55 bg-background/30">
                <Link href="/sources">Sources index</Link>
              </Button>
            </div>
          </GlassCard>
        </div>
      </section>
    </div>
  )
}
