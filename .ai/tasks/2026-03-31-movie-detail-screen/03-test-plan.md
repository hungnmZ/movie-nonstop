# Test Plan

## Scope

Validate new detail route for both movie and show flows, including data completeness,
responsive UI behavior, and integration with existing cards.

## Static Quality Gates

1. `pnpm lint`
2. `npx tsc --noEmit`
3. `pnpm build`

All must pass before feature completion.

## Functional Checks

### Movie Detail Flow

1. Open a movie card from home/browse/popular.
2. Verify navigation to `/browse/movie/[id]`.
3. Verify sections and values render:
   - title
   - release year and date
   - country
   - description
   - director
   - writer/script
   - cast
   - similar titles

### Show Detail Flow

1. Open a show card from home/browse/popular.
2. Verify navigation to `/browse/show/[id]`.
3. Verify baseline info sections render (same as movie where available).
4. Verify season list renders.
5. Verify episodes render under each season with number, title, and air date.

### Edge Cases

1. Invalid route type (not `movie`/`show`) returns not found.
2. Missing title id or unknown id handled with fallback/not-found behavior.
3. Empty roles or related titles show graceful empty states.

## Visual and Responsive Checks (MCP Chrome)

1. Desktop viewport:
   - Hero readability over backdrop
   - Metadata blocks alignment
   - Related titles card layout
2. Mobile viewport:
   - Hero and poster stack properly
   - Text wrapping remains readable
   - Season/episode section remains usable

## Observability Checks

1. Browser console has no blocking errors on detail pages.
2. Network requests for detail/season queries resolve successfully.
