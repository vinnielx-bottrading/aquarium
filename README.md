# Aquarium v14 — Nền sát vách và cá trú ẩn
Cập nhật 29/10/2026. Giữ nguyên hai loài Ngọc Lam, Đuôi Nắng và đủ 18 tài nguyên nhóm B.

## Chơi
`npm start` rồi mở http://localhost:3000. Không cần cài dependency.

- Vách sau và đường nối kính bên được vẽ trước cá. Viền mặt kính trước và phản sáng nhẹ vẫn ở phía trước.
- Cát/sỏi phủ kín mặt đáy, sát cả vách sau và hai bên theo phối cảnh; có mặt trước thể hiện chiều dày.
- **+ Thêm cát / + Thêm sỏi** chọn loại nền tương ứng và tăng một mức. **− Bớt nền** hạ một mức. Thanh độ dày có 8 mức; mức 0 trả về kính trống. Hiện dùng một chất liệu nền mỗi lần, chưa trộn nhiều lớp cát/sỏi.
- Đá, cây, hang, rêu nâng/hạ cùng nền. Vùng bơi điều chỉnh theo nền; nếu nước quá thấp, mực nước tự nâng tối thiểu để đủ chỗ cho cá.
- Khay vẫn hỗ trợ lọc, đặt/kéo, đổi kích thước, lật ngang, thu hồi, hoàn tác. Hoàn tác khôi phục cả chất liệu, độ dày nền và đồ trang trí. Bố cục tự lưu trên trình duyệt; bố cục v12/v13 được chuyển sang mặt nền mới khi tải.

## Cá trú ẩn
Đặt **Hang đá (B08)** hoặc **Cụm đá khe trú (B05)**. Cá thỉnh thoảng tự chọn một chỗ trú đủ rộng và có cửa ngập nước; tối đa một cá cho mỗi hang. Cá bơi đến cửa, chui vào 3,5 giây, nghỉ 5–13 giây, quay đầu rồi bơi ra 3,5 giây; có khoảng nghỉ trước lượt trú tiếp.

Nút **Thử cá núp hang** kích hoạt một lượt tìm hang để dễ quan sát. Cá vẫn tự bơi đến cửa. Nếu hang quá nhỏ, đang có cá, hoặc chưa ngập đủ nước, game thông báo để điều chỉnh. Hai loài đều dùng bộ chuyển động hiện có.

Ảnh hang được chia lớp khi vẽ bằng vùng cửa polygon: lớp sau → cá → lớp đá phía trước cửa. PNG gốc giữ nguyên. Cá nhỏ dần theo chiều sâu và tối hơn khi vào hốc, có thể còn thấy một phần đuôi. Kéo/đổi cỡ/lật/thu hồi hang, đổi nền hoặc hoàn tác sẽ giải phóng cá về vùng bơi hợp lệ. Trạng thái trú tạm thời không lưu qua lần mở game.

## Phạm vi
Đây là mô phỏng 2.5D, chưa có tìm đường tránh mọi vật trang trí. Cây là sprite tĩnh. Chưa có cho ăn, sinh sản. Trong nhà có ảnh nền; bốn cảnh ngoài trời vẫn là phác thảo Canvas.

## GitHub / Vercel
Giải nén và đưa nội dung thư mục có package.json lên GitHub (không upload nguyên ZIP để deploy). Vercel: Framework Other, Build `npm run build`, Output `public`. Không cần API key. Chưa triển khai lên tài khoản Vercel của bạn. Hướng dẫn cũ chi tiết giữ tại docs/README_v11.md.

`npm test` kiểm tra mã, sprite, asset và hành vi. `npm run export` tạo exports/Aquarium_Play_v14.html độc lập, dùng WebP tối ưu, mở trực tiếp trong trình duyệt máy tính. public/assets giữ cả PNG nguồn và WebP; không cần công cụ chuyển ảnh để xuất lại.

Danh mục mới: public/progress.html, public/data.json, docs/ASSET_REGISTER_v14.csv. Vùng cửa: docs/SHELTER_MASKS.json. Các bản cũ và nguồn asset giữ trong archive/; tư liệu v11–v13 chỉ mang tính lịch sử.
