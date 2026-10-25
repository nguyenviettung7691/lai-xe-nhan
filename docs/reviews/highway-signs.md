# Review and mitigation plan: `highway-signs`

Date: 2026-10-25. Scope: the entire Vietnamese lesson, cues, mistakes,
recovery, safety, mnemonic, quiz answers, both diagrams and their accessible
descriptions, publication metadata and shared lesson consumers. This is an
editorial/technical review, not independent instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Minimum speed | Unqualified "between minimum and maximum" and treating any below-minimum driving as a mistake can encourage driving into queues, poor visibility or slippery conditions. | Explain that the minimum applies in favorable, safe traffic conditions; slow or brake for danger, even below that number. Maximum is a ceiling, never a target. |
| High | Lane choice and returning after overtaking | "Slower means right" ignores vehicle/lane restrictions; automatic return omits signals, mirrors, blind spots, permitted markings and clearance. | Choose a permitted lane first, then keep right when slower; every change needs advance signaling, observation/recheck, safe gaps and one adjacent lane across permitted markings. Never cut solid lines or use the shoulder. |
| Medium | Reading signs | No recognition of red-ring maximum versus blue minimum, lane/vehicle applicability, supplementary plates, electronic/temporary signs, effective location or safe interpretation when uncertain. "At each junction" over-localizes changes. | Read throughout the route, including work zones; distinguish signs and their scope, adapt before a lower limit becomes effective, do not assume navigation or traffic flow overrides signs. Do not assume each junction automatically cancels restrictions. |
| High | Main diagram | Generic blue "GỘP LÀN" rectangle is not a useful speed/lane sign example. Arrow crosses a dashed boundary but there is no merging lane or need to change lanes. | Replace with clearly labeled maximum/minimum identification examples and a straight keep-lane car/arrow, explicitly not a sign-placement design. |
| High | Variant diagram | Car travels right but is already beyond the 60 sign; the purported slowdown segment is downstream of it. No effective-position reference is drawn. | Place the approaching car upstream, anchor an explained reference to the sign station, show straight travel on pavement and a lower-limit region starting at that station. No fabricated braking distance. |
| Medium | Assessment and recovery | Quiz reinforces unconditional right-lane return, rather than sign recognition, safe minimum exceptions or a planned response to a lower limit. Recovery assumes an empty-looking lane is enough. | Replace all three questions with graded real decisions; include a danger/slowdown question. Put critical exceptions in instructions and safety for quick/audio modes. |
| Medium | Approval metadata | UI claims expert approval from a seed/demo reviewer. | Remove only this lesson's seed endorsement, publish unverified, retain history and identities, bump lesson/pack versions and move the generic stale-review fixture to an unchanged approved card. |

## Evidence and interpretation

- [Law 36/2024/QH15, Government publication](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm):
  Articles 11-13 cover applicable traffic instructions, safe speed and permitted,
  signaled adjacent-lane changes with observation/clearance. Article 25 covers
  motorway travel and the emergency-lane/shoulder prohibition.
- [QCVN 41:2024/BGTVT, full regulation](https://luatvietnam.vn/giao-thong/quy-chuan-qcvn-412024-bgtvt-bao-hieu-duong-bo-376856-d3.html),
  directly read: B.27 defines P.127 as a maximum, with actual safe speed adapted
  to conditions; B.27b-c distinguish lane and vehicle-specific speed boards;
  D.6 specifies R.306 minimum speed only in favorable, safe traffic conditions.
  D.7 defines the separate end-of-minimum sign. Sections 26.8-9 address
  restriction extent/repetition; do not teach a generic "nearest sign wins"
  rule irrespective of scope. The diagrams use original simplified sign
  examples, not replicas of official sign construction drawings.
- Search-generated summaries were inconsistent with the regulation (including
  misidentifying S.501); they are not used as evidence. No penalties or universal
  numeric motorway limits are added.

## Consumer and scope check

Only two static SVG diagrams are attached; no other photo, chart, animation
or numerical visualization exists for this card. Shared rendering uses the
card/manifest; full audio includes instructions/safety, and quick mode omits
recovery and the variant. Essential exceptions must not live only in cues,
recovery or graphics. Stable checklist/learning-path references need no change.
The shared pre-motorway checklist already covers route/vehicle preparation.

## Implementation plan

1. Save and commit this analysis before implementation.
2. Revise context, objective, instructions/cues, mistakes, recovery, safety,
   mnemonic and all quiz decisions together; preserve lesson/card/checklist,
   asset and question identities and original history.
3. Replace only these two SVG scenes in the generator, with semantic groups
   for sign examples, vehicle, travel arrow and the effective-position
   reference. Synchronize captions, alt text and generated assets.
4. Bump lesson to 1.1.0 and pack to 2026.10.15; remove sample approval.
5. Add focused decision/answer/metadata and geometric regression tests.
6. Run focused tests, lint and build; inspect desktop/mobile images and lesson,
   quick mode and quiz behavior. Check text bounds, pavement/heading alignment,
   sign position and deterministic generation with unrelated images unchanged.
7. Record actual outcomes and commit the verified revision.

## Baseline

Clean worktree. Content/asset/validation baseline: **31 tests passed**.
Running lesson and both original images inspected; the variant's car is
downstream of its sign and both diagrams lack the intended sign interpretation.

## Implementation and verification results

- Analysis/plan committed before implementation as `47f9715`.
- Lesson **1.1.0**, content pack **2026.10.15**. Revised the complete lesson
  coherently: context/objective, eight action-led instructions and cues,
  mistakes, recovery, safety, mnemonic and all three quiz decisions. Retained
  stable identities and original release/changelog history.
- Removed only this lesson's seed approval; the running UI displays
  **Chưa thẩm định độc lập**. Qualified instructor/legal sign-off remains
  outstanding; this revision does not claim that certification.
- Main illustration now distinguishes red-ring maximum 80 from blue minimum
  60, explicitly conditional on safe, favorable traffic. Straight car/arrow
  alignment does not imply an unnecessary lane change.
- Variant is an independent example: car fully upstream of the 60 sign;
  new-limit shading starts at the sign's station. Its reference line is
  explicitly not a road marking or stop instruction. No braking-distance
  guarantee or universal motorway speed is depicted.
- Added **11 focused regression tests** covering safe decisions, actual graded
  answers, stable metadata, sign colors/numbers, whole-car pavement clearance,
  nose/arrow alignment, travel direction and the sign/effective-position
  geometry. Text assertions account for SVG line wrapping.
- **42 targeted tests passed**, including the existing content, asset and
  validation gates. **Lint and production typecheck/build passed**. Build
  reports only non-failing third-party Zod annotation warnings.
- Regeneration is deterministic for the manifest and all **46 SVGs**.
  Git's content diff contains only these two SVG changes; the other **44**
  images are unchanged. Manifest sizes/checksums and offline budget pass.
- Inspected both actual rendered SVGs and their captions in the running
  lesson, including **1440px desktop** and **390px mobile** views. SVG text
  bounding boxes fit within the 320 by 200 viewBox; images load without
  clipping or horizontal page overflow.
- Browser quiz test: deliberately choosing the unsafe minimum-speed answer
  produces **2/3, Chưa đạt** and highlights that mistake; retrying with safe
  answers produces **3/3, Đạt**. The hazard question has the stop-condition
  badge.
- Quick mode retains the main diagram, unverified status, minimum-speed
  exception and safe lane-change warning while hiding the variant as intended.
  Critical instructions/safety remain in the shared full/step audio sources;
  no shared UI or speech implementation needed changing.
