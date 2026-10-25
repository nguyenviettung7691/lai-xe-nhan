# Review and mitigation plan: `highway-tailgater`

Date: 2026-10-25. Scope: every original instruction/cue, context, objective,
mistakes, recovery, safety, mnemonic, all quiz options/correct answers, both
generated SVGs and captions/alt, publication/review/release metadata, and the
lesson's quick/audio/checklist/path consumers. Editorial/technical review only;
this is not independent driving-instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Context and speed | A car length is not a reliable danger threshold at motorway speed. "Steady speed" without limits or an emergency exception can suggest speeding under pressure or avoiding necessary braking. Flashing headlights alone does not prove malicious intent. | Describe inadequate stopping room without a universal length threshold; keep a safe lawful speed, monitor ahead, avoid retaliation, but brake as needed for immediate danger. |
| High | Front gap | Four seconds is an unconditional target, with no way to create it safely and no relation to signs, speed, grip or visibility. | Create more forward buffer progressively by easing the accelerator when safe, watching traffic, never suddenly braking to teach a lesson. Follow posted/required distance and increase for poor conditions; no universal seconds guarantee. |
| High | Moving right | A visible gap and a signal are insufficient. No permission, rear closing speed, blind spot or lane occupancy checks; no fallback when already rightmost or blocked. | Check lane allocation/markings, front/rear/side clearance and approaching traffic, signal early and recheck right blind spot before one adjacent change. If unsafe or already rightmost, stay in lane; never use the shoulder. |
| High | Passing phase | "Let them pass" omits a tailgater already attempting to pass on the right, and a vehicle cutting in afterward. | Recheck before moving, abandon the change if the space closes or a car is passing on that side; keep a predictable course, do not accelerate to block, rebuild forward distance if cut up. |
| High | Recovery and threats | "Pull into the nearest rest stop and wait a few minutes" may imply an abrupt exit, an isolated confrontation or a guaranteed time-based solution. Reporting and number-plate memorization can distract. Existing sample review explicitly requests persistent-pressure/dashcam guidance. | Use only a properly signed safe exit/rest-area entrance if feasible, otherwise continue; do not stop on the motorway/shoulder to argue. If followed/threatened, seek a staffed public place, stay locked inside and call police via a passenger or after stopping safely. Use an already-running dashcam; review/save evidence only after parking, never chase or handle a phone while driving. |
| High | Main SVG | Rightward cars shown between dashed dividers, no direction/lane/ego labels, forward buffer not represented. Gap annotation does not use exact bumper locations; a short drawn distance could be read as a threshold. | Replace with two explicit same-direction lanes, centered vehicles, a dangerous rear-gap bracket anchored to bumpers, separate forward-buffer bracket, ego/follower/lead labels and no-scale/no-numeric-guarantee caveat. |
| High | Variant SVG | Ego straddles the lower lane divider and its arrow bends upward rather than showing a rightward lane change ending parallel to traffic. It looks like a return toward the passing car. | Use a separate pre-change snapshot: ego/follower in left lane, unobstructed right lane, optional path from ego nose through a dashed divider ending straight inside right lane. Explain permission, checks and no-gap fallback; no simultaneous contradictory passing trajectory. |
| Medium | Quiz, publication and consumers | Correct answers reinforce incomplete lane checks and stopping at the nearest rest stop. Card is hidden as `needs_revision`; sample record is not certification. Quick mode omits recovery/variant; whole-card and per-step audio omit some cues. | Rewrite three decision questions, put essential fallback/threat/evidence warnings in instructions and safety, not only recovery/alt. Publish as `published_unverified`, remove only the sample review, retain stable identities/history and bump card/pack versions. Update directly coupled publication tests/docs. |

## Evidence and interpretation

