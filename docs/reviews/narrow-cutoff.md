# Review and mitigation plan: `narrow-cutoff`

Date: 2026-10-25. Scope: the complete card, instructions/cues/speed hints,
mistakes, recovery, safety, mnemonic, all three quizzes, both generated SVGs,
captions/alt text, review/release metadata and learn/quick/audio presentation.
This is editorial and technical review, not independent instructor approval.

## Analysis before implementation

| Priority | Surface | Finding and consequence | Mitigation |
| --- | --- | --- | --- |
| High | Objective / braking / quiz 2 | Avoiding sudden braking and always braking gently can delay an emergency stop. | Distinguish early controlled slowing from immediate emergency braking; with ABS apply firm continuous pressure, not pumping. Refer to the vehicle handbook; do not promise shorter stopping distances. Avoid reflex swerves into unseen traffic. |
| High | Entry / cue / quiz 1 | Repeated 30 cm nose movements to become visible encourage blocking motorcycles, pedestrians or cyclists before the driver can see. Under 10 km/h is no guarantee of safety. | Stop before the conflict area; walking pace or slower only within observed clear space. No fixed edging increment. If sight cannot be obtained without intrusion, remain stopped and seek safe assistance or another lawful route. |
| High | Observation / priority | Looking toward the busiest direction first can omit quiet-side traffic, close motorcycles or blind spots. Priority from a branch road is not explained. | Follow traffic controls; branch/non-priority traffic yields to the main/priority road from both directions. Alternate observation of both directions, close front, mirrors, sides and blind spots; signal throughout turning. Do not generalize every alley to a priority relationship. |
| High | Safety / restart / quiz 3 | Pedestrian protection is framed only around marked crossings. Waiting for one motorcycle does not establish a safe gap. | Stop for people crossing even without markings; account for bicycles, following motorcycles and both directions. Recheck adequate time/space for the whole manoeuvre without forcing others to brake or swerve. No horn, gesture, fixed length or one-bike-length clearance establishes safety. |
| High | Recovery | No explicit response if the nose is already exposed or contact has occurred. A novice may blindly reverse at the intersection. | Stop/hold, do not automatically reverse or advance into danger. Explain prohibited reversing at intersections/obscured views and safe assistance, guide placement and securing the vehicle before any permitted exit. If contact occurs check people, obtain help and meet accident obligations. |
| High | Main SVG | Straight alley does not depict the described T-junction. Bike at rotation 44 degrees points up/right, while its dashed curve runs down/right into the car. Red path has a green arrowhead; translucent cone has no explanation. | Draw an open T-junction, stationary car before the conflict area and a correctly oriented crossing motorcycle with a matching red dashed direction arrow. Label front/stopped state, road relationship and conflict area; remove unexplained cone and ego motion arrow. |
| High | Variant SVG | Horizontal bracket is labelled one motorcycle length although forward clearance is vertical. It implies a universal safe distance; same-heading bike does not show a crossing conflict. | Same junction/car position, first bike beyond the mouth, another approaching behind it and a bike from the opposite direction. Correctly oriented, colour-matched arrows; explicitly remain stopped and recheck both directions. No distance bracket. |
| Medium | Approval / history | Seed expert approval is not an independent review of the revised card. Generic stale-approval test relies on this card. | Publish as unverified, remove only its sample review; move the generic fixture to an unchanged approved card. Preserve stable IDs and history; increment card/pack versions. |

## Sources and interpretation limits

- [Vietnam Government: Law 36/2024/QH15](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: Articles 11 (signals), 12 (speed/visibility, crossings even
  without markings), 15 (observation, signals and yielding when turning),
  16 (reversing restrictions), 21 (horn purposes and night restrictions),
  22 (branch/main and non-priority/priority relationships).
- [UK Highway Code: rules 117-120](https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158),
  read directly: normal versus emergency braking and ABS pressure/handbook
  guidance. Used only for braking principles, not UK traffic positioning.
- [UK Highway Code: rules 159, 170, 180](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203),
  read directly: blind spots, all-round observation, motorcycles at junctions
  and a safe gap before emerging. UK left-side driving rules are not applied.

Both images are original schematic top-down illustrations, not measured
stopping distances, certified sight lines or guaranteed safe gaps. They show
a branch joining a main road with right-hand traffic, not every alley or a
complete left/right-turn trajectory. No other photos, charts or animations
are attached to this lesson. The shared pre-drive checklist is preparation,
not a junction-gap assessment. Quick mode hides recovery and the variant;
full audio reads instructions and safety, not image captions. Essential
emergency, no-blind-entry/reversing and restart conditions must be in those
surfaces. No shared renderer or unrelated lesson changes are planned.

## Implementation plan

1. Save and commit this analysis/plan before implementation.
2. Revise the whole card coherently, keeping card/lesson/checklist/asset/quiz
   IDs, high risk and difficulty 3. Use card 1.1.0 and six-minute estimate.
3. Replace only cutoff scenes/descriptions in the generator; regenerate
   SVGs/manifest and release pack 2026.10.12.
4. Remove the sample approval, move the coupled validator fixture and add
   focused content/assessment/metadata and numeric diagram regressions.
5. Run focused/full tests, lint, production build and deterministic asset
   regeneration. Inspect actual desktop/mobile images, quick mode, quiz
   behaviour and image loading. Confirm only the intended SVGs changed.
6. Record evidence here and commit the completed revision.

## Baseline

- Initial worktree clean; asset and validation baseline: **17 tests passed**.
- Read original card, generator, actual SVGs, manifest/release/review wiring,
  card normalizer and lesson renderer including quick/audio behaviour.
- Browser confirmed both original images load and the sample approval is
  displayed; main screenshot confirmed heading/arrow mismatch, absent
  junction and unexplained cone.

## Implementation and verification

Pending.
