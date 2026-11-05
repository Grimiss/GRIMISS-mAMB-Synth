# GRIMISS mikroSEQ — root selection and programmer

Official rename: formerly GRIMISS mAMB. Internal identifiers, repository paths, storage keys and patch formats remain compatible. Rollback: rollback/pre-keyboard-root at cc5edb5, hosted version26.

Phase1: fixed and keyboard root selection implemented through a DOM-free root selector. Keyboard root applies only at actual pitch-step boundaries to independent notes, with no melody reset. Input routing consumes root notes, preserves the actual octave and paired releases, and leaves FIXED normal playing intact. Six arp modes retain their old pitch behaviour; only independent SEQ notes (standalone and ECHO) use the new root. In KEYBOARD mode new input does not supply arp chord notes; latch the arp chord in FIXED first if desired.

Phase1 verification: root-transpose engine tests, actual Chromium keyboard/synthetic MIDI and flip tests, existing sequencer engine and browser regressions passed. No physical MIDI controller claim. Phase2 follows only after this checkpoint.

## Phase 2 — eight-slot transposition programmer

The pure createSeq16RootSelector now also owns the eight-slot program. It advances only when the existing sequencer calls atStep(), including in POLYMETRIC where pitch events follow the arp ratio. No independent program timer or audio generator is introduced. The default remains FIXED with eight empty slots and LOOP enabled; old patches keep their old sound.

PROGRAM opens the existing keyboard face and enables EDIT. A compact strip sits above the existing keys without resizing the lower housing, keys or upper panels. The flip toggle moves into free controller-bay space while the strip is open so slot 08 remains fully accessible. There are still exactly two rotating faces.

EDIT routes onscreen, typing and accepted MIDI note input into the selected slot without extra synth voices. New slots default to 16 steps. Entry advances to the next empty slot; when full, select a slot explicitly to replace it. Each duration is independently 1–64 steps, adjustable directly, with native number controls or mouse wheel. Individual clear and CLEAR ALL are explicit actions. Empty note/duration displays show dashes.

RUN selects PROGRAM root source, leaves EDIT, starts/resumes the programmer and resumes the main sequencer if needed. STOP freezes only program advancement, retaining its underlying root; the main melody continues. LOOP off holds the final root after the last programmed duration; another RUN restarts a completed program. RUN after manual STOP resumes its remaining count. Empty slots are skipped. An empty program is inactive and retains a valid fallback/previous root.

While PROGRAM runs and EDIT is off, a held note temporarily overrides the root at the next pitch-step boundary. Program counting continues beneath it; release returns to the current slot at a boundary. Multiple keyboard sources have separate ownership and last-key priority. EDIT takes precedence when deliberately enabled. Disconnect, note-off, octave changes, blur for local keys and PANIC clear captured input appropriately. A pending transport intent prevents stale UI snapshots or cold audio startup from treating immediate override keys as manual synth notes.

Root/program selection never rewrites pink values or restarts the melody or green drift. Twelve + sixteen + three + twenty-four step durations make a 55-step program, independent of a 16-step melody; their relative alignment repeats after 880 steps. Rests still count as pitch steps; disabling the PITCH layer pauses this clock. Changing/clearing a live slot is applied without invalid notes.

Root source and all eight notes/durations/LOOP are additive seq16 patch/session configuration. Transport, edit state and runtime playhead positions do not auto-resume on reload. Existing storage keys, patch format, API identifiers, repository name and HTML aliases remain compatible.

## ARP relationship contract

- Ordinary independent SEQ: all three root sources affect generated SEQ notes.
- TRANSPOSE: arp notes + pink offsets retain their old rule; root source does not add another transpose.
- ARP + DRIFT: arp notes remain independent of root selection.
- ARP GATE: arp chooses pitch; root does not alter it.
- POLYMETRIC: arp + pink offsets retain their old rule; program counts actual ratio-driven pitch steps but does not add root to arp notes.
- ARP ECHO: root source affects only independent SEQ echo notes; primary arp notes are unchanged.
- ARP DRIFT: existing arp drift targets remain unchanged by root source.

In KEYBOARD root mode, new keyboard notes are root commands, not arp chord additions. To combine a latched arp chord with root-driven echo notes, establish/HOLD the chord in FIXED first. Outside EDIT, FIXED preserves normal keyboard playing. PROGRAM stopped leaves ordinary playing available; its retained root is unchanged.

## Verification and limits

Phase 1 was checkpointed and validated before Phase 2 at 165fc22 / checkpoint/keyboard-root-phase1. Root selector tests verify exact duration counts, empty slots, LOOP/STOP, source-owned override, live changes and the 880-step alignment. Existing sequencing tests verify the six interaction modes and underlying audio.

FIXED is sample-identical to the pre-feature rollback for all six modes at 44.1/48/96 kHz. Deterministic programmed C3 and C4 audio measured approximately 130.8128 and 261.6255 Hz. Browser tests verify keyboard/MIDI note entry, root latch, octave handling, program transport, override, all eight slots including 08, patch recall, empty-safe playback and both target resolutions. A dedicated cold-start test verifies an immediate MIDI override after RUN creates no manual voices.

Existing sequencer, workflow, keyboard/audio browser, MIDI registry, audio/ownership, arpeggiator and 60-second poly/mono/unison stress regressions passed. One legacy fixed-80ms startup check failed under concurrent rendering load and passed when rerun in isolation; the explicit cold-start root-routing regression also passed. Physical MIDI hardware, tablet finger ergonomics and live-origin browser access are unverified. File URLs remain blocked by managed browser policy; local HTTP Worklet/fallback tests verify the build.

The supplied specification ends mid-section 18 (“Stop playback. Rese…”). All complete supplied requirements were implemented, and flipping remains independent of playback/reset. No missing tail requirements were invented. Any additional sections need review when supplied.
