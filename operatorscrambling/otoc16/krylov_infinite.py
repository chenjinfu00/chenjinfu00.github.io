"""
Exact operator-growth Krylov/Lanczos recursion for the OTOC, on a genuinely
UNBOUNDED (infinite, non-periodic) 2D square lattice.

Why this is a different (and better-founded) route to "the infinite plane"
than the DTWA script (dtwa_infinite.py):

  - DTWA is a classical approximation, without a controlled error estimate
    for this spin-1/2 calculation, and its own "trajectory" lives
    on a finite lattice you have to choose large enough.
  - A finite PERIODIC lattice (all of production_4x4.py / production_lattice.py)
    has an exact wraparound artifact: on a small torus, the "far" site is
    reachable via several equally-short paths around the torus, which
    measurably speeds up the apparent butterfly front (see project note
    sec. 12).
  - This script instead works directly with the exact Heisenberg-picture
    operator-growth generator used by the browser tool / production_*.py,
    but represents a Pauli string as a Python dict keyed by *unbounded*
    integer lattice coordinates instead of a fixed bit-string of length N.
    There is no lattice size to choose, hence no periodic wraparound and no
    finite-N cutoff other than a Lanczos step count. Coefficients have no
    spatial truncation, but still carry floating-point/orthogonality error.
    The finite sequence alone does not determine a spatial OTOC or a rate bound.

Method (Parker, Cao, Avdoshkin, Scaffidi, Altman, PRX 9, 041017 (2019),
"A Universal Operator Growth Hypothesis" -- already in this project's
literature list, sec. 8.4): build the Krylov basis of the seed operator
O_0 = Z_(0,0) under the Liouvillian L = i[H, .] (represented, as in the
browser tool, as a REAL, antisymmetric linear map on real coefficients of
Hermitian Pauli strings). Because L is exactly antisymmetric w.r.t. the
real Hilbert-Schmidt inner product (A,B) = Tr[AB]/2^N, the Lanczos
recursion has *zero* diagonal (a_n = 0 identically -- provably, since
(v, Lv) = -(Lv, v) = -(v, Lv) => (v, Lv) = 0 for ANY v), leaving the pure
three-term recursion for the off-diagonal "Lanczos coefficients" b_n:

    |A_1) = L|O_0),                      b_1 = ||A_1||,  |O_1) = |A_1)/b_1
    |A_{n+1}) = L|O_n) + b_n |O_{n-1}),   b_{n+1} = ||A_{n+1}||,  |O_{n+1}) = |A_{n+1})/b_{n+1}

The "universal operator growth hypothesis" conjecture is that b_n grows
*linearly*, b_n ~ alpha*n, for a generic (non-integrable, no extra
symmetry) local Hamiltonian, and that this slope alpha bounds the quantum
Lyapunov exponent under additional assumptions: lambda_L <= 2*alpha.
Finite differences b_n-b_{n-1} do not establish the asymptotic alpha,
an upper/lower bound on alpha, or a quantum Lyapunov bound. In particular,
monotonicity of finitely many differences does not prove future monotonicity.
b_1 is only a first-step check; it cannot detect a wrong recurrence sign.
"""
import numpy as np
import time, sys, json
from pathlib import Path

# --- Pauli algebra: 0=I,1=X,2=Y,3=Z. PROD[a][b] = (k,c) meaning a*b = i^k * c
PROD = [[(0, a) for a in range(4)] for _ in range(4)]
for a in range(4):
    PROD[0][a] = (0, a)
    PROD[a][0] = (0, a)
    PROD[a][a] = (0, 0)
_transitions = [(1, 2, 1, 3), (2, 1, 3, 3), (2, 3, 1, 1), (3, 2, 3, 1), (3, 1, 1, 2), (1, 3, 3, 2)]
for a, b, k, c in _transitions:
    PROD[a][b] = (k, c)


def anticommutes(p, s):
    """p, s: dict{site: letter}. True iff the Pauli strings anticommute."""
    cl = 0
    for site, pl in p.items():
        sl = s.get(site, 0)
        if pl and sl and pl != sl:
            cl ^= 1
    return cl == 1


def mul(p, s):
    """Return (k mod 4, result_dict) for p*s = i^k * result."""
    k = 0
    out = {}
    for site in set(p) | set(s):
        pa, sa = p.get(site, 0), s.get(site, 0)
        kk, cc = PROD[pa][sa]
        k += kk
        if cc:
            out[site] = cc
    return k & 3, frozenset(out.items())


NBRS = [(1, 0), (-1, 0), (0, 1), (0, -1)]


def candidate_terms(supp_sites, J, hx, hz):
    """All local Hamiltonian terms touching any site in supp_sites, each once."""
    terms = []
    seen_bonds = set()
    for (x, y) in supp_sites:
        terms.append((frozenset({((x, y), 1)}), -hx))          # on-site X
        if hz:
            terms.append((frozenset({((x, y), 3)}), -hz))      # on-site Z
        for dx, dy in NBRS:
            nb = (x + dx, y + dy)
            key = frozenset({(x, y), nb})
            if key not in seen_bonds:
                seen_bonds.add(key)
                terms.append((frozenset({((x, y), 3), (nb, 3)}), -J))  # ZZ bond
    return terms


