import { customerTypes } from '../data/marketContext';

function CustomerContext() {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
      {customerTypes.map((customer) => (
        <article
          key={customer.id}
          className="rounded-lg border border-white/10 bg-surface/70 p-5 transition duration-200 hover:border-white/20 hover:bg-white/[0.045]"
        >
          <div className="mb-5 flex items-center justify-between gap-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-black/35 font-mono text-xs font-semibold tracking-[0.12em] text-text">
              {customer.iconLabel}
            </span>
            <span className="rounded-full border border-white/10 px-3 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-zinc-500">
              {customer.priceTier}
            </span>
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
