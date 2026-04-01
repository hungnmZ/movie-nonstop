# Plan - Home Route Migration (`/` -> `/home`)

## Objective

- Move the current home screen from root route `/` to `/home`.
- Make `/` a dedicated redirect entrypoint to `/home`.
- Keep UX and behavior unchanged for users while preventing root-level home loading UI
  from appearing during non-home route transitions.

## Scope

- In scope:
  - Create `app/home/page.tsx` from current home implementation.
  - Move home loading UI from `app/loading.tsx` to `app/home/loading.tsx`.
  - Replace `app/page.tsx` with a server redirect to `/home`.
  - Update navigation and all related route references from `/` to `/home`.
  - Run lint, type-check, build, and route smoke checks.
- Out of scope:
  - Visual redesign of home UI.
  - Changes to content/data queries for home sections.
  - Broader routing refactors outside home entrypoints.

## Implementation Strategy

- Keep the existing home UI code intact by relocating it to `app/home/page.tsx`.
- Keep home skeleton behavior intact by relocating current root loading UI to
  `app/home/loading.tsx`.
- Remove root loading boundary to avoid home-looking fallback during child route loading.
- Use `redirect('/home')` at `app/page.tsx` for canonical root entry behavior.
- Update header/logo and home navigation link targets to `/home`.

## Risk Controls

- Verify no stale references to `/` remain in route navigation code.
- Run full quality gates (`pnpm lint`, `npx tsc --noEmit`, `pnpm build`).
- Smoke-check redirect and key pages (`/`, `/home`, `/browse/*`, `/popular`, `/watch/*`).
