import numpy as np, scipy.sparse as sp
from scipy.sparse.linalg import expm_multiply
import time, sys
from math import isqrt
if __package__:
    from .production_lattice import (build_lattice, validate_lattice, validate_hamiltonian,
                                     validate_site, forward_trajectory, commutator_squared)
else:
    from production_lattice import (build_lattice, validate_lattice, validate_hamiltonian,
                                    validate_site, forward_trajectory, commutator_squared)


def lattice_shape(N, Lx=None, Ly=None):
    """Use explicit dimensions, or the closest factor pair of N (N=16 -> 4x4)."""
    if not isinstance(N, (int, np.integer)) or N < 1:
        raise ValueError("N must be a positive integer")
    if Lx is None and Ly is None:
        Ly = isqrt(N)
        while N % Ly:
            Ly -= 1
        Lx = N // Ly
    if Lx is None or Ly is None:
        raise ValueError("supply both Lx and Ly")
    validate_lattice(Lx, Ly)
    if Lx * Ly != N:
        raise ValueError("Lx*Ly must equal N")
    return Lx, Ly

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

def apply_X(vec, N, site):
    validate_site(vec, N, site)
    d=len(vec); states=np.arange(d,dtype=np.int64)
    flipped = states ^ (1<<site)
    out = np.empty_like(vec)
    out[flipped] = vec
    return out

def apply_Z(vec, N, site):
    validate_site(vec, N, site)
    d=len(vec); states=np.arange(d,dtype=np.int64)
    s = 1 - 2*((states>>site)&1)
    return vec*s

def main():
    N = int(sys.argv[1]) if len(sys.argv) > 1 else 16
    n_times = int(sys.argv[2]) if len(sys.argv) > 2 else 8
    t_max = float(sys.argv[3]) if len(sys.argv) > 3 else 6.0
    # Optional positional dimensions: N n_times t_max Lx Ly.
    Lx = int(sys.argv[4]) if len(sys.argv) > 4 else None
    Ly = int(sys.argv[5]) if len(sys.argv) > 5 else None
    Lx, Ly = lattice_shape(N, Lx, Ly)
    if n_times < 1 or not np.isfinite(t_max) or t_max < 0:
        raise ValueError("n_times must be positive and t_max finite and nonnegative")

    t0=time.time()
    bonds = build_lattice(Lx, Ly, pbc=True)
    H = build_H(N, bonds, J=1.0, hx=1.05, hz=0.5)
    t1=time.time()
    print(f"Lattice={Lx}x{Ly}, N={N} sites, dim={1<<N}, nnz(H)={H.nnz}, build time={t1-t0:.2f}s", flush=True)
    print(f"H memory ~ {H.data.nbytes/1e6:.1f} MB (data) + indices", flush=True)

    rng = np.random.default_rng(0)
    d = 1<<N
    psi = rng.normal(size=d) + 1j*rng.normal(size=d)
    psi /= np.linalg.norm(psi)

    src = 0      # W acts here (butterfly source)
    probe_r = min(5, N - 1)  # preserve the historical N=16 probe, stay in bounds

    times = np.linspace(0, t_max, n_times)
    t2=time.time()
    # Forward trajectories only (these ARE batchable: same vector, many times)
    Vpsi = apply_Z(psi, N, probe_r)
    traj_psi = forward_trajectory(H, psi, times)
    traj_Vpsi = forward_trajectory(H, Vpsi, times)
    t3=time.time()
    print(f"Forward sparse exponential trajectories (2 vectors, {len(times)} steps) took {t3-t2:.2f}s", flush=True)

    # In this implementation e^{+iHt} acts on a different vector at each output
    # time, so the fixed-initial-vector interval call above does not apply.
    # Small systems can instead be propagated using a dense spectral decomposition.
    Cvals=[]
    for k in range(len(times)):
        tk = times[k]
        tstart = time.time()
        a = traj_psi[k]      # U(t)|psi>
        b = traj_Vpsi[k]     # U(t) V|psi>
        Wa = apply_Z(a, N, src)     # W U(t)|psi>
        Wb = apply_Z(b, N, src)     # W U(t) V|psi>
        if tk == 0:
            Wa_back, Wb_back = Wa, Wb
        else:
            Wa_back = expm_multiply(1j*H*tk, Wa)   # W(t)|psi>
            Wb_back = expm_multiply(1j*H*tk, Wb)   # W(t) V|psi>
        C = commutator_squared(Wa_back, Wb_back, N, probe_r)
        Cvals.append(C)
        print(f"  t={tk:.2f}  C={C:.4f}  step took {time.time()-tstart:.2f}s", flush=True)
    t4=time.time()
    print(f"OTOC evaluation loop took {t4-t3:.2f}s", flush=True)
    print("C_r(t):", [f"{c:.3f}" for c in Cvals], flush=True)
    print(f"TOTAL wall time for N={N}, one typicality sample, {len(times)} time points: {t4-t0:.2f}s", flush=True)

if __name__=='__main__':
    main()
