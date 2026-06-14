GREENWOOD GENERAL CONTRACTING — WEBSITE DEMO
=============================================

This is a professional website demonstration for Greenwood General Contracting
(West Hempstead, NY). It is built as a static site using pure HTML, CSS, and
Vanilla JavaScript served via Vite.

IMPORTANT NOTICES
-----------------

1. DEMO STATUS
   This site is tagged <meta name="robots" content="noindex, nofollow"> and is
   not intended for public indexing until the owner reviews and approves the
   content and activates the site.

2. IMAGES
   All project showcase images are loaded from Unsplash CDN for demonstration
   purposes only. Before going live, replace each src URL with licensed images
   of actual Greenwood General Contracting projects.

3. CONTACT FORM
   The estimate request form currently shows a simulated success state. Wire
   it to a real form-handling backend (e.g., Formspree, Netlify Forms, a
   custom POST endpoint) before launch.

4. GOOGLE MAPS EMBED
   The location map uses a placeholder embed URL. Replace the <iframe> src in
   sections/location/location.html with the verified Google Maps embed code
   from the Google Maps embed tool for the exact address.

5. VERIFIABLE DATA ONLY
   All content on this site is limited strictly to information found in public
   records, Google Business listings, and customer reviews. No email address,
   license number, insurance details, business hours, or project names have
   been invented.

FILE STRUCTURE
--------------

public/
  index.html (or root)          — Page shell, fonts, meta tags
  styles/
    variables.css               — Design tokens (colors, type scale, spacing)
    reset.css                   — Browser normalization
    global.css                  — Base element styles, btn component
    utilities.css               — Helper classes
    responsive.css              — Breakpoints and layout utilities
  scripts/
    sectionLoader.js            — Async section HTML/CSS/JS injector
    main.js                     — Scroll reveal, smooth scroll, mobile bar
  sections/
    header/                     — Sticky nav with mobile menu
    hero/                       — Full-viewport hero with CTA
    trust/                      — Established, family-owned, responsive trust bar
    services/                   — Service cards grid
    showcase/                   — Project photo grid
    process/                    — 5-step project process
    reviews/                    — Customer review cards
    whyGreenwood/               — Differentiator block cards
    faq/                        — Accordion FAQ
    quote/                      — Estimate request form
    location/                   — Address, phone, map embed
    finalCta/                   — Forest-green closing CTA band
    footer/                     — Logo, nav columns, copyright

GOING LIVE CHECKLIST
--------------------
[ ] Replace Unsplash demo images with real project photography
[ ] Wire estimate form to a real backend / form provider
[ ] Confirm and replace Google Maps embed code
[ ] Confirm business hours and add to contact details if desired
[ ] Remove or update the demo notice in the footer
[ ] Remove <meta name="robots" content="noindex, nofollow"> from index.html
[ ] Add Google Analytics or other analytics script
[ ] Test on mobile (iOS Safari, Android Chrome) and all major desktop browsers
[ ] Run Lighthouse audit and address performance/accessibility findings
