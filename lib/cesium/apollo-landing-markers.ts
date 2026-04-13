import * as Cesium from 'cesium'
import type { Mission } from '@/types/mission'

const MOON = Cesium.Ellipsoid.MOON

/** Slight lift along the ellipsoid normal — anchor stays lunar; billboard + eyeOffset handles globe depth. */
const SURFACE_OFFSET_METERS = 2_000

const LANDING_SITE_FRAMING_RADIUS = 2_000

/** Wide enough for context; pitch eased off vertical for a calmer “orbit” read (not satellite nadir). */
const LANDING_SITE_CAMERA_RANGE = 1_050_000
const LANDING_SITE_CAMERA_PITCH_DEG = -76

/** Nudge billboards toward the camera in eye space (meters) so the globe mesh does not win depth. */
const BILLBOARD_EYE_OFFSET = new Cesium.Cartesian3(0, 0, -180)

const BILLBOARD_WIDTH_DEFAULT = 22
const BILLBOARD_HEIGHT_DEFAULT = 22
const BILLBOARD_WIDTH_SELECTED = 30
const BILLBOARD_HEIGHT_SELECTED = 30

/** Tiny point under the billboard: same anchor, reinforces “on surface” without relying on it for visibility. */
const POINT_PIXEL_SUBTLE = 6
const POINT_PIXEL_SELECTED = 8

const POINT_COLOR_DEFAULT = Cesium.Color.fromCssColorString('#94a3b8').withAlpha(0.72)
const POINT_COLOR_SELECTED = Cesium.Color.fromCssColorString('#7dd3fc').withAlpha(0.92)

/** At or below this height (m): show every Apollo text label (when Labels is on). */
const LABEL_LOD_ALL_MAX_HEIGHT_M = 780_000

/** At or above this height (m): text for the selected site only — calm global orbit. */
const LABEL_LOD_SELECTED_ONLY_MIN_HEIGHT_M = 2_450_000

/**
 * Between ALL and SELECTED_ONLY: selected always labeled; others only if within this angle (deg)
 * of the view center on the Moon (reduces limb clutter while rotating).
 */
const LABEL_LOD_VIEW_CONE_DEG = 42

export interface ApolloLandingMarkersHandle {
  applySelection: (slug: string) => void
  flyToMission: (slug: string) => void
  setLabelsVisible: (visible: boolean) => void
  dispose: () => void
}

function sitePosition(longitude: number, latitude: number): Cesium.Cartesian3 {
  return Cesium.Cartesian3.fromDegrees(longitude, latitude, SURFACE_OFFSET_METERS, MOON)
}

function missionPosition(mission: Mission): Cesium.Cartesian3 {
  const { longitude, latitude } = mission.landingSite
  return sitePosition(longitude, latitude)
}

/** Unit direction from Moon center to landing site (surface), for view-cone tests. */
function missionSurfaceNormal(mission: Mission, out: Cesium.Cartesian3): Cesium.Cartesian3 {
  const p = Cesium.Cartesian3.fromDegrees(mission.landingSite.longitude, mission.landingSite.latitude, 0, MOON)
  return Cesium.Cartesian3.normalize(p, out)
}

function missionShortLabel(mission: Mission): string {
  return mission.name.replace(/^Apollo\s+/i, 'A').trim()
}

/** Procedural PNG data URLs — always camera-facing billboards, reliable vs ellipsoid depth. */
function createMarkerBillboardUris(): { defaultUri: string; selectedUri: string } {
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 2

  const draw = (logicalPx: number, selected: boolean): string => {
    const size = Math.max(16, Math.round(logicalPx * dpr))
    const canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext('2d')
    if (!ctx) return ''
    const cx = size / 2
    const cy = size / 2
    const r = size / 2 - 2 * dpr

    if (selected) {
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      glow.addColorStop(0, 'rgba(224,242,254,0.98)')
      glow.addColorStop(0.35, 'rgba(125,211,252,0.55)')
      glow.addColorStop(0.7, 'rgba(56,189,248,0.2)')
      glow.addColorStop(1, 'rgba(125,211,252,0)')
      ctx.fillStyle = glow
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = 'rgba(240,249,255,0.98)'
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(15,23,42,0.8)'
      ctx.lineWidth = Math.max(1, dpr * 0.85)
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.3, 0, Math.PI * 2)
      ctx.stroke()
    } else {
      ctx.fillStyle = 'rgba(148,163,184,0.5)'
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.28, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = 'rgba(15,23,42,0.55)'
      ctx.lineWidth = Math.max(0.75, dpr * 0.65)
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.28, 0, Math.PI * 2)
      ctx.stroke()

      ctx.strokeStyle = 'rgba(148,163,184,0.22)'
      ctx.lineWidth = Math.max(0.5, dpr * 0.45)
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.48, 0, Math.PI * 2)
      ctx.stroke()
    }

    return canvas.toDataURL('image/png')
  }

  return {
    defaultUri: draw(28, false),
    selectedUri: draw(36, true),
  }
}

