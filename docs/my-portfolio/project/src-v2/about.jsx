/* About — scroll-revealed split layout with bento stats */
function About() {
  return (
    <section id="about" data-screen-label="02 About" className="about">
      <style>{`
        .about { padding: 200px 40px 160px; position: relative; }
        .about .grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 80px;
          max-width: 1280px; margin: 0 auto;
          align-items: start;
        }
        .about .label {
          display: flex; align-items: center; gap: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--fg-dim); margin-bottom: 40px;
        }
        .about .label::before { content:''; width: 40px; height:1px; background: var(--fg-muted); }

        .about .copy p {
          font-family: var(--serif);
          font-size: clamp(28px, 3.2vw, 52px);
          line-height: 1.15;
          letter-spacing: -0.015em;
          color: var(--fg);
          margin-bottom: 28px;
        }
        .about .copy p em { color: var(--accent); font-style: italic; }
        .about .copy .lead-reveal .reveal-word { margin-right: 0; }

        .about .sub {
          font-family: var(--sans);
          font-size: 16px; line-height: 1.7;
          color: var(--fg-dim);
          max-width: 40ch;
          margin-top: 8px;
        }

        .about .right { position: sticky; top: 100px; }

        .bento {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
        }
        .bento .cell {
          background: var(--cream);
          border: 1px solid var(--line);
          border-radius: 14px;
          padding: 28px 24px;
          min-height: 160px;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative;
          transition: transform .5s cubic-bezier(.2,.8,.2,1), box-shadow .5s, border-color .3s;
          overflow: hidden;
        }
        .bento .cell:hover {
          transform: translateY(-4px);
          box-shadow: 0 22px 50px -20px rgba(80, 55, 30, 0.22);
          border-color: var(--line-strong);
        }
        .bento .cell .k {
          font-family: var(--serif);
          font-size: clamp(56px, 6vw, 84px);
          line-height: 1;
          letter-spacing: -0.03em;
          color: var(--fg);
        }
        .bento .cell .k sup {
          font-size: 0.45em; color: var(--accent); vertical-align: super;
          font-family: var(--sans); font-weight: 400;
          margin-left: 4px;
        }
        .bento .cell .v {
          font-family: var(--mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
          color: var(--fg-muted);
          margin-top: 16px;
        }

        .bento .cell.wide { grid-column: span 2; min-height: 120px; }
        .bento .cell.wide .k { font-size: clamp(24px, 2.4vw, 32px); font-style: italic; }

        .about .signature {
          margin-top: 60px;
          display: flex; align-items: center; gap: 18px;
          padding-top: 32px;
          border-top: 1px solid var(--line);
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-muted);
        }
        .about .signature .sig {
          font-family: var(--serif); font-style: italic; font-size: 28px;
          color: var(--fg); letter-spacing: -0.01em;
          text-transform: none;
        }

        @media (max-width: 900px) {
          .about { padding: 100px 20px 80px; }
          .about .grid { grid-template-columns: 1fr; gap: 40px; }
          .about .right { position: static; }
        }
      `}</style>

      <div className="grid">
        <div>
          <div className="label"><span>(About)</span> / 02</div>
          <div className="copy lead-reveal">
            <p>
              Six years of building web experiences across <em>corporate</em>, <em>e-commerce</em>, and <em>loyalty</em> platforms.
            </p>
            <p style={{fontSize: 'clamp(22px, 2.4vw, 36px)'}}>
              I bridge engineering precision with visual craft &mdash; the kind of work that feels inevitable once it ships.
            </p>
          </div>

          <div className="sub reveal-fade">
            Currently senior frontend at Antikode, leading builds for brands across Southeast Asia.
            Comfortable in the seams between motion, performance, and systems thinking.
          </div>

          <div className="signature reveal-fade" data-delay="0.2">
            <span className="sig">&mdash; Fatan</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>

        <div className="right">
          <div className="bento">
            <div className="cell reveal-fade" data-delay="0.05">
              <div className="k">6<sup>+</sup></div>
              <div className="v">Years Building</div>
            </div>
            <div className="cell reveal-fade" data-delay="0.1">
              <div className="k">30<sup>+</sup></div>
              <div className="v">Projects Shipped</div>
            </div>
            <div className="cell reveal-fade" data-delay="0.15">
              <div className="k">3</div>
              <div className="v">Companies</div>
            </div>
            <div className="cell reveal-fade" data-delay="0.2">
              <div className="k">4</div>
              <div className="v">Devs Mentored</div>
            </div>
            <div className="cell wide reveal-fade" data-delay="0.25">
              <div className="k">&ldquo;The restraint <em style={{color:'var(--accent)'}}>is</em> the craft.&rdquo;</div>
              <div className="v">Operating Principle</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
