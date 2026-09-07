"""Build the original static website from public research records and templates."""
import json
import re
from pathlib import Path
from urllib.parse import quote
from xml.sax.saxutils import escape

import yaml
from jinja2 import Environment, FileSystemLoader, select_autoescape
from localize_site import chinese_page

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "site_src"
env = Environment(loader=FileSystemLoader(SOURCE / "templates"), autoescape=select_autoescape())
profile = yaml.safe_load((SOURCE / "profile.yml").read_text())
extra = yaml.safe_load((SOURCE / "works.yml").read_text())
env.globals.update(profile=profile)
written = []


def records(folder):
    result = []
    for file in sorted((ROOT / folder).glob("*.md")):
        _, header, _ = file.read_text().split("---", 2)
        item = yaml.safe_load(header)
        item["year"] = str(item["date"])[:4]
        result.append(item)
    return result


def render(path, template, **context):
    relative = path.strip("/")
    target = ROOT / relative / "index.html" if not relative.endswith(".html") else ROOT / relative
    target.parent.mkdir(parents=True, exist_ok=True)
    html = env.get_template(template).render(path=path, **context)
    target.write_text("\n".join(line.rstrip() for line in html.splitlines()) + "\n", encoding="utf-8")
    written.append(target.relative_to(ROOT).as_posix())
    chinese_target = ROOT / 'zh' / target.relative_to(ROOT)
    chinese_target.parent.mkdir(parents=True, exist_ok=True)
    chinese_html = chinese_page(html)
    chinese_target.write_text("\n".join(line.rstrip() for line in chinese_html.splitlines()) + "\n", encoding='utf-8')
    written.append(chinese_target.relative_to(ROOT).as_posix())


works = records("_publications")
for work in works:
    slug = work["permalink"].rstrip("/").split("/")[-1]
    work.update(extra.get(slug, {}))
    work["slug"] = slug
    work["url"] = work["permalink"].rstrip("/") + "/"
    work["summary"] = work.get("summary", work["excerpt"])
    work["roles"] = work.get("roles", ["First author"] if work.get("first_author") else [])
    work["preprint"] = work["venue"] == "arXiv"
    arxiv = re.search(r"arXiv:(\d+\.\d+)", work["citation"])
    work["paper_url"] = ("https://doi.org/" + work["doi"] if work.get("doi") else
                         "https://arxiv.org/abs/" + arxiv[1] if arxiv else
                         "https://scholar.google.com/scholar?q=" + quote(work["title"]))
    work["paper_label"] = "Read preprint" if arxiv else "Read paper" if work.get("doi") else "Find paper"
    work["authors"] = work["citation"].split(" (" + work["year"] + ")")[0]
works.sort(key=lambda x: str(x.get("selected_sort", x["date"])), reverse=True)
talks = sorted(records("_talks"), key=lambda x: str(x["date"]), reverse=True)
teaching = sorted(records("_teaching"), key=lambda x: str(x["date"]), reverse=True)
featured_slugs = ["boosting-thermalization-many-body-systems", "optimizing-quantum-violation-bell-inequalities",
                  "spectral-gap-optimization", "geodesic-lower-bound-membrane-separation"]
featured = [next(w for w in works if w["slug"] == s) for s in featured_slugs]
groups = [
    ("nonlocality_many_body", "Quantum nonlocality and many-body systems"),
    ("stochastic_thermodynamics", "Stochastic thermodynamics"),
    ("finite_time_heat_engines", "Finite-time thermodynamics and heat engines"),
    ("transport_nonequilibrium", "Transport and nonequilibrium physics"),
]
render("/", "home.html", page="home", title="Jinfu Chen | Quantum & Statistical Physics", works=featured, talks=talks[:3])
render("/publications/", "works.html", page="works", title="Selected Works | Jinfu Chen", works=works, groups=groups)
render("/talks/", "talks.html", page="talks", title="Presentations | Jinfu Chen", talks=talks)
render("/cv/", "about.html", page="about", title="About & CV | Jinfu Chen", teaching=teaching)
render("/teaching/", "teaching.html", page="teaching", title="Teaching | Jinfu Chen", teaching=teaching)
for work in works:
    render(work["url"], "work.html", page="works", title=work["title"] + " | Jinfu Chen", work=work)
for item in talks + teaching:
    render(item["permalink"].rstrip("/") + "/", "event.html", page="talks" if item["collection"] == "talks" else "teaching",
           title=item["title"] + " | Jinfu Chen", item=item)
for alias, destination in [("/about/", "/cv/"), ("/about.html", "/cv/"), ("/resume/", "/cv/")]:
    render(alias, "redirect.html", destination=destination)
render("/404.html", "404.html", page="404", title="Page not found | Jinfu Chen")
urls = [profile["site_url"] + ("/" + p.removesuffix("index.html")) for p in written
        if p.removeprefix('zh/') not in {"404.html", "about.html", "about/index.html", "resume/index.html"}]
(ROOT / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n'
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    "".join("<url><loc>" + escape(u) + "</loc></url>" for u in urls) + "</urlset>\n")
(ROOT / "site_src/generated-files.json").write_text(json.dumps(written, indent=2) + "\n")
print(f"Built {len(written)} pages: {len(works)} works, {len(talks)} presentations, {len(teaching)} courses.")
