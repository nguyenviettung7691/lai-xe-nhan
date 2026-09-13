Dưới đây là **kế hoạch kỹ thuật triển khai phần nền móng (scaffold)** cho ứng dụng **“Lái Xe Nhàn”**, bám sát toàn bộ context trong Space: ưu tiên **mobile**, **offline-first**, **content-driven**, **stack đơn giản**.

---

## 0) Mục tiêu scaffold (giai đoạn nền móng)

**Kết quả mong muốn sau scaffold:**
1. Có một web app chạy được trên mobile, cài được như app (PWA).
2. Có khung thông tin cho các chuyên đề (cards, bài học, checklist, dashboard lights).
3. Có offline cache cho nội dung tĩnh + data cơ bản.
4. Có khung đăng nhập đơn giản + lưu tiến độ học.
5. Có pipeline deploy tự động.
6. Có cấu trúc code rõ ràng để team dev mở rộng nội dung nhanh.

---

## 1) Đề xuất stack chốt cho scaffold (tối giản)

- **Frontend:** React + Vite + TypeScript  
- **Routing:** React Router  
- **State nhẹ:** Zustand (hoặc Context nếu muốn tối giản hơn nữa)  
- **UI:** TailwindCSS (nhanh dựng mobile UI)  
- **PWA:** `vite-plugin-pwa` (Workbox)  
- **BaaS:** Supabase (Auth + Postgres + RLS + Storage nếu cần)  
- **Hosting:** Vercel  
- **Testing tối thiểu:** Vitest + React Testing Library  
- **Quality:** ESLint + Prettier + Husky + lint-staged  

> Lý do chọn React thay vì Vue ở scaffold: hệ sinh thái PWA và mẫu triển khai phong phú; tuy nhiên toàn bộ kế hoạch có thể chuyển sang Vue 3 tương đương.

---

## 2) Cấu trúc module chức năng (MVP foundation)

### 2.1 Module công khai (không cần đăng nhập)
- Trang chủ (giới thiệu + CTA bắt đầu học)
- Danh sách chuyên đề:
  - Lùi chuồng/ghép ngang
  - Đường hẹp/ngõ nhỏ
  - Cao tốc
  - Đèo dốc & mưa ngập
- Trang chi tiết bài học (text + SVG + khẩu quyết + step-by-step)
- Tra cứu đèn cảnh báo táp-lô
- Chế độ đọc to (Web Speech API)

### 2.2 Module tài khoản (đăng nhập)
- Đăng nhập Email OTP hoặc Google (Supabase Auth)
- Đồng bộ:
  - tiến độ bài học đã xem
  - checklist đã tick
  - bookmark bài học

### 2.3 Module offline-first
- Cache shell app + trang chính + asset SVG
- Cache data lessons (chiến lược stale-while-revalidate)
- Fallback UI khi mất mạng
- Versioning cache để invalidate khi release mới

---

## 3) Kiến trúc dữ liệu nền móng

## 3.1 Nguồn dữ liệu (theo Space)
**Phương án khả thi nhất:**  
- Nội dung đồ họa vector + checklist text  
- Chuẩn hóa cùng chuyên gia dạy lái (quy trình review content)

## 3.2 Thiết kế schema ban đầu (Supabase/Postgres)

### Bảng nội dung
- `topics`
  - `id`, `slug`, `title`, `description`, `order_index`, `is_published`
- `lessons`
  - `id`, `topic_id`, `slug`, `title`, `summary`, `difficulty`, `estimated_minutes`, `content_json`, `svg_url`, `order_index`, `is_published`
- `checklists`
  - `id`, `lesson_id`, `title`, `items_json`
- `dashboard_lights`
  - `id`, `code`, `name_vi`, `severity` (info/warn/critical), `description`, `action_steps_json`, `icon_svg_url`

### Bảng người dùng/progress
- `user_lesson_progress`
  - `user_id`, `lesson_id`, `status` (not_started/in_progress/done), `updated_at`
- `user_checklist_state`
  - `user_id`, `checklist_id`, `checked_items_json`, `updated_at`
- `user_bookmarks`
  - `user_id`, `lesson_id`, `created_at`

### RLS
- Public read cho content published
- User chỉ đọc/ghi record của chính mình cho progress/checklist/bookmark

---

## 4) Cấu trúc thư mục code scaffold

```txt
lai-xe-nhan/
  src/
    app/
      router/
      providers/
    features/
      topics/
      lessons/
      checklist/
      dashboard-lights/
      auth/
      progress/
      tts/
    components/
      ui/
      layout/
      cards/
    services/
      supabase/
      pwa/
      speech/
      analytics/
    hooks/
    store/
    styles/
    assets/
      icons/
      svg-lessons/
    content-seed/
      topics.json
      lessons.json
      dashboard-lights.json
  public/
    manifest.webmanifest
    icons/
  supabase/
    migrations/
    seed.sql
  scripts/
    import-content.ts
  .github/workflows/
    ci.yml
```

---

## 5) Danh sách đầu việc chi tiết cho dev (theo phase)

## Phase 1 — Project bootstrap (2–3 ngày)

1. **Khởi tạo repo + Vite React TS**
2. **Cài base dependencies**
   - react-router-dom, zustand, tailwindcss, vite-plugin-pwa, @supabase/supabase-js
