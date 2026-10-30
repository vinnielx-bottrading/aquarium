# Aquarium v18 — Rừng sương ngày và đêm
Cập nhật 30/10/2026. Giữ nguyên hai loài Ngọc Lam, Đuôi Nắng. Thêm hang cửa ngang, đầu sủi và bộ lọc.

## Bối cảnh rừng v18
Chọn **Bối cảnh → Rừng sương**. Bấm **Buổi tối / Ban ngày** để chuyển giữa hai ảnh nền cùng bố cục. Toàn màn hình hoạt động như trước.

- Hai ảnh nền chính thức: rừng ban ngày và rừng đêm. PNG nguồn và WebP trong public/assets; xem docs/FOREST_MANIFEST_v18.json và docs/FOREST_PROMPTS_v18.md.
- Ban ngày: nước xanh rêu nhẹ, ánh nắng ấm từ góc trái; ban đêm: nước xanh lạnh, ánh trăng dịu, giữ phát quang Ngọc Lam.
- Hồ được vẽ trên một lớp riêng rồi chỉnh màu/sáng đồng bộ cho cá, nền, vật trang trí, chân bể và kính. Độ che khuất hang giữ nguyên; không làm đá trong suốt. Ánh sáng rừng không ảnh hưởng cảnh khác.
- Nền rừng tĩnh, chưa có lá/rêu lay động. Ánh sáng là xử lý mỹ thuật 2.5D, không phải mô phỏng vật lý. Chưa thử trên điện thoại thật.
- Giữ hai loài cá và toàn bộ tránh vật cản v17. Ba bối cảnh còn lại vẫn là phác thảo.

## Chơi
`npm start` rồi mở http://localhost:3000. Không cần cài dependency.

- Vách sau và đường nối kính bên được vẽ trước cá. Viền mặt kính trước và phản sáng nhẹ vẫn ở phía trước.
- Cát/sỏi phủ kín mặt đáy, sát cả vách sau và hai bên theo phối cảnh; có mặt trước thể hiện chiều dày.
- **+ Thêm cát / + Thêm sỏi** chọn loại nền tương ứng và tăng một mức. **− Bớt nền** hạ một mức. Thanh độ dày có 8 mức; mức 0 trả về kính trống. Hiện dùng một chất liệu nền mỗi lần, chưa trộn nhiều lớp cát/sỏi.
- Đá, cây, hang, rêu nâng/hạ cùng nền. Vùng bơi điều chỉnh theo nền; nếu nước quá thấp, mực nước tự nâng tối thiểu để đủ chỗ cho cá.
- Khay vẫn hỗ trợ lọc, đặt/kéo, đổi kích thước, lật ngang, thu hồi, hoàn tác. Hoàn tác khôi phục cả chất liệu, độ dày nền và đồ trang trí. Bố cục tự lưu trên trình duyệt; bố cục v12/v13 được chuyển sang mặt nền mới khi tải.

## Cho ăn và giao diện v17
- Bảng công cụ nằm dưới hồ, có tab **Cho ăn** và **Trang trí**. Không phủ lên vùng bơi.
- Cho ăn: 8 hạt/lần, chờ 4 giây mô phỏng giữa các lần, tối đa 32 hạt đang tồn tại. Hạt chìm, lắc nhẹ và mờ dần; tự dọn sau 32 giây hoặc khi chạm nền. Có nút Dọn thức ăn.
- Mỗi cá chọn một hạt riêng trong phạm vi phát hiện; bơi đến, quay đúng hướng, ăn tại vùng miệng rồi nghỉ ăn 3 giây. Cá đang tìm hang đổi sang tìm thức ăn; cá đã vào hang hoàn tất chui vào, quay đầu và bơi ra qua cửa trước khi ăn.
- Hũ E01 là PNG/WebP được tạo bằng Imagegen. E02 là đồ họa Canvas, không phải bộ ảnh sinh bằng AI. Hành vi nằm ở feeding.js; cách vẽ/UI ở feeding-ui.js.
- Toàn màn hình hồ: bấm nút trên đầu trang. Chỉ hồ và nút Thoát hiện; giữ đúng tỉ lệ ảnh. Esc hoặc Thoát để trở lại. Nếu trình duyệt không hỗ trợ Fullscreen API, dùng chế độ phủ vùng xem của trang, thanh trình duyệt có thể vẫn hiện. Chưa thử trên iPhone thật.
- Tab có thao tác phím mũi tên/Home/End. Chọn vật trang trí tự đưa vùng hồ vào tầm nhìn; vẫn hỗ trợ chạm để đặt hoặc kéo thả.
- Giữ dữ liệu bố cục v12/v13/v14, lưu version 17. Thức ăn và lượt ăn không lưu giữa phiên.

