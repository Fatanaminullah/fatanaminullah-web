/* Terminal mode — Ctrl+` to toggle */
(function () {
  const root = document.getElementById('terminal');
  const inp = document.getElementById('terminal-input');
  const hist = document.getElementById('terminal-history');
  if (!root) return;

  const ASCII = [
'   ______      __              ',
'  / ____/___ _/ /_____ _____   ',
' / /_  / __ `/ __/ __ `/ __ \\  ',
'/ __/ / /_/ / /_/ /_/ / / / /  ',
'\\/    \\__,_/\\__/\\__,_/_/ /_/   ',
'',
].join('\n');

  function println(html, muted) {
    const d = document.createElement('div');
    if (muted) d.className = 'muted';
    d.innerHTML = html;
    hist.appendChild(d);
  }
  function prompt(line) {
    const d = document.createElement('div');
    d.innerHTML = `<span class="prompt">fatan@portfolio:~$</span> ${line}`;
    hist.appendChild(d);
  }

  const COMMANDS = {
    help: () => {
      println('Available commands:', true);
      println('  <b>about</b>     — who I am');
      println('  <b>skills</b>    — tech I work with');
      println('  <b>projects</b>  — selected work');
      println('  <b>contact</b>   — how to reach me');
      println('  <b>exit</b>      — back to the site');
      println('  <b>clear</b>     — clear the screen');
    },
    about: () => {
      println('Fatan Aminullah · Senior Software Developer · Jakarta, ID');
      println('6+ years shipping corporate profile, e-commerce and loyalty platforms.');
      println('I bridge engineering precision with visual craft.');
    },
    skills: () => {
      println('Next.js · React · React Native · TypeScript · Vue.js');
      println('TailwindCSS · SASS · Bootstrap · Framer Motion · GSAP');
      println('Three.js · Matter.js · Lenis · Node.js · Socket.io · Web3');
    },
    projects: () => {
      println('01 · Pocari Sweat   — pocarisweat.id');
      println('02 · Bodypack       — bodypack.com');
      println('03 · Cinema XXI     — cinema21.co.id');
      println('04 · Desa Kitsune   — desakitsune.com');
      println('05 · Peruri         — peruri.co.id');
      println('06 · Eatlah Club    — club.eatlahjkt.com');
    },
    contact: () => {
      println('email    fatan.aminullah.j@gmail.com');
      println('location Jakarta, Indonesia · GMT+7');
      println('status   Available Q2 2026 · 2 spots open');
    },
    clear: () => { hist.innerHTML = ''; boot(); },
    exit: () => { toggle(false); },
  };

  function run(cmd) {
    prompt(cmd);
    const c = cmd.trim().toLowerCase();
    if (!c) return;
    if (COMMANDS[c]) COMMANDS[c]();
    else println(`command not found: ${c}. try 'help'`, true);
  }

  function boot() {
    const pre = document.createElement('pre');
    pre.textContent = ASCII;
    hist.appendChild(pre);
    println('Welcome to <b>fatan.sh</b> — a static portfolio in your terminal.', true);
    println("Type 'help' for commands. Ctrl+` to exit.", true);
    println('');
  }

  function toggle(on) {
    root.classList.toggle('on', on);
    if (on) { setTimeout(() => inp.focus(), 50); }
  }

  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      run(inp.value);
      inp.value = '';
      root.scrollTop = root.scrollHeight;
    } else if (e.key === 'Escape') {
      toggle(false);
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && (e.key === '`' || e.key === 'Backquote')) {
      e.preventDefault();
      const on = !root.classList.contains('on');
      if (on && !hist.children.length) boot();
      toggle(on);
    }
  });

  window.__toggleTerminal = (v) => {
    if (v && !hist.children.length) boot();
    toggle(v);
  };
})();
