/* Tech Stack — dual-row infinite marquee */
function Marquee() {
  const rowA = ['Next.js','React','Vue.js','TypeScript','TailwindCSS','GSAP','Three.js','Framer Motion','React Native','Node.js','Express','Web3'];
  const rowB = ['Lenis','Socket.io','Matter.js','Bootstrap','SASS','PostgreSQL','MongoDB','GraphQL','Figma','Git','Vercel','Storybook'];

  return (
    <section className="marq" data-screen-label="03 Stack">
      <style>{`
        .marq { padding: 120px 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); overflow: hidden; }
        .marq .label { padding: 0 40px; margin-bottom: 60px;
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim);
        }
        .marq .label::before { content: ''; width: 40px; height: 1px; background: var(--fg-dim); }
        .marq-row { display: flex; white-space: nowrap; gap: 0; }
        .marq-row .track {
          display: inline-flex; flex-shrink: 0; animation: scrollx 40s linear infinite;
        }
        .marq-row.b .track { animation: scrollx-rev 48s linear infinite; }
        @keyframes scrollx { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes scrollx-rev { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
        .chip {
          display: inline-flex; align-items: center; gap: 16px;
          padding: 0 32px;
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(54px, 8vw, 120px);
          line-height: 1.1; letter-spacing: -0.03em;
          color: var(--fg); cursor: default;
          transition: color .3s, -webkit-text-stroke-color .3s;
        }
        .chip:hover { color: var(--accent); }
        .chip .sep {
          width: 8px; height: 8px; background: var(--fg-muted); border-radius: 50%;
          transform: translateY(-18px);
          transition: background .3s, transform .3s;
        }
        .chip:hover .sep { background: var(--accent); }
        .marq-row.b .chip { font-family: var(--mono); font-size: clamp(20px, 2.4vw, 34px); color: var(--fg-dim); font-weight: 400; letter-spacing: 0; text-transform: uppercase; }
        .marq-row.b .chip:hover { color: var(--fg); }
        .marq-row.b .chip .sep { transform: translateY(-2px); width: 4px; height: 4px; }
        .marq-pause:hover .track { animation-play-state: paused; }
      `}</style>

      <div className="label"><span>(Stack)</span> / 03 · Tools of choice</div>

      <div className="marq-row marq-pause">
        <div className="track">
          {[...rowA, ...rowA].map((x, i) => (
            <span className="chip" key={'a'+i} data-cursor="tech">{x}<span className="sep" /></span>
          ))}
        </div>
      </div>

      <div className="marq-row b marq-pause" style={{marginTop: 24}}>
        <div className="track">
          {[...rowB, ...rowB].map((x, i) => (
            <span className="chip" key={'b'+i} data-cursor="tech">{x}<span className="sep" /></span>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Marquee = Marquee;
