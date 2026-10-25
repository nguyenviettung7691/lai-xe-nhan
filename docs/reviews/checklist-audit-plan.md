# Real-world checklist content audit and mitigation plan

Date: 2026-10-25. Scope: all five interactive checklists in
`src/content/checklists.ts`, their persistent item IDs, and the checklist
screen/home entry point. This is an editorial safety review, not legal advice,
vehicle-specific instruction, or independent instructor certification.

## Analysis

The app contains five checklists: before driving, before reversing, before
leaving a parked vehicle, before a highway trip, and adverse weather. Their
items are user-ticked and stored by ID, so renaming existing IDs can discard
saved progress. The list data is also linked from lessons and the checklist
page treats a fully ticked list as a readiness signal. Consequently, new
items must be actionable and observable, stable IDs must be preserved, and
completion wording must not imply that a checklist substitutes for sound
judgment or a vehicle inspection.

| Checklist | Findings to mitigate |
| --- | --- |
| Before driving | A fixed “20 seconds” promise is unsupported for a meaningful pre-drive check. The mirror hint recommends seeing part of the car body, which can unnecessarily reduce the reflected roadway and increase blind spots. Seatbelt wording covers no passengers or child restraints; “P” assumes an automatic transmission; the red-warning hint overgeneralizes normal self-check/parking-brake lights. No walk-around for tires, visible leaks/damage or people/objects around the vehicle. |
| Before reversing | A fixed 5 km/h ceiling is presented as a universal rule and can be misread as a target. “No person or motorcycle behind” is only a snapshot, while a person can enter the path during the maneuver. There is no explicit stop condition, safe spotter practice, or instruction to check the whole path/overhead clearance; camera-only advice is not enough. |
| Before leaving the vehicle | “P” is automatic-only and the sequence can vary by vehicle. The list omits checking that all occupants (especially children) have left, and does not cover securing the vehicle/valuables. Door opening guidance should include cyclists and other traffic and must not imply that using the far hand alone makes opening safe. |
| Before a highway trip | Tire wording has no actionable reference point; route/fuel and fatigue are covered, but vehicle lights/brakes, load security, and practical range planning are not. Mounting a phone is insufficient unless routing is set before moving and the driver does not interact with it underway. |
| Adverse weather | The “emergency” framing and long mixed-scenario checklist could invite on-screen use while driving. It should be presented as a stationary preparation/decision aid, with earlier visibility and safe-stop decisions. Existing useful constraints—do not enter floodwater, increase following space, check lighting/brakes, avoid treating a time gap as a guarantee—must remain. |

## Mitigation principles

1. Tell users to review/tick checklists only while safely parked; do not handle
   the screen or read a checklist while driving.
2. Preserve all existing checklist IDs and scopes. Add new IDs only; keep
   their order and labels stable after release because saved state is keyed by
   item ID.
3. Replace fixed or vehicle-specific operating numbers with observable
   conditions and the vehicle manual. Do not promise a universal safe speed,
   stopping distance, start/park sequence, or checklist duration.
4. Use “must” for actions that directly prevent a serious hazard (restraint,
   clear reversing path, safe parking, safe visibility); use “should” for
   planning/supporting checks. Avoid wording that suggests a checked box
   guarantees the vehicle or trip is safe.
5. Make each item answerable in the actual context: distinguish checks done
   before starting from decisions that require stopping safely; mention
   gasoline/hybrid/electric vehicles where a generic fuel item would exclude
   them.
6. Keep advice jurisdiction-aware. Do not import another country's numerical
   rules; for controls and equipment, defer to the vehicle manual and local
   traffic signs/rules.

## Implementation and review sequence

Each numbered review will be a separate revision and commit after its
content, focused regression assertions, and review record are complete:

1. `pre_drive`: remove the 20-second claim, correct mirrors and warning-light
   language, cover all occupants/restraints and manual/automatic gear
   differences, and add a realistic exterior/vehicle check. Add the shared
   stationary-use notice and neutralize the “ready to drive” completion claim.
2. `pre_reverse`: remove the universal speed number; add continuous scanning,
   path/clearance checks, explicit stop/spotter conditions, and camera limits.
3. `post_park`: cover all occupants, secure parking using the vehicle's
   prescribed procedure, and check surrounding traffic before opening doors.
4. `pre_highway`: make tire, vehicle condition, load, route/range, driver
   readiness, and phone setup checks concrete without encouraging interaction
   while moving.
5. `bad_weather`: clarify stationary use and early decisions for poor
   visibility, flooding, and long descents; retain sound mitigations already
   present and avoid adding universal thresholds.

## Validation and references

- Baseline on 2026-10-25: `npm test -- src/content.test.ts
  src/services/checklist/index.test.ts` — 2 files, 19 tests passed.
- For every revision, run the focused checklist/content tests, review its
  resulting diff, and commit that checklist review separately. At the end,
  run the relevant full tests, lint, and production build.
- General legal context: [Vietnam Law 36/2024/QH15 on Road Traffic Order and
  Safety](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm).
- Lighting context: [Government policy portal summary of Article 20 on
  vehicle lights](https://xaydungchinhsach.chinhphu.vn/luat-trat-tu-an-toan-giao-thong-duong-bo-quy-dinh-su-dung-den-tin-hieu-coi-119241219161306094.htm).
- These references inform local context only. The checklist will not restate
  detailed legal thresholds; drivers must follow current signs, applicable
  rules, and the manual for their vehicle.
