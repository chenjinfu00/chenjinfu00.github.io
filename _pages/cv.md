---
layout: archive
title: "CV"
permalink: /cv/
author_profile: true
redirect_from:
  - /resume
---

{% include base_path %}

Academic Positions
======
* **Postdoctoral Researcher**, Leiden University, 2024-present
  * Group of Jordi Tura
  * Research topics: quantum nonlocality, many-body systems, and quantum thermodynamics

* **Postdoctoral Researcher**, Peking University, 2021-2024
  * Group of H. T. Quan
  * Research topics: mesoscopic thermodynamics, fluctuation theorems, and optimal control

* **Ph.D. Researcher in Quantum Physics**, Beijing Computational Science Research Center (CSRC), 2016-2021
  * Supervisor: C. P. Sun

Education
======
* **Ph.D. in Quantum Physics**, Beijing Computational Science Research Center (CSRC), 2021
* **B.S. in Physics**, Peking University, 2016
* **B.S. in Mathematics** (double degree), Peking University, 2016

Research Interests
======
* Quantum nonlocality
* Quantum thermodynamics
* Stochastic thermodynamics
* Many-body quantum systems
* Tensor networks
* Finite-time control and optimization

Profiles
======
* [Google Scholar](https://scholar.google.ca/citations?user=2n7U598AAAAJ&hl=en&oi=ao)
* [ORCID](http://orcid.org/0000-0002-7207-969X)
* [ResearchGate](https://www.researchgate.net/profile/Jinfu-Chen-2)
* [GitHub](https://github.com/chenjinfu00)

Selected Works
======
<ul>{% for post in site.publications reversed %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>

Talks and Presentations
======
<ul>{% assign talks = site.talks | where: "presentation_group", "talk" | sort: "date" | reverse %}
{% for post in talks %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>

Posters
======
<ul>{% assign posters = site.talks | where: "presentation_group", "poster" | sort: "date" | reverse %}
{% for post in posters %}
  {% include archive-single-talk-cv.html %}
{% endfor %}</ul>

Teaching
======
<ul>{% for post in site.teaching reversed %}
  {% include archive-single-cv.html %}
{% endfor %}</ul>
