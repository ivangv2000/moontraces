import * as Cesium from 'cesium'
import {
  LUNAR_ATLAS_COLOR_URL,
  LUNAR_ATLAS_EXTENT_DEG,
  LUNAR_ATLAS_RELIEF_URL,
} from '@/lib/map/lunar-atlas-config'

/**
 * Official Cesium Ion global Moon 3D Tiles (LRO composite).
 * @see https://cesium.com/platform/cesium-ion/content/cesium-moon/
 */
export const CESIUM_MOON_ION_ASSET_ID = 2684829

const ionMoonTilesets = new WeakMap<Cesium.Viewer, Cesium.Cesium3DTileset>()

export interface InitMoonViewerOptions {
  container: HTMLElement
}

export const MOON_MIN_ZOOM_DISTANCE = 35_000
export const MOON_MAX_ZOOM_DISTANCE = 8_000_000

const MOON_ELLIPSOID = Cesium.Ellipsoid.MOON
const MOON_FRAMING_SPHERE = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, MOON_ELLIPSOID.maximumRadius * 1.35)

const viewerBaseOptions: Cesium.Viewer.ConstructorOptions = {
  animation: false,
  baseLayerPicker: false,
  fullscreenButton: false,
  geocoder: false,
  homeButton: false,
  infoBox: false,
  sceneModePicker: false,
  selectionIndicator: false,
  timeline: false,
  navigationHelpButton: false,
  shouldAnimate: false,
  baseLayer: false,
}

function frameMoonGlobe(viewer: Cesium.Viewer, duration: number): void {
  viewer.camera.flyToBoundingSphere(MOON_FRAMING_SPHERE, {
    duration,
    offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-28), MOON_ELLIPSOID.maximumRadius * 1.45),
  })
}

function applyScenePresentation(viewer: Cesium.Viewer): void {
  const scene = viewer.scene
  if (!scene) return

  scene.backgroundColor = Cesium.Color.fromCssColorString('#070810')

  if (scene.moon) scene.moon.show = false
  if (scene.skyBox) (scene.skyBox as unknown as { show: boolean }).show = false
  if (scene.skyAtmosphere) scene.skyAtmosphere.show = false
  if (scene.sun) scene.sun.show = false
  if (scene.fog) scene.fog.enabled = false
  scene.highDynamicRange = false

  const fxaa = scene.postProcessStages?.fxaa
  if (fxaa) fxaa.enabled = true

  const globe = scene.globe
  if (globe) {
    globe.baseColor = Cesium.Color.fromCssColorString('#6b7288')
    globe.showGroundAtmosphere = false
    globe.enableLighting = false
    // Keep entity/point markers from being depth-occluded by the ellipsoid globe when Terrain is on.
    globe.depthTestAgainstTerrain = false
  }
}

function applyCameraInteraction(viewer: Cesium.Viewer): void {
  const controller = viewer.scene?.screenSpaceCameraController
  if (!controller) return

  controller.enableRotate = true
  controller.enableZoom = true
  controller.enableTilt = true
  controller.enableLook = true
  controller.enableTranslate = false
  controller.inertiaSpin = 0.82
  controller.inertiaZoom = 0.48
  controller.inertiaTranslate = 0.3
}

/** Keeps “north-up” orbit feeling closer to a globe product (experimental viewer only). */
function applyGlobeStyleCamera(viewer: Cesium.Viewer): void {
  viewer.camera.constrainedAxis = Cesium.Cartesian3.UNIT_Z
}

function applyZoomLimits(viewer: Cesium.Viewer): void {
  const controller = viewer.scene?.screenSpaceCameraController
  if (!controller) return

  controller.minimumZoomDistance = MOON_MIN_ZOOM_DISTANCE
  controller.maximumZoomDistance = MOON_MAX_ZOOM_DISTANCE
}

function polishCredits(viewer: Cesium.Viewer): void {
  const creditContainer = viewer.cesiumWidget?.creditContainer
  if (creditContainer instanceof HTMLElement) {
    creditContainer.style.opacity = '0.65'
    creditContainer.style.pointerEvents = 'auto'
  }
}

function safeJsonStringify(value: unknown, maxLength = 4000): string {
  try {
    const seen = new WeakSet<object>()
    const json = JSON.stringify(
      value,
      (_key, v) => {
        if (typeof v === 'bigint') return String(v)
        if (v instanceof Error) return { name: v.name, message: v.message, cause: (v as Error & { cause?: unknown }).cause }
        if (v && typeof v === 'object') {
          if (seen.has(v as object)) return '[Circular]'
          seen.add(v as object)
        }
        return v
      },
      2,
    )
    return json.length > maxLength ? `${json.slice(0, maxLength)}…` : json
  } catch {
    return '[unserializable]'
  }
}

