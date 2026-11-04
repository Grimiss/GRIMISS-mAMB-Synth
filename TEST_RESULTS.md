## Expressive sound and mechanical controls

Latest request replaces the still-subtle macro response: Age now includes existing-stage saturation/tone wear with level compensation; Thickness now has a shared micro-detuned ensemble that changes mono audio. Velocity default is0; saved explicit USER values remain. Oscillator buttons are equal-size with stronger selected edge/icon glow; wheel ribs roll into fixed shells; black keys have visibly recessed pockets/cutaways. PLAY range heading and VOICE explanatory text are hidden/removed, with PITCH DRIFT label preserved. See EXPRESSIVE_CONTROLS.md. Rollback:rollback/pre-expressive-controls. Full suite passed; no main merge or full cabinet rollout.

Complete slider/sound follow-up suite: `npm run test:all` PASS, including actual input-driven green fills and refreshed button/link states. The LINK visual assertion now waits for the scheduled animation frame instead of assuming synchronous repaint. All four target layouts have no overflow. Additional drift measured approximately0/1.491/4.218/11.931cents at Age0/25/50/100. Human listening remains unverified; rendered A/B examples are provided.

## Slider/sound-range follow-up

Thickness now sits below Analog Age in VOICE. Horizontal tracks are full-height green-left fills updated by real input events; the old scheduler bypass of the refinement hook is fixed. Reverb buttons: MOD HALL / SPRING. OSC2 octaves:−1,0,+1. Buttons use rounded matte rubber faces. Age/Thickness upper ranges are stronger; see SLIDER_REFINEMENT.md for exact calibrated limits and compatibility. No extra voices/second timbre or cabinet reconstruction. Rollback:rollback/pre-slider-refinement.

## v0.5.1 — completed targeted refinement

`npm run test:all` PASS on the assembled build, including new refinement DSP/UI and six wheel browser groups. Additional actual-picker keyboard/contrast and non-default USER save/reload checks passed. Old browser checks now operate the replacement buttons instead of hidden backing selects/checkboxes; no synthesis acceptance criteria were relaxed. The velocity amplitude test checks the exact power-law state and allows the existing master soft-limiter's measured effect on output ratios.

All four target1920×1080/1600×900 visible/hidden captures have no panel/control overflow. Header hit rectangles are disjoint. The actual opened picker is dark green with readable light text and green selection. Thirty clipped white-key notch regions reject white-key hits;37notes remain mapped. EQ sliders change real DSP Hz/response; Thickness does not alter the EQ graph.

See V0_5_1_REFINEMENT.md and tests/refinement-dsp-results.json for exact sound/CPU findings. Eight-voice offline overhead versus immediate v0.5 is approximately6–7%; UNISON is within timing variation. No physical MIDI, tablet/Windows/Edge, human listening or live-domain browser claim is made.

## Analog Engine v0.5 — Checkpoint A

Complete `npm run test:all` PASS, including analog offline/browser tests. The first attempt exposed the old static pitch-route test's assumption that CC1 had no intrinsic vibrato; LFO1 depth is now zero for that isolated depth test, and separate tests verify the required wheel vibrato. No acceptance threshold was relaxed.

At0% the initial single-note/eight-note outputs match the rollback engine exactly. Thirty-second eight-note pads at0/25/50/100% are finite, bounded and nonzero. Maximum additional oscillator drift measured0/1.4913/2.9827/5.9654cents, with maximum changes per10ms0/.0112/.0223/.0447cents. Measured MOD-wheel vibrato reaches approximately±29.999cents; pitch-bend/source isolation and spring return pass. Worklet patch persistence, legacy-zero default and MIDI Learn pass; all MIDI messages in tests are synthetic.

Both target resolutions, keyboard visible/hidden, have no control/panel overflow. The approved geometry source files remain unchanged. Permanent range readouts and printed key text are removed as requested, preserving bindings and accessible values/note labels. No human listening, physical controller/Windows/tablet or production-domain browser QA claim is made.

See ANALOG_ENGINE_V0_5.md and tests/analog-results.json for method, CPU findings and limitations.

## Three-octave keyboard update

