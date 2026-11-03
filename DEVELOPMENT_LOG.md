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