function collectIonErrorDetails(error: unknown, depth = 0): Record<string, string> {
  const out: Record<string, string> = {}
  if (error == null || depth > 2) return out

  if (typeof error === 'string') {
    out.message = error
    return out
  }

  if (error instanceof Error) {
    out[`L${depth}_name`] = error.name
    out[`L${depth}_message`] = error.message
    const errWithCause = error as Error & { cause?: unknown }
    if (errWithCause.cause !== undefined) {
      Object.assign(out, collectIonErrorDetails(errWithCause.cause, depth + 1))
    }
  }

  if (typeof error === 'object' && error !== null) {
    const o = error as Record<string, unknown>
    const copyKeys = [
      'statusCode',
      'status',
      'code',
      'reason',
      'url',
      'message',
      'response',
      'error',
    ] as const
    for (const k of copyKeys) {
      if (!(k in o)) continue
      const v = o[k]
      if (v == null) continue
      if (typeof v === 'object' && k === 'response') {
        const r = v as Record<string, unknown>
        if (typeof r.status === 'number' || typeof r.status === 'string') out.response_status = String(r.status)
        if (typeof r.statusText === 'string') out.response_statusText = r.statusText
        if (typeof r.url === 'string') out.response_url = r.url
        try {
          out.response_json = safeJsonStringify(v, 1500)
        } catch {
          out.response_json = '[unserializable]'
        }
        continue
      }
      if (typeof v === 'object' && k === 'error') {
        Object.assign(out, collectIonErrorDetails(v, depth + 1))
        continue
      }
      out[k] = typeof v === 'string' || typeof v === 'number' || typeof v === 'boolean' ? String(v) : safeJsonStringify(v, 800)
    }
  }

  if (typeof Response !== 'undefined' && error instanceof Response) {
    out.http_status = String(error.status)
    out.http_statusText = error.statusText
    if (error.url) out.http_url = error.url
  }

  return out
}

function logIonMoonFailure(
  error: unknown,
  context: { assetId: number; tokenPresent: boolean; tokenLength: number },
): void {
  if (process.env.NODE_ENV !== 'development') return

  const details = collectIonErrorDetails(error)
  const summaryLine =
    error instanceof Error
      ? `${error.name}: ${error.message}`
      : typeof error === 'object' && error !== null && 'message' in error && typeof (error as { message: unknown }).message === 'string'
        ? (error as { message: string }).message
        : typeof error === 'string'
          ? error
          : safeJsonStringify(error, 500)

  console.groupCollapsed('[Moon viewer] Cesium Ion Moon failed — see diagnostics below')
  console.info('Context', context)
  console.info('Summary (readable)', summaryLine)
  if (Object.keys(details).length > 0) console.table(details)
  else console.info('No structured fields extracted; inspect the full value.')
  console.info('Full error value (expand in DevTools)', error)
  console.info('JSON snapshot', safeJsonStringify(error))
  console.groupEnd()
  console.warn('[Moon viewer] Creating fresh fallback globe viewer (Ion path skipped).')
}

function destroyIonViewerAndTileset(viewer: Cesium.Viewer | null, tilesetNotYetAdded: Cesium.Cesium3DTileset | null): void {
  if (tilesetNotYetAdded && !tilesetNotYetAdded.isDestroyed()) {
    tilesetNotYetAdded.destroy()
  }

  if (!viewer || viewer.isDestroyed()) return

  const tracked = ionMoonTilesets.get(viewer)
  if (tracked && !tracked.isDestroyed()) {
    viewer.scene.primitives.remove(tracked)
    tracked.destroy()
    ionMoonTilesets.delete(viewer)
  }

  viewer.destroy()
}

const MOON_ATLAS_RECTANGLE = Cesium.Rectangle.fromDegrees(
  LUNAR_ATLAS_EXTENT_DEG[0],
  LUNAR_ATLAS_EXTENT_DEG[1],
  LUNAR_ATLAS_EXTENT_DEG[2],
  LUNAR_ATLAS_EXTENT_DEG[3],
)

/**
 * Local equirectangular atlas on the Moon ellipsoid — primary visual upgrade when Ion / 3D Tiles are unavailable.
 */
function addFallbackMoonAtlasImagery(viewer: Cesium.Viewer): void {
  const colorProvider = new Cesium.SingleTileImageryProvider({
    url: LUNAR_ATLAS_COLOR_URL,
    rectangle: MOON_ATLAS_RECTANGLE,
    ellipsoid: MOON_ELLIPSOID,
    credit: 'NASA / LROC-based color basemap (local atlas)',
  })
  viewer.imageryLayers.addImageryProvider(colorProvider, 0)

  const reliefProvider = new Cesium.SingleTileImageryProvider({
    url: LUNAR_ATLAS_RELIEF_URL,
    rectangle: MOON_ATLAS_RECTANGLE,
    ellipsoid: MOON_ELLIPSOID,
    credit: 'NASA Goddard — LOLA shaded relief PIA15133 (local)',
  })
  const reliefLayer = viewer.imageryLayers.addImageryProvider(reliefProvider, 1)
  reliefLayer.alpha = 0.42
}

