import { customerTypes } from '../data/marketContext';
import Cite from './Cite';

function CustomerContext() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {customerTypes.map((customer) => (
        <article
          key={customer.id}
          className={`rounded-lg border p-5 transition duration-200 hover:border-white/20 hover:bg-white/[0.045] ${
            customer.featured
              ? 'border-white/15 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,107,53,0.08),rgba(20,20,20,0.78))] md:col-span-2 xl:col-span-4'
              : 'border-white/10 bg-surface/70'
          }`}
        >
          <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
            <div className="flex items-center gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/35 font-mono text-xs font-semibold tracking-[0.12em] text-text">
                {customer.iconLabel}
              </span>
              <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-zinc-500">
                {customer.priceTier}
              </span>
            </div>
            {customer.sources ? <Cite sourceIds={customer.sources} accent="starship" /> : null}
          </div>
          <h3 className="text-lg font-semibold leading-snug text-text">{customer.title}</h3>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{customer.examples.join(' / ')}</p>
          <p className="mt-4 text-sm leading-6 text-zinc-500">{customer.note}</p>
        </article>
      ))}
    </div>
  );
}

export default CustomerContext;
