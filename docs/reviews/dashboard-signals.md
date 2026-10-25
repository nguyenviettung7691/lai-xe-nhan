# Dashboard signals: analysis and mitigation plan

Date: 2026-10-25. Scope: every entry in the dashboard-light lookup, its
illustration, colour, severity, search terms, three actions, prohibitions,
escalation advice, schema, filters, detail view and offline delivery.
This is an editorial and technical review, not manufacturer or instructor
certification. Illustrations are original schematic drawings, not copied
manufacturer artwork or a claim of ISO certification.

## Analysis before implementation

The baseline has 24 entries. Generic Unicode glyphs do not reliably identify
dashboard telltales and vary by platform. High beam is incorrectly green.
The three-colour model cannot express blue high beam. Front/rear fog lamps
are conflated. Startup bulb checks and steady/flashing distinctions are
largely absent. Several actions prescribe model-specific procedures or
encourage continued travel despite potentially serious faults.

| Existing signal | Content mitigation | Required graphic features |
| --- | --- | --- |
| brake | Stop for persistent red warning; combined ABS warning escalates; no road-test requirement | Exclamation inside brake circle and brackets |
| oil | Pressure is not level/service; stop engine; no blanket restart after topping up | Oil can, spout, handle and falling drop |
| temperature | No fixed cooling time or hot-cap opening; avoid steam and fans | Thermometer above coolant waves |
| transmission | Follow exact dashboard/manual stop/idle instruction; no universal ten-minute wait | Gear with exclamation, explicitly a representative variant |
| battery | Charging fault, not necessarily bad battery; safe stop, no promise of garage range | Battery terminals and plus/minus |
| airbag | SRS includes pretensioners; prompt inspection rather than waiting days | Seated person facing inflated airbag |
| seatbelt | Correct routing, all occupants, no defeating sensor | Seated person with diagonal and lap belts |
| door | Stop before checking latches; cannot secure means do not continue | Top-view car with visibly open doors |
| engine | Steady vs flashing; rough running/heat means stop | Recognizable engine outline |
| abs | No assumption all other braking is normal; red brake combination requires stop | ABS within brake brackets |
| tpms | Flash-then-steady sensor fault; cold placard pressure, not sidewall maximum | Open-top tyre cross section, tread and exclamation |
| eps | No restart cure or recommendation to drive with heavy steering | Steering wheel with exclamation |
| esp-active | Flashing intervention vs steady fault; necessary emergency braking allowed | Car above two skid tracks |
| esp-off | OFF is disabled/reduced assistance, not proof of a fault | Same skidding car plus OFF |
| immobilizer | Parked security blinking may be normal; exact backup-start procedure | Car with key |
| dpf | No universal regeneration drive; manual only, no indoor/stationary forced regen | Dotted filter with exhaust pipes |
| glow-plug | Preheat vs running/flashing diesel-management fault | Two-loop heating coil |
| service | Wrench may indicate powertrain fault on some brands | Open-ended wrench |
| fuel-low | Remove guaranteed 40–70 km reserve | Fuel pump, nozzle and hose |
| washer-fluid | Stop if visibility inadequate; correct fluid, no dry wiping | Windscreen with upward spray |
| high-beam | Blue, straight rays; no ambiguous request to use flashing as priority | Lamp facing left with horizontal rays |
| fog-light | Preserve ID, explicitly front fog; remove universal 100 m threshold | Left-facing lamp, downward rays, vertical fog wave |
| cruise | Armed/active states vary; cancel and brake, no self-driving implication | Speedometer with arrow |
| lane-assist | LDW is not necessarily LKA; colour/state varies, driver retains control | Car between lane boundaries |

### Missing coverage to add

Common cross-brand gaps: parking brake (P), EPB fault, low beam, position
lights, rear fog, turn indicators, hazard indicators, master warning,
low oil level, diesel water-in-fuel, AdBlue/SCR, Auto Hold, forward safety,
EV/hybrid READY, traction battery low, reduced power, EV-system fault,
charging connector, and regenerative-braking fault. Each will have three
actions and an original SVG. This is a practical common-signal catalogue,
not an exhaustive list of every brand's ADAS, drive-mode or bespoke symbol.
Variants and combined warning states are explained, not presented as
universal colour/shape/severity mappings.

## Reference basis

Directly read manufacturer guidance (accessed 2026-10-25):

