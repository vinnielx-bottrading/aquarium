const assert=require('node:assert/strict'),P=require('../public/plant-motion.js');
const o={id:124.4,x:600,y:650,width:120,depth:.4},s={id:'B10_01_v01',category:'plant'},h=240;
const env={enabled:true,level:100,surface:280,waves:.35,outlets:[]};
const rms=e=>Math.sqrt(Array.from({length:300},(_,i)=>P.offset(o,s,h,1,i*.05,e)**2).reduce((a,b)=>a+b,0)/300);
for(let t=0;t<15;t+=.11){assert.equal(P.offset(o,s,h,0,t,env),0);assert.equal(P.offset(o,s,h,.08,t,env),0);assert.equal(P.offset(o,s,h,.8,t,{...env,level:0}),0);assert.equal(P.offset(o,s,h,.8,t,{...env,enabled:false}),0);assert.equal(P.offset(o,s,h,1,t,{...env,surface:600}),0);assert.equal(P.offset(o,{id:'B04',category:'rock'},h,1,t,env),0);assert(Math.abs(P.offset(o,s,h,1,t,env))<8);}
assert(rms(env)>.1);assert.notEqual(P.phase(124.4),P.phase(124.5));
const near={x:700,y:410,dir:-1};assert(rms({...env,outlets:[near]})>rms(env)*1.5);
assert(P.flow(600,410,[near],280).strength>P.flow(300,410,[near],280).strength);
assert.equal(P.flow(720,410,[near],280).strength,0);assert.equal(P.flow(600,410,[{...near,y:200}],280).strength,0);
assert.equal(P.outlet({x:800,y:650,width:100}).dir,-1);assert.equal(P.outlet({x:800,y:650,width:100,flip:true}).dir,1);
for(let t=0;t<20;t+=.2){const b=P.bands(o,s,h,t,env);assert.equal(b.at(-1).x1,0);for(let i=1;i<b.length;i++)assert.equal(b[i-1].x1,b[i].x0);const moss={id:'B12_v01',category:'plant'};assert.equal(P.offset(o,moss,60,.3,t,env),0);assert(Math.abs(P.offset(o,moss,60,1,t,env))<1.3);assert.deepEqual(b,P.bands(o,s,h,t,env));}
console.log('PASS: plants anchored, phase variation, wet/dry, pause clock determinism, moss amplitude, connected strips, filter direction, distance and underwater outlet.');
