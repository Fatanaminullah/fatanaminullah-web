"use client";

import { useEffect, useRef } from "react";
import { observeReveals } from "@/hooks/use-reveal";
import { EXPERIENCE } from "./data";
import styles from "./experience.module.css";

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const drawRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const start = window.innerHeight * 0.75;
      const end = -r.height + window.innerHeight * 0.25;
      const p = Math.max(0, Math.min(1, (start - r.top) / (start - end)));
      if (drawRef.current) drawRef.current.style.height = `${p * 100}%`;
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const mark = (i + 1) / (EXPERIENCE.length + 0.2);
        el.classList.toggle(styles.entryDone, p >= mark - 0.2);
        el.classList.toggle(
          styles.entryActive,
          p >= mark - 0.2 && p < mark + 0.15,
        );
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    setTimeout(() => ref.current && observeReveals(ref.current), 50);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="experience"
      ref={ref}
      data-screen-label="05 Experience"
      className={styles.experience}
    >
      <div className={styles.head}>
        <div>
          <div className={styles.label}>
            <span>(Experience)</span> / 05
          </div>
          <h2 className={`reveal-line ${styles.title}`}>
            <span>
              Track <em>record</em>.
            </span>
          </h2>
        </div>
        <div className={`${styles.caption} reveal-fade`}>
          Three companies, one city, six years — the people and briefs that
          shaped how I work.
        </div>
      </div>

      <div className={styles.timeline}>
        <div className={styles.spine} />
        <div className={styles.draw} ref={drawRef} />
        {EXPERIENCE.map((e, i) => (
          <div
            key={e.co}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            className={`${styles.entry} reveal-fade`}
            data-delay={i * 0.08}
          >
            <div className={styles.left}>
              <div className={styles.co}>{e.co}</div>
              <div className={styles.role}>{e.role}</div>
              <div className={styles.range}>{e.range}</div>
              <div className={styles.where}>{e.where}</div>
            </div>
            <ul className={styles.list}>
              {e.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
