(() => {
  'use strict';
  const svg = document.querySelector('.hero-motion');
  if (!svg || !window.Matter) return;
  const {Engine, Bodies, Body, Composite, Sleeping} = Matter;
  const hero = document.querySelector('.hero');
  const image = hero?.querySelector('.hero-art');
  const button = document.querySelector('.motion-toggle');
  const main = document.querySelector('main');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const zh = document.documentElement.lang.startsWith('zh');
  const ns = 'http://www.w3.org/2000/svg';
  const palette = getComputedStyle(document.documentElement);
  const color = name => palette.getPropertyValue(name).trim();
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const boundary = v => .44 + .04 * Math.sin(Math.PI * Math.min(v, .925));
  let seed = 1741;
  const random = () => ((seed = (1664525 * seed + 1013904223) >>> 0) / 4294967296);
  const gaussian = () => Math.sqrt(-2 * Math.log(Math.max(random(), 1e-8))) * Math.cos(2 * Math.PI * random());
  function element(tag, parent, attrs) {
    const el = document.createElementNS(ns, tag);
    Object.entries(attrs).forEach(([key, value]) => el.setAttribute(key, value));
    parent.append(el);
    return el;
  }
  // Match the original ribbon, then continue its position and first derivative.
  function ribbon(v) {
    if (v <= .925) {
      const blend = 1 / (1 + Math.exp(-(v - .72) / .12));
      return [680 + 450 * Math.exp(-(((v - .6) / .30) ** 2)) - 550 * v ** 4,
        500 + (2200 + 10500 * blend) * (v - .72) ** 2];
    }
    const q = v - .925, end = ribbon(.925), h = .00001;
    const prev = ribbon(.925 - h), ramp = (1 - Math.exp(-q / .5)) ** 2;
    return [end[0] + (end[0] - prev[0]) / h * .13 * (1 - Math.exp(-q / .13)) + 160 * ramp * Math.sin(q * 1.35),
      end[1] + (end[1] - prev[1]) / h * .12 * (1 - Math.exp(-q / .12)) + 170 * ramp * Math.sin(q * 1.1)];
  }
  let scale = 1, originX = 0, originY = 0, maxV = 4, heroEnd = 900, mainEnd = 5000, revealTop=0, revealEnd=0;
  function project(u, v) {
    const [left, width] = ribbon(v), x = left + u * width;
    return [originX + scale * x, originY + scale * (-140 + 1420 * v - 260 * Math.exp(-(((x - 1100) / 400) ** 2)))];
  }
  function inverse(x, y) {
    x = (x - originX) / scale;
    y = (y - originY) / scale;
    const v = (y + 140 + 260 * Math.exp(-(((x - 1100) / 400) ** 2))) / 1420;
    const [left, width] = ribbon(v);
    return [(x - left) / width, v];
  }
  const common = {fill:'none', 'stroke-linecap':'round', 'stroke-linejoin':'round'};
  function path(points, screen = false) {
    return points.map(p => project(...p)).map(([x,y],i) => (i?'L':'M')+x.toFixed(2)+','+(y-(screen?scrollY:0)).toFixed(2)).join(' ');
  }
  document.body.append(svg, button);
  document.body.classList.add('physics-active');
  const defs = svg.querySelector('defs');
  function gradient(id, ink, high, low) {
    const g = element('linearGradient', defs, {id, gradientUnits:'userSpaceOnUse', x1:0,x2:0});
    element('stop', g, {offset:0,'stop-color':ink,'stop-opacity':high});
    element('stop', g, {offset:1,'stop-color':ink,'stop-opacity':low});
    return g;
  }
  const meshFade = gradient('mesh-depth', color('--primary'), .48, hero ? .075 : .05);
  const boundaryFade = gradient('boundary-depth', '#f46e32', .88, hero ? .10 : .07);
  const reveal = gradient('field-reveal','#ffffff',0,1);
  const mask=element('mask',defs,{id:'field-mask',maskUnits:'userSpaceOnUse',x:0,y:0});
  const maskRect=element('rect',mask,{x:0,y:0,fill:'url(#field-reveal)'});
  const mesh = svg.querySelector('.field-mesh');
  mesh.setAttribute('mask','url(#field-mask)');
  let meshRange = [-Infinity, -Infinity];
  function drawMesh(force = false) {
    mesh.setAttribute('transform', `translate(0 ${-scrollY})`);
    if (!force && scrollY >= meshRange[0] + (meshRange[0] === 0 ? 0 : 140) && scrollY + innerHeight < meshRange[1] - 140) return;
    meshRange = [Math.max(0, scrollY - 500), scrollY + innerHeight + 500];
    const v0 = Math.max(-.08, ((meshRange[0] - originY) / scale + 140) / 1420 - .2);
    const v1 = Math.min(maxV, ((meshRange[1] - originY) / scale + 400) / 1420 + .1);
    const cols = 66, rows = 54, paths = Array.from({length:6},()=>[]), dots = [];
    const point = (row, col) => {
      const u = col / cols, offset = 1 / 6 + smooth(.13, .48, u) / 3;
      return [u, (row + (-1) ** (row + col) * offset) / rows];
    };
    const seen = new Set();
    for (let row = Math.floor(v0 * rows); row <= Math.ceil(v1 * rows); row++) {
      for (let col = -5; col <= 106; col++) {
        const a = point(row, col), neighbors = [point(row, col + 1)];
        if ((row + col) % 2 === 0) neighbors.push(point(row + 1, col));
        for (const b of neighbors) {
          if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-8) continue;
          const pa = project(...a), pb = project(...b);
          if (Math.max(pa[0],pb[0]) < 0 || Math.min(pa[0],pb[0]) > innerWidth || Math.min(pa[1],pb[1]) > mainEnd) continue;
          const edge = [a,b].map(p=>p.map(n=>n.toFixed(7)).join(',')).sort().join(';');
          if (seen.has(edge)) continue;
          seen.add(edge);
          const fade=smooth(-.09,.14,(a[0]+b[0])/2);
          if(fade<.02)continue;
          paths[Math.min(5,Math.floor(fade*6))].push(path(Array.from({length:5}, (_,n)=>[a[0]+(b[0]-a[0])*n/4,a[1]+(b[1]-a[1])*n/4])));
        }
        if (a[0] < .18 && (row + col) % 2 === 0) {
          const [x,y] = project(...a);
          if (x > 0 && x < innerWidth && y < mainEnd) dots.push(`M${x.toFixed(2)},${y.toFixed(2)}h.1`);
        }
      }
    }
    mesh.replaceChildren();
    paths.forEach((segments,i)=>element('path', mesh, {...common,d:segments.join(' '),stroke:'url(#mesh-depth)',opacity:(i+1)/6,'stroke-width':Math.max(.45,scale*.85)}));
    element('path', mesh, {...common,d:dots.join(' '),stroke:'url(#mesh-depth)','stroke-width':Math.max(1,scale*2)});
    const border = [];
    for (let v = v0; v <= v1; v += .004) border.push([boundary(v),v]);
    element('path', mesh, {...common,d:path(border),stroke:'url(#boundary-depth)','stroke-width':Math.max(1,scale*1.7)});
  }
  const engine = Engine.create({gravity:{x:0,y:0,scale:0},enableSleeping:false});
  const particles = [];
  const quantum = svg.querySelector('.quantum-motion'), classical = svg.querySelector('.classical-motion');
  function addParticle(kind, u, v) {
    const spin = kind === 'spin';
    const body = Bodies.circle(u*1000,v*1000,7, {
      isStatic:spin, frictionAir:.12, restitution:.35, friction:0, inertia:Infinity,
      collisionFilter:{category:spin ? 1 : 2,mask:spin ? 0 : 2}
    });
    Composite.add(engine.world,body);
    const group = element('g', spin ? quantum : classical, {'data-kind':kind});
    let trailFade=null;
    if(!spin) {
      const trailDefs=element('defs',group,{});
      trailFade=element('linearGradient',trailDefs,{id:`trail-${body.id}`,gradientUnits:'userSpaceOnUse'});
      element('stop',trailFade,{offset:0,'stop-color':color('--primary'),'stop-opacity':0});
      element('stop',trailFade,{offset:.45,'stop-color':color('--primary'),'stop-opacity':.18});
      element('stop',trailFade,{offset:1,'stop-color':color('--primary'),'stop-opacity':.65});
    }
    const line = element('path',group,{fill:spin?color('--primary'):`url(#trail-${body.id})`,stroke:'none',class:spin?'spin-glyph':'particle-trail'});
    const accent = spin ? null : element('circle',group,{r:2.8,fill:color('--primary'),stroke:'none',class:'particle-dot'});
    particles.push({body,kind,group,line,accent,trailFade,theta:random()*Math.PI*2,neighbors:[],trail:[[u,v]],active:true});
  }
  function populate() {
    Composite.clear(engine.world,false);
    quantum.replaceChildren(); classical.replaceChildren(); particles.length = 0;
    // Spins sit on actual mesh vertices; only the classical particles translate.
    const spacing=Math.max(.11,(maxV-.35)/200);
    for (let v = .25; v < maxV - .10; v += spacing) {
      for(let n=0;n<2;n++) {
        const row=Math.round(v*54),col=5+n*10+Math.floor(random()*7),u=col/66;
        const offset=1/6+smooth(.13,.48,u)/3;
        addParticle('spin',u,(row+(-1)**(row+col)*offset)/54);
      }
      for (let n=0;n<3;n++) addParticle('brownian',.52+random()*.26,v+random()*.09);
    }
    const spins=particles.filter(p=>p.kind==='spin');
    spins.forEach(p=>{
      p.neighbors=spins.filter(q=>q!==p).map(q=>({particle:q,distance:Math.hypot(p.body.position.x-q.body.position.x,p.body.position.y-q.body.position.y)}))
        .filter(q=>q.distance<210);
    });
  }
  let pointer = null, pressed = false;
  const setPointer = event => { pointer = {x:event.clientX,y:event.clientY}; };
  document.addEventListener('pointermove',setPointer,{passive:true});
  document.addEventListener('pointerdown',event => {setPointer(event);pressed=true;},{passive:true});
  document.addEventListener('pointerup',event => {pressed=false;if(event.pointerType==='touch') pointer=null;},{passive:true});
  document.addEventListener('pointercancel',()=>{pointer=null;pressed=false;});
  document.documentElement.addEventListener('pointerleave',()=>{pointer=null;pressed=false;});
  window.addEventListener('blur',()=>{pointer=null;pressed=false;});
  let paused = reduced.matches, raf = 0, previous = 0, accumulator = 0, ticks = 0;
  const step = 1000/60;
  function updatePhysics() {
    const target = pointer ? inverse(pointer.x,pointer.y+scrollY) : null;
    particles.forEach(p=>{if(p.kind==='spin')p.previousTheta=p.theta;});
    for (const particle of particles) {
      const {body,kind} = particle;
      const u = body.position.x/1000, v = body.position.y/1000;
      const pos = project(u,v), y = pos[1]-scrollY;
      particle.active = y > -220 && y < innerHeight+220 && pos[1] < mainEnd;
      if(kind!=='spin')Sleeping.set(body,!particle.active);
      if (!particle.active) continue;
      if(kind==='spin') {
        // Overdamped planar-spin (XY) Langevin dynamics, not a quantum-state solver.
        // d theta = -mu dH/dtheta dt + sqrt(2 D dt) dW; H includes exchange and local field.
        let torque=0;
        for(const neighbor of particle.neighbors) {
          const weight=Math.exp(-neighbor.distance*neighbor.distance/(2*130*130));
          torque+=weight*Math.sin(neighbor.particle.previousTheta-particle.previousTheta);
        }
        torque*=.7;
        if(pointer) {
          const distance=Math.hypot(pos[0]-pointer.x,y-pointer.y);
          const strength=8*Math.exp(-distance*distance/(2*190*190))*(pressed?1.8:1);
          const direction=Math.atan2(target[1]-v,target[0]-u);
          torque+=strength*Math.sin(direction-particle.previousTheta);
        }
        const dt=step/1000;
        particle.theta=(particle.previousTheta+torque*dt+Math.sqrt(2*.035*dt)*gaussian())%(2*Math.PI);
        continue;
      }
      // Fixed-step Langevin-style kicks + viscous damping. Units are illustrative.
      const force = {x:gaussian()*.0009,y:gaussian()*.0009};
      if (pointer) {
        const distance = Math.hypot(pos[0]-pointer.x,y-pointer.y);
        const weight = Math.exp(-distance*distance/(2*220*220)) * (pressed ? 2.2 : 1);
        const tu = clamp(target[0],boundary(v)+.04,.87);
        force.x += clamp((tu-u)*.016*weight,-.0025,.0025);
        force.y += clamp((target[1]-v)*.013*weight,-.0025,.0025);
      }
      Body.applyForce(body,body.position,{x:force.x*body.mass,y:force.y*body.mass});
    }
    Engine.update(engine,step);
    ticks++;
    for (const p of particles) {
      if (!p.active || p.kind==='spin') continue;
      const b=p.body;
      let u=b.position.x/1000, v=b.position.y/1000;
      const min=boundary(v)+.032, max=.88;
      if (u < min || u > max) {
        u=clamp(u,min,max);Body.setPosition(b,{x:u*1000,y:b.position.y});
        Body.setVelocity(b,{x:-b.velocity.x*.4,y:b.velocity.y});
      }
      if (v < .12 || v > maxV-.05) {
        v=clamp(v,.12,maxV-.05);Body.setPosition(b,{x:b.position.x,y:v*1000});
        Body.setVelocity(b,{x:b.velocity.x,y:-b.velocity.y*.4});
      }
      if (b.speed>2.3) Body.setVelocity(b,{x:b.velocity.x*2.3/b.speed,y:b.velocity.y*2.3/b.speed});
      if (ticks%3===0) {p.trail.push([u,v]);if(p.trail.length>26)p.trail.shift();}
    }
  }
  function drawTrail(p,u,v) {
    // Corner cutting smooths the recorded path without overshooting its surface coordinates.
    const history=[...p.trail,[u,v]],smoothPoints=[history[0]];
    for(let i=0;i<history.length-1;i++) {
      const a=history[i],b=history[i+1];
      smoothPoints.push([.75*a[0]+.25*b[0],.75*a[1]+.25*b[1]],
        [.25*a[0]+.75*b[0],.25*a[1]+.75*b[1]]);
    }
    smoothPoints.push([u,v]);
    const points=[];
    for(const uv of smoothPoints) {
      const xy=project(...uv),previous=points.at(-1);
      if(!previous||Math.hypot(xy[0]-previous[0],xy[1]-previous[1])>.03)points.push(xy);
    }
    if(points.length<2){p.line.setAttribute('d','');return;}
    const distances=[0];
    for(let i=1;i<points.length;i++)distances.push(distances.at(-1)+Math.hypot(points[i][0]-points[i-1][0],points[i][1]-points[i-1][1]));
    const length=distances.at(-1),left=[],right=[];
    for(let i=0;i<points.length;i++) {
      const a=points[Math.max(0,i-1)],b=points[Math.min(points.length-1,i+1)];
      const norm=Math.hypot(b[0]-a[0],b[1]-a[1])||1;
      const radius=2.35*(distances[i]/length)**1.3;
      const nx=-(b[1]-a[1])/norm,ny=(b[0]-a[0])/norm;
      left.push([points[i][0]+radius*nx,points[i][1]-scrollY+radius*ny]);
      right.push([points[i][0]-radius*nx,points[i][1]-scrollY-radius*ny]);
    }
    p.line.setAttribute('d',[...left,...right.reverse()].map((xy,i)=>(i?'L':'M')+xy.map(n=>n.toFixed(2)).join(',')).join(' ')+'Z');
    const start=points[0],end=points.at(-1);
    // A spatial fade complements the continuous taper; the end remains beneath the solid dot.
    p.trailFade.setAttribute('x1',start[0]);p.trailFade.setAttribute('y1',start[1]-scrollY);
    p.trailFade.setAttribute('x2',end[0]+(Math.hypot(end[0]-start[0],end[1]-start[1])<.01?.01:0));
    p.trailFade.setAttribute('y2',end[1]-scrollY);
  }
  function drawParticles() {
    for (const p of particles) {
      const u=p.body.position.x/1000,v=p.body.position.y/1000;
      const pos=project(u,v), y=pos[1]-scrollY;
      const visible=y>-100&&y<innerHeight+100&&pos[1]<mainEnd;
      p.group.style.display=visible?'':'none';
      if(!visible)continue;
      const depth=smooth(heroEnd-80,heroEnd+220,pos[1]);
      const near=pointer ? Math.exp(-((Math.hypot(pos[0]-pointer.x,y-pointer.y)/160)**2)) : 0;
      p.group.setAttribute('opacity',((.85*(1-depth)+depth*(.16+.18*near))*smooth(revealTop,revealEnd,pos[1])*(hero?1:.75)).toFixed(3));
      p.group.dataset.u=u.toFixed(6);p.group.dataset.v=v.toFixed(6);
      if(p.kind==='spin') {
        const tip=project(u+.002*Math.cos(p.theta),v+.002*Math.sin(p.theta));
        const norm=Math.hypot(tip[0]-pos[0],tip[1]-pos[1]);
        const dx=(tip[0]-pos[0])/norm,dy=(tip[1]-pos[1])/norm;
        const length=clamp(28*scale,13,27),head=length*2/3,tail=-length/3,halfWidth=length*.07;
        const pt=(along,side=0)=>`${(pos[0]+along*dx-side*dy).toFixed(2)},${(y+along*dy+side*dx).toFixed(2)}`;
        p.line.setAttribute('d',`M${pt(head)}L${pt(tail,halfWidth)}L${pt(tail,-halfWidth)}Z`);
        p.group.dataset.theta=p.theta.toFixed(6);
      } else {
        drawTrail(p,u,v);
        p.accent.setAttribute('cx',pos[0]);p.accent.setAttribute('cy',y);
      }
    }
  }
  function fit() {
    const mainRect=main.getBoundingClientRect(),mainTop=mainRect.top+scrollY;
    mainEnd=mainRect.bottom+scrollY;
    if(image) {
      const rect=image.getBoundingClientRect();
      scale=Math.max(rect.width/1536,rect.height/1024);
      const pos=getComputedStyle(image).objectPosition.split(' ').map(parseFloat);
      originX=rect.left+(rect.width-1536*scale)*pos[0]/100;
      originY=rect.top+scrollY+(rect.height-1024*scale)*pos[1]/100;
      heroEnd=hero.getBoundingClientRect().bottom+scrollY;
      revealTop=rect.top+scrollY-(innerWidth>1100?100:0);
      revealEnd=rect.top+scrollY+(innerWidth>1100?10:75);
    } else {
      // Archive and detail pages start in the faint continuation of the same surface.
      scale=innerWidth/1536;
      originX=0;originY=mainTop-1260*scale;
      heroEnd=mainTop-250;
      revealTop=mainTop-50;revealEnd=mainTop+20;
    }
    maxV=((mainEnd-originY)/scale+400)/1420;
    svg.setAttribute('viewBox',`0 0 ${innerWidth} ${innerHeight}`);
    for(const g of [meshFade,boundaryFade]) {g.setAttribute('y1',heroEnd-100);g.setAttribute('y2',heroEnd+220);}
    reveal.setAttribute('y1',revealTop);reveal.setAttribute('y2',revealEnd);
    for(const el of [mask,maskRect]){el.setAttribute('width',innerWidth);el.setAttribute('height',mainEnd);}
    if(!particles.length || Math.abs(particles.at(-1).body.position.y/1000-maxV)>.5)populate();
    drawMesh(true);drawParticles();
  }
  function label() {
    const text=paused?(zh?'播放动画':'Play animation'):(zh?'暂停动画':'Pause animation');
    button.setAttribute('aria-label',text);button.title=text;
    button.innerHTML=`<i data-lucide="${paused?'play':'pause'}"></i>`;
    window.lucide?.createIcons({nodes:[button]});
  }
  function tick(now) {
    if(previous)accumulator+=Math.min(now-previous,50);
    previous=now;
    while(accumulator>=step){updatePhysics();accumulator-=step;}
    drawParticles();raf=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(raf);previous=0;accumulator=0;
    if(!paused&&!document.hidden)raf=requestAnimationFrame(tick);
    label();
  }
  button.hidden=false;
  button.addEventListener('click',()=>{paused=!paused;pointer=null;sync();});
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  let scrollFrame=0;
  document.addEventListener('scroll',()=>{
    if(scrollFrame)return;
    scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;drawMesh();drawParticles();});
  },{passive:true});
  new ResizeObserver(fit).observe(main);
  window.addEventListener('resize',fit);
  fit();sync();
})();
