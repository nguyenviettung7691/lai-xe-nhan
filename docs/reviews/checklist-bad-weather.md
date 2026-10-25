# Checklist review: rain, flooding, and long descents

Date: 2026-10-25. Scope: `bad_weather` item wording, use timing, lighting,
visibility, flood response, and safe stopping. Editorial safety review; not
emergency dispatch or a substitute for official instructions.

## Findings

| Priority | Finding | Risk in ordinary use | Mitigation |
| --- | --- | --- | --- |
| High | “Emergency weather” and “use when encountering” could encourage opening the checklist while driving. | Reading or tapping diverts attention exactly when visual attention is needed most. | Rename the list for its scenarios and state it is for pre-entry or after stopping safely; the shared checklist notice reinforces this. |
| High | The old label categorically prohibited high beams for all rain. | Lighting need and glare conditions vary; a blanket instruction can conflict with local rules or a driver's visibility needs. | Require front lights when rain/bad weather limits visibility, check rear lamps actually illuminate, and use low beam when needed to avoid glare. Do not assume AUTO/DRL controls the rear lamps. |
| High | No independent item asked whether the windshield/view remained clear. | Working lights do not help if spray, fogging, or poor wipers prevent seeing the road. | Add a must-level visibility item and an early safe-stop condition if the visible stopping space is inadequate. |
| High | Floodwater and rising water require a clear no-entry/assistance decision. | A driver may rely on a vehicle ahead, attempt to measure depth on foot, or try to cross rising water. | Preserve the no-entry rule; do not drive/wade through water or bypass barriers; call rescue and follow instructions if water rises around the vehicle. |
| High | A generic “safe place to stop” can be misread as permission to rest on a motorway emergency lane. | An ordinary rain stop in a live-road refuge exposes occupants and other traffic to danger and may violate local rules. | State that an emergency lane is not a rest stop; stop there only for a qualifying forced stop under applicable rules, then seek help. |
| Medium | The checklist combines rain, flooding, and long descents. | The relevant check changes by situation and should not be performed as a driving task. | Keep one linked checklist but make it scenario-labelled, stationary, and explicit that its items are conditional. Preserve the useful brake-before-descent, following-space, and no-fixed-threshold guidance. |

## Review and implementation

- Preserved all six existing weather checklist IDs and added `bw-visibility`.
- Reworded lighting to match condition-based front-light use, rear-lamp
  verification, and glare avoidance without a blanket high-beam rule.
- Kept the existing speed, gap, brake, and flood mitigations; strengthened
  visibility and safe-stop decisions without introducing a fixed speed,
  distance, or time threshold.
- Updated the scenario title/description and added assertions for stationary
  use, visibility priority, rear lamps, no fixed speed ratio, and flood
  response.

## References and limits

- [Vietnam Law 36/2024/QH15 on Road Traffic Order and Safety](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm)
  provides the local framework, including rules for road use and forced
  stops. Follow the current law, road signs, authorities, and vehicle manual.
- [Government policy portal summary of Article 20 on vehicle lights](https://xaydungchinhsach.chinhphu.vn/luat-trat-tu-an-toan-giao-thong-duong-bo-quy-dinh-su-dung-den-tin-hieu-coi-119241219161306094.htm)
  says front lighting is required when rain or bad weather limits visibility.
- This checklist intentionally gives no universal speed, following-time, or
  flood-depth threshold. If conditions cannot be managed safely, prioritize
  stopping/assistance over completing the checklist.

## Validation

- `npm test -- src/content.test.ts src/content/checklists.test.ts
  src/services/checklist/index.test.ts` — 3 files, 25 tests passed.
- `npm run lint` and `git diff --check` — passed.
