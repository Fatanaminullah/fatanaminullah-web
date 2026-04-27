"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./terminal.module.css";

const ART = `  ███████╗ █████╗ ████████╗ █████╗ ███╗   ██╗
  ██╔════╝██╔══██╗╚══██╔══╝██╔══██╗████╗  ██║
  █████╗  ███████║   ██║   ███████║██╔██╗ ██║
  ██╔══╝  ██╔══██║   ██║   ██╔══██║██║╚██╗██║
  ██║     ██║  ██║   ██║   ██║  ██║██║ ╚████║
  ╚═╝     ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═══╝
           portfolio.sh — earth edition`;

type Line = { cmd: string; out: string };

export function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "`") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    if (open && rootRef.current) {
      rootRef.current.scrollTop = rootRef.current.scrollHeight;
    }
  }, [lines, open]);

  const runCommand = useCallback(
    (cmdRaw: string) => {
      const cmd = cmdRaw.trim();
      if (!cmd) {
        setLines((L) => [...L, { cmd: "", out: "" }]);
        return;
      }

      const key = cmd.toLowerCase();
      let out = "";

      if (key === "help") {
        out = `Available commands:
  about       short bio
  skills      stack + tooling
  projects    featured work
  experience  track record
  contact     how to reach me
  mode        switch back to UI (or press Ctrl+\`)
  clear       wipe terminal
  help        this list`;
      } else if (key === "about") {
        out = `Fatan Aminullah · Senior Software Developer · Jakarta, ID
Six years building web experiences across corporate, e-commerce, and loyalty platforms.
Currently senior frontend at Antikode.`;
      } else if (key === "skills") {
        out = `primary   Next.js · React · TypeScript · TailwindCSS
motion    GSAP · Framer Motion · Lenis · R3F · Three.js
native    React Native
backend   Node · Express · Socket.io · Web3`;
      } else if (key === "projects") {
        out = `01  Pocari Sweat      · pocarisweat.id     · 2024
02  Bodypack          · bodypack.com       · 2023
03  Cinema XXI        · cinema21.co.id     · 2023
04  Desa Kitsune      · desakitsune.com    · 2024
05  Peruri            · peruri.co.id       · 2025
06  Eatlah Club       · club.eatlahjkt.com · 2022`;
      } else if (key === "experience") {
        out = `2021 — Present   Antikode              · Senior Frontend Developer
2020 — 2021      Emporia Digital       · Frontend Developer
2019 — 2020      Anabatic Technologies · Frontend Developer`;
      } else if (key === "contact") {
        out = `email     fatan.aminullah.j@gmail.com
linkedin  /in/fatanaminullah
github    @fatanaminullah`;
      } else if (key === "mode") {
        close();
        return;
      } else if (key === "clear") {
        setLines([]);
        return;
      } else {
        out = `unknown command: ${cmd} — type help`;
      }

      setLines((L) => [...L, { cmd, out }]);
    },
    [close],
  );

  return (
    <div
      className={`${styles.root} ${open ? styles.open : ""}`}
      ref={rootRef}
      aria-hidden={!open}
    >
      <pre className={styles.banner}>{ART}</pre>
      <p className={styles.hint}>
        type <strong>help</strong> to list commands, <strong>Ctrl+`</strong> to
        return to UI
      </p>
      <br />

      {lines.map((line, i) => (
        <div key={i}>
          <div>
            <span className={styles.prompt}>fatan@portfolio:~$</span> {line.cmd}
          </div>
          {line.out ? <div className={styles.out}>{line.out}</div> : null}
        </div>
      ))}

      <div className={styles.promptLine}>
        <span className={styles.prompt}>fatan@portfolio:~$</span>
        <input
          ref={inputRef}
          className={styles.input}
          aria-label="Terminal input"
          onKeyDown={(e) => {
            if (e.key !== "Enter") return;
            const v = e.currentTarget.value;
            e.currentTarget.value = "";
            runCommand(v);
          }}
        />
      </div>
    </div>
  );
}

