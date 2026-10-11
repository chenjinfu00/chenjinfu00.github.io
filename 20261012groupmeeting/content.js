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
  "revisionDate": "2026-10-11",
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
        "en": "The main part of this talk follows the supplied v0 manuscript: recursive facet expansion, the complete three-party benchmark, and four-party violation landscapes. Only after that story is complete will I discuss the recent resource ideas. Those ideas have local certificates, but their precise novelty and broader scope still need assessment.",
        "zh": "今天先沿用你提供的 v0 原稿顺序：递归 facet 展开、完整三体验证、四体违反 landscape。把这条线讲完整后，再讨论近期的资源 ideas。后面的具体例子已有局部证书，但准确新颖性和一般适用范围仍待评估。"
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
          "en": "Our earlier Bell-design work supplies the motivation and a starting facet.",
          "zh": "此前 Bell 设计工作提供动机和一个起始 facet。"
        }
      },
      "subtitle": {
        "en": "Enumeration and quantum-violation landscapes",
        "zh": "枚举与量子违反 landscape"
      }
    },
    {
      "id": "lineage",
      "section": {
        "en": "Earlier work · 0–5 min",
        "zh": "此前工作 · 0–5 分钟"
      },
      "title": {
        "en": "Earlier Bell-test design work",
        "zh": "此前的 Bell 检验设计工作"
      },
      "duration": 70,
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
        "en": "These three papers provide context, rather than three additional topics for this talk. The revised first paper explains how coefficient optimization reaches a facet. The PI paper controls structured many-body bounds. The experiment selects few-body symmetric correlators that can be measured. The pivot project asks a different geometric question: once one facet is known, how are other facets connected to it? The first title is from the author-supplied updated manuscript.",
        "zh": "这三篇文章是背景，不在今天分别展开。第一篇更新稿解释系数优化如何到达 facet；PI 文章控制有结构的多体界；实验文章选择实际可测的少体对称关联项。Pivot 接着问一个几何问题：已知一个 facet 后，其他 facets 如何与它连接？第一篇采用作者提供的更新标题。"
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
        "en": "A tight objective, a certified bound, and accessible correlators",
        "zh": "紧目标、可认证的界与可测关联项"
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
      "formula": null,
      "phase": "background"
    },
    {
      "id": "ratio-design",
      "section": {
        "en": "Earlier work · find the objective",
        "zh": "此前工作 · 找到目标"
      },
      "title": {
        "en": "A tight witness gives a starting facet",
        "zh": "紧见证提供一个起始 facet"
      },
      "duration": 60,
      "layout": "chart",
      "bullets": {
        "en": [
          "Coefficient optimization and tightening can reach a facet.",
          "The next task is to explore the neighboring boundary."
        ],
        "zh": [
          "系数优化与收紧可以到达 facet。",
          "下一步是探索它周围的边界。"
        ]
      },
      "notes": {
        "en": "The supplied illustration shows coefficient tightening by adding active local vertices. In the revised theorem, a nondegenerate ratio maximum lies at a facet, and a flat maximum admits a tightening path without loss of the ratio, under the stated normalization and coefficient quotient. I use this only to motivate a seed. Pivoting will preserve a shared ridge while moving to another facet, and it does not optimize the quantum value by itself.",
        "zh": "作者提供的图展示增加活跃局域顶点、收紧系数的过程。更新定理在规定的规范化和系数商空间中表明：非退化比值极大点位于 facet；平坦极大点可以沿不降低比值的路径收紧。这里只用它解释 seed 的来源。接下来的 pivot 保留共同 ridge，移动到另一个 facet，本身不负责优化量子值。"
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
      "formula": null,
      "subtitle": {
        "en": "The revised optimization paper supplies the starting point",
        "zh": "更新后的优化文章提供起点"
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
          "en": "Once a facet is found, the pivot project asks how its neighboring boundary can be explored.",
          "zh": "找到一个 facet 之后，pivot 课题接着问怎样探索它周围的边界。"
        }
      },
      "phase": "background"
    },
    {
      "id": "pivot-question",
      "title": {
        "en": "The boundary has a graph structure",
        "zh": "Bell 边界具有图结构"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 55,
      "layout": "statement",
      "bullets": {
        "en": [
          "Vertices of the local polytope are deterministic strategies.",
          "Facets are tight Bell inequalities.",
          "A shared ridge connects two facets."
        ],
        "zh": [
          "局域多面体的顶点是确定性策略。",
          "Facets 对应紧 Bell 不等式。",
          "共同 ridge 连接两个 facets。"
        ]
      },
      "notes": {
        "en": "An inequality list describes which tests are tight. The adjacency graph adds how those tests fit together. The geometric vertices are deterministic behaviors, while graph vertices are facets, so these are two different uses of the word vertex. Our goal is to construct the graph and then attach quantum-violation values to it.",
        "zh": "不等式列表告诉我们哪些检验是紧的。邻接图进一步告诉我们这些检验如何连接。多面体的顶点是确定性行为，facet graph 的节点却是 facets，要区分这两种节点。我们的目标是先构造图，再把量子违反值放到图上。"
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
      "formula": "\\[\\mathcal L=\\operatorname{conv}(V),\\qquad \\dim F=D-1,\\qquad \\dim R=D-2\\]"
    },
    {
      "id": "pivot-duality",
      "title": {
        "en": "Facet adjacency in the primal and polar pictures",
        "zh": "原始空间与极空间中的 facet 邻接"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 80,
      "layout": "wide",
      "bullets": {
        "en": [
          "A facet in the primal picture becomes a vertex in the polar.",
          "Crossing a ridge corresponds to following a polar edge."
        ],
        "zh": [
          "原始空间的一个 facet 对应极空间的一个顶点。",
          "跨过 ridge 对应沿极空间的一条边移动。"
        ]
      },
      "notes": {
        "en": "The original figure uses a symmetric CHSH projection. The highlighted triangle on the left is a supporting facet. On the right, facets become polar vertices and ridge adjacency becomes an edge. A ridge belongs to exactly two facets. The quantum region helps visualize violation, but the pivot is defined entirely by the classical polytope.",
        "zh": "原图使用对称 CHSH 投影。左侧高亮三角形是一个支撑 facet。右侧把 facets 变成极空间顶点，把 ridge 邻接变成边。一条 ridge 恰好属于两个 facets。量子区域帮助理解违反，但 pivot 完全由经典多面体定义。"
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
      "subtitle": {
        "en": "The original CHSH illustration",
        "zh": "原稿中的 CHSH 示意图"
      },
      "asset": "v0-chsh-duality.png",
      "assetAlt": {
        "en": "Facet adjacency in the primal and polar pictures",
        "zh": "原始空间与极空间中的 facet 邻接"
      }
    },
    {
      "id": "pivot-step",
      "title": {
        "en": "One pivot rotates a supporting inequality",
        "zh": "一步 pivot 旋转支撑不等式"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 95,
      "layout": "statement",
      "bullets": {
        "en": [
          "The direction vanishes on the chosen ridge.",
          "The first outside vertex to become tight fixes the step.",
          "All minimizing vertices, including ties, join the new tight set."
        ],
        "zh": [
          "方向在选定 ridge 上为零。",
          "第一个变紧的面外顶点决定步长。",
          "所有达到最小比值的顶点都进入新紧集，包括并列者。"
        ]
      },
      "notes": {
        "en": "Use the v0 minimizing convention. The slack is \\(I_F(v)-\\beta_C\\geq0\\). The child support \\(J\\) is nonnegative on \\(F\\) and vanishes on its ridge. Extend it so that some outside vertex has \\(J(v)<0\\). Increasing \\(t\\) preserves the ridge and consumes outside slack. The minimum slack-to-direction ratio is the largest valid step. The new tight face has dimension \\(D-1\\). Recenter the uniform behavior before comparing violation ratios.",
        "zh": "沿用 v0 的最小值约定，松弛量为 \\(I_F(v)-\\beta_C\\geq0\\)。子面支撑 \\(J\\) 在 \\(F\\) 上非负，在 ridge 上为零。延拓它，使至少一个面外顶点满足 \\(J(v)<0\\)。增大 \\(t\\) 保持 ridge，同时消耗面外松弛量。最小松弛比给出最大合法步长。新紧面的维数为 \\(D-1\\)。比较违反比值前，把均匀行为得分重新归零。"
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
      "subtitle": {
        "en": "A classical geometric step; the quantum value is evaluated afterwards",
        "zh": "经典几何步骤；量子值在之后单独计算"
      },
      "formula": "\\[\\begin{aligned}I_{\\mathrm{next}}&=I_F+t_*J\\geq\\beta_C,\\\\t_*&=\\min_{\\substack{v\\notin V_F\\\\J(v)<0}}\\frac{I_F(v)-\\beta_C}{-J(v)}.\\end{aligned}\\]"
    },
    {
      "id": "recursive-child",
      "title": {
        "en": "A difficult facet becomes a child polytope",
        "zh": "把困难 facet 变成子多面体"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 90,
      "layout": "split",
      "bullets": {
        "en": [
          "The tight vertices define a polytope of dimension one lower.",
          "Its facets are the parent facet’s ridges.",
          "The same expansion procedure can solve the child boundary."
        ],
        "zh": [
          "紧顶点定义一个低一维的子多面体。",
          "子多面体的 facets 正是母 facet 的 ridges。",
          "同一展开过程可以递归求解子边界。"
        ]
      },
      "notes": {
        "en": "Direct double description can solve a small facet boundary. For a large or degenerate facet it can remain unfinished. Treat \\(V_F\\) as a new vertex set and repeat the facet-expansion problem one dimension lower. A verified child facet supplies a parent ridge and a parent pivot. The recursion tree records completed branches and the open frontier.",
        "zh": "直接 DD 可以求解较小 facet 的边界，对大或高退化面则可能无法完成。把 \\(V_F\\) 作为新顶点集，在低一维空间重复 facet 展开。已验证子 facet 给出母 ridge 和母层 pivot。递归树记录已完成分支和开放前沿。"
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
      "formula": "\\[P_F=\\operatorname{conv}(V_F),\\qquad \\dim P_F=D-1\\]",
      "asset": "v0-recursion-tree.png",
      "assetAlt": {
        "en": "A difficult facet becomes a child polytope",
        "zh": "把困难 facet 变成子多面体"
      }
    },
    {
      "id": "recursive-workflow",
      "title": {
        "en": "The expansion preserves solved and unfinished tasks",
        "zh": "展开过程保留已解与未完成的任务"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 70,
      "layout": "wide",
      "bullets": {
        "en": [
          "Relabeling symmetry identifies equivalent facets.",
          "Direct DD handles small facets first.",
          "Unfinished facets enter recursion and keep their verified discoveries."
        ],
        "zh": [
          "重标记对称性识别等价 facets。",
          "先直接 DD 处理较小 facets。",
          "未完成的 facets 进入递归，并保留已验证的发现。"
        ]
      },
      "notes": {
        "en": "Canonicalization keeps one representative per global relabeling orbit. The facet stabilizer gives the child symmetry. The diagram separates pending DD, pending recursion, completed tasks and unresolved tasks at the depth limit \\(\\ell\\). A partial call returns verified discoveries without certifying its full boundary. Persistent tasks allow a later restart.",
        "zh": "规范化为每个全局重标记轨道保留一个代表；facet 的稳定子给出子问题对称性。图中区分待 DD、待递归、已完成，以及在深度限制 \\(\\ell\\) 下未解的任务。部分调用返回已验证发现，但不认证全边界。任务持久化支持后续重启。"
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
        "en": "A closed boundary certifies complete enumeration",
        "zh": "闭合边界认证完整枚举"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 65,
      "layout": "statement",
      "bullets": {
        "en": [
          "Every stored facet has a complete ridge list.",
          "Every exact ridge pivot returns a class already in the library.",
          "Connectedness of the facet graph then closes the whole polytope."
        ],
        "zh": [
          "库内每个 facet 都有完整 ridge 列表。",
          "每次精确 ridge pivot 都返回库内已有类别。",
          "Facet graph 的连通性由此保证全多面体闭合。"
        ]
      },
      "notes": {
        "en": "This is the recursive ridge-closure criterion. Exact support, dimension and boundary checks are required. A stable class count is only a search plateau. Completeness is stronger: no ridge from any known facet leads outside the stored set, and the facet graph is connected. The same argument applies recursively when a closed child supplies the parent boundary. We now test the method on a complete known benchmark.",
        "zh": "这是递归 ridge 闭合判据，需要精确支撑、维数和边界检查。类别数稳定只说明搜索进入平台。完整性要求更强：已知每个 facet 的所有 ridges 都不通向库外，而 facet graph 是连通的。当完整子问题给出母边界时，同一论证递归成立。现在用一个已有完整答案的小场景验证。"
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
      "subtitle": {
        "en": "Complete geometric benchmark",
        "zh": "完整的几何基准"
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
      "duration": 65,
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
        "en": "Use the v0 minimizing convention with \\(I(P_{\\mathrm{uni}})=0\\) and \\(\\beta_C<0\\). An attained see-saw value is an upper bound on the quantum minimum. Dividing by the negative classical bound makes \\(\\widehat\\Delta\\) a lower bound on the optimal ratio. Each facet optimizes its own state and measurements. This height does not impose a shared physical strategy.",
        "zh": "沿用 v0 的最小值约定，\\(I(P_{\\mathrm{uni}})=0\\)，\\(\\beta_C<0\\)。已实现 see-saw 值是量子最小值的上界；除以负经典界后，\\(\\widehat\\Delta\\) 成为最优比值的下界。每个 facet 分别优化自己的状态和测量，这个高度不要求共同物理策略。"
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
          "One- and two-body: all stored classes are covered at \\(T=40\\).",
          "Two- and four-body: all stored classes are covered at \\(T=58\\)."
        ],
        "zh": [
          "一、二体：在 \\(T=40\\) 时覆盖所有已存类别。",
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
      "subtitle": {
        "en": "Seed-and-neighbor coverage of the discovered library",
        "zh": "已发现库内的 seed 与邻居覆盖"
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
      "duration": 65,
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
          "Each distinct neighboring class contributes once to the mean.",
          "The full stored-sample rank correlations are \\(0.8689\\) and \\(0.8744\\)."
        ],
        "zh": [
          "邻居均值对每个不同类别只计一次。",
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
      "subtitle": {
        "en": "An empirical neighbor-mean trend in the v0 graph",
        "zh": "v0 图中的经验邻居均值趋势"
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
          "At each class, choose the neighbor with largest recorded ratio.",
          "Move only when the increase exceeds \\(10^{-9}\\).",
          "A class without an improving neighbor is a stopping class."
        ],
        "zh": [
          "每一步选择已记录比值最大的邻居。",
          "仅当改善超过 \\(10^{-9}\\) 时移动。",
          "没有改善邻居的类别称为停止类。"
        ]
      },
      "notes": {
        "en": "Remove self-loops and include classes with recorded \\(\\widehat\\Delta>1+10^{-9}\\). Choose the neighbor with the largest strictly improving recorded value, using improvement tolerance \\(10^{-9}\\). A stopping class has no such neighbor. This is an analysis of recorded heights, not a theorem that a geometric pivot must increase quantum violation.",
        "zh": "去掉自环，纳入记录值 \\(\\widehat\\Delta>1+10^{-9}\\) 的类别。选择最大且严格改善的邻居，改善容差为 \\(10^{-9}\\)。没有此类邻居的节点称为停止类。这是对记录高度的分析，不是“几何 pivot 必须提高量子违反”的定理。"
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
          "One stopping class and one basin in each analyzed data set.",
          "Four-party results use the discovered root-plus-patch graphs.",
          "Recorded ratios do not certify the ordering of exact quantum optima."
        ],
        "zh": [
          "每个分析数据集都有一个停止类和一个吸引域。",
          "四体结果使用已发现的 root 加 patch 图。",
          "记录比值不能认证精确量子最优值的排序。"
        ]
      },
      "notes": {
        "en": "All 44 included violating classes in the complete three-party graph reach Mermin in at most two pivots. In the one- and two-body projection, 97.0 percent of included classes reach lifted CHSH in exactly two pivots. In the two- and four-body projection the mean is 3.161 pivots and only one class needs six. The attractor is Mermin–Klyshko, with recorded ratio \\(2\\sqrt2\\). This is a one-basin result on discovered augmented graphs. Unknown facets, missing edges or improved quantum values can change the four-party result.",
        "zh": "完整三体图上，纳入的44个违反类至多两步到达 Mermin。一、二体投影中，97.0%的纳入类别恰好两步到达提升 CHSH。二、四体投影平均3.161步，只有一个类别需要六步，吸引子为记录比值 \\(2\\sqrt2\\) 的 Mermin–Klyshko。这是已发现增强图上的单吸引域结果。未知 facets、缺失边或更精确的量子值可能改变四体结论。"
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
      "subtitle": {
        "en": "Original v0 result: achieved values on the recorded graph",
        "zh": "v0 原结果：已记录图上的已实现值"
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
        "en": "What the original pivot work establishes",
        "zh": "原来的 pivot 工作建立了什么"
      },
      "section": {
        "en": "Original pivot work",
        "zh": "原来的 pivot 工作"
      },
      "duration": 70,
      "layout": "statement",
      "bullets": {
        "en": [
          "Recursive expansion explores the connected facet boundary.",
          "The three-party benchmark validates the geometric construction.",
          "The four-party libraries reveal empirical violation landscapes."
        ],
        "zh": [
          "递归展开探索连通的 facet 边界。",
          "三体基准验证几何构造。",
          "四体部分库展示经验量子违反 landscapes。"
        ]
      },
      "notes": {
        "en": "The original contribution is a restartable recursive exploration of the boundary together with its geometric checks and the landscape analysis. Pivoting is an established polytope operation. The observed one-basin structure is a result of the recorded Bell data, not a universal theorem. At this point the original manuscript story is complete. The following slides open a separate discussion about what the same library could say under a shared physical implementation.",
        "zh": "原工作给出可恢复的递归边界探索、相应几何检查及 landscape 分析。Pivot 是已有的多面体操作；单吸引域是这批记录 Bell 数据的观察，不是普遍定理。到这里，原稿主线已经完整。下面独立讨论：如果要求共同物理实现，同一个库还能告诉我们什么？"
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
      }
    },
    {
      "id": "shared-resource-question",
      "title": {
        "en": "Shared measurements introduce a resource question",
        "zh": "共同测量引入新的资源问题"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 50,
      "layout": "statement",
      "bullets": {
        "en": [
          "The original landscape optimizes each endpoint independently.",
          "A combined test uses one state and one measurement tuple.",
          "Can the combination certify genuine four-party entanglement?"
        ],
        "zh": [
          "原 landscape 对每个端点独立优化。",
          "组合检验使用一个状态和同一组测量。",
          "这样的组合能否认证真正四体纠缠？"
        ]
      },
      "notes": {
        "en": "This is a follow-up question, not the definition of pivoting. A neighboring pair is a geometrically valid candidate, but adjacency alone does not determine its entanglement requirement. Three-party examples help us understand shared-measurement compatibility. Here we ask the corresponding question directly in the original four-party library, and focus on one concrete certified family.",
        "zh": "这是后续问题，不是 pivot 的定义。邻接配对提供几何合法的候选，但邻接本身不决定纠缠资源需求。三体例子帮助理解共同测量的兼容性；这里把问题直接带回原四体库，集中看一个已有证书的具体家族。"
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
          "en": "A reciprocal parity-conditioned pair gives a concrete candidate.",
          "zh": "互相提供奇偶旗标的配对给出一个具体候选。"
        }
      },
      "formula": "\\[H_\\lambda=(1-\\lambda)f+\\lambda g,\\qquad 0\\leq\\lambda\\leq1\\]"
    },
    {
      "id": "four-resource-pair",
      "title": {
        "en": "A concrete pair comes from the four-party library",
        "zh": "一个具体配对来自原四体库"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 80,
      "layout": "statement",
      "bullets": {
        "en": [
          "The seed tests act on two complementary pairs, AB and CD.",
          "Each pair supplies the parity flag for the other test.",
          "Both endpoint maxima equal \\(2\\sqrt2-1\\), attainable biseparably."
        ],
        "zh": [
          "两个种子检验作用于互补的 AB 与 CD 配对。",
          "每对给另一对的检验提供奇偶旗标。",
          "两个端点最大值均为 \\(2\\sqrt2-1\\)，都能由双可分态达到。"
        ]
      },
      "notes": {
        "en": "Use \\(S_{AB}=A_0(B_0+B_1)+A_1(B_0-B_1)\\) and \\(P_-^{AB}=(I-A_0B_0)/2\\); \\(S_{CD}\\) has the same convention. The flag selects opposite parity. This discussion uses local upper bound one, instead of the landscape’s minimizing convention. Both endpoints belong to class 35 in the 40-dimensional projection. Their facets have dimension 39 and their shared ridge has dimension 38. These are two physical orientations of the same class. They are projection facets, not facets of the full 80-dimensional correlation space. The class is unclosed, but this specified ridge has an independent exact check.",
        "zh": "约定 \\(S_{AB}=A_0(B_0+B_1)+A_1(B_0-B_1)\\)，\\(P_-^{AB}=(I-A_0B_0)/2\\)，\\(S_{CD}\\) 采用同样约定。旗标选择相反奇偶性。本讨论使用局域上界为1的规范，区别于 landscape 的最小值约定。两个端点都属于40维投影的第35类，facet 维数39，共同 ridge 维数38。它们是同一类别的两个物理取向。这些是投影空间中的 facets，不是完整80维关联空间中的 facets。该类尚未闭合，但指定 ridge 已独立精确核验。"
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
          "en": "The combined score exceeds a bound valid for every biseparable cut.",
          "zh": "组合分数超过对所有双可分切分都成立的界。"
        }
      },
      "subtitle": {
        "en": "A verified ridge in the 40-dimensional even-correlator projection",
        "zh": "40维偶数阶关联投影中的已核验 ridge"
      },
      "formula": "\\[\\begin{aligned}f_-&=I+(S_{AB}-2I)P_-^{CD},\\\\g_-&=I+(S_{CD}-2I)P_-^{AB},\\\\P_-^{CD}&=(I-C_0D_0)/2.\\end{aligned}\\]"
    },
    {
      "id": "four-resource-gap",
      "title": {
        "en": "The combination certifies genuine four-party entanglement",
        "zh": "组合检验认证真正四体纠缠"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 80,
      "layout": "wide",
      "bullets": {
        "en": [
          "The green curve is the exact biseparable support.",
          "The blue line is one fixed physical strategy, a quantum lower bound."
        ],
        "zh": [
          "绿线是精确双可分支撑值。",
          "蓝线是一个固定物理策略，给出量子下界。"
        ]
      },
      "notes": {
        "en": "The exact biseparable curve holds for every \\(0\\leq\\lambda\\leq1\\). Its midpoint is \\(\\sqrt2\\). One four-qubit state with rational amplitude ratios and rational measurement directions attains \\(L=9690593/6654225>\\sqrt2\\). The same strategy certifies GME for \\(0.449189<\\lambda<0.550811\\). We have not proved global quantum optimality or found the maximal certifiable interval. This is GME certification, not genuine multipartite nonlocality.",
        "zh": "这条精确双可分曲线对全部 \\(0\\leq\\lambda\\leq1\\) 成立，中点为 \\(\\sqrt2\\)。一个具有有理振幅比的四量子比特态，配合有理测量方向，达到 \\(L=9690593/6654225>\\sqrt2\\)。同一策略在 \\(0.449189<\\lambda<0.550811\\) 内认证 GME。全局量子最优性及最大的可认证区间尚未解决。这里认证 GME，没有认证真正多体非局域性。"
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
          "en": "The aligned two-pair cut is the essential certification step.",
          "zh": "认证的关键是排除对齐的双对切分。"
        }
      },
      "subtitle": {
        "en": "A verified four-party example; quantum optimality remains open",
        "zh": "一个已核验四体例子；量子最优性仍待解决"
      },
      "formula": "\\[B(\\lambda)=1+2(\\sqrt2-1)\\max\\{\\lambda,1-\\lambda\\},\\qquad L\\approx1.456307>\\sqrt2\\]",
      "asset": "four-party-resource-bridge.png",
      "assetAlt": {
        "en": "The combination certifies genuine four-party entanglement",
        "zh": "组合检验认证真正四体纠缠"
      }
    },
    {
      "id": "four-all-cuts",
      "title": {
        "en": "The certificate covers all seven bipartitions",
        "zh": "证书覆盖全部七种二分切分"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 85,
      "layout": "statement",
      "bullets": {
        "en": [
          "Six cuts have direct analytic bounds.",
          "The aligned cut needs the joint CHSH and flag-probability constraint.",
          "Rational SDP certificates and an SOS identity validate the bound."
        ],
        "zh": [
          "六个切分具有直接解析界。",
          "对齐切分需要同时约束 CHSH 得分和旗标概率。",
          "有理 SDP 证书及平方和恒等式验证这个界。"
        ]
      },
      "notes": {
        "en": "Quantum biseparability is the convex hull of quantum product models across all seven cuts, so a linear bound for every cut also covers their mixtures. Four singleton cuts reduce to CHSH. Two crossed pair cuts have score at most one. The remaining cut \\(AB|CD\\) permits two Bell pairs. A nine-word NPA matrix constrains each block’s CHSH score jointly with its flag probability. Sixteen residual-corrected rational Gram certificates validate midpoint bounds for all four sign choices. For negative-negative parity, \\(q+(2/3)p_-\\leq5/3\\) has an exact SOS and yields the all-weight BS bound. A CHSH-maximizing Bell pair with a deterministic opposite block attains the larger-weight branch, making the bound exact. The seven cuts use six analytic bounds and one nontrivial SDP structure, not seven separate SDP solves.",
        "zh": "量子双可分模型是七种切分上量子乘积模型的凸包，因此逐切分的线性上界也覆盖切分混合。四个单方切分化为 CHSH，两个交叉双对切分的分数不超过1。剩余 \\(AB|CD\\) 切分允许两个 Bell 对。9词 NPA 矩阵联合约束每块的 CHSH 分数和旗标概率。16条残差修正有理 Gram 证书验证四种符号的中点界。负、负情况下，\\(q+(2/3)p_-\\leq5/3\\) 有精确平方和证明，导出全权重 BS 上界。CHSH 最优 Bell 对加另一个确定输出块达到较大权重分支，所以这个界是精确界。七个切分使用六个解析界和一个非平凡 SDP 结构，并非分别求解了七个 SDP。"
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
          "en": "Correctness and literature priority are separate questions.",
          "zh": "正确性与文献优先权是两个分别需要回答的问题。"
        }
      },
      "table": {
        "headers": {
          "en": [
            "Cuts",
            "Number",
            "Upper-bound method"
          ],
          "zh": [
            "切分",
            "数量",
            "上界方法"
          ]
        },
        "rows": {
          "en": [
            [
              "\\(1|3\\)",
              "4",
              "Deterministic singleton and CHSH"
            ],
            [
              "\\(AC|BD,\\ AD|BC\\)",
              "2",
              "Conditional product-state CHSH"
            ],
            [
              "\\(AB|CD\\)",
              "1",
              "NPA joint support, then exact SOS"
            ]
          ],
          "zh": [
            [
              "\\(1|3\\)",
              "4",
              "单方确定输出与 CHSH"
            ],
            [
              "\\(AC|BD,\\ AD|BC\\)",
              "2",
              "条件乘积态 CHSH"
            ],
            [
              "\\(AB|CD\\)",
              "1",
              "NPA 联合支撑，再用精确平方和"
            ]
          ]
        }
      }
    },
    {
      "id": "ideas-status",
      "title": {
        "en": "Verified result and provisional novelty assessment",
        "zh": "已核验结果与暂定新颖性判断"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 60,
      "layout": "statement",
      "bullets": {
        "en": [
          "Known ingredients include conditional CHSH lifting and GME aggregation.",
          "Verified here: this projected ridge, all-cut certificates, and sharp BS support.",
          "No direct match was found in the bounded audit; priority remains provisional."
        ],
        "zh": [
          "条件 CHSH 提升与条件见证组合认证 GME 已有先例。",
          "本例已核验：指定投影 ridge、全切分证书及精确 BS 支撑。",
          "有限检索未找到直接匹配；优先权判断仍为暂定。"
        ]
      },
      "notes": {
        "en": "The broader conditional-Bell mechanism is established in the literature, including Pironio, Curchod and collaborators, and Zhang and collaborators. The weighted-CHSH support tool is also known. The narrowly specified candidate combines same-orbit projected adjacency, reciprocal parity flags and an exact all-cut biseparable curve. The bounded source audit did not find that full combination, but this does not prove that nobody has obtained it. The next assessment must compare actual formulas, geometry and experimental cost. This discussion is not a claim of a new general principle.",
        "zh": "更广的条件 Bell 机制已有 Pironio、Curchod 等及 Zhang 等的工作；加权 CHSH 支撑工具也已知。本例的窄范围是同轨道投影邻接、互相提供奇偶旗标和全切分精确双可分曲线的结合。有限原始文献审计未找到这个完整组合，但不能据此证明从未有人得到过。接下来要逐公式比较几何结构和实验开销；这里不宣称发现了一个新普遍原理。"
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
          "en": "The next SDP target should follow the resource question.",
          "zh": "后续 SDP 目标应由明确的资源问题决定。"
        }
      }
    },
    {
      "id": "sdp-next",
      "title": {
        "en": "The next SDP task follows the four-party library",
        "zh": "后续 SDP 任务从四体库出发"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 65,
      "layout": "statement",
      "bullets": {
        "en": [
          "Retain the relative physical orientation of each candidate pair.",
          "Compare an attained quantum value with valid bounds for every cut.",
          "Extend to pairs without a simple factorized analytic certificate."
        ],
        "zh": [
          "保存每个候选配对的相对物理取向。",
          "把可实现量子值与每个切分的有效上界比较。",
          "扩展到没有简单因子化解析证书的配对。"
        ]
      },
      "notes": {
        "en": "The original pivot library provides candidates and verified geometric relations. SDP is the subsequent certification tool. For each target we need a physical lower strategy and valid upper bounds for the resource set we exclude. The present example is a reproducible starting point, not a completed general search. PI and SDPBell methods can reduce a future SDP only when the target and its variables retain that symmetry. Quantum optimality, a wider oriented-pair survey, and a fair comparison to existing conditional GME witnesses remain open.",
        "zh": "原 pivot 库提供候选及经验证的几何关系，SDP 则是后续认证工具。每个目标都需要物理下界策略，以及对待排除资源集合成立的上界。当前例子是可复算的起点，不是已完成的一般搜索。只有目标和变量保留相应对称性时，PI 与 SDPBell 方法才可用于缩减后续 SDP。量子最优性、更广的有取向配对筛选、以及与已有条件 GME 见证的公平比较仍是开放问题。"
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
          "en": "Discussion: which of these research questions should we prioritize?",
          "zh": "讨论：接下来优先解决哪个研究问题？"
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
        "en": "Projected adjacency and full-space adjacency differ",
        "zh": "投影邻接与全空间邻接不同"
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
        "en": "The aligned cut admits an exact support certificate",
        "zh": "对齐切分具有精确支撑证书"
      },
      "section": {
        "en": "Discussion: ideas under assessment",
        "zh": "讨论：正在评估的新方向"
      },
      "duration": 0,
      "layout": "statement",
      "bullets": {
        "en": [
          "Here \\(q=\\langle S\\rangle/2\\) and \\(p_-=(1-\\langle X_0Y_0\\rangle)/2\\).",
          "The Gram factorization has zero residual.",
          "The two-party support inequality is an established weighted-CHSH threshold."
        ],
        "zh": [
          "这里 \\(q=\\langle S\\rangle/2\\)，\\(p_-=(1-\\langle X_0Y_0\\rangle)/2\\)。",
          "Gram 分解的残差为零。",
          "这条二方支撑式对应已知的加权 CHSH 阈值。"
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
      "formula": "\\[\\frac53-\\left(q+\\frac23p_-\\right)=\\frac{(2X_0-Y_0-3Y_1)^2}{24}+\\frac{(2X_1-Y_0+Y_1)^2}{8}\\succeq0\\]"
    },
    {
      "id": "r5-family",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "R5 has a strict resource gap at every interior weight",
        "zh": "R5 在所有内部权重上都有严格资源间隙"
      },
      "duration": 0,
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
        "en": "The exact maximum identifies a weighted W state",
        "zh": "精确最大值确定一个加权 W 态"
      },
      "duration": 0,
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
      "subtitle": {
        "en": "One scalar score, at each fixed interior weight; midpoint behavior known from Wu et al.",
        "zh": "每个固定内部权重只用一个标量得分；中点行为已见于 Wu 等"
      },
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
        "en": "Finite deficits already admit sufficient R5 certificates",
        "zh": "有限亏损已有 R5 充分证书"
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
      },
      "phase": "discussion"
    },
    {
      "id": "hecke-sdp",
      "section": {
        "en": "Further ideas: technical backup",
        "zh": "其他 ideas：技术备份"
      },
      "title": {
        "en": "Many-body symmetry can keep SDP blocks small",
        "zh": "多体对称性可以保持 SDP 块规模较小"
      },
      "duration": 0,
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
      },
      "phase": "discussion"
    }
  ],
  "storyline": {
    "en": "23 minutes: original v0 method, benchmark, four-party libraries and violation landscapes. 7 minutes: a separately marked discussion of a certified resource example and open SDP questions.",
    "zh": "前23分钟：v0 方法、基准验证、四体部分库与违反 landscapes。后7分钟：明确分开的讨论段，展示资源认证例子与开放 SDP 问题。"
  }
};
