/* ------------------------------------------------- a small TeX -> MathML
   Enough of LaTeX to typeset the formulas on this page, with no external
   library: sub/superscripts, fractions, roots, accents, greek, big operators,
   \left \right, text runs and spacing.  Output is native MathML, so it needs
   no stylesheet and no web fonts. */
const TEXSYM={alpha:"α",beta:"β",gamma:"γ",Gamma:"Γ",delta:"δ",Delta:"Δ",
 epsilon:"ε",varepsilon:"ε",zeta:"ζ",eta:"η",theta:"θ",Theta:"Θ",
 kappa:"κ",lambda:"λ",Lambda:"Λ",mu:"μ",nu:"ν",xi:"ξ",pi:"π",
 rho:"ρ",sigma:"σ",tau:"τ",phi:"φ",varphi:"φ",chi:"χ",psi:"ψ",
 omega:"ω",Omega:"Ω",hbar:"ℏ",ell:"ℓ",infty:"∞",partial:"∂"};
const TEXOP={sum:"∑",prod:"∏",int:"∫",times:"×",cdot:"⋅",cdots:"⋯",
 ldots:"…",approx:"≈",neq:"≠",leq:"≤",le:"≤",geq:"≥",ge:"≥",
 to:"→",mapsto:"↦",in:"∈",pm:"±",mp:"∓",propto:"∝",sim:"∼",
 simeq:"≃",equiv:"≡",perp:"⊥",dagger:"†",circ:"∘",otimes:"⊗",
 langle:"⟨",rangle:"⟩",lVert:"‖",rVert:"‖",nabla:"∇",ll:"≪",
 gg:"≫","{":"{","}":"}","|":"|",Sigma:"Σ"};
const TEXBIG={sum:1,prod:1,int:1};
const TEXNAME={Tr:"Tr",tr:"tr",exp:"exp",log:"log",ln:"ln",max:"max",min:"min",Re:"Re",Im:"Im",
 det:"det",sgn:"sgn"};
const TEXACC={dot:"˙",ddot:"¨",hat:"^",bar:"¯",tilde:"~",vec:"→"};
const TEXSPACE={",":"0.17em",";":"0.28em",":":"0.22em","!":"-0.17em"," ":"0.25em",
 quad:"1em",qquad:"2em"};
const TEXBB={R:"ℝ",C:"ℂ",N:"ℕ",Z:"ℤ",Q:"ℚ"};
const texEsc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

function texToMathML(src,mode){
  const disp = mode==="disp" || mode===true;          // display-style sums
  const tk=[]; let i=0;
  const RAW={text:1,mathrm:1,mathbf:1,mathsf:1,operatorname:1,mathbb:1};
  while(i<src.length){
    const c=src[i];
    if(c==="\\"){
      const m=/^\\([A-Za-z]+|[\s\S])/.exec(src.slice(i));
      const name=m[1]; i+=m[0].length;
      if(RAW[name]){
        while(src[i]===" ") i++;
        if(src[i]==="{"){ let d=1,j=i+1,t="";
          while(j<src.length){ const ch=src[j];
            if(ch==="{") d++; else if(ch==="}"){ d--; if(!d) break; }
            t+=ch; j++; }
          i=j+1; tk.push({t:"txt",v:t,k:name}); continue; }
      }
      tk.push({t:"cmd",v:name}); continue;
    }
    if(/\s/.test(c)){ i++; continue; }
    if(c==="{"||c==="}"||c==="_"||c==="^"){ tk.push({t:c}); i++; continue; }
    if(/[0-9]/.test(c)){ const m=/^[0-9]+(?:\.[0-9]+)?/.exec(src.slice(i));
      tk.push({t:"num",v:m[0]}); i+=m[0].length; continue; }
    if(/[A-Za-z]/.test(c)){ tk.push({t:"id",v:c}); i++; continue; }
    tk.push({t:"op",v:c}); i++;
  }

  let p=0, big=false;
  const wrap=a=>a.length===1?a[0]:"<mrow>"+a.join("")+"</mrow>";

  function atom(){
    const t=tk[p]; big=false;
    if(!t) return "";
    if(t.t==="{"){ p++; const inner=seq("}"); if(tk[p]&&tk[p].t==="}") p++;
      big=false; return wrap(inner); }
    if(t.t==="num"){ p++; return "<mn>"+t.v+"</mn>"; }
    if(t.t==="id"){ p++; return "<mi>"+t.v+"</mi>"; }
    if(t.t==="txt"){ p++;
      if(t.k==="text") return "<mtext>"+texEsc(t.v)+"</mtext>";
      if(t.k==="mathbb") return '<mi mathvariant="normal">'+texEsc(TEXBB[t.v]||t.v)+"</mi>";
      if(t.k==="mathbf") return '<mi mathvariant="bold">'+texEsc(t.v)+"</mi>";
      return '<mi mathvariant="normal">'+texEsc(t.v)+"</mi>"; }
    if(t.t==="op"){ p++; let v=t.v; if(v==="-") v="−";
      // bare fences never stretch in TeX; only \left ... \right do
      if("()[]|".indexOf(v)>=0) return '<mo stretchy="false">'+texEsc(v)+"</mo>";
      return "<mo>"+texEsc(v)+"</mo>"; }
    p++; const c=t.v;                                   // a command
    if(c==="frac"||c==="tfrac"||c==="dfrac"){ const a=atom(), b=atom();
      return "<mfrac>"+a+b+"</mfrac>"; }
    if(c==="sqrt") return "<msqrt>"+atom()+"</msqrt>";
    if(TEXACC[c]) return '<mover accent="true">'+atom()+"<mo>"+TEXACC[c]+"</mo></mover>";
    if(c==="left"){                                   // \left <d> ... \right <d>
      const d=tk[p]; p++;
      const open=(!d||d.v==="."||d.v===undefined)?"":'<mo stretchy="true">'+texEsc(d.v)+"</mo>";
      const inner=[];
      while(p<tk.length&&!(tk[p].t==="cmd"&&tk[p].v==="right")) inner.push(scripted());
      let close="";
      if(tk[p]&&tk[p].t==="cmd"&&tk[p].v==="right"){ p++;
        const e=tk[p]; p++;
        if(e&&e.v!=="."&&e.v!==undefined) close='<mo stretchy="true">'+texEsc(e.v)+"</mo>"; }
      big=false;
      return "<mrow>"+open+inner.join("")+close+"</mrow>"; }
    if(c==="right"){ p++; return ""; }                  // a stray \right
    if(c in TEXSPACE) return '<mspace width="'+TEXSPACE[c]+'"/>';
    if(TEXNAME[c]) return '<mi mathvariant="normal">'+TEXNAME[c]+"</mi>";
    if(TEXBIG[c]){ big=true;
      return '<mo largeop="true" movablelimits="false">'+TEXOP[c]+"</mo>"; }
    if(TEXOP[c]){ const v=TEXOP[c];
      if("{}|".indexOf(v)>=0) return '<mo stretchy="false" lspace="0" rspace="0">'+texEsc(v)+"</mo>";
      return "<mo>"+texEsc(v)+"</mo>"; }
    if(TEXSYM[c]) return "<mi>"+TEXSYM[c]+"</mi>";
    return "<mi>"+texEsc(c)+"</mi>";
  }
  function scripted(){
    const base=atom(), isBig=big;
    let sub=null, sup=null;
    while(tk[p]&&(tk[p].t==="_"||tk[p].t==="^")){
      const k=tk[p].t; p++; const a=atom();
      if(k==="_") sub=a; else sup=a;
    }
    const u=isBig&&disp;
    if(sub!==null&&sup!==null)
      return (u?"<munderover>":"<msubsup>")+base+sub+sup+(u?"</munderover>":"</msubsup>");
    if(sub!==null) return (u?"<munder>":"<msub>")+base+sub+(u?"</munder>":"</msub>");
    if(sup!==null) return (u?"<mover>":"<msup>")+base+sup+(u?"</mover>":"</msup>");
    return base;
  }
  function seq(stop){ const out=[];
    while(p<tk.length){ if(stop&&tk[p].t===stop) break; out.push(scripted()); }
    return out; }

  const body=wrap(seq(null));
  return '<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">'+
    (disp?'<mstyle displaystyle="true">'+body+"</mstyle>":body)+"</math>";
}
function tex(src,mode){ return texToMathML(src,mode); }
function renderMath(root){
  for(const n of (root||document).querySelectorAll(".tex")){
    if(n.dataset.mathDone) continue;
    n.innerHTML=texToMathML(n.textContent.trim(),n.classList.contains("disp")?"disp":"");
    n.dataset.mathDone="1";
  }
  nowrapPunct(root);
}
/* a formula and the punctuation right after it must never split across lines */
function nowrapPunct(root){
  for(const m of (root||document).querySelectorAll("math")){
    const host=m.closest(".tex")||m;
    const par=host.parentNode;
    if(!par||(par.classList&&par.classList.contains("nb"))) continue;
    const nx=host.nextSibling;
    if(!nx||nx.nodeType!==3) continue;
    const hit=/^[.,;:!?)\]]+/.exec(nx.nodeValue);
    if(!hit) continue;
    nx.nodeValue=nx.nodeValue.slice(hit[0].length);
    const w=document.createElement("span"); w.className="nb";
    par.insertBefore(w,host);
    w.appendChild(host);
    w.appendChild(document.createTextNode(hit[0]));
  }
}
/* subscripts inside SVG text, where MathML cannot go: "C_r(t)", "A_W(t)" */
function svgText(node,str){
  const parts=[]; let i=0;
  while(i<str.length){
    let j=str.indexOf("_",i);
    if(j<0){ parts.push([str.slice(i),0]); break; }
    if(j>i) parts.push([str.slice(i,j),0]);
    let k=j+1, sub;
    if(str[k]==="{"){ const e=str.indexOf("}",k); sub=str.slice(k+1,e); k=e+1; }
    else { sub=str[k]||""; k++; }
    parts.push([sub,1]); i=k;
  }
  let cur=0;
  for(const [txt,lvl] of parts){
    if(txt==="") continue;
    const a={};
    if(lvl!==cur){ a.dy=String((lvl-cur)*3); cur=lvl; }
    if(lvl) a["font-size"]="8.5";
    node.appendChild(el("tspan",a,txt));
  }
  return node;
}

/* ------------------------------------------------------------- EN / ZH i18n
   Every [data-i18n] element in the markup gets its innerHTML replaced from
   this table on load and whenever the language button is pressed. Math
   (".tex" spans) is written once, in LaTeX, and reused unchanged in both
   languages — only the prose around it changes — then re-typeset by
   renderMath() after the swap. */
