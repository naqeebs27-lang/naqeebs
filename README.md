# Naqeebs Multi Services — redesigned website

Static HTML/CSS/vanilla-JS site (no build step, no framework, no database). Every original URL is preserved
(`/services/`, `/pricing/`, `/loan-calculator/` …) and every tool keeps its original logic.

## Structure
```
index.html, 404.html
services/ pricing/ portfolio/ contact-us/            content pages   (each is <folder>/index.html)
age-calculator/ loan-calculator/ discount-calculator/ business-tax-calculator/ salaried-person-tax/   calculators
qr-code-generator/ bar-code-39/ bar-code-pdf417/ pdf-to-word/                                          apps
components/header.html, footer.html                  shared header + footer (edited once, used everywhere)
css/style.css        theme + layout (colors/fonts = variables at the top)
css/responsive.css   breakpoints: 1279 (hamburger nav), 992, 768, 576
css/tools.css        shared tool wrapper;  css/tools/<tool>.css = that tool's original CSS, scoped to .tool-<tool>
js/main.js           loads header/footer, highlights the current page, sets the footer year
js/navigation.js     hamburger menu + dropdowns (keyboard: Esc closes)
js/tools/<tool>.js   each tool's original JavaScript, moved out of the HTML
img/{logo,banner,services,testimonials,contact,icons}   optimized WebP + JPG/PNG fallback
_do-not-deploy/      unused images and private documents from the old site (see "Issues found"); excluded by firebase.json
firebase.json, .firebaserc                            Firebase Hosting config (project: naqeebz)
```

## Run / deploy
The header and footer are fetched with `fetch()`, so open the site through a web server (not by double-clicking a file):
`python -m http.server 8000` (then http://localhost:8000), XAMPP, or `firebase serve` / `firebase deploy`.
It works from any folder or sub-path because each page declares its depth: `<html data-root="../">`
(`""` for the home page, `"../"` for `folder/index.html`, `"/"` for `404.html`). `{{root}}` in the components is replaced by that value.

## How header/footer work
Every page contains `<div id="site-header"></div>` and `<div id="site-footer"></div>`. `js/main.js` loads
`components/header.html` / `footer.html` into them. Edit those two files to change menus, phone, address, etc. site-wide.
A `<noscript>` link row is included as a fallback.

## Common tasks
- **Colors:** edit the `:root` variables at the top of `css/style.css` (`--primary-color`, `--accent-color`, …).
- **Fonts:** change `--font-body` in `css/style.css`. It uses the system font stack (nothing to download). To use a web font, add it to `fonts/` and an `@font-face` rule.
- **Images:** put files in the matching `img/` subfolder. Export WebP + a JPG/PNG fallback and use `<picture>` (copy any existing one), with `width`/`height`, `alt`, and `loading="lazy"` below the fold.
- **New page:** copy `services/index.html` to `new-page/index.html`, keep `data-root="../"`, change title/description/`<main>`, then add a link in `components/header.html` (and footer).
- **Pricing:** edit the `.pcard` blocks in `pricing/index.html`.
- **Canonical URLs:** each page has a commented `<link rel="canonical" href="https://YOUR-DOMAIN/...">`. Replace `YOUR-DOMAIN` and uncomment once the final domain is decided (I did not want to invent it).
- **Minification:** not needed at this size (CSS ≈ 10 KB, JS ≈ 4 KB + tools). Any minifier works if you want it.

## Dependencies (loaded from CDNs, only on the page that needs them)
Chart.js (loan calculator, unpinned jsDelivr URL as in the original), qrcodejs (QR), JsBarcode (Code 39), bwip-js (PDF417), pdf.js 3.4.120 (PDF to Image).
Google Calendar + Google Maps embeds on the contact page. Consider pinning/self-hosting the libraries.

## What changed vs. the original
- WordPress core, theme, plugins (~1,900 files / 98 MB) removed; the deployable site is now ~1.5 MB (images 1.3 MB); the other ~13 MB in the ZIP is `_do-not-deploy/`.
- Old header/footer, 70 KB of inline WordPress CSS per page and inline scripts replaced by the shared CSS/JS above.
- Font Awesome (pricing icons) replaced by lightweight emoji icons to avoid an extra 3rd-party stylesheet + font download.
- No `about.html` was created because the original site has no About page (no content invented).

## Issues found in the original (and what I did)
1. **Salaried Person Tax only works for tax year 2027.** The source literally contains `// ... rest of your tax year logic unchanged ...`; the 12 other years returned Rs. 0. Now those years show "Slabs not added" instead of a wrong number. **You need to supply the slabs for the other years.** Please also double-check the 2027 slabs and that Business Tax 2025-2027 really use identical slabs — I could not verify tax law.
2. Footer was loaded from `/msn/footer.html` and its images from `/msn/wp-content/…` — this only works under XAMPP at `/msn/`, not on Firebase Hosting (root = the msn folder). Business Tax and PDF-to-Image pages had no footer at all. Fixed.
3. `firebase.json` pointed to a local path (`C:/xampp/htdocs/msn`); now `"public": "."`.
4. Favicon pointed to `uploads/2026/09/nmslogo.png`, which doesn't exist. New favicons generated from your logo.
5. **Private files were inside the public uploads folder:** `Login-Naqeebs-Multi-Services.docx`, letterhead `.docx` files and `OneDrive_2025-09-29.zip` (the old `firebase.json` only ignored `.zip`). I did not open them. They're now in `_do-not-deploy/` and excluded from deploys. Please check whether they were already served publicly, and change any credentials if that "Login" document contains any.
6. Services page heading was garbled ("Accou EBooks Writing Service ntancy Services") → "EBooks Writing Service".
7. Portfolio listed legalandgen.com twice (and mislabeled legalnlegal.com's image) → duplicate removed. Portfolio icons are hot-linked from other sites and may break; they hide themselves if they fail.
8. Several pricing descriptions are cut off with "…" in the source (e.g. "Just product…"). Kept verbatim — please complete them.
9. `/pdf-to-word/` is titled "PDF to Image" and really converts PDF pages to PNG (not Word). URL kept; consider renaming with a redirect.
10. Author and Category pages were WordPress placeholders ("Hello world!") not linked anywhere; not ported. `author/aqeebs/` was an empty file.
11. Barcode PDF417 page carries UI from another site that does nothing (checkboxes, "Create Sequence", "Refresh", "Subscribe to Our Free Newsletter!", `#` links, format/rotation dropdowns). Preserved as-is because you asked not to remove things — decide whether to hide them.
12. The upload also contained `.git`, `.vs` (incl. Visual Studio Copilot chat sessions) and `.firebase` caches; none are part of the site — avoid sharing/deploying them.
13. The contact page has no form (only the Google Calendar appointment embed and details) — nothing to preserve or fix there.

## Testing done
Headless Chromium at 1920/1440/1300/1280/1279/1200/992/768/576/375 px on all 14 pages + 404: header/footer load, no horizontal scroll, one `<h1>` per page, no JavaScript errors, all 302 relative links/images/CSS/JS references resolve. Calculators (discount, age, business tax, salaried tax) were exercised and give correct results; dropdown/hamburger menus verified.
**Not testable offline:** tools that need the CDN libraries (QR, both barcodes, PDF to Image, loan chart) — script order is correct and their JS is unchanged, but please click through them once after deploying. Only Chromium was tested.
