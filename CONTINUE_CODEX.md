# Orbitron Black / sage section refinement

Headings restored to embedded Orbitron900. Rounded filled sage title bars with dark cut-out names, thicker inset borders, and identical oscillator colour/texture on all sections. CSS-only; all embedded program scripts unchanged. Existing browser geometry/header/control/arp-audio checks passed. See ORBITRON_SAGE_REFINEMENT.md and reports/orbitron-sage-release-verification.json. No main merge.

# Photographic hardware reconstruction checkpoint

Latest supplied photo drives custom compact rotary art, narrow raised fader caps, six ivory key materials, boxed sage print, neutral charcoal exposure and black decorative leads. No desk/foam backdrop. All100 presets, arp and existing controls preserved.18 protected scripts are byte-identical to rollback; approved coordinates and37-note range retained. See PHOTO_RECONSTRUCTION.md, reports/photo-reference-map.json and reports/photo-reconstruction-review.html. Final verification/publication status is in reports/photo-release-verification.json. No main merge.

# Arpeggiator and near-black hardware finish

100 factory presets in10 banks, including Arpeggios91–100. Audio-frame scheduler: Up/Down/Up-Down/As-Played/Random, five divisions, gate and1–3 octaves; shared tempo. HOLD/sustain/source ownership, patch recall, PANIC and Worklet/fallback verified by dedicated tests. Arp-off wet chords are sample-identical to v16 rollback at44.1/48/96kHz. New textured near-black finish, rounded printed rules/labels, screen glass, short shadows and recessed fasteners preserve measured geometry and37-note keyboard. See ARPEGGIATOR_AND_HARDWARE.md and reports/arp-hardware-review.html. Internal clock only; external MIDI Clock and step editing remain future work. Final release/test status is in reports/arp-release-verification.json. No main merge.

# Factory sound refresh checkpoint

90 intentional factory designs;83 enable varied effects, USER storage/names/numbering and approved geometry preserved. See FACTORY_SOUND_REFRESH.md, tests/preset-contrast-results.json and reports/preset-showcase.html. Includes a reproduced-and-fixed Thickness/PANIC buffer refill regression; no normal-note DSP change. Full-suite final status is recorded in the release verification report. Visual material/lighting improvements are proposals, not a new styling rollout.

## Expressive sound and mechanical controls

Latest request replaces the still-subtle macro response: Age now includes existing-stage saturation/tone wear with level compensation; Thickness now has a shared micro-detuned ensemble that changes mono audio. Velocity default is0; saved explicit USER values remain. Oscillator buttons are equal-size with stronger selected edge/icon glow; wheel ribs roll into fixed shells; black keys have visibly recessed pockets/cutaways. PLAY range heading and VOICE explanatory text are hidden/removed, with PITCH DRIFT label preserved. See EXPRESSIVE_CONTROLS.md. Rollback:rollback/pre-expressive-controls. Full suite passed; no main merge or full cabinet rollout.

## Slider/sound-range follow-up

Thickness now sits below Analog Age in VOICE. Horizontal tracks are full-height green-left fills updated by real input events; the old scheduler bypass of the refinement hook is fixed. Reverb buttons: MOD HALL / SPRING. OSC2 octaves:−1,0,+1. Buttons use rounded matte rubber faces. Age/Thickness upper ranges are stronger; see SLIDER_REFINEMENT.md for exact calibrated limits and compatibility. No extra voices/second timbre or cabinet reconstruction. Rollback:rollback/pre-slider-refinement.

Latest complete checkpoint: v0.5.1 at1dac36a (tag checkpoint/v0.5.1), published at the same private URL. Complete regression and additional menu/persistence checks passed. See V0_5_1_REFINEMENT.md, HOSTING.md and reports/v051-release-verification.json. Current live controls/keybed reflect the targeted brief, not a full Prototype C cabinet rollout. Preserve rollback/pre-v0.5.1. No background work continues after delivery.

## v0.5.1 targeted playable refinement

