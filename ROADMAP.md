# Orbitron Black / sage section refinement

Headings restored to embedded Orbitron900. Rounded filled sage title bars with dark cut-out names, thicker inset borders, and identical oscillator colour/texture on all sections. CSS-only; all embedded program scripts unchanged. Existing browser geometry/header/control/arp-audio checks passed. See ORBITRON_SAGE_REFINEMENT.md and reports/orbitron-sage-release-verification.json. No main merge.

# Photographic hardware reconstruction checkpoint

Latest supplied photo drives custom compact rotary art, narrow raised fader caps, six ivory key materials, boxed sage print, neutral charcoal exposure and black decorative leads. No desk/foam backdrop. All100 presets, arp and existing controls preserved.18 protected scripts are byte-identical to rollback; approved coordinates and37-note range retained. See PHOTO_RECONSTRUCTION.md, reports/photo-reference-map.json and reports/photo-reconstruction-review.html. Final verification/publication status is in reports/photo-release-verification.json. No main merge.

# Arpeggiator and near-black hardware finish

100 factory presets in10 banks, including Arpeggios91–100. Audio-frame scheduler: Up/Down/Up-Down/As-Played/Random, five divisions, gate and1–3 octaves; shared tempo. HOLD/sustain/source ownership, patch recall, PANIC and Worklet/fallback verified by dedicated tests. Arp-off wet chords are sample-identical to v16 rollback at44.1/48/96kHz. New textured near-black finish, rounded printed rules/labels, screen glass, short shadows and recessed fasteners preserve measured geometry and37-note keyboard. See ARPEGGIATOR_AND_HARDWARE.md and reports/arp-hardware-review.html. Internal clock only; external MIDI Clock and step editing remain future work. Final release/test status is in reports/arp-release-verification.json. No main merge.

# Factory sound refresh checkpoint

90 intentional factory designs;83 enable varied effects, USER storage/names/numbering and approved geometry preserved. See FACTORY_SOUND_REFRESH.md, tests/preset-contrast-results.json and reports/preset-showcase.html. Includes a reproduced-and-fixed Thickness/PANIC buffer refill regression; no normal-note DSP change. Full-suite final status is recorded in the release verification report. Visual material/lighting improvements are proposals, not a new styling rollout.

## Expressive sound and mechanical controls

Latest request replaces the still-subtle macro response: Age now includes existing-stage saturation/tone wear with level compensation; Thickness now has a shared micro-detuned ensemble that changes mono audio. Velocity default is0; saved explicit USER values remain. Oscillator buttons are equal-size with stronger selected edge/icon glow; wheel ribs roll into fixed shells; black keys have visibly recessed pockets/cutaways. PLAY range heading and VOICE explanatory text are hidden/removed, with PITCH DRIFT label preserved. See EXPRESSIVE_CONTROLS.md. Rollback:rollback/pre-expressive-controls. Full suite passed; no main merge or full cabinet rollout.

## Slider/sound-range follow-up

Thickness now sits below Analog Age in VOICE. Horizontal tracks are full-height green-left fills updated by real input events; the old scheduler bypass of the refinement hook is fixed. Reverb buttons: MOD HALL / SPRING. OSC2 octaves:−1,0,+1. Buttons use rounded matte rubber faces. Age/Thickness upper ranges are stronger; see SLIDER_REFINEMENT.md for exact calibrated limits and compatibility. No extra voices/second timbre or cabinet reconstruction. Rollback:rollback/pre-slider-refinement.

## v0.5.1 targeted playable refinement

The current user brief authorises direct Analog Age, new Velocity/Thickness parameters, button/route/menu/header/EQ cleanup, actual pointer/touch/MIDI wheel repair and bringing the notched keybed into the LIVE synth. It does not authorise another broad cabinet reconstruction. Keep Prototype C unchanged and available. Rollback is rollback/pre-v0.5.1 at034e942. Read V0_5_1_REFINEMENT.md for signal flow, persistence, wheel global/owner semantics and limitations. No main merge. The new dist/GRIMISS_mAMB_v0_5_1.html and legacy v0_7 alias are byte-identical.

## Active: Analog Engine v0.5 / isolated visual prototype

