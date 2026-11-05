/* A small opening exhibit, progressively enhanced with a keyboard-friendly dial. */
(() => {
  const c=window.RADIO_CONTENT.project.exhibit;
  if(!c)return;
  const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[x]);
  const hero=document.querySelector('.hero');
  hero.querySelector('.hero-photo').remove();
  const exhibit=document.createElement('div');exhibit.className='opening-exhibit';
  exhibit.innerHTML=`<div class="exhibit-top"><span>${esc(c.kicker)}</span><span>01 / 03</span></div><div class="exhibit-art"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><img src="assets/components/coil.png" alt="Illustrated copper coil on a PVC former; an approximate reconstruction" width="512" height="512" fetchpriority="high"><span class="orbit-label">${esc(c.detail)}</span></div><div class="exhibit-bottom"><h2>${esc(c.title)}</h2><p>${esc(c.label)}</p></div><label class="opening-dial" for="opening-frequency"><span>${esc(c.dial)}</span><output id="opening-readout">819 kHz</output></label><input id="opening-frequency" type="range" min="530" max="1600" value="819" step="1" aria-label="Decorative radio dial frequency"><div class="frequency-ruler" aria-hidden="true"><span>530</span><span>800</span><span>1100</span><span>1600 kHz</span></div>`;
  hero.append(exhibit);
  const title=document.createElement('p');title.className='editorial-title';title.setAttribute('aria-hidden','true');title.innerHTML=c.lines.map(x=>`<span>${esc(x)}</span>`).join('');hero.querySelector('.hero-copy').prepend(title);
  const jump=document.querySelector('.workbench-jump');jump.textContent=c.action+' ↗';
  const dial=exhibit.querySelector('input');dial.addEventListener('input',()=>{exhibit.querySelector('output').textContent=dial.value+' kHz';exhibit.style.setProperty('--dial-angle',`${(dial.value-819)/12}deg`);});
  const update=()=>document.body.classList.toggle('reading-build',document.querySelector('#milestones').getBoundingClientRect().top<140);
  document.addEventListener('scroll',update,{passive:true});update();
})();
