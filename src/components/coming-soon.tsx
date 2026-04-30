import Image from "next/image";

import styles from "./coming-soon.module.css";

const ticks = Array.from({ length: 36 });

export default function ComingSoon() {
  return (
    <main className={styles.page}>
      <header className={styles.nav} aria-label="Site status">
        <a
          className={styles.brand}
          href="mailto:fatan.aminullah.j@gmail.com"
          data-cursor="link"
          aria-label="Fatan Aminullah"
        >
          <Image
            src="/icon.png"
            alt=""
            width={28}
            height={28}
            className={styles.brandLogo}
            priority
          />
          Fatan Aminullah
        </a>
        <div className={styles.status}>
          <span className={styles.pip} aria-hidden="true" />
          2026 &middot; In progress
        </div>
      </header>

      <section className={styles.hero} aria-labelledby="coming-soon-title">
        <div className={styles.orbit} aria-hidden="true">
          <div className={styles.coordTop}>Build in progress</div>
          <div className={styles.coordBottom}>Launch window &middot; soon</div>
          <div className={styles.coordLeft}>06&deg;10&prime;S</div>
          <div className={styles.coordRight}>106&deg;50&prime;E</div>
          <div className={`${styles.ring} ${styles.ringOuter}`} />
          <div className={`${styles.ring} ${styles.ringMiddle}`} />
          <div className={`${styles.ring} ${styles.ringInner}`} />
          <div className={styles.disc} />
          <div className={styles.crosshair} />
          <div className={styles.ticks}>
            {ticks.map((_, index) => (
              <span
                key={index}
                className={`${styles.tick} ${index % 3 === 0 ? styles.tickLong : ""}`}
                style={{ transform: `translateX(-50%) rotate(${index * 10}deg)` }}
              />
            ))}
          </div>
        </div>

        <div className={styles.content}>
          <p className={styles.eyebrow}>(Production preview) / 01</p>
          <h1 id="coming-soon-title">
            Something considered is <em>coming soon.</em>
          </h1>
          <p className={styles.copy}>
            The full portfolio needs a little more craft before it meets the
            light. For now, this space is being tuned, tested, and quietly
            assembled.
          </p>
          <div className={styles.actions} aria-label="Contact links">
            <a href="mailto:fatan.aminullah.j@gmail.com" data-cursor="link">
              Discuss a project
              <span aria-hidden="true">-&gt;</span>
            </a>
            <a href="https://www.linkedin.com/in/fatan-aminullah/" data-cursor="link">
              LinkedIn
            </a>
          </div>
        </div>

        <aside className={styles.panel} aria-label="Launch details">
          <div>
            <span className={styles.panelLabel}>Status</span>
            <strong>Calibrating</strong>
          </div>
          <div>
            <span className={styles.panelLabel}>Focus</span>
            <strong>Frontend, systems, motion</strong>
          </div>
          <div>
            <span className={styles.panelLabel}>Availability</span>
            <strong>Open for selected work</strong>
          </div>
        </aside>
      </section>

      <footer className={styles.footer}>
        <span>The restraint is the craft.</span>
        <span>Portfolio under construction</span>
      </footer>
    </main>
  );
}
