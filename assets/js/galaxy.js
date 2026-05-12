/*!
 * Galaxy Theme — Starfield Engine + UI
 * csswitch.github.io | MIT License
 */
(function () {
  'use strict';

  // ────────────────────────────────────────────────
  // Canvas Starfield
  // ────────────────────────────────────────────────
  var canvas = document.getElementById('galaxy-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var stars = [];
    var W, H;
    var STAR_COUNT = 320;

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function randomStar() {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.4 + 0.2,
        alpha: Math.random() * 0.7 + 0.2,
        speed: Math.random() * 0.003 + 0.001, // twinkle speed
        phase: Math.random() * Math.PI * 2,
        // parallax depth 0=far 1=close
        depth: Math.random()
      };
    }

    function initStars() {
      stars = [];
      for (var i = 0; i < STAR_COUNT; i++) stars.push(randomStar());
    }

    var scrollY = 0;
    window.addEventListener('scroll', function () { scrollY = window.scrollY; }, { passive: true });

    var t = 0;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      t += 0.016;

      for (var i = 0; i < stars.length; i++) {
        var s = stars[i];
        var twinkle = s.alpha * (0.75 + 0.25 * Math.sin(t * (s.speed * 200) + s.phase));

        // Subtle parallax on scroll
        var yOffset = scrollY * s.depth * 0.04;
        var dy = (s.y + yOffset) % H;

        ctx.beginPath();
        ctx.arc(s.x, dy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + twinkle.toFixed(3) + ')';
        ctx.fill();

        // Larger stars get a soft glow
        if (s.r > 1.0) {
          ctx.beginPath();
          ctx.arc(s.x, dy, s.r * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200,180,255,' + (twinkle * 0.15).toFixed(3) + ')';
          ctx.fill();
        }
      }

      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () { resize(); initStars(); }, { passive: true });
    resize();
    initStars();
    draw();
  }

  // ────────────────────────────────────────────────
  // Comet reading progress
  // ────────────────────────────────────────────────
  var comet = document.querySelector('.comet-progress');
  if (comet) {
    function updateComet() {
      var scrollTop  = window.scrollY;
      var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      comet.style.width = Math.min(pct, 100) + '%';
    }
    window.addEventListener('scroll', updateComet, { passive: true });
    updateComet();
  }

  // ────────────────────────────────────────────────
  // Copy code buttons
  // ────────────────────────────────────────────────
  document.querySelectorAll('pre').forEach(function (pre) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', 'Copy code');
    pre.style.position = 'relative';
    pre.appendChild(btn);

    btn.addEventListener('click', function () {
      var code = pre.querySelector('code');
      var text = code ? code.innerText : pre.innerText;

      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = '✓ copied'; btn.classList.add('copied');
        setTimeout(function () { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 2000);
      }).catch(function () {
        var ta = document.createElement('textarea');
        ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
        document.body.appendChild(ta); ta.select(); document.execCommand('copy'); ta.remove();
        btn.textContent = '✓ copied'; btn.classList.add('copied');
        setTimeout(function () { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 2000);
      });
    });
  });

  // ────────────────────────────────────────────────
  // Mobile nav toggle
  // ────────────────────────────────────────────────
  var toggle = document.querySelector('.galaxy-nav__toggle');
  var nav    = document.querySelector('.galaxy-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('nav-open') ? 'true' : 'false');
    });
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) {
        nav.classList.remove('nav-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ────────────────────────────────────────────────
  // Heading anchor links (post body)
  // ────────────────────────────────────────────────
  document.querySelectorAll('.post-body h2, .post-body h3, .post-body h4').forEach(function (h) {
    if (!h.id) {
      h.id = h.textContent.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
    }
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.style.cssText = 'opacity:0;margin-left:0.4em;color:#a855f7;font-size:0.75em;text-decoration:none;transition:opacity 0.2s';
    a.innerHTML = '✦';
    a.setAttribute('aria-label', 'Link to ' + h.textContent);
    h.appendChild(a);
    h.addEventListener('mouseenter', function () { a.style.opacity = '1'; });
    h.addEventListener('mouseleave', function () { a.style.opacity = '0'; });
  });

  // ────────────────────────────────────────────────
  // Smooth scroll
  // ────────────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var id = this.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.pushState(null, null, '#' + id);
      }
    });
  });

})();
