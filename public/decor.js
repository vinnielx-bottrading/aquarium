let decorations=[],selectedDecor=null,placing=null,dragging=null,decorHistory=[];
const decorImages={};for(const item of DECOR_ITEMS){const im=new Image();im.src=item.src;decorImages[item.id]=im}
const dcClamp=(v,a,b)=>Math.max(a,Math.min(b,v));
function constrainDecor(o){const front=698-bedHeight();o.y=dcClamp(o.y,o.type==='B12_v01'?430-bedHeight():front-65,front);const depth=o.type==='B12_v01'?0:(front-o.y)/65;o.x=dcClamp(o.x,L+depth*DX+o.width/2+8,R+depth*DX-o.width/2-8);o.depth=depth;return o}
function decorSnapshot(){decorHistory.push(JSON.stringify({items:decorations,bed:state.bed,bedHeight:state.bedHeight}));if(decorHistory.length>30)decorHistory.shift()}
function layoutFits(level=state.level){FishAvoid.configure(decorations,DECOR_ITEMS);return fish.every(f=>{const b=FishMotion.bounds(f,level,bedHeight()),ob=FishAvoid.boxes(f);return FishAvoid.valid(f,b,ob)||FishAvoid.nodes(b,ob).length>0})}
function saveDecor(){if(!layoutFits()&&decorHistory.length){const old=JSON.parse(decorHistory.pop());decorations=old.items;state.bed=old.bed;state.bedHeight=old.bedHeight;selectedDecor=null;layoutFits();notify('Không đủ chỗ cho cá. Đã giữ bố cục trước đó.')}FishAvoid.configure(decorations,DECOR_ITEMS);for(const f of fish)FishAvoid.prepare(f,0,state.level,bedHeight());try{localStorage.setItem('aquarium-layout-v12',JSON.stringify({items:decorations,bed:state.bed,bedHeight:state.bedHeight,version:17}));$('decorHint').textContent='Đã lưu bố cục trên trình duyệt này.'}catch{$('decorHint').textContent='Không lưu được; bố cục chỉ giữ trong phiên này.'}decorUI();bedUI()}
function decorUI(){$('decorCount').textContent=decorations.length+' / 24 vật';const o=decorations.find(o=>o.id===selectedDecor);$('removeDecor').disabled=!o;$('flipDecor').disabled=!o;$('decorSize').disabled=!o;$('undoDecor').disabled=!decorHistory.length;if(o)$('decorSize').value=o.width;c.classList.toggle('decorating',!!placing||!$('trayBody').hidden);document.querySelectorAll('.decor-card').forEach(b=>b.classList.toggle('active',b.dataset.item===placing))}
function addDecor(type,x,y){if(decorations.length>=24){notify('Tối đa 24 vật trang trí.');return}const item=DECOR_ITEMS.find(i=>i.id===type);if(!item)return;decorSnapshot();const o=constrainDecor({id:Date.now()+Math.random(),type,x,y,width:item.width});decorations.push(o);selectedDecor=o.id;placing=null;saveDecor()}
function drawDecor(o,selection=true){const im=decorImages[o.type],spec=DECOR_ITEMS.find(i=>i.id===o.type);if(!im.complete||!im.naturalWidth)return;const h=Math.min(o.width*spec.ratio,270);g.save();g.globalAlpha=1;if(state.night&&scene!=='forest')g.filter="brightness(.68)";g.translate(o.x,o.y);g.scale(o.flip?-1:1,1);if(spec.category==='plant'&&state.plantMotion){drawPlant(im,o,spec,h)}else if(spec.crop)g.drawImage(im,...spec.crop,-o.width/2,-h,o.width,h);else g.drawImage(im,-o.width/2,-h,o.width,h);g.restore();if(selection&&o.id===selectedDecor&&!$('trayBody').hidden){g.save();g.strokeStyle='#a5efbd';g.lineWidth=2;g.setLineDash([5,4]);g.strokeRect(o.x-o.width/2-4,o.y-h-4,o.width+8,h+8);g.restore()}}
function shelterDoors(){return decorations.map(o=>Shelter.describe(o,DECOR_ITEMS.find(i=>i.id===o.type),bedHeight())).filter(Boolean)}
function updateShelter(f,dt){return Shelter.update(f,dt,shelterDoors(),fish,state.level,bedHeight())}
function evictShelter(id){for(const f of fish)if(f.shelter&&(id===undefined||f.shelter.id===id))Shelter.release(f,state.level,bedHeight())}
function drawShelter(o,residents){
 drawDecor(o,false);for(const f of residents)drawFish([f]);const door=shelterDoors().find(d=>d.id===o.id);
 g.save();g.beginPath();g.rect(0,0,1600,900);door.points.forEach((p,i)=>i?g.lineTo(p.x,p.y):g.moveTo(p.x,p.y));g.closePath();g.clip('evenodd');drawDecor(o,false);g.restore();
 if(o.id===selectedDecor&&!$('trayBody').hidden){const h=Math.min(o.width*DECOR_ITEMS.find(i=>i.id===o.type).ratio,270);g.save();g.strokeStyle='#a5efbd';g.setLineDash([5,4]);g.strokeRect(o.x-o.width/2,o.y-h,o.width,h);g.restore()}
}
function drawDecorWorld(){
 plantOutlets=state.filterPower?decorations.filter(o=>o.type==='E07_v01').map(o=>PlantMotion.outlet(o)):[];
 const grouped=f=>f.shelter&&f.shelter.mode!=='seeking';const all=[...decorations.map(o=>({depth:o.depth,o})),...food.pellets.map(p=>({depth:p.depth,p})),...fish.filter(f=>!grouped(f)).map(f=>({depth:f.depth,f}))].sort((a,b)=>b.depth-a.depth);
 for(const e of all){if(e.o){const residents=fish.filter(f=>grouped(f)&&f.shelter.id===e.o.id);residents.length?drawShelter(e.o,residents):drawDecor(e.o)}else if(e.p)drawFoodPellet(e.p);else drawFish([e.f])}
 const labels={seeking:'đến cửa hang',entering:'chui vào hang',resting:'nghỉ trong hang',turning:'quay đầu trong hang',exiting:'bơi ra khỏi hang'};
 const status=fish.filter(f=>f.shelter).map(f=>(f.species==='blue'?'Ngọc Lam':'Đuôi Nắng')+': '+labels[f.shelter.mode]).join(' · ');if($('shelterStatus').textContent!==status)$('shelterStatus').textContent=status;
}