The current user brief authorises direct Analog Age, new Velocity/Thickness parameters, button/route/menu/header/EQ cleanup, actual pointer/touch/MIDI wheel repair and bringing the notched keybed into the LIVE synth. It does not authorise another broad cabinet reconstruction. Keep Prototype C unchanged and available. Rollback is rollback/pre-v0.5.1 at034e942. Read V0_5_1_REFINEMENT.md for signal flow, persistence, wheel global/owner semantics and limitations. No main merge. The new dist/GRIMISS_mAMB_v0_5_1.html and legacy v0_7 alias are byte-identical.

Checkpoint A is complete and published:71cefff (tag checkpoint/analog-engine-v0.5). Checkpoint B is separately committed/published:1c5b9ef, review at prototypes/reconstruction-c/index.html. Checkpoint C remains blocked ONLY on the user's explicit prototype approval. No background work continues after delivery. Full suite and prototype checks passed; see HOSTING.md and reports/analog-release-verification.json.

## Active: Analog Engine v0.5 / isolated visual prototype

The user approved parallel checkpoints. Workstream A completes Phase 1 analog DSP plus functional wheels, removal of permanent knob/fader numbers and printed key names. Workstream B is ONLY an isolated prototype in prototypes/reconstruction-c, including actual notched white-key silhouettes and seated black keys. Do not apply its materials/components/keybed to the live synth until the user approves Checkpoint B. Do not pause approved DSP work while awaiting that approval. No nonlinear filter modelling or supply sag. Preserve rollback tag rollback/pre-analog-phase1 at2fa85a5. See ANALOG_ENGINE_V0_5.md for architecture, tests and compatibility limits.

## Three-octave keyboard update

The user requested that the keyboard fill the blank areas. The on-screen bank now spans C3–C6 (MIDI 48–84): 22 white and 15 black keys, filling the 953-unit housing with uniform spacing. The existing C3–C5 pitches, typing mapping, MIDI messages, source ownership, pitch/mod wheels and octave controls retain their behaviour. The range label follows octave changes through C6. This explicitly supersedes the earlier 25-note/blank-end geometry compromise. No synthesis or effects algorithms changed. Browser regression verifies all 37 note identities, C6 pointer note-on/off, geometry and keyboard collapse at both target screen sizes.

# ACTIVE CHECKPOINT — approved reference geometry implemented

The user approved the geometry study, amending it to give filter ADSR the same420px width as amp ADSR, expand the filter to510px, enlarge cutoff, and extend EQ into adjacent gaps (256×94px). This clears the geometry approval gate. src/reference-layout.json is the native1280×640 coordinate authority; measured ORIGINAL rectangles remain unchanged in prototypes/geometry. src/coordinate-layout.js relocates original functional DOM nodes, and src/geometry.css supplies the coordinate layout. src/layout.js changes only logical dimensions to1280×640. Do not return to independent dashboard grid sizing.

Keyboard remains25notes C3–C5 with15white/10black keys, measured34×125 white faces/36pitch and21×79 black frames. The correctly proportioned538px active bank is centred inside the original housing; approved dark blank ends preserve note range. Keyboard hide expands panels through a shared coordinate transform. The main instrument remains2:1 and fits1920×1080 and1600×900.

Every original control remains. EQ has all4knobs and a compact live overview; DETAILS moves the SAME original EQ nodes into a full-response dialog and back. Both XY pads/assign buttons remain visible; EXPAND similarly moves original nodes. Never clone parameter IDs or substitute static graph artwork. tests/reference-layout.cjs checks actual panel coordinates, cutoff size, unchanged key geometry/mapping, original-node identity/interaction and unique IDs. tests/hardware.cjs permits only the approved layout-dimension constant change within the14 legacy functional scripts; the other13 remain exact.

See reports/reference-comparison.html for equal-scale browser/reference comparison and original/implemented boundary overlays. Amber indicates the user's intentional filter/ADSR/EQ deviations. Preserve Prototype B palette, screen glow/bezels and700-weight lettering. Main DSP, MIDI, effects, patch and automation modules remain unchanged.

