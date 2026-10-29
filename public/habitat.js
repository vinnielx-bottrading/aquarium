function bedHeight(){return state.bed==='none'?0:state.bedHeight}
function minimumWater(){return fish.length?Math.max(40,...fish.map(f=>Math.ceil((bedHeight()+65*f.depth+f.size*.64+28)/4.2))):0}
function ensureWater(){const min=minimumWater();state.level=Math.max(state.level,min);state.target=Math.max(state.target,min);$('water').min=min}
function floorY(depth=0){return B-bedHeight()+DY*depth}
function drawSubstrate(){
 const h=bedHeight();if(!h)return;const im=imgs[state.bed],sand=state.bed==='sand',color=sand?'#cfb97f':'#8b8272';
 poly([[L,B-h],[L+DX,B+DY-h],[R+DX,B+DY-h],[R,B-h]],color);
 if(im.complete&&im.naturalWidth){g.save();g.transform(1,0,DX/DY,1,L+DX,B+DY-h);g.drawImage(im,350,330,1400,100,0,0,R-L,-DY);g.restore()}
 poly([[L,B-h],[R,B-h],[R,B],[L,B]],color);
 if(im.complete&&im.naturalWidth){g.save();g.globalAlpha=.8;g.drawImage(im,350,390,1400,70,L,B-h,R-L,h);g.restore()}
 poly([[L,B-h],[R,B-h],[R,B],[L,B]],gradient(0,B-h,0,B,[[0,'rgba(35,27,12,.04)'],[1,'rgba(35,27,12,.35)']]));
 poly([[R,B-h],[R+DX,B+DY-h],[R+DX,B+DY],[R,B]],sand?'#9b885d':'#625e53');
}
function bedUI(){
 $('bedHeight').value=bedHeight();$('bedLevel').textContent=Math.round(bedHeight()/12)+' / 8';$('lessBed').disabled=bedHeight()===0;
 $('addSand').disabled=state.bed==='sand'&&bedHeight()>=96;$('addGravel').disabled=state.bed==='gravel'&&bedHeight()>=96;
 document.querySelectorAll('[data-bed]').forEach(b=>b.classList.toggle('active',b.dataset.bed===state.bed));
}
function changeBed(kind,height){
 decorSnapshot();evictShelter();const before=bedHeight();state.bedHeight=Math.max(0,Math.min(96,height));state.bed=state.bedHeight?kind:'none';
 const delta=bedHeight()-before;decorations.forEach(o=>{o.y-=delta;constrainDecor(o)});
 ensureWater();for(const f of fish){const b=FishMotion.bounds(f,state.level,bedHeight());f.y=Math.min(f.y,b.bottom);f.ty=Math.min(f.ty,b.bottom)}
 updateFishUI();saveDecor();bedUI();
}
