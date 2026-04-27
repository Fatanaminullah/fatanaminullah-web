/* Selected Works — Archive Card Deck
   Projects as physical index cards stacked at slight rotations. Click a tab
   or a card to bring it to the front (flip-and-rise). Click again to return it.
*/
const WORKS_V2 = [
  {
    n: '01', name: 'Pocari Sweat', cat: 'Company Profile', url: 'pocarisweat.id',
    tech: ['Next.js', 'TailwindCSS', 'GSAP', 'Three.js', 'Matter.js'],
    year: '2024',
    tint: '#C9B68E',
    problem: 'Legacy WordPress with CLS >0.4. Rebuilt as Next.js with physics-driven hero interactions.',
    role: 'Frontend lead · 2 devs',
    outcome: 'LCP 3.8s → 1.1s · bounce −34% · first internal site using real-time physics.',
    motif: 'bottle',
  },
  {
    n: '02', name: 'Bodypack', cat: 'E-Commerce', url: 'bodypack.com',
    tech: ['Next.js', 'Bootstrap', 'GSAP', 'SASS'],
    year: '2023',
    tint: '#A98870',
    problem: 'Migration from legacy Magento to a headless Next.js storefront with a GSAP-driven product showcase.',
    role: 'Senior frontend dev',
    outcome: 'Checkout conversion +18% · mobile PDP load halved.',
    motif: 'grid',
  },
  {
    n: '03', name: 'Cinema XXI', cat: 'Company Profile', url: 'cinema21.co.id',
    tech: ['Next.js', 'Bootstrap', 'SASS', 'Framer Motion'],
    year: '2023',
    tint: '#B88464',
    problem: 'Corporate revamp with a cinema-grade motion language across 40+ pages and 7 localised brands.',
    role: 'Frontend dev',
    outcome: 'Design system tokenised across 40+ templates · 99/100 Lighthouse a11y.',
    motif: 'film',
  },
  {
    n: '04', name: 'Desa Kitsune', cat: 'Marketing Site', url: 'desakitsune.com',
    tech: ['Next.js', 'TailwindCSS', 'GSAP', 'Lenis'],
    year: '2024',
    tint: '#8E9378',
    problem: 'Launch site for a villa resort; scroll narrative built on Lenis + ScrollTrigger with pinned chapters.',
    role: 'Frontend lead',
    outcome: 'Launched on time · nominated in Awwwards Sites of the Day.',
    motif: 'mountain',
  },
  {
    n: '05', name: 'Peruri', cat: 'Company Profile', url: 'peruri.co.id',
    tech: ['Next.js', 'TailwindCSS', 'GSAP', 'Lenis'],
    year: '2025',
    tint: '#8C7556',
    problem: "Indonesia's national security printing company; corporate refresh that reads institutional but not sleepy.",
    role: 'Frontend lead',
    outcome: '12-page relaunch in 6 weeks · CMS-driven · runs without ops intervention.',
    motif: 'crest',
  },
  {
    n: '06', name: 'Eatlah Club', cat: 'Loyalty App', url: 'club.eatlahjkt.com',
    tech: ['Next.js', 'Bootstrap', 'Socket.io'],
    year: '2022',
    tint: '#C07A58',
    problem: 'Realtime loyalty system with live stamp redemption via Socket.io — POS events push to user phones.',
    role: 'Fullstack dev',
    outcome: '40k+ stamps processed in first quarter · near-zero redemption latency.',
    motif: 'stamps',
  },
];

