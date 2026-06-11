# NOIR — Luxury Fragrance House (5 fragrances + ordering)

A bright, warm luxury perfume site. React + Vite + GSAP (ScrollTrigger).

## Run locally
```bash
npm install
npm run dev
```

## What's inside
- **Hero** with animated load + parallax bottle.
- **Manifesto** — words light up as you scroll.
- **The Collection** — 5 distinct fragrances (Noir, Aurore, Velours, Cèdre, Lumière), each with its own bottle colour, scent notes, price, and scroll animation.
- **Order form** — collects name, fragrance, quantity, contact, address, notes. Live total. Two actions:
  - **Send Order** opens an email with the order details (edit the address `orders@noirparfum.com` in `src/App.jsx`).
  - **Print Order** generates a clean printable receipt.
- Footer.

## Edit content
All in `src/App.jsx`:
- `FRAGRANCES` array — names, taglines, colours, notes, prices.
- Change the order email address in `handleEmail()`.
- Bottle colours are passed as props to `<Bottle>` (see `src/Bottle.jsx`).

## Deploy
Push to GitHub, import on Netlify/Vercel. Build: `npm run build`, publish dir: `dist`.

Bright palette, fully responsive, respects reduced-motion.