The user requested that the keyboard fill the blank areas. The on-screen bank now spans C3–C6 (MIDI 48–84): 22 white and 15 black keys, filling the 953-unit housing with uniform spacing. The existing C3–C5 pitches, typing mapping, MIDI messages, source ownership, pitch/mod wheels and octave controls retain their behaviour. The range label follows octave changes through C6. This explicitly supersedes the earlier 25-note/blank-end geometry compromise. No synthesis or effects algorithms changed. Browser regression verifies all 37 note identities, C6 pointer note-on/off, geometry and keyboard collapse at both target screen sizes.

# Approved hardware / screen-printed edition

Complete `npm run test:all`: **PASS, exit0**. Final current-header tests and target-layout recaptures also pass. Original14functional scripts and156control definitions retain parity; no DSP change.

New tests/hardware-header.cjs proves catalogue-order next/previous/wrap, actual LCD number/name, USER display after a custom import, audio pilot tied to real context activation, preserved patch modal, approved component coverage on all50rotaries, visible4px display bezels, screen glow and700-weight printed lettering across labels/values/menus/buttons/status. The full suite additionally covers Worklet/fallback, note ownership/HOLD, effects/routes, envelopes/XY, patch/MIDI workflows, wheels/octave ownership, touch simulation,90factory renders and mocked devices.

Fresh actual browser captures at1920×1080 and1600×900 in both keyboard modes show no controls outside panels or panel overflow. Labels and all other lettering are heavier; the cabinet remains near-black and illumination is confined to screens/controls. Approved Prototype B was refined and recaptured with the same printed treatment.

Exact published HTML SHA256:356142135a5da0538a6040e5bd8b8a8a0cce441881860f3cd8d19ce210e009a5. Native private deployment succeeded. Fresh actual live-host browser QA remains blocked by the configured proxy before page load; this is not reported as a live audio pass. Physical KeyLab25/Windows/tablet testing remains unverified. ARP/automation remain labelled unimplemented.

## Earlier checkpoint evidence

# Corrective physical reconstruction validation — 2026-11-03

The previous finish-only design was not accepted. This rebuild was validated in stages: browser-rendered component study first, then new components throughout, then cabinet/keybed/layout and interaction regressions.

**Complete npm run test:all: PASS, exit0.** Added physical controls tests also pass with real mouse spring-return operation. Every rotary uses the new physical component and all three mixer faders use separate physical caps. Four required1920×1080/1600×900 visible/hidden layouts have no out-of-panel controls or clipped panel content; six layout modes and emulated touch pass in the full UI suite. Real component close-ups and the stage prototype are in reports/rebuild-comparison.html.

All14original functional scripts and156original control attributes retain exact parity with the verified v0.7 baseline. One new UI module/four new performance widgets reuse existing APIs. The engine/effects DSP remains unchanged. Pitch/mod values reach actual voices, pitch returns on mouse release, octave changes release local owners, note-off/highlights follow transpose, MIDI notes retain their own pitch, hidden keybed preserves MIDI, and PANIC resets wheels. Tests/physical-controls-results.json records coverage.

Existing oscillator/filter/envelope/effects/routes/patch/XY/MIDI/HOLD tests pass, including11workflow groups,25registry groups,90factory numerical renders, extended polyphony, Worklet/fallback and mocked device/capture handling. Iterations corrected actual label/note clipping and delay switch accessibility; no test geometry checks were weakened.

Published HTML SHA256:8b59890bc4384f0535bf7cddc670907bca28c645b3838c92a1749e25a853896a. Native private deployment succeeded. Fresh actual live-domain browser verification remains proxy-blocked before the page loads. Physical MIDI/Windows/tablet tests remain unverified; ARP/automation stay visibly unimplemented. Visual acceptance is left to the user, with full screenshots and close-ups supplied.

## Superseded finish-only checkpoint results

# Hardware-realism pass validation — 2026-11-03

**Complete `npm run test:all`: PASS, exit0**, after correcting decorative keyboard-border overflow. All14 functional scripts and156 control tags are identical to the verified2531bed baseline; DSP/MIDI/patch/layout/ownership logic is unchanged. tests/hardware-results.json records this guard.

Both audio backends pass; keyboard visible/hidden layouts fit1920×1080,1600×900 and1280×800 without main-page scrolling. All seven OSC1 choices, displays, graph enlargement, retained context/notes/HOLD and emulated touch pass. Eleven workflow groups cover actual envelopes, wheel/fine adjustment, patch/XY persistence and MIDI Learn. All25registry groups,90factory numerical renders, mocked device/capture cancellation checks and all prior DSP/effects/measurement/stability tests pass. Console errors: none.

