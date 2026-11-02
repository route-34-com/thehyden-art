# thehyden.art website

Website for **thehyden.art**: hand-painted Indian heritage wallpapers, murals, wall decals and wall frames. Founder: **Mrudhula**, an architect (B.Arch 2023), artist and designer. Built and managed by Route34 (Hari) for her. Instagram: @thehyden.art.

## Client rules (from Mrudhula, follow every time)
- **Brand name is always written `thehyden.art`**, never "The Hyden Art".
- **Theme: "tradition and contemporary".** Reference sites she gave: houseofikari.com (full-screen image landing) and kalakaarihaath.com.
- **Selling points to show:** designed by an architect (not just a seller); supplies all over the world; installs all over India; homes **and commercial spaces**.
- **No AI for the logo**, and don't redesign it. AI imagery/video is fine for the website itself.
- Don't invent prices, specs, policies, testimonials or credentials. Reuse her existing copy; her quote and bio are verbatim.
- Rejected, don't bring back: tilting cards, the petal-burst hover, the drawn (SVG) try-on room, AI logo monograms.
- **Original rules (white background, black text, Hoefler Text only) were lifted by Hari on 14 Oct 2026** ("no colour palette nor font limitation, go crazy"). The current direction is his, below.

## Hari's working preferences
- Never put instructions or design explanations on the page ("scroll sideways to…", "every colour is taken from…"); it's shown to the client as the real site.
- Text must never be clipped: no overflow:hidden masks around headings (italic tails and descenders got cut repeatedly). Check every heading after changes.
- He finds scroll-pinned/scrubbed gimmicks "primitive" in general, but asked for the long scrolling hero. Keep token use low; one screenshot per check.
- He likes the live coming-soon page's feel (Fraunces + DM Sans, cream, lotus pink) as a "premium" reference.

## Logo and brand assets (`brand/`)
- Her final logo: black circle with a white letterform and a green parrot perched on it, with "thehyden.art" underneath. She designs her own logos; don't redesign it.
- Logo was sharpened on 14 Oct 2026 (Hari approved; old versions deleted): circle redrawn true, letterform traced and redrawn as smooth/straight outlines (tips kept), parrot = high-res ~/Downloads/Parrot.png placed unedited at the logo's position (5 deg tilt), wordmark reset in Bodoni 72 Book (matched by overlay; Mrudhula to confirm). No AI.
- `brand/logo-master.png` 3688px print master, `brand/logo-full.png` 2048px, `brand/logo-512.png` nav.
- Favicons from the same sharp logo without the wordmark: `brand/favicon.ico` (16/32/48), `fav-32.png`, `fav-180.png` + `fav-192.png` (on white).
- The live coming-soon page (`coming-soon/public/`) still has the OLD favicons; update only with a deploy Hari approves.
- `brand/clients/*.jpg`: storefront photos of her commercial projects, cropped 4:5 on each sign.
- High-res parrot painting (transparent PNG, faces left, perched): `~/Downloads/Parrot.png`. It's the source for any future parrot animation.

## Files
```
index.html     THE SITE (redesign, 14 Oct 2026 night). Inline CSS + JS, no build step
library.css/js The Wallpaper Library (walnut cabinet of rolls; classes L-, ids lib-). Used by index.html
tryon.js       "Try it on your wall" (3 real rooms with CSS clip-path walls, your own photo or live camera mapped with four corner dots via matrix3d, "Hold this view" freezes the camera frame, before/after, tints). Used
netmap.js      World + India maps (world: India to 20 countries in black; India: outline + 18 cities). Used
gallery.js     159 Instagram works (img/g/NNN.jpg), categories room/art/studio
settings.js    WhatsApp number 917032382063 (Mrudhula, given 2 Nov 2026). All enquiry links go through window.hydenAsk(text) in collections.js (wa.me + ig.me with a prefilled message)
collection.html  Collections page (Hari + Mrudhula, 2 Nov 2026): Wallpapers (Patterns, Murals), Decals (Single motifs, Pairings, Repeats, Scenes),
               Borders (Single bands, Layered borders), Embroidery, Wall frames. Hash routes #decals/pairings. Viewer = photos + WhatsApp/Instagram ask
collections.js THE ONE DESIGN LIST: window.DESIGNS (key = Library shelf slug: name, Telugu, note, kind, try-on tile/pos, Instagram, images) and
               window.SHOW (which designs appear, in order, in murals grid, Painted Wheel, marquee, Library, try-on). index.html, library.js, tryon.js
               and collection.html all read from it; never re-list names elsewhere. Also the collection page data. Decal/border photos from her Drive zips (data/, gitignored) resized into img/c/<slug>-N.jpg (+ -t.jpg card).
               Sub-category names were chosen by us from her list (stand alone/combination/repetition/story; simple/combination borders); design names
               are descriptive placeholders (Blackbuck, Lotus vine...) for her to confirm. Embroidery and Wall frames only have Nabhi Kamalam so far
img/           w*.jpg rooms, wall-*.jpg flat designs, g/ gallery, ring/ (480px carousel images), shelf/ (walnut + roll textures),
               motif/ cut-outs, band/ strips, hero-trellis.jpg (cropped trellis, unused now), mrudula.jpg
brand/         logo, favicons, client photos
mocks/         review mocks, NOT part of the site, never deploy: animations.html (kolam draw, brush reveal, lightbox grow, roller swap, brush underline),
               signature.html (5 concepts: paint the wall, blueprint to room, camera on your wall, mural diorama, made-to-measure Thota),
               colours.html (live accent switcher over index.html: walnut, kumkum, lotus rani, peacock teal, parrot green, temple ochre, jamun, indigo)
fonts.js       client font preview (2 Nov 2026): hidden unless a page is opened with ?fonts (remembered in localStorage, ?fonts=off removes it).
               6 pairings; switches --display/--serif/--sans; "Send choice on WhatsApp". Remove once Mrudhula picks, and set the winner in index.html + collection.html
README.md      how to run, change content and deploy (same format as other Route34 client repos)
coming-soon/   SOURCE OF THE LIVE SITE, don't delete
backups/2026-10-14/  every earlier version (index.before-*.html); GitHub has the older v5+Library commit
```

