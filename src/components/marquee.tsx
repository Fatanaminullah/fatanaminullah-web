"use client";

import styles from "./marquee.module.css";

const TECH_A = ["Next.js", "React.js", "Vue.js", "TypeScript", "TailwindCSS", "GSAP", "Three.js"];
const TECH_B = ["Framer Motion", "React Native", "Node.js", "Express.js", "Web3", "Lenis", "Socket.io"];

export default function Marquee() {
  return (
    <section id="stack" className={styles.marquee}>
      <div className={styles.eye}>
        <span>Tools of the trade</span>
      </div>

      <div className={`${styles.row} ${styles.rowA}`}>
        {[...TECH_A, ...TECH_A, ...TECH_A].map((t, i) => (
          <span className={`${styles.item} ${i % 2 ? styles.itemAlt : ""}`} key={`a${i}`}>
            {t}
            <span className={styles.sep} />
          </span>
        ))}
      </div>

      <div className={`${styles.row} ${styles.rowB}`}>
        {[...TECH_B, ...TECH_B, ...TECH_B].map((t, i) => (
          <span className={`${styles.item} ${i % 2 ? styles.itemAlt : ""}`} key={`b${i}`}>
            {t}
            <span className={styles.sep} />
          </span>
        ))}
      </div>
    </section>
  );
}
