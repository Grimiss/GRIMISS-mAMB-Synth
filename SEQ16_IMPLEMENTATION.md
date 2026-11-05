# SEQ-16 integrated development

## Audit and rollback

Authoritative branch: codex/controller-workflow-v0.7. Known working source ffb3d5b; tag rollback/pre-seq16. Hosted version 25 remains the known-working production checkpoint during development. No main changes.

Existing integration points: adapter.js owns Web MIDI and forwards per-source events; synth.js owns one eight-voice timbre and route smoothing; instrument.js owns the shared effects and sample-frame arpeggiator; patches.js owns legacy/user patch serialization; coordinate-layout.js/reference-layout.json own upper geometry; physical-controls.js/refinements.js own the existing keyboard, wheels and notches.

## Controlled implementation

- A: audited/checkpointed the existing instrument.
- B/C: lower housing has backface-hidden rotateX faces, a dedicated toggle and 16 shared tracks, two independently addressable handles per track, explicit non-destructive link editing and per-step rhythm editing.
- D/E: sequencer.js supplies two sample-frame clocks and the six arp transforms. instrument.js orchestrates events through the same synth and effects. Generated sources bypass HOLD/sustain capture while physical inputs retain ownership. Slide uses the existing voices' oscillator frequencies; it adds no oscillator/timbre.
- F: additive seq16 patch data and browser-local session/view persistence. Runtime playheads and RUN are not restored automatically. Existing patches initialize safe sequence defaults.

Upper coordinates and surface artwork are preserved. Only the lower-panel wrapper/toggle and its reverse face are new. The upper arp section is not redesigned. Functional verification and publication details will follow in the final checkpoint.

## Completed controls and behaviour

KEYBOARD / SEQ-16 sits at the top-right of the existing lower housing. Rotation is 580 ms around X, with hidden/inert opposite faces and reduced-motion support. Both faces remain 1235 x 149 logical pixels. Sequence transport is independent of visibility/collapse.

Each of 16 slots has a left pink grip and right green grip on one shared recessed track, so both are reachable at overlap. Drag, arrows, Home/End, Page keys, wheel and multitouch edit separate values. Select a step using its number; LINK is an explicit edit mode, not a clock link. Toggling LINK does not change values; subsequent edits align both. The step editor supplies REST, ACCENT, probability and per-step gate multiplier.

Pitch spans -12..+12 semitones around ROOT MIDI, quantized, with 1–16 steps, forward/reverse/pendulum/random, whole through 32nd notes plus dotted/triplet rates, gate, velocity, glide and separate reset. Drift has independent length/direction/reset, sync or free 2–1800 seconds per full cycle, step/smooth/ease interpolation, amount, bipolar/unipolar mapping, OFF/LOW/MED/HIGH seeded variation and 17 real synthesis/effects destinations. Active-step edits update its live modulation without waiting for the next cycle. Base patch values are not rewritten.

All six modes are live: TRANSPOSE adds semitones to newly generated arp notes; ARP + DRIFT leaves pitch stored; ARP GATE samples step rests/gate/accents/probability; POLYMETRIC advances one pitch step per selected number of arp events; ARP ECHO adds independently owned notes to the same allocator; ARP DRIFT changes gate, generated octave displacement, probability or paired timing swing at note boundaries. These modes do not add another timbre. Combined operation requires the existing upper arpeggiator to be enabled; otherwise the panel explicitly asks to enable it. Ordinary standalone SEQ and ARP remain available.

RUN resumes sequencing, STOP releases SEQ-owned notes while the ordinary arp/manual inputs remain available. RESET restarts the layers; RESET P/D reset only their layer. PANIC stops sequencing and clears all voices and held/controller states. Physical MIDI and its controllers remain active in either view.

Patch exports and USER saves contain additive seq16 data, including all arrays, link/rhythm settings, seed and mode. Legacy patches initialize safe defaults. Session config/view persist locally; transport/playhead positions do not auto-resume after reload.

