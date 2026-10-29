# Aquarium v15 — Cho ăn, menu ngoài hồ và toàn màn hình
Cập nhật 29/10/2026. Giữ nguyên hai loài Ngọc Lam, Đuôi Nắng và đủ 18 tài nguyên nhóm B.

## Chơi
`npm start` rồi mở http://localhost:3000. Không cần cài dependency.

- Vách sau và đường nối kính bên được vẽ trước cá. Viền mặt kính trước và phản sáng nhẹ vẫn ở phía trước.
- Cát/sỏi phủ kín mặt đáy, sát cả vách sau và hai bên theo phối cảnh; có mặt trước thể hiện chiều dày.
- **+ Thêm cát / + Thêm sỏi** chọn loại nền tương ứng và tăng một mức. **− Bớt nền** hạ một mức. Thanh độ dày có 8 mức; mức 0 trả về kính trống. Hiện dùng một chất liệu nền mỗi lần, chưa trộn nhiều lớp cát/sỏi.
- Đá, cây, hang, rêu nâng/hạ cùng nền. Vùng bơi điều chỉnh theo nền; nếu nước quá thấp, mực nước tự nâng tối thiểu để đủ chỗ cho cá.
- Khay vẫn hỗ trợ lọc, đặt/kéo, đổi kích thước, lật ngang, thu hồi, hoàn tác. Hoàn tác khôi phục cả chất liệu, độ dày nền và đồ trang trí. Bố cục tự lưu trên trình duyệt; bố cục v12/v13 được chuyển sang mặt nền mới khi tải.

## Cho ăn và giao diện v15
- Bảng công cụ nằm dưới hồ, có tab **Cho ăn** và **Trang trí**. Không phủ lên vùng bơi.
- Cho ăn: 8 hạt/lần, chờ 4 giây mô phỏng giữa các lần, tối đa 32 hạt đang tồn tại. Hạt chìm, lắc nhẹ và mờ dần; tự dọn sau 32 giây hoặc khi chạm nền. Có nút Dọn thức ăn.
- Mỗi cá chọn một hạt riêng trong phạm vi phát hiện; bơi đến, quay đúng hướng, ăn tại vùng miệng rồi nghỉ ăn 3 giây. Cá đang tìm hang đổi sang tìm thức ăn; cá đã vào hang hoàn tất chui vào, quay đầu và bơi ra qua cửa trước khi ăn.
- Hũ E01 là PNG/WebP được tạo bằng Imagegen. E02 là đồ họa Canvas, không phải bộ ảnh sinh bằng AI. Hành vi nằm ở feeding.js; cách vẽ/UI ở feeding-ui.js.
- Toàn màn hình hồ: bấm nút trên đầu trang. Chỉ hồ và nút Thoát hiện; giữ đúng tỉ lệ ảnh. Esc hoặc Thoát để trở lại. Nếu trình duyệt không hỗ trợ Fullscreen API, dùng chế độ phủ vùng xem của trang, thanh trình duyệt có thể vẫn hiện. Chưa thử trên iPhone thật.
- Tab có thao tác phím mũi tên/Home/End. Chọn vật trang trí tự đưa vùng hồ vào tầm nhìn; vẫn hỗ trợ chạm để đặt hoặc kéo thả.
- Giữ dữ liệu bố cục v12/v13/v14, lưu version 15. Thức ăn và lượt ăn không lưu giữa phiên.

## Cá trú ẩn
Đặt **Hang đá (B08)** hoặc **Cụm đá khe trú (B05)**. Cá thỉnh thoảng tự chọn một chỗ trú đủ rộng và có cửa ngập nước; tối đa một cá cho mỗi hang. Cá bơi đến cửa, chui vào 3,5 giây, nghỉ 5–13 giây, quay đầu rồi bơi ra 3,5 giây; có khoảng nghỉ trước lượt trú tiếp.

Nút **Thử cá núp hang** kích hoạt một lượt tìm hang để dễ quan sát. Cá vẫn tự bơi đến cửa. Nếu hang quá nhỏ, đang có cá, hoặc chưa ngập đủ nước, game thông báo để điều chỉnh. Hai loài đều dùng bộ chuyển động hiện có.

Ảnh hang được chia lớp khi vẽ bằng vùng cửa polygon: lớp sau → cá → lớp đá phía trước cửa. PNG gốc giữ nguyên. Cá nhỏ dần theo chiều sâu và tối hơn khi vào hốc, có thể còn thấy một phần đuôi. Kéo/đổi cỡ/lật/thu hồi hang, đổi nền hoặc hoàn tác sẽ giải phóng cá về vùng bơi hợp lệ. Trạng thái trú tạm thời không lưu qua lần mở game.

## Phạm vi
Đây là mô phỏng 2.5D, chưa có tìm đường tránh mọi vật trang trí. Cây là sprite tĩnh. Chưa có sinh sản hoặc sprite há miệng riêng; hành vi ăn dùng bộ bơi/quay đầu sẵn có. Trong nhà có ảnh nền; bốn cảnh ngoài trời vẫn là phác thảo Canvas.

## GitHub / Vercel
Giải nén và đưa nội dung thư mục có package.json lên GitHub (không upload nguyên ZIP để deploy). Vercel: Framework Other, Build `npm run build`, Output `public`. Không cần API key. Chưa triển khai lên tài khoản Vercel của bạn. Hướng dẫn cũ chi tiết giữ tại docs/README_v11.md.

`npm test` kiểm tra mã, sprite, asset và hành vi. `npm run export` tạo exports/Aquarium_Play_v15.html độc lập, dùng WebP tối ưu, mở trực tiếp trong trình duyệt máy tính. public/assets giữ cả PNG nguồn và WebP; không cần công cụ chuyển ảnh để xuất lại.

Danh mục mới: public/progress.html, public/data.json, docs/ASSET_REGISTER_v15.csv. Vùng cửa: docs/SHELTER_MASKS.json. Các bản cũ và nguồn asset giữ trong archive/; tư liệu v11–v13 chỉ mang tính lịch sử.