function createGlobeFallbackViewer(container: HTMLElement): Cesium.Viewer {
  const viewer = new Cesium.Viewer(container, {
    ...viewerBaseOptions,
    globe: new Cesium.Globe(MOON_ELLIPSOID),
  })

  addFallbackMoonAtlasImagery(viewer)

  applyScenePresentation(viewer)
  applyCameraInteraction(viewer)
  applyGlobeStyleCamera(viewer)
  applyZoomLimits(viewer)
  frameMoonGlobe(viewer, 0)
  polishCredits(viewer)

  return viewer
}

export async function initMoonViewer({ container }: InitMoonViewerOptions): Promise<Cesium.Viewer> {
  ;(Cesium.buildModuleUrl as unknown as { setBaseUrl: (url: string) => void }).setBaseUrl('/cesium/')

  const token =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN
      ? process.env.NEXT_PUBLIC_CESIUM_ION_TOKEN.trim()
      : ''

  if (!token) {
    return createGlobeFallbackViewer(container)
  }

  let ionViewer: Cesium.Viewer | null = null
  let tilesetAwaitingAdd: Cesium.Cesium3DTileset | null = null

  try {
    Cesium.Ion.defaultAccessToken = token
    Cesium.Ellipsoid.default = Cesium.Ellipsoid.MOON

    ionViewer = new Cesium.Viewer(container, {
      ...viewerBaseOptions,
      globe: false,
    })

    applyScenePresentation(ionViewer)
    applyCameraInteraction(ionViewer)
    applyGlobeStyleCamera(ionViewer)
    applyZoomLimits(ionViewer)

    const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(CESIUM_MOON_ION_ASSET_ID)
    tilesetAwaitingAdd = tileset

    if (ionViewer.isDestroyed()) {
      if (!tileset.isDestroyed()) tileset.destroy()
      tilesetAwaitingAdd = null
      throw new Error('Viewer destroyed before Moon tileset could be displayed')
    }

    ionViewer.scene.primitives.add(tileset)
    ionMoonTilesets.set(ionViewer, tileset)
    tilesetAwaitingAdd = null

    const radius = tileset.boundingSphere.radius
    const range = Math.max(radius * 2.0, MOON_ELLIPSOID.maximumRadius * 1.4)
    await ionViewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-28), range))

    polishCredits(ionViewer)
    return ionViewer
  } catch (error) {
    Cesium.Ellipsoid.default = Cesium.Ellipsoid.WGS84

    destroyIonViewerAndTileset(ionViewer, tilesetAwaitingAdd)
    ionViewer = null
    tilesetAwaitingAdd = null

    logIonMoonFailure(error, {
      assetId: CESIUM_MOON_ION_ASSET_ID,
      tokenPresent: true,
      tokenLength: token.length,
    })

    return createGlobeFallbackViewer(container)
  }
}

/** Terrain layer toggle: Ion Moon tileset or ellipsoid globe. */
export function setMoonSurfaceVisibility(viewer: Cesium.Viewer, visible: boolean): void {
  const tileset = ionMoonTilesets.get(viewer)
  if (tileset && !tileset.isDestroyed()) {
    tileset.show = visible
    return
  }
  if (viewer.scene?.globe) {
    viewer.scene.globe.show = visible
  }
}

export function destroyMoonViewer(viewer: Cesium.Viewer | null): void {
  if (!viewer || viewer.isDestroyed()) return

  const tileset = ionMoonTilesets.get(viewer)
  if (tileset && !tileset.isDestroyed()) {
    viewer.scene.primitives.remove(tileset)
    tileset.destroy()
    ionMoonTilesets.delete(viewer)
  }

  viewer.destroy()
}

export function resetMoonCamera(viewer: Cesium.Viewer): void {
  const tileset = ionMoonTilesets.get(viewer)
  if (tileset && !tileset.isDestroyed()) {
    const radius = tileset.boundingSphere.radius
    const range = Math.max(radius * 2.0, MOON_ELLIPSOID.maximumRadius * 1.4)
    void viewer.zoomTo(tileset, new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-28), range))
    return
  }
  frameMoonGlobe(viewer, 0.9)
}

export function getMoonZoomPercent(viewer: Cesium.Viewer): number {
  const height = viewer.camera.positionCartographic.height
  const normalized = 1 - (height - MOON_MIN_ZOOM_DISTANCE) / (MOON_MAX_ZOOM_DISTANCE - MOON_MIN_ZOOM_DISTANCE)
  const clamped = Math.min(1, Math.max(0, normalized))
  return Math.round(clamped * 100)
}
