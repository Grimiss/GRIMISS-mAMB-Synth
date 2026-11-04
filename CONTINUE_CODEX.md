# Arpeggiator and near-black hardware finish

100 factory presets in10 banks, including Arpeggios91–100. Audio-frame scheduler: Up/Down/Up-Down/As-Played/Random, five divisions, gate and1–3 octaves; shared tempo. HOLD/sustain/source ownership, patch recall, PANIC and Worklet/fallback verified by dedicated tests. Arp-off wet chords are sample-identical to v16 rollback at44.1/48/96kHz. New textured near-black finish, rounded printed rules/labels, screen glass, short shadows and recessed fasteners preserve measured geometry and37-note keyboard. See ARPEGGIATOR_AND_HARDWARE.md and reports/arp-hardware-review.html. Internal clock only; external MIDI Clock and step editing remain future work. Final release/test status is in reports/arp-release-verification.json. No main merge.

# Factory sound refresh checkpoint

90 intentional factory designs;83 enable varied effects, USER storage/names/numbering and approved geometry preserved. See FACTORY_SOUND_REFRESH.md, tests/preset-contrast-results.json and reports/preset-showcase.html. Includes a reproduced-and-fixed Thickness/PANIC buffer refill regression; no normal-note DSP change. Full-suite final status is recorded in the release verification report. Visual material/lighting improvements are proposals, not a new styling rollout.

## Expressive sound and mechanical controls

Latest request replaces the still-subtle macro response: Age now includes existing-stage saturation/tone wear with level compensation; Thickness now has a shared micro-detuned ensemble that changes mono audio. Velocity default is0; saved explicit USER values remain. Oscillator buttons are equal-size with stronger selected edge/icon glow; wheel ribs roll into fixed shells; black keys have visibly recessed pockets/cutaways. PLAY range heading and VOICE explanatory text are hidden/removed, with PITCH DRIFT label preserved. See EXPRESSIVE_CONTROLS.md. Rollback:rollback/pre-expressive-controls. Full suite passed; no main merge or full cabinet rollout.

## Slider/sound-range follow-up

Thickness now sits below Analog Age in VOICE. Horizontal tracks are full-height green-left fills updated by real input events; the old scheduler bypass of the refinement hook is fixed. Reverb buttons: MOD HALL / SPRING. OSC2 octaves:−1,0,+1. Buttons use rounded matte rubber faces. Age/Thickness upper ranges are stronger; see SLIDER_REFINEMENT.md for exact calibrated limits and compatibility. No extra voices/second timbre or cabinet reconstruction. Rollback:rollback/pre-slider-refinement.

Latest complete checkpoint: v0.5.1 at1dac36a (tag checkpoint/v0.5.1), published at the same private URL. Complete regression and additional menu/persistence checks passed. See V0_5_1_REFINEMENT.md, HOSTING.md and reports/v051-release-verification.json. Current live controls/keybed reflect the targeted brief, not a full Prototype C cabinet rollout. Preserve rollback/pre-v0.5.1. No background work continues after delivery.

## v0.5.1 targeted playable refinement

The current user brief authorises direct Analog Age, new Velocity/Thickness parameters, button/route/menu/header/EQ cleanup, actual pointer/touch/MIDI wheel repair and bringing the notched keybed into the LIVE synth. It does not authorise another broad cabinet reconstruction. Keep Prototype C unchanged and available. Rollback is rollback/pre-v0.5.1 at034e942. Read V0_5_1_REFINEMENT.md for signal flow, persistence, wheel global/owner semantics and limitations. No main merge. The new dist/GRIMISS_mAMB_v0_5_1.html and legacy v0_7 alias are byte-identical.

Checkpoint A is complete and published:71cefff (tag checkpoint/analog-engine-v0.5). Checkpoint B is separately committed/published:1c5b9ef, review at prototypes/reconstruction-c/index.html. Checkpoint C remains blocked ONLY on the user's explicit prototype approval. No background work continues after delivery. Full suite and prototype checks passed; see HOSTING.md and reports/analog-release-verification.json.

