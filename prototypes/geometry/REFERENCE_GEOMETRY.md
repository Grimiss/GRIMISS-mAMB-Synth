# Measured reference geometry — approval checkpoint

Reference:1280×640(2:1); native-pixel edge inspection, ±2px boundary uncertainty. Percentages are of the entire reference image. Working synth/DSP/MIDI unchanged.

|Section|x%|y%|width%|height%|
|---|---:|---:|---:|---:|
|outer_cabinet|0.000|0.000|100.000|100.000|
|header|2.344|0.156|95.391|7.812|
|control_surface|3.203|8.438|93.750|66.406|
|keyboard_housing|1.797|75.938|96.484|23.281|
|controller_bay|1.797|76.719|19.375|22.031|
|reference_key_bank|21.406|78.438|74.453|19.844|
|pitch_wheel|4.453|80.781|2.656|15.781|
|mod_wheel|8.594|80.781|2.656|15.781|
|octave_controls|13.516|80.938|6.250|11.719|
|voice|3.359|8.750|17.188|24.688|
|oscillators|21.016|8.750|25.234|24.688|
|mixer|46.797|8.750|12.031|24.688|
|lfo1|59.375|8.750|12.422|24.688|
|lfo2|72.266|8.750|12.500|24.688|
|xy_automation|85.234|8.750|11.562|24.688|
|filter_envelope|3.359|34.375|37.422|14.688|
|filter|41.172|34.375|35.156|14.688|
|eq|77.578|34.375|19.219|13.438|
|amp_envelope|3.359|50.000|32.812|13.125|
|amp|36.562|50.000|12.578|13.125|
|mod_fx|49.609|50.000|14.766|23.906|
|virtual_patch|64.766|50.000|20.000|23.906|
|arp_step|85.234|50.000|11.562|23.906|
|delay|3.359|63.906|22.812|10.000|
|reverb|26.641|63.906|22.500|10.000|
|patch_lcd|48.984|2.188|18.750|4.219|
|lfo1_display|60.312|17.188|10.547|5.938|
|lfo2_display|73.203|17.188|10.547|5.938|
|filter_envelope_display|26.016|37.500|13.906|10.156|
|amp_envelope_display|21.953|52.969|13.203|9.375|
|voice_knobs|5.703|25.000|13.203|5.625|
|osc1_knobs|39.453|14.375|6.016|5.781|
|osc2_knobs|39.453|23.281|6.016|5.781|
|lfo1_knobs|61.641|24.219|7.969|5.312|
|lfo2_knobs|74.453|24.219|7.969|5.312|
|filter_envelope_knobs|5.625|38.438|17.891|5.625|
|filter_knobs|50.469|38.125|19.844|5.938|
|eq_knobs|80.859|37.969|13.047|5.469|
|amp_envelope_knobs|5.625|54.062|16.172|5.469|
|amp_knobs|37.969|54.062|9.531|5.469|
|mod_fx_knobs|50.547|59.844|12.969|5.469|
|delay_knobs|12.812|66.562|9.531|4.844|
|reverb_knobs|36.719|66.562|9.922|4.844|
|osc1_slot|48.750|14.062|0.547|15.469|
|osc2_slot|52.500|14.062|0.547|15.469|
|noise_slot|56.094|14.062|0.547|15.469|
|osc1_cap|48.281|17.344|1.719|1.875|
|osc2_cap|51.953|19.219|1.719|1.875|
|noise_cap|55.625|21.094|1.719|1.875|

## Decisions requiring approval

- The reference shows27visible white fronts; the working keyboard has15whites/10blacks, MIDI48–72. Proposed538px active bank matches measured34px faces/36px pitch/125px length inside953px key-bed opening, leaving207.5px at each side. No fake keys, added pitches or remapping.
- EQ246×86px keeps all4existing controls;232×17overview plus proposed full-response DETAILS view. Approval needed before reducing the live main graph. A persistent graph in a blank keybed end bay is an alternative requiring a collapse/redocking decision.
- Additional OSC/filter/modulation plots,3LFOcontrols/5shapes,5delay/reverbcontrols and both XY grids need the explicitly listed compact arrangements in functional-fit.json.
- No hidden-mode reference exists; its expansion is derived, with fixed header and preserved control aspect ratios.

**STOP: geometry checkpoint only. Do not implement or style the working instrument until user approval.**