## Earlier continuation record

# Approved Prototype B / screen-printed edition

The user approved Prototype B with more screen glow, visible bezels and heavier fonts, then specified ALL lettering should resemble screen printing. That approval cleared the earlier full-rollout gate. Preserve this approved direction; do not return to the rejected green gradient/rail/barrel-knob treatments. prototypes/low-profile-b contains the reference samples and comparisons. src/hardware.css applies near-black surfaces, flat graphite cheeks, low-profile geometry, visible bezels/glow and700-weight text throughout (including dialogs and SVG labels).

src/hardware-header.js adds the physical header composition, ventilation, catalogue-ordered patch arrows/LCD number and actual-context audio pilot. It reuses existing patch APIs. Original engine, effects and functional modules stay unchanged. tests/hardware-header.cjs covers navigation/wrap, imported USER readout, real audio indicator, component coverage, screen bezels/glow and printed font weights. Keep tests/hardware.cjs preserving the original156control contracts while explicitly allowing the performance and patch navigation widgets.

# Continue GRIMISS mAMB v0.7

Start from the latest verified `codex/controller-workflow-v0.7` commit, based on v0.6 `46d8bdd306df14268d52b94dbcf9f58e63f6bab8`. Never start from main or discard the prior checkpoints. Read DEVELOPMENT_LOG.md, ROADMAP.md, TEST_RESULTS.md, HOSTING.md and modular source/tests.

Run `npm run build` and `npm run test:all` in a Chromium-capable environment. The canonical historical HTML and dist/GRIMISS_mAMB_v0_7.html must be byte-identical. Edit src modules; regenerate MIDI targets and map artifacts with tools/build-midi-map.cjs after parameter changes. No paid services or Sound Factory modifications.

Architecture: one timbre/eight active voices, bounded steal tails, source ownership, two independent LFOs/four routes and one shared stereo effects chain. Preserve src/synth.js and effects algorithms unless a measured change is justified. Optional input monitoring is mixed before shared effects, defaults off/gain zero and stops on PANIC. AudioContext resumes synchronously on trusted first key/pointer gesture before asynchronous Worklet setup; never promise browser-policy-free autoplay or add a mandatory Start Audio button.

The rejected finish-only pass has been superseded by a corrective reconstruction. tools/hardware-components.cjs generates the actual knob SVG bodies and physical fader assemblies during build. Do not edit the old source SVG circles expecting those to change the new controls. src/physical-controls.js adds working local pitch/mod wheels and octave buttons; keep MIDI source ownership independent and verify transpose/release/highlights/spring return with tests/physical-controls.cjs.

Visual layer: src/hardware.css is embedded by build.cjs; src/interface.html supplies shared SVG paint gradients. tests/hardware.cjs compares all14 functional script bodies and156 original control tags (allowing only the new performance module/widgets) with tests/fixtures/v0.7.html (2531bed). Do not change DSP to revise appearance. For a later explicitly functional release, deliberately update the parity baseline/guard after validating the authorised behavior change rather than deleting coverage. HARDWARE_VISUAL_PASS.md records the approved mockup comparison and retained functional scope.

UI: 1280×640 logical hardware panel, fit to viewport, body-sibling dialogs. Keyboard is visible by default; persisted hide state really grows graphs/controls without DSP/context reset. OSC1 buttons are4+3. Ninety continuously numbered factory patches,9×10banks; USER edits via SELECT PATCH. Patch schema v3 contains XY; legacy versions remain supported. MIDI profiles are separate, versioned and source/channel-scoped. Original Arturia KeyLab25 has no pad grid. Never invent unknown factory CCs or call synthetic activity hardware verification. Read KEYLAB25_MIDI_MAP.md.

Retained storage: grimiss-mamb-user-patches-v2, grimiss-mamb-midi-map-v1, grimiss.mamb.layout.v1, grimiss.mamb.xy.v1, grimiss.mamb.selected-patch.v1, grimiss.mamb.midi-devices.v1. Do not rename/remove without migration. MIDI map standalone and app use the same registry and storage events.

