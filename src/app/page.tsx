"use client";

import dynamic from "next/dynamic";
import Nav from "@/components/nav";
import Hero from "@/components/hero";
import About from "@/components/about";
import Marquee from "@/components/marquee";
import Works from "@/components/works";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

const CustomCursor = dynamic(() => import("@/components/custom-cursor"), { ssr: false });
const AskPanel = dynamic(() => import("@/components/ask-panel"), { ssr: false });
const Terminal = dynamic(() => import("@/components/terminal"), { ssr: false });
const Tweaks = dynamic(() => import("@/components/tweaks"), { ssr: false });
const RevealInit = dynamic(() => import("@/components/reveal-init"), { ssr: false });

export default function Home() {
  return (
    <>
      <div className="paper" />
      <div className="vignette" />
      <CustomCursor />
      <Nav />
      <main>
        <Hero />
        <About />
        <Marquee />
        <Works />
        <Experience />
        <Contact />
      </main>
      <AskPanel />
      <Terminal />
      <Tweaks />
      <RevealInit />
    </>
  );
}
