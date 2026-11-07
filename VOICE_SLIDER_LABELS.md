# Shorter VOICE sliders with left labels

ANALOG AGE and THICKNESS now share a two-column row: a 58px label column,
6px gap and 138px native slider input/slot. Both slots start at the same X
coordinate and have equal length (previous input width 202px). Labels are
centred vertically against the slots. Caps, input heights, parameter ranges,
mode buttons, knobs and vertical group spacing are unchanged.

Production change: seven scoped CSS lines in src/voice-section.css, plus the
rebuilt standalone HTML copies and manifest. No runtime JavaScript changes.

Focused browser checks passed at 1920 and 1280 viewport widths: equal input
widths/positions, left labels without overlap, vertical label alignment, all
VOICE mode/slider interactions, wheel and keyboard adjustment, patch recall,
expanded keyboard-hidden spacing, and unchanged other-section geometry.
Evidence: reports/voice-slider-labels-verification.json and screenshots.

Checkpoint: checkpoint/pre-voice-slider-labels-2026-11-07 at 7ffcf8a, the
version 51 release record. Physical Windows/MIDI devices were not tested.
