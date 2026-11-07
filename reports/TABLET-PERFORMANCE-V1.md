# mikroSEQ tablet performance pass

Development remains on `codex/controller-workflow-v0.7`. `checkpoint/pre-tablet-performance-v1` preserves the complete version-39 source and standalone build. This pass keeps the single engine, voices, waveforms, filter algorithms, effects networks, gesture range/count, MIDI, SEQ and arp.

## Changes

- Synth and FX derived coefficients use dependency bits. A moving parameter invalidates only the calculations it affects. Smoothing formulas and their original 16-sample timing remain unchanged.
- Shared per-voice parameter conversions are evaluated once on the existing control clock using the same arithmetic, instead of repeating the conversions for every voice/sample.
- The moving-parameter dependency mask is maintained when list membership changes, avoiding extra per-sample property searches.
- Gesture processing uses an active surface list, cached destination bindings, cached base normalization, reuse of unchanged/clamped normalized outputs, and a reusable affected-key list. Only affected or releasing destinations are evaluated. Native DSP setters receive changed destination keys.
- Paused gestures retain their modulation values and phase without continuously subdividing the audio stream. Manual/base changes correctly reapply the held contribution; release retains the original safety smoothing.
- Active gestures, including ultra-slow ones, retain the original 64-sample control cadence. No reduction in modulation timing resolution or interpolation quality is introduced.
- Routine audio snapshots omit unchanged SEQ configuration and oscillator calibration. The UI retains these immutable pieces from full snapshots, refreshed when SEQ configuration changes. Full diagnostic snapshots remain available. Snapshot polling coalesces pending requests.
- Regular sound polling no longer clones the full SEQ/Song configuration. The existing dedicated SEQ configuration messages remain authoritative; startup still receives the complete initial state.
- Keyboard highlighting reuses a note mask and cached elements and changes classes only when needed.
- MIDI canvases retain their backing buffers when dimensions are unchanged. Static frames are reused while stopped; the numeric position readout remains current. Editing, scrolling and resizing force a redraw.
- Gesture paths and markers only write changed SVG attributes. Hidden overlays avoid repeated DOM work. Identical native scope graphics are retained instead of replacing their SVG children. Step note labels update only when their text changes.

No sample rate, polyphony, sound quality, latency policy, effect capability, gesture count or patch format change is made. No patches or user libraries are erased. AudioWorklet and ScriptProcessor fallback remain supported. The visual layout and keyboard/SEQ flip are unchanged.

## Verification

`tests/performance-audio.cjs` compares the optimised renderer directly with saved version-39 source fixtures. It checks no gestures, a filter gesture, an effect gesture, all 16 gestures and held gestures at 44.1/48 kHz, including complete sound-parameter updates while gesture contributions are held. Results are recorded in `tests/performance-audio-results.json`.

`tests/performance-core.cjs` verifies the held-pose idle path, reapplication after complete parameter updates, changed base controls, release smoothing and affected-key reporting.

`tests/performance-benchmark.cjs` launches separate Node/V8 processes for each comparison to avoid shared call-site/JIT effects. Each result is the median of three runs with eight held voices and all effects. Server timings are not tablet timings. Earlier mixed-factory measurements were unsuitable for judging the real-time improvement and are not release evidence. Final measurements are in `tests/performance-benchmark-results.json`.

The coefficient counter specifically checks changing MOD FX depth with unchanged EQ/reverb settings. Audio correctness and browser interaction regressions are required alongside speed measurements.

## Limits

The user's Samsung S6 Lite/Edge has not been profiled directly. This release cannot prove that every hardware dropout is resolved. Browser fallback scheduling, operating-system power management and other application load can still cause missed deadlines. The Audio Settings panel reports the active backend. No automatic quality reduction or silent feature disabling is used.

## Measured results

Eight voices, all effects, 48 kHz; medians of three isolated runs. These are development-server measurements.

| Scenario | Previous render time (8 sec audio) | Optimised | Reduction |
| --- | --- | --- | --- |
| none | 1256 ms | 1231 ms | 2% |
| one slow | 1415 ms | 1235 ms | 12.7% |
| all slow | 1698 ms | 1515 ms | 10.8% |
| all normal | 1698 ms | 1620 ms | 4.6% |
| all paused | 1247 ms | 1162 ms | 6.9% |

Changing MOD FX depth alone: unrelated EQ calculations fell from 6000 per second to zero, and unrelated reverb coefficient-group calculations from 3000 to zero. The measured snapshot shrank from 16000 to 7247 JSON bytes (approximately 55% smaller).

Audio comparisons reported **zero sample difference** for all 100 factory patches and the 44.1/48 kHz gesture scenarios, including parameter updates, all gesture pause/resume, effect-type changes, bypass/re-enable and destination reassignment. All 16 gesture surfaces still pass Worklet/fallback browser testing. The 60-second combined MIDI/SEQ/arp/gesture render remains finite and bounded with Panic cleanup. Runtime timings from that stress test are correctness evidence only because other browser tests ran concurrently.

Executed: build; performance audio/core/browser/isolated benchmark; gesture core/audio/browser; MIDI core/browser; sequencer browser; workflow (11 groups); persistence core/browser; pause regression; diff whitespace check. Existing patch compatibility, keyboard flip, touch, ADSR, XY and MIDI-controller behaviour pass.

Modified source files: `src/synth.js`, `src/effects.js`, `src/gesture-core.js`, `src/instrument.js`, `src/adapter.js`, `src/sequencer.js`, `src/sequencer-ui.js`, `src/interface.js`, `src/gesture-ui.js`, `src/midi-editor.js`, plus generated standalone builds and performance tests/fixtures. No patch format or storage migration is required.

The final browser test also recreates the AudioContext and verifies stale in-flight telemetry flags are cleared. Raw Worklet payloads are measured before the UI reconstructs cached static fields; the reconstructed UI state remains complete. Final acceptance reported no browser page errors.