Next: actual owner-authenticated live-domain QA once its Cloud Environment HTTP host is allowed; physical Windows/tablet/KeyLab25 tests, real audio deadline/dropout telemetry, listening-led factory/effect refinement. ARP and automation remain visibly unimplemented. Smaller portrait/tablet readability and accessibility deserve further physical validation.

For deployment reuse the existing owner-private Site project appgprj_6ae9ad1b7aa08191846efb701d49414c and URL in HOSTING.md. Preserve audience/private GitHub visibility. Push the exact tested Site-source state using a fresh short-lived credential only through hidden stdin, package and deploy privately, check terminal status. Do not claim actual live-browser QA passed from a deployment status; the configured proxy previously blocked the hostname. No main merge. Finish with clickable playable/download/screenshot/map links, tests, exact branch/commit and candid limits.

Transparent lettering checkpoint: all 16 sage section titles now have true background-revealing SVG cut-outs using Orbitron Black weight 900. Chromium pixel proof passed (138 backdrop-following pixels); four layout checks and existing functional/header/arp regressions passed. Audio and parameter scripts unchanged. See TRUE_KNOCKOUT_LETTERING.md.

Restored-design integration: version 14 visual components and styling, current DSP, 100 newer factory patches and working audio-clock arpeggiator. See RESTORED_ARPEGGIATOR.md and npm run test:restored. Do not reload later photo/filled-title styling.

SEQ-16 complete: lower-panel rotateX keyboard/dual-layer swap, 16 independent pink/green tracks, all six arp interaction modes, per-step rhythm editing, independent audio clocks and additive patch/session persistence. Upper layout retained. New engine, browser and 60-second stress checks plus existing functional/audio/MIDI/100-patch regressions pass. See SEQ16_IMPLEMENTATION.md and npm run test:seq16. Physical tablet/controller verification remains pending.

SEQ-16 published as Site version 26. Code checkpoint dc3d327e59ffdbbe8f999ca9499038c9b01fb53a; Site source 63425ab328c71b666999b98a5c03d8e445c46275; deployment appgdep_6aec1eb3d1148191bd3867e5bfb69dfc succeeded. Same private URL. Version 25 and rollback/pre-seq16 retained. Review: /reports/seq16-review.html. Native deployment and exact local browser-tested bytes verified; physical tablets/controllers and live-origin browser access remain unverified. See reports/seq16-release-verification.json. No main merge.

GRIMISS mikroSEQ official rename plus keyboard root and eight-slot transposition program: Phase1 validated at165fc22 before Phase2. FIXED remains legacy default; all six arp pitch rules are unchanged. Program uses the existing pitch-step clock and two-face keyboard housing. See MIKROSEQ_ROOT_PROGRAM.md and npm run test:root-program. Legacy internal names/storage/paths preserved. No main merge or standalone app.

## Root/program checkpoint — publication blocked

GRIMISS mikroSEQ keyboard roots and eight-slot program are implemented and verified. Code checkpoint5d2ddfa, phase1 checkpoint165fc22; branch codex/controller-workflow-v0.7. Site source8b12f1e75c9ed10fcef1ea8e40180d29b15b4126 is pushed, but no new Site version was saved: production remains version26. Site display metadata is renamed; the live HTML has NOT been updated.

Publication failed uploading archives to OpenAI file storage (sdmntprcentralus and sdmntprnortheu.oaiusercontent.com, error sending request). The failure also occurred with the current-only2,117,192-byte archive. This is a network upload failure, not an approval rejection; no further user approval is needed. Repository-triggered publication was checked and publish_on_push_accepted=false, so it was not used. No more publication attempts or background work are running.

