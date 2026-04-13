import type { MissionSiteAnnotation, MissionSiteRasterAnnotationSet } from "@/types/mission-site-annotations"
import type { MissionSiteImageSlot } from "@/types/mission-site-imagery"

const NO_ANNOTATIONS: MissionSiteAnnotation[] = []

/**
 * Keys MUST match `imageUrl` on the corresponding slot in `mission-site-imagery.ts` exactly.
 * Wrong labels are worse than none: keep `validated: false` until coordinates are checked on the live raster.
 */

const A11_SITE_MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/f/f4/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A11LEMa_1000%29.png"
const A11_EVIDENCE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/d/d2/Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_%286962456839%29.jpg"

const A12_SITE_MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/7/72/Pinpoint_Landing_on_the_Ocean_of_Storms_%28LROC401_-_M175428601RE_25cm_AP12_area%29.png"
const A12_EVIDENCE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/2/2b/Apollo_12_Fifty-first_Anniversary_%28LROC1135%29.png"

const A14_SITE_MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/6c/Precise_3D_Measurements_of_Objects_at_Apollo_14_Landing_Site_from_LROC_NAC_Stereo_Images_%28LROC29_-_5%29.png"
const A14_EVIDENCE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/LRO_Apollo14_landing_site_369441main_lroc_apollo14_lrg.jpg"

const A15_SITE_MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/a/a3/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A15LEMa_1000%29.png"
const A15_EVIDENCE_URL =
  "https://upload.wikimedia.org/wikipedia/commons/3/3a/Apollo_15-_Follow_the_Tracks_%286816337786%29.jpg"

const A16_SITE_MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/6/60/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A16LEMa_1000%29.png"
const A16_EVIDENCE_URL = "https://upload.wikimedia.org/wikipedia/commons/0/04/Apollo_16_LS.png"

const A17_SITE_MAP_URL =
  "https://upload.wikimedia.org/wikipedia/commons/b/b5/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A17LEMa_1000%29.png"
const A17_EVIDENCE_URL = "https://upload.wikimedia.org/wikipedia/commons/3/30/Apollo_17_LM_Challenger_LRO.png"

const DRAFT_A11_MAP: MissionSiteAnnotation[] = [
  {
    id: "a11-map-lm",
    x: 0.48,
    y: 0.5,
    label: "LM site",
    description: "Tranquility Base — descent stage and EVA disturbance.",
    type: "hardware",
  },
  {
    id: "a11-map-west",
    x: 0.64,
    y: 0.3,
    label: "West crater",
    description: "Bright ray crater on the ~1 km post-157 context frame.",
    type: "landmark",
  },
  {
    id: "a11-map-little-west",
    x: 0.4,
    y: 0.44,
    label: "Little West",
    description: "Short EVA hop target west of the LM on regional NAC.",
    type: "traverse",
  },
]

const DRAFT_A11_EVIDENCE: MissionSiteAnnotation[] = [
  {
    id: "a11-ev-lm",
    x: 0.52,
    y: 0.48,
    label: "LM",
    description: "Lunar module and landing gear shadow in low-altitude NAC.",
    type: "hardware",
  },
  {
    id: "a11-ev-psep",
    x: 0.43,
    y: 0.5,
    label: "PSEP",
    description: "Passive seismic experiment package.",
    type: "experiment",
  },
  {
    id: "a11-ev-lrrr",
    x: 0.58,
    y: 0.45,
    label: "LRRR",
    description: "Laser ranging retroreflector still in use from Earth.",
    type: "experiment",
  },
  {
    id: "a11-ev-paths",
    x: 0.5,
    y: 0.58,
    label: "EVA paths",
    description: "Boot trails between the LM and deployed experiments.",
    type: "tracks",
  },
]

/**
 * Apollo 12 — LROC post 401 annotated mosaic (M175428601RE footprint, Wikimedia PNG).
 * Validated on the live raster using the printed LROC callouts (Intrepid, Surveyor III, ALSEP).
 */
