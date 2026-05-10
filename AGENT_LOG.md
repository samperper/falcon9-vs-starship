# AGENT_LOG

## 2026-05-10 - Desktop metric-card layout fix

Implemented:
- Updated the metric strip so each metric card has a `min-w-[100px]`, `p-3` internal padding, and `gap-3` spacing.
- Changed the metric strip to stack vertically until the `xl` breakpoint, where the 100px cards plus gaps fit inside the equal-width vehicle columns.
- Kept the vehicle model grid as `grid-cols-1 md:grid-cols-3` so the three vehicle columns remain equal width above mobile and stacked below 768px.
- Removed the extra large-screen padding on the model shell so each vehicle column has enough room for a 324px metric-card row at the 1280px layout budget.
- Shortened the Falcon Heavy subtitle to "Three Falcon 9-derived cores; side boosters often recovered".

Verification:
- `npm run build` passed. Vite still reports the existing non-failing Recharts chunk-size warning.
- A layout budget check for 1280px, 1440px, and 1920px confirmed each equal vehicle column has 328px available and the metric row needs 324px, so the 100px cards plus `gap-3` fit at all requested widths.
- Browser check in the available VS Code tab confirmed no console warnings/errors, the shortened Falcon Heavy subtitle, equal rendered vehicle columns, metric cards above 100px, no metric label wrapping, and no overflow. The shared tab still exposes a fixed 924px document width, so the requested 1280/1440/1920 checks were verified through the deterministic Tailwind layout budget rather than that tab's document width.

Notes / follow-up:
- Live URL for final human review: https://falcon9-vs-starship.vercel.app

## 2026-05-09 - Final review polish fixes

Implemented:
- Replaced the Falcon Heavy top-card note with the requested final copy: "At $97M for 63,800 kg, Falcon Heavy has the lowest list $/kg of any operational rocket flying today."
- Updated the interactive model grid so Falcon 9, Falcon Heavy, and Starship use equal-width columns from the `md` breakpoint up, and stack full width below 768px in vehicle order.
- Shortened metric labels to MARGINAL COST, COST / KG, and MARGIN, with non-wrapping labels and consistent metric-number sizing across all three vehicles.
- Added additive hover/focus/click tooltips to the numbered $/kg curve markers. Tooltips show the marker number, milestone label, year/detail, $/kg value, and source superscript while preserving the legend below the chart.
- Ran a responsive text/layout pass on the vehicle panels, metric cards, opener prose, closer prose, and curve tooltip layer.

Verification:
- `npm run build` passed. Vite still reports the existing non-failing Recharts chunk-size warning.
- Browser check confirmed exact Falcon Heavy copy, equal desktop/tablet column widths, no metric label wrapping, no desktop overflow, working marker hover tooltip, and working marker tap/dismiss behavior. The VS Code browser viewport API accepted a 390px viewport but exposed a fixed 924px document width, so the mobile guarantee is enforced through Tailwind breakpoints and component structure rather than a true 375px measurement in that shared tab.

Notes / follow-up:
- Live URL for final human review: https://falcon9-vs-starship.vercel.app

## 2026-05-09 - Phase 4 prose and README finalization

Implemented:
- Added the user-provided opener text exactly as supplied in a new Section 01 before the model and charts.
- Added the user-provided closer text exactly as supplied in Section 04 before the bibliography/source list.
- Finalized `README.md` with the live URL, one-sentence project description, Sam Perper author line, and public-source methodology note.

Verification:
- `npm run build` passed. Vite still reports the existing non-failing Recharts chunk-size warning.

Notes / follow-up:
- Live URL for final human review: https://falcon9-vs-starship.vercel.app

## 2026-05-09 - Research updates before Phase 4 close

Read `Launch_Report_Findings` first and used it as the source packet for the requested material updates. The file was untracked at session start and is part of this update set because it contains the research backing for the changes.

Implemented:
- Corrected the Starship $/kg curve language and data so the projection now separates the $100-$500/kg near-term analyst range from the $10-$50/kg long-term target.
- Added a below-chart note that Musk's $10/kg target is a long-run marginal-cost floor, not a near-term price, and cited SpaceX's October 2025 $100M per metric ton lunar/Mars surface-cargo pricing update.
- Updated Starship development cost to $15B with Bloomberg / Reuters May 1, 2026 sourcing.
- Added Starship V3 context to the Starship model panel: Flight 12 debut timing, ~100t reusable / 180-200t expendable payload, Raptor 3 thrust, integrated docking adapter, tanker/depot architecture, and variant family.
- Updated Falcon Heavy launch-count context to 12 total launches, 0 in 2025, 1 in 2026, and 100% mission success as of May 2026, with the payload-delay and NSSL Phase 3 Lane 2 notes in the data layer.
- Promoted Falcon Heavy from static reference into a third interactive economics column. The model uses Falcon 9-like side-booster cost and reuse sliders, a fixed expended $40M center core, Falcon-family stage 2 cost, ~$600K fuel, $97M list price, and ~27,000 kg reusable-side-booster LEO payload for marginal $/kg.
- Kept the top Falcon Heavy comparison card focused on the counterintuitive $1,520/kg operational list-price floor using $97M / 63,800 kg expendable LEO capacity.
- Updated cost-stack chart support for Falcon Heavy hardware, stage 2, and fuel colors.
- Reduced the hero/header vertical spacing so the first content begins higher on a 1080p monitor.

