# Touch audio startup compatibility

The tablet model/browser and exact status were not supplied when this update was prepared. No physical-tablet root cause or successful physical playback is claimed.

The browser adapter previously requested audio activation only on pointer-down and key-down. It now also retries from trusted pointer-up, touch-end and click events. This covers touch browsers that accept audio activation only after completing a tap. AudioContext resume remains synchronous in the originating event before asynchronous worklet loading. No hidden media playback, autoplay bypass or mandatory Start Audio button was introduced.

Where navigator.audioSession is supported, the app requests the music-playback session type. Unsupported browsers retain their normal policy; failures are caught. An explicitly active play-and-record session is preserved. Suspended/interrupted status now tells the player to tap to resume. The next trusted gesture resumes the existing context without resetting sequencer position. DSP, patches, volume and sequencing behaviour are unchanged.

Chromium tests use actual trusted touch events with a mocked policy that rejects pointer-down resume, a mocked interruption and feature-detected session API. They verify measurable Worklet/fallback audio after tap completion, sequence continuity after resuming, preserved microphone session, and no audio activation before interaction. All 11 existing workflow groups pass, including ordinary desktop activation and MIDI/XY/patch functionality. These simulations do not reproduce the complete iPadOS/Android audio stack.

On a real device, reload the current Site, tap the instrument and inspect the status at the top. If silence persists, record the tablet model, OS/browser, status text, whether headphones/Bluetooth are connected, and whether normal keyboard playback with FIXED root and arp off works. System mute/output routing, browser bugs, and stored sequencer/root settings remain possible independent causes.

References consulted:
- https://developer.mozilla.org/en-US/docs/Web/API/AudioSession/type
- https://developer.mozilla.org/en-US/docs/Web/API/BaseAudioContext/state
- https://bugs.webkit.org/show_bug.cgi?id=212117

Rollback source: checkpoint/pre-tablet-audio. Previous production: Site version 30.
