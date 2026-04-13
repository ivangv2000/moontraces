/** One captioned figure for mission dossier pages (hero, orbital, evidence, or gallery). */
export interface MissionDossierImageFigure {
  src: string
  alt: string
  caption: string
  /** Attribution line (e.g. agency / instrument). */
  credit: string
  /** Optional official product or archive page. */
  sourceUrl?: string
}

/** Structured imagery bundle for `/missions/[slug]` dossier storytelling. */
export interface MissionDossierMedia {
  hero: MissionDossierImageFigure
  orbital: MissionDossierImageFigure
  evidence: MissionDossierImageFigure
  /** Optional 2–3 small frames; keep short captions. */
  gallery?: MissionDossierImageFigure[]
}
