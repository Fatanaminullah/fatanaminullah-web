"use client";

import { useState, useEffect } from "react";
import styles from "./tweaks.module.css";

const ACCENTS: Record<string, string> = {
  clay: "#A0785A",
  terracotta: "#C67D5B",
  olive: "#6B7C5E",
  ink: "#3D4A52",
  plum: "#7A5A6E",
};

const TONES: Record<string, Record<string, string>> = {
  parchment: { bg: "#F5F0EB", bg2: "#EDE7DF", cream: "#FAF7F3", fg: "#2C2825", fgDim: "#6B635A", fgMuted: "#9C9489", line: "rgba(44, 40, 37, 0.08)", lineStrong: "rgba(44, 40, 37, 0.18)" },
  sand: { bg: "#EDE8E2", bg2: "#E4DED5", cream: "#F5F1EA", fg: "#2C2825", fgDim: "#6B635A", fgMuted: "#9C9489", line: "rgba(44, 40, 37, 0.09)", lineStrong: "rgba(44, 40, 37, 0.2)" },
  linen: { bg: "#EEEAE2", bg2: "#E6E0D4", cream: "#F7F3EB", fg: "#2A2621", fgDim: "#6D655A", fgMuted: "#9D9488", line: "rgba(42, 38, 33, 0.09)", lineStrong: "rgba(42, 38, 33, 0.2)" },
};

function apply(accent: string, tone: string) {
  const r = document.documentElement.style;
  r.setProperty("--accent", ACCENTS[accent] || ACCENTS.clay);
  const t = TONES[tone] || TONES.parchment;
  r.setProperty("--bg", t.bg);
  r.setProperty("--bg-2", t.bg2);
  r.setProperty("--cream", t.cream);
  r.setProperty("--fg", t.fg);
  r.setProperty("--fg-dim", t.fgDim);
  r.setProperty("--fg-muted", t.fgMuted);
  r.setProperty("--line", t.line);
  r.setProperty("--line-strong", t.lineStrong);
}

export default function Tweaks() {
  const [open, setOpen] = useState(false);
  const [accent, setAccent] = useState("clay");
  const [tone, setTone] = useState("parchment");
  const [cursorEnabled, setCursorEnabled] = useState(true);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("fatan-v2-tweaks") || "{}");
      if (saved.accent) setAccent(saved.accent);
      if (saved.tone) setTone(saved.tone);
      if (typeof saved.cursor === "boolean") setCursorEnabled(saved.cursor);
    } catch {}
  }, []);

  useEffect(() => {
    apply(accent, tone);
    try {
      localStorage.setItem(
        "fatan-v2-tweaks",
        JSON.stringify({ accent, tone, cursor: cursorEnabled }),
      );
    } catch {}
    window.dispatchEvent(new Event("fatan-cursor-pref-changed"));
  }, [accent, tone, cursorEnabled]);

  return (
    <div className={`${styles.tweaks} ${open ? styles.tweaksOn : ""}`}>
      <h4>Earth Palette</h4>
      <label>
        <span>Accent</span>
        <div className={styles.swatches}>
          {Object.entries(ACCENTS).map(([name, color]) => (
            <button
              key={name}
              className={`${styles.swatch} ${accent === name ? styles.swatchActive : ""}`}
              style={{ background: color }}
              data-cursor="link"
              title={name}
              onClick={() => setAccent(name)}
            />
          ))}
        </div>
      </label>
      <label>
        <span>Tone</span>
        <div className={styles.tones}>
          {Object.keys(TONES).map((name) => (
            <button
              key={name}
              className={`${styles.tone} ${tone === name ? styles.toneActive : ""}`}
              data-cursor="link"
              onClick={() => setTone(name)}
            >
              {name}
            </button>
          ))}
        </div>
      </label>
      <label>
        <span>Cursor</span>
        <select
          className={styles.select}
          value={cursorEnabled ? "true" : "false"}
          onChange={(e) => setCursorEnabled(e.target.value === "true")}
          data-cursor="link"
          aria-label="Cursor style"
        >
          <option value="true">Custom</option>
          <option value="false">System</option>
        </select>
      </label>
      <div className={styles.hint}>
        Press <b>Ctrl + `</b> for terminal mode.
      </div>

      {/* Toggle button */}
      <button
        className={styles.toggle}
        data-cursor="link"
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle tweaks panel"
      >
        ⚙
      </button>
    </div>
  );
}
