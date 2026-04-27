/* Mount react tree */
const { createRoot } = ReactDOM;

function App() {
  React.useEffect(() => {
    // Initialize reveals after mount
    requestAnimationFrame(() => { FatanUtils.initReveals(); });
    FatanUtils.startClock();
  }, []);
  return (
    <>
      <Hero />
      <About />
      <Marquee />
      <Works />
      <Experience />
      <Contact />
    </>
  );
}

const mount = document.getElementById('app');
createRoot(mount).render(<App />);
