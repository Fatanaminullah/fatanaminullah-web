"use client";

import { useJktClock } from "@/hooks/use-jkt-clock";
import styles from "./nav.module.css";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const time = useJktClock();

  return (
    <nav className={styles.nav}>
      <div className={styles.brand}>
        <span className={styles.mark} />
        Fatan Aminullah — Jakarta
      </div>
      <div className={styles.links}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} data-cursor="link">
            {l.label}
          </a>
        ))}
      </div>
      <div className={styles.clock}>
        <span className={styles.pip} />
        JKT · {time}
      </div>
    </nav>
  );
}
