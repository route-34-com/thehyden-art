/* thehyden.art · fresh build 14 Oct 2026. No framework, no build step. */
(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const IG = 'https://www.instagram.com/';
const DM = 'https://ig.me/m/thehyden.art';
const S = window.SETTINGS || {};
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
const toast = (() => { const t = $('#toast'); let h; return m => { t.textContent = m; t.classList.add('on'); clearTimeout(h); h = setTimeout(() => t.classList.remove('on'), 2400); }; })();

/* ---------------- the designs: flat artwork + the same design installed ---------------- */
const TYPES = { mural: 'Mural', pattern: 'Wallpaper pattern', frame: 'Wall frame' };
const DESIGNS = [
  ['parrot', 'Parrot Garden', 'pattern', 'wall-parrot', 'w08', 'p/DdLXJJkymg4'],
  ['thota', 'Thota', 'mural', 'wall-thota', 'g/017', 'p/Dcf1YU4SlSd'],
  ['kolam', 'Coconut & Kolam', 'pattern', 'wall-kolam', 'g/150', 'p/C8zHOmTSrOI'],
  ['rooted', 'Rooted Reverie', 'mural', 'wall-rooted', 'g/047', 'p/DUF1PLPk_ly'],
  ['trellis', 'Floral Trellis', 'pattern', 'wall-trellis', 'w04', 'p/DeCNRlVHU6R'],
  ['white-lotus', 'White Lotus', 'mural', 'wall-white-lotus', 'g/035', 'p/Da2VGkGyjoe'],
  ['lamps', 'Kerosene Lamps', 'pattern', 'wall-lamps', 'g/163', 'p/C8buStkqcY5'],
  ['nabhi', 'Nabhi Kamalam', 'frame', 'wall-nabhi', 'w11', 'p/DdYRtDtHWOC'],
  ['blush', 'Blush Botanica', 'mural', 'wall-blush', 'g/070', 'p/DPX_3r8E0Lh'],
  ['muggu', 'Muggu & Pink Elephants', 'pattern', 'wall-muggu', 'g/166', 'p/C8WPCcjPzXY'],
  ['folkscape', 'Folkscape', 'mural', 'wall-folkscape', 'g/084', 'p/DMhgOi3zvX7'],
  ['playroom', 'The Playroom', 'pattern', 'wall-playroom', 'g/023', 'p/DcBsEJWnU9q'],
  ['blossom', 'Blossoms', 'mural', 'wall-blossom', 'w05', 'p/DdjEoORyUux'],
  ['origami', 'Lotus & Origami Birds', 'pattern', 'wall-origami', 'g/053', 'p/DUSnnn6kwWB'],
  ['monkey', 'Motif & Monkey', 'pattern', 'wall-monkey', 'g/068', 'p/DObbmTnk81l'],
  ['lotus-whispers', 'Lotus Whispers', 'pattern', 'wall-lotus-whispers', 'g/052', 'p/DUA1cRcExpb']
].map(([id, name, type, art, room, ig], i) => ({ id, name, type, art: `img/${art}.jpg`, room: `img/${room}.jpg`, ig: IG + ig + '/', no: String(i + 1).padStart(2, '0') }));
const byId = id => DESIGNS.find(d => d.id === id);

/* ---------------- shortlist (shared by cards, sheet, drawer, enquiry) ---------------- */
let saved = store.get('tha-saved', []).filter(byId);
const subs = [];
const onSaved = fn => { subs.push(fn); fn(); };
function toggleSave(id, force) {
  const has = saved.includes(id);
  const want = force ?? !has;
  if (want === has) return;
  saved = want ? [...saved, id] : saved.filter(x => x !== id);
  store.set('tha-saved', saved);
  subs.forEach(f => f());
  if (want) { const b = $('#savedBtn'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump'); }
}
onSaved(() => { const n = $('#savedN'); n.textContent = saved.length; n.classList.toggle('has', saved.length > 0); });

/* ---------------- header ---------------- */
const hdr = $('#hdr');
addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 8), { passive: true });
const menuBtn = $('#menuBtn'), mnav = $('#mnav');
const setMenu = open => { menuBtn.setAttribute('aria-expanded', open); mnav.hidden = !open; document.body.style.overflow = open ? 'hidden' : ''; };
menuBtn.onclick = () => setMenu(mnav.hidden);
mnav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
// active nav link
const navLinks = $$('.nav a');
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) navLinks.forEach(a => a.classList.toggle('on', a.hash === '#' + e.target.id));
}), { rootMargin: '-45% 0px -50% 0px' });
['designs', 'try', 'projects', 'studio', 'archive', 'enquire'].forEach(id => spy.observe($('#' + id)));

