# SEQ-16 — physical control hierarchy

The right-hand control deck has four inset sections:

- TRANSPORT: separate square Play, Pause and Stop buttons with vector icons, plus RESET and Advanced. Space retains Play/Pause. Pause is drawn as two bars, not a font glyph.
- PATTERN: bank and 16 STEP/DUAL 8 selectors, followed by smaller direction and rate switches. Gate, velocity and expression remain in Advanced.
- PERFORMANCE: a root-note display/selector for A and, in Dual 8, a second simultaneously visible selector for B; Key/Scale below.
- SONG MODE: explicit ON/OFF switch and SONG PROGRAM access. ON arms the arrangement without starting the sequencer; Play starts it. OFF returns to main settings without restarting the melody. STOP SONG in the popup retains the active pattern, as before.

The song popup is now a continuous table: alternating understated odd/even row backgrounds, no separate card borders or gaps. Fields remain editable and active-pattern highlighting remains visible.

During Song Mode, main length bars, root displays, Key/Scale and direction/rate selection follow the effective pattern. Step note readouts follow its root and scale, including bank B's root. Pitch sliders retain their saved offsets. Editing main root/rate/direction/key or dragging a length bar while a song pattern is active edits that pattern; turning Song Mode off restores the underlying main settings.

RESET is now an explicit performance reset, separate from the Advanced position-reset command. It stops generated playback, selects FIXED roots at MIDI 60 (Middle C, labelled C4 here), zeroes all 16 pitch offsets, sets every step ON without accents/rests, selects FWD, 16 steps, 1/8 rate and Major. Other SEQ main/expression settings return to their normal initial values. Song Mode is OFF. Saved song arrangements and legacy programs are retained; synth parameters, patches and FX are untouched. Factory preset defaults remain unchanged.

Validation: dedicated browser checks cover section locations, all three SVG icons, independent visible roots, song on/off, actual song-driven bars/notes, exact reset state and generated MIDI 60, plus both modes at 1920×1080 and 1600×900. Existing browser checks cover touch editing, note ownership, keyboard flip with audible Worklet playback, patch recall, PANIC and ScriptProcessor fallback. Core song timing/direction, rendered song fundamentals, pause, legacy roots/program and pitch compatibility tests pass. Physical tablet testing remains unverified.

Development rollback: checkpoint/pre-seq-hierarchy. Prior hosted version: 33.
