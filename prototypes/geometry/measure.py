from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import json,hashlib,statistics,shutil
out=Path('prototypes/geometry');src=Path('prototypes/low-profile-b/reference.jpg');im=Image.open(src).convert('RGB');shutil.copyfile(src,out/'reference.jpg')
# Locate white fronts in a thin strip below the black keys; preserve the scanline for audit.
spans=[];start=None
for x in range(270,1231):
 v=statistics.median(sum(im.getpixel((x,y)))/3 for y in range(607,618));on=v>125
 if on and start is None:start=x
 if not on and start is not None:
  if x-start>=8:spans.append([start,x])
  start=None
if start is not None:spans.append([start,1231])
print('white-front spans:',spans,'count:',len(spans))
im.crop((265,495,1234,635)).resize((1454,210)).save(out/'keyboard-inspection.png')
# Border rectangles picked against the supplied native image; thin anti-aliased borders have ~2px uncertainty.
W,H=im.size
panels={'voice':(43,56,220,158),'oscillators':(269,56,323,158),'mixer':(599,56,154,158),'lfo1':(760,56,159,158),'lfo2':(925,56,160,158),'xy_automation':(1091,56,148,158),'filter_envelope':(43,220,479,94),'filter':(527,220,450,94),'eq':(993,220,246,86),'amp_envelope':(43,320,420,84),'amp':(468,320,161,84),'mod_fx':(635,320,189,153),'virtual_patch':(829,320,256,153),'arp_step':(1091,320,148,153),'delay':(43,409,292,64),'reverb':(341,409,288,64)}
areas={'outer_cabinet':(0,0,1280,640),'header':(30,1,1221,50),'control_surface':(41,54,1200,425),'keyboard_housing':(23,486,1235,149),'controller_bay':(23,491,248,141),'reference_key_bank':(274,502,953,127),'pitch_wheel':(57,517,34,101),'mod_wheel':(110,517,34,101),'octave_controls':(173,518,80,75)}
displays={'patch_lcd':(627,14,240,27),'lfo1_display':(772,110,135,38),'lfo2_display':(937,110,135,38),'filter_envelope_display':(333,240,178,65),'amp_envelope_display':(281,339,169,60)}
groups={'voice_knobs':(73,160,169,36),'osc1_knobs':(505,92,77,37),'osc2_knobs':(505,149,77,37),'lfo1_knobs':(789,155,102,34),'lfo2_knobs':(953,155,102,34),'filter_envelope_knobs':(72,246,229,36),'filter_knobs':(646,244,254,38),'eq_knobs':(1035,243,167,35),'amp_envelope_knobs':(72,346,207,35),'amp_knobs':(486,346,122,35),'mod_fx_knobs':(647,383,166,35),'delay_knobs':(164,426,122,31),'reverb_knobs':(470,426,127,31)}
faders={'osc1_slot':(624,90,7,99),'osc2_slot':(672,90,7,99),'noise_slot':(718,90,7,99),'osc1_cap':(618,111,22,12),'osc2_cap':(665,123,22,12),'noise_cap':(712,135,22,12)}
def rect(name,box,kind):
 x,y,w,h=box;return {'id':name,'kind':kind,'px':{'x':x,'y':y,'width':w,'height':h},'percent':{'x':round(x/W*100,4),'y':round(y/H*100,4),'width':round(w/W*100,4),'height':round(h/H*100,4)},'edge_uncertainty_px':2}
items=[rect(n,b,k) for k,table in [('area',areas),('section',panels),('display',displays),('knob_group',groups),('fader',faders)] for n,b in table.items()]
black=[];s=None
for x in range(274,1227):
 on=statistics.median(sum(im.getpixel((x,y)))/3 for y in range(530,550))<65
 if on and s is None:s=x
 if not on and s is not None:
  if 9<=x-s<=29:black.append([s,x])
  s=None
