/* Original KeyLab 25 hardware inventory. Model confirmed by owner; MIDI preset
 * assignments are separately learned. This is a schematic, not dimensional CAD. */
const MAMB_KEYLAB25 = Object.freeze({
  id:'arturia-keylab25-original', name:'Arturia KeyLab 25 — original', confirmed:true,
  padsPresent:false, physicalVerification:'Pending physical controller validation',
  geometry:'Manual-based schematic; control groups condensed, not to scale',
  sources:[
    {title:'Arturia KeyLab manual, July 2014, sections 2.2–2.3 (pp.9–18)',url:'https://downloads.arturia.com/products/keylab/manual/Keylab_Manual_EN_20140701.pdf'},
    {title:'Arturia KeyLab manual, April 2013, sections 2.2–2.3',url:'https://downloads.arturia.com/products/keylab/manual/Keylab_Manual_EN_20130401.pdf'},
    {title:'Arturia original KeyLab launch, 15 November 2013 (25 has no pad grid)',url:'https://www.arturia.com/de/company/press/press-releases/press-release-keylabcontrollers-15112013'}
  ]
});
const MAMB_KEYLAB25_CONTROLS = (()=>{
  const rows=[];
  function add(id,name,kind,x,y,w,h,extra={}){rows.push({id,name,kind,x,y,w,h,present:true,learnable:true,...extra})}
  add('keyboard','25-key keyboard','keyboard',195,345,890,210,{learnable:false,native:'keyboard',note:'Notes and velocity use the fixed performance path; octave/transposition is set on the controller. Channel pressure is not mapped by mAMB.'});
  add('pitch-wheel','Pitch-bend wheel','wheel',72,389,35,102,{native:'bend',defaultMessage:{type:'pitchbend',number:null},note:'Fixed ±2-semitone bend per device/channel. Learned extras do not disable this path.'});
  add('mod-wheel','Modulation wheel','wheel',128,389,35,102,{native:'wheel',defaultMessage:{type:'cc',number:1},note:'Fixed CC1 supplies the virtual patch MOD WHEEL source. Route depth determines the audible result; controller presets can reassign its transmitted message.'});
  add('octave-down','Octave down','button',68,319,44,26,{learnable:false,hardwareLocal:true,note:'Controller-local keyboard transposition. No separate mAMB CC assignment is assumed.'});
  add('octave-up','Octave up','button',122,319,44,26,{learnable:false,hardwareLocal:true,note:'Controller-local keyboard transposition. No separate mAMB CC assignment is assumed.'});
  add('nav-category','Category / Param encoder','knob',77,149,38,38,{note:'One of two clickable navigation encoders; transmitted MIDI depends on hardware mode/preset.'});
  add('nav-preset','Preset / Value encoder','knob',147,149,38,38,{note:'One of two clickable navigation encoders; transmitted MIDI depends on hardware mode/preset.'});
  add('nav-category-push','Category / Param push action','push-action',77,149,17,17,{note:'Push action of the same clickable encoder, not an extra panel button; no MIDI message is assumed until observed.'});
  add('nav-preset-push','Preset / Value push action','push-action',147,149,17,17,{note:'Push action of the same clickable encoder, not an extra panel button; no MIDI message is assumed until observed.'});
  add('lcd','32-character LCD','display',223,111,200,46,{learnable:false,note:'Hardware display; mAMB does not send screen content to it.'});
  for(const [i,name] of ['Sound','Multi','Edit'].entries())add('mode-'+name.toLowerCase(),name+' button','button',224+i*72,174,63,24,{note:'Original hardware/Analog Lab mode function. No supported mAMB MIDI message is presumed.'});
  add('volume-encoder','Volume encoder','knob',452,149,38,38,{documentedCC:7,note:'The 2014 manual documents CC7 as factory default. mAMB maps CC7 to Master in its default software map; the actual saved hardware preset can differ.'});
  const encoderNames=['Filter Cutoff','Filter Resonance','LFO Rate','LFO Amount','Chorus Mix','Delay Mix','Param 1','Param 2','Param 3','Param 4'];
  for(let i=0;i<10;i++)add('encoder'+(i+1),'Encoder '+(i+1)+' — '+encoderNames[i],'knob',529+i*56,137,31,31,{silkscreen:encoderNames[i],note:'Physical label is an Analog Lab role, not an assumed mAMB assignment or CC. Learn the actual message for the active hardware bank/preset.'});
  for(let i=0;i<9;i++)add('fader'+(i+1),'Fader '+(i+1),'fader',533+i*62,216,24,82,{note:'Freely configurable envelope/drawbar fader. MIDI CC and channel remain unknown until received.'});
  for(let i=0;i<10;i++)add('snapshot'+(i+1),'Snapshot / Switch '+(i+1),'button',224+(i%5)*43,222+Math.floor(i/5)*31,34,21,{note:'One of ten configurable snapshot/edit switches; may send CC, note, program change or act locally depending on mode.'});
  const transport=[['rewind','REW'],['forward','FWD'],['stop','STOP'],['play','PLAY'],['record','REC'],['loop','LOOP']];
  for(let i=0;i<transport.length;i++)add('transport-'+transport[i][0],'Transport '+transport[i][1],'button',225+i*36,295,30,22,{note:'Factory transport is MMC/SysEx per manual. mAMB does not parse MMC; use Arturia MIDI Control Center to assign CC/note/program, then MIDI Learn. No transport CC is invented.'});
  add('bank1','Encoder/Fader Bank 1','button',1113,190,37,27,{note:'Hardware bank selection changes outgoing assignments; no standalone MIDI CC is presumed. One current binding is retained per physical control.'});
  add('bank2','Encoder/Fader Bank 2','button',1113,232,37,27,{note:'Hardware bank selection changes outgoing assignments; this profile stores one current binding per physical control; relearn after a bank change.'});
  const ports=[['midi-in','MIDI IN',false],['midi-out','MIDI OUT',false],['expression','EXPR',true],['sustain','SUSTAIN',true],['aux','AUX',true],['breath','BREATH',true],['usb','USB',false],['dc-in','DC IN',false],['power','POWER',false]];
  for(let i=0;i<ports.length;i++)add(ports[i][0],ports[i][1]+' rear connection','port',239+i*93,67,78,22,{learnable:ports[i][2],optional:ports[i][2],documentedCC:({expression:11,sustain:64,aux:12})[ports[i][0]],native:ports[i][0]==='sustain'?'sustain':null,defaultMessage:ports[i][0]==='sustain'?{type:'cc',number:64}:undefined,note:ports[i][2]?'Optional external pedal/controller, not supplied with the keyboard. Learn its actual transmitted message; documented factory values can be changed.':'Connection or power control, not an assignable synth control.'});
  add('pads-not-present','Pads — NOT PRESENT on original KeyLab 25','absent',0,0,0,0,{present:false,learnable:false,note:'The pad grid belongs to larger original KeyLab models; no phantom pads or pad mappings are created.'});
  return Object.freeze(rows.map(Object.freeze));
})();
function mambMidiCategoryColor(category){const c=String(category||'').toLowerCase();return /filter|lfo|modulation|route/.test(c)?'#4de5cf':/osc|envelope/.test(c)?'#ee4daa':/fx|effect|delay|reverb|eq/.test(c)?'#e7b45c':/master|performance|voice|keyboard|bend|wheel|sustain/.test(c)?'#79d796':'#7d858b'}
function mambMidiEscape(value){return String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function renderMambKeyLab25Svg(state={}){
  const controls=state.controls||MAMB_KEYLAB25_CONTROLS,selected=state.selectedPhysical,active=state.activity?.physicalId;
  let svg='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 640" role="img" aria-label="Original Arturia KeyLab 25 controller map"><rect width="1200" height="640" fill="#0b1110"/><text x="30" y="30" fill="#dce8e4" font-family="sans-serif" font-size="19">GRIMISS / ORIGINAL KEYLAB 25 — NO PAD GRID</text><text x="30" y="51" fill="#9aa7a3" font-family="sans-serif" font-size="12">Manual-based schematic • physical model confirmed • dimensions condensed • hardware MIDI verification pending</text><rect x="25" y="94" width="1150" height="482" rx="15" fill="#303735" stroke="#82908a" stroke-width="2"/><rect x="25" y="94" width="24" height="482" fill="#5c4840"/><rect x="1151" y="94" width="24" height="482" fill="#5c4840"/>';
  for(const row of controls){if(!row.present)continue;const id=row.id,color=row.mappingType==='Unassigned'||!row.mappingType?'#7d858b':mambMidiCategoryColor(row.category),stroke=id===selected?'#ffffff':id===active?'#e9ff9b':color;svg+='<g data-physical-id="'+mambMidiEscape(id)+'" tabindex="0" role="button" aria-label="'+mambMidiEscape(row.name)+'" style="cursor:pointer"><title>'+mambMidiEscape(row.name+' — '+(row.parameterLabel||'UNASSIGNED'))+'</title>';
    if(row.kind==='keyboard'){
      const whiteCount=15,whiteWidth=row.w/whiteCount;for(let i=0;i<whiteCount;i++)svg+='<rect x="'+(row.x+i*whiteWidth)+'" y="'+row.y+'" width="'+(whiteWidth-1)+'" height="'+row.h+'" rx="2" fill="#dbe0dc" stroke="'+stroke+'"/>';
      for(let i=0;i<14;i++)if([0,1,3,4,5,7,8,10,11,12].includes(i))svg+='<rect x="'+(row.x+(i+1)*whiteWidth-whiteWidth*.3)+'" y="'+row.y+'" width="'+(whiteWidth*.6)+'" height="'+(row.h*.6)+'" rx="2" fill="#151d1a" stroke="'+stroke+'"/>';
    }else if(row.kind==='knob'){svg+='<circle cx="'+row.x+'" cy="'+row.y+'" r="'+(row.w*.65)+'" fill="#171e1c" stroke="'+stroke+'" stroke-width="3"/><path d="M'+row.x+' '+row.y+'l-10 -10" stroke="'+stroke+'" stroke-width="3"/>';}
    else if(row.kind==='push-action'){svg+='<circle cx="'+row.x+'" cy="'+row.y+'" r="'+(row.w*.5)+'" fill="#26352d" stroke="'+stroke+'"/>';}
    else if(row.kind==='fader'){svg+='<rect x="'+(row.x-3)+'" y="'+row.y+'" width="6" height="'+row.h+'" rx="2" fill="#080c0b" stroke="#505a55"/><rect x="'+(row.x-row.w/2)+'" y="'+(row.y+row.h*.4)+'" width="'+row.w+'" height="13" rx="2" fill="#202a25" stroke="'+stroke+'"/>';}
    else if(row.kind==='wheel'){svg+='<rect x="'+row.x+'" y="'+row.y+'" width="'+row.w+'" height="'+row.h+'" rx="10" fill="#131917" stroke="'+stroke+'" stroke-width="2"/>';for(let j=0;j<6;j++)svg+='<path d="M'+(row.x+5)+' '+(row.y+15+j*13)+'h'+(row.w-10)+'" stroke="#53605a"/>';}
    else svg+='<rect x="'+row.x+'" y="'+row.y+'" width="'+row.w+'" height="'+row.h+'" rx="3" fill="'+(row.kind==='display'?'#071d1a':'#17221d')+'" stroke="'+stroke+'" stroke-width="'+(id===selected?3:1)+'"/>';
    const short=row.kind==='knob'?(row.id.startsWith('encoder')?'E'+row.id.slice(7):row.id==='volume-encoder'?'VOLUME':row.id==='nav-category'?'CATEGORY':'PRESET'):row.kind==='fader'?'F'+row.id.slice(5):row.kind==='push-action'?'PUSH':row.id.startsWith('snapshot')?'S'+row.id.slice(8):row.id.startsWith('transport-')?row.name.replace('Transport ',''):row.kind==='wheel'?(id==='pitch-wheel'?'PITCH':'MOD'):row.kind==='keyboard'?'25 KEYS / FIXED PERFORMANCE':row.kind==='display'?'KEYLAB 25':row.name.replace(' rear connection','').replace('Encoder/Fader ','').replace(' button','').replace('Octave ','OCT ');
    const tx=row.kind==='knob'||row.kind==='fader'||row.kind==='push-action'?row.x:row.x+row.w/2,ty=row.kind==='push-action'?row.y+2:row.kind==='knob'?row.y+row.h*.65+15:row.kind==='fader'?row.y+row.h+18:row.kind==='wheel'?row.y+row.h+18:row.kind==='keyboard'?row.y+row.h+17:row.y+row.h/2+4;
    svg+='<text x="'+tx+'" y="'+ty+'" text-anchor="middle" fill="'+(row.kind==='keyboard'?'#79d796':'#d8e1dc')+'" font-family="sans-serif" font-size="'+(row.kind==='push-action'?5:row.id.startsWith('transport')?8:row.kind==='knob'?10:11)+'">'+mambMidiEscape(short)+'</text>';if((row.kind==='knob'&&!row.id.startsWith('nav-'))||row.kind==='fader')svg+='<text x="'+tx+'" y="'+(ty+12)+'" text-anchor="middle" fill="'+color+'" font-family="sans-serif" font-size="9">'+mambMidiEscape((row.parameterLabel||'UNASSIGNED').slice(0,11))+'</text>';svg+='</g>';
  }
  svg+='<text x="31" y="605" fill="#aab5b0" font-family="sans-serif" font-size="12">Teal Filter/Mod • Magenta Osc/EG • Amber FX • Green Performance • Grey UNASSIGNED</text><text x="31" y="626" fill="#aab5b0" font-family="sans-serif" font-size="11">Unknown encoder/fader/switch CCs stay unassigned until MIDI Learn. Factory transport MMC is not parsed by mAMB.</text></svg>';return svg;
}
