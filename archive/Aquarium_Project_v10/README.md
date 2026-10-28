# Aquarium v10 — Đuôi Nắng bơi bằng sprite

Mở Ho_Ca_2_5D_Choi_Thu_v04.html. Ảnh được nhúng sẵn, không cần mạng.

ĐÃ HOÀN THÀNH VÀ TÍCH HỢP: bộ bơi chậm C02 gồm 6 PNG 512×320, atlas 3072×320, trình tự qua lại 10 fps. Các khung được tạo bằng imagegen, tách và căn giữ nguyên alpha. C02 không còn dùng biến dạng strip khi bơi. Có ánh vảy ban ngày. Giữ đủ năm bối cảnh và cá Ngọc Lam.

PHẠM VI: bộ bơi chậm đã dùng được trong bản game thử; quay đầu vẫn co ngang/lật bằng mã. Bơi nhanh, ăn, hoảng sợ, cá con chưa làm. Không gọi toàn bộ loài cá là hoàn thiện.

ĐÍNH CHÍNH QA: kết luận trước rằng sheet có nền vàng không dùng được là thiếu kiểm tra alpha. Ảnh xem trước có thể hiển thị RGB của pixel trong suốt. Bản mới đã kiểm tra alpha và ghép Canvas. Các ghi chép v09 được giữ làm lịch sử, không phải kết luận hiện tại.

Tệp mới: assets/runtime/C02 (6 PNG, atlas, JSON); assets/source_images/C02_SWIM_SOURCE_v03.png; assets/docs/ASSET_STATUS_v10.json và ASSET_REGISTER_v10.csv. Toàn bộ tệp v09 giữ nguyên.

KIỂM TRA: mở HTML độc lập trong Chrome, quan sát C02 ghép đúng trên nền sáng và tối, không có mảng nền vàng. JavaScript kiểm tra cú pháp thành công. Chưa kiểm tra điện thoại thật.
