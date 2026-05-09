import { formatInputValue } from '../lib/formatters';

const accentClass = {
  falcon: 'accent-falcon',
  starship: 'accent-starship',
};

function SliderControl({ id, definition, value, accent, onChange }) {
  const range = definition.value;
  const min = range.low;
  const max = range.high;
  const percentComplete = ((value - min) / (max - min)) * 100;

  return (
    <label className="block space-y-3" htmlFor={id}>
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-medium text-zinc-300">{definition.label}</span>
        <span className="font-mono text-sm tabular-nums text-text">
          {formatInputValue(value, definition.unit)}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={definition.step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={`model-slider ${accentClass[accent]}`}
        style={{ '--slider-progress': `${percentComplete}%` }}
      />
      <div className="flex justify-between font-mono text-[0.68rem] uppercase tracking-[0.12em] text-zinc-600">
        <span>{formatInputValue(min, definition.unit)}</span>
        <span>{formatInputValue(max, definition.unit)}</span>
      </div>
    </label>
  );
}

export default SliderControl;
