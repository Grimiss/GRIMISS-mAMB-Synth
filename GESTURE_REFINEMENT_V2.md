# mikroSEQ — gesture refinement and oscillator/LFO layout

Checkpoint: `83b6c2b` on `codex/controller-workflow-v0.7`, tagged
`checkpoint/pre-gesture-refinement-2026-11-07`. One synth engine and the existing
reusable gesture engine remain authoritative. No multitrack or tablet work added.

## Recording and editing

REC arms the selected recorder without collecting points or waiting time. A press
anywhere in the writable plot starts the take at that exact X/Y location. Pointer
event timestamps determine duration; release finishes/disarms and starts looping.
Pointer capture handles releases outside the plot. Stationary held portions remain
in the path, with redundant samples compressed. Cancelling an arm does not replace
an existing path, and a take without meaningful movement cannot erase a valid path.
The empty editor has no forced midpoint marker.

CLEAR GESTURE is above the writable preview at the right. It removes only the
selected path/duration and stops that loop, retaining direction, transitions,
assignments, speed and SOFTEN. It is disabled for an empty recorder.

## Intensity and performance controls

Each of the 16 surfaces has independent SOFTEN (0–100%, default 0), synchronized
between popup and main panel. Influence is multiplied by `1 - soften/100` before
combining/clamping destinations. This operates in normalized parameter space,
including logarithmic frequency domains. A short 15 ms slew handles live influence
changes safely; no recorded points, speed, duration or playhead are rewritten.
At 100% the path/clock still runs and its amber indicator remains active.

Every eligible display has an always-visible GESTURE button, plus independent
PAUSE/PLAY and slim vertical line controls for SOFTEN and SPEED while enabled or
paused. The speed rail is logarithmic across the existing 0.01–2× range, with a
marked/snapping 1× position. Arrow/Page/Home/End keys and wheel adjustment work.
The popup retains FWD, BACK, PENDULUM, JUMP, SMOOTH and transition duration.

Only the GESTURE button opens the editor; ordinary scope clicks no longer do.
Existing direct ADSR-point and XY editing remain operational within the plot.
Active borders are solid amber; paused borders are dim amber. They persist when
the popup is closed and do not resize the displays.

There are 13 existing graphical surfaces: OSC 1/2, LFO 1/2, filter, filter/amp
envelopes, EQ, XY 1/2, automation, modulation visualizer and arp. MOD FX, delay and
reverb have no original main-panel scopes: their same independent controls occupy
compact section-edge/footer overlays, with their existing popup drawing surfaces.
No fake new scope or continuously assignable parameter has been invented.

## Live effective visuals

DSP snapshots expose smoothed effective gesture-controlled values. The main panel
uses those values for knobs, mixer caps/fills, EQ sliders, XY markers, oscillator
shapes, LFO plots, envelope diagrams and filter/EQ responses. Original input values
remain saved base settings; animation does not dispatch input events or rewrite
patch parameters. All simultaneous loops remain available without an arbitrary cap.

Audio retains its 64-sample gesture control cadence. Visible updates use the
existing 20 Hz telemetry rather than an audio clock derived from graphics. Only
changed controls/plots are redrawn; SVG plot elements are reused. Hidden-page redraws
are skipped, while audio clocks continue. Pausing holds that loop's playhead and
contribution; another source assigned to the same parameter can still influence
the combined result. Knobs represent effective global control settings, not a
single collapsed value for every polyphonic voice's envelope/calibration/LFO sum.

## Layout

Logical instrument dimensions remain 1280×640 and all upper section boundaries
retain their reference geometry. Both oscillator displays grow from 76×32 to
106×46 layout units. OSC 1 uses three columns of waveform buttons, moving the old
fourth button down; OSC 2 octave/sync groups narrow to reclaim display space.
Amber waveform names sit beside the OSC headings and follow the original selectors.

Both LFO button rows move up, names move to their right in amber, and screens grow
from 43 to 65 layout units deep, with knobs below. Expanded keyboard-hidden layouts
also retain their larger scopes. Chrome reserves a plot interior, keeping the
buttons/rails clear of the curve; pointer coordinates account for those insets.

## Storage, tests and files

SOFTEN is an optional field in the existing version-1 gesture document. Legacy
patches initialize it to zero; patch version 6 and the independent SEQ library are
unchanged. Paths and settings round-trip through patches/recovery drafts.

New tests: `tests/gesture-refinement-core.cjs` and
`tests/gesture-refinement-browser.cjs` (results alongside). Core checks cover
free starts, excluded waiting, independent intensity in linear/log domains, live
slew and legacy defaults. At 44.1/48 kHz, all 16 loops at 0% are sample-identical to
the checkpoint engine; at 100% they are sample-identical to unmodulated sound.
Browser checks cover all 16 surfaces, actual sound output, outside release,
closed-popup knob/fader/curve motion, synchronized controls, amber colours, Clear,
independence, unchanged saved values, desktop sizing/hit targets, no LFO/knob
overlap, keyboard-hidden layout and restart recovery.

Existing gesture core/audio/browser, 60-second simultaneous wet audio, all 100
factory-sound comparisons, SEQ/ARP, MIDI editor/core, workflow/ADSR/XY,
patch/recovery, compact telemetry, MS-08 and simplified sequencer checks pass.
Legacy tests were updated only for intentional pointer-up recording and plot insets.
Run `npm run build` and `npm run test:gesture-refinement`.

Changed: `src/gesture-core.js`, `src/gesture-ui.js`, `src/gesture.css`,
`src/interface.js`, `src/refinements.js`, `src/workflow.js`, `src/instrument.js`,
`src/synth.js`, `src/effects.js`, `src/sequencer-ui.js`, tests/npm script, standalone
HTML builds and manifest. Only read accessors were added to synth/FX DSP exports.

Known verification limits: automated desktop Chromium on Linux, not a native
Windows executable or physical MIDI device. Displays follow snapshots at up to
20 Hz, not sample accuracy. No claim of physical Windows audio-driver testing.
