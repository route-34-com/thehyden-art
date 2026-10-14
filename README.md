# thehyden.art website

Website for thehyden.art: hand-painted Indian heritage wallpapers, murals, wall decals and frames by Mrudhula (architect, artist and designer). Static site (HTML, CSS, vanilla JS), no build step and no backend.

Live at https://thehyden.art is still the **coming-soon page** only. The main site (`index.html`) is not deployed yet.

| Path | What it holds |
|---|---|
| `index.html` | The site. Inline CSS and JS for the hero, manifesto, Painted Wheel, murals, projects, gallery, founder and enquiry sections. |
| `tryon.js` | "Try it on your wall": three real rooms, or the visitor's own photo or live camera, mapped with four corner dots. |
| `library.css`, `library.js` | The Wallpaper Library (walnut cabinet of rolls). |
| `netmap.js` | World and India maps in the Cafés & kitchens section. |
| `gallery.js` | The Instagram works shown in the Gallery (`img/g/NNN.jpg`). |
| `settings.js` | WhatsApp number and enquiry form endpoint. |
| `img/`, `brand/` | Paintings, room photos, motif cut-outs, logo and favicons. |
| `coming-soon/` | Source of the live coming-soon page (Cloudflare Worker). Don't delete. |
| `mocks/` | Animation, signature-concept and colour mocks for review. Not part of the site. |
| `backups/` | Earlier versions of files, by date. |

## Run it

```
python -m http.server 8811 --bind 127.0.0.1
```

Then open http://127.0.0.1:8811/index.html (use `python3` on macOS/Linux). Open it through the server, not by double-clicking the file. `http.server` is single-threaded, so test with one browser at a time.

The camera in "Try it on your wall" needs HTTPS on a phone. It works on localhost on a laptop, and on the live domain once deployed.

## Change the content

- Murals grid: `MU` list in `index.html` (name, Telugu name, type, painting, room photo, Instagram post).
- Try-on designs and rooms: `walls` and `ROOMS` in `tryon.js`.
- Gallery: `WORKS` in `gallery.js`.
- WhatsApp button: set `whatsapp` in `settings.js` (country code, digits only). Empty falls back to Instagram DM.
- Colours: `--gold` (accent), `--turmeric` (pale accent) and the hero italic colour in `index.html`. Preview options at `/mocks/colours.html`.

Client rules (brand name spelling, logo, what not to invent) are in `CLAUDE.md`. Read them before changing copy or design.

## Deploy

Coming-soon page (live):

```
cd coming-soon
npx wrangler deploy
```

`wrangler.toml` pins the Cloudflare account and the thehyden.art and www custom domains. Needs a wrangler login for the account that owns the domain.

Main site: not deployed yet, and only with the client's go-ahead. Deploy it as a static-assets Worker from a folder that holds only the site files, leaving out `CLAUDE.md`, `README.md`, `backups/`, `coming-soon/`, `mocks/` and `recordings/`, then move the custom domains over from the coming-soon worker.