Verification:
- `npm run build` passed. Vite still reports the existing non-failing Recharts chunk-size warning.
- Node sanity check confirmed Starship development cost is $15B, Starship surface cargo pricing is $100,000/kg, Falcon Heavy launch count is 12, Falcon Heavy list $/kg rounds to $1,520/kg, and Falcon Heavy default marginal model outputs about $58.6M per launch / $2,170/kg / 39.6% margin.
- Browser smoke test confirmed no console warnings/errors, no mobile horizontal overflow, Falcon Heavy interactive sliders render, the Starship V3 callout renders, and the corrected curve note renders.

Notes / follow-up:
- The local review server is intended to remain available at `http://127.0.0.1:5173/` for final human review after this pass.
- Phase 4 prose and final README/source-polish work should still be reviewed by the human before publication.

## 2026-05-09 - Pre-Phase 4 polish: Falcon Heavy top section + curve annotations

Started from a clean working tree after the Falcon Heavy / Dragon context commit had been pushed. Treated this as a pre-Phase-4 polish pass only; no opener/closer prose work was started.

Implemented:
- Promoted Falcon Heavy into the main Section 02 comparison row alongside Falcon 9 and Starship.
- Kept Falcon Heavy as a static reference card only: LEO payload, list price, list $/kg, reuse model, and a reference-only note pointing back to the interactive model below.
- Left the interactive marginal-cost model scoped to Falcon 9 and Starship by keeping `vehicleOrder` unchanged.
- Removed the separate lower "Launch vehicle reference" block because its content is now native to the top comparison.
- Reworked the Section 03 $/kg curve annotation system: removed floating in-chart text labels, kept the log-scale line/projection/uncertainty band, added numbered marker circles on the plot, and moved cited milestone detail into a two-column legend below the chart.
- Added a dedicated `costCurveAnnotations` dataset so legend entries and chart markers stay explicit and ordered.
- Updated the cost stack chart to use the requested high-contrast colors for Falcon 9 and Starship segments.
- Replaced the old paired-dot cost-stack legend with a custom solid-swatch legend using 12px swatches, mono labels, left alignment, and mobile wrapping.

Verification:
- `npm run build` passed. Vite still reports the existing non-failing Recharts chunk-size warning.
- Browser smoke test confirmed no console warnings/errors, Falcon Heavy appears in the top Section 02 comparison, the lower reference block is gone, numbered curve markers 1-8 render, cited legend entries render below the curve, and the requested cost-stack legend colors are present.

Notes / follow-up:
- Phase 4 remains reserved for human opener/closer prose, source-list presentation polish, README finalization, and final responsive review.

## 2026-05-09 - Falcon Heavy / Dragon expansion + Starship slider fix

Started from a clean working tree after Phase 3 was already complete and pushed. Re-read `PROJECT_BRIEF.md`, `AGENT_LOG.md`, and `STATUS.md` first. The original brief excluded a Falcon Heavy section, so this session treated the user's newer instruction as a scoped override: add Falcon Heavy as reference context only, not as a new interactive model or extra section.

Research and source resolution:
- SpaceX Falcon Heavy page verified payload to LEO 63,800 kg, GTO 26,700 kg, payload to Mars 16,800 kg, three Falcon 9-derived reusable cores, and Falcon 9-derived architecture.
- Current SpaceX Capabilities PDF only exposed the Falcon 9 price sheet during text extraction. Used the Internet Archive capture of SpaceX's 2022 Capabilities & Services PDF and rendered it locally with `qlmanage` to visually verify Falcon Heavy $97M standard payment plan, 8 metric tons to GTO, 63,800 kg to LEO, 26,700 kg to GTO, and 16,800 kg to Mars.
- SpaceX Launches page was used to count Falcon Heavy completed missions visible during research: 12 total flights through the April 29, 2026 ViaSat-3 F3 mission. This should be refreshed before publication because it is a live count.
- SpaceX Dragon page verified up to 7 passengers, 6,000 kg launch payload mass, 3,000 kg return payload mass, and Dragon's cargo-return significance.
- SpaceX updates page verified Dragon fleet-history context: 45 missions in the July 2024 Dragon recovery update and 46 missions in the August 2024 Fram2 update. Used 46 as a conservative dated fleet-history anchor, not a live current counter.
- NASA Commercial Crew award page verified SpaceX's $2.6B CCtCap award and the mission structure context.
- NASA OIG report IG-20-005 verified estimated Commercial Crew seat costs: approximately $55M for SpaceX and approximately $90M for Boeing. Added a derived $220M four-seat mission estimate with an explicit note that it is not a SpaceX list price.
- NASA Falcon Heavy launch-service contract pages for Roman, GOES-U, and Europa Clipper were consulted as government mission-price context, but not used for the public Falcon Heavy list-price card because those totals include mission-related services.
- CNBC and Wikipedia were consulted only as cross-checks for Falcon Heavy history/price context; they were not used as source keys for new data values.

