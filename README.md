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
- `research-report/`: the bilingual 40-minute research presentation, with speaker notes and an offline HTML download

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

## Presentation archive

Each `_talks/` record can list `materials` with a public asset path, cover preview,
PDF page count, corresponding PPTX path and slide count, and preview dimensions.
The generator validates asset paths and renders PDF reading and PDF/PPTX download
links on the English and Chinese pages. Public PPTX copies omit speaker notes and
comments. The two 2023 Brownian-engine poster
entries explicitly share the same archived poster.

The meeting prototype is available at `http://127.0.0.1:8765/meetingroom/`.

## Research presentation

The English and Chinese homepages link to `/research-report/`. It is a standalone bilingual presentation; switch language within the report. The report assets live in `research-report/assets/`. `research-report/Jinfu-Chen-Research-Report.html` is the single-file offline version. Keep both versions in sync when updating presentation content.

The 17 October 2026 research talk contains 27 main slides (40 minutes), with two future-work slides and 11 backup slides. Rebuild the offline version after changing report content or styles:

```sh
/opt/anaconda3/bin/python scripts/package_research_report.py
```
