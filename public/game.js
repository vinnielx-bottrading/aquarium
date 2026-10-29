
const ASSETS={"room": "assets/room.png", "sand": "assets/sand.png", "gravel": "assets/gravel.png", "blue": "assets/blue.png", "gold": "assets/gold.png", "blueNight": "assets/blueNight.png"};
ASSETS.goldSwim='assets/C02_SWIM.png';
ASSETS.blueSwim='assets/C01_SWIM.png';
ASSETS.blueTurn='assets/C01_TURN.png';
ASSETS.goldTurn='assets/C02_TURN.png';
const c=document.getElementById('tank'),g=c.getContext('2d'),$=id=>document.getElementById(id);
const state={level:100,target:100,bed:'sand',bedHeight:24,bubbles:true,night:false,waves:.35,paused:false,sound:false};
const imgs={};for(const [k,v] of Object.entries(ASSETS)){const im=new Image();im.src=v;imgs[k]=im}
const food=Feeding.create();
let fish=[],nextFishId=0;
let t=0,last=0,spawn=0,particles=[],ripples=[],timer,audioCtx,noiseNode,gain;
const L=130,R=1370,T=225,B=700,DX=100,DY=-65;
function poly(points,fill,stroke,width=1){g.beginPath();points.forEach((p,i)=>i?g.lineTo(...p):g.moveTo(...p));g.closePath();if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=width;g.stroke()}}
function line(x,y,x2,y2,col,w=1){g.beginPath();g.moveTo(x,y);g.lineTo(x2,y2);g.strokeStyle=col;g.lineWidth=w;g.stroke()}
function gradient(x,y,x2,y2,stops){const q=g.createLinearGradient(x,y,x2,y2);stops.forEach(([a,b])=>q.addColorStop(a,b));return q}
function addFish(species,quiet=false){
 if(fish.length>=12){if(!quiet)notify('Hồ thử chứa tối đa 12 cá.');return}
 if(state.level<40){if(!quiet)notify('Bơm nước lên ít nhất 40% rồi thả cá nhé.');return}
 const depth=Math.random(),size=(species==='blue'?175:190)*(1-depth*.24);
 fish.push({id:nextFishId++,species,x:300+Math.random()*900,dir:Math.random()<.5?-1:1,turn:0,depth,size,phase:Math.random()*Math.PI*2,speed:22+Math.random()*22,lane:.2+Math.random()*.6,glow:state.night?1:0});
 ensureWater();FishMotion.init(fish[fish.length-1],state.level,Math.random,bedHeight());
 updateFishUI();
}
function updateFishUI(){if(!$('fishcount'))return;$('fishcount').textContent=fish.length+' / 12 cá';$('water').min=minimumWater();$('drain').disabled=fish.length>0;for(const id of ['addBlue','addGold'])$(id).disabled=fish.length>=12}
function sampleFish(){fish=[];state.level=state.target=100;for(let i=0;i<4;i++)addFish('blue',true);for(let i=0;i<2;i++)addFish('gold',true);updateFishUI()}
function updateFish(dt){Feeding.tick(food,fish,dt,state.level,bedHeight());for(const f of fish){f.glow+=((state.night?1:0)-f.glow)*(1-Math.exp(-dt*2.8));if(!updateShelter(f,dt)&&!Feeding.steer(food,f,dt,state.level,bedHeight()))FishMotion.update(f,dt,state.level,Math.random,bedHeight())}}
function drawFishSprite(im,f,xscale,y,alpha){
 const atlas=imgs[f.species+'Swim'];
 if(!atlas||!atlas.complete||!atlas.naturalWidth)return;
 const frame=Animation.swimFrame(f.species,f.swimClock,f.phase);
 g.save();g.translate(f.x,y);g.scale(xscale*(f.renderScale||1),f.renderScale||1);g.rotate(f.pitch||0);g.globalAlpha=alpha*(1-f.depth*.13)*(f.shelterShade||1);
 if(f.species==='gold'&&goldFX&&!state.night)g.filter='brightness('+(1.04+.06*Math.sin(t*1.7+f.phase))+')';
 if(f.species==='blue'&&f.glow>.01&&!f.shelter){g.shadowColor='rgba(40,225,255,'+f.glow+')';g.shadowBlur=14*f.glow;g.filter='brightness('+(1+f.glow*.4)+')';}
 g.drawImage(atlas,frame*512,0,512,320,-f.size/2,-f.size*.3125,f.size,f.size*.625);g.restore();
}
function drawTurn(f,y){
 const atlas=imgs[f.species+'Turn'];if(!atlas.complete||!atlas.naturalWidth)return;
 const frame=Animation.turnFrame(f.turn);
 g.save();g.translate(f.x,y);g.scale(f.dir*(f.renderScale||1),f.renderScale||1);g.globalAlpha=(1-f.depth*.13)*(f.shelterShade||1);
 if(f.species==='blue'&&f.glow>.01&&!f.shelter){g.shadowColor='#36e3ff';g.shadowBlur=f.glow*14;g.filter='brightness('+(1+f.glow*.4)+')';}
 g.drawImage(atlas,frame*512,0,512,320,-f.size/2,-f.size*.3125,f.size,f.size*.625);g.restore();
}
function drawFish(list=fish){
 for(const f of [...list].sort((a,b)=>b.depth-a.depth)){
  const h=f.size*.5,top=surface()+h*.5+14,bottom=B-h*.5-40;
  const y=f.y;
  const scale=f.dir;if(f.turn>0){drawTurn(f,y);continue;}
  if(f.species==='blue'&&f.glow>.01&&!f.shelter){g.save();g.globalCompositeOperation='screen';g.globalAlpha=f.glow*.35;const glow=g.createRadialGradient(f.x,y,2,f.x,y,f.size*.62);glow.addColorStop(0,'rgba(48,221,255,.3)');glow.addColorStop(.55,'rgba(29,193,243,.1)');glow.addColorStop(1,'rgba(29,193,243,0)');g.fillStyle=glow;g.fillRect(f.x-f.size*.7,y-f.size*.7,f.size*1.4,f.size*1.4);g.restore()}
  drawFishSprite(imgs[f.species],f,scale,y,1);
  
 }
}
function surface(){return B-420*state.level/100}
function notify(text){$('toast').textContent=text;$('toast').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('toast').classList.remove('show'),2000)}
function ui(){const v=Math.round(state.level);$('water').value=v;$('percent').textContent=v+'%';$('status').textContent=v===0?'Hồ kính đang trống':state.target>state.level+.1?'Đang bơm nước…':state.target<state.level-.1?'Đang xả nước…':'Mực nước '+v+'%';if(gain&&audioCtx)gain.gain.setTargetAtTime(state.sound&&state.level>2&&state.bubbles&&!state.paused?.035:0,audioCtx.currentTime,.2)}
let scene='room',goldFX=true;
$('scene').onchange=e=>{scene=e.target.value};
$('goldFX').onclick=()=>{goldFX=!goldFX;$('goldFX').setAttribute('aria-pressed',goldFX);$('goldFX').textContent='Ánh vảy Đuôi Nắng: '+(goldFX?'bật':'tắt')};
function sceneBackground(){
 const palettes={forest:['#092f32','#91b4a3'],mountain:['#bad6db','#e7e4cf'],ocean:['#083a59','#17969c'],everest:['#2e537b','#d8e7ef']};
 const colors=palettes[scene];g.fillStyle=gradient(0,0,0,900,[[0,colors[0]],[1,colors[1]]]);g.fillRect(0,0,1600,900);
 if(scene==='forest'){
  for(let k=0;k<3;k++){g.fillStyle=['#4c7974','#315e58','#193f3d'][k];for(let i=0;i<12;i++){const x=i*155+k*48;g.fillRect(x,80+i%3*35,16+k*12,650);g.beginPath();g.ellipse(x,70+i%3*35,140-k*16,160,0,0,Math.PI*2);g.fill()}}
  for(let i=0;i<4;i++){g.fillStyle='rgba(216,243,218,.07)';g.fillRect(0,280+i*80,1600,35)}
 }else if(scene==='ocean'){
  for(let i=0;i<8;i++)poly([[i*250,-20],[i*250+90,-20],[i*250-200,800],[i*250-370,800]],'rgba(164,239,238,.055)');
  for(let i=0;i<24;i++){let x=(i*97+t*(6+i%4))%1700-50,y=100+(i*71)%450;g.strokeStyle='rgba(202,250,255,.24)';g.beginPath();g.arc(x,y,2+i%4,0,Math.PI*2);g.stroke()}
  for(let i=0;i<8;i++){let x=(i*221+t*12)%1800-100,y=120+i%3*110;g.fillStyle='rgba(1,39,58,.35)';g.beginPath();g.ellipse(x,y,18,6,0,0,Math.PI*2);g.fill();poly([[x-15,y],[x-28,y-8],[x-28,y+8]],'rgba(1,39,58,.35)')}
 }else{
  for(let layer=0;layer<3;layer++){
   const pts=[[0,750]];for(let i=0;i<7;i++)pts.push([i*320-140+layer*65, (i%2?110:390)+layer*110]);pts.push([1600,750]);poly(pts,scene==='everest'?['#a8bfce','#718fa6','#3d6179'][layer]:['#8eaead','#638d8b','#3f7170'][layer]);
   if(scene==='everest')for(let i=1;i<7;i+=2){const x=i*320-140+layer*65,y=110+layer*110;poly([[x-105,y+94],[x,y],[x+104,y+91],[x+26,y+62],[x-5,y+80],[x-35,y+57]],'#edf6f7')}
  }
  if(scene==='everest')for(let i=0;i<45;i++){g.fillStyle='rgba(255,255,255,.6)';g.beginPath();g.arc((i*139+t*14)%1600,(i*73+t*19)%720,1+i%3,0,Math.PI*2);g.fill()}
 }
 // Indoor observation platform isolates the aquarium from the exterior environment.
 g.fillStyle=gradient(0,710,0,900,[[0,'#8faaa9'],[1,'#c6d1cb']]);g.fillRect(0,745,1600,155);
 for(const x of [30,1550]){g.fillStyle='#24484a';g.fillRect(x,0,20,745);g.fillStyle='#e2eeee44';g.fillRect(x+20,0,5,745)}
 g.strokeStyle='#e7f7f044';g.lineWidth=7;g.strokeRect(52,25,1495,695);
}
function render(dt){g.clearRect(0,0,1600,900);
 if(scene!=='room')sceneBackground();else if(imgs.room.complete&&imgs.room.naturalWidth)g.drawImage(imgs.room,0,0,1600,900);else{g.fillStyle='#e7e2d8';g.fillRect(0,0,1600,900)}
 if(state.night){g.fillStyle='rgba(12,29,42,.73)';g.fillRect(0,0,1600,900);const spot=g.createRadialGradient(800,450,20,800,450,800);spot.addColorStop(0,'rgba(76,149,154,.28)');spot.addColorStop(1,'transparent');g.fillStyle=spot;g.fillRect(0,0,1600,900)}
 // Contact shadow and low charcoal base.
 g.save();g.filter='blur(15px)';g.fillStyle='#1a302a33';g.beginPath();g.ellipse(810,770,685,18,0,0,Math.PI*2);g.fill();g.restore();
 poly([[L-5,B+6],[L+DX,B+DY],[R+DX+5,B+DY],[R+5,B+6]],'#5f6460');poly([[L-5,B+6],[R+5,B+6],[R+5,B+65],[L-5,B+65]],gradient(0,B,0,B+65,[[0,'#62635f'],[1,'#343d3b']]),'#303a39');poly([[R+5,B+6],[R+DX+5,B+DY],[R+DX+5,B+DY+60],[R+5,B+65]],'#303d3c','#293533');
 // Rear glass and floor.
 poly([[L+DX,T+DY],[R+DX,T+DY],[R+DX,B+DY],[L+DX,B+DY]],state.night?'rgba(71,145,151,.09)':'rgba(168,211,211,.07)','#86a9aa',2);
 poly([[L,B],[L+DX,B+DY],[R+DX,B+DY],[R,B]],'rgba(128,178,177,.13)','#91b6b5',2);
 // Side/rear glass precedes occupants; only the front frame overlays them.
 poly([[L,T],[L+DX,T+DY],[L+DX,B+DY],[L,B]],'rgba(205,244,243,.035)','#99c5c7',2);
 poly([[R,T],[R+DX,T+DY],[R+DX,B+DY],[R,B]],'rgba(104,182,193,.055)','#91bfc1',2);
 drawSubstrate();
 const y=surface();
 if(state.level>.1){
  g.save();poly([[L+3,y],[L+DX,y+DY],[R+DX-3,y+DY],[R+DX-3,B+DY-2],[R-3,B-2],[L+3,B-2]],null);g.clip();
  g.fillStyle=gradient(0,y,0,B,[[0,state.night?'rgba(81,200,218,.13)':'rgba(114,209,216,.12)'],[1,state.night?'rgba(18,107,139,.45)':'rgba(19,119,146,.25)']]);g.fillRect(L,y+DY,R-L+DX,B-y-DY);
  // Slowly moving shafts of light.
  for(let i=0;i<6;i++){const x=280+i*210+Math.sin(t*.18+i)*25;poly([[x,y+DY],[x+35,y+DY],[x+180,B],[x+75,B]],gradient(0,y,0,B,[[0,'rgba(236,255,246,.075)'],[1,'rgba(236,255,246,0)']]))}
  // Gentle caustic ribbons at floor.
  g.save();g.globalCompositeOperation='screen';g.strokeStyle=state.night?'rgba(112,233,244,.19)':'rgba(238,255,225,.25)';g.lineWidth=1.2;
  for(let j=0;j<6;j++){g.beginPath();for(let x=L;x<R+DX;x+=12){let yy=B-bedHeight()-3-j*9+Math.sin(x*.024+t*.7+j)*4+Math.cos(x*.013-t*.5)*3;x===L?g.moveTo(x,yy):g.lineTo(x,yy)}g.stroke()}g.restore();

  // Fine suspended particles.
  for(let i=0;i<38;i++){let x=L+20+(i*127.3+t*(i%2?2:-2))%(R-L-40),yy=B-((i*43+t*4)%(Math.max(1,B-y)));g.fillStyle='rgba(229,255,247,.26)';g.beginPath();g.arc(x,yy,.6+(i%3)*.3,0,7);g.fill()}
  for(const p of particles){g.strokeStyle='rgba(222,255,255,.5)';g.lineWidth=1;g.beginPath();g.ellipse(p.x+Math.sin(t*2+p.seed)*4,p.y,p.r,p.r*1.1,0,0,7);g.stroke();g.fillStyle='#f0ffffa0';g.beginPath();g.arc(p.x-1+Math.sin(t*2+p.seed)*4,p.y-p.r*.4,Math.max(.5,p.r*.18),0,7);g.fill()}
  g.restore();
  // Water top; near and far sides use the same perspective.
  poly([[L+3,y],[L+DX,y+DY],[R+DX-3,y+DY],[R-3,y]],'rgba(165,231,232,.07)');
  g.beginPath();for(let x=L+3;x<=R-3;x+=6){const yy=y+Math.sin(x*.021+t*1.4)*state.waves*2.4+Math.sin(x*.037-t)*state.waves;x===L+3?g.moveTo(x,yy):g.lineTo(x,yy)}g.strokeStyle='rgba(222,255,255,.7)';g.lineWidth=1.7;g.stroke();line(L+DX,y+DY,R+DX,y+DY,'rgba(211,250,248,.25)');
  for(let j=0;j<9;j++){const x=220+j*132+Math.sin(t*.4+j)*18, yy=y-20-(j%3)*12;g.strokeStyle=`rgba(234,255,255,${.06+state.waves*.13})`;g.lineWidth=1;g.beginPath();g.ellipse(x,yy,35+Math.sin(t+j)*8,2+state.waves,0,0,Math.PI*1.6);g.stroke()}
  for(const r of ripples){g.strokeStyle=`rgba(231,255,255,${Math.max(0,1-r.age/2)*.55})`;g.lineWidth=1.3;g.beginPath();g.ellipse(r.x,y-10,8+r.age*70,2+r.age*12,0,0,7);g.stroke()}
  // Visible incoming water while filling.
  if(state.target>state.level+.1){g.strokeStyle='rgba(193,249,255,.65)';g.lineWidth=6;g.beginPath();g.moveTo(R-90,T-7);g.quadraticCurveTo(R-100,y-40,R-95+Math.sin(t*20)*2,y-7);g.stroke()}
 }
 g.save();poly([[L,T],[L+DX,T+DY],[R+DX,T+DY],[R+DX,B+DY],[R,B],[L,B]],null);g.clip();drawDecorWorld();g.restore();
 // Near/front frame and subtle reflections.
 poly([[L,T],[R,T],[R,B],[L,B]],null,'#64999f',5);poly([[L,T],[R,T],[R,B],[L,B]],null,'#d8f7f5',1.5);
 line(L,T,L+DX,T+DY,'#e3ffff',2);line(L+DX,T+DY,R+DX,T+DY,'#cbeeed',2);line(R,T,R+DX,T+DY,'#e0ffff',2);
 poly([[L+6,T+6],[L+140,T+6],[L+6,T+170]],'rgba(255,255,255,.11)');line(R-9,T+12,R-9,B-12,'rgba(241,255,255,.32)',3);
}
function step(now){const dt=Math.min(.04,(now-last)/1000||0);last=now;if(!state.paused){t+=dt;updateFish(dt);const diff=state.target-state.level;state.level+=Math.sign(diff)*Math.min(Math.abs(diff),dt*18);const y=surface();spawn+=dt;if(state.bubbles&&state.level>4&&spawn>.09){spawn=0;particles.push({x:R-100+Math.random()*17,y:B-bedHeight()-7,r:1.3+Math.random()*3,seed:Math.random()*10,speed:28+Math.random()*32})}particles.forEach(p=>p.y-=p.speed*dt);particles=particles.filter(p=>p.y>y+1&&state.level>1);ripples.forEach(r=>r.age+=dt);ripples=ripples.filter(r=>r.age<2)}ui();feedingUI();render(dt);requestAnimationFrame(step)}
$('fill').onclick=()=>{state.target=100;state.paused=false;$('pause').textContent='Tạm dừng hiệu ứng'};$('drain').onclick=()=>{if(fish.length){notify('Đưa cá ra trước khi xả cạn hồ.');return}state.target=0;state.paused=false;$('pause').textContent='Tạm dừng hiệu ứng'};
$('water').oninput=e=>{state.level=state.target=Math.max(minimumWater(),+e.target.value);ui()};$('waves').oninput=e=>state.waves=+e.target.value/100;

