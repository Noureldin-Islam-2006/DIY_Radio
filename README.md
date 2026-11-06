# هنا القاهرة — Team 14

A static, dependency-free AM-radio build log for ELEG103, SBME Department, Fall 2026.

Rawan Kotb · Bassel Mostafa · Noureldin Islam

## Run locally

Open `index.html` directly in a modern browser. The site uses ordinary script tags, so it does not need a server, npm, a build step, or a network connection for its local content.

For a preview with normal HTTP behavior, open a terminal in this folder:

```sh
python -m http.server 8000
```

Visit `http://localhost:8000`. Stop the server with Ctrl+C. External video embeds need internet access and may require HTTP hosting rather than a `file:` URL.

## Files

```text
index.html
css/style.css
js/content.js
js/script.js
assets/
  favicon.svg
  placeholder.svg
  m1/
    setup.jpg
    top-view.jpg
    esp32-circuit.jpg
    esp32-wave.jpg
    esp32-wave.mp4
    generator-01.mp4
    generator-02.mp4
    schematic.svg
  m2/placeholder.svg
  m3/placeholder.svg
LAB2.pdf
README.md
```

`COMPLETE-CODE.md` contains all authored text files, each in its own labelled code block. Images, videos, and the supplied lab PDF are binary assets, included in the ZIP separately. The original `media/` folder is preserved locally; the website uses the renamed copies in `assets/m1/`.

## Edit the content

Open `js/content.js`. Its commented sections contain the identity, team, story, theory descriptions, measurements, media, and interface labels. Text is escaped before rendering. Use plain text, not HTML. A token such as `[[TBD: measured f0]]` is automatically highlighted.

M1 currently says **In progress** because measurements and sign-off are not confirmed. Set `status: 'Done'` when appropriate and update `statusNote`. The progress count updates automatically. M2 and M3 remain planned and their tabs say **Soon**.

Keep `project.date` in `YYYY-MM-DD` format and update `dateLabel` alongside it. Replace `project.repo` with your actual HTTPS GitHub repository URL to activate the footer link.

The HTML includes a static page title, description, and Open Graph metadata so social crawlers do not need to run JavaScript. If you rename the project, update those fields in `index.html` too. All shipped asset paths are relative. Some social preview crawlers require an absolute public `og:image` URL; after deployment, use the final image URL if needed. No account or domain has been invented.

## Enter results and get the chart

Enter **numbers**, not quoted strings, in the Table 4 and Table 5 `value` properties. Leave units in their separate `unit` properties. Predictions intentionally remain blank until the team fills them in.

The Table 6 `detector` array has six rows:

```js
// Schema example only; substitute your actual measured numbers for the placeholders.
{ source: '[[TBD: source amplitude in V]]', tp1: '[[TBD: peak in mV]]', tp3: '[[TBD: DC in mV]]' }
```

Once `tp1` and `tp3` contain numeric nonnegative values, the SVG chart plots them in ascending TP1 order. Zero is valid. Missing pairs are excluded. The empty chart does not invent data or a threshold. To document the dead zone, take readings in the low-amplitude region as well as above it; the plotted line follows the measured values and does not force a flat region.

Q is automatically calculated when `f0`, `fLow`, and `fHigh` are numeric, positive, and ordered with `fLow < f0 < fHigh`, unless you provide a numeric Q explicitly. These three values must all be in kHz as labelled.

The comparison table links prediction and measurement keys, so entering the tuning-band endpoints updates:

```text
100 × (prediction − measured) / measured
```

The calculation preserves the sign. A zero measured value shows an undefined result instead of dividing by zero. Mismatched units are flagged rather than silently compared.

## Add a milestone

1. Copy the M3 object in `milestones`, including its fields and arrays.
2. Give it a unique ID such as `m4`, a label `M4`, and its title/name/summary.
3. Fill `objective`, `journey`, `problems`, `results`, `learned`, `next`, and `media`. Optional `specs` and `theory` arrays follow the M1 examples.
4. Choose status `Planned`, `In progress`, or `Done`.
5. Create `assets/m4/` for its files. A new object automatically creates a tab, hash route, panel, and progress entry. Update the preceding milestone's `next` link if you want it to point to M4.

