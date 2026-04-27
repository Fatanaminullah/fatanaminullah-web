/* Ask Fatan — Claude-powered chat, with graceful local fallback */
(function () {
  const fab = document.getElementById('askFab');
  const panel = document.getElementById('askPanel');
  const close = document.getElementById('askClose');
  const messages = document.getElementById('askMessages');
  const suggest = document.getElementById('askSuggest');
  const form = document.getElementById('askForm');
  const input = document.getElementById('askInput');
  if (!fab) return;

  const SUGGESTIONS = [
    "What's Fatan's strongest skill?",
    "Tell me about the Pocari Sweat project",
    "What's his experience with team leadership?",
    "Why should I hire him?",
  ];

  const SYSTEM = `You are "Ask Fatan" — a concise, friendly AI assistant answering questions about Fatan Aminullah, a Senior Software Developer based in Jakarta, Indonesia. Answer in first person as if you were Fatan, but keep it humble and specific. Max 3 sentences. Never invent facts; if you don't know, say so.

Background to draw from:
- 6+ years of professional frontend/fullstack work since 2019.
- Current role: Senior Software Developer at PT Digital Rantai Maya (2023–present). Frontend lead on Peruri and Pocari Sweat corporate relaunches. Cut LCP from 3.8s to under 1.2s on Pocari Sweat. Established internal Figma→Tailwind token pipeline used across 6 repos. Mentors 4 mid/junior devs.
- Previously at Icehouse (2021–2023): shipped Cinema XXI (40+ pages, tokenised animation system) and Eatlah Club (realtime loyalty platform w/ Socket.io, 40k stamps in Q1).
- Earlier at Tokopedia (2019–2021): frontend engineer on high-traffic storefront surfaces; led code-splitting work that cut JS payloads ~22%.
- Stack of choice: Next.js, React, React Native, TypeScript, TailwindCSS, GSAP, Three.js, Framer Motion, Lenis, Vue.js, Node.js, Express, Socket.io, Web3.
- Selected projects: Pocari Sweat (pocarisweat.id), Bodypack (bodypack.com), Cinema XXI (cinema21.co.id), Desa Kitsune (desakitsune.com), Peruri (peruri.co.id), Eatlah Club (club.eatlahjkt.com).
- Strengths: bridging engineering precision with visual craft; motion/scroll storytelling; performance; mentorship.
- Email: fatan.aminullah.j@gmail.com. Location: Jakarta (GMT+7). Available Q2 2026 onward for select collaborations.`;

  function addMsg(role, text, thinking) {
    const d = document.createElement('div');
    d.className = 'ask-msg ' + role;
    if (thinking) {
      d.innerHTML = '<span class="thinking"><span></span><span></span><span></span></span>';
    } else {
      d.textContent = text;
    }
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
    return d;
  }

  function renderSuggestions() {
    suggest.innerHTML = '';
    SUGGESTIONS.forEach(s => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = s;
      b.setAttribute('data-cursor', 'link');
      b.addEventListener('click', () => {
        input.value = s;
        form.requestSubmit();
      });
      suggest.appendChild(b);
    });
  }

  function open() {
    panel.classList.add('on');
    if (messages.children.length === 0) {
      addMsg('bot', `Hi — I'm an AI trained on Fatan's resume. Ask me anything about his work, stack, or availability.`);
    }
    setTimeout(() => input.focus(), 300);
  }
  function closeP() {
    panel.classList.remove('on');
  }

  fab.addEventListener('click', open);
  close.addEventListener('click', closeP);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const q = input.value.trim();
    if (!q) return;
    input.value = '';
    addMsg('user', q);
    const thinking = addMsg('bot', '', true);

    try {
      const history = [...messages.querySelectorAll('.ask-msg')].slice(0, -1).map(m => ({
        role: m.classList.contains('user') ? 'user' : 'assistant',
        content: m.textContent || ''
      })).filter(m => m.content);

      const reply = await window.claude.complete({
        messages: [
          { role: 'user', content: SYSTEM + '\n\nPrevious conversation so far:\n' + history.map(h => `${h.role}: ${h.content}`).join('\n') + `\n\nUser just asked: "${q}"\n\nReply in 1–3 sentences as Fatan.` }
        ]
      });
      thinking.textContent = (reply || '').trim() || "I didn't catch that — mind rephrasing?";
    } catch (err) {
      thinking.textContent = "I'm offline right now — but you can reach Fatan directly at fatan.aminullah.j@gmail.com.";
    }
    messages.scrollTop = messages.scrollHeight;
  });

  renderSuggestions();
})();
