'use strict';
const $=id=>document.getElementById(id), n=id=>Number($(id).value);
let ac,processor,pointerNotes=new Map(),holdEnabled=false;
const localNotes=new Map();let engine,workletNode,starting,engineTimer,lastParams='',latestEngineState={activeNotes:[]},pendingEngineMessages=[];
function parameters(){const ids=['cross','lfo','vib','drift','pw','pwm','level1','level2','ring','noise','drive','cutoff','res','envAmt','motion','master','aa','ad','as','ar','fa','fd','fs','fr','detune','semi2','keyTrack','lfo1Depth','lfo2Rate','lfo2Depth'];const p={};for(const id of ids)p[id]=n(id);p.sync=$('sync').value==='on';p.wave1=$('wave1').value;p.wave2=$('wave2').value;p.oct2=Number($('oct2').value);p.filter=$('filter').value;p.bend=0;p.lfo1Wave=$('lfo1Wave').value;p.lfo2Wave=$('lfo2Wave').value;p.voiceMode=$('voiceMode').value;for(const [key,value]of Object.entries(MAMB_EFFECT_DEFAULTS)){const element=$(key);if(element)p[key]=element.type==='checkbox'?element.checked:typeof value==='number'?Number(element.value):element.value}return p}

function updateKeyboard(state){latestEngineState=state;const active=new Set(state.activeNotes);document.querySelectorAll('[data-midi]').forEach(key=>key.classList.toggle('on',active.has(+key.dataset.midi)))}
function send(m){if(workletNode)workletNode.port.postMessage(m);else if(engine){engine.message(m);if(m.type!=='params')updateKeyboard(engine.snapshot())}else if(starting){if(pendingEngineMessages.length<1024)pendingEngineMessages.push(m);else pendingEngineMessages=[{type:'panic'}]}}
function syncParameters(){const value=parameters(),serialized=JSON.stringify(value);if(serialized!==lastParams){lastParams=serialized;send({type:'params',value})}}
function syncRoute(index){send({type:'route',index,value:{source:$('route'+index+'Source').value,destination:$('route'+index+'Destination').value,amount:n('route'+index+'Amount')/100,enabled:$('route'+index+'Enabled').checked}})}
function resetRoutes(){for(let i=0;i<4;i++){$('route'+i+'Enabled').checked=false;syncRoute(i)}}
function refreshState(){if(workletNode)workletNode.port.postMessage({type:'snapshot'});else if(engine)updateKeyboard(engine.snapshot())}
function audioState(){if(!ac){$('status').textContent='READY · play a key or touch the instrument';return}const state=ac.state;$('status').textContent=state==='running'?'Audio running • '+(ac.mambBackend||'preparing engine'):state==='suspended'?'READY · tap or play a key to enable sound (browser permission)':'Audio '+state;window.dispatchEvent(new Event('mamb-audio-state'))}
function start(){
 try{
 if(!ac||ac.state==='closed'){ac=new (window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});processor=undefined;engine=undefined;workletNode=undefined;ac.onstatechange=audioState}
 // Resume synchronously in the originating gesture, before awaiting Worklet loading.
 if(ac.state!=='running')ac.resume().then(audioState).catch(error=>{$('status').textContent='Audio permission: '+error.message});
 if(processor){audioState();return Promise.resolve()}
 if(starting)return starting;
 starting=(async()=>{try{const initial=parameters();let backend='ScriptProcessor fallback';
 if(ac.audioWorklet&&window.isSecureContext){try{
 const source=['mamb-engine','mamb-effects','mamb-instrument'].map(id=>document.getElementById(id).textContent).join('\n')+`\nclass MambProcessor extends AudioWorkletProcessor{constructor(o){super();this.engine=createMambInstrument(o.processorOptions,sampleRate);this.port.onmessage=e=>{if(e.data.type==='snapshot')this.port.postMessage(this.engine.snapshot());else this.engine.message(e.data)}}process(i,o){this.engine.render(o[0][0],o[0][1],i[0]?.[0],i[0]?.[1]);return true}}registerProcessor('mamb',MambProcessor);`;
 const url=URL.createObjectURL(new Blob([source],{type:'text/javascript'}));try{await ac.audioWorklet.addModule(url)}finally{URL.revokeObjectURL(url)}
 workletNode=new AudioWorkletNode(ac,'mamb',{numberOfInputs:1,numberOfOutputs:1,outputChannelCount:[2],processorOptions:initial});processor=workletNode;backend='AudioWorklet';workletNode.port.onmessage=e=>updateKeyboard(e.data);workletNode.onprocessorerror=()=>{$('status').textContent='Audio engine error — reload to restart'};
 }catch(error){console.warn('AudioWorklet unavailable, using fallback',error)}}
 if(!processor){engine=createMambInstrument(initial,ac.sampleRate);processor=ac.createScriptProcessor(1024,2,2);processor.onaudioprocess=e=>engine.render(e.outputBuffer.getChannelData(0),e.outputBuffer.getChannelData(1),window.mambAudioInputActive?e.inputBuffer.getChannelData(0):undefined,window.mambAudioInputActive?e.inputBuffer.getChannelData(1):undefined)}
 processor.connect(ac.destination);const pending=pendingEngineMessages;pendingEngineMessages=[];for(const message of pending)send(message);ac.mambBackend=backend;lastParams=JSON.stringify(initial);for(let i=0;i<4;i++)syncRoute(i);send({type:'hold',value:holdEnabled,mode:$('holdMode').value});clearInterval(engineTimer);engineTimer=setInterval(()=>{syncParameters();refreshState()},50);audioState();window.dispatchEvent(new Event('mamb-audio-ready'));
 }catch(error){pendingEngineMessages=[];$('status').textContent='Audio error: '+error.message;throw error}finally{starting=null}})();return starting;
 }catch(error){$('status').textContent='Audio error: '+error.message;return Promise.reject(error)}
}
// Standard browser activation; no hidden autoplay workarounds or mandatory start button.
for(const type of ['pointerdown','keydown'])window.addEventListener(type,event=>{if(!event.isTrusted||event.type==='keydown'&&(event.repeat||event.metaKey||event.ctrlKey||event.altKey))return;if(!ac||ac.state!=='running')start().catch(()=>{})},{capture:true});
function noteOn(m,velocity=1,source='default'){if(!ac)start().catch(()=>{});syncParameters();localNotes.set(source+'|'+m,{note:m,source});send({type:'on',note:m,velocity,source});refreshState()}
function noteOff(m,source='default'){localNotes.delete(source+'|'+m);send({type:'off',note:m,source});refreshState()}
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
document.addEventListener('input',e=>{if(e.target.id.startsWith('route')){const index=Number(e.target.id.charAt(5));syncRoute(index)}else syncParameters()});document.addEventListener('change',e=>{if(e.target.id==='voiceMode')syncParameters()});
const key=$('keyboard'),whiteNotes=[48,50,52,53,55,57,59,60,62,64,65,67,69,71,72],names=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];function name(m){return names[m%12]+(Math.floor(m/12)-1)}
for(let i=0;i<whiteNotes.length;i++){const m=whiteNotes[i],w=document.createElement('div');w.className='white';w.dataset.midi=m;w.textContent=name(m);key.append(w)}
for(let i=0;i<whiteNotes.length-1;i++){const m=whiteNotes[i];if([0,2,5,7,9].includes(m%12)){const b=document.createElement('div');b.className='black';b.dataset.midi=m+1;b.style.left=((i+1)/whiteNotes.length*100-2)+'%';b.textContent=name(m+1);key.append(b)}}
key.addEventListener('contextmenu',e=>e.preventDefault());
key.addEventListener('pointerdown',async e=>{const k=e.target.closest('[data-midi]');if(!k)return;e.preventDefault();const m=+k.dataset.midi,source='pointer:'+e.pointerId;const pending={note:m,source};pointerNotes.set(e.pointerId,pending);try{k.setPointerCapture(e.pointerId)}catch{}
 try{if(!ac||ac.state!=='running')await start();if(pointerNotes.get(e.pointerId)===pending)noteOn(m,1,source)}catch{pointerNotes.delete(e.pointerId)}});
