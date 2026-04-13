import type { MissionDossierMedia } from '@/types/mission-dossier-media'

/**
 * Mission-specific dossier imagery (NASA / LROC / NARA / Wikimedia Commons hosts).
 * Edit this file to change hero, orbital, evidence, or gallery images per mission.
 */
const NASA_ASU = 'NASA / Goddard / Arizona State University (LROC)'
const NASA_ONLY = 'NASA'
const NASA_NARA = 'NASA (National Archives)'

const bySlug: Record<string, MissionDossierMedia> = {
  'apollo-11': {
    hero: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Aldrin_Apollo_11_original.jpg',
      alt: 'Buzz Aldrin stands on the lunar surface beside the lunar module during Apollo 11 EVA',
      caption: 'Surface EVA at Tranquility Base: the LM Eagle and deployed experiments appear in published Hasselblad photography.',
      credit: NASA_ONLY,
      sourceUrl: 'https://www.hq.nasa.gov/alsj/a11/a11.html',
    },
    orbital: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_%286962456839%29.jpg',
      alt: 'LROC narrow-angle image of the Apollo 11 landing site from lunar orbit',
      caption: 'Lunar Reconnaissance Orbiter narrow-angle context of Tranquility Base—hardware and disturbance match EVA logs.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/posts/484',
    },
    evidence: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Apollo_11_Lunar_Laser_Ranging_Experiment.jpg',
      alt: 'Apollo 11 laser ranging retroreflector on the lunar surface after deployment',
      caption: 'The Apollo 11 LRRR remains an active target for Earth–Moon laser ranging networks.',
      credit: NASA_ONLY,
      sourceUrl: 'https://science.nasa.gov/moon/lunar-laser-ranging/',
    },
    gallery: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Apollo_11_bootprint.jpg',
        alt: 'Bootprint in lunar soil from Apollo 11',
        caption: 'Regolith disturbance documented on the surface.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/0/03/AS11-40-5952_-_Apollo_11_-_Apollo_11_Mission_image_-_The_Laser_Ranging_Retroreflector_%28LRRR%29_-_NARA_-_16685293.jpg',
        alt: 'Laser ranging retroreflector after deployment on Apollo 11',
        caption: 'Corner-cube array at a published selenographic position.',
        credit: NASA_NARA,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/2/27/Apollo_11_insignia.png',
        alt: 'Apollo 11 mission insignia',
        caption: 'Mission identity in the contemporaneous program record.',
        credit: NASA_ONLY,
      },
    ],
  },
  'apollo-12': {
    hero: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Astronaut_Alan_Bean_deploys_Lunar_Surface_Magnetometer_on_lunar_surface_%28as12-46-6813%29.jpg',
      alt: 'Alan Bean deploys the lunar surface magnetometer during Apollo 12 EVA',
      caption: 'Second lunar landing: two EVAs, full ALSEP, and a precision approach to Surveyor III.',
      credit: NASA_ONLY,
      sourceUrl: 'https://www.hq.nasa.gov/alsj/a12/a12.html',
    },
    orbital: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Apollo_12_Fifty-first_Anniversary_%28LROC1135%29.png',
      alt: 'LROC mosaic of Apollo 12 site with LM, ALSEP, Surveyor III, and traverse paths',
      caption: 'Official LROC mosaic tying Intrepid, ALSEP, and Surveyor III in one georeferenced frame.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/posts/1135',
    },
    evidence: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Pinpoint_Landing_on_the_Ocean_of_Storms_%28LROC401_-_M175428601RE_25cm_AP12_area%29.png',
      alt: 'Annotated LROC map of Apollo 12 landing area at high resolution',
      caption: 'Traverse-scale mapping demonstrates how orbital products close the loop with surface operations.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/posts/401',
    },
    gallery: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Apollo_12_Mission_image_-_Lunar_surface_near_lunar_module_%28AS12-47-6949%29.jpg',
        alt: 'Lunar surface near the Apollo 12 lunar module',
        caption: 'Surface perspective beside Intrepid.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Apollo_12_Mission_image_-_Lunar_surface_%28AS12-47-6938%29.jpg',
        alt: 'Apollo 12 view of the lunar surface during EVA',
        caption: 'Ocean of Storms geology in crew photography.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Apollo_12_stereo_view_of_lunar_surface_%28as12-57-8455%29.jpg',
        alt: 'Stereo pair view of Apollo 12 lunar surface',
        caption: 'Stereo documentation supports terrain interpretation.',
        credit: NASA_ONLY,
      },
    ],
  },
  'apollo-14': {
    hero: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Apollo_14_Shepard.jpg',
      alt: 'Alan Shepard on the lunar surface during Apollo 14',
      caption: 'Fra Mauro Highlands landing: two EVAs and deployment of a new ALSEP package.',
      credit: NASA_ONLY,
      sourceUrl: 'https://www.hq.nasa.gov/alsj/a14/a14.html',
    },
    orbital: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/New_View_of_Apollo_14_%28LROC285%29.jpg',
      alt: 'LROC image of the Apollo 14 landing site from orbit',
      caption: 'LROC re-imaging of Fra Mauro ties descent hardware to the published landing ellipse.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/posts/285',
    },
    evidence: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Precise_3D_Measurements_of_Objects_at_Apollo_14_Landing_Site_from_LROC_NAC_Stereo_Images_%28LROC29_-_5%29.png',
      alt: 'LROC stereo-derived view of objects at the Apollo 14 landing site',
      caption: 'NAC stereo products support measured geometry of surface artifacts—an independent cross-check on coordinates.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/featured_sites/view/apollo_14_visited',
    },
    gallery: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Alan_Shepard_and_his_golf_club_-_Apollo_14_%2846953937601%29.jpg',
        alt: 'Alan Shepard with golf club on the Moon during Apollo 14',
        caption: 'Documented surface activity during EVA.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Alan_Shepard_during_the_Apollo_14_mission.jpg',
        alt: 'Alan Shepard in spacesuit during Apollo 14',
        caption: 'Commander in lunar surface equipment.',
        credit: NASA_ONLY,
      },
    ],
  },
  'apollo-15': {
    hero: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/Apollo_15_flag%2C_rover%2C_LM%2C_Irwin.jpg',
      alt: 'Apollo 15: US flag, lunar rover, lunar module, and astronaut James Irwin at Hadley–Apennine',
      caption: 'First extended stay and LRV operations: Falcon, rover tracks, and ALSEP in one surface frame.',
      credit: NASA_ONLY,
      sourceUrl: 'https://www.hq.nasa.gov/alsj/a15/a15.html',
    },
    orbital: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Apollo_15-_Follow_the_Tracks_%286816337786%29.jpg',
      alt: 'LROC image of Apollo 15 site showing LM, ALSEP, rover, and traverse tracks',
      caption: 'Orbital pass resolving the lunar module, experiments, and wheel paths from Hadley–Apennine.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.flickr.com/photos/gsfc/6816337786/',
    },
    evidence: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/5/50/AS15-88-11899_%2821648383142%29.jpg',
      alt: 'Apollo 15 Hasselblad photograph of the laser ranging retroreflector on the Moon',
      caption: 'Apollo 15 deployed a long-lived laser ranging array—still used in global LLR campaigns.',
      credit: NASA_ONLY,
      sourceUrl: 'https://science.nasa.gov/moon/lunar-laser-ranging/',
    },
    gallery: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Apollo_15_with_lunar_rover.jpg',
        alt: 'Apollo 15 crew with the lunar roving vehicle',
        caption: 'Crew and LRV in the surface record.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Apollo_15_Mission_image_-_View_of_the_Apollo_Lunar_Surface_Experiments_Package_%28ALSEP%29_%28as15-85-11471%29.jpg',
        alt: 'Apollo 15 ALSEP on the lunar surface',
        caption: 'Surface experiment package in situ.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Layers_near_Apollo_15_landing_site_%28LROC355_-_M113941548L_thumb%29.png',
        alt: 'LROC thumbnail of layered terrain near Apollo 15 landing site',
        caption: 'Regional LROC context at the landing zone.',
        credit: NASA_ASU,
      },
    ],
  },
  'apollo-16': {
    hero: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/View_of_the_Apollo_16_Lunar_Module_on_the_lunar_surface_%28as16-113-18334%29.jpg',
      alt: 'Apollo 16 lunar module Orion on the lunar surface',
      caption: 'Highlands landing at Descartes: LM Orion and three rover-assisted EVAs.',
      credit: NASA_ONLY,
      sourceUrl: 'https://www.hq.nasa.gov/alsj/a16/a16.html',
    },
    orbital: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/6/60/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A16LEMa_1000%29.png',
      alt: 'LROC narrow-angle first-look frame of the Apollo 16 landing region',
      caption: 'Commissioning-era LROC strip over the Descartes landing site—consistent with other Apollo zones.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/posts/157',
    },
    evidence: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/35/View_of_lunar_surface_at_Apollo_16_station_11_%28as16-116-18599%29.jpg',
      alt: 'Lunar surface at Apollo 16 geology station 11',
      caption: 'Traverse geology documented in Hasselblad imagery aligns with rover-era orbital basemaps.',
      credit: NASA_ONLY,
      sourceUrl: 'https://www.lroc.asu.edu/featured_sites/view/apollo_16_visited',
    },
    gallery: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Lunar_surface_shortly_after_landing%2C_Apollo_16.jpg',
        alt: 'Lunar surface shortly after Apollo 16 landing',
        caption: 'First surface views after touchdown.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Apollo_16_LM_Orion.jpg',
        alt: 'Apollo 16 lunar module Orion',
        caption: 'LM in the highlands lighting.',
        credit: NASA_ONLY,
      },
    ],
  },
  'apollo-17': {
    hero: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/e/e4/Apollo_17_Cernan_and_the_lunar_rover_AS17-147-22576HR.jpg',
      alt: 'Gene Cernan and the lunar roving vehicle during Apollo 17',
      caption: 'Final Apollo lunar landing: extended rover geology in Taurus–Littrow.',
      credit: NASA_ONLY,
      sourceUrl: 'https://www.hq.nasa.gov/alsj/a17/a17.html',
    },
    orbital: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A17LEMa_1000%29.png',
      alt: 'LROC narrow-angle first-look frame of the Apollo 17 landing region',
      caption: 'LROC coverage of the valley floor where Challenger touched down.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/posts/157',
    },
    evidence: {
      src: 'https://upload.wikimedia.org/wikipedia/commons/3/30/Apollo_17_LM_Challenger_LRO.png',
      alt: 'LROC image of Apollo 17 lunar module Challenger at the landing site',
      caption: 'Orbital resolution of the LM descent stage closes the mission engineering record for Apollo 17.',
      credit: NASA_ASU,
      sourceUrl: 'https://www.lroc.asu.edu/featured_sites/view/apollo_17_visited',
    },
    gallery: [
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/NASA_Apollo_17_Lunar_Roving_Vehicle.jpg',
        alt: 'Apollo 17 lunar roving vehicle on the Moon',
        caption: 'LRV operations in the surface archive.',
        credit: NASA_ONLY,
      },
      {
        src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Apollo_17_Cernan_on_moon.jpg',
        alt: 'Gene Cernan on the lunar surface during Apollo 17',
        caption: 'Commander at the last Apollo landing site.',
        credit: NASA_ONLY,
      },
    ],
  },
}

export function getMissionDossierMediaBySlug(slug: string): MissionDossierMedia | null {
  return bySlug[slug] ?? null
}
