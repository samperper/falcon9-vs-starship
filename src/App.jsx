const sections = [
  'Opener',
  'The Side-by-Side',
  'The $/kg Curve',
  'Closer + Sources',
];

function App() {
  return (
    <main className="min-h-screen bg-background text-text">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <header className="max-w-[680px] space-y-4">
          <p className="font-mono text-sm uppercase tracking-[0.18em] text-muted">
            SpaceX launch economics
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-text sm:text-5xl">
            Falcon 9 vs Starship
          </h1>
        </header>

        <div className="grid gap-5 lg:grid-cols-2">
          {sections.map((section) => (
            <section
              key={section}
              className="min-h-56 rounded-lg border border-white/10 bg-surface p-6 shadow-2xl shadow-black/20"
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                Placeholder
              </p>
              <h2 className="mt-4 text-2xl font-semibold text-text">{section}</h2>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
