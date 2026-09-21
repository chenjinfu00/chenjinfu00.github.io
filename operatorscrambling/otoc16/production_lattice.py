import numpy as np, scipy.sparse as sp
from scipy.sparse.linalg import expm_multiply
import time, sys, json
from pathlib import Path


def validate_lattice(Lx, Ly):
    if any(not isinstance(n, (int, np.integer)) or n < 1 for n in (Lx, Ly)):
        raise ValueError("lattice lengths must be positive integers")


def validate_hamiltonian(N, bonds, J, hx, hz):
    if not isinstance(N, (int, np.integer)) or N < 1:
        raise ValueError("N must be a positive integer")
    if not np.all(np.isfinite([J, hx, hz])):
        raise ValueError("couplings must be finite")
    for i, j in bonds:
        if any(not isinstance(k, (int, np.integer)) or not 0 <= k < N for k in (i, j)) or i == j:
            raise ValueError("each bond must connect two distinct sites within N")


def validate_site(vec, N, site):
    if not isinstance(N, (int, np.integer)) or N < 1:
        raise ValueError("N must be a positive integer")
    if np.ndim(vec) != 1 or len(vec) != 1 << N:
        raise ValueError("state must be a vector of length 2**N")
    if not isinstance(site, (int, np.integer)) or not 0 <= site < N:
        raise ValueError("site must lie within N")


def forward_trajectory(H, psi, times):
    """Apply exp(-i H t), including singleton, repeated and nonuniform times."""
    times = np.asarray(times, dtype=float)
    if (times.ndim != 1 or len(times) == 0 or not np.all(np.isfinite(times))
            or np.any(times < 0) or np.any(np.diff(times) < 0)):
        raise ValueError("times must be finite, nonnegative and nondecreasing")
    # Keep the efficient interval path for production's uniform time grids.
    if (len(times) > 1 and times[-1] > times[0]
            and np.allclose(times, np.linspace(times[0], times[-1], len(times)),
                            rtol=1e-13, atol=0.0)):
        return expm_multiply(-1j*H, psi, start=times[0], stop=times[-1],
                             num=len(times), endpoint=True)
    return np.stack([np.array(psi, copy=True) if t == 0 else expm_multiply(-1j*H*t, psi)
                     for t in times])


def commutator_squared(Wt_psi, Wt_Vpsi, N, probe):
    """||[W(t), Z_probe] psi||^2, avoiding cancellation in 2-2 Re(F)."""
    comm = Wt_Vpsi - apply_Z(Wt_psi, N, probe)
    return float(np.vdot(comm, comm).real)

def build_lattice(Lx, Ly, pbc=True):
    validate_lattice(Lx, Ly)
    def idx(x,y): return (x%Lx)+(y%Ly)*Lx
    bonds=set()
    for y in range(Ly):
        for x in range(Lx):
            i=idx(x,y)
            if pbc or x+1<Lx:
                j=idx(x+1,y)
                if i!=j: bonds.add((min(i,j),max(i,j)))
            if pbc or y+1<Ly:
                j=idx(x,y+1)
                if i!=j: bonds.add((min(i,j),max(i,j)))
    return sorted(bonds)

def build_H(N, bonds, J=1.0, hx=1.05, hz=0.5):
    bonds = list(bonds)
    validate_hamiltonian(N, bonds, J, hx, hz)
    d = 1<<N
    states = np.arange(d, dtype=np.int64)
    diag = np.zeros(d, dtype=np.float64)
    for (i,j) in bonds:
        si = 1 - 2*((states>>i)&1)
        sj = 1 - 2*((states>>j)&1)
        diag += -J * si * sj
    for i in range(N):
        si = 1 - 2*((states>>i)&1)
        diag += -hz * si
    H = sp.diags(diag, format='lil')
    rows=[]; cols=[]; vals=[]
    for i in range(N):
        flipped = states ^ (1<<i)
        rows.append(states); cols.append(flipped); vals.append(np.full(d, -hx))
    rows=np.concatenate(rows); cols=np.concatenate(cols); vals=np.concatenate(vals)
    Hx = sp.coo_matrix((vals,(rows,cols)), shape=(d,d))
    H = H.tocsr() + Hx.tocsr()
    return H

def apply_Z(vec, N, site):
    validate_site(vec, N, site)
    d=len(vec); states=np.arange(d,dtype=np.int64)
    s = 1 - 2*((states>>site)&1)
    return vec*s

