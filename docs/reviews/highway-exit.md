# Review and mitigation plan: `highway-exit`

Date: 2026-10-25. Scope: the complete Vietnamese lesson, context/objective,
instructions, cues/hints, mistakes, recovery, safety, mnemonic, three questions,
both SVGs and their captions/alt text, publication/review metadata, checklist,
learning-path references and quick/audio consumers. This is an editorial and
technical review, not independent driving-instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Steps 4-5 and sample approval | "Keep speed until the wheels enter" and "brake only in the deceleration lane" can discourage braking for a queue, obstacle or poor conditions. A partial entry is not a safe trigger for routine exit braking. | Plan normal exit deceleration with the whole vehicle established in the deceleration lane; explicitly require slowing/braking earlier for traffic, hazards and conditions, including on the main carriageway. Never brake abruptly merely to catch an exit. |
| High | Main SVG | Rendered car overlaps the solid road edge; its arrow runs outside the asphalt. There is no paved deceleration lane or usable ramp, and a dashed diagonal is not a coherent lane boundary. | Replace with a paved right-side deceleration lane, permitted dashed entry, solid separation and hatched gore after entry closes, and a connected branch. Keep car footprints and arrows on asphalt, with consistent rightward headings. |
| High | Observation and change of lane | No explicit mirrors/blind-spot recheck or front/rear/side clearance; seconds between changes could be mistaken for permission. Signal is taught only after earlier lane changes. | Signal before each change, observe and recheck the right blind spot immediately before moving, yield to vehicles in the receiving lane, change only one adjacent lane across permitted markings, stabilize and reassess rather than count seconds. |
| Medium | Fixed distances and quizzes | Text asserts 2 km and 300 m; diagram adds 1 km and 500 m. These are neither a universal road layout nor universal safe preparation distances. | Prepare early from actual signs/markings and route planning, not a countdown. Signal in good time, maintain through the maneuver, obey lane allocation and do not rely on navigation over road signs. Replace rote-distance questions with decisions. |
| High | Missed-exit variant and recovery | Variant depicts a generic forbidden diagonal but no exit, closed entry or positive safe continuation. Recovery omits gore/shoulder shortcuts and turning around. | Show an exit already beyond permitted entry, a straight green continuation arrow, and a clearly crossed-out red shortcut through solid boundary/gore. Continue to the next suitable exit and re-route only safely; do not reverse, turn around, stop to recover a missed exit or use the shoulder. |
| Medium | Branch speed | Speedometer check is useful but does not address deceptive speed perception, curves, wet grip, queues or the no-separate-lane case. | Use brief speedometer checks without losing forward observation, obey posted limits, slow before curves and for queues/conditions; do not assume the branch is clear or that a deceleration lane always exists. |
| Medium | Review metadata | Sample reviewer endorses the absolute braking rule and UI claims approval. | Remove only this sample endorsement; publish as `published_unverified`, preserve history and identifiers, bump card/pack versions and relocate the generic stale-review fixture to an unchanged approved card. |

## Evidence and interpretation

