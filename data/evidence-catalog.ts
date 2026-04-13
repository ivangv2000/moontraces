import type { EvidenceCatalogEntry, EvidenceCategoryId } from '@/types/evidence'

/** Stable section order on `/evidence`. */
export const EVIDENCE_CATEGORY_ORDER: EvidenceCategoryId[] = [
  'orbital-imagery',
  'visible-hardware',
  'retroreflectors-llr',
  'historical-vs-modern',
  'nasa-documentation',
]

export const evidenceCategoryCopy: Record<
  EvidenceCategoryId,
  {
    title: string
    subtitle: string
    sectionId: string
    /** Optional on-site pillar (shown as a link under the subtitle). */
    pillarLink?: { href: string; label: string }
  }
> = {
  'orbital-imagery': {
    sectionId: 'orbital-imagery',
    title: 'LRO and LROC orbital imagery',
    subtitle:
      'Narrow-angle camera strips and curated mosaics resolve each Apollo zone from above—often at sub-metre scales in later LRO campaigns.',
    pillarLink: {
      href: '/apollo-landing-sites-from-orbit',
      label: 'Apollo landing sites from orbit — six-site LROC table',
    },
  },
  'visible-hardware': {
    sectionId: 'visible-hardware',
    title: 'Surface hardware visible from orbit',
    subtitle:
      'Descent stages, experiment packages, and rover hardware cast predictable shadows; tracks and disturbed regolith persist in LROC frames.',
  },
  'retroreflectors-llr': {
    sectionId: 'retroreflectors-llr',
    title: 'Retroreflectors and lunar laser ranging',
    subtitle:
      'Corner-cube arrays left by Apollo crews still return Earth-bound laser pulses—a quantitative, repeatable signature of human placement.',
  },
  'historical-vs-modern': {
    sectionId: 'historical-vs-modern',
    title: 'Apollo surface photos vs modern orbiters',
    subtitle:
      'Pairing Hasselblad panoramas with LRO passes ties 1960s–70s surface perspective to terrain geometry measured decades later.',
  },
  'nasa-documentation': {
    sectionId: 'nasa-documentation',
    title: 'NASA mission archives and documentation',
    subtitle:
      'Flight plans, debriefs, telemetry archives, and surface journals preserve the operational record alongside the physical traces.',
  },
}

/** Hero + editorial intro (English). */
export const evidencePageCopy = {
  hero: {
    label: 'Evidence',
    title: 'Catalogue of Apollo landing evidence',
    description:
      'Orbital imagery, lunar laser ranging, visible hardware, photo cross-checks, and NASA archives—each category links to primary releases you can open today. Mission tags connect rows to flight-specific dossiers.',
  },
  intro: {
    lead:
      'This page is not an argument from authority: it is an index of artefacts, measurements, and documents that converge on the same six Apollo landing coordinates on the Moon.',
    paragraphs: [
      'Orbital cameras show hardware where logs say it was left. Lasers timed from observatories still bounce from the arrays astronauts deployed. Mission photography lines up, feature-for-feature, with modern terrain models.',
      'Use the mission tags to jump to fuller mission pages, and follow the official links for the underlying data products.',
    ],
  },
  stats: [
    { label: 'Crewed landings', value: '6' },
    { label: 'Apollo LRRR arrays', value: '3' },
    { label: 'LROC featured sites', value: '6' },
  ],
}

/**
 * Master catalogue for `/evidence`. Add or edit rows here—do not hard-code long prose in JSX.
 */
