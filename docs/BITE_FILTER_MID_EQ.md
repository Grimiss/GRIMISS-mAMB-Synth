# Filter, EQ and slider refinement

The Filter panel is 441 logical pixels wide (formerly 510). EQ begins at x=914, aligned to LFO 1, and is 325 pixels wide (formerly 256). Their height and combined outer extent are unchanged. Other section geometry is untouched. Filter controls run left-to-right: five narrower type switches, large Cutoff, Resonance, smaller EG Intensity and Key Track, then a taller 177px-wide screen under a shortened header fill.

BITE follows the two LPF switches. It is an original MS-20-inspired two-pole resonant filter with saturating positive band feedback and two internal substeps. It is not a circuit-exact or hardware-measured MS-20 emulation. The plotted response is an approximate small-signal illustration; nonlinear resonance/drive depends on signal level. Only the Bite path incurs its additional processing; existing modes retain their previous equations and state indexing. The new mode uses the shared voice allocator and existing filter-mode crossfade. No second engine is introduced.

EQ now has shorter FREQ sliders at its ends, with Low Gain, MID and High Gain between. MID is a 1kHz bell, Q=0.8, ±12dB, default zero. Coefficients update through the existing smoothed effects control clock; neutral MID bypass preserves old output exactly. Inactive states are cleared to prevent stale-state reactivation. The response display includes all three bands. New parameters and filter choices use the existing patch-schema and MIDI-target discovery; older patches default MID to zero. The five-choice filter selector necessarily has an expanded MIDI selection range; stored filter names remain compatible.

Arp Gate uses the same 3px recessed slot and 15×12px physical cap treatment as Voice sliders. Mixer caps are all 26×16px with the same material turned through 90 degrees and a horizontal centre stripe. Mixer, Analog Age and Thickness fills use the printed teal colour #426D66. Hit regions, travel and source parameter IDs are preserved.

Validation:

- Deterministic 44.1/48/96kHz comparisons: existing four filter modes and neutral-MID effects/EQ output are bit-identical to rollback samples.
- Bite is audible and distinct, finite and bounded through resonance extremes, cutoff/mode sweeps and note release.
- MID centre-frequency gain, out-of-band selectivity and rapid gain changes pass measured audio checks.
- Existing audio, ownership/modulation, arpeggiator and effects suites pass, including long-release/HOLD/Panic and sustained stress checks.
- Chromium at 1920/1280 widths: control order, panel alignment, compact gain-label containment, cap size/material/fill, Gate and FREQ keyboard input, filter gesture recording, audible output, patch round-trip and legacy MID-zero restoration pass. All 100 factory patches load.
- Screenshots reviewed. No physical Windows/tablet test or MS-20 reference recording comparison performed.

Changed sources: synth.js, effects.js, interface.html, interface.js, refinements.js, reference-layout.json, generated midi-targets.json, filter-eq-refinement.css and build inclusion; new DSP/browser tests and generated HTML/review artifacts. No SEQ/MIDI clip or gesture format migration.

Rollback: Site v69, development commit 1b1517d, checkpoint/pre-bite-mid-eq-layout-2026-11-09.
