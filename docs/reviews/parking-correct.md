# Review and mitigation plan: `parking-correct`

Date: 2026-10-25. Scope: this card's context, objective, steps, cues, spoken
instructions, mistakes, recovery, safety, mnemonic, quiz, review metadata, linked
pre-reverse checklist and both generated SVGs. This is an editorial/technical
review, not professional certification or a vehicle-specific manoeuvre recipe.

## Analysis before implementation

| Priority | Finding | Real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | A 20 cm difference triggers correction; equal side gaps are treated as alignment. | Mirror perspective cannot establish that measurement. A parallel but off-centre car differs from an angled car, and danger may arise before any threshold. | Stop on uncertain clearance or an unsuitable approach; distinguish angle from lateral position without a universal measurement. |
| High | Moving forward one full car length into the aisle is mandatory, without checking traffic or clearance. | The front, mirrors or rear corner can strike an adjacent vehicle, column or road user; the aisle may not permit that travel. | Check directly, mirrors, blind spots and all corners before moving; yield to aisle traffic; move only as far as verified space permits, otherwise wait or abandon the bay when safe. |
| High | Quarter-turn steering and checks every 50 cm are prescribed. | Steering geometry varies; intermittent observation misses a child or cyclist entering the path. | Adjust progressively to actual vehicle response while creeping, with continuous all-round observation and the brake ready; stop fully before each direction change. |
| High | The first quiz answer skips stopping; recovery says select P and get out without securing or checking the door area. | Encourages changing direction while rolling or leaving an unsecured car in an active aisle. | Test stopping first; include manufacturer-specific securing, parking brake, safe exit and helper visibility conditions in recovery. |
| Medium | Stationary steering is framed as the core mistake and only two attempts are allowed. | Tyre wear distracts from collision prevention; an arbitrary attempt count does not establish safety. | Replace with actual clearance/visibility mistakes and a safe abandonment criterion, not a fixed number of attempts. |
| Medium | Main SVG contains a disconnected hazard line, an unexplained reversing arrow and an unscaled 20 cm claim. | The drawing suggests continuing to reverse and presents false precision. | Show an explicitly stopped angled car, a labelled bay axis and front/rear; no movement arrow or dimensions in the diagnosis scene. |
| Medium | Both scenes use a continuous line across the bay mouth; the variant curves right despite saying move straight. | Bay entrance and travel direction are ambiguous; the illustrated path is not consistent with the instruction. | Use a dedicated open-mouth bay; the variant starts at the same pose and shows only a short forward arrow aligned with the car's longitudinal axis, not a complete correction path. |
| Medium | A sample reviewer supports `approved`. | Misrepresents independent validation of revised advice. | Remove the sample review and use the existing `published_unverified` UI state. |
| Medium | Shared `pre_reverse` camera hint suggests relying on mirrors when the camera is obscured. | A failed aid is not justification to proceed without a clear view. | Clarify that aids supplement direct/mirror checks and require stopping when unsure; clarify the checklist speed ceiling is not a target. These two hints affect all users of this shared checklist; keep IDs and requirements unchanged. |

## Reference basis and limits

- [UK Highway Code, rule 202](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203#rule202):
  check mirrors, blind spots and obstructions before reversing; move slowly with
  all-round checks and account for front swing.
- [UK Highway Code, rule 203](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203#rule203):
  do not reverse farther than necessary.
- [UK Highway Code, rule 239](https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252#rule239):
  secure the vehicle before leaving and check all around before opening a door.
- These are general manoeuvring references, **not Vietnamese law**. Local rules,
  the vehicle manual and supervised practical instruction take precedence.
  No source establishes a universal centimetre trigger, steering increment,
  pull-out length or attempt count. A diagram cannot establish actual clearance.
- Forward steering/reversing response depends on vehicle geometry and pose.
  Do not prescribe a universal left/right correction sequence from one drawing.
  Stop when the intended path or clearance is uncertain.

## Implementation sequence

1. Revise the card coherently (including cues, quiz and recovery), remove sample
   approval and clarify the two directly linked checklist hints.
2. Replace only the two correction scenes and their accessible descriptions.
   Keep vehicle pose consistent and distinguish front direction from motion.
3. Bump card/content-pack versions with stable IDs and preserved release history;
   regenerate the SVGs and checksum manifest.
4. Add regression tests covering real-world stop/observation/direction-change
   conditions, review status, shared hints, open bay geometry, orientation and
   arrow alignment. Verify unrelated generated artworks remain unchanged.
5. Run focused tests, lint and production build; inspect both diagrams and the
   lesson in a browser at desktop/mobile sizes, check SVG text bounds and quiz
   behaviour, and verify quick mode still carries the revised instructions.
6. Record actual verification results here and create a scoped revision commit.

## Verification results

- Implemented as card `1.1.0` and content-pack `2026.10.3`. Card, lesson,
  checklist, asset and quiz IDs remain stable. The shared checklist change is
  limited to the two explanatory hints described above.
- `npm test -- src/content/parking-correct.test.ts src/content/parking-align.test.ts
  src/content/assets.test.ts src/content/validation.test.ts src/content.test.ts`:
  **50 tests passed** across five files, including 11 correction-lesson cases.
  These cover instructional conditions, quiz answers, securing/exit, review
  status, shared hints, actual vehicle orientation, open bay boundaries and
  collinearity of the forward arrow with the car axis. The straight example's
  swept body also stays within the depicted clear corridor.
- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript checking and PWA generation.
  Installed Zod code emitted non-blocking Rollup annotation warnings.
- Repeated `npm run content:assets` produced identical SHA-256 hashes for both
  revised SVGs and the manifest. Exactly two artwork/manifest entries changed;
  the other **44** assets are unchanged.
- Browser verification at **1136 px desktop** and **390 px mobile**: eight steps
  render, no horizontal page overflow, both images load, and the explicit
  unverified badge replaces the sample approval. Visually inspected both scenes
  at both widths: front/rear orientation, labelled bay axis, open entrance and
  forward arrow agree with the intended partial forward movement.
- Measured all SVG text with browser `getBBox()`: no text lies outside either
  320 by 200 viewBox. Diagram notes and captions explicitly limit the example:
  not to scale, not the whole correction, no universal travel/steering recipe.
- Browser quiz interaction with the revised answers returned **3/3 (100%)**.
  Mobile quick mode retains all eight revised steps and the main figure; learn
  mode restores the variant. No browser console errors or warnings were recorded.
- TTS source review confirms both full-script and per-step playback consume the
  same revised instructions, cues and safety fields, without a separate stale
  lesson script. Audio output itself was not auditioned.

Remaining release limitation: independent professional validation is required.
Automated checks do not establish safe driving competence or suitability for every
vehicle, parking layout or traffic situation.
