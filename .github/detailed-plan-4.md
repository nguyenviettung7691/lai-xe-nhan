# Kế hoạch mở rộng chi tiết cho mục **4. Các Tính Năng Hữu Dụng (Tối giản nhưng thiết thực)**

## 1) Mục tiêu thiết kế tính năng

Các tính năng trong MVP phải bám sát nguyên tắc:
1. **Dùng được ngay khi lái/chuẩn bị lái** (thao tác cực ít).
2. **Tăng an toàn và giảm căng thẳng** thay vì “nhiều chức năng để cho có”.
3. **Offline-first trên mobile**.
4. **Triển khai nhanh, maintain nhẹ** cho team nhỏ.

Từ nền tảng bản gốc, mở rộng thành 4 nhóm tính năng lõi + 1 nhóm tính năng bổ sung theo pha.

---

## 2) Feature Set tổng thể (ưu tiên theo pha)

## Pha MVP bắt buộc
1. **Checklist Tương Tác** (trước khi nổ máy / trước khi rời xe)
2. **Chế độ Đọc To (TTS)**
3. **UI Tương Phản Cao + Night Mode**
4. **Tra Cứu Nhanh Đèn Cảnh Báo**

## Pha MVP+ (sau pilot)
5. **Quick Drill 60 giây trước khi lái**
6. **Bookmark & “Ôn lại sau”**
7. **Gợi ý ôn theo ngữ cảnh (cao tốc/mưa/đêm)**

---

## 3) Tính năng #1 — Checklist Tương Tác

## 3.1 Mục tiêu
Biến các thao tác an toàn thành phản xạ cơ bản bằng cơ chế check nhanh 1 chạm.

## 3.2 Bộ checklist lõi đề xuất

### A. Trước khi nổ máy (Pre-drive)
- Ghế chỉnh đúng tư thế
- Gương trái/phải + gương giữa
- Dây an toàn
- Phanh tay/trạng thái số
- Mức nhiên liệu ước lượng hành trình
- Đèn cảnh báo bất thường trên taplo

### B. Trước khi rời xe (Post-drive)
- Về P
- Kéo phanh tay
- Tắt máy
- Kiểm tra đèn/cửa kính
- Không bỏ quên đồ quan trọng / trẻ nhỏ

### C. Checklist theo ngữ cảnh (tuỳ chọn)
- Trước khi vào cao tốc
- Trước khi xuống đèo
- Trước khi qua vùng ngập

## 3.3 Thiết kế tương tác
- Mỗi item là một hàng lớn (tap target >= 44px).
- Swipe hoặc tap để check.
- Có “haptic feedback” nhẹ (nếu thiết bị hỗ trợ).
- Nút “Reset checklist” rõ ràng cho phiên lái mới.
- Hiển thị tiến độ: `5/7 mục hoàn tất`.

## 3.4 Quy tắc dữ liệu
- Lưu local ngay lập tức (offline).
- Đồng bộ cloud khi có mạng.
- Lưu lịch sử tối thiểu:
  - thời điểm hoàn tất
  - loại checklist
  - thời gian hoàn tất toàn bộ checklist

## 3.5 KPI tính năng
- Tỷ lệ hoàn tất checklist pre-drive > 60%.
- Thời gian hoàn tất checklist < 25 giây (median).
- Tỷ lệ quay lại dùng checklist sau 2 tuần > 40%.

---

## 4) Tính năng #2 — Chế độ Đọc To (Text-to-Speech)

## 4.1 Mục tiêu
Cho phép người dùng **nghe hướng dẫn thay vì nhìn màn hình** khi đang cần tập trung tay lái.

## 4.2 Phạm vi MVP
- Đọc theo:
  1. Từng bước trong card
  2. Toàn bộ card
  3. Quick mode (rút gọn 30–45 giây)
- Điều khiển:
  - Play / Pause / Stop
  - Next step / Previous step
  - Tốc độ đọc: 0.9x / 1.0x / 1.1x

## 4.3 UX an toàn
- Khi bật chế độ “đang lái”:
  - tăng kích thước nút điều khiển
  - ẩn bớt nội dung phụ
- Khoảng nghỉ 0.5–1 giây giữa các bước để người nghe xử lý.
- Mỗi bước bắt đầu bằng từ khóa hành động: “Bước 1: …”.

