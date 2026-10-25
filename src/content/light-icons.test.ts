import { describe, expect, it } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import DashboardLightIcon from '../features/dashboard-lights/DashboardLightIcon.vue'
import { dashboardLights } from './lights'
import { getLightDrawing, isDashboardIconName, lightIcons } from './light-icons'
import { DashboardLightSchema } from '../lib/schema'

describe('original dashboard SVG illustrations', () => {
  it('every catalogue entry resolves to a real drawing, never a font glyph', () => {
    for (const light of dashboardLights) {
      expect(isDashboardIconName(light.icon), light.id).toBe(true)
      const drawing = getLightDrawing(light.icon)
      expect(Object.keys(drawing.paths).length + (drawing.text?.length ?? 0)).toBeGreaterThan(0)
    }
    expect(DashboardLightSchema.safeParse({ ...dashboardLights[0], icon: '⚡' }).success).toBe(false)
    expect(isDashboardIconName('toString')).toBe(false)
    expect(isDashboardIconName(null)).toBe(false)
  })

  it.each(Object.keys(lightIcons).filter(isDashboardIconName))('renders %s as a local 64-square SVG', async (name) => {
    const html = await renderToString(createSSRApp(DashboardLightIcon, { name }))
    expect(html).toMatch(/viewbox="0 0 64 64"/i)
    expect(html).toContain(`data-signal="${name}"`)
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('stroke="currentColor"')
    expect(html).not.toMatch(/<image|<script|https?:|undefined|NaN/)
    for (const path of Object.values(getLightDrawing(name).paths)) {
      expect(path).toMatch(/^M/)
      expect(path).not.toMatch(/NaN|undefined/)
    }
  })

  it('distinguishes headlight direction, beam angle and front/rear fog', () => {
    const high = getLightDrawing('high-beam').paths
    const low = getLightDrawing('low-beam').paths
    const front = getLightDrawing('fog-light').paths
    const rear = getLightDrawing('rear-fog').paths
    expect(high.horizontalRays).toBe('M10 19h18M10 28h18M10 37h18M10 46h18')
    expect(low.dippedRays).toBe('M10 26l18-7M10 35l18-7M10 44l18-7M10 53l18-7')
    expect(high.lamp).toBe(low.lamp)
    expect(front.lamp).toBe(high.lamp)
    expect(front.dippedRays).toBe(low.dippedRays)
    expect(front.fogWave).toBeTruthy()
    expect(rear.lamp).toBe('M28 17v30c-19 0-19-30 0-30Z')
    expect(rear.horizontalRays).toBe('M36 19h18M36 28h18M36 37h18M36 46h18')
    expect(rear.fogWave).not.toBe(front.fogWave)
    expect(low).not.toHaveProperty('fogWave')
  })

  it.each([
    ['oil', ['oilCan', 'drop']],
    ['temperature', ['thermometer', 'coolant']],
    ['battery', ['battery', 'polarity']],
    ['airbag', ['person', 'airbag']],
    ['seatbelt', ['person', 'diagonalBelt', 'lapBelt']],
    ['door', ['car', 'openDoors']],
    ['tpms', ['tyre', 'exclamation']],
    ['eps', ['steering', 'exclamation']],
    ['dpf', ['filter', 'soot']],
    ['esp-active', ['car', 'skidTracks']],
    ['washer-fluid', ['windscreen', 'spray']],
    ['power-limited', ['turtle', 'shell']]
  ] as const)('%s contains its identifying features', (name, parts) => {
    expect(Object.keys(getLightDrawing(name).paths)).toEqual(parts)
  })

  it('keeps OFF, P, ABS, EPB, READY and AUTO HOLD legible and explicit', () => {
    for (const [name, labels] of [
      ['esp-off', ['OFF']], ['parking-brake', ['P']], ['abs', ['ABS']],
      ['epb', ['EPB']], ['ready', ['READY']], ['auto-hold', ['AUTO', 'HOLD']]
    ] as const) {
      expect(getLightDrawing(name).text?.map((text) => text.value)).toEqual(labels)
    }
    expect(getLightDrawing('esp-off').text?.[0].y).toBeLessThanOrEqual(58)
  })
})
