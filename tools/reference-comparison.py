"""Document measured reference boundaries versus the approved live geometry."""
import json
from pathlib import Path
from PIL import Image,ImageDraw
root=Path(__file__).resolve().parents[1]
g=json.loads((root/'src/reference-layout.json').read_text())
r=json.loads((root/'prototypes/geometry/reference-geometry.json').read_text())
rects={x['id']:x['px'] for x in r['rectangles']}
ref=Image.open(root/'prototypes/low-profile-b/reference.jpg').convert('RGB')
actual=Image.open(root/'reports/rebuild-1920-visible.png').crop((0,60,1920,1020)).resize((1280,640))
for name,img in [('reference',ref.copy()),('implementation',actual.copy())]:
 d=ImageDraw.Draw(img)
 for key,q in g['panels'].items():
  old=rects.get(key)
  if old:d.rectangle((old['x'],old['y'],old['x']+old['width'],old['y']+old['height']),outline='#ff48c4',width=2)
  color='#ffbd54' if key in ['filter_envelope','filter','eq'] else '#50efd5'
  d.rectangle((q['x'],q['y'],q['x']+q['width'],q['y']+q['height']),outline=color,width=1)
 img.save(root/f'reports/reference-boundaries-{name}.png')
comparison=Image.new('RGB',(2560,680),'#101413');comparison.paste(ref,(0,40));comparison.paste(actual,(1280,40));d=ImageDraw.Draw(comparison);d.text((20,12),'ORIGINAL REFERENCE (1280 x 640)',fill='white');d.text((1300,12),'APPROVED GEOMETRY — LIVE BROWSER (1280 x 640)',fill='white');comparison.save(root/'reports/reference-side-by-side.png')
(root/'reports/reference-comparison.html').write_text('''<!doctype html><meta name="viewport" content="width=device-width"><title>mAMB approved geometry</title><style>body{background:#101413;color:#e2eee8;font:700 16px system-ui;margin:24px}img{max-width:100%;border:1px solid #53655e}a{color:#50efd5}</style><h1>Approved geometry reconstruction</h1><p>Measured original reference versus the actual browser implementation at equal 2:1 scale. Magenta: original boundaries. Teal: implemented boundaries. Amber: user-approved envelope/filter/EQ amendments. Native reference edge uncertainty ±2 pixels.</p><img src="reference-side-by-side.png"><h2>Boundary overlay — actual browser</h2><img src="reference-boundaries-implementation.png"><h2>Boundary overlay — reference</h2><img src="reference-boundaries-reference.png"><p>Filter and amp ADSR widths:420px. Filter:510px. EQ:256×94px. Cutoff:50px versus32px adjacent controls. Additional controls remain: compact EQ overview with original-node details, both XY pads with original-node expansion. The user subsequently requested three octaves filling the housing. The live keyboard now spans C3–C6 (37 notes), with no blank end areas.</p><p><a href="rebuild-1920-visible.png">1920 keyboard visible</a> · <a href="rebuild-1920-hidden.png">1920 keyboard hidden</a> · <a href="rebuild-1600-visible.png">1600 visible</a> · <a href="rebuild-1600-hidden.png">1600 hidden</a> · <a href="reference-filter-cutoff.png">Cutoff</a> · <a href="reference-eq-detail.png">EQ details</a></p>''')