const I18N = {
en: {
  eyebrow:"Quantum operator dynamics · computed locally",
  title:"Operator Spreading Lab",
  lede:"Explore Pauli-spin Hamiltonians on rectangular lattices. Choose full-trace operator evolution or a random-state trace estimate; each result states its method and measured sites.",
  title1d:"1D Operator Spreading Lab", title2d:"2D Operator Spreading Lab",
  lede1d:"Explore operator spreading along Pauli-spin chains, from integrable benchmarks to reproducible on-site disorder.",
  lede2d:"Explore direction-dependent operator spreading on rectangular Pauli-spin lattices, with reproducible on-site disorder.",
  switch1d:"← 1D", switch2d:"2D →",
  themeBtn:"◐ theme", runBtn:"Run", stopBtn:"Stop", growthLink:"Operator growth explorer →",
  downloadCfgBtn:"Download run JSON", downloadCsvBtn:"Download CSV",
  setupModel:"Set up the model", presetLabel:"Preset",
  opt_mfi2d:"2D mixed-field Ising (h_x near h_c)", opt_tfim2d:"2D transverse-field Ising",
  opt_mfi1d:"1D mixed-field chain", opt_tfim1d:"1D TFIM (integrable)",
  opt_xxz1d:"1D XXZ + next-nearest ZZ (U(1))", opt_heis1d:"1D Heisenberg",
  opt_xxz2d:"2D XXZ + diagonal ZZ (U(1))", opt_heis2d:"2D Heisenberg",
  opt_custom:"General spin model (your own terms)",
  engineLabel:"Engine",
  opt_engine_pauli:"Exact operator-space (&le;9 sites, every distance in one run)",
  opt_engine_statevec:"State-vector trace estimate (≤16 sites, one representative per distance)",
  svSeedLabel:"Typicality seed",
  svHint:"One random state and one representative per distance. These are not full-shell averages. Change the seed to assess sample variation; a single sample provides no error bar. Start with 6–12 output times.",
  disorderSub:"On-site disorder", disorderModeLabel:"Distribution", disorderOpLabel:"axis",
  disorderStrengthLabel:"scale Δ / σ", disorderSeedLabel:"disorder seed",
  opt_disorder_none:"off", opt_disorder_uniform:"uniform [−Δ,Δ]",
  opt_disorder_gaussian:"Gaussian N(0,σ²)", opt_disorder_binary:"binary ±Δ",
  generateDisorderBtn:"Generate new realization",
  disorderHint:"Choose a distribution and scale. The seed fixes the complete site-by-site realization; Generate advances to a new reproducible seed.",
  latticeSub:"Lattice", boundaryLabel:"Boundary", opt_obc:"open", opt_pbc:"periodic",
  probeTimeSub:"Probe and time window",
  srcLabel:'Source <span class="tex">W</span>', srcXLabel:"Source x", srcYLabel:"Source y", probeLabel:'Probe <span class="tex">V</span>',
  tmaxLabel:'<span class="tex">t</span> max', ntLabel:"time points",
  hint1:"Operators are Pauli matrices (eigenvalues ±1), not spin matrices σ/2; ℏ=1. Set the one-based source x/y coordinates here or click a lattice site; both controls stay synchronized. The plot legend identifies the evaluated sites.",
  hint1d:"Operators are Pauli matrices (eigenvalues ±1), not spin matrices σ/2; ℏ=1. Enter the one-based source position x or click a chain site; both controls stay synchronized.",
  oneBodyLabel:'One-body &nbsp;<span class="dim tex">h^{\\alpha}\\sum_i S^{\\alpha}_i</span>',
  addTermBtn:"+ term", opHeader:"op", coeffHeader:"coefficient",
  twoBodyLabel:'Two-body &nbsp;<span class="dim tex">J^{\\alpha\\beta}\\sum_i S^{\\alpha}_i S^{\\beta}_{i+\\delta}</span>',
  latticePanel:"Lattice", latLegendTitle:"Interaction legend", readoutPanel:"Readout",
  lightConePanel:"Light cone", opt_site:"every site (numbered)", opt_shell:"shell average (by distance)",
  coneDef:'<span class="tex disp">C_r(t)=2^{-N}\\,\\mathrm{Tr}\\!\\left[W(t),V_r\\right]^{\\dagger}\\!\\left[W(t),V_r\\right]=4\\sum_{\\{S,V_r\\}=0}a_S(t)^2</span>',
  coneDefNote:"The squared commutator lies in [0,4] for normalized Pauli operators. C=0 means commutation; C=2 is a common scrambling reference, not sufficient evidence of chaos or a guaranteed plateau.",
  localMemoryPanel:"Local memory",
  memDef:'<span class="tex disp">A_W(t)=2^{-N}\\,\\mathrm{Tr}\\!\\left[W\\,W(t)\\right]=a_W(t)</span>',
  memDefNote:"Local autocorrelation starts at 1. Finite systems can oscillate or retain memory through several conserved quantities; convergence to zero or to the energy contribution alone is not guaranteed.",
  rawWord:"raw", projWord:"energy contribution removed",
  detailsSummary1:"What you can set, and what comes out",
  inputsHeader:"Inputs", thControl:"Control", thWhatItSets:"What it sets", thRange:"Range",
  in1n:"Preset",
  in1d:`Loads a complete model in one click. It is only a starting point: the moment you change a
    coefficient, an operator or an offset, the label switches to <em>General spin model</em>, so it can
    never claim &ldquo;Ising&rdquo; for something you have since edited. Edit the terms back and the
    original name returns.`,
  in1r:"6 built-ins + custom",
  in2n:'<span class="tex">L_x</span>, <span class="tex">L_y</span>, boundary',
  in2d:"Rectangular lattice with open or periodic boundaries. Equal-Pauli bonds are undirected and deduplicated; mixed-Pauli interactions retain orientation.",
  in3n:"One-body terms",
  in3d:`<span class="tex">h^{\\alpha}\\sum_i S^{\\alpha}_i</span> — a uniform field, one row per Pauli
    direction. Several rows may use the same direction; they add.`,
  in4n:"Two-body terms",
  in4d:`<span class="tex">J^{\\alpha\\beta}\\sum_i S^{\\alpha}_i S^{\\beta}_{i+\\delta}</span> — a coupling at
    <em>any</em> lattice offset, so nearest, next-nearest <span class="tex">(1,1)</span>, third-neighbour
    <span class="tex">(2,0)</span> and anisotropic couplings are all just rows.
    <span class="tex">\\alpha</span> and <span class="tex">\\beta</span> are independent, so
    <span class="tex">X_iZ_j</span> is as easy as <span class="tex">Z_iZ_j</span>. Several rows may share
    one offset — that is how XXZ and Heisenberg are built, and the lattice draws them as parallel strands.`,
  in5n:"Source site",
  in5d:`Every lattice site is numbered 1&ndash;<span class="tex">N</span>
    right inside its circle; click one or enter its one-based x/y coordinates to make it the source (the source's circle fills in and gets a
    white number). Under open boundaries the corner and the centre give different shell structures,
    which is itself a useful check. Switch the light-cone view below to &ldquo;every site&rdquo; to see
    each numbered site's own OTOC curve rather than the shell average.`,
  in5r:"any site",
  in6n:'Source <span class="tex">W</span>',
  in6d:"The operator that spreads. It sits on the source site and defines both the light cone and the local memory curve.",
  in7n:'Probe <span class="tex">V</span>',
  in7d:`The operator the commutator is taken against, placed on <em>every</em> site in turn. It is chosen
    independently of <span class="tex">W</span>: <span class="tex">W=Z</span> with
    <span class="tex">V=X</span> is a different and perfectly valid measurement, and then
    <span class="tex">C_0(0)=4</span> because the two anticommute on the shared site.`,
  in8n:'<span class="tex">t</span> max, time points',
  in8d:"Output times are sampled from numerical evolution with internally controlled substeps. Arrival-time interpolation and late-window statistics can still depend strongly on grid spacing.",
  in8r:"up to 600 points",
  in9n:"On-site disorder", in9d:"Adds an independent seeded random field to each site. The realized site coefficients, not only the seed, are stored in JSON exports.",
  in9r:"uniform · Gaussian · binary",
  outputsHeader:"Outputs", thQuantity:"Quantity", thMeaning:"Meaning", thWhere:"Where",
  out1d:"Full-shell mean in operator mode; one representative site per distance in random-state mode. These spatial samplings are explicitly distinguished.",
  whereChartCsv:"chart · CSV",
  out2d:"Exploratory C=0.5 arrival fit on at least two distances. This finite-size estimate is not a certified butterfly velocity in the thermodynamic limit.",
  whereReadout:"readout",
  out3d:'The arrival time of each shell, <span class="tex">C_r(t_r)=0.5</span> — the raw numbers behind the fit, so you can see whether the fit is honest.',
  whereJson:"JSON",
  out4d:"Standard deviation in the outermost-distance data after its measured C=0.5 arrival plus 2 time units. If the window has fewer than two points, it is undefined. It is not a standalone chaos/integrability test.",
  whereReadoutJson:"readout · JSON",
  out5d:"Mean of the same post-arrival window; undefined if no such window is sampled.",
  out6d:"Source autocorrelation, and the curve after subtracting its projection onto conserved H. Other conserved contributions may remain.",
  out7d:"Projection onto H computed from its Pauli coefficients. This is not generally the entire late-time plateau.",
  out8d:'Escape rate, the exact short-time curvature of <span class="tex">A_W</span>.',
  out9n:"Sector size",
  out9d:"Reachable Pauli-sector size or Hilbert-space dimension, sparse-generator nonzeros, and elapsed time, depending on the selected engine.",
  whereReadoutStatus:"readout · status",
  out10n:"Norm drift",
  out10d:"Maximum observed norm drift of operator coefficients or propagated states. Small drift is necessary but not sufficient for accuracy and does not measure sampling error.",
  whereStatus:"status",
  out11n:"Shells",
  out11d:"Geometric membership of each distance shell. In representative mode only one listed site is measured, regardless of shell size.",
  noteWarn1:`<strong>What this page does not give you.</strong> Everything here
    is at infinite temperature (a normalised trace, no thermal weighting) and everything is an
    <em>operator</em> diagnostic. There is no entanglement entropy, no level statistics or spectral form factor,
    no charge or energy correlator <span class="tex">G(r,t)</span>, and no finite-temperature OTOC. Those need
    the state-vector side, which is what the Python package is for.`,
  detailsSummary2:"How it computes this, and where it stops",
  how1:"Expand a Hermitian operator in the Hermitian Pauli basis:",
  how2:`Unitary conjugation preserves the Hilbert&ndash;Schmidt norm and keeps every coefficient real, so the
    Heisenberg equation is a norm-preserving linear flow on the coefficient vector,`,
  how3:"Operator mode builds the reachable Pauli sector and evolves its sparse generator with a scaled Taylor series. State-vector mode uses the same Hamiltonian and Taylor propagation to estimate the trace with one random state. Norm drift checks integration, not sampling error.",
  how4:"These identities define the observables. Operator mode evaluates the full trace; state-vector mode estimates it. The front-speed diagnostic is a fit.",
  tagOtoc:"OTOC",
  eqnote1:`A linear functional of the operator-space probabilities <span class="tex">a_S(t)^2</span>
    alone: the sum runs over the Pauli strings that anticommute with the probe, and it saturates at
    <span class="tex">C_r=2</span> once half the weight sits there.`,
  tagMemory:"memory",
  eqnote2:'The local autocorrelation <em>is</em> the surviving amplitude on the source string &mdash; no separate calculation.',
  tagPlateau:"energy projection",
  eqnote3:"P_H is the nondecaying contribution from the projection of W onto H. Other conserved operators and degeneracies can contribute; subtracting P_H does not project out all conserved memory.",
  how5:"The escape rate in the readout is the exact short-time curvature of that same memory curve:",
  limits:"Operator mode is limited to 9 sites; random-state mode to 16, with costs depending strongly on terms and time range. Stop cancels an active calculation. Front speed is an exploratory C=0.5 arrival fit requiring at least two shells with positive fitted slope; examine threshold, time-grid, sampling and size dependence.",
  biggerMachineH2:"Take it to a bigger machine",
  biggerMachineP:"The Python scripts under otoc16/ implement state-vector and operator-space methods. Use the exported Hamiltonian coefficients and site convention when comparing results. The accompanying audit records which historical results require recomputation.",
  biggerMachineNoteLead:"The methods below answer different questions and have different error sources:",
  biggerMachineList:"<li><strong>State-vector typicality:</strong> numerical quantum evolution with a sampled trace. Representative-site data must not be presented as full-shell averages.</li><li><strong>Classical tangent / DTWA:</strong> a semiclassical approximation. Small-torus versus large-lattice comparisons do not establish a rigorous bound or a transferable multiplicative correction.</li><li><strong>Operator-space Lanczos:</strong> finite-order coefficients on an unbounded lattice. A finite sequence does not establish the asymptotic slope or a certified Lyapunov bound. See the growth explorer and audit.</li>",
  copyCfgBtn:"Copy configuration", copyCsvBtn:"Copy curves as CSV",
},
zh: {
  eyebrow:"量子算符动力学 · 本地计算",
  title:"算符扩散实验室",
  lede:"在矩形格点上探索 Pauli 自旋模型。可选全迹算符演化或随机态迹估计；结果会标出所用方法与实际计算的格点。",
  title1d:"一维算符扩散实验室", title2d:"二维算符扩散实验室",
  lede1d:"在 Pauli 自旋链上研究算符扩散：从可积基准到可复现的逐格点无序。",
  lede2d:"在矩形 Pauli 自旋格点上研究有方向性的算符扩散，并加入可复现的逐格点无序。",
  switch1d:"← 一维", switch2d:"二维 →",
  themeBtn:"◐ 主题", runBtn:"运行", stopBtn:"停止", growthLink:"算符增长探索 →",
  downloadCfgBtn:"下载本次运行 JSON", downloadCsvBtn:"下载曲线 CSV",
  setupModel:"设置模型", presetLabel:"预设",
  opt_mfi2d:"二维混合场伊辛模型 (h_x 接近 h_c)", opt_tfim2d:"二维横场伊辛模型",
  opt_mfi1d:"一维混合场链", opt_tfim1d:"一维横场伊辛链 (可积)",
  opt_xxz1d:"一维 XXZ + 次近邻 ZZ (U(1))", opt_heis1d:"一维海森堡模型",
  opt_xxz2d:"二维 XXZ + 对角 ZZ (U(1))", opt_heis2d:"二维海森堡模型",
  opt_custom:"通用自旋模型 (自定义项)",
  engineLabel:"引擎",
  opt_engine_pauli:"精确算符空间 (&le;9 个格点，一次运行拿到所有距离)",
  opt_engine_statevec:"态矢量迹估计（≤16 格点，每个距离一个代表点）",
  svSeedLabel:"Typicality 随机种子",
  svHint:"每次使用一个随机态，每个距离选一个代表点，并非整个壳层的平均。换种子可检查采样波动；单样本无法给出误差条。建议先用 6–12 个时间点。",
  disorderSub:"逐格点无序", disorderModeLabel:"分布", disorderOpLabel:"方向",
  disorderStrengthLabel:"尺度 Δ / σ", disorderSeedLabel:"无序种子",
  opt_disorder_none:"关闭", opt_disorder_uniform:"均匀分布 [−Δ,Δ]",
  opt_disorder_gaussian:"高斯分布 N(0,σ²)", opt_disorder_binary:"二元分布 ±Δ",
  generateDisorderBtn:"一键生成新 realization",
  disorderHint:"选择分布和尺度；种子唯一确定整组逐格点系数。“一键生成”会切换到新的、仍可复现的种子。",
  latticeSub:"格点", boundaryLabel:"边界条件", opt_obc:"开边界", opt_pbc:"周期边界",
  probeTimeSub:"探测算符与时间窗口",
  srcLabel:'源算符 <span class="tex">W</span>', srcXLabel:"源点 x", srcYLabel:"源点 y", probeLabel:'探测算符 <span class="tex">V</span>',
  tmaxLabel:'<span class="tex">t</span> 上限', ntLabel:"时间点数",
  hint1:"算符采用 Pauli 矩阵（本征值 ±1），不是 σ/2；取 ℏ=1。可输入从 1 开始的源点 x/y 坐标，或直接点击格点；两处会保持同步。曲线图例标明实际计算的格点。",
  hint1d:"算符采用 Pauli 矩阵（本征值 ±1），不是 σ/2；取 ℏ=1。可输入从 1 开始的链上位置 x，或直接点击链上的格点；两处会保持同步。",
  oneBodyLabel:'单体项 &nbsp;<span class="dim tex">h^{\\alpha}\\sum_i S^{\\alpha}_i</span>',
  addTermBtn:"+ 添加一项", opHeader:"算符", coeffHeader:"系数",
  twoBodyLabel:'两体项 &nbsp;<span class="dim tex">J^{\\alpha\\beta}\\sum_i S^{\\alpha}_i S^{\\beta}_{i+\\delta}</span>',
  latticePanel:"格点图", latLegendTitle:"相互作用图例", readoutPanel:"数值读出",
  lightConePanel:"Light cone (光锥)", opt_site:"每个格点 (按编号)", opt_shell:"按距离壳层平均",
  coneDef:'<span class="tex disp">C_r(t)=2^{-N}\\,\\mathrm{Tr}\\!\\left[W(t),V_r\\right]^{\\dagger}\\!\\left[W(t),V_r\\right]=4\\sum_{\\{S,V_r\\}=0}a_S(t)^2</span>',
  coneDefNote:"归一化 Pauli 算符的平方对易子范围为 [0,4]。C=0 表示对易；C=2 是常用打乱参考值，不能单独证明混沌，也不是保证达到的平台。",
  localMemoryPanel:"Local memory (局域记忆)",
  memDef:'<span class="tex disp">A_W(t)=2^{-N}\\,\\mathrm{Tr}\\!\\left[W\\,W(t)\\right]=a_W(t)</span>',
  memDefNote:"局域自关联从 1 出发。有限系统可持续振荡，也可通过多个守恒量保留记忆；不保证趋于零或仅趋于能量投影贡献。",
  rawWord:"原始", projWord:"扣除能量投影贡献",
  detailsSummary1:"可以设置什么，会得到什么",
  inputsHeader:"输入", thControl:"控件", thWhatItSets:"作用", thRange:"取值范围",
  in1n:"预设",
  in1d:`一键载入一个完整模型。这只是一个起点：一旦你改动了某个系数、算符方向或偏移量，标签就会立刻切换为
    <em>通用自旋模型</em>，这样它就永远不会把你已经改过的东西还叫做&ldquo;伊辛模型&rdquo;。把参数改回去，
    原来的名字也会自动恢复。`,
  in1r:"6 个内置预设 + 自定义",
  in2n:'<span class="tex">L_x</span>、<span class="tex">L_y</span>、边界条件',
  in2d:"矩形格点，可选开边界或周期边界。同 Pauli 耦合按无向键去重；混合 Pauli 耦合保留方向。",
  in3n:"单体项",
  in3d:'<span class="tex">h^{\\alpha}\\sum_i S^{\\alpha}_i</span> —— 一个均匀外场，每种 Pauli 方向占一行；多行用同一方向时会直接相加。',
  in4n:"两体项",
  in4d:`<span class="tex">J^{\\alpha\\beta}\\sum_i S^{\\alpha}_i S^{\\beta}_{i+\\delta}</span> —— 任意格点偏移量上的
    耦合，所以最近邻、次近邻 <span class="tex">(1,1)</span>、第三近邻 <span class="tex">(2,0)</span>
    以及各向异性耦合都只是普通的一行。<span class="tex">\\alpha</span> 和 <span class="tex">\\beta</span>
    彼此独立，所以 <span class="tex">X_iZ_j</span> 和 <span class="tex">Z_iZ_j</span> 一样容易设置。多行可以共用
    同一个偏移量——XXZ 模型和海森堡模型正是这样搭出来的，格点图里会把它们画成并排的几条线。`,
  in5n:"源点",
  in5d:`格点上每个点都编了号，从 1 到 <span class="tex">N</span>，直接标在圆圈里面；点击其中一个或输入从 1 开始的 x/y 坐标即可把它设为源点
    （源点的圆圈会填色，编号变成白色）。在开边界条件下，角上的点和中心的点会给出不同的壳层结构，这本身就是一个很好的检验。
    把下面 light cone 视图切到&ldquo;每个格点&rdquo;，就能看到每个编号点各自的 OTOC 曲线，而不只是按距离平均的曲线。`,
  in5r:"任意格点",
  in6n:'源算符 <span class="tex">W</span>',
  in6d:"会扩散出去的那个算符。它一开始就在源点上，同时决定了 light cone 图和 local memory 曲线。",
  in7n:'探测算符 <span class="tex">V</span>',
  in7d:`对易子的另一方，会依次放到<em>每一个</em>格点上。它和 <span class="tex">W</span> 的选取彼此独立：
    <span class="tex">W=Z</span> 配 <span class="tex">V=X</span> 是完全不同、同样有效的一种测量方式，
    这时因为二者在同一个格点上反对易，<span class="tex">C_0(0)=4</span>。`,
  in8n:'<span class="tex">t</span> 上限、时间点数',
  in8d:"演化使用内部控制的子步；输出时间网格仍会影响到达时间插值和晚时窗口统计，必须检查网格收敛。",
  in8r:"最多 600 个点",
  in9n:"逐格点无序", in9d:"给每个格点加入独立、带种子的随机场。JSON 不只保存种子，也保存本次实际生成的每个格点系数。",
  in9r:"均匀 · 高斯 · 二元分布",
  outputsHeader:"输出", thQuantity:"量", thMeaning:"含义", thWhere:"在哪里能看到",
  out1d:"算符模式给出全壳层平均；随机态模式每个距离只取一个代表点。界面与导出明确区分两种空间采样。",
  whereChartCsv:"图表 · CSV",
  out2d:"对至少两个距离的 C=0.5 到达时间做探索性拟合。此有限尺寸估计不是经认证的热力学极限蝴蝶速度。",
  whereReadout:"读数",
  out3d:'每个壳层的到达时间，定义为 <span class="tex">C_r(t_r)=0.5</span> —— 这是拟合背后的原始数字，方便你判断拟合是否可信。',
  whereJson:"JSON",
  out4d:"最远距离数据实际到达 C=0.5 后再等 2 个时间单位，在剩余窗口内算标准差；少于两个点时不定义。它不能单独判别混沌或可积性。",
  whereReadoutJson:"读数 · JSON",
  out5d:"同一前沿后时间窗口的均值；没有采到该窗口时不定义。",
  out6d:"源算符自关联，以及扣除它在守恒 H 方向上的投影贡献后的曲线；仍可能保留其他守恒贡献。",
  out7d:"由 H 的 Pauli 系数算出的能量投影贡献，一般不等于完整晚时平台。",
  out8d:'逃逸率，即 <span class="tex">A_W</span> 在短时极限下的精确曲率。',
  out9n:"扇区大小",
  out9d:"按所选引擎显示可达 Pauli 扇区大小或希尔伯特维度、稀疏生成元非零项数与运行时间。",
  whereReadoutStatus:"读数 · 状态栏",
  out10n:"范数漂移",
  out10d:"算符系数或传播态的最大观测范数漂移。小漂移是必要而非充分条件，不衡量采样误差。",
  whereStatus:"状态栏",
  out11n:"壳层",
  out11d:"每个距离壳层的几何格点列表。在代表点模式下，无论壳层有多大，都只测其中一个格点。",
  noteWarn1:`<strong>这个页面给不了什么。</strong>这里的一切都是在无穷温度下（归一化的迹，没有热权重）计算的，
    而且全部是<em>算符</em>层面的诊断量。这里没有纠缠熵、没有能级统计或谱形式因子、没有电荷或能量关联函数
    <span class="tex">G(r,t)</span>，也没有有限温度下的 OTOC。这些都需要态矢量那一侧的方法，
    也正是 Python 包存在的意义。`,
  detailsSummary2:"具体是怎么算的，又在哪里止步",
  how1:"把一个厄米算符在厄米 Pauli 基下展开：",
  how2:"幺正共轭变换保持 Hilbert–Schmidt 范数不变，并且让每个系数保持实数，所以 Heisenberg 方程就是系数向量上的一个保范线性流：",
  how3:"算符模式构建可达 Pauli 扇区，以缩放 Taylor 级数演化稀疏生成元。态矢量模式使用同一哈密顿量和 Taylor 传播，以一个随机态估计迹。范数漂移检查积分误差，不检查采样误差。",
  how4:"下列恒等式定义观测量。算符模式求全迹，态矢量模式估计迹；前沿速度则来自拟合。",
  tagOtoc:"OTOC",
  eqnote1:`这只是算符空间概率 <span class="tex">a_S(t)^2</span> 的一个线性泛函：求和跑遍所有与探测算符反对易的
    Pauli 串，一旦这些串占了一半权重，取值就会饱和在 <span class="tex">C_r=2</span>。`,
  tagMemory:"记忆",
  eqnote2:"局域自关联<em>就是</em>留在源字符串上的振幅——不需要另外计算。",
  tagPlateau:"能量投影",
  eqnote3:"P_H 是 W 投影到 H 上产生的不衰减贡献。其他守恒算符和简并也可贡献记忆；扣除 P_H 不等于扣除了所有守恒部分。",
  how5:"读数里的逃逸率，就是同一条记忆曲线在短时极限下的精确曲率：",
  limits:"算符模式上限 9 格点，随机态模式上限 16 格点；代价还取决于耦合项及时间范围。可点击停止取消计算。前沿速度只是 C=0.5 到达时间的探索性拟合，需要至少两个壳层和正斜率；须检查阈值、时间网格、采样及尺寸依赖。",
  biggerMachineH2:"换一台更大的机器",
  biggerMachineP:"otoc16/ 中包含态矢量和算符空间方法。对照结果时应一致使用导出中的哈密顿量系数和格点约定；随附核验报告标明哪些历史结果需要重算。",
  biggerMachineNoteLead:"以下方法回答不同问题，也有不同误差来源：",
  biggerMachineList:"<li><strong>态矢量 typicality：</strong>量子数值演化配合随机态迹估计。代表点结果不能标成全壳层平均。</li><li><strong>经典切向 / DTWA：</strong>半经典近似。小环面和大格点的比较不能建立严格界，也不能证明一个通用的乘法修正系数。</li><li><strong>算符空间 Lanczos：</strong>计算无界格点上的有限阶系数；有限序列不能确定渐近斜率或认证李雅普诺夫上界。见增长页面和核验报告。</li>",
  copyCfgBtn:"复制配置", copyCsvBtn:"复制曲线数据为 CSV",
},
};
const PAGE_DIMENSION=document.documentElement.dataset.dimension==="1d"?"1d":"2d";
let curLang = "en";
function applyLang(){
  const T=I18N[curLang];
  T.title=PAGE_DIMENSION==="1d"?T.title1d:T.title2d;
  T.lede=PAGE_DIMENSION==="1d"?T.lede1d:T.lede2d;
  if(PAGE_DIMENSION==="1d") T.hint1=T.hint1d;
  document.documentElement.lang = curLang==="zh" ? "zh-CN" : "en";
  for(const n of document.querySelectorAll("[data-i18n]")){
    const key=n.dataset.i18n;
    if(!(key in T)) continue;
    n.innerHTML=T[key];   // fresh HTML → fresh, not-yet-typeset .tex spans inside it
  }
  const lb=$("lang"); if(lb) lb.textContent = curLang==="en" ? "中文" : "EN";
  const dl=$("dimensionLink");
  if(dl){
    dl.href=PAGE_DIMENSION==="1d"?"operator_spreading_2d.html":"operator_spreading_1d.html";
    dl.textContent=PAGE_DIMENSION==="1d"?T.switch2d:T.switch1d;
  }
  document.title=T.title;
  renderMath(document);
}