const A12_SITE_MAP_ANNOTATIONS: MissionSiteAnnotation[] = [
  {
    id: "a12-map-intrepid",
    x: 0.68,
    y: 0.41,
    label: "Intrepid",
    description: "LM descent stage — annotated on the official post-401 site figure.",
    type: "hardware",
  },
  {
    id: "a12-map-surveyor",
    x: 0.88,
    y: 0.6,
    label: "Surveyor III",
    description: "Robot lander on Surveyor Crater’s inner slope (as labeled on the mosaic).",
    type: "hardware",
  },
  {
    id: "a12-map-alsep",
    x: 0.53,
    y: 0.23,
    label: "ALSEP",
    description: "Surface experiments northwest of Intrepid on the curated map.",
    type: "experiment",
  },
]

/**
 * Apollo 12 — LROC post 1135 51st-anniversary NAC mosaic (Wikimedia PNG).
 * Validated on the live raster against the figure’s white arrows; crew tracks are visibly resolved.
 */
const A12_EVIDENCE_ANNOTATIONS: MissionSiteAnnotation[] = [
  {
    id: "a12-ev-intrepid",
    x: 0.42,
    y: 0.38,
    label: "Intrepid",
    description: "Descent stage — bright deck with shadow in the low-altitude pass.",
    type: "hardware",
  },
  {
    id: "a12-ev-surveyor",
    x: 0.85,
    y: 0.76,
    label: "Surveyor III",
    description: "Surveyor hardware inside the large eastern crater rim.",
    type: "hardware",
  },
  {
    id: "a12-ev-alsep",
    x: 0.11,
    y: 0.08,
    label: "ALSEP",
    description: "Experiment cluster at the northwest anchor of the EVA network.",
    type: "experiment",
  },
  {
    id: "a12-ev-tracks",
    x: 0.3,
    y: 0.26,
    label: "Crew tracks",
    description: "Boot paths between Intrepid and ALSEP (and onward toward Surveyor).",
    type: "tracks",
  },
]

const DRAFT_A14_MAP: MissionSiteAnnotation[] = [
  {
    id: "a14-map-antares",
    x: 0.45,
    y: 0.55,
    label: "Antares",
    description: "LM on the published Fra Mauro traverse basemap.",
    type: "hardware",
  },
  {
    id: "a14-map-alsep",
    x: 0.7,
    y: 0.4,
    label: "ALSEP",
    description: "Surface experiments west of the landing point.",
    type: "experiment",
  },
  {
    id: "a14-map-traverse",
    x: 0.55,
    y: 0.32,
    label: "EVA traverse",
    description: "Stations toward Cone crater on the stereo-paper figure.",
    type: "traverse",
  },
  {
    id: "a14-map-cone",
    x: 0.72,
    y: 0.22,
    label: "Cone crater",
    description: "Geology target to the north of the landing site.",
    type: "landmark",
  },
]

const DRAFT_A14_EVIDENCE: MissionSiteAnnotation[] = [
  {
    id: "a14-ev-lm",
    x: 0.5,
    y: 0.48,
    label: "Antares",
    description: "LM descent stage in the 369441main NAC release.",
    type: "hardware",
  },
  {
    id: "a14-ev-alsep",
    x: 0.62,
    y: 0.54,
    label: "ALSEP",
    description: "Experiment cluster and cable runs.",
    type: "experiment",
  },
  {
    id: "a14-ev-met",
    x: 0.42,
    y: 0.52,
    label: "MET / tracks",
    description: "Equipment cart trails and boot paths in regolith.",
    type: "tracks",
  },
]

/**
 * Apollo 15 — LROC post 157 crop `A15LEMa_1000` (Wikimedia PNG).
 * Checked on the live raster: LM *Falcon* reads as a bright pixel cluster near image center;
 * the dominant fresh crater is in the upper-left. This frame does not clearly resolve Hadley
 * Rille at usable scale, so no rille callout (a rille label here would mislead).
 */
const A15_SITE_MAP_ANNOTATIONS: MissionSiteAnnotation[] = [
  {
    id: "a15-map-falcon",
    x: 0.51,
    y: 0.5,
    label: "Falcon",
    description: "LM descent stage on the post-157 regional NAC.",
    type: "hardware",
  },
  {
    id: "a15-map-major-crater",
    x: 0.15,
    y: 0.23,
    label: "Major crater",
    description: "Large fresh crater on the landing plain — orienting landmark.",
    type: "landmark",
  },
]

/**
 * Apollo 15 — GSFC/LROC “Follow the Tracks” low-altitude NAC (6816337786).
 * Checked on the live raster against the figure’s printed callouts and traverse arrows.
 */
