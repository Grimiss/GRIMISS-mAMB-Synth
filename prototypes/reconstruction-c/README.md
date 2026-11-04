# GRIMISS hardware reconstruction C — isolated approval prototype

This is Workstream B / Checkpoint B only. It lives separately from the working synthesizer. No file in `src/`, the playable HTML, `dist/`, or the DSP engine is changed by this directory. The root agent can publish this self-contained directory for review. Full component rollout requires the user's approval.

Open `index.html` for the review and `board.html` for local interaction. The prototype has no audio engine, MIDI connection or patch persistence; control interactions change local visual values only. They must not be mistaken for functioning replacement synth controls. In particular, the prototype's simplified EQ/route rows are material samples; all working controls and live graphs must remain in the actual synth after approval.

## Inspected references and scale

The definitive original `reference.jpg` is the actual supplied1280 ×640 mockup (SHA256 `4d7cde0acdb4e7438577b862b7188dbf3ef1a5988626d6c065c5397c4d25d3d1`). It was opened and visually inspected. Dark inset faces, flat22-unit graphite side housings, compact rotary bodies, slim fader slots/caps, header LCD/grille and the keybed divider were reconstructed in native coordinates.

Crops in `comparison-scale.json` use the original and the native1280 ×640 Chromium screenshot without independent resizing, perspective adjustment or colour correction. Small samples are displayed at the same2× zoom; large samples at the same1× zoom. `compare-cabinet.png` contains both full native images side by side. The review page may uniformly reduce large combined images to fit the window; open the image itself to inspect native pixels.

The physical keyboard reference is the user-provided Behringer MS-5 photograph earlier in the conversation. Its stepped white-key stems/shoulders, black-key seating and E–F/B–C gaps informed the geometry. The secondary source is <https://www.thomann.de/de/behringer_ms_5.htm>. A new local photo copy was unavailable and the secondary image download was blocked by the runtime's host policy. No new photographic measurements or equal-scale real-photo capture are claimed. The MS-5 colours are not used.

## Components and cabinet

- Near-black coherent cabinet, integrated relatively flat front-facing housings, narrow directional edge highlights, recessed control deck and substantial keyboard divider. No tube/pill end rails or broad green cabinet gradients.
- Compact28-unit knob dials: thin physical pointer, dark active/inactive scale, short bright parameter arcs, slightly flat top, subtle cylindrical sidewall and restrained lighting. Teal/magenta/amber/cyan accents remain.
- Narrow99-unit recessed fader slots and compact23 ×11 graphite caps with thin teal position illumination; no oversized ruler or permanent numerical readout.
- Solid rectangular plastic switches with defined mechanical edges and concentrated selected-state illumination.
- Thin dark screen bezels, green glass, fine grids, restrained waveform light and internal depth. The sample envelope trace responds to local knob changes.
- Reference-position header branding, LCD, ventilation grille and action buttons. No fake claim that the prototype's patch or audio buttons perform production actions.

## Approved geometry and additional controls

Envelope widths remain420 native units; the filter is510; EQ is256 ×94. These are the user's deliberate approved amendments to the original mockup, rather than newly measured reference dimensions. The enlarged cutoff remains an intentional exception to the compact reference knobs.

The actual synth has additional waveform, EQ, routing and XY controls. The prototype shows the cabinet/material direction only, and does not authorise removal of those features. Rollout must keep their existing bindings and functional screens, using the existing compact live overview/original-node detail views where needed. An expanded prototype panel when its keyboard is hidden does not reset or simulate DSP state, since there is no DSP in the prototype.

## Keyboard geometry

- The required three-octave range is C3–C6, MIDI48–84:22 white keys and15 black keys. All37 identities are unique.
- The953-unit active bank occupies the reference housing. White pitch is955/22 units, with2-unit separations; black frames are25 ×79 units. White fronts are125 units long.
- Every white button has a real CSS `clip-path` stepped silhouette. C/F have right shoulders, D/G/A both, E/B left; terminal C6 closes the range without a fictitious next black key. Black notes occur only at semitones1,3,6,8,10.
- Black keys sit in the cut-outs, with raised top surfaces and distinct side/front construction, rather than simply floating over continuous white rectangles.
- `browser-white-silhouettes-diagnostic.png` temporarily hides black bodies to expose these real cut-outs. It is a separate diagnostic capture; the normal prototype keeps the black keys.
- Browser hit tests probe both sides of every notched white key, confirming those areas are excluded from the white key's hit region.
- No printed note names. Pointer press/release changes the physical key state. Pitch spring return and modulation-wheel local value are demonstrated without claiming audio/MIDI attachment.

The original generated mockup depicts more white fronts than the required37-note keyboard. Preserving37 notes, filling the entire953-unit opening and matching every original individual key width are incompatible. This prototype preserves the user's approved note range and full housing occupancy, while matching key length, black-key height, controller-bay placement and stepped construction. This difference is explicit in the review rather than hidden through invented notes.

## Validation and regeneration

Actual Chromium captures are supplied at native1280 ×640,1920 ×1080 and1600 ×900, each with the keyboard visible/hidden. `verification.json` records bounds/overflow, all37notes, notch hit regions, local drag/fader/switch/key interaction and pitch spring return, plus console errors. These are browser/visual tests, not audio, listening or physical hardware measurements.

From the repository root:

```sh
node prototypes/reconstruction-c/build.cjs
node prototypes/reconstruction-c/verify.cjs
node prototypes/reconstruction-c/components.cjs
python prototypes/reconstruction-c/compare.py
```

Browser testing uses the existing Chromium/Playwright installation. No paid API/service or image-generation service was used.
