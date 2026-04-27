import { About } from "@/components/about/about";
import { Contact } from "@/components/contact/contact";
import { Hero } from "@/components/hero/hero";
import { Marquee } from "@/components/marquee/marquee";
import { RevealRoot } from "@/components/reveal/reveal-root";
import { Works } from "@/components/works/works";
import { Experience } from "@/components/experience/experience";

export default function Home() {
  return (
    <>
      <RevealRoot />
      <main id="app">
        <Hero />
        <About />
        <Marquee />
        <Works />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