export async function createApolloLandingMarkers(
  viewer: Cesium.Viewer,
  missions: Mission[],
  onPick: (slug: string) => void,
): Promise<ApolloLandingMarkersHandle> {
  const dataSource = new Cesium.CustomDataSource('apollo-landing-sites')
  await viewer.dataSources.add(dataSource)

  const { defaultUri, selectedUri } = createMarkerBillboardUris()

  const entities = new Map<string, Cesium.Entity>()

  let labelsLayerEnabled = true
  let selectedSlug = missions[0]?.slug ?? ''

  for (const mission of missions) {
    const shortLabel = missionShortLabel(mission)

    const entity = dataSource.entities.add({
      id: mission.slug,
      name: mission.name,
      position: missionPosition(mission),
      show: true,
      billboard: {
        image: defaultUri,
        width: BILLBOARD_WIDTH_DEFAULT,
        height: BILLBOARD_HEIGHT_DEFAULT,
        verticalOrigin: Cesium.VerticalOrigin.CENTER,
        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
        eyeOffset: BILLBOARD_EYE_OFFSET,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
      point: {
        pixelSize: POINT_PIXEL_SUBTLE,
        color: POINT_COLOR_DEFAULT,
        outlineWidth: 0,
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
      },
      label: {
        text: shortLabel,
        font: '600 11px system-ui, -apple-system, sans-serif',
        fillColor: Cesium.Color.fromCssColorString('#f8fafc'),
        outlineColor: Cesium.Color.fromCssColorString('#020617'),
        outlineWidth: 3,
        style: Cesium.LabelStyle.FILL_AND_OUTLINE,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(0, -16),
        eyeOffset: BILLBOARD_EYE_OFFSET,
        showBackground: true,
        backgroundColor: Cesium.Color.fromCssColorString('#0b0f18').withAlpha(0.88),
        backgroundPadding: new Cesium.Cartesian2(8, 4),
        disableDepthTestDistance: Number.POSITIVE_INFINITY,
        show: false,
      },
    })
    entities.set(mission.slug, entity)
  }

  const hitPointScratch = new Cesium.Cartesian3()
  const viewNormalScratch = new Cesium.Cartesian3()
  const siteNormalScratch = new Cesium.Cartesian3()
  const viewConeHalfAngleRad = Cesium.Math.toRadians(LABEL_LOD_VIEW_CONE_DEG)

  function viewCenterMoonNormal(): Cesium.Cartesian3 | undefined {
    const canvas = viewer.scene.canvas
    const ray = viewer.camera.getPickRay(
      new Cesium.Cartesian2(canvas.clientWidth * 0.5, canvas.clientHeight * 0.5),
    )
    if (!Cesium.defined(ray)) return undefined
    const interval = Cesium.IntersectionTests.rayEllipsoid(ray, MOON)
    if (!Cesium.defined(interval)) return undefined
    const t = interval.start > 0 ? interval.start : interval.stop
    if (!Number.isFinite(t)) return undefined
    const hit = Cesium.Ray.getPoint(ray, t, hitPointScratch)
    return Cesium.Cartesian3.normalize(hit, viewNormalScratch)
  }

  function refreshLabels(): void {
    let heightAboveEllipsoid = Number.POSITIVE_INFINITY
    try {
      const c = viewer.camera.positionCartographic
      if (c) heightAboveEllipsoid = c.height
    } catch {
      heightAboveEllipsoid = Number.POSITIVE_INFINITY
    }

    const viewNormal =
      heightAboveEllipsoid > LABEL_LOD_ALL_MAX_HEIGHT_M &&
      heightAboveEllipsoid < LABEL_LOD_SELECTED_ONLY_MIN_HEIGHT_M
        ? viewCenterMoonNormal()
        : undefined

    for (const [id, entity] of entities) {
      const label = entity.label
      if (!label) continue
      if (!labelsLayerEnabled) {
        label.show = new Cesium.ConstantProperty(false)
        continue
      }

      const selected = id === selectedSlug
      let showText = false

      if (heightAboveEllipsoid <= LABEL_LOD_ALL_MAX_HEIGHT_M) {
        showText = true
      } else if (heightAboveEllipsoid >= LABEL_LOD_SELECTED_ONLY_MIN_HEIGHT_M) {
        showText = selected
      } else {
        if (selected) {
          showText = true
        } else if (viewNormal) {
          const mission = missions.find((m) => m.slug === id)
          if (!mission) {
            showText = false
          } else {
            const siteN = missionSurfaceNormal(mission, siteNormalScratch)
            const sep = Cesium.Cartesian3.angleBetween(viewNormal, siteN)
            showText = sep <= viewConeHalfAngleRad
          }
        } else {
          showText = selected
        }
      }

      label.show = new Cesium.ConstantProperty(showText)
    }
  }

  const onCameraChanged = () => {
    refreshLabels()
  }
  viewer.camera.changed.addEventListener(onCameraChanged)

  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
  handler.setInputAction((click: { position: Cesium.Cartesian2 }) => {
    const picked = viewer.scene.pick(click.position)
    if (!Cesium.defined(picked)) return

    const target = picked.id
    if (!(target instanceof Cesium.Entity)) return

    const rawId = target.id
    const slug = typeof rawId === 'string' ? rawId : undefined
    if (!slug || !entities.has(slug)) return

    onPick(slug)
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK)

  function applySelection(slug: string): void {
    selectedSlug = slug

    for (const [id, entity] of entities) {
      const selected = id === slug

      const billboard = entity.billboard
      if (billboard) {
        billboard.image = new Cesium.ConstantProperty(selected ? selectedUri : defaultUri)
        billboard.width = new Cesium.ConstantProperty(
          selected ? BILLBOARD_WIDTH_SELECTED : BILLBOARD_WIDTH_DEFAULT,
        )
        billboard.height = new Cesium.ConstantProperty(
          selected ? BILLBOARD_HEIGHT_SELECTED : BILLBOARD_HEIGHT_DEFAULT,
        )
      }

      const point = entity.point
      if (point) {
        point.pixelSize = new Cesium.ConstantProperty(selected ? POINT_PIXEL_SELECTED : POINT_PIXEL_SUBTLE)
        point.color = new Cesium.ConstantProperty(selected ? POINT_COLOR_SELECTED : POINT_COLOR_DEFAULT)
      }

      const label = entity.label
      if (label) {
        if (selected) {
          label.font = new Cesium.ConstantProperty('700 12px system-ui, -apple-system, sans-serif')
          label.fillColor = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString('#ffffff'))
          label.outlineColor = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString('#0c1222'))
          label.outlineWidth = new Cesium.ConstantProperty(3)
          label.backgroundColor = new Cesium.ConstantProperty(
            Cesium.Color.fromCssColorString('#111827').withAlpha(0.9),
          )
          label.pixelOffset = new Cesium.ConstantProperty(new Cesium.Cartesian2(0, -18))
        } else {
          label.font = new Cesium.ConstantProperty('600 11px system-ui, -apple-system, sans-serif')
          label.fillColor = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString('#e2e8f0'))
          label.outlineColor = new Cesium.ConstantProperty(Cesium.Color.fromCssColorString('#020617'))
          label.outlineWidth = new Cesium.ConstantProperty(3)
          label.backgroundColor = new Cesium.ConstantProperty(
            Cesium.Color.fromCssColorString('#0b0f18').withAlpha(0.85),
          )
          label.pixelOffset = new Cesium.ConstantProperty(new Cesium.Cartesian2(0, -16))
        }
      }
    }

    refreshLabels()
  }

  function flyToMission(slug: string): void {
    if (viewer.isDestroyed()) return

    const mission = missions.find((m) => m.slug === slug)
    if (!mission) return

    viewer.camera.cancelFlight()

    const { longitude, latitude } = mission.landingSite
    const center = sitePosition(longitude, latitude)
    const boundingSphere = new Cesium.BoundingSphere(center, LANDING_SITE_FRAMING_RADIUS)

    viewer.camera.flyToBoundingSphere(boundingSphere, {
      duration: 1.25,
      offset: new Cesium.HeadingPitchRange(
        0,
        Cesium.Math.toRadians(LANDING_SITE_CAMERA_PITCH_DEG),
        LANDING_SITE_CAMERA_RANGE,
      ),
    })
  }

  function setLabelsVisible(visible: boolean): void {
    labelsLayerEnabled = visible
    refreshLabels()
  }

  function dispose(): void {
    handler.destroy()
    if (!viewer.isDestroyed()) {
      viewer.camera.changed.removeEventListener(onCameraChanged)
      void viewer.dataSources.remove(dataSource, true)
    }
  }

  return {
    applySelection,
    flyToMission,
    setLabelsVisible,
    dispose,
  }
}
