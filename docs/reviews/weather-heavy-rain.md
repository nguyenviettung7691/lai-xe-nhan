# Review and mitigation plan: `weather-heavy-rain`

Date: 2026-10-25. Scope: full card, steps/cues, recovery, mistakes, safety,
mnemonic, three quizzes, two generated SVGs, captions/alt, linked checklist,
publication/history, quick/audio sources and desktop/mobile rendering.
Editorial and technical review, not independent instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and consequence | Mitigation |
| --- | --- | --- | --- |
| High | Speed and following gap | Fixed 20% slowing and 4-5 seconds suggest enough safety regardless of water, visibility, tires and traffic. | Obey limits and legal spacing, slow further as needed to stop within clear visible road; no percentage or time guarantee. Increase gap for conditions without fixing attention on the lead vehicle. |
| High | Tire tracks | Following wheel tracks may lead into flooded ruts or reduce forward observation. | Stay in own lane, scan far ahead and avoid water without abrupt steering or entering another lane. Do not use tracks or a leading vehicle as proof of safety. Avoid flooded roads. |
| High | Loss of grip | Light steering alone is declared hydroplaning; absolute "keep straight" and wait can imply no necessary emergency braking or inappropriate steering on a curve. | Describe possible signs, not diagnosis. Ease off smoothly, hold a stable appropriate direction without sudden steering, braking or downshift. Distinguish ordinary recovery from immediate collision danger: necessary emergency braking, firm maintained ABS pressure, no pumping; ABS/ESC cannot restore grip on demand. Stop for persistent abnormalities. |
| High | Visibility and stopping | Waits until lane markings disappear; generic roadside stop ignores road type, permitted locations, flood risk and traffic behind. | Decide early when there is not enough forward sight distance to stop; markings alone are not the threshold. Smooth slowing and observation/signaling for a permitted dry refuge or rest area; no routine shoulder/live-lane/underpass stop for rain. If unable to continue safely, warn and seek emergency assistance rather than blindly driving to an exit. |
| Medium | Lights and preparation | Low beam alone omits rear lamps/DRL limitations, wipers, demisting, tire pressure/tread and cruise-control restrictions. | Prepare before travel, postpone if equipment/weather prevent safe driving, use low beam/rear lamps and check actual operation. Do not assume auto/DRL lights rear lamps. Cancel cruise/ACC per manual; assistance does not make rain safe. |
| Medium | Hazard lamps | Automatically calls for hazards at every rain stop, with no role for directional signaling or legal conditions. | Hazards warn of actual danger per rules, not permission to park illegally or a substitute for turn indicators/headlights. No blanket instruction to drive in rain with hazards on. |
| Medium | Main SVG | Symmetric cars sit within/below road surface, not with wheel circumferences on it. No front/rear cues; gap does not clearly connect bumper positions; caption claims more than geometry proves. | Side view: right-facing cars, lamps and direction labels, tangent wheels, gap between bumpers with no numeric guarantee. Distinguish direction arrow from gap bracket and lamp markings. |
| High | Variant SVG | Car overlaps verge/road with no protected/allowed stopping bay; two floating hazard circles lack front/rear meaning. | Top view: a stationary car wholly in a separately drawn illustrative permitted lay-by, outside live lane. Orientation and hazard corners consistent; no automatic maneuver path or claim ordinary shoulder is safe. |
| Medium | Approval | Last remaining sample expert review claims verified correctness. | Remove sample approval and unused seed-review factory, export typed empty review list. Use explicit synthetic review fixtures in tests rather than relying on production seed records. Preserve real review validation. |

## Directly checked references

