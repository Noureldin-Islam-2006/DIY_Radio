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
  function build(milestone='m1') {
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
    for(const z of [-47]) {
      box([0,2,z],[160,4,56],'#e5e8df');box([0,4.05,z],[151,.2,3],'#9ca8a3');
      for(const dz of [-23,23])box([0,4.2,z+dz],[150,.15,.45],dz<0?'#a55845':'#588d92');
      for(let x=-72;x<=72;x+=4)for(let row=-5;row<=5;row++)if(row)box([x,4.2,z+row*3.5],[1.3,.25,1.3],'#59665e');
    }
    group('coil',[-63,29,0],[-22,25,0]);
    ring(30,-25,2,70,'#d4e0d9');
    for(const z of [-1,1])box([0,z*32,30],[8,5,1],'#242b28');
    const start=part.vertices.length/9;
    for(let i=0;i<75*32;i++){
      const p=t=>[30.4*Math.cos(t*TAU/32),7+29*t/(75*32),30.4*Math.sin(t*TAU/32)];
      tube(p(i),p(i+1),.21,i%3===0?'#db9c56':'#b97332',5);
    }
    part.winding={start,count:part.vertices.length/9-start};
    path([[30,7,0],[37,10,-15],[58,-18,-47]],.35,'#b8783e');
    path([[30,36,0],[40,30,12],[65,-23,-24]],.35,'#b8783e');
    group('tuning-capacitor',[-5,11,-47],[-8,34,-30]);
    box([0,0,0],[21,12,20],'#c1b8a3');box([0,6.5,0],[22,1,21],'#d4b882');
    tube([0,7,0],[0,11,0],3.2,'#98804c',20);
    for(const x of [-8,8])for(const z of [-7,7])tube([x,7,z],[x,7.6,z],1.4,'#626a61');
    for(const x of [-8,0,8])path([[x,-2,10],[x,-6,14],[x,-7,14]],.5,'#b1b4a6');
    group('diode',[34,11,-47],[0,51,-10]);
    tube([-4,0,0],[4,0,0],1.45,'#c76536',20);tube([-2,0,0],[2,0,0],1.48,'#d88b60',20);tube([2.5,0,0],[3.5,0,0],1.5,'#242321',20);
    path([[-14,-6,0],[-14,0,0],[-5,0,0]],.35,'#aab2a9');path([[5,0,0],[14,0,0],[14,-6,0]],.35,'#aab2a9');
    group('resistor',[66,11,-40],[20,32,-15]);
    tube([0,0,-5],[0,0,5],2,'#cabb91',16);
    ['#744b2c','#37604b','#c26c2f','#b8984a'].forEach((c,i)=>tube([0,0,-3+i*2],[0,0,-2.3+i*2],2.04,c,16));
    path([[0,-6,-13],[0,0,-13],[0,0,-5]],.35,'#aab2a9');path([[0,0,5],[0,0,13],[0,-6,13]],.35,'#aab2a9');
    group('detector-capacitor',[89,11,-40],[40,41,-12]);
    box([0,1,0],[7,7,2.8],'#e0b24e');tube([-2.2,4,0],[2.2,4,0],1.5,'#e0b24e',16);
    // Dipped ceramic package with two radial leads; 332 = 3.3 nF.
    for(const x of [-2,0,2])path([[x-.6,2,1.5],[x+.5,2,1.5],[x+.5,1,1.5],[x-.3,1,1.5],[x+.5,1,1.5],[x+.5,0,1.5],[x-.6,0,1.5]],.10,'#805e39');
    for(const x of [-2,2])path([[x,0,0],[x,-3,0],[x,-7,0]],.35,'#adb4a9');
    // Instrument dimensions and panel details are visual approximations of the supplied references.
    function knob(x,y,z,r=3) {tube([x,y,z],[x,y,z+4],r,'#737c79',20);tube([x,y,z+4],[x,y,z+4.6],r*.8,'#d9ddd6',20);box([x,y+r*.5,z+4.8],[.5,r*.6,.3],'#2c3534');}
    function bnc(x,y,z){tube([x,y,z],[x,y,z+4],2.6,'#a9b4b3',16);tube([x,y,z+4],[x,y,z+4.3],1.7,'#303a38',16);}
    group('generator',[-127,25,-110],[-40,20,-30]);
    box([0,0,0],[100,46,65],'#bfc8c4');box([0,0,33],[98,44,2],'#e1e4d8');
    box([-24,11,34.5],[39,13,1],'#273c39');
    // Four red seven-segment digits on the generator counter (illustrative readout).
    for(let i=0;i<4;i++){const x=-39+i*9;for(const y of [7,11,15])box([x,y,35.2],[5,.65,.3],'#df6654');for(const dx of [-2.5,2.5])for(const y of [9,13])box([x+dx,y,35.2],[.65,3,.3],'#df6654');}
    knob(32,6,35,9);knob(13,-12,35,3);knob(-1,-12,35,3);bnc(33,-13,35);
    for(let i=0;i<7;i++)box([-40+i*7,-3,35],[4,3,3],'#646f6d');
    path([[-53,-10,15],[-57,22,15],[-57,29,-15],[57,29,-15],[57,22,15],[53,-10,15]],2.2,'#5c6965');
    for(const x of [-39,39])box([x,-25,12],[12,5,16],'#424b47');
    group('oscilloscope',[49,38,-132],[38,25,-35]);
    box([0,0,0],[120,66,30],'#d7ddd8');box([0,0,16],[118,64,2],'#ecece2');
    box([-22,2,17.5],[65,46,1],'#253d43');
    for(let x=-51;x<10;x+=7)box([x,2,18],[.2,40,.2],'#446166');
    for(let y=-17;y<23;y+=5)box([-22,y,18],[60,.2,.2],'#446166');
    path(Array.from({length:100},(_,i)=>[-51+i*.6,2+10*Math.sin(i*.21),18.3]),.35,'#e8c75c');
    for(const x of [21,36,50])for(const y of [21,7,-7])knob(x,y,18,y===7?3.3:2);
    for(let y=-14;y<24;y+=7)box([14,y,18],[3,3,2],'#9aa6a2');
    bnc(24,-23,18);bnc(45,-23,18);box([24,-28,18],[6,1,1],'#dfbd4a');box([45,-28,18],[6,1,1],'#6fa6ce');
    path([[-47,34,0],[-47,42,0],[47,42,0],[47,34,0]],2,'#626f6b');
    group('test-loop',[-63,29,0],[-22,25,0]);
    const loopPoint=t=>[30.4*Math.cos(t*TAU/48),-20+3*t/(5*48),30.4*Math.sin(t*TAU/48)];
    for(let i=0;i<5*48;i++)tube(loopPoint(i),loopPoint(i+1),.24,'#b77a38',6);
    // Two generator-loop leads, electrically isolated from the main winding.
    path([[30.4,-20,0],[39,-18,17],[10,-23,43],[-40,-23,43],[-55,-23,-10]],.4,'#bd8845');
    path([[30.4,-17,0],[38,-12,22],[12,-22,49],[-44,-22,49],[-61,-22,-10]],.4,'#bd8845');
    group('probe',[12,12,-20],[20,15,30]);
    tube([0,0,0],[24,0,0],2.3,'#434e4b',16);tube([0,0,0],[5,0,0],3.2,'#e3ba43',16);tube([-10,0,0],[0,0,0],.65,'#adb5b0');
    tube([6,0,0],[8,0,0],4.2,'#434e4b',18);box([16,2.3,0],[6,.8,1.8],'#d5b34c');
    path([[24,0,0],[42,2,7],[81,0,18],[100,-5,0],[100,-4,-42],[61,3,-94]],1.2,'#343d39');
    path([[7,-1,0],[10,-6,5],[0,-7,10],[-8,-6,-4]],.5,'#333c38');
    group('connections',[0,0,0],[0,0,0]);
    path([[-20,6,-20],[-14,25,-22],[-5,6,-37]],.65,'#587a6c');
    path([[9,6,-47],[13,15,-47],[20,6,-47]],.6,'#9b6546');
    path([[48,6,-47],[55,13,-47],[66,6,-53]],.6,'#9b6546');
    path([[66,6,-53],[78,9,-53],[87,6,-40]],.6,'#9b6546');
    path([[66,6,-27],[77,10,-24],[91,6,-40]],.6,'#444f48');
    path([[-94,12,-71],[-93,6,-50],[-133,6,-22],[-118,6,-10]],1.1,'#343d39');
    tube([-118,6,-14],[-118,6,-10],1.4,'#af4b3c');path([[-118,6,-10],[-124,7,-10]],.9,'#343d39');
    path([[-5,5,-33],[2,6,-24],[66,5,-27]],.6,'#343d39');

    if(milestone==='m2'){
      const originals=parts.slice();parts.length=0;
      const reuse=(source,id,position)=>{const old=originals.find(p=>p.id===source);parts.push({...old,id,position,explode:[0,25,0]});};
      reuse('coil','coil',[-63,29,0]);reuse('tuning-capacitor','tuning-capacitor',[-12,11,-40]);
      reuse('breadboard','breadboard',[200,0,0]);
      reuse('generator','generator',[-150,25,-120]);reuse('oscilloscope','oscilloscope',[220,38,-140]);
      // Separate generator loop for LAB3's distance test; the six-turn link stays on the tank.
      group('test-loop',[-63,29,140],[0,0,35]);
      for(let k=0;k<5;k++)path(Array.from({length:49},(_,i)=>[30*Math.cos(i*TAU/48),k*.6,30*Math.sin(i*TAU/48)]),.24,'#b77a38');
      group('link',[-63,29,0],[0,25,0]);
      for(let i=0;i<6*48;i++){const point=t=>[31.2*Math.cos(t*TAU/48),7+5*t/(6*48),31.2*Math.sin(t*TAU/48)];tube(point(i),point(i+1),.42,'#447d9a');}
      group('pot',[136,12,-47],[0,25,0]);box([0,0,0],[10,9,10],'#3f7692');tube([0,4.5,0],[0,5.5,0],3,'#b9c6c7');box([0,5.7,0],[4,.4,.6],'#303b40');
      for(const x of [-4,0,4])tube([x,-4,0],[x,-8,0],.4,'#b9c6c7');
      for(const [id,x] of [['q1',166],['q2',230]]){group(id,[x,12,-47],[0,30,0]);tube([0,0,-1.5],[0,0,1.5],3.5,'#252d30',20);box([0,-1.5,1.4],[7,4,.7],'#30383d');for(const dx of [-2,0,2])path([[dx,-2,0],[dx,-6,0],[dx,-8,0]],.3,'#aebcc2');}
      const resistor=(id,x,z)=>{group(id,[x,11,z],[0,25,0]);tube([0,0,-5],[0,0,5],2,'#cabb91',16);const bands=id.startsWith('rc')?['#cf493d','#292e32','#d44635']:id.startsWith('rf')?['#744b2c','#292e32','#dccd47']:id==='supply-resistor'?['#cf493d','#cf493d','#744b2c']:['#744b2c','#37604b','#c26c2f'];[...bands,'#b8984a'].forEach((c,i)=>tube([0,0,-3+i*2],[0,0,-2.3+i*2],2.04,c,16));for(const z of [-1,1])path([[0,-6,z*12],[0,0,z*12],[0,0,z*5]],.35,'#aab2a9');};
      resistor('rc1',166,-66);resistor('rf1',151,-40);resistor('rc2',230,-66);resistor('rf2',212,-40);
      resistor('supply-resistor',145,-64);resistor('detector-resistor',262,-40);
      reuse('diode','detector-diode',[250,11,-47]);reuse('detector-capacitor','detector-capacitor',[275,11,-40]);
      group('protection',[130,11,-64],[0,25,0]);tube([-4,0,0],[4,0,0],2,'#242d32',16);tube([2,0,0],[3,0,0],2.05,'#bdc8cf');path([[-10,-6,0],[-10,0,0],[-4,0,0]],.35,'#b8c8d2');path([[4,0,0],[10,0,0],[10,-6,0]],.35,'#b8c8d2');
      for(const [id,x,z] of [['cin',150,-47],['coupling',194,-47],['decouple',175,-66]]){group(id,[x,12,z],[0,25,0]);box([0,0,0],[6,6,3],'#ca9e41');for(const dx of [-2,2])tube([dx,-3,0],[dx,-8,0],.3,'#b8c8d2');}
      for(const [id,x,z] of [['bulk',156,-66],['output',280,-47]]){group(id,[x,12,z],[0,28,0]);tube([0,-5,0],[0,5,0],3,'#354b60',20);box([0,0,3],[1.3,9,.25],'#b8c8d2');for(const dx of [-1.5,1.5])tube([dx,-5,0],[dx,-8,0],.3,'#b8c8d2');}
      group('battery',[85,8,55],[0,20,30]);box([0,0,0],[55,8,48],'#242d32');for(const z of [-15,0,15]){tube([-24,6,z],[24,6,z],6,'#b5bec2',20);tube([15,6,z],[23,6,z],6.1,'#dd5447');}
      group('connections',[0,0,0],[0,0,0]);
      // Connection routes explain nodes; breadboard holes are not a wiring prescription.
      path([[-33,36,0],[-15,30,-28],[-12,5,-26]],.5,'#b77a38');path([[-33,65,0],[0,30,-15],[-4,5,-26]],.5,'#b77a38');
      for(let k=0;k<2;k++)path([[-32,38+k,0],[10,7+k,-20],[70,7+k,-28],[132+k*4,5,-47]],.55,k?'#333d42':'#447d9a');
      path([[140,5,-47],[146,6,-47]],.5,'#447d9a');path([[154,6,-47],[166,5,-47]],.5,'#447d9a');
      path([[168,5,-47],[190,6,-47]],.5,'#447d9a');path([[198,6,-47],[230,5,-47]],.5,'#447d9a');
      path([[232,5,-47],[240,6,-47]],.5,'#dd5447');path([[264,6,-47],[280,6,-47]],.5,'#dd5447');
      path([[61,14,55],[90,5,20],[93,5,-64]],.7,'#dd5447');path([[109,14,55],[115,5,15],[125,5,-24]],.7,'#333d42');
    }
    return parts;
  }
  // Use the submitted Table 4 inductance for the teaching experiment.
  const inductance = (turns=75) => (globalThis.window?.RADIO_CONTENT?.milestones[0].results.predictions.find(row => row.key === 'inductance')?.value ?? 249.43)*(turns/75)**2;
  const resonance = (capPf,turns=75,probePf=0) => 1/(2*Math.PI*Math.sqrt(inductance(turns)*1e-6*(capPf+probePf)*1e-12));
  globalThis.RadioGeometry={build,inductance,resonance};
})();
