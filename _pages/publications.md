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

This page highlights selected first-author papers and other highly cited representative works, ordered from recent to earlier works.

## Selected First-Author Papers

{% assign first_author_papers = site.publications | where: "selected_group", "first_author" | sort: "selected_sort" | reverse %}
{% for post in first_author_papers %}
  {% include archive-single.html %}
{% endfor %}

## Other Highly Cited Representative Papers

{% assign representative_papers = site.publications | where: "selected_group", "representative" | sort: "selected_sort" | reverse %}
{% for post in representative_papers %}
  {% include archive-single.html %}
{% endfor %}
