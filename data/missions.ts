import type { Mission, Retroreflector } from '@/types/mission'

export const missions: Mission[] = [
  {
    id: 'apollo-11',
    name: 'Apollo 11',
    slug: 'apollo-11',
    date: 'July 1969',
    launchDate: 'July 16, 1969',
    landingDate: 'July 20, 1969',
    returnDate: 'July 24, 1969',
    commander: 'Neil A. Armstrong',
    pilotCM: 'Michael Collins',
    pilotLM: 'Edwin E. Aldrin Jr.',
    duration: '8 days, 3 hours, 18 minutes',
    evaTime: '2 hours, 31 minutes',
    samples: '21.55 kg (47.51 lb)',
    highlight: 'First crewed Moon landing in human history',
    description:
      'First lunar landing mission: Armstrong and Aldrin landed LM Eagle at Tranquility Base, completed one surface EVA, deployed the first passive seismic package and laser retroreflector, and returned 21.55 kg of documented samples while Collins orbited in Columbia.',
    achievements: [
      'First crewed lunar landing',
      'First moonwalk in human history',
      'Deployed early surface experiments',
      'Placed retroreflector still used today',
    ],
    equipment: ['Passive Seismic Experiment', 'Laser Ranging Retroreflector', 'Solar Wind Composition Experiment'],
    landingSite: { id: 'tranquility-base', name: 'Sea of Tranquility', latitude: 0.67416, longitude: 23.47314, region: 'Mare Tranquillitatis' },
    evidenceTags: ['LROC orbital imagery', 'Surface photography', 'Laser retroreflector', 'ALSEP instruments'],
    spacecraft: { commandModule: 'Columbia', lunarModule: 'Eagle' },
    timelineHighlights: [
      {
        id: 'a11-launch',
        dateLabel: 'July 16, 1969',
        title: 'Saturn V launch & translunar injection',
        detail:
          'SA-506 lifts from KSC Pad 39A; the S-IVB TLI burn sends Columbia and Eagle toward the Moon on a free-return trajectory.',
      },
      {
        id: 'a11-loi',
        dateLabel: 'July 19–20, 1969',
        title: 'Lunar orbit capture & checkout',
        detail:
          'LOI places the stack in lunar orbit; the crew performs landmark tracking, LM activation, and separation planning before powered descent.',
      },
      {
        id: 'a11-descent',
        dateLabel: 'July 20, 1969',
        title: 'Powered descent & first EVA',
        detail:
          'Eagle lands at Tranquility Base (~20:17 UTC). Armstrong and Aldrin deploy experiments, collect samples, and photograph the site before lunar ascent.',
      },
      {
        id: 'a11-return',
        dateLabel: 'July 24, 1969',
        title: 'Transearth coast & Pacific recovery',
        detail:
          'Columbia splashes down; crew and sealed sample containers are recovered under published quarantine and curation protocols.',
      },
    ],
    evidenceFocus: [
      {
        id: 'a11-lroc',
        headline: 'LROC NAC resolves Tranquility hardware',
        detail:
          'Narrow-angle LRO passes show the descent stage, experiment deployment zones, and footpaths that align with EVA timelines and Hasselblad panoramas.',
      },
      {
        id: 'a11-llr',
        headline: 'Active laser ranging target',
        detail:
          'The Apollo 11 LRRR remains in global LLR networks; timing residuals anchor the array to published selenographic coordinates.',
      },
      {
        id: 'a11-alsj',
        headline: 'Photo-transcript cross-links',
        detail:
          'The Apollo Lunar Surface Journal ties magazine frames to air-to-ground audio, enabling independent reconstruction of crew positions.',
      },
      {
        id: 'a11-samples',
        headline: 'Curated sample return',
        detail:
          'Returned materials are indexed through JSC with collection context tied to documented geology stops on the surface.',
      },
    ],
    sourceLinks: [
      { id: 'nasa-a11', label: 'NASA — Apollo 11 mission summary', href: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo11.html', external: true },
      { id: 'lroc-a11', label: 'LROC — Apollo 11 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_11_visited', external: true },
      { id: 'lroc-484', label: 'LROC — “A Stark Beauty” (low-altitude NAC)', href: 'https://www.lroc.asu.edu/posts/484', external: true },
      { id: 'alsj-a11', label: 'Apollo Lunar Surface Journal — Apollo 11', href: 'https://www.hq.nasa.gov/alsj/a11/a11.html', external: true },
    ],
  },
  {
    id: 'apollo-12',
    name: 'Apollo 12',
    slug: 'apollo-12',
    date: 'November 1969',
    launchDate: 'November 14, 1969',
    landingDate: 'November 19, 1969',
    returnDate: 'November 24, 1969',
    commander: 'Charles Conrad Jr.',
    pilotCM: 'Richard F. Gordon Jr.',
    pilotLM: 'Alan L. Bean',
    duration: '10 days, 4 hours, 36 minutes',
    evaTime: '7 hours, 45 minutes',
    samples: '34.35 kg (75.73 lb)',
    highlight: 'Precision landing near Surveyor 3',
    description:
      'Apollo 12 demonstrated targeting accuracy by landing Intrepid within walking distance of Surveyor III, deployed a full ALSEP, conducted two EVAs, and returned Surveyor hardware and 34 kg of samples for laboratory study.',
    achievements: ['First precision lunar landing', 'Retrieved Surveyor 3 hardware', 'Two moonwalks totaling nearly 8 hours'],
    equipment: ['ALSEP', 'Surface magnetometer', 'Solar wind spectrometer'],
    landingSite: { id: 'ocean-storms', name: 'Ocean of Storms', latitude: -3.01239, longitude: -23.42157, region: 'Oceanus Procellarum' },
    evidenceTags: ['LROC orbital imagery', 'Surveyor 3 proximity', 'ALSEP package', 'Surface traverses'],
    spacecraft: { commandModule: 'Yankee Clipper', lunarModule: 'Intrepid' },
    timelineHighlights: [
      {
        id: 'a12-launch',
        dateLabel: 'November 14, 1969',
        title: 'Launch & translunar flight',
        detail: 'Saturn V sends Yankee Clipper and Intrepid toward the Moon after insertion and TLI.',
      },
      {
        id: 'a12-landing',
        dateLabel: 'November 19, 1969',
        title: 'Precision landing near Surveyor III',
        detail:
          'Intrepid touches down ~180 m from Surveyor Crater’s robotic visitor—within the narrow ellipse predicted from mission planning.',
      },
      {
        id: 'a12-evas',
        dateLabel: 'November 19–20, 1969',
        title: 'Two EVAs: ALSEP & Surveyor inspection',
        detail:
          'Crew deploys ALSEP, emplaces instruments on the mare, inspects Surveyor III, and returns selected parts to Earth.',
      },
      {
        id: 'a12-return',
        dateLabel: 'November 24, 1969',
        title: 'Splashdown in the Pacific',
        detail: 'End-to-end mission duration and sample handover follow published Apollo recovery procedures.',
      },
    ],
    evidenceFocus: [
      {
        id: 'a12-map401',
        headline: 'LROC post-401 annotated site mosaic',
        detail:
          'The “Pinpoint Landing” release labels Intrepid, ALSEP, Surveyor III, and named craters at ~25 cm/px—ideal for traverse-scale verification.',
      },
      {
        id: 'a12-tracks',
        headline: 'Visible EVA paths in NAC data',
        detail:
          'Low-periapsis mosaics resolve boot paths between the LM, ALSEP, and Surveyor—consistent with ALSJ traverse maps.',
      },
      {
        id: 'a12-surveyor',
        headline: 'Co-located robotic and crewed hardware',
        detail:
          'Two spacecraft in one LRO frame is a strong geometric constraint: natural terrain alone would not reproduce the observed configuration.',
      },
      {
        id: 'a12-alsep',
        headline: 'Long-lived surface geophysics',
        detail:
          'ALSEP telemetry archives document instrument deployment and years of passive operation after crew departure.',
      },
    ],
    sourceLinks: [
      { id: 'nasa-a12', label: 'NASA — Apollo 12 mission summary', href: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo12.html', external: true },
      { id: 'lroc-a12', label: 'LROC — Apollo 12 & Surveyor 3 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_12_visited', external: true },
      { id: 'lroc-401', label: 'LROC — Pinpoint Landing (post 401)', href: 'https://www.lroc.asu.edu/posts/401', external: true },
      { id: 'lroc-1135', label: 'LROC — 51st anniversary mosaic (post 1135)', href: 'https://www.lroc.asu.edu/posts/1135', external: true },
      { id: 'alsj-a12', label: 'Apollo Lunar Surface Journal — Apollo 12', href: 'https://www.hq.nasa.gov/alsj/a12/a12.html', external: true },
    ],
  },
  {
    id: 'apollo-14',
    name: 'Apollo 14',
    slug: 'apollo-14',
    date: 'February 1971',
    launchDate: 'January 31, 1971',
    landingDate: 'February 5, 1971',
    returnDate: 'February 9, 1971',
    commander: 'Alan B. Shepard Jr.',
    pilotCM: 'Stuart A. Roosa',
    pilotLM: 'Edgar D. Mitchell',
    duration: '9 days, 0 hours, 2 minutes',
    evaTime: '9 hours, 22 minutes',
    samples: '42.28 kg (93.21 lb)',
    highlight: 'First highlands landing; extended surface traversal',
    description:
      'After a launch delay, Antares landed in the Fra Mauro highlands—Apollo 13’s original target—deployed ALSEP and a second LRRR, used the MET for equipment transport, and executed a geology traverse toward Cone crater under tight operational rules.',
    achievements: ['First landing in lunar highlands', 'Extended surface traverses', 'Collected very old lunar samples'],
    equipment: ['ALSEP', 'Mobile Equipment Transporter', 'Laser retroreflector'],
    landingSite: { id: 'fra-mauro', name: 'Fra Mauro', latitude: -3.6453, longitude: -17.47136, region: 'Fra Mauro Formation' },
    evidenceTags: ['LROC orbital imagery', 'Highlands geology', 'MET traverses', 'Laser retroreflector'],
    spacecraft: { commandModule: 'Kitty Hawk', lunarModule: 'Antares' },
    timelineHighlights: [
      {
        id: 'a14-launch',
        dateLabel: 'January 31, 1971',
        title: 'Launch after scrub recovery',
        detail: 'Saturn V ascent and translunar injection place Kitty Hawk and Antares on path to Fra Mauro.',
      },
      {
        id: 'a14-landing',
        dateLabel: 'February 5, 1971',
        title: 'Highlands landing',
        detail:
          'Powered descent ends in the Fra Mauro formation; crew prepares for dual-EVA geology operations with MET support.',
      },
      {
        id: 'a14-evas',
        dateLabel: 'February 5–6, 1971',
        title: 'EVAs toward Cone crater',
        detail:
          'Traverses sample ejecta and deploy ALSEP plus LRRR; surface photography documents stations along the EVA route.',
      },
      {
        id: 'a14-return',
        dateLabel: 'February 9, 1971',
        title: 'Pacific splashdown',
        detail: 'Mission concludes with sample return under standard Apollo recovery and curation flows.',
      },
    ],
    evidenceFocus: [
      {
        id: 'a14-stereo',
        headline: 'Published traverse map (LROC post 29)',
        detail:
          'The NAC stereo paper’s Figure 1 is an official traverse basemap—EVA paths, stations, and major craters appear on a georeferenced background.',
      },
      {
        id: 'a14-nac',
        headline: 'NAC frame tying LM & ALSEP',
        detail:
          'The `369441main` release resolves Antares, ALSEP, MET tracks, and disturbance patterns across the landing ellipse.',
      },
      {
        id: 'a14-llr',
        headline: 'Second Apollo laser array',
        detail:
          'Apollo 14’s LRRR augments the lunar laser ranging network with an independent deployment geometry from Apollo 11.',
      },
      {
        id: 'a14-met',
        headline: 'Equipment cart trails',
        detail:
          'MET wheel and boot paths are visible in orbital imagery where lighting favors shallow disturbance contrast.',
      },
    ],
    sourceLinks: [
      { id: 'nasa-a14', label: 'NASA — Apollo 14 mission summary', href: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo14.html', external: true },
      { id: 'lroc-a14', label: 'LROC — Apollo 14 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_14_visited', external: true },
      { id: 'lroc-29', label: 'LROC — Fra Mauro stereo / traverse (post 29)', href: 'https://www.lroc.asu.edu/posts/29', external: true },
      { id: 'alsj-a14', label: 'Apollo Lunar Surface Journal — Apollo 14', href: 'https://www.hq.nasa.gov/alsj/a14/a14.html', external: true },
    ],
  },
  {
    id: 'apollo-15',
    name: 'Apollo 15',
    slug: 'apollo-15',
    date: 'August 1971',
    launchDate: 'July 26, 1971',
    landingDate: 'July 30, 1971',
    returnDate: 'August 7, 1971',
    commander: 'David R. Scott',
    pilotCM: 'Alfred M. Worden',
    pilotLM: 'James B. Irwin',
    duration: '12 days, 7 hours, 12 minutes',
    evaTime: '18 hours, 33 minutes',
    samples: '77.31 kg (170.44 lb)',
    highlight: 'First use of the Lunar Roving Vehicle',
    description:
      'First J-mission: Falcon landed at Hadley–Apennine with the first LRV, enabling three long EVAs, deep drilling, and the largest Apollo sample mass to that point. Worden conducted a stand-up EVA in cislunar space during transearth coast.',
    achievements: ['First use of LRV', 'Deep-space EVA during return', 'Genesis Rock discovery'],
    equipment: ['Lunar Roving Vehicle', 'ALSEP', 'Lunar surface drill'],
    landingSite: { id: 'hadley-rille', name: 'Hadley Rille', latitude: 26.13224, longitude: 3.634, region: 'Palus Putredinis' },
    evidenceTags: ['LROC orbital imagery', 'Lunar Roving Vehicle', 'Deep-space EVA', 'Laser retroreflector'],
    spacecraft: { commandModule: 'Endeavour', lunarModule: 'Falcon' },
    timelineHighlights: [
      {
        id: 'a15-launch',
        dateLabel: 'July 26, 1971',
        title: 'Launch & translunar coast',
        detail: 'Saturn V delivers Endeavour, Falcon, and LRV to the Moon with extended consumables for surface operations.',
      },
      {
        id: 'a15-landing',
        dateLabel: 'July 30, 1971',
        title: 'Landing at Hadley–Apennine',
        detail:
          'Falcon sets down near Hadley Rille; crew unstows the rover and begins the first long-baseline geology campaign.',
      },
      {
        id: 'a15-surface',
        dateLabel: 'July 31 – August 2, 1971',
        title: 'Three rover-supported EVAs',
        detail:
          'Traverses reach Apennine Front outcrops and mare basalts; ALSEP and the third Apollo LRRR are deployed; deep core samples are attempted.',
      },
      {
        id: 'a15-return',
        dateLabel: 'August 7, 1971',
        title: 'TEI, deep-space EVA, splashdown',
        detail:
          'Transearth coast includes SIM bay science and Worden’s stand-up EVA to retrieve film cassettes; Pacific recovery closes the mission.',
      },
    ],
    evidenceFocus: [
      {
        id: 'a15-lrv',
        headline: 'Rover tracks in low-altitude NAC',
        detail:
          'Campaign imagery shows wheel paths, parked LRV geometry, and crew paths between Falcon, ALSEP, and geology stops.',
      },
      {
        id: 'a15-rille',
        headline: 'Regional context at the rille margin',
        detail:
          'Post-157 and later strips place the landing point in geomorphic context beside Hadley Rille and the massifs.',
      },
      {
        id: 'a15-llr',
        headline: 'Largest Apollo retroreflector array',
        detail:
          'Apollo 15’s LRRR is the highest cross-section Apollo array in routine LLR solutions—still interrogated from Earth.',
      },
      {
        id: 'a15-despaceva',
        headline: 'Documented cislunar operations',
        detail:
          'Deep-space EVA procedures, timing, and film recovery are preserved in mission logs independent of surface photography.',
      },
    ],
    sourceLinks: [
      { id: 'nasa-a15', label: 'NASA — Apollo 15 mission summary', href: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo15.html', external: true },
      { id: 'lroc-a15', label: 'LROC — Apollo 15 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_15_visited', external: true },
      { id: 'gsfc-tracks', label: 'NASA GSFC — Follow the Tracks release', href: 'https://www.flickr.com/photos/gsfc/6816337786/', external: true },
      { id: 'alsj-a15', label: 'Apollo Lunar Surface Journal — Apollo 15', href: 'https://www.hq.nasa.gov/alsj/a15/a15.html', external: true },
    ],
  },
  {
    id: 'apollo-16',
    name: 'Apollo 16',
    slug: 'apollo-16',
    date: 'April 1972',
    launchDate: 'April 16, 1972',
    landingDate: 'April 21, 1972',
    returnDate: 'April 27, 1972',
    commander: 'John W. Young',
    pilotCM: 'Thomas K. Mattingly II',
    pilotLM: 'Charles M. Duke Jr.',
    duration: '11 days, 1 hour, 51 minutes',
    evaTime: '20 hours, 14 minutes',
    samples: '95.71 kg (211.00 lb)',
    highlight: 'First mission in central lunar highlands',
    description:
      'Young and Duke explored the Descartes highlands with the LRV, targeting volcanic and impact materials while Mattingly operated SIM bay science in lunar orbit.',
    achievements: ['Highlands geology campaign', 'Record-setting rover traverses', 'Far-ultraviolet observations'],
    equipment: ['Lunar Roving Vehicle', 'ALSEP', 'Far-ultraviolet camera/spectrograph'],
    landingSite: { id: 'descartes', name: 'Descartes Highlands', latitude: -8.97301, longitude: 15.49812, region: 'Descartes Highlands' },
    evidenceTags: ['LROC orbital imagery', 'Highlands sampling', 'LRV traverses', 'Far-UV experiment'],
    spacecraft: { commandModule: 'Casper', lunarModule: 'Orion' },
    timelineHighlights: [
      {
        id: 'a16-launch',
        dateLabel: 'April 16, 1972',
        title: 'Launch to the central highlands',
        detail: 'Translunar injection targets the Descartes landing zone for three EVAs and extensive orbital remote sensing.',
      },
      {
        id: 'a16-landing',
        dateLabel: 'April 21, 1972',
        title: 'Landing at Descartes',
        detail: 'Orion touches down on the Cayley Plains; crew deploys ALSEP and begins rover geology traverses.',
      },
      {
        id: 'a16-evas',
        dateLabel: 'April 21–23, 1972',
        title: 'Rover geology & station science',
        detail: 'Stone Mountain and other stations yield documented samples tied to traverse maps and photography.',
      },
      {
        id: 'a16-return',
        dateLabel: 'April 27, 1972',
        title: 'Return & splashdown',
        detail: 'Transearth coast completes with film and sample return under standard Apollo recovery.',
      },
    ],
    evidenceFocus: [
      {
        id: 'a16-lroc',
        headline: 'LROC coverage of the landing ellipse',
        detail: 'Featured-site pages and NAC strips resolve the LM, ALSEP, and rover tracks in highland regolith.',
      },
      {
        id: 'a16-sim',
        headline: 'Orbital SIM bay context',
        detail: 'Mattingly’s instrument suite provides independent orbital mapping that frames surface geology objectives.',
      },
      {
        id: 'a16-samples',
        headline: 'Highlands sample suite',
        detail: 'Returned mass and thin-section petrology are published in open literature with chain-of-custody from mission rules.',
      },
    ],
    sourceLinks: [
      { id: 'nasa-a16', label: 'NASA — Apollo 16 mission summary', href: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo16.html', external: true },
      { id: 'lroc-a16', label: 'LROC — Apollo 16 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_16_visited', external: true },
      { id: 'alsj-a16', label: 'Apollo Lunar Surface Journal — Apollo 16', href: 'https://www.hq.nasa.gov/alsj/a16/a16.html', external: true },
    ],
  },
  {
    id: 'apollo-17',
    name: 'Apollo 17',
    slug: 'apollo-17',
    date: 'December 1972',
    launchDate: 'December 7, 1972',
    landingDate: 'December 11, 1972',
    returnDate: 'December 19, 1972',
    commander: 'Eugene A. Cernan',
    pilotCM: 'Ronald E. Evans',
    pilotLM: 'Harrison H. Schmitt',
    duration: '12 days, 13 hours, 52 minutes',
    evaTime: '22 hours, 4 minutes',
    samples: '110.52 kg (243.65 lb)',
    highlight: 'Final crewed Moon landing mission',
    description:
      'The only mission with a professional geologist on the crew, Apollo 17 explored Taurus–Littrow with three long EVAs, deployed the final ALSEP, and returned the largest documented lunar sample mass of the program.',
    achievements: ['Final crewed lunar landing', 'Longest lunar surface stay', 'Largest lunar sample return'],
    equipment: ['Lunar Roving Vehicle', 'ALSEP', 'Traverse gravimeter'],
    landingSite: { id: 'taurus-littrow', name: 'Taurus-Littrow', latitude: 20.18809, longitude: 30.77475, region: 'Taurus-Littrow Valley' },
    evidenceTags: ['LROC orbital imagery', 'Geologist crewmember', 'Largest sample return', 'LRV traverses'],
    spacecraft: { commandModule: 'America', lunarModule: 'Challenger' },
    timelineHighlights: [
      {
        id: 'a17-launch',
        dateLabel: 'December 7, 1972',
        title: 'Night launch to Taurus–Littrow',
        detail: 'Final Saturn V lunar mission begins with translunar injection toward the valley landing site.',
      },
      {
        id: 'a17-landing',
        dateLabel: 'December 11, 1972',
        title: 'Valley floor landing',
        detail: 'Challenger lands between the massifs; crew prepares for three EVAs with LRV and traverse gravimeter work.',
      },
      {
        id: 'a17-evas',
        dateLabel: 'December 11–14, 1972',
        title: 'Three EVAs & final ALSEP',
        detail: 'Geology stops document orange soil, boulder fields, and massif slopes; final Apollo surface experiments are left active.',
      },
      {
        id: 'a17-return',
        dateLabel: 'December 19, 1972',
        title: 'Program closure & recovery',
        detail: 'Last Apollo lunar crew returns to Earth; samples and data enter long-term curation and the open literature.',
      },
    ],
    evidenceFocus: [
      {
        id: 'a17-lroc',
        headline: 'LROC imagery of Challenger and tracks',
        detail: 'NAC products resolve the descent stage, LRV parking locations, and traverse disturbance in the valley.',
      },
      {
        id: 'a17-geology',
        headline: 'Professional field geology documentation',
        detail: 'Schmitt’s traverse decisions and sampling rationale are preserved in transcripts, maps, and photography.',
      },
      {
        id: 'a17-mass',
        headline: 'Maximum documented sample return',
        detail: 'Largest Apollo mass return is traceable through SRC logs and JSC inventory systems.',
      },
    ],
    sourceLinks: [
      { id: 'nasa-a17', label: 'NASA — Apollo 17 mission summary', href: 'https://www.nasa.gov/mission_pages/apollo/missions/apollo17.html', external: true },
      { id: 'lroc-a17', label: 'LROC — Apollo 17 featured site', href: 'https://www.lroc.asu.edu/featured_sites/view/apollo_17_visited', external: true },
      { id: 'alsj-a17', label: 'Apollo Lunar Surface Journal — Apollo 17', href: 'https://www.hq.nasa.gov/alsj/a17/a17.html', external: true },
    ],
  },
]

export const retroreflectors: Retroreflector[] = [
  { id: 'apollo-11-lrrr', name: 'Apollo 11 Retroreflector', missionSlug: 'apollo-11', status: 'active', deployedAt: '1969-07-20', details: 'Array of corner cubes still used in laser ranging.' },
  { id: 'apollo-14-lrrr', name: 'Apollo 14 Retroreflector', missionSlug: 'apollo-14', status: 'active', deployedAt: '1971-02-05', details: 'Earth-Moon distance measurements at millimeter precision.' },
  { id: 'apollo-15-lrrr', name: 'Apollo 15 Retroreflector', missionSlug: 'apollo-15', status: 'active', deployedAt: '1971-07-31', details: 'Largest Apollo reflector array in routine use.' },
]
