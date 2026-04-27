/* Hero — editorial portrait composition with wireframe icosahedron behind */
const { useEffect, useRef } = React;

function Wireframe() {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!window.THREE) return;
    const THREE = window.THREE;
    const mount = mountRef.current;
    if (!mount) return;
    const w = mount.clientWidth, h = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Icosahedron edges, thin lines
    const ico = new THREE.IcosahedronGeometry(2.1, 1);
    const edges = new THREE.EdgesGeometry(ico, 8);
    const mat = new THREE.LineBasicMaterial({ color: 0x7C75F2, transparent: true, opacity: 0.28 });
    const lines = new THREE.LineSegments(edges, mat);
    scene.add(lines);

    // secondary smaller rotating inner ico for depth
    const ico2 = new THREE.IcosahedronGeometry(1.3, 0);
    const edges2 = new THREE.EdgesGeometry(ico2);
    const mat2 = new THREE.LineBasicMaterial({ color: 0xEDE6DA, transparent: true, opacity: 0.09 });
    const lines2 = new THREE.LineSegments(edges2, mat2);
    scene.add(lines2);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    function onMove(e) {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    }
    window.addEventListener('mousemove', onMove);

    function onResize() {
      const w2 = mount.clientWidth, h2 = mount.clientHeight;
      camera.aspect = w2 / h2;
      camera.updateProjectionMatrix();
      renderer.setSize(w2, h2);
    }
    window.addEventListener('resize', onResize);

    let raf;
    const clock = new THREE.Clock();
    function tick() {
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // wireframe moves OPPOSITE direction to mouse for parallax
      lines.rotation.y = t * 0.08 - mouse.x * 0.25;
      lines.rotation.x = -mouse.y * 0.18 + t * 0.03;
      lines2.rotation.y = -t * 0.12 + mouse.x * 0.15;
      lines2.rotation.x = t * 0.09 - mouse.y * 0.1;
      lines2.rotation.z = t * 0.05;

      // keep accent synced
      const a = getComputedStyle(document.documentElement).getPropertyValue('--accent-hex') || '#7C75F2';
      try { mat.color.set(a.trim()); } catch {}

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      renderer.dispose(); ico.dispose(); edges.dispose(); mat.dispose();
      ico2.dispose(); edges2.dispose(); mat2.dispose();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="hero-wire" />;
}

