# E2E / Smoke Report - Home Route Migration

## Execution Context

- MCP Chrome automation is not available in this CLI session, so browser-driven E2E could
  not be executed directly.
- Performed runtime smoke validation via local Next.js dev server and HTTP route checks.

## Commands Run

1. `npx next dev -p 3311`
2. Route checks with `curl`:
   - `/`
   - `/home`
   - `/browse/movie`
   - `/popular`

## Results

- `/` returns `307` redirect to `/home`.
- `/home` returns `200`.
- `/browse/movie` returns `200`.
- `/popular` returns `200`.
- Dev server logs show successful compilation for `/`, `/home`, `/browse/[type]`,
  `/popular` with no runtime exceptions during smoke requests.

## Targeted Behavior Validation

- Root redirect objective is satisfied (`/` -> `/home`).
- Home page remains functional at `/home`.
- Route-level loading confusion risk is mitigated structurally by removing root loading
  boundary (`app/loading.tsx`) and scoping home loading to `app/home/loading.tsx`.

## Notes

- A separate `next start` smoke attempt surfaced an existing runtime/tooling issue in this
  environment (Turbopack/Webpack runtime binding mismatch), which is outside the scope of
  this routing change. Dev-mode smoke checks still verified route behavior for this
  feature.
