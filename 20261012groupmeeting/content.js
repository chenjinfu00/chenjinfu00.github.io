/* Bilingual 30-minute talk. Scientific claims retain their source provenance. */
window.DECK = {
  "title": {
    "en": "From Bell Facets to Quantum Resources",
    "zh": "从 Bell facets 到量子资源"
  },
  "subtitle": {
    "en": "Choosing a test, proving its resource requirement, and scaling its certificates",
    "zh": "选择检验、证明资源需求，再把认证推广到多体系统"
  },
  "languages": [
    "en",
    "zh"
  ],
  "defaultLanguage": "en",
  "totalDuration": 1800,
  "date": "2026-10-11",
  "slides": [
    {
      "id": "opening",
      "section": {
        "en": "The problem",
        "zh": "研究问题"
      },
      "title": {
        "en": "From Bell Facets to Quantum Resources",
        "zh": "从 Bell facets 到量子资源"
      },
      "duration": 30,
      "layout": "title",
      "bullets": {
        "en": [
          "Each endpoint has a biseparable maximizer.",
          "A weighted pair can select a tripartite state and private outputs."
        ],
        "zh": [
          "每个端点都能由双可分态达到最大值。",
          "加权组合却可以确定三方态，并认证输出的私密性。"
        ]
      },
      "notes": {
        "en": "Each endpoint of our Bell pair has a biseparable maximizer. Yet one weighted score, evaluated with shared measurements, can identify a tripartite state and private outputs. The story is how to choose such a test, prove its resource requirement, and quantify what survives experimental error. Our earlier three papers supply the starting design tools.",
        "zh": "这对 Bell 检验的每个端点都能由双可分态达到最大值。但共用测量的加权得分可以确定三方态，并认证私密输出。今天的主线是如何选择这样的检验、证明它的资源需求，再量化实验误差下还保留什么。此前三篇工作提供这条路线的设计起点。"
      },
      "sources": [],
      "subtitle": {
        "en": "What a pair of shared-measurement Bell scores can certify",
        "zh": "两个共用测量的 Bell 得分，能够认证什么？"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "What is the central result?",
          "zh": "今天的核心结果是什么？"
        },
        "takeaway": {
          "en": "Combining compatible scores can demand a resource neither endpoint alone certifies.",
          "zh": "共用测量的得分组合，可以要求单个端点无法认证的资源。"
        },
        "transition": {
          "en": "This starts from the same design question as our previous three papers.",
          "zh": "这个问题延续了前三篇文章中的 Bell 检验设计问题。"
        }
      },
      "formula": null
    },
    {
      "id": "lineage",
      "section": {
        "en": "Earlier work · 0–5 min",
        "zh": "此前工作 · 0–5 分钟"
      },
      "title": {
        "en": "Three papers progressively constrain Bell-test design",
        "zh": "前三篇文章逐步明确 Bell 检验的设计约束"
      },
      "duration": 60,
      "layout": "roadmap",
      "bullets": {
        "en": [
          "<strong>Find a facet by optimization</strong><br>Optimizing quantum violation yields facet Bell inequalities<br><span class=\"small\">arXiv:2511.07523 · supplied revised title</span>",
          "<strong>Certify structured many-body families</strong><br>Optimizing and Certifying Multipartite Permutationally Invariant Bell Inequalities<br><span class=\"small\">arXiv:2607.08462</span>",
          "<strong>Design around accessible correlations</strong><br>Experimental certification of multipartite Bell correlations using only few-body symmetric correlations<br><span class=\"small\">arXiv:2609.37442</span>"
        ],
        "zh": [
          "<strong>通过优化找到 facet</strong><br>Optimizing quantum violation yields facet Bell inequalities<br><span class=\"small\">arXiv:2511.07523 · 作者提供的更新稿标题</span>",
          "<strong>认证有结构的多体家族</strong><br>Optimizing and Certifying Multipartite Permutationally Invariant Bell Inequalities<br><span class=\"small\">arXiv:2607.08462</span>",
          "<strong>围绕可测关联项设计检验</strong><br>Experimental certification of multipartite Bell correlations using only few-body symmetric correlations<br><span class=\"small\">arXiv:2609.37442</span>"
        ]
      },
      "notes": {
        "en": "These are three stages of one design problem, rather than three unrelated applications. First, optimize coefficients and ask why the result becomes tight. Second, exploit collective structure so that a many-body quantum claim can be certified. Third, choose correlators that can actually be measured with useful noise tolerance. The first title is the supplied revised manuscript title; its linked public arXiv version still carries the older title. Today we add a further constraint: specify the model that the observed score must exclude. I will spend five minutes on these starting points and most of the talk on the pivoting result.",
        "zh": "这三篇工作分别补上同一个设计问题的一部分：第一篇优化系数，并解释结果为什么会变紧；第二篇利用集体结构，使多体量子界能够得到认证；第三篇选择实验能测量、且有实用噪声容忍度的关联项。第一篇这里采用作者提供的更新稿标题，链接的公开 arXiv 版本仍使用旧标题。今天进一步加入一个约束：明确得分要排除哪一类量子资源模型。背景控制在五分钟左右，把主要时间留给 pivoting。"
      },
      "sources": [
        {
          "label": "arXiv:2511.07523",
          "url": "https://arxiv.org/abs/2511.07523"
        },
        {
          "label": "arXiv:2607.08462",
          "url": "https://arxiv.org/abs/2607.08462"
        },
        {
          "label": "arXiv:2609.37442",
          "url": "https://arxiv.org/abs/2609.37442"
        }
      ],
      "subtitle": {
        "en": "Find a tight objective → control many-body bounds → make the observables measurable",
        "zh": "找到紧见证 → 控制多体界 → 选出实验可测的关联项"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "How do the three papers lead to this project?",
          "zh": "前三篇文章如何引出这个课题？"
        },
        "takeaway": {
          "en": "The objective must be tight, certifiable, and suited to the measurement task.",
          "zh": "Bell 目标需要紧、可以认证，并适合具体测量任务。"
        },
        "transition": {
          "en": "The first step is to understand why coefficient optimization reaches a facet.",
          "zh": "先解释第一步：系数优化为什么会到达 facet。"
        }
      },
      "formula": null
    },
    {
      "id": "ratio-design",
      "section": {
        "en": "Earlier work · find the objective",
        "zh": "此前工作 · 找到目标"
      },
      "title": {
        "en": "Optimization supplies a tight starting witness",
        "zh": "优化给出一个紧见证作为起点"
      },
      "duration": 80,
      "layout": "chart",
      "bullets": {
        "en": [
          "A nondegenerate ratio maximum is a facet.",
          "A flat maximum can be tightened without lowering the ratio.",
          "This supplies a witness; its resource requirement is still a separate question."
        ],
        "zh": [
          "非退化的比值极大点对应 facet。",
          "平坦极大点可以在不降低比值的条件下收紧。",
          "这给出一个见证；它要求什么量子资源仍需单独判断。"
        ]
      },
      "notes": {
        "en": "Normalize the uniform score to zero and the local minimum to minus one, after removing equivalent coefficient directions. The exact optimized ratio is a convex support function on the polar local polytope. A nondegenerate local maximum must be at a polar vertex, hence at a facet witness. If the maximum is flat inside a face, the active-preserving directions allow tightening to an extreme point without decreasing the ratio. The supplied illustration tracks added active local vertices. Restricted coefficients give facets of the projected polytope; a numerical see-saw value is only an attained value unless separately certified. The convex principle and fixed-behavior facet extraction have precedents, including Schwarz et al. The revised local-flatness formulation is the precise statement of this paper. Once we have a tight witness, the next difficulty is its many-body quantum bound.",
        "zh": "把均匀行为的得分规范为零、局域最小值规范为负一，并去掉等价系数方向。精确优化后的比值是极局域多面体上的凸支撑函数。非退化局部极大点必须落在极点上，对应 facet；如果极大点在一个面内平坦，就能沿保持活跃顶点的方向收紧到极点，且比值不下降。图中展示新增活跃局域顶点的过程。限制系数时，facet 属于投影多面体；数值 see-saw 得分仍需要另行认证量子上界。凸几何原则和固定行为的 facet 提取已有 Schwarz 等的先例。更新稿明确的是局部平坦性与极面收紧的精确表述。有了紧见证，下一步是控制它的多体量子界。"
      },
      "sources": [
        {
          "label": "Optimizing quantum violation yields facet Bell inequalities",
          "url": "https://arxiv.org/abs/2511.07523"
        },
        {
          "label": "Schwarz et al. 2016 · facet extraction precedent",
          "url": "https://arxiv.org/abs/1511.05253"
        }
      ],
      "formula": "\\[I(P_{\\mathrm{uni}})=0,\\qquad\\beta_C=-1,\\qquad\\Delta=\\beta_{\\mathrm{var}}/\\beta_C\\]",
      "subtitle": {
        "en": "Earlier paper: the geometry of a local maximum in coefficient space",
        "zh": "第一篇：系数空间中局部最大值的几何"
      },
      "asset": "illustration_round1.png",
      "assetAlt": {
        "en": "Supplied manuscript diagram: adding active classical vertices moves coefficients from T1 through T2 to the facet T3 in primal and polar spaces.",
        "zh": "作者提供的示意图：逐步加入活跃经典顶点，系数由 T1 经 T2 移动到 facet T3；左为原始空间，右为极空间。"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "Why begin with facets?",
          "zh": "为什么从 facets 出发？"
        },
        "takeaway": {
          "en": "Coefficient optimization and tightening provide tight Bell objectives.",
          "zh": "系数优化与收紧给出紧 Bell 目标。"
        },
        "transition": {
          "en": "The next question is whether the quantum bound remains manageable at many parties.",
          "zh": "下一步要让多体量子界仍然可控。"
        }
      }
    },
    {
      "id": "pi-design",
      "section": {
        "en": "Earlier work · certify the bound",
        "zh": "此前工作 · 认证界"
      },
      "title": {
        "en": "Collective structure makes the many-body bound tractable",
        "zh": "集体结构让多体界变得可处理"
      },
      "duration": 60,
      "layout": "split",
      "bullets": {
        "en": [
          "Rank-one two-body coefficients simplify classical optimization.",
          "Specified paired families have certified leading large-\\(N\\) values.",
          "Their asymptotic ratios improve: \\(\\frac54\\to\\frac97\\to\\cdots\\to\\coth(1)\\)."
        ],
        "zh": [
          "秩一二体系数简化了经典优化。",
          "特定配对家族的主要大 \\(N\\) 阶量子值得到认证。",
          "渐近比值依次改善：\\(\\frac54\\to\\frac97\\to\\cdots\\to\\coth(1)\\)。"
        ]
      },
      "notes": {
        "en": "The PI follow-up asks how to retain useful witnesses when the number of particles grows. Collective one- and two-body observables, together with rank-one two-body coefficients, reduce the classical problem and expose a tractable quantum construction. Within the studied paired families, more settings improve the asymptotic ratio toward coth one. Moment or sum-of-squares certificates match the leading large-particle-number value for those families. This does not optimize over all PI inequalities or certify every finite-size variational value. The methodological lesson is that a candidate and an upper certificate must be developed together. The experiment then adds another constraint: which correlations can we measure?",
        "zh": "PI 后续工作研究粒子数增大后如何保留有用的见证。集体一体、二体关联加上秩一二体系数，简化经典优化并给出可处理的量子构造。在研究的配对家族中，增加设置让渐近比值趋近 coth one，矩或平方和证书匹配这些家族的主要大粒子数阶量子值。这没有优化所有 PI 不等式，也没有认证每个有限尺寸变分值。这里留下的方法是：候选目标与上界证书要一起设计。实验又进一步要求关联项本身能够被测量。"
      },
      "sources": [
        {
          "label": "Optimizing and Certifying Multipartite Permutationally Invariant Bell Inequalities",
          "url": "https://arxiv.org/abs/2607.08462"
        }
      ],
      "formula": "\\[I=\\sum_k\\alpha_k\\langle S_k\\rangle+\\frac12\\sum_{kl}\\gamma_k\\gamma_l\\langle S_{kl}\\rangle\\]",
      "subtitle": {
        "en": "PIBell: one- and two-body witnesses with structured coefficients",
        "zh": "PIBell：具有结构系数的一体、二体见证"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "How do we control many-body quantum claims?",
          "zh": "怎样控制多体量子结论？"
        },
        "takeaway": {
          "en": "Use collective structure and match constructions with upper certificates.",
          "zh": "利用集体结构，让构造与上界证书匹配。"
        },
        "transition": {
          "en": "A certified objective must also fit the observables available in an experiment.",
          "zh": "得到认证的目标还要适合实验可测的观测量。"
        }
      }
    },
    {
      "id": "fewbody-experiment",
      "section": {
        "en": "Earlier work · measure the witness",
        "zh": "此前工作 · 测量见证"
      },
      "title": {
        "en": "Different correlations improve noise tolerance",
        "zh": "不同关联项改善噪声容忍度"
      },
      "duration": 70,
      "layout": "chart",
      "bullets": {
        "en": [
          "Six-qubit theoretical noise tolerance: \\(4.8\\%\\to30.1\\%\\).",
          "Postselected six/eight-photon violations: \\(32\\sigma\\;/\\;8.9\\sigma\\).",
          "Design lesson: optimize the test for a specified source and task."
        ],
        "zh": [
          "六比特理论噪声容忍度：\\(4.8\\%\\to30.1\\%\\)。",
          "后选择六／八光子违背：\\(32\\sigma\\;/\\;8.9\\sigma\\)。",
          "设计启示：围绕指定源和任务选择检验。"
        ]
      },
      "notes": {
        "en": "For the same six-qubit Dicke target and two settings, adding selected symmetric four-body terms to two-body terms increases theoretical white-state-noise tolerance from 4.8 percent to 30.1 percent. The observed postselected six- and eight-photon violations are 32 and 8.9 standard deviations. Noise tolerance and observed significance are different quantities. Few-body correlators are still obtained from many-photon coincidence records, with fair sampling; this is not a loophole-free implementation of today’s pivot witness. Its role in the story is the design lesson: changing the objective can change what the same source lets us certify. We now return to three parties, where the geometry can be completely classified, and change the excluded model from local correlations to quantum biseparability.",
        "zh": "对同一个六比特 Dicke 目标态、两个测量设置，在二体项中加入选定的对称四体项，让理论白态噪声容忍度从 4.8% 提升到 30.1%。后选择六光子、八光子实验的违背分别达到 32 和 8.9 个标准差。理论容忍度与观测显著度是两种不同指标。少体关联仍来自多光子符合记录，并使用公平抽样；这个实验没有实现今天的 pivot 见证。它在故事中的作用是说明：改变目标函数，能改变同一个源可以认证什么。接下来回到能够完整分类的三方基准，把要排除的模型从局域关联改为量子双可分关联。"
      },
      "sources": [
        {
          "label": "Experimental certification of multipartite Bell correlations using only few-body symmetric correlations",
          "url": "https://arxiv.org/abs/2609.37442"
        }
      ],
      "asset": "experimental.svg",
      "subtitle": {
        "en": "Same target and two settings: adding accessible four-body terms improves noise tolerance",
        "zh": "相同目标态、两个设置：加入可测四体项改善噪声容忍度"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "Why is objective design physically useful?",
          "zh": "设计目标函数为什么有物理意义？"
        },
        "takeaway": {
          "en": "Different accessible witnesses can detect different noisy-source regimes.",
          "zh": "不同可测见证能覆盖不同的噪声源区间。"
        },
        "transition": {
          "en": "Today we change the certification task: can the score rule out every biseparable realization?",
          "zh": "今天改变认证任务：得分能否排除所有双可分实现？"
        }
      },
      "formula": null
    },
    {
      "id": "shared-tests",
      "section": {
        "en": "Pivoting · change the resource question",
        "zh": "Pivoting · 改变资源问题"
      },
      "title": {
        "en": "An endpoint violation need not certify tripartite entanglement",
        "zh": "单个端点的违背未必认证三方纠缠"
      },
      "duration": 90,
      "layout": "statement",
      "bullets": {
        "en": [
          "Two lifted-CHSH facets, each with local bound \\(1\\).",
          "Each endpoint: \\(h_Q=h_{\\mathrm{BS}}=2\\sqrt2-1\\).",
          "An observed score above \\(h_{\\mathrm{BS}}\\) excludes every quantum-biseparable realization."
        ],
        "zh": [
          "两个 lifted-CHSH facets，局域界均为 \\(1\\)。",
          "每个端点：\\(h_Q=h_{\\mathrm{BS}}=2\\sqrt2-1\\)。",
          "观测得分超过 \\(h_{\\mathrm{BS}}\\)，才排除所有量子双可分实现。"
        ]
      },
      "notes": {
        "en": "Bell nonlocality rules out local hidden-variable correlations. Genuine tripartite entanglement asks more: can any quantum-biseparable state, across any of the three cuts or a mixture of cuts, reproduce the score? A lifted CHSH maximum can use a deterministic third party and an entangled pair, so these endpoints answer the first question but not the second. Form the weighted score shown here. Both components must use one state and one complete measurement tuple at each weight; their measurements cannot be optimized separately. The state and measurements may change when the weight changes. If the unrestricted support exceeds the actual all-cut biseparable support, the joint score becomes a GME witness. This is a different resource benchmark from Svetlichny-type genuine multipartite nonlocality. We now need a systematic way to choose the pair.",
        "zh": "Bell 非局域性排除局域隐变量关联；真正三方纠缠要求进一步排除任何切分上的量子双可分态，以及不同切分的混合。Lifted CHSH 最大值可以由一个确定性的第三方与一个纠缠对达到，所以这些端点能排除局域模型，却不能排除双可分模型。把两项写成图中的加权得分。每个权重下必须使用同一个态和完整测量组，不能分别优化两个分量；改变权重时可以重新优化实现。如果完整量子支撑高于实际全切分双可分支撑，这个组合就成为 GME 见证。这里的资源模型与 Svetlichny 型真正多方非局域性不同。接下来需要系统地选择配对。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "formula": "\\[H_p=pf+(1-p)g,\\qquad\\Delta_p=h_Q(H_p)-h_{\\mathrm{BS}}(H_p)\\]",
      "backup": false,
      "subtitle": {
        "en": "Three parties, two settings, binary outcomes; maximum-score convention from here onward",
        "zh": "三方、两个设置、二元结果；以下统一使用最大得分规范"
      },
      "story": {
        "question": {
          "en": "What resource does the new task exclude?",
          "zh": "新任务要排除什么资源模型？"
        },
        "takeaway": {
          "en": "The relevant margin is quantum minus actual all-cut biseparable support.",
          "zh": "关键余量是量子支撑减去实际全切分双可分支撑。"
        },
        "transition": {
          "en": "Pivoting supplies a controlled set of candidate pairs.",
          "zh": "Pivoting 给出一组可以受控比较的候选配对。"
        }
      }
    },
    {
      "id": "pivot-geometry",
      "section": {
        "en": "Pivoting · select the pairs",
        "zh": "Pivoting · 选择配对"
      },
      "title": {
        "en": "A ridge pivot gives a neighboring tight test",
        "zh": "跨过一个 ridge，得到相邻的紧检验"
      },
      "duration": 90,
      "layout": "chart",
      "bullets": {
        "en": [
          "A ridge is the shared boundary of two facets.",
          "Enumerate the boundary, pivot, and validate the other facet.",
          "Completeness comes from closing every required boundary task."
        ],
        "zh": [
          "一个 ridge 是两个 facets 的共同边界。",
          "枚举边界，执行 pivot，并验证另一 facet。",
          "每个必要边界任务闭合，才得到完整性。"
        ]
      },
      "notes": {
        "en": "Think of a tight Bell witness as one face of the local polytope. A ridge is one dimension lower and is shared by exactly two facets. Crossing it gives a second tight test, so this produces comparable pairs without treating coefficient changes as arbitrary. Recursive face expansion handles hard boundary tasks by descending to lower-dimensional tight-vertex polytopes. A task is complete only when its boundary and all required pivots close. In the three-party binary two-setting scenario, the local polytope has dimension 26 and 64 deterministic vertices; the construction reproduces all 46 known facet classes. Pivoting and the classification are established geometry. The contribution we examine is the resource analysis on the resulting physical pairs. That last adjective matters: class labels suppress relative orientation.",
        "zh": "把紧 Bell 见证看作局域多面体上的一个面。Ridge 比 facet 低一维，由恰好两个 facets 共享；跨过去就得到第二个紧检验，使系数变化成为有几何控制的配对。递归面展开把困难边界任务降到低维紧顶点多面体；边界与所有必要 pivots 闭合后，任务才算完成。三方、二设置、二元结果的局域多面体维数为 26，有 64 个确定性顶点，构造复现全部 46 个已知 facet 类。Pivoting 与分类本身是已有几何。这里要研究的新内容是得到的物理配对上的资源支撑。物理取向很重要，因为类别标签会隐藏相对取向。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "expansion.svg",
      "backup": false,
      "subtitle": {
        "en": "A systematic geometric comparison in the complete three-party benchmark",
        "zh": "在完整三方基准中做系统的几何比较"
      },
      "story": {
        "question": {
          "en": "How are the pairs selected?",
          "zh": "如何系统选择配对？"
        },
        "takeaway": {
          "en": "Ridge pivots give validated physical neighbors of a tight witness.",
          "zh": "Ridge pivots 给出经过验证的物理相邻见证。"
        },
        "transition": {
          "en": "We must resolve physical orientations before comparing their resources.",
          "zh": "比较资源前，必须恢复类别图隐藏的物理取向。"
        }
      },
      "formula": null
    },
    {
      "id": "orientation-census",
      "section": {
        "en": "Pivoting · resolve orientation",
        "zh": "Pivoting · 恢复取向"
      },
      "title": {
        "en": "One facet class hides fourteen different pair orientations",
        "zh": "同一 facet 类中隐藏十四种配对取向"
      },
      "duration": 80,
      "layout": "chart",
      "bullets": {
        "en": [
          "\\(96\\) orientations; \\(95\\) partners in \\(14\\) pair orbits.",
          "Adjacent: \\(39\\) partners in \\(8\\) ridge orbits.",
          "All midpoints are classified; all eight ridge orbits are solved for every weight."
        ],
        "zh": [
          "\\(96\\) 种取向；\\(95\\) 个伙伴分为 \\(14\\) 个配对轨道。",
          "相邻配对：\\(39\\) 个伙伴，\\(8\\) 个 ridge 轨道。",
          "全部中点完成分类；八个 ridge 轨道完成全权重分析。"
        ]
      },
      "notes": {
        "en": "Every lifted-CHSH orientation belongs to Sliwa class four and has the same optimized endpoint height. On the class graph, adjacency between two such facets appears only as a self-loop. It cannot distinguish the experiments represented by their different relative settings and outcome labels. Fix one of the 96 physical facets and quotient the other 95 only by its stabilizer. This leaves 14 pair orbits: eight adjacent and six nonadjacent. The local bound stays one because each pair shares tight deterministic strategies. We solve all 14 midpoint comparisons, and the eight ridge orbits over the whole weight interval. This is a controlled census, not a complete all-weight solution of the nonadjacent pairs. Its first positive example has an elementary curve.",
        "zh": "所有 lifted-CHSH 取向都属于 Sliwa 第四类，且端点优化高度相同。在类别图上，它们之间的邻接只表现为自环，无法区分不同相对设置、结果标记所对应的实验。固定 96 个物理 facets 中的一个，仅用它的稳定子对其余 95 个伙伴取商，得到 14 个配对轨道：八个相邻、六个非相邻。每对都有共同的饱和确定性策略，因此局域界保持为一。我们完成全部 14 个中点比较，以及八个 ridge 轨道的全权重分析；非相邻轨道没有全部完成全权重求解。先看一个具有简单曲线的正间隙例子。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "census.svg",
      "backup": false,
      "subtitle": {
        "en": "Fix one lifted-CHSH facet; retain the relative labeling of its partner",
        "zh": "固定一个 lifted-CHSH facet，保留伙伴的相对标记"
      },
      "story": {
        "question": {
          "en": "What is lost by the class quotient?",
          "zh": "类别取商隐藏了什么？"
        },
        "takeaway": {
          "en": "Equal endpoint classes still allow different shared-measurement resource curves.",
          "zh": "端点类别相同，共用测量的资源曲线仍可能不同。"
        },
        "transition": {
          "en": "R3 shows the distinction between a large violation and a positive resource margin.",
          "zh": "R3 首先展示大违背量与正资源余量的区别。"
        }
      },
      "formula": null
    },
    {
      "id": "r3-transition",
      "section": {
        "en": "Pivoting · the first resource transition",
        "zh": "Pivoting · 第一个资源转变"
      },
      "title": {
        "en": "A lower score can require tripartite entanglement",
        "zh": "更低的得分可以要求真正三方纠缠"
      },
      "duration": 100,
      "layout": "chart",
      "bullets": {
        "en": [
          "Midpoint: \\(h_Q=\\frac32>h_{\\mathrm{BS}}=\\sqrt2\\).",
          "A strict GME gap exists only in the central interval.",
          "The endpoint score is larger and biseparably attainable."
        ],
        "zh": [
          "中点：\\(h_Q=\\frac32>h_{\\mathrm{BS}}=\\sqrt2\\)。",
          "只有中央权重区间具有严格 GME 间隙。",
          "端点得分更大，却能由双可分态达到。"
        ]
      },
      "notes": {
        "en": "Read the two curves together. The quantum maximum decreases from the endpoint height to three halves at the midpoint, yet the actual biseparable support drops further to square root two. Thus a smaller Bell score can certify a stronger resource. With \\(t\\) equal to the absolute weight imbalance and \\(k\\) equal to square root two minus one, the exact gap is one half of the squared positive part of \\(k-t\\). It is positive precisely in the interval shown. Both bounds include all finite local dimensions and binary POVMs, rather than a chosen state ansatz. Holz et al. already obtained the same midpoint numbers for a different Bell functional. The present result is this specified full interpolation and its classification within the ridge census. The next question is whether this behavior is typical among the eight ridge orbits.",
        "zh": "把两条曲线一起读：量子最大值从端点下降到中点的三除以二，但实际双可分支撑下降得更多，到根号二。因此更小的 Bell 得分反而可以认证更强的资源。令 \\(t\\) 为权重不平衡的绝对值、\\(k\\) 为根号二减一，精确间隙是 \\(k-t\\) 的正部平方再除以二，只在图中中央区间为正。两个界覆盖有限局域维数和二元 POVM，并非仅优化某个态的 ansatz。Holz 等在另一个 Bell 泛函上已经给出相同中点数值；这里的结果是指定配对的完整插值，以及它在 ridge 分类中的位置。接下来判断八个 ridge 轨道中还有哪些具有这种资源间隙。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript · R3 exact theorem",
          "url": ""
        },
        {
          "label": "Holz et al. · known midpoint precedent",
          "url": "https://doi.org/10.1103/PhysRevResearch.2.023251"
        }
      ],
      "asset": "r3-curve.svg",
      "formula": "\\[1-\\frac1{\\sqrt2}<p<\\frac1{\\sqrt2}\\]",
      "subtitle": {
        "en": "R3: an exact transition along one ridge family",
        "zh": "R3：一个 ridge 家族上的精确转变"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "Can a weaker violation certify a stronger resource?",
          "zh": "更小的违背能否认证更强的资源？"
        },
        "takeaway": {
          "en": "Yes: compare the score to the excluded-resource bound, not just the local bound.",
          "zh": "可以：需要比较被排除资源的界，而不仅是局域界。"
        },
        "transition": {
          "en": "The complete ridge census tells us how many families do this.",
          "zh": "完整 ridge 分类回答哪些家族具有这种性质。"
        }
      }
    },
    {
      "id": "all-ridges",
      "section": {
        "en": "Pivoting · complete classification",
        "zh": "Pivoting · 完整分类"
      },
      "title": {
        "en": "The complete ridge census separates three behaviors",
        "zh": "完整 ridge 分类区分三种行为"
      },
      "duration": 70,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>R3 · \\(192\\) physical edges</strong><br>Strict gap only in the central interval.",
          "<strong>R5 · \\(768\\) physical edges</strong><br>Strict gap at every interior weight.",
          "<strong>Six other orbits · \\(912\\) physical edges</strong><br>Quantum and biseparable supports coincide at every weight."
        ],
        "zh": [
          "<strong>R3 · \\(192\\) 条物理边</strong><br>只在中央区间有严格间隙。",
          "<strong>R5 · \\(768\\) 条物理边</strong><br>所有内部权重都有严格间隙。",
          "<strong>其余六轨道 · \\(912\\) 条物理边</strong><br>所有权重上量子与双可分支撑相同。"
        ]
      },
      "notes": {
        "en": "This is the complete result for adjacent class-four pairs, not a collection of selected successful examples. Of the eight ridge orbits, R3 gives a central transition, R5 gives a positive gap throughout the open interval, and six give no support gap at any weight. The edge counts refer to the physical facet graph: 192, 768, and 912. A zero gap means that a biseparable strategy can attain the optimum; it does not classify every maximizing state. This makes the novel classification precise while showing that adjacency alone is insufficient. The nonadjacent controls test the other direction: is adjacency necessary, or can orientation produce similar effects without a ridge?",
        "zh": "这不是挑出的几个成功例子，而是相邻第四类配对的完整结果。八个 ridge 轨道中，R3 只在中央转变，R5 在整个开区间有正间隙，其余六个在所有权重上没有支撑间隙。192、768、912 是物理 facet 图上的边数。零间隙表示有双可分策略达到最大值，并不把所有最大态都分类为双可分态。这个分类明确了具体贡献，也说明邻接本身并不充分。非相邻对照进一步检验另一方向：资源间隙是否一定需要 ridge？"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "backup": false,
      "subtitle": {
        "en": "Same endpoint class and heights; different resource requirements",
        "zh": "相同端点类别与高度，不同资源需求"
      },
      "story": {
        "question": {
          "en": "How general is the ridge effect?",
          "zh": "Ridge 效应在这个分类中有多普遍？"
        },
        "takeaway": {
          "en": "Two of eight adjacent orbit families have a positive gap; adjacency is insufficient.",
          "zh": "八个相邻轨道中只有两个出现正间隙；邻接并不充分。"
        },
        "transition": {
          "en": "Nonadjacent controls isolate what relative orientation changes.",
          "zh": "非相邻对照进一步隔离相对取向的作用。"
        }
      },
      "formula": null
    },
    {
      "id": "orientation-controls",
      "section": {
        "en": "Pivoting · orientation controls",
        "zh": "Pivoting · 取向对照"
      },
      "title": {
        "en": "Same biseparable curve, different quantum maxima",
        "zh": "相同双可分曲线，不同量子最大值"
      },
      "duration": 90,
      "layout": "chart",
      "bullets": {
        "en": [
          "R5 and N0 have <strong>the same all-cut biseparable curve</strong>.",
          "Their midpoint quantum maxima differ: \\(\\frac{11}{7}\\) versus \\(\\sqrt2\\).",
          "N1 has no midpoint gap, yet every unequal interior weight has a strict gap."
        ],
        "zh": [
          "R5 与 N0 具有<strong>相同的全切分双可分曲线</strong>。",
          "中点量子最大值不同：\\(\\frac{11}{7}\\) 与 \\(\\sqrt2\\)。",
          "N1 中点无间隙，但所有不等权内部点都有严格间隙。"
        ]
      },
      "notes": {
        "en": "The cleanest orientation comparison holds the excluded-resource benchmark fixed. R5 and the nonadjacent N0 pair have the same actual all-cut biseparable support for every weight, but their midpoint quantum maxima are eleven sevenths and square root two. Their difference therefore comes from what one shared quantum realization can achieve, rather than a changed biseparable threshold. N1 supplies another control: equal weights cancel the gap, whereas every unequal interior weight has a positive gap. Adjacency is neither necessary nor sufficient for this resource separation. These solved examples do not establish a general orientation predictor. N0 also has two unresolved transition strips, reserved for backup. R5 is the family we now follow in detail because its whole support and equality structure are solved.",
        "zh": "最清楚的取向对照固定了要排除的资源基准。R5 与非相邻 N0 在每个权重上都有相同的实际全切分双可分支撑，但中点量子最大值分别为十一除以七、根号二。差异因此来自共用测量的量子实现能达到什么，而不是双可分阈值改变。N1 提供另一种对照：等权时无间隙，所有不等权内部点却都有正间隙。因此邻接对资源分离既不必要，也不充分。这些已解例子还不是一般取向预测规律。N0 的两个未解转变区间留在备份页。下面集中讲 R5，因为它的完整支撑与等号结构都已解决。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "controls.svg",
      "backup": false,
      "subtitle": {
        "en": "R5 versus N0 isolates a relative-orientation effect",
        "zh": "R5 与 N0 的比较隔离相对取向效应"
      },
      "story": {
        "question": {
          "en": "Is the gap caused by adjacency itself?",
          "zh": "间隙能否归因于邻接本身？"
        },
        "takeaway": {
          "en": "The controlled evidence points to relative quantum compatibility; it supplies no universal predictor.",
          "zh": "受控比较展示相对量子兼容性差异，尚未给出普遍预测规律。"
        },
        "transition": {
          "en": "R5 lets us trace the complete chain from support to an operational guarantee.",
          "zh": "R5 允许把支撑、等号结构与操作性保证连成完整论证。"
        }
      },
      "formula": null
    },
    {
      "id": "r5-family",
      "section": {
        "en": "R5 · exact support",
        "zh": "R5 · 精确支撑"
      },
      "title": {
        "en": "R5 has a strict resource gap at every interior weight",
        "zh": "R5 在所有内部权重上都有严格资源间隙"
      },
      "duration": 120,
      "layout": "chart",
      "bullets": {
        "en": [
          "Exact quantum support and actual all-cut biseparable support for \\(0<p<1\\).",
          "Midpoint: \\(h_Q=\\frac{11}{7}\\), \\(h_{\\mathrm{BS}}=\\frac{5+2\\sqrt{13}}9\\).",
          "The gap closes quadratically as either endpoint is approached."
        ],
        "zh": [
          "\\(0<p<1\\) 上精确量子支撑与实际全切分双可分支撑。",
          "中点：\\(h_Q=\\frac{11}{7}\\)，\\(h_{\\mathrm{BS}}=\\frac{5+2\\sqrt{13}}9\\)。",
          "趋近任一端点时，间隙按二次方闭合。"
        ]
      },
      "notes": {
        "en": "Follow R5 for the rest of the pivoting story. One endpoint tests a conditional CHSH pair with Alice as the flag; the other uses Bob as the flag. Charlie participates in both seeds with the same two settings. This arrangement changes which joint quantum realization can satisfy both scores. The theorem gives the unrestricted quantum support as a uniquely selected physical quartic root and the actual all-cut biseparable support as a positive cubic root. Every interior weight has a strict gap; the curves meet only at the endpoints. At the midpoint the values shown are exact. This is the narrow new support result for the specified facet-pair family, not a claim that conditional Bell tests or GME witnesses are new. To use this curve we need to know why it is a theorem rather than an optimization ansatz.",
        "zh": "接下来的 pivoting 主线集中在 R5。一个端点让 Alice 作为标记方，检验条件 CHSH 对；另一个端点让 Bob 作为标记方。Charlie 参与两项，并使用相同的两个设置。这种排列改变了哪个联合量子实现能够同时满足两个得分。定理把完整量子支撑选为唯一物理四次根，把实际全切分双可分支撑选为正三次根。所有内部权重都有严格间隙，仅在端点相遇，中点数值如图且为精确值。具体贡献是指定 facet 配对的完整支撑族，而非条件 Bell 检验或 GME 见证本身。要使用这条曲线，还必须说明它为什么是定理，而不只是数值 ansatz。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "r5-curve.svg",
      "backup": false,
      "subtitle": {
        "en": "Two differently flagged lifted-CHSH tests share Charlie’s settings",
        "zh": "两个由不同方标记的 lifted-CHSH 检验共用 Charlie 的设置"
      },
      "story": {
        "question": {
          "en": "What is fully solved for the main family?",
          "zh": "主家族已经完整解决了什么？"
        },
        "takeaway": {
          "en": "R5 has exact supports and a positive resource margin throughout the open interpolation.",
          "zh": "R5 具有精确支撑与整个开插值区间上的正资源余量。"
        },
        "transition": {
          "en": "The proof must both exclude higher scores and attain the selected physical branch.",
          "zh": "证明既要排除更高得分，也要构造达到所选物理分支的实现。"
        }
      },
      "formula": null
    },
    {
      "id": "backup-proof",
      "section": {
        "en": "R5 · why the theorem holds",
        "zh": "R5 · 定理为何成立"
      },
      "title": {
        "en": "The flags participate in each other’s CHSH test",
        "zh": "两个标记方同时参与对方的 CHSH 检验"
      },
      "duration": 100,
      "layout": "split",
      "backup": false,
      "bullets": {
        "en": [
          "Alice’s \\(A_1=-1\\) branch tests BC; Bob’s \\(B_1=+1\\) branch tests AC.",
          "Both signed CHSH seeds share Charlie’s settings and use the other flag.",
          "Global upper bounds match attainers; equality fixes the occupied block."
        ],
        "zh": [
          "Alice 的 \\(A_1=-1\\) 分支检验 BC；Bob 的 \\(B_1=+1\\) 分支检验 AC.",
          "两个带符号 CHSH 种子共用 Charlie 设置，并使用另一标记方。",
          "全局上界匹配达到策略；等号固定被占据的块。"
        ]
      },
      "notes": {
        "en": "The R5 flags select Alice’s \\(A_1=-1\\) branch and Bob’s \\(B_1=+1\\) branch. With \\(P_A^-=(\\mathbb I-A_1)/2\\) and \\(P_B^+=(\\mathbb I+B_1)/2\\), the signed CHSH seeds are\\[\\mathcal C_{BC}=-B_0(C_0+C_1)-B_1(C_0-C_1),\\]\\[\\mathcal C_{AC}=-A_0(C_0+C_1)+A_1(C_0-C_1).\\]Each flag enters the other seed, while Charlie’s settings are shared. For binary POVMs the flags are effects; the projective dilation makes them projectors. The same realization must meet both tests. To prove its optimal score, Jordan reduction covers all finite-dimensional binary-POVM realizations. Exact positivity identities and physical-root isolation exclude higher scores, and explicit strategies attain both support roots. The biseparable proof compares all three cuts. Equality forces the relevant anticommutation, fixes an interior angular double root, and selects the unique positive eigenvector of the top occupied block. Thus the proof identifies every maximal realization, not just one ansatz. At the midpoint, known conditional tilted-CHSH deficits provide a short transparent upper certificate; the all-weight analysis extends beyond that special point.",
        "zh": "R5 标记选择 Alice 的 \\(A_1=-1\\) 分支和 Bob 的 \\(B_1=+1\\) 分支。令 \\(P_A^-=(\\mathbb I-A_1)/2\\)、\\(P_B^+=(\\mathbb I+B_1)/2\\)，带符号 CHSH 种子是\\[\\mathcal C_{BC}=-B_0(C_0+C_1)-B_1(C_0-C_1),\\]\\[\\mathcal C_{AC}=-A_0(C_0+C_1)+A_1(C_0-C_1).\\]每个标记都进入另一项种子，同时共用 Charlie 的设置。二元 POVM 中标记是效应；投影扩张后才成为投影。两项检验必须由同一实现满足。Jordan 分解覆盖有限维二元 POVM 实现；精确正性恒等式和物理根隔离排除更高得分，显式策略达到两个支撑根；双可分证明比较所有三个切分。等号强制相关反对易关系，固定内部角度双根，并选出最高被占据块的唯一正特征向量。因此证明确定所有最大实现，而非只找到一个 ansatz。中点可由已有条件 tilted-CHSH 亏损给出透明的短上界证书；全权重分析把结果扩展到这个特殊点之外。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript · appendices",
          "url": ""
        },
        {
          "label": "Wu et al. 2014",
          "url": "https://arxiv.org/abs/1407.5769"
        },
        {
          "label": "Bamps & Pironio 2015 · tilted-CHSH bound",
          "url": "https://arxiv.org/abs/1504.06960"
        }
      ],
      "subtitle": {
        "en": "Conditional CHSH explains the mechanism; global support and equality complete the proof",
        "zh": "条件 CHSH 解释机制；全局支撑与等号分析完成证明"
      },
      "story": {
        "question": {
          "en": "Why are the displayed curves exact?",
          "zh": "这些曲线为什么是精确结果？"
        },
        "takeaway": {
          "en": "Global upper identities match physical attainers; their equality structure fixes the realization.",
          "zh": "全局上界恒等式匹配物理达到策略，等号结构固定实现。"
        },
        "transition": {
          "en": "The selected eigenvector becomes the weighted-W self-test target.",
          "zh": "选出的特征向量成为加权 W 自测试目标。"
        }
      },
      "formula": "\\[\\begin{aligned}f&=\\mathbb I+P_A^-\\bigl(\\mathcal C_{BC}-2\\mathbb I\\bigr),\\\\g_5&=\\mathbb I+P_B^+\\bigl(\\mathcal C_{AC}-2\\mathbb I\\bigr).\\end{aligned}\\]"
    },
    {
      "id": "weighted-w",
      "section": {
        "en": "R5 · equality identifies the state",
        "zh": "R5 · 等号确定态"
      },
      "title": {
        "en": "The exact maximum identifies a weighted W state",
        "zh": "精确最大值确定一个加权 W 态"
      },
      "duration": 110,
      "layout": "chart",
      "bullets": {
        "en": [
          "Local isometries extract the state and tested effects.",
          "Specific extension: the full support and equality family for all interior weights."
        ],
        "zh": [
          "局域等距映射提取态与受测效应。",
          "具体扩展：所有内部权重的完整支撑与等号家族。"
        ]
      },
      "notes": {
        "en": "At every strictly interior weight, every finite-dimensional binary-POVM realization attaining the scalar maximum extracts the displayed weighted W state and the tested effects on occupied support. The unique positive eigenvector fixes its amplitudes. Local block alignment makes the statement valid also with coherent sectors and an external purification. This is the equality consequence of the exact support proof, not just the identification of one successful strategy. Wu et al. already self-tested the midpoint generalized-W behavior; conditional CHSH and tilted-CHSH self-testing are established tools. The increment here is the all-weight scalar support and equality characterization for this specified geometric pair. Endpoint and unused-support measurements are outside this statement. We can now use the known midpoint target to ask a concrete source-design question.",
        "zh": "在每个严格内部权重，任何达到标量最大值的有限维二元 POVM 实现，都能提取图中的加权 W 态和被占据支撑上的受测效应。唯一正特征向量固定其振幅；局域块对齐使结论也适用于相干扇区与外部纯化。这是精确支撑证明的等号推论，不只是找到一个成功策略。Wu 等已经自测试过中点的广义 W 行为，条件 CHSH 与 tilted-CHSH 也是已有工具。这里的扩展是指定几何配对在所有权重上的标量支撑和等号刻画。端点与未使用支撑上的测量不在结论之内。现在可以用这个已知中点目标，提出一个具体的源设计比较。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript · all-interior self-test",
          "url": ""
        },
        {
          "label": "Wu et al. 2014 · known W behavior",
          "url": "https://arxiv.org/abs/1407.5769"
        },
        {
          "label": "Bamps–Pironio 2015 · tilted-CHSH SOS",
          "url": "https://arxiv.org/abs/1504.06960"
        }
      ],
      "asset": "w-state.svg",
      "formula": "\\[\\begin{aligned}\\lvert W_p\\rangle={}&\\alpha_p\\lvert100\\rangle\\\\&+\\beta_p\\lvert010\\rangle\\\\&+\\gamma_p\\lvert001\\rangle.\\end{aligned}\\]",
      "subtitle": {
        "en": "One scalar score, at each fixed interior weight; midpoint behavior known from Wu et al.",
        "zh": "每个固定内部权重只用一个标量得分；中点行为已见于 Wu 等"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "What does equality identify?",
          "zh": "达到等号究竟确定什么？"
        },
        "takeaway": {
          "en": "Each interior scalar maximum fixes a weighted W target and tested effects on occupied support.",
          "zh": "每个内部标量最大值固定一个加权 W 目标及被占据支撑上的受测效应。"
        },
        "transition": {
          "en": "Fix the same noisy source for R5 and Mermin to test its practical value.",
          "zh": "固定同一个噪声源，比较 R5 与 Mermin 的实际价值。"
        }
      }
    },
    {
      "id": "backup-fixed-source",
      "section": {
        "en": "R5 · a fixed-source advantage",
        "zh": "R5 · 固定源上的优势"
      },
      "title": {
        "en": "R5 detects GME on a source that Mermin provably misses",
        "zh": "R5 在 Mermin 无法检测的源上认证 GME"
      },
      "duration": 110,
      "layout": "split",
      "backup": false,
      "bullets": {
        "en": [
          "R5 with its midpoint measurements detects GME for \\(v>0.863411\\ldots\\).",
          "Every binary-POVM Mermin strategy fails for \\(v\\le0.871602\\ldots\\).",
          "A rigorous advantage interval for this specified source."
        ],
        "zh": [
          "R5 使用中点测量，在 \\(v>0.863411\\ldots\\) 时检测 GME。",
          "所有二元 POVM 的 Mermin 策略在 \\(v\\le0.871602\\ldots\\) 时都失败。",
          "这给出指定源上的严格优势区间。"
        ]
      },
      "notes": {
        "en": "Return to the experiment’s design lesson: compare objectives on one fixed noisy source. Here the source is the known unequal midpoint W state, with amplitudes square root two, square root two, and square root three, normalized by square root seven. Add global white state noise. The R5 midpoint measurements cross the exact biseparable bound at visibility 0.863411 and above. An established Mermin tensor upper bound, together with deterministic-input branches, proves that every binary-POVM Mermin strategy fails to certify GME up to visibility 0.871602. The interval between those thresholds is therefore a rigorous witness advantage on this source. The Mermin threshold is a lower bound on its required detection visibility, not its exact optimum. This is neither an optimum over all GME witnesses nor the state’s separability threshold. The same equality information also lets us ask about private outputs.",
        "zh": "回到实验工作留下的设计问题：把不同目标放在同一个噪声源上比较。这里选已知的不等振幅中点 W 态，振幅为根号二、根号二、根号三，除以根号七；再加入全局白态噪声。R5 的中点测量在可见度超过 0.863411 时越过精确双可分界。已有 Mermin 张量上界结合确定性输入分支，证明可见度不超过 0.871602 时，所有二元 POVM 的 Mermin 策略都不能认证 GME。所以两阈值之间是这个指定源上的严格见证优势。Mermin 数值是其检测可见度的下界，并非精确最优阈值；也不是所有 GME 见证的最优比较或态的可分阈值。同样的等号信息还能回答输出私密性。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "formula": "\\[\\rho_v=v\\lvert W_*\\rangle\\langle W_*\\rvert+(1-v)\\frac{\\mathbb I}{8}\\]",
      "subtitle": {
        "en": "Fix the midpoint W source; add identical global white state noise",
        "zh": "固定中点 W 源，对两种检验加入相同的全局白态噪声"
      },
      "story": {
        "question": {
          "en": "Does the new witness change a fixed-source detection task?",
          "zh": "新见证能否改变固定源上的检测任务？"
        },
        "takeaway": {
          "en": "There is a proved noisy-source interval in which R5 certifies GME and Mermin cannot.",
          "zh": "存在已证明的噪声源区间，R5 认证 GME 而 Mermin 无法做到。"
        },
        "transition": {
          "en": "The self-test also constrains an adversary’s knowledge of fixed outputs.",
          "zh": "自测试还可以限制对手对固定输出的知识。"
        }
      }
    },
    {
      "id": "private-pair",
      "section": {
        "en": "R5 · private outputs",
        "zh": "R5 · 私密输出"
      },
      "title": {
        "en": "The same score certifies more private pair randomness",
        "zh": "同一得分还认证更多输出对的私密随机性"
      },
      "duration": 100,
      "layout": "chart",
      "bullets": {
        "en": [
          "Endpoint maxima guarantee \\(1\\) pair bit.",
          "Midpoint: \\(G=\\frac{11}{28}\\), or \\(\\approx1.348\\) bits.",
          "Interior exact maxima approach \\(2\\) bits near an endpoint."
        ],
        "zh": [
          "端点最大值保证 \\(1\\) 个输出对比特。",
          "中点：\\(G=\\frac{11}{28}\\)，即约 \\(1.348\\) 比特。",
          "内部精确最大值在趋近端点时逼近 \\(2\\) 比特。"
        ]
      },
      "notes": {
        "en": "Genuine entanglement and private randomness are different tasks, but the equality proof connects them here. Keep the generation pair A zero B zero fixed, assume inputs independent of the devices, an external quantum Eve, and no disclosure of Charlie’s output. At an endpoint maximum the tight worst-case pair guessing probability is one half, giving one private bit. At the midpoint it is eleven twenty-eighths, about 1.348 bits. For finite-dimensional tensor-product binary-POVM realizations, the interior equality family gives the displayed amplitude formula, whose entropy approaches two bits near either endpoint. The state changes with the weight; the interior limit is different from the actual one-bit endpoint guarantee. The midpoint behavior and the implication from self-testing to Eve independence are known. The specific comparison is the full-weight fixed-pair guarantee versus the actual endpoints. An exact-score gain is only useful experimentally if it tolerates a nonzero deficit.",
        "zh": "真正纠缠与私密随机性是不同任务，但等号证明在这里把两者连接起来。固定生成对 A zero B zero，假定输入独立于器件、存在外部量子 Eve，且不公开 Charlie 的输出。端点最大值的最坏输出对猜测概率恰为二分之一，保证一个私密比特；中点为十一除以二十八，约 1.348 比特。有限维张量积二元 POVM 实现中的内部等号家族给出振幅公式，熵在趋近任一端点时逼近两个比特。这里态随权重改变，内部极限不同于实际端点的一个比特保证。中点行为以及自测试导出 Eve 独立性的原则已有先例；具体结果是全权重的固定输出对比较。精确得分的增益要在实验中有用，还必须控制非零亏损。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        },
        {
          "label": "Wu et al. 2014",
          "url": "https://arxiv.org/abs/1407.5769"
        },
        {
          "label": "Franz–Furrer–Werner 2011 · privacy principle",
          "url": "https://arxiv.org/abs/1010.1131"
        }
      ],
      "asset": "privacy.svg",
      "formula": "\\[G_{\\mathrm{fin}}=\\frac{1+2\\alpha_p\\beta_p}{4}\\]",
      "subtitle": {
        "en": "Keep the generation pair \\(A_0B_0\\) fixed; external quantum Eve; Charlie undisclosed",
        "zh": "固定生成输出对 \\(A_0B_0\\)；外部量子 Eve；不公开 Charlie 的输出"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "What does the equality result imply for privacy?",
          "zh": "等号结果如何转化为私密性？"
        },
        "takeaway": {
          "en": "The fixed output pair has a tight exact-score advantage over the endpoints.",
          "zh": "固定输出对具有相对于端点的紧精确得分优势。"
        },
        "transition": {
          "en": "The approach to two bits forces us to quantify the available score precision.",
          "zh": "逼近两个比特，迫使我们量化所需得分精度。"
        }
      }
    },
    {
      "id": "precision-cost",
      "section": {
        "en": "R5 · precision limits the advantage",
        "zh": "R5 · 精度限制优势"
      },
      "title": {
        "en": "The ideal two-bit limit needs quadratically finer score precision",
        "zh": "理想两比特极限需要二次方变细的得分精度"
      },
      "duration": 110,
      "layout": "chart",
      "bullets": {
        "en": [
          "Biseparable completions allow Eve to guess with \\(G\\ge\\frac12\\).",
          "A deficit window \\(0\\le\\epsilon_p<w\\) guaranteeing \\(>1\\) bit needs \\(w\\le\\Delta_p\\).",
          "Near either endpoint: \\(\\Delta_p\\propto\\min\\{p,1-p\\}^{2}\\)."
        ],
        "zh": [
          "双可分补全允许 Eve 以 \\(G\\ge\\frac12\\) 猜测。",
          "亏损窗口 \\(0\\le\\epsilon_p<w\\) 要保证 \\(>1\\) 比特，必须满足 \\(w\\le\\Delta_p\\)。",
          "靠近端点：\\(\\Delta_p\\propto\\min\\{p,1-p\\}^{2}\\)。"
        ]
      },
      "notes": {
        "en": "Why does the ideal limit become fragile? The actual biseparable attainers can make one queried party deterministic. With the preparation flag known to Eve, mixing with local behaviors fills every nonnegative score up to the biseparable support while keeping pair guessing probability at least one half. A near-maximal deficit window \\(0\\le\\epsilon_p<w\\), with \\(\\epsilon_p=h_Q-\\langle H_p\\rangle\\), that guarantees more than one pair bit therefore cannot reach those completions: its width is at most the quantum–biseparable gap. R5’s gap closes quadratically near either endpoint, so a fixed experimental error cannot follow the ideal two-bit limit all the way. This is a necessary obstruction for this family, score, and output pair, not an optimal privacy threshold or a universal sample-complexity law. We now need sufficient finite-deficit bounds. That is the natural entry point for task-specific SDP certificates.",
        "zh": "理想极限为什么脆弱？实际双可分达到策略可以让被查询的一方输出确定。Eve 知道制备标记，把它与局域行为混合，能够覆盖从零到双可分支撑的所有非负得分，同时保持输出对猜测概率至少二分之一。因此从最大值起算、保证超过一个比特的亏损窗口 \\(0\\le\\epsilon_p<w\\)，其中 \\(\\epsilon_p=h_Q-\\langle H_p\\rangle\\)，不能包含这些补全，其宽度最多等于量子—双可分间隙。R5 间隙靠近端点时二次闭合，所以固定实验误差无法一路跟随理想两比特极限。这是本家族、得分与输出对上的必要障碍，不是最优私密性阈值或普遍样本复杂度规律。下一步需要非零亏损下的充分界，这自然引出针对具体任务的 SDP 证书。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "precision.svg",
      "formula": "\\[w\\le\\Delta_p=h_Q-h_{\\mathrm{BS}}\\]",
      "subtitle": {
        "en": "A necessary obstruction for this scalar and fixed output pair",
        "zh": "这个标量得分与固定输出对的必要障碍"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "What prevents an immediately robust two-bit protocol?",
          "zh": "为什么不能直接得到稳健两比特协议？"
        },
        "takeaway": {
          "en": "The guaranteed score margin shrinks quadratically near the ideal endpoint limit.",
          "zh": "理想端点极限附近，可以保证的得分余量二次缩小。"
        },
        "transition": {
          "en": "SDPs must certify the operational quantity at a finite score deficit.",
          "zh": "SDP 需要在有限得分亏损下认证真正的操作量。"
        }
      }
    },
    {
      "id": "certification-pipeline",
      "section": {
        "en": "SDP · certify the task",
        "zh": "SDP · 认证任务"
      },
      "title": {
        "en": "The certification task determines the SDP objective",
        "zh": "认证任务决定 SDP 的目标函数"
      },
      "duration": 110,
      "layout": "chart",
      "bullets": {
        "en": [
          "Quantum optimum: match an attained value with an upper certificate.",
          "GME: certify an upper bound over all biseparable cuts.",
          "Privacy at a deficit: upper-bound Eve’s guessing probability."
        ],
        "zh": [
          "量子最优值：匹配达到值与上界证书。",
          "GME：认证所有双可分切分上的上界。",
          "亏损下的私密性：约束 Eve 的猜测概率。"
        ]
      },
      "notes": {
        "en": "The earlier PI work already taught us to distinguish a construction from a certificate. Pivoting now tells us which resource quantity needs certification. A quantum optimum uses an explicit attained score and an upper bound from a moment SDP or sum-of-squares dual; matching proves the optimum. A GME claim instead compares the score with a separately validated all-cut biseparable upper bound. A randomness claim maximizes guessing probability subject to the observed-score constraint and needs the argument to survive Eve conditioning. These are different optimization problems even when the Bell scalar is the same. Raw solver output is a numerical estimate; an exact rational dual or validated residual is what supports a certified claim. R5 already gives selected finite-deficit certificates, so this connection is concrete rather than only a future plan.",
        "zh": "此前 PI 工作已经教会我们区分构造与证书。Pivoting 进一步指出需要认证哪一种资源量。量子最优值需要显式达到得分与矩 SDP 或平方和对偶上界匹配；GME 需要另外验证全切分双可分上界；随机性则在给定观测得分下最大化猜测概率，并证明结论经 Eve 条件化后仍成立。同一个 Bell 标量对应的是不同优化问题。原始求解器输出是数值估计，精确有理对偶或经验证残差才支持认证结论。R5 已经有选定权重的有限亏损证书，所以这一步并非只有未来设想。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript · rational certificates",
          "url": ""
        },
        {
          "label": "SDPBell · maintained local draft",
          "url": ""
        }
      ],
      "asset": "certification.svg",
      "formula": "\\[q_{\\mathrm{attained}}\\le h_Q\\le q_{\\mathrm{cert}}\\]",
      "subtitle": {
        "en": "Geometry chooses a score; each resource claim needs its own validated bound",
        "zh": "几何选择得分；每种资源结论需要自己的经验证界"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "How does SDP follow from the pivot result?",
          "zh": "SDP 如何自然延续 pivot 结果？"
        },
        "takeaway": {
          "en": "The exact family identifies the correct resource-specific optimization objectives.",
          "zh": "精确家族明确了各资源任务应优化的目标。"
        },
        "transition": {
          "en": "Selected R5 certificates already turn finite deficits into nonideal guarantees.",
          "zh": "选定 R5 证书已经把有限亏损转化为非理想保证。"
        }
      }
    },
    {
      "id": "backup-robust",
      "section": {
        "en": "SDP · finite-deficit results",
        "zh": "SDP · 有限亏损结果"
      },
      "title": {
        "en": "Finite deficits already admit sufficient R5 certificates",
        "zh": "有限亏损已有 R5 充分证书"
      },
      "duration": 90,
      "layout": "chart",
      "backup": false,
      "bullets": {
        "en": [
          "Midpoint state fidelity: \\(F\\ge\\max\\{0,1-66\\epsilon\\}\\).",
          "Midpoint privacy: \\(G\\le0.441+6\\epsilon\\).",
          "Exact rational probability bounds at \\(p\\in\\{\\frac12,\\frac14,\\frac1{10}\\}\\)."
        ],
        "zh": [
          "中点态保真度：\\(F\\ge\\max\\{0,1-66\\epsilon\\}\\)。",
          "中点私密性：\\(G\\le0.441+6\\epsilon\\)。",
          "在 \\(p\\in\\{\\frac12,\\frac14,\\frac1{10}\\}\\) 有精确有理概率界。"
        ]
      },
      "notes": {
        "en": "Here are two completed answers at finite deficit. The state-extraction bound at the midpoint has sufficient constant 66, so a deficit of 0.001 gives fidelity at least 0.934. It does not certify measurement action at nonzero deficit. For privacy, exact rational Gram-matrix duals bound the four output probabilities, and averaging conditional behaviors extends the bound to an external Eve. The simple midpoint bound is G at most 0.441 plus six times the deficit, so it guarantees more than one pair bit when the deficit is below 59 over 6000. Other selected weights have their own validated affine bounds. The plot includes stronger midpoint slope envelopes. These are sufficient certificates, not optimal thresholds or a finite-data security protocol. The remaining problem is how to make such task-specific optimization economical beyond the small tripartite case.",
        "zh": "这里展示两个有限亏损下已完成的答案。中点态提取界的充分常数为 66，所以亏损 0.001 保证保真度至少 0.934；它并不认证非零亏损时的测量作用。私密性使用精确有理 Gram 矩阵对偶约束四个输出概率，再对条件行为平均，将界推广到外部 Eve。简单中点界为 0.441 加六倍亏损，亏损低于 59 除以 6000 时保证超过一个输出对比特。其他选定权重也有各自的经验证仿射界，图中还显示更强的中点斜率包络。这些是充分证书，不是最优阈值或有限数据安全协议。剩下的问题是如何让这种针对任务的优化超越小三方实例后仍可计算。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "robust.svg",
      "formula": "\\[\\epsilon=h_Q-\\langle H_p\\rangle\\]",
      "subtitle": {
        "en": "State extraction and private guessing remain separate guarantees",
        "zh": "态提取与私密猜测仍是两种独立保证"
      },
      "story": {
        "question": {
          "en": "What survives a nonzero score deficit?",
          "zh": "非零得分亏损下已经证明了什么？"
        },
        "takeaway": {
          "en": "Validated sufficient bounds exist for state fidelity and private guessing at selected weights.",
          "zh": "态保真度与选定权重的私密猜测已有经验证充分界。"
        },
        "transition": {
          "en": "Many-body symmetry offers a way to control the certificate size.",
          "zh": "多体对称性提供控制证书规模的方法。"
        }
      }
    },
    {
      "id": "hecke-sdp",
      "section": {
        "en": "SDP · scale with surviving symmetry",
        "zh": "SDP · 用保留的对称性扩展"
      },
      "title": {
        "en": "Many-body symmetry can keep SDP blocks small",
        "zh": "多体对称性可以保持 SDP 块规模较小"
      },
      "duration": 90,
      "layout": "chart",
      "bullets": {
        "en": [
          "At fixed PI hierarchy level, stable-range block sizes stay fixed.",
          "At \\(N=500\\): attained-to-upper numerical gap \\(\\approx1.43\\times10^{-7}\\).",
          "Asymmetric pivot targets require their actual surviving symmetry."
        ],
        "zh": [
          "固定 PI 层级下，稳定范围中的块尺寸不随粒子数增长。",
          "\\(N=500\\)：达到值与数值上界相差约 \\(1.43\\times10^{-7}\\)。",
          "非对称 pivot 目标只能使用实际保留的对称性。"
        ]
      },
      "notes": {
        "en": "To test computational scaling, we now switch to a separate permutation-invariant quantum-bound benchmark. Extending R5 resource objectives with their surviving symmetry remains the next step. This closes the loop to PIBell. When the Bell objective and constraints retain full permutation symmetry, SDPBell assembles Hecke overlap blocks whose dimensions stay fixed at a chosen hierarchy level in the stable particle-number range. Level two has blocks 8, 8, 3, 1; level three has 18, 24, 13, 7, 4, 2. Particle number changes coefficients rather than those block sizes. At 500 particles, the PI two-body benchmark has attained value 1.213133491 and a level-three numerical upper estimate 1.213133634, a gap about 1.43 times ten to the minus seven. This is a numerical demonstration of tractability, not a rational exact-optimum certificate. A generic pivot pair is asymmetric: only the stabilizer preserved by its objective and constraints can be used. The proposed next step is therefore resource-specific finite-deficit optimization with the symmetry that actually survives.",
        "zh": "为了检验计算规模扩展，这里切换到一个独立的置换不变量子界基准；在实际保留的对称性下扩展 R5 资源目标仍是下一步。这一步回到 PIBell。目标函数与约束保留完整置换对称性时，SDPBell 组装 Hecke overlap 块，在固定层级和稳定粒子数范围内，块维数保持不变。二级为 8、8、3、1；三级为 18、24、13、7、4、2。粒子数改变系数而不是这些块的尺寸。在 500 粒子的 PI 二体基准，达到值为 1.213133491，三级数值上界估计为 1.213133634，差约 1.43 乘十的负七次。这展示可计算性，但还不是有理精确最优值证书。一般 pivot 配对并不对称，只能使用目标和约束保留的稳定子。下一步因此是在实际保留的对称性下，求资源相关的有限亏损界。"
      },
      "sources": [
        {
          "label": "SDPBell · local Hecke draft",
          "url": ""
        },
        {
          "label": "SDPBell · N10–N500 numerical scan",
          "url": ""
        }
      ],
      "asset": "sdp.svg",
      "subtitle": {
        "en": "A separate PIBell quantum-bound benchmark tests computational scaling",
        "zh": "一个独立 PIBell 量子界基准检验计算规模扩展"
      },
      "backup": false,
      "story": {
        "question": {
          "en": "How can certification extend to larger systems?",
          "zh": "认证如何推广到更大系统？"
        },
        "takeaway": {
          "en": "Use surviving symmetry to reduce task-specific moment problems.",
          "zh": "用保留的对称性化简针对具体任务的矩问题。"
        },
        "transition": {
          "en": "The series now connects objective design to a validated resource guarantee.",
          "zh": "整个系列现在从目标设计连接到经验证的资源保证。"
        }
      },
      "formula": null
    },
    {
      "id": "closing",
      "section": {
        "en": "The design loop",
        "zh": "设计循环"
      },
      "title": {
        "en": "Choose the resource task before choosing the Bell test",
        "zh": "先确定资源任务，再选择 Bell 检验"
      },
      "duration": 40,
      "layout": "statement",
      "bullets": {
        "en": [
          "Earlier work supplies tight, structured, measurable objectives.",
          "Pivoting resolves exact orientation-dependent resource curves and R5 equality.",
          "Validated R5 certificates cover finite deficits; PI blocks show a route to scale."
        ],
        "zh": [
          "此前工作给出紧、有结构、可测的目标。",
          "Pivoting 解析取向相关的资源曲线与 R5 等号结构。",
          "经验证的 R5 证书覆盖有限亏损；PI 块展示规模扩展路线。"
        ]
      },
      "notes": {
        "en": "The design loop is now complete. Earlier work supplies tight, structured and measurable objectives. Pivoting resolves the orientation-dependent support and equality family. Fixed-source detection and fixed-pair privacy give concrete payoffs, with a quantified precision cost. SDP addresses finite deficits and scale. The immediate targets are the unresolved N0 strips and stronger robust resource bounds.",
        "zh": "设计路线现在闭合：此前工作给出紧、有结构、可测的目标；pivoting 分辨取向相关的支撑与等号家族；固定源检测和固定输出对私密性给出具体用途，也量化了精度代价；SDP 继续处理有限亏损与规模。近期目标是未解的 N0 区间，以及更强的稳健资源界。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "backup": false,
      "subtitle": {
        "en": "A complete chain: objective → orientation → exact support → operational certificate",
        "zh": "完整链条：目标 → 取向 → 精确支撑 → 操作性证书"
      },
      "story": {
        "question": {
          "en": "What should the audience remember?",
          "zh": "听众最后需要记住什么？"
        },
        "takeaway": {
          "en": "Optimize the certificate for the resource task, then validate its margin.",
          "zh": "围绕资源任务优化证书，再验证其余量。"
        },
        "transition": {
          "en": "Discussion: which orientation information predicts useful witnesses beyond this family?",
          "zh": "讨论：超出这个家族后，哪些取向信息能够预测有用见证？"
        }
      },
      "formula": null
    },
    {
      "id": "backup-model",
      "section": {
        "en": "BACKUP · DISCUSSION",
        "zh": "备用 · 讨论"
      },
      "title": {
        "en": "What exactly does the resource gap exclude?",
        "zh": "资源间隙究竟排除了什么？"
      },
      "duration": 0,
      "layout": "split",
      "backup": true,
      "bullets": {
        "en": [
          "Quantum biseparability: all three cuts and their convex hull.",
          "GME certification is distinct from genuine multipartite nonlocality.",
          "A zero support gap does not classify every maximizing state."
        ],
        "zh": [
          "量子双可分：三个划分及其凸包。",
          "GME 认证与真实多体非定域性是不同结论。",
          "零支撑间隙不能分类所有达到最大值的态。"
        ]
      },
      "notes": {
        "en": "The resource benchmark is the set of quantum correlations generated by states separable across at least one bipartition, with quantum measurements inside each group, and then arbitrary convex mixing across cuts. We compare the unrestricted quantum support with that actual all-cut support. An observed score above the latter certifies genuine multipartite entanglement under the Bell assumptions. This is not a Svetlichny-type comparison with unrestricted nonsignaling correlations inside each group. Conversely, if the supports coincide, there is a biseparable realization attaining the optimum, but entangled maximizers may also exist. This distinction is especially important for the six zero-gap ridge orbits. The weighted scalar is generally not a facet, although its local exposed face is the shared intersection of the endpoint facets.",
        "zh": "资源基准是至少在一个二分划分上可分的态产生的量子关联，组内使用量子测量，再允许不同划分之间任意凸混合。比较的是不受限量子支撑与这个实际全划分支撑。Bell 假设下，观测分数超过后者可以认证真实多体纠缠。这不同于允许组内任意无信号关联的 Svetlichny 型模型。反过来，若两支撑相等，说明某个双可分实现达到最优，但仍可能有纠缠态同样达到最优；六个零间隙 ridge orbit 尤其需要这个区分。加权标量一般并不是 facet，尽管其局域暴露面是端点 facet 的共同交集。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "formula": "\\[\\Delta_p=h_Q(H_p)-h_{\\mathrm{BS}}(H_p)\\]"
    },
    {
      "id": "score-landscape",
      "section": {
        "en": "PIVOT · OPERATIONAL SCORE",
        "zh": "PIVOT · 操作性分数"
      },
      "title": {
        "en": "One graph, two different notions of a peak",
        "zh": "同一张图，两种不同的峰"
      },
      "duration": 0,
      "layout": "chart",
      "bullets": {
        "en": [
          "White-noise ratio: <strong>one peak</strong>, Mermin.",
          "NS-normalized quantum fraction: <strong>two peaks</strong>, Mermin and Sliwa 15.",
          "Ratio ascent reaches Mermin in at most <strong>two pivots</strong>."
        ],
        "zh": [
          "白噪声比值：<strong>一个峰</strong>，Mermin。",
          "NS 归一化量子分数：<strong>两个峰</strong>，Mermin 与 Śliwa 15。",
          "比值上升路径至多经过<strong>两次 pivot</strong>到达 Mermin。"
        ]
      },
      "notes": {
        "en": "The graph by itself does not rank witnesses. The white-noise ratio asks about the optimized visibility against the uniform behavior. The nonsignaling fraction asks what proportion of the available beyond-local gap quantum mechanics can occupy. On the same complete three-party graph, these scores have different certified peak structures among the forty-four quantum-violating classes. For the ratio, every non-Mermin class among these 44 has an increasing route through at most two ridge pivots, with class four acting as a hub. For the nonsignaling fraction, Sliwa fifteen is another peak. Its plotted value is a physical lower bound that already exceeds validated upper bounds of every relevant neighbor. We do not need, and do not assert, its exact quantum optimum. The first lesson is to choose the operational question before choosing an ascent rule.",
        "zh": "图本身不会给见证排序。白噪声比值回答针对均匀行为的最优临界可见度；NS 分数回答量子理论能占据多少超出局域界的可用区间。对同一张完整三体图，在 44 个具有量子违反的类别中，两种分数产生不同且经过认证的峰结构。比值情形下，非 Mermin 类别至多经过两次 ridge pivot 即可沿严格上升路径到达 Mermin，第四类起到枢纽作用。NS 分数还出现 Śliwa 15 峰。图中的该类别数值是物理可达到的下界，已经高于所有相关相邻类别的严格上界；不需要也没有断言其精确量子最优值。第一个启发是先选操作性问题，再选图上的上升规则。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "landscape.svg",
      "formula": "\\[\\begin{aligned}\\Delta&=h_{\\mathrm Q},\\\\[6pt]\\delta&=\\frac{h_{\\mathrm Q}-1}{h_{\\mathrm{NS}}-1}.\\end{aligned}\\]",
      "subtitle": {
        "en": "44 violating classes · positivity and GYNI excluded · S15 uses certified bounds",
        "zh": "44 个量子违反类别 · 排除 positivity 与 GYNI · S15 使用认证界"
      },
      "backup": true
    },
    {
      "id": "flat-to-pivot",
      "section": {
        "en": "THE BRIDGE",
        "zh": "转折"
      },
      "title": {
        "en": "A facet is a starting point, not the whole design",
        "zh": "找到 facet 是起点，设计问题仍未结束"
      },
      "duration": 0,
      "layout": "chart",
      "bullets": {
        "en": [
          "Two facets can share an optimizer and a flat ratio segment.",
          "Endpoint violation alone does not identify a quantum resource.",
          "Pivot question: compare shared-measurement quantum and biseparable support."
        ],
        "zh": [
          "两个 facet 可以共享最优行为，使组合比值平坦。",
          "端点违反量本身不能辨别所需量子资源。",
          "Pivot 问题：共用测量时，比较量子与双可分支撑。"
        ]
      },
      "notes": {
        "en": "The original supplement already illustrates two facets sharing an optimizing quantum behavior, so their combinations can have a constant ratio. The revised theorem explains how a flat maximum can still be tightened. But the ratio only compares quantum correlations with local ones. It does not answer whether genuinely multipartite entanglement, a particular state, or private randomness is necessary. We therefore move to a controlled tripartite benchmark and compare two scores evaluated on one state and shared measurements. Facet pivoting selects and relates the witnesses; resource-restricted support tells us what their combination certifies. The plateau in this figure is earlier context, not the new R5 result.",
        "zh": "原始补充材料已展示两个 facet 共享最优量子行为，因此组合比值可以保持不变；修订定理解释了平坦极大点为何仍能继续收紧。但比值只比较量子关联与局域关联，不能回答是否必须使用真实多体纠缠、特定态或私有随机性。于是我们转向可控的三体基准，让两个分数来自同一个态和同一组测量。Facet pivoting 选择并联系见证，资源受限支撑则决定组合能够认证什么。这里的平台图属于此前背景，不是新的 R5 结果。"
      },
      "sources": [
        {
          "label": "First paper · Supplement Fig. S1(b)",
          "url": "https://arxiv.org/html/2511.07523v2"
        }
      ],
      "asset": "plateau.png",
      "backup": true
    },
    {
      "id": "n0-known-open",
      "section": {
        "en": "PIVOT · NEW CONTINUOUS N0 BOUNDS",
        "zh": "PIVOT · 新的 N0 连续区间界"
      },
      "title": {
        "en": "N0: the transition is now confined to two narrow intervals",
        "zh": "N0：转变已被限制到两个窄区间"
      },
      "duration": 0,
      "layout": "chart",
      "bullets": {
        "en": [
          "Proved zero gap: \\([0,0.34]\\cup[0.66,1]\\).",
          "Proved positive gap: \\(1-p_*<p<p_*\\), \\(p_*\\approx0.6437323\\).",
          "The intervening intervals remain <strong>open</strong>."
        ],
        "zh": [
          "已证明零间隙：\\([0,0.34]\\cup[0.66,1]\\)。",
          "已证明正间隙：\\(1-p_*<p<p_*\\)，\\(p_*\\approx0.6437323\\)。",
          "两段中间区间仍是<strong>开放问题</strong>。"
        ]
      },
      "notes": {
        "en": "This is the latest continuous N0 refinement. The central positive-gap interval comes from a transverse perturbation of the attaining biseparable strategy. Its algebraically isolated threshold is about point six four three seven three two three, but that proof is sufficient rather than a full phase diagram. A different physical-angle argument now proves exact equality of quantum and actual biseparable support from zero through point three four and from point six six through one, including those outer boundary weights. The unknown transition is therefore confined to two narrow intervals. Hatched regions mean unresolved, not numerical zero. The threshold \\(p_*\\) itself is not assigned equality or strict separation. Independently certified individual weights within these regions do not fill the intervals. N0 remains a valuable open control rather than an overclaimed exact full curve.",
        "zh": "这是最新的 N0 连续区间精炼。中心正间隙区间来自对达到双可分界的策略做横向扰动，其隔离出的代数阈值约为 0.6437323，但该证明只是充分区间，不是完整相图。另一条物理角度论证现在证明：从 0 到 0.34，以及从 0.66 到 1，量子支撑与实际双可分支撑精确相等，而且包含这些外侧边界。未知转变因此限制在两个很窄的区间。斜线区域表示尚未解决，不是数值零。\\(p_*\\) 本身也没有被赋予相等或严格分离的结论。区间中独立认证的个别权重不能填满整段。N0 是一个有价值的开放对照，而不是被夸大为已求解全曲线的对象。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "n0-phase.svg",
      "subtitle": {
        "en": "Exact tails; sufficient central interval; no complete phase-diagram claim",
        "zh": "精确两端区间；充分中心区间；未宣称完整相图"
      },
      "backup": true
    },
    {
      "id": "backup-n1",
      "section": {
        "en": "Orientation control",
        "zh": "朝向对照"
      },
      "title": {
        "en": "N1: cancellation at equal weights, activation away from them",
        "zh": "N1：等权时抵消，偏离等权后激活"
      },
      "duration": 0,
      "layout": "chart",
      "backup": true,
      "bullets": {
        "en": [
          "At the midpoint and endpoints: \\(h_Q=h_{\\mathrm{BS}}\\).",
          "Every other interior weight has a strict support gap.",
          "Opposite shared-party rows give a distinct solved control."
        ],
        "zh": [
          "中点和端点：\\(h_Q=h_{\\mathrm{BS}}\\)。",
          "其余每个内部权重都有严格支撑间隙。",
          "共同方种子行相反，给出另一种已解对照。"
        ]
      },
      "notes": {
        "en": "N1 is nonadjacent to the source facet and has opposite conditioned rows on the shared party. At equal weights the cancellation gives quantum and actual biseparable support equal to one. Away from equal weights, every strictly interior weight has a positive support gap; both endpoint maxima are still biseparably attainable. The figure plots the proved physical branches, not an optimization ansatz. It displays the gap directly because the support curves are close. The exact quantum branch is selected from a sextic, while the actual biseparable branch is the positive solution of its cut-support cubic. The result shows that a midpoint test alone can miss a resource transition. Together with N0 and R5, it provides a controlled orientation comparison, without a universal rule for arbitrary facet pairs.",
        "zh": "N1 与源 facet 不相邻，共同方的条件种子行相反。等权时抵消，使量子与实际双可分支撑都等于 1。偏离等权后，每个严格内部权重都有正支撑间隙，而两端最大值仍能由双可分策略达到。图中绘制的是已证明的物理分支，而不是某个优化假设空间。两条支撑曲线很接近，因此直接显示间隙。精确量子分支从六次方程中选出；实际双可分分支由各划分支撑的正三次根给出。这个例子说明，只看中点可能错过资源转变。它与 N0、R5 一起形成受控的朝向对照，但没有给出任意 facet pair 的普遍规则。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript · N1 exact support",
          "url": ""
        }
      ],
      "asset": "n1-gap.svg"
    },
    {
      "id": "backup-symmetry",
      "section": {
        "en": "BACKUP · DISCUSSION",
        "zh": "备用 · 讨论"
      },
      "title": {
        "en": "Which symmetry survives the weighted Bell target?",
        "zh": "加权 Bell 目标还保留哪些对称性？"
      },
      "duration": 0,
      "layout": "statement",
      "backup": true,
      "bullets": {
        "en": [
          "Use the stabilizer of the objective and constraints.",
          "Full PI Hecke blocks apply only when full PI symmetry is retained.",
          "Larger alphabets and steady-state applications remain development targets."
        ],
        "zh": [
          "使用目标与约束实际保留的稳定子。",
          "只有完整 PI 对称性保留时，才能使用完整 PI Hecke 分块。",
          "更大测量字母表与稳态应用仍是发展目标。"
        ]
      },
      "notes": {
        "en": "Symmetry reduction must preserve the optimization problem. The PI Hecke construction is appropriate when the objective and all constraints retain the full permutation symmetry. A generic asymmetric pivot pair does not satisfy that condition, so imposing full permutation invariance would remove valid strategies or change the objective. Its actual stabilizer may still reduce the moment matrix. The maintained three-outcome spin-one pilot is a finite-group prototype; its outer relaxation is not restricted to qutrit local dimension, even though the attainable strategy uses qutrits. Likewise, the local draft formulates Lindblad steady-state moment constraints, while numerical PI-Lindblad implementations are still a next target. These are useful development directions, but they must not be presented as completed benchmarks or exact finite-size optima.",
        "zh": "对称化简必须保持原优化问题。PI Hecke 构造要求目标和全部约束保留完整置换对称性。一般不对称 pivot pair 不满足这一条件；强行置换不变化会删去合法策略或改变目标，不过实际稳定子仍可能化简矩阵。现有三输出 spin-one pilot 是有限群原型，其外松弛不限制局域维数为 qutrit，尽管可达到策略使用 qutrit。类似地，本地草稿已写出 Lindblad 稳态矩约束，但数值 PI-Lindblad 实现仍是下一步目标。这些方向有价值，却不能展示成已完成基准或有限尺寸精确最优值。"
      },
      "sources": [
        {
          "label": "SDPBell · current local draft",
          "url": ""
        },
        {
          "label": "SDPBell · spin-1 pilot scope",
          "url": ""
        }
      ],
      "formula": {
        "en": "Symmetry reduction uses \\(\\operatorname{Stab}(H_p)\\) and the constraints",
        "zh": "对称化简使用 \\(\\operatorname{Stab}(H_p)\\) 及约束保留的对称性"
      }
    },
    {
      "id": "backup-novelty",
      "backup": true,
      "duration": 0,
      "layout": "statement",
      "section": {
        "en": "BACKUP · PRIORITY AND SCOPE",
        "zh": "备用 · 新颖性与范围"
      },
      "title": {
        "en": "What is known, and what is the specific contribution?",
        "zh": "哪些已有先例，具体新增了什么？"
      },
      "subtitle": {
        "en": "Bounded primary-source comparison · no global-firstness claim",
        "zh": "有界原始文献比较 · 不宣称已证明全球首次"
      },
      "bullets": {
        "en": [
          "<strong>Known:</strong> pivoting, conditional CHSH self-tests, the midpoint \\(W\\) behavior, and self-testing-to-privacy principles.",
          "<strong>Specific contribution:</strong> the exact full-weight quantum / all-cut biseparable supports, ridge census, equality structure, and fixed-pair precision comparison.",
          "<strong>Still open:</strong> two N0 transition strips, a general orientation predictor, and a robust finite-data protocol."
        ],
        "zh": [
          "<strong>已有：</strong>pivoting、条件 CHSH 自测试、中点 \\(W\\) 行为，以及自测试推出隐私的原理。",
          "<strong>具体贡献：</strong>全权重量子／全划分双可分精确支撑、ridge 普查、等号结构及固定输出对的精度比较。",
          "<strong>尚未解决：</strong>两段 N0 转变窄区间、一般朝向预测规则和鲁棒有限数据协议。"
        ]
      },
      "notes": {
        "en": "Novelty is a formula-level comparison, not a claim that nobody has considered Bell geometry or \\(W\\) self-testing. Wu et al. already give the midpoint generalized-\\(W\\) behavior. Holz et al. already give the same midpoint quantum and biseparable numbers for a different functional. Conditional CHSH aggregation, scalar self-testing and privacy implications have clear precedents. The most defensible increment is the complete specified ridge-family support/equality classification with actual all-cut biseparable bounds and fixed-pair operational consequences. The eight ridge orbits are complete at all weights; the fourteen pair orbits are complete at the midpoint. They are not a complete all-weight solution for all ninety-five partners: the two narrow N0 strips remain unresolved. No exact duplicate of the full package was located in the primary formulas examined; this does not prove absence from all literature or establish journal significance.",
        "zh": "新颖性需要按公式和结论范围逐项比较，不能把它写成从未有人研究 Bell 几何或 \\(W\\) 自测试。Wu 等人已经给出中点广义 \\(W\\) 行为；Holz 等人已经在另一 functional 中给出相同的中点量子与双可分数值。条件 CHSH 组合、标量自测试和隐私推论均有明确先例。最可防守的新增是指定 ridge 家族的完整支撑与等号分类，包括实际全划分双可分界和固定输出对的操作后果。八个 ridge 轨道有完整全权重分类；十四个 pair 轨道有完整中点分类。这不等于九十五个伙伴的全权重问题已全部解决：N0 两段窄区间仍然开放。检阅的原文公式未发现完全相同的结果组合，但这不能证明所有文献均无先例，也不能单独保证期刊重要性。"
      },
      "sources": [
        {
          "label": "Wu et al. 2014 · generalized W",
          "url": "https://arxiv.org/abs/1407.5769"
        },
        {
          "label": "Holz et al. 2020",
          "url": "https://arxiv.org/abs/1910.11360"
        },
        {
          "label": "Curchod et al. 2019 · conditional construction",
          "url": "https://arxiv.org/abs/1808.10688"
        },
        {
          "label": "Franz et al. 2011 · privacy",
          "url": "https://arxiv.org/abs/1010.1131"
        }
      ]
    }
  ],
  "storyline": {
    "en": "A useful Bell test is chosen for a resource task. Earlier work finds tight, structured and measurable objectives. The three-party pivot census then resolves how relative orientations alter the actual quantum–biseparable margin. R5 supplies a complete support and equality family, a fixed-source advantage and fixed-pair privacy, while its quadratic precision cost motivates finite-deficit SDP certificates. Surviving symmetry connects those certificates back to the many-body PI program.",
    "zh": "有用的 Bell 检验围绕资源任务来选择。此前工作找到紧、有结构、可测的目标；三方 pivot 分类进一步分辨相对取向怎样改变量子—双可分余量。R5 给出完整支撑与等号家族、固定源优势及固定输出对私密性；二次精度代价自然引出有限亏损 SDP 证书，保留的对称性再把认证连接回多体 PI 路线。"
  }
};
