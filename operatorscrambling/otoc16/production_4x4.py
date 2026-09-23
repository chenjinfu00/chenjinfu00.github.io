import numpy as np, scipy.sparse as sp
from scipy.sparse.linalg import expm_multiply
import time, sys, json
from pathlib import Path
if __package__:
    from .production_lattice import (validate_hamiltonian, validate_site,
                                     forward_trajectory, commutator_squared)
else:
    from production_lattice import (validate_hamiltonian, validate_site,
                                    forward_trajectory, commutator_squared)

def build_lattice_4x4(pbc=True):
    Lx=Ly=4
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

def manhattan(i,j,Lx=4,Ly=4):
    xi,yi = i%Lx, i//Lx
    xj,yj = j%Lx, j//Lx
    dx = min(abs(xi-xj), Lx-abs(xi-xj))
    dy = min(abs(yi-yj), Ly-abs(yi-yj))
    return dx+dy

def main():
    N = 16
    seed = int(sys.argv[1]) if len(sys.argv) > 1 else 0
    n_times = int(sys.argv[2]) if len(sys.argv) > 2 else 10
    t_max = float(sys.argv[3]) if len(sys.argv) > 3 else 6.0
    if n_times < 1 or not np.isfinite(t_max) or t_max < 0:
        raise ValueError("n_times must be positive and t_max finite and nonnegative")
    fname = (Path(sys.argv[4]) if len(sys.argv) > 4 else
             Path(__file__).with_name(f"prod4x4_seed{seed}_corrected.json"))
    if fname.exists() or fname.is_symlink():
        raise FileExistsError(f"Output already exists: {fname}")
    # one representative probe site per Manhattan shell r=0..4 (source=site 0)
    # r=0: on-site; r=1: (1,0); r=2: (2,0) [note: (1,1) is also r=2, a different
    # symmetry orbit on a square lattice -- not sampled here, see caveat in writeup]
    # r=3: (2,1); r=4: (2,2)
    probes = {0:0, 1:1, 2:2, 3:6, 4:10}

    t0=time.time()
    bonds = build_lattice_4x4(pbc=True)
    H = build_H(N, bonds, J=1.0, hx=1.05, hz=0.5)
    t1=time.time()
    print(f"[seed {seed}] N={N} dim={1<<N} nnz(H)={H.nnz} build={t1-t0:.2f}s", flush=True)

    rng = np.random.default_rng(seed)
    d = 1<<N
    psi = rng.normal(size=d) + 1j*rng.normal(size=d)
    psi /= np.linalg.norm(psi)
    src = 0

    times = np.linspace(0, t_max, n_times)

    # forward trajectory of psi itself (shared)
    t2=time.time()
    traj_psi = forward_trajectory(H, psi, times)
    print(f"[seed {seed}] forward traj(psi) {time.time()-t2:.2f}s", flush=True)

    # shared building block Y(t) = W(t)|psi> = U(-t) W U(t) |psi>, W=Z_src
    # (independent of which probe V_j we look at -- computed once, reused for every shell)
    Yt = [None]*n_times
    t3=time.time()
    for k in range(n_times):
        tk = times[k]
        Wpsi_fwd = apply_Z(traj_psi[k], N, src)
        Yt[k] = Wpsi_fwd if tk == 0 else expm_multiply(1j*H*tk, Wpsi_fwd)
    print(f"[seed {seed}] shared Y(t) series {time.time()-t3:.2f}s", flush=True)

    results = {}
    for r, j in probes.items():
        tp0 = time.time()
        Vj_psi = apply_Z(psi, N, j)
        traj_Vj = forward_trajectory(H, Vj_psi, times)
        Cvals = []
        for k in range(n_times):
            tk = times[k]
            Wt_Vj_fwd = apply_Z(traj_Vj[k], N, src)
            chi = Wt_Vj_fwd if tk == 0 else expm_multiply(1j*H*tk, Wt_Vj_fwd)   # = W(t) V_j |psi>
            C = commutator_squared(Yt[k], chi, N, j)
            Cvals.append(C)
        results[r] = Cvals
        print(f"[seed {seed}] shell r={r} (site {j}, dist check={manhattan(src,j)}) done in {time.time()-tp0:.2f}s "
              f"C(t)={[f'{c:.3f}' for c in Cvals]}", flush=True)

    out = {"seed": seed, "times": times.tolist(), "Lx": 4, "Ly": 4, "N": N,
           "J": 1.0, "hx": 1.05, "hz": 0.5, "pbc": True, "src": src,
           "method": "Haar-state typicality, squared commutator norm", "n_samples": 1,
           "aggregation": "one representative per shell (not a shell average)",
           "probes": {str(r): j for r, j in probes.items()},
           "results": {str(r): v for r, v in results.items()}}
    with fname.open("x") as f:
        json.dump(out, f, indent=2, allow_nan=False)
    print(f"[seed {seed}] TOTAL {time.time()-t0:.2f}s -> wrote {fname}", flush=True)

if __name__=='__main__':
    main()
