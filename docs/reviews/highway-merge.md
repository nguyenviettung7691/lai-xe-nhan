# Review and mitigation plan: `highway-merge`

Date: 2026-10-25. Scope: the complete Vietnamese lesson, steps/cues, speed and
steering hints, mistakes, recovery, safety, mnemonic, three quizzes, both SVGs,
captions/alt text, release/review metadata, checklist and learning/quick/audio
consumers. This is an editorial and technical review, not instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Recovery and third quiz | Explicitly teaches continuing onto the emergency shoulder when the acceleration lane runs out. This is not a normal merging option and contradicts Vietnamese motorway rules. | Plan and yield early within the acceleration lane. If necessary, slow and stop before its end rather than force entry; never extend acceleration onto the shoulder, reverse or turn around. Distinguish a forced stop from routine waiting and obtain assistance if stranded. |
| High | Gap selection and second quiz | Treats a three-second hole between two existing vehicles as sufficient space to insert another vehicle. It does not account for vehicle length, front and rear clearance or the closing speed of the following vehicle. | Evaluate both clearances and relative speed; do not make another vehicle brake hard or swerve. Separate following-distance guidance from permission to merge; follow distance signs and speed/condition-dependent requirements. No universal merge-gap countdown. |
| High | Priority and observation | No explicit duty to yield, no renewed blind-spot check immediately before moving, and speed matching comes before traffic assessment. A signal could be mistaken for priority. | Read signs/markings, identify the rightmost receiving lane and a gap early, signal, adjust speed legally, recheck mirrors/blind spot briefly while maintaining forward observation, and yield. Avoid dwelling in a truck's blind spot. |
| High | Main SVG | Rendered inspection shows a path across the rightmost lane toward the middle lane. The road edge runs through the merging area; the approach car is outside the drawn carriageway. No clear taper or permitted crossing boundary. | Draw a dedicated right-side acceleration lane and taper, a dashed merge boundary, solid outer edges, consistent rightward car headings and traffic arrows. Route the ego arrow from its front into only the adjacent rightmost lane, with clear space ahead/behind. |
| Medium | Variant SVG | Ego sits in the middle lane; a single bracket ahead is labelled three seconds. No rear-clearance or approach-speed explanation. | Show a post-merge snapshot in the rightmost lane with separate bumper-to-bumper front/rear brackets, front/rear vehicles, direction arrow and no numerical safe-gap claim. Explicitly state that geometry is not to scale. |
| Medium | Speed and context | A fixed 30 km/h speed difference and deadline imply racing to merge. The speed quiz omits limits and conditions. | Use a right-side entry example, no universal acceleration target, obey limits, visibility/grip and congestion, and never chase an unsafe gap. Include the extra-lane case. |
| Medium | Approval | A sample reviewer incorrectly endorses the unsafe shoulder advice and universal gap rule as certified. | Remove only this sample review and publish the revised card as `published_unverified`. Move the generic stale-review fixture to another unchanged, approved card. |

## References and interpretation

