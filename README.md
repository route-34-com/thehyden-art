<h1 align="center">thehyden.art — Hand-Painted Heritage Wallpapers Website</h1>
<br>
<p align="center">
  <img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/cloudflare_workers-F38020?style=for-the-badge&logo=cloudflare&logoColor=white" alt="Cloudflare Workers">
</p>
<br>

🎨 Website for thehyden.art: hand-painted Indian heritage wallpapers, murals, wall decals and frames by Mrudhula (architect, artist and designer).

The site is a static website with no build step and no backend that combines:

   🖼️ **Hand-written HTML, CSS and vanilla JavaScript** for the hero, manifesto, Painted Wheel, murals, projects, gallery, founder and enquiry sections

   🏠 **"Try it on your wall"** — designs shown on three real rooms, or on the visitor's own photo or live camera, mapped with four corner dots

   ☁️ **Cloudflare Workers** for hosting; the live domain currently serves the coming-soon page

## Features

- **The Painted Wheel** — a 3D rotating ring of paintings; drag or scroll sideways, tap to open
- **Collections** — `COLLECTIONS` in `collections.js` (category, sub-categories, designs and their photos in `img/c/`)
- **Murals grid** — each design shown as the painting beside a room photo, with a lightbox
- **The Wallpaper Library** — a walnut cabinet of wallpaper rolls
- **Try it on your wall** — real rooms, your own photo or live camera, with zoom and before/after
- **Cafés & kitchens** — commercial projects with world and India maps
- **Gallery** — Instagram works with category filters and *Show more*
- **Enquiry** — Instagram DM button, or WhatsApp once a number is set

## Live Site

**[thehyden.art](https://thehyden.art)** currently shows the **coming-soon page** only. The main site is deployed on Vercel from `main`.

## Installation

### Prerequisites

- [Python 3](https://www.python.org/downloads/) (only for the local web server)
- [Node.js](https://nodejs.org/) (only for deploying with `npx wrangler`)
- [Git](https://git-scm.com/downloads)

### Step 1: Clone the Repository

**Option A: Using VS Code Terminal**
1. Open Visual Studio Code
2. Open a new terminal (Terminal → New Terminal or ``Ctrl+Shift+` ``)
3. Navigate to your desired directory:
   ```bash
   cd path/to/your/desired/folder
   ```
4. Clone the repository:
   ```bash
   git clone https://github.com/route-34-com/thehyden-art.git
   ```
5. Open the project folder:
   ```bash
   cd thehyden-art
   ```
6. Open the project in VS Code:
   ```bash
   code .
   ```

**Option B: Using VS Code Git Integration**
1. Open Visual Studio Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
3. Type "Git: Clone" and select it
4. Paste the repository URL: `https://github.com/route-34-com/thehyden-art.git`
5. Choose a folder location and click "Select Repository Location"
6. Click "Open" when prompted

No dependencies to install.

## Usage

### Running Locally

```bash
python -m http.server 8811 --bind 127.0.0.1
```

Then open http://127.0.0.1:8811/index.html (use `python3` on macOS/Linux).

- Open the site through the server, not by double-clicking the file
- `http.server` is single-threaded, so test with one browser at a time
- The camera in *Try it on your wall* needs HTTPS on a phone. It works on localhost on a laptop, and on the live domain once deployed

## Changing the Content

- **Designs (one list for the whole site)** — `DESIGNS` in `collections.js`: name, Telugu name, note, Instagram post and images for each design. `SHOW` picks which designs appear, and in what order, in the murals grid, Painted Wheel, marquee, Library and try-on. Change a name once there and it changes everywhere
- **Collections page** — `COLLECTIONS` in `collections.js` (categories, sub-categories, decal and border photos in `img/c/`)
- **Try-on rooms** — `ROOMS` in `tryon.js`
- **Gallery** — `WORKS` in `gallery.js`
- **WhatsApp** — `whatsapp` in `settings.js` (country code, digits only). Every "Ask" button builds its prefilled message through `hydenAsk()` in `collections.js`
- **Colours** — `--gold` (accent), `--turmeric` (pale accent) and the hero italic colour in `index.html`. Preview options at `/mocks/colours.html`

**Important:** client rules (brand name spelling, logo, what not to invent) are in `CLAUDE.md`. Read them before changing copy or design.

## Deployment

### Coming-soon page (live)

```bash
cd coming-soon
npx wrangler deploy
```

`wrangler.toml` pins the Cloudflare account and the thehyden.art and www custom domains. Needs a wrangler login for the account that owns the domain.

### Main site (Vercel)

Every push to `main` deploys automatically on Vercel. No build step; `vercel.json` serves the folder as is and `.vercelignore` leaves out `CLAUDE.md`, `README.md`, `backups/`, `coming-soon/`, `mocks/`, `recordings/` and `data/`. Manual deploy: `vercel --prod`.

## Troubleshooting

- **Images or the map don't load** — open the site through the local server, not as a `file://` page
- **"Broken image" errors while testing** — `http.server` is single-threaded; use one browser at a time
- **Camera doesn't start on a phone** — the camera needs HTTPS; test on a laptop at localhost or on the live domain
- **WhatsApp button missing** — set `whatsapp` in `settings.js`

## Project Structure

```
thehyden-art/
├── index.html               # The site (inline CSS and JS for every section)
├── collection.html          # Collections: wallpapers, decals, borders, embroidery, wall frames
├── collections.js           # Collections data and the WhatsApp/Instagram enquiry helper
├── tryon.js                 # "Try it on your wall": rooms, own photo, live camera
├── library.css              # The Wallpaper Library styles
├── library.js               # The Wallpaper Library (walnut cabinet of rolls)
├── netmap.js                # World and India maps in Cafés & kitchens
├── gallery.js               # Instagram works shown in the Gallery
├── settings.js              # WhatsApp number and enquiry form endpoint
├── img/                     # Paintings, room photos, motif cut-outs
├── brand/                   # Logo and favicons
├── coming-soon/             # Source of the live coming-soon page (don't delete)
├── mocks/                   # Animation, concept and colour mocks (not part of the site)
├── backups/                 # Earlier versions of files, by date
├── CLAUDE.md                # Client rules and working notes
└── README.md                # This documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

In case of any queries, please leave a message or contact me via the email provided in my profile.

<p align="center">
⭐ <strong>Star this repository if you found it helpful!</strong>
</p>