The user approved parallel checkpoints. Workstream A completes Phase 1 analog DSP plus functional wheels, removal of permanent knob/fader numbers and printed key names. Workstream B is ONLY an isolated prototype in prototypes/reconstruction-c, including actual notched white-key silhouettes and seated black keys. Do not apply its materials/components/keybed to the live synth until the user approves Checkpoint B. Do not pause approved DSP work while awaiting that approval. No nonlinear filter modelling or supply sag. Preserve rollback tag rollback/pre-analog-phase1 at2fa85a5. See ANALOG_ENGINE_V0_5.md for architecture, tests and compatibility limits.

## Three-octave keyboard update

The user requested that the keyboard fill the blank areas. The on-screen bank now spans C3–C6 (MIDI 48–84): 22 white and 15 black keys, filling the 953-unit housing with uniform spacing. The existing C3–C5 pitches, typing mapping, MIDI messages, source ownership, pitch/mod wheels and octave controls retain their behaviour. The range label follows octave changes through C6. This explicitly supersedes the earlier 25-note/blank-end geometry compromise. No synthesis or effects algorithms changed. Browser regression verifies all 37 note identities, C6 pointer note-on/off, geometry and keyboard collapse at both target screen sizes.

## Current geometry checkpoint

Approved coordinate reconstruction is implemented, including equal envelope widths, expanded filter/EQ and enlarged cutoff. No DSP changes. Next priorities are user review of the actual full browser build, physical Windows/tablet/KeyLab validation, and readability at small device sizes. ARP and automation remain explicitly reserved interfaces.

# Roadmap — v0.7

## Corrective reconstruction

- [x] Browser-rendered representative component study before full rollout.
- [x] New shared cylindrical knob geometry and physical fader assemblies throughout.
- [x] Reconstructed cabinet/panel geometry and deeper integrated keyboard housing.
- [x] Real pitch/modulation wheels, spring return, octave controls and ownership tests.
- [x] Mandatory four target layouts, component close-ups and full regression suite.
- [x] User approved Prototype B component direction.
- [x] Requested screen glow, visible bezels and heavier screen-printed lettering applied throughout.
- [x] Approved full rollout with reference-style header, central patch LCD and ventilation grille.
- [ ] User review of the complete rolled-out interface.

## Superseded finish-only pass — not accepted

- [x] Reusable physical cabinet/panel/control/screen/keyboard finish layer.
- [x] Exact14-script/156-control parity with the verified v0.7 baseline.
- [x] Matched before/after and keyboard-hidden comparison screenshots; retained original accents and all controls.
- [x] Observed keyboard-border overflow fixed without shrinking controls.

## Completed v0.7

- [x] Retained v0.6 synth/effects, eight-voice architecture and dry compatibility.
- [x] Hardware-style cabinet/controls/keyboard with the existing GRIMISS palette and functional graphs.
- [x] Single-screen fit with keyboard visible or hidden; expanded controls when hidden; OSC1 4+3 waveform buttons.
- [x] SELECT PATCH:90 original factory patches,9 banks, continuously numbered; USER save/select/rename/delete.
- [x] Independent XY assignment menus with opposite-axis exclusion and patch persistence.
- [x] Automatic trusted-gesture audio activation; no mandatory Start Audio button.
- [x] Original KeyLab25 model, shared MIDI registry/map/export artifacts, explicit relative Learn modes and persistent profiles.
- [x] MIDI input/output/channel settings, controller ownership and opt-in real MIDI thru.
- [x] Capability-aware audio output selection; explicit optional audio input with zero initial gain and PANIC recovery.
- [x] Mouse wheel/Shift fine changes and draggable ADSR points backed by actual parameters.

## Next priorities

1. Complete actual authorised live-domain browser QA when the execution environment permits the Site hostname.
2. Physical KeyLab25 factory-message verification and Windows/tablet real-time audio/touch soak tests; current tests are software only.
3. Listening-led factory/effects refinement, smaller/portrait device readability and accessibility.
4. Real-time callback deadline/dropout telemetry; additional spectral and switching measurements.
5. Implement arpeggiator/sequencer and automation only with working DSP paths and regression evidence; both remain honestly marked unimplemented.

## Previous checkpoint record

# Roadmap — v0.6

## Completed this run

