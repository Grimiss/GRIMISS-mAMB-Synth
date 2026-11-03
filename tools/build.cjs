// Byte-identical standalone distribution; no runtime imports or build-time dependencies.
const fs=require('fs'),assert=require('assert'),crypto=require('crypto');
const source='GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html',target='dist/GRIMISS_mAMB_v0_5.html';
const bytes=fs.readFileSync(source);fs.mkdirSync('dist',{recursive:true});fs.writeFileSync(target,bytes);assert(fs.readFileSync(target).equals(bytes));
const sha256=crypto.createHash('sha256').update(bytes).digest('hex');fs.writeFileSync('dist/manifest.json',JSON.stringify({version:'0.5.0',source,build:target,sha256,standalone:true},null,2)+'\n');console.log(target+' — '+bytes.length+' bytes — SHA256 '+sha256);
