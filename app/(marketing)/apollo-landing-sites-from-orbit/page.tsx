import type { Metadata } from 'next'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { PageHero } from '@/components/marketing/page-hero'
import { GlassCard } from '@/components/marketing/glass-card'
import { JsonLd } from '@/components/seo/json-ld'
import {
  apolloLandingSitesOrbitPageCopy,
  getLrocOrbitSiteRows,
} from '@/data/apollo-landing-sites-orbit-page'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'
import { absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = definePageMetadata({
  title: 'Apollo landing sites from orbit (LROC)',
  description:
    'All six Apollo landing zones as seen by LRO’s narrow-angle camera: LROC featured-site links, landing names, dates, and mission dossiers—plus paths to the evidence catalogue and How we know.',
  pathname: '/apollo-landing-sites-from-orbit',
})

export default function ApolloLandingSitesFromOrbitPage() {
  const rows = getLrocOrbitSiteRows()
  const { hero, intro, methodology, tableIntro, related, faq } = apolloLandingSitesOrbitPageCopy

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Apollo landing sites with LROC featured coverage',
    numberOfItems: rows.length,
    itemListElement: rows.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${r.missionName} — ${r.landingSiteName}`,
      url: absoluteUrl(`/missions/${r.slug}`),
    })),
  }

  return (
    <div className="min-h-screen">
      <JsonLd data={faqJsonLd} />
      <JsonLd data={itemListJsonLd} />

      <section className="relative overflow-hidden border-b border-border/40">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `radial-gradient(ellipse 78% 55% at 50% -22%, oklch(0.68 0.12 250 / 0.38), transparent 55%)`,
          }}
          aria-hidden
        />
        <PageHero
          label={hero.label}
          title={hero.title}
          description={hero.description}
          className="relative pb-14 pt-28 md:pb-16 md:pt-32"
        />
      </section>

      <section className={ed.introY} aria-label="Introduction">
        <div className={ed.wrapIntro}>
          <p className={ed.eyebrow}>Overview</p>
          <p className={cn(ed.introPull, 'mt-3')}>{intro.lead}</p>
          <div className={cn('mt-7 space-y-4', ed.body)}>
            {intro.paragraphs.map((p, i) => (
              <p key={i} className="max-w-prose">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={cn(ed.sectionY, 'bg-secondary/[0.04]')} aria-labelledby="orbit-methodology-heading">
        <div className={ed.wrapIntro}>
          <p className={ed.eyebrow}>{methodology.eyebrow}</p>
          <h2 id="orbit-methodology-heading" className={cn(ed.h2Lead, 'mt-2')}>
            {methodology.title}
          </h2>
          <div className={cn('mt-6 space-y-4', ed.body)}>
            {methodology.paragraphs.map((p, i) => (
              <p key={i} className="max-w-prose">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className={ed.sectionY} aria-labelledby="lroc-table-heading">
        <div className={ed.wrap}>
          <header className="mb-8 md:mb-10">
            <p className={ed.eyebrow}>{tableIntro.eyebrow}</p>
            <h2 id="lroc-table-heading" className={cn(ed.h2Lead, 'mt-2')}>
              {tableIntro.title}
            </h2>
            <p className={cn(ed.body, 'mt-4 max-w-2xl text-pretty')}>{tableIntro.description}</p>
          </header>

          <div className="overflow-x-auto rounded-xl border border-border/45 bg-card/[0.12] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)]">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border/45 bg-secondary/[0.12]">
                  <th scope="col" className={cn('px-4 py-3.5 font-medium text-foreground md:px-5')}>
                    Mission
                  </th>
                  <th scope="col" className={cn('px-4 py-3.5 font-medium text-foreground md:px-5')}>
                    Landing site
                  </th>
                  <th scope="col" className={cn('hidden px-4 py-3.5 font-medium text-foreground lg:table-cell lg:px-5')}>
                    Region
                  </th>
                  <th scope="col" className={cn('px-4 py-3.5 font-medium text-foreground md:px-5')}>
                    Landing date
                  </th>
                  <th scope="col" className={cn('px-4 py-3.5 font-medium text-foreground md:px-5')}>
                    LROC featured site
                  </th>
                  <th scope="col" className={cn('px-4 py-3.5 font-medium text-foreground md:px-5')}>
                    Dossier
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.slug} className="border-b border-border/35 last:border-0">
                    <td className="px-4 py-3.5 align-top text-foreground md:px-5">{r.missionName}</td>
                    <td className="px-4 py-3.5 align-top text-muted-foreground md:px-5">
                      <span className="text-foreground/92">{r.landingSiteName}</span>
                      <span className="mt-1 block text-xs text-muted-foreground lg:hidden">{r.region}</span>
                    </td>
                    <td className="hidden align-top text-muted-foreground lg:table-cell lg:px-5 lg:py-3.5">{r.region}</td>
                    <td className="whitespace-nowrap px-4 py-3.5 align-top tabular-nums text-muted-foreground md:px-5">
                      {r.landingDate}
                    </td>
                    <td className="px-4 py-3.5 align-top md:px-5">
                      {r.lrocFeatured ? (
                        <a
                          href={r.lrocFeatured.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex max-w-[14rem] items-start gap-1.5 text-accent/90 underline-offset-4 hover:text-accent hover:underline"
                        >
                          <span className="min-w-0 break-words">{r.lrocFeatured.label}</span>
                          <ExternalLink className="mt-0.5 size-3.5 shrink-0 opacity-70" aria-hidden />
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 align-top md:px-5">
                      <Link
                        href={`/missions/${r.slug}`}
                        className="text-accent/90 underline-offset-4 hover:text-accent hover:underline"
                      >
                        {r.missionName}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={cn(ed.sectionY, 'border-t border-border/35 bg-secondary/[0.035]')} aria-labelledby="orbit-faq-heading">
        <div className={ed.wrapIntro}>
          <h2 id="orbit-faq-heading" className={ed.h2}>
            Common questions
          </h2>
          <dl className="mt-8 space-y-5">
            {faq.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-border/45 bg-card/20 p-5 backdrop-blur-sm md:p-6"
              >
                <dt className="font-serif text-lg leading-snug tracking-tight text-foreground md:text-xl">
                  {item.question}
                </dt>
                <dd className={cn(ed.body, 'mt-3 text-foreground/88')}>{item.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className={cn(ed.sectionY, 'border-t border-border/35')} aria-label="Related guides">
        <div className={ed.wrap}>
          <h2 className={cn(ed.h2, 'text-center')}>{related.title}</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {related.links.map((item) => (
              <Link key={item.href} href={item.href} className="group block h-full">
                <GlassCard hover className="h-full border-border/45 bg-card/20 p-6 backdrop-blur-md">
                  <p className="font-medium text-foreground transition-colors group-hover:text-accent">{item.label}</p>
                  <p className={cn(ed.body, 'mt-2 text-pretty')}>{item.description}</p>
                </GlassCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
