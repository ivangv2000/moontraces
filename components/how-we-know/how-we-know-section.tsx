import Link from 'next/link'
import { RemoteFillImage } from '@/components/media/remote-fill-image'
import { ArrowRight, ExternalLink } from 'lucide-react'
import type { HowWeKnowSection as HowWeKnowSectionType } from '@/types/how-we-know'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

function SourceRow({ source }: { source: HowWeKnowSectionType['sources'][number] }) {
  const className = cn(ed.sourceLink, 'items-start')
  const external = !source.href.startsWith('/')
  const inner = (
    <>
      <span className="min-w-0 break-words">{source.label}</span>
      {external ? (
        <ExternalLink className="mt-0.5 size-3.5 shrink-0 opacity-65" aria-hidden />
      ) : (
        <ArrowRight className="mt-0.5 size-3.5 shrink-0 opacity-55" aria-hidden />
      )}
    </>
  )
  if (!external) {
    return (
      <Link href={source.href} className={className}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={source.href} target="_blank" rel="noopener noreferrer" className={className}>
      {inner}
    </a>
  )
}

interface HowWeKnowSectionProps {
  section: HowWeKnowSectionType
  index: number
  muted?: boolean
}

export function HowWeKnowSection({ section, index, muted = false }: HowWeKnowSectionProps) {
  const imageLeft = Boolean(section.image) && index % 2 === 0

  return (
    <section
      id={section.id}
      className={cn(ed.sectionY, 'scroll-mt-24 border-b border-border/35', muted && 'bg-secondary/[0.055]')}
      aria-labelledby={`${section.id}-heading`}
    >
      <div className={ed.wrap}>
        {!section.image ? (
          <div className="mx-auto max-w-3xl">
            <SectionProse section={section} />
          </div>
        ) : imageLeft ? (
          <div className="grid items-start gap-9 lg:grid-cols-12 lg:gap-11">
            <figure className="lg:col-span-5">
              <SectionFigure image={section.image} />
            </figure>
            <div className="lg:col-span-7">
              <SectionProse section={section} />
            </div>
          </div>
        ) : (
          <div className="grid items-start gap-9 lg:grid-cols-12 lg:gap-11">
            <div className="lg:col-span-7">
              <SectionProse section={section} />
            </div>
            <figure className="lg:col-span-5 lg:pt-1">
              <SectionFigure image={section.image} />
            </figure>
          </div>
        )}
      </div>
    </section>
  )
}

function SectionFigure({ image }: { image: NonNullable<HowWeKnowSectionType['image']> }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/45 bg-[#060607] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)]">
      <div className="relative aspect-[4/3] w-full">
        <RemoteFillImage
          src={image.src}
          alt={image.alt}
          className="object-cover object-center"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
      </div>
      {image.caption ? <figcaption className={cn(ed.figcaption, 'text-pretty')}>{image.caption}</figcaption> : null}
    </div>
  )
}

function SectionProse({ section }: { section: HowWeKnowSectionType }) {
  return (
    <div>
      <header className={ed.sectionHeaderRule}>
        <p className={ed.eyebrow}>Line of evidence</p>
        <h2 id={`${section.id}-heading`} className={cn(ed.h2Lead, 'mt-2')}>
          {section.title}
        </h2>
        <p className={cn(ed.body, 'mt-3 max-w-2xl text-pretty')}>{section.lead}</p>
      </header>
      <div className={cn('mt-6 space-y-3.5 text-foreground/88', ed.body)}>
        {section.body.map((p, i) => (
          <p key={i} className="max-w-prose">
            {p}
          </p>
        ))}
      </div>

      {section.seeAlso ? (
        <p className={cn('mt-5 max-w-prose', ed.body)}>
          <span className="text-muted-foreground">See also: </span>
          <Link
            href={section.seeAlso.href}
            className="font-medium text-accent/90 underline-offset-4 hover:text-accent hover:underline"
          >
            {section.seeAlso.label}
          </Link>
          <span className="text-muted-foreground"> — {section.seeAlso.description}</span>
        </p>
      ) : null}

      <div className={cn('mt-7', ed.callout)}>
        <p className={ed.metaLabelAccent}>Why this matters</p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/92 md:text-[0.9375rem]">{section.whyItMatters}</p>
      </div>

      <div className="mt-8">
        <p className={ed.metaLabel}>Official & primary sources</p>
        <ul className={cn(ed.sourceList, 'mt-3')}>
          {section.sources.map((s) => (
            <li key={s.id} className={ed.sourceRow}>
              <div className="min-w-0 flex-1">
                <SourceRow source={s} />
              </div>
              {s.href.startsWith('http') ? (
                <span className={cn(ed.sourceUrlMonoEnd, 'sm:max-w-[48%]')} title={s.href}>
                  {s.href}
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
