"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./works.module.css";

const WORKS = [
  {
    n: "01", name: "Pocari Sweat", cat: "Company Profile", url: "pocarisweat.id",
    tech: ["Next.js", "TailwindCSS", "GSAP", "Three.js", "Matter.js"],
    year: "2024", tint: "#C9B68E",
    problem: "Legacy WordPress with CLS >0.4. Rebuilt as Next.js with physics-driven hero interactions.",
    role: "Frontend lead · 2 devs",
    outcome: "LCP 3.8s → 1.1s · bounce −34% · first internal site using real-time physics.",
    motif: "bottle",
  },
  {
    n: "02", name: "Bodypack", cat: "E-Commerce", url: "bodypack.com",
    tech: ["Next.js", "Bootstrap", "GSAP", "SASS"],
    year: "2023", tint: "#A98870",
    problem: "Migration from legacy Magento to a headless Next.js storefront with a GSAP-driven product showcase.",
    role: "Senior frontend dev",
    outcome: "Checkout conversion +18% · mobile PDP load halved.",
    motif: "grid",
  },
  {
    n: "03", name: "Cinema XXI", cat: "Company Profile", url: "cinema21.co.id",
    tech: ["Next.js", "Bootstrap", "SASS", "Framer Motion"],
    year: "2023", tint: "#B88464",
    problem: "Corporate revamp with a cinema-grade motion language across 40+ pages and 7 localised brands.",
    role: "Frontend dev",
    outcome: "Design system tokenised across 40+ templates · 99/100 Lighthouse a11y.",
    motif: "film",
  },
  {
    n: "04", name: "Desa Kitsune", cat: "Marketing Site", url: "desakitsune.com",
    tech: ["Next.js", "TailwindCSS", "GSAP", "Lenis"],
    year: "2024", tint: "#8E9378",
    problem: "Launch site for a villa resort; scroll narrative built on Lenis + ScrollTrigger with pinned chapters.",
    role: "Frontend lead",
    outcome: "Launched on time · nominated in Awwwards Sites of the Day.",
    motif: "mountain",
  },
  {
    n: "05", name: "Peruri", cat: "Company Profile", url: "peruri.co.id",
    tech: ["Next.js", "TailwindCSS", "GSAP", "Lenis"],
    year: "2025", tint: "#8C7556",
    problem: "Indonesia's national security printing company; corporate refresh that reads institutional but not sleepy.",
    role: "Frontend lead",
    outcome: "12-page relaunch in 6 weeks · CMS-driven · runs without ops intervention.",
    motif: "crest",
  },
  {
    n: "06", name: "Eatlah Club", cat: "Loyalty App", url: "club.eatlahjkt.com",
    tech: ["Next.js", "Bootstrap", "Socket.io"],
    year: "2022", tint: "#C07A58",
    problem: "Realtime loyalty system with live stamp redemption via Socket.io — POS events push to user phones.",
    role: "Fullstack dev",
    outcome: "40k+ stamps processed in first quarter · near-zero redemption latency.",
    motif: "stamps",
  },
];

