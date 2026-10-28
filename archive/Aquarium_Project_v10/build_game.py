from pathlib import Path
import base64,json
p=Path(__file__).resolve().parent
files={'room':'A03_ROOM_v01.png','sand':'B01_SAND_v01.png','gravel':'B02_GRAVEL_v01.png','blue':'C01_MASTER_RIGHT_v01.png','gold':'C02_MASTER_RIGHT_v01.png','blueNight':'C01_NIGHT_GLOW_RIGHT_v01.png'}
a={k:'data:image/png;base64,'+base64.b64encode((p/'assets/source_images'/v).read_bytes()).decode() for k,v in files.items()}
(p/'Ho_Ca_2_5D_Choi_Thu_v02.html').write_text((p/'game.template.html').read_text().replace('__ASSETS__',json.dumps(a)))