"use strict";
/* ------------------------------------------------------------------ Pauli */
const OPS = ["I","X","Y","Z"];
// PROD[a][b] = [k, c] meaning  a*b = i^k * c
const PROD = (() => {
  const P = Array.from({length:4},()=>Array.from({length:4},()=>[0,0]));
  for(let a=0;a<4;a++){ P[0][a]=[0,a]; P[a][0]=[0,a]; P[a][a]=[0,0]; }
  const t=[[1,2,1,3],[2,1,3,3],[2,3,1,1],[3,2,3,1],[3,1,1,2],[1,3,3,2]];
  for(const [a,b,k,c] of t) P[a][b]=[k,c];
  return P;
})();
const digit = (code,site,n) => (code >> (2*(n-1-site))) & 3;
function encode(dig){ let c=0; for(const d of dig) c=c*4+d; return c; }

function anticommutes(p,s,n){
  let cl=0;
  for(let i=0;i<n;i++){ const a=digit(p,i,n), b=digit(s,i,n); if(a&&b&&a!==b) cl^=1; }
  return cl===1;
}
function mulCode(p,s,n){
  let k=0,c=0;
  for(let i=0;i<n;i++){ const [kk,cc]=PROD[digit(p,i,n)][digit(s,i,n)]; k+=kk; c=c*4+cc; }
  return [k&3,c];
}
function codeToStr(code,n){ let s=""; for(let i=0;i<n;i++) s+=OPS[digit(code,i,n)]; return s; }

/* ---------------------------------------------------------------- lattice */
function makeLattice(lx,ly,bc){
  const n=lx*ly;
  const idx=(x,y)=>{ if(bc==="pbc"){x=((x%lx)+lx)%lx; y=((y%ly)+ly)%ly;}
    return (x<0||x>=lx||y<0||y>=ly)? -1 : x+lx*y; };
  const coords=i=>[i%lx, Math.floor(i/lx)];
  const dist=(i,j)=>{ const [xi,yi]=coords(i),[xj,yj]=coords(j);
    let dx=Math.abs(xi-xj),dy=Math.abs(yi-yj);
    if(bc==="pbc"){ dx=Math.min(dx,lx-dx); dy=Math.min(dy,ly-dy); }
    return dx+dy; };
  // bonds for one offset, deduplicated (wrapping can revisit a pair)
  const bonds=(dx,dy,directed=false)=>{
    const seen=new Set(), out=[];
    for(let y=0;y<ly;y++) for(let x=0;x<lx;x++){
      const i=idx(x,y), j=idx(x+dx,y+dy);
      if(i<0||j<0||i===j) continue;
      const key=directed?i*n+j:(i<j?i*n+j:j*n+i);
      if(seen.has(key)) continue;
      seen.add(key); out.push([i,j]);
    }
    return out;
  };
  return {lx,ly,bc,n,idx,coords,dist,bonds};
}

/* ------------------------------------------------- Hamiltonian as Paulis */
function generateSiteDisorder(n,op,strength,seed,distribution="uniform"){
  let s=seed>>>0;
  const rnd=()=>{ s=(Math.imul(s,1664525)+1013904223)>>>0; return s/4294967296; };
  const out=[];
  for(let site=0;site<n;site++){
    let coeff;
    if(distribution==="gaussian"){
      const u1=Math.max(rnd(),1e-12),u2=rnd();
      coeff=strength*Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
    }else if(distribution==="binary"){
      coeff=(rnd()<.5?-1:1)*strength;
    }else{
      coeff=(2*rnd()-1)*strength;
    }
    out.push({site,op,coeff:Math.abs(coeff)<1e-15?0:coeff});
  }
  return out;
}
function buildTerms(lat,spec){
  const n=lat.n, map=new Map();
  const add=(code,c)=>{ if(!c) return; map.set(code,(map.get(code)||0)+c); };
  for(const t of spec.oneBody){
    const o=OPS.indexOf(t.op); if(o<1||!t.coeff) continue;
    for(let i=0;i<n;i++){ const d=new Array(n).fill(0); d[i]=o; add(encode(d),t.coeff); }
  }
  // Site-resolved fields are deliberately separate from uniform one-body rows:
  // one coefficient acts on exactly one site and is never translated.
  for(const t of (spec.siteBody||[])){
    const o=OPS.indexOf(t.op);
    if(o<1||!t.coeff||!Number.isInteger(t.site)||t.site<0||t.site>=n) continue;
    const d=new Array(n).fill(0); d[t.site]=o; add(encode(d),t.coeff);
  }
  for(const t of spec.twoBody){
    const a=OPS.indexOf(t.opA), b=OPS.indexOf(t.opB);
    if(a<1||b<1||!t.coeff) continue;
    if(t.dx===0&&t.dy===0) continue;
    for(const [i,j] of lat.bonds(t.dx,t.dy,a!==b)){
      const d=new Array(n).fill(0); d[i]=a; d[j]=b; add(encode(d),t.coeff);
    }
  }
  const terms=[];
  for(const [code,c] of map) if(Math.abs(c)>1e-14) terms.push([c,code]);
  return terms;
}

