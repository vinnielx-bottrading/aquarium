const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const pub=path.join(__dirname,'../public');
global.FishMotion=require(pub+'/motion.js');const S=require(pub+'/shelter.js');const items=vm.runInNewContext(fs.readFileSync(pub+'/decor-data.js','utf8')+';DECOR_ITEMS');
let seed=42;const r=()=>((seed=(seed*1664525+1013904223)>>>0)/4294967296);
for(const height of [0,24,60,96])for(const depth of [0,.5,1])for(const size of [140,190]){
 const f={x:800,size,depth,lane:.5,dir:1,turn:0};const level=Math.max(40,Math.ceil((height+65*depth+size*.64+28)/4.2));FishMotion.init(f,level,r,height);
 for(let i=0;i<3000;i++){FishMotion.update(f,.04,level,r,height);assert(f.y+size*.32<=700-height-depth*65-13.99);assert(f.y-size*.32>=700-4.2*level+13.99)}
}
const create=()=>{const f={id:1,x:420,size:150,depth:.2,lane:.5,dir:1,turn:0,phase:0};FishMotion.init(f,100,r,24);return f};
for(const type of ['B08_v01','B05_v01'])for(const flip of [false,true]){
 const o={id:1,type,width:280,x:800,y:661,depth:.2,flip};const d=S.describe(o,items.find(x=>x.id===type),24);const f=create(),other=create();other.id=2;other.shelterCooldown=0;
 assert(S.eligible(f,d,100));S.start(f,d);assert.equal(S.update(other,.04,[d],[f,other],100,24,()=>0),false,'one fish per shelter');
 const modes=new Set();let ended=false;
 for(let i=0;i<2500;i++){S.update(f,.04,[d],[f],100,24,r);if(!f.shelter){ended=true;break}modes.add(f.shelter.mode);assert(Number.isFinite(f.x)&&Number.isFinite(f.y));}
 assert(ended);for(const mode of ['seeking','entering','resting','turning','exiting'])assert(modes.has(mode),type+' missing '+mode);assert.equal(f.renderScale,1);assert.equal(f.depth,.2);
 S.start(f,d);S.update(f,.04,[],[f],100,24,r);assert.equal(f.shelter,null,'removed cave releases fish');
 S.start(f,d);S.update(f,.04,[{...d,signature:'moved'}],[f],100,24,r);assert.equal(f.shelter,null,'moved cave releases fish');
 assert(!S.eligible(f,{...d,capacity:15},100));assert(!S.eligible(f,d,10));
}
const ctx=vm.createContext({L:130,R:1370,DX:100,bedHeight:()=>96,dcClamp:(v,a,b)=>Math.max(a,Math.min(b,v))});
vm.runInContext(fs.readFileSync(pub+'/decor.js','utf8').match(/function constrainDecor\(o\)\{[^\n]+/)[0],ctx);
ctx.input={type:'B08_v01',x:800,y:698-96-32.5,width:210};const placed=vm.runInContext('constrainDecor(input)',ctx);assert.equal(placed.depth,.5);assert.equal(placed.y,569.5);
console.log('PASS habitat: 72,000 motion steps across floor heights/depths; both shelters/flips complete entry-rest-turn-exit; occupancy, removal, movement, dry/small openings and floor anchoring.');
