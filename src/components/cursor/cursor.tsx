"use client";

import { useEffect, useRef } from "react";
import styles from "./cursor.module.css";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);
  const y = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const noHover = window.matchMedia("(hover: none)").matches;
    if (noHover) {
      document.body.classList.remove("cursor-custom");
      return;
    }

    document.body.classList.add("cursor-custom");

    const onMove = (e: MouseEvent) => {
      x.current = e.clientX;
      y.current = e.clientY;
    };

    window.addEventListener("mousemove", onMove);

    const loop = () => {
      rx.current += (x.current - rx.current) * 0.14;
      ry.current += (y.current - ry.current) * 0.14;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x.current}px, ${y.current}px) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx.current}px, ${ry.current}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    const onOver = (e: MouseEvent) => {
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      const ring = ringRef.current;
      if (!ring) return;
      if (t) ring.dataset.variant = (t as HTMLElement).dataset.cursor || "";
      else delete ring.dataset.variant;
    };
    document.addEventListener("mouseover", onOver);

    return () => {
      document.body.classList.remove("cursor-custom");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} aria-hidden />
      <div ref={ringRef} className={styles.cursorRing} aria-hidden />
    </>
  );
}
