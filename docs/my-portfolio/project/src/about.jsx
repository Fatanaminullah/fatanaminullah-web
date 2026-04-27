/* About + Bento stats */
function About() {
  return (
    <section id="about" data-screen-label="02 About" className="about">
      <style>{`
        .about { padding: 160px 40px 120px; position: relative; }
        .about .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 60px;
        }
        .about .label::before { content: ''; width: 40px; height: 1px; background: var(--fg-dim); }
        .about .intro {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(36px, 5vw, 72px); line-height: 1.05; letter-spacing: -0.02em;
          max-width: 1200px;
        }
        .about .intro em { font-style: italic; color: var(--accent); }
        .about .intro .dim { color: var(--fg-muted); }
        .about .lead {
          margin-top: 80px; display: grid; grid-template-columns: 1fr 1fr;
          gap: 80px; max-width: 1200px;
        }
        .about .lead .col p { font-size: 16px; line-height: 1.65; color: var(--fg-dim); }
        .about .lead .col p + p { margin-top: 14px; }
        .about .bento {
          margin-top: 120px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stat {
          border: 1px solid var(--line);
          border-radius: 16px;
          padding: 28px 28px 24px;
          background: linear-gradient(180deg, rgba(255,255,255,0.02), transparent);
          position: relative; overflow: hidden;
          transition: transform .6s cubic-bezier(.2,.8,.2,1), border-color .3s, background .3s;
          min-height: 200px;
          display: flex; flex-direction: column; justify-content: space-between;
        }
        .stat::after {
          content: ''; position: absolute; inset: 0;
          background: radial-gradient(600px circle at var(--mx,50%) var(--my,50%), var(--accent-dim), transparent 40%);
          opacity: 0; transition: opacity .4s;
          pointer-events: none;
        }
        .stat:hover { transform: translateY(-6px); border-color: var(--line-strong); }
        .stat:hover::after { opacity: 1; }
        .stat .n {
          font-family: var(--serif); font-size: 96px; line-height: 1; letter-spacing: -0.04em;
          color: var(--fg);
          font-feature-settings: 'ss01';
        }
        .stat .n sup { font-size: 44px; font-feature-settings: 'ss01'; color: var(--fg-dim); margin-left: 4px; vertical-align: 40px; }
        .stat .k {
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim);
        }
        .stat .d { font-size: 13px; color: var(--fg-dim); line-height: 1.5; margin-top: 8px; }
        .stat .idx {
          position: absolute; top: 16px; right: 18px;
          font-family: var(--mono); font-size: 10px; letter-spacing: .14em;
          color: var(--fg-muted);
        }

        @media (max-width: 900px) {
          .about { padding: 100px 20px 80px; }
          .about .lead { grid-template-columns: 1fr; gap: 32px; margin-top: 48px; }
          .about .bento { grid-template-columns: 1fr 1fr; margin-top: 60px; }
          .stat .n { font-size: 72px; }
        }
      `}</style>

      <div className="label"><span>(About)</span> / 02</div>

      <h2 className="intro">
        <span className="reveal-line"><span>Six years crafting web experiences</span></span>
        <span className="reveal-line"><span><em>across</em> corporate, e-commerce &amp; loyalty</span></span>
        <span className="reveal-line"><span><span className="dim">platforms. I bridge</span> engineering precision</span></span>
        <span className="reveal-line"><span><span className="dim">with</span> visual craft<span className="dim">.</span></span></span>
      </h2>

      <div className="lead">
        <div className="col reveal-fade">
          <p>I'm a Senior Software Developer based in Jakarta, Indonesia — currently shipping production work in Next.js, React and React Native for brands that care about the details users never notice, but always feel.</p>
          <p>My day usually involves arguing with a designer about a 2&nbsp;pixel shadow, wiring up a Lenis scroll, and reviewing a junior dev's PR in between.</p>
        </div>
        <div className="col reveal-fade">
          <p>Outside of the editor I mentor four developers, run the occasional dev-tooling internal workshop, and collect opinions on which CSS unit is least offensive (currently: ch).</p>
          <p><span style={{color:'var(--fg)'}}>Currently:</span> Senior Software Developer at PT Digital Rantai Maya, leading frontend on corporate profile work for Peruri and Pocari Sweat.</p>
        </div>
      </div>

      <div className="bento">
        <Stat idx="01" n="6" sup="+" k="Years" d="Shipping production web apps since 2019." />
        <Stat idx="02" n="30" sup="+" k="Projects" d="Across finance, retail, F&B, entertainment." />
        <Stat idx="03" n="3" k="Companies" d="Corporate profile, e-commerce, loyalty product." />
        <Stat idx="04" n="4" k="Devs mentored" d="PR reviews, pairing, internal workshops." />
      </div>
    </section>
  );
}

function Stat({ idx, n, sup, k, d }) {
  const ref = React.useRef(null);
  function onMove(e) {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    ref.current.style.setProperty('--my', (e.clientY - r.top) + 'px');
  }
  return (
    <div className="stat reveal-fade" ref={ref} onMouseMove={onMove}>
      <span className="idx">◉ {idx}</span>
      <div className="n">{n}{sup && <sup>{sup}</sup>}</div>
      <div>
        <div className="k">{k}</div>
        <div className="d">{d}</div>
      </div>
    </div>
  );
}

window.About = About;
