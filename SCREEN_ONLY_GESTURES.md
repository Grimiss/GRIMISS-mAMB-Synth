# Screen-only gestures and side-by-side oscillators

Gesture controls and playback now belong only to existing visualization screens:
OSC 1, OSC 2, filter, filter envelope, amplifier envelope, LFO 1, LFO 2, EQ,
modulation visualizer and arpeggiator. All ten can play independently together.
Mod FX, Delay and Reverb have no screens: their gesture buttons, popup choices
and gesture playback are removed. Their original audio effects and manual controls remain.

The complete XY/Automation section, its two pads, expansion and assignment dialogs
are removed. Its width is reassigned to the oscillator panel. OSC 1 and OSC 2 now
sit side by side with matching larger waveform screens, selected waveform names
beside their headings, all seven/three waveform buttons, and the original reshape,
modulation-depth, tuning, octave and sync controls.

At the native 1280 × 640 layout each oscillator screen grows from 106 × 46 to
approximately 227.5 × 66 pixels (about three times the area). Hiding the keyboard
expands them vertically. The mixer and LFO panels move right within the existing
top row, retaining their sizes; the lower synth and keyboard/SEQ dimensions remain.

## Compatibility

The version-1 gesture schema still validates and round-trips the six retired
surface records and old XY assignment metadata. This avoids deleting stored
performances or rejecting older patches. Retired records are excluded from the
audio engine's active list and cannot preview or modulate anything, even if an old
patch marks them playing. They are absent from the gesture editor and do not
appear as active in engine telemetry. Existing sound parameters, SEQ, Song, MIDI
and remaining gesture data retain their existing formats. No libraries are reset.

No oscillator, filter, voice allocator, effects DSP or musical scheduler algorithm
is changed. Remaining gesture timing, free-start recording, SOFTEN, speed,
FWD/BACK/PENDULUM, JUMP/SMOOTH, amber indicators and effective UI motion remain.

## Validation

- Removed XY/effect paths cannot schedule or preview; enabled legacy paths produce
  sample-identical audio to no gestures at 44.1 and 48 kHz.
- Remaining gestures retain sample-identical audio compared with the checkpoint.
- All 100 factory sounds remain sample-identical to the earlier DSP reference.
- Ten simultaneous screen gestures produce finite, non-silent audio alongside
  live input, MIDI, SEQ and ARP for a 60-second render; Panic releases ownership.
- Browser checks cover screen-only buttons/editor choices, actual mouse and touch
  recording, soften/speed/pause, closed-popup animation, clear independence,
  1920/1600 sizing, waveform button access and labels, and recovery round trips.
- Patch/sequence libraries, factory recall, KEEP SEQ, legacy patch compatibility,
  MIDI editor, SEQ edits and keyboard flip are regression-tested.

Automated audio rendering and Linux Chromium are used. Native Windows hardware,
physical MIDI devices and tablet performance are not claimed as tested.

## Sources and checkpoints

Changed implementation: src/gesture-core.js, src/gesture-ui.js, src/gesture.css,
src/interface.html, src/interface.js, src/coordinate-layout.js,
src/reference-layout.json and src/workflow.js, plus standalone HTML builds.
Tests are updated for ten eligible surfaces and removed XY UI, while preserving
validation of all sixteen historical schema entries. New tests/screen-only-gestures.cjs
covers inactive legacy data and actual audio. New screenshots and JSON results
are retained in reports/ and tests/.

Pre-change development checkpoint: checkpoint/pre-screen-only-gestures-2026-11-07
at commit 8cd4761 (version 43 deployment record). The existing hosted version is
also preserved as a rollback before publishing this update. Development stays on
codex/controller-workflow-v0.7; no GitHub Main merge.
