// Review-only toggle between the current page and the proposal. Remove before launch.
(function(){
  var here=/proposed\.html$/.test(location.pathname)?'proposed':'current';
  var ids=['designs','projects','founder','studio','archive','enquire'];
  function nearest(){
    var best='';
    ids.forEach(function(id){var el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<innerHeight*.5)best=id});
    return best?'#'+best:'';
  }
  var css=document.createElement('style');
  css.textContent=
    '.cmp{position:fixed;right:12px;bottom:6px;z-index:55;display:flex;align-items:center;gap:2px;background:#fff;border:1px solid #000;border-radius:999px;padding:3px;font:400 14px/1 "Hoefler Text","EB Garamond",Garamond,Georgia,serif;color:#000;box-shadow:0 6px 24px rgba(0,0,0,.08)}'+
    '.cmp a{display:block;padding:9px 16px 8px;border-radius:999px;color:#000;text-decoration:none;transition:box-shadow .3s}'+
    '.cmp a:hover{box-shadow:inset 0 0 0 1px #000}'+
    '.cmp a[aria-current]{box-shadow:inset 0 0 0 1px #000;text-decoration:underline;text-underline-offset:3px}'+
    '.cmp span{padding:0 10px 0 12px;font-size:12px;letter-spacing:.14em;text-transform:uppercase}'+
    '@media (max-width:520px){.cmp span{display:none}.cmp{bottom:10px;right:10px}}';
  document.head.appendChild(css);
  var bar=document.createElement('nav');
  bar.className='cmp';bar.setAttribute('aria-label','Compare versions');
  bar.innerHTML='<span>Compare</span><a href="index.html" data-v="current">Current</a><a href="proposed.html" data-v="proposed">Proposed</a>';
  bar.querySelectorAll('a').forEach(function(a){
    if(a.dataset.v===here)a.setAttribute('aria-current','page');
    a.addEventListener('click',function(e){e.preventDefault();if(a.dataset.v===here)return;location.href=a.getAttribute('href')+nearest()});
  });
  document.body.appendChild(bar);
})();
