import type { HowWeKnowPageContent } from '@/types/how-we-know'

/**
 * Longform educational copy for `/how-we-know`.
 * Add sections or paragraphs here—keep the page component presentational only.
 */
export const howWeKnowContent: HowWeKnowPageContent = {
  hero: {
    label: 'How we know',
    title: 'How we know the Apollo landings happened',
    description:
      'Orbital cameras, hardware on the surface, lunar laser ranging, and public NASA archives each point to the same six landing zones. They are independent checks—no single photograph or document carries the full weight.',
    stats: [
      { value: '6', label: 'Landed Apollo sites' },
      { value: '3', label: 'Apollo laser arrays' },
      { value: '50+ yr', label: 'LLR program' },
    ],
  },

  intro: {
    paragraphs: [
      'Science rarely rests on a single photograph or a single witness. What matters is convergence: different instruments, different teams, and different eras pointing to the same physical reality.',
      'For the Moon landings, that reality includes hardware at published coordinates, retroreflectors that still return laser pulses, and public archives detailed enough to reconstruct what happened on each flight.',
      'This page sketches how those pieces fit together. For catalogued artefacts and direct links to data products, use the Evidence catalogue; for coordinates and regional context, open Explore; for flight-by-flight narrative and sources, use the mission dossiers.',
    ],
  },

  pullQuote: {
    text: 'The strongest claims are the ones anyone can, in principle, re-check.',
  },

  sections: [
    {
      id: 'orbital-photography',
      title: 'LRO and LROC images of each Apollo landing site',
      lead: 'After Apollo, robotic orbiters mapped the Moon with narrow-angle cameras. Published LROC strips and mosaics cover every crewed landing zone at scales that resolve hardware and surface disturbance.',
      body: [
        'The Lunar Reconnaissance Orbiter Camera (LROC) and earlier missions mapped the Moon after Apollo. Published strips and mosaics cover Tranquility Base, the Ocean of Storms, Fra Mauro, Hadley–Apennine, Descartes, and Taurus–Littrow.',
        'Lighting geometry and terrain slope can be modeled. That lets analysts predict how lander decks, shadows, and small surface features should appear—and compare those predictions to what the orbiters actually record.',
      ],
      seeAlso: {
        href: '/apollo-landing-sites-from-orbit',
        label: 'Apollo landing sites from orbit',
        description: 'table of all six zones with LROC featured-site links and mission dossiers.',
      },
      whyItMatters:
        'Orbital data tie modern measurement to the landing ellipses published before launch. They are not interpretive art; they are georeferenced products with documented pipelines.',
      image: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_%286962456839%29.jpg',
        alt: 'LROC narrow-angle view of the Apollo 11 landing site showing the lunar module and experiments',
        caption:
          'LROC NAC view of Tranquility Base—descent stage, experiments, and disturbance visible at published coordinates (NASA / GSFC / Arizona State University).',
      },
      sources: [
        { id: 'lroc', label: 'Lunar Reconnaissance Orbiter Camera', href: 'https://www.lroc.asu.edu/' },
        { id: 'lroc-157', label: 'LROC — First look at the Apollo landing sites', href: 'https://www.lroc.asu.edu/posts/157' },
        { id: 'lroc-featured', label: 'LROC featured Apollo sites', href: 'https://www.lroc.asu.edu/featured_sites' },
      ],
    },
    {
      id: 'visible-hardware',
      title: 'Hardware, rover tracks, and astronaut paths from orbit',
      lead: 'Descent stages, experiment packages, and—on later missions—rovers leave signatures that match engineering scale, illumination geometry, and what surface photography recorded during the flights.',
      body: [
        'High-resolution passes resolve the lunar modules’ descent stages, experiment packages, and—in later missions—rovers and wheel tracks. Astronaut paths appear as subtle darkening where regolith was disturbed.',
        'The same sites also appear in Hasselblad photography from the surface. When those historical frames are compared to modern terrain models, boulders, slopes, and crater rims line up within expected uncertainty.',
      ],
      whyItMatters:
        'Hardware and tracks are falsifiable predictions: if coordinates or lighting were wrong, the shadows and footprints would not align across epochs.',
      image: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Apollo_15-_Follow_the_Tracks_%286816337786%29.jpg',
        alt: 'LROC image of the Apollo 15 landing site showing the lunar module, ALSEP, lunar rover, and rover tracks',
        caption:
          'LROC pass resolving the lunar module, experiments, and rover traverse—hardware scale and regolith signatures match surface logs (NASA / GSFC / Arizona State University).',
      },
      sources: [
        { id: 'lroc-a15-tracks', label: 'NASA GSFC — LROC “Follow the Tracks” (Apollo 15)', href: 'https://www.flickr.com/photos/gsfc/6816337786/' },
        { id: 'lroc-a15-site', label: 'LROC — Apollo 15 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_15_visited' },
        { id: 'lroc-1135', label: 'LROC — Apollo 12 anniversary mosaic (related product)', href: 'https://www.lroc.asu.edu/posts/1135' },
      ],
    },
    {
      id: 'retroreflectors',
      title: 'Apollo retroreflectors and lunar laser ranging (LLR)',
      lead: 'Apollo 11, 14, and 15 each placed corner-cube arrays for Earth–Moon time-of-flight ranging. Observatories still detect returns from those sites today.',
      body: [
        'Observatories fire short laser pulses and detect a small return from the lunar arrays (and from Soviet Lunokhod reflectors). Range residuals feed lunar ephemerides, Earth orientation, and tests of gravity.',
        'The arrays sit at published selenographic coordinates. Natural geology does not reproduce the same cube-corner signature, timing, and signal strength across fifty years of operation.',
      ],
      whyItMatters:
        'Laser ranging is quantitative and repeatable. It is an ongoing experiment, not a historical anecdote.',
      image: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/03/AS11-40-5952_-_Apollo_11_-_Apollo_11_Mission_image_-_The_Laser_Ranging_Retroreflector_%28LRRR%29_-_NARA_-_16685293.jpg',
        alt: 'Apollo 11 Hasselblad photograph of the deployed laser ranging retroreflector on the Moon',
        caption:
          'Apollo 11 corner-cube array after deployment (NASA / NARA). Apollo 14 and 15 added further arrays still used in lunar laser ranging.',
      },
      sources: [
        { id: 'nasa-llr', label: 'NASA — Lunar laser ranging', href: 'https://science.nasa.gov/moon/lunar-laser-ranging/' },
        { id: 'ilrs', label: 'International Laser Ranging Service', href: 'https://ilrs.gsfc.nasa.gov/' },
      ],
    },
    {
      id: 'nasa-records',
      title: 'NASA archives, surface journals, and mission documentation',
      lead: 'Flight plans, debriefs, photo indexes, and telemetry archives preserve an internally consistent operational record that third parties can audit in public repositories.',
      body: [
        'Mission rules, real-time logs, and experiment PI documentation describe what was deployed where, and when. Surface journals align voice transcripts with Hasselblad magazine frames and traverse maps.',
        'Third parties can audit many of these materials because they were archived in national libraries, data centers, and public repositories—not locked in a single narrative.',
      ],
      whyItMatters:
        'Forgery at this depth would require coordinated error across independent subsystems, contractors, and international partners. The simpler explanation is that the missions occurred as documented.',
      image: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/66/View_of_Mission_Control_during_lunar_surface_Apollo_11_EVA_%28S69-39593%29.jpg',
        alt: 'Mission Operations Control Room during Apollo 11 lunar surface EVA',
        caption:
          'Mission Control, Houston, during Apollo 11 lunar surface EVA—contemporaneous operations and voice loops align with photo indexes and archives (NASA S69-39593).',
      },
      sources: [
        { id: 'nasa-apollo', label: 'NASA — Apollo missions', href: 'https://www.nasa.gov/mission_pages/apollo/missions/index.html' },
        { id: 'alsj', label: 'Apollo Lunar Surface Journal', href: 'https://www.hq.nasa.gov/alsj/' },
        { id: 'nssdca', label: 'NASA NSSDCA spacecraft archive', href: 'https://nssdc.gsfc.nasa.gov/nmc/spacecraft/search.action' },
      ],
    },
    {
      id: 'independent-verification',
      title: 'Why worldwide, decades-long checks matter',
      lead: 'Universities, space agencies, and laser stations reprocess the same public LROC products and ranging data—not a single gatekeeper.',
      body: [
        'LROC products are archived for planetary science. Lunar laser ranging is performed from multiple countries. Sample research continues in curated laboratories with chain-of-custody from the Apollo return capsules.',
        'No one institution “owns” the proof. That distribution of effort is exactly what makes large scientific claims robust.',
      ],
      whyItMatters:
        'When many teams can reprocess the same observations and get compatible results, confidence grows for the right reason: reproducibility, not rhetoric.',
      image: {
        src: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/Apollo_11_Lunar_Core_Sample_10005.jpg',
        alt: 'Apollo 11 lunar core sample in a curated laboratory container',
        caption:
          'Returned lunar materials are catalogued and studied under chain-of-custody—one line of evidence alongside open LROC products and global laser ranging (NASA).',
      },
      sources: [
        { id: 'lroc-data', label: 'LROC data access', href: 'https://lroc.sese.asu.edu/data' },
        { id: 'curator', label: 'Apollo lunar samples — curator office', href: 'https://curator.jsc.nasa.gov/lunar/' },
        { id: 'evidence-page', label: 'This site — Evidence catalogue', href: '/evidence' },
      ],
    },
  ],

  faq: [
    {
      id: 'lro-show-sites',
      question: 'Does the Lunar Reconnaissance Orbiter show the Apollo landing sites?',
      answer:
        'Yes. LRO’s narrow-angle camera (LROC) has published georeferenced imagery over all six crewed landing zones. Featured-site pages and data releases show hardware, experiments, and regolith disturbance at the published coordinates. See Apollo landing sites from orbit for a single table with ASU featured links and mission dossiers, then the Evidence catalogue under “Orbital imagery” for additional catalogue rows.',
    },
    {
      id: 'what-is-llr',
      question: 'What is lunar laser ranging, and why does it matter for Apollo?',
      answer:
        'Lunar laser ranging (LLR) measures the round-trip time of laser pulses from Earth to corner-cube arrays on the Moon. Apollo 11, 14, and 15 deployed arrays that remain in use; the signal characteristics and timing are not mimicked by ordinary lunar geology. NASA and ILRS publish program-level documentation.',
    },
    {
      id: 'orbit-vs-surface-photos',
      question: 'How do modern orbital photos relate to Apollo surface photography?',
      answer:
        'Hasselblad panoramas and traverse maps from the missions can be compared to LRO terrain models and NAC frames. Boulders, slopes, and hardware positions should agree within expected uncertainty—another cross-check that does not depend on any single archive.',
    },
    {
      id: 'primary-sources',
      question: 'Where should I go first for primary sources?',
      answer:
        'Use the Sources index for institution-grouped portals (NASA, ASU/LROC, ILRS). The Evidence catalogue ties each type of proof to specific releases. Mission dossiers list mission-level NASA and LROC pages.',
    },
    {
      id: 'independent-lines',
      question: 'Why emphasize “independent lines” of evidence?',
      answer:
        'Because robust scientific claims survive when different methods agree. Orbital imaging, LLR, surface hardware visibility, and archival records each have different failure modes; convergence across them is the substantive reason for confidence—not rhetoric.',
    },
  ],

  closing: {
    title: 'Continue from explanation to artefacts',
    body: 'The Evidence catalogue links each theme to primary releases. Explore places every landing in map context. Sources lists the main institutional portals for verification.',
  },
}
