# Nguồn asset và phiên bản

Ảnh được tạo trong dự án Aquarium bằng công cụ imagegen; các bản nguồn và README lịch sử đều nằm trong archive. Giữ nguyên ảnh nguồn; các frame runtime được cắt theo alpha và căn vào ô 512×320, có thay kích thước để giữ tỷ lệ trình bày.

| Atlas | Nguồn | Khung |
|---|---|---:|
| C01_SWIM | archive/Aquarium_Project_v10/assets/source_images/C01_SWIM_SHEET_DRAFT_v02.png | 8 |
| C01_TURN | archive/Aquarium_Project_v10/assets/source_images/C01_TURN_SHEET_DRAFT_v01.png | 6 |
| C02_SWIM | archive/Aquarium_Project_v10/assets/runtime/C02/C02_SWIM_ATLAS_v01.png | 6 |
| C02_TURN | archive/C02_TURN_SOURCE_v01.png | 6 |

Prompt C02_TURN: technical 3×2 sprite sheet preserving reference golden-orange fan-tail fish; right profile, right three-quarter, near frontal right, near frontal left, left three-quarter, left profile; transparent alpha, no text or scene, complete fins.

Đính chính: một số QA lịch sử kết luận ảnh có nền vì xem RGB của PNG mà chưa thử alpha. Trạng thái hiện hành nằm ở public/data.json và docs/ATLAS_MANIFEST.json; ghi chép cũ chỉ dùng để đối chiếu.

Các PNG trong public/assets có thể trùng nội dung ở archive để website dùng đường dẫn ổn định. README các phiên bản cũ không phải hướng dẫn khởi chạy v11.
