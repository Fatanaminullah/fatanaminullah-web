"use client";

import styles from "./contact.module.css";

const LINKS = [
  { k: "Email", v: "fatan.aminullah.j@gmail.com", href: "mailto:fatan.aminullah.j@gmail.com" },
  { k: "LinkedIn", v: "/in/fatanaminullah", href: "https://linkedin.com/in/fatanaminullah" },
  { k: "GitHub", v: "@fatanaminullah", href: "https://github.com/fatanaminullah" },
  { k: "Read.cv", v: "fatan", href: "#" },
];

export default function Contact() {
  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.inner}>
        <div className={styles.label}>
          <span>(Let&rsquo;s talk)</span> / 06
        </div>

        <h2 className="reveal-line">
          <span>
            Let&rsquo;s build something <em>together</em>.
          </span>
        </h2>

        <div className={`${styles.ctaRow} reveal-fade`}>
          <a href="mailto:fatan.aminullah.j@gmail.com" data-cursor="link">
            Start a project
            <span className={styles.arrow}>→</span>
          </a>
          <a
            href="#"
            className={styles.ctaSecondary}
            data-cursor="link"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("askFab")?.click();
            }}
          >
            Ask Fatan
            <span className={`${styles.arrow} ${styles.arrowDark}`}>?</span>
          </a>
        </div>

        <div className={styles.row}>
          {LINKS.map((l) => (
            <a
              key={l.k}
              href={l.href}
              target="_blank"
              rel="noopener"
              data-cursor="link"
            >
              {l.k}
              <span className={styles.linkV}>{l.v}</span>
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
              <li>Available Q2 &rsquo;26</li>
            </ul>
          </div>
        </div>

        <div className={styles.foot}>
          <div>&copy; 2026 Fatan Aminullah · Crafted in Jakarta</div>
          <div>
            Press{" "}
            <span className={styles.kbd}>Ctrl</span>{" "}
            <span className={styles.kbd}>`</span> for terminal
          </div>
          <div>v2.0 · Earth edition</div>
        </div>
      </div>
    </section>
  );
}
