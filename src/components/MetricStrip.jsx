import { formatCostPerKg, formatMoney, formatPercent } from '../lib/formatters';

const metrics = [
  {
    id: 'marginalCostUsd',
    label: 'Marginal cost',
    formatter: formatMoney,
  },
  {
    id: 'costPerKgUsd',
    label: 'Cost / kg',
    formatter: formatCostPerKg,
  },
  {
    id: 'grossMargin',
    label: 'Margin',
    formatter: formatPercent,
  },
];

function MetricStrip({ vehicle, economics }) {
  return (
    <div className="grid grid-cols-1 gap-3 xl:grid-cols-3">
      {metrics.map((metric) => (
        <div key={metric.id} className="min-w-[100px] rounded-md border border-white/10 bg-white/[0.025] p-3">
          <p className="whitespace-nowrap text-[0.62rem] font-medium uppercase tracking-[0.08em] text-zinc-500 2xl:text-xs">
            {metric.label}
          </p>
          <p className="mt-2 whitespace-nowrap font-mono text-base font-semibold tabular-nums text-text transition-colors duration-150 2xl:text-lg">
            {metric.formatter(economics[metric.id])}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MetricStrip;
