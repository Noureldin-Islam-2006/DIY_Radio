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
    <p class="bench-hint">Drag to rotate · select a part below</p><div class="bench-toolbar"><button type="button" data-camera="home">Whole circuit</button><button type="button" data-camera="top">From above</button><button type="button" data-camera="in" aria-label="Zoom in">+</button><button type="button" data-camera="out" aria-label="Zoom out">−</button><button type="button" id="bench-explode" aria-pressed="false">Separate parts ↗</button></div>
  </div><aside class="part-inspector" aria-live="polite" aria-atomic="true"><div class="part-portrait"><img id="part-image" alt="" loading="lazy"></div><div class="part-copy"><p class="eyebrow" id="part-value"></p><h4 id="part-name"></h4><p id="part-role"></p><p class="part-connection" id="part-connection"></p><details><summary>About this reconstruction</summary><p id="part-detail"></p><p class="fine-print">${esc(c.imageNote)}</p></details></div></aside></div>
  <label class="focus-option"><input type="checkbox" id="focus-selection" checked> Zoom into selected component</label><div class="parts-tray" role="group" aria-label="Inspect a component">${c.parts.map((p,i)=>`<button type="button" data-part="${p.id}" aria-pressed="${i===0}"><span class="part-index">${String(i+1).padStart(2,'0')}</span><span>${esc(p.short)}</span></button>`).join('')}</div>
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
  const canvas=$('#radio-model');let selected='coil',render=()=>{},focusPart=()=>{},modelReady=false;
  function select(id,zoom=true) {
    selected=id;const p=c.parts.find(p=>p.id===id);
    $('#part-image').src=p.image;$('#part-image').alt=`Illustrated reconstruction of ${p.name.toLowerCase()}`;
    for(const key of ['value','name','role','detail','connection'])$(`#part-${key}`).textContent=p[key];
    $$('[data-part]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.part===id)));if(zoom&&$('#focus-selection').checked){initModel();focusPart(id);$('.bench-layout').scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}render();
  }
  $$('[data-part]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.part)));select('coil',false);
  $('#part-image').addEventListener('error',()=>{if(!$('#part-image').src.endsWith('/assets/placeholder.svg'))$('#part-image').src='assets/placeholder.svg';});

  function initModel() {
    if(modelReady)return;modelReady=true;
    const gl=canvas.getContext('webgl',{antialias:true,alpha:true,preserveDrawingBuffer:false});
    if(!gl){canvas.hidden=true;$('.bench-fallback').hidden=false;$('.bench-hint').textContent='3D is unavailable here. Explore the component cards or download the model.';$$('[data-camera],#bench-explode').forEach(b=>b.disabled=true);return;}
    const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s;};
    const program=gl.createProgram();
    gl.attachShader(program,shader(gl.VERTEX_SHADER,`attribute vec3 pos;attribute vec3 normal;attribute vec3 colour;uniform vec3 offset;uniform vec3 center;uniform vec2 angle;uniform float distance;uniform float aspect;uniform float emphasis;varying vec3 tint;
      void main(){vec3 p=pos+offset-center;float a=angle.x,b=angle.y;vec3 q=vec3(p.x*cos(a)+p.z*sin(a),p.y,-p.x*sin(a)+p.z*cos(a));vec3 v=vec3(q.x,q.y*cos(b)-q.z*sin(b),q.y*sin(b)+q.z*cos(b));float depth=distance-v.z;gl_Position=vec4(v.x*2.45/aspect,v.y*2.45,1.002*depth-2.002,depth);float light=.48+.52*abs(dot(normalize(normal),normalize(vec3(-.35,.8,.5))));tint=colour*light*emphasis;}`));
    gl.attachShader(program,shader(gl.FRAGMENT_SHADER,'precision mediump float;varying vec3 tint;void main(){gl_FragColor=vec4(tint,1.);}'));gl.linkProgram(program);
    if(!gl.getProgramParameter(program,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(program));gl.useProgram(program);gl.enable(gl.DEPTH_TEST);
    const attrs=['pos','normal','colour'].map(n=>gl.getAttribLocation(program,n));attrs.forEach(a=>gl.enableVertexAttribArray(a));
    const u=Object.fromEntries(['center','offset','angle','distance','aspect','emphasis'].map(n=>[n,gl.getUniformLocation(program,n)]));
    const models=G.build().map(p=>{const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(p.vertices),gl.STATIC_DRAW);return {...p,buffer,count:p.vertices.length/9};});
    let yaw=-.3,pitch=.6,distance=370,desiredDistance=370,center=[-5,18,0],desiredCenter=[-5,18,0],focused=null,explode=0,target=0,frame=0,last=0,visible=true;
    focusPart=id=>{const part=models.find(p=>p.id===id);if(!part)return;focused=id;
      const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];
      for(let j=0;j<part.vertices.length;j+=9)for(let k=0;k<3;k++){lo[k]=Math.min(lo[k],part.vertices[j+k]);hi[k]=Math.max(hi[k],part.vertices[j+k]);}
      desiredCenter=lo.map((v,k)=>(v+hi[k])/2+part.position[k]);desiredDistance=Math.max(25,Math.hypot(...lo.map((v,k)=>(hi[k]-v)/2))*3.1);
      target=0;$('#bench-explode').setAttribute('aria-pressed','false');$('#bench-explode').textContent='Separate parts ↗';canvas.dataset.view=id;$('.bench-hint').textContent='Component close-up · drag to rotate · Whole circuit to return';render();};
    function draw(now=0) {
      frame=0;if(!visible||document.hidden||document.querySelector('#panel-m1').hidden)return;
      const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;
      const dpr=Math.min(devicePixelRatio||1,2),w=Math.round(rect.width*dpr),h=Math.round(rect.height*dpr);
      if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h;}
      if(matchMedia('(prefers-reduced-motion: reduce)').matches)explode=target;
      else {const dt=Math.min(60,now-last||16);explode+=(target-explode)*(1-Math.exp(-dt/100));if(Math.abs(target-explode)<.002)explode=target;}
      const ease=matchMedia('(prefers-reduced-motion: reduce)').matches?1:.16;
      center=center.map((v,i)=>Math.abs(v-desiredCenter[i])<.02?desiredCenter[i]:v+(desiredCenter[i]-v)*ease);
      distance=Math.abs(distance-desiredDistance)<.02?desiredDistance:distance+(desiredDistance-distance)*ease;
      gl.uniform3fv(u.center,center);last=now;gl.viewport(0,0,w,h);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.uniform2f(u.angle,yaw,pitch);gl.uniform1f(u.distance,distance*Math.max(1,1.3/(w/h)));gl.uniform1f(u.aspect,w/h);
      for(const p of models){if(focused&&p.id!==focused)continue;if(target>.05&&p.id==='connections')continue;gl.bindBuffer(gl.ARRAY_BUFFER,p.buffer);attrs.forEach((a,i)=>gl.vertexAttribPointer(a,3,gl.FLOAT,false,36,i*12));gl.uniform3fv(u.offset,p.position.map((v,i)=>v+p.explode[i]*explode));gl.uniform1f(u.emphasis,p.id===selected?1.12:.87);gl.drawArrays(gl.TRIANGLES,0,p.count);}
      if(explode!==target||distance!==desiredDistance||center.some((v,i)=>v!==desiredCenter[i]))frame=requestAnimationFrame(draw);
    }
    render=()=>{if(!frame)frame=requestAnimationFrame(draw);};
    const reset=()=>{yaw=-.3;pitch=.6;desiredDistance=370;desiredCenter=[-5,18,0];focused=null;canvas.dataset.view="assembly";$(".bench-hint").textContent="Drag to rotate · select a part below";render();};
    $$('[data-camera]').forEach(b=>b.addEventListener('click',()=>{if(b.dataset.camera==='home')reset();else if(b.dataset.camera==='top'){yaw=0;pitch=1.52;render();}else{desiredDistance=Math.max(15,Math.min(650,desiredDistance+(b.dataset.camera==='in'?-30:30)));render();}}));
    $('#focus-selection').addEventListener('change',()=>{if($('#focus-selection').checked)focusPart(selected);else reset();});
    $('#bench-explode').addEventListener('click',()=>{if(focused)reset();target=target?0:1;$('#bench-explode').setAttribute('aria-pressed',String(!!target));$('#bench-explode').textContent=target?'Bring it together ↙':'Separate parts ↗';render();});
    let pointer=null;
    canvas.addEventListener('pointerdown',e=>{if(e.button!==0||pointer)return;pointer={id:e.pointerId,x:e.clientX,y:e.clientY};canvas.setPointerCapture(e.pointerId);});
    canvas.addEventListener('pointermove',e=>{if(!pointer||pointer.id!==e.pointerId)return;yaw+=(e.clientX-pointer.x)*.008;pitch=Math.max(-.2,Math.min(1.55,pitch+(e.clientY-pointer.y)*.008));pointer.x=e.clientX;pointer.y=e.clientY;render();});
    const release=e=>{if(pointer?.id===e.pointerId)pointer=null;};canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
    canvas.addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','+','=','-','Home'].includes(e.key))return;e.preventDefault();if(e.key==='Home')reset();else if(e.key==='ArrowLeft')yaw-=.12;else if(e.key==='ArrowRight')yaw+=.12;else if(e.key==='ArrowUp')pitch=Math.min(1.55,pitch+.1);else if(e.key==='ArrowDown')pitch=Math.max(-.2,pitch-.1);else desiredDistance=Math.max(15,Math.min(650,desiredDistance+(e.key==='-'?25:-25)));render();});
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
