// One timbre, one polyphonic voice engine, one shared stereo effects chain.
const MAMB_SYNTH_KEYS=['thickness','velocitySensitivity','analogCharacter','cross','lfo','vib','drift','pw','pwm','level1','level2','ring','noise','drive','cutoff','res','envAmt','motion','master','aa','ad','as','ar','fa','fd','fs','fr','detune','semi2','keyTrack','lfo1Depth','lfo2Rate','lfo2Depth','sync','wave1','wave2','oct2','filter','bend','lfo1Wave','lfo2Wave','voiceMode'];
function createMambInstrument(initial,sr=48000,seed=12345){
 function synthValues(value){const result={};for(const key of MAMB_SYNTH_KEYS)if(key in value)result[key]=value[key];result.master=100;return result}
 // A single shared micro-detuned ensemble, not a duplicate synth/voice engine.
 let size=1;while(size<sr*.032)size*=2;const ensemble=new Float32Array(size),mask=size-1,windowSamples=sr*.022,minDelay=sr*.0015;let write=0,phaseL=0,phaseR=.37,wasActive=false;
 let thickness=0,thicknessTarget=Number.isFinite(initial.thickness)?Math.max(0,Math.min(1,initial.thickness/100)):0;const thickAlpha=1-Math.exp(-1/(sr*.02));
 let rateL=0,rateR=0,targetRateL=0,targetRateR=0;
 function ensembleMode(mode){const cents=mode==='unison'?4:9;targetRateL=(1-2**(-cents/1200))/windowSamples;targetRateR=(2**(cents/1200)-1)/windowSamples;if(!rateL){rateL=targetRateL;rateR=targetRateR}}ensembleMode(initial.voiceMode);
 function tap(delay){const at=write-delay,base=Math.floor(at),fraction=at-base;return ensemble[base&mask]*(1-fraction)+ensemble[(base+1)&mask]*fraction}
 function spread(left,right){if(thicknessTarget===0&&thickness===0){if(wasActive){ensemble.fill(0);wasActive=false}right.set(left);return}wasActive=true;for(let i=0;i<left.length;i++){
 thickness+=(thicknessTarget-thickness)*thickAlpha;if(Math.abs(thicknessTarget-thickness)<1e-8)thickness=thicknessTarget;rateL+=(targetRateL-rateL)*thickAlpha;rateR+=(targetRateR-rateR)*thickAlpha;
 const x=left[i];ensemble[write]=x;const secondL=phaseL<.5?phaseL+.5:phaseL-.5,secondR=phaseR<.5?phaseR+.5:phaseR-.5,weightL=1-Math.abs(2*phaseL-1),weightR=1-Math.abs(2*phaseR-1);
 const down=tap(minDelay+phaseL*windowSamples)*weightL+tap(minDelay+secondL*windowSamples)*(1-weightL),up=tap(minDelay+(1-phaseR)*windowSamples)*weightR+tap(minDelay+(1-secondR)*windowSamples)*(1-weightR);
 const wet=.9*(2*thickness-thickness*thickness),gain=1/Math.sqrt(1+wet*wet);left[i]=(x+wet*down)*gain;right[i]=(x+wet*up)*gain;
 write=(write+1)&mask;phaseL+=rateL;if(phaseL>=1)phaseL-=1;phaseR+=rateR;if(phaseR>=1)phaseR-=1;
 }}
 let inputGain=0,inputTarget=0;const inputAlpha=1-Math.exp(-1/(sr*.02));
 const synth=createMambEngine(synthValues(initial),sr,seed),effects=createMambEffects(initial,sr);
 function message(event){if(event.type==='audioInputGain'){if(Number.isFinite(event.value))inputTarget=Math.max(0,Math.min(1,event.value));return}if(event.type==='params'){if(typeof event.value?.voiceMode==='string')ensembleMode(event.value.voiceMode);if(Number.isFinite(event.value?.thickness))thicknessTarget=Math.max(0,Math.min(1,event.value.thickness/100));synth.message({type:'params',value:synthValues(event.value||{})});effects.setParameters(event.value||{})}else {synth.message(event);if(event.type==='panic'){inputTarget=0;ensemble.fill(0);effects.panic()}}}
 function render(left,right,inputL,inputR){synth.render(left);spread(left,right);if(inputL&&(inputTarget>0||inputGain>1e-8)){for(let i=0;i<left.length;i++){inputGain+=(inputTarget-inputGain)*inputAlpha;right[i]=right[i]+(inputR||inputL)[i]*inputGain;left[i]=left[i]+inputL[i]*inputGain}effects.process(left,right,left,right)}else effects.process(left,right,left,right)}
 function snapshot(){const state=synth.snapshot();state.effects=effects.snapshot();state.thicknessStereo={amount:thickness,target:thicknessTarget,algorithm:'shared detuned ensemble',detuneCents:targetRateL===(1-2**(-4/1200))/windowSamples?4:9,allocatedBytes:ensemble.byteLength};return state}
 return {render,message,snapshot};
}
