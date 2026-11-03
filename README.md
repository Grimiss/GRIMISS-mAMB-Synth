# GRIMISS mAMB Synth — v0.5

Standalone, single-timbre virtual analogue synthesizer, developed from the v0.4 stability checkpoint. Eight active voices, shared patch settings, AudioWorklet with ScriptProcessor fallback, source-aware MIDI/touch, independent LFOs and four actual modulation routes. No external resources are needed by the instrument.

## Play

Download `dist/GRIMISS_mAMB_v0_5.html`, serve its folder locally (`python -m http.server 8000`) and open http://localhost:8000/GRIMISS_mAMB_v0_5.html. In the repository, open http://localhost:8000/dist/GRIMISS_mAMB_v0_5.html. Press START AUDIO; MIDI can require browser permission. Localhost or HTTPS enables AudioWorklet. The compatibility fallback uses the same DSP. `file://` was blocked by managed Chromium policy and remains unverified.

Use MIDI, the mouse/touch keyboard or A/W/S/E/D/F/T/G/Y/H/U/J/K. POLY permits eight active voices. MONO and monophonic four-voice UNISON use last-note priority. Repeated note-on from the same device/channel retriggers its current note; one matching note-off releases the latest trigger. Different devices, channels, pointers and typing keys own separate gates. Sustain, bend (±2 semitones) and modulation wheel belong to each MIDI device/channel. CC123 releases that source; CC120 fades that source. Disconnect releases only its owned notes. ALL NOTES OFF fades everything over 18 ms and clears sustain/controllers.

HOLD ADD latches notes; HOLD REPLACE uses a 650 ms chord-group window. Stealing removes a retired note's held state. Keyboard lights show engine-gated notes, including sustain/HOLD, and exclude retiring/released tails; snapshots update about every 50 ms. At most 32 voices including short steal tails are retained; extreme bursts can truncate older tails.

## Modulation

LFO1 retains its original vibrato/PWM/filter-motion connections, with selectable shape and depth. LFO2 is independent, 0.005–8.005 Hz; LFO1 spans 0.025–8.025 Hz. Both offer sine, triangle, saw, square and sample-and-hold. Rate edits preserve phase. LFOs are free-running and do not yet offer tempo sync.

Each virtual patch slot has an enable switch, source, destination and signed intensity. Sources: filter EG, amp EG, LFO1, LFO2, velocity, key tracking, pitch bend and mod wheel. MIDI controller sources belong to each voice's device/channel. Envelopes/velocity/wheel are unipolar; LFOs/bend are bipolar; key tracking is `(note - 60) / 60`.

At 100% intensity and a source value of 1:

| Destination | Depth |
| --- | --- |
| Pitch | +12 semitones |
| OSC2 tune | +12 semitones |
| Pulse width | +0.4, clamped to 0.08–0.92 |
| Cutoff | +4 octaves, within safe cutoff bounds |
| Amp level | +1 times base gain; combined gain clamped to 0–2 |
| Noise level | +50 control units, combined level clamped to 0–100 |

Four routes add at each destination. Intensities, enable/bypass and source/destination changes slew over approximately 15 ms. Preallocated sparse connections retain and fade old paths during rapid rewiring. Existing five presets reset new controls to defaults and disable routes, preserving their original parameter overrides.

## Build and test

Node 18+. `npm run build` copies the canonical HTML into `dist/` byte-for-byte and writes its SHA-256 manifest. The original filename remains canonical to preserve repository continuity.

`npm run test:all` runs the original baseline, diagnostics, 10 legacy audio groups, 16 ownership/modulation groups, tuning/filter/spectrum/click/envelope/stress measurements, paired performance benchmark and browser tests. Audio tests have no third-party dependencies. Browser tests use Playwright (`npm install`) and Chromium (`CHROMIUM_PATH` may select it); the managed environment can use its preinstalled Playwright. Browser tests create a temporary loopback server and exit afterward. `tests/fixtures/v0.4.html` preserves the exact starting implementation. See TEST_RESULTS.md for evidence and limitations.

For CPU profiling: `mkdir -p work`, then `node --cpu-prof --cpu-prof-dir=work tests/performance.cjs tests/fixtures/v0.4.html`. Performance timings are desktop Node measurements, not guarantees for real-time browser deadlines or physical tablets.

## Integration boundary

The inline `mamb-engine` script exposes `createMambEngine(parameters, sampleRate, seed)`, independent of DOM and Web Audio. It returns `render(Float32Array)`, `message(event)` and `snapshot()`. Events include `params`, `on`/`off` with `source`, `controller`, `sustain`, `sourceOff`, `hold`, `route` and `panic`. Snapshots are allocated outside the per-sample loop and used for diagnostics/UI. Envelopes, digital spectra, derived constants, modulation arrays and waveform/filter transition weights are reused. Numeric controls slew on a 16-frame control cadence, with per-sample envelopes, oscillator/filter processing, LFOs and patch routing.

This remains an independently implemented microKORG-inspired instrument. No proprietary ROM/code, no hardware equivalence claim, no Sound Factory integration. Effects, arpeggiator, 64-wave bank and patch import/export remain future work.
