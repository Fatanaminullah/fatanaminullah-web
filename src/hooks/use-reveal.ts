"use client";

import { useEffect } from "react";

const SELECTOR =
  ".reveal-line, .reveal-word, .reveal-fade, .reveal-up";

export function observeReveals(root: ParentNode) {
  const els = root.querySelectorAll(SELECTOR);
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const el = e.target as HTMLElement;
          const delay = parseFloat(el.dataset.delay || "0");
          setTimeout(() => el.classList.add("in"), delay * 1000);
          io.unobserve(el);
        }
      });
    },
    { threshold: [0, 0.05, 0.15], rootMargin: "0px 0px -5% 0px" },
  );
  els.forEach((el) => io.observe(el));
}

export function useRevealRoot() {
  useEffect(() => {
    observeReveals(document.body);
  }, []);
}
