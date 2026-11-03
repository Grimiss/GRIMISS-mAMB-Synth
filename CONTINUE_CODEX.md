# Continue development

Continue GRIMISS mAMB from branch `codex/audio-stability-v0.4`. Read DEVELOPMENT_LOG.md, ROADMAP.md, TEST_RESULTS.md, the HTML and screenshot. Keep the original implementation and five presets. Do not merge main, modify Sound Factory or use paid services.

Run `node tests/audio.cjs`, `node tests/baseline.cjs`, `node tests/diagnostics.cjs`, then `node tests/browser.cjs` with a local Chromium-capable environment. Inspect JSON outputs and failures before editing. The managed browser blocks file URLs; this is not an application failure.

Next: profile the shared DSP and eliminate render-time object/array allocations, add discontinuity and filter-response measurements, fix source-aware input ownership and keyboard-highlight synchronisation with held/stolen engine notes, and test resulting changes. Validate waveform and filter switching for clicks. Then implement independent LFO2 and four virtual patch routes with audible-render tests before expanding digital waves/effects. Obtain official manual/reference audio only through permitted access and document all approximations. Update all checkpoint docs, tests and a new commit. Deliver a self-contained HTML and concise results. Do not claim hardware equivalence or full completion.
