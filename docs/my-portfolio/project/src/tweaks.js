/* Tweaks panel + edit-mode protocol */
(function () {
  const ACCENTS = {
    indigo:  { val: 'oklch(64% 0.22 268)', hex: '#7C75F2' },
    cyan:    { val: 'oklch(72% 0.15 210)', hex: '#4ABAD9' },
    amber:   { val: 'oklch(75% 0.17 70)',  hex: '#DDA057' },
    crimson: { val: 'oklch(62% 0.22 20)',  hex: '#E2545B' },
    lime:    { val: 'oklch(82% 0.19 135)', hex: '#8AE05A' },
  };

  const tweaks = document.getElementById('tweaks');
  const swatches = document.getElementById('swatches');
  const cursorSel = document.getElementById('cursorSel');

  function apply(config) {
    const a = ACCENTS[config.accent] || ACCENTS.indigo;
    document.documentElement.style.setProperty('--accent', a.val);
    document.documentElement.style.setProperty('--accent-hex', a.hex);
    // dim is derived by oklch alpha — reapply
    document.documentElement.style.setProperty('--accent-dim', a.val.replace(')', ' / 0.18)').replace('oklch(', 'oklch(').replace(' / 0.18 / 0.18)', ' / 0.18)'));
    if (cursorSel) cursorSel.value = String(config.cursor ?? true);
    if (typeof window.__setCursorEnabled === 'function') window.__setCursorEnabled(config.cursor ?? true);
    [...swatches.querySelectorAll('.swatch')].forEach(b => b.classList.toggle('active', b.dataset.color === config.accent));
  }

  // seed from defaults
  let defaults;
  try { defaults = JSON.parse(document.getElementById('tweak-defaults').textContent); } catch { defaults = { accent: 'indigo', cursor: true }; }
  apply(defaults);
  let current = { ...defaults };

  function set(patch) {
    current = { ...current, ...patch };
    apply(current);
    try {
      window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*');
    } catch {}
  }

  swatches?.addEventListener('click', (e) => {
    const b = e.target.closest('.swatch');
    if (!b) return;
    set({ accent: b.dataset.color });
  });
  cursorSel?.addEventListener('change', (e) => {
    set({ cursor: e.target.value === 'true' });
  });

  // edit-mode protocol (register first, announce after)
  window.addEventListener('message', (e) => {
    if (!e.data || !e.data.type) return;
    if (e.data.type === '__activate_edit_mode') tweaks.classList.add('on');
    if (e.data.type === '__deactivate_edit_mode') tweaks.classList.remove('on');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch {}
})();
