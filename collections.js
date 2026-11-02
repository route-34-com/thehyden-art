// Collections: category -> sub-categories -> designs. Each design: [name, sub key, images (first = card), instagram path or '']
(function(){
  var c=function(s,n){var a=[];for(var i=1;i<=n;i++)a.push('img/c/'+s+'-'+i+'.jpg');return a};
  window.COLLECTIONS=[
    {key:'wallpapers',cover:'img/g/003.jpg',name:'Wallpapers',line:'Repeating patterns and full-wall murals, painted by hand.',
     subs:[['patterns','Patterns'],['murals','Murals']],
     items:[
      ['Parrot Garden','patterns',['img/g/007.jpg','img/wall-parrot.jpg'],'p/DdLXJJkymg4'],
      ['Floral Trellis','patterns',['img/g/003.jpg','img/wall-trellis.jpg'],'p/DeCNRlVHU6R'],
      ['Songbird Branches','patterns',['img/g/004.jpg','img/wall-blossom.jpg'],'p/DdjEoORyUux'],
      ['Whispers in Bloom','patterns',['img/g/085.jpg','img/wall-whispers.jpg'],'p/DLxqWZET1ek'],
      ['Muggu & Pink Elephants','patterns',['img/g/166.jpg','img/wall-muggu.jpg'],'p/C8WPCcjPzXY'],
      ['Lotus & Origami Birds','patterns',['img/g/053.jpg','img/wall-origami.jpg'],'p/DUSnnn6kwWB'],
      ['Coconut & Kolam','patterns',['img/g/150.jpg','img/wall-kolam.jpg'],'p/C8zHOmTSrOI'],
      ['Motif & Monkey','patterns',['img/g/068.jpg','img/wall-monkey.jpg'],'p/DObbmTnk81l'],
      ['The Playroom','patterns',['img/g/023.jpg','img/wall-playroom.jpg'],'p/DcBsEJWnU9q'],
      ['Kerosene Lamps','patterns',['img/g/163.jpg','img/wall-lamps.jpg'],'p/C8buStkqcY5'],
      ['Thota','murals',['img/g/017.jpg','img/wall-thota.jpg'],'p/Dcf1YU4SlSd'],
      ['Rooted Reverie','murals',['img/g/047.jpg','img/wall-rooted.jpg'],'p/DUF1PLPk_ly'],
      ['White Lotus','murals',['img/g/035.jpg','img/wall-white-lotus.jpg'],'p/Da2VGkGyjoe'],
      ['Lotus Whispers','murals',['img/g/052.jpg','img/wall-lotus-whispers.jpg'],'p/DUA1cRcExpb'],
      ['Blush Botanica','murals',['img/g/070.jpg','img/wall-blush.jpg'],'p/DPX_3r8E0Lh'],
      ['Folkscape','murals',['img/g/084.jpg','img/wall-folkscape.jpg'],'p/DMhgOi3zvX7']]},
    {key:'decals',cover:'img/c/elephants-t.jpg',name:'Decals',line:'Painted motifs for walls, shelves and niches, on their own or together.',
     subs:[['single','Single motifs'],['pairings','Pairings'],['repeats','Repeats'],['scenes','Scenes']],
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
     subs:[['single','Single bands'],['layered','Layered borders']],
     items:[
      ['Lotus vine','single',c('lotus-vine',2),''],
      ['Parrot band','single',c('parrot-band',2),''],
      ['Blossom band','single',c('blossom-band',2),''],
      ['Terracotta band','single',c('terracotta-band',2),''],
      ['Door frame','layered',c('door-frame',2),''],
      ['Indigo bands','layered',c('indigo-bands',2),''],
      ['Motifs on a line','layered',c('motif-line',2),'']]},
    {key:'embroidery',cover:'img/w09.jpg',name:'Embroidery',line:'Hand-embroidered artworks from the studio.',
     subs:[],
     items:[
      ['Nabhi Kamalam','',['img/w09.jpg','img/g/008.jpg','img/g/013.jpg'],'p/DdFBt24E4U4']]},
    {key:'frames',cover:'img/g/010.jpg',name:'Wall frames',line:'Her paintings, framed for the wall.',
     subs:[],
     items:[
      ['Nabhi Kamalam, framed in gold','',['img/g/010.jpg','img/w11.jpg'],'p/DdFBt24E4U4']]}
  ];
  /* one place that builds every enquiry link on the site */
  window.hydenAsk=function(text){
    var S=window.SETTINGS||{}, n=String(S.whatsapp||'').replace(/\D/g,''), t=encodeURIComponent(text);
    return {wa:n?'https://wa.me/'+n+'?text='+t:'', ig:'https://ig.me/m/thehyden.art?text='+t};
  };
})();
