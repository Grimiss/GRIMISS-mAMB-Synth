from PIL import Image
from pathlib import Path
import json,statistics,shutil
p=Path('/tmp/codex-remote-attachments/01a1a050-2a9d-77f2-b5d8-85209816d076/b0cb3f52-4cc6-4afa-ae0d-2d2f1cb478f4/1-1000012243.jpg')
im=Image.open(p).convert('RGB');out=Path('prototypes/low-profile-b');shutil.copyfile(p,out/'reference.jpg')
regions={'chassis_dark':(1150,479,1195,484),'panel_face':(1104,187,1225,203),'panel_recess':(792,281,803,287),'screen_glass':(941,143,1003,150),'cheek_front':(12,242,22,400),'button_face':(102,139,125,149),'knob_top':(657,256,664,266),'teal_highlight':(622,146,632,180)}
report={}
for name,box in regions.items():
 pix=list(im.crop(box).getdata());median=tuple(round(statistics.median(v[i] for v in pix)) for i in range(3));report[name]={'box':list(box),'median_rgb':median,'hex':'#'+''.join(f'{v:02x}' for v in median)}
 if name=='teal_highlight':
  bright=sorted(pix,key=lambda p:p[1])[-max(1,len(pix)*15//100):];rgb=tuple(round(statistics.median(v[i] for v in bright)) for i in range(3));report[name]['brightest_15_percent_median_rgb']=rgb;report[name]['brightest_15_percent_hex']='#'+''.join(f'{v:02x}' for v in rgb)
for name,box in {'knobs':(45,238,312,306),'mixer':(600,55,754,214),'buttons':(61,99,145,166),'screen':(332,240,510,305),'cheek':(0,40,43,214),'panels':(40,218,977,314)}.items():im.crop(box).save(out/f'reference-{name}.png')
(out/'colour-samples.json').write_text(json.dumps({'reference_size':im.size,'method':'Per-channel median of unscaled supplied JPEG regions; sample rectangles retained; surfaces and highlights sampled separately.','regions':report},indent=2)+'\n');print(json.dumps(report,indent=2))