- [Vietnam Government: Law 36/2024/QH15](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: Article 25(1)(b) requires observing signs, moving gradually to
  the rightmost lane and using the deceleration lane if provided; 25(1)(c)
  prohibits driving on the emergency lane/shoulder. Article 13(2) requires a
  signal before each adjacent-lane change, permitted crossing places and safe
  clearance ahead, behind and to both sides. Article 12 requires speed adapted
  to traffic, hazards, curves, weather and visibility, including slowing or
  stopping where necessary. Articles 15-16 prohibit motorway turning/reversing;
  Article 25(2) distinguishes emergency stops from routine stopping.
- [UK Highway Code, rules 273-274](https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273),
  read directly: plan early, signal in good time, reduce speed on the slip road,
  check the speedometer because speed can feel deceptively low, and anticipate
  sharp bends. Only these general principles are used, not UK left-driving
  geometry or rules.
- The distances in the existing lesson are not presented as local examples
  and have no supporting universal requirement in the above rules. Remove
  their prescriptive use rather than replace them with another fixed distance.
- Only two static diagrams are attached to this lesson: no separate photos,
  numerical charts, animation or independent visualization was found.

## Consumer and scope check

The shared `pre_highway` checklist already includes route planning. The learning
path references stable lesson/card identities; neither needs a content change.
The lesson renderer uses the card and manifest for text, quizzes and diagrams.
Quick mode hides recovery and the variant; full-lesson and individual-step
audio omit some cues. Essential braking exceptions and missed-exit prohibitions
must therefore appear in instructions and safety, not only recovery or graphics.
No shared renderer change is needed.

## Implementation plan

1. Commit this analysis/plan before implementation.
2. Revise the complete lesson coherently, including all questions and their
   actual correct answers. Retain card, lesson, checklist, asset and quiz IDs
   and original changelog entry.
3. Replace only the two exit SVG scenes via the generator. Use semantic groups
   for car poses, lane surfaces, dashed/solid boundaries, gore, safe and unsafe
   paths and traffic arrows; explain that drawings are not to scale and are
   not speed/distance or exact steering instructions.
4. Bump card/pack versions, regenerate deterministic assets, remove sample
   approval and relocate the stale-review fixture.
5. Add focused content/answer/metadata and actual geometry regression tests.
   Validate lane entry and vehicle clearance, consistent headings, forbidden
   crossing and safe straight continuation, not just presence of SVG strings.
6. Run focused tests, lint, typecheck/build; inspect both rendered diagrams,
   text bounds, desktop/mobile layout, quick mode and quiz behaviour. Check
   deterministic regeneration and that unrelated SVGs are unchanged.
7. Record actual results and commit the coherent, verified revision.

## Baseline

Clean worktree. Content, asset and validation suites: **31 tests passed**.
Both original SVGs inspected in the running lesson; main car/arrow pavement
errors and absent exit context in the variant confirmed visually.

## Implementation and verification results

- Analysis/plan committed before implementation as `196055b`.
- Card **1.1.0**, content pack **2026.10.14**. Revised context/objective,
  eight instructions and cues/hints, all three mistakes, recovery, safety,
  mnemonic and all three questions together. Retained stable identities and
  the original card/release history.
- Removed only this lesson's sample endorsement. UI now displays
  **Chưa thẩm định độc lập**. Independent instructor review remains outstanding;
  this revision does not assert certification.
- Normal exit slowing is separated from necessary earlier braking for queues,
  hazards, short deceleration lanes and poor conditions. Included exits without
  a separate deceleration lane, blind-spot rechecks, branch speed perception,
  curves, queues and safe missed-exit recovery without shoulder shortcuts.
- Replaced both diagrams with connected paved geometry. Main path leaves the
  car nose, crosses only the dashed permitted boundary and settles inside the
  right-side deceleration lane. Variant places the whole car beyond permitted
  entry, points straight ahead and crosses out the actual solid-line/gore
  shortcut. Car heading, traffic arrows and branch arrows agree.
- Added **12 focused regression tests** for decisions, actual correct answers,
  publication history, lane geometry, car extents, sampled entry curve and
  clearance, arrow directions, positive straight continuation, forbidden-path
  intersection, red X placement and accessible descriptions.
- Focused lesson/content/assets/validation run: **43 tests passed**. All content
  regressions, including earlier lesson reviews: **192 tests passed in 17 files**.
  Lint, Vue/TypeScript checking, production build and whitespace checks passed.
  Build emitted only Zod/Rollup dependency-annotation warnings.
- Desktop **1280 x 900** and mobile **390 x 844**: visually inspected both final
  diagrams. Images loaded, captions wrapped and no horizontal text/page overflow
  was found. Measured SVG text bounds: no clipping or text-to-text overlap after
  shortening the variant footer.
- Browser quizzes verified wrong answers as **0/3**, retry and correct answers
  as **3/3**. Quick mode retained all eight instructions and essential braking
  guidance while hiding the variant/recovery as intended.
- Inspected all ten entries in the large-text sequential-audio transcript.
  Captured full-lesson and individual-step speech requests with browser speech
  output stubbed: both include necessary earlier-braking guidance; full-lesson
  output includes missed-exit prohibitions. Audible pronunciation/device voice
  quality was not tested.
- Repeated generation was byte-identical across all 46 SVGs and the manifest.
  Only the two `highway-exit` SVGs changed; unrelated lesson illustrations and
  shared rendering/checklist behaviour were preserved.
