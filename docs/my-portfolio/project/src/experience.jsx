/* Experience timeline — vertical, scroll revealed, staggered sides */
const EXPERIENCE = [
  {
    company: 'PT Digital Rantai Maya',
    role: 'Senior Software Developer',
    period: '2023 — Present',
    location: 'Jakarta, ID',
    side: 'left',
    bullets: [
      'Frontend lead on corporate relaunches for Peruri and Pocari Sweat — cut LCP from 3.8s to under 1.2s.',
      'Established the internal design-token pipeline (Figma → Tailwind) now used across 6 active repos.',
      'Mentoring 4 mid/junior developers through PR review and weekly pairing sessions.',
    ]
  },
  {
    company: 'Icehouse',
    role: 'Software Developer',
    period: '2021 — 2023',
    location: 'Jakarta, ID',
    side: 'right',
    bullets: [
      'Shipped Cinema XXI corporate site — 40+ pages, tokenised animation system.',
      'Built Eatlah Club, a realtime loyalty platform with Socket.io; processed 40k stamps in Q1.',
    ]
  },
  {
    company: 'Tokopedia',
    role: 'Frontend Engineer',
    period: '2019 — 2021',
    location: 'Jakarta, ID',
    side: 'left',
    bullets: [
      'Maintained and optimised high-traffic storefront surfaces serving millions of daily sessions.',
      'Owned experiments on category & search pages; reduced JS payload by ~22% via aggressive code-splitting.',
    ]
  },
];

function Experience() {
  return (
    <section id="experience" data-screen-label="05 Experience" className="exp">
      <style>{`
        .exp { padding: 160px 40px; position: relative; }
        .exp .head {
          display: flex; justify-content: space-between; align-items: flex-end;
          margin-bottom: 80px; gap: 40px;
        }
        .exp .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 24px;
        }
        .exp .label::before { content: ''; width: 40px; height: 1px; background: var(--fg-dim); }
        .exp h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(56px, 8vw, 128px); line-height: 0.95; letter-spacing: -0.035em;
        }
        .exp h2 em { font-style: italic; color: var(--accent); }

        .timeline {
          position: relative; max-width: 1200px; margin: 0 auto;
        }
        .timeline::before {
          content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 1px;
          background: var(--line); transform: translateX(-0.5px);
        }
        .tl-progress {
          position: absolute; left: 50%; top: 0; width: 1px;
          background: linear-gradient(180deg, transparent, var(--accent) 30%, var(--accent) 70%, transparent);
          transform: translateX(-0.5px);
          height: 0;
          transition: height .2s linear;
        }
        .entry {
          display: grid; grid-template-columns: 1fr 80px 1fr;
          min-height: 320px;
          align-items: start;
        }
        .entry .node {
          grid-column: 2; position: sticky; top: 50vh;
          justify-self: center; align-self: start;
          width: 14px; height: 14px; border-radius: 50%;
          background: var(--bg); border: 1px solid var(--fg-muted);
          margin-top: 14px;
          z-index: 2;
        }
        .entry.in .node { background: var(--accent); border-color: var(--accent); box-shadow: 0 0 0 6px var(--bg), 0 0 0 7px var(--accent-dim); }
        .entry .card {
          padding: 24px 0;
        }
        .entry[data-side="left"] .card { grid-column: 1; padding-right: 40px; text-align: right; }
        .entry[data-side="right"] .card { grid-column: 3; padding-left: 40px; }

        .card .period {
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 8px;
        }
        .card .role {
          font-family: var(--serif); font-size: clamp(28px, 3.4vw, 44px);
          line-height: 1.1; letter-spacing: -0.02em; margin-bottom: 6px;
        }
        .card .company {
          font-family: var(--mono); font-size: 13px; color: var(--fg); margin-bottom: 4px;
          text-transform: uppercase; letter-spacing: .06em;
        }
        .card .loc {
          font-family: var(--mono); font-size: 11px; color: var(--fg-muted); margin-bottom: 20px;
        }
        .card ul { list-style: none; padding: 0; }
        .card ul li {
          font-size: 14px; color: var(--fg-dim); line-height: 1.6;
          padding: 10px 0; border-top: 1px solid var(--line);
          max-width: 420px;
        }
        .entry[data-side="left"] .card ul li { margin-left: auto; }

        @media (max-width: 820px) {
          .exp { padding: 100px 20px; }
          .timeline::before { left: 8px; }
          .tl-progress { left: 8px; }
          .entry { grid-template-columns: 20px 1fr; min-height: auto; margin-bottom: 40px; }
          .entry .node { grid-column: 1; margin-top: 8px; position: static; }
          .entry[data-side="left"] .card,
          .entry[data-side="right"] .card { grid-column: 2; padding: 0; text-align: left; }
          .entry[data-side="left"] .card ul li { margin-left: 0; }
        }
      `}</style>

      <div className="head">
        <div>
          <div className="label"><span>(Experience)</span> / 05</div>
          <h2 className="reveal-line"><span>Career <em>arc</em></span></h2>
        </div>
      </div>

      <div className="timeline" id="timeline">
        <div className="tl-progress" id="tl-progress"></div>
        {EXPERIENCE.map((e, i) => (
          <Entry key={i} e={e} />
        ))}
      </div>
    </section>
  );
}

function Entry({ e }) {
  const ref = React.useRef(null);
  const [seen, setSeen] = React.useState(false);
  React.useEffect(() => {
    const io = new IntersectionObserver(([en]) => { if (en.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold: 0.3 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={'entry' + (seen ? ' in' : '') + ' reveal-fade' + (seen ? ' in' : '')} data-side={e.side}>
      <div className="node"></div>
      <div className="card">
        <div className="period">{e.period} · {e.location}</div>
        <div className="role">{e.role}</div>
        <div className="company">{e.company}</div>
        <ul>{e.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
      </div>
    </div>
  );
}

window.Experience = Experience;
