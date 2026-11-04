# Analog Engine v0.5 — Phase 1 / Checkpoint A

This is an engine checkpoint within the existing standalone mAMB v0.7 application. The application file/version is retained to preserve its download, storage and hosting contracts. Rollback: commit `2fa85a5bcaadd5fdb880b2d5f350b077a63e9e77`, tag `rollback/pre-analog-phase1`. Continue on `codex/controller-workflow-v0.7`; no main merge.

## Inspected baseline

The shared `createMambEngine` serves AudioWorklet, ScriptProcessor fallback and offline tests. It already generated independent random OSC1/OSC2 start phases on each voice allocation; it did not reset every note to zero. Saw/pulse use PolyBLEP correction, sine/triangle retain their existing implementations, and the original digital spectra limit harmonics below 0.45 × sample rate. The current sync reset, ring/cross paths and waveform/filter crossfades are preserved.

Eight active voices share one timbre and effects chain. POLY steals the oldest eligible voice with preference for releases; MONO uses last-note priority; UNISON stacks four detuned voices. Old voices fade for 18 ms, with total current/tail records bounded at 32. Existing drift is a voice-seeded sinusoid; vibrato uses LFO1; OSC2 and UNISON already have their own detuning. Numeric parameters use the existing 16-frame control clock and approximately 15 ms smoothing. The filter has a separate coefficient slew. Audio buffers are supplied/reused by the existing processing paths; note allocation and diagnostic snapshots allocate outside the per-sample path.

## Phase 1 changes

- Eight physical slots initialise their two phase references and independent calibration once. On release/steal, phase and the last oscillator increments are retained. Reallocation advances the parked phase analytically by elapsed engine frames, at its last running frequency. Inactive oscillators/envelopes/filters are not rendered. Audio suspension pauses the engine clock. Sync still resets OSC2 when OSC1 wraps.
- Independent deterministic random endpoints for each slot/oscillator are interpolated with cubic smoothstep over 3–8 second segments. Endpoints are hashed only at segment transitions on the existing control clock, with no new per-sample random generation or heap allocation. Random streams for calibration/drift do not disturb the legacy noise stream.
- ANALOG CHARACTER scales imperfections linearly: 25% is half the normal 50% calibration, and 100% doubles it. At 50%, drift is bounded at ±3 cents per oscillator, stable tuning at ±2 cents, cutoff calibration at ±2%, amp/filter attack and decay at ±3%, and gain at ±0.5 dB. At 100%, those bounds double. The old drift, vibrato and detune controls remain separate.
- At 0%, additional factors are exactly neutral after smoothing settles. Initial single-note and eight-note renders are sample-identical to the rollback engine. Subsequent allocations intentionally differ because physical-slot phases and character persist rather than being randomly redrawn; 0% does not disable free-running phase.
- Character is clamped to 0–100 and smoothed through existing parameter infrastructure. The temporary control is in AUDIO SETTINGS, with no new hardware panel. It participates in USER patch save/load/export, legacy patches default to zero, and MIDI Learn can target it. Factory defaults remain zero to avoid silently changing older sounds.
- CC1 and the local MOD wheel add LFO1 vibrato up to ±30 cents at full wheel and LFO1 depth. Rate/waveform/depth follow LFO1. Existing virtual patches remain additive. Pitch bend retains its ±2-semitone range. Controller state remains device/channel/source scoped. Local pitch spring return covers pointer release/cancel, capture loss, blur, hidden document and keyboard adjustment release.
- Filter memory below 1e-24 is flushed on the control clock to avoid processing subnormal decay states. Existing finite-state guards and bounded steal tails remain.
- Permanent knob/fader readouts are hidden without moving their layout boxes; bindings remain. Numeric values are available via range semantics, `aria-valuetext` and hover titles. Printed key text is removed; accessible pitch labels, note identities, mouse/touch targets, highlight, transpose and collapse remain.

No nonlinear ZDF filter model, supply sag, additional timbres, effect redesign or GUI reconstruction is included. The approved coordinate model, panel geometry, keyboard dimensions and hardware finish sources are unchanged.

## Validation and limits

`tests/analog.cjs` exercises neutral parity, phase continuity through silence, stable slot calibrations, mode changes/steals, 30-second eight-note pads at 0/25/50/100%, bounded/smooth drift, parameter smoothing, non-finite message rejection, rapid character edits with sync/ring/cross at 44.1/48/96 kHz, controller isolation and actual rendered audio differences. `tests/analog-browser.cjs` exercises the actual Worklet/control/patch/MIDI Learn path and wheel behaviour in Chromium. MIDI events in these tests are synthetic, not physical controller verification.

The static pitch-route measurement sets LFO1 depth to zero to isolate the route's exact semitone depth from the newly required built-in CC1 vibrato. A separate test verifies approximately ±30 cents of LFO1 wheel movement and nonzero audio differences.

CPU measurements in `tests/analog-results.json` are warmed, interleaved Node/Linux offline eight-voice renders, 48 kHz, 128-frame blocks: two rendered seconds per run, one discarded warm-up run and four measured runs per configuration. They compare the immediately preceding engine, not an unrelated old version. They are throughput measurements, not measured physical Windows/tablet deadlines or dropout rates. No human listening test, physical hardware test or claim of perceptual warmth has been made.

## Files

Engine/control plumbing: `src/synth.js`, `src/instrument.js`, `src/adapter.js`, `src/physical-controls.js`, `src/interface.js`, `src/interface.html`, `src/workflow.js`, `src/control-cleanup.css`. Build/registry: `tools/build.cjs`, `tools/midi-targets.cjs`, generated `src/midi-targets.json`, shared KeyLab map and standalone HTML/manifest. Tests: analog offline/browser tests, preserved pre-analog engine/contract fixtures, updated authorised-change guard and isolated route measurement. The original control contracts remain guarded.

Checkpoint B is an isolated visual prototype in `prototypes/reconstruction-c`, not a replacement GUI. Its keybed introduces notched white silhouettes and seated black keys for review. Full visual rollout and Checkpoint C require prototype approval.

## Measured CPU comparison

All figures are offline engine throughput, measured on this execution machine. Each run renders two seconds of eight-voice audio. Run-to-run scheduling/JIT variance means costs need not increase monotonically with Character.

| Configuration | Median render ms | Change versus rollback | Render / realtime |
| --- | ---: | ---: | ---: |
| rollback | 227.41 | +0.0% | 11.37% |
| new-0 | 261.94 | +15.2% | 13.10% |
| new-25 | 273.41 | +20.2% | 13.67% |
| new-50 | 254.28 | +11.8% | 12.71% |
| new-100 | 269.25 | +18.4% | 13.46% |

The new configurations took approximately12–20% more render time in the final interleaved measurement, occupying about13–14% of rendered realtime. This is a measured cost, not a claim of physical-device headroom or dropout-free operation.
