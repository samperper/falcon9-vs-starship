import Bibliography from './components/Bibliography';
import CostCurveChart from './components/CostCurveChart';
import CustomerContext from './components/CustomerContext';
import Section from './components/Section';
import SideBySideModel from './components/SideBySideModel';

function App() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-text">
      <div className="relative border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.055),transparent_45%),radial-gradient(circle_at_70%_10%,rgba(0,119,218,0.16),transparent_28%),radial-gradient(circle_at_88%_18%,rgba(255,107,53,0.12),transparent_22%)]" />
        <div className="relative mx-auto flex min-h-[46vh] w-full max-w-6xl flex-col justify-end px-5 pb-10 pt-14 sm:px-8 lg:px-10 lg:pb-12">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted">
            SpaceX launch economics
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] text-text sm:text-6xl lg:text-7xl">
            Falcon 9 vs Starship
          </h1>
        </div>
      </div>

      <div className="space-y-24 py-16 sm:space-y-28 sm:py-20">
        <Section eyebrow="Section 02" title="The Side-by-Side">
          <SideBySideModel />
          <div className="mt-10 rounded-lg border border-white/10 bg-black/25 p-5 sm:p-6">
            <div className="mb-5 max-w-2xl">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Customer context
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-text">
                Who actually buys launch capacity?
              </h3>
            </div>
            <CustomerContext />
          </div>
        </Section>

        <Section eyebrow="Section 03" title="The $/kg Curve">
          <CostCurveChart />
        </Section>

        <Section eyebrow="Section 04" title="Closer + Sources">
          <Bibliography />
        </Section>
      </div>
    </main>
  );
}

export default App;
