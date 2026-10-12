/* Original v0 pivot story first; exploratory follow-up is a separate discussion. */
window.DECK = {
  "title": {
    "en": "Recursive Facet Expansion of Bell Polytopes",
    "zh": "Bell 多面体的递归面展开"
  },
  "subtitle": {
    "en": "The original pivot story, followed by research ideas under assessment",
    "zh": "先讲原来的 pivot 主线，再讨论待评估的新方向"
  },
  "languages": [
    "en",
    "zh"
  ],
  "defaultLanguage": "en",
  "totalDuration": 1800,
  "date": "2026-10-12",
  "revisionDate": "2026-10-12",
  "slides": [
    {
      "id": "opening",
      "title": {
        "en": "Recursive Facet Expansion of Bell Polytopes",
        "zh": "Bell 多面体的递归面展开"
      },
      "section": {
        "en": "Pivoting and nonlocality",
        "zh": "Pivot 与非局域性"
      },
      "duration": 30,
      "layout": "title",
      "bullets": {
        "en": [
          "Jin-Fu Chen",
          "Group meeting, 12 October 2026"
        ],
        "zh": [
          "Jin-Fu Chen",
          "2026年10月12日组会"
        ]
      },
      "notes": {
        "en": "The story starts with a physical objective: finding Bell tests that tolerate more uniform noise. Our updated first paper shows that searching facets loses no robustness optimum. Direct Double Description supplies facets but can leave large boundary problems unfinished. We therefore explore their adjacency with recursive pivots and apply this to two four-party correlator projections. After the original landscape results, a separate discussion asks about shared-strategy resources and future SDP certificates.",
        "zh": "故事从一个物理目标开始：寻找能容忍更多均匀噪声的 Bell 检验。第一篇更新稿说明，限制到 facets 不损失最优鲁棒性。直接 Double Description 可以寻找 facets，但较大的边界问题可能未完成。因此，我们用递归 pivot 探索邻接，把它应用到两个四体关联项投影。讲完原 landscape 结果后，再独立讨论共同策略下的资源与后续 SDP 证书。"
      },
      "sources": [],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The updated first paper explains why facets are sufficient for the robustness optimum.",
          "zh": "第一篇更新稿解释为什么 facets 足以实现最优鲁棒性。"
        }
      }
    },
    {
      "id": "lineage",
      "section": {
        "en": "Motivation: robustness selects the target",
        "zh": "动机：鲁棒性确定搜索目标"
      },
      "title": {
        "en": "Robust Bell-test search reduces to facet search",
        "zh": "寻找最鲁棒的 Bell 不等式，可以限制到 facets"
      },
      "duration": 85,
      "layout": "wide",
      "bullets": {
        "en": [
          "<strong>Nondegenerate local maximum:</strong> the Bell inequality defines a facet.",
          "<strong>Nonfacet local maximum:</strong> follow a flat direction to a facet without decreasing the ratio."
        ],
        "zh": [
          "<strong>非退化局部最大值：</strong>对应的紧不等式定义一个 facet。",
          "<strong>非 facet 局部最大值：</strong>沿平坦方向收紧到 facet，比值不下降。"
        ]
      },
      "notes": {
        "en": "Speaker script (about 90 seconds):\nWhich Bell test tolerates the most uniform noise? Set the uniform behavior’s score to zero. Then the quantum-to-classical ratio is \\(\\Delta=\\beta_Q/\\beta_C\\), and a violating strategy has critical visibility \\(v_c=1/\\Delta\\). Larger ratios mean greater noise tolerance.\n\nOur updated first paper shows that restricting this search to facets loses no optimum. A nondegenerate local ratio maximum defines a facet. A nonfacet local maximum has flat coefficient directions along which we can tighten the inequality without decreasing the ratio. The figure shows new classical vertices becoming active until a facet is reached.\n\nThis gives us the target for the pivot project. We want to discover and connect facet Bell tests in four-party projections. The next issue is computational: how do we explore that boundary when direct conversion is unfinished?\n\nReference, outside the timed script:\nFix the quantum strategy domain and remove normalization/nonsignaling coefficient redundancies. Set \\(I(P_{\\mathrm{uni}})=0\\). The compact coefficient polytope is \\(K=\\{T:T\\cdot v\\geq-1\\ \\forall v\\in V\\}\\); the scale-normalized search lies on its boundary \\(\\partial K=\\{T:\\beta_C(T)=-1\\}\\). Since \\(-\\beta_Q\\) is convex, decomposing a point of \\(K\\) into its extreme points proves the displayed optimal-value equality. The extreme points correspond to facets. For a restricted coefficient subspace these are projection facets. A fixed variational family is allowed if its true infimum is used; individual numerical see-saw scores do not certify it. The statement does not guarantee that a numerical optimizer reaches the global maximum.",
        "zh": "口头讲稿（约90秒）：\n我们先问：哪个 Bell 检验能容忍最多均匀噪声？把均匀行为得分归零后，量子与经典界的比值是 \\(\\Delta=\\beta_Q/\\beta_C\\)。对违反策略，临界可见度是 \\(v_c=1/\\Delta\\)，所以比值越大，噪声容忍度越好。\n\n第一篇更新稿说明，把搜索限制到 facets 不会损失最优值。非退化的比值局部最大值定义一个 facet；非 facet 的局部最大值有平坦的系数方向，可以继续收紧，而且不降低比值。图中不断加入新的活跃经典顶点，最后到达 facet。\n\n这就给现在的 pivot 课题明确了目标：发现并连接四体投影中的 facet Bell 检验。接下来是计算问题：直接转换未完成时，怎样继续探索这条边界？\n\n参考说明，不计入口头时长：\n量子策略域固定，去掉归一化与无信号系数冗余，并令 \\(I(P_{\\mathrm{uni}})=0\\)。紧致系数多面体是 \\(K=\\{T:T\\cdot v\\geq-1\\ \\forall v\\in V\\}\\)；固定尺度的搜索位于边界 \\(\\partial K=\\{T:\\beta_C(T)=-1\\}\\)。\\(-\\beta_Q\\) 关于系数凸，将 \\(K\\) 中一点分解为极点凸组合，便得到图示最优值等价；极点对应 facets。系数受限时是对应投影的 facets。固定变分族也适用，但要用真实下确界，单个数值 see-saw 得分不能提供该保证。定理不保证数值优化器找到全局最大值。"
      },
      "sources": [
        {
          "label": {
            "en": "First paper, author-supplied revised theorem",
            "zh": "第一篇文章，作者提供的更新定理"
          },
          "url": "https://arxiv.org/abs/2511.07523"
        }
      ],
      "backup": false,
      "story": {
        "question": {
          "en": "Which Bell tests tolerate the most uniform noise?",
          "zh": "哪些 Bell 检验能容忍最多均匀噪声？"
        },
        "takeaway": {
          "en": "Restricting the search to facets loses no optimum under the stated normalization.",
          "zh": "在所述归一化下，限制到 facets 不损失最优值。"
        },
        "transition": {
          "en": "The target is now clear. How do we find and explore these facets?",
          "zh": "搜索目标已经明确；怎样找到并探索这些 facets？"
        }
      },
      "formula": "\\[\\Delta(I)=\\frac{\\beta_Q(I)}{\\beta_C(I)},\\quad v_c=\\frac1{\\Delta}\\quad(\\Delta>1),\\qquad \\max_{\\mathrm{valid}\\ I}\\Delta(I)=\\max_{\\mathrm{facet}\\ F}\\Delta_F.\\]",
      "phase": "background",
      "figureCaption": {
        "en": "Uniform reference: \\(I(P_{\\mathrm{uni}})=0\\). Scale: \\(\\beta_C=-1\\). Fixed quantum strategy domain.",
        "zh": "均匀参考：\\(I(P_{\\mathrm{uni}})=0\\)；尺度：\\(\\beta_C=-1\\)；量子策略域固定。"
      },
      "asset": "illustration_round1.png",
      "assetAlt": {
        "en": "Tightening a Bell inequality by adding active deterministic vertices; primal and coefficient-space views.",
        "zh": "逐步加入活跃确定性顶点，把 Bell 不等式收紧到 facet；左为原空间，右为系数空间。"
      },
      "bodyIntro": {
        "en": "Our first paper: Optimizing quantum violation yields facet Bell inequalities",
        "zh": "第一篇更新稿：Optimizing quantum violation yields facet Bell inequalities"
      }
    },
    {
      "id": "ratio-design",
      "section": {
        "en": "Motivation: from the target to a workable search",
        "zh": "动机：从搜索目标到可执行的方法"
      },
      "title": {
        "en": "Direct DD leaves difficult boundary problems",
        "zh": "直接 DD 仍会留下困难的边界问题"
      },
      "duration": 85,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>Actual bottleneck:</strong> some facet-boundary calls do not finish with the available computing resources.",
          "<strong>Application:</strong> one-/two-body (\\(D=32\\)) and two-/four-body (\\(D=40\\)) projections of \\((4,2,2)\\)."
        ],
        "zh": [
          "<strong>实际瓶颈：</strong>部分 facet 的边界调用无法在给定资源内完成。",
          "<strong>应用：</strong>\\((4,2,2)\\) 的一、二体（\\(D=32\\)）及二、四体（\\(D=40\\)）投影。"
        ]
      },
      "notes": {
        "en": "Speaker script (about 90 seconds):\nWe now know that facets are sufficient. Double Description, or DD, converts local vertices into supporting facet inequalities. But a short vertex list can have a very large boundary. The full \\((4,2,2)\\) scenario already has dimension 80, despite only 256 deterministic behaviors.\n\nOur method starts from one facet and pivots across its ridges to neighboring facets. DD still solves manageable face boundaries. When such a call remains unfinished, recursive expansion enters that face as a lower-dimensional child and explores its boundary progressively. Verified child facets supply parent ridges and pivots, while unresolved work remains recorded.\n\nWe apply this to the 32-dimensional one-/two-body projection and the 40-dimensional two-/four-body projection. Both libraries remain partial. The next pages explain exactly what a facet, a ridge, and one pivot mean.\n\nReference, outside the timed script:\nFour parties fix two binary outputs each, so \\(n_V=2^8=256\\). Each party is absent from a correlator or contributes one of two settings, giving \\(D_{\\mathrm{full}}=3^4-1=80\\). The one-/two-body projection has 256 vertices. The even-order two-/four-body projection identifies global output reversals and has 128 distinct projected vertices. Neither projection imposes PI coefficients. The v0 libraries have 2,827,535 and 7,573,123 classes, with 99 and 80 unresolved root owners; these open tasks demonstrate remaining boundary difficulty, without establishing a speed comparison with full DD. DD remains part of the method. Recursion does not remove enumeration complexity or guarantee a speedup. Double-precision cddlib candidate checks do not alone prove complete enumeration; page nine states the required exact closure hypotheses.",
        "zh": "口头讲稿（约90秒）：\n现在知道搜索 facets 就足够。Double Description，简称 DD，把局域顶点转换为支撑 facet 不等式。但很短的顶点列表，也可能有非常庞大的边界。完整 \\((4,2,2)\\) 场景只有256个确定性行为，维数却已达到80。\n\n我们从一个 facet 出发，沿 ridges pivot 到邻面。可处理的面内边界仍用 DD；未完成的调用则进入该 facet，把它作为低一维子多面体，逐步探索子边界。已验证子 facets 提供母 ridges 与 pivots，未解任务继续保留。\n\n应用是32维的一、二体投影，以及40维的二、四体投影，两库都仍不完整。下面先明确 facet、ridge 和一步 pivot 的定义。\n\n参考说明，不计入口头时长：\n四方各固定两个二值输出，因此 \\(n_V=2^8=256\\)。每方不出现在关联项中，或贡献两个设置之一，得到 \\(D_{\\mathrm{full}}=3^4-1=80\\)。一、二体投影有256顶点；二、四体只保留偶数阶项，将全体输出同时反号的策略识别为同一点，有128个不同投影顶点。二者均未施加 PI 系数限制。v0 库分别有2,827,535与7,573,123个类别，99与80个未解 root owners；开放任务说明边界困难仍存在，不能据此宣称与整体 DD 的定量速度优势。DD 仍属于方法的一部分；递归不消除枚举复杂度，也不保证一定加速。双精度 cddlib 的候选核验不能单独证明无遗漏，第九页给出严格闭合前提。"
      },
      "sources": [
        {
          "label": {
            "en": "DD: cddlib reference manual",
            "zh": "DD：cddlib 参考手册"
          },
          "url": "https://people.inf.ethz.ch/fukudak/cdd_home/cddlibman2021.pdf"
        },
        {
          "label": {
            "en": "Four-party data: supplied pivot v0",
            "zh": "四体数据：作者提供的 pivot v0"
          }
        }
      ],
      "formula": "\\[(4,2,2):\\quad n_V=2^{4\\times2}=256,\\qquad D_{\\mathrm{full}}=3^4-1=80.\\]",
      "backup": false,
      "story": {
        "question": {
          "en": "How can we explore facets when direct boundary conversion remains unfinished?",
          "zh": "直接边界转换未完成时，怎样继续探索 facets？"
        },
        "takeaway": {
          "en": "Keep DD for manageable faces; recursively expand unfinished boundaries.",
          "zh": "可处理的面继续用 DD；未完成边界则递归展开。"
        },
        "transition": {
          "en": "To explain this method, first define the facets and ridges that a pivot connects.",
          "zh": "解释这个方法，先明确 pivot 连接的 facets 与 ridges。"
        }
      },
      "phase": "background",
      "table": {
        "headers": {
          "en": [
            "Step",
            "Boundary task",
            "Computational role"
          ],
          "zh": [
            "步骤",
            "边界任务",
            "计算作用"
          ]
        },
        "rows": {
          "en": [
            [
              "Global DD",
              "All local vertices → all facets",
              "A full vertex-to-inequality conversion."
            ],
            [
              "Facet DD",
              "One facet’s tight vertices → its ridges",
              "Supplies the directions for neighboring pivots."
            ],
            [
              "Recursion",
              "Unfinished facet → child boundary",
              "Retain discoveries and return verified ridges."
            ]
          ],
          "zh": [
            [
              "整体 DD",
              "全部局域顶点 → 全部 facets",
              "直接完成顶点到不等式的转换。"
            ],
            [
              "面内 DD",
              "一个 facet 的紧顶点 → 其 ridges",
              "提供邻接 pivot 所需的方向。"
            ],
            [
              "递归展开",
              "未完成 facet → 低维子问题",
              "逐步探索边界，保留已验证发现，再返回母层。"
            ]
          ]
        }
      },
      "bodyIntro": {
        "en": "Double Description (DD) converts vertices to facets. Large boundaries can exceed available computing resources.",
        "zh": "Double Description（DD）把顶点转为 facets。复杂边界可能超出可用计算资源。"
      }
    },
    {
      "id": "pivot-question",
      "title": {
        "en": "Facet, ridge, and the graph of Bell tests",
        "zh": "Facet、ridge 与 Bell 检验的邻接图"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 50,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>Facet:</strong> \\(F=\\{p\\in\\mathcal L:I_F(p)=\\beta_C\\}\\), with dimension \\(D-1\\).",
          "<strong>Ridge:</strong> a face of dimension \\(D-2\\); in 3D it is an edge.",
          "<strong>Adjacency:</strong> two facets share a ridge. Graph nodes are facets; \\(V\\) contains deterministic behaviors."
        ],
        "zh": [
          "<strong>Facet：</strong>\\(F=\\{p\\in\\mathcal L:I_F(p)=\\beta_C\\}\\)，维数为 \\(D-1\\)。",
          "<strong>Ridge：</strong>维数为 \\(D-2\\) 的面；三维中就是一条边。",
          "<strong>邻接：</strong>两个 facets 共享 ridge。图节点是 facets；\\(V\\) 中是确定性行为。"
        ]
      },
      "notes": {
        "en": "Start with deterministic local behaviors \\(V\\), whose convex hull is the local polytope \\(\\mathcal L\\). The dimension \\(D\\) is its affine dimension in the chosen coordinates. We use the lower-bound convention: \\(I_F(p)\\geq\\beta_C\\) for all local \\(p\\).\n\nThe tight set \\(F=\\{p\\in\\mathcal L:I_F(p)=\\beta_C\\}\\) is a facet only if its dimension is \\(D-1\\). A valid inequality with a smaller tight set is not a facet. A ridge has dimension \\(D-2\\). In three dimensions, a facet is a polygonal face and a ridge is an edge. Every ridge of a convex polytope belongs to exactly two facets, including for a degenerate polytope.\n\nThe facet graph therefore has a node for each facet and an edge for each ridge adjacency. These graph nodes are different from the deterministic vertices in \\(V\\). Later we quotient graph nodes by relabeling symmetry. The question is now concrete: given \\(F\\) and one ridge of \\(F\\), how do we obtain the other facet?",
        "zh": "从所有确定性局域行为组成的顶点集 \\(V\\) 出发，其凸包是局域多面体 \\(\\mathcal L\\)。\\(D\\) 是在所选坐标中的仿射维数。采用下界约定：所有局域行为 \\(p\\) 都满足 \\(I_F(p)\\geq\\beta_C\\)。\n\n等号集合 \\(F=\\{p\\in\\mathcal L:I_F(p)=\\beta_C\\}\\) 只有在维数为 \\(D-1\\) 时才是 facet；紧集维数更低的有效不等式并不构成 facet。Ridge 的维数是 \\(D-2\\)。三维中，facet 是一个多边形面，ridge 是一条边。凸多面体的每条 ridge 恰好属于两个 facets，这对退化多面体也成立。\n\n因此 facet graph 的节点是 facets，边是 ridge 邻接；这与 \\(V\\) 中的确定性顶点是两种不同对象。之后再按重标记对称性合并图节点。现在的问题很具体：给定 \\(F\\) 及它的一条 ridge，怎样找到另一面？"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The CHSH projection makes this geometry visible.",
          "zh": "CHSH 投影可以把这个几何关系画出来。"
        }
      },
      "formula": "\\[\\begin{aligned}\\mathcal L&=\\operatorname{conv}(V),\\qquad D=\\dim\\mathcal L,\\\\\\beta_C&=\\min_{v\\in V}I_F(v),\\qquad I_F(p)\\geq\\beta_C\\quad(p\\in\\mathcal L).\\end{aligned}\\]"
    },
    {
      "id": "pivot-duality",
      "title": {
        "en": "One CHSH projection, two coordinate spaces",
        "zh": "同一个 CHSH 投影，两种坐标空间"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 80,
      "layout": "chart",
      "bullets": {
        "en": [
          "\\(A_x,B_y\\): Alice’s and Bob’s \\(\\pm1\\) observables.",
          "\\(\\vec a\\): coefficients of \\(\\vec a\\cdot\\vec s\\geq\\beta_C<0\\); \\(\\vec\\lambda\\) is their normalized vector.",
          "<strong>Facet → polar vertex; ridge → polar edge.</strong>"
        ],
        "zh": [
          "\\(A_x,B_y\\)：Alice、Bob 的 \\(\\pm1\\) 观测量。",
          "\\(\\vec a\\)：不等式 \\(\\vec a\\cdot\\vec s\\geq\\beta_C<0\\) 的系数；\\(\\vec\\lambda\\) 是归一化系数向量。",
          "<strong>Facet → 极体顶点；ridge → 极体边。</strong>"
        ]
      },
      "notes": {
        "en": "Both plots describe the same exchange-symmetric two-body projection of the \\((2,2,2)\\) CHSH scenario, rather than two different physical scenarios. Alice has observables \\(A_0,A_1\\); Bob has \\(B_0,B_1\\), all with outcomes \\(\\pm1\\). The full scenario has dimension eight, but the figure keeps only three averaged correlators.\n\nDefine \\(S_{00}=A_0B_0\\), \\(S_{11}=A_1B_1\\), and \\(S_{01}=(A_0B_1+A_1B_0)/2\\). The left axes are their expectation values, not coefficients. The six projected deterministic vertices are \\((1,1,\\pm1)\\), \\((-1,-1,\\pm1)\\), \\((1,-1,0)\\), and \\((-1,1,0)\\). Their convex hull has eight triangular facets. Four are trivial coordinate bounds, and four are CHSH bounds \\(\\sigma\\langle S_{00}\\rangle-\\sigma\\langle S_{11}\\rangle+2\\tau\\langle S_{01}\\rangle\\geq-2\\), where \\(\\sigma,\\tau=\\pm1\\). The factor two compensates for the average in \\(S_{01}\\).\n\nThe right axes \\(\\lambda_{00},\\lambda_{11},\\lambda_{01}\\) are normalized Bell coefficients. We use the lower-bound-minus-one convention consistent with the minimizing convention of v0: if \\(I=\\vec a\\cdot\\vec s\\geq\\beta_C<0\\), set \\(\\vec\\lambda=\\vec a/(-\\beta_C)\\), so \\(\\vec\\lambda\\cdot\\vec s\\geq-1\\). These are neither correlators nor hidden variables. In this centrally symmetric example, \\(\\mathcal L=-\\mathcal L\\), so this coefficient set equals the usual polar \\(\\mathcal L^\\circ=\\{\\vec\\mu:\\vec\\mu\\cdot\\vec s\\leq1\\ \\forall\\vec s\\in\\mathcal L\\}\\). Reversing coefficient signs changes between the conventions and changes the facet labels, while leaving the polar shape unchanged. For the CHSH facet above, the plotted coefficient vector is \\((\\sigma/2,-\\sigma/2,\\tau)\\).\n\nA triangular facet on the left becomes a polar vertex with three incident edges on the right. Each primal ridge becomes one polar edge connecting the two facets that contain it. The curved surfaces illustrate the projected quantum set \\(\\mathcal Q\\) and its polar, not additional polytopes. Since \\(\\mathcal L\\subseteq\\mathcal Q\\), their polar inclusion is reversed. Pivoting follows the straight-faced classical geometry.",
        "zh": "两图描述同一个 \\((2,2,2)\\) CHSH 场景的交换对称二体投影，不是两个不同的物理场景。Alice 有 \\(A_0,A_1\\)，Bob 有 \\(B_0,B_1\\)，输出均为 \\(\\pm1\\)。完整场景的维数为8，这张图只保留三个平均关联量。\n\n定义 \\(S_{00}=A_0B_0\\)、\\(S_{11}=A_1B_1\\)，以及 \\(S_{01}=(A_0B_1+A_1B_0)/2\\)。左图坐标是它们的期望值，不是系数。投影后的六个确定性顶点为 \\((1,1,\\pm1)\\)、\\((-1,-1,\\pm1)\\)、\\((1,-1,0)\\)、\\((-1,1,0)\\)，其凸包有八个三角形 facets。四个是平凡坐标界，另外四个是 CHSH 界：\\(\\sigma\\langle S_{00}\\rangle-\\sigma\\langle S_{11}\\rangle+2\\tau\\langle S_{01}\\rangle\\geq-2\\)，其中 \\(\\sigma,\\tau=\\pm1\\)。\\(S_{01}\\) 是平均值，所以 CHSH 表达式里必须有系数2。\n\n右图的 \\(\\lambda_{00},\\lambda_{11},\\lambda_{01}\\) 是归一化 Bell 系数。沿用 v0 的最小值约定，把下界归一化为负一：若 \\(I=\\vec a\\cdot\\vec s\\geq\\beta_C<0\\)，令 \\(\\vec\\lambda=\\vec a/(-\\beta_C)\\)，便有 \\(\\vec\\lambda\\cdot\\vec s\\geq-1\\)。这里的 \\(\\lambda\\) 不是关联量，也不是隐藏变量。这个例子满足中心对称性 \\(\\mathcal L=-\\mathcal L\\)，所以此系数集合与标准极体 \\(\\mathcal L^\\circ=\\{\\vec\\mu:\\vec\\mu\\cdot\\vec s\\leq1\\ \\forall\\vec s\\in\\mathcal L\\}\\) 是同一个几何集合。把系数整体反号即可切换两个约定；facet 标签随之改变，极体形状不变。上面的 CHSH facet 对应系数向量 \\((\\sigma/2,-\\sigma/2,\\tau)\\)。\n\n左图一个三角形 facet，对应右图一个有三条相接边的极体顶点。左图一条 ridge，对应右图连接两个 facets 的一条边。曲面展示投影量子集合 \\(\\mathcal Q\\) 及其极体，不是额外的多面体。由于 \\(\\mathcal L\\subseteq\\mathcal Q\\)，极体的包含关系反向。Pivot 沿直边的经典几何进行。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The next slide computes this move exactly.",
          "zh": "下一页给出这一步的精确计算。"
        }
      },
      "asset": "v0-chsh-duality.png",
      "assetAlt": {
        "en": "Facet adjacency in the primal and polar pictures",
        "zh": "原始空间与极空间中的 facet 邻接"
      },
      "figureLabels": {
        "en": [
          "Primal: correlator coordinates",
          "Polar: Bell-coefficient coordinates"
        ],
        "zh": [
          "原空间：关联量坐标",
          "极空间：Bell 系数坐标"
        ]
      },
      "figureCaption": {
        "en": "Straight faces: the local polytope / its polar. Curved surfaces: the quantum set / its polar.",
        "zh": "直边多面体：局域集合／其极体。曲面：量子集合／其极体。"
      },
      "formula": "\\[\\begin{aligned}S_{00}&=A_0B_0,\\quad S_{11}=A_1B_1,\\\\S_{01}&=\\tfrac12(A_0B_1+A_1B_0),\\\\\\vec s&=(\\langle S_{00}\\rangle,\\langle S_{11}\\rangle,\\langle S_{01}\\rangle),\\\\\\vec\\lambda\\cdot\\vec s&\\geq-1,\\quad\\vec\\lambda=\\frac{\\vec a}{-\\beta_C}.\\end{aligned}\\]",
      "bodyIntro": {
        "en": "A 3D exchange-symmetric projection of \\((2,2,2)\\): two parties, two settings, binary outcomes.",
        "zh": "\\((2,2,2)\\) 的三维交换对称投影：两方、两设置、二值输出。"
      }
    },
    {
      "id": "pivot-step",
      "title": {
        "en": "One pivot keeps a ridge and reaches the next facet",
        "zh": "一步 pivot：固定 ridge，找到邻接 facet"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 95,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>\\(J\\):</strong> an affine ridge support: \\(J\\geq0\\) on \\(F\\), with zero set \\(R\\) on \\(F\\).",
          "<strong>The ratio:</strong> current slack divided by its loss per unit \\(t\\), for each outside vertex with \\(J(v)<0\\).",
          "<strong>\\(t_*\\):</strong> the largest valid step. The first outside vertices become tight; include all ties and keep the ridge fixed."
        ],
        "zh": [
          "<strong>\\(J\\)：</strong>ridge 的仿射支撑函数：在 \\(F\\) 上 \\(J\\geq0\\)，零点集合恰为 \\(R\\)。",
          "<strong>比值：</strong>对每个满足 \\(J(v)<0\\) 的面外顶点，计算当前松弛量／每单位 \\(t\\) 的损失。",
          "<strong>\\(t_*\\)：</strong>保持有效性的最大步长。首批面外顶点变紧，保留全部并列者，ridge 始终不动。"
        ]
      },
      "notes": {
        "en": "The current facet is \\(F=\\{p\\in\\mathcal L:I_F(p)=\\beta_C\\}\\), and we select one of its ridges \\(R\\). Here \\(J\\) is an affine supporting function of a facet of the child polytope \\(F\\): it is nonnegative on \\(F\\), and its zero set within \\(F\\) is exactly \\(R\\). It is not the quantum objective.\n\nExtend \\(J\\) to the ambient affine space so that at least one outside vertex has \\(J(v)<0\\). This is not a claim that \\(J\\geq0\\) on the whole local polytope. Such an extension can be obtained by subtracting a sufficiently large multiple of \\(I_F-\\beta_C\\), which vanishes on \\(F\\). For \\(I_t=I_F+tJ\\), points on \\(R\\) remain tight, and points on \\(F\\setminus R\\) move away from equality.\n\nFor an outside vertex, \\(I_t(v)-\\beta_C=[I_F(v)-\\beta_C]+tJ(v)\\). If \\(J(v)<0\\), its local constraint remains valid only up to \\(t\\leq[I_F(v)-\\beta_C]/[-J(v)]\\). The numerator is its initial slack; the denominator is the slack loss per unit coefficient step. The minimum of these upper limits is \\(t_*\\), the largest step preserving all local constraints. For example, limits \\(6/3=2\\) and \\(5/1=5\\) give \\(t_*=2\\).\n\nAt that step, include every outside vertex attaining the minimum, including ties. Together with the ridge they span a face of dimension \\(D-1\\), which is the unique other facet containing \\(R\\). Verify support and affine rank exactly. The step parameter is not a probability, physical time, or a specified Euclidean angle. Changing the extension of \\(J\\) can reparameterize the same geometric move. After pivoting, recenter the uniform behavior before comparing quantum-violation ratios. Pivot alone does not guarantee a better quantum ratio.",
        "zh": "当前 facet 是 \\(F=\\{p\\in\\mathcal L:I_F(p)=\\beta_C\\}\\)，选择它的一条 ridge \\(R\\)。这里 \\(J\\) 是子多面体 \\(F\\) 的一个 facet 的仿射支撑函数：在 \\(F\\) 上非负，在 \\(F\\) 内的零点集合恰好是 \\(R\\)。它不是量子优化目标。\n\n把 \\(J\\) 延拓到母空间，使至少一个面外顶点满足 \\(J(v)<0\\)。并不要求 \\(J\\) 在整个局域多面体上非负。可减去足够大的 \\(I_F-\\beta_C\\) 的倍数来实现这一点，因为该项在 \\(F\\) 上为零。令 \\(I_t=I_F+tJ\\)，ridge 上的点始终满足等号，\\(F\\setminus R\\) 上的点则离开等号。\n\n对于面外顶点，\\(I_t(v)-\\beta_C=[I_F(v)-\\beta_C]+tJ(v)\\)。当 \\(J(v)<0\\) 时，局域约束仅在 \\(t\\leq[I_F(v)-\\beta_C]/[-J(v)]\\) 内有效。分子是初始松弛量，分母是每单位系数步长的松弛损失。取所有上限的最小值，得到保持全部局域约束有效的最大步长 \\(t_*\\)。例如两个顶点给出的上限分别为 \\(6/3=2\\)、\\(5/1=5\\)，则 \\(t_*=2\\)。\n\n在该步长下，所有达到最小比值的面外顶点同时进入紧集，不能只取一个并列者。它们与 ridge 一起张成维数为 \\(D-1\\) 的新面，即包含 \\(R\\) 的唯一另一 facet；还需精确检查支撑与仿射秩。\\(t\\) 是系数步长，不是概率、物理时间或规定的欧氏角度。不同的 \\(J\\) 延拓可能重新参数化同一几何移动。Pivot 后比较违反比值前，需重新把均匀行为得分归零；pivot 本身不保证量子违反提高。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The real bottleneck is obtaining all ridges of a large facet.",
          "zh": "真正的瓶颈是找全大 facet 的所有 ridges。"
        }
      },
      "formula": "\\[\\begin{aligned}I_t&=I_F+tJ,\\qquad t\\geq0,\\\\t_*&=\\min_{\\substack{v\\in V\\setminus F\\\\J(v)<0}}\\frac{I_F(v)-\\beta_C}{-J(v)},\\\\I_{\\mathrm{next}}&=I_F+t_*J\\geq\\beta_C.\\end{aligned}\\]"
    },
    {
      "id": "recursive-child",
      "title": {
        "en": "Finding a ridge is a smaller facet problem",
        "zh": "寻找 ridge，就是低一维的 facet 问题"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 90,
      "layout": "split",
      "bullets": {
        "en": [
          "<strong>Child facets</strong> have dimension \\(D-2\\): they are the parent ridges and supply \\(J\\).",
          "<strong>3D example:</strong> a polygonal facet becomes a 2D child; its edges are the ridges.",
          "<strong>Recurse:</strong> solve the child boundary, then return to pivot in the parent."
        ],
        "zh": [
          "<strong>子 facets</strong> 的维数为 \\(D-2\\)：它们是母层 ridges，并提供 \\(J\\)。",
          "<strong>三维例子：</strong>多边形 facet 变成二维子问题；其边就是 ridges。",
          "<strong>递归：</strong>求解子边界，再返回母层做 pivot。"
        ]
      },
      "notes": {
        "en": "Page six assumes that a ridge and its supporting function \\(J\\) are known. This page explains where they come from. The tight deterministic vertices \\(V_F\\) define the child polytope \\(P_F=F\\), viewed in its own affine space of dimension \\(D-1\\). Its facets have dimension \\(D-2\\), so they are precisely the parent ridges contained in \\(F\\).\n\nIn the CHSH drawing, a triangular facet is a two-dimensional child and its three edges are its child facets. In the 40-dimensional four-party projection, a facet becomes a 39-dimensional child and its facets have dimension 38. Enumerating those child facets supplies both the ridge vertices and the function \\(J\\) needed for the parent pivot.\n\nFor a small child, direct Double Description can convert vertices to a complete facet list. If that boundary problem is too large, apply the same facet-neighbor expansion to the child; if needed, descend again to its own facets. Each descent lowers the affine dimension by one. A certified child facet gives one certified parent ridge even if other branches remain unfinished. The recursion does not by itself guarantee feasible runtime or global completion. Once all branches of a facet are closed, its full ridge list is available.",
        "zh": "第六页假定已经知道 ridge 和支撑函数 \\(J\\)，这一页解释它们从哪里来。紧确定性顶点 \\(V_F\\) 定义子多面体 \\(P_F=F\\)，把它放在自身维数为 \\(D-1\\) 的仿射空间中。其 facets 的维数是 \\(D-2\\)，恰好是包含在 \\(F\\) 内的母层 ridges。\n\nCHSH 图里，一个三角形 facet 变成二维子问题，三条边就是子 facets。在40维四体投影里，一个 facet 变成39维子问题，子 facets 的维数为38。枚举这些子 facets，就同时得到母层 ridge 顶点及第六页需要的 \\(J\\)。\n\n较小子问题可用 Double Description 直接从顶点得到完整 facet 列表。若边界问题太大，则对子多面体使用同样的 facet 邻接展开；必要时再进入其 facets，继续下降。每下降一层，仿射维数减少一。即使其他分支未完成，一个已认证子 facet 仍提供一条已认证母 ridge。递归本身不保证运行时间可行或全局完成；只有所有分支闭合，才得到当前 facet 的完整 ridge 列表。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "Symmetry and persistent tasks keep this recursion manageable.",
          "zh": "接下来用对称性和可恢复任务组织递归。"
        }
      },
      "formula": "\\[\\begin{aligned}V_F&=\\{v\\in V:I_F(v)=\\beta_C\\},\\\\P_F&=\\operatorname{conv}(V_F),\\\\\\dim P_F&=D-1.\\end{aligned}\\]",
      "asset": "v0-recursion-tree.png",
      "assetAlt": {
        "en": "A difficult facet becomes a child polytope",
        "zh": "把困难 facet 变成子多面体"
      },
      "figureCaption": {
        "en": "\\(\\ell\\): recursion depth; \\(n_{V_F}\\): number of tight vertices of the current face.",
        "zh": "\\(\\ell\\)：递归深度；\\(n_{V_F}\\)：当前面的紧顶点数。"
      }
    },
    {
      "id": "recursive-workflow",
      "title": {
        "en": "Recursive expansion records what is still open",
        "zh": "递归展开明确记录哪些边界仍未解决"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 65,
      "layout": "wide",
      "bullets": {
        "en": [
          "<strong>DD = Double Description:</strong> convert a vertex list to a facet list.",
          "<strong>Task states:</strong> U = pending direct solve; N = pending recursion; Z = computationally closed; A = unresolved at the depth limit.",
          "<strong>Keep discoveries:</strong> verified neighbors survive interruptions; an open task prevents a closure claim."
        ],
        "zh": [
          "<strong>DD = Double Description：</strong>把顶点列表转换成 facet 列表。",
          "<strong>任务状态：</strong>U＝待直接求解；N＝待递归；Z＝计算闭合；A＝达到深度限制仍未解。",
          "<strong>保留发现：</strong>中断后保留已验证邻居；开放任务阻止完整闭合声明。"
        ]
      },
      "notes": {
        "en": "Double Description, abbreviated DD, is a direct conversion between vertex and inequality descriptions. U denotes a task pending direct DD; N denotes one pending recursive expansion; Z is computational ridge closure; A is unresolved at the recursion-depth limit \\(\\ell\\). These labels describe computational completion, not different physical resources. The numerical implementation uses double-precision cddlib. Certified completeness additionally requires exact or independently validated boundary enumeration. Checking each returned candidate alone does not prove that DD omitted no facets.\n\nGlobal relabeling symmetry groups equivalent facets, and canonicalization stores one representative per orbit. At the child level use the stabilizer of the parent facet, namely relabelings that leave that facet invariant. A completed child boundary is lifted back to supply parent ridges and pivots. A partial task can publish independently verified discoveries while retaining an unresolved frontier. Persistent task records allow the work to resume after interruption. To claim complete enumeration, every required boundary task must be closed.",
        "zh": "Double Description，简称 DD，是顶点描述与不等式描述之间的直接转换。U 表示待直接 DD；N 表示待递归展开；Z 表示计算意义上的 ridge 闭合；A 表示在递归深度限制 \\(\\ell\\) 下仍未解决。这些是计算完成状态，不是物理资源分类。数值实现采用双精度 cddlib；精确完整性还要求边界枚举精确或经过独立验证。逐个核验返回候选，不能单独证明 DD 没有漏掉 facets。\n\n全局重标记对称性把等价 facets 分组，规范化为每个轨道保存一个代表。子层使用母 facet 的稳定子，即保持该 facet 不变的重标记。完整子边界返回母层，提供 ridges 与 pivots。部分完成的任务可以返回已独立验证的发现，同时保留开放前沿。任务持久化支持中断后继续。宣称完整枚举时，所有必要边界任务都必须闭合。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "This makes the stopping criterion precise.",
          "zh": "这样才能准确说明何时可以停止。"
        }
      },
      "asset": "v0-recursive-workflow.png",
      "assetAlt": {
        "en": "The expansion preserves solved and unfinished tasks",
        "zh": "展开过程保留已解与未完成的任务"
      }
    },
    {
      "id": "closure",
      "title": {
        "en": "Complete enumeration requires a closed boundary",
        "zh": "完整枚举需要边界闭合"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 60,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>Assumption:</strong> every stored facet has a complete, exactly checked ridge list.",
          "<strong>Closure:</strong> every ridge pivot reaches a facet already represented in the library.",
          "<strong>Conclusion:</strong> connectivity of the full facet graph implies that the library contains every class."
        ],
        "zh": [
          "<strong>前提：</strong>每个已存 facet 都有完整且经过精确核验的 ridge 列表。",
          "<strong>闭合：</strong>每条 ridge 的 pivot 都到达库中已有代表的 facet。",
          "<strong>结论：</strong>完整 facet graph 的连通性保证库包含全部类别。"
        ]
      },
      "notes": {
        "en": "This is a conditional geometric completeness statement. Start from a nonempty set of exactly validated facets. If every stored facet has all of its ridges, and every exact pivot across each ridge returns a represented facet class, no graph edge leaves the set. The full facet graph of a convex polytope is connected, so the set must be the whole graph, up to the stated relabeling symmetry. Support, dimension, and complete child boundaries are essential hypotheses. Stable counts, coverage of stored classes, and numerical quantum values are not substitutes for these hypotheses. The four-party libraries later in the talk retain open tasks and do not satisfy this global certificate.",
        "zh": "这是一个带前提的几何完整性结论。从一个非空、精确验证的 facet 集合开始，若库内每个 facet 的 ridges 都找全，且每条 ridge 的精确 pivot 都返回已有代表的类别，就没有图边离开已存集合。凸多面体的完整 facet graph 连通，所以该集合必为全图，再按指定重标记对称性取商。支撑、维数以及完整子边界是必要前提。类别数稳定、覆盖全部已存类别、数值量子得分都不能替代这些前提。后面的四体部分库仍有开放任务，尚不满足这个全局证书。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The three-party benchmark has a known answer.",
          "zh": "三体基准场景有已知完整答案。"
        }
      }
    },
    {
      "id": "benchmark-322",
      "title": {
        "en": "The expansion recovers all 46 three-party classes",
        "zh": "展开恢复全部46个三体类别"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 80,
      "layout": "chart",
      "bullets": {
        "en": [
          "64 deterministic vertices in 26 dimensions.",
          "46 inequivalent classes represent 53,856 facets.",
          "40 seed classes with at most 34 tight vertices cover all 46 with neighbors."
        ],
        "zh": [
          "26维空间中的64个确定性顶点。",
          "46个不等价类别代表53,856个 facets。",
          "紧顶点数不超过34的40个 seed 类别，加邻居后覆盖全部46类。"
        ]
      },
      "notes": {
        "en": "For the three-party, two-setting, two-outcome scenario, all nonempty correlators give dimension 26. The method reproduces the complete Sliwa classification and its adjacency. The coverage figure expands a collection of seeds ordered by tight-vertex count. It is not a chronological trace from one seed. The solid curve reaches every class before the larger facets are used as seeds.",
        "zh": "三方、两设置、两输出场景保留全部非空关联项，维数为26。方法恢复完整的 Śliwa 分类及邻接关系。覆盖图依次展开按紧顶点数排序的一组 seeds，并不是从单个 seed 出发的时间轨迹。实线在使用较大 facets 作 seeds 之前就达到全部类别。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The library now contains connections as well as inequalities.",
          "zh": "库现在既包含不等式，也包含它们之间的连接。"
        }
      },
      "asset": "v0-322-coverage.png",
      "assetAlt": {
        "en": "The expansion recovers all 46 three-party classes",
        "zh": "展开恢复全部46个三体类别"
      }
    },
    {
      "id": "benchmark-adjacency",
      "title": {
        "en": "The facet graph records which tests share a ridge",
        "zh": "Facet graph 记录哪些检验共享 ridge"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 60,
      "layout": "chart",
      "bullets": {
        "en": [
          "Each graph node denotes one relabeling class.",
          "An off-diagonal entry denotes adjacency between two classes.",
          "A diagonal entry can connect two orientations of the same class."
        ],
        "zh": [
          "每个图节点表示一个重标记类别。",
          "非对角元表示两个类别之间存在邻接。",
          "对角元可以表示同一类别的两个不同取向相邻。"
        ]
      },
      "notes": {
        "en": "The matrix is the complete symmetry-quotient adjacency for the three-party benchmark. It records existence of a ridge adjacency, not how many ridges realize it. A diagonal entry is not a facet being adjacent to itself. It means two distinct facets from the same relabeling orbit share a ridge. This distinction will matter again in the later four-party resource example.",
        "zh": "矩阵是三体基准的完整对称商图邻接。它记录 ridge 邻接是否存在，而不是实现邻接的 ridge 数量。对角元并非同一个 facet 与自身相邻，而是同一重标记轨道的两个不同 facets 共享 ridge。后面的四体资源例子也需要保留这个区分。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "We can attach a quantum-violation height to every node.",
          "zh": "接下来给每个节点标上量子违反高度。"
        }
      },
      "asset": "v0-322-adjacency.png",
      "assetAlt": {
        "en": "The facet graph records which tests share a ridge",
        "zh": "Facet graph 记录哪些检验共享 ridge"
      }
    },
    {
      "id": "ratio-height",
      "title": {
        "en": "Quantum violation supplies a height on the graph",
        "zh": "量子违反给图上的节点提供高度"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 70,
      "layout": "statement",
      "bullets": {
        "en": [
          "Restore zero score for the uniform behavior before comparing facets.",
          "Optimize each facet with its own state and measurements.",
          "See-saw values give attained ratio lower bounds."
        ],
        "zh": [
          "比较不同 facets 前，把均匀行为得分重新归零。",
          "每个 facet 分别优化自己的状态和测量。",
          "See-saw 得分给出已实现比值的下界。"
        ]
      },
      "notes": {
        "en": "Use the lower-bound convention \\(I_F(P_{\\mathrm{uni}})=0\\), \\(\\beta_{C,F}<0\\). Let \\(\\widehat\\beta_{Q,F}\\) be the score of a verified attained quantum strategy, and \\(\\beta_{Q,F}\\) the true quantum minimum. Then \\(\\beta_{Q,F}\\leq\\widehat\\beta_{Q,F}\\), so \\(\\widehat\\Delta_F=\\widehat\\beta_{Q,F}/\\beta_{C,F}\\leq\\Delta_F\\).\n\nFor an attained violation \\(\\widehat\\beta_{Q,F}<\\beta_{C,F}<0\\), and \\(0\\leq v\\leq1\\), uniform-behavior noise \\(P_v=vP+(1-v)P_{\\mathrm{uni}}\\) gives \\(I_F(P_v)=v\\widehat\\beta_{Q,F}\\). Strict violation occurs exactly when \\(v>1/\\widehat\\Delta_F\\). A larger attained ratio therefore demonstrates a lower visibility threshold for that particular optimized test. The optimum threshold obeys \\(v_{\\mathrm{crit}}^{\\mathrm{opt}}\\leq1/\\widehat\\Delta_F\\). Comparing attained heights does not certify the ordering of true quantum optima.\n\nUniform behavior is uniform output probability for every setting. It coincides with maximally mixed state noise only for measurements that map the maximally mixed state to that uniform behavior, as for traceless binary qubit observables. Each facet uses its own independently optimized state and measurements; no shared physical implementation is imposed.",
        "zh": "采用下界约定 \\(I_F(P_{\\mathrm{uni}})=0\\)、\\(\\beta_{C,F}<0\\)。令 \\(\\widehat\\beta_{Q,F}\\) 是已验证可实现量子策略的得分，\\(\\beta_{Q,F}\\) 是真正量子最小值。则 \\(\\beta_{Q,F}\\leq\\widehat\\beta_{Q,F}\\)，因此 \\(\\widehat\\Delta_F=\\widehat\\beta_{Q,F}/\\beta_{C,F}\\leq\\Delta_F\\)。\n\n对于已实现的违反 \\(\\widehat\\beta_{Q,F}<\\beta_{C,F}<0\\)，且 \\(0\\leq v\\leq1\\)，均匀行为噪声\\(P_v=vP+(1-v)P_{\\mathrm{uni}}\\) 给出 \\(I_F(P_v)=v\\widehat\\beta_{Q,F}\\)。严格违反恰好发生于 \\(v>1/\\widehat\\Delta_F\\)。所以较大的已实现比值，展示该优化检验能在更低可见度下保持违反。最优阈值满足 \\(v_{\\mathrm{crit}}^{\\mathrm{opt}}\\leq1/\\widehat\\Delta_F\\)，而已实现高度的排序并不认证真正量子最优值的排序。\n\n均匀行为指每个设置下输出概率均匀。只有测量把最大混态映射到该均匀行为时，它才等同于密度矩阵层面的白噪声，例如无迹二值量子比特观测量。每个 facet 分别优化状态和测量，并不要求共同物理实现。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The four-party projections let us study this structure at scale.",
          "zh": "四体投影让我们能在大规模上研究这个结构。"
        }
      },
      "formula": "\\[\\widehat\\Delta_F=\\frac{\\widehat\\beta_{Q,F}}{\\beta_{C,F}}\\leq\\Delta_F,\\qquad I_F(P_{\\mathrm{uni}})=0\\]"
    },
    {
      "id": "four-projections",
      "title": {
        "en": "The four-party libraries retain different correlators",
        "zh": "两个四体库保留不同的关联项"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 70,
      "layout": "statement",
      "bullets": {
        "en": [
          "The projections define different local polytopes.",
          "All figures and counts here use the original v0 snapshot.",
          "Both four-party enumerations remain partial."
        ],
        "zh": [
          "这两个投影定义不同的局域多面体。",
          "这里的图和计数统一使用原稿 v0 快照。",
          "两个四体枚举都仍是部分库。"
        ]
      },
      "notes": {
        "en": "The one- and two-body projection contains 8 one-body and 24 two-body coordinates, giving dimension 32 with 256 distinct deterministic vertices. The two- and four-body projection contains 24 two-body and 16 four-body coordinates, giving dimension 40. A global output flip identifies pairs of assignments, leaving 128 vertices. The counts are relabeling classes, not individual physical facets. We use the v0 snapshot consistently rather than mixing it with later database status.",
        "zh": "一、二体投影保留8个一体和24个二体坐标，维数32，有256个不同确定性顶点。二、四体投影保留24个二体和16个四体坐标，维数40。全局输出翻转识别成对的确定性赋值，故有128个顶点。表中计数是重标记类别数，不是物理 facets 的总数。这里统一沿用 v0 快照，避免与后续数据库状态混用。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The coverage curves show how small facets reach a large boundary.",
          "zh": "覆盖曲线展示小 facets 如何到达大范围边界。"
        }
      },
      "table": {
        "headers": {
          "en": [
            "Projection",
            "Dimension",
            "Vertices",
            "Stored classes"
          ],
          "zh": [
            "投影",
            "维数",
            "顶点数",
            "已存类别数"
          ]
        },
        "rows": {
          "en": [
            [
              "One- and two-body",
              "32",
              "256",
              "2,827,535"
            ],
            [
              "Two- and four-body",
              "40",
              "128",
              "7,573,123"
            ]
          ],
          "zh": [
            [
              "一、二体",
              "32",
              "256",
              "2,827,535"
            ],
            [
              "二、四体",
              "40",
              "128",
              "7,573,123"
            ]
          ]
        }
      }
    },
    {
      "id": "four-coverage",
      "title": {
        "en": "Small facets reach millions of known classes",
        "zh": "小 facets 到达数百万个已知类别"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 90,
      "layout": "wide",
      "bullets": {
        "en": [
          "Coverage of the discovered library: all stored one-/two-body classes are covered at \\(T=40\\).",
          "Two- and four-body: all stored classes are covered at \\(T=58\\)."
        ],
        "zh": [
          "已发现库内的覆盖：一、二体投影在 \\(T=40\\) 时覆盖所有已存类别。",
          "二、四体：在 \\(T=58\\) 时覆盖所有已存类别。"
        ]
      },
      "notes": {
        "en": "Dashed curves count expanded seeds with at most \\(T\\) tight vertices. Solid curves also count their neighbors. In the even-correlator library, the 1,068,260 classes with 41 tight vertices reach 4,017,307 classes. At \\(T=40\\) and \\(T=58\\), respectively, all stored classes are reached. This is stored-library coverage. The unresolved frontier prevents a completeness claim.",
        "zh": "虚线计紧顶点数不超过 \\(T\\) 的已展开 seeds，实线再计邻居。偶数阶库中，1,068,260个紧顶点数为41的类别到达4,017,307类。两个投影分别在 \\(T=40\\) 和 \\(T=58\\) 覆盖全部已存类别。这是库内覆盖，未解前沿使我们不能宣称枚举完整。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The unfinished frontier also matters when analyzing the graph.",
          "zh": "分析图时也必须交代尚未完成的前沿。"
        }
      },
      "asset": "v0-four-coverage.png",
      "assetAlt": {
        "en": "Small facets reach millions of known classes",
        "zh": "小 facets 到达数百万个已知类别"
      }
    },
    {
      "id": "four-frontier",
      "title": {
        "en": "Verified neighbor patches extend the recorded graph",
        "zh": "已验证的邻居补丁扩展已记录的图"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 60,
      "layout": "statement",
      "bullets": {
        "en": [
          "The v0 snapshot has 99 and 80 unclosed root owners.",
          "Verified child results add their neighbor links to the root graph.",
          "The resulting graph remains a discovered partial boundary."
        ],
        "zh": [
          "v0 快照分别有99和80个未闭合 root owners。",
          "已验证子层结果把这些 owners 的邻接边补入 root graph。",
          "所得图仍对应已发现的部分边界。"
        ]
      },
      "notes": {
        "en": "The original landscape analysis uses the augmented root-plus-patch graph. In the one- and two-body projection the patch adds 25,727,731 directed links; in the two- and four-body projection it adds 78,085,157. The augmented graph is symmetric, but symmetry does not show that every possible edge or class has been found. The unresolved child-row counts are pending calculations, not a count of missing facets. This matters because an omitted uphill edge can create an artificial stopping point.",
        "zh": "原稿的 landscape 分析使用 root 加 patch 的增强图。一、二体补丁增加25,727,731条有向边，二、四体增加78,085,157条。增强图具有对称性，但这不证明所有可能的边或类别已经找到。未解子行数表示待完成计算，不能解释成缺失 facets 的数量。这个区别很重要：漏掉一条上升边可能制造假的停止点。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "We first ask what values surround a high-violation class.",
          "zh": "先问高违反类别周围通常有哪些得分。"
        }
      },
      "table": {
        "headers": {
          "en": [
            "v0 projection",
            "Root owners",
            "Augmented directed links"
          ],
          "zh": [
            "v0 投影",
            "未闭合 root owners",
            "增强图有向边数"
          ]
        },
        "rows": {
          "en": [
            [
              "One- and two-body",
              "99",
              "202,716,944"
            ],
            [
              "Two- and four-body",
              "80",
              "906,699,427"
            ]
          ],
          "zh": [
            [
              "一、二体",
              "99",
              "202,716,944"
            ],
            [
              "二、四体",
              "80",
              "906,699,427"
            ]
          ]
        }
      }
    },
    {
      "id": "four-neighbor",
      "title": {
        "en": "Higher recorded ratios have stronger neighborhoods",
        "zh": "较高的已记录比值通常有更强的邻域"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 80,
      "layout": "wide",
      "bullets": {
        "en": [
          "Empirical trend in the recorded v0 graph. Each distinct neighboring class contributes once to the mean.",
          "The full stored-sample rank correlations are \\(0.8689\\) and \\(0.8744\\)."
        ],
        "zh": [
          "这是已记录 v0 图中的经验趋势。邻居均值对每个不同类别只计一次。",
          "全部已存样本的秩相关为 \\(0.8689\\) 和 \\(0.8744\\)。"
        ]
      },
      "notes": {
        "en": "The horizontal axis is a class’s attained ratio. The vertical axis is the mean attained ratio of its distinct neighboring classes. Colors show class counts per bin, and the green curve is the binned mean. The positive trend is an empirical description of the recorded graph. This statistic is not edge assortativity. The larger values 0.9192 and 0.9491 refer to the closed-class and closed-neighbor subset, not this full stored sample. A mean trend does not tell us whether local ascent can become trapped.",
        "zh": "横轴是一个类别已实现的比值，纵轴是它所有不同邻居类别已实现比值的均值。颜色表示分箱中的类别数，绿线是分箱均值。正趋势是对已记录图的经验描述，不能把这种统计量称作 edge assortativity。较大的0.9192与0.9491来自仅含已闭合类别和邻居的子样本，不是全部已存样本。均值趋势还不能回答局部上升会不会卡住。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "Steepest ascent asks whether an improving path can get stuck.",
          "zh": "最陡上升直接检查改善路径是否会停住。"
        }
      },
      "asset": "v0-four-neighbor.png",
      "assetAlt": {
        "en": "Higher recorded ratios have stronger neighborhoods",
        "zh": "较高的已记录比值通常有更强的邻域"
      }
    },
    {
      "id": "ascent-rule",
      "title": {
        "en": "A pivot path follows increasing recorded violation",
        "zh": "Pivot 路径沿已记录违反值上升"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 75,
      "layout": "statement",
      "bullets": {
        "en": [
          "Use stored heights \\(\\widehat\\Delta_F\\); \\(\\mathcal N(F)\\) is the set of recorded neighboring classes.",
          "Choose the largest improving neighbor; require an increase greater than \\(10^{-9}\\).",
          "A stopping class has no improving neighbor. Its basin contains all classes whose paths end there."
        ],
        "zh": [
          "使用已存高度 \\(\\widehat\\Delta_F\\)；\\(\\mathcal N(F)\\) 是已记录的邻居类别集合。",
          "选择改善最大的邻居，要求增幅超过 \\(10^{-9}\\)。",
          "没有改善邻居的类别是停止类；所有最终到达它的类别组成其吸引域。"
        ]
      },
      "notes": {
        "en": "Remove self-loops and include classes with recorded \\(\\widehat\\Delta>1+10^{-9}\\). Here \\(\\mathcal N(F)\\) is the recorded neighboring-class set. At each step look up their already optimized heights and choose the largest strictly improving value, with tolerance \\(10^{-9}\\). If none exists, stop. A basin is the set of starting classes ending at one stopping class under this rule.\n\nStrict increase on a finite graph guarantees termination. Having only one stopping class is a separate numerical observation, not a consequence of finite termination or of the pivot construction. This is a walk in Bell-inequality space using stored scores; it does not run a new quantum optimization at each step or describe physical evolution of a state.",
        "zh": "去掉自环，纳入记录值 \\(\\widehat\\Delta>1+10^{-9}\\) 的类别。这里 \\(\\mathcal N(F)\\) 是已记录邻居类别集合。每一步查找已经分别优化好的高度，以 \\(10^{-9}\\) 为容差，选择最大且严格改善的邻居；没有则停止。吸引域是在该规则下最终到达同一停止类的所有起始类别。\n\n有限图上的严格上升保证路径终止，这是数学结论。只有一个停止类则是另一个数值观察，不能由有限终止或 pivot 构造直接推出。这里是在 Bell 不等式空间中用已存得分行走，并非每走一步重新求量子最优，也不描述量子态的物理演化。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The three recorded landscapes each have one stopping class.",
          "zh": "三个记录的 landscapes 都只有一个停止类。"
        }
      },
      "formula": "\\[T(F)\\in\\operatorname*{arg\\,max}_{G\\in\\mathcal N(F)}\\widehat\\Delta_G,\\qquad\\widehat\\Delta_{T(F)}>\\widehat\\Delta_F+10^{-9}\\]"
    },
    {
      "id": "ascent-results",
      "title": {
        "en": "Each recorded landscape has one ascent basin",
        "zh": "每个已记录 landscape 都只有一个上升吸引域"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 100,
      "layout": "statement",
      "bullets": {
        "en": [
          "Using attained values on the recorded graph, each analyzed data set has one stopping class and one basin.",
          "Four-party results use the discovered root-plus-patch graphs.",
          "Recorded ratios do not certify the ordering of exact quantum optima."
        ],
        "zh": [
          "使用已记录图上的已实现值，每个分析数据集都有一个停止类和一个吸引域。",
          "四体结果使用已发现的 root 加 patch 图。",
          "记录比值不能认证精确量子最优值的排序。"
        ]
      },
      "notes": {
        "en": "In the complete three-party graph all 44 included violating classes reach Mermin in at most two pivots. Its geometry is complete, but the height ordering remains subject to quantum-value verification. In the four-party one- and two-body partial library, 97.0 percent of included classes take exactly two pivots to lifted CHSH. In the two- and four-body partial library the mean is 3.161 and the maximum is six, attained by one class; the endpoint is Mermin–Klyshko with recorded ratio \\(2\\sqrt2\\).\n\nThese basin counts exhaustively describe the included classes in the recorded root-plus-patch graphs, with their recorded heights and stated tolerance. They are not a theorem about every four-party Bell facet or the exact quantum landscape. Undiscovered facets and improved quantum values can change the basin structure; additional edges can change paths and step counts. The one- and two-body tolerance sweep from \\(10^{-12}\\) to \\(10^{-3}\\) was stable, which is a robustness check rather than an exact quantum certificate. Every relabeling class has equal statistical weight here; the statistics do not weight by orbit size or by a physical sampling distribution.",
        "zh": "完整三体图上，纳入的44个违反类别至多两步到达 Mermin。几何完整，但高度排序仍受量子值核验限制。四体一、二体部分库中，97.0%的纳入类别恰好两步到达提升 CHSH。二、四体部分库平均3.161步，最多六步，只有一个类别需要六步；终点为记录比值 \\(2\\sqrt2\\) 的 Mermin–Klyshko。\n\n吸引域计数穷尽描述已记录 root 加 patch 图中纳入的类别、记录高度及指定容差，不是关于全部四体 Bell facets 或精确量子 landscape 的定理。未发现 facets、更准确的量子值可能改变吸引域结构；新增边可能改变路径与步数。一、二体投影在 \\(10^{-12}\\) 到 \\(10^{-3}\\) 的容差扫描中保持稳定，这是鲁棒性检查，不能代替精确量子证书。这里每个重标记类别具有相等统计权重，没有按轨道大小或物理抽样分布加权。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "This completes the original pivot story before the discussion.",
          "zh": "这先完成原来的 pivot 故事，再进入讨论。"
        }
      },
      "table": {
        "headers": {
          "en": [
            "Scenario",
            "Violating classes",
            "Mean / max pivots",
            "Attractor"
          ],
          "zh": [
            "场景",
            "违反类别数",
            "平均／最大步数",
            "吸引子"
          ]
        },
        "rows": {
          "en": [
            [
              "\\((3,2,2)\\)",
              "44",
              "1.614 / 2",
              "Mermin, \\(2\\)"
            ],
            [
              "One- and two-body",
              "2,809,203",
              "2.006 / 5",
              "Lifted CHSH, \\(\\sqrt2\\)"
            ],
            [
              "Two- and four-body",
              "7,573,121",
              "3.161 / 6",
              "Mermin–Klyshko, \\(2\\sqrt2\\)"
            ]
          ],
          "zh": [
            [
              "\\((3,2,2)\\)",
              "44",
              "1.614 / 2",
              "Mermin，\\(2\\)"
            ],
            [
              "一、二体",
              "2,809,203",
              "2.006 / 5",
              "提升 CHSH，\\(\\sqrt2\\)"
            ],
            [
              "二、四体",
              "7,573,121",
              "3.161 / 6",
              "Mermin–Klyshko，\\(2\\sqrt2\\)"
            ]
          ]
        }
      }
    },
    {
      "id": "original-conclusion",
      "title": {
        "en": "What the single ascent basin means physically",
        "zh": "单一上升吸引域的物理意义"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 55,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>Scope:</strong> each test uses its own state and measurements; the four-party library is partial.",
          "<strong>Next question:</strong> what changes when neighboring tests must share one physical strategy?"
        ],
        "zh": [
          "<strong>范围：</strong>每个检验各自选择状态和测量；四体库仍不完整。",
          "<strong>下一问：</strong>如果相邻检验必须共用一个物理策略，会发生什么？"
        ]
      },
      "notes": {
        "en": "Separate three claims. First, exact support and rank checks can certify a specific facet, its ridge, and a pivot neighbor. Full closure then certifies enumeration, under the hypotheses on page nine. Second, on each analyzed recorded graph, the greedy rule has one stopping class and one basin. This is an exhaustive numerical graph result for that snapshot, not a theorem about undiscovered facets or exact quantum optima.\n\nThird, there is a precise physical interpretation of the heights. Let \\(P\\) be an attained violating strategy for facet \\(F\\), with \\(\\widehat\\beta_{Q,F}<\\beta_{C,F}<0\\), and \\(P_{\\mathrm{uni}}\\) the uniform behavior; take \\(0\\leq v\\leq1\\). With \\(I_F(P_{\\mathrm{uni}})=0\\), \\(I_F(P_v)=v\\widehat\\beta_{Q,F}\\). Since \\(\\beta_{C,F}<0\\), strict violation is equivalent to \\(v>1/\\widehat\\Delta_F\\); equality is the local-bound threshold. An increasing recorded height therefore means lower demonstrated critical visibility, using a different independently optimized Bell test at each graph node.\n\nThis search path does not evolve a physical state toward an attractor. Nor does a single basin establish genuine four-party entanglement: lifted CHSH can reach its maximum with one entangled pair and unentangled spectators. The Mermin–Klyshko endpoint is a different resource example, but identifying that endpoint does not certify a resource property of every starting facet. Uniform-behavior noise should not automatically be identified with density-matrix white noise for arbitrary measurements.\n\nThe useful research implication is that adjacency may organize the search for robust Bell tests in these libraries. The later resource question adds a new constraint absent here: neighboring endpoints must use the same state and measurement tuple. This requires valid bounds covering every bipartition; SDP offers a practical route to obtain such certificates.",
        "zh": "区分三层陈述。第一，精确支撑与秩检查能认证一个具体 facet、其 ridge 及 pivot 邻居；满足第九页的全闭合前提后，才能认证完整枚举。第二，在每个已分析的记录图上，贪心规则只有一个停止类和吸引域。这是该快照的穷尽数值图结果，不是关于未发现 facets 或精确量子最优值的定理。\n\n第三，高度具有明确物理解释。令 \\(P\\) 为 facet \\(F\\) 的已实现违反策略，满足 \\(\\widehat\\beta_{Q,F}<\\beta_{C,F}<0\\)，\\(P_{\\mathrm{uni}}\\) 为均匀行为，且 \\(0\\leq v\\leq1\\)。由于 \\(I_F(P_{\\mathrm{uni}})=0\\)，有 \\(I_F(P_v)=v\\widehat\\beta_{Q,F}\\)。因为 \\(\\beta_{C,F}<0\\)，严格违反等价于 \\(v>1/\\widehat\\Delta_F\\)；等号是局域界阈值。因此记录高度上升，意味着展示了更低临界可见度，但每个图节点都换用一个独立优化的 Bell 检验。\n\n这条搜索路径不是把一个物理态演化到吸引子。单吸引域也不证明真正四体纠缠：提升 CHSH 可以由一个纠缠对加不纠缠的旁观方达到最大值。Mermin–Klyshko 终点是另一种资源例子，但识别终点并不认证每个起始 facet 的资源性质。任意测量下，均匀行为噪声不能自动等同于密度矩阵白噪声。\n\n研究上的意义是：邻接关系可能组织这些库中的鲁棒 Bell 检验搜索。后面的资源问题增加了这里没有的约束：两个邻接端点共用同一个状态和测量组。这要求对全部二分切分成立的有效界；SDP 提供获得这些证书的一条实用途径。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": false,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "Independent endpoint optimization leaves a shared-strategy question open.",
          "zh": "各端点独立优化之后，还有共同策略问题需要回答。"
        }
      },
      "formula": "\\[P_v=vP+(1-v)P_{\\mathrm{uni}},\\qquad v_{\\mathrm{crit}}^{\\mathrm{demo}}=\\frac1{\\widehat\\Delta_F}\\quad(\\widehat\\Delta_F>1).\\]",
      "table": {
        "headers": {
          "en": [
            "Status",
            "What is supported"
          ],
          "zh": [
            "结论层次",
            "能够支持的陈述"
          ]
        },
        "rows": {
          "en": [
            [
              "Exact geometry",
              "Verified facet/ridge/pivot relations; completeness only with full boundary closure."
            ],
            [
              "Numerical observation",
              "One greedy ascent basin on each analyzed recorded graph and its attained heights."
            ],
            [
              "Physical interpretation",
              "The selected uphill paths lead toward better demonstrated uniform-noise tolerance."
            ]
          ],
          "zh": [
            [
              "严格几何",
              "已验证的 facet／ridge／pivot 关系；完整枚举须满足全边界闭合。"
            ],
            [
              "数值观察",
              "在已分析的记录图和已实现高度上，贪心上升只有一个吸引域。"
            ],
            [
              "物理解释",
              "所选择的上升路径通向更好的已展示均匀噪声容忍度。"
            ]
          ]
        }
      }
    },
    {
      "id": "shared-resource-question",
      "title": {
        "en": "Exploratory direction: one state and one measurement set",
        "zh": "探索性方向：共用一个态和一组测量"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 35,
      "layout": "statement",
      "bullets": {
        "en": [
          "\\(\\rho\\): the four-party state. \\(\\mathsf M=\\{A_0,A_1,B_0,B_1,C_0,C_1,D_0,D_1\\}\\): all local measurements.",
          "Each party has settings \\(0,1\\) and outcomes \\(\\pm1\\). \\(O\\) denotes an operator; brackets denote its observed mean.",
          "The original graph optimizes each test separately. We now evaluate both tests with the same state and measurements."
        ],
        "zh": [
          "\\(\\rho\\)：四体量子态。\\(\\mathsf M=\\{A_0,A_1,B_0,B_1,C_0,C_1,D_0,D_1\\}\\)：全部局域测量。",
          "每方有设置 \\(0,1\\)，输出为 \\(\\pm1\\)。\\(O\\) 表示算符；尖括号表示观测平均值。",
          "原图对每个检验分别优化。现在两个检验共用同一个态、同一组测量。"
        ]
      },
      "notes": {
        "en": "A physical strategy means the state together with all local measurements. In the original landscape, each facet could choose its own strategy. Here two tests must use the same strategy. Alice’s setting zero, for example, is the same observable in both tests. Brackets mean the expectation, or measured mean, of an operator in the state. This is an additional physical constraint beyond adjacency. We first define the two tests.\n\nReference: A, B, C and D label separated parties. We use binary projective observables with eigenvalues \\(\\pm1\\); binary POVMs are covered by local projective dilation. An operator product on different parties abbreviates a tensor product. The trace sums the diagonal entries of a matrix. Shared strategy does not require identical measurements at different parties. A different interpolation weight may have its own optimized strategy, but both terms at that weight share the full strategy.",
        "zh": "物理策略就是量子态加全部局域测量。原 landscape 中，每个 facet 可以选择自己的策略；现在两个检验必须共用一个策略。例如，Alice 的设置0在两项里必须是同一个观测量。尖括号是该算符在量子态上的期望值，也就是实验测得的平均值。这是邻接关系之外增加的物理约束。下面先定义具体检验。\n\n参考：A、B、C、D 表示相互分离的四方。这里先用本征值为 \\(\\pm1\\) 的二值投影测量，二值 POVM 可由局域投影扩张覆盖。不同方的算符乘积省略张量积符号。trace 是矩阵对角元之和。“共用测量”不要求不同方使用相同测量。不同组合权重可以分别优化策略，但同一权重下两项必须共用整个策略。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "Define CHSH and the opposite-output events.",
          "zh": "先定义 CHSH 与相反输出事件。"
        }
      },
      "formula": "\\[\\mathsf S=(\\rho,\\mathsf M),\\qquad \\langle O\\rangle_\\rho=\\operatorname{tr}(\\rho O).\\]"
    },
    {
      "id": "four-pair-symbols",
      "title": {
        "en": "Exploratory direction: CHSH and the parity flags",
        "zh": "探索性方向：CHSH 与奇偶旗标"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 55,
      "layout": "statement",
      "bullets": {
        "en": [
          "\\(S_{AB},S_{CD}\\) are CHSH operators. Their mean is at most \\(2\\) classically and \\(2\\sqrt2\\) quantum mechanically.",
          "\\(P_-^{AB}\\) selects opposite AB outputs at settings \\(0,0\\): it equals \\(1\\) on opposite parity and \\(0\\) on equal parity.",
          "The minus sign means output product \\(-1\\). \\(p_{AB}=\\langle P_-^{AB}\\rangle_\\rho\\) is that event’s probability; CD is defined likewise."
        ],
        "zh": [
          "\\(S_{AB},S_{CD}\\) 是 CHSH 算符。其平均值的经典上界为 \\(2\\)，量子上界为 \\(2\\sqrt2\\)。",
          "\\(P_-^{AB}\\) 选择设置 \\(0,0\\) 下 AB 输出相反的事件：相反奇偶支撑上为 \\(1\\)，相同支撑上为 \\(0\\)。",
          "下标“−”指输出乘积为 \\(-1\\)。\\(p_{AB}=\\langle P_-^{AB}\\rangle_\\rho\\) 是这个事件的概率；CD 同理。"
        ]
      },
      "notes": {
        "en": "S AB is the ordinary CHSH operator, with three plus signs and one minus sign. S CD is the same test on the other pair. Their classical upper bound is two and quantum upper bound is two root two.\n\nThe new symbol P minus is a parity flag. At settings zero and zero, the product of two binary outputs is minus one exactly when the outputs differ. Thus one minus the product, divided by two, selects that event. It is one in the opposite-output sector and zero in the equal-output sector. Its expectation is the event probability, denoted p AB or p CD. P is an event projector, not a state. The minus does not mean a negative probability or that one particular party must output minus one.\n\nWe will use CD’s flag to control the AB test, and AB’s flag to control the CD test.\n\nReference: CHSH abbreviates Clauser–Horne–Shimony–Holt. \\(I\\) is identity, not a Bell score. Under projective binary measurements \\(A_0^2=B_0^2=I\\), so \\(P_-^{AB}\\) is a projector on the joint AB Hilbert space. The probability is \\(\\Pr(a\\ne b\\mid x=y=0)\\), where a,b are outputs and x,y are setting labels. For a common local dilation the same operator treatment covers binary POVMs.",
        "zh": "S AB 就是普通 CHSH 算符，三个正号、一个负号；S CD 是另一对上的相同检验。经典上界为2，量子上界为二倍根号二。\n\n新符号 P 减是奇偶旗标。设置0、0下，两个二值输出相反时，乘积恰好为负1。所以“1减乘积，再除以2”选择这个事件：相反输出的支撑上为1，相同输出的支撑上为0。它的期望值是事件概率，记为 p AB 或 p CD。P 是事件投影，不是量子态；下标减号不是负概率，也不是要求某一方必须输出负1。\n\n下面让 CD 的旗标控制 AB 检验，再让 AB 的旗标控制 CD 检验。\n\n参考：CHSH 是 Clauser–Horne–Shimony–Holt 的缩写。\\(I\\) 是恒等算符，不是 Bell 得分。二值投影测量满足 \\(A_0^2=B_0^2=I\\)，因此 \\(P_-^{AB}\\) 是 AB 联合希尔伯特空间上的投影。对应概率是 \\(\\Pr(a\\ne b\\mid x=y=0)\\)，a、b 是输出，x、y 是设置编号。共同局域扩张使同一算符处理也覆盖二值 POVM。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "transition": {
          "en": "Use each pair’s parity flag in the other pair’s CHSH test.",
          "zh": "用每一对的奇偶旗标控制另一对的 CHSH 检验。"
        }
      },
      "formula": "\\[\\begin{aligned}\nS_{AB}&=A_0B_0+A_0B_1+A_1B_0-A_1B_1,\\\\\nS_{CD}&=C_0D_0+C_0D_1+C_1D_0-C_1D_1,\\\\\nP_-^{AB}&=\\frac{I-A_0B_0}{2},\\qquad\nP_-^{CD}=\\frac{I-C_0D_0}{2}.\n\\end{aligned}\\]",
      "bodyIntro": {
        "en": "\\(I\\) is the identity. \\(A_0B_0\\) means \\(A_0\\otimes B_0\\), with identities on the other parties.",
        "zh": "\\(I\\) 是恒等算符。\\(A_0B_0\\) 表示 \\(A_0\\otimes B_0\\)，其他方上补恒等算符。"
      }
    },
    {
      "id": "four-resource-pair",
      "title": {
        "en": "Exploratory direction: two tests with reciprocal flags",
        "zh": "探索性方向：两个相互提供旗标的检验"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 55,
      "layout": "statement",
      "bullets": {
        "en": [
          "Equal flag outputs contribute \\(1\\). Opposite flag outputs contribute the tested CHSH operator minus \\(I\\). Event probabilities remain in the score.",
          "Both tests have local upper bound \\(1\\). Each maximum \\(2\\sqrt2-1\\) is attainable by one Bell pair and two deterministic parties."
        ],
        "zh": [
          "旗标输出相同的支撑贡献 \\(1\\)；相反的支撑贡献受测 CHSH 算符减 \\(I\\)。事件概率始终保留在得分里。",
          "两项的局域上界都是 \\(1\\)。各自最大值 \\(2\\sqrt2-1\\) 都能由一个 Bell 对加两个确定输出方达到。"
        ]
      },
      "notes": {
        "en": "Now f minus tests AB, using CD’s opposite-output event as the flag. The other test g minus swaps the two pairs. If the flag is zero, the operator contributes the constant one. If the flag is one, it contributes the CHSH operator minus identity. The score is always the expectation of the whole expression. Events are not discarded.\n\nExpanding these operators gives only two-body and four-body correlators. Both tests belong to class 35 in the original forty-dimensional library and share a verified ridge. This ties the candidate to pivoting.\n\nEach endpoint can reach its quantum maximum with only one Bell pair and deterministic spectators. Those states are biseparable. Thus an endpoint score alone cannot certify genuine four-party entanglement. We must ask what their combination can exclude.\n\nReference: The inequalities are \\(\\langle f_-\\rangle_\\rho\\le1\\) and \\(\\langle g_-\\rangle_\\rho\\le1\\) for local behaviors. We now use an upper-bound convention rather than the earlier minimizing convention. On CD’s parity sectors, f is I or \\(S_{AB}-I\\). With \\(p_{CD}>0\\),\n\\(\\langle f_-\\rangle_\\rho=1+p_{CD}(\\langle S_{AB}\\rangle_{c\\ne d}-2)\\);\nwhen \\(p_{CD}=0\\), the added contribution is zero. This retains event probabilities and inactive events. Expansion gives \\(f_-=S_{AB}/2-S_{AB}C_0D_0/2+C_0D_0\\), and g swaps the pairs. The facet dimensions are 39, the shared ridge dimension 38. These are projected facets, not full-80D facets. A partial class-35 neighborhood does not invalidate this individually verified ridge. Adjacency alone implies no GME. Both quantum and BS endpoint maxima equal \\(2\\sqrt2-1\\); not every maximizer is thereby classified as BS.",
        "zh": "现在 f 减检验 AB，用 CD 输出相反的事件作旗标；g 减则交换两对的角色。旗标为0时，算符贡献常数1；旗标为1时，贡献 CHSH 算符减恒等算符。得分始终是完整表达式的期望值，没有丢弃其他事件。\n\n展开后只有二体和四体关联项。两项都属于原40维库的第35类，并共享一条已核验 ridge，这就把候选接回 pivot。\n\n每个端点都可以只用一个 Bell 对、配合确定输出的旁观方，达到量子最大值。这些态是双可分的。因此，单个端点得分不能认证真正四体纠缠；下一步要问组合得分可以排除什么。\n\n参考：局域行为满足 \\(\\langle f_-\\rangle_\\rho\\le1\\)、\\(\\langle g_-\\rangle_\\rho\\le1\\)。这里改用上界约定，区别于此前最小值规范。在 CD 的奇偶支撑上，f 分别是 I 或 \\(S_{AB}-I\\)。若 \\(p_{CD}>0\\)，\n\\(\\langle f_-\\rangle_\\rho=1+p_{CD}(\\langle S_{AB}\\rangle_{c\\ne d}-2)\\)；\n概率为0时，附加贡献为0。事件概率与未激活事件均保留。展开为 \\(f_-=S_{AB}/2-S_{AB}C_0D_0/2+C_0D_0\\)，g 交换两对。facet 维数39，共同 ridge 维数38，是投影 facets，不是完整80维 facets。第35类邻域未闭合，不影响这条独立验证的 ridge。邻接本身不推出 GME。两个端点的量子及 BS 最大值均为 \\(2\\sqrt2-1\\)，但不能由此分类所有最大化态。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The endpoints are BS-attainable; define the stronger GME question.",
          "zh": "端点可由 BS 达到，接着定义更强的 GME 问题。"
        }
      },
      "formula": "\\[\\begin{aligned}f_-&=I+(S_{AB}-2I)P_-^{CD},\\\\g_-&=I+(S_{CD}-2I)P_-^{AB}.\\end{aligned}\\]",
      "bodyIntro": {
        "en": "The original 40D two-/four-body library contains this verified adjacent pair, in two orientations of class 35.",
        "zh": "原40维二、四体库包含这个已核验邻接配对：第35类的两个物理取向。"
      },
      "table": {
        "headers": {
          "en": [
            "Bell operator",
            "Tested pair",
            "Opposite-output flag"
          ],
          "zh": [
            "Bell 算符",
            "受测配对",
            "相反输出旗标"
          ]
        },
        "rows": {
          "en": [
            [
              "\\(f_-\\)",
              "AB",
              "\\(P_-^{CD}\\)"
            ],
            [
              "\\(g_-\\)",
              "CD",
              "\\(P_-^{AB}\\)"
            ]
          ],
          "zh": [
            [
              "\\(f_-\\)",
              "AB",
              "\\(P_-^{CD}\\)"
            ],
            [
              "\\(g_-\\)",
              "CD",
              "\\(P_-^{AB}\\)"
            ]
          ]
        }
      }
    },
    {
      "id": "four-gme-criterion",
      "title": {
        "en": "Exploratory direction: the GME criterion",
        "zh": "探索性方向：GME 的认证判据"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 55,
      "layout": "statement",
      "bullets": {
        "en": [
          "\\(\\lambda\\) weights two Bell scores using one shared strategy. It does not mix two states.",
          "\\(B(\\lambda)\\) is the largest score allowed by all BS strategies, including mixtures of different cuts.",
          "A Bell pair on AB and another on CD is still BS across \\(AB|CD\\). Bell violation alone is insufficient for GME."
        ],
        "zh": [
          "\\(\\lambda\\) 对共用策略的两个 Bell 分数加权，不是混合两个量子态。",
          "\\(B(\\lambda)\\) 是所有 BS 策略的最大允许分数，包含不同切分的混合。",
          "AB、CD 各有一个 Bell 对，仍是在 \\(AB|CD\\) 上双可分的态。仅有 Bell 违反不足以认证 GME。"
        ]
      },
      "notes": {
        "en": "Biseparable does not mean that all four parties are unentangled. It permits entanglement inside either group of a bipartition. For example, two independent Bell pairs on AB and CD are biseparable across AB versus CD. It also permits mixtures whose terms use different cuts. GME means the state admits no such mixture decomposition.\n\nWe combine the two Bell operators with a weight lambda. Both use the same state and measurements. The weight combines scores, not states. B lambda is the largest combined score allowed by any biseparable strategy. If a physical score exceeds B, every biseparable explanation is excluded, which certifies GME. We now compare that threshold with an explicit four-qubit strategy.\n\nReference: BS is the convex hull of product states across all seven nontrivial cuts. For mixed states, entanglement across each fixed cut alone does not exclude mixtures of different cuts. The supremum includes all local dimensions and local measurement tuples, including shared classical randomness. GME is an entanglement statement under quantum Bell assumptions, not a certificate of genuine multipartite nonlocality against arbitrary nonsignaling groups. A value at or below the BS threshold makes this test inconclusive; it does not prove the state BS.",
        "zh": "双可分不是四方都没有纠缠。它允许一个二分切分内部的两组分别有纠缠。例如 AB 和 CD 各有一个独立 Bell 对，仍是在 AB 对 CD 上双可分的态。它也允许不同混合项使用不同切分。GME 是不能写成这种混合分解的态。\n\n我们用权重 lambda 组合两个 Bell 算符，两项共用同一个态和测量。权重组合得分，不是混合量子态。B lambda 是所有双可分策略能够得到的最大组合分数。实际分数超过 B，就排除全部双可分解释，认证 GME。下面比较这个阈值与一个明确四量子比特策略。\n\n参考：BS 是全部七种非平凡切分上的乘积态凸包。对混合态，仅说明每个固定切分都有纠缠，仍不足以排除不同切分的混合。上确界包含任意局域维数、局域测量组及共享经典随机性。GME 是量子 Bell 假设下的纠缠结论，不是对组内任意无信号模型的真正多体非局域性认证。得分没有超过 BS 阈值，只说明这个检验不够，不能证明态双可分。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "transition": {
          "en": "Compare the all-BS threshold with one explicit physical score.",
          "zh": "比较全 BS 阈值与一个明确物理策略的得分。"
        }
      },
      "formula": "\\[\\begin{aligned}\nH_\\lambda&=(1-\\lambda)f_-+\\lambda g_-,\\qquad0\\le\\lambda\\le1,\\\\\nB(\\lambda)&=\\sup_{\\rho\\in\\mathrm{BS},\\,\\mathsf M}\\langle H_\\lambda\\rangle_\\rho,\\\\\n\\langle H_\\lambda\\rangle_\\rho&>B(\\lambda)\\quad\\Longrightarrow\\quad\\mathrm{GME}.\n\\end{aligned}\\]",
      "bodyIntro": {
        "en": "<strong>Biseparable (BS):</strong> a mixture of states that factor across possibly different bipartitions. <strong>Genuine multipartite entanglement (GME):</strong> no such decomposition.",
        "zh": "<strong>双可分（BS）：</strong>在某个二分切分上为乘积的态及其混合。<strong>真正多体纠缠（GME）：</strong>不能作这种分解。"
      }
    },
    {
      "id": "four-resource-gap",
      "title": {
        "en": "Exploratory direction: a score above the BS threshold",
        "zh": "探索性方向：得分超过双可分阈值"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 70,
      "layout": "wide",
      "bullets": {
        "en": [
          "Horizontal axis: weight \\(\\lambda\\). Vertical axis: mean of \\(H_\\lambda\\). Green: exact BS maximum.",
          "Blue: score \\(L\\) of one shared four-qubit strategy. Above green, that strategy certifies GME. Global quantum optimality is open."
        ],
        "zh": [
          "横轴：组合权重 \\(\\lambda\\)。纵轴：\\(H_\\lambda\\) 的平均得分。绿线：精确 BS 最大值。",
          "蓝线：一个共用四量子比特策略的得分 \\(L\\)。高于绿线的区间认证 GME。全局量子最优性仍待解决。"
        ]
      },
      "notes": {
        "en": "The horizontal axis is the weight lambda, and the vertical axis is the combined score. The green curve is the exact maximum over all biseparable strategies, not just product states of four individual parties. The blue horizontal line is the score of one explicit four-qubit state and one fixed measurement tuple.\n\nAt either endpoint, a biseparable strategy reaches two root two minus one. At the midpoint the BS threshold drops to root two. Our shared four-qubit strategy scores about 1.456307, strictly above root two. The excess is the resource certificate. The score need not reach the global quantum maximum to certify GME.\n\nThis same strategy works on an open interval around the midpoint. It is not a procedure that creates entanglement by averaging two experiments. The natural next question is why no biseparable state, including two Bell pairs or mixtures of cuts, can cross the green curve.\n\nReference: \\(L=9690593/6654225\\). The explicit strategy has \\(A_0=B_0=C_0=D_0=Z\\), and each setting-one observable is \\((-13Z+84X)/85\\), with a four-qubit pure state given in the local certificate. X and Z here are Pauli matrices. The two endpoint means are both L, so the same strategy gives L for every weight. Strict GME certification holds for \\(0.4491889885\\ldots<\\lambda<0.5508110115\\ldots\\). Neither the global quantum optimum nor the largest certifiable interval is proved. The all-weight BS curve is exact, analytic, and dimension-independent.",
        "zh": "横轴是权重 lambda，纵轴是组合得分。绿线是所有双可分策略的精确最大值，不只是四个单方乘积态的最大值。蓝色水平线是一个明确四量子比特态、配合固定测量组的得分。\n\n在两端，双可分策略可达到二倍根号二减1；中点的 BS 阈值降到根号二。我们的共用四体策略得到约1.456307，严格超过根号二。这个超出量就是资源认证，不需要先求出全局量子最大值。\n\n同一策略在中点附近的开放区间有效。这不是平均两个实验来产生纠缠。接下来很自然地要问：为什么所有双可分态，包括两个 Bell 对与不同切分的混合，都不能超过绿线？\n\n参考：\\(L=9690593/6654225\\)。明确策略用 \\(A_0=B_0=C_0=D_0=Z\\)，各方设置1为 \\((-13Z+84X)/85\\)，四量子比特纯态给在本地证书中；X、Z 是 Pauli 矩阵。两个端点期望值都等于 L，因此同一策略在每个权重都给出 L。严格 GME 认证区间为 \\(0.4491889885\\ldots<\\lambda<0.5508110115\\ldots\\)。全局量子最优及最大可认证区间未证明。全权重 BS 曲线则是精确、解析且不依赖局域维数的结果。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "Prove the green threshold by covering every bipartition.",
          "zh": "覆盖每一种二分切分，证明绿线阈值。"
        }
      },
      "asset": "four-party-resource-bridge.png",
      "assetAlt": {
        "en": "The combination certifies genuine four-party entanglement",
        "zh": "组合检验认证真正四体纠缠"
      },
      "formula": "\\[B(\\lambda)=1+2(\\sqrt2-1)\\max\\{\\lambda,1-\\lambda\\},\\qquad B(1/2)=\\sqrt2<L\\approx1.456307.\\]"
    },
    {
      "id": "four-all-cuts",
      "title": {
        "en": "Exploratory direction: why all seven cuts are required",
        "zh": "探索性方向：为什么必须覆盖七种切分"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 65,
      "layout": "statement",
      "bullets": {
        "en": [
          "Linearity extends this common bound to mixtures of different cuts.",
          "\\(AB|CD\\) allows two Bell pairs. A joint CHSH–flag constraint gives an exact sum-of-squares (SOS) proof."
        ],
        "zh": [
          "每行约束同一个组合得分。线性性保证不同切分的混合也满足统一上界。",
          "\\(AB|CD\\) 允许两个纠缠对。CHSH 与旗标的联合约束给出这个切分的精确平方和（SOS）证书。"
        ]
      },
      "notes": {
        "en": "To certify genuine four-party entanglement, we must exclude every way of splitting the parties into two groups. There are four singleton-versus-triple cuts and three pair-versus-pair cuts. The vertical bar separates the groups. Entanglement inside either group remains allowed.\n\nThe first two rows follow from elementary CHSH bounds. On the two crossed pair cuts the score cannot exceed one. The aligned AB versus CD cut is the important remaining case: both groups can contain entangled Bell pairs. But the CHSH score of a pair and the probability that it activates the other test come from the same measurements. They cannot be maximized independently.\n\nAn exact sum-of-squares constraint gives the bound in the last row. Its expression also dominates all the other rows. Because the score is linear in the state, mixtures of different cuts satisfy the same bound. A Bell pair plus deterministic spectators reaches it, so the green curve is the true BS maximum.\n\nReference: \\(k=\\sqrt2-1\\). For a product state across AB|CD let \\(q_{AB}=\\langle S_{AB}\\rangle/2\\), \\(p_{AB}=\\langle P_-^{AB}\\rangle\\), and define CD likewise. Then \\(\\langle H_\\lambda\\rangle=1+2[(1-\\lambda)(q_{AB}-1)p_{CD}+\\lambda p_{AB}(q_{CD}-1)]\\). The pair constraint \\(q+(2/3)p\\le5/3\\), together with \\(q\\le\\sqrt2\\) and \\(0\\le p\\le1\\), proves the displayed aligned-cut bound by optimization over an outer polygon. The SOS identity is in the appendix. Six cuts have analytic bounds; the remaining aligned-cut proof uses joint constraints. This is not seven independent SDP solves. Small moment-matrix SDPs supplied broader sign-case certificates, while this negative-parity all-weight curve has an exact analytic proof.",
        "zh": "认证真正四体纠缠，要排除全部把四方分成两组的方式：四种单方对三方切分，以及三种双对切分。竖线分隔两组，组内仍允许纠缠。\n\n前两行来自基本 CHSH 界；两个交叉双对切分的得分不超过1。剩下最关键的是 AB 对 CD：两组内部都可以有 Bell 对。但每一对的 CHSH 得分，以及激活另一项的旗标概率，来自同一组测量，不能分别最大化。\n\n一个精确平方和约束给出最后一行的界；它同时不低于其他行的界。得分对态是线性的，因此不同切分的混合仍满足同一界。一个 Bell 对加确定输出旁观方能够达到该界，所以绿线确实是 BS 最大值。\n\n参考：\\(k=\\sqrt2-1\\)。AB|CD 的乘积态上令 \\(q_{AB}=\\langle S_{AB}\\rangle/2\\)、\\(p_{AB}=\\langle P_-^{AB}\\rangle\\)，CD 同理，则 \\(\\langle H_\\lambda\\rangle=1+2[(1-\\lambda)(q_{AB}-1)p_{CD}+\\lambda p_{AB}(q_{CD}-1)]\\)。对内约束 \\(q+(2/3)p\\le5/3\\)、\\(q\\le\\sqrt2\\)、\\(0\\le p\\le1\\)，通过外多边形优化给出对齐切分界。平方和恒等式见附录。六种切分有直接解析界，剩下对齐切分使用联合约束，并不是独立求解七个 SDP。小矩阵 SDP 给出其他符号情形的证书，而这里负奇偶全权重曲线有精确解析证明。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "Separate this exact example from established combining methods and priority questions.",
          "zh": "区分已验证具体例子、已有组合方法与优先权问题。"
        }
      },
      "bodyIntro": {
        "en": "The bar separates two groups; entanglement inside each is allowed. Set \\(k=\\sqrt2-1\\).",
        "zh": "竖线分隔两组，组内仍允许纠缠。记 \\(k=\\sqrt2-1\\)。"
      },
      "table": {
        "headers": {
          "en": [
            "Cuts",
            "Number",
            "Upper bound on \\(\\langle H_\\lambda\\rangle\\)"
          ],
          "zh": [
            "切分",
            "数量",
            "\\(\\langle H_\\lambda\\rangle\\) 的上界"
          ]
        },
        "rows": {
          "en": [
            [
              "\\(A|BCD,\\ B|ACD\\)",
              "2",
              "\\(1+2k\\lambda\\)"
            ],
            [
              "\\(C|ABD,\\ D|ABC\\)",
              "2",
              "\\(1+2k(1-\\lambda)\\)"
            ],
            [
              "\\(AC|BD,\\ AD|BC\\)",
              "2",
              "\\(1\\)"
            ],
            [
              "\\(AB|CD\\)",
              "1",
              "\\(1+2k\\max\\{\\lambda,1-\\lambda\\}\\)"
            ]
          ],
          "zh": [
            [
              "\\(A|BCD,\\ B|ACD\\)",
              "2",
              "\\(1+2k\\lambda\\)"
            ],
            [
              "\\(C|ABD,\\ D|ABC\\)",
              "2",
              "\\(1+2k(1-\\lambda)\\)"
            ],
            [
              "\\(AC|BD,\\ AD|BC\\)",
              "2",
              "\\(1\\)"
            ],
            [
              "\\(AB|CD\\)",
              "1",
              "\\(1+2k\\max\\{\\lambda,1-\\lambda\\}\\)"
            ]
          ]
        }
      }
    },
    {
      "id": "ideas-status",
      "title": {
        "en": "Exploratory direction: established ingredients and specific result",
        "zh": "探索性方向：已有方法与本例的具体结果"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 40,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>Established:</strong> conditional CHSH tests and combining Bell scores to exclude all biseparable states.",
          "<strong>Verified here:</strong> this projected ridge pair, reciprocal parity flags, and its exact BS curve for every weight.",
          "<strong>Still under assessment:</strong> the priority and generality of this particular geometry-to-resource construction."
        ],
        "zh": [
          "<strong>已有方法：</strong>条件 CHSH 检验，以及组合 Bell 分数来排除全部双可分态。",
          "<strong>本例已核验：</strong>指定投影 ridge 配对、相互奇偶旗标及全部权重的精确 BS 曲线。",
          "<strong>仍待评估：</strong>这个具体几何到资源构造的文献优先权与一般适用范围。"
        ]
      },
      "notes": {
        "en": "Combining conditional Bell scores to certify GME is an established idea. It means forming one witness score whose bound excludes every biseparable strategy. It does not mean physically merging states or creating entanglement by averaging measurements.\n\nOur specific result connects a verified ridge pair in the four-party projected facet library to reciprocal parity flags and a sharp BS curve. Ordinary AB and CD seed edges alone are disconnected; their reciprocal flags add the relevant four-body correlations. The mathematical example is verified, but whether this full construction has prior counterparts remains a literature question.\n\nReference: Pironio (2005) establishes outcome-conditioned Bell lifting. Zwerger et al. (2019), followed by Zhang et al. (2022), combine conditional bipartite Bell scores to certify GME with valid biseparable thresholds. Their connected graphs join physical parties, whereas the pivot graph joins facets. Curchod et al. also construct multipartite Bell tests from seeds, with a different hybrid nonsignaling resource model. The weighted-CHSH constraint used in our proof has precedent. A bounded formula-level audit did not identify the complete present combination, which is provisional evidence rather than a priority proof.",
        "zh": "组合条件 Bell 分数认证 GME 是已有思路：构造一个见证得分，其上界能排除每一种双可分策略。这里组合的是检验分数，不是把量子态物理合并，也不是平均测量来制造纠缠。\n\n本例的具体结果，是将四体投影库里已验证的 ridge 配对，与相互奇偶旗标和精确 BS 曲线联系起来。只看普通 AB、CD 种子边，这个配对图并不连通；相互旗标加入了相关四体关联。数学例子已经核验，但完整构造是否已有对应结果，仍是文献问题。\n\n参考：Pironio（2005）建立输出条件下的 Bell 提升。Zwerger 等（2019）及 Zhang 等（2022）用有效双可分阈值组合条件二方 Bell 分数来认证 GME；其连通图连接物理方，而 pivot graph 连接 facets。Curchod 等也从种子构造多体 Bell 检验，但资源模型为另一种混合无信号模型。本证明使用的加权 CHSH 约束亦有先例。有限逐公式审计没有识别出本例的完整组合，只是暂定证据，不是优先权证明。"
      },
      "sources": [
        {
          "label": "Pironio 2005",
          "url": "https://arxiv.org/abs/quant-ph/0503179"
        },
        {
          "label": "Curchod et al.",
          "url": "https://arxiv.org/abs/1808.10688"
        },
        {
          "label": "Zwerger et al. 2019",
          "url": "https://arxiv.org/abs/1809.02381"
        },
        {
          "label": "Zhang et al.",
          "url": "https://arxiv.org/abs/2108.12764"
        },
        {
          "label": "Ramanathan et al.",
          "url": "https://arxiv.org/abs/1607.05714"
        },
        {
          "label": {
            "en": "Bounded local novelty audit",
            "zh": "有限本地新颖性审计"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "Use SDP to extend the certified comparison beyond this analytic pair.",
          "zh": "用 SDP 将认证比较扩展到这个解析配对之外。"
        }
      }
    },
    {
      "id": "sdp-next",
      "title": {
        "en": "Exploratory direction: extending the search with SDP",
        "zh": "探索性方向：用 SDP 扩展搜索"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 45,
      "layout": "statement",
      "bullets": {
        "en": [
          "<strong>Pivot library:</strong> choose verified neighboring tests and retain their relative physical orientation.",
          "<strong>SDP = semidefinite programming:</strong> obtain valid upper bounds for every BS cut, then take their maximum.",
          "Compare with an explicit shared-strategy score. Use permutation symmetry (PI) only when the target preserves it."
        ],
        "zh": [
          "<strong>Pivot 库：</strong>选择已验证邻接检验，并保留相对物理取向。",
          "<strong>SDP＝半正定规划：</strong>给每种 BS 切分求有效上界，再取最大值。",
          "将这个界与明确共用策略的得分比较。只有目标保留置换对称性（PI）时，才作相应化简。"
        ]
      },
      "notes": {
        "en": "The current example has a short analytic certificate. Most facet pairs will not. This is where the later SDP work enters.\n\nPivoting supplies candidates with verified geometry and physical orientations. A numerical search supplies a state and measurements, giving an attainable lower value L. Semidefinite programming supplies valid outer bounds for biseparable strategies on every cut. Taking the largest cut bound gives U. If L is strictly above U, the gap certifies GME without knowing the global quantum optimum.\n\nThe task is now concrete: repeat this comparison for other pairs in the four-party partial library. SDPBell and PIBell may make the bounds smaller and more economical when the actual objective retains their symmetry.\n\nReference: An SDP optimizes a matrix constrained to be positive semidefinite. Moment matrices contain expectations of operator products and encode relations obeyed by physical quantum models. An outer relaxation must include every excluded BS strategy; an arbitrary restricted-state optimization is not an upper certificate. Ordinary quantum NPA bounds or grouping parties do not impose cut separability: a valid cut relaxation is required, for example a moment-PPT model with the correct tensor structure for a pair-versus-pair cut, or deterministic-output reduction on the isolated party for a singleton cut. Residual correction, rational dual validation, or exact SOS is needed to turn a numerical solver estimate into a rigorous gap. If L does not exceed U, this relaxation is inconclusive. PI means permutational invariance. Full PI symmetry cannot be imposed on a generic asymmetric pair. The present all-cut analytic proof demonstrates the comparison; it does not complete a general scan of the library.",
        "zh": "当前例子有较短的解析证书，其他 facet 配对未必有。这就是后续 SDP 工作进入故事的位置。\n\nPivot 给出几何已验证、物理取向确定的候选；数值搜索提供一个态和测量组，得到可实现下界 L。半正定规划为每一种切分的双可分策略提供有效外上界，取最大值得 U。若 L 严格超过 U，就认证 GME，而不必知道全局量子最优值。\n\n下一步因此很具体：对原四体部分库的其他配对重复这个比较。目标实际保留相应对称性时，SDPBell 和 PIBell 可使界更紧、计算更经济。\n\n参考：SDP 优化受半正定约束的矩阵。矩阵元是算符乘积期望，编码物理量子模型必须满足的关系。外松弛必须包含全部待排除的 BS 策略；任意受限态优化不构成上界证书。普通量子 NPA 界或仅将各方分组，并未施加切分可分性：必须使用有效切分外松弛，例如双对切分上具有正确张量结构的 moment-PPT 模型，或单方切分上对孤立方作确定输出约化。数值求解器估计需要残差修正、有理对偶验证或精确 SOS，才能给出严格间隙。若 L 不超过 U，只说明该松弛不能判定。PI 指置换不变性，一般不对称配对不能强加完整 PI 对称性。本例解析全切分证明展示比较方法，不代表一般库扫描已经完成。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": false,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "The four-party library supplies candidates; resource certificates decide their usefulness.",
          "zh": "四体库提供候选；资源证书判断候选的作用。"
        }
      },
      "formula": "\\[L(\\lambda)>U(\\lambda)\\quad\\Longrightarrow\\quad\\mathrm{GME}.\\]",
      "table": {
        "headers": {
          "en": [
            "Symbol",
            "Meaning"
          ],
          "zh": [
            "符号",
            "含义"
          ]
        },
        "rows": {
          "en": [
            [
              "\\(L(\\lambda)\\)",
              "Score of an explicit state and shared measurements"
            ],
            [
              "\\(U(\\lambda)\\)",
              "Certified upper bound covering every BS cut and mixtures"
            ]
          ],
          "zh": [
            [
              "\\(L(\\lambda)\\)",
              "明确量子态与共用测量实际达到的得分"
            ],
            [
              "\\(U(\\lambda)\\)",
              "覆盖全部 BS 切分及其混合的认证上界"
            ]
          ]
        }
      }
    },
    {
      "id": "backup-delta",
      "title": {
        "en": "Two normalizations of quantum violation",
        "zh": "量子违反的两种规范化"
      },
      "section": {
        "en": "Original v0 technical detail",
        "zh": "原稿 v0 技术细节"
      },
      "duration": 0,
      "layout": "statement",
      "bullets": {
        "en": [
          "The ratio includes the geometric classical-to-nonsignaling range.",
          "The fraction measures the attained progress inside that range.",
          "Numerical near-saturation still needs a rigorous certificate."
        ],
        "zh": [
          "比值包含经典到无信号范围的几何因素。",
          "分数衡量在这个范围内已达到的进度。",
          "数值上的近饱和仍需要严格证书。"
        ]
      },
      "notes": {
        "en": "The identity uses the true quantum value. An attained value gives an attained fraction. In projected coordinates, omitted correlators must remain as auxiliary variables or be eliminated exactly in the nonsignaling optimization. The fraction is undefined if \\(\\beta_N=\\beta_C\\). The five recorded near-saturating even-correlator classes have not received exact saturation certificates.",
        "zh": "恒等式使用真实量子值，已实现值则给出已实现分数。在投影坐标中，遗漏关联项必须保留为辅助变量或在无信号优化中被精确消元。当 \\(\\beta_N=\\beta_C\\) 时分数未定义。五个记录近饱和的偶数阶类别还没有精确饱和证书。"
      },
      "sources": [
        {
          "label": {
            "en": "Supplied pivot manuscript, v0 snapshot",
            "zh": "作者提供的 pivot 原稿，v0 快照"
          }
        }
      ],
      "backup": true,
      "phase": "original",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "",
          "zh": ""
        }
      },
      "formula": "\\[\\delta=\\frac{\\beta_Q-\\beta_C}{\\beta_N-\\beta_C},\\qquad\\Delta=1+\\delta\\left(\\frac{\\beta_N}{\\beta_C}-1\\right)\\]"
    },
    {
      "id": "backup-full-space",
      "title": {
        "en": "Exploratory direction: projected and full-space adjacency",
        "zh": "探索性方向：投影与全空间邻接"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 0,
      "layout": "statement",
      "bullets": {
        "en": [
          "The resource endpoints are facets of the 40-dimensional projection.",
          "In the full 80-dimensional space their faces have dimension 78.",
          "Their full-space intersection has dimension 76, so it is not a full-space ridge."
        ],
        "zh": [
          "资源端点是40维投影中的 facets。",
          "在完整80维空间，它们的面维数为78。",
          "全空间交集维数为76，因此不是全空间 ridge。"
        ]
      },
      "notes": {
        "en": "Each endpoint has 96 tight vertices among 128 distinct projected vertices, with augmented rank 40. The negative-negative pair shares 82 projected vertices, with augmented rank 39. The independent check also reconstructs the full-space tight sets. A projection can promote a lower-dimensional full-space face to a facet, so these identities must not be transferred to the full scenario.",
        "zh": "每个端点在128个不同投影顶点中有96个紧顶点，增广秩为40。负、负配对有82个共同紧顶点，增广秩为39。独立检查也重建了全空间紧集。投影可以把全空间较低维面变成投影 facet，因此不能把这些身份直接转移到完整场景。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": true,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "",
          "zh": ""
        }
      }
    },
    {
      "id": "backup-four-sos",
      "title": {
        "en": "Exploratory direction: an exact certificate for the aligned cut",
        "zh": "探索性方向：对齐切分的精确证书"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 0,
      "layout": "statement",
      "bullets": {
        "en": [
          "Taking expectations gives \\(q_{AB}+\\tfrac23p_{AB}\\le\\tfrac53\\), with \\(q_{AB}=\\langle S_{AB}\\rangle/2\\), \\(p_{AB}=\\langle P_-^{AB}\\rangle\\).",
          "SOS means a sum of squares of Hermitian operators, hence a nonnegative operator.",
          "This known weighted-CHSH constraint couples a pair’s score and flag probability; it bounds the aligned AB|CD cut."
        ],
        "zh": [
          "取期望得到 \\(q_{AB}+\\tfrac23p_{AB}\\le\\tfrac53\\)，其中 \\(q_{AB}=\\langle S_{AB}\\rangle/2\\)、\\(p_{AB}=\\langle P_-^{AB}\\rangle\\)。",
          "SOS 指厄米算符的平方和，因此给出非负算符。",
          "这条已有加权 CHSH 约束联系同一对的得分与旗标概率，用于约束对齐 AB|CD 切分。"
        ]
      },
      "notes": {
        "en": "Same-party anticommutator terms cancel between the two squares. With \\(k=\\sqrt2-1\\), the nonnegative part \\(x=\\max(q-1,0)\\) satisfies \\(0\\leq p\\leq1\\), \\(0\\leq x\\leq k\\), and \\(x\\leq(2/3)(1-p)\\). Vertex-pair maximization bounds the aligned-cut bilinear score. A Bell pair and a deterministic block attain the bound. This solves the BS support without determining global quantum support.",
        "zh": "同一方反对易交叉项在两个平方之间抵消。令 \\(k=\\sqrt2-1\\)，非负部分 \\(x=\\max(q-1,0)\\) 满足 \\(0\\leq p\\leq1\\)、\\(0\\leq x\\leq k\\)、\\(x\\leq(2/3)(1-p)\\)。在顶点对上最大化可约束对齐切分的双线性分数。一个 Bell 对加确定输出块达到上界。这精确求出 BS 支撑，而未确定全局量子支撑。"
      },
      "sources": [
        {
          "label": {
            "en": "Four-party local certificate, 11 Oct 2026",
            "zh": "四体局部证书，2026年10月11日"
          }
        }
      ],
      "backup": true,
      "phase": "discussion",
      "story": {
        "question": {
          "en": "",
          "zh": ""
        },
        "takeaway": {
          "en": "",
          "zh": ""
        },
        "transition": {
          "en": "",
          "zh": ""
        }
      },
      "formula": "\\[\\frac53I-\\left(\\frac{S_{AB}}2+\\frac23P_-^{AB}\\right)=\\frac{(2A_0-B_0-3B_1)^2}{24}+\\frac{(2A_1-B_0+B_1)^2}{8}\\succeq0.\\]"
    },
    {
      "id": "r5-family",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "Exploratory direction: the R5 gap at interior weights",
        "zh": "探索性方向：R5 的内部权重间隙"
      },
      "duration": 0,
      "layout": "chart",
      "bullets": {
        "en": [
          "Two differently flagged lifted-CHSH tests share Charlie’s settings, with exact quantum and all-cut BS support for \\(0<p<1\\).",
          "Midpoint: \\(h_Q=\\frac{11}{7}\\), \\(h_{\\mathrm{BS}}=\\frac{5+2\\sqrt{13}}9\\).",
          "The gap closes quadratically as either endpoint is approached."
        ],
        "zh": [
          "两个由不同方标记的 lifted-CHSH 检验共用 Charlie 的设置，在 \\(0<p<1\\) 上具有精确量子与全切分 BS 支撑。",
          "中点：\\(h_Q=\\frac{11}{7}\\)，\\(h_{\\mathrm{BS}}=\\frac{5+2\\sqrt{13}}9\\)。",
          "趋近任一端点时，间隙按二次方闭合。"
        ]
      },
      "notes": {
        "en": "This backup concerns a separate three-party family. One endpoint tests a conditional CHSH pair with Alice as the flag; the other uses Bob as the flag. Charlie participates in both seeds with the same two settings. This arrangement changes which joint quantum realization can satisfy both scores. The theorem gives the unrestricted quantum support as a uniquely selected physical quartic root and the actual all-cut biseparable support as a positive cubic root. Every interior weight has a strict gap; the curves meet only at the endpoints. At the midpoint the values shown are exact. This support statement concerns the specified facet-pair family; conditional Bell tests and GME witnesses have established precedents. The local manuscript contains the support proof and its equality analysis. This three-party family is a separate follow-up. Its priority is not established by the mathematical support certificate.",
        "zh": "本备份讨论一个独立三体家族。一个端点让 Alice 作为标记方，检验条件 CHSH 对；另一个端点让 Bob 作为标记方。Charlie 参与两项，并使用相同的两个设置。这种排列改变了哪个联合量子实现能够同时满足两个得分。定理把完整量子支撑选为唯一物理四次根，把实际全切分双可分支撑选为正三次根。所有内部权重都有严格间隙，仅在端点相遇，中点数值如图且为精确值。这个支撑结论针对指定 facet 配对；条件 Bell 检验和 GME 见证已有先例。本地稿件包含支撑证明及等号分析。 这个三体家族是独立后续方向；数学支撑证书不能单独建立文献优先权。"
      },
      "sources": [
        {
          "label": "Current pivot manuscript",
          "url": ""
        }
      ],
      "asset": "r5-curve.svg",
      "backup": true,
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
      "formula": null,
      "phase": "discussion"
    },
    {
      "id": "weighted-w",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "Exploratory direction: identifying weighted W states",
        "zh": "探索性方向：确定加权 W 态"
      },
      "duration": 0,
      "layout": "chart",
      "bullets": {
        "en": [
          "At each fixed interior weight, one scalar score extracts the state and tested effects by local isometries.",
          "The midpoint behavior is known from Wu et al. The extension is the full support and equality family for all interior weights."
        ],
        "zh": [
          "每个固定内部权重下，一个标量得分通过局域等距映射提取态与受测效应。",
          "中点行为已见于 Wu 等。这里的扩展是所有内部权重的完整支撑与等号家族。"
        ]
      },
      "notes": {
        "en": "At every strictly interior weight, every finite-dimensional binary-POVM realization attaining the scalar maximum extracts the displayed weighted W state and the tested effects on occupied support. The unique positive eigenvector fixes its amplitudes. Local block alignment makes the statement valid also with coherent sectors and an external purification. This is the equality consequence of the exact support proof, not just the identification of one successful strategy. Wu et al. already self-tested the midpoint generalized-W behavior; conditional CHSH and tilted-CHSH self-testing are established tools. The increment here is the all-weight scalar support and equality characterization for this specified geometric pair. Endpoint and unused-support measurements are outside this statement. This backup states the equality consequence of the exact support analysis. The midpoint W behavior has precedent. The weighted-family priority needs a formula-level literature comparison.",
        "zh": "在每个严格内部权重，任何达到标量最大值的有限维二元 POVM 实现，都能提取图中的加权 W 态和被占据支撑上的受测效应。唯一正特征向量固定其振幅；局域块对齐使结论也适用于相干扇区与外部纯化。这是精确支撑证明的等号推论，不只是找到一个成功策略。Wu 等已经自测试过中点的广义 W 行为，条件 CHSH 与 tilted-CHSH 也是已有工具。这里的扩展是指定几何配对在所有权重上的标量支撑和等号刻画。端点与未使用支撑上的测量不在结论之内。本备份陈述精确支撑分析的等号推论。 中点 W 行为已有先例；加权家族的优先权需要逐公式对照文献。"
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
      "backup": true,
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
      },
      "phase": "discussion"
    },
    {
      "id": "backup-robust",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "Exploratory direction: finite-deficit R5 certificates",
        "zh": "探索性方向：有限亏损的 R5 证书"
      },
      "duration": 0,
      "layout": "chart",
      "backup": true,
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
      },
      "phase": "discussion",
      "bodyIntro": {
        "en": "State extraction and private guessing have separate guarantees.",
        "zh": "态提取与私密猜测分别具有各自的保证。"
      }
    },
    {
      "id": "hecke-sdp",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "Exploratory direction: SDP scaling with many-body symmetry",
        "zh": "探索性方向：多体对称性下的 SDP 扩展"
      },
      "duration": 0,
      "layout": "chart",
      "bullets": {
        "en": [
          "In a separate PIBell benchmark, fixed PI hierarchy levels have fixed stable-range block sizes.",
          "At \\(N=500\\): attained-to-upper numerical gap \\(\\approx1.43\\times10^{-7}\\).",
          "Asymmetric pivot targets require their actual surviving symmetry."
        ],
        "zh": [
          "在一个独立 PIBell 基准中，固定 PI 层级的稳定范围块尺寸不随粒子数增长。",
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
      "backup": true,
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
      "formula": null,
      "phase": "discussion"
    },
    {
      "id": "backup-model",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "Exploratory direction: what the resource gap excludes",
        "zh": "探索性方向：资源间隙排除的模型"
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
      "formula": "\\[\\Delta_p=h_Q(H_p)-h_{\\mathrm{BS}}(H_p)\\]",
      "phase": "discussion"
    },
    {
      "id": "backup-symmetry",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "Exploratory direction: symmetry of weighted Bell targets",
        "zh": "探索性方向：加权 Bell 目标的对称性"
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
      },
      "phase": "discussion"
    },
    {
      "id": "backup-series",
      "section": {
        "en": "Context: earlier Bell-design work",
        "zh": "背景：此前 Bell 设计工作"
      },
      "title": {
        "en": "Context: three connected Bell-design papers",
        "zh": "背景：三篇相互连接的 Bell 设计文章"
      },
      "duration": 0,
      "layout": "roadmap",
      "bullets": {
        "en": [
          "<strong>Find a facet by optimization</strong><br>Optimizing quantum violation yields facet Bell inequalities<br><span class=\"paper-id\">arXiv:2511.07523 · supplied revised title</span>",
          "<strong>Certify structured many-body families</strong><br>Optimizing and Certifying Multipartite Permutationally Invariant Bell Inequalities<br><span class=\"paper-id\">arXiv:2607.08462</span>",
          "<strong>Design around accessible correlations</strong><br>Experimental certification of multipartite Bell correlations using only few-body symmetric correlations<br><span class=\"paper-id\">arXiv:2609.37442</span>"
        ],
        "zh": [
          "<strong>通过优化找到 facet</strong><br>Optimizing quantum violation yields facet Bell inequalities<br><span class=\"paper-id\">arXiv:2511.07523 · 作者提供的更新稿标题</span>",
          "<strong>认证有结构的多体家族</strong><br>Optimizing and Certifying Multipartite Permutationally Invariant Bell Inequalities<br><span class=\"paper-id\">arXiv:2607.08462</span>",
          "<strong>围绕可测关联项设计检验</strong><br>Experimental certification of multipartite Bell correlations using only few-body symmetric correlations<br><span class=\"paper-id\">arXiv:2609.37442</span>"
        ]
      },
      "notes": {
        "en": "The opening now concentrates on the first paper’s robustness-to-facet conclusion, because it supplies the direct motivation for pivoting. This backup preserves the three-paper context and their full titles. Coefficient optimization identifies robust tight tests; the PI follow-up optimizes and certifies structured many-body families; the experiment uses few-body symmetric correlations. The pivot project explores the connected facet boundary in four-party projections, after which resource bounds and SDP enter the story.",
        "zh": "开场现在集中讲第一篇的鲁棒性到 facet 的结论，因为它直接解释为什么要做 pivot。本备份保留三篇文章的完整标题和背景。系数优化寻找鲁棒紧检验；PI 后续工作优化并认证有结构多体家族；实验工作使用少体对称关联项。Pivot 课题探索四体投影中相连的 facet 边界，之后再接资源界与 SDP。"
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
      "backup": true,
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
      "formula": null,
      "phase": "background"
    }
  ],
  "storyline": {
    "en": "23 minutes: robustness selects facets; DD motivates recursive pivots; the method builds four-party partial libraries and violation landscapes. 7 minutes: a separate discussion of shared-strategy resources and SDP certificates.",
    "zh": "前23分钟：鲁棒性确定 facet 目标；DD 瓶颈引出递归 pivot；方法建立四体部分库与违反 landscapes。后7分钟：独立讨论共同策略资源与 SDP 证书。"
  }
};