/* ------------------------------------- reachable sector + generator M (CSR) */
async function buildGenerator(terms,seedCode,n,maxDim,checkpoint=async()=>{}){
  const index=new Map([[seedCode,0]]), codes=[seedCode], counts=[];
  let nnz=0;
  // Discover the sector first. Only degrees are retained, not millions of
  // temporary row/column/value JavaScript triplets.
  for(let col=0;col<codes.length;col++){
    if(col%128===0) await checkpoint();
    const s=codes[col];let count=0;
    for(const [,p] of terms){
      if(!anticommutes(p,s,n)) continue;
      const [,r]=mulCode(p,s,n);
      if(!index.has(r)){
        if(codes.length>=maxDim) throw new Error(`Pauli sector exceeds ${maxDim} strings`);
        index.set(r,codes.length);codes.push(r);
      }
      count++;
    }
    counts.push(count);nnz+=count;
    if(nnz>8000000) throw new Error('Pauli generator exceeds 8 million entries; use fewer sites or terms.');
  }
  const dim=codes.length,ptr=new Int32Array(dim+1),ind=new Int32Array(nnz),val=new Float64Array(nnz);
  for(let i=0;i<dim;i++) ptr[i+1]=ptr[i]+counts[i];
  let norm=0;
  // For skew M, row degree equals column degree and M[i,j] = -M[j,i].
  for(let row=0;row<dim;row++){
    if(row%128===0) await checkpoint();
    let at=ptr[row],sum=0;
    for(const [coeff,p] of terms){
      if(!anticommutes(p,codes[row],n)) continue;
      const [k,r]=mulCode(p,codes[row],n),power=(k+1)&3;
      if(power&1) throw new Error('Internal Pauli phase error');
      const value=coeff*(power===0?-2:2);
      ind[at]=index.get(r);val[at++]=value;sum+=Math.abs(value);
    }
    norm=Math.max(norm,sum);
  }
  return {dim,ptr,ind,val,codes,index,norm};
}
function spectralNorm(M,iters){
  const n=M.dim, x=new Float64Array(n), y=new Float64Array(n), z=new Float64Array(n);
  let seed=12345>>>0;
  for(let i=0;i<n;i++){ seed=(Math.imul(seed,1103515245)+12345)>>>0; x[i]=seed/4294967296-0.5; }
  const norm=v=>{ let s=0; for(let i=0;i<v.length;i++) s+=v[i]*v[i]; return Math.sqrt(s); };
  for(let k=0;k<iters;k++){
    const s=norm(x); if(!s) return 0;
    for(let i=0;i<n;i++) x[i]/=s;
    matvec(M,x,y); matvec(M,y,z);            // z = M^2 x = -(M^T M) x
    for(let i=0;i<n;i++) x[i]=-z[i];
  }
  const s=norm(x); if(!s) return 0;
  for(let i=0;i<n;i++) x[i]/=s;
  matvec(M,x,y);
  return norm(y);
}
function matvec(M,x,y){
  const {dim,ptr,ind,val}=M;
  for(let i=0;i<dim;i++){ let s=0; for(let k=ptr[i];k<ptr[i+1];k++) s+=val[k]*x[ind[k]]; y[i]=s; }
}

/* ------------------------------------------------------------ integrator */
function makeStepper(M,maxOrder,tol2){
  const term=new Float64Array(M.dim), tmp=new Float64Array(M.dim);
  return function step(a,dt){
    term.set(a);
    for(let k=1;k<=maxOrder;k++){
      matvec(M,term,tmp);
      const f=dt/k;
      let s=0;
      for(let i=0;i<M.dim;i++){ const v=tmp[i]*f; term[i]=v; a[i]+=v; s+=v*v; }
      if(!Number.isFinite(s)) throw new Error("Non-finite evolution; reduce the time step or coupling scale.");
      if(s<tol2) return;
    }
    throw new Error("Taylor series did not converge; reduce the time step.");
  };
}

function makeCheckpoint(shouldStop=()=>false){
  let lastYield=performance.now();
  return async function checkpoint(force=false){
    if(shouldStop()) throw new DOMException("Calculation stopped", "AbortError");
    if(force || performance.now()-lastYield>24){
      await new Promise(resolve=>setTimeout(resolve,0));
      lastYield=performance.now();
      if(shouldStop()) throw new DOMException("Calculation stopped", "AbortError");
    }
  };
}

function propagationSteps(span,norm){
  const count=Math.max(1,Math.ceil(Math.abs(span)*norm/6));
  if(!Number.isFinite(count)||count>100000) throw new Error('Evolution scale is too large; reduce t max or the Hamiltonian coefficients.');
  return count;
}

function validateSpec(spec,maxSites){
  if(!Number.isInteger(spec.lx)||!Number.isInteger(spec.ly)||spec.lx<1||spec.ly<1||spec.lx*spec.ly>maxSites)
    throw new Error(`Choose a lattice with 1–${maxSites} sites.`);
  if(!Number.isFinite(spec.tmax)||spec.tmax<=0||spec.tmax>200||!Number.isInteger(spec.nt)||spec.nt<2||spec.nt>600)
    throw new Error("Choose 2–600 time points and 0 < t max ≤ 200.");
  if(!Number.isInteger(spec.src)||spec.src<0||spec.src>=spec.lx*spec.ly||!['X','Y','Z'].includes(spec.srcOp)||!['X','Y','Z'].includes(spec.probeOp))
    throw new Error("Invalid source or probe.");
  for(const term of [...spec.oneBody,...spec.twoBody,...(spec.siteBody||[])]){
    if(!Number.isFinite(term.coeff)) throw new Error("Hamiltonian coefficients must be finite.");
    if('dx' in term && (!Number.isInteger(term.dx)||!Number.isInteger(term.dy))) throw new Error("Lattice offsets must be integers.");
    if('site' in term && (!Number.isInteger(term.site)||term.site<0||term.site>=spec.lx*spec.ly)) throw new Error("On-site disorder contains an invalid site index.");
    if(!['X','Y','Z'].includes(term.op??term.opA)||('opB' in term&&!['X','Y','Z'].includes(term.opB))) throw new Error("Hamiltonian operators must be X, Y or Z.");
  }
}

/* ----------------------------------------------------------- observables */
function probeMasks(codes,n,probeOp){
  const po=OPS.indexOf(probeOp);
  const lists=[];
  for(let j=0;j<n;j++){
    const li=[];
    for(let s=0;s<codes.length;s++){ const d=digit(codes[s],j,n); if(d&&d!==po) li.push(s); }
    lists.push(Int32Array.from(li));
  }
  return lists;
}

async function simulate(spec,onProgress=()=>{},shouldStop=()=>false){
  validateSpec(spec,9);
  const checkpoint=makeCheckpoint(shouldStop);
  const lat=makeLattice(spec.lx,spec.ly,spec.bc);
  const n=lat.n;
  if(n>9) throw new Error(curLang==="zh"
    ? `${n} 个格点需要 ${(4**n).toLocaleString()} 个 Pauli 字符串 —— 浏览器算不动。请用 9 个或更少的格点。`
    : `${n} sites needs ${(4**n).toLocaleString()} Pauli strings — too many for the browser. Use 9 sites or fewer.`);
  const terms=buildTerms(lat,spec);
  if(!terms.length) throw new Error(curLang==="zh"
    ? "哈密顿量是空的 —— 请让至少一项的系数不为零"
    : "the Hamiltonian is empty — give at least one term a non-zero coefficient");

  const seedDig=new Array(n).fill(0); seedDig[spec.src]=OPS.indexOf(spec.srcOp);
  const seedCode=encode(seedDig);
  const M=await buildGenerator(terms,seedCode,n,300000,checkpoint);

  const masks=probeMasks(M.codes,n,spec.probeOp);
  const shells=new Map();
  for(let j=0;j<n;j++){ const d=lat.dist(spec.src,j); if(!shells.has(d)) shells.set(d,[]); shells.get(d).push(j); }
  const dists=[...shells.keys()].sort((a,b)=>a-b);

  const T=spec.tmax, nt=spec.nt, dtOut=T/(nt-1);
  // A power-iteration estimate is not an upper bound. The induced norm is.
  const sigma=M.norm;
  const perOut=propagationSteps(dtOut,sigma);   // <= 6 spectral radians per sub-step
  const dtSub=dtOut/perOut;
  const step=makeStepper(M,48,1e-28);                  // stop below ||term|| = 1e-14

  const a=new Float64Array(M.dim); a[0]=1;
  const times=new Float64Array(nt);
  const cone=new Map(dists.map(d=>[d,new Float64Array(nt)]));
  const site=Array.from({length:n},()=>new Float64Array(nt));
  const mem=new Float64Array(nt);
  const P=new Float64Array(M.dim);
  let normDrift=0;

  for(let k=0;k<nt;k++){
    if(k>0) for(let s=0;s<perOut;s++){ step(a,dtSub); await checkpoint(); }
    times[k]=k*dtOut;
    let tot=0;
    for(let i=0;i<M.dim;i++){ const v=a[i]*a[i]; P[i]=v; tot+=v; }
    normDrift=Math.max(normDrift,Math.abs(tot-1));
    mem[k]=a[0];
    for(let j=0;j<n;j++){
      const li=masks[j]; let s=0; for(let q=0;q<li.length;q++) s+=P[li[q]];
      site[j][k]=4*s;
    }
    for(const d of dists){
      let acc=0; for(const j of shells.get(d)) acc+=site[j][k];
      cone.get(d)[k]=acc/shells.get(d).length;
    }
    if(k%4===0){ onProgress(k/(nt-1)); await checkpoint(true); }
  }

  // conserved-component plateau:  c_W^2 / sum c^2   (Pauli strings are orthonormal)
  let sumsq=0,cSeed=0;
  for(const [c,code] of terms){ sumsq+=c*c; if(code===seedCode) cSeed=c; }
  const plateau=sumsq>0 ? (cSeed*cSeed)/sumsq : 0;
  // escape rate of the source string = squared column norm of M = 2^-N Tr |[H,W]|^2
  let escape=0;
  for(let i=0;i<M.dim;i++) for(let k=M.ptr[i];k<M.ptr[i+1];k++) if(M.ind[k]===0) escape+=M.val[k]*M.val[k];

  const fstats=computeFrontStats(dists,cone,times,T,nt);

  onProgress(1);
  return {lat,n,terms,dists,times,cone,site,mem,plateau,escape,...fstats,
          dim:M.dim,full:4**n,normDrift,nnz:M.ind.length,shells,engine:'pauli',
          spec:structuredClone(spec), measuredSites:Array.from({length:n},(_,j)=>j), sampling:'full_trace', spatialSampling:'all_sites'};
}

/* butterfly velocity, behind-front spread — shared by both engines, since both
   produce the same shape of (dists, cone, times) data regardless of how the
   C_r(t) values were actually computed. */
function computeFrontStats(dists,cone,times,T,nt){
  const dtOut=nt>1?times[1]-times[0]:0;
  const arrivals=[];
  for(const d of dists){ if(d<1) continue;
    const c=cone.get(d); let t=NaN;
    for(let k=1;k<nt;k++){ if(c[k]>=0.5){ const f=(0.5-c[k-1])/(c[k]-c[k-1]||1); t=times[k-1]+f*dtOut; break; } }
    if(isFinite(t)) arrivals.push([d,t]);
  }
  let vB=NaN;
  if(arrivals.length>=2){
    const nA=arrivals.length;
    const mx=arrivals.reduce((s,p)=>s+p[0],0)/nA, my=arrivals.reduce((s,p)=>s+p[1],0)/nA;
    let num=0,den=0;
    for(const [d,t] of arrivals){ num+=(d-mx)*(t-my); den+=(d-mx)**2; }
    if(den>0 && num>0) vB=den/num;
  }

  const far=dists[dists.length-1];
  const farArrival=arrivals.find(([d])=>d===far);
  const tCut=farArrival?farArrival[1]+2:NaN;
  const tail=[]; for(let k=0;k<nt;k++) if(times[k]>=tCut) tail.push(cone.get(far)[k]);
  const mean=tail.length?tail.reduce((s,v)=>s+v,0)/tail.length:NaN;
  const std=tail.length>1?Math.sqrt(tail.reduce((s,v)=>s+(v-mean)**2,0)/tail.length):NaN;
  return {far,tCut,arrivals,vB,std,mean};
}

/* ============================================================
   Engine 2: state-vector + scaled Taylor time evolution, one
   typicality sample. Same Heisenberg dynamics, same H, just
   Schrodinger-picture on a random pure state instead of the full
   operator algebra -- so it scales in Hilbert-space dimension 2^N
   instead of Pauli-algebra dimension 4^N, reaching ~16 sites
   instead of ~9. See project note sec. 9-13 for the derivation,
   the "shared Y(t)" optimisation, and the exact b_1=2*hx check
   this was validated against before being wired into the page. */

/* Build the antisymmetric real generator B for d/dt[re;im] = B [re;im],
   where the complex Schrodinger equation d|psi>/dt = -iH|psi> is written
   with H = Hr + i*Hi (Hr symmetric, Hi antisymmetric -- the standard
   decomposition of a Hermitian matrix). Reuses the exact same Pauli
   term list (terms, from buildTerms) and the exact same bit-packed
   `code` / digit() convention as the operator-space engine -- verified
   safe up to n=16 (4^16 = 2^32 lands exactly on the 32-bit boundary;
   digit()'s trailing "&3" mask discards the sign-extension artifact
   either way, confirmed by direct test). Returns the same {dim,ptr,ind,
   val,norm} shape as buildGenerator(), so matvec/spectralNorm/makeStepper
   all work unchanged. */
function buildStateVectorGenerator(terms,n){
  const dim=2**n, D=2*dim;
  // Terms with the same flip and phase share a matrix entry. In particular,
  // every diagonal ZZ/Z term is combined before allocating the sparse matrix.
  const groups=new Map();
  for(const [coeff,code] of terms){
    let flip=0,signMask=0,ys=0;
    for(let s=0;s<n;s++){
      const p=digit(code,s,n);
      if(p===1||p===2) flip|=1<<s;
      if(p===2||p===3) signMask|=1<<s;
      if(p===2) ys++;
    }
    const imaginary=ys%2, key=2*flip+imaginary;
    if(!groups.has(key)) groups.set(key,{flip,imaginary,terms:[]});
    groups.get(key).terms.push([coeff*((ys&2)?-1:1),signMask]);
  }
  const compiled=[...groups.values()];
  if(D*compiled.length*12>256*1024*1024) throw new Error('Sparse generator exceeds the 256 MiB entry budget; reduce sites or terms.');
  const ptr=new Int32Array(D+1), ind=new Int32Array(D*compiled.length), val=new Float64Array(ind.length);
  const colsum=new Float64Array(D);
  let at=0;
  for(let row=0;row<D;row++){
    ptr[row]=at;
    const imagRow=row>=dim, bp=row%dim;
    for(const group of compiled){
      const b=bp^group.flip;
      let v=0;
      for(const [c,mask] of group.terms){
        let bits=b&mask;
        bits^=bits>>>16; bits^=bits>>>8; bits^=bits>>>4; bits^=bits>>>2; bits^=bits>>>1;
        v+=c*((bits&1)?-1:1);
      }
      if(v===0) continue;
      const col=group.imaginary ? b+(imagRow?dim:0) : b+(imagRow?0:dim);
      if(!group.imaginary && imagRow) v=-v;
      ind[at]=col; val[at++]=v; colsum[col]+=Math.abs(v);
    }
  }
  ptr[D]=at;
  let norm=0; for(const s of colsum) norm=Math.max(norm,s);
  return {dim:D,ptr,ind:ind.subarray(0,at),val:val.subarray(0,at),norm};
}

