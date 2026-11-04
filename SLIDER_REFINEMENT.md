# v0.5.1 slider, sound-range and button refinement

The user found Age/Thickness too subtle and requested filled tracks, moving Thickness below Age, reverb labels, rubberised buttons and octave ordering.

The static fill fault was a refresh-path bug: the presentation scheduler queued its original closure, bypassing the later refinement hook. Normal input/change events now call the current refresh hook. This fixes fill tracking from actual gestures, patches and MIDI changes, and also keeps refinement labels/link states current. The thin2px background-line override is superseded by a full-height green-left/dark-right gradient on all horizontal sliders. No fixed green line remains in Velocity.

Thickness reuses its original input/patch parameter and is directly below Analog Age in VOICE. The panel dimensions and keyboard/wheel behaviour remain unchanged. EQ retains its two gains and logarithmic frequency controls.

Analog Age uses a stronger upper-range curve: `strength=4*(Age/100)^1.5`, cached on the existing control clock. At25% it retains the previous subtle strength0.5. At50% strength is1.414, at75%2.598, and at100%4. Maximum100% additional micro-drift is±12cents per oscillator, stable tuning±8cents, cutoff±8%, attack/decay timing±12%, and per-voice gain±2dB. Zero remains neutral and phase continuity is preserved. No per-sample allocations or additional voices are introduced.

Thickness now raises the existing OSC2 companion by up to0.45 times the positive OSC1/OSC2 level difference, retaining power compensation. For non-UNISON patches with OSC1 present it can extend existing OSC2 detuning to12cents, preserving its sign; it does not add that detuning in UNISON or scale Analog Age drift. Shared fixed stereo side strength rises from0.18 to0.30, with matching power compensation. It still uses the same712-byte buffers at48kHz. Zero remains neutral. This is a stronger oscillator/phase effect, not a master-volume or EQ boost.

Reverb button labels are MOD HALL and SPRING with unchanged algorithm values. OSC2 octave buttons are−1,0,+1. All application buttons, including HTML BUILD, have restrained rounded corners and matte rubber-like shading; selected-state illumination is retained. Keys and slider caps keep their own geometry.

Validation includes full regression, a new actual-input fill test at0/25/80/100%, placement/labels/order/radius checks, both target viewport sizes with keyboard visible/hidden, and refreshed controlled audio examples. Human listening/perceptual preference and physical hardware remain unverified; users can audition the rendered examples and playable synth.

Rollback: `rollback/pre-slider-refinement` preserves the previous working build. No main merge.
