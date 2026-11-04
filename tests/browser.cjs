const fs=require('fs'),path=require('path'),http=require('http'),assert=require('assert');
fs.mkdirSync('work',{recursive:true});
let pw;try{pw=require('playwright')}catch{pw=require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')}
async function measure(page){return page.evaluate(async()=>{const analyser=ac.createAnalyser();analyser.fftSize=2048;processor.connect(analyser);await new Promise(r=>setTimeout(r,150));const data=new Float32Array(2048);analyser.getFloatTimeDomainData(data);processor.disconnect(analyser);return {rms:Math.sqrt(data.reduce((s,v)=>s+v*v,0)/data.length),finite:data.every(Number.isFinite)}})}
async function active(page,notes){await page.waitForFunction(expected=>JSON.stringify([...latestEngineState.activeNotes].sort((a,b)=>a-b))===JSON.stringify(expected),notes.slice().sort((a,b)=>a-b));const highlighted=await page.locator('[data-midi].on').evaluateAll(keys=>keys.map(k=>+k.dataset.midi).sort((a,b)=>a-b));assert.deepEqual(highlighted,notes.filter(n=>n>=48&&n<=84).sort((a,b)=>a-b))}
(async()=>{
 const server=http.createServer((req,res)=>{res.setHeader('Content-Type','text/html');res.end(fs.readFileSync('GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html'))}).listen(0,'127.0.0.1');await new Promise(r=>server.on('listening',r));
 const browser=await pw.chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox','--autoplay-policy=no-user-gesture-required']});const results=[];
 try{for(const route of ['http','file','fallback']){
  const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  try{await page.goto(route==='file'?'file://'+path.resolve('GRIMISS_mAMB_Synth_v0_3_3_Filter_Fix.html'):`http://127.0.0.1:${server.address().port}`)}catch(e){if(route==='file'&&e.message.includes('ERR_BLOCKED_BY_ADMINISTRATOR')){results.push({route,status:'BLOCKED',reason:'Managed Chromium policy blocks file URLs'});await page.close();continue}throw e}
  if(route==='fallback')await page.evaluate(()=>Object.defineProperty(window,'isSecureContext',{value:false}));
  // Lift before asynchronous audio startup completes; it must never become a stuck note.
  await page.evaluate(async()=>{const key=document.querySelector('[data-midi="60"]');key.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:201}));key.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:201}));noteOn(63,1,'startup');noteOn(61,1,'startup');noteOff(61,'startup');await start();await new Promise(r=>setTimeout(r,80));if(!latestEngineState.activeNotes.includes(63))throw Error('Note lost during asynchronous startup');panic()});
  await active(page,[]);await page.locator('h1').click();await page.waitForFunction(()=>document.querySelector('#status').textContent.includes('running'));const backend=await page.locator('#status').textContent();
  await page.evaluate(()=>{noteOn(60);noteOn(64);noteOn(67)});await page.waitForTimeout(500);const audio=await measure(page);assert(audio.finite&&audio.rms>1e-5);
  for(const preset of ['Warm Ambient','Vintage Pulse','Slow Drift','Deep Drone','Init VA'])await page.selectOption('#preset',{label:preset},{force:true});
  await page.evaluate(()=>{document.querySelector('#ring').value=100});await page.selectOption('#preset',{label:'Warm Ambient'},{force:true});assert.equal(await page.inputValue('#ring'),'0');await page.locator('[data-select="filter"][data-value="lp24"]').click();await page.locator('#cutoff').fill('1');await page.locator('#cutoff').dispatchEvent('input');await page.click('#panic');await active(page,[]);
  // Devices/channels and their sustain pedals own separate note gates.
  await page.evaluate(()=>{midiMessage({data:[0x90,60,100]},'a');midiMessage({data:[0x91,60,100]},'a');midiMessage({data:[0x90,60,100]},'b')});await active(page,[60]);
  await page.evaluate(()=>{midiMessage({data:[0xb0,64,127]},'a');midiMessage({data:[0x80,60,0]},'a');midiMessage({data:[0x81,60,0]},'a');midiMessage({data:[0x80,60,0]},'b')});await active(page,[60]);
  await page.evaluate(()=>{midiMessage({data:[0x90,64,100]},'b');disconnectMidi('a')});await active(page,[64]);await page.evaluate(()=>midiMessage({data:[0xb0,123,0]},'b'));await active(page,[]);
  // Synthetic pointer events exercise actual keyboard listeners with two touches on one key.
  await page.evaluate(()=>{const key=document.querySelector('[data-midi="60"]');for(const id of [1,2])key.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,pointerId:id}));key.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,pointerId:1}))});await active(page,[60]);await page.evaluate(()=>document.querySelector('[data-midi="60"]').dispatchEvent(new PointerEvent('pointercancel',{bubbles:true,pointerId:2})));await active(page,[]);
  await page.locator('h1').click();await page.keyboard.down('a');await active(page,[48]);await page.keyboard.up('a');await active(page,[]);
  await page.click('#hold');await page.evaluate(()=>{for(let n=48;n<65;n++){noteOn(n);noteOff(n)}});await active(page,[57,58,59,60,61,62,63,64]);
  await page.selectOption('#holdMode','replace');await page.evaluate(()=>{noteOn(69);noteOff(69)});await active(page,[69]);await page.click('#panic');await active(page,[]);await page.click('#hold');
  await page.locator('[data-select="voiceMode"][data-value="unison"]').click();await page.evaluate(()=>noteOn(60));await page.waitForFunction(()=>latestEngineState.voices.filter(v=>!v.stealing).length===4);await active(page,[60]);await page.click('#panic');await page.locator('[data-select="voiceMode"][data-value="poly"]').click();
  // Change the real UI route and verify actual browser audio becomes silent.
  await page.selectOption('#preset',{label:'Init VA'},{force:true});await page.locator('[data-select="lfo2Wave"][data-value="square"]').click();await page.locator('#lfo2Rate').fill('10');await page.locator('#lfo2Rate').dispatchEvent('input');
  await page.evaluate(()=>noteOn(60));await page.waitForTimeout(200);const beforeRoute=await measure(page);assert(beforeRoute.rms>1e-4);
  await page.selectOption('#route0Source','velocity');await page.selectOption('#route0Destination','amp');await page.locator('#route0Amount').fill('-100');await page.locator('#route0Amount').dispatchEvent('input');await page.click('#route0Toggle');
  await page.waitForFunction(()=>latestEngineState.routes[0].enabled);await page.waitForTimeout(400);const muted=await measure(page);assert(muted.rms<1e-5,JSON.stringify(muted));await page.click('#route0Toggle');await page.waitForTimeout(400);const restored=await measure(page);assert(restored.rms>1e-4);
  for(let i=1;i<4;i++){await page.selectOption(`#route${i}Source`,'lfo2');await page.selectOption(`#route${i}Destination`,'cutoff');await page.locator(`#route${i}Amount`).fill('30');await page.locator(`#route${i}Amount`).dispatchEvent('input');await page.click(`#route${i}Toggle`)}
  await page.waitForFunction(()=>latestEngineState.routes.slice(1).every(r=>r.enabled));await page.selectOption('#preset',{label:'Warm Ambient'},{force:true});await page.waitForFunction(()=>latestEngineState.routes.every(r=>!r.enabled));
  await page.click('#panic');await active(page,[]);await page.waitForTimeout(100);const panicAudio=await measure(page);assert.equal(panicAudio.rms,0);assert.deepEqual(errors,[]);
  results.push({route,backend,status:'PASS',checks:['startup race','audio output','five presets and reset','device/channel ownership','sustain','disconnect','two pointers','typing keyboard','voice stealing highlights','HOLD REPLACE','unison','LFO2 UI','four route controls','audible route enable/disable','preset clears routes','panic audio silence'],audio,routeAudio:{before:beforeRoute.rms,muted:muted.rms,restored:restored.rms},panicAudio});
  await page.screenshot({path:`work/browser-${route}.png`,fullPage:true});await page.close();
 }
 fs.writeFileSync('tests/browser-results.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
