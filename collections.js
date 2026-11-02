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
    'parrot':        d('Parrot Garden','Birds among blossoms',P,'34%','0 0','p/DdLXJJkymg4',{rep:1,img:{room:'img/g/007.jpg'}}),
    'thota':         d('Thota','An old garden, brought home',M,'cover','50% 40%','p/Dcf1YU4SlSd',{te:'తోట',img:{room:'img/g/017.jpg'}}),
    'whispers':      d('Whispers in Bloom','Birdsong on teal',P,'38%','0 0','p/DLxqWZET1ek',{img:{room:'img/g/085.jpg'}}),
    'muggu':         d('Muggu & Pink Elephants','Playful muggu frames',P,'34%','0 0','p/C8WPCcjPzXY',{rep:1,img:{room:'img/g/166.jpg'}}),
    'white-lotus':   d('White Lotus','Nandi, palms and kolam',M,'cover','40% 50%','p/Da2VGkGyjoe',{img:{room:'img/g/035.jpg'}}),
    'trellis':       d('Floral Trellis','Soft florals on cream',P,'36%','0 0','p/DeCNRlVHU6R',{img:{room:'img/g/003.jpg'}}),
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
  var c=function(s,n){var a=[];for(var i=1;i<=n;i++)a.push('img/c/'+s+'-'+i+'.jpg');return a};
  var w=function(key,sub){var x=D[key];return [x.name,sub,[x.img.room,x.img.art],x.ig]};
  var N=D.nabhi;
  window.COLLECTIONS=[
    {key:'wallpapers',cover:'img/g/003.jpg',name:'Wallpapers',line:'Repeating patterns and full-wall murals, painted by hand.',
     subs:[['patterns','Patterns'],['murals','Murals']],
     items:['parrot','trellis','blossom','whispers','muggu','origami','kolam','monkey','playroom','lamps'].map(function(k){return w(k,'patterns')})
       .concat(['thota','rooted','white-lotus','lotus-whispers','blush','folkscape'].map(function(k){return w(k,'murals')}))},
    {key:'decals',cover:'img/c/elephants-t.jpg',name:'Decals',line:'Painted motifs for walls, shelves and niches, on their own or together.',
     subs:[['single','Solos'],['pairings','Duos & Sets'],['repeats','Patterns'],['scenes','Storyscapes']],
     items:[
      ['Blackbuck','single',c('blackbuck',2),''],
      ['Nandi on a lotus','single',c('nandi-lotus',1),''],
      ['Hibiscus','single',c('hibiscus',3),''],
      ['Hibiscus by the window','single',c('hibiscus-window',3),''],
      ['Cheetah in arches','pairings',c('cheetah-arches',2),''],
      ['Fawn by the niche','pairings',c('fawn-niche',4),''],
      ['Fawns on the shelf','pairings',c('fawns-shelf',3),''],
      ['Swan pair','repeats',c('swans',2),''],
      ['Temple elephants','repeats',c('elephants',3),''],
      ['Birds between arches','scenes',c('birds-arches',2),''],
      ['Green birds on a branch','scenes',c('green-birds',2),'']]},
    {key:'borders',cover:'img/c/lotus-vine-t.jpg',name:'Borders',line:'Painted bands for dados, door frames and the line between two finishes.',
     subs:[['single','Classic Edges'],['layered','Layered Edges']],
     items:[
      ['Lotus vine','single',c('lotus-vine',2),''],
      ['Parrot band','single',c('parrot-band',2),''],
      ['Blossom band','single',c('blossom-band',2),''],
      ['Terracotta band','single',c('terracotta-band',2),''],
      ['Door frame','layered',c('door-frame',2),''],
      ['Indigo bands','layered',c('indigo-bands',2),''],
      ['Motifs on a line','layered',c('motif-line',2),'']]},
    {key:'embroidery',cover:N.img.stitch,name:'Embroidery',line:'Hand-embroidered artworks from the studio.',
     subs:[],
     items:[[N.name,'',[N.img.stitch,N.img.stitching,N.img.threads],N.igFrame]]},
    {key:'frames',cover:N.img.framed,name:'Wall frames',line:'Her paintings, framed for the wall.',
     subs:[],
     items:[[N.name+', framed in gold','',[N.img.framed,N.img.frame],N.igFrame]]}
  ];

  /* one place that builds every enquiry link on the site */
  window.hydenAsk=function(text){
    var S=window.SETTINGS||{}, n=String(S.whatsapp||'').replace(/\D/g,''), t=encodeURIComponent(text);
    return {wa:n?'https://wa.me/'+n+'?text='+t:'', ig:'https://ig.me/m/thehyden.art?text='+t};
  };
})();