widths=[b-a for a,b in spans];pitch=[spans[i+1][0]-spans[i][0] for i in range(len(spans)-1)]
keys={'reference_visible_white_front_count':len(spans),'reference_visible_black_face_count':len(black),'reference_white_scan_y':[607,618],'reference_white_brightness_threshold':125,'reference_white_spans':spans,'reference_black_scan_y':[530,550],'reference_black_brightness_threshold':65,'reference_black_spans':black,'median_white_face_width_px':statistics.median(widths),'median_white_pitch_px':statistics.median(pitch),'white_key_length_px':125,'white_width_length_ratio':round(statistics.median(widths)/125,4),'black_face_width_px':statistics.median(b-a for a,b in black),'black_frame_width_px':21,'black_height_px':79,'black_white_height_ratio':round(79/125,4),'percent_of_reference_image':{'white_face_width':round(statistics.median(widths)/W*100,4),'white_pitch':round(statistics.median(pitch)/W*100,4),'white_length':round(125/H*100,4),'black_face_width':round(statistics.median(b-a for a,b in black)/W*100,4),'black_height':round(79/H*100,4)},'source_warning':'The first two white fronts are irregularly narrow and the generated image is not a labelled musical keyboard. Visible fronts are counted, not assigned pitches. Correct 2+3 chromatic grouping and existing C3-C5 mappings must be preserved.'}
proposal={'coordinate_system':[1280,640],'reference_aspect_ratio':2,'current_app_logical_size':[1920,1080],'current_aspect_ratio':round(1920/1080,6),'current_height_excess_same_width_percent':12.5,'section_rectangles':{k:dict(zip(['x','y','width','height'],v)) for k,v in panels.items()},'keyboard':{'notes':list(range(48,73)),'white_notes':[48,50,52,53,55,57,59,60,62,64,65,67,69,71,72],'black_notes':[49,51,54,56,58,61,63,66,68,70],'white_face_width':34,'white_pitch':36,'white_height':125,'black_face_width':18,'black_frame_width':21,'black_height':79,'active_bank':{'x':482,'y':503,'width':538,'height':125},'reference_bank':dict(zip(['x','y','width','height'],areas['reference_key_bank'])),'blank_housing_each_side_px':207.5,'active_span_percent_of_reference':round(538/953*100,3),'approval_required':'Centre a 25-note correctly proportioned bank inside the measured full housing, leaving dark blank end areas. No fake keys, extra pitches or remapped notes. Exact continuous full-width reference occupancy conflicts with the fixed 25-note range.'},'extra_display_proposals':{'osc1':{'x':397,'y':81,'width':76,'height':32},'osc2':{'x':397,'y':146,'width':76,'height':32},'filter_response':{'x':815,'y':246,'width':149,'height':54},'eq_overview':{'x':1000,'y':238,'width':232,'height':17},'modulation_trace':{'x':836,'y':338,'width':241,'height':22},'xy1':{'x':1098,'y':83,'width':62,'height':62},'xy2':{'x':1169,'y':83,'width':62,'height':62}},'eq':{'panel':dict(zip(['x','y','width','height'],panels['eq'])),'source_knob_count':3,'working_controls':['eqLow','eqLowFreq','eqHigh','eqHighFreq'],'proposal':'All four working knobs remain visible on one row, 28px bodies, beneath a 232x17 response overview. Propose a full-size response graph in a DETAILS view; approval required before replacing the current main graph.'},'hidden_mode':{'reference_available':False,'derivation':'Keep header; map control-surface y54..479 proportionally into y54..628, hide housing. This is a proposed expansion, not a measured original hidden layout.'}}
report={'reference':{'file':'reference.jpg','sha256':hashlib.sha256(src.read_bytes()).hexdigest(),'width':W,'height':H,'measurement_method':'Native-pixel visual edge picking, checked with enlarged labelled strips; automated scanline white/black-face runs. Rectangle uncertainty +/-2px. Percentages use full reference image dimensions, not individual panels.'},'rectangles':items,'keyboard_measurements':keys,'proposal':proposal,'absent_in_reference':['oscillator preview graphs','filter response graph','EQ response graph and low/high frequency controls','modulation live-trace graph','two simultaneously displayed XY grids','some working oscillator/LFO/effect controls','current HOLD/PANIC and device controls']}
(out/'reference-geometry.json').write_text(json.dumps(report,indent=2)+'\n')
import csv
with (out/'reference-geometry.csv').open('w',newline='') as f:
 writer=csv.writer(f);writer.writerow(['id','kind','x_px','y_px','width_px','height_px','x_percent','y_percent','width_percent','height_percent','uncertainty_px']);
 for r in items:writer.writerow([r['id'],r['kind'],*r['px'].values(),*r['percent'].values(),r['edge_uncertainty_px']])
annot=im.copy();d=ImageDraw.Draw(annot);font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',9)
for i,r in enumerate([r for r in items if r['kind']=='section']):
 q=r['px'];box=(q['x'],q['y'],q['x']+q['width'],q['y']+q['height']);d.rectangle(box,outline='#ff59ab',width=1);d.rectangle((q['x']+2,q['y']+2,q['x']+27,q['y']+13),fill='#160914');d.text((q['x']+3,q['y']+2),f'P{i+1:02}',font=font,fill='white')
for name in ['header','keyboard_housing','controller_bay','reference_key_bank','pitch_wheel','mod_wheel']:
 q=areas[name];d.rectangle((q[0],q[1],q[0]+q[2],q[1]+q[3]),outline='#ffbd4c',width=1)
annot.save(out/'reference-geometry-map.png')
scan=im.copy();d=ImageDraw.Draw(scan)
for i,(a,b) in enumerate(spans):d.line((a,609,b-1,609),fill='#ffbd4c',width=2);d.text((a+2,613),str(i+1),font=font,fill='#ff59ab')
scan.save(out/'reference-keyboard-scan.png')
print('Measured sections:',len(panels),'white fronts:',len(spans),'black faces:',len(black),'median pitch:',keys['median_white_pitch_px'])
