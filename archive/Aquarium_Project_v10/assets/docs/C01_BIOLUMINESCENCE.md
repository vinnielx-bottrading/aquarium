# C01 — NGỌC LAM PHÁT QUANG

## Quy tắc người dùng yêu cầu
Ngọc Lam phát quang vào buổi tối, khi tắt đèn, hoặc khi bơi vào góc/hang tối. Giữ nguyên nhận diện mẫu cá ban ngày đã được người dùng khen và chấp thuận.

## Hình ảnh
Sọc thân xanh cyan, tia/viền vây và đuôi phát sáng mềm. Thân chuyển xanh teal sẫm, vẫn thấy vảy; mắt tự nhiên. Không sáng trắng toàn thân, không chớp nháy nhanh. Ảnh C01_NIGHT_GLOW_RIGHT_v01 là biến thể đầy đủ, KHÔNG phải emission mask. Cần căn silhouette khi crossfade vì tạo ảnh có thể làm lệch chi tiết.

## Logic đề xuất khi tích hợp
- Dùng độ sáng cục bộ L tại vị trí cá, chuẩn hóa 0 (tối) đến 1 (sáng).
- L lấy từ ánh sáng môi trường + đèn gần cá, có giảm bởi vùng bóng/hang. Không chỉ kiểm tra nút buổi tối.
- Mức glow mục tiêu: 1 - smoothstep(0.15, 0.55, L); đây là thông số khởi đầu để tinh chỉnh.
- Chuyển dần trong khoảng 0.6–1.2 giây; tránh bật/tắt đột ngột.
- Glow nhỏ quanh sọc/vây; không tạo đèn chiếu sáng cả hồ.
- Che khuất: cá đi sau đá/vách hang thì phần bị che và glow cũng bị che. Chỉ phần thấy qua cửa hang phát sáng; không xuyên đá.
- Ban đêm nhưng cá ngay dưới đèn sáng: glow yếu. Ban ngày nhưng trong hang tối: glow mạnh.

## Trạng thái
Đã tạo ảnh biến thể tĩnh và ghi quy tắc. Chưa có animation, vùng hang, ánh sáng cục bộ hoặc cá trong game HTML v01; game giữ nguyên. Biến thể đêm chờ duyệt.