export const evidenceCatalog: EvidenceCatalogEntry[] = [
  {
    id: 'lroc-regional-nac-context',
    title: 'Regional NAC context at every landing ellipse',
    summary:
      'The July 2009 LROC “First Look” release published ~1 km-scale narrow-angle strips over each Apollo zone, giving a consistent baseline before later low-periapsis campaigns.',
    category: 'orbital-imagery',
    missionSlugs: ['apollo-11', 'apollo-12', 'apollo-14', 'apollo-15', 'apollo-16', 'apollo-17'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Layers_near_Apollo_15_landing_site_%28LROC355_-_M113941548L_thumb%29.png',
      alt: 'LROC narrow-angle thumbnail showing layered terrain near the Apollo 15 Hadley–Apennine landing site',
    },
    caption:
      'Example product: Apollo 15 regional context from LROC; commissioning-era strips and later campaigns cover every Apollo zone (see LROC post 157).',
    whatThisProves:
      'Robotic lunar orbiters re-imaged every crewed site with the same instrument family, letting analysts compare hardware signatures under known lighting geometry.',
    sources: [
      { id: 'lroc-157', label: 'LROC — First Look at the Apollo Landing Sites', href: 'https://www.lroc.asu.edu/posts/157' },
      { id: 'lroc-featured', label: 'LROC Featured Sites index', href: 'https://www.lroc.asu.edu/featured_sites' },
    ],
    prominence: 'spotlight',
  },
  {
    id: 'lroc-apollo-12-curated-map',
    title: 'Curated Apollo 12 & Surveyor 3 footprint map',
    summary:
      'LROC post 401 distributes an annotated mosaic at ~25 cm/px scale, naming astronaut craters and marking Intrepid, ALSEP, and Surveyor III on the Ocean of Storms.',
    category: 'orbital-imagery',
    missionSlugs: ['apollo-12'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Pinpoint_Landing_on_the_Ocean_of_Storms_%28LROC401_-_M175428601RE_25cm_AP12_area%29.png',
      alt: 'Annotated LROC mosaic of Apollo 12 landing site with Intrepid, ALSEP, and Surveyor III labels',
    },
    caption: 'Official LROC release with printed call-outs—ideal reference for traverse-scale context.',
    whatThisProves:
      'Precision landing beside Surveyor III is not anecdotal: the orbital map matches the traverse described in mission reports.',
    sources: [
      { id: 'lroc-401', label: 'LROC — Pinpoint Landing on the Ocean of Storms', href: 'https://www.lroc.asu.edu/posts/401' },
    ],
  },
  {
    id: 'lroc-low-periapsis-campaign',
    title: 'Low-periapsis LRO passes',
    summary:
      'After LRO entered a tighter mapping orbit, successive campaigns captured the descent stages and surface disturbance at higher resolution than the commissioning-era strips.',
    category: 'orbital-imagery',
    missionSlugs: ['apollo-11', 'apollo-12', 'apollo-14', 'apollo-15', 'apollo-16', 'apollo-17'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_%286962456839%29.jpg',
      alt: 'LROC narrow-angle image of Apollo 11 landing site showing LM and experiments',
    },
    caption: 'Example: Goddard/LROC “A Stark Beauty All Its Own” product highlighting Tranquility Base hardware.',
    whatThisProves:
      'Improved ground sampling separates natural craters from geometric lander shadows as predicted by lighting models.',
    sources: [
      { id: 'lroc-484', label: 'LROC — “A Stark Beauty All Its Own” (Apollo 11)', href: 'https://www.lroc.asu.edu/posts/484' },
      { id: 'lroc-gallery', label: 'LROC image gallery', href: 'https://www.lroc.asu.edu/images' },
    ],
  },
  {
    id: 'nac-descent-stages-tranquility',
    title: 'Descent stages still register at Tranquility Base',
    summary:
      'The Apollo 11 LM descent stage remains the tallest reflective object in the landing ellipse; LRO sees its deck, shadow, and surrounding blast zone.',
    category: 'visible-hardware',
    missionSlugs: ['apollo-11'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_%286962456839%29.jpg',
      alt: 'LRO NAC image showing Apollo 11 lunar module descent stage and surface experiments',
    },
    whatThisProves:
      'Hardware dimensions and shadow length agree with engineering drawings when solar incidence and terrain slope are accounted for.',
    sources: [
      { id: 'lroc-484', label: 'LROC post 484 (Apollo 11 low-altitude pass)', href: 'https://www.lroc.asu.edu/posts/484' },
      { id: 'nasa-a11', label: 'NASA — Apollo 11 mission overview', href: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html' },
    ],
    prominence: 'spotlight',
  },
  {
    id: 'apollo-12-surveyor-proximity',
    title: 'Apollo 12 hardware beside Surveyor III',
    summary:
      'The fifty-first-anniversary LROC mosaic resolves Intrepid, ALSEP, Surveyor III, and astronaut tracks across the 275 m-wide field.',
    category: 'visible-hardware',
    missionSlugs: ['apollo-12'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Apollo_12_Fifty-first_Anniversary_%28LROC1135%29.png',
      alt: 'LROC mosaic of Apollo 12 site with LM, ALSEP, Surveyor III, and tracks labeled',
    },
    caption: 'White arrows on the official figure trace EVA paths between the three major artifacts.',
    whatThisProves:
      'Two independent spacecraft (Surveyor and Apollo) appear in one LRO frame exactly where pre-mission targeting predicted.',
    sources: [
      { id: 'lroc-1135', label: 'LROC — Apollo 12 51st anniversary mosaic', href: 'https://www.lroc.asu.edu/posts/1135' },
    ],
  },
  {
    id: 'apollo-15-rover-tracks',
    title: 'Rover tracks and parked LRV at Hadley–Apennine',
    summary:
      'Low-altitude NAC data show wheel paths radiating from Falcon, tying traverse geology stops to orbital basemaps.',
    category: 'visible-hardware',
    missionSlugs: ['apollo-15'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Apollo_15-_Follow_the_Tracks_%286816337786%29.jpg',
      alt: 'LROC image of Apollo 15 site showing lunar module, ALSEP, LRV, and rover tracks',
    },
    caption: 'NASA GSFC Flickr release (6816337786) annotated by the LROC team.',
    whatThisProves:
      'Surface mobility leaves a distinct regolith signature that persists and matches traverse timelines published in the surface journal.',
    sources: [
      { id: 'gsfc-flickr', label: 'NASA GSFC — Follow the Tracks photograph', href: 'https://www.flickr.com/photos/gsfc/6816337786/' },
      { id: 'lroc-a15', label: 'LROC — Apollo 15 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_15_visited' },
    ],
  },
  {
    id: 'apollo-17-challenger-descent',
    title: 'Challenger descent stage at Taurus–Littrow',
    summary:
      'High-resolution passes capture the Apollo 17 LM in the valley floor, demonstrating consistent hardware signatures across mare and highland landing regimes.',
    category: 'visible-hardware',
    missionSlugs: ['apollo-17'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Apollo_17_LM_Challenger_LRO.png',
      alt: 'LROC image of Apollo 17 lunar module Challenger at the landing site',
    },
    whatThisProves:
      'The final Apollo landing site shows the same class of descent-stage photometry as earlier missions under different lithology.',
    sources: [
      { id: 'lroc-a17', label: 'LROC — Apollo 17 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_17_visited' },
      { id: 'commons-a17lm', label: 'Commons — Apollo 17 LM Challenger (LRO)', href: 'https://commons.wikimedia.org/wiki/File:Apollo_17_LM_Challenger_LRO.png' },
    ],
  },
  {
    id: 'apollo-lrrr-arrays',
    title: 'Apollo laser ranging retroreflector arrays',
    summary:
      'Apollo 11, 14, and 15 each deployed corner-cube packages designed for Earth–Moon time-of-flight ranging; they remain operational targets for global observatories.',
    category: 'retroreflectors-llr',
    missionSlugs: ['apollo-11', 'apollo-14', 'apollo-15'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/AS15-88-11899_%2821648383142%29.jpg',
      alt: 'Apollo 15 Hasselblad photograph (AS15-88-11899) of the laser ranging retroreflector on the lunar surface',
    },
    caption: 'Surface documentation (Apollo 15) shows the finished array geometry used in geodesy models.',
    whatThisProves:
      'Independent labs measure range residuals consistent with reflectors sitting at the published selenographic coordinates—not with a remote natural outcrop.',
    sources: [
      { id: 'nasa-llr', label: 'NASA — Lunar laser ranging overview', href: 'https://science.nasa.gov/moon/lunar-laser-ranging/' },
      { id: 'ilrs', label: 'International Laser Ranging Service', href: 'https://ilrs.gsfc.nasa.gov/' },
    ],
    prominence: 'spotlight',
  },
  {
    id: 'earth-laser-observatories',
    title: 'Terrestrial laser stations still acquire returns',
    summary:
      'Facilities such as APOLLO (Apache Point) and legacy MLRS hardware fire short pulses and statistically detect photons from the Apollo arrays alongside Soviet Lunokhod reflectors.',
    category: 'retroreflectors-llr',
    missionSlugs: ['apollo-11', 'apollo-14', 'apollo-15'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Apollo_11_Lunar_Laser_Ranging_Experiment.jpg',
      alt: 'NASA photograph of the Apollo 11 lunar laser ranging retroreflector experiment on the lunar surface',
    },
    caption: 'NASA archive image of the Apollo 11 laser ranging experiment; terrestrial stations still range the Apollo arrays today.',
    whatThisProves:
      'Any researcher with allocated telescope time can attempt the same measurement—no proprietary “mission-only” channel is required.',
    sources: [
      { id: 'wiki-llr', label: 'Wikipedia — Lunar laser ranging experiment', href: 'https://en.wikipedia.org/wiki/Lunar_laser_ranging_experiment' },
      { id: 'nasa-llr', label: 'NASA Science — Lunar laser ranging', href: 'https://science.nasa.gov/moon/lunar-laser-ranging/' },
    ],
  },
  {
    id: 'hasselblad-vs-lro-nac',
    title: 'Crew Hasselblad frames overlaid on LRO geometry',
    summary:
      'Panoramas taken on the surface align, within known camera pointing, to slopes and craters in modern NAC orthoprojections—closing the loop between human vantage and robotic cartography.',
    category: 'historical-vs-modern',
    missionSlugs: ['apollo-11'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg',
      alt: 'Buzz Aldrin stands beside the lunar module during Apollo 11 EVA',
    },
    primaryImageCaption: '1969 — Hasselblad surface perspective (Apollo 11).',
    comparisonImage: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_%286962456839%29.jpg',
      alt: 'LROC narrow-angle view of the same landing region decades later',
      caption: '2010s — LRO NAC geometry of the same terrain.',
    },
    caption: 'Same landing zone: surface photography and robotic narrow-angle imagery are co-registered by LROC investigators.',
    whatThisProves:
      'When terrain relief matches at two epochs, the simplest explanation is a shared real surface—not unrelated studio sets.',
    sources: [
      { id: 'lroc-484', label: 'LROC — Apollo 11 low-altitude comparison products', href: 'https://www.lroc.asu.edu/posts/484' },
      { id: 'alsj-a11', label: 'Apollo Lunar Surface Journal — Apollo 11', href: 'https://www.hq.nasa.gov/alsj/a11/a11.html' },
    ],
    prominence: 'spotlight',
  },
  {
    id: 'apollo-lunar-surface-journal',
    title: 'Apollo Lunar Surface Journal',
    summary:
      'Transcript-level commentary ties Hasselblad magazines, timeline segments, and traverse maps to the raw voice loops—an annotated public companion to the flight data.',
    category: 'nasa-documentation',
    missionSlugs: ['apollo-11', 'apollo-12', 'apollo-14', 'apollo-15', 'apollo-16', 'apollo-17'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Apollo_11_bootprint.jpg',
      alt: 'Apollo 11 bootprint in lunar regolith',
    },
    whatThisProves:
      'Primary speech, photo numbers, and map figures interlock; errors would surface quickly in this cross-linked corpus if the underlying timeline were fictitious.',
    sources: [
      { id: 'alsj', label: 'Apollo Lunar Surface Journal', href: 'https://www.hq.nasa.gov/alsj/' },
    ],
  },
  {
    id: 'nasa-mission-masters',
    title: 'NASA mission pages & NSSDCA data registry',
    summary:
      'Each flight retains authoritative summaries, press kits, and pointers into the National Space Science Data Center for experiment data sets and imagery masters.',
    category: 'nasa-documentation',
    missionSlugs: ['apollo-11', 'apollo-12', 'apollo-14', 'apollo-15', 'apollo-16', 'apollo-17'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/66/View_of_Mission_Control_during_lunar_surface_Apollo_11_EVA_%28S69-39593%29.jpg',
      alt: 'Mission Control Houston during Apollo 11 lunar surface EVA (NASA S69-39593)',
    },
    caption: 'Flight operations documentation anchors the contemporaneous engineering record.',
    whatThisProves:
      'Institutional archives preserve enough detail—downlink formats, PI responsibilities, and tape logs—for third parties to audit the program’s outputs.',
    sources: [
      { id: 'nasa-apollo', label: 'NASA — Apollo missions index', href: 'https://www.nasa.gov/mission_pages/apollo/missions/index.html' },
      { id: 'nssdca', label: 'NASA NSSDCA — data archive', href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/search.action' },
    ],
  },
  {
    id: 'lroc-data-user-notes',
    title: 'LROC RDR / CDR product documentation',
    summary:
      'Calibrated narrow-angle camera pipelines, pointing kernels, and release notes explain how orthomosaics and DTMs are produced—supporting reproducible science on Apollo sites.',
    category: 'nasa-documentation',
    missionSlugs: ['apollo-11', 'apollo-12', 'apollo-14', 'apollo-15', 'apollo-16', 'apollo-17'],
    image: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Apollo_11_insignia.png',
      alt: 'Apollo 11 mission insignia',
    },
    whatThisProves:
      'Open documentation of calibration steps lets independent teams reprocess raw observations and confirm feature measurements.',
    sources: [
      { id: 'lroc-data', label: 'LROC — Data user notes', href: 'https://lroc.sese.asu.edu/data' },
      { id: 'lunar-ode', label: 'PDS — Lunar Orbital Data Explorer', href: 'https://ode.rsl.wustl.edu/moon/indexproductsearch.aspx' },
    ],
  },
]

export function groupEvidenceByCategory(
  entries: EvidenceCatalogEntry[],
): Record<EvidenceCategoryId, EvidenceCatalogEntry[]> {
  const empty: Record<EvidenceCategoryId, EvidenceCatalogEntry[]> = {
    'orbital-imagery': [],
    'visible-hardware': [],
    'retroreflectors-llr': [],
    'historical-vs-modern': [],
    'nasa-documentation': [],
  }
  for (const e of entries) {
    empty[e.category].push(e)
  }
  return empty
}
