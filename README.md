# Only Used Tesla — Homepage + Navigation Prototype (Static)

This folder is a **static HTML/CSS/JS prototype** for the OnlyUsedTesla.com homepage.

**Goals of this prototype**
- Reduce navigation clutter (keep top-level items focused on revenue flows)
- Mobile-first layout with **large, fat-finger touch targets**
- Grayscale, image-free, high-contrast UI (conversion-first)
- Communicate page hierarchy + CTA priorities to a backend/dev team

## What’s included
- `index.html` — homepage prototype
- `styles.css` — all styling (no frameworks)
- `script.js` — small UX helpers (drawer menu, tabs, cookie banner)
- `assets/logo.svg` — placeholder mark

## Navigation structure (proposed)
Primary nav links (desktop):
- Shop
- Sell
- Cash offer
- OUT‑Check
- PAY‑OUT
- AI agent
- **More** (UK site, Dealers, Payment, Blog, Contact)

Mobile:
- Hamburger opens a full-height drawer with **big links + big account buttons**.

## Homepage structure
1. Hero copy (value prop)
2. Primary action card with tabs:
   - **Shop**: search fields + Search button
   - **Sell**: Buy an ad / Get cash offer / Get report + AI agent CTA
3. Product grid (6 cards)
4. “Private seller conversion flow” section (ad + report + account CTA)

## Notes for your backend dev
- All links are placeholders (`href="#"` or section anchors).
- Replace anchors with real routes once the app wiring is ready.
- The UI is intentionally grayscale + minimal right now.

