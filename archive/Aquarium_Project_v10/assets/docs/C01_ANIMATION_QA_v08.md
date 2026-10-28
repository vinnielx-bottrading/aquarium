# C01 — Kiểm tra bộ chuyển động, 28/10/2026

Đã giữ nguyên ba ảnh nguồn tìm lại được: hai bản bơi 8 khung và một bản quay đầu 6 góc. Chưa có bộ sprite chuyển động đạt chuẩn để tích hợp. Không chỉnh sửa ảnh nguồn.

- **C01_SWIM_SHEET_DRAFT_v01**: Cá sát/cắt mép ảnh; viền màu nhiễu.
- **C01_SWIM_SHEET_DRAFT_v02**: Có khoảng cách giữa các khung; viền xanh nhiễu; chưa căn pivot hoặc kiểm tra loop.
- **C01_TURN_SHEET_DRAFT_v01**: Nền màu còn nguyên; tỷ lệ giữa góc nhìn không đồng nhất; không phải sprite trong suốt.

## Tiêu chí hoàn thiện
- Giữ hình dáng, màu và tỷ lệ mẫu C01 đã duyệt.
- Tách từng khung PNG RGBA; không nền màu, viền nhiễu hay cắt vây.
- Bơi: thống nhất tâm thân, kích thước ô và tỷ lệ; kiểm tra nối khung cuối–đầu.
- Quay đầu: giữ tỷ lệ thể tích thân xuyên suốt các góc; không kéo giãn ngang để thay góc nhìn.
- Kiểm tra trên nền sáng và tối ở kích thước dùng trong hồ.
- Phát quang phải bám đúng từng khung; chưa có bộ phát quang cho chuyển động này.

## Game
Game v02 từ gói v07 được giữ nguyên, vẫn dùng ảnh tĩnh biến dạng bằng mã. Các sheet mới chưa được nạp vào game. Kiểm tra trình duyệt ghi trong README cũ là lịch sử v07; lượt này chỉ kiểm tra ảnh nguồn và tính toàn vẹn gói.

## Tệp chưa khôi phục
Lịch sử hội thoại nhắc một lần sửa bộ quay đầu; chưa tìm được ảnh riêng tương ứng nên không liệt kê là đã lưu. Gói này chứa đầy đủ v07 và ba sheet thực sự truy xuất được.
