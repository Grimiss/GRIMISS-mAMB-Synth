// Shared independently implemented DSP, used by Worklet, fallback and offline tests.
function createMambEngine(initial, sr=48000, seed=12345){
// New controls default to neutral values for v0.4 patch compatibility.
initial={thickness:0,velocitySensitivity:0,analogCharacter:0,lfo1Wave:'sine',lfo1Depth:100,lfo2Wave:'triangle',lfo2Rate:20,lfo2Depth:100,...initial};
for(const key of ['analogCharacter','thickness','velocitySensitivity'])initial[key]=Number.isFinite(initial[key])?Math.max(0,Math.min(100,initial[key])):0;
let performanceBend=0,performanceWheel=0;
let voices=[],clock=0,smoothMix=1,params={...initial},target={...initial},serial=0,hold=false,mode='add',group=-1,tick=0,frames=0,rebuilding=false;
const TWO=2*Math.PI,dt=1/sr,alpha=1-Math.exp(-dt/.015),controlAlpha=1-Math.exp(-16*dt/.015);
const owners=new Map(),controllers=new Map(),moving=[];let cacheDirty=true;
const mod={aa:0,ad:0,ar:0,fa:0,fd:0,fr:0,lfo:0,lfo2:0,ratio2:1,baseCut:1000,drive:1,driveNorm:1,k:2,thickRatio:1,analogStrength:0,ageTone:1,ageOutput:1,ageFlutter:0,level1:0,level2:0,wheelGate:1};
const spectra=[[1,.12,.48,.08,.25,.04,.13],[.55,.14,.75,.09,.52,.07,.28],[.32,.85,.14,.61,.07,.39,.18]];
const waveNames=['saw','pulse','triangle','sine','dwgs1','dwgs2','dwgs3'],filterNames=['lp','lp24','hp','bp'];
function mixState(names,value){const weights=new Float64Array(names.length);const index=Math.max(0,names.indexOf(value));weights[index]=1;return {names,weights,steps:new Float64Array(names.length),index,left:0}}
const mix1=mixState(waveNames,params.wave1),mix2=mixState(waveNames,params.wave2),filterMix=mixState(filterNames,params.filter);
function changeMix(m,value){const index=m.names.indexOf(value);if(index<0||index===m.index)return;m.index=index;m.left=Math.max(1,Math.round(sr*.008));for(let i=0;i<m.weights.length;i++)m.steps[i]=((i===index?1:0)-m.weights[i])/m.left}
function advanceMix(m){if(!m.left)return;for(let i=0;i<m.weights.length;i++)m.weights[i]+=m.steps[i];if(!--m.left)for(let i=0;i<m.weights.length;i++)m.weights[i]=i===m.index?1:0}
const lfoStates=[{phase:0,value:0,random:12345,held:0},{phase:0,value:0,random:98765,held:0}];
function lfoValue(state,wave,rate){const t=state.phase;let value;
 switch(wave){case 'triangle':value=1-4*Math.abs(t-.5);break;case 'saw':value=2*t-1;break;case 'square':value=t<.5?1:-1;break;case 'sh':value=state.held;break;default:value=Math.sin(TWO*t)}
 state.value=value;state.phase+=rate*dt;if(state.phase>=1){state.phase-=Math.floor(state.phase);state.random=(Math.imul(state.random,1664525)+1013904223)>>>0;state.held=state.random/2147483648-1}return value;
}
for(const state of lfoStates){state.random=(Math.imul(state.random,1664525)+1013904223)>>>0;state.held=state.random/2147483648-1}
const sources=['filterEnv','ampEnv','lfo1','lfo2','velocity','keyTrack','bend','wheel'];
const destinations=['pitch','osc2','pw','cutoff','amp','noise'];
const routes=Array.from({length:4},()=>({source:'lfo2',destination:'cutoff',target:0,enabled:false,taps:Array.from({length:sources.length*destinations.length},(_,index)=>({source:Math.floor(index/destinations.length),dest:index%destinations.length,amount:0,target:0,active:false}))}));
const activeTaps=[];
function controller(source){let c=controllers.get(source);if(!c){c={sustain:false,bend:0,wheel:0};controllers.set(source,c)}return c}
function routed(v,fe,ae){const values=v.mods;values.fill(0);for(let i=0;i<activeTaps.length;i++){const tap=activeTaps[i];let value=0;switch(tap.source){case 0:value=fe;break;case 1:value=ae;break;case 2:value=mod.lfo;break;case 3:value=mod.lfo2;break;case 4:value=v.velocity;break;case 5:value=(v.note-60)/60;break;case 6:value=v.bend;break;case 7:value=v.wheel;break}values[tap.dest]+=value*tap.amount}}

function control(){
 if(moving.length)cacheDirty=true;for(let i=moving.length-1;i>=0;i--){const key=moving[i];params[key]+=(target[key]-params[key])*controlAlpha;if(Math.abs(target[key]-params[key])<1e-7){params[key]=target[key];moving[i]=moving[moving.length-1];moving.pop()}}
 if(cacheDirty){const p=params;mod.aa=.005+(p.aa/100)**2*5;mod.ad=.005+(p.ad/100)**2*5;mod.ar=.005+(p.ar/100)**2*5;mod.fa=.005+(p.fa/100)**2*5;mod.fd=.005+(p.fd/100)**2*5;mod.fr=.005+(p.fr/100)**2*5;
 mod.rate1=.025+(p.lfo/100)**2*8;mod.rate2=.005+(p.lfo2Rate/100)**2*8;mod.ratio2=2**(p.oct2+p.semi2/12+p.detune/1200);mod.baseCut=50*320**(p.cutoff/100);const age=p.analogCharacter/100,baseDrive=1+p.drive/10;mod.drive=Math.min(11,baseDrive+4*age);mod.ageTone=1-.22*age;mod.ageFlutter=3*age*age;mod.driveNorm=1/Math.tanh(mod.drive);mod.ageOutput=(Math.tanh(baseDrive*.5)/Math.tanh(baseDrive))/(Math.tanh(mod.drive*.5)*mod.driveNorm);mod.k=Math.max(.35,2-.018*p.res);
 // Reuse OSC2: a quiet companion and bounded static tuning, not extra oscillators/voices.
 const thick=p.thickness/100,a=p.level1/100,b=p.level2/100,extra=.45*Math.max(0,a-b)*thick,normal=Math.sqrt((a*a+b*b)/Math.max(1e-20,a*a+(b+extra)*(b+extra)));
 mod.level1=a*normal;mod.level2=(b+extra)*normal;mod.thickRatio=2**((p.voiceMode==='unison'?0:(a>0?Math.sign(p.detune||1)*Math.max(0,12-Math.abs(p.detune))*thick:0))/1200);mod.analogStrength=4*(p.analogCharacter/100)**1.5;cacheDirty=false;}
 // Sparse preallocated taps preserve old paths while rewiring, including rapid edits.
 let wheelGate=1;for(let i=0;i<activeTaps.length;i++){const tap=activeTaps[i];if(tap.dest===0&&(tap.source===2||tap.source===7)&&tap.target!==0){wheelGate=0;break}}mod.wheelGate+=(wheelGate-mod.wheelGate)*controlAlpha;if(Math.abs(wheelGate-mod.wheelGate)<1e-7)mod.wheelGate=wheelGate;
 const hadTaps=activeTaps.length;for(let i=activeTaps.length-1;i>=0;i--){const tap=activeTaps[i];tap.amount+=(tap.target-tap.amount)*controlAlpha;if(Math.abs(tap.target-tap.amount)<1e-8)tap.amount=tap.target;if(tap.target===0&&tap.amount===0){tap.active=false;activeTaps[i]=activeTaps[activeTaps.length-1];activeTaps.pop()}}
 if(hadTaps&&!activeTaps.length)for(const v of voices)v.mods.fill(0);
 for(const v of voices){analogControl(v);if(Math.abs(v.ic1)<1e-24)v.ic1=0;if(Math.abs(v.ic2)<1e-24)v.ic2=0;if(Math.abs(v.ic3)<1e-24)v.ic3=0;if(Math.abs(v.ic4)<1e-24)v.ic4=0}

}
// Eight physical oscillator/calibration slots. Separate RNGs never perturb the audio-noise stream.
let phaseSeed=seed,calibrationSeed=(seed^0x6a09e667)>>>0;
function phaseRandom(){phaseSeed=(Math.imul(phaseSeed,1664525)+1013904223)>>>0;return phaseSeed/4294967296}
function calibrationRandom(){calibrationSeed=(Math.imul(calibrationSeed,1664525)+1013904223)>>>0;return calibrationSeed/4294967296}
function tolerance(){return calibrationRandom()*2-1}
const slots=Array.from({length:8},(_,index)=>({index,p1:phaseRandom(),p2:phaseRandom(),seed:phaseRandom(),driftRate:.07+phaseRandom()*.15,frame:0,inc1:440/sr,inc2:440/sr,current:null,
 calibration:{tune1:tolerance()*2,tune2:tolerance()*2,cutoff:tolerance()*.02,aa:tolerance()*.03,ad:tolerance()*.03,fa:tolerance()*.03,fd:tolerance()*.03,gainDb:tolerance()*.5},
 drift1:{seed:(calibrationRandom()*4294967296)>>>0,period:Math.round(sr*(3+calibrationRandom()*5)),segment:-1,from:0,to:0,value:0},
 drift2:{seed:(calibrationRandom()*4294967296)>>>0,period:Math.round(sr*(3+calibrationRandom()*5)),segment:-1,from:0,to:0,value:0}}));
function driftPoint(seed,index){let x=(seed+Math.imul(index,0x9e3779b9))>>>0;x=Math.imul(x^(x>>>16),0x21f0aaad);x=Math.imul(x^(x>>>15),0x735a2d97);return ((x^(x>>>15))>>>0)/2147483648-1}
function driftValue(d){const segment=Math.floor(frames/d.period),u=(frames%d.period)/d.period;if(segment!==d.segment){d.segment=segment;d.from=driftPoint(d.seed,segment);d.to=driftPoint(d.seed,segment+1)}d.value=d.from+(d.to-d.from)*u*u*(3-2*u);return d.value}
function park(v,frame=frames){const slot=v.slot;if(!slot||slot.current!==v)return;slot.p1=v.p1;slot.p2=v.p2;slot.inc1=v.inc1;slot.inc2=v.inc2;slot.frame=frame;slot.current=null;v.slot=null}
function steal(v){park(v);v.stealFade=1}
function analogControl(v){const c=v.calibration,strength=mod.analogStrength;
 if(v.velocitySetting!==params.velocitySensitivity){v.velocitySetting=params.velocitySensitivity;v.velocityTarget=v.velocitySetting===0?1:v.velocity**(1.5*v.velocitySetting/100)}
 // Drift is sampled on the existing 16-frame control clock, never with per-sample RNG.
 if(strength>0){const s=v.physicalSlot;v.analog1=2**(((c.tune1+3*driftValue(s.drift1))*strength+mod.ageFlutter*Math.sin(TWO*(clock*(.8+v.seed*.4)+v.seed)))/1200);v.analog2=2**(((c.tune2+3*driftValue(s.drift2))*strength+mod.ageFlutter*Math.sin(TWO*(clock*(.95+v.seed*.3)+v.seed+.31)))/1200);v.analogCut=1+c.cutoff*strength;v.analogGain=10**(c.gainDb*strength/20)}else{v.analog1=v.analog2=v.analogCut=v.analogGain=1}
 v.aa=mod.aa*(1+c.aa*strength);v.ad=mod.ad*(1+c.ad*strength);v.fa=mod.fa*(1+c.fa*strength);v.fd=mod.fd*(1+c.fd*strength);
}

function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296}
function polyblep(t,dt){if(t<dt){t/=dt;return t+t-t*t-1}if(t>1-dt){t=(t-1)/dt;return t*t+t+t+1}return 0}
function osc(w,p,inc,pw){if(w==='sine')return Math.sin(TWO*p);if(w==='triangle')return 1-4*Math.abs(p-.5);if(w==='pulse'){let x=(p<pw?1:-1);x+=polyblep(p,inc);x-=polyblep((p-pw+1)%1,inc);return x}return 2*p-1-polyblep(p,inc)}
// Capture UI parameters once per audio block, never query the DOM per sample.
// Original digital harmonic spectra, deliberately not Korg ROM/DWGS samples.
function digitalWave(type,phase,hz,sr){
 const coeff=spectra[type==='dwgs1'?0:type==='dwgs2'?1:2];
 let sum=0;for(let k=0;k<coeff.length;k++){const harmonic=k+1;if(hz*harmonic>=sr*.45)break;sum+=coeff[k]*Math.sin(TWO*phase*harmonic)}
 return sum*.52
}
function updateEnv(e,dt,a,d,s,r){if(e.stage==='attack'){e.value=Math.min(1,e.value+dt/a);if(e.value>=1)e.stage='decay'}else if(e.stage==='decay'){e.value=Math.max(s,e.value-(1-s)*dt/d);if(e.value<=s)e.stage='sustain'}else if(e.stage==='sustain')e.value=s;else if(e.stage==='release'){e.value=Math.max(0,e.value-e.releaseLevel*dt/r);if(e.value<=0)e.stage='off'}return e.value}
function mixedOsc(m,phase,inc,width,hz){if(!m.left){const w=waveNames[m.index];return m.index>=4?digitalWave(w,phase,hz,sr):osc(w,phase,inc,width)}let out=0;for(let i=0;i<m.weights.length;i++)if(Math.abs(m.weights[i])>1e-10)out+=m.weights[i]*(i>=4?digitalWave(waveNames[i],phase,hz,sr):osc(waveNames[i],phase,inc,width));return out}
function sample(v,sr,p,mod){
const fe=updateEnv(v.fil,dt,v.fa,v.fd,p.fs/100,mod.fr),ae=updateEnv(v.amp,dt,v.aa,v.ad,p.as/100,mod.ar);
const bendTarget=performanceBend===0?v.owner.controller.bend:Math.max(-1,Math.min(1,v.owner.controller.bend+performanceBend)),wheelTarget=Math.max(v.owner.controller.wheel,performanceWheel);v.bend+=(bendTarget-v.bend)*alpha;v.wheel+=(wheelTarget-v.wheel)*alpha;
if(activeTaps.length)routed(v,fe,ae);const rm=v.mods;
const lfo=mod.lfo,vib=(p.vib*.00015+v.wheel*.3*mod.wheelGate)*lfo,drift=p.drift*.00006*Math.sin(TWO*(clock*v.driftRate+v.seed)),pitch=2**((vib+drift+p.bend*2+v.bend*2+v.stackDetune/100+rm[0]*12)/12),f1=v.hz*pitch*v.analog1,f2=v.hz*pitch*mod.ratio2*mod.thickRatio*2**rm[1]*v.analog2,inc1=Math.min(.49,f1/sr),inc2=Math.min(.49,f2/sr);
v.inc1=inc1;v.inc2=inc2;const wrapped=v.p1+inc1>=1;v.p1=(v.p1+inc1)%1;if(p.sync&&wrapped)v.p2=0;v.p2=(v.p2+inc2)%1;const width=Math.max(.08,Math.min(.92,p.pw/100+p.pwm/100*lfo+rm[2]*.4));let x1=mixedOsc(mix1,v.p1,inc1,width,f1);
const modPhase=(v.p2+(p.cross/100)*.24*x1+1)%1;
let x2=mixedOsc(mix2,modPhase,Math.min(.49,inc2*(1+p.cross/100)),.5,f2),ring=p.ring/100;let x=(x1*mod.level1+x2*mod.level2)*(1-ring)+x1*x2*ring*.9+(random()*2-1)*Math.max(0,Math.min(100,p.noise+rm[5]*50))/250;
x=Math.tanh(x*mod.drive)*mod.driveNorm;
let cut=mod.baseCut*v.analogCut*mod.ageTone*Math.pow(2,p.envAmt/100*fe*4+p.motion/100*lfo*2+p.keyTrack/100*(v.note-60)/12+rm[3]*4);
// Clamp cutoff well below Nyquist and slew the filter coefficient per voice.
// This avoids sudden coefficient jumps on touchscreen sweeps with held notes.
cut=Math.max(30,Math.min(sr*.22,cut));
if(!Number.isFinite(v.smoothCut))v.smoothCut=cut;
v.smoothCut+=Math.min(1,dt*110)*(cut-v.smoothCut);
cut=v.smoothCut;
// Canonical TPT SVF: damping is already included in a1, not subtracted again from v3.
const g=Math.tan(Math.PI*cut/sr),k=mod.k,a1=1/(1+g*(g+k)),a2=g*a1,a3=g*a2;
const v3=x-v.ic2,v1=a1*v.ic1+a2*v3,v2=v.ic2+a2*v.ic1+a3*v3;
v.ic1=2*v1-v.ic1;v.ic2=2*v2-v.ic2;
// Never allow a non-finite filter state to poison the audio stream.
if(!Number.isFinite(v.ic1)||!Number.isFinite(v.ic2)) {v.ic1=0;v.ic2=0;}
// Keep both stages warm so filter-mode changes can blend existing states.
const z=v2-v.ic4,b1=a1*v.ic3+a2*z,b2=v.ic4+a2*v.ic3+a3*z;v.ic3=2*b1-v.ic3;v.ic4=2*b2-v.ic4;
const weights=filterMix.weights;let y=weights[0]*v2+weights[1]*b2+weights[2]*(x-k*v1-v2)+weights[3]*v1;
if(!Number.isFinite(y)||!Number.isFinite(v.ic3)||!Number.isFinite(v.ic4)){v.ic1=v.ic2=v.ic3=v.ic4=0;y=0}
if(v.velocityGain!==v.velocityTarget){v.velocityGain+=(v.velocityTarget-v.velocityGain)*alpha;if(Math.abs(v.velocityTarget-v.velocityGain)<1e-8)v.velocityGain=v.velocityTarget}
let fade=v.stealFade===undefined?1:Math.max(0,v.stealFade);if(v.stealFade!==undefined)v.stealFade-=dt/.018;
// Preserve dynamics of a single voice; summing is managed at the master.
return Math.tanh(y*1.15)*ae*.20*fade*v.velocityGain*v.analogGain*mod.ageOutput*Math.max(0,Math.min(2,1+rm[4]))}

