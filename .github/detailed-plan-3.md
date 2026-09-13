# Kế hoạch mở rộng chi tiết cho mục **3. Cấu trúc Chuyên đề Thực hành (Thiết kế Bite-sized)**

## 1) Mục tiêu thiết kế nội dung Bite-sized

Mục tiêu của cấu trúc chuyên đề là biến các kỹ năng lái xe “khó nhớ khi áp lực cao” thành các đơn vị học cực nhỏ, có thể:
- Học nhanh trong **1–3 phút/card**.
- Ôn cực nhanh trong **30–45 giây/card** trước khi vào tình huống thực tế.
- Áp dụng ngay trong môi trường Việt Nam (hầm xe, ngõ nhỏ, cao tốc, mưa ngập, đèo dốc).
- Dễ dùng trên mobile, một tay thao tác, kể cả khi mạng yếu/offline.

---

## 2) Nguyên tắc sư phạm cho nội dung lái xe

## 2.1 Nguyên tắc “ít nhưng trúng”
Mỗi card chỉ tập trung **1 mục tiêu kỹ năng**:
- Ví dụ đúng: “Canh điểm đánh lái khi lùi ghép ngang”.
- Ví dụ chưa đúng: “Toàn bộ quy trình lùi xe trong mọi trường hợp”.

## 2.2 Nguyên tắc “3 lớp nhớ”
Mỗi card luôn có 3 lớp:
1. **Nhìn nhanh**: hình/SVG + khẩu quyết 1 dòng.
2. **Làm đúng**: 5–8 bước thao tác.
3. **Thoát lỗi**: nếu làm sai thì cứu như thế nào.

## 2.3 Nguyên tắc “thao tác hóa”
Câu chữ bắt buộc gắn với hành động cụ thể:
- “Đạp phanh giữ xe đứng yên 1 nhịp”
- “Trả lái nửa vòng”
- “Giữ tốc độ creep < 10 km/h”

## 2.4 Nguyên tắc “an toàn trước tiên”
Mỗi card phải có:
- Cảnh báo rủi ro chính
- Điều kiện dừng thao tác
- Phương án an toàn thay thế

---

## 3) Khung phân rã nội dung (Topic → Module → Lesson → Card)

## 3.1 Cấp độ cấu trúc
1. **Topic (Chuyên đề)**  
   Nhóm kỹ năng lớn theo bối cảnh thực tế.
2. **Module (Cụm kỹ năng)**  
   Nhóm các bài có cùng mục tiêu vi mô.
3. **Lesson (Bài học)**  
   Một chuỗi thao tác hoàn chỉnh cho 1 tình huống.
4. **Card (Đơn vị bite-sized nhỏ nhất)**  
   1 điểm thao tác cần nhớ + minh họa + checklist nhỏ.

## 3.2 Thời lượng khuyến nghị
- Topic: 30–90 phút tổng ôn luyện (chia nhiều phiên).
- Module: 8–15 phút.
- Lesson: 4–8 phút.
- Card: 1–3 phút (quick review: 30–45 giây).

---

## 4) Chuẩn dữ liệu cho 1 Card Bite-sized

Mỗi card phải có đầy đủ các trường:

1. `card_title` (≤ 60 ký tự, rõ hành động)
2. `scenario_context` (bối cảnh 1–2 câu)
3. `goal` (mục tiêu đo được)
4. `pre_conditions` (điều kiện trước khi thực hiện)
5. `steps` (5–8 bước tối đa)
6. `common_mistakes` (3 lỗi phổ biến)
7. `recovery` (cách thoát lỗi nhanh)
8. `mnemonic` (khẩu quyết ≤ 12 từ)
9. `safety_notes` (cảnh báo bắt buộc)
10. `svg_main` + `svg_variant`
11. `quick_check` (3 câu tự kiểm)
12. `est_time` (thời gian học)
13. `difficulty` (1–5)
14. `stress_level` (thấp/vừa/cao)
15. `tags` (để lọc và gợi ý)

---

## 5) Mẫu hiển thị card trên mobile (UI content contract)

## 5.1 Trình tự hiển thị đề xuất
1. Header: tên card + độ khó + thời gian.
2. Khẩu quyết nổi bật (1 dòng lớn).
3. SVG thao tác (có play nhẹ hoặc kéo step).
4. Danh sách bước thao tác (tap để nghe TTS từng bước).
5. Khối “Lỗi hay gặp”.
6. Khối “Nếu lỡ sai thì làm gì”.
7. Quick check 3 câu + nút “Đánh dấu đã nắm”.

## 5.2 Chế độ hiển thị
- **Learn Mode**: đầy đủ nội dung.
- **Quick Mode**: chỉ khẩu quyết + 5 bước lõi + cảnh báo.
- **Hands-free Mode**: TTS đọc từng bước, màn hình tối giản.

---

## 6) Bản đồ chuyên đề mở rộng (Expanded Topic Map)

Dựa trên bản gốc, mở rộng thành 4 chuyên đề lõi + 2 chuyên đề kiến nghị.

