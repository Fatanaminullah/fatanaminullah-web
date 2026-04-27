export type WorkMotif =
  | "bottle"
  | "grid"
  | "film"
  | "mountain"
  | "crest"
  | "stamps";

export type WorkItem = {
  n: string;
  name: string;
  cat: string;
  url: string;
  tech: string[];
  year: string;
  tint: string;
  problem: string;
  role: string;
  outcome: string;
  motif: WorkMotif;
};

export const WORKS_V2: WorkItem[] = [
  {
    n: "01",
    name: "Pocari Sweat",
    cat: "Company Profile",
    url: "pocarisweat.id",
    tech: ["Next.js", "TailwindCSS", "GSAP", "Three.js", "Matter.js"],
    year: "2024",
    tint: "#C9B68E",
    problem:
      "Legacy WordPress with CLS >0.4. Rebuilt as Next.js with physics-driven hero interactions.",
    role: "Frontend lead · 2 devs",
    outcome:
      "LCP 3.8s → 1.1s · bounce −34% · first internal site using real-time physics.",
    motif: "bottle",
  },
  {
    n: "02",
    name: "Bodypack",
    cat: "E-Commerce",
    url: "bodypack.com",
    tech: ["Next.js", "Bootstrap", "GSAP", "SASS"],
    year: "2023",
    tint: "#A98870",
    problem:
      "Migration from legacy Magento to a headless Next.js storefront with a GSAP-driven product showcase.",
    role: "Senior frontend dev",
    outcome: "Checkout conversion +18% · mobile PDP load halved.",
    motif: "grid",
  },
  {
    n: "03",
    name: "Cinema XXI",
    cat: "Company Profile",
    url: "cinema21.co.id",
    tech: ["Next.js", "Bootstrap", "SASS", "Framer Motion"],
    year: "2023",
    tint: "#B88464",
    problem:
      "Corporate revamp with a cinema-grade motion language across 40+ pages and 7 localised brands.",
    role: "Frontend dev",
    outcome:
      "Design system tokenised across 40+ templates · 99/100 Lighthouse a11y.",
    motif: "film",
  },
  {
    n: "04",
    name: "Desa Kitsune",
    cat: "Marketing Site",
    url: "desakitsune.com",
    tech: ["Next.js", "TailwindCSS", "GSAP", "Lenis"],
    year: "2024",
    tint: "#8E9378",
    problem:
      "Launch site for a villa resort; scroll narrative built on Lenis + ScrollTrigger with pinned chapters.",
    role: "Frontend lead",
    outcome: "Launched on time · nominated in Awwwards Sites of the Day.",
    motif: "mountain",
  },
  {
    n: "05",
    name: "Peruri",
    cat: "Company Profile",
    url: "peruri.co.id",
    tech: ["Next.js", "TailwindCSS", "GSAP", "Lenis"],
    year: "2025",
    tint: "#8C7556",
    problem:
      "Indonesia's national security printing company; corporate refresh that reads institutional but not sleepy.",
    role: "Frontend lead",
    outcome: "12-page relaunch in 6 weeks · CMS-driven · runs without ops intervention.",
    motif: "crest",
  },
  {
    n: "06",
    name: "Eatlah Club",
    cat: "Loyalty App",
    url: "club.eatlahjkt.com",
    tech: ["Next.js", "Bootstrap", "Socket.io"],
    year: "2022",
    tint: "#C07A58",
    problem:
      "Realtime loyalty system with live stamp redemption via Socket.io — POS events push to user phones.",
    role: "Fullstack dev",
    outcome: "40k+ stamps processed in first quarter · near-zero redemption latency.",
    motif: "stamps",
  },
];
