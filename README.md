# Aquarium v12 — Trang trí & bơi tự do

Chỉ hai loài: Ngọc Lam và Đuôi Nắng. Không bổ sung loài mới.

## Chơi
`npm start`, mở http://localhost:3000. `npm test` kiểm tra; `npm run build` dùng trên Vercel. Không cần dependency. Cấu hình Vercel giữ: Other / npm run build / public.

- Bấm **Trang trí hồ** ở góc trái để mở khay. Chọn một trong 5 đá rồi chạm gần đáy hồ hoặc kéo từ khay vào hồ.
- Giữ khay mở để chọn/kéo vật đã đặt, đổi kích thước, Thu hồi, Hoàn tác. Có cát/sỏi; tối đa 24 vật.
- Vật được giới hạn trên mặt đáy có phối cảnh; hiển thị trước/sau cá theo độ sâu.
- Bố cục và nền tự lưu trong localStorage của trình duyệt. Không đồng bộ thiết bị. Làm lại xóa bố cục; có thể Hoàn tác trong phiên.
- Cá tự chọn mục tiêu và nhịp bơi: bơi thường, nhanh ngắn, lên, xuống, dừng 1–4 giây; đổi hướng giữa hồ. Tốc độ và tư thế chuyển mềm, vây chậm lại khi nghỉ. Cá không có mô phỏng va chạm với đá; có thể giao nhau khi khác lớp chiều sâu.

## Asset và bối cảnh
Danh mục tại public/progress.html và public/data.json. Nhóm đá B03/B04 đã dùng được để trang trí. Chưa có cây/lũa/hang. Cảnh trong nhà có ảnh; rừng/núi/đại dương/Everest vẫn là phác thảo Canvas, chưa phải ảnh nền hoàn chỉnh.

## GitHub / Vercel
Giải nén rồi đưa nội dung thư mục có package.json lên repo. Không upload nguyên ZIP để deploy. Import repo trên Vercel: Framework Other, Build npm run build, Output public. Không cần API key. Hướng dẫn GitHub chi tiết được giữ tại docs/README_v11.md. Chưa deploy lên Vercel thực tế.

## Kiểm tra
120.000 bước mô phỏng có seed ở 40%, 70%, 100% nước; đủ 5 trạng thái, đổi hướng giữa hồ, không vượt biên. Chrome: đặt đá, kéo và tải lại vẫn giữ bố cục. Chưa kiểm tra thiết bị cảm ứng thật.

`npm run export` xuất HTML chơi offline. scripts/export.cjs nhúng đủ ảnh và mã. public/ là phần triển khai; sprites/, docs/, archive/ giữ tài nguyên và lịch sử. Các tệp cũ chỉ để đối chiếu.
