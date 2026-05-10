STATUS
Current phase
Phase 4: Wrap

Done

- Renamed project brief to PROJECT_BRIEF.md
- Initialized Vite + React 18 project scaffold
- Installed Tailwind CSS and configured the brief's dark palette
- Loaded Inter and IBM Plex Mono from Google Fonts
- Built a minimal page shell with the project title and four placeholder sections
- Confirmed `npm run build` passes
- Added src/data/sources.js as a keyed source registry with source tiers
- Added src/data/vehicles.js with sourced value objects, ranges, notes, units, and as-of dates
- Added src/lib/economics.js with pure helpers for value ranges, marginal cost, cost per kg, and gross margin
- Preserved disputed Falcon 9 marginal cost as a $15M-$37M range with a $25M midpoint
- Added Voyager 10-K placeholder citation for Starship's $90M launch price
- Sanity-checked default model outputs against published estimates
- Confirmed `npm run build` passes after Phase 1
- Updated Voyager 10-K citation with confirmed SEC filing PDF URL
- Built the interactive side-by-side model with custom Falcon 9 and Starship sliders
- Added live marginal cost, cost per kg, gross margin, and Starship savings per kg outputs
- Added a financial-model-style arithmetic table with source superscripts
- Added a stacked marginal-cost chart with a price-ceiling toggle for ULA historical pricing context
- Added a compact customer-context callout for government, commercial, Starlink internal, and emerging launch buyers
- Reworked the page shell into a premium dark editorial layout while keeping opener and closer prose reserved for the human
- Confirmed `npm run build` passes after Phase 2
- Smoke-tested desktop and 375px mobile in browser automation with no console errors and no mobile horizontal overflow
- Fixed Phase 2 cost stack chart colors so Falcon 9 uses blue-family segments and Starship uses orange-family segments
- Polished the ULA price ceiling toggle and chart overlay
- Simplified citations: no metric-card superscripts, one arithmetic-table superscript per cited row, tooltip/link behavior, and numbered bibliography
- Confirmed `npm run build` passes after the Phase 2 fixes
- Committed Phase 2 fixes before starting Phase 3
- Added sourced cost-curve data for Space Shuttle, Atlas V, Falcon 9 expendable/reused/mature, and Starship projected cases
- Built a large custom log-scale $/kg curve with observed solid line, projected dashed line, Starship uncertainty band, and milestone callouts
- Added source citations for cost-curve points and milestones
- Confirmed `npm run build` passes after Phase 3
- Smoke-tested desktop and 375px mobile for Phase 3 with no console errors and no mobile horizontal overflow
- Created and updated AGENT_LOG.md with the session entry
- Added Falcon Heavy as sourced static launch-vehicle reference context without adding it to the interactive slider model
- Added Dragon as a sourced top-level spacecraft entity and featured customer-context card
- Added Falcon Heavy to the $/kg curve as a muted tertiary list-price marker
- Fixed the Starship booster useful-flights slider by splitting Super Heavy and Ship amortization instead of using the lower useful-flight count for the whole stack
- Confirmed `npm run build` passes after the Falcon Heavy / Dragon expansion and Starship slider fix
- Smoke-tested the updated UI at desktop and 390px mobile with no horizontal overflow, and verified the Starship booster slider changes marginal cost
- Updated AGENT_LOG.md with the Falcon Heavy / Dragon expansion and Starship slider fix session entry
- Promoted Falcon Heavy into the main Section 02 top comparison row while keeping the interactive sliders limited to Falcon 9 and Starship
- Removed the lower launch-vehicle reference block now that Falcon Heavy appears natively in the top comparison
- Reworked the $/kg curve so the plot uses numbered marker circles and the cited milestone details live in a two-column legend below the chart
- Updated cost stack chart segments to the requested high-contrast Falcon and Starship palettes with a custom solid-swatch legend
- Confirmed `npm run build` passes after the pre-Phase-4 polish pass
- Browser smoke-tested the pre-Phase-4 polish with no console warnings/errors, numbered curve markers present, lower reference block removed, and requested cost-stack legend colors present
- Applied Launch_Report_Findings research updates before closing Phase 4
- Corrected the Starship $/kg curve to distinguish the $100-$500/kg near-term analyst range from the $10-$50/kg long-term target
- Added the SpaceX October 2025 $100M per metric ton lunar/Mars surface-cargo price note below the curve
- Updated Starship development spend to $15B with Bloomberg / Reuters May 2026 sourcing
- Updated Falcon Heavy launch-count context to 12 launches, 0 in 2025, 1 in 2026, and 100% mission success as of May 2026
- Added Starship V3 context callout covering Flight 12 timing, payload, Raptor 3, refueling architecture, and variants
- Added Falcon Heavy as a third interactive economics model with side-booster reuse sliders, fixed expended center-core line, stage 2, fuel, margin, and $/kg output
- Reduced hero/header vertical spacing so Section 02 appears higher on a 1080p viewport
- Confirmed `npm run build` passes after the research update pass
- Browser smoke-tested the research update pass with no console warnings/errors and no mobile horizontal overflow
- Added the human-provided opener prose as Section 01 before the model and charts
- Added the human-provided closer prose in Section 04 before the source list
- Finalized README.md with the live URL, one-sentence description, author name, and public-source methodology note
- Confirmed `npm run build` passes after adding Phase 4 prose and finalizing README.md
- Updated the Falcon Heavy top-card copy to the final operational list-price $/kg wording
- Tightened the three-column interactive model layout so Falcon 9, Falcon Heavy, and Starship use equal-width columns above mobile and stack below 768px
- Shortened metric labels to MARGINAL COST, COST / KG, and MARGIN, with consistent non-wrapping metric number sizing
- Added hover/focus/click tooltips to numbered $/kg curve markers while keeping the legend below the chart
- Ran a responsive text/layout pass for opener, closer, vehicle cards, metric cards, and curve annotations
- Confirmed `npm run build` passes after the final polish pass
- Fixed the desktop three-column metric card layout by enforcing 100px minimum metric cards, p-3 internal padding, gap-3 spacing, and stacking metric cards below the width where three cards can fit
- Shortened the Falcon Heavy model subtitle to "Three Falcon 9-derived cores; side boosters often recovered"
- Reduced the model shell padding so three equal vehicle columns have enough room for 100px metric cards at 1280px, 1440px, and 1920px layout budgets
- Confirmed `npm run build` passes after the desktop metric-card layout fix
- Verified the available browser render has equal vehicle columns, metric cards above 100px, no metric label wrapping, the shortened Falcon Heavy subtitle, no console warnings/errors, and no overflow
- Removed the redundant Falcon Heavy operational list-price floor card from the interactive column
- Moved the Starship V3 callout into a standalone full-width editorial card above the interactive model panel
- Updated the Starship savings badge to compare against whichever current Falcon model has the higher cost per kg, labeling the badge as Falcon 9 or Falcon Heavy accordingly
- Added the one-line real-time model explainer beneath the "Move the assumptions" headline
- Confirmed `npm run build` passes after the final cleanup pass
- Browser smoke-tested the final cleanup with no console warnings/errors, no overflow, V3 placed before the interactive model, and the redundant Falcon Heavy card removed

Next

- Commit and push the final cleanup pass
- Send the live URL back for final human review

Blockers / questions for human

- Human should still spot-check src/data/vehicles.js and src/data/costCurve.js against original sources.
- Falcon Heavy flight count and Dragon fleet mission count are time-sensitive and should be refreshed before final publication.

Last updated
May 9, 2026