3. **Thiết lập chuẩn code**
   - ESLint/Prettier/Husky/lint-staged
4. **Dựng App shell**
   - header bottom-nav mobile-first
   - route placeholders
5. **Thiết lập env**
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

**Deliverable:** chạy local ổn, có layout khung, lint/test pass.

---

## Phase 2 — PWA offline foundation (2 ngày)

1. Cấu hình `vite-plugin-pwa`
   - manifest (name: **Lái Xe Nhàn**)
   - app icons
   - display standalone
2. Workbox runtime caching:
   - HTML/CSS/JS assets
   - SVG lessons
   - API content endpoints (stale-while-revalidate)
3. Trang offline fallback
4. Kiểm thử mobile add-to-home-screen

**Deliverable:** app cài được trên mobile, mở lại khi offline vẫn xem được nội dung đã cache.

---

## Phase 3 — Data model & Supabase setup (2–3 ngày)

1. Tạo project Supabase
2. Viết migration tạo các bảng mục 3.2
3. Thiết lập RLS policies
4. Seed dữ liệu mẫu cho 4 chuyên đề + 8–12 bài học mẫu
5. Viết `services/supabase` + typed client

**Deliverable:** API đọc content + ghi tiến độ user hoạt động.

---

## Phase 4 — Feature scaffold (4–5 ngày)

1. **Topics list page** (cards chuyên đề)
2. **Lessons list + detail**
   - Render content_json
   - Hiển thị SVG minh họa
   - Step-by-step khẩu quyết
3. **Checklist interactive**
   - Tick/untick từng mục
   - Lưu local trước, sync server sau (optimistic)
4. **Dashboard lights quick lookup**
   - Grid icon
   - Filter theo severity

**Deliverable:** user đi full flow học từ chuyên đề -> bài -> checklist.

---

## Phase 5 — Auth + progress sync (2–3 ngày)

1. Supabase Auth (Email OTP/Google)
2. Route guard cho dữ liệu cá nhân
3. Đồng bộ tiến độ:
   - đánh dấu đã học
   - resume nơi học dở
4. Conflict strategy local/offline -> online sync

**Deliverable:** đăng nhập và giữ tiến độ liên thiết bị cơ bản.

---

## Phase 6 — TTS + UX tối ưu lái xe (2 ngày)

1. Tích hợp Web Speech API
   - play/pause/next-step
   - tốc độ đọc chậm/vừa
2. Night mode mặc định + high contrast
3. Cỡ chữ lớn, button thao tác một chạm
4. Giảm distraction (ẩn chi tiết không cần thiết khi “chế độ thực hành”)

**Deliverable:** trải nghiệm dùng nhanh khi đang trong bối cảnh luyện lái.

---

## Phase 7 — CI/CD + observability nhẹ (1–2 ngày)

1. GitHub Actions:
   - lint + test + build
2. Deploy Vercel preview/prod
3. Error monitoring nhẹ (Sentry optional)
4. Analytics sự kiện cơ bản:
   - lesson_open
   - checklist_complete
   - tts_play

**Deliverable:** có pipeline release ổn định.

---

## 6) Backlog kỹ thuật mở rộng (sau scaffold)

1. Content CMS nội bộ cho giáo viên (role editor)
2. Bộ câu hỏi tình huống tương tác (scenario quiz)
3. “Lộ trình luyện 7 ngày”
4. Geofenced recommendations (gợi ý chuyên đề gần bối cảnh)
5. Tải gói nội dung offline theo chuyên đề (download pack)

---

## 7) Tiêu chí hoàn thành scaffold (Definition of Done)

- [ ] Lighthouse mobile >= 85 (Performance/Best Practices/PWA)
- [ ] PWA cài được trên Android/iOS (mức web app)
- [ ] Có ít nhất 4 chuyên đề + dữ liệu mẫu hiển thị đầy đủ
- [ ] Checklist lưu được offline và sync khi online
- [ ] Auth + progress hoạt động với Supabase
- [ ] CI/CD tự động chạy qua main branch
- [ ] Có README dev setup + tài liệu content format JSON

---

## 8) Phân công đầu việc theo vai trò

### FE Dev
- App shell, routing, UI components, PWA, TTS, checklist UX

### BE/BaaS Dev
- Supabase schema, migration, RLS, seed, sync logic

### Content Engineer
- Chuẩn hóa `content_json`, SVG guideline, import pipeline

### QA (part-time)
- Test mobile webview, offline, sync edge cases, auth flows

---

## 9) Rủi ro & cách giảm thiểu

1. **Nội dung thiếu chuẩn thực tế**
   - Có checklist review theo giáo viên trước khi publish
2. **Offline sync lỗi trạng thái**
   - Áp dụng “local-first + timestamp conflict resolution”
3. **PWA iOS hạn chế cache**
   - Ưu tiên cache content quan trọng + fallback nhẹ
4. **Scope creep**
   - Giữ đúng MVP: content + checklist + tra cứu + TTS

---

Nếu bạn muốn, bước tiếp theo mình có thể tạo luôn:
1) **Roadmap 4 tuần dạng sprint** (task-level, estimate theo giờ), và  
2) **Bộ issue template GitHub** để team bắt tay làm ngay.