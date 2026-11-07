/* GRIMISS mAMB original stereo effects. No manufacturer code, ROM or impulses.
 * Buffers and modulation/filter states are allocated once per instrument, never
 * per voice or per sample. The same factory runs in Worklet, fallback and tests.
 */
const MAMB_EFFECT_DEFAULTS = Object.freeze({
  fxModOn:false, fxModType:'chorus', fxModRate:.25, fxModDepth:.35,
  fxModFeedback:.15, fxModMix:.25,
  fxDelayOn:false, fxDelayType:'stereo', fxDelayTime:.45, fxDelayFeedback:.35,
  fxDelayMix:.25, fxDelaySync:false, fxDelayDivision:.5, fxDelayWidth:1, tempo:100,
  fxReverbOn:false, fxReverbType:'hall', fxReverbDwell:.35, fxReverbTone:5000,
  fxReverbDecay:4, fxReverbMod:.35, fxReverbMix:.25,
  master:100, pan:0, eqLow:0, eqHigh:0, eqLowFreq:200, eqHighFreq:5000
});

function createMambEffects(initial={}, sr=48000) {
  if(!Number.isFinite(sr)||sr<8000||sr>192000)throw new RangeError('Unsupported sample rate');
  const bounds={fxModRate:[.05,8],fxModDepth:[0,1],fxModFeedback:[0,.85],fxModMix:[0,1],
    fxDelayTime:[.025,4],fxDelayFeedback:[0,.92],fxDelayMix:[0,1],fxDelayDivision:[1/12,8],fxDelayWidth:[0,1],tempo:[40,240],
    fxReverbDwell:[0,1],fxReverbTone:[1000,8000],fxReverbDecay:[.3,20],fxReverbMod:[0,1],fxReverbMix:[0,1],
    master:[0,100],pan:[-1,1],eqLow:[-12,12],eqHigh:[-12,12],eqLowFreq:[80,1000],eqHighFreq:[1000,12000]};
  const choices={fxModType:['chorus','ensemble','phaser'],fxDelayType:['stereo','cross','lr'],fxReverbType:['spring','hall']};
  const p={...MAMB_EFFECT_DEFAULTS},target={...p},moving=[];
  function accept(key,value){
    if(!(key in target))return false;
    if(bounds[key]){if(typeof value!=='number'||!Number.isFinite(value))return false;const range=bounds[key];target[key]=Math.max(range[0],Math.min(range[1],value));return true}
    if(choices[key]){if(!choices[key].includes(value))return false;target[key]=value;return true}
    if(typeof target[key]==='boolean'&&typeof value==='boolean'){target[key]=value;return true}
    return false;
  }
  for(const key of Object.keys(initial))if(accept(key,initial[key]))p[key]=target[key];
  const PI=Math.PI,TWO=2*PI,dt=1/sr,paramAlpha=1-Math.exp(-1/(sr*.020)),sampleAlpha=1-Math.exp(-1/(sr*.012)),springDcAlpha=1-Math.exp(-TWO*35/sr),driftAlpha=1-Math.exp(-dt/2.7);
  let allocatedBytes=0;
  class DelayLine {
    constructor(seconds){this.data=new Float32Array(Math.ceil(seconds*sr)+8);this.pos=0;this.age=0;allocatedBytes+=this.data.byteLength}
    history(age){if(age<1||age>this.age)return 0;let index=this.pos-age;if(index<0)index+=this.data.length;return this.data[index]}
    linear(distance){distance=Math.max(1,Math.min(this.data.length-3,distance));const d=Math.floor(distance),f=distance-d;return this.history(d)*(1-f)+this.history(d+1)*f}
    cubic(distance){distance=Math.max(2,Math.min(this.data.length-4,distance));const d=Math.floor(distance),f=distance-d,y0=this.history(d-1),y1=this.history(d),y2=this.history(d+1),y3=this.history(d+2);return y1+.5*f*(y2-y0+f*(2*y0-5*y1+4*y2-y3+f*(3*(y1-y2)+y3-y0)))}
    write(value){this.data[this.pos]=Number.isFinite(value)?value:0;if(++this.pos===this.data.length)this.pos=0;if(this.age<this.data.length-2)this.age++}
    reset(){this.age=0} // Old cells become logically invalid; no real-time buffer fill.
  }
  function safeInternal(x){if(!Number.isFinite(x))return 0;return Math.abs(x)<=3?x:Math.sign(x)*(3+Math.tanh(Math.abs(x)-3))}
  function allpass(line,input,length,gain){const delayed=line.linear(length),write=input+gain*delayed;line.write(write);return delayed-gain*write}
  const phaserCoefficients=new Float64Array(12);let phaserTick=0;
  const modLines=[new DelayLine(.12),new DelayLine(.12)];
  const delayLines=[new DelayLine(4.05),new DelayLine(4.05)];
  const phaserState=new Float64Array(12),phaserFeedback=new Float64Array(2),ensemblePhases=new Float64Array([.2,2.2,4.8]);
  allocatedBytes+=phaserCoefficients.byteLength+phaserState.byteLength+phaserFeedback.byteLength+ensemblePhases.byteLength;
  const modWeights=new Float64Array(3),delayWeights=new Float64Array(3),revWeights=new Float64Array(2);
  const modNames=choices.fxModType,delayNames=choices.fxDelayType,revNames=choices.fxReverbType;
  modWeights[modNames.indexOf(p.fxModType)]=1;delayWeights[delayNames.indexOf(p.fxDelayType)]=1;revWeights[revNames.indexOf(p.fxReverbType)]=1;
  let modPhase=0,modRun=p.fxModOn,delayRun=p.fxDelayOn,revRun=p.fxReverbOn;
  let modOn=p.fxModOn?1:0,delayOn=p.fxDelayOn?1:0,revOn=p.fxReverbOn?1:0;
  let modQuiet=0,delayQuiet=0,revQuiet=0,modTail=0,delayTail=0,revTail=0;
  let wetModL=0,wetModR=0,wetDelayL=0,wetDelayR=0,wetRevL=0,wetRevR=0;
  const springDispersion=[1.5,2.7,4.1,5.6,6.8,8].map(ms=>new DelayLine(ms*.001+.002));
  const springDispersionSamples=new Float64Array([1.5,2.7,4.1,5.6,6.8,8].map(ms=>ms*.001*sr));
  const springLines=[new DelayLine(.033),new DelayLine(.041),new DelayLine(.047)];
  const springLengths=new Float64Array([.029,.037,.043]),springDamped=new Float64Array(3),springAllpass=new Float64Array(3),springRead=new Float64Array(3),springGain=new Float64Array(3);
  let springDC=0,springL=0,springR=0;
  const hallLengths=new Float64Array([.0311,.0377,.0439,.0517,.0613,.0719,.0797,.0893]);
  const hallLines=Array.from({length:8},()=>new DelayLine(.096));
  const hallEarly=[new DelayLine(.006),new DelayLine(.012),new DelayLine(.008),new DelayLine(.014)];
  const hallDamped=new Float64Array(8),hallRead=new Float64Array(8),hallGain=new Float64Array(8),hallPhase=new Float64Array([.1,1.2,2.7,4.1,5.2,.7,3.5,5.9]);
  const hallRates=new Float64Array([.53,.67,.79,.91,1.07,1.21,1.37,1.49]),hallDrift=new Float64Array(8),hallDriftTarget=new Float64Array(8),hallDriftClock=new Float64Array(8),hallSeeds=new Uint32Array([19221,66797,234991,81173,63443,93911,22447,135017]);
  let hallL=0,hallR=0;
  const eqCoefficients=[new Float64Array(5),new Float64Array(5)],eqState=new Float64Array(8);
  allocatedBytes+=modWeights.byteLength+delayWeights.byteLength+revWeights.byteLength+springDispersionSamples.byteLength+springLengths.byteLength+springDamped.byteLength+springAllpass.byteLength+springRead.byteLength+springGain.byteLength+hallLengths.byteLength+hallDamped.byteLength+hallRead.byteLength+hallGain.byteLength+hallPhase.byteLength+hallRates.byteLength+hallDrift.byteLength+hallDriftTarget.byteLength+hallDriftClock.byteLength+hallSeeds.byteLength+eqState.byteLength+eqCoefficients[0].byteLength+eqCoefficients[1].byteLength;
  let gestureDelayTime=false;let delayReadTime=0;let toneCoefficient=0,delayDamping=1-Math.exp(-TWO*8000/sr),springBias=0,springDrive=1,springNorm=1,hallModSamples=0,delayTime=p.fxDelayTime;
  let panL=1,panR=1,master=p.master/100,tick=0,dirty=511,panicRemaining=0,panicGain=1,peak=0;
  function shelf(coeff,frequency,gain,high){
    if(Math.abs(gain)<1e-8){coeff[0]=1;coeff[1]=coeff[2]=coeff[3]=coeff[4]=0;return}
    const A=10**(gain/40),w=TWO*Math.min(sr*.4,frequency)/sr,c=Math.cos(w),s=Math.sin(w),alpha=s/Math.sqrt(2),beta=2*Math.sqrt(A)*alpha;
    let b0,b1,b2,a0,a1,a2;
    if(high){b0=A*((A+1)+(A-1)*c+beta);b1=-2*A*((A-1)+(A+1)*c);b2=A*((A+1)+(A-1)*c-beta);a0=(A+1)-(A-1)*c+beta;a1=2*((A-1)-(A+1)*c);a2=(A+1)-(A-1)*c-beta}
    else {b0=A*((A+1)-(A-1)*c+beta);b1=2*A*((A-1)-(A+1)*c);b2=A*((A+1)-(A-1)*c-beta);a0=(A+1)+(A-1)*c+beta;a1=-2*((A-1)+(A+1)*c);a2=(A+1)+(A-1)*c-beta}
    coeff[0]=b0/a0;coeff[1]=b1/a0;coeff[2]=b2/a0;coeff[3]=a1/a0;coeff[4]=a2/a0;
  }
  function biquad(x,coeff,index){const y=coeff[0]*x+eqState[index];eqState[index]=coeff[1]*x-coeff[3]*y+eqState[index+1];eqState[index+1]=coeff[2]*x-coeff[4]*y;return y}
  // Dependency bits are aggregated when the smoothing list changes, not per sample.
  const controlGroups={fxDelaySync:1,fxDelayTime:1,fxDelayDivision:1,tempo:1,fxReverbTone:2,fxReverbDwell:4,fxReverbDecay:8,fxReverbMod:16,pan:32,master:64,eqLowFreq:128,eqLow:128,eqHighFreq:256,eqHigh:256};let movingMask=0;
  function queueMoving(key){if(!moving.includes(key)){moving.push(key);movingMask|=controlGroups[key]||0;}}
  function rebuildMovingMask(){movingMask=0;for(const key of moving)movingMask|=controlGroups[key]||0;}

  function updateControl(){
    if(dirty){const flags=dirty;dirty=0;
      if(flags&1)delayTime=p.fxDelaySync&&!gestureDelayTime?Math.max(.025,Math.min(4,60/p.tempo*p.fxDelayDivision)):p.fxDelayTime;
      if(flags&2)toneCoefficient=1-Math.exp(-TWO*Math.min(sr*.4,p.fxReverbTone)/sr);
      if(flags&4){springDrive=1+7*p.fxReverbDwell;springBias=Math.tanh(springDrive*.12);springNorm=1/Math.max(.25,springDrive*(1-springBias*springBias));}
      if(flags&8){const springRT=Math.min(8,p.fxReverbDecay);for(let i=0;i<3;i++)springGain[i]=Math.min(.985,10**(-3*springLengths[i]/springRT));for(let i=0;i<8;i++)hallGain[i]=Math.min(.992,10**(-3*hallLengths[i]/p.fxReverbDecay));}
      if(flags&16)hallModSamples=p.fxReverbMod*.00045*sr;
      if(flags&32){if(Math.abs(p.pan)<1e-12){panL=panR=1}else{panL=Math.SQRT2*Math.cos((p.pan+1)*PI/4);panR=Math.SQRT2*Math.sin((p.pan+1)*PI/4)}}
      if(flags&64)master=p.master/100;
      if(flags&128)shelf(eqCoefficients[0],p.eqLowFreq,p.eqLow,false);
      if(flags&256)shelf(eqCoefficients[1],p.eqHighFreq,p.eqHigh,true);
    }
  }

  function smoothWeights(weights,index){if(weights.settledIndex===index)return;weights.settledIndex=-1;let settled=true;for(let j=0;j<weights.length;j++){weights[j]+=((j===index?1:0)-weights[j])*sampleAlpha;if(Math.abs(weights[j])<1e-7)weights[j]=0;if(Math.abs(1-weights[j])<1e-7)weights[j]=1;if(weights[j]!== (j===index?1:0))settled=false;}if(settled)weights.settledIndex=index;}
  function resetMod(){for(let i=0;i<2;i++)modLines[i].reset();phaserState.fill(0);phaserFeedback.fill(0);phaserTick=0;modQuiet=0;modTail=0}
  function resetDelay(){for(let i=0;i<2;i++)delayLines[i].reset();delayQuiet=0;delayTail=0}
  function resetSpring(){for(let i=0;i<6;i++)springDispersion[i].reset();for(let i=0;i<3;i++)springLines[i].reset();springDamped.fill(0);springAllpass.fill(0);springRead.fill(0);springDC=0;springL=springR=0}
  function resetHall(){for(let i=0;i<8;i++)hallLines[i].reset();for(let i=0;i<4;i++)hallEarly[i].reset();hallDamped.fill(0);hallRead.fill(0);hallL=hallR=0}
  function resetAll(){resetMod();resetDelay();resetSpring();resetHall();eqState.fill(0);modRun=target.fxModOn;delayRun=target.fxDelayOn;revRun=target.fxReverbOn;revQuiet=0;revTail=0}
  function setParameters(values){
    for(const key in values){
      if(!accept(key,values[key]))continue;
      if(bounds[key]){if(target[key]!==p[key])queueMoving(key)}
      else {p[key]=target[key];dirty|=controlGroups[key]||0}
      if(key==='fxModOn'&&target[key]){modRun=true;modQuiet=0}
      if(key==='fxDelayOn'&&target[key]){delayRun=true;delayQuiet=0}
      if(key==='fxReverbOn'&&target[key]){revRun=true;revQuiet=0}
    }
  }
  function modSample(left,right){
    smoothWeights(modWeights,modNames.indexOf(target.fxModType));
    let l=0,r=0;
    const fb=p.fxModFeedback,depth=p.fxModDepth,phase=modPhase;
    let feedL=0,feedR=0;
    if(modWeights[0]>0){
      // Feedback shortens the base delay, moving chorus into through-colour flanging.
      const base=(.0007+.016*(1-fb/.85)**2)*sr,excursion=base*.85*depth;
      const a=modLines[0].linear(base+excursion*Math.sin(phase)),b=modLines[1].linear(base+excursion*Math.sin(phase+PI*.5));
      l+=a*modWeights[0];r+=b*modWeights[0];feedL+=a*modWeights[0];feedR+=b*modWeights[0];
    }
    if(modWeights[1]>0){
      let a=0,b=0;
      for(let j=0;j<3;j++){const base=(.012+j*.007)*sr,excursion=(.0004+.0032*depth)*sr;a+=modLines[0].linear(base+excursion*Math.sin(ensemblePhases[j]));b+=modLines[1].linear(base+excursion*Math.sin(ensemblePhases[j]+1.1+j*.41));ensemblePhases[j]+=TWO*p.fxModRate*(.83+j*.23)*dt;if(ensemblePhases[j]>=TWO)ensemblePhases[j]-=TWO}
      a/=3;b/=3;l+=a*modWeights[1];r+=b*modWeights[1];feedL+=a*modWeights[1];feedR+=b*modWeights[1];
    }
    if(modWeights[2]>0){
      let a=left+phaserFeedback[0]*fb*.85,b=right+phaserFeedback[1]*fb*.85;
      if(!(phaserTick++&15))for(let stage=0;stage<6;stage++){
        const frequencyL=180*2**((1+Math.sin(phase))*.5*depth*3.7+stage*.13),frequencyR=180*2**((1+Math.sin(phase+.8))*.5*depth*3.7+stage*.13);
        const gL=Math.tan(PI*Math.min(sr*.3,frequencyL)/sr),gR=Math.tan(PI*Math.min(sr*.3,frequencyR)/sr);phaserCoefficients[stage]=(gL-1)/(gL+1);phaserCoefficients[stage+6]=(gR-1)/(gR+1);
      }
      for(let stage=0;stage<6;stage++){const cL=phaserCoefficients[stage],cR=phaserCoefficients[stage+6],yL=cL*a+phaserState[stage],yR=cR*b+phaserState[stage+6];phaserState[stage]=a-cL*yL;phaserState[stage+6]=b-cR*yR;a=yL;b=yR;}
      phaserFeedback[0]=safeInternal(a);phaserFeedback[1]=safeInternal(b);l+=a*modWeights[2];r+=b*modWeights[2];
    }
    modLines[0].write(safeInternal(left+feedL*fb));modLines[1].write(safeInternal(right+feedR*fb));
    modPhase+=TWO*p.fxModRate*dt;if(modPhase>=TWO)modPhase-=TWO;wetModL=l;wetModR=r;
  }
  let delayFeedbackL=0,delayFeedbackR=0;
  function delaySample(left,right){
    smoothWeights(delayWeights,delayNames.indexOf(target.fxDelayType));
    const t=delayReadTime*sr;
    // A single stereo network crossfades routing/time relationships without resetting buffers.
    const normalL=delayLines[0].linear(t),normalR=delayLines[1].linear(t),lrR=delayLines[1].linear(Math.min(4*sr,t*1.5));
    const stereo=delayWeights[0],cross=delayWeights[1],lr=delayWeights[2];
    let readL=normalL,readR=normalR*(stereo+cross)+lrR*lr;
    delayFeedbackL+=delayDamping*(readL-delayFeedbackL);delayFeedbackR+=delayDamping*(readR-delayFeedbackR);
    const inL=left*(stereo+lr)+(left+right)*.5*cross,inR=right*(stereo+lr)+(right-left)*.5*cross;
    const loopL=delayFeedbackL*(stereo+lr)+delayFeedbackR*cross,loopR=delayFeedbackR*(stereo+lr)+delayFeedbackL*cross;
    delayLines[0].write(safeInternal(inL+loopL*p.fxDelayFeedback));delayLines[1].write(safeInternal(inR+loopR*p.fxDelayFeedback));
    const mid=(readL+readR)*.5,side=(readL-readR)*.5*p.fxDelayWidth;wetDelayL=mid+side;wetDelayR=mid-side;
  }
  function springSample(left,right){
    const mono=(left+right)*.5;
    let value=(Math.tanh(springDrive*(mono+.12))-springBias)*springNorm;
    springDC+=springDcAlpha*(value-springDC);value-=springDC;
    for(let i=0;i<6;i++)value=allpass(springDispersion[i],value,springDispersionSamples[i],.59-i*.025);
    let sum=0;
    for(let i=0;i<3;i++){const read=springLines[i].linear(springLengths[i]*sr);springDamped[i]+=toneCoefficient*(read-springDamped[i]);const coefficient=-.46-i*.08,y=coefficient*springDamped[i]+springAllpass[i];springAllpass[i]=springDamped[i]-coefficient*y;springRead[i]=y;sum+=y}
    for(let i=0;i<3;i++){const coupling=(2/3)*sum-springRead[i],stereo=i===1?(right-left)*.08:0;springLines[i].write(safeInternal(value*.55+stereo+coupling*springGain[i]))}
    springL=.58*(springRead[0]+springRead[1]*.55+springRead[2]*.3);springR=.58*(springRead[0]*.35+springRead[1]*.6+springRead[2]);
  }
  function hallSample(left,right){
    const diffL=allpass(hallEarly[1],allpass(hallEarly[0],left,.0043*sr,.63),.0097*sr,.58),diffR=allpass(hallEarly[3],allpass(hallEarly[2],right,.0057*sr,.63),.0113*sr,.58);
    let sum=0;
    for(let i=0;i<8;i++){
      if(--hallDriftClock[i]<=0){hallSeeds[i]=(Math.imul(hallSeeds[i],1664525)+1013904223)>>>0;hallDriftTarget[i]=(hallSeeds[i]/2147483648-1)*hallModSamples*.45;hallDriftClock[i]=sr*(1.7+i*.193)}
      hallDrift[i]+=(hallDriftTarget[i]-hallDrift[i])*driftAlpha;
      const distance=hallLengths[i]*sr+Math.sin(hallPhase[i])*hallModSamples+hallDrift[i];hallRead[i]=hallLines[i].cubic(distance);hallDamped[i]+=toneCoefficient*(hallRead[i]-hallDamped[i]);sum+=hallDamped[i];hallPhase[i]+=TWO*hallRates[i]*dt;if(hallPhase[i]>=TWO)hallPhase[i]-=TWO;
    }
    // Householder I - (2/N)11^T is orthogonal: no feedback matrix gain.
    for(let i=0;i<8;i++){const injection=((i&1)?diffL:-diffL)+((i&2)?diffR:-diffR);hallLines[i].write(safeInternal(injection*.24+(hallDamped[i]-sum*.25)*hallGain[i]))}
    hallL=.45*(hallRead[0]+hallRead[1]+hallRead[3]+hallRead[6]);hallR=.45*(hallRead[2]+hallRead[4]+hallRead[5]+hallRead[7]);
  }
  let oldSpringWeight=revWeights[0],oldHallWeight=revWeights[1];
  function reverbSample(left,right){
    smoothWeights(revWeights,revNames.indexOf(target.fxReverbType));
    if(revWeights[0]>0)springSample(left*revWeights[0],right*revWeights[0]);else if(oldSpringWeight>0)resetSpring();
    if(revWeights[1]>0)hallSample(left*revWeights[1],right*revWeights[1]);else if(oldHallWeight>0)resetHall();
    wetRevL=springL*revWeights[0]+hallL*revWeights[1];wetRevR=springR*revWeights[0]+hallR*revWeights[1];oldSpringWeight=revWeights[0];oldHallWeight=revWeights[1];
  }
  updateControl();delayReadTime=delayTime;
  function process(inputL,inputR,outL,outR){
    const length=inputL.length;if(inputR.length!==length||outL.length!==length||outR.length!==length)throw new RangeError('Stereo block lengths must match');
    for(let i=0;i<length;i++){
      if(moving.length){dirty|=movingMask;let removed=false;for(let m=moving.length-1;m>=0;m--){const key=moving[m];p[key]+=(target[key]-p[key])*paramAlpha;if(Math.abs(target[key]-p[key])<1e-8){p[key]=target[key];moving[m]=moving[moving.length-1];moving.pop();removed=true;}}if(removed)rebuildMovingMask();}
      if(!(tick++&15))updateControl();
      delayReadTime+=(delayTime-delayReadTime)*sampleAlpha;
      let left=Number.isFinite(inputL[i])?inputL[i]:0,right=Number.isFinite(inputR[i])?inputR[i]:0;
      modOn+=((target.fxModOn?1:0)-modOn)*sampleAlpha;delayOn+=((target.fxDelayOn?1:0)-delayOn)*sampleAlpha;revOn+=((target.fxReverbOn?1:0)-revOn)*sampleAlpha;
      if(modRun){modSample(left*modOn,right*modOn);modTail=Math.max(Math.abs(wetModL),Math.abs(wetModR));left=left*(1-p.fxModMix*modOn)+wetModL*p.fxModMix;right=right*(1-p.fxModMix*modOn)+wetModR*p.fxModMix;
        if(!target.fxModOn&&modOn<1e-7&&modTail<1e-7){if(++modQuiet>sr*.15){modRun=false;resetMod()}}else modQuiet=0}
      if(delayRun){delaySample(left*delayOn,right*delayOn);delayTail=Math.max(Math.abs(wetDelayL),Math.abs(wetDelayR));left=left*(1-p.fxDelayMix*delayOn)+wetDelayL*p.fxDelayMix;right=right*(1-p.fxDelayMix*delayOn)+wetDelayR*p.fxDelayMix;
        if(!target.fxDelayOn&&delayOn<1e-7&&delayTail<1e-7){if(++delayQuiet>sr*Math.min(4,delayTime*1.55+.05)){delayRun=false;resetDelay();delayFeedbackL=delayFeedbackR=0}}else delayQuiet=0}
      if(revRun){reverbSample(left*revOn,right*revOn);revTail=Math.max(Math.abs(wetRevL),Math.abs(wetRevR));left=left*(1-p.fxReverbMix*revOn)+wetRevL*p.fxReverbMix;right=right*(1-p.fxReverbMix*revOn)+wetRevR*p.fxReverbMix;
        if(!target.fxReverbOn&&revOn<1e-7&&revTail<1e-7){if(++revQuiet>sr*.3){revRun=false;resetSpring();resetHall()}}else revQuiet=0}
      if(Math.abs(p.eqLow)>1e-8){left=biquad(left,eqCoefficients[0],0);right=biquad(right,eqCoefficients[0],2)}
      if(Math.abs(p.eqHigh)>1e-8){left=biquad(left,eqCoefficients[1],4);right=biquad(right,eqCoefficients[1],6)}
      if(panicRemaining>0){panicGain=Math.max(0,panicGain-1/(sr*.018));if(!--panicRemaining){resetAll();delayFeedbackL=delayFeedbackR=0;panicGain=0}}else if(panicGain<1)panicGain=Math.min(1,panicGain+1/(sr*.018));
      left*=master*panL*panicGain;right*=master*panR*panicGain;
      // Emergency output ceiling; normal synth/effect levels remain below it.
      if(!Number.isFinite(left))left=0;if(!Number.isFinite(right))right=0;left=Math.max(-1,Math.min(1,left));right=Math.max(-1,Math.min(1,right));
      peak=Math.max(peak,Math.abs(left),Math.abs(right));outL[i]=left;outR[i]=right;
    }
  }
  function panic(){panicRemaining=Math.max(1,Math.round(sr*.018))}
  function snapshot(){return {sampleRate:sr,allocatedBytes,delayTimeSeconds:delayReadTime,activeMod:modRun?target.fxModType:null,activeDelay:delayRun?target.fxDelayType:null,activeReverbs:revRun?revNames.filter((_,i)=>revWeights[i]>1e-7):[],tailEnergy:{mod:modTail,delay:delayTail,reverb:revTail},peak,current:{...p},target:{...target}}}
  function setGestureTarget(k,values){if(bounds[k]&&Number.isFinite(values[k])&&target[k]!==values[k]){accept(k,values[k]);queueMoving(k);}}
  function setGestureParameters(values,mask,changedKeys){if(gestureDelayTime!==!!mask.fxDelayTime){gestureDelayTime=!!mask.fxDelayTime;dirty|=1;}if(changedKeys){for(const k of changedKeys)setGestureTarget(k,values);}else for(const k in values)setGestureTarget(k,values);}
  return {setParameters,process,panic,snapshot,setGestureParameters,parameterValue:key=>p[key]};
}
