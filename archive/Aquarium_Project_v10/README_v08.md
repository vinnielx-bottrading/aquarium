# PROJECT v08 — Lưu bộ chuyển động Ngọc Lam dạng nháp

Bản này bổ sung 3 sheet nguồn và báo cáo kiểm tra `assets/docs/C01_ANIMATION_QA_v08.md`. **Chưa hoàn thiện bộ bơi/quay đầu; game vẫn là v02 từ v07.**

Toàn bộ tệp v07 được giữ lại. Các sprite mới có trạng thái `draft_not_runtime` trong manifest. Không dùng sheet quay đầu có nền màu để thả trực tiếp vào hồ.

---

# PROJECT v07 — GAME CÁ BƠI v02

**Mở Ho_Ca_2_5D_Choi_Thu_v02.html để chơi bản mới.** File v01 giữ lại để đối chiếu lịch sử.

## Đã tích hợp
- Mở sẵn hồ đầy nước, nền cát, 4 cá Ngọc Lam + 2 cá Đuôi Nắng.
- Cá bơi ngang, dao động độ cao, vẫy đuôi nhẹ bằng biến dạng strip; quay đầu bằng co/giãn ngang trong 0.85 giây. Đây là animation bằng mã từ một ảnh, chưa phải sprite sheet đầy đủ.
- Ngọc Lam đổi dần giữa mẫu ban ngày và mẫu đêm, kèm quầng xanh nhẹ khi bật Buổi tối.
- Nút thêm từng loài, đưa toàn bộ cá ra, khôi phục đàn mẫu; tối đa 12 cá.
- Khi có cá: mực nước tối thiểu 40%, nút xả cạn bị khóa. Đưa cá ra để xả.
- Giữ nguyên bọt khí, gợn sóng, ánh nước, cát/sỏi, âm thanh và chế độ sáng/tối.

## Giới hạn
Chưa có sinh sản, săn đuổi, ăn, va chạm cá-cá hoặc hành vi bơi đàn. Cá có thể bơi chồng hình khi ở các lớp chiều sâu khác nhau. Chưa có hang hay vùng tối cục bộ: hiệu ứng phát quang hiện theo nút sáng/tối; quy tắc hang tối vẫn nằm trong kế hoạch. Chưa có lưu tiến trình.

## Kiểm tra
- Chrome: quan sát cá trong hồ ban ngày và ban đêm; thêm cá từ 6 lên 7; đưa cá ra về 0 và xả nước thành công.
- Kiểm tra logic độc lập: đàn mặc định 6, giới hạn 12, không thả khi hồ khô, biên ngang sau 20.000 bước cập nhật, biên dọc ở 40% nước, glow tăng/giảm mượt.
- Chưa kiểm tra thiết bị iOS/Android thật.

## Tệp
HTML độc lập chứa 6 ảnh nhúng, không tải mạng. game.template.html là mã nguồn v02; build_game.py xuất lại HTML từ assets/source_images. Toàn bộ asset, README và danh mục cũ tiếp tục được giữ.

---
LỊCH SỬ CÁC BẢN TRƯỚC:

# CẬP NHẬT v06 — NGỌC LAM PHÁT QUANG

C01 ban ngày đã được duyệt; thêm C01_NIGHT_GLOW_RIGHT_v01, bản đêm chờ duyệt. Chi tiết quy tắc ánh sáng cục bộ tại assets/docs/C01_BIOLUMINESCENCE.md (hoặc docs/ bên trong thư mục assets). Game v01 chưa tích hợp cá.

# CẬP NHẬT v05 — HAI LOÀI CÁ THỬ

- C01_MASTER_RIGHT_v01: cá Ngọc Lam, thân xanh ngọc, bụng ngọc trai, đuôi chẻ.
- C02_MASTER_RIGHT_v01: cá Đuôi Nắng, thân vàng cam, đuôi xòe mềm.
- Mỗi loài: một PNG RGBA nhìn ngang, hướng phải, cá trưởng thành hư cấu.
- Trạng thái: bản thiết kế chờ người dùng duyệt; chưa khóa kích thước hiển thị, chưa phân đực/cái, chưa cá con hoặc hoạt ảnh. Có viền màu nhẹ cần kiểm tra khi ghép.
- Game HTML giữ nguyên v01: CHƯA có cá.
- Sau khi duyệt: làm bơi/đổi hướng, rồi tích hợp vào hồ; chưa triển khai săn đuổi hoặc sinh sản.

# HỒ — GAME XEM THỬ v01 / PROJECT v04

## Chạy ngay
Mở Ho_Ca_2_5D_Choi_Thu_v01.html bằng Chrome, Edge hoặc Safari. Một file HTML độc lập, ảnh nhúng sẵn; không cần internet hay cài thư viện. Trên điện thoại, tải tệp rồi mở bằng trình duyệt nếu ứng dụng xem tệp không chạy JavaScript.

## Có trong bản này
- Hồ kính 2.5D bắt đầu trống.
- Chọn nền kính/cát/sỏi.
- Bơm hoặc xả nước; thanh chỉnh mực nước.
- Gợn mặt nước, bọt máy sủi, hạt lơ lửng, vệt sáng và ánh nước đáy hồ.
- Chạm vùng nước tạo vòng gợn.
- Sáng/tối, cường độ gợn, tạm dừng, toàn màn hình nếu trình duyệt hỗ trợ.
- Âm nền nước tổng hợp bằng Web Audio, mặc định tắt; chỉ phát khi bật âm thanh, có nước và máy sủi.
- Ưu tiên giảm chuyển động nếu thiết bị cài reduced motion.

## Phạm vi
Đây là prototype hiệu ứng hồ; chưa có cá, sinh sản, cho ăn, kéo thả đá/cây hoặc lưu tiến trình. Hiệu ứng nước là mô phỏng đồ họa 2D, không phải mô phỏng vật lý chất lỏng. Khung hồ được dựng Canvas theo mẫu; không phải ảnh gốc A01 tách pixel. B01/B02 được căn ở bước render, nguồn không sửa. B03/B04 mới lưu nguồn, chưa đưa vào game. Nút Làm lại trả hồ trống/nền kính, giữ tùy chọn môi trường.

## Cấu trúc
- HTML: bản chơi độc lập.
- game.template.html: mã nguồn dễ sửa; __ASSETS__ cần được điền data URI khi xuất bản.
- assets/: toàn bộ nhóm A, B01/B02 và 5 mẫu B03/B04; README, danh mục, manifest, lịch sử.
- assets/preview.html: viewer kỹ thuật cũ của nhóm A, không phải bản game mới.

## Kiểm tra
Đã mở trên Chrome qua preview: hồ trống, chọn cát, bơm đạt 100%, chọn sỏi, chế độ tối, nút âm thanh, tạm dừng và xả nước. Đã quan sát bọt khí và ánh nước trong ảnh trình duyệt. Chưa kiểm tra trên thiết bị iOS/Android thực; chưa xác nhận chất lượng âm thanh bằng tai.

## Tiếp theo
Người dùng xem và góp ý hiệu ứng trước khi tạo thêm asset. Giữ đầy đủ mã/phiên bản; không đánh dấu ảnh mới đã duyệt.
