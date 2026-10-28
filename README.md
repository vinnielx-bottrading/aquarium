# Aquarium v13 — Hoàn thiện asset nhóm B

Giữ nguyên hai loài cá Ngọc Lam và Đuôi Nắng, bộ sprite và bơi ngẫu nhiên của v12.

## Chơi và trang trí
`npm start` rồi mở http://localhost:3000. Không cần cài dependency.
Mở **Trang trí hồ** ở góc trái. Chọn loại vật phẩm, chọn mẫu rồi chạm gần đáy hồ hoặc kéo thả. Giữ khay mở để chọn và kéo đồ đã đặt. Có đổi kích thước, lật ngang, thu hồi và hoàn tác. Bố cục tự lưu trên trình duyệt này, giữ tương thích bố cục v12. Tối đa 24 vật.

Nhóm B gồm 13 hạng mục, 18 PNG: cát, sỏi; 3 đá nhỏ; 2 đá lớn; cụm đá khe trú; lũa thấp; lũa phân nhánh; hang đá; 2 cây thấp; 2 cây cao; thảm cỏ; rêu; bình gốm nghiêng. Rêu được đặt cao hơn mặt nền để phủ đá/lũa, nhưng không tự gắn hoặc di chuyển theo vật bên dưới.

## Phạm vi hoàn thiện
Toàn bộ B01–B13 có tài nguyên và đã tích hợp, mở sẵn để trang trí. Lịch chu kỳ vẫn là kế hoạch, chưa khóa vật phẩm bằng thời gian. Cây, rêu và đồ trang trí dùng sprite tĩnh. Hang/khe đá chưa điều khiển hành vi trú ẩn; cá chưa tránh vật cản. Chỉ cảnh trong nhà có ảnh nền hoàn chỉnh; bốn cảnh ngoài trời vẫn là bản vẽ Canvas.

Danh mục: public/progress.html. Danh sách chính xác và vùng crop khi vẽ: docs/GROUP_B_MANIFEST.json. Các ảnh gốc vẫn giữ nguyên; vùng crop không sửa nội dung PNG. Prompt sản xuất: docs/GROUP_B_PROMPTS.md. Nguồn asset cũ và lịch sử được giữ trong archive/.

## GitHub / Vercel
Giải nén, đưa nội dung thư mục có package.json lên GitHub (không đưa nguyên ZIP). Import repository vào Vercel, chọn Other, Build `npm run build`, Output `public`. Không cần API key. Chưa triển khai lên tài khoản Vercel của bạn. Hướng dẫn chi tiết được giữ ở docs/README_v11.md.

`npm test` kiểm tra JavaScript, tài nguyên và mô phỏng chuyển động cá. `npm run export` tạo bản HTML độc lập trong exports/. File này mở trực tiếp trên trình duyệt máy tính; trên điện thoại nên dùng bản web đã triển khai.

Bản HTML độc lập nhúng WebP đã tối ưu (khoảng 6,5 MB); PNG nguồn vẫn được giữ. public/assets có cả PNG và WebP để xuất lại không cần công cụ chuyển ảnh.
