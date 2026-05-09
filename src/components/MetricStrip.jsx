import { formatCostPerKg, formatMoney, formatPercent } from '../lib/formatters';

const metrics = [
  {
    id: 'marginalCostUsd',
    label: 'Marginal cost',
    formatter: formatMoney,
  },
  {
    id: 'costPerKgUsd',
    label: 'Cost / kg to LEO',
    formatter: formatCostPerKg,
  },
  {
    id: 'grossMargin',
    label: 'Gross margin',
    formatter: formatPercent,
  },
];

function MetricStrip({ vehicle, economics }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.id} className="rounded-md border border-white/10 bg-white/[0.025] p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-zinc-500">
            {metric.label}
          </p>
          <p className="mt-2 font-mono text-2xl font-semibold tabular-nums text-text transition-colors duration-150">
            {metric.formatter(economics[metric.id])}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MetricStrip;
