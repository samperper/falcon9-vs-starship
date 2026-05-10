import { sourceOrder, sources } from '../data/sources';

const accentClass = {
  falcon: 'hover:text-falcon focus-visible:text-falcon',
  heavy: 'hover:text-[#B7A8FF] focus-visible:text-[#B7A8FF]',
  starship: 'hover:text-starship focus-visible:text-starship',
  neutral: 'hover:text-text focus-visible:text-text',
};

const getCitationNumber = (sourceId) => sourceOrder.indexOf(sourceId) + 1;

const getYear = (source) => {
  const date = source.filingDate ?? source.accessDate ?? '';
  return date.match(/\d{4}/)?.[0] ?? '2026';
};

function LinkIcon() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5" fill="none">
      <path
        d="M6.5 9.5 9.5 6.5M6.75 4.75l.5-.5a3 3 0 0 1 4.25 4.25l-.5.5M9.25 11.25l-.5.5A3 3 0 0 1 4.5 7.5l.5-.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function Cite({ sourceIds = [], accent = 'neutral' }) {
  const sourceId = sourceIds[0];
  const source = sources[sourceId];
  const number = getCitationNumber(sourceId);

  if (!source || !number) {
    return null;
  }

  return (
    <sup className="relative ml-1 inline-block align-super leading-none">
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className={`group/cite inline-flex cursor-pointer items-center text-[0.6em] font-medium text-[var(--text-tertiary)] no-underline transition-colors duration-150 ${accentClass[accent]}`}
        aria-label={`Open source ${number}: ${source.title}`}
      >
        {number}
        <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 hidden w-56 -translate-x-1/2 rounded-md border border-white/10 bg-black/95 p-3 text-left font-sans text-xs leading-5 text-zinc-300 shadow-2xl group-hover/cite:block group-focus-visible/cite:block">
          <span className="block font-medium text-text">{source.title}</span>
          <span className="mt-1 block text-zinc-500">
            {source.publisher}, {getYear(source)}
          </span>
          <span className="mt-2 inline-flex items-center gap-1 text-zinc-400">
            <LinkIcon />
            Open source
          </span>
        </span>
      </a>
    </sup>
  );
}

export default Cite;
