# v18 QA — 30/10/2026
- npm run build: JavaScript, asset references/atlases, motion, habitat, feeding and obstacle navigation passed.
- Browser Chromium: forest day and night rendered in fullscreen; tank base sits on the stone counter; water/tank palette changes; blue fish glow remains visible at night.
- Switched forest -> room -> day; correct UI selection, no page-origin error logs.
- Lighting is applied after tank composition, preserving opaque cave masks.
- Standalone export embeds both WebP backdrops and forest-light.js; node syntax check passed.
- No physical mobile/device performance verification. Static backdrops; no leaf animation.
