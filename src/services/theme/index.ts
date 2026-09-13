import type { ContrastPreference, ThemeMode, ThemePreference } from '../../types'

const DARK_QUERY = '(prefers-color-scheme: dark)'

/** Giao diện thực tế sau khi áp dụng lựa chọn của người dùng và cài đặt hệ thống. */
export const resolveTheme = (preference: ThemePreference, systemDark: boolean): ThemeMode => {
  if (preference === 'system') return systemDark ? 'dark' : 'light'
  return preference
}

/** Hệ thống đang ở chế độ tối hay không; mặc định tối khi không đọc được. */
export const systemPrefersDark = (): boolean => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return true
  try {
    return window.matchMedia(DARK_QUERY).matches
  } catch {
    return true
  }
}

/** Theo dõi thay đổi dark/light của hệ điều hành; trả về hàm hủy đăng ký. */
export const watchSystemTheme = (onChange: (prefersDark: boolean) => void): (() => void) => {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  try {
    const media = window.matchMedia(DARK_QUERY)
    const handler = (event: MediaQueryListEvent) => onChange(event.matches)
    media.addEventListener('change', handler)
    return () => media.removeEventListener('change', handler)
  } catch {
    return () => {}
  }
}

/** Gắn theme và mức tương phản lên thẻ <html> để token CSS nhận diện. */
export const applyTheme = (theme: ThemeMode, contrast: ContrastPreference = 'normal'): void => {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
  document.documentElement.dataset.contrast = contrast
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', theme === 'dark' ? '#0e1715' : '#f5f7f3')
}

/** Khung giờ tối (18h–5h) — dùng để gợi ý bật chế độ ban đêm. */
export const isNightHours = (date = new Date()): boolean => {
  const hour = date.getHours()
  return hour >= 18 || hour < 5
}

export const THEME_LABEL: Record<ThemePreference, string> = {
  system: 'Theo hệ thống',
  dark: 'Ban đêm',
  light: 'Ban ngày'
}

/** Vòng lựa chọn khi bấm nút đổi giao diện: hệ thống → tối → sáng. */
export const nextThemePreference = (current: ThemePreference): ThemePreference =>
  current === 'system' ? 'dark' : current === 'dark' ? 'light' : 'system'
