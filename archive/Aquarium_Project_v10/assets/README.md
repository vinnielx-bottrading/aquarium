# v07 — Tích hợp game v02

C01/C02 và C01_NIGHT_GLOW đã vào game v02. Nguồn giữ nguyên. Chuyển động procedural, chưa sprite sheet; glow chỉ theo sáng/tối, chưa hang. Đọc README gốc dự án để biết bản mới nhất. Các ghi chú chưa tích hợp bên dưới là lịch sử.

# CẬP NHẬT v06 — NGỌC LAM PHÁT QUANG

C01 ban ngày đã được duyệt; thêm C01_NIGHT_GLOW_RIGHT_v01, bản đêm chờ duyệt. Chi tiết quy tắc ánh sáng cục bộ tại assets/docs/C01_BIOLUMINESCENCE.md (hoặc docs/ bên trong thư mục assets). Game v01 chưa tích hợp cá.

# CẬP NHẬT v05 — HAI LOÀI CÁ THỬ

- C01_MASTER_RIGHT_v01: cá Ngọc Lam, thân xanh ngọc, bụng ngọc trai, đuôi chẻ.
- C02_MASTER_RIGHT_v01: cá Đuôi Nắng, thân vàng cam, đuôi xòe mềm.
- Mỗi loài: một PNG RGBA nhìn ngang, hướng phải, cá trưởng thành hư cấu.
- Trạng thái: bản thiết kế chờ người dùng duyệt; chưa khóa kích thước hiển thị, chưa phân đực/cái, chưa cá con hoặc hoạt ảnh. Có viền màu nhẹ cần kiểm tra khi ghép.
- Game HTML giữ nguyên v01: CHƯA có cá.
- Sau khi duyệt: làm bơi/đổi hướng, rồi tích hợp vào hồ; chưa triển khai săn đuổi hoặc sinh sản.

# CẬP NHẬT AB_v04

Bổ sung B03_01 đá tròn, B03_02 đá dẹt, B03_03 đá góc cạnh; B04_01 đá đứng, B04_02 đá ngang. Đây là ảnh nguồn chờ làm sạch quầng/viền và duyệt; chưa dùng trong game.

B01/B02 đã hiển thị trong game v01 bằng crop/clip lúc render; ảnh nguồn giữ nguyên. Chưa khóa mỹ thuật hoặc tính năng bố trí tự do.

# CẬP NHẬT AB_v03 — B01 & B02

Ngày 27/10/2026. Gói cộng dồn, giữ toàn bộ nhóm A_v02.

| Mã | Tệp | Trạng thái |
|---|---|---|
| B01 | source_images/B01_SAND_v01.png | Đã tạo; chờ duyệt và căn ghép |
| B02 | source_images/B02_GRAVEL_v01.png | Đã tạo; chờ duyệt và căn ghép |

B01: cát vàng kem hạt mịn, mặt nền gợn nhẹ. B02: sỏi tròn nhỏ màu kem/xám/nâu tự nhiên. Cả hai là lớp nền nguyên tấm, góc nhìn gần chính diện hơi từ trên xuống, cạnh ngắn lùi lên phải; ánh sáng trên trái; nền alpha.

Hai PNG giữ nguyên kết quả tạo ảnh. Chưa làm sạch viền màu còn sót, chưa crop/căn vào canvas A 1600 × 900, chưa duyệt trong game. Không ghi nhãn production-ready. Không phải texture nối lặp. Không dùng cả hai phủ kín chồng lên nhau; chọn một loại nền hoặc bổ sung mask vùng khi triển khai.

Thứ tự dự kiến: A01 floor → B01 hoặc B02 → đá/lũa/cây/cá → A05 nước → kính trước. Vùng đáy tham chiếu xem hình học nhóm A bên dưới. preview.html và ảnh ghép trong previews vẫn là bản kiểm tra nhóm A, chưa chứa B01/B02.

Đã cập nhật manifest và danh mục; B03–B13 vẫn planned. Quy tắc tiếp tục: giữ mã cố định, lưu ảnh nguyên gốc, cập nhật README và trạng thái mỗi đợt. Không thay thế bản đã duyệt.

---

# HỒ CÁ 2.5D — ASSET MASTER

Phiên bản bàn giao: **A_v02**, ngày 27/10/2026 (giờ Việt Nam).

## Ý tưởng đã thống nhất

Người chơi bắt đầu với hồ kính rỗng, tự trang trí nền và tiểu cảnh, bơm nước rồi thả cá. Có nhiều loài với tính cách khác nhau: cá dữ có thể đuổi/cắn cá hiền; cá cùng loài có thể sinh sản và tạo cá con. Điều kiện sinh sản (trưởng thành, giới tính, thức ăn, sức chứa) là đề xuất thiết kế, chưa phải cơ chế đã lập trình. Không mặc định mọi loài khác nhau đều đánh nhau.

## Trạng thái duyệt

- Người dùng đã duyệt ảnh tổng thể A01 + A02 v01: hồ kính trong, chữ nhật ngang, đế thấp màu xám than, nhìn gần chính diện hơi thấy cạnh phải và đáy.
- A03–A07 v01 đã được tạo nhưng không có xác nhận duyệt riêng từng ảnh.
- A_v02 hoàn thành bộ lớp kỹ thuật cho prototype nhóm A. Hình runtime được dựng riêng bằng mã SVG, không phải tách pixel chính xác từ ảnh gốc; cần người dùng duyệt hình runtime trước khi khóa mỹ thuật bản phát hành.
- A01 bản tách bằng AI còn đục kính/viền nhiễu. A05–A07 bản AI có viền nhiễu và alpha chưa phù hợp. Giữ nguyên để truy vết; KHÔNG dùng chúng làm sprite mặc định.
- Nhóm B–H mới là danh sách kế hoạch. Chưa có sprite cá, tiểu cảnh, âm thanh hoặc gameplay trong gói này.

