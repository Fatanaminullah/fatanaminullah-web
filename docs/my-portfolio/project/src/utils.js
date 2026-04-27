// Shared utility for split-text reveals and observing elements
window.FatanUtils = (function () {
  function splitLines(text) {
    return text.split('\n').map(l => l.trim()).filter(Boolean);
  }
  function observe(selector, cls = 'in', opts = { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add(cls);
          io.unobserve(e.target);
        }
      });
    }, opts);
    document.querySelectorAll(selector).forEach(el => {
      // If already in viewport on mount, reveal immediately (skip observer race)
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      if (r.top < vh && r.bottom > 0) {
        el.classList.add(cls);
      } else {
        io.observe(el);
      }
    });
    return io;
  }
  // single observer used for all reveal targets so elements added later can be observed too
  let globalIO = null;
  const seen = new WeakSet();
  function ensureIO() {
    if (globalIO) return globalIO;
    globalIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          globalIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    return globalIO;
  }
  function registerAll() {
    const io = ensureIO();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    document.querySelectorAll('.reveal-line, .reveal-word, .reveal-fade, [data-reveal]').forEach(el => {
      if (seen.has(el)) return;
      seen.add(el);
      const r = el.getBoundingClientRect();
      if (r.top < vh && r.bottom > 0) {
        el.classList.add('in');
      } else {
        io.observe(el);
      }
    });
  }
  function initReveals() {
    registerAll();
    // catch React-committed nodes that arrive after the initial mount
    const mo = new MutationObserver(() => registerAll());
    mo.observe(document.body, { childList: true, subtree: true });
    // safety nets: re-register a few times during initial paint
    [50, 200, 600, 1500].forEach(ms => setTimeout(registerAll, ms));
    window.addEventListener('scroll', registerAll, { passive: true });
  }
  // clock
  function startClock() {
    const el = document.getElementById('clock');
    if (!el) return;
    const tick = () => {
      const now = new Date();
      // Jakarta = UTC+7
      const jkt = new Date(now.getTime() + (7 * 60 + now.getTimezoneOffset()) * 60000);
      const hh = String(jkt.getHours()).padStart(2,'0');
      const mm = String(jkt.getMinutes()).padStart(2,'0');
      const ss = String(jkt.getSeconds()).padStart(2,'0');
      el.textContent = `JKT · ${hh}:${mm}:${ss}`;
    };
    tick();
    setInterval(tick, 1000);
  }
  // lerp
  const lerp = (a,b,t) => a + (b-a) * t;
  return { splitLines, observe, initReveals, startClock, lerp };
})();