## Cá trú ẩn v17
Chọn **Trang trí → Đá & hang → Hang đá cửa ngang**. Đặt gần giữa hồ, giữ cỡ mặc định 600 và nước đầy để thử. Bấm **Thử hang cửa ngang**; cá đi tới phía cửa mở, chui vào, nghỉ, quay đầu rồi ra cùng cửa. Dùng **Lật ngang** để đổi cửa trái/phải. Cá tìm đường vòng qua các vật cứng để đến cửa. Nếu cửa hoặc hành lang vào hang bị đồ khác chắn, cá không chọn hang đó. Một cá mỗi hang; hang nhỏ, sát vách hoặc không đủ nước sẽ bị từ chối.

Hai mẫu B05/B08 cũ chỉ còn là trang trí, không dùng để trú. Bố cục cũ được giữ. Cá không thu nhỏ hoặc mờ dần khi vào hang; vách đá che thân cá thật bằng lớp vẽ. Ban đêm đá giảm độ sáng nhưng vẫn kín. Di chuyển, lật, đổi cỡ, thu hồi hang hoặc đổi nền giải phóng cá về vùng bơi hợp lệ.

## Tránh vật cản v17
- Áp dụng khi bơi tự do, đi tìm thức ăn và tìm cửa hang. Đá, lũa, bình gốm, hang và thiết bị là vật cứng; cây/rêu là vật mềm, cá vẫn đi qua.
- Tìm đường bằng các góc vùng cản, cộng khoảng trống cho thân/vây và góc nghiêng cá. Kiểm tra cả đoạn di chuyển mỗi bước, không chỉ điểm cuối, để không xuyên vật khi tốc độ cao.
- Nếu không có lối thông, cá dừng ở phía có thể tiếp cận rồi chọn mục tiêu khác theo nhịp bơi. Hạt thức ăn chìm vào vật cứng được dọn, không kéo cá xuyên đá.
- Hang chỉ cho phép cá đang trú đi vào nội thất; vẫn kiểm tra đồ khác chắn cửa/hành lang. Cá bơi tự do không đi xuyên thân hang.
- Đặt/kéo/đổi cỡ đồ lên cá sẽ đưa cá về vùng nước trống gần nhất một lần. Đây là xử lý khi sửa bố cục, không phải chuyển động bơi. Thao tác làm mất toàn bộ vùng nước trống bị từ chối; thả cá khi không đủ chỗ cũng bị từ chối. Hạ mực nước giữ mức đủ vùng trống cho cá.
- Vùng cản được xét trên hình chiếu 2D, không chia làn theo độ sâu. Vì vậy cá có thể vòng xa hơn mép ảnh một chút; không chui qua kẽ lũa nhỏ. Tối đa 24 vật/12 cá như trước.
- Không tạo thêm ảnh hay loài cá trong đợt này. 19 vật đặt được và hai nền giữ nguyên.

## Thiết bị v17
- **Trang trí → Thiết bị → Đầu sủi khí**: đặt xuống nền, bật Máy sủi. Bọt phát từ từng đầu sủi ngập nước; không còn nguồn bọt vô hình cố định. Chưa đặt đầu sủi thì không có bọt/tiếng sủi.
- **Bộ lọc trong hồ**: đặt/kéo/lật/đổi cỡ; có dòng nước nhẹ ở vòi, bật/tắt bằng nút Bộ lọc. Đây là hiệu ứng hình ảnh, chưa có hệ độ sạch nước hay oxy.
- Tổng cộng 19 vật có thể đặt, thêm 2 lựa chọn nền. Giữ đúng hai loài cá.

## Phạm vi
Đây là mô phỏng 2.5D. Vật cứng dùng vùng bao chữ nhật bảo thủ; chưa bám sát từng nhánh lũa hoặc từng viên đá, chưa có tránh cá khác. Cây là sprite tĩnh. Chưa có sinh sản hoặc sprite há miệng riêng; hành vi ăn dùng bộ bơi/quay đầu sẵn có. Trong nhà và rừng có ảnh nền; núi, đại dương và Everest vẫn là phác thảo Canvas.

## GitHub / Vercel
Giải nén và đưa nội dung thư mục có package.json lên GitHub (không upload nguyên ZIP để deploy). Vercel: Framework Other, Build `npm run build`, Output `public`. Không cần API key. Chưa triển khai lên tài khoản Vercel của bạn. Hướng dẫn cũ chi tiết giữ tại docs/README_v11.md.

`npm test` kiểm tra mã, sprite, asset và hành vi. `npm run export` tạo exports/Aquarium_Play_v18.html độc lập, dùng WebP tối ưu, mở trực tiếp trong trình duyệt máy tính. public/assets giữ cả PNG nguồn và WebP; không cần công cụ chuyển ảnh để xuất lại.

Danh mục mới: public/progress.html, public/data.json, docs/ASSET_REGISTER_v18.csv. Vùng cửa: docs/SHELTER_MASKS.json. Các bản cũ và nguồn asset giữ trong archive/; tư liệu v11–v13 chỉ mang tính lịch sử.
