import type { Mission, MissionEvidenceFocus, MissionTimelineHighlight } from '@/types/mission'

export function resolvedTimelineHighlights(mission: Mission): MissionTimelineHighlight[] {
  if (mission.timelineHighlights && mission.timelineHighlights.length > 0) {
    return mission.timelineHighlights
  }
  return [
    {
      id: 'fallback-launch',
      dateLabel: mission.launchDate,
      title: 'Launch',
      detail: `${mission.name} begins the translunar flight phase on the published mission schedule.`,
    },
    {
      id: 'fallback-landing',
      dateLabel: mission.landingDate,
      title: 'Lunar landing',
      detail: `Crew lands in ${mission.landingSite.name} (${mission.landingSite.region}).`,
    },
    {
      id: 'fallback-return',
      dateLabel: mission.returnDate,
      title: 'Return & recovery',
      detail: 'Command module splashdown and crew recovery conclude the flight; samples enter the curation pipeline.',
    },
  ]
}

export function resolvedEvidenceFocus(mission: Mission): MissionEvidenceFocus[] {
  if (mission.evidenceFocus && mission.evidenceFocus.length > 0) {
    return mission.evidenceFocus
  }
  return mission.evidenceTags.map((tag, i) => ({
    id: `evidence-tag-${i}`,
    headline: tag,
    detail:
      'Cross-check this theme against the LROC featured site page, mission photography, and the official archives linked below.',
  }))
}

export function formatLunarLatitude(lat: number): string {
  const hem = lat >= 0 ? 'N' : 'S'
  return `${Math.abs(lat).toFixed(5)}° ${hem}`
}

export function formatLunarLongitude(lon: number): string {
  const hem = lon >= 0 ? 'E' : 'W'
  return `${Math.abs(lon).toFixed(5)}° ${hem}`
}
