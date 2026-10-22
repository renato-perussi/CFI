# AGENTS.md — CFI

Single app lives in `calculadora-fi/`. Run ALL npm commands there, never at root. No monorepo, no CI, no `opencode.json`.

## Commands (`cd calculadora-fi`)

- `npm run dev` — Vite HMR at `:5173`
- `npm run build` — `tsc -b && vite build` (typecheck is part of build; no separate command)
- `npm run test` — `vitest run` (all; ~123 tests / 10 files)
- `npx vitest run <path>` — single suite, e.g. `npx vitest run src/utils/calculations.test.ts`
- `npm run lint` / `npm run lint:fix` — OxLint (not ESLint; rules in `.oxlintrc.json`)
- `npm run format` / `npm run format:check` — Prettier (`printWidth: 100`, single quotes, semi, `es5` trailing commas)
- Requires Node 20+ (Vite 8). `dist/` is gitignored; production build was ~460KB.

## Architecture

- Entry: `src/main.tsx` → `src/App.tsx`. `App` lazy-loads (`lazy`+`Suspense`) `results/FinancingComparison` and `education/EducationalContent`.
- State: `hooks/useFormCalculator` (masked inputs + validation) → `hooks/useFinancing` (orchestrates calc). Domain logic is pure and testable in `utils/calculations.ts`, `utils/csv.ts`, `utils/format.ts`.
- Feature folders under `src/components/`: `form/`, `results/` (LineChart/Chart.js, AmortizationTable + `ui/Pagination` at 20 rows/page, `ExportCSVButton`, `WhatsAppShareButton`), `education/`, `layout/`, `ui/`.
- Test setup is load-bearing: `vite.config.ts` needs `globals: true`, `environment: jsdom`, `setupFiles: ./src/test/setup.ts`, `css: true`.

## Gotchas

- Currency mask divides raw digits by 100 (`formatarEntradaMoeda` in `utils/format.ts`): to get R$ 500.000,00 fill `50000000`, not `500000`. Same for percent (`085` → `0,85`).
- Business rules enforced in `useFormCalculator`: entrada ≥ 20% and < valor; taxa 0–20%/mês; prazo 1–600. Keep messages in pt-BR.
- CSV is pt-BR format (`;` separator, `,` decimal) with `SAC —` / `PRICE —` sections (`utils/csv.ts`); check Excel/Sheets compat on change.
- Tailwind is v4 via `@tailwindcss/vite` plugin, not a config file.
- `docs/screenshots/*.png` are manual browser captures for `README.md`, not generated — redo via `dev` + fill + screenshot if UI changes.
- `PRD.md` (v1.3) and `SPRINTS.md` (Sprints 1–12) are currently untracked working docs but authoritative for scope; root `README.md` is the usage source of truth.
