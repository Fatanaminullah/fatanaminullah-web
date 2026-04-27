"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import ShuffleSubtitle from "@/components/shuffle-subtitle";
import styles from "./hero.module.css";

export default function Hero() {
  const sunRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!sunRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * -18;
      const y = (e.clientY / window.innerHeight - 0.5) * -12;
      sunRef.current.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    function onMove(e: MouseEvent) {
      if (!photoRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      photoRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      heroRef.current
        ?.querySelectorAll(".reveal-line, .reveal-word, .reveal-fade")
        .forEach((el) => {
          const d = parseFloat((el as HTMLElement).dataset.delay || "0");
          setTimeout(() => el.classList.add("in"), 200 + d * 1000);
        });
    });
  }, []);

  return (
    <section id="top" ref={heroRef} className={styles.hero}>
      <div className={styles.sunWrap} ref={sunRef}>
        <div className={styles.coordTl}>N &middot; 06&deg;10&prime;S</div>
        <div className={styles.coordBr}>S &middot; 106&deg;50&prime;E</div>
        <div className={styles.coordL}>Jakarta</div>
        <div className={styles.coordR}>2026</div>
        <div className={`${styles.ring} ${styles.r3}`} />
        <div className={`${styles.ring} ${styles.r2}`} />
        <div className={styles.ring} />
        <div className={styles.meridian} />
        <div className={styles.disc} />
        <div className={styles.ticks}>
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className={`${styles.tick} ${i % 6 === 0 ? styles.tickLg : ""}`}
              style={{
                transform: `translateX(-50%) rotate(${i * 15}deg)`,
                transformOrigin: "50% 50vmin",
              }}
            />
          ))}
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.portraitWrap} ref={photoRef}>
          <div className={styles.portrait}>
            <Image
              src="/profile.png"
              alt="Fatan Aminullah"
              width={360}
              height={552}
              priority
              className={styles.portraitImg}
            />
            <div className={styles.label}>
              Fig. 01 &mdash; Jakarta &middot; 2026
            </div>
          </div>
        </div>

        <div className={styles.nameblock}>
          <h1 className="reveal-line" data-delay="0.05">
            <span>
              Fatan <em>Aminullah</em>
            </span>
          </h1>
          <div className={`${styles.subtitleWrap} reveal-fade`} data-delay="0.6">
            <ShuffleSubtitle />
          </div>
          <div className={`${styles.tagline} reveal-fade`} data-delay="0.75">
            crafting high-performance digital experiences from Jakarta.
          </div>
        </div>
      </div>

      <div className={styles.heroFoot}>
        <div
          className={`${styles.meta} ${styles.metaBl} reveal-fade`}
          data-delay="0.9"
        >
          <span className={styles.globe} />
          Jakarta, Indonesia &middot; 6&deg;S
        </div>
        <div className={`${styles.scroll} reveal-fade`} data-delay="1">
          <span>Scroll</span>
          <span className={styles.scrollLine} />
        </div>
        <div
          className={`${styles.meta} ${styles.metaBr} reveal-fade`}
          data-delay="0.9"
          title="Open for new roles or projects starting Q2 (Apr–Jun) 2026"
        >
          <span className={styles.dot} />
          Available Q2 &rsquo;26
        </div>
      </div>
    </section>
  );
}
