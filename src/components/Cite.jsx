import { sourceOrder, sources } from '../data/sources';

const getCitationNumber = (sourceId) => sourceOrder.indexOf(sourceId) + 1;

function Cite({ sourceIds = [] }) {
  if (!sourceIds.length) {
    return null;
  }

  const label = sourceIds
    .map((sourceId) => getCitationNumber(sourceId))
    .filter(Boolean)
    .join(',');
  const title = sourceIds
    .map((sourceId) => sources[sourceId])
    .filter(Boolean)
    .map((source) => `${source.publisher}: ${source.title}`)
    .join('\n');

  return (
    <sup
      className="ml-1 align-super font-sans text-[0.62rem] font-medium leading-none text-zinc-500"
      title={title}
    >
      {label}
    </sup>
  );
}

export default Cite;
