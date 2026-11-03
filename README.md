# GRIMISS mAMB Synth — v0.7

[Open the playable instrument](https://grimiss-mamb-synth-v05.bubbly-ray-9560.chatgpt.site), sign in if prompted and play a key. Audio activates on the first real key, touch or click; there is no Start Audio button. Browser autoplay policy can still require a gesture before MIDI-only performance. The owner-private Site and repository visibility are preserved. **HTML BUILD** downloads the standalone instrument.

**SELECT PATCH** opens 90 original factory patches in nine banks plus the USER save/select/rename/delete section. MIDI SETTINGS contains input/output/channel selection and the interactive original KeyLab25 map; Learn profiles persist independently of patches. AUDIO SETTINGS exposes supported output selection and explicitly enabled input monitoring (initial gain zero). Each XY pad has an independent assignment editor; assignments save with USER patches. HIDE KEYBOARD expands the instrument controls and graphs while retaining audio and active notes.

Both keyboard modes fit 1920×1080 and1600×900; scaled tablet browser layouts are tested separately from physical hardware. Factory and user patch serialization remains internal; permanent category/import/export controls were removed from the main surface. KeyLab25 physical CC verification remains pending; unknown controllers are deliberately unassigned. See [controller documentation](KEYLAB25_MIDI_MAP.md) and [standalone map](KEYLAB25_CONTROL_MAP.html).

The hardware-realism pass adds a shared dark-metal cabinet, recessed screens and panels, shaded knobs/faders, illuminated switches and physical piano-key finishes. Existing functionality and parameter ranges are preserved exactly. [Visual comparison](reports/hardware-comparison.html) · [Implementation notes](HARDWARE_VISUAL_PASS.md).

## Instrument

Single timbre, eight active voices, original PolyBLEP-style oscillators, four TPT filter modes, envelopes, two independent LFOs and four audible virtual-patch routes. MIDI devices/channels, pointers and typing keys own independent gates and controllers. HOLD ADD/REPLACE, last-note MONO/UNISON priority and PANIC retain the v0.5 behaviour. The same DSP factories run in AudioWorklet, ScriptProcessor fallback and offline tests.

Stereo signal path: **combined synth → MOD FX → DELAY → REVERB → EQ / PAN / MASTER**. Effects are shared across polyphony, not instantiated per voice.

- **CHORUS / FLANGER:** interpolated short delay, stereo LFO motion and controlled feedback; depth ranges into shorter flanging delays.
- **ENSEMBLE:** multiple decorrelated modulated paths with differing phases/rates.
- **PHASER:** six swept allpass stages per channel, with bounded feedback.
- **DELAY:** independent stereo, alternating cross-feedback or L/R timing ratio; up to four seconds, tempo divisions, width, feedback and mix.
- **63_SPRING:** original six-stage dispersive allpass excitation, three coupled/damped spring paths and biased/DC-compensated Dwell saturation. Dwell changes excitation/shape with gain compensation; Tone damps feedback; Decay controls feedback gains.
- **MOD_HALL:** original eight-line Householder FDN, early diffusion, Hermite delay reads, independent modulation/drift, feedback damping and decay-derived gains.

These are independently implemented sonic approximations, not measured Boss/Fender/Korg replicas. No proprietary code, ROM or manufacturer impulse responses are used. See `src/effects-notes.md` for the actual algorithms and parameter limits.

Each section has independent bypass/mix. Settings slew; algorithm changes fade. Bypassing stops new excitation while existing tails decay. Reverb switching temporarily overlaps two networks, then retires the previous one. PANIC fades over18ms and logically resets preallocated delay ages rather than clearing huge buffers. Emergency output limiting protects against runaway/non-finite audio; sensible factory patches stay below it.

## Controls and patches

Drag rotary controls vertically; Shift gives finer motion, arrow keys also work, double-click restores a control's initial value. Mixer faders are vertical. XY1 controls cutoff/resonance; XY2 controls reverb/delay mixes. Graphs represent the actual oscillator parameters, linear ADSR timing, selected LFO shapes, analytic TPT filter and EQ response. Routing traces/lines correspond to enabled engine routes. Automation recording and the arpeggiator are explicitly marked **NOT IMPLEMENTED**.

Play MIDI, the mouse/touch keyboard, or A/W/S/E/D/F/T/G/Y/H/U/J/K. HOLD ADD latches notes; HOLD REPLACE groups gestures within650ms. UNISON stacks four detuned voices, monophonically. Controller gates and sustain are scoped by device/channel. CC120 fades one source, CC123 releases it, disconnect affects its notes, and ALL NOTES OFF clears all voices/controllers and FX tails. Keyboard lights represent active gates, not released tails.

The five original factory patches remain. Five additional demonstrations are **Chorus Warmth**, **Ensemble Strings**, **Stereo Horizons**, **63 Spring Glass** and **Modulated Atmosphere**. The last includes four genuine modulation routes. Name/category/save work in browser-local storage. JSON import/export includes all synth, route, effect, bypass, mix, EQ, pan and tempo settings. Missing effect fields in legacy patches default to dry bypass. Saved patches stay in the current browser/origin; export JSON for backup or transfer. No cloud patch storage is claimed.

At full source/intensity, virtual patch depths remain +12 semitones pitch/OSC2, +0.4 pulse width, +4 cutoff octaves, +1 base amp gain or +50 noise units, with bounded combined values. LFO1 remains0.025–8.025Hz; independent LFO2 is0.005–8.005Hz. Their rates are free-running; effect delay offers tempo synchronisation.

## Source, build and tests

`src/synth.js` retains the v0.5 voice rendering algorithm. `src/effects.js` and `src/instrument.js` form the stereo chain. `src/adapter.js` handles browser/MIDI input, `src/patches.js` handles persistence, and `src/interface.html/js` contain the interface. `node tools/build.cjs` assembles one self-contained HTML, keeps the canonical historical filename and writes `dist/GRIMISS_mAMB_v0_7.html` plus SHA-256 manifest. Fonts are embedded with complete Orbitron OFL and Open Sans Apache-2.0 notices.

Node18+ runs `npm run test:all`: original baseline, diagnostics, legacy DSP/ownership/modulation, effects measurements, combined eight-voice stress/performance, preserved browser regressions and new UI/persistence/stereo/geometry checks. Browser tests need Playwright and Chromium (`CHROMIUM_PATH` may select it); the managed environment uses its preinstalled tools. Servers are loopback-only and stopped after each test. `node tools/effects-plots.cjs` regenerates measured decay graphics. Test JSON, figures and screenshots are committed; see TEST_RESULTS.md.

For developer/offline testing only, serve `dist/` through localhost or HTTPS for AudioWorklet. Fallback shares the same DSP. `file://` is blocked by managed Chromium policy and remains unverified. Actual Windows/tablet performance and physical MIDI/touch are not established by Linux viewport tests.

The original CONNECT screenshot remains the visual reference. v0.4/v0.5 fixtures preserve prior implementations. GitHub main and Sound Factory are untouched.
