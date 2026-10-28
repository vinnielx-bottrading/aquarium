# Đặc tả và nguồn tạo

Công cụ ảnh: built-in imagegen. Các mô tả dưới đây là bản đặc tả rút gọn để tiếp tục công việc, không khẳng định là bản chép nguyên văn mọi prompt.

- A01+A02 v01: wide empty dry glass aquarium, near frontal camera slightly showing right side and interior bottom, slim charcoal base, refined dimensional 2D illustration, neutral studio background; no water/fish/decor.
- A03: calm ivory room, light stone counter, subtle plant at extreme left, clear central space, natural daylight from upper left, no aquarium.
- A04: pale aqua to deep muted teal gradient, full bleed wide background, no objects.
- A05: translucent aqua water overlay rectangle, no container or surface waves. Kết quả AI chỉ lưu tham khảo vì viền và alpha.
- A06: shallow water surface plane, tiny ripples, transparent surround. Kết quả AI không đồng nhất hình học nên thay bằng khung kỹ thuật.
- A07: sparse diagonal pale white glass sheen and thin right gleam, alpha background. Kết quả AI chỉ tham khảo.
- A01 v02: extract glass aquarium only from approved original, remove base/room, clear alpha interiors. Kết quả chưa đạt kính trong nên archived_draft.
- A02 v02: extract low charcoal base only from approved original, remove tank/background, same perspective. Giữ làm tham chiếu hình vật liệu.

Các sprite runtime là hình học dựng mới bằng build_assets.py; không chỉnh sửa pixel hoặc giả định cắt ảnh AI thành lớp chính xác. Tọa độ, màu sắc, alpha và frame được định nghĩa đầy đủ trong mã nguồn.


## B01/B02 v01
- B01: fine pale golden beige sand bed, shallow wide parallelogram, near frontal elevated camera, thin front face, upper-left lighting, soft dimensional 2D, transparent background; no tank/plants/fish.
- B02: use B01 as reference; same geometry and lighting, replace sand with densely packed small rounded taupe/gray/ivory/brown pebbles.
- Tool: built-in imagegen. No code-generated replacement artwork for B01/B02.

## B03/B04
5 ảnh riêng bằng imagegen: small rounded pebble; small flat slab; small angular squat rock; tall asymmetrical standing rock; large elongated horizontal boulder. Common direction: muted gray/taupe, upper-left light, near-frontal elevated camera, dimensional painted 2D, transparent background. Results show halo/fringe; retained as drafts.

## C01/C02
Built-in imagegen; each one adult fish in right-facing exact side profile, neutral horizontal swimming pose, detailed painted 2D with dimensional shading, upper-left light and alpha background. C01: slim turquoise/teal, pale pearl belly, cyan lateral stripe, forked tail. C02: reference C01 rendering, amber/orange body and broad flowing fan tail. No labels, tank, water or scenery. Static master concepts only.

## C01 night glow
Imagegen edit of approved C01 right-facing master. Preserve identity/pose/proportions; reduce ambient light, teal/navy body, emissive cyan lateral stripe and delicate fin rays/edges, restrained bloom, natural eye, transparent background; no scenery. Complete night variant, not emission-only layer.