/* ---------------- hero filmstrip: drifts on its own, drag or swipe to browse, tap opens the design ---------------- */
const HERO = [['w08', 'parrot'], ['g/017', 'thota'], ['w04', 'trellis'], ['g/047', 'rooted'], ['w05', 'blossom'], ['g/035', 'white-lotus'], ['w11', 'nabhi'], ['g/084', 'folkscape'], ['g/070', 'blush'], ['g/023', 'playroom'], ['g/166', 'muggu'], ['g/150', 'kolam']];
const strip = $('#strip'), track = $('#stripTrack'), heroNow = $('#heroNow');
const heroFig = ([src, id], k) => {
  const d = byId(id);
  return `<figure data-id="${id}"><img src="img/${src}.jpg" alt="${d.name}, installed" ${k > 2 ? 'loading="lazy"' : ''} decoding="async" draggable="false" width="1100" height="1100"></figure>`;
};
track.innerHTML = HERO.map(heroFig).join('') + HERO.map((h, k) => heroFig(h, k + 3)).join('');
$$('img', track).forEach(im => { const ok = () => im.classList.add('ok'); im.complete && im.naturalWidth ? ok() : im.addEventListener('load', ok); });
let pos = 0, half = 0, vel = 0, dragging = false, heroVisible = true, lastT = 0, moved = 0;
const measure = () => { half = track.scrollWidth / 2; };
addEventListener('load', measure); addEventListener('resize', measure); measure();
new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(strip);
let hover = false;
strip.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') hover = true; });
strip.addEventListener('pointerleave', () => { hover = false; });
function tick(t) {
  const dt = Math.min(50, t - (lastT || t)); lastT = t;
  if (heroVisible && !dragging && half) {
    const base = RM ? 0 : (hover ? 8 : 32); // px per second
    vel += (base - vel) * 0.04;
    pos += vel * dt / 1000;
  }
  if (half) { pos = ((pos % half) + half) % half; }
  track.style.transform = `translate3d(${-pos}px,0,0)`;
  // caption: the picture under the middle of the screen
  if (heroVisible) {
    const mid = innerWidth / 2;
    for (const f of track.children) { const r = f.getBoundingClientRect(); if (r.left <= mid && r.right >= mid) { const n = byId(f.dataset.id).name; if (heroNow.textContent !== n) heroNow.textContent = n; break; } }
  }
  requestAnimationFrame(tick);
}
requestAnimationFrame(tick);
let sx = 0, sp = 0, lx = 0, lt = 0;
strip.addEventListener('pointerdown', e => {
  dragging = true; moved = 0; sx = lx = e.clientX; sp = pos; lt = performance.now();
  strip.setPointerCapture(e.pointerId); strip.classList.add('drag');
});
strip.addEventListener('pointermove', e => {
  if (!dragging) return;
  const now = performance.now();
  moved = Math.max(moved, Math.abs(e.clientX - sx));
  pos = sp - (e.clientX - sx);
  vel = -(e.clientX - lx) / Math.max(1, now - lt) * 1000; lx = e.clientX; lt = now;
});
const endDrag = e => {
  if (!dragging) return; dragging = false; strip.classList.remove('drag');
  if (moved < 6) { const f = document.elementFromPoint(e.clientX, e.clientY)?.closest('figure[data-id]'); if (f) openSheet(DESIGNS.indexOf(byId(f.dataset.id))); vel = 0; }
};
strip.addEventListener('pointerup', endDrag);
strip.addEventListener('pointercancel', () => { dragging = false; strip.classList.remove('drag'); });
// horizontal trackpad / wheel scroll moves the strip; vertical scroll still scrolls the page
strip.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); pos += e.deltaX; vel = 0; } }, { passive: false });
strip.style.touchAction = 'pan-y';

/* ---------------- wallpaper ribbon ---------------- */
const BANDS = ['kolam', 'parrot', 'muggu', 'origami'];
$('#ribbon').innerHTML = [...BANDS, ...BANDS].map(b => `<img src="img/band/${b}.jpg" alt="" loading="lazy" decoding="async">`).join('');

/* ---------------- designs grid ---------------- */
const heartSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/></svg>';
const dgrid = $('#dgrid');
dgrid.innerHTML = DESIGNS.map((d, i) => `
  <li class="dcard reveal" data-i="${i}" data-type="${d.type}">
    <a href="#design/${d.id}" aria-label="${d.name}, ${TYPES[d.type]}">
      <div class="ph">
        <img src="${d.art}" alt="${d.name}, the artwork" loading="lazy" decoding="async">
        <img class="room" src="${d.room}" alt="" loading="lazy" decoding="async">
        <span class="tag">On a wall</span>
      </div>
      <div class="cap"><span class="num">${d.no}</span><b>${d.name}</b><small>${TYPES[d.type]}</small></div>
    </a>
    <button class="heart" type="button" aria-pressed="false" aria-label="Save ${d.name} to shortlist">${heartSVG}</button>
  </li>`).join('');
