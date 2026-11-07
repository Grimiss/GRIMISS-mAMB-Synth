# mikroSEQ — synth and SEQ-16 efficiency, second pass

Development stays on `codex/controller-workflow-v0.7`. Baseline: `f0a4d72`; local
rollback tag: `checkpoint/pre-engine-efficiency-2026-11-07`. The previous hosted
release is Site version 40, source `f51a48272b8ac9d90ecd144e3b40a38d13b3e035`,
preserved in the Site repository as `rollback/pre-engine-efficiency-v2`.

## Overall instrument

- Preallocate 36 voice records, modulation buffers and envelope records. Reuse them
  after release or stealing fades finish. Retain eight physical voices, the 32-tail
  processing cap, four-voice unison, physical oscillator phase/calibration and 18 ms
  stealing fades. No sample-rate, waveform, filter or quality reduction.
- Cache exact settled thickness mix/gain and settled FX algorithm weights; moving
  controls retain their original arithmetic and smoothing. Keep both filter stages
  warm and retain all delay/reverb tails.
- Rebuild the arpeggiator's chord schedule only when its enable, pattern or octave
  settings change, or input notes change. Sound knob edits no longer rebuild it.
- Compile MIDI note schedules on musical data changes, not on every loop. Binary
  search restores the cursor. Indexed note lookup replaces repeated linear searches
  for active-note reconciliation. Key/scale-only edits reuse the schedule.
- Batch chord note-offs for up to 16 ms and send appended overdub notes rather than
  the complete MIDI clip. Explicit finish/load and undo flush pending additions;
  draft serialization still includes the notes immediately.
- Remove idle DOM parameter polling. Input/change events and explicit parameter
  synchronization remain supported. Send only changed sound parameters.
- Coalesce fallback telemetry and explicit status requests; retain routine 20 Hz
  reporting and all diagnostic fields. Status display timing does not schedule notes.
- Recovery captures working state once per operation, shares it with status checks,
  caches immutable baseline fingerprints and bounds the journal's serialized-record
  cache to the current working draft plus five recovery entries. Ordinary journal
  writes run during idle time (one-second maximum wait); explicit flush, pagehide,
  visibility loss and patch replacement still flush synchronously. IndexedDB saves
  and write-error reporting remain active. No storage format or migration changes.

## SEQ-16

- Ignore pointer movement that does not change the quantized semitone or length.
- Paint only the affected pitch step/readout during fader edits. Do not refresh
  closed Song Program rows or run hidden-face animation updates. Keep transport,
  configuration flushing, root selection and audio scheduling active when hidden.
- Cache length geometry; measure step endings once at drag start, invalidate on
  resize/layout/view changes, and repaint length only when its inputs change.
- Send sparse `seqPatch` messages. The normalizer copies touched containers and
  reuses untouched program/Song data, avoiding 32-pattern reconstruction for a
  pitch edit. Full patch loads still use complete normalization.
- Tag SEQ messages/snapshots with a revision so stale full telemetry cannot overwrite
  newer visible edits. Retain compatibility with complete `seqConfig` messages.
- Read effective root/override state directly in step playback. Use a preallocated
  32-entry diagnostic-history ring and allocation-free scale-candidate selection.
  Preserve lower-note ties, RNG call order, all directions, Dual 8, alternation,
  Song Program and the four current pitch-only ARP/SEQ relationship modes.

## Intentional timing corrections

1. A MIDI note at loop start repeats at fractional-sample loop durations instead
   of being skipped after the first traversal. Boundary error stays within one
   sample, with matching event frames across tested render block sizes.
2. SEQ tempo changes scale pending A/B note-offs as well as next-step deadlines,
   preserving remaining musical gate duration.
3. FREE MIDI tempo edits scale active note-offs once, fixing a discovered duplicate
   scaling path in full clip configuration updates.

These corrections intentionally differ from faulty old timing. Other tested audio
is sample-identical to the rollback; no approximation of the synthesis algorithms
has been introduced.

## Validation

