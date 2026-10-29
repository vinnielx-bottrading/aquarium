$('foodJar').src='assets/E01_v01.png';
function drawFoodPellet(p){
 g.save();g.globalAlpha=Math.min(1,(32-p.age)/3)*(state.night?.7:1);g.translate(p.x,p.y);g.rotate(p.seed+p.age*.4);
 g.fillStyle='#76502c';g.beginPath();g.ellipse(0,0,p.r,p.r*.8,0,0,Math.PI*2);g.fill();
 g.fillStyle='#dfae59';g.beginPath();g.ellipse(-p.r*.16,-p.r*.22,p.r*.72,p.r*.48,0,0,Math.PI*2);g.fill();
 g.fillStyle='#f3d58a';g.beginPath();g.arc(-p.r*.3,-p.r*.3,p.r*.18,0,Math.PI*2);g.fill();g.restore();
}
$('feedFish').onclick=()=>{
 if(!Feeding.drop(food,fish,state.level))return;
 state.paused=false;$('pause').textContent='Tạm dừng hiệu ứng';ripples.push({x:food.pellets[food.pellets.length-1].x,age:0});notify('Đã rắc 8 hạt. Cá sẽ tìm đến khi thức ăn chìm xuống.');feedingUI();
};
$('clearFood').onclick=()=>{Feeding.clear(food,fish);feedingUI();notify('Đã dọn thức ăn còn lại.')};
function feedingUI(){
 $('feedFish').disabled=!fish.length||state.level<40||food.cooldown>0||food.pellets.length>24;$('clearFood').disabled=!food.pellets.length;
 const extra=!fish.length?' · Thả cá để cho ăn':state.paused?' · Đang tạm dừng':food.cooldown>0?' · Chờ '+Math.ceil(food.cooldown)+'s':'';
 const message=food.pellets.length+' hạt trong hồ · Đã ăn '+food.eaten+' hạt'+extra;if($('foodStatus').textContent!==message)$('foodStatus').textContent=message;
}
function selectTool(kind,focus=false){
 const decor=kind==='decor';$('decorPanel').hidden=!decor;$('trayBody').hidden=!decor;$('feedPanel').hidden=decor;
 for(const [id,on] of [['tabDecor',decor],['tabFeed',!decor]]){$(id).setAttribute('aria-selected',on);$(id).tabIndex=on?0:-1;if(on&&focus)$(id).focus()}
 if(!decor){placing=null;selectedDecor=null}decorUI();
}
$('tabFeed').onclick=()=>selectTool('feed');$('tabDecor').onclick=()=>selectTool('decor');
for(const id of ['tabFeed','tabDecor'])$(id).onkeydown=e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();selectTool(e.key==='Home'?'feed':e.key==='End'?'decor':id==='tabFeed'?'decor':'feed',true)}};
const stage=$('tankStage');
function fullUI(){const on=document.fullscreenElement===stage||stage.classList.contains('expanded');$('exitFull').hidden=!on;document.body.classList.toggle('tank-expanded',on);$('full').setAttribute('aria-pressed',on)}
async function enterFull(){
 placing=null;dragging=null;selectedDecor=null;selectTool('feed');
 try{if(stage.requestFullscreen)await stage.requestFullscreen();else stage.classList.add('expanded')}catch{stage.classList.add('expanded')}
 fullUI();$('exitFull').focus();
}
async function exitFull(){try{if(document.fullscreenElement)await document.exitFullscreen()}catch{}stage.classList.remove('expanded');fullUI();$('full').focus()}
$('full').onclick=enterFull;$('exitFull').onclick=exitFull;document.addEventListener('fullscreenchange',fullUI);document.addEventListener('keydown',e=>{if(e.key==='Escape'&&stage.classList.contains('expanded'))exitFull()});
selectTool('feed');feedingUI();requestAnimationFrame(step);
