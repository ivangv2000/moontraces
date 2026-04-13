import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { missions } from '@/data/missions'
import { getMissionBySlug, getMissionIndex } from '@/lib/missions'
import { MissionDossier } from '@/components/missions/mission-dossier'
import { JsonLd } from '@/components/seo/json-ld'
import { definePageMetadata } from '@/lib/seo/define-page-metadata'
import { SITE_NAME, absoluteUrl } from '@/lib/site-config'

export function generateStaticParams() {
  return missions.map((mission) => ({ slug: mission.slug }))
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const mission = getMissionBySlug(slug)
  if (!mission) return {}

  return definePageMetadata({
    title: `${mission.name}: ${mission.landingSite.name}`,
    description: `${mission.highlight} Crewed lunar landing ${mission.landingDate}; coordinates, timeline, and cited NASA, LROC, and archive sources.`,
    pathname: `/missions/${mission.slug}`,
  })
}

export default async function MissionDetailPage({ params }: PageProps) {
  const { slug } = await params
  const mission = getMissionBySlug(slug)
  if (!mission) notFound()

  const currentIndex = getMissionIndex(slug)
  const prevMission = currentIndex > 0 ? missions[currentIndex - 1] : null
  const nextMission = currentIndex < missions.length - 1 ? missions[currentIndex + 1] : null

  const pageUrl = absoluteUrl(`/missions/${mission.slug}`)
  const missionJsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `${mission.name} — ${mission.landingSite.name}`,
        description: mission.highlight,
        inLanguage: 'en-US',
        isPartOf: {
          '@type': 'WebSite',
          name: SITE_NAME,
          url: absoluteUrl('/'),
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: absoluteUrl('/'),
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Missions',
            item: absoluteUrl('/missions'),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: mission.name,
            item: pageUrl,
          },
        ],
      },
    ],
  }

  return (
    <>
      <JsonLd data={missionJsonLd} />
      <MissionDossier mission={mission} prevMission={prevMission} nextMission={nextMission} />
    </>
  )
}
