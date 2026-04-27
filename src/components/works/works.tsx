"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { WORKS_V2 } from "./data";
import { Motif } from "./motif";
import styles from "./works.module.css";

const total = WORKS_V2.length;

export function Works() {
  const [active, setActive] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  const step = useCallback((dir: number) => {
    setActive((a) => Math.max(0, Math.min(total - 1, a + dir)));
  }, []);

  useEffect(() => {
    function onScroll() {
      if (!containerRef.current) return;
      const totalH = containerRef.current.offsetHeight - window.innerHeight;
      if (totalH <= 0) return;
      const r = containerRef.current.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, -r.top / totalH));
      const idx = Math.min(total - 1, Math.floor(p * total));
      setActive((cur) => (cur === idx ? cur : idx));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!containerRef.current) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        const dir = e.key === "ArrowRight" ? 1 : -1;
        const nextIdx = Math.max(0, Math.min(total - 1, active + dir));
        const r = containerRef.current.getBoundingClientRect();
        const top = window.scrollY + r.top;
        const totalH = containerRef.current.offsetHeight - window.innerHeight;
        const targetY = top + (nextIdx + 0.5) * (totalH / total);
        window.scrollTo({ top: targetY, behavior: "smooth" });
        e.preventDefault();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);

  const w = WORKS_V2[active];

  const sectionStyle: CSSProperties = {
    height: `${total * 100}vh`,
  };

  return (
    <section
      id="work"
      data-screen-label="04 Work"
      className={styles.works}
      ref={containerRef}
      style={sectionStyle}
    >
      <div className={styles.pin}>
        <div className={styles.head}>
          <div>
            <div className={styles.label}>
              <span>(Selected Works)</span> / 04
            </div>
            <h2 className={`reveal-line ${styles.title}`}>
              <span>
                The <em>archive</em>.
              </span>
            </h2>
          </div>
          <div className={`${styles.caption} reveal-fade`}>
            Six index cards
            <br />
            2022 — 2025
            <br />
            Click a tab or arrow
          </div>
        </div>

        <div className={styles.tabs}>
          {WORKS_V2.map((p, i) => (
            <button
              key={p.n}
              type="button"
              className={`${styles.tab} ${i === active ? styles.tabActive : ""}`}
              onClick={() => setActive(i)}
              data-cursor="link"
            >
              <span className={styles.tabNum}>
                {p.n} · {p.year}
              </span>
              <span className={styles.tabNm}>{p.name}</span>
            </button>
          ))}
        </div>

        <div className={styles.deckStage}>
          <div className={styles.deck}>
            {WORKS_V2.map((p, i) => {
              const offset = (i - active + total) % total;
              const isActive = offset === 0;
              const fanIdx = offset;
              const ang =
                (fanIdx % 2 === 0 ? -1 : 1) * Math.min(fanIdx * 0.8, 3);
              const ty = -fanIdx * 5;
              const tz = -fanIdx * 30;
              const tx =
                (fanIdx % 2 === 0 ? -1 : 1) * Math.min(fanIdx * 6, 22);
              const opacity = Math.max(0, 0.55 - fanIdx * 0.08);
              const state = isActive
                ? "active"
                : fanIdx > 4
                  ? "hidden"
                  : "behind";
              const transform = isActive
                ? "translate3d(0,0,0) rotate(0deg)"
                : `translate3d(${tx}px, ${ty}px, ${tz}px) rotate(${ang}deg)`;
              const cardStyle = {
                "--card-tint": p.tint,
                transform,
                opacity,
                zIndex: 50 - fanIdx,
              } as CSSProperties;

              return (
                <article
                  key={p.n}
                  className={styles.card}
                  data-state={state}
                  style={cardStyle}
                  onClick={() => {
                    if (!isActive) setActive(i);
                  }}
                  data-cursor="link"
                >
                  <span className={styles.corner}>
                    FILE No. {p.n} / 06
                  </span>
                  <div className={styles.left}>
                    <div>
                      <div className={styles.headRow}>
                        <span className={styles.headRowN}>◉ {p.n}</span>
                        <span>·</span>
                        <span>{p.year}</span>
                      </div>
                      <div className={styles.name}>{p.name}</div>
                      <div className={styles.cat}>{p.cat}</div>
                    </div>
                    <div className={styles.footer}>
                      <div className={styles.url}>{p.url}</div>
                      <div className={styles.chips}>
                        {p.tech.map((t) => (
                          <span key={t}>{t}</span>
                        ))}
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
                    <div className={styles.row}>
                      <div className={styles.rowK}>Problem</div>
                      <div className={styles.rowV}>{p.problem}</div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.rowK}>Role</div>
                      <div className={styles.rowV}>{p.role}</div>
                    </div>
                    <div className={styles.row}>
                      <div className={styles.rowK}>Outcome</div>
                      <div className={styles.rowV}>{p.outcome}</div>
                    </div>
                  </div>
                  <span className={styles.stamp}>Shipped {p.year}</span>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.deckControls}>
          <div className={styles.progress}>
            <span>
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>
            <div
              className={styles.bar}
              style={
                {
                  "--p": `${((active + 1) / total) * 100}%`,
                } as CSSProperties
              }
            />
            <span>{w.name}</span>
          </div>
          <div className={styles.arrows}>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => step(-1)}
              data-cursor="link"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              type="button"
              className={styles.arrowBtn}
              onClick={() => step(1)}
              data-cursor="link"
              aria-label="Next"
            >
              →
            </button>
          </div>
          <a
            className={styles.visit}
            href={`https://${w.url}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="link"
          >
            Visit {w.name} <span>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
