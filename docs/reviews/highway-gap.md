# Review and mitigation plan: `highway-gap`

Date: 2026-10-25. Scope: the complete Vietnamese card, all steps/cues, mistakes,
recovery, safety, mnemonic, three quizzes, both SVGs, captions/alt text,
review/release metadata and learn/quick/audio consumers. This is an editorial
and technical review, not independent driving-instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Objective, procedure and quiz | Three seconds is presented as a universal safe/legal minimum. At 120 km/h it is exactly 100 m, leaving no allowance for timing error or worse conditions. | Teach at least three seconds only as a dry/good-condition reference, alongside posted and speed-dependent legal distances. Increase whenever conditions require; no countdown guarantees stopping. |
| High | Wet-road advice | Four to five seconds conflicts with the variant's instruction to double a three-second gap. It can be mistaken for a safe upper bound in heavy rain. | At least double the dry reference (at least six seconds if using three), possibly much more; reduce speed to grip/visibility and stop within clear visible road. Distinguish this practice from Vietnamese legal requirements. |
| High | Recovery and braking | Easing off is the only response to a cut-in; “instead of braking hard” can discourage emergency braking when collision is imminent. | Rebuild space smoothly when possible, but brake immediately as needed for collision avoidance. No abrupt lane escape, acceleration to block a cut-in, or shoulder use. |
| Medium | Context and mistakes | Unsupported universal stopping-distance claim at 80 km/h; metre estimation is treated as a mistake despite legal distances being expressed in metres. | Remove the stopping-distance claim. Supply the legal speed bands and conditions explicitly; use time as a practical supplement, not a replacement for signs/metres. |
| Medium | Counting method | “Count one, two, three” can be three fast beats. No distinction between lead rear and ego front crossing the same fixed reference, or keeping eyes on the road. | Count actual seconds from lead rear to ego front at the same fixed roadside reference; short observation, eyes forward, repeat after speed/lane changes or cut-ins. |
| Medium | Main illustration | Cars extend across a lane divider. No actual fixed marker, timing endpoints or travel arrows; a static length is simply labelled three seconds without scale. | Two sequential snapshots, consistent rightward headings/arrows, same fixed marker, rear-of-lead start and front-of-ego end; contained lane geometry and no distance-to-pixels claim. |
| Medium | Rain illustration | Same lane-placement error, no clear direction; 4–5 label contradicts doubling. | Same-direction, same-lane cars with a larger bumper-to-bumper bracket than the dry snapshot, rain cues and explicitly conditional six-second reference. Not to scale, no guaranteed safe distance or trajectory. |
| Medium | Review status | Sample reviewer awards maximum confidence to the oversimplified rule and appears as independent approval in the UI. | Remove only this sample endorsement; publish the revised card as `published_unverified`. Relocate the stale-review test to an unchanged approved card. |

## References and interpretation

