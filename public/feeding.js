/* E02: procedural particles, exclusive targets, bounded movement. */
const Feeding=(()=>{
 const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
 const create=()=>({pellets:[],next:0,cooldown:0,eaten:0});
 function drop(s,all,level,r=Math.random){
  if(!all.length||level<40||s.cooldown>0||s.pellets.length>24)return false;
  const center=400+r()*800;
  for(let i=0;i<8;i++)s.pellets.push({id:s.next++,x:center+(r()-.5)*190,y:700-level*4.2+5+r()*8,depth:.2+r()*.6,age:0,speed:8+r()*4,seed:r()*6.28,r:2.7+r()*1.4});
  s.cooldown=4;return true;
 }
 function clear(s,all){s.pellets=[];s.cooldown=0;for(const f of all){f.foodTarget=null;f.timer=0}}
 function tick(s,all,dt,level,height){
  s.cooldown=Math.max(0,s.cooldown-dt);
  for(const p of s.pellets){p.age+=dt;p.y+=p.speed*dt;p.x=clamp(p.x+Math.sin(p.age*1.5+p.seed)*dt*3,260,1250)}
  s.pellets=s.pellets.filter(p=>p.age<32&&p.y<700-height-65*p.depth-5&&p.y>=700-level*4.2&&level>=2);
  const reserved=new Set();
  for(const f of all){f.eatCooldown=Math.max(0,(f.eatCooldown||0)-dt);const current=s.pellets.find(p=>p.id===f.foodTarget);if(!current||reserved.has(current.id)||f.eatCooldown>0){if(f.foodTarget!=null)f.timer=0;f.foodTarget=null}else reserved.add(current.id)}
  for(const f of all){
   if(f.eatCooldown>0)continue;const b=FishMotion.bounds(f,level,height);
   const reachable=p=>p.y>=b.top-5&&p.y<=b.bottom+5&&p.x>=b.left+f.size*.3&&p.x<=b.right-f.size*.3;
   let p=s.pellets.find(p=>p.id===f.foodTarget);
   if(p&&!reachable(p)){reserved.delete(p.id);f.foodTarget=null;p=null;f.timer=0}
   if(!p){p=s.pellets.filter(p=>!reserved.has(p.id)&&reachable(p)&&Math.hypot(p.x-f.x,p.y-f.y)<650).sort((a,b)=>Math.hypot(a.x-f.x,a.y-f.y)-Math.hypot(b.x-f.x,b.y-f.y))[0];if(p){f.foodTarget=p.id;reserved.add(p.id)}}
   if(p&&f.shelter){if(f.shelter.mode==='seeking')Shelter.release(f,level,height,()=>.5);else if(f.shelter.mode==='resting')f.shelter.rest=0}
  }
 }
 function steer(s,f,dt,level,height){
  const p=s.pellets.find(p=>p.id===f.foodTarget);if(!p||f.shelter)return false;
  const b=FishMotion.bounds(f,level,height);f.swimClock+=dt*.9;f.vx=f.vy=0;f.pitch*=Math.exp(-dt*5);
  if(f.turn>0){f.turn=Math.max(0,f.turn-dt/.85);if(!f.turn)f.dir*=-1;return true}
  const dx=p.x-f.x;if(Math.abs(dx)>f.size*.18&&Math.sign(dx)!==f.dir){f.turn=1;return true}
  const tx=clamp(p.x-f.dir*f.size*.29,b.left,b.right),ty=clamp(p.y,b.top,b.bottom),vx=tx-f.x,vy=ty-f.y,dist=Math.hypot(vx,vy),q=Math.min(1,90*dt/(dist||1));
  f.x=clamp(f.x+vx*q,b.left,b.right);f.y=clamp(f.y+vy*q,b.top,b.bottom);
  if(Math.hypot(p.x-(f.x+f.dir*f.size*.29),p.y-f.y)<10){s.pellets=s.pellets.filter(a=>a.id!==p.id);s.eaten++;f.foodTarget=null;f.eatCooldown=3;f.shelterCooldown=12;f.timer=0;f.bites=(f.bites||0)+1}
  return true;
 }
 return{create,drop,clear,tick,steer};
})();
if(typeof module!=='undefined')module.exports=Feeding;
