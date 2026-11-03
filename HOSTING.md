# mAMB v0.6 authorised online delivery

Playable address: https://grimiss-mamb-synth-v05.bubbly-ray-9560.chatgpt.site

The URL is intentionally unchanged from the first hosted checkpoint. The displayed instrument/title is v0.6. Open it in a normal browser, sign in if prompted, then press START AUDIO. Choose Modulated Atmosphere to audition all three effect sections. HTML BUILD downloads the standalone instrument; SAVE TO PC exports a patch.

## Publication evidence

- Existing Sites project: `appgprj_6ae9ad1b7aa08191846efb701d49414c`.
- Native deployment: `appgdep_6ae9bbebfb148191a622db693cdb5b11`, terminal status **succeeded**.
- Saved version: `appgprj_6ae9ad1b7aa08191846efb701d49414c~appgver_56cb99fe373481919515508380d56a96`.
- Exact pushed Site-source commit: `0d8bd7b7084040f0360ea43741ba7d69f35fc104`.
- Release application source is preserved in GitHub commit `678d3d68c497c9ba2e5f49e4bbc6552e73cc2eed`; subsequent checkpoint commits only add verification/documentation.
- Published index.html and standalone HTML SHA-256: `a3df24a3de262ac774a2a60aee8a62b5de808b2d66bbed35a28d3341eb64c517`.
- Exact tested HTML, full desktop/tablet screenshots and measured decay SVG were packaged from that pushed Site-source state.

GitHub repository metadata confirms private visibility and push/admin access. The existing Site has owner role, one allowed user, no groups/editors/external visitors. Audience and repository visibility were not changed. GitHub Pages was not substituted for the already working authorised private hosting. The Site provider's internal source branch is unrelated to GitHub main, which remains untouched.

## Actual live-browser verification — BLOCKED

Publication succeeded, but **actual live-domain interface/audio/keyboard/effects/preset checks have not passed from this environment**. The browser navigated to the real URL through the configured HTTPS proxy and returned `net::ERR_TUNNEL_CONNECTION_FAILED`; curl returned CONNECT403. No application page was reached. This is not evidence of an application defect, and deployment status alone is not treated as a browser/audio test.

A sandbox network permission request was granted, then both requests were retried; the independent Cloud Environment HTTP destination allow-list still rejected the domain. Report: reports/live-verification.json. All equivalent localhost Chromium checks passed on both audio backends, and local screenshot/HTML-download checks are complete.

**Remaining action:** add `grimiss-mamb-synth-v05.bubbly-ray-9560.chatgpt.site` to the Cloud Environment configuration's allowed HTTP/HTTPS hosts, apply the environment configuration, then rerun the authorised live test. This cannot be fixed by another sandbox-network grant, by changing Site audience, or by exposing the GitHub repository. Do not bypass the proxy or relax TLS validation.

`tools/verify-live.cjs` accepts a JSON object with `url` and an existing Site service token through hidden stdin only. Obtain service access from the native Sites get_site response; send its credential only to that exact Site in OAI-Sites-Authorization. Do not create/rotate a bypass credential merely for diagnosis or store any token in source, files, command arguments, documentation or output. The current report contains no credentials.

## Future updates

Use the Sites skill, reuse this project ID/access policy, obtain a fresh source-repository credential and update `/workspace/sites/grimiss-mamb-v05` when retained. Copy only the tested release into its dist/ and preserve .openai/hosting.json. Push the exact Site-source commit, package that state, save/deploy privately and inspect terminal status. Re-run actual live QA when the domain is allowed. Do not create duplicate Sites, change audience, or deploy untested development edits.
