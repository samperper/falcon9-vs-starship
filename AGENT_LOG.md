# AGENT_LOG

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
