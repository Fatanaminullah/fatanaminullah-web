// Terminal — warm CLI overlay, Ctrl+` toggle
(function () {
  const root = document.getElementById('terminal');
  const history = document.getElementById('terminal-history');
  const input = document.getElementById('terminal-input');
  if (!root || !input) return;

  const ART = `
  ███████╗ █████╗ ████████╗ █████╗ ███╗   ██╗
  ██╔════╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║
  █████╗  ███████║   ██║   ███████║██╔██╗ ██║
  ██╔══╝  ██╔══██║   ██║   ██╔══██║██║╚██╗██║
  ██║     ██║  ██║   ██║   ██║  ██║██║ ╚████║
  ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
           portfolio.sh — earth edition
  `;

  const COMMANDS = {
    help: () => `
<span class="muted">Available commands:</span>
  about       short bio
  skills      stack + tooling
  projects    featured work
  experience  track record
  contact     how to reach me
  mode        switch back to UI (or press Ctrl+\`)
  clear       wipe terminal
  help        this list`,
    about: () => `
Fatan Aminullah · Senior Software Developer · Jakarta, ID
Six years building web experiences across corporate, e-commerce, and loyalty platforms.
Currently senior frontend at Antikode.`,
    skills: () => `
<span class="muted">primary  </span> Next.js · React · TypeScript · TailwindCSS
<span class="muted">motion   </span> GSAP · Framer Motion · Lenis · R3F · Three.js
<span class="muted">native   </span> React Native
<span class="muted">backend  </span> Node · Express · Socket.io · Web3`,
    projects: () => `
<span class="muted">01</span> Pocari Sweat      · pocarisweat.id     · 2024
<span class="muted">02</span> Bodypack          · bodypack.com       · 2023
<span class="muted">03</span> Cinema XXI        · cinema21.co.id     · 2023
<span class="muted">04</span> Desa Kitsune      · desakitsune.com    · 2024
<span class="muted">05</span> Peruri            · peruri.co.id       · 2025
<span class="muted">06</span> Eatlah Club       · club.eatlahjkt.com · 2022`,
    experience: () => `
<span class="muted">2021 — Present</span>  Antikode              · Senior Frontend Developer
<span class="muted">2020 — 2021</span>     Emporia Digital       · Frontend Developer
<span class="muted">2019 — 2020</span>     Anabatic Technologies · Frontend Developer`,
    contact: () => `
email     fatan.aminullah.j@gmail.com
linkedin  /in/fatanaminullah
github    @fatanaminullah`,
    mode: () => { toggle(); return ''; },
    clear: () => { history.innerHTML = header(); return ''; },
  };

  function header() {
    return `<pre>${ART}</pre>
<span class="muted">type <b>help</b> to list commands, <b>Ctrl+\`</b> to return to UI</span>
<br>`;
  }

  function render(cmd, out) {
    const line = document.createElement('div');
    line.innerHTML = `<div><span class="prompt">fatan@portfolio:~$</span> ${cmd}</div>` + (out ? `<pre style="margin:6px 0 14px;white-space:pre-wrap">${out}</pre>` : '');
    history.appendChild(line);
    history.parentElement.scrollTop = history.parentElement.scrollHeight;
  }

  function toggle(on) {
    const willOn = typeof on === 'boolean' ? on : !root.classList.contains('on');
    root.classList.toggle('on', willOn);
    if (willOn) {
      if (!history.innerHTML) history.innerHTML = header();
      setTimeout(() => input.focus(), 50);
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    const cmd = input.value.trim();
    input.value = '';
    if (!cmd) { render('', ''); return; }
    const fn = COMMANDS[cmd.toLowerCase()];
    const out = fn ? fn() : `<span class="muted">unknown command:</span> ${cmd} — type <b>help</b>`;
    render(cmd, out);
  });

  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === '`') {
      e.preventDefault();
      toggle();
    }
  });
})();
