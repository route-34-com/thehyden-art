/* Try it on your wall: her designs on real rooms from her projects (wall clipped so furniture stays in front),
   or on a visitor's own photo or live camera (four-corner perspective). Restored from the original site, restyled. */
(function(){
  var $=function(id){return document.getElementById(id)}, room=$('T-room'); if(!room) return;
  var wall=$('T-wall'), tag=$('T-tag'), thumbs=$('T-thumbs'), pick=$('T-pick'), tg=$('T-tints'), plain=$('T-plain'), handle=$('T-handle'), base=$('T-base');
  // [name, note, image, kind, tile size (% of wall width) or 'cover', position, instagram path]
  var walls=[
    ['The Playroom','Wooden horses and curious birds','wall-playroom','pattern','40%','0 0','p/DcBsEJWnU9q'],
    ['Motif & Monkey','Where tradition meets mischief','wall-monkey','pattern','34%','0 0','p/DObbmTnk81l'],
    ['Whispers in Bloom','Birdsong on teal','wall-whispers','pattern','38%','0 0','p/DLxqWZET1ek'],
    ['Lotus & Origami Birds','Calm, not crowded','wall-origami','pattern','32%','0 0','p/DUSnnn6kwWB'],
    ['Muggu & Pink Elephants','Playful muggu frames','wall-muggu','pattern','34%','0 0','p/C8WPCcjPzXY'],
    ['Kerosene Lamps','Lamps and candle stands','wall-lamps','pattern','60%','0 0','p/C8buStkqcY5'],
    ['Coconut & Kolam','Tropical, traditional','wall-kolam','pattern','34%','0 0','p/C8zHOmTSrOI'],
    ['Floral Trellis','Soft florals on cream','wall-trellis','pattern','36%','0 0','p/DeCNRlVHU6R'],
    ['Parrot Garden','Birds among blossoms','wall-parrot','pattern','34%','0 0','p/DdLXJJkymg4'],
    ['Songbird Branches','Branches and songbirds','wall-blossom','pattern','40%','0 0','p/DdjEoORyUux'],
    ['Thota','An old garden, brought home','wall-thota','mural','cover','50% 40%','p/Dcf1YU4SlSd'],
    ['Rooted Reverie','A South Indian village','wall-rooted','mural','cover','40% 40%','p/DUF1PLPk_ly'],
    ['Folkscape','Village life, timeless','wall-folkscape','mural','cover','50% 50%','p/DMhgOi3zvX7'],
    ['White Lotus','Nandi, palms and kolam','wall-white-lotus','mural','cover','40% 50%','p/Da2VGkGyjoe'],
    ['Lotus Whispers','Lotus vines that flow','wall-lotus-whispers','mural','cover','50% 0%','p/DUA1cRcExpb'],
    ['Blush Botanica','Soft florals, calm tones','wall-blush','mural','cover','50% 40%','p/DPX_3r8E0Lh'],
    ['Nabhi Kamalam','The cosmic lotus, in gold','wall-nabhi','mural','cover','50% 50%','p/DdYRtDtHWOC']
  ];
  var tints=[['Original','#ffffff'],['Blush','#f4d4cc'],['Sage','#d3dfc9'],['Powder blue','#d2e3e8'],['Butter','#f4e4b8'],['Terracotta','#e6b9a2']];
  var IGI=document.querySelector('.igi')?document.querySelector('.igi').outerHTML:'Instagram';
  var ROOMS={
    living:{img:'img/rooms/living.jpg',ar:1,wb:64,alt:'A living room with a low oak sideboard',
      clip:'polygon(0% 0%,100% 0%,100% 64%,23.6% 64%,23.6% 61%,22.8% 60.2%,22% 60%,22% 58.9%,20.9% 58.9%,20.9% 60%,19.6% 60.4%,19% 61.5%,19% 64%,16.9% 64%,16.9% 56.5%,16.2% 55.4%,11.7% 55.4%,11% 56.5%,11% 59.6%,10.6% 60.2%,4.4% 60.2%,4.4% 64%,0% 64%)',
      shade:'linear-gradient(100deg,rgba(255,255,255,.10),rgba(255,255,255,0) 35%,rgba(60,40,20,0) 70%,rgba(60,40,20,.10)),linear-gradient(180deg,rgba(60,40,20,.10),rgba(0,0,0,0) 25%,rgba(0,0,0,0) 85%,rgba(60,40,20,.14))'},
    lounge:{img:'img/g/044.jpg',ar:640/800,wb:62.5,alt:'A lounge with a cane sofa and side table',
      clip:'polygon(0% 0%,100% 0%,100% 62.5%,73.1% 62.5%,73.1% 49.4%,69.5% 45.25%,64.1% 44.4%,0% 44.4%)',
      shade:'linear-gradient(180deg,rgba(60,40,20,.10),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 80%,rgba(60,40,20,.16)),linear-gradient(90deg,rgba(60,40,20,.06),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(60,40,20,.10))'},
    bedroom:{img:'img/g/108.jpg',ar:1,wb:37.6,alt:'A bedroom with white wainscoting below the wallpaper',
      clip:'polygon(0% 0%,100% 0%,100% 37.6%,0% 37.6%)',
      shade:'linear-gradient(180deg,rgba(60,40,20,.12),rgba(0,0,0,0) 40%,rgba(60,40,20,.10)),linear-gradient(90deg,rgba(60,40,20,.08),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(60,40,20,.08))'}
  };
  var cur=0, tint=0, scale=1;
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
  function paint(){
    var w=walls[cur], n=w[0], mural=w[3]==='mural';
    var mu=$('T-mu'); wall.classList.toggle('is-mural',mural); mu.style.backgroundImage=mural?'url(img/'+w[2]+'.jpg)':''; mu.style.backgroundPosition=w[5];
    wall.style.backgroundImage=mural?'none':'url(img/'+w[2]+'.jpg)'; wall.style.backgroundPosition=w[5];
    wall.style.backgroundRepeat=mural?'no-repeat':'repeat'; wall.style.backgroundSize=mural?'cover':(parseFloat(w[4])*scale)+'%';
    wall.style.backgroundColor=mural?'':tints[tint][1]; wall.style.backgroundBlendMode=mural?'normal':'multiply';
    tg.classList.toggle('off',mural); mu.style.transform=mural?'scale('+Math.max(1,scale)+')':'';
    tg.querySelectorAll('button').forEach(function(b,j){b.setAttribute('aria-pressed',!mural&&j===tint)});
    var tn=!mural&&tint?', '+tints[tint][0]:''; tag.textContent=n+tn;
    var ask=window.hydenAsk?window.hydenAsk('Hi! I would love to know more about "'+n+'"'+(tn?' in '+tints[tint][0]:'')+' from thehyden.art for my wall.'):{ig:'https://ig.me/m/thehyden.art'};
    pick.innerHTML='<b>'+esc(n)+'</b><small>'+(mural?'Mural':'Pattern')+'. '+esc(w[1])+'</small>'+
      '<a class="btn" href="'+(ask.wa||ask.ig)+'" target="_blank" rel="noopener">'+(ask.wa?'Ask on WhatsApp':'Ask about this design')+' <i>→</i></a>'+
      (ask.wa?'<a class="T-dm" href="'+ask.ig+'" target="_blank" rel="noopener">or message on Instagram</a>':'')+
      '<a class="ig-link" aria-label="See it on Instagram" href="https://www.instagram.com/'+w[6]+'/" target="_blank" rel="noopener">'+IGI+'</a>';
  }
  function setWall(i){cur=i;wall.classList.add('swap');setTimeout(function(){paint();wall.classList.remove('swap')},200);
    thumbs.querySelectorAll('button').forEach(function(b){b.setAttribute('aria-pressed',+b.dataset.i===i)})}
  function showKind(k){document.querySelectorAll('.T-tabs button').forEach(function(b){b.classList.toggle('on',b.dataset.kind===k)});
    thumbs.querySelectorAll('button').forEach(function(b){b.hidden=walls[b.dataset.i][3]!==k})}
  walls.forEach(function(w,i){var b=document.createElement('button');b.type='button';b.dataset.i=i;b.setAttribute('aria-label',w[0]);
    b.innerHTML='<i style="background-image:url(img/'+w[2]+'.jpg);background-position:'+(w[5]==='0 0'?'center':w[5])+'"></i>'+esc(w[0]);
    b.onclick=function(){setWall(i)};thumbs.appendChild(b)});
  document.querySelectorAll('.T-tabs button').forEach(function(b){b.onclick=function(){showKind(b.dataset.kind)}});
  tints.forEach(function(t,j){var b=document.createElement('button');b.type='button';b.setAttribute('aria-label',t[0]+' wall colour');b.style.background=t[1];
    b.onclick=function(){tint=j;paint()};tg.querySelector('div').appendChild(b)});
  $('T-scale').oninput=function(e){scale=+e.target.value;paint()};
  function setRoom(k){var r=ROOMS[k];room.dataset.room=k;base.src=r.img;base.alt=r.alt;
    room.style.setProperty('--clip',r.clip);room.style.setProperty('--shade',r.shade);room.style.setProperty('--ar',r.ar);room.style.setProperty('--wb',(r.wb||100)+'%');room.style.setProperty('--photo','url('+r.img+')')}
  document.querySelectorAll('.T-rooms button[data-room]').forEach(function(b){b.onclick=function(){
    stopCam();setRoom(b.dataset.room);room.classList.remove('own');wall.style.transform='';paint();
    document.querySelectorAll('.T-rooms [aria-pressed]').forEach(function(x){x.setAttribute('aria-pressed',x===b)})}});
  /* your own wall: photo or live camera, mapped with four corners */
  var own=$('T-own'), cam=$('T-cam'), camBtn=$('T-camera'), snap=$('T-snap'), pts=[], stream=null, W0=600, H0=400;
  var pins=[].slice.call(room.querySelectorAll('.T-pt'));
  function solve(A,b){var n=b.length,i,j,k;
    for(i=0;i<n;i++){var m=i;for(k=i+1;k<n;k++)if(Math.abs(A[k][i])>Math.abs(A[m][i]))m=k;
      var t=A[i];A[i]=A[m];A[m]=t;t=b[i];b[i]=b[m];b[m]=t;
      for(k=i+1;k<n;k++){var f=A[k][i]/A[i][i];for(j=i;j<n;j++)A[k][j]-=f*A[i][j];b[k]-=f*b[i]}}
    var x=[];for(i=n-1;i>=0;i--){var v=b[i];for(j=i+1;j<n;j++)v-=A[i][j]*x[j];x[i]=v/A[i][i]}return x}
  function warp(){if(!room.classList.contains('own'))return;
    var R=room.getBoundingClientRect(),src=[[0,0],[W0,0],[W0,H0],[0,H0]],A=[],b=[];
    pts.forEach(function(p,i){var x=src[i][0],y=src[i][1],X=p[0]*R.width,Y=p[1]*R.height;
      A.push([x,y,1,0,0,0,-X*x,-X*y]);b.push(X);A.push([0,0,0,x,y,1,-Y*x,-Y*y]);b.push(Y);
      pins[i].style.left=p[0]*100+'%';pins[i].style.top=p[1]*100+'%'});
    var h=solve(A,b);wall.style.transform='matrix3d('+[h[0],h[3],0,h[6],h[1],h[4],0,h[7],0,0,1,0,h[2],h[5],0,1].join(',')+')'}
  function ownMode(ar){room.classList.add('own');room.dataset.room='own';room.style.setProperty('--ar',ar);
    pts=[[.12,.1],[.88,.1],[.88,.6],[.12,.6]];
    room.classList.remove('comparing');$('T-compare').setAttribute('aria-pressed',false);setSplit(0);
    document.querySelectorAll('.T-rooms [aria-pressed]').forEach(function(x){x.setAttribute('aria-pressed',false)});
    requestAnimationFrame(warp)}
  function stopCam(){if(stream){stream.getTracks().forEach(function(t){t.stop()});stream=null}room.classList.remove('cam');snap.hidden=true}
  $('T-file').onchange=function(e){var f=e.target.files[0];if(!f)return;stopCam();
    own.onload=function(){own.onload=null;ownMode(own.naturalWidth/own.naturalHeight)};own.src=URL.createObjectURL(f)};
  if(!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia))camBtn.hidden=true;
  camBtn.onclick=function(){
    navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:'environment'},width:{ideal:1280}},audio:false}).then(function(s){
      stopCam();stream=s;cam.srcObject=s;
      cam.onloadedmetadata=function(){cam.play();room.classList.add('cam');snap.hidden=false;ownMode(cam.videoWidth/cam.videoHeight);camBtn.setAttribute('aria-pressed',true)};
    }).catch(function(){camBtn.hidden=true;$('T-file').click()})};
  snap.onclick=function(){if(!stream)return;var c=document.createElement('canvas');c.width=cam.videoWidth;c.height=cam.videoHeight;
    c.getContext('2d').drawImage(cam,0,0);own.onload=null;own.src=c.toDataURL('image/jpeg',.9);stopCam()};
  pins.forEach(function(el,i){
    el.addEventListener('pointerdown',function(e){el.setPointerCapture(e.pointerId);el.dragging=true;e.preventDefault()});
    el.addEventListener('pointermove',function(e){if(!el.dragging)return;var r=room.getBoundingClientRect(),c=function(v){return Math.min(1,Math.max(0,v))};
      pts[i]=[c((e.clientX-r.left)/r.width),c((e.clientY-r.top)/r.height)];warp()});
    el.addEventListener('pointerup',function(){el.dragging=false})});
  addEventListener('resize',warp);
  /* before and after */
  function setSplit(p){p=p&&Math.min(96,Math.max(4,p));plain.style.clipPath='inset(0 '+(100-p)+'% 0 0)';handle.style.left=p+'%'}
  $('T-compare').onclick=function(){var on=room.classList.toggle('comparing');this.setAttribute('aria-pressed',on);setSplit(on?50:0)};
  handle.addEventListener('pointerdown',function(e){handle.setPointerCapture(e.pointerId);handle.dragging=true});
  handle.addEventListener('pointermove',function(e){if(!handle.dragging)return;var r=room.getBoundingClientRect();setSplit((e.clientX-r.left)/r.width*100)});
  handle.addEventListener('pointerup',function(){handle.dragging=false});
  setRoom('living');showKind('pattern');setWall(0);
})();
