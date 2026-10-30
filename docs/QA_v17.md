# QA v17 — 29/10/2026
npm run build passed: JS/static references/atlases, original motion/habitat/feeding tests plus test-avoidance.cjs.
New regression checks: swept collision and arrival around rock/wood/pot/filter; low water and thick floor; placement recovery; two cave flips and two fish sizes; blocked cave entry; feeding detour; 24 objects/12 fish (6,000 simulated steps, about 300 ms Node runtime on this environment, not an FPS claim).
Chromium: game loaded with saved v16 layout, cave blocked by diffuser correctly refused; fullscreen rendered. Navigation fixture ran 2,200 actual motion steps: zero collision violations, reached other side of filter. Physical mobile devices not tested.
