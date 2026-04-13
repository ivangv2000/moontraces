/**
 * Shared typography, spacing, and chrome for longform content pages
 * (evidence, how-we-know, sources, mission dossiers).
 * Keep explorer/marketing shells unchanged.
 */
export const ed = {
  /** Standard horizontal padding + max width for wide sections. */
  wrap: 'mx-auto max-w-6xl px-6 lg:px-8',
  wrapNarrow: 'mx-auto max-w-5xl px-6 lg:px-8',
  wrapIntro: 'mx-auto max-w-3xl px-6 lg:px-8',

  sectionY: 'py-16 md:py-20 lg:py-[5.25rem]',
  introY: 'py-14 md:py-16 lg:py-20',

  eyebrow: 'text-[10px] font-medium uppercase tracking-[0.2em] text-accent/85',
  eyebrowStrong: 'text-[10px] font-medium uppercase tracking-[0.2em] text-accent/90',

  h2: 'font-serif text-2xl tracking-tight text-foreground md:text-3xl',
  /** Serif subhead under an eyebrow (section intros). */
  h2Lead: 'mt-2 max-w-2xl font-serif text-2xl tracking-tight text-foreground md:text-3xl text-pretty',

  introPull: 'font-serif text-xl leading-[1.45] text-foreground/95 md:text-2xl text-pretty',

  body: 'text-sm leading-relaxed text-muted-foreground md:text-base',
  bodyTight: 'text-sm leading-snug text-muted-foreground md:text-[0.9375rem] md:leading-relaxed',

  metaLabel: 'text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground',
  metaLabelAccent: 'text-[10px] font-medium uppercase tracking-[0.16em] text-accent/90',

  /** “Why this matters” / “What this establishes” — left rail, matches across pages. */
  callout: 'rounded-md border-l-2 border-accent/35 bg-accent/[0.055] py-3.5 pl-5 pr-4',

  /** Caption under a figure (not over image). */
  figcaption: 'border-t border-border/40 bg-secondary/[0.22] px-4 py-2.5 text-[11px] italic leading-snug text-muted-foreground md:text-xs',

  /** Labels on dark comparison / hero imagery. */
  figcaptionOverlay:
    'bg-gradient-to-t from-black/90 via-black/45 to-transparent px-3 py-2.5 text-[10px] font-medium uppercase tracking-[0.14em] text-white/88',

  /** Stacked official links (label + optional URL line). */
  sourceList: 'overflow-hidden rounded-lg border border-border/40 bg-card/[0.16] divide-y divide-border/35',
  sourceRow:
    'flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-card/22 sm:flex-row sm:items-center sm:justify-between sm:gap-4',

  /** Primary label row for external sources (catalogue lists, dossiers). */
  sourceLink:
    'inline-flex max-w-full items-center gap-1.5 text-sm font-medium text-accent/90 transition-colors hover:text-accent',
  /** Monospace URL line in split rows (evidence panel, mission dossier). */
  sourceUrlMonoEnd:
    'truncate font-mono text-[10px] leading-snug text-muted-foreground/75 sm:max-w-[46%] sm:shrink-0 sm:text-right',
  /** Full-width monospace URL under a single CTA (e.g. source cards). */
  sourceUrlMonoBlock: 'mt-2 block w-full truncate font-mono text-[10px] leading-snug text-muted-foreground/75',

  /** Caption bar under mission / editorial figures (matches catalogue figcaption tone). */
  figureCaptionBar: 'space-y-2 border-t border-border/40 bg-secondary/[0.22] px-4 py-2.5 sm:py-3',

  jumpLink: 'inline-flex items-center gap-2 text-sm font-medium text-accent/90 transition-colors hover:text-accent',

  sectionHeaderRule: 'border-b border-border/40 pb-7 md:pb-8',
} as const