function pointerUp(e){const pending=pointerNotes.get(e.pointerId);if(pending){pointerNotes.delete(e.pointerId);noteOff(pending.note,pending.source)}}
key.addEventListener('pointerup',pointerUp);key.addEventListener('pointercancel',pointerUp);key.addEventListener('lostpointercapture',pointerUp);
const keyboardMap={'a':48,'w':49,'s':50,'e':51,'d':52,'f':53,'t':54,'g':55,'y':56,'h':57,'u':58,'j':59,'k':60};
window.addEventListener('keydown',e=>{if(e.repeat||e.target.matches('input,select,textarea'))return;const char=e.key.toLowerCase(),m=keyboardMap[char];if(m!==undefined){e.preventDefault();noteOn(m,1,'keyboard:'+char)}});
window.addEventListener('keyup',e=>{const char=e.key.toLowerCase(),m=keyboardMap[char];if(m!==undefined)noteOff(m,'keyboard:'+char)});
function releaseLocal(){for(const event of [...localNotes.values()])if(event.source.startsWith('keyboard:')||event.source.startsWith('pointer:'))noteOff(event.note,event.source);pointerNotes.clear()}
window.addEventListener('blur',releaseLocal);document.addEventListener('visibilitychange',()=>{if(document.hidden)releaseLocal()});
let midiAccess;
function midiMessage(e,device='injected'){
 const [status,note,value=0]=e.data;if(status<128||status>=240)return;const command=status&240,source='midi:'+device+':'+(status&15);
 const trusted=typeof MIDIMessageEvent!=='undefined'&&e instanceof MIDIMessageEvent&&e.isTrusted;const packet={deviceId:device,channel:status&15,type:command===176?'cc':command===224?'pitchbend':command===192?'program':'note',number:command===224?null:note,value:command===224?((value<<7|note)-8192)/8192:command===192?note:command===128?0:value,origin:trusted?'hardware':'synthetic'};if(typeof window.mambMidiAccept==='function'&&!window.mambMidiAccept(device,status&15)){window.dispatchEvent(new CustomEvent('mamb-midi-filtered',{detail:packet}));return}if(window.mambMidiRegistry&&[128,144,176,192,224].includes(command)){const result=window.mambMidiRegistry.receive(packet);if(typeof window.applyMambMidiActions==='function')window.applyMambMidiActions(result.actions||[])}if(trusted&&window.mambMidiThru)window.mambMidiThru(e.data,device);
 if(command===144&&value)noteOn(note,value/127,source);
 else if(command===128||command===144)noteOff(note,source);
 else if(command===224)send({type:'controller',source,bend:((value<<7|note)-8192)/8192});
 else if(command===176){if(note===64)send({type:'sustain',source,value:value>=64});else if(note===1)send({type:'controller',source,wheel:value/127});else if(note===120||note===123){send({type:'sourceOff',source,hard:note===120});for(const [key,event] of localNotes)if(event.source===source)localNotes.delete(key)}}
 refreshState();
}
function connectMidi(){for(const input of midiAccess.inputs.values())input.onmidimessage=e=>midiMessage(e,input.id)}
function disconnectMidi(device){for(let channel=0;channel<16;channel++){const source='midi:'+device+':'+channel;send({type:'sourceOff',source,disconnect:true});for(const [key,event] of localNotes)if(event.source===source)localNotes.delete(key)}refreshState();window.dispatchEvent(new CustomEvent('mamb-midi-ports'))}
window.requestMambMidiAccess=async function(){if(!navigator.requestMIDIAccess)throw Error('Web MIDI is not supported by this browser');midiAccess=await navigator.requestMIDIAccess();connectMidi();midiAccess.onstatechange=e=>{if(e.port.type==='input'&&e.port.state==='disconnected')disconnectMidi(e.port.id);connectMidi();window.dispatchEvent(new Event('mamb-midi-ports'))};window.dispatchEvent(new Event('mamb-midi-ports'));return midiAccess};

if(navigator.requestMIDIAccess)window.requestMambMidiAccess().catch(()=>{});