def apply_L(vec, J, hx, hz):
    """vec: dict{frozenset_of_(site,letter): coeff}. Returns L(vec) = i[H, vec] as the
    same kind of dict, using the browser tool's real-antisymmetric-generator convention
    (amp = +2 / -2 depending on the power of i in the Pauli product)."""
    out = {}
    # collect every distinct string's support once (strings can repeat across the vec)
    for s_fs, a_s in vec.items():
        if a_s == 0:
            continue
        s = dict(s_fs)
        supp = list(s.keys())
        for p, coeff_h in candidate_terms(supp, J, hx, hz):
            p_d = dict(p)
            if not anticommutes(p_d, s):
                continue
            k, r = mul(p_d, s)
            power = (k + 1) & 3
            if power & 1:
                raise RuntimeError("internal: i[P,S] is not Hermitian")
            amp = 2.0 if power == 0 else -2.0
            out[r] = out.get(r, 0.0) + coeff_h * amp * a_s
    return {k: v for k, v in out.items() if v != 0.0}


def norm(vec):
    return np.sqrt(sum(v * v for v in vec.values()))


def scale(vec, c):
    return {k: v * c for k, v in vec.items()}


def axpy(a, x, y):
    """a*x + y, all dict-valued."""
    out = dict(y)
    for k, v in x.items():
        out[k] = out.get(k, 0.0) + a * v
    return {k: v for k, v in out.items() if v != 0.0}


def lanczos_b(n_max, J=1.0, hx=1.05, hz=0.5, verbose=True,
              return_basis=False, breakdown_tol=1e-12):
    """Return coefficients and nonzero-string counts (not sector dimensions).

    Stop at numerical breakdown, recording the terminating zero coefficient
    and a zero string count. Optional basis retention is for small validation
    runs; the default retains only two vectors. No reorthogonalization is used.
    """
    if not isinstance(n_max, (int, np.integer)) or n_max < 0:
        raise ValueError("n_max must be a nonnegative integer")
    if not np.all(np.isfinite([J, hx, hz, breakdown_tol])) or breakdown_tol < 0:
        raise ValueError("couplings and breakdown_tol must be finite; tolerance >= 0")
    O0 = {frozenset({((0, 0), 3)}): 1.0}
    O_prev = None
    O_cur = O0
    bs = []
    dims = [len(O0)]
    basis = [O0] if return_basis else None
    t0 = time.time()
    for n in range(1, n_max + 1):
        A = apply_L(O_cur, J, hx, hz)
        residual_scale = max(norm(A), bs[-1] if bs else 0.0)
        if O_prev is not None:
            # (O_{n-1}, L O_n) = -(L O_{n-1}, O_n) = -b_n.
            A = axpy(bs[-1], O_prev, A)
        b = norm(A)
        if not np.isfinite(b):
            raise FloatingPointError("non-finite Lanczos residual")
        if b <= breakdown_tol * residual_scale:
            bs.append(0.0)
            dims.append(0)
            if verbose:
                print(f"  n={n:2d}  b_n=0 (Krylov breakdown)", flush=True)
            break
        bs.append(b)
        O_prev = O_cur
        O_cur = scale(A, 1.0 / b) if b > 0 else A
        dims.append(len(O_cur))
        if return_basis:
            basis.append(O_cur)
        if verbose:
            print(f"  n={n:2d}  b_n={b:8.4f}  dim(O_n)={len(O_cur):7d}  "
                  f"({time.time()-t0:.1f}s elapsed)", flush=True)
    return (bs, dims, basis) if return_basis else (bs, dims)


def validate_b1(hx):
    """Exact, lattice-independent closed form: b_1 = 2*abs(hx) (derived from
    [H,Z_0] = -hx[X_0,Z_0] = 2i*hx*Y_0, since the hz and ZZ terms commute
    with Z_0). Checks the seed action only; higher coefficients need
    independent recurrence and orthogonality checks."""
    return 2.0 * abs(hx)


def main():
    n_max = int(sys.argv[1]) if len(sys.argv) > 1 else 8
    path = (Path(sys.argv[2]) if len(sys.argv) > 2 else
            Path(__file__).with_name(f"krylov_bn_infinite_corrected_n{n_max}.json"))
    if path.exists() or path.is_symlink():
        raise FileExistsError(f"Output already exists: {path}")
    J, hx, hz = 1.0, 1.05, 0.5

    expected_b1 = validate_b1(hx)
    print(f"Analytic check: b_1 should be exactly 2*abs(hx) = {expected_b1:.4f}", flush=True)

    bs, dims = lanczos_b(n_max, J=J, hx=hx, hz=hz)
    if bs:
        print(f"\nb_1 computed = {bs[0]:.4f}  (expected {expected_b1:.4f}, "
              f"match={'YES' if abs(bs[0]-expected_b1)<1e-9 else 'NO -- BUG'})")
    print("\nb_n sequence:", [f"{b:.4f}" for b in bs])
    print("dim(O_n) sequence:", dims)

    with path.open("x") as f:
        json.dump({"J": J, "hx": hx, "hz": hz, "b_n": bs, "dims": dims,
                   "generator": "i[H,.]", "recurrence": "L O_n + b_n O_(n-1)",
                   "dims_meaning": "nonzero Pauli strings in each basis vector",
                   "requested_steps": n_max, "lyapunov_bound": None,
                   "caveat": "Finite coefficients do not establish an asymptotic slope or rate bound."},
                  f, indent=2, allow_nan=False)
    print(f"Wrote {path}")


if __name__ == '__main__':
    main()
