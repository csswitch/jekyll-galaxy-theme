# Galaxy Theme — Deep Space Jekyll Theme

[![License: csswitch Commercial](https://img.shields.io/badge/license-csswitch%20commercial-blue.svg)](./LICENSE)
[![Buy on Gumroad](https://img.shields.io/badge/Buy-%2449-brightgreen.svg)](https://csswitch.gumroad.com/l/csswitch-galaxy)
[![Live Demo](https://img.shields.io/badge/demo-live-orange.svg)](https://csswitch.github.io/jekyll-galaxy-theme/)

## 📄 License & Pricing

|  | Free | Paid — $49 |
|--|------|------------|
| Personal / non-commercial site | ✅ | ✅ |
| **Footer attribution required** | ✅ must keep | ❌ removed |
| Commercial / client projects | ❌ | ✅ |
| Future theme updates | ❌ | ✅ |
| Private source repo access | ❌ | ✅ |

**Free to use** on personal projects — just keep the small *"Theme by csswitch"* footer link intact.  
**Buy the $49 license** to remove the attribution, use commercially, and receive future updates.

**[Buy on Gumroad — $49 →](https://csswitch.gumroad.com/l/csswitch-galaxy)**

See [LICENSE](./LICENSE) for full terms.

---

[![MIT License](https://img.shields.io/badge/license-MIT-blueviolet.svg)](LICENSE)
[![Jekyll](https://img.shields.io/badge/jekyll-4.3-blueviolet.svg)](https://jekyllrb.com)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-compatible-blueviolet.svg)](https://pages.github.com)

> A deep-space Jekyll theme with an animated canvas starfield, CSS nebula clouds, shooting stars, and a comet reading progress bar.

**[Live Demo →](https://csswitch.github.io/jekyll-galaxy-theme)**

---

## ✨ Features

- 🌌 **Canvas starfield** — 320 twinkling stars with parallax scroll depth, rendered in `requestAnimationFrame`
- 🌠 **Shooting stars** — CSS-animated across 3 lanes, fully configurable
- 🔮 **Nebula CSS clouds** — animated radial gradient layers give atmospheric depth
- 🌟 **Pulsar featured card** — latest post has a pulsing ring animation
- ☄️ **Comet progress bar** — reading progress shown as a comet trail
- 📱 **Fully responsive** — constellation grid adapts from 1→3 columns
- ⚡ **Zero dependencies** — ~5KB vanilla JS
- 🐙 **GitHub Pages compatible** — no unsupported plugins
- ♿ **Accessible** — keyboard nav, ARIA labels, `prefers-reduced-motion` aware
- 🏷️ **Tag system + archive** — tag cloud, per-tag archives, year-grouped archive
- 🔍 **SEO ready** — jekyll-seo-tag, sitemap, RSS feed

## 🚀 Quick Start

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_BLOG.git
cd YOUR_BLOG
bundle install
bundle exec jekyll serve --livereload
# open http://localhost:4000
```

## ⚙️ Configuration

```yaml
galaxy:
  nebula: "purple"      # purple | blue | gold | red | cyan
  stars: "normal"       # sparse | normal | dense
  shooting_stars: true  # CSS shooting star animations
  comet_progress: true  # reading progress bar on posts
```

## 📁 Structure

```
jekyll-galaxy-theme/
├── _config.yml
├── _layouts/
│   ├── default.html   ← starfield canvas + nav + footer
│   ├── home.html      ← pulsar card + constellation grid
│   ├── post.html      ← post with comet progress + prev/next
│   └── page.html
├── _sass/
│   ├── _variables.scss
│   ├── _base.scss
│   ├── _layout.scss   ← starfield, nebula, nav, footer
│   └── _components.scss
├── assets/
│   ├── css/main.scss
│   └── js/galaxy.js   ← starfield engine + UI
└── _posts/
```

## 📄 License

MIT © [csswitch](https://github.com/csswitch)

---

Made with 💜 by [csswitch](https://github.com/csswitch) — distinctive Jekyll themes for developers.
