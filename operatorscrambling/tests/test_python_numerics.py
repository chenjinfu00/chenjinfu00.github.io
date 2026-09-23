"""Small, independent numerical checks; no N=16 production calculation.

From Operatorscrambling: /opt/anaconda3/bin/python -B tests/test_python_numerics.py -v.
From its parent workspace: /opt/anaconda3/bin/python -B Operatorscrambling/tests/test_python_numerics.py -v.
Add --report to save a new, exclusive-create JSON report beside the scripts.
"""
import contextlib
import hashlib
import io
import itertools
import json
from pathlib import Path
import sys
import unittest
from unittest.mock import patch

import numpy as np
from numpy.testing import assert_allclose
from scipy.linalg import expm
from scipy.sparse.linalg import expm_multiply

ROOT = Path(__file__).resolve().parents[1]
NUMERICS = ROOT / "otoc16"
sys.path.insert(0, str(NUMERICS))
import production_lattice as lattice
import production_4x4 as production
import feasibility
import krylov_infinite as krylov
import dtwa_infinite as dtwa

PAULI = (np.eye(2, dtype=complex), np.array([[0, 1], [1, 0]], complex),
         np.array([[0, -1j], [1j, 0]], complex), np.diag([1., -1.]))
REPORT = {"purpose": "bounded corrected audit; no N=16 rerun", "dense_validation": []}


def dense_string(letters):
    # The scripts assign site zero to the least significant computational bit.
    out = np.ones((1, 1), complex)
    for letter in reversed(letters):
        out = np.kron(out, PAULI[letter])
    return out


def dense_operator(N, site, letter):
    letters = [0] * N
    letters[site] = letter
    return dense_string(letters)


def dense_hamiltonian(N, bonds, J=1., hx=1.05, hz=.5):
    X = [dense_operator(N, j, 1) for j in range(N)]
    Z = [dense_operator(N, j, 3) for j in range(N)]
    H = np.zeros((1 << N, 1 << N), complex)
    for i, j in bonds:
        H -= J * Z[i] @ Z[j]
    for j in range(N):
        H -= hx * X[j] + hz * Z[j]
    return H


def vector_matrix(vec, sites):
    return sum((value * dense_string([dict(key).get(site, 0) for site in sites])
                for key, value in vec.items()), np.zeros((1 << len(sites),) * 2, complex))


def inner(a, b):
    return sum(value * b.get(key, 0.) for key, value in a.items())


