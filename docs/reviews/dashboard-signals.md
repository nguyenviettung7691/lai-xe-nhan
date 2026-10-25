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

Additional diesel and lighting references will be recorded after direct
verification. Manufacturer examples are not Vietnamese traffic-law advice.
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
   Do not alter lesson-asset generation, unrelated lessons or review claims.

## Verification results

Pending implementation.
