# Test results — v0.5 — 2026-11-03

## Complete regression run

`npm run test:all`: PASS. Original baseline and A4 diagnostics pass; **10/10 legacy DSP groups**, **16/16 ownership/modulation groups**, all measurement assertions, paired performance/sound checks and both available browser backends pass. `git diff --check` passes. Tests read the exact inline DSP used by AudioWorklet and fallback.

Before edits, all four requested v0.4 commands passed against exact commit `a0131ea527fada670ad9bfc13b2aa5336e9480d3`. Results are preserved in tests/v04-revalidation.json. Original v0.3.3 baseline now uses seeded randomness and finite/nonzero/bounded assertions so its measurements are reproducible.

## Performance and sound preservation

Linux Node v24.19.0, eight voices, 48 kHz, 128-frame blocks, two rendered seconds per trial, one warm-up and three measured runs:

| Version | Median render time | Render time / audio duration |
| --- | ---: | ---: |
| v0.4 fixture | 531.8 ms | 0.266 |
| v0.5 | 295.9 ms | 0.148 |

**44.4% less render time** in this paired desktop benchmark. The unmodulated eight-note comparison's maximum sample difference was **0** across 24,000 frames. This verifies that controlled patch only, not every preset or modulation setting. It does not establish physical tablet performance or browser deadline safety. Raw trials: tests/performance-results.json. Initial v0.4 CPU sampling shows sample/render and GC; summary: tests/profile-summary.json.

## Audio measurements

- Tuning: five notes (MIDI 36, 48, 69, 84, 96), all within the 0.2-cent assertion. A4 diagnostic remains 440 positive crossings/sec, RMS 0.063870, peak 0.080613.
- Routed pitch: velocity +12 semitones, wheel +6 and negative key tracking −1.8 all match within 0.3 cents after settling.
- Independent amp/filter envelopes: attack 205 ms and release 455 ms match within 2 ms; filter-release measurements keep amp release longer so the voice remains observable.
- Approximate slopes: LPF12 -11.73, LPF24 -23.46, HPF low side +10.59, BPF high side -5.67 dB/octave. Measured from low-level sine fundamentals near a 261.63 Hz cutoff; not a fitted Korg response. Plot: tests/filter-response.svg.
- Harmonics/centroids: seven oscillator families measured through the actual low-level voice signal path; values in tests/measurement-results.json.
- Aliasing: coherent 8,192-point FFT of the exact oscillator primitive at 5,865.23 Hz. PolyBLEP saw's out-of-legal-harmonic energy is -26.26 dB relative to legal harmonics, 18.18 dB below naive saw. This excludes the nonlinear mixer, sync and cross modulation and is not proof of negligible aliasing across the keyboard. Triangle residual aliasing remains measured, not fixed.
- Switching: the tested 8 ms waveform/filter blends reduce excess adjacent-sample steps versus v0.4 over the first 16 frames. This narrow onset test is not a general listening/click-free certification. Raw before/after values are in tests/measurement-results.json.
- Extended stability: legacy 60-second chord and new **120-second**, eight-note, four-route stress render pass finite/bounded/nonzero assertions while changing cutoff, resonance modes and waveforms. Peak 0.388641; minimum one-second RMS 0.00355707. Panic produces exact numerical silence after its fade.

## Browser and input

Linux Chromium localhost AudioWorklet and forced ScriptProcessor fallback pass 16 checks each: startup/release race, measured audio, five preset controls/reset, device/channel note ownership, scoped sustain, disconnect, two pointers on one key, typing keyboard, steal highlights, HOLD REPLACE, unison, LFO2 controls, four route controls, actual route enable/disable audio, preset route reset and panic silence.

The UI amp route reduced measured RMS to zero on both backends, and disabling it restored nonzero audio. Panic RMS is zero. No page JavaScript errors. File URLs remain BLOCKED by managed Chromium administrator policy. Raw results: tests/browser-results.json. MIDI and pointer tests inject events into actual handlers; no physical device was used.

Additional route regression: live source/destination changes retain the old path while fading in the new path; rapid edits stay finite/bounded and return to the expected gain. All connection storage is preallocated, with sparse active-path processing.

## Remaining limits

Windows, physical tablets, hardware MIDI/touch, long real-time soak and file-URL compatibility remain unverified. Extreme event bursts may truncate older steal tails at the 32-voice total bound. No tempo sync, stereo effects, arpeggiator, 64-wave digital bank or patch save/import/export yet. No reference recordings obtained or analysed; all hardware-emulation claims remain unverified. The original three digital spectra remain original approximations. No Sound Factory changes.
