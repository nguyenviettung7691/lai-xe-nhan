# Review and mitigation plan: `weather-engine-brake`

Date: 2026-10-25. Scope: complete card, cues, mistakes, recovery, safety,
mnemonic, three quiz questions, both SVGs, captions/alt text, linked checklist,
publication/release history, quick mode and full/step audio sources. This is
an editorial/technical review, not independent instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Objective and context | Says engine braking holds speed instead of the brakes and helps brakes stay cool. This can imply guaranteed speed control or no need for the foot brake. | Explain assistance/reduced brake load, not replacement or a cooling guarantee. Monitor actual speed, grade, load, traction and visibility; retain necessary foot braking and stop conditions. Raise risk from medium to high to reflect downhill-control consequences. |
| High | Modes and preparation | Treats M and L as equivalent, and lifting off the accelerator as sufficient preparation to downshift. No speed reduction before selection or slippery-road restrictions. | Explicit automatic combustion-engine example, vehicle manual and permitted modes/limits first. Slow before the descent and before selecting a lower gear; avoid abrupt shifts on bends/low grip and obey model-specific bans on engine-braking downshifts on slippery roads. |
| High | Gear requests | “One gear at a time” is presented as safe even when fast; no rejected shift/automatic override behaviour. | One request is only an example for a vehicle supporting discrete shifts, after speed is suitable. Check accepted gear; no repeated minus requests, universal gear ladder or presumed protection from electronics. Some displays show a range, not an engaged gear. |
| High | Revs and recovery | Noise increase is treated as success. Recovery says upshift once and retry with short brake pulses even after exceeding safe revs. | Sound alone is not proof; avoid near-limit operation, stop requesting lower gears, reduce road speed with effective brakes, follow the manual for any higher-gear request. Abnormal warnings/noise/jerks require a safe stop and inspection, not an automatic retry. |
| High | Braking and emergency | Short braking pulses are taught without an ABS emergency exception, coasting warnings or braking-fault response. | Progressive normal braking with release only when enough slowing/control remains, no cadence; firm maintained pressure in an ABS emergency. No N, clutch-down coasting, engine-off descent or P/R while moving. Distinguish controlled stopping from uncontrolled speed/escape-ramp emergency. |
| Medium | Scope and exit | Always returns to D at the geometric end of a hill; EV/hybrid paddles are not distinguished from gear controls. | Return to normal mode when engine braking is no longer needed and the manual/conditions permit, not a universal landmark. Qualify regeneration availability and paddle functions by model/drive mode, battery charge and temperature. |
| Medium | Main graphic | Caption claims paddle location, but the drawing contains only a car, road and text tag; there is no steering wheel or paddle. Car is symmetric and wheels sit below the road. | Use the existing corrected downhill side-view scene, with labelled heading/high/low, tangent wheels and forward arrow; explicitly describe descent rather than claim a cockpit view. Reusing the checked scene avoids another copy of vehicle geometry. |
| Medium | Variant | D → 3 → 2 depicts a universal gear sequence unrelated to speed/limits and gives no feedback or stop decision. | Replace with a three-stage conceptual process: reduce speed, choose a permitted level, check actual response. Connector arrows are reading order, not vehicle direction, time, RPM or recommended ratios. |
| Medium | Approval | Sample reviewer appears as expert approval. | Remove only this card's sample review, publish as `published_unverified`, preserve IDs and history. |

## Directly checked references

