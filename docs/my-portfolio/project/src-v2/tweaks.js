// Tweaks — accent swap + palette tone + cursor toggle
(function () {
  const EDIT_DEFAULTS = /*EDITMODE-BEGIN*/{
    "accent": "clay",
    "tone": "parchment",
    "cursor": true,
    "terminal": false
  }/*EDITMODE-END*/;
  let state = Object.assign({}, EDIT_DEFAULTS);
  try { state = Object.assign(state, JSON.parse(localStorage.getItem('fatan-v2-tweaks') || '{}')); } catch (e) {}

  const ACCENTS = {
    clay:      '#A0785A',
    terracotta:'#C67D5B',
    olive:     '#6B7C5E',
    ink:       '#3D4A52',
    plum:      '#7A5A6E',
  };
  const TONES = {
    parchment: { bg: '#F5F0EB', bg2: '#EDE7DF', cream: '#FAF7F3', fg: '#2C2825', fgDim: '#6B635A', fgMuted: '#9C9489', line: 'rgba(44, 40, 37, 0.08)', lineStrong: 'rgba(44, 40, 37, 0.18)' },
    sand:      { bg: '#EDE8E2', bg2: '#E4DED5', cream: '#F5F1EA', fg: '#2C2825', fgDim: '#6B635A', fgMuted: '#9C9489', line: 'rgba(44, 40, 37, 0.09)', lineStrong: 'rgba(44, 40, 37, 0.2)' },
    linen:     { bg: '#EEEAE2', bg2: '#E6E0D4', cream: '#F7F3EB', fg: '#2A2621', fgDim: '#6D655A', fgMuted: '#9D9488', line: 'rgba(42, 38, 33, 0.09)', lineStrong: 'rgba(42, 38, 33, 0.2)' },
  };

  function apply() {
    const r = document.documentElement.style;
    r.setProperty('--accent', ACCENTS[state.accent] || ACCENTS.clay);
    const t = TONES[state.tone] || TONES.parchment;
    r.setProperty('--bg', t.bg);
    r.setProperty('--bg-2', t.bg2);
    r.setProperty('--cream', t.cream);
    r.setProperty('--fg', t.fg);
    r.setProperty('--fg-dim', t.fgDim);
    r.setProperty('--fg-muted', t.fgMuted);
    r.setProperty('--line', t.line);
    r.setProperty('--line-strong', t.lineStrong);

    // cursor
    const dot = document.getElementById('cursor-dot'), ring = document.getElementById('cursor-ring');
    if (dot && ring) {
      const show = state.cursor && !matchMedia('(hover: none)').matches;
      dot.style.display = ring.style.display = show ? '' : 'none';
      document.body.style.cursor = show ? 'none' : 'auto';
    }

    // paint active swatches
    document.querySelectorAll('#swatches .swatch').forEach(b => b.classList.toggle('active', b.dataset.color === state.accent));
    document.querySelectorAll('#tones .tone').forEach(b => b.classList.toggle('active', b.dataset.tone === state.tone));
    const cs = document.getElementById('cursorSel'); if (cs) cs.value = String(state.cursor);

    try { localStorage.setItem('fatan-v2-tweaks', JSON.stringify(state)); } catch (e) {}
  }

  function persistToHost(patch) {
    try { window.parent.postMessage({ type: '__edit_mode_set_keys', edits: patch }, '*'); } catch (e) {}
  }

  // Wire up controls
  window.onReady(() => {
    document.querySelectorAll('#swatches .swatch').forEach(b => {
      b.addEventListener('click', () => { state.accent = b.dataset.color; apply(); persistToHost({ accent: state.accent }); });
    });
    document.querySelectorAll('#tones .tone').forEach(b => {
      b.addEventListener('click', () => { state.tone = b.dataset.tone; apply(); persistToHost({ tone: state.tone }); });
    });
    const cs = document.getElementById('cursorSel');
    if (cs) cs.addEventListener('change', () => { state.cursor = cs.value === 'true'; apply(); persistToHost({ cursor: state.cursor }); });

    apply();
  });

  // Edit-mode host protocol
  window.addEventListener('message', (e) => {
    const d = e.data || {};
    if (d.type === '__activate_edit_mode') document.getElementById('tweaks')?.classList.add('on');
    if (d.type === '__deactivate_edit_mode') document.getElementById('tweaks')?.classList.remove('on');
  });
  try { window.parent.postMessage({ type: '__edit_mode_available' }, '*'); } catch (e) {}

  // initial apply even if controls not in DOM yet (for accent/tone before React paints)
  apply();
})();
