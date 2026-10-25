# Review and mitigation plan: `parking-slope`

Date: 2026-10-25. Scope: all lesson text, cues, quiz answers, recovery,
safety, both generated SVGs, captions/alt text, review metadata, shared
checklist, display modes and spoken-instruction sources. This is an editorial
and technical review, not independent instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Context | Says the learner must reverse into a space on a commercial ramp. A ramp is not automatically a permitted parking/manoeuvring area; many are one-way, obstructed or slippery. | Limit the example to a designated parking area where reversing is permitted, not the access ramp or a road tunnel. Choose a level alternative if control, visibility or permission is uncertain. |
| High | Brake step, cue and quiz | Prescribes releasing exactly one third of pedal travel. Pedal response, load, gradient and transmission differ; this can cause uncontrolled motion. | Remove the fraction everywhere. Control actual speed and direction, at walking pace or slower, with the ability to stop immediately. |
| High | Direction and propulsion | Assumes reversing means going downhill and implies selecting R determines motion. An automatic can roll downhill even in R; reversing uphill needs vehicle-specific starting technique. | Explicitly distinguish uphill reverse, downhill reverse and unwanted downhill roll. Use an automatic-transmission example and defer uphill starting to the vehicle manual and supervised practice. |
| High | Observation | Treats direct rearward observation as a mistake, checks only side blind spots and omits continuous observation and front swing. | Combine direct checks, mirrors and blind spots throughout; camera/sensors only assist. Stop for people, vehicles, uncertainty or warnings. |
| High | Stopping/recovery | Automatically selects P and drives another circuit, without securing, confirming forward clearance or distinguishing a temporary stop from parking. | Use the foot brake to stop; never select P while moving or use it as a stopping brake. Reposition only after a full stop and renewed checks; do not leave a vehicle that cannot be secured. |
| High | Securing | P and a handbrake are presented as an immediate universal sequence. No model-specific EPB/Auto Hold rules, no verification of hold and no slope-parking precautions. | Keep foot brake applied while securing with parking brake and P according to the manual. Explain HSA/Auto Hold limits, safe verification, safe exit and Vietnamese road-slope wheel/chock requirements without directing someone behind an unsecured car. |
| Medium | Main SVG | Downhill chevrons point right, but the path goes up-left. The car faces right, yet the apparent reverse arrow starts toward its front. An unexplained 8% looks like a recommended or safe threshold. | Replace with a straight uphill-reverse example: top-down, high at top, low at bottom, car front down and rear up, reverse arrow from the rear up into an open bay. Remove the percentage and universal brake note. |
| Medium | Variant SVG | Does not establish high/low direction. A red rollback shaft has a green arrowhead, and the vehicle straddles the bay entrance while the note implies completed parking. | Keep the same slope and car pose as the main figure; show a clearly labelled conditional downhill-roll hazard from the front, in one hazard colour, distinct from the intended reverse arrow. Do not imply successful parking. |
| Medium | Approval | Sample reviewer is displayed as genuine expert approval. | Remove only this sample review and mark the revision `published_unverified`. Preserve stable lesson, asset and quiz IDs. |

## Verified references and interpretation

- [Vietnam Government: Law 36/2024/QH15, Articles 16, 18 and 19](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: reverse only after checking both sides and behind, with a
  reversing signal and safe conditions; no reversing on one-way roads, in
  no-stopping areas, obscured-view locations or road tunnels, among other listed
  sites. Article 18 requires securing before leaving and, for road-slope
  parking, steering toward the roadside and chocking wheels. A basement car
  park is not automatically a road tunnel or permission to reverse on its ramp.
- [UK Highway Code, rules 200–203](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203):
  choose a suitable manoeuvring area, observe all around, reverse slowly and
  allow for front swing. General safety reference, not Vietnamese law.
- [Ford owner's manual: Hill Start Assist](https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1477723&Uid=G1532477&buildtype=web%2F1000&countryCode=USA&languageCode=en&moidRef=G1405377&vFilteringEnabled=False&variantid=3393):
  temporary hold, including uphill reversing; do not hold a stationary vehicle
  on a hill with the accelerator because this can overheat the transmission.
- [Honda: Hill Start Assist](https://global.honda/en/tech/Hill_Start_Assist/):
  temporary hold and activation conditions vary. Honda's example is around one
  second; Ford's example is two to three seconds. Do not teach a universal
  countdown, guarantee HSA activation or equate HSA with a parking brake.
- [UK Highway Code, rule 252](https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252):
  use parking brake and P for an automatic. Its curb-steering rules are not
  substituted for Vietnamese law.

The existing pre-reverse checklist already qualifies its speed limit as not a
target and cameras as assistance only. Keep it unchanged. The lesson renderer
derives all learning/quick/TTS instructions from the card; update the source
data, not separate scripts. Quick mode retains steps and safety but hides
recovery/variant, so essential stop and secure guidance must remain in steps
and safety too. There are no additional photos, charts or animations attached
to this lesson beyond its two SVGs.

## Implementation plan

1. Commit this analysis and plan before changing lesson content.
2. Rewrite the complete Vietnamese lesson coherently, including all three quiz
   questions, conditional uphill/downhill control, safe stopping, recovery and
   parking. Keep the example explicitly automatic, without pretending it is a
   clutch-control lesson for manual vehicles.
3. Replace only the two slope scenes and update their captions/alt text. Give
   grade, intended reverse and conditional-roll arrows separate semantic groups
   and matching arrowhead colours; label front, rear and high/low. No fixed
   slope percentage, brake fraction, curved swept-path promise or success mark.
4. Increment card/content-pack versions and release history, remove sample
   approval, and add regression tests for content, correct quiz answers and
   actual geometric direction/bay clearance/marker invariants.
5. Run focused content tests, lint and build; verify deterministic generation
   and unchanged unrelated artwork. Inspect both rendered images, desktop/mobile
   lesson, text bounds, quick mode and quiz behaviour.
6. Append actual verification results and commit the coherent revision.

## Baseline

Clean worktree. Baseline content/asset/validation run: **31 tests passed**.
Both original illustrations were inspected in the rendered lesson.

## Verification results

Pending implementation.