const cards = $$('.dcard', dgrid);
dgrid.addEventListener('click', e => {
  const h = e.target.closest('.heart');
  if (h) { const d = DESIGNS[h.parentElement.dataset.i]; toggleSave(d.id); toast(saved.includes(d.id) ? `${d.name} saved to your shortlist` : `${d.name} removed`); return; }
  const a = e.target.closest('a');
  if (a) { e.preventDefault(); openSheet(+a.parentElement.dataset.i); }
});
onSaved(() => cards.forEach(c => c.querySelector('.heart').setAttribute('aria-pressed', saved.includes(DESIGNS[c.dataset.i].id))));
// touch: a long look shows the installed wall, like hover does
cards.forEach(c => {
  let h; c.addEventListener('touchstart', () => { h = setTimeout(() => c.classList.add('peek'), 260); }, { passive: true });
  ['touchend', 'touchcancel', 'touchmove'].forEach(ev => c.addEventListener(ev, () => { clearTimeout(h); c.classList.remove('peek'); }, { passive: true }));
});
// a few large "feature" cards, chosen so every row ends full (no empty cells)
function layoutFeats() {
  const cols = getComputedStyle(dgrid).gridTemplateColumns.split(' ').length;
  const vis = cards.filter(c => !c.hidden);
  cards.forEach(c => c.classList.remove('feat', 'r'));
  const extra = cols >= 3 ? 3 : 1; // a feature card takes this many extra cells
  let best = 0;
  for (let f = Math.min(4, Math.floor(vis.length / 4)); f >= 0; f--) if ((vis.length + f * extra) % cols === 0) { best = f; break; }
  if (!best) return;
  const step = Math.floor(vis.length / best);
  for (let k = 0; k < best; k++) vis[k * step].classList.add('feat', ...(k % 2 ? ['r'] : []));
}
let dFilter = 'all';
$('#dFilters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  dFilter = b.dataset.f;
  $$('#dFilters button').forEach(x => x.setAttribute('aria-pressed', x === b));
  // FLIP: animate cards from their old spot to the new one
  const first = new Map(cards.map(c => [c, c.getBoundingClientRect()]));
  cards.forEach(c => { c.hidden = dFilter !== 'all' && c.dataset.type !== dFilter; });
  layoutFeats();
  if (RM) return;
  cards.forEach(c => {
    if (c.hidden) return;
    const a = first.get(c), z = c.getBoundingClientRect();
    if (!a.width) { c.animate([{ opacity: 0, transform: 'scale(.96)' }, { opacity: 1, transform: 'none' }], { duration: 450, easing: 'cubic-bezier(.2,.7,.1,1)' }); return; }
    c.animate([{ transform: `translate(${a.left - z.left}px,${a.top - z.top}px) scale(${a.width / z.width},${a.height / z.height})`, transformOrigin: '0 0' }, { transform: 'none', transformOrigin: '0 0' }], { duration: 550, easing: 'cubic-bezier(.2,.7,.1,1)' });
  });
});
layoutFeats();
let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(layoutFeats, 150); });

