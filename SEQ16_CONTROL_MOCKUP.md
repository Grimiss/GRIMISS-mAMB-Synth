# Approved mockup implementation and A/B alternation

The lower right deck now follows the approved mockup: Transport and Song Mode across the top, Pattern and Performance below. Rounded inset housings, compact rubber-style buttons, neutral global controls with green selections, blue bank-B selection, recessed roots/status displays and amber RESET SEQUENCE reproduce the reference within the existing fixed-height keyboard/sequencer housing. Upper synth geometry is unchanged.

Transport shows PLAYING / PAUSED / STOPPED. Song Mode shows the active pattern/count and OFF / ARMED / PLAYING / PAUSED / HOLD, derived from actual sequencer state. Reset and Advanced sit below the shared key/scale display. Both root selectors remain available in Dual 8.

In Dual 8, the bank area now includes an A + B / A → B switch:

- A + B: existing simultaneous independent bank playback.
- A → B: one complete A pattern, then one complete B pattern, repeating. Each segment uses that bank's root, rate, direction and length. The selected direction determines note order; segment duration is the configured number of step events. Rest steps still count. The visible playhead follows only the active bank.

Both modes use the same audio-frame scheduler and voice allocator. Offsets and song data are never rewritten by the toggle. Switching playback relationship resets the pitch playheads to A. Pause/resume freezes the active segment and remaining step time. STOP and PANIC release generated notes. If a bank is muted in Advanced, the remaining enabled bank plays normally. Song progression retains the existing A-step clock: one A-length repeat includes its following B segment when alternating. Existing arp relationship modes retain their ownership and pitch rules; POLYMETRIC still requires arp events to advance A.

Saved patches retain the alternate flag. Older patches default to simultaneous playback. Reset returns to 16-step mode and clears alternation while retaining saved song arrangements.

Checks: exact event-frame alternation with different lengths/rates, reverse B direction, roots, block invariance, pause/resume, panic and normalization; rendered alternating C3/C4 fundamentals and panic silence; existing song audio/pitch compatibility checks; real-browser alternating playback and single active playhead; screenshots in single/dual mode at 1920×1080 and 1600×900. Existing sequencer browser regressions including Worklet, fallback, touch, MIDI simulation, patch recall and keyboard flip passed. Physical tablet unverified.

Rollback: checkpoint/pre-control-mockup; hosted version34.
