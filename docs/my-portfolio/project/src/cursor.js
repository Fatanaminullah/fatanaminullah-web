/* Custom cursor — dot + ring, contextual variants */
(function () {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  const state = { x: window.innerWidth/2, y: window.innerHeight/2, rx: 0, ry: 0 };
  state.rx = state.x; state.ry = state.y;
  let enabled = true;

  function onMove(e) {
    state.x = e.clientX;
    state.y = e.clientY;
    dot.style.transform = `translate(${state.x}px, ${state.y}px) translate(-50%, -50%)`;
  }
  function loop() {
    state.rx += (state.x - state.rx) * 0.18;
    state.ry += (state.y - state.ry) * 0.18;
    ring.style.transform = `translate(${state.rx}px, ${state.ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(loop);
  }

  function onOver(e) {
    const t = e.target.closest('[data-cursor]');
    if (t) {
      ring.setAttribute('data-variant', t.dataset.cursor);
    } else {
      ring.removeAttribute('data-variant');
    }
  }

  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseover', onOver);
  requestAnimationFrame(loop);

  window.__setCursorEnabled = function (v) {
    enabled = v;
    document.body.style.cursor = v ? 'none' : 'auto';
    dot.style.display = v ? 'block' : 'none';
    ring.style.display = v ? 'block' : 'none';
  };
})();
