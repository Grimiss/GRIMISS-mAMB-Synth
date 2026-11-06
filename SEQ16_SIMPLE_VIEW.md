# SEQ-16 Simple view and Advanced settings

## Playing

PLAY/PAUSE and the space bar control SEQ-16. Pause releases generated notes safely, freezes pitch and root-program advancement, and resumes the remaining step interval without resetting. STOP and RESET remain separate. Keyboard/arp voices and natural effect tails retain their established ownership; this transport does not globally silence an independently running arp. Space is ignored while editing inputs/selects/contenteditable or while a dialog is open; held-key repeat does not toggle repeatedly.

FWD, REV, PEND and RANDOM buttons are always visible. Common rate buttons, overall gate, pitch enable, note-name root dropdown, scale and EDIT PROGRAM remain on the main face. DUAL 8 selection, root source, arp combinations/ratio, glide, velocity, random seed and additional rates are available in ADVANCED. Existing eight-slot PROGRAM note entry and keyboard flip are unchanged.

## Step states and bank colours

Each button beneath a fader cycles ON → REST → ACC → ON (click, touch or Enter). ON uses the normal cap colour, REST uses grey, ACC uses pink. The matching cap changes colour. These map directly to the existing rests/accents arrays; no new note-generation model is introduced. If an older patch has both rest and accent set, rest takes precedence until edited.

16 STEP uses green. DUAL 8 uses green for A (01–08) and filter-scope blue #48c9ee for B (09–16). Selected-bank controls and Advanced use the corresponding colour. Active-step outlines remain amber. Green is pitch colouring only; the removed secondary modulation system remains removed.

## Length

A coloured LENGTH bar beneath the steps ends at the active pattern length. Drag the right handle to the required step ending; mouse/touch positions snap to actual column boundaries. Arrow keys and Home/End adjust a focused length handle. DUAL 8 has one independent coloured bar per bank. Values remain in the existing pitchLength/bPitchLength fields (1–16 or 1–8). Numeric length remains in Advanced. Existing live length-change/reset behaviour is preserved.

## Expression matrix

Advanced contains a numbered 16-column matrix with PROB % and GATE % rows. It edits the existing probability and per-step gate arrays. Dedicated REST and ACCENT controls have been removed; the three-state buttons replace them. No stored pattern, scale or program migration is needed.

## Verification

New browser coverage tests all three states and cap colours, filter-blue bank matching, bank-coloured controls, root dropdown, actual length dragging/keyboard adjustment, matrix binding, all four retained arp relationships, optional rate/glide/velocity bindings, space/Play-Pause, typing protection, patch round trips and layouts at 1920×1080 and 1600×900. Core pause tests verify fractional timing, program counters, tempo/config edits while paused, reset and panic. Existing pitch-audio compatibility, root/PROGRAM, direction, touch, fallback and desktop workflow suites are retained/adapted.

Screenshots: reports/seq-simple-1920.png, reports/seq-simple-1600.png, reports/seq-simple-advanced.png. No physical tablet/controller verification is claimed. The previous Samsung Edge report was keyboard audio working but sequencer not running; user-side transport/status confirmation remains outstanding. Do not attribute that report to a confirmed audio-engine defect.

Rollback source: checkpoint/pre-simple-steps. Prior production: Site version 31.
