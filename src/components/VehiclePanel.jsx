import MathTable from './MathTable';
import MetricStrip from './MetricStrip';
import SliderControl from './SliderControl';
import Cite from './Cite';

const accentClasses = {
  falcon: {
    border: 'border-falcon/45',
    text: 'text-falcon',
    bg: 'bg-falcon',
  },
  heavy: {
    border: 'border-[#7B61FF]/45',
    text: 'text-[#B7A8FF]',
    bg: 'bg-[#7B61FF]',
  },
  starship: {
    border: 'border-starship/45',
    text: 'text-starship',
    bg: 'bg-starship',
  },
};

function PanelNote({ note, accent }) {
  if (!note) {
    return null;
  }

  return (
    <div className="mt-5 rounded-md border border-white/10 bg-black/25 p-4">
      <p className={`font-mono text-xs font-medium uppercase tracking-[0.16em] ${accentClasses[accent].text}`}>
        {note.title}
        <Cite sourceIds={note.sources} accent={accent} />
      </p>
      <p className="mt-2 text-sm leading-6 text-zinc-400">{note.body}</p>
    </div>
  );
}

function StarshipV3Callout({ context }) {
  if (!context) {
    return null;
  }

  return (
    <div className="mt-5 rounded-md border border-starship/20 bg-starship/10 p-4">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-starship">
        {context.eyebrow}
        <Cite sourceIds={context.sources} accent="starship" />
      </p>
      <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-300">
        {context.items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-starship" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{context.note}</p>
    </div>
  );
}

function VehiclePanel({ vehicle, inputs, economics, onInputChange }) {
  const accent = accentClasses[vehicle.accent];

  return (
    <article className={`rounded-lg border ${accent.border} bg-surface/85 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className={`font-mono text-xs font-medium uppercase tracking-[0.18em] ${accent.text}`}>
            {vehicle.reuseModel}
          </p>
          <h3 className="mt-2 text-3xl font-semibold leading-none text-text">{vehicle.name}</h3>
        </div>
        <div className={`h-2 w-16 rounded-full ${accent.bg}`} />
      </div>

      <MetricStrip vehicle={vehicle} economics={economics} />
      <PanelNote note={vehicle.panelNote} accent={vehicle.accent} />
      <StarshipV3Callout context={vehicle.v3Context} />

      <div className="mt-7 space-y-5">
        {vehicle.interactiveInputOrder.map((inputId) => (
          <SliderControl
            key={inputId}
            id={`${vehicle.id}-${inputId}`}
            definition={vehicle.modelInputs[inputId]}
            value={inputs[inputId]}
            accent={vehicle.accent}
            onChange={(nextValue) => onInputChange(vehicle.id, inputId, nextValue)}
          />
        ))}
      </div>

      <div className="mt-7">
        <MathTable vehicle={vehicle} economics={economics} />
      </div>
    </article>
  );
}

export default VehiclePanel;
