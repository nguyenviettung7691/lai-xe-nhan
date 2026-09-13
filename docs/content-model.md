# Mô hình nội dung (Phase 1 — Nguồn dữ liệu)

Tài liệu này mô tả lớp dữ liệu nội dung của **Lái Xe Nhàn** sau khi triển khai giai đoạn 1
trong `.github/detailed-plan-1.md`: chiến lược *vector-first + expert-validated*, hoạt động
hoàn toàn offline và có hàng rào chất lượng tự động.

## 1. Kiến trúc ba lớp

| Lớp | Vai trò | Vị trí trong mã nguồn |
| --- | --- | --- |
| A. Nội dung gốc | Thẻ học, checklist, đèn cảnh báo do đội biên tập viết | `src/content/cards/*.ts`, `src/content/checklists.ts`, `src/content/lights.ts` |
| B. Thẩm định chuyên môn | Hồ sơ duyệt của giáo viên/chuyên viên an toàn | `src/content/reviews.ts` |
| C. Tài sản hình ảnh | Sơ đồ SVG tự tạo + metadata (checksum, dung lượng) | `scripts/generate-assets.mjs`, `public/content/svg/`, `src/content/asset-manifest.json` |

Toàn bộ dữ liệu được biên dịch vào bundle nên ứng dụng chạy được khi không có mạng.
`vite.config.ts` đưa `content/svg/*.svg` vào precache của service worker.

## 2. Cấu trúc dữ liệu

```
Topic (chuyên đề)
└── Lesson (bài học, nhóm tình huống)
    └── Card (thẻ học — đơn vị nhỏ nhất người dùng mở)
        ├── steps[]        5–8 bước, mỗi bước có mốc canh (cue)
        ├── mistakes[3]    đúng 3 lỗi thường gặp
        ├── recovery       cách chữa khi thao tác sai
        ├── safety         cảnh báo an toàn
        ├── mnemonic       khẩu quyết ≤ 12 từ
        ├── checklistId    checklist liên quan
        ├── assetIds[2]    1 sơ đồ chính + 1 sơ đồ biến thể
        └── reviewStatus   draft | in_review | needs_revision | approved
```

Kiểu dữ liệu đầy đủ nằm trong `src/types.ts`. Thẻ được tạo qua `defineCard()`
(`src/content/define.ts`) để tự sinh id bước (`<cardId>-s1`), id khẩu quyết (`<cardId>-mn`)
và id asset (`<cardId>-main`, `<cardId>-var`).

### Quy mô hiện tại

- 4 chuyên đề, 8 bài học, 23 thẻ (21 thẻ đã duyệt, 1 nháp, 1 cần sửa).
- 46 sơ đồ SVG tự tạo, tổng ~118 KB.
- 5 checklist theo ngữ cảnh, 8 đèn cảnh báo táp-lô.

## 3. Chỉ nội dung đã duyệt được phát hành

`src/content/index.ts` xuất ra hai nhánh dữ liệu:

- `topics` / `publishedCards` — **chỉ** thẻ có `reviewStatus === 'approved'`; đây là dữ liệu
  mà giao diện sử dụng. `getCardById()` cũng chỉ tìm trong nhánh này.
- `allTopics` / `allCards` — toàn bộ nội dung kể cả bản nháp, dùng cho khâu biên tập và kiểm thử.

Ví dụ trong bản seed: `parking-column` đang ở trạng thái `draft` và `highway-tailgater` ở
trạng thái `needs_revision` nên cả hai không xuất hiện trong ứng dụng.

## 4. Hàng rào chất lượng

`src/content/validation.ts` cài đặt bốn cổng, chạy tự động trong `npm run test` và in cảnh báo
ở chế độ `npm run dev`:

1. **Biên tập** — tiêu đề ≤ 60 ký tự, bối cảnh 1–2 câu, mục tiêu 1 câu, 5–8 bước đánh số liên tục,
   đúng 3 lỗi thường gặp, khẩu quyết ≤ 12 từ, mỗi bước bắt đầu bằng động từ hành động, không dùng
   diễn đạt mơ hồ, phiên bản đúng dạng semver và có nhật ký thay đổi.