def manhattan(i,j,Lx,Ly,pbc=True):
    xi,yi = i%Lx, i//Lx
    xj,yj = j%Lx, j//Lx
    dx = abs(xi-xj); dy = abs(yi-yj)
    if pbc:
        dx = min(dx, Lx-dx); dy = min(dy, Ly-dy)
    return dx+dy

def main():
    Lx = int(sys.argv[1]) if len(sys.argv) > 1 else 4
    Ly = int(sys.argv[2]) if len(sys.argv) > 2 else 3
    seed = int(sys.argv[3]) if len(sys.argv) > 3 else 0
    n_times = int(sys.argv[4]) if len(sys.argv) > 4 else 10
    t_max = float(sys.argv[5]) if len(sys.argv) > 5 else 6.0
    validate_lattice(Lx, Ly)
    if n_times < 1 or not np.isfinite(t_max) or t_max < 0:
        raise ValueError("n_times must be positive and t_max finite and nonnegative")
    fname = (Path(sys.argv[6]) if len(sys.argv) > 6 else
             Path(__file__).with_name(f"prod_{Lx}x{Ly}_seed{seed}_corrected.json"))
    if fname.exists() or fname.is_symlink():
        raise FileExistsError(f"Output already exists: {fname}")
    N = Lx*Ly

    t0=time.time()
    bonds = build_lattice(Lx, Ly, pbc=True)
    H = build_H(N, bonds, J=1.0, hx=1.05, hz=0.5)
    t1=time.time()
    print(f"[{Lx}x{Ly}, seed {seed}] N={N} dim={1<<N} nnz(H)={H.nnz} build={t1-t0:.2f}s", flush=True)

    rng = np.random.default_rng(seed)
    d = 1<<N
    psi = rng.normal(size=d) + 1j*rng.normal(size=d)
    psi /= np.linalg.norm(psi)
    src = 0

    times = np.linspace(0, t_max, n_times)

    t2=time.time()
    traj_psi = forward_trajectory(H, psi, times)
    print(f"[{Lx}x{Ly}, seed {seed}] forward traj(psi) {time.time()-t2:.2f}s", flush=True)

    Yt = [None]*n_times
    t3=time.time()
    for k in range(n_times):
        tk = times[k]
        Wpsi_fwd = apply_Z(traj_psi[k], N, src)
        Yt[k] = Wpsi_fwd if tk == 0 else expm_multiply(1j*H*tk, Wpsi_fwd)
    print(f"[{Lx}x{Ly}, seed {seed}] shared Y(t) series {time.time()-t3:.2f}s", flush=True)

    # every non-source site, grouped by Manhattan shell -- with N<=12 this is cheap
    # enough to do exhaustively rather than picking one representative per shell.
    shells = {}
    for j in range(1, N):
        r = manhattan(src, j, Lx, Ly)
        shells.setdefault(r, []).append(j)

    results = {}
    for r in sorted(shells):
        acc = np.zeros(n_times)
        for j in shells[r]:
            tp0 = time.time()
            Vj_psi = apply_Z(psi, N, j)
            traj_Vj = forward_trajectory(H, Vj_psi, times)
            for k in range(n_times):
                tk = times[k]
                Wt_Vj_fwd = apply_Z(traj_Vj[k], N, src)
                chi = Wt_Vj_fwd if tk == 0 else expm_multiply(1j*H*tk, Wt_Vj_fwd)
                acc[k] += commutator_squared(Yt[k], chi, N, j)
        acc /= len(shells[r])
        results[r] = acc.tolist()
        print(f"[{Lx}x{Ly}, seed {seed}] shell r={r} ({len(shells[r])} sites, full shell avg) "
              f"C(t)={[f'{c:.3f}' for c in acc]}", flush=True)

    out = {"Lx": Lx, "Ly": Ly, "seed": seed, "times": times.tolist(),
           "N": N, "J": 1.0, "hx": 1.05, "hz": 0.5, "pbc": True, "src": src,
           "method": "Haar-state typicality, squared commutator norm",
           "n_samples": 1, "aggregation": "full Manhattan shell average",
           "shells": {str(r): sites for r, sites in shells.items()},
           "results": {str(r): v for r, v in results.items()}}
    with fname.open("x") as f:
        json.dump(out, f, indent=2, allow_nan=False)
    print(f"[{Lx}x{Ly}, seed {seed}] TOTAL {time.time()-t0:.2f}s -> wrote {fname}", flush=True)

if __name__=='__main__':
    main()
