STATUS
Current phase
Phase 2: Side-by-Side Component

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

Next

- Build the interactive side-by-side model component
- Add custom-styled sliders for Falcon 9 and Starship model inputs
- Display live marginal cost per launch, cost per kg to LEO, and implied gross margin
- Add stacked bar chart showing cost components for each vehicle
- Keep Falcon 9 blue (#0077DA) and Starship orange (#FF6B35) across labels, accents, and chart marks
- Make the component feel premium, responsive, and satisfying to use
- Run `npm run build`
- Update STATUS.md to mark Phase 2 done, Phase 3 next
- Commit and push Phase 2 when complete
- Stop and report back for review before Phase 3

Blockers / questions for human

- Human should spot-check src/data/vehicles.js against original sources, especially the Falcon 9 marginal-cost range and the Voyager 10-K placeholder citation.
- Human should replace the Voyager 10-K placeholder URL with the actual SEC EDGAR filing URL when available.

Last updated
May 9, 2026
