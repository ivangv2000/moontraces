import type { HowWeKnowFaqItem } from '@/types/how-we-know'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

interface HowWeKnowFaqProps {
  items: HowWeKnowFaqItem[]
}

export function HowWeKnowFaq({ items }: HowWeKnowFaqProps) {
  if (!items.length) return null

  return (
    <section
      className={cn(ed.sectionY, 'border-t border-border/35 bg-secondary/[0.04]')}
      aria-labelledby="how-we-know-faq-heading"
    >
      <div className={ed.wrapIntro}>
        <h2 id="how-we-know-faq-heading" className={ed.h2}>
          Questions readers often start with
        </h2>
        <p className={cn(ed.body, 'mt-3 max-w-2xl text-pretty text-muted-foreground')}>
          Short answers only—each section above goes deeper, with primary links at the end of every block.
        </p>
        <dl className="mt-10 space-y-5">
          {items.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-border/45 bg-card/20 p-5 shadow-[inset_0_1px_0_0_oklch(1_0_0/0.03)] backdrop-blur-sm md:p-6"
            >
              <dt className="font-serif text-lg leading-snug tracking-tight text-foreground md:text-xl">{item.question}</dt>
              <dd className={cn(ed.body, 'mt-3 text-foreground/88')}>{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
