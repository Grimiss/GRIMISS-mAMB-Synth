# Expressive sound and mechanical control follow-up

This completes the user's request after the preceding Age/Thickness range increase was still too subtle. Rollback tag `rollback/pre-expressive-controls` preserves the preceding working source. The same development branch and single-timbre/eight-voice architecture are retained; no main merge.

## Sound changes

Analog Age now changes tonal character as well as component variation. Its existing drive stage receives up to four additional drive units, capped at the previous drive range maximum11, so there is no new nonlinear filter model or additional per-sample waveshaper. A cached transfer estimate compensates level; the Age test's RMS changes by about0.5dB between endpoints while its third-harmonic/fundamental ratio rises from0.083 to0.274. A smooth tonal bias reduces the filter's base calibration by up to22%, alongside the retained slow independent drift/tolerances and a small independent slow flutter (up to3cents). Existing drive/cutoff controls remain authoritative base settings. The filter display remains a base-control response excluding modulation/calibration. Age0 remains neutral.

Thickness no longer relies mainly on quiet OSC2 balance and stereo phase differences. It retains its existing oscillator blend/static detune but adds one shared micro-detuned ensemble after the voice mix. Two pitch-shifted read paths use crossfaded delay heads in an8192-byte shared circular buffer at48kHz (no extra voice engine or timbre). Detuning is±9cents in POLY/MONO and±4cents in UNISON; wet depth reaches0.9 with power compensation. There is no periodic pitch-wobble LFO; read-head resets are crossfaded. Parameter changes use the existing smooth control path. The dry path stays immediate; no new latency is added to it. Thickness0 bypasses the ensemble, and PANIC clears its memory.

The new sine test verifies a substantial change even after stereo is folded to mono and RMS-normalised: approximately0.62 normalised difference in POLY/MONO and0.56 in UNISON. This is evidence of changed audio content, not a human listening claim. Its measured mono level changes are approximately−1.70dB/−1.70dB/−0.27dB in those modes. All voice counts remain unchanged. Refreshed controlled examples are provided for Age0/100 and Thickness0/100.

Velocity defaults to0 in the engine, interface, factory/default patches and legacy patches without an explicit setting. Explicit values saved in USER patches continue to recall. Raw incoming velocity remains available to modulation routes.

## Visual changes

All OSC1/OSC2 waveform switches use the same22×17 native geometry, including DWGS switches. Selected edges use a2px illuminated border and stronger glow; the icons receive thicker, colour-matched strokes and glow.

The wheels no longer translate their entire drum. Each drum projects36 ribs around a cylinder: sine determines position, cosine determines visibility/foreshortening, and a fixed shell mask occludes the top/bottom. The index rib moves into the shell as the wheel turns. This presentation applies to mouse/touch input and accepted MIDI visual feedback, preserving pitch spring return and retained MOD position. Input/audio controller ownership logic is unchanged by these visual edits.

White-key cutaways are wider and deeper, with correctly traced edge rims. Each black key sits inside a31×89 dark recessed pocket around its25×79 body; the front floor remains visible below it. The exaggerated floating outer shadow is removed. Key note IDs,37-note range, E–F/B–C gaps, mouse/touch targets, highlights and collapse remain. The normal close-up and a diagnostic hiding black bodies are supplied; browser hit tests verify the actual cut-out regions.

The visible PLAY range heading is removed, retaining its hidden structural node for existing transpose code. The descriptive text below the pitch-drift controls is removed; the PITCH DRIFT knob label remains.

## Validation and boundaries

The complete `npm run test:all` suite passed after resuming the command that had been blocked by the temporary automatic-approval usage-limit failure. It includes new harmonic/normalised-mono sound checks, default-velocity checks and mechanical browser tests. Browser captures cover1920×1080 and1600×900, keyboard visible/hidden; every oscillator switch has matching dimensions, all37note IDs remain and30cut-out hit checks pass. Real wheel mouse/touch, MIDI, patch, DSP/effects and stability regressions remain covered.

The paired benchmark in `tests/expressive-performance-results.json` compares this processor with the immediately preceding slider build, warmed/interleaved,48kHz/128-frame blocks and four measured runs. It measures Node/Linux offline throughput, not physical Windows/tablet deadlines or dropouts. Human listening and physical MIDI/device validation remain unverified. The live host is not browser-verified from this execution environment; native publication status and local Chromium results are reported separately.

## Paired CPU figures

- POLY, Thickness0: previous281.9ms/current279.5ms per two rendered seconds (-0.8%).
- POLY, Thickness100: previous288.8ms/current272.6ms per two rendered seconds (-5.6%).
- MONO, Thickness0: previous41.5ms/current42.9ms per two rendered seconds (+3.4%).
- MONO, Thickness100: previous43.5ms/current46.4ms per two rendered seconds (+6.7%).
- UNISON, Thickness0: previous131.5ms/current135.4ms per two rendered seconds (+3.0%).
- UNISON, Thickness100: previous148.5ms/current160.1ms per two rendered seconds (+7.8%).

The small negative POLY changes are timing variation, not an established speed gain. Final full-strength MONO/UNISON increases were approximately6.7%/7.8%.
