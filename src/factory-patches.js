// Ninety original factory patches in nine continuously numbered banks. No manufacturer patch data.
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
 const catalog=[];let number=0;
 for(let bank=0;bank<banks.length;bank++){const [category,names]=banks[bank];for(let i=0;i<names.length;i++){const name=names[i];if(!presets[name]){
 const p={wave1:['saw','pulse','triangle'][i%3],wave2:['pulse','saw','triangle'][(i+bank)%3],pw:32+i*4,pwm:i%3?4+i:0,level1:70+i%4*4,level2:32+i*3,detune:3+i,cutoff:48+i*3,res:8+i*3,drive:8+i*2,envAmt:25,aa:30,ad:40,as:85,ar:55,lfo:10+i*3,drift:10+i*2,vib:4,motion:10+i*2};
 if(bank===0)Object.assign(p,{aa:35+i*3,ar:58+i*3,fxModOn:i%2===0,fxModType:i%3?'chorus':'ensemble',fxModMix:.18+i*.012,fxReverbOn:i>=4,fxReverbType:'hall',fxReverbDecay:4+i*.5,fxReverbMix:.18+i*.01});
 if(bank===1)Object.assign(p,{wave1:i%3===0?'dwgs2':i%2?'pulse':'saw',aa:48+i*3,ar:70+i*2,cutoff:42+i*2,motion:22+i*4,lfo:2+i,fxReverbOn:true,fxReverbType:'hall',fxReverbDecay:6+i*.7,fxReverbMod:.25+i*.05,fxReverbMix:.28,routes:[{source:'lfo2',destination:'cutoff',amount:.1+i*.012,enabled:true}]});
 if(bank===2)Object.assign(p,{wave1:'saw',wave2:i%2?'pulse':'saw',detune:5+i,aa:18+i*2,ad:45,as:92,ar:52+i*3,cutoff:58+i*2,fxModOn:true,fxModType:'ensemble',fxModRate:.15+i*.04,fxModDepth:.35+i*.035,fxModMix:.28+i*.01,fxReverbOn:i%3===0,fxReverbMix:.2});
 if(bank===3)Object.assign(p,{wave1:i%3===0?'dwgs2':'triangle',wave2:i%2?'saw':'triangle',oct2:-1,cutoff:26+i*3,aa:58+i*3,as:100,ar:85,detune:2+i,envAmt:10,motion:12+i*3,fxReverbOn:i%2===0,fxReverbDecay:8+i,fxReverbMix:.22});
 if(bank===4)Object.assign(p,{voiceMode:'mono',wave1:i%2?'pulse':'triangle',wave2:'saw',level2:15+i*2,aa:1+i,ad:25,as:75,ar:15+i*2,cutoff:58+i*3,envAmt:18+i*2,vib:10+i*2,fxDelayOn:i%2===0,fxDelayTime:.25+i*.025,fxDelayFeedback:.25,fxDelayMix:.18});
 if(bank===5)Object.assign(p,{voiceMode:'mono',wave1:i%3===0?'sine':i%2?'pulse':'triangle',wave2:'saw',oct2:-1,level2:28+i*2,filter:i%2?'lp24':'lp',cutoff:24+i*3,res:i===3?60:8+i*2,drive:18+i*3,aa:0,ad:18+i*3,as:55+i*3,ar:8+i,envAmt:28+i*4,motion:0,vib:0,pwm:0});
 if(bank===6)Object.assign(p,{wave1:['dwgs1','sine','dwgs3','pulse','triangle'][i%5],wave2:'triangle',level2:15+i*2,aa:0,ad:13+i*3,as:0,ar:12+i*2,cutoff:64+i*2,envAmt:35+i*3,fa:0,fd:20+i*2,fs:0,fxReverbOn:i%2===0,fxReverbType:i===4?'spring':'hall',fxReverbDecay:2+i*.2,fxReverbMix:.18,fxDelayOn:i%3===0,fxDelayTime:.2+i*.03,fxDelayFeedback:.25,fxDelayMix:.15});
 if(bank===7)Object.assign(p,{wave1:['dwgs1','dwgs2','dwgs3'][i%3],wave2:'triangle',level1:62+i*2,level2:22+i,aa:8+i*3,ad:35,as:65+i*2,ar:40+i*3,cutoff:58+i*3,fxModOn:i%3===0,fxModType:'phaser',fxModDepth:.4,fxModMix:.22,fxReverbOn:true,fxReverbType:i%4===0?'spring':'hall',fxReverbDwell:.25+i*.05,fxReverbTone:2500+i*450,fxReverbDecay:3+i*.4,fxReverbMix:.22});
 if(bank===8){Object.assign(p,{wave1:i%2?'saw':'pulse',wave2:'saw',aa:4+i,ad:30,as:78,ar:32,cutoff:62+i*2,fxDelayOn:i===9,fxDelayType:'cross',fxDelayMix:.35});if(i===4)Object.assign(p,{pw:28,pwm:30});if(i===5)p.ring=48;if(i===6)p.cross=35;if(i===7)Object.assign(p,{sync:'on',semi2:7,envAmt:60});if(i===8)Object.assign(p,{fxModOn:true,fxModType:'phaser',fxModDepth:.65,fxModMix:.45})}
 presets[name]=p;
 }catalog.push({number:++number,name,category,patch:presets[name]})}}
 if(catalog.length!==90||new Set(catalog.map(p=>p.name)).size!==90)throw Error('Factory catalog must contain90 unique patches');return catalog;
}
