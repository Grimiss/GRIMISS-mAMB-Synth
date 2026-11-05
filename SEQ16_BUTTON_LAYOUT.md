# SEQ-16 performance layout

The lower housing and keyboard/SEQ flip remain unchanged. Only the sequencer face and a modal detail panel are reorganised. Sequencer timing, pitch/scale calculations, voice allocation and synthesis DSP are unchanged.

## Main controls

- Left: RUN, STOP, RESET and illuminated 16 STEP / DUAL 8 buttons. A / B editing buttons appear only in DUAL 8.
- Centre: sixteen narrower pitch columns, green caps, note names and amber playheads. DUAL 8 shows A/B headings and a divider. A fixed strip below edits the selected step: pitch readout, REST, ACCENT, probability and individual gate.
- PATTERN: length, gate, pitch on/off, MORE, four direction buttons and five common rate buttons (1/2, 1/4, 1/8, 1/16, 1/32).
- PERFORMANCE: FIXED / KEYBOARD / PROGRAM root-source buttons, EDIT PROGRAM, root/key and scale, ARP + SEQ enable. Four arp relationship buttons appear only when combined mode is on. RATIO appears only for POLYMETRIC.

MORE opens a floating dialog containing glide/slide, velocity, random seed and whole-note/dotted/triplet rates. It identifies the edited bank and leaves playback running. The RATE caption shows the exact selected division even if it is an extended rate. Escape, CLOSE or the backdrop closes MORE.

Selecting bank B moves the selected step into steps 09–16 while preserving its within-bank offset; A does the corresponding move to 01–08. Selecting a step or moving its fader also selects that bank. Selection never advances/resets the audio clock or rewrites the pattern.

Root/key and scale keep native dropdown/number controls. Existing eight-slot keyboard-side programming, patch/session persistence and all four arp relationships are preserved. Hidden backing controls retain stable internal parameter IDs, while visible buttons dispatch the same parameter changes. Green is the pitch-cap colour only: no secondary modulation lane is restored.

## Verification

New seq-buttons-browser coverage tests real button bindings, bank/step alignment, contextual controls, MORE values, playback through dialogs/PROGRAM/flip, green styling and worst-case expanded layouts at 1920×1080 and 1600×900. Existing touch/wheel/keyboard, migration, fallback, MIDI, PROGRAM, direction and pitch-audio compatibility tests pass. No physical tablet/controller verification is claimed.

Screenshots: reports/seq-buttons-green-1920.png, reports/seq-buttons-green-1600.png, reports/seq-buttons-more.png. Rollback source: checkpoint/pre-sequencer-buttons. Previous production: Site version 29.
