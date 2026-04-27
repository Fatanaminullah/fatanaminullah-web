/* Contact — large editorial CTA + footer */
function Contact() {
  const LINKS = [
    { k: 'Email', v: 'fatan.aminullah.j@gmail.com', href: 'mailto:fatan.aminullah.j@gmail.com' },
    { k: 'LinkedIn', v: '/in/fatanaminullah', href: 'https://linkedin.com' },
    { k: 'GitHub', v: '@fatanaminullah', href: 'https://github.com' },
    { k: 'Read.cv', v: 'fatan', href: '#' },
  ];
  return (
    <section id="contact" data-screen-label="06 Contact" className="contact">
      <style>{`
        .contact {
          padding: 200px 40px 80px;
          background: var(--cream);
          border-top: 1px solid var(--line);
          position: relative;
        }
        .contact .inner { max-width: 1440px; margin: 0 auto; }
        .contact .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 40px;
        }
        .contact .label::before { content:''; width: 40px; height:1px; background: var(--fg-muted); }

        .contact h2 {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(56px, 10vw, 200px); line-height: 0.86; letter-spacing: -0.045em;
          max-width: 14ch;
        }
        .contact h2 em { font-style: italic; color: var(--accent); }

        .contact .row {
          display: flex; flex-wrap: wrap; gap: 14px;
          margin-top: 80px;
        }
        .contact .row a {
          display: inline-flex; align-items: baseline; gap: 14px;
          padding: 20px 28px;
          border: 1px solid var(--line-strong); border-radius: 999px;
          font-family: var(--mono); font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg); background: transparent;
          transition: background .3s, color .3s, border-color .3s;
          cursor: none;
        }
        .contact .row a .v {
          font-family: var(--serif); font-style: italic; font-size: 18px;
          letter-spacing: -0.01em; text-transform: none;
          color: var(--fg-dim);
        }
        .contact .row a:hover { background: var(--fg); color: var(--bg); border-color: var(--fg); }
        .contact .row a:hover .v { color: var(--bg); }

        .contact .cta-row {
          display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px;
        }
        .contact .cta-row a {
          padding: 20px 28px;
          background: var(--accent);
          color: var(--bg);
          border-radius: 999px;
          font-family: var(--mono); font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
          display: inline-flex; align-items: center; gap: 12px;
          transition: transform .3s cubic-bezier(.2,.8,.2,1);
        }
        .contact .cta-row a:hover { transform: translateY(-3px); }
        .contact .cta-row a .arrow {
          display: inline-block;
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--bg); color: var(--accent);
          display: grid; place-items: center;
          font-family: var(--serif); font-size: 16px;
        }

        .colophon {
          margin-top: 160px;
          padding-top: 28px;
          border-top: 1px solid var(--line);
          display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px;
          font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-muted);
        }
        .colophon .big {
          font-family: var(--serif);
          font-size: 22px;
          text-transform: none;
          letter-spacing: -0.01em;
          color: var(--fg-dim);
          font-style: italic;
          line-height: 1.4;
        }
        .colophon .col h5 { font-size: 10px; letter-spacing: .18em; text-transform: uppercase; color: var(--fg); margin-bottom: 10px; font-weight: 500; }
        .colophon .col ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
        .colophon .col ul li { color: var(--fg-dim); text-transform: none; letter-spacing: 0.01em; font-family: var(--sans); font-size: 12px; }

        .foot {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          display: flex; justify-content: space-between; flex-wrap: wrap; gap: 20px;
          font-family: var(--mono); font-size: 10px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-muted);
        }

        @media (max-width: 900px) {
          .contact { padding: 100px 20px 40px; }
          .contact h2 { font-size: clamp(48px, 14vw, 80px); }
          .colophon { grid-template-columns: 1fr 1fr; }
          .contact .row a .v { display: none; }
        }
      `}</style>

      <div className="inner">
        <div className="label"><span>(Let\u2019s talk)</span> / 06</div>

        <h2 className="reveal-line"><span>Let&rsquo;s build something <em>together</em>.</span></h2>

        <div className="cta-row reveal-fade">
          <a href="mailto:fatan.aminullah.j@gmail.com" data-cursor="link">
            Start a project
            <span className="arrow">→</span>
          </a>
          <a href="#" style={{background: 'transparent', color: 'var(--fg)', border: '1px solid var(--line-strong)'}} data-cursor="link" onClick={(e) => { e.preventDefault(); document.getElementById('askFab')?.click(); }}>
            Ask Fatan
            <span className="arrow" style={{background: 'var(--fg)', color: 'var(--bg)'}}>?</span>
          </a>
        </div>

        <div className="row">
          {LINKS.map(l => (
            <a key={l.k} href={l.href} target="_blank" rel="noopener" data-cursor="link">
              {l.k}
              <span className="v">{l.v}</span>
            </a>
          ))}
        </div>

        <div className="colophon">
          <div className="big">
            &ldquo;Warm, natural, intentional. Every element has room to breathe.&rdquo;
          </div>
          <div className="col">
            <h5>Stack</h5>
            <ul><li>Next.js</li><li>TypeScript</li><li>R3F / GSAP</li></ul>
          </div>
          <div className="col">
            <h5>Type</h5>
            <ul><li>Fraunces</li><li>Inter</li><li>JetBrains Mono</li></ul>
          </div>
          <div className="col">
            <h5>Studio</h5>
            <ul><li>Antikode · Jakarta</li><li>UTC+7</li><li>Available Q2 &rsquo;26</li></ul>
          </div>
        </div>

        <div className="foot">
          <div>&copy; 2026 Fatan Aminullah · Crafted in Jakarta</div>
          <div>Press <span style={{fontFamily:'var(--mono)', padding:'2px 6px', border:'1px solid var(--line-strong)', borderRadius:4, color:'var(--fg)'}}>Ctrl</span> <span style={{fontFamily:'var(--mono)', padding:'2px 6px', border:'1px solid var(--line-strong)', borderRadius:4, color:'var(--fg)'}}>`</span> for terminal</div>
          <div>v2.0 · Earth edition</div>
        </div>
      </div>
    </section>
  );
}

window.Contact = Contact;
