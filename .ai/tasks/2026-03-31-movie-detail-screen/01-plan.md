# Movie Detail Screen Plan

## Goal

Implement a new movie/show detail screen that uses `https://xemphim.in/b/g` GraphQL
backend and displays:

- Director
- Writer/Script
- Country
- Release date
- Movie description
- Movie title
- Release year
- Cast
- Similar titles
- For `show` type: season list and episode list

## Product and UX Direction

- Keep visual language close to current app, but push detail page toward a cinematic,
  Netflix-like layout.
- Use a large backdrop hero with dark gradient overlays.
- Keep primary metadata above the fold.
- Show credits and description in readable blocks.
- For shows, prioritize season and episode discoverability.
- Keep mobile and desktop layouts coherent.

## API and Data Strategy

Use GraphQL query against `https://xemphim.in/b/g`:

- `title(id: $id)` for detail fields
- `titles(parentId: $id, sort: "number", order: "asc")` for season list (show only)
- `title(parentId: $id, number: $number)` for episodes in each season (show only)

Normalize into a dedicated detail model in `types/TitleDetail.ts` and centralize fetch
logic in `data/title.ts`.

## Route and Component Plan

- New route: `app/browse/[type]/[id]/page.tsx`
- New loading UI: `app/browse/[type]/[id]/loading.tsx`
- Keep server component data fetching pattern.
- Reuse existing card style for related titles.
- Add navigation from `MovieCard` to detail route.

## Constraints and Guardrails

- Validate `type` in route (`movie`, `show`) and `notFound()` on invalid values.
- Fail fast on GraphQL errors.
- Keep import sorting and lint rules aligned.
- Prefer existing utilities (`getTmdbPosterUrl`, `getTmdbBackdropUrl`).

## Done Criteria

- Required metadata and sections render correctly for movies.
- Required metadata plus seasons/episodes render correctly for shows.
- Card click navigates into detail route.
- `pnpm lint`, `npx tsc --noEmit`, and `pnpm build` pass.
- MCP Chrome critical flow run with no blocking console/network issues.
