'use strict';
const $=id=>document.getElementById(id), n=id=>Number($(id).value);
let ac,processor,pointerNotes=new Map(),holdEnabled=false;
const localNotes=new Map();let engine,workletNode,starting,engineTimer,lastParams='',lastParameterValues={},latestEngineState={activeNotes:[]},pendingEngineMessages=[];let snapshotPending=false,telemetryConfig=null;const slotCalibration=[],activeNoteMask=new Uint8Array(128);let audioGeneration=0,audioEngineFailed=false,audioLastError='';
let keyboardTargets,refreshTimer=0,lastSnapshotAt=-Infinity,telemetryDirty=true,seqRevision=0;
function parameters(){const ids=['thickness','velocitySensitivity','analogCharacter','cross','lfo','vib','drift','pw','pwm','level1','level2','ring','noise','drive','cutoff','res','envAmt','motion','master','aa','ad','as','ar','fa','fd','fs','fr','detune','semi2','keyTrack','lfo1Depth','lfo2Rate','lfo2Depth'];const p={};for(const id of ids)p[id]=n(id);p.sync=$('sync').value==='on';p.wave1=$('wave1').value;p.wave2=$('wave2').value;p.oct2=Number($('oct2').value);p.filter=$('filter').value;p.bend=0;p.arpOn=$('arpOn').checked;p.arpPattern=$('arpPattern').value;p.arpDivision=n('arpDivision');p.arpOctaves=n('arpOctaves');p.arpGate=n('arpGate');p.lfo1Wave=$('lfo1Wave').value;p.lfo2Wave=$('lfo2Wave').value;p.voiceMode=$('voiceMode').value;for(const [key,value]of Object.entries(MAMB_EFFECT_DEFAULTS)){const element=$(key);if(element)p[key]=element.type==='checkbox'?element.checked:typeof value==='number'?Number(element.value):element.value}if(!processor)p.seq16=window.mambSeq16?.serialize();if(!processor)p.gestureBindings=window.mambXYAssignments;if(!processor)p.gestures=window.microseqGestures?.serialize()||window.microseqPendingGestures;if(!processor)p.midi=window.microseqMidi?.serialize()||window.microseqPendingMidi;return p}

