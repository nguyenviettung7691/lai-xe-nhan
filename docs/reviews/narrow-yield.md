# Review and mitigation plan: `narrow-yield`

Date: 2026-10-25. Scope: complete Vietnamese card, all steps/cues/hints,
mistakes, recovery, safety, mnemonic, three questions, both generated SVGs,
captions/alt text, publication/review records, release history and the shared
learn/quick/spoken renderers. Editorial/technical review, not certification
by a driving instructor.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Stopping | A mandatory 10 m gap may be impossible in a blind alley and is no guarantee of safety. | Reduce speed before the restriction; stop early with room to manoeuvre within visible clear road. No universal metre/speed target. |
| High | Yield decision | Nearest pocket is not necessarily behind the driver; the lesson assumes this driver always reverses. Slope and obstacle cases are absent. | Explain right-side meeting, nearest-pocket rule, downhill yielding to uphill, and obstructed-side yielding. Do not enter without an exit; priority never licenses forcing an unsafe gap. |
| High | Pocket choice | Any recess or side road is implicitly usable. It may be private, occupied, a pedestrian space, blind junction or too small for mirrors/body. | Use a permitted, visible, firm space with enough whole-vehicle clearance and passing room; do not block a junction, doorway or pedestrian route or mount a pavement. Prefer forward access when safe. |
| High | Reversing | Agreement by flashing lights/hand wave and under 5 km/h imply permission and safety, ignoring motorcycles behind, blind spots and prohibited reversing locations. | Agreement never substitutes for checks, signalling or law. Reverse only where permitted with safe rear/side visibility and a clear route; stop on uncertainty/person entering/lost guide. No universal reverse speed target. |
| High | Recovery | Hazard lights plus getting out in a blocked alley creates exposure and an unsecured vehicle; no safe fallback if reversing is impossible. | Stop/hold, do not get out merely to negotiate or blindly retreat. Communicate while stationary, seek trained/on-site assistance. Secure before any necessary permitted exit; guide outside the vehicle path/crush zones. |
| High | Priority quiz/safety | “Always” and “public-service vehicle” overgeneralize priority to vehicles not on qualifying duty/signals. | Use the statutory duty/signal qualification; yield right or stop safely, never manufacture passage by blind reversing. Replace all three questions with decision, stop-condition and priority scenarios. |
| Medium | Passing/restart | “Return to the middle” ignores right-hand travel and following bikes/pedestrians. | Hold while the entire opposing vehicle and following traffic clear; recheck all around, signal and return to the right-hand travel position only with sufficient room. |
| High | Main SVG | Pocket lies beyond an unbroken right wall; curved arrow starts at the car's front but misses the pocket, implying forward movement despite reverse advice. Ego lies left of centre for its upward heading. | Draw an actual open recess on the driver's right, correctly oriented cars and mirrors, nearest pocket ahead of ego, both stopped. No manoeuvre trajectory or implied turning-radius guarantee. |
| High | Variant SVG | Ego overlaps a wall, with no recess drawn. Gap graphic measures unrelated space and caption calls temporary yielding “parking”. | Same road/pocket geometry; entire ego including mirrors inside pocket, opposing car facing down with a matching neutral-colour passing arrow. Ego stays stopped with no arrow. |
| Medium | Approval/history | Sample reviewer endorses incomplete priority advice. | Remove only this sample approval; publish as unverified, preserve IDs/history, increment card/pack versions and move stale-approval fixture to an unchanged approved card. |

## Evidence and interpretation

- [Vietnam Government, Law 36/2024/QH15, Articles 16, 17, 18 and 27](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly. Article 17 requires slowing and keeping right; nearest-pocket,
  downhill/uphill and obstructed/unobstructed cases are explicit. It does not
  require reversing into a pocket. Article 16 requires side/rear checks,
  reversing signals and safety, and prohibits reversing on one-way roads,
  at junctions, obscured-view locations and other listed places. Article 27
  qualifies emergency duty/signals and requires yielding when priority signals
  are present. Article 18 informs securing the vehicle and safe door opening.
- The 320 x 200 SVG sources and shared `car` helper were inspected: rotation
  0 faces up and 180 faces down. Both old wall paths continue through the
  alleged pocket. No photos, charts, animation or other lesson-specific
  visualizations are attached.
- Learn/quick/spoken surfaces derive from the same card. Quick mode omits
  recovery and the variant image; reversing prohibitions and stop conditions
  must therefore remain in steps/safety, not solely in recovery or captions.
  Pre-drive checklist is preparatory and remains unchanged.

## Implementation plan

1. Save and commit this analysis before changing the implementation.
2. Rewrite the whole card as one coherent revision, including three quizzes;
   retain card/lesson/asset/checklist/quiz IDs. Use a six-minute estimate.
3. Replace only the two yield scenes and metadata. Show an illustrative
   level-ground, forward-access pocket example; before/after poses, not an
   executable swept path. Explain that actual clearance must be assessed.
4. Publish card 1.1.0 as unverified; append content release 2026.10.11, update
   generator/manifest, remove sample review and retain stale-review coverage.
5. Add guidance/quiz/history and actual SVG geometry regressions. Regenerate
   deterministically and verify unrelated SVGs remain unchanged.
6. Run focused and full tests, lint and build. Inspect both rendered diagrams
   and the actual lesson on desktop/mobile, quick mode and quiz interaction.
   Append verification evidence and commit the coherent revision.

## Baseline

Clean worktree. Baseline content/asset/validation suites: **31 tests passed**.
No independent instructor approval is claimed by this review.
