"use client";

import { useEffect, useRef } from "react";
import styles from "./custom-cursor.module.css";

function readCursorPref(): boolean {
  try {
    const s = JSON.parse(localStorage.getItem("fatan-v2-tweaks") || "{}");
    return typeof s.cursor === "boolean" ? s.cursor : true;
  } catch {
    return true;
  }
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const dotEl = dot;
    const ringEl = ring;

    dotEl.id = "cursor-dot";
    ringEl.id = "cursor-ring";

    // Hide on touch devices (matches design prototype cursor.js)
    if (matchMedia("(hover: none)").matches) {
      dotEl.style.display = ringEl.style.display = "none";
      document.body.style.cursor = "auto";
      return;
    }

    function applyCustomVisibility() {
      const enabled = readCursorPref();
      const show = enabled;
      dotEl.style.display = ringEl.style.display = show ? "" : "none";
      document.body.style.cursor = show ? "none" : "auto";
      return show;
    }

    applyCustomVisibility();

    let x = innerWidth / 2,
      y = innerHeight / 2;
    let rx = x,
      ry = y;

    function onMove(e: MouseEvent) {
      x = e.clientX;
      y = e.clientY;
    }
    window.addEventListener("mousemove", onMove);

    let raf: number;
    function loop() {
      rx += (x - rx) * 0.14;
      ry += (y - ry) * 0.14;
      dotEl.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ringEl.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    loop();

    function onOver(e: MouseEvent) {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) ringEl.dataset.variant = (t as HTMLElement).dataset.cursor!;
      else delete ringEl.dataset.variant;
      const v = ringEl.dataset.variant;
      dotEl.style.opacity =
        v === "prev" || v === "next" ? "0" : "";
    }
    document.addEventListener("mouseover", onOver);

    function onCursorPrefChanged() {
      applyCustomVisibility();
    }
    window.addEventListener("fatan-cursor-pref-changed", onCursorPrefChanged);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      window.removeEventListener("fatan-cursor-pref-changed", onCursorPrefChanged);
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring} />
    </>
  );
}
