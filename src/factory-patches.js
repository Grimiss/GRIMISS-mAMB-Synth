// One hundred original factory patches in ten continuously numbered banks. No manufacturer patch data.
function installMambFactoryPatches(presets){
 const banks=[
 ['Ambient Pads',['Warm Ambient','Chorus Warmth','Velvet Dawn','Amber Clouds','Teal Horizon','Soft Current','Hushed Air','Afterlight','Cedar Bloom','Distant Ember']],
 ['Evolving Textures',['Slow Drift','Modulated Atmosphere','Moss Circuit','Northern Mist','Tidal Memory','Glassweather','Chromatic Fog','Sleeping Satellites','Liminal Bloom','Silver Current']],
 ['Strings',['Ensemble Strings','Tape Strings','Soft Ensemble','Amber Orchestra','Chamber Halo','Faded Silk','Violet Cellos','Airborne Strings','Analog Choir','Quiet Solstice']],
 ['Drones',['Deep Drone','Basalt','Low Orbit','Iron Tide','Understory','Night Engine','Murmur Field','Gravitation','Cavern Wire','Subterrane']],
 ['Leads',['Soft Beacon','Thin Air','Rounded Signal','Vintage Port','Evening Reed','Liquid Lead','Resonant Thread','Mono Lantern','Blue Spark','Silk Pulse']],
 ['Bass',['Round Foundation','Pulse Anchor','Deep Rubber','Soft Acid','Octave Weight','Dark Step','Triangle Root','Warm Sub','Midnight Pluck','Sine Floor']],
 ['Plucks',['Glass Droplet','Copper Pin','Mallet Arc','Dust Bell','Spring Pizz','Short Circuit','Muted Tine','Amber Kalimba','Plucked Wire','Pixel Harp']],
 ['Digital',['63 Spring Glass','Vector Snow','Vocal Prism','Bell Archive','Crystalline Loop','Digital Dusk','Chime Engine','Spectrum Veil','Hollow Glass','Binary Tide']],
 ['Vintage / FX',['Init VA','Vintage Pulse','Stereo Horizons','Classic Saw','PWM Memory','Ring Garden','Cross Current','Synced Brass','Phaser Loom','Delay Apparition']]
 ];
 // Each row is an intentional sound design, not a small offset from its neighbour.
 // waveform1,waveform2,cutoff,amp attack/decay/sustain/release,extra parameters.
 // OSC2 deliberately exposes only saw/pulse/triangle. Keep factory data recallable.
 const S=(wave1,wave2,cutoff,aa,ad,as,ar,extra={})=>({wave1,wave2,cutoff,aa,ad,as,ar,...extra});
 const voices=[
 [ // Ambient: warm ensemble, PWM chorus, muted velvet, bright cloud, airy HP, etc.
 S('saw','pulse',48,46,48,88,70,{thickness:42,analogCharacter:30,detune:8}),
 S('pulse','pulse',65,22,48,82,58,{pw:28,pwm:32,detune:12,thickness:20}),
 S('triangle','triangle',32,70,70,72,85,{level2:65,envAmt:8,analogCharacter:48}),
 S('dwgs1','saw',82,58,56,80,90,{level2:22,thickness:65,detune:17}),
 S('saw','triangle',40,36,65,90,78,{filter:'hp',noise:12,envAmt:0}),
 S('pulse','triangle',56,12,70,55,70,{pw:18,pwm:12,envAmt:40,fd:55,fs:20}),
 S('sine','pulse',72,80,75,70,95,{noise:20,level2:20,filter:'bp',res:32}),
 S('triangle','saw',45,0,70,10,88,{level2:24,envAmt:35,fd:55,fs:0}),
 S('saw','pulse',58,32,48,88,62,{oct2:-1,level2:45,analogCharacter:58,thickness:38}),
 S('pulse','triangle',30,65,75,100,95,{oct2:-1,pw:14,res:35,drive:40,envAmt:3})
 ],
 [ // Evolving textures: four-pole drift, grainy digital, slow PWM, S&H noise.
 S('saw','triangle',42,68,70,95,90,{drift:48,thickness:40,motion:38,lfo:3}),
 S('pulse','pulse',55,55,70,85,92,{pw:24,pwm:38,level2:32,filter:'bp',res:32}),
 S('dwgs2','pulse',36,72,60,100,85,{ring:28,analogCharacter:50}),
 S('triangle','triangle',60,85,80,80,100,{filter:'hp',noise:14,envAmt:0}),
 S('pulse','saw',48,50,90,90,85,{pw:18,pwm:45,lfo:2,motion:42}),
 S('dwgs1','triangle',84,5,80,30,95,{level2:38,detune:21}),
 S('saw','pulse',35,80,75,100,95,{filter:'bp',res:52,semi2:7,thickness:60}),
 S('sine','triangle',68,30,82,65,90,{oct2:1,level2:28,lfo2Wave:'sh',lfo2Rate:16}),
 S('triangle','saw',32,88,80,95,100,{envAmt:52,fa:90,fd:75,fs:25}),
 S('dwgs3','pulse',78,20,58,75,78,{cross:24,pw:22,level2:28})
 ],
 [ // Strings: bowed ensemble, tape, soft quartet, brass-like, choir-like.
 S('saw','saw',68,25,50,94,60,{detune:12,thickness:62}),
 S('saw','pulse',42,36,65,84,68,{analogCharacter:72,drift:28,detune:5}),
 S('triangle','saw',50,48,55,88,72,{level2:35,thickness:35}),
 S('saw','saw',78,16,42,85,50,{oct2:-1,level2:35,envAmt:38,fd:35,fs:35}),
 S('pulse','triangle',62,60,60,92,88,{pw:38,pwm:12,filter:'hp',thickness:28}),
 S('saw','triangle',30,50,60,80,78,{level2:55,analogCharacter:55,envAmt:8}),
 S('saw','triangle',40,35,70,92,62,{oct2:-1,level2:62,drive:32}),
 S('saw','saw',86,28,60,85,85,{filter:'hp',detune:18,thickness:72}),
 S('pulse','pulse',50,65,65,96,90,{filter:'bp',res:36,pw:42,level2:38}),
 S('triangle','pulse',58,78,80,90,100,{oct2:1,level2:25,pwm:18,detune:4})
 ],
 [ // Drones span sub fundamentals, metallic intervals, air and resonant motion.
 S('triangle','saw',25,65,80,100,90,{oct2:-1,level2:55,drive:30}),
 S('sine','triangle',18,85,80,100,100,{oct2:-1,level2:80,envAmt:0,analogCharacter:65}),
 S('pulse','triangle',42,40,80,100,85,{oct2:-1,pw:12,pwm:22,thickness:48}),
 S('saw','pulse',55,55,80,100,90,{semi2:7,ring:52,drive:48,filter:'lp24'}),
 S('triangle','pulse',38,80,80,100,100,{noise:25,filter:'bp',res:48,envAmt:0}),
 S('pulse','saw',30,15,65,100,75,{pw:20,analogCharacter:78,lfo1Wave:'square',motion:26,lfo:15}),
 S('dwgs2','triangle',54,88,75,100,98,{level2:58,filter:'bp',res:36}),
 S('sine','saw',26,65,80,100,95,{oct2:-1,level2:24,thickness:65}),
 S('dwgs3','pulse',72,35,80,100,100,{semi2:12,ring:24,filter:'hp',res:25}),
 S('triangle','pulse',20,95,80,100,100,{oct2:-1,drive:60,pw:10,envAmt:0})
 ],
 [ // Leads: round, thin, port-like soft onset, reed, liquid and hard sync.
 S('triangle','triangle',65,4,38,80,24,{level2:25}),
 S('pulse','saw',75,0,22,55,16,{pw:12,level2:15,filter:'hp'}),
 S('sine','triangle',52,8,40,90,35,{level2:38,drive:35}),
 S('saw','pulse',44,18,48,78,32,{analogCharacter:65,thickness:18}),
 S('pulse','triangle',58,5,32,72,22,{pw:22,filter:'bp',res:38}),
 S('saw','triangle',35,0,36,60,25,{res:58,envAmt:54,fd:30,fs:12}),
 S('pulse','saw',48,0,20,35,45,{res:68,pw:38,envAmt:48,fd:25,fs:0}),
 S('triangle','pulse',38,15,60,85,38,{oct2:-1,level2:32,analogCharacter:40}),
 S('saw','saw',86,0,24,65,20,{sync:'on',semi2:12,level2:40,drive:25}),
 S('pulse','pulse',60,10,48,88,48,{pw:38,pwm:28,thickness:45,detune:10})
 ],
 [ // Bass: keep low end defined; some deliberately dry, some spring/slap.
 S('triangle','triangle',30,0,38,78,12,{oct2:-1,level2:65,drive:18}),
 S('pulse','pulse',42,0,24,55,10,{pw:22,oct2:-1,envAmt:48,fd:24,fs:0}),
 S('saw','triangle',24,0,45,20,18,{res:48,envAmt:72,fd:42,fs:0,drive:35}),
 S('saw','pulse',32,0,30,12,12,{res:72,filter:'lp24',envAmt:70,fd:30,fs:0,drive:42}),
 S('triangle','saw',48,0,28,88,16,{oct2:-1,level2:70,drive:40}),
 S('pulse','saw',28,0,16,0,8,{pw:16,envAmt:62,fd:18,fs:0,drive:32}),
 S('triangle','triangle',58,0,48,65,25,{oct2:-1,level2:45,envAmt:0}),
 S('sine','triangle',20,3,60,100,35,{oct2:-1,level2:35,envAmt:0,analogCharacter:48}),
 S('saw','pulse',36,0,25,0,24,{oct2:-1,envAmt:58,fd:22,fs:0,res:28}),
 S('sine','triangle',72,0,28,95,12,{level2:0,envAmt:0,drive:0,analogCharacter:0})
 ],
 [ // Plucks vary material, pitch interval, damping and decay by design.
 S('dwgs1','triangle',88,0,28,0,38,{level2:24,envAmt:0}),
 S('pulse','triangle',68,0,18,0,20,{pw:14,ring:16,envAmt:28,fd:18,fs:0}),
 S('sine','triangle',62,0,40,0,42,{oct2:1,level2:30,envAmt:0}),
 S('dwgs3','triangle',78,0,52,0,65,{semi2:7,level2:28,ring:22}),
 S('pulse','triangle',55,0,16,0,25,{pw:28,envAmt:42,fd:18,fs:0}),
 S('saw','pulse',76,0,10,0,12,{sync:'on',semi2:19,envAmt:52,fd:10,fs:0}),
 S('triangle','triangle',38,0,34,0,32,{oct2:1,level2:24,envAmt:20,fd:28,fs:0}),
 S('pulse','triangle',52,0,32,0,42,{pw:18,analogCharacter:50,envAmt:32,fd:30,fs:0}),
 S('saw','triangle',82,0,42,0,55,{semi2:7,level2:38,ring:10}),
 S('dwgs2','pulse',86,0,20,0,30,{oct2:1,level2:18,pw:12})
 ],
 [ // Digital: glass, grain, vocal bandpass, bells, long spectral pads.
 S('dwgs1','triangle',78,0,42,20,50,{level2:22}),
 S('dwgs2','triangle',82,65,75,85,95,{noise:12,filter:'hp',level2:40}),
 S('dwgs2','pulse',48,30,55,80,65,{filter:'bp',res:56,pw:28,level2:32}),
 S('dwgs3','triangle',92,0,65,0,80,{semi2:7,ring:28,level2:42}),
 S('dwgs1','pulse',78,0,22,0,42,{oct2:1,level2:24,pw:12}),
 S('dwgs2','triangle',30,60,70,90,95,{analogCharacter:52,level2:50}),
 S('dwgs3','saw',90,0,45,0,58,{semi2:12,level2:36}),
 S('dwgs2','triangle',60,80,80,100,100,{filter:'hp',thickness:62,detune:21}),
 S('dwgs1','triangle',44,15,55,48,65,{filter:'bp',res:62,level2:48}),
 S('dwgs3','pulse',68,30,70,85,85,{pw:24,lfo1Wave:'square',lfo:18,motion:24})
 ],
 [ // Vintage / FX: Init stays dry, then PWM, echoes, sync, ring and phaser.
 S('saw','saw',78,0,20,100,20,{level1:85,level2:0,envAmt:0,drive:0}),
 S('pulse','pulse',62,2,30,72,27,{pw:38,pwm:24,detune:5,analogCharacter:48}),
 S('saw','triangle',65,18,55,70,65,{thickness:45,detune:14}),
 S('saw','saw',84,0,30,100,28,{level2:0,drive:20,analogCharacter:35}),
 S('pulse','pulse',48,25,55,85,68,{pw:20,pwm:45,lfo:8,detune:12}),
 S('triangle','pulse',75,8,55,65,60,{semi2:7,ring:72,level2:60}),
 S('saw','triangle',65,30,60,80,65,{cross:65,oct2:1,level2:35}),
 S('saw','saw',58,4,35,68,32,{sync:'on',semi2:19,envAmt:62,fd:30,fs:18}),
 S('saw','pulse',72,28,55,88,75,{pw:28,pwm:16,thickness:30}),
 S('dwgs3','pulse',70,0,24,0,65,{level2:30,semi2:7})
 ]
 ];
 // Shared effect recipes have deliberately different time, space and motion signatures.
 const fx=[
 {},
 {fxModOn:true,fxModType:'chorus',fxModRate:.28,fxModDepth:.64,fxModMix:.42,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:3.2,fxReverbMix:.22},
 {fxModOn:true,fxModType:'ensemble',fxModRate:.36,fxModDepth:.72,fxModMix:.46,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:5.5,fxReverbMix:.3},
 {fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:14,fxReverbTone:6200,fxReverbMod:.7,fxReverbMix:.48},
 {fxReverbOn:true,fxReverbType:'spring',fxReverbDwell:.7,fxReverbTone:4100,fxReverbDecay:2.8,fxReverbMix:.38},
 {fxDelayOn:true,fxDelayType:'cross',fxDelayTime:.375,fxDelayFeedback:.52,fxDelayMix:.36,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:4,fxReverbMix:.2},
 {fxModOn:true,fxModType:'phaser',fxModRate:.12,fxModDepth:.8,fxModFeedback:.48,fxModMix:.5,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:6.5,fxReverbMix:.28},
 {fxDelayOn:true,fxDelayType:'lr',fxDelayTime:.135,fxDelayFeedback:.22,fxDelayMix:.3,fxReverbOn:true,fxReverbType:'spring',fxReverbDwell:.4,fxReverbDecay:1.2,fxReverbMix:.2},
 {fxModOn:true,fxModType:'chorus',fxModRate:.08,fxModDepth:.78,fxModMix:.38,fxDelayOn:true,fxDelayType:'cross',fxDelayTime:.81,fxDelayFeedback:.62,fxDelayMix:.32,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:10,fxReverbMod:.55,fxReverbMix:.4},
 {fxDelayOn:true,fxDelayType:'stereo',fxDelayTime:.235,fxDelayFeedback:.42,fxDelayMix:.4,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:7.5,fxReverbTone:2400,fxReverbMix:.32}
 ];
 const spaces=[
 [2,1,6,3,8,5,3,9,4,8], [8,2,6,3,5,9,6,5,3,1],
 [2,1,2,4,3,6,4,8,6,3], [8,3,6,4,3,9,6,8,5,3],
 [5,7,4,1,4,5,9,7,5,2], [0,7,0,4,0,9,1,0,7,0],
 [5,7,3,8,4,9,4,7,6,5], [4,8,6,3,5,9,5,3,6,8],
 [0,1,8,0,2,4,6,7,6,8]
 ];
 const route=(source,destination,amount)=>({source,destination,amount,enabled:true});
 const catalog=[];let number=0;
 for(let bank=0;bank<banks.length;bank++){
  const [category,names]=banks[bank];
  names.forEach((name,i)=>{
   const p={voiceMode:bank===4||bank===5?'mono':'poly',wave1:'saw',wave2:'triangle',oct2:0,semi2:0,
    level1:70,level2:38,noise:0,pw:50,pwm:0,detune:4,ring:0,cross:0,sync:'off',
    filter:'lp',cutoff:60,res:12,drive:12,envAmt:18,keyTrack:20,fa:0,fd:45,fs:35,fr:55,
    aa:20,ad:45,as:85,ar:55,drift:8,vib:0,lfo:8,motion:0,lfo1Wave:'sine',lfo1Depth:100,
    lfo2Wave:'triangle',lfo2Rate:5,lfo2Depth:100,thickness:0,analogCharacter:15,velocitySensitivity:0,
    arpOn:false,arpPattern:'up',arpDivision:.5,arpGate:55,arpOctaves:1,master:62,pan:0,eqLow:0,eqHigh:0,eqLowFreq:200,eqHighFreq:5000,
    fxModOn:false,fxModType:'chorus',fxModRate:.25,fxModDepth:.35,fxModFeedback:.15,fxModMix:.25,
    fxDelayOn:false,fxDelayType:'stereo',fxDelayTime:.45,fxDelayFeedback:.35,fxDelayMix:.25,fxDelaySync:false,fxDelayDivision:.5,fxDelayWidth:1,tempo:100,
    fxReverbOn:false,fxReverbType:'hall',fxReverbDwell:.35,fxReverbTone:5000,fxReverbDecay:4,fxReverbMod:.35,fxReverbMix:.25,
    ...voices[bank][i],...fx[spaces[bank][i]],routes:[]};
   if(bank===1){p.routes=[route('lfo2','cutoff',[.2,.14,.3,.12,.25,.1,.32,.2,.15,.22][i]),route('lfo1',i%2?'pw':'osc2',i%2?.22:.04)];p.lfo2Rate=[1,7,3,2,5,14,4,20,1,9][i];p.lfo1Wave=i===7?'sh':'sine'}
   if(bank===3){p.envAmt=voices[bank][i].envAmt??6;p.routes=[route('lfo2','cutoff',[.08,.1,.11,.13,.14,.16,.17,.19,.2,.22][i])];p.lfo2Rate=2+i}
   if(bank===7&&[1,2,7,9].includes(i))p.routes=[route('lfo2','cutoff',i===2?.24:.16)];
   if(bank===8&&i===0)Object.assign(p,{analogCharacter:0,drift:0,detune:0,keyTrack:0,thickness:0});
   // All factory names, bank numbering and USER patch persistence stay stable.
   presets[name]=p;catalog.push({number:++number,name,category,patch:p});
  });
 }
 const arpBank=[
  ['Teal Steps','Soft Current',{tempo:108,arpPattern:'up',arpDivision:.5,arpOctaves:2,arpGate:52,aa:0,ad:25,as:15,ar:28,fxDelaySync:true,fxDelayDivision:.75}],
  ['Midnight Relay','Midnight Pluck',{tempo:118,arpPattern:'down',arpDivision:.25,arpOctaves:1,arpGate:32,fxDelayOn:true,fxDelayType:'cross',fxDelaySync:true,fxDelayDivision:.75,fxDelayMix:.34}],
  ['Glass Orbit','Glass Droplet',{tempo:88,arpPattern:'updown',arpDivision:.5,arpOctaves:3,arpGate:42,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:9,fxReverbMix:.35}],
  ['Spring Circuit','Spring Pizz',{tempo:124,arpPattern:'played',arpDivision:.25,arpOctaves:1,arpGate:25,fxReverbDwell:.8,fxReverbMix:.42}],
  ['Amber Ladder','Amber Kalimba',{tempo:96,arpPattern:'up',arpDivision:.5,arpOctaves:3,arpGate:65,fxDelayOn:true,fxDelaySync:true,fxDelayDivision:.5,fxDelayMix:.26}],
  ['Velvet Triplets','Velvet Dawn',{tempo:76,arpPattern:'updown',arpDivision:2/3,arpOctaves:2,arpGate:88,aa:10,ad:45,as:70,ar:48,fxModOn:true}],
  ['Photon Rain','Pixel Harp',{tempo:132,arpPattern:'random',arpDivision:.25,arpOctaves:3,arpGate:20,fxDelayOn:true,fxDelaySync:true,fxDelayDivision:.75,fxDelayMix:.38}],
  ['Clockwork Bass','Pulse Anchor',{tempo:112,arpPattern:'played',arpDivision:.25,arpOctaves:1,arpGate:48,fxReverbOn:false,fxDelayOn:true,fxDelayTime:.12,fxDelaySync:false,fxDelayFeedback:.18,fxDelayMix:.18}],
  ['Drift Mosaic','Vocal Prism',{tempo:64,arpPattern:'random',arpDivision:.75,arpOctaves:2,arpGate:75,aa:8,ar:55,fxReverbDecay:12,fxReverbMix:.42}],
  ['Endless Horizon','Stereo Horizons',{tempo:72,arpPattern:'updown',arpDivision:1,arpOctaves:2,arpGate:92,aa:18,as:75,ar:68,fxDelaySync:true,fxDelayDivision:.75,fxDelayMix:.4}]
 ];
 for(const[name,base,extra]of arpBank){const p={...presets[base],...extra,arpOn:true,routes:presets[base].routes.map(r=>({...r}))};presets[name]=p;catalog.push({number:++number,name,category:'Arpeggios',patch:p})}
 if(catalog.length!==100||new Set(catalog.map(p=>p.name)).size!==100)throw Error('Factory catalog must contain100 unique patches');return catalog;
}
