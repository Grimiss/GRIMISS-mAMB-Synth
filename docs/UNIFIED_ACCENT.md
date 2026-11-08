# Unified mint accent

The authoritative colour is the measured patch-name lettering: rgb(115,233,208), #73E9D0. `src/unified-accent.css` applies one reusable token to illuminated controls, traces and glow, grids, mixer fills, SEQ-16, gesture overlays and patch cables. Black hardware, grey inactive sockets/caps, REST neutrality and muted screen-printed section headers remain distinct.

The MIDI editor's canvas uses the same CSS token for notes, velocity bars and the playhead. Selected notes keep an off-white selection outline rather than introducing a second hue. Note data and playback logic are unchanged.

Chromium checks passed: all main knob arcs, eight screen traces, mixer fills, active button text/borders and patch cables match the patch text; SEQ-16 step accents match; MIDI editor opens/closes; panel/screen bounds match baseline; gesture recording and audible keyboard output work; no page errors. Screenshots reviewed. Physical Windows hardware not tested. No DSP, MIDI scheduling, patch format or synthesis changes.

Rollback: Site v62 and checkpoint/pre-unified-mint-2026-11-08.
