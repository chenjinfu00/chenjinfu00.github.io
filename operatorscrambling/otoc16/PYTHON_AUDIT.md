# Python numerical audit — 2026-09-21

The Lanczos recurrence had a proven sign error. The stored infinite-lattice
sequence is invalid after its first coefficient. The finite-lattice OTOC
formula is correct; dense checks and two bounded N=12 reruns confirm the
checked values. No full N=16 calculation was performed.

Scope: the five Python programs in this directory, all 11 original JSON
files, and small numerical regression tests. Original JSON/PNG files were
preserved. README and both HTML files were read as source context but not
edited or opened in a browser. Statements in those files are not corrected
by this Python audit and may still present the invalid historical claims.

## 1. Critical: skew-Lanczos recurrence

For the real Hilbert–Schmidt inner product and `L = i[H,.]`, `L` is
skew-adjoint. Consequently

```text
<O_(n-1), L O_n> = -<L O_(n-1), O_n> = -b_n
A_(n+1) = L O_n + b_n O_(n-1)
```

The old code subtracted the previous vector. At step two this leaves an
unwanted `-2*b_1*O_0` component instead of canceling it. For the current
parameters, `b_1=2*abs(hx)=2.1` and the square-lattice analytic result is
`b_2=sqrt(4*hz**2 + 16*J**2)=sqrt(17)`, provided `hx != 0`.
The wrong formula gives `sqrt(17 + 4*2.1**2)=5.885575587824865`, exactly
the value in `krylov_bn_infinite.json`. The old normalized second vector
has overlap `-0.713609049332114` with the seed, contradicting orthogonality.
Checking only `b_1` could never catch this failure.

| n | Original stored b_n | Corrected b_n |
| ---: | ---: | ---: |
| 1 | 2.100000000 | 2.100000000 |
| 2 | 5.885575588 | 4.123105626 |
| 3 | 10.977054065 | 5.523000037 |
| 4 | 16.847464658 | 6.777935580 |
| 5 | 23.259454784 | 7.352418847 |
| 6 | 30.081662107 | 8.625357830 |
| 7 | 37.229672433 | 9.584443010 |
| 8 | 44.646478255 | 10.836412712 |

The 8-step rerun took about 0.8 seconds in the recurrence. Its maximum
Gram-matrix error is `2.80e-14`. Tests independently construct dense Pauli
matrices and a five-spin star Hamiltonian, checking `i[H,O]` and the first
three coefficients. Through that order no noncommuting interaction leaves
the star; this does not assert that a finite star reproduces higher orders
of the infinite square lattice. All 8 recurrence residuals and basis
orthogonality are checked separately.

The implementation now stops at numerical breakdown rather than normalizing
roundoff or producing an arbitrary tail. A terminating zero is recorded;
no zero basis vector is retained. Negative transverse fields use
`b_1=2*abs(hx)`. `dims` means the number of nonzero Pauli-string coefficients
in each basis vector, not the dimension of the reachable sector. Tiny
floating-point residues can affect this support count. Three-term Lanczos
still lacks full reorthogonalization; validation here covers eight steps,
not arbitrary long recurrences.

## 2. Historical rate claims are unsupported

The original sequence and `krylov_bn_plot.png` cannot support the old
growth-slope inference. Independently of the sign bug, finitely many
differences `b_n-b_(n-1)` do not establish an asymptotic slope, future
monotonicity, or a rigorous lower/upper bound on that slope. Even a lower
bound on an asymptotic slope would not supply an upper bound on a rate
from a relation of the form `lambda <= 2*alpha`.

Thus the historical extrapolation `alpha ~ 9–10`, the claimed strict
lower bound from a finite increasing sequence, and a numerical quantum
Lyapunov bound of approximately 18–20 are not established by these data.
The corrected result explicitly sets `lyapunov_bound` to null. Eight
coefficients alone also do not reconstruct a spatial OTOC or determine a
butterfly velocity. No replacement rate or velocity is claimed.

## 3. OTOC and propagation checks

With Hermitian involutions `W` and `V` and a normalized state, the original
`2-2*Re(<W(t) psi | V W(t) V psi>)` is equal to
`||W(t) V psi - V W(t) psi||^2`. Its operator ordering is correct. Both
production programs now evaluate the latter expression to avoid
cancellation of nearly equal numbers at early times, including tiny
negative values at time zero. Results are not artificially clipped.

Independent dense checks cover N=1, 2, and 4, every probe site, time zero,
an early time, and finite times. They compare:

