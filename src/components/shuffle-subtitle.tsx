"use client";

import { useEffect, useState } from "react";
import styles from "./shuffle-subtitle.module.css";

/** Display — “A” + dot-separated segments */
const PHRASES = [
  "A • FRONTEND • DEVELOPER",
  "A • SOFTWARE • ENGINEER",
  "A • FULLSTACK • DEVELOPER",
  "A • SYSTEM • ANALYST",
];

/** Uppercase alnum only — keeps shuffle feeling on-brand with the mono caption */
const SCRAMBLE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/** How long each shuffle takes (glyphs resolving left → right) */
const SHUFFLE_DURATION_MS = 2600;

/** Pause after text settles before the next phrase */
const HOLD_MS = 2600;

/** Reduced motion: total time per phrase ≈ shuffle feel without RAF */
const REDUCED_ROTATE_MS = SHUFFLE_DURATION_MS + HOLD_MS;

function randomChar(): string {
  return SCRAMBLE[(Math.random() * SCRAMBLE.length) | 0] ?? "X";
}

function announceFromDisplay(s: string): string {
  return s
    .split("•")
    .map((p) => p.trim().toLowerCase())
    .join(", ");
}

export default function ShuffleSubtitle() {
  const [text, setText] = useState(PHRASES[0]);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [settledPhrase, setSettledPhrase] = useState(PHRASES[0]);

  /* Plain rotate when user prefers reduced motion */
  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const next = PHRASES[phraseIndex];
    setText(next);
    setSettledPhrase(next);
  }, [phraseIndex]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setPhraseIndex((p) => (p + 1) % PHRASES.length);
    }, REDUCED_ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  /* Shuffle reveal — glyphs resolve left → right; • and spaces stay fixed */
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    let pauseTimer = 0;
    let cancelled = false;

    const target = PHRASES[phraseIndex];
    const start = performance.now();

    function tick(now: number) {
      if (cancelled) return;
      const t = Math.min(1, (now - start) / SHUFFLE_DURATION_MS);
      const eased = 1 - (1 - t) ** 2;

      let letterIndex = 0;
      const letterCount = [...target].filter(
        (c) => c !== " " && c !== "•"
      ).length;
      const revealedLetters = Math.floor(eased * letterCount);

      const next = [...target]
        .map((ch) => {
          if (ch === " " || ch === "•") return ch;
          const i = letterIndex;
          letterIndex += 1;
          if (i < revealedLetters) return ch;
          return randomChar();
        })
        .join("");

      setText(next);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setText(target);
        setSettledPhrase(target);
        pauseTimer = window.setTimeout(() => {
          setPhraseIndex((p) => (p + 1) % PHRASES.length);
        }, HOLD_MS);
      }
    }

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      clearTimeout(pauseTimer);
    };
  }, [phraseIndex]);

  return (
    <div className={styles.root}>
      <p className={styles.shuffle} aria-hidden="true">
        {text}
      </p>
      <span className={styles.visuallyHidden} aria-live="polite">
        Current role: {announceFromDisplay(settledPhrase)}
      </span>
    </div>
  );
}
