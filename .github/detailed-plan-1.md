# Kế hoạch triển khai chi tiết cho mục **1. Đánh giá & Lựa chọn Nguồn Dữ Liệu**

## 1) Mục tiêu dữ liệu (Data Objectives)

### 1.1 Mục tiêu sản phẩm
Xây dựng hệ dữ liệu nội dung phục vụ ôn luyện lái xe số tự động tại Việt Nam theo tiêu chí:
- **Dễ hiểu trong 30–90 giây** cho mỗi tình huống.
- **Nhẹ, tải nhanh, chạy offline tốt trên mobile**.
- **Đúng thực tế Việt Nam** (hẻm nhỏ, xe máy đông, hầm TTTM, cao tốc, mưa ngập).
- **Có thể cập nhật dần** từ phản hồi học viên và giáo viên.

### 1.2 KPI dữ liệu cho giai đoạn MVP (8–12 tuần)
- Tối thiểu **40–60 “learning cards”** (mỗi card = 1 tình huống + checklist + khẩu quyết).
- Tối thiểu **120 assets SVG** (sơ đồ xe, làn đường, góc lái, điểm mù, biển báo đơn giản).
- **100% card có phiên bản offline** (text + SVG + audio TTS).
- **< 2.5MB dữ liệu tải lần đầu** cho bộ nội dung nền.
- **Tỷ lệ hoàn thành checklist > 55%** cho 3 chuyên đề chính sau 2 tuần dùng thử.

---

## 2) Khung đánh giá nguồn dữ liệu (Decision Framework)

Đánh giá theo thang điểm 1–5 và trọng số:

- **Độ chính xác thực tiễn (30%)**
- **Khả năng offline & hiệu năng (25%)**
- **Chi phí tạo/duy trì (20%)**
- **Tốc độ mở rộng nội dung (15%)**
- **Rủi ro pháp lý/bản quyền (10%)**

### 2.1 Chấm điểm 3 phương án ban đầu

1. **Tự sản xuất video/hình thực tế**
- Chính xác: 5
- Offline/Hiệu năng: 2
- Chi phí: 1
- Mở rộng: 2
- Pháp lý: 4  
**Điểm quy đổi ~ 2.95/5**

2. **Tổng hợp YouTube/TikTok**
- Chính xác: 3 (không đồng đều)
- Offline/Hiệu năng: 1
- Chi phí: 4
- Mở rộng: 4
- Pháp lý: 2  
**Điểm quy đổi ~ 2.55/5**

3. **Đồ họa hóa vector + expert review**
- Chính xác: 4 (nếu có expert duyệt)
- Offline/Hiệu năng: 5
- Chi phí: 4
- Mở rộng: 5
- Pháp lý: 5  
**Điểm quy đổi ~ 4.55/5**

✅ **Kết luận:** Chọn chiến lược lõi **Vector-first + Expert-validated** cho MVP.

---

## 3) Chiến lược nguồn dữ liệu được chọn (Recommended Strategy)

## 3.1 Mô hình kết hợp 3 lớp (Hybrid but Lean)

### Lớp A — **Core Structured Content (bắt buộc, offline-first)**
- Nội dung text chuẩn hóa:
  - Mục tiêu tình huống
  - Điều kiện vào bài
  - Các bước thao tác
  - Lỗi thường gặp
  - Cách thoát lỗi
  - Checklist trước/sau
  - Khẩu quyết dễ nhớ
- Asset đi kèm:
  - SVG top-down
  - Sequence ảnh bước 1-2-3
  - Mốc canh (marker) trên thân xe/gương

### Lớp B — **Expert Validation Layer (bắt buộc)**
- 1–2 giáo viên dạy lái review từng card.
- Mỗi card có metadata:
  - `review_status`: draft/reviewed/approved
  - `reviewer_name`
  - `review_date`
  - `confidence_score` (1–5)
- Chỉ card “approved” mới hiện mặc định cho user mới.

### Lớp C — **Community Feedback Layer (giai đoạn 2)**
- Cho phép học viên gửi:
  - “Bước này khó hiểu”
  - “Tình huống thực tế khác”
  - “Đề xuất khẩu quyết ngắn hơn”
- Feedback không ghi đè nội dung ngay; vào hàng chờ biên tập.

---

## 4) Data Model đề xuất (đủ dùng, không over-engineering)

## 4.1 Thực thể chính
- `topics` — chuyên đề
- `lessons` — bài học trong chuyên đề
- `cards` — đơn vị học nhỏ nhất
- `card_steps` — từng bước thao tác
- `card_assets` — SVG/icon/hình minh họa
- `checklists` — danh sách kiểm tra
- `mnemonics` — khẩu quyết
- `expert_reviews` — bản ghi duyệt chuyên gia
- `user_progress` — tiến độ học
- `user_feedback` — phản hồi người dùng

