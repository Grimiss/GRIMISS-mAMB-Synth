# mikroSEQ display gestures V1.0

## Audit and enabled surfaces

The existing instrument remains a standalone single-timbre synth with one voice allocator and one shared effects chain. Development stays on `codex/controller-workflow-v0.7`. `checkpoint/pre-gesture-v1` preserves the pre-change source. All 16 eligible surfaces below can record, hold and play independently and simultaneously. There is no active-recorder count restriction.

| Display | Default X | Default Y | Available assignments |
| --- | --- | --- | --- |
| XY 1 | XY 1 current X | XY 1 current Y | XY 1 current X, XY 1 current Y |
| XY 2 | XY 2 current X | XY 2 current Y | XY 2 current X, XY 2 current Y |
| XY AUTOMATION DISPLAY | XY 1 current X | XY 1 current Y | XY 1 current X, XY 1 current Y, XY 2 current X, XY 2 current Y |
| OSCILLATOR 1 | RESHAPE | OSC 1 MOD DEPTH | RESHAPE, OSC 1 MOD DEPTH, OSC 1 LEVEL |
| OSCILLATOR 2 | OSC 2 FINE TUNE | OSC 2 LEVEL | OSC 2 FINE TUNE, OSC 2 SEMITONE, OSC 2 LEVEL |
| FILTER | CUTOFF | RESONANCE | CUTOFF, RESONANCE, ENVELOPE INTENSITY, KEY TRACK |
| FILTER ENVELOPE | ATTACK | DECAY | ATTACK, DECAY, SUSTAIN, RELEASE |
| AMP ENVELOPE | SUSTAIN | RELEASE | ATTACK, DECAY, SUSTAIN, RELEASE |
| LFO 1 | RATE | DEPTH | RATE, DEPTH, FILTER MOTION |
| LFO 2 | RATE | DEPTH | RATE, DEPTH, CROSS MOD |
| EQ | LOW FREQUENCY | LOW GAIN | LOW FREQUENCY, LOW GAIN, HIGH FREQUENCY, HIGH GAIN |
| MOD FX | RATE | DEPTH | RATE, DEPTH, FEEDBACK, MIX |
| DELAY | TIME | FEEDBACK | TIME, FEEDBACK, MIX, WIDTH |
| REVERB | DECAY / SIZE | TONE | DECAY / SIZE, TONE, MIX, HALL MODULATION, SPRING DWELL |
| MODULATION VISUALIZER | LINK 1 INTENSITY | LINK 2 INTENSITY | LINK 1 INTENSITY, LINK 2 INTENSITY, LINK 3 INTENSITY, LINK 4 INTENSITY |
| ARPEGGIATOR | ARP GATE | OFF | ARP GATE |

The effects sections have no original graphical display. Their existing headings open the shared popup's gesture surface, without adding a permanent screen or changing section geometry. Existing graphical scopes retain their graphics beneath the selected gesture overlay.

XY surfaces use section-local references to their **already configured pad axes**, not a new unrestricted routing menu. The original XY ASSIGN controls choose those destinations. By default XY 1 uses cutoff/resonance; XY 2 uses reverb/delay mix. The XY automation overview can reference either existing pad axis. If a pad is assigned to a parameter not yet in the safe gesture destination catalog, that option is disabled and explained instead of pretending to modulate it. The original manual pad still works.

OSC 1 has no separate tuning parameter, so no fictitious tuning destination is offered. FILTER drive is omitted because the existing DRIVE control belongs to AMP. Reverb DWELL is SPRING-only; modulation is MOD HALL-only, and unavailable choices are disabled. ARP exposes GATE with Y initially OFF: its remaining controls are discrete note/clock structures or the shared tempo. Gesture playback never changes those structures.

## Operation

Click a scope background to open its editor. Original envelope control-point drags continue to edit ADSR normally; click the surrounding envelope display for gestures. XY pads preserve normal single-drag playing: double-click their displays, press Enter on the display, or choose them in the shared DISPLAY menu to edit gestures. For MOD FX, DELAY and REVERB, click the section heading or choose it in the popup.

Press REC, draw on the original display or popup using mouse/touch, then press REC again. The new take immediately loops for that display only. Stationary holds use elapsed-time anchors and compressed repeated samples; recordings use real seconds, not musical ticks. A take with no meaningful movement preserves an existing valid path. Other surfaces continue running or recording. Closing the popup does not stop recording or playback.

PLAY/PAUSE is per surface. Pause freezes both position and modulation. RELEASE disables its contribution and returns smoothly to base while retaining the recorded path. FWD and BACK loop in opposite directions; PENDULUM reverses naturally without duplicating endpoint traversals. Live speed changes retain playhead phase. Speed spans 0.01×–2×; a 20-second traversal takes 2000 seconds at 0.01×.

JUMP wraps immediately, with only DSP safety smoothing. SMOOTH adds a cubic eased bridge of 0.1–10 real seconds; its length does not change with playback speed. BACK bridges in the reverse direction. PENDULUM disables transition controls while preserving their settings. Direction changes during a bridge retain continuous output before joining the new traversal. Transition-duration edits apply on the next bridge.

X and Y assignments can be changed without erasing a take. Centre (0.5) is neutral; each axis contributes a normalized offset relative to the saved knob/MIDI value. The same destination on both axes averages those two offsets. Contributions from different surfaces add in a fixed order, then clamp to the actual safe parameter range. Frequency/time destinations use logarithmic normalization where appropriate. Manual/MIDI changes move the base beneath the gesture. Existing LFO/envelope/matrix contributions continue downstream.

