---
layout: post
title: "Welcome to Galaxy Theme — Deep Space Jekyll"
date: 2024-01-15
tags: [design, space, getting-started]
description: "A deep-space Jekyll theme with canvas starfield, shooting stars, nebula backgrounds, and a comet reading progress bar."
---

Welcome to **Galaxy Theme** — a Jekyll theme set in deep space. Stars twinkle in a real-time canvas engine, shooting stars streak across the background, and nebula clouds drift behind the content.

## What Makes This Theme Different

Most dark themes just use a dark background. Galaxy Theme builds an actual space environment:

- **Canvas starfield** — 320 stars rendered via `requestAnimationFrame`, each with individual twinkle speed and parallax depth relative to scroll
- **CSS nebula layers** — three animated radial gradients create atmospheric depth without images
- **Shooting stars** — pure CSS `@keyframes` animations, three lanes across the viewport
- **Pulsar featured card** — your latest post pulses with a ring animation, like a magnetar

## Quick Configuration

```yaml
galaxy:
  nebula: "purple"   # purple | blue | gold | cyan | red
  stars: "normal"    # sparse | normal | dense
  shooting_stars: true
  comet_progress: true
```

Change `nebula: "blue"` for a blue-white star cluster feel. Change to `"gold"` for a warm nebula aesthetic.

## Writing Posts

Create files in `_posts/` with filename `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "My Deep Dive"
date: 2024-01-15
tags: [tutorial, css]
description: "Short excerpt for post cards."
---

Content goes here...
```

The first post automatically gets the "Pulsar" featured treatment on the home page.

## Performance

The canvas starfield uses `requestAnimationFrame` with a single canvas — no DOM elements per star. On a mid-range device: ~0.1ms per frame for 320 stars.

Shooting stars use CSS animations only — zero JS.
