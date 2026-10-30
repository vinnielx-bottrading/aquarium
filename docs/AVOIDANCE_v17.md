# Navigation / collision contract
avoidance.js owns static solid bounds, expanded by fish width .58 + 6 px and height .44 + 6 px on each side. Walls use the rendered cropped rectangle; all depths count. Plants remain permeable.
Visibility graph corners at 2 px outside expanded boxes, clipped to water/floor bounds. Dijkstra routes use segment/AABB intersection checks. Targets inside obstacles resolve to the closest reachable graph node. Cache invalidation: geometry/water/fish size or target moves >24 px; refresh after .65 simulation seconds. Every movement segment is checked even with a cached route.
Shelter entry is outside the solid full body. Enter/rest/turn/exit are exempt only for their owned cave; eligible() checks the full entry/interior corridor against every other solid. Geometry changes release residents.
prepare() handles spawn/layout changes with a nearest valid point. Normal movement never invokes penetration recovery unless geometry/bounds changed.
Future: tighter multi-polygon hulls for branches, depth lanes and fish-to-fish avoidance. Not implemented in v17.
