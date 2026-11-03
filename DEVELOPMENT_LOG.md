# Development log

## 2026-11-03 — v0.4 stability checkpoint

Inspected original HTML and the supplied CONNECT screenshot before editing. Baseline commit: `433c2ab`. Created branch `codex/audio-stability-v0.4`; no merge or remote push.

Audited ScriptProcessor, filter equations, voice allocation, HOLD, presets and MIDI. Reproducible original-source baseline is archived in tests/fixtures. Original produces finite/nonzero audio in offline baseline rendering. This does not prove the previous hardware/browser crackling reports were reproduced.

Preserved and extracted the existing oscillators, envelope and mixer DSP into a DOM-independent factory embedded in the same HTML. Added AudioWorklet with Blob module cleanup, shared fallback and startup concurrency guard. Added 15 ms numeric parameter smoothing; retained 18 ms steal/panic fades and energy-based gain staging. Bounded simultaneous retiring voices to 32 to prevent unbounded event bursts; extreme bursts can truncate old fading tails.

Corrected double damping in TPT SVF; added cascaded LPF24 alongside LPF12/BPF12/HPF12, key tracking and OSC2 semitone tuning. Preserved cutoff smoothing and safe cutoff limits. Added deterministic random generator for repeatable offline tests. LPF24 is a cascade, not a measured Korg model.

Added actual four-voice detuned UNISON and MONO with last-note fallback. Repeated notes retrigger with fade; eight active voice limit remains. HOLD is now handled inside the engine, with sustain beyond six-second tests and grouped replacement. Existing five presets now reset complete control defaults before applying preserved overrides.

MIDI handles velocity, pitch bend (±2 semitones), sustain, CC120/123, newly connected inputs and disconnect panic. Browser tests inject MIDI handler messages; no physical MIDI device was available. All channels currently share a single input state.

Validation: 10 DSP groups pass; Chromium localhost AudioWorklet and forced fallback both produce finite/nonzero measured audio and pass control checks. 60-second eight-note numerical stress passes. File URLs blocked by managed browser policy. See TEST_RESULTS.md for measured values and limits.

Reference research: Korg URL request failed at configured proxy connection. No reference recordings obtained or analysed. Original three digital spectra remain unmeasured approximations. No listening equivalence or aliasing-quality claim.

## 2026-11-03 — v0.5 performance, ownership and modulation

Started on exact v0.4 `a0131ea527fada670ad9bfc13b2aa5336e9480d3`; read all checkpoint docs, HTML/tests and supplied screenshot. All four requested baseline commands passed before edits. Created `codex/performance-modulation-v0.5` from that commit. Main and Sound Factory remain untouched.

Profiled v0.4: sample/render dominate CPU; GC is visible. Reused envelope-settings object, digital spectra and per-voice modulation buffers; cached derived constants; replaced full per-sample numeric smoothing with moving-control smoothing on a 16-frame cadence. Maintained sample-rate envelopes/oscillators/filter/LFO/routing, safe cutoff bounds, 18 ms steal/panic fades, gain staging and a 32-total-voice burst bound. No new render-sample objects are constructed. Snapshot allocation is intentionally outside the sample loop. Paired Node benchmark: 534.3 → 290.6 ms per two seconds of eight-voice rendering (45.6% less); neutral patch comparison is sample-identical across 24,000 frames. No physical tablet or real-time deadline claim.

Replaced global note gates with source-owned records (device/channel, pointer, typing key). Pedals, bend and wheel are source scoped; repeats retrigger their latest owner and unmatched offs are harmless. CC123 releases one source; CC120 fades it; disconnect preserves unrelated notes. Fixed asynchronous touch release before startup, source-aware blur, HOLD/stealing highlights and MONO/UNISON priority after pedal-up/disconnect. Live voice-mode changes rebuild gated voices safely. Keyboard highlights come from engine snapshots, not optimistic UI note lists.

Added 8 ms oscillator/filter crossfades, keeping both filter stages warm. Added independent LFO2 (0.005–8.005 Hz), selectable shapes/depth on both LFOs, phase-continuous rate edits and independent seeded sample-and-hold. Added four signed/enableable routes with eight sources and six actual DSP destinations. Routes sum with bounded gain/cutoff/pulse/noise; depth/bypass slew approximately 15 ms. Original five preset overrides remain intact and reset new settings/routes to neutral defaults. No decorative redesign.

Added source/priority/routing tests, expected pitch-depth checks, tuning/envelope/filter-slope measurements, whole-voice harmonic reports, primitive FFT alias analysis, limited switching discontinuity comparisons and 120-second four-route polyphonic stress. Full `npm run test:all` passed: 10 legacy + 15 ownership/modulation groups, all measurements, paired benchmark and two browser backends. Browser audio is measured, including actual route mute/restore and panic silence. File URLs blocked by policy; no physical MIDI/tablet used. Deterministic original baseline assertions were strengthened.

