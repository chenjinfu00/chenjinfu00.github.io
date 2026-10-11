/* Bilingual 30-minute research talk. Notes carry the theorem scope and source attribution. */
window.DECK = {
  "title": {
    "en": "Beyond the Largest Bell Violation",
    "zh": "超越最大的 Bell 违反量"
  },
  "subtitle": {
    "en": "Facet pivoting, quantum resources, and the path to SDP certification",
    "zh": "Facet pivoting、量子资源与 SDP 认证之路"
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
        "en": "THE QUESTION",
        "zh": "核心问题"
      },
      "title": {
        "en": "Beyond the Largest Bell Violation",
        "zh": "超越最大的 Bell 违反量"
      },
      "duration": 30,
      "layout": "title",
      "bullets": {
        "en": [
          "Which Bell test certifies the resource we actually want?",
          "From optimization → facet geometry → quantum resources → SDP"
        ],
        "zh": [
          "什么 Bell 检验能够认证我们真正关心的量子资源？",
          "从优化 → facet 几何 → 量子资源 → SDP"
        ]
      },
      "notes": {
        "en": "The organizing question is not simply how large a Bell violation can become. It is how to design a Bell test for a particular quantum resource, under the measurements and precision we can actually access. The earlier work developed coefficient optimization, permutation-invariant structure, and experimentally accessible few-body witnesses. The new pivoting results change the comparison: two equally strong endpoint inequalities can behave very differently when their scores constrain the same measurements. That difference leads to exact genuine-entanglement regions, weighted W-state self-testing, and private pair randomness. The final step is the SDP program, which connects candidate discovery to certified bounds and practical precision. The emphasis today is on the new pivot results.",
        "zh": "今天的主线不是单纯寻找最大的 Bell 违反量，而是围绕目标量子资源、可用测量和实际精度来设计 Bell 检验。此前的工作发展了系数优化、置换不变结构以及实验可测的少体见证。新的 pivoting 结果改变了比较对象：两个单独看同样强的端点不等式，使用同一组测量时，其联合分数可以表现出完全不同的资源需求。这会连接到精确的真实多体纠缠区间、加权 W 态自测试和双输出私有随机性。最后再讨论 SDP 如何将候选发现变成可认证的界。今天重点是 pivoting 的新结果。"
      },
      "sources": [
        {
          "label": "2511.07523 · ratio optimization",
          "url": "https://arxiv.org/abs/2511.07523"
        },
        {
          "label": "2607.08462 · PI design and certification",
          "url": "https://arxiv.org/abs/2607.08462"
        },
        {
          "label": "2609.37442 · few-body experiment",
          "url": "https://arxiv.org/abs/2609.37442"
        }
      ],
      "subtitle": {
        "en": "Quantum resource transitions between Bell facets · Jin-Fu Chen",
        "zh": "Bell facet 之间的量子资源转变 · 陈劲夫"
      }
    },
    {
      "id": "lineage",
      "section": {
        "en": "ONE DESIGN PROGRAM",
        "zh": "同一条设计路线"
      },
      "title": {
        "en": "Bell witness design, certification, and experiment",
        "zh": "Bell 见证的设计、认证与实验"
      },
      "duration": 45,
      "layout": "roadmap",
      "bullets": {
        "en": [
          "<strong>2025 · 2511.07523</strong><br>Optimize coefficients and find useful facets.",
          "<strong>2026 · 2607.08462</strong><br>Extend the PI analysis and certify structured families.",
          "<strong>2026 · 2609.37442</strong><br>Use few-body symmetric observables in a photonic experiment."
        ],
        "zh": [
          "<strong>2025 · 2511.07523</strong><br>优化系数，寻找有用的 facet。",
          "<strong>2026 · 2607.08462</strong><br>扩展 PI 分析，认证具有结构的家族。",
          "<strong>2026 · 2609.37442</strong><br>在光子实验中使用少体对称观测量。"
        ]
      },
      "notes": {
        "en": "These three papers form a progression rather than three unrelated stories. The first asks how to move through Bell-coefficient space without first enumerating the entire multipartite local polytope. The second substantially overlaps that program and extends the permutation-invariant derivations and certification. The experiment makes the measurement constraint concrete: full many-body correlations are expensive, while a carefully chosen few-body symmetric objective can remain informative. The experiment does not implement the new pivot inequalities. It provides the practical motivation for asking which structure of a Bell objective matters. Pivoting now supplies a geometric laboratory for that question, and SDP supplies a complementary way to certify what candidate objectives can achieve.",
        "zh": "这三篇文章是逐步推进的同一个研究计划。第一篇问：不先枚举完整多体局域多面体，能否直接在 Bell 系数空间中找到有用的见证？第二篇与这一计划存在实质重叠，进一步发展置换不变推导与认证。实验则把测量限制变成具体问题：完整多体关联代价较高，而精心选择的少体对称目标仍然能提供有效信息。该实验没有实现本次新的 pivot 不等式；它提供的是选择合适 Bell 结构的实际动机。Pivoting 给出研究这一问题的几何实验室，SDP 则补上认证能力。"
      },
      "sources": [
        {
          "label": "2511.07523 · ratio optimization",
          "url": "https://arxiv.org/abs/2511.07523"
        },
        {
          "label": "2607.08462 · PI design and certification",
          "url": "https://arxiv.org/abs/2607.08462"
        },
        {
          "label": "2609.37442 · few-body experiment",
          "url": "https://arxiv.org/abs/2609.37442"
        }
      ]
    },
    {
      "id": "ratio-design",
      "section": {
        "en": "BACKGROUND · DISCOVERY",
        "zh": "背景 · 发现"
      },
      "title": {
        "en": "Ratio optimization and tight Bell witnesses",
        "zh": "比值优化与紧 Bell 见证"
      },
      "duration": 90,
      "layout": "split",
      "bullets": {
        "en": [
          "Fix the classical bound; optimize Bell coefficients.",
          "Tight local vertices become active constraints.",
          "A good attained ratio gives a useful noise benchmark."
        ],
        "zh": [
          "固定经典界，优化 Bell 系数。",
          "达到经典界的局域顶点成为活跃约束。",
          "可达到的优良比值给出有用的噪声基准。"
        ]
      },
      "notes": {
        "en": "The starting point is coefficient optimization with the classical bound controlled. A state and measurement ansatz supplies an attainable quantum value, while the active local deterministic vertices restrict how the coefficients can move. This can lead toward a facet without requiring a full initial facet enumeration. With the uniform behavior placed at Bell value zero, the achieved quantum-to-classical ratio determines the white-noise visibility of that achieved behavior. In the earlier numerical work, the many-body quantum values came from a fixed-dimensional symmetric measurement and state ansatz. They are attainable values, not automatically unrestricted quantum optima. The current local PIBell revision sharpens the geometric statement for nondegenerate local maxima; flat directions need separate treatment. Those flat directions will be the bridge to pivoting.",
        "zh": "起点是在控制经典界的同时优化不等式系数。给定态与测量的变分构造提供可达到的量子值，活跃的确定性局域顶点则限制系数可以怎样移动。这样可以向 facet 靠近，而不必一开始就枚举整个多体局域多面体。当均匀行为的分数取零时，可达到的量子／经典比值决定该行为在白噪声下的临界可见度。此前多体数值使用固定维数和对称测量、态的变分假设，因此不能直接视为不受限量子最优值。当前本地 PIBell 修订给出了非退化局部极大值的更精确几何结论；平坦方向需要单独处理，也正是通向 pivoting 的桥梁。"
      },
      "sources": [
        {
          "label": "2511.07523 · ratio optimization",
          "url": "https://arxiv.org/abs/2511.07523"
        },
        {
          "label": "PIBell · current local revision",
          "url": ""
        }
      ],
      "formula": "<span class=\"math\">Δ = β<sub>var</sub>/β<sub>C</sub> &nbsp;·&nbsp; v<sub>crit</sub> = 1/Δ</span>",
      "subtitle": {
        "en": "Uniform behavior at score zero; achieved variational value",
        "zh": "均匀行为取零分；使用可达到的变分值"
      }
    },
    {
      "id": "pi-design",
      "section": {
        "en": "BACKGROUND · STRUCTURE",
        "zh": "背景 · 结构"
      },
      "title": {
        "en": "Permutation symmetry makes the design economical",
        "zh": "置换对称性让设计更经济"
      },
      "duration": 75,
      "layout": "split",
      "bullets": {
        "en": [
          "One- and two-body collective correlators.",
          "Rank-one two-body coefficients: <span class=\"math\">α<sub>kl</sub> = γ<sub>k</sub>γ<sub>l</sub></span>.",
          "Asymptotic paired-family ratios: <span class=\"math\">5/4 → 9/7 → … → coth(1)</span>."
        ],
        "zh": [
          "只使用集体一体与二体关联。",
          "二体系数具有秩一结构：<span class=\"math\">α<sub>kl</sub> = γ<sub>k</sub>γ<sub>l</sub></span>。",
          "配对家族的渐近比值：<span class=\"math\">5/4 → 9/7 → … → coth(1)</span>。"
        ]
      },
      "notes": {
        "en": "The PI follow-up carries forward the coefficient-design idea into an economical many-body family. Rank-one two-body coefficients make the deterministic optimization structured, and exact classical bounds can be computed without pretending that a symmetric quantum ansatz is always optimal. In the paired families, increasing the number of measurement settings improves the asymptotic ratio from five quarters at two settings to nine sevenths at three, with a continuum limit coth of one. The leading asymptotic coefficient is certified within the stated family. This is not an optimum over every PI Bell inequality, and finite-size entries remain variational unless separately certified. The useful continuity is methodological: exploit a structural restriction to choose manageable observables, then certify what the resulting objective actually supports.",
        "zh": "PI 后续工作把系数设计推进到一个多体但测量经济的家族。秩一二体系数让确定性策略优化具有可利用的结构，经典界可以精确计算；同时不能因为不等式具有对称性，就默认对称量子假设一定最优。在配对家族中，测量设置增多时，渐近比值从两个设置的 5/4 提高到三个设置的 9/7，并趋向连续极限 coth(1)。相应家族的主导渐近系数获得认证，但这不是所有 PI Bell 不等式的整体最优性。有限尺寸数值若没有独立认证，仍是变分结果。方法上的连续性是：先利用结构选择可处理的观测量，再认证目标真正能够达到什么。"
      },
      "sources": [
        {
          "label": "2511.07523 · ratio optimization",
          "url": "https://arxiv.org/abs/2511.07523"
        },
        {
          "label": "2607.08462 · PI design and certification",
          "url": "https://arxiv.org/abs/2607.08462"
        }
      ],
      "formula": "<span class=\"math\">I = ∑<sub>k</sub> α<sub>k</sub>⟨S<sub>k</sub>⟩ + ½∑<sub>kl</sub> γ<sub>k</sub>γ<sub>l</sub>⟨S<sub>kl</sub>⟩</span>",
      "subtitle": {
        "en": "2607.08462 extends the earlier program; it is not an unrelated discovery",
        "zh": "2607.08462 延伸此前计划，并非无关的独立发现"
      }
    },
    {
      "id": "fewbody-experiment",
      "section": {
        "en": "BACKGROUND · EXPERIMENT",
        "zh": "背景 · 实验"
      },
      "title": {
        "en": "Few-body observables in a photonic experiment",
        "zh": "光子实验中的少体观测量"
      },
      "duration": 90,
      "layout": "chart",
      "bullets": {
        "en": [
          "Two settings; symmetric two- and four-body terms.",
          "Six-photon noise tolerance: <strong>≈0.301</strong> versus <strong>≈0.048</strong> with two-body terms.",
          "Postselected six-/eight-photon Bell correlations: <strong>32σ / 8.9σ</strong>."
        ],
        "zh": [
          "两个设置；对称二体与四体关联项。",
          "六光子白噪声容忍度：<strong>约 0.301</strong>，仅二体项时为<strong>约 0.048</strong>。",
          "后选择六／八光子态的 Bell 关联认证：<strong>32σ / 8.9σ</strong>。"
        ]
      },
      "notes": {
        "en": "The photonic experiment makes the witness-design problem concrete. The selected six-qubit two- and four-body witness tolerates about 30.1% global white noise, compared with 4.8% for the best two-body PI inequality with the same two settings. The six- and eight-photon postselected Dicke ensembles violate their witness bounds by 32 and 8.9 standard deviations. These are Bell-correlation witnesses rather than loophole-free Bell tests. Certification assumes stable state preparation and measurements across sequential configurations, and fair sampling of N-fold coincidences. Few-body correlators are still extracted from N-photon detection records. This motivates selecting experimentally useful observables; it does not mean the experiment used the present pivot witnesses.",
        "zh": "光子实验使见证设计问题变得具体。选定的六比特二体与四体见证容忍约 30.1% 全局白噪声，而相同两个设置下最好的二体 PI 不等式只有约 4.8%。后选择的六／八光子 Dicke 系综分别以 32 和 8.9 个标准差违反见证界。这属于 Bell 关联见证，并不是无漏洞 Bell 测试。认证依赖于顺序采集不同配置时稳定的态制备与测量，以及 N 重符合的公平采样假设。少体关联仍从 N 光子的检测记录中提取。它说明为什么需要选择实验上有用的观测量，并不意味着该实验使用了本次 pivot 见证。"
      },
      "sources": [
        {
          "label": "2609.37442 · few-body experiment",
          "url": "https://arxiv.org/abs/2609.37442"
        }
      ],
      "asset": "experimental.svg",
      "subtitle": {
        "en": "Bell-correlation certification in postselected states",
        "zh": "在后选择态中认证 Bell 关联"
      }
    },
    {
      "id": "flat-to-pivot",
      "section": {
        "en": "THE BRIDGE",
        "zh": "转折"
      },
      "title": {
        "en": "Flat optima leave the choice of facet open",
        "zh": "平坦最优值留下 facet 选择的问题"
      },
      "duration": 30,
      "layout": "chart",
      "bullets": {
        "en": [
          "Earlier work: neighboring facets can share an optimizer.",
          "Their weighted combination can keep the same ratio.",
          "New question: what if we compare quantum and biseparable support?"
        ],
        "zh": [
          "此前工作：相邻 facet 可以共享最优策略。",
          "它们的加权组合可以维持相同的比值。",
          "新的问题：量子与双可分支撑函数会怎样变化？"
        ]
      },
      "notes": {
        "en": "The earlier supplement already contains a useful warning: adjacent facets can share an optimizing behavior, and a whole segment of convex combinations can then have a flat ratio. A plateau is not just an optimization nuisance. It tells us that a single height can discard information about how witnesses are related. Pivoting organizes those relations through the local-polytope boundary. The new question is whether the unrestricted quantum support and the actual quantum-biseparable support move together when the two scores use common measurements. They need not. That is the conceptual change from the earlier coefficient search to the present resource-transition results. The displayed plateau is earlier context, not evidence for the new R5 support theorem.",
        "zh": "此前补充材料已经指出：相邻 facet 可能共享一个最优行为，因此整段凸组合的比值保持平坦。平台不只是优化过程的障碍，它说明单一高度会丢掉见证之间的关系信息。Pivoting 通过局域多面体边界组织这些关系。现在的问题变成：当两个分数共用测量时，不受限量子支撑与实际量子双可分支撑是否总是一起变化？答案是否定的。这正是从系数搜索转向资源转变的概念改变。图中的平台属于此前工作的背景，不能拿它作为新 R5 支撑定理的证明。"
      },
      "sources": [
        {
          "label": "2511.07523 · ratio optimization",
          "url": "https://arxiv.org/abs/2511.07523"
        }
      ],
      "asset": "plateau.png"
    },
    {
      "id": "shared-tests",
      "section": {
        "en": "PIVOT · THE RESOURCE QUESTION",
        "zh": "PIVOT · 资源问题"
      },
      "title": {
        "en": "Equal endpoint heights do not fix the resource requirement",
        "zh": "相同端点高度，不能决定资源需求"
      },
      "duration": 95,
      "layout": "statement",
      "bullets": {
        "en": [
          "Two lifted-CHSH facets; local bound <span class=\"math\">1</span>.",
          "At either endpoint: <span class=\"math\">h<sub>Q</sub> = h<sub>BS</sub> = 2√2 − 1</span>.",
          "Between them: one state and one shared measurement tuple."
        ],
        "zh": [
          "两个提升的 CHSH facet；局域界为 <span class=\"math\">1</span>。",
          "任一端点：<span class=\"math\">h<sub>Q</sub> = h<sub>BS</sub> = 2√2 − 1</span>。",
          "它们之间：使用同一个态与同一组测量。"
        ]
      },
      "notes": {
        "en": "From here onward I use a maximum-score convention, with local bound one and the uniform behavior at zero. Both endpoint witnesses are lifted CHSH facets in Sliwa class four. Their quantum maximum is two square root two minus one, and that maximum is already attainable with a quantum-biseparable state. Therefore an endpoint violation alone does not certify genuine tripartite entanglement. Now form a weighted scalar from the two witnesses. For each weight, both scores must refer to one state and one complete measurement tuple. That common constraint can become stricter than either endpoint alone. The measurements may be reoptimized when the weight changes, but never separately for the two components at a fixed weight. We compare supports rather than create entanglement.",
        "zh": "从这里开始统一用最大分数记号：局域界为 1，均匀行为分数为 0。两个端点都是 Śliwa 第四类中的提升 CHSH facet。它们的量子最大值为 2√2−1，而且量子双可分态已经可以达到这个值，所以单独端点的违反不能认证真实三体纠缠。现在把两个见证加权成一个标量。每个固定权重下，两个分数必须来自同一个态和完整的同一组测量；这个共同约束可能比任一端点更严格。改变权重时可以重新优化测量，但不能在同一权重下分别优化两个分量。这里比较的是资源认证能力，并不是产生纠缠的过程。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "formula": "<span class=\"math\">H<sub>p</sub> = p f + (1 − p) g &nbsp;&nbsp; 0 ≤ p ≤ 1</span>"
    },
    {
      "id": "pivot-geometry",
      "section": {
        "en": "PIVOT · GEOMETRY",
        "zh": "PIVOT · 几何"
      },
      "title": {
        "en": "Facet neighbors through ridge pivots",
        "zh": "通过 ridge pivot 找到相邻 facet"
      },
      "duration": 75,
      "layout": "chart",
      "bullets": {
        "en": [
          "Facet: dimension <span class=\"math\">D−1</span>; ridge: <span class=\"math\">D−2</span>.",
          "Enumerate the boundary, pivot, and validate the neighbor.",
          "Close a task only after every required boundary step succeeds."
        ],
        "zh": [
          "Facet 的维数为 <span class=\"math\">D−1</span>；ridge 为 <span class=\"math\">D−2</span>。",
          "枚举边界、pivot，并验证相邻 facet。",
          "所需边界步骤全部成功，才能宣布任务闭合。"
        ]
      },
      "notes": {
        "en": "A facet is a tight face of the local polytope. A ridge is its boundary face one dimension lower, and every ridge is shared by exactly two facets. Pivoting crosses that ridge to the other tight witness; in the polar picture, it is a move along an edge. The recursive construction resolves difficult boundary enumeration by descending to the tight-vertex polytope. Completeness requires actual closure, not a numerical search plateau. In the three-party two-setting binary-outcome benchmark, the full local polytope has dimension twenty-six, sixty-four deterministic vertices, fifty-three thousand eight hundred fifty-six facets, and forty-six classes. The implementation reproduces those known classes through cumulative seed coverage. The large projected four-party studies remain partial, so we do not transfer this completeness claim to them.",
        "zh": "Facet 是局域多面体的紧面；ridge 比它低一维，是 facet 的边界面。每个 ridge 恰好由两个 facet 共享，因此 pivot 就是跨过 ridge 到另一个紧见证；在极多面体中对应沿边移动。困难的边界枚举可以下降到紧顶点多面体递归处理。完整性要求真正闭合，不能靠数值搜索不再发现新对象来宣布。三方、两个设置、二元输出的基准具有维数 26、64 个确定性顶点、53,856 个 facet 和 46 个类别。本实现通过多个种子的累计覆盖复现这些已知类别。大规模投影四体研究仍是部分图，不能照搬这里的完整性结论。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "expansion.png"
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
      "duration": 110,
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
      "formula": "<span class=\"math\">Δ = h<sub>Q</sub> &nbsp;&nbsp; δ = (h<sub>Q</sub>−1)/(h<sub>NS</sub>−1)</span>",
      "subtitle": {
        "en": "44 violating classes · positivity and GYNI excluded · S15 uses certified bounds",
        "zh": "44 个量子违反类别 · 排除 positivity 与 GYNI · S15 使用认证界"
      }
    },
    {
      "id": "orientation-census",
      "section": {
        "en": "PIVOT · THE HIDDEN RELATION",
        "zh": "PIVOT · 隐藏的关系"
      },
      "title": {
        "en": "The self-loop contains more than one kind of edge",
        "zh": "一个自环，包含不止一种边"
      },
      "duration": 80,
      "layout": "chart",
      "bullets": {
        "en": [
          "Class 4: <strong>96</strong> physical orientations.",
          "Fix one facet: <strong>95</strong> partners in <strong>14</strong> pair orbits.",
          "<strong>39 / 8</strong> adjacent partners/orbits; <strong>56 / 6</strong> nonadjacent."
        ],
        "zh": [
          "第四类共有 <strong>96</strong> 个物理朝向。",
          "固定一个 facet：<strong>95</strong> 个搭档，分成 <strong>14</strong> 个 pair orbit。",
          "相邻：<strong>39 / 8</strong> 个搭档／orbit；非相邻：<strong>56 / 6</strong>。"
        ]
      },
      "notes": {
        "en": "Both endpoint facets belong to the same Sliwa class, so their physical adjacency is reduced to a self-loop on the class graph. That quotient is convenient for enumeration, but it suppresses relative orientations. We recover them by fixing one of the ninety-six class-four facets and using its stabilizer to classify all ninety-five alternatives. This gives eight adjacent ridge orbits and six nonadjacent pair orbits. Every endpoint has forty-eight tight deterministic vertices out of sixty-four, so any pair shares at least thirty-two. Consequently each weighted test has the same local bound one. We now have a controlled comparison in which endpoint heights and local normalization are held fixed. Importantly, the fourteen-orbit midpoint census and the eight-orbit all-weight ridge classification are different levels of completeness.",
        "zh": "两个端点属于同一个 Śliwa 类别，类别图把它们的物理相邻关系压缩成一个自环。这种商图有利于枚举，但掩盖相对朝向。固定 96 个第四类 facet 中的一个，再用它的稳定子分类另外 95 个，就得到八个相邻 ridge orbit 和六个非相邻 pair orbit。每个端点在 64 个确定性顶点中有 48 个紧顶点，因此任何一对至少共享 32 个，所有加权测试的局域界都同为 1。这样可以在端点高度和局域归一化保持一致的条件下比较资源。必须区分两种完整性：14 个 orbit 的完整中点普查，以及八个 ridge orbit 的全权重分类。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "census.svg"
    },
    {
      "id": "r3-transition",
      "section": {
        "en": "PIVOT · EXACT RESOURCE TRANSITION",
        "zh": "PIVOT · 精确资源转变"
      },
      "title": {
        "en": "A smaller violation can require genuine tripartite entanglement",
        "zh": "更小的违反量，可以要求真实三体纠缠"
      },
      "duration": 110,
      "layout": "chart",
      "bullets": {
        "en": [
          "R3 midpoint: <span class=\"math\">h<sub>Q</sub>=3/2 &gt; h<sub>BS</sub>=√2</span>.",
          "Strict gap only in the central interval.",
          "Both endpoints remain biseparably attainable."
        ],
        "zh": [
          "R3 中点：<span class=\"math\">h<sub>Q</sub>=3/2 &gt; h<sub>BS</sub>=√2</span>。",
          "严格资源间隙只出现在中心区间。",
          "两个端点仍能由双可分实现达到。"
        ]
      },
      "notes": {
        "en": "This is our first exact example of a resource transition. Let t be the absolute weight imbalance and k equal square root two minus one. The actual all-cut quantum-biseparable support is square root two plus k times t. The unrestricted quantum curve rises above it in the central region, with gap one half of the squared positive part of k minus t. At equal weights, the score is only three halves, smaller than the endpoint maximum, but it exceeds the biseparable threshold square root two. Therefore its attainment requires genuine tripartite entanglement. The excluded set is the convex hull over all quantum-biseparable cuts, not a model with arbitrary nonsignaling groups. The midpoint values have a known Holz-inequality precedent; the result here is the exact whole interpolation and its position in the ridge census.",
        "zh": "这是第一个精确资源转变。令 t 表示权重不平衡的绝对值，k=√2−1。实际全划分量子双可分支撑是 √2+kt；不受限量子曲线在中心区间高于它，间隙为 k−t 正部平方的一半。权重相等时，分数只有 3/2，低于端点最大值，却超过双可分阈值 √2，因此必须需要真实三体纠缠。排除的模型是所有量子双可分划分及其凸混合，并不是允许组内任意无信号关联的模型。中点数值与已知 Holz 不等式有联系；这里的结果是整个插值区间的精确支撑函数，以及它在完整 ridge 普查中的位置。"
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
      "formula": "<span class=\"math\">1−1/√2 &lt; p &lt; 1/√2</span>",
      "subtitle": {
        "en": "GME relative to quantum biseparability, not Svetlichny nonlocality",
        "zh": "相对量子双可分模型认证 GME，而非 Svetlichny 非定域性"
      }
    },
    {
      "id": "all-ridges",
      "section": {
        "en": "PIVOT · COMPLETE CLASSIFICATION",
        "zh": "PIVOT · 完整分类"
      },
      "title": {
        "en": "Only two of the eight ridge families carry a gap",
        "zh": "八种 ridge 家族中，只有两种具有间隙"
      },
      "duration": 85,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>192 edges · R3</strong><br>Gap in the central weight interval.",
          "<strong>768 edges · R5</strong><br>Gap at every interior weight.",
          "<strong>912 edges · six other orbits</strong><br>No support gap at any weight."
        ],
        "zh": [
          "<strong>192 条边 · R3</strong><br>中心权重区间具有间隙。",
          "<strong>768 条边 · R5</strong><br>每个内部权重都具有间隙。",
          "<strong>912 条边 · 另外六个 orbit</strong><br>所有权重的支撑间隙均为零。"
        ]
      },
      "notes": {
        "en": "A single example could be accidental. The exact census resolves all one thousand eight hundred seventy-two physical class-four ridge edges into eight symmetry orbits and determines both supports at every weight. Six orbits have equality throughout. R3 is active only centrally; R5 is active at every strictly interior weight. A zero support gap means that a quantum-biseparable realization reaches the same scalar maximum, not that every maximizing state must be unentangled. Geometry alone is also insufficient: R1 and R3 both have thirty-six common tight vertices and orthogonal CHSH coefficient vectors, yet their sign changes occupy different positions and their midpoint resource gaps differ. This makes the relative measurement and conditioning incidence a concrete object to analyze. R5 is the branch that will connect to weighted W states.",
        "zh": "单个例子可能只是偶然。精确普查把 1,872 条物理第四类 ridge 边分成八个对称 orbit，并在所有权重下确定量子与双可分支撑。六个 orbit 始终相等；R3 只在中心激活；R5 在每个严格内部权重激活。零支撑间隙意味着双可分实现能够达到相同标量最大值，并不意味着所有最大态都没有纠缠。单纯几何信息也不充分：R1 与 R3 都共享 36 个紧顶点，CHSH 系数向量都正交，但符号改变的位置不同，中点资源间隙也不同。因此相对测量和条件事件的连接结构成为可以具体研究的对象。接下来 R5 会连接到加权 W 态。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ]
    },
    {
      "id": "r5-family",
      "section": {
        "en": "PIVOT · THE R5 FAMILY",
        "zh": "PIVOT · R5 家族"
      },
      "title": {
        "en": "R5 has a resource gap at every interior weight",
        "zh": "R5 在每个内部权重都有资源间隙"
      },
      "duration": 115,
      "layout": "chart",
      "bullets": {
        "en": [
          "Exact quantum quartic and actual biseparable cubic branches.",
          "<span class=\"math\">h<sub>Q</sub>&gt;h<sub>BS</sub></span> for every <span class=\"math\">0&lt;p&lt;1</span>.",
          "Midpoint: <span class=\"math\">11/7</span> versus <span class=\"math\">(5+2√13)/9</span>."
        ],
        "zh": [
          "精确量子四次方程与实际双可分三次方程的物理分支。",
          "每个 <span class=\"math\">0&lt;p&lt;1</span> 都有 <span class=\"math\">h<sub>Q</sub>&gt;h<sub>BS</sub></span>。",
          "中点：<span class=\"math\">11/7</span>，而双可分界为 <span class=\"math\">(5+2√13)/9</span>。"
        ]
      },
      "notes": {
        "en": "R5 changes the flag party: each witness conditions a seed pair that includes the other witness’s flag party. The exact unrestricted quantum support is selected by a quartic, while the actual all-cut biseparable support is selected by a cubic. Both roots are physically specified and uniquely chosen, rather than arbitrary algebraic solutions. Their difference is strictly positive throughout the open weight interval, and vanishes quadratically at either endpoint. At the midpoint the quantum score is eleven sevenths and the biseparable score is five plus two square root thirteen over nine. The whole curve is exact in arbitrary finite local dimension with binary POVMs, including limiting behaviors. We do not need to display the polynomial coefficients to understand its significance: there is now a continuous family of genuinely tripartite certification tasks with controlled equality conditions.",
        "zh": "R5 改变了条件方：每个见证的 CHSH 种子对都包含另一个见证的条件方。精确不受限量子支撑由四次方程选定，而实际全划分双可分支撑由三次方程选定。两者都具有明确的物理根条件和唯一选择，不是任取一个代数解。它们的差在整个开放权重区间严格为正，并在两端以二次阶闭合。中点量子分数为 11/7，双可分分数为 (5+2√13)/9。全曲线对任意有限局域维数和二元 POVM 成立，包括相应行为极限。理解它的意义不需要现场展示多项式系数：我们得到了一整族真实三体认证任务，并且能进一步分析达到最大值的等号条件。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "r5-curve.svg"
    },
    {
      "id": "weighted-w",
      "section": {
        "en": "PIVOT · EQUALITY IDENTIFIES THE STATE",
        "zh": "PIVOT · 等号识别量子态"
      },
      "title": {
        "en": "One maximal scalar score self-tests a weighted W state",
        "zh": "一个最大标量分数，自测试一个加权 W 态"
      },
      "duration": 115,
      "layout": "chart",
      "bullets": {
        "en": [
          "Every interior weight selects one positive weighted W target.",
          "Local isometries extract the state and tested effects.",
          "Exact statement: finite-dimensional binary-POVM realizations."
        ],
        "zh": [
          "每个内部权重选择一个正振幅加权 W 目标态。",
          "局域等距映射提取目标态与被测试的效应。",
          "精确结论适用于有限维二元 POVM 实现。"
        ]
      },
      "notes": {
        "en": "The support proof tells us what every saturating realization must look like. Jordan reduction splits binary measurements into manageable blocks. Equality forces the relevant anticommutation relations, and a unique interior double root of the remaining angular polynomial selects an irreducible block with a unique positive eigenvector. The saturated sectors can then be aligned by local isometries, including coherent superpositions and an external purification. At each strictly interior weight this extracts the corresponding weighted W state and the tested effects on occupied support. The midpoint behavior is a known generalized-W behavior from Wu and collaborators; it is not a newly discovered W state. The new increment is the exact all-weight support and equality analysis for this specified facet-pair scalar. Endpoints, unused support, and measurement instruments are outside the claim.",
        "zh": "支撑函数证明还能告诉我们每个达到等号的实现必须是什么样。Jordan 化简把二元测量分成可处理的块；等号强制相关反对易关系，剩余角度多项式唯一的内部双根选定不可约块与唯一正特征向量。局域等距映射可以对齐所有饱和扇区，包括相干叠加和外部纯化。因此每个严格内部权重都能提取对应加权 W 态，以及占据支撑上的被测试效应。中点行为属于 Wu 等人已知的广义 W 行为，并不是新发现一种 W 态。新增的是指定 facet pair 标量的全权重精确支撑和等号分析。端点、未占据支撑与测量仪器结构不在结论范围内。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript · all-interior self-test",
          "url": ""
        },
        {
          "label": "Wu et al. 2014 · known W behavior",
          "url": "https://arxiv.org/abs/1407.5769"
        }
      ],
      "asset": "w-state.svg",
      "formula": "<span class=\"math\">|W<sub>p</sub>⟩ = α<sub>p</sub>|100⟩ + β<sub>p</sub>|010⟩ + γ<sub>p</sub>|001⟩</span>",
      "subtitle": {
        "en": "Strictly interior weights; tested effects on occupied state support",
        "zh": "仅严格内部权重；仅占据态支撑上的被测试效应"
      }
    },
    {
      "id": "orientation-controls",
      "section": {
        "en": "PIVOT · NONADJACENT CONTROLS",
        "zh": "PIVOT · 非相邻对照"
      },
      "title": {
        "en": "Orientation matters even when adjacency is removed",
        "zh": "去掉相邻关系，朝向仍然重要"
      },
      "duration": 95,
      "layout": "chart",
      "bullets": {
        "en": [
          "R5 and N0: <strong>same actual biseparable support at every weight</strong>.",
          "Different midpoint quantum scores: <span class=\"math\">11/7</span> versus <span class=\"math\">√2</span>.",
          "N1: midpoint cancellation; strict gap at every unequal interior weight."
        ],
        "zh": [
          "R5 与 N0：<strong>所有权重的实际双可分支撑完全相同</strong>。",
          "中点量子分数不同：<span class=\"math\">11/7</span> 与 <span class=\"math\">√2</span>。",
          "N1：中点抵消；每个不等权内部点都有严格间隙。"
        ]
      },
      "notes": {
        "en": "The nonadjacent controls prevent us from attributing every resource gap to adjacency. All fourteen midpoint pair orbits are classified exactly, and N0 has a positive gap even though its common local face has dimension twenty-three, below a ridge. The strongest comparison is R5 against N0: their actual all-cut biseparable envelope is identical at every weight, but their midpoint quantum maxima differ. That holds the excluded-resource benchmark fixed and isolates a change in quantum compatibility. N1 behaves differently again. Equal weights cancel to support one, but every unequal strictly interior weight has a quantum-biseparable separation. Equal, orthogonal, and opposite shared-party seed rows describe these three solved examples. They are not a general resource predictor, and the census does not show that adjacent pairs are enriched for GME.",
        "zh": "非相邻对照避免把所有资源间隙都归因于相邻关系。14 个 pair orbit 的中点已经精确分类；N0 的共同局域面维数为 23，比 ridge 低一维，但仍具有正间隙。最强的对照是 R5 与 N0：所有权重的实际全划分双可分包络完全相同，中点量子最大值却不同。这固定了被排除的资源基准，单独体现量子测量兼容性的变化。N1 又不同：等权时抵消到支撑 1，任何不等权的严格内部点却产生量子与双可分分离。共同方种子行的相同、正交、相反关系只描述这三个已解例子，不能当作一般资源预测规则；普查也没有证明相邻 pair 更容易认证 GME。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "controls.svg"
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
      "duration": 95,
      "layout": "chart",
      "bullets": {
        "en": [
          "Proved zero gap: <span class=\"math\">[0,0.34] ∪ [0.66,1]</span>.",
          "Proved positive gap: <span class=\"math\">1−p* &lt; p &lt; p*</span>, <span class=\"math\">p*≈0.6437323</span>.",
          "The intervening intervals remain <strong>open</strong>."
        ],
        "zh": [
          "已证明零间隙：<span class=\"math\">[0,0.34] ∪ [0.66,1]</span>。",
          "已证明正间隙：<span class=\"math\">1−p* &lt; p &lt; p*</span>，<span class=\"math\">p*≈0.6437323</span>。",
          "两段中间区间仍是<strong>开放问题</strong>。"
        ]
      },
      "notes": {
        "en": "This is the latest continuous N0 refinement. The central positive-gap interval comes from a transverse perturbation of the attaining biseparable strategy. Its algebraically isolated threshold is about point six four three seven three two three, but that proof is sufficient rather than a full phase diagram. A different physical-angle argument now proves exact equality of quantum and actual biseparable support from zero through point three four and from point six six through one, including those outer boundary weights. The unknown transition is therefore confined to two narrow intervals. Hatched regions mean unresolved, not numerical zero. The threshold p star itself is not assigned equality or strict separation. Independently certified individual weights within these regions do not fill the intervals. N0 remains a valuable open control rather than an overclaimed exact full curve.",
        "zh": "这是最新的 N0 连续区间精炼。中心正间隙区间来自对达到双可分界的策略做横向扰动，其隔离出的代数阈值约为 0.6437323，但该证明只是充分区间，不是完整相图。另一条物理角度论证现在证明：从 0 到 0.34，以及从 0.66 到 1，量子支撑与实际双可分支撑精确相等，而且包含这些外侧边界。未知转变因此限制在两个很窄的区间。斜线区域表示尚未解决，不是数值零。p* 本身也没有被赋予相等或严格分离的结论。区间中独立认证的个别权重不能填满整段。N0 是一个有价值的开放对照，而不是被夸大为已求解全曲线的对象。"
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
      }
    },
    {
      "id": "private-pair",
      "section": {
        "en": "PIVOT · PRIVATE RANDOMNESS",
        "zh": "PIVOT · 私有随机性"
      },
      "title": {
        "en": "Private randomness from the joint Bell score",
        "zh": "联合 Bell 分数认证双输出私有随机性"
      },
      "duration": 115,
      "layout": "chart",
      "bullets": {
        "en": [
          "Endpoint maxima: <strong>1 private pair bit</strong>.",
          "Midpoint: <span class=\"math\">G=11/28</span>; <strong>≈1.348 bits</strong>.",
          "Interior exact maxima approach <strong>2 bits</strong> near either endpoint."
        ],
        "zh": [
          "端点最大值：<strong>1 个双输出私有比特</strong>。",
          "中点：<span class=\"math\">G=11/28</span>；<strong>约 1.348 比特</strong>。",
          "内部精确最大值在两端极限趋向<strong>2 比特</strong>。"
        ]
      },
      "notes": {
        "en": "Fix the generation outputs A zero and B zero throughout the comparison. At either endpoint exact maximum, the tight worst-case pair guessing probability is one half, so the scalar guarantees one private bit. At the R5 midpoint it is eleven over twenty-eight, giving approximately one point three four eight pair bits. The all-interior self-test gives the finite-dimensional exact-score formula shown here. The source changes with the weight, and the entropy tends to two bits when either endpoint is approached from the interior. Open endpoint limits must be distinguished from the actual one-bit endpoint guarantees. Eve is an external quantum adversary, the inputs are independent of the devices, and Charlie’s output is undisclosed. This is a statement about this fixed pair and exact maximal scores, not a uniform robust two-bit protocol.",
        "zh": "整个比较固定生成输出 A₀B₀。任一端点精确最大值下，最坏情况的紧猜测概率是 1/2，标量因此保证 1 个私有比特。R5 中点猜测概率为 11/28，给出约 1.348 个双输出私有比特。全内部自测试进一步给出这里的有限维精确分数公式。目标源随权重变化，内部趋向任一端点时熵趋向 2 比特。图上开放的端点极限必须与真正端点的 1 比特保证区分。Eve 是外部量子对手，输入与设备独立，Charlie 输出不公开。结论针对固定输出对与精确最大分数，并不是具有统一鲁棒性的两比特协议。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "privacy.svg",
      "formula": "<span class=\"math\">G<sub>fin</sub> = (1+2α<sub>p</sub>β<sub>p</sub>)/4</span>",
      "subtitle": {
        "en": "Independent inputs · external quantum Eve · Charlie undisclosed",
        "zh": "输入独立 · 外部量子 Eve · 不公开 Charlie 输出"
      }
    },
    {
      "id": "precision-cost",
      "section": {
        "en": "PIVOT · WHAT PRECISION BUYS",
        "zh": "PIVOT · 精度的代价"
      },
      "title": {
        "en": "The ideal two-bit limit comes with a quadratic precision cost",
        "zh": "理想两比特极限，伴随二次阶精度成本"
      },
      "duration": 110,
      "layout": "chart",
      "bullets": {
        "en": [
          "A score window guaranteeing &gt;1 bit must obey <span class=\"math\">w≤Δ<sub>p</sub></span>.",
          "Near either endpoint, <span class=\"math\">Δ<sub>p</sub>∝min(p,1−p)²</span>.",
          "Separate finite-deficit state and privacy certificates exist."
        ],
        "zh": [
          "保证超过 1 比特的分数窗口必须满足 <span class=\"math\">w≤Δ<sub>p</sub></span>。",
          "靠近任一端点，<span class=\"math\">Δ<sub>p</sub>∝min(p,1−p)²</span>。",
          "另有有限亏损下的态与隐私证书，二者分别成立。"
        ]
      },
      "notes": {
        "en": "The ideal endpoint limit is not free. The actual biseparable attainers can make one queried party deterministic, and Eve can know the preparation label. They provide completions at every nonnegative score from zero to the actual biseparable support, with guessing probability at least one half. Therefore any scalar deficit window guaranteeing more than one pair bit must fit inside the quantum-biseparable gap. That gap closes quadratically, so a fixed experimental error cannot follow the ideal two-bit limit to the endpoint. We also have positive finite-deficit guarantees: rational probability certificates at three weights and a separate state-fidelity extraction bound at each fixed interior weight. For example, the midpoint sufficient constant sixty-six guarantees fidelity at least point nine three four at deficit point zero zero one. These bounds do not form a robust measurement self-test or an adversarial finite-data security protocol.",
        "zh": "理想端点极限并非没有成本。实际双可分达到者能够让被查询的一方确定性输出，Eve 可以知道制备标签；这样从 0 到实际双可分支撑的每个非负分数，都能完成为猜测概率至少 1/2 的实现。因此保证双输出超过 1 私有比特的标量亏损窗口，必须装进量子与双可分间隙。这个间隙以二次阶闭合，所以固定实验误差不能一路跟随理想两比特极限到端点。同时也有正面的有限亏损保证：三个权重上的有理概率证书，以及每个固定内部权重单独成立的态保真度提取界。例如中点充分常数 66 在亏损 0.001 时保证保真度至少 0.934。这些结果不是鲁棒测量自测试，也不是对抗性有限数据安全协议。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "precision.svg",
      "formula": "<span class=\"math\">ε<sub>p</sub>=h<sub>Q</sub>−⟨H<sub>p</sub>⟩ &nbsp;·&nbsp; w≤h<sub>Q</sub>−h<sub>BS</sub></span>",
      "subtitle": {
        "en": "Necessary precision constraint; sufficient robust bounds are separate",
        "zh": "必要精度约束；充分鲁棒界另行给出"
      }
    },
    {
      "id": "certification-pipeline",
      "section": {
        "en": "SDP · THE HANDOFF",
        "zh": "SDP · 方法衔接"
      },
      "title": {
        "en": "Quantum optima and resource bounds",
        "zh": "量子最优值与资源界"
      },
      "duration": 90,
      "layout": "chart",
      "bullets": {
        "en": [
          "Geometry selects a facet pair and a useful weight.",
          "An explicit strategy supplies an attained quantum score.",
          "Validated upper bounds decide the claim we can certify."
        ],
        "zh": [
          "几何挑选 facet pair 和有用权重。",
          "显式策略提供可达到的量子分数。",
          "经过验证的上界决定能够认证什么。"
        ]
      },
      "notes": {
        "en": "Here is the handoff from pivoting to SDP. An explicit state and measurements give a lower bound on a maximum quantum score. A moment relaxation supplies an upper bound, and a validated dual identity can turn numerical evidence into a rigorous certificate. Closing those two bounds determines an optimum. Certifying a resource gap is a different comparison: the attained score must exceed a separately validated upper bound for the excluded resource, such as quantum biseparability across all cuts. Robust private guessing and extraction fidelity introduce yet other objectives. Some present pivot bounds already use exact rational Gram certificates. The proposed program is to organize these tasks around geometry-selected pairs and weights. It is not a completed all-pair pipeline, and it does not make raw solver output rigorous automatically.",
        "zh": "这里把 pivoting 衔接到 SDP。显式态与测量给最大量子分数的下界；矩松弛给上界，经验证的对偶恒等式才能把数值证据变成严格证书。两界合拢用于确定最优值。认证资源间隙是另一种比较：可达到分数要超过被排除资源模型的另行严格上界，例如所有量子双可分划分。鲁棒私有猜测和提取保真度还需要其他目标。本次 pivot 结果中已有一些界使用精确有理 Gram 证书。后续计划是围绕几何挑选的 pair 与权重组织这些任务，但还不能宣称完成全 pair 流程，也不能自动把原始求解器输出当作严格证明。"
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
      "formula": {
        "en": "<span class=\"math\">attained score ≤ h<sub>Q</sub> ≤ validated upper bound</span>",
        "zh": "<span class=\"math\">可达到分数 ≤ h<sub>Q</sub> ≤ 经核验的上界</span>"
      },
      "subtitle": {
        "en": "Proposed integration; distinct certificates for distinct resource questions",
        "zh": "待整合的流程；不同资源问题需要不同证书"
      }
    },
    {
      "id": "hecke-sdp",
      "section": {
        "en": "SDP · THE MANY-BODY BRIDGE",
        "zh": "SDP · 多体桥梁"
      },
      "title": {
        "en": "Fixed blocks for many-body moment SDPs",
        "zh": "多体矩 SDP 的固定分块"
      },
      "duration": 90,
      "layout": "chart",
      "bullets": {
        "en": [
          "PI level 2 blocks: <span class=\"math\">8, 8, 3, 1</span>.",
          "PI level 3 blocks: <span class=\"math\">18, 24, 13, 7, 4, 2</span>.",
          "At <span class=\"math\">N=500</span>: numerical normalized gap <strong>≈1.43×10⁻⁷</strong>."
        ],
        "zh": [
          "PI 第二层分块：<span class=\"math\">8, 8, 3, 1</span>。",
          "PI 第三层分块：<span class=\"math\">18, 24, 13, 7, 4, 2</span>。",
          "在 <span class=\"math\">N=500</span>：归一化数值上下界差<strong>约 1.43×10⁻⁷</strong>。"
        ]
      },
      "notes": {
        "en": "The existing SDPBell project gives a concrete structural route. For binary two-setting permutation-invariant moment relaxations, Hecke overlap patterns assemble representative blocks whose sizes stay fixed at a chosen hierarchy level in the stable particle-number range. Particle number changes the coefficients, not these block dimensions. For the PI two-body benchmark at five hundred particles, the attained normalized value is one point two one three one three three four nine one, and the level-three numerical upper estimate is one point two one three one three three six three four. Their difference is about one point four three times ten to the minus seven. This is a strong numerical sandwich, not a rationally certified exact optimum. For asymmetric pivot targets, only surviving symmetries may be used; imposing full PI symmetry would change the problem.",
        "zh": "现有 SDPBell 课题给出了具体的结构路线。对于二元、两个设置、置换不变的矩松弛，Hecke 重叠模式可以组装代表分块，在固定层级和稳定粒子数范围内，块大小保持不变，粒子数改变的是系数。五百粒子的 PI 二体基准中，可达到归一化值约为 1.213133491，而第三层数值上界估计约为 1.213133634，差约 1.43×10⁻⁷。这是很强的数值上下界夹逼，并不是已经有理认证的精确最优值。对于通常不对称的 pivot 目标，只能使用实际保留下来的对称性；强行施加完整 PI 对称性会改变待优化问题。"
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
        "en": "Fixed hierarchy level and stable N range; numerical solver estimates",
        "zh": "固定层级与稳定 N 范围；结果为数值求解器估计"
      }
    },
    {
      "id": "closing",
      "section": {
        "en": "THE NEXT QUESTION",
        "zh": "下一个问题"
      },
      "title": {
        "en": "Bell geometry and resource certification",
        "zh": "Bell 几何与资源认证"
      },
      "duration": 60,
      "layout": "statement",
      "bullets": {
        "en": [
          "R5 links exact Bell support to a weighted-W self-test and private pair randomness.",
          "N0 and N1 show why adjacency alone does not classify resource transitions.",
          "Next: close the N0 strips and certify robust task bounds using each target’s stabilizer."
        ],
        "zh": [
          "R5 将精确 Bell 支撑连接到加权 W 态自测试与双输出私有随机性。",
          "N0、N1 表明，仅靠相邻关系不能分类资源转变。",
          "下一步：闭合 N0 窄区间，并利用各目标的稳定子认证鲁棒任务界。"
        ]
      },
      "notes": {
        "en": "The series now has a coherent division of labor. Coefficient optimization and PI structure discover economical Bell objectives. The experiment reminds us that observables and noise tolerance are real design constraints. Pivoting turns the local boundary into a controlled comparison, and the new exact cases show why equal endpoint heights cannot determine entanglement or private randomness. The R5 support, equality, and precision chain is the main new result. N0 and N1 make the orientation controls explicit without promoting adjacency into a general predictor. The next research questions are precise: close the remaining N0 transition intervals, determine which orientation information predicts useful witnesses beyond this family, and certify robust task bounds with symmetry-aware SDPs. A full experimental security protocol remains a separate project.",
        "zh": "这一系列工作形成了明确分工。系数优化与 PI 结构负责发现测量经济的 Bell 目标；实验提醒我们观测量和噪声容忍度是真实设计约束。Pivoting 把局域边界变成受控对照，新精确例子说明相同端点高度不能决定纠缠认证或私有随机性。R5 的支撑、等号与精度链条是这里主要的新结果；N0、N1 明确体现朝向效应，却不能把相邻关系提升成一般预测规则。接下来的问题很具体：闭合 N0 剩余转变区间，研究本家族以外哪些朝向信息能预测有用见证，并用保留实际对称性的 SDP 认证鲁棒任务界。完整实验安全协议仍是另一项工作。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ]
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
      "formula": "<span class=\"math\">Δ<sub>p</sub> = h<sub>Q</sub>(H<sub>p</sub>) − h<sub>BS</sub>(H<sub>p</sub>)</span>"
    },
    {
      "id": "backup-robust",
      "section": {
        "en": "BACKUP · DISCUSSION",
        "zh": "备用 · 讨论"
      },
      "title": {
        "en": "State fidelity and private guessing use separate certificates",
        "zh": "态保真度与私有猜测使用不同证书"
      },
      "duration": 0,
      "layout": "chart",
      "backup": true,
      "bullets": {
        "en": [
          "Midpoint state: <span class=\"math\">F≥max(0,1−66ε)</span>.",
          "Midpoint privacy: <span class=\"math\">G≤0.441+6ε</span>.",
          "Selected-weight privacy at <span class=\"math\">p=1/2, 1/4, 1/10</span>."
        ],
        "zh": [
          "中点态：<span class=\"math\">F≥max(0,1−66ε)</span>。",
          "中点隐私：<span class=\"math\">G≤0.441+6ε</span>。",
          "指定权重隐私界：<span class=\"math\">p=1/2, 1/4, 1/10</span>。"
        ]
      },
      "notes": {
        "en": "The finite-deficit results answer two different questions. The state-extraction theorem bounds infidelity at each fixed interior weight, uniformly in finite local dimension and binary POVMs. Its explicit constants are bounded on compact interior weight intervals and are sufficient, not optimal. At the midpoint, C equals sixty-six; at one quarter, a conservative sufficient constant is one hundred thousand. These do not certify measurement action at nonzero deficit. The private guessing result instead uses exact rational probability duals, with the same affine bound surviving conditioning on Eve. The simple sufficient intercepts are point four four one, point four two one, and point four eight six at the three displayed weights, each with slope six. Stronger midpoint slope-family envelopes appear in the plot. None of these bounds alone is an adversarial finite-statistics protocol.",
        "zh": "有限亏损结果回答两种不同问题。态提取定理在每个固定内部权重约束不保真度，对有限局域维数和二元 POVM 统一成立；显式常数在紧内部权重区间有界，而且只是充分值。中点 C=66，四分之一权重的保守充分常数为 100000。它们不认证非零亏损下的测量作用。私有猜测结果则使用精确有理概率对偶界，条件化到 Eve 后相同仿射界仍成立。三个权重的简单充分截距分别为 0.441、0.421、0.486，斜率都为 6；图还使用更强的中点多斜率包络。上述界单独都不构成对抗性有限统计协议。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "robust.svg",
      "formula": {
        "en": "<span class=\"math\">ε = h<sub>Q</sub> − observed score</span>",
        "zh": "<span class=\"math\">ε = h<sub>Q</sub> − 观测分数</span>"
      },
      "subtitle": {
        "en": "Sufficient bounds; neither the entropy tradeoff nor the constants are optimal",
        "zh": "充分界；熵权衡和常数均未声称最优"
      }
    },
    {
      "id": "backup-fixed-source",
      "section": {
        "en": "BACKUP · DISCUSSION",
        "zh": "备用 · 讨论"
      },
      "title": {
        "en": "R5 and Mermin on the same noisy W source",
        "zh": "同一个噪声 W 源上的 R5 与 Mermin"
      },
      "duration": 0,
      "layout": "split",
      "backup": true,
      "bullets": {
        "en": [
          "Fixed <span class=\"math\">|W*⟩=(√2|100⟩+√2|010⟩+√3|001⟩)/√7</span>.",
          "R5 certifies GME for <span class=\"math\">v&gt;0.863411…</span>.",
          "All binary-POVM Mermin strategies fail for <span class=\"math\">v≤0.871602…</span>."
        ],
        "zh": [
          "固定 <span class=\"math\">|W*⟩=(√2|100⟩+√2|010⟩+√3|001⟩)/√7</span>。",
          "R5 在 <span class=\"math\">v&gt;0.863411…</span> 时认证 GME。",
          "所有二元 POVM Mermin 策略在 <span class=\"math\">v≤0.871602…</span> 时无法检出。"
        ]
      },
      "notes": {
        "en": "This comparison fixes the honest source rather than comparing individually optimized witness families. Mix the unequal midpoint W target with global white state noise and keep the R5 midpoint measurements fixed. The witness crosses its exact actual-biseparable bound when the visibility exceeds approximately point eight six three four one one. An established Mermin tensor upper bound, together with the treatment of deterministic-input branches, implies that no binary-POVM Mermin strategy detects GME on this source up to approximately point eight seven one six zero two. The resulting interval is a rigorous advantage for this specified source. The Mermin number is a lower bound on the visibility needed for detection, not its exact optimum. This is not an optimum over every GME witness, and it says nothing about the separability threshold of the noisy state.",
        "zh": "这个比较固定诚实源，而不是让两个见证家族各自选择最优态。对不等振幅中点 W 目标加入全局白噪声，并固定 R5 中点测量，可见度超过约 0.863411 时见证跨过其精确实际双可分界。已有 Mermin 张量上界加上确定性输入分支处理，推出在此源上可见度不超过约 0.871602 时，任何二元 POVM Mermin 策略都不能检出 GME。因此中间区间给这个指定源上的严格优势。Mermin 数字是检出所需可见度的下界，并非精确最优阈值；也没有对所有 GME 见证优化，更没有求噪声态的可分阈值。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "formula": "<span class=\"math\">ρ<sub>v</sub> = v|W*⟩⟨W*| + (1−v)I/8</span>"
    },
    {
      "id": "backup-proof",
      "section": {
        "en": "BACKUP · DISCUSSION",
        "zh": "备用 · 讨论"
      },
      "title": {
        "en": "The exact curve needs a physical branch, not just a polynomial",
        "zh": "精确曲线需要物理分支，不能只给一个多项式"
      },
      "duration": 0,
      "layout": "split",
      "backup": true,
      "bullets": {
        "en": [
          "R5 quantum support: uniquely selected quartic root.",
          "Actual biseparable support: unique positive cubic root; all cuts compared.",
          "Equality analysis: Jordan blocks, radial identities, one interior double root."
        ],
        "zh": [
          "R5 量子支撑：唯一选定的四次方程物理根。",
          "实际双可分支撑：唯一正三次根，并比较所有划分。",
          "等号分析：Jordan 块、径向恒等式、唯一内部双根。"
        ]
      },
      "notes": {
        "en": "A resultant or numerical root by itself does not establish a support theorem. The proof must exclude unphysical and competing branches, show the upper bound for all measurements, and construct an attaining realization. For R5, Jordan reduction and exact characteristic polynomials yield the physical quantum quartic and the all-cut biseparable cubic. Positivity certificates and root isolation select the branches. The equality analysis then forces Alice’s and Bob’s relevant anticommutation, fixes Charlie’s angular double root, and identifies the positive eigenvector of an irreducible three-dimensional block. That is why the same calculation can support a self-test rather than merely an ansatz optimum. At the midpoint, the behavior is known from Wu and collaborators. The present contribution is the complete specified interpolation and its support, equality, and resource-precision chain.",
        "zh": "单独一个结式或数值根不能证明支撑定理。必须排除非物理解和竞争分支，对所有测量证明上界，并构造达到者。R5 使用 Jordan 化简与精确特征多项式得到物理量子四次方程和全划分双可分三次方程，再通过正性证书与根隔离选择分支。等号分析强制 Alice、Bob 的相关反对易关系，确定 Charlie 的角度双根，并选定不可约三维块的正特征向量。所以同一计算能够支持自测试，而不只是一个假设空间内的最优值。中点行为已见于 Wu 等人的工作；本次贡献是指定整条插值及其支撑、等号和资源精度链条。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript · appendices",
          "url": ""
        },
        {
          "label": "Wu et al. 2014",
          "url": "https://arxiv.org/abs/1407.5769"
        }
      ]
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
        "en": "<span class=\"math\">Symmetry reduction uses Stab(H<sub>p</sub>) and the constraints</span>",
        "zh": "<span class=\"math\">对称化简使用 Stab(H<sub>p</sub>) 及约束保留的对称性</span>"
      }
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
          "At the midpoint and endpoints: <span class=\"math\">h<sub>Q</sub> = h<sub>BS</sub></span>.",
          "Every other interior weight has a strict support gap.",
          "Opposite shared-party rows give a distinct solved control."
        ],
        "zh": [
          "中点和端点：<span class=\"math\">h<sub>Q</sub> = h<sub>BS</sub></span>。",
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
    }
  ]
};
