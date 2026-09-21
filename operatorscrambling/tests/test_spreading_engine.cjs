// Numerical unit tests only: no browser, DOM renderer, or network access.
const fs=require('node:fs'), vm=require('node:vm'), assert=require('node:assert/strict');
const path=require('node:path'), {spawnSync}=require('node:child_process');
const html=fs.readFileSync(path.join(__dirname,'../operator_spreading_lab.html'),'utf8');
const script=html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script); // Parse the entire app, without running its UI.
const ctx=vm.createContext({performance,DOMException,structuredClone,setTimeout:(f)=>setTimeout(f,0),curLang:'en'});
vm.runInContext(script.slice(script.indexOf('const OPS ='),script.indexOf('/* --------------------------------------------------------------- charting */'))+
  '\nthis.core={simulate,simulateStateVector,buildStateVectorGenerator,buildTerms,makeLattice,randomTypicalityState,computeFrontStats,matvec};',ctx);
const c=ctx.core;
const spec={lx:2,ly:2,bc:'obc',oneBody:[{op:'X',coeff:-1.05},{op:'Y',coeff:0.31},{op:'Z',coeff:-0.5}],
  twoBody:[{dx:1,dy:0,opA:'Z',opB:'Z',coeff:-1},{dx:0,dy:1,opA:'X',opB:'Y',coeff:0.27}],
  src:0,srcOp:'Y',probeOp:'X',tmax:0.8,nt:5,svSeed:0};
const close=(a,b,tol=1e-10)=>assert.ok(Math.abs(a-b)<tol,`${a} != ${b} (tol ${tol})`);

