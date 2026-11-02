/* Font preview for the client. Hidden for normal visitors; open any page with ?fonts to show it (remembered in this browser, ?fonts=off hides it). */
(function(){
  var OPTS=[
    ['newsreader','Newsreader','Manrope','Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400;1,6..72,500','Manrope:wght@400;500;600;700'],
    ['dm','DM Serif Display','DM Sans','DM+Serif+Display:ital@0;1','DM+Sans:wght@400;500;600;700'],
    ['playfair','Playfair Display','Lato','Playfair+Display:ital,wght@0,400;0,500;1,400','Lato:wght@400;700'],
    ['prata','Prata','Mulish','Prata','Mulish:wght@400;500;600;700'],
    ['instrument','Instrument Serif','Inter','Instrument+Serif:ital@0;1','Inter:wght@400;500;600;700'],
    ['marcellus','Marcellus','Jost','Marcellus','Jost:wght@400;500;600;700']
  ];
  var KEY='hyden-font', PKEY='hyden-fontpanel', store={get:function(k){try{return localStorage.getItem(k)}catch(e){return null}},set:function(k,v){try{v===null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}};
  var q=new URLSearchParams(location.search).get('fonts');
  if(q==='off'){store.set(PKEY,null);store.set(KEY,null)} else if(q!==null) store.set(PKEY,'1');
  var panel=store.get(PKEY)==='1';
  function css(fams){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?'+fams.map(function(f){return 'family='+f}).join('&')+'&display=swap';document.head.appendChild(l)}
  function apply(id){
    var o=OPTS.filter(function(x){return x[0]===id})[0]; if(!o) return;
    var r=document.documentElement.style, h='"'+o[1]+'",Georgia,serif', b='"'+o[2]+'","Helvetica Neue",Arial,sans-serif';
    r.setProperty('--display',h);r.setProperty('--serif',h);r.setProperty('--sans',b);
  }
  var cur=store.get(KEY);
  if(!panel) return;
  if(cur&&cur!=='newsreader'){var o0=OPTS.filter(function(x){return x[0]===cur})[0];if(o0){css([o0[3],o0[4]]);apply(cur)}}
  cur=cur||'newsreader';
  function build(){
    css(OPTS.slice(1).reduce(function(a,o){return a.concat([o[3],o[4]])},[]));
    var s=document.createElement('style');s.textContent=
      '.fp{position:fixed;left:16px;bottom:16px;z-index:300;font:500 13px/1.3 system-ui,sans-serif;color:#2d2a26}'+
      '.fp-tog{display:flex;align-items:center;gap:8px;background:#2d2a26;color:#fff;border-radius:999px;padding:11px 16px;box-shadow:0 6px 20px rgba(0,0,0,.18);cursor:pointer;border:0;font:inherit}'+
      '.fp-box{position:absolute;left:0;bottom:52px;width:min(330px,calc(100vw - 32px));max-height:calc(100svh - 90px);overflow:auto;background:#fff;border-radius:14px;box-shadow:0 18px 50px rgba(0,0,0,.2);padding:8px}'+
      '.fp-box[hidden]{display:none}'+
      '.fp-o{display:block;width:100%;text-align:left;border:1px solid transparent;border-radius:10px;padding:10px 12px;background:none;cursor:pointer;color:inherit}'+
      '.fp-o:hover{background:#f4f1ec}.fp-o[aria-pressed="true"]{border-color:#2d2a26;background:#faf8f5}'+
      '.fp-o b{display:block;font-weight:400;font-size:26px;line-height:1.1}.fp-o b em{font-style:italic}'+
      '.fp-o span{display:block;font-size:14px;margin-top:4px;opacity:.8}.fp-o small{display:block;font:500 11px/1 system-ui,sans-serif;letter-spacing:.06em;opacity:.55;margin-top:8px}'+
      '.fp-send{display:block;text-align:center;margin:8px 4px 4px;background:#2d2a26;color:#fff;border-radius:999px;padding:12px;text-decoration:none}';
    document.head.appendChild(s);
    var w=document.createElement('div');w.className='fp';
    w.innerHTML='<div class="fp-box" id="fp-box" hidden role="dialog" aria-label="Fonts">'+OPTS.map(function(o,i){
      return '<button type="button" class="fp-o" data-id="'+o[0]+'" aria-pressed="'+(o[0]===cur)+'"><b style="font-family:\''+o[1]+'\'">thehyden.<em>art</em></b><span style="font-family:\''+o[2]+'\'">Hand-painted Indian heritage, for your walls.</span><small>'+(i+1)+'. '+o[1]+' + '+o[2]+'</small></button>'}).join('')+
      '<a class="fp-send" id="fp-send" target="_blank" rel="noopener"></a></div><button type="button" class="fp-tog" id="fp-tog" aria-expanded="false">Aa <span id="fp-cur"></span></button>';
    document.body.appendChild(w);
    var box=w.querySelector('#fp-box'), tog=w.querySelector('#fp-tog');
    function label(){var o=OPTS.filter(function(x){return x[0]===cur})[0],n=OPTS.indexOf(o)+1;
      w.querySelector('#fp-cur').textContent=n+'. '+o[1];
      w.querySelector('#fp-send').textContent='Send choice '+n+' on WhatsApp';
      w.querySelector('#fp-send').href='https://wa.me/?text='+encodeURIComponent('thehyden.art font choice: '+n+'. '+o[1]+' + '+o[2])}
    tog.onclick=function(){box.hidden=!box.hidden;tog.setAttribute('aria-expanded',!box.hidden)};
    [].forEach.call(w.querySelectorAll('.fp-o'),function(b){b.onclick=function(){
      cur=b.dataset.id;store.set(KEY,cur);apply(cur);
      [].forEach.call(w.querySelectorAll('.fp-o'),function(x){x.setAttribute('aria-pressed',x===b)});label();
      dispatchEvent(new Event('resize'))}});
    label();
  }
  if(document.body) build(); else addEventListener('DOMContentLoaded',build);
})();
