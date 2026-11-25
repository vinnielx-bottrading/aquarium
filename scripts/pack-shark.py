from PIL import Image
from pathlib import Path
root=Path(__file__).resolve().parents[1]/'public/assets'
for kind,count,name in [('swim',12,'C03_SWIM'),('turn',6,'C03_TURN')]:
 atlas=Image.new('RGBA',(512*count,320))
 for i in range(count):atlas.paste(Image.open(f'/tmp/sharkframes/{kind}{i:02}.png'),(i*512,0))
 atlas.save(root/(name+'.png'));atlas.save(root/(name+'.webp'),lossless=True)
im=Image.open('/tmp/sharkframes/swim00.png');im.save(root/'shark.png');im.save(root/'shark.webp',lossless=True)