Playable source build: dist/GRIMISS_mAMB_v0_5_1.html (byte-identical v0_7 alias), HTML SHA25610ecb6e1084b1da0e76a86cace5d46255277a4c5124c997ba90ddbffbc6b3b0c. Full rollback archives and all historical Site source assets are preserved. A documented current-release artifact manifest is committed in the Site repository; /workspace/GRIMISS-mAMB-Synth/work/mikroseq-current-release.tar.gz contains only the playable build and current review assets. Before any resumed publish, reconcile saved versions by exact source SHA and reuse an existing saved version if one appears. Do not claim the current public URL contains root/program features until deployment succeeds. See reports/mikroseq-release-verification.json. Main unchanged.

Latest addition: SEQ16_KEYS_AND_DUAL8.md documents per-slot key/scale, rounds, note labels, amber playheads and DUAL 8 independent pitch banks and shared sixteen-step drift. `npm run test:scales` runs new coverage (browser requires local server capability). Eight program slots retained; no SEQ-18 rename. Prior source build is on checkpoint/pre-slot-scales. Published successfully as Site version 27, source 0caefc65a1e68e9cb1ed8ab454e53be346c908a6, development code 724ca009f244157f16ac9ebc10784af903baeda5. Site version 26 and remote rollback/live-v26-before-scales preserve the previous live deployment. See reports/mikroseq-scales-release-verification.json. Earlier publication-failure notes above are superseded by this successful deployment.

## Latest — pitch-only SEQ-16

SEQ16_PITCH_ONLY.md supersedes dual-layer/shared-drift operation described above. Green sequencing/LINK and ARP + DRIFT / ARP DRIFT are removed by user approval; legacy mode migration disables combined operation and explains why. Pink/root/program timing, optional scales and DUAL 8 pitch remain. Use `npm run test:pitch-only`; rollback checkpoint/pre-pitch-only-seq16. See TEST_RESULTS.md for known pre-existing expressive-sound hidden velocity-default assertion.

Pitch-only build published successfully as Site version 28. Source b63c8ff5001b4c8f59e1daf41d2b0930cc5ba018, development code 5236b85320ad32d08ba5b75c381df9d0c605bfbc. Same mikroSEQ URL; version 27 and remote rollback/live-v27-before-pitch-only retained. Verified native deployment and source/archive provenance. See reports/mikroseq-pitch-only-release-verification.json. No development main merge.

Direction/cyan fix: selector repaint now reflects recalled state even while focused; direction changes flush immediately and status reports actual engine directions. Cyan pitch fader caps, amber playhead retained. `npm run test:direction` covers the reproduced mismatch and real FWD/REV/PEND/RANDOM traces. Previous source on checkpoint/pre-direction-cyan.

Direction sync / cyan caps published successfully as Site version 29. Source d7f2ec959bd2321c3acc49d8b80050da8f4a77a3, development code 9b7166ac94312c9d8091bda6ca25e5531019e9f3. Version 28 and remote rollback/live-v28-before-direction-cyan retained. See reports/mikroseq-direction-cyan-release-verification.json. Same URL and audience; no development main merge.

Latest UI: SEQ16_BUTTON_LAYOUT.md supersedes the small-dropdown arrangement. Wider button controls, green pitch caps, a selected-step strip and MORE dialog; bank and selected step stay aligned. Existing timing/DSP untouched. `npm run test:seq-layout` and `npm run test:direction` cover the visible controls. Rollback checkpoint/pre-sequencer-buttons.

Button layout / green caps published successfully as Site version 30. Source 2d6376ee6ece75b2c30a8f34eca5d7e345cb97bb, development code 0c41b8bad63df3df2c4cb20884d3593290dc051f. Version 29 and remote rollback/live-v29-before-button-layout retained. See reports/mikroseq-button-layout-release-verification.json. Same URL and access; no development main merge.

Touch audio compatibility: TABLET_AUDIO_STARTUP.md documents completed-tap resume and feature-detected playback sessions. `npm run test:tablet-audio` verifies simulated mobile restrictions in Chromium and both audio backends. Physical-tablet silence is not conclusively diagnosed; user tablet/browser/status details were requested. Rollback checkpoint/pre-tablet-audio.

