# Kế hoạch mở rộng chi tiết cho mục **2. Tech Stack Tinh Gọn (Tối ưu cho Use Case)**

## 1) Mục tiêu kỹ thuật (Technical Goals)

Tech stack được chọn phải phục vụ đúng bản chất sản phẩm: **ứng dụng học theo thẻ nội dung (content-driven), dùng nhiều trên mobile, cần chạy ổn định ngay cả khi mạng yếu/không có mạng**.

### Mục tiêu cốt lõi
1. **Offline-first thực dụng**: người dùng mở app trong hầm gửi xe vẫn xem được nội dung đã tải.
2. **Tải nhanh trên 4G yếu**: Time-to-Interactive ngắn, ưu tiên hiển thị nội dung học trước.
3. **Đơn giản để vận hành**: team nhỏ vẫn maintain được, hạn chế backend tự xây.
4. **Dễ mở rộng tính năng vừa đủ**: checklist, TTS, lưu tiến độ, đồng bộ đa thiết bị.
5. **Chi phí thấp giai đoạn đầu**: tận dụng free tier hợp lý, chỉ trả phí khi có tăng trưởng thực.

---

## 2) Nguyên tắc thiết kế stack (Lean Engineering Principles)

1. **Frontend-centric architecture**: dồn logic về client (UI, cache, state, rendering).
2. **BaaS thay backend custom**: không dựng server riêng trừ khi thật sự cần.
3. **Static + edge delivery**: nội dung tĩnh (JSON/SVG) phân phối qua CDN.
4. **Progressive enhancement**: máy yếu vẫn dùng được (fallback animation → static).
5. **One-step deploy**: push code là có preview + production pipeline rõ ràng.
6. **Observability tối thiểu nhưng đủ dùng**: theo dõi lỗi JS, hiệu năng thật trên thiết bị người dùng.

---

## 3) Kiến trúc tổng quan đề xuất

## 3.1 Logical architecture (đơn giản hóa tối đa)
- **Client App (PWA SPA)**:
  - Hiển thị card bài học
  - Chạy checklist tương tác
  - TTS bằng Web Speech API
  - Quản lý offline cache + sync queue
- **BaaS**:
  - Auth (Google/Apple/Email)
  - Database (tiến độ học, feedback, metadata)
  - Storage (SVG, icon, content pack)
- **Hosting/CDN**:
  - Deploy frontend
  - Cache asset toàn cầu
- **Analytics/Error tracking**:
  - Đo hành vi học tập
  - Ghi nhận lỗi runtime và web vitals

---

## 4) Lựa chọn công nghệ cụ thể (Recommended Stack)

## 4.1 Frontend framework: **Vue 3 + Vite** (khuyến nghị chính)
> Có thể thay bằng React nếu team đang mạnh React. Tuy nhiên để giữ đúng “tinh gọn”, chọn **một** ngay từ đầu.

### Vì sao Vue 3 phù hợp use case này
- Học nhanh, template rõ ràng cho team nhỏ.
- Dễ tổ chức component cho dạng “card + step + checklist”.
- Performance tốt với bundle nhỏ khi kết hợp Vite + dynamic import.
- Ecosystem đủ dùng: Pinia, Vue Router, PWA plugin.

### Bộ thư viện tối thiểu
- `vue`, `vue-router`, `pinia`
- `vite`, `vite-plugin-pwa`
- `zod` (validate schema dữ liệu từ CMS/BaaS)
- `idb` (IndexedDB wrapper nhẹ)
- (tuỳ chọn) `vueuse` cho utilities

> Tránh thêm UI framework nặng ở giai đoạn đầu; ưu tiên CSS thuần + design tokens.

---

## 4.2 PWA & Offline: **Service Worker + IndexedDB**
Đây là phần “sống còn”.

### Chiến lược cache đề xuất
1. **App shell** (HTML/CSS/JS chunk): precache khi cài.
2. **Core content pack** (JSON + SVG nền): tải lần đầu, lưu IndexedDB.
3. **Media mở rộng theo chuyên đề**: lazy cache khi user vào topic.
4. **API response quan trọng** (tiến độ học): stale-while-revalidate.
5. **Fallback offline page**: khi chưa có mạng và chưa có dữ liệu.

### Chính sách đồng bộ
- Local-first write:
  - user check checklist => ghi local ngay (UX mượt)
  - enqueue event sync lên BaaS khi có mạng
- Conflict strategy:
  - “last write wins” cho field đơn giản (progress timestamp)
  - merge theo item cho checklist (tránh mất trạng thái check)

---

