import { useMemo, useState } from 'react';
import Cite from './Cite';
import CostStackedBar from './CostStackedBar';
import VehiclePanel from './VehiclePanel';
import { priceCeilingBand } from '../data/marketContext';
import { launchVehicleReferenceOrder, vehicles, vehicleOrder } from '../data/vehicles';
import { calculateCostPerKg, calculateVehicleEconomics, getDefaultInputs, readValue } from '../lib/economics';
import { formatCostPerKg, formatMoneyFull, wholeNumber } from '../lib/formatters';

const initialInputs = Object.fromEntries(
  vehicleOrder.map((vehicleId) => [vehicleId, getDefaultInputs(vehicles[vehicleId])]),
);

const referenceAccentClass = {
  falcon: 'border-falcon/30 text-falcon',
  heavy: 'border-[#7B61FF]/35 text-[#B7A8FF]',
  starship: 'border-starship/30 text-starship',
};

const referenceOnlyClass = {
  falcon: 'border-falcon/20 bg-falcon/5',
  heavy: 'border-[#7B61FF]/30 bg-[#7B61FF]/10',
  starship: 'border-starship/20 bg-starship/5',
};

const getReferencePayloadMetric = (vehicle) =>
  vehicle.metrics.payloadToLeo ?? vehicle.metrics.payloadToLeoExpendable;

function VehicleSnapshotCards() {
  return (
    <div className="grid gap-3 lg:grid-cols-3">
      {launchVehicleReferenceOrder.map((vehicleId) => {
          const vehicle = vehicles[vehicleId];
          const payloadMetric = getReferencePayloadMetric(vehicle);
          const listPriceUsd = readValue(vehicle.metrics.listPrice);
          const payloadKg = readValue(payloadMetric);
          const listCostPerKg = calculateCostPerKg(listPriceUsd, payloadKg);
          const citationAccent = vehicle.accent === 'starship' ? 'starship' : vehicle.accent === 'heavy' ? 'heavy' : 'falcon';

        return (
          <article
            key={vehicle.id}
            className={`flex min-h-[18rem] flex-col justify-between rounded-lg border p-5 ${referenceOnlyClass[vehicle.accent]}`}
          >
            <div>
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                    {vehicle.accent === 'heavy' ? 'Lowest operational list $/kg' : 'Primary comparison'}
                  </p>
                  <h4 className="mt-2 text-2xl font-semibold leading-tight text-text">{vehicle.shortName}</h4>
                </div>
                <span className={`rounded-full border px-2.5 py-1 font-mono text-[0.68rem] uppercase tracking-[0.12em] ${referenceAccentClass[vehicle.accent]}`}>
                  {vehicle.accent === 'heavy' ? 'Active' : vehicle.shortName}
                </span>
              </div>
              <dl className="grid grid-cols-2 gap-x-4 gap-y-4 font-mono text-sm tabular-nums">
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-zinc-500">LEO payload</dt>
                  <dd className="mt-1 text-zinc-200">
                    {wholeNumber.format(payloadKg)} kg
                    <Cite sourceIds={payloadMetric.sources} accent={citationAccent} />
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-zinc-500">List price</dt>
                  <dd className="mt-1 text-zinc-200">
                    {formatMoneyFull(listPriceUsd)}
                    <Cite sourceIds={vehicle.metrics.listPrice.sources} accent={citationAccent} />
                  </dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-zinc-500">List $/kg</dt>
                  <dd className="mt-1 text-zinc-200">{formatCostPerKg(listCostPerKg)}</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-[0.12em] text-zinc-500">Reuse model</dt>
                  <dd className="mt-1 font-sans text-xs leading-5 text-zinc-400">{vehicle.reuseModel}</dd>
                </div>
              </dl>
            </div>
            {vehicle.id === 'falconHeavy' ? (
              <p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-zinc-500">
                At $97M for 63,800 kg, Falcon Heavy has the lowest list $/kg of any operational rocket flying today.
              </p>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

function SideBySideModel() {
  const [inputsByVehicle, setInputsByVehicle] = useState(initialInputs);
  const [showPriceCeiling, setShowPriceCeiling] = useState(false);

  const items = useMemo(
    () =>
      vehicleOrder.map((vehicleId) => {
        const vehicle = vehicles[vehicleId];
        return {
          vehicle,
          inputs: inputsByVehicle[vehicleId],
          economics: calculateVehicleEconomics(vehicle, inputsByVehicle[vehicleId]),
        };
      }),
    [inputsByVehicle],
  );

  const falconCostPerKg = items.find((item) => item.vehicle.id === 'falcon9').economics.costPerKgUsd;
  const starshipCostPerKg = items.find((item) => item.vehicle.id === 'starship').economics.costPerKgUsd;
  const starshipSavingsPerKg = Math.max(0, falconCostPerKg - starshipCostPerKg);

  const handleInputChange = (vehicleId, inputId, nextValue) => {
    setInputsByVehicle((currentInputs) => ({
      ...currentInputs,
      [vehicleId]: {
        ...currentInputs[vehicleId],
        [inputId]: nextValue,
      },
    }));
  };

  return (
    <div className="space-y-8">
      <div className="rounded-lg border border-white/10 bg-[radial-gradient(circle_at_top_left,rgba(0,119,218,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(255,107,53,0.16),transparent_30%),#0d0d0d] p-5 shadow-2xl shadow-black/40 sm:p-6 lg:p-8">
        <div className="mb-7 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Live economics model
            </p>
            <h3 className="mt-3 text-3xl font-semibold leading-tight text-text sm:text-4xl">
              Move the assumptions. Watch the launch economics re-price.
            </h3>
          </div>
          <div className="rounded-md border border-white/10 bg-black/35 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-zinc-500">
              Starship saves
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-starship">
              {formatCostPerKg(starshipSavingsPerKg)}
            </p>
            <p className="text-xs text-zinc-500">vs Falcon 9</p>
          </div>
        </div>

        <VehicleSnapshotCards />

        <div className="my-7 flex items-center gap-3">
          <span className="h-px flex-1 bg-white/10" />
          <span className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Interactive marginal-cost model
          </span>
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {items.map((item) => (
            <VehiclePanel
              key={item.vehicle.id}
              vehicle={item.vehicle}
              inputs={item.inputs}
              economics={item.economics}
              onInputChange={handleInputChange}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex-1">
          <CostStackedBar
            items={items}
            showPriceCeiling={showPriceCeiling}
            priceCeilingBand={priceCeilingBand}
          />
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={showPriceCeiling}
          onClick={() => setShowPriceCeiling((isVisible) => !isVisible)}
          className="group rounded-lg border border-white/10 bg-surface p-5 text-left transition duration-200 hover:border-white/20 hover:bg-white/[0.045] lg:w-72"
        >
          <span className="flex items-center justify-between gap-4">
            <span>
              <span className="block font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
                Price ceiling
              </span>
              <span className="mt-2 block text-sm leading-6 text-zinc-300">
                Overlay legacy ULA-style pricing as a market reference band.
              </span>
            </span>
            <span
              className={`relative h-7 w-12 rounded-full border transition-colors duration-200 ${
                showPriceCeiling ? 'border-starship bg-starship' : 'border-white/15 bg-black/50'
              }`}
            >
              <span
                className={`absolute left-1 top-1 h-5 w-5 rounded-full transition-transform duration-200 ${
                  showPriceCeiling ? 'translate-x-5 bg-background' : 'translate-x-0 bg-zinc-500'
                }`}
              />
            </span>
          </span>
        </button>
      </div>
    </div>
  );
}

export default SideBySideModel;