- Tensor-product Hamiltonians and Pauli operators to all three sparse builders.
- Dense matrix exponentials and Hermitian spectral decomposition to sparse propagation.
- The old correlator formula, the new commutator norm, and dense commutators.
- Complete computational-basis averages to the exact normalized trace,
  eliminating typicality error from the trace check.
- The actual 2x2 production main loop and shell output to dense results
  for the same seeded random state.

Maximum observed errors were `1.37e-15` for propagation, `1.78e-15` for
state OTOCs, and `8.88e-16` for normalized-trace OTOCs. A closed, three-vector
single-spin Krylov problem also checks the spectral sign convention:
`T[n+1,n]=b_(n+1)`, `T[n,n+1]=-b_(n+1)`, diagonalize Hermitian `i*T`, and
use phases `exp(-i*eigenvalue*t)`. Reconstruction agrees with exact
Heisenberg evolution through `t=4`, within `1.34e-15`. This verifies a
closed small system; it does not imply an 8-step infinite-lattice truncation
is exact at finite times. There is no spectral propagator in the five
original Python scripts; spectral decomposition is an independent test
oracle, not a new production backend. HTML propagation was not executed.

The shared time-grid helper retains the efficient uniform-grid path and
handles singleton, zero-duration, repeated, and nonuniform grids. Invalid
grids are rejected. Hamiltonian bonds, vector dimensions, and Pauli sites
are validated before use.

Bounded production reruns used N=12, seed 0, and only `t=0, 2/3`:

| Lattice | Max shell difference from original at t=2/3 |
| --- | ---: |
| 4x3 | 7.22e-16 |
| 3x4 | 9.44e-16 |

Each took about 0.36 seconds of reported computation. This supports the
checked historical points, not every seed, time, or N=16 result.

## 4. Geometry and DTWA fixes

`feasibility.py` accepted arbitrary N but always constructed 4x4 bonds.
For N below 16, out-of-range spin bits acted as fixed +1 values in the
diagonal energy, silently changing interactions into fields/constants.
For larger N, extra spins lacked the intended bonds. The script now uses
the closest factor pair of N by default (12 -> 4x3, 16 -> 4x4), prints it,
accepts explicit `Lx Ly`, and requires their product to equal N. The old
probe at site 5 is preserved for N>=6 and kept in bounds for smaller N.
The fixed N=16 in the explicitly named 4x4 production program is appropriate.

DTWA fixes:

- Periodic axes of length two duplicated the same neighbor in opposite
  directions, doubling that interaction relative to the quantum code's
  unique-bond convention. Neighbors are now unique. Tests cover lengths
  1 through 4 in both directions with open and periodic boundaries.
- The first requested time was always treated as zero. Integration now
  advances from zero even when the first output time is positive. A
  single-spin analytic check verifies the corrected behavior.
- Invalid times, sample counts, steps, source/probe sites, and duplicate
  probe labels are rejected. Duplicate labels previously overwrote data;
  this interface does not implicitly perform shell averaging.
- Documentation now identifies the sampled spin length as sqrt(3), limits
  moment-matching claims to first/second symmetrized moments, and labels
  the observable as a classical squared Poisson bracket.

Finite-difference checks validate both the tangent right-hand side and
the integrated tangent against perturbed nonlinear trajectories. A short
2x2 run with four paired samples and seed 11 tests RK4 step convergence:
the maximum change from dt=.02 to .01 is `9.21e-7`, and from .01 to .005
is `5.26e-8`. The report stores the corrected dt=.005 results. Four samples
are a numerical smoke test, not a statistically converged physics result.

The length-two and nonzero-first-time bugs do not explain the historical
4x4/26x26 data, whose named lengths exceed two and whose times start at zero.
However, `dtwa_validate_4x4.json` reaches `6292.71` and has 50 entries above
4; `dtwa_large_26x26.json` reaches `23594.63` and has 52 entries above 4.
For Pauli quantum commutator squares, `0 <= C <= 4`. These large values
are possible for classical tangent growth but invalidate interpretation
as late-time quantum OTOCs. They alone do not prove the classical solver
is incorrect. A central source on a torus does not remove wraparound;
infinite-plane claims still need size convergence.

## 5. Imported results and reproducibility

All 11 original JSON files parse, contain finite numeric series, and
have result lengths matching their time grids. The JSON validation report
records their schemas, ranges, and SHA-256 hashes, plus hashes of all three
original PNGs. The old N=16 seed-0 grid has 6 points, while seed 1 has 10:
averaging by array index would mix different physical times. No such
averaging is performed by these five scripts. The DTWA 4x4 file contains
only `times` and `results`; sample count, actual geometry, timestep,
probes, and seed are absent, so its provenance cannot be fully recovered.
Its filename also differs from the current CLI validation default, 4x3.

