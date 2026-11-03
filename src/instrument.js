// One timbre, one polyphonic voice engine, one shared stereo effects chain.
const MAMB_SYNTH_KEYS=['cross','lfo','vib','drift','pw','pwm','level1','level2','ring','noise','drive','cutoff','res','envAmt','motion','master','aa','ad','as','ar','fa','fd','fs','fr','detune','semi2','keyTrack','lfo1Depth','lfo2Rate','lfo2Depth','sync','wave1','wave2','oct2','filter','bend','lfo1Wave','lfo2Wave','voiceMode'];
function createMambInstrument(initial,sr=48000,seed=12345){
 function synthValues(value){const result={};for(const key of MAMB_SYNTH_KEYS)if(key in value)result[key]=value[key];result.master=100;return result}
 const synth=createMambEngine(synthValues(initial),sr,seed),effects=createMambEffects(initial,sr);
 function message(event){if(event.type==='params'){synth.message({type:'params',value:synthValues(event.value||{})});effects.setParameters(event.value||{})}else {synth.message(event);if(event.type==='panic')effects.panic()}}
 function render(left,right){synth.render(left);effects.process(left,left,left,right)}
 function snapshot(){const state=synth.snapshot();state.effects=effects.snapshot();return state}
 return {render,message,snapshot};
}
