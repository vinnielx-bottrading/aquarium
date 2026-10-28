from pathlib import Path
import json, shutil, hashlib

ROOT=Path(__file__).resolve().parent
SRC=ROOT.parent/'generated_images'
sources={
 'A01_A02_APPROVED_v01':'exec-453d1bb8-d515-4b06-bb1e-4a687a3f8f63.png',
 'A01_GLASS_EXTRACT_DRAFT_v02':'exec-14acc55e-18f6-427b-8a26-a9b84435cbdf.png',
 'A02_BASE_EXTRACT_v02':'exec-254837c8-9a94-478c-91a7-1b6dd9de707d.png',
 'A03_ROOM_v01':'exec-d42ffa3a-ac52-46d1-8b03-65caff48f6fd.png',
 'A04_BACKDROP_v01':'exec-c6b81433-cc2c-4543-82fc-1b36ce49aa0b.png',
 'A05_WATER_DRAFT_v01':'exec-f28b7e91-d884-4ffe-af7b-5e36c3a84f38.png',
 'A06_SURFACE_DRAFT_v01':'exec-66809995-b7f3-467d-8825-1a35eb862b49.png',
 'A07_REFLECTION_DRAFT_v01':'exec-ef36665e-f5fd-4296-b8e1-d81789e4ea11.png'}
for name,src in sources.items():
 if (SRC/src).exists(): shutil.copyfile(SRC/src,ROOT/'source_images'/f'{name}.png')

# Runtime geometry is authored from scratch; source raster images are never edited.
# A common canvas allows all sprites to share origin (0,0) and scale.
defs='''<defs>
<linearGradient id="glass" x2="0" y2="1"><stop stop-color="#b4e2e5" stop-opacity=".07"/><stop offset="1" stop-color="#4c9da9" stop-opacity=".12"/></linearGradient>
<linearGradient id="water" x2="0" y2="1"><stop stop-color="#b6f2f2" stop-opacity=".12"/><stop offset="1" stop-color="#388a9f" stop-opacity=".29"/></linearGradient>
<linearGradient id="back" x2="0" y2="1"><stop stop-color="#c7e9e5"/><stop offset="1" stop-color="#245463"/></linearGradient>
<linearGradient id="base" x2="0" y2="1"><stop stop-color="#5c5a58"/><stop offset="1" stop-color="#353738"/></linearGradient>
<linearGradient id="shine"><stop stop-color="white" stop-opacity=".17"/><stop offset="1" stop-color="white" stop-opacity="0"/></linearGradient>
</defs>'''
layers={
'A01_01_REAR_v02':('<path d="M220 165H1480V625H220Z" fill="url(#glass)" stroke="#75a5ab" stroke-width="3"/><path d="M220 165H1480" stroke="#e6ffff" stroke-width="2"/>',20),
'A01_02_FLOOR_v02':('<path d="M100 695L220 625H1480L1360 695Z" fill="#9fcbcf" fill-opacity=".12" stroke="#83aeb1" stroke-width="3"/>',25),
'A01_03_SIDES_v02':('<path d="M100 235L220 165V625L100 695Z M1360 235L1480 165V625L1360 695Z" fill="url(#glass)" stroke="#78aeb4" stroke-width="3"/>',75),
'A01_04_FRONT_v02':('<path d="M100 235H1360V695H100Z" fill="none" stroke="#568c94" stroke-width="6"/><path d="M100 235H1360V695H100Z M100 235L220 165H1480L1360 235" fill="none" stroke="#dcffff" stroke-width="2"/>',90),
'A02_BASE_v02':('<path d="M94 698L218 624H1487L1367 698Z" fill="#6b6b68" stroke="#373b3c" stroke-width="2"/><path d="M94 698H1367V756H94Z" fill="url(#base)" stroke="#333738" stroke-width="2"/><path d="M1367 698L1487 624V682L1367 756Z" fill="#353a3b" stroke="#303536" stroke-width="2"/><path d="M94 700H1367L1487 626" fill="none" stroke="#91918a" stroke-width="2"/>',10),
'A04_BACKDROP_v02':('<path d="M223 168H1477V622H223Z" fill="url(#back)"/>',15),
'A05_WATER_v02':('<path d="M104 285L223 215H1476V622L1356 691H104Z" fill="url(#water)"/>',65),
'A07_REFLECTION_v02':('<path d="M106 241H260L106 420Z M282 241H327L106 496V442Z" fill="url(#shine)"/><path d="M1352 245V683" stroke="#efffff" stroke-opacity=".24" stroke-width="3"/>',95),
}
for phase in range(4):
 paths=[]
 for i in range(12):
  x=155+i*102; y=249+(i%3)*9
  d=(phase*4+i*2)%13
  paths.append(f'<path d="M{x} {y}q18 {-3-d/5} 39 0t39 0"/>')
 layers[f'A06_SURFACE_F{phase:02}_v02']=('<path d="M104 285L223 215H1476L1356 285Z" fill="#c3eff0" fill-opacity=".13"/><g fill="none" stroke="#e3ffff" stroke-opacity=".25" stroke-width="1.3">'+''.join(paths)+'</g><path d="M104 285H1356" stroke="#deffff" stroke-opacity=".5" fill="none"/>',70)

manifest=[]
for name,(body,z) in layers.items():
 p=ROOT/'runtime'/f'{name}.svg'
 p.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900" viewBox="0 0 1600 900">{defs}{body}</svg>')
 manifest.append(dict(id=name.split('_v')[0],group=name[:3],version='v02',file=str(p.relative_to(ROOT)),kind='code_native_sprite',status='prototype_ready_pending_user_visual_review',canvas=[1600,900],origin=[0,0],z=z,sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
for name in sources:
 p=ROOT/'source_images'/f'{name}.png'
 manifest.append(dict(id=name,group=name[:3],file=str(p.relative_to(ROOT)),kind='imagegen_original',status='user_approved_concept' if 'APPROVED' in name else ('archived_draft' if 'DRAFT' in name else 'reference'),sha256=hashlib.sha256(p.read_bytes()).hexdigest()))
(ROOT/'manifest.json').write_text(json.dumps(dict(project='Ho ca 2.5D',release='A_v02',assets=manifest,geometry=dict(canvas=[1600,900],front=[100,235,1360,695],rear=[220,165,1480,625],floor=[[100,695],[220,625],[1480,625],[1360,695]],water_surface_front_y=285,water_surface_back_y=215),animation=dict(A06=dict(frames=4,fps=4,loop=True))),ensure_ascii=False,indent=2))
print('Created',len(layers),'runtime SVG sprites and',len(sources),'source images')
