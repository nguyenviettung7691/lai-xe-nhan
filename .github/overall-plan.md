Dưới đây là bản kế hoạch tổng thể đã được tinh chỉnh, bổ sung chiến lược dữ liệu và đơn giản hóa tối đa Tech Stack để tập trung vào hiệu năng, trải nghiệm người dùng (đặc biệt là offline trên mobile) thay vì dàn trải công nghệ.

### 1. Đánh giá & Lựa chọn Nguồn Dữ Liệu (Content Strategy)

Đối với một ứng dụng hướng dẫn lái xe, độ chính xác và tính trực quan của dữ liệu là yếu tố sống còn. Dưới đây là đánh giá các phương pháp:

* **Phương pháp 1: Tự sản xuất Video/Hình ảnh thực tế (In-house Production).**
* *Đánh giá:* Chất lượng cao nhất, sát thực tế Việt Nam. Tuy nhiên, chi phí và thời gian sản xuất (thuê xe, quay phim bằng flycam/gopro góc nhìn người lái, dựng phim) quá lớn cho giai đoạn đầu. Trọng lượng file video lớn cũng làm giảm trải nghiệm offline.


* **Phương pháp 2: Tổng hợp từ YouTube/TikTok (Curation & Embedding).**
* *Đánh giá:* Nguồn dữ liệu dồi dào, miễn phí. Tuy nhiên, ứng dụng phụ thuộc vào kết nối mạng để tải video (không khả thi khi ở dưới hầm TTTM), dễ dính bản quyền và người dùng bị xao nhãng bởi quảng cáo nền tảng.


* **Phương pháp 3: Đồ họa hóa (2D/3D Vector & SVG Animation).**
* *Đánh giá:* Chuyển đổi các tình huống thực tế thành sơ đồ đồ họa góc nhìn từ trên xuống (Top-down view) hoặc hoạt ảnh SVG nhẹ nhàng. Dữ liệu tải cực nhanh, dễ lưu offline, dễ hiểu.


* **Mục tiêu khả thi nhất (Đề xuất đưa vào kế hoạch): Kết hợp "Đồ họa hóa Vector" và "Hợp tác Chuyên gia (Giáo viên dạy lái)".**
* *Hành động:* Giai đoạn đầu, tập trung xây dựng nội dung bằng hình ảnh minh họa đồ họa vector siêu nhẹ và các checklist dạng text. Nội dung lý thuyết và các "khẩu quyết" sẽ được tinh lọc thông qua việc phỏng vấn hoặc hợp tác chia sẻ doanh thu với 1-2 giáo viên dạy lái xe giàu kinh nghiệm thực tế tại địa phương để đảm bảo tính chuẩn xác.



### 2. Tech Stack Tinh Gọn (Tối ưu cho Use Case)

Vì ứng dụng chủ yếu phục vụ việc tra cứu nhanh, đọc "khẩu quyết" và xem sơ đồ hướng dẫn (Content-driven) trên di động, hệ thống không cần xử lý logic backend phức tạp hay kiến trúc microservices.

* **Frontend (Trái tim của ứng dụng): Vue 3 hoặc React (sử dụng Vite).**
* Sử dụng Vite để build ứng dụng SPA (Single Page Application) cực nhanh và nhẹ.
* Cốt lõi là tích hợp **PWA (Progressive Web App) Service Workers**. Toàn bộ text, checklist, và hình ảnh vector (SVG) sẽ được cache lại. Người dùng chỉ cần tải 1 lần là có thể mở app xem "Cách lùi chuồng" ngay dưới hầm để xe mà không cần mạng.


* **Backend & Database (Loại bỏ để tinh gọn): Sử dụng BaaS (Backend-as-a-Service).**
* Thay vì xây dựng server riêng, sử dụng **Supabase** hoặc **Firebase**.
* Cung cấp sẵn Database (lưu tiến trình học, checklist đã check), Authentication (Đăng nhập đơn giản bằng Google/Apple hoặc Email), và Storage (lưu hình ảnh) mà không tốn công cài đặt hạ tầng.


* **Hosting:** **Vercel** hoặc **Netlify**. Triển khai frontend tự động, miễn phí, tích hợp sẵn CDN toàn cầu giúp hình ảnh tải nhanh nhất có thể.

### 3. Cấu trúc Chuyên đề Thực hành (Thiết kế Bite-sized)

Nội dung sẽ được chia nhỏ thành các thẻ (cards) dễ vuốt trên điện thoại.

* **Chuyên đề 1: Lùi chuồng, ghép ngang ở không gian hẹp.**
* Tập trung vào bối cảnh hầm Vincom, Takashimaya với dốc cao, trơn trượt.
* *Mô phỏng:* Animation SVG về quỹ đạo đuôi xe, hướng dẫn cách chia điểm mù, cách đệm phanh khi xe đang lùi trên dốc hầm.


* **Chuyên đề 2: Đường hẹp, ngõ nhỏ, xoay xở khi kẹt xe.**
* Tập trung vào đặc sản hẻm nhỏ rẽ ngoặt liên tục và xe máy luồn lách (như các khu vực Quận 3, Quận 10).
* *Khẩu quyết:* Tiến bám lưng, lùi bám bụng.
* *Kỹ năng:* Rà phanh (creep) giữ tốc độ dưới 10km/h; Căn góc chữ A để không va quẹt xe máy tạt đầu.


* **Chuyên đề 3: Lái xe cao tốc.**
* Bối cảnh cao tốc Long Thành - Dầu Giây, Trung Lương.
* *Kỹ năng:* Nhập làn (tăng tốc dứt khoát), chuyển làn an toàn ở tốc độ 80-120km/h, giữ khoảng cách 3 giây, cách đọc các biển báo gộp làn.


* **Chuyên đề 4: Đi đèo dốc & Mưa ngập.**
* *Mưa ngập:* Xử lý khi đi qua đoạn ngập (chuyển số tay thấp, tắt điều hòa, đi đều ga).
* *Đèo dốc:* Sử dụng phanh động cơ (Engine braking), cách hãm tốc bằng lẫy số/số bán tự động khi đổ đèo dài để chống mất phanh.



### 4. Các Tính Năng Hữu Dụng (Tối giản nhưng thiết thực)

1. **Checklist Tương Tác:** Giao diện một chạm "Trước khi nổ máy" và "Trước khi rời xe". Người dùng bấm check từng mục (Gương, Ghế, Phanh tay, Nước làm mát) để rèn luyện thói quen cơ bắp.
2. **Chế độ Đọc To (Text-to-Speech Audio):** Khi đang vần vô lăng, người dùng không thể nhìn điện thoại. Có một nút "Play", app sẽ dùng API Text-to-Speech mặc định của trình duyệt để đọc to từng bước (ví dụ: "Bước 1: Chuyển số R, đánh hết lái phải. Bước 2: Nhìn gương trái..."). Rất dễ triển khai (chỉ dùng Web Speech API có sẵn của HTML5, không cần server).
3. **UI Tương Phản Cao (Night Mode):** Giao diện tối (Dark mode) mặc định để tài xế dễ nhìn lướt điện thoại trên giá đỡ (car mount) ban đêm mà không bị chói mắt làm giảm tầm nhìn đường.
4. **Tra Cứu Nhanh Đèn Cảnh Báo (Dashboard Lights):** Một lưới các biểu tượng icon đèn táp-lô. Bấm vào icon báo lỗi đang sáng đỏ/vàng trên xe để biết ngay mức độ nguy hiểm và cách xử lý (có nên gọi cứu hộ ngay hay vẫn đi tiếp được đến gara).