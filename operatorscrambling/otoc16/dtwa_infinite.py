"""
Discrete Truncated Wigner Approximation (DTWA) for the OTOC on a large
(quasi-infinite) 2D lattice.

Model (same as production_4x4.py / production_lattice.py):
    H = -J * sum_<ij> Z_i Z_j - hx * sum_i X_i - hz * sum_i Z_i

Classical approximation: each Pauli triple (X_i,Y_i,Z_i) -> a classical vector
n_i = (nx_i, ny_i, nz_i) obeying the Poisson-bracket structure
{n^a, n^b} = 2 eps^{abc} n^c (verified against the exact Heisenberg EOM for a
single spin in a field -- see the project note for the derivation). The
classical (mean-field) equation of motion is

    dn_i/dt = 2 * n_i x B_i,     B_i = (hx, 0, hz + J * sum_{j~i} nz_j)

DTWA = average many classical trajectories, each one starting from an
initial condition sampled from the "discrete Wigner function" for the
infinite-temperature (maximally mixed) state: every site independently at
one of the 8 corners (+-1,+-1,+-1) with equal probability. This exactly
reproduces <n^a_i>=0, <n^a_i n^b_j>=delta_ij delta_ab at t=0, i.e. the
symmetrized first and second moments of the maximally mixed N-qubit state.
Each sampled vector has length sqrt(3), not one. This moment matching does
not make higher-order products or nonlinear dynamics exact for spin-1/2.

OTOC via the classical Poisson bracket (Larkin-Ovchinnikov correspondence,
[A,B] <-> i*hbar*{A,B} with hbar=1 in our convention, consistent with the
i[H,O] Heisenberg EOM used throughout):

    C_r(t) = -<[Z_src(t), Z_r(0)]^2>  ~=  < {n_src^z(t), n_r^z(0)}^2 >_ensemble

Expanding the Poisson bracket of two phase-space functions (site r is the
only one n_r^z(0) depends on):

    {n_src^z(t), n_r^z(0)} = -2 * Jxz(t) * n_r^y(0) + 2 * Jyz(t) * n_r^x(0)

  where Jxz(t) = d n_src^z(t) / d n_r^x(0),  Jyz(t) = d n_src^z(t) / d n_r^y(0)

are obtained by propagating the *linearized* (tangent-space) equations of
motion alongside the nonlinear trajectory, starting from a unit x- or
y-perturbation at site r and zero everywhere else. This is exactly the
classical analogue of Heisenberg-picture operator spreading, and its
computational cost is linear in N per trajectory (no exponential blow-up),
which is the whole point: it can be run on a lattice orders of magnitude
larger than exact diagonalization / Krylov typicality can reach. Periodic
wraparound must be checked by size convergence; choosing a central source
does not remove it. The classical squared bracket is unbounded. Quantum
Pauli squared commutators lie in [0,4], so late classical growth cannot be
interpreted as a quantum OTOC or quantum Lyapunov exponent.
"""
import numpy as np
import time, sys, json
from pathlib import Path
if __package__:
    from .production_lattice import validate_lattice
else:
    from production_lattice import validate_lattice


def build_neighbors(Lx, Ly, pbc=True):
    """Return, for each site index i=x+Lx*y, the list of nearest-neighbour indices."""
    validate_lattice(Lx, Ly)
    def idx(x, y):
        return (x % Lx) + Lx * (y % Ly)
    nbrs = [[] for _ in range(Lx * Ly)]
    for y in range(Ly):
        for x in range(Lx):
            i = idx(x, y)
            for dx, dy in [(1, 0), (-1, 0), (0, 1), (0, -1)]:
                xj, yj = x + dx, y + dy
                if not pbc and not (0 <= xj < Lx and 0 <= yj < Ly):
                    continue
                j = idx(xj, yj)
                # Match the unique undirected bonds used by build_lattice;
                # +x and -x coincide on a periodic axis of length two.
                if j != i and j not in nbrs[i]:
                    nbrs[i].append(j)
    return nbrs


def neighbor_sum_matrix(nbrs, N):
    """Sparse-ish adjacency: A @ v gives, for each site, the sum of v over its neighbours."""
    rows, cols = [], []
    for i, nb in enumerate(nbrs):
        for j in nb:
            rows.append(i)
            cols.append(j)
    import scipy.sparse as sp
    A = sp.coo_matrix((np.ones(len(rows)), (rows, cols)), shape=(N, N)).tocsr()
    return A


