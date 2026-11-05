# GRIMISS mikroSEQ — Original Arturia KeyLab 25 MIDI Map

Generated from the same versioned registry used by the instrument and interactive diagram. This file represents the default software configuration, not a claim about messages received from a physical keyboard.

**Model:** original KeyLab 25, confirmed by the owner; **no pad grid**. The detailed 2014 manual inventory is used: two clickable navigation encoders, Volume plus ten synthesis encoders, nine faders, ten snapshot switches, mode/bank/octave buttons and six transport controls. The diagram is a condensed control-group schematic, not a dimensioned hardware drawing.

**Native performance paths:** notes/velocity, pitch bend ±2 semitones, CC1 modulation source and CC64 source-scoped sustain remain active independently of learned extra assignments. Clearing a learned extra does not disable these paths. CC7 → Master is a configurable software default, based on the documented Volume factory message; hardware presets may override that message. Clearing Volume disables that configurable default until RESTORE DEFAULT MAP.

**Unknown messages stay unknown:** no encoder/fader/snapshot CCs are guessed. Factory transport uses MMC/SysEx, which mikroSEQ does not parse; reconfigure a transport to CC/note/program in Arturia MIDI Control Center before learning. Bank and octave operations may be hardware-local. Optional pedals/breath controller are not supplied physical controls.

**Verification:** Software Tested describes implemented software logic and synthetic regression coverage, not physical hardware validation. Provisional rows are unassigned or not received. WEB MIDI RECEIVED is only a trusted incoming MIDI event; it still does not prove the selected physical-control association. No row is labelled Hardware Verified without a physical validation procedure.

| Physical control | ID | Message | CC / note | Channel | mikroSEQ assignment | Min | Max | Default | Mapping | Verification |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 25-key keyboard | keyboard | note | — | Any (software) | Notes + velocity | 0 | 127 | — | Default | Software Tested |
| Pitch-bend wheel | pitch-wheel | pitchbend | — | Any (software) | Pitch bend ±2 semitones | -2 | 2 | 0 | Default | Software Tested |
| Modulation wheel | mod-wheel | cc | 1 | Any (software) | Virtual patch MOD WHEEL source | 0 | 1 | 0 | Default | Software Tested |
| Octave down | octave-down | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Octave up | octave-up | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Category / Param encoder | nav-category | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Preset / Value encoder | nav-preset | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Category / Param push action | nav-category-push | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Preset / Value push action | nav-preset-push | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| 32-character LCD | lcd | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Sound button | mode-sound | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Multi button | mode-multi | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Edit button | mode-edit | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Volume encoder | volume-encoder | cc | 7 | Any (software) | Master level | 0 | 100 | 65 | Default | Software Tested |
| Encoder 1 — Filter Cutoff | encoder1 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 2 — Filter Resonance | encoder2 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 3 — LFO Rate | encoder3 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 4 — LFO Amount | encoder4 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 5 — Chorus Mix | encoder5 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 6 — Delay Mix | encoder6 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 7 — Param 1 | encoder7 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 8 — Param 2 | encoder8 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 9 — Param 3 | encoder9 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder 10 — Param 4 | encoder10 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 1 | fader1 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 2 | fader2 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 3 | fader3 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 4 | fader4 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 5 | fader5 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 6 | fader6 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 7 | fader7 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 8 | fader8 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Fader 9 | fader9 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 1 | snapshot1 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 2 | snapshot2 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 3 | snapshot3 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 4 | snapshot4 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 5 | snapshot5 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 6 | snapshot6 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 7 | snapshot7 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 8 | snapshot8 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 9 | snapshot9 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Snapshot / Switch 10 | snapshot10 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Transport REW | transport-rewind | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Transport FWD | transport-forward | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Transport STOP | transport-stop | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Transport PLAY | transport-play | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Transport REC | transport-record | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Transport LOOP | transport-loop | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder/Fader Bank 1 | bank1 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Encoder/Fader Bank 2 | bank2 | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| MIDI IN rear connection | midi-in | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| MIDI OUT rear connection | midi-out | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| EXPR rear connection | expression | Not mapped | Manual factory CC11; unassigned | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| SUSTAIN rear connection | sustain | cc | 64 | Any (software) | Source-scoped sustain pedal | 0 | 1 | 0 | Default | Software Tested |
| AUX rear connection | aux | Not mapped | Manual factory CC12; unassigned | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| BREATH rear connection | breath | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| USB rear connection | usb | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| DC IN rear connection | dc-in | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| POWER rear connection | power | Not mapped | — | Any (software) | UNASSIGNED | — | — | — | Unassigned | Provisional |
| Pads — NOT PRESENT on original KeyLab 25 | pads-not-present | Not present | — | — | NOT PRESENT | — | — | — | Not present | Provisional |

Channel numbers in this table are user-facing 1–16; registry packets store 0–15. “Any” is the software wildcard and does not assert the controller’s configured channel. Learned bindings include device ID and channel and override only that observed message scope.

## Learn, persistence and encoder modes

Select a physical control, select a mikroSEQ target, arm LEARN, then move the real control. Without a selected physical association an unknown incoming CC remains an “Observed control — physical position unknown” entry. The latest assignment wins for the same device/channel/message; assigning the same physical control replaces its older learned binding. Save/restore/clear updates the diagram and table without reloading.

Maps use schema `grimiss-mamb-midi-map`, version 1, storage key `grimiss-mamb-midi-map-v1`, separately from patches. Absolute mode is the default. Optional software relative modes are explicit conventions, not unverified claims about Arturia firmware mode numbers: relative1 = two’s complement (1→+1,127→−1,0/64→0); relative2 = binary offset (65→+1,63→−1,64→0); relative3 = sign magnitude (1→+1,65→−1,0/64→0). Match the actual controller setting; do not assume a relative encoding automatically.

## Primary documentation

- [Arturia KeyLab manual, July 2014, sections 2.2–2.3 (pp.9–18)](https://downloads.arturia.com/products/keylab/manual/Keylab_Manual_EN_20140701.pdf)
- [Arturia KeyLab manual, April 2013, sections 2.2–2.3](https://downloads.arturia.com/products/keylab/manual/Keylab_Manual_EN_20130401.pdf)
- [Arturia original KeyLab launch, 15 November 2013 (25 has no pad grid)](https://www.arturia.com/de/company/press/press-releases/press-release-keylabcontrollers-15112013)

The launch announcement’s aggregate encoder wording differs from the detailed manual. This implementation uses the manual’s individually described controls, and does not copy the larger models’ pad grid.
