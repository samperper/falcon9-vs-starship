import MathTable from './MathTable';
import MetricStrip from './MetricStrip';
import SliderControl from './SliderControl';

function VehiclePanel({ vehicle, inputs, economics, onInputChange }) {
  const accentBorder = vehicle.accent === 'falcon' ? 'border-falcon/45' : 'border-starship/45';
  const accentText = vehicle.accent === 'falcon' ? 'text-falcon' : 'text-starship';
  const accentBg = vehicle.accent === 'falcon' ? 'bg-falcon' : 'bg-starship';

  return (
    <article className={`rounded-lg border ${accentBorder} bg-surface/85 p-5 shadow-2xl shadow-black/30 backdrop-blur sm:p-6`}>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className={`font-mono text-xs font-medium uppercase tracking-[0.18em] ${accentText}`}>
            {vehicle.reuseModel}
          </p>
          <h3 className="mt-2 text-3xl font-semibold leading-none text-text">{vehicle.name}</h3>
        </div>
        <div className={`h-2 w-16 rounded-full ${accentBg}`} />
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