---
## Chuyên đề 1: Lùi chuồng, ghép ngang ở không gian hẹp (TTTM/hầm xe)

### Module 1.1: Nhận diện không gian và chuẩn bị vào bài
- Lesson: chọn vị trí đỗ phù hợp thân xe
- Card mẫu:
  - Cách ước lượng chiều rộng chỗ đỗ nhanh
  - Khi nào bỏ lượt và chạy vòng lại
  - Thiết lập gương trước khi lùi

### Module 1.2: Lùi chuồng tiêu chuẩn
- Lesson: canh mốc vai/gương/cột mốc
- Card mẫu:
  - Điểm bắt đầu đánh lái
  - Khi nào đánh hết lái, khi nào trả lái
  - Giữ tốc độ creep khi dốc hầm

### Module 1.3: Ghép ngang trong slot hẹp
- Lesson: vào 2 pha và chỉnh thân xe
- Card mẫu:
  - Pha 1 áp sát và tạo góc
  - Pha 2 lùi vào song song
  - Chỉnh khi đuôi xe sát cột

### Module 1.4: Thoát lỗi thường gặp
- Card mẫu:
  - Xe lệch trái/phải sau nửa thân xe
  - Quá góc, thiếu góc
  - Có xe máy/xe đẩy cắt ngang phía sau

---
## Chuyên đề 2: Đường hẹp, ngõ nhỏ, xoay xở khi kẹt xe

### Module 2.1: Điều khiển tốc độ siêu thấp
- Card mẫu:
  - Rà phanh đúng cách
  - Kiểm soát creep không giật
  - Dừng-nhích-dừng khi xe máy chen

### Module 2.2: Canh đầu xe và hông xe
- Card mẫu:
  - Canh góc chữ A khi ôm cua gắt
  - Tránh quẹt gương xe máy tạt đầu
  - Căn bánh sau khi qua miệng cống/gờ

### Module 2.3: Nhường đường và giao tiếp trong ngõ
- Card mẫu:
  - Tín hiệu tay/đèn/còi văn minh
  - Quy tắc ưu tiên khi hẻm nghẽn
  - Lùi nhường trong đoạn hẹp

### Module 2.4: Kẹt cứng nhiều phương tiện
- Card mẫu:
  - Chia không gian 3 vùng an toàn
  - Thoát thế “kẹt chéo đầu”
  - Khi nào nên dừng hẳn chờ điều phối

---
## Chuyên đề 3: Đi cao tốc (Long Thành – Dầu Giây, Trung Lương, v.v.)

### Module 3.1: Chuẩn bị trước khi vào cao tốc
- Card mẫu:
  - Kiểm tra áp suất lốp và nhiên liệu
  - Chỉnh gương chống điểm mù
  - Xác định trước lối ra trên tuyến

### Module 3.2: Nhập làn an toàn
- Card mẫu:
  - Tăng tốc dứt khoát trong làn nhập
  - Canh khoảng trống 3 giây
  - Không nhập làn kiểu “cắt đầu xe tải”

### Module 3.3: Giữ làn – chuyển làn – vượt xe
- Card mẫu:
  - Quy trình chuyển làn 5 bước
  - Vượt xe tải đường dài có gió lùa
  - Xử lý xe bám đuôi tốc độ cao

### Module 3.4: Ra khỏi cao tốc và tình huống bất thường
- Card mẫu:
  - Chuẩn bị thoát làn sớm
  - Đi sai lối ra thì xử lý thế nào
  - Mưa lớn giảm tầm nhìn trên cao tốc

---
## Chuyên đề 4: Đèo dốc & mưa ngập

### Module 4.1: Lên/xuống dốc với xe số tự động
- Card mẫu:
  - Dừng ngang dốc không trôi xe
  - Dùng số thấp/lẫy số để hãm tốc
  - Tránh rà phanh liên tục gây fade phanh

### Module 4.2: Đổ đèo dài an toàn
- Card mẫu:
  - Nhịp phanh ngắt quãng đúng cách
  - Nhận biết mùi phanh quá nhiệt
  - Điểm dừng nghỉ bắt buộc

### Module 4.3: Qua vùng ngập
- Card mẫu:
  - Ước lượng mực nước rủi ro
  - Giữ ga đều, không tạo sóng lớn
  - Xử lý sau khi qua ngập (phanh/lọc gió)

---
## Chuyên đề 5 (kiến nghị): Đọc tình huống & phòng thủ (Defensive Driving)
- Quét gương theo chu kỳ
- Dự đoán điểm cắt mặt nguy hiểm
- Khoảng đệm an toàn theo tốc độ thực tế đô thị Việt Nam

## Chuyên đề 6 (kiến nghị): Sự cố nhanh thường gặp
- Nổ lốp nhẹ, xe rung bất thường
- Đèn cảnh báo động cơ/phanh/ắc quy
- Checklist gọi cứu hộ và thông tin cần cung cấp

---

## 7) Learning Path theo năng lực người học

## 7.1 Người mới hoàn toàn (0–2 tháng)
- Bắt đầu: Chuyên đề 1 + 2
- Mục tiêu: kiểm soát xe tốc độ thấp, không va quẹt

