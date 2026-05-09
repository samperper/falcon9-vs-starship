import { useEffect, useMemo, useRef, useState } from 'react';
import Cite from './Cite';
import { costCurveMilestones, costCurvePoints } from '../data/costCurve';
import { formatCostPerKg } from '../lib/formatters';

const yTicks = [100_000, 10_000, 1_000, 100, 10];
const yearTicks = [2011, 2015, 2020, 2025, 2029, 2032];
const minYear = 2011;
const maxYear = 2032;
const minCost = 10;
const maxCost = 100_000;

const labelOffsets = {
  spaceShuttle: { x: 12, y: -26, align: 'left' },
  atlasV: { x: 12, y: -18, align: 'left' },
  falcon9Expendable: { x: 12, y: -14, align: 'left' },
  falcon9Reused: { x: 12, y: -10, align: 'left' },
  falcon9Mature: { x: -12, y: 22, align: 'right' },
  starshipNearTerm: { x: -10, y: -44, align: 'right' },
  starshipAtScale: { x: -10, y: 12, align: 'right' },
};

const milestoneOffsets = {
  firstFalconLanding: { x: 18, y: 26, align: 'left' },
  falconBlock5: { x: 14, y: 36, align: 'left' },
  starshipFlight5: { x: -18, y: -54, align: 'right' },
  voyagerStarlab: { x: 16, y: 36, align: 'left' },
};

const log10 = (value) => Math.log10(value);

function useMeasuredWidth() {
  const ref = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const updateWidth = () => setWidth(Math.max(320, Math.floor(node.getBoundingClientRect().width)));
    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return [ref, width];
}

function toPath(points) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
}

