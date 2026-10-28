const Animation={
 swimFrame(species,time,phase=0){const sequence=species==='gold'?[0,1,2,3,4,5,4,3,2,1]:[0,1,2,3,4,5,6,7,6,5,4,3,2,1];return sequence[Math.floor(Math.max(0,time*10+phase*3))%sequence.length]},
 turnFrame(remaining){return Math.min(5,Math.max(0,Math.floor((1-remaining)*6)))}
};
if(typeof module!=='undefined')module.exports=Animation;