function point(e){const b=c.getBoundingClientRect(),scale=Math.min(b.width/1600,b.height/900);return{x:(e.clientX-b.left-(b.width-1600*scale)/2)/scale,y:(e.clientY-b.top-(b.height-900*scale)/2)/scale}}
function hit(p){return [...decorations].sort((a,b)=>a.depth-b.depth).find(o=>{const spec=DECOR_ITEMS.find(i=>i.id===o.type),h=Math.min(o.width*spec.ratio,270);return p.x>=o.x-o.width/2&&p.x<=o.x+o.width/2&&p.y>=o.y-h&&p.y<=o.y})}
for(const item of DECOR_ITEMS){const b=document.createElement('button');b.className='decor-card';b.dataset.item=item.id;b.dataset.category=item.category;b.draggable=true;b.innerHTML='<img alt="" src="'+item.src+'">'+item.name;b.onclick=()=>{placing=item.id;selectedDecor=null;decorUI();c.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});notify('Chạm đáy hồ để đặt '+item.name)};b.ondragstart=e=>{e.dataTransfer.setData('text/plain',item.id);e.dataTransfer.effectAllowed='copy';placing=item.id;decorUI()};b.ondragend=()=>{placing=null;decorUI()};$('decorCards').append(b)}
c.addEventListener('dragover',e=>{e.preventDefault();e.dataTransfer.dropEffect='copy'});c.addEventListener('drop',e=>{e.preventDefault();const p=point(e);if(p.x>L&&p.x<R+DX&&p.y>T&&p.y<B+20)addDecor(e.dataTransfer.getData('text/plain'),p.x,p.y)});
c.addEventListener('pointerdown',e=>{const p=point(e);if(placing){if(p.x>L&&p.x<R+DX&&p.y>(placing==='B12_v01'?420-bedHeight():B+DY-bedHeight()-90)&&p.y<B+20)addDecor(placing,p.x,p.y);else notify('Đặt vật gần đáy bên trong hồ.');return}const o=hit(p);if(o&&!$('trayBody').hidden){e.preventDefault();decorSnapshot();evictShelter(o.id);selectedDecor=o.id;dragging={id:o.id,dx:p.x-o.x,dy:p.y-o.y};c.setPointerCapture(e.pointerId);decorUI();return}selectedDecor=null;decorUI();if(state.level>2&&p.x>L+20&&p.x<R-20&&p.y>surface()+DY&&p.y<B)ripples.push({x:p.x,age:0})});
c.addEventListener('pointermove',e=>{if(!dragging)return;const p=point(e),o=decorations.find(o=>o.id===dragging.id);if(o){const old={...o};o.x=p.x-dragging.dx;o.y=p.y-dragging.dy;constrainDecor(o);if(!layoutFits()){Object.assign(o,old);layoutFits()}}});
function endDrag(){if(dragging){dragging=null;saveDecor()}}c.addEventListener('pointerup',endDrag);c.addEventListener('pointercancel',endDrag);
$('decorCategory').onchange=e=>document.querySelectorAll('.decor-card').forEach(b=>b.hidden=e.target.value!=='all'&&b.dataset.category!==e.target.value);
$('flipDecor').onclick=()=>{const o=decorations.find(o=>o.id===selectedDecor);if(o){decorSnapshot();evictShelter(o.id);o.flip=!o.flip;saveDecor()}};
$('removeDecor').onclick=()=>{if(selectedDecor===null)return;decorSnapshot();evictShelter(selectedDecor);decorations=decorations.filter(o=>o.id!==selectedDecor);selectedDecor=null;saveDecor()};
$('undoDecor').onclick=()=>{if(!decorHistory.length)return;evictShelter();const saved=JSON.parse(decorHistory.pop());state.bed=saved.bed;state.bedHeight=saved.bedHeight;decorations=saved.items;selectedDecor=null;ensureWater();saveDecor()};
$('cancelDecor').onclick=()=>{placing=null;selectedDecor=null;decorUI()};
$('decorSize').addEventListener('pointerdown',decorSnapshot);$('decorSize').addEventListener('keydown',e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key))decorSnapshot()});$('decorSize').oninput=e=>{const o=decorations.find(o=>o.id===selectedDecor);if(o){evictShelter(o.id);o.width=Number(e.target.value);constrainDecor(o);saveDecor()}};
document.querySelectorAll('[data-bed]').forEach(b=>b.onclick=()=>changeBed(b.dataset.bed,b.dataset.bed==='none'?0:bedHeight()||24));
$('addSand').onclick=()=>changeBed('sand',bedHeight()+12);$('addGravel').onclick=()=>changeBed('gravel',bedHeight()+12);$('lessBed').onclick=()=>changeBed(state.bed,bedHeight()-12);$('bedHeight').oninput=e=>changeBed(state.bed==='none'?'sand':state.bed,+e.target.value);
const originalReset=$('reset').onclick;$('reset').onclick=()=>{decorSnapshot();decorations=[];selectedDecor=null;placing=null;originalReset();saveDecor()};
try{const saved=JSON.parse(localStorage.getItem('aquarium-layout-v12')||'null');if(saved&&Array.isArray(saved.items)){
 if(['sand','gravel','none'].includes(saved.bed))state.bed=saved.bed;
 state.bedHeight=Number.isFinite(saved.bedHeight)?dcClamp(saved.bedHeight,0,96):24;
 decorations=saved.items.filter(o=>DECOR_ITEMS.some(i=>i.id===o.type)&&Number.isFinite(o.x)&&Number.isFinite(o.y)&&Number.isFinite(o.width)).slice(0,24).map(o=>constrainDecor({...o,y:saved.version>=14?o.y:o.type==='B12_v01'?o.y-bedHeight():698-bedHeight()-65*dcClamp(Number.isFinite(o.depth)?o.depth:(694-o.y)/52,0,1),width:dcClamp(o.width,70,700)}));
}}catch{}
$('tryShelter').onclick=()=>{
 FishAvoid.configure(decorations,DECOR_ITEMS);const doors=shelterDoors();let matched=false;
 for(const d of doors){if(fish.some(f=>f.shelter?.id===d.id))continue;const f=fish.find(f=>!f.shelter&&Shelter.eligible(f,d,state.level));if(f){f.foodTarget=null;Shelter.start(f,d);matched=true;break}}
 if(matched){state.paused=false;$('pause').textContent='Tạm dừng hiệu ứng';notify('Cá đang bơi tới cửa hang; chờ cá vào, nghỉ rồi ra.')}else notify(doors.length?'Hang đang có cá, cửa bị đồ vật chắn hoặc chưa đủ chỗ. Dọn lối cửa, tăng cỡ hang hoặc bơm thêm nước.':'Đặt Hang đá cửa ngang vào hồ trước nhé.');
};
ensureWater();updateFishUI();bedUI();decorUI();

function drawPlant(im,o,spec,h){
 const crop=spec.crop||[0,0,im.naturalWidth,im.naturalHeight];
 const env={enabled:state.plantMotion,level:state.level,surface:surface(),waves:state.waves,outlets:plantOutlets};
 const flip=o.flip?-1:1;
 for(const b of PlantMotion.bands(o,spec,h,t,env)){
  const dy=-h+h*b.v0,dh=h*(b.v1-b.v0),x0=b.x0*flip,x1=b.x1*flip;
  g.save();g.translate(x0,dy);g.transform(1,0,(x1-x0)/dh,1,0,0);
  g.drawImage(im,crop[0],crop[1]+crop[3]*b.v0,crop[2],crop[3]*(b.v1-b.v0),-o.width/2,0,o.width,dh+.18);g.restore();
 }
}
let plantOutlets=[];
$('plantMotion').onclick=()=>{state.plantMotion=!state.plantMotion;$('plantMotion').setAttribute('aria-pressed',state.plantMotion);$('plantMotion').textContent='Cây đung đưa: '+(state.plantMotion?'bật':'tắt')};
