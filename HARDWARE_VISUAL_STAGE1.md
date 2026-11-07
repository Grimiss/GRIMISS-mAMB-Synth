# mikroSEQ hardware visual reconstruction — Stage 1

The main synth now uses charcoal-black painted-metal surfaces, muted teal printed
headers and fine printed boundaries. mikroSEQ is off-white; the existing subtitle
badges use the same muted teal. All actual wording, model/version information,
control geometry and fonts remain authoritative. The approved image guides the
materials, not replacement labels or a new layout.

## Material and reusable design system

`src/hardware-materials.css` is a separate, deliberately scoped paint layer.
It defines:

- `--hardware-chassis: #101211`
- `--hardware-recess: #090b0a`
- `--hardware-raised: #171a18`
- `--hardware-edge: #292d2a`
- `--print-teal` / `--print-teal-border: #426d66`
- `--print-knockout: #101211`
- `--brand-white: #e5e7e3`
- Shared `--hardware-grain` and `--hardware-ink-grain` texture assets.

Two small, embedded SVG tiles use fixed-seed, non-animated fractal noise. One
creates fine painted-metal grain; the other creates very slight ink variation.
Low opacity and broad, faint tonal shading keep the finish restrained. There are
no raster backgrounds, moving textures, animated filters or runtime material code.

Headers combine the shared teal ink with subtle grain and chassis-coloured text
for the knocked-out lettering appearance. Existing HTML headings remain readable
and selectable; their font, alignment, dimensions and contents are unchanged.

Printed edges use the original native one-pixel border boxes and existing corner
radii. Separate padding-box and border-box background layers put the metal on
the body and textured teal ink on the boundary. Small grain variations soften the
uniform ink coverage without displacing the rectangle or creating extra outlines.
These background layers introduce no pointer targets or input interception.

Reusable `.hardware-metal`, `.hardware-print` and `.hardware-printed-boundary`
finishes are available for deliberate future adoption. Production selectors target
only the existing main header and upper `.coordinate-panel` sections. Neither the
SEQ face nor its dialogs opt into these classes. Original cyan, pink, amber and
green accent variables, waveform colours and illuminated mixer fills are retained.

Existing physical knob gradients, unselected buttons, fader caps and display
recesses receive restrained neutral material colours. Active accents and gesture
state borders retain their established behaviour. Knob sizes, indicators, fader
travel and hit areas are unchanged.

## Layout and functionality protection

Checkpoint: `checkpoint/pre-hardware-visual-stage1-2026-11-07`, commit `6921c78`.

Automated comparisons run after fonts and the app's normal resize alignment settle:

- 1920 × 1080, 1600 × 900 and 1280 × 768 viewports.
- All 2,500 existing DOM elements match their baseline rectangles, font metrics,
  box dimensions and layout properties at each viewport; maximum difference zero.
- The full keyboard/performance-area screenshot is pixel-identical.
- The SEQ16 performance-area screenshot is pixel-identical, and its computed
  rendering styles and geometry match. SEQ16 receives no new styling.
- Every embedded runtime JavaScript block is byte-for-byte identical to the
  checkpoint: audio, DSP, MIDI, patch, gesture and sequencer code are unchanged.
- Actual keyboard audio, gesture recording and playback, SEQ transport and the
  existing keyboard/SEQ switch pass interaction checks.

No existing application HTML element, section, label or control is replaced,
removed or repositioned. The lower performance housing retains its prior finish
so keyboard and SEQ16 visuals remain protected during this stage.

## Regression checks

PASS: build/script syntax; Stage 1 geometry, font and screenshot comparisons;
`npm test` (audio, source ownership/modulation and signal measurements);
`tests/gesture-browser.cjs` (all seven remaining gestures, touch recording,
Worklet/fallback, MIDI/ARP/SEQ coexistence and patch/recovery);
`tests/seq-simple-browser.cjs` (step states, controls, transport, length handles,
scale/root and persistence); `tests/workflow.cjs` (eleven groups including patch
recall, MIDI Learn, wheels/faders, ADSR point dragging and device controls).

## Changed files and evidence

Implementation: `src/hardware-materials.css` and `tools/build.cjs`.
Generated playable builds: `GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html`,
`dist/GRIMISS_mAMB_v0_7.html`, `dist/GRIMISS_mAMB_v0_5_1.html`, `dist/manifest.json`.
Validation: `tests/hardware-stage1-browser.cjs` and the npm test shortcut.

Before/after screenshots at all three widths, baseline panel geometry, final
comparison results and SEQ crops are in `reports/hardware-stage1-*`.
Run `npm run test:hardware-stage1` to reproduce the comparisons against the tag.

## Remaining differences and verification limits

The reference has different labels, model text, some controls and proportions.
The application keeps its real MS-08 identification, typography, controls and
measured geometry, as requested. The finish uses subtle procedural grain rather
than the reference's photographic wear; there are no added scratches, invented
controls or changed keyboard materials. SEQ16 and popup editors retain their
existing appearance pending separate approval.

Visual and interaction checks use Linux desktop Chromium. Native Windows hardware
and GPU performance on physical devices have not been measured. No pixel-perfect
match to the generated reference image is claimed; exact preservation comparisons
are against the working application checkpoint.
