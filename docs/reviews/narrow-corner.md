# Review and mitigation plan: `narrow-corner`

Date: 2026-10-25. Scope: the complete card, all instructions/cues/hints,
mistakes, recovery, safety, mnemonic, quizzes, both generated SVGs,
captions/alt text, release/review metadata and learn/quick/TTS presentation.
This is an editorial and technical review, not independent instructor approval.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Entry position / mnemonic / quiz 1 | Unconditionally hugging the outside edge can encroach on opposing traffic, pedestrians or parked vehicles. "Wide, late" is not a permission to leave the lawful part of the road. | Assess the entire turn before entry; position only within permitted space with clearance on both sides. If the vehicle cannot turn safely, do not force entry. Explain left/right turns, not just the illustrated right turn. |
| High | Turning trigger | "Shoulder past wall" is not a vehicle-independent steering point; wheelbase, turning circle, overhang, seating position and corner geometry vary. | Remove the marker, fixed steering trigger and guaranteed recipe. Use progressive observation of the whole swept vehicle, not a universal body landmark or full-lock rule. |
| High | Speed / visibility | Under 10 km/h and constant speed can still be much too fast for a blind corner. | Walking pace or slower, always able to stop in visible clear space; stop when view or clearance is insufficient. Yield to pedestrians, bicycles, motorcycles and oncoming traffic. |
| High | Mirrors / exit | A mirror does not necessarily show the rear tyre or low wall. Straightening solely because the nose points into the new alley can put the rear corner against the wall. | Alternate forward, both sides, mirrors and direct blind-spot checks; sensors are aids only. Unwind progressively only with the whole vehicle clearing the inside corner and sufficient space ahead. |
| High | Recovery | Automatic short straight reversing at a blind turn is unsafe and may be unlawful at an intersection or obscured-view location. A straight retreat also does not undo a curved approach. | Stop/hold; do not automatically reverse or add steering. Secure before inspection; protect any guide. Reverse only where lawful with observed clear sides/rear and a reversing signal, never at an intersection or obscured-view location; otherwise request assistance. |
| Medium | Signals / horn / quiz 3 | A short horn is presented as the primary blind-corner action, with no indicator, priority or horn restrictions. It does not make unseen space safe. | Observe, slow/stop, yield and signal throughout the turn. Horn only for lawful warning, never proof of priority; include Vietnamese night-time restrictions. Test a stop condition instead. |
| High | Main SVG | The upward-facing car's right-turn arrow ends at (248,66), inside the top-right wall (x >= 214, y < 96). It depicts driving through a wall; the numbered pin is unexplained. No rear-wheel track is shown. | Replace with a correctly oriented L-shaped corridor, identifiable front/rear, open mirrors and wheel positions. Show distinct same-side front/rear wheel tracks from consistent low-speed rigid-vehicle geometry, entirely within the road. Clearly state that this is a partial, schematic example, not an entry marker or guaranteed full swept envelope. |
| High | Variant SVG | The red curve also ends inside the wall. It does not depict a rear wheel, curb or contact, although its caption claims the rear climbs a curb. Red line has no direction marker and no legend. | Show a stopped angled car before contact at the same corner. Only the hypothetical continuation of its inside rear wheel is red/dashed, with a marked wall intersection and explicit stop instruction, not an instruction to follow it. Do not invent a curb. |
| Medium | Approval / history | Sample expert approval endorses a universal rule, not independent review of this revised card. Existing stale-review test depends on this card. | Publish as unverified, remove only this sample approval, retain IDs/history, release a new pack and move the generic stale-review fixture to another approved card. |

## References and interpretation limits