## 7.2 Đã đi phố cơ bản (2–6 tháng)
- Bổ sung: Chuyên đề 3
- Mục tiêu: nhập/chuyển làn cao tốc tự tin

## 7.3 Đã chạy thường xuyên
- Nâng cao: Chuyên đề 4 + 5 + 6
- Mục tiêu: xử lý rủi ro và ra quyết định an toàn

---

## 8) Cơ chế lặp lại thông minh (Spaced & Scenario-based Review)

## 8.1 Quy tắc nhắc ôn
- Ôn lại card sau: 1 ngày → 3 ngày → 7 ngày → 14 ngày.
- Nếu trả lời quick check sai: quay về chu kỳ ngắn hơn.

## 8.2 Trigger theo ngữ cảnh
- Nếu user học nhiều card “hẻm nhỏ” nhưng hay fail quick check:
  - app đề xuất “combo 3 card chữa lỗi” liên tiếp.
- Trước cuối tuần/lễ:
  - gợi ý “gói ôn cao tốc 10 phút”.

---

## 9) Thiết kế đánh giá đầu ra (Assessment)

## 9.1 Mini quiz sau mỗi module
- 3–5 câu tình huống ngắn.
- Dạng lựa chọn quyết định thao tác ưu tiên.

## 9.2 Scenario drill (mô phỏng quyết định)
- Cho ảnh/SVG + bối cảnh.
- User chọn bước tiếp theo.
- App phản hồi:
  - đúng/sai
  - vì sao
  - card cần ôn lại

## 9.3 Tiêu chí “đạt module”
- Hoàn thành ≥ 80% card
- Quick check đúng ≥ 70%
- Không sai câu an toàn nghiêm trọng

---

## 10) Nội dung “khẩu quyết” chuẩn hóa

## 10.1 Quy tắc viết khẩu quyết
- Ngắn, có nhịp, dễ đọc to.
- Tránh từ chuyên môn khó nhớ.
- Mỗi khẩu quyết phải map được vào hành động cụ thể.

## 10.2 Ví dụ format
- “Chậm – thẳng – mới đánh.”
- “Tiến bám lưng, lùi bám bụng.”
- “Nhìn xa – giữ làn – đệm phanh.”

> Mỗi khẩu quyết cần đi kèm: khi dùng / khi không dùng.

---

## 11) Chuẩn an toàn nội dung theo mức rủi ro

- **Risk Low**: bài thao tác cơ bản bãi trống.
- **Risk Medium**: hẻm đông, hầm xe, nhập làn.
- **Risk High**: cao tốc mưa lớn, đèo dài, ngập sâu.

Quy định:
- Card Risk High bắt buộc có block “Không thực hiện nếu...”.
- Với Risk High, quick check phải có ít nhất 1 câu điều kiện dừng.

---

## 12) Kế hoạch sản xuất nội dung cho mục 3 (8 tuần)

## Tuần 1–2
- Chốt topic map + module map.
- Viết 20 card skeleton đầu tiên.

## Tuần 3–4
- Hoàn thiện 35 card (topic 1 + 2).
- SVG minh họa và quick check.

## Tuần 5–6
- Thêm 20 card (topic 3 + 4).
- Rà soát safety note + recovery steps.

## Tuần 7
- Expert review toàn bộ card.
- Loại card trùng/khó hiểu, rút gọn câu chữ.

## Tuần 8
- Đóng gói learning path.
- Pilot người dùng thật, đo tỷ lệ hoàn thành.

---

## 13) KPI đánh giá hiệu quả cấu trúc bite-sized

1. **Card completion rate** > 70%.
2. **Quick review usage** > 40% phiên học.
3. **Average session** 8–12 phút (phù hợp mobile learning).
4. **Sai câu an toàn nghiêm trọng** giảm dần sau 2 tuần.
5. **Tỷ lệ quay lại học** ≥ 3 buổi/tuần.

---

## 14) Tiêu chí “Done” cho mục 3

Mục “Cấu trúc chuyên đề thực hành” hoàn tất khi:
1. Có tối thiểu 4 chuyên đề lõi với module/lesson/card rõ ràng.
2. Mỗi chuyên đề có learning path cho người mới và người đã có nền tảng.
3. Mọi card đạt chuẩn: khẩu quyết + bước thao tác + lỗi + recovery + safety.
4. Tất cả card dùng tốt ở quick mode trên mobile.
5. Có hệ thống đánh giá (quick check/mini quiz/scenario drill) hoạt động.

---

## 15) Kết luận

Thiết kế bite-sized không chỉ là “chia nhỏ nội dung”, mà là **đóng gói quyết định lái xe thành đơn vị ghi nhớ và hành động ngay**.  
Với cấu trúc Topic → Module → Lesson → Card như trên, ứng dụng sẽ:
- Dễ học,
- Dễ ôn trước khi lái thật,
- Và quan trọng nhất: **giúp người học xử lý tình huống an toàn hơn trong bối cảnh giao thông Việt Nam**.