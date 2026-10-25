# Review and mitigation plan: `narrow-creep`

Date: 2026-10-25. Scope: the complete card, steps and cues, speed/steering
hints, mistakes, recovery, safety, mnemonic, three quiz questions, both SVGs,
captions/alt text, approval, release history, checklist and learn/quick/spoken
surfaces. This is an editorial/technical review, not instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and consequence | Mitigation |
| --- | --- | --- | --- |
| High | Mirror instruction | A universal 2.5 m folding threshold ignores actual vehicle width, protrusions, doors, people and available observation; folding does not prove the body fits. | Assess the entire vehicle including mirrors against actual clearance. Stop before adjustments; do not enter an uncertain gap. Prefer another route; exceptional folding only while stopped, per manual, with adequate observation restored and mirrors reopened when clear. |
| High | Pedals and speed | Unqualified brake-release creep assumes a conventional automatic on level ground; “under 10 km/h” can become an unsafe target. | Explicit automatic/level-ground example, model-specific creep/Auto Hold/EV behaviour; right-foot braking, no simultaneous accelerator/brake, walking pace or slower and ability to stop within visible clear space. Manual/slope control requires separate supervised practice. |
| High | Observation | Looking exactly 10 m ahead discourages nearby/side/low-obstacle checks and is impossible in many alleys. | Alternate far and near view, both sides, mirrors and blind spots. Monitor doors, children, parked-bike protrusions and people; no fixed gaze distance. |
| High | Recovery | “Reverse to the nearest wide point” implies reversing into unknown traffic or a prohibited blind/one-way location. Lowering a window does not establish clearance. | Stop and hold first, reassess, secure before leaving to inspect, request a safely positioned guide or another route. Reversing is conditional on visibility, legality, all-round checks and a reversing signal; never automatically reverse from a blind spot. |
| Medium | Steering and stopping | Small steering corrections are useful but omit front corners/rear tracking and restart conditions. Objective can imply avoiding hard braking is more important than stopping for danger. | Keep small corrections, explain whole-vehicle clearance; stop for people, uncertain clearance or lost view, never swerve into a wall. Restart only with a clear route and renewed checks. |
| Medium | Main illustration | Correct upward car/path direction, but unlabeled bikes could be moving or parked; generous/undefined gaps, no mirror protrusions, fixed speed badge and “rest foot” note suggest guaranteed clearance/control. | Show mirrors and explicitly parked motorcycles; label front and forward direction, no numeric clearance/speed target, not-to-scale warning and conditional-motion caption. |
| Medium | Variant illustration | Motorcycle rotation 14 degrees points almost forward, not across the alley. Continuous walls provide no exit for a crossing bike. Hazard cone is unexplained; “chờ hết khoảng trống” is ambiguous. | Open an actual side entrance; orient the bike leftward and draw its own matching hazard-colour arrow into a labelled conflict area. Keep the ego car stopped before that area, with no ego-motion arrow; state wait until the route is clear and check again. |
| Medium | Approval | Sample expert entry endorses the fixed 10 m rule as precise. | Remove only this card's sample review, publish as `published_unverified`, retain identifiers and history. Move the stale-review regression fixture to a still-approved card. |

## References and interpretation

- [Vietnam Government: Law 36/2024/QH15, Articles 12, 16 and 17](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: speed must suit conditions; reduce speed or stop for narrow
  roads, restricted visibility, obstacles and pedestrians. Reverse only after
  checking both sides and behind, signalling and ensuring safety; prohibited
  locations include one-way roads and obscured-view locations. Narrow-road
  meeting rules do not give an entering car unconditional priority.
- [UK Highway Code, rules 125–126](https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158):
  maximum speeds are not targets; be able to stop within the distance seen
  clear. General defensive-driving reference, not Vietnamese law.
- [UK Highway Code, rules 200–203](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203):
  choose a suitable manoeuvring location, check all around, reverse slowly,
  account for front swing and seek a guide if visibility is inadequate.

The pre-drive checklist is preparatory, not an alley-clearance checklist; keep
it unchanged and put the specific checks in the card. The renderer derives
learn/quick/TTS from the card. Quick mode hides recovery and the second image,
so stop/hold/no-blind-reverse guidance must also be in steps/safety. There are
no additional photos, charts, animations or lesson-specific UI to update.
Adjacent lessons are out of scope; their content is not certified by this review.

## Implementation plan

1. Persist and commit this analysis/plan before editing lesson content.
2. Rewrite the coherent Vietnamese card, including all cues, hints, recovery,
   safety and quiz answers; preserve card/lesson/asset/checklist/quiz IDs.
3. Replace only the two creep scenes and their metadata, with explicit car
   heading/mirrors, parked-bike semantics, side opening, leftward bike arrow,
   conflict separation and stopped-vehicle variant. No implied measured width,
   sensor coverage, swept path guarantee or fixed stopping-distance target.
4. Increment card to 1.2.0 and content pack to 2026.10.8; retain release history,
   remove sample approval and add content/geometry regression tests.
5. Run focused tests, full tests, lint/build and deterministic regeneration;
   confirm unrelated SVGs unchanged. Inspect both rendered images, text bounds,
   desktop/mobile layout, quick mode, approval warning and quiz interaction.
6. Append actual verification evidence and commit the coherent revision.

## Baseline

Clean worktree. Content, asset and quality-gate baseline: **31 tests passed**.
Both SVG sources and the rendered variant were inspected before implementation.
