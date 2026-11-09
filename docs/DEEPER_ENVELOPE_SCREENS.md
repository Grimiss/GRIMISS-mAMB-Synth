# Deeper envelope screens

Filter Envelope and Amp Envelope retain their existing outer bounds, widths, ADSR knob positions and control sizes. Their teal filled headers now span 230 logical pixels, ending immediately after the knob group. Header right ends are straight, with the original rounded left upper corner; the section's original full-width rounded printed boundary remains intact.

Only the two envelope SVGs extend upwards into the former right-hand header space. Screen widths and left alignment are unchanged. Existing bezels, grid, curve glow and AUTOMATE overlays follow the taller screens. The expanded view retains the original 90px grid-row minimum so the knobs do not recenter.

Changes: `src/envelope-screens.css`, build inclusion and generated HTML. No production JavaScript, DSP, MIDI, gesture engine, patch or sequencing changes.

Chromium validation at 1920 and 1280 widths passed exact section/knob geometry comparisons, unchanged screen widths, increased depth, aligned short headers and contained screen bounds. Expanded-view geometry also matched. Direct envelope-point dragging, automation recording and audible output passed without page errors. Screenshot reviewed. Physical Windows/tablet testing not performed.

Rollback: Site v67, development commit 623ea2b and checkpoint/pre-deeper-envelope-screens-2026-11-09.

Trace refinement: ADSR curves now fit their full duration into the display with equal endpoint margins. The editor freezes the matching full-duration scale during a drag and maps pointer positions through the actual SVG transform, avoiding a grab jump. Oscillator, LFO, EQ and filter traces extend slightly beyond the glass area and are cropped at its sides. Their horizontal plotting inset is removed; automation overlays keep their top/bottom reserved space. No DSP timing or envelope sound parameters changed.
