const FishMotion=(()=>{
 const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function bounds(f,level,height=0){const bottom=700-height-65*(f.depth||0)-f.size*.32-14;return {left:130+f.size*.58+18,right:1370-f.size*.58-18,top:Math.min(bottom,700-420*level/100+f.size*.32+14),bottom}}

 function init(f,level,r=Math.random,height=0){const b=bounds(f,level,height);f.y=b.top+(b.bottom-b.top)*f.lane;f.vx=0;f.vy=0;f.pitch=0;f.swimClock=r()*10;f.behavior='cruise';f.timer=0;f.cooldown=0;f.energy=.75+r()*.5;f.tx=f.x;f.ty=f.y}
 function choose(f,b,r){const q=r();f.behavior=q<.23?'rest':q<.42?'rise':q<.60?'dive':q<.71?'dart':'cruise';f.timer=f.behavior==='rest'?1+r()*3:3+r()*6;f.tx=clamp(f.x+(r()-.5)*850,b.left,b.right);f.ty=b.top+r()*(b.bottom-b.top);if(f.behavior==='rise')f.ty=b.top+8+r()*(b.bottom-b.top)*.2;if(f.behavior==='dive')f.ty=b.bottom-8-r()*(b.bottom-b.top)*.2;if(f.behavior==='rest'){f.tx=f.x;f.ty=f.y}f.pace=(f.behavior==='dart'?65:22+r()*27)*f.energy}
 function update(f,dt,level,r=Math.random,height=0){const b=bounds(f,level,height);if(!Number.isFinite(f.y))init(f,level,r);f.x=clamp(f.x,b.left,b.right);f.y=clamp(f.y,b.top,b.bottom);f.timer-=dt;f.cooldown=Math.max(0,f.cooldown-dt);f.tx=clamp(f.tx,b.left,b.right);f.ty=clamp(f.ty,b.top,b.bottom);
 if(f.turn>0){f.turn=Math.max(0,f.turn-dt/.85);f.vx*=Math.exp(-dt*9);f.vy*=Math.exp(-dt*9);if(f.turn===0){f.dir*=-1;f.cooldown=1.5}f.swimClock+=dt*.35;return}
 if(f.timer<=0||f.behavior!=='rest'&&Math.hypot(f.tx-f.x,f.ty-f.y)<18)choose(f,b,r);
 const goal=typeof FishAvoid!=='undefined'?FishAvoid.target(f,{x:f.tx,y:f.ty},level,height):{x:f.tx,y:f.ty};
 const dx=goal.x-f.x,dy=goal.y-f.y,dist=Math.hypot(dx,dy)||1;const desired=dx>0?1:-1;
 if(f.behavior!=='rest'&&Math.abs(dx)>35&&desired!==f.dir&&f.cooldown===0){f.turn=1;return}
 let vx=f.behavior==='rest'?0:dx/dist*f.pace,vy=f.behavior==='rest'?0:dy/dist*f.pace*.65;
 const easing=1-Math.exp(-dt*1.8);f.vx+=(vx-f.vx)*easing;f.vy+=(vy-f.vy)*easing;
 const next={x:clamp(f.x+f.vx*dt,b.left,b.right),y:clamp(f.y+f.vy*dt,b.top,b.bottom)};if(typeof FishAvoid!=='undefined')FishAvoid.move(f,next,level,height);else{f.x=next.x;f.y=next.y}
 f.pitch+=(clamp(f.vy/(Math.abs(f.vx)+25),-.23,.23)*f.dir-f.pitch)*(1-Math.exp(-dt*3));
 f.swimClock+=dt*(f.behavior==='rest'?.25:clamp(Math.hypot(f.vx,f.vy)/32,.45,1.8));
 }
 return {bounds,init,update,choose};
})();
if(typeof module!=='undefined')module.exports=FishMotion;
