"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./terminal.module.css";

const ART = `
  ███████╗ █████╗ ████████╗ █████╗ ███╗   ██╗
  ██╔════╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║
  █████╗  ███████║   ██║   ███████║██╔██╗ ██║
  ██╔══╝  ██╔══██║   ██║   ██╔══██║██║╚██╗██║
  ██║     ██║  ██║   ██║   ██║  ██║██║ ╚████║
  ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
           portfolio.sh — earth edition
`;

const COMMANDS: Record<string, (toggle: () => void) => string> = {
  help: () => `<span class="${styles.muted}">Available commands:</span>
  about       short bio
  skills      stack + tooling
  projects    featured work
  experience  track record
  contact     how to reach me
  mode        switch back to UI (or press Ctrl+\`)
  clear       wipe terminal
  help        this list`,

  about: () => `Fatan Aminullah · Engineer · Jakarta, ID
Six years building web experiences across corporate, e-commerce, and loyalty platforms.
Currently senior frontend at Antikode.`,

  skills: () => `<span class="${styles.muted}">primary  </span> Next.js · React · TypeScript · TailwindCSS
<span class="${styles.muted}">motion   </span> GSAP · Framer Motion · Lenis · R3F · Three.js
<span class="${styles.muted}">native   </span> React Native
<span class="${styles.muted}">backend  </span> Node · Express · Socket.io · Web3`,

  projects: () => `<span class="${styles.muted}">01</span> Pocari Sweat      · pocarisweat.id     · 2024
<span class="${styles.muted}">02</span> Bodypack          · bodypack.com       · 2023
<span class="${styles.muted}">03</span> Cinema XXI        · cinema21.co.id     · 2023
<span class="${styles.muted}">04</span> Desa Kitsune      · desakitsune.com    · 2024
<span class="${styles.muted}">05</span> Peruri            · peruri.co.id       · 2025
<span class="${styles.muted}">06</span> Eatlah Club       · club.eatlahjkt.com · 2022`,

  experience: () => `<span class="${styles.muted}">2021 — Present</span>  Antikode              · Senior Frontend Developer
<span class="${styles.muted}">2020 — 2021</span>     Emporia Digital       · Frontend Developer
<span class="${styles.muted}">2019 — 2020</span>     Anabatic Technologies · Frontend Developer`,

  contact: () => `email     fatan.aminullah.j@gmail.com
linkedin  /in/fatanaminullah
github    @fatanaminullah`,

  mode: (toggle) => { toggle(); return ""; },
};

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<Array<{ cmd: string; out: string }>>([]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        toggle();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [toggle]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = input.trim();
    setInput("");
    if (!cmd) {
      setHistory((prev) => [...prev, { cmd: "", out: "" }]);
      return;
    }
    if (cmd.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }
    const fn = COMMANDS[cmd.toLowerCase()];
    const out = fn
      ? fn(toggle)
      : `<span class="${styles.muted}">unknown command:</span> ${cmd} — type <b>help</b>`;
    setHistory((prev) => [...prev, { cmd, out }]);
  }

  if (!open) return null;

  return (
    <div className={styles.root} ref={containerRef}>
      <pre className={styles.art}>{ART}</pre>
      <span className={styles.muted}>
        type <b>help</b> to list commands, <b>Ctrl+`</b> to return to UI
      </span>
      <br />
      {history.map((h, i) => (
        <div key={i}>
          <div>
            <span className={styles.prompt}>fatan@portfolio:~$</span> {h.cmd}
          </div>
          {h.out && (
            <pre
              className={styles.output}
              dangerouslySetInnerHTML={{ __html: h.out }}
            />
          )}
        </div>
      ))}
      <form className={styles.promptLine} onSubmit={handleSubmit}>
        <span className={styles.prompt}>fatan@portfolio:~$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoFocus
        />
      </form>
    </div>
  );
}
