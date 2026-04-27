"use client";

import styles from "./marquee.module.css";

const TECH_A = [
  "Next.js",
  "React.js",
  "Vue.js",
  "TypeScript",
  "TailwindCSS",
  "GSAP",
  "Three.js",
];
const TECH_B = [
  "Framer Motion",
  "React Native",
  "Node.js",
  "Express.js",
  "Web3",
  "Lenis",
  "Socket.io",
];

export function Marquee() {
  const tripleA = [...TECH_A, ...TECH_A, ...TECH_A];
  const tripleB = [...TECH_B, ...TECH_B, ...TECH_B];

  return (
    <section id="stack" data-screen-label="03 Stack" className={styles.marquee}>
      <div className={styles.eye}>
        <span>Tools of the trade</span>
      </div>

      <div className={`${styles.row} ${styles.rowA}`}>
        {tripleA.map((t, i) => (
          <span
            key={`a-${i}-${t}`}
            className={`${styles.item} ${i % 2 ? styles.itemAlt : ""}`}
          >
            {t}
            <span className={styles.sep} />
          </span>
        ))}
      </div>

      <div className={`${styles.row} ${styles.rowB}`}>
        {tripleB.map((t, i) => (
          <span
            key={`b-${i}-${t}`}
            className={`${styles.item} ${i % 2 ? styles.itemAlt : ""}`}
          >
            {t}
            <span className={styles.sep} />
          </span>
        ))}
      </div>
    </section>
  );
}
