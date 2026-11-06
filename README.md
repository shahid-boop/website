# 🏠 Elite Home Care — Premium Home Maintenance Website

> **A home never felt this cared for — maintained tonight for the one you love.**

🌐 **Live Site:** [homecare.serveirc.com](https://homecare.serveirc.com)

## 📖 Overview

Elite Home Care is a premium single-page website (FiabaMia-inspired warm, storytelling
style) for a professional home maintenance company serving across Saudi Arabia.
It features an interactive **4-step booking wizard**, live bilingual **EN / عربي**
switching, a **care packages** section, FAQ, filterable services, review wall and a
light **optional sound experience** — all in vanilla HTML/CSS/JS.

## ✨ Features

- 🧾 **Booking wizard** — service → city → schedule → contact, with a live summary card that composes a pre-filled WhatsApp message on submit
- 🌐 **Full bilingual EN/عربي** — one-click toggle, RTL layout, Tajawal font
- 🎨 12 service cards with category filters + detail modal
- 💰 3 care packages (First Visit · Family Care · Elite Villa Contract) with WhatsApp quote links
- 🗓️ How-a-visit-is-made strip, animated stats counters, review wall, service-area chips
- ❓ FAQ accordion (bilingual)
- 🚨 Emergency section + floating WhatsApp / Call buttons
- 🔊 Optional WebAudio sound ticks & chime (off by default, user opt-in)
- 📱 Fully responsive · reduced-motion friendly · SEO/OG meta + inline SVG favicon

## 🧰 Tech Stack

| Layer | Tools |
|---|---|
| Structure | HTML5 (semantic, SEO + Open Graph meta) |
| Styling | CSS3 — glass-morphism, custom properties, responsive grid |
| Logic | Vanilla JavaScript (no frameworks) |
| Type | Playfair Display · Inter · Tajawal |
| Icons | Font Awesome 6.4 |
| Backend schema | Supabase (PostgreSQL) |

## 📁 Project Structure

```
website/
├── index.html            # Single page — all sections
├── premium-villa.css     # Design system + layout
├── premium-villa-app.js  # Data, wizard, bilingual engine, sound
└── supabase-schema.sql   # Database schema (bookings etc.)
```

## 🗄️ Supabase Setup

1. Create a project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** and run `supabase-schema.sql`
3. Wire the wizard's submit to insert a booking row (currently sends via WhatsApp)

## 🚀 Run Locally

No build step — plain static files. Open `index.html`, or serve:

```
npx http-server . -p 8080
```

## 🌐 Deployment

Live at [homecare.serveirc.com](https://homecare.serveirc.com) — files are served
from this repository.

## 📞 Contact

- 📱 Phone: [+966 59 786 5115](tel:+966597865115)
- 💬 WhatsApp: [Chat Now](https://wa.me/966597865115)
- 🌍 Serving across Saudi Arabia · 24/7 Emergency Service

---

© 2026 Elite Home Care. All rights reserved.
