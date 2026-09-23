# Personal website

This is a self-contained, template-free personal website served as static files.

## What is included

- `site_src/`: original page templates, profile data, translations, and work metadata
- `_publications/`, `_talks/`, `_teaching/`: public academic records used by the generator
- `assets/site/`: the site's original design, scripts, portrait, artwork, icons, and third-party licenses
- `scripts/build_site.py` and `scripts/localize_site.py`: the small static-site generator
- generated HTML routes for the English and Chinese website
- `.nojekyll`, `robots.txt`, and `sitemap.xml`: deployment files
- `meetingroom/`: a standalone browser-based meeting setup prototype

## What is deliberately excluded

- the former Academic Pages/Jekyll theme and its sample content
- old template images, fonts, styles, layouts, and comment data
- notebooks and one-off content generators
- the game prototype and map prototype
- sample PDFs and slides
- local screenshots, temporary output, interview material, and unpublished PDFs

## Rebuild

```sh
/opt/anaconda3/bin/python scripts/build_site.py
```

## Preview

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Open `http://127.0.0.1:8765/`.

The meeting prototype is available at `http://127.0.0.1:8765/meetingroom/`.
