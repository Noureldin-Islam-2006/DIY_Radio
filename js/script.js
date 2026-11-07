(() => {
  'use strict';
  const { project: p, ui, chain, milestones } = window.RADIO_CONTENT;
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const rich = value => escape(value).replace(/\[\[TBD[^\]]*\]\]/g, '<mark class="tbd">$&</mark>');
  const number = value => typeof value === 'number' && Number.isFinite(value);
  const format = value => number(value) ? new Intl.NumberFormat('en', { maximumFractionDigits: 3 }).format(value) : rich(value);
  const measurement = value => number(value) ? new Intl.NumberFormat('en', { maximumFractionDigits: 10 }).format(value) : rich(value);
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
      return `<line class="grid-line" x1="70" y1="${y(t * maxY)}" x2="680" y2="${y(t * maxY)}"/>${points.length ? `<text x="58" y="${y(t * maxY) + 4}" text-anchor="end">${Math.round(t * maxY)}</text><text x="${x(t * maxX)}" y="283" text-anchor="middle">${Math.round(t * maxX)}</text>` : ''}`;
    }).join('');
    return `<figure class="chart"><h4>${rich(ui.chart)}</h4><svg viewBox="0 0 720 330" role="img" aria-labelledby="${id}-chart-title ${id}-chart-desc"><title id="${id}-chart-title">${escape(ui.chart)}</title><desc id="${id}-chart-desc">${escape(points.length ? `${points.length} measured pairs plotted from Table 6. Read the table for exact values.` : 'No measured data yet. Axes only; no fabricated response curve.')}</desc>${ticks}<path class="axis" d="M70 35V260H685"/><text x="375" y="318" text-anchor="middle">${escape(ui.chartAxisX)}</text><text transform="translate(18 150) rotate(-90)" text-anchor="middle">${escape(ui.chartAxisY)}</text>${points.length > 1 ? `<polyline class="plot" points="${points.map(r => `${x(r.tp1)},${y(r.tp3)}`).join(' ')}"/>` : ''}${points.map(r => `<circle class="plot-point" cx="${x(r.tp1)}" cy="${y(r.tp3)}" r="4"><title>TP1 ${r.tp1} mV; TP3 ${r.tp3} mV</title></circle>`).join('')}</svg>${!points.length ? `<p class="chart-empty">${rich(ui.chartEmpty)}</p>` : ''}<figcaption>${rich(ui.chartNote)}</figcaption></figure>`;
  }
  function results(m) {
    const r = m.results || {};
    const values = tankValues(r);
    let html = `<p class="section-intro">${rich(r.note || '[[TBD: results]]')}</p>`;
    if(r.source && safePath(r.source.src)) html += `<p><a href="${escape(safePath(r.source.src))}" target="_blank" rel="noopener">${rich(r.source.label)}</a></p>`;
    if(r.reviewNotes?.length) html += `<aside class="note"><ul>${r.reviewNotes.map(note=>`<li>${rich(note)}</li>`).join('')}</ul></aside>`;
    if (r.stats) html += `<div class="stats measured-stats">${r.stats.map(s => `<div><strong>${format(values[s.key] ?? '[[TBD]]')} <small>${escape(s.unit)}</small></strong><span>${rich(s.label)}</span></div>`).join('')}</div>`;
    if (r.predictions) html += table(ui.predictions, [ui.quantity, ui.value], r.predictions.map(v => [rich(v.label), `${format(v.value)} <span class="unit">${escape(v.unit)}</span>`]));
    if (r.tank) html += table(ui.tank, [ui.quantity, ui.value], r.tank.map(v => [rich(v.label), `${format(values[v.key])} <span class="unit">${escape(v.unit)}</span>`]));
    if (r.detector) html += table(ui.detector, [ui.sourceAmplitude, ui.tp1, ui.tp3], r.detector.map(v => [measurement(v.source), measurement(v.tp1), measurement(v.tp3)])) + chart(r.detector, m.id);
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
