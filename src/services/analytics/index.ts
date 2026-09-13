export type AnalyticsEventType =
  | 'card_view'
  | 'card_complete'
  | 'checklist_started'
  | 'checklist_item_checked'
  | 'checklist_completed'
  | 'checklist_reset'
  | 'tts_play'
  | 'tts_started'
  | 'tts_paused'
  | 'tts_resumed'
  | 'tts_completed'
  | 'tts_step_skipped'
  | 'tts_stop'
  | 'tts_speed_change'
  | 'tts_fallback_shown'
  | 'light_search_used'
  | 'light_detail_viewed'
  | 'light_action_acknowledged'
  | 'night_mode_enabled'
  | 'theme_preference_changed'
  | 'high_contrast_toggled'
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
  /** Đã gửi lên hệ thống thu thập hay chưa; sự kiện offline được gửi lại khi có mạng. */
  synced?: boolean
}

export interface WebVitalMetric {
  name: 'LCP' | 'INP' | 'CLS' | 'FCP' | 'TTFB'
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  timestamp: number
}

/** Hàm gửi sự kiện lên hệ thống thu thập; trả về false để giữ lại hàng đợi. */
export type AnalyticsTransport = (events: AnalyticsEvent[]) => Promise<boolean> | boolean

const STORAGE_KEY = 'lxn-analytics-queue'

class AnalyticsService {
  private eventsQueue: AnalyticsEvent[] = []
  private vitals: WebVitalMetric[] = []
  private maxQueueSize = 100
  private transport: AnalyticsTransport | null = null
  private isFlushing = false

  constructor() {
    this.restoreQueue()
    if (typeof window !== 'undefined') {
      this.initWebVitals()
      window.addEventListener('online', () => {
        void this.flush()
      })
    }
  }

  /** Ghi nhận một sự kiện học tập */
  public track(type: AnalyticsEventType, properties: Record<string, unknown> = {}) {
    const event: AnalyticsEvent = {
      id: `evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      properties,
      timestamp: Date.now(),
      isOffline: typeof navigator !== 'undefined' && navigator.onLine === false,
      synced: false
    }

    this.eventsQueue.push(event)
    if (this.eventsQueue.length > this.maxQueueSize) {
      this.eventsQueue.shift()
    }
    this.persistQueue()

    if (import.meta.env.DEV) {
      console.log(`[Analytics] [${event.type}]`, event.properties)
    }

    if (!event.isOffline) {
      void this.flush()
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

  /** Sự kiện chưa gửi được (ghi khi offline hoặc gửi thất bại) */
  public getPendingEvents(): AnalyticsEvent[] {
    return this.eventsQueue.filter((event) => !event.synced)
  }

  /** Cấu hình nơi nhận sự kiện; chưa cấu hình thì hàng đợi nằm lại trên máy. */
  public setTransport(transport: AnalyticsTransport | null) {
    this.transport = transport
    if (transport) void this.flush()
  }

  /** Gửi các sự kiện đang chờ khi có mạng; giữ nguyên hàng đợi nếu thất bại. */
  public async flush(): Promise<number> {
    if (this.isFlushing || !this.transport) return 0
    if (typeof navigator !== 'undefined' && navigator.onLine === false) return 0

    const pending = this.getPendingEvents()
    if (pending.length === 0) return 0

    this.isFlushing = true
    try {
      const delivered = await this.transport(pending)
      if (!delivered) return 0
      const deliveredIds = new Set(pending.map((event) => event.id))
      for (const event of this.eventsQueue) {
        if (deliveredIds.has(event.id)) event.synced = true
      }
      this.persistQueue()
      return pending.length
    } catch {
      return 0
    } finally {
      this.isFlushing = false
    }
  }

  /** Xoá hàng đợi (dùng cho kiểm thử và khi người dùng đăng xuất). */
  public reset() {
    this.eventsQueue = []
    this.persistQueue()
  }

  /** Lấy danh sách Web Vitals */
  public getVitals(): WebVitalMetric[] {
    return [...this.vitals]
  }

  private storage(): Storage | null {
    try {
      return typeof localStorage === 'undefined' ? null : localStorage
    } catch {
      return null
    }
  }

  /** Nạp lại hàng đợi sau khi đóng app khi đang offline. */
  private restoreQueue() {
    const store = this.storage()
    if (!store) return
    try {
      const raw = store.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as AnalyticsEvent[]
      if (Array.isArray(parsed)) {
        this.eventsQueue = parsed.slice(-this.maxQueueSize)
      }
    } catch {
      // Dữ liệu hỏng: bỏ qua để không chặn khởi động app.
    }
  }

  private persistQueue() {
    const store = this.storage()
    if (!store) return
    try {
      store.setItem(STORAGE_KEY, JSON.stringify(this.eventsQueue))
    } catch {
      // Hết dung lượng: giữ hàng đợi trong bộ nhớ.
    }
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
