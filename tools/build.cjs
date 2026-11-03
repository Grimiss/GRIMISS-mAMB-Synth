// Assemble modular sources into one offline-capable, standalone HTML instrument.
const fs=require('fs'),assert=require('assert'),crypto=require('crypto');
const read=file=>fs.readFileSync(file,'utf8'),script=(id,file)=>`<script id="${id}">\n${read(file)}\n</script>`;
const source='GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html',target='dist/GRIMISS_mAMB_v0_6.html';
let html=read('src/interface.html')+'\n'+script('mamb-engine','src/synth.js')+'\n'+script('mamb-effects','src/effects.js')+'\n'+script('mamb-instrument','src/instrument.js')+'\n'+script('mamb-adapter','src/adapter.js')+'\n'+script('mamb-patches','src/patches.js')+'\n'+script('mamb-interface','src/interface.js')+'\n</body></html>\n';
for(const match of html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g))new Function(match[1]);
fs.mkdirSync('dist',{recursive:true});fs.writeFileSync(source,html);fs.writeFileSync(target,html);assert(fs.readFileSync(target).equals(fs.readFileSync(source)));const sha256=crypto.createHash('sha256').update(html).digest('hex');fs.writeFileSync('dist/manifest.json',JSON.stringify({version:'0.6.0',source,build:target,sha256,standalone:true},null,2)+'\n');console.log(target+' — '+Buffer.byteLength(html)+' bytes — SHA256 '+sha256);
