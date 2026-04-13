import { cp, mkdir, stat } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const root = resolve(__dirname, '..')

const source = resolve(root, 'node_modules', 'cesium', 'Build', 'Cesium')
const destination = resolve(root, 'public', 'cesium')

async function copyCesiumAssets() {
  try {
    await stat(source)
  } catch {
    console.warn('[copy-cesium-assets] Cesium is not installed yet, skipping.')
    return
  }

  await mkdir(destination, { recursive: true })
  await cp(source, destination, { recursive: true, force: true })
  console.log('[copy-cesium-assets] Copied Cesium build assets to public/cesium')
}

copyCesiumAssets().catch((error) => {
  console.error('[copy-cesium-assets] Failed to copy Cesium assets')
  console.error(error)
  process.exit(1)
})
