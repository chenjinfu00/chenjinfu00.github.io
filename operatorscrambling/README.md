# Operator Spreading Lab

本地 OTOC 和算符增长探索工具。2026-09-21 已修复数值与展示问题；完整证据见 [核验报告](AUDIT_2026-09-21.md)。原始 JSON/PNG 保留，旧说明另存为 [历史记录](README_legacy_2026-09-20.md)，其中的旧 Lanczos 增长率结论已撤回。

## 打开网页

直接用浏览器打开 `index.html` 或 `operator_spreading_lab.html`，不需要安装前端依赖或启动服务器。Google Fonts 不可用时退回系统字体。两个页面可通过顶部链接切换。仓库根目录的 `index.html` 会转到主页面，便于启用 GitHub Pages 后直接访问站点根地址。

- **Operator Spreading Lab**：无限温度 OTOC 与局域自关联。
- **Operator Growth Diagnostics**（文件名仍是 `operator_growth_bound.html`）：无界整数格点上的有限阶 Lanczos 系数。页面不再报告未经证明的李雅普诺夫上界。

界面支持中英文、深浅色、停止计算、已计算参数与当前编辑参数的区分。OTOC 页支持下载 JSON/CSV，增长页支持下载带完整运行快照的 JSON。此次修订已做数值、控制逻辑、语言键和页面结构检查；自动浏览器受本地文件访问策略限制，尚未完成实际浏览器视觉验收。

## OTOC 页的两种方法

| 方法 | 尺寸上限 | 结果含义 | 误差与限制 |
|---|---:|---|---|
| Pauli 算符空间 | 9 格点 | 计算完整归一化迹；各格点及全壳层平均 | 双精度 Taylor 数值演化，有限尺寸 |
| 态矢量 typicality | 16 格点 | 一个随机态估计迹，每个 Manhattan 距离取一个代表点 | 有采样误差；单样本没有误差条；不是全壳层平均 |

两者均采用 Pauli 矩阵（本征值 ±1）、ℏ=1，计算

`C_j(t) = 2^(-N) Tr([W(t),V_j]†[W(t),V_j])`。

量子 C 的范围为 [0,4]，2 只是常用参考值。网页中的态矢量传播也是缩放 Taylor 方法；Python 使用 SciPy `expm_multiply`，不能把网页引擎称为 Lanczos/Krylov 传播器。

先用小格点运行。态矢量模式建议从 6–12 个时间点开始，再改变种子、加密时间网格。较密网格不会再被错误地偷偷抬到至少 20 点。源码保留已有的慢设置自动降低初始点数机制，界面会同步显示实际点数；手动编辑时间点数后，点击运行会保留它。

结果说明：

- 代表点模式只导出实际算过的格点，不把代表点曲线复制到同壳层其他格点。
- `P_H = (W,H)^2/(H,H)` 是能量投影贡献，一般不等于完整晚时平台；其他守恒量和简并仍可能保留记忆。
- 前沿速度来自 C=0.5 的到达拟合，至少需要两个到达壳层和正斜率。它不是热力学极限速度，也不自动构成上界。
- 前沿后波动仅在最远壳层实际越过阈值后，再等待 2 个时间单位的窗口内计算；没有窗口时显示空值。
- 导出 JSON 记录实际运行的模型、积分器、随机种子、时间网格、空间采样、实际格点与曲线。导出格点编号从 0 开始，界面从 1 开始。
- 范数漂移检查数值演化误差，不等于采样误差或完整正确性证明。

## 新结果核验结论

### 必须撤回的旧结论

旧无限格点 Lanczos 使用了错误的反对称递推符号。正确形式是

`q_next ∝ L q_n + b_n q_(n-1), L=i[H,·]`。

旧 `krylov_bn_infinite.json` 和 `krylov_bn_plot.png` 从 b₂ 起不能作为正确结果。默认模型的修正值：

