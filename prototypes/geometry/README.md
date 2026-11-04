# Geometry study — awaiting approval

This isolated measured-coordinate model supersedes further cosmetic work. The working synthesizer is unchanged. Start with index.html, reference-geometry.json/CSV and REFERENCE_GEOMETRY.md. All source measurements trace to reference.jpg; key counts have reproducible scanlines. Browser captures use a2:1cabinet at1.5×inside1920×1080, with no aspect warping.

Run from the repository root: `python prototypes/geometry/measure.py`, `node prototypes/geometry/build.cjs`, `node prototypes/geometry/verify.cjs`, `python prototypes/geometry/report.py`. verify.cjs first reads current-build geometry, then checks only the isolated proposal; it does not change the engine or send MIDI/audio.

**STOP: obtain user approval for geometry, keyboard span tradeoff, EQ graph handling and compact allocations before full implementation or further styling.**
