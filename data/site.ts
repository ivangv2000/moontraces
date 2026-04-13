import type { SourceLink } from '@/types/evidence'

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/explore', label: 'Explore' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/how-we-know', label: 'How We Know' },
  { href: '/missions', label: 'Missions' },
  { href: '/sources', label: 'Sources' },
] as const

export const footerExploreLinks = [
  { href: '/explore', label: 'Moon Map' },
  { href: '/evidence', label: 'Evidence' },
  { href: '/missions', label: 'Missions' },
  { href: '/sources', label: 'Sources' },
] as const

export const footerLearnLinks = [
  { href: '/how-we-know', label: 'How We Know' },
  { href: '/apollo-landing-sites-from-orbit', label: 'Apollo sites from orbit' },
  { href: '/evidence#retroreflectors-llr', label: 'Retroreflectors' },
  { href: '/evidence#orbital-imagery', label: 'Orbital Imagery' },
] as const

export const officialSources: SourceLink[] = [
  { id: 'nasa-apollo', href: 'https://www.nasa.gov/mission_pages/apollo/missions/index.html', label: 'NASA Apollo Program', external: true },
  { id: 'lroc', href: 'https://www.lroc.asu.edu/', label: 'LROC Mission', external: true },
  { id: 'nssdc', href: 'https://nssdc.gsfc.nasa.gov/', label: 'NSSDC Archive', external: true },
]
