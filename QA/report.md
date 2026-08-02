# QA Report — Progressive Tech Filter

**Date:** 2026-08-02 **Iteration:** 3–4 **Scope:** Tech section three-stage progressive drill-down
filter (idle / category / tech), CSS-only enter & exit motion, pure-CSS tooltips, 2px hover border,
removal of the JS hover animation. **Files:** `src/components/Tech/Tech.jsx`, `Tech.css`,
`src/components/ProjectShowcase/ProjectShowcase.jsx`, `ProjectShowcase.css`,
`src/constants/i18n.json`

> The previous cycle's report (responsive design) is preserved at
> `QA/report-20260802-0551-responsive-cycle.md`.

**Authorship note:** written by the orchestrator from the qa-engineer's iteration-3 measurements
(`logs/20260802-2210-QA_Engineer.md`) plus the orchestrator's own cross-engine verification. The
qa-engineer reported it could not write this file. Every number below is traceable to a JSON
artifact in `logs/`; nothing here is a self-report.

## Open defects

**None.**

That conclusion rests on:

- `logs/20260802-2010-orchestrator-verify.json` — stage machine, heights, empty state, border,
  overflow
- `logs/20260802-2045-orchestrator-verify2.json` — per-tag reset affordances, tooltips, spotlight,
  reduced motion
- `logs/20260802-2100-orchestrator-verify3.json` — full round trip, orphan card, selected-card
  tooltip
- `logs/20260802-2130-orchestrator-targets.json` — touch targets, 3 engines × 2 viewports
- `logs/20260802-2210-orchestrator-midtransition.json` — sibling reflow during the stage change
- `logs/20260802-2230-orchestrator-chromium-settle.json` — chromium settle-to-stable per stage
- `logs/20260802-qa-iter3-results.json` — keyboard, focus-visible, tooltip clipping, rapid
  interaction

## Closed defects

| ID     | Severity | Description                                                                                                                                                      | Measured evidence of closure                                                                                                                                                                                             |
| ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FE-001 | critical | Cards hidden with `visibility:hidden` kept their layout box; the "disappeared" row still measured 686px at 1440 and 2864px at 375                                | `display:none` + `transition-behavior: allow-discrete`. Row height now 686 (idle) → **202** (category, one card) → **0** (tech). 3 engines                                                                               |
| FE-002 | high     | `.tech-grid { max-height: 2000px; overflow: hidden }` clipped 884px of the 20-card Backend Developer grid at 375px                                               | `max-height` removed entirely. Backend Developer @375: `gridHeight 2884 === gridScrollHeight 2884`, 20/20 techs reachable. 3 engines                                                                                     |
| FE-003 | high     | 7 of 10 carousel tags left no reset affordance (fuzzy category lookup vs exact active-card matching; then the orphan card rendered inside a `display:none` grid) | 30/30 tag × engine combinations report `usableReset >= 1` with a non-zero box. Orphan card 189×124, `pointer-events: auto`, tooltip "Click to clear this filter"; clicking it returns 12 service cards / 0 project cards |
| FE-004 | medium   | Empty state was unreachable dead code (`isVisible && shown.length === 0` where `isVisible = shown.length > 0`)                                                   | Selecting "Sass" renders "No projects found for **#Sass**." with `showcaseCards: 0`. 3 engines                                                                                                                           |
| FE-005 | medium   | Replacement spotlight animated two `radial-gradient` backgrounds `infinite alternate` — a full-layer repaint per frame                                           | Only animation on `.project-showcase__spotlight` is `spotlight-move`; its keyframes touch **`transform` only**. 3 engines                                                                                                |
| FE-006 | low      | Stagger `transition-delay` sat on the base rule and also delayed hover (4th card lagged 135ms)                                                                   | `transitionDelay` on `.project-showcase__card` measures `0s, 0s, 0s, 0s, 0s`. Stagger scoped to enter/exit and capped at `min(var(--i), 6) * 45ms`                                                                       |
| FE-007 | low      | Lone tech card was left-aligned in `.auto-grid` while the category card it replaces is centred                                                                   | Card centreX **720.00** vs viewport centre 720 @1440, and **187.50** vs 187.5 @375. Max offset 0.008px across tech / orphan / empty states                                                                               |

## Requirement acceptance

