---
layout: archive
title: "Selected Works"
permalink: /publications/
author_profile: true
---

{% if site.author.googlescholar %}
  <div class="wordwrap">For a complete and up-to-date publication list, please see <a href="{{site.author.googlescholar}}">my Google Scholar profile</a>.</div>
{% endif %}

{% include base_path %}

This page highlights selected works grouped by research topic. Within each topic, works are ordered from recent to earlier.

## Quantum Nonlocality and Many-Body Systems

{% assign nonlocality_papers = site.publications | where: "topic_group", "nonlocality_many_body" | sort: "selected_sort" | reverse %}
{% for post in nonlocality_papers %}
  {% include archive-single.html %}
{% endfor %}

## Quantum Stochastic Thermodynamics and Fluctuation Relations

{% assign stochastic_papers = site.publications | where: "topic_group", "stochastic_thermodynamics" | sort: "selected_sort" | reverse %}
{% for post in stochastic_papers %}
  {% include archive-single.html %}
{% endfor %}

## Finite-Time Thermodynamics and Heat Engines

{% assign heat_engine_papers = site.publications | where: "topic_group", "finite_time_heat_engines" | sort: "selected_sort" | reverse %}
{% for post in heat_engine_papers %}
  {% include archive-single.html %}
{% endfor %}

## Quantum Transport and Nonequilibrium Phenomena

{% assign transport_papers = site.publications | where: "topic_group", "transport_nonequilibrium" | sort: "selected_sort" | reverse %}
{% for post in transport_papers %}
  {% include archive-single.html %}
{% endfor %}
