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
    <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-2 xl:gap-3">
      {metrics.map((metric) => (
        <div key={metric.id} className="min-w-0 rounded-md border border-white/10 bg-white/[0.025] p-3 sm:p-4 md:p-3 2xl:p-4">
          <p className="whitespace-nowrap text-[0.58rem] font-medium uppercase tracking-[0.08em] text-zinc-500 sm:text-[0.64rem] md:text-[0.56rem] xl:text-[0.6rem] 2xl:text-xs">
            {metric.label}
          </p>
          <p className="mt-2 whitespace-nowrap font-mono text-xl font-semibold tabular-nums text-text transition-colors duration-150 sm:text-2xl md:text-xl xl:text-[1.35rem] 2xl:text-2xl">
            {metric.formatter(economics[metric.id])}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MetricStrip;
