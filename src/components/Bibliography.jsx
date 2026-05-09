import { sourceOrder, sources } from '../data/sources';

function getDisplayDate(source) {
  return source.filingDate ?? source.accessDate ?? 'Accessed 2026-05-09';
}

function Bibliography() {
  return (
    <div className="rounded-lg border border-white/10 bg-surface/60 p-5 sm:p-6">
      <div className="mb-5">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Bibliography
        </p>
      </div>
      <ol className="space-y-4">
        {sourceOrder.map((sourceId, index) => {
          const source = sources[sourceId];

          return (
            <li key={sourceId} className="grid gap-3 border-t border-white/[0.07] pt-4 sm:grid-cols-[2.5rem_1fr]">
              <span className="font-mono text-sm tabular-nums text-zinc-600">{index + 1}</span>
              <div>
                <p className="text-sm font-medium leading-6 text-zinc-200">{source.title}</p>
                <p className="text-sm leading-6 text-zinc-500">
                  {source.publisher} - {getDisplayDate(source)}
                </p>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 inline-flex max-w-full items-center gap-2 truncate font-mono text-xs text-zinc-500 transition hover:text-text"
                >
                  <span className="inline-flex h-4 w-4 items-center justify-center rounded-sm border border-white/15 text-[0.55rem]">
                    URL
                  </span>
                  <span className="truncate">{source.url}</span>
                </a>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

export default Bibliography;
