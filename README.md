# RKB Portfolio 2026 — static site

Plain HTML, CSS and JS. No build step.

## Deploy on Netlify
- **Drag and drop:** app.netlify.com → your site → Deploys → drag this whole folder (or the zip) onto the drop zone.
- **Git:** push this folder to a repo and connect it. Build command: leave empty. Publish directory: `.`

## Before you go live
- Your résumé is included as `Reginald_Barawid_CV.pdf`. To update it, replace that file and keep the same name.

## Files
- `index.html` — the page
- `styles.css` — animations and the tablet/phone layouts
- `main.js` — work categories, galleries, full-size viewer, chart-on-scroll
- `assets/img/` — all images (WebP)
- `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` — RKB logo icons
- `og-image.jpg` — link preview image
- `netlify.toml` — caching headers

## Swapping an image
Replace the file in `assets/img/` keeping the same name, or point the `src` in index.html at a new file.