class LatticeTests(unittest.TestCase):
    def test_existing_output_fails_before_computation(self):
        cases = [
            (lattice, ["4", "3", "0", "2", ".2"], "build_H", "prod_4x3_seed0_corrected.json"),
            (production, ["0", "2", ".2"], "build_H", "prod4x4_seed0_corrected.json"),
            (krylov, ["8"], "lanczos_b", "krylov_bn_infinite_corrected_n8.json"),
            (dtwa, ["validate", "1"], "run_dtwa", "dtwa_validate_4x3_corrected.json"),
            (dtwa, ["large", "26", "26", "1"], "run_dtwa", "dtwa_large_26x26_corrected.json"),
        ]
        for module, args, computation, default in cases:
            outputs = [None] if module is dtwa else [None, "custom-grid.json"]
            for output in outputs:
                argv = [module.__file__, *args, *([] if output is None else [output])]
                expected = NUMERICS / default if output is None else Path(output)
                with self.subTest(module=module.__name__, output=output):
                    with (patch.object(sys, "argv", argv),
                          patch.object(Path, "exists", autospec=True, return_value=True) as exists,
                          patch.object(Path, "open") as opened,
                          patch.object(module, computation) as compute):
                        with self.assertRaises(FileExistsError):
                            module.main()
                        exists.assert_called_once_with(expected)
                        compute.assert_not_called()
                        opened.assert_not_called()

    def test_sparse_builders_and_local_paulis_against_dense(self):
        for N, bonds in [(1, []), (2, [(0, 1)]), (4, lattice.build_lattice(2, 2))]:
            expected = dense_hamiltonian(N, bonds)
            psi = np.arange(1 << N) + 1j * np.arange(1 << N)[::-1]
            for module in (lattice, production, feasibility):
                assert_allclose(module.build_H(N, bonds).toarray(), expected, atol=1e-14)
                for site in range(N):
                    assert_allclose(module.apply_Z(psi, N, site), dense_operator(N, site, 3) @ psi)
            for site in range(N):
                assert_allclose(feasibility.apply_X(psi, N, site), dense_operator(N, site, 1) @ psi)

    def test_invalid_bonds_and_sites_are_rejected(self):
        for module in (lattice, production, feasibility):
            with self.assertRaises(ValueError):
                module.build_H(2, [(0, 5)])
            with self.assertRaises(ValueError):
                module.apply_Z(np.ones(4), 2, 2)
            with self.assertRaises(ValueError):
                module.apply_Z(np.ones(3), 2, 1)
        with self.assertRaises(ValueError):
            lattice.build_lattice(0, 2)

    def test_feasibility_geometry_tracks_N(self):
        for N, expected in [(1, (1, 1)), (4, (2, 2)), (6, (3, 2)),
                            (12, (4, 3)), (16, (4, 4))]:
            self.assertEqual(feasibility.lattice_shape(N), expected)
            bonds = lattice.build_lattice(*expected)
            self.assertTrue(all(0 <= i < j < N for i, j in bonds))
        self.assertEqual(feasibility.lattice_shape(12, 3, 4), (3, 4))
        with self.assertRaises(ValueError):
            feasibility.lattice_shape(12, 4, 4)
        with self.assertRaises(ValueError):
            feasibility.lattice_shape(12, 4)
        with patch.object(sys, "argv", ["feasibility.py", "4", "3", "0.2"]):
            with contextlib.redirect_stdout(io.StringIO()) as output:
                feasibility.main()
        self.assertIn("Lattice=2x2, N=4", output.getvalue())

    def test_dtwa_adjacency_matches_unique_quantum_bonds(self):
        for Lx, Ly, pbc in itertools.product(range(1, 5), range(1, 5), (False, True)):
            N = Lx * Ly
            expected = np.zeros((N, N))
            for i, j in lattice.build_lattice(Lx, Ly, pbc):
                expected[i, j] = expected[j, i] = 1
            actual = dtwa.neighbor_sum_matrix(dtwa.build_neighbors(Lx, Ly, pbc), N)
            assert_allclose(actual.toarray(), expected)


