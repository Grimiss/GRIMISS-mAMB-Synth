// MS-08 header and hardware presentation. Existing parameter/patch nodes retain bindings.
(function(){document.title='GRIMISS AMBIENT — mikroSEQ MS-08';const el=id=>document.getElementById(id),header=document.querySelector('main>.header'),brand=header.querySelector('.brand');
 const product=brand.querySelector('span:not(.cabinet-vents)');product.id='ms08-product';product.textContent='mikroSEQ';for(const node of [...brand.childNodes])if(node.nodeType===3)node.remove();
 const logo=document.createElement('span');logo.id='ms08-logo';logo.setAttribute('aria-label','GRIMISS AMBIENT');logo.innerHTML='<svg viewBox="0 0 720 180" role="img" aria-label="GRIMISS AMBIENT"><g fill="#d5d7d5"><circle cx="90" cy="90" r="84"/><g fill="#0c120f"><circle cx="90" cy="90" r="23"/><path id="ms08-reel-cut" d="M76 18h28q8 0 9 9l4 31q1 6-6 5a38 38 0 0 0-42 0q-6 1-5-5l4-31q1-9 8-9Z"/><use href="#ms08-reel-cut" transform="rotate(120 90 90)"/><use href="#ms08-reel-cut" transform="rotate(240 90 90)"/></g><text x="225" y="91" font-family="Orbitron,Arial" font-size="69" font-weight="900" letter-spacing="1">GRIMISS</text><text x="225" y="145" font-family="Orbitron,Arial" font-size="34" font-weight="600" letter-spacing="6">AMBIENT</text></g></svg>';brand.prepend(logo);
 const model=document.createElement('span');model.id='ms08-model';model.textContent='MS-08';product.after(model);
 const tags=document.createElement('div');tags.id='ms08-specs';for(const node of header.querySelectorAll('.small-tag'))if(node.textContent.includes('SINGLE TIMBRE')||node.textContent.includes('OSC →'))tags.append(node);header.append(tags);
 el('status').classList.add('ms08-hidden-status');
 const readout=header.querySelector('.patch-readout');readout.setAttribute('role','button');readout.tabIndex=0;readout.setAttribute('aria-label','Select patch');readout.onclick=()=>el('openPatchBrowser').click();readout.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();el('openPatchBrowser').click();}};
 document.querySelector('label[for=pw]').textContent='RESHAPE';el('pw').setAttribute('aria-label','RESHAPE');el('pw').title='RESHAPE: phase distortion on OSC1 waveforms; pulse width on square';
 const deck=el('seq-control-deck');if(deck){const rate=deck.querySelector('[data-choice=pitchRate] .seq-choice-label');rate.textContent='RATE';
 const bank=deck.querySelector('[data-choice=editBank]');const playback=document.createElement('div');playback.className='ms08-playback';playback.innerHTML='<span>PLAYBACK</span>';playback.append(bank.querySelector('.seq-alternate-switch'));deck.querySelector('.seq-pattern-group').append(playback);
 }
 const songDialog=el('seq-song-dialog'),programButton=el('seq-program');programButton.setAttribute('aria-haspopup','dialog');new MutationObserver(()=>programButton.setAttribute('aria-expanded',String(songDialog.open))).observe(songDialog,{attributes:true,attributeFilter:['open']});

 window.mambMS08Ready=true;
})();