/* ---------------- design sheet ---------------- */
const sheet = $('#sheet'), svArt = $('#svArt'), svRoom = $('#svRoom'), svWall = $('#svWall'), loupe = $('#loupe'), svPane = $('#svPane');
let cur = -1, view = 'art', lastFocus = null;
function openSheet(i, push = true) {
  if (i < 0) return;
  cur = (i + DESIGNS.length) % DESIGNS.length;
  const d = DESIGNS[cur];
  if (sheet.hidden) { lastFocus = document.activeElement; sheet.hidden = false; document.body.style.overflow = 'hidden'; }
  $('#shNo').textContent = `No. ${d.no} of ${DESIGNS.length}`;
  $('#shName').textContent = d.name;
  $('#shType').textContent = TYPES[d.type];
  $('#shIG').href = d.ig;
  svArt.src = d.art; svArt.alt = `${d.name}, the artwork`;
  svRoom.src = d.room; svRoom.alt = `${d.name}, installed`;
  svWall.style.backgroundImage = `url(${d.art})`;
  $('[data-v=wall]', sheet).hidden = d.type !== 'pattern';
  setView(view === 'wall' && d.type !== 'pattern' ? 'art' : view);
  syncSheetSave();
  if (push) history.replaceState(null, '', '#design/' + d.id);
  $('#shClose').focus({ preventScroll: true });
  // warm the neighbours
  [cur + 1, cur - 1].forEach(k => { const n = DESIGNS[(k + DESIGNS.length) % DESIGNS.length]; new Image().src = n.art; });
}
function closeSheet() {
  sheet.hidden = true; document.body.style.overflow = '';
  history.replaceState(null, '', location.pathname + location.search);
  lastFocus?.focus?.({ preventScroll: true });
}
function setView(v) {
  view = v;
  $$('.sv-tabs button', sheet).forEach(b => b.setAttribute('aria-selected', b.dataset.v === v));
  svArt.hidden = v !== 'art'; svRoom.hidden = v !== 'room'; svWall.hidden = v !== 'wall';
  $('#svHint').textContent = v === 'art' ? 'Move over the artwork to see the brushwork up close.' : v === 'room' ? 'The design, installed.' : 'The pattern repeated across a wall.';
  if (v === 'wall') svWall.style.backgroundSize = 'auto 34%';
}
const syncSheetSave = () => { if (cur < 0) return; const on = saved.includes(DESIGNS[cur].id); const b = $('#shSave'); b.setAttribute('aria-pressed', on); b.querySelector('span').textContent = on ? 'Saved to shortlist' : 'Save to shortlist'; };
onSaved(syncSheetSave);
$('.sv-tabs', sheet).addEventListener('click', e => { const b = e.target.closest('button'); if (b) setView(b.dataset.v); });
$('#shClose').onclick = closeSheet;
$('#shPrev').onclick = () => openSheet(cur - 1);
$('#shNext').onclick = () => openSheet(cur + 1);
$('#shSave').onclick = () => toggleSave(DESIGNS[cur].id);
$('#shAsk').onclick = () => { toggleSave(DESIGNS[cur].id, true); closeSheet(); goEnquire(); };
$('#shTry').onclick = () => { const id = DESIGNS[cur].id; closeSheet(); tryPickDesign(id); $('#try').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); };
// loupe: 2.6x magnifier over the flat artwork
const ZOOM = 2.6;
// the artwork is object-fit:contain, so work out where the picture itself sits
function artRect() {
  const b = svArt.getBoundingClientRect(), nw = svArt.naturalWidth || 1, nh = svArt.naturalHeight || 1, k = Math.min(b.width / nw, b.height / nh);
  const w = nw * k, h = nh * k, left = b.left + (b.width - w) / 2, top = b.top + (b.height - h) / 2;
  return { left, top, width: w, height: h, right: left + w, bottom: top + h };
}
function moveLoupe(x, y) {
  const r = artRect(), p = svPane.getBoundingClientRect();
  if (x < r.left || x > r.right || y < r.top || y > r.bottom) { loupe.classList.remove('on'); return; }
  const lx = x - r.left, ly = y - r.top, s = 200;
  loupe.classList.add('on');
  loupe.style.left = (x - p.left - s / 2) + 'px'; loupe.style.top = (y - p.top - s / 2) + 'px';
  loupe.style.backgroundImage = `url(${svArt.src})`;
  loupe.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
  loupe.style.backgroundPosition = `${-(lx * ZOOM - s / 2)}px ${-(ly * ZOOM - s / 2)}px`;
}
svPane.addEventListener('pointermove', e => { if (view === 'art' && (e.pointerType === 'mouse' || e.buttons)) moveLoupe(e.clientX, e.clientY); });
svPane.addEventListener('pointerdown', e => { if (view === 'art' && e.pointerType !== 'mouse') { svPane.setPointerCapture(e.pointerId); moveLoupe(e.clientX, e.clientY); } });
['pointerleave', 'pointerup', 'pointercancel'].forEach(ev => svPane.addEventListener(ev, () => loupe.classList.remove('on')));
svPane.style.touchAction = 'pan-y';
// swipe between designs on touch (outside the artwork view)
let tsx = null;
svPane.addEventListener('touchstart', e => { tsx = e.touches[0].clientX; }, { passive: true });
svPane.addEventListener('touchend', e => { if (tsx == null || view === 'art') return; const dx = e.changedTouches[0].clientX - tsx; if (Math.abs(dx) > 60) openSheet(cur + (dx < 0 ? 1 : -1)); tsx = null; });

/* ---------------- shortlist drawer ---------------- */
const drawer = $('#drawer');
const setDrawer = open => { drawer.hidden = !open; document.body.style.overflow = open ? 'hidden' : ''; if (open) $('#drClose').focus(); };
$('#savedBtn').onclick = () => setDrawer(true);
$('#drClose').onclick = () => setDrawer(false);
drawer.addEventListener('click', e => { if (e.target === drawer) setDrawer(false); });
onSaved(() => {
  $('#drList').innerHTML = saved.map(id => { const d = byId(id); return `<li><img src="${d.art}" alt=""><button class="open" data-id="${id}" type="button">${d.name}</button><button class="rm" data-id="${id}" type="button">Remove</button></li>`; }).join('');
  $('#drEmpty').hidden = saved.length > 0; $('#drAsk').hidden = !saved.length;
});
$('#drList').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  if (b.classList.contains('rm')) toggleSave(b.dataset.id, false);
  else { setDrawer(false); openSheet(DESIGNS.indexOf(byId(b.dataset.id))); }
});
$('#drAsk').onclick = () => { setDrawer(false); goEnquire(); };

