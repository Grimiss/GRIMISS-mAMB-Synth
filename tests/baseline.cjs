// Reproducible baseline audit against the original Git commit, without modifying it.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
const html=fs.readFileSync('tests/fixtures/v0.3.3.html','utf8');
const nodes={};for(const m of html.matchAll(/<(input|select)[^>]*id="([^"]+)"[^>]*>/g)){const tag=m[0];nodes[m[2]]={value:tag.match(/value="([^"]+)"/)?.[1]||'0',style:{},setAttribute(){}}}
Object.assign(nodes,{status:{},start:{},hold:{style:{},setAttribute(){}}});
const script=html.split('<script>')[1].split('</script>')[0];const prefix=script.slice(0,script.indexOf("$('start').onclick=start"));
let randomSeed=12345;const baselineMath=Object.create(Math);baselineMath.random=()=>{randomSeed=(Math.imul(randomSeed,1664525)+1013904223)>>>0;return randomSeed/4294967296};
const c=vm.createContext({document:{getElementById:id=>nodes[id],querySelectorAll:()=>[]},performance:{now:()=>0},Math:baselineMath,Number,Map,Set,console});vm.runInContext(prefix,c);
const setup="ac={};Object.assign(parameters=()=>p);";
const p={cross:0,lfo:0,vib:0,drift:0,pw:50,pwm:0,level1:85,level2:0,ring:0,noise:0,drive:0,cutoff:78,res:5,envAmt:0,motion:0,master:65,aa:0,ad:20,as:100,ar:20,fa:0,fd:20,fs:50,fr:20,detune:0,sync:false,wave1:'saw',wave2:'saw',oct2:0,filter:'lp'};c.p=p;c.output=new Float32Array(48000);vm.runInContext("ac={};parameters=()=>p;noteOn(60);render({outputBuffer:{sampleRate:48000,getChannelData:()=>output}})",c);
const rms=Math.sqrt(c.output.reduce((s,x)=>s+x*x,0)/c.output.length);
assert(c.output.every(Number.isFinite));assert(rms>.001);assert(c.output.every(x=>Math.abs(x)<1));
const report={commit:'433c2ab',finite:c.output.every(Number.isFinite),peak:Math.max(...c.output.map(Math.abs)),rms,filterAudit:'Original v3 subtracts damping k*ic1, in addition to damping already present in TPT coefficients. Corrected using the canonical linear TPT SVF equations.',presetAudit:'Original maps are partial overrides: Deep Drone -> Warm Ambient leaves oct2=-1. Current build restores complete initial defaults before each preset.',midiAudit:'Original handler ignores velocity, sustain and pitch bend and binds only inputs present at initial access.'};fs.writeFileSync('tests/baseline-results.json',JSON.stringify(report,null,2));console.log(report);
