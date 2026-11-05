# Complete website code

Every authored source file is included below in its own labelled code block. Copy each block to the named relative path. The accompanying ZIP includes the existing photographs, videos, and LAB2.pdf; binary files cannot be pasted as source code.

## index.html

````html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light dark">
  <title>هنا القاهرة — Team 14's AM Radio Build</title>
  <meta name="description" content="Three students, one AM radio. Follow Team 14's tuner and detector build, experiments, fixes, and measurements for ELEG103 at SBME, Fall 2026.">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_US">
  <meta property="og:title" content="هنا القاهرة — An AM radio, one milestone at a time">
  <meta property="og:description" content="Team 14's field notes: copper wire, a tuning capacitor, an ESP32 detour, and the journey toward sound.">
  <meta property="og:image" content="assets/m1/setup.jpg">
  <meta property="og:image:alt" content="Our hand-wound copper coil and breadboard radio circuit on the bench">
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/workbench.css">
  <script>
    try {
      const saved = localStorage.getItem('radio-theme');
      if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
    } catch (_) { /* System preference still works when storage is unavailable. */ }
  </script>
  <script src="js/content.js" defer></script>
  <script src="js/script.js" defer></script>
  <script src="js/circuit-model.js" defer></script>
  <script src="js/workbench.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#milestones">Skip to the build log</a>
  <div id="site"></div>
  <noscript><main class="wrap"><h1 lang="ar" dir="rtl">هنا القاهرة</h1><p>Team 14's AM radio build log needs JavaScript to display its milestones. Enable JavaScript, or read the content in js/content.js.</p></main></noscript>
  <dialog id="lightbox" aria-labelledby="lightbox-caption">
    <div class="lightbox-tools">
      <button type="button" id="lightbox-prev" aria-label="Previous image">←</button>
      <span id="lightbox-count" aria-live="polite"></span>
      <button type="button" id="lightbox-next" aria-label="Next image">→</button>
      <button type="button" id="lightbox-close" aria-label="Close image">Close ×</button>
    </div>
    <img id="lightbox-image" alt="">
    <p id="lightbox-caption" aria-live="polite"></p>
  </dialog>
</body>
</html>
````

## css/style.css