- [Hyundai visual warning-light guide](https://service.hyundaiusa.com/en/warning-lights.html):
  charging, oil pressure vs level, SRS, ABS/EBD, EPB, MIL, ESC, TPMS,
  diesel preheat, lights and EV status/fault distinctions.
- [Hyundai INSTER 2025 warning and indicator lights](https://ownersmanual.hyundai.com/full_webhelp/axev/2025/en_gn/warning_indicator_lights.html):
  startup checks, braking combinations, READY, power limitation, traction
  battery, connector, steering, master warning, turn indicators, lane and
  forward safety, Auto Hold, low/high beam and rear fog.
- [Hyundai DCT warning messages](https://ownersmanual.hyundai.com/docview/webhelp/Hyundai/e5359817-58e3-4f16-a7d6-4499676ba6bd/id_glz_xft_4wb.html):
  an example that explicitly requires parking with the engine running;
  this must not become a universal overheating procedure.
- [Ford dashboard guide](https://www.ford.com/support/how-tos/ownership/ford-owner/what-do-the-lights-on-my-dashboard-mean/):
  the public page did not expose its actual guide through the text fetch.
  Do not use the search synopsis as sole verification.

Additional directly read references:

- [Hyundai Tucson DPF](https://ownersmanual.hyundai.com/full_webhelp/NX4/2025/en_GN/id9f0217514da.html):
  regeneration requirements are vehicle-specific; persistent flashing or
  exhaust-system warnings require inspection. Its particular speed, RPM and
  duration are deliberately not generalized.
- [Hyundai diesel water separator](https://ownersmanual.hyundai.com/full_webhelp/US4/2025/en_GN/id2eb162768e9.html):
  accumulated water requires service and can damage the fuel system.
- [Hyundai SCR/urea](https://ownersmanual.hyundai.com/full_webhelp/US4/2025/en_GN/id9cb9d9d7986.html):
  low level vs system/quality faults, no-restart countdown, correct tank and
  fluid, and refilling with the vehicle off.
- [Ford online manual: warning lamps](https://www.fordservicecontent.com/Ford_Content/vdirsnet/OwnerManual/Home/Content?variantid=1329&languageCode=en&countryCode=USA&Uid=G927901&ProcUid=G927904&vFilteringEnabled=False&buildtype=web):
  accessible primary text and illustrated examples for door/bonnet/boot,
  MIL, oil, steering, front/rear fog, main beam, ESP and powertrain warnings.
  Its ten-minute transmission procedure is specific to that manual, not a
  general cooling rule.

The Volkswagen UK engine-management page returned only pricing/footer text
through the fetch; its search synopsis was not used as primary evidence.
Manufacturer examples are not Vietnamese traffic-law advice.
No copied artwork, prescribed regeneration speed/time, reserve-distance
guarantee or arbitrary cooling duration will be introduced.

## Implementation plan

1. Commit this analysis before implementation. Baseline: clean worktree;
   light and schema suites pass, **17/17 tests**.
2. Add a shared SVG image renderer using base-path-safe, bundled local SVGs
   (offline and subpath deployment), blue colour across type/schema/filter/
   theme, and a visible manual/variant/startup-check disclaimer.
3. Replace every placeholder with an original recognizable SVG, preserving
   existing signal IDs and using the same image in grid and detail.
4. Correct each existing entry and commit its revision separately. Add
   focused state/action regressions and an explicit inventory of reviewed
   signals. New common signals also get separate commits.
5. Validate SVG structure and distinguishing geometry as well as content
   contracts. Visually inspect all symbols in-browser at grid/detail sizes,
   desktop/mobile and light/dark themes; exercise blue and keyword filters.
6. Update the content release and documentation; run the complete test suite,
   lint and production build. Record actual results and commit integration.
   Do not alter lesson artwork, unrelated lessons or review claims. Keep the
   generator's existing version stamp synchronized if the pack is released.

## Implementation and individual revision history

Analysis committed first: `f668696`. Shared original SVGs, typed icon lookup,
schema enforcement, renderer and colour foundation: `833da5b`. Each entry
below then received its own content regression and tested revision commit.
All 24 original IDs remain unchanged; `fog-light` now explicitly means front
fog, with a new separate rear-fog entry.

| Reviewed existing signal | Revision commit |
| --- | --- |
| brake | `925936b` |
| oil | `48adedc` |
| temperature | `d507e5c` |
| transmission | `568f314` |
| battery | `cec967b` |
| airbag | `8e8cde2` |
| seatbelt | `02a6891` |
| door | `f3e51a1` |
| engine | `0ae1180` |
| abs | `e86da80` |
| tpms | `0bbc1a3` |
| eps | `7eb4d9d` |
| esp-active | `e0738e6` |
| esp-off | `cc54ccc` |
| immobilizer | `f2b0e44` |
| dpf | `c95ed1f` |
| glow-plug | `8558834` |
| service | `37afe6a` |
| fuel-low | `35bd056` |
| washer-fluid | `53d55b0` |
| high-beam | `ed98f21` |
| fog-light | `506d3f7` |
| cruise | `1c04fae` |
| lane-assist | `be6a8cf` |

| Added signal | Distinction reviewed / original SVG | Revision commit |
| --- | --- | --- |
| parking-brake | Red bracketed P is applied status, not gear P; persistent/flashing state escalates | `0c9ef8d` |
| epb | Amber EPB fault, not red applied status; secure vehicle without relying on failed EPB | `61a7e59` |
| low-beam | Green left-facing lamp with dipped rays, no fog wave; DRL is not a substitute | `0d7092e` |
| position-light | Two outward lamps; position/lights-on indication does not prove low beam | `dbac5a7` |
| rear-fog | Amber rightward horizontal rays and fog wave, distinct from green front fog | `7eb9f2c` |
| turn-signal | Opposed arrows show possible directions; one flashes for a turn, both for hazard | `4f5b620` |
| hazard | Double triangle represents red switch marking; dashboard often flashes both green arrows; not master warning | `4ab16bd` |
| master | Triangle with exclamation requires the accompanying message; no diagnosis from triangle alone | `39fea4d` |
| oil-level | Amber oil can plus level wave; distinct from urgent red pressure warning | `151b909` |
| water-in-fuel | Filter with water drop; not DPF; injection-system damage and stop conditions | `e576536` |
| adblue | Representative DEF tank/drop with DEF text; fluid level vs SCR fault and restart restriction | `da6f5eb` |
| auto-hold | Explicit AUTO HOLD text; white standby vs green holding vs amber fault; not unattended parking | `c456504` |
| forward-safety | Car/impact/obstacle; amber unavailable/fault vs immediate red/flashing collision warning | `71c4f7c` |
| ready | READY text; silent EV can move, hybrid engine may start automatically | `600c489` |
| ev-battery-low | Battery with low segment, not plus/minus 12 V charging fault; no guaranteed range | `8aff43a` |
| power-limited | Turtle shell/head/feet; cold/hot/low charge or fault, not simply ECO | `78c341b` |
| ev-system | Car/exclamation representative; high-voltage restrictions and fire escalation | `499320b` |
| charge-connector | Plug/cable; connected does not prove charging/full; disconnect safely | `3299ef0` |
| regen-brake | Amber brake exclamation with red-brake combination explained; not ordinary full/cold battery regen reduction | `5b23a2f` |

Visual follow-ups: `4d6a56c` leaves extra margin below the OFF label;
`0b39c6f` makes long safety dialogs internally scrollable, constrained to
the viewport and above navigation. The information banner no longer tells
the user every informational signal means they may continue driving.
Charging warning intentionally moves from `warn` to `critical`: it now
prioritizes a safe stop rather than promising a drive to a garage.

## Verification results

- Catalogue: **43 entries / 43 original SVGs**, exactly three actions each,
  all registered drawings used once. Tests enumerate every reviewed ID,
  prevent glyph/unknown-icon substitution, check identifying drawing parts
  and verify front/rear fog direction, dipped/straight beams, OFF/P/ABS/EPB/
  READY/AUTO HOLD labels, colours, priorities and accent-insensitive search.
- **493/493 tests passed across 35 files** after release integration;
  lint and TypeScript/production build passed. Third-party Zod PURE-annotation
  warnings remain non-fatal; no dependency changes were necessary.
- Manually inspected the full rendered desktop catalogue and an enlarged
  43-symbol contact sheet, plus mobile dark catalogue and detail screenshots.
  Browser geometry checks found no SVG content outside the 64-square viewBox.
  OFF baseline was moved upward to retain additional margin.
- Exercised **all 43 grid-to-detail interactions** at desktop size, checking
  matching SVG identity and exactly three actions. Blue filter returns high
  beam; Vietnamese unaccented fog, battery, DEF, regen and READY searches work.
- Mobile dialogs were checked at 320, 390 and 1136 px for representative
  long entries. The production subpath build then passed **all 43 mobile
  dialogs at 390 px**, including reaching the assistance block and final
  acknowledgement button. No navigation overlap or offscreen panel edges.
- Tested light/dark and high-contrast modes through actual controls:
  minimum sampled icon foreground/background contrast **6.72:1** in dark
  and **6.94:1** in light, above the 3:1 graphical-object threshold. These
  measurements cover the signal symbols, not a whole-app accessibility audit.
- Built and served at `/lai-xe-nhan/`: 43 SVGs render without external image
  requests. Activated service worker controls that scope. With browser network
  disabled, reload still displays all 43 signals; blue filtering and full
  high-beam detail work. Re-enabled network afterward.
- An initial preview used a root-path configuration against a subpath build
  and returned asset 404s; rerunning preview with the matching base path
  resolved them. A dev-browser loop interrupted by content HMR was rerun
  successfully against the stable production build. Offline-only console
  WebSocket errors came from injected Console Ninja instrumentation, not
  signal assets or application code.
- Pack released as **2026.10.24**. Existing generator and lesson-asset manifest
  change only their version stamps; all **46 lesson SVGs remain unchanged**.
  Inline dashboard SVGs are bundled/pre-cached JavaScript, not lesson assets.
- Repeated asset generation produced an identical SHA-256 manifest hash;
  `git diff --check` passed. Final tests/lint/build were repeated successfully,
  restoring the default root-path production output after subpath testing.
  Temporary servers and browser screenshots/logs were removed afterward.

Remaining limits: this is not independent mechanical certification, a
vehicle-specific diagnostic tool, an exhaustive manufacturer symbol list,
or a legal statement of fog/high-beam operating thresholds. The visible
guidance instructs drivers to stop before lookup and defer to their exact
vehicle's messages/manual. Filters use the representative displayed colour,
not all possible brand/state variants described in each entry.
