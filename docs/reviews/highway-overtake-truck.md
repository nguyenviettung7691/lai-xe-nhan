# Review and mitigation plan: `highway-overtake-truck`

Date: 2026-10-25. Scope: the full Vietnamese lesson, all six original
instructions/cues, context/objective, mistakes, recovery, safety, mnemonic,
three questions and their correct answers, both SVG diagrams, captions/alt,
generator, publication metadata, checklist/path references and quick/audio
consumers. This is an editorial/technical review, not instructor certification.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Objective, context, acceleration and mnemonic | "Fastest possible" and "pass quickly" without a legal/conditions limit can encourage speeding, racing an accelerating truck or committing without a clear route. A fixed truck length is not useful permission to pass. | Frame passing as optional. Assess the full maneuver and space beyond the truck first; pass progressively only within limits and conditions, otherwise stay back. Account for queues, spray, wind and insufficient speed difference. |
| High | Mirrors and observation | Seeing a truck's mirror is not proof its driver sees you, nor a safe following-distance measure. "Left lane completely empty through mirrors" omits fast rear traffic, direct blind-spot checks and changing conditions. | Maintain distance by signs, speed and conditions; explain blind areas around the truck and the limits of mirrors/assistance. Signal, check ahead/behind/both sides and recheck the relevant blind spot immediately before each adjacent-lane change. |
| High | Return to right | Seeing just the cab in the right mirror is not sufficient clearance. Three seconds after returning describes only the gap ahead, not the truck's braking space behind. | Use the whole truck visible in the interior mirror as a supplementary cue, not a guarantee or universal rule for vehicles without that view. Require safe front/rear/side gaps, relative speed and fresh right-side checks; do not cut in or slow unnecessarily in front of the truck. |
| High | Recovery and safety | "Move back behind" is ambiguous about reversing, braking beside the truck or cutting diagonally behind it. Safety omits unsafe abort and shoulder/right-side shortcuts. | Before changing lanes, wait behind. If already alongside, keep the current lane and create longitudinal separation smoothly with rear-traffic awareness; only move right after safe spacing and a fresh check. Brake when needed for immediate danger; never reverse, brake-test, swerve or force a gap. |
| High | Main SVG | Truck footprint crosses the solid outer edge. Ego is offset toward a divider, with no clear same-direction arrows or preparation phase. Note incorrectly makes seeing the truck's front a prerequisite for starting to pass. No blind-spot context is shown. | Replace with a two-lane same-direction scene: vehicles fully contained, identifiable cab, ego initially behind in the right lane, path across dashed divider to left lane ending parallel to road, indicative blind areas and explicit not-to-scale/no guaranteed visibility disclaimer. |
| High | Return SVG | Truck again crosses road edge; curved arrow ends heading into the edge rather than along the lane. Gap is measured between arbitrary points, not truck nose and ego rear; a mirror label implies a geometric guarantee. | Draw a separate later snapshot with ego fully ahead in the left lane, a right-return path ending straight inside the right lane, and bumper-referenced longitudinal separation labeled illustrative. Explain that the top-down view cannot prove mirror visibility or a safe distance. |
| Medium | Questions and metadata | Mirror-only quiz answer rewards incomplete observation; no question tests safe return or speed-limited abort. Sample endorsement approves urgency, not real independent review. | Replace all three decision questions, retain IDs, remove only this sample endorsement, publish unverified, preserve history and bump card/pack versions. Relocate stale-review validation fixture to another unchanged approved card. |
| Medium | Consumers | Quick view hides recovery and the second diagram; full/individual-step audio excludes some cues. Unverified footer currently says only to reverse with visibility, inappropriate for motorway lessons. | Put essential speed limits, safe abort and return constraints in spoken instructions/safety, not only captions/recovery. Make the shared unverified footer maneuver-neutral without changing its certification meaning. |

## Evidence and interpretation

- [Vietnam Government: Law 36/2024/QH15](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: Article 13(2) requires permitted adjacent-lane changes,
  prior signaling and clearance ahead/behind/both sides. Article 14(1)
  explicitly applies lane-use rules to moving ahead on marked multi-lane
  same-direction roads. Accordingly this lesson teaches a left-side passing
  scenario, not a claim that every right-lane vehicle moving ahead on a
  motorway is legally prohibited overtaking. Article 12 governs appropriate
  speed and distance. Road signs, lane allocation and actual conditions prevail.
- [UK Highway Code, rules 221-222](https://www.gov.uk/guidance/the-highway-code/road-users-requiring-extra-care-204-to-225),
  read directly: large-vehicle drivers may not see a following vehicle; moving
  farther back improves your view and planning. Only general visibility
  principles are used, not UK left-driving geometry or speed limits.
- [FMCSA: Tips for Passenger Vehicle Drivers](https://www.fmcsa.dot.gov/ourroads/tips-driving-safely-around-large-trucks-or-buses):
  search-indexed agency guidance supports avoiding blind spots and seeing the
  truck in the rearview mirror before pulling ahead. Direct fetch returned
  HTTP 403, so this is corroborative rather than a directly verified primary
  text. No foreign numeric distances, blind-zone dimensions or blanket foreign
  passing law are imported. Mirror visibility remains a supplementary cue.
- Both existing rendered SVGs inspected in the running app. The truck overlaps
  the road edge in each; the return path heads down toward the boundary.
  No separate photo, chart, animation or additional lesson visualization exists.

## Scope and implementation plan

1. Commit this analysis and plan before code changes.
2. Revise the complete card coherently; retain card/lesson/checklist/asset/quiz
   identities and original changelog. Add sufficient steps for assessment,
   lane change, passing, return and conditional abort.
3. Replace only this lesson's two generator scenes and captions/alt. Include
   semantic SVG groups for lane boundaries, vehicles, traffic direction,
   blind areas, paths and bumper-based separation. Draw no numeric safe gap
   or purported exact blind-zone envelope.
4. Remove sample certification; bump card to 1.1.0 and content pack to
   2026.10.17, regenerate deterministic assets, update the stale-review fixture
   and neutralize the shared unverified footer's reversing-only wording.
5. Add focused tests for actual correct quiz answers, quick/audio safety
   sources, stable IDs/history/status, vehicle footprints, cab headings,
   dashed-boundary crossings, road-contained paths ending forward and
   bumper-referenced clearance. Run tests, lint and typecheck/build.
6. Inspect both final diagrams, desktop/mobile text/layout, quick mode and quiz
   outcomes in-browser. Verify reproducible generation and no unrelated SVG
   changes. Record results and commit the verified coherent revision.

The shared `pre_highway` checklist and highway-flow grouping remain suitable;
no unrelated card/checklist or learning-path change is required.

## Baseline

Clean initial worktree. Content, assets and validation suites: **31 tests
passed**. Original diagrams inspected in the lesson before implementation.
