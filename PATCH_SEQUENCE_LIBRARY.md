# Microseq — patches, sequences and recovery

Microseq remains one standalone instrument. This release adds no MIDI recorder/editor, multitrack registry, DM-848 code, DS-9 changes or GMC-9000 changes.

## Using patches

Open SELECT PATCH. KEEP SEQ starts OFF on each app launch.

- OFF: a factory or user patch restores the complete sound, SEQ and Song configuration. Generated SEQ playback stops, matching previous explicit-load behaviour; press Play to resume from the loaded settings.
- ON: a patch changes the sound while retaining current pitches/rests/accents/probability/gates/velocity, roots/scales, timing, Dual 8, A/B alternation, Song arrangements and existing ARP/SEQ relationships. A running sequence continues. Musical arp enable/pattern/rate/gate/octaves and tempo are also retained.

LFOs, modulation routes, envelopes, oscillator/filter/amp/EQ/FX settings and XY assignments belong to the incoming sound. Changing musical tempo changes a tempo-synced delay's effective timing, without changing its FX controls. KEEP never writes a saved original. Saving a mixed sound/sequence captures the actual combined working state.

All 100 original factory sounds are unchanged. Every factory patch now has independent, explicit default SEQ and initialized Song state. Factory originals are frozen/read-only. They initially share the existing default musical pattern; no new melodies have been invented.

SAVE CURRENT saves a complete USER patch. A changed name creates a new stable-ID entry; replacing another existing name requires confirmation. RENAME SELECTED changes metadata only and retains current unsaved edits. Renaming/deleting a different library entry does not select or load it. Deleting a selected USER library entry retains the working instrument as an unsaved copy.

## Saving and loading sequences

From SEQ-16, open ADVANCED. SAVE SEQ and LOAD SEQ are together at the bottom.

SAVE SEQ opens the named library. Enter a name and SAVE NEW. SELECT an existing entry to use REPLACE SELECTED; replacement requires confirmation. LOAD applies that musical configuration to the current sound and marks the working patch modified. It never overwrites a saved patch.

A SEQ document includes the 16 steps, rests/accents, velocities, probabilities/gates, roots/scales and latched keyboard root, lengths/rates/directions/glide, Dual 8/alternation, all Song patterns/repeats/randomisation switches, legacy root-program data, tempo and musical arp settings. It contains no oscillator/filter/envelope/amp/EQ/FX parameters. Stored note-source/enable settings are restored, but active voices and running playheads are not.

The library supports rename, delete, individual JSON export and import. Imports create a new ID and, on a name collision, a clearly named import copy. They do not immediately load or replace current notes. Sequence files use `grimiss-microseq-sequence`, version1, and `.microseq-seq.json`. Synth patches retain the legacy `grimiss-mamb` format, now version4, with `.microseq-patch.json`. File types are validated separately; old `.mamb.json` patches remain loadable.

Saving a sequence marks that sequence snapshot saved, but does not falsely mark a modified synth patch saved. A latched keyboard root is restored without held notes or double transposition. A recalled enabled Song is armed; its arrangement starts on Play, without automatic playback during recovery.

## Modified state and recovery

The patch screen shows an asterisk for modified working content; SELECT PATCH shows the explicit saved/modified status. Recovery stores the complete sound and musical configuration together. An outgoing modified state is retained before explicit patch/sequence replacement. Separate draft IDs protect work from different open windows.

On restart, the most recent complete working snapshot is restored, with RECOVERED DRAFT shown for unsaved work. It does not automatically start audio/playback. RECOVERY in the patch browser lists retained drafts, newest first. RESTORE replaces the working instrument while preserving outgoing edits; it does not overwrite a saved patch. EXPORT LIBRARY / RECOVERY BACKUP includes libraries, drafts, migration backups and quarantined data.

The normal checkpoint is debounced180ms, with a synchronous complete browser journal on page hiding/closing. Abrupt process/power loss can still lose edits made before a checkpoint. Browser data remains local to that browser/origin, so portable exports remain the way to move work between PC/tablet or keep an independent backup.

Storage/validation failures are visible and never report a false successful library save. Conflicting library writes from another window are rejected; reload to refresh that library. Current work remains recoverable/exportable.

## Migration and precedence

Legacy user libraries and the old selected-patch/global-SEQ entries are never deleted or rewritten. A transaction stores validated stable-ID copies, aliases, original raw backups and a migration marker. Bad entries are quarantined individually; valid entries remain usable. Unsupported/corrupt patches and sequences are validated before changing any working controls.

The legacy global sequence becomes **Recovered legacy SEQ**, not a hidden override. That old record did not contain tempo/arp or a complete sound snapshot; the recovered sequence explicitly notes those settings use defaults. Previously unsaved sound changes cannot be reconstructed, and no sound association is invented.

Explicit patch/sequence selection takes precedence over legacy session data. Restart recovery uses a complete modern working draft, not a separately remembered sequence layered onto another sound. Migration is idempotent. Backups/quarantine remain available for export.

## Verification and rollback

Tests cover all100 explicit factory sequences and unchanged factory sound parameters; full patch/sequence round-trips; KEEP ON/OFF; rename/delete safety; Song/Dual8/alternation; keyboard-root recall; complete restart recovery; portable imports; malformed files; legacy migration; separate window drafts; conflicting writes; unavailable storage and injected quota failures. Existing synth/arp/audio, MIDI mapping, touch, Worklet/fallback and keyboard-flip regressions pass. Physical tablet/hardware verification remains pending.

Development rollback: `checkpoint/pre-persistence-library`. Previous hosted deployment: version36. Work remains on `codex/controller-workflow-v0.7`; no development merge to main.

Application rollback does not remove the new database. Older builds will not display the new sequence library and may reject version4 patch exports; retain an exported backup and return to a compatible build to access that data. Original legacy libraries remain available to the old build.
