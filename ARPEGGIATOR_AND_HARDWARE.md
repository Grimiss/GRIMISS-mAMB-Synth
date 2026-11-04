# Arpeggiator and near-black hardware finish

The original90 factory sounds retain their identities and parameter values. A new Arpeggios bank occupies91–100. USER storage, the37-note keyboard, MIDI targets and existing effects/voice architecture are preserved. Five arp parameters are added to patch serialization and MIDI Learn; tempo reuses the existing shared BPM control.

## Playing

SELECT PATCH → ARPEGGIOS, select a sound, then hold a note or chord. ARPEGGIATOR ON switches the current sound between arpeggiated and direct play. Patterns: Up, Down, Up/Down (no duplicate endpoints), As Played, Random. Rate: quarter, eighth, sixteenth, quarter-triplet, dotted-eighth. Range: one to three octaves. Gate:5–95%. TEMPO−/+ changes shared BPM; Shift changes10BPM. The delay's original tempo control and tempo-synced effects follow the same value.

HOLD ADD builds a retained input chord. HOLD REPLACE replaces it on the next new chord gesture. Sustain is scoped to the originating MIDI device/channel. Generated gates are not themselves latched by HOLD/sustain. Release HOLD/pedal to clear released inputs; PANIC clears the pattern and existing audio as before. Changing away from an active arp patch clears its retained sequence. Legacy USER patches omit arp settings and load with it off. Local octave changes, touch and typing keep existing pitch ownership.

## Audio design

The scheduler runs against rendered audio frames in the shared Worklet/fallback instrument, not a DOM timer. Events split synthesis into spans at exact integer sample boundaries; the synth render method accepts optional offset/length without subarray allocation in the scheduler. Clock accumulation retains fractional periods. Tempo changes preserve beat phase. Display timers only paint snapshots.

No new timbre or synthesis voice pool. Generated notes use their originating source for independent pitch bend/CC1, with the existing eight-voice target and POLY/MONO/UNISON rules. Cached held keys/controllers transfer when arp is enabled/disabled. Source disconnect, repeated events, sustain, HOLD and PANIC have regression coverage. With arp disabled, three-rate wet eight-note renders are sample-identical to the v16 rollback modules.

The internal tempo is implemented. MIDI Thru retains original incoming messages; generated arp notes feed internal audio. External MIDI Clock synchronization and step-sequencer editing remain future work; the reserved STEP label is retained without presenting inactive editing controls.

## Hardware finish

One dark charcoal powder-coated chassis with tiled fine-grain texture, directional bevels, short control contact shadows, integrated flat end housings and recessed fasteners. Rounded6px native section boundaries and heavy cream/grey legends use matte printed treatment; teal/magenta/amber illumination remains on active controls and electronic traces. Glass highlights and dark bezels retain all functional graphs, envelope handles and XY pads. Key front lips and the keyboard divider have stronger physical separation.

Approved reference-coordinate rectangles, matched filter/amp envelope widths, compact EQ, enlarged cutoff and three-octave keyboard are unchanged. Cabinet edges use inset outlines so the finish cannot shift the measured coordinate origin. Screenshots cover1920×1080 and1600×900 with keyboard visible and hidden. The compact arp panel retains its future step legend.

## Validation limits

Software/Chromium checks and numerical audio renders only. No physical Windows/tablet, hardware MIDI, listening or external-clock verification. The60-second arp stress test rotates POLY/MONO/UNISON and patterns, uses effects and enforces the eight non-stealing voice target. Numerical post-PANIC silence at24kHz uses a1e-12 ceiling (the observed floating-point residue is far below audibility); existing44.1/48/96kHz recovery checks remain exact where specified.
