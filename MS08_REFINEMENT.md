# GRIMISS AMBIENT — mikroSEQ MS-08 refinement

## Panel and sequencing presentation

The right-hand deck retains the approved arrangement but contains the transport switches inside their enclosure, reduces internal row borders, separates PLAYBACK (A+B / A→B) from bank selection, and labels rate simply RATE. Song OFF displays SONG DISABLED instead of an empty pattern counter. Bank-B editing turns selected pattern controls blue. The A→B mode, Song controls and keyboard/SEQ toggle use amber; A/B editing keeps green/blue identity. Reset semantics, saved arrangements, dual roots, song timing and note ownership are unchanged.

Step-state buttons are smaller black switches with illuminated text/rims. Caps are black with one coloured indicator line. ON/REST/ACC retain their green-or-blue/grey/pink encoding. Length bars have a coloured outer edge and a subdued interior. Mixer fills are green, amber and pink and continue following the actual level controls.

## Branding and patch access

The supplied GRIMISS AMBIENT logo is reconstructed as a scalable inline vector, including its reel emblem. The title reads mikroSEQ MS-08, with the single-timbre/voice and signal-chain badges below it. The small audio-status sentence is hidden; the existing audio pilot still reports audio state. The right patch arrow touches the screen edge, SELECT PATCH sits immediately beside it, and the patch name is larger. Clicking the patch screen, Enter or Space opens the existing patch browser. Patch category remains available in that browser and the screen tooltip.

## OSC1 RESHAPE

The existing `pw` identity and all saved MIDI/automation bindings remain. It is now labelled RESHAPE. Pulse/square continues using the original PWM algorithm. Saw, triangle, sine and all three digital waves receive asymmetric phase reshaping, with DC correction where required and harmonic limiting on the digital spectra. Existing parameter smoothing remains active. The live scope follows the reshaped waveform. OSC2's processing is unchanged.

At 50%, with no shape modulation, all seven waveforms render sample-identically to the prior engine. Away from neutral, older non-pulse patches now deliberately respond to the existing shape parameter; LFO/virtual-patch shape modulation becomes audible on these waves too. No second engine/timbre or new patch field was introduced. No per-sample objects are allocated for reshaping.

## Song Program recommendation — not implemented

Replace the repeating table with a grid of 32 numbered pattern tiles and one selected-pattern editor. Each tile can summarize roots/repeats; selected and currently playing tiles should have separate green/amber indicators. Show A/B root, direction, rate, length and repeats only once in the editor below. Keep pattern count, loop, song transport and the randomisation exclusions in a compact top toolbar. Retain the existing arrangement data and authoritative pitch-step clock. This would reduce repeated dropdowns and scrolling, while keeping all 32 positions visible. The working song editor and its saved data remain intact in this release.

## Validation

- New audio tests: all seven waveforms respond to RESHAPE; 50% is sample-identical to the rollback engine at 44.1/48kHz; extreme settings at high notes are finite and bounded.
- Existing fixed/programmed audio compatibility at 44.1/48/96kHz, A/B alternation audio, sample-clock sequencing and pause tests passed.
- 60-second wet POLY/MONO/UNISON stability with live mode/parameter edits, STOP and PANIC passed.
- Eight-voice offline benchmark: 2s audio rendered in median 290ms on this execution machine (not a physical-tablet CPU measurement).
- Real browser checks cover patch-screen access by click/Space, logo/model/header, bank-blue/amber states, cap indicators, all three mixer colours, all seven live OSC1 graphs and control containment at 1920×1080 and 1600×900. Existing touch/MIDI-simulation/flip/persistence and Worklet/ScriptProcessor regressions passed. Physical Samsung tablet unverified.

Rollback: development checkpoint/pre-ms08-refinement; prior hosted version35. Continue codex/controller-workflow-v0.7; no development merge to main.
