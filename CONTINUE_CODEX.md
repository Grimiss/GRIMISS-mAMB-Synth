# Continue from v0.5

Continue GRIMISS mAMB from branch `codex/performance-modulation-v0.5`, descended from v0.4 commit `a0131ea527fada670ad9bfc13b2aa5336e9480d3`. Use the latest remote commit on that branch, never main. Read DEVELOPMENT_LOG.md, ROADMAP.md, TEST_RESULTS.md, README.md, the canonical HTML, tests and supplied CONNECT screenshot before editing.

Run `npm run build` and `npm run test:all` first in a Node/Chromium-capable environment. If needed install Playwright and select Chromium using CHROMIUM_PATH. Browser tests bind a loopback server; the managed runner needs its normal execution permissions. `file://` is blocked by managed browser policy, not an established application failure. Inspect all JSON results. The distributed HTML must remain byte-identical to the canonical HTML.

First: extend transient measurements across notes/phases, parameter/preset edits and combined rapid route rewiring; preserve the now-tested sparse connection fades. Then profile actual AudioWorklet deadlines and investigate triangle/sync/cross-mod aliasing, followed by the first stereo effect (chorus or delay) with tail/bypass/level tests. Follow ROADMAP.md order if real device testing or reference access is unavailable.

Preserve eight active voices, source-owned gates and pedals/controllers, last-note priority, engine-derived keyboard state, 8 ms waveform/filter transitions, independent LFOs, four actual routes, five original presets and standalone fallback. Keep DSP free of DOM dependencies. Avoid new per-sample allocations; compare performance and neutral-patch output against fixtures. Keep gains bounded and regression/stress tests meaningful.

Work autonomously; no paid APIs, no Sound Factory changes, no main merge. Update all four checkpoint docs, rebuild dist, run the complete suite and commit verified work. Push only the development branch within the user's authorization. Deliver the playable HTML, remote branch/commit, results, remaining limits and exact next priorities. Do not claim hardware equivalence, tablet validation or continuing background work without evidence.