class OTOCTests(unittest.TestCase):
    def test_sparse_spectral_and_dense_propagation_and_trace(self):
        # The normalized trace is obtained without typicality error by summing
        # commutator norms over a complete computational basis.
        times = np.array([0., 1e-4, .13, .6])
        for Lx, Ly in [(1, 1), (2, 1), (2, 2)]:
            N = Lx * Ly
            d = 1 << N
            bonds = lattice.build_lattice(Lx, Ly)
            H = dense_hamiltonian(N, bonds)
            sparse = lattice.build_H(N, bonds)
            eigenvalues, eigenvectors = np.linalg.eigh(H)
            W = dense_operator(N, 0, 3)
            rng = np.random.default_rng(21)
            psi = rng.normal(size=d) + 1j * rng.normal(size=d)
            psi /= np.linalg.norm(psi)
            states = lattice.forward_trajectory(sparse, psi, times)
            error_prop = error_otoc = error_trace = 0.
            traces = []
            for k, t in enumerate(times):
                U = expm(-1j * H * t)
                spectral = (eigenvectors * np.exp(-1j * eigenvalues * t)) @ eigenvectors.conj().T
                error_prop = max(error_prop, float(np.max(np.abs(U - spectral))),
                                 float(np.max(np.abs(states[k] - U @ psi))))
                assert_allclose(spectral, U, atol=5e-13)
                assert_allclose(states[k], U @ psi, atol=5e-13)
                Wt = U.conj().T @ W @ U
                # Batch of basis states only for the independent trace check.
                Ut = expm_multiply(-1j * sparse * t, np.eye(d, dtype=complex))
                sparse_Wt = expm_multiply(1j * sparse * t, W @ Ut)
                assert_allclose(sparse_Wt, Wt, atol=5e-13)
                row = []
                for j in range(N):
                    V = dense_operator(N, j, 3)
                    Y = expm_multiply(1j * sparse * t, lattice.apply_Z(states[k], N, 0))
                    Vstate = expm_multiply(-1j * sparse * t, lattice.apply_Z(psi, N, j))
                    chi = expm_multiply(1j * sparse * t, lattice.apply_Z(Vstate, N, 0))
                    C = lattice.commutator_squared(Y, chi, N, j)
                    comm = Wt @ V - V @ Wt
                    expected = float(np.vdot(comm @ psi, comm @ psi).real)
                    error_otoc = max(error_otoc, abs(C - expected))
                    assert_allclose(C, expected, atol=2e-12)
                    # Establish correctness of the old 2-2 Re(F) formula too.
                    old = 2 - 2 * np.vdot(Y, lattice.apply_Z(chi, N, j)).real
                    assert_allclose(old, expected, atol=2e-12)
                    exact_trace = float(np.trace(comm.conj().T @ comm).real / d)
                    sparse_trace = np.mean([
                        lattice.commutator_squared(sparse_Wt[:, q],
                                                   (sparse_Wt @ V)[:, q], N, j)
                        for q in range(d)])
                    error_trace = max(error_trace, abs(sparse_trace - exact_trace))
                    assert_allclose(sparse_trace, exact_trace, atol=2e-12)
                    self.assertGreaterEqual(C, 0.)
                    self.assertLessEqual(C, 4 + 2e-12)
                    row.append(exact_trace)
                traces.append(row)
            REPORT["dense_validation"].append({
                "Lx": Lx, "Ly": Ly, "times": times.tolist(),
                "exact_trace_C_by_time_and_site": traces,
                "max_propagator_error": error_prop,
                "max_state_otoc_error": error_otoc, "max_trace_otoc_error": error_trace})

    def test_singleton_repeated_and_nonuniform_times(self):
        H = lattice.build_H(1, [])
        psi = np.array([1., 0.], complex)
        for times in ([0.], [.2], [0., 0., 0.], [.2, .2], [0., .1, .3], [.1, .2, .3]):
            actual = lattice.forward_trajectory(H, psi, times)
            expected = [expm(-1j * H.toarray() * t) @ psi for t in times]
            assert_allclose(actual, expected, atol=2e-13)
        for times in ([], [-1.], [0., np.nan], [.2, .1]):
            with self.assertRaises(ValueError):
                lattice.forward_trajectory(H, psi, times)

    def test_production_shell_output_against_dense(self):
        class Capture(io.StringIO):
            def close(self):
                pass
        captured = Capture()
        with patch.object(sys, "argv", ["production_lattice.py", "2", "2", "7", "4", ".6", "test-grid.json"]):
            with patch.object(Path, "open", autospec=True, return_value=captured) as opened:
                with contextlib.redirect_stdout(io.StringIO()):
                    lattice.main()
        opened.assert_called_once_with(Path("test-grid.json"), "x")
        result = json.loads(captured.getvalue())
        H = dense_hamiltonian(4, lattice.build_lattice(2, 2))
        rng = np.random.default_rng(7)
        psi = rng.normal(size=16) + 1j * rng.normal(size=16)
        psi /= np.linalg.norm(psi)
        for r, sites in result["shells"].items():
            values = []
            for t in result["times"]:
                U = expm(-1j * H * t)
                Wt = U.conj().T @ dense_operator(4, 0, 3) @ U
                norms = []
                for j in sites:
                    V = dense_operator(4, j, 3)
                    v = (Wt @ V - V @ Wt) @ psi
                    norms.append(np.vdot(v, v).real)
                values.append(np.mean(norms))
            assert_allclose(result["results"][r], values, atol=2e-12)


class KrylovTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.bs, cls.dims, cls.basis = krylov.lanczos_b(8, verbose=False, return_basis=True)

    def test_pauli_algebra_against_dense(self):
        sites = [(0, 0), (1, 0)]
        strings = list(itertools.product(range(4), repeat=2))
        for a, b in itertools.product(strings, repeat=2):
            p = {s: letter for s, letter in zip(sites, a) if letter}
            q = {s: letter for s, letter in zip(sites, b) if letter}
            phase, product = krylov.mul(p, q)
            A, B = dense_string(a), dense_string(b)
            assert_allclose(A @ B, 1j**phase * vector_matrix({product: 1.}, sites), atol=1e-14)
            self.assertEqual(krylov.anticommutes(p, q), np.allclose(A @ B, -B @ A))

    def test_analytic_coefficients_and_orthogonality(self):
        assert_allclose(self.bs[:2], [2.1, np.sqrt(17)], atol=1e-13)
        gram = np.array([[inner(a, b) for b in self.basis] for a in self.basis])
        error = float(np.max(np.abs(gram - np.eye(len(self.basis)))))
        assert_allclose(gram, np.eye(len(self.basis)), atol=2e-12)
        for n in range(8):
            Lq = krylov.apply_L(self.basis[n], 1., 1.05, .5)
            expected = krylov.scale(self.basis[n + 1], self.bs[n])
            if n:
                expected = krylov.axpy(-self.bs[n - 1], self.basis[n - 1], expected)
            self.assertLess(krylov.norm(krylov.axpy(-1., expected, Lq)), 1e-11)
        REPORT["lanczos"] = {"steps": 8, "b_n": self.bs, "nonzero_string_counts": self.dims,
                              "max_gram_error": error, "lyapunov_bound": None}

    def test_infinite_generator_first_three_steps_against_dense_star(self):
        # Through L^3 Z0, no noncommuting term leaves the centre+4-neighbour star.
        sites = [(0, 0), (1, 0), (-1, 0), (0, 1), (0, -1)]
        H = dense_hamiltonian(5, [(0, j) for j in range(1, 5)])
        q = dense_operator(5, 0, 3)
        prev = np.zeros_like(q)
        beta = 0.
        for n in range(3):
            Lq = 1j * (H @ q - q @ H)
            dictionary_Lq = krylov.apply_L(self.basis[n], 1., 1.05, .5)
            self.assertTrue(all(set(dict(key)).issubset(sites) for key in dictionary_Lq))
            assert_allclose(vector_matrix(dictionary_Lq, sites), Lq, atol=2e-13)
            residual = Lq + beta * prev
            beta = np.sqrt(np.vdot(residual, residual).real / 32)
            assert_allclose(beta, self.bs[n], atol=2e-13)
            prev, q = q, residual / beta
            assert_allclose(vector_matrix(self.basis[n + 1], sites), q, atol=2e-13)

    def test_legacy_wrong_sign_is_reproduced_and_nonorthogonal(self):
        old = json.loads((NUMERICS / "krylov_bn_infinite.json").read_text())["b_n"]
        q0 = self.basis[0]
        q1 = self.basis[1]
        residual = krylov.axpy(-old[0], q0, krylov.apply_L(q1, 1., 1.05, .5))
        bad_b2 = krylov.norm(residual)
        overlap = inner(q0, krylov.scale(residual, 1 / bad_b2))
        assert_allclose(bad_b2, old[1], atol=1e-13)
        self.assertGreater(abs(overlap), .7)
        self.assertGreater(abs(old[1] - self.bs[1]), 1.)
        REPORT["legacy_sign_failure"] = {"stored_b2": old[1], "reproduced_wrong_b2": bad_b2,
                                         "correct_b2": self.bs[1], "O0_dot_bad_O2": overlap}

    def test_breakdown_and_negative_field(self):
        for hx in (-1.05, 1.05):
            bs, dims = krylov.lanczos_b(8, J=0., hx=hx, hz=0., verbose=False)
            assert_allclose(bs, [2.1, 0.], atol=1e-14)
            self.assertEqual(dims, [1, 1, 0])
            self.assertEqual(krylov.validate_b1(hx), 2.1)
        self.assertEqual(krylov.lanczos_b(8, hx=0., verbose=False), ([0.], [1, 0]))
        self.assertEqual(krylov.lanczos_b(0, verbose=False), ([], [1]))

    def test_closed_krylov_spectral_propagation_against_dense_spin(self):
        bs, _, basis = krylov.lanczos_b(8, J=0., hz=.5, verbose=False, return_basis=True)
        self.assertEqual(len(basis), 3)
        self.assertEqual(bs[-1], 0.)
        T = np.diag(bs[:-1], -1) - np.diag(bs[:-1], 1)
        assert_allclose(T, -T.T)
        eigenvalues, eigenvectors = np.linalg.eigh(1j * T)
        H = dense_hamiltonian(1, [], J=0., hz=.5)
        errors = []
        for t in (0., .1, 1., 4.):
            coefficients = eigenvectors @ (np.exp(-1j * eigenvalues * t) * eigenvectors[0].conj())
            assert_allclose(coefficients, expm(t * T)[:, 0], atol=2e-13)
            Wt = sum(c * vector_matrix(q, [(0, 0)]) for c, q in zip(coefficients, basis))
            U = expm(-1j * H * t)
            expected = U.conj().T @ PAULI[3] @ U
            errors.append(float(np.max(np.abs(Wt - expected))))
            assert_allclose(Wt, expected, atol=2e-13)
        REPORT["closed_krylov_spectral_max_error"] = max(errors)


