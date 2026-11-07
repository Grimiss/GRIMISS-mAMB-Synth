# Oscillator layout refinement

Original waveform, octave/sync and knob nodes now occupy the top control row. Waveform switches use 18px caps and 1px spacing. OSC 2 octave and sync button groups each span 53 logical pixels; labels remain outside those groups. Both screens are 82 logical pixels deep in the normal layout, with a 5px bezel and 6px radius. Overall section bounds remain unchanged.

Styling is scoped to the oscillators. No DSP, MIDI, patch or sequencer modules changed. Gesture UI changes only reparent existing controls and reserve a larger oscillator toolbar inset.

Validation: Chromium at 1920 and 1280 widths passed matching screen geometry, controls above screens, equal octave/sync widths, actual waveform/octave/sync click handling, original-screen OSC gesture capture, audible keyboard output, and no page errors. Screenshot reviewed. `git diff --check` passed. The broader existing gesture-refinement test stopped at its filter recording duration <0.6s assertion; full-suite success is not claimed. Physical Windows hardware not tested.

Rollback: checkpoint/pre-oscillator-layout-refinement-2026-11-07 and Site v52 (rollback/pre-oscillator-layout-refinement).
