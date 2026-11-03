const fs=require('fs');
const file='GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html';
function load(path=file){const html=fs.readFileSync(path,'utf8'),source=html.match(/<script id="mamb-engine">([\s\S]*?)<\/script>/)[1];const defaults={};for(const m of html.matchAll(/<input id="(\w+)"[^>]*value="([^"]+)"/g))defaults[m[1]]=+m[2];Object.assign(defaults,{wave1:'saw',wave2:'saw',filter:'lp',sync:false,oct2:0,bend:0,voiceMode:'poly'});return {source,defaults,create:new Function(source+';return createMambEngine')()}}
const loaded=load();
function engine(p={},sr=48000){return loaded.create({...loaded.defaults,...p},sr)}
function render(e,seconds=.1,sr=48000){const out=new Float32Array(Math.round(seconds*sr));e.render(out);return out}
const rms=x=>Math.sqrt(x.reduce((s,v)=>s+v*v,0)/x.length);
const on=(e,note=60,source='default',velocity=1)=>e.message({type:'on',note,source,velocity});
const off=(e,note=60,source='default')=>e.message({type:'off',note,source});
module.exports={load,engine,render,rms,on,off};
