# Review and mitigation plan: `parking-column`

Date: 2026-10-25. Scope: the complete card, cues, quiz, recovery, safety,
mnemonic, linked checklist, publication state, generated SVGs, accessible image
descriptions and their use in learning/quick/TTS modes. This is an editorial
and technical review, not professional certification or a vehicle-specific
parking recipe.

## Analysis before implementation

| Priority | Finding | Real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Steps and quiz prescribe moving 20 cm away from the column, with stopping at 30 cm or a continuous sensor tone. The main SVG invents a separate 60 cm dimension. | No reference point or vehicle geometry establishes these distances; a mirror or corner can hit a column before the sensor warns. | Remove fixed clearances and beep thresholds. Check the actual body, mirrors, corners and door space on both sides; stop immediately on doubt or any warning. Silence is not proof of clearance. |
| High | Driving past the bay and reversing in short observation intervals is the default. | A column hides children, motorcycles and low obstacles; a remembered survey becomes stale and intermittent checks miss new hazards. | Assess from a safe stopped position; require a currently clear path, continuous direct/mirror observation and creep slow enough to stop within visible space. Do not reverse into an obscured area. |
| High | Recovery simply says drive forward and try a wider path. | The aisle may be occupied; changing direction while moving or steering away from one hazard may strike the opposite vehicle. | Stop and hold first; check the complete new path, blind spots and front swing, yield, stop fully before R/D changes, and abandon the bay only via a verified safe route. |
| High | Door clearance is checked before switching off without securing the car or checking road users. | Rollaway, door strikes and trapping between the car and column remain possible. | Secure the automatic vehicle using foot brake, parking brake and P per its manual; confirm it is held, then check the door sweep and exit route. Stay in the driving seat and call assistance if unsafe. |
| Medium | Both SVGs use a continuous line across the bay entrance. The main curve starts away from the rear of a sideways car and is not a demonstrated swept path. | Confuses the bay entrance, heading and reverse direction and can imply a guaranteed collision-free steering recipe. | Use a dedicated open-mouth bay and a clearly aligned straight-reverse example only, with front/rear labels and no full turning path or guaranteed clearance. |
| Medium | The variant's gap is in the aisle, not between the column and door; shifting away from the column has no opposite-side limit. | Suggests any lateral offset creates usable door space and may encourage crossing the bay boundary. | Show a secured car inside both boundaries, mirrors and a front-door sweep next to the column, with clearance to the other side too. Identify a left-hand-drive example: front points down, driver door is on the image's right. |
| Medium | This card is `draft` and excluded from the app's public lookup. | Treating an editorial repair as approval would change publication behaviour without professional review. | Preserve `draft`, no reviewer claim, stable IDs and historical changelog. Test the exclusion; visually preview the draft without persisting any publication change. |

The shared `pre_reverse` checklist already explains that cameras/sensors are
supplementary and the speed ceiling is not a target. Retain it unchanged; expand
the card's own all-round, column, door and helper conditions instead. The lesson
has two SVG illustrations, no additional photos, charts or animations.

## Reference basis and limits

