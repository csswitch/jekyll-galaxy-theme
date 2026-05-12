---
layout: page
title: "Archive"
permalink: /archive/
---

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year_group in posts_by_year %}
<div class="archive-year">
  <h2 class="archive-year__heading">{{ year_group.name }}</h2>
  <ul class="archive-year__list">
    {% for post in year_group.items %}
    <li>
      <time class="archive-year__date" datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%b %-d" }}</time>
      <a href="{{ post.url | relative_url }}" class="archive-year__link">{{ post.title }}</a>
    </li>
    {% endfor %}
  </ul>
</div>
{% endfor %}
