"""Export the jfc wordmark as outlines; no font is needed by site visitors."""
from pathlib import Path
import json
import xml.etree.ElementTree as ET

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTCollection

ROOT = Path(__file__).resolve().parents[1]
COLORS = json.loads((ROOT / "site_src/palette.json").read_text())["web_colors"]
SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)
font = TTCollection("/System/Library/Fonts/Supplemental/SnellRoundhand.ttc").fonts[1]
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
outlines = SVGPathPen(glyphs)
bounds = BoundsPen(glyphs)
cursor = 0
for letter in "jfc":
    name = cmap[ord(letter)]
    transform = (1, 0, 0, -1, cursor, 0)
    glyphs[name].draw(TransformPen(outlines, transform))
    glyphs[name].draw(TransformPen(bounds, transform))
    cursor += font["hmtx"][name][0]

x0, y0, x1, y1 = bounds.bounds
pad = 25
width, height = x1 - x0 + 2 * pad, y1 - y0 + 2 * pad
root = ET.Element(f"{{{SVG}}}svg", {"viewBox": f"{x0-pad} {y0-pad} {width} {height}",
    "width": "76", "height": "58", "role": "img", "aria-label": "jfc"})
ET.SubElement(root, "title").text = "jfc"
ET.SubElement(root, "path", {"d": outlines.getCommands(), "fill": COLORS["primary"]})
ET.ElementTree(root).write(ROOT / "assets/site/jfc-monogram.svg", encoding="utf-8", xml_declaration=True)

favicon = ET.Element(f"{{{SVG}}}svg", {"viewBox": "0 0 64 64"})
ET.SubElement(favicon, "rect", {"width": "64", "height": "64", "rx": "8", "fill": COLORS["primary"]})
scale = min(54 / width, 54 / height)
tx = 32 - scale * (x0 + x1) / 2
ty = 32 - scale * (y0 + y1) / 2
ET.SubElement(favicon, "path", {"d": outlines.getCommands(), "fill": COLORS["paper"],
    "transform": f"matrix({scale} 0 0 {scale} {tx} {ty})"})
ET.ElementTree(favicon).write(ROOT / "assets/site/favicon.svg", encoding="utf-8", xml_declaration=True)
print(f"Outlined jfc wordmark and favicon; aspect ratio {width/height:.2f}")