Touch audio startup compatibility published successfully as Site version 31. Source 3041523a1125a2ae2f65bdddad9ad69c963ea14b, development code a1bb6cc4894b9890b9c5967aec10ce26049ecba4. Version 30 and rollback/live-v30-before-touch-audio retained. See reports/mikroseq-touch-audio-release-verification.json. Physical tablet diagnosis remains open: tablet/browser and status details were requested, no answer yet. Do not claim this update has fixed the user's device until they confirm.

Latest Simple view: SEQ16_SIMPLE_VIEW.md supersedes earlier control placement. Always-visible four directions; ON/REST/ACC caps/buttons; green A/filter-blue B; snapped LENGTH bars; root note dropdown; Advanced expression matrix. Space and PLAY/PAUSE preserve remaining timing and PROGRAM counters. `npm run test:simple`; rollback checkpoint/pre-simple-steps. Audio DSP unchanged. Tablet report was keyboard working, sequencer not running; no confirmed physical-device resolution.

Published simplified SEQ16 as Site version 32 (native deployment succeeded). Development 9e4f6ec; Site source e447c39. Rollback version31 preserved. No development merge to main. See reports/mikroseq-simple-view-release-verification.json.

Current update: 32-pattern song popup, independent bank roots, right-hand bank/layout/reset toolbar and quieter illumination. See SEQ16_SONG_PROGRAM.md. Rollback branch checkpoint/pre-song32 preserves Site32 development state. Keep development on codex/controller-workflow-v0.7; never merge dev main.

Song popup release deployed successfully: Site source 4c08778, development 849dc5a. Rollback hosted version32 preserved. Sequencer browser tests including ScriptProcessor fallback PASS. See reports/song32-release-verification.json.

SEQ hierarchy update: see SEQ16_HARDWARE_HIERARCHY.md. Explicit RESET differs from transport-position reset and factory defaults. Live song display/length editing uses active arrangement data without overwriting saved base settings. Keep existing development branch; rollback checkpoint/pre-seq-hierarchy and hosted33.

SEQ hardware hierarchy release successfully deployed. Development6429e5e; Site783de8f; prior hosted33 rollback preserved. See reports/seq-hierarchy-release-verification.json. No development merge to main.

Latest: approved control mockup now implemented; see SEQ16_CONTROL_MOCKUP.md. Dual 8 A+B/A→B flag defaults false for old patches; audio-frame alternation preserves independent bank settings. Rollback branch checkpoint/pre-control-mockup and hosted34. Development remains codex/controller-workflow-v0.7.

Approved mockup + A/B alternate release successfully published: development 2841a68, Site7275016. Prior hosted34 preserved for rollback. See reports/seq-mockup-release-verification.json. No development merge to main.

MS-08 refinement: see MS08_REFINEMENT.md. New module/CSS appended after sequencer UI. OSC1 non-pulse reshaping changes nonneutral `pw` behavior intentionally; neutral50% with no shape modulation is sample-identical. PWM and OSC2 retained. Song table redesign remains a documented recommendation, not an implemented feature. Rollback checkpoint/pre-ms08-refinement and hosted35. Keep development branch.

MS-08 update successfully published: development fa8e624, Site7a0dcc9; previous hosted35 rollback preserved. See reports/ms08-release-verification.json. No development merge to main.

Approved persistence scope implemented. See PATCH_SEQUENCE_LIBRARY.md for usage/migration/limitations and MICROSEQ_STATE_ARCHITECTURE.md for standalone boundaries. Factory sounds unchanged; explicit factory SEQ; KEEP SEQ in patch browser; SAVE/LOAD SEQ in Advanced. IndexedDB libraries with raw legacy backup, quarantine, full recovery journal and per-window drafts. Patch version4 / sequence version1. No MIDI-editor/host work. Rollback checkpoint/pre-persistence-library and hosted36. Current development branch remains codex/controller-workflow-v0.7.
