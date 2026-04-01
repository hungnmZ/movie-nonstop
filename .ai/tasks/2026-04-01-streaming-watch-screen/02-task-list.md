# Task List - Streaming Watch Screen

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
   - Notes: Two subagents analyzed data pipeline and watch UI architecture.

3. **Update types/data for episode-level watchability**
   - Mode: `serial`
   - Depends on: 2
   - Status: `completed`
   - Notes:
     - Extend episode model in `types/TitleDetail.ts`.
     - Update `data/title.ts` season aggregation to include episode title ids.
     - Strengthen `getTitleWatch` typing and error handling.

4. **Implement watch route and player UI (Netflix-inspired)**
   - Mode: `serial`
   - Depends on: 3
   - Status: `completed`
   - Notes:
     - Add `app/watch/[type]/[id]/page.tsx`.
     - Add loading state and player shell components.
     - Hide global header for `/watch/*`.

5. **Wire movie play CTA and show episode navigation from detail page**
   - Mode: `serial`
   - Depends on: 3, 4
   - Status: `completed`
   - Notes:
     - Movie `Play` button opens `/watch/movie/<id>`.
     - Episode row opens `/watch/show/<showId>?season=<n>&episode=<n>`.

6. **Add EN/VI translations for watch flows**
   - Mode: `parallel`
   - Depends on: 4, 5
   - Status: `completed`
   - Notes: Add watch/detailed CTA keys in both dictionaries.

7. **Self code review and adjustments**
   - Mode: `serial`
   - Depends on: 3, 4, 5, 6
   - Status: `completed`
   - Notes: Document findings in `04-code-review.md`.

8. **Run quality gates**
   - Mode: `serial`
   - Depends on: 7
   - Status: `completed`
   - Notes: Run `pnpm lint`, `npx tsc --noEmit`, `pnpm build`.

9. **Run MCP Chrome E2E and capture report**
   - Mode: `serial`
   - Depends on: 8
   - Status: `completed`
   - Notes: Save to `05-e2e-report.md`.

10. **Fix loop and re-run checks until clean**
    - Mode: `serial`
    - Depends on: 9
    - Status: `completed`

11. **Write final summary**
    - Mode: `serial`
    - Depends on: 10
    - Status: `completed`
    - Notes: Save to `06-final-summary.md`.

## Subagent Reports

### Subagent A - Watch data pipeline analysis (`task_id: ses_2b853ae03ffer0en0uRpa1nyDD`)

- Changed files (expected):
  - `types/TitleDetail.ts`
  - `data/title.ts`
  - `app/browse/[type]/[id]/page.tsx`
  - `app/watch/[type]/[id]/page.tsx`
  - `data/subtitle.ts`
  - `i18n/dictionaries/en.ts`
  - `i18n/dictionaries/vi.ts`
- Rationale:
  - Inline season episodes do not expose `id`/`srcUrl`.
  - Need episode title ids from `titles(parentId: seasonId)` to open correct stream.
  - Reuse `getTitleWatch` for stream URL resolution.
- Risks:
  - `srcUrl` may be short-lived; watch route should avoid stale caching.
  - HLS stream compatibility may vary by browser.
- Open items:
  - Finalize watch URL contract and server selection behavior.

### Subagent B - Watch UI architecture analysis (`task_id: ses_2b853ade5ffehO1KS27XfCWFwe`)

- Changed files (expected):
  - `app/watch/[id]/page.tsx` (adapt to `[type]/[id]` for this implementation)
  - `app/watch/[id]/loading.tsx`
  - `app/watch/_components/*`
  - `components/common/Header/Header.tsx`
  - `app/browse/[type]/[id]/page.tsx`
  - dictionaries and title data typing files
- Rationale:
  - Keep server data fetching in route page and interaction in client player shell.
  - Hide header on watch route for immersive Netflix-like layout.
  - Add watch-specific i18n keys.
- Risks:
  - `srcUrl` format may vary between direct media and embed patterns.
  - Browser autoplay/fullscreen constraints.
- Open items:
  - Decide MVP interaction scope (basic playback first, richer controls later).