## 4.4 Triển khai kỹ thuật gọn
- Dùng **Web Speech API** (browser-native).
- Fallback:
  - nếu máy không hỗ trợ voice tốt → hiển thị “chế độ chữ to”.
- Cache text script offline cùng card data.

## 4.5 KPI tính năng
- Tỷ lệ user dùng TTS ít nhất 1 lần/tuần > 35%.
- Tỷ lệ nghe hết 1 card TTS > 50%.
- Số thao tác chạm màn hình khi bật TTS giảm > 30% so với không dùng.

---

## 5) Tính năng #3 — UI Tương Phản Cao + Night Mode

## 5.1 Mục tiêu
Giảm chói mắt, tăng khả năng đọc nhanh trong điều kiện ánh sáng yếu (ban đêm, trong xe).

## 5.2 Tiêu chuẩn giao diện
- Mặc định theo system theme (dark/light).
- Cho phép ép Night Mode thủ công.
- Contrast đạt mức WCAG AA trở lên.
- Font đủ lớn để liếc nhanh:
  - body >= 16px
  - heading >= 20px
- Khoảng cách dòng thoáng để tránh đọc nhầm bước.

## 5.3 Thành phần cần tối ưu
- Card step list
- Nút Play TTS
- Badge cảnh báo (vàng/đỏ)
- Icon đèn taplo (đảm bảo phân biệt được với người mù màu nhẹ)

## 5.4 Anti-pattern cần tránh
- Nền đen tuyệt đối + chữ xám mảnh gây mỏi mắt.
- Dùng quá nhiều màu neon.
- Nhồi quá nhiều thông tin vào một màn hình.

## 5.5 KPI tính năng
- Tỷ lệ bật Night Mode vào khung giờ tối > 50%.
- Giảm bounce rate phiên học ban đêm.
- Điểm hài lòng “dễ nhìn” >= 4/5.

---

## 6) Tính năng #4 — Tra Cứu Nhanh Đèn Cảnh Báo (Dashboard Lights)

## 6.1 Mục tiêu
Khi đèn lạ bật lên, người dùng tra cứu trong vài giây để biết:
- Mức độ nghiêm trọng
- Có nên dừng xe ngay hay đi tiếp đến gara
- Bước xử lý an toàn tức thời

## 6.2 Cấu trúc thông tin cho mỗi đèn
1. Tên đèn (VI + EN phổ biến)
2. Màu cảnh báo (đỏ/vàng/xanh)
3. Mức độ:
   - **Khẩn cấp**: dừng an toàn sớm nhất
   - **Cảnh báo**: hạn chế tiếp tục chạy xa
   - **Theo dõi**: có thể đi tiếp thận trọng
4. Ý nghĩa ngắn gọn (1–2 câu)
5. Việc cần làm ngay (checklist 3 bước)
6. Điều không nên làm
7. Khi nào gọi cứu hộ/gara

## 6.3 UX tra cứu
- Màn lưới icon lớn, dễ bấm.
- Có tìm kiếm theo từ khóa (“phanh”, “động cơ”, “ắc quy”…).
- Có bộ lọc theo màu đèn.
- Mở chi tiết trong 1 chạm, không nhiều tầng.

## 6.4 Phạm vi dữ liệu MVP
Ưu tiên 20–30 đèn phổ biến nhất:
- Check engine
- Oil pressure
- Battery
- Brake system/ABS
- Coolant temperature
- TPMS
- Airbag
- EPS/Power steering
- Transmission warning (AT)

## 6.5 KPI tính năng
- Thời gian tra cứu trung bình < 8 giây.
- Tỷ lệ thoát trang ngay sau tra cứu giảm.
- Tỷ lệ user đánh dấu “đã hiểu cần làm gì” > 70%.

---

## 7) Tính năng bổ sung khuyến nghị (MVP+)

## 7.1 Quick Drill 60 giây
- Trước khi lái, app đưa 3 bullet:
  - 1 khẩu quyết
  - 1 lỗi cần tránh
  - 1 bước an toàn bắt buộc
- Theo ngữ cảnh user chọn: hầm xe / hẻm / cao tốc / mưa.

## 7.2 Bookmark & Ôn lại sau
- Lưu card hay quên.
- Tạo playlist ôn cá nhân: “Lùi hầm”, “Cao tốc cuối tuần”.

