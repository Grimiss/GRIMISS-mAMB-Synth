// Local performance gestures and MIDI visual feedback share a view, never controller ownership.
(function(){
 const panel=document.querySelector('main>.performance-panel .inner'),bay=document.createElement('div');bay.className='performance-wheels';bay.innerHTML='<div class="wheel-unit"><label for="performancePitch">PITCH</label><div class="wheel-slot"><input id="performancePitch" type="range" min="-1" max="1" step="0.001" value="0" aria-label="Pitch wheel, spring return"><span class="wheel-drum"></span></div></div><div class="wheel-unit"><label for="performanceMod">MOD</label><div class="wheel-slot"><input id="performanceMod" type="range" min="0" max="1" step="0.001" value="0" aria-label="Modulation wheel"><span class="wheel-drum"></span></div></div><div class="octave-unit"><span>OCTAVE</span><output id="performanceOctave">0</output><div><button id="octaveDown" type="button" aria-label="Keyboard octave down">−</button><button id="octaveUp" type="button" aria-label="Keyboard octave up">+</button></div></div>';panel.prepend(bay);
 const pitch=document.getElementById('performancePitch'),mod=document.getElementById('performanceMod'),local={bend:0,wheel:0},gestures=new Map();let octave=0;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function paint(node,value,source='local'){node.value=String(value);node.parentElement.style.setProperty('--wheel',String(value));node.dataset.visualSource=source;node.setAttribute('aria-valuetext',node===pitch?(value*2).toFixed(2)+' semitones':Math.round(value*100)+'% modulation')}
 function apply(){send({type:'performance',bend:local.bend,wheel:local.wheel})}
 function edit(node,value){value=clamp(value,Number(node.min),Number(node.max));if(node===pitch)local.bend=value;else local.wheel=value;paint(node,value);apply()}
 function resetPitch(){local.bend=0;paint(pitch,0);apply()}
 function active(node){for(const g of gestures.values())if(g.node===node)return true;return false}
 for(const node of [pitch,mod]){
  // Native vertical range tracking varies by browser and used absolute click positions.
  // Own the pointer gesture so a captured upward drag always increases the value.
  node.addEventListener('pointerdown',event=>{if(event.pointerType==='mouse'&&event.button!==0)return;event.preventDefault();node.focus({preventScroll:true});for(const [id,g]of gestures)if(g.node===node)gestures.delete(id);const value=node===pitch?local.bend:local.wheel;paint(node,value);gestures.set(event.pointerId,{node,y:event.clientY,value,height:Math.max(1,node.getBoundingClientRect().height)});try{node.setPointerCapture(event.pointerId)}catch{}});
  node.addEventListener('touchstart',event=>event.preventDefault(),{passive:false});node.addEventListener('touchmove',event=>event.preventDefault(),{passive:false});
  node.addEventListener('input',()=>edit(node,Number(node.value)));
  node.addEventListener('lostpointercapture',finish);
 }
 function move(event){const g=gestures.get(event.pointerId);if(!g)return;event.preventDefault();const span=Number(g.node.max)-Number(g.node.min);edit(g.node,g.value+(g.y-event.clientY)*span/g.height)}
 function finish(event){const g=gestures.get(event.pointerId);if(!g)return;gestures.delete(event.pointerId);if(g.node===pitch)resetPitch();try{if(g.node.hasPointerCapture(event.pointerId))g.node.releasePointerCapture(event.pointerId)}catch{}}
 window.addEventListener('pointermove',move,{passive:false});window.addEventListener('pointerup',finish);window.addEventListener('pointercancel',finish);
 function stopGestures(){const hadPitch=active(pitch);for(const [id,g]of gestures){try{if(g.node.hasPointerCapture(id))g.node.releasePointerCapture(id)}catch{}}gestures.clear();if(hadPitch||local.bend!==0)resetPitch()}
 window.addEventListener('blur',stopGestures);document.addEventListener('visibilitychange',()=>{if(document.hidden)stopGestures()});pitch.addEventListener('keyup',event=>{if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Home','End'].includes(event.key))resetPitch()});
 // MIDI messages already reach their original device/channel-owned engine controllers.
 // Reflect the last accepted external movement without re-sending it as a local controller.
 window.addEventListener('mamb-midi-controller-visual',event=>{const d=event.detail||{};if(Number.isFinite(d.bend)&&!active(pitch))paint(pitch,clamp(d.bend,-1,1),d.source||'midi');if(Number.isFinite(d.wheel)&&!active(mod))paint(mod,clamp(d.wheel,0,1),d.source||'midi')});
 window.addEventListener('mamb-audio-ready',apply);
 window.addEventListener('mamb-panic',()=>{gestures.clear();local.bend=local.wheel=0;paint(pitch,0);paint(mod,0);apply()});
 const original=noteOn;noteOn=function(note,velocity=1,source='default'){if(source.startsWith('keyboard:')||source.startsWith('pointer:')){note=clamp(note+12*octave,0,127)}return original(note,velocity,source)};
 const originalOff=noteOff;noteOff=function(note,source='default'){if(source.startsWith('keyboard:')||source.startsWith('pointer:')){const owner=[...localNotes.values()].find(e=>e.source===source);if(owner)note=owner.note}return originalOff(note,source)};
 const originalUpdate=updateKeyboard;updateKeyboard=function(state){originalUpdate(state);const notes=new Set(state.activeNotes);document.querySelectorAll('[data-midi]').forEach(key=>key.classList.toggle('on',notes.has(Number(key.dataset.midi)+12*octave)))};
 function transpose(delta){releaseLocal();octave=clamp(octave+delta,-2,2);document.querySelectorAll('[data-midi]').forEach(key=>key.setAttribute('aria-label',name(Number(key.dataset.midi)+12*octave)));document.querySelector('main>.performance-panel h2').textContent='PLAY — '+name(48+12*octave)+' TO '+name(84+12*octave);document.getElementById('performanceOctave').textContent=octave>0?'+'+octave:String(octave);document.getElementById('octaveDown').disabled=octave===-2;document.getElementById('octaveUp').disabled=octave===2}
 document.getElementById('octaveDown').onclick=()=>transpose(-1);document.getElementById('octaveUp').onclick=()=>transpose(1);paint(pitch,0);paint(mod,0);apply();window.mambPhysicalPerformance={get octave(){return octave},get localController(){return {...local}},resetPitch};
})();
