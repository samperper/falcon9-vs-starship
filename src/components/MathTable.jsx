import Cite from './Cite';
import { formatMoneyFull, formatPercent } from '../lib/formatters';

const tableRows = {
  falcon9: [
    { id: 'boosterAmortizationUsd', label: 'Booster build cost / useful flights', inputId: 'boosterBuildCost' },
    { id: 'refurbUsd', label: 'Refurbishment per flight', inputId: 'refurbPerFlight' },
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

function MathTable({ vehicle, economics }) {
  const rows = tableRows[vehicle.calculationModel];
  const listPrice = vehicle.metrics.listPrice.value;
  const contributionMargin = listPrice - economics.marginalCostUsd;

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
          <tr className="bg-white/[0.035] font-semibold text-text">
            <td className="px-4 py-3">Margin %</td>
            <td className="px-4 py-3 text-right">{formatPercent(economics.grossMargin)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MathTable;
