---
layout: post
title: "Building a Canvas Starfield — requestAnimationFrame Deep Dive"
date: 2024-01-22
tags: [javascript, canvas, animation, tutorial]
description: "How to build a performant twinkling starfield with parallax scroll using vanilla JS and the HTML5 Canvas API."
---

The starfield in Galaxy Theme is ~80 lines of vanilla JS. Here's exactly how it works.

## The Architecture

Three principles drive the implementation:

1. **Single canvas element** — never create DOM nodes per star
2. **requestAnimationFrame** — sync with the display refresh rate
3. **Per-star state** — each star has its own twinkle phase and speed

## Star Data Model

```javascript
function randomStar() {
  return {
    x:     Math.random() * W,
    y:     Math.random() * H,
    r:     Math.random() * 1.4 + 0.2,     // radius 0.2–1.6px
    alpha: Math.random() * 0.7 + 0.2,     // base brightness
    speed: Math.random() * 0.003 + 0.001, // twinkle speed
    phase: Math.random() * Math.PI * 2,   // initial phase offset
    depth: Math.random()                   // parallax depth 0=far, 1=close
  };
}
```

The `phase` offset is critical — without it, all stars twinkle in sync, which looks fake.

## The Draw Loop

```javascript
var t = 0;

function draw() {
  ctx.clearRect(0, 0, W, H);
  t += 0.016; // ~60fps time increment

  for (var i = 0; i < stars.length; i++) {
    var s = stars[i];

    // Twinkle: sine wave modulates the base alpha
    var twinkle = s.alpha * (0.75 + 0.25 * Math.sin(t * (s.speed * 200) + s.phase));

    // Parallax: deeper stars move more on scroll
    var dy = (s.y + scrollY * s.depth * 0.04) % H;

    ctx.beginPath();
    ctx.arc(s.x, dy, s.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,' + twinkle.toFixed(3) + ')';
    ctx.fill();

    // Larger stars get a soft purple halo
    if (s.r > 1.0) {
      ctx.beginPath();
      ctx.arc(s.x, dy, s.r * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(200,180,255,' + (twinkle * 0.15).toFixed(3) + ')';
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}
```

## Parallax on Scroll

The parallax is simple: each star has a `depth` value (0–1). On scroll, we offset the star's y position by `scrollY * depth * factor`. Stars with `depth=0` don't move (far away), stars with `depth=1` move the most (close).

```javascript
var scrollY = 0;
window.addEventListener('scroll', function () {
  scrollY = window.scrollY;
}, { passive: true }); // passive = no jank
```

Using `passive: true` is essential — it tells the browser your scroll handler won't call `preventDefault()`, enabling smoother scrolling.

## Resizing

```javascript
function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}

window.addEventListener('resize', function () {
  resize();
  initStars(); // re-randomize after resize
}, { passive: true });
```

Always call `initStars()` after resize — otherwise stars cluster at the edges of the old canvas size.

## Performance Numbers

On a MacBook M1, 320 stars run at <0.1ms per frame. You can push to 1000+ stars before noticing any impact. The bottleneck is canvas `arc()` calls, not JS logic.

To profile: open Chrome DevTools → Performance tab → record while scrolling.