## 7.3 Gợi ý ôn theo ngữ cảnh
- Buổi tối: ưu tiên night-driving reminders.
- Trước cuối tuần: gợi ý cao tốc.
- Mùa mưa: gợi ý card ngập nước.

---

## 8) Ma trận ưu tiên (Impact vs Effort)

## 8.1 Impact cao – Effort thấp (làm trước)
- Checklist cơ bản
- Night mode + contrast
- TTS cơ bản (play/pause/stop)

## 8.2 Impact cao – Effort vừa
- Dashboard lights + phân loại mức độ nguy hiểm
- TTS theo từng bước + tốc độ đọc

## 8.3 Impact vừa – Effort thấp
- Bookmark
- Quick Drill 60 giây

## 8.4 Để sau
- Voice command phức tạp
- Cá nhân hóa AI sâu theo hành vi lái (chỉ làm khi có data lớn)

---

## 9) Tích hợp dữ liệu và kiến trúc cho nhóm tính năng

## 9.1 Data entities bổ sung
- `user_checklist_sessions`
- `user_checklist_items`
- `tts_play_history`
- `dashboard_light_items`
- `dashboard_light_actions`
- `user_bookmarks` (MVP+)

## 9.2 Offline behavior
- Checklist, TTS script, dashboard light catalog phải dùng được offline.
- Khi online lại: sync history và analytics events.

## 9.3 Event tracking tối thiểu
- `checklist_started/completed`
- `tts_started/completed/step_skipped`
- `light_search_used`
- `light_detail_viewed`
- `night_mode_enabled`

---

## 10) Yêu cầu chất lượng (NFR) cho mục tính năng

1. **Reliability**: tính năng lõi dùng được khi mất mạng.
2. **Latency**:
   - mở card < 1 giây (đã cache)
   - mở đèn cảnh báo < 500ms (local index)
3. **Usability**:
   - thao tác chính hoàn tất trong <= 2 chạm
4. **Safety UX**:
   - không hiển thị đoạn văn dài ở màn hình khẩn cấp
   - ưu tiên “cần làm ngay” trước “giải thích dài”

---

## 11) Kịch bản người dùng tiêu biểu (User Scenarios)

## Scenario A — Trước khi rời bãi xe
- User mở app → checklist pre-drive → hoàn tất 7/7 trong 20 giây → bắt đầu lái.

## Scenario B — Đang loay hoay lùi hầm
- User bật card quick mode + TTS → nghe 5 bước lõi → thao tác theo.

## Scenario C — Đèn cảnh báo bật bất ngờ
- User bấm icon đèn → thấy mức “Cảnh báo” + 3 bước xử lý ngay → quyết định đi chậm đến gara gần nhất.

## Scenario D — Lái buổi tối
- App tự vào dark mode, chữ lớn, tương phản cao → user đọc nhanh không chói.

---

## 12) Lộ trình triển khai 6 tuần cho mục 4

## Tuần 1
- Hoàn thiện UX flow checklist + night mode tokens.

## Tuần 2
- Implement checklist local-first + sync cơ bản.

## Tuần 3
- TTS cơ bản (play/pause/stop + đọc từng bước).

## Tuần 4
- Dashboard lights data model + UI grid + detail page.

## Tuần 5
- Offline cache hardening + analytics events.

## Tuần 6
- QA thiết bị thật + tinh chỉnh copywriting + release pilot.

---

## 13) Tiêu chí “Done” cho mục 4

Mục “Các tính năng hữu dụng” hoàn tất khi:
1. Có 2 checklist lõi hoạt động mượt offline.
2. TTS đọc được toàn bộ card và từng bước.
3. Night mode + high contrast đạt chuẩn dễ đọc mobile.
4. Tra cứu được tối thiểu 20 đèn cảnh báo phổ biến.
5. Tất cả tính năng có tracking event cơ bản để đo hiệu quả.

---

## 14) Kết luận

Bộ tính năng tối giản nhưng thiết thực cần xoay quanh “**ít chạm – dễ hiểu – tăng an toàn tức thì**”.  
Với 4 tính năng lõi nêu trên, ứng dụng sẽ tạo giá trị thực dụng rõ rệt ngay từ MVP:
- Người mới hình thành thói quen an toàn,
- Người đã biết lái có công cụ ôn nhanh trước tình huống khó,
- Và toàn bộ trải nghiệm vẫn nhẹ, nhanh, offline-first đúng mục tiêu sản phẩm.