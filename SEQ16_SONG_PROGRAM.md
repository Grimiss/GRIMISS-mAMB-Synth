# mikroSEQ — song program and quieter performance controls

A/B, RESET and 16 STEP / DUAL 8 are now at the top of the right-hand controls. The root display is a digital-style note selector: click/tap it to choose the root including octave. In DUAL 8, select A or B first; each bank saves its own root. Older patches inherit the same root for both banks, preserving their sound.

Caps, ON/REST/ACC buttons and length bars retain their colour coding with substantially less glow. The main Pitch ON/OFF has moved to Advanced, because older patches can independently mute a bank. Play/Pause remains the normal transport.

## Song programming

SONG PROGRAM opens a popup without flipping away from the sequencer. Choose 1–32 patterns. The first pattern, and newly added patterns, copy the main-screen roots, directions, rates, lengths and scale. Each pattern exposes A settings and, in DUAL 8, B settings. REPEATS defaults to 1, counts A's programmed length and can be set from 1 to 64. For example, length 8 and repeats 4 lasts 32 A step events.

RUN SONG selects PROGRAM root source and starts song and sequencer playback. LOOP wraps to pattern 1. With LOOP off, the final settings remain active. STOP SONG freezes the current song pattern while the melody continues. Play/Pause freezes both the melody and song advancement. To return to the main-screen settings, select FIXED root source in Advanced. The pitch sliders and saved offsets are never rewritten by song changes.

Pattern transitions use A's existing audio-frame pitch-step clock. They change roots/rates/directions/lengths without resetting the melody counter. B retains an independent rate and uses its new settings on its next event. The song is one arrangement for both banks, not two competing arrangement clocks. In combined POLYMETRIC mode, the same existing arp-driven pitch events advance the song. Arp-generated pitches retain their existing transpose/gate/echo relationships; song roots determine independent sequence notes and scale roots.

RANDOMISE changes all active song patterns. The LEDs beside ROOT, DIRECTION, RATE, LENGTH and REPEATS select which fields participate. Click an LED off to protect that field. Root choices use a bounded musical register, directions use the four existing choices, rates use straight musical divisions, and lengths/repeats use compact musical choices. Both banks are randomized independently. Slider notes, synth parameters and effects are untouched. The resulting pattern values and LED exclusions are saved with patches; randomization occurs only on an explicit click.

Existing eight-slot root-program data remains loadable and playable in the core. The popup is the new editor: first RUN SONG switches that patch to the 32-pattern arrangement; it does not overwrite the legacy program data. No audio engine or FX processing code was changed.

## Validation

- Exact event-frame checks for changing roots, rates and lengths; direction storage, looping, continued melody phase, independent bank roots, STOP and old-patch migration.
- Actual rendered C3/C4 fundamentals and PANIC silence for the new song engine.
- Existing FIXED audio sample-identical across all four arp modes at 44.1/48/96 kHz; 30 pitch compatibility cases; keyboard-root, legacy program, dual-bank and pause tests.
- Browser controls, 32-pattern count/defaults, randomization exclusions, live audio-engine song playback, persistence and screenshots at 1920×1080 and 1600×900.
- Wet POLY/MONO/UNISON stability regression passed. Physical Samsung tablet not tested.

Rollback: development branch `checkpoint/pre-song32`; prior hosted version 32.
