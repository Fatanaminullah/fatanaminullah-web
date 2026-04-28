"use client";

import { useEffect, useState } from "react";
import styles from "./nav.module.css";

const SCROLL_THRESHOLD_PX = 32;

export default function Nav() {
  const [time, setTime] = useState("--:--");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_THRESHOLD_PX);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function tick() {
      const now = new Date();
      const jkt = new Date(
        now.getTime() + (now.getTimezoneOffset() + 7 * 60) * 60000
      );
      const hh = String(jkt.getHours()).padStart(2, "0");
      const mm = String(jkt.getMinutes()).padStart(2, "0");
      setTime(`${hh}:${mm}`);
    }
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.navSolid : ""}`}>
      <div className={styles.brand}>
        <span className={styles.mark} />
        Fatan Aminullah &mdash; Jakarta
      </div>
      <div className={styles.links}>
        <a href="#work" data-cursor="link">Work</a>
        <a href="#about" data-cursor="link">About</a>
        <a href="#experience" data-cursor="link">Experience</a>
        <a href="#contact" data-cursor="link">Contact</a>
      </div>
      <div className={styles.clock}>
        <span className={styles.pip} />
        JKT &middot; {time}
      </div>
    </nav>
  );
}
