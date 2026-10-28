// Render authored vector sprites; generated source images are kept unchanged.
const fs=require('fs'),path=require('path'),sharp=require('sharp');
const root=__dirname;
(async()=>{
 const m=JSON.parse(fs.readFileSync(path.join(root,'manifest.json')));
 const sprites=m.assets.filter(a=>a.kind==='code_native_sprite');
 for(const a of sprites){const png=a.file.replace('.svg','.png');await sharp(path.join(root,a.file)).png().toFile(path.join(root,png));a.png=png;}
 const bg=fs.readFileSync(path.join(root,'source_images/A03_ROOM_v01.png')).toString('base64');
 for(const wet of [false,true]){
  const stack=sprites.filter(a=>!a.id.startsWith('A06')||a.id.includes('F00')).filter(a=>wet||!['A04','A05','A06'].includes(a.group)).sort((a,b)=>a.z-b.z);
  let svg='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="1600" height="900"><image width="1600" height="900" preserveAspectRatio="none" xlink:href="data:image/png;base64,'+bg+'"/>';
  for(const a of stack){const s=fs.readFileSync(path.join(root,a.file),'utf8').replace('<svg ','<svg x="0" y="0" ');svg+=s;}
  svg+='</svg>';
  await sharp(Buffer.from(svg)).png().toFile(path.join(root,`previews/A_COMPOSITE_${wet?'WET':'EMPTY'}_v02.png`));
 }
 fs.writeFileSync(path.join(root,'manifest.json'),JSON.stringify(m,null,2));
 console.log('Rendered 12 RGBA PNG sprites and 2 composition previews.');
})().catch(e=>{console.error(e);process.exit(1)});
