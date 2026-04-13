import type { ReactNode } from 'react'
import Link from 'next/link'
import type { Mission } from '@/types/mission'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface MissionEvidenceFaqProps {
  mission: Mission
  hasRetroreflector: boolean
}

export function MissionEvidenceFaq({ mission, hasRetroreflector }: MissionEvidenceFaqProps) {
  const items: { id: string; question: string; answer: ReactNode }[] = [
    {
      id: 'lroc',
      question: `What do LRO and LROC images show at ${mission.landingSite.name}?`,
      answer: (
        <>
          Published Lunar Reconnaissance Orbiter Camera (LROC) narrow-angle products resolve hardware, experiments, and
          regolith disturbance at the selenographic coordinates on this page. Use the orbital section above and the
          official LROC / NASA links under &ldquo;Official sources&rdquo; for the featured-site and data-product pages
          for {mission.name}.
        </>
      ),
    },
  ]

  if (hasRetroreflector) {
    items.push({
      id: 'llr',
      question: `Did ${mission.name} leave a laser-ranging retroreflector on the surface?`,
      answer: (
        <>
          Yes. This flight deployed an Apollo laser ranging package still timed by Earth observatories. See the lunar
          laser ranging callout in the evidence section, then follow NASA and ILRS references from the{' '}
          <Link href="/sources" className="text-accent underline-offset-4 hover:underline">
            Sources
          </Link>{' '}
          index and the{' '}
          <Link href="/evidence#retroreflectors-llr" className="text-accent underline-offset-4 hover:underline">
            retroreflector catalogue
          </Link>
          .
        </>
      ),
    })
  }

  items.push({
    id: 'context',
    question: 'Where can I read how this evidence fits the wider Apollo record?',
    answer: (
      <>
        The{' '}
        <Link href="/how-we-know" className="text-accent underline-offset-4 hover:underline">
          How we know
        </Link>{' '}
        page summarizes independent lines of proof. The{' '}
        <Link href="/evidence" className="text-accent underline-offset-4 hover:underline">
          Evidence catalogue
        </Link>{' '}
        groups LRO imagery, hardware, LLR, photo comparisons, and NASA documents with primary links.
      </>
    ),
  })

  return (
    <section className={cn(ed.wrapNarrow, 'py-12 lg:py-14')} aria-labelledby={`${mission.slug}-faq-heading`}>
      <h2 id={`${mission.slug}-faq-heading`} className={cn(ed.h2Lead)}>
        Common questions about evidence for this landing
      </h2>
      <p className={cn(ed.body, 'mt-3 max-w-2xl text-pretty text-muted-foreground')}>
        Factual shortcuts—full citations sit in the sections above and in mission source links.
      </p>
      <dl className="mt-8 space-y-5">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border/45 bg-card/15 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] backdrop-blur-sm md:p-6"
          >
            <dt className="font-serif text-lg leading-snug tracking-tight text-foreground md:text-xl">{item.question}</dt>
            <dd className={cn(ed.body, 'mt-3 text-foreground/88')}>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}
