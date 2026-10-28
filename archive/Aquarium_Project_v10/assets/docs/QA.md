# Kiểm tra A_v02

- 12 SVG parse thành công; 12 PNG tương ứng đều RGBA 1600 × 900.
- Góc ngoài canvas alpha 0 trên tất cả sprite runtime.
- Tâm kính trước alpha 0; tâm nước alpha nhỏ hơn 100/255.
- 8 ảnh nguồn được giữ nguyên; đường dẫn manifest đều tồn tại.
- Đã render và xem trực tiếp hai ảnh ghép hồ rỗng/có nước. Không còn nền trắng đục ở tâm kính runtime.
- Gợn nước gồm 4 frame khác nhau; chưa kiểm tra trực tiếp animation bằng browser do môi trường không có Chromium.
- preview.html đã tạo nhưng kiểm thử tương tác trình duyệt chưa hoàn thành; không gọi đây là bản gameplay đã test.
- Runtime là bản dựng kỹ thuật đơn giản hóa so với ảnh concept đã duyệt; cần duyệt mỹ thuật trước phát hành.
- Bơm nước trong preview là biến đổi lớp 2D minh họa, chưa mô phỏng chất lỏng vật lý.

## AB_v03
B01/B02 visually reviewed as generated; PNG dimensions and alpha channel inspected. Residual colored edge pixels visible; kept as draft pending cleanup. No compositing or in-game test performed for B. A tests above apply only to unchanged A sprites.

## C01/C02 v01
Both images visually checked for one fish, complete body/fins, right-facing pose and distinct palette/tail. RGBA dimensions recorded. Minor colored edge fringe remains; no game scale, animation or in-game alpha test performed.
