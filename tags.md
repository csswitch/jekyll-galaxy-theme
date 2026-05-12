---
layout: page
title: "Tags"
permalink: /tags/
---

<div class="tag-cloud">
  <div class="tags-row">
    {% assign all_tags = site.posts | map: "tags" | join: "," | split: "," | sort | uniq %}
    {% for tag in all_tags %}
    {% assign count = site.posts | where_exp: "post", "post.tags contains tag" | size %}
    <a href="#{{ tag | slugify }}" class="tag-star" style="font-size:{{ count | times: 0.1 | plus: 0.8 }}rem">
      {{ tag }} <small style="opacity:.5">({{ count }})</small>
    </a>
    {% endfor %}
  </div>
</div>

{% for tag in all_tags %}
{% assign tagged = site.posts | where_exp: "post", "post.tags contains tag" %}
{% if tagged.size > 0 %}
<section id="{{ tag | slugify }}" style="margin-bottom:3rem">
  <h2 class="section-title">{{ tag }}<span class="section-title__count">{{ tagged.size }}</span></h2>
  <ul style="list-style:none;padding:0">
    {% for post in tagged %}
    <li style="display:flex;gap:1rem;align-items:baseline;padding:.75rem 0;border-bottom:1px solid rgba(255,255,255,0.05)">
      <time style="font-family:monospace;font-size:.75rem;color:rgba(255,255,255,.3);min-width:80px" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d, %Y" }}</time>
      <a href="{{ post.url | relative_url }}" style="color:rgba(255,255,255,.6);font-size:.9rem;transition:color .2s" onmouseover="this.style.color='#e879f9'" onmouseout="this.style.color='rgba(255,255,255,.6)'">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</section>
{% endif %}
{% endfor %}
