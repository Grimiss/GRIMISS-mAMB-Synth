# VOICE section refinement

Only the existing VOICE controls are rearranged/restyled. The section remains
220 × 158 native layout pixels; other sections and the performance area retain
their geometry.

- POLY, MONO and UNISON appear first, including in DOM/keyboard order. Buttons
  grow from 16px to 24px deep with 7.5px labels. Only the engaged mode's lettering
  glows green; the existing mutually exclusive state and inputs are retained.
- ANALOG AGE and THICKNESS follow. Their original native range inputs now have
  recessed 3px slots and physical 15 × 12px caps with central grip highlights.
  A 17px input height retains a usable interaction area. Original values, ranges,
  MIDI IDs, mouse-wheel handling and keyboard adjustment remain intact.
- All three knob accents are green (#56ed9c), with dim green backing rings.
- The small explanatory Eight active voices / UNISON note is removed.
- The four groups use equal intervening spacing, including when hiding the
  keyboard expands the upper panel.

Source changes: src/voice-section.css (scoped component styling), one existing
node move in src/refinements.js, the note removal in src/interface.html, and CSS
inclusion in tools/build.cjs. Generated HTML/manifest, test shortcut, focused
browser test and screenshots/verification report accompany the implementation.

PASS at 1920 and 1280 viewport widths: correct ordering, button dimensions, equal
spacing, green accents, unchanged section/outside geometry and unclipped expanded
keyboard-hidden layout. Actual browser checks cover selected-mode glow, poly
three-note playback, mono last-note playback, four-voice unison allocation,
slider dragging, Home/End, wheel adjustment, audible keyboard output and complete
patch recall. All runtime blocks except the one presentation-only refinements
module remain byte-identical to the checkpoint. Synth, FX, MIDI, patch and SEQ
engine source is unchanged.

Checkpoint: checkpoint/pre-voice-section-refinement-2026-11-07 at a6ac2d4,
the version 50 release record. Run npm run test:voice-section. Evidence is in
reports/voice-section-*. Desktop Linux Chromium tested; physical MIDI, Windows
hardware and Firefox are not claimed as tested.