function Motif({ kind }: { kind: string }) {
  const stroke = "currentColor";
  switch (kind) {
    case "bottle":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M42 14 h16 v8 c0 2 4 4 4 8 v50 c0 6 -4 10 -10 10 h-4 c-6 0 -10 -4 -10 -10 v-50 c0 -4 4 -6 4 -8 z" />
          <circle cx="50" cy="62" r="3" /><circle cx="44" cy="55" r="2" />
          <circle cx="56" cy="68" r="2.5" /><circle cx="48" cy="72" r="1.6" />
          <line x1="38" y1="42" x2="62" y2="42" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          {[...Array(5)].map((_, c) => [...Array(7)].map((_, r) => (
            <rect key={`${c}-${r}`} x={14 + c * 15} y={10 + r * 11} width="11" height="8" />
          )))}
          <rect x="14" y="10" width="26" height="19" fill="currentColor" opacity="0.15" />
        </svg>
      );
    case "film":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <rect x="14" y="22" width="72" height="56" />
          {[20, 40, 60, 80].map((x, i) => (
            <g key={i}><rect x={x - 4} y="25" width="8" height="3" /><rect x={x - 4} y="72" width="8" height="3" /></g>
          ))}
          <rect x="22" y="32" width="56" height="36" strokeDasharray="2 1" />
          <circle cx="50" cy="50" r="8" />
          <path d="M47 46 l8 4 l-8 4 z" fill="currentColor" />
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M8 78 L28 48 L40 60 L58 32 L78 56 L92 78 Z" />
          <path d="M28 48 L40 60 L58 32" fill="currentColor" opacity="0.15" />
          <circle cx="76" cy="22" r="8" />
          <line x1="8" y1="84" x2="92" y2="84" />
          <line x1="8" y1="88" x2="92" y2="88" strokeDasharray="1 2" />
        </svg>
      );
    case "crest":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M50 12 L78 24 V56 C78 70 66 82 50 88 C34 82 22 70 22 56 V24 Z" />
          <path d="M50 22 L70 30 V56 C70 66 62 76 50 80 C38 76 30 66 30 56 V30 Z" />
          <line x1="50" y1="34" x2="50" y2="68" /><line x1="38" y1="50" x2="62" y2="50" />
          <circle cx="50" cy="50" r="5" />
        </svg>
      );
    case "stamps":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => (
            <circle key={`${r}-${c}`} cx={20 + c * 20} cy={28 + r * 22} r="6" strokeDasharray="1 1" />
          )))}
          {[0, 1, 2, 3].map((c) => <circle key={`f${c}`} cx={20 + c * 20} cy={28} r="3" fill="currentColor" />)}
          {[0, 1].map((c) => <circle key={`s${c}`} cx={20 + c * 20} cy={50} r="3" fill="currentColor" />)}
        </svg>
      );
    default:
      return null;
  }
}

function CardContent({ p }: { p: (typeof WORKS)[0] }) {
  return (
    <>
      <span className={styles.tabLabel}>{p.cat} &middot; {p.year}</span>
      <span className={styles.punch} />
      <div className={styles.filedStripe}>
        <span>FILE No. {p.n} / 06 &middot; ARCHIVE 2026</span>
        <span className={styles.barcode}>
          {[2, 1, 3, 1, 2, 1, 1, 2, 3, 1, 2].map((bw, k) => (
            <i key={k} style={{ width: bw + "px" }} />
          ))}
        </span>
      </div>
      <span className={styles.corner}>REF &middot; {p.url}</span>
      <div className={styles.left}>
        <div>
          <div className={styles.headRow}>
            <span className={styles.headN}>&#9673; {p.n}</span>
            <span>&middot;</span>
            <span>{p.year}</span>
          </div>
          <div className={styles.name}>{p.name}</div>
          <div className={styles.cat}>{p.cat}</div>
        </div>
        <div className={styles.footer}>
          <div className={styles.url}>{p.url}</div>
          <div className={styles.chips}>
            {p.tech.map((t) => <span key={t}>{t}</span>)}
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.motif}>
          <span className={`${styles.reg} ${styles.regTl}`}>+</span>
          <span className={`${styles.reg} ${styles.regTr}`}>+</span>
          <span className={`${styles.reg} ${styles.regBr}`}>+</span>
          <Motif kind={p.motif} />
        </div>
        <div className={styles.row}><div className={styles.rowK}>Problem</div><div className={styles.rowV}>{p.problem}</div></div>
        <div className={styles.row}><div className={styles.rowK}>Role</div><div className={styles.rowV}>{p.role}</div></div>
        <div className={styles.row}><div className={styles.rowK}>Outcome</div><div className={styles.rowV}>{p.outcome}</div></div>
      </div>
      <span className={styles.stamp}>Shipped {p.year}</span>
    </>
  );
}

