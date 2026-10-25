# Review and mitigation plan: `parking-parallel`

Date: 2026-10-25. Scope: the complete lesson, cues, quiz, recovery, safety,
review metadata, shared pre-reverse checklist, generated artwork, accessible
descriptions, learning/quick modes and spoken-instruction sources. This is an
editorial and technical review, not instructor certification.

## Analysis before implementation

| Priority | Location | Finding and consequence | Mitigation |
| --- | --- | --- | --- |
| High | `src/content/cards/parking.ts:140` | A space 1.5 m longer than the car and two reversing phases are treated as guarantees. Vehicle geometry, road width and front swing can make that space unsuitable. | Assess the whole manoeuvring area; no universal minimum gap or attempt count; choose another legal space if unsure. |
| High | `src/content/cards/parking.ts:147` | Fixed 80 cm spacing, shoulder alignment, full lock and a 30 cm wheel marker imply one recipe works on every car. The starting shoulder cue conflicts with a useful rear-end alignment example. | Explain a right-curb, level-road example, approximate rear-end alignment and vehicle-dependent clearance; describe rear movement toward the curb and conditional countersteering without fixed timing or steering lock. |
| High | `src/content/cards/parking.ts:149` | Reversing starts without an explicit full stop, all-round check or yield rule despite motorcycles passing. | Require a full stop before selecting reverse or changing direction; check mirrors, blind spots and directly around the car continuously; stop for people, vehicles, uncertain clearance or sensor warnings. Include the front swinging left during the first rightward reverse. |
| High | `src/content/cards/parking.ts:160` | Recovery after curb contact mandates moving half a car length; no check for damage or forward clearance. | Stop, do not climb the curb or force steering, assess possible tyre/wheel damage safely, and reposition only with verified clearance or abandon the space safely. |
| High | `src/content/cards/parking.ts:161` | Legal restrictions omit prohibited reversing locations; 30 cm is presented as a suitable final street-parking distance. | Cite Vietnamese rules in this report; include the one-way-road reversing prohibition and lawful-site checks. Replace 30 cm with the street-parking rule: nearest wheel no more than 0.25 m from the right curb, without contact or obstruction. This is a final legal limit, not a steering trigger. |
| Medium | `scripts/generate-assets.mjs:312` | Both cars face upward with the curb on their left; the approach car is not alongside the front parked car. The path initially points toward the curb but not backward from the depicted rear. | Put the curb on the right, align the starting rear ends, label front/traffic direction and draw only the initial rearward-right direction, explicitly not a full trajectory. |
| Medium | `scripts/generate-assets.mjs:333` | A horizontal 30 cm dimension spans the car, not the curb clearance, and a check mark implies an automatically safe result. | Remove numeric dimensions and the success check; show a parallel final pose, visible positive gaps at both ends and the right curb, without a motion path. |
| Medium | `src/content/reviews.ts:34` | A sample reviewer is displayed as genuine approval. | Remove only this sample review and publish the revised lesson as `published_unverified`. |
| Medium | `src/content/validation.test.ts:87` | The stale-review test depends on this card staying approved. | Move that fixture to an unchanged approved card so the test still exercises a real stale review. |

## Evidence and limits

- [Vietnam Government policy portal: full Law 36/2024/QH15](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: Article 16 requires observation to both sides and behind,
  a reversing signal and safe conditions; prohibits reversing on one-way roads,
  in no-stopping areas, pedestrian crossings, intersections, rail crossings,
  obscured-view locations, road tunnels and expressways.
- [Government explanation of Article 18](https://xaydungchinhsach.chinhphu.vn/luat-trat-tu-an-toan-giao-thong-duong-bo-quy-dinh-dung-xe-do-xe-119241219154518756.htm):
  street parking is on the right in the direction of travel, with the nearest
  wheel no more than 0.25 m from the curb, without danger or obstruction.
  Signals do not create priority or authorize stopping/parking alongside another
  parked vehicle. Do not turn the alignment example into permission to wait
  double-parked in the traffic lane.
- Article 19 of the same law requires checking ahead, behind and on the opening
  side before opening a door, not just checking for motorcycles on the left.
- [UK Highway Code, rules 200, 202 and 203](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203#rule202):
  choose a suitable quiet place, observe all around, reverse slowly, account for
  front swing, and reverse no farther than necessary. Used for general safety
  principles only, not as Vietnamese law.
- The shared `pre_reverse` checklist already says cameras/sensors only assist
  direct/mirror observations and its speed ceiling is not a target. Preserve it.
- Rendering already supplies image dimensions, alternative text, variant lazy
  loading, captions, an unverified notice and semantic quiz controls. TTS scripts
  derive from card data; revise that data rather than create a separate script.
- Drawings will remain schematic, not to scale, not a measured swept-path
  simulation. Actual clearance and steering timing require supervised practice
  with the specific vehicle; a fixed illustrative pose is not a universal cue.

## Implementation plan

1. Revise all lesson fields coherently in Vietnamese, including legal-site
   selection, continuous observation, direction changes, conditional steering,
   safe recovery, securing the car and checking before opening doors.
2. Redraw only the two parallel-parking scenes with a right curb, consistent
   vehicle heading, clear front/rear meaning and a limited initial reverse arrow.
   Update captions and alt text together.
3. Remove the sample approval; preserve card, asset, checklist and quiz IDs.
   Increment the card and content-pack versions, preserving release history.
4. Add regression tests for driving conditions, quiz answers, review state and
   geometric invariants (right curb, initial alignment, rearward arrow tangent,
   obstacle-free partial path, final gaps). Repair the coupled stale-review
   fixture without weakening it.
5. Run focused tests, lint and build. Regenerate twice to establish determinism
   and verify the other 44 artworks remain unchanged. Inspect both images and
   the lesson on desktop/mobile, measure SVG text bounds and exercise the quiz
   and quick mode.
6. Record actual results here and commit the verified implementation as a
   coherent revision. Keep this analysis/plan in its own prior commit.

## Baseline

`npm test -- src/content/assets.test.ts src/content/validation.test.ts
src/content.test.ts`: 31 tests passed before changes. The worktree was clean.

## Verification results

Pending implementation.
