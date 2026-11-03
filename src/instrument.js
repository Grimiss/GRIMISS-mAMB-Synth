// One timbre, one polyphonic voice engine, one shared stereo effects chain.
const MAMB_SYNTH_KEYS=['cross','lfo','vib','drift','pw','pwm','level1','level2','ring','noise','drive','cutoff','res','envAmt','motion','master','aa','ad','as','ar','fa','fd','fs','fr','detune','semi2','keyTrack','lfo1Depth','lfo2Rate','lfo2Depth','sync','wave1','wave2','oct2','filter','bend','lfo1Wave','lfo2Wave','voiceMode'];
function createMambInstrument(initial,sr=48000,seed=12345){
 function synthValues(value){const result={};for(const key of MAMB_SYNTH_KEYS)if(key in value)result[key]=value[key];result.master=100;return result}
 let inputGain=0,inputTarget=0;const inputAlpha=1-Math.exp(-1/(sr*.02));
 const synth=createMambEngine(synthValues(initial),sr,seed),effects=createMambEffects(initial,sr);
 function message(event){if(event.type==='audioInputGain'){if(Number.isFinite(event.value))inputTarget=Math.max(0,Math.min(1,event.value));return}if(event.type==='params'){synth.message({type:'params',value:synthValues(event.value||{})});effects.setParameters(event.value||{})}else {synth.message(event);if(event.type==='panic'){inputTarget=0;effects.panic()}}}
 function render(left,right,inputL,inputR){synth.render(left);if(inputL&&(inputTarget>0||inputGain>1e-8)){for(let i=0;i<left.length;i++){inputGain+=(inputTarget-inputGain)*inputAlpha;const dry=left[i];right[i]=dry+(inputR||inputL)[i]*inputGain;left[i]=dry+inputL[i]*inputGain}effects.process(left,right,left,right)}else effects.process(left,left,left,right)}
 function snapshot(){const state=synth.snapshot();state.effects=effects.snapshot();return state}
 return {render,message,snapshot};
}