2. **Kỹ thuật** — mỗi thẻ có đủ sơ đồ chính/biến thể, asset nằm trong `/content/svg/`, checksum
   `sha256-…`, mỗi tệp ≤ 60 KB, gói offline lõi ≤ 2560 KB, manifest cùng phiên bản với nội dung.
3. **Chuyên gia** — thẻ `approved` bắt buộc có hồ sơ duyệt với `decision = approved` và điểm tin cậy ≥ 4;
   nếu thẻ được sửa sau ngày duyệt thì sinh lỗi chặn phát hành, phải duyệt lại.
4. **An toàn** — mọi thẻ phải có ghi chú an toàn và cách chữa cháy; quét mẫu câu khuyến khích hành vi
   nguy hiểm trong phần *hướng dẫn* (bước, cách chữa, cảnh báo). Phần “lỗi thường gặp” được miễn trừ
   vì bản chất là mô tả hành vi sai.

## 5. Quy trình tạo sơ đồ

```bash
npm run content:assets
```

Lệnh trên chạy `scripts/generate-assets.mjs`, xóa và dựng lại toàn bộ `public/content/svg/`
từ mô tả khai báo (template `bay`, `parallel`, `alley`, `highway`, `slope`, `flood`), sau đó ghi
`src/content/asset-manifest.json` với `sizeKb`, `checksum`, `caption`, `alt`, `offlinePack`.

Mọi hình đều là **tài sản tự tạo** cho dự án: không dùng ảnh, icon hay sơ đồ của bên thứ ba, nhờ vậy
tránh rủi ro bản quyền và giữ dung lượng nhỏ để tải offline. Test `src/content/assets.test.ts` đối chiếu
checksum và dung lượng giữa manifest với tệp thật trên đĩa.

## 6. Phiên bản và nhật ký

- `src/content/version.ts` giữ `CONTENT_VERSION` (dạng `YYYY.MM.patch`) và danh sách `contentReleases`.
- Mỗi thẻ có `version` (semver) + `changelog` riêng, hiển thị ở chân trang bài học.
- Khi sửa nội dung: tăng `version` của thẻ, thêm mục changelog, cập nhật `updatedAt`, và nếu thay đổi
  ảnh hưởng kỹ thuật lái thì đặt lại `reviewStatus` để chờ duyệt.
- Khi đổi `CONTENT_VERSION`, chạy lại `npm run content:assets` để manifest khớp phiên bản.

## 7. Thẩm định chuyên môn

Hồ sơ trong `src/content/reviews.ts` gồm người duyệt, chứng chỉ, quyết định, ghi chú, điểm tin cậy
và ngày duyệt. **Lưu ý:** dữ liệu người duyệt trong bản seed là *hồ sơ minh họa* dùng để kiểm thử quy trình;
trước khi phát hành công khai phải thay bằng thông tin thẩm định viên có thật.

## 8. Pháp lý và an toàn

`src/content/disclaimer.ts` chứa tuyên bố miễn trừ (bản ngắn hiển thị ở chân bài học và checklist,
bản đầy đủ dành cho trang giới thiệu). Nguyên tắc: nội dung hỗ trợ ôn luyện, **không thay thế** đào tạo
lái xe chính quy; khi có khác biệt, luật giao thông đường bộ Việt Nam và hướng dẫn của nhà sản xuất
xe được ưu tiên.

## 9. Thêm một thẻ mới

1. Thêm mục vào `specs` trong `scripts/generate-assets.mjs` rồi chạy `npm run content:assets`.
2. Viết thẻ bằng `defineCard()` trong `src/content/cards/<chuyên đề>.ts`.
3. Nếu là bài học mới, khai báo trong `lessonMeta` của `src/content/topics.ts`.
4. Thêm hồ sơ duyệt vào `src/content/reviews.ts` và đặt `reviewStatus: 'approved'` khi đã được duyệt.
5. Chạy `npm run test`, `npm run lint`, `npm run build`.

