# Review and mitigation plan: `narrow-mirror`

Date: 2026-10-25. Scope: the complete Vietnamese card, every step/cue/hint,
mistakes, recovery, safety, mnemonic, three quiz questions, both SVGs and their
generator/captions/alt text, review status, release metadata and learn/quick/TTS
surfaces. This is an editorial/technical review, not driving-instructor approval.

## Analysis before implementation

| Priority | Surface | Finding and real-world consequence | Mitigation |
| --- | --- | --- | --- |
| High | Context/objective/mnemonic | Calling mirrors the most trustworthy measuring tool, and visible gaps "real", implies precision and complete coverage. Equal-looking gaps are not equal physical clearances, especially with convex mirrors and asymmetric obstacles. | Describe mirrors as observation aids, not rulers. Prioritize sufficient clearance for the complete vehicle, not visual symmetry; explain distortion, blind spots and unseen low/high objects. |
| High | Stop condition | Stopping when a mirror touches is too late. Missing gaps, people, doors and changing clearance need intervention before contact. | Stop and hold before the obstruction whenever clearance/view is uncertain, a person enters or a warning occurs; resume only after renewed all-round checks. If contact has occurred, stop, secure and assess rather than force through. |
| High | Folding/recovery/quiz | Automatically folding in a tight alley, even at creep speed, removes observation without proving the body or path fits. The variant states a universal 2.2 m folding threshold. | Keep mirrors open; do not use an alley-width threshold. Any exceptional fold is conditional on stopping, the vehicle manual and adequate whole-vehicle clearance/observation; otherwise choose another route or request help. Reopen safely as soon as clear. |
| Medium | Adjustment/scan | A sliver of body can be a reference but is not a universal prescribed setup; adjusting while moving is not excluded. A fixed sub-second glance rule or wall marker distracts from hazards ahead. | Adjust seat and mirrors while stationary per manual, preserve rear/side view; use a body reference only if appropriate. Alternate ahead/near/both mirrors/direct blind-spot checks as needed, without timed staring. |
| High | Steering | Correcting whenever gaps differ may steer toward a motorcycle/person on the opposite side. Mirrors cannot show every front corner or rear-wheel path. | Stop if uncertain before correcting; check both sides, front sweep, body and rear tracking, then make small corrections only with a clear route. Never chase equal-looking mirror gaps. |
| High | Guide/inspection/retreat | "Ask someone outside" has no safe standing position, communication or lost-contact rule; inspection and blocked-route handling are absent. | Secure the stationary vehicle before safe exit. Keep guide outside vehicle path/sweep and never trapped by a wall; maintain sight and agreed signals, stop on lost contact. No automatic blind reversing; lawful, visible, checked and signalled reversing only. |
| Medium | Main SVG | Upward car orientation is consistent, but mirrors are not drawn. A 40 cm bracket runs from beyond the body to the motorcycle centreline at a different longitudinal position, not between nearest edges. It falsely suggests a measured safe gap. | Draw protruding open mirrors and a recognizable parked motorcycle/handlebar. Put an unnumbered clearance bracket exactly between the mirror outer edge and nearest handlebar edge at the same cross-section. Label front/rear, parked status and not-to-scale semantics; no implied movement. |
| High | Variant SVG | No folded mirrors are actually depicted; an unidentified block and generous blank space do not explain why folding is needed. Fixed width and "fold to pass" caption encourage forcing entry. | Replace with a stopped-car assessment before a visible wall projection narrowing the path; retain open mirrors, mark uncertain clearance, label obstruction and stop. No driving/folding arrow or guaranteed swept path. |
| Medium | Approval/assessment | Sample approval endorses only one adjustment rule, not the unsafe whole lesson; current quiz rewards automatic folding and precise glance timing. | Remove this card's sample review, use `published_unverified`, rewrite all quiz answers with a stop-condition question. Preserve stable identifiers/history; move stale-review validation to a still-approved fixture. |

## References and limits

