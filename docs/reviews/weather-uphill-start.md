# Review and mitigation plan: `weather-uphill-start`

Date: 2026-10-25. Scope: complete card text, cues, mistakes, recovery, safety,
mnemonic, all three quiz questions, two SVGs, alt/caption metadata, linked
checklist, approval/release history and learning/quick/audio display sources.
This is an editorial and technical review, not independent instructor
certification or a substitute for practice in the actual vehicle.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Vehicle scope and pedal transfer | D implies an automatic, but the text never specifies transmission or equipment. It tells the learner to hold the brake then apply the accelerator without explaining the transfer; readers may hold both pedals or release the only holding brake too soon. | Explicit automatic-car example with a known, functioning hill-start/holding system, used according to its manual and prior supervised practice. Keep the right foot on the brake until ready; transfer to modest accelerator only using the vehicle's verified procedure, not simultaneous pedal pressure. Do not imply this teaches manual clutch control. |
| High | Parking-brake method | Universally tells drivers to apply throttle against the parking brake and release it gradually. EPB is not a progressively adjustable lever, and some manuals prohibit accelerator use with a mechanical parking brake applied. | Do not teach one universal handbrake launch. Explain mechanical/EPB/Auto Hold/HSA distinctions; release and activation follow the actual manual. If the car lacks known effective support, remain held and obtain supervised model-specific instruction rather than improvise between close vehicles. |
| High | Assist limits | HSA/Auto Hold are omitted; a driver may assume D prevents rollback or a button guarantees indefinite holding. | State D can roll, HSA only holds temporarily and may not activate, standby is not confirmed holding, and Auto Hold/EPB prerequisites differ. No universal seconds countdown or lamp colour. |
| High | Observation and space | No pre-launch all-round check, yielding or final blind-spot check; the last step tells drivers to watch the rear mirror. The context uses one metre and safety mandates one car length without conditions. | Check ahead, sides, mirrors and blind spots, yield and signal where needed; maintain forward attention once moving with brief mirror glances. Set stopping/moving space from actual conditions, not fixed numbers, and never let pressure from a close follower cause a rushed launch. |
| High | Rollback and recovery | Says apply handbrake and start again without stopping first, checking the cause or safeguarding a vehicle that cannot be held. | Release accelerator and use foot brake immediately to stop/hold. Never select P/R while moving or counter rollback by adding gas. Secure after full stop; reassess support, space and grip before any retry. Stop repeated slipping/overheat attempts; if unable to hold, warn and call assistance without exiting an unsecured car. |
| Medium | Both side-view illustrations | Symmetric cars have no front/rear labels; wheels lie below the road surface. Main path passes through the car. Rollback shaft starts in front and crosses the body, with a green arrowhead on a red shaft. | Dedicated pair with identical uphill-right grade and car pose, wheels tangent to the surface, labelled high/low/front/rear. Main arrow ahead of the front illustrates conditional forward launch; variant arrow wholly behind the rear points downhill-left and uses matching hazard-colour shaft/head. Mark as schematic, no slope/speed/distance guarantees. |
| Medium | Approval | Sample reviewer is displayed as genuine approval. | Remove only this card's sample review, mark `published_unverified`, preserve IDs and historical versions. |

## Directly checked references and interpretation

- [Ford owner's manual: Hill Start Assist](https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?ProcUid=G1477723&Uid=G1532477&buildtype=web%2F1000&countryCode=USA&languageCode=en&moidRef=G1405377&vFilteringEnabled=False&variantid=3393):
  stop with foot brake; temporary holding allows pedal transfer, followed by
  normal launch. This example holds for two to three seconds; it warns against
  using accelerator or clutch to hold the car on a hill.
- [Honda: Hill Start Assist](https://global.honda/en/tech/Hill_Start_Assist/):
  around one second in this example, and may not activate on gentle grades.
  These differing examples rule out one universal countdown or guarantee.
- [Hyundai 2026 Elantra Auto Hold](https://ownersmanual.hyundai.com/full_webhelp/cn7/2026/en_us/id43680d1d7f8.html):
  standby and actual holding differ; accelerator can release holding; steep
  grades can trigger a transfer to EPB. Treat its conditions as model-specific,
  not universal colours, timers or activation rules.
- [Hyundai mechanical parking brake](https://ownersmanual.hyundai.com/full_webhelp/CN7/2026/en_US/id4d9429be4e1.html):
  release while seated with foot brake depressed; explicitly prohibits
  accelerator application with this parking brake engaged. This is why the
  original universal throttle-against-handbrake sequence is unsafe.
- [Hyundai DCT operation](https://ownersmanual.hyundai.com/full_webhelp/cn7/2026/en_us/id347dc80de81.html):
  check surroundings before D/R, use smooth accelerator uphill, and stop
  completely before P or direction changes. DCT behaviour differs from a
  torque-converter automatic; do not prescribe a fixed throttle/RPM target.
- [UK Highway Code, rule 159](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203):
  mirrors, blind spots, signal when necessary and final check before moving.
  General safety reference only; UK left-driving rules are not applied here.

The existing `bad_weather` checklist was inspected: it covers rain, traction,
spacing, brake condition and safe-stop planning, not a hill-start procedure.
Keep its identity and items unchanged as supplemental weather guidance; keep
all equipment/launch/stop instructions in the card itself. No photos,
animations or extra charts are attached beyond the two SVGs. The renderer
derives full and step audio from card instructions/safety. Quick mode hides
recovery and variant, so essential rollback response and assist limits must
also appear in steps and safety.

## Implementation plan

1. Commit this analysis/plan before lesson changes.
2. Rewrite the whole card coherently as an automatic-car example with known
   support, explicit preparation/observation/pedal transfer/launch/stop steps.
   Treat equipment branches honestly rather than promise a universal technique;
   update all quizzes, cues, mistakes, recovery, safety and mnemonic together.
3. Replace only these two generated scenes and captions/alt text. Keep common
   pose/grade across the pair; use explicit semantic groups for geometry tests,
   forward motion and conditional rollback with matching arrow colours.
4. Increment card to 1.1.0 and pack to 2026.10.20, preserve original IDs/history,
   remove sample approval, regenerate SVGs and manifest.
5. Add focused tests for correct quiz answers, support limits, quick/audio
   safety sources, unsafe-retry prevention and actual transformed geometry.
6. Run focused content/asset/validation and prior downhill regressions, lint
   and build; verify reproducible generation and no unrelated SVG changes.
   Inspect desktop/mobile diagrams, text bounds, quick mode, audio text and
   quiz pass/fail/retry behaviour.
7. Record real verification results here and commit the validated revision.

## Baseline

Clean worktree; **43/43 tests passed** across general content, assets,
validation and prior downhill regressions. Both original illustrations were
visually inspected in the running lesson, as well as their generator source.

## Implementation and verification

Pending.
