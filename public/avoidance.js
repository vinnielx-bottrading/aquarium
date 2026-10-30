/* Conservative 2D body clearance, visibility-graph routes and swept movement. */
const FishAvoid=(()=>{
 let solids=[],revision=0,key='';
 const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
 function configure(objects,items){const next=objects.filter(o=>['rock','wood','pot','equipment'].includes(items.find(i=>i.id===o.type)?.category)).map(o=>{const s=items.find(i=>i.id===o.type),h=Math.min(o.width*s.ratio,270);return {id:o.id,l:o.x-o.width/2,r:o.x+o.width/2,t:o.y-h,b:o.y}});const k=JSON.stringify(next);if(k!==key){solids=next;key=k;revision++}}
 function boxes(f,ignore){return solids.filter(o=>o.id!==ignore).map(o=>({id:o.id,l:o.l-f.size*.58-6,r:o.r+f.size*.58+6,t:o.t-f.size*.44-6,b:o.b+f.size*.44+6}))}
 const inside=(p,o)=>p.x>o.l&&p.x<o.r&&p.y>o.t&&p.y<o.b;
 function intersects(a,b,o){let low=0,high=1;for(const [v,d,min,max] of [[a.x,b.x-a.x,o.l,o.r],[a.y,b.y-a.y,o.t,o.b]]){if(Math.abs(d)<1e-9){if(v<=min||v>=max)return false}else{const p=(min-v)/d,q=(max-v)/d;low=Math.max(low,Math.min(p,q));high=Math.min(high,Math.max(p,q));if(low>=high)return false}}return high>0&&low<1}
 const clear=(a,b,ob)=>!ob.some(o=>intersects(a,b,o));
 const valid=(p,b,ob)=>p.x>=b.left&&p.x<=b.right&&p.y>=b.top&&p.y<=b.bottom&&!ob.some(o=>inside(p,o));
 function nodes(b,ob){const out=[{x:b.left,y:b.top},{x:b.right,y:b.top},{x:b.left,y:b.bottom},{x:b.right,y:b.bottom}];for(const o of ob)for(const x of [o.l-2,o.r+2])for(const y of [o.t-2,o.b+2])out.push({x:clamp(x,b.left,b.right),y:clamp(y,b.top,b.bottom)});return out.filter(p=>valid(p,b,ob))}
 function plan(start,goal,b,ob){goal={x:clamp(goal.x,b.left,b.right),y:clamp(goal.y,b.top,b.bottom)};if(valid(goal,b,ob)&&clear(start,goal,ob))return [goal];
  const all=[start,...nodes(b,ob)];if(valid(goal,b,ob))all.push(goal);const costs=all.map(()=>Infinity),prev=all.map(()=>-1),done=new Set();costs[0]=0;
  while(done.size<all.length){let u=-1;for(let i=0;i<all.length;i++)if(!done.has(i)&&(u<0||costs[i]<costs[u]))u=i;if(u<0||!Number.isFinite(costs[u]))break;done.add(u);for(let v=1;v<all.length;v++)if(!done.has(v)&&clear(all[u],all[v],ob)){const c=costs[u]+dist(all[u],all[v]);if(c<costs[v]){costs[v]=c;prev[v]=u}}}
  let end=0;for(const i of done)if(dist(all[i],goal)<dist(all[end],goal)-.01)end=i;
  const path=[];for(let i=end;i>0;i=prev[i])path.unshift(all[i]);return path;
 }
 function target(f,goal,level,height){const b=FishMotion.bounds(f,level,height),ob=boxes(f),k=[revision,b.top,b.bottom,f.size].join(':');let n=f.nav;
  if(!n||n.key!==k||dist(n.goal,goal)>24||n.ttl<=0){n=f.nav={key:k,goal:{...goal},ttl:.65,path:plan(f,goal,b,ob)}}
  while(n.path.length&&dist(f,n.path[0])<.1)n.path.shift();
  while(n.path.length>1&&clear(f,n.path[1],ob))n.path.shift();
  return n.path[0]||{x:f.x,y:f.y};
 }
 function move(f,p,level,height,ignore){const b=FishMotion.bounds(f,level,height),ob=boxes(f,ignore),next={x:clamp(p.x,b.left,b.right),y:clamp(p.y,b.top,b.bottom)};if(clear(f,next,ob)&&valid(next,b,ob)){f.x=next.x;f.y=next.y;return true}f.vx=f.vy=0;f.nav=null;return false}
 function prepare(f,dt,level,height){if(f.nav)f.nav.ttl-=dt;if(f.shelter&&f.shelter.mode!=='seeking')return true;const b=FishMotion.bounds(f,level,height),ob=boxes(f);if(valid(f,b,ob)){f.obstructed=false;return true}
  // Only placement, resizing, a floor/water change or a new fish can invalidate a safe position.
  const options=nodes(b,ob).sort((a,c)=>dist(a,f)-dist(c,f));if(!options.length){f.obstructed=true;return false}f.x=options[0].x;f.y=options[0].y;f.vx=f.vy=0;f.timer=0;f.nav=null;f.obstructed=false;return true;
 }
 function foodReachable(f,p,level,height){const b=FishMotion.bounds(f,level,height),ob=boxes(f);return [-1,1].some(dir=>valid({x:p.x-dir*f.size*.29,y:p.y},b,ob))}
 function pelletClear(p){return !solids.some(o=>inside(p,o))}
 function corridor(f,d){const start={x:d.mouth.x-d.flip*(d.w*.10+f.size*.62+8),y:d.mouth.y};return clear(start,d.inside,boxes(f,d.id))}
 return {configure,boxes,inside,intersects,clear,valid,nodes,plan,target,move,prepare,foodReachable,pelletClear,corridor};
})();
if(typeof module!=='undefined')module.exports=FishAvoid;