Built `dist/GRIMISS_mAMB_v0_5.html` byte-identically from canonical HTML with a SHA-256 manifest. Updated roadmap, test report, API/use documentation and continuation instructions. Source/destination rewiring at nonzero route intensity remains a transient risk and is the first next priority. Other limits: aliasing under nonlinear/sync/cross modulation, physical-device validation, longer real-time soak, effects/patch management/64 waves/arpeggiator. No reference audio acquired or analysed and no claim of exact microKORG emulation.

### Follow-up — route reassignment smoothing

Saved the verified v0.5 core as commit `02d5503`, then resolved its remaining live-rewiring transient. Each route now has preallocated sparse source/destination taps; previous connections fade out while new ones fade in, including rapid successive edits. Only active taps are processed per sample; snapshots expose configuration without copying the connection matrix. Added a regression for route continuity, settled gain and rapid rewiring.

Rebuilt the 39,838-byte standalone HTML and reran the complete suite successfully: 10 legacy + 16 ownership/modulation groups, all measurements, performance/null comparison and both browser backends. Latest paired medians: 531.8 ms v0.4, 295.9 ms v0.5 (44.4% less render time); neutral patch remains sample-identical. Source/destination reassignment is no longer an open defect from the initial core checkpoint. Next priorities are broader transient/whole-chain alias measurements, actual device/deadline validation and staged stereo effects.

## 2026-11-03 — v0.6 integrated effects and CONNECT interface checkpoint

Verified exact start `4972cf3612cbab5451caed2f3cd1f425ae3287cd`, read all continuation/design/test sources and directly inspected the supplied screenshot. All 26 existing DSP groups, measurements, performance comparison and both browser backends revalidated before edits. Created `codex/effects-interface-v0.6` from v0.5; preserved that branch and GitHub main.

Developed DSP and interface in parallel, then integrated and tested them together. Extracted the existing voice engine into `src/synth.js` without changing its rendering algorithm; added velocity telemetry for the accurate live routing trace. A DOM-independent `createMambInstrument` wraps the existing mono engine and one shared stereo effects network; both Worklet and ScriptProcessor now request two output channels. Master gain follows the effects chain. Dry output matches v0.5 within 1e-6 at44.1/48/96kHz.

Implemented original chorus/flanger, multi-path ensemble, six-stage allpass phaser, stereo/cross/LR delay, six-dispersion-stage spring with three coupled damped paths and compensated Dwell saturation, and eight-line modulated Householder hall with Hermite reads and decay-derived feedback. Added two-band shelving EQ and pan. All buffers preallocated, moving settings smoothed, bypass tails preserved, algorithm switching faded, and panic resets delay ages rather than filling large buffers. Detailed independent design notes in `src/effects-notes.md`; no proprietary code/ROM/impulses or reference recording used.

Recreated the reference layout with an approximately211px patch sidebar, six upper panels, reference-aligned lower sections, fine green graph grids, circular controls, rectangular mixer caps, four actual colored routes and real XY mappings. Embedded openly licensed Orbitron and Open Sans with full notices. Added a coherent lower reverb/performance row; ARP and automation panels explicitly say NOT IMPLEMENTED. Repeated screenshot/measure/fix cycles corrected clipping, a missing ring control and row offsets. Final measured reference row origins90/418/747/1013px match; maximum checked x delta10.25px, width delta17.91px. 2560px desktop and1024px tablet have no horizontal overflow and all panels remain accessible.

Added version2 local patch save/load/category/name/JSON import/export; legacy patches receive dry effect defaults and safe numeric/enum handling. Preserved all five factory parameter maps and added five effect demonstrations. Modulated Atmosphere includes four genuine enabled routes. Tested persistence through reload, exported effect settings, old-patch import and future-version rejection.

Complete `npm run test:all` passed on the assembled standalone build: 10 legacy +16 ownership/modulation +16 effects +4 combined-instrument groups, measurements, paired benchmarks, both legacy browser backends and new stereo/persistence/knob/XY/layout tests. Effects buffers:1.79MB@48kHz; 8s high-feedback stress at three sample rates stays bounded. Combined30s eight-voice all-effects stress plus legacy120s stress passes. Isolated medians per2s of eight voices: v0.5 dry245.77ms, v0.6 bypass257.86ms, all-effects547.66ms. These are Node measurements, not real-time deadline or physical tablet claims.

Remaining this run: make route-line stacking visibly overlay row backgrounds, regenerate final screenshots, update checkpoint docs and publish the verified build. Existing authorised Site remains owner-private. GitHub repository metadata confirms private; no visibility/audience change. Direct HTTPS attempt to the existing Site was blocked by environment CONNECT policy403, so actual live-browser playback verification may require a network allow-list grant. Native deployment confirmation will be reported separately from browser verification.