const A15_EVIDENCE_ANNOTATIONS: MissionSiteAnnotation[] = [
  {
    id: "a15-ev-lm",
    x: 0.46,
    y: 0.5,
    label: "LM",
    description: "Falcon descent stage — bright deck and long sun shadow.",
    type: "hardware",
  },
  {
    id: "a15-ev-alsep",
    x: 0.12,
    y: 0.3,
    label: "ALSEP",
    description: "Apollo Lunar Surface Experiments Package cluster.",
    type: "experiment",
  },
  {
    id: "a15-ev-lrv",
    x: 0.93,
    y: 0.56,
    label: "LRV",
    description: "Lunar Roving Vehicle at the eastern traverse stop.",
    type: "hardware",
  },
  {
    id: "a15-ev-rover-tracks",
    x: 0.7,
    y: 0.53,
    label: "Rover tracks",
    description: "LRV wheel paths between Falcon and the far stop.",
    type: "tracks",
  },
]

/**
 * Per-raster registry: lookup by exact `imageUrl` from `mission-site-imagery.ts`.
 */
const MISSION_SITE_RASTER_ANNOTATIONS: Record<string, MissionSiteRasterAnnotationSet> = {
  [A11_SITE_MAP_URL]: {
    validated: false,
    curationNote: "Draft — verify on A11 LROC157 raster before enabling.",
    annotations: DRAFT_A11_MAP,
  },
  [A11_EVIDENCE_URL]: {
    validated: false,
    curationNote: "Draft — verify on Stark Beauty / M175124932R frame before enabling.",
    annotations: DRAFT_A11_EVIDENCE,
  },
  [A12_SITE_MAP_URL]: {
    validated: true,
    curationNote:
      "Validated 2026-04 on Wikimedia LROC401 Pinpoint Landing PNG — positions matched to printed Intrepid / Surveyor III / ALSEP callouts.",
    annotations: A12_SITE_MAP_ANNOTATIONS,
  },
  [A12_EVIDENCE_URL]: {
    validated: true,
    curationNote:
      "Validated 2026-04 on Wikimedia LROC1135 anniversary PNG — hardware per white arrows; one tracks pin on the clear NW path segment.",
    annotations: A12_EVIDENCE_ANNOTATIONS,
  },
  [A14_SITE_MAP_URL]: {
    validated: false,
    curationNote: "Draft — verify on LROC post 29 traverse figure before enabling.",
    annotations: DRAFT_A14_MAP,
  },
  [A14_EVIDENCE_URL]: {
    validated: false,
    curationNote: "Draft — verify on 369441main NAC before enabling.",
    annotations: DRAFT_A14_EVIDENCE,
  },
  [A15_SITE_MAP_URL]: {
    validated: true,
    curationNote:
      "Validated 2026-04 on Wikimedia A15LEMa_1000 PNG: LM speck + dominant UL crater; rille not labeled (not clearly resolved in this crop).",
    annotations: A15_SITE_MAP_ANNOTATIONS,
  },
  [A15_EVIDENCE_URL]: {
    validated: true,
    curationNote:
      "Validated 2026-04 on Wikimedia Follow the Tracks (6816337786) JPG against printed NASA figure callouts.",
    annotations: A15_EVIDENCE_ANNOTATIONS,
  },
  [A16_SITE_MAP_URL]: {
    validated: false,
    annotations: [],
  },
  [A16_EVIDENCE_URL]: {
    validated: false,
    annotations: [],
  },
  [A17_SITE_MAP_URL]: {
    validated: false,
    annotations: [],
  },
  [A17_EVIDENCE_URL]: {
    validated: false,
    annotations: [],
  },
}

/**
 * Returns annotations for the OpenSeadragon tile only if this exact raster has a validated set.
 */
export function getValidatedAnnotationsForImageUrl(imageUrl: string | null | undefined): MissionSiteAnnotation[] {
  if (!imageUrl) return NO_ANNOTATIONS
  const entry = MISSION_SITE_RASTER_ANNOTATIONS[imageUrl]
  if (!entry?.validated || entry.annotations.length === 0) return NO_ANNOTATIONS
  return entry.annotations
}

export function getValidatedAnnotationsForSlot(slot: MissionSiteImageSlot | null): MissionSiteAnnotation[] {
  if (!slot) return NO_ANNOTATIONS
  return getValidatedAnnotationsForImageUrl(slot.imageUrl)
}
