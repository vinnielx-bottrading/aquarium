const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),cp=require('node:child_process');
const root=path.resolve(__dirname,'..'),pub=path.join(root,'public');
for(const n of ['animation.js','motion.js','decor.js','decor-data.js','game.js','app.js'])cp.execFileSync(process.execPath,['--check',path.join(pub,n)]);
const a=require(path.join(pub,'animation.js'));
for(const s of ['gold','blue']){const n=s==='gold'?6:8;const seen=new Set();for(let t=0;t<3;t+=.017){const frame=a.swimFrame(s,t);assert(frame>=0&&frame<n);seen.add(frame)}assert.equal(seen.size,n)}
assert.equal(a.turnFrame(1),0);assert.equal(a.turnFrame(.001),5);assert.equal(a.turnFrame(0),5);
for(const n of ['C01_SWIM','C02_SWIM','C01_TURN','C02_TURN']){const b=fs.readFileSync(path.join(pub,'assets',n+'.png'));assert.equal(b.toString('hex',0,8),'89504e470d0a1a0a');assert.equal(b.readUInt32BE(20),320);assert.equal(b.readUInt32BE(16),512*(n==='C01_SWIM'?8:6));}
for(const name of fs.readdirSync(pub).filter(n=>n.endsWith('.html'))){const text=fs.readFileSync(path.join(pub,name),'utf8');for(const m of text.matchAll(/(?:src|href)="([^"#]+)"/g)){const u=m[1].split('#')[0];if(/^(?:https?:|data:)/.test(u))continue;assert(fs.existsSync(path.join(pub,u)),`${name}: missing ${u}`)}}
const data=JSON.parse(fs.readFileSync(path.join(pub,'data.json')));assert.equal(new Set(data.map(x=>x.id)).size,data.length);
const game=fs.readFileSync(path.join(pub,'game.js'),'utf8');for(const m of game.matchAll(/assets\/[^'"\s]+\.png/g))assert(fs.existsSync(path.join(pub,m[0])),`missing ${m[0]}`);
assert(!game.includes('data:image/'));assert(game.includes('drawTurn(f,y)'));assert.equal(JSON.parse(fs.readFileSync(path.join(root,'vercel.json'))).outputDirectory,'public');
console.log('PASS: JavaScript, sprite frame bounds, atlas dimensions, static links, game images, unique asset IDs and Vercel output.');
