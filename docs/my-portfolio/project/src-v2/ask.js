// Ask Fatan — slide-out chat panel powered by window.claude
(function () {
  const fab = document.getElementById('askFab');
  const panel = document.getElementById('askPanel');
  const close = document.getElementById('askClose');
  const msgs = document.getElementById('askMessages');
  const form = document.getElementById('askForm');
  const input = document.getElementById('askInput');
  const suggest = document.getElementById('askSuggest');

  const SUGGESTED = [
    "What's Fatan's strongest skill?",
    "Tell me about the Pocari project",
    "Leadership experience?",
    "Preferred stack in 2026?",
  ];
  const CTX = `You are an assistant embedded on Fatan Aminullah's portfolio site.
Answer concisely (2-4 short paragraphs max) in a warm, editorial, professional tone.
Known facts:
- Senior Software Developer, Jakarta Indonesia, 6+ years experience.
- Currently Senior Frontend at Antikode (Aug 2021-present).
- Previously Emporia Digital (2020-21) and Anabatic Technologies (2019-20).
- Mentored 4 devs; shipped 30+ projects across corporate, e-commerce, loyalty.
- Featured work: Pocari Sweat (Next.js + Matter.js physics), Bodypack e-commerce, Cinema XXI, Desa Kitsune (Lenis scroll), Peruri (national printing co.), Eatlah Club (realtime loyalty w/ Socket.io).
- Stack: Next.js, React, Vue, TypeScript, Tailwind, GSAP, Three.js, R3F, Framer Motion, React Native, Node, Express, Web3, Lenis.
Email: fatan.aminullah.j@gmail.com. If asked something unknown, say you're not sure and recommend emailing Fatan.`;

  function addMsg(role, html) {
    const el = document.createElement('div');
    el.className = 'ask-msg ' + role;
    el.innerHTML = html;
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
    return el;
  }

  function renderSuggest() {
    suggest.innerHTML = '';
    SUGGESTED.forEach(s => {
      const b = document.createElement('button');
      b.textContent = s;
      b.dataset.cursor = 'link';
      b.onclick = () => { input.value = s; form.dispatchEvent(new Event('submit', { cancelable: true })); };
      suggest.appendChild(b);
    });
  }

  function open() {
    panel.classList.add('on');
    if (!msgs.children.length) {
      addMsg('bot', "Hi — I'm a little AI trained on Fatan's resume and work. Ask me anything about his projects, stack, or experience.");
      renderSuggest();
    }
    setTimeout(() => input.focus(), 500);
  }
  function hide() { panel.classList.remove('on'); }

  fab?.addEventListener('click', open);
  close?.addEventListener('click', hide);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hide(); });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    addMsg('user', q);
    suggest.innerHTML = '';
    const thinking = addMsg('bot', '<span class="thinking"><span></span><span></span><span></span></span>');
    try {
      const reply = await window.claude.complete({
        messages: [{ role: 'user', content: CTX + '\n\nUser question: ' + q }],
      });
      thinking.innerHTML = (reply || "Sorry, I couldn't parse that.").replace(/\n/g, '<br>');
    } catch (err) {
      thinking.innerHTML = "I hit a snag reaching the model. Try emailing Fatan at <b>fatan.aminullah.j@gmail.com</b>.";
    }
    msgs.scrollTop = msgs.scrollHeight;
  });
})();
