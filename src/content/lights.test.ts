import { describe, expect, it } from 'vitest'
import {
  dashboardLights,
  findLights,
  getLightById,
  normalizeKeyword,
  LIGHT_COLOR_LABEL,
  SEVERITY_LABEL
} from './lights'
import { DashboardLightSchema } from '../lib/schema'

const reviewedSignals: [string, string[], string[]][] = [
  ['turn-signal', ['không phải xin đi thẳng', 'nháy nhanh', 'không tạo quyền ưu tiên'], []],
  ['rear-fog', ['tia ngang bên phải', 'khác đèn trước', 'không giúp soi đường'], []],
  ['position-light', ['Hai đèn đối xứng', 'Không xác nhận riêng chiếu gần', 'đèn sau'], []],
  ['low-beam', ['tia chúc xuống', 'không có vạch lượn', 'DRL không thay thế'], []],
  ['epb', ['khác đèn P đỏ', 'không dựa vào EPB', 'không nhả/giữ được'], []],
  ['parking-brake', ['vòng tròn', 'không tăng ga', 'vị trí số P'], []],
  ['lane-assist', ['LDW chỉ cảnh báo', 'trắng/xám', 'camera bẩn', 'tay trên vô-lăng'], ['đang hoạt động và theo dõi']],
  ['cruise', ['trắng/xám', 'không giữ khoảng cách', 'không hủy được'], ['chỉ dùng trên cao tốc']],
  ['fog-light', ['sương mù trước', 'tia chúc xuống bên trái', 'biểu tượng vàng'], ['dưới 100 mét']],
  ['high-beam', ['xanh dương', 'tia ngang thẳng', 'quyền ưu tiên'], ['xin đường']],
  ['washer-fluid', ['không nhìn rõ', 'đúng bình', 'không đi tiếp'], ['xử lý ở lần dừng gần nhất']],
  ['fuel-low', ['không có số km được bảo đảm', 'lối ra hợp lệ', 'quy trình mồi'], ['40–70 km']],
  ['service', ['lỗi hệ truyền động', 'đọc thông báo', 'Không reset'], ['chỉ cần đặt lịch với gara quen']],
  ['glow-plug', ['quản lý động cơ', 'nhấp nháy', 'tự điều khiển sấy'], ['thêm 30 giây', 'hẹn kiểm tra bugi']],
  ['dpf', ['chỉ thực hiện', 'đèn nháy', 'trong nhà', 'cỏ khô'], ['15–20 phút']],
  ['immobilizer', ['khi xe đã khóa', 'khởi động dự phòng', 'không phải xe nào'], ['chờ 10 giây']],
  ['esp-off', ['OFF không chứng minh', 'một phần hoặc toàn bộ', 'bật lại ngay'], ['đang tắt hoặc bị lỗi']],
  ['esp-active', ['nhấp nháy', 'sáng liên tục', 'vẫn phanh khẩn cấp'], ['Không đạp ga hoặc phanh gấp']],
  ['eps', ['không đi tiếp', 'Không tắt nguồn khi xe còn chạy', 'đèn đỏ'], ['30 giây', 'chỉ đi chậm đoạn ngắn']],
  ['tpms', ['nháy rồi sáng', 'lốp nguội', 'hông lốp', 'không xả'], ['Bơm lại đúng áp suất ghi']],
  ['abs', ['kèm phanh đỏ', 'phân phối lực phanh', 'không đi tiếp'], ['trong vài ngày tới', 'ít nhất 4 giây']],
  ['engine', ['Sáng liên tục và nhấp nháy', 'bộ xúc tác', 'sổ tay cho phép'], ['đi chậm đến gara gần nhất']],
  ['door', ['hình riêng', 'không đi tiếp', 'không chốt chắc'], ['cho đến khi đèn tắt']],
  ['seatbelt', ['mọi người', 'qua hông', 'không dùng vị trí đó'], ['dùng chốt giả để tắt tiếng']],
  ['airbag', ['bộ căng đai', 'PASSENGER AIRBAG OFF', 'sớm nhất có thể'], ['trong vài ngày tới']],
  ['battery', ['DC-DC', 'không có quãng đường', 'Không tháo cọc'], ['Giữ máy nổ, đi thẳng']],
  ['transmission', ['chỉ về P khi', 'xe khác yêu cầu tắt máy', 'không tự đặt thời gian'], ['khoảng 10 phút']],
  ['temperature', ['nguội hoàn toàn', 'không mở capo', 'quạt có thể tự quay'], ['ít nhất 30 phút']],
  ['oil', ['tắt động cơ', 'mức dầu đủ không chứng minh', 'sổ tay cho phép'], ['khởi động lại và xem']],
  ['brake', ['đã dừng', 'kèm ABS', 'không đi tiếp'], ['Đạp thử phanh']]
]