## Homepage sections (current index.html)
- **Type and colour:** since 2 Nov 2026 (Hari asked for new fonts, "professional and clean"): headings and hero Newsreader (opsz, 400/500, italic accents), body Manrope. Before that: DM Serif Display + DM Sans with a Playfair Display hero. Tried and rejected: Bodoni Moda (too thin), Fraunces (right thickness, wrong face), Cormorant Garamond. Button hover fills walnut brown with white label (green was rejected). Never put a transform on .btn i (it lifts the fill over the label). Instagram links are the small gradient Instagram logo (svg .igi, gradient #ig-g defined after <body>). Whites only: #ffffff, #faf8f5, #f4f1ec, #efebe4 by section; text charcoal #2d2a26; accent walnut brown #7a4a2a (--gold; pale --turmeric #e6d8c8; deeper #5a3219 in the hero italic). Pink, then indigo, were replaced on Hari's request, 14 Oct.
1. **Nav**: logo + thehyden.art, links (Collections → collection.html, Murals, Try it on, Projects, Gallery, Founder, Enquire); frosted white once you scroll; full-screen menu on phones.
2. **Hero (long scroll)**: Nabhi Kamalam pastel mural pinned in a 420svh section (image 300svh tall); the painting pans upward with scroll; the headline block is fixed at the viewport centre the whole time (no easing); once the hero's bottom edge rises to meet it, it stops there and leaves with the hero (JS: y=min(y1, y0+scroll past the pin)). No white wash over the art. Uses `img/wall-pastel-tall.jpg` (1600x2164): her original on top, unchanged, plus ~900px of extra water below built WITHOUT AI from her own water texture and lotus cut-outs, with the kolam borders tiled (407px repeat). Script: `backups/2026-10-14/extend-hero.py`. Mirroring/repeating the whole mural looked bad and was dropped. AI outpainting (Runway) was blocked: 0 credits. A taller file from her is still best.
3. **Manifesto** (heading + room photo img/g/043 at 5:4 on the right) + four selling points with black line icons (compass, networked globe (9 nodes), networked India outline from netmap.js (18 cities, 28 links), house + office); **marquee** of design names.
3b. **The collections** (#collections): 5 tiles from collections.js linking to collection.html#<key>.
4. **The Painted Wheel**: 3D rotating ring of 12 paintings (backs visible), drag or sideways scroll, tap to open.
5. **The murals**: 8 designs in a 2-column grid; each card = painting (2/3) + room photo (1/3) side by side, name row with Instagram logo; wipe-in reveals; lightbox.
5b. **Motif band** (.motif-band) between murals and library: her kolam (img/motif/kolam.png, repeat-x) with lamp, lotus, elephant, origami bird, lamp cut-outs.
6. **The Wallpaper Library** (library.css/js), cabinet full width.
7. **Try it on your wall** (tryon.js). Living hall = img/rooms/living.jpg (img/g/125 with the framed print removed by harmonic fill, no AI; script backups/2026-10-14/deframe-living.py; wall clipped above the sideboard, cut around the three vases). Murals sit in a .T-mu layer sized to the wall height (room `wb`), so they aren't hidden behind furniture; Zoom slider scales patterns and murals. Before/after + Zoom live in the right panel. The old 051 room was dropped because the plant cut-out left a patch.
8. **Cafés & kitchens**: 5 storefronts + world and India maps (netmap.js). Only USA and UK are verified client countries; the other 18 world markers were Hari's request ("top places").
9. **Gallery**: masonry of gallery.js with filters and Show more.
10. **Founder**: photo, "Hi, I'm *Mrudhula.*", quote, bio, credential pills, three process photos.
11. **Begin with your wall**: Instagram DM button (WhatsApp when set).

## Ideas reviewed on 15 Oct 2026
- Of the five signature concepts, only the camera/photo four-corner try-on (concept 3) went into the site. "Paint the wall" was built and then removed at the user's request; it lives on in mocks/signature.html.
- Accent colour change is still open: mocks/colours.html shows eight options from her paintings. Pink and indigo were already replaced once (14 Oct), so check with Hari before picking those.
- Research behind the concepts (competitor sites, visualiser tech, conversion data) is in the Route34 workspace at reports/Interactive wallpaper site concepts.md, not in this repo.

## Deployment (Vercel, from 2 Nov 2026)
- Main site deploys on **Vercel** (Sharan's team "Sharan Kumar R's projects"), auto-deployed on every push to `main` of route-34-com/thehyden-art (GitHub repo connected 2 Nov 2026; other branches get preview URLs). Static, no build (`vercel.json`); `.vercelignore` keeps CLAUDE.md, README, backups, coming-soon, mocks, recordings, data out.
- The thehyden.art domain still points at the Cloudflare coming-soon worker; moving it to Vercel needs Hari's go-ahead.

## Deployment (Cloudflare, coming-soon)
- Domain **thehyden.art** is registered at **GoDaddy**; nameservers point to Cloudflare (`emely`/`kurt.ns.cloudflare.com`). `.art` can't be transferred to Cloudflare Registrar.
- Hosting is on the **route34official@gmail.com** Cloudflare account (ID `c23ea81bff07813e7402cccf14d0527b`). Don't use the other accounts the wrangler login can see (harikrishnasaravana23, Curiodotfun).
- **Live now: the coming-soon page only.** Worker `thehyden-coming-soon`, deployed from `coming-soon/` with `npx wrangler deploy` (its `wrangler.toml` pins the account and the custom domains thehyden.art + www). The page is in the classic style with a phone layout that centres everything.
- **The main site (index.html) is NOT deployed.** Only deploy when Hari explicitly says so. The site is fully static (no backend needed). When launching, deploy it as a static-assets Worker and move the custom domains from the coming-soon worker. Don't publish `CLAUDE.md`, `backups/`, `coming-soon/`, `recordings/` or `.playwright-mcp/` (test screenshots) as part of the site (use an assets ignore list or a separate `public/` folder).
- Always confirm with Hari before any deploy; he prefers local previews first.

## Walkthrough video
`recordings/thehyden-art-walkthrough.mp4` (1:16, 1440x900, 30fps, made 14 Oct 2026). Made with `recordings/tour.js` (playwright-core 1.57 + cached Chrome for Testing, server on :8811): the page runs at 0.25x (JS clock override + CDP Animation.setPlaybackRate, rAF on a 60 Hz virtual grid, all images decoded first), frames come from a CDP screencast, then each output frame is picked at exact 1.5x virtual steps (3 ticks/frame) and encoded with ffmpeg. Real-time recordVideo had ~20 visible freezes; BeginFrame control isn't supported on macOS. A capture takes ~8 min.

## Local preview
```
cd ~/hyden-art && python3 -m http.server 8811 --bind 127.0.0.1
open http://localhost:8811/index.html
# Windows: python -m http.server 8811 --bind 127.0.0.1, then open the URL in a browser
```
`http.server` is single-threaded, so run one headless test browser at a time; parallel loads caused false "broken image" results. Close leftover test browsers afterwards (`pgrep -f remote-debugging-pipe`) and never touch Hari's own Chrome.

## Still needed from her
- **WhatsApp number** (settings.js → `whatsapp`) and an enquiry email if a form is wanted.
- **Higher-resolution / taller mural files** for the hero (current ones are 950 to 1800px wide and look soft full-screen).
- Confirm: Telugu spellings (తోట, నాభి కమలం), the Bodoni wordmark font, and which countries/cities she has actually supplied or installed in.
- Real prices only if she wants them shown (none are on the site).

## Parked / history
- **Parrot "delivers an offer" animation**: the parrot sat on the "t" of the nav wordmark; clicking it made the parrot fly across, drop a sealed envelope, and the envelope opened into a closable offer sheet. It was **removed on 14 Oct 2026** because it needs to be "way better". The last working version is at `backups/2026-10-13/index.with-parrot-animation.html` (GSAP 3.15 from jsDelivr; wings cut from her painting). Only rebuild it when asked.
- Rejected along the way: the drawn (SVG) try-on room, tilting hover cards, the petal-burst hover, AI logo monograms, colourful network-arc maps, the clay background, the navy/gold and coming-soon colour passes (superseded by whites).
- AI hero video ideas (fal.ai / Kling / Veo) were explored and shelved.
