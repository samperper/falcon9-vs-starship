import Cite from './Cite';
import { calculateCostPerKg, readValue } from '../lib/economics';
import { formatCostPerKg, formatMoneyFull, formatPercent } from '../lib/formatters';

const tableRows = {
  falcon9: [
    { id: 'boosterAmortizationUsd', label: 'Booster build cost / useful flights', inputId: 'boosterBuildCost' },
    { id: 'refurbUsd', label: 'Refurbishment per flight', inputId: 'refurbPerFlight' },
    { id: 'stageTwoUsd', label: 'Second stage', inputId: 'stageTwoCost' },
    { id: 'fuelUsd', label: 'Fuel', inputId: 'fuelPerLaunch' },
  ],
  falconHeavy: [
    { id: 'sideBoosterAmortizationUsd', label: 'Two side boosters / useful flights', inputId: 'sideBoosterBuildCost' },
    { id: 'centerCoreUsd', label: 'Center core expended', inputId: 'centerCoreCost' },
    { id: 'stageTwoUsd', label: 'Second stage', inputId: 'stageTwoCost' },
    { id: 'fuelUsd', label: 'Fuel', inputId: 'fuelPerLaunch' },
  ],
  starship: [
    { id: 'superHeavyAmortizationUsd', label: 'Super Heavy build cost / booster flights', inputId: 'boosterUsefulFlights' },
    { id: 'shipAmortizationUsd', label: 'Ship build cost / ship flights', inputId: 'shipUsefulFlights' },
    { id: 'refurbUsd', label: 'Refurbishment per flight', inputId: 'refurbPerFlight' },
    { id: 'fuelUsd', label: 'Fuel', inputId: 'fuelPerLaunch' },
  ],
};

const getArithmeticPayloadMetric = (vehicle) => {
  if (vehicle.id === 'falconHeavy') {
    return vehicle.metrics.payloadToLeoExpendable;
  }

  return (
    vehicle.metrics.listPricePayloadToLeo ??
    vehicle.metrics.payloadToLeo ??
    vehicle.metrics.payloadToLeoReusable ??
    vehicle.metrics.payloadToLeoExpendable
  );
};

function MathTable({ vehicle, economics }) {
  const rows = tableRows[vehicle.calculationModel];
  const listPrice = readValue(vehicle.metrics.listPrice);
  const payloadKg = readValue(getArithmeticPayloadMetric(vehicle));
  const contributionMargin = listPrice - economics.marginalCostUsd;
  const listPricePerKg = calculateCostPerKg(listPrice, payloadKg);
  const marginalCostPerKg = calculateCostPerKg(economics.marginalCostUsd, payloadKg);

  return (
    <div className="overflow-hidden rounded-md border border-white/10 bg-black/30">
      <div className="border-b border-white/10 px-4 py-3">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
          Arithmetic
        </p>
      </div>
      <table className="w-full border-collapse font-mono text-sm tabular-nums">
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-white/[0.07]">
              <td className="px-4 py-3 text-zinc-400">
                {row.label}
                <Cite sourceIds={vehicle.modelInputs[row.inputId].sources} accent={vehicle.accent} />
              </td>
              <td className="px-4 py-3 text-right text-zinc-200">
                {formatMoneyFull(economics.components[row.id])}
              </td>
            </tr>
          ))}
          <tr className="border-b border-white/10 bg-white/[0.035] font-semibold text-text">
            <td className="px-4 py-3">Total marginal cost</td>
            <td className="px-4 py-3 text-right">{formatMoneyFull(economics.marginalCostUsd)}</td>
          </tr>
          <tr className="border-b border-white/[0.07]">
            <td className="px-4 py-3 text-zinc-400">
              List price
              <Cite sourceIds={vehicle.metrics.listPrice.sources} accent={vehicle.accent} />
            </td>
            <td className="px-4 py-3 text-right text-zinc-200">{formatMoneyFull(listPrice)}</td>
          </tr>
          <tr className="border-b border-white/[0.07]">
            <td className="px-4 py-3 text-zinc-400">Contribution margin</td>
            <td className="px-4 py-3 text-right text-zinc-200">
              {formatMoneyFull(contributionMargin)}
            </td>
          </tr>
          <tr className="border-b border-white/15 bg-white/[0.035] font-semibold text-text">
            <td className="px-4 py-3">Margin %</td>
            <td className="px-4 py-3 text-right">{formatPercent(economics.grossMargin)}</td>
          </tr>
          <tr className="border-b border-white/[0.07]">
            <td className="px-4 py-3 text-zinc-400">List price per kg of payload</td>
            <td className="px-4 py-3 text-right text-zinc-200">
              <div>{formatCostPerKg(listPricePerKg)}</div>
              <div className="mt-1 text-[0.68rem] leading-4 text-[var(--text-tertiary)]">
                What the customer pays per kilogram at list price
              </div>
            </td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-zinc-400">Marginal cost per kg of payload</td>
            <td className="px-4 py-3 text-right text-zinc-200">
              <div>{formatCostPerKg(marginalCostPerKg)}</div>
              <div className="mt-1 text-[0.68rem] leading-4 text-[var(--text-tertiary)]">
                SpaceX's estimated operating cost per kilogram flown
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MathTable;
