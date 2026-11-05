# SEQ-16 pitch-only simplification

## Scope and assessment

The secondary green sequence is removed from production code: values, LINK editing, independent clock/playhead, smoothing/interpolation, variation, bipolar mapping, modulation destinations and the instrument-specific modulation callback. The shared timing, pitch randomness, gates, note ownership and rendering stay in the existing pitch sequencer. The keyboard root/program selector remains independent of the DOM and instrument output. No standalone application was added.

The user approved removing ARP + DRIFT and ARP DRIFT. Four combined relationships remain: TRANSPOSE, ARP GATE, POLYMETRIC and ARP ECHO. Independent SEQ and independent ARP are unchanged. DUAL 8 pitch mode remains available. In DUAL 8, bank A retains arp interaction; B generates independently owned notes through the same synth and voice pool.

## Playing

The sixteen pink handles retain −12 to +12 semitone offsets and the default [0,7,12,7,3,10,-5,0] repeated twice. Drag, wheel or use arrow keys to edit. Note readouts, step numbers, rest indicators and amber active-step outlines remain. Pitch travel and handles are larger. The existing 1235×149 lower housing, upper panels and horizontal-axis keyboard flip are unchanged.

Controls are grouped as PITCH (root, glide and previously implemented optional scale), SEQUENCE (length/rate/direction/gate/velocity/random seed and selected-step rest/accent/probability/gate), PERFORMANCE (root source, four arp relationships, applicable ratio and PROGRAM). Chromatic remains the default; no new scale behaviour is introduced.

FIXED/KEYBOARD/PROGRAM roots, onscreen/MIDI input, eight keyboard-entry program slots, 1–64-step durations, optional pre-existing ROUNDS durations, looping, manual override and pitch-clock-driven program progression remain. Switching faces does not restart transport. Optional scales and DUAL 8 introduced previously are retained.

## Older patches

Sequence schema is version 2. Obsolete green fields are ignored. Pitch/root/program/scales/dual-eight settings survive normalization and round trips. An old `drift` or `arpdrift` mode migrates to `combined:false`, a valid inactive TRANSPOSE selection and `legacyMode` metadata. A visible notice explains that the old drift relationship was removed. The synth's independent arp enable is left as saved; no other combined relationship is silently substituted. Choosing a new relationship clears the notice. Patches that used green modulation necessarily lose that contribution; their programmed pitch intervals remain intact.

## Sound protection

src/synth.js, src/effects.js, src/adapter.js, modulation matrix, LFOs, envelope editors and XY implementation are unchanged. src/instrument.js only loses the SEQ-only parameter-offset adapter/base cache. ANALOG AGE, PITCH DRIFT, VIBRATO, synthesis filter motion, both LFOs, virtual patches, effects and MIDI remain available.

## Validation

`tests/pitch-only-compatibility.cjs` compares against the pre-removal sequencer fixture across 30 sample-rate/mode/layout cases, including glide and PROGRAM, with green disabled in the reference. Maximum allowed sample difference is 1e-6. Existing root/PROGRAM tests, four-mode note/gate tests, eight-voice ownership, analog behaviour, effects, 60-second stress and browser workflow checks cover retained features.

Chromium checks all sixteen pitch controls, drag/wheel/arrows, two simultaneous touches, four modes, MIDI messages, audio through flips, migration notices, patch/session recall, 1920×1080 and 1600×900 layouts, reduced motion and fallback operation. Screenshots: reports/seq16-1920-seq.png and reports/seq16-1600-seq.png.

Known pre-existing unrelated check: tests/expressive-sound.cjs completes its age/thickness DSP checks but fails its final assertion that the hidden HTML velocity control defaults to 0; both rollback and current src/interface.html contain 50. The factory patch supplies its own sensitivity. This value and synthesis behaviour were intentionally not changed. Physical tablets/controllers and subjective speaker listening were not verified.

Rollback source: checkpoint/pre-pitch-only-seq16. Production rollback before publication: Site version 27.