- [Circular 38/2024/TT-BGTVT, government record](https://vanban.chinhphu.vn/?pageid=27160&docid=211873&classid=1)
  and [official PDF](https://datafiles.chinhphu.vn/cpp/files/vbpq/2024/11/38-bgtvt.pdf).
  Article 11 was read directly in the
  [readable legal text](https://luatvietnam.vn/giao-thong/thong-tu-38-2024-tt-bgtvt-toc-do-khoang-cach-an-toan-cua-xe-may-chuyen-dung-tham-gia-giao-thong-375831-d1.html).
  With dry, non-slippery, straight, flat road and adequate visibility: exactly
  60 km/h: 35 m; above 60 through 80: 55 m; above 80 through 100: 70 m;
  above 100 through 120: 100 m. Below 60 requires a context-appropriate safe
  distance, not a universal 35 m. Observe minimum-distance signs; adverse
  weather, curves, grades and limited visibility require greater distances
  than the sign or table. These distances are not measured total stopping
  distances for every car. Do not extrapolate the table above 120 km/h.
- [UK Highway Code, rule 126](https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158),
  read directly: use a fixed reference, increase the gap at least twofold in
  wet conditions and drive so that stopping within clear visible road is
  possible. Its two-second baseline is not Vietnamese law and will not replace
  the app's more conservative dry three-second reference.
- A web-search summary incorrectly described Article 11 as a speed-limit
  article and asserted an unverified future amendment record. Neither claim
  is used. Independent certification and future legal-change monitoring
  remain necessary.

Only two static SVGs are attached; there are no separate photos, charts or
animations. The shared `pre_highway` checklist covers readiness, not authorization
to follow at a fixed gap; no checklist edit is needed. Learning paths, topics,
review scheduling and audio consume card data. Quick mode hides recovery and the
variant; full-lesson audio omits cues. Essential legal/condition and emergency
braking qualifications must therefore appear in instructions and safety too.

## Implementation plan

1. Commit this analysis and mitigation plan before implementation.
2. Revise the whole card and all three quizzes together. Retain card, lesson,
   asset, checklist and quiz identities and historical changelog.
3. Replace only its two generator scenes and their captions/alt text. Add
   semantic SVG groups for testable vehicle poses, directions, reference
   markers, timing endpoints and bumper-to-bumper gaps.
4. Bump the card to 1.1.0 and pack to 2026.10.16; regenerate assets. Remove
   the sample approval and relocate the stale-review fixture. Make the prior
   lesson's release test assert its own historical release, not the latest pack.
5. Add focused tests for speed-band boundaries/conditions, timing, wet-road
   arithmetic, cut-ins/emergency response, actual correct answers, metadata
   and diagram geometry. Check checksums, determinism and unchanged other SVGs.
6. Run content tests, lint and build; inspect both rendered diagrams and SVG
   text bounds, desktop/mobile, quick mode and quiz feedback. Record actual
   results and commit the coherent revision with the required co-author trailer.

## Baseline

Clean worktree. Content, asset and validation suites: **31 tests passed**.
Both original figures were inspected in the browser before editing, confirming
lane-divider overlap, absent timing reference and inconsistent rain labels.

## Implementation and verification results

- Analysis and plan committed before implementation as `068e2ee`.
- Card **1.1.0**, pack **2026.10.16**. Reworked the complete lesson into seven
  action-led steps and revised all three quizzes together. Stable lesson,
  asset, checklist and quiz IDs and the original changelog entry are retained.
- Added the exact legal speed bands and dry-road conditions, the below-60
  distinction and distance-sign obligations. Removed the unsupported generic
  stopping-distance claim and the dismissal of metre-based checks.
- Three seconds is now a qualified dry-condition reference, not a statutory
  minimum or stopping guarantee. Wet guidance consistently doubles it to
  **at least six seconds**, permits more and requires appropriate speed.
  Smooth gap rebuilding does not override immediate collision-avoidance braking.
- Removed only this card's sample endorsement. The browser displays
  **Chưa thẩm định độc lập**, with no sample reviewer. Real independent
  instructor review remains outstanding; publication is not certification.
- Replaced both SVGs and descriptions. The main illustration uses two
  sequential snapshots with the same fixed reference: lead rear at the first
  endpoint, ego front at the second. Cars and arrows face right and remain
  entirely inside the illustrated lane. The rain scene has a larger actual
  bumper-to-bumper clearance, not a distance-to-pixel/time scale.
- Added **13 focused regression tests**, including legal band endpoints,
  conditions, timing, emergency braking, actual correct-answer semantics,
  metadata, vehicle containment/headings, nose-aligned arrows, both marker
  endpoints and actual bumper-to-bumper brackets. Moved the stale-review fixture
  to unchanged `highway-overtake-truck`; the previous signs lesson now tests its
  historical release without pinning the latest pack.
- **216 tests passed** across all 19 content/asset/validation test files.
  `npm run lint`, `npm run build` (including Vue/TypeScript checking) and
  `git diff --check` passed. The build only reported existing dependency
  annotation warnings from Zod/Rollup. Initial editorial-gate failures were
  resolved by action-led wording, without weakening the validator.
- Repeat generation produced the same manifest checksum. Checksums and asset
  budgets pass; exactly the two `highway-gap` SVGs differ from the baseline,
  with the other **44 SVGs unchanged** after normalizing line endings.
- Browser-checked both figures at desktop and **390 px** mobile width, with
  no horizontal overflow. Measured every SVG text bounding box: none outside
  the viewBox and no text-to-text collisions. Visual inspection also caught
  and fixed a rain-label/road-edge collision.
- Quick mode retains all seven instructions and the critical legal, wet-road
  and emergency-braking safety qualifications while hiding the variant and
  recovery as designed. Audio sources were traced to the same revised
  instructions and safety; speech output itself was not acoustically tested.
- Browser quiz verification: the unsafe “only ease off” emergency answer
  produced **2/3, Chưa đạt** and highlighted immediate braking as correct.
  Retry with the correct choices produced **3/3, Đạt**. A fresh page load
  after the fixes had no console warnings or errors.
