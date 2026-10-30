/* Anchored sprite bending. Pure geometry is shared by renderer and tests. */
const PlantMotion={
 clamp(v,a,b){return Math.max(a,Math.min(b,v))},
 phase(id){let h=2166136261;for(const c of String(id))h=Math.imul(h^c.charCodeAt(0),16777619);return (h>>>0)/4294967296*Math.PI*2},
 outlet(o){const h=Math.min(o.width*1.861963190184049,270),dir=o.flip?1:-1;return {x:o.x+dir*o.width*.45,y:o.y-h*.75,dir}},
 flow(x,y,outlets,surface){let strength=0,direction=0;for(const p of outlets){if(p.y<surface+6)continue;const ahead=(x-p.x)*p.dir;if(ahead<0||ahead>440)continue;const spread=42+ahead*.32;const v=Math.exp(-ahead/250)*Math.exp(-(((y-p.y)/spread)**2));strength+=v;direction+=p.dir*v}return {strength:Math.min(1.5,strength),direction:Math.max(-1.5,Math.min(1.5,direction))}},
 offset(o,spec,h,u,time,env){
  if(!env.enabled||env.level<=.1||spec.category!=='plant')return 0;
  const moss=spec.id==='B12_v01',grass=spec.id==='B11_v01';
  // Bottom section remains fixed, including the attachment edge of moss.
  const flex=Math.max(0,(u-(moss?.38:.1))/(moss?.62:.9))**2;
  const y=o.y-h*u,waterline=env.surface-65*(o.depth||0);
  // Dry portions and the waterline itself do not oscillate.
  const wet=this.clamp((y-waterline)/16,0,1);
  if(!flex||!wet)return 0;
  const flow=this.flow(o.x,y,env.outlets,env.surface),phase=this.phase(o.id);
  const amp=moss?Math.min(1.3,h*.022):grass?Math.min(2.8,h*.05):Math.min(8,h*.035);
  const wave=.72*Math.sin(time*(moss?1.65:1.12)+phase+u*.8)+.28*Math.sin(time*.63+phase*1.7-u*.6);
  return amp*flex*wet*((.48+env.waves*.25+flow.strength*.72)*wave+flow.direction*.45);
 },
 bands(o,spec,h,time,env){const count=18,out=[];for(let i=0;i<count;i++){const v0=i/count,v1=(i+1)/count;out.push({v0,v1,x0:this.offset(o,spec,h,1-v0,time,env),x1:this.offset(o,spec,h,1-v1,time,env)})}return out}
};
if(typeof module!=='undefined')module.exports=PlantMotion;
