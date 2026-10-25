# Icon and illustration audit and mitigation plan

Date: 2026-10-25. Scope: every icon, glyph and illustration a learner sees —
app mark/favicon, top-bar controls, bottom navigation, topic icons, home hero
artwork and quick links, directional arrows, checklist/status marks, lesson
player controls, sync status, dashboard-signal telltales (43) and lesson
diagrams (46 SVGs). Reviewed by rendering each screen at desktop and mobile
widths, plus enlarged contact sheets of all signal icons and lesson diagrams.

## Analysis

Outside the dashboard signals and lesson diagrams, the UI uses ad-hoc Unicode
characters and colour emoji as icons. Their shapes depend on the installed
fonts (Windows, Android and iOS render ☔ 🔊 🧭 🏅 ⛔ 🔄 ⏮ ⏭ very differently,
and some fall back to tofu boxes), they ignore the theme/contrast colours, and
several do not describe the action they label.

| Area | Current | Finding | Mitigation |
| --- | --- | --- | --- |
| Top bar: theme | ◑ / ☾ / ☼ | “System” theme ◑ is almost identical to the contrast button ◐ next to it; users cannot tell the two controls apart. | Device (phone) icon for *system*, moon for *dark*, sun for *light*. |
| Top bar: contrast | ◐ | Glyph is fine in concept but collides with ◑. | Dedicated SVG contrast icon (ring + filled half). |
| App mark / favicon | Front-view car | Shape reads as a bench/sofa at 32 px; wheels drawn as thin lines. | Redraw a clear front-view car (windscreen, body, headlamps, tyres). |
| Bottom nav: Home | ⌂ | Thin, font-dependent. | SVG house. |
| Bottom nav: Topics | ▦ | Grid/table glyph doesn't suggest a lesson library. | SVG open book. |
| Bottom nav: Checklist | ✓ | A bare tick reads as “done/confirm”, not as a list. | SVG clipboard with tick. |
| Bottom nav: Review | ⟳ | Reads as “refresh/reload”, not spaced review over time. | SVG history (counter-clockwise arrow round a clock). |
| Bottom nav: Lights | ! | Generic alert; same as lesson “mistakes” and home quick card. | SVG dashboard gauge with warning mark. |
| Topic: Parking | Letter P | Plain letter, no sign context. | SVG parking sign (P in a sign plate). |
| Topic: Narrow lanes | ↔ | Means “resize/swap”, not a narrow alley. | SVG road narrowing on both sides with a car. |
| Topic: Highway merge | ⇢ | Dashed arrow has no road meaning. | SVG two lanes merging into one. |
| Topic: Slopes & flooding | ☔ (colour emoji) | Umbrella covers rain only and ignores the theme colour. | SVG slope with rain drops and water line. |
| Home hero | Rotated road + app logo + ✦ | A front-view logo is laid on a top-down road, so the “car” faces the viewer; ✦ sparkle has no meaning. | Self-made top-down SVG scene: lanes, ego car following a dashed learning route through numbered checkpoints to a finish flag. |
| Home quick cards | ✓, ! | Same issues as nav. | Clipboard-check and dashboard-warning SVGs. |
| Arrows | → ← ↗ ↻ ⟳ | ↗ on topic cards signals an *external* link but they are in-app routes; standalone glyph arrows differ in weight. | SVG arrow/chevron set; in-app navigation uses → only. |
| Checklist | ✓ ↻ | Tick inside the box is fine; reset uses clockwise “refresh”. | SVG tick; counter-clockwise reset arrow. |
| Lesson chips/badges | ⚠ ✓ 🏅 ⛔ ✗ | Emoji/fonts vary; ⛔ “no entry” is used for a *stop condition*. | SVG warning, shield-check (verified), award, octagon stop, check/x. |
| Lesson info boxes | ! ↻ | “If you got it wrong” uses refresh ↻ instead of undo/recover. | SVG warning triangle and undo arrow. |
| Speech player | 🔊 ▶ ❚❚ ☰ ■ ⏮ ⏭ | Mixed emoji/media glyphs; ☰ (menu) for “step by step” reads as a hamburger menu. | SVG speaker, play, pause, stop, numbered list, previous/next step. |
| Lights search | ⌕ in placeholder | Placeholder glyph disappears on typing and renders as tofu on some fonts. | SVG magnifier inside the field. |
| Sync badge / auth | dot, 🔄 | Status only conveyed by colour dot; emoji on buttons. | Cloud-check / cloud-off / cloud-upload / alert icons per state; SVG sync arrows. |
| Learning path link | 🧭 | Emoji; compass suggests navigation app. | SVG route (path between two points). |

### Dashboard signals

All 43 telltales were reviewed against common ISO 2575-style conventions
(headlamp orientation, dipped vs straight beams, front vs rear fog, brake/ABS
brackets, battery polarity, etc.). Most are clear and correct. Three need
redrawing:

- **EV / hybrid system** – the “!” overlaps the car beltline and headlamps
  and is unreadable. Redraw the car with a clear exclamation inside the body.
- **Immobilizer / key** – the key is a few pixels inside the car outline.
  Enlarge the key so the bow, shaft and bit are visible.
- **Seat belt** – the figure reads as a standing person. Add a seat back and
  seated legs while keeping the diagonal and lap belt parts.

*Regenerative brake* intentionally shares the brake-system drawing (as on
many hybrids); it is distinguished by amber colour, label and severity.

### Lesson diagrams

All 46 diagrams were inspected. They respect right-hand traffic, label
front/rear (ĐẦU/ĐUÔI) where heading matters, mark “not to scale”, and use the
hazard colour for prohibited paths. No mis-symbolised icons were found.
*weather-engine-brake* reuses the *weather-downhill* main scene by deliberate,
test-locked decision (its own review rejects inventing paddle/gear details);
its variant carries the engine-braking process, so it is kept unchanged.

## Mitigation principles

1. All icons are original, self-drawn SVG (no third-party icon sets or
   fonts), rendered with `currentColor` so they follow theme and contrast.
2. One shared 24×24 stroke icon component with a typed registry; unknown
   names fail type-checking and tests.
3. Decorative icons are `aria-hidden`; every icon-only control keeps a
   Vietnamese accessible label and tooltip describing the *action/state*.
4. Use one metaphor per meaning across the app (e.g. → for in-app
   navigation, counter-clockwise arrow for reset/undo, triangle for warning).
5. Keep dashboard-signal and lesson-diagram geometry changes minimal and
   covered by their existing tests.

## Implementation and review sequence

Each review is committed separately after its focused tests pass:

1. Icon foundation + top bar (theme/contrast) + app mark/favicon.
2. Bottom navigation icons.
3. Topic icons (typed keys, SVG drawings).
4. Home hero artwork and quick-link icons.
5. Arrows and navigation indicators.
6. Checklist, lesson status and quiz icons.
7. Speech player and lesson info-box icons.
8. Lights search field and dashboard-signal fixes.
9. Sync badge, auth dialog and learning-path link icons.

Baseline on 2026-10-25: `npx vitest run` — 36 files, 499 tests passed.

Validation per step: `npx vitest run` on affected tests, `vue-tsc`, visual
check in the browser (dark, light and high-contrast). Final: full tests, lint
and production build.
