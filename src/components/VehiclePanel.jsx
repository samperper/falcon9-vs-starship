import MathTable from './MathTable';
import MetricStrip from './MetricStrip';
import SliderControl from './SliderControl';

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

function VehiclePanel({ vehicle, inputs, economics, onInputChange }) {
  const accent = accentClasses[vehicle.accent];

  return (
    <article className={`min-w-0 rounded-lg border ${accent.border} bg-surface/85 p-4 shadow-2xl shadow-black/30 backdrop-blur sm:p-5 lg:p-6 md:p-4 2xl:p-6`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className={`break-words font-mono text-[0.68rem] font-medium uppercase leading-5 tracking-[0.12em] sm:text-xs md:text-[0.62rem] xl:text-[0.68rem] 2xl:text-xs ${accent.text}`}>
            {vehicle.reuseModel}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight text-text sm:text-3xl md:text-2xl 2xl:text-3xl">{vehicle.name}</h3>
        </div>
        <div className={`h-2 w-12 shrink-0 rounded-full sm:w-16 md:w-10 xl:w-14 2xl:w-16 ${accent.bg}`} />
      </div>

      <MetricStrip vehicle={vehicle} economics={economics} />

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