(async()=>{
  const one={...spec,lx:1,ly:1,oneBody:[{op:'X',coeff:0.7}],twoBody:[],srcOp:'Z',probeOp:'Z',nt:9};
  const a=await c.simulate(one),b=await c.simulateStateVector(one);
  for(let k=0;k<a.times.length;k++){
    close(a.mem[k],Math.cos(1.4*a.times[k]));
    close(a.site[0][k],4*Math.sin(1.4*a.times[k])**2);
    close(a.site[0][k],b.site[0][k]);
  }
  const mixed={...one,lx:2,bc:'pbc',oneBody:[],twoBody:[{dx:1,dy:0,opA:'X',opB:'Y',coeff:1}]};
  assert.equal(c.buildTerms(c.makeLattice(2,1,'pbc'),mixed).length,2,'Mixed XY directed bonds must both survive on a two-site ring');
  mixed.twoBody[0].opB='X';
  assert.equal(c.buildTerms(c.makeLattice(2,1,'pbc'),mixed).length,1,'Identical Pauli bonds are undirected');
  const exact=await c.simulate(spec), estimate=await c.simulateStateVector(spec);
  assert.equal(estimate.svSeed,0,'seed zero must remain reproducible');
  assert.ok(Number.isNaN(estimate.site[2][1]),'unmeasured site cannot inherit representative data');
  const d=2**(spec.lx*spec.ly), summed=exact.dists.map(()=>new Float64Array(spec.nt));
  for(let basis=0;basis<d;basis++){
    const state=new Float64Array(2*d);state[basis]=1;
    const r=await c.simulateStateVector(spec,()=>{},()=>false,state);
    r.dists.forEach((dist,q)=>r.cone.get(dist).forEach((v,k)=>summed[q][k]+=v/d));
  }
  exact.dists.forEach((dist,q)=>summed[q].forEach((v,k)=>close(v,exact.site[estimate.representatives[q].site][k])));
  // Independent dense oracle: explicit Pauli Kronecker products and SciPy expm.
  const oracle=String.raw`
import sys,json,numpy as np
from scipy.linalg import expm
data=json.load(sys.stdin); s=data['spec']; n=s['lx']*s['ly']; d=2**n
P={'I':np.eye(2),'X':np.array([[0,1],[1,0]]),'Y':np.array([[0,-1j],[1j,0]]),'Z':np.diag([1,-1])}
def product(ops):
    a=np.ones((1,1),complex)
    for j in reversed(range(n)): a=np.kron(a,P[ops.get(j,'I')])
    return a
H=np.zeros((d,d),complex)
for term in s['oneBody']:
    for j in range(n): H+=term['coeff']*product({j:term['op']})
for term in s['twoBody']:
    for y in range(s['ly']):
        for x in range(s['lx']):
            xx=x+term['dx']; yy=y+term['dy']
            if 0<=xx<s['lx'] and 0<=yy<s['ly']:
                H+=term['coeff']*product({x+s['lx']*y:term['opA'],xx+s['lx']*yy:term['opB']})
v=np.array(data['psi']); psi=v[:d]+1j*v[d:]; W=product({s['src']:s['srcOp']})
answer=[]
for t in data['times']:
    U=expm(-1j*H*t); Wt=U.conj().T@W@U
    vals=[]
    for j in data['sites']:
        V=product({j:s['probeOp']}); comm=Wt@V-V@Wt
        vals.append(float(np.vdot(comm@psi,comm@psi).real))
    answer.append({'C':vals,'mem':float(np.vdot(W@psi,Wt@psi).real)})
print(json.dumps(answer))
`;
  const py=spawnSync(process.env.OTOC_PYTHON||'/opt/anaconda3/bin/python',['-c',oracle],{
    input:JSON.stringify({spec,psi:Array.from(c.randomTypicalityState(d,0)),times:Array.from(estimate.times),sites:estimate.measuredSites}),encoding:'utf8',timeout:30000});
  assert.equal(py.status,0,py.stderr);
  const dense=JSON.parse(py.stdout);let error=0;
  dense.forEach((row,k)=>{
    close(row.mem,estimate.mem[k]);
    row.C.forEach((v,q)=>{const actual=estimate.site[estimate.measuredSites[q]][k];error=Math.max(error,Math.abs(actual-v));close(actual,v);});
  });
  assert.ok(estimate.normDrift<1e-10);
  const tiny=await c.simulate({...one,oneBody:[{op:'Z',coeff:1}],srcOp:'Z',probeOp:'X'});
  tiny.site[0].forEach(v=>close(v,4)); // conserved W can anticommute with V at the source
  await assert.rejects(c.simulate(spec,()=>{},()=>true),{name:'AbortError'});
  await assert.rejects(c.simulateStateVector(spec,()=>{},()=>true),{name:'AbortError'});
  await assert.rejects(c.simulate({...spec,oneBody:[{op:'X',coeff:Infinity}]}));
  const onlyOne=c.computeFrontStats([0,1],new Map([[0,[0,0]],[1,[0,1]]]),[0,1],1,2);
  assert.ok(Number.isNaN(onlyOne.vB),'one arrival is insufficient for velocity regression');
  assert.ok(Number.isNaN(onlyOne.std),'no sufficiently late post-arrival window should be invented');
  // Export provenance is independent of live editable state.
  vm.runInContext(script.slice(script.indexOf('function resultConfig('),script.indexOf('function exportText('))+'\nthis.makeConfig=resultConfig;',ctx);
  const coefficient=estimate.spec.oneBody[0].coeff;
  spec.oneBody[0].coeff=123;
  const cfg=ctx.makeConfig(estimate);
  assert.equal(cfg.one_body[0].coeff,coefficient);
  assert.equal(cfg.seed,0);assert.equal(cfg.spatial_sampling,'representative_per_shell');
  assert.ok(!('2' in cfg.curves.C_by_measured_site));
  assert.equal(cfg.integrator,'scaled_taylor');
  // Test the small-grid control regression as an ordinary pure controller unit.
  const controls=Object.fromEntries(Object.entries({engine:'statevec',lx:'3',ly:'3',bc:'obc',srcop:'Z',probeop:'Z',tmax:'2',nt:'6',svseed:'0',svrow:'',svhint:''}).map(([key,value])=>[key,{value}]));
  const controlCtx=vm.createContext({state:{src:0},$:id=>controls[id],syncResultView:()=>{}});
  vm.runInContext(script.slice(script.indexOf('function readInputs(){'),script.indexOf('/* Cheap, pre-run cost estimate'))+'\nreadInputs();',controlCtx);
  assert.equal(controlCtx.state.nt,6);assert.equal(controlCtx.state.svSeed,0);
  // Bilingual strings and DOM hooks must be complete, even without visual QA.
  const languageCtx=vm.createContext({});
  vm.runInContext(script.slice(script.indexOf('const I18N ='),script.indexOf('function applyLang(){'))+'\nthis.dict=I18N;',languageCtx);
  const markup=html.slice(0,html.indexOf('<script>'));
  for(const match of markup.matchAll(/data-i18n="([^"]+)"/g)) for(const lang of ['en','zh']) assert.ok(match[1] in languageCtx.dict[lang],`${lang} missing ${match[1]}`);
  const ids=[...markup.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length);
  for(const m of script.matchAll(/\$\(["']([^"']+)["']\)/g)) assert.ok(ids.includes(m[1]),`missing DOM hook ${m[1]}`);
  console.log(JSON.stringify({status:'PASS',checks:['analytic_single_spin','mixed_periodic_bonds','trace_basis_vs_pauli','scipy_dense_statevector','unmeasured_sites','seed_zero','conserved_anticommuting_probe','cancellation','invalid_input','one_shell_fit','late_window','immutable_export','time_grid_controls','bilingual_keys','DOM_hooks'],dense_max_error:error,norm_drift:estimate.normDrift}));
})().catch(e=>{console.error(e);process.exitCode=1;});
