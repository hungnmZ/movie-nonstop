# Task List - Home Route Migration

## Status Legend

- `pending`: not started
- `in_progress`: currently executing
- `completed`: finished

## Tasks

1. **Create mandatory task workspace documents**
   - Mode: `serial`
   - Depends on: none
   - Status: `completed`
   - Notes: Created `01-plan.md`, `02-task-list.md`, `03-test-plan.md`.

2. **Run parallel subagent discovery and capture reports**
   - Mode: `parallel`
   - Depends on: 1
   - Status: `completed`

3. **Move home route implementation to `/home`**
   - Mode: `serial`
   - Depends on: 2
   - Status: `completed`
   - Notes:
     - Create `app/home/page.tsx`.
     - Move home loading UI to `app/home/loading.tsx`.

4. **Convert root route to redirect and update related links**
   - Mode: `serial`
   - Depends on: 3
   - Status: `completed`
   - Notes:
     - Update `app/page.tsx` to redirect `/` -> `/home`.
     - Remove root loading boundary (`app/loading.tsx`).
     - Update header home links/logo.

5. **Self code review and document findings**
   - Mode: `serial`
   - Depends on: 4
   - Status: `completed`
   - Notes: Save to `04-code-review.md`.

6. **Run quality gates**
   - Mode: `serial`
   - Depends on: 5
   - Status: `completed`
   - Notes: Run `pnpm lint`, `npx tsc --noEmit`, `pnpm build`.

7. **Run E2E/smoke validation and capture report**
   - Mode: `serial`
   - Depends on: 6
   - Status: `completed`
   - Notes: Save to `05-e2e-report.md`.

8. **Fix loop and final summary**
   - Mode: `serial`
   - Depends on: 7
   - Status: `completed`
   - Notes: Save `06-final-summary.md` after checks are clean.

## Subagent Reports

### Subagent A - Route reference audit (parallel track)

- Changed files (recommended):
  - `app/page.tsx`
  - `components/common/Header/Header.tsx`
- Rationale:
  - Canonical home route should become `/home`.
  - `/` must remain accessible as redirect entrypoint.
  - Header home entrypoints must match the new canonical route.
- Risks:
  - Missing direct route references to `/` can create inconsistent navigation behavior.
- Open items:
  - Verify no additional `/` route references exist outside header/root page.

### Subagent B - Loading boundary audit (parallel track)

- Changed files (recommended):
  - `app/loading.tsx` (remove)
  - `app/home/loading.tsx` (add)
  - `app/home/page.tsx` (add)
- Rationale:
  - Root loading boundary currently shows home skeleton during unrelated child-route
    loads.
  - Home-specific loading must move under `/home` segment only.
- Risks:
  - Removing root loading boundary can reveal missing route-level loading for routes
    without dedicated `loading.tsx`.
- Open items:
  - Validate route transitions for `/browse/*`, `/popular`, and `/watch/*` remain clear.