````css
/* Change --accent to recolour the site. Dark mode derives a lighter tint from it. */
:root {
  --accent: #a4472c;
  --paper: #f7f5ef; --surface: #fdfcf8; --ink: #262923; --muted: #62665c;
  --line: #d8d9ce; --soft: #eeeee5; --accent-ink: var(--accent);
  --highlight: #f3e7d7; --highlight-ink: #794329;
  --space-1: .5rem; --space-2: 1rem; --space-3: 1.5rem;
  --space-4: 2rem; --space-5: 3rem; --space-6: 5rem; --space-7: 7rem;
  --max-width: 1240px; --radius: 4px;
  --sans: 'Segoe UI', Arial, sans-serif;
  --serif: Georgia, 'Times New Roman', serif;
  color-scheme: light;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper: #191d1a; --surface: #202520; --ink: #f1f0e7; --muted: #b0b6aa;
    --line: #3b433b; --soft: #272e28; --accent-ink: color-mix(in srgb, var(--accent), #fff 50%);
    --highlight: #3c2f25; --highlight-ink: #eac1a1; color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --paper: #191d1a; --surface: #202520; --ink: #f1f0e7; --muted: #b0b6aa;
  --line: #3b433b; --soft: #272e28; --accent-ink: color-mix(in srgb, var(--accent), #fff 50%);
  --highlight: #3c2f25; --highlight-ink: #eac1a1; color-scheme: dark;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 6rem; }
body { margin: 0; background: var(--paper); color: var(--ink); font: 16px/1.65 var(--sans); }
[hidden] { display: none !important; }
::selection { background: var(--accent); color: white; }
a { color: inherit; text-underline-offset: 5px; }
a:hover { color: var(--accent-ink); }
button { font: inherit; color: inherit; cursor: pointer; }
button, a { -webkit-tap-highlight-color: transparent; }
button, a, summary { transition: color .18s, background-color .18s, border-color .18s; }
button:disabled { cursor: default; opacity: .5; }
:focus-visible { outline: 3px solid var(--accent-ink); outline-offset: 5px; }
img, video, iframe, svg { max-width: 100%; }
img { display: block; height: auto; }
figure { margin: 0; }
p { margin: 0 0 var(--space-2); }
h1, h2, h3, h4 { line-height: 1.18; margin: 0; }
h2 { font: 400 clamp(2rem, 4vw, 3.4rem)/1.12 var(--serif); letter-spacing: -.045em; }
h3 { font-size: 1.35rem; font-weight: 600; letter-spacing: -.035em; }
h4 { font-size: 1.25rem; font-weight: 600; letter-spacing: -.025em; }
small, .fine-print { font-size: .8rem; color: var(--muted); }
code, pre { font-family: Consolas, 'Courier New', monospace; }
.wrap { width: min(var(--max-width), calc(100% - 3rem)); margin-inline: auto; }
.eyebrow { font-size: .68rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
.skip-link { position: fixed; top: -100px; left: 20px; z-index: 50; padding: 12px 20px; background: var(--ink); color: var(--paper); }
.skip-link:focus { top: 12px; }
.site-header { min-height: 94px; display: flex; align-items: center; justify-content: space-between; gap: 1rem; border-bottom: 1px solid var(--line); }
.wordmark { display: flex; align-items: center; gap: 10px; text-decoration: none; font-size: .7rem; letter-spacing: .16em; font-weight: 700; }
.radio-mark { color: var(--accent-ink); font-size: 1.6rem; line-height: 1; }
.header-term { display: none; color: var(--muted); font-size: .72rem; }
.theme-toggle { min-height: 42px; padding: 6px 12px; background: transparent; border: 1px solid var(--line); border-radius: 30px; font-size: .75rem; white-space: nowrap; }
.theme-toggle:hover { background: var(--soft); border-color: var(--ink); }
.hero { padding-block: var(--space-5); display: grid; gap: var(--space-5); }
.hero-copy { align-self: center; }
.hero .eyebrow { display: flex; align-items: center; gap: 9px; }
.signal-dot, .status-dot { display: inline-block; flex: 0 0 auto; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-ink); }
.edition { border-left: 1px solid var(--line); padding-left: 12px; margin-left: 4px; }
.hero h1 { font: 600 clamp(4rem, 8vw, 7rem)/1.45 'Segoe UI', Tahoma, sans-serif; text-align: left; letter-spacing: -.065em; margin: 5px 0 2px; }
.tagline { font: 400 clamp(1.65rem, 2.6vw, 2.25rem)/1.22 var(--serif); letter-spacing: -.035em; max-width: 440px; }
.hero-intro { color: var(--muted); font-size: .92rem; max-width: 440px; margin-block: 22px 25px; }
.primary-link { display: inline-flex; align-items: center; gap: 35px; min-height: 46px; background: var(--accent); color: #fff; text-decoration: none; padding: 10px 19px; font-size: .82rem; border-radius: 2px; }
.primary-link:hover { background: var(--ink); color: var(--paper); }
.team-line { margin-top: 34px; display: flex; align-items: flex-start; gap: 19px; font-size: .75rem; }
.team-label { color: var(--muted); letter-spacing: .1em; border-right: 1px solid var(--line); padding-right: 19px; white-space: nowrap; }
.team-line ul { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 0 14px; }
.hero-photo { position: relative; align-self: center; }
.hero-photo > img { width: 100%; aspect-ratio: 1.07; object-fit: cover; border-radius: var(--radius); }
.photo-label { position: absolute; top: 19px; right: 19px; border: 1px solid #ffffff80; color: white; padding: 8px 10px; font-size: .6rem; letter-spacing: .15em; line-height: 1.4; background: #0005; }
figcaption { color: var(--muted); font-size: .75rem; line-height: 1.55; padding-top: 11px; }
.hero-photo figcaption { font-family: Consolas, monospace; font-size: .66rem; }
.overview { padding-block: var(--space-5); border-top: 1px solid var(--line); }
.overview-head { display: grid; gap: 20px; margin-bottom: 28px; }
.overview-head h2 { font-size: 2rem; }
.overview-head > p { font-size: .85rem; color: var(--muted); max-width: 500px; }
.signal-chain { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
.signal-chain li { position: relative; background: var(--surface); border: 1px solid var(--line); border-radius: 3px; padding: 19px 12px; text-align: center; }
.signal-chain li.current { border-color: var(--accent-ink); background: color-mix(in srgb, var(--accent) 5%, var(--paper)); }
.signal-chain strong { display: block; font-size: .83rem; font-weight: 600; }
.signal-chain span { display: block; margin-top: 4px; font-size: .65rem; color: var(--muted); }
.signal-chain .current span { color: var(--accent-ink); }
.signal-chain li:nth-child(odd)::after { content: '→'; position: absolute; right: -16px; top: 26px; color: var(--muted); }
.progress-row { margin-top: 26px; }
.progress-caption { display: flex; justify-content: space-between; font-size: .72rem; }
.progress-caption strong { color: var(--muted); font-weight: 400; }
progress { display: block; width: 100%; height: 3px; border: none; background: var(--line); appearance: none; margin-block: 12px 14px; accent-color: var(--accent-ink); }
progress::-webkit-progress-bar { background: var(--line); }
progress::-webkit-progress-value { background: var(--accent-ink); }
progress::-moz-progress-bar { background: var(--accent-ink); }
.progress-row ul { list-style: none; display: flex; flex-wrap: wrap; gap: 12px 25px; padding: 0; margin: 0; font-size: .66rem; }
.progress-row li { display: flex; align-items: center; gap: 6px; }
.progress-row li > span:last-child { color: var(--muted); }
.status-dot.planned { background: transparent; border: 1px solid var(--muted); }
.milestones { scroll-margin-top: 1rem; }
.tab-bar { position: sticky; top: 0; z-index: 10; background: var(--paper); border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); display: flex; align-items: stretch; justify-content: space-between; gap: 12px; }
[role="tablist"] { display: flex; overflow-x: auto; max-width: 100%; padding: 4px 3px; }
[role="tab"] { position: relative; border: none; background: transparent; padding: 17px 12px; display: flex; align-items: center; gap: 8px; white-space: nowrap; font-size: .78rem; color: var(--muted); }
[role="tab"] > span:first-child { font-weight: 600; }
[role="tab"][aria-selected="true"] { color: var(--accent-ink); }
[role="tab"][aria-selected="true"]::after { content: ''; position: absolute; bottom: -4px; height: 2px; background: var(--accent-ink); left: 12px; right: 12px; }
[role="tab"]:hover { background: var(--soft); }
[role="tab"]:focus-visible { outline-offset: -3px; }
.tab-name { font-size: .7rem; }
.print-button { display: none; border: 0; background: transparent; font-size: .7rem; color: var(--muted); padding: 12px; }
.chapter-heading { padding-block: var(--space-5); display: grid; gap: 22px; border-bottom: 1px solid var(--line); }
.chapter-heading .eyebrow { margin-bottom: 16px; color: var(--accent-ink); }
.chapter-summary { color: var(--muted); margin: 17px 0 0; font-size: .9rem; }
.chapter-status p { color: var(--muted); font-size: .7rem; max-width: 260px; margin: 12px 0 0; }
.badge { display: inline-flex; align-items: center; gap: 7px; border: 1px solid color-mix(in srgb, var(--accent) 45%, var(--line)); color: var(--accent-ink); background: color-mix(in srgb, var(--accent) 6%, var(--paper)); border-radius: 40px; padding: 4px 12px; font-size: .68rem; white-space: nowrap; }
.badge.planned { color: var(--muted); background: var(--soft); border-color: var(--line); }
.chapter-section { padding-block: var(--space-5); border-bottom: 1px solid var(--line); }
.section-label { display: flex; align-items: baseline; gap: 17px; margin-bottom: 28px; }
.section-label > span { color: var(--accent-ink); font-family: Consolas, monospace; font-size: .7rem; }
.objective-copy { font: 400 clamp(1.22rem, 2.1vw, 1.7rem)/1.6 var(--serif); max-width: 960px; }
.stats { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 30px; }
.stats > div { border-left: 1px solid var(--line); padding: 5px 0 5px 16px; }
.stats strong { font: 400 clamp(1.35rem, 3.6vw, 2.6rem)/1.25 var(--serif); display: block; letter-spacing: -.035em; }
.stats strong small { font: 400 .75rem var(--sans); letter-spacing: 0; }
.stats > div > span { display: block; font-size: .68rem; color: var(--muted); margin-top: 7px; }
.measured-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); margin-bottom: 32px; }
.measured-stats strong { font: 400 1.1rem/1.7 var(--sans); letter-spacing: 0; }
.timeline { list-style: none; margin: 0; padding: 0; }
.timeline > li { display: grid; gap: 26px; padding: 0 0 42px 25px; margin-left: 7px; border-left: 1px solid var(--line); }
.timeline > li > * { min-width: 0; }
.timeline > li:last-child { padding-bottom: 0; border-left-color: transparent; }
.step-copy { position: relative; padding-top: 5px; }
.step-copy::before { content: ''; position: absolute; top: 12px; left: -30px; width: 8px; height: 8px; border-radius: 50%; border: 1px solid var(--accent-ink); background: var(--paper); }
.step-number { font: .65rem Consolas, monospace; color: var(--accent-ink); display: block; margin-bottom: 12px; }
.step-copy h4 { margin-bottom: 15px; font-size: 1.4rem; }
.step-copy > p { font-size: .88rem; color: var(--muted); }
.note { font-size: .77rem; line-height: 1.7; background: var(--soft); padding: 16px 18px; border-left: 2px solid var(--accent-ink); margin-top: 20px; }
.image-button { position: relative; width: 100%; border: 0; padding: 0; background: var(--soft); display: block; overflow: hidden; border-radius: var(--radius); }
.image-button img { width: 100%; aspect-ratio: 4 / 3; object-fit: cover; transition: transform .35s ease; }
.image-button:hover img { transform: scale(1.025); }
.enlarge { position: absolute; right: 12px; bottom: 12px; background: var(--paper); color: var(--ink); width: 30px; height: 30px; border-radius: 50%; line-height: 30px; }
.diagram-media .image-button { background: #faf8f2; }
.diagram-media img { object-fit: contain; }
.media video { display: block; width: 100%; aspect-ratio: 4 / 3; background: #171c18; border-radius: var(--radius); }
.video-link { display: inline-block; font-size: .7rem; margin-top: 5px; }
.media-description { font-size: .72rem; margin-top: 8px; }
.media-empty { min-height: 190px; aspect-ratio: 4 / 3; padding: 20px; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; gap: 9px; border: 1px dashed var(--line); border-radius: var(--radius); background: var(--soft); color: var(--muted); }
.media-empty img { width: 90px; height: 56px; opacity: .65; }
.media-empty span { font-size: .8rem; }
.media-empty code { font-size: .65rem; overflow-wrap: anywhere; }
.code-details { margin-top: 22px; border: 1px solid var(--line); border-radius: var(--radius); }
summary { padding: 14px 16px; cursor: pointer; font-size: .78rem; }
summary span { float: right; }
pre { margin: 0; padding: 20px; overflow-x: auto; background: #1b211c; color: #ebede3; font-size: .75rem; line-height: 1.7; tab-size: 2; }
.code-details .fine-print { padding: 14px 16px; margin: 0; }
.theory-grid { display: grid; gap: 1px; background: var(--line); border: 1px solid var(--line); }
.theory-grid > div { background: var(--paper); padding: 26px; min-width: 0; }
.theory-grid h4 { font-size: 1rem; }
math { font-size: 1.5rem; margin-block: 26px; min-height: 52px; }
.theory-grid p { font-size: .8rem; color: var(--muted); margin: 0; }
.problem-grid { display: grid; gap: 18px; }
.problem-card { padding: 26px; border: 1px solid var(--line); border-radius: var(--radius); background: var(--surface); }
.problem-card .eyebrow { color: var(--accent-ink); }
.problem-card h4 { margin-top: 15px; font-size: 1.05rem; line-height: 1.4; }
dl { margin: 20px 0 0; font-size: .8rem; }
dt { font-weight: 600; margin-top: 16px; }
dd { color: var(--muted); margin: 5px 0 0; }
.section-intro { color: var(--muted); font-size: .85rem; max-width: 770px; margin-bottom: 26px; }
.tbd { background: var(--highlight); color: var(--highlight-ink); border-radius: 2px; padding: 1px 4px; font-size: .92em; box-decoration-break: clone; -webkit-box-decoration-break: clone; overflow-wrap: anywhere; }
.table-scroll { overflow-x: auto; margin-block: 25px; border-bottom: 1px solid var(--line); }
table { border-collapse: collapse; width: 100%; font-size: .8rem; text-align: left; }
caption { text-align: left; font-size: .93rem; font-weight: 600; padding: 0 0 14px; }
th, td { padding: 14px 17px; border-top: 1px solid var(--line); vertical-align: top; }
thead { background: var(--soft); }
thead th { font-size: .7rem; font-weight: 600; }
tbody th { font-weight: 400; }
td { font-variant-numeric: tabular-nums; }
tbody tr:hover { background: var(--surface); }
.unit { color: var(--muted); white-space: nowrap; }
.chart { position: relative; margin-block: 40px; padding: 25px; border: 1px solid var(--line); background: var(--surface); }
.chart h4 { font-size: .95rem; margin-bottom: 10px; }
.chart svg { display: block; width: 100%; color: var(--muted); }
.chart text { fill: currentColor; font: 12px var(--sans); }
.grid-line { stroke: var(--line); stroke-dasharray: 3 5; }
.axis { fill: none; stroke: var(--muted); }
.plot { fill: none; stroke: var(--accent-ink); stroke-width: 2.5; }
.plot-point { fill: var(--accent-ink); }
.chart-empty { text-align: center; font-size: .8rem; margin: 0 0 12px; }
.lessons { list-style: none; counter-reset: lessons; padding: 0; max-width: 950px; }
.lessons li { counter-increment: lessons; display: flex; gap: 24px; padding: 17px 0; font-size: .9rem; }
.lessons li::before { content: '0' counter(lessons); color: var(--accent-ink); font: .7rem/1.9 Consolas, monospace; flex: 0 0 20px; }
.gallery { display: grid; grid-template-columns: minmax(0, 1fr); gap: 30px 22px; }
.gallery > * { min-width: 0; }
.embed-slot { min-height: 220px; aspect-ratio: 4 / 3; background: var(--soft); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }
.embed-slot iframe { width: 100%; height: 100%; border: 0; }
.embed-slot:has(iframe) > small { display: none; }
.text-button { background: var(--surface); border: 1px solid var(--line); padding: 12px 18px; }
.next-step { padding: 32px; margin-block: 40px 60px; background: var(--soft); display: flex; flex-direction: column; gap: 20px; }
.next-step p:last-child { margin: 0; max-width: 720px; font-size: .9rem; }
.next-step a { color: var(--accent-ink); font-size: .85rem; }
.site-footer { display: grid; gap: 25px; padding-block: 35px 45px; border-top: 1px solid var(--line); color: var(--muted); font-size: .72rem; }
.footer-name { display: inline-block; font-size: 1.8rem; color: var(--ink); margin-bottom: 8px; }
.footer-links { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; }
dialog { width: min(1100px, calc(100% - 30px)); max-height: 94dvh; border: 1px solid var(--line); padding: 20px; background: var(--paper); color: var(--ink); border-radius: 6px; }
dialog::backdrop { background: #090e0be8; backdrop-filter: blur(5px); }
.lightbox-tools { display: flex; align-items: center; gap: 10px; padding-bottom: 16px; }
.lightbox-tools button { min-width: 44px; min-height: 44px; background: var(--surface); border: 1px solid var(--line); border-radius: 3px; }
#lightbox-close { margin-left: auto; padding-inline: 15px; }
#lightbox-count { color: var(--muted); font-size: .75rem; }
#lightbox-image { width: 100%; height: auto; max-height: 70dvh; object-fit: contain; }
#lightbox-caption { margin: 15px 0 0; font-size: .8rem; }
.modal-open { overflow: hidden; }
@media (min-width: 620px) {
  .header-term { display: block; }
  .wrap { width: min(var(--max-width), calc(100% - 5rem)); }
  .hero { padding-block: var(--space-6); }
  .hero-photo > img { aspect-ratio: 1.3; }
  .signal-chain { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .signal-chain li::after { display: none; }
  .signal-chain li:not(:nth-child(3n))::after { display: block; content: '→'; position: absolute; right: -16px; top: 26px; color: var(--muted); }
  .theory-grid, .problem-grid, .gallery { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  [role="tab"] { padding: 20px 22px; gap: 12px; }
  .chapter-heading, .chapter-section { padding-block: var(--space-6); }
  .site-footer { grid-template-columns: 1fr 1fr; }
}
@media (min-width: 960px) {
  .hero { grid-template-columns: 1fr 1fr; gap: 65px; }
  .hero-photo > img { aspect-ratio: 1.05; }
  .overview-head { grid-template-columns: 1fr 1fr; gap: 65px; align-items: end; }
  .overview-head > p { margin-bottom: 0; }
  .signal-chain { grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 22px; }
  .signal-chain li:not(:last-child)::after { display: block; content: '→'; position: absolute; right: -19px; top: 26px; color: var(--muted); }
  .progress-row { display: grid; grid-template-columns: 170px 1fr auto; align-items: center; gap: 24px; }
  .progress-caption { gap: 10px; }
  progress { margin: 0; }
  .progress-row ul { gap: 20px; }
  .print-button { display: block; }
  .chapter-heading { grid-template-columns: 1fr 230px; align-items: center; gap: 50px; }
  .chapter-status { justify-self: end; }
  .timeline > li { grid-template-columns: 1fr 1fr; gap: 65px; padding-left: 35px; padding-bottom: 65px; }
  .step-copy::before { left: -40px; }
  .timeline .media { align-self: start; }
  .theory-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  .theory-grid > div { padding: 26px 22px; }
  .problem-grid, .gallery { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .next-step { flex-direction: row; justify-content: space-between; align-items: center; gap: 50px; padding: 38px; }
  .site-footer { grid-template-columns: 1fr 1fr auto; }
}
@media (max-width: 400px) {
  .wrap { width: calc(100% - 2.25rem); }
  .hero h1 { font-size: clamp(2.8rem, 15vw, 4rem); }
  [role="tab"] { padding-inline: 9px; gap: 5px; }
  .tab-name { font-size: .65rem; }
  .stats { gap: 8px; }
  .stats > div { padding-left: 9px; }
  .stats strong small { display: block; margin-top: 5px; }
  .chart { padding: 14px 8px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { transition: none !important; animation: none !important; }
}
.section-sidebar { margin-block: 20px; border-block: 1px solid var(--line); padding: 18px 0; }
.section-sidebar ol { list-style: none; display: flex; overflow-x: auto; gap: 8px; margin: 0; padding: 4px; }
.section-sidebar a { display: flex; gap: 9px; align-items: baseline; padding: 9px; font-size: .75rem; text-decoration: none; white-space: nowrap; border-radius: 3px; }
.section-sidebar a span { color: var(--accent-ink); font: .65rem Consolas, monospace; }
.section-sidebar a:hover, .section-sidebar a[aria-current] { color: var(--accent-ink); background: var(--soft); }
.section-label h3 { scroll-margin-top: 100px; }
@media (min-width: 1200px) {
  body { padding-left: 205px; }
  .section-sidebar { position: fixed; top: 0; left: 0; bottom: 0; width: 205px; margin: 0; padding: 120px 16px 30px; border: 0; border-right: 1px solid var(--line); overflow-y: auto; z-index: 11; background: var(--paper); }
  .section-sidebar ol { display: block; overflow: visible; }
  .section-sidebar a { white-space: normal; margin-bottom: 7px; line-height: 1.5; }
  .section-sidebar > p { padding-left: 12px; margin-bottom: 25px; }
}
@media (prefers-reduced-motion: no-preference) {
  @keyframes arrive { from { opacity: .4; transform: translateY(12px); } to { opacity: 1; transform: none; } }
  .hero-copy { animation: arrive .65s ease-out both; }
  .hero-photo { animation: arrive .8s ease-out both; }
  [role="tabpanel"]:not([hidden]) .chapter-heading { animation: arrive .4s ease-out; }
  .section-arrived > .section-label { animation: arrive .55s ease-out; }
  .problem-card { transition: transform .2s, border-color .2s; }
  .problem-card:hover { transform: translateY(-3px); border-color: var(--accent-ink); }
}
@media print {
  body { padding-left: 0; }
  .section-sidebar { display: none; }
  :root, :root[data-theme="dark"] { --paper: white; --surface: white; --ink: #111; --muted: #444; --line: #bbb; --soft: #f3f3f3; --accent-ink: #84381f; --highlight: #eee; --highlight-ink: #222; color-scheme: light; }
  body { font-size: 10pt; }
  .wrap { width: 100%; }
  .theme-toggle, .tab-bar, .primary-link, .skip-link, .enlarge, .next-step a, dialog { display: none !important; }
  .site-header { min-height: 50px; }
  .hero { display: grid; grid-template-columns: 1fr 1fr; padding-block: 25px; gap: 30px; }
  .hero h1 { font-size: 48pt; }
  .hero-photo > img { max-height: 250px; object-fit: contain; }
  .overview, .chapter-heading, .chapter-section { padding-block: 22px; }
  .signal-chain { grid-template-columns: repeat(6, 1fr); }
  .signal-chain li::after { display: none !important; }
  .timeline > li { display: block; padding-bottom: 25px; }
  .timeline .media { max-width: 70%; margin: 20px auto; }
  .gallery, .problem-grid, .theory-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .media, .problem-card, tr, .stats, .chart { break-inside: avoid; }
  .table-scroll { overflow: visible; }
  .code-details pre { white-space: pre-wrap; background: #f3f3f3; color: #111; }
  video, .embed-slot { display: none; }
  .tbd { border: 1px solid #ddd; }
  .site-footer { grid-template-columns: 1fr 1fr 1fr; }
}
````

## css/workbench.css

````css
.workbench-jump { display: inline-block; background: none; border: none; border-bottom: 1px solid var(--line); margin: 16px 0 0 16px; padding: 9px 0; font-size: .78rem; color: var(--accent-ink); }
.workbench .section-intro { max-width: 750px; }
.bench-layout { display: grid; border: 1px solid var(--line); border-radius: 7px; overflow: hidden; }
.bench-layout > * { min-width: 0; }
.bench-stage { position: relative; background: radial-gradient(ellipse at 45% 45%, #34483a, #18251e 75%); color: #f1f0e4; min-height: 440px; display: flex; flex-direction: column; }
.bench-stage::before { content: ''; position: absolute; inset: 0; background-image: linear-gradient(#ced6ba07 1px,transparent 1px),linear-gradient(90deg,#ced6ba07 1px,transparent 1px); background-size: 38px 38px; pointer-events: none; }
.bench-stage-top { position: absolute; top: 22px; left: 24px; right: 24px; display: flex; justify-content: space-between; gap: 15px; pointer-events: none; font: .6rem Consolas, monospace; letter-spacing: .12em; color: #c9d1c4; z-index: 1; }
.bench-live { color: #ebba8f; }
#radio-model { width: 100%; height: 400px; display: block; touch-action: none; cursor: grab; outline-offset: -5px; }
#radio-model:active { cursor: grabbing; }
.bench-fallback { width: 100%; height: 400px; object-fit: contain; }
.bench-hint { text-align: center; margin: -10px 15px 16px; color: #bbc8bb; font-size: .7rem; pointer-events: none; }
.bench-toolbar { position: relative; display: flex; flex-wrap: wrap; justify-content: center; gap: 5px; padding: 0 12px 18px; margin-top: auto; }
.bench-toolbar button { background: #ffffff08; border: 1px solid #b8c6b340; border-radius: 3px; min-height: 40px; padding: 7px 12px; color: #efefe3; font-size: .68rem; }
.bench-toolbar button:hover, .bench-toolbar button[aria-pressed="true"] { background: #d9a778; color: #16231c; border-color: #d9a778; }
.part-inspector { background: var(--surface); display: grid; grid-template-columns: 120px 1fr; align-items: start; padding: 22px; gap: 20px; }
.part-portrait { background: var(--soft); border-radius: 4px; padding: 12px; }
.part-portrait img { width: 100%; aspect-ratio: 1.1; object-fit: contain; }
.part-copy .eyebrow { color: var(--accent-ink); margin-bottom: 10px; }
.part-copy h4 { font: 400 1.55rem/1.15 var(--serif); margin-bottom: 17px; }
.part-copy > p:not(.eyebrow) { font-size: .8rem; color: var(--muted); }
.part-copy .part-connection { border-top: 1px solid var(--line); padding-top: 15px; color: var(--ink) !important; }
.part-copy details { border-top: 1px solid var(--line); }
.part-copy summary { font-size: .68rem; padding: 13px 0; }
.part-copy details p { font-size: .72rem; color: var(--muted); }
.parts-tray { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 7px; padding-block: 14px; }
.parts-tray button { border: 1px solid var(--line); background: var(--surface); padding: 13px 10px; border-radius: 4px; text-align: left; font-size: .74rem; display: flex; align-items: baseline; gap: 9px; min-height: 48px; }
.parts-tray button:hover, .parts-tray button[aria-pressed="true"] { border-color: var(--accent-ink); color: var(--accent-ink); background: var(--soft); }
.part-index { font: .6rem Consolas,monospace; color: var(--muted); }
.bench-footnote { display: flex; flex-direction: column; gap: 8px; color: var(--muted); font-size: .68rem; }
.bench-footnote p { max-width: 700px; }
.bench-footnote a { white-space: nowrap; }
.tuning-lab { margin-top: 55px; display: grid; gap: 30px; }
.tuning-story h4 { font: 400 2.6rem/1.2 var(--serif); letter-spacing: -.05em; margin-bottom: 18px; }
.tuning-story > p:not(.eyebrow) { font-size: .85rem; color: var(--muted); }
.tuning-challenge { border-left: 2px solid var(--accent-ink); padding-left: 15px; margin-block: 24px; }
.probe-switch { display: flex; align-items: center; gap: 10px; font-size: .8rem; cursor: pointer; margin-bottom: 20px; }
.probe-switch input { accent-color: var(--accent-ink); width: 18px; height: 18px; }
.tuning-story .text-button { font-size: .78rem; border-radius: 3px; }
.tuning-story .text-button[aria-pressed="true"] { background: var(--accent); color: white; }
.tuning-story .fine-print { margin-top: 10px; font-size: .65rem !important; }
.tuning-console { border: 1px solid var(--line); padding: 25px; border-radius: 5px; background: var(--surface); transition: border-color .2s; }
.tuning-console.is-tuned { border-color: var(--accent-ink); }
.console-readout { display: flex; justify-content: space-between; align-items: baseline; gap: 10px; }
.console-readout span { display: block; font-size: .58rem; letter-spacing: .12em; color: var(--muted); margin-bottom: 5px; }
.console-readout output { font: 400 clamp(1.5rem,3vw,2.2rem) Consolas,monospace; font-variant-numeric: tabular-nums; }
.console-readout strong { font: 400 1.2rem Consolas,monospace; }
.console-readout small { font: .7rem var(--sans); }
.tuning-dial { width: 100%; color: var(--muted); margin-top: 20px; display: block; }
.tuning-dial text { fill: currentColor; font: 12px Consolas,monospace; }
#tuning-needle { stroke: var(--accent-ink); stroke-width: 3; }
#target-needle { stroke: var(--muted); stroke-width: 2; }
#tuning-dot { fill: var(--accent-ink); }
.tune-label, .alignment-row { display: flex; justify-content: space-between; gap: 12px; font-size: .75rem; margin-block: 20px 8px; }
.tune-label output { white-space: nowrap; font-family: Consolas,monospace; color: var(--accent-ink); }
#tune-capacitance { width: 100%; margin: 0; height: 32px; cursor: pointer; accent-color: var(--accent-ink); }
#signal-meter { display: block; width: 100%; height: 9px; }
#signal-meter::-webkit-meter-bar { border: none; background: var(--soft); }
#signal-meter::-webkit-meter-optimum-value { background: var(--accent-ink); }
#signal-meter::-moz-meter-bar { background: var(--accent-ink); }
.scope-mini { width: 100%; display: block; margin-block: 20px 8px; }
.scope-axis { stroke: var(--line); stroke-dasharray: 3 5; }
#scope-wave { stroke: var(--accent-ink); stroke-width: 1.5; fill: none; }
.tune-feedback { min-height: 3em; font-size: .72rem; color: var(--muted); margin: 0; }
.is-tuned .tune-feedback { color: var(--accent-ink); }
.bench-assumptions { margin-top: 20px; border-top: 1px solid var(--line); }
.bench-assumptions summary { padding-inline: 0; }
.bench-assumptions p { font-size: .75rem; color: var(--muted); max-width: 800px; }
@media (min-width: 900px) {
  .bench-layout { grid-template-columns: minmax(0,1fr) 270px; }
  .part-inspector { display: block; border-left: 1px solid var(--line); }
  .part-portrait { margin-bottom: 22px; }
  .part-portrait img { height: 160px; }
  #radio-model { height: 480px; }
  .parts-tray { grid-template-columns: repeat(8,minmax(0,1fr)); }
  .parts-tray button { flex-direction: column; gap: 8px; }
  .bench-footnote { flex-direction: row; justify-content: space-between; gap: 30px; }
  .tuning-lab { grid-template-columns: .8fr 1.2fr; gap: 45px; }
}
@media (max-width: 480px) {
  .workbench-jump { margin-left: 0; display: block; }
  .bench-stage-top { left: 15px; right: 15px; font-size: .5rem; }
  #radio-model { height: 340px; }
  .bench-stage { min-height: 390px; }
  .bench-toolbar button { padding: 7px 8px; }
  .part-inspector { grid-template-columns: 85px 1fr; padding: 16px; gap: 16px; }
  .part-copy h4 { font-size: 1.25rem; }
  .parts-tray { grid-template-columns: repeat(4,minmax(0,1fr)); }
  .parts-tray button { padding: 10px 6px; flex-direction: column; gap: 5px; font-size: .66rem; }
  .tuning-console { padding: 18px; }
}
@media (prefers-reduced-motion: reduce) { .tuning-console { transition: none; } }
@media print {
  .bench-stage { display: none; }
  .bench-layout { display: block; }
  .part-inspector { display: block; }
  .part-portrait { float: left; width: 120px; margin-right: 20px; }
  .bench-toolbar, .parts-tray, .workbench-jump, #listen-tuning { display: none; }
  .tuning-lab { display: block; }
  .tuning-console { break-inside: avoid; }
}
````

## js/content.js

````javascript
/* EDIT THIS FILE: all project copy, media, and measurements live here.
   Use numbers (without units) for measurements; keep unknowns as [[TBD: ...]].
   Paths are relative to index.html. No server, imports, or fetch are needed. */
window.RADIO_CONTENT = {
  // Identity, dates, repository, and the opening story. Replace repo with your HTTPS URL.
  project: {
    name: 'هنا القاهرة', transliteration: 'HUNA AL-QAHIRA', team: '14',
    tagline: 'An AM radio, one milestone at a time.',
    intro: 'A coil of copper wire. A handful of components. A signal waiting to become sound. We’re three students building a medium-wave radio—and keeping the notes we wish we had at the start.',
    members: ['Rawan Kotb', 'Bassel Mostafa', 'Noureldin Islam'],
    department: 'SBME Department', course: 'ELEG103 · Analog and Digital Electronics',
    term: 'Fall 2026', date: '2026-11-05', dateLabel: '05 November 2026',
    repo: 'https://github.com/Noureldin-Islam-2006/DIY_Radio', source: 'LAB2.pdf',
    hero: { src: 'assets/m1/setup.jpg', alt: 'Hand-wound copper coil on a PVC pipe, tuning capacitor, breadboards, and oscilloscope probes on our workbench.', caption: '01 / On the bench · Our tuner and detector taking shape.' }
  },
  // Interface labels can also be edited here without changing rendering logic.
  ui: {
    sectionNav: 'In this chapter', journal: 'THE RADIO BUILD LOG', team: 'TEAM', read: 'Follow the build',
    source: 'Read the lab brief ↗', overview: 'FROM AIRWAVES TO SOUND',
    overviewTitle: 'One radio. Built in stages.',
    overviewText: 'M1 gives us two pieces of the signal chain: select a frequency, then recover its envelope. Later stages will add the gain needed to bring weak signals to life.',
    progress: 'Milestone progress', done: 'done', soon: 'Soon', milestones: 'Build milestones',
    objective: 'The objective', journey: 'The journey', theory: 'A little theory, a lot of meaning',
    problems: 'What got in the way', results: 'The bench notes',
    learned: 'What we learned', next: 'Next on the bench', gallery: 'From the workbench',
    galleryHint: 'Select a photograph to take a closer look. Videos play only when you ask.',
    problem: 'Problem', why: 'Why it happened', solution: 'How we solved it',
    code: 'The sketch we tried', predictions: 'Table 4 · Predictions',
    tank: 'Table 5 · Tank measurements', detector: 'Table 6 · Detector response at f₀',
    quantity: 'Quantity', value: 'Value', sourceAmplitude: 'Source amplitude (V)',
    tp1: 'TP1 peak (mV)', tp3: 'TP3 DC (mV)',
    comparison: 'Predicted vs measured', prediction: 'Prediction', measured: 'Measured', error: 'Error (%)',
    errorFormula: 'Signed error = 100 × (prediction − measured) / measured. Values must use the same unit; a zero measured value has no defined percentage error.',
    chart: 'The detector’s response', chartEmpty: '[[TBD: add the six Table 6 measurement pairs to draw the chart]]',
    chartNote: 'Only entered measurements are plotted. At small TP1 peaks, look for a nearly flat TP3 region: the diode’s dead zone. No assumed threshold or invented curve is added.',
    chartAxisX: 'TP1 peak (mV)', chartAxisY: 'TP3 DC (mV)',
    mediaMissing: 'Awaiting a bench capture', loadEmbed: 'Load external video',
    embedNote: 'Loading connects to the video provider.',
    footer: 'Made by hand. Documented as we go.', repository: 'GitHub repository ↗',
    theme: 'Change colour theme', themes: ['System', 'Light', 'Dark'],
    print: 'Print this milestone', plannedNote: 'The next chapter is still on the drawing board.'
  },
  // Workbench copy and part catalogue. Illustrations are AI reconstructions, not bench evidence.
  workbench: {
    title: 'Take the radio apart.', eyebrow: 'THE INTERACTIVE WORKBENCH',
    intro: 'Meet the pieces before following the build. Turn the assembly, lift its components apart, and discover how a small change in capacitance changes the frequency we hear.',
    modelNote: 'Photo-informed 3D reconstruction · nominal dimensions · illustrative placement. Use the schematic for electrical connections, not the model’s breadboard holes.',
    imageNote: 'AI component illustration based on our photos; obscured details are representative. Original bench photos remain in the journey below.',
    parts: [
      {id:'coil',name:'The hand-wound coil',short:'Coil',value:'75 turns · Ø 50 mm',image:'assets/components/coil.png',role:'Stores energy in a magnetic field. Together with the tuning capacitor, it chooses the resonant frequency.',detail:'Our pale PVC former, copper winding, and black tape are reconstructed from the bench photographs. The model uses 75 turns over a nominal 25 mm winding length.',connection:'Across TP1 and ground.'},
      {id:'tuning-capacitor',name:'The tuning capacitor',short:'Tuner',value:'20–280 pF',image:'assets/components/tuning-capacitor.png',role:'Changes the electric energy stored in the tank. More capacitance moves resonance down the dial.',detail:'The square housing and shaft follow the visible component. The AM terminal pair still needs confirmation in our build notes.',connection:'AM section across the coil: TP1 to ground.'},
      {id:'diode',name:'The envelope’s gatekeeper',short:'Diode',value:'1N60P',image:'assets/components/diode.png',role:'Conducts near positive peaks to charge the detector capacitor. Small signals produce very little output.',detail:'The small package is partially hidden in the photos. Its illustrated housing is representative; the cathode band is the important orientation cue.',connection:'Anode at TP1; banded cathode toward TP3.'},
      {id:'resistor',name:'A controlled way to discharge',short:'Resistor',value:'15 kΩ',image:'assets/components/resistor.png',role:'Lets the detector capacitor discharge between peaks instead of holding its voltage indefinitely.',detail:'Brown–green–orange is the nominal 15 kΩ colour code. The illustration is not a resistance measurement.',connection:'TP3 to ground, in parallel with 3.3 nF.'},
      {id:'detector-capacitor',name:'Hold the peaks, follow the sound',short:'3.3 nF',value:'RC = 49.5 µs',image:'assets/components/detector-capacitor.png',role:'Smooths the carrier peaks while the resistor sets how quickly its stored charge falls.',detail:'A representative yellow dipped capacitor based on the visible package. Its capacitance is the specified nominal value.',connection:'TP3 to ground, in parallel with 15 kΩ.'},
      {id:'breadboard',name:'Our temporary workbench',short:'Boards',value:'Two solderless boards',image:'assets/components/breadboard.png',role:'Holds the connections while we experiment, measure, and make changes.',detail:'The two-board arrangement follows our overhead photo. Hole positions and hidden contacts are illustrative, not a pin-by-pin wiring plan.',connection:'Check continuity on the actual board before wiring.'},
      {id:'esp32',name:'The detour that taught us something',short:'ESP32',value:'Temporary signal source',image:'assets/components/esp32.png',role:'Our early workaround when the first function generator could not reach the frequency range we needed.',detail:'Team 20 helped with the sampled-sine sketch. That sketch is about 1 kHz before overhead and does not generate an AM carrier. We later switched generators.',connection:'A historical experiment, not a required receiver component.'},
      {id:'test-loop',name:'A station, a few centimetres away',short:'Test loop',value:'5 turns · magnetic coupling',image:'assets/components/test-loop.png',role:'Transfers the test source’s magnetic field into the main coil without a direct electrical connection.',detail:'The exact loop shape is not clear in the photos, so this part is a representative five-turn reconstruction. Keep it on the same axis as the main coil.',connection:'Driven by the external signal source; isolated from the tank.'}
    ],
    tuningTitle: 'Find the signal.',
    tuningIntro: 'A small experiment: aim the tank at an illustrative 819 kHz carrier. Move the capacitor and watch the alignment change. Try adding probe capacitance, then retune.',
    tuningNote: 'Teaching model, not a measurement or live station. L uses Wheeler’s estimate for 75 turns, 50 mm diameter and 25 mm length. Q = 30 is assumed. Response = 1 / √(1 + Q²(f/f₀ − f₀/f)²). Extra probe capacitance is an illustrative 100 pF. Real parasitics, coupling, loading and tolerances are omitted.',
    targetKhz:819, assumedQ:30,
    challenge:'Can you bring the resonance within 5 kHz of the target?',
    matched:'On target. Now add the probe and try again.',
    unmatched:'Keep tuning: more capacitance lowers the resonant frequency.'
  },
  // The radio's signal flow, in order. M1 appears twice because it includes both halves.
  chain: [
    { title: 'Airwaves', detail: 'The starting point' },
    { title: 'Tuned circuit', detail: 'M1 · Select', current: true },
    { title: 'RF gain', detail: 'Later' },
    { title: 'Detector', detail: 'M1 · Recover', current: true },
    { title: 'Audio gain', detail: 'Later' },
    { title: 'Sound', detail: 'The destination' }
  ],
  // Add a milestone object to this array to add a tab, panel, and progress entry.
  // IDs must be unique, start with a letter, and contain only letters, numbers, or hyphens.
  // Status is 'Done', 'In progress', or 'Planned'. Do not mark a milestone Done until confirmed.
  milestones: [
    {
      id: 'm1', label: 'M1', title: 'Finding our frequency.', name: 'Tuner & detector',
      summary: 'From 75 turns of copper to our first experiments with a signal.',
      status: 'In progress', statusNote: 'Build documented · measurements and sign-off [[TBD: confirm M1 completion]]',
      objective: 'Build the front end of an AM receiver. The coil and tuning capacitor form a tank circuit that selects one station’s frequency. A peak-rectifier detector then follows the wave’s envelope: a DC level for a steady sine, or the sound carried by an AM signal.',
      // Facts here are construction specifications, not measured results.
      specs: [
        { value: '75', unit: 'turns', label: 'Close-wound copper' },
        { value: '20–280', unit: 'pF', label: 'Tuning capacitor range' },
        { value: '≈ 50', unit: 'µs', label: 'Nominal detector RC' }
      ],
      // Tell the build in your own words. media refers to an ID in this milestone's media array.
      journey: [
        { title: 'First, make the coil.', text: 'We started with the LAB2 instructions: 75 turns of 0.3 mm enamelled copper wire on a 50 mm PVC pipe. The winding is about 25 mm long and uses about 12 m of wire. We scraped roughly 1 cm of enamel off each end so the connections reached bare copper.', note: '[[TBD: how we kept the turns together without gaps or crossings]]', media: 'setup' },
        { title: 'Give it a frequency to choose.', text: 'We fixed the 20–280 pF tuning capacitor to the pipe and connected its AM section across the coil. Turning the shaft changes the capacitance, which changes the frequency the tank prefers.', note: '[[TBD: the AM terminal pair we used and how we identified it]]', media: 'top' },
        { title: 'Follow the peaks.', text: 'Next came the detector: a 1N60P diode from TP1 to TP3, with its band facing TP3. A 15 kΩ resistor and a 3.3 nF capacitor sit in parallel between TP3 and ground. Their RC is 49.5 µs, rounded to the lab’s 50 µs. The diode charges the capacitor near each peak; the resistor gives that charge a controlled way to fall.', media: 'schematic' },
        { title: 'A detour through an ESP32.', text: 'The function generator available to us initially had a limited frequency range. With help from Team 20, we tried an ESP32 circuit as a signal source for the test loop. It became our workaround while we looked for a generator that could reach the range we needed.', note: 'This exact sketch produces a sampled sine, not an AM carrier. 100 samples × 10 µs suggests about 1 kHz before sinf(), dacWrite(), and loop overhead; the actual frequency is lower. FREQ is declared but unused. This was a proof-of-concept detour, not a verified medium-wave source.', media: 'esp32', code: '#include <Arduino.h>\n#include <math.h>\n\n#define DAC_PIN 25\n#define FREQ 1000\n#define SAMPLES 100\n\nvoid setup() {\n  Serial.begin(115200);\n}\n\nvoid loop() {\n  for (int i = 0; i < SAMPLES; i++) {\n    float phase = 2.0f * PI * i / SAMPLES;\n    int value = 128 + 100 * sinf(phase);\n\n    dacWrite(DAC_PIN, value);\n\n    delayMicroseconds(10);\n  }\n}', credit: 'Sketch credit: Team 20, who helped us try this approach. Hardware note: this uses a DAC-capable ESP32 with DAC output on GPIO25; it is not portable to every ESP32 variant.' },
        { title: 'Back to the signal generator.', text: 'We eventually found a function generator with a wider frequency range and moved on from the ESP32 approach. Our test arrangement uses a five-turn loop a few centimetres from the main coil, with both coils on the same axis. We read TP1 on the oscilloscope and TP3’s DC level on the multimeter.', note: 'The lab procedure calls for a compensated ×10 probe and the scope channel set to ×10. [[TBD: confirm our probe settings, generator model, and frequency range]]', media: 'generator1' },
        { title: 'Now, put numbers to the response.', text: 'The next documentation step is to record the resonance at half capacitor travel, find both tuning limits, then sweep to the 0.7-of-peak points for bandwidth. At resonance, six source amplitudes will let us map TP1’s peak to TP3’s DC output.', note: '[[TBD: our measurements and what changed as we turned the capacitor]]', media: 'wave' }
      ],
      // Formula text is rendered with native MathML; descriptions should explain the intuition.
      theory: [
        { title: 'The frequency the tank prefers', kind: 'resonance', text: 'f₀ = 1 / (2π√(LC)). Use L in henries and C in farads to obtain hertz. More inductance or capacitance lowers the resonant frequency.' },
        { title: 'Estimate before winding', kind: 'wheeler', text: 'Wheeler’s single-layer estimate gives L in µH when diameter d and winding length l are in mm, with n turns. It is a prediction to compare with the real coil.' },
        { title: 'How selective is it?', kind: 'quality', text: 'At half capacitor travel, find f₀, then f_low and f_high where TP1 falls to about 0.7 of its peak. Use the same frequency unit throughout. A higher Q means a narrower response.' },
        { title: 'Keep the envelope', kind: 'rc', text: 'The diode conducts near positive peaks and charges the capacitor. Between peaks, the resistor discharges it. RC should be long compared with a carrier cycle but short enough to follow the sound’s envelope. Very small peaks produce little output: the diode’s “dead zone” is a gradual practical effect, not a perfectly fixed threshold.' }
      ],
      // Record what actually happened. Unconfirmed starter cards deliberately retain TBD markers.
      problems: [
        { problem: 'The first generator could not reach the range we needed.', why: 'Its available frequency range was limited. [[TBD: original generator model and upper limit]]', solution: 'We tried the ESP32 approach with Team 20’s help, then switched to a function generator with a wider frequency range.' },
        { problem: 'Winding the coil without gaps or crossings.', why: '[[TBD: what happened while we wound our coil]]', solution: '[[TBD: our winding solution]]' },
        { problem: 'The probe can shift the resonance.', why: 'A ×1 probe adds about 100 pF across the tank, changing its effective capacitance.', solution: 'Compensate the probe and use ×10 on both the probe and scope channel. [[TBD: confirm we did this]]' },
        { problem: 'A weak signal may barely move TP3.', why: 'Small tank peaks can sit in the detector’s low-output region.', solution: '[[TBD: whether we encountered this and how we resolved it]]' },
        { problem: 'Finding the capacitor’s AM terminals.', why: '[[TBD: what made the terminal pair unclear on our capacitor]]', solution: '[[TBD: how we identified the right pair]]' },
        { problem: '[[TBD: another problem we actually faced]]', why: '[[TBD: its cause]]', solution: '[[TBD: our fix]]' }
      ],
      // Table 4 and Table 5: enter numeric values only (units are separate).
      results: {
        note: 'The construction is here; the measurement record is still being filled in. Blank values below are intentional. Nominal component values are not measured performance.',
        predictions: [
          { key: 'inductance', label: 'Coil inductance L', value: '[[TBD: predicted L]]', unit: 'µH' },
          { key: 'cap819', label: 'C for 819 kHz', value: '[[TBD: C at 819 kHz]]', unit: 'pF' },
          { key: 'bandLow', label: 'f at 280 pF', value: '[[TBD: predicted low end]]', unit: 'kHz' },
          { key: 'bandHigh', label: 'f at 20 pF', value: '[[TBD: predicted high end]]', unit: 'MHz' },
          { key: 'rc', label: 'RC (rounded nominal)', value: 50, unit: 'µs' }
        ],
        tank: [
          { key: 'bandLow', label: 'Band low end', value: '[[TBD: measured low end]]', unit: 'kHz' },
          { key: 'bandHigh', label: 'Band high end', value: '[[TBD: measured high end]]', unit: 'MHz' },
          { key: 'f0', label: 'f₀ at half travel', value: '[[TBD: measured f0]]', unit: 'kHz' },
          { key: 'fLow', label: 'f_low at 0.7 of peak', value: '[[TBD: measured f_low]]', unit: 'kHz' },
          { key: 'fHigh', label: 'f_high at 0.7 of peak', value: '[[TBD: measured f_high]]', unit: 'kHz' },
          { key: 'q', label: 'Quality factor Q', value: '[[TBD: Q]]', unit: '' }
        ],
        // Six Table 6 rows. Numeric tp1/tp3 pairs automatically draw the SVG chart.
        detector: [
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' },
          { source: '[[TBD]]', tp1: '[[TBD]]', tp3: '[[TBD]]' }
        ],
        // Match prediction/tank keys so comparisons update from the tables above.
        comparisons: [
          { label: 'Low end (kHz)', predictionKey: 'bandLow', measuredKey: 'bandLow' },
          { label: 'High end (MHz)', predictionKey: 'bandHigh', measuredKey: 'bandHigh' }
        ],
        stats: [
          { label: 'Resonance at half travel', key: 'f0', unit: 'kHz' },
          { label: 'Quality factor', key: 'q', unit: '' }
        ]
      },
      // Lessons and the handoff to the next milestone. Keep unverified observations explicit.
      learned: [
        'A source that produces a visible waveform is not automatically a source that reaches the tank’s resonant band. Our ESP32 detour made that distinction concrete.',
        'The measuring instrument is part of the circuit: probe capacitance changes what the tank sees.',
        'A steady sine gives the detector a DC level; an AM wave gives it an envelope to follow.',
        '[[TBD: what our measured bandwidth and detector curve taught us]]'
      ],
      next: { id: 'm2', text: 'Keep the tuner and detector intact: the later stages build on them. First, finish the M1 measurement record; then begin the next chapter.', label: 'M2 · Coming soon →' },
      // Media types: image, video, youtube, drive. Embed src must be a provider embed/preview URL.
      // Missing images stay attractive: use missing:true until the file exists, then remove it.
      // Videos default to muted, never autoplay, and download only on playback (preload:none).
      media: [
        { id: 'setup', type: 'image', src: 'assets/m1/setup.jpg', alt: 'Copper coil, tuning capacitor, two breadboards, and probes in the complete bench setup.', caption: 'The whole setup, with our wound coil at the centre.' },
        { id: 'top', type: 'image', src: 'assets/m1/top-view.jpg', alt: 'Top view of the coil between a capacitor breadboard and the ESP32 breadboard.', caption: 'An overhead view of the connections during the ESP32 experiments.' },
        { id: 'esp32', type: 'image', src: 'assets/m1/esp32-circuit.jpg', alt: 'ESP32 development board, jumper wires, and components on a breadboard beside the main coil.', caption: 'The ESP32 detour. Thanks to Team 20 for helping us try it.' },
        { id: 'wave', type: 'image', src: 'assets/m1/esp32-wave.jpg', alt: 'Oscilloscope photograph with cyan and yellow traces captured during the ESP32 experiments.', caption: 'Our scope capture during the ESP32 approach. [[TBD: channel connections and signal settings; this is not yet a verified TP1 resonance measurement]]' },
        { id: 'esp32video', type: 'video', src: 'assets/m1/esp32-wave.mp4', poster: 'assets/m1/esp32-wave.jpg', muted: true, caption: 'ESP32 waveform experiment · starts muted.', description: '[[TBD: describe the trace changes in this clip and add a transcript if speech is relevant]]' },
        { id: 'generator1', type: 'video', src: 'assets/m1/generator-01.mp4', muted: true, caption: 'After switching to the wider-range function generator · part 1.', description: '[[TBD: test settings and a text description of what this clip demonstrates]]' },
        { id: 'generator2', type: 'video', src: 'assets/m1/generator-02.mp4', muted: true, caption: 'After switching to the wider-range function generator · part 2.', description: '[[TBD: test settings and a text description of what this clip demonstrates]]' },
        { id: 'schematic', type: 'image', src: 'assets/m1/schematic.svg', alt: 'Five-turn generator loop inductively couples to a parallel 75-turn coil and 20–280 pF capacitor at TP1. A 1N60P diode points toward TP3, with a 15 kilohm resistor and 3.3 nanofarad capacitor in parallel to ground.', caption: 'M1 test circuit · redrawn from LAB2, Figure 3. The diode band faces TP3.' },
        { id: 'coil', type: 'image', src: 'assets/m1/coil.jpg', missing: true, alt: '[[TBD: description of our close-up coil photograph]]', caption: '[[TBD: a close-up of the winding and stripped wire ends]]' },
        { id: 'detector', type: 'image', src: 'assets/m1/detector.jpg', missing: true, alt: '[[TBD: description of our detector close-up]]', caption: '[[TBD: close-up of the 1N60P, 15 kΩ resistor, and 3.3 nF capacitor]]' },
        { id: 'resonance', type: 'image', src: 'assets/m1/resonance.jpg', missing: true, alt: '[[TBD: TP1 resonance scope screenshot]]', caption: '[[TBD: resonance at TP1 with frequency, probe ratio, and scale visible]]' },
        { id: 'tuning', type: 'video', src: 'assets/m1/tuning.mp4', missing: true, caption: '[[TBD: a short video turning the capacitor while TP3 changes]]' }
      ]
    },
    // M2: fill this same template when the next build starts; its tab is linkable now.
    {
      id: 'm2', label: 'M2', name: 'Coming soon', title: 'The next chapter.', status: 'Planned',
      summary: '[[TBD: milestone 2 title and short summary]]',
      objective: '[[TBD: what M2 adds to our radio and why it matters]]',
      journey: [{ title: '[[TBD: our first M2 step]]', text: '[[TBD: what we tried, built, and changed]]' }],
      problems: [{ problem: '[[TBD: M2 problem]]', why: '[[TBD: cause]]', solution: '[[TBD: solution]]' }],
      results: { note: '[[TBD: M2 measurements and results]]' },
      learned: ['[[TBD: what we learned in M2]]'],
      next: { id: 'm3', text: '[[TBD: how M2 leads into M3]]', label: 'M3 · Coming soon →' },
      media: [{ id: 'm2photo', type: 'image', src: 'assets/m2/placeholder.svg', missing: true, caption: '[[TBD: M2 build photographs and videos]]' }]
    },
    // M3: duplicate this object for M4, change its ID/label, then fill the sections.
    {
      id: 'm3', label: 'M3', name: 'Coming soon', title: 'More to tune into.', status: 'Planned',
      summary: '[[TBD: milestone 3 title and short summary]]',
      objective: '[[TBD: what M3 adds to our radio and why it matters]]',
      journey: [{ title: '[[TBD: our first M3 step]]', text: '[[TBD: what we tried, built, and changed]]' }],
      problems: [{ problem: '[[TBD: M3 problem]]', why: '[[TBD: cause]]', solution: '[[TBD: solution]]' }],
      results: { note: '[[TBD: M3 measurements and results]]' },
      learned: ['[[TBD: what we learned in M3]]'],
      next: { text: '[[TBD: the next milestone after M3]]' },
      media: [{ id: 'm3photo', type: 'image', src: 'assets/m3/placeholder.svg', missing: true, caption: '[[TBD: M3 build photographs and videos]]' }]
    }
  ]
};
````

## js/script.js

````javascript
(() => {
  'use strict';
  const { project: p, ui, chain, milestones } = window.RADIO_CONTENT;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const rich = value => escape(value).replace(/\[\[TBD[^\]]*\]\]/g, '<mark class="tbd">$&</mark>');
  const number = value => typeof value === 'number' && Number.isFinite(value);
  const format = value => number(value) ? new Intl.NumberFormat('en', { maximumFractionDigits: 3 }).format(value) : rich(value);
  const safePath = value => /^(?!\/|[a-z]+:|.*(?:^|\/)\.\.\/)[^<>]+$/i.test(value || '') ? value : '';
  const external = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : ''; } catch (_) { return ''; } };
  const unique = new Set();
  milestones.forEach(m => {
    if (!/^[a-z][a-z0-9-]*$/i.test(m.id) || unique.has(m.id)) throw new Error('Each milestone needs a unique, valid ID.');
    unique.add(m.id);
  });
  const badge = m => `<span class="badge ${m.status === 'Done' ? 'done' : m.status === 'Planned' ? 'planned' : ''}"><span aria-hidden="true">${m.status === 'Done' ? '✓' : '•'}</span> ${rich(m.status)}</span>`;
  const section = (m, key, body) => `<section class="chapter-section" aria-labelledby="${m.id}-${key}"><div class="section-label"><span aria-hidden="true">${({ objective: '01', journey: '02', theory: '03', problems: '04', results: '05', learned: '06', gallery: '07' })[key]}</span><h3 id="${m.id}-${key}">${rich(ui[key])}</h3></div>${body}</section>`;
  const emptyMedia = item => `<div class="media-empty"><img src="assets/placeholder.svg" alt="" loading="lazy" width="160" height="100"><span>${rich(ui.mediaMissing)}</span><code>${escape(item.src)}</code></div>`;
  function media(item) {
    if (!item) return '';
    let body;
    const src = escape(safePath(item.src));
    if (item.missing) body = emptyMedia(item);
    else if (item.type === 'image') body = `<button class="image-button" type="button" data-enlarge data-src="${src}" data-alt="${escape(item.alt)}" data-caption="${escape(item.caption)}" aria-label="Enlarge: ${escape(item.alt)}"><img src="${src}" alt="${escape(item.alt)}" loading="lazy" decoding="async" width="1600" height="1200"><span class="enlarge" aria-hidden="true">↗</span></button>`;
    else if (item.type === 'video') body = `<video controls playsinline preload="none" ${item.muted !== false ? 'muted' : ''} ${item.poster ? `poster="${escape(safePath(item.poster))}"` : ''} data-video="${src}" aria-label="${escape(item.caption)}">${item.track ? `<track kind="captions" src="${escape(safePath(item.track))}" srclang="en" label="English" default>` : ''}</video><a class="video-link" href="${src}">Open video file ↗</a>`;
    else body = `<div class="embed-slot"><button type="button" class="text-button" data-embed="${escape(item.src)}" data-provider="${escape(item.type)}" data-title="${escape(item.caption)}">${rich(ui.loadEmbed)} ↗</button><small>${rich(ui.embedNote)}</small></div>`;
    return `<figure class="media ${item.type === 'image' && item.src.endsWith('.svg') ? 'diagram-media' : ''}">${body}<figcaption>${rich(item.caption)}</figcaption>${item.description ? `<p class="media-description">${rich(item.description)}</p>` : ''}</figure>`;
  }
  const formulas = {
    resonance: '<msub><mi>f</mi><mn>0</mn></msub><mo>=</mo><mfrac><mn>1</mn><mrow><mn>2</mn><mi>π</mi><msqrt><mi>L</mi><mi>C</mi></msqrt></mrow></mfrac>',
    wheeler: '<mi>L</mi><mo>≈</mo><mfrac><mrow><msup><mi>d</mi><mn>2</mn></msup><msup><mi>n</mi><mn>2</mn></msup></mrow><mrow><mn>457</mn><mi>d</mi><mo>+</mo><mn>1016</mn><mi>l</mi></mrow></mfrac>',
    quality: '<mi>Q</mi><mo>=</mo><mfrac><msub><mi>f</mi><mn>0</mn></msub><mrow><msub><mi>f</mi><mtext>high</mtext></msub><mo>−</mo><msub><mi>f</mi><mtext>low</mtext></msub></mrow></mfrac>',
    rc: '<mi>τ</mi><mo>=</mo><mi>R</mi><mi>C</mi><mo>≈</mo><mn>50</mn><mtext> µs</mtext>'
  };
  function table(title, headings, rows) {
    return `<div class="table-scroll" role="region" aria-label="${escape(title)}" tabindex="0"><table><caption>${rich(title)}</caption><thead><tr>${headings.map(h => `<th scope="col">${rich(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(row => `<tr>${row.map((cell, i) => i === 0 ? `<th scope="row">${cell}</th>` : `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function tankValues(results) {
    const values = Object.fromEntries((results.tank || []).map(r => [r.key, r.value]));
    if (!number(values.q) && [values.f0, values.fLow, values.fHigh].every(number) && values.fLow > 0 && values.fLow < values.f0 && values.fHigh > values.f0) values.q = values.f0 / (values.fHigh - values.fLow);
    return values;
  }
  function chart(rows, id) {
    const points = rows.filter(r => number(r.tp1) && number(r.tp3) && r.tp1 >= 0 && r.tp3 >= 0).slice().sort((a, b) => a.tp1 - b.tp1);
    const maxX = Math.max(1, ...points.map(r => r.tp1)) * 1.1;
    const maxY = Math.max(1, ...points.map(r => r.tp3)) * 1.1;
    const x = n => 70 + n / maxX * 610;
    const y = n => 260 - n / maxY * 220;
    const ticks = Array.from({ length: 5 }, (_, i) => {
      const t = i / 4;
      return `<line class="grid-line" x1="70" y1="${y(t * maxY)}" x2="680" y2="${y(t * maxY)}"/>${points.length ? `<text x="58" y="${y(t * maxY) + 4}" text-anchor="end">${format(t * maxY)}</text><text x="${x(t * maxX)}" y="283" text-anchor="middle">${format(t * maxX)}</text>` : ''}`;
    }).join('');
    return `<figure class="chart"><h4>${rich(ui.chart)}</h4><svg viewBox="0 0 720 330" role="img" aria-labelledby="${id}-chart-title ${id}-chart-desc"><title id="${id}-chart-title">${escape(ui.chart)}</title><desc id="${id}-chart-desc">${escape(points.length ? `${points.length} measured pairs plotted from Table 6. Read the table for exact values.` : 'No measured data yet. Axes only; no fabricated response curve.')}</desc>${ticks}<path class="axis" d="M70 35V260H685"/><text x="375" y="318" text-anchor="middle">${escape(ui.chartAxisX)}</text><text transform="translate(18 150) rotate(-90)" text-anchor="middle">${escape(ui.chartAxisY)}</text>${points.length > 1 ? `<polyline class="plot" points="${points.map(r => `${x(r.tp1)},${y(r.tp3)}`).join(' ')}"/>` : ''}${points.map(r => `<circle class="plot-point" cx="${x(r.tp1)}" cy="${y(r.tp3)}" r="4"><title>TP1 ${r.tp1} mV; TP3 ${r.tp3} mV</title></circle>`).join('')}</svg>${!points.length ? `<p class="chart-empty">${rich(ui.chartEmpty)}</p>` : ''}<figcaption>${rich(ui.chartNote)}</figcaption></figure>`;
  }
  function results(m) {
    const r = m.results || {};
    const values = tankValues(r);
    let html = `<p class="section-intro">${rich(r.note || '[[TBD: results]]')}</p>`;
    if (r.stats) html += `<div class="stats measured-stats">${r.stats.map(s => `<div><strong>${format(values[s.key] ?? '[[TBD]]')} <small>${escape(s.unit)}</small></strong><span>${rich(s.label)}</span></div>`).join('')}</div>`;
    if (r.predictions) html += table(ui.predictions, [ui.quantity, ui.value], r.predictions.map(v => [rich(v.label), `${format(v.value)} <span class="unit">${escape(v.unit)}</span>`]));
    if (r.tank) html += table(ui.tank, [ui.quantity, ui.value], r.tank.map(v => [rich(v.label), `${format(values[v.key])} <span class="unit">${escape(v.unit)}</span>`]));
    if (r.detector) html += table(ui.detector, [ui.sourceAmplitude, ui.tp1, ui.tp3], r.detector.map(v => [format(v.source), format(v.tp1), format(v.tp3)])) + chart(r.detector, m.id);
    if (r.comparisons) {
      html += table(ui.comparison, [ui.quantity, ui.prediction, ui.measured, ui.error], r.comparisons.map(c => {
        const pred = r.predictions.find(v => v.key === c.predictionKey);
        const measured = r.tank.find(v => v.key === c.measuredKey);
        const a = pred?.value, b = values[c.measuredKey];
        const error = number(a) && number(b) ? b === 0 ? 'Undefined (measured = 0)' : pred?.unit !== measured?.unit ? 'Unit mismatch' : 100 * (a - b) / b : '[[TBD: prediction and measurement]]';
        return [rich(c.label), format(a ?? '[[TBD]]'), format(b ?? '[[TBD]]'), format(error)];
      }));
      html += `<p class="fine-print">${rich(ui.errorFormula)}</p>`;
    }
    return html;
  }
  function panel(m) {
    return `<article id="panel-${m.id}" role="tabpanel" aria-labelledby="tab-${m.id}" tabindex="0" hidden>
      <header class="chapter-heading"><div><p class="eyebrow">CHAPTER ${escape(m.label.replace('M', '').padStart(2, '0'))} / ${rich(m.name)}</p><h2>${rich(m.title)}</h2><p class="chapter-summary">${rich(m.summary)}</p></div><div class="chapter-status">${badge(m)}${m.statusNote ? `<p>${rich(m.statusNote)}</p>` : ''}${m.status === 'Planned' ? `<p>${rich(ui.plannedNote)}</p>` : ''}</div></header>
      ${section(m, 'objective', `<p class="objective-copy">${rich(m.objective)}</p>${m.specs ? `<div class="stats">${m.specs.map(s => `<div><strong>${rich(s.value)} <small>${rich(s.unit)}</small></strong><span>${rich(s.label)}</span></div>`).join('')}</div>` : ''}`)}
      ${section(m, 'journey', `<ol class="timeline">${(m.journey || []).map((step, i) => `<li><div class="step-copy"><span class="step-number">${String(i + 1).padStart(2, '0')}</span><h4>${rich(step.title)}</h4><p>${rich(step.text)}</p>${step.note ? `<aside class="note">${rich(step.note)}</aside>` : ''}${step.code ? `<details class="code-details"><summary>${rich(ui.code)} <span aria-hidden="true">↗</span></summary><pre><code>${escape(step.code)}</code></pre><p class="fine-print">${rich(step.credit)}</p></details>` : ''}</div>${media((m.media || []).find(item => item.id === step.media))}</li>`).join('')}</ol>`)}
      ${m.theory?.length ? section(m, 'theory', `<div class="theory-grid">${m.theory.map(t => `<div><h4>${rich(t.title)}</h4>${formulas[t.kind] ? `<math display="block">${formulas[t.kind]}</math>` : ''}<p>${rich(t.text)}</p></div>`).join('')}</div>`) : ''}
      ${section(m, 'problems', `<div class="problem-grid">${(m.problems || []).map((item, i) => `<article class="problem-card"><span class="eyebrow">FIELD NOTE ${String(i + 1).padStart(2, '0')}</span><h4><span class="sr-only">${escape(ui.problem)}: </span>${rich(item.problem)}</h4><dl><dt>${rich(ui.why)}</dt><dd>${rich(item.why)}</dd><dt>${rich(ui.solution)}</dt><dd>${rich(item.solution)}</dd></dl></article>`).join('')}</div>`)}
      ${section(m, 'results', results(m))}
      ${section(m, 'learned', `<ul class="lessons">${(m.learned || []).map(item => `<li>${rich(item)}</li>`).join('')}</ul>`)}
      ${section(m, 'gallery', `<p class="section-intro">${rich(ui.galleryHint)}</p><div class="gallery">${(m.media || []).map(media).join('')}</div>`)}
      <aside class="next-step"><div><p class="eyebrow">${rich(ui.next)}</p><p>${rich(m.next?.text || '[[TBD: next step]]')}</p></div>${m.next?.id && unique.has(m.next.id) ? `<a href="#${escape(m.next.id)}" data-milestone="${escape(m.next.id)}">${rich(m.next.label)}</a>` : ''}</aside>
    </article>`;
  }
  const completed = milestones.filter(m => m.status === 'Done').length;
  $('#site').innerHTML = `
    <header class="site-header wrap"><a class="wordmark" href="#top" aria-label="${escape(p.name)} — home"><span class="radio-mark" aria-hidden="true">◉</span><span>${escape(p.transliteration)}</span></a><span class="header-term">${escape(p.department)} / ${escape(p.term)}</span><button class="theme-toggle" id="theme-toggle" type="button" aria-label="${escape(ui.theme)}"></button></header>
    <main id="top" class="wrap">
      <section class="hero" aria-labelledby="project-title"><div class="hero-copy"><p class="eyebrow"><span class="signal-dot" aria-hidden="true"></span> ${rich(ui.journal)} <span class="edition">NO. ${escape(p.team)}</span></p><h1 id="project-title" lang="ar" dir="rtl">${escape(p.name)}</h1><p class="tagline">${rich(p.tagline)}</p><p class="hero-intro">${rich(p.intro)}</p><a class="primary-link" href="#${escape(milestones[0].id)}" data-jump>${rich(ui.read)} <span aria-hidden="true">↘</span></a><div class="team-line"><span class="team-label">${rich(ui.team)} ${escape(p.team)}</span><ul>${p.members.map(name => `<li>${escape(name)}</li>`).join('')}</ul></div></div><figure class="hero-photo"><img src="${escape(safePath(p.hero.src))}" alt="${escape(p.hero.alt)}" width="1600" height="1200" fetchpriority="high"><span class="photo-label" aria-hidden="true">WORK IN<br>PROGRESS</span><figcaption>${rich(p.hero.caption)}</figcaption></figure></section>
      <section class="overview" aria-labelledby="overview-title"><div class="overview-head"><div><p class="eyebrow">${rich(ui.overview)}</p><h2 id="overview-title">${rich(ui.overviewTitle)}</h2></div><p>${rich(ui.overviewText)}</p></div><ol class="signal-chain" aria-label="Radio signal chain">${chain.map(c => `<li class="${c.current ? 'current' : ''}"><strong>${rich(c.title)}</strong><span>${rich(c.detail)}</span></li>`).join('')}</ol><div class="progress-row"><div class="progress-caption"><span>${rich(ui.progress)}</span><strong>${completed} / ${milestones.length} ${rich(ui.done)}</strong></div><progress value="${completed}" max="${milestones.length}" aria-label="${escape(ui.progress)}">${completed}/${milestones.length}</progress><ul>${milestones.map(m => `<li><span class="status-dot ${m.status === 'Planned' ? 'planned' : ''}" aria-hidden="true"></span>${escape(m.label)} <span>${rich(m.status)}</span></li>`).join('')}</ul></div></section>
      <section id="milestones" class="milestones" aria-label="${escape(ui.milestones)}"><div class="tab-bar"><div role="tablist" aria-label="${escape(ui.milestones)}">${milestones.map(m => `<button type="button" role="tab" id="tab-${m.id}" aria-controls="panel-${m.id}" aria-selected="false" tabindex="-1" data-tab="${m.id}"><span>${escape(m.label)}</span><span class="tab-name">${rich(m.status === 'Planned' ? ui.soon : m.name)}</span></button>`).join('')}</div><button type="button" class="print-button" id="print-button">${rich(ui.print)} ↗</button></div>${milestones.map(panel).join('')}</section>
    </main><footer class="site-footer wrap"><div><span class="footer-name" lang="ar" dir="rtl">${escape(p.name)}</span><p>${rich(ui.footer)}</p></div><div><p>${rich(p.department)}<br>${rich(p.course)}<br>${rich(p.term)} · <time datetime="${escape(p.date)}">${escape(p.dateLabel)}</time></p></div><div class="footer-links"><a href="${escape(safePath(p.source))}" target="_blank" rel="noopener">${rich(ui.source)}</a>${external(p.repo) ? `<a href="${escape(external(p.repo))}" target="_blank" rel="noopener">${rich(ui.repository)}</a>` : `<span>${rich(p.repo)}</span>`}</div></footer>`;

  // Theme follows the OS until the reader chooses an explicit override. Cycle back to System.
  let theme = document.documentElement.dataset.theme || 'system';
  function applyTheme() {
    if (theme === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = theme;
    $('#theme-toggle').textContent = `${theme === 'dark' ? '◐' : theme === 'light' ? '☼' : '◑'} ${ui.themes[['system', 'light', 'dark'].indexOf(theme)]}`;
    $('#theme-toggle').setAttribute('aria-label', `${ui.theme}: ${theme}. Activate to change.`);
  }
  applyTheme();
  $('#theme-toggle').addEventListener('click', () => {
    theme = ['system', 'light', 'dark'][(['system', 'light', 'dark'].indexOf(theme) + 1) % 3];
    try { theme === 'system' ? localStorage.removeItem('radio-theme') : localStorage.setItem('radio-theme', theme); } catch (_) { /* Optional persistence. */ }
    applyTheme();
  });
  $('#print-button').addEventListener('click', () => window.print());

  // Tabs use automatic activation, roving tabindex, and native hash history.
  const sidebar = document.createElement('nav');
  sidebar.className = 'section-sidebar';
  sidebar.setAttribute('aria-label', ui.sectionNav);
  $('#milestones').before(sidebar);
  function updateSidebar(id) {
    const headings = $$(`#panel-${id} .section-label h3`);
    sidebar.innerHTML = `<p class="eyebrow">${rich(ui.sectionNav)}</p><ol>${headings.map((h, i) => `<li><a href="#${h.id}"><span>${String(i + 1).padStart(2, '0')}</span>${escape(h.textContent)}</a></li>`).join('')}</ol>`;
    $$('a', sidebar).forEach(link => link.addEventListener('click', event => {
      event.preventDefault();
      const target = $(link.getAttribute('href'));
      target.tabIndex = -1;
      target.focus({ preventScroll: true });
      target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
    }));
  }
  let activeId;
  function activate(id) {
    if (!unique.has(id)) id = milestones[0].id;
    if (id !== activeId) {
      $$('video').forEach(video => video.pause());
      $$('.embed-slot iframe').forEach(frame => { const slot = frame.parentElement; frame.remove(); slot.querySelector('button').hidden = false; });
    }
    document.dispatchEvent(new Event('radio:tab'));
    activeId = id;
    updateSidebar(id);
    $$('[data-tab]').forEach(tab => { const selected = tab.dataset.tab === id; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
    $$('[role="tabpanel"]').forEach(panel => { panel.hidden = panel.id !== `panel-${id}`; });
  }
  function navigate(id, focus = false) {
    activate(id);
    if (location.hash !== `#${id}`) location.hash = id;
    if (focus) $(`#tab-${id}`).focus();
  }
  function readHash() {
    const id = location.hash.slice(1);
    if (unique.has(id)) activate(id);
    else if (!activeId) { activate(milestones[0].id); try { history.replaceState(null, '', `#${activeId}`); } catch (_) { /* file: mode */ } }
  }
  $$('[data-tab]').forEach((tab, i, tabs) => {
    tab.addEventListener('click', () => navigate(tab.dataset.tab));
    tab.addEventListener('keydown', event => {
      let target;
      if (event.key === 'ArrowRight') target = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') target = (i - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') target = 0;
      if (event.key === 'End') target = tabs.length - 1;
      if (target !== undefined) { event.preventDefault(); navigate(tabs[target].dataset.tab, true); }
    });
  });
  document.addEventListener('radio:content', () => updateSidebar(activeId));
  window.addEventListener('hashchange', readHash);
  readHash();
  $$('[data-milestone], [data-jump]').forEach(link => link.addEventListener('click', event => {
    event.preventDefault();
    navigate(link.getAttribute('href').slice(1), true);
    $('#milestones').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'start' });
  }));

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting || entry.target.closest('[hidden]')) return;
        entry.target.classList.add('section-arrived');
        const heading = $('h3', entry.target);
        if (heading) $$('a', sidebar).forEach(link => {
          if (link.hash === `#${heading.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-10% 0px -55% 0px', threshold: 0 });
    $$('.chapter-section').forEach(section => sectionObserver.observe(section));
    document.addEventListener('radio:content', () => $$('.chapter-section').forEach(section => sectionObserver.observe(section))); 
  }

  // Missing assets fall back cleanly, including a missing real photo after deployment.
  document.addEventListener('error', event => {
    const img = event.target;
    if (img.tagName !== 'IMG' || img.closest('#lightbox')) return;
    const button = img.closest('[data-enlarge]');
    if (button) button.outerHTML = emptyMedia({ src: button.dataset.src });
    else if (img.closest('.hero-photo')) img.outerHTML = emptyMedia({ src: p.hero.src });
  }, true);

  // No video source is attached until it approaches the viewport; preload:none avoids downloading it.
  function loadVideo(video) { if (!video.src) { video.src = video.dataset.video; video.load(); } }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { loadVideo(entry.target); observer.unobserve(entry.target); } }), { rootMargin: '200px' });
    $$('video[data-video]').forEach(video => observer.observe(video));
  } else $$('video[data-video]').forEach(loadVideo);
  $$('[data-embed]').forEach(button => button.addEventListener('click', () => {
    const src = external(button.dataset.embed);
    const url = src ? new URL(src) : null;
    const valid = url && ((button.dataset.provider === 'youtube' && ['www.youtube.com', 'www.youtube-nocookie.com'].includes(url.hostname) && /^\/embed\/[\w-]+$/.test(url.pathname)) || (button.dataset.provider === 'drive' && url.hostname === 'drive.google.com' && /^\/file\/d\/[\w-]+\/preview$/.test(url.pathname)));
    if (!valid) { button.after(document.createTextNode(' [[TBD: valid YouTube embed or Drive preview URL]]')); button.disabled = true; return; }
    const frame = document.createElement('iframe');
    frame.src = url.href; frame.title = button.dataset.title; frame.loading = 'lazy'; frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin'; frame.allow = 'fullscreen; picture-in-picture';
    button.hidden = true; button.parentElement.append(frame);
  }));

  // Native dialog provides focus trapping and Escape. Arrow keys browse the current milestone.
  const dialog = $('#lightbox');
  let gallery = [], position = 0, opener;
  function showImage() {
    const item = gallery[position];
    $('#lightbox-image').src = item.dataset.src;
    $('#lightbox-image').alt = item.dataset.alt;
    $('#lightbox-caption').innerHTML = rich(item.dataset.caption);
    $('#lightbox-count').textContent = `${position + 1} / ${gallery.length}`;
    $('#lightbox-prev').disabled = $('#lightbox-next').disabled = gallery.length < 2;
  }
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-enlarge]');
    if (!button) return;
    opener = button;
    const seen = new Set();
    gallery = $$('[data-enlarge]', $(`#panel-${activeId}`)).filter(b => { if (seen.has(b.dataset.src)) return false; seen.add(b.dataset.src); return true; });
    position = gallery.findIndex(b => b.dataset.src === button.dataset.src);
    showImage(); dialog.showModal(); document.body.classList.add('modal-open'); $('#lightbox-close').focus();
  });
  function move(direction) { position = (position + direction + gallery.length) % gallery.length; showImage(); }
  $('#lightbox-prev').addEventListener('click', () => move(-1));
  $('#lightbox-next').addEventListener('click', () => move(1));
  $('#lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('keydown', event => { if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') { event.preventDefault(); move(event.key === 'ArrowLeft' ? -1 : 1); } });
  dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (opener?.isConnected) opener.focus(); });
})();
````

## js/circuit-model.js

````javascript
/* Original, photo-informed 3D geometry. Dimensions are nominal; housing details are illustrative.
   Each vertex contains position, normal, and colour. No external renderer or model loader. */
(() => {
  const TAU = Math.PI * 2;
  const add = (a,b) => a.map((v,i)=>v+b[i]);
  const sub = (a,b) => a.map((v,i)=>v-b[i]);
  const scale = (a,s) => a.map(v=>v*s);
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  const norm = a => scale(a,1/(Math.hypot(...a)||1));
  const rgb = h => [1,3,5].map(i=>parseInt(h.slice(i,i+2),16)/255);
  function build() {
    const parts = [];
    let part;
    function group(id,position,explode) { part={id,position,explode,vertices:[]}; parts.push(part); }
    function tri(a,b,c,colour) { const n=norm(cross(sub(b,a),sub(c,a))); for(const p of [a,b,c]) part.vertices.push(...p,...n,...rgb(colour)); }
    function quad(a,b,c,d,colour) { tri(a,b,c,colour);tri(a,c,d,colour); }
    function box(center,size,colour) {
      const v=Array.from({length:8},(_,i)=>center.map((x,j)=>x+size[j]*((i>>j&1)? .5:-.5)));
      for(const f of [[0,4,6,2],[1,3,7,5],[0,1,5,4],[2,6,7,3],[0,2,3,1],[4,5,7,6]])quad(...f.map(i=>v[i]),colour);
    }
    function tube(a,b,r,colour,sides=10) {
      const axis=norm(sub(b,a)), u=norm(cross(axis,Math.abs(axis[1])<.9?[0,1,0]:[1,0,0])),v=cross(axis,u);
      const ring=(p,t)=>add(p,add(scale(u,Math.cos(t)*r),scale(v,Math.sin(t)*r)));
      for(let i=0;i<sides;i++) {const t=i*TAU/sides,q=(i+1)*TAU/sides;quad(ring(a,t),ring(a,q),ring(b,q),ring(b,t),colour);tri(a,ring(a,q),ring(a,t),colour);tri(b,ring(b,t),ring(b,q),colour);}
    }
    function path(points,r,colour,sides=6) {for(let i=1;i<points.length;i++)tube(points[i-1],points[i],r,colour,sides);}
    function ring(radius,y,width,height,colour) {
      for(let i=0;i<72;i++) {const a=i*TAU/72,b=(i+1)*TAU/72;
        const p=(r,h,t)=>[r*Math.cos(t),h,r*Math.sin(t)];
        quad(p(radius,y,a),p(radius,y,b),p(radius,y+height,b),p(radius,y+height,a),colour);
        quad(p(radius-width,y,b),p(radius-width,y,a),p(radius-width,y+height,a),p(radius-width,y+height,b),'#b6c7c4');
        quad(p(radius,y+height,a),p(radius,y+height,b),p(radius-width,y+height,b),p(radius-width,y+height,a),'#e4e9df');
      }
    }
    group('breadboard',[35,0,0],[0,-24,0]);
    for(const z of [-47,47]) {
      box([0,2,z],[160,4,56],'#e5e8df');box([0,4.05,z],[151,.2,3],'#9ca8a3');
      for(const dz of [-23,23])box([0,4.2,z+dz],[150,.15,.45],dz<0?'#a55845':'#588d92');
      for(let x=-72;x<=72;x+=4)for(let row=-5;row<=5;row++)if(row)box([x,4.2,z+row*3.5],[1.3,.25,1.3],'#59665e');
    }
    group('coil',[-63,29,0],[-22,25,0]);
    ring(25,-25,2,50,'#d4e0d9');
    for(const z of [-1,1])box([0,z*22,25],[8,5,1],'#242b28');
    const start=part.vertices.length/9;
    for(let i=0;i<75*32;i++){
      const p=t=>[25.4*Math.cos(t*TAU/32),-12.5+25*t/(75*32),25.4*Math.sin(t*TAU/32)];
      tube(p(i),p(i+1),.21,i%3===0?'#db9c56':'#b97332',5);
    }
    part.winding={start,count:part.vertices.length/9-start};
    path([[25,-12,0],[36,-19,4],[43,-23,-20]],.35,'#b8783e');
    path([[25,12,0],[40,18,7],[47,-23,25]],.35,'#b8783e');
    group('tuning-capacitor',[-5,11,-47],[-8,34,-30]);
    box([0,0,0],[21,12,20],'#232a27');box([0,6.5,0],[22,1,21],'#b9c0b8');
    tube([0,7,0],[0,16,0],2.4,'#a9b1a9',20);
    for(const x of [-8,8])for(const z of [-7,7])tube([x,7,z],[x,7.6,z],1.4,'#626a61');
    for(const x of [-8,0,8])path([[x,-2,10],[x,-6,14],[x,-7,14]],.5,'#b1b4a6');
    group('diode',[34,11,-47],[0,51,-10]);
    tube([-5,0,0],[5,0,0],1.6,'#31312c',16);tube([3.5,0,0],[4.4,0,0],1.68,'#c9cfc3',16);
    path([[-14,-6,0],[-14,0,0],[-5,0,0]],.35,'#aab2a9');path([[5,0,0],[14,0,0],[14,-6,0]],.35,'#aab2a9');
    group('resistor',[66,11,-40],[20,32,-15]);
    tube([0,0,-5],[0,0,5],2,'#cabb91',16);
    ['#744b2c','#37604b','#c26c2f','#b8984a'].forEach((c,i)=>tube([0,0,-3+i*2],[0,0,-2.3+i*2],2.04,c,16));
    path([[0,-6,-13],[0,0,-13],[0,0,-5]],.35,'#aab2a9');path([[0,0,5],[0,0,13],[0,-6,13]],.35,'#aab2a9');
    group('detector-capacitor',[89,11,-40],[40,41,-12]);
    tube([0,0,-1.4],[0,0,1.4],4.5,'#c49d37',24);
    for(const x of [-2,2])path([[x,0,0],[x,-3,0],[x,-7,0]],.35,'#adb4a9');
    group('esp32',[36,9,47],[20,28,36]);
    box([0,0,0],[50,2,27],'#22362e');box([-8,3,0],[23,4,19],'#aeb9ae');box([22,3,0],[8,5,9],'#aab0a7');
    box([9,2,0],[8,2,8],'#252b27');
    for(let x=-22;x<=22;x+=3)for(const z of [-12,12]){box([x,0,z],[1.2,6,1.2],'#bca36e');box([x,2,z],[2,2,2],'#29312b');}
    for(let x=-22;x<-14;x+=2)box([x,1.2,0],[.5,.3,16],'#c5af6c');
    group('test-loop',[-63,88,0],[-35,20,0]);
    for(let k=0;k<5;k++){const pts=Array.from({length:49},(_,i)=>[20*Math.cos(i*TAU/48),k*.6,20*Math.sin(i*TAU/48)]);path(pts,.3,'#b88646');}
    path([[20,0,0],[30,-4,0],[35,-12,10]],.5,'#436f77');
    group('connections',[0,0,0],[0,0,0]);
    path([[-20,6,-20],[-14,25,-22],[-5,6,-37]],.65,'#587a6c');
    path([[9,6,-47],[13,15,-47],[20,6,-47]],.6,'#9b6546');
    path([[48,6,-47],[55,13,-47],[66,6,-53]],.6,'#9b6546');
    path([[66,6,-53],[78,9,-53],[87,6,-40]],.6,'#9b6546');
    path([[66,6,-27],[77,10,-24],[91,6,-40]],.6,'#444f48');
    return parts;
  }
  const inductance = (turns=75) => 50**2*turns**2/(457*50+1016*25);
  const resonance = (capPf,turns=75,probePf=0) => 1/(2*Math.PI*Math.sqrt(inductance(turns)*1e-6*(capPf+probePf)*1e-12));
  globalThis.RadioGeometry={build,inductance,resonance};
})();
````

## js/workbench.js

````javascript
/* Native WebGL, pointer controls, and a small teaching model. No framework or dependencies. */
(() => {
  'use strict';
  const c=window.RADIO_CONTENT.workbench, G=window.RadioGeometry;
  if(!c||!G||!document.querySelector('#panel-m1'))return;
  const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[x]);
  const section=document.createElement('section');section.className='chapter-section workbench';section.setAttribute('aria-labelledby','m1-workbench');
  section.innerHTML=`<div class="section-label"><span aria-hidden="true">↗</span><h3 id="m1-workbench">${esc(c.title)}</h3></div>
  <p class="eyebrow">${esc(c.eyebrow)}</p><p class="section-intro">${esc(c.intro)}</p>
  <div class="bench-layout"><div class="bench-stage"><div class="bench-stage-top"><span>TEAM 14 / ASSEMBLY 01</span><span class="bench-live">EXPLORE IN 3D</span></div>
    <canvas id="radio-model" tabindex="0" aria-label="Interactive 3D radio assembly. Drag to rotate. Arrow keys rotate, plus and minus zoom, Home resets. Use the component buttons below for descriptions."></canvas>
    <img class="bench-fallback" src="assets/m1/setup.jpg" alt="Our actual coil and breadboard circuit, shown when 3D is unavailable." hidden>
    <p class="bench-hint">Drag to rotate · select a part below</p><div class="bench-toolbar"><button type="button" data-camera="home">Reset view</button><button type="button" data-camera="top">From above</button><button type="button" data-camera="in" aria-label="Zoom in">+</button><button type="button" data-camera="out" aria-label="Zoom out">−</button><button type="button" id="bench-explode" aria-pressed="false">Separate parts ↗</button></div>
  </div><aside class="part-inspector" aria-live="polite" aria-atomic="true"><div class="part-portrait"><img id="part-image" alt="" loading="lazy"></div><div class="part-copy"><p class="eyebrow" id="part-value"></p><h4 id="part-name"></h4><p id="part-role"></p><p class="part-connection" id="part-connection"></p><details><summary>About this reconstruction</summary><p id="part-detail"></p><p class="fine-print">${esc(c.imageNote)}</p></details></div></aside></div>
  <div class="parts-tray" role="group" aria-label="Inspect a component">${c.parts.map((p,i)=>`<button type="button" data-part="${p.id}" aria-pressed="${i===0}"><span class="part-index">${String(i+1).padStart(2,'0')}</span><span>${esc(p.short)}</span></button>`).join('')}</div>
  <div class="bench-footnote"><p>${esc(c.modelNote)}</p><a href="assets/m1/radio-assembly.glb" download>Download 3D model (.glb) ↓</a></div>
  <div class="tuning-lab"><div class="tuning-story"><p class="eyebrow">A LITTLE BENCH EXPERIMENT</p><h4>${esc(c.tuningTitle)}</h4><p>${esc(c.tuningIntro)}</p><p class="tuning-challenge">${esc(c.challenge)}</p><label class="probe-switch"><input id="probe-load" type="checkbox"> Add 100 pF probe capacitance</label><button type="button" class="text-button" id="listen-tuning" aria-pressed="false">Listen to alignment ♪</button><p class="fine-print">Optional synthesized tone, not received radio audio.</p></div>
  <div class="tuning-console"><div class="console-readout"><div><span>TANK RESONANCE</span><output id="tuned-frequency">—</output></div><div><span>TARGET</span><strong>${c.targetKhz}<small> kHz</small></strong></div></div>
  <svg class="tuning-dial" viewBox="0 0 600 110" role="img" aria-label="Frequency scale with target and tank resonance"><defs><pattern id="dial-ticks" width="15" height="55" patternUnits="userSpaceOnUse"><path d="M0 0V18" stroke="currentColor" stroke-width="1"/></pattern></defs><path d="M30 20H570" stroke="currentColor" opacity=".3"/><rect x="30" y="20" width="540" height="55" fill="url(#dial-ticks)" opacity=".5"/><text x="30" y="92">500 kHz</text><text x="510" y="92">2.2 MHz</text><path id="target-needle" d="M0 18V68" stroke-dasharray="3 3"/><path id="tuning-needle" d="M0 10V70"/><circle id="tuning-dot" r="4" cy="10"/></svg>
  <label class="tune-label" for="tune-capacitance"><span>Turn the tuning capacitor</span><output id="capacitance-output">180 pF</output></label><input id="tune-capacitance" type="range" min="20" max="280" step="0.1" value="180">
  <div class="alignment-row"><span>Signal alignment</span><output id="signal-strength"></output></div><meter id="signal-meter" min="0" max="1" value="0" aria-label="Calculated signal alignment"></meter>
  <svg class="scope-mini" viewBox="0 0 600 100" role="img" aria-label="Illustrative amplitude-modulated waveform; its height follows the calculated tank response"><path d="M0 50H600" class="scope-axis"/><path id="scope-wave"/></svg><p class="tune-feedback" id="tune-feedback" role="status"></p></div></div>
  <details class="bench-assumptions"><summary>What this experiment assumes</summary><p>${esc(c.tuningNote)}</p></details>`;
  document.querySelector('#panel-m1 .chapter-heading').after(section);
  document.dispatchEvent(new Event('radio:content'));
  const $=s=>section.querySelector(s), $$=s=>[...section.querySelectorAll(s)];
  const jump=document.createElement('button');jump.className='workbench-jump';jump.type='button';jump.textContent='Explore the circuit in 3D ↗';
  document.querySelector('.primary-link').after(jump);
  jump.addEventListener('click',()=>{document.querySelector('#tab-m1').click();$('#m1-workbench').tabIndex=-1;$('#m1-workbench').focus({preventScroll:true});section.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
  const canvas=$('#radio-model');let selected='coil',render=()=>{},modelReady=false;
  function select(id) {
    selected=id;const p=c.parts.find(p=>p.id===id);
    $('#part-image').src=p.image;$('#part-image').alt=`Illustrated reconstruction of ${p.name.toLowerCase()}`;
    for(const key of ['value','name','role','detail','connection'])$(`#part-${key}`).textContent=p[key];
    $$('[data-part]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.part===id)));render();
  }
  $$('[data-part]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.part)));select('coil');
  $('#part-image').addEventListener('error',()=>{if(!$('#part-image').src.endsWith('/assets/placeholder.svg'))$('#part-image').src='assets/placeholder.svg';});

  function initModel() {
    if(modelReady)return;modelReady=true;
    const gl=canvas.getContext('webgl',{antialias:true,alpha:true,preserveDrawingBuffer:false});
    if(!gl){canvas.hidden=true;$('.bench-fallback').hidden=false;$('.bench-hint').textContent='3D is unavailable here. Explore the component cards or download the model.';$$('[data-camera],#bench-explode').forEach(b=>b.disabled=true);return;}
    const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
    const program=gl.createProgram();
    gl.attachShader(program,shader(gl.VERTEX_SHADER,`attribute vec3 pos;attribute vec3 normal;attribute vec3 colour;uniform vec3 offset;uniform vec2 angle;uniform float distance;uniform float aspect;uniform float emphasis;varying vec3 tint;
      void main(){vec3 p=pos+offset-vec3(-5.,18.,0.);float a=angle.x,b=angle.y;vec3 q=vec3(p.x*cos(a)+p.z*sin(a),p.y,-p.x*sin(a)+p.z*cos(a));vec3 v=vec3(q.x,q.y*cos(b)-q.z*sin(b),q.y*sin(b)+q.z*cos(b));float depth=distance-v.z;gl_Position=vec4(v.x*2.45/aspect,v.y*2.45,1.002*depth-2.002,depth);float light=.48+.52*abs(dot(normalize(normal),normalize(vec3(-.35,.8,.5))));tint=colour*light*emphasis;}`));
    gl.attachShader(program,shader(gl.FRAGMENT_SHADER,'precision mediump float;varying vec3 tint;void main(){gl_FragColor=vec4(tint,1.);}'));gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);gl.enable(gl.DEPTH_TEST);
    const attrs=['pos','normal','colour'].map(n=>gl.getAttribLocation(program,n));attrs.forEach(a=>gl.enableVertexAttribArray(a));
    const u=Object.fromEntries(['offset','angle','distance','aspect','emphasis'].map(n=>[n,gl.getUniformLocation(program,n)]));
    const models=G.build().map(p=>{const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(p.vertices),gl.STATIC_DRAW);return {...p,buffer,count:p.vertices.length/9};});
    let yaw=-.3,pitch=.6,distance=370,explode=0,target=0,frame=0,last=0,visible=true;
    function draw(now=0) {
      frame=0;if(!visible||document.hidden||document.querySelector('#panel-m1').hidden)return;
      const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
      const dpr=Math.min(devicePixelRatio||1,2),w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
      if(matchMedia('(prefers-reduced-motion: reduce)').matches)explode=target;
      else {const dt=Math.min(60,now-last||16);explode+=(target-explode)*(1-Math.exp(-dt/100));if(Math.abs(target-explode)<.002)explode=target;}
      last=now;gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform2f(u.angle,yaw,pitch);gl.uniform1f(u.distance,distance*Math.max(1,1.3/(w/h)));gl.uniform1f(u.aspect,w/h);
      for(const p of models){if(target>.05&&p.id==='connections')continue;gl.bindBuffer(gl.ARRAY_BUFFER,p.buffer);attrs.forEach((a,i)=>gl.vertexAttribPointer(a,3,gl.FLOAT,false,36,i*12));gl.uniform3fv(u.offset,p.position.map((v,i)=>v+p.explode[i]*explode));gl.uniform1f(u.emphasis,p.id===selected?1.12:.87);gl.drawArrays(gl.TRIANGLES,0,p.count);}
      if(explode!==target)frame=requestAnimationFrame(draw);
    }
    render=()=>{if(!frame)frame=requestAnimationFrame(draw);};
    const reset=()=>{yaw=-.3;pitch=.6;distance=370;render();};
    $$('[data-camera]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.camera==='home')reset();else if(b.dataset.camera==='top'){yaw=0;pitch=1.52;render();}else{distance=Math.max(230,Math.min(650,distance+(b.dataset.camera==='in'?-30:30)));render();}}));
    $('#bench-explode').addEventListener('click',()=>{target=target?0:1;$('#bench-explode').setAttribute('aria-pressed',String(!!target));$('#bench-explode').textContent=target?'Bring it together ↙':'Separate parts ↗';render();});
    let pointer=null;
    canvas.addEventListener('pointerdown',e=>{if(e.button!==0||pointer)return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;yaw+=(e.clientX-pointer.x)*.008;pitch=Math.max(-.2,Math.min(1.55,pitch+(e.clientY-pointer.y)*.008));pointer.x=e.clientX;pointer.y=e.clientY;render();});
    const release=e=>{if(pointer?.id===e.pointerId)pointer=null;};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
    canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home')reset();else if(e.key==='ArrowLeft')yaw-=.12;else if(e.key==='ArrowRight')yaw+=.12;else if(e.key==='ArrowUp')pitch=Math.min(1.55,pitch+.1);else if(e.key==='ArrowDown')pitch=Math.max(-.2,pitch-.1);else distance=Math.max(230,Math.min(650,distance+(e.key==='-'?25:-25)));render();});
    new ResizeObserver(render).observe(canvas);
    if('IntersectionObserver' in window)new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)render();else if(frame){cancelAnimationFrame(frame);frame=0;}}).observe(canvas);
    document.addEventListener('visibilitychange',render);document.addEventListener('radio:tab',render);
    canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();canvas.hidden=true;$('.bench-fallback').hidden=false;$('.bench-hint').textContent='3D context interrupted. Reload to restore; component descriptions remain available.';});render();
  }
  if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();initModel();}},{rootMargin:'300px'});observer.observe(section);}else initModel();

  // The optional sound is a quiet 440 Hz cue, never radio audio. It stops offscreen or on tab changes.
  let audio=null,oscillator=null,gain=null,amplitude=0,audioRequest=0,audioPending=false;
  function stopAudio(){audioRequest++;audioPending=false;if(oscillator){oscillator.stop();oscillator.disconnect();oscillator=null;}if(gain){gain.disconnect();gain=null;}if(audio)audio.suspend();$('#listen-tuning').setAttribute('aria-pressed','false');$('#listen-tuning').textContent='Listen to alignment ♪';}
  $('#listen-tuning').addEventListener('click',async()=>{
    if(oscillator||audioPending){stopAudio();return;}
    const request=++audioRequest;audioPending=true;
    try{audio ||= new (window.AudioContext||window.webkitAudioContext)();await audio.resume();if(request!==audioRequest)return;audioPending=false;oscillator=audio.createOscillator();gain=audio.createGain();oscillator.frequency.value=440;gain.gain.value=amplitude*.035;oscillator.connect(gain);gain.connect(audio.destination);oscillator.start();$('#listen-tuning').setAttribute('aria-pressed','true');$('#listen-tuning').textContent='Stop listening ■';}
    catch(_){audioPending=false;$('#listen-tuning').textContent='Audio unavailable in this browser';}
  });
  function tune(){const cap=Number($('#tune-capacitance').value),probe=$('#probe-load').checked?100:0,f0=G.resonance(cap,75,probe)/1000,target=c.targetKhz;amplitude=1/Math.sqrt(1+c.assumedQ**2*(target/f0-f0/target)**2);
    $('#tuned-frequency').innerHTML=`${f0.toFixed(1)}<small> kHz</small>`;$('#capacitance-output').textContent=`${cap.toFixed(1)} pF`;$('#signal-strength').textContent=`${(amplitude*100).toFixed(0)}%`;$('#signal-meter').value=amplitude;
    const px=f=>30+Math.max(0,Math.min(1,(f-500)/1700))*540;
    $('#target-needle').setAttribute('transform',`translate(${px(target)} 0)`);$('#tuning-needle').setAttribute('transform',`translate(${px(f0)} 0)`);$('#tuning-dot').setAttribute('cx',px(f0));
    $('#scope-wave').setAttribute('d',Array.from({length:601},(_,i)=>`${i?'L':'M'}${i},${50-Math.sin(i*.65)*(20+12*Math.sin(i*.022))*amplitude}`).join(' '));
    const matched=Math.abs(f0-target)<5;$('#tune-feedback').textContent=matched?c.matched:c.unmatched;$('.tuning-console').classList.toggle('is-tuned',matched);if(gain)gain.gain.setTargetAtTime(amplitude*.035,audio.currentTime,.05);
  }
  $('#tune-capacitance').addEventListener('input',tune);$('#probe-load').addEventListener('change',tune);tune();
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAudio();});document.addEventListener('radio:tab',stopAudio);
  if('IntersectionObserver' in window)new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stopAudio();}).observe($('.tuning-lab'));
})();
````

## tools/export-model.cjs

````javascript
// Optional authoring utility: node tools/export-model.cjs. The website needs no build step.
const fs=require('node:fs');
require('../js/circuit-model.js');
const parts=globalThis.RadioGeometry.build();
const json={asset:{version:'2.0',generator:'Team 14 original procedural reconstruction'},scene:0,scenes:[{nodes:[]}],nodes:[],meshes:[],materials:[{name:'Vertex-coloured lab materials',doubleSided:true,pbrMetallicRoughness:{baseColorFactor:[1,1,1,1],metallicFactor:.15,roughnessFactor:.65}}],buffers:[{byteLength:0}],bufferViews:[],accessors:[],extras:{description:'Photo-informed educational assembly; nominal geometry, representative housings and placement. Not a scan or a breadboard wiring plan. Units: metres.'}};
const blocks=[];let offset=0;
for(const p of parts){
  const a=new Float32Array(p.vertices),count=a.length/9,min=[Infinity,Infinity,Infinity],max=[-Infinity,-Infinity,-Infinity];
  for(let i=0;i<a.length;i+=9)for(let j=0;j<3;j++){a[i+j]*=.001;min[j]=Math.min(min[j],a[i+j]);max[j]=Math.max(max[j],a[i+j]);}
  const block=Buffer.from(a.buffer);blocks.push(block);
  const view=json.bufferViews.length;json.bufferViews.push({buffer:0,byteOffset:offset,byteLength:block.length,byteStride:36,target:34962});offset+=block.length;
  const index=json.accessors.length;
  json.accessors.push({bufferView:view,byteOffset:0,componentType:5126,count,type:'VEC3',min,max},{bufferView:view,byteOffset:12,componentType:5126,count,type:'VEC3'},{bufferView:view,byteOffset:24,componentType:5126,count,type:'VEC3'});
  json.meshes.push({name:p.id,primitives:[{attributes:{POSITION:index,NORMAL:index+1,COLOR_0:index+2},material:0,mode:4}]});
  json.scenes[0].nodes.push(json.nodes.length);json.nodes.push({name:p.id,mesh:json.meshes.length-1,translation:p.position.map(n=>n*.001)});
}
json.buffers[0].byteLength=offset;
const raw=Buffer.from(JSON.stringify(json));const j=Buffer.alloc(Math.ceil(raw.length/4)*4,32);raw.copy(j);const bin=Buffer.concat(blocks);
const header=Buffer.alloc(12);header.writeUInt32LE(0x46546c67,0);header.writeUInt32LE(2,4);header.writeUInt32LE(12+8+j.length+8+bin.length,8);
const chunk=(length,type)=>{const b=Buffer.alloc(8);b.writeUInt32LE(length);b.writeUInt32LE(type,4);return b;};
fs.writeFileSync('assets/m1/radio-assembly.glb',Buffer.concat([header,chunk(j.length,0x4e4f534a),j,chunk(bin.length,0x004e4942),bin]));
console.log(`Exported ${parts.length} meshes; ${offset.toLocaleString()} bytes of vertex data.`);
````

## DESIGN-NOTES.md

````markdown
# A livelier radio guide, without copying another team's site

## Reference review

Reviewed the [Electronics Lab Radio reference](https://ahmadenan.github.io/Electronics-Lab-Radio/?step=wind), including its winding, detector, and signal-model views.

Strengths observed:

- A rotatable assembly explains relationships that photographs alone cannot show.
- Build steps, materials, checks, and cautions make the guide usable at the bench.
- Keyboard camera controls provide an alternative to dragging.
- The signal model explicitly separates calculations from recorded measurements.
- Photographs anchor the polished diagrams in a real build.

Design tradeoffs observed (design judgment, not an accessibility audit):

- Milestone links, build-step navigation, visualization tabs, camera controls, and an assembly timeline create several competing navigation layers.
- At the inspected medium viewport, the two-column layout leaves relatively narrow space for both instructions and the model; the build-step navigation needs horizontal scrolling.
- Many useful controls are visible together. A newcomer must choose what to operate before understanding what matters.

Our response: keep Team 14's narrative, original copper-and-paper design, real photographs, and ESP32 story. Add one dedicated workbench rather than reproducing the reference's eight-step interface. Inspect parts through a simple labelled tray, explore one tuning challenge, and keep measurement tables untouched. No reference source code, images, or 3D assets were copied.

## Research and creative elements

- **Exploded assemblies:** spatial separation makes the relationship between components easier to inspect. [Advanta's product-experience case study](https://www.advanta-group.com/work/interactive-product-experience) illustrates the general technique. Our interpretation uses a manual separation button, not scroll hijacking.
- **Component inspection:** give each object a purpose, connection note, and visual reference. [Model-viewer's annotation examples](https://modelviewer.dev/examples/annotations/) demonstrate the broader principle of attaching readable HTML explanations to a 3D experience. Our implementation uses an accessible component tray and inspector; it does not load model-viewer.
- **Native interaction:** [MDN Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events/Using_Pointer_Events) documents unified mouse/pen/touch handling. Pointer capture keeps our orbit drag reliable outside the canvas bounds.
- **Motion only when needed:** [MDN's Canvas animation guide](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations) explains requestAnimationFrame. Our 3D renderer draws on interaction or during the short separation transition, not in an endless idle animation loop.

Implemented: photo-informed component illustrations, rotatable and separable 3D assembly, component inspector, downloadable GLB, a resonance dial, a probe-loading challenge, response-driven waveform, optional synthesized sound, reduced-motion behavior, and offscreen audio shutdown.

Useful future additions once the team supplies the relevant content:

1. A measured-versus-predicted overlay once Tables 5 and 6 are filled in.
2. A short annotated tuning video tied to the recorded source settings.
3. A before/after comparison of the ESP32 experiment and the replacement generator, using confirmed frequencies and channel labels.

Avoided: autoplay sound, scroll-jacking, a replacement cursor, random particle backgrounds, invented bench readings, and a framework migration merely to add animation.

## Does this need React?

No. React is a UI framework; it is not a prerequisite for animation or 3D. Native HTML controls, CSS transitions, Pointer Events, Web Audio, and WebGL support this experience. The delivered implementation has no React, npm, build step, CDN, Three.js, or other runtime dependency.

## What the model represents

The component PNGs were generated using the built-in Image Generation tool with the team's two bench photographs as visual references. The prompts and provenance are in `assets/components/GENERATION.md`. The small diode/capacitor packages and test loop contain representative details where the photos do not resolve the hardware. Illustrations are labelled as illustrations, not evidence.

The 3D assembly is original procedural geometry informed by those visual references and nominal LAB2 dimensions. It is **not** photogrammetry, an automatic image-to-mesh conversion, a precision scan, or a pin-accurate breadboard reconstruction. The source loop is placed above the upright main coil on the same axis. Its source wiring and the circuit's jumpers are illustrative. The schematic remains the electrical reference.

The viewer renders actual three-dimensional triangle meshes with depth testing, perspective, and lighting; it is not a flat image that rotates. The standalone GLB contains the same assembled geometry, vertex colours, separate named meshes, and metre units. It can be imported into a 3D editor. No captured images of the reference website are distributed.
````

## assets/components/GENERATION.md

````markdown
# Component image provenance and prompts

Generated with the built-in Image Generation tool. Transparent PNGs preserved. Reference images: `assets/m1/setup.jpg` and `assets/m1/top-view.jpg`. These are photo-informed illustrations, not measurement evidence or exact cutouts of hidden components. The 3D meshes are authored separately from the visible geometry and nominal specifications; PNGs are the component inspection illustrations, not automatically converted mesh textures.

## coil.png

Use case: background-extraction. Create one standalone isolated component illustration for a student radio website from these reference photographs: ONLY the copper wire coil on its upright hollow pale blue-white PVC pipe, with black tape at the edges, and two fine copper lead tails. Faithfully retain the physical handmade appearance, dense copper winding and roughly 50 mm pipe diameter. Three-quarter elevated view. Entire object visible centered with generous transparent margin, no breadboard, clips, probes, desk, wires from other components, labels or text. Transparent background. This is a clean photo-informed component reconstruction, not a precision scan. Studio soft light, realistic material, crisp edges. Save the output for use as coil.png.

## tuning-capacitor.png

Use case: product-mockup / photo-informed educational reconstruction. Create ONE isolated component asset: the small square metal-topped black/plastic variable tuning capacitor with its central rotating shaft, as seen on the upper breadboard in the overhead reference. Isolate just the component and its short terminal lugs. Match the materials and practical handmade student lab aesthetic of the reference. Realistic soft studio lighting. Whole object visible centered, three-quarter elevated view, generous truly transparent background. No text labels, backdrop, desk, other components or hands. This is an illustration, not measurement evidence. Asset ID: tuning-capacitor.

## diode.png

Use case: product-mockup / photo-informed educational reconstruction. Create ONE isolated component asset: one small axial 1N60P detector diode with its thin metal leads, a compact dark cylindrical body and one clearly visible pale cathode band at the RIGHT end. The tiny component is partly obscured in the photos, so render a representative package rather than inventing markings. Match the materials and practical handmade student lab aesthetic of the reference. Realistic soft studio lighting. Whole object visible centered, three-quarter elevated view, generous truly transparent background. No text labels, backdrop, desk, other components or hands. This is an illustration, not measurement evidence. Asset ID: diode.

## resistor.png

Use case: product-mockup / photo-informed educational reconstruction. Create ONE isolated component asset: one beige axial 15 kilohm resistor, with brown-green-orange-gold bands and two bent tinned metal leads. The resistor is small in the reference; render a representative package and accurate band order. Match the materials and practical handmade student lab aesthetic of the reference. Realistic soft studio lighting. Whole object visible centered, three-quarter elevated view, generous truly transparent background. No text labels, backdrop, desk, other components or hands. This is an illustration, not measurement evidence. Asset ID: resistor.

## detector-capacitor.png

Use case: product-mockup / photo-informed educational reconstruction. Create ONE isolated component asset: one small mustard-yellow dipped radial ceramic capacitor with two separated metal legs, representing the 3.3 nF capacitor visible near the front of the reference. No invented readable markings. Match the materials and practical handmade student lab aesthetic of the reference. Realistic soft studio lighting. Whole object visible centered, three-quarter elevated view, generous truly transparent background. No text labels, backdrop, desk, other components or hands. This is an illustration, not measurement evidence. Asset ID: detector-capacitor.

## breadboard.png

Use case: product-mockup / photo-informed educational reconstruction. Create ONE isolated component asset: one white solderless breadboard from the reference, empty with no components, two long banks of small holes, central channel, subtle red and blue power-rail markings. Three-quarter elevated view. Match the materials and practical handmade student lab aesthetic of the reference. Realistic soft studio lighting. Whole object visible centered, three-quarter elevated view, generous truly transparent background. No text labels, backdrop, desk, other components or hands. This is an illustration, not measurement evidence. Asset ID: breadboard.

## esp32.png

Use case: product-mockup / photo-informed educational reconstruction. Create ONE isolated component asset: one ESP32 development board like the one visible in the overhead photograph: black PCB, silver shielded module, two rows of header pins, USB connector at one short end. No breadboard or wires. Do not invent readable chip legends. Match the materials and practical handmade student lab aesthetic of the reference. Realistic soft studio lighting. Whole object visible centered, three-quarter elevated view, generous truly transparent background. No text labels, backdrop, desk, other components or hands. This is an illustration, not measurement evidence. Asset ID: esp32.

## test-loop.png

Use case: product-mockup / photo-informed educational reconstruction. Create ONE isolated component asset: one five-turn loop of thin enamelled copper wire standing upright, with two short bare copper lead ends. This represents the lab's coupling loop, whose exact geometry is not clearly visible in the reference. Make a simple representative circular winding, no invented hardware. Match the materials and practical handmade student lab aesthetic of the reference. Realistic soft studio lighting. Whole object visible centered, three-quarter elevated view, generous truly transparent background. No text labels, backdrop, desk, other components or hands. This is an illustration, not measurement evidence. Asset ID: test-loop.
````

## assets/favicon.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#a4472c"/><g fill="none" stroke="#fff9ef" stroke-width="3"><circle cx="32" cy="32" r="7"/><path d="M21 21a16 16 0 0 0 0 22m22-22a16 16 0 0 1 0 22M14 14a26 26 0 0 0 0 36m36-36a26 26 0 0 1 0 36"/></g></svg>
````

## assets/placeholder.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 100"><g fill="none" stroke="#9b8b79" stroke-width="1.5"><rect x="30" y="15" width="100" height="70" rx="3"/><circle cx="100" cy="37" r="7"/><path d="m30 70 30-28 26 26 14-13 30 25M72 91h16"/></g></svg>
````

## assets/m1/schematic.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 580" role="img" aria-labelledby="title desc">
  <title id="title">M1 — the tuner and detector</title>
  <desc id="desc">A signal generator drives a five-turn test loop. This couples magnetically to a parallel 75-turn coil and 20 to 280 picofarad capacitor. TP1 connects through a 1N60P diode, cathode toward TP3. A 15 kilohm resistor and 3.3 nanofarad capacitor connect in parallel from TP3 to ground.</desc>
  <rect width="1000" height="580" fill="#faf8f2"/>
  <g font-family="Arial, sans-serif" fill="#292d26">
    <text x="50" y="55" font-size="15" letter-spacing="3" fill="#a4472c">TEAM 14 / M1 CIRCUIT NOTES</text>
    <text x="50" y="96" font-size="28">Select a frequency. Follow its envelope.</text>
    <text x="80" y="390" font-size="17">Signal source</text>
    <text x="207" y="225" font-size="16">5 turns</text>
    <text x="348" y="225" font-size="16">75 turns</text>
    <text x="435" y="335" font-size="16">20–280 pF</text>
    <text x="596" y="175" font-size="18" fill="#a4472c">1N60P</text>
    <text x="710" y="300" font-size="16">15 kΩ</text>
    <text x="865" y="300" font-size="16">3.3 nF</text>
    <text x="529" y="175" font-size="18" fill="#a4472c">TP1</text>
    <text x="899" y="190" font-size="18" fill="#a4472c">TP3</text>
    <text x="270" y="355" font-size="13" text-anchor="middle">a few cm</text>
    <text x="270" y="375" font-size="13" text-anchor="middle">same axis</text>
    <text x="560" y="458" font-size="15">The diode band (cathode) faces TP3 →</text>
    <text x="50" y="530" font-size="14" fill="#62665c">Redrawn from LAB2, Figure 3 · Diagram is a wiring guide, not a measured result.</text>
  </g>
  <g fill="none" stroke="#292d26" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M130 260V200H220V242m0 80v78h-90v-90"/><circle cx="130" cy="285" r="25"/>
    <path d="M113 285q8-18 17 0t17 0M220 242c25 0 25 20 0 20c25 0 25 20 0 20c25 0 25 20 0 20c25 0 25 20 0 20"/>
    <path d="M345 242c-25 0-25 20 0 20c-25 0-25 20 0 20c-25 0-25 20 0 20c-25 0-25 20 0 20M345 242V200H603M345 322V400H900M490 200v70m-22 0h44m-44 13h44m-22 0v117M464 306l51-63m-12 3 12-3-2 12"/>
    <path d="M603 184v32l28-16zM635 182v36M635 200H920M710 200v48l-9 9 18 14-18 14 18 14-18 14 9 9v78M835 200v70m-23 0h46m-46 13h46m-23 0v117M710 400v23m-17 0h34m-28 7h22m-16 7h10"/>
  </g>
  <g fill="#a4472c"><circle cx="550" cy="200" r="5"/><circle cx="920" cy="200" r="5"/><circle cx="490" cy="200" r="4"/><circle cx="710" cy="200" r="4"/><circle cx="835" cy="200" r="4"/><circle cx="490" cy="400" r="4"/><circle cx="710" cy="400" r="4"/><circle cx="835" cy="400" r="4"/></g>
  <path d="M250 285h60m-53-5-7 5 7 5m46-10 7 5-7 5" fill="none" stroke="#a4472c" stroke-width="1.5"/>
</svg>
````

## assets/m2/placeholder.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#eeeee5"/><g fill="#62665c" font-family="Arial, sans-serif" text-anchor="middle"><text x="400" y="290" font-size="44">M2 / Soon</text><text x="400" y="335" font-size="18">[[TBD: milestone 2 media]]</text></g></svg>
````

## assets/m3/placeholder.svg

````svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"><rect width="800" height="600" fill="#eeeee5"/><g fill="#62665c" font-family="Arial, sans-serif" text-anchor="middle"><text x="400" y="290" font-size="44">M3 / Soon</text><text x="400" y="335" font-size="18">[[TBD: milestone 3 media]]</text></g></svg>
````

## .gitignore

````text
tmp/
output/
__pycache__/
````

## README.md

````markdown
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
````

## Replace these placeholders first

1. Table 4 predictions, Table 5 tank measurements, and the six Table 6 rows.
2. Actual generator/probe settings, confirmed problems and fixes, and M1 sign-off.
3. Missing close-ups, verified resonance capture, tuning video, and media descriptions.
4. GitHub repository URL and last-updated date.
5. M2 and M3 content when their work begins; until then, keep them as Soon.