## Active: Analog Engine v0.5 / isolated visual prototype

The user approved parallel checkpoints. Workstream A completes Phase 1 analog DSP plus functional wheels, removal of permanent knob/fader numbers and printed key names. Workstream B is ONLY an isolated prototype in prototypes/reconstruction-c, including actual notched white-key silhouettes and seated black keys. Do not apply its materials/components/keybed to the live synth until the user approves Checkpoint B. Do not pause approved DSP work while awaiting that approval. No nonlinear filter modelling or supply sag. Preserve rollback tag rollback/pre-analog-phase1 at2fa85a5. See ANALOG_ENGINE_V0_5.md for architecture, tests and compatibility limits.

## Three-octave keyboard update

The user requested that the keyboard fill the blank areas. The on-screen bank now spans C3–C6 (MIDI 48–84): 22 white and 15 black keys, filling the 953-unit housing with uniform spacing. The existing C3–C5 pitches, typing mapping, MIDI messages, source ownership, pitch/mod wheels and octave controls retain their behaviour. The range label follows octave changes through C6. This explicitly supersedes the earlier 25-note/blank-end geometry compromise. No synthesis or effects algorithms changed. Browser regression verifies all 37 note identities, C6 pointer note-on/off, geometry and keyboard collapse at both target screen sizes.

# ACTIVE CHECKPOINT — approved reference geometry implemented

The user approved the geometry study, amending it to give filter ADSR the same420px width as amp ADSR, expand the filter to510px, enlarge cutoff, and extend EQ into adjacent gaps (256×94px). This clears the geometry approval gate. src/reference-layout.json is the native1280×640 coordinate authority; measured ORIGINAL rectangles remain unchanged in prototypes/geometry. src/coordinate-layout.js relocates original functional DOM nodes, and src/geometry.css supplies the coordinate layout. src/layout.js changes only logical dimensions to1280×640. Do not return to independent dashboard grid sizing.

Keyboard remains25notes C3–C5 with15white/10black keys, measured34×125 white faces/36pitch and21×79 black frames. The correctly proportioned538px active bank is centred inside the original housing; approved dark blank ends preserve note range. Keyboard hide expands panels through a shared coordinate transform. The main instrument remains2:1 and fits1920×1080 and1600×900.

Every original control remains. EQ has all4knobs and a compact live overview; DETAILS moves the SAME original EQ nodes into a full-response dialog and back. Both XY pads/assign buttons remain visible; EXPAND similarly moves original nodes. Never clone parameter IDs or substitute static graph artwork. tests/reference-layout.cjs checks actual panel coordinates, cutoff size, unchanged key geometry/mapping, original-node identity/interaction and unique IDs. tests/hardware.cjs permits only the approved layout-dimension constant change within the14 legacy functional scripts; the other13 remain exact.

See reports/reference-comparison.html for equal-scale browser/reference comparison and original/implemented boundary overlays. Amber indicates the user's intentional filter/ADSR/EQ deviations. Preserve Prototype B palette, screen glow/bezels and700-weight lettering. Main DSP, MIDI, effects, patch and automation modules remain unchanged.

## Earlier continuation record

# Approved Prototype B / screen-printed edition

The user approved Prototype B with more screen glow, visible bezels and heavier fonts, then specified ALL lettering should resemble screen printing. That approval cleared the earlier full-rollout gate. Preserve this approved direction; do not return to the rejected green gradient/rail/barrel-knob treatments. prototypes/low-profile-b contains the reference samples and comparisons. src/hardware.css applies near-black surfaces, flat graphite cheeks, low-profile geometry, visible bezels/glow and700-weight text throughout (including dialogs and SVG labels).

src/hardware-header.js adds the physical header composition, ventilation, catalogue-ordered patch arrows/LCD number and actual-context audio pilot. It reuses existing patch APIs. Original engine, effects and functional modules stay unchanged. tests/hardware-header.cjs covers navigation/wrap, imported USER readout, real audio indicator, component coverage, screen bezels/glow and printed font weights. Keep tests/hardware.cjs preserving the original156control contracts while explicitly allowing the performance and patch navigation widgets.

