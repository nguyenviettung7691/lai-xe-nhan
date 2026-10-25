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

Pending.
