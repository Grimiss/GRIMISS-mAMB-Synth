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
