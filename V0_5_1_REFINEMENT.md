Latest slider/sound follow-up: see SLIDER_REFINEMENT.md. Thickness now sits below Analog Age in VOICE; full-height green fills follow actual input, and the upper sound ranges are stronger. Earlier benchmark figures below describe the initial v0.5.1 checkpoint.

# mAMB v0.5.1 — targeted playable refinement

## Baseline and scope

Baseline is the actual playable Analog Engine v0.5 checkpoint (`71cefff`), with documentation HEAD `034e942`. Rollback tag `rollback/pre-v0.5.1` preserves that working history. The earlier `rollback/pre-analog-phase1` remains. Development stays on `codex/controller-workflow-v0.7`; no main merge.

The screenshots show the playable application, whose legacy app/download labels were v0.7, not the separate Reconstruction C prototype. C was deliberately an isolated approval study with local-only controls. Its cabinet/components had never replaced the working GUI; its notched keybed had also remained isolated. This checkpoint brings actual notched silhouettes into the playable keyboard as explicitly requested, alongside targeted control fixes. It does not apply the prototype's broad cabinet redesign. Prototype C remains available for future review.

## Controls and persistence

- ANALOG AGE moves the single original `analogCharacter` input from Audio Settings into VOICE, replacing the large SINGLE TIMBRE badge. There is one DSP parameter, one patch property and one MIDI target; no second analog engine. The same Phase 1 system and smoothing are retained, with the stronger upper-range curve documented in SLIDER_REFINEMENT.md.
- VELOCITY beside OCTAVE is `velocitySensitivity`, 0–100, default50. Amplitude follows a power-law response `rawVelocity ** (1.5*sensitivity/100)`. At0 the amplitude factor is exactly1; at50 it is a compressed/moderate power0.75; at100 it is power1.5. Zero-velocity MIDI note-on remains note-off. Raw velocity is retained for modulation routes. Changes update per-voice targets on the existing control clock and slew amplitude factors over approximately15ms; master volume is untouched. On-screen notes retain consistent full input velocity.
- THICKNESS is `thickness`, 0–100, default0. Both new parameters are clamped, smoothed and saved with USER patches. Legacy patches default to Thickness0/Velocity50; Analog Age retains its existing compatible property.
- LOW/HIGH GAIN remain rotary controls. LOW/HIGH FREQ use logarithmic view sliders but preserve the original authoritative Hz input IDs, ranges (80–1000Hz /1000–12000Hz), MIDI/patch mappings and EQ DSP. The logarithmic view elements are created after patch discovery and are not duplicate saved parameters. The response graph follows the real shelves; Thickness does not modify it.

## Thickness DSP and cost

The existing engine already renders OSC2 even when its level is zero. Thickness reuses that signal instead of adding oscillators or voices. It raises a quiet OSC2 companion by up to0.45 times the positive OSC1/OSC2 level difference, with equal-power level compensation. Additional static OSC2 detuning is bounded by `sign(existingDetuneCents or +1)*max(0,12-|existingDetuneCents|)` times Thickness, and is disabled in UNISON. This avoids stacking another fixed spread onto existing UNISON detuning and does not scale or duplicate Analog Age drift. Existing waveform, sync, ring, cross-modulation and oscillator pitch choices remain.

A shared, fixed stereo phase network adds modest width after the voice engine and before shared effects/EQ. It uses two short all-pass delay lines (approximately0.73ms /1.13ms, coefficient0.45), a midside contribution up to0.30, and power compensation. There is no periodic chorus LFO, extra timbre, voice duplication, oversampling, nonlinear filter model or supply sag. At48kHz the two buffers occupy712bytes total. They are allocated once. The network bypasses at settled Thickness0; there are no new per-sample allocations. Tiny all-pass memory is flushed below1e-24. PANIC clears its buffers.

At Thickness0/full note velocity, measured output matches the immediately preceding instrument within1e-6. Tests verify changed rendered oscillator/stereo audio in POLY/MONO/UNISON, unchanged voice counts, bounded loudness differences and finite output during rapid edits/long releases. These are audio measurements, not a claim that human listening established perceptual fullness. Controlled8-second stereo examples are supplied at `reports/v051-thickness-0.wav` and `reports/v051-thickness-100.wav`; effects are bypassed and the other patch/notes/seed are identical.

## Wheel fault diagnosis and fix

The old transparent vertical native range relied on browser dragging conventions. Real touch testing reproduced native touch-end handling overwriting the custom value (0.700 became0.921). MIDI messages also changed the engine without updating the wheel graphics, and treating the displayed MIDI value as local state risked echo/double application. Finally, local-only controller sends did not bend notes already held from MIDI.

Captured explicit vertical Pointer Events now drive a separate local state. Native pointer/touch defaults are suppressed; upward dragging increases pitch/depth. Pitch springs back on release, cancellation, capture loss and focus loss; MOD retains its position. Existing keyboard range interaction remains supported. Accepted MIDI bend/CC1 events update the visual drum without sending an engine echo.

