# Roadmap — v0.5 checkpoint

## Verified this run

- [x] Started from exact v0.4 commit `a0131ea527fada670ad9bfc13b2aa5336e9480d3`; ran all four baseline commands before code changes.
- [x] Profiled and optimised shared DSP; reused spectra/settings/modulation buffers, cached derived constants and smoothed only moving numeric controls.
- [x] Source-scoped MIDI device/channel, pointer and typing-key ownership; repeated-note policy, independent sustain/bend/wheel, disconnect recovery and panic.
- [x] Engine-derived highlights for gates, HOLD and voice stealing; asynchronous startup/lift race fixed.
- [x] Last-note priority including pedal-up/disconnect, and live POLY/MONO/UNISON changes.
- [x] Eight-millisecond oscillator/filter switching crossfades; both filter stages kept warm.
- [x] Independent LFO2 and selectable sine/triangle/saw/square/sample-and-hold on both LFOs; very slow free-running rates.
- [x] Four signed/enableable virtual patch routes, eight sources and six DSP destinations, audible browser tests and smooth source/destination reassignment.
- [x] Tuning, envelope timing, filter slopes, harmonic spectra, primitive aliasing, switching-discontinuity and 120-second modulated stress measurements.
- [x] Byte-identical standalone distribution and build manifest; all five original presets preserved with deterministic reset.

## Next priorities

1. Expand click tests across notes/phases, master/drive/PWM edits, rapid preset changes and combined route rewiring. Retain tested control smoothing, sparse path crossfades and audio quality.
2. Benchmark real AudioWorklet deadlines/CPU on Windows and supported physical tablets; run longer real-time soak, real MIDI hot-plug and physical multi-touch tests. Validate local-file support separately.
3. Improve alias suppression for triangle, hard sync and cross modulation; measure whole-chain aliasing, waveform loudness and high-note behaviour before claiming broad anti-alias quality.
4. Implement stereo effects in stages: chorus/ensemble, delay, phaser and two-band EQ; preserve tails and add bypass/parameter regression measurements.
5. Implement patch save/load/naming/categories/import/export and more factory sounds; preserve the five original presets.
6. Research official 2002 microKORG documentation and acquire permitted controlled reference recordings; measure actual envelopes/filter/oscillators. Original digital spectra remain approximations.
7. Expand original digital bank to 64 waves and add Vox/noise oscillator families; no proprietary ROM extraction.
8. Add tempo sync and arpeggiator, then accurate waveform/envelope/filter displays and XY controls following the supplied screenshot. Keep a single timbre; no vocoder or layering.

Sound Factory remains untouched. Do not merge main without explicit approval.
