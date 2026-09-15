# 🚗 Lái Xe Nhàn

> Ứng dụng PWA học kỹ năng lái xe thực tế với 23 thẻ học, hỗ trợ offline-first, đọc to giọng nói, chế độ ban đêm và khẩu quyết an toàn cho lái xe.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-18%2B-brightgreen)](https://nodejs.org/)
[![Vue.js Version](https://img.shields.io/badge/Vue.js-3.4%2B-brightgreen)](https://vuejs.org/)

---

## 🎯 Tính năng chính

### 📚 Nội dung học tập
- **23 thẻ học** được cấu trúc với bối cảnh, mục tiêu, 5-8 bước có mốc canh, 3 lỗi thường gặp, cách chữa, cảnh báo an toàn và khẩu quyết
- **Checklist tương tác** với tiến độ trực quan, lịch sử hoàn tất và haptic feedback
- **Tra cứu 24 loại đèn cảnh báo** với 3 bước xử lý ngay, biện pháp phòng tránh và mốc gọi cứu hộ
- Tất cả nội dung được **duyệt chuyên môn** với hồ sơ thẩm định rõ ràng

### 📱 Offline-First & PWA
- **Hoạt động hoàn toàn offline** mà không cần cấu hình Supabase
- Tiến độ học, checklist, chủ đề được lưu trữ cục bộ trong trình duyệt
- Tự động đồng bộ với cloud khi kết nối mạng (khi có tài khoản)
- Có thể cài đặt trên màn hình chính như ứng dụng native

### 🎤 Đọc to (Text-to-Speech)
- Đọc cả thẻ hoặc từng bước riêng biệt với khoảng nghỉ 0,7 giây
- Điều khiển: play/pause/stop, bước trước/bước sau, tốc độ 0.9x / 1.0x / 1.1x
- Tự động chuyển sang **chế độ chữ to** nếu thiết bị không có giọng đọc tiếng Việt
- Chế độ "Rảnh tay" tối ưu hóa cho lái xe: phóng to nút điều khiển, ẩn nội dung phụ

### 🌓 Giao diện thân thiện
- **Chế độ tối + sáng** mặc định theo giao diện hệ thống, cho phép ép thủ công
- **Tương phản cao** (High Contrast mode) đạt chuẩn WCAG AA trên tất cả các kết hợp
- Thiết kế mobile-first, tối ưu cho sử dụng một tay

### 📊 Đo đạc & Phân tích
- Ghi nhận sự kiện học tập (checklist, TTS, tra cứu đèn, thay đổi chủ đề)
- Đo đạc Web Vitals (LCP, CLS, FCP)
- Dữ liệu giữ lại khi offline, gửi lại khi online

---

## 🚀 Bắt đầu nhanh

### Cài đặt

```bash
# Clone repository
git clone https://github.com/nguyenviettung7691/lai-xe-nhan.git
cd lai-xe-nhan

# Cài đặt dependencies
npm install

# Chạy dev server
npm run dev
```

Mở trình duyệt tại `http://localhost:5173`. Ứng dụng hoạt động ngay lập tức mà không cần cấu hình.

### Kết nối Supabase (tùy chọn)

Khi cấu hình Supabase, bạn có thể:
- Đăng nhập bằng Email OTP (magic link) hoặc OAuth (Google, Apple)
- Đồng bộ tiến độ học và trạng thái checklist giữa các thiết bị
- Ghi nhận nhật ký đồng bộ và phản hồi người dùng lên cloud

> 💡 **Lưu ý**: Ứng dụng hoạt động 100% offline ngay cả khi bỏ qua toàn bộ phần này.

#### Bước 1 — Tạo project Supabase

1. Đăng nhập [supabase.com](https://supabase.com) và bấm **New project**.
2. Chọn tên project, mật khẩu database và khu vực (nên chọn Singapore để có độ trễ thấp từ Việt Nam).
3. Chờ project khởi tạo xong (khoảng 1–2 phút).

#### Bước 2 — Áp dụng schema database

Repo đã có sẵn migration và seed data tại `supabase/migrations/` và `supabase/seed.sql`. Có hai cách áp dụng:

**Cách A — Dùng Supabase CLI (khuyến nghị)**

```bash
# Cài Supabase CLI nếu chưa có
npm install -g supabase

# Đăng nhập và liên kết project
supabase login
supabase link --project-ref your-project-ref

# Áp dụng migration + seed data
supabase db push
```

**Cách B — Copy/paste thủ công trên Dashboard**

1. Vào **SQL Editor** trên Supabase Dashboard.
2. Copy toàn bộ nội dung [`supabase/migrations/20260913000000_init_schema.sql`](supabase/migrations/20260913000000_init_schema.sql) và chạy.
3. (Tùy chọn) Copy nội dung [`supabase/seed.sql`](supabase/seed.sql) và chạy để có dữ liệu mẫu.

Migration này tạo các bảng: `content_metadata` (đọc công khai), `user_progress`, `user_checklists`, `sync_audit_logs`, `user_feedback` (chỉ chủ sở hữu truy cập được nhờ **Row Level Security**).

#### Bước 3 — Bật phương thức đăng nhập

Trong Dashboard, vào **Authentication → Providers**:

- **Email OTP**: bật **Email** provider, giữ **Confirm email** theo nhu cầu. Ứng dụng dùng magic link nên không cần cấu hình SMTP riêng để test (Supabase cung cấp email miễn phí giới hạn cho môi trường dev).
- **Google / Apple (tùy chọn)**: bật provider tương ứng và điền `Client ID` / `Client Secret` theo hướng dẫn của Supabase cho từng nhà cung cấp.

Vào **Authentication → URL Configuration** và thêm:
- **Site URL**: `http://localhost:5173` (dev) và domain thật khi deploy.
- **Redirect URLs**: thêm cả hai URL trên để magic link/OAuth callback hoạt động đúng.

#### Bước 4 — Lấy API keys

Vào **Project Settings → API**, lấy:
- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`

#### Bước 5 — Cấu hình biến môi trường local

Sao chép `.env.example` thành `.env.local` rồi điền giá trị vừa lấy:

```bash
cp .env.example .env.local
```

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Khởi động lại `npm run dev` để Vite nạp biến môi trường mới. Mở nút đồng bộ (biểu tượng trạng thái trên header) để đăng nhập thử.

> ⚠️ Không commit `.env.local` lên git — file này đã nằm trong `.gitignore`. Chỉ dùng **anon public key**, tuyệt đối không đưa **service role key** vào mã nguồn frontend.

---

## 🌐 Deploy lên GitHub Pages

Repository đã có workflow `.github/workflows/deploy-pages.yml` để build và deploy tự động khi push lên nhánh `main`.

### 1) Bật GitHub Pages

Vào **Settings → Pages** và đặt **Source = GitHub Actions**.

### 2) Push code lên `main`

Workflow sẽ:
- Cài dependencies bằng `npm ci`
- Build bằng `npm run build` với `VITE_BASE_PATH=/lai-xe-nhan/`
- Deploy thư mục `dist` lên GitHub Pages

### 3) Truy cập trang

URL mặc định:

```
https://nguyenviettung7691.github.io/lai-xe-nhan/
```

> ⚠️ Nếu bạn fork repository với tên khác, hãy đổi `VITE_BASE_PATH` trong workflow thành `/<ten-repo>/`.

---

## 📂 Cấu trúc dữ liệu

### Mô hình nội dung

```
Chuyên đề → Bài học → Thẻ học
```

### Các tệp nội dung chính

| Tệp | Mô tả |
|-----|-------|
| `src/content/cards/*.ts` | 23 thẻ học với cấu trúc: bối cảnh, mục tiêu, bước thao tác, lỗi thường gặp, cảnh báo, khẩu quyết |
| `src/content/reviews.ts` | Hồ sơ duyệt chuyên môn - chỉ thẻ `approved` mới hiển thị |
| `src/content/checklists.ts` | Checklist theo ngữ cảnh (khởi động, quanh xe, lái xe, dừng/đỗ) |
| `src/content/lights.ts` | 24 loại đèn cảnh báo với xử lý và cách khắc phục |
| `src/content/validation.ts` | Hàng rào chất lượng: biên tập, kỹ thuật, chuyên gia, an toàn |
| `src/content/version.ts` | Phiên bản nội dung và metadata |

### Tạo tài sản SVG

Sơ đồ vector được tạo tự động từ các script:

```bash
npm run content:assets
```

Tất cả sơ đồ là tài sản tự tạo, không sử dụng hình ảnh bên thứ ba.

### Chi tiết thêm

Xem [`docs/content-model.md`](docs/content-model.md) để biết:
- Mô hình dữ liệu chi tiết
- Quy trình duyệt chuyên môn
- Hướng dẫn thêm thẻ học mới

> ⚠️ **Lưu ý dữ liệu test**: Dữ liệu người duyệt trong bản seed là hồ sơ minh họa. Cần thay bằng thẩm định viên thật trước khi phát hành công khai.

---

## 🏗️ Kiến trúc & Tech Stack

### Core Stack

| Công nghệ | Mục đích |
|-----------|---------|
| **Vue 3** (Composition API) | UI framework |
| **Vite** | Build tool & dev server |
| **Pinia** | State management |
| **Vue Router** | Routing & code splitting |
| **TypeScript** | Type safety |

### Offline & PWA

| Công nghệ | Mục đích |
|-----------|---------|
| **Vite PWA Plugin** | Service Worker & manifest |
| **Workbox** | Caching strategy |
| **IndexedDB** (`idb`) | Lưu trữ gói nội dung & hàng đợi đồng bộ |
| **SyncEngine** | Quản lý đồng bộ offline |

### Data & Validation

| Công nghệ | Mục đích |
|-----------|---------|
| **Zod** | Schema validation (`src/lib/schema/`) |
| **Supabase** | BaaS: Postgres + RLS + Auth + Storage |

### Tính năng đặc biệt

| Công nghệ | Mục đích |
|-----------|---------|
| **Web Speech API** | Đọc to (TTS) |
| **Web Vitals** | Đo đạc hiệu suất (LCP, CLS, FCP) |
| **Haptic API** | Phản hồi xúc cảm trên mobile |

---

## 📋 Scripts Có sẵn

```bash
# Development
npm run dev              # Start dev server
npm run preview          # Preview production build

# Build & Analysis
npm run build            # Production build
npm run build:analyze    # Build size analysis

# Quality Checks
npm run test             # Run unit tests
npm run lint             # Run ESLint
npm run type-check       # TypeScript type checking

# Content
npm run content:assets   # Generate SVG assets
```

---

## 🧪 Kiểm tra chất lượng

Chạy toàn bộ test suite:

```bash
npm run test
npm run lint
npm run build
```

Validation tự động chạy khi `npm run dev` và sẽ cảnh báo nếu:
- Thẻ học có lỗi cấu trúc
- Checklist không khớp định nghĩa
- Dữ liệu đèn cảnh báo không hoàn chỉnh
- Hồ sơ duyệt không chính xác

---

## 📚 Tài liệu

- [`docs/content-model.md`](docs/content-model.md) — Mô hình dữ liệu & quy trình duyệt
- [Supabase Migrations](supabase/migrations/) — Schema database
- [Zod Schemas](src/lib/schema/) — Data validation rules

---

## 🔒 Miễn trừ trách nhiệm

**Nội dung hỗ trợ ôn luyện kỹ năng lái xe, không thay thế đào tạo lái xe chính quy.**

Khi có khác biệt, hãy tuân theo:
1. Luật giao thông đường bộ Việt Nam
2. Hướng dẫn của nhà sản xuất xe
3. Đào tạo lái xe chính quy từ trung tâm cấp phép

---

## 📝 Giấy phép

MIT License — Xem [`LICENSE`](LICENSE) để biết chi tiết.

---

## 🤝 Đóng góp

Chúng tôi hoan nghênh các đóng góp! Vui lòng:

1. Fork repository
2. Tạo branch tính năng (`git checkout -b feature/amazing-feature`)
3. Commit thay đổi (`git commit -m 'Add amazing feature'`)
4. Push đến branch (`git push origin feature/amazing-feature`)
5. Mở Pull Request

---

## 📧 Liên hệ & Hỗ trợ

- **Issues**: Báo cáo lỗi hoặc yêu cầu tính năng tại [GitHub Issues](https://github.com/nguyenviettung7691/lai-xe-nhan/issues)
- **Discussions**: Thảo luận ý tưởng tại [GitHub Discussions](https://github.com/nguyenviettung7691/lai-xe-nhan/discussions)

---

<div align="center">

**Học lái xe thông minh, an toàn hơn! 🎯**

Được tạo ra với ❤️ cho cộng đồng

</div>