- New `tests/engine-efficiency.cjs`: fractional MIDI loops at five tempos and multiple
  block sizes/nonzero starts; no sort on repeats or key/scale-only changes; incremental
  overdub/duplicate rejection; FREE tempo duration; A/B gate phase; sparse state
  preservation; 2,000 unison retriggers without new voice modulation arrays; exact
  audio comparison with/without all 16 gestures at 44.1/48 kHz, mode changes,
  voice stealing, live notes, MIDI, SEQ, effects and Panic.
- New `tests/engine-efficiency-browser.cjs`: actual mouse fader/length dragging,
  keyboard adjustment, unchanged-edit suppression, small packets, stale-snapshot
  protection, no unrelated/hidden Song repainting, idle polling removal, sparse
  sound updates, flip continuity, chord overdub and complete restart recovery on
  both AudioWorklet and ScriptProcessor backends.
- Existing regression suites: all 100 factory sounds, synth/voice ownership,
  measurements, effects, reshape, sequencer/stability, roots/program, scales/Dual 8,
  alternation, song audio/UI, MIDI editor, all 16 gesture surfaces/audio, persistence
  including corruption/failed writes, hardware hierarchy, workflow and simulated
  tablet activation/interruption. The tablet test's muted OSC 2 fixture now uses
  its supported saw option instead of an unsupported sine option.
- See `tests/engine-efficiency-results.json`,
  `tests/engine-efficiency-browser-results.json` and
  `tests/engine-efficiency-benchmark-results.json` for reproducible evidence.

Run `npm run build`, `npm run test:engine-efficiency`, and
`npm run benchmark:engine-efficiency`. Browser tests require Chromium/Playwright
and permission to open a localhost listener. The build is
`dist/GRIMISS_mAMB_v0_7.html`; serve `dist` over localhost or HTTPS.

## Limits

The Samsung S6 Lite/Edge has not been physically profiled or listened to. Linux
Chromium touch/activation simulations and Node timings are not tablet measurements
or guarantees of zero dropouts. Worklet and fallback share the optimized DSP; the
fallback still competes with browser UI/storage work on the main thread. The main
benefits are less editing, configuration, loop-boundary and allocation work; real
oscillator/filter/effect computation and overlapping tails remain substantial.

## Changed source files

- `src/synth.js`, `src/effects.js`, `src/instrument.js`: voice reuse, exact settled
  calculations and conditional ARP schedule rebuilding.
- `src/midi-core.js`, `src/midi-editor.js`: compiled schedule reuse, indexed lookups,
  batched overdub appends and timing corrections.
- `src/sequencer.js`, `src/sequencer-ui.js`: sparse normalized updates, root/history
  allocation reduction, drawing/geometry work and gate timing.
- `src/adapter.js`: event-driven sparse sound updates, coalesced telemetry and
  sequencer revision protection.
- `src/patches.js`: shared captures, fingerprint/journal caching and idle recovery
  journal writes with explicit synchronous safety flushes.
- Rebuilt standalone HTML files and manifest; added rollback fixtures, targeted
  tests/benchmarks, npm commands and this implementation report.

## Isolated benchmark results

Separate Node/V8 processes, alternating before/after order, medians of three runs.
These measure the scenarios below, not tablet hardware or browser dropout rates.

| Scenario | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| 16 s, eight voices + all FX | 2458.0 ms | 2252.8 ms | 8.3% |
| 16 s, eight voices + all FX + all slow gestures | 3282.4 ms | 3051.6 ms | 7.0% |
| 16 s, repeated unison note stealing + all FX | 2336.6 ms | 2309.8 ms | 1.1% |
| 2,000 sequence normalization edits | 47.8 ms | 11.3 ms | 76.3% |
| 10,000-note MIDI schedule, 20 loop traversals (output muted) | 27.5 ms | 2.2 ms | 91.9% |

A normal browser fader edit is under 200 bytes, versus roughly 6.8 KB for the
previous full configuration. Untouched Song patterns are reused, not reconstructed.
No arbitrary 4/8-gesture limit, reduced sample rate, reduced polyphony or simplified
sound algorithm is involved.
