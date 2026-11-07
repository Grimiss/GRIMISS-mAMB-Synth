# Main synth ageing and heavy screen-printed headings

- Section lettering now uses embedded Orbitron Black, weight/axis 900, at the
  existing sizes and positions. The knockout edge is 0.20px.
- A fixed, sparse teal overprint tile adds tiny pinpricks and short bridges to
  the dark knockout lettering. These interrupt the perfect edges without
  disturbing readable text or changing the HTML text. Header buttons remain
  above this pointer-transparent layer.
- Powder-coat grain and ink-density variation are slightly stronger. Shared
  tokens are now ink texture .22, edge imperfection .10, chassis grain .23 and
  letter wear .62. All seeds and overprint positions are stable, never animated.
- A small reusable SVG supplies extremely faint short wear marks and micro-pits
  to upper chassis surfaces. No heavy scratches, dirt or rust are added.
- The existing 1.5px boundaries, 6/5px corners, labels, DELAY layout, coloured
  controls, branding and all controls retain their current geometry.
- The keyboard/SEQ area and its styles do not adopt the new material treatment.

Only production source changed: src/hardware-materials.css. Generated standalone
HTML copies and manifest are rebuilt. Tests/shortcut, this report, screenshots
and verification JSON are added separately. All embedded runtime JavaScript is
byte-identical to the checkpoint; no audio, MIDI, gesture, patch or sequencing
logic changes.

PASS: 1920 × 1080 and 1280 × 768 geometry and typography checks, unchanged SEQ16
rendering styles, non-overlapping DELAY controls, actual delay on/off/mode/sync/
division interaction, EQ Details and browser keyboard audio. Before/after images
and evidence: reports/ageing-pass-*.

Checkpoint: checkpoint/pre-ageing-pass-2026-11-07 at d3999c3 (version 49 record).
Use npm run test:ageing-pass to repeat the focused checks. Native Windows hardware,
physical MIDI and device GPU performance are not claimed as tested. The wear is
intentionally restrained at normal size and more apparent on close inspection.
