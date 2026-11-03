# GRIMISS mAMB Synth — v0.4 checkpoint

Open `GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html` through a local web server, then press START AUDIO. For example, run `python -m http.server 8000` in this directory and visit http://localhost:8000. Use a moderate listening level. AudioWorklet runs in supported secure contexts (localhost or HTTPS); the ScriptProcessor compatibility fallback uses the same DSP. No network resources are needed by the instrument.

Play using MIDI, the touch/mouse keyboard, or A/W/S/E/D/F/T/G/Y/H/U/J/K. Eight active voices share one patch. UNISON stacks four detuned voices per note. HOLD REPLACE uses a 650 ms chord-group window. ALL NOTES OFF fades all voices over 18 ms.

The original HTML, controls, five preset override maps and oscillator functions form the basis of this checkpoint. Original input is archived in `tests/fixtures/v0.3.3.html`. The screenshot remains the visual reference; no cosmetic redesign was attempted.

## Tests

Node 18+ runs `npm test`, `npm run test:baseline` and `npm run diagnostics`. Browser tests require Playwright (`npm install`) and Chromium (`CHROMIUM_PATH` may select it). Run `npm run test:browser`. In the managed environment the preinstalled Playwright is used if the local dependency is unavailable. Tests use a temporary loopback server and exit when done.

## Engine integration boundary

The inline `mamb-engine` script exposes `createMambEngine(parameters, sampleRate, seed)`. Its `message()` handles note, parameter, sustain, hold and panic events; `render(Float32Array)` writes mono output; `snapshot()` exposes diagnostics. It has no DOM or Web Audio dependency. The inline adapter transports messages to the worklet, or directly to the fallback. This prepares future integration without modifying Sound Factory.

This is an independently implemented, microKORG-inspired instrument. It has not been measured against hardware and is not an exact emulation. See ROADMAP.md and TEST_RESULTS.md for limitations.