## 10. Chuyên đề thực hành (Phase 3): quick check, ôn tập ngắt quãng, lộ trình học

Theo `.github/detailed-plan-3.md`, mỗi thẻ có thêm bộ **tự kiểm nhanh** (`quickCheck`) và ứng
dụng cung cấp lịch **ôn tập ngắt quãng**, **lộ trình học theo kinh nghiệm**, và ba **chế độ hiển thị**.

### 10.1 Quick check trên mỗi thẻ

```
Card
└── quickCheck[3]   đúng 3 câu tự kiểm (QuickCheckQuestion)
    ├── prompt         câu hỏi ngắn
    ├── options[]      2–4 phương án
    ├── correctIndex   chỉ số đáp án đúng
    └── isStopCondition  đánh dấu câu về điều kiện dừng bắt buộc
```

- Sinh id qua `defineCard()`: `<cardId>-qc1/qc2/qc3`.
- Cổng **biên tập** (`validation.ts`) buộc đúng 3 câu, ≥2 phương án, `correctIndex` hợp lệ.
- Cổng **an toàn** buộc mọi thẻ `risk: 'high'` có ít nhất một câu `isStopCondition: true`.
- Ngưỡng đạt: trả lời đúng ≥ 70% (`QUICK_CHECK_PASS_THRESHOLD` trong
  `src/services/spaced-repetition/index.ts`).
- UI: `src/features/learning-cards/QuickCheckPanel.vue`, hiển thị ở cuối `LessonView.vue`.

### 10.2 Ôn tập ngắt quãng (spaced repetition)

`src/services/spaced-repetition/index.ts` là logic thuần, không phụ thuộc UI:

- 4 giai đoạn (`ReviewStage` 0–3), tương ứng chu kỳ ôn **1 → 3 → 7 → 14 ngày**
  (`REVIEW_INTERVALS_DAYS`).
- Trả lời đạt quick check → tăng giai đoạn (tối đa 3); trả lời không đạt → quay về giai đoạn 0.
- `scheduleNextReview()` tính lịch tiếp theo; `dueEntries()` lọc và sắp xếp thẻ đến hạn.
- Store (`src/stores/app.ts`) giữ `reviewSchedule: Record<cardId, ReviewScheduleEntry>`
  (persist ở `localStorage`, khoá `lxn-review-schedule`) và action `recordQuickCheck()`.
- Giao diện `src/views/ReviewView.vue` (route `/review`) liệt kê thẻ đến hạn; huy hiệu số ở
  mục "Ôn tập" trên thanh điều hướng dưới hiển thị số thẻ đến hạn.

### 10.3 Lộ trình học theo kinh nghiệm

`src/content/learning-paths.ts` khai báo 3 `LearningPath` (mới lái, đã đi phố cơ bản, đã chạy
thường xuyên) với thứ tự chuyên đề khuyến nghị. Người dùng chọn lộ trình ở
`src/views/LearningPathView.vue` (route `/learning-path`, truy cập từ trang danh sách chuyên đề);
lựa chọn lưu ở store (`experienceLevel`, khoá `lxn-experience-level`).

### 10.4 Chế độ hiển thị bài học

`DisplayMode` gồm `learn` (đầy đủ), `quick` (ẩn lỗi thường gặp/cách chữa/sơ đồ biến thể để ôn
nhanh) và `handsfree` (tự động đọc to toàn bộ kịch bản khi mở thẻ). Lưu ở store (`displayMode`,
khoá `lxn-display-mode`); chuyển đổi bằng nhóm nút ở đầu `LessonView.vue`.

### 10.5 Mức độ đạt bài học ("đạt module")

`getLessonMastery()` trong `src/content/index.ts` tính mức đạt của một bài học: cần **≥ 80%** thẻ
đã đánh dấu hoàn thành **và** **≥ 70%** thẻ có lần quick check gần nhất đạt. `TopicView.vue`
hiển thị huy hiệu "🏅 Đạt module" khi đạt cả hai tiêu chí.

