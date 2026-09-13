# Lái Xe Nhàn

Ứng dụng PWA học kỹ năng lái xe thực tế, ưu tiên mobile và offline-first.

## Chạy local

```bash
npm install
npm run dev
```

Các nội dung MVP nằm trong `src/content.ts` để có thể mở app ngay cả khi chưa cấu hình Supabase. Tiến độ học, checklist và theme được lưu local trong trình duyệt. Khi cần kết nối Supabase, thêm `VITE_SUPABASE_URL` và `VITE_SUPABASE_ANON_KEY` vào `.env.local`; lớp API có thể được bổ sung mà không ảnh hưởng content pack hiện tại.

## Kiểm tra

```bash
npm run build
npm run test
```