No HTML or rendering-logic edits are needed. Each milestone ID must begin with a letter and contain only letters, numbers, and hyphens.

## Images and videos

Put files in the appropriate `assets/mN/` folder. Keep filenames simple and match their exact letter case: GitHub Pages is case-sensitive.

```js
// An image with an informative description for screen readers.
{ id: 'new-photo', type: 'image', src: 'assets/m1/new-photo.jpg',
  alt: '[[TBD: describe the actual photo]]', caption: '[[TBD: what this photo shows]]' }

// A local video; no autoplay. Captions and a poster are optional.
{ id: 'new-video', type: 'video', src: 'assets/m1/new-video.mp4',
  poster: 'assets/m1/new-photo.jpg', muted: true,
  track: 'assets/m1/new-video.en.vtt',
  caption: '[[TBD: caption]]', description: '[[TBD: visual description or transcript]]' }

// An embedded video: replace the ID, and make sure embedding is allowed.
{ id: 'youtube-demo', type: 'youtube',
  src: 'https://www.youtube-nocookie.com/embed/VIDEO_ID',
  caption: '[[TBD: caption]]' }

// Drive needs a shareable file with viewer access; /view links must become /preview.
{ id: 'drive-demo', type: 'drive',
  src: 'https://drive.google.com/file/d/FILE_ID/preview',
  caption: '[[TBD: caption]]' }
```

Set a journey step's `media` field to the media item's ID to feature it in the story. Every item also appears in the gallery. Keep `missing: true` for files you have not added yet; remove it when the file exists. Actual missing image files also fall back to a placeholder.

Prefer reasonably sized JPEG/WebP photos and MP4/H.264 videos. The opening photograph loads immediately; other images load lazily. Videos get their source near the viewport and use `preload="none"`. YouTube/Drive frames are created only after a click. The supplied ESP32 clip starts muted as requested. Add a text description, transcript, and a WebVTT captions track wherever spoken information matters.

Original-to-site media mapping:

| Original in `media/` | Copy used by the site |
| --- | --- |
| `the full circuit.jpeg` | `assets/m1/setup.jpg` |
| `full circuit top view.jpeg` | `assets/m1/top-view.jpg` |
| `esp32 approach circuit.jpeg` | `assets/m1/esp32-circuit.jpg` |
| `esp32 wave.jpeg` | `assets/m1/esp32-wave.jpg` |
| `esp32 wave video (put it muted in the website).mp4` | `assets/m1/esp32-wave.mp4` |
| `after using new function generator part 1 .mp4` | `assets/m1/generator-01.mp4` |
| `after using new function generator  part 2.mp4` | `assets/m1/generator-02.mp4` |

The ESP32 sketch is reproduced verbatim with credit to Team 20. It generates a sampled sine, not AM. Its nominal 1 kHz timing is reduced by execution overhead, and the `FREQ` constant is unused. The scope photograph is not treated as proof of a particular frequency, modulation method, or TP1/TP3 mapping.

## Appearance and accessibility

Change `--accent` near the top of `css/style.css` to recolour the site. Spacing and other colours are CSS variables. System fonts keep it offline-capable and fast. The theme control cycles **System → Light → Dark** and remembers the choice when browser storage is available.

- Tabs: Left/Right arrows move and activate; Home/End jump to the first/last tab. Tab moves into the selected panel.
- Milestones: `#m1`, `#m2`, etc. support direct links and browser Back/Forward.
- Lightbox: Enter opens a focused photo; Left/Right browses; Escape closes and restores focus.
- Focus indicators, reduced-motion preferences, semantic headings, table headers, native MathML, and image alt text are included.
- Print prints the selected milestone plus the project overview. Open the code disclosure first if you want the full sketch included. Videos keep their file links and captions in print.

## Deploy to GitHub Pages

