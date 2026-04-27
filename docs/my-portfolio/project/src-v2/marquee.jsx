/* Marquee — film-credits style tech stack ticker */
function Marquee() {
  const TECH_A = ['Next.js', 'React.js', 'Vue.js', 'TypeScript', 'TailwindCSS', 'GSAP', 'Three.js'];
  const TECH_B = ['Framer Motion', 'React Native', 'Node.js', 'Express.js', 'Web3', 'Lenis', 'Socket.io'];
  return (
    <section id="stack" data-screen-label="03 Stack" className="marquee">
      <style>{`
        .marquee {
          position: relative;
          padding: 60px 0 80px;
          border-top: 1px solid var(--line);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
        }
        .marquee .eye {
          text-align: center;
          font-family: var(--mono); font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
          color: var(--fg-muted); margin-bottom: 40px;
        }
        .marquee .eye span { padding: 0 18px; }
        .marquee .eye::before, .marquee .eye::after {
          content: ''; display: inline-block; width: 40px; height: 1px; background: var(--fg-muted);
          vertical-align: middle;
        }
        .row {
          display: flex; align-items: center;
          white-space: nowrap;
          will-change: transform;
          padding: 16px 0;
        }
        .row.a { animation: slide-left 48s linear infinite; }
        .row.b { animation: slide-right 56s linear infinite; }
        @keyframes slide-left { from { transform: translateX(0) } to { transform: translateX(-50%) } }
        @keyframes slide-right { from { transform: translateX(-50%) } to { transform: translateX(0) } }

        .row .item {
          display: inline-flex; align-items: center; gap: 22px;
          font-family: var(--serif);
          font-size: clamp(40px, 6vw, 96px);
          line-height: 1;
          letter-spacing: -0.02em;
          color: var(--fg);
          padding: 0 28px;
          transition: color .3s;
        }
        .row .item:hover { color: var(--accent); font-style: italic; }
        .row .sep {
          display: inline-block;
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--accent);
          opacity: 0.55;
        }
        .row .item.alt { font-style: italic; color: var(--fg-dim); }

        .marquee:hover .row { animation-play-state: paused; }

        @media (max-width: 720px) {
          .marquee { padding: 40px 0 60px; }
          .marquee .eye { font-size: 10px; margin-bottom: 20px; }
        }
      `}</style>

      <div className="eye"><span>Tools of the trade</span></div>

      <div className="row a">
        {[...TECH_A, ...TECH_A, ...TECH_A].map((t, i) => (
          <span className={'item' + (i % 2 ? ' alt' : '')} key={'a' + i}>
            {t}
            <span className="sep"></span>
          </span>
        ))}
      </div>

      <div className="row b">
        {[...TECH_B, ...TECH_B, ...TECH_B].map((t, i) => (
          <span className={'item' + (i % 2 ? ' alt' : '')} key={'b' + i}>
            {t}
            <span className="sep"></span>
          </span>
        ))}
      </div>
    </section>
  );
}

window.Marquee = Marquee;
