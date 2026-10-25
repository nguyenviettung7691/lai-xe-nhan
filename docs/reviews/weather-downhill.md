# Review and mitigation plan: `weather-downhill`

Date: 2026-10-25. Scope: the complete Vietnamese card, cues, mistakes,
recovery, safety, mnemonic, three quizzes, both SVGs and their captions/alt
text, linked checklist, publication metadata, quick mode and audio sources.
This is an editorial/technical review, not independent driving-instructor
certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Wet-road context and gear selection | The context explicitly says slippery but prescribes lower gears without qualification. Abrupt engine braking can break traction; some manuals prohibit downshifting for engine braking on slippery roads. L or 2 is not a universal selection. | Reduce speed before the descent, choose a permitted mode for the actual vehicle and conditions, avoid abrupt downshifts/over-revving, and explicitly defer to slippery-road restrictions. Do not enter if safe control is uncertain. |
| High | Speed control | Holding revs is presented as controlling road speed, although gradient, load and gear affect speed independently. | Monitor road speed, visibility, grip, signs and traffic; engine braking assists but does not guarantee speed. Include spacing, lane discipline and reducing speed before bends. |
| High | Braking step and variant illustration | Repeated short pulses and equally spaced dots look like a mandatory braking cadence, without an ABS emergency exception. | Teach progressive necessary braking, releasing when sufficient slowing permits, not a timed pumping routine. Explicitly retain emergency braking and firm continuous pressure for an ABS emergency stop. Replace the pulse picture with a two-case decision diagram, not a time chart. |
| High | Overheating, recovery and stop quiz | Soft pedal is treated as proof of overheating; recovery says simply downshift and reach the nearest escape area. There is no distinction between early warning with effective brakes and ineffective brakes/runaway. | Treat smell, longer travel or poor slowing as stop/assistance triggers, not a diagnosis. Stop out of traffic while control remains; if unable to control speed, warn, keep steering and vehicle power, use the signed escape ramp if reachable, and seek rescue after stopping. No promise that cooling repairs a faulty brake. |
| Medium | Vehicle applicability | No manual-transmission coasting warning, model-specific transmission limits or electric/hybrid regeneration caveat. | Keep the main example a combustion-engine car; warn against N, clutch-down coasting and switching off while moving. Qualify EV/hybrid regeneration, especially with full/hot/cold batteries. Do not prescribe a universal parking-brake manoeuvre or P while moving. |
| Medium | Main SVG geometry | The direction is broadly downhill-right, but the symmetric side car does not identify front/rear; wheels and trajectory are below the road surface. The tag mandates L or 2. | Create a dedicated downhill illustration with wheels tangent to the grade, explicit front/rear/high/low labels and a parallel forward arrow ahead of the car. Mark it schematic, not a measured gradient or swept path. Leave other slope lessons' graphics unchanged. |
| Medium | Checklist | Four to five seconds is an unconditional target, and the brake hint only checks after a long descent. | Qualify spacing by signs, speed, weather and visibility, not a guaranteed seconds target; check brakes before the descent and stop immediately for abnormal braking. Keep checklist identity and item IDs. |
| Medium | Approval | The card displays approval from a sample reviewer. | Remove this card's sample approval only and publish as `published_unverified`. Preserve historical versions and stable card, lesson, asset and quiz IDs. |

## Directly checked references

- [UK Highway Code, rules 117-122](https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158):
  progressive normal braking, immediate emergency braking, firm maintained
  ABS pressure, and loss of engine braking when coasting in N/clutch down.
- [UK Highway Code, rule 227](https://www.gov.uk/guidance/the-highway-code/driving-in-adverse-weather-conditions-226-to-237):
  wet-road grip and stopping distance require more separation and lower speed.
  UK legal details and left-driving breakdown instructions are not applied
  as Vietnamese law.
- [Hyundai 2026 Elantra DCT operation](https://ownersmanual.hyundai.com/full_webhelp/cn7/2026/en_us/id347dc80de81.html):
  lower gears can assist downhill control, but the same manual explicitly
  prohibits downshift engine braking on slippery roads. This is why the lesson
  must not promise a universal low-gear procedure for rain.
- [Hyundai good braking practices](https://ownersmanual.hyundai.com/full_webhelp/CN7/2026/en_US/idad875c5fe12.html):
  continuous pedal pressure can overheat brakes; abnormal braking requires a
  safe stop and service. Securing a stopped vehicle requires parking brake
  and the model's parking procedure, not P as a moving brake.
- [Hyundai regenerative braking limitations](https://ownersmanual.hyundai.com/full_webhelp/nx4phev/2026/en_us/topic_zg4_xft_t5b.html):
  regeneration may be limited by battery charge and temperature; the driver
  must use the brake pedal as needed.

No stock photos, animations or additional charts are attached: this lesson
has exactly two generated SVG assets. The lesson renderer derives full audio,
step audio and quick-mode instructions from the card. Quick mode hides recovery
and the variant, so essential stop/emergency instructions must also be in
steps and safety. Related lessons are not being certified or revised here.

## Implementation plan

1. Commit this analysis and mitigation plan before implementation.
2. Rewrite all affected card surfaces together, retaining three meaningful
   quizzes and stop conditions; increment the card to 1.2.0.
3. Replace only this card's two SVG scenes and metadata. Use a wheel/grade
   geometry regression and a two-case braking diagram without pulse dots,
   fixed speed/gear/gradient values or a timing axis.
4. Qualify the two tightly coupled checklist hints, remove sample approval,
   increment the content pack to 2026.10.19 and regenerate assets/checksums.
5. Add focused regressions for identity/history, actual correct quiz answers,
   quick/audio safety sources, manual restrictions, stop vs runaway handling,
   geometry, labels and chart semantics.
6. Run focused tests, lint and production build. Check deterministic asset
   generation and that no unrelated SVG changed. Inspect the revised graphics,
   desktop/mobile rendering, quick mode and quiz interaction in the browser.
7. Record actual results here and commit the coherent, validated revision.

## Baseline

Clean worktree. Content, asset and validation baseline: **31 tests passed**.
The original main illustration was inspected in the rendered lesson and its
source; the original variant source contains three equally spaced dots and
the instruction to repeat braking pulses.

## Implementation and verification

Pending.
