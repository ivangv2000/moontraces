export interface LandingSite {
  id: string
  name: string
  latitude: number
  longitude: number
  region: string
}

export interface MissionSourceLink {
  id: string
  label: string
  href: string
  external?: boolean
}

/** Curated row for the mission dossier timeline (optional — fallbacks exist). */
export interface MissionTimelineHighlight {
  id: string
  dateLabel: string
  title: string
  detail: string
}

/** Research-style “evidence at this site” bullet (optional — fallbacks exist). */
export interface MissionEvidenceFocus {
  id: string
  headline: string
  detail: string
}

export interface Retroreflector {
  id: string
  name: string
  missionSlug: string
  status: 'active'
  deployedAt: string
  details: string
}

export interface Mission {
  id: string
  name: string
  slug: string
  date: string
  launchDate: string
  landingDate: string
  returnDate: string
  commander: string
  pilotCM: string
  pilotLM: string
  duration: string
  evaTime: string
  samples: string
  highlight: string
  description: string
  achievements: string[]
  equipment: string[]
  landingSite: LandingSite
  /** Short labels for explorer / evidence UI (e.g. LROC, ALSEP). */
  evidenceTags: string[]
  /** Curated references (NASA archives, instrument pages, etc.). */
  sourceLinks: MissionSourceLink[]
  /** Command & lunar module names for dossier display. */
  spacecraft?: { commandModule: string; lunarModule: string }
  /** Rich timeline; if omitted, launch / landing / return are synthesized. */
  timelineHighlights?: MissionTimelineHighlight[]
  /** Narrative evidence points; if omitted, `evidenceTags` are shown as summaries. */
  evidenceFocus?: MissionEvidenceFocus[]
}
