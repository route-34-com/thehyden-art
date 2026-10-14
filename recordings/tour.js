// Glitch-free walkthrough: the page runs at R x speed (JS clock + CSS animations), the tour is scripted in
// "virtual" ms, frames come from a CDP screencast with timestamps, and ffmpeg rebuilds real-speed video.
const { chromium } = require('playwright-core');
const fs = require('fs'), path = require('path');
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1243/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const R = 0.25;                       // page speed while recording
const W = 1440, H = 900;
const FR = path.join(__dirname, 'frames'); fs.rmSync(FR, { recursive: true, force: true }); fs.mkdirSync(FR);

(async () => {
  const browser = await chromium.launch({ executablePath: EXE, headless: true, args: ['--disable-renderer-backgrounding', '--disable-background-timer-throttling'] });
  const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
  await ctx.addInitScript(R => {
    // slowed clock for page JS; rAF callbacks fire at ~60 virtual fps
    const pn = performance.now.bind(performance), t0 = pn(), d0 = Date.now();
    const vnow = () => (pn() - t0) * R;
    performance.now = vnow; const RD = Date; Date.now = () => d0 + vnow();
    const sT = setTimeout, sI = setInterval, rAF = requestAnimationFrame.bind(window), cAF = cancelAnimationFrame.bind(window);
    window.setTimeout = (f, ms, ...a) => sT(f, (ms || 0) / R, ...a);
    window.setInterval = (f, ms, ...a) => sI(f, (ms || 0) / R, ...a);
    let q = new Map(), id = 0, last = -1e9;
    (function tick() { const v = vnow(); if (v - last >= 16.667) { last = v - last > 50 ? v : last + 16.667; if (q.size) { const cb = q; q = new Map(); cb.forEach(f => { try { f(v) } catch (e) { console.error(e) } }); } } rAF(tick); })();
    window.__rAF = rAF;
    window.requestAnimationFrame = f => { q.set(++id, f); return id; };
    window.cancelAnimationFrame = i => q.delete(i);
    addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('img[loading=lazy]').forEach(i => i.loading = 'eager');
      const c = document.createElement('div');
      c.style.cssText = 'position:fixed;left:0;top:0;width:22px;height:22px;margin:-3px 0 0 -3px;z-index:2147483647;pointer-events:none;';
      c.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 2l15 9-6.5 1.5L9 19z" fill="#111" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>';
      document.body.appendChild(c); window.__cur = c;
      let cx = 0, cy = 0; addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; }, true);
      (function k() { c.style.left = cx + 'px'; c.style.top = cy + 'px'; requestAnimationFrame(k); })();
    });
  }, R);
  const page = await ctx.newPage();
  const cdp = await ctx.newCDPSession(page);
  const wait = vms => page.waitForTimeout(vms / R);              // virtual ms
  let mx = W / 2, my = 160;
  async function move(x, y, vms = 500) {
    const n = Math.max(6, Math.round(vms / 16.7)), x0 = mx, y0 = my, e = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    for (let i = 1; i <= n; i++) { const t = e(i / n); await page.mouse.move(x0 + (x - x0) * t, y0 + (y - y0) * t); await page.waitForTimeout(16.7 / R); }
    mx = x; my = y;
  }
  async function box(sel) { const el = typeof sel === 'string' ? await page.$(sel) : sel; if (!el) { console.log('missing', sel); return null; } return el.boundingBox(); }
  async function to(sel, vms = 500) { const b = await box(sel); if (b) await move(b.x + b.width / 2, b.y + b.height / 2, vms); return b; }
  async function press() { await page.evaluate(() => __cur.style.transform = 'scale(.8)'); await page.mouse.down(); await wait(70); await page.mouse.up(); await page.evaluate(() => __cur.style.transform = ''); }
  async function click(sel, vms = 500) { const b = await to(sel, vms); if (b) await press(); return b; }
  async function scrollTo(y, vms) {
    await page.evaluate(([y, ms]) => new Promise(res => {
      const y0 = scrollY, t0 = performance.now(), ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      (function f() { const t = Math.min(1, (performance.now() - t0) / ms); window.scrollTo({ top: y0 + (y - y0) * ease(t), behavior: 'instant' }); t < 1 ? requestAnimationFrame(f) : res(); })();
    }), [y, vms]);
  }
  const topOf = (sel, off = 0) => page.evaluate(([s, o]) => document.querySelector(s).getBoundingClientRect().top + scrollY + o, [sel, off]);

  await page.goto('http://localhost:8811/index.html', { waitUntil: 'networkidle' });
  await page.evaluate(() => document.documentElement.style.scrollBehavior = 'auto');
  // decode every image up front so nothing pops in mid-scroll
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(i => i.decode().catch(() => {}))); });
  await page.waitForTimeout(1500);
  await cdp.send('Animation.enable'); await cdp.send('Animation.setPlaybackRate', { playbackRate: R });
  await page.mouse.move(mx, my);

  // ---- screencast with timestamps ----
  const frames = [];
  cdp.on('Page.screencastFrame', async f => {
    const n = frames.length; const file = path.join(FR, String(n).padStart(6, '0') + '.jpg');
    fs.writeFileSync(file, Buffer.from(f.data, 'base64')); frames.push([file, f.metadata.timestamp]);
    cdp.send('Page.screencastFrameAck', { sessionId: f.sessionId }).catch(() => {});
  });
  await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: W, maxHeight: H, everyNthFrame: 1 });
  await page.waitForTimeout(300);

  // ================= TOUR (virtual ms) =================
  await wait(1400);
  await to('.hero-long .btn', 800); await wait(1000); await move(1150, 560, 600);
  const heroRun = await page.evaluate(() => document.querySelector('.hero-long').offsetHeight - innerHeight);
  await scrollTo(heroRun + 420, 7500); await wait(300);

  await scrollTo(await topOf('.manifesto', -40), 1400); await wait(900);
  await scrollTo(await topOf('.pillars', -380), 1000);
  for (let i = 1; i <= 4; i++) { await to('.pillars li:nth-child(' + i + ') .pi', 380); await wait(220); }

  await scrollTo(await topOf('.ring-sec', -20), 1500); await wait(700);
  const sb = await box('.ring-stage');
  await move(sb.x + sb.width * .62, sb.y + sb.height * .45, 450);
  await page.mouse.down(); await move(sb.x + sb.width * .32, sb.y + sb.height * .47, 900); await page.mouse.up(); await wait(1000);
  const front = await page.evaluate(() => { let b = 0, z = -1; document.querySelectorAll('.ring figure').forEach((f, i) => { if (+f.style.zIndex > z) { z = +f.style.zIndex; b = i } }); return b; });
  await click('.ring figure:nth-child(' + (front + 1) + ')', 550); await wait(1500);
  await page.keyboard.press('ArrowRight'); await wait(1100);
  await click('#lb-x', 550); await wait(500);

  const muTop = await topOf('#murals', -40);
  await scrollTo(muTop + 380, 1800); await to('.mu:nth-child(1) .art', 500); await wait(600);
  await to('.mu:nth-child(1) .ig-link', 600); await wait(900);
  await scrollTo(await topOf('.motif-band', -1100), 3600);
  // slow down at her motif band
  await scrollTo(await topOf('.motif-band', -330), 3000); await move(720, 470, 900); await wait(1600);

  await scrollTo(await topOf('#patterns', -10), 1800); await wait(500);
  for (const [b, r] of [[1, 2], [3, 4], [5, 3]]) { await to('.L-bay:nth-child(' + b + ') .L-roll:nth-child(' + r + ')', 380); await wait(200); }
  for (const [b, r] of [[2, 3], [4, 2], [1, 5]]) {
    let sel = '.L-bay:nth-child(' + b + ') .L-roll:nth-child(' + r + ')';
    if (await page.$eval(sel, e => e.classList.contains('L-stock'))) sel = '.L-bay:nth-child(' + b + ') .L-roll:not(.L-stock)';
    await click(sel, 550); await wait(2500); await click('#lib-close', 550); await wait(2100);
  }

  await scrollTo(await topOf('#T-room', -150), 1800); await wait(400);
  async function th(k, pause) { const bs = await page.$$('#T-thumbs button:not([hidden])'); const b = await bs[k].boundingBox(); await move(b.x + b.width / 2, b.y + b.height / 2, 450); await press(); await wait(pause); }
  for (const k of [2, 6]) await th(k, 1000);
  await click('#T-tints div button:nth-child(3)', 450); await wait(800);
  await click('#T-tints div button:nth-child(1)', 450); await wait(400);
  const slb = await box('#T-scale');
  await move(slb.x + slb.width * .38, slb.y + slb.height / 2, 450); await page.mouse.down();
  await move(slb.x + slb.width * .9, slb.y + slb.height / 2, 900); await move(slb.x + slb.width * .38, slb.y + slb.height / 2, 700); await page.mouse.up(); await wait(300);
  await click('#T-compare', 450); await wait(500);
  const hb = await to('#T-handle span', 500);
  if (hb) { const cx = hb.x + hb.width / 2, cy = hb.y + hb.height / 2; await page.mouse.down(); await move(cx - 220, cy, 900); await move(cx + 190, cy, 1100); await move(cx, cy, 600); await page.mouse.up(); }
  await wait(300); await click('#T-compare', 450); await wait(400);
  await click('.T-tabs button[data-kind=mural]', 450); await wait(500);
  await th(3, 1300);
  await click('.T-rooms button[data-room=bedroom]', 550); await wait(1300);
  await click('.T-rooms button[data-room=living]', 550); await wait(700);

  await scrollTo(await topOf('#projects', -20), 1800); await wait(700);
  await to('.proj li:nth-child(2) figure', 550); await wait(400); await to('.proj li:nth-child(4) figure', 550); await wait(400);
  await scrollTo(await topOf('#gallery', -H), 3200);

  await scrollTo(await topOf('#gallery', -20), 1200); await wait(400);
  await click('.gal-f button[data-f=room]', 450); await wait(800);
  await click('.gal-f button[data-f=all]', 450); await wait(600);
  await click('#grid button:nth-child(3)', 600); await wait(1500); await click('#lb-x', 550); await wait(400);

  await scrollTo(await topOf('#founder', -20), 2600); await wait(2200);
  await scrollTo(await topOf('#enquire', -60), 2000); await wait(400);
  await to('#enquire .btn', 700); await wait(1300);
  await scrollTo(await page.evaluate(() => document.body.scrollHeight), 1200); await wait(1300);
  // ================= END =================

  await cdp.send('Page.stopScreencast'); await page.waitForTimeout(500);
  const t0 = frames[0][1];
  let list = '';
  for (let i = 0; i < frames.length; i++) {
    const next = i + 1 < frames.length ? frames[i + 1][1] : frames[i][1] + 0.1;
    list += "file '" + frames[i][0] + "'\nduration " + ((next - frames[i][1]) * R).toFixed(5) + '\n';
  }
  list += "file '" + frames[frames.length - 1][0] + "'\n";
  fs.writeFileSync(path.join(__dirname, 'frames.txt'), list);
  fs.writeFileSync(path.join(__dirname, 'frames.json'), JSON.stringify(frames.map(f => [f[0], (f[1] - t0) * R])));
  console.log('frames', frames.length, 'virtual seconds', ((frames[frames.length - 1][1] - t0) * R).toFixed(1));
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
