# Review and mitigation plan: `parking-lowlight`

Date: 2026-10-25. Scope: the complete Vietnamese lesson, steps/cues,
mistakes, recovery, safety, mnemonic, three quiz questions, both generated
SVGs and their captions/alt text, release/review metadata, shared checklist,
learning/quick/hands-free views and spoken-instruction sources. This is an
editorial and technical review, not independent driving-instructor approval.

## Analysis before implementation

| Priority | Surface | Finding and consequence | Mitigation |
| --- | --- | --- | --- |
| High | Context and quiz | Suggests relying more on remembered landmarks and sound when vision is poor. Quiet vehicles, children and low obstacles may not produce sound. | Require current visual confirmation of the entire intended path; sound supplements observation, never proves clearance. Stop and seek help or a better-lit permitted space if visibility remains inadequate. |
| High | Lighting | Automatically enables fog lamps just because a basement is dark. Low beams face forward and cannot establish clearance behind. | Use dipped headlights, verify reverse lamps, clear windows/mirrors/camera when safely parked, avoid high-beam glare and do not use fog lamps merely for darkness. |
| High | Survey and space selection | Mandates a drive-past and an empty neighbouring bay, then recommends a space near a pedestrian route. This can add manoeuvres or pedestrian conflict without solving visibility. | Choose a sufficiently lit, permitted bay with adequate clearance, away from pedestrian crossings/access, without a mandatory extra circuit or empty-side guarantee. Never continue driving to survey an unseen path. |
| High | Reversing | Fixed 50 cm segments and speed ceilings can be mistaken for safe clearance. Omits continuous direct observation, front swing and a full stop before selecting reverse. | Stop and check all around before R; crawl at walking pace or slower only through currently visible clear space, stop as often as needed without a distance formula. |
| High | Guide and recovery | A helper merely has to see the rear, not remain visible to the driver. Advises getting out without securing the vehicle or checking the exit. Hazard lights can appear to grant permission to continue. | Agree signals while stopped; guide stays visible, outside the path and crush zones; stop on lost contact. Secure before any safe exit; call staff instead if the car or exit cannot be made safe. Warning lights do not confer priority. |
| Medium | Main SVG | Car faces right but cones fan down rather than forward. Reverse curve starts at the left/rear then moves up, initially inconsistent with car heading. A continuous line closes the bay entrance. | Replace with a simple straight-reverse example, front down/rear up, open U-shaped bay. Separate small forward dipped-beam and rear reverse-lamp light symbols; label these schematic, not measured or guaranteed visible areas. Reverse arrow starts behind the rear and points into the bay. |
| Medium | Variant SVG | Cone and caption imply lowering windows creates a rear observation area. No actual guide, no lost-contact stop condition. | Show a stationary vehicle and a guide off to one side, within an illustrative sight line, outside the straight vehicle corridor. No motion arrow, audio cone or promised blind-spot coverage. Caption requires a stop on lost contact. |
| Medium | Publication | A sample reviewer is displayed as expert approval. | Remove only this sample review, retain publication with `published_unverified`, and preserve stable lesson, asset and quiz IDs. Retarget the stale-approval validation fixture to a still-approved card. |

## References checked

- [Vietnam Government: Law 36/2024/QH15, Articles 16, 18–20](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm):
  Article 16 requires observation to the sides and rear, a reversing signal and
  safe conditions; it prohibits reversing in obscured-view locations and other
  listed road areas. Articles 18–19 require securing before leaving and checking
  before opening a door. Article 20 governs dipped/high-beam use. A basement
  parking bay is not a road tunnel or automatic permission to reverse anywhere.
- [UK Highway Code, rules 200–203](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203):
  suitable manoeuvring area, mirrors and blind spots, direct rearward observation,
  slow reversing, continuous all-round checks, front swing and help when needed.
- [UK Highway Code, rule 236](https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237):
  fog lamps can dazzle and obscure brake lights; darkness alone is not fog.
  This is a general safety reference, not a claim that UK thresholds are
  Vietnamese law or applicable inside every car park.

