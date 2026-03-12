/* ================================================
   THISAL KANDEPOLA — PORTFOLIO  |  main.js
   ================================================ */
'use strict';

/* ────────────────────────────────────────────────
   PRELOADER
──────────────────────────────────────────────── */
(function preloader() {
  const el   = document.getElementById('preloader');
  const bar  = document.getElementById('preBar');
  const lbl  = document.getElementById('preLabel');
  const msgs = ['LOADING', 'ASSETS', 'RENDERING', 'WELCOME'];
  let  pct   = 0;

  const iv = setInterval(() => {
    pct += Math.random() * 16 + 6;
    if (pct >= 100) pct = 100;
    bar.style.width = pct + '%';
    lbl.textContent = msgs[Math.min(3, Math.floor(pct / 26))];
    if (pct >= 100) {
      clearInterval(iv);
      setTimeout(() => {
        el.classList.add('done');
        revealHero();
      }, 350);
    }
  }, 70);
})();

/* ────────────────────────────────────────────────
   CUSTOM CURSOR
──────────────────────────────────────────────── */
(function cursor() {
  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorCircle');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  (function animRing() {
    rx += (mx - rx) * 0.13;
    ry += (my - ry) * 0.13;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();

  const interactives = 'a,button,.atag,.spill,.proj-card,.exp-card,.lang-card,.cch,input,textarea';
  document.querySelectorAll(interactives).forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('grow'); ring.classList.add('grow'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('grow'); ring.classList.remove('grow'); });
  });
})();

/* ────────────────────────────────────────────────
   SCROLL PROGRESS
──────────────────────────────────────────────── */
(function scrollProgress() {
  const bar = document.getElementById('readProgress');
  window.addEventListener('scroll', () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
  }, { passive: true });
})();

/* ────────────────────────────────────────────────
   HEADER SCROLL + ACTIVE NAV
──────────────────────────────────────────────── */
(function header() {
  const hdr   = document.getElementById('header');
  const links = document.querySelectorAll('.nav-a');

  function update() {
    hdr.classList.toggle('scrolled', window.scrollY > 30);
    const sections = document.querySelectorAll('section[id]');
    let active = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) active = s.id;
    });
    links.forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + active);
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();

/* ────────────────────────────────────────────────
   MOBILE NAV
──────────────────────────────────────────────── */
(function mobileNav() {
  const btn  = document.getElementById('burger');
  const nav  = document.getElementById('mobNav');

  btn.addEventListener('click', () => {
    btn.classList.toggle('open');
    nav.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  document.querySelectorAll('.mob-link').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      nav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

/* ────────────────────────────────────────────────
   SMOOTH SCROLL
──────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - 68, behavior: 'smooth' });
  });
});

/* ────────────────────────────────────────────────
   HERO — reveal & typewriter
──────────────────────────────────────────────── */
function revealHero() {
  document.querySelectorAll('#home .fade-up').forEach(el => {
    const delay = parseFloat(el.style.getPropertyValue('--d') || '0') * 1000;
    setTimeout(() => el.classList.add('in'), delay);
  });
  typewriter();
}

function typewriter() {
  const el = document.getElementById('roleText');
  if (!el) return;
  const roles = [
    'Full Stack Developer',
    'UI/UX Designer',
    'AI Enthusiast',
    'Game Designer',
    'Software Engineer',
  ];
  let ri = 0, ci = 0, del = false;

  function tick() {
    const r = roles[ri];
    el.textContent = del ? r.slice(0, --ci) : r.slice(0, ++ci);
    if (!del && ci === r.length) { del = true; setTimeout(tick, 1600); return; }
    if (del && ci === 0)          { del = false; ri = (ri + 1) % roles.length; }
    setTimeout(tick, del ? 55 : 85);
  }
  tick();
}

/* ────────────────────────────────────────────────
   SCROLL REVEAL
──────────────────────────────────────────────── */
(function scrollReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.closest('#home')) obs.observe(el);
  });
})();

/* ────────────────────────────────────────────────
   SKILL BARS
──────────────────────────────────────────────── */
(function skillBars() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.dataset.w + '%';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.sbar-fill').forEach(b => obs.observe(b));
})();

/* ────────────────────────────────────────────────
   STAT COUNTERS
──────────────────────────────────────────────── */
(function counters() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el  = e.target;
      const end = parseInt(el.dataset.target);
      let   cur = 0;
      const iv  = setInterval(() => {
        cur = Math.min(cur + 1, end);
        el.textContent = cur + '+';
        if (cur >= end) clearInterval(iv);
      }, 80);
      obs.unobserve(el);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hs-n[data-target]').forEach(n => obs.observe(n));
})();

/* ────────────────────────────────────────────────
   HERO PARTICLE CANVAS
──────────────────────────────────────────────── */
(function particles() {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H;
  const N = 70;
  let pts = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  new ResizeObserver(resize).observe(canvas.parentElement);

  class Pt {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - .5) * .35;
      this.vy = (Math.random() - .5) * .35;
      this.r  = Math.random() * 1.2 + .4;
      this.o  = Math.random() * .35 + .08;
    }
    step() {
      this.x += this.vx; this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(56,189,248,${this.o})`;
      ctx.fill();
    }
  }

  let mouseX = -999, mouseY = -999;
  canvas.parentElement.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouseX = e.clientX - r.left;
    mouseY = e.clientY - r.top;
  });

  for (let i = 0; i < N; i++) pts.push(new Pt());

  function connect() {
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 110) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(56,189,248,${.05 * (1 - d / 110)})`;
          ctx.lineWidth = .5;
          ctx.stroke();
        }
      }
    }
  }

  (function loop() {
    ctx.clearRect(0, 0, W, H);
    pts.forEach(p => {
      // Mouse repulsion
      const dx = p.x - mouseX, dy = p.y - mouseY;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 90) {
        p.vx += dx / d * .12;
        p.vy += dy / d * .12;
        const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (spd > 1.8) { p.vx /= spd * .6; p.vy /= spd * .6; }
      }
      p.step(); p.draw();
    });
    connect();
    requestAnimationFrame(loop);
  })();
})();

/* ────────────────────────────────────────────────
   EXTERNAL LINK FIX
   Forces external links to open in a new tab
   even when running from file:// protocol
──────────────────────────────────────────────── */
document.querySelectorAll('a[target="_blank"]').forEach(function(link) {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  });
});

/* ────────────────────────────────────────────────
   CONTACT FORM
──────────────────────────────────────────────── */
function submitForm(e) {
  e.preventDefault();
  const btn     = document.getElementById('formBtnTxt');
  const success = document.getElementById('cformSuccess');
  btn.textContent = 'Sending…';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    e.target.reset();
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1100);
}