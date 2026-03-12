/* cspell:disable */
'use strict';

/* ── PRELOADER ── */
(function () {
  const bar   = document.getElementById('preBar');
  const label = document.getElementById('preLabel');
  const pre   = document.getElementById('preloader');
  let pct = 0;
  document.body.style.overflow = 'hidden';
  const tick = setInterval(() => {
    pct += Math.random() * 18;
    if (pct >= 100) { pct = 100; clearInterval(tick); }
    const v = Math.floor(pct);
    bar.style.width   = v + '%';
    label.textContent = v + '%';
    if (pct === 100) setTimeout(() => {
      pre.classList.add('gone');
      document.body.style.overflow = '';
    }, 400);
  }, 80);
})();

/* ── CUSTOM CURSOR ── */
(function () {
  const cursor = document.getElementById('cursor');
  if (!cursor || window.matchMedia('(hover:none)').matches) return;
  const dot  = cursor.querySelector('.c-dot');
  const ring = cursor.querySelector('.c-ring');
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function animate() {
    dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(animate);
  })();
})();

/* ── HERO CANVAS — dark-blue particle field ── */
(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];
  const mouse = { x: -1000, y: -1000 };

  function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() { this.reset(true); }
    reset(init) {
      this.x    = Math.random() * W;
      this.y    = init ? Math.random() * H : -10;
      this.vx   = (Math.random() - 0.5) * 0.2;
      this.vy   = 0.1 + Math.random() * 0.35;
      this.size = 0.5 + Math.random() * 1.8;
      this.alpha = 0.1 + Math.random() * 0.45;
      this.blue = Math.random() > 0.55;
    }
    update() {
      const dx = this.x - mouse.x, dy = this.y - mouse.y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 130) { const f = (130 - d) / 130; this.vx += dx / d * f * 0.35; this.vy += dy / d * f * 0.35; }
      this.vx *= 0.97; this.vy *= 0.97;
      this.x += this.vx; this.y += this.vy;
      if (this.y > H + 10) this.reset(false);
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle   = this.blue ? '#3b82f6' : 'rgba(148,186,255,0.7)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < 130; i++) particles.push(new Particle());

  canvas.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -1000; mouse.y = -1000; });

  (function loop() {
    ctx.clearRect(0, 0, W, H);

    // subtle blue radial glow
    const g = ctx.createRadialGradient(W * 0.5, H * 0.45, 0, W * 0.5, H * 0.45, W * 0.6);
    g.addColorStop(0, 'rgba(59,130,246,0.06)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    particles.forEach(p => { p.update(); p.draw(); });

    // connection lines
    for (let i = 0; i < particles.length; i++)
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 90) {
          ctx.save();
          ctx.globalAlpha = (1 - d / 90) * 0.07;
          ctx.strokeStyle = '#3b82f6';
          ctx.lineWidth   = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
          ctx.restore();
        }
      }
    requestAnimationFrame(loop);
  })();
})();

/* ── HEADER SCROLL + PROGRESS BAR ── */
(function () {
  const header = document.getElementById('header');
  const bar    = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    if (header) header.classList.toggle('scrolled', s > 30);
    if (bar) {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? s / total * 100 : 0) + '%';
    }
  }, { passive: true });
})();

/* ── MOBILE MENU ── */
(function () {
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobMenu');
  if (!burger || !menu) return;
  function toggle(open) {
    burger.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    menu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  burger.addEventListener('click', () => toggle(!menu.classList.contains('open')));
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
})();

/* ── TYPEWRITER ── */
(function () {
  const el = document.getElementById('roleText');
  if (!el) return;
  const roles = ['Full Stack Developer', 'UI/UX Designer', 'C# Developer', 'PHP Developer', 'AI Enthusiast'];
  let ri = 0, ci = 0, deleting = false;
  function type() {
    const word = roles[ri];
    el.textContent = deleting ? word.substring(0, ci--) : word.substring(0, ci++);
    if (!deleting && ci > word.length)  { deleting = true; setTimeout(type, 1600); return; }
    if (deleting && ci < 0)             { deleting = false; ri = (ri + 1) % roles.length; ci = 0; }
    setTimeout(type, deleting ? 48 : 88);
  }
  type();
})();

/* ── SCROLL REVEAL ── */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll('.ru').forEach(el => io.observe(el));
})();

/* ── STAT COUNTERS ── */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const target = +e.target.dataset.target;
      let cur = 0;
      const step = () => { cur = Math.min(cur + 1, target); e.target.textContent = cur; if (cur < target) requestAnimationFrame(step); };
      requestAnimationFrame(step);
      io.unobserve(e.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.hs-n').forEach(el => io.observe(el));
})();

/* ── SKILL BARS ── */
(function () {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.style.width = e.target.dataset.w + '%'; io.unobserve(e.target); } });
  }, { threshold: 0.3 });
  document.querySelectorAll('.sb-fill').forEach(b => io.observe(b));
})();

/* ── EXTERNAL LINK FIX (works from file://) ── */
document.querySelectorAll('a[target="_blank"]').forEach(link => {
  link.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
      e.preventDefault();
      window.open(href, '_blank', 'noopener,noreferrer');
    }
  });
});

/* ── CONTACT FORM ── */
function submitForm(e) {
  e.preventDefault();
  const btn     = document.getElementById('btnTxt');
  const success = document.getElementById('cSuccess');
  btn.textContent = 'Sending…';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    e.target.reset();
    success.classList.add('show');
    setTimeout(() => success.classList.remove('show'), 5000);
  }, 1200);
}