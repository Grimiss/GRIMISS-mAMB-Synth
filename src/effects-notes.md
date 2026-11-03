# v0.6 original stereo effects design

`effects.js` exports the globals `MAMB_EFFECT_DEFAULTS` and `createMambEffects(initial, sampleRate)`. It has no Web Audio, UI, DOM or external-library dependency. The instrument feeds the combined mono synth at unity master into this single stereo chain, then applies user master/pan at the output. Effects are not instantiated per synth voice.

API: `setParameters(partial)`, `process(inputL,inputR,outputL,outputR)`, `panic()`, `snapshot()`. Matching-length typed-array stereo blocks support in-place processing. Parameters use physical units (Hz, seconds, dB, and normalised gain/depth) and are finite-checked/clamped. All effects default OFF and flat EQ/centre pan/master100 preserve the normal-range dry input sample-for-sample.

## MOD FX

- **CHORUS / FLANGER**: two interpolated short-delay buffers, quarter-cycle stereo LFO offset and bounded feedback. Increasing feedback shortens base delay from approximately16.7ms towards0.7ms; depth controls excursion up to85% of base. This deliberately covers chorus to flanging without an additional hidden mode.
- **ENSEMBLE**: three delay taps per channel at12/19/26ms; independent phase/rate multipliers0.83/1.06/1.29, decorrelated stereo offsets and averaged, bounded feedback. This is an original multi-tap ensemble, not a copied BBD model.
- **PHASER**: six first-order all-pass stages per channel, swept over approximately180Hz through several octaves with staggered stage frequencies. Stereo sweep offsets and bounded loop feedback. Filter coefficients are refreshed every16frames; all-pass states are sample-rate. The half-dry/wet signal produces real spectral cancellation/notches.

Algorithm gains crossfade with a12ms one-pole transition. Short-delay storage is shared by chorus/ensemble; the phaser uses separate, preallocated all-pass states. Bypass gates off new excitation and permits the remaining network tail to decay before suspending processing.

## DELAY

Two4.05second buffers, linearly interpolated fractional reads, damped feedback (fixed8kHz pole) and a maximum92% loop coefficient. TIME is25ms–4seconds; tempo sync resolves `60/tempo * division`, safely clamped to that range. Parameters slew20ms; read-time has a further12ms sample-rate ramp, avoiding a stepped16-frame read position. Large time moves intentionally create Doppler pitch movement rather than pitch-preserving time stretching.

- **STEREO**: independent L/R excitation and feedback, same requested delay time.
- **CROSS**: a sum/difference input transform feeds the cross-feedback matrix. A centred mono input excites L first, then alternates channels on subsequent feedback repeats. An asymmetric stereo input can excite both first echoes; it is not reduced to mono.
- **L/R**: independent loops with R at1.5×L time, subject to the4second bound. This ratio is an original approximation, not a measured microKORG mapping.

WIDTH applies a normalised mid/side mix to wet output;0 is mono,1 retains L/R separation. The dry signal is preserved. Bypass stops excitation while allowing delayed repeats to finish; an inactivity timer longer than the current inter-echo gap prevents premature suspension of long delays.

## 63_SPRING

A DC-compensated biased tanh input stage, controlled by DWELL, feeds six delayed all-pass dispersion stages at1.5/2.7/4.1/5.6/6.8/8ms. Small-signal slope compensation avoids merely increasing level as Dwell increases. A35Hz DC-removal pole follows excitation.

Three mismatched29/37/43ms resonator paths have internal low-pass damping, additional first-order all-pass dispersion and orthogonal3×3 Householder coupling. Decay gains are calculated from path length and requested RT60; the spring RT60 control is capped at8seconds. Differing positive output tap weights produce stereo resonant colour without relying on phase inversion alone.

This is an original dispersive resonator approximation intended to produce metallic, spring-like transient complexity. It is not a physical spring waveguide, a measured Fender6G15 impulse response, or Boss FRV-1 code/emulation. The supplied dispersion lengths were design starting points only.

## MOD_HALL

Eight staggered31.1–89.3ms feedback lines with Hermite/Catmull–Rom cubic fractional reads, early stereo all-pass diffusion and an orthogonal Householder feedback matrix `I - 2/N * 11ᵀ`. Per-line loop coefficients derive from `10^(-3 * delaySeconds / requestedRT60)`, capped below unity. Low-pass damping is inside the feedback loop.

Eight independently phased0.53–1.49Hz modulators and separately seeded, slowly smoothed random drift move line read positions by fractions of a millisecond. Four decorrelated output taps per channel provide width. Only the selected reverb is processed in steady state; both run during a short algorithm crossfade, then the retired network is logically reset and suspended.

This is an original FDN architecture inspired by the requested sonic description; it contains no Boss RV-5 algorithm, ROM or firmware. No hardware/reference-recording equivalence has been measured.

## EQ, safety and allocation

Two RBJ low/high shelving biquads (slope1) with sample-rate states and16-frame coefficient refreshes. Zero-gain shelves bypass exactly. Centre pan is unity on both channels; non-centre pan uses constant-power scaling. Master is applied after the effect chain. Internal feedback has an emergency bounded saturation branch; the final output has a±1 emergency ceiling. Normal synthesizer/effect levels should stay below these emergency guards; they are not a claim of transparent mastering limiting.

All delay/filter/modulation buffers are preallocated, approximately1.79MB at48kHz and proportional to sample rate. No per-sample objects or arrays are created. Numeric controls slew at sample rate only while moving. Derived constants are cached, and phaser coefficients refresh16frames. Delay rings use an age counter: logical reset invalidates prior cells in O(1), so neither panic nor algorithm switching fills large buffers in the audio callback. PANIC fades output over18ms, resets logical history/small states, then recovers over18ms for subsequent notes.

Snapshot allocations are diagnostic/UI operations outside the rendering loop. CPU/deadline behaviour must still be measured on actual browser/device targets. Objective impulse/response/stability tests do not replace listening tests or hardware comparisons.
