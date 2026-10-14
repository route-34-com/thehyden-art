/* Try it on your wall: her designs on real rooms from her projects (wall clipped so furniture stays in front),
   or on a visitor's own photo (drag + resize). Restored from the original site, restyled. */
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
  var ROOMS={
    living:{img:'img/g/051.jpg',ar:783/800,alt:'A living hall with a day-bed and lounge chair',
      clip:'polygon(0% 1%,77.3% 1%,77.3% 59%,66.5% 59%,64.5% 62%,62.5% 66.5%,60% 66.5%,60% 55%,57% 47%,53% 43.5%,48% 45.5%,44% 51.5%,42.5% 60%,42.5% 66.5%,0% 66.5%)',
      shade:'linear-gradient(90deg,rgba(60,40,20,.16),rgba(60,40,20,0) 45%,rgba(255,255,255,0) 75%,rgba(60,40,20,.06)),linear-gradient(180deg,rgba(60,40,20,.14),rgba(0,0,0,0) 22%,rgba(0,0,0,0) 85%,rgba(60,40,20,.14))'},
    lounge:{img:'img/g/044.jpg',ar:640/800,alt:'A lounge with a cane sofa and side table',
      clip:'polygon(0% 0%,100% 0%,100% 62.5%,73.1% 62.5%,73.1% 49.4%,69.5% 45.25%,64.1% 44.4%,0% 44.4%)',
      shade:'linear-gradient(180deg,rgba(60,40,20,.10),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 80%,rgba(60,40,20,.16)),linear-gradient(90deg,rgba(60,40,20,.06),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(60,40,20,.10))'},
    bedroom:{img:'img/g/108.jpg',ar:1,alt:'A bedroom with white wainscoting below the wallpaper',
      clip:'polygon(0% 0%,100% 0%,100% 37.6%,0% 37.6%)',
      shade:'linear-gradient(180deg,rgba(60,40,20,.12),rgba(0,0,0,0) 40%,rgba(60,40,20,.10)),linear-gradient(90deg,rgba(60,40,20,.08),rgba(0,0,0,0) 30%,rgba(0,0,0,0) 70%,rgba(60,40,20,.08))'}
  };
  var cur=0, tint=0, scale=1;
  function esc(t){return String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;')}
  function paint(){
    var w=walls[cur], n=w[0], mural=w[3]==='mural';
    wall.style.backgroundImage='url(img/'+w[2]+'.jpg)'; wall.style.backgroundPosition=w[5];
    wall.style.backgroundRepeat=mural?'no-repeat':'repeat'; wall.style.backgroundSize=mural?'cover':(parseFloat(w[4])*scale)+'%';
    wall.style.backgroundColor=mural?'':tints[tint][1]; wall.style.backgroundBlendMode=mural?'normal':'multiply';
    tg.classList.toggle('off',mural); $('T-scale-wrap').classList.toggle('off',mural);
    tg.querySelectorAll('button').forEach(function(b,j){b.setAttribute('aria-pressed',!mural&&j===tint)});
    var tn=!mural&&tint?', '+tints[tint][0]:''; tag.textContent=n+tn;
    var msg=encodeURIComponent('Hi! I would love to know more about "'+n+'"'+(tn?' in '+tints[tint][0]:'')+' for my wall.');
    pick.innerHTML='<b>'+esc(n)+'</b><small>'+(mural?'Mural':'Pattern')+'. '+esc(w[1])+'</small>'+
      '<a class="btn" href="https://ig.me/m/thehyden.art?text='+msg+'" target="_blank" rel="noopener">Ask about this design <i>→</i></a>'+
      '<a class="ul ig" href="https://www.instagram.com/'+w[6]+'/" target="_blank" rel="noopener">See it on Instagram ↗</a>';
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
    room.style.setProperty('--clip',r.clip);room.style.setProperty('--shade',r.shade);room.style.setProperty('--ar',r.ar);room.style.setProperty('--photo','url('+r.img+')')}
  document.querySelectorAll('.T-rooms button').forEach(function(b){b.onclick=function(){
    setRoom(b.dataset.room);room.classList.remove('own');['left','top','width','height'].forEach(function(p){wall.style[p]=''});paint();
    document.querySelectorAll('.T-rooms button').forEach(function(x){x.setAttribute('aria-pressed',x===b)})}});
  /* your own wall */
  $('T-file').onchange=function(e){var f=e.target.files[0];if(!f)return;
    var own=$('T-own');own.src=URL.createObjectURL(f);own.onload=function(){room.style.setProperty('--ar',own.naturalWidth/own.naturalHeight)};
    room.classList.add('own');room.dataset.room='own';
    wall.style.left='10%';wall.style.top='8%';wall.style.width='80%';wall.style.height='55%';
    room.classList.remove('comparing');$('T-compare').setAttribute('aria-pressed',false);setSplit(0);
    document.querySelectorAll('.T-rooms button').forEach(function(x){x.setAttribute('aria-pressed',false)})};
  var drag=null;
  wall.addEventListener('pointerdown',function(e){if(!room.classList.contains('own'))return;
    var r=room.getBoundingClientRect(),w=wall.getBoundingClientRect();
    drag={resize:e.target.classList.contains('T-grip'),x:e.clientX,y:e.clientY,l:w.left-r.left,t:w.top-r.top,w:w.width,h:w.height,r:r};
    wall.setPointerCapture(e.pointerId);e.preventDefault()});
  wall.addEventListener('pointermove',function(e){if(!drag)return;var dx=e.clientX-drag.x,dy=e.clientY-drag.y,R=drag.r,pc=function(v,d){return v/d*100+'%'};
    if(drag.resize){wall.style.width=pc(Math.max(40,drag.w+dx),R.width);wall.style.height=pc(Math.max(40,drag.h+dy),R.height)}
    else{wall.style.left=pc(drag.l+dx,R.width);wall.style.top=pc(drag.t+dy,R.height)}});
  wall.addEventListener('pointerup',function(){drag=null});
  /* before and after */
  function setSplit(p){p=Math.min(100,Math.max(0,p));plain.style.clipPath='inset(0 '+(100-p)+'% 0 0)';handle.style.left=p+'%'}
  $('T-compare').onclick=function(){var on=room.classList.toggle('comparing');this.setAttribute('aria-pressed',on);setSplit(on?50:0)};
  handle.addEventListener('pointerdown',function(e){handle.setPointerCapture(e.pointerId);handle.dragging=true});
  handle.addEventListener('pointermove',function(e){if(!handle.dragging)return;var r=room.getBoundingClientRect();setSplit((e.clientX-r.left)/r.width*100)});
  handle.addEventListener('pointerup',function(){handle.dragging=false});
  setRoom('living');showKind('pattern');setWall(0);
})();
