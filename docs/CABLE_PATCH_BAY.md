# Cable patch bay

The existing four-route engine is unchanged. Eight source sockets and six destination sockets occupy the original section bounds. Original route IDs remain hidden state bindings for patches, MIDI and the synth adapter.

Drag a source to a destination (or click opposite sockets) to allocate the lowest available link: 1–4, all mint teal to match the patch-name lettering. Every lead carries its number. No ON/OFF controls are displayed. At capacity a modal offers Cancel or a numbered link to delete and replace with the attempted connection. Cancel leaves all four links unchanged.

Drag a connected destination away from its socket to disconnect. If several cables share that destination, the selected matching cable is removed; otherwise the most recently numbered matching cable is removed. Select a cable or numbered slider to identify it first. Keyboard users may select a cable and press Delete or Backspace.

The four amount sliders use the Voice-style 3px recessed track and 15×12px physical cap. Caps are grey unless their connected link is selected, then take that link's colour. Amount range remains −100% to +100%, zero neutral. Disconnected sliders are disabled. Reusing a disconnected slot preserves its existing amount.

No DSP, voice, clock or patch format changes. Cable updates run on route changes and resize, without a polling timer. Browser tests passed automatic allocation, all four numbered links, full-bay Cancel and replacement, drag-away removal, free-slot reuse, selected/grey caps, negative amount, patch recall and audible output with no page errors. Screenshots reviewed. Physical Windows/touchscreen testing not performed.

Rollback: Site v58 and checkpoint/pre-auto-cable-links-2026-11-08.

Sockets are grey when unconnected and filled with the shared mint cable colour when connected. Shared sockets show the selected matching link, otherwise the highest-numbered matching link. Disconnecting the last cable returns a socket to grey. Rendered pseudo-element colours verified for all four links and empty sockets.

Unified accent: #73E9D0, matched to the rendered patch-name text. Cable numbers, selection brightness, neutral grey sockets and grey unselected caps retain their existing distinctions.
