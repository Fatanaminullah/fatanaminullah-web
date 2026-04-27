"use client";

import { useAskFatan } from "@/components/ask-fatan/ask-fatan-context";
import styles from "./contact.module.css";

const LINKS = [
  {
    k: "Email",
    v: "fatan.aminullah.j@gmail.com",
    href: "mailto:fatan.aminullah.j@gmail.com",
  },
  {
    k: "LinkedIn",
    v: "/in/fatanaminullah",
    href: "https://linkedin.com/in/fatanaminullah",
  },
  {
    k: "GitHub",
    v: "@fatanaminullah",
    href: "https://github.com/fatanaminullah",
  },
  { k: "Read.cv", v: "fatan", href: "https://read.cv/fatan" },
];

export function Contact() {
  const { open } = useAskFatan();

  return (
    <section id="contact" data-screen-label="06 Contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span>(Let&apos;s talk)</span> / 06
        </div>

        <h2 className={`reveal-line ${styles.title}`}>
          <span>
            Let&apos;s build something <em>together</em>.
          </span>
        </h2>

        <div className={`${styles.ctaRow} reveal-fade`}>
          <a
            className={styles.ctaPrimary}
            href="mailto:fatan.aminullah.j@gmail.com"
            data-cursor="link"
          >
            Start a project
            <span className={styles.arrow}>→</span>
          </a>
          <button
            type="button"
            className={styles.ctaSecondary}
            data-cursor="link"
            onClick={() => open()}
          >
            Ask Fatan
            <span className={`${styles.arrow} ${styles.arrowDark}`}>?</span>
          </button>
        </div>

        <div className={styles.row}>
          {LINKS.map((l) => (
            <a
              key={l.k}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
            >
              {l.k}
              <span className={styles.v}>{l.v}</span>
            </a>
          ))}
        </div>

        <div className={styles.colophon}>
          <div className={styles.big}>
            &ldquo;Warm, natural, intentional. Every element has room to
            breathe.&rdquo;
          </div>
          <div className={styles.col}>
            <h5>Stack</h5>
            <ul>
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>R3F / GSAP</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h5>Type</h5>
            <ul>
              <li>Fraunces</li>
              <li>Inter</li>
              <li>JetBrains Mono</li>
            </ul>
          </div>
          <div className={styles.col}>
            <h5>Studio</h5>
            <ul>
              <li>Antikode · Jakarta</li>
              <li>UTC+7</li>
              <li>Available Q2 &apos;26</li>
            </ul>
          </div>
        </div>

        <div className={styles.foot}>
          <div>© 2026 Fatan Aminullah · Crafted in Jakarta</div>
          <div>
            Press <span className={styles.kbd}>Ctrl</span>{" "}
            <span className={styles.kbd}>`</span> for terminal
          </div>
          <div>v2.0 · Earth edition</div>
        </div>
      </div>
    </section>
  );
}
