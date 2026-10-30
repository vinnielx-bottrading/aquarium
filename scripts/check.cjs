const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),pub=path.join(root,'public');
for(const n of ['plant-motion.js','forest-light.js','avoidance.js','feeding.js','feeding-ui.js','habitat.js','shelter.js','animation.js','motion.js','decor.js','decor-data.js','game.js','app.js'])cp.execFileSync(process.execPath,['--check',path.join(pub,n)]);
const a=require(path.join(pub,'animation.js'));
for(const s of ['gold','blue']){const n=s==='gold'?6:8;const seen=new Set();for(let t=0;t<3;t+=.017){const frame=a.swimFrame(s,t);assert(frame>=0&&frame<n);seen.add(frame)}assert.equal(seen.size,n)}
assert.equal(a.turnFrame(1),0);assert.equal(a.turnFrame(.001),5);assert.equal(a.turnFrame(0),5);
for(const n of ['C01_SWIM','C02_SWIM','C01_TURN','C02_TURN']){const b=fs.readFileSync(path.join(pub,'assets',n+'.png'));assert.equal(b.toString('hex',0,8),'89504e470d0a1a0a');assert.equal(b.readUInt32BE(20),320);assert.equal(b.readUInt32BE(16),512*(n==='C01_SWIM'?8:6));}
for(const name of fs.readdirSync(pub).filter(n=>n.endsWith('.html'))){const text=fs.readFileSync(path.join(pub,name),'utf8');for(const m of text.matchAll(/(?:src|href)="([^"#]+)"/g)){const u=m[1].split('#')[0];if(/^(?:https?:|data:)/.test(u))continue;assert(fs.existsSync(path.join(pub,u)),`${name}: missing ${u}`)}}
const data=JSON.parse(fs.readFileSync(path.join(pub,'data.json')));assert.equal(new Set(data.map(x=>x.id)).size,data.length);
const game=fs.readFileSync(path.join(pub,'game.js'),'utf8');for(const m of game.matchAll(/assets\/[^'"\s]+\.png/g))assert(fs.existsSync(path.join(pub,m[0])),`missing ${m[0]}`);
assert(!game.includes('data:image/'));assert(game.includes('drawTurn(f,y)'));assert.equal(JSON.parse(fs.readFileSync(path.join(root,'vercel.json'))).outputDirectory,'public');
console.log('PASS: JavaScript, sprite frame bounds, atlas dimensions, static links, game images, unique asset IDs and Vercel output.');
const vm=require('node:vm');const items=vm.runInNewContext(fs.readFileSync(path.join(pub,'decor-data.js'),'utf8')+';DECOR_ITEMS');
assert.equal(items.length,19,'19 placeable items including equipment');
assert.equal(new Set(items.map(x=>x.id)).size,19);
for(const item of items){assert(fs.existsSync(path.join(pub,item.src)),item.id);assert(item.ratio>0);assert(['rock','wood','plant','pot','equipment'].includes(item.category));if(item.crop)assert(item.crop.length===4&&item.crop.every(Number.isFinite));}
const decor=fs.readFileSync(path.join(pub,'decor.js'),'utf8');const constrain=decor.match(/function constrainDecor\(o\)\{[^\n]+/)[0];
const context=vm.createContext({L:130,R:1370,DX:100,bedHeight:()=>0});vm.runInContext('const dcClamp=(v,a,b)=>Math.max(a,Math.min(b,v));'+constrain,context);
for(const item of items)for(const x of [-1000,800,3000])for(const y of [100,660,900]){context.input={type:item.id,x,y,width:item.width};const o=vm.runInContext('constrainDecor(input)',context);assert(o.y>=430&&o.y<=698);assert(o.x-o.width/2>=130);assert(o.x+o.width/2<=1470);}
assert.equal(data.filter(x=>/^B\d\d$/.test(x.id)&&x.status==='ready').length,13);
console.log('PASS: all 13 Group B entries, 19 unique placeable items, files, crop metadata and placement bounds.');
