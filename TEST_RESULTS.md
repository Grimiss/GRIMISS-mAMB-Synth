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

Existing owner-private Site is the delivery target; no repository visibility or audience change. Native publication and actual live-domain browser verification are tracked separately. At documentation time, this execution environment rejects CONNECT to the Site's domain with403; live checks require that network allowance. Localhost Chromium checks are complete. Do not reinterpret deployment status alone as successful live audio testing.

Physical Windows/tablet/MIDI/touch tests, long real-time soak and controlled hardware listening comparisons remain unverified. `file://` is blocked by managed browser policy. L/R timing is an independent approximation; external MIDI clock delay sync is not implemented. Automation recording and arpeggiator are explicitly unavailable;64-wave bank/Vox and improved triangle/sync/cross-mod alias suppression remain future work. No main merge or Sound Factory changes.
