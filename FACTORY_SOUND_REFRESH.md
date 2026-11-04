# Factory sound refresh

All90 factory names, numbers and categories remain stable. USER patch persistence, parameter IDs, approved layout and MIDI mappings are unchanged. OSC2 remains within its implemented saw/pulse/triangle choices. Automated recall checks compare every declared factory parameter with its browser-resolved value. Each factory patch now explicitly specifies its engine/effect state, with intentional oscillator, interval, envelope, filter and space choices instead of narrow incremental offsets. Velocity defaults to0 throughout the bank. No new synthesis algorithms or voices.

83 factory patches enable effects; Init VA and six others remain dry. Effect recipes span slow chorus, ensemble, sweeping phaser, short spring/slap spaces, rhythmic cross/L-R echoes, dark delays and long modulated halls. Envelope and oscillator contrasts remain even when effects are bypassed. Feedback stays at or below .62 in the bank. Some pads deliberately need several seconds to bloom.

Try Warm Ambient, Velvet Dawn and Amber Clouds consecutively; then Iron Tide, Thin Air, Soft Acid, Spring Pizz, Bell Archive and Delay Apparition. The sound tour at reports/preset-showcase.html renders the same phrase with original levels and tails. These are software renders; no human listening or physical hardware verification is claimed.

## Validation

Browser-resolved serialization of90 factory patches is rendered through the actual shared instrument in tests/factory.cjs and tests/preset-contrast.cjs. The latter measures early/body envelope ratio, normalized first-difference brightness, stereo difference, tail RMS and actual enabled-versus-bypassed effect differences. These are regression metrics, not perceptual scores or loudness normalization. Every wet patch must measurably change output; the Ambient bank must span different envelope and brightness responses. Existing full regression covers MIDI ownership, USER recall, routes, audio/fallback and layouts.

The wetter default exposed a prior PANIC interaction: the Thickness buffer was cleared immediately but could refill from the18ms voice fade, then feed already-reset effects. The targeted instrument fix bypasses ensemble writes during that fade. New tests/preset-panic.cjs reproduces the failure before the fix and checks exact post-settling silence and recovery at44.1/48/96kHz. No change to normal-note DSP.

## Visual assessment — proposal only

The current normal-size browser screenshot still gives every inset nearly identical glowing borders, while the header has broad flat faces and the control bodies use inconsistent light cues. A better physical reconstruction should keep approved geometry and colours, and use:

- One restrained light source from upper left, with matching cabinet bevels, knob sidewalls and shadows.
- Low-contrast charcoal powder-coat texture and a few correctly scaled recessed fasteners at structural points; no broad green surface glow.
- A continuous chassis lip/keyboard-divider extrusion and flat integrated end housings.
- Low-profile knob sidewalls with a narrow top highlight; tighter contact shadows instead of large glow halos.
- Dark screen gaskets, small glass reflections and restrained trace bloom; LED glow confined to lit switches/arcs.
- Key front lips, front-face separation and short contact shadows inside the already-notched key pockets.
- Consistent screen-printed text weight and spacing at actual display size, without adding tiny decorative legends.

This sound update does not apply a new cabinet style. Validate an isolated equal-scale component crop against the original mockup before any later full visual rollout.
