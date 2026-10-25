# Checklist review: before driving

Date: 2026-10-25. Scope: `pre_drive` item wording, priority, saved IDs,
home-page description, and checklist completion framing. Editorial safety
review; not a vehicle inspection or independent instructor certification.

## Findings

| Priority | Finding | Risk in ordinary use | Mitigation |
| --- | --- | --- | --- |
| High | The description and home tile promised a 20-second check. | A driver could rush the checks or infer that a short tick-through establishes roadworthiness. | Removed the duration promise and added a pre-start walk-around item for obvious tire damage, leaks, people, and obstacles. |
| High | Mirror hint advised seeing part of the vehicle body. | That can consume mirror view of the road and does not remove blind spots. | Ask users to set mirrors for a useful rear view and explicitly retain direct observation for blind spots. |
| High | Belt item covered no one beyond the driver. | Passengers or children could be missed in a real family trip. | Cover every occupant and a child restraint appropriate to the child and vehicle. |
| Medium | Start instruction required “P”. | It assumed an automatic transmission and omitted the manual's start procedure. | Distinguish automatic and manual controls, keep the parking brake applied, and defer to the vehicle manual. |
| High | Any red warning remaining after start was framed as a stop signal. | Some vehicles illuminate indicators for a normal self-check or parking-brake state; color alone is not a diagnosis. | Explain self-check, require consulting the manual, and identify serious warnings/vehicle stop messages as reasons not to continue. |
| High | Driver readiness and load security were absent. | Fatigue, alcohol/impairing substances, unsecured objects, or blocked sight lines can make an otherwise prepared car unsafe. | Add must-level readiness and a load/visibility check. |
| High | A fully ticked list said the user was ready to drive. | The app cannot verify a checkbox or certify mechanical condition. | Add a stationary-use warning and change completion wording to report only that boxes were marked. |

## Review and implementation

- Preserved the `pre_drive` scope and all six pre-existing item IDs; added
  `walkaround`, `driver-ready`, and `load-secure`. Existing checked state
  remains keyed by its original IDs.
- Expanded the list to cover people, vehicle, restraints, driver state,
  operating controls, energy/range planning, warning indicators, and cargo.
  Removed the unsupported time estimate.
- Added a checklist-wide warning not to read or interact with the screen while
  driving. The progress message no longer asserts that a ticked list means
  the vehicle is ready to move.
- Tested unique IDs, continuous numbering, pre-drive coverage, and the
  absence of the 20-second claim. Existing card-to-checklist links remain
  valid.

## References and limits

- [Vietnam Law 36/2024/QH15 on Road Traffic Order and Safety](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm)
  informs the local legal context for restraints and safe road use. No detailed
  legal threshold is restated here.
- Vehicle-specific controls and warnings vary; use the exact vehicle manual.
  A checklist cannot confirm hidden mechanical faults or replace inspection,
  maintenance, local rules, or judgment.

## Validation

- `npm test -- src/content.test.ts src/content/checklists.test.ts
  src/services/checklist/index.test.ts` — 3 files, 21 tests passed.
- `npm run lint` — passed.
- `git diff --check` — passed.