FX must be enabled using their original ON controls to hear their gestures. Route gestures modulate LINK intensity but never enable or rewire LINKs. A TIME gesture temporarily overrides delay tempo-sync through the existing smoothed delay reader; RELEASE restores sync. Delay buffers are never reset for gesture edits. Native envelope stages are never retriggered by gesture control changes.

## Architecture and timing

`gesture-core.js` contains versioned validation, the elapsed-time recorder, interpolation, independent playheads and normalized parameter combination. It has no DOM, note scheduler, musical tempo or storage dependency. It uses binary path lookup and reusable parameter maps. Every surface has independent state; a shared UI does not limit simultaneous operation.

The instrument adapter owns base parameter values and gesture offsets separately. Effective targets feed the original synth and effects smoothers via a small numeric parameter interface. This does not write knob values, alter saved sound parameters, create another synth, or take over MIDI/SEQ/arp note ownership. Existing matrix routes and arp gate use their existing paths. Settings messages do not repeatedly clone long recorded paths.

Gesture playback is evaluated from audio sample counts in blocks of **up to 64 samples**, followed by the existing DSP smoothing. This is audio-clock control-rate modulation, **not sample-accurate per-sample automation**. UI drawing and 50 ms display refresh do not schedule playback. Pitch destinations retain native smoothing; release of a removed assignment adds a short 15 ms decay. No per-sample gesture objects or growing processing buffers are allocated.

## Persistence

Full patch version **6** adds a separately versioned `gestures` section, version **1**. It includes every recorded path/timestamp, duration, axis assignment, speed, direction, transition/duration, enabled flag and playing/paused flag. Old patches initialize empty disabled gestures. Validation rejects unknown displays, cross-section assignments, malformed/non-monotonic points, non-finite data and unsafe ranges before patch application.

User patches, full JSON exports, dirty indication, rename preservation and complete recovery drafts include gestures. In-progress takes can be checkpointed as disabled recovery paths; completed valid takes are protected from an empty replacement. The existing independent SEQ library and MIDI note data remain separate. KEEP SEQ retains musical sequence/MIDI state; gestures belong to the incoming **sound patch** and recall with it, including their enabled/paused settings. Runtime gesture phase is not persisted, so a recalled enabled loop starts at its direction's endpoint after audio is available.

## Files

New: `src/gesture-core.js`, `src/gesture-ui.js`, `src/gesture.css`, gesture core/audio/browser tests and rollback fixtures.

Integration: `src/instrument.js`, `src/synth.js`, `src/effects.js`, `src/adapter.js`, `src/persistence-core.js`, `src/patches.js`, `src/sequencer-ui.js`, `tools/build.cjs`, generated standalone HTML/manifest. The main layout, voice architecture, existing sequencer code and arpeggiator note generation are preserved.

## Testing and limits

See `tests/gesture-core-results.json`, `tests/gesture-audio-results.json`, `tests/gesture-browser-results.json` for executed results. Tests cover all 16 schemas/surfaces, directions, seam modes, speed/ultra-slow timing, independent pause/hold/release, same-target combination, stationary recording, simultaneous operation, valid/legacy/corrupt patch data, full patch and draft restoration, touch, and coexistence with MIDI/SEQ/arp.

Audio tests compare empty gestures sample-for-sample against the rollback across all four existing ARP/SEQ modes with effects, render every surface separately and require an actual audible-output difference, then run every gesture with live input, MIDI, SEQ, arp and effects together. Finite output, bounded samples and Panic voice cleanup are checked. This is offline signal verification, not a physical listening claim. Existing synthesis, patch, SEQ, MIDI editor, XY, controller and ADSR regression tests are also run.

Physical Samsung/Edge and real MIDI hardware still require device testing. Background audio follows the browser's existing suspension policy. No claim is made of zero audible clicks for every extreme user-programmed jump: JUMP intentionally permits abrupt changes, and rapid delay-time modulation can intentionally produce pitch movement. DSP safety smoothing and finite-output checks remain active.

Gesture file validation permits up to 100000 points and 24 hours of recorded time per surface as data-size protection; these are not limits on the number of simultaneously active surfaces. Runtime phase is not saved. Unsupported inherited XY destinations remain disabled until a safe parameter adapter exists. No new unrestricted cross-section routing, MIDI recorder, extra track, instrument instance or clock synchronization system is introduced.

Executed validation: `node tools/build.cjs`; `tests/gesture-core.cjs`; `tests/gesture-audio.cjs` (60 seconds rendered with all 16 gestures, live input, MIDI, SEQ, arp and FX, including live gesture settings changes); `tests/gesture-browser.cjs` (Worklet and fallback); `tests/midi-core.cjs`; `tests/midi-browser.cjs`; `tests/persistence-core.cjs`; `tests/persistence-browser.cjs`; `tests/sequencer-browser.cjs`; `tests/workflow.cjs` (11 groups); `tests/root-transpose.cjs`; `tests/seq-alternate.cjs`; `tests/seq-pause.cjs`; `git diff --check`. The 20-second/0.01× timing test verifies a 2000-second traversal directly. Browser suites report no page errors. Original ADSR point dragging and single-drag XY performance are explicitly retained.
