// The one list of her designs. Every page reads names, Instagram posts and images from here:
// homepage murals, Painted Wheel, marquee, the Wallpaper Library, Try it on, and the Collections page.
(function(){
  /* key (also the Library shelf texture img/shelf/<key>.jpg): name, Telugu name, short note, kind (pattern | mural),
     try-on tile size and position, Instagram post, Library repeat flag, images. art = flat artwork, room = on a wall. */
  var P='pattern', M='mural';
  function d(name,note,kind,tile,pos,ig,more){
    var o={name:name,note:note,kind:kind,tile:tile,pos:pos,ig:ig,te:'',rep:0,img:{}};
    for(var k in more) o[k]=more[k]; return o;
  }
  var D={
    'parrot':        d('Madhumalika','Birds among blossoms',P,'34%','0 0','p/DdLXJJkymg4',{rep:1,img:{room:'img/g/007.jpg'}}),
    'thota':         d('Thota','An old garden, brought home',M,'cover','50% 40%','p/Dcf1YU4SlSd',{te:'తోట',img:{room:'img/g/017.jpg'}}),
    'whispers':      d('Whispers in Bloom','Birdsong on teal',P,'38%','0 0','p/DLxqWZET1ek',{img:{room:'img/g/085.jpg'}}),
    'muggu':         d('Muggu & Pink Elephants','Playful muggu frames',P,'34%','0 0','p/C8WPCcjPzXY',{rep:1,img:{room:'img/g/166.jpg'}}),
    'white-lotus':   d('White Lotus','Nandi, palms and kolam',M,'cover','40% 50%','p/Da2VGkGyjoe',{img:{room:'img/g/035.jpg'}}),
    'trellis':       d('Vanam','Soft florals on cream',P,'36%','0 0','p/DeCNRlVHU6R',{img:{room:'img/g/003.jpg'}}),
    'rooted':        d('Rooted Reverie','A South Indian village',M,'cover','40% 40%','p/DUF1PLPk_ly',{img:{room:'img/g/047.jpg'}}),
    'origami':       d('Lotus & Origami Birds','Calm, not crowded',P,'32%','0 0','p/DUSnnn6kwWB',{rep:1,img:{room:'img/g/053.jpg'}}),
    'blossom':       d('Songbird Branches','Branches and songbirds',P,'40%','0 0','p/DdjEoORyUux',{img:{room:'img/g/004.jpg'}}),
    'folkscape':     d('Folkscape','Village life, timeless',M,'cover','50% 50%','p/DMhgOi3zvX7',{img:{room:'img/g/084.jpg'}}),
    'kolam':         d('Coconut & Kolam','Tropical, traditional',P,'34%','0 0','p/C8zHOmTSrOI',{rep:1,img:{room:'img/g/150.jpg'}}),
    'blush':         d('Blush Botanica','Soft florals, calm tones',M,'cover','50% 40%','p/DPX_3r8E0Lh',{img:{room:'img/g/070.jpg'}}),
    'nabhi':         d('Nabhi Kamalam','The cosmic lotus, in gold',M,'cover','50% 50%','p/DdYRtDtHWOC',{te:'నాభి కమలం',igFrame:'p/DdFBt24E4U4',
                       img:{room:'img/w11.jpg',frame:'img/w11.jpg',framed:'img/g/010.jpg',stitch:'img/w09.jpg',stitching:'img/g/008.jpg',threads:'img/g/013.jpg'}}),
    'monkey':        d('Motif & Monkey','Where tradition meets mischief',P,'34%','0 0','p/DObbmTnk81l',{img:{room:'img/g/068.jpg'}}),
    'lotus-whispers':d('Lotus Whispers','Lotus vines that flow',M,'cover','50% 0%','p/DUA1cRcExpb',{img:{room:'img/g/052.jpg'}}),
    'playroom':      d('The Playroom','Wooden horses and curious birds',P,'40%','0 0','p/DcBsEJWnU9q',{img:{room:'img/g/023.jpg'}}),
    'lamps':         d('Kerosene Lamps','Lamps and candle stands',P,'60%','0 0','p/C8buStkqcY5',{img:{room:'img/g/163.jpg'}}),
    'pastel':        d('Nabhi Kamalam, Pastel','',M,'cover','50% 50%','',{img:{room:'img/g/009.jpg'}}),
    'palms':         d('Lotus & Palms','',M,'cover','50% 50%','',{img:{room:'img/w09.jpg'}})
  };
  for(var k in D){ D[k].key=k; if(!D[k].img.art) D[k].img.art='img/wall-'+k+'.jpg'; }
  window.DESIGNS=D;

  /* where each design shows up, in order */
  window.SHOW={
    /* homepage murals grid: [key, label, art image, room image, instagram field] */
    murals:[['thota','Mural'],['rooted','Mural'],['white-lotus','Mural'],['lotus-whispers','Mural'],['whispers','Wallpaper'],
            ['blush','Mural'],['folkscape','Mural'],['nabhi','Wall frame','frame','stitch','igFrame']],
    /* Painted Wheel: [key, image field]; the small copy lives at img/ring/<file name> */
    ring:[['thota'],['rooted'],['white-lotus'],['lotus-whispers'],['whispers'],['blush'],['folkscape'],['nabhi','frame'],['playroom'],['muggu'],['parrot'],['kolam']],
    marquee:['thota','rooted','white-lotus','lotus-whispers','whispers','blush','folkscape','nabhi','parrot'],
    /* Library order sets the shelf layout (library.js shuffles by index), keep it stable */
    library:['parrot','thota','whispers','muggu','white-lotus','trellis','rooted','origami','blossom','folkscape','kolam','blush','nabhi','monkey','lotus-whispers','playroom','lamps','pastel','palms'],
    tryon:['playroom','monkey','whispers','origami','muggu','lamps','kolam','trellis','parrot','blossom','thota','rooted','folkscape','white-lotus','lotus-whispers','blush','nabhi']
  };

  /* Collections page: category -> sub-categories -> items [name, sub key, images (first = card), instagram path or ''] */
  var g=function(n){return 'img/g/'+n+'.jpg'};
  var c=function(s,n){var a=[];for(var i=1;i<=n;i++)a.push('img/c/'+s+'-'+i+'.jpg');return a};
  var w=function(key,sub){var x=D[key];return [x.name,sub,[x.img.room,x.img.art],x.ig]};
  var N=D.nabhi;
  window.COLLECTIONS=[
    {key:'wallpapers',cover:'img/g/003.jpg',name:'Wallpapers',line:'Repeating patterns and full-wall murals, painted by hand.',
     subs:[['patterns','Patterns'],['murals','Murals']],
     items:['parrot','trellis','blossom','whispers','muggu','origami','kolam','monkey','playroom','lamps'].map(function(k){return w(k,'patterns')})
       .concat(['thota','rooted','white-lotus','lotus-whispers','blush','folkscape'].map(function(k){return w(k,'murals')}))},
    {key:'decals',cover:'img/c/elephants-t.jpg',name:'Decals',line:'Painted motifs for walls, shelves and niches, on their own or together.',
     subs:[['single','Ekam','Solos'],['pairings','Jodi','Duos & Sets'],['repeats','Mala','Patterns'],['scenes','Katha','Storyscapes']],
     items:[
      ['Krishna Jinka','single',c('blackbuck',2),''],
      ['Nandi Kamalam','single',c('nandi-lotus',1),''],
      ['Mandaram','single',c('hibiscus',3),''],
      ['Mandara Kommalu','single',c('hibiscus-window',3),''],
      ['Chirutha','pairings',c('cheetah-arches',2),''],
      ['Jinka Pilla','pairings',c('fawn-niche',4),''],
      ['Jinka Jodi','pairings',c('fawns-shelf',3),''],
      ['Hamsa Jodi','repeats',c('swans',2),''],
      ['Ambari','repeats',c('elephants',3),''],
      ['Pitta Katha','scenes',c('birds-arches',2),''],
      ['Pachha Pittalu','scenes',c('green-birds',2),'']]},
    {key:'borders',cover:'img/c/lotus-vine-t.jpg',name:'Borders',line:'Painted bands for dados, door frames and the line between two finishes.',
     subs:[['single','Anchu','Classic Edges'],['layered','Pattu Anchu','Layered Edges']],
     items:[
      ['Kamala Theega','single',c('lotus-vine',2),''],
      ['Chilaka Anchu','single',c('parrot-band',2),''],
      ['Poola Anchu','single',c('blossom-band',2),''],
      ['Matti Anchu','single',c('terracotta-band',2),''],
      /* from her Instagram feed (img/g) */
      ['Malle Anchu','single',[g('116')],'p/DHLYf80zRvF'],
      ['Theega Anchu','single',[g('114')],'p/DFxesGtT3fH'],
      ['Sannani Anchu','single',[g('112')],'p/DF-e0JZTG0w'],
      ['Gulabi Anchu','single',[g('046')],'reel/DVwCeqEk1k9'],
      ['Gadapa','layered',c('door-frame',2),''],
      ['Neeli Varusa','layered',c('indigo-bands',2),''],
      ['Chiguru Varusa','layered',c('motif-line',2),''],
      ['Pachha Anchu','layered',[g('024')],'p/DcNz44USgrm'],
      ['Toranam','layered',[g('104')],'p/DJlgBiZT1Ce'],
      ['Neeli Jali','layered',[g('064')],'reel/DQGntNQk8uS']]},
    {key:'embroidery',cover:g('074'),name:'Embroidery',line:'Hand-embroidered artworks from the studio.',
     subs:[],
     items:[
      ['Seeta Ramakalyanam','',[g('074'),g('080'),g('076')],'p/DNqPV4kT9iY'],
      [N.name,'',[N.img.stitch,'img/g/011.jpg',N.img.stitching,N.img.threads],N.igFrame]]},
    {key:'frames',cover:N.img.framed,name:'Wall frames',line:'Her paintings, framed for the wall.',
     subs:[],
     items:[
      [N.name+', framed in gold','',[N.img.framed,N.img.frame],N.igFrame],
      ['Heirloom Weave','',[g('029')],'p/DbC2W8LHUNd'],
      ['Gaja Seva','',[g('142')],'p/C91-htazqda'],
      ['Alankaram','',[g('143')],'p/C9ropsjTw9Y'],
      ['Veena','',[g('137')],'p/C-IVfhlTy9K'],
      ['Nrityam','',[g('040')],'p/DXrMj9-E8j7'],
      ['Poola Gadulu','',[g('125')],'p/DBi7xO-yv3H'],
      ['Chitra Varusa','',[g('033')],'p/DZmuPvIyPvr']]}
  ];

  /* extra English words so search finds Telugu-named designs (name -> words) */
  window.KEYWORDS={
    'Madhumalika':'parrot garden birds','Vanam':'floral trellis flowers','Krishna Jinka':'blackbuck deer antelope','Nandi Kamalam':'nandi bull lotus',
    'Mandaram':'hibiscus flower','Mandara Kommalu':'hibiscus flowers branch','Chirutha':'cheetah leopard arches','Jinka Pilla':'fawn deer niche',
    'Jinka Jodi':'fawns deer shelf pair','Hamsa Jodi':'swans swan pair','Ambari':'elephants elephant howdah temple','Pitta Katha':'birds vine arches story',
    'Pachha Pittalu':'green birds branch','Kamala Theega':'lotus vine','Chilaka Anchu':'parrot band','Poola Anchu':'flowers blossom band',
    'Matti Anchu':'terracotta earth band','Malle Anchu':'jasmine mogra cornice gold','Theega Anchu':'vine leaf band','Sannani Anchu':'thin floral band peacock',
    'Gulabi Anchu':'pink floral band','Gadapa':'door frame doorway threshold','Neeli Varusa':'blue indigo bands stripes','Chiguru Varusa':'leaf motifs line',
    'Pachha Anchu':'green band elephants palms','Toranam':'arches arch floral','Neeli Jali':'blue lattice tiles','Seeta Ramakalyanam':'sita rama wedding kalyanam under sacred skies',
    'Gaja Seva':'elephant parasol umbrella devotees','Alankaram':'deity lotus jewellery','Veena':'music veena','Nrityam':'dance dancer',
    'Poola Gadulu':'flowers botanical grid tiles','Chitra Varusa':'miniature frames row','Heirloom Weave':'weave textile print'
  };

  /* one place that builds every enquiry link on the site */
  window.hydenAsk=function(text){
    var S=window.SETTINGS||{}, n=String(S.whatsapp||'').replace(/\D/g,''), t=encodeURIComponent(text);
    return {wa:n?'https://wa.me/'+n+'?text='+t:'', ig:'https://ig.me/m/thehyden.art?text='+t};
  };
})();