/* ---------------- try it on your wall ---------------- */
const stage = $('#stage'), cvs = $('#tryCanvas'), ctx = cvs.getContext('2d'), handlesEl = $('#handles');
const T = { photo: null, light: null, quad: null, design: 'parrot', scale: 3, lightAmt: .45, tex: null, texKey: '' };
const artCache = {};
const loadArt = src => artCache[src] ||= new Promise(res => { const im = new Image(); im.onload = () => res(im); im.src = src; });
stage.classList.add('idle');
$('#tryPick').innerHTML = DESIGNS.map(d => `<button type="button" role="option" data-id="${d.id}" aria-selected="false" title="${d.name}"><img src="${d.art}" alt="" loading="lazy"><span>${d.name}</span></button>`).join('');
$('#tryPick').addEventListener('click', e => { const b = e.target.closest('button'); if (b) tryPickDesign(b.dataset.id); });
function tryPickDesign(id) {
  T.design = id;
  $$('#tryPick button').forEach(b => b.setAttribute('aria-selected', b.dataset.id === id));
  const d = byId(id);
  $('#stageEmpty').style.backgroundImage = `url(${d.art})`;
  $('#tryScale').disabled = d.type !== 'pattern';
  render();
}
$('#tryScale').oninput = e => { T.scale = +e.target.value; render(); };
$('#tryLight').oninput = e => { T.lightAmt = +e.target.value; render(); };
['#tryFile', '#tryCam', '#tryFile2'].forEach(s => $(s).addEventListener('change', e => { const f = e.target.files[0]; if (f) loadPhoto(f); e.target.value = ''; }));
// drop a photo straight onto the stage
stage.addEventListener('dragover', e => e.preventDefault());
stage.addEventListener('drop', e => { e.preventDefault(); const f = [...e.dataTransfer.files].find(f => f.type.startsWith('image/')); if (f) loadPhoto(f); });
function loadPhoto(file) {
  const url = URL.createObjectURL(file), im = new Image();
  im.onload = () => {
    const MAX = 1800, k = Math.min(1, MAX / Math.max(im.naturalWidth, im.naturalHeight));
    const W = Math.round(im.naturalWidth * k), H = Math.round(im.naturalHeight * k);
    const pc = document.createElement('canvas'); pc.width = W; pc.height = H; pc.getContext('2d').drawImage(im, 0, 0, W, H);
    URL.revokeObjectURL(url);
    T.photo = pc; T.light = lightMap(pc);
    cvs.width = W; cvs.height = H;
    stage.style.aspectRatio = `${W} / ${H}`;
    resetQuad();
    stage.classList.remove('idle');
    $('#trySave').disabled = $('#tryShare').disabled = false;
    fitStage(); render();
  };
  im.onerror = () => toast('That file could not be opened as a photo');
  im.src = url;
}
// greyscale "room light" map, normalised so the bright wall is ~white: multiplied over the wallpaper it keeps the room's shadows
function lightMap(src) {
  const c = document.createElement('canvas'); c.width = src.width; c.height = src.height;
  const g = c.getContext('2d'); g.drawImage(src, 0, 0);
  const id = g.getImageData(0, 0, c.width, c.height), p = id.data, hist = new Uint32Array(256);
  for (let i = 0; i < p.length; i += 4) { const l = (p[i] * .299 + p[i + 1] * .587 + p[i + 2] * .114) | 0; p[i] = l; hist[l]++; }
  let acc = 0, p90 = 255; const lim = p.length / 4 * .9;
  for (let v = 0; v < 256; v++) { acc += hist[v]; if (acc >= lim) { p90 = Math.max(60, v); break; } }
  for (let i = 0; i < p.length; i += 4) { const v = Math.min(255, p[i] / p90 * 255); p[i] = p[i + 1] = p[i + 2] = v; p[i + 3] = 255; }
  g.putImageData(id, 0, 0); return c;
}
function resetQuad() {
  const W = cvs.width, H = cvs.height, mx = W * .18, my = H * .16;
  T.quad = [[mx, my], [W - mx, my], [W - mx, H - my * 1.6], [mx, H - my * 1.6]];
}
$('#tryReset').onclick = () => { if (T.photo) { resetQuad(); render(); } };
// handles
handlesEl.innerHTML = '<svg aria-hidden="true"><polygon/></svg>' + [0, 1, 2, 3].map(i => `<span class="hd" data-k="${i}" role="slider" aria-label="Wall corner ${i + 1}" tabindex="0"></span>`).join('');
let view0 = { s: 1, x: 0, y: 0 };
function fitStage() {
  if (!T.photo) return;
  const r = stage.getBoundingClientRect(), s = Math.min(r.width / cvs.width, r.height / cvs.height);
  const w = cvs.width * s, h = cvs.height * s, x = (r.width - w) / 2, y = (r.height - h) / 2;
  Object.assign(cvs.style, { width: w + 'px', height: h + 'px', left: x + 'px', top: y + 'px' });
  view0 = { s, x, y }; placeHandles();
}
addEventListener('resize', fitStage);
function placeHandles() {
  if (!T.quad) return;
  const pts = T.quad.map(([x, y]) => [view0.x + x * view0.s, view0.y + y * view0.s]);
  $$('.hd', handlesEl).forEach((h, i) => { h.style.left = pts[i][0] + 'px'; h.style.top = pts[i][1] + 'px'; });
  $('polygon', handlesEl).setAttribute('points', pts.map(p => p.join(',')).join(' '));
}
let dragK = -1;
handlesEl.addEventListener('pointerdown', e => { const h = e.target.closest('.hd'); if (!h) return; dragK = +h.dataset.k; h.setPointerCapture(e.pointerId); e.preventDefault(); });
handlesEl.addEventListener('pointermove', e => {
  if (dragK < 0) return;
  const r = stage.getBoundingClientRect();
  const x = (e.clientX - r.left - view0.x) / view0.s, y = (e.clientY - r.top - view0.y) / view0.s;
  T.quad[dragK] = [Math.max(-cvs.width * .1, Math.min(cvs.width * 1.1, x)), Math.max(-cvs.height * .1, Math.min(cvs.height * 1.1, y))];
  schedule();
});
handlesEl.addEventListener('pointerup', () => { dragK = -1; });
handlesEl.addEventListener('keydown', e => {
  const h = e.target.closest('.hd'); if (!h) return;
  const k = +h.dataset.k, st = (e.shiftKey ? 20 : 4) / view0.s, d = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
  if (d) { e.preventDefault(); T.quad[k] = [T.quad[k][0] + d[0], T.quad[k][1] + d[1]]; schedule(); }
});
let raf = 0; const schedule = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; render(); }); };
// homography from the unit square to the four corners (TL, TR, BR, BL)
function homography(q) {
  const [[x0, y0], [x1, y1], [x2, y2], [x3, y3]] = q;
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3, dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1 || 1e-9;
  const g = (dx3 * dy2 - dx2 * dy3) / den, h = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + h * x3, d = y1 - y0 + g * y1, e = y3 - y0 + h * y3;
  return (u, v) => { const w = g * u + h * v + 1; return [(a * u + b * v + x0) / w, (d * u + e * v + y0) / w]; };
}
function tri(c, img, s0, s1, s2, d0, d1, d2) {
  const cx = (d0[0] + d1[0] + d2[0]) / 3, cy = (d0[1] + d1[1] + d2[1]) / 3, grow = p => { const vx = p[0] - cx, vy = p[1] - cy, l = Math.hypot(vx, vy) || 1; return [p[0] + vx / l * .9, p[1] + vy / l * .9]; };
  const e0 = grow(d0), e1 = grow(d1), e2 = grow(d2);
  c.save(); c.beginPath(); c.moveTo(...e0); c.lineTo(...e1); c.lineTo(...e2); c.closePath(); c.clip();
  const sx1 = s1[0] - s0[0], sy1 = s1[1] - s0[1], sx2 = s2[0] - s0[0], sy2 = s2[1] - s0[1];
  const dx1 = d1[0] - d0[0], dy1 = d1[1] - d0[1], dx2 = d2[0] - d0[0], dy2 = d2[1] - d0[1];
  const det = sx1 * sy2 - sx2 * sy1;
  const a = (dx1 * sy2 - dx2 * sy1) / det, cc = (dx2 * sx1 - dx1 * sx2) / det, b = (dy1 * sy2 - dy2 * sy1) / det, d = (dy2 * sx1 - dy1 * sx2) / det;
  c.transform(a, b, cc, d, d0[0] - a * s0[0] - cc * s0[1], d0[1] - b * s0[0] - d * s0[1]);
  c.drawImage(img, 0, 0); c.restore();
}
async function texture(aspect) {
  const d = byId(T.design), art = await loadArt(d.art);
  const key = [d.id, d.type === 'pattern' ? T.scale : 0, aspect.toFixed(2)].join('|');
  if (key === T.texKey) return T.tex;
  const TW = 1600, TH = Math.round(Math.max(200, Math.min(3200, TW / aspect)));
  const c = document.createElement('canvas'); c.width = TW; c.height = TH; const g = c.getContext('2d');
  if (d.type === 'pattern') {
    const tw = TW / T.scale, th = tw * art.naturalHeight / art.naturalWidth;
    for (let y = 0; y < TH; y += th) for (let x = 0; x < TW; x += tw) g.drawImage(art, x, y, tw + .5, th + .5);
  } else {
    const k = Math.max(TW / art.naturalWidth, TH / art.naturalHeight), w = art.naturalWidth * k, h = art.naturalHeight * k;
    g.drawImage(art, (TW - w) / 2, (TH - h) / 2, w, h);
  }
  T.tex = c; T.texKey = key; return c;
}
async function render() {
  if (!T.photo) return;
  const q = T.quad, len = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const aspect = ((len(q[0], q[1]) + len(q[3], q[2])) / 2) / Math.max(1, (len(q[0], q[3]) + len(q[1], q[2])) / 2);
  const tex = await texture(aspect);
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  ctx.drawImage(T.photo, 0, 0);
  const H = homography(q), N = 14, TW = tex.width, TH = tex.height;
  for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
    const u0 = i / N, u1 = (i + 1) / N, v0 = j / N, v1 = (j + 1) / N;
    const s00 = [u0 * TW, v0 * TH], s10 = [u1 * TW, v0 * TH], s11 = [u1 * TW, v1 * TH], s01 = [u0 * TW, v1 * TH];
    const d00 = H(u0, v0), d10 = H(u1, v0), d11 = H(u1, v1), d01 = H(u0, v1);
    tri(ctx, tex, s00, s10, s11, d00, d10, d11);
    tri(ctx, tex, s00, s11, s01, d00, d11, d01);
  }
  if (T.lightAmt > 0) {
    ctx.save(); ctx.beginPath(); q.forEach((p, i) => i ? ctx.lineTo(...p) : ctx.moveTo(...p)); ctx.closePath(); ctx.clip();
    ctx.globalCompositeOperation = 'multiply'; ctx.globalAlpha = T.lightAmt; ctx.drawImage(T.light, 0, 0); ctx.restore();
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  }
  placeHandles();
}
const canvasBlob = () => new Promise(r => cvs.toBlob(r, 'image/jpeg', .9));
$('#trySave').onclick = async () => {
  const a = document.createElement('a'); a.href = URL.createObjectURL(await canvasBlob());
  a.download = `thehyden.art-${T.design}-on-my-wall.jpg`; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 4000);
};
$('#tryShare').onclick = async () => {
  const d = byId(T.design), blob = await canvasBlob();
  const file = new File([blob], `thehyden.art-${d.id}.jpg`, { type: 'image/jpeg' });
  const text = `Hi thehyden.art! This is my wall with ${d.name}. Could you help me with it?`;
  if (navigator.canShare?.({ files: [file] })) { try { await navigator.share({ files: [file], text }); return; } catch (e) { if (e.name === 'AbortError') return; } }
  $('#trySave').click(); copy(text); window.open(DM, '_blank', 'noopener');
  toast('Picture saved and message copied: attach it in the Instagram chat');
};
tryPickDesign('parrot');

