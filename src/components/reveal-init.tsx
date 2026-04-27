"use client";

import { useEffect } from "react";

export default function RevealInit() {
  useEffect(() => {
    function observeReveals() {
      const els = document.querySelectorAll(
        ".reveal-line, .reveal-word, .reveal-fade, .reveal-up"
      );
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
        { threshold: [0, 0.05, 0.15], rootMargin: "0px 0px -5% 0px" }
      );
      els.forEach((el) => io.observe(el));
    }

    // Run after a small delay so all components have mounted
    const timer = setTimeout(observeReveals, 100);

    // Also observe for dynamically added elements
    const mo = new MutationObserver(() => {
      observeReveals();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      mo.disconnect();
    };
  }, []);

  return null;
}