Implemented:
- Added Falcon Heavy and Dragon source records in `src/data/sources.js`.
- Added `vehicles.falconHeavy` with sourced payloads, $97M list-price anchor, derived $1,520/kg list-price metric, reuse model note, first-flight context, and 12-flight count.
- Added `vehicles.dragon` as a top-level spacecraft entity with Crew/Cargo variants, crew capacity, launch/return payload mass, NASA OIG seat-cost economics, derived four-seat mission estimate, primary customers, Falcon 9 dependency, and economic-significance note.
- Kept `vehicleOrder` unchanged at Falcon 9 and Starship so Falcon Heavy cannot become a slider model accidentally. Added `launchVehicleReferenceOrder` for the static reference cards.
- Fixed Starship booster useful flights by splitting stack amortization into Super Heavy and Ship portions using Payload Research's $63M / $27M stack-cost split. Booster useful flights now independently changes Super Heavy amortization, while ship useful flights changes ship amortization.
- Updated the arithmetic table and stacked cost chart to use the split Starship amortization.
- Added a static launch vehicle reference card below the interactive model for Falcon 9, Falcon Heavy, and Starship: LEO payload, list price, list $/kg, and reuse model.
- Added Dragon as a featured customer-context card.
- Added Falcon Heavy to the $/kg curve as a muted tertiary marker using the derived $97M / 63,800 kg list-price position.

Verification:
- `npm run build` passed. Vite still reports the existing non-failing Recharts chunk-size warning.
- Node sanity check confirmed Starship default marginal cost remains about $12.4M and raising booster useful flights to 20 lowers marginal cost to about $9.25M.
- Browser smoke test confirmed Falcon Heavy reference card, Dragon card, and Falcon Heavy curve label render; Starship booster slider changes total marginal cost; and 390px mobile has no horizontal overflow.

Notes / follow-up:
- Falcon Heavy total flights is inherently time-sensitive and should be refreshed from SpaceX's launch listing before final publication.
- Dragon fleet mission count is a dated SpaceX update anchor, not a live current-count claim.
- Phase 4 remains the human-prose/source-polish/readme/final-review pass.

## 2026-05-09 - Phase 2 fixes + Phase 3 curve

Started from STATUS.md with current phase set to Phase 3. AGENT_LOG.md did not exist at session start, so this file was created during the session.

Completed pre-Phase-3 fixes before starting the curve:
- Fixed cost stack chart segments so Falcon 9 uses a blue family and Starship uses an orange family instead of grey segment colors.
- Polished the ULA price ceiling toggle with a 200ms animated pill/thumb and a subtle chart overlay labeled "ULA era".
- Removed citations from top metric cards.
- Updated arithmetic-table citations to one source marker per row, accent-colored on hover, with tooltip/link behavior.
- Added a numbered bibliography in the sources section with title, publisher, date, and URL.
- Ran `npm run build` successfully.
- Committed fixes as `32ed59e Fix Phase 2 chart and citation polish` before starting Phase 3.

Completed Phase 3:
- Added `src/data/costCurve.js` with sourced historical and projected $/kg points.
- Added source entries for NASA Shuttle context, Falcon 9 landing/Block 5 milestones, and Starship Flight 5.
- Built a custom log-scale $/kg curve in `src/components/CostCurveChart.jsx`.
- Added observed solid line, projected dashed line, Starship uncertainty band, milestone dots, point labels, and citations.
- Replaced the Section 03 placeholder with the completed curve.

Verification:
- `npm run build` passed after the Phase 2 fixes.
- `npm run build` passed after Phase 3 implementation.
- Browser smoke test confirmed no console errors, no 375px mobile horizontal overflow, rendered curve/milestones/bibliography, ULA overlay text, and accent-colored cost stack fills.

Notes / follow-up:
- Vite reports a non-failing chunk-size warning because Recharts is in the bundle.
- Phase 4 should add the human-written opener/closer prose, source-list polish, README finalization, and final deployment review.
