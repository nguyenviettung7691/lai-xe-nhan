# Checklist review: before a highway trip

Date: 2026-10-25. Scope: `pre_highway` item usefulness, vehicle/driver
readiness, saved IDs, and phone/navigation behavior. Editorial safety review;
not a roadworthiness certificate or substitute for current signs and rules.

## Findings

| Priority | Finding | Risk in ordinary use | Mitigation |
| --- | --- | --- | --- |
| High | “Tire pressure and tread are good” had no way to judge “good.” | Drivers may guess pressure, overlook visible damage, or use the maximum printed on the tire instead of the vehicle recommendation. | Refer to the vehicle placard/manual and cold-tire measurement; check tread and visible damage. |
| High | There was no highway-specific brake/light check. | A vehicle can begin a high-speed trip despite degraded braking or an inoperative required lamp. | Add must-level normal brake/lamp operation and a clear defer/repair condition for serious faults. |
| High | Fuel planning mentioned only the next service stop. | EV drivers and trips with detours/closures may be underplanned; a dashboard range estimate is not a guarantee. | Include fuel or charge, route variation, and a suitable planned stop without claiming exact range. |
| Medium | Wipers were checked but demisting/visibility was not. | Rain or fogging can make forward view inadequate after departure. | Check washer/wiper and demisting function; defer or stop safely if visibility cannot be kept clear. |
| Medium | Route planning covered only the exit. | Last-minute lane changes or abrupt decisions after a missed exit can be hazardous. | Plan route, exits, and stops before moving; explicitly advise not to turn/double back abruptly. |
| High | Driver alertness wording only mentioned sleepiness. | Impairment, medication effects, illness, and fatigue can make a long trip unsafe even if the driver does not feel sleepy yet. | Name impairment/illness and alternatives: switch drivers, rest, or postpone. |
| High | “Phone mounted and navigation on” could normalize interacting with it underway. | A securely mounted phone can still distract the driver. | Require route setup while parked and safe stopping before changes or phone use. |
| Medium | Load security and visibility were absent. | Loose objects may move during braking and cargo may obstruct sight lines. | Add a load/visibility check and avoid overloading. |

## Review and implementation

- Preserved the six existing IDs, including `hw-fuel` and `hw-phone`; added
  `hw-brake-lights` and `hw-load`.
- Made tire pressure actionable and distinguished recommended vehicle
  pressure from the tire sidewall maximum.
- Added EV-compatible route/range language, brake/lamp condition, wiper and
  demisting function, driver readiness, pre-trip phone setup, and secured
  cargo.
- Added focused assertions for tire guidance, brake/lamp severity, EV
  applicability, stationary phone setup, and load security.

## References and limits

- [Vietnam Law 36/2024/QH15 on Road Traffic Order and Safety](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm)
  informs local road-safety context; this checklist does not restate
  speed, spacing, or document requirements.
- Use the vehicle placard/owner's manual for tire pressure, warning lights,
  and equipment. Range, fuel consumption, braking, and charging access vary
  with the vehicle and route; a checklist cannot guarantee trip completion.

## Validation

- `npm test -- src/content.test.ts src/content/checklists.test.ts
  src/services/checklist/index.test.ts` — 3 files, 24 tests passed.
- `npm run lint` and `git diff --check` — passed.
