// Versioned musical documents. No DOM, storage, audio or host-track dependencies.
const MICROSEQ_PATCH_VERSION=6, MICROSEQ_SEQUENCE_VERSION=1;
const MICROSEQ_MUSICAL_KEYS=['tempo','arpOn','arpPattern','arpDivision','arpGate','arpOctaves'];
function microseqObject(x){return !!x&&typeof x==='object'&&!Array.isArray(x);}
function microseqClone(x){return JSON.parse(JSON.stringify(x));}
function microseqValidId(x){return typeof x==='string'&&/^[A-Za-z0-9][A-Za-z0-9:_-]{0,127}$/.test(x)&&!['constructor','prototype','__proto__'].includes(x);}
function microseqName(x){if(typeof x!=='string'||!x.trim()||x.trim().length>80)throw Error('Enter a name of 1–80 characters');return x.trim();}
function microseqValidateSeq(x){
 if(!microseqObject(x))throw Error('Missing SEQ configuration');
 const ranges={pitchLength:[1,16],bPitchLength:[1,8],pitchRate:[.125,4],bPitchRate:[.125,4],root:[12,96],bRoot:[12,96],keyboardRoot:[0,127],gate:[5,95],bGate:[5,95],slide:[0,500],bSlide:[0,500],velocity:[.05,1],bVelocity:[.05,1],ratio:[1,16],seed:[1,2147483647],songCount:[1,32]};
 const bounded=(v,lo,hi,k)=>{if(typeof v!=='number'||!Number.isFinite(v)||v<lo||v>hi)throw Error('Invalid SEQ '+k);};
 for(const[k,[lo,hi]]of Object.entries(ranges))if(k in x){bounded(x[k],lo,hi,k);if(['pitchLength','bPitchLength','root','bRoot','keyboardRoot','seed','ratio','songCount'].includes(k)&&!Number.isInteger(x[k]))throw Error('Invalid integer '+k);}
 for(const k of ['pitch','probability','stepGates'])if(k in x){if(!Array.isArray(x[k])||x[k].length!==16)throw Error('SEQ '+k+' requires 16 steps');for(const v of x[k])bounded(v,...(k==='pitch'?[-12,12]:k==='stepGates'?[.05,1]:[0,1]),k);}
 for(const k of ['rests','accents'])if(k in x&&(!Array.isArray(x[k])||x[k].length!==16||x[k].some(v=>typeof v!=='boolean')))throw Error('Invalid SEQ '+k);
 for(const[k,values]of Object.entries({layout:['sixteen','dual8'],pitchDirection:['forward','reverse','pendulum','random'],bPitchDirection:['forward','reverse','pendulum','random'],rootSource:['fixed','keyboard','program'],mode:['transpose','gate','poly','echo','drift','arpdrift'],scale:Object.keys(SEQ16_SCALES)}))if(k in x&&!values.includes(x[k]))throw Error('Invalid SEQ '+k);
 for(const k of ['pitchOn','bPitchOn','combined','alternate','programLoop','songEnabled','songEdited'])if(k in x&&typeof x[k]!=='boolean')throw Error('Invalid SEQ '+k);
 if('version'in x&&(!Number.isInteger(x.version)||x.version>2||x.version<1))throw Error('Unsupported SEQ version');
 if('program'in x){if(!Array.isArray(x.program)||x.program.length>8)throw Error('Invalid root program');for(const p of x.program){if(!microseqObject(p))throw Error('Invalid root slot');if(p.note!==null&&p.note!==undefined){bounded(p.note,0,127,'program note');if(!Number.isInteger(p.note))throw Error('Program note must be a semitone');}if('duration'in p)bounded(p.duration,1,64,'duration');if(p.scale&&!Object.hasOwn(SEQ16_SCALES,p.scale))throw Error('Invalid program scale');if(p.durationUnit&&!['steps','rounds'].includes(p.durationUnit))throw Error('Invalid duration unit');}}
 if('songPatterns'in x){if(!Array.isArray(x.songPatterns)||x.songPatterns.length>32)throw Error('Invalid Song Program');for(const p of x.songPatterns){if(!microseqObject(p))throw Error('Invalid song pattern');for(const k of ['root','bRoot','pitchLength','bPitchLength','pitchRate','bPitchRate'])if(k in p)bounded(p[k],...ranges[k],k);if('repeats'in p)bounded(p.repeats,1,64,'repeats');for(const k of ['pitchDirection','bPitchDirection'])if(k in p&&!['forward','reverse','pendulum','random'].includes(p[k]))throw Error('Invalid song direction');if(p.scale&&!Object.hasOwn(SEQ16_SCALES,p.scale))throw Error('Invalid song scale');}}
 if(Array.isArray(x.pitch)&&x.pitch.some(v=>!Number.isInteger(v)))throw Error('Pitch steps must be semitones');
 if(x.songRandom&&(!microseqObject(x.songRandom)||Object.values(x.songRandom).some(v=>typeof v!=='boolean')))throw Error('Invalid randomisation switches');
 return mambNormalizeSeq(x);
}
function microseqValidateMusical(x){
 if(!microseqObject(x))throw Error('Missing musical settings');const result={};
 for(const k of MICROSEQ_MUSICAL_KEYS){const v=x[k];if(k==='arpOn'){if(typeof v!=='boolean')throw Error('Invalid arp enable');}else if(k==='arpPattern'){if(!['up','down','updown','played','random'].includes(v))throw Error('Invalid arp pattern');}else{const n=Number(v),r={tempo:[40,240],arpGate:[5,95],arpOctaves:[1,3],arpDivision:[.25,1]}[k];if(!Number.isFinite(n)||n<r[0]||n>r[1])throw Error('Invalid '+k);if(k==='arpDivision'&&![.25,.5,1,2/3,.75].includes(n))throw Error('Invalid arp rate');result[k]=n;continue;}result[k]=v;}
 return result;
}
function microseqSequenceDocument(x){
 if(!microseqObject(x)||x.format!=='grimiss-microseq-sequence'||x.version!==1)throw Error('Not a supported Microseq SEQ file');
 if(!Array.isArray(x.seq16?.pitch))throw Error('SEQ file has no pitch steps');if(x.id!==undefined&&x.id!==null&&!microseqValidId(x.id))throw Error('Invalid sequence identifier');
 return {format:x.format,version:1,id:typeof x.id==='string'?x.id:null,name:microseqName(x.name),seq16:microseqValidateSeq(x.seq16),musical:microseqValidateMusical(x.musical)};
}
function microseqValidatePatch(x,schema,defaults){
 if(!microseqObject(x))throw Error('Patch must be an object');if(x.format&&x.format!=='grimiss-mamb')throw Error('This is not a Microseq synth patch');
 if('version'in x&&(!Number.isInteger(x.version)||x.version<1||x.version>MICROSEQ_PATCH_VERSION))throw Error('Unsupported patch version');
 if(x.id!==undefined&&x.id!==null&&!microseqValidId(x.id))throw Error('Invalid patch identifier');
 const src=x.parameters||x.params||x;if(!microseqObject(src))throw Error('Missing sound parameters');
 const parameters={...defaults};let count=0;for(const[k,s]of Object.entries(schema))if(Object.hasOwn(src,k)){let v=src[k];if(v===null||v===undefined)throw Error('Invalid '+k);count++;if(s.type==='boolean'){if(![true,false,'true','false',0,1].includes(v))throw Error('Invalid '+k);v=v===true||v==='true'||v===1;}else if(s.type==='number'){v=Number(v);if(v===null||!Number.isFinite(v)||v<s.min||v>s.max)throw Error('Invalid '+k);}else{if(k==='sync'&&typeof v==='boolean')v=v?'on':'off';v=String(v);if(!s.values.includes(v)){const equivalent=s.values.find(a=>Number.isFinite(Number(a))&&Number(a)===Number(v));if(equivalent===undefined)throw Error('Invalid '+k);v=equivalent;}}parameters[k]=v;}
 if(!count)throw Error('Patch contains no recognised sound parameters');
 const routes=x.routes||src.routes||[];if(!Array.isArray(routes)||routes.length>4)throw Error('Invalid modulation routes');
 const result={format:'grimiss-mamb',version:6,id:typeof x.id==='string'?x.id:null,name:typeof x.name==='string'?x.name.slice(0,80):'Untitled',category:typeof x.category==='string'?x.category:'User',parameters,gestures:typeof microseqGestureValidate==='function'?microseqGestureValidate(x.gestures):undefined,midi:typeof microseqMidiValidate==='function'?microseqMidiValidate(x.midi):undefined,seq16:microseqValidateSeq(Object.hasOwn(x,'seq16')?x.seq16:mambSeqDefaults()),routes:microseqClone(routes),xy:x.xy?microseqClone(x.xy):null};
 for(const r of result.routes)if(!microseqObject(r)||typeof r.source!=='string'||typeof r.destination!=='string'||!Number.isFinite(r.amount)||r.amount< -1||r.amount>1||typeof r.enabled!=='boolean')throw Error('Invalid modulation route');
 if(result.xy&&!microseqObject(result.xy))throw Error('Invalid XY assignments');return result;
}
function microseqFingerprint(p){return JSON.stringify({parameters:p.parameters,gestures:p.gestures,midi:p.midi,seq16:p.seq16,xy:p.xy,routes:p.routes});}
