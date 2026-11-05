# GRIMISS mikroSEQ — root selection and programmer

Official rename: formerly GRIMISS mAMB. Internal identifiers, repository paths, storage keys and patch formats remain compatible. Rollback: rollback/pre-keyboard-root at cc5edb5, hosted version26.

Phase1: fixed and keyboard root selection implemented through a DOM-free root selector. Keyboard root applies only at actual pitch-step boundaries to independent notes, with no melody reset. Input routing consumes root notes, preserves the actual octave and paired releases, and leaves FIXED normal playing intact. Six arp modes retain their old pitch behaviour; only independent SEQ notes (standalone and ECHO) use the new root. In KEYBOARD mode new input does not supply arp chord notes; latch the arp chord in FIXED first if desired.

Phase1 verification: root-transpose engine tests, actual Chromium keyboard/synthetic MIDI and flip tests, existing sequencer engine and browser regressions passed. No physical MIDI controller claim. Phase2 follows only after this checkpoint.
