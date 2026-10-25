import { describe, expect, it } from 'vitest'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp } from 'vue'
import AppIcon from './AppIcon.vue'
import { appIcons, isAppIconName } from './icons'

const names = Object.keys(appIcons).filter(isAppIconName)

describe('original interface icons', () => {
  it.each(names)('renders %s as a local, decorative 24-square SVG', async (name) => {
    const html = await renderToString(createSSRApp(AppIcon, { name }))
    expect(html).toMatch(/viewbox="0 0 24 24"/i)
    expect(html).toContain(`data-icon="${name}"`)
    expect(html).toContain('aria-hidden="true"')
    expect(html).toContain('stroke="currentColor"')
    expect(html).not.toMatch(/<image|<text|<script|https?:|undefined|NaN/)
    for (const part of appIcons[name] as { d: string }[]) {
      expect(part.d).toMatch(/^M/)
      expect(part.d).not.toMatch(/NaN|undefined/)
    }
  })

  it('rejects unknown names', () => {
    expect(isAppIconName('toString')).toBe(false)
    expect(isAppIconName('☔')).toBe(false)
    expect(isAppIconName(undefined)).toBe(false)
  })

  it('keeps the theme and contrast controls visually distinct', () => {
    const theme = ['theme-system', 'theme-dark', 'theme-light'] as const
    for (const name of theme) expect(appIcons[name]).not.toEqual(appIcons.contrast)
    expect(new Set(theme.map((name) => JSON.stringify(appIcons[name]))).size).toBe(3)
  })
})
