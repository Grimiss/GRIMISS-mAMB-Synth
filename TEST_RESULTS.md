# Test results — 2026-11-03

## Automated DSP

`node tests/audio.cjs`: **10/10 groups pass** on the exact embedded DSP used by both audio backends. Covers startup silence and nonzero note output, complete release, eight active voices and bounded stealing, long overlapping release, HOLD ADD beyond six seconds, HOLD REPLACE chord grouping, panic, four filters with rapid cutoff changes/high resonance at 44.1/48/96 kHz, rapid retriggers at maximum oscillator/drive settings, actual sync/ring/cross audio differences, velocity/sustain/unison, and a 60-second sustained eight-note numerical stress render. All checked samples finite and within ±1. These are numerical regressions, not listening certification or CPU deadline guarantees. Machine-readable results: tests/audio-results.json.

`node tests/baseline.cjs`: original commit fixture renders finite, nonzero audio, peak 0.12033, RMS 0.08050. These are baseline-only values and are not a level-matched quality comparison. Audit records original filter double damping, state-dependent preset overrides and missing MIDI behaviour.

`node tests/diagnostics.cjs`: A4 sine render at 48 kHz measures 440 positive zero crossings in one second, RMS 0.063870, peak 0.080613. Generates WAV and SVG diagnostics in work/. Numerical output is in tests/diagnostic-metrics.json. No reference-audio comparison.

## Browser

`node tests/browser.cjs`, installed Chromium on Linux:

- Localhost AudioWorklet: PASS; measured real browser audio RMS 0.06534, finite samples.
- Forced ScriptProcessor fallback: PASS; measured real browser audio RMS 0.06665, finite samples.
- Both routes: startup, all five preset selectors, preset reset, LPF24/cutoff/UNISON/HOLD controls, MIDI handler injection and panic keyboard clearing; no page JavaScript errors.
- `file://`: BLOCKED by managed Chromium administrator policy; no local-file compatibility claim.

Values differ slightly per run due to wall-clock audio sampling. JSON: tests/browser-results.json. Browser screenshots generated in work/.

## Limits and remaining regressions

No physical MIDI device, actual Windows/tablet validation, long real-time soak, rigorous click/discontinuity limits, spectrum/aliasing measurements, measured filter slopes or hardware recording comparisons. Tests do not establish that every reported crackle has been eliminated. Waveform/filter mode switching is not crossfaded. Keyboard highlights can lag engine voice stealing or HOLD REPLACE. Multiple MIDI channels/devices and pointers do not yet maintain independent same-note ownership. Per-sample DSP allocations need profiling before claiming tablet efficiency. Original three digital waves remain unverified approximations; LFO2, routing, effects, arpeggiator and patch import/export are pending.

Reference research blocked: request to the supplied Korg documentation URL failed at the configured proxy connection. No reference audio downloaded, measured or auditioned. No exact microKORG emulation claim.