class DTWATests(unittest.TestCase):
    def test_tangent_rhs_is_finite_difference_of_dynamics(self):
        rng = np.random.default_rng(3)
        n, dx, dy = rng.normal(size=(3, 4, 3))
        A = dtwa.neighbor_sum_matrix(dtwa.build_neighbors(2, 2), 4)
        _, tx, ty = dtwa.rhs(n, dx, dy, A, 1., 1.05, .5)
        zero = np.zeros_like(n)
        eps = 1e-6
        for perturbation, expected in [(dx, tx), (dy, ty)]:
            plus = dtwa.rhs(n + eps * perturbation, zero, zero, A, 1., 1.05, .5)[0]
            minus = dtwa.rhs(n - eps * perturbation, zero, zero, A, 1., 1.05, .5)[0]
            assert_allclose((plus - minus) / (2 * eps), expected, atol=2e-9)

    def test_tangent_integration_matches_perturbed_trajectory(self):
        rng = np.random.default_rng(5)
        n = rng.choice([-1., 1.], size=(4, 3))
        delta = np.zeros_like(n)
        delta[1, 0] = 1.
        zero = np.zeros_like(n)
        A = dtwa.neighbor_sum_matrix(dtwa.build_neighbors(2, 2), 4)
        eps = 1e-6
        plus, minus = n + eps * delta, n - eps * delta
        initial_norms = np.sum(n*n, axis=1)
        for _ in range(40):
            n, delta, zero = dtwa.rk4_step(n, delta, zero, A, 1., 1.05, .5, .002)
            plus = dtwa.rk4_step(plus, zero, zero, A, 1., 1.05, .5, .002)[0]
            minus = dtwa.rk4_step(minus, zero, zero, A, 1., 1.05, .5, .002)[0]
        assert_allclose(delta, (plus - minus) / (2 * eps), atol=2e-9)
        assert_allclose(np.sum(n*n, axis=1), initial_norms, atol=2e-9)

    def test_nonzero_first_time_matches_one_spin_analytic(self):
        # hz=J=0: {nz(t),nz(0)}=-2 sin(2 hx t) nx(0).
        times = np.array([.13, .27])
        acc = dtwa.run_dtwa(1, 1, 0, [(0, 0)], times, 3, J=0., hz=0.,
                            dt_max=.001, verbose=False)
        expected = 4 * np.sin(2 * 1.05 * times)**2
        assert_allclose(acc[0], expected, atol=2e-11)
        repeated = dtwa.run_dtwa(1, 1, 0, [(0, 0)], [.13, .13], 1,
                                 J=0., hz=0., dt_max=.001, verbose=False)
        assert_allclose(repeated[0], [expected[0]] * 2, atol=2e-11)

    def test_time_step_convergence(self):
        outputs = []
        for step in (.02, .01, .005):
            outputs.append(dtwa.run_dtwa(2, 2, 0, [(0, 0), (1, 1)], [0., .2, .4],
                                          4, dt_max=step, seed=11, verbose=False))
        coarse = max(float(np.max(np.abs(outputs[0][r] - outputs[1][r]))) for r in (0, 1))
        fine = max(float(np.max(np.abs(outputs[1][r] - outputs[2][r]))) for r in (0, 1))
        self.assertLess(fine, coarse / 8)
        self.assertLess(fine, 1e-5)
        REPORT["dtwa_small_rerun"] = {
            "Lx": 2, "Ly": 2, "src": 0, "probes": {"0": 0, "1": 1},
            "J": 1., "hx": 1.05, "hz": .5, "pbc": True, "n_samples": 4, "seed": 11,
            "times": [0., .2, .4], "dt_max": .005,
            "results": {str(r): v.tolist() for r, v in outputs[-1].items()},
            "max_dt_002_vs_001_difference": coarse, "max_dt_001_vs_0005_difference": fine,
            "observable": "classical squared bracket, not a validated quantum approximation"}

    def test_invalid_inputs(self):
        for changes in ({"n_samples": 0}, {"dt_max": 0.}, {"times": [0., -.1]},
                        {"times": []}, {"times": [np.nan]}, {"src": 4},
                        {"probes": [(1, 1), (1, 2)]}):
            args = dict(Lx=2, Ly=2, src=0, probes=[(1, 1)], times=[0., .1],
                        n_samples=1, verbose=False)
            args.update(changes)
            with self.assertRaises(ValueError):
                dtwa.run_dtwa(**args)


