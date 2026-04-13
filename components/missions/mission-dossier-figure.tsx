import { ExternalLink } from 'lucide-react'
import type { MissionDossierImageFigure } from '@/types/mission-dossier-media'
import { RemoteFillImage } from '@/components/media/remote-fill-image'
import { ed } from '@/lib/editorial-content'
import { cn } from '@/lib/utils'

type FigureVariant = 'hero' | 'default' | 'compact'

export function MissionDossierFigure({
  figure,
  variant = 'default',
  sizes,
  priority,
  className,
}: {
  figure: MissionDossierImageFigure
  variant?: FigureVariant
  sizes: string
  priority?: boolean
  className?: string
}) {
  const aspect =
    variant === 'hero'
      ? 'aspect-[4/5]'
      : variant === 'compact'
        ? 'aspect-square sm:aspect-[4/3]'
        : 'aspect-[4/3] sm:aspect-[16/10]'

  return (
    <figure
      className={cn(
        'overflow-hidden rounded-xl border border-border/45 bg-[#060607] shadow-[inset_0_1px_0_0_oklch(1_0_0/0.04)]',
        className,
      )}
    >
      <div className={cn('relative w-full', aspect)}>
        <RemoteFillImage
          src={figure.src}
          alt={figure.alt}
          className="object-cover object-center"
          sizes={sizes}
          priority={priority}
        />
      </div>
      <figcaption className={cn(ed.figureCaptionBar, variant === 'compact' && 'px-3 py-2.5 sm:px-3')}>
        <p
          className={cn(
            'leading-relaxed text-foreground/92',
            variant === 'compact' ? 'line-clamp-3 text-xs' : 'text-sm',
          )}
        >
          {figure.caption}
        </p>
        <p className={cn(ed.metaLabel, variant === 'compact' && 'text-[9px]')}>{figure.credit}</p>
        {figure.sourceUrl ? (
          <a
            href={figure.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ed.sourceLink, 'text-xs hover:underline')}
          >
            Official source
            <ExternalLink className="size-3 shrink-0 opacity-70" aria-hidden />
          </a>
        ) : null}
      </figcaption>
    </figure>
  )
}

export function MissionDossierGalleryStrip({ figures }: { figures: MissionDossierImageFigure[] }) {
  if (figures.length === 0) return null
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
      {figures.map((fig, index) => (
        <MissionDossierFigure
          key={`${fig.src}-${index}`}
          figure={fig}
          variant="compact"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
      ))}
    </div>
  )
}