## Verification

- New engine tests verify precise notes/gates, all six modes, polymetric ratios, independent clocks, deterministic variation, active drift edits, glide audio, block-partition invariance and real nonzero bounded audio.
- Stability tests cover all 17 destinations, audible cutoff changes, return to base values, audible accents with physical velocity sensitivity at zero, and 60 seconds of wet POLY/MONO/UNISON with live mode switches and long releases.
- Real Chromium tests cover 32 independently addressable handles, overlap, linked edits, real mouse/wheel/keyboard and two simultaneous touch contacts, six visible mode choices, step gate editing, audio continuity through repeated flips, synthetic MIDI in both faces, persistence, reduced motion, STOP/PANIC and both Worklet and fallback.
- Screenshots and containment checks: 1920x1080 and 1600x900, keyboard and SEQ visible, plus existing lower-panel collapse. Upper panel bounding boxes are unchanged by the flip.
- Existing audio, ownership/modulation, effects, instrument, analog, refinement DSP, arpeggiator, workflow, 100-patch rendering/contrast/PANIC, keyboard browser, MIDI registry and header regressions passed.

Historical photo-finish/mechanical-artwork suites target superseded visual branches. This build uses the restored-design suite plus `npm run test:seq16`; those historical source files/tests remain preserved.

## Practical limits

Local Node/Chromium verification is not physical Windows, controller or tablet testing. Browser policy blocks file:// browser automation here; hosted HTTP Worklet and fallback were verified locally. Background audio remains subject to browser/OS suspension policy. CPU figures are shared-host offline rendering measurements, not a device guarantee. Destination choices deliberately exclude unsafe/discrete synthesis algorithms; ARP drift exposes four proven event-boundary targets. The existing step-sequencer status line now points to the active lower SEQ-16; no separate second synth is created.

## How to play

1. Open the existing mAMB link, then press KEYBOARD / SEQ-16 in the lower housing.
2. Choose any patch, edit pink/green grips and press RUN. Both layers run independently; green defaults to a slow 12-minute full cycle.
3. For combined modes, enable ARPEGGIATION ON above, play/hold a MIDI or typing-key chord, enable ARP + SEQ below and choose one of the six modes. ROOT sets the independent SEQ notes in ordinary/echo operation; transpose/poly use relative offsets.
4. Select a step number for REST, ACCENT, probability and gate edits. Save a USER patch or export normally to retain the sequence. STOP leaves manual/ordinary arp operation available; PANIC is global recovery.

Final local CPU sample (48 kHz, 128-frame blocks, median of three measured two-second renders after warm-up): [{"case": "SEQ stopped, ARP+FX", "renderedSeconds": 2, "medianMilliseconds": 447.69814699999915, "renderToRealtimeRatio": 0.22384907349999958}, {"case": "SEQ pitch+drift+ARP+FX", "renderedSeconds": 2, "medianMilliseconds": 974.0712070000009, "renderToRealtimeRatio": 0.4870356035000004}]. These are offline shared-host CPU ratios; the active case includes additional SEQ notes, drift and effects rather than an identical voice workload.

## Delivery files and checkpoint

New modules: src/sequencer.js, src/sequencer-ui.js, src/sequencer.css. Integration: instrument.js, synth.js, adapter.js, patches.js, the upper status text in interface.html and tools/build.cjs. Automated coverage: tests/sequencer.cjs, tests/sequencer-browser.cjs and tests/sequencer-stability.cjs. Existing tests/results, continuation, roadmap and development logs updated. Both standalone HTML aliases are byte-identical.

Code checkpoint dc3d327 on codex/controller-workflow-v0.7; published Site version 26, source 63425ab328c71b666999b98a5c03d8e445c46275. Main unchanged. The saved version 25 is recoverable. Play on the same URL; review screenshots and test artifacts at /reports/seq16-review.html.