## 4.2 Schema rút gọn (gợi ý)
- `topics(id, slug, title_vi, sort_order, is_active)`
- `lessons(id, topic_id, title_vi, difficulty, est_minutes, is_active)`
- `cards(id, lesson_id, title_vi, context_vi, objective_vi, risk_level, review_status, version, updated_at)`
- `card_steps(id, card_id, step_no, instruction_vi, cue_type, cue_text, speed_hint, steering_hint)`
- `card_assets(id, card_id, type, url, width, height, size_kb, offline_pack, checksum)`
- `checklists(id, scope, title_vi)`
- `checklist_items(id, checklist_id, item_no, label_vi, critical_level)`
- `mnemonics(id, card_id, text_vi, rhythm_style)`
- `expert_reviews(id, card_id, reviewer, decision, notes, confidence_score, reviewed_at)`
- `user_feedback(id, card_id, user_id, feedback_type, message, created_at)`

---

## 5) Tiêu chuẩn nội dung (Content Standards)

## 5.1 Mẫu chuẩn cho mỗi Card
Mỗi card bắt buộc có:
1. **Tên tình huống ngắn** (≤ 60 ký tự)
2. **Bối cảnh thực tế** (1–2 câu)
3. **Mục tiêu thao tác** (1 câu rõ ràng)
4. **5–8 bước thao tác tối đa**
5. **3 lỗi thường gặp**
6. **1 phương án thoát lỗi**
7. **1 khẩu quyết ≤ 12 từ**
8. **1 checklist áp dụng ngay**
9. **1 sơ đồ SVG chính + 1 sơ đồ biến thể**

## 5.2 Quy tắc ngôn ngữ
- Dùng tiếng Việt đời thường, câu ngắn.
- Mỗi bước bắt đầu bằng **động từ hành động**: “Giảm ga”, “Canh gương”, “Trả lái”.
- Tránh diễn đạt mơ hồ như “vừa vừa”, “từ từ” mà thay bằng mốc:
  - “< 10 km/h”
  - “giữ khoảng cách 1 cánh tay”
  - “đếm 1-2-3 trước khi chuyển làn”

---

## 6) Quy trình sản xuất dữ liệu (Content Pipeline)

## 6.1 Giai đoạn 0 — Chuẩn bị (Tuần 1)
- Chốt taxonomy chuyên đề (4–6 chuyên đề).
- Tạo template card + checklist + review form.
- Chốt guideline SVG (màu, tỷ lệ xe, stroke width, icon set).

## 6.2 Giai đoạn 1 — Thu thập tri thức thô (Tuần 2–3)
- Phỏng vấn giáo viên (record audio note).
- Trích xuất “quy tắc thao tác” thành bullet points.
- Gom nhóm theo tình huống lặp lại (parking/hẻm/cao tốc/ngập).

## 6.3 Giai đoạn 2 — Biên tập chuẩn hóa (Tuần 3–5)
- Chuyển bullet thành card format.
- Viết step-by-step + lỗi + thoát lỗi.
- Gắn tag:
  - `speed_range`
  - `space_constraint`
  - `visibility_level`
  - `stress_level`

## 6.4 Giai đoạn 3 — Đồ họa hóa (Tuần 4–6)
- Thiết kế SVG top-down theo từng card.
- Tách layer để animate nhẹ (xe, bánh, quỹ đạo, điểm mù).
- Tối ưu kích thước:
  - Mục tiêu mỗi SVG < 60KB.
  - SVG animation fallback về ảnh tĩnh nếu máy yếu.

## 6.5 Giai đoạn 4 — Expert review & QA (Tuần 6–7)
- Giáo viên duyệt từng card.
- Checklist QA:
  - logic thao tác đúng?
  - có mâu thuẫn luật giao thông?
  - có khả thi với xe số tự động phổ biến?
- Đánh dấu `approved` hoặc trả về `needs_revision`.

## 6.6 Giai đoạn 5 — Đóng gói offline & phát hành (Tuần 8)
- Build content bundle JSON + SVG.
- Tạo version nội dung: `content_version` (vd: `2026.09.1`).
- App tải delta update (chỉ tải phần thay đổi).

---

## 7) Kế hoạch dữ liệu theo từng chuyên đề (MVP Scope)

## 7.1 Chuyên đề 1: Lùi chuồng, ghép ngang TTTM
- 12–16 cards:
  - vào vị trí, căn thân xe, trả lái, chỉnh khi lệch
  - xử lý dốc hầm, ánh sáng yếu, xe bên cạnh đỗ sát
- 35–45 SVG assets
- 2 checklist:
  - trước khi lùi
  - sau khi đỗ xong

## 7.2 Chuyên đề 2: Đường hẹp, ngõ nhỏ, kẹt xe
- 10–14 cards:
  - tránh xe máy tạt đầu
  - tránh gương xe máy
  - nhường đường trong hẻm một chiều ngược dòng
- 30–40 SVG assets
- 1 bộ khẩu quyết “tiến bám lưng, lùi bám bụng” với biến thể.

