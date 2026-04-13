import type { MetadataRoute } from 'next'
import { missions } from '@/data/missions'
import { absoluteUrl } from '@/lib/site-config'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/explore'), lastModified, changeFrequency: 'weekly', priority: 0.95 },
    { url: absoluteUrl('/evidence'), lastModified, changeFrequency: 'weekly', priority: 0.95 },
    {
      url: absoluteUrl('/apollo-landing-sites-from-orbit'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.93,
    },
    { url: absoluteUrl('/how-we-know'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: absoluteUrl('/sources'), lastModified, changeFrequency: 'monthly', priority: 0.85 },
    { url: absoluteUrl('/missions'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
  ]

  const missionRoutes: MetadataRoute.Sitemap = missions.map((m) => ({
    url: absoluteUrl(`/missions/${m.slug}`),
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.88,
  }))

  return [...staticRoutes, ...missionRoutes]
}