function releaseOwner(owner){if(owner.down||owner.latched||owner.sustained)return;for(const v of voices)if(v.owner===owner&&v.amp.stage!=='release')for(const key of ['amp','fil']){v[key].releaseLevel=v[key].value;v[key].stage='release'}}
function ownerHasVoices(owner){for(let i=0;i<voices.length;i++){const v=voices[i];if(v.owner===owner&&v.stealFade===undefined&&v.amp.stage!=='off')return true}return false}
function retire(owner){for(const v of voices)if(v.owner===owner)steal(v);owners.delete(owner.key)}
function cleanup(){for(const [key,o] of owners)if(!ownerHasVoices(o))owners.delete(key)}
function newVoices(owner){
 const count=target.voiceMode==='unison'?4:1;
 if(target.voiceMode==='mono'||target.voiceMode==='unison')for(const v of voices)steal(v);
 for(let i=0;i<count;i++){
 let active=0,victim;for(const v of voices)if(v.stealFade===undefined){active++;if(!victim||v.amp.stage==='release'&&victim.amp.stage!=='release')victim=v}
 if(active>=8)steal(victim);
 // Keep the legacy noise RNG sequence at note boundaries; phases/calibration belong to the physical slot.
 random();random();random();random();
 const slot=slots.find(s=>!s.current),elapsed=frames-slot.frame;
 const v={id:serial++,owner,note:owner.note,hz:440*2**((owner.note-69)/12),velocity:owner.velocity,velocitySetting:params.velocitySensitivity,velocityTarget:params.velocitySensitivity===0?1:owner.velocity**(1.5*params.velocitySensitivity/100),velocityGain:params.velocitySensitivity===0?1:owner.velocity**(1.5*params.velocitySensitivity/100),stackDetune:count===1?0:(i-1.5)*7,p1:(slot.p1+elapsed*slot.inc1)%1,p2:(slot.p2+elapsed*slot.inc2)%1,seed:slot.seed,driftRate:slot.driftRate,slot,physicalSlot:slot,calibration:slot.calibration,inc1:slot.inc1,inc2:slot.inc2,analog1:1,analog2:1,analogCut:1,analogGain:1,aa:mod.aa,ad:mod.ad,fa:mod.fa,fd:mod.fd,ic1:0,ic2:0,ic3:0,ic4:0,bend:Math.max(-1,Math.min(1,owner.controller.bend+performanceBend)),wheel:Math.max(owner.controller.wheel,performanceWheel),mods:new Float64Array(6),smoothCut:NaN,amp:{stage:'attack',value:0},fil:{stage:'attack',value:0}};
 slot.current=v;analogControl(v);voices.push(v);
 }
 if(voices.length>32)voices.splice(0,voices.length-32);
 // Preserve physically pressed MONO/UNISON keys for last-note priority.
 if(target.voiceMode==='poly'&&!rebuilding)cleanup();
}
function noteOn(note,velocity=1,source='default'){
 if(!Number.isInteger(note)||note<0||note>127||!Number.isFinite(velocity))return;
 if(velocity<=0){noteOff(note,source);return}
 let anyDown=false;for(const o of owners.values())if(o.down)anyDown=true;
 if(hold&&mode==='replace'&&!anyDown&&(group<0||clock-group>.65)){for(const o of owners.values()){o.latched=false;o.sustained=false;releaseOwner(o)}group=clock}
 const key=source+'|'+note,old=owners.get(key);if(old)retire(old);
 const owner={key,source,note,velocity:Math.max(0,Math.min(1,velocity)),controller:controller(source),down:true,latched:hold,sustained:false,order:serial};owners.set(key,owner);newVoices(owner);
}
function noteOff(note,source='default'){
 const o=owners.get(source+'|'+note);if(!o||!o.down)return;
 o.down=false;o.sustained=o.controller.sustain;releaseOwner(o);
 restorePriority();
}
function restorePriority(){if(target.voiceMode==='poly')return;let latest;for(const o of owners.values())if((o.down||o.latched||o.sustained)&&(!latest||o.order>latest.order))latest=o;if(latest&&!ownerHasVoices(latest))newVoices(latest)}
function sourceOff(source,disconnect=false,hard=false){
 for(const o of owners.values())if(o.source===source){o.down=o.latched=o.sustained=false;if(hard){for(const v of voices)if(v.owner===o)steal(v)}else releaseOwner(o)}
 const c=controllers.get(source);if(c){c.sustain=false;c.bend=0;c.wheel=0}if(disconnect)controllers.delete(source);restorePriority();
}
function panic(){performanceBend=performanceWheel=0;for(const v of voices)steal(v);owners.clear();controllers.clear();group=-1}
function setRoute(index,value){if(!Number.isInteger(index)||index<0||index>=4)return;const r=routes[index];if(!value||!sources.includes(value.source)||!destinations.includes(value.destination)||!Number.isFinite(value.amount))return;
 r.source=value.source;r.destination=value.destination;r.enabled=!!value.enabled;r.target=r.enabled?Math.max(-1,Math.min(1,value.amount)):0;
 for(let i=0;i<r.taps.length;i++)r.taps[i].target=0;
 const tap=r.taps[sources.indexOf(value.source)*destinations.length+destinations.indexOf(value.destination)];tap.target=r.target;if(tap.target!==0&&!tap.active){tap.active=true;activeTaps.push(tap)}
}