## 7.3 Chuyên đề 3: Cao tốc (Long Thành – Dầu Giây, Trung Lương…)
- 10–12 cards:
  - nhập làn, thoát làn, giữ khoảng cách 3 giây
  - vượt xe tải, xử lý xe bám đuôi
  - đọc biển gộp làn, tốc độ thay đổi
- 28–35 SVG assets
- 1 checklist “trước khi lên cao tốc”.

## 7.4 Chuyên đề 4: Đèo dốc & mưa ngập
- 8–10 cards:
  - phanh động cơ
  - xuống dốc dài
  - đi qua điểm ngập an toàn
- 20–28 SVG assets
- 1 checklist khẩn cấp thời tiết xấu.

---

## 8) Quản trị chất lượng dữ liệu (Data Governance)

## 8.1 Versioning
- Mỗi card có `version`.
- Không sửa đè trực tiếp card đã public; tạo bản mới + changelog.

## 8.2 Audit trail
- Lưu:
  - ai sửa
  - sửa mục nào
  - lý do sửa
  - liên kết feedback liên quan

## 8.3 Quality gates trước publish
- Gate 1: Editorial (đúng template)
- Gate 2: Technical (SVG nhẹ, load nhanh)
- Gate 3: Expert (đúng nghiệp vụ lái xe)
- Gate 4: Safety (không hướng dẫn nguy hiểm)

---

## 9) Pháp lý, bản quyền, an toàn

- Chỉ dùng tài sản tự tạo hoặc có giấy phép rõ ràng.
- Không nhúng lại video bên thứ ba trong mode offline.
- Có tuyên bố miễn trừ trách nhiệm:
  - Nội dung nhằm hỗ trợ ôn luyện, không thay thế đào tạo chính quy.
- Mọi khuyến nghị phải ưu tiên luật giao thông Việt Nam và biển báo thực tế.

---

## 10) Kiến trúc dữ liệu tối giản để vận hành

## 10.1 Lưu trữ
- Metadata: Supabase Postgres (hoặc Firebase Firestore nếu team quen hơn).
- Asset SVG: Supabase Storage.
- Offline cache: IndexedDB + Service Worker.

## 10.2 Đồng bộ
- Lần đầu tải `core_content_pack`.
- Các lần sau check `content_version`.
- Nếu có version mới: tải **delta pack** để giảm data mobile.

## 10.3 Tối ưu dung lượng
- SVG nén bằng SVGO trong CI.
- JSON tách theo topic để lazy-load.
- Font hệ thống, hạn chế custom fonts.

---

## 11) Lộ trình thực thi 90 ngày (Data-focused Roadmap)

### Tháng 1
- Hoàn thiện framework dữ liệu + template.
- Hoàn thành 15 card đầu (parking + ngõ hẹp).
- Thiết lập review flow với 1 giáo viên.

### Tháng 2
- Mở rộng lên 35–40 card.
- Hoàn thiện chuyên đề cao tốc.
- Áp dụng tracking: card view, checklist completion, replay TTS.

### Tháng 3
- Đạt 50–60 card approved.
- Bổ sung chuyên đề mưa ngập/đèo dốc.
- Chạy pilot nhóm 30–50 người dùng và tinh chỉnh nội dung theo feedback.

---

## 12) Rủi ro & phương án giảm thiểu

1. **Rủi ro sai lệch chuyên môn**
- Giảm thiểu: bắt buộc expert sign-off trước publish.

2. **Rủi ro nội dung dài, khó học**
- Giảm thiểu: giới hạn card 5–8 bước; có bản “quick mode 30 giây”.

3. **Rủi ro app nặng khi offline**
- Giảm thiểu: vector-first, không video ở MVP, delta update.

4. **Rủi ro thiếu bao phủ tình huống địa phương**
- Giảm thiểu: mở kênh feedback theo khu vực (HCM/HN/tỉnh), ưu tiên backlog theo tần suất.

---

## 13) Tiêu chí thành công của riêng chiến lược dữ liệu

- **Coverage:** ≥ 80% tình huống cơ bản tài xế mới gặp trong 3 tháng đầu.
- **Clarity:** ≥ 85% người dùng đánh giá “dễ hiểu” (4/5 trở lên).
- **Speed:** mở card offline < 1 giây trên mobile tầm trung.
- **Retention:** người dùng quay lại ≥ 3 buổi/tuần trong 4 tuần đầu.
- **Safety confidence:** giảm tỷ lệ phản hồi “không biết xử lý” ở tình huống hẹp/ngập/cao tốc.

---

## 14) Kết luận triển khai

Để phù hợp mục tiêu “đơn giản nhưng hiệu quả”, chiến lược dữ liệu tối ưu là:

- **Không video-first ở MVP**
- **Ưu tiên dữ liệu cấu trúc + SVG nhẹ + checklist + TTS**
- **Bắt buộc duyệt chuyên gia**
- **Offline-first ngay từ đầu**

Cách làm này giảm mạnh chi phí, tăng tốc ra mắt, vẫn giữ độ chính xác thực tế Việt Nam, và tạo nền vững chắc để mở rộng dần sang video thực chiến ở giai đoạn sau.