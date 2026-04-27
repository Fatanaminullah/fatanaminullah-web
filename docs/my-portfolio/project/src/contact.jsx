/* Contact / Footer */
function Contact() {
  const [hover, setHover] = React.useState(false);
  return (
    <section id="contact" data-screen-label="06 Contact" className="contact">
      <style>{`
        .contact { padding: 180px 40px 40px; position: relative; border-top: 1px solid var(--line); }
        .contact .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 60px;
        }
        .contact .label::before { content: ''; width: 40px; height: 1px; background: var(--fg-dim); }

        .contact h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(88px, 14vw, 240px);
          line-height: 0.88; letter-spacing: -0.04em;
          margin-bottom: 60px;
          cursor: none;
        }
        .contact h2 em { font-style: italic; color: var(--accent); }
        .contact h2 .line { display: block; }
        .contact h2 .line:hover em { animation: wobble 1s; }
        @keyframes wobble { 0%,100% { transform: rotate(0) } 30% { transform: rotate(-3deg) } 60% { transform: rotate(2deg) } }

        .contact .email {
          display: inline-flex; align-items: baseline; gap: 14px;
          font-family: var(--serif); font-size: clamp(36px, 5vw, 72px);
          color: var(--fg);
          padding-bottom: 6px;
          border-bottom: 1px solid var(--line-strong);
          margin-bottom: 80px;
          transition: color .3s, border-color .3s;
          text-wrap: pretty;
        }
        .contact .email:hover { color: var(--accent); border-color: var(--accent); }
        .contact .email .arrow { font-size: 0.6em; transition: transform .3s; }
        .contact .email:hover .arrow { transform: translate(6px, -6px); }

        .contact .grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 40px;
          padding-top: 40px; border-top: 1px solid var(--line);
          margin-bottom: 80px;
        }
        .contact .grid .col .k {
          font-family: var(--mono); font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
          color: var(--fg-muted); margin-bottom: 16px;
        }
        .contact .grid .col a, .contact .grid .col p {
          display: block; font-size: 16px; color: var(--fg); line-height: 1.6;
          transition: color .3s;
        }
        .contact .grid .col a:hover { color: var(--accent); }

        .footer-meta {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 24px; padding: 28px 0 0;
          border-top: 1px solid var(--line);
          font-family: var(--mono); font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
          color: var(--fg-muted);
        }
        .footer-meta .r { text-align: right; }
        .footer-meta .c { text-align: center; }

        .footer-mark {
          font-family: var(--serif); font-size: clamp(160px, 28vw, 480px);
          line-height: 0.86; letter-spacing: -0.05em;
          color: transparent;
          -webkit-text-stroke: 1px var(--line-strong);
          margin: 80px -40px -20px;
          padding: 0 40px;
          overflow: hidden;
          text-align: center;
          user-select: none; pointer-events: none;
        }

        @media (max-width: 820px) {
          .contact { padding: 100px 20px 24px; }
          .contact .grid { grid-template-columns: 1fr 1fr; gap: 24px; }
          .footer-meta { grid-template-columns: 1fr; text-align: left !important; }
          .footer-meta .r, .footer-meta .c { text-align: left; }
        }
      `}</style>

      <div className="label"><span>(Contact)</span> / 06</div>

      <h2 onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <span className="line reveal-line"><span>Let's <em>build</em></span></span>
        <span className="line reveal-line"><span>something <em>together.</em></span></span>
      </h2>

      <a className="email" href="mailto:fatan.aminullah.j@gmail.com" data-cursor="link">
        fatan.aminullah.j@gmail.com <span className="arrow">↗</span>
      </a>

      <div className="grid">
        <div className="col">
          <div className="k">Direct</div>
          <a href="mailto:fatan.aminullah.j@gmail.com" data-cursor="link">Email</a>
          <a href="#" data-cursor="link">Schedule a call ↗</a>
        </div>
        <div className="col">
          <div className="k">Elsewhere</div>
          <a href="#" data-cursor="link">LinkedIn ↗</a>
          <a href="#" data-cursor="link">GitHub ↗</a>
          <a href="#" data-cursor="link">Read.cv ↗</a>
        </div>
        <div className="col">
          <div className="k">Location</div>
          <p>Jakarta, Indonesia</p>
          <p id="jkt-time">GMT +07:00</p>
        </div>
        <div className="col">
          <div className="k">Status</div>
          <p style={{display:'flex', alignItems:'center', gap:8}}>
            <span style={{width:8,height:8,borderRadius:'50%', background:'oklch(76% 0.18 140)'}}></span>
            Available Q2 2026
          </p>
          <p style={{color:'var(--fg-dim)'}}>2 spots open</p>
        </div>
      </div>

      <div className="footer-mark">FATAN</div>

      <div className="footer-meta">
        <div>© MMXXVI — Fatan Aminullah</div>
        <div className="c">Built with Next.js + GSAP + Three.js</div>
        <div className="r">Ctrl + ` for Terminal</div>
      </div>
    </section>
  );
}

window.Contact = Contact;
