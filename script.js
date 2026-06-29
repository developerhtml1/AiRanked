// ===========================
// ULTIMATE AI RANKING 2026
// Premium Interactions
// ===========================

// ====== LOADING SCREEN ======
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.classList.add('hidden');
      setTimeout(() => loader.remove(), 600);
    }
  }, 1800);
});

// ====== PARTICLE SYSTEM ======
class ParticleSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.connections = [];
    this.mouse = { x: -1000, y: -1000 };
    this.animFrame = null;
    this.resize();
    this.init();
    this.bindEvents();
    this.animate();
  }

  resize() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
  }

  init() {
    this.particles = [];
    const count = Math.floor((this.canvas.width * this.canvas.height) / 12000);
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
        color: Math.random() > 0.5 ? '#4f8fff' : '#8b5cf6',
        pulse: Math.random() * Math.PI * 2
      });
    }
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.resize();
      this.init();
    });
    document.addEventListener('mousemove', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;
      if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

      // Mouse attraction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        p.x += dx * 0.003;
        p.y += dy * 0.003;
      }

      // Draw particle
      const pulseOpacity = p.opacity + Math.sin(p.pulse) * 0.1;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color + Math.floor(pulseOpacity * 255).toString(16).padStart(2,'0');
      this.ctx.fill();

      // Glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
      const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
      grad.addColorStop(0, p.color + '30');
      grad.addColorStop(1, 'transparent');
      this.ctx.fillStyle = grad;
      this.ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const a = this.particles[i];
        const b = this.particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const opacity = (1 - dist / 120) * 0.15;
          this.ctx.beginPath();
          this.ctx.moveTo(a.x, a.y);
          this.ctx.lineTo(b.x, b.y);
          this.ctx.strokeStyle = `rgba(79,143,255,${opacity})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      }
    }

    this.animFrame = requestAnimationFrame(() => this.animate());
  }
}

// ====== NAVBAR SCROLL ======
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ====== SCROLL REVEAL ======
const revealElements = document.querySelectorAll('.fade-up, .fade-in');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ====== PROGRESS BARS ======
const progressBars = document.querySelectorAll('.progress-bar-fill');

const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animated');
      }, 100);
      progressObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ====== CURSOR GLOW ======
const cursorGlow = document.querySelector('.cursor-glow');
if (cursorGlow) {
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });
}

// ====== HOVER TILT EFFECT ======
document.querySelectorAll('.model-card, .category-card, .top-model-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-6px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.1s ease';
  });
});

// ====== SMOOTH SCROLL ======
document.querySelectorAll('[data-scroll-to]').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(btn.dataset.scrollTo);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ====== COUNTER ANIMATION ======
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = target / (duration / 16);
  const isFloat = target % 1 !== 0;
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = isFloat ? start.toFixed(1) : Math.floor(start).toLocaleString();
    if (start >= target) clearInterval(timer);
  }, 16);
}

const counters = document.querySelectorAll('[data-count]');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = parseFloat(entry.target.dataset.count);
      animateCounter(entry.target, target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(el => counterObserver.observe(el));

// ====== MOBILE MENU ======
const mobileToggle = document.querySelector('.nav-mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '70px';
    navLinks.style.left = '0';
    navLinks.style.right = '0';
    navLinks.style.background = 'rgba(5,5,8,0.98)';
    navLinks.style.padding = '20px';
    navLinks.style.backdropFilter = 'blur(24px)';
    navLinks.style.borderBottom = '1px solid rgba(255,255,255,0.08)';
  });
}

// ====== PAGE TRANSITION ======
document.querySelectorAll('a[href]').forEach(link => {
  if (link.hostname === location.hostname && !link.hash && !link.href.startsWith('mailto:')) {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && !href.startsWith('#') && href !== location.pathname) {
        e.preventDefault();
        const transition = document.createElement('div');
        transition.className = 'page-transition';
        document.body.appendChild(transition);
        requestAnimationFrame(() => {
          transition.classList.add('active');
          setTimeout(() => { location.href = href; }, 300);
        });
      }
    });
  }
});

// ====== INIT PARTICLES ======
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('particle-canvas')) {
    new ParticleSystem('particle-canvas');
  }
});

// ====== RADAR CHART ======
function drawRadarChart(canvasId, data, colors) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const size = canvas.width;
  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.38;
  const labels = data.map(d => d.label);
  const n = labels.length;

  ctx.clearRect(0, 0, size, size);

  // Draw grid
  for (let g = 1; g <= 5; g++) {
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = (g / 5) * radius;
      if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(255,255,255,${g === 5 ? 0.12 : 0.06})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw axes
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + radius * Math.cos(angle), cy + radius * Math.sin(angle));
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Draw data for each dataset
  data[0].datasets.forEach((dataset, di) => {
    ctx.beginPath();
    dataset.values.forEach((val, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = (val / 100) * radius;
      if (i === 0) ctx.moveTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      else ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
    });
    ctx.closePath();
    ctx.fillStyle = colors[di] + '25';
    ctx.fill();
    ctx.strokeStyle = colors[di];
    ctx.lineWidth = 2;
    ctx.stroke();

    // Dots
    dataset.values.forEach((val, i) => {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const r = (val / 100) * radius;
      ctx.beginPath();
      ctx.arc(cx + r * Math.cos(angle), cy + r * Math.sin(angle), 4, 0, Math.PI * 2);
      ctx.fillStyle = colors[di];
      ctx.fill();
    });
  });

  // Draw labels
  ctx.font = '13px Inter, sans-serif';
  ctx.textAlign = 'center';
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const r = radius + 28;
    ctx.fillStyle = 'rgba(240,240,255,0.7)';
    ctx.fillText(labels[i], cx + r * Math.cos(angle), cy + r * Math.sin(angle) + 4);
  }
}

// ====== COMPARE FUNCTION ======
function updateComparison() {
  const m1 = document.getElementById('model-1-select')?.value;
  const m2 = document.getElementById('model-2-select')?.value;
  if (!m1 || !m2) return;

  const data = window.modelData || {};
  if (!data[m1] || !data[m2]) return;

  const metrics = ['Coding', 'Reasoning', 'Writing', 'Research', 'Speed', 'Creativity'];
  const container = document.getElementById('compare-result');
  if (!container) return;

  container.innerHTML = metrics.map(metric => {
    const s1 = data[m1].scores[metric] || 0;
    const s2 = data[m2].scores[metric] || 0;
    const winner = s1 > s2 ? 'left' : s2 > s1 ? 'right' : 'tie';
    return `
      <div class="metric-compare-item fade-up">
        <div class="metric-bar-wrap left ${winner === 'left' ? 'winner' : ''}">
          <div class="metric-bar-fill-left" style="width: ${s1}%; background: linear-gradient(90deg, #8b5cf6, #4f8fff);"></div>
          <span class="metric-score">${s1}</span>
        </div>
        <div class="metric-center-label">${metric}</div>
        <div class="metric-bar-wrap right ${winner === 'right' ? 'winner' : ''}">
          <span class="metric-score">${s2}</span>
          <div class="metric-bar-fill-right" style="width: ${s2}%; background: linear-gradient(90deg, #06d6d6, #10b981);"></div>
        </div>
      </div>
    `;
  }).join('');

  // Re-observe new elements
  document.querySelectorAll('.fade-up:not(.visible)').forEach(el => revealObserver.observe(el));
}

// Global model data
window.modelData = {
  chatgpt: {
    name: 'ChatGPT', maker: 'OpenAI',
    scores: { Coding: 92, Reasoning: 90, Writing: 93, Research: 88, Speed: 82, Creativity: 95 }
  },
  claude: {
    name: 'Claude', maker: 'Anthropic',
    scores: { Coding: 96, Reasoning: 95, Writing: 90, Research: 85, Speed: 78, Creativity: 88 }
  },
  gemini: {
    name: 'Gemini', maker: 'Google',
    scores: { Coding: 86, Reasoning: 85, Writing: 94, Research: 87, Speed: 90, Creativity: 82 }
  },
  grok: {
    name: 'Grok', maker: 'xAI',
    scores: { Coding: 80, Reasoning: 78, Writing: 82, Research: 80, Speed: 96, Creativity: 79 }
  },
  perplexity: {
    name: 'Perplexity', maker: 'Perplexity AI',
    scores: { Coding: 72, Reasoning: 75, Writing: 78, Research: 97, Speed: 88, Creativity: 70 }
  },
  deepseek: {
    name: 'DeepSeek', maker: 'DeepSeek',
    scores: { Coding: 88, Reasoning: 84, Writing: 76, Research: 78, Speed: 82, Creativity: 74 }
  },
  midjourney: {
    name: 'Midjourney', maker: 'Midjourney Inc.',
    scores: { Coding: 0, Reasoning: 40, Writing: 0, Research: 0, Speed: 75, Creativity: 98 }
  },
  runway: {
    name: 'Runway', maker: 'Runway AI',
    scores: { Coding: 0, Reasoning: 35, Writing: 0, Research: 0, Speed: 70, Creativity: 96 }
  },
  copilot: {
    name: 'Copilot', maker: 'Microsoft',
    scores: { Coding: 88, Reasoning: 80, Writing: 82, Research: 76, Speed: 84, Creativity: 76 }
  },
  metaai: {
    name: 'Meta AI', maker: 'Meta',
    scores: { Coding: 78, Reasoning: 76, Writing: 80, Research: 74, Speed: 86, Creativity: 81 }
  },
  mistral: {
    name: 'Mistral', maker: 'Mistral AI',
    scores: { Coding: 84, Reasoning: 82, Writing: 78, Research: 76, Speed: 90, Creativity: 75 }
  },
  leonardo: {
    name: 'Leonardo AI', maker: 'Leonardo.AI',
    scores: { Coding: 0, Reasoning: 38, Writing: 0, Research: 0, Speed: 72, Creativity: 94 }
  }
};
