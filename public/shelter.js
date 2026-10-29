/* Pure lifecycle; normalized door polygons split the unchanged PNG into layers. */
const Shelter=(()=>{
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),mix=(a,b,t)=>a+(b-a)*t;
 function describe(o,spec,height){
  if(o.type!=='B08_SIDE_v01')return null;const w=o.width,h=Math.min(w*spec.ratio,270),flip=o.flip?-1:1;
  const map=([x,y])=>({x:o.x+(x-.5)*w*flip,y:o.y-h+y*h});
  return {id:o.id,signature:[o.x,o.y,o.width,o.flip,height].join(','),depth:o.depth,mouth:map([.10,.65]),inside:map([.60,.65]),points:[[.035,.38],[.09,.30],[.145,.43],[.16,.79],[.11,.91],[.035,.88]].map(map),w,h,flip,height,top:o.y-h,floor:700-height-65*o.depth,capacity:h*.70};
 }
 function entry(f,d){return {x:d.mouth.x-d.flip*(f.size*.56+8),y:d.mouth.y}}
 function eligible(f,d,level){if(!d)return false;const e=entry(f,d),b=FishMotion.bounds(f,level,d.height),route=(f.x-e.x)*d.flip>0;
  return d.capacity>=f.size*.625&&d.w*.36>f.size*.5&&d.mouth.y-f.size*.32>700-420*level/100+8&&d.mouth.y+f.size*.32<d.floor-2&&e.x>=b.left&&e.x<=b.right&&(!route||f.shelter?.id===d.id||d.top-f.size*.32-20>=b.top)}
 function start(f,d){const e=entry(f,d),routeY=d.top-f.size*.32-20,needsRoute=(f.x-e.x)*d.flip>0;
  f.shelter={id:d.id,signature:d.signature,mode:'seeking',age:0,side:d.flip,entry:e,mouth:d.mouth,route:needsRoute?[{x:f.x,y:routeY},{x:e.x,y:routeY},e]:[e]};f.renderScale=1;f.shelterShade=1;f.turn=0;f.vx=f.vy=0;return f.shelter}
 function release(f,level,height,r=Math.random){const s=f.shelter;if(s){if(s.mode!=='seeking'){f.x=s.entry.x;f.y=s.entry.y;}if(Number.isFinite(s.originalDepth))f.depth=s.originalDepth}f.shelter=null;f.shelterCooldown=18+r()*25;f.renderScale=1;f.shelterShade=1;f.turn=0;f.vx=f.vy=0;f.timer=0;f.pitch=0;const b=FishMotion.bounds(f,level,height);f.x=clamp(f.x,b.left,b.right);f.y=clamp(f.y,b.top,b.bottom)}
 function update(f,dt,doors,all,level,height,r=Math.random){
  if(!Number.isFinite(f.shelterCooldown))f.shelterCooldown=8+r()*18;
  if(!f.shelter){if(f.foodTarget!=null)return false;f.shelterCooldown-=dt;if(f.shelterCooldown<=0&&r()<dt*.05){const options=doors.filter(d=>eligible(f,d,level)&&!all.some(other=>other.shelter?.id===d.id));if(options.length)start(f,options[Math.floor(r()*options.length)]);}if(!f.shelter)return false}
  const s=f.shelter,d=doors.find(d=>d.id===s.id);if(!d||d.signature!==s.signature||!eligible(f,d,level)){release(f,level,height,r);return false}
  s.age+=dt;f.swimClock+=dt*(s.mode==='resting'?.16:.5);f.pitch*=Math.exp(-dt*4);f.vx=f.vy=0;
  if(s.mode==='seeking'){
   const target=s.route[0]||s.entry,dx=target.x-f.x,dy=target.y-f.y,dist=Math.hypot(dx,dy);
   if(f.turn>0){f.turn=Math.max(0,f.turn-dt/.85);if(!f.turn)f.dir*=-1;return true}
   const direction=dx>=0?1:-1;if(Math.abs(dx)>10&&f.dir!==direction){f.turn=1;return true}
   if(dist<3&&s.route.length>1){s.route.shift();return true}
   if(dist<3){if(f.dir!==s.side){f.turn=1;return true}s.mode='entering';s.age=0;s.from={x:f.x,y:f.y};s.originalDepth=f.depth;f.depth=d.depth;}
   else{const q=Math.min(1,55*dt/dist);f.x+=dx*q;f.y+=dy*q}if(s.age>60)release(f,level,height,r);
  }else if(s.mode==='entering'){
   const q=clamp(s.age/3.5,0,1),e=q*q*(3-2*q);f.dir=s.side;f.x=mix(s.from.x,d.inside.x,e);f.y=mix(s.from.y,d.mouth.y,e);f.renderScale=1;f.shelterShade=1;
   if(q===1){s.mode='resting';s.age=0;s.rest=5+r()*8;s.inside={x:f.x,y:f.y}}
  }else if(s.mode==='resting'){if(s.age>=s.rest){s.mode='turning';s.age=0;f.turn=1}
  }else if(s.mode==='turning'){f.turn=Math.max(0,1-s.age/.85);if(f.turn===0){f.dir=-s.side;s.mode='exiting';s.age=0}
  }else if(s.mode==='exiting'){
   const q=clamp(s.age/3.5,0,1),e=q*q*(3-2*q);f.x=mix(s.inside.x,s.entry.x,e);f.y=mix(s.inside.y,s.entry.y,e);f.renderScale=1;f.shelterShade=1;
   if(q===1){f.depth=s.originalDepth;release(f,level,height,r)}
  }return !!f.shelter;
 }
 return {describe,eligible,start,release,update};
})();
if(typeof module!=='undefined')module.exports=Shelter;
