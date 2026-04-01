# Self Code Review

## Scope Reviewed

- `data/title.ts`
- `types/Title.ts`
- `types/TitleDetail.ts`
- `app/browse/[type]/[id]/page.tsx`
- `app/browse/[type]/[id]/loading.tsx`
- `components/common/MovieCard/MovieCard.tsx`
- `components/common/GenreSelection/GenreSelection.tsx`
- `components/common/TimeUnitSelection/TimeUnitSelection.tsx`

## Findings

1. **Detail data contract and normalization**
   - Status: resolved
   - Notes: Added explicit detail and season queries, normalized nullables, image URLs,
     and role grouping.

2. **Show season/episode handling**
   - Status: resolved
   - Notes: Implemented season list query + per-season episode query, then sorted season
     output by numeric season number.

3. **Route safety**
   - Status: resolved
   - Notes: Added route param guard (`movie`/`show`) and type mismatch fallback to
     `notFound()`.

4. **Card-to-detail navigation**
   - Status: resolved
   - Notes: Wrapped card content in `Link` to detail route and preserved hover animations.

5. **Type-check instability on search params (existing issue surfaced by strict check)**
   - Status: resolved
   - Notes: Fixed `ReadonlyURLSearchParams` usage by converting to string before
     `URLSearchParams` construction in two existing components.

## Non-blocking Notes

- `pnpm lint` and `pnpm build` still show one pre-existing warning:
  - `components/ui/use-toast.ts` unused argument `state`
  - This warning is outside current feature scope and was not introduced by this work.

## Risk Assessment

- Low functional risk for movie detail flow.
- Medium data risk for credit labels due backend role inconsistency (`writer` vs
  `creator`) across titles; UI now falls back to creators when writers are missing.