- [x] Exact v0.5 branch/commit baseline revalidated before edits; new v0.6 development branch.
- [x] One shared stereo effects chain, common to Worklet/fallback/offline rendering; master after effects.
- [x] Chorus/flanger, ensemble, genuine multistage phaser; independent type/rate/depth/feedback/mix/bypass.
- [x] Stereo/cross/LR delay, fractional timing edits, long memory, tempo divisions, feedback and width.
- [x] Original dispersive/saturating spring and independently modulated eight-line hall; distinct architectures.
- [x] Preallocated buffers, bounded feedback, smoothed settings, tail-preserving bypass, reverb switching and allocation-safe panic.
- [x] Real two-band EQ and pan; compatible dry defaults and original factory presets.
- [x] Named/categorised local patches, save/load/import/export and five effects demonstrations.
- [x] Reference-aligned industrial panel layout, embedded licensed typography, rotary/fader styling and actual parameter graphs.
- [x] Actual XY mappings, four-colour route curves/live trace, truthful unsupported ARP/automation panels.
- [x] Repeated2560×1344 and1024×768 screenshot/measure/correct passes, full-resolution deliverables.
- [x] New effects and combined-engine measurements, stereo/persistence/interaction tests and paired CPU timings.

## Next priorities

1. Complete authenticated live-domain browser QA if the execution environment's allow-list blocks the private Site; preserve audience and never bypass access controls. Verify the actual live URL independently from native deployment success.
2. Validate on physical Windows/tablet/MIDI/touch devices, with a longer real-time soak and AudioWorklet deadline/dropout telemetry. Current CPU figures are desktop Node timings.
3. Listening-led refinement and permitted controlled reference recordings for spring drip, hall diffusion/decay and stereo mono compatibility. Do not claim exact manufacturer emulation.
4. Expand transient/aliasing tests across notes, presets, nonlinear drive, sync and cross-modulation. Include more phase/rate combinations and extreme control movements.
5. Improve high-note triangle/sync/cross-mod alias suppression without sacrificing the v0.5 dry sound or performance.
6. Implement the arpeggiator and LFO tempo sync; keep automation recording clearly unavailable until it actually exists.
7. Expand independently generated digital waves to64 plus Vox/noise families and better hardware parameter mapping.
8. Consider scalable preset organisation and optional integration adapter only after further standalone validation. Do not modify Sound Factory yet.

Keep one timbre, eight active voices, source-scoped ownership, HOLD, four real routes, stable transitions and recoverable commits. Never merge main without explicit approval.


## Approved reference-coordinate reconstruction

Geometry approval includes the user's four amendments: equal420px filter/amp envelope widths; filter widened to510px atx468; cutoff50px versus32px adjacent knobs; EQ enlarged to256×94 atx983,y220. Cabinet uses one1280×640 reference coordinate model with uniform viewport scaling. All16sections are placed from measured reference boundaries, preserving additional working controls. Original measurements are retained separately from approved changes.

Keyboard uses measured white34×125/36pitch and black21×79frame proportions, with unchanged25-note C3–C5mapping. The active bank remains centred in the full-width housing as proposed. Keyboard collapse expands control panels and graphs without resetting audio. EQ's four controls and live overview remain visible; DETAILS presents the original nodes/full graph. Both XY pads and assignment actions remain visible, with an original-node expanded interaction view.

DSP/MIDI/FX/patch modules are unchanged. A narrowly scoped parity guard allows only logical layout constants1280×640 instead of1920×1080. Real Chromium screenshots and boundary overlays are in reports/reference-comparison.html; all four target viewport/keyboard combinations have no control/panel overflow. New reference-layout regression covers pixel coordinates, key geometry, node identity, EQ response changes and XY interaction. Physical tablet/Windows/KeyLab hardware testing remains unverified.

Transparent lettering checkpoint: all 16 sage section titles now have true background-revealing SVG cut-outs using Orbitron Black weight 900. Chromium pixel proof passed (138 backdrop-following pixels); four layout checks and existing functional/header/arp regressions passed. Audio and parameter scripts unchanged. See TRUE_KNOCKOUT_LETTERING.md.

Restored-design integration: version 14 visual components and styling, current DSP, 100 newer factory patches and working audio-clock arpeggiator. See RESTORED_ARPEGGIATOR.md and npm run test:restored. Do not reload later photo/filled-title styling.
