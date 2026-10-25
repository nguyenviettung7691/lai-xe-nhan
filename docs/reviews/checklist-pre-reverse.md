# Checklist review: before reversing

Date: 2026-10-25. Scope: `pre_reverse` item wording, conditional checks,
stable IDs, and hazards that can change while a vehicle is moving slowly.
Editorial safety review; not a substitute for supervised practice.

## Findings

| Priority | Finding | Risk in ordinary use | Mitigation |
| --- | --- | --- | --- |
| High | A fixed “under 5 km/h” value was presented as a universal limit. | A numeric ceiling may be treated as a target despite visibility, vehicle response, and the space available to stop varying by situation. | Removed the number; require a very slow maneuver that can be stopped within the observed clear space. |
| High | “No person or motorcycle behind” described a single snapshot. | Pedestrians, children, or motorcycles can enter the path after the initial check. | Require an initial direct check and continued observation while moving. |
| High | The original space check omitted the whole path and overhead clearance. | A clear parking space can still have low objects, protrusions, or an obstructed exit path. | Check the complete intended path, low/high obstacles, and clearance before moving. |
| High | Camera/sensor wording treated equipment being operational as a safety prerequisite, without naming its limits. | Some cars have no such equipment; a working camera can still hide, distort, or fail to detect an object. | Make it conditional and supporting only; retain mirrors and direct checks, stop when uncertain. |
| High | No explicit plan existed for an obstructed view or a lost spotter. | A driver can continue when the person guiding is out of sight or a hazard enters the path. | Add a must-level conditional item: choose another approach or use an agreed, visible spotter; stop if contact/visibility is lost or a person enters the path. |

## Review and implementation

- Kept all five existing IDs and added `reverse-spotter`; the checklist remains
  linked to its existing lessons and saved state.
- Replaced the fixed speed with a stop-within-visible-space condition.
- Clarified that the driver must scan before and during the maneuver, inspect
  the whole path and overhead clearance, and not rely on camera/sensor output.
- Added a stop condition for obscured visibility and spotter loss.
- Focused regression checks verify the no-number wording, continuous
  observation, camera limitations, and stop condition.

## References and limits

- [Vietnam Law 36/2024/QH15 on Road Traffic Order and Safety](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm)
  provides local context for protecting people and following traffic rules.
- Vehicle cameras, sensors, mirrors, and sight lines vary by model and
  installation. The driver remains responsible for checking the path; use the
  owner's manual for vehicle-specific equipment and controls.

## Validation

- `npm test -- src/content.test.ts src/content/checklists.test.ts
  src/services/checklist/index.test.ts` — 3 files, 22 tests passed.
- `npm run lint` and `git diff --check` — passed.
