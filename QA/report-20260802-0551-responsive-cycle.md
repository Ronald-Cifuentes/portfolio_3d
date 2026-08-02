# QA Report — Responsive Design Cycle

**Date:** 2026-08-02
**Scope:** Full application responsive design (all sections, all interactive states)
**Verified against:** production build (`pnpm build` → `pnpm preview`)

## Open defects

**None.**

## Closed defects

| ID | Severity | Location | Description | Evidence of closure |
|---|---|---|---|---|
| BUILD-001 | critical | `src/components/canvas/index.js`, `src/components/index.js` | `Computers.jsx` was deleted but still exported as `ComputersCanvas` → `pnpm build` exit 1. Pre-existing, not introduced by this cycle. | Dangling exports removed; `pnpm build` exit 0 |
| RESP-001 | medium | `src/components/Experience.css:259` | Experience tech-tag font-size 11.5px, below the 12px readability floor | Now 12px; 0 elements <12px measured at 16 widths |
| RESP-002 | medium | `src/components/Projects.css` | Carousel tag buttons 15–18px tall (below WCAG 2.2 AA 2.5.8 24×24), and tags on non-active slides were invisible (`opacity:0`) yet clickable and tabbable | Active tags 33.7×28.2px; non-active tags `pointer-events:none` + `visibility:hidden` (verified `nonOff=True` at all 16 widths) |
| RESP-003 | medium | `src/components/Navbar.jsx:73` | Mobile menu links 23px tall (1px under 24px) | Now 26px, verified chromium/firefox/webkit |
| RESP-004 | medium | `src/components/Projects.jsx`, `Projects.css` | Swiper pagination bullets are clickable but rendered 5.3–8.0px (`dynamicBullets` scaled them to 0.33×) | `dynamicBullets` removed; bullet hit area 24×24 with an 8px visual dot; 0 sub-24px targets at all 16 widths |
| REG-001 | critical | `src/components/Projects.jsx`, `Projects.css` | Regression introduced during the cycle: the carousel was rewritten from Swiper to a custom scroll-snap carousel, but the sizing CSS stayed keyed to the now-nonexistent `.swiper-slide` selector. Result: every card collapsed to **2px tall**, aspect-ratio computed `auto`, and the largest card fell to 500×667 (below the required 585×780). | Verified Swiper implementation restored from file history; largest card 720×960, ratio 0.7500 at all 16 widths |

## Final verification

Production build, 16 viewport widths (320 → 2560px):

- Card aspect ratio: **0.7500 (3:4) at every width**
- Largest card: **720×960** (requirement ≥585×780) — PASS
- Horizontal page overflow: **0px at every width**
- Interactive elements below 24×24: **0**
- Rendered text below 12px: **0**
- Non-active carousel slide tags: non-interactive and non-focusable at every width

Cross-engine + interactive states (chromium / firefox / webkit / reduced-motion / 375×667 / 768×1024):

```
[chromium 1440x900] i18n=True exp=7/7 slides=4 skills=10 filt=1 rest=4 ox=0/0 tiny=0 small=0 -> PASS
[chromium 375x667]  i18n=True exp=7/7 slides=4 skills=10 filt=1 rest=4 ox=0/0 tiny=0 small=0 -> PASS
[chromium 768x1024] i18n=True exp=7/7 slides=4 skills=10 filt=1 rest=4 ox=0/0 tiny=0 small=0 -> PASS
[reduced 1440x900]  i18n=True exp=7/7 slides=4 skills=10 filt=1 rest=4 ox=0/0 tiny=0 small=0 -> PASS
[firefox 1440x900]  i18n=True exp=7/7 slides=4 skills=10 filt=1 rest=4 ox=0/0 tiny=0 small=0 -> PASS
[webkit 1440x900]   i18n=True exp=7/7 slides=4 skills=10 filt=1 rest=4 ox=0/0 tiny=0 small=0 -> PASS
```

Filter chain verified end-to-end in every profile: Tech "Web Layout" → 10 skills → "Css" → carousel filters to 1 → toggle restores 4.

## Known limitations (not defects)

- `-webkit-box-reflect` is unsupported in Firefox; a masked flipped-copy fallback via `@supports` covers it.
- Two pre-existing HIGH dependency advisories remain open and are unrelated to responsive work: `react-router` (GHSA-qwww-vcr4-c8h2, **no stable fix published**) and `postcss` (GHSA-r28c-9q8g-f849, fixable via patch bump + pnpm override).
