import { missions } from '@/data/missions'

export type LrocOrbitSiteRow = {
  slug: string
  missionName: string
  landingSiteName: string
  region: string
  landingDate: string
  lrocFeatured: { href: string; label: string } | null
}

/**
 * Rows for the LROC / orbit pillar page — featured-site URLs come from each mission’s curated source links.
 */
export function getLrocOrbitSiteRows(): LrocOrbitSiteRow[] {
  return missions.map((m) => {
    const lrocFeatured = m.sourceLinks.find((s) => s.href.includes('lroc.asu.edu/featured_sites/view/')) ?? null
    return {
      slug: m.slug,
      missionName: m.name,
      landingSiteName: m.landingSite.name,
      region: m.landingSite.region,
      landingDate: m.landingDate,
      lrocFeatured: lrocFeatured ? { href: lrocFeatured.href, label: lrocFeatured.label } : null,
    }
  })
}

/** Editorial copy for `/apollo-landing-sites-from-orbit` — keep aligned with primary sources (NASA / ASU LROC). */
export const apolloLandingSitesOrbitPageCopy = {
  hero: {
    label: 'LRO / LROC',
    title: 'Apollo landing sites from orbit',
    description:
      'After Apollo, the Lunar Reconnaissance Orbiter’s narrow-angle camera (LROC) imaged every crewed landing zone. Published strips and featured-site pages show hardware, experiments, and regolith disturbance at the coordinates flight plans and surface logs already documented.',
  },
  intro: {
    lead:
      'This page is a mission-level index: where each landing sits, when it occurred, and where Arizona State University / NASA host the LROC “featured site” materials for that zone.',
    paragraphs: [
      'LROC does not “replace” surface photography or laser ranging; it adds an independent, georeferenced view from above. Narrow-angle (NAC) frames can resolve landers, experiment packages, and—on later flights—rovers and traverse tracks when lighting and incidence angles are favorable.',
      'For category-level catalogue entries (first-look releases, resolution campaigns, related posts), use the Evidence page. For how orbital imagery fits other proof lines, read How we know. For coordinates on a map, open Explore.',
    ],
  },
  methodology: {
    eyebrow: 'How these images are used',
    title: 'Georeferencing, lighting, and cross-checks',
    paragraphs: [
      'LROC products are published with documented geometry so analysts can tie pixels to selenographic coordinates. That allows predictions about shadows, slopes, and hardware scale to be compared with what the orbiters record—separately from what astronauts photographed on the surface.',
      'Surface crews took Hasselblad panoramas and traverse maps; those products can be aligned with digital terrain models built from orbital data. Agreement within stated uncertainty is another convergence test, not a substitute for the underlying archives.',
    ],
  },
  tableIntro: {
    eyebrow: 'All six crewed landings',
    title: 'LROC featured pages and mission dossiers',
    description:
      'Each row links to ASU’s LROC featured-site view (primary) and to this site’s mission dossier for context, crew, and additional NASA / LROC citations.',
  },
  related: {
    title: 'Continue on this site',
    links: [
      {
        href: '/evidence#orbital-imagery',
        label: 'Evidence catalogue — orbital imagery',
        description: 'Catalogued LROC releases, context strips, and related primary links.',
      },
      {
        href: '/how-we-know#orbital-photography',
        label: 'How we know — orbital photography',
        description: 'Why post-Apollo narrow-angle imaging is treated as an independent line of evidence.',
      },
      { href: '/explore', label: 'Explore', description: 'Interactive atlas with landing coordinates and site detail.' },
      {
        href: '/sources#sources-lroc-asu',
        label: 'Sources — LROC / ASU',
        description: 'Portals and data access for the Lunar Reconnaissance Orbiter Camera.',
      },
      { href: '/missions', label: 'All Apollo missions', description: 'Chronological mission list with highlights and sources.' },
    ] as const,
  },
  faq: [
    {
      id: 'all-six',
      question: 'Does LROC imagery cover all Apollo landing sites?',
      answer:
        'Yes. Narrow-angle coverage exists for Tranquility Base, the Apollo 12 and Surveyor 3 area, Fra Mauro (Apollo 14), Hadley–Apennine (Apollo 15), Descartes (Apollo 16), and Taurus–Littrow (Apollo 17). ASU publishes featured-site pages for each; the table above links to those entries.',
    },
    {
      id: 'apollo-11',
      question: 'Where should I start for Apollo 11 from orbit?',
      answer:
        'Use the Apollo 11 row for the LROC featured-site link, then open the Apollo 11 mission dossier for crew, timeline, and additional LROC posts (e.g. low-altitude NAC campaigns) cited there.',
    },
    {
      id: 'not-only-proof',
      question: 'Is orbital imagery the only proof humans landed on the Moon?',
      answer:
        'No. Lunar laser ranging from Apollo retroreflectors, visible hardware and tracks, returned samples under chain-of-custody, and extensive NASA archives each provide independent constraints. Orbital imaging is one converging line—see How we know for the full sketch.',
    },
  ] as const,
}
