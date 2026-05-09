# AGENT_LOG

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
