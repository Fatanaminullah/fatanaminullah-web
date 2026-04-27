/* App shell — mount everything into #app */
function App() {
  React.useEffect(() => {
    window.observeReveals(document.body);
    window.startClock('clock');

    // magnetize nav + ask fab
    document.querySelectorAll('[data-magnet]').forEach(el => window.magnetize(el, 0.3));
  }, []);

  return (
    <React.Fragment>
      <Hero />
      <About />
      <Marquee />
      <Works />
      <Experience />
      <Contact />
    </React.Fragment>
  );
}

window.onReady(() => {
  const root = ReactDOM.createRoot(document.getElementById('app'));
  root.render(<App />);
});
