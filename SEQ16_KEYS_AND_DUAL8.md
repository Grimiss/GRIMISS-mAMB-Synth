> Current pitch-only operation is documented in SEQ16_PITCH_ONLY.md. Green drift described below was subsequently retired by approval.

# SEQ-16 keys, scales and DUAL 8

Existing 16-step mode remains the default; eight root-program slots remain available. No new timbre or voice engine is introduced.

## Key changes

PROGRAM flips to the keyboard face. Select a slot and enter its root using the keyboard, or change its key dropdown. The note keeps its octave when the dropdown changes the pitch class. Select a scale for that slot. CHROMATIC / OFF preserves previous behaviour. Ten options include major, natural minor, harmonic minor, Dorian, Phrygian, Lydian, Mixolydian and both pentatonics.

Choose STEPS (legacy 1–64 pitch events) or ROUNDS (1–64 groups of the active A pitch length). Example: D minor 4 ROUNDS, C major 2 ROUNDS, G major 5 ROUNDS. RUN selects PROGRAM root source; LOOP repeats populated slots. Changing root does not reset the melody or drift. The A pitch clock remains the root-program clock in DUAL 8. Pendulum/random durations count pitch events in groups of the configured length, rather than detecting a return of the playhead.

Output snaps to the nearest legal MIDI note, with equal-distance ties going down. Original pink offsets remain intact. In combined arp modes snapping follows existing arp pitch changes; CHROMATIC leaves all legacy output unchanged. Held notes finish naturally. The ordinary arp is unchanged when combined mode is off.

A SCALE selector also supports fixed/keyboard roots. Note names above tracks show the scale-snapped root-relative programmed note. In arp modes actual output additionally depends on the held arp note; these labels are not a promise of a single fixed arp pitch. Amber outlines mark active pink steps. Green still identifies drift progression.

## DUAL 8

Select MODE: DUAL 8. Steps 01–08 form A; 09–16 form B. EDIT A/B selects which bank's settings are shown. Clicking a step also selects its pitch bank. Each pitch bank has an independent enable, length (1–8), rate, direction, gate, slide and velocity. There is one shared green drift sequence, length 1–16, with a single clock, direction, cycle time, interpolation, smoothing, destination, amount, bipolar mapping and variation. Its settings remain the same when switching PITCH BANK. RUN/STOP/RESET remain shared transport controls. RESET P/D reset that layer in both banks.

A retains the six existing arp relationships. B generates independent sequence notes through the same voice allocator, alongside A/arp. Both banks share the patch, root/scale program, tempo and eight-voice limit. This is not two timbres or two independent arpeggiators. Stop, mode changes and PANIC release bank-owned notes. Green modulates the shared synth patch and therefore affects notes from both banks.

## Verification and limits

New automated coverage: exhaustive nearest-note scale mapping across MIDI 0–127, slot scale/round persistence, all six modes with rendered audio, independent dual-eight pitch clocks/ownership and shared drift, finite audio, shared voice limit and panic. Pitch scheduling is checked across render-block partitions with drift disabled. Existing effects automation remains block-applied; no new sample-accurate effects-automation guarantee is made.

Chromium checks visible bank/key/scale/round controls, two pitch playheads, note labels and layouts at 1920×1080 and 1600×900. Existing root-program, legacy audio, voice-ownership and instrument regressions are also exercised. No physical controller/tablet test or hosting publication is implied by local checks.
