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
  const lagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dotEl = dotRef.current;
    const lagEl = lagRef.current;
    if (!dotEl || !lagEl) return;

    dotEl.id = "cursor-dot";
    lagEl.id = "cursor-ring";

    if (matchMedia("(hover: none)").matches) {
      dotEl.style.display = lagEl.style.display = "none";
      document.body.style.cursor = "auto";
      return;
    }

    function applyCustomVisibility() {
      const enabled = readCursorPref();
      const show = enabled;
      dotEl!.style.display = lagEl!.style.display = show ? "" : "none";
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
      dotEl!.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(45deg)`;
      lagEl!.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }
    loop();

    function onOver(e: MouseEvent) {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        const variant = (t as HTMLElement).dataset.cursor!;
        lagEl!.dataset.variant = variant;
        lagEl!.dataset.label =
          variant === "image" ? "view" : variant === "link" ? "open" : "";
      } else {
        delete lagEl!.dataset.variant;
        delete lagEl!.dataset.label;
      }
      const v = lagEl!.dataset.variant;
      dotEl!.style.opacity =
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
      window.removeEventListener(
        "fatan-cursor-pref-changed",
        onCursorPrefChanged,
      );
      cancelAnimationFrame(raf);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.pin} />
      <div ref={lagRef} className={styles.annotation}>
        <span className={styles.stroke} />
      </div>
    </>
  );
}