The first visual run caught an overflow from thicker decorative keyboard borders; original dimensions were restored, retaining depth through shadows. A pre-existing fixed35ms waveform redraw assertion was replaced by waiting for rendered selected state. No functional script was edited to resolve either issue.

Matched baseline/current screenshots and comparison: reports/hardware-{before,visible,hidden}.png and reports/hardware-comparison.html. Detailed mockup comparison: HARDWARE_VISUAL_PASS.md. Current HTML SHA256: a6ae1741e7ea650269b0cbfda42cafbf680b37f9dfb1b2eb5cab5f4cca80c84d.

Private publication succeeded. Actual live-domain browser navigation was retried after publication and remains proxy-blocked before reaching the page. Physical KeyLab25/Windows/tablet operation is unverified; ARP/automation remain unimplemented. These limits are separate from the passing local software checks.

## Previous v0.7 checkpoint results

# v0.7 validation — 2026-11-03

Build: `npm run build`; canonical historical HTML is byte-identical to `dist/GRIMISS_mAMB_v0_7.html`. Manifest records the SHA256. Baseline v0.6 was revalidated before changes; retained reports are in work/v07 when workspace retained. src/synth.js and src/effects.js are unchanged from v0.6.

**Final complete run: PASS (exit0).** The ADSR browser test now samples a visible point atomically across SVG redraws rather than racing a detached locator.