function message(m){switch(m.type){
 case 'params':{const previousMode=target.voiceMode;for(const [k,value] of Object.entries(m.value||{})){if(!(k in target))continue;if(typeof target[k]==='number'){if(typeof value==='number'&&Number.isFinite(value)){target[k]=['analogCharacter','velocitySensitivity','thickness'].includes(k)?Math.max(0,Math.min(100,value)):Math.max(-1000,Math.min(1000,value));if(!moving.includes(k))moving.push(k)}}else if(typeof value===typeof target[k]){target[k]=value;params[k]=value;if(k==='voiceMode')cacheDirty=true;if(k==='wave1')changeMix(mix1,value);if(k==='wave2')changeMix(mix2,value);if(k==='filter')changeMix(filterMix,value)}}if(previousMode!==target.voiceMode){for(const v of voices)steal(v);if(target.voiceMode==='poly'){rebuilding=true;for(const o of owners.values())if(o.down||o.latched||o.sustained)newVoices(o);rebuilding=false;cleanup()}else restorePriority()}break;}
 case 'on':noteOn(m.note,m.velocity,m.source);break;case 'off':noteOff(m.note,m.source);break;
 case 'panic':panic();break;
 case 'sourceOff':sourceOff(m.source||'default',!!m.disconnect,!!m.hard);break;
 case 'performance':{if(Number.isFinite(m.bend))performanceBend=Math.max(-1,Math.min(1,m.bend));if(Number.isFinite(m.wheel))performanceWheel=Math.max(0,Math.min(1,m.wheel));break}
 case 'controller':{const c=controller(m.source||'default');if(Number.isFinite(m.bend))c.bend=Math.max(-1,Math.min(1,m.bend));if(Number.isFinite(m.wheel))c.wheel=Math.max(0,Math.min(1,m.wheel));break}
 case 'sustain':{const source=m.source||'default',c=controller(source);c.sustain=!!m.value;if(!c.sustain)for(const o of owners.values())if(o.source===source){o.sustained=false;releaseOwner(o)}restorePriority();break}
 case 'hold':hold=!!m.value;mode=m.mode==='replace'?'replace':'add';group=-1;if(!hold)for(const o of owners.values()){o.latched=false;releaseOwner(o)}restorePriority();break;
 case 'route':setRoute(m.index,m.value);break;
}}
control();
function pruneOwner(o,key){if(!o.down&&!o.latched&&!o.sustained&&!ownerHasVoices(o))owners.delete(key)}
function render(out){
 for(let i=0;i<out.length;i++){
 if(!(tick++&15))control();
 advanceMix(mix1);advanceMix(mix2);advanceMix(filterMix);
 mod.lfo=lfoValue(lfoStates[0],params.lfo1Wave,mod.rate1)*params.lfo1Depth/100;mod.lfo2=lfoValue(lfoStates[1],params.lfo2Wave,mod.rate2)*params.lfo2Depth/100;
 let sum=0,energy=0;
 for(let j=voices.length-1;j>=0;j--){const v=voices[j];sum+=sample(v,sr,params,mod);energy+=v.amp.value*v.amp.value;if(v.amp.stage==='off'||v.stealFade<=0){park(v,frames+1);for(let k=j;k<voices.length-1;k++)voices[k]=voices[k+1];voices.length--}}
 const gain=1/Math.sqrt(Math.max(1,energy));smoothMix+=(gain-smoothMix)*Math.min(1,dt*35);
 out[i]=Number.isFinite(sum)?Math.tanh(sum*smoothMix*.8)*params.master/100:0;clock+=dt;frames++;
 }
 // Remove completed owners outside the sample loop; retains last-note priority keys.
 owners.forEach(pruneOwner);
}
function snapshot(){const activeNotes=new Set(),held=new Set(),pressed=new Set();for(const v of voices)if(v.stealFade===undefined&&v.amp.stage!=='release'&&v.amp.stage!=='off')activeNotes.add(v.note);for(const o of owners.values()){if(o.latched&&ownerHasVoices(o))held.add(o.note);if(o.down)pressed.add(o.note)}return {ageProcessing:{drive:mod.drive,tone:mod.ageTone,output:mod.ageOutput},performance:{bend:performanceBend,wheel:performanceWheel},velocitySensitivity:params.velocitySensitivity,thickness:params.thickness,wheelVibratoGate:mod.wheelGate,analogCharacter:params.analogCharacter,analogCharacterTarget:target.analogCharacter,physicalSlots:slots.map(s=>({index:s.index,calibration:{...s.calibration},phase1:s.current?s.current.p1:(s.p1+(frames-s.frame)*s.inc1)%1,phase2:s.current?s.current.p2:(s.p2+(frames-s.frame)*s.inc2)%1,inc1:s.current?s.current.inc1:s.inc1,inc2:s.current?s.current.inc2:s.inc2,drift1:s.drift1.value,drift2:s.drift2.value,active:!!s.current})),voices:voices.map(v=>({velocityGain:v.velocityGain,slot:v.physicalSlot.index,phase1:v.p1,phase2:v.p2,analog1:v.analog1,analog2:v.analog2,analogCut:v.analogCut,analogGain:v.analogGain,attackSeconds:v.aa,decaySeconds:v.ad,note:v.note,source:v.owner.source,velocity:v.velocity,stage:v.amp.stage,value:v.amp.value,filterEnvelope:v.fil.value,bend:v.bend,wheel:v.wheel,stealing:v.stealFade!==undefined})),activeNotes:[...activeNotes],held:[...held],pressed:[...pressed],owners:owners.size,clock,lfo1:lfoStates[0].value,lfo2:lfoStates[1].value,lfoPhases:lfoStates.map(s=>s.phase),routes:routes.map(r=>({source:r.source,destination:r.destination,enabled:r.enabled,target:r.target,amount:r.taps[sources.indexOf(r.source)*destinations.length+destinations.indexOf(r.destination)].amount}))}}
return {render,message,snapshot};
}
