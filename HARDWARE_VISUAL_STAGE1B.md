# mikroSEQ hardware refinement — Stage 1B

A focused extension of Stage 1. No application runtime JavaScript, audio, MIDI,
patch, gesture or sequencer code changes. Production source changes are confined
to `src/hardware-materials.css`; the existing build includes it automatically.

## Rounded printed sections

All fifteen main synth sections now use a **6px outer radius** at the native
1280 × 640 layout scale. Header upper corners use **5px**, calculated as the outer
radius minus the existing **1px border**. Header lower corners are **0px**. The
concentric radii let the strip and native border meet without a second frame or
changed panel dimensions. At the 1920-wide screenshot scale these render as
9px outer / 7.5px header corners.

Existing panel and header rectangles, padding, positions, fonts and control
geometry remain unchanged. Existing overflow rules are untouched. The corner
paint is the intentional shape change; controls and popup editors are not rounded
or clipped into a new container.

## Ink, chassis and control materials

- The original muted teal token remains **#426d66**; lettering stays chassis-black.
- Fixed-seed SVG fractal grain supplies slight ink-density variation. Very short,
  low-opacity hairlines at tile edges add restrained coverage irregularity. The
  one-pixel native boundary uses the same ink texture, with slight ink withdrawal
  controlled by a shared strength token. No rectangle displacement is applied.
- A second fixed-seed micrograin tile adds powder-coat texture and faint mottling
  using a static soft-light blend behind the existing positioned controls. The
  chassis remains predominantly black, without scratches, dirt or moving noise.
- Knobs gain a radial mounting recess and an extremely faint moulded-plastic
  face grain. The overlay follows the existing SVG face inside the coloured arc.
- Neutral switch caps gain restrained highlights and underside shading. Fader
  tracks gain inset shadows; slider cap colours, sizes and travel remain intact.
- Section depth uses only small inset shadows, avoiding floating cards.

Every decorative pseudo-element has `pointer-events: none`. All textures are
small, shared embedded SVGs; there are no new runtime timers, animated material
filters, raster chassis images or additional application elements.

## Shared tokens

The existing chassis, recess, raised, edge, print-teal, knockout and branding
colours are retained. Added shared controls:

| Token | Current value |
| --- | --- |
| `--hardware-section-radius` | `6px` |
| `--hardware-border-width` | `1px` |
| `--hardware-header-radius` | outer radius minus border width = `5px` |
| `--hardware-ink-texture-strength` | `.12` |
| `--hardware-edge-imperfection-strength` | `.06` |
| `--hardware-chassis-texture-intensity` | `.14` |
| `--hardware-knob-grain-strength` | `.065` |
| `--hardware-control-highlight` | `#c2cfb926` |
| `--hardware-control-shadow` | `#00000088` |
| `--hardware-panel-shadow` | `#03070355` |

The main-synth selectors and existing opt-in material classes remain scoped.
SEQ16, its dialogs and the keyboard do not adopt these styles.

## Verification

Checkpoint: `checkpoint/pre-hardware-visual-stage1b-2026-11-07` at `3b922b2`,
the version 47 deployment record. Baseline screenshots were captured before edits.

PASS at **1920 × 1080, 1600 × 900 and 1280 × 768**:

- All **2,500 existing element rectangles, font metrics, layout properties and
  border widths** match the checkpoint. Only the explicitly approved section and
  header radius values differ.
- All fifteen outer/header corner pairs measure **6px / 5px**.
- Original control indicators, waveform colours and illuminated mixer accents
  match their baseline computed colours.
- The full keyboard-area screenshot is pixel-identical.
- SEQ16 computed rendering styles, layout and all interior pixels match. A
  one-channel, one-RGB-level antialiasing variation occurs only on the outermost
  3D panel crop edge (1833/1533/2 edge pixels at the three viewport sizes). The
  check permits no interior differences or larger changes. No SEQ CSS is modified.
- All embedded runtime scripts are byte-for-byte identical to the checkpoint.
- Actual keyboard audio, gesture recording, independent gesture playback, SEQ
  transport, keyboard/SEQ switching, EQ Details and the patch browser work.

Additional PASS:

- **127 upper-panel controls × nine hit points** at 1920 and 1280 viewport widths
  retain their exact baseline hit-test results. No newly obscured points.
- `tests/gesture-browser.cjs`: all seven gestures, touch recording, direction/
  speed/transitions, Worklet/fallback audio, MIDI/ARP/SEQ coexistence, patch recall
  and working-draft recovery.
- `tests/seq-simple-browser.cjs`: step states, bank controls, length handles,
  Space/transport, root/scale settings and persistence.
- `tests/workflow.cjs`: eleven groups covering factory/user patches, synthetic
  MIDI Learn, faders/wheels, ADSR point dragging and device controls.

The touch regression now checks actual start/end coordinates, playback and REC
state, accepting a valid two-point gesture instead of requiring an incidental
extra timed sample. Gesture recording implementation is unchanged.

Run `npm run test:hardware-stage1b` for the new geometry/material and hit-area checks.
JSON evidence and before/after screenshots are in `reports/hardware-stage1b-*`.

## Files changed

- `src/hardware-materials.css`
- Generated standalone HTML: `GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html`,
  `dist/GRIMISS_mAMB_v0_7.html`, `dist/GRIMISS_mAMB_v0_5_1.html`, `dist/manifest.json`
- Tests: `tests/hardware-stage1b-browser.cjs`,
  `tests/hardware-stage1b-hit-regression.cjs`, `tests/gesture-browser.cjs`
- `package.json` test shortcut, this report, screenshots and verification JSON.

## Remaining differences / limits

The approved image has different labels and some different proportions. This
build preserves the real application wording, fonts, MS-08 identity and measured
layout. Ageing is deliberately subtle procedural grain rather than photographic
wear or heavy distressing. No SEQ16 visual conversion is included.

Testing uses desktop Chromium on Linux, including synthetic MIDI and actual
browser audio output measurements. Native Windows hardware, physical controllers
and device GPU performance have not been tested. No full-frame pixel identity is
claimed for SEQ16 because of the explicitly measured outer-edge antialiasing above.
