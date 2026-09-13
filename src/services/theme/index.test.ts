import { describe, expect, it, vi } from 'vitest'
import {
  applyTheme,
  isNightHours,
  nextThemePreference,
  resolveTheme,
  systemPrefersDark,
  watchSystemTheme,
  THEME_LABEL
} from './index'

describe('Theme: night mode theo hệ thống và ép thủ công', () => {
  it('lấy theme theo cài đặt hệ thống khi để chế độ tự động', () => {
    expect(resolveTheme('system', true)).toBe('dark')
    expect(resolveTheme('system', false)).toBe('light')
  })

  it('ưu tiên lựa chọn thủ công của người dùng', () => {
    expect(resolveTheme('dark', false)).toBe('dark')
    expect(resolveTheme('light', true)).toBe('light')
  })

  it('vòng lựa chọn đi qua đủ ba trạng thái', () => {
    expect(nextThemePreference('system')).toBe('dark')
    expect(nextThemePreference('dark')).toBe('light')
    expect(nextThemePreference('light')).toBe('system')
    expect(Object.keys(THEME_LABEL)).toEqual(['system', 'dark', 'light'])
  })

  it('nhận diện khung giờ tối để gợi ý chế độ ban đêm', () => {
    expect(isNightHours(new Date('2026-01-01T20:00:00'))).toBe(true)
    expect(isNightHours(new Date('2026-01-01T03:00:00'))).toBe(true)
    expect(isNightHours(new Date('2026-01-01T10:00:00'))).toBe(false)
  })

  it('an toàn khi chạy ngoài trình duyệt (không có window/document)', () => {
    expect(systemPrefersDark()).toBe(true)
    expect(() => applyTheme('dark', 'high')).not.toThrow()
    expect(watchSystemTheme(() => {})).toBeInstanceOf(Function)
  })

  it('theo dõi được thay đổi dark/light của hệ điều hành', () => {
    const listeners: ((event: MediaQueryListEvent) => void)[] = []
    const removeEventListener = vi.fn()
    vi.stubGlobal('window', {
      matchMedia: () => ({
        matches: false,
        addEventListener: (_: string, handler: (event: MediaQueryListEvent) => void) =>
          listeners.push(handler),
        removeEventListener
      })
    })

    const seen: boolean[] = []
    const unwatch = watchSystemTheme((dark) => seen.push(dark))
    expect(systemPrefersDark()).toBe(false)

    listeners[0]({ matches: true } as MediaQueryListEvent)
    expect(seen).toEqual([true])

    unwatch()
    expect(removeEventListener).toHaveBeenCalled()
    vi.unstubAllGlobals()
  })
})
