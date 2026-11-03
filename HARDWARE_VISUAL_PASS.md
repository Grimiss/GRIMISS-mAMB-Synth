# Corrective physical reconstruction

The previous border/finish-only pass was **not accepted**. This checkpoint supersedes it with new control geometry, cabinet layout and keyboard construction, using the original GRIMISS mockup as the appearance reference and the working v0.7 instrument as the functional authority.

## Staged browser validation

1. Built one cylindrical rotary control, one recessed physical fader and one cabinet panel with a screen. Captured and inspected reports/hardware-component-study.png before applying the components.
2. Replaced every rotary graphic through the shared tools/hardware-components.cjs generator: separate crown/rim, ribbed cylindrical sidewall, indicator, directional lighting and contact shadow. Native parameter inputs remain the sole interaction controls.
3. Built separate recessed fader wells, rulers and extruded caps. The original inputs drive cap position through the existing value variable.
4. Reconstructed panel geometry: larger rotary bodies, horizontal envelope control banks beside compact live graphs, a single-row five-control delay bank and a deeper integrated keybed. Cabinet cheeks and bevels now surround a continuous metal deck.
5. Increased keyboard bay from134 to210logical pixels and keyboard height from81 to143. Preserved C3–C5 default notes and correct black-key positions. Added real pitch/mod wheels and octave buttons using the existing source-scoped controller/note APIs.
6. Captured visible/hidden views at1920×1080 and1600×900, inspected all four full-screen screenshots and real knob/fader/cabinet/keybed close-ups. Iterated on label clipping, a decorative border and delay switch positioning until boundary checks returned no failures.

## Comparison with the original mockup

| Criterion | Reconstructed implementation |
| --- | --- |
| Cabinet depth | Thick end cheeks, metal edge bevels, continuous recessed deck and deeper integrated keyboard housing |
| Knobs | New crown, cylindrical ribbed sidewall, pointer, rim and base geometry throughout; larger principal envelope/filter/amplifier controls |
| Faders | Separate physical caps and recessed tracks/rulers, driven by actual parameter values |
| Buttons | Raised faces, lower extrusion and illumination tied to actual selected/on states |
| Keyboard | Deeper key faces/front lips, raised black keys, separation/contact shadows and working ribbed pitch/mod wheels |
| Displays | Compact recessed bezels while retaining every oscillator/LFO/filter/EQ/envelope/modulation graph and both interactive XY pads |
| Overall relationship | Physical controls and keybed now dominate the instrument's hierarchy, following the reference's dark charcoal/green/teal construction with retained magenta/amber accents |

The complete working layout remains denser than the mockup. The default playable range and eight-voice architecture are retained; no mockup12-voice claim or invented ARP/automation behavior was introduced. Visual acceptance remains the user's judgment; the component study, actual full-screen captures and close-ups are provided for that review.

## Functional preservation and additions

All14existing functional script bodies and156original input/select/button definitions remain identical to the verified v0.7 baseline, including ranges/defaults. DSP is unchanged. One additional UI module, src/physical-controls.js, connects four requested performance widgets to existing APIs. Local octave changes release their note owners before transposition; MIDI note numbers remain independent. Highlights track transposed notes. Pitch spring return and PANIC reset are tested. Performance wheels are transient controllers, separate from saved synth patches.

Complete npm run test:all passed. Tests include actual mouse pitch-wheel return, controller values reaching voices, octave ownership/highlights, hidden-keyboard MIDI continuity, all previous DSP/workflow checks and exact preservation guards. Software touch simulation is not physical device testing.

Review: reports/rebuild-comparison.html. Physical KeyLab25, Windows and tablet testing remains unverified. Actual live-domain browser checks may be blocked by the execution environment's destination policy; see HOSTING.md.
