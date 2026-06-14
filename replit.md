# Greenwood General Contracting Website

A complete premium static website for Greenwood General Contracting — a residential construction and renovation company located at 481 Dogwood Ave, West Hempstead, NY 11552, reachable at (516) 565-4658.

## Run & Operate

- `pnpm --filter @workspace/greenwood run dev` — run the Vite dev server (port 22740, proxied at `/`)
- Required env: none (pure static site, no backend)
- Workflow: `artifacts/greenwood: web` — Vite serving `public/` as static files

## Stack

- Pure HTML + CSS + Vanilla JS — no React, no TypeScript, no Tailwind
- Vite as static dev server (React plugin stripped)
- Google Fonts: Playfair Display (serif headings) + Inter (sans body)
- Section-based architecture via `sectionLoader.js`

## Where things live

```
artifacts/greenwood/
  index.html                    — Page shell, meta/OG/schema.org, font imports, mount points
  vite.config.ts                — Strips React plugin; serves public/ as static files
  public/
    styles/
      variables.css             — Design tokens (colors, type scale, spacing, z-index)
      reset.css                 — Browser normalization
      global.css                — Base elements, .btn variants, .reveal animation, mobile bar
      utilities.css             — .section-label, helpers
      responsive.css            — Breakpoints, layout utilities
    scripts/
      sectionLoader.js          — Async section HTML → CSS → JS injector, fires sections:loaded
      main.js                   — Scroll reveal (IntersectionObserver), smooth scroll, active nav highlight, footer year
    sections/
      header/                   — Sticky nav with mobile hamburger menu
      hero/                     — Full-viewport two-column hero with staggered entrance
      trust/                    — Trust bar (established, family-owned, responsive)
      services/                 — Service cards grid (6 services)
      about/                    — About / family story section
      showcase/                 — Project photo grid (Unsplash demo images)
      process/                  — 5-step project process
      reviews/                  — 5 real customer review cards
      whyGreenwood/             — 4 differentiator blocks on forest green
      faq/                      — Accessible accordion FAQ (6 questions)
      quote/                    — Estimate request form (validated, demo success state)
      location/                 — Address, phone, Google Maps embed
      finalCta/                 — Closing CTA band
      footer/                   — Logo, 3-column nav, copyright, demo notice
    README.txt                  — Going-live checklist for the client
```

## Architecture decisions

- Sections load sequentially (HTML → CSS → JS) to avoid FOUC; `sections:loaded` event fires when all complete.
- All content is strictly limited to verifiable public data — no invented email, hours, license, or project names.
- `noindex, nofollow` meta tag present; must be removed before going live.
- Demo images use Unsplash CDN URLs and must be replaced with real project photography before launch.
- Form has a simulated success state; must be wired to a real handler (Formspree, Netlify Forms, etc.) before launch.

## Product

A 14-section premium contractor website with smooth scroll, reveal animations, sticky navigation, mobile action bar (Call + Estimate), FAQ accordion, estimate form with validation, embedded map, and real customer review quotes sourced from public Google reviews.

## User preferences

_Populate as you build — explicit user instructions worth remembering across sessions._

## Gotchas

- Hero text appears invisible in static screenshots due to `requestAnimationFrame` timing in hero.js — works correctly in the real browser.
- Do NOT run `pnpm dev` at workspace root; use `restart_workflow` to control the Vite server.
- Sections load sequentially (not in parallel) to avoid race conditions on CSS injection.

## Going Live Checklist

1. Replace Unsplash demo images with licensed project photography
2. Wire the estimate form to a real backend / form provider
3. Replace the Google Maps embed `src` in `location.html` with the verified embed code
4. Remove `<meta name="robots" content="noindex, nofollow">` from `index.html`
5. Remove the demo notice in `footer.html`
6. Add Google Analytics or preferred analytics
7. Run Lighthouse audit and address any performance/accessibility findings
