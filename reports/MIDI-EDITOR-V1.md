# mikroSEQ MIDI editor V1.0

## Architecture and checkpoint

Development remains on `codex/controller-workflow-v0.7`. `checkpoint/pre-midi-editor-v1` preserves commit `7099c23`. No DM-848, DS-9, GMC-9000, additional tracks or additional synthesizers are involved.

The existing audio path was SEQ-16 → arpeggiator renderer → synth renderer → stereo ensemble → effects. The new note scheduler wraps the synth renderer at its existing sub-block boundary. It schedules MIDI events against audio sample frames and sends stored pitches directly to the same synth, bypassing the arpeggiator. The MIDI module contains no DOM, browser timer, parameter automation or host-track dependencies. UI refresh timers do not schedule notes.

Each piano-roll note occurrence gets a unique source identifier, including repeated notes and notes crossing a loop boundary. Source-specific releases do not release live keyboard, SEQ or arp owners. Existing eight-voice allocation, voice stealing, mono/unison and velocity response remain authoritative. Generated MIDI owners ignore HOLD, as existing sequencer owners do; live HOLD remains unchanged.

## Operation

- **MIDI EDIT** opens a movable, resizable popup. Drag its title bar. Closing it leaves transport and recording alone.
- Select **SEQ**, **MIDI** or **BOTH**. Live performance remains available. MIDI-only suppresses SEQ-generated notes and its arp modifications without deleting its pattern; normal live arp input remains available.
- **SYNC** follows the existing SEQ transport and master tempo. **FREE** has its own BPM/position, using the same audio clock, and runs with SEQ stopped.
- **MIDI REC** starts overdubbing. It starts the relevant transport and switches SEQ-only to BOTH so the clip can be heard. Press again to finish. On-screen and external keyboard input is captured; generated arp/SEQ events are excluded. Root/program-consumed keys are excluded and explained in the popup status.
- Draw empty cells; drag continuously to paint. Drag a note body to move; drag its right edge to resize. Ctrl-drag or choose **ERASE** for touch erasing. Select a note and use Delete or arrow keys. Previous/next NOTE buttons also select fully overlapping notes. Undo/redo also supports Ctrl/Cmd-Z, Ctrl-Y and Shift-Cmd/Ctrl-Z.
- The lower lane edits velocity. Select an overlapping note in the roll first to target its velocity bar; the numerical velocity and duration fields provide exact individual editing. Audible velocity variation uses the synth's existing velocity sensitivity setting; at zero, the synth intentionally gives equal response.
- **GRID / REC SNAP** is OFF by default. Drawing uses the grid; recordings retain original timing plus a per-note snap setting. **PLAY SNAP** is a separate nondestructive playback override: AS RECORDED honors each recorded snap setting; OFF / RAW auditions the original timing. Changing either setting does not rewrite raw note timing. Key, scale and Scale Lock never rewrite existing notes. Scale Lock restricts newly drawn pitches only; out-of-scale notes are dimmed, including recordings.
- Loop start/end are measured in quarter-note beats, starting at zero. Maximum end is 4096 beats (1024 bars of 4/4), maximum 10000 stored notes. Notes beyond a shortened loop remain stored. Horizontal scrolling and zoom navigate long clips. Notes crossing loop end retain their duration and independent ownership.

## Persistence

Full patch version 5 adds a separately versioned `midi` section (version 1). It includes notes/velocities/durations, loop bounds, timing/BPM, source, key/scale/lock, recording snap and playback snap. Older patches initialize an empty MIDI clip with SEQ source and default-OFF snap/lock. No legacy library entries are deleted. Invalid MIDI sections are rejected before applying a patch. Factory sounds remain unchanged.

Working drafts, exports, patch saves, renames and dirty indicators include MIDI data. Saving while a live key is held checkpoints its duration up to that moment. Loading a patch finishes the take and stops MIDI transport; saved recording/playback is never automatically started. KEEP SEQ also retains the current MIDI musical configuration while changing the sound. The standalone SAVE SEQ/LOAD SEQ format remains exclusively SEQ-16: MIDI clips do not leak into sequence-library documents.

No future gesture recorder or automation DSP is implemented. MIDI does not write oscillator/filter/effect base values or claim modulation routing. Future independently timed continuous automation can use a separate parameter-control interface and persistence namespace.

## Files

New: `src/midi-core.js`, `src/midi-editor.js`, `src/midi-editor.css`, `tests/midi-core.cjs`, `tests/midi-browser.cjs`, rollback test fixtures.

Integration: `src/instrument.js`, `src/sequencer.js`, `src/sequencer-ui.js`, `src/adapter.js`, `src/persistence-core.js`, `src/patches.js`, `tools/build.cjs`, persistence regression test and generated standalone builds/manifest.

## Validation and limits

See MIDI/browser test results and console output for executed checks. Core tests render actual finite, non-silent BOTH audio, verify default audio sample identity against the checkpoint in all four existing arp/SEQ modes, unique repeated-note ownership, loop tails, pause, FREE/SYNC, defaults/validation, history and Panic.

Physical MIDI devices and the user's Samsung/Edge tablet require hardware verification; browser synthetic MIDI and Chromium touch checks cannot establish physical-device compatibility. The existing browser background/suspend policies still apply. The editor records note events only, not sustain/bend/controller automation. The active MIDI scheduler bounds outstanding occurrences at 512; the instrument's existing eight-voice stealing remains in force. Editor view/selection and active transport are not patch data. Quantization is nondestructive for recordings/playback, while drawing intentionally places notes on the chosen grid.

Executed successfully: `node tools/build.cjs`; `tests/midi-core.cjs`; `tests/midi-browser.cjs`; `tests/persistence-core.cjs`; `tests/persistence-browser.cjs`; `tests/sequencer-browser.cjs`; `tests/workflow.cjs` (11 groups); `tests/root-program-audio.cjs`; `tests/root-transpose.cjs`; `tests/seq-alternate.cjs`; `tests/seq-pause.cjs`; `tests/reshape.cjs`; `git diff --check`. Chromium acceptance reported no page errors. Real rendered BOTH audio energy was 64.787 with peak 0.158 in the deterministic test. MIDI on/off event frames matched across 128- and 1024-sample blocks. All 100 factory sounds retained their existing parameters. Browser recording tests verified root-consumed actions are excluded visibly, full MIDI user-patch round trips, KEEP retention, legacy/factory empty MIDI, and SEQ-library separation.
