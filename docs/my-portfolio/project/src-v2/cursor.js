// Custom cursor — small dot + trailing ring, warm accent, contextual variants
(function () {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;
  let x = innerWidth / 2, y = innerHeight / 2;
  let rx = x, ry = y;
  window.addEventListener('mousemove', (e) => { x = e.clientX; y = e.clientY; });
  function loop() {
    rx += (x - rx) * 0.14;
    ry += (y - ry) * 0.14;
    dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  document.addEventListener('mouseover', (e) => {
    const t = e.target.closest('[data-cursor]');
    if (t) ring.dataset.variant = t.dataset.cursor;
    else delete ring.dataset.variant;
  });

  // auto-hide on touch
  if (matchMedia('(hover: none)').matches) {
    dot.style.display = ring.style.display = 'none';
    document.body.style.cursor = 'auto';
  }
})();
