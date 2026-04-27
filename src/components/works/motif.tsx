import type { WorkMotif } from "./data";

export function Motif({ kind }: { kind: WorkMotif }) {
  const stroke = "currentColor";
  switch (kind) {
    case "bottle":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M42 14 h16 v8 c0 2 4 4 4 8 v50 c0 6 -4 10 -10 10 h-4 c-6 0 -10 -4 -10 -10 v-50 c0 -4 4 -6 4 -8 z" />
          <circle cx="50" cy="62" r="3" />
          <circle cx="44" cy="55" r="2" />
          <circle cx="56" cy="68" r="2.5" />
          <circle cx="48" cy="72" r="1.6" />
          <line x1="38" y1="42" x2="62" y2="42" />
        </svg>
      );
    case "grid":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          {[...Array(5)].flatMap((_, c) =>
            [...Array(7)].map((_, r) => (
              <rect
                key={`${c}-${r}`}
                x={14 + c * 15}
                y={10 + r * 11}
                width="11"
                height="8"
              />
            )),
          )}
          <rect x="14" y="10" width="26" height="19" fill="currentColor" opacity="0.15" />
        </svg>
      );
    case "film":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <rect x="14" y="22" width="72" height="56" />
          {[20, 40, 60, 80].map((x, i) => (
            <g key={i}>
              <rect x={x - 4} y="25" width="8" height="3" />
              <rect x={x - 4} y="72" width="8" height="3" />
            </g>
          ))}
          <rect x="22" y="32" width="56" height="36" strokeDasharray="2 1" />
          <circle cx="50" cy="50" r="8" />
          <path d="M47 46 l8 4 l-8 4 z" fill="currentColor" />
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M8 78 L28 48 L40 60 L58 32 L78 56 L92 78 Z" />
          <path d="M28 48 L40 60 L58 32" fill="currentColor" opacity="0.15" />
          <circle cx="76" cy="22" r="8" />
          <line x1="8" y1="84" x2="92" y2="84" />
          <line x1="8" y1="88" x2="92" y2="88" strokeDasharray="1 2" />
        </svg>
      );
    case "crest":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          <path d="M50 12 L78 24 V56 C78 70 66 82 50 88 C34 82 22 70 22 56 V24 Z" />
          <path d="M50 22 L70 30 V56 C70 66 62 76 50 80 C38 76 30 66 30 56 V30 Z" />
          <line x1="50" y1="34" x2="50" y2="68" />
          <line x1="38" y1="50" x2="62" y2="50" />
          <circle cx="50" cy="50" r="5" />
        </svg>
      );
    case "stamps":
      return (
        <svg viewBox="0 0 100 100" fill="none" stroke={stroke} strokeWidth="0.6">
          {[0, 1, 2].flatMap((r) =>
            [0, 1, 2, 3].map((c) => (
              <circle
                key={`${r}-${c}`}
                cx={20 + c * 20}
                cy={28 + r * 22}
                r="6"
                strokeDasharray="1 1"
              />
            )),
          )}
          {[0, 1, 2, 3].map((c) => (
            <circle key={c} cx={20 + c * 20} cy="28" r="3" fill="currentColor" />
          ))}
          {[0, 1].map((c) => (
            <circle key={c} cx={20 + c * 20} cy="50" r="3" fill="currentColor" />
          ))}
        </svg>
      );
    default:
      return null;
  }
}