No manufacturer-specific light range, sensor coverage, stop distance or helper
position is universally safe. Avoid inventing such numbers. A guide supplements
the driver's checks, does not license moving into an unseen hazard.

The shared pre-reverse checklist already treats cameras as assistance and its
speed ceiling as a limit, not a target; retain it. Lesson instructions and cues
feed the existing TTS sources. Quick mode hides recovery and the variant, so
critical stop, guide and secure-before-exit instructions must also be in the
steps/safety. This lesson has two SVGs, no additional photos, charts or animation.

## Implementation plan

1. Commit this analysis and plan before editing lesson content or illustrations.
2. Rewrite the full lesson coherently, keeping eight or fewer steps, three
   mistakes and three quizzes. Use an explicitly automatic-car example for P;
   stop rather than compensate for inadequate visibility.
3. Replace only the two low-light scenes, with semantic SVG groups, explicit
   front/rear labels, correct arrow/light orientation and an open bay. Update
   descriptions to distinguish lighting, motion and illustrative guide sight.
4. Increment card/content-pack versions, retain release history and remove the
   sample approval. Add content and geometric regression tests; adapt the
   approval test fixture without weakening its original validation purpose.
5. Regenerate assets, verify determinism and unchanged unrelated SVGs. Run
   relevant content/asset/validation tests, lint and production build. Inspect
   both diagrams, text bounds and desktop/mobile learning and quick modes,
   quiz scoring and the hands-free instruction source.
6. Record actual verification results here and commit the coherent revision.

## Baseline

Clean worktree. Baseline content, asset and validation suites: **31 tests
passed**. Both original diagrams inspected in the rendered lesson: incorrect
main light orientation and variant visibility cone confirmed.

## Verification results

- Analysis and mitigation plan committed first as `75ec7d4`.
- Card is now **1.1.0**, content pack **2026.10.6**. Historical releases,
  lesson/card/asset/checklist/quiz IDs retained. Removed only this card's sample
  approval; browser shows the independent-validation warning with no sample
  reviewer. The stale-approval test now uses still-approved `narrow-creep` and
  continues to verify the same rejection behaviour.
- Rewrote all eight steps and cues, three mistakes, recovery, safety, mnemonic
  and three questions. No renderer or shared-checklist changes were necessary.
  Increased the estimated reading time from three to five minutes.
- Replaced both SVGs and descriptions. Tests check car heading, open bay,
  side clearance, rear-origin reverse arrow, front/rear lamp origins and
  directions, guide position outside the straight corridor, illustrative
  sight-line endpoints and absence of motion arrows in the stopped variant.
- **89 tests passed** across the content, asset, validation and all five
  parking-review regression suites (including 11 new low-light tests).
  Initial validation caught two non-action-first steps and the first geometry
  test helper truncating nested SVG groups; both were corrected and rerun.
- `npm run lint`, `npm run build` and `git diff --check` passed. Build emitted
  only existing third-party Zod annotation warnings.
- Two consecutive asset generations produced identical manifests; checksum
  tests cover generated file bytes. Only the two low-light SVGs changed;
  unrelated artwork remained unchanged. All 46 assets total **123.08 KB**.
- Inspected both rendered diagrams on desktop and at **390 × 844** mobile.
  Checked every SVG text bounding box: none outside the 320 × 200 canvas.
  Both images loaded at their expected natural width, captions wrapped, and
  neither desktop (**1440 × 1000**) nor mobile had horizontal page overflow.
- Desktop/mobile quick mode retains eight steps, the stop instruction and
  secure-before-exit guidance while showing only the main image, as intended.
  Learning mode displays both images. Quiz browser exercise returned **0/3**
  for incorrect choices, then **3/3** after retry with the correct choices.
- Inspected the live TTS component's inputs: mnemonic, eight revised steps and
  safety (**10 entries**); full-script and step inputs contain stopping,
  securing and pedestrian-access guidance without the old fixed-distance rule.
  This checks the instruction source, not acoustic quality or speech-engine
  availability.

Independent qualified-instructor review and practice in the actual vehicle and
car park remain necessary; the revision does not claim certification, measured
lighting coverage or a universally safe manoeuvring path.
