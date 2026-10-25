# Review and mitigation plan: `weather-flood-cross`

Date: 2026-10-25. Scope: complete card, steps/cues, mistakes, recovery,
safety, mnemonic, all three quizzes, both SVGs, captions/alt text, linked
weather checklist, publication/history, rendered desktop/mobile, quick mode
and full/step audio sources. Editorial/technical review only, not independent
instructor or emergency-rescue certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Decision rule, mnemonic and quiz | Half a wheel on another vehicle is treated as the threshold for turning back. Different vehicles, bow waves, submerged holes and changing depth make this unreliable; water below it is not permission to enter. | Prefer avoiding flooded roads. No generic safe depth, wheel threshold or reliance on vehicles ahead, SUVs or EVs. Observe only from dry ground; never walk into water to measure. |
| High | Route choice | Directs drivers to the road center as the presumed highest point. This may mean entering opposing traffic, a submerged drain or a washed-out road. | Remove road-center advice. Stay on a lawful dry route; obey closures and responders. Turn only where legal with clear space and observation, otherwise wait at a safe dry place or seek assistance. |
| High | Crossing recipe | Low gear, steady throttle and under 10 km/h are presented as a universal solution. This encourages entry without knowing vehicle limits, road condition or an exit; avoiding a stop cannot override collision avoidance. | Intentionally remove generic flood-crossing instruction. This beginner lesson teaches avoidance, not fording. Manufacturer capability is not a guarantee that a flooded public road is safe. |
| High | Stranded recovery | Says keep the key unchanged and open the door to escape uphill. It fails to prohibit restart explicitly and can send occupants into fast current, holes or electrified water. | No restart, including EV/hybrid READY or push/tow starting. Prioritize life, emergency contact/location/occupants and responder guidance. Exit to high dry ground only by a clearly safe route; trapped in fast current, stay inside and call, moving to roof if water rises inside, without wading/swimming into current. |
| High | Safety/audio/quick mode | A 30 cm hazard statement can read as a safe boundary below it. Recovery is hidden in quick mode and excluded from full audio. | No safe-depth number. Put avoidance, no restart and conditional emergency response in steps and safety, not only recovery or variant. |
| Medium | After exposure | Rubbing brakes a few times implies restored braking without testing conditions or stopping on a fault. | Only test gently at very low speed on a clear dry safe area with no one close behind, per manual; abnormal brakes, warnings or significant exposure require safe stop and professional inspection, not assumed drying or automatic restart. |
| High | Main SVG | Shows a car apparently floating above the road/water with a green forward arrow and unsupported under-25-cm text. No reliable front/rear or dry stopping area. | Draw a stationary, clearly oriented car with tangent wheels wholly on dry road before a no-entry boundary. Water beyond is an unknown hazard, not a scaled depth. No arrow into it or unsafe U-turn trajectory. |
| Medium | Variant SVG | Half-wheel threshold is labelled mandatory turn-back; symmetric car and arbitrary water/road position do not substantiate depth. | Replace with conditional emergency panels: safe dry escape versus trapped in fast current/rising interior water. No misleading depth ruler, escape arrow or universal door-opening instruction. |
| Medium | Approval | Sample reviewer explicitly endorses the unsafe wheel-depth threshold. | Remove only this sample review, publish `published_unverified`, preserve IDs and history. |

## Directly checked references

