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
  const coarsePointer = matchMedia('(pointer: coarse)');
  const mobileViewport = matchMedia('(max-width: 820px), (pointer: coarse)');
  let fixedField = mobileViewport.matches, fieldHeight = innerHeight, fieldWidth = 0;
  let opacityStops = [];
  const scrollOffset = () => fixedField ? 0 : scrollY;
  let zh = document.documentElement.lang.startsWith('zh');
  const controls = document.querySelector('.field-controls');
  const fieldPlay = controls?.querySelector('.field-play');
  const parameterRanges = {temperature:[0,4],damping:[.2,3],attraction:[0,3],density:[1,2],disorder:[0,2]};
  const parameters = {temperature:1,damping:1,attraction:1,density:1,disorder:0};
  try {
    const saved=JSON.parse(sessionStorage.getItem('physics-parameters')||'null');
    for(const [key,[min,max]] of Object.entries(parameterRanges)) {
      if(Number.isFinite(saved?.[key]))parameters[key]=Math.max(min,Math.min(max,saved[key]));
    }
  } catch { /* Storage is optional in private or restricted browsing. */ }
  const ns = 'http://www.w3.org/2000/svg';
  const palette = getComputedStyle(document.documentElement);
  const color = name => palette.getPropertyValue(name).trim() || '#001158';
  const paint = id => `url(#${id}) ${color('--primary')}`;
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const smooth = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  const boundary = v => .44 + .04 * Math.sin(Math.PI * Math.min(v, .925));
  const classicalEdge = .88;
  const classicalFadeWidth = .07;
  const disorderWavevectors = [[2.3,.63,.42],[-1.4,1.1,.34],[.8,1.9,.24]];
  let disorderModes, disorderVersion=0;
  const disorderRandom = () => {
    if(!window.crypto?.getRandomValues)return Math.random();
    const value=new Uint32Array(1);window.crypto.getRandomValues(value);
    return value[0]/4294967296;
  };
  function randomizeDisorder() {
    disorderModes=disorderWavevectors.map(([ku,kv,weight])=>[
      ku,kv,2*Math.PI*disorderRandom(),weight*(.82+.36*disorderRandom())
    ]);
    svg.dataset.disorderVersion=String(++disorderVersion);
    svg.dataset.disorderModes=JSON.stringify(disorderModes);
  }
  randomizeDisorder();
  function disorderField(u,v) {
    let potential=0,x=0,y=0;
    for(const [ku,kv,phase,weight] of disorderModes) {
      const angle=2*Math.PI*(ku*u+kv*v)+phase,sine=Math.sin(angle);
      potential+=weight*Math.cos(angle);
      x+=weight*ku*sine;y+=weight*kv*sine;
    }
    return {potential,x:x/1.55,y:y/1.55};
  }
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
    const q = v - .925, end = ribbonEnd, h = .00001;
    const prev = ribbonPrevious, ramp = (1 - Math.exp(-q / .5)) ** 2;
    return [end[0] + (end[0] - prev[0]) / h * .13 * (1 - Math.exp(-q / .13)) + 160 * ramp * Math.sin(q * 1.35),
      end[1] + (end[1] - prev[1]) / h * .12 * (1 - Math.exp(-q / .12)) + 170 * ramp * Math.sin(q * 1.1)];
  }
  const ribbonEnd = ribbon(.925), ribbonPrevious = ribbon(.925 - .00001);
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
    return points.map(p => project(...p)).map(([x,y],i) => (i?'L':'M')+x.toFixed(2)+','+(y-(screen?scrollOffset():0)).toFixed(2)).join(' ');
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
  const meshFade = gradient('mesh-depth', color('--primary'), .33, hero ? .065 : .05);
  const boundaryFade = gradient('boundary-depth', '#f46e32', .88, hero ? .10 : .07);
  const reveal = gradient('field-reveal','#ffffff',0,1);
  const mask=element('mask',defs,{id:'field-mask',maskUnits:'userSpaceOnUse',x:0,y:0});
  const maskRect=element('rect',mask,{x:0,y:0,fill:'url(#field-reveal)'});
  const mesh = svg.querySelector('.field-mesh');
  mesh.setAttribute('mask','url(#field-mask)');
  let meshRange = [-Infinity, -Infinity];
  const meshRows = new Map();
  function drawMesh(force = false) {
    const offset = scrollOffset(), height = fixedField ? fieldHeight : innerHeight;
    mesh.setAttribute('transform', `translate(0 ${-offset})`);
    if (!force && offset >= meshRange[0] + (meshRange[0] === 0 ? 0 : 140) && offset + height < meshRange[1] - 140) return;
    meshRange = [Math.max(0, offset - 500), offset + height + 500];
    const v0 = Math.max(-.08, ((meshRange[0] - originY) / scale + 140) / 1420 - .2);
    const v1 = Math.min(maxV, ((meshRange[1] - originY) / scale + 400) / 1420 + .1);
    const cols = 66, rows = 54, paths = Array.from({length:6},()=>[]), dots = [];
    const point = (row, col) => {
      const u = col / cols, offset = 1 / 6 + smooth(.13, .48, u) / 3;
      return [u, (row + (-1) ** (row + col) * offset) / rows];
    };
    for (let row = Math.floor(v0 * rows); row <= Math.ceil(v1 * rows); row++) {
      const cached = meshRows.get(row);
      if (cached) {
        cached.paths.forEach((segments,i)=>paths[i].push(...segments));
        dots.push(...cached.dots);
        continue;
      }
      const rowPaths = Array.from({length:6},()=>[]), rowDots = [];
      for (let col = -5; col <= 106; col++) {
        const a = point(row, col), neighbors = [point(row, col + 1)];
        if ((row + col) % 2 === 0) neighbors.push(point(row + 1, col));
        for (const b of neighbors) {
          if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 1e-8) continue;
          const pa = project(...a), pb = project(...b);
          if (Math.max(pa[0],pb[0]) < 0 || Math.min(pa[0],pb[0]) > innerWidth || Math.min(pa[1],pb[1]) > mainEnd) continue;
          const uMid=(a[0]+b[0])/2;
          const fade=smooth(-.09,.14,uMid)*(1-smooth(classicalEdge,classicalEdge+classicalFadeWidth,uMid));
          if(fade<.02)continue;
          // Each right/down edge has one owner; reuse its already-projected endpoints.
          const samples=coarsePointer.matches?2:4, points=[pa];
          for(let n=1;n<samples;n++)points.push(project(a[0]+(b[0]-a[0])*n/samples,a[1]+(b[1]-a[1])*n/samples));
          points.push(pb);
          rowPaths[Math.min(5,Math.floor(fade*6))].push(points.map(([x,y],i)=>(i?'L':'M')+x.toFixed(2)+','+y.toFixed(2)).join(' '));
        }
        if (a[0] < .18 && (row + col) % 2 === 0) {
          const [x,y] = project(...a);
          if (x > 0 && x < innerWidth && y < mainEnd) rowDots.push(`M${x.toFixed(2)},${y.toFixed(2)}h.1`);
        }
      }
      meshRows.set(row,{paths:rowPaths,dots:rowDots});
      rowPaths.forEach((segments,i)=>paths[i].push(...segments));
      dots.push(...rowDots);
    }
    // Keep the cache bounded on long archives.
    for (const row of meshRows.keys()) if (row < Math.floor(v0*rows)-80 || row > Math.ceil(v1*rows)+80) meshRows.delete(row);
    mesh.replaceChildren();
    paths.forEach((segments,i)=>element('path', mesh, {...common,d:segments.join(' '),stroke:paint('mesh-depth'),opacity:(i+1)/6,'stroke-width':Math.max(.45,scale*.85)}));
    element('path', mesh, {...common,d:dots.join(' '),stroke:paint('mesh-depth'),'stroke-width':Math.max(1,scale*2)});
    const border = [];
    for (let v = v0; v <= v1; v += .004) border.push([boundary(v),v]);
    element('path', mesh, {...common,d:path(border),stroke:color('--hero'),opacity:.75,'stroke-width':Math.max(2.8,scale*4),class:'boundary-underlay'});
    element('path', mesh, {...common,d:path(border),stroke:'url(#boundary-depth) #f46e32','stroke-width':Math.max(1,scale*1.7)});
  }
  const engine = Engine.create({gravity:{x:0,y:0,scale:0},enableSleeping:false});
  const particles = [];
  const quantum = svg.querySelector('.quantum-motion'), classical = svg.querySelector('.classical-motion');
  function animateParticleBirth(particle) {
    if(reduced.matches||paused||!particle.group.animate)return;
    particle.birthAnimation?.cancel();
    particle.group.dataset.birth='true';
    const animation=particle.group.animate([
      {transform:'scale(.04)',opacity:0},
      {transform:'scale(.72)',opacity:.72,offset:.68},
      {transform:'scale(1)',opacity:1}
    ],{duration:480,easing:'cubic-bezier(.2,.75,.25,1)'});
    particle.birthAnimation=animation;
    animation.finished.then(()=>{
      if(particle.birthAnimation===animation)delete particle.group.dataset.birth;
    }).catch(()=>{});
  }
  function finishParticleRemoval(particle) {
    if(particle.targetEnabled)return;
    particle.enabled=false;particle.group.style.display='none';
    if(particle.kind!=='spin')Sleeping.set(particle.body,true);
    delete particle.group.dataset.death;
  }
  function animateParticleRemoval(particle) {
    particle.birthAnimation?.cancel();
    if(reduced.matches||paused||!particle.group.animate){finishParticleRemoval(particle);return;}
    const opacity=Number(particle.group.getAttribute('opacity'))||1;
    particle.group.dataset.death='true';
    const animation=particle.group.animate([
      {transform:'scale(1)',opacity},
      {transform:'scale(.55)',opacity:opacity*.45,offset:.62},
      {transform:'scale(.04)',opacity:0}
    ],{duration:400,easing:'cubic-bezier(.55,0,.8,.35)'});
    particle.birthAnimation=animation;
    animation.finished.then(()=>{
      if(particle.birthAnimation===animation)finishParticleRemoval(particle);
    }).catch(()=>{});
  }
  function addParticle(kind, u, v, densityLevel=1) {
    const spin = kind === 'spin';
    const body = Bodies.circle(u*1000,v*1000,7, {
      isStatic:spin, frictionAir:.12*parameters.damping, restitution:.35, friction:0, inertia:Infinity,
      collisionFilter:{category:spin ? 1 : 2,mask:spin ? 0 : 2}
    });
    Composite.add(engine.world,body);
    const group = element('g', spin ? quantum : classical, {'data-kind':kind,'data-density-level':densityLevel.toFixed(1)});
    let trailFade=null;
    if(!spin) {
      const trailDefs=element('defs',group,{});
      trailFade=element('linearGradient',trailDefs,{id:`trail-${body.id}`,gradientUnits:'userSpaceOnUse'});
      element('stop',trailFade,{offset:0,'stop-color':color('--primary'),'stop-opacity':0});
      element('stop',trailFade,{offset:.45,'stop-color':color('--primary'),'stop-opacity':.18});
      element('stop',trailFade,{offset:1,'stop-color':color('--primary'),'stop-opacity':.65});
    }
    const line = element('path',group,{fill:spin?color('--primary'):paint(`trail-${body.id}`),stroke:'none',class:spin?'spin-glyph':'particle-trail'});
    const accent = spin ? null : element('circle',group,{r:2.8,fill:color('--primary'),stroke:'none',class:'particle-dot'});
    const enabled=densityLevel<=parameters.density;
    const particle={body,kind,group,line,accent,trailFade,densityLevel,enabled,targetEnabled:enabled,theta:random()*Math.PI*2,neighbors:[],trail:[[u,v]],active:true};
    particles.push(particle);
    if(!particle.enabled) {
      group.style.display='none';
      if(!spin)Sleeping.set(body,true);
    } else if(densityLevel>1)animateParticleBirth(particle);
    return particle;
  }
  let populatedV = .25, populationSpacing = null;
  const supplementalBands = new Set();
  function rebuildSpinNeighbors() {
    const spins=particles.filter(p=>p.kind==='spin');
    spins.forEach(p=>{
      p.neighbors=spins.filter(q=>q!==p).map(q=>({particle:q,distance:Math.hypot(p.body.position.x-q.body.position.x,p.body.position.y-q.body.position.y)}))
        .filter(q=>q.distance<210);
    });
  }
  function connectNewSpins(newSpins) {
    const spins=particles.filter(p=>p.kind==='spin');
    for(const particle of newSpins)for(const neighbor of spins) {
      if(neighbor===particle)continue;
      const distance=Math.hypot(particle.body.position.x-neighbor.body.position.x,particle.body.position.y-neighbor.body.position.y);
      if(distance>=210)continue;
      particle.neighbors.push({particle:neighbor,distance});
      if(!newSpins.includes(neighbor))neighbor.neighbors.push({particle,distance});
    }
  }
  function populate() {
    // Spins sit on actual mesh vertices; only the classical particles translate.
    const spacing=populationSpacing ??= Math.max(.11,(maxV-.35)/200);
    for (let v = populatedV; v < maxV - .10; v += spacing) {
      for(let n=0;n<2;n++) {
        const row=Math.round(v*54),col=5+n*10+Math.floor(random()*7),u=col/66;
        const offset=1/6+smooth(.13,.48,u)/3;
        addParticle('spin',u,(row+(-1)**(row+col)*offset)/54);
      }
      for (let n=0;n<3;n++) addParticle('brownian',.52+random()*.26,v+random()*.09);
      populatedV = v + spacing;
    }
    rebuildSpinNeighbors();
  }
  function visibleVRange() {
    const offset=scrollOffset(),height=fixedField?fieldHeight:innerHeight;
    return [Math.max(.12,((offset-originY)/scale+140)/1420-.2),Math.min(maxV-.05,((offset+height-originY)/scale+400)/1420+.12)];
  }
  function ensureDensity() {
    const spacing=populationSpacing;
    if(!spacing)return;
    const newSpins=[];
    if(parameters.density>1) {
      const [start,end]=visibleVRange();
      for(let band=Math.floor(start/spacing);band<=Math.ceil(end/spacing);band++) {
        if(supplementalBands.has(band))continue;
        supplementalBands.add(band);
        const v=(band+.5)*spacing;
        if(v<.12||v>maxV-.05)continue;
        for(let slot=0;slot<5;slot++) {
          const densityLevel=1.2+.2*((slot+band%5+5)%5);
          if(slot<2) {
            const col=7+slot*11+((band*7+slot*3)%7+7)%7,u=col/66,row=Math.round(v*54);
            const offset=1/6+smooth(.13,.48,u)/3;
            newSpins.push(addParticle('spin',u,(row+(-1)**(row+col)*offset)/54,densityLevel));
          } else {
            const hash=((band*37+slot*53)%101+101)%101/101;
            addParticle('brownian',.53+hash*.32,v+(slot-3)*spacing*.16,densityLevel);
          }
        }
      }
    }
    for(const particle of particles) {
      const enabled=particle.densityLevel<=parameters.density+.001;
      if(particle.targetEnabled===enabled)continue;
      particle.targetEnabled=enabled;
      if(enabled) {
        particle.birthAnimation?.cancel();delete particle.group.dataset.death;
        particle.enabled=true;particle.group.style.display='';
        if(particle.kind!=='spin')Sleeping.set(particle.body,false);
        animateParticleBirth(particle);
      } else animateParticleRemoval(particle);
    }
    if(newSpins.length)connectNewSpins(newSpins);
  }
  let pointer = null, pressed = false;
  const setPointer = event => {
    if(event.target.closest?.('.field-tools')){pointer=null;pressed=false;return;}
    pointer = {x:event.clientX,y:event.clientY};
  };
  document.addEventListener('pointermove',setPointer,{passive:true});
  document.addEventListener('pointerdown',event => {setPointer(event);pressed=!!pointer;},{passive:true});
  document.addEventListener('pointerup',event => {pressed=false;if(event.pointerType==='touch') pointer=null;},{passive:true});
  document.addEventListener('pointercancel',()=>{pointer=null;pressed=false;});
  document.documentElement.addEventListener('pointerleave',()=>{pointer=null;pressed=false;});
  window.addEventListener('blur',()=>{pointer=null;pressed=false;});
  let paused = reduced.matches, raf = 0, previous = 0, accumulator = 0, ticks = 0;
  const step = 1000/60;
  function updatePhysics() {
    const target = pointer ? inverse(pointer.x,pointer.y+scrollOffset()) : null;
    particles.forEach(p=>{if(p.kind==='spin')p.previousTheta=p.theta;});
    for (const particle of particles) {
      const {body,kind} = particle;
      const u = body.position.x/1000, v = body.position.y/1000;
      const pos = project(u,v), y = pos[1]-scrollOffset();
      particle.active = particle.enabled && y > -220 && y < innerHeight+220 && pos[1] < mainEnd;
      if(kind!=='spin' && body.isSleeping===particle.active)Sleeping.set(body,!particle.active);
      if (!particle.active) continue;
      if(kind==='spin') {
        // Overdamped planar-spin (XY) Langevin dynamics, not a quantum-state solver.
        // d theta = -mu dH/dtheta dt + sqrt(2 D dt) dW; H includes exchange and local field.
        let fieldX=0,fieldY=0;
        for(const neighbor of particle.neighbors) {
          if(!neighbor.particle.enabled)continue;
          const weight=.7*Math.exp(-neighbor.distance*neighbor.distance/(2*130*130));
          fieldX+=weight*Math.cos(neighbor.particle.previousTheta);
          fieldY+=weight*Math.sin(neighbor.particle.previousTheta);
        }
        if(parameters.disorder) {
          const disorder=disorderField(u,v),strength=3.2*parameters.disorder;
          fieldX+=strength*disorder.x;fieldY+=strength*disorder.y;
        }
        if(pointer) {
          const distance=Math.hypot(pos[0]-pointer.x,y-pointer.y);
          const strength=8*parameters.attraction*Math.exp(-distance*distance/(2*190*190))*(pressed?1.8:1);
          const direction=Math.atan2(target[1]-v,target[0]-u);
          fieldX+=strength*Math.cos(direction);fieldY+=strength*Math.sin(direction);
        }
        const dt=step/1000;
        const mobility=1/parameters.damping;
        // Integrate alignment exactly for the frozen local field to avoid overshoot
        // at low damping and strong attraction, then add the thermal increment.
        const fieldAngle=Math.atan2(fieldY,fieldX);
        const delta=Math.atan2(Math.sin(particle.previousTheta-fieldAngle),Math.cos(particle.previousTheta-fieldAngle));
        const aligned=fieldAngle+2*Math.atan(Math.tan(delta/2)*Math.exp(-Math.hypot(fieldX,fieldY)*mobility*dt));
        particle.theta=(aligned+Math.sqrt(2*.035*parameters.temperature*mobility*dt)*gaussian())%(2*Math.PI);
        continue;
      }
      // Fixed-step Langevin-style kicks + viscous damping. Units are illustrative.
      // Relative fluctuation-dissipation scaling preserves the default visual dynamics.
      const noise=.0009*Math.sqrt(parameters.temperature*parameters.damping);
      const force = {x:gaussian()*noise,y:gaussian()*noise};
      if(parameters.disorder) {
        const disorder=disorderField(u,v),strength=.00135*parameters.disorder;
        force.x+=strength*disorder.x;force.y+=strength*disorder.y;
      }
      if (pointer) {
        const distance = Math.hypot(pos[0]-pointer.x,y-pointer.y);
        const weight = Math.exp(-distance*distance/(2*220*220)) * (pressed ? 2.2 : 1);
        const tu = clamp(target[0],boundary(v)+.04,.87);
        force.x += parameters.attraction*clamp((tu-u)*.016*weight,-.0025,.0025);
        force.y += parameters.attraction*clamp((target[1]-v)*.013*weight,-.0025,.0025);
      }
      Body.applyForce(body,body.position,{x:force.x*body.mass,y:force.y*body.mass});
    }
    Engine.update(engine,step);
    ticks++;
    for (const p of particles) {
      if (!p.active || p.kind==='spin') continue;
      const b=p.body;
      let u=b.position.x/1000, v=b.position.y/1000;
      const min=boundary(v)+.032, max=classicalEdge;
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
      left.push([points[i][0]+radius*nx,points[i][1]-scrollOffset()+radius*ny]);
      right.push([points[i][0]-radius*nx,points[i][1]-scrollOffset()-radius*ny]);
    }
    p.line.setAttribute('d',[...left,...right.reverse()].map((xy,i)=>(i?'L':'M')+xy.map(n=>n.toFixed(2)).join(',')).join(' ')+'Z');
    const start=points[0],end=points.at(-1);
    // A spatial fade complements the continuous taper; the end remains beneath the solid dot.
    p.trailFade.setAttribute('x1',start[0]);p.trailFade.setAttribute('y1',start[1]-scrollOffset());
    p.trailFade.setAttribute('x2',end[0]+(Math.hypot(end[0]-start[0],end[1]-start[1])<.01?.01:0));
    p.trailFade.setAttribute('y2',end[1]-scrollOffset());
  }
  function drawParticles() {
    for (const p of particles) {
      const u=p.body.position.x/1000,v=p.body.position.y/1000;
      const pos=project(u,v), y=pos[1]-scrollOffset();
      const visible=p.enabled&&y>-100&&y<(fixedField?fieldHeight:innerHeight)+100&&pos[1]<mainEnd;
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
  let layoutKey = '';
  function updateOpacity() {
    if (!fixedField) {svg.style.opacity='';return;}
    let opacity = hero ? .9 : .3;
    for (const stop of opacityStops) {
      opacity += (stop.opacity-opacity)*smooth(stop.top-fieldHeight*.65,stop.top-fieldHeight*.15,scrollY);
    }
    svg.style.opacity=opacity.toFixed(3);
  }
  function fit() {
    const mainRect=main.getBoundingClientRect(),mainTop=mainRect.top+scrollY;
    fixedField=mobileViewport.matches;
    document.body.classList.toggle('physics-fixed',fixedField);
    if(fieldWidth!==innerWidth){fieldWidth=innerWidth;fieldHeight=innerHeight;}
    opacityStops=[...main.children].filter(el=>el!==hero).map(el=>({
      top:el.getBoundingClientRect().top+scrollY,
      opacity:el.classList.contains('works-section')?.22:el.classList.contains('about-section')?.28:.34
    }));
    updateOpacity();
    mainEnd=mainRect.bottom+scrollY;
    if(fixedField) {
      // Use one viewport-sized surface. Browser toolbar motion cannot rescale it.
      scale=innerWidth/1100;
      originX=-430*scale;originY=fieldHeight*.18-180*scale;
      mainEnd=fieldHeight+220;heroEnd=fieldHeight+300;
      revealTop=hero ? fieldHeight*.18 : 0;
      revealEnd=fieldHeight*(hero ? .65 : .22);
      svg.style.height=`${fieldHeight}px`;
    } else if(image) {
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
    if(!fixedField)svg.style.height='';
    maxV=((mainEnd-originY)/scale+400)/1420;
    svg.setAttribute('viewBox',`0 0 ${innerWidth} ${fixedField?fieldHeight:innerHeight}`);
    // Mobile browser chrome changes viewport height without changing the surface.
    // Keep body identities, velocities and trails across all layout changes.
    const nextKey=[innerWidth,scale,originX,originY,mainEnd,heroEnd,revealTop,revealEnd].map(n=>n.toFixed(2)).join(':');
    if(nextKey===layoutKey)return;
    layoutKey=nextKey;
    meshRows.clear();
    meshRange=[-Infinity,-Infinity];
    for(const g of [meshFade,boundaryFade]) {g.setAttribute('y1',heroEnd-100);g.setAttribute('y2',heroEnd+220);}
    reveal.setAttribute('y1',revealTop);reveal.setAttribute('y2',revealEnd);
    for(const el of [mask,maskRect]){el.setAttribute('width',innerWidth);el.setAttribute('height',mainEnd);}
    if(populatedV < maxV-.10)populate();
    ensureDensity();
  }
  function label() {
    const text=paused?(zh?'播放动画':'Play animation'):(zh?'暂停动画':'Pause animation');
    for(const control of [button,fieldPlay].filter(Boolean)) {
      control.setAttribute('aria-label',text);control.title=text;
      control.innerHTML=`<i data-lucide="${paused?'play':'pause'}"></i>`;
      window.lucide?.createIcons({nodes:[control]});
    }
  }
  function tick(now) {
    raf=0;
    if(needsFit){needsFit=false;fit();needsMesh=true;}
    if(!paused && previous)accumulator+=Math.min(now-previous,50);
    previous=now;
    while(!paused && accumulator>=step){updatePhysics();accumulator-=step;}
    if(needsMesh){needsMesh=false;drawMesh();}
    // Touch devices render motion at 30 Hz; scrolling only changes layer opacity.
    if(needsPaint || !coarsePointer.matches || now-lastPaint>=1000/30) {
      drawParticles();lastPaint=now;needsPaint=false;
    }
    if(!paused)requestDraw();
  }
  let needsFit=false,needsMesh=true,needsPaint=true,lastPaint=0;
  function requestDraw() {
    if(!raf&&!document.hidden)raf=requestAnimationFrame(tick);
  }
  function sync() {
    cancelAnimationFrame(raf);raf=0;previous=0;accumulator=0;
    for(const particle of particles) {
      if(paused&&particle.birthAnimation?.playState==='running')particle.birthAnimation.pause();
      else if(!paused&&particle.birthAnimation?.playState==='paused')particle.birthAnimation.play();
    }
    needsPaint=true;
    if(paused&&!document.hidden){drawParticles();needsPaint=false;}
    if(!paused||needsMesh||needsFit)requestDraw();
    label();
  }
  button.hidden=false;
  for(const control of [button,fieldPlay].filter(Boolean))control.addEventListener('click',()=>{paused=!paused;pointer=null;sync();});
  function reflectParameters() {
    controls?.querySelectorAll('[data-parameter]').forEach(input=>{
      const value=parameters[input.dataset.parameter];
      input.value=value;
      input.style.setProperty('--range-fill',`${100*(value-Number(input.min))/(Number(input.max)-Number(input.min))}%`);
      input.setAttribute('aria-valuetext',zh?`默认值的 ${value.toFixed(1)} 倍`:`${value.toFixed(1)} times default`);
    });
    for(const particle of particles)particle.body.frictionAir=.12*parameters.damping;
    try{sessionStorage.setItem('physics-parameters',JSON.stringify(parameters));}catch{}
  }
  controls?.addEventListener('input',event=>{
    const key=event.target.dataset.parameter;
    if(!Object.hasOwn(parameterRanges,key))return;
    const value=event.target.valueAsNumber;
    if(!Number.isFinite(value))return;
    parameters[key]=clamp(value,...parameterRanges[key]);
    pointer=null;pressed=false;reflectParameters();ensureDensity();
    needsPaint=true;
    if(paused)drawParticles();else requestDraw();
  });
  const disorderControl=controls?.querySelector('[data-parameter="disorder"]');
  disorderControl?.addEventListener('pointerdown',()=>{
    randomizeDisorder();pointer=null;pressed=false;requestDraw();
  });
  disorderControl?.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End','PageUp','PageDown'].includes(event.key))return;
    randomizeDisorder();pointer=null;pressed=false;requestDraw();
  });
  controls?.querySelector('.field-reset').addEventListener('click',()=>{
    Object.assign(parameters,{temperature:1,damping:1,attraction:1,density:1,disorder:0});
    pointer=null;pressed=false;reflectParameters();ensureDensity();
    needsPaint=true;
    if(paused)drawParticles();else requestDraw();
  });
  if(controls){reflectParameters();document.querySelector('.field-toggle').hidden=false;}
  document.addEventListener('site:languagechange',event=>{
    zh=event.detail.zh;
    document.querySelector('.field-toggle').hidden=false;
    label();reflectParameters();
  });
  reduced.addEventListener('change',()=>{paused=reduced.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  document.addEventListener('scroll',()=>{
    if(fixedField){updateOpacity();return;}
    ensureDensity();
    needsMesh=true;needsPaint=true;requestDraw();
  },{passive:true});
  const scheduleFit=()=>{needsFit=true;needsPaint=true;requestDraw();};
  new ResizeObserver(scheduleFit).observe(main);
  window.addEventListener('resize',scheduleFit);
  fit();sync();
})();
