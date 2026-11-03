// Assemble modular sources into one offline-capable, standalone HTML instrument.
const fs=require('fs'),assert=require('assert'),crypto=require('crypto');
const read=file=>fs.readFileSync(file,'utf8'),script=(id,file)=>`<script id="${id}">\n${read(file)}\n</script>`;
const source='GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html',target='dist/GRIMISS_mAMB_v0_7.html';
const {rotary,fader}=require('./hardware-components.cjs');
const targets=require('./midi-targets.cjs').generateMidiTargets();
const modules=[['mamb-engine','synth'],['mamb-effects','effects'],['mamb-instrument','instrument'],['mamb-keylab25','keylab25'],['mamb-midi-registry','midi-registry'],['mamb-controller-map','controller-map'],['mamb-preferences','preferences'],['mamb-adapter','adapter'],['mamb-factory-patches','factory-patches'],['mamb-patches','patches'],['mamb-interface','interface'],['mamb-layout','layout'],['mamb-workflow','workflow'],['mamb-physical-controls','physical-controls'],['mamb-hardware-header','hardware-header']];
let html=read('src/interface.html').replace(/(<div class="dial">)<svg[\s\S]*?<\/svg>/g,(_,start)=>start+rotary()).replace(/(<div class="control fader[^"]*">)/g,'$1'+fader()).replace('</style>','\n'+read('src/hardware.css')+'\n</style>')+'\n<script id="mamb-midi-targets">const MAMB_MIDI_TARGETS='+JSON.stringify(targets)+';</script>\n'+modules.map(([id,name])=>script(id,'src/'+name+'.js')).join('\n')+'\n</body></html>\n';
for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new Function(match[1]);
fs.mkdirSync('dist',{recursive:true});fs.writeFileSync(source,html);fs.writeFileSync(target,html);assert(fs.readFileSync(target).equals(fs.readFileSync(source)));const sha256=crypto.createHash('sha256').update(html).digest('hex');fs.writeFileSync('dist/manifest.json',JSON.stringify({version:'0.7.0',source,build:target,sha256,standalone:true},null,2)+'\n');console.log(target+' — '+Buffer.byteLength(html)+' bytes — SHA256 '+sha256);
