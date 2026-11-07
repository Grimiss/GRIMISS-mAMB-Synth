# mikroSEQ — tablet startup and recovery

## Confirmed failure

The version-41 fallback path could finish initialization synchronously, clear its
`starting` flag in `finally`, then assign the already-completed promise back to
that flag. After closing the context, `start()` saw that stale promise and skipped
processor creation. A browser reproduction showed `state: running`,
`processor: false`, `starting: true` and a misleading Audio running message.
After the correction, the same reproduction has a live processor and a cleared
initialization flag, and generates measurable browser audio.

This is a verified application bug. It has not been established as the explanation
for every intermittent failure on the user's Samsung S6 Lite/Edge.

## Changes

- Initialization always releases its readiness flag on success and failure,
  including synchronous fallback initialization and failed first attempts.
- Startup waits for both browser resume permission and processor initialization.
  Resume is still invoked synchronously within the original trusted user gesture.
- Context generations isolate cancelled/late work from the current engine.
  Pending SEQ/MIDI Play commands cannot restart transport after recovery cancelled
  their original startup attempt.
- Worklet module loading falls back after eight seconds if it stalls. A late module
  never creates a second active processor after context replacement.
- A failed Worklet is marked unhealthy. A new trusted interaction can rebuild it.
- The existing AUDIO SETTINGS window has ENABLE / RESUME AUDIO and RESTART AUDIO.
  Its readout reports actual processor readiness, permission/state and errors.
  The existing audio pilot opens this window and no longer turns green solely
  because an unconnected audio context reports running.
- The settings window explains MIDI-only playback or ARP + SEQ waiting for held
  notes. It does not silently alter playback sources, patches or arp settings.
- Explicit restart stops sounding notes and transport, retaining all unsaved sound,
  SEQ/Song data, MIDI clips and gestures. A normal resume preserves running playback.
- Already-authorized microphone streams/output selections reconnect after recovery;
  restart does not request fresh microphone permission. No input is enabled by default.
- No synthesis, FX, voice limits, MIDI document formats, factory sounds or main-synth layout
  changes. The keyboard/SEQ flip remains independent of playback.

## Tablet operation

1. Reload the updated instrument once.
2. Open AUDIO SETTINGS and tap ENABLE / RESUME AUDIO.
3. If it remains silent or stuck preparing, tap RESTART AUDIO, then play a key or
   press SEQ Play. Current sounding notes/transport stop; musical edits remain.
4. Read the settings playback hint if the context is running but SEQ is silent.
   ARP + SEQ may require a held/latched chord; MIDI-only mode intentionally mutes SEQ.
5. If it still fails, report the visible runtime text, whether keyboard keys sound,
   and whether the step playhead advances. Do not infer a hardware failure from
   the context's running state alone.

## Validation and limitations

`npm run test:tablet-recovery` covers initial startup and closed-context reopening
with actual audible Web Audio output on both backends; failed Worklet retry;
first-attempt exceptions; cancelled/late initialization; eight-second fallback;
complete musical-document retention; and already-authorized microphone reconnection
without a second capture request. Existing tablet activation/interruption/session
checks, engine efficiency interactions, devices, MIDI editor, gesture editor,
workflow and patch/recovery browser regressions also pass.

Tests use Chromium, trusted mouse/touch activation and explicitly mocked failures.
Actual Samsung S6 Lite/Edge hardware has not been tested. The fix provides verified
recovery and useful diagnosis; it is not a guarantee that browser/OS audio routing,
background suspension or resource exhaustion can never interrupt sound.
