# Current corrective reconstruction deployment

Playable URL: https://grimiss-mamb-synth-v05.bubbly-ray-9560.chatgpt.site

Existing owner-private audience retained. Native deployment status: **succeeded**.

- Site-source commit:aa7c6cb5dd07056dd109f9c765c5b4be257ce1a6.
- Deployment:appgdep_6aea50634f648191908c9e302ea495bd.
- Saved version:appgprj_6ae9ad1b7aa08191846efb701d49414c~appgver_0c3a1a30108c81919a243c76c0d46dd3.
- Tested HTML SHA256:8b59890bc4384f0535bf7cddc670907bca28c645b3838c92a1749e25a853896a.
- Review package:/reports/rebuild-comparison.html, component study and rebuild-*.png close-ups/full layouts.
- Standalone:/GRIMISS_mAMB_v0_7.html; HTML BUILD downloads the exact application.

Full regression suite passed before publication. A fresh authorised real-domain browser check after publication failed at the configured proxy with ERR_TUNNEL_CONNECTION_FAILED; no application page was reached. Native deployment success is therefore reported separately from blocked live-browser/audio QA. No token was persisted or printed, and Site audience/GitHub visibility were not changed. See reports/live-verification.json and earlier network-policy instructions below.

## Superseded publication history

# Current hardware-realism publication

Playable URL: https://grimiss-mamb-synth-v05.bubbly-ray-9560.chatgpt.site

Existing owner-private audience retained. Publication terminal status: **succeeded**.

- Site-source commit:76882c14f967ce62d7141145797322b645a7e8c3.
- Deployment:appgdep_6aea3cc38a8081919e0376a0a5d54540.
- Saved version:appgprj_6ae9ad1b7aa08191846efb701d49414c~appgver_e270f6fe66e881919ae8acc77b5d7d2d.
- Exact tested HTML SHA256:a6ae1741e7ea650269b0cbfda42cafbf680b37f9dfb1b2eb5cab5f4cca80c84d.
- `/reports/hardware-comparison.html` shows matched before/after and keyboard-hidden screenshots.
- `/GRIMISS_mAMB_v0_7.html` remains the standalone build; HTML BUILD downloads it.

The complete software suite passed on this exact application HTML before native private publication. The live browser check was repeated afterwards using the existing authorised credential only for this Site and failed at proxy connection (`ERR_TUNNEL_CONNECTION_FAILED`). No page was reached; live audio/UI verification is therefore still blocked, not passed. See reports/live-verification.json. No token was persisted or printed. The environment still needs the exact Site hostname allowed in its HTTP destination configuration; do not bypass the proxy or change audience to diagnose it.

## Previous publication records

# mAMB v0.7 private online delivery

Playable address: https://grimiss-mamb-synth-v05.bubbly-ray-9560.chatgpt.site

The existing URL and owner-only audience are preserved. Sign in with the owning ChatGPT account if prompted, then play a key or touch/click the instrument. There is no Start Audio button. MIDI-only performance may require one real gesture under browser autoplay policy. HTML BUILD downloads the standalone instrument. SELECT PATCH contains factory and USER operations; MIDI SETTINGS opens the KeyLab25 map.

## v0.7 publication evidence

- Project: `appgprj_6ae9ad1b7aa08191846efb701d49414c`.
- Deployment: `appgdep_6ae9e2860bdc8191b93fcc81256bd3aa`, terminal status **succeeded**.
- Saved version: `appgprj_6ae9ad1b7aa08191846efb701d49414c~appgver_c3be5f34a468819196f019c92a53bba4`.
- Verified pushed Site-source commit: `c40913bc0366fba6a1765f636e5672377f3830c5`.
- Tested index/download SHA256: `d7e29493c3c912fda052fa39e57d3e68a29e75829061118e96b6ce5ee023fb25`.
- Assets include `/GRIMISS_mAMB_v0_7.html`, `/KEYLAB25_CONTROL_MAP.html`, `/KEYLAB25_CONTROL_MAP.svg`, `/KEYLAB25_MIDI_MAP.md` and `/reports/mamb-v07-*.png`.
- Native get_site confirmed one allowed owner, no groups/editors/external visitors. Repository visibility and Site access were not changed. No GitHub main merge.

Complete local regression suite passed on the exact published application HTML. Actual live-domain browser QA was attempted after publication with the existing authorised Site credential, scoped only to that host. It remains **BLOCKED** by the configured proxy: `net::ERR_TUNNEL_CONNECTION_FAILED`. No application page was reached. This is recorded in reports/live-verification.json; deployment success is not claimed as a live browser/audio pass.

To complete live QA, allow the exact hostname in the Cloud Environment HTTP/HTTPS destination configuration, then rerun tools/verify-live.cjs with authorised hidden-stdin input. Do not bypass the proxy, relax TLS, expose credentials, change audience or repository visibility. All credentials stayed in memory/hidden stdin and were not persisted. Physical KeyLab25, Windows and tablet validation is also still pending.

## Historical v0.6 publication record

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
