from PIL import Image,ImageDraw,ImageFont
from pathlib import Path
import json
root=Path('prototypes/low-profile-b');font=ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf',16)
meta=[]
for name in ['knobs','mixer','buttons','screen','cheek']:
 a=Image.open(root/f'reference-{name}.png').convert('RGB');b=Image.open(root/f'prototype-{name}.png').convert('RGB');zoom=2;w=max(320,max(a.width,b.width)*zoom);h=max(a.height,b.height)*zoom
 canvas=Image.new('RGB',(w*2+48,h+68),'#0b0d0c');d=ImageDraw.Draw(canvas);d.text((12,12),'Original supplied mockup',font=font,fill='#c8d5cd');d.text((w+36,12),'Prototype B · actual browser capture',font=font,fill='#c8d5cd')
 for image,x in [(a,12),(b,w+36)]:canvas.paste(image.resize((image.width*zoom,image.height*zoom),Image.Resampling.NEAREST),(x,46))
 canvas.save(root/f'compare-{name}.png');meta.append({'component':name,'reference_native_size':a.size,'prototype_native_size':b.size,'display_zoom_both':zoom,'same_scale':True,'colour_adjustment':False})
(root/'comparison-scale.json').write_text(json.dumps(meta,indent=2)+'\n')
