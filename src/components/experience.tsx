"use client";

import { useEffect, useRef } from "react";
import styles from "./experience.module.css";

const EXP = [
  {
    co: "Antikode",
    role: "Senior Frontend Developer",
    range: "Aug 2021 — Present",
    where: "Jakarta, ID",
    bullets: [
      "Lead frontend across 12+ corporate + e-commerce builds with measurable performance wins.",
      "Mentor four developers on motion, performance budgets, and systems thinking.",
      "Established the studio\u2019s in-house motion + scroll-narrative vocabulary (GSAP/Lenis/R3F).",
    ],
  },
  {
    co: "Emporia Digital",
    role: "Frontend Developer",
    range: "Aug 2020 — Aug 2021",
    where: "Jakarta, ID",
    bullets: [
      "Shipped marketing sites and editorial platforms for regional media clients.",
      "Owned component library migration from jQuery to React across four products.",
    ],
  },
  {
    co: "Anabatic Technologies",
    role: "Frontend Developer",
    range: "Jul 2019 — Aug 2020",
    where: "Jakarta, ID",
    bullets: [
      "Delivered internal banking and telco dashboards with strict accessibility gates.",
      "First exposure to large design systems — tokens, theming, multi-brand theming.",
    ],
  },
];

export default function Experience() {
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
      if (drawRef.current) drawRef.current.style.height = p * 100 + "%";
      nodeRefs.current.forEach((el, i) => {
        if (!el) return;
        const mark = (i + 1) / (EXP.length + 0.2);
        el.classList.toggle(styles.done, p >= mark - 0.2);
        el.classList.toggle(styles.active, p >= mark - 0.2 && p < mark + 0.15);
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="experience" ref={ref} className={styles.experience}>
      <div className={styles.head}>
        <div>
          <div className={styles.label}>
            <span>(Experience)</span> / 05
          </div>
          <h2 className="reveal-line">
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
        {EXP.map((e, i) => (
          <div
            key={e.co}
            ref={(el) => { nodeRefs.current[i] = el; }}
            className={`${styles.entry} reveal-fade`}
            data-delay={String(i * 0.08)}
          >
            <div className={styles.entryLeft}>
              <div className={styles.co}>{e.co}</div>
              <div className={styles.role}>{e.role}</div>
              <div className={styles.range}>{e.range}</div>
              <div className={styles.where}>{e.where}</div>
            </div>
            <ul>
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