# Continue GRIMISS mAMB v0.7

Start from the latest verified `codex/controller-workflow-v0.7` commit, based on v0.6 `46d8bdd306df14268d52b94dbcf9f58e63f6bab8`. Never start from main or discard the prior checkpoints. Read DEVELOPMENT_LOG.md, ROADMAP.md, TEST_RESULTS.md, HOSTING.md and modular source/tests.

Run `npm run build` and `npm run test:all` in a Chromium-capable environment. The canonical historical HTML and dist/GRIMISS_mAMB_v0_7.html must be byte-identical. Edit src modules; regenerate MIDI targets and map artifacts with tools/build-midi-map.cjs after parameter changes. No paid services or Sound Factory modifications.

Architecture: one timbre/eight active voices, bounded steal tails, source ownership, two independent LFOs/four routes and one shared stereo effects chain. Preserve src/synth.js and effects algorithms unless a measured change is justified. Optional input monitoring is mixed before shared effects, defaults off/gain zero and stops on PANIC. AudioContext resumes synchronously on trusted first key/pointer gesture before asynchronous Worklet setup; never promise browser-policy-free autoplay or add a mandatory Start Audio button.

The rejected finish-only pass has been superseded by a corrective reconstruction. tools/hardware-components.cjs generates the actual knob SVG bodies and physical fader assemblies during build. Do not edit the old source SVG circles expecting those to change the new controls. src/physical-controls.js adds working local pitch/mod wheels and octave buttons; keep MIDI source ownership independent and verify transpose/release/highlights/spring return with tests/physical-controls.cjs.

Visual layer: src/hardware.css is embedded by build.cjs; src/interface.html supplies shared SVG paint gradients. tests/hardware.cjs compares all14 functional script bodies and156 original control tags (allowing only the new performance module/widgets) with tests/fixtures/v0.7.html (2531bed). Do not change DSP to revise appearance. For a later explicitly functional release, deliberately update the parity baseline/guard after validating the authorised behavior change rather than deleting coverage. HARDWARE_VISUAL_PASS.md records the approved mockup comparison and retained functional scope.

UI: 1280×640 logical hardware panel, fit to viewport, body-sibling dialogs. Keyboard is visible by default; persisted hide state really grows graphs/controls without DSP/context reset. OSC1 buttons are4+3. Ninety continuously numbered factory patches,9×10banks; USER edits via SELECT PATCH. Patch schema v3 contains XY; legacy versions remain supported. MIDI profiles are separate, versioned and source/channel-scoped. Original Arturia KeyLab25 has no pad grid. Never invent unknown factory CCs or call synthetic activity hardware verification. Read KEYLAB25_MIDI_MAP.md.

Retained storage: grimiss-mamb-user-patches-v2, grimiss-mamb-midi-map-v1, grimiss.mamb.layout.v1, grimiss.mamb.xy.v1, grimiss.mamb.selected-patch.v1, grimiss.mamb.midi-devices.v1. Do not rename/remove without migration. MIDI map standalone and app use the same registry and storage events.

Next: actual owner-authenticated live-domain QA once its Cloud Environment HTTP host is allowed; physical Windows/tablet/KeyLab25 tests, real audio deadline/dropout telemetry, listening-led factory/effect refinement. ARP and automation remain visibly unimplemented. Smaller portrait/tablet readability and accessibility deserve further physical validation.

For deployment reuse the existing owner-private Site project appgprj_6ae9ad1b7aa08191846efb701d49414c and URL in HOSTING.md. Preserve audience/private GitHub visibility. Push the exact tested Site-source state using a fresh short-lived credential only through hidden stdin, package and deploy privately, check terminal status. Do not claim actual live-browser QA passed from a deployment status; the configured proxy previously blocked the hostname. No main merge. Finish with clickable playable/download/screenshot/map links, tests, exact branch/commit and candid limits.