- [Vietnam Government: Law 36/2024/QH15](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: Articles 12 (speed suited to conditions, narrow roads and
  restricted visibility), 15 (observation, indicators throughout the turn,
  yielding and turning only safely), 16 (side/rear checks, reversing signal
  and prohibited locations including intersections and obscured views),
  21 (permitted horn purposes and 22:00-05:00 restrictions).
- [SGI professional driver handbook: steering forward](https://sgi.sk.ca/pro-driver/-/knowledge_base/pro-drivers/steering-forward),
  read directly: rear-wheel off-tracking has a smaller radius; wheelbase and
  vehicle turning characteristics matter. Only this geometric principle is
  used, not its truck/trailer lane positioning or wide-turn manoeuvres.
- [UK Highway Code, rules 159, 161, 170 and 202](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203),
  read directly: mirrors/blind spots, vulnerable road users and all-round
  checks. General observation reference only; UK left-side positioning is
  not applied to Vietnamese roads.

No public-road manoeuvre is certified by a schematic. The mathematical
diagram uses ideal low-speed rolling without slip, not a measured vehicle,
full swept-body simulation or a transferable steering point.

The renderer shows all steps/safety in quick mode and full/step TTS, but
hides the second diagram and recovery in quick mode. Essential stop,
no-blind-reverse and restart conditions must therefore be in spoken
instructions/safety, not only recovery or a caption. No other photos,
charts or lesson-specific animations are attached to this card. The shared
pre-drive checklist is preparatory, not a corner-clearance assessment;
no unrelated lesson or shared-renderer changes are planned.

## Implementation plan

1. Commit this analysis and mitigation plan before changing lesson content.
2. Revise the complete card coherently, keeping stable card, lesson,
   checklist, asset and quiz IDs. Preserve history, use card 1.1.0 and a
   realistic reading estimate; retain medium risk and difficulty 3.
3. Replace only the two corner scenes and descriptions in the generator.
   Regenerate SVGs/manifest; release content pack 2026.10.10.
4. Remove only this card's sample approval and update the coupled generic
   stale-review fixture. Add focused content, quiz, metadata and numeric
   geometry regressions (including path/wall intersections and headings).
5. Run focused/full tests, lint, production build and deterministic asset
   regeneration; verify only the two intended SVGs changed. Inspect both
   actual diagrams, desktop/mobile lesson, quick mode and quiz behaviour.
6. Append verification evidence and commit the completed revision.

## Baseline

Clean initial worktree. Related mirror, asset and validation tests:
**29 passed**. Read card, generator, assets, review/release metadata and
renderer; visually confirmed the main arrow crossing the wall in-browser.

## Implementation and verification

- Analysis/plan committed first as `bf03341`, before lesson implementation.
- Card **1.1.0**, content pack **2026.10.10**: revised context, objective,
  seven instructions/cues, speed/steering hints, mistakes, recovery,
  safety, mnemonic and all three quiz questions. Reading estimate is six
  minutes; stable identifiers, original history, medium risk and difficulty
  3 remain. Removed only this card's sample approval and published it as
  **unverified**; independent driving-instructor review is still required.
- Replaced both corner SVGs at their existing URLs. The main illustrates
  right-side front/rear wheels on a common-centre low-speed turn, with
  corresponding visible tyres, steering angles, open mirrors, distinct
  arrow colours/dash patterns and a legend. Both tracks remain on the road.
  The variant's entire stopped body/mirrors remain clear; its hypothetical
  rear-wheel continuation genuinely intersects the inner wall at the X.
  Captions/alt text distinguish a partial arc from a full swept envelope
  and a hazard prediction from a movement instruction.
- Added **12 focused regression tests**, including numerical track radii,
  wheelbase, endpoints/direction, real SVG body/mirror geometry over every
  degree of the illustrated main arc, stopped variant clearance,
  predicted wheel/wall intersection and X location. Also cover all card
  guidance, quick/spoken stop conditions, quiz answers and release metadata.
  The generic stale-review test now uses still-approved `narrow-yield`;
  no adjacent lesson content was edited.
- Focused corner/asset/validation suite: **29 passed**. Full suite:
  **191 tests across 21 files passed**. ESLint and production
  TypeScript/Vite/PWA build passed. Build emitted only dependency
  annotation warnings from Zod/Rollup; no build failure.
- Asset regeneration is deterministic: **46 SVGs plus manifest**
  byte-identical on the second successful run. Only the two corner SVGs
  changed relative to baseline; other asset records are unchanged.
  Main **5.23 KB**, variant **4.69 KB**, entire core asset pack
  **136.89 KB**, within the 60 KB/asset and 2560 KB/core budgets.
- Browser: visually inspected both actual generated illustrations and the
  main diagram at **390 px** mobile width and **1136 px** desktop width.
  Both images loaded, all SVG text bounds stayed inside
  the 320 x 200 viewBox, and the lesson had no horizontal overflow.
  Both diagrams and all seven steps appear in learn mode; quick mode hides
  only the variant/recovery while retaining all steps, stop/no-blind-reverse
  conditions, safety and the unverified status.
- Browser quiz: two correct answers with an incorrect stop answer produces
  **2/3 (67%), not passed**; retry with all correct produces **3/3 (100%),
  passed**. Reviewed renderer inputs for full-script and step TTS, including
  essential safety in instructions/safety; no claim of vehicle-specific
  practical validation or audible speech-quality testing is made.
