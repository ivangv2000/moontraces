import { missions } from '@/data/missions'
import type { Mission } from '@/types/mission'

export function getAllMissions(): Mission[] {
  return missions
}

export function getMissionBySlug(slug: string): Mission | undefined {
  return missions.find((mission) => mission.slug === slug)
}

export function getMissionIndex(slug: string): number {
  return missions.findIndex((mission) => mission.slug === slug)
}
