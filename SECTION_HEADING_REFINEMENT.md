# Section heading and boundary refinement

- Main-synth headings use the embedded Orbitron Bold face, explicitly pinned to
  weight/variable axis 700. A 0.16px chassis-coloured knockout edge gives the small
  printed legends more visual weight without changing font size or header boxes.
- The main sections are now labelled VIRTUAL PATCH BAY and ARPEGGIATOR.
- DELAY aligns with the left edge of the header legends. Its existing master
  checkbox/LED sits on the right. The existing accessible DELAY ON label remains
  associated with the input, with a Delay on/off tooltip; redundant visible text
  is suppressed. Effect-mode and tempo-sync groups move within the same header
  without resizing their controls or covering the LED.
- Section boundaries have a 1.5px visual weight: the original 1px border plus a
  0.5px inset ink rim. Panel dimensions, padding, rounded corners and control
  positions are unaffected. The SEQ16 surface does not adopt this styling.
- Ageing textures, grain seeds and imperfection strengths are unchanged. Further
  subtle screen-print ageing can be adjusted through the existing shared system;
  the user's ageing question did not authorize another material change here.

Files: src/interface.html, src/hardware-materials.css, generated standalone HTML
builds/manifest, tests/section-heading-browser.cjs, npm test shortcut, screenshots
and verification JSON.

PASS at 1920 × 1080 and 1280 × 768: correct names, Orbitron Bold settings, separate
DELAY title/mode/sync/LED hit regions, 1.5px paint-only boundaries, unchanged other
control/display geometry and unchanged SEQ16 rendering styles. Tests wait for
fonts and existing responsive overlay alignment to settle in both builds.

Actual browser checks pass for keyboard audio, the relocated delay on/off LED,
effect-mode selection, tempo sync and note division, and the EQ header button.
All embedded runtime scripts, including MIDI target metadata, are byte-identical
to the checkpoint. No DSP, MIDI, gesture, patch or sequencer implementation changes.

Checkpoint: checkpoint/pre-section-heading-refinement-2026-11-07 at c4c2427,
the version 48 deployment record. Development remains on
codex/controller-workflow-v0.7. Physical Windows/MIDI devices are not tested.

Run npm run test:section-headings. Evidence: reports/section-heading-*.png and
reports/section-heading-verification.json.