Regression commands are consolidated in `npm run test:all`: baseline, diagnostics, audio, ownership/modulation, measurements, effects, combined instrument, performance, browser, UI, MIDI registry, workflow, all factory patches and mocked devices. Machine-readable results live in tests/*-results.json. Node/Chromium run on Linux; timings are offline measurements, not physical Windows/tablet verification.

- Existing DSP:10 audio,16 ownership/modulation, measurements (tuning, filter slopes, harmonic/aliasing, envelope timing, switching,120-second polyphony),16 effects and combined engine checks. Dry compatibility is retained; optional stereo input is silent by default, ramps gain and stops on PANIC.
- MIDI registry:25groups, scoped Learn/replacement, explicit relative modes, native paths, versioned storage/import validation, reset/defaults and truthful synthetic activity. Unknown KeyLab factory encoders remain unassigned.
- Browser ownership/audio: Worklet and ScriptProcessor fallback, startup race, note ownership/sustain/disconnect/multitouch simulation, HOLD/priority/highlights, LFO/routes, audible output and PANIC silence. Managed Chromium blocks file:// navigation; standalone bundle has no external runtime dependencies but actual file-origin playback remains unverified here.
- Interface: keyboard visible/hidden at1920×1080,1600×900,1280×800; page/panel containment, all seven oscillator button centers and nonoverlap, dropdown/preview synchronization, real graph/control changes, retained context/processor/patch/HOLD/notes and audio, persisted visibility and exact HTML download. Emulated1280touch waveform/key/XY/toggle passes. Screenshots: reports/mamb-v07-*.png.
- Workflow:11groups using default Chromium autoplay policy (no permissive autoplay flag): first real typing key starts audible audio;90 factory patches/9×10/continuous numbering; XY exclusion and actual parameters; USER save/reload/rename/delete; separate MIDI profile and map/header Learn; normal/fine wheel/faders; real ADSR attack/sustain/release edits; settings/reset confirmation. No JavaScript console errors.
- Factory DSP: all90 browser-resolved patches render1.5013seconds each with finite, bounded, nonzero stereo output. This is a numerical smoke test, not a listening-quality endorsement.
- Mocked devices: input/channel selection, ownership release when changing selection, synthetic events never sent to hardware output, no unsolicited capture, late permission stream stopped after cancellation. No real hardware I/O claim.

A touch test caught a legacy tablet min-height220px rule clipping the keyboard panel; explicitly resetting its minimum height fixed the cause. Added panel-to-main containment checks so it cannot silently recur. The corrected layout and touch checks pass.

Current paired offline benchmark:2seconds/48kHz/eight voices/128-frame blocks: v0.5 dry231.83ms, current bypass269.98ms, current all effects604.47ms median. Historical scenario names in the report sayv0.6 because the shared DSP is retained. These measurements do not establish real-device callback deadlines.

Known limits: original KeyLab25 physical message inventory/relative configuration and Windows/tablet audio deadlines need hardware tests. MIDI-only events cannot bypass browser autoplay rules. Per-app output selection and Web MIDI depend on browser support/permissions; system output remains the truthful fallback. Smaller portrait screens are scaled and may need future readability/accessibility work. ARP/automation remain unimplemented. Actual hosted-domain browser QA is separately recorded in HOSTING.md/reports/live-verification.json; native deployment success is not a live-audio pass.

## Earlier checkpoint evidence

# Test results — v0.6 — 2026-11-03

## Complete suite

Final `npm run test:all`: **PASS** on the assembled v0.6 HTML. Counts: **10 legacy audio +16 ownership/modulation +16 effects +4 integrated-instrument groups =46 DSP groups**, plus tuning/filter/spectrum/envelope/discontinuity measurements, paired CPU checks, preserved browser regressions and new stereo/patch/interaction/layout checks. Both AudioWorklet and ScriptProcessor fallback pass without page JavaScript errors. Byte-identical standalone download is tested.

Before edits, the exact v0.5 `4972cf3` baseline passed the same26 pre-effects DSP groups, measurements and both available browser backends. Fresh old-fixture comparison was 47.5% less render time than v0.4, versus44.4% reported previously; timing varies with runtime/load. Controlled neutral output remained sample-identical. See tests/v05-revalidation.json and archived v0.5 source.

## Effects evidence

- Exact dry stereo bypass and zero-mix passthrough at44.1/48/96kHz; actual post-effect master, pan and EQ changes.
- All three modulation algorithms produce stereo movement. Rate/depth/feedback change output. Six-stage phaser measurement produces genuine cancellations (minimum magnitude 0.000507, maximum 0.997144 in the tested response).
- Delay impulse timing asserts100ms stereo,150ms right L/R and250ms tempo-synchronised eighth-note at120BPM across three sample rates. Cross-feedback alternates echoes; width narrows stereo. Fractional read changes and bypass tails pass.
- Spring: first wet response 29.0ms, 13007 nonzero samples in the initial300ms test, correlation 0.840, mono/left RMS ratio 0.974. Dwell changes normalized shape, and feedback Tone changes high-frequency decay.
- Hall: first wet response 31.1ms, correlation -0.007, mono/left ratio 0.700. Modulation and longer requested Decay measurably change output/decay. A truncated Schroeder estimate is diagnostic only, not an exact RT60 or hardware match.
- Reverb switching retires the old network; bypass keeps tails. Panic fades then resets ages and recovers. High-feedback stress passes finite/bounded assertions at44.1/48/96kHz.
- Measured preallocated effects buffers: approximately1.79MB@48kHz and3.58MB@96kHz, once per instrument rather than per voice.

Raw effects data: tests/effects-results.json. Original design: src/effects-notes.md. Measured stereo decay figure: reports/effects-decay.svg. No reference hardware audio obtained or compared.

## Combined synth and performance

v0.5 dry-patch compatibility through the stereo wrapper is within1e-6 at44.1/48/96kHz. Eight voices with effects retain stereo tails after every synth voice has released; panic subsequently gives numerical silence and recovery. A30-second eight-voice all-effects stress render changes algorithms/feedback-related settings while remaining finite, bounded and non-silent. Legacy60-second chord and120-second modulated synth tests also pass.

Linux Node,48kHz,128-frame callbacks, eight voices,2s per trial, warm-up plus three measured runs:

| Scenario | Median ms | Render time / audio duration |
| --- | ---: | ---: |
| v0.5 dry | 237.4 | 0.119 |
| v0.6 bypass | 254.4 | 0.127 |
| v0.6 all effects | 511.5 | 0.256 |

Bypassed stereo wrapper overhead: 7.1% in this run. All-effects cost includes ensemble, stereo delay and eight-line hall, giving a clear sonic reason for the extra work. No claim of physical tablet CPU, browser deadline safety or zero dropouts follows from an offline benchmark. Full trials: tests/instrument-results.json. The unchanged voice-rendering core retains its earlier paired comparison/null checks.

## Browser, persistence and visuals

Both backends pass preserved note ownership, sustain, MIDI disconnect injection, two pointers, HOLD, priority, routes, stealing highlights, startup/lift race and panic checks. Added regression queues note/controller messages arriving during asynchronous Worklet startup so they are not lost.

New UI checks measure actual stereo audio with effects, exercise every algorithm, internal tempo sync, rotary drag and XY mappings; save/reload/export retains physical-unit effect settings. Legacy import resets missing effects to dry; future patch versions are rejected. HTML BUILD download bytes equal the tested canonical build. Tests inject MIDI/pointers and are not physical-device validation.

Screenshot comparison was iterated: initial clipping and missing control diagnosed, compact geometry corrected, row origins aligned, then real connection curves layered visibly above backgrounds. At2560×1344, compared reference row origins90/418/747/1013px match; maximum named-panel x-origin delta 10.25px and width delta 17.91px. This is measured panel similarity, not a pixel-perfect or perceptual fidelity score. Full screenshot: reports/mamb-v06-desktop.png; tablet: reports/mamb-v06-tablet.png. At1024×768 there is no horizontal overflow; all panels remain reachable by vertical scrolling. Added reverb/keyboard row intentionally increases full-page height. Detailed data: tests/ui-results.json and reports/visual-comparison.json.

## Delivery and remaining limits

Build: dist/GRIMISS_mAMB_v0_6.html, 505,800 bytes. SHA-256 `a3df24a3de262ac774a2a60aee8a62b5de808b2d66bbed35a28d3341eb64c517`. Embedded source modules/fonts/licenses; no runtime external asset dependency. Canonical HTML matches distribution exactly.

Native owner-private publication completed successfully: deployment `appgdep_6ae9bbebfb148191a622db693cdb5b11`, exact artifact hash shown above. No repository visibility or audience change. Actual live-domain browser verification was attempted after publication and remains BLOCKED: CONNECT403 / ERR_TUNNEL_CONNECTION_FAILED. Sandbox network access was granted, but the independent Cloud Environment HTTP host policy still rejects this domain. Localhost Chromium checks are complete; native deployment success is not treated as a live audio test. See HOSTING.md and reports/live-verification.json for the exact remaining allow-list step.

Physical Windows/tablet/MIDI/touch tests, long real-time soak and controlled hardware listening comparisons remain unverified. `file://` is blocked by managed browser policy. L/R timing is an independent approximation; external MIDI clock delay sync is not implemented. Automation recording and arpeggiator are explicitly unavailable;64-wave bank/Vox and improved triangle/sync/cross-mod alias suppression remain future work. No main merge or Sound Factory changes.

## Approved reference geometry — 2026-11-04

The complete `npm run test:all` suite passes, including the new `tests/reference-layout.cjs` regression. Real Chromium checks verify all 16 panel bounds at 1920 × 1080 and 1600 × 900, with the keyboard both visible and hidden. The filter and amp envelopes have equal widths; the filter and EQ occupy the approved expanded rectangles, and cutoff is more than 1.5 times the width of adjacent knobs. Layout capture reports no panel overflow or controls outside panel bounds in those four cases.

All 25 original keyboard notes and their MIDI identities remain, with measured white/black key proportions. The new EQ and XY detail views reuse the same functional nodes and preserve edits when closed. EQ response changes and XY pointer interaction pass, with no duplicate IDs or browser errors. Existing audio, effects, ownership, measurements, modulation, factory, MIDI, workflow, performance-wheel and screen-print tests pass. The parity check retains all 156 original control contracts and 13 unchanged legacy functional scripts; the remaining legacy layout script differs only in the approved logical dimensions.

Screenshots and equal-scale original/implemented boundary overlays: `reports/reference-comparison.html`. Original measured boundaries remain historical; amber marks intentional user-approved envelope/filter/EQ differences. Deployment success verifies publication, while live-domain browser QA remains limited by the execution environment's configured proxy. Physical Windows, tablet and KeyLab testing remains unverified.

The final repeat exposed a test startup race in physical-controls.cjs: the first engine-state message can precede its voices list. The wait predicate now tolerates that initial missing list while retaining all voice, bend, wheel and release assertions. The affected test and remaining browser tests passed on rerun; the complete suite was repeated after that correction.

Three-octave checkpoint: `npm run test:all` completed successfully. Layout capture found no overflow in all four target size/keyboard-mode combinations. New top C6 pointer note-on/off passed.