for(const [id,key] of [['bubbles','bubbles'],['light','night']])$(id).onclick=()=>{state[key]=!state[key];$(id).classList.toggle('active',state[key]);$(id).setAttribute('aria-pressed',state[key]);if(id==='light')$(id).textContent=state.night?'Ban ngày':'Buổi tối'};
$('pause').onclick=()=>{state.paused=!state.paused;$('pause').textContent=state.paused?'Tiếp tục hiệu ứng':'Tạm dừng hiệu ứng'};
$('sound').onclick=async()=>{try{if(!audioCtx){const AC=window.AudioContext||window.webkitAudioContext;if(!AC)throw Error();audioCtx=new AC();const buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*2,audioCtx.sampleRate),data=buffer.getChannelData(0);let last=0;for(let i=0;i<data.length;i++){last=(last+.025*(Math.random()*2-1))/1.025;data[i]=last*3}noiseNode=audioCtx.createBufferSource();noiseNode.buffer=buffer;noiseNode.loop=true;const filter=audioCtx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=700;gain=audioCtx.createGain();gain.gain.value=0;noiseNode.connect(filter).connect(gain).connect(audioCtx.destination);noiseNode.start()}await audioCtx.resume();state.sound=!state.sound;$('sound').classList.toggle('active',state.sound);$('sound').setAttribute('aria-pressed',state.sound);if(state.sound&&state.level<2)notify('Âm nước sẽ phát khi hồ có nước và máy sủi bật.')}catch{notify('Âm thanh chưa được trình duyệt cho phép.')}};
$('reset').onclick=()=>{fish=[];Feeding.clear(food,fish);food.eaten=0;updateFishUI();state.level=state.target=0;state.bed='none';particles=[];ripples=[];document.querySelectorAll('[data-bed]').forEach(x=>x.classList.toggle('active',x.dataset.bed==='none'));notify('Đã trả hồ về trạng thái trống.')};
document.addEventListener('visibilitychange',()=>{if(audioCtx){if(document.hidden)audioCtx.suspend();else if(state.sound)audioCtx.resume()}last=performance.now()});
if(matchMedia('(prefers-reduced-motion: reduce)').matches){state.paused=true;$('pause').textContent='Bật hiệu ứng'}
$('addBlue').onclick=()=>addFish('blue');$('addGold').onclick=()=>addFish('gold');
$('clearFish').onclick=()=>{fish=[];updateFishUI();notify('Đã đưa cá ra; có thể xả nước.')};
$('demoFish').onclick=()=>{sampleFish();notify('Đã thả 4 Ngọc Lam và 2 Đuôi Nắng.')};
sampleFish();ui();

$('testTurn').onclick=()=>{fish.forEach(f=>f.turn=1);notify('Đang thử 6 góc quay đầu của cả hai loài.')}