/* escape rate and conserved plateau have exact, method-independent closed
   forms (they're static properties of H and the seed operator, not of how
   time evolution is computed), so both engines share this. */
function computeEscapePlateau(terms,seedCode,n){
  let sumsq=0,cSeed=0,escape=0;
  for(const [c,code] of terms){
    sumsq+=c*c;
    if(code===seedCode) cSeed=c;
    if(anticommutes(code,seedCode,n)) escape+=c*c*4;
  }
  return {plateau: sumsq>0 ? (cSeed*cSeed)/sumsq : 0, escape};
}

/* apply a single-site Pauli to the combined [re;im] state vector (length 2*dim). */
function applyPauliSV(state,dim,site,opLetter){
  const out=new Float64Array(2*dim);
  const re=state.subarray(0,dim), im=state.subarray(dim,2*dim);
  if(opLetter==="Z"){
    for(let b=0;b<dim;b++){ const s=((b>>site)&1)?-1:1; out[b]=re[b]*s; out[dim+b]=im[b]*s; }
  }else if(opLetter==="X"){
    for(let b=0;b<dim;b++){ const bp=b^(1<<site); out[bp]=re[b]; out[dim+bp]=im[b]; }
  }else{ // Y|b> = i(-1)^b |1-b>
    for(let b=0;b<dim;b++){
      const s=((b>>site)&1)?-1:1, bp=b^(1<<site);
      out[bp]+=-s*im[b]; out[dim+bp]+=s*re[b];
    }
  }
  return out;
}
function svNorm2(state,dim){ let s=0; for(let i=0;i<2*dim;i++) s+=state[i]*state[i]; return s; }
function svDotReal(a,b,dim){ // Re<a|b> for two [re;im] states
  let s=0;
  for(let i=0;i<dim;i++) s += a[i]*b[i] + a[dim+i]*b[dim+i];
  return s;
}
function randomTypicalityState(dim,rngState){
  // Box-Muller, using a small xorshift-ish PRNG seeded from rngState so a
  // run is exactly reproducible from its reported seed.
  let s=rngState>>>0;
  const rnd=()=>{ s=(Math.imul(s,1664525)+1013904223)>>>0; return (s>>>0)/4294967296; };
  const st=new Float64Array(2*dim);
  for(let i=0;i<2*dim;i++){
    let u1=rnd(); if(u1<1e-12) u1=1e-12;
    const u2=rnd();
    st[i]=Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
  }
  const n=Math.sqrt(svNorm2(st,dim));
  for(let i=0;i<2*dim;i++) st[i]/=n;
  return st;
}

async function simulateStateVector(spec,onProgress=()=>{},shouldStop=()=>false,initialState=null){
  validateSpec(spec,16);
  const checkpoint=makeCheckpoint(shouldStop);
  const lat=makeLattice(spec.lx,spec.ly,spec.bc), n=lat.n, dim=2**n;
  const terms=buildTerms(lat,spec);
  if(!terms.length) throw new Error(curLang==='zh'?'哈密顿量为空':'The Hamiltonian is empty');
  const M=buildStateVectorGenerator(terms,n);
  const step=makeStepper(M,60,1e-30);
  const evolve=async (vector,span)=>{
    const count=propagationSteps(span,M.norm);
    for(let s=0;s<count;s++){ step(vector,span/count); await checkpoint(); }
  };
  const seedDig=new Array(n).fill(0); seedDig[spec.src]=OPS.indexOf(spec.srcOp);
  const {plateau,escape}=computeEscapePlateau(terms,encode(seedDig),n);
  const shells=new Map();
  for(let j=0;j<n;j++){
    const r=lat.dist(spec.src,j);
    if(!shells.has(r)) shells.set(r,[]);
    shells.get(r).push(j);
  }
  const dists=[...shells.keys()].sort((a,b)=>a-b);
  const representatives=dists.map(r=>({r,site:shells.get(r)[0]}));
  const seed=(spec.svSeed??1)>>>0;
  // Optional explicit state supports complete-basis trace checks in the tests.
  const psi0=initialState?Float64Array.from(initialState):randomTypicalityState(dim,seed);
  if(psi0.length!==2*dim||Math.abs(svNorm2(psi0,dim)-1)>1e-10) throw new Error('Initial state must be normalized');
  const psi=psi0.slice(), Wpsi0=applyPauliSV(psi0,dim,spec.src,spec.srcOp);
  const probes=representatives.map(({site:j})=>applyPauliSV(psi0,dim,j,spec.probeOp));
  const times=Float64Array.from({length:spec.nt},(_,k)=>spec.tmax*k/(spec.nt-1));
  const cone=new Map(dists.map(r=>[r,new Float64Array(spec.nt)]));
  const site=Array.from({length:n},()=>new Float64Array(spec.nt).fill(NaN));
  const mem=new Float64Array(spec.nt);
  let normDrift=0;
  const track=v=>{ normDrift=Math.max(normDrift,Math.abs(svNorm2(v,dim)-1)); };
  // Stream one output time at a time. Only rolling forward states are kept;
  // state-vector storage no longer grows with the number of output times.
  for(let k=0;k<times.length;k++){
    if(k){
      const dt=times[k]-times[k-1];
      await evolve(psi,dt);
      for(const probe of probes) await evolve(probe,dt);
    }
    track(psi);
    const Y=applyPauliSV(psi,dim,spec.src,spec.srcOp);
    if(times[k]) await evolve(Y,-times[k]);
    track(Y);
    mem[k]=svDotReal(Wpsi0,Y,dim);
    for(let q=0;q<representatives.length;q++){
      const {r,site:j}=representatives[q];
      track(probes[q]);
      const chi=applyPauliSV(probes[q],dim,spec.src,spec.srcOp);
      if(times[k]) await evolve(chi,-times[k]);
      track(chi);
      const VY=applyPauliSV(Y,dim,j,spec.probeOp);
      let value=0;
      for(let b=0;b<2*dim;b++) value+=(chi[b]-VY[b])**2;
      cone.get(r)[k]=value; site[j][k]=value;
      onProgress((k+(q+1)/representatives.length)/times.length);
      await checkpoint(true);
    }
  }
  const fstats=computeFrontStats(dists,cone,times,spec.tmax,spec.nt);
  return {lat,n,terms,dists,times,cone,site,mem,plateau,escape,...fstats,
    dim,full:dim,normDrift,nnz:M.val.length,shells,engine:'statevec',svSeed:seed,
    spec:structuredClone({...spec,svSeed:seed}),representatives,
    measuredSites:representatives.map(p=>p.site),
    sampling:initialState?'explicit_state':'single_random_state',spatialSampling:'representative_per_shell'};
}

/* --------------------------------------------------------------- charting */
const SHELL=["--s0","--s1","--s2","--s3","--s4","--s5"];
const TERMC=["--t1","--t2","--t3","--t4","--t5","--t6","--t7","--t8"];
const termColor=k=> cssvar(k<TERMC.length?TERMC[k]:"--ink-3");
const cssvar=v=>getComputedStyle(document.documentElement).getPropertyValue(v).trim();
const SVGNS="http://www.w3.org/2000/svg";
function el(tag,attrs,text){ const e=document.createElementNS(SVGNS,tag);
  for(const k in attrs) e.setAttribute(k,attrs[k]); if(text!=null) e.textContent=text; return e; }
function niceTicks(lo,hi,count){
  if(!Number.isFinite(lo)||!Number.isFinite(hi)||hi<lo||count<1) return [];
  if(hi===lo) return [lo];
  const raw=(hi-lo)/count, mag=10**Math.floor(Math.log10(raw));
  const step=[1,2,2.5,5,10].find(s=>s*mag>=raw)*mag;
  if(!Number.isFinite(step)||step<=0) return [lo,hi];
  const start=Math.ceil(lo/step),end=Math.floor(hi/step+8*Number.EPSILON*Math.max(1,Math.abs(hi/step)));
  const out=[]; for(let k=0;k<Math.min(100,end-start+1);k++) out.push(Number(((start+k)*step).toPrecision(12)));
  return out;
}
function chartBox(svg,ratio){
  const w=Math.round(svg.clientWidth||640);
  const W=Math.max(360,w);
  return {W,H:Math.round(Math.min(400,Math.max(240,W*ratio)))};
}
function drawLines(svg,series,opts){
  svg.textContent="";
  const W=opts.W, H=opts.H, m={l:46,r:opts.right??54,t:12,b:34};
  svg.setAttribute("viewBox",`0 0 ${W} ${H}`);
  const xs=opts.xmax, ylo=opts.ymin, yhi=opts.ymax;
  const X=v=>m.l+(v/xs)*(W-m.l-m.r);
  const Y=v=>H-m.b-((v-ylo)/(yhi-ylo))*(H-m.t-m.b);
  for(const ty of niceTicks(ylo,yhi,4)){
    svg.appendChild(el("line",{x1:m.l,x2:W-m.r,y1:Y(ty),y2:Y(ty),class:"gridline"}));
    svg.appendChild(el("text",{x:m.l-7,y:Y(ty)+3.5,"text-anchor":"end"},opts.yfmt?opts.yfmt(ty):String(ty)));
  }
  for(const tx of niceTicks(0,xs,5)){
    svg.appendChild(el("text",{x:X(tx),y:H-m.b+15,"text-anchor":"middle"},String(tx)));
  }
  svg.appendChild(el("line",{x1:m.l,x2:W-m.r,y1:Y(Math.max(ylo,Math.min(yhi,0))),y2:Y(Math.max(ylo,Math.min(yhi,0))),class:"axis"}));
  if(opts.ref!=null && opts.ref<=yhi && opts.ref>=ylo){
    svg.appendChild(el("line",{x1:m.l,x2:W-m.r,y1:Y(opts.ref),y2:Y(opts.ref),
      stroke:cssvar("--ink-3"),"stroke-width":1,"stroke-dasharray":"2 4"}));
    if(opts.refLabel) svg.appendChild(svgText(el("text",{x:m.l+6,y:Y(opts.ref)-5,
      stroke:cssvar("--surface"),"stroke-width":3,"paint-order":"stroke","stroke-linejoin":"round"}),
      opts.refLabel));
  }
  const tags=[];
  for(const s of series){
    let d="";
    for(let k=0;k<s.x.length;k++){ const px=X(s.x[k]), py=Y(Math.max(ylo,Math.min(yhi,s.y[k])));
      d+=(k?"L":"M")+px.toFixed(1)+" "+py.toFixed(1); }
    svg.appendChild(el("path",{d,fill:"none",stroke:s.color,
      "stroke-width":s.thin?1.3:2,"stroke-dasharray":s.thin?"3 3":"",
      opacity:s.thin?.75:1,"stroke-linejoin":"round","stroke-linecap":"round"}));
    if(s.label){
      const last=s.y[s.y.length-1];
      tags.push({y:Y(Math.max(ylo,Math.min(yhi,last))),color:s.color,text:s.label});
    }
  }
  // push overlapping end-labels apart so identity never rests on colour alone
  tags.sort((a,b)=>a.y-b.y);
  const gap=12;
  for(let i=1;i<tags.length;i++) if(tags[i].y-tags[i-1].y<gap) tags[i].y=tags[i-1].y+gap;
  const overflow=tags.length?tags[tags.length-1].y-(H-m.b):0;
  if(overflow>0) for(const t of tags) t.y-=overflow;
  for(const t of tags)
    svg.appendChild(svgText(el("text",{x:W-m.r+5,y:t.y+3.5,class:"dlabel",fill:t.color}),t.text));
  svg.appendChild(svgText(el("text",{x:(m.l+W-m.r)/2,y:H-4,"text-anchor":"middle",class:"axtitle"}),opts.xtitle));
  svg.appendChild(svgText(el("text",{x:12,y:H/2,"text-anchor":"middle",class:"axtitle",
    transform:`rotate(-90 12 ${H/2})`}),opts.ytitle));
}

/* --------------------------------------------------------------- the app */
const PRESETS={
  mfi2d:{lx:3,ly:2,bc:"obc",one:[["X",-3.05],["Z",-0.5]],two:[[1,0,"Z","Z",-1],[0,1,"Z","Z",-1]],tmax:15},
  tfim2d:{lx:3,ly:2,bc:"obc",one:[["X",-3.05]],two:[[1,0,"Z","Z",-1],[0,1,"Z","Z",-1]],tmax:15},
  mfi1d:{lx:8,ly:1,bc:"obc",one:[["X",-1.05],["Z",-0.5]],two:[[1,0,"Z","Z",-1]],tmax:20},
  tfim1d:{lx:8,ly:1,bc:"obc",one:[["X",-1.05]],two:[[1,0,"Z","Z",-1]],tmax:20},
  xxz1d:{lx:8,ly:1,bc:"obc",one:[],two:[[1,0,"X","X",1],[1,0,"Y","Y",1],[1,0,"Z","Z",1],[2,0,"Z","Z",0.4]],tmax:16},
  heis1d:{lx:8,ly:1,bc:"obc",one:[],two:[[1,0,"X","X",1],[1,0,"Y","Y",1],[1,0,"Z","Z",1]],tmax:16},
  xxz2d:{lx:4,ly:2,bc:"obc",one:[],two:[[1,0,"X","X",1],[1,0,"Y","Y",1],[1,0,"Z","Z",1],
        [0,1,"X","X",1],[0,1,"Y","Y",1],[0,1,"Z","Z",1],[1,1,"Z","Z",0.4]],tmax:12},
  heis2d:{lx:4,ly:2,bc:"obc",one:[],two:[[1,0,"X","X",1],[1,0,"Y","Y",1],[1,0,"Z","Z",1],
        [0,1,"X","X",1],[0,1,"Y","Y",1],[0,1,"Z","Z",1]],tmax:12},
};
const $=id=>document.getElementById(id);
function configureDimensionPage(){
  const allowed=new Set(PAGE_DIMENSION==="1d"
    ?["mfi1d","tfim1d","xxz1d","heis1d","custom"]
    :["mfi2d","tfim2d","xxz2d","heis2d","custom"]);
  for(const option of [...$("preset").options]) if(!allowed.has(option.value)) option.remove();
  if(PAGE_DIMENSION==="1d"){
    $("ly").value="1"; $("ly").disabled=true;
    $("srcy").value="1"; $("srcy").disabled=true;
  }
}
/* A preset is only a starting point. Name the model by what its terms actually are,
   so the label can never claim "Ising" for something the user has since edited. */