## 4.3 Backend/BaaS: **Supabase** (khuyến nghị chính)

### Vì sao Supabase
- Postgres phù hợp dữ liệu có quan hệ (topic/lesson/card/progress).
- Auth tích hợp sẵn.
- Storage tốt cho SVG/content pack.
- Row Level Security (RLS) giúp bảo vệ dữ liệu user rõ ràng.
- SQL + migration dễ kiểm soát version hơn mô hình NoSQL tự do.

### Dịch vụ Supabase sử dụng
1. **Auth**: Email OTP + OAuth (Google/Apple nếu cần).
2. **Postgres**:
   - content metadata
   - user progress
   - feedback
3. **Storage**:
   - SVG assets
   - icon dashboard lights
   - content bundle exports
4. **Edge Functions** (chỉ khi cần):
   - xử lý webhook nhẹ
   - tổng hợp analytics định kỳ
   - tuyệt đối không biến thành backend phức tạp sớm

---

## 4.4 Hosting: **Vercel** (khuyến nghị chính)
- Triển khai SPA nhanh, preview per-PR rất tiện.
- CDN mạnh cho static assets.
- Tích hợp tốt với GitHub workflow.
- Có thể thay Netlify nếu team quen hơn (không khác biệt lớn cho MVP).

---

## 4.5 Analytics & Monitoring (tối thiểu cần có)

### Analytics sự kiện học tập
- `card_view`
- `card_complete`
- `checklist_item_checked`
- `tts_play`, `tts_stop`
- `offline_mode_used`
- `sync_success`, `sync_failed`

### Error/performance
- Runtime error tracking: Sentry (hoặc tương đương).
- Web vitals: LCP, INP, CLS theo thiết bị.
- Thiết lập cảnh báo:
  - error rate tăng bất thường
  - sync fail > ngưỡng

---

## 5) Cấu trúc codebase đề xuất (Monorepo nhẹ hoặc Single app repo)

Với MVP, ưu tiên **single repo**:

- `apps/web` (toàn bộ frontend PWA)
- `supabase/migrations` (schema SQL)
- `supabase/seed` (dữ liệu mẫu)
- `content/` (nguồn JSON chuẩn hoá trước khi publish)
- `scripts/` (build content pack, optimize SVG)

### Cấu trúc thư mục frontend gợi ý
- `src/features/learning-cards`
- `src/features/checklists`
- `src/features/tts`
- `src/features/dashboard-lights`
- `src/services/offline-cache`
- `src/services/sync-engine`
- `src/lib/api`
- `src/lib/schema`
- `src/styles/tokens.css`

---

## 6) Thiết kế dữ liệu phục vụ stack

## 6.1 Phân tách “Content” và “User Data”
1. **Content (read-heavy, public hoặc semi-public)**  
   - topic/lesson/card/asset/checklist template  
   - version theo `content_version`
2. **User data (private)**  
   - progress, checklist trạng thái cá nhân, bookmark, note, feedback

### Lý do
- Content có thể cache mạnh và CDN hóa.
- User data cần RLS, đồng bộ bảo mật theo tài khoản.

---

## 6.2 Hợp đồng dữ liệu (Data Contract)
Dùng schema validation ở client:
- parse payload qua `zod`
- reject dữ liệu sai định dạng ngay
- tránh crash UI khi content biên tập bị lỗi

---

## 7) Bảo mật tối giản nhưng đúng chuẩn

1. Bật **RLS** cho toàn bộ bảng user data.
2. Chỉ cho phép user đọc/ghi dòng của chính mình.
3. Bucket Storage:
   - public cho icon/schematic công khai
   - private cho file nội bộ biên tập
4. Secret management:
   - dùng env của Vercel/Supabase, không hardcode key.
5. Chống lạm dụng API:
   - basic rate limiting tại Edge (nếu có endpoint custom).

---

## 8) Hiệu năng: ngân sách và kỹ thuật tối ưu

## 8.1 Performance budget mục tiêu
- JS initial bundle (gzip): **< 180KB**
- CSS critical: **< 30KB**
- SVG mỗi file: **< 60KB**
- Time to interactive mobile tầm trung: **< 3s** (4G tốt), **< 5s** (4G yếu)

## 8.2 Kỹ thuật
- Route-level code splitting.
- Chuyên đề nào mở mới load asset chuyên đề đó.
- SVGO pipeline tự động.
- Prefetch thông minh:
  - Khi user đọc card N, prefetch card N+1.
- Virtualized list cho màn danh sách dài.

---

## 9) Accessibility & Mobile UX tiêu chuẩn

