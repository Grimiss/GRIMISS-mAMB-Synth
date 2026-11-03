# Roadmap

- [x] Inspect source and visual reference; archive original; create baseline audit.
- [x] Shared standalone AudioWorklet/fallback DSP; automated offline and browser checks.
- [x] Correct TPT filter equations; four filter types; smoothed numeric controls.
- [x] Bounded voice management, repeated-note fade, hold regressions, actual unison.
- [x] Deterministic five-preset loading; velocity/bend/sustain/MIDI hot-plug.
- [ ] Profile AudioWorklet CPU, remove remaining per-sample allocations and benchmark tablet devices.
- [ ] Extend tests for filter response slopes, discontinuities/click thresholds, aliasing spectra, LFO depth, all preset audio, browser panic silence and physical MIDI disconnection.
- [ ] Reconcile keyboard highlights with engine voice stealing/HOLD REPLACE; source/channel-aware overlapping MIDI and pointer ownership.
- [ ] Click-free filter/waveform switching; improve triangle anti-aliasing and hard-sync/cross-mod alias suppression.
- [ ] Research official 2002 microKORG manual and acquire licensed, controlled reference audio; measure envelopes/filter/oscillators.
- [ ] Independent LFO2, four actual virtual patch routes, tempo synchronisation.
- [ ] Original 64-wave digital bank, Vox and oscillator noise families, waveform visualisation.
- [ ] Chorus/ensemble, phaser, stereo delay and EQ with tail/bypass tests.
- [ ] Patch save/load/import/export and new factory categories.
- [ ] Arpeggiator, XY controls and accurate parameter displays following supplied screenshot.
- [ ] Windows/tablet browser verification, long real-time soak and hardware comparisons.

No Sound Factory integration and no main-branch merge are part of this checkpoint.
