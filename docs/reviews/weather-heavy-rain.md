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

Pending.
