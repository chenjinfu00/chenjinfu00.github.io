/* Research talk for 17 October 2026. Sources and status are included in each slide. */
window.REPORT = {
  "profile": {
    "name": {
      "zh": "陈劲夫",
      "en": "Jin-Fu Chen"
    },
    "subtitle": {
      "zh": "制备 · 涨落 · 优化",
      "en": "Preparation · Fluctuations · Optimization"
    },
    "homepage": "https://chenjinfu00.github.io/",
    "scholar": "https://scholar.google.ca/citations?user=2n7U598AAAAJ&hl=en"
  },
  "slides": [
    {
      "id": "opening",
      "section": {
        "zh": "背景与经历",
        "en": "Background"
      },
      "minutes": 0.5,
      "title": {
        "zh": "量子与非平衡系统的\n制备、涨落与优化",
        "en": "Quantum and nonequilibrium dynamics:\npreparation, fluctuations and optimization"
      },
      "kicker": {
        "zh": "陈劲夫 · 科研报告 · 2026.10.17",
        "en": "Jin-Fu Chen · Research talk · 17 October 2026"
      },
      "html": {
        "zh": "<div class=\"cover-line\">量子多体态 · 随机热力学 · 有限时间控制</div><div class=\"cover-signature\"><strong>陈劲夫 <span>Jin-Fu Chen</span></strong><p>荷兰莱顿大学 · Lorentz 理论物理研究所</p></div><div class=\"pathway\"><span>多体态制备与认证</span><span>随机热力学</span><span>量子热机与控制</span></div>",
        "en": "<div class=\"cover-line\">Quantum states · Stochastic thermodynamics · Finite-time control</div><div class=\"cover-signature\"><strong>Jin-Fu Chen <span>陈劲夫</span></strong><p>Leiden University · Lorentz Institute for Theoretical Physics</p></div><div class=\"pathway\"><span>Preparation & certification</span><span>Stochastic thermodynamics</span><span>Quantum engines & control</span></div>"
      },
      "notes": {
        "zh": "各位老师好，我是陈劲夫，目前在莱顿大学从事博士后研究。今天重点介绍已完成的研究，沿三条相互关联的主线来组织：量子多体态的制备与认证、随机热力学与非平衡过程，以及量子热力学与热机控制。它们共同追问的是，怎样把一个受物理约束的过程变成可设计、可优化、可检验的问题。最后用两页简要介绍未来展望。",
        "en": "Thank you for the opportunity to present my work. I am Jin-Fu Chen, a postdoctoral researcher at Leiden University. I will focus on completed research in three connected lines: many-body state preparation and certification, stochastic thermodynamics and nonequilibrium processes, and quantum thermodynamics and engine control. Their common question is how to design, optimize and verify dynamics under physical constraints. I will end with two slides of outlook."
      },
      "sources": [
        {
          "label": {
            "zh": "个人主页",
            "en": "Homepage"
          },
          "url": "https://chenjinfu00.github.io/"
        }
      ],
      "backup": false
    },
    {
      "id": "agenda",
      "section": {
        "zh": "背景与经历",
        "en": "Background"
      },
      "minutes": 0.5,
      "title": {
        "zh": "三条研究线，一个共同问题",
        "en": "Three research lines, one common question"
      },
      "kicker": {
        "zh": "过去成果 31 分钟 · 未来仅两页",
        "en": "31 minutes on research · two slides on future work"
      },
      "html": {
        "zh": "<div class=\"jt-lines\"><article class=\"jt-line\"><span class=\"jt-line-number\">01</span><h3>量子多体态的<br>制备与认证</h3><p class=\"jt-line-question\">怎样更快得到并检验目标态？</p><p class=\"jt-line-tools\">耗散、谱隙与量子关联</p><div class=\"jt-line-output\">已发表：PRL / PRB<br>预印本：Bell / NITE</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">02</span><h3>随机热力学与<br>非平衡过程</h3><p class=\"jt-line-question\">怎样定义过程的涨落与代价？</p><p class=\"jt-line-tools\">轨道概率、协变性与有限时间</p><div class=\"jt-line-output\">联合统计 · 协变涨落<br>有限时间相变</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">03</span><h3>量子热力学与<br>热机中的量子优势</h3><p class=\"jt-line-question\">怎样把量子效应变成性能？</p><p class=\"jt-line-tools\">工质、非绝热损耗与几何控制</p><div class=\"jt-line-output\">已发表：量子热机<br>独著：量子几何 / 布朗热机</div></article></div>",
        "en": "<div class=\"jt-lines\"><article class=\"jt-line\"><span class=\"jt-line-number\">01</span><h3>Many-body preparation<br>and certification</h3><p class=\"jt-line-question\">How can we prepare and verify target states?</p><p class=\"jt-line-tools\">Dissipation, gaps and correlations</p><div class=\"jt-line-output\">Published: PRL / PRB<br>Preprints: Bell / NITE</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">02</span><h3>Stochastic thermodynamics<br>and nonequilibrium processes</h3><p class=\"jt-line-question\">How do we define fluctuations and costs?</p><p class=\"jt-line-tools\">Trajectories, covariance and finite time</p><div class=\"jt-line-output\">Joint statistics and covariant relations<br>Finite-time transitions</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">03</span><h3>Quantum thermodynamics<br>and engine advantage</h3><p class=\"jt-line-question\">How do quantum effects affect performance?</p><p class=\"jt-line-tools\">Working media and geometric control</p><div class=\"jt-line-output\">Published engine research<br>Sole-author control papers</div></article></div>"
      },
      "notes": {
        "zh": "这里将已完成的工作组织成三条相互关联的研究线。第一条从制备动力学到关联认证；第二条从功热统计到一致的复杂过程描述；第三条从量子热机性能到独立构造的最优控制。各部分都先讲问题和方法，再讲系列结果。报告安排是经历四分钟、研究成果三十一分钟、未来四分钟和最后一分钟收束。",
        "en": "I organize the completed work in three connected scientific progressions. The first connects preparation dynamics with certification. The second develops consistent descriptions of fluctuating processes. The third connects engine performance with independently developed control methods. The timing is four minutes of background, thirty-one minutes of research, four minutes of future work and one minute to close. "
      },
      "sources": [
        {
          "label": {
            "zh": "个人主页",
            "en": "Homepage"
          },
          "url": "https://chenjinfu00.github.io/"
        }
      ],
      "backup": false
    },
    {
      "id": "timeline",
      "section": {
        "zh": "背景与经历",
        "en": "Background"
      },
      "minutes": 1.5,
      "title": {
        "zh": "一条持续发展的研究路径",
        "en": "A developing research trajectory"
      },
      "kicker": {
        "zh": "教育与研究经历",
        "en": "Education & research trajectory"
      },
      "html": {
        "zh": "<div class=\"timeline\"><article class=\"card\"><h3>2012—2016 · 北京大学</h3><p>物理学学士、数学双学位</p></article><article class=\"card\"><h3>2016—2021 · 中国工程物理研究院</h3><p>物理学博士；北京计算科学研究中心开展研究<br>导师：孙昌璞</p></article><article class=\"card\"><h3>2021.07—2024.02 · 北京大学</h3><p>物理学院博士后；合作导师：全海涛</p></article><article class=\"card\"><h3>2024.02—至今 · 莱顿大学</h3><p>Lorentz 理论物理研究所博士后<br>合作导师：Jordi Tura</p></article></div>",
        "en": "<div class=\"timeline\"><article class=\"card\"><h3>2012–2016 · Peking University</h3><p>B.S. in Physics; double degree in Mathematics</p></article><article class=\"card\"><h3>2016–2021 · China Academy of Engineering Physics</h3><p>Ph.D. in Physics; research at Beijing Computational Science Research Center<br>Supervisor: C. P. Sun</p></article><article class=\"card\"><h3>Jul 2021–Feb 2024 · Peking University</h3><p>Postdoctoral researcher, School of Physics<br>Collaborator: H. T. Quan</p></article><article class=\"card\"><h3>Feb 2024–present · Leiden University</h3><p>Postdoctoral researcher, Lorentz Institute<br>Collaborator: Jordi Tura</p></article></div>"
      },
      "notes": {
        "zh": "我在北京大学完成物理学本科和数学双学位学习。博士阶段在中国工程物理研究院培养、北京计算科学研究中心开展研究，导师是孙昌璞老师，主要研究量子热力学、有限时间过程与热力学几何。之后在北京大学与全海涛老师合作，进一步研究随机热力学、涨落关系和最优控制。从二〇二四年二月起，我在莱顿与 Jordi Tura 合作，把动力学优化问题拓展到量子多体热化、张量网络与量子信息。这些阶段在研究对象上有所扩展，但一直围绕有限时间、代价界和可控性展开。 这条经历线也解释了研究问题的连续性：早期关注量子热机和有限时间损耗，随后推进到随机轨道与控制，近年发展为多体态制备、认证和量子优化。接下来我先用很短的一页说明代表成果的署名与状态，再进入科学问题。",
        "en": "My undergraduate training in physics and mathematics was at Peking University. During my Ph.D. at CAEP, with research at the Beijing Computational Science Research Center under C. P. Sun, I worked on quantum thermodynamics and finite-time processes. At Peking University with H. T. Quan, I extended this work to stochastic thermodynamics, fluctuation relations and optimal control. Since February 2024, my work with Jordi Tura in Leiden has expanded to many-body thermalization, tensor networks and quantum information. The common thread is the cost and controllability of finite-time dynamics. This trajectory explains the continuity: quantum engines and finite-time costs led to stochastic trajectories and control, then to many-body preparation, certification and quantum optimization. I will briefly clarify authorship and status before discussing the science."
      },
      "sources": [
        {
          "label": {
            "zh": "个人主页",
            "en": "Homepage"
          },
          "url": "https://chenjinfu00.github.io/"
        }
      ],
      "backup": false
    },
    {
      "id": "profile",
      "section": {
        "zh": "背景与经历",
        "en": "Background"
      },
      "minutes": 1,
      "title": {
        "zh": "代表成果：水平、独立性与发展性",
        "en": "Research level, independence and development"
      },
      "kicker": {
        "zh": "34 篇已发表 · 2026 年 8 月 CV 口径",
        "en": "34 published articles · August 2026 CV"
      },
      "html": {
        "zh": "<div class=\"jt-evidence\"><article class=\"jt-proof jt-proof--level\"><span class=\"jt-proof-label\">代表水平</span><div class=\"jt-proof-value\">3 / 5</div><p class=\"jt-proof-detail\">5 篇 PRL 中，3 篇共同通讯</p><p class=\"jt-proof-subline\">态制备 · 协变涨落 · 有限时间相变</p></article><article class=\"jt-proof jt-proof--independence\"><span class=\"jt-proof-label\">代表独立性</span><div class=\"jt-proof-value\">2</div><p class=\"jt-proof-detail\">两篇已发表独著</p><p class=\"jt-proof-subline\">量子几何与布朗热机的独立控制工作</p></article><article class=\"jt-proof jt-proof--growth\"><span class=\"jt-proof-label\">代表发展性</span><div class=\"jt-proof-value\">5</div><p class=\"jt-proof-detail\">简历列示的公开预印本</p><p class=\"jt-proof-subline\">Bell 系列 · 一致性理论 · 量子优化</p></article></div><p class=\"jt-section-note\">项目经历：2022 年理论物理专款博士后项目 12147157 · 受驱动开放系统的非平衡热力学。</p>",
        "en": "<div class=\"jt-evidence\"><article class=\"jt-proof jt-proof--level\"><span class=\"jt-proof-label\">Research level</span><div class=\"jt-proof-value\">3 / 5</div><p class=\"jt-proof-detail\">Co-corresponding on three of five PRLs</p><p class=\"jt-proof-subline\">State preparation · covariant fluctuations · phase transitions</p></article><article class=\"jt-proof jt-proof--independence\"><span class=\"jt-proof-label\">Independence</span><div class=\"jt-proof-value\">2</div><p class=\"jt-proof-detail\">Published sole-author papers</p><p class=\"jt-proof-subline\">Quantum geometry and Brownian engine control</p></article><article class=\"jt-proof jt-proof--growth\"><span class=\"jt-proof-label\">Development</span><div class=\"jt-proof-value\">5</div><p class=\"jt-proof-detail\">Public preprints in the CV</p><p class=\"jt-proof-subline\">Bell series · consistent dynamics · quantum optimization</p></article></div><p class=\"jt-section-note\">Project experience: NSFC postdoctoral theoretical-physics project No. 12147157 (2022), nonequilibrium thermodynamics of driven open systems.</p>"
      },
      "notes": {
        "zh": "这些数字只提供背景，后面要用科学内容来支撑。五篇 PRL 中，二〇二五年的态制备、协变涨落和有限时间相变三篇，我担任共同通讯作者。两篇已经发表的独著分别研究动力学量子几何和布朗热机最优控制，体现独立完成研究的经历。五篇预印本用于说明研究仍在发展，其中两篇 Bell 工作属于同一系列并有内容重叠，不把它们包装为五个独立方向。已发表总数按八月简历口径列示。项目编号保留为经历，不在职责尚未核对时写成主持。",
        "en": "These counts are context; the following results provide the substance. Of five PRLs, I was a co-corresponding author on the three 2025 papers about state preparation, covariant fluctuations and finite-time transitions. Two published sole-author papers demonstrate independent work in dynamical quantum geometry and Brownian engine control. The five preprints show continuing development. The two Bell manuscripts belong to one partly overlapping series, rather than five independent directions. The published total follows the August CV. I list the verified project experience without assigning an unverified PI role."
      },
      "sources": [
        {
          "label": "PRL 135, 090602 (2025)",
          "url": "https://doi.org/10.1103/cslt-x32n"
        },
        {
          "label": "PRL 134, 237102 (2025)",
          "url": "https://doi.org/10.1103/xlmq-g6m5"
        },
        {
          "label": "PRL 134, 177101 (2025)",
          "url": "https://doi.org/10.1103/PhysRevLett.134.177101"
        }
      ],
      "backup": false
    },
    {
      "id": "question",
      "section": {
        "zh": "背景与经历",
        "en": "Background"
      },
      "minutes": 0.5,
      "title": {
        "zh": "怎样把物理过程变成可设计的问题？",
        "en": "How can physical processes become design problems?"
      },
      "kicker": {
        "zh": "共同主线：目标—限制—动力学—检验",
        "en": "Common thread: target, constraints, dynamics, verification"
      },
      "html": {
        "zh": "<div class=\"pathway\"><span>明确目标与约束</span><span>识别速度或代价限制</span><span>构造更好的动力学</span><span>给出可检验的结果</span></div><div class=\"cols-3\"><article class=\"card\"><h3>制备</h3><p>目标态不变，改变生成元或母哈密顿量。</p></article><article class=\"card\"><h3>涨落</h3><p>保留足够的统计量，建立一致的过程描述。</p></article><article class=\"card\"><h3>热机</h3><p>从损耗机制出发，寻找可达的最优协议。</p></article></div>",
        "en": "<div class=\"pathway\"><span>Specify target & constraints</span><span>Identify limits</span><span>Design better dynamics</span><span>Verify the result</span></div><div class=\"cols-3\"><article class=\"card\"><h3>Preparation</h3><p>Keep the target, change the generator or parent Hamiltonian.</p></article><article class=\"card\"><h3>Fluctuations</h3><p>Retain the statistics required for a consistent process description.</p></article><article class=\"card\"><h3>Engines</h3><p>Identify loss mechanisms and construct attainable protocols.</p></article></div>"
      },
      "notes": {
        "zh": "贯穿这些工作的不是某一个具体模型，而是一个分析方式：先固定目标和允许的资源，再识别限制过程的物理量，最后设计动力学并检验改进是否成立。不同方向分别使用谱结构、轨道概率和几何度量。下面先从最直接的量子多体问题开始：目标态已经给定，制备过程是否还能更快？",
        "en": "The common thread is an approach rather than a single model: specify the target and allowed resources, identify the limiting quantity, design the dynamics and verify the improvement. The three lines use spectral structure, trajectory probabilities and geometry. I will begin with the many-body question: can preparation be faster while keeping the same target state?"
      },
      "sources": [],
      "backup": false
    },
    {
      "id": "manybody-line",
      "section": {
        "zh": "多体制备与认证",
        "en": "State preparation"
      },
      "minutes": 1,
      "title": {
        "zh": "目标态固定，制备与认证共同优化",
        "en": "Optimize preparation and certification at a fixed target"
      },
      "kicker": {
        "zh": "研究线一 · 量子多体态的制备与认证",
        "en": "Line 1 · Many-body preparation and certification"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>制备：怎样更快？</h3><p>热态：优化耗散生成元<br>纯态：优化母哈密顿量谱隙</p></article><article class=\"card\"><h3>认证：怎样可信？</h3><p>优化 Bell 检验的抗噪能力<br>用低阶关联与半定规划建立证书</p></article></div><div class=\"pathway\"><span>保持目标</span><span>优化动力学或检验</span><span>检验速度与可信度</span></div><div class=\"jt-badges\"><span class=\"jt-badge\">已发表：PRB / PRL</span><span class=\"jt-badge jt-badge--growth\">发展：Bell / NITE 预印本</span></div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Preparation: how can it be faster?</h3><p>Thermal states: optimize the dissipative generator<br>Pure states: optimize parent-Hamiltonian gaps</p></article><article class=\"card\"><h3>Certification: how can it be reliable?</h3><p>Optimize noise-robust Bell tests<br>Use low-order correlations and SDP certificates</p></article></div><div class=\"pathway\"><span>Keep the target</span><span>Optimize dynamics or tests</span><span>Check speed & reliability</span></div><div class=\"jt-badges\"><span class=\"jt-badge\">Published: PRB / PRL</span><span class=\"jt-badge jt-badge--growth\">Development: Bell / NITE preprints</span></div>"
      },
      "notes": {
        "zh": "第一条研究线把制备与认证放在一起。一个多体态要成为可用资源，首先要能够制备，其次要能够检验。制备部分的共同思想是保持目标态，但利用动力学的不唯一性来加快过程：对热态改变耗散生成元，对纯态改变母哈密顿量。认证部分则优化检验本身，使量子关联更容易被可靠识别。接下来的几页依次说明这个设计思想、已发表结果和正在发展的量子优化工作。",
        "en": "A many-body state must be prepared and verified before it becomes a useful resource. The shared preparation idea is to keep the target while exploiting freedom in its dynamics: dissipative generators for thermal states and parent Hamiltonians for pure states. Certification instead optimizes the test so that quantum correlations can be identified more robustly. I will trace this progression through published results and current quantum-optimization preprints."
      },
      "sources": [
        {
          "label": "PRB 113, 184313 (2026)",
          "url": "https://doi.org/10.1103/r43j-qfj5"
        },
        {
          "label": "PRL 135, 090602 (2025)",
          "url": "https://doi.org/10.1103/cslt-x32n"
        },
        {
          "label": "arXiv:2511.07523 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2511.07523"
        }
      ],
      "backup": false
    },
    {
      "id": "thermalization-framework",
      "section": {
        "zh": "多体制备与认证",
        "en": "State preparation"
      },
      "minutes": 1.5,
      "title": {
        "zh": "固定热态，把动力学变成设计变量",
        "en": "Keep the thermal state and design the dynamics"
      },
      "kicker": {
        "zh": "已发表 · PRB 2026 · 第一作者、共同通讯",
        "en": "Published · PRB 2026 · First & co-corresponding"
      },
      "html": {
        "zh": "<div class=\"pathway\"><span>一致性构造</span><span>对称性降维</span><span>张量网络</span><span>梯度优化</span></div><div class=\"cols\"><article class=\"card\"><h3>理论框架</h3><p>构造以目标 Gibbs 态为稳态的 Lindbladian<br>利用对称性减少优化复杂度</p></article><article class=\"card\"><h3>规模与验证</h3><p>张量网络处理更大系统<br>谱隙下界与变分上界辅助验证<br>覆盖经典与量子多体模型</p></article></div><div class=\"callout\">我的贡献：核心理论框架、优化方法与主要结果；第一作者、共同通讯作者。</div>",
        "en": "<div class=\"pathway\"><span>Consistent construction</span><span>Symmetry reduction</span><span>Tensor networks</span><span>Gradient optimization</span></div><div class=\"cols\"><article class=\"card\"><h3>Theory</h3><p>Construct Lindbladians with the target Gibbs state as stationary state<br>Reduce complexity using symmetry</p></article><article class=\"card\"><h3>Scale & verification</h3><p>Use tensor networks for larger systems<br>Certified lower and variational upper gap bounds<br>Classical and quantum many-body models</p></article></div><div class=\"callout\">My contribution: core framework, optimization method and principal results; first and co-corresponding author.</div>"
      },
      "notes": {
        "zh": "这项二〇二六年正式发表于 PRB 的工作，可以分成四个步骤。首先构造保持目标热态的 Lindbladian，保证目标与动力学是一致的；其次利用对称性减少自由参数和计算维数；第三引入张量网络，超越只做小尺寸精确对角化的范围；最后通过梯度方法优化谱隙。对于较大系统，我们结合可验证的下界与变分上界判断谱隙，而不是只依赖一次数值优化的输出。我的贡献集中在核心理论框架、优化方法与主要结果，担任第一作者和共同通讯作者。报告时应强调这是结构设计加数值验证相结合的工作，并说明不同模型采用的约束。 这里的统一设计思想是“目标不变、动力学可变”。这与稍后优化母哈密顿量是一致的；区别在于此处研究开放系统的弛豫。合作涉及 Jordi Tura、Patrick Emonts、Maciej Lewenstein 等多体与量子信息研究者。下一页用原论文图说明实际改善。",
        "en": "The 2026 PRB combines four ingredients. We first construct Lindbladians that preserve the target Gibbs state, then use symmetry to reduce parameters and dimension. Tensor networks extend the analysis beyond small-system exact diagonalization, and gradient optimization improves the gap. For larger systems, certified lower and variational upper bounds support validation instead of relying solely on an optimizer output. My contributions were the core theoretical framework, optimization method and principal results, as first and co-corresponding author. The constraints are model-specific and should be stated when discussing particular examples. The unifying principle is a fixed target with variable dynamics. The later parent-Hamiltonian work uses the same design freedom for a different process. Collaborators include Jordi Tura, Patrick Emonts and Maciej Lewenstein. The next slide shows the original numerical result."
      },
      "sources": [
        {
          "label": "PRB 113, 184313 (2026)",
          "url": "https://doi.org/10.1103/r43j-qfj5"
        }
      ],
      "backup": false
    },
    {
      "id": "gap-principle",
      "section": {
        "zh": "多体制备与认证",
        "en": "State preparation"
      },
      "minutes": 2.5,
      "title": {
        "zh": "设计自由度能带来可检验的谱隙提升",
        "en": "Design freedom produces a testable gap improvement"
      },
      "kicker": {
        "zh": "已发表 · 经典多体基准，连接量子热态制备",
        "en": "Published · Classical benchmark for a quantum preparation framework"
      },
      "html": {
        "zh": "<div class=\"cols\"><div class=\"result-summary\"><h3>低温区的慢模态得到改善</h3><p>横轴 βJ：逆温度 × 耦合强度<br>纵轴 NΔ：归一化谱隙（对数）</p><p>曲线：N = 10 精确对角化<br>符号：N = 40，DMRG<br>插图：SDP 认证结果</p><div class=\"callout\">蓝：单自旋翻转；橙：单 + 双翻转。<br>实线/实心为优化；虚线/空心为基准。</div></div><figure class=\"paper-figure\"><img src=\"assets/thermalization-result.png\" alt=\"作者版图1(b)：kinetic Ising模型谱隙随逆温度变化，比较基准和优化动力学\"><figcaption>作者版原图 1(b) · arXiv:2411.03420v2。<br>谱隙以外，还需检查有限时间收敛与资源约束。</figcaption></figure></div><div class=\"jt-badges\"><span class=\"jt-badge\">第一作者、共同通讯 · PRB 2026</span></div>",
        "en": "<div class=\"cols\"><div class=\"result-summary\"><h3>Improved slow modes at low temperature</h3><p>Horizontal: βJ, inverse temperature × coupling<br>Vertical: NΔ, normalized gap (log scale)</p><p>Lines: N = 10 exact diagonalization<br>Symbols: N = 40 DMRG<br>Inset: SDP-certified results</p><div class=\"callout\">Blue: single flips; orange: single + double flips.<br>Solid/filled: optimized; dashed/open: baseline.</div></div><figure class=\"paper-figure\"><img src=\"assets/thermalization-result.png\" alt=\"Author-version Figure 1(b): kinetic Ising gap versus inverse temperature, baseline and optimized dynamics\"><figcaption>Original author-version Fig. 1(b) · arXiv:2411.03420v2.<br>Also check finite-time convergence and resource constraints.</figcaption></figure></div><div class=\"jt-badges\"><span class=\"jt-badge\">First & co-corresponding · PRB 2026</span></div>"
      },
      "notes": {
        "zh": "谱隙刻画渐近慢模态，因此是一个自然的动力学优化目标。这里展示原论文的经典一维 kinetic Ising 结果：横轴是逆温度与耦合的乘积，纵轴是归一化谱隙。蓝色表示单自旋翻转，橙色允许单双翻转；同色实线实心为优化结果，虚线空心为基准。低温区的改善更明显。小尺寸精确对角化、较大尺寸 DMRG 与插图中的 SDP 认证相互支持。完整制备速度还要同时指定初态、误差和生成元资源，并检验有限时间收敛。回到本节主线，改变允许的通道和速率，能够在目标平衡态保持不变时改善慢模态。下面把这一设计思想推进到绝热纯态制备。",
        "en": "The gap characterizes asymptotically slow modes and is a natural design target. This original figure shows the classical one-dimensional kinetic Ising model: inverse temperature times coupling horizontally, normalized gap vertically. Blue denotes single-spin flips; orange allows single and double flips. Within each color, solid lines and filled symbols are optimized, while dashed lines and open symbols are baseline. The improvement is stronger at low temperature. Small-system exact diagonalization, larger-system DMRG and the SDP certificate in the inset support the result. Preparation speed also requires an initial state, error criterion, fixed generator resources and finite-time convergence checks. The common idea is to change allowed channels and rates while preserving the equilibrium target. I now extend it to adiabatic pure-state preparation."
      },
      "sources": [
        {
          "label": "PRB 113, 184313 (2026)",
          "url": "https://doi.org/10.1103/r43j-qfj5"
        },
        {
          "label": "原图 / Original figure · arXiv:2411.03420v2",
          "url": "https://arxiv.org/abs/2411.03420v2"
        }
      ],
      "backup": false
    },
    {
      "id": "adiabatic",
      "section": {
        "zh": "多体制备与认证",
        "en": "State preparation"
      },
      "minutes": 2.5,
      "title": {
        "zh": "保持目标纯态，改善绝热制备的瓶颈",
        "en": "Keep the target state and improve the adiabatic bottleneck"
      },
      "kicker": {
        "zh": "代表 PRL ① · 2025 · 共同通讯作者",
        "en": "Representative PRL 1 · 2025 · Co-corresponding"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>封闭系统中的对应问题</h3><p>目标张量网络态固定<br>利用母哈密顿量的非唯一性<br>优化绝热路径的能隙</p></article><article class=\"card\"><h3>研究结果与积累</h3><p>在随机一维张量网络态、AKLT 与 GHZ 等例子中研究<br>连接量子几何、哈密顿量设计与态制备</p></article></div><div class=\"callout\">我的贡献：参与能隙优化思路、理论分析与研究设计；共同通讯作者。</div><p class=\"caption\">相关独著：PRR 4, 023252 (2022)，以动力学量子几何张量研究绝热过程加速。</p><p class=\"jt-collab-inline\">合作：K. S. Rai · Patrick Emonts · Jordi Tura</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Closed-system counterpart</h3><p>Fix a target tensor-network state<br>Exploit nonunique parent Hamiltonians<br>Optimize the gap along the adiabatic path</p></article><article class=\"card\"><h3>Results & foundations</h3><p>Examples include random 1D tensor-network states, AKLT and GHZ<br>Connect quantum geometry, Hamiltonian design and preparation</p></article></div><div class=\"callout\">My contribution: gap-optimization concept, theoretical analysis and research design; co-corresponding author.</div><p class=\"caption\">Related sole-author work: PRR 4, 023252 (2022), dynamical quantum geometric tensors for faster adiabatic processes.</p><p class=\"jt-collab-inline\">With K. S. Rai, Patrick Emonts and Jordi Tura</p>"
      },
      "notes": {
        "zh": "固定目标但优化动力学的思路不只适用于开放系统。在封闭系统里，一个目标张量网络态可以对应多个母哈密顿量。我们利用这种自由度，在保持目标态的条件下优化绝热制备路径的能隙，研究了随机一维张量网络态、AKLT 和 GHZ 等例子。我参与优化概念、理论分析和研究设计，是共同通讯作者。它也与我二〇二二年独著的动力学量子几何张量工作相接：前者强调目标态约束下的哈密顿量自由度，后者从动力学几何出发设计加速。两类结果共同构成我在量子控制与制备方面的方法积累。 与前面热化结果合在一起看，制备优化对象由开放系统生成元延伸到了闭系统母哈密顿量。两项工作都不是简单改变目标态来换取速度，而是在保持目标条件下使用可控自由度。这是这一系列工作的系统性。",
        "en": "The same idea extends to closed systems. A target tensor-network state can admit multiple parent Hamiltonians. We exploit that freedom to optimize the gap along an adiabatic preparation path while preserving the target state, studying random 1D tensor-network states, AKLT and GHZ examples. I contributed to the optimization concept, theory and research design as a co-corresponding author. This connects with my sole-author 2022 work on dynamical quantum geometric tensors, although the two approaches use different optimization freedoms. Together with the thermalization result, this extends the design variable from an open-system generator to a closed-system parent Hamiltonian. Both use controllable freedom while retaining the target. That connection is the central progression of the preparation work."
      },
      "sources": [
        {
          "label": "PRL 135, 090602 (2025)",
          "url": "https://doi.org/10.1103/cslt-x32n"
        },
        {
          "label": "PRR 4, 023252 (2022)",
          "url": "https://doi.org/10.1103/PhysRevResearch.4.023252"
        }
      ],
      "backup": false
    },
    {
      "id": "nonlocality",
      "section": {
        "zh": "多体制备与认证",
        "en": "State preparation"
      },
      "minutes": 1.5,
      "title": {
        "zh": "从可制备的态，走向可认证的量子关联",
        "en": "From state preparation to certifiable correlations"
      },
      "kicker": {
        "zh": "发展性 · Bell 系列预印本 · 第一作者、共同通讯",
        "en": "Development · Bell-series preprints · First & co-corresponding"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>构造：优化检验本身</h3><p>最大化量子值／经典界的比值<br>迭代寻找抗噪的多体 Bell 检验<br>局部极值落在 facet：数值观察</p></article><article class=\"card\"><h3>认证：让多体规模可计算</h3><p>使用置换不变的一、二体关联<br>构造可扩展的不等式族<br>半定规划认证量子违反</p></article></div><div class=\"pathway\"><span>多面体结构</span><span>抗噪优化</span><span>低阶关联与证书</span></div><p class=\"jt-section-note\">两篇属于同一 Bell 研究系列，作者声明部分内容重叠。合作：Mengyao Hu、Jordi Tura。</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Construction: optimize the test</h3><p>Optimize the quantum-to-classical ratio<br>Iteratively find robust multipartite tests<br>Facet local optima: numerical observation</p></article><article class=\"card\"><h3>Certification: make scaling tractable</h3><p>Use permutation-invariant one- and two-body correlations<br>Construct scalable inequality families<br>Certify violations with SDP</p></article></div><div class=\"pathway\"><span>Polyhedral structure</span><span>Robustness optimization</span><span>Low-order certificates</span></div><p class=\"jt-section-note\">The two manuscripts form a partly overlapping Bell series. With Mengyao Hu and Jordi Tura.</p>"
      },
      "notes": {
        "zh": "制备更快以后，还要回答所得状态是否具有所需的量子关联。我们把 Bell 检验也变成优化对象，寻找更强且更抗噪的量子违反。第一项预印本中，局部最优点通常落在多面体的 facet 上，这是数值观察。后续工作针对置换不变的一、二体关联构造可扩展的不等式族，并用半定规划认证。两篇有作者明确说明的内容重叠，应当作为同一个持续推进的系列。这里我担任第一作者和共同通讯作者，与Mengyao Hu、Jordi Tura 合作。",
        "en": "Faster preparation must be complemented by a reliable test of the desired correlations. We optimize Bell tests for stronger and more noise-robust quantum violations. The first preprint numerically observes local optima at facets. The follow-up develops scalable permutation-invariant families using one- and two-body correlations and SDP certification. The authors state that the manuscripts overlap, so I present them as one developing series. I was first and co-corresponding author, working with Mengyao Hu and Jordi Tura."
      },
      "sources": [
        {
          "label": "arXiv:2511.07523 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2511.07523"
        },
        {
          "label": "arXiv:2607.08462 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2607.08462"
        }
      ],
      "backup": false
    },
    {
      "id": "nite",
      "section": {
        "zh": "多体制备与认证",
        "en": "State preparation"
      },
      "minutes": 2,
      "title": {
        "zh": "从虚时间演化到量子自然梯度",
        "en": "From imaginary-time evolution to quantum natural gradients"
      },
      "kicker": {
        "zh": "发展性 · 量子变分优化 · NITE 预印本 · 共同通讯",
        "en": "Development · Quantum variational optimization · NITE preprint · Co-corresponding"
      },
      "html": {
        "zh": "<div class=\"pathway\"><span>一般量子代价函数</span><span>Fubini–Study 梯度流</span><span>变分实现与量子自然梯度</span></div><div class=\"cols\"><article class=\"card\"><h3>把优化目标推广</h3><p>从基态能量，推广到可微纯态代价<br>方差最小化 · 量子传感探针 · 激发态</p></article><article class=\"card\"><h3>把收敛性质讲清楚</h3><p>在相应假设下证明局部指数收敛<br>示例中比较标准梯度下降<br>优化对象与几何结构共同设计</p></article></div><div class=\"jt-badges\"><span class=\"jt-badge jt-badge--growth\">预印本 arXiv:2607.09599</span></div><p class=\"jt-collab-inline\">合作：Chenyu Shi、Hao Wang（莱顿 LIACS）。已有结果属于量子变分优化。</p>",
        "en": "<div class=\"pathway\"><span>General quantum objective</span><span>Fubini–Study gradient flow</span><span>Variational quantum natural gradient</span></div><div class=\"cols\"><article class=\"card\"><h3>Extend the objective</h3><p>From ground-state energy to differentiable pure-state costs<br>Variance, sensing probes and excited states</p></article><article class=\"card\"><h3>Characterize convergence</h3><p>Local exponential convergence under stated assumptions<br>Compare standard gradient descent in examples<br>Design objectives together with geometry</p></article></div><div class=\"jt-badges\"><span class=\"jt-badge jt-badge--growth\">Preprint arXiv:2607.09599</span></div><p class=\"jt-collab-inline\">With Chenyu Shi and Hao Wang (Leiden LIACS). Completed results concern quantum variational optimization.</p>"
      },
      "notes": {
        "zh": "这项最新预印本把量子态制备与优化方法直接连接起来。标准虚时间演化主要降低能量；我们将它推广为一般量子代价函数的非线性虚时间演化，也就是 NITE。其几何基础是 Fubini–Study 度量，变分实现对应量子自然梯度。我们研究了方差最小化、量子传感探针优化和带惩罚项的激发态制备，并在给定假设下证明局部指数收敛。这里我是共同通讯作者，与Chenyu Shi和莱顿计算机科学的 Hao Wang 合作。本工作把量子几何方法从基态能量推广到更多量子态优化任务。下一节转向这些优化过程所需要的涨落与代价理论。",
        "en": "This recent preprint connects quantum-state preparation directly with optimization methods. Standard imaginary-time evolution reduces energy. NITE generalizes it to differentiable quantum objectives, with Fubini–Study gradient flow and a variational implementation related to quantum natural gradients. We study variance minimization, sensing probes and excited-state preparation with penalties, and prove local exponential convergence under stated assumptions. I was a co-corresponding author with Hao Wang, working with Chenyu Shi. This extends geometric quantum optimization beyond ground-state energy to further state-preparation tasks. I now turn to the fluctuation and cost theory needed to describe such processes."
      },
      "sources": [
        {
          "label": "arXiv:2607.09599 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2607.09599"
        }
      ],
      "backup": false
    },
    {
      "id": "stochastic-line",
      "section": {
        "zh": "随机热力学",
        "en": "Fluctuations"
      },
      "minutes": 0.75,
      "title": {
        "zh": "从轨道统计到一致的过程描述",
        "en": "From trajectory statistics to consistent process descriptions"
      },
      "kicker": {
        "zh": "研究线二 · 随机热力学与非平衡过程",
        "en": "Line 2 · Stochastic thermodynamics and nonequilibrium processes"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>已完成的科学问题</h3><p>联合功热统计保留什么信息？<br>改变参考系，涨落关系怎样成立？<br>相变与慢模态如何改写有限时间代价？</p></article><article class=\"card\"><h3>统一的方法积累</h3><p>正反过程与轨道概率<br>协变功热与量子准概率<br>有限尺寸、极限顺序和耗散标度</p></article></div><p class=\"jt-section-note\">从联合统计到动力学标度，建立一致且可检验的物理描述。</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Completed scientific questions</h3><p>Which information survives in joint work–heat statistics?<br>How do fluctuation relations transform between frames?<br>How do transitions affect finite-time costs?</p></article><article class=\"card\"><h3>Shared methodological foundations</h3><p>Forward and reverse trajectories<br>Covariant work–heat and quantum quasiprobabilities<br>Finite size, limits and dissipation scaling</p></article></div><p class=\"jt-section-note\">Connect joint statistics with dynamical scaling in a consistent, testable physical description.</p>"
      },
      "notes": {
        "zh": "第二条研究线强调描述的一致性。不能在一个过程里只保留方便计算的变量，却丢掉涨落关系成立所需要的信息；也不能在不同参考系或量子测量方式之间随意移用经典定义。这一系列工作从联合功热分布出发，扩展到协变与量子描述，并研究复杂动力学下的有限时间代价。接下来依次讨论联合统计、协变描述和有限时间相变。",
        "en": "The second line emphasizes consistency. A convenient reduced description may discard information required by a fluctuation relation. Definitions also cannot be transferred freely across reference frames or quantum measurement schemes. This sequence develops joint work–heat statistics, covariant and quantum descriptions, and finite-time costs in complex dynamics. I will discuss joint statistics, covariant descriptions and finite-time phase transitions in turn."
      },
      "sources": [
        {
          "label": "PRE 107, 024135 (2023)",
          "url": "https://doi.org/10.1103/PhysRevE.107.024135"
        },
        {
          "label": "PRL 134, 237102 (2025)",
          "url": "https://doi.org/10.1103/xlmq-g6m5"
        },
        {
          "label": "PRL 134, 177101 (2025)",
          "url": "https://doi.org/10.1103/PhysRevLett.134.177101"
        }
      ],
      "backup": false
    },
    {
      "id": "fluctuation",
      "section": {
        "zh": "随机热力学",
        "en": "Fluctuations"
      },
      "minutes": 1.5,
      "title": {
        "zh": "保留联合统计，才能识别完整涨落结构",
        "en": "Joint statistics reveal the full fluctuation structure"
      },
      "kicker": {
        "zh": "已发表 · PRE 2023 · 第一作者",
        "en": "Published · PRE 2023 · First author"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>问题：粗粒化会丢失什么？</h3><p>一个驱动系统可以同时交换功与多个热库的热。<br>只看平均值或一个边缘分布，可能丢失关系结构。</p></article><article class=\"card\"><h3>结果：涨落关系具有层级</h3><p>联合功—热统计保留一族涨落关系。<br>不同边缘化方式对应不同保留条件。<br>建模前先明确观测量与正反过程。</p></article></div><div class=\"pathway\"><span>联合轨道统计</span><span>层级涨落关系</span><span>检查粗粒化后保留的性质</span></div><p class=\"jt-collab-inline\">与全海涛合作；统计方法也延伸至与 Carlo Beenakker 合作的监测量子输运。</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>What does coarse-graining lose?</h3><p>Driven systems exchange work and heat with multiple reservoirs.<br>Means or single marginals may discard relation structure.</p></article><article class=\"card\"><h3>A hierarchy of relations</h3><p>Joint work–heat statistics retain a family of fluctuation relations.<br>Different marginals have different survival conditions.<br>Specify observables and reverse processes first.</p></article></div><div class=\"pathway\"><span>Joint trajectory statistics</span><span>Fluctuation hierarchy</span><span>Test properties after coarse-graining</span></div><p class=\"jt-collab-inline\">With H. T. Quan. Statistical methods also extend to monitored quantum transport with Carlo Beenakker.</p>"
      },
      "notes": {
        "zh": "随机热力学的基础不只是平均功和平均热，更是正反轨道概率之间的关系。在多热库驱动系统中，我们把功与各热库的热一起研究，发现联合分布中保留一族涨落关系。如果先对某些变量求和得到边缘分布，通常不能把完整结构都保留下来。我的贡献在这篇工作中以第一作者署名体现。它的意义是告诉我们，在研究新的随机系统前，必须先明确哪些观测量足够描述过程。同样的统计思维也延伸到与 Beenakker 合作的监测量子输运。下面的问题更进一步：当观测者与热库相对运动时，这个描述还能否一致？",
        "en": "Stochastic thermodynamics concerns relations between forward and reverse trajectory probabilities, not just mean work and heat. For driven systems coupled to multiple reservoirs, joint distributions retain a family of fluctuation relations. Marginalization generally removes part of that structure. I was first author. The methodological lesson is to establish which observables are sufficient before reducing a new stochastic model. Related statistical methods also enter my monitored-transport collaboration with Beenakker. The next question is whether the description stays consistent when observers and reservoirs are in relative motion."
      },
      "sources": [
        {
          "label": "PRE 107, 024135 (2023)",
          "url": "https://doi.org/10.1103/PhysRevE.107.024135"
        },
        {
          "label": "Quantum 9, 1874 (2025)",
          "url": "https://quantum-journal.org/papers/q-2025-10-02-1874/"
        }
      ],
      "backup": false
    },
    {
      "id": "covariant",
      "section": {
        "zh": "随机热力学",
        "en": "Fluctuations"
      },
      "minutes": 2.25,
      "title": {
        "zh": "把涨落关系推进到协变与量子描述",
        "en": "Extend fluctuation relations to covariant and quantum descriptions"
      },
      "kicker": {
        "zh": "代表 PRL ② · 2025 · 共同通讯 · 编辑推荐",
        "en": "Representative PRL 2 · 2025 · Co-corresponding · Editors’ Suggestion"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><span class=\"tag\">PRL 2025</span><h3>已发表：协变功与热</h3><p>能量与动量共同组成四矢量。<br>系统与热库相对运动时，<br>涨落关系保持一致的协变形式。</p></article><article class=\"card\"><span class=\"tag\">预印本 / Preprint · 2026</span><h3>发展：处理量子非对易性</h3><p>功四矢量分量不能简单同时测量。<br>结合 Wigner 与 Margenau–Hill 准概率，<br>将协变框架推进到量子过程。</p></article></div><div class=\"pathway\"><span>正反轨道</span><span>能量—动量协变描述</span><span>量子准概率拓展</span></div><p class=\"jt-collab-inline\">合作：Ji-Hui Pei、Tingzhang Shi、全海涛。量子拓展仍按预印本标注。</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><span class=\"tag\">PRL 2025</span><h3>Published: covariant work and heat</h3><p>Treat energy and momentum as four-vectors.<br>Maintain consistent fluctuation relations for systems and reservoirs in relative motion.</p></article><article class=\"card\"><span class=\"tag\">Preprint · 2026</span><h3>Development: quantum noncommutativity</h3><p>Work four-vector components cannot simply be measured together.<br>Combine Wigner and Margenau–Hill quasiprobabilities for the quantum extension.</p></article></div><div class=\"pathway\"><span>Forward–reverse trajectories</span><span>Energy–momentum covariance</span><span>Quantum quasiprobabilities</span></div><p class=\"jt-collab-inline\">With J.-H. Pei, Tingzhang Shi and H. T. Quan. The quantum extension remains a preprint.</p>"
      },
      "notes": {
        "zh": "这一组工作延续前页对描述一致性的追问。在相对运动的系统和热库中，热力学量不再只有能量，动量也必须进入功热描述。二〇二五年的 PRL 将涨落定理写成协变形式，使不同参考系的描述保持一致，并给出随机场与相对论布朗运动的例子。我是共同通讯作者，这篇也被选为编辑推荐。随后我们进一步遇到量子问题：功四矢量的分量存在非对易性，不能照搬经典联合概率。最新预印本结合 Wigner 和 Margenau–Hill 准概率来处理这一点。这样呈现的是从联合统计、协变描述到量子测量结构的一条连续发展线。",
        "en": "This sequence continues the consistency question. With relative motion between systems and reservoirs, momentum must accompany energy in the work–heat description. The 2025 PRL formulates covariant fluctuation relations and studies stochastic fields and relativistic Brownian motion. I was a co-corresponding author, and the article was an Editors’ Suggestion. The next step is quantum: work four-vector components are noncommuting, so a classical joint probability cannot simply be retained. Our new preprint combines Wigner and Margenau–Hill quasiprobabilities. The progression is from joint statistics to covariance, then to quantum measurement structure."
      },
      "sources": [
        {
          "label": "PRL 134, 237102 (2025)",
          "url": "https://doi.org/10.1103/xlmq-g6m5"
        },
        {
          "label": "arXiv:2606.14519 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2606.14519"
        }
      ],
      "backup": false
    },
    {
      "id": "phase-transition",
      "section": {
        "zh": "随机热力学",
        "en": "Fluctuations"
      },
      "minutes": 2.5,
      "title": {
        "zh": "相变怎样改写有限时间的耗散标度？",
        "en": "How do transitions change finite-time dissipation scaling?"
      },
      "kicker": {
        "zh": "代表 PRL ③ · 2025 · 共同通讯作者",
        "en": "Representative PRL 3 · 2025 · Co-corresponding"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>科学问题</h3><p>相变附近，有限时间代价如何随驱动速度和系统尺寸变化？</p></article><article class=\"card\"><h3>核心结果</h3><p>Curie–Weiss 模型中的遍历性破缺<br>大系统：额外功随 v<sup>2/3</sup> 标度<br>小系统：向 v 标度交叉</p></article></div><div class=\"callout\">有限尺寸与极限顺序影响耗散标度；不能默认所有过程都服从同一种慢驱动关系。</div><p class=\"caption\">v 为论文定义的驱动速度；上述结果限于所研究模型与标度区域。</p><p class=\"jt-collab-inline\">合作：Yu-Xin Wu、全海涛。联系：复杂动力学中的亚稳态与慢模态。</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Question</h3><p>How does finite-time cost near a phase transition depend on driving speed and size?</p></article><article class=\"card\"><h3>Core result</h3><p>Ergodicity breaking in the Curie–Weiss model<br>Large systems: excess-work scaling as v<sup>2/3</sup><br>Small systems: crossover to v scaling</p></article></div><div class=\"callout\">Finite size and the order of limits matter; a single slow-driving law cannot be assumed for every process.</div><p class=\"caption\">v is the driving speed defined in the paper; statements apply to the studied model and scaling regimes.</p><p class=\"jt-collab-inline\">With Yu-Xin Wu and H. T. Quan. Connection: metastability and slow modes in complex dynamics.</p>"
      },
      "notes": {
        "zh": "这一工作提醒我们，几何慢驱动图像也有适用边界。相变附近存在长弛豫时间和遍历性问题，系统尺寸与驱动速度的极限顺序会影响耗散。在 Curie–Weiss 模型中，我们分析了有限时间一阶相变的遍历性破缺，看到大系统中的额外功具有速度的三分之二次幂标度，而小系统会交叉到线性速度标度。我是第二作者和共同通讯作者。它与后面多体热化的联系是：当动力学变慢时，既要理解慢的来源，也要研究能否在保持物理目标的前提下改变动力学。 将它与前面的涨落工作合起来看，既要有一致的过程定义，也要知道具体动力学在哪个区域支持什么标度。亚稳态、慢模态和有限尺寸共同决定了所研究物理过程中标度成立的条件。",
        "en": "This paper illustrates a limitation of simple slow-driving pictures. Near phase transitions, long relaxation times and ergodicity issues make the order of size and driving-speed limits important. In the Curie–Weiss model, excess work scales with speed to the two-thirds power for large systems, with a crossover to linear scaling in small systems. I was the second and co-corresponding author. The link to many-body thermalization is that we must understand why dynamics becomes slow and ask whether it can be redesigned without changing the physical target. Together with the fluctuation work, this shows that consistent definitions must be combined with model-specific dynamical regimes. Metastability, slow modes and finite-size effects determine the scaling regimes of the physical processes studied here."
      },
      "sources": [
        {
          "label": "PRL 134, 177101 (2025)",
          "url": "https://doi.org/10.1103/PhysRevLett.134.177101"
        }
      ],
      "backup": false
    },
    {
      "id": "stochastic-foundations",
      "section": {
        "zh": "随机热力学",
        "en": "Fluctuations"
      },
      "minutes": 1,
      "title": {
        "zh": "一致性、几何与谱结构的共同基础",
        "en": "Common foundations: consistency, geometry and spectra"
      },
      "kicker": {
        "zh": "研究线二的汇合：模型、限制与复杂动力学",
        "en": "Research synthesis: models, limits and complex dynamics"
      },
      "html": {
        "zh": "<div class=\"jt-lines\"><article class=\"jt-line\"><span class=\"jt-line-number\">01</span><h3>模型一致性</h3><p class=\"jt-line-question\">热与功在什么条件下有一致定义？</p><p class=\"jt-line-tools\">量子详细平衡、正反过程、全计数统计</p><div class=\"jt-line-output\">独著预印本：一致 Lindbladian</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">02</span><h3>速度—代价关系</h3><p class=\"jt-line-question\">有限时间操作有什么可计算限制？</p><p class=\"jt-line-tools\">热力学长度、几何界、最优协议</p><div class=\"jt-line-output\">已发表：PRE / PRL / PRX Energy</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">03</span><h3>复杂动力学</h3><p class=\"jt-line-question\">慢模态与有限尺寸如何限制过程？</p><p class=\"jt-line-tools\">谱隙、亚稳态、相变标度</p><div class=\"jt-line-output\">已发表：PRL / PRB</div></article></div><p class=\"jt-section-note\">功热统计、几何界与谱方法，共同支持可计算、可检验的动力学。</p>",
        "en": "<div class=\"jt-lines\"><article class=\"jt-line\"><span class=\"jt-line-number\">01</span><h3>Model consistency</h3><p class=\"jt-line-question\">When are heat and work well defined?</p><p class=\"jt-line-tools\">Detailed balance, reverse paths and counting statistics</p><div class=\"jt-line-output\">Sole-author Lindbladian preprint</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">02</span><h3>Speed–cost relations</h3><p class=\"jt-line-question\">Which finite-time limits can be computed?</p><p class=\"jt-line-tools\">Thermodynamic length and optimal protocols</p><div class=\"jt-line-output\">Published PRE / PRL / PRX Energy</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">03</span><h3>Complex dynamics</h3><p class=\"jt-line-question\">How do slow modes and size limit evolution?</p><p class=\"jt-line-tools\">Gaps, metastability and scaling</p><div class=\"jt-line-output\">Published PRL / PRB</div></article></div><p class=\"jt-section-note\">Statistics, geometry and spectra underpin computable, testable dynamics.</p>"
      },
      "notes": {
        "zh": "这一节的成果最终汇聚到三个问题：模型是否一致、速度与代价有什么限制、复杂动力学中的慢过程怎样形成。除了已发表结果，我的独著预印本还建立热力学一致的 Lindblad 描述，给出功热联合统计和控制框架。它继续体现独立研究，但并不增加两篇已发表独著的数量。这些结果将过程定义、有限时间限制和具体动力学连接起来。接下来转向第三条线，说明几何与控制已经怎样在热机问题中形成可达到的结果。",
        "en": "The results converge on three questions: model consistency, finite-time speed–cost limits and the origin of slow dynamics. My sole-author preprint on thermodynamically consistent Lindbladians adds a work–heat statistics and control framework; it is separate from the two published sole-author papers. Together, these results connect process definitions, finite-time limits and concrete dynamics. I now move to the third line to show how geometry and control already produce attainable results in heat engines."
      },
      "sources": [
        {
          "label": "arXiv:2502.20118 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2502.20118"
        },
        {
          "label": "PRL 128, 230603 (2022)",
          "url": "https://doi.org/10.1103/PhysRevLett.128.230603"
        },
        {
          "label": "PRL 134, 177101 (2025)",
          "url": "https://doi.org/10.1103/PhysRevLett.134.177101"
        }
      ],
      "backup": false
    },
    {
      "id": "engine-line",
      "section": {
        "zh": "量子热机与控制",
        "en": "Heat engines & control"
      },
      "minutes": 1,
      "title": {
        "zh": "从量子效应，到可达到的热机性能",
        "en": "From quantum effects to attainable engine performance"
      },
      "kicker": {
        "zh": "研究线三 · 量子热力学与热机中的量子优势",
        "en": "Line 3 · Quantum thermodynamics and engine advantage"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>物理机制</h3><p>工质统计与能量结构<br>有限时间的非绝热激发<br>相干动力学与功率—效率权衡</p></article><article class=\"card\"><h3>设计方法</h3><p>动力学量子几何：设计低激发路径<br>热力学几何：构造可达功率界<br>最优控制：决定循环结构</p></article></div><div class=\"pathway\"><span>理解优势或损耗来源</span><span>构造独立控制方法</span><span>在给定约束下检验性能</span></div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Physical mechanisms</h3><p>Statistics and energy structure<br>Finite-time nonadiabatic excitations<br>Coherent dynamics and power–efficiency tradeoffs</p></article><article class=\"card\"><h3>Design methods</h3><p>Dynamical quantum geometry: low-excitation paths<br>Thermodynamic geometry: attainable bounds<br>Optimal control: cycle structure</p></article></div><div class=\"pathway\"><span>Identify mechanisms</span><span>Develop independent control methods</span><span>Test constrained performance</span></div>"
      },
      "notes": {
        "zh": "第三条线从量子热机出发，但最终落在性能怎样实现。早期我研究工质统计、有限时间绝热段和效率功率的关系；之后不满足于比较给定循环，而是独立发展两类几何控制方法。量子几何用于抑制非绝热激发，布朗热机则提供能够明确构造最优协议的基准。它们进一步延伸到膜分离与最优循环结构。下面按“机制—控制—可达结果”的顺序来讲，而不按年份逐篇介绍。",
        "en": "The third line starts with quantum engines and asks how performance can actually be achieved. Earlier work studied statistics, finite-time adiabatic strokes and power–efficiency relations. I then independently developed two geometric-control approaches: quantum geometry to suppress excitations, and Brownian engines as a benchmark with explicitly attainable protocols. These methods extend to membrane separation and optimal cycle structure. I will organize the results by mechanism, control and attainability rather than publication date."
      },
      "sources": [
        {
          "label": "PRE 100, 032144 (2019)",
          "url": "https://doi.org/10.1103/PhysRevE.100.032144"
        },
        {
          "label": "PRR 4, 023252 (2022)",
          "url": "https://doi.org/10.1103/PhysRevResearch.4.023252"
        },
        {
          "label": "PRE 106, 054108 (2022)",
          "url": "https://doi.org/10.1103/PhysRevE.106.054108"
        }
      ],
      "backup": false
    },
    {
      "id": "quantum-engine",
      "section": {
        "zh": "量子热机与控制",
        "en": "Heat engines & control"
      },
      "minutes": 1.5,
      "title": {
        "zh": "量子效应如何进入热机的性能？",
        "en": "How do quantum effects enter engine performance?"
      },
      "kicker": {
        "zh": "已发表系列 · 工质、非绝热损耗与效率—功率",
        "en": "Published series · Working media, nonadiabatic loss and performance"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>工质与动力学</h3><p>Bose–Fermi 对偶：工质的统计与能量结构。<br>两能级／谐振子等模型中，绝热段额外功有振荡结构。<br>调整时间与协议，可以利用该动力学改善循环。</p></article><article class=\"card\"><h3>真正的比较问题</h3><p>固定工质、热库与允许控制。<br>分别比较输出功、周期时间和最大功率下效率。<br>识别哪些量子效应在条件内有用。</p></article></div><p class=\"jt-section-note\">自然引出：能否直接设计低激发的绝热路径，而不只优化一个预设时间表？</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Working medium and dynamics</h3><p>Bose–Fermi duality links statistics and energy structure.<br>Two-level and harmonic-oscillator models show oscillatory adiabatic excess work.<br>Timing and protocols can exploit this dynamics.</p></article><article class=\"card\"><h3>A well-defined comparison</h3><p>Fix the medium, reservoirs and allowed controls.<br>Compare work, cycle time and efficiency at maximum power.<br>Identify useful quantum effects in that setting.</p></article></div><p class=\"jt-section-note\">Next question: can we design low-excitation adiabatic paths directly, beyond retiming a prescribed cycle?</p>"
      },
      "notes": {
        "zh": "量子热机的性能取决于工质，也取决于有限时间动力学。早期工作研究了囚禁玻色气体的 Bose–Fermi 对偶性，说明统计和能量结构如何进入循环描述。在有限时间量子 Otto 热机中，绝热段产生的额外功并非总是平滑变化，而有振荡结构；这为控制时间和协议提供了可利用的自由度。随后我们进一步分析最大功率下效率。对优势的判断，始终需要说明工质、热库和允许控制。由这些机制研究，一个自然的独立问题出现了：能否从量子动力学本身构造抑制激发的最优路径？",
        "en": "Quantum-engine performance depends on the medium and finite-time dynamics. Early work studied Bose–Fermi duality for trapped gases. In finite-time quantum Otto cycles, adiabatic excess work has an oscillatory structure that provides useful timing and protocol freedom. Further work examined efficiency at maximum power. Any advantage comparison must specify the medium, reservoirs and allowed control. These mechanisms motivate an independent question: can the quantum dynamics itself provide a systematic way to design low-excitation paths?"
      },
      "sources": [
        {
          "label": "PRE 98, 062119 (2018)",
          "url": "https://doi.org/10.1103/PhysRevE.98.062119"
        },
        {
          "label": "PRE 100, 032144 (2019)",
          "url": "https://doi.org/10.1103/PhysRevE.100.032144"
        },
        {
          "label": "PRE 100, 062140 (2019)",
          "url": "https://doi.org/10.1103/PhysRevE.100.062140"
        }
      ],
      "backup": false
    },
    {
      "id": "quantum-geometry",
      "section": {
        "zh": "量子热机与控制",
        "en": "Heat engines & control"
      },
      "minutes": 2,
      "title": {
        "zh": "用量子几何设计低激发的控制路径",
        "en": "Use quantum geometry to design low-excitation paths"
      },
      "kicker": {
        "zh": "独立性 ① · 已发表独著 · PRR 2022",
        "en": "Independence 1 · Published sole-author paper · PRR 2022"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>从动力学得到度量</h3><p>把能隙与跃迁结构纳入<br>动力学量子几何张量。<br>度量告诉我们哪些参数变化更容易产生激发。</p></article><article class=\"card\"><h3>从度量得到协议</h3><p>沿测地线以恒定几何速度驱动。<br>在 Landau–Zener 与横场 Ising 模型中检验。<br>由结构设计路径，而不只调整总时间。</p></article></div><div class=\"pathway\"><span>量子动力学</span><span>动力学度量</span><span>测地线与恒定几何速度</span></div><div class=\"jt-badges\"><span class=\"jt-badge jt-badge--independence\">Jin-Fu Chen · Sole author</span></div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>A metric from dynamics</h3><p>Include gaps and transition structure<br>in a dynamical quantum geometric tensor.<br>The metric identifies costly parameter changes.</p></article><article class=\"card\"><h3>A protocol from the metric</h3><p>Follow geodesics at constant geometric speed.<br>Test Landau–Zener and transverse-field Ising models.<br>Design paths rather than only total duration.</p></article></div><div class=\"pathway\"><span>Quantum dynamics</span><span>Dynamical metric</span><span>Geodesic at constant geometric speed</span></div><div class=\"jt-badges\"><span class=\"jt-badge jt-badge--independence\">Jin-Fu Chen · Sole author</span></div>"
      },
      "notes": {
        "zh": "这是第一项已经发表的独著工作。它延续量子热机中非绝热损耗的问题，但把目标改为直接设计低激发过程。我从绝热动力学出发构造动力学量子几何张量，让能隙和跃迁矩阵元共同决定控制空间的度量。再利用这个度量寻找测地线，并以恒定几何速度驱动，在 Landau–Zener 和横场 Ising 模型中检验抑制激发的效果。独立性体现为由问题、推导到模型检验的一条完整研究经历。这里得到的是具体条件下的低激发控制方法，不需要声称对所有模型普适最优。下一页看相同的几何思维如何在热机基准中给出可达到的功率界。",
        "en": "This is the first published sole-author study. It develops the nonadiabatic-loss question from quantum engines into direct low-excitation control. A dynamical quantum geometric tensor combines gaps and transition structure into a metric on control space. Geodesic paths with constant geometric speed are tested in Landau–Zener and transverse-field Ising models. The independent contribution spans formulation, derivation and model checks. The result is a model-qualified control method, not a universal optimality claim. Next I use geometric reasoning in an engine benchmark where the power bound is explicitly attainable."
      },
      "sources": [
        {
          "label": "PRR 4, 023252 (2022)",
          "url": "https://doi.org/10.1103/PhysRevResearch.4.023252"
        }
      ],
      "backup": false
    },
    {
      "id": "brownian",
      "section": {
        "zh": "量子热机与控制",
        "en": "Heat engines & control"
      },
      "minutes": 2,
      "title": {
        "zh": "在可控基准中构造可达到的功率界",
        "en": "Construct an attainable power bound in a controlled benchmark"
      },
      "kicker": {
        "zh": "独立性 ② · 已发表独著 · PRE 2022",
        "en": "Independence 2 · Published sole-author paper · PRE 2022"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>要解决的问题</h3><p>有限时间热机怎样同时选择循环路径和操作速度？</p></article><article class=\"card\"><h3>独立完成的工作</h3><p>利用等温捷径构造有限时间过程<br>建立循环的热力学几何描述<br>得到可达的输出功率界与最优协议</p></article></div><div class=\"formula\">P = W<sub>out</sub> / τ</div><p class=\"caption\">优化对象是整个循环的输出功率。</p><div class=\"callout\">意义：在该捷径模型内，将欠阻尼与过阻尼之外的一般阻尼情形纳入统一描述。</div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Question</h3><p>How should a finite-time engine choose both its cycle and its schedule?</p></article><article class=\"card\"><h3>Independent work</h3><p>Construct finite-time processes using shortcuts to isothermality<br>Describe the cycle geometrically<br>Obtain an attainable output-power bound and protocol</p></article></div><div class=\"formula\">P = W<sub>out</sub> / τ</div><p class=\"caption\">The optimization concerns output power over the complete cycle.</p><div class=\"callout\">Significance: a unified description for general damping within the shortcut model.</div>"
      },
      "notes": {
        "zh": "这篇论文是我独立完成的研究，适合用来说明从问题提出到理论分析的独立能力。研究对象是布朗热机，我利用等温捷径构造有限时间循环，再用热力学长度描述控制过程。与只在高度欠阻尼或过阻尼极限处理问题相比，这一框架适用于一般阻尼情形。我给出了可达的输出功率界，达到该功率上界的协议需要按热力学长度分配速度。这里一定要区分模型中的捷径控制和普通实验控制；协议的可达性是在所定义的控制集合中成立。下一项工作则进一步从最优控制出发，直接研究循环结构。 将两项独著连起来看，共同推进是由控制空间的几何结构得到协议；量子问题关注低激发，布朗热机进一步允许明确讨论可达功率界。下一项应用展示这套方法怎样从热机走向分离过程。",
        "en": "This sole-author paper demonstrates independent work from problem formulation to analysis. I studied Brownian heat engines using shortcuts to isothermality, with thermodynamic length describing finite-time cycles. The approach includes general damping, rather than only strongly underdamped or overdamped limits. It gives an attainable output-power bound and an optimal schedule based on thermodynamic length. Attainability refers to the control set defined in the shortcut model. The next paper instead uses optimal control to investigate the cycle structure directly. The two sole-author studies share a progression from control geometry to protocols: low excitation in quantum dynamics and an attainable power bound in Brownian engines. The next application carries this logic beyond engines to separation."
      },
      "sources": [
        {
          "label": "PRE 106, 054108 (2022)",
          "url": "https://doi.org/10.1103/PhysRevE.106.054108"
        }
      ],
      "backup": false
    },
    {
      "id": "membrane",
      "section": {
        "zh": "量子热机与控制",
        "en": "Heat engines & control"
      },
      "minutes": 2,
      "title": {
        "zh": "从几何界走向可检验的有限时间协议",
        "en": "From geometric bounds to testable finite-time protocols"
      },
      "kicker": {
        "zh": "系列成果 · PRL 2022 + PRX Energy 2023",
        "en": "Research sequence · PRL 2022 + PRX Energy 2023"
      },
      "html": {
        "zh": "<div class=\"cols\"><div class=\"result-summary\"><h3>几何预测与动力学模拟相符</h3><p>二元气体的有限时间膜分离</p><div class=\"formula\">W<sub>ex</sub> ≥ ℒ² / τ</div><p class=\"caption\">曲线：几何预测；符号：模拟结果。</p><p>对称装置的最优协议可以打破对称性，进一步降低额外功。</p></div><figure class=\"paper-figure\"><img src=\"assets/membrane-result.png\" alt=\"论文图4(c)：额外功随操作时间变化，对称与非对称分离协议比较\"><figcaption>原论文图 4(c) · 红：对称协议；绿：非对称协议。<br>此例的差异较小；插图显示细节。</figcaption></figure></div><div class=\"callout\">PRL 2022：第二作者、编辑推荐 · PRX Energy 2023：共同第一作者。</div>",
        "en": "<div class=\"cols\"><div class=\"result-summary\"><h3>Geometry agrees with simulations</h3><p>Finite-time binary-gas membrane separation</p><div class=\"formula\">W<sub>ex</sub> ≥ ℒ² / τ</div><p class=\"caption\">Lines: geometric predictions; symbols: simulations.</p><p>An optimal protocol can break device symmetry and reduce excess work.</p></div><figure class=\"paper-figure\"><img src=\"assets/membrane-result.png\" alt=\"Original Figure 4(c): excess work versus duration, comparing symmetric and asymmetric protocols\"><figcaption>Original Fig. 4(c) · Red: symmetric; green: asymmetric.<br>The difference is small in this example; see the inset.</figcaption></figure></div><div class=\"callout\">PRL 2022: second author, Editors’ Suggestion. PRX Energy 2023: co-first author.</div>"
      },
      "notes": {
        "zh": "这组工作把几何方法从公式推进到操作路径。等温捷径的 PRL 证明最小能耗协议与参数空间的测地线对应；随后膜分离工作在具体气体模型中建立有限时间额外功的几何下界，并设计相应路径。这里的原图比较几何预测曲线和动力学模拟符号，说明关系在所研究参数中可检验。对称装置的最优协议还可以破坏对称性，但本图差别很小，不能夸大节能幅度。二〇二二年的 PRL 我是第二作者，二〇二三年的 PRX Energy 我是共同第一作者，与孙昌璞、董辉等合作。再联系早期有限时间标度的实验 PRL，形成的是“几何预测—协议构造—模型或实验检验”的研究链。",
        "en": "This sequence carries geometry from bounds into operating protocols. The shortcuts-to-isothermality PRL establishes the geodesic principle. The membrane-separation work then derives a geometric excess-work bound in gas models and constructs paths. The original figure compares geometric predictions with dynamical simulations. Symmetry breaking can lower the cost, although the improvement is small for these plotted parameters. I was second author on the 2022 PRL and co-first on the 2023 PRX Energy paper, with C. P. Sun, Hui Dong and colleagues. Together with the earlier experimental scaling PRL, the sequence connects geometric predictions, protocols and model or experimental tests."
      },
      "sources": [
        {
          "label": "PRL 128, 230603 (2022)",
          "url": "https://doi.org/10.1103/PhysRevLett.128.230603"
        },
        {
          "label": "PRX Energy 2, 033003 (2023)",
          "url": "https://doi.org/10.1103/PRXEnergy.2.033003"
        },
        {
          "label": "PRL 125, 210601 (2020)",
          "url": "https://doi.org/10.1103/PhysRevLett.125.210601"
        }
      ],
      "backup": false
    },
    {
      "id": "optimal-control",
      "section": {
        "zh": "量子热机与控制",
        "en": "Heat engines & control"
      },
      "minutes": 1.5,
      "title": {
        "zh": "从最优路径继续走向最优循环结构",
        "en": "From optimal paths to optimal cycle structure"
      },
      "kicker": {
        "zh": "研究延续 · PRE 2024 · 第一作者、共同通讯",
        "en": "Research continuity · PRE 2024 · First & co-corresponding"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>问题</h3><p>给定可用控制与约束，最大功率循环应具有怎样的结构？</p></article><article class=\"card\"><h3>发现</h3><p>一般阻尼条件下的最优控制分析<br>两段等温、两段绝热<br>高刚度处加入等容弛豫</p></article></div><div class=\"pathway\"><span>等温</span><span>绝热</span><span>等容弛豫</span><span>闭合循环</span></div><div class=\"callout\">我的贡献：第一作者、共同通讯作者；将有限时间热机问题推进到最优控制框架。</div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Question</h3><p>What cycle structure maximizes power under the specified controls and constraints?</p></article><article class=\"card\"><h3>Finding</h3><p>Optimal-control analysis for general damping<br>Two isothermal and two adiabatic segments<br>Additional isochoric relaxation at high stiffness</p></article></div><div class=\"pathway\"><span>Isothermal</span><span>Adiabatic</span><span>Isochoric relaxation</span><span>Closed cycle</span></div><div class=\"callout\">My contribution: first and co-corresponding author; extending finite-time engine analysis through optimal control.</div>"
      },
      "notes": {
        "zh": "热机研究不只是在预先给定的循环上调时间。一个更深的问题是，最大功率循环本身应该是什么形状。我们在给定控制条件的一般阻尼模型中进行最优控制分析，得到两段等温、两段绝热以及高刚度处的额外等容弛豫结构。这个结果连接欠阻尼与过阻尼的讨论，也说明弛豫过程本身可以是优化方案的一部分。我是第一作者和共同通讯作者。对面试评委，最值得强调的不是循环名称，而是方法上的推进：从猜一个协议再验证，转向在约束下由动力学和优化条件决定协议结构。 这也是第三条线的收束：由量子效应和损耗机制出发，先独立构造几何控制，再向循环结构优化推进。与全海涛的合作使这一方法进入更完整的热机优化问题。",
        "en": "Engine optimization need not be limited to adjusting timings on a predefined cycle. We asked what the maximum-power cycle itself should look like. Under the specified controls in a general-damping model, optimal-control analysis identifies two isothermals, two adiabatics and an extra isochoric relaxation segment at high stiffness. This connects underdamped and overdamped discussions and makes relaxation part of the optimization. I was the first and co-corresponding author. The methodological advance is to let dynamics and constraints determine the protocol structure. This closes the third progression: mechanisms and losses motivate independent geometric control, which then develops into cycle-structure optimization with H. T. Quan."
      },
      "sources": [
        {
          "label": "PRE 110, L042105 (2024)",
          "url": "https://doi.org/10.1103/PhysRevE.110.L042105"
        }
      ],
      "backup": false
    },
    {
      "id": "research-summary",
      "section": {
        "zh": "总结与合作",
        "en": "Synthesis"
      },
      "minutes": 1,
      "title": {
        "zh": "三条研究线，形成连续的方法积累",
        "en": "Three research lines form a continuous methodological base"
      },
      "kicker": {
        "zh": "研究成果收束：系统性、独立性、发展性",
        "en": "Research synthesis: continuity, independence and development"
      },
      "html": {
        "zh": "<div class=\"jt-lines\"><article class=\"jt-line\"><span class=\"jt-line-number\">01</span><h3>制备与认证</h3><p class=\"jt-line-question\">固定目标，设计更好的动力学与检验。</p><p class=\"jt-line-tools\">生成元 / 母哈密顿量 / Bell 检验</p><div class=\"jt-line-output\">共同通讯 PRL + PRB → Bell / NITE</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">02</span><h3>随机热力学</h3><p class=\"jt-line-question\">建立一致的统计与有限时间代价描述。</p><p class=\"jt-line-tools\">联合分布 / 协变功热 / 慢模态</p><div class=\"jt-line-output\">两篇共同通讯 PRL → 量子准概率</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">03</span><h3>量子热机与控制</h3><p class=\"jt-line-question\">从量子损耗机制得到可达到的协议。</p><p class=\"jt-line-tools\">量子几何 / 热力学长度 / 最优控制</p><div class=\"jt-line-output\">两篇已发表独著 → 循环结构</div></article></div><p class=\"jt-section-note\">共同通讯 PRL 体现合作中的研究担当；已发表独著体现独立研究；预印本体现持续发展。</p>",
        "en": "<div class=\"jt-lines\"><article class=\"jt-line\"><span class=\"jt-line-number\">01</span><h3>Preparation and certification</h3><p class=\"jt-line-question\">Fix the target; design dynamics and tests.</p><p class=\"jt-line-tools\">Generators, parent Hamiltonians and Bell tests</p><div class=\"jt-line-output\">Co-corresponding PRL / PRB → Bell / NITE</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">02</span><h3>Stochastic thermodynamics</h3><p class=\"jt-line-question\">Build consistent statistics and finite-time costs.</p><p class=\"jt-line-tools\">Joint distributions, covariance and slow modes</p><div class=\"jt-line-output\">Two co-corresponding PRLs → quantum extension</div></article><article class=\"jt-line\"><span class=\"jt-line-number\">03</span><h3>Engines and control</h3><p class=\"jt-line-question\">Turn loss mechanisms into attainable protocols.</p><p class=\"jt-line-tools\">Quantum geometry, length and optimal control</p><div class=\"jt-line-output\">Two sole-author papers → cycle structure</div></article></div><p class=\"jt-section-note\">Published results and current preprints show continuity, independence and development.</p>"
      },
      "notes": {
        "zh": "把三条线合起来，我希望各位老师看到的不是论文清单，而是持续发展的问题与方法。多体方向研究固定目标下的制备与认证；随机热力学方向研究描述一致性和代价；热机方向研究性能与可达到的协议。三篇共同通讯 PRL、两篇已发表独著和后续预印本分别给出不同层面的贡献证据。多体、涨落和几何方法之间也可以相互迁移。这些成果是在国内外不同合作者的共同研究中形成的，我最后简要介绍这一合作基础。",
        "en": "Across the three lines, the contribution is a continuous set of questions and methods rather than a publication list. Preparation and certification fix targets; stochastic thermodynamics defines consistency and costs; engines connect performance with attainable protocols. Three co-corresponding PRLs, two published sole-author studies and current preprints give complementary evidence. Spectral, trajectory and geometric tools also transfer between problems. These results emerged from collaborations across several institutions, which I will briefly acknowledge."
      },
      "sources": [
        {
          "label": "PRL 135, 090602 (2025)",
          "url": "https://doi.org/10.1103/cslt-x32n"
        },
        {
          "label": "PRL 134, 237102 (2025)",
          "url": "https://doi.org/10.1103/xlmq-g6m5"
        },
        {
          "label": "PRL 134, 177101 (2025)",
          "url": "https://doi.org/10.1103/PhysRevLett.134.177101"
        }
      ],
      "backup": false
    },
    {
      "id": "collaborations",
      "section": {
        "zh": "总结与合作",
        "en": "Synthesis"
      },
      "minutes": 1,
      "title": {
        "zh": "围绕共同问题开展跨机构合作",
        "en": "Collaborate across institutions around shared questions"
      },
      "kicker": {
        "zh": "代表合作者 · 按现工作机构分组",
        "en": "Selected collaborators · Grouped by current institution"
      },
      "html": {
        "zh": "<div class=\"jt-collaborations\"><section class=\"jt-collaboration-group\"><h3>国内合作</h3><div class=\"jt-people\"><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://zsxx.gscaep.ac.cn/teacher-detail/266\" target=\"_blank\" rel=\"noopener\">孙昌璞</a><span class=\"jt-person-affiliation\">中物院研究生院</span><span class=\"jt-person-topic\">量子热机与几何</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://faculty.pku.edu.cn/quanhaitao/zh_CN/jsxx/6009/jsxx/jsxx.htm\" target=\"_blank\" rel=\"noopener\">全海涛</a><span class=\"jt-person-affiliation\">北京大学物理学院</span><span class=\"jt-person-topic\">随机热力学与控制</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://zsxx.gscaep.ac.cn/teacher-detail/260\" target=\"_blank\" rel=\"noopener\">董辉</a><span class=\"jt-person-affiliation\">中物院研究生院</span><span class=\"jt-person-topic\">有限时间热力学</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://zsxx.gscaep.ac.cn/intro-detail/24\" target=\"_blank\" rel=\"noopener\">李颖</a><span class=\"jt-person-affiliation\">中物院研究生院</span><span class=\"jt-person-topic\">量子线路与等温过程</span></div></div></section><section class=\"jt-collaboration-group\"><h3>海外合作</h3><div class=\"jt-people\"><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://aqa.liacs.nl/people/\" target=\"_blank\" rel=\"noopener\">Jordi Tura</a><span class=\"jt-person-affiliation\">莱顿大学</span><span class=\"jt-person-topic\">多体制备与认证</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://www.icfo.eu/research-group/11/qot/home/\" target=\"_blank\" rel=\"noopener\">Maciej Lewenstein</a><span class=\"jt-person-affiliation\">ICFO / ICREA，西班牙</span><span class=\"jt-person-topic\">开放多体热化</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://www.universiteitleiden.nl/en/staffmembers/carlo-beenakker\" target=\"_blank\" rel=\"noopener\">Carlo Beenakker</a><span class=\"jt-person-affiliation\">莱顿大学</span><span class=\"jt-person-topic\">监测量子输运</span></div></div></section></div><p class=\"jt-collaboration-note\">另与莱顿 LIACS 的 Hao Wang 合作开展量子优化。合作方式：开放讨论、明确分工、共同核对结果。</p>",
        "en": "<div class=\"jt-collaborations\"><section class=\"jt-collaboration-group\"><h3>Institutions in China</h3><div class=\"jt-people\"><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://zsxx.gscaep.ac.cn/teacher-detail/266\" target=\"_blank\" rel=\"noopener\">Chang-Pu Sun</a><span class=\"jt-person-affiliation\">GSCAEP, China</span><span class=\"jt-person-topic\">Engines and geometry</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://faculty.pku.edu.cn/quanhaitao/zh_CN/jsxx/6009/jsxx/jsxx.htm\" target=\"_blank\" rel=\"noopener\">H. T. Quan</a><span class=\"jt-person-affiliation\">Peking University</span><span class=\"jt-person-topic\">Fluctuations and control</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://zsxx.gscaep.ac.cn/teacher-detail/260\" target=\"_blank\" rel=\"noopener\">Hui Dong</a><span class=\"jt-person-affiliation\">GSCAEP, China</span><span class=\"jt-person-topic\">Finite-time thermodynamics</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://zsxx.gscaep.ac.cn/intro-detail/24\" target=\"_blank\" rel=\"noopener\">Ying Li</a><span class=\"jt-person-affiliation\">GSCAEP, China</span><span class=\"jt-person-topic\">Circuits and isothermality</span></div></div></section><section class=\"jt-collaboration-group\"><h3>International institutions</h3><div class=\"jt-people\"><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://aqa.liacs.nl/people/\" target=\"_blank\" rel=\"noopener\">Jordi Tura</a><span class=\"jt-person-affiliation\">Leiden University</span><span class=\"jt-person-topic\">Preparation and certification</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://www.icfo.eu/research-group/11/qot/home/\" target=\"_blank\" rel=\"noopener\">Maciej Lewenstein</a><span class=\"jt-person-affiliation\">ICFO / ICREA, Spain</span><span class=\"jt-person-topic\">Open-system thermalization</span></div><div class=\"jt-person\"><a class=\"jt-person-name\" href=\"https://www.universiteitleiden.nl/en/staffmembers/carlo-beenakker\" target=\"_blank\" rel=\"noopener\">C. W. J. Beenakker</a><span class=\"jt-person-affiliation\">Leiden University</span><span class=\"jt-person-topic\">Monitored quantum transport</span></div></div></section></div><p class=\"jt-collaboration-note\">Also quantum optimization with Hao Wang at Leiden LIACS. Working principles: open discussion, clear roles and shared verification.</p>"
      },
      "notes": {
        "zh": "我的合作既有长期持续的共同问题，也有跨领域的新结合。国内与孙昌璞、董辉、全海涛等在热力学与控制方面合作，与李颖有量子线路研究；海外与 Jordi Tura、Maciej Lewenstein 等研究多体系统，与 Beenakker 研究量子输运。最新 NITE 工作还与计算机科学和优化方向的 Hao Wang 合作。这里按现工作机构分组，只列部分代表合作者。我的合作原则是开放讨论、明确分工并一起核对结果。我希望以开放讨论、清晰分工和共同验证，在合作中把问题推进下去。接下来只用两页说明如何在已有基础上继续推进。",
        "en": "My collaborations combine sustained questions with new connections. In China, work with C. P. Sun, Hui Dong, H. T. Quan and Ying Li covers thermodynamics, control and circuits. Internationally, Jordi Tura and Maciej Lewenstein contribute many-body perspectives, while Beenakker contributes transport, and Hao Wang contributes optimization. The groups use current institutional locations and show selected collaborators. My working principles are open discussion, explicit roles and shared verification. I aim to move shared questions forward through open discussion, clear roles and joint verification. I will now use only two slides to outline the next steps."
      },
      "sources": [
        {
          "label": "PRB 113, 184313 (2026)",
          "url": "https://doi.org/10.1103/r43j-qfj5"
        },
        {
          "label": "PRL 134, 237102 (2025)",
          "url": "https://doi.org/10.1103/xlmq-g6m5"
        },
        {
          "label": "Quantum 9, 1874 (2025)",
          "url": "https://quantum-journal.org/papers/q-2025-10-02-1874/"
        }
      ],
      "backup": false
    },
    {
      "id": "future-ai-quantum",
      "title": {
        "zh": "把既有方法推进到 AI 与量子任务",
        "en": "Extending our methods to AI and quantum tasks"
      },
      "kicker": {
        "zh": "未来规划 1 / 2 · 三条研究线的延续",
        "en": "OUTLOOK 1 / 2 · THREE CONTINUING RESEARCH LINES"
      },
      "html": {
        "zh": "<div class=\"jt-plans\"><div class=\"jt-plan\"><span class=\"jt-step-num\">01</span><h3>多体态的制备与认证</h3><p>保持目标分布和任务质量，用几何与谱方法优化有限时间过程。</p><small>热化与控制 → 学习和生成</small></div><div class=\"jt-plan\"><span class=\"jt-step-num\">02</span><h3>随机热力学与人工智能</h3><p>从 Energy Transformer 与 Hopfield 建立自洽随机动力学，分别研究推理和训练。</p><small>涨落理论 → 正反轨迹与代价</small></div><div class=\"jt-plan\"><span class=\"jt-step-num\">03</span><h3>量子热力学与优势</h3><p>以量子 Hopfield 分别检验资源与任务优势，计入编码、制备和测量成本。</p><small>量子几何与 Bell → 完整成本比较</small></div></div><p class=\"jt-note\">先建立模型内可计算的界；联系实际能耗还需指定物理实现。</p>",
        "en": "<div class=\"jt-plans\"><div class=\"jt-plan\"><span class=\"jt-step-num\">01</span><h3>State preparation &amp; certification</h3><p>Optimize finite-time dynamics with geometry and spectra, at fixed target and task quality.</p><small>Thermalization and control → learning and generation</small></div><div class=\"jt-plan\"><span class=\"jt-step-num\">02</span><h3>Stochastic thermodynamics &amp; AI</h3><p>Model Energy Transformer and Hopfield dynamics; separate inference from training.</p><small>Fluctuations → forward/reverse trajectories and cost</small></div><div class=\"jt-plan\"><span class=\"jt-step-num\">03</span><h3>Quantum thermodynamics</h3><p>Test quantum Hopfield resources and task performance, counting encoding, preparation and readout.</p><small>Quantum geometry and Bell → full-cost comparison</small></div></div><p class=\"jt-note\">Model costs require a specified physical implementation before interpreting actual energy use.</p>"
      },
      "notes": {
        "zh": "未来规划延续这三条研究线，把人工智能作为主要的新问题。首先从 Energy Transformer 和可解 Hopfield 出发，明确状态、噪声、驱动与反过程，再分别研究推理和训练。第二步把热力学几何与谱优化用于固定任务质量下的过程；这些已有物理方法能否迁移，需要重新检验。量子方向从记忆任务开始，区分资源见证与任务优势，并计入编码、制备和测量。模型代价联系实际能耗还需要物理实现。下一页介绍分阶段的执行路径。",
        "en": "The outlook continues these three research lines, with AI as the main new problem. I will begin with Energy Transformer and tractable Hopfield models, specifying states, noise, driving and reverse processes, and treating inference separately from training. The next step is to apply thermodynamic geometry and spectral optimization at fixed task quality. Their validity in these new models must be checked. For quantum models, memory retrieval provides a controlled task. Resource certification and task advantage need separate tests, with encoding, preparation and measurement included. Connecting model costs to actual energy use also requires a physical implementation. Let me now outline a staged path."
      },
      "section": {
        "zh": "未来展望",
        "en": "Outlook"
      },
      "minutes": 2,
      "sources": [
        {
          "label": "arXiv:2607.09599 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2607.09599"
        },
        {
          "label": "arXiv:2502.20118 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2502.20118"
        }
      ],
      "backup": false
    },
    {
      "id": "future-staged-path",
      "title": {
        "zh": "从可控模型开始，逐步推进",
        "en": "A staged path from tractable models"
      },
      "kicker": {
        "zh": "未来规划 2 / 2 · 可实现的研究路径",
        "en": "OUTLOOK 2 / 2 · A FEASIBLE RESEARCH PATH"
      },
      "html": {
        "zh": "<div class=\"jt-roadmap\"><div class=\"jt-step\"><span class=\"jt-step-num\">近期</span><h3>建模与基准</h3><p>明确 ET / Hopfield 的正反过程与稳态，比较解析结果和模拟。</p><small>产出：模型假设、观测量、可计算的界</small></div><div class=\"jt-step\"><span class=\"jt-step-num\">中期</span><h3>优化与训练</h3><p>纳入权重与优化器记忆，检验几何和谱协议，以扩散模型交叉验证。</p><small>产出：同质量基线、有效条件与反例</small></div><div class=\"jt-step\"><span class=\"jt-step-num\">后续</span><h3>量子推广</h3><p>从可解析量子 Hopfield 入手，分别检验资源认证与任务性能。</p><small>产出：经典比较与完整资源核算</small></div></div><p class=\"jt-note\">理论与计算为主：工作站、共享 CPU / GPU，逐步组建小团队。</p>",
        "en": "<div class=\"jt-roadmap\"><div class=\"jt-step\"><span class=\"jt-step-num\">Near term</span><h3>Models and benchmarks</h3><p>Specify ET/Hopfield forward/reverse processes and steady states; compare analysis with simulations.</p><small>Outputs: assumptions, observables and calculable bounds</small></div><div class=\"jt-step\"><span class=\"jt-step-num\">Next stage</span><h3>Optimization and training</h3><p>Include weights and optimizer memory; test geometric and spectral protocols, with diffusion-model checks.</p><small>Outputs: matched-quality baselines, validity conditions and counterexamples</small></div><div class=\"jt-step\"><span class=\"jt-step-num\">Further work</span><h3>Quantum extensions</h3><p>Start with tractable quantum Hopfield models; assess resources and task performance separately.</p><small>Outputs: classical comparisons and complete resource accounting</small></div></div><p class=\"jt-note\">Theory and computation: a workstation, shared CPU/GPU access and a gradually growing team.</p>"
      },
      "notes": {
        "zh": "执行上先把规模控制住。近期以 ET 和可解 Hopfield 建立基准，写清假设、正反过程和观测量，让解析推导与模拟互相检查。中期再加入训练权重和优化器记忆，检验几何或谱优化，并用扩散模型考察适用范围。量子可解模型可以同步探索，随后在同一任务和完整成本口径下与经典方法比较。这些阶段以可核查产出组织，不预先承诺普适提速或节能。研究以理论计算为主，依托工作站和共享算力逐步建立小团队。最后回到今天报告的主线。",
        "en": "The practical starting point is a controlled model size. Near-term work will establish ET and solvable Hopfield benchmarks with explicit assumptions, forward and reverse processes, and observables, checking analysis against simulations. The next stage adds training weights and optimizer memory, tests geometric or spectral protocols, and uses diffusion models to probe their range of validity. Tractable quantum models can be explored in parallel, followed by comparisons with classical methods on the same task and cost basis. The stages are organized around verifiable outputs, without assuming universal speed or energy gains. This is mainly theoretical and computational work, supported by a workstation, shared computing resources and a gradually growing team. I will close by returning to the central question of this talk."
      },
      "section": {
        "zh": "未来展望",
        "en": "Outlook"
      },
      "minutes": 2,
      "sources": [
        {
          "label": "arXiv:2607.09599 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2607.09599"
        },
        {
          "label": "arXiv:2502.20118 · 预印本 / Preprint",
          "url": "https://arxiv.org/abs/2502.20118"
        }
      ],
      "backup": false
    },
    {
      "id": "closing",
      "section": {
        "zh": "总结与合作",
        "en": "Synthesis"
      },
      "minutes": 1,
      "title": {
        "zh": "让动力学可设计，让改进可检验",
        "en": "Make dynamics designable and improvements verifiable"
      },
      "kicker": {
        "zh": "感谢各位老师与国内外合作者",
        "en": "Thank you to the audience and my collaborators"
      },
      "html": {
        "zh": "<div class=\"cols-3\"><article class=\"card\"><h3>系统性</h3><p>三条研究线相连：<br>制备与认证、随机热力学、量子热机。</p></article><article class=\"card\"><h3>独立性</h3><p>已发表独著与一作／共同通讯成果，<br>支持独立提出和推进研究问题。</p></article><article class=\"card\"><h3>发展性</h3><p>量子优化与认证预印本，<br>持续拓展制备、测量与控制问题。</p></article></div><p class=\"closing-line\">谢谢，欢迎讨论。</p>",
        "en": "<div class=\"cols-3\"><article class=\"card\"><h3>Continuity</h3><p>Connected work on preparation, fluctuations and quantum engines.</p></article><article class=\"card\"><h3>Independence</h3><p>Published sole-author and first/co-corresponding work support independent research.</p></article><article class=\"card\"><h3>Development</h3><p>Quantum-optimization and certification preprints extend preparation, measurement and control.</p></article></div><p class=\"closing-line\">Thank you. I welcome your questions.</p>"
      },
      "notes": {
        "zh": "最后归纳三点。第一，过去成果有清晰的科学主线：从目标态制备与认证，到一致的随机过程描述，再到量子热机和可达到的控制协议。第二，两篇已发表独著，以及一作和共同通讯的合作成果，体现了独立开展研究与合作推进问题的不同经验。第三，量子优化和认证的预印本显示这些方法仍在发展，进一步发展制备、认证与优化方法。感谢国内外合作者，也感谢各位老师的时间，欢迎就科学问题、个人贡献和下一步研究提出问题。",
        "en": "I will close with three points. The completed work has a connected progression from preparation and certification, through consistent stochastic descriptions, to quantum engines and attainable control. Published sole-author and first/co-corresponding results demonstrate complementary independent and collaborative experience. Current quantum-optimization and certification preprints show continuing development, extending preparation, certification and control methods. Thank you to my collaborators and to the audience. I welcome questions about the science, contributions and future work."
      },
      "sources": [
        {
          "label": {
            "zh": "个人主页",
            "en": "Homepage"
          },
          "url": "https://chenjinfu00.github.io/"
        }
      ],
      "backup": false
    },
    {
      "id": "qa-independence",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "问答：独立性与研究延续",
        "en": "Discussion: independence and continuity"
      },
      "kicker": {
        "zh": "备用 · 个人贡献",
        "en": "Backup · Individual contributions"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>如何体现研究独立性？</h3><p>两篇独著：PRE 2022、PRR 2022<br>PRX Energy 2023 共同第一作者<br>PRE 2024、PRB 2026 第一作者及共同通讯</p></article><article class=\"card\"><h3>未来研究与原合作方向的关系？</h3><p>保留几何、控制、谱隙与涨落方法<br>以学习动力学的一致性与固定质量优化为独立问题<br>阶段性成果可由小团队逐步完成</p></article></div><div class=\"callout\">项目 12147157：展示项目经历；具体承担职责依原始记录确认。</div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Evidence of independence?</h3><p>Two sole-author papers: PRE 2022 and PRR 2022<br>Co-first author: PRX Energy 2023<br>First/co-corresponding: PRE 2024 and PRB 2026</p></article><article class=\"card\"><h3>Relation to previous collaborations?</h3><p>Retain geometry, control, gap and fluctuation methods<br>Study learning-dynamics consistency and fixed-quality optimization<br>Staged questions can be pursued by a small team</p></article></div><div class=\"callout\">Project No. 12147157: listed as project experience; verify the exact role against original records.</div>"
      },
      "notes": {
        "zh": "回答独立性时先举独著，再说明一作与通讯作者工作中的具体贡献，避免只报论文数量。未来方向要用独立问题来表达：什么模型可以有自洽描述、在同质量同资源下什么优化真正有效。谈基金时只陈述核实的编号与主题；负责人和经费信息应以原始项目记录为准。",
        "en": "Lead with sole-author work and then specify contributions to first- and corresponding-author papers. Frame the future agenda around independent questions: consistency conditions and genuine improvements with matched quality and resources. Grant leadership and budgets require the original records."
      },
      "sources": [
        {
          "label": "PRE 106, 054108 (2022)",
          "url": "https://doi.org/10.1103/PhysRevE.106.054108"
        },
        {
          "label": "PRR 4, 023252 (2022)",
          "url": "https://doi.org/10.1103/PhysRevResearch.4.023252"
        },
        {
          "label": "PRB 113, 184313 (2026)",
          "url": "https://doi.org/10.1103/r43j-qfj5"
        }
      ],
      "backup": true
    },
    {
      "id": "qa-ai",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "问答：热力学描述是否成立？",
        "en": "Discussion: is the thermodynamic description valid?"
      },
      "kicker": {
        "zh": "备用 · AI 研究的关键边界",
        "en": "Backup · Boundaries of the AI agenda"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>模型“能量”就是电耗吗？</h3><p>不是。模型能量函数、统计不可逆性和物理散热分别定义；硬件能耗需物理实现与测量模型。</p></article><article class=\"card\"><h3>SGD 能直接视为热噪声吗？</h3><p>一般不能。需显式分析小批量噪声、状态依赖性、优化器记忆与稳态条件。</p></article></div><div class=\"callout\">如果 Gibbs / 度量假设不成立：报告失效条件，转向一般随机控制与路径概率。</div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Does model energy equal electricity use?</h3><p>No. Model energy, statistical irreversibility and physical dissipation require separate definitions; hardware energy needs realization and measurement models.</p></article><article class=\"card\"><h3>Is SGD noise thermal noise?</h3><p>Not generally. Analyze mini-batch noise, state dependence, optimizer memory and stationary-state conditions explicitly.</p></article></div><div class=\"callout\">If Gibbs or metric assumptions fail: report the failure conditions and use general stochastic control or path probabilities.</div>"
      },
      "notes": {
        "zh": "这个备用页用于避免把跨学科规划讲得过满。可先解释模型层面的定义，再说明怎样检验。现阶段不声称已经证明人工智能节能，也不把任何随机优化器当作热浴。条件失败时仍然可以研究路径概率、不可逆性和控制问题，但结论要使用相应的模型语言。",
        "en": "Use this slide to state definitions and tests before making cross-disciplinary claims. The agenda does not yet establish AI energy savings and does not treat arbitrary optimizers as thermal baths. When equilibrium assumptions fail, path probabilities and control remain possible, with model-appropriate conclusions."
      },
      "sources": [],
      "backup": true
    },
    {
      "id": "qa-gap-quantum",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "问答：怎样定义真正的改进？",
        "en": "Discussion: what counts as a genuine improvement?"
      },
      "kicker": {
        "zh": "备用 · 比较口径",
        "en": "Backup · Comparison criteria"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>谱隙增大就是收敛更快吗？</h3><p>需同时指定初态、误差范数和目标误差。检查瞬态、非正规性与累计代价，固定生成元资源。</p></article><article class=\"card\"><h3>有量子资源就是量子优势吗？</h3><p>资源认证与任务优势分开。比较强经典基线并计入编码、制备、读取和重复采样。</p></article></div><div class=\"callout\">共同标准：相同任务、相同质量、完整资源口径、可复现实验。</div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Does a larger gap guarantee faster convergence?</h3><p>Specify the initial state, norm and target error; test transients, non-normality and cumulative cost at fixed generator resources.</p></article><article class=\"card\"><h3>Do quantum resources imply an advantage?</h3><p>Separate resource certification from task advantage; count encoding, preparation, readout and repeated sampling against strong classical baselines.</p></article></div><div class=\"callout\">Shared criteria: matched task and quality, complete resource accounting and reproducible tests.</div>"
      },
      "notes": {
        "zh": "对改进的追问，先把比较条件列清楚，再给出具体结论。谱隙是一个量，但不是所有有限时间过程的完整评价。量子资源是一个性质，也不是计算性能的完整证明。把这些区分讲清楚，能够让规划更可信。",
        "en": "When asked about improvement, state comparison conditions before the conclusion. A gap is one quantity, not a complete description of finite-time dynamics. A quantum resource is one property, not a full performance proof."
      },
      "sources": [
        {
          "label": "PRB 113, 184313 (2026)",
          "url": "https://doi.org/10.1103/r43j-qfj5"
        },
        {
          "label": "arXiv:2511.07523 · Preprint",
          "url": "https://arxiv.org/abs/2511.07523"
        }
      ],
      "backup": true
    },
    {
      "id": "teaching",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "教学基础与学生训练设想",
        "en": "Teaching background and student training"
      },
      "kicker": {
        "zh": "备用 · 教学与培养",
        "en": "Backup · Teaching & training"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>已有助教经历</h3><p>高等量子力学 · 2017.09—2018.01<br>群论 · 2019.09—2020.01<br>北京计算科学研究中心研究生课程</p></article><article class=\"card\"><h3>拟开展的训练</h3><p>从随机过程、开放量子系统到数值方法<br>解析小模型 + 数值验证 + 文献讨论<br>以可复现代码和清晰贡献记录组织课题</p></article></div><div class=\"callout\">教学设想：结合物理推导与计算练习，帮助学生理解模型假设和结果的适用边界。</div>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Teaching-assistant experience</h3><p>Advanced Quantum Mechanics · Sep 2017–Jan 2018<br>Group Theory · Sep 2019–Jan 2020<br>Graduate courses at Beijing Computational Science Research Center</p></article><article class=\"card\"><h3>Planned student training</h3><p>Stochastic processes, open quantum systems and numerical methods<br>Analytical models, numerical checks and literature discussion<br>Reproducible code and explicit contribution records</p></article></div><div class=\"callout\">Teaching approach: combine physical derivations and computational exercises, emphasizing assumptions and validity.</div>"
      },
      "notes": {
        "zh": "教学部分基于真实助教经历，没有新增独立授课或指导学生的经历。可以介绍我希望如何将研究方法转化成学生训练：从可解析的小模型开始，理解随机过程和量子主方程，再加入数值计算与文献讨论。涉及课程承担时，根据学院需要安排，不把拟开课程写成已经开设。",
        "en": "The teaching record is limited to the stated TA experience; there is no additional instructor-of-record or supervision claim. Planned training starts with tractable models, stochastic processes and quantum master equations, followed by computation and literature discussion. Proposed teaching should be coordinated with institutional needs."
      },
      "sources": [
        {
          "label": {
            "zh": "个人主页",
            "en": "Homepage"
          },
          "url": "https://chenjinfu00.github.io/"
        }
      ],
      "backup": true
    },
    {
      "id": "papers-thermo",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "代表作索引 · 热力学与最优控制",
        "en": "Selected papers · Thermodynamics & optimal control"
      },
      "kicker": {
        "zh": "备用 · 论文与署名",
        "en": "Backup · Publications & authorship"
      },
      "html": {
        "zh": "<div class=\"paper-list\"><article><div><h3>热力学长度的有限时间测量外推</h3><p>第一作者</p></div><a href=\"https://doi.org/10.1103/PhysRevE.104.034117\" target=\"_blank\" rel=\"noopener noreferrer\">PRE 104, 034117 (2021)</a></article><article><div><h3>等温捷径最小能耗的测地线路径</h3><p>第二作者；Editors’ Suggestion</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.128.230603\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 128, 230603 (2022)</a></article><article><div><h3>有限时间膜分离的测地线能耗下界</h3><p>共同第一作者</p></div><a href=\"https://doi.org/10.1103/PRXEnergy.2.033003\" target=\"_blank\" rel=\"noopener noreferrer\">PRX Energy 2, 033003 (2023)</a></article><article><div><h3>布朗热机的捷径优化</h3><p>独著</p></div><a href=\"https://doi.org/10.1103/PhysRevE.106.054108\" target=\"_blank\" rel=\"noopener noreferrer\">PRE 106, 054108 (2022)</a></article><article><div><h3>布朗热机最大功率的最优控制理论</h3><p>第一作者、共同通讯</p></div><a href=\"https://doi.org/10.1103/PhysRevE.110.L042105\" target=\"_blank\" rel=\"noopener noreferrer\">PRE 110, L042105 (2024)</a></article></div>",
        "en": "<div class=\"paper-list\"><article><div><h3>Extrapolating the thermodynamic length with finite-time measurements</h3><p>First author</p></div><a href=\"https://doi.org/10.1103/PhysRevE.104.034117\" target=\"_blank\" rel=\"noopener noreferrer\">PRE 104, 034117 (2021)</a></article><article><div><h3>Geodesic Path for the Minimal Energy Cost in Shortcuts to Isothermality</h3><p>Second author; Editors’ Suggestion</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.128.230603\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 128, 230603 (2022)</a></article><article><div><h3>Geodesic Lower Bound of the Energy Consumption to Achieve Membrane Separation within Finite Time</h3><p>Co-first author</p></div><a href=\"https://doi.org/10.1103/PRXEnergy.2.033003\" target=\"_blank\" rel=\"noopener noreferrer\">PRX Energy 2, 033003 (2023)</a></article><article><div><h3>Optimizing Brownian heat engine with shortcut strategy</h3><p>Sole author</p></div><a href=\"https://doi.org/10.1103/PhysRevE.106.054108\" target=\"_blank\" rel=\"noopener noreferrer\">PRE 106, 054108 (2022)</a></article><article><div><h3>Optimal control theory for maximum power of Brownian heat engines</h3><p>First and co-corresponding author</p></div><a href=\"https://doi.org/10.1103/PhysRevE.110.L042105\" target=\"_blank\" rel=\"noopener noreferrer\">PRE 110, L042105 (2024)</a></article></div>"
      },
      "notes": {
        "zh": "备用索引页。每条均可打开正式论文页面，必要时针对方法、适用条件和署名回答。",
        "en": "Backup index. Each entry links to the publication for discussion of methods, assumptions and authorship."
      },
      "sources": [],
      "backup": true
    },
    {
      "id": "papers-manybody",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "代表作索引 · 多体、涨落与量子信息",
        "en": "Selected papers · Many-body, fluctuations & quantum information"
      },
      "kicker": {
        "zh": "备用 · 论文与发表状态",
        "en": "Backup · Publications & status"
      },
      "html": {
        "zh": "<div class=\"paper-list\"><article><div><h3>加速经典与量子多体系统的热化</h3><p>第一作者、共同通讯；已发表</p></div><a href=\"https://doi.org/10.1103/r43j-qfj5\" target=\"_blank\" rel=\"noopener noreferrer\">PRB 113, 184313 (2026)</a></article><article><div><h3>增强绝热态制备的谱隙优化</h3><p>共同通讯；已发表</p></div><a href=\"https://doi.org/10.1103/cslt-x32n\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 135, 090602 (2025)</a></article><article><div><h3>涨落定理的协变形式</h3><p>共同通讯；Editors’ Suggestion</p></div><a href=\"https://doi.org/10.1103/xlmq-g6m5\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 134, 237102 (2025)</a></article><article><div><h3>有限时间一阶相变的遍历性破缺与标度</h3><p>共同通讯；已发表</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.134.177101\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 134, 177101 (2025)</a></article><article><div><h3>Bell 不等式量子违背优化</h3><p>第一作者、共同通讯；预印本</p></div><a href=\"https://arxiv.org/abs/2511.07523\" target=\"_blank\" rel=\"noopener noreferrer\">arXiv:2511.07523 · Preprint</a></article></div>",
        "en": "<div class=\"paper-list\"><article><div><h3>Boosting thermalization of classical and quantum many-body systems</h3><p>First and co-corresponding; published</p></div><a href=\"https://doi.org/10.1103/r43j-qfj5\" target=\"_blank\" rel=\"noopener noreferrer\">PRB 113, 184313 (2026)</a></article><article><div><h3>Spectral Gap Optimization for Enhanced Adiabatic State Preparation</h3><p>Co-corresponding; published</p></div><a href=\"https://doi.org/10.1103/cslt-x32n\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 135, 090602 (2025)</a></article><article><div><h3>Promoting Fluctuation Theorems into Covariant Forms</h3><p>Co-corresponding; Editors’ Suggestion</p></div><a href=\"https://doi.org/10.1103/xlmq-g6m5\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 134, 237102 (2025)</a></article><article><div><h3>Ergodicity Breaking and Scaling Relations for Finite-Time First-Order Phase Transition</h3><p>Co-corresponding; published</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.134.177101\" target=\"_blank\" rel=\"noopener noreferrer\">PRL 134, 177101 (2025)</a></article><article><div><h3>Optimizing quantum violation for multipartite facet Bell inequalities</h3><p>First and co-corresponding; preprint</p></div><a href=\"https://arxiv.org/abs/2511.07523\" target=\"_blank\" rel=\"noopener noreferrer\">arXiv:2511.07523 · Preprint</a></article></div>"
      },
      "notes": {
        "zh": "注意已发表与预印本状态分开。PRB 的 DOI 为 r43j-qfj5，协变涨落定理 PRL 的 DOI 为 xlmq-g6m5；采用出版社核查后的链接。",
        "en": "Keep published articles distinct from preprints. Links use verified publisher DOIs, including r43j-qfj5 for the PRB and xlmq-g6m5 for the covariant PRL."
      },
      "sources": [],
      "backup": true
    },
    {
      "id": "prl-index",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "五篇 PRL：完整署名与发表索引",
        "en": "Five PRLs: complete authorship and publication index"
      },
      "kicker": {
        "zh": "备用 · 三篇共同通讯，另外两篇为合作作者",
        "en": "Backup · Three co-corresponding, two other co-authorships"
      },
      "html": {
        "zh": "<div class=\"paper-list\"><article><div><h3>Experimental Test of the 1/τ-Scaling Entropy Generation in Finite-Time Thermodynamics</h3><p>第三作者；非通讯作者</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.125.210601\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 125, 210601 (2020)</a></article><article><div><h3>Geodesic Path for the Minimal Energy Cost in Shortcuts to Isothermality</h3><p>第二作者；非通讯作者；编辑推荐</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.128.230603\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 128, 230603 (2022)</a></article><article><div><h3>Ergodicity Breaking and Scaling Relations for Finite-Time First-Order Phase Transition</h3><p>第二作者；共同通讯作者（与全海涛）</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.134.177101\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 134, 177101 (2025)</a></article><article><div><h3>Promoting Fluctuation Theorems into Covariant Forms</h3><p>第二作者；共同通讯作者（与全海涛）；编辑推荐</p></div><a href=\"https://doi.org/10.1103/xlmq-g6m5\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 134, 237102 (2025)</a></article><article><div><h3>Spectral Gap Optimization for Enhanced Adiabatic State Preparation</h3><p>第二作者；共同通讯作者（与 K. S. Rai、P. Emonts）</p></div><a href=\"https://doi.org/10.1103/cslt-x32n\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 135, 090602 (2025)</a></article></div>",
        "en": "<div class=\"paper-list\"><article><div><h3>Experimental Test of the 1/τ-Scaling Entropy Generation in Finite-Time Thermodynamics</h3><p>Third author</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.125.210601\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 125, 210601 (2020)</a></article><article><div><h3>Geodesic Path for the Minimal Energy Cost in Shortcuts to Isothermality</h3><p>Second author; Editors’ Suggestion</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.128.230603\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 128, 230603 (2022)</a></article><article><div><h3>Ergodicity Breaking and Scaling Relations for Finite-Time First-Order Phase Transition</h3><p>Co-corresponding author</p></div><a href=\"https://doi.org/10.1103/PhysRevLett.134.177101\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 134, 177101 (2025)</a></article><article><div><h3>Promoting Fluctuation Theorems into Covariant Forms</h3><p>Co-corresponding author; Editors’ Suggestion</p></div><a href=\"https://doi.org/10.1103/xlmq-g6m5\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 134, 237102 (2025)</a></article><article><div><h3>Spectral Gap Optimization for Enhanced Adiabatic State Preparation</h3><p>Co-corresponding author</p></div><a href=\"https://doi.org/10.1103/cslt-x32n\" target=\"_blank\" rel=\"noopener\">Physical Review Letters 135, 090602 (2025)</a></article></div>"
      },
      "notes": {
        "zh": "备用页：五篇全部列出，三篇二〇二五年共同通讯重点讲解。二〇二〇年标度实验为第三作者，二〇二二年测地线工作为第二作者；两项都不称为共同通讯。编辑推荐为二〇二二年测地线与二〇二五年协变涨落两篇。",
        "en": "All five PRLs are listed. The three 2025 co-corresponding papers form the main highlights. I was third author on the 2020 experimental scaling paper and second author on the 2022 geodesic paper, not corresponding author. Editors’ Suggestions apply to the 2022 geodesic and 2025 covariant papers."
      },
      "sources": [],
      "backup": true
    },
    {
      "id": "sole-author-index",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "独立研究：已发表与预印本分别列示",
        "en": "Independent research: published and preprint work"
      },
      "kicker": {
        "zh": "备用 · 已发表独著 2 篇；另有独著预印本",
        "en": "Backup · Two published sole-author papers, plus a sole-author preprint"
      },
      "html": {
        "zh": "<div class=\"paper-list\"><article><div><h3>Optimizing Brownian heat engine with shortcut strategy</h3><p>已发表独著</p></div><a href=\"https://doi.org/10.1103/PhysRevE.106.054108\" target=\"_blank\" rel=\"noopener\">Physical Review E 106, 054108 (2022)</a></article><article><div><h3>Speeding up quantum adiabatic processes with a dynamical quantum geometric tensor</h3><p>已发表独著</p></div><a href=\"https://doi.org/10.1103/PhysRevResearch.4.023252\" target=\"_blank\" rel=\"noopener\">Physical Review Research 4, 023252 (2022)</a></article><article><div><h3>Thermodynamically Consistent Lindbladians for Quantum Stochastic Thermodynamics</h3><p>独著预印本，不增加已发表独著数量</p></div><a href=\"https://arxiv.org/abs/2502.20118\" target=\"_blank\" rel=\"noopener\">arXiv:2502.20118</a></article></div>",
        "en": "<div class=\"paper-list\"><article><div><h3>Optimizing Brownian heat engine with shortcut strategy</h3><p>Published sole-author paper</p></div><a href=\"https://doi.org/10.1103/PhysRevE.106.054108\" target=\"_blank\" rel=\"noopener\">Physical Review E 106, 054108 (2022)</a></article><article><div><h3>Speeding up quantum adiabatic processes with a dynamical quantum geometric tensor</h3><p>Published sole-author paper</p></div><a href=\"https://doi.org/10.1103/PhysRevResearch.4.023252\" target=\"_blank\" rel=\"noopener\">Physical Review Research 4, 023252 (2022)</a></article><article><div><h3>Thermodynamically Consistent Lindbladians for Quantum Stochastic Thermodynamics</h3><p>Sole-author preprint; separate from published count</p></div><a href=\"https://arxiv.org/abs/2502.20118\" target=\"_blank\" rel=\"noopener\">arXiv:2502.20118</a></article></div>"
      },
      "notes": {
        "zh": "独立性优先用两篇已经发表的独著说明。热力学一致 Lindbladian 是独著预印本，体现延续，但不能把已发表独著数写成三篇。",
        "en": "Use the two published sole-author papers as primary evidence of independence. The consistent-Lindbladian manuscript is a separate sole-author preprint, showing continuity without increasing the published count."
      },
      "sources": [],
      "backup": true
    },
    {
      "id": "preprint-index-1",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "发展性工作索引 · 1/2",
        "en": "Developing research index · 1/2"
      },
      "kicker": {
        "zh": "备用 · 公开预印本，发表状态核查于 2026.10.14",
        "en": "Backup · Public preprints, status checked 14 October 2026"
      },
      "html": {
        "zh": "<div class=\"paper-list\"><article><div><h3>Generalized Nonlinear Imaginary-Time Evolution</h3><p>第三作者；共同通讯作者（与 Hao Wang）</p></div><a href=\"https://arxiv.org/abs/2607.09599\" target=\"_blank\" rel=\"noopener\">arXiv:2607.09599</a></article><article><div><h3>Optimizing and Certifying Multipartite Permutationally Invariant Bell Inequalities</h3><p>第一作者；共同通讯作者（CV，作者 HTML 列联络邮箱）</p></div><a href=\"https://arxiv.org/abs/2607.08462\" target=\"_blank\" rel=\"noopener\">arXiv:2607.08462</a></article><article><div><h3>Extending Covariant Fluctuation Theorems into Quantum Regime through Quasiprobability Approach</h3><p>第三作者；共同通讯作者（与全海涛）；前两位共同第一作者</p></div><a href=\"https://arxiv.org/abs/2606.14519\" target=\"_blank\" rel=\"noopener\">arXiv:2606.14519</a></article></div><p class=\"jt-section-note\">Bell 两篇存在作者声明的内容重叠；这里列作品记录，不声称五个独立新方向。</p>",
        "en": "<div class=\"paper-list\"><article><div><h3>Generalized Nonlinear Imaginary-Time Evolution</h3><p>Co-corresponding</p></div><a href=\"https://arxiv.org/abs/2607.09599\" target=\"_blank\" rel=\"noopener\">arXiv:2607.09599</a></article><article><div><h3>Optimizing and Certifying Multipartite Permutationally Invariant Bell Inequalities</h3><p>First & co-corresponding</p></div><a href=\"https://arxiv.org/abs/2607.08462\" target=\"_blank\" rel=\"noopener\">arXiv:2607.08462</a></article><article><div><h3>Extending Covariant Fluctuation Theorems into Quantum Regime through Quasiprobability Approach</h3><p>Co-corresponding</p></div><a href=\"https://arxiv.org/abs/2606.14519\" target=\"_blank\" rel=\"noopener\">arXiv:2606.14519</a></article></div><p class=\"jt-section-note\">The Bell manuscripts have declared overlap; this is a manuscript index, not five independent new directions.</p>"
      },
      "notes": {
        "zh": "截至十月十四日，五篇 arXiv 公开登记未提供期刊发表引用或期刊 DOI，因此一律按预印本显示，不声称已接收。NITE 的正确编号为二六零七点零九五九九。",
        "en": "As checked on 14 October, the five arXiv records do not list journal references or journal DOIs. They are shown as preprints, without an acceptance claim. The NITE identifier is 2607.09599."
      },
      "sources": [],
      "backup": true
    },
    {
      "id": "preprint-index-2",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "发展性工作索引 · 2/2",
        "en": "Developing research index · 2/2"
      },
      "kicker": {
        "zh": "备用 · 公开预印本，发表状态核查于 2026.10.14",
        "en": "Backup · Public preprints, status checked 14 October 2026"
      },
      "html": {
        "zh": "<div class=\"paper-list\"><article><div><h3>Optimizing quantum violation for multipartite facet Bell inequalities</h3><p>第一作者；共同通讯作者（CV，作者 HTML 列联络邮箱）</p></div><a href=\"https://arxiv.org/abs/2511.07523\" target=\"_blank\" rel=\"noopener\">arXiv:2511.07523</a></article><article><div><h3>Thermodynamically Consistent Lindbladians for Quantum Stochastic Thermodynamics</h3><p>独著预印本（不增加已发表独著的数量）</p></div><a href=\"https://arxiv.org/abs/2502.20118\" target=\"_blank\" rel=\"noopener\">arXiv:2502.20118</a></article></div><p class=\"jt-section-note\">Bell 两篇存在作者声明的内容重叠；这里列作品记录，不声称五个独立新方向。</p>",
        "en": "<div class=\"paper-list\"><article><div><h3>Optimizing quantum violation for multipartite facet Bell inequalities</h3><p>First & co-corresponding</p></div><a href=\"https://arxiv.org/abs/2511.07523\" target=\"_blank\" rel=\"noopener\">arXiv:2511.07523</a></article><article><div><h3>Thermodynamically Consistent Lindbladians for Quantum Stochastic Thermodynamics</h3><p>Sole-author preprint</p></div><a href=\"https://arxiv.org/abs/2502.20118\" target=\"_blank\" rel=\"noopener\">arXiv:2502.20118</a></article></div><p class=\"jt-section-note\">The Bell manuscripts have declared overlap; this is a manuscript index, not five independent new directions.</p>"
      },
      "notes": {
        "zh": "截至十月十四日，五篇 arXiv 公开登记未提供期刊发表引用或期刊 DOI，因此一律按预印本显示，不声称已接收。NITE 的正确编号为二六零七点零九五九九。",
        "en": "As checked on 14 October, the five arXiv records do not list journal references or journal DOIs. They are shown as preprints, without an acceptance claim. The NITE identifier is 2607.09599."
      },
      "sources": [],
      "backup": true
    },
    {
      "id": "source-notes",
      "section": {
        "zh": "问答与备用",
        "en": "Discussion"
      },
      "minutes": 0,
      "title": {
        "zh": "材料口径与报告使用说明",
        "en": "Sources and presentation notes"
      },
      "kicker": {
        "zh": "备用 · 可核查的材料",
        "en": "Backup · Traceable material"
      },
      "html": {
        "zh": "<div class=\"cols\"><article class=\"card\"><h3>材料依据</h3><p>当前中英文 Research Profile 与论文目录<br>已发表论文与公开 arXiv 版本<br>未来仅依据研究计划 v8</p></article><article class=\"card\"><h3>报告结构</h3><p>27 页主报告，40 分钟<br>过去成果 31 分钟；未来 2 页、4 分钟<br>补充索引与问答页不计主报告</p></article></div><p class=\"jt-section-note\">34 篇发表：2026 年 8 月 CV；5 PRL / 2 独著：论文目录；Scholar 918 / h16：2026.10.13。</p>",
        "en": "<div class=\"cols\"><article class=\"card\"><h3>Sources</h3><p>Current bilingual Research Profile and publication list<br>Published articles and public arXiv versions<br>Future work based on research plan v8</p></article><article class=\"card\"><h3>Structure</h3><p>27 main slides, 40 minutes<br>31 minutes of research; two future slides, 4 minutes<br>Indices and Q&A are backup slides</p></article></div><p class=\"jt-section-note\">34 published: August 2026 CV; 5 PRLs / 2 sole-author papers: publication list; Scholar 918 / h16: 13 October 2026.</p>"
      },
      "notes": {
        "zh": "本次修改以十月十七日报告为目标。主要变化是按简历三条研究线组织过去成果，突出三篇共同通讯 PRL、两篇已发表独著和明确标为预印本的发展性工作。未来仅保留两页，以研究计划 v8 为准。合作者按当前机构分组；未公开探索没有加入主报告。项目具体职责仍需本人依据原始记录核对。",
        "en": "The revision targets the 17 October talk. Completed research follows the three CV lines, emphasizing three co-corresponding PRLs, two published sole-author papers and explicitly labeled preprints. Future work uses only two slides based on plan v8. Collaborators are grouped by current institutions. Unreviewed private explorations are excluded from the scientific claims. Verify the exact project role against the original record."
      },
      "sources": [
        {
          "label": {
            "zh": "个人主页",
            "en": "Homepage"
          },
          "url": "https://chenjinfu00.github.io/"
        },
        {
          "label": "Google Scholar · 2026-10-13",
          "url": "https://scholar.google.ca/citations?user=2n7U598AAAAJ&hl=en"
        }
      ],
      "backup": true
    }
  ]
};
