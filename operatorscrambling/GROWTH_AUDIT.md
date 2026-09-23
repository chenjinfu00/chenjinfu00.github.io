# Growth-page audit — 2026-09-21

## Material Passport

- Origin: academic-research-suite / experiment-agent, validate mode.
- Verification: **VERIFIED for the listed numeric/controller checks only**; no browser or visual QA.
- Revision: `growth-skew-2026-09-21`.
- Write scope (relative to this folder): `operator_growth_bound.html`, `tests/test_growth_engine.cjs`, this report. No Python, spreading-page, README, or historical result files were changed by this audit.

## Critical findings and fixes

1. **Wrong Lanczos sign.** In the real Hermitian Pauli basis, `L=i[H,.]` is skew-symmetric. Since `(q[n-1], L q[n])=-b[n]`, the residual is `L q[n] + b[n] q[n-1]`. The old subtraction doubled the backward component. A pure transverse field previously produced a spurious nonzero second coefficient; the corrected chain closes at `b2=0`. The displayed equation is corrected in both languages.
2. **Invalid bound inference.** Finite differences are not proven monotone lower bounds on asymptotic alpha. Nor does `2*(b[n]-b[n-1])` certify a Lyapunov upper bound. Even a genuine lower bound on alpha cannot be substituted into an upper bound involving alpha. Removed the numerical bound readout, “still rising” claims, and chaos/integrability verdicts from term counts. Renamed the page to “Operator Growth Diagnostics,” retaining its filename.
3. **Energy-window misinterpretation.** The old seed was finite-window total energy, not a local density or a faithful nontrivial `q=0` conserved mode. Its first commutator with infinite-lattice H already involves the boundary. The original window also changed with requested step count. It is now explicitly labeled boundary-sensitive, with an independently fixed half-width K (default 8, allowed 1–12). Bonds remain fully contained in the seed window; the generator itself remains unbounded.
4. **Mutable run inputs and misleading completion.** Filtered row arrays previously shared the editable Hamiltonian objects. Runs now use frozen copies of all input rows, seed, step count, and relevant window size. Status, provenance, and JSON exports use that snapshot, including during edits or language changes. Invalid reruns retain the previous results. New runs clear their old charts immediately. Stopped, closed, completed, resource-limited, and failed states are distinct; unfinished steps are never published.
5. **Missing breakdown/error handling and unstable scale.** Added stable vector norms, global Hamiltonian rescaling, two correction passes against the current/previous vectors, relative breakdown detection, finite-output checks, cooperative cancellation, and `try/finally` cleanup. Blank/nonfinite coefficients, fractional offsets/steps, excessive offsets/row counts, and nonzero zero-offset two-body rows are rejected rather than silently changed or ignored. Zero H is valid for a site seed; a zero energy seed is rejected.
6. **Unbounded cost and chart edge cases.** Added per-commutator limits (200,000 stored terms; 12,000,000 key characters; 5,000,000 candidate visits), retaining only prior complete steps on a limit. Tiny tick ranges could previously trigger enormous loops due to an absolute `1e-9` endpoint allowance; tick generation is bounded. Extreme-energy chart coordinates are scaled explicitly. No slope is invented at n=0, and terminal zero counts are omitted from logarithmic plots.

## Numerical evidence

From the workspace root: `node --test Operatorscrambling/tests/test_growth_engine.cjs`.
From inside `Operatorscrambling`: `node --test tests/test_growth_engine.cjs` (Node v26.7.0).

**17 tests passed, 0 failed**; numeric/controller runs take approximately 1.5 s. No packages were installed.