/* ---------------- archive: her Instagram, all of it ---------------- */
const WORKS = (window.WORKS || []).map(([id, cat, cap, path]) => ({ id, cat, cap, url: IG + path + '/', reel: path.startsWith('reel') }));
const agrid = $('#agrid'), PAGE = 24;
let aFilter = 'all', aShown = PAGE, aList = WORKS;
$('#aCount').textContent = WORKS.length;
const reelSVG = '<svg class="reel" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const capOf = w => w.cap || ({ room: 'Installed', art: 'Artwork', studio: 'From the studio' })[w.cat];
function drawArchive() {
  aList = aFilter === 'all' ? WORKS : WORKS.filter(w => w.cat === aFilter);
  agrid.innerHTML = aList.slice(0, aShown).map((w, i) => `<li><button type="button" data-i="${i}" aria-label="${capOf(w)}, open"><img src="img/g/${w.id}.jpg" alt="${w.cap || ''}" loading="lazy" decoding="async" width="800" height="800"></button>${w.cap ? `<span class="c">${w.cap}</span>` : ''}${w.reel ? reelSVG : ''}</li>`).join('');
  $$('img', agrid).forEach(im => { const ok = () => im.classList.add('ok'); im.complete && im.naturalWidth ? ok() : im.addEventListener('load', ok); });
  $('#aMore').hidden = aShown >= aList.length;
  $('#aMore').textContent = `Show more (${aList.length - Math.min(aShown, aList.length)} left)`;
}
$('#aFilters').addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return;
  aFilter = b.dataset.f; aShown = PAGE;
  $$('#aFilters button').forEach(x => x.setAttribute('aria-pressed', x === b)); drawArchive();
});
$('#aMore').onclick = () => { aShown += PAGE * 2; drawArchive(); };
agrid.addEventListener('click', e => { const b = e.target.closest('button'); if (b) openLB(+b.dataset.i); });
drawArchive();