An explicit on-screen gesture controls a separate global performance layer. Effective bend is the bounded sum of the owner's MIDI bend and the on-screen contribution (total±2semitones). Effective wheel depth is the maximum of owner CC1 and the global MOD setting, so they do not double vibrato. Pitch release restores the owner's original bend; lowering global MOD reveals the retained owner CC1. MIDI controller values remain device/channel-owned. The single displayed wheel follows the latest accepted external input while idle and switches to its local contribution when explicitly dragged; one visual cannot simultaneously represent all channels.

Default MOD uses LFO1 pitch vibrato (up to±30cents). An explicit LFO1/wheel-to-pitch virtual patch takes priority over that fallback, with a smoothed gate, avoiding duplicate built-in vibrato. The four-route modulation engine itself is unchanged.

## Targeted interface changes

- Dedicated buttons cover every existing VOICE, OSC1/2, LFO1/2, filter, reverb, delay, MOD FX, OSC2 octave and sync option. Hidden authoritative selects retain bindings/values; redundant dropdowns are absent from view/focus. OSC/LFO names update from real selected values. No algorithms were invented or waveform options dropped.
- LINK1–4 buttons replace visible checkboxes/separate link numbers. Disabled buttons are grey; enabled buttons use green/amber/pink/cyan. Sources/destinations remain readable while disabled. Decorative curves are removed; the functional monitor and route processing remain.
- Remaining selects have dark green native controls/options. Supported Chromium uses the customisable native `base-select` picker for consistent dark popup surfaces, light text, green selection, keyboard/focus and disabled states. Older engines retain a dark native fallback. Actual Windows/Edge system behaviour remains physically unverified.
- Header actions use aligned rows without changing the51-unit header rectangle; essential performance controls remain visible. Knob/fader labels move up into the space freed by removed numbers. No permanent numeric readouts or key names are reintroduced.
- EQ remains256×94 units, with its live graph, two gain knobs, two frequency sliders inside the existing boundaries; Thickness is directly beneath Analog Age in VOICE. The accessible detail view retains the same original nodes and larger graph.
- The37-note C3–C6 keybed now has real stepped white-key clip paths, raised black faces and correct E–F/B–C gaps. Note IDs, MIDI mapping, mouse/touch ownership, highlights, octave controls and hide/show remain. Printed key names and the wheel-bay instruction text are removed. The existing wheel housing is preserved.

## Validation and deliverables

The complete regression suite includes the existing audio/ownership/modulation/filter/aliasing/envelope/factory/effects/MIDI/patch tests, plus:

- `tests/refinement-dsp.cjs`: preceding-engine neutrality, real Thickness audio/stereo and level changes, all modes/voice counts, power-law dynamics/raw route velocity, smooth rapid edits, source routing priority and v0.5 CPU comparison.
- `tests/wheels-v051.cjs`: actual mouse drags, CDP touch drags/cancellation, ±2-semitone frequency measurements in all modes, retained MOD/LFO1 trajectories, MIDI graphics without echo, on-screen gestures affecting held MIDI, restoration of original owner states and finite actual output.
- `tests/refinement-ui.cjs`: all button options, four real links, log frequency/response, unchanged EQ curve under Thickness, patch persistence, header pairwise overlap checks, real dark popup keyboard navigation/contrast and30notch hit regions.
- Existing UI checks cover1920×1080 and1600×900 visible/hidden, plus1280×800 and fallback processing. No full prototype rollout is implied.

Offline CPU measurements use the immediately preceding Phase 1 engine/instrument, not the older pre-analog engine:48kHz,128-frame callbacks, two rendered seconds per run, four measured runs after warm-up, interleaved configurations. These are Linux/Node throughput measurements with timing variance, not physical-device deadlines or dropout rates. Final figures are in `tests/refinement-dsp-results.json` and the hosted review report.

Physical MIDI/KeyLab25, Windows/tablet hardware and human listening are unverified. Production deployment status is reported separately from local browser QA; the configured execution proxy has historically blocked the live host.

Modified files: `src/synth.js`, `src/instrument.js`, `src/adapter.js`, `src/physical-controls.js`, `src/interface.html`, `src/interface.js`, `src/workflow.js`, new `src/refinements.js`/`.css`, build/MIDI-target generation, generated standalone/MIDI-map artifacts, regression tests/fixtures/results and development documentation. `src/effects.js`, the approved coordinate model and the standalone prototype are preserved.

## Final measured results

| Scenario | Median ms / 2 rendered seconds | Change versus matching v0.5 mode |
| --- | ---: | ---: |
| v0.5 baseline | 242.20 | +0.0% |
| v0.5.1 neutral | 256.63 | +6.0% |
| v0.5.1 thickness100 | 259.42 | +7.1% |
| v0.5 baseline UNISON | 130.83 | +0.0% |
| v0.5.1 thickness100 UNISON | 130.00 | -0.6% |

The neutral/full-Thickness eight-voice runs add approximately6–7% to the immediately preceding v0.5 render time. UNISON is effectively unchanged within timing variation. No claim of physical-device deadline/dropout validation is made.

Measured Thickness level changes in the test patches: POLY−0.544dB, MONO+0.121dB, UNISON+0.132dB. Voice counts remain8/1/4. Hard/soft-note RMS ratios at input velocities1.0/0.2 are1.000,3.329,11.126 at sensitivity0/50/100. All complete regression checks passed. Actual opened-picker navigation and non-default USER save/browser-reload checks also passed.