describe('reviewed real-world signal states and actions', () => {
  it.each(reviewedSignals)('%s preserves safety distinctions', (id, required, prohibited) => {
    const light = getLightById(id)
    expect(light).toBeDefined()
    const text = JSON.stringify(light)
    for (const phrase of required) expect(text).toContain(phrase)
    for (const phrase of prohibited) expect(text).not.toContain(phrase)
  })
})

describe('tra cứu đèn cảnh báo táp-lô', () => {
  it('có tối thiểu 20 đèn phổ biến, không trùng mã', () => {
    expect(dashboardLights.length).toBeGreaterThanOrEqual(20)
    const ids = dashboardLights.map((light) => light.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('mỗi đèn đủ thông tin xử lý theo chuẩn nội dung', () => {
    for (const light of dashboardLights) {
      const parsed = DashboardLightSchema.safeParse(light)
      expect(parsed.success, `${light.id} sai schema`).toBe(true)
      expect(light.actions).toHaveLength(3)
      expect(light.avoid.length).toBeGreaterThan(10)
      expect(light.callHelp.length).toBeGreaterThan(10)
      expect(light.keywords.length).toBeGreaterThan(0)
      expect(SEVERITY_LABEL[light.severity]).toBeTruthy()
      expect(LIGHT_COLOR_LABEL[light.color]).toBeTruthy()
    }
  })

  it('phủ đủ nhóm đèn quan trọng nhất', () => {
    for (const id of ['engine', 'oil', 'battery', 'brake', 'abs', 'temperature', 'tpms', 'airbag', 'eps', 'transmission']) {
      expect(getLightById(id), `thiếu đèn ${id}`).toBeDefined()
    }
  })

  it('tìm được theo từ khóa có dấu lẫn không dấu', () => {
    expect(findLights({ query: 'phanh' }).some((light) => light.id === 'brake')).toBe(true)
    expect(findLights({ query: 'ac quy' }).some((light) => light.id === 'battery')).toBe(true)
    expect(findLights({ query: 'dong co' }).some((light) => light.id === 'engine')).toBe(true)
    expect(findLights({ query: 'khong-co-dau-nay' })).toHaveLength(0)
  })

  it('lọc theo mức độ và màu đèn', () => {
    const critical = findLights({ severity: 'critical' })
    expect(critical.length).toBeGreaterThan(0)
    expect(critical.every((light) => light.severity === 'critical')).toBe(true)

    const green = findLights({ color: 'green' })
    expect(green.length).toBeGreaterThan(0)
    expect(green.every((light) => light.color === 'green')).toBe(true)
    expect(getLightById('high-beam')?.color).toBe('blue')
    expect(findLights({ color: 'blue' }).map((light) => light.id)).toContain('high-beam')
  })

  it('xếp đèn khẩn cấp lên đầu danh sách', () => {
    const results = findLights()
    expect(results).toHaveLength(dashboardLights.length)
    expect(results[0].severity).toBe('critical')
    const severityOrder = results.map((light) => light.severity)
    expect(severityOrder.lastIndexOf('critical')).toBeLessThan(severityOrder.indexOf('info'))
  })

  it('chuẩn hóa từ khóa bỏ dấu tiếng Việt', () => {
    expect(normalizeKeyword('Ắc Quy')).toBe('ac quy')
    expect(normalizeKeyword('Động cơ')).toBe('dong co')
  })
})