- [US National Weather Service: flooded roads](https://www.weather.gov/safety/flood-turn-around-dont-drown):
  do not drive or walk into floodwater or bypass barriers; submerged roads
  may have collapsed. The cited water depths describe potential danger, not
  safe limits for shallower water.
- [Ready.gov: floods](https://www.ready.gov/floods), especially "During a Flood":
  avoid floodwater and obey responders; stay inside a car trapped in rapidly
  moving water; get onto the roof if water is rising inside. Avoid electrical
  equipment, contaminated water and hidden debris. This is conditional
  guidance, not a blanket instruction to remain in every flooding vehicle.
- [AA: floodwater and heavy rain](https://www.theaa.com/driving-advice/seasonal/driving-through-flood-water):
  primary recommendation is avoidance, with vehicle electrical and brake
  damage, displaced manhole covers and changing levels among the risks.
  Its conditional crossing advice and numerical depth guidance are not
  adopted as permission to enter unknown flooded roads. Brake testing and
  inspection after significant exposure are relevant to accidental exposure.
- [UK Environment Agency/AA: flooded-road risk](https://www.gov.uk/government/news/driving-complacency-74-of-drivers-would-risk-life-in-flood-water):
  warns against following others through flooded roads or judging by visible
  kerbs; recommends rerouting rather than risking occupants' lives.
- [Hyundai 2026 Elantra: flooded areas](https://ownersmanual.hyundai.com/full_webhelp/CN7/2026/en_US/id63653874db9.html):
  reduced brake performance and gentle low-speed post-water brake checks.
  Its model-specific wheel-hub language is not adopted as a generic safe
  depth or permission to enter unknown public-road floodwater.
- RAC page returned HTTP 403 and is not treated as checked evidence.

Foreign safety references support general hazard awareness, not Vietnamese
traffic law or a vehicle-specific wading/escape procedure. No numerical
crossing limit, local emergency number or make-specific capability is
invented. Follow local responders and the vehicle manual.

## Rendering and related surfaces

Original lesson and both graphics inspected in the browser and generator.
The main image's green arrow explicitly promotes crossing; the variant
repeats the unsafe threshold. There are no additional attached photos,
animations or charts. Images already have explicit dimensions, alt text,
captions and a lazy-loaded variant; retain these accessible surfaces.
Shared lesson rendering is unchanged unless validation exposes a directly
coupled problem. Essential emergency text must survive quick mode and full
audio, which omit recovery/variant content.

The shared `bad_weather` checklist covers lights, speed, spacing, brakes and
safe stopping but omits the flood no-entry decision. Add a conditional flood
item without changing existing IDs, and clarify safe dry waiting in its stop
hint. Other weather lessons must retain their existing checks and behaviour.

## Implementation plan

1. Commit this analysis/plan before modifying lesson or assets.
2. Rewrite all card surfaces coherently around avoidance, lawful dry
   diversion, no unsafe measurement/crossing, stranded response, no restart
   and conditional post-exposure checks; update all three quiz answers.
3. Replace only the two flood-cross assets, captions and alt text. Remove
   the old flood helper only if no consumers remain; preserve rain output.
4. Preserve original six step IDs and all card/lesson/asset/quiz/checklist
   identities/history; expand to at most eight steps, card 1.1.0, pack
   2026.10.22. Remove sample approval, retain high risk.
5. Add content, quiz, quick/audio-source, checklist and actual SVG geometry/
   visual-semantic regression tests.
6. Verify focused tests including all three revised slope lessons, lint,
   production build, deterministic generation and unchanged unrelated SVGs.
   Inspect desktop/mobile, SVG text bounds, image decoding, quiz
   fail/retry/pass, quick mode, audio text and browser errors.
7. Record actual results and commit the validated revision separately.

## Baseline

Clean worktree; **69/69 focused tests passed** across content, asset,
validation and all three revised slope lessons. Local review server responds
HTTP 200. Default Chrome tool profile was already occupied; used an isolated
context through the alternate browser connection without stopping other
users' browsers.

## Implementation and verification

- Analysis/mitigation plan committed first as `80ff4a0`. Card revised to
  **1.1.0**, pack to **2026.10.22**. Retained high risk, all lesson/card/
  checklist/asset/quiz identities, original six step IDs, initial changelog
  and release history; expanded to eight steps. Removed only this lesson's
  sample approval; explicitly `published_unverified`.
- Rewrote all editorial surfaces and three quizzes around flood avoidance,
  legal dry diversion, no wheel-depth guarantee or generic crossing recipe,
  no restart/READY/push-start, conditional rescue and cautious post-exposure
  checks. Essential instructions remain in steps/safety for quick and audio.
  This intentionally changes the lesson from recommending shallow-water
  crossing to avoiding unknown flooded roads; it is not a fording course.
- Main SVG now has a stationary, right-facing car with a front lamp,
  front/rear labels and both wheel circumferences tangent to the dry road.
  Entire vehicle is before the no-entry boundary, itself before the
  unknown-water region. No motion/turn arrow, numerical water depth, safe
  crossing threshold or fabricated submerged road surface.
- Variant replaced with two conditional rescue panels, not sequential
  instructions or an escape route. Increased panel text to 10 SVG units
  after mobile inspection for better legibility. Both captions and alt
  descriptions explain the drawings' limits and intended meaning.
- Added conditional `bw-flood` checklist item and safe dry-waiting hint.
  Original checklist IDs/order and brake/spacing checks retained. Two prior
  lesson tests initially failed because their expected checklist ID lists
  had exactly five entries; updated only those expectations to include the
  deliberately appended flood item. Their content/geometry tests still pass.
- **15 new regressions**, covering publication/history, hidden hazards,
  stopping/diversion, measurement limits, powertrain restart restrictions,
  rescue branches, brake faults, quick/audio sources, quiz grading,
  checklist continuity, real wheel/road/boundary geometry and visual semantics.
- **84/84 tests passed**, seven files:
  `weather-flood-cross`, `weather-engine-brake`, `weather-downhill`,
  `weather-uphill-start`, general content, assets and validation.
  `npm run lint` passed. `npm run build` passed with TypeScript/Vue checking
  and PWA generation; existing dependency-only Rollup annotation warnings
  in Zod remain non-blocking.
- Repeated final asset generation: identical hashes for all **46 SVGs and
  manifest**. Only this lesson's two SVGs differ from the previous commit;
  rain and all slope graphics remain unchanged. Pack **181.33 KB**, within
  budget; manifest checksum/size tests pass. `git diff --check` passed.
- Browser inspected both new images at desktop and mobile. Checked actual
  **1440 px**, **390 px**, and **360 px** viewport widths with no horizontal
  overflow; long quiz options also fit. Used device emulation after finding
  that window resizing alone was clamped above the requested mobile width.
  Both images decode at 320 x 200. All SVG text fits its canvas and both
  rescue panels, including the enlarged text.
- Quick mode: main image and all eight steps remain; recovery/variant are
  hidden, but avoidance, no restart and both rescue branches remain visible.
  TTS large-text output contains no wading to measure, avoidance, READY/no
  restart, safe-exit condition, fast-current/rising-water response and
  post-exposure brake faults. Synthesized voice quality was not evaluated.
- Browser quiz: wrong answers **0/3**, retry re-enables all options,
  correct answers **3/3 (100%, pass)**. Final browser console has no
  warnings/errors. Reloaded with cache bypass after regeneration so final
  screenshots show the revised SVGs rather than cached original images.

Independent driving-instructor/rescue-specialist review remains outstanding;
the content explicitly does not claim to teach escape from every sinking
vehicle or replace local responders and vehicle-specific instructions.