| n | 旧 b_n | 修正 b_n |
|---:|---:|---:|
| 1 | 2.100000000 | 2.100000000 |
| 2 | 5.885575588 | 4.123105626 = √17 |
| 3 | 10.977054065 | 5.523000037 |
| 4 | 16.847464658 | 6.777935580 |
| 8 | 44.646478255 | 10.836412712 |

本次只复算并交叉核验到 8 阶。有限项差分不能证明渐近斜率，更不能据此给出严格李雅普诺夫上界。相关理论讨论的是渐近增长，并在一维含有额外对数修正：[Parker et al., PRX 9, 041017 (2019)](https://arxiv.org/abs/1812.08657)。

增长页的“能量窗口”种子是有限窗口总能量，边界从第一步起就参与动力学；窗口半宽 K 现在独立固定，不再随步数改变。它不是非平凡的严格 q=0 守恒能量模。

### 得到支持的结果与未完成的验证

- OTOC 算符顺序正确。小系统稠密矩阵、谱分解、完整计算基迹及解析解检查通过。
- N=12 的 4×3、3×4、seed=0 在 t=0 和 t=2/3 的短重算与原数据吻合，差约 10^-15。这不等于验证了全部时间点、全部种子或 N=16 全数据。
- 原 N=16 seed0 有 6 个时间点，seed1 有 10 个；不得按数组下标平均。当前存档不能直接复现旧 README 中所谓“两种子平均”的全表。
- DTWA 历史数据晚时可达数千至上万，是经典平方 Poisson 括号的增长；不能解释成有界量子 Pauli OTOC。小格子上测出的比值也不能直接用作大格点量子速度的可靠修正。

原数据没有被覆盖。修正后的短重算和核验详情位于 `otoc16/*corrected*.json`、[Python 报告](otoc16/PYTHON_AUDIT.md) 与 [增长页报告](GROWTH_AUDIT.md)。

## Python 程序与检查

依赖 NumPy 和 SciPy。以下命令从本目录执行；本机选用 `/opt/anaconda3/bin/python`，其他环境可换成相应解释器。

```sh
/opt/anaconda3/bin/python -B tests/test_python_numerics.py -v
node tests/test_spreading_engine.cjs
node --test tests/test_growth_engine.cjs
```

主网页测试中的稠密参考默认使用 `/opt/anaconda3/bin/python`，可通过 `OTOC_PYTHON` 指定其他已有解释器。

| 脚本 | 用途 |
|---|---|
| `otoc16/feasibility.py` | N 可行性；默认用 N 的最接近平方的因子对构图，也可传入明确 Lx/Ly |
| `otoc16/production_lattice.py` | 任意矩形格点；对非源点壳层做全部格点平均 |
| `otoc16/production_4x4.py` | 固定 4×4；每个距离一个代表点 |
| `otoc16/dtwa_infinite.py` | 经典自旋与切向传播近似；必须单独检查时间步和尺寸收敛 |
| `otoc16/krylov_infinite.py` | 修正后的反对称 Lanczos，默认 8 步；不输出数值李雅普诺夫界 |

计算程序默认将新输出写在脚本旁，使用带 `corrected` 的文件名；如果同名结果已存在，会在计算前拒绝执行，最终写入也禁止覆盖。普通回归测试不会重写数据。改变模型或计算范围后，应同时检查输出元数据与文件名，不要将不同设置的文件直接混合。

以下三个程序支持最后一个可选参数指定新输出路径，便于保留不同时间网格的结果（默认文件名不包含时间网格）：

```text
production_lattice.py Lx Ly seed n_times t_max [output_path]
production_4x4.py seed n_times t_max [output_path]
krylov_infinite.py n_max [output_path]
```

例如：`/opt/anaconda3/bin/python -B otoc16/production_lattice.py 4 3 0 3 0.5 otoc16/prod_4x3_seed0_nt3_t0p5_corrected.json`。显式相对路径以当前目录为基准；已有文件同样不会被覆盖。
