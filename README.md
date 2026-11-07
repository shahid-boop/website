# 🏠 Elite Home Care — Premium Home Maintenance Website

> **A home never felt this cared for — maintained tonight for the one you love.**

🌐 **Live Site:** [homecare.serveirc.com](https://homecare.serveirc.com)

## 📖 Overview

Elite Home Care is a premium single-page website (FiabaMia-inspired warm, storytelling
style) for a professional home maintenance company serving across Saudi Arabia.
It features an interactive **4-step booking wizard**, live bilingual **EN / عربي**
switching, **care packages**, FAQ, filterable services, review wall and a light
**optional sound experience** — all in vanilla HTML/CSS/JS.

## ✨ Features

- 🧾 **Booking wizard** — service → city → schedule → contact, with live summary card, Saudi mobile validation, required service address, and a success panel ("booking written") with **Reopen WhatsApp** / **Make another booking**
- 🌐 **Full bilingual EN/عربي** — one-click toggle, RTL layout, Tajawal font (persisted in `localStorage`)
- 🎨 12 service cards with category filters + detail modal (Esc / backdrop close)
- 💰 3 care packages (First Visit · Family Care · Elite Villa Contract) with WhatsApp quote links
- 🗓️ How-a-visit-is-made strip, animated stats counters, review wall, service-area chips
- ❓ FAQ accordion (bilingual)
- 🚨 Emergency section + floating WhatsApp / Call buttons
- 🔊 Optional WebAudio sound ticks & chime (off by default, user opt-in)
- ⏳ **Boot loader** branding screen, skip-link, focus-visible rings, reduced-motion support
- 📱 Fully responsive (mobile-first) · SEO/OG/Twitter meta + JSON-LD `HomeAndConstructionBusiness` + inline SVG favicon

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Structure | HTML5 (semantic, SEO + Open Graph + JSON-LD) |
| Styling | CSS3 — glass-morphism, custom properties, responsive grid |
| Logic | Vanilla JavaScript (no frameworks) |
| Type | Playfair Display · Inter · Tajawal |
| Icons | Font Awesome 6.4 |
| Backend (optional) | Supabase (PostgreSQL + RLS) |

## 📁 Project Files

```
website/
├── index.html                       # Single page — all sections
├── premium-villa.css                # Design system + layout
├── premium-villa-app.js             # Data, wizard, bilingual engine, sound
├── config.js                        # Optional Supabase runtime config (public-safe)
├── supabase-schema.sql              # Database schema (bookings etc.)
└── supabase-allow-anon-bookings.sql # Optional RLS patch for guest bookings
```

## 🗄️ Supabase Setup (optional — WhatsApp flow works without it)

The wizard **always works** via WhatsApp. To *also* save bookings to your database:

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase-schema.sql` in the SQL Editor (original schema)
3. Open **Project Settings → API**:
   - copy **Project URL** → `config.js` → `supabaseUrl`
   - copy **anon public key** → `config.js` → `supabaseAnonKey`
4. Run `supabase-allow-anon-bookings.sql` **once** — the original RLS
   (`bookings_customer_insert WITH CHECK (customer_id = auth.uid())`) only allows
   signed-in users to insert; this patch lets guests insert `pending` bookings
   (`customer_id IS NULL`). Reversible: `DROP POLICY bookings_guest_insert ON bookings;`
5. Deploy. Booking rows appear in the `bookings` table; the WhatsApp message flow is unchanged.

> ⚠️ Never put the `service_role` key in `config.js`. The anon key is public-safe; RLS protects data.

## 🚀 Run Locally

No build step — plain static files. Open `index.html`, or serve:

```
npx http-server . -p 8080
```

## 🌐 Deployment

Live at [homecare.serveirc.com](https://homecare.serveirc.com) — auto-deployed
from this repository via Vercel.

## 📞 Contact

- 📱 Phone: [+966 59 786 5115](tel:+966597865115)
- 💬 WhatsApp: [Chat Now](https://wa.me/966597865115)
- 🌍 Serving across Saudi Arabia · 24/7 Emergency Service

---

© 2026 Elite Home Care. All rights reserved.
