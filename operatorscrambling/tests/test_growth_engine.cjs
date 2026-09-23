/* Pure Node numeric/controller tests; no browser, server or DOM renderer. */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {performance} = require('node:perf_hooks');
const html = fs.readFileSync(path.join(__dirname, '../operator_growth_bound.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);

function harness(options = {}) {
  const nodes = new Map();
  const node = id => {
    if (!nodes.has(id)) nodes.set(id, {textContent:'', hidden:false, disabled:false,
      classList:{add(){}, remove(){}, toggle(){}}, firstElementChild:{style:{}}});
    return nodes.get(id);
  };
  const context = vm.createContext({performance:options.performance || performance,
    setTimeout:options.setTimeout || setTimeout,
    document:{getElementById:node, body:node('body')}});
  vm.runInContext(script.slice(0, script.indexOf('/* theme toggle */')) + `
    globalThis.api={PROD,OPS,PRESETS,NUMERICS,applyLAsync,lanczosStep,vnorm,vdot,vscale,vaxpy,
      normalizeVector,prepareModel,validateConfig,buildDensitySeed,decodeKey,entriesToMap,
      canonKeyFromMap,niceTicks,run,exportSnapshot,snapshotInputs,markDirty,renderRunSummary,
      renderProvenance,I18N,
      setConfig(c){state=c;},setLanguage(l){curLang=l;},
      get running(){return running;},get record(){return runRecord;}};
    // Test the controller without rendering: these are presentation-only hooks.
    refreshQuiet=()=>{}; setReadouts=()=>{}; plotChart=()=>{};
  `, context);
  return {a:context.api, context, node};
}
const config = (oneBody=[], twoBody=[], extra={}) => ({oneBody,twoBody,srcOp:'Z',steps:6,seedType:'site',windowK:3,...extra});
const field = (op, coeff) => ({op,coeff});
const bond = (dx,dy,opA,opB,coeff) => ({dx,dy,opA,opB,coeff});
const seed = () => new Map([['0,0:3',1]]);
function close(a,b,tol=2e-11) {assert.ok(Math.abs(a-b)<=tol*Math.max(1,Math.abs(a),Math.abs(b)), `${a} != ${b}`);}
async function sequence(a,c,n=c.steps) {
  const model=a.prepareModel(c), qs=[seed()], bs=[], corrections=[];
  let q=qs[0],prev=null,beta=0;
  for(let i=0;i<n;i++) {
    const r=await a.lanczosStep(q,prev,beta,model);
    bs.push(r.b*model.scale); corrections.push(r.localCorrection);
    if(r.closed) break;
    prev=q;q=r.q;beta=r.b;qs.push(q);
  }
  return {bs,qs,corrections};
}

// Independent complex Hilbert-space matrix algebra. This does not use PROD,
// candidateTerms, or the sparse commutator implementation.
const zero = n => ({n,re:new Float64Array(n*n),im:new Float64Array(n*n)});
function add(a,b,c=1) {for(let i=0;i<a.re.length;i++){a.re[i]+=c*b.re[i];a.im[i]+=c*b.im[i];}return a;}
function mul(a,b) {
  const o=zero(a.n), n=a.n;
  for(let i=0;i<n;i++) for(let k=0;k<n;k++) {
    const ar=a.re[i*n+k],ai=a.im[i*n+k];if(!ar&&!ai)continue;
    for(let j=0;j<n;j++) {const br=b.re[k*n+j],bi=b.im[k*n+j];o.re[i*n+j]+=ar*br-ai*bi;o.im[i*n+j]+=ar*bi+ai*br;}
  }
  return o;
}
function densePauli(entries,sites) {
  const n=2**sites.length,o=zero(n), loc=new Map(entries.map(([x,y,l])=>[x+','+y,l]));
  for(const [x,y] of entries) assert.ok(sites.some(p=>p[0]===x&&p[1]===y),'dense patch too small');
  for(let col=0;col<n;col++) {
    let row=col,r=1,im=0;
    sites.forEach(([x,y],i)=>{
      const l=loc.get(x+','+y)||0,bit=(col>>i)&1;
      if(l===1||l===2)row^=1<<i;
      if(l===2){const sign=bit?-1:1;[r,im]=[-im*sign,r*sign];}
      if(l===3&&bit){r=-r;im=-im;}
    });
    o.re[row*n+col]=r;o.im[row*n+col]=im;
  }
  return o;
}
function denseVec(a,v,sites) {const o=zero(2**sites.length);for(const [k,c] of v)add(o,densePauli(a.decodeKey(k),sites),c);return o;}
function denseH(c,sites) {
  const o=zero(2**sites.length), index={X:1,Y:2,Z:3};
  for(const [x,y] of sites){
    for(const t of c.oneBody)add(o,densePauli([[x,y,index[t.op]]],sites),t.coeff);
    for(const t of c.twoBody)if(sites.some(([u,v])=>u===x+t.dx&&v===y+t.dy))
      add(o,densePauli([[x,y,index[t.opA]],[x+t.dx,y+t.dy,index[t.opB]]],sites),t.coeff);
  }
  return o;
}
function denseL(h,v) {const o=add(mul(h,v),mul(v,h),-1);for(let i=0;i<o.re.length;i++)[o.re[i],o.im[i]]=[-o.im[i],o.re[i]];return o;}
function denseDot(a,b){let s=0;for(let i=0;i<a.re.length;i++)s+=a.re[i]*b.re[i]+a.im[i]*b.im[i];return s/a.n;}
function denseScale(a,c){for(let i=0;i<a.re.length;i++){a.re[i]*=c;a.im[i]*=c;}return a;}
function denseClose(a,b){for(let i=0;i<a.re.length;i++){close(a.re[i],b.re[i]);close(a.im[i],b.im[i]);}}

test('all on-site Pauli commutators agree with direct 2x2 matrices', async()=>{
  const {a}=harness();
  for(const op of ['X','Y','Z'])for(let l=1;l<=3;l++){
    const c=config([field(op,-0.73)]),v=new Map([['0,0:'+l,1]]),sites=[[0,0]];
    denseClose(denseVec(a,await a.applyLAsync(v,c.oneBody,[]),sites),denseL(denseH(c,sites),denseVec(a,v,sites)));
  }
});
test('translated mixed bonds, reversed offsets, duplicate rows agree with dense commutators',async()=>{
  const {a}=harness(), sites=[[-2,0],[-1,0],[0,0],[1,0],[2,0]];
  const c=config([field('X',.31),field('Y',-.23),field('Z',.17)],
    [bond(1,0,'X','Y',.7),bond(-1,0,'Z','X',-.4),bond(1,0,'X','Y',.2),bond(2,0,'Y','Z',.11)]);
  denseClose(denseVec(a,await a.applyLAsync(seed(),c.oneBody,c.twoBody),sites),denseL(denseH(c,sites),denseVec(a,seed(),sites)));
  const v=new Map([['0,0:1;1,0:2',.6],['0,0:3',-.8]]);
  c.twoBody=c.twoBody.filter(t=>Math.abs(t.dx)===1);
  denseClose(denseVec(a,await a.applyLAsync(v,c.oneBody,c.twoBody),sites),denseL(denseH(c,sites),denseVec(a,v,sites)));
});
test('2D vertical and horizontal embedding agrees with direct matrices',async()=>{
  const {a}=harness(),sites=[[0,0],[1,0],[-1,0],[0,1],[0,-1]];
  const c=config([field('Y',.4)],[bond(1,0,'X','Y',.6),bond(0,1,'Z','X',-.8)]);
  denseClose(denseVec(a,await a.applyLAsync(seed(),c.oneBody,c.twoBody),sites),denseL(denseH(c,sites),denseVec(a,seed(),sites)));
});
test('skew-adjoint identity and pure-field closure detect recurrence sign',async()=>{
  const {a}=harness(),c=config([field('X',-1.05)]);
  const u=seed(),v=new Map([['0,0:2',.4],['0,0:1',.7]]);
  close(a.vdot(u,await a.applyLAsync(v,c.oneBody,[])),-a.vdot(await a.applyLAsync(u,c.oneBody,[]),v));
  const result=await sequence(a,c);assert.equal(result.bs.length,2);close(result.bs[0],2.1);assert.equal(result.bs[1],0);
  assert.ok(Math.max(...result.corrections)<1e-12,'large correction would hide a wrong recurrence');
});
test('tilted field has b1=2|hx|, b2=2|hz|, b3=0; commuting/zero H closes at b1',async()=>{
  const {a}=harness();
  const r=await sequence(a,config([field('X',-.7),field('Z',.3)]));
  assert.equal(r.bs.length,3);close(r.bs[0],1.4);close(r.bs[1],.6);assert.equal(r.bs[2],0);
  for(const c of [config(),config([field('Z',2)]),config([field('X',1),field('X',-1)])])
    assert.deepEqual((await sequence(a,c)).bs,[0]);
});
test('first three interacting-chain coefficients agree with independent dense full orthogonalization',async()=>{
  const {a}=harness(),c=config([field('X',-1.05),field('Z',-.5)],[bond(1,0,'Z','Z',-1)]);
  const sites=[[-2,0],[-1,0],[0,0],[1,0],[2,0]],h=denseH(c,sites),qs=[denseVec(a,seed(),sites)],expected=[];
  for(let i=0;i<3;i++){
    const r=denseL(h,qs[i]);
    for(let pass=0;pass<2;pass++)for(const q of qs)add(r,q,-denseDot(q,r));
    const b=Math.sqrt(denseDot(r,r));expected.push(b);qs.push(denseScale(r,1/b));
  }
  const actual=await sequence(a,c,3);actual.bs.forEach((b,i)=>close(b,expected[i]));
  close(actual.bs[1],Math.sqrt(9)); // 2 neighbours: 4*(2 J^2 + hz^2)
  for(let i=0;i<actual.qs.length;i++)for(let j=0;j<actual.qs.length;j++)close(a.vdot(actual.qs[i],actual.qs[j]),i===j?1:0);
  assert.ok(Math.max(...actual.corrections)<1e-12);
});
test('default 2D b2 removes the spurious 4*b1^2 contribution; moments match',async()=>{
  const {a}=harness(),p=a.PRESETS.mfi;
  const c=config(p.one.map(([op,coeff])=>({op,coeff})),p.two.map(([dx,dy,opA,opB,coeff])=>({dx,dy,opA,opB,coeff})));
  const r=await sequence(a,c,8);close(r.bs[0],2.1);close(r.bs[1],Math.sqrt(17));
  const pythonCorrected=[2.1,4.123105626,5.523000037,6.777935580,7.352418847,8.625357830,9.584443010,10.836412712];
  r.bs.forEach((value,i)=>assert.ok(Math.abs(value-pythonCorrected[i])<5.1e-10,'Python eight-step cross-check '+(i+1)));
  const lv=await a.applyLAsync(seed(),c.oneBody,c.twoBody),llv=await a.applyLAsync(lv,c.oneBody,c.twoBody);
  close(a.vnorm(llv)**2,r.bs[0]**4+r.bs[0]**2*r.bs[1]**2);
  console.log('default 2D b1..b8:',r.bs.map(v=>v.toFixed(10)).join(', '));
});
test('global energy scaling across sign and 400 orders of magnitude',async()=>{
  const {a}=harness();
  for(const scale of [-3,1e-200,1e200]){
    const r=await sequence(a,config([field('X',.7*scale),field('Z',.3*scale)]));
    close(r.bs[0]/Math.abs(scale),1.4);close(r.bs[1]/Math.abs(scale),.6);assert.equal(r.bs[2],0);
  }
  close(a.vnorm(new Map([['a',3e200],['b',4e200]]))/1e200,5);
  close(a.vnorm(new Map([['a',3e-200],['b',4e-200]]))/1e-200,5);
});
test('finite-window energy has boundary commutator at step one and K dependence',async()=>{
  const {a}=harness(),c=config([field('X',-.7)],[bond(1,0,'Z','Z',-1)]);
  const observed=[];
  for(const K of [2,5]){
    const v=a.buildDensitySeed(c.oneBody,c.twoBody,K,true),norm=a.vnorm(v);
    const lv=await a.applyLAsync(a.normalizeVector(v,norm),c.oneBody,c.twoBody);
    const expected=Math.sqrt(8*.7**2/((2*K+1)*.7**2+2*K));
    close(a.vnorm(lv),expected);observed.push(a.vnorm(lv));
    assert.equal(lv.size,2);
    for(const key of lv.keys())assert.ok(a.decodeKey(key).some(([x])=>Math.abs(x)>K));
  }
  assert.ok(observed[1]<observed[0]);
  assert.equal(a.buildDensitySeed([field('X',1),field('X',-1)],[],3,true).size,0);
});
test('input validation rejects blank/nonfinite/fractional/zero-offset rows',()=>{
  const {a}=harness();
  for(const c of [config([],[],{steps:NaN}),config([],[],{steps:1.2}),config([field('X',Infinity)]),
    config([],[bond(.5,0,'Z','Z',1)]),config([],[bond(0,0,'X','Y',1)]),config([],[],{seedType:'density',windowK:0})])
    assert.throws(()=>a.prepareModel(c));
  assert.doesNotThrow(()=>a.prepareModel(config()));
});
test('tiny and huge axis ranges produce bounded, finite tick lists',()=>{
  const {a}=harness();
  for(const hi of [1e-200,1e-12,2,1e200]){const ticks=a.niceTicks(0,hi,4);assert.ok(ticks.length>1&&ticks.length<10);assert.ok(ticks.every(Number.isFinite));}
});
test('stop before a step and during a long commutator publishes no partial vector',async()=>{
  let stopped=false,t=0;
  const {a}=harness({performance:{now:()=>t+=20},setTimeout:fn=>{stopped=true;queueMicrotask(fn);}});
  assert.equal(await a.applyLAsync(seed(),[field('X',1)],[],null,()=>true),null);
  const v=new Map(Array.from({length:600},(_,i)=>[i+',0:3',1]));
  assert.equal(await a.applyLAsync(v,[field('X',1)],[],null,()=>stopped),null);
});
test('run snapshots survive in-flight edits and language changes; invalid rerun preserves results',async()=>{
  const h=harness(),{a,node}=h,c=config([field('X',-.7),field('Z',.3)]);
  a.setConfig(c);
  const pending=a.run();
  c.oneBody[0].coeff=99;c.steps=15;a.markDirty();a.setLanguage('zh');a.renderRunSummary();
  await pending;
  const out=a.exportSnapshot();assert.equal(out.inputs.oneBody[0].coeff,-.7);assert.equal(out.inputs.steps,6);
  assert.equal(out.status,'closed');assert.equal(out.settingsChangedSinceStart,true);close(out.bn[0],1.4);
  assert.ok(node('status').textContent.includes('设置已修改'));assert.ok(node('provenance').textContent.includes('-0.7'));
  assert.ok(Object.isFrozen(out.inputs.oneBody[0]));
  a.setConfig(config([field('X',NaN)]));await a.run();assert.equal(a.exportSnapshot().startedAt,out.startedAt);
  assert.ok(node('status').className.includes('err'));assert.equal(a.running,false);
});
test('controller stop, zero-seed error and resource failure clean up and label retained data',async()=>{
  {
    const {a}=harness();a.setConfig(config([field('X',1)]));
    const pending=a.run();await a.run();await pending;
    assert.equal(a.exportSnapshot().status,'stopped');assert.equal(a.exportSnapshot().bn.length,0);assert.equal(a.running,false);
  }
  {
    const {a}=harness();a.setConfig(config([],[],{seedType:'density'}));await a.run();
    assert.equal(a.exportSnapshot().status,'error');assert.equal(a.exportSnapshot().bn.length,0);assert.equal(a.running,false);
  }
  {
    const {a,context,node}=harness();a.setConfig(config([field('X',1),field('Z',.2)]));
    vm.runInContext('const originalL=applyLAsync;let calls=0;applyLAsync=(...args)=>{if(++calls===2)throw new GrowthError("resource","test resource limit");return originalL(...args);};',context);
    await a.run();assert.equal(a.exportSnapshot().status,'resource');assert.equal(a.exportSnapshot().bn.length,1);
    assert.equal(a.running,false);assert.equal(node('prog').hidden,true);assert.equal(node('run').textContent,'Run');
  }
});
test('actual sparse-vector resource guard rejects an oversized commutator',async()=>{
  const {a}=harness();
  const input=new Map(Array.from({length:a.NUMERICS.maxStrings+1},(_,i)=>[i+',0:3',1]));
  await assert.rejects(a.applyLAsync(input,[field('X',1)],[]),error=>error.code==='resource');
});
test('representative eight-step run retains orthogonality against all earlier vectors',async()=>{
  const {a}=harness(),c=config([field('X',-1.05),field('Z',-.5)],[bond(1,0,'Z','Z',-1)],{steps:8});
  const r=await sequence(a,c);
  for(let i=0;i<r.qs.length;i++)for(let j=0;j<r.qs.length;j++)close(a.vdot(r.qs[i],r.qs[j]),i===j?1:0,1e-10);
});
test('bilingual interpretation and static document hooks remain consistent',()=>{
  const {a}=harness();assert.deepEqual(Object.keys(a.I18N.en).sort(),Object.keys(a.I18N.zh).sort());
  assert.ok(a.I18N.en.growthDef.includes('+b_n'));assert.ok(a.I18N.zh.growthDef.includes('+b_n'));
  assert.ok(!script.includes('ro_bound'));assert.ok(!script.includes('densityWindowK'));
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  for(const m of script.matchAll(/\$\("([^"]+)"\)/g))assert.ok(ids.includes(m[1]),'missing UI id '+m[1]);
});