function updateKeyboard(state){snapshotPending=false;if(state.sequencer){if(state.sequencer.config&&(state.seqRevision??seqRevision)>=seqRevision)telemetryConfig=state.sequencer.config;state.sequencer.config=telemetryConfig||state.sequencer.config;}if(state.physicalSlots)for(let i=0;i<state.physicalSlots.length;i++){const slot=state.physicalSlots[i];if(slot.calibration)slotCalibration[i]=slot.calibration;else slot.calibration=slotCalibration[i];}latestEngineState=state;window.microseqMidi?.snapshot(state.midi);activeNoteMask.fill(0);for(const note of state.activeNotes||[])activeNoteMask[note]=1;if(!keyboardTargets)keyboardTargets=document.querySelectorAll('[data-midi]');for(const key of keyboardTargets){const on=!!activeNoteMask[+key.dataset.midi];if(key.classList.contains('on')!==on)key.classList.toggle('on',on);}}
function send(m){if(m.type==='seqConfig'||m.type==='seqPatch'){m.seqRevision=++seqRevision;if(m.type==='seqConfig'){telemetryDirty=true;telemetryConfig=m.value;}else if(telemetryConfig)telemetryConfig={...telemetryConfig,...m.value};if(latestEngineState.sequencer)latestEngineState.sequencer.config=telemetryConfig;}if(m.type==='sourceOff'){window.mambSeq16?.releaseSource(m.source);window.microseqMidi?.releaseSource(m.source);}if(workletNode)workletNode.port.postMessage(m);else if(engine){engine.message(m);if(m.type!=='params')refreshState()}else if(starting){if(pendingEngineMessages.length<1024)pendingEngineMessages.push(m);else pendingEngineMessages=[{type:'panic'}]}}
function syncParameters(){const value=parameters(),serialized=JSON.stringify(value);if(serialized!==lastParams){lastParams=serialized;const changed={};for(const k of Object.keys(value))if(value[k]!==lastParameterValues[k])changed[k]=value[k];lastParameterValues=value;if(Object.keys(changed).length)send({type:'params',value:changed})}}
function syncRoute(index){send({type:'route',index,value:{source:$('route'+index+'Source').value,destination:$('route'+index+'Destination').value,amount:n('route'+index+'Amount')/100,enabled:$('route'+index+'Enabled').checked}})}
function resetRoutes(){for(let i=0;i<4;i++){$('route'+i+'Enabled').checked=false;syncRoute(i)}}
function refreshState(){if(snapshotPending)return;const wait=16-(performance.now()-lastSnapshotAt);if(wait>0){if(!refreshTimer)refreshTimer=setTimeout(()=>{refreshTimer=0;refreshState();},wait);return;}clearTimeout(refreshTimer);refreshTimer=0;lastSnapshotAt=performance.now();if(workletNode){if(snapshotPending)return;snapshotPending=true;workletNode.port.postMessage({type:'snapshot',compact:true});}else if(engine){updateKeyboard(engine.snapshot(!telemetryDirty&&!!telemetryConfig));telemetryDirty=false;}}
// Readiness describes the processor as well as browser permission; a running context alone is insufficient.
function audioState(){
 const state=ac?.state;
 $('status').textContent=audioEngineFailed?'Audio engine stopped · tap to retry':!ac?'READY · play a key or touch the instrument':!processor?(starting?'Preparing audio · please wait':audioLastError?'Audio error · tap to retry':'READY · tap to enable audio'):state==='running'?'Audio running • '+ac.mambBackend:(state==='suspended'||state==='interrupted')?'READY · tap the instrument to resume sound':'Audio '+state;
 window.dispatchEvent(new Event('mamb-audio-state'));
}
function detachAudioProcessor(){
 if(workletNode){workletNode.port.onmessage=null;workletNode.onprocessorerror=null;workletNode.port.close();}
 if(processor){if(processor.onaudioprocess)processor.onaudioprocess=null;try{processor.disconnect();}catch{}}
 processor=engine=workletNode=undefined;clearInterval(engineTimer);clearTimeout(refreshTimer);refreshTimer=0;snapshotPending=false;telemetryConfig=null;telemetryDirty=true;lastSnapshotAt=-Infinity;slotCalibration.length=0;
}
function restartAudio(){
 // Explicit recovery stops current voices/transport, retaining every editable musical document.
 window.microseqMidi?.finish();if(processor)send({type:'panic'});localNotes.clear();pointerNotes.clear();window.mambSeq16?.releaseLocalRoots();
 const previous=ac;audioGeneration++;starting=null;pendingEngineMessages=[];detachAudioProcessor();ac=undefined;audioEngineFailed=false;audioLastError='';
 // Invoke resume inside the new user gesture, without waiting for the previous context to close.
 if(previous&&previous.state!=='closed')previous.close().catch(()=>{});
 return start();
}
function start(){
 try{
 if(audioEngineFailed)return restartAudio();
 try{if(navigator.audioSession&&navigator.audioSession.type!=='play-and-record')navigator.audioSession.type='playback'}catch{}
 if(!ac||ac.state==='closed'){
  audioGeneration++;starting=null;detachAudioProcessor();
  ac=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});
  const context=ac;context.onstatechange=()=>{if(ac===context)audioState();};audioLastError='';
 }
 const context=ac,generation=audioGeneration;
 // Resume synchronously before module loading; callers wait for real permission as well as initialization.
 const resumed=context.state==='running'?Promise.resolve():context.resume();
 resumed.then(()=>{if(ac===context){if(!audioEngineFailed)audioLastError='';audioState();}},error=>{if(ac===context){audioLastError=error.message;$('status').textContent='Tap ENABLE / RESUME AUDIO · '+error.message;window.dispatchEvent(new Event('mamb-audio-state'));}});
 const ready=task=>Promise.all([task,resumed]).then(()=>ac===context&&generation===audioGeneration,error=>{if(ac!==context||generation!==audioGeneration)return false;throw error;});
 if(processor){audioState();return ready(Promise.resolve());}
 if(starting)return ready(starting);
 const attempt=(async()=>{
  // Yield before assigning readiness, including the synchronous fallback and failure paths.
  await Promise.resolve();
  try{
   if(ac!==context||generation!==audioGeneration||context.state==='closed')return;
   const initial=parameters();let backend='ScriptProcessor fallback';
   if(context.audioWorklet&&window.isSecureContext){try{
 const source=['microseq-gesture-core','mamb-sequencer','microseq-midi-core','mamb-engine','mamb-effects','mamb-instrument'].map(id=>document.getElementById(id).textContent).join('\n')+`\nclass MambProcessor extends AudioWorkletProcessor{constructor(o){super();this.engine=createMambInstrument(o.processorOptions,sampleRate);this.fullStateDirty=true;this.seqRevision=0;this.port.onmessage=e=>{if(e.data.type==='snapshot'){const state=this.engine.snapshot(!!e.data.compact&&!this.fullStateDirty);this.fullStateDirty=false;state.seqRevision=this.seqRevision;if(state.midi)state.midi.audioTime=currentTime;this.port.postMessage(state);}else{this.engine.message(e.data);if(Number.isInteger(e.data.seqRevision))this.seqRevision=e.data.seqRevision;if(e.data.type==='seqConfig')this.fullStateDirty=true;}}}process(i,o){this.engine.render(o[0][0],o[0][1],i[0]?.[0],i[0]?.[1]);return true}}registerProcessor('mamb',MambProcessor);`;
    const url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));let timeout;
    try{await Promise.race([context.audioWorklet.addModule(url),new Promise((_,reject)=>{timeout=setTimeout(()=>reject(Error('AudioWorklet initialization timed out')),8000);})]);}finally{clearTimeout(timeout);URL.revokeObjectURL(url);}
    if(ac!==context||generation!==audioGeneration||context.state==='closed')return;
    const node=new AudioWorkletNode(context,'mamb',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],processorOptions:initial});
    workletNode=node;processor=node;backend='AudioWorklet';
    node.port.onmessage=e=>{if(ac===context&&generation===audioGeneration&&workletNode===node)updateKeyboard(e.data);};
    node.onprocessorerror=()=>{if(ac!==context||generation!==audioGeneration)return;audioEngineFailed=true;audioLastError='Audio processor stopped';audioState();};
   }catch(error){if(ac!==context||generation!==audioGeneration||context.state==='closed')return;console.warn('AudioWorklet unavailable, using fallback',error);}}
   if(ac!==context||generation!==audioGeneration||context.state==='closed')return;
   if(!processor){engine=createMambInstrument(initial,context.sampleRate);const fallback=engine;processor=context.createScriptProcessor(1024,2,2);processor.onaudioprocess=e=>fallback.render(e.outputBuffer.getChannelData(0),e.outputBuffer.getChannelData(1),window.mambAudioInputActive?e.inputBuffer.getChannelData(0):undefined,window.mambAudioInputActive?e.inputBuffer.getChannelData(1):undefined);}
   processor.connect(context.destination);context.mambBackend=backend;
   const pending=pendingEngineMessages;pendingEngineMessages=[];for(const message of pending)send(message);
   lastParams=JSON.stringify(initial);lastParameterValues=initial;for(let i=0;i<4;i++)syncRoute(i);send({type:'hold',value:holdEnabled,mode:$('holdMode').value});
   clearInterval(engineTimer);engineTimer=setInterval(refreshState,50);audioState();window.dispatchEvent(new Event('mamb-audio-ready'));
  }catch(error){if(ac===context&&generation===audioGeneration){pendingEngineMessages=[];detachAudioProcessor();audioLastError=error.message;$('status').textContent='Audio error · tap to retry: '+error.message;window.dispatchEvent(new Event('mamb-audio-state'));}throw error;}
 })();
 starting=attempt;
 // Identity checks stop an older, cancelled attempt from clearing a newer attempt's readiness.
 attempt.then(()=>{if(starting===attempt)starting=null;},()=>{if(starting===attempt)starting=null;});
 return ready(attempt);
 }catch(error){audioLastError=error.message;$('status').textContent='Audio error: '+error.message;return Promise.reject(error);}
}
window.mambAudioHealth=()=>({state:ac?.state||'not activated',backend:ac?.mambBackend||null,processorReady:!!processor&&!audioEngineFailed,initializing:!!starting,failed:audioEngineFailed,error:audioLastError,currentTime:ac?.currentTime||0});
// Standard browser activation; no hidden autoplay workarounds or mandatory start button.
for(const type of ['pointerdown','pointerup','touchend','click','keydown'])window.addEventListener(type,event=>{if(event.target.closest?.('#restartAudioEngine'))return;if(!event.isTrusted||event.type==='keydown'&&(event.repeat||event.metaKey||event.ctrlKey||event.altKey))return;if(!ac||ac.state!=='running'||!processor||audioEngineFailed)start().catch(()=>{})},{capture:true,passive:true});
function noteOn(m,velocity=1,source='default'){if(!ac)start().catch(()=>{});if(window.mambSeq16?.captureNoteOn(m,source)){window.microseqMidi?.consumed();const old=localNotes.get(source+'|'+m);if(old){send({type:'off',note:m,source});localNotes.delete(source+'|'+m);}return;}if(!ac)start().catch(()=>{});window.microseqMidi?.noteOn(m,velocity,source);syncParameters();localNotes.set(source+'|'+m,{note:m,source});send({type:'on',note:m,velocity,source});refreshState()}
function noteOff(m,source='default'){window.microseqMidi?.noteOff(m,source);if(window.mambSeq16?.captureNoteOff(m,source))return;localNotes.delete(source+'|'+m);send({type:'off',note:m,source});refreshState()}
function panic(){send({type:'panic'});localNotes.clear();pointerNotes.clear();updateKeyboard({activeNotes:[]});window.dispatchEvent(new Event('mamb-panic'))}
$('panic').onclick=panic;audioState();
$('hold').onclick=()=>{holdEnabled=!holdEnabled;send({type:'hold',value:holdEnabled,mode:$('holdMode').value});$('hold').textContent=holdEnabled?'HOLD ON':'HOLD OFF';$('hold').setAttribute('aria-pressed',String(holdEnabled));$('hold').style.background=holdEnabled?'#377a62':'';refreshState()};
$('holdMode').onchange=()=>{send({type:'hold',value:holdEnabled,mode:$('holdMode').value});refreshState()};
const presets={
'Warm Ambient':{wave1:'saw',wave2:'pulse',level1:75,level2:48,cutoff:58,res:14,drive:18,aa:42,ar:65,as:90,detune:7,vib:6,drift:15,pwm:9},
'Vintage Pulse':{wave1:'pulse',wave2:'pulse',pw:38,pwm:18,level1:80,level2:45,cutoff:62,res:26,drive:27,aa:2,ar:27,as:72,detune:4},
'Slow Drift':{wave1:'saw',wave2:'triangle',level1:67,level2:70,cutoff:50,res:20,drive:12,aa:67,ar:85,as:95,drift:45,lfo:6,motion:45},
'Deep Drone':{wave1:'triangle',wave2:'saw',oct2:'-1',level1:80,level2:55,cutoff:35,res:8,drive:32,aa:70,ar:85,as:100,detune:3},
'Init VA':{wave1:'saw',wave2:'saw',oct2:'0',level1:85,level2:0,cutoff:78,res:5,drive:0,aa:0,ad:20,as:100,ar:20,detune:0,vib:0,drift:0,motion:0,ring:0,pwm:0,cross:0,sync:'off'}};
function show(){document.querySelectorAll('input[type=range]').forEach(x=>{const value=x.nextElementSibling;if(value?.classList.contains('val'))value.textContent=x.value});if(typeof refreshInstrumentUI==='function')refreshInstrumentUI()}
document.addEventListener('input',e=>{if(e.target.id.startsWith('route')){const index=Number(e.target.id.charAt(5));syncRoute(index)}else syncParameters()});document.addEventListener('change',e=>{if(e.target.id?.startsWith('route'))syncRoute(Number(e.target.id.charAt(5)));else if(e.target.matches('input,select'))syncParameters()});
const key=$('keyboard'),whiteNotes=[48,50,52,53,55,57,59,60,62,64,65,67,69,71,72,74,76,77,79,81,83,84],names=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];function name(m){return names[m%12]+(Math.floor(m/12)-1)}
for(let i=0;i<whiteNotes.length;i++){const m=whiteNotes[i],w=document.createElement('div');w.className='white';w.dataset.midi=m;w.setAttribute('aria-label',name(m));key.append(w)}
for(let i=0;i<whiteNotes.length-1;i++){const m=whiteNotes[i];if([0,2,5,7,9].includes(m%12)){const b=document.createElement('div');b.className='black';b.dataset.midi=m+1;b.style.left=((i+1)/whiteNotes.length*100-2)+'%';b.setAttribute('aria-label',name(m+1));key.append(b)}}
key.addEventListener('contextmenu',e=>e.preventDefault());
key.addEventListener('pointerdown',async e=>{const k=e.target.closest('[data-midi]');if(!k)return;e.preventDefault();const m=+k.dataset.midi,source='pointer:'+e.pointerId;const pending={note:m,source};pointerNotes.set(e.pointerId,pending);try{k.setPointerCapture(e.pointerId)}catch{}
 try{if(!ac||ac.state!=='running')await start();if(pointerNotes.get(e.pointerId)===pending)noteOn(m,1,source)}catch{pointerNotes.delete(e.pointerId)}});