function Portrait() {
  const ref = useRef(null);
  useEffect(() => {
    function onMove(e) {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      // photo moves WITH mouse for opposite-parallax vs wireframe
      ref.current.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return (
    <div className="hero-portrait" ref={ref}>
      <div className="portrait-frame">
        <svg viewBox="0 0 300 400" preserveAspectRatio="xMidYMid slice" className="portrait-svg">
          <defs>
            {/* Duotone: dark navy-violet shadow, cream highlight — applied over stylised figure */}
            <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1830"/>
              <stop offset="100%" stopColor="#0a0a0a"/>
            </linearGradient>
            <radialGradient id="face" cx="50%" cy="38%" r="55%">
              <stop offset="0%" stopColor="#EDE6DA"/>
              <stop offset="50%" stopColor="#7a6f5f"/>
              <stop offset="100%" stopColor="#15121f"/>
            </radialGradient>
            <radialGradient id="neck" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#4a4253"/>
              <stop offset="100%" stopColor="#120f1c"/>
            </radialGradient>
            <linearGradient id="shoulder" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2438"/>
              <stop offset="100%" stopColor="#0a0a0a"/>
            </linearGradient>
            <filter id="blur"><feGaussianBlur stdDeviation="0.8"/></filter>
          </defs>

          <rect width="300" height="400" fill="url(#bg)"/>
          {/* shoulders */}
          <path d="M0,400 L0,320 Q60,260 150,260 Q240,260 300,320 L300,400 Z" fill="url(#shoulder)"/>
          {/* neck */}
          <path d="M120,230 Q120,290 150,300 Q180,290 180,230 Z" fill="url(#neck)" filter="url(#blur)"/>
          {/* head */}
          <ellipse cx="150" cy="170" rx="62" ry="80" fill="url(#face)" filter="url(#blur)"/>
          {/* hair silhouette */}
          <path d="M88,155 Q90,95 150,80 Q215,92 214,165 Q214,140 200,128 Q180,104 150,100 Q118,104 100,130 Q88,144 88,155 Z" fill="#0f0d18" opacity="0.85"/>
          {/* jaw shadow */}
          <path d="M100,200 Q110,240 150,248 Q190,240 200,200" stroke="#0a0a0a" strokeWidth="1.5" fill="none" opacity="0.5"/>

          {/* placeholder stripe overlay */}
          <g opacity="0.06">
            {Array.from({length: 20}).map((_, i) => (
              <line key={i} x1={-50 + i*20} y1="-20" x2={-90 + i*20} y2="420" stroke="#EDE6DA" strokeWidth="1"/>
            ))}
          </g>
        </svg>

        {/* frame tags */}
        <div className="portrait-tag tl">FATAN_03.CR3</div>
        <div className="portrait-tag tr">◉ REC</div>
        <div className="portrait-tag bl">f/1.4 · 1/125</div>
        <div className="portrait-tag br">JKT · 2026</div>

        {/* crosshair */}
        <div className="portrait-crosshair"><span></span><span></span><span></span><span></span></div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" data-screen-label="01 Hero">
      <style>{`
        .hero {
          position: relative; min-height: 100svh; width: 100%;
          overflow: hidden; isolation: isolate;
          background: #0a0a0a;
          display: grid; grid-template-rows: auto 1fr auto;
        }

        /* Grid overlay */
        .hero::before {
          content: ''; position: absolute; inset: 0; z-index: 1; pointer-events: none;
          background-image:
            linear-gradient(to right, rgba(237,230,218,0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(237,230,218,0.035) 1px, transparent 1px);
          background-size: 96px 96px;
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, #000 40%, transparent 85%);
        }

        /* Corner frame */
        .hero-corners {
          position: absolute; inset: 24px; z-index: 2; pointer-events: none;
        }
        .hero-corners::before, .hero-corners::after,
        .hero-corners > span::before, .hero-corners > span::after {
          content: ''; position: absolute; width: 16px; height: 16px;
          border-color: rgba(237,230,218,0.35); border-style: solid; border-width: 0;
        }
        .hero-corners::before { top: 0; left: 0; border-top-width: 1px; border-left-width: 1px; }
        .hero-corners::after { top: 0; right: 0; border-top-width: 1px; border-right-width: 1px; }
        .hero-corners > span::before { bottom: 0; left: 0; border-bottom-width: 1px; border-left-width: 1px; }
        .hero-corners > span::after { bottom: 0; right: 0; border-bottom-width: 1px; border-right-width: 1px; }

        /* Wireframe layer */
        .hero-wire {
          position: absolute; inset: 0; z-index: 1; pointer-events: none;
        }
        @media (max-width: 820px) { .hero-wire { display: none; } }

        /* Top eyebrow */
        .hero-eyebrow {
          position: relative; z-index: 3;
          padding: 120px 40px 0;
          display: flex; justify-content: space-between; align-items: flex-start;
          font-family: var(--mono); font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
          color: var(--fg-dim);
        }
        .hero-eyebrow .r { text-align: right; line-height: 1.7; }
        .hero-eyebrow .num { color: var(--fg); margin-right: 10px; font-variant-numeric: tabular-nums; }
        .hero-eyebrow .dash { display: inline-block; width: 24px; height: 1px; background: var(--fg-dim); vertical-align: middle; margin-right: 10px; }

        /* Composition: name above / portrait center / name below */
        .hero-stage {
          position: relative; z-index: 2;
          display: grid; place-items: center;
          padding: 20px 40px;
          align-self: center;
        }
        .hero-stage .column {
          display: flex; flex-direction: column; align-items: center;
          gap: 8px;
        }

        .hero-name {
          font-family: var(--serif); font-weight: 400;
          font-size: clamp(96px, 17vw, 288px);
          line-height: 0.82; letter-spacing: -0.045em;
          color: var(--fg);
          text-align: center; display: block;
          white-space: nowrap;
          font-feature-settings: 'ss01';
        }
        .hero-name .punct { color: var(--accent); font-style: italic; }
        .hero-name em { font-style: italic; }

        /* Portrait */
        .hero-portrait {
          position: relative; z-index: 2;
          width: clamp(240px, 28vw, 380px);
          aspect-ratio: 3 / 4;
          transition: transform 0.6s cubic-bezier(.2,.8,.2,1);
          will-change: transform;
        }
        .portrait-frame {
          position: relative; width: 100%; height: 100%;
          border: 1px solid rgba(237,230,218,0.18);
          overflow: hidden;
          background: #0a0a0a;
        }
        .portrait-svg {
          width: 100%; height: 100%; display: block;
          filter: grayscale(0.25) contrast(1.05);
        }
        /* Bottom fade into background */
        .portrait-frame::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, transparent 55%, rgba(10,10,10,0.55) 85%, #0a0a0a 100%);
          pointer-events: none;
        }
        /* Accent tint */
        .portrait-frame::before {
          content: ''; position: absolute; inset: 0; z-index: 1;
          background: radial-gradient(circle at 60% 30%, var(--accent-dim), transparent 60%);
          mix-blend-mode: screen; pointer-events: none; opacity: .6;
        }
        .portrait-tag {
          position: absolute; z-index: 3;
          font-family: var(--mono); font-size: 9px; letter-spacing: .14em;
          color: var(--fg); background: rgba(10,10,10,0.6);
          padding: 4px 6px; border: 1px solid rgba(237,230,218,0.18);
        }
        .portrait-tag.tl { top: 10px; left: 10px; }
        .portrait-tag.tr { top: 10px; right: 10px; color: var(--accent); }
        .portrait-tag.bl { bottom: 10px; left: 10px; }
        .portrait-tag.br { bottom: 10px; right: 10px; }

        .portrait-crosshair { position: absolute; inset: 0; z-index: 2; pointer-events: none; }
        .portrait-crosshair span { position: absolute; background: rgba(237,230,218,0.4); }
        .portrait-crosshair span:nth-child(1) { top: 50%; left: 0; width: 12px; height: 1px; }
        .portrait-crosshair span:nth-child(2) { top: 50%; right: 0; width: 12px; height: 1px; }
        .portrait-crosshair span:nth-child(3) { left: 50%; top: 0; width: 1px; height: 12px; }
        .portrait-crosshair span:nth-child(4) { left: 50%; bottom: 0; width: 1px; height: 12px; }

        /* Name above + below */
        .name-top { position: relative; margin-bottom: -0.15em; }
        .name-bot { position: relative; margin-top: -0.18em; }

        /* Subtitle/tagline strip below composition */
        .hero-sub {
          position: relative; z-index: 3;
          display: flex; justify-content: center; margin-top: 12px;
          font-family: var(--mono); font-size: 11px; letter-spacing: .16em; text-transform: uppercase;
          color: var(--fg-dim);
        }
        .hero-sub .pill {
          padding: 6px 12px; border: 1px solid var(--line-strong); border-radius: 999px;
          display: inline-flex; align-items: center; gap: 10px;
        }
        .hero-sub .dot { width: 6px; height: 6px; border-radius: 50%; background: oklch(76% 0.18 140); box-shadow: 0 0 0 3px oklch(76% 0.18 140 / .2); }

        /* Bottom meta strip */
        .hero-bottom {
          position: relative; z-index: 3;
          padding: 28px 40px 40px;
          display: grid; grid-template-columns: 1fr auto 1fr;
          gap: 24px; align-items: end;
          border-top: 1px solid var(--line);
          margin: 0 40px;
        }
        .hero-bottom .location {
          font-family: var(--mono); font-size: 11px; letter-spacing: .1em; text-transform: uppercase;
          color: var(--fg-dim); display: flex; align-items: center; gap: 10px;
        }
        .hero-bottom .location svg { width: 14px; height: 14px; color: var(--fg); }
        .hero-bottom .tagline {
          font-family: var(--serif); font-style: italic;
          font-size: clamp(20px, 2vw, 28px); line-height: 1.25;
          color: var(--fg); text-align: center; max-width: 560px; justify-self: center;
        }
        .hero-bottom .tagline .accent { color: var(--accent); }
        .hero-bottom .scroll {
          font-family: var(--mono); font-size: 10px; letter-spacing: .16em; text-transform: uppercase;
          color: var(--fg-dim); display: flex; flex-direction: column; align-items: flex-end; gap: 12px;
          justify-self: end;
        }
        .hero-bottom .scroll .bar {
          position: relative; width: 1px; height: 42px; background: var(--line-strong); overflow: hidden;
        }
        .hero-bottom .scroll .bar::after {
          content: ''; position: absolute; left: 0; top: -60%; width: 1px; height: 60%;
          background: var(--fg); animation: scrolltick 2.2s cubic-bezier(.7,0,.3,1) infinite;
        }
        @keyframes scrolltick { 0% { top: -60% } 100% { top: 100% } }

        /* Entry animation */
        .hero-name.name-top > span { animation: riseIn 1.2s .2s cubic-bezier(.2,.8,.2,1) both; }
        .hero-name.name-bot > span { animation: riseIn 1.2s .45s cubic-bezier(.2,.8,.2,1) both; }
        .hero-portrait { animation: fadeUp 1.2s .3s cubic-bezier(.2,.8,.2,1) both; }
        @keyframes riseIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: none; } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: none; } }

        @media (max-width: 820px) {
          .hero-eyebrow { padding: 72px 20px 0; font-size: 10px; }
          .hero-eyebrow .r { max-width: 160px; }
          .hero-stage { padding: 16px 20px; }
          .hero-name { font-size: 68px; letter-spacing: -0.04em; }
          .hero-portrait { width: 64vw; }
          .hero-bottom { grid-template-columns: 1fr; gap: 16px; padding: 20px; margin: 0 20px; text-align: left; }
          .hero-bottom .tagline { justify-self: flex-start; text-align: left; font-size: 18px; }
          .hero-bottom .scroll { justify-self: flex-start; flex-direction: row; align-items: center; }
          .hero-corners { inset: 12px; }
        }
      `}</style>

      <div className="hero-corners"><span></span></div>
      <Wireframe />

      <div className="hero-eyebrow">
        <div><span className="num">◉ 01</span>Portfolio / MMXXVI</div>
        <div className="r"><span className="dash"></span>Available Q2 2026<br/>Select collaborations only</div>
      </div>

      <div className="hero-stage">
        <div className="column">
          <span className="hero-name name-top"><span>FATAN</span></span>
          <Portrait />
          <span className="hero-name name-bot"><span>AMINULLAH<span className="punct">.</span></span></span>
          <div className="hero-sub">
            <span className="pill"><span className="dot"></span> Senior Software Developer · Jakarta</span>
          </div>
        </div>
      </div>

      <div className="hero-bottom">
        <div className="location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/></svg>
          Based in Jakarta, Indonesia · 6.2° S
        </div>
        <div className="tagline">
          Building <span className="accent">high-performance</span><br/>digital experiences.
        </div>
        <div className="scroll">
          Scroll to explore
          <span className="bar"></span>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
