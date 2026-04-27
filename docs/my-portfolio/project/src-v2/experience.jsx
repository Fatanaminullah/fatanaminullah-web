/* Experience — left-aligned vertical timeline with draw-on-scroll line */
function Experience() {
  const EXP = [
    {
      co: 'Antikode',
      role: 'Senior Frontend Developer',
      range: 'Aug 2021 — Present',
      where: 'Jakarta, ID',
      bullets: [
        'Lead frontend across 12+ corporate + e-commerce builds with measurable performance wins.',
        'Mentor four developers on motion, performance budgets, and systems thinking.',
        'Established the studio\u2019s in-house motion + scroll-narrative vocabulary (GSAP/Lenis/R3F).',
      ],
    },
    {
      co: 'Emporia Digital',
      role: 'Frontend Developer',
      range: 'Aug 2020 — Aug 2021',
      where: 'Jakarta, ID',
      bullets: [
        'Shipped marketing sites and editorial platforms for regional media clients.',
        'Owned component library migration from jQuery to React across four products.',
      ],
    },
    {
      co: 'Anabatic Technologies',
      role: 'Frontend Developer',
      range: 'Jul 2019 — Aug 2020',
      where: 'Jakarta, ID',
      bullets: [
        'Delivered internal banking and telco dashboards with strict accessibility gates.',
        'First exposure to large design systems — tokens, theming, multi-brand theming.',
      ],
    },
  ];
  const ref = React.useRef(null);
  const drawRef = React.useRef(null);
  const nodeRefs = React.useRef([]);
  React.useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const end = -r.height + window.innerHeight * 0.25;
      const p = Math.max(0, Math.min(1, (start - r.top) / (start - end)));
      if (drawRef.current) drawRef.current.style.height = (p * 100) + '%';
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const mark = (i + 1) / (EXP.length + 0.2);
        el.classList.toggle('done', p >= mark - 0.2);
        el.classList.toggle('active', p >= mark - 0.2 && p < mark + 0.15);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    // ensure reveals fire
    setTimeout(() => window.observeReveals(ref.current), 50);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="experience" ref={ref} data-screen-label="05 Experience" className="experience">
      <style>{`
        .experience { padding: 180px 40px 160px; position: relative; }
        .experience .head {
          max-width: 1280px; margin: 0 auto 90px;
          display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: end;
        }
        .experience .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 28px;
        }
        .experience .label::before { content:''; width: 40px; height:1px; background: var(--fg-muted); }
        .experience h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(64px, 9vw, 140px); line-height: 0.9; letter-spacing: -0.04em;
        }
        .experience h2 em { font-style: italic; color: var(--accent); }
        .experience .caption {
          font-family: var(--serif); font-size: 18px; line-height: 1.55; color: var(--fg-dim);
          max-width: 42ch; font-style: italic;
        }

        .timeline {
          position: relative;
          max-width: 1080px; margin: 0 auto;
          padding-left: 80px;
        }
        .timeline .spine {
          position: absolute; left: 20px; top: 0; bottom: 0;
          width: 1px; background: var(--line);
        }
        .timeline .draw {
          position: absolute; left: 20px; top: 0;
          width: 1px; background: var(--accent);
          transform-origin: top;
        }

        .entry {
          position: relative;
          display: grid; grid-template-columns: 1fr 1.2fr; gap: 48px;
          padding: 36px 0 60px;
        }
        .entry::before {
          content: ''; position: absolute;
          left: -64px; top: 52px;
          width: 12px; height: 12px; border-radius: 50%;
          background: var(--bg); border: 2px solid var(--accent);
          transition: transform .4s, background .3s;
        }
        .entry.done::before { background: var(--accent); }
        .entry.active::before { transform: scale(1.4); box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 20%, transparent); }

        .entry .left { display: flex; flex-direction: column; gap: 6px; }
        .entry .co {
          font-family: var(--serif); font-size: clamp(36px, 4.5vw, 64px);
          line-height: 1; letter-spacing: -0.025em; color: var(--fg);
        }
        .entry .role {
          font-family: var(--sans); font-size: 15px;
          color: var(--fg-dim); letter-spacing: 0.01em;
        }
        .entry .range {
          font-family: var(--mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--fg-muted); margin-top: 10px;
        }
        .entry .where {
          font-family: var(--mono); font-size: 10px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--fg-muted); margin-top: 4px;
        }

        .entry ul {
          list-style: none; display: flex; flex-direction: column; gap: 14px;
          padding: 8px 0 0;
        }
        .entry ul li {
          position: relative; padding-left: 22px;
          font-family: var(--serif); font-size: 19px; line-height: 1.55;
          color: var(--fg);
          letter-spacing: -0.003em;
        }
        .entry ul li::before {
          content: ''; position: absolute; left: 0; top: 12px;
          width: 10px; height: 1px; background: var(--accent);
        }

        @media (max-width: 900px) {
          .experience { padding: 100px 20px 80px; }
          .experience .head { grid-template-columns: 1fr; }
          .timeline { padding-left: 40px; }
          .timeline .spine, .timeline .draw { left: 10px; }
          .entry { grid-template-columns: 1fr; gap: 18px; padding: 24px 0 40px; }
          .entry::before { left: -34px; top: 44px; }
          .entry ul li { font-size: 16px; }
        }
      `}</style>

      <div className="head">
        <div>
          <div className="label"><span>(Experience)</span> / 05</div>
          <h2 className="reveal-line"><span>Track <em>record</em>.</span></h2>
        </div>
        <div className="caption reveal-fade">
          Three companies, one city, six years — the people and briefs that shaped how I work.
        </div>
      </div>

      <div className="timeline">
        <div className="spine"></div>
        <div className="draw" ref={drawRef}></div>
        {EXP.map((e, i) => (
          <div key={e.co} ref={el => nodeRefs.current[i] = el} className="entry reveal-fade" data-delay={i * 0.08}>
            <div className="left">
              <div className="co">{e.co}</div>
              <div className="role">{e.role}</div>
              <div className="range">{e.range}</div>
              <div className="where">{e.where}</div>
            </div>
            <ul>
              {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

window.Experience = Experience;