function termSignature(one,two,lx,ly){
  const a=one.filter(t=>t.coeff).map(t=>`1|${t.op}|${t.coeff}`).sort();
  const b=two.filter(t=>t.coeff&&!(t.dx===0&&t.dy===0))
             .map(t=>`2|${t.dx},${t.dy}|${t.opA}${t.opB}|${t.coeff}`).sort();
  return (lx===1||ly===1?"1D:":"2D:")+a.concat(b).join(";");
}
function syncPresetLabel(){
  const now=termSignature(state.oneBody,state.twoBody,state.lx,state.ly);
  for(const key in PRESETS){
    const p=PRESETS[key];
    const sig=termSignature(p.one.map(([op,coeff])=>({op,coeff})),
                            p.two.map(([dx,dy,opA,opB,coeff])=>({dx,dy,opA,opB,coeff})),
                            p.lx,p.ly);   // the preset's own dimensionality, not the current one
    if(sig===now){ $("preset").value=key; return; }
  }
  $("preset").value="custom";
}
let state={lx:3,ly:2,bc:"obc",oneBody:[],twoBody:[],siteBody:[],src:0,srcOp:"Z",probeOp:"Z",tmax:15,nt:150,
  engine:"pauli",svSeed:1,disorderMode:"none",disorderOp:"Z",disorderStrength:0.5,disorderSeed:1};
let last=null, running=false, stopRequested=false;
let dirty=false, lastSecs=0, lastN=0, autoTimer=null;
function syncSourceControls(){
  state.src=Math.max(0,Math.min(state.lx*state.ly-1,Math.trunc(state.src)||0));
  const x=state.src%state.lx+1, y=Math.floor(state.src/state.lx)+1;
  const sx=$("srcx"), sy=$("srcy");
  sx.min="1"; sx.max=String(state.lx); sx.value=String(x);
  sy.min="1"; sy.max=String(state.ly); sy.value=String(y);
}
function markDirty(){
  dirty=true;
  document.body.classList.add("stale");
  $("run").classList.add("needs");
  renderResultContext();
  clearTimeout(autoTimer);
  // the Pauli sector grows by 4x per site, so extrapolate the last timing to this size
  const n=state.lx*state.ly;
  const est=lastN? lastSecs*Math.pow(4,n-lastN) : 0;
  if(state.engine==="pauli" && n<=9 && est<1.2 && !running){             // cheap enough to just recompute
    autoTimer=setTimeout(()=>{ if(dirty&&!running) run(); },420);
  }else{
    const st=$("status"); st.className="status busy";
    st.textContent = curLang==="zh"
      ? "设置已修改 —— 按“运行”重新计算。下面的曲线还是上一次运行的结果。"
      : "Settings changed — press Run to recompute. The curves below are the previous run.";
  }
}
function clearDirty(){
  dirty=false; clearTimeout(autoTimer);
  document.body.classList.remove("stale");
  $("run").classList.remove("needs");
}

function opSelect(val,onChange){
  const s=document.createElement("select");
  for(const o of ["X","Y","Z"]){ const op=document.createElement("option"); op.value=o; op.textContent=o;
    if(o===val) op.selected=true; s.appendChild(op); }
  s.addEventListener("change",()=>onChange(s.value)); return s;
}
function numInput(val,onChange,step){
  const i=document.createElement("input"); i.type="number"; i.value=val; i.step=step??"0.05";
  i.addEventListener("change",()=>onChange(parseFloat(i.value)||0)); return i;
}
function delBtn(onClick){
  const b=document.createElement("button"); b.className="icon ghost"; b.textContent="×";
  b.setAttribute("aria-label","Remove term"); b.addEventListener("click",onClick); return b;
}
function renderTerms(){
  const t1=$("tb1"); t1.textContent="";
  state.oneBody.forEach((t,k)=>{
    const tr=document.createElement("tr");
    const c1=document.createElement("td"); c1.appendChild(opSelect(t.op,v=>{t.op=v;refresh();})); tr.appendChild(c1);
    const c2=document.createElement("td"); c2.appendChild(numInput(t.coeff,v=>{t.coeff=v;refresh();})); tr.appendChild(c2);
    const c3=document.createElement("td"); c3.appendChild(delBtn(()=>{state.oneBody.splice(k,1);renderTerms();refresh();})); tr.appendChild(c3);
    t1.appendChild(tr);
  });
  const t2=$("tb2"); t2.textContent="";
  state.twoBody.forEach((t,k)=>{
    const tr=document.createElement("tr");
    for(const key of ["dx","dy"]){ const c=document.createElement("td");
      if(key==="dy") c.className="only-2d";
      c.appendChild(numInput(t[key],v=>{t[key]=Math.round(v);drawLattice();refresh();},"1")); tr.appendChild(c); }
    for(const key of ["opA","opB"]){ const c=document.createElement("td");
      c.appendChild(opSelect(t[key],v=>{t[key]=v;refresh();})); tr.appendChild(c); }
    const c5=document.createElement("td"); c5.appendChild(numInput(t.coeff,v=>{t.coeff=v;refresh();})); tr.appendChild(c5);
    const c6=document.createElement("td"); c6.appendChild(delBtn(()=>{state.twoBody.splice(k,1);renderTerms();drawLattice();refresh();})); tr.appendChild(c6);
    t2.appendChild(tr);
  });
}
function renderDisorderPreview(){
  const enabled=state.disorderMode!=="none";
  $("disorderOp").disabled=running||!enabled;
  $("disorderStrength").disabled=running||!enabled;
  $("disorderSeed").disabled=running||!enabled;
  $("generateDisorder").disabled=running||!enabled;
  const box=$("disorderPreview"); box.textContent="";
  if(!enabled){
    $("disorderSummary").textContent=curLang==="zh"?"未加入逐格点随机场。":"No site-resolved random field.";
    return;
  }
  for(const t of state.siteBody){
    const chip=document.createElement("span");
    chip.className="disorder-chip "+(t.coeff<0?"negative":"positive");
    chip.textContent=`${t.op}${t.site+1} ${t.coeff<0?"−":"+"}${Math.abs(t.coeff).toFixed(3)}`;
    box.appendChild(chip);
  }
  const vals=state.siteBody.map(t=>t.coeff), lo=Math.min(...vals), hi=Math.max(...vals);
  const mean=vals.reduce((s,v)=>s+v,0)/vals.length;
  const sd=Math.sqrt(vals.reduce((s,v)=>s+(v-mean)**2,0)/vals.length);
  const names=curLang==="zh"?{uniform:"均匀",gaussian:"高斯",binary:"二元"}:{uniform:"uniform",gaussian:"Gaussian",binary:"binary"};
  const stats=state.disorderMode==="gaussian"
    ?`mean ${mean.toFixed(3)} · sd ${sd.toFixed(3)}`
    :state.disorderMode==="binary"
      ?`+ ${vals.filter(v=>v>0).length} · − ${vals.filter(v=>v<0).length}`
      :`[${lo.toFixed(3)}, ${hi.toFixed(3)}]`;
  $("disorderSummary").textContent=(curLang==="zh"?"本次实现：":"realization: ")+
    `${names[state.disorderMode]} · seed ${state.disorderSeed} · ${stats}`;
}
function rebuildSiteDisorder(){
  state.siteBody=state.disorderMode!=="none"
    ?generateSiteDisorder(state.lx*state.ly,state.disorderOp,state.disorderStrength,state.disorderSeed,state.disorderMode)
    :[];
  renderDisorderPreview();
}
function texCoeff(c){
  const mag=Math.abs(c);
  return (c<0?"-":"+")+(mag===1?"":mag.toString()+"\\,");
}
function renderFormula(){
  const terms=[];
  for(const t of state.twoBody){ if(!t.coeff) continue;
    terms.push(`${texCoeff(t.coeff)}\\sum_i ${t.opA}_i\\,${t.opB}_{i+(${t.dx},${t.dy})}`); }
  for(const t of state.oneBody){ if(!t.coeff) continue;
    terms.push(`${texCoeff(t.coeff)}\\sum_i ${t.op}_i`); }
  if(state.siteBody.some(t=>t.coeff)){
    const law=state.disorderMode==="gaussian"?`\\delta h_i\\sim\\mathrm{N}(0,${state.disorderStrength}^2)`:
      state.disorderMode==="binary"?`\\delta h_i=\\pm ${state.disorderStrength}`:
      `\\delta h_i\\in[-${state.disorderStrength},${state.disorderStrength}]`;
    terms.push(`+\\sum_i \\delta h_i\\,${state.disorderOp}_i\\quad(${law})`);
  }
  const box=$("formula"); box.textContent="";
  const lab=document.createElement("span");
  lab.className="flab"; lab.innerHTML=tex("H=");
  box.appendChild(lab);
  if(!terms.length){
    const e=document.createElement("span"); e.className="fempty";
    e.textContent=curLang==="zh"?"(暂无非零项)":"(no terms yet)";
    box.appendChild(e); return;
  }
  terms.forEach((tx,k)=>{
    const d=document.createElement("span"); d.className="fterm";
    d.innerHTML=tex(k===0?tx.replace(/^\+/,""):tx,"disp");
    box.appendChild(d);
  });
}
function activeBonds(){
  return state.twoBody
    .map((t,k)=>({...t,k}))
    .filter(t=>t.coeff && !(t.dx===0 && t.dy===0));
}
function drawLattice(){
  const lat=makeLattice(state.lx,state.ly,state.bc);
  const svg=$("lat"); svg.textContent="";
  const cell=34, pad=20;
  // periodic bonds leave the lattice as stubs, so the box needs room for them
  const edge=state.bc==="pbc"?17:0;
  const ox0=pad+edge, oy0=pad+edge;
  const W=2*ox0+(state.lx-1)*cell, H=2*oy0+(state.ly-1)*cell;
  svg.setAttribute("viewBox",`0 0 ${Math.max(W,54)} ${Math.max(H,54)}`);
  const px=i=>ox0+lat.coords(i)[0]*cell, py=i=>oy0+lat.coords(i)[1]*cell;

  const seg=(x1,y1,x2,y2,col,wrapped)=>svg.appendChild(el("line",{
    x1,y1,x2,y2,stroke:col,"stroke-width":1.7,"stroke-linecap":"round",
    "stroke-dasharray":wrapped?"2.4 2.6":"",opacity:wrapped?.9:.95}));

  // terms that share an offset (XX, YY, ZZ on the same bond) run as parallel strands
  const groups=new Map();
  for(const t of activeBonds()){
    const key=t.dx+","+t.dy;
    if(!groups.has(key)) groups.set(key,[]);
    groups.get(key).push(t);
  }
  for(const list of groups.values()){
    const {dx,dy}=list[0];
    const len=Math.hypot(dx,dy)||1, ux=dx/len, uy=dy/len;
    const nx=-uy, ny=ux, gap=2.4, stub=0.46*cell;
    list.forEach((t,m)=>{
      const d=(m-(list.length-1)/2)*gap, sx=nx*d, sy=ny*d;
      const col=termColor(t.k);
      for(const [i,j] of lat.bonds(dx,dy)){
        const [xi,yi]=lat.coords(i), [xj,yj]=lat.coords(j);
        if(xj-xi===dx && yj-yi===dy){
          seg(px(i)+sx,py(i)+sy,px(j)+sx,py(j)+sy,col,false);
        }else{                                   // wraps: a stub out, a stub in
          seg(px(i)+sx,py(i)+sy,px(i)+ux*stub+sx,py(i)+uy*stub+sy,col,true);
          seg(px(j)-ux*stub+sx,py(j)-uy*stub+sy,px(j)+sx,py(j)+sy,col,true);
        }
      }
    });
  }

  for(let i=0;i<lat.n;i++){
    const isSrc=i===state.src;
    const rr=isSrc?11:9;    // big enough that a 1..N index sits fully inside the circle
    const localField=state.siteBody.find(t=>t.site===i)?.coeff??0;
    if(state.disorderMode!=="none"&&localField){
      const scale=Math.min(1,Math.abs(localField)/(state.disorderStrength||1));
      svg.appendChild(el("circle",{cx:px(i),cy:py(i),r:14,fill:"none",
        stroke:localField<0?cssvar("--warm"):cssvar("--accent"),"stroke-width":1.5+2*scale,opacity:.35+.55*scale}));
    }
    const c=el("circle",{cx:px(i),cy:py(i),r:rr,class:"site",
      fill:isSrc?cssvar("--accent"):cssvar("--surface"),
      stroke:isSrc?cssvar("--accent"):cssvar("--ink-3"),"stroke-width":1.6});
    const fieldText=state.disorderMode!=="none"?` · δh=${localField.toFixed(4)} ${state.disorderOp}`:"";
    c.appendChild(el("title",{},(isSrc?`site ${i+1} — source`:`site ${i+1}`)+fieldText));
    c.addEventListener("click",()=>{ if(running) return; state.src=i; syncSourceControls(); drawLattice(); refresh(); });
    svg.appendChild(c);
    // every site carries its own 1..N index, drawn inside the circle itself.
    // The filled (source) circle needs a white number to stay readable against
    // the accent fill; the hollow circles get a dark number instead. The ".lat
    // text" stylesheet rule always wins over a plain fill="" attribute (a
    // presentation attribute has lower priority than any CSS rule that
    // matches), so the colour has to go through the inline style attribute
    // instead, which stylesheet rules cannot override.
    svg.appendChild(el("text",{x:px(i),y:py(i),"text-anchor":"middle","dominant-baseline":"central",
      "font-weight":isSrc?"700":"600","font-size":isSrc?"9.5":"8.5",
      style:"fill:"+(isSrc?"#ffffff":cssvar("--ink"))},String(i+1)));
    if(isSrc) svg.appendChild(el("text",{x:px(i)+rr+4,y:py(i)-rr-1,"text-anchor":"start",
      "font-weight":"600",style:"fill:"+cssvar("--accent-ink")},state.srcOp));
  }
  drawLatLegend();
}
function drawLatLegend(){
  const box=$("latleg"); box.textContent="";
  const active=activeBonds();
  const hasDisorder=state.disorderMode!=="none"&&state.siteBody.some(t=>t.coeff);
  if(!active.length&&!hasDisorder){
    box.innerHTML=`<span class="wrapnote">${curLang==="zh"?"没有开启任何两体项。":"No two-body term is switched on."}</span>`;
    return;
  }
  for(const t of active){
    const sp=document.createElement("span");
    sp.innerHTML=`<i style="background:${termColor(t.k)}"></i>`+
      tex(`${t.opA}_i\\,${t.opB}_{i+(${t.dx},${t.dy})}`);
    box.appendChild(sp);
  }
  if(hasDisorder){
    const sp=document.createElement("span");
    sp.innerHTML=`<i class="sitekey"></i>${curLang==="zh"?"圆环：逐格点随机场":"ring: on-site random field"} `+
      tex(`\\delta h_i\\,${state.disorderOp}_i`);
    box.appendChild(sp);
  }
  if(state.bc==="pbc"){
    const sp=document.createElement("span"); sp.className="wrapnote";
    sp.innerHTML=`<i class="wrapkey"></i>${curLang==="zh"?"跨越边界卷绕":"wraps through the boundary"}`;
    box.appendChild(sp);
  }
  nowrapPunct(box);
}
function readInputs(){
  state.engine=$("engine").value;
  const maxL=16;
  state.lx=Math.max(1,Math.min(maxL,parseInt($("lx").value)||1));
  state.ly=PAGE_DIMENSION==="1d"?1:Math.max(1,Math.min(maxL,parseInt($("ly").value)||1));
  if(PAGE_DIMENSION==="1d") for(const t of state.twoBody) t.dy=0;
  $("lx").value=state.lx; $("ly").value=state.ly;
  const sourceX=Math.max(1,Math.min(state.lx,parseInt($("srcx").value)||1));
  const sourceY=Math.max(1,Math.min(state.ly,parseInt($("srcy").value)||1));
  state.src=(sourceX-1)+state.lx*(sourceY-1);
  syncSourceControls();
  state.bc=$("bc").value; state.srcOp=$("srcop").value; state.probeOp=$("probeop").value;
  state.tmax=Math.max(0.001,Math.min(200,parseFloat($("tmax").value)||15));
  state.nt=Math.max(2,Math.min(600,parseInt($("nt").value)||150));
  state.svSeed=(Number.parseInt($("svseed").value)||0)>>>0;
  state.disorderMode=$("disorderMode").value;
  state.disorderOp=$("disorderOp").value;
  state.disorderStrength=Math.max(0,Math.min(100,Number.parseFloat($("disorderStrength").value)||0));
  state.disorderSeed=(Number.parseInt($("disorderSeed").value)||0)>>>0;
  $("nt").min="2"; $("nt").value=state.nt;
  $("tmax").value=state.tmax; $("svseed").value=state.svSeed;
  $("disorderStrength").value=state.disorderStrength; $("disorderSeed").value=state.disorderSeed;
  rebuildSiteDisorder();
  const sv=state.engine==="statevec";
  $("svrow").hidden=!sv; $("svhint").hidden=!sv;
  // View controls describe the completed result, even while inputs are edited.
  syncResultView();
}
/* Cheap, pre-run cost estimate for the state-vector engine, used both by the
   size-warning panel and by autoClampStatevecNt() below. It does NOT build
   the full 2^N-dimensional generator (too slow to call on every keystroke at
   N=16) -- it only expands the Pauli term list (buildTerms(), cost O(n*rows),
   independent of 2^N) and sums |coefficient| across every expanded term. That
   sum is exactly the same "column absolute-sum" bound buildStateVectorGenerator
   computes as M.norm (verified directly against it), so it is a cheap,
   essentially-exact stand-in for the sigma that controls the integrator's
   step count -- not an approximation of a different quantity, just the same
   one computed without paying for the matrix.
   The constant K below is fit against two independent measurements: this
   session's own timing of the exact scenario this function exists to catch
   (3x3, this page's default 2D mixed-field Ising preset, nt=150 -- about 36s
   total, ~6s per phase) and the project's separately-documented, real
   browser measurement at N=16 (project note sec. 9-11: ~45-50s per shell at
   6-10 time points). Treat the result as an order-of-magnitude guide, not a
   precise prediction -- actual time depends on the browser and machine. */
