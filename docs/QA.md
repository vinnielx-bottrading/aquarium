# Kiểm tra v11

## Tự động
- npm test / npm run build: cú pháp JS, đủ tất cả frame trong chu kỳ, giới hạn chỉ số quay, kích thước atlas, mọi đường dẫn HTML/PNG cục bộ, ID asset không trùng, cấu hình output Vercel.
- Gói ZIP được đọc lại kiểm tra CRC; lưu SHA256 cho các file.

## Trình duyệt
- Chrome trên môi trường xem thử: game khởi động với 6 cá, ảnh hai loài hiển thị nền trong suốt.
- Nút Thử quay đầu và Tạm dừng hoạt động; chuyển sang nhánh dùng atlas quay đầu.
- Xem nền tối và các góc trong trang kiểm tra hoạt ảnh.

## Giới hạn
Chưa deploy Vercel thực tế, chưa kiểm tra Android/iOS thật. Không có bài kiểm tra cho các tính năng chưa triển khai (sinh sản/ăn/săn đuổi).
