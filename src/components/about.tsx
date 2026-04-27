"use client";

import styles from "./about.module.css";

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.grid}>
        <div>
          <div className={styles.label}>
            <span>(About)</span> / 02
          </div>
          <div className={styles.copy}>
            <p>
              Six years of building web experiences across <em>corporate</em>,{" "}
              <em>e-commerce</em>, and <em>loyalty</em> platforms.
            </p>
            <p className={styles.copySmall}>
              I bridge engineering precision with visual craft &mdash; the kind
              of work that feels inevitable once it ships.
            </p>
          </div>

          <div className={`${styles.sub} reveal-fade`}>
            Currently senior frontend at Antikode, leading builds for brands
            across Southeast Asia. Comfortable in the seams between motion,
            performance, and systems thinking.
          </div>

          <div className={`${styles.signature} reveal-fade`} data-delay="0.2">
            <span className={styles.sig}>&mdash; Fatan</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.bento}>
            <div className={`${styles.cell} reveal-fade`} data-delay="0.05">
              <div className={styles.k}>
                6<sup>+</sup>
              </div>
              <div className={styles.v}>Years Building</div>
            </div>
            <div className={`${styles.cell} reveal-fade`} data-delay="0.1">
              <div className={styles.k}>
                30<sup>+</sup>
              </div>
              <div className={styles.v}>Projects Shipped</div>
            </div>
            <div className={`${styles.cell} reveal-fade`} data-delay="0.15">
              <div className={styles.k}>3</div>
              <div className={styles.v}>Companies</div>
            </div>
            <div className={`${styles.cell} reveal-fade`} data-delay="0.2">
              <div className={styles.k}>4</div>
              <div className={styles.v}>Devs Mentored</div>
            </div>
            <div
              className={`${styles.cell} ${styles.cellWide} reveal-fade`}
              data-delay="0.25"
            >
              <div className={styles.k}>
                &ldquo;The restraint <em>is</em> the craft.&rdquo;
              </div>
              <div className={styles.v}>Operating Principle</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
