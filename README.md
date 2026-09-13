# Lái Xe Nhàn

Ứng dụng PWA học kỹ năng lái xe thực tế, ưu tiên mobile và offline-first.

## Chạy local

```bash
npm install
npm run dev
```

Toàn bộ nội dung nằm trong module `src/content/` nên app mở được ngay cả khi chưa cấu hình Supabase và khi mất mạng. Tiến độ học, checklist và theme được lưu local trong trình duyệt. Khi cần kết nối Supabase, thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` vào `.env.local`; lớp API có thể được bổ sung mà không ảnh hưởng content pack hiện tại.

## Nguồn dữ liệu

Nội dung theo mô hình **chuyên đề → bài học → thẻ học**, kèm sơ đồ vector tự tạo và hồ sơ thẩm định:

- `src/content/cards/*.ts` — 23 thẻ học (bối cảnh, mục tiêu, 5–8 bước có mốc canh, 3 lỗi thường gặp, cách chữa, cảnh báo an toàn, khẩu quyết).
- `src/content/reviews.ts` — hồ sơ duyệt chuyên môn. Chỉ thẻ `approved` mới được phát hành ra giao diện.
- `src/content/checklists.ts`, `src/content/lights.ts` — checklist theo ngữ cảnh và đèn cảnh báo táp-lô.
- `src/content/validation.ts` — hàng rào chất lượng (biên tập, kỹ thuật, chuyên gia, an toàn), chạy trong test và cảnh báo khi `npm run dev`.
- `src/content/version.ts`, `src/content/asset-manifest.json` — phiên bản nội dung và metadata tài sản (checksum, dung lượng, gói offline).

Sơ đồ SVG là tài sản tự tạo (không dùng hình bên thứ ba), sinh lại bằng:

```bash
npm run content:assets
```

Chi tiết mô hình dữ liệu, quy trình duyệt và cách thêm thẻ mới: [`docs/content-model.md`](docs/content-model.md).

> Dữ liệu người duyệt trong bản seed là hồ sơ minh họa phục vụ kiểm thử quy trình; cần thay bằng thẩm định viên thật trước khi phát hành công khai.

## Kiến trúc & Tech Stack (Pha 2: Lean Architecture)

- **Frontend Core**: Vue 3 (Composition API) + Vite + Pinia + Vue Router (Route-level code splitting & manual chunking).
- **Offline-First & PWA**: `vite-plugin-pwa` + Service Worker (Workbox caching) + IndexedDB (`idb`) cho gói nội dung và hàng đợi đồng bộ (`SyncEngine`).
- **Data Contracts**: Schema validation bằng `zod` (`src/lib/schema/`) bảo vệ cấu trúc dữ liệu thẻ, checklist, tiến trình người học.
- **BaaS Layer**: Supabase (Postgres with RLS, Auth OTP/OAuth, Storage) tại `src/lib/supabase.ts` và SQL migrations `supabase/migrations/`.
- **Hands-free TTS**: Web Speech API (`src/services/speech.ts` & `src/features/tts/`) với tùy chọn tốc độ 0.9x / 1.0x / 1.1x và đọc từng bước thao tác.
- **Observability**: Ghi nhận sự kiện học tập và đo đạc Web Vitals (`LCP`, `CLS`, `FCP`).

## Tính năng hữu dụng (Pha 4)

- **Checklist tương tác** (`src/views/ChecklistView.vue`, `src/services/checklist/`): tick một chạm với
  haptic nhẹ, thanh tiến độ `n/N`, nút đặt lại và **lịch sử hoàn tất** (thời điểm + thời gian hoàn tất).
  Trạng thái lưu ngay vào `localStorage` + IndexedDB; mỗi lượt hoàn tất được đẩy vào hàng đợi đồng bộ
  (`checklist_session` → bảng `sync_audit_logs`) và gửi lên cloud khi online, có đăng nhập.
- **Đọc to (TTS)** (`src/services/speech.ts`, `src/features/tts/`): đọc cả thẻ hoặc **từng bước** với
  khoảng nghỉ 0,7 giây, play/pause/stop, bước trước/bước sau, tốc độ 0.9x / 1.0x / 1.1x. Khi thiết bị
  không có giọng đọc tiếng Việt, app tự chuyển sang **chế độ chữ to**. Chế độ “Rảnh tay” phóng to nút
  điều khiển và ẩn bớt nội dung phụ.
- **Night mode + tương phản cao** (`src/services/theme/`, `src/styles/tokens.css`): mặc định theo
  giao diện hệ thống, cho phép ép Ban đêm/Ban ngày và bật chế độ tương phản cao. Toàn bộ màn hình đạt
  tương phản chữ WCAG AA ở cả bốn tổ hợp sáng/tối × thường/tương phản cao.
- **Tra cứu đèn cảnh báo** (`src/content/lights.ts`, `src/views/LightsView.vue`): 24 đèn phổ biến với
  màu đèn, mức độ (khẩn cấp / cảnh báo / theo dõi), 3 bước xử lý ngay, điều không nên làm và mốc gọi
  cứu hộ. Tìm kiếm không dấu (“ac quy”, “dong co”), lọc theo mức độ và màu, đèn khẩn cấp xếp lên đầu.
- **Đo đạc & offline**: các sự kiện `checklist_started/completed`, `tts_started/completed/step_skipped`,
  `light_search_used`, `light_detail_viewed`, `night_mode_enabled` được ghi vào hàng đợi cục bộ
  (`src/services/analytics/`), giữ lại khi mất mạng và gửi lại qua `analytics.setTransport()` khi online.

## Kiểm tra

```bash
npm run test
npm run lint
npm run build
```

## Miễn trừ trách nhiệm

Nội dung hỗ trợ ôn luyện kỹ năng lái xe, **không thay thế** đào tạo lái xe chính quy. Khi có khác biệt, hãy tuân theo luật giao thông đường bộ Việt Nam và hướng dẫn của nhà sản xuất xe.
