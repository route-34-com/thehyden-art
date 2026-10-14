# thehyden.art website

Website for **thehyden.art**: hand-painted Indian heritage wallpapers, murals, wall decals and wall frames. Founder: **Mrudhula**, an architect (B.Arch 2023), artist and designer. Built and managed by Route34 (Hari) for her. Instagram: @thehyden.art.

## Client rules (from Mrudhula, follow every time)
- **Brand name is always written `thehyden.art`**, never "The Hyden Art".
- **White background, black text only.** No coloured text. Since the 14 Oct 2026 rebuild the interface is strictly monochrome (no pastel panels or accents); the old pastels (blush `#f7ddd8`, sage `#dfe9da`, sky `#dbe9ee`, butter `#f5ecc8`, lilac `#e8e2f1`) are not a rule either way.
- **Font: Hoefler Text Regular.** It is an Apple system font (Macs/iPhones only). The stack is `"Hoefler Text","EB Garamond",Garamond,Georgia,serif`; EB Garamond loads from Google Fonts as the look-alike fallback for Windows/Android. Weights stay 400.
- **Theme: "tradition and contemporary".** Reference sites she gave: houseofikari.com (full-screen image landing) and kalakaarihaath.com.
- **No empty space.** Her works should follow one after another, with short text only where it explains something.
- **Hover effects: open to improvement**, but monochrome and restrained. She did reject the tilting cards and the petal burst, so don't bring those back.
- **Selling points to show:** designed by an architect (not just a seller: she understands each project's needs); supplies all over the world; installs all over India; works for homes **and commercial spaces**.
- **No AI for the logo.** AI imagery/video is fine for the website itself.
- Don't invent prices, specs or policies. Reuse her existing copy.

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
index.html     THE SITE (14 Oct 2026: the "v5 + Library" design was promoted here; Hari: "just keep the v5 library version"). Inline CSS+JS + library.css/library.js + netmap.js, no build step
netmap.js      generated world/India network-map data + renderer (svg.netmap[data-map])
proposed-old.html  (v5 + Library) is now ALSO being edited (14 Oct 2026, Hari): thehyden.art loader before the page; buttons in the New version's shape (black pill + round arrow) whose hover is a SILVER shine (silver disc, light streak sweeps across, silver rim), not a brown flood, also on the Instagram pills; the 4 selling-point tiles replaced by one horizontal ruled row (i.–iv., Hoefler, small arched photo / set-square / India-map graphic each); #designs is one section whose background changes to each painting's colour on scroll (no separate coloured boxes). Backup before: backups/2026-10-14/proposed-old.before-loader-buttons.html
gallery.js     159 Instagram works (img/g/NNN.jpg) with categories room/art/studio
settings.js    WhatsApp number, form endpoint, PLACEHOLDER price rates
img/           photos used by the page (w*.jpg rooms, wall-*.jpg designs, g/ gallery, mrudula.jpg)
brand/         logo, favicons, client photos
coming-soon/   SOURCE OF THE LIVE SITE (see Deployment), don't delete
backups/       earlier versions of index.html (dated folder)
```
There are no other pages. The shop/backend, the alternate designs (v2–v6), the demos and the old logo explorations were all deleted on 14 Oct 2026 at the user's request.

## Retired versions
All earlier versions (old index, proposed.html "New", proposed-v1/v4/v5, whites.html, demo-shelf.html, compare.js) are in backups/2026-10-14/. The section list below describes an earlier build; the live structure is in index.html comments (INTRO, IN THE ROUND, COLLECTIONS, DESIGNS, PATTERNS = Wallpaper Library, COMMERCIAL, ARCHIVE = Gallery, FOUNDER, ENQUIRE).

## Homepage sections (index.html, rebuilt 14 Oct 2026 from Hari's "master prompt")
Editorial gallery, pure black on white: no pastel or tinted panels, no coloured accents (the artwork supplies the colour). Hierarchy through size and spacing only, weight 400 everywhere. The previous version is at `backups/2026-10-14/index.before-rebuild.html` (it had try-on, estimate, FAQ; deliberately not carried over).
1. **Nav**: logo-512 + "thehyden.art", links Designs / Projects / Studio / Archive / Enquire, Instagram. A compact fixed nav (`.float`) slides in only after the hero has scrolled away, so nothing ever overlaps the hero.
2. **Hero**: three installed rooms (w08 large, w04, w05) sized between the nav and a caption line. No text on the images.
3. **Intro** (`.intro`): the h1 plus the four selling points as a ruled 2×2 grid.
4. **Designs** (`#designs`): 15 numbered pieces, each the flat artwork (`wall-*.jpg`) next to the same design installed (`img/g/NNN.jpg`), with its name and Instagram post link. Rows are "justified": each figure has `--ar` (its aspect ratio) as flex-grow, so heights match and nothing is cropped. On phones `.row` stacks; `.row.keep` stays side by side.
5. **Projects** (`#projects`): the five storefronts + "We supply all over the world." / "We install all over India."
6. **Studio** (`#studio`): Mrudhula's photo, her quote and bio (her copy), w06 motif studies.
7. **Archive** (`#archive`): gallery.js grid, filters, Show more, shared white lightbox (keys, swipe, Instagram link).
8. **Enquire** (`#enquire`): Instagram DM button; a WhatsApp button appears only when `settings.js` has her number. No form until she gives an email/endpoint. Full logo beside it.
Motion: fade-up reveals, hero fade-in, slow image zoom on hover, drawn underlines, button frame thickening + arrow nudge. All disabled under reduced motion. `settings.js` price rates are no longer used by the page.

## Deployment (Cloudflare)
- Domain **thehyden.art** is registered at **GoDaddy**; nameservers point to Cloudflare (`emely`/`kurt.ns.cloudflare.com`). `.art` can't be transferred to Cloudflare Registrar.
- Hosting is on the **route34official@gmail.com** Cloudflare account (ID `c23ea81bff07813e7402cccf14d0527b`). Don't use the other accounts the wrangler login can see (harikrishnasaravana23, Curiodotfun).
- **Live now: the coming-soon page only.** Worker `thehyden-coming-soon`, deployed from `coming-soon/` with `npx wrangler deploy` (its `wrangler.toml` pins the account and the custom domains thehyden.art + www). The page is in the classic style with a phone layout that centres everything.
- **The main site (index.html) is NOT deployed.** Only deploy when Hari explicitly says so. The site is fully static (no backend needed). When launching, deploy it as a static-assets Worker and move the custom domains from the coming-soon worker. Don't publish `CLAUDE.md`, `backups/`, `coming-soon/` or `.playwright-mcp/` (test screenshots) as part of the site (use an assets ignore list or a separate `public/` folder).
- Always confirm with Hari before any deploy; he prefers local previews first.

## Local preview
```
cd ~/hyden-art && python3 -m http.server 8811 --bind 127.0.0.1
open http://localhost:8811/index.html
```
`http.server` is single-threaded, so run one headless test browser at a time; parallel loads caused false "broken image" results. Close leftover test browsers afterwards (`pgrep -f remote-debugging-pipe`) and never touch Hari's own Chrome.

## Still needed from her
- Her **WhatsApp number** (`settings.js` → `whatsapp`; chat buttons fall back to Instagram DM until then).
- **Real prices**: `ratePerSqFt` and `installPerSqFt` in settings.js are placeholders (₹150–220 and ₹25).
- **Form endpoint** (e.g. FormSubmit with her email) to take the enquiry form out of demo mode.
- Higher-resolution hero photos if available (current ones are about 1,100px wide and look soft on big screens).

## Parked / history
- **Parrot "delivers an offer" animation**: the parrot sat on the "t" of the nav wordmark; clicking it made the parrot fly across, drop a sealed envelope, and the envelope opened into a closable offer sheet. It was **removed on 14 Oct 2026** because it needs to be "way better". The last working version is at `backups/2026-10-13/index.with-parrot-animation.html` (GSAP 3.15 from jsDelivr; wings cut from her painting). Only rebuild it when asked.
- Rejected along the way: dark/maroon themes, coloured text, the drawn (SVG) try-on room, text over the hero image, tilting hover cards, the petal-burst hover, AI-generated logo monograms.
- AI hero video ideas (fal.ai / Kling / Veo) were explored and shelved.