1. Create a GitHub repository and put `index.html`, `css/`, `js/`, `assets/`, and `LAB2.pdf` at its root. The README is useful too. Do not upload the ZIP itself as the website.
2. Commit/push these files to `main` (or upload through GitHub's web interface).
3. Open **Settings → Pages → Deploy from a branch → main → / (root) → Save**.
4. Open the Pages URL shown by GitHub when deployment finishes.
5. Check the direct link ending in `/#m2`, the media, and the repository link.

Relative paths support `https://<user>.github.io/<repo>/`; no rewriting, build action, or framework is necessary. Repository: https://github.com/Noureldin-Islam-2006/DIY_Radio. Enable Pages in repository Settings after uploading.

## Fill the remaining gaps, in order

1. **Measurements:** Table 4 predictions, Table 5 resonance/bandwidth, then all six Table 6 rows. The chart and comparison errors update from these entries.
2. **Evidence:** generator models/ranges, probe settings, scope channel mapping, actual fixes, and M1 sign-off/status.
3. **Media:** coil and detector close-ups, a verified resonance screenshot, the tuning video, and meaningful descriptions/captions for the existing videos.
4. **Publishing:** GitHub repository URL and the last-updated date. Update social metadata if you rename the project.
5. **Future milestones:** leave M2 and M3 as Soon until their work begins.

## Section navigation and motion

A fixed left sidebar at desktop widths follows the active milestone. On smaller screens it becomes a horizontal section menu. Links scroll to headings without replacing the milestone hash. Section highlighting follows scrolling. Subtle entrance and card-hover animations respect prefers-reduced-motion.


## Interactive 3D workbench

M1 now includes a dependency-free WebGL assembly with orbit/zoom controls, animated component separation, and eight selectable component illustrations. Use the hero's **Explore the circuit in 3D** button or the section sidebar. Mouse/touch dragging rotates the model; keyboard arrows rotate, +/- zoom, and Home resets the camera. Native WebGL must be enabled for the 3D view; an actual bench photo is the fallback. The descriptions and tuning experiment remain ordinary accessible HTML.

The tuning experiment calculates resonance from nominal coil dimensions. Its optional sound is a quiet synthesized tone, not live radio. Sound stops when the experiment leaves the viewport, a milestone changes, or the page becomes hidden. All illustrations, model limitations, and the teaching-model assumptions are labelled. No real measurements were added.

- `js/content.js`: workbench descriptions and component catalogue.
- `js/circuit-model.js`: original mesh geometry and resonance functions.
- `js/workbench.js`: native WebGL renderer, controls, and tuning experiment.
- `css/workbench.css`: responsive workbench styles.
- `assets/components/`: eight transparent PNG illustrations and the complete generation prompts.
- `assets/m1/radio-assembly.glb`: downloadable 3D assembly with named meshes, vertex colours, and metre units.
- `DESIGN-NOTES.md`: reference review, research links, implementation choices, and future ideas.

The PNGs were produced with the built-in image generator from the team's own photos. The 3D model was authored from the visual references and nominal specifications; it is not an automatic photo-to-mesh conversion or precision scan. It shows illustrative placement, not exact breadboard connections. Follow the circuit schematic for wiring.

The website still runs by opening `index.html`: no npm, React, CDN, or build step. Only if you edit geometry and want to regenerate the downloadable GLB, the optional authoring command is `node tools/export-model.cjs`. The viewer uses the geometry source directly, so editing it does not require an export to preview changes.
# Latest design revision

The photographic opening uses `project.hero` and `project.exhibit` in `js/content.js`. The five-stage signal explorer uses `signalStory`; its waveforms are illustrations, not measured data. The workbench tuning experiment is a separate calculated demonstration. `css/experience.css` controls the editorial composition and `js/experience.js` adds the opening and signal interactions.

The reusable design skill is included at `skills/atmospheric-vanilla-web/SKILL.md`, with reference observations alongside it. The personal installed copy can be invoked as `$atmospheric-vanilla-web`. No external reference assets or source code are bundled.

Select any component to move the camera into an isolated close-up and read its role and connections. Uncheck **Zoom into selected component** to keep the assembled view while reading descriptions. **Whole circuit** returns to the assembly. Motion respects reduced-motion preferences.

For accurate replacement geometry, follow [the model capture guide](MODEL-CAPTURE-GUIDE.md). Current geometry and generated illustrations remain approximate.

