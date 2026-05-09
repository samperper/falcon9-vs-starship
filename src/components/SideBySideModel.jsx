import { useMemo, useState } from 'react';
import CostStackedBar from './CostStackedBar';
import VehiclePanel from './VehiclePanel';
import { priceCeilingBand } from '../data/marketContext';
import { vehicles, vehicleOrder } from '../data/vehicles';
import { calculateVehicleEconomics, getDefaultInputs } from '../lib/economics';
import { formatCostPerKg } from '../lib/formatters';

const initialInputs = Object.fromEntries(
  vehicleOrder.map((vehicleId) => [vehicleId, getDefaultInputs(vehicles[vehicleId])]),
);

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

        <div className="grid gap-5 xl:grid-cols-2">
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
              className={`relative h-7 w-12 rounded-full border transition ${
                showPriceCeiling ? 'border-starship/50 bg-starship/25' : 'border-white/15 bg-black/50'
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-text transition ${
                  showPriceCeiling ? 'left-6 bg-starship' : 'left-1 bg-zinc-500'
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