/* lightbox */
const lb = $('#lb'); let lbi = 0;
function openLB(i) {
  lbi = (i + aList.length) % aList.length; const w = aList[lbi];
  if (lb.hidden) { lastFocus = document.activeElement; lb.hidden = false; document.body.style.overflow = 'hidden'; $('#lbClose').focus(); }
  const img = $('#lbImg'); img.src = `img/g/${w.id}.jpg`; img.alt = w.cap || '';
  $('#lbCap').textContent = capOf(w);
  $('#lbCount').textContent = `${lbi + 1} / ${aList.length}`;
  $('#lbIG').href = w.url; $('#lbIG').textContent = w.reel ? 'Watch the reel on Instagram ↗' : 'Open on Instagram ↗';
}
const closeLB = () => { lb.hidden = true; document.body.style.overflow = ''; lastFocus?.focus?.({ preventScroll: true }); };
$('#lbClose').onclick = closeLB; $('#lbPrev').onclick = () => openLB(lbi - 1); $('#lbNext').onclick = () => openLB(lbi + 1);
let lsx = null;
lb.addEventListener('touchstart', e => { lsx = e.touches[0].clientX; }, { passive: true });
lb.addEventListener('touchend', e => { if (lsx == null) return; const dx = e.changedTouches[0].clientX - lsx; if (Math.abs(dx) > 50) openLB(lbi + (dx < 0 ? 1 : -1)); lsx = null; });

