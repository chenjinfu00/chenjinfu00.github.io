# Personal website

This is a self-contained, template-free personal website served as static files.

## What is included

- `site_src/`: original page templates, profile data, translations, and work metadata
- `_publications/`, `_talks/`, `_teaching/`: public academic records used by the generator
- `assets/site/`: the site's original design, scripts, portrait, artwork, icons, and third-party licenses
- `assets/presentations/`: archived talk slides and posters, with cover previews
- `scripts/build_site.py` and `scripts/localize_site.py`: the small static-site generator
- generated HTML routes for the English and Chinese website
- `.nojekyll`, `robots.txt`, and `sitemap.xml`: deployment files
- `meetingroom/`: a browser-based peer-to-peer meeting room with room passwords and administrator controls

## What is deliberately excluded

- the former Academic Pages/Jekyll theme and its sample content
- old template images, fonts, styles, layouts, and comment data
- notebooks and one-off content generators
- the game prototype and map prototype
- sample PDFs and slides
- local screenshots, temporary output, private drafts, and unpublished PDFs

## Rebuild

```sh
/opt/anaconda3/bin/python scripts/build_site.py
```

## Preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`.

## Interface

`assets/site/style.css` provides the base layout and geometry-field controls.
`assets/site/interface.css` adds the current navigation, pastel research shortcuts,
content panels, and responsive archive filters, inspired by AIgimon's browsing UI.
Buttons within each navigation, shortcut, filter, or action group share the same
width, including when switching languages. Narrow screens wrap or scroll groups.
Edit the templates in `site_src/templates/` and translations in `site_src/zh.yml`,
then rebuild to update both language versions.
All headings, body text, and controls use Arial for Latin characters and Hei
fonts for Chinese characters (SimHei or Heiti SC, with system sans-serif fallbacks).

The three research directions also define publication tags: quantum thermodynamics,
finite-time and stochastic thermodynamics, and quantum nonlocality and many-body systems. Each
`_publications/` record has a `topics` list and can belong to multiple directions.
The archive shows each paper once and filters by any of its assigned tags. Topic
names and homepage descriptions are maintained together in `site_src/profile.yml`.
Publication badges use the navigation's selected pale blue for journal articles
and neutral gray for preprints, with explicit text labels.
Research topic icons sit beside these badges in publication lists and detail
pages. Each icon shows the full topic name on hover and links to its archive filter.

Presentation records in `_talks/` also have topic lists. Their archive combines
research-topic filters with talk/poster filters and search. Academic stages in
`site_src/profile.yml` show their research tags on the About page; `topic_names`
can provide a shorter stage-specific label while keeping its topic link.
The presentation filter rows share compact button dimensions. Topic icons next
to each event's format link to that research direction and show its full name
on hover.

## Presentation archive

Each `_talks/` record can list `materials` with a public asset path, cover preview,
PDF page count, corresponding PPTX path and slide count, and preview dimensions.
The generator validates asset paths and renders PDF reading and PDF/PPTX download
links on the English and Chinese pages. Public PPTX copies omit speaker notes and
comments. The two 2023 Brownian-engine poster
entries explicitly share the same archived poster.

The meeting prototype is available at `http://127.0.0.1:8765/meetingroom/`.


Private interview presentations and speaker scripts are stored outside this repository. Public presentation PDFs and PPTX files omit internal notes and comments.