// SVG motif per project — abstract diagrammatic illustration
function Motif({ kind }) {
  const stroke = 'currentColor';
  switch (kind) {
    case 'bottle':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M42 14 h16 v8 c0 2 4 4 4 8 v50 c0 6 -4 10 -10 10 h-4 c-6 0 -10 -4 -10 -10 v-50 c0 -4 4 -6 4 -8 z" />
          <circle cx="50" cy="62" r="3" />
          <circle cx="44" cy="55" r="2" />
          <circle cx="56" cy="68" r="2.5" />
          <circle cx="48" cy="72" r="1.6" />
          <line x1="38" y1="42" x2="62" y2="42" />
        </svg>
      );
    case 'grid':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          {[...Array(5)].map((_, c) => [...Array(7)].map((_, r) => (
            <rect key={c+'-'+r} x={14 + c*15} y={10 + r*11} width="11" height="8" />
          )))}
          <rect x="14" y="10" width="26" height="19" fill="currentColor" opacity="0.15" />
        </svg>
      );
    case 'film':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <rect x="14" y="22" width="72" height="56" />
          {[20, 40, 60, 80].map((x, i) => (
            <g key={i}>
              <rect x={x-4} y="25" width="8" height="3" />
              <rect x={x-4} y="72" width="8" height="3" />
            </g>
          ))}
          <rect x="22" y="32" width="56" height="36" strokeDasharray="2 1" />
          <circle cx="50" cy="50" r="8" />
          <path d="M47 46 l8 4 l-8 4 z" fill="currentColor" />
        </svg>
      );
    case 'mountain':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M8 78 L28 48 L40 60 L58 32 L78 56 L92 78 Z" />
          <path d="M28 48 L40 60 L58 32" fill="currentColor" opacity="0.15" />
          <circle cx="76" cy="22" r="8" />
          <line x1="8" y1="84" x2="92" y2="84" />
          <line x1="8" y1="88" x2="92" y2="88" strokeDasharray="1 2" />
        </svg>
      );
    case 'crest':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M50 12 L78 24 V56 C78 70 66 82 50 88 C34 82 22 70 22 56 V24 Z" />
          <path d="M50 22 L70 30 V56 C70 66 62 76 50 80 C38 76 30 66 30 56 V30 Z" />
          <line x1="50" y1="34" x2="50" y2="68" />
          <line x1="38" y1="50" x2="62" y2="50" />
          <circle cx="50" cy="50" r="5" />
        </svg>
      );
    case 'stamps':
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          {[0,1,2].map(r => [0,1,2,3].map(c => (
            <circle key={r+'-'+c} cx={20 + c*20} cy={28 + r*22} r="6" strokeDasharray="1 1" />
          )))}
          {[0,1,2,3].map(c => (
            <circle key={c} cx={20 + c*20} cy={28} r="3" fill="currentColor" />
          ))}
          {[0,1].map(c => (
            <circle key={c} cx={20 + c*20} cy={50} r="3" fill="currentColor" />
          ))}
        </svg>
      );
    default: return null;
  }
}

