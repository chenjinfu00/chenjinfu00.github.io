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
