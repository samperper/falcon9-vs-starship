STATUS
Current phase
Phase 1: Data + Math

Done

- Renamed project brief to PROJECT_BRIEF.md
- Initialized Vite + React 18 project scaffold
- Installed Tailwind CSS and configured the brief's dark palette
- Loaded Inter and IBM Plex Mono from Google Fonts
- Built a minimal page shell with the project title and four placeholder sections
- Confirmed `npm run build` passes

Next

- Create src/data/vehicles.js with the comparison table values, sourced
- Create src/lib/economics.js with pure functions for marginal cost, cost per kg, and gross margin
- Keep all numeric assumptions flowing from src/data/ through src/lib/ into components
- Add source comments with URLs for every value in src/data/
- Sanity-check outputs against published estimates
- Run `npm run build`
- Update STATUS.md to mark Phase 1 done, Phase 2 next
- Commit and push Phase 1 when complete
- Stop and report back for review before Phase 2

Blockers / questions for human

- Human should spot-check the data layer after Phase 1 against original sources, per the brief.

Last updated
May 9, 2026