- [Vietnam Government: Law 36/2024/QH15, Article 25](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: signal before joining, yield to motorway traffic, observe
  following traffic, enter the lane nearest the right only with safe clearance,
  and use an acceleration lane if provided. Do not drive on the emergency lane
  or shoulder. Article 25(2) distinguishes prescribed stopping places from
  technical failure/force-majeure stops and requires emergency signalling and
  assistance. A forced stop before a ramp ends is a last-resort collision
  avoidance measure, not a designated waiting/parking place.
- [UK Highway Code, rule 259](https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273),
  read directly: yield, match speed safely, do not cross solid white lines or
  use the shoulder, and remain in the entry lane if it becomes an additional
  motorway lane. Its left-driving geometry is **not** copied to Vietnam.
- The lesson will refer to posted and speed-dependent safe distances without
  asserting that a fixed number of seconds legally or physically authorizes
  insertion. A static, not-to-scale picture cannot certify a safe gap.

The existing `pre_highway` checklist covers vehicle/driver readiness and route
planning, not merge authorization; no checklist change is needed. The renderer
derives visual and spoken guidance from the card. Quick mode hides recovery and
the variant, while whole-lesson audio reads instructions and safety but not cues;
essential yielding/no-shoulder/last-resort guidance must be in those sources too.
Only the two SVG diagrams are attached: no separate photos, charts or animations.

## Implementation plan

1. Commit this analysis and plan before implementing the revision.
2. Rewrite the complete lesson and all three quizzes coherently. Preserve stable
   card/lesson/asset/checklist/quiz IDs and historical changelog entries.
3. Replace only this lesson's two generated scenes and captions/alt text. Use
   semantic SVG groups for receiving lane, acceleration lane, vehicle poses,
   merge path, traffic direction and both gap brackets; test actual geometry.
4. Bump card and pack versions, regenerate assets deterministically, remove the
   sample endorsement and relocate the stale-review fixture.
5. Add focused regression tests for safe decisions, answer semantics, metadata,
   right-lane-only entry, car/arrow directions, taper boundaries, front/rear gaps
   and non-numerical descriptions. Run focused content tests, lint and build.
6. Inspect rendered diagrams, SVG text bounds, desktop/mobile layout, quick mode
   and quiz behaviour. Confirm unrelated SVGs are unchanged. Record actual
   verification and commit the coherent implementation.

## Baseline

Clean worktree. Baseline content, assets and validation suites: **31 tests passed**.
Both original SVGs inspected in the rendered lesson before editing.

## Implementation and verification results

- Analysis/plan committed first as `aa27f58`.
- Card **1.2.0**, pack **2026.10.13**. Reworked all eight instructions, cues,
  hints, mistakes, recovery, safety, mnemonic and all three questions together.
  Retained identifiers and both previous card changelog entries.
- Removed only this lesson's sample endorsement. The browser shows
  **Chưa thẩm định độc lập** and no sample reviewer. Independent instructor
  validation remains outstanding; these changes do not claim certification.
- Replaced both diagrams. The main car starts wholly inside the right-side
  acceleration lane, and its forward arrow crosses the dashed boundary into
  only the adjacent rightmost lane. Outer edge and taper agree with the road
  fill. All cars and traffic arrows face right. The variant shows two separate
  actual bumper-to-bumper clearances around the inserted car and warns about
  the rear vehicle's approach speed, without a numerical authorization rule.
- Added **11 focused regression tests**, including sampled Bezier geometry,
  initial nose/path alignment, lane/taper boundaries, vehicle rotation, both
  gap endpoints, accessible descriptions, corrected answers and release status.
  The generic stale-review test now uses unchanged, approved `highway-exit`.
- Focused validation: **42 tests passed** across the lesson, content, assets
  and validation suites. `npm run lint`, `npm run build` (including Vue/TS
  checking), and `git diff --check` passed. The build emitted only dependency
  annotation warnings from Zod/Rollup, unrelated to this revision.
- Repeated generation produced byte-identical output for all **46 SVGs plus
  the manifest**. Compared with the pre-implementation manifest, only this
  lesson's two asset records changed; the other **44 records and SVGs** are
  unchanged.
- Browser verification at **1440 x 1000** and **390 x 844**: both assets load,
  eight steps display, no horizontal overflow, and mobile figure/caption fit
  within the viewport. Inspected both rendered diagrams and the mobile main
  figure; measured every SVG text box with no out-of-viewBox text.
- Quick mode retains all eight instructions and safety, while hiding the
  variant/recovery as designed. Verified the whole-lesson spoken source
  retains yielding, forced-stop and no-shoulder guidance, without relying on
  hidden recovery or cues. Audio source inspected; no live driving exercise
  or acoustic TTS validation was performed.
- Browser quiz: selecting the shoulder-extension answer fails **2/3 (67%)**
  and highlights the corrected stop answer. Retry with all safe answers passes
  **3/3 (100%)**. Final browser console had no runtime errors.