/* ---------------- keyboard for the overlays ---------------- */
addEventListener('keydown', e => {
  if (!lb.hidden) { if (e.key === 'Escape') closeLB(); if (e.key === 'ArrowRight') openLB(lbi + 1); if (e.key === 'ArrowLeft') openLB(lbi - 1); return; }
  if (!sheet.hidden) { if (e.key === 'Escape') closeSheet(); if (e.key === 'ArrowRight') openSheet(cur + 1); if (e.key === 'ArrowLeft') openSheet(cur - 1); return; }
  if (!drawer.hidden && e.key === 'Escape') setDrawer(false);
  if (!mnav.hidden && e.key === 'Escape') setMenu(false);
});

/* ---------------- enquiry: builds the Instagram / WhatsApp message ---------------- */
const form = $('#enq'), msg = $('#msg');
$('#enqDesigns').innerHTML = DESIGNS.map(d => `<button type="button" data-id="${d.id}" aria-pressed="false">${d.name}</button>`).join('');
form.addEventListener('click', e => {
  const b = e.target.closest('.chips button'); if (!b) return;
  const group = b.parentElement;
  if (group.id === 'enqDesigns') { toggleSave(b.dataset.id); return; }
  const on = b.getAttribute('aria-pressed') !== 'true';
  if (!group.classList.contains('multi')) $$('button', group).forEach(x => x.setAttribute('aria-pressed', 'false'));
  b.setAttribute('aria-pressed', on); buildMsg();
});
form.addEventListener('input', buildMsg);
onSaved(() => {
  $$('#enqDesigns button').forEach(b => b.setAttribute('aria-pressed', saved.includes(b.dataset.id)));
  $('#enqSavedNote').textContent = saved.length ? '(from your shortlist)' : '';
  buildMsg();
});
function picked(name) { return $$(`.chips[data-name=${name}] button[aria-pressed=true]`, form).map(b => b.textContent); }
function list(a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' and ' + a.at(-1); }
function buildMsg() {
  const f = Object.fromEntries(new FormData(form));
  const space = picked('space')[0], what = picked('what').filter(w => w !== 'Not sure yet'), unsure = picked('what').includes('Not sure yet');
  const lines = ['Hi thehyden.art!'];
  const who = [f.name && `I’m ${f.name.trim()}`, f.city && `from ${f.city.trim()}`].filter(Boolean).join(' ');
  if (who) lines.push(who + '.');
  const forWhat = space ? (space === 'Home' ? 'my home' : 'a commercial space') : 'a wall';
  if (what.length) lines.push(`I’m looking for ${list(what.map(w => w.toLowerCase()))} for ${forWhat}.`);
  else lines.push(`I’d love your help with ${forWhat}${unsure ? ': not sure yet what would suit it' : ''}.`);
  if (f.w || f.h) lines.push(`Wall size: ${f.w || '?'} × ${f.h || '?'} ${f.unit} (width × height).`);
  if (saved.length) lines.push(`Designs I like: ${list(saved.map(id => byId(id).name))}.`);
  if (f.note?.trim()) lines.push(f.note.trim());
  lines.push('', 'I can send photos of the wall here.');
  msg.textContent = lines.join('\n');
  if (S.whatsapp) { const wa = $('#sendWA'); wa.hidden = false; wa.href = `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(msg.textContent)}`; }
}
function copy(text) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  legacyCopy(text);
}
function legacyCopy(text) { const t = document.createElement('textarea'); t.value = text; t.style.position = 'fixed'; t.style.opacity = 0; document.body.appendChild(t); t.select(); try { document.execCommand('copy'); } catch {} t.remove(); }
$('#sendIG').onclick = () => {
  copy(msg.textContent); window.open(DM, '_blank', 'noopener');
  $('#copyNote').classList.add('on'); toast('Message copied: paste it in the chat');
};
function goEnquire() { $('#enquire').scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); }

/* ---------------- reveal on scroll ---------------- */
const rv = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rv.unobserve(e.target); } }), { rootMargin: '0px 0px -6% 0px' });
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = (i % 4) * 70 + 'ms'; rv.observe(el); });

/* ---------------- deep links: #design/<id> opens that design ---------------- */
const fromHash = () => { const m = location.hash.match(/^#design\/(.+)$/); if (m && byId(m[1])) openSheet(DESIGNS.indexOf(byId(m[1])), false); };
addEventListener('hashchange', fromHash); fromHash();
$('#yr').textContent = new Date().getFullYear();
})();
