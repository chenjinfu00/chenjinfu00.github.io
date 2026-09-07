"""Draw a smooth, non-folding parametric mesh as resolution-independent SVG."""
from math import cos, sin, pi, exp
from pathlib import Path
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
COLORS = json.loads((ROOT / "site_src/palette.json").read_text())["web_colors"]
SVG = "http://www.w3.org/2000/svg"
ET.register_namespace("", SVG)


def surface(u, v):
    left = 680 + 450 * exp(-((v - 0.6) / 0.30) ** 2) - 550 * v ** 4
    blend = 1 / (1 + exp(-(v - 0.72) / 0.12))
    width = 500 + (2200 + 10500 * blend) * (v - 0.72) ** 2
    x = left + u * width
    return x, -140 + 1420 * v - 260 * exp(-((x - 1100) / 400) ** 2)


def derivatives(u, v):
    left_v = -900 * (v - 0.6) / 0.30 ** 2 * exp(-((v - 0.6) / 0.30) ** 2) - 2200 * v ** 3
    blend = 1 / (1 + exp(-(v - 0.72) / 0.12))
    width = 500 + (2200 + 10500 * blend) * (v - 0.72) ** 2
    width_v = 2 * (2200 + 10500 * blend) * (v - 0.72) + 10500 * blend * (1 - blend) / 0.12 * (v - 0.72) ** 2
    x, _ = surface(u, v)
    shear_x = 520 * (x - 1100) / 400 ** 2 * exp(-((x - 1100) / 400) ** 2)
    x_v = left_v + u * width_v
    # A positive-width ribbon followed by a vertical shear is globally injective.
    # Its Jacobian is exactly 1420 * width, even at the narrowest part of the neck.
    return ((width, shear_x * width), (x_v, 1420 + shear_x * x_v))


def smoothstep(start, end, value):
    t = max(0, min(1, (value - start) / (end - start)))
    return t * t * (3 - 2 * t)


def network():
    # Contract alternating honeycomb edges to shared degree-four vertices.
    # This is one connected graph, not overlapping hexagon and square textures.
    cols, rows = 66, 54
    vertices, edges = {}, set()
    for row in range(-4, rows + 7):
        for col in range(-6, int(cols * 1.8) + 1):
            u = col / cols
            contraction = smoothstep(0.13, 0.48, u)
            offset = 1 / 6 + contraction / 3
            v = (row + (-1) ** (row + col) * offset) / rows
            vertices[row, col] = (round(u, 12), round(v, 12))
    for (row, col), start in vertices.items():
        neighbors = [(row, col + 1)]
        if (row + col) % 2 == 0:
            neighbors.append((row + 1, col))
        for key in neighbors:
            if key in vertices:
                end = vertices[key]
                if start != end:
                    edges.add(tuple(sorted((start, end))))
    return set(vertices.values()), sorted(edges)


def bezier_path(curve, tangent, segments=96):
    # Shared analytic points and tangents keep adjacent cubic segments C1-continuous.
    x, y = curve(0)
    commands = [f"M{x:.5f},{y:.5f}"]
    h = 1 / segments
    for i in range(segments):
        t0, t1 = i * h, (i + 1) * h
        p0, p1 = curve(t0), curve(t1)
        d0, d1 = tangent(t0), tangent(t1)
        c0 = (p0[0] + h * d0[0] / 3, p0[1] + h * d0[1] / 3)
        c1 = (p1[0] - h * d1[0] / 3, p1[1] - h * d1[1] / 3)
        commands.append(f"C{c0[0]:.5f},{c0[1]:.5f} {c1[0]:.5f},{c1[1]:.5f} {p1[0]:.5f},{p1[1]:.5f}")
    return " ".join(commands)


