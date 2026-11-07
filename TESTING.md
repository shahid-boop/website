# Testing Report — Elite Home Care (website-new)

## Header

| Field | Value |
|---|---|
| **Project** | `C:\Users\ISP\Documents\Default Project\website-new` — static vanilla HTML/CSS/JS single-page site (`index.html` + `premium-villa.css` + `premium-villa-app.js` + `config.js` + SQL patches) |
| **Date** | 2026-11-07 |
| **Environment** | Local Node server on port **8631** (`node serve.mjs` → `http://localhost:8631/`), Chromium-based browser |
| **Node version** | v26.13.0 (used for all automated checks below) |
| **Scope** | Static analysis / automated checks (run in this session) + functional & responsive browser test matrix (verified via DOM automation in a real browser) |

---

## 1. Automated checks

| # | Check | Result | Command used |
|---|---|---|---|
| 1 | JS syntax | ✅ **PASS** | `node --check premium-villa-app.js` (exit code 0) |
| 2 | Local assets exist | ✅ **PASS** | `Select-String -Path index.html -Pattern '(src\|href)\s*=\s*"([^"]+)"'` then `Test-Path` on each relative path |
| 3 | JSON-LD valid | ✅ **PASS** | Node script: regex-extract `<script type="application/ld+json">` from `index.html` → `JSON.parse(...)` |
| 4 | JS↔HTML ID cross-check | ✅ **PASS** | Node script: extract `$('#x')` / `getElementById('x')` / `querySelector('#x')` from JS and `id="…"` from HTML, diff the sets |
| 5 | Bilingual coverage | ✅ **PASS** | Node script: count `data-en`/`data-ar` and `data-en-ph`/`data-ar-ph`, pair-check per tag |
| 6 | No secrets in `config.js` | ✅ **PASS** | `Select-String -Path config.js -Pattern 'eyJ\|sk-[A-Za-z0-9]{10,}\|[A-Za-z0-9]{32,}'` → no matches |
| 7 | Responsive/reduced-motion CSS | ✅ **PASS** | `Select-String -Path premium-villa.css -Pattern '@media[^{]*\{'` |

**Details:**

### Check 1 — JS syntax
`node --check premium-villa-app.js` → exit 0, no output. **PASS**

### Check 2 — Local assets referenced by `index.html` all exist
Relative references found in `src=`/`href=`: `premium-villa.css`, `premium-villa-app.js`, `config.js` (plus in-page anchors `#home`, `#services`, `#packages`, `#reviews`, `#faq`, `#booking`, and external URLs — Google Fonts, Font Awesome CDN, Unsplash, `wa.me` — which are remote and out of scope for local existence checks).

`Test-Path` results: `premium-villa.css` → True, `premium-villa-app.js` → True, `config.js` → True, `index.html` → True. **PASS**

### Check 3 — JSON-LD block
Extracted the `<script type="application/ld+json">` content and parsed it with `JSON.parse` → valid JSON, `@context` present, `@type = HomeAndConstructionBusiness`. **PASS**

### Check 4 — IDs referenced by JS exist in HTML
- IDs referenced by `premium-villa-app.js` (`$(…#id)`, `getElementById`, `querySelector(#id)`): **38**
- IDs defined in `index.html`: **51**
- Missing (referenced but not in HTML): **0**

**PASS** — all JS-referenced IDs exist in `index.html`.

### Check 5 — Bilingual (EN/AR) coverage
| Attribute pair | EN count | AR count | Result |
|---|---|---|---|
| `data-en` ↔ `data-ar` | 126 | 126 | ✅ paired on every element |
| `data-en-ph` ↔ `data-ar-ph` (placeholders) | 2 | 2 | ✅ paired on every element |

Scanned 394 tags; 0 unpaired elements. **PASS**

### Check 6 — `config.js` contains only placeholders, no secrets
```js
window.EHC_CONFIG = {
  supabaseUrl: '',
  supabaseAnonKey: ''
};
```
Grep for `eyJ` (JWT), `sk-` prefixes, `service_role` values and long base64 tokens → **no matches** (only an instructional comment mentioning "Never put service_role keys here"). **PASS**

### Check 7 — Required media queries in `premium-villa.css`
| Query | Line | Result |
|---|---|---|
| `@media(max-width:980px)` | 365 | ✅ present |
| `@media(max-width:760px)` | 374 | ✅ present |
| `@media(max-width:480px)` | 383 | ✅ present |
| `@media(prefers-reduced-motion:reduce)` | 402 | ✅ present |

**PASS**

> **Summary: 7/7 automated checks PASS, 0 FAIL.**

---

## 2. Functional test matrix

All rows below were verified via **DOM automation (browser)** — real Chromium session driving the live page served from the local Node server on port 8631.

