import type { MissionSiteImagery } from "@/types/mission-site-imagery"

/** LROC “First Look at the Apollo Landing Sites” — regional ~1 km NAC context per mission (A11/A14/A15/A16/A17 AxLEMa frames). */
const LROC157 = "https://lroc.im-ldi.com/posts/157"

/** Apollo 12 — annotated low-altitude NAC site diagram (no AxLEMa frame in the 157 set). */
const LROC401_APOLLO12_SITE = "https://lroc.im-ldi.com/posts/401"

/** Apollo 14 — published traverse / station figure from the LROC NAC stereo paper (curated site map). */
const LROC29_APOLLO14_SITE = "https://lroc.im-ldi.com/posts/29"

/**
 * Site Detail imagery.
 *
 * Broad view (“Site map” tab): official LROC landing-site context only — either the shared **post 157**
 * first-look NAC mosaic per mission, the **post 401** annotated Apollo 12 map, or the **post 29** Apollo 14
 * traverse figure. Evidence close-ups stay mission-specific in `evidenceImage`.
 */
export const missionSiteImagery: MissionSiteImagery[] = [
  {
    missionSlug: "apollo-11",
    title: "Apollo 11 — Tranquility Base",
    contextImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/f/f4/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A11LEMa_1000%29.png",
      tileSourceKind: "image",
      title: "Site map — regional NAC (LROC post 157, Tranquility Base)",
      caption:
        "Official LROC Apollo landing sites release (July 2009, post 157): ~1 km-scale narrow-angle frame centered on Tranquility Base and West crater within Mare Tranquillitatis.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: LROC157,
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_(LROC157_-_A11LEMa_1000).png",
    },
    evidenceImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d2/Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_%286962456839%29.jpg",
      tileSourceKind: "image",
      title: "Low-altitude NAC — “best look yet” at the landing site",
      caption:
        "LRO narrow-angle observation from ~24 km altitude (Goddard release “A Stark Beauty All Its Own”): LM, PSEP, LRRR, cover foil, and footpaths toward the experiments and toward Little West crater are visible at full zoom (M175124932R product family).",
      attribution: "NASA/Goddard Space Flight Center/Arizona State University",
      officialSourceUrl: "https://lroc.im-ldi.com/posts/484",
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:Apollo_11-_%27A_Stark_Beauty_All_Its_Own%27_(6962456839).jpg",
    },
    notes:
      "Site map uses the standard post 157 first-look frame family; evidence is post 484 (“best look yet” / M175124932R).",
  },
  {
    missionSlug: "apollo-12",
    title: "Apollo 12 — Ocean of Storms",
    contextImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/7/72/Pinpoint_Landing_on_the_Ocean_of_Storms_%28LROC401_-_M175428601RE_25cm_AP12_area%29.png",
      tileSourceKind: "image",
      title: "Site map — annotated landing site (LROC post 401)",
      caption:
        "Official LROC curated map: low-altitude NAC mosaic (M175428601R) with astronaut crater names, LM *Intrepid*, ALSEP, and Surveyor III callouts—Ocean of Storms footprint at ~25 cm/px scale in the released figure.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: LROC401_APOLLO12_SITE,
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:Pinpoint_Landing_on_the_Ocean_of_Storms_(LROC401_-_M175428601RE_25cm_AP12_area).png",
    },
    evidenceImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/2/2b/Apollo_12_Fifty-first_Anniversary_%28LROC1135%29.png",
      tileSourceKind: "image",
      title: "LM, ALSEP, Surveyor III, tracks (LROC NAC)",
      caption:
        "Low-altitude NAC mosaic (~275 m wide): lunar module descent stage, ALSEP, Surveyor III, and astronaut tracks are visible.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: "https://lroc.im-ldi.com/posts/1135",
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:Apollo_12_Fifty-first_Anniversary_(LROC1135).png",
    },
  },
  {
    missionSlug: "apollo-14",
    title: "Apollo 14 — Fra Mauro",
    contextImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/6c/Precise_3D_Measurements_of_Objects_at_Apollo_14_Landing_Site_from_LROC_NAC_Stereo_Images_%28LROC29_-_5%29.png",
      tileSourceKind: "image",
      title: "Site map — traverse layout (LROC post 29, Fra Mauro)",
      caption:
        "Official LROC NAC stereo release (post 29), Figure 1: curated traverse map with EVA paths, stations, and major features on the Fra Mauro site basemap (NASA/GSFC/ASU/OSU).",
      attribution: "NASA/GSFC/Arizona State University/The Ohio State University",
      officialSourceUrl: LROC29_APOLLO14_SITE,
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:Precise_3D_Measurements_of_Objects_at_Apollo_14_Landing_Site_from_LROC_NAC_Stereo_Images_(LROC29_-_5).png",
    },
    evidenceImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/LRO_Apollo14_landing_site_369441main_lroc_apollo14_lrg.jpg",
      tileSourceKind: "image",
      title: "NAC landing-site frame — LM *Antares* and ALSEP (369441main release)",
      caption:
        "NASA/LROC `369441main_lroc_apollo14_lrg` product: narrow-angle view resolving *Antares*, ALSEP, MET/tool cart tracks, and traverse disturbance across the landing ellipse from the first public LROC Apollo 14 release.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: LROC157,
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:LRO_Apollo14_landing_site_369441main_lroc_apollo14_lrg.jpg",
    },
    notes:
      "Site map is the published traverse figure (post 29), not the post 157 overhead frame; evidence stays the `369441main` post 157 product.",
  },
  {
    missionSlug: "apollo-15",
    title: "Apollo 15 — Hadley–Apennine",
    contextImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A15LEMa_1000%29.png",
      tileSourceKind: "image",
      title: "Site map — regional NAC (LROC post 157, Hadley–Apennine)",
      caption:
        "Official LROC Apollo landing sites release (July 2009, post 157): ~1 km-scale narrow-angle frame of Hadley Rille and the Apollo 15 valley landing corridor.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: LROC157,
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_(LROC157_-_A15LEMa_1000).png",
    },
    evidenceImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/3/3a/Apollo_15-_Follow_the_Tracks_%286816337786%29.jpg",
      tileSourceKind: "image",
      title: "LM, ALSEP, and rover tracks (low-altitude NAC)",
      caption:
        "NASA Goddard LROC NAC release from the 2011 low-altitude campaign: lunar module *Falcon*, ALSEP vicinity, and rover / astronaut tracks across the mare basalt—strong single-frame surface evidence.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: "https://www.flickr.com/photos/gsfc/6816337786/",
      catalogUrl: "https://commons.wikimedia.org/wiki/File:Apollo_15-_Follow_the_Tracks_(6816337786).jpg",
    },
  },
  {
    missionSlug: "apollo-16",
    title: "Apollo 16 — Descartes highlands",
    contextImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/6/60/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A16LEMa_1000%29.png",
      tileSourceKind: "image",
      title: "Site map — regional NAC (LROC post 157, Descartes)",
      caption:
        "Official LROC Apollo landing sites release (July 2009, post 157): ~1 km-scale narrow-angle frame centered on the Cayley Plains Apollo 16 landing area.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: LROC157,
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_(LROC157_-_A16LEMa_1000).png",
    },
    evidenceImage: {
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/0/04/Apollo_16_LS.png",
      tileSourceKind: "image",
      title: "Low-orbit landing site (LROC NAC)",
      caption:
        "NAC observation from low orbit (~250 m image width) showing the descent stage and traverse-related features at the site.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: "https://lroc.im-ldi.com/posts/520",
      catalogUrl: "https://commons.wikimedia.org/wiki/File:Apollo_16_LS.png",
    },
  },
  {
    missionSlug: "apollo-17",
    title: "Apollo 17 — Taurus–Littrow",
    contextImage: {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/b/b5/LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_%28LROC157_-_A17LEMa_1000%29.png",
      tileSourceKind: "image",
      title: "Site map — regional NAC (LROC post 157, Taurus–Littrow)",
      caption:
        "Official LROC Apollo landing sites release (July 2009, post 157): ~1 km-scale narrow-angle frame of the Taurus–Littrow valley landing area.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: LROC157,
      catalogUrl:
        "https://commons.wikimedia.org/wiki/File:LROC%E2%80%99s_First_Look_at_the_Apollo_Landing_Sites_(LROC157_-_A17LEMa_1000).png",
    },
    evidenceImage: {
      imageUrl: "https://upload.wikimedia.org/wikipedia/commons/3/30/Apollo_17_LM_Challenger_LRO.png",
      tileSourceKind: "image",
      title: "LM Challenger (low-periapsis NAC)",
      caption:
        "Narrow-angle camera frame from a low-periapsis pass (~150 m field of view) showing the lunar module descent stage.",
      attribution: "NASA/GSFC/Arizona State University",
      officialSourceUrl: "https://lroc.im-ldi.com/images/379",
      catalogUrl: "https://commons.wikimedia.org/wiki/File:Apollo_17_LM_Challenger_LRO.png",
    },
    notes:
      "Additional LROC posts (e.g. flag illumination, rover parking) can be added as alternate evidence slots later.",
  },
]

export function getMissionSiteImageryBySlug(slug: string): MissionSiteImagery | undefined {
  return missionSiteImagery.find((e) => e.missionSlug === slug)
}