- [Vietnam Government: Law 36/2024/QH15, Articles 12 and 16](https://xaydungchinhsach.chinhphu.vn/toan-van-luat-trat-tu-an-toan-giao-thong-duong-bo-119240909105718285.htm),
  read directly: speed must suit conditions; observe, slow or stop on narrow
  roads and with limited visibility. Reversing requires side/rear checks,
  a signal and safety; one-way roads and obscured-view locations are among
  prohibited locations. No universal alley-width or mirror-gap rule is inferred.
- [UK Highway Code, rules 159 and 161](https://www.gov.uk/guidance/the-highway-code/using-the-road-159-to-203),
  read directly: mirrors do not cover all areas, check blind spots and move
  only when safe. General observation reference, not Vietnamese traffic law
  or advice to adopt UK left-side driving.
- [UK Highway Code, rules 125 and 126](https://www.gov.uk/guidance/the-highway-code/general-rules-techniques-and-advice-for-all-drivers-and-riders-103-to-158),
  read directly: limits are not safe targets; stop within the visible clear
  distance. No fixed creep-speed or glance-duration guarantee is inferred.
- [Ford owner manual: exterior mirrors](https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?variantid=6368&languageCode=en&countryCode=USA&Uid=G1839220&ProcUid=G1839222&vFilteringEnabled=False),
  read directly: do not adjust mirrors while moving; convex blind-spot mirror
  objects are closer than they appear; folding and restoring position are
  model-specific. This example does not authorize folded-mirror driving on
  every vehicle or prescribe a universal adjustment angle.

The existing pre-drive checklist is preparatory, not proof an alley fits; no
shared-checklist change is needed. The lesson renderer derives learn, quick,
full-script and step TTS from the card. Quick mode hides recovery and the second
diagram, so stop/hold, uncertainty, folding limits and restart checks must be
in spoken steps/safety as well. No other photos, charts or lesson-specific
animations exist for this card. Adjacent lessons are outside this iteration.

## Implementation plan

1. Commit this analysis/plan before changing lesson content.
2. Rewrite the coherent card, retaining card/lesson/checklist/asset/quiz IDs;
   increase reading estimate and risk classification to reflect tight-space
   collision hazards. Keep all three quiz questions substantive.
3. Replace only the two mirror scenes and descriptions in the generator;
   regenerate SVGs and manifest. Geometry must substantiate bracket endpoints,
   mirror protrusions, heading and the stopped-before-narrowing variant.
4. Release card 1.1.0/content pack 2026.10.9, preserve old releases, remove only
   the mirror sample approval, and add content/quiz/geometry regression tests.
5. Run focused and full tests, lint/build and deterministic regeneration;
   verify only these two SVGs changed. Inspect actual diagrams and lesson at
   desktop/mobile sizes, text bounds, quick mode, quiz and review warning.
6. Append verification evidence and create a separate revision commit.

## Baseline

Clean worktree. Existing narrow-creep, asset and quality-gate tests:
**29 passed**. Both mirror SVG sources, renderer and metadata inspected.

## Implementation and verification

- Plan committed first as `718812a`, before lesson implementation.
- Card **1.1.0**, content pack **2026.10.9**. Revised context, objective,
  seven steps and cues, speed/steering hints, three mistakes, recovery, safety,
  mnemonic and all quiz questions. Tight-space collision risk is now medium;
  reading estimate is five minutes. All stable identifiers and history remain.
- Removed only this card's sample approval; actual lesson displays
  **Chưa thẩm định độc lập**. Independent instructor review remains necessary
  before any expert-approved claim. The stale-approval regression now uses
  the still-approved `narrow-corner` fixture; no adjacent content was edited.
- Main diagram: front up, two open mirrors outside the body, parked motorcycle
  with distinct wheels/seat/handlebar. Brackets join the left wall to left
  mirror and right mirror to nearest handlebar edge at the same cross-section.
  No 40 cm target, reflection/FOV claim or movement arrow.
- Variant: same heading and open mirrors, entire car stopped before the
  wall projection; red bracket spans the uncertain opening, not a path.
  No 2.2 m threshold, folding instruction or motion arrow.
- Both diagrams visually inspected at desktop and **390 px** mobile width.
  Browser SVG text-bound checks found a small footer-line overlap in the
  first revision; increased only these scenes' footer line spacing to 12 px.
  Final checks: **no out-of-bounds text and no overlapping text pairs**.
  Motorcycle detail was refined during visual inspection to avoid a
  person-like silhouette.
- Actual lesson checked at **1366 x 900** and **390 x 844**: both images load,
  no horizontal overflow, seven steps and unverified warning visible. Quick
  mode retains all steps, early-stop and safety guidance while hiding the
  second diagram as intended. Quiz exercised wrong answers (**0/3**, fail),
  retry and correct answers (**3/3**, pass), including the stop-condition badge.
  Browser console: **zero errors or warnings**.
- Full-script and step-TTS assembly reviewed: revised instructions, cues and
  safety reach the existing spoken surfaces without relying on hidden
  recovery content. Audio playback itself was not independently evaluated.
- Added **12 focused regression tests**, covering content/quiz/metadata,
  model-specific setup/folding, safe guide/inspection/reversing, actual car
  orientation, mirror protrusions, bracket endpoints and stopped-car geometry.
- Final `npm test`: **179 passed across 20 files**. `npm run lint` passed.
  `npm run build` passed Vue/TypeScript checks and production/PWA generation;
  Rollup emitted only third-party Zod annotation-removal notices.
- Regenerated twice and compared SHA-256 hashes: **all 46 SVGs and manifest
  deterministic**. Git confirms **only the two narrow-mirror SVGs changed**;
  other asset records unchanged apart from pack version/aggregate size.
  Whitespace diff check passed. Temporary browser/server files are not part
  of the revision.

No claim of measured safe clearance, complete mirror coverage, universally
safe folded-mirror driving or independent professional certification is made.