- [Vietnam Government policy portal, Article 20 lighting](https://xaydungchinhsach.chinhphu.vn/luat-trat-tu-an-toan-giao-thong-duong-bo-quy-dinh-su-dung-den-tin-hieu-coi-119241219161306094.htm):
  front lights are required when rain/bad weather limits visibility; low-beam
  requirements include pedestrians, oncoming traffic and other stated cases.
  No imported UK visibility-distance threshold or law is presented as
  Vietnamese law.
- [Vietnam Law 36/2024/QH15, Article 25](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm):
  motorway stopping only at designated locations; technical failure or force
  majeure may require stopping in the same-direction emergency lane with
  hazards. If unable to reach it, hazards, a warning sign/light at least
  150 m behind and prompt traffic-police/road-management notification are
  required. Explicitly distinguish this forced-stop exception from choosing
  the shoulder as a rain rest area; do not send a learner into live traffic
  to deploy a warning, seek assistance for safe deployment.
- [UK Highway Code, adverse weather, rules 226-237](https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237):
  wet stopping distances increase, keep back for visibility, ease off if
  steering loses response. General risk guidance, not local legal distances.
- [Highway Code, rules 103 and 113-122](https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158):
  directional signals, dazzling, hazard limitations, progressive normal
  braking, necessary immediate emergency braking and maintained ABS pressure.
  Foreign hazard-light legal exceptions are not imported into the lesson.
- [Hyundai 2026 Elantra, rain](https://ownersmanual.hyundai.com/full_webhelp/CN7/2026/en_US/id4cbe37c7c56.html):
  extra space, slower speed, cruise off, wiper and tire condition, headlights
  and hydroplaning risk. Model-specific manual example, not universal controls.
- [AA, aquaplaning](https://www.theaa.com/breakdown-cover/advice/what-is-aquaplaning):
  possible steering/handling signs, smooth accelerator release, no sudden
  input and cruise off; prevention depends on water, speed, tread and tires.
  Numerical example speeds are not treated as safe thresholds.
- [AA, heavy rain and floods](https://www.theaa.com/driving-advice/seasonal/driving-through-flood-water):
  avoid travel/wait for rain to ease where necessary and avoid floodwater.
  Conditional flood-crossing recipes are not adopted.

## Related surfaces and implementation plan

1. Commit this report before implementation. Original lesson and both images
   were inspected in the rendered browser and generator. There are no other
   attached photos, charts or animations.
2. Rewrite all editorial surfaces and quizzes consistently. Preserve original
   IDs and initial history; expand six steps to at most eight, retain high
   risk and publish `published_unverified`, card 1.1.0.
3. Replace only the two rain scenes. Main image teaches orientation and
   conditional space, not a measured braking distance. Variant teaches
   permitted refuge, not a shoulder or universal stopping maneuver. Update
   captions/alt, retain explicit dimensions and lazy variant loading.
4. Keep all six shared weather checklist item IDs/order. Add relevant lighting,
   sight-distance and rain-stop hints without weakening existing flood,
   spacing or brake checks.
5. Remove the final sample expert approval and now-unused seed generator;
   repair the directly coupled validation test with a synthetic typed fixture.
   Retain genuine review support, not a success-shaped certification.
6. Bump content/asset version to 2026.10.23, append release history, regenerate
   checksums/sizes. Add regressions for content, quizzes, quick/audio safety,
   checklist continuity, actual wheels/gaps/arrow direction and refuge bounds.
7. Run focused tests (all five weather cards, content/assets/validation), lint
   and build. Verify deterministic generation and unchanged unrelated SVGs.
   Inspect actual desktop/mobile viewport widths, image decoding/text bounds,
   quick/audio text, quiz wrong/retry/correct and console errors.
8. Record actual results, stop review helpers, commit validated revision.

## Baseline

Clean worktree; **84/84 tests passed** across seven focused files. Review
server HTTP 200; isolated Chrome context avoids touching shared browser state.

## Implementation and verification

- Analysis and mitigation plan committed first as **`70d68cc`**. Revised
  card **1.1.0**, pack **2026.10.23**. Preserved card/lesson/asset/checklist/
  quiz identities, original six step IDs and original changelog/release
  history; expanded to eight steps and retained high risk.
- Rewrote context, objective, all steps/cues, mistakes, recovery, safety,
  mnemonic and quizzes. Removed percentage-based speed and fixed-gap
  guarantees, blind track-following and delayed lane-marking stop trigger.
  Added pre-travel tires/wipers/demisting, low-beam/rear-lamp checks,
  AUTO/DRL limitations, cruise/ACC restrictions, possible grip-loss signs,
  smooth appropriate steering, necessary emergency ABS braking and fault
  stopping. No promise that ABS/ESC/tires restore grip on demand.
- Added early legal dry-refuge choice, no blind exit-seeking or routine
  shoulder/gap-under-bridge stop. Explicitly distinguished the Vietnamese
  motorway forced-stop exception, same-direction emergency lane if safely
  reachable, hazards, police/road-management notification and the actual
  150 m warning requirement when stranded outside that lane. Safety takes
  priority over sending a learner into moving traffic to deploy warnings;
  seek help for safe deployment. Conditional safe rejoining remains in steps.
- Main SVG: right-facing cars with identifiable front/rear lamps; four wheel
  circumferences tangent to one road plane. Gap bracket starts/ends at actual
  bumper x positions; separate traffic-direction arrow points right. No
  numeric spacing, speed or guaranteed stopping distance. Lamps are location
  markers, not beams or guaranteed visibility.
- Variant: top view with a right-facing through vehicle and direction arrow;
  stationary car wholly inside an illustrative permitted bay outside the
  live lane. Four amber marks sit at actual car corners. No entry trajectory
  or claim that an ordinary shoulder is a rest bay; captions/alt explicitly
  state conditions and limits.
- Mobile SVG text bounds exposed overlap in the original 10-unit footer
  line spacing with Vietnamese glyph metrics. Increased only these two
  diagrams' footer spacing to **12 units**, added a regression, regenerated
  and rechecked: no text intersections or out-of-canvas bounds. Other
  diagrams' formatting/output were not changed.
- Shared checklist keeps all six IDs/order and all previous spacing, brake
  and flood checks. Added lighting, stopping-sight-distance, cruise and
  early-refuge hints. All four previously revised weather suites pass.
- Removed this last sample expert record and unused seed factory; retained
  the typed real-review list and validation support. Explicit synthetic
  `ExpertReview` fixture replaces a test's dependency on `reviews[0]`.
  The lesson displays **unverified**, not a fictitious expert endorsement.
- Added **15 regressions** covering history/identity, lighting/preparation,
  speed/gap decisions, grip/recovery/emergency braking, stopping, audio/quick
  sources, quiz grading, shared checklist, real vehicle/road/gap geometry,
  arrow direction, refuge containment, hazard positions and accessible text.
- **99/99 tests passed across eight files**: all five weather-card suites,
  general content, assets and validation. `npm run lint` passed; final
  `npm run build` passed with Vue/TypeScript checks and PWA generation.
  Existing dependency-only Zod/Rollup annotation warnings are non-blocking.
- Final regeneration is deterministic: identical hashes for **46 SVGs plus
  manifest** on repeat. Only the two heavy-rain SVGs differ from the previous
  revision; flood and all other graphics unchanged. Pack **185.17 KB**, within
  budget; asset checksums/sizes match. `git diff --check` passed.
- Browser checks at actual **1440 px**, **390 px** and **360 px** viewports:
  no horizontal overflow, long quiz choices fit, both images decode at
  320 x 200, and diagrams inspected at desktop/mobile. Titles, captions,
  alt text, explicit dimensions and lazy variant behaviour retained.
- Quiz workflow: wrong answers **0/3**, retry re-enables all options, correct
  answers **3/3 (100%, pass)**. Quick mode retains main image, eight steps,
  normal/emergency response and forced-stop details while hiding recovery
  and variant. Large-text audio output includes lighting/tires, conditional
  speed/space, no track-following, smooth grip recovery, ABS, early refuge,
  forced-stop/150 m warning and rejoining observations. Actual synthesized
  voice quality was not evaluated.
- Final browser console: no warnings/errors. Cache-bypassing reloads used
  after generation to inspect final rather than cached SVGs.

Independent driving-instructor review remains outstanding. This iteration
does not claim certification or replace vehicle instructions, local traffic
control or emergency assistance.
