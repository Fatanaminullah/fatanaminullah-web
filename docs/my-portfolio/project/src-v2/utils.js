// Shared utils — warm edition

window.onReady = function (fn) {
  if (document.readyState !== 'loading') fn();
  else document.addEventListener('DOMContentLoaded', fn);
};

// IntersectionObserver-based reveal — adds .in when element enters viewport
window.observeReveals = function (root) {
  root = root || document;
  const els = root.querySelectorAll('.reveal-line, .reveal-word, .reveal-fade, .reveal-up');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        const el = e.target;
        // stagger sibling reveals
        const delay = parseFloat(el.dataset.delay || '0');
        setTimeout(() => el.classList.add('in'), delay * 1000);
        io.unobserve(el);
      }
    });
  }, { threshold: [0, 0.05, 0.15], rootMargin: '0px 0px -5% 0px' });
  els.forEach((el) => io.observe(el));
};

// Split a string into words wrapped with reveal spans
window.splitWords = function (text, delayStart = 0, step = 0.04) {
  return text.split(' ').map((w, i) => {
    const d = delayStart + i * step;
    return `<span class="reveal-word" data-delay="${d}"><span>${w}&nbsp;</span></span>`;
  }).join('');
};

// Tiny clock
window.startClock = function (id) {
  const el = document.getElementById(id);
  if (!el) return;
  const tick = () => {
    const now = new Date();
    const jkt = new Date(now.getTime() + (now.getTimezoneOffset() + 7 * 60) * 60000);
    const hh = String(jkt.getHours()).padStart(2, '0');
    const mm = String(jkt.getMinutes()).padStart(2, '0');
    el.textContent = `JKT · ${hh}:${mm}`;
  };
  tick();
  setInterval(tick, 30000);
};

// Tiny magnetic effect
window.magnetize = function (el, strength = 0.25) {
  el.addEventListener('mousemove', (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
  });
};
