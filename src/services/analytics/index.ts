export type AnalyticsEventType =
  | 'card_view'
  | 'card_complete'
  | 'checklist_item_checked'
  | 'checklist_reset'
  | 'tts_play'
  | 'tts_stop'
  | 'tts_speed_change'
  | 'offline_mode_used'
  | 'sync_success'
  | 'sync_failed'
  | 'pwa_installed'
  | 'app_loaded'
  | 'quick_check_result'
  | 'display_mode_change'
  | 'experience_level_selected'

export interface AnalyticsEvent {
  id: string
  type: AnalyticsEventType
  properties: Record<string, unknown>
  timestamp: number
  isOffline: boolean
}

export interface WebVitalMetric {
  name: 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

class AnalyticsService {
  private eventsQueue: AnalyticsEvent[] = []
  private vitals: WebVitalMetric[] = []
  private maxQueueSize = 100

  constructor() {
    if (typeof window !== 'undefined') {
      this.initWebVitals()
    }
  }

  /** Ghi nhận một sự kiện học tập */
  public track(type: AnalyticsEventType, properties: Record<string, unknown> = {}) {
    const event: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      properties,
      timestamp: Date.now(),
      isOffline: typeof navigator !== 'undefined' ? !navigator.onLine : false
    }

    this.eventsQueue.push(event)
    if (this.eventsQueue.length > this.maxQueueSize) {
      this.eventsQueue.shift()
    }

    if (import.meta.env.DEV) {
      console.log(`[Analytics] [${event.type}]`, event.properties)
    }
  }

  /** Ghi nhận Web Vitals */
  public recordWebVital(name: WebVitalMetric['name'], value: number) {
    let rating: WebVitalMetric['rating'] = 'good'

    if (name === 'LCP') {
      rating = value <= 2500 ? 'good' : value <= 4000 ? 'needs-improvement' : 'poor'
    } else if (name === 'INP') {
      rating = value <= 200 ? 'good' : value <= 500 ? 'needs-improvement' : 'poor'
    } else if (name === 'CLS') {
      rating = value <= 0.1 ? 'good' : value <= 0.25 ? 'needs-improvement' : 'poor'
    }

    const metric: WebVitalMetric = {
      name,
      value: Math.round(value * 100) / 100,
      rating,
      timestamp: Date.now()
    }

    this.vitals.push(metric)

    if (import.meta.env.DEV) {
      console.log(`[WebVital] ${name}: ${metric.value} (${rating})`)
    }
  }

  /** Lấy danh sách sự kiện đã ghi */
  public getEvents(): AnalyticsEvent[] {
    return [...this.eventsQueue]
  }

  /** Lấy danh sách Web Vitals */
  public getVitals(): WebVitalMetric[] {
    return [...this.vitals]
  }

  /** Khởi tạo đo đạc Performance Web Vitals bằng PerformanceObserver */
  private initWebVitals() {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return

    try {
      // 1. Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          this.recordWebVital('LCP', lastEntry.startTime)
        }
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      // 2. Cumulative Layout Shift (CLS)
      let clsValue = 0
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          const shiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number }
          if (!shiftEntry.hadRecentInput && typeof shiftEntry.value === 'number') {
            clsValue += shiftEntry.value
          }
        }
        this.recordWebVital('CLS', clsValue)
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })

      // 3. First Contentful Paint (FCP)
      const paintObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.recordWebVital('FCP', entry.startTime)
          }
        }
      })
      paintObserver.observe({ type: 'paint', buffered: true })
    } catch {
      // Browsers lacking full support
    }
  }
}

export const analytics = new AnalyticsService()