| Requirement                                                                                      | Status | Evidence                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------ | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Project list appears only after a filter is selected                                             | pass   | `showcaseCards: 0` at idle and category; `block / 1` at tech. 3 engines                                                                                                         |
| Selecting a category leaves only that card + its technologies                                    | pass   | Round trip service/tech counts 12/0 → 1/10 → 0/1 → 1/10 → 12/0, 3 engines                                                                                                       |
| Selecting a technology removes the whole category row, leaves that tech in its place, list below | pass   | `rowH: 0`, one tech card centred, showcase visible with filtered projects                                                                                                       |
| Magical CSS-only appear/disappear                                                                | pass   | `@starting-style` + `allow-discrete`; enter blur 12px/scale .86, exit blur 14px/scale .72; `opacity`/`transform`/`filter` only; cascade capped at 720ms (webkit measured 739ms) |
| Tooltips make filter and reset obvious                                                           | pass   | `::after` opacity 1 on `:hover` and `:focus-visible`, 4 distinct texts. 3 engines                                                                                               |
| Hover border 2px                                                                                 | pass   | computed `paddingTop` on the card and its `::before` both `2px`. 3 engines                                                                                                      |
| No JS for hover animation                                                                        | pass   | No pointer/mouse listeners remain in either component; `handlePointerMove`, `resetPointer`, `MAX_TILT_DEG`, IntersectionObserver all removed                                    |

## Iteration-3 accessibility measurements

**Coverage limitation — measured in chromium only.** `logs/20260802-qa-iter3-results.json` contains
no firefox or webkit key for keyboard, focus-visible, tooltip-on-focus, tooltip clipping or rapid
interaction. Treat cross-engine behaviour for these five as **not measured**.

- Keyboard: service, tech and orphan cards are all Tab-reachable; Enter and Space both activate;
  Space produces `scrollDelta = 0`; after the row collapses, focus lands on a rendered element
  (`.card-container--active`, `display: flex`) rather than a removed node.
- Focus-visible: all four interactive types show an indicator — cards use the UA
  `outline: auto 1px`, project tags and the CTA use `outline: 2px solid #915eff`.
- Tooltips on keyboard focus: `opacity: 1` for service card, tech card and project tag.
- Tooltip clipping: none at 375 or 1440. Project-tag tooltips sit inside `.project-showcase__inner`
  (`overflow: hidden`) but resolve above the clip boundary; top-row service tooltips are not cut
  off.
- Rapid interaction: 10 uninterrupted category → tech → back → different-category cycles produced 0
  page errors and a coherent final state.

## Touch targets — WCAG 2.2 AA 2.5.8 (≥ 24×24 CSS px)

Cross-engine, measured by the orchestrator (`logs/20260802-2130-orchestrator-targets.json`):

| Engine / viewport | Smallest interactive element     | Size          | Result |
| ----------------- | -------------------------------- | ------------- | ------ |
| chromium @375     | `.project-showcase__tags button` | 45.25 × 26.19 | pass   |
| chromium @1440    | `.project-showcase__tags button` | 45.25 × 26.19 | pass   |
| firefox @375      | `.project-showcase__tags button` | 45.23 × 26.20 | pass   |
| firefox @1440     | `.project-showcase__tags button` | 45.23 × 26.20 | pass   |
| webkit @375       | `.project-showcase__tags button` | 45.25 × 26.19 | pass   |
| webkit @1440      | `.project-showcase__tags button` | 45.25 × 26.19 | pass   |

0 sub-24px failures in all six combinations.

**Resolved discrepancy (QA-001).** The qa-engineer's own results file recorded
`projectTagButton: { h: 23.9, meetsWCAG: false }` while its summary claimed 26.19px and a pass. The
engineer attributes the 23.9px row to a measurement taken before `document.fonts.ready`. The
orchestrator's independent cross-engine run above is the authority: 26.19px, pass. The summary's
conclusion was correct and the JSON row was wrong — but the contradiction should have been caught
and explained by QA rather than shipped unresolved. The same submission also cited the previous
cycle's `QA/report.md` as evidence for its own `qa_report_empty` gate without having written it.

## Known limitations

1. **Engine floor for the motion.** `@starting-style` and `transition-behavior: allow-discrete`
   require Chrome/Edge 117+, Safari 17.5+, Firefox 129+. Older engines degrade to instant
   appear/disappear — no animation, no loss of function or reachability.
2. **Keyboard, focus-visible, tooltip clipping and rapid interaction are chromium-only.**
3. **Sibling reflow during the stage change.** Switching `grid-template-columns` at the tech stage
   moves still-exiting siblings. Measured worst case: webkit, one card jumps 281px at t=569ms — at
   `opacity: 0.0128`, i.e. 98.7% faded out. Firefox measured 0px across 104 frames. Not visible in
   practice, recorded for completeness.
4. **Cursor-following spotlight and pointer tilt were removed, not reimplemented.** CSS cannot read
   pointer position within an element; there is no CSS-only equivalent.
5. **`react-parallax-tilt` still drives the service-card tilt** on pointermove. Pre-existing and
   deliberately out of scope — the only remaining JS hover animation in this section.
6. **No lint, typecheck or unit-test gates exist in this repo** (no eslint config, no TypeScript, no
   test runner). `pnpm build` and cross-engine runtime measurement are the only automated gates
   available, and both were exercised.
