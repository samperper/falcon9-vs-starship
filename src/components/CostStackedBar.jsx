import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ReferenceArea,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useEffect, useRef, useState } from 'react';
import { formatMoney, toMillions } from '../lib/formatters';

const componentColors = {
  falcon: {
    hardware: '#0077DA',
    refurb: '#0066BB',
    stageTwo: '#0055A0',
    fuel: '#004480',
  },
  starship: {
    hardware: '#FF6B35',
    refurb: '#E55A25',
    stageTwo: '#CC4A15',
    fuel: '#CC4A15',
  },
};

const vehicleAccent = {
  falcon: '#0077DA',
  starship: '#FF6B35',
};

const componentLabels = {
  hardware: 'Vehicle amortization',
  refurb: 'Refurb',
  stageTwo: 'Stage 2',
  fuel: 'Fuel',
};

const getHardwareCost = (economics) =>
  economics.components.boosterAmortizationUsd ??
  economics.components.stackAmortizationUsd ??
  (economics.components.superHeavyAmortizationUsd ?? 0) + (economics.components.shipAmortizationUsd ?? 0);

const getChartData = (items) =>
  items.map(({ vehicle, economics }) => ({
    name: vehicle.name,
    accent: vehicle.accent,
    hardware: toMillions(getHardwareCost(economics)),
    refurb: toMillions(economics.components.refurbUsd ?? 0),
    stageTwo: toMillions(economics.components.stageTwoUsd ?? 0),
    fuel: toMillions(economics.components.fuelUsd ?? 0),
    total: toMillions(economics.marginalCostUsd),
  }));

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) {
    return null;
  }

  const total = payload[0]?.payload?.total ?? 0;

  return (
    <div className="rounded-md border border-white/10 bg-black/90 px-4 py-3 shadow-xl">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</p>
      <p className="mt-1 font-mono text-lg font-semibold tabular-nums text-text">
        {formatMoney(total * 1_000_000)} total
      </p>
      <div className="mt-2 space-y-1">
        {payload
          .filter((item) => item.value > 0)
          .map((item) => (
            <div key={item.dataKey} className="flex justify-between gap-6 text-xs text-zinc-300">
              <span>{componentLabels[item.dataKey]}</span>
              <span className="font-mono tabular-nums">{formatMoney(item.value * 1_000_000)}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

function CostStackedBar({ items, showPriceCeiling, priceCeilingBand }) {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const chartData = getChartData(items);
  const maxTotal = Math.max(...chartData.map((item) => item.total));
  const ceilingRange = priceCeilingBand.value;
  const xMax = showPriceCeiling ? toMillions(ceilingRange.high) + 28 : Math.ceil(maxTotal * 1.35);
  const chartHeight = chartWidth < 520 ? 360 : 300;

  useEffect(() => {
    const node = chartRef.current;

    if (!node) {
      return undefined;
    }

    const updateWidth = () => {
      setChartWidth(Math.max(320, Math.floor(node.getBoundingClientRect().width)));
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="rounded-lg border border-white/10 bg-black/35 p-5 sm:p-6">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Cost stack
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-text">Where the marginal launch cost goes</h3>
        </div>
        <p className="max-w-sm text-sm leading-6 text-zinc-400">
          {showPriceCeiling
            ? 'The shaded band shows legacy launch pricing context; the SpaceX bars stay far to the left.'
            : 'Toggle the price ceiling to see the same costs against the old market baseline.'}
        </p>
      </div>

      <div ref={chartRef} className="min-h-[300px] w-full">
        {chartWidth > 0 ? (
          <BarChart
            width={chartWidth}
            height={chartHeight}
            data={chartData}
            layout="vertical"
            margin={{ top: 20, right: 64, bottom: 26, left: 12 }}
          >
            <CartesianGrid horizontal={false} stroke="rgba(255,255,255,0.08)" />
            <XAxis
              type="number"
              domain={[0, xMax]}
              tickFormatter={(value) => `$${value}M`}
              stroke="rgba(255,255,255,0.28)"
              tick={{ fill: '#A3A3A3', fontSize: 12, fontFamily: 'IBM Plex Mono' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.14)' }}
              tickLine={false}
              label={{ value: 'Marginal cost per launch, USD millions', position: 'insideBottom', offset: -16, fill: '#737373', fontSize: 12 }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={86}
              tick={{ fill: '#E5E5E5', fontSize: 12, fontWeight: 600 }}
              axisLine={false}
              tickLine={false}
            />
            {showPriceCeiling ? (
              <>
                <ReferenceArea
                  x1={toMillions(ceilingRange.low)}
                  x2={toMillions(ceilingRange.high)}
                  stroke="none"
                  fill="rgba(229,229,229,0.025)"
                />
                <ReferenceLine
                  x={toMillions(ceilingRange.mid)}
                  stroke="rgba(229,229,229,0.34)"
                  strokeDasharray="5 7"
                  label={{ value: 'ULA era', fill: '#A3A3A3', fontSize: 12, position: 'right' }}
                />
              </>
            ) : null}
            <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(255,255,255,0.035)' }} />
            <Bar dataKey="hardware" stackId="cost" radius={[4, 0, 0, 4]}>
              {chartData.map((entry) => (
                <Cell key={`hardware-${entry.name}`} fill={componentColors[entry.accent].hardware} />
              ))}
            </Bar>
            <Bar dataKey="refurb" stackId="cost">
              {chartData.map((entry) => (
                <Cell key={`refurb-${entry.name}`} fill={componentColors[entry.accent].refurb} />
              ))}
            </Bar>
            <Bar dataKey="stageTwo" stackId="cost">
              {chartData.map((entry) => (
                <Cell key={`stageTwo-${entry.name}`} fill={componentColors[entry.accent].stageTwo} />
              ))}
            </Bar>
            <Bar dataKey="fuel" stackId="cost" radius={[0, 4, 4, 0]}>
              {chartData.map((entry) => (
                <Cell key={`fuel-${entry.name}`} fill={componentColors[entry.accent].fuel} />
              ))}
              <LabelList
                dataKey="total"
                position="right"
                content={({ x, y, width, height, value, index }) => {
                  const entry = chartData[index] ?? chartData[0];

                  return (
                    <text
                      x={x + width + 10}
                      y={y + height / 2}
                      fill={vehicleAccent[entry.accent]}
                      dominantBaseline="middle"
                      className="font-mono text-xs font-semibold tabular-nums"
                    >
                      {formatMoney(value * 1_000_000)}
                    </text>
                  );
                }}
              />
            </Bar>
          </BarChart>
        ) : null}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-400">
        {Object.entries(componentLabels).map(([id, label]) => (
          <span key={id} className="inline-flex items-center gap-2">
            <span className="inline-flex gap-1">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: componentColors.falcon[id] }} />
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: componentColors.starship[id] }} />
            </span>
            {label}
          </span>
        ))}
        <span className="inline-flex items-center gap-2">
          <span className="h-0 w-5 border-t border-dashed border-zinc-500" />
          ULA reference
        </span>
      </div>
    </div>
  );
}

export default CostStackedBar;
