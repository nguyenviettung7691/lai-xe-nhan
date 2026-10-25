# Review and mitigation plan: `parking-align`

Date: 2026-10-25. Scope: this card only, including its two SVG illustrations,
metadata, spoken steps, quick-check answers, recovery, safety and linked checklist.
This is an editorial/technical review, not certification by a driving instructor.

## Analysis before implementation

| Priority | Finding | Real-world consequence | Planned mitigation |
| --- | --- | --- | --- |
| High | Equal apparent gaps in two different mirrors, or a difference below 10 cm, is presented as proof of parallel alignment. | Mirror adjustment and perspective differ; a centred but angled car can still cross a line. A parallel car can also be off-centre. Side mirrors cannot show the whole front of the car. | Distinguish alignment (body-to-line relationship along the vehicle) from lateral position (usable space on both sides); compare the visible body in each mirror, supplement with direct observation, and remove the centimetre trigger. |
| High | Stop depth is based on the rear wheels being 30 cm from the end line. | Rear overhang varies; the bumper can hit a wall or overhang a walkway before the wheels reach that point. | Check the whole vehicle, rear bumper, low obstacles and front clearance; no universal depth target. |
| High | Instructions focus on mirrors, without continuous all-round observation or a stop condition while moving. | People, low objects and front swing can be missed even at low speed. | Observe directly and with mirrors, use cameras/sensors only as aids, creep with the brake ready, stop if anyone enters the path or clearance is uncertain. |
| High | Recovery mandates D, half a car length and at most two attempts. | It assumes an automatic and available forward clearance; neither distance nor attempt count guarantees safety. | Stop before direction changes; move forward only as far as verified clear space permits, reassess before reversing, abandon an unsuitable bay. |
| Medium | The main SVG labels both gaps 40 cm even though target bay edges are x=160/224, body edges x=183/209 and the right dimension ends at x=232. | A visibly off-centre car and incorrect dimension endpoints teach the wrong visual reference. | Use a dedicated centred bay scene, dimensions ending at the actual body/bay edges, and no physical measurements or scale claim. |
| Medium | Mirror cones start away from the mirrors and point down the page, toward the front of the car rotated 180 degrees. | The picture implies forward-looking areas are rear-view mirror coverage. | Draw mirrors near the front of the body, with dashed illustrative sightlines toward rearward bay lines; explicitly say these are not movement paths or complete fields of view. |
| Medium | The scene closes the aisle-facing bay boundary with a continuous line; front/rear are not explicit. | The parking entrance and vehicle orientation are ambiguous. | Show an open bay entrance, label front/rear, and avoid movement arrows in a stationary alignment scene. |
| Medium | `approved` is backed by a sample reviewer, not independent verification of this revision. | The UI gives unwarranted confidence in practical advice. | Remove this sample review and publish as `published_unverified`, preserving the existing card ID and progress. |
| Medium | The quick check repeats the 10 cm rule and only mentions motorcycles when opening the door. | Assessment reinforces false precision and incomplete observation. | Test alignment versus centring, safe bumper/obstacle clearance, and stopping when visibility is lost; cover all road users in exit guidance. |

The linked `post_park` checklist already requires a full stop before P, a parking
brake and an observation before opening a door. Keep its shared behaviour unchanged;
the card will additionally cover pedestrians/cyclists and defer the securing
sequence to the actual vehicle's manual. The card remains a reversing/parking
lesson, not a model-specific transmission tutorial. The existing rendering and TTS
consume the same card fields, so revised instructions will reach all display modes
without view-specific copies.

## Reference basis and limits

- [UK Highway Code, rule 202](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203#rule202):
  all mirrors, blind spots, slow reversing, continuous all-round checks and front
  swing. Used for general manoeuvring principles, not as Vietnamese law.
- [UK Highway Code, rule 239](https://www.gov.uk/guidance/the-highway-code/waiting-and-parking-238-to-252#rule239):
  secure the vehicle and check all around before opening a door, including cyclists.
- Vehicle dimensions, mirror optics, blind spots and securing procedures vary.
  No universal centimetre, steering-angle, stopping-depth or attempt-count rule is
  asserted by this revision. Follow local requirements and the vehicle manual;
  practical instruction and independent professional validation remain necessary.

## Implementation sequence

1. Rewrite context, objective, 5–8 steps, three mistakes, recovery, safety, mnemonic
   and three quiz questions as one coherent revision; raise the reversing risk label
   to medium and remove the sample approval.
2. Replace both alignment scenes in the generator; regenerate SVGs and manifest.
   Preserve the other lessons' generated artwork.
3. Bump card and content-pack versions, retaining release history and stable IDs.
4. Add regressions for the instructional distinctions, stop conditions, status,
   correct dimension endpoints, vehicle orientation and rearward sightlines.
5. Run tests, lint and production build; check the lesson and both illustrations in
   a browser at desktop and narrow mobile widths, including quick mode and quiz.
6. Record verified outcomes here and commit this single coherent lesson revision.

## Verification results

- Implemented the mitigations above as card version `1.1.0` and content-pack
  version `2026.10.2`; stable card, lesson, checklist and asset IDs are unchanged.
- `npm test -- src/content/parking-align.test.ts src/content/assets.test.ts
  src/content/validation.test.ts src/content.test.ts`: **39 tests passed** across
  four files, including eight new lesson/content/geometry cases. The stale-review
  gate test now uses another approved card because this card no longer claims approval.
- `npm run lint`: passed.
- `npm run build`: passed, including TypeScript checking and PWA generation.
  Rollup emitted non-blocking annotation warnings from the installed Zod dependency.
- `npm run content:assets`: repeated generation produced identical SHA-256 hashes
  for both revised SVGs and the manifest. Only the two `parking-align` artworks
  changed; the other 44 SVGs and their manifest entries are unchanged.
- Browser checks at desktop (1135 px) and mobile (390 px): both SVGs loaded;
  eight steps rendered; no horizontal page overflow; the unverified badge appeared
  without an approval badge. Both mobile illustrations were visually inspected.
- Measured every SVG text element with browser `getBBox()`: no text extends
  outside either 320 × 200 viewBox. Dimension endpoints now meet the actual body
  and bay boundaries; rearward sightlines start on the depicted mirrors.
- Quiz interaction returned **3/3 (100%)** using the revised correct answers.
  Quick mode retained all eight steps and the main figure; returning to learn mode
  restored both figures. The revised mirror/direct-observation wording also rendered
  after the final wording update. No browser errors were recorded during these checks.

Remaining release limitation: **independent professional validation is still
required**. Automated tests establish content contracts, file integrity and diagram
geometry, not safe driving competence or suitability for every vehicle or bay.