def legacy_inventory():
    out = {}
    for path in sorted(NUMERICS.iterdir()):
        if path.suffix not in (".json", ".png") or "corrected" in path.stem:
            continue
        entry = {"sha256": hashlib.sha256(path.read_bytes()).hexdigest()}
        if path.suffix == ".json":
            data = json.loads(path.read_text())
            entry["keys"] = list(data)
            if "results" in data:
                values = np.array(list(data["results"].values()), float)
                assert values.shape[1] == len(data["times"])
                assert np.all(np.isfinite(values))
                entry.update(time_count=len(data["times"]), min_value=float(values.min()),
                             max_value=float(values.max()), points_above_quantum_bound=int(np.sum(values > 4)))
        out[path.name] = entry
    return out


if __name__ == "__main__":
    write_report = "--report" in sys.argv
    if write_report:
        sys.argv.remove("--report")
        path = NUMERICS / "python_numerics_corrected_validation.json"
        if path.exists() or path.is_symlink():
            raise FileExistsError(f"Output already exists: {path}")
    suite = unittest.main(exit=False)
    if not suite.result.wasSuccessful():
        sys.exit(1)
    if write_report:
        REPORT["tests_run"] = suite.result.testsRun
        REPORT["legacy_inventory"] = legacy_inventory()
        with path.open("x") as output:
            json.dump(REPORT, output, indent=2, allow_nan=False)
        print(f"Wrote {path}")
