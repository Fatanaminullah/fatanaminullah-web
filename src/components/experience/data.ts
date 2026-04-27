export type ExperienceEntry = {
  co: string;
  role: string;
  range: string;
  where: string;
  bullets: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    co: "Antikode",
    role: "Senior Frontend Developer",
    range: "Aug 2021 — Present",
    where: "Jakarta, ID",
    bullets: [
      "Lead frontend across 12+ corporate + e-commerce builds with measurable performance wins.",
      "Mentor four developers on motion, performance budgets, and systems thinking.",
      "Established the studio's in-house motion + scroll-narrative vocabulary (GSAP/Lenis/R3F).",
    ],
  },
  {
    co: "Emporia Digital",
    role: "Frontend Developer",
    range: "Aug 2020 — Aug 2021",
    where: "Jakarta, ID",
    bullets: [
      "Shipped marketing sites and editorial platforms for regional media clients.",
      "Owned component library migration from jQuery to React across four products.",
    ],
  },
  {
    co: "Anabatic Technologies",
    role: "Frontend Developer",
    range: "Jul 2019 — Aug 2020",
    where: "Jakarta, ID",
    bullets: [
      "Delivered internal banking and telco dashboards with strict accessibility gates.",
      "First exposure to large design systems — tokens, theming, multi-brand theming.",
    ],
  },
];
