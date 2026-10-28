# Aquarium 2.5D — v0.11.0

Game hồ cá chạy trên trình duyệt, sẵn cấu trúc để đưa lên GitHub và triển khai Vercel. Không cần API key, cơ sở dữ liệu hoặc thư viện bên ngoài.

## Đã làm xong trong đợt này

- Ngọc Lam: bộ bơi 8 khung và quay đầu 6 góc đã tích hợp.
- Đuôi Nắng: bộ bơi 6 khung và quay đầu 6 góc đã tích hợp.
- Hai loài dùng atlas PNG alpha, thay biến dạng ảnh và co ngang để giả quay đầu.
- Nút **Thử quay đầu** trong hồ; trang **Kiểm tra hoạt ảnh** để xem riêng hai loài.
- Ánh xanh ban đêm của Ngọc Lam áp dụng lên khung hình đang chạy; ánh vảy Đuôi Nắng ban ngày. Ánh xanh là hiệu ứng shader Canvas toàn sprite, chưa phải emissive mask riêng cho từng sọc/vây.
- Giữ 5 bối cảnh, bơm/xả nước, cát/sỏi, gợn, bọt, thêm/bớt cá.
- Trang tiến độ cùng dự án, 71 hạng mục và lộ trình nội dung.
- Tách ảnh, CSS và JS khỏi HTML nhúng; cấu hình Vercel và lệnh kiểm tra tự động.

Đây là bản prototype đã chạy được. Chưa có bơi nhanh/ăn/hoảng sợ riêng, cá con, sinh sản, săn đuổi, kéo thả tiểu cảnh, hang tối, mở khóa theo ngày hoặc lưu hồ. Các góc quay là 6 tư thế rời, có thể thấy chuyển tư thế ở tốc độ chậm; chưa phải hoạt ảnh 3D liên tục. Bốn bối cảnh mới ngoài phòng vẫn là phác thảo Canvas.

## Chạy thử trên máy

Cài Node.js phiên bản LTS từ 20 trở lên. Mở Terminal tại thư mục có `package.json`:

```sh
npm test
npm start
```

Mở http://localhost:3000. Không cần `npm install` vì không có dependency.

- `/` — game
- `/progress.html` — tiến độ và asset
- `/sprites.html` — kiểm tra bơi/quay đầu

Nên chạy qua HTTP để trang tiến độ tải được JSON. `npm start` chỉ phục vụ máy cá nhân; Vercel phục vụ trực tiếp thư mục `public`.

## Đưa lên GitHub

Giải nén ZIP. Mở đúng thư mục chứa `package.json`, `vercel.json`, `public/`, không đưa nguyên ZIP vào repository rồi mong Vercel tự giải nén.

Cách dễ: GitHub Desktop → Add local repository → chọn thư mục đã giải nén → tạo repository tại thư mục này nếu chưa có → commit → Publish repository.

Hoặc tạo một repository trống trên GitHub và chạy (thay URL mẫu bằng repo của bạn):

```sh
git init
git add .
git commit -m "Aquarium v11: fish sprites and Vercel package"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

Gói có archive lớn để giữ đầy đủ lịch sử asset; dùng GitHub Desktop/Git sẽ thuận tiện hơn kéo thả nhiều tệp qua web. Không cần Git LFS cho các tệp hiện tại. Không có `.git` hay tài khoản/credential của người tạo trong gói.

## Triển khai Vercel

Vercel → Add New Project → Import Git Repository → chọn repo vừa tạo.

| Thiết lập | Giá trị |
|---|---|
| Framework Preset | Other |
| Root Directory | Thư mục có package.json và vercel.json; để mặc định nếu nằm ở gốc repo |
| Build Command | npm run build |
| Output Directory | public |
| Environment Variables | Không cần |

`vercel.json` đã đặt framework, build command và output directory. Build chỉ chạy kiểm tra; tệp static đã sẵn trong public. Nếu từng có cấu hình Production Override của dự án cũ, kiểm tra lại các giá trị trong bảng.

Bấm Deploy. Sau khi có URL, kiểm tra game, progress.html, sprites.html và nút Thử quay đầu. Các lần push sau sẽ đi theo thiết lập Git integration của dự án Vercel.

Chưa triển khai lên tài khoản GitHub/Vercel của bạn trong lần bàn giao này; chưa có URL Vercel được xác nhận.

Tài liệu chính thức đã đối chiếu ngày 28/10/2026:
- https://vercel.com/docs/project-configuration/vercel-json
- https://vercel.com/docs/builds/configure-a-build

## Cấu trúc

- `public/`: toàn bộ phần được Vercel phục vụ.
- `public/assets/`: PNG dùng trong game và trang tiến độ.
- `public/animation.js`: cách chọn khung bơi/quay.
- `public/game.js`: vòng lặp game và tương tác.
- `sprites/`: các khung PNG rời để tiếp tục chỉnh sửa.
- `docs/`: trạng thái, atlas manifest, nguồn asset và QA.
- `scripts/`: kiểm tra và server chạy thử, chỉ dùng Node built-in.
- `archive/Aquarium_Project_v10/`: giữ nguyên toàn bộ gói v10 và các phiên bản nó kế thừa.
- `archive/C02_TURN_SOURCE_v01.png`: ảnh nguồn quay đầu Đuôi Nắng mới.

Chỉ `public/` được deploy. Archive nằm trong repo nhưng không được phục vụ lên website. Nếu repository công khai thì người xem repo vẫn đọc được archive.

## Tiến độ và dữ liệu

`public/data.json` là danh mục chuẩn ban đầu của v11. Các sửa đổi trên trang tiến độ lưu trong localStorage của từng trình duyệt, không tự đồng bộ GitHub hoặc thiết bị. Dùng **Tải tiến độ JSON** để sao lưu. Game chưa lưu đàn cá khi tải lại trang. Website cũ trong ChatGPT không tự cập nhật theo gói này.

Không tự gán giấy phép mã nguồn hay asset cho dự án; xem nguồn tạo ở docs/ASSET_PROVENANCE.md trước khi bạn chọn giấy phép phát hành.

## Xuất HTML chơi offline

Chạy `npm run export` để tạo `exports/Aquarium_Play_v11.html` chứa ảnh và mã nhúng. File này mở trực tiếp không cần server, không có trang tiến độ; thư mục exports được bỏ qua khi commit để tránh trùng dữ liệu.