- [UK Highway Code, rule 202](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203#rule202):
  mirrors, blind spots, people and obstructions before reversing, slow movement,
  all-round observation and front swing.
- [Rule 203](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203#rule203):
  avoid reversing farther than necessary.
- [Rule 239](https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252#rule239):
  secure the vehicle before leaving and check around before opening a door.
- These are general safety references, not Vietnamese law. Follow local
  restrictions, signs, the vehicle manual and supervised practical instruction.
  None establishes a universal clearance, sensor threshold, steering point or
  safe door-opening distance. The diagrams are not to scale, visibility maps,
  sensor coverage maps or complete vehicle swept-path simulations.
- Apply the Web Interface Guidelines to the lesson's meaningful figures:
  accurate alt text/captions, explicit image dimensions, readable labels and
  mobile overflow checks. Avoid unrelated UI changes.

## Implementation sequence

1. Rewrite all directly related card fields together, keeping `draft` and IDs;
   increment its draft version and preserve the original changelog.
2. Replace only the two column scenes and metadata; show a straight aligned
   entry and a separate secured/door-check state in the same bay.
3. Add regression tests for instructions, quiz answers, stop/exit conditions,
   draft filtering, release history and measured SVG geometry.
4. Increment the content pack, regenerate assets/checksums, and verify the other
   44 illustrations remain unchanged and generation is deterministic.
5. Run focused tests, lint and production build. Inspect original and revised
   figures in a browser, including desktop/mobile draft previews, SVG text
   bounds, quiz interaction and quick-mode content. Review TTS data wiring
   without claiming audio output was auditioned.
6. Record verification below and commit this coherent lesson revision, with
   its documentation and tests, after validation.

## Verification results

- Implemented as draft card `0.2.0`, content pack `2026.10.7`. The original
  `0.1.0` changelog and earlier content releases remain intact. Card, lesson,
  checklist, asset, mnemonic and existing step/quiz IDs are preserved; three
  additional steps carry the missing observation/recovery/exit conditions.
- Preserved `draft` and the absence of an expert review. Both the regression
  test and a direct browser visit confirm `parking-column` is still excluded
  from the public lookup and displays the existing not-found state, not an
  approval badge. No publication filters or shared UI/checklists were changed.
- Focused validation:
  `npm test -- src/content/parking-column.test.ts
  src/content/parking-lowlight.test.ts src/content/assets.test.ts
  src/content/validation.test.ts src/content.test.ts`: **55 tests passed**,
  including **13** column-specific cases.
- Adjacent lesson regression:
  `npm test -- src/content/parking-align.test.ts
  src/content/parking-correct.test.ts src/content/parking-parallel.test.ts
  src/content/parking-slope.test.ts`: **47 tests passed**. Total: **102**
  passing tests across nine files.
- `npm run lint` and `npm run build`: passed, including TypeScript checking
  and PWA generation. Rollup emitted non-blocking annotation warnings from
  installed Zod code, not from the revised lesson.
- Tests inspect the generated geometry, not just scene names: three-sided
  open bay, car heading, mirror-inclusive lateral envelope, straight reverse
  arrow behind the rear and into the bay, pillar clearance, final body inside
  the bay, door hinge on the driver's side behind the mirror, circular sweep
  radius/endpoints and a door endpoint short of the pillar. The parked scene
  has no motion arrow. This verifies the drawn example, not real-car clearance.
- Compared manifest entries with Git HEAD: exactly the two column entries
  changed; the other **44** assets and their metadata remain unchanged.
  A second successful generation preserved SHA-256 hashes of both diagrams
  and the manifest exactly. Pack total: **123.88 KB**, within the core budget.
- Visually inspected both original illustrations before regeneration and both
  replacements afterward in Chrome. Confirmed the old detached dimension and
  door-gap problems, and the revised heading, arrow, column, mirror, open bay
  and left-hand-drive door relationships.
- For full UI checks only, substituted the draft's data for an existing card
  **in browser memory**, in an isolated context, without editing files or
  changing publication state. Inspected both revised figures in the real
  lesson renderer at measured **1136 px desktop** and emulated **390 px
  mobile** widths. All eight steps render, both images load with explicit
  dimensions and descriptive captions/alt text, and there is no horizontal
  page overflow.
- Measured every SVG text element with browser `getBBox()`: **no text outside
  either 320 by 200 viewBox**. The note bands and labels remain distinct.
- Browser interaction with the revised quiz returned **3/3 (100%)**, with the
  mandatory stop-condition badge present. Mobile quick mode retains all
  eight steps, the secure-before-exit instruction, stop guidance and main
  figure; switching back restores the variant. No browser console warnings
  or errors were recorded in the final preview.
- Source review of `LessonView.vue` confirms full-script TTS consumes the
  revised steps and safety, and per-step TTS also consumes the revised cues.
  No separate stale column narration exists; audio output was not auditioned.

Remaining release limitation: the card intentionally remains an unpublished
draft pending independent professional assessment. No diagram or automated
test certifies a safe distance, a usable exit or a steering recipe for a real
vehicle and bay.
