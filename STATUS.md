STATUS
Current phase
Phase 3: $/kg Curve

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

Next

- Build the historical $/kg curve on a log scale
- Add sourced data points for Atlas V era, Falcon 9 expendable, Falcon 9 reused, Starship near-term target, and Starship at-scale target
- Add annotations for Atlas V era, first Falcon 9 reuse, and Starship operational target
- Style chart axes, labels, callouts, and tooltip intentionally; avoid default Recharts styling
- Keep the chart large, readable, and screenshot-worthy on desktop and mobile
- Run `npm run build`
- Update STATUS.md to mark Phase 3 done, Phase 4 next
- Commit and push Phase 3 when complete
- Stop and report back for review before Phase 4

Blockers / questions for human

- Human should review the Phase 2 interaction/design before Phase 3.
- Human should still spot-check src/data/vehicles.js against original sources, especially the Falcon 9 marginal-cost range.

Last updated
May 9, 2026