function CostCurveChart() {
  const [containerRef, width] = useMeasuredWidth();
  const height = width < 640 ? 620 : 560;
  const margin = width < 640
    ? { top: 42, right: 24, bottom: 72, left: 62 }
    : { top: 48, right: 42, bottom: 70, left: 78 };
  const plotWidth = Math.max(1, width - margin.left - margin.right);
  const plotHeight = height - margin.top - margin.bottom;

  const scales = useMemo(() => {
    const xScale = (year) => margin.left + ((year - minYear) / (maxYear - minYear)) * plotWidth;
    const yScale = (cost) => {
      const ratio = (log10(maxCost) - log10(cost)) / (log10(maxCost) - log10(minCost));
      return margin.top + ratio * plotHeight;
    };

    return { xScale, yScale };
  }, [margin.left, margin.top, plotHeight, plotWidth]);

  const plottedPoints = costCurvePoints.map((point) => ({
    ...point,
    x: scales.xScale(point.year),
    y: scales.yScale(point.value),
  }));
  const observedPoints = plottedPoints.filter((point) => !point.isProjected);
  const projectedPoints = [observedPoints.at(-1), ...plottedPoints.filter((point) => point.isProjected)];
  const starshipRangePoints = costCurvePoints.filter((point) => point.isProjected && point.range);
  const uncertaintyPolygon = [
    ...starshipRangePoints.map((point) => ({ x: scales.xScale(point.year), y: scales.yScale(point.range.high) })),
    ...starshipRangePoints
      .map((point) => ({ x: scales.xScale(point.year), y: scales.yScale(point.range.low) }))
      .reverse(),
  ];
  const milestones = costCurveMilestones.map((milestone) => ({
    ...milestone,
    x: scales.xScale(milestone.year),
    y: scales.yScale(milestone.value),
  }));

  return (
    <div className="rounded-lg border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent),#0d0d0d] p-4 shadow-2xl shadow-black/30 sm:p-6">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.16em] text-zinc-500">
            Log scale
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-text sm:text-3xl">
            The curve that makes reuse obvious
          </h3>
        </div>
        <div className="max-w-sm text-sm leading-6 text-zinc-400">
          Solid line is observed launch cost; dashed line is the Starship projection range.
        </div>
      </div>

      <div ref={containerRef} className="relative min-h-[620px] w-full sm:min-h-[560px]">
        {width > 0 ? (
          <>
            <svg width={width} height={height} role="img" aria-label="Log-scale cost per kilogram to low Earth orbit over time">
              <defs>
                <linearGradient id="curveGlow" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#E5E5E5" stopOpacity="0.9" />
                  <stop offset="62%" stopColor="#0077DA" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.9" />
                </linearGradient>
              </defs>

              <rect x={margin.left} y={margin.top} width={plotWidth} height={plotHeight} fill="rgba(255,255,255,0.015)" rx="8" />

              {yTicks.map((tick) => {
                const y = scales.yScale(tick);

                return (
                  <g key={tick}>
                    <line x1={margin.left} x2={width - margin.right} y1={y} y2={y} stroke="rgba(255,255,255,0.08)" />
                    <text x={margin.left - 12} y={y + 4} textAnchor="end" className="fill-zinc-500 font-mono text-[11px]">
                      {formatCostPerKg(tick)}
                    </text>
                  </g>
                );
              })}

              {yearTicks.map((tick) => {
                const x = scales.xScale(tick);

                return (
                  <g key={tick}>
                    <line x1={x} x2={x} y1={margin.top} y2={height - margin.bottom} stroke="rgba(255,255,255,0.045)" />
                    <text x={x} y={height - margin.bottom + 30} textAnchor="middle" className="fill-zinc-500 font-mono text-[11px]">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <path d={toPath(uncertaintyPolygon) + ' Z'} fill="rgba(255,107,53,0.14)" stroke="rgba(255,107,53,0.25)" />
              <path d={toPath(observedPoints)} fill="none" stroke="url(#curveGlow)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
              <path d={toPath(projectedPoints)} fill="none" stroke="#FF6B35" strokeDasharray="8 8" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.72" strokeWidth="3" />

              {plottedPoints.map((point) => (
                <circle key={point.id} cx={point.x} cy={point.y} r="5" fill={point.isProjected ? '#FF6B35' : '#0077DA'} stroke="#0A0A0A" strokeWidth="2" />
              ))}

              {milestones.map((milestone) => (
                <g key={milestone.id}>
                  <circle cx={milestone.x} cy={milestone.y} r="7" fill="none" stroke="#E5E5E5" strokeOpacity="0.75" strokeWidth="1.5" />
                  <circle cx={milestone.x} cy={milestone.y} r="2.5" fill="#E5E5E5" />
                </g>
              ))}

              <text x={margin.left} y={height - 18} className="fill-zinc-500 font-mono text-[11px]">
                Cost per kilogram to LEO, USD/kg, log scale
              </text>
            </svg>

            {plottedPoints.map((point) => {
              const offset = labelOffsets[point.id];

              return (
                <div
                  key={point.id}
                  className="absolute max-w-[9rem] text-xs leading-4 text-zinc-400"
                  style={{ left: point.x + offset.x, top: point.y + offset.y, textAlign: offset.align, transform: offset.align === 'right' ? 'translateX(-100%)' : undefined }}
                >
                  <span className="font-medium text-zinc-200">{point.label}</span>
                  <Cite sourceIds={point.sources} accent={point.isProjected ? 'starship' : 'falcon'} />
                  <span className="mt-0.5 block font-mono text-[0.7rem] text-zinc-500">{formatCostPerKg(point.value)}</span>
                </div>
              );
            })}

            {milestones.map((milestone) => {
              const offset = milestoneOffsets[milestone.id];

              return (
                <div
                  key={milestone.id}
                  className="absolute max-w-[13rem] text-xs leading-4 text-zinc-300"
                  style={{ left: milestone.x + offset.x, top: milestone.y + offset.y, textAlign: offset.align, transform: offset.align === 'right' ? 'translateX(-100%)' : undefined }}
                >
                  <span className="font-medium text-text">{milestone.label}</span>
                  <Cite sourceIds={milestone.sources} accent={milestone.id.includes('starship') || milestone.id.includes('voyager') ? 'starship' : 'falcon'} />
                  <span className="mt-0.5 block font-mono text-[0.68rem] uppercase tracking-[0.08em] text-zinc-500">{milestone.detail}</span>
                </div>
              );
            })}
          </>
        ) : null}
      </div>

      <p className="mt-5 max-w-3xl text-sm leading-6 text-zinc-400">
        The economic story is not a straight line downward; it is a step-change curve where reuse turns launch cost from scarce infrastructure into an operating variable.
      </p>
    </div>
  );
}

export default CostCurveChart;