- Independent dense complex-matrix commutators check all on-site Pauli combinations, mixed bonds, reversed offsets, duplicate rows, and 2D embeddings.
- Independent full orthogonalization of dense five-site Hilbert-space operators checks the first three interacting-chain coefficients, within `2e-11` scaled tolerance. The tested support remains inside that patch for these steps.
- The default 2D sequence through b8 agrees within `5.1e-10` absolute tolerance with the rounded corrected sequence in `otoc16/PYTHON_AUDIT.md`. This comparison covers that sequence only, not the rest of the Python audit.
- Analytic checks cover pure/tilted fields, commuting and cancelling Hamiltonians, moment identities, and uniform energy rescaling (including negative scaling and factors `1e-200` and `1e200`). The eight-step mixed-field chain also satisfies full pairwise Gram checks within `1e-10` for this representative run.
- Controller checks cover mutation during a run, frozen export provenance, language changes, invalid reruns, zero-step cancellation, zero energy seeds, and cleanup after a resource exception. A separate test actually crosses the 200,000-term guard; mid-commutator cancellation is exercised with controlled timer callbacks.
- Static checks verify JavaScript parsing, bilingual key parity, unique element IDs and referenced UI hooks. These checks do not test rendered layout or actual download interaction.

Default 2D mixed-field model, Z seed, Pauli convention:

| Coefficient | Corrected value |
|---|---:|
| b1 | 2.1000000000 |
| b2 | 4.1231056256 = sqrt(17) |
| b3 | 5.5230000373 |
| b4 | 6.7779355803 |
| b5 | 7.3524188474 |
| b6 | 8.6253578300 |
| b7 | 9.5844430100 |
| b8 | 10.8364127121 |

The old sign gives `b2^2=17+4*(2.1)^2=34.64`, demonstrating why agreement at b1 never validated the recurrence. The corrected early finite differences already decrease over several successive steps.

For the 1D window seed with `H=h sum X + J sum ZZ`, the independent analytic check is
`b1^2 = 8 J^2 h^2 / ((2K+1) h^2 + 2K J^2)`.
Tests at K=2 and K=5 reproduce this boundary contribution, including strings outside the seed window at the first step.

## Interpretation and remaining limits

The primary reference is Parker et al., [A Universal Operator Growth Hypothesis, arXiv:1812.08657v5](https://arxiv.org/abs/1812.08657v5), particularly Sections III–VI. It concerns asymptotic coefficient growth; the one-dimensional hypothesis includes an extra logarithmic correction. It does not turn an arbitrary finite difference into a certified growth-rate estimate or Lyapunov bound. Only public arXiv pages were consulted; no unpublished material was uploaded.

- Double precision and local two-vector correction do **not** certify global orthogonality at arbitrary depth. Only exact zeros are removed, so stored-term counts can include small cancellation remnants. Counts are not Krylov dimensions or a physical chaos test.
- Numerical closure uses `128*Number.EPSILON*(norm(Lq)+abs(previous b))` in scaled units. A nonzero residual below that threshold is recorded as a terminal zero; its raw norm and threshold are retained in JSON. This can hide a genuinely small coupling below the numerical resolution and is not a proof of exact closure.
- Resource guards bound particular vector/work quantities, not total browser heap usage or wall time. Several temporary maps coexist. Very costly local work can delay a stop; cancellation is cooperative. Deep 2D computations may stop before the requested depth.
- Historical JSON/Python outputs were preserved and are **not** certified by this audit. They should not be used as a correctness oracle for the repaired page. Reproduction of those historical outputs is not claimed.
- Browser navigation was already policy-blocked in the parent task. No browser, local server, or alternative navigation workaround was used. Responsive appearance, font loading, actual DOM interaction and file-download UX remain visually unverified.
- ARS statistical-fallacy scan: 11/11 considered. Simpson, ecological, Berkson, collider, base-rate, regression-to-mean, survivorship, look-elsewhere, observational causation, and reverse-causality analyses are not applicable to these deterministic algebra tests. Researcher degrees of freedom apply to seed/window/step selection; those inputs are now explicit. No statistical significance, confidence interval, population inference, asymptotic alpha, OTOC exponent, or diffusion coefficient is inferred.