function pointerUp(e){const pending=pointerNotes.get(e.pointerId);if(pending){pointerNotes.delete(e.pointerId);noteOff(pending.note,pending.source)}}
key.addEventListener('pointerup',pointerUp);key.addEventListener('pointercancel',pointerUp);key.addEventListener('lostpointercapture',pointerUp);
const keyboardMap={'a':48,'w':49,'s':50,'e':51,'d':52,'f':53,'t':54,'g':55,'y':56,'h':57,'u':58,'j':59,'k':60};
window.addEventListener('keydown',e=>{if(e.repeat||e.target.matches('input,select,textarea'))return;const char=e.key.toLowerCase(),m=keyboardMap[char];if(m!==undefined){e.preventDefault();noteOn(m,1,'keyboard:'+char)}});
window.addEventListener('keyup',e=>{const char=e.key.toLowerCase(),m=keyboardMap[char];if(m!==undefined)noteOff(m,'keyboard:'+char)});
function releaseLocal(){window.mambSeq16?.releaseLocalRoots();for(const event of [...localNotes.values()])if(event.source.startsWith('keyboard:')||event.source.startsWith('pointer:'))noteOff(event.note,event.source);pointerNotes.clear()}
window.addEventListener('blur',releaseLocal);document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseLocal()});
let midiAccess;
function midiMessage(e,device='injected'){
 const [status,note,value=0]=e.data;if(status<128||status>=240)return;const command=status&240,source='midi:'+device+':'+(status&15);
 const trusted=typeof MIDIMessageEvent!=='undefined'&&e instanceof MIDIMessageEvent&&e.isTrusted;const packet={deviceId:device,channel:status&15,type:command===176?'cc':command===224?'pitchbend':command===192?'program':'note',number:command===224?null:note,value:command===224?((value<<7|note)-8192)/8192:command===192?note:command===128?0:value,origin:trusted?'hardware':'synthetic'};if(typeof window.mambMidiAccept==='function'&&!window.mambMidiAccept(device,status&15)){window.dispatchEvent(new CustomEvent('mamb-midi-filtered',{detail:packet}));return}if(window.mambMidiRegistry&&[128,144,176,192,224].includes(command)){const result=window.mambMidiRegistry.receive(packet);if(typeof window.applyMambMidiActions==='function')window.applyMambMidiActions(result.actions||[])}if(trusted&&window.mambMidiThru)window.mambMidiThru(e.data,device);
 if(command===144&&value)noteOn(note,value/127,source);
 else if(command===128||command===144)noteOff(note,source);
 else if(command===224){const bend=((value<<7|note)-8192)/8192;send({type:'controller',source,bend});window.dispatchEvent(new CustomEvent('mamb-midi-controller-visual',{detail:{source,bend}}))}
 else if(command===176){if(note===64)send({type:'sustain',source,value:value>=64});else if(note===1){send({type:'controller',source,wheel:value/127});window.dispatchEvent(new CustomEvent('mamb-midi-controller-visual',{detail:{source,wheel:value/127}}))}else if(note===120||note===123){send({type:'sourceOff',source,hard:note===120});for(const [key,event] of localNotes)if(event.source===source)localNotes.delete(key)}}
 refreshState();
}
function connectMidi(){for(const input of midiAccess.inputs.values())input.onmidimessage=e=>midiMessage(e,input.id)}
function disconnectMidi(device){for(let channel=0;channel<16;channel++){const source='midi:'+device+':'+channel;send({type:'sourceOff',source,disconnect:true});for(const [key,event] of localNotes)if(event.source===source)localNotes.delete(key)}refreshState();window.dispatchEvent(new CustomEvent('mamb-midi-ports'))}
window.requestMambMidiAccess=async function(){if(!navigator.requestMIDIAccess)throw Error('Web MIDI is not supported by this browser');midiAccess=await navigator.requestMIDIAccess();connectMidi();midiAccess.onstatechange=e=>{if(e.port.type==='input'&&e.port.state==='disconnected')disconnectMidi(e.port.id);connectMidi();window.dispatchEvent(new Event('mamb-midi-ports'))};window.dispatchEvent(new Event('mamb-midi-ports'));return midiAccess};

if(navigator.requestMIDIAccess)window.requestMambMidiAccess().catch(()=>{});
