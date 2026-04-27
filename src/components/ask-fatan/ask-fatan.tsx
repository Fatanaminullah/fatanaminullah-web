"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useAskFatan } from "./ask-fatan-context";
import styles from "./ask-fatan.module.css";

const SUGGESTED = [
  "What's Fatan's strongest skill?",
  "Tell me about the Pocari project",
  "Leadership experience?",
  "Preferred stack in 2026?",
];

type Msg = { role: "user" | "bot"; text: string; html?: boolean };

/**
 * TODO(LLM): Replace stubAsk with a fetch to /api/ask (or similar) using
 * ASK_FATAN_SYSTEM_CONTEXT from ./prompt.ts on the server.
 */
async function stubAsk(question: string): Promise<string> {
  void question;
  await new Promise((r) => setTimeout(r, 900));
  return "AI integration is coming soon — for now, email Fatan at fatan.aminullah.j@gmail.com.";
}

function Thinking() {
  return (
    <span className={styles.thinking}>
      <span />
      <span />
      <span />
    </span>
  );
}

export function AskFatanUI() {
  const { isOpen, open, close } = useAskFatan();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [showSuggest, setShowSuggest] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollBottom();
  }, [msgs, isOpen]);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [close]);

  const onOpen = useCallback(() => {
    open();
    if (msgs.length === 0) {
      setMsgs([
        {
          role: "bot",
          text: "Hi — I'm a little AI trained on Fatan's resume and work. Ask me anything about his projects, stack, or experience.",
        },
      ]);
      setShowSuggest(true);
    }
    setTimeout(() => inputRef.current?.focus(), 500);
  }, [open, msgs.length]);

  const submit = useCallback(
    async (q: string) => {
      const trimmed = q.trim();
      if (!trimmed) return;
      setMsgs((m) => [...m, { role: "user", text: trimmed }]);
      setShowSuggest(false);
      setMsgs((m) => [...m, { role: "bot", text: "__thinking__" }]);

      try {
        const reply = await stubAsk(trimmed);
        setMsgs((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          if (last?.role === "bot" && last.text === "__thinking__") {
            next[next.length - 1] = { role: "bot", text: reply };
          }
          return next;
        });
      } catch {
        setMsgs((m) => {
          const next = [...m];
          const last = next[next.length - 1];
          if (last?.role === "bot" && last.text === "__thinking__") {
            next[next.length - 1] = {
              role: "bot",
              text: "I hit a snag. Try emailing Fatan at fatan.aminullah.j@gmail.com.",
            };
          }
          return next;
        });
      }
    },
    [],
  );

  return (
    <>
      <button
        type="button"
        className={styles.fab}
        id="askFab"
        data-cursor="link"
        onClick={onOpen}
      >
        <span className={styles.pulse} />
        Ask Fatan
      </button>

      <aside
        className={`${styles.panel} ${isOpen ? styles.open : ""}`}
        id="askPanel"
        aria-hidden={!isOpen}
      >
        <header className={styles.header}>
          <div>
            <h3 className={styles.title}>
              Ask <em>Fatan</em>
            </h3>
            <div className={styles.sub}>AI · trained on resume</div>
          </div>
          <button
            type="button"
            className={styles.close}
            data-cursor="link"
            onClick={close}
            aria-label="Close"
          >
            ×
          </button>
        </header>

        <div className={styles.messages}>
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`${styles.msg} ${
                m.role === "user" ? styles.msgUser : styles.msgBot
              }`}
            >
              {m.role === "bot" && m.text === "__thinking__" ? (
                <Thinking />
              ) : (
                m.text.split("\n").map((line, j) => (
                  <span key={j}>
                    {j > 0 ? <br /> : null}
                    {line}
                  </span>
                ))
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showSuggest ? (
          <div className={styles.suggest}>
            {SUGGESTED.map((s) => (
              <button
                key={s}
                type="button"
                className={styles.suggestBtn}
                data-cursor="link"
                onClick={() => submit(s)}
              >
                {s}
              </button>
            ))}
          </div>
        ) : null}

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            const v = inputRef.current?.value ?? "";
            if (inputRef.current) inputRef.current.value = "";
            submit(v);
          }}
        >
          <input
            ref={inputRef}
            className={styles.input}
            placeholder="Ask about Fatan's work..."
            autoComplete="off"
            aria-label="Message"
          />
          <button type="submit" className={styles.send} data-cursor="link">
            Send
          </button>
        </form>
      </aside>
    </>
  );
}
