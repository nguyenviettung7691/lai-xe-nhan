# Checklist review: before leaving the vehicle

Date: 2026-10-25. Scope: `post_park` item wording, safe vehicle securing,
occupant checks, door opening, and compatibility with automatic/manual
vehicles. Editorial safety review; not vehicle-specific operating instruction.

## Findings

| Priority | Finding | Risk in ordinary use | Mitigation |
| --- | --- | --- | --- |
| High | Parking gear was described as “P” for every vehicle. | Manual-transmission vehicles do not have P, and vehicle parking procedures vary. | Require the vehicle to be fully stopped and direct users to the applicable P/gear procedure in the manual; do not engage P while rolling. |
| High | No item asked whether all occupants had left. | A child, passenger, or pet could be overlooked, especially when exiting in a hurry. | Add a must-level seat check before locking; explicitly warn not to leave children or pets alone in the vehicle. |
| Medium | “Pull the handbrake” assumed a mechanical lever. | Electronic parking brakes are common, and activation/confirmation differs. | Refer to the vehicle's parking brake control and verify that the vehicle is held, especially on a slope. |
| High | Door advice named only motorcycles and treated the far-hand method as sufficient. | Cyclists, pedestrians, and other traffic may approach; a turning motion does not guarantee a clear path. | Require mirror plus direct observation, wait for a clear gap, open cautiously, and describe the far hand only as an aid. |
| Medium | Lights/engine instruction implied a conventional ignition and no need to secure the vehicle. | Hybrid/electric controls and automatic lighting vary; an unlocked vehicle or visible valuables create avoidable risks. | Use vehicle-neutral shut-down wording, check lights/accessories, close windows, and add a lock/keys/valuables item. |

## Review and implementation

- Preserved the five existing item IDs and added `park-occupants` and
  `park-lock`.
- Updated gear and parking-brake wording to support manual, automatic, and
  electronic systems without prescribing a universal sequence.
- Added occupant/pet confirmation, traffic-aware door opening, and vehicle
  security checks. The list does not imply a particular slope-parking gear
  choice; follow the exact vehicle procedure.
- Added focused assertions for the manual-transmission case, passenger/pet
  check, cyclists, and locking.

## References and limits

- [Vietnam Law 36/2024/QH15 on Road Traffic Order and Safety](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm)
  informs the local road-safety context; no legal threshold is restated.
- Parking controls, auto-light behavior, and the correct gear/parking-brake
  procedure differ by model. Use the vehicle owner's manual; a checked item
  cannot verify that a vehicle is physically secured.

## Validation

- `npm test -- src/content.test.ts src/content/checklists.test.ts
  src/services/checklist/index.test.ts` — 3 files, 23 tests passed.
- `npm run lint` and `git diff --check` — passed.
