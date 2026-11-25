# hồ. — Aquarium v22

Thêm cá mập rạn từ mô hình người dùng cung cấp. Mở `exports/Aquarium_Play_v22.html` để chơi ngay, không cần mạng. Đàn mẫu có 4 Ngọc Lam, 2 Đuôi Nắng và 1 cá mập. Nút **+ Cá mập rạn** thêm cá, tổng tối đa 12.

- Cá mập có 12 khung bơi lấy từ animation Swim của GLB và 6 góc quay đầu dựng từ mô hình 3D; không phải mô hình 3D chạy trực tiếp trong trình duyệt.
- Bơi vùng thoáng, lên xuống ngẫu nhiên, tránh vật trang trí theo cơ chế hiện tại. Không vào hang; không săn cá hay gây sát thương. Dùng chung cơ chế thức ăn thử nghiệm.
- Giữ nguyên 5 bối cảnh, ánh sáng ngày/đêm, cây/rêu chuyển động, menu và fullscreen.

## Chạy / triển khai
Node >=20: `npm start`, mở http://localhost:3000. `npm run build` kiểm tra; `npm run export` xuất bản HTML độc lập và danh sách asset.
Upload nội dung thư mục dự án lên GitHub. Vercel: framework Other, build `npm run build`, output `public`. Không cần biến môi trường.

## Nguồn cá mập
Reef Shark by Polyfork (https://polyfork.dev/asset/reef-shark-e486ff), CC BY 4.0 (https://creativecommons.org/licenses/by/4.0/).
Chọn giấy phép CC BY 4.0 cho GLB. Thay đổi: dựng ánh sáng/camera, render các khung bơi và quay, đóng sprite atlas. Giữ mô hình gốc và LICENSE trong source-models. Không đóng gói module MJS của Polyfork.

Dựng lại khung hình: Blender 4.3+, `blender -b --python scripts/render-shark.py`, sau đó `python scripts/pack-shark.py` (Pillow). Khung hình tạm ở /tmp/sharkframes.

## Kiểm tra v22
Đã chạy kiểm tra hồi quy và 72.000 bước bơi cá mập, kích thước atlas, chu kỳ khung hình. Đã xem khung render cá mập. Chưa kiểm tra trực quan toàn bộ game trong trình duyệt do Chromium của môi trường không khởi chạy được.
