# Hardware-realism visual pass

Continued on `codex/controller-workflow-v0.7` from verified checkpoint `2531bed10f8a0d943faf59e949a93a938c5f3cf0`. Image1 is the material/appearance target; Image2 and the existing code remain the functional authority.

| Supplied mockup direction | Implemented treatment |
| --- | --- |
| Unified physical cabinet | Rounded dark-metal shell, bevelled end edges, header extrusion and grounded shadows |
| Recessed sections | Shared panel rims, inset control wells and restrained highlights |
| Physical rotary controls | Shared shaded SVG bodies, reflective rim, bright pointer and original teal/magenta/amber accents |
| Faders and switches | Recessed tracks with retained coloured value fills, moulded caps, tactile button faces and truthful illuminated selection/on states |
| Electronic displays | Recessed bezels, dark green glass, retained grid/trace colours and responsive data |
| Piano keyboard | Shaded ivory faces, dark raised keys, front lips, contact shadows and retained active-note indication |
| Typography | Existing embedded licensed fonts retained, engraved-style contrast and consistent headings |

The result follows the mockup's cabinet and material treatment while preserving the denser working layout and all controls. It is not a pixel-identical reconstruction: the mockup shows additional wheels, a12-voice label and unsupported features. These were not substituted for the actual single-timbre/eight-voice architecture. The original playable C3–C5 range, all displays, independent XY pads, real draggable envelopes and expanded keyboard-hidden mode remain.

`src/hardware.css` is the reusable visual layer; build.cjs embeds it into the same standalone HTML. Only the existing SVG paint gradients also changed. All14 functional script bodies and156 input/select/button tags—including identifiers, ranges and defaults—are byte-identical to the baseline. No audio/MIDI/patch/ownership/layout logic changed.

Visual QA uses matched baseline/current1920×1080 screenshots plus both keyboard states at1920×1080,1600×900 and1280×800. Existing regressions cover Worklet/fallback audio, polyphony, oscillator/filter/envelope/effects/routes, XY/patch/MIDI/HOLD, touch simulation and keyboard continuity. A decorative border initially overflowed the keyboard panel; restoring its original dimensions fixed it. A waveform assertion now waits for the rendered selected state instead of an arbitrary35ms delay.

See reports/hardware-comparison.html and tests/hardware-results.json. Real KeyLab25/Windows/tablet tests are unverified. ARP/automation stay visibly unimplemented. Actual live-host QA may remain blocked by the execution environment's destination policy; deployment success and local tests are reported separately in HOSTING.md.
