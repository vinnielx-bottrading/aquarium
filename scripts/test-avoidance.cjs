const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
global.FishMotion=require('../public/motion.js');global.FishAvoid=require('../public/avoidance.js');global.Shelter=require('../public/shelter.js');const Feeding=require('../public/feeding.js');
const items=vm.runInNewContext(fs.readFileSync(__dirname+'/../public/decor-data.js','utf8')+';DECOR_ITEMS');
let seed=17;const r=()=>((seed=(1664525*seed+1013904223)>>>0)/4294967296);
const make=(x=300,y=500)=>{const f={id:1,species:'blue',x,size:150,depth:.3,lane:.5,dir:1,phase:0};FishMotion.init(f,100,r,24);f.y=y;return f};
const obstacle=(type,x=800,width=220,id=1)=>({id,type,x,y:650,width});
for(const type of ['B04_01_v01','B07_v01','B13_v01','E07_v01']){
 FishAvoid.configure([obstacle(type,800,125)],items);const f=make(),b=FishMotion.bounds(f,100,24),ob=FishAvoid.boxes(f),goal={x:1200,y:500};const path=FishAvoid.plan(f,goal,b,ob);assert(path.length>1,type+' detour');let prev=f;for(const p of path){assert(FishAvoid.clear(prev,p,ob));prev=p}assert(Math.hypot(prev.x-goal.x,prev.y-goal.y)<1);
 for(let i=0;i<2200;i++){FishAvoid.prepare(f,.04,100,24);f.tx=1200;f.ty=500;f.timer=100;f.behavior='cruise';f.pace=55;const before={x:f.x,y:f.y};FishMotion.update(f,.04,100,r,24);assert(FishAvoid.clear(before,f,ob),type+' swept collision');assert(FishAvoid.valid(f,b,ob))}assert(f.x>1150,type+' reaches far side');
}
// Low water and packed layouts: never tunnel through an unreachable wall.
for(const level of [60,80,100])for(const height of [24,96]){
 FishAvoid.configure([obstacle('B04_01_v01',800,700)],items);const f=make(300,400);FishAvoid.prepare(f,.04,level,height);const ob=FishAvoid.boxes(f),b=FishMotion.bounds(f,level,height);
 for(let i=0;i<1000;i++){FishAvoid.prepare(f,.04,level,height);if(f.obstructed)continue;const before={x:f.x,y:f.y};FishMotion.update(f,.04,level,r,height);assert(FishAvoid.clear(before,f,ob));assert(FishAvoid.valid(f,b,ob))}
}
// Move a solid on top of a fish: relocate once, then continue from free water.
let f=make(800,500);FishAvoid.configure([obstacle('E07_v01')],items);assert(FishAvoid.prepare(f,.04,100,24));assert(FishAvoid.valid(f,FishMotion.bounds(f,100,24),FishAvoid.boxes(f)));
// Both cave orientations and both species, full lifecycle with navigation enabled.
for(const flip of [false,true])for(const size of [150,180]){
 const cave={...obstacle('B08_SIDE_v01',800,600),flip,depth:.3};FishAvoid.configure([cave],items);f=make(flip?350:1200,400);f.size=size;const d=Shelter.describe(cave,items.find(i=>i.id===cave.type),24);assert(Shelter.eligible(f,d,100));Shelter.start(f,d);const modes=new Set();let ended=false;
 for(let i=0;i<4000;i++){FishAvoid.prepare(f,.02,100,24);const prev={x:f.x,y:f.y},seeking=f.shelter?.mode==='seeking';Shelter.update(f,.02,[d],[f],100,24,r);if(seeking&&f.shelter?.mode==='seeking')assert(FishAvoid.clear(prev,f,FishAvoid.boxes(f)));if(!f.shelter){ended=true;break}modes.add(f.shelter.mode)}assert(ended);for(const m of ['entering','resting','turning','exiting'])assert(modes.has(m),JSON.stringify({flip,size,m,modes:[...modes],x:f.x,y:f.y}));
 // A filter blocks the entrance/interior: shelter must not start.
 FishAvoid.configure([cave,obstacle('E07_v01',d.mouth.x,115,2)],items);assert(!Shelter.eligible(f,d,100));
}
FishAvoid.configure([obstacle('E07_v01',800,115)],items);f=make(500,500);const food=Feeding.create();food.pellets=[{id:1,x:1080,y:450,depth:.3,age:0,speed:0,seed:0,r:3}];
for(let i=0;i<1500&&food.eaten===0;i++){FishAvoid.prepare(f,.02,100,24);Feeding.tick(food,[f],.02,100,24);const prev={x:f.x,y:f.y};if(!Feeding.steer(food,f,.02,100,24))FishMotion.update(f,.02,100,r,24);assert(FishAvoid.clear(prev,f,FishAvoid.boxes(f)))}assert.equal(food.eaten,1,'eat after detour');
const crowded=Array.from({length:24},(_,i)=>obstacle(i%2?'B07_v01':'E07_v01',250+i*43,100,i));FishAvoid.configure(crowded,items);const start=performance.now();let steps=0;for(let n=0;n<12;n++){f=make(250+n*80,350);for(let i=0;i<500;i++){if(!FishAvoid.prepare(f,.04,100,24))continue;const before={x:f.x,y:f.y};FishMotion.update(f,.04,100,r,24);assert(FishAvoid.clear(before,f,FishAvoid.boxes(f)));steps++}}console.log('PASS avoidance: body/swept clearance, detour arrival, low water, thick floor, placement recovery, two cave flips/species, blocked doorway, feeding detour, 24 objects/12 fish:',steps,'steps in',Math.round(performance.now()-start),'ms');
