/* Selected Works — editorial project cases */
const WORKS = [
  {
    n: '01', name: 'Pocari Sweat', cat: 'Company Profile', url: 'pocarisweat.id',
    tech: ['Next.js', 'TailwindCSS', 'GSAP', 'Three.js', 'Matter.js'],
    year: '2024',
    tint: 'oklch(72% 0.15 210)',
    problem: 'The legacy site was a static WordPress deployment with no motion and a CLS >0.4. Rebuilt as a Next.js app with physics-driven hero interactions.',
    role: 'Frontend lead · 2 devs',
    outcome: 'LCP from 3.8s → 1.1s, bounce rate ‑34%, 1st internal site to use real-time physics.',
    placeholder: 'HERO • BOTTLE PHYSICS SCENE',
  },
  {
    n: '02', name: 'Bodypack', cat: 'E-Commerce', url: 'bodypack.com',
    tech: ['Next.js', 'Bootstrap', 'GSAP', 'SASS'],
    year: '2023',
    tint: 'oklch(70% 0.18 60)',
    problem: 'Migration of a legacy Magento storefront to a headless Next.js front-end with a GSAP-driven product showcase.',
    role: 'Senior frontend dev',
    outcome: 'Checkout conversion +18%, mobile PDP load cut in half.',
    placeholder: 'PRODUCT GRID • 16-COL',
  },
  {
    n: '03', name: 'Cinema XXI', cat: 'Company Profile', url: 'cinema21.co.id',
    tech: ['Next.js', 'Bootstrap', 'SASS', 'Framer Motion'],
    year: '2023',
    tint: 'oklch(62% 0.22 20)',
    problem: 'Revamp of the corporate site with a cinema-grade motion language across 40+ pages and 7 localised brands.',
    role: 'Frontend dev',
    outcome: 'Design system tokenised across 40+ templates; 99/100 Lighthouse a11y.',
    placeholder: 'POSTER WALL • 16:9',
  },
  {
    n: '04', name: 'Desa Kitsune', cat: 'Marketing Site', url: 'desakitsune.com',
    tech: ['Next.js', 'TailwindCSS', 'GSAP', 'Lenis'],
    year: '2024',
    tint: 'oklch(75% 0.12 320)',
    problem: 'Launch site for a villa resort; scroll narrative built on Lenis + ScrollTrigger with pinned chapters.',
    role: 'Frontend lead',
    outcome: 'Launched on time, featured in Awwwards\' "Sites of the Day" nominee list.',
    placeholder: 'LANDSCAPE • PINNED SCROLL',
  },
  {
    n: '05', name: 'Peruri', cat: 'Company Profile', url: 'peruri.co.id',
    tech: ['Next.js', 'TailwindCSS', 'GSAP', 'Lenis'],
    year: '2025',
    tint: 'oklch(68% 0.16 155)',
    problem: 'Indonesia\'s national security printing company; needed a corporate refresh that reads institutional but not sleepy.',
    role: 'Frontend lead',
    outcome: '12-page relaunch in 6 weeks, CMS-driven, built to run without ops intervention.',
    placeholder: 'HERO • INSTITUTIONAL',
  },
  {
    n: '06', name: 'Eatlah Club', cat: 'Loyalty App', url: 'club.eatlahjkt.com',
    tech: ['Next.js', 'Bootstrap', 'Socket.io'],
    year: '2022',
    tint: 'oklch(75% 0.17 70)',
    problem: 'Realtime loyalty system with live stamp redemption via Socket.io — POS events push to the user\'s phone.',
    role: 'Fullstack dev',
    outcome: 'Processed 40k+ stamps in first quarter; near-zero latency on redemptions.',
    placeholder: 'APP UI • LOYALTY STAMPS',
  },
];