def rhs(n, dnx, dny, A, J, hx, hz):
    """Right-hand side of the coupled nonlinear + tangent equations of motion."""
    nz = n[:, 2]
    Bz = hz + J * (A @ nz)
    # B = (hx, 0, Bz) broadcast over sites
    Bx = hx
    # dn/dt = 2 n x B
    dn = np.empty_like(n)
    dn[:, 0] = 2 * (n[:, 1] * Bz - n[:, 2] * 0.0)
    dn[:, 1] = 2 * (n[:, 2] * Bx - n[:, 0] * Bz)
    dn[:, 2] = 2 * (n[:, 0] * 0.0 - n[:, 1] * Bx)

    # tangent: d(delta n)/dt = 2*(delta n x B + n x delta B), delta B = (0,0, J * A @ delta n_z)
    def tangent(dn_):
        dBz = J * (A @ dn_[:, 2])
        out = np.empty_like(dn_)
        out[:, 0] = 2 * (dn_[:, 1] * Bz + n[:, 1] * dBz)
        out[:, 1] = 2 * (dn_[:, 2] * Bx - dn_[:, 0] * Bz - n[:, 0] * dBz)
        out[:, 2] = 2 * (-dn_[:, 1] * Bx)
        return out

    return dn, tangent(dnx), tangent(dny)


def rk4_step(n, dnx, dny, A, J, hx, hz, dt):
    k1n, k1x, k1y = rhs(n, dnx, dny, A, J, hx, hz)
    k2n, k2x, k2y = rhs(n + 0.5*dt*k1n, dnx + 0.5*dt*k1x, dny + 0.5*dt*k1y, A, J, hx, hz)
    k3n, k3x, k3y = rhs(n + 0.5*dt*k2n, dnx + 0.5*dt*k2x, dny + 0.5*dt*k2y, A, J, hx, hz)
    k4n, k4x, k4y = rhs(n + dt*k3n, dnx + dt*k3x, dny + dt*k3y, A, J, hx, hz)
    n_new = n + (dt/6)*(k1n + 2*k2n + 2*k3n + k4n)
    dnx_new = dnx + (dt/6)*(k1x + 2*k2x + 2*k3x + k4x)
    dny_new = dny + (dt/6)*(k1y + 2*k2y + 2*k3y + k4y)
    return n_new, dnx_new, dny_new


def run_dtwa(Lx, Ly, src, probes, times, n_samples, J=1.0, hx=1.05, hz=0.5,
             pbc=True, seed=0, dt_max=0.01, verbose=True):
    """
    probes: list of (r, site_index) pairs to track.
    Returns dict r -> array of C_r(t) (averaged over n_samples classical trajectories).
    """
    N = Lx * Ly
    nbrs = build_neighbors(Lx, Ly, pbc=pbc)
    times = np.asarray(times, dtype=float)
    if (times.ndim != 1 or len(times) == 0 or not np.all(np.isfinite(times))
            or np.any(times < 0) or np.any(np.diff(times) < 0)):
        raise ValueError("times must be finite, nonnegative and nondecreasing")
    if not isinstance(n_samples, (int, np.integer)) or n_samples < 1:
        raise ValueError("n_samples must be a positive integer")
    if not np.all(np.isfinite([J, hx, hz, dt_max])) or dt_max <= 0:
        raise ValueError("couplings must be finite and dt_max finite and positive")
    probes = list(probes)
    if len({r for r, _ in probes}) != len(probes):
        raise ValueError("probe labels must be unique; shell averaging is not implicit")
    if any(not isinstance(j, (int, np.integer)) or not 0 <= j < N
           for j in [src] + [j for _, j in probes]):
        raise ValueError("source and probes must lie within the lattice")
    A = neighbor_sum_matrix(nbrs, N)
    rng = np.random.default_rng(seed)

    n_times = len(times)
    acc = {r: np.zeros(n_times) for r, _ in probes}

    t0 = time.time()
    for s in range(n_samples):
        # discrete Wigner sampling: each site, each component independently +-1
        n = rng.choice([-1.0, 1.0], size=(N, 3))

        results_this_sample = {r: np.zeros(n_times) for r, _ in probes}
        for r, j in probes:
            dnx = np.zeros((N, 3)); dnx[j, 0] = 1.0
            dny = np.zeros((N, 3)); dny[j, 1] = 1.0
            ny0, nx0 = n[j, 1], n[j, 0]
            # integrate this (n, dnx, dny) triple across the whole time grid,
            # recording the src-site z-components of dnx, dny at each output time
            n_work = n.copy()
            t_cur = 0.0
            for k, t_target in enumerate(times):
                if t_target > t_cur:
                    span = t_target - t_cur
                    nsub = max(1, int(np.ceil(span / dt_max)))
                    dt = span / nsub
                    for _ in range(nsub):
                        n_work, dnx, dny = rk4_step(n_work, dnx, dny, A, J, hx, hz, dt)
                    t_cur = t_target
                Jxz = dnx[src, 2]
                Jyz = dny[src, 2]
                bracket = -2*Jxz*ny0 + 2*Jyz*nx0
                results_this_sample[r][k] = bracket**2
        for r in acc:
            acc[r] += results_this_sample[r]
        if verbose:
            print(f"  sample {s+1}/{n_samples} done ({time.time()-t0:.1f}s elapsed)", flush=True)

    for r in acc:
        acc[r] /= n_samples
    return acc


