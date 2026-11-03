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
