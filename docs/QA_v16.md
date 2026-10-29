# v16 QA — 29/10/2026
- npm run build: passed static JS, references, sprite atlases, 19 placeable items.
- Motion: 120,000 simulation steps; no escaped fish.
- Habitat: 72,000 floor/water-bound steps; side cave both flips entry/rest/turn/exit, occupancy, edits/removal, insufficient space/water.
- Feeding: consumption, exclusive targets, cap/cooldown/cleanup, exiting shelter before eating.
- Browser: placed side cave via tray; fullscreen; inspected entry tail at opening and resting occlusion using deterministic local QA fixture.
- Physical mobile devices not tested. No general pathfinding around every decoration. Filter flow is visual only.