- [Hyundai 2026 Elantra DCT operation](https://ownersmanual.hyundai.com/full_webhelp/cn7/2026/en_us/id347dc80de81.html):
  downhill manual/paddle selection can reduce excessive foot-brake use; the
  same manual prohibits engine-braking downshifts on slippery roads. It
  documents rejected out-of-range requests and automatic upshifts near the
  red zone. These are model-specific examples, not guarantees for all cars.
- [Hyundai regenerative braking limitations](https://ownersmanual.hyundai.com/full_webhelp/nx4phev/2026/en_us/topic_zg4_xft_t5b.html):
  paddle functions change with drive mode; regeneration can be limited by
  charge, battery/motor temperature and system conditions. Brake pedal remains
  necessary as conditions require.
- [Hyundai good braking practices](https://ownersmanual.hyundai.com/full_webhelp/CN7/2026/en_US/idad875c5fe12.html):
  prolonged pedal pressure can overheat brakes; abnormal braking requires
  safe stopping and service.
- [UK Highway Code, rules 117-122](https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158):
  normal progressive braking, immediate emergency braking, firm maintained
  ABS pressure and the risks of neutral/clutch-down coasting. General safety
  guidance only, not a substitution for Vietnamese law or the vehicle manual.

The shared weather checklist already covers pre-descent brake checks,
condition-dependent spacing and safe-stop planning; keep it unchanged.
Learning/quick/audio all derive from the card. Quick mode hides recovery and
the variant, so essential restrictions, braking and stop response must be in
steps/safety too. There are exactly two SVGs and no additional photos,
animations or charts attached to this card. Both original images were inspected
in the rendered lesson and in the generator source.

## Implementation plan

1. Commit this analysis and mitigation plan before implementation.
2. Rewrite all current content surfaces together as an automatic combustion
   engine example, with model-specific mode selection, suitable speed,
   accepted requests, limits, braking, abort response and conditional return
   to normal mode. Update all quiz answers and add a stop-condition question.
3. Reuse the already checked downhill scene for the main asset without
   changing that scene's output for the downhill lesson. Replace the variant
   with a legible three-stage conceptual flow, not a universal gear ladder.
   Remove the old slope helper only if this change leaves it unused.
4. Increment card to 1.1.0 and pack to 2026.10.21, remove sample approval,
   preserve IDs/history and regenerate assets/checksums.
5. Add focused content, quiz, actual geometry and process-chart regressions.
   Verify existing downhill and uphill-start behaviour stays unchanged.
6. Run focused tests, lint and production build; confirm deterministic
   generation and only this card's two SVGs changed. Inspect desktop/mobile,
   SVG text bounds, quick/audio safety text and quiz pass/fail/retry.
7. Record actual results and commit the coherent validated revision.

## Baseline

Clean worktree; **56/56 tests passed** across general content, assets,
validation and both previously revised slope lessons. The integrated browser
initially rendered a blank screenshot, so visual inspection used a separate
isolated Chrome context; no other browser profiles/processes were modified.

## Implementation and verification

- Analysis and mitigation plan committed first as `159d944`, before lesson
  implementation. Card is now **1.1.0**, content pack **2026.10.21**.
  Preserved card/lesson/asset/checklist/quiz identities, original six step IDs,
  initial changelog and release history; added two steps for complete
  abnormal-response and conditional normal-mode return coverage.
- Rewrote context/objective, all steps/cues, mistakes, recovery, safety,
  mnemonic and quizzes coherently. Raised risk to **high** intentionally
  because incorrect downhill control can lead to loss of braking/control.
  Removed only this card's sample approval; the rendered independent-review
  warning is visible. No independent instructor approval is claimed.
- Main illustration reuses the corrected downhill geometry without changing
  the prior lesson's output. The caption/alt now describe what is actually
  shown, not a nonexistent cockpit/paddle-location view. Removed the old
  slope helper because its only remaining uses were these replaced scenes.
- Replaced the fixed gear ladder with a three-stage process. Its arrows show
  reading order only, not gear ratios, vehicle motion or pedal timing.
- Added **13 focused regressions** covering identities/history, actual correct
  quiz decisions, model-specific restrictions, refused requests, RPM limits,
  normal/emergency braking, faults and quick/audio safety sources. Geometry
  tests verify transformed wheel tangency, front-to-forward-arrow placement,
  unchanged shared-scene output, process order and gap-only connectors.
- **69/69 tests passed** across this lesson, both previously revised slope
  lessons, general content, asset and validation suites. `npm run lint` and
  `npm run build` passed, including TypeScript and PWA generation. The build
  retained two non-blocking annotation warnings in installed Zod files;
  there were no application build errors.
- Repeated generation produced identical manifest and engine-brake SVG
  hashes. Git confirmed **only this lesson's two SVGs changed** among all 46.
  Checksums and size tests pass; complete SVG pack is **178.85 KB**, within
  the existing budget. Shared checklist, renderer and other cards are unchanged.
- Inspected both new images at desktop and mobile sizes in isolated Chrome.
  Both decoded successfully. Browser measurements found **no text outside
  either 320 x 200 SVG canvas**, and all process-stage text fits inside its
  own box. No horizontal page overflow at **360, 390 or 1440 px**.
- Quick mode retained the main image, eight steps and essential ABS/runaway
  safety instructions. Learning mode displayed both images. Verified TTS
  large-text output contains slippery-road restrictions, rejected-request
  handling, RPM limits, emergency braking, safe-stop and regen limitations.
  Actual synthesized voice quality/availability was not certified.
- Browser quiz checks: wrong choices scored **0/3**, retry enabled all choices,
  correct choices scored **3/3 (100%), pass**. A final clean reload had **no
  console warnings or errors** and displayed the unverified-review notice.
- `git diff --check` passed. Stopped the temporary preview server and closed
  only the isolated Chrome page created for this review. Vehicle-specific
  instruction/practice and independent instructor review remain necessary.