function Works() {
  const [open, setOpen] = React.useState(null);
  return (
    <section id="work" data-screen-label="04 Work" className="works">
      <style>{`
        .works { padding: 160px 40px 160px; }
        .works .head {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 80px; gap: 40px;
        }
        .works .head .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 24px;
        }
        .works .head .label::before { content: ''; width: 40px; height: 1px; background: var(--fg-dim); }
        .works .head h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(56px, 8vw, 128px); line-height: 0.95; letter-spacing: -0.035em;
        }
        .works .head h2 em { font-style: italic; color: var(--accent); }
        .works .head .right {
          font-family: var(--mono); font-size: 12px; color: var(--fg-dim);
          text-align: right; line-height: 1.7; max-width: 260px;
        }

        .work-list { display: flex; flex-direction: column; border-top: 1px solid var(--line-strong); }
        .work {
          position: relative;
          border-bottom: 1px solid var(--line-strong);
          padding: 28px 0;
          display: grid; grid-template-columns: 80px 1.6fr 1fr 1fr 80px;
          gap: 24px; align-items: center;
          cursor: none;
          transition: padding .6s cubic-bezier(.2,.8,.2,1);
        }
        .work .n { font-family: var(--mono); font-size: 12px; color: var(--fg-muted); letter-spacing: .1em; }
        .work .name { font-family: var(--serif); font-size: clamp(40px, 5vw, 72px); line-height: 1; letter-spacing: -0.02em; color: var(--fg); transition: transform .6s cubic-bezier(.2,.8,.2,1), color .3s; }
        .work .cat { font-family: var(--mono); font-size: 12px; text-transform: uppercase; letter-spacing: .1em; color: var(--fg-dim); }
        .work .url { font-family: var(--mono); font-size: 12px; color: var(--fg-dim); }
        .work .arrow { font-family: var(--mono); font-size: 18px; color: var(--fg-dim); text-align: right; transition: transform .4s, color .3s; }
        .work:hover .name { transform: translateX(12px); color: var(--accent); }
        .work:hover .arrow { transform: translate(6px, 0); color: var(--fg); }

        /* Hover preview */
        .work .preview {
          position: fixed; pointer-events: none; z-index: 50;
          width: 380px; height: 260px; border-radius: 12px; overflow: hidden;
          opacity: 0; transform: translate(-50%, -50%) scale(0.9);
          transition: opacity .3s, transform .4s cubic-bezier(.2,.8,.2,1);
          border: 1px solid var(--line-strong);
          background: var(--tint);
          display: grid; place-items: center;
        }
        .work:hover .preview { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        .work .preview .inner {
          position: absolute; inset: 0; display: grid; place-items: center;
          background:
            repeating-linear-gradient(45deg, rgba(0,0,0,.12) 0 2px, transparent 2px 14px),
            linear-gradient(160deg, var(--tint), rgba(0,0,0,.3));
        }
        .work .preview .ph {
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em;
          color: #0a0a0a; background: rgba(255,255,255,.85); padding: 6px 10px; border-radius: 4px;
        }

        /* Expanded detail */
        .work.open { padding: 28px 0 0; }
        .detail {
          display: none;
          grid-column: 1 / -1;
          padding: 24px 0 40px;
          grid-template-columns: 1.3fr 1fr; gap: 60px;
        }
        .work.open .detail { display: grid; animation: expand .6s cubic-bezier(.2,.8,.2,1); }
        @keyframes expand { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: none } }
        .detail .img {
          aspect-ratio: 16/10; border-radius: 12px; border: 1px solid var(--line);
          background:
            repeating-linear-gradient(45deg, rgba(255,255,255,.04) 0 2px, transparent 2px 14px),
            linear-gradient(160deg, var(--tint), rgba(0,0,0,.6));
          position: relative;
        }
        .detail .img .ph {
          position: absolute; left: 16px; bottom: 16px;
          font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
          color: var(--fg); background: rgba(0,0,0,.4); padding: 6px 10px; border-radius: 4px;
          border: 1px solid var(--line-strong);
        }
        .detail .copy { display: flex; flex-direction: column; gap: 20px; padding-top: 6px; }
        .detail .copy .row { display: grid; grid-template-columns: 120px 1fr; gap: 16px; }
        .detail .copy .k { font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--fg-muted); padding-top: 4px; }
        .detail .copy .v { font-size: 15px; line-height: 1.6; color: var(--fg); }
        .detail .copy .v.dim { color: var(--fg-dim); }
        .detail .chips { display: flex; flex-wrap: wrap; gap: 6px; }
        .detail .chips span {
          font-family: var(--mono); font-size: 10px; letter-spacing: .06em;
          padding: 5px 10px; border: 1px solid var(--line-strong); border-radius: 999px;
          color: var(--fg-dim);
        }
        .detail .visit {
          align-self: flex-start;
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
          color: var(--fg); padding: 12px 18px; border: 1px solid var(--line-strong); border-radius: 999px;
          transition: background .3s, color .3s;
        }
        .detail .visit:hover { background: var(--fg); color: var(--bg); }

        @media (max-width: 900px) {
          .works { padding: 100px 20px; }
          .works .head { flex-direction: column; align-items: flex-start; gap: 16px; }
          .work { grid-template-columns: 40px 1fr 60px; }
          .work .cat, .work .url { display: none; }
          .detail { grid-template-columns: 1fr; gap: 24px; }
          .work .preview { display: none; }
        }
      `}</style>

      <div className="head">
        <div>
          <div className="label"><span>(Work)</span> / 04</div>
          <h2 className="reveal-line"><span>Selected <em>works</em></span></h2>
        </div>
        <div className="right reveal-fade">
          Six featured projects, 2022–2025.<br/>
          Hover a row for a preview, click to expand.
        </div>
      </div>

      <div className="work-list">
        {WORKS.map((w, i) => (
          <WorkRow key={w.n} w={w} open={open === i} onToggle={() => setOpen(open === i ? null : i)} />
        ))}
      </div>
    </section>
  );
}

function WorkRow({ w, open, onToggle }) {
  const rowRef = React.useRef(null);
  const previewRef = React.useRef(null);
  function onMove(e) {
    if (!previewRef.current) return;
    previewRef.current.style.left = e.clientX + 'px';
    previewRef.current.style.top = e.clientY + 'px';
  }
  return (
    <div
      ref={rowRef}
      className={'work reveal-fade' + (open ? ' open' : '')}
      style={{'--tint': w.tint}}
      onClick={onToggle}
      onMouseMove={onMove}
      data-cursor="image"
    >
      <div className="n">◉ {w.n}</div>
      <div className="name">{w.name}</div>
      <div className="cat">{w.cat}</div>
      <div className="url">{w.url} · {w.year}</div>
      <div className="arrow">{open ? '—' : '+'}</div>

      <div className="preview" ref={previewRef}>
        <div className="inner">
          <span className="ph">{w.placeholder}</span>
        </div>
      </div>

      <div className="detail">
        <div className="img" style={{'--tint': w.tint}}>
          <span className="ph">{w.placeholder}</span>
        </div>
        <div className="copy">
          <div className="row"><div className="k">Problem</div><div className="v dim">{w.problem}</div></div>
          <div className="row"><div className="k">Role</div><div className="v">{w.role}</div></div>
          <div className="row"><div className="k">Outcome</div><div className="v">{w.outcome}</div></div>
          <div className="row"><div className="k">Stack</div><div className="v"><div className="chips">{w.tech.map(t => <span key={t}>{t}</span>)}</div></div></div>
          <a className="visit" href={'https://' + w.url} target="_blank" rel="noopener" onClick={(e) => e.stopPropagation()}>
            Visit live site <span>↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}

window.Works = Works;
