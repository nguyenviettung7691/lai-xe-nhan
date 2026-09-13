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

## Kiểm tra

```bash
npm run test
npm run lint
npm run build
```

## Miễn trừ trách nhiệm

Nội dung hỗ trợ ôn luyện kỹ năng lái xe, **không thay thế** đào tạo lái xe chính quy. Khi có khác biệt, hãy tuân theo luật giao thông đường bộ Việt Nam và hướng dẫn của nhà sản xuất xe.