The N=16 producer uses one representative per shell; the N=12 producer
averages every site in each shell. Those are different observables when
a shell contains inequivalent directions. New output records this
distinction and model/probe metadata. Seeded Haar-state estimates are
not exact traces; rotated lattices require a correspondingly permuted
state for identical finite-sample results.

Changed source paths, relative to the workspace root:

- `Operatorscrambling/otoc16/krylov_infinite.py`
- `Operatorscrambling/otoc16/production_lattice.py`
- `Operatorscrambling/otoc16/production_4x4.py`
- `Operatorscrambling/otoc16/feasibility.py`
- `Operatorscrambling/otoc16/dtwa_infinite.py`
- `Operatorscrambling/tests/test_python_numerics.py` (new)
- `Operatorscrambling/otoc16/PYTHON_AUDIT.md` (new)

New result files in this directory:

- `krylov_bn_infinite_corrected_n8.json`
- `python_numerics_corrected_validation.json` (dense, spectral, DTWA, and legacy evidence)
- `prod_4x3_seed0_corrected.json` (only t=0 and 2/3)
- `prod_3x4_seed0_corrected.json` (only t=0 and 2/3)

Validation environment: `/opt/anaconda3/bin/python`, NumPy 2.3.5,
SciPy 1.16.3. The initial JSON report records 18 passing regression tests
in approximately 0.924 seconds. The current suite has 19 tests, including
an output-preflight regression with computation mocked across both
production CLIs, Krylov, and both DTWA modes. It checks default and explicit
paths and proves an existing output fails before computation or file opening.
Run from the workspace root:

```sh
/opt/anaconda3/bin/python -B Operatorscrambling/tests/test_python_numerics.py -v
```

Or from the transferable `Operatorscrambling` directory:

```sh
/opt/anaconda3/bin/python -B tests/test_python_numerics.py -v
```

Paths resolve from the test file, independently of the current directory.
The Python suite lives beside `tests/test_spreading_engine.cjs`.

Artifact-generation commands from the workspace root (updated for the test relocation):

```sh
/opt/anaconda3/bin/python -B Operatorscrambling/tests/test_python_numerics.py -v --report
/opt/anaconda3/bin/python -B Operatorscrambling/otoc16/krylov_infinite.py 8
/opt/anaconda3/bin/python -B Operatorscrambling/otoc16/production_lattice.py 4 3 0 2 0.6666666666666666
/opt/anaconda3/bin/python -B Operatorscrambling/otoc16/production_lattice.py 3 4 0 2 0.6666666666666666
```

From inside `Operatorscrambling`, omit the `Operatorscrambling/` prefix
in these commands, including `tests/test_python_numerics.py -v --report`.
Reports still go to `otoc16` regardless of the current directory.

Writers check for an existing output (including a dangling symlink) before
expensive work, then retain exclusive creation mode for the final write.
The final check also protects against a file created after the preflight.
This includes the test runner's `--report` mode, which checks before running
the suite. Rerun tests without `--report` for ordinary verification.

Optional final positional output paths are now supported (from inside
`Operatorscrambling`):

```text
production_lattice.py Lx Ly seed n_times t_max [output_path]  # argument 6
production_4x4.py seed n_times t_max [output_path]            # argument 4
krylov_infinite.py n_max [output_path]                       # argument 2
```

Invoke these scripts with `/opt/anaconda3/bin/python -B otoc16/` before
the script name. Explicit relative paths are relative to the current
directory; absolute paths are also accepted. Supply preceding positional
arguments when specifying the output path. Defaults remain the corrected
filenames beside the scripts; production defaults do not encode the time
grid, so use distinct explicit filenames for different grids. For example:

```sh
/opt/anaconda3/bin/python -B otoc16/production_lattice.py 4 3 0 3 0.5 otoc16/prod_4x3_seed0_nt3_t0p5_corrected.json
/opt/anaconda3/bin/python -B otoc16/krylov_infinite.py 8 otoc16/krylov_n8_another_corrected.json
```

These are usage examples, not additional runs performed during the audit.
DTWA retains its default output paths with early preflight. No output is
overwritten, even when its name is supplied explicitly. The 8-step sequence is also recomputed by
the regression suite. No packages were installed and no original result
file was regenerated or removed.