function svCostEstimate(lat,oneBody,twoBody,siteBody,src,nt,tmax){
  const terms=buildTerms(lat,{oneBody,twoBody,siteBody});
  const sigmaBound=terms.reduce((s,[c])=>s+Math.abs(c),0);
  const dim=1<<lat.n, termCount=terms.length;
  const shellSet=new Set(); for(let j=0;j<lat.n;j++) shellSet.add(lat.dist(src,j));
  const phases=1+(shellSet.size||1);        // shared Y(t)/memory pass + one pass per shell
  const K=7e-9;
  const seconds=K*sigmaBound*tmax*nt*dim*termCount*phases;
  return {seconds,phases,dim,termCount,sigmaBound,shells:shellSet.size||1};
}
function friendlyDuration(seconds,zh){
  if(seconds<60){ const s=Math.max(5,Math.ceil(seconds/5)*5); return zh?`大约 ${s} 秒`:`about ${s} seconds`; }
  const m=seconds/60, mm=m<10?Math.ceil(m*2)/2:Math.ceil(m);
  return zh?`大约 ${mm} 分钟`:`about ${mm} minutes`;
}
/* Auto-protection against the exact failure this was added for: a small-N
   lattice with the state-vector engine and a large nt/t-max left over from
   another setting (the Pauli engine's own defaults are fine at any nt, since
   its cost does not depend on nt at all, so nothing about switching TO this
   engine or changing the lattice while nt is still large is otherwise
   flagged). Runs at "regime change" moments -- engine switch, lattice/
   boundary change, source/probe operator, t max -- and brings nt down to a
   comfortable auto-run budget. It deliberately does NOT run when the nt
   field itself is what just changed, so a deliberate "yes, run it long" edit
   is always respected; the size-warning panel (sizeNote(), below) still
   shows the honest time estimate for that case instead of silently allowing
   it. */
function autoClampStatevecNt(){
  if(state.engine!=="statevec") return;
  const n=state.lx*state.ly; if(n<1||n>16) return;
  const lat=makeLattice(state.lx,state.ly,state.bc);
  const est=svCostEstimate(lat,state.oneBody,state.twoBody,state.siteBody,state.src,state.nt,state.tmax);
  const TARGET=6;                 // seconds -- a comfortable, no-warning-needed budget
  if(est.seconds>TARGET*2.5 && est.seconds>0){
    const safeNt=Math.max(6,Math.min(state.nt,Math.floor(state.nt*TARGET/est.seconds)));
    if(safeNt<state.nt){ state.nt=safeNt; $("nt").value=String(safeNt); }
  }
}
function sizeNote(){
  const n=state.lx*state.ly, sv=state.engine==='statevec', max=sv?16:9, zh=curLang==='zh', box=$('sizewarn');
  if(n>max){
    box.textContent=zh?`${n} 个格点超出本引擎的 ${max} 格点上限。`:`${n} sites exceeds this engine's ${max}-site limit.`;
    return false;
  }
  if(!sv){
    box.textContent=n===9?(zh?'9 格点的可达扇区可能很大，构建和演化需要较长时间；可点击停止。':'Nine sites can require a large reachable sector and a long run; Stop is available.') :'';
    return true;
  }
  const lat=makeLattice(state.lx,state.ly,state.bc);
  const est=svCostEstimate(lat,state.oneBody,state.twoBody,state.siteBody,state.src,state.nt,state.tmax);
  box.textContent=(zh?`${n} 格点 · ${state.nt} 时间点 · 每个距离一个代表点。`:`${n} sites · ${state.nt} times · one representative per distance.`)+
    (est.seconds>8?(zh?' 长时间窗或密集时间网格可能明显增加耗时，建议先用 6–12 个点试算。':' Long time ranges or dense grids can be expensive; start with 6–12 times.'):'');
  return true;
}
function refreshQuiet(){ readInputs(); renderFormula(); syncPresetLabel(); sizeNote(); }
// Deliberately not just refreshQuiet()+autoClampStatevecNt(): the clamp has
// to run BETWEEN readInputs() (so it sees the field that just changed) and
// sizeNote() (so the warning it renders describes the post-clamp nt, not a
// stale estimate for the value nt held a moment ago).
function refresh(){
  readInputs();
  if(!suppressAutoClamp) autoClampStatevecNt();
  renderFormula(); syncPresetLabel(); sizeNote();
  markDirty();
}
let suppressAutoClamp=false;

