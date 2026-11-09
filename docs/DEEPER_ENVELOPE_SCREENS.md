# Deeper envelope screens

Filter Envelope and Amp Envelope retain their existing outer bounds, widths, ADSR knob positions and control sizes. Their teal filled headers now span 230 logical pixels, ending immediately after the knob group. Header ends retain the existing rounded-print radius; the section's original full-width rounded printed boundary remains intact.

Only the two envelope SVGs extend upwards into the former right-hand header space. Screen widths and left alignment are unchanged. Existing bezels, grid, curve glow and AUTOMATE overlays follow the taller screens. The expanded view retains the original 90px grid-row minimum so the knobs do not recenter.

Changes: `src/envelope-screens.css`, build inclusion and generated HTML. No production JavaScript, DSP, MIDI, gesture engine, patch or sequencing changes.

Chromium validation at 1920 and 1280 widths passed exact section/knob geometry comparisons, unchanged screen widths, increased depth, aligned short headers and contained screen bounds. Expanded-view geometry also matched. Direct envelope-point dragging, automation recording and audible output passed without page errors. Screenshot reviewed. Physical Windows/tablet testing not performed.

Rollback: Site v67, development commit 623ea2b and checkpoint/pre-deeper-envelope-screens-2026-11-09.
