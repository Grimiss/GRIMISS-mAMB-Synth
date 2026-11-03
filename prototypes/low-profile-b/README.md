# Prototype B — approved, with screen/type refinements

Prototype A is rejected. This isolated study samples the newly supplied original JPEG directly and corrects the cabinet, flat cheek geometry, knob bodies/value arcs, dark switches, compact caps and recessed glass.

- `board.html`: self-contained interactive visual study; no audio engine or MIDI.
- `browser-full.png`: actual1600×900Chromium screenshot, device scale1.
- `browser-section.png`: actual browser element screenshot.
- `index.html`: review page with original reference, direct samples and matched-scale comparisons.
- `reference-*.png` / `prototype-*.png`: unchanged native-pixel component crops.
- `compare-*.png`: both sides enlarged2×using the same nearest-neighbour method, without independent rescaling or colour changes.
- `colour-samples.json`: sampling rectangles, per-channel medians, separate illuminated-highlight statistics and original JPEG hash.
- `comparison-scale.json` and `verification.json`: scale audit and browser checks.

Reproduce from the repository root: `python prototypes/low-profile-b/sample-reference.py`, `node prototypes/low-profile-b/build.cjs`, `node prototypes/low-profile-b/verify.cjs`, `python prototypes/low-profile-b/compare.py`, `python prototypes/low-profile-b/review.py`.

**APPROVED by the user, with brighter screen glow, visible bezels and heavier lettering throughout.** Those refinements are applied in this prototype and the full rollout. This folder stays isolated; the approved full rollout retains the existing DSP and parameter bindings. The interactive controls demonstrate visual value response only.