- [Vietnam Government: Law 36/2024/QH15](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: Article 12 requires appropriate speed and safe front distance;
  Article 13(2) requires permitted, signaled, adjacent-lane changes with safe
  space ahead, behind and on both sides. Article 25 prohibits ordinary travel
  on motorway shoulders/emergency lanes and restricts stopping to designated
  places, with separate genuine emergency provisions. Yielding does not mean
  an unconditional right to change lanes or stop on the shoulder.
- [National Highways: Tailgating and how to avoid it](https://nationalhighways.co.uk/safety/driving-advice/tailgating/),
  read directly: remain calm, drive predictably, signal clearly, do not speed
  up, deliberately irritate the follower by slowing/brake-tapping, or stare
  in the rearview mirror. Intent cannot be inferred just from closeness.
  UK keep-left instructions, numeric gaps and penalties are not imported.
- [Highway Code, rule 168](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203),
  read directly: keep a steady course/speed while being passed, slowing if
  necessary, never obstruct. [Rule 260](https://www.gov.uk/guidance/the-highway-code/motorways-253-to-273)
  supports speed appropriate to conditions and increased gaps in poor weather.
  Only general defensive-driving principles are used, not UK lane geometry.
- Original SVGs inspected rendered in-browser. The main does not show the
  vehicle ahead; the variant puts ego across a divider with an upward-bending
  path. No separate chart, photo, animation or other visualization is attached.
- The shared `pre_highway` checklist and `highway-flow` grouping remain suitable.
  Essential guidance must be in instructions/safety for all display/audio modes.

## Implementation plan

1. Commit this analysis and mitigation plan before implementation.
2. Rewrite the card coherently within the existing 5–8-step model; preserve
   card, lesson, checklist, existing step and quiz IDs and old changelog.
3. Replace only its two generator scenes, captions and alt. Give geometry
   semantic groups for focused regression tests. Keep all vehicles inside
   lanes; measure annotated gaps between bumpers, not centers. Show a
   conditional right-lane path, not a guaranteed safe maneuver.
4. Bump card to 1.0.0 and pack to 2026.10.18, remove its sample review and
   publish with the visible unverified label, consistent with earlier revisions.
   Update coupled assertions and the outdated content-model seed example.
5. Add tests covering actual correct answers, emergency/fallback/evidence
   guidance in spoken sources, status/history/identities and SVG geometry.
   Regenerate assets, run focused suites plus lint/build.
6. Inspect final desktop/mobile lesson, both diagrams, quick mode and quiz
   results in-browser; check deterministic generation and unrelated-asset
   stability. Record verification and commit the coherent revision.

## Baseline

Initial worktree clean. Content, assets and validation suites: **31 tests
passed**. Both original diagrams inspected in the browser. The original card
is intentionally excluded from public lookup until revision.

## Implementation and verification results

- Analysis/plan committed first as `a534312`. Implemented one coherent lesson
  revision afterward; retained card/lesson/checklist/asset/quiz IDs and the
  original 0.9.0 changelog. Eight steps now cover predictable speed, progressive
  front spacing, conditional yielding, passing/cut-in, necessary emergency
  braking, persistent threats and safe evidence handling.
- Replaced both SVGs with explicit two-lane, rightward-traffic scenes. All car
  footprints are centered inside the left lane; the main has bumper-anchored
  rear/forward gaps, and the conditional variant path ends forward inside the
  right lane. Captions/alt explain conditions, scale, shoulder prohibition and
  fallback. No numeric safety threshold or extra chart/photo was introduced.
- Published card 1.0.0 in pack 2026.10.18 with **Chưa thẩm định độc lập**;
  removed the outdated sample revision record, not a real expert endorsement.
  Independent instructor/legal review remains outstanding, explicitly labeled
  in the app. Updated the coupled publication tests and content-model example.
- Added **11 focused regression tests** covering selected correct quiz answers,
  fresh observation, blocked/rightmost fallback, emergency braking, safe
  reporting/evidence handling in quick/audio source text, stable identities,
  vehicle containment/headings, bumper anchors and a sampled lane-change path.
- Baseline content gates: **31/31 passed**. Final focused content/asset/validation
  checks: **42/42 passed**. All content regressions: **240/240 passed** across
  21 files, including previous lesson revisions.
- `npm run lint` and `npm run build` passed, including Vue/TypeScript checks
  and PWA generation. Build reports only upstream Zod pure-annotation warnings;
  no new tooling or dependencies were installed.
- Browser checks: original and final SVGs visually inspected; final SVG text
  bounding boxes stay inside the 320 x 200 viewBox. Desktop at 1440px and mobile
  emulation at 390 x 844 show no horizontal overflow. Both lesson images load;
  both mobile figures and wrapped captions were inspected. The unverified
  badge is visible; eight steps display. Quick mode hides the variant/recovery
  as designed but retains lane fallback, emergency exception and safety text.
- In-browser quiz exercised with wrong choices (**0/3, Chưa đạt**), then retry
  and correct choices (**3/3, Đạt**). Whole-card/per-step audio consumers were
  checked at the source: critical conditions are in instructions and safety,
  not solely cues, alt or recovery; audible playback was not assessed.
- Repeated generation produced identical manifest and revised SVG hashes.
  Git confirms only the two tailgater SVGs changed; other 44 SVGs are unchanged.
  Whitespace/diff checks passed. No shared UI, checklist or learning-path code
  needed modification.

Browser-tool timeouts were worked around using Chrome DevTools and explicit
page selection; actual viewport dimensions and decoded image readiness were
verified rather than assuming a resize or lazy image load succeeded.
