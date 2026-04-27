/* Hero — Warm editorial, centered portrait, architectural sun motif */
function Hero() {
  const sunRef = React.useRef(null);
  const photoRef = React.useRef(null);
  const heroRef = React.useRef(null);

  // Gentle parallax for the sun motif
  React.useEffect(() => {
    function onMove(e) {
      if (!sunRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * -18;
      const y = (e.clientY / window.innerHeight - 0.5) * -12;
      sunRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Photo parallax
  React.useEffect(() => {
    function onMove(e) {
      if (!photoRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      photoRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  React.useEffect(() => {
    // trigger reveals on mount after tiny delay
    requestAnimationFrame(() => {
      heroRef.current?.querySelectorAll('.reveal-line, .reveal-word, .reveal-fade').forEach(el => {
        const d = parseFloat(el.dataset.delay || '0');
        setTimeout(() => el.classList.add('in'), 200 + d * 1000);
      });
    });
  }, []);

  return (
    <section id="top" ref={heroRef} data-screen-label="01 Hero" className="hero">
      <style>{`
        .hero {
          position: relative; min-height: 100vh; min-height: 100svh;
          display: flex; flex-direction: column; justify-content: flex-end;
          overflow: hidden; padding: 0 40px 40px;
        }
        .hero .sun-wrap {
          position: absolute;
          left: 50%; top: 56%;
          transform: translate(-50%, -50%);
          width: min(78vmin, 640px);
          aspect-ratio: 1;
          pointer-events: none;
          z-index: 1;
          will-change: transform;
          transition: transform 1.2s cubic-bezier(.2,.8,.2,1);
        }
        .hero .sun-wrap .disc {
          position: absolute; inset: 14%;
          border-radius: 50%;
          background: radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--accent) 35%, var(--bg)) 0%, color-mix(in oklab, var(--accent) 18%, var(--bg)) 55%, transparent 72%);
          opacity: 0.9;
        }
        .hero .sun-wrap .ring {
          position: absolute; inset: 0;
          border-radius: 50%;
          border: 1px solid var(--accent);
          opacity: 0.25;
        }
        .hero .sun-wrap .ring.r2 { inset: 8%; opacity: 0.18; }
        .hero .sun-wrap .ring.r3 { inset: 16%; opacity: 0.12; }
        .hero .sun-wrap .ticks {
          position: absolute; inset: 0;
          animation: rotate 120s linear infinite;
        }
        .hero .sun-wrap .tick {
          position: absolute; left: 50%; top: 0;
          width: 1px; height: 10px;
          background: var(--accent); opacity: 0.4;
          transform-origin: 50% calc(50vmin);
        }
        .hero .sun-wrap .tick.lg { height: 18px; opacity: 0.65; width: 1px; }
        @keyframes rotate { to { transform: rotate(360deg); } }
        .hero .sun-wrap .meridian {
          position: absolute; inset: 0;
          border-radius: 50%;
          background:
            linear-gradient(90deg, transparent calc(50% - 0.5px), color-mix(in oklab, var(--accent) 30%, transparent) calc(50% - 0.5px) calc(50% + 0.5px), transparent calc(50% + 0.5px));
          mask: radial-gradient(circle, black 60%, transparent 62%);
          -webkit-mask: radial-gradient(circle, black 60%, transparent 62%);
          opacity: 0.3;
        }
        .hero .sun-wrap .coord {
          position: absolute;
          font-family: var(--mono); font-size: 9px; letter-spacing: .18em; text-transform: uppercase;
          color: var(--accent); opacity: 0.6;
        }
        .hero .sun-wrap .coord.tl { top: 2%; left: 50%; transform: translateX(-50%); }
        .hero .sun-wrap .coord.br { bottom: 2%; left: 50%; transform: translateX(-50%); }
        .hero .sun-wrap .coord.l  { left: 2%;  top: 50%; transform: translateY(-50%) rotate(-90deg); transform-origin: 0 0; }
        .hero .sun-wrap .coord.r  { right: 2%; top: 50%; transform: translateY(-50%) rotate(90deg); transform-origin: 100% 0; }

        .hero .stage {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          padding-top: 88px;
          flex: 1;
          justify-content: flex-end;
        }
        .hero .portrait-wrap {
          position: relative;
          width: clamp(220px, 26vw, 360px);
          margin-bottom: -120px;
          z-index: 2;
          will-change: transform;
        }
        .hero .portrait {
          position: relative;
          aspect-ratio: 3/4.6;
          overflow: visible;
        }
        .hero .portrait img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: contain;
          object-position: bottom center;
          filter: drop-shadow(0 30px 60px rgba(60, 40, 20, 0.18));
        }
        .hero .portrait::after {
          /* Soft bottom fade into the parchment so the headline can overlap */
          content: '';
          position: absolute; left: -8%; right: -8%; bottom: -2px; height: 38%;
          background: linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--bg) 70%, transparent) 50%, var(--bg) 95%);
          pointer-events: none;
          z-index: 2;
        }
        .hero .portrait .label {
          position: absolute; bottom: 18px; left: -28px;
          font-family: var(--mono); font-size: 9px; letter-spacing: 0.2em;
          color: var(--fg-muted); text-transform: uppercase;
          z-index: 3;
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }

        .hero .nameblock {
          position: relative;
          width: 100%;
          z-index: 4;
          text-align: center;
          margin-top: -40px;
        }
        .hero h1 {
          font-family: var(--serif);
          font-weight: 400;
          font-size: clamp(72px, 14vw, 240px);
          line-height: 0.86;
          letter-spacing: -0.045em;
          color: var(--fg);
          margin: 0;
          white-space: nowrap;
          mix-blend-mode: multiply;
        }
        .hero h1 em { font-style: italic; color: var(--accent); }

        .hero .subtitle {
          margin-top: 22px;
          font-family: var(--mono);
          font-size: 12px;
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: var(--fg);
        }
        .hero .tagline {
          margin-top: 14px;
          font-family: var(--serif);
          font-style: italic;
          font-size: clamp(18px, 2vw, 22px);
          color: var(--fg-dim);
          letter-spacing: -0.01em;
        }

        .hero .meta {
          position: absolute; z-index: 5;
          font-family: var(--mono); font-size: 11px;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: var(--fg-dim);
          display: flex; align-items: center; gap: 10px;
        }
        .hero .meta.bl { left: 40px; bottom: 40px; }
        .hero .meta.br { right: 40px; bottom: 40px; }
        .hero .meta .dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
        .hero .meta .globe {
          width: 12px; height: 12px; border-radius: 50%;
          border: 1px solid var(--fg-dim);
          background:
            linear-gradient(90deg, transparent 49%, var(--fg-dim) 49% 51%, transparent 51%),
            linear-gradient(0deg, transparent 49%, var(--fg-dim) 49% 51%, transparent 51%);
        }

        .hero .scroll {
          position: absolute; left: 50%; bottom: 40px; transform: translateX(-50%); z-index: 5;
          font-family: var(--mono); font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--fg-dim);
          display: flex; flex-direction: column; align-items: center; gap: 10px;
        }
        .hero .scroll .line {
          width: 1px; height: 40px; background: linear-gradient(to bottom, var(--fg-dim), transparent);
          animation: scroll-pulse 2.2s ease-in-out infinite;
          transform-origin: top;
        }
        @keyframes scroll-pulse {
          0%, 100% { transform: scaleY(0.3); opacity: 0.4; }
          50% { transform: scaleY(1); opacity: 1; }
        }

        @media (max-width: 900px) {
          .hero { padding: 0 20px 24px; }
          .hero .sun-wrap { width: 110vw; opacity: 0.85; }
          .hero h1 { font-size: clamp(56px, 18vw, 120px); }
          .hero .portrait-wrap { width: 50vw; margin-bottom: -80px; }
          .hero .portrait-wrap { width: 70vw; margin-bottom: -40px; }
          .hero .meta.bl { left: 20px; bottom: 72px; }
          .hero .meta.br { right: 20px; bottom: 72px; font-size: 10px; }
          .hero .scroll { bottom: 20px; }
        }
      `}</style>

      <div className="sun-wrap" ref={sunRef}>
        <div className="coord tl">N · 06&deg;10&prime;S</div>
        <div className="coord br">S · 106&deg;50&prime;E</div>
        <div className="coord l">Jakarta</div>
        <div className="coord r">2026</div>
        <div className="ring r3"></div>
        <div className="ring r2"></div>
        <div className="ring"></div>
        <div className="meridian"></div>
        <div className="disc"></div>
        <div className="ticks">
          {Array.from({length: 24}).map((_, i) => (
            <span key={i} className={'tick' + (i % 6 === 0 ? ' lg' : '')} style={{transform: `translateX(-50%) rotate(${i * 15}deg)`, transformOrigin: '50% 50vmin'}}></span>
          ))}
        </div>
      </div>

      <div className="stage">
        <div className="portrait-wrap" ref={photoRef}>
          <div className="portrait">
            <img src="src-v2/profile.png" alt="Fatan Aminullah" />
            <div className="label">Fig. 01 &mdash; Jakarta &middot; 2026</div>
          </div>
        </div>

        <div className="nameblock">
          <h1 className="reveal-line" data-delay="0.05"><span>Fatan <em>Aminullah</em></span></h1>
          <div className="subtitle reveal-fade" data-delay="0.6">Senior &middot; Software &middot; Developer</div>
          <div className="tagline reveal-fade" data-delay="0.75">
            crafting high-performance digital experiences from Jakarta.
          </div>
        </div>
      </div>

      <div className="meta bl reveal-fade" data-delay="0.9">
        <span className="globe"></span>
        Jakarta, Indonesia · 6&deg;S
      </div>
      <div className="meta br reveal-fade" data-delay="0.9">
        <span className="dot"></span>
        Available Q2 &rsquo;26
      </div>

      <div className="scroll reveal-fade" data-delay="1">
        <span>Scroll</span>
        <span className="line"></span>
      </div>
    </section>
  );
}

window.Hero = Hero;
