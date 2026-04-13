import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.moontraces.com' }],
        destination: 'https://moontraces.com/:path*',
        permanent: true,
      },
    ]
  },
  turbopack: {
    root: __dirname,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'upload.wikimedia.org', pathname: '/wikipedia/**' },
      { protocol: 'https', hostname: 'live.staticflickr.com', pathname: '/**' },
      { protocol: 'https', hostname: 'images-assets.nasa.gov', pathname: '/**' },
    ],
  },
}

export default nextConfig
