# SEQ-16 integrated development

## Audit and rollback

Authoritative branch: codex/controller-workflow-v0.7. Known working source ffb3d5b; tag rollback/pre-seq16. Hosted version 25 remains the known-working production checkpoint during development. No main changes.

Existing integration points: adapter.js owns Web MIDI and forwards per-source events; synth.js owns one eight-voice timbre and route smoothing; instrument.js owns the shared effects and sample-frame arpeggiator; patches.js owns legacy/user patch serialization; coordinate-layout.js/reference-layout.json own upper geometry; physical-controls.js/refinements.js own the existing keyboard, wheels and notches.

## Controlled implementation

- A: audited/checkpointed the existing instrument.
- B/C: lower housing has backface-hidden rotateX faces, a dedicated toggle and 16 shared tracks, two independently addressable handles per track, explicit non-destructive link editing and per-step rhythm editing.
- D/E: sequencer.js supplies two sample-frame clocks and the six arp transforms. instrument.js orchestrates events through the same synth and effects. Generated sources bypass HOLD/sustain capture while physical inputs retain ownership. Slide uses the existing voices' oscillator frequencies; it adds no oscillator/timbre.
- F: additive seq16 patch data and browser-local session/view persistence. Runtime playheads and RUN are not restored automatically. Existing patches initialize safe sequence defaults.

Upper coordinates and surface artwork are preserved. Only the lower-panel wrapper/toggle and its reverse face are new. The upper arp section is not redesigned. Functional verification and publication details will follow in the final checkpoint.