## Nội dung gói

| Thư mục/tệp | Nội dung |
|---|---|
| source_images/ | 8 PNG nguyên gốc, gồm mẫu đã duyệt và các bản nháp; không chỉnh sửa |
| runtime/ | 12 lớp SVG + 12 PNG RGBA tương ứng, chung canvas 1600 × 900 |
| previews/ | Hai ảnh ghép: hồ rỗng và hồ có nước |
| preview.html | Xem ghép lớp ngoại tuyến, bật/tắt nước/phông/phản sáng, thử mực nước và 4 khung gợn |
| manifest.json | Mã, phiên bản, đường dẫn, trạng thái, z-order, hình học và checksum nguồn/SVG |
| docs/ASSET_REGISTER.csv | Danh mục toàn bộ mã A–H; các mục chưa làm ghi planned |
| docs/PROMPTS.md | Tóm tắt đặc tả ảnh và quyết định sửa kỹ thuật |
| docs/QA.md | Kết quả kiểm tra và giới hạn |
| build_assets.py | Dựng lại SVG/manifest; tự dùng ảnh nguyên gốc đã có trong source_images nếu không có thư mục generated_images |
| render_assets.cjs | Xuất PNG và ảnh ghép từ SVG, cần Node.js và sharp |

## Nhóm A — các lớp sử dụng

| Mã | Nội dung | Sử dụng |
|---|---|---|
| A01 | Kính sau, đáy, hai bên, viền trước | 4 sprite riêng; trung tâm viền trước alpha 0 |
| A02 | Chân đế xám than | runtime/A02_BASE_v02; bản AI riêng giữ ở source_images |
| A03 | Góc phòng và mặt bàn | source_images/A03_ROOM_v01.png; nền toàn cảnh |
| A04 | Phông xanh sau hồ | runtime/A04_BACKDROP_v02; tùy chọn, tắt để thấy phòng qua kính |
| A05 | Nước trong | runtime/A05_WATER_v02; alpha nhẹ, không che tiểu cảnh |
| A06 | Mặt nước | 4 sprite F00–F03; 4 fps, lặp; chuyển động minh họa đơn giản |
| A07 | Phản sáng kính | runtime/A07_REFLECTION_v02; lớp trước cùng |

## Hệ tọa độ và thứ tự ghép

Tất cả sprite runtime giữ nguyên canvas **1600 × 900**, gốc **(0,0)**. Không crop từng PNG tự động. Khi thay kích thước, scale toàn bộ cùng tỷ lệ.

- Mặt kính trước: trái 100, trên 235, phải 1360, dưới 695.
- Mặt kính sau: trái 220, trên 165, phải 1480, dưới 625.
- Polygon đáy: (100,695), (220,625), (1480,625), (1360,695).
- Mặt nước đầy: cạnh trước y=285; cạnh sau y=215; cách miệng hồ 50 px.
- Z từ sau ra trước: A03 → A02 → A04 → A01 rear → A01 floor → tiểu cảnh/cá (tương lai) → A05 → A06 → A01 sides → A01 front → A07.
- Cá và đồ vật cần z-sort theo độ sâu. Hang/lũa ở nhóm B cần lớp trước–sau riêng để che cá đúng.
- Đáy kính phản chiếu chỉ là màu nhẹ; chưa có phản chiếu động cá/cây.

## Cách xem và tái dựng

Giải nén toàn bộ, mở **preview.html** bằng trình duyệt. Các tệp sử dụng đường dẫn tương đối, không cần mạng. Nút Bơm nước là minh họa giao diện kỹ thuật; chưa phải gameplay.

Để dựng lại:

```sh
python build_assets.py
node render_assets.cjs
```

Node cần gói `sharp`. Python dùng thư viện chuẩn. Khi phân phối game có thể dùng PNG thay SVG, cùng kích thước và vị trí. A03 dùng như background nền và không nằm trong 12 sprite kỹ thuật.

## Quy tắc lưu trữ từ đây

1. Mỗi asset có mã cố định A01, B01…; biến thể và frame có hậu tố riêng.
2. Không ghi đè bản người dùng đã duyệt; tạo phiên bản mới.
3. Mỗi đợt tạo phải bổ sung README, manifest và ASSET_REGISTER; giữ cả nguồn và bản dùng trong game.
4. Phân biệt `planned`, `reference`, `archived_draft`, `user_approved_concept`, `prototype_ready_pending_user_visual_review`.
5. Không đánh dấu đã duyệt khi chưa có xác nhận người dùng; không coi ảnh tĩnh là animation hoàn chỉnh.
6. Khi sang nhóm B, dùng hình học runtime A_v02 để căn vị trí; giữ ảnh A01_A02_APPROVED_v01 làm tham chiếu mỹ thuật.

## Bước tiếp theo: nhóm B

B01 cát, B02 sỏi → B03/B04 đá → B05 khe trú/B08 hang → B06/B07 lũa → B09–B12 cây/cỏ/rêu → B13 bình gốm. Tạo từng món nền trong suốt, đồng nhất ánh sáng từ trên trái và góc nhìn. Chưa bắt đầu tạo nhóm B trong bản bàn giao này.

## Changelog

- v01: tạo mẫu A01+A02 được duyệt; tạo A03–A07 tham khảo.
- v02: bổ sung bản tách A01/A02 bằng AI, lưu đủ 8 ảnh nguồn; dựng 12 sprite kỹ thuật sạch alpha; xuất PNG/SVG, 2 ảnh ghép, preview, README và danh mục A–H.