1. Font size tối thiểu 16px cho nội dung thao tác nhanh.
2. Tap target >= 44x44 px.
3. Contrast đạt chuẩn WCAG AA.
4. Hỗ trợ screen reader cho checklist và icon cảnh báo.
5. TTS có:
   - play/pause/stop
   - tốc độ đọc 0.9x/1.0x/1.1x
6. Night mode mặc định theo hệ thống + cho phép override.

---

## 10) CI/CD tinh gọn

## 10.1 Pipeline tối thiểu
- Lint + type check
- Unit test (logic trọng yếu: scoring, sync queue, parser)
- Build web
- Optimize SVG + validate content schema
- Deploy preview
- Manual approve → production

## 10.2 Quality gates
- Build fail nếu:
  - content JSON sai schema
  - SVG vượt ngưỡng dung lượng
  - test sync engine fail

---

## 11) Kế hoạch triển khai theo pha (Implementation Phases)

## Pha 1 (Tuần 1–2): Foundation
- Setup Vue 3 + Vite + Router + Pinia
- Setup PWA plugin + service worker base
- Setup Supabase project + auth cơ bản
- Dựng design tokens + layout mobile-first

## Pha 2 (Tuần 3–4): Core learning flow
- Danh sách chuyên đề, lesson, card
- Card detail với step-by-step + SVG viewer
- Checklist local state
- TTS playback cho từng bước

## Pha 3 (Tuần 5–6): Offline & Sync hoàn chỉnh
- IndexedDB content store
- Sync queue cho tiến độ/checklist
- Conflict handling
- Offline indicator + retry UX

## Pha 4 (Tuần 7–8): Dashboard lights + hardening
- Tra cứu đèn cảnh báo
- Error tracking + analytics events
- Performance tuning theo budget
- PWA install prompt + app icon/splash

## Pha 5 (Tuần 9–10): Pilot readiness
- Seed nội dung thật từ source 01
- QA trên thiết bị Android/iOS phổ biến
- Fix theo feedback nhóm pilot
- Chốt release candidate

---

## 12) Chi phí vận hành dự kiến (MVP)

1. **Vercel/Netlify**: có thể bắt đầu free.
2. **Supabase**: free tier giai đoạn sớm; nâng cấp khi tăng MAU.
3. **Sentry/Analytics**: free tier ban đầu.
4. **Domain + SSL**: chi phí thấp, bắt buộc để phát hành nghiêm túc.

> Nguyên tắc: chỉ nâng cấp gói khi có chỉ số usage rõ ràng; tránh trả phí trước nhu cầu.

---

## 13) Rủi ro kỹ thuật & phương án giảm thiểu

1. **Offline không ổn định trên một số trình duyệt iOS**
- Giảm thiểu: test sớm trên Safari iOS thật; fallback rõ ràng; giới hạn cache hợp lý.

2. **Drift dữ liệu giữa local và cloud**
- Giảm thiểu: mọi mutation qua sync engine thống nhất; log sync events; có công cụ “force re-sync”.

3. **Bundle phình to do thêm thư viện**
- Giảm thiểu: kiểm soát dependency policy; đo bundle mỗi PR.

4. **Schema content thay đổi gây crash app cũ**
- Giảm thiểu: versioned schema + migration function + backward compatibility 1 phiên bản liền trước.

---

## 14) Định nghĩa “Done” cho mục Tech Stack

Mục 2 được xem là hoàn thành khi đạt đủ:
1. App cài được dạng PWA trên mobile.
2. Vào được tối thiểu 3 chuyên đề ở chế độ offline sau lần tải đầu.
3. User đăng nhập và lưu được tiến độ học trên cloud.
4. Checklist hoạt động local-first, sync lại khi có mạng.
5. TTS đọc mượt cho từng card.
6. Có dashboard theo dõi lỗi + hiệu năng cơ bản.
7. CI/CD tự động từ commit đến preview và production.

---

## 15) Kết luận lựa chọn stack

Để tối ưu đúng use case và tránh over-engineering, stack đề xuất cuối cùng:

- **Frontend:** Vue 3 + Vite + Pinia + Vue Router  
- **Offline/PWA:** vite-plugin-pwa + Service Worker + IndexedDB  
- **Backend/BaaS:** Supabase (Auth + Postgres + Storage)  
- **Hosting:** Vercel (hoặc Netlify tương đương)  
- **Monitoring:** Sentry + Web Vitals + analytics sự kiện học tập

Stack này giữ được 4 giá trị quan trọng nhất: **nhẹ, nhanh, offline tốt, dễ vận hành cho team nhỏ**.