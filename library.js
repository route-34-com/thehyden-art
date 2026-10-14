/* The Wallpaper Library */
(function(){
  /* key, name, room photo, full artwork, repeat? (1 = repeating pattern, 0 = one continuous mural) */
  var D=[
    ['parrot','Parrot garden','img/g/007.jpg','img/wall-parrot.jpg',1],['thota','Thota','img/g/017.jpg','img/wall-thota.jpg',0],['whispers','Whispers in Bloom','img/g/085.jpg','img/wall-whispers.jpg',0],['muggu','Muggu & pink elephants','img/g/166.jpg','img/wall-muggu.jpg',1],
    ['white-lotus','White Lotus','img/g/035.jpg','img/wall-white-lotus.jpg',0],['trellis','Floral trellis','img/g/003.jpg','img/wall-trellis.jpg',0],['rooted','Rooted Reverie','img/g/047.jpg','img/wall-rooted.jpg',0],['origami','Lotus & origami birds','img/g/053.jpg','img/wall-origami.jpg',1],
    ['blossom','Blossoms','img/g/004.jpg','img/wall-blossom.jpg',0],['folkscape','Folkscape','img/g/084.jpg','img/wall-folkscape.jpg',0],['kolam','Coconut & Kolam','img/g/150.jpg','img/wall-kolam.jpg',1],['blush','Blush Botanica','img/g/070.jpg','img/wall-blush.jpg',0],
    ['nabhi','Nabhi Kamalam','img/w11.jpg','img/wall-nabhi.jpg',0],['monkey','Motif & Monkey','img/g/068.jpg','img/wall-monkey.jpg',0],['lotus-whispers','Lotus Whispers','img/g/052.jpg','img/wall-lotus-whispers.jpg',0],['playroom','The Playroom','img/g/023.jpg','img/wall-playroom.jpg',0],
    ['lamps','Kerosene lamps','img/g/163.jpg','img/wall-lamps.jpg',0],['pastel','Nabhi Kamalam, pastel','img/g/009.jpg','img/wall-pastel.jpg',0],['palms','Lotus & palms','img/w09.jpg','img/wall-palms.jpg',0],['linen','','','',0]];
  var bays=document.getElementById('lib-bays'), per=7, seed=7;
  function rnd(){seed=(seed*16807)%2147483647;return (seed-1)/2147483646}
  /* a showroom keeps several rolls of each design: every design once, then repeats, plus two plain stock rolls */
  var slots=[],nD=D.length-1; for(var i=0;i<nD;i++) slots.push(i);
  var extra=[3,0,7,10,1,5,12,8,2,15,4,9,13,6]; slots=slots.concat(extra); slots.splice(17,0,nD); slots.push(nD);
  for(var j=slots.length-1;j>0;j--){var k=Math.floor(rnd()*(j+1)),t=slots[j];slots[j]=slots[k];slots[k]=t}
  for(var b=0;b<slots.length/per;b++){
    var bay=document.createElement('div');bay.className='L-bay';
    for(var r=0;r<per;r++){
      var di=slots[b*per+r], d=D[di], el=document.createElement('button');
      el.type='button';el.className='L-roll'+(d[1]?'':' L-stock');
      el.style.setProperty('--p','url(img/shelf/'+d[0]+'.jpg)');
      el.style.setProperty('--d',(.9+rnd()*.1).toFixed(3));
      el.style.setProperty('--x',Math.round(rnd()*-400)+'px');
      el.style.setProperty('--off',Math.round(rnd()*10)+'px');
      el.style.setProperty('--paper',['#efe8db','#ece3d2','#f2ece1','#e8dfcf'][Math.floor(rnd()*4)]);
      if(d[1]){el.setAttribute('aria-label','Unroll '+d[1]);el.dataset.i=di}else{el.tabIndex=-1;el.setAttribute('aria-hidden','true')}
      el.innerHTML='<span class="L-r"><span class="L-shade"></span><span class="L-body"></span><span class="L-end"></span>'+(d[1]?'<span class="L-tag"></span>':'')+'</span>';
      if(d[1]) el.querySelector('.L-tag').textContent=d[1];
      bay.appendChild(el);
    }
    bays.appendChild(bay);
  }
  /* size the rolls so each compartment is filled edge to edge */
  function fit(){var b=bays.firstChild,cs=getComputedStyle(b),inner=b.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom);
    bays.style.setProperty('--rh',Math.max(40,Math.floor((inner-(per-1)*4)/per))+'px')}
  fit(); addEventListener('resize',fit);

  /* unroll: the roll lifts off the shelf, travels up, and a length of paper drops from it */
  var veil=document.getElementById('lib-veil'), pv=document.getElementById('lib-preview'), hang=document.getElementById('lib-hang'), busy=false, cur=null;
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function rectOf(el){var r=el.querySelector('.L-r').getBoundingClientRect();return {x:r.left,y:r.top,w:r.width,h:r.height}}
  function target(){var hr=hang.getBoundingClientRect(), w=hr.width, h=Math.min(110,Math.max(64,w*.11));return {x:hr.left,y:hr.top,w:w,h:h}}
  function openRoll(el){
    if(busy) return; busy=true; var d=D[+el.dataset.i]; cur={el:el,d:d};
    document.getElementById('lib-pv-name').textContent=d[1];
    var img=document.getElementById('lib-pv-room'); img.src=d[2]; img.alt=d[1]+' on a wall';
    document.getElementById('lib-pv-cap').textContent=d[1]+', on a wall';
    veil.classList.add('L-open'); pv.classList.add('L-open');
    var S=rectOf(el), T=target();
    var fly=document.createElement('div'); fly.className='L-fly';
    fly.style.cssText+='width:'+T.w+'px;height:'+T.h+'px;--sh:'+T.h+'px;';
    fly.innerHTML='<div class="L-roll-in L-roll" style="--rh:'+T.h+'px;--d:1;--p:'+el.style.getPropertyValue('--p')+';--paper:'+el.style.getPropertyValue('--paper')+';--x:'+el.style.getPropertyValue('--x')+'">'+el.querySelector('.L-r').outerHTML.replace(/<span class="L-tag">.*?<\/span>/,'')+'</div><div class="L-sheet"></div>';
    var sh=fly.querySelector('.L-sheet'), rep=!!d[4];
    sh.style.setProperty('--sp','url('+d[3]+')'); sh.style.setProperty('--ss',rep?'50% auto':'cover'); sh.style.setProperty('--sr',rep?'repeat':'no-repeat');
    var room=hang.clientHeight>10?hang.clientHeight-T.h*.62:innerHeight-T.y-T.h*.62-Math.max(24,innerHeight*.05);
    sh.style.setProperty('--sheetH',Math.max(160,room)+'px');
    fly.style.transform='translate('+S.x+'px,'+S.y+'px) scale('+(S.w/T.w)+','+(S.h/T.h)+')';
    document.body.appendChild(fly); cur.fly=fly; el.classList.add('L-away');
    fly.getBoundingClientRect();
    fly.style.transition=reduce?'none':'transform .95s cubic-bezier(.65,0,.2,1)';
    fly.style.transform='translate('+T.x+'px,'+T.y+'px) scale(1,1)';
    setTimeout(function(){sh.classList.add('L-down');pv.classList.add('L-shown');document.getElementById('lib-close').focus({preventScroll:true});busy=false},reduce?0:900);
  }
  function closeRoll(){
    if(!cur||busy) return; busy=true; var fly=cur.fly, el=cur.el, sh=fly.querySelector('.L-sheet');
    pv.classList.remove('L-shown'); sh.classList.remove('L-down');
    setTimeout(function(){
      var S=rectOf(el), T=target();
      fly.style.transform='translate('+S.x+'px,'+S.y+'px) scale('+(S.w/T.w)+','+(S.h/T.h)+')';
      veil.classList.remove('L-open');
      setTimeout(function(){el.classList.remove('L-away');fly.remove();pv.classList.remove('L-open');el.focus({preventScroll:true});cur=null;busy=false},reduce?0:950);
    },reduce?0:1100);
  }
  bays.addEventListener('click',function(e){var el=e.target.closest('.L-roll');if(el&&!el.classList.contains('L-stock'))openRoll(el)});
  document.getElementById('lib-close').addEventListener('click',closeRoll);
  veil.addEventListener('click',closeRoll);
  addEventListener('keydown',function(e){if(e.key==='Escape')closeRoll()});
})();