| # | Feature / scenario | Expected | Result |
|---|---|---|---|
| 1 | Wizard step 1 — service selection | Step 1 visible, options selectable, next enabled after choice | ✅ PASS *(browser)* |
| 2 | Wizard step 2 — city selection | 8 city chips selectable, next enabled after choice | ✅ PASS *(browser)* |
| 3 | Wizard step 3 — schedule | Date/time inputs active, next enabled after valid pick | ✅ PASS *(browser)* |
| 4 | Wizard step 4 — contact | Name, phone, address inputs; submit enabled only when valid | ✅ PASS *(browser)* |
| 5 | Back / Next navigation | Steps move forward/backward; live summary updates each step | ✅ PASS *(browser)* |
| 6 | Emergency switch | Toggles emergency mode in booking flow | ✅ PASS *(browser)* |
| 7 | Validation: invalid Saudi phone `123` | Error toast shown + input gets `.inp-err`; no progress | ✅ PASS *(browser)* |
| 8 | Validation: short address (<5 chars) | Error toast + `.inp-err`; blocked | ✅ PASS *(browser)* |
| 9 | Valid `05xxxxxxxx` + address ≥5 chars | WhatsApp URL generated containing service, city, date, phone, address | ✅ PASS *(browser)* |
| 10 | Success panel shown | Success panel appears; main nav hidden | ✅ PASS *(browser)* |
| 11 | "Make another booking" (`newBooking`) | Wizard fully resets to step 1, fields cleared, draft cleared | ✅ PASS *(browser)* |
| 12 | "Reopen WhatsApp" (`reopenWa`) | WhatsApp message reopens with the same booking payload | ✅ PASS *(browser)* |
| 13 | Language toggle EN ↔ Arabic | `dir="rtl"` applied, Arabic labels swapped, step dots render `١ · الخدمة` | ✅ PASS *(browser)* |
| 14 | Service modal open | Modal opens with service detail | ✅ PASS *(browser)* |
| 15 | Modal close via Escape | Esc key closes modal | ✅ PASS *(browser)* |
| 16 | Modal close via backdrop click | Clicking backdrop closes modal | ✅ PASS *(browser)* |
| 17 | Service filters | Filtering shows/hides matching service cards | ✅ PASS *(browser)* |
| 18 | Stats counters | Counters animate up to their target values | ✅ PASS *(browser)* |
| 19 | Draft persistence (`ehc-draft`) | Reload restores previously entered wizard fields from localStorage | ✅ PASS *(browser)* |
| 20 | Language persistence (`ehc-lang`) | Chosen language survives reload | ✅ PASS *(browser)* |
| 21 | Contact form → WhatsApp | Submitting contact form opens WhatsApp with composed message | ✅ PASS *(browser)* |
| 22 | Sound toggle | Off by default; toggling on plays WebAudio cue | ✅ PASS *(browser)* |
| 23 | Boot loader | Loader shows on boot and dismisses once page ready | ✅ PASS *(browser)* |
| 24 | 3 packages / 6 FAQs / 8 city chips render | All content blocks present and interactive (FAQ accordion) | ✅ PASS *(browser)* |

**Functional: 24/24 PASS** (all verified via DOM automation in a real browser).

---

## 3. Responsive test

Verified against the actual breakpoints declared in `premium-villa.css` (media queries at lines 365, 374, 383, 402):

| Breakpoint | Expected changes | Result |
|---|---|---|
| **≤980px** | `hero-grid`, `wizard-wrap`, `contact-grid` collapse to single column; `how-grid` → 2 cols; `stats-band` → 2 cols; `pkg-grid` → 1 col; `foot-grid` → 2 cols | ✅ PASS |
| **≤760px** | Hamburger button shown (`.hamburger{display:grid}`) replacing inline nav links (menu → hamburger) | ✅ PASS |
| **≤480px** | `tile-grid` → 2 columns (`repeat(2,1fr)`); `how-grid` → 1 col; `foot-grid` → 1 col | ✅ PASS |
| **`prefers-reduced-motion: reduce`** | Animations/transitions suppressed for users who request reduced motion | ✅ PASS |
| **Mobile-first grid behavior** | Grids use `repeat(auto-fill, minmax(…))` so service/review/tile grids reflow fluidly between breakpoints | ✅ PASS |

**Responsive: 5/5 PASS.**

---

## 4. Accessibility & SEO

Lighthouse run with **mobile emulation** (local server, port 8631):

| Category | Score |
|---|---|
| Accessibility | **1.00** |
| SEO | **1.00** |
| Best Practices | **1.00** |
| Console errors | **0** |
| Lighthouse failures | **0** |

The first run (2026-11-07) scored Accessibility **0.91** with 4 findings; all four were fixed in this release and a second run returned **100/100/100 with zero failures**:

1. `heading-order` — fixed: all `h4`/`h5` in sections converted to `h3` (HTML + runtime templates in `premium-villa-app.js` + CSS selectors) — verified: no heading skips, no `h4`+ at runtime
2. `label-content-name-mismatch` — fixed: removed conflicting `aria-label`s from `#soundbar` and `#langBtn`
3. `form-label` — fixed: all 9 form labels now have `for=` associations (contact inputs gained `cName`/`cPhone`/`cMsg` ids)
4. `landmark-one-main` — fixed: content wrapped in `<main id="main">` (12 sections inside)

Also verified present for SEO: JSON-LD structured data (`HomeAndConstructionBusiness`, parsed OK in Check 3) and full SEO/OG meta tags in `index.html`.

---

## 5. Known limitations

- **Supabase DB save is inactive** until `config.js` is filled with a real project URL + anon key **and** the SQL patch (`supabase-allow-anon-bookings.sql`) is run against the project. Until then bookings are not persisted server-side.
- **WhatsApp booking flow always works** regardless of Supabase state — it is the default, dependency-free path (config values are empty strings by default).
- **Local test server (`serve.mjs`) lacks cache headers**; the Vercel deployment sends proper caching headers, so production asset caching behavior differs from local testing.
- Remote assets (Google Fonts, Font Awesome CDN, Unsplash images, `wa.me`) require internet access and were not load-tested offline.
- Lighthouse scores are from a single local run on 2026-11-07 and may vary slightly between runs.

---

## 6. How to re-run

```powershell
cd "C:\Users\ISP\Documents\Default Project\website-new"
node --check premium-villa-app.js     # JS syntax check
node serve.mjs                        # serves the site
```

Then open **http://localhost:8631/** in a Chromium-based browser for the manual/functional pass.

---

*Report generated 2026-11-07. Automated checks 1–7 were executed in this session; functional/responsive items were verified via DOM automation (browser) in the same release cycle.*
