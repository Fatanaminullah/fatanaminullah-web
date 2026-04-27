"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./ask-panel.module.css";

const SUGGESTED = [
  "What's Fatan's strongest skill?",
  "Tell me about the Pocari project",
  "Leadership experience?",
  "Preferred stack in 2026?",
];

const CTX = `You are an assistant embedded on Fatan Aminullah's portfolio site.
Answer concisely (2-4 short paragraphs max) in a warm, editorial, professional tone.
Known facts:
- Roles span frontend development, software engineering, full-stack delivery, and systems analysis — Jakarta Indonesia, 6+ years experience.
- Currently Senior Frontend at Antikode (Aug 2021-present).
- Previously Emporia Digital (2020-21) and Anabatic Technologies (2019-20).
- Mentored 4 devs; shipped 30+ projects across corporate, e-commerce, loyalty.
- Featured work: Pocari Sweat (Next.js + Matter.js physics), Bodypack e-commerce, Cinema XXI, Desa Kitsune (Lenis scroll), Peruri (national printing co.), Eatlah Club (realtime loyalty w/ Socket.io).
- Stack: Next.js, React, Vue, TypeScript, Tailwind, GSAP, Three.js, R3F, Framer Motion, React Native, Node, Express, Web3, Lenis.
Email: fatan.aminullah.j@gmail.com. If asked something unknown, say you're not sure and recommend emailing Fatan.`;

interface Message {
  role: "user" | "bot";
  html: string;
}

export default function AskPanel() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const messagesRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          html: "Hi — I'm a little AI trained on Fatan's resume and work. Ask me anything about his projects, stack, or experience.",
        },
      ]);
    }
    if (open) setTimeout(() => inputRef.current?.focus(), 500);
  }, [open, messages.length]);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  async function handleSubmit(q: string) {
    if (!q.trim() || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", html: q }]);
    setLoading(true);

    // Since we don't have a real AI backend, provide a static response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          html: "Thanks for your question! For the most accurate answer, please reach out to Fatan directly at <b>fatan.aminullah.j@gmail.com</b>.",
        },
      ]);
      setLoading(false);
    }, 1200);
  }

  return (
    <>
      <button
        className={styles.fab}
        id="askFab"
        data-cursor="link"
        onClick={() => setOpen(true)}
      >
        <span className={styles.pulse} />
        Ask Fatan
      </button>

      <aside className={`${styles.panel} ${open ? styles.panelOn : ""}`}>
        <header className={styles.header}>
          <div>
            <h3>
              Ask <em>Fatan</em>
            </h3>
            <div className={styles.sub}>AI &middot; trained on resume</div>
          </div>
          <button
            className={styles.close}
            data-cursor="link"
            onClick={() => setOpen(false)}
          >
            &times;
          </button>
        </header>

        <div className={styles.messages} ref={messagesRef}>
          {messages.map((m, i) => (
            <div
              key={i}
              className={`${styles.msg} ${m.role === "user" ? styles.msgUser : styles.msgBot}`}
              dangerouslySetInnerHTML={{ __html: m.html }}
            />
          ))}
          {loading && (
            <div className={`${styles.msg} ${styles.msgBot}`}>
              <span className={styles.thinking}>
                <span /><span /><span />
              </span>
            </div>
          )}
        </div>

        {messages.length <= 1 && !loading && (
          <div className={styles.suggest}>
            {SUGGESTED.map((s) => (
              <button
                key={s}
                data-cursor="link"
                onClick={() => handleSubmit(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <form
          className={styles.inputRow}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(input);
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Fatan's work..."
            autoComplete="off"
          />
          <button type="submit" data-cursor="link">
            Send
          </button>
        </form>
      </aside>
    </>
  );
}