def build():
    root = ET.Element(f"{{{SVG}}}svg", {"viewBox": "0 0 1536 1024", "width": "1536", "height": "1024",
        "role": "img", "aria-labelledby": "title description"})
    ET.SubElement(root, "title", {"id": "title"}).text = "From a network to thermodynamic geometry"
    ET.SubElement(root, "desc", {"id": "description"}).text = (
        "Sparse nodes connect into a honeycomb network and transform continuously into a quadrilateral "
        "mesh on a curved surface. An orange curve represents the conceptual boundary between a quantum "
        "region on its left and a classical region on its right. The website projects thermally fluctuating "
        "spin arrows and random walks onto this mesh. This is a conceptual illustration, not a quantitative physical boundary.")
    ET.SubElement(root, "rect", {"width": "1536", "height": "1024", "fill": COLORS["hero"]})
    mesh = ET.SubElement(root, "g", {"fill": "none", "stroke": COLORS["mesh"], "stroke-linecap": "round", "stroke-linejoin": "round"})
    vertices, edges = network()
    visible_edges = 0
    for start, end in edges:
        if min(start[1], end[1]) > 0.925:
            continue
        if max(start[1], end[1]) > 0.925:
            t = (0.925 - start[1]) / (end[1] - start[1])
            boundary = (start[0] + t * (end[0] - start[0]), 0.925)
            if start[1] > 0.925:
                start = boundary
            else:
                end = boundary
        mid_u = (start[0] + end[0]) / 2
        fade = smoothstep(-0.09, 0.14, mid_u)
        if fade < 0.02:
            continue
        du, dv = end[0] - start[0], end[1] - start[1]

        def curve(t):
            return surface(start[0] + du * t, start[1] + dv * t)

        def tangent(t):
            a, b = derivatives(start[0] + du * t, start[1] + dv * t)
            return a[0] * du + b[0] * dv, a[1] * du + b[1] * dv

        # Cull only edges whose endpoints and midpoint are all outside one side.
        samples = [curve(t) for t in (0, 0.5, 1)]
        if (max(p[0] for p in samples) < 0 or min(p[0] for p in samples) > 1536 or
                max(p[1] for p in samples) < 0 or min(p[1] for p in samples) > 1024):
            continue
        opacity = fade * (0.40 + 0.25 * smoothstep(0.10, 0.50, mid_u))
        ET.SubElement(mesh, "path", {"d": bezier_path(curve, tangent, segments=4),
            "stroke-width": "0.85", "opacity": f"{opacity:.3f}"})
        visible_edges += 1

    dots = ET.SubElement(root, "g", {"fill": COLORS["mesh"]})
    for u, v in sorted(vertices):
        alpha = smoothstep(-0.12, 0.02, u) * (1 - smoothstep(0.16, 0.42, u))
        x, y = surface(u, v)
        if alpha > 0.02 and v <= 0.925 and 0 < x < 1536 and 0 < y < 1024:
            ET.SubElement(dots, "circle", {"cx": f"{x:.5f}", "cy": f"{y:.5f}",
                "r": f"{0.85 + 0.50 * alpha:.2f}", "opacity": f"{0.65 * alpha:.3f}"})

    def boundary_curve(t):
        return surface(1.8 * t, 0.925)

    def boundary_tangent(t):
        a, _ = derivatives(1.8 * t, 0.925)
        return a[0] * 1.8, a[1] * 1.8

    ET.SubElement(mesh, "path", {"d": bezier_path(boundary_curve, boundary_tangent),
        "stroke-width": "0.85", "opacity": "0.65"})

    def red_curve(v):
        return surface(0.44 + 0.04 * sin(pi * v), v)

    def red_tangent(v):
        u = 0.44 + 0.04 * sin(pi * v)
        du = 0.04 * pi * cos(pi * v)
        along_u, along_v = derivatives(u, v)
        return (along_v[0] + du * along_u[0], along_v[1] + du * along_u[1])

    ET.SubElement(root, "path", {"d": bezier_path(lambda t: red_curve(0.925 * t),
        lambda t: tuple(0.925 * d for d in red_tangent(0.925 * t))), "fill": "none", "stroke": COLORS["divider"],
        "stroke-width": "1.7", "stroke-linecap": "round"})
    target = ROOT / "assets/site/quantum-geometry.svg"
    ET.ElementTree(root).write(target, encoding="utf-8", xml_declaration=True)

    determinants = []
    for i in range(101):
        for j in range(101):
            a, b = derivatives(i / 100, j / 100)
            determinants.append(a[0] * b[1] - a[1] * b[0])
    assert min(determinants) > 0, "A mesh cell folds over itself"
    print(f"SVG: {target.name}; {visible_edges} visible shared edges; minimum sampled Jacobian: {min(determinants):.1f}")


if __name__ == "__main__":
    build()
