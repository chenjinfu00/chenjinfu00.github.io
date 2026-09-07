# Jinfu Chen - Personal Research Website

An original static website for Jinfu Chen's work in quantum and statistical physics.
The public site is served directly by GitHub Pages, without a third-party website theme,
Ruby runtime, client-side framework, or external CDN.

## Preview

From the repository root:

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open http://127.0.0.1:8765/ in a browser. Committed HTML works without a build.

## Update Content

- `site_src/profile.yml`: biography, research interests, academic timeline, contact links.
- `_publications/*.md`: paper titles, original archive URLs, citations and topic groups.
- `site_src/works.yml`: DOI links, author roles and selected research summaries.
- `_talks/*.md`: talks, seminars and posters, including event links.
- `_teaching/*.md`: teaching records.
- `site_src/templates/`: original page templates.
- `site_src/zh.yml`: Chinese text, research summaries, titles and interface labels.
- `assets/site/`: original styles, interactions, artwork and locally hosted icons.

After editing content or templates, regenerate the HTML:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-site.txt
.venv/bin/python scripts/build_site.py
```

This workspace also has the necessary packages in `/opt/anaconda3/bin/python`.
The generator preserves existing publication and presentation permalinks.
`site_src/generated-files.json` records generated pages; edit their sources, then rebuild.
Every build generates English pages at `/` and matching Chinese pages at `/zh/`.
The language link preserves the current page, search filters, and section anchor.
Chinese pages retain the original author lists and formal citations. Add Chinese
translations for new visible content in `site_src/zh.yml` when adding records.

## Publish

Commit source changes **and regenerated HTML**, then push to the branch already
used by GitHub Pages. `.nojekyll` serves static pages without running the former
Jekyll theme. No new deployment service is required.

## Design And Assets

Original editorial layouts use the supplied presentation's navy (#001158), muted
blue (#8592BC), and white palette, with restrained lime and orange accents.
`site_src/palette.json` records source colors and web adaptations. Orange is
darkened for small text to maintain contrast. The layout, serif research titles,
topic filters, citation copying, and responsive navigation are unchanged.
The portrait comes from the existing personal website. The hero is an SVG mesh
drawn from one continuous parametric surface by `scripts/draw_geometry.py`.
Sparse nodes connect into a honeycomb network; alternating edges contract into
shared four-way vertices, producing the quadrilateral mesh without superimposed
textures. The mesh and orange curve share the same curved mapping. The orange curve
represents a conceptual quantum/classical boundary. `assets/site/geometry-field.js`
continues the same ribbon smoothly down every page. The common base template loads
one shared animation layer and pause control in both languages. The homepage keeps
its stronger hero treatment; archives, CV, teaching, and detail pages use the faint
continuation from their first viewport. It projects spin arrows on
the left and Brownian particles on the right, in the mesh's intrinsic coordinates.
Keep its initial `ribbon()` mapping in sync with `scripts/draw_geometry.py`.
The background fades behind text; a single fixed SVG renders the visible portion
of the continuous surface. The language toggle works in both versions.

Spins are narrow, filled isosceles triangles (about 7:1), rotating around their
centroids at fixed mesh vertices. Their planar orientations follow overdamped
XY-style Langevin dynamics: symmetric, distance-weighted neighbor alignment,
Gaussian angular noise, and a local pointer-controlled effective field. The field
rotates nearby arrows; it does not drag their lattice sites. These arrows are a
semiclassical visual analogy, not a simulation of quantum spin states, entanglement,
or a calibrated heat bath. Model time, coupling, and temperature are illustrative.

Brownian tracers are solid theme-navy dots with matching filled trails that taper to zero
width and fade into the background. Their dynamics combine fixed-step random
forces, viscous damping, repulsive contacts,
and a soft pointer attraction, integrated with locally bundled Matter.js 0.20.0
([force API](https://brm.io/matter-js/docs/classes/Body.html#method_applyForce),
[engine API](https://brm.io/matter-js/docs/classes/Engine.html)). Hold the pointer down
to strengthen the local interaction; touch gestures do not block normal scrolling.
Offscreen elements sleep and hidden tabs pause. The persistent pause button and
reduced-motion preference provide a stationary view. Matter's MIT license is in
`assets/site/MATTER-LICENSE`; no external runtime requests are needed.

Mobile scrolling and simulation share one animation-frame scheduler. Surface rows
are cached within a bounded window, and touch devices use fewer curve samples and
30 Hz particle painting while scroll updates remain immediate. Viewport changes
preserve existing bodies, orientations and trails rather than resetting the scene.
`scripts/verify_mobile_motion.cjs` compares scroll timing against the committed
version and checks resize continuity, rotation, touch scrolling and pause behavior.

`scripts/verify_field.cjs` checks pointer attraction, spin response and fixed lattice
sites, thermal motion, boundary confinement, responsive rendering, and pause states.
`scripts/verify_shared_field.cjs` checks shared animation across secondary routes,
both languages, search-driven layout changes, pause controls, and reduced motion.
The artwork is conceptual, not a quantitative research result. Regenerate it
with `python3 scripts/draw_geometry.py` after changing the geometric definition.
Lucide icons are bundled locally under their ISC license (`assets/site/LUCIDE-LICENSE`).
The `jfc` calligraphic mark and favicon are SVG outlines, so their appearance does
not depend on fonts installed on a visitor's device.
Older theme files are retained for reference and are not loaded by the new site;
their original license remains in `LICENSE`.

Private CV and job-application working files live in the separate sibling
`cv与求职` directory, not in this repository.
