# Microseq standalone state boundary

Microseq has exactly one instrument, voice allocator, arp/SEQ pipeline and stereo effects chain. DM-848 remains a separate host. No track IDs, host-track registry or future MIDI editing engine are implemented here.

The current integration seams are:

| Concern | Existing boundary |
| --- | --- |
| Audio clock | `createMambInstrument(initial, sampleRate).render(left,right)` advances audio; SEQ snapshot exposes frame/tempo state. UI timers do not schedule musical notes. |
| Transport | Existing `seqTransport` messages: run/pause/stop/reset; `seqProgramTransport` controls Song/root progression. |
| Note input | Existing on/off/controller/sourceOff/panic messages with source ownership. No new external MIDI output. |
| Full state | `MambPatchAPI.serialize/load`, plus `MicroseqLibrary.ready` for persistence initialization. Explicit loads validate before applying and do not auto-run. |
| Musical state | `MicroseqLibrary.captureSequence/loadSequence`, with a separate typed document. |
| Libraries | `MicroseqLibrary.savePatch/saveSequence/importSequence/renameSequence/deleteSequence`; stable IDs, transactional storage and failure reporting. |
| Recovery | Complete working snapshots, baselines and sequence identity; independent draft IDs; restore/export access. |

`persistence-core.js` holds DOM/storage/audio-independent versioned validators and musical serialization rules. `persistence-store.js` owns IndexedDB transactions and concurrent-library checks. `patches.js` adapts current instrument controls/state to those services. `persistence-ui.js` adds controls only to existing management windows. The synth DSP and audio routing are unchanged.

IndexedDB `grimiss-microseq-state-v1`, schema1, has one records store with separate patch library, sequence library, migration metadata/raw backups, quarantine, working snapshot and per-window/per-origin drafts. Library updates compare their previously read state in the same write transaction to reject conflicting writes. Autosave checkpoints do not rewrite the preset libraries. The synchronous journal is `grimiss.microseq.working-journal.v1`; view preferences are separately `grimiss.microseq.view.v1`.

Patch documents remain `grimiss-mamb` version4 with backwards loading for older enveloped/flat data. SEQ documents are `grimiss-microseq-sequence` version1. Future MIDI clips require a separately versioned optional patch section and migrations; they must not be silently interpreted as SEQ documents or mixed into this sequence library. No MIDI scaffolding is needed now.

A future DM-848 adapter can consume these state/note/transport seams and supply an audited clock contract. Host tempo/track placement must remain outside saved portable musical documents where appropriate. This release neither inspects nor modifies host architecture and does not require the host to run Microseq.