def manhattan(i, j, Lx, Ly, pbc=True):
    xi, yi = i % Lx, i // Lx
    xj, yj = j % Lx, j // Lx
    dx = abs(xi - xj); dy = abs(yi - yj)
    if pbc:
        dx = min(dx, Lx - dx); dy = min(dy, Ly - dy)
    return dx + dy


def main():
    # quick self-test / validation mode:
    #   python3 dtwa_infinite.py validate    -> run on 4x3 (N=12), compare to exact
    #   python3 dtwa_infinite.py large Lx Ly nsamples  -> run on a big lattice
    mode = sys.argv[1] if len(sys.argv) > 1 else 'validate'
    times = np.linspace(0, 6.0, 10)

    if mode == 'validate':
        Lx, Ly = 4, 3
        n_samples = int(sys.argv[2]) if len(sys.argv) > 2 else 400
        path = Path(__file__).with_name(f"dtwa_validate_{Lx}x{Ly}_corrected.json")
        if path.exists() or path.is_symlink():
            raise FileExistsError(f"Output already exists: {path}")
        probes = [(1, 1), (2, 2), (3, 6)]
        print(f"DTWA validation run: {Lx}x{Ly}, {n_samples} samples", flush=True)
        acc = run_dtwa(Lx, Ly, 0, probes, times, n_samples, seed=0)
        out = {"Lx": Lx, "Ly": Ly, "n_samples": n_samples, "times": times.tolist(),
               "src": 0, "probes": dict(probes), "seed": 0, "dt_max": 0.01,
               "J": 1.0, "hx": 1.05, "hz": 0.5, "pbc": True,
               "observable": "classical squared Poisson bracket, not exact quantum OTOC",
               "aggregation": "one representative per distance",
               "results": {str(r): v.tolist() for r, v in acc.items()}}
        with path.open("x") as f:
            json.dump(out, f, indent=2, allow_nan=False)
        for r, v in acc.items():
            print(f"r={r}: {[f'{c:.3f}' for c in v]}", flush=True)

    elif mode == 'large':
        Lx = int(sys.argv[2]) if len(sys.argv) > 2 else 30
        Ly = int(sys.argv[3]) if len(sys.argv) > 3 else 30
        n_samples = int(sys.argv[4]) if len(sys.argv) > 4 else 60
        path = Path(__file__).with_name(f"dtwa_large_{Lx}x{Ly}_corrected.json")
        if path.exists() or path.is_symlink():
            raise FileExistsError(f"Output already exists: {path}")
        src = (Lx // 2) + Lx * (Ly // 2)  # centre; PBC wraparound is translation invariant
        max_r = 6
        probes = []
        seen = set()
        for r in range(1, max_r + 1):
            # first non-source site found at this distance, scanning near the centre
            for dx in range(-r, r + 1):
                dy = r - abs(dx)
                for sdy in (dy, -dy):
                    x = (src % Lx + dx) % Lx
                    y = (src // Lx + sdy) % Ly
                    j = x + Lx * y
                    if manhattan(src, j, Lx, Ly) == r and r not in seen:
                        probes.append((r, j)); seen.add(r); break
                if r in seen:
                    break
        print(f"DTWA large-lattice run: {Lx}x{Ly} (N={Lx*Ly}), {n_samples} samples, "
              f"probes={probes}", flush=True)
        acc = run_dtwa(Lx, Ly, src, probes, times, n_samples, seed=1)
        out = {"Lx": Lx, "Ly": Ly, "n_samples": n_samples, "times": times.tolist(),
               "src": src, "probes": dict(probes), "seed": 1, "dt_max": 0.01,
               "J": 1.0, "hx": 1.05, "hz": 0.5, "pbc": True,
               "observable": "classical squared Poisson bracket, not exact quantum OTOC",
               "aggregation": "one representative per distance",
               "results": {str(r): v.tolist() for r, v in acc.items()}}
        with path.open("x") as f:
            json.dump(out, f, indent=2, allow_nan=False)
        for r, v in acc.items():
            print(f"r={r}: {[f'{c:.3f}' for c in v]}", flush=True)


if __name__ == '__main__':
    main()