function setReadouts(r){
  for(const id of ['copycfg','copycsv','downloadcfg','downloadcsv']) $(id).disabled=!r;
  const sv=r&&r.engine==="statevec";
  const cells = curLang==="zh" ? [
    [tex("N")+" 格点数",tex("L_x\\times L_y"),r?String(r.n):"—"],
    [sv?"希尔伯特维度":"Pauli 扇区",
      r?(sv?tex("2^N"):`共 ${tex("4^N")} 中的 ${r.full.toLocaleString()}`):"可达数目",
      r?r.dim.toLocaleString():"—"],
    ["阈值前沿速度",r?`${r.arrivals.length} 个到达壳层 · 有限尺寸拟合`:"至少需 2 个壳层",r&&isFinite(r.vB)?r.vB.toFixed(2):"—"],
    ["前沿后波动",r?tex(`\\sigma[C_${r.far}]`)+" · 到达后 2 单位时间":tex("\\sigma[C_r]"),
      r&&isFinite(r.std)?r.std.toFixed(3):"—"],
    ["能量投影贡献",tex("P_H"),r?r.plateau.toFixed(4):"—"],
    ["逃逸率 "+tex("\\lambda_W"),"单位 "+tex("1/t^2"),r?r.escape.toFixed(2):"—"],
  ] : [
    [tex("N")+" sites",tex("L_x\\times L_y"),r?String(r.n):"—"],
    [sv?"Hilbert dim":"Pauli sector",
      r?(sv?tex("2^N"):`of ${tex("4^N")} = ${r.full.toLocaleString()}`):"reachable",
      r?r.dim.toLocaleString():"—"],
    ["Threshold-front speed",r?`${r.arrivals.length} arrivals · finite-size fit`:"needs ≥2 shells",r&&isFinite(r.vB)?r.vB.toFixed(2):"—"],
    ["Behind-front variation",r?tex(`\\sigma[C_${r.far}]`)+" · arrival + 2":tex("\\sigma[C_r]"),
      r&&isFinite(r.std)?r.std.toFixed(3):"—"],
    ["Energy projection",tex("P_H"),r?r.plateau.toFixed(4):"—"],
    ["Escape rate "+tex("\\lambda_W"),"in "+tex("1/t^2"),r?r.escape.toFixed(2):"—"],
  ];
  $("readouts").innerHTML=cells.map(([k,u,v])=>
    `<div class="ro"><div class="k">${k}</div><div class="v">${v}</div><div class="u">${u}</div></div>`).join("");
  nowrapPunct($("readouts"));
}
function buildConeLegend(series){
  const box=$("conelegend"); box.textContent="";
  for(const s of series){
    const sp=document.createElement("span");
    sp.innerHTML=`<i class="swatch" style="background:${s.color}${s.thin?";opacity:.75":""}"></i>`;
    sp.appendChild(document.createTextNode(s.label));
    box.appendChild(sp);
  }
}
function syncResultView(){
  const sv=last?.engine==='statevec';
  const siteOpt=$('conemode').querySelector('option[value="site"]');
  const shellOpt=$('conemode').querySelector('option[value="shell"]');
  if(siteOpt){ siteOpt.disabled=sv; if(sv) $('conemode').value='shell'; }
  if(shellOpt) shellOpt.textContent=sv
    ? (curLang==='zh'?'代表点（每个距离选一点）':'representative sites (one per distance)')
    : (curLang==='zh'?'按距离壳层平均':'shell averages');
}
function renderResultContext(){
  const zh=curLang==='zh', r=last;
  if(!r){ $('resultcontext').textContent=zh?'选择模型后运行。所有曲线采用无限温度、Pauli 归一化（C ∈ [0,4]）。':'Choose a model and run. Infinite-temperature Pauli convention: C ∈ [0,4].'; return; }
  const p=r.spec, sv=r.engine==='statevec';
  const method=sv?(zh?'单随机态估计 · 每个距离一个代表点':'one random state · one representative per distance'):(zh?'全迹计算 · 所有格点':'full trace · all sites');
  const warning=sv?(zh?'单样本不能给出采样误差条；范数漂移仅检查数值演化。':'A single sample has no sampling error bar; norm drift only checks numerical evolution.'):(zh?'有限尺寸结果；阈值前沿速度不能直接当作热力学极限速度。':'Finite-size result; the threshold-front fit is not a thermodynamic-limit velocity.');
  const disorder=p.disorderMode!=='none'?` · ${zh?'无序':'disorder'} ${p.disorderMode}, ${p.disorderOp}, scale=${p.disorderStrength}, seed ${p.disorderSeed}`:'';
  $('resultcontext').innerHTML=`<strong>${dirty?(zh?'设置已改，显示上次结果':'Settings edited; showing previous result'):method}</strong><br>`+
    `${p.lx} × ${p.ly} · ${p.bc.toUpperCase()} · W = ${p.srcOp}, ${zh?'源点':'site'} ${p.src+1} · V = ${p.probeOp} · t ≤ ${p.tmax} · ${p.nt} ${zh?'时间点':'times'}${sv?' · typicality seed '+r.svSeed:''}${disorder}<br>${dirty?method+' · ':''}${warning}`;
}
function plot(r){
  syncResultView(); renderResultContext();
  const cone=$('cone'), mem=$('mem');
  if(!r){ cone.textContent=''; mem.textContent=''; $('conelegend').textContent=''; $('conecap').textContent=''; $('memcap').textContent=''; return; }
  const zh=curLang==='zh', sv=r.engine==='statevec', xs=Array.from(r.times);
  const bySite=!sv && $('conemode').value==='site';
  const shellOf=new Map(); r.dists.forEach((d,k)=>{ for(const j of r.shells.get(d)) shellOf.set(j,k); });
  const series=bySite?r.measuredSites.map(j=>({x:xs,y:Array.from(r.site[j]),
    color:cssvar(SHELL[Math.min(shellOf.get(j),SHELL.length-1)]),label:(zh?'格点 ':'site ')+(j+1),thin:j===r.spec.src}))
    :r.dists.map((d,k)=>({x:xs,y:Array.from(r.cone.get(d)),color:cssvar(SHELL[Math.min(k,SHELL.length-1)]),
      label:sv?`r=${d} · ${zh?'格点':'site'} ${r.representatives[k].site+1}`:`r = ${d}`,thin:d===0}));
  let ymax=2.3; for(const s of series) for(const v of s.y) if(Number.isFinite(v)) ymax=Math.max(ymax,v+0.1);
  drawLines(cone,series,{...chartBox(cone,0.33),right:sv?112:72,xmax:xs.at(-1),ymin:0,ymax:Math.ceil(ymax*10)/10,
    xtitle:zh?'时间 t（ℏ = 1）':'time t (ℏ = 1)',ytitle:bySite||sv?'C_j(t)':'C_r(t)',ref:2,
    refLabel:zh?'参考值 2':'reference 2',yfmt:v=>v.toFixed(1)});
  buildConeLegend(series);
  const scope=sv?(zh?'每个距离只计算图例所列代表格点，未计算其他同壳层格点。':'Only the listed representative sites are evaluated; other sites in each shell are unmeasured.'):
    bySite?(zh?'逐格点结果；同一距离的格点不一定等价。':'Per-site results; equal-distance sites need not be equivalent.'):
    (zh?'每条曲线是该距离壳层内所有格点的平均。':'Each curve averages all sites in that distance shell.');
  const fit=Number.isFinite(r.vB)?(zh?` C=0.5 的阈值到达拟合：v≈${r.vB.toFixed(2)}，${r.arrivals.length} 个壳层；应检查时间网格和尺寸收敛。`:
    ` C=0.5 arrival fit: v≈${r.vB.toFixed(2)} from ${r.arrivals.length} shells; check time-grid and size convergence.`):
    (zh?' 至少需要两个到达壳层及正的拟合斜率，才报告前沿速度。':'A front speed requires at least two arrived shells and a positive fitted slope.');
  $('conecap').textContent=scope+fit+(zh?' C=2 是参考值，不能单独证明完全打乱。':' C=2 is a reference value, not a standalone test of scrambling.');
  const raw=Array.from(r.mem), proj=raw.map(v=>v-r.plateau);
  const lo=Math.min(0,...raw,...proj), hi=Math.max(1,...raw,...proj);
  drawLines(mem,[{x:xs,y:raw,color:cssvar('--accent')},{x:xs,y:proj,color:cssvar('--warm')}],
    {...chartBox(mem,0.26),xmax:xs.at(-1),ymin:Math.floor(lo*10)/10,ymax:Math.ceil(hi*10)/10,
      xtitle:zh?'时间 t（ℏ = 1）':'time t (ℏ = 1)',ytitle:'A_W(t)',ref:0,refLabel:'0',yfmt:v=>v.toFixed(1)});
  $('memcap').textContent=zh?`橙线扣除能量投影 P_H=${r.plateau.toFixed(4)}。这只是沿 H 的守恒贡献；其他守恒量和简并也可贡献晚时记忆，不能把 P_H 等同于完整平台。`:
    `Orange subtracts the energy projection P_H=${r.plateau.toFixed(4)}. Other conserved quantities and degeneracies may retain memory; P_H is not generally the full late-time plateau.`;
}
function resultConfig(r){
  const p=r.spec;
  return {schema_version:3,engine:r.engine,integrator:'scaled_taylor',
    convention:'infinite-temperature normalized trace; Pauli eigenvalues ±1; hbar=1',
    sampling:r.sampling,sample_count:r.engine==='statevec'?1:null,
    sampling_standard_error:null,spatial_sampling:r.spatialSampling,
    seed:r.engine==='statevec'?r.svSeed:null,site_index_base:0,
    lattice:{lx:p.lx,ly:p.ly,boundary:p.bc},one_body:p.oneBody,
    two_body:p.twoBody.map(t=>({dx:t.dx,dy:t.dy,op_i:t.opA,op_j:t.opB,coeff:t.coeff})),
    on_site_disorder:{mode:p.disorderMode,distribution:p.disorderMode==='none'?null:p.disorderMode,
      axis:p.disorderOp,scale:p.disorderStrength,
      scale_meaning:p.disorderMode==='gaussian'?'standard_deviation':p.disorderMode==='none'?null:'amplitude',seed:p.disorderSeed,
      half_width:p.disorderMode==='uniform'?p.disorderStrength:null,
      standard_deviation:p.disorderMode==='gaussian'?p.disorderStrength:null,
      binary_amplitude:p.disorderMode==='binary'?p.disorderStrength:null,
      realized_terms:(p.siteBody||[]).map(t=>({site:t.site,op:t.op,coeff:t.coeff}))},
    source:{site:p.src,op:p.srcOp},probe:{op:p.probeOp},
    times:{t_max:p.tmax,n_points:p.nt},
    measured_sites:r.measuredSites,representatives:r.representatives??null,
    shells:Object.fromEntries(r.dists.map(d=>[d,r.shells.get(d)])),
    results:{dimension:r.dim,full_dimension:r.full,couplings:r.nnz,
      front_speed_estimate:Number.isFinite(r.vB)?r.vB:null,front_threshold:0.5,
      arrival_times:Object.fromEntries(r.arrivals),
      late_window_start:r.tCut,late_window_mean:r.mean,late_window_std:r.std,
      energy_projection:r.plateau,escape_rate:r.escape,norm_drift:r.normDrift},
    curves:{t:Array.from(r.times),A_W:Array.from(r.mem),
      C_by_distance:Object.fromEntries(r.dists.map(d=>[d,Array.from(r.cone.get(d))])),
      C_by_measured_site:Object.fromEntries(r.measuredSites.map(j=>[j,Array.from(r.site[j])]))}};
}
function exportText(){
  $('export').textContent=last?JSON.stringify(resultConfig(last),null,2):(curLang==='zh'?'运行完成后可导出。':'Complete a run to export.');
}
function csvText(){
  if(!last) return '';
  const r=last, sv=r.engine==='statevec';
  const head=['t','A_W','A_W_minus_energy_projection',...r.dists.map(d=>(sv?'C_representative_r':'C_shell_average_r')+d),...r.measuredSites.map(j=>'C_site'+j)];
  const rows=[head.join(',')];
  for(let k=0;k<r.times.length;k++) rows.push([r.times[k],r.mem[k],r.mem[k]-r.plateau,
    ...r.dists.map(d=>r.cone.get(d)[k]),...r.measuredSites.map(j=>r.site[j][k])].map(v=>v.toPrecision(12)).join(','));
  return rows.join('\n');
}
function downloadResult(kind){
  if(!last) return;
  const data=kind==='csv'?csvText():JSON.stringify(resultConfig(last),null,2);
  const url=URL.createObjectURL(new Blob([data],{type:kind==='csv'?'text/csv;charset=utf-8':'application/json'}));
  const a=document.createElement('a'); a.href=url; a.download=`otoc_${last.spec.lx}x${last.spec.ly}_${last.engine}.${kind}`;
  a.click(); setTimeout(()=>URL.revokeObjectURL(url),1000);
}
async function copy(text,btn){
  const old=btn.textContent;
  try{ await navigator.clipboard.writeText(text); btn.textContent=curLang==="zh"?"已复制":"Copied"; }
  catch{ $("export").textContent=text; btn.textContent=curLang==="zh"?"请手动选择下方文字":"Select the text below"; }
  setTimeout(()=>btn.textContent=old,1600);
}

async function run(){
  if(running) return;
  refreshQuiet();
  if(!sizeNote()) return;
  const spec=structuredClone(state), previous=last;
  clearDirty(); running=true; stopRequested=false;
  $('run').disabled=true; $('stop').hidden=false; $('stop').disabled=false;
  document.querySelectorAll('.ctl input,.ctl select,.ctl button').forEach(e=>e.disabled=true);
  document.body.classList.toggle('stale',!!last);
  const st=$('status'), pr=$('prog'), zh=curLang==='zh';
  st.className='status busy'; st.textContent=zh?'正在构建并演化…':'Building and evolving…';
  pr.hidden=false; pr.firstElementChild.style.width='0%';
  const t0=performance.now();
  try{
    await new Promise(r=>setTimeout(r,16));
    const engine=spec.engine==='statevec'?simulateStateVector:simulate;
    const result=await engine(spec,f=>{
      const percent=Math.max(0,Math.min(100,100*f));
      pr.firstElementChild.style.width=percent.toFixed(1)+'%';
      st.textContent=(curLang==='zh'?'正在演化… ':'Evolving… ')+`${percent.toFixed(0)}% · ${((performance.now()-t0)/1000).toFixed(1)} s`;
    },()=>stopRequested);
    last=result; lastSecs=(performance.now()-t0)/1000; lastN=last.n;
    clearDirty(); renderRunSummary();
  }catch(e){
    last=previous; dirty=!!last;
    st.className=e.name==='AbortError'?'status':'status err';
    st.textContent=e.name==='AbortError'?(curLang==='zh'?'已停止；保留上次完成的结果。':'Stopped; the last completed result is preserved.'):e.message;
    $('runnote').textContent='';
  }finally{
    running=false; $('run').disabled=false; $('stop').hidden=true; pr.hidden=true;
    document.querySelectorAll('.ctl input,.ctl select,.ctl button').forEach(e=>e.disabled=false);
    if(PAGE_DIMENSION==="1d"){ $("ly").disabled=true; $("srcy").disabled=true; }
    renderDisorderPreview();
    document.body.classList.toggle('stale',dirty);
    $('run').classList.toggle('needs',dirty);
    setReadouts(last); plot(last); exportText();
  }
}
function renderRunSummary(){
  if(!last||running&&stopRequested) return;
  const r=last, zh=curLang==='zh', sv=r.engine==='statevec';
  const st=$('status');st.className=r.normDrift>1e-8?'status err':'status';
  st.textContent=(sv?(zh?'希尔伯特维度 ':'Hilbert dimension '):(zh?'Pauli 扇区 ':'Pauli sector '))+
    `${r.dim.toLocaleString()} · ${r.nnz.toLocaleString()} ${zh?'非零项':'nonzeros'} · ${lastSecs.toFixed(1)} s · `+
    (zh?'范数漂移 ':'norm drift ')+r.normDrift.toExponential(1);
  $('runnote').textContent=r.escape===0
    ?(zh?'源算符守恒：A_W(t)=1。不同格点的对易子为零；源点处若 W 与 V 反对易，则 C=4。':'The source is conserved: A_W(t)=1. Other-site commutators vanish; at the source C=4 when W and V anticommute.')
    :r.normDrift>1e-8?(zh?'范数漂移偏大，请缩短演化时间并检查收敛。':'Large norm drift: shorten the evolution and check convergence.') :'';
}

function applyPreset(key){
  const p=PRESETS[key]; if(!p) return;
  state.lx=p.lx; state.ly=PAGE_DIMENSION==="1d"?1:p.ly; state.bc=p.bc; state.tmax=p.tmax;
  state.oneBody=p.one.map(([op,coeff])=>({op,coeff}));
  state.twoBody=p.two.map(([dx,dy,opA,opB,coeff])=>({dx,dy,opA,opB,coeff}));
  state.src=Math.floor(p.lx/2)+p.lx*Math.floor(p.ly/2);
  $("lx").value=p.lx; $("ly").value=p.ly; $("bc").value=p.bc; $("tmax").value=p.tmax;
  rebuildSiteDisorder(); syncSourceControls();
  renderTerms(); drawLattice(); refresh();
}

/* theme toggle */
$("theme").addEventListener("click",()=>{
  const root=document.documentElement;
  const dark=root.getAttribute("data-theme")==="dark" ||
    (!root.hasAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
  root.setAttribute("data-theme",dark?"light":"dark");
  drawLattice(); plot(last);
});
/* language toggle: re-renders every static and dynamic string in place,
   without touching state.* or re-running the simulation */
$("lang").addEventListener("click",()=>{
  curLang = curLang==="en" ? "zh" : "en";
  applyLang();
  renderFormula(); renderDisorderPreview(); drawLattice(); sizeNote();
  setReadouts(last); plot(last); if(!running) renderRunSummary(); exportText();
});
$("preset").addEventListener("change",e=>{
  if(e.target.value==="custom") return;      // nothing to load — keep the current terms
  applyPreset(e.target.value); run();
});
$("add1").addEventListener("click",()=>{ state.oneBody.push({op:"X",coeff:-1}); renderTerms(); refresh(); });
$("add2").addEventListener("click",()=>{ state.twoBody.push({dx:1,dy:0,opA:"Z",opB:"Z",coeff:-1}); renderTerms(); drawLattice(); refresh(); });
$("generateDisorder").addEventListener("click",()=>{
  if(state.disorderMode==="none") return;
  const next=((Number.parseInt($("disorderSeed").value)||0)+1)>>>0;
  $("disorderSeed").value=String(next); refresh(); drawLattice();
});
for(const id of ["lx","ly","bc"]) $(id).addEventListener("change",()=>{ refresh(); drawLattice(); });
for(const id of ["srcop","srcx","srcy","probeop","tmax","svseed"]) $(id).addEventListener("change",()=>{ refresh(); drawLattice(); });
for(const id of ["disorderMode","disorderOp","disorderStrength","disorderSeed"])
  $(id).addEventListener("change",()=>{ refresh(); drawLattice(); });
// nt's own edit is the one input autoClampStatevecNt() (inside refresh())
// deliberately leaves alone -- a deliberate "yes, run it long" should be
// respected, with the honest time estimate in sizeNote() as the only pushback.
$("nt").addEventListener("change",()=>{ suppressAutoClamp=true; refresh(); drawLattice(); suppressAutoClamp=false; });
$("engine").addEventListener("change",()=>{
  // the state-vector engine's cost is dominated by per-time-point backward
  // evolutions (see the "bigger machine" note) in a way the Pauli engine's
  // cost never is (it doesn't depend on nt at all), so a large nt left over
  // from Pauli-engine use needs to come down here. refresh() below calls
  // autoClampStatevecNt(), which does this based on an actual cost estimate
  // (sees any lattice size, not just a flat "nt>30" cutoff).
  refresh(); drawLattice();
});
$("copycfg").addEventListener("click",e=>{ exportText(); copy($("export").textContent,e.target); });
$("copycsv").addEventListener("click",e=>copy(csvText(),e.target));
$("downloadcfg").addEventListener("click",()=>downloadResult('json'));
$("downloadcsv").addEventListener("click",()=>downloadResult('csv'));
$("stop").addEventListener("click",()=>{stopRequested=true;$("stop").disabled=true;});
$("run").addEventListener("click",run);
$("conemode").addEventListener("change",()=>plot(last));
let resizeTimer=null;
addEventListener("resize",()=>{ clearTimeout(resizeTimer);
  resizeTimer=setTimeout(()=>{ drawLattice(); plot(last); },150); });

configureDimensionPage();
applyLang();
renderMath(document);
applyPreset(PAGE_DIMENSION==="1d"?"mfi1d":"mfi2d");
setReadouts(null);
renderResultContext();
run();