export default function Works() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [drag, setDrag] = useState(0);
  const total = WORKS.length;
  const containerRef = useRef<HTMLElement>(null);
  const peekRef = useRef<HTMLDivElement>(null);
  const dragState = useRef({ active: false, startX: 0, startY: 0, dx: 0, locked: null as string | null });

  const step = useCallback(
    (dir: number) => setActive((a) => Math.max(0, Math.min(total - 1, a + dir))),
    [total],
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (open) {
        if (e.key === "ArrowLeft") { step(-1); e.preventDefault(); }
        if (e.key === "ArrowRight") { step(1); e.preventDefault(); }
        if (e.key === "Escape") { setOpen(false); e.preventDefault(); }
      } else {
        if (!containerRef.current) return;
        const r = containerRef.current.getBoundingClientRect();
        if (r.bottom < 0 || r.top > window.innerHeight) return;
        if (e.key === "ArrowLeft") { step(-1); e.preventDefault(); }
        if (e.key === "ArrowRight") { step(1); e.preventDefault(); }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  });

  useEffect(() => {
    if (!isMobile) return;
    const el = peekRef.current;
    if (!el) return;
    function onStart(e: TouchEvent) {
      const t = e.touches[0];
      dragState.current = { active: true, startX: t.clientX, startY: t.clientY, dx: 0, locked: null };
    }
    function onMove(e: TouchEvent) {
      if (!dragState.current.active) return;
      const t = e.touches[0];
      const dx = t.clientX - dragState.current.startX;
      const dy = t.clientY - dragState.current.startY;
      if (dragState.current.locked === null) {
        if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
          dragState.current.locked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
        }
      }
      if (dragState.current.locked === "x") {
        if (e.cancelable) e.preventDefault();
        dragState.current.dx = dx;
        const w = el!.offsetWidth || 320;
        setDrag(Math.max(-1.2, Math.min(1.2, dx / w)));
      }
    }
    function onEnd() {
      if (!dragState.current.active) return;
      const wasLockedX = dragState.current.locked === "x";
      const dx = dragState.current.dx;
      dragState.current = { active: false, startX: 0, startY: 0, dx: 0, locked: null };
      if (wasLockedX) {
        const w = el!.offsetWidth || 320;
        const ratio = dx / w;
        if (ratio < -0.18) step(1);
        else if (ratio > 0.18) step(-1);
      }
      setDrag(0);
    }
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd);
    el.addEventListener("touchcancel", onEnd);
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [isMobile, total]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const w = WORKS[active];

  return (
    <section id="work" className={styles.works} ref={containerRef}>
      <div className={styles.pin}>
        <div className={styles.head}>
          <div>
            <div className={styles.sectionLabel}><span>(Selected Works)</span> / 04</div>
            <h2 className="reveal-line"><span>The <em>archive</em>.</span></h2>
          </div>
          <div className={`${styles.caption} reveal-fade`}>
            Six index cards<br />
            2022 &mdash; 2025<br />
            Click a card to open
          </div>
        </div>

        {/* ── Folder with peeking cards ── */}
        <div className={styles.folder}>

          {/* Cards peeking out of the folder */}
          <div className={styles.peekStage}>
            <button
              className={styles.peekZone}
              onClick={() => step(-1)}
              disabled={active === 0}
              aria-label="Previous project"
              data-cursor="prev"
            />
            <button
              className={`${styles.peekZone} ${styles.peekZoneR}`}
              onClick={() => step(1)}
              disabled={active === total - 1}
              aria-label="Next project"
              data-cursor="next"
            />
            <div className={styles.peek} ref={peekRef}>
              {WORKS.map((p, i) => {
                const offset = (i - active + total) % total;
                const isActive = offset === 0;
                const fanIdx = offset;
                const ang = (fanIdx % 2 === 0 ? -1 : 1) * Math.min(fanIdx * 0.6, 2.5);
                const ty = -fanIdx * 5;
                const tx = (fanIdx % 2 === 0 ? -1 : 1) * Math.min(fanIdx * 4, 16);
                const opacity = Math.max(0, 0.5 - fanIdx * 0.08);
                const state = isActive ? "active" : fanIdx > 4 ? "hidden" : "behind";
                const dragPx = isMobile && isActive ? drag * 90 : 0;
                const dragRot = isMobile && isActive ? drag * 6 : 0;
                const transform = isActive
                  ? `translate3d(${dragPx}px, 0, 0) rotate(${dragRot}deg)`
                  : `translate3d(${tx}px, ${ty}px, 0) rotate(${ang}deg)`;

                return (
                  <article
                    key={p.n}
                    className={styles.card}
                    data-state={state}
                    style={{
                      "--card-tint": p.tint,
                      transform,
                      opacity: isActive ? 1 - Math.abs(drag) * 0.2 : opacity,
                      zIndex: 50 - fanIdx,
                      transition: dragState.current.active ? "none" : undefined,
                    } as React.CSSProperties}
                    onClick={() => (isActive ? setOpen(true) : setActive(i))}
                    data-cursor="link"
                  >
                    <CardContent p={p} />
                  </article>
                );
              })}
            </div>
          </div>

          {/* Folder body — covers card bottoms */}
          <div className={styles.folderBody}>
            <span className={styles.folderTabBump} aria-hidden />
            <div className={styles.folderInner}>
              <div className={styles.folderPaper}>
                <div className={styles.tabs}>
                  {WORKS.map((p, i) => (
                    <button
                      key={p.n}
                      type="button"
                      className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
                      onClick={() => { setActive(i); setOpen(true); }}
                      data-cursor="link"
                    >
                      <span className={styles.tabNum}>{p.n} &middot; {p.year}</span>
                      <span className={styles.tabNm}>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className={styles.folderMeta}>
                <span>6 project files &middot; 2022–2025</span>
              </div>
            </div>
            <span className={styles.folderFlap} aria-hidden />
          </div>
        </div>

        {/* ── Controls ── */}
        <div className={styles.controls}>
          <div className={styles.progress}>
            <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
            <div className={styles.bar} style={{ "--p": `${((active + 1) / total) * 100}%` } as React.CSSProperties} />
            <span>{w.name}</span>
          </div>
          <div className={styles.arrows}>
            <button onClick={() => step(-1)} disabled={active === 0} data-cursor="link" aria-label="Previous">&larr;</button>
            <button onClick={() => step(1)} disabled={active === total - 1} data-cursor="link" aria-label="Next">&rarr;</button>
          </div>
          <a className={styles.visitLink} href={`https://${w.url}`} target="_blank" rel="noopener" data-cursor="link">
            Visit {w.name} <span>&nearr;</span>
          </a>
        </div>

        <div className={styles.swipeHint}>
          <span>&larr;</span> Swipe to browse <span>&rarr;</span>
        </div>

        {/* ── Dialog overlay ── */}
        <div
          className={`${styles.overlay} ${open ? styles.overlayOpen : ""}`}
          onClick={() => setOpen(false)}
          aria-hidden={!open}
        >
          <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
            <div className={styles.dlgBar}>
              <div className={styles.dlgNav}>
                <button onClick={() => step(-1)} disabled={active === 0} data-cursor="link" aria-label="Previous">&larr;</button>
                <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
                <button onClick={() => step(1)} disabled={active === total - 1} data-cursor="link" aria-label="Next">&rarr;</button>
              </div>
              <button className={styles.dlgClose} onClick={() => setOpen(false)} data-cursor="link" aria-label="Close">&times;</button>
            </div>

            <article
              key={w.n}
              className={styles.dlgCard}
              style={{ "--card-tint": w.tint } as React.CSSProperties}
            >
              <CardContent p={w} />
            </article>

            <div className={styles.dlgFoot}>
              <div className={styles.dlgProgress}>
                <span>{w.name}</span>
                <div className={styles.dlgProgressBar} style={{ "--p": `${((active + 1) / total) * 100}%` } as React.CSSProperties} />
              </div>
              <a className={styles.dlgVisit} href={`https://${w.url}`} target="_blank" rel="noopener" data-cursor="link">
                Visit {w.name} <span>&nearr;</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