function Works() {
  const [active, setActive] = React.useState(0);
  const total = WORKS_V2.length;
  const containerRef = React.useRef(null);
  const progressRef = React.useRef(0);

  function step(dir) {
    setActive((a) => Math.max(0, Math.min(total - 1, a + dir)));
  }

  // Scroll-driven active card: when the pinned container is in view,
  // each viewport-height of scroll = one card.
  React.useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const r = containerRef.current.getBoundingClientRect();
      const total_h = containerRef.current.offsetHeight - window.innerHeight;
      // progress from 0 -> 1 as we scroll through the pinned region
      const p = Math.max(0, Math.min(1, -r.top / total_h));
      progressRef.current = p;
      // Each card occupies 1/total of progress. Add a small "settle" zone.
      const idx = Math.min(total - 1, Math.floor(p * total));
      setActive((cur) => cur === idx ? cur : idx);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [total]);

  React.useEffect(() => {
    function onKey(e) {
      // Keyboard nav still works — scroll viewport accordingly
      if (!containerRef.current) return;
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const nextIdx = Math.max(0, Math.min(total - 1, active + dir));
        const r = containerRef.current.getBoundingClientRect();
        const top = window.scrollY + r.top;
        const total_h = containerRef.current.offsetHeight - window.innerHeight;
        const targetY = top + (nextIdx + 0.5) * (total_h / total);
        window.scrollTo({ top: targetY, behavior: 'smooth' });
        e.preventDefault();
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, total]);

  const w = WORKS_V2[active];

  return (
    <section id="work" data-screen-label="04 Work" className="works" ref={containerRef}>
      <style>{`
        .works {
          position: relative;
          /* Tall enough to give each card one viewport of scroll */
          height: ${total * 100}vh;
          padding: 0;
          background: var(--bg);
        }
        .works .pin {
          position: sticky;
          top: 0;
          height: 100vh;
          padding: 80px 40px 40px;
          display: grid;
          grid-template-rows: auto auto 1fr auto;
          gap: 24px;
          overflow: hidden;
        }
        .works .head {
          display: grid; grid-template-columns: 1fr auto; align-items: end; gap: 40px;
          max-width: 1440px; margin: 0 auto 0;
        }
        .works .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 12px;
        }
        .works .label::before { content:''; width: 40px; height:1px; background: var(--fg-muted); }
        .works h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(40px, 6vw, 72px); line-height: 0.9; letter-spacing: -0.04em;
        }
        .works h2 em { font-style: italic; color: var(--accent); }
        .works .head .caption {
          font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-muted);
          text-align: right; line-height: 1.7;
        }

        /* Tab strip */
        .tabs {
          display: flex; gap: 4px;
          max-width: 1440px; margin: 0 auto;
          border-bottom: 1px solid var(--line);
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }
        .tabs::-webkit-scrollbar { display: none; }
        .tab {
          flex: 1;
          min-width: 140px;
          background: transparent;
          border: 0;
          padding: 16px 18px 18px;
          text-align: left;
          cursor: none;
          font-family: var(--mono);
          font-size: 11px;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--fg-muted);
          position: relative;
          transition: color .3s;
          border-right: 1px solid var(--line);
        }
        .tab:last-child { border-right: 0; }
        .tab:hover { color: var(--fg); }
        .tab.active { color: var(--fg); }
        .tab .num { display: block; font-size: 10px; opacity: 0.6; margin-bottom: 4px; }
        .tab .nm {
          font-family: var(--serif); font-style: normal;
          font-size: 17px; letter-spacing: -0.01em; text-transform: none;
          color: inherit;
        }
        .tab.active .nm { font-style: italic; color: var(--accent); }
        .tab::after {
          content: ''; position: absolute; left: 0; right: 0; bottom: -1px;
          height: 2px; background: var(--accent);
          transform: scaleX(0); transform-origin: left;
          transition: transform .5s cubic-bezier(.2,.8,.2,1);
        }
        .tab.active::after { transform: scaleX(1); }

        /* Deck stage */
        .deck-stage {
          max-width: 1440px;
          margin: 0 auto;
          position: relative;
          width: 100%;
          height: 100%;
          perspective: 1800px;
          align-self: center;
          justify-self: center;
        }
        .deck {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: min(820px, 100%);
          height: min(440px, 100%);
          transform-style: preserve-3d;
        }

        .card {
          position: absolute;
          left: 0; top: 0; right: 0; bottom: 0;
          background: var(--cream);
          border: 1px solid var(--line-strong);
          border-radius: 4px;
          padding: 36px 40px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 36px;
          transform-style: preserve-3d;
          transition:
            transform 1.1s cubic-bezier(.2,.8,.2,1),
            opacity .8s ease,
            box-shadow .8s ease;
          will-change: transform, opacity;
          backface-visibility: hidden;
          box-shadow:
            0 1px 0 rgba(80, 55, 30, 0.05),
            0 4px 14px -4px rgba(80, 55, 30, 0.06);
          cursor: none;
        }
        .card::before {
          /* Punched hole at top (archive card) */
          content: '';
          position: absolute;
          top: 14px; left: 50%; transform: translateX(-50%);
          width: 12px; height: 12px;
          border-radius: 50%;
          background: var(--bg);
          border: 1px solid var(--line);
        }
        .card .corner {
          position: absolute;
          top: 14px; right: 18px;
          font-family: var(--mono);
          font-size: 9px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--fg-muted);
        }
        .card .stamp {
          position: absolute;
          bottom: 18px; right: 24px;
          font-family: var(--mono); font-size: 9px; letter-spacing: .2em; text-transform: uppercase;
          color: var(--accent);
          padding: 4px 8px;
          border: 1px solid var(--accent);
          border-radius: 2px;
          opacity: 0.7;
          transform: rotate(-6deg);
        }

        .card .left {
          display: flex; flex-direction: column; justify-content: space-between;
          padding-top: 24px;
        }
        .card .left .head-row {
          display: flex; align-items: baseline; gap: 14px;
          font-family: var(--mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
          color: var(--fg-muted);
        }
        .card .left .head-row .n { color: var(--accent); }
        .card .left .name {
          font-family: var(--serif);
          font-size: clamp(40px, 5vw, 64px);
          line-height: 0.95; letter-spacing: -0.025em;
          color: var(--fg);
          margin-top: 12px;
        }
        .card .left .name em { font-style: italic; color: var(--accent); }
        .card .left .cat {
          font-family: var(--mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
          color: var(--fg-dim); margin-top: 8px;
        }
        .card .left .footer {
          margin-top: auto;
          padding-top: 18px;
          border-top: 1px dashed var(--line-strong);
          display: flex; flex-direction: column; gap: 12px;
        }
        .card .left .url {
          font-family: var(--mono); font-size: 11px;
          color: var(--fg);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .card .left .url::before { content: '↗'; color: var(--accent); }
        .card .left .chips {
          display: flex; flex-wrap: wrap; gap: 4px;
        }
        .card .left .chips span {
          font-family: var(--mono); font-size: 9px; letter-spacing: .04em;
          padding: 4px 8px; border: 1px solid var(--line);
          border-radius: 2px; color: var(--fg-muted);
        }

        .card .right {
          display: grid;
          grid-template-rows: 1fr auto auto auto;
          gap: 16px;
          padding-top: 24px;
          padding-left: 28px;
          border-left: 1px solid var(--line);
        }
        .card .right .motif {
          background: color-mix(in oklab, var(--card-tint) 55%, var(--cream));
          border-radius: 2px;
          padding: 24px;
          color: color-mix(in oklab, var(--card-tint) 60%, var(--fg));
          aspect-ratio: 4/3;
          display: grid; place-items: center;
          position: relative;
          overflow: hidden;
        }
        .card .right .motif .reg {
          position: absolute;
          font-family: var(--mono); font-size: 9px;
          color: var(--fg-muted);
          opacity: 0.5;
          pointer-events: none;
        }
        .card .right .motif .reg.tl { top: 6px; left: 8px; }
        .card .right .motif .reg.tr { top: 6px; right: 8px; }
        .card .right .motif .reg.br { bottom: 6px; right: 8px; }
        .card .right .motif svg { width: 65%; height: 65%; }
        .card .right .row {
          display: grid; grid-template-columns: 70px 1fr; gap: 12px;
          font-family: var(--mono); font-size: 10px; letter-spacing: .12em;
        }
        .card .right .row .k {
          color: var(--fg-muted);
          text-transform: uppercase;
          padding-top: 2px;
        }
        .card .right .row .v {
          font-family: var(--serif);
          font-style: italic;
          font-size: 14px;
          line-height: 1.45;
          color: var(--fg);
          letter-spacing: -0.005em;
        }

        /* Stack arrangement: the active card sits front-center, the others fan back-and-up at slight rotations */
        .card[data-state="active"] {
          z-index: 50;
          transform: translate3d(0, 0, 0) rotate(0deg);
          opacity: 1;
          box-shadow:
            0 1px 0 rgba(80, 55, 30, 0.06),
            0 30px 80px -30px rgba(80, 55, 30, 0.45),
            0 60px 120px -50px rgba(80, 55, 30, 0.25);
        }
        .card[data-state="behind"] {
          opacity: 0.5;
          pointer-events: none;
        }
        .card[data-state="behind"] .right,
        .card[data-state="behind"] .left,
        .card[data-state="behind"] .stamp,
        .card[data-state="behind"] .corner {
          opacity: 0.18;
        }
        .card[data-state="hidden"] {
          opacity: 0;
          pointer-events: none;
          transform: translate3d(0, 0, -400px);
        }

        /* Controls */
        .deck-controls {
          max-width: 1440px;
          margin: 0 auto;
          display: flex; justify-content: space-between; align-items: center; gap: 24px;
          font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-muted);
        }
        .deck-controls .progress {
          display: flex; align-items: center; gap: 12px;
        }
        .deck-controls .progress .bar {
          width: 200px; height: 1px; background: var(--line-strong);
          position: relative;
        }
        .deck-controls .progress .bar::after {
          content: '';
          position: absolute;
          left: 0; top: -1px; height: 3px;
          background: var(--accent);
          width: var(--p, 0%);
          transition: width .6s cubic-bezier(.2,.8,.2,1);
        }
        .deck-controls .arrows {
          display: flex; gap: 8px;
        }
        .deck-controls .arrows button {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid var(--line-strong);
          background: transparent;
          color: var(--fg);
          cursor: none;
          font-family: var(--serif); font-size: 18px;
          transition: background .3s, color .3s, border-color .3s;
        }
        .deck-controls .arrows button:hover {
          background: var(--accent); color: var(--cream); border-color: var(--accent);
        }
        .deck-controls .visit {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 14px 22px;
          background: var(--fg); color: var(--cream);
          border-radius: 999px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          text-decoration: none;
        }
        .deck-controls .visit:hover { background: var(--accent); }

        @media (max-width: 900px) {
          .works { height: auto; }
          .works .pin { position: static; height: auto; padding: 80px 20px 80px; grid-template-rows: none; gap: 24px; overflow: visible; }
          .works .head { grid-template-columns: 1fr; }
          .works .head .caption { text-align: left; }
          .tabs { gap: 0; }
          .tab { min-width: 120px; }
          .deck-stage { height: auto; perspective: none; }
          .deck { position: static; transform: none; width: 100%; height: auto; }
          .card { position: relative; grid-template-columns: 1fr; padding: 32px 24px; }
          .card[data-state="behind"], .card[data-state="hidden"] { display: none; }
          .card .right { border-left: 0; padding-left: 0; padding-top: 8px; border-top: 1px solid var(--line); }
          .deck-controls { flex-direction: column; gap: 16px; align-items: stretch; }
        }
      `}</style>

      <div className="pin">

      <div className="head">
        <div>
          <div className="label"><span>(Selected Works)</span> / 04</div>
          <h2 className="reveal-line"><span>The <em>archive</em>.</span></h2>
        </div>
        <div className="caption reveal-fade">
          Six index cards<br/>
          2022 &mdash; 2025<br/>
          Click a tab or arrow
        </div>
      </div>

      <div className="tabs">
        {WORKS_V2.map((p, i) => (
          <button key={p.n} className={'tab' + (i === active ? ' active' : '')}
                  onClick={() => setActive(i)} data-cursor="link">
            <span className="num">{p.n} &middot; {p.year}</span>
            <span className="nm">{p.name}</span>
          </button>
        ))}
      </div>

      <div className="deck-stage">
        <div className="deck">
          {WORKS_V2.map((p, i) => {
            const offset = (i - active + total) % total;
            const isActive = offset === 0;
            const fanIdx = offset;
            // Tighter fan — barely peek out from behind active card
            const ang = (fanIdx % 2 === 0 ? -1 : 1) * Math.min(fanIdx * 0.8, 3);
            const ty = -fanIdx * 5;
            const tz = -fanIdx * 30;
            const tx = (fanIdx % 2 === 0 ? -1 : 1) * Math.min(fanIdx * 6, 22);
            const opacity = Math.max(0, 0.55 - fanIdx * 0.08);
            const state = isActive ? 'active' : (fanIdx > 4 ? 'hidden' : 'behind');
            const transform = isActive
              ? 'translate3d(0,0,0) rotate(0deg)'
              : `translate3d(${tx}px, ${ty}px, ${tz}px) rotate(${ang}deg)`;
            return (
              <article
                key={p.n}
                className="card"
                data-state={state}
                style={{ '--card-tint': p.tint, transform, opacity, zIndex: 50 - fanIdx }}
                onClick={() => isActive ? null : setActive(i)}
                data-cursor="link"
              >
                <span className="corner">FILE No. {p.n} / 06</span>
                <div className="left">
                  <div>
                    <div className="head-row">
                      <span className="n">◉ {p.n}</span>
                      <span>·</span>
                      <span>{p.year}</span>
                    </div>
                    <div className="name">{p.name}</div>
                    <div className="cat">{p.cat}</div>
                  </div>
                  <div className="footer">
                    <div className="url">{p.url}</div>
                    <div className="chips">
                      {p.tech.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                </div>
                <div className="right">
                  <div className="motif">
                    <span className="reg tl">+</span>
                    <span className="reg tr">+</span>
                    <span className="reg br">+</span>
                    <Motif kind={p.motif} />
                  </div>
                  <div className="row"><div className="k">Problem</div><div className="v">{p.problem}</div></div>
                  <div className="row"><div className="k">Role</div><div className="v">{p.role}</div></div>
                  <div className="row"><div className="k">Outcome</div><div className="v">{p.outcome}</div></div>
                </div>
                <span className="stamp">Shipped {p.year}</span>
              </article>
            );
          })}
        </div>
      </div>

      <div className="deck-controls">
        <div className="progress">
          <span>{String(active + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
          <div className="bar" style={{'--p': ((active + 1) / total * 100) + '%'}}></div>
          <span>{w.name}</span>
        </div>
        <div className="arrows">
          <button onClick={() => step(-1)} data-cursor="link" aria-label="Previous">←</button>
          <button onClick={() => step(1)} data-cursor="link" aria-label="Next">→</button>
        </div>
        <a className="visit" href={'https://' + w.url} target="_blank" rel="noopener" data-cursor="link">
          Visit {w.name} <span>↗</span>
        </a>
      </div>
      </div>
    </section>
  );
}

window.Works = Works;
