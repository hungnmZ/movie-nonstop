# Test Plan

## Scope

Validate locale switching (`en`/`vi`) across core pages and ensure all visible text
updates correctly with proper Vietnamese accents.

## Static Quality Gates

1. `pnpm lint`
2. `npx tsc --noEmit`
3. `pnpm build`

All must pass.

## Functional Checks

### Language Toggle

1. Open home page.
2. Toggle language from EN -> VI.
3. Verify header labels and section labels switch to Vietnamese with accents.
4. Reload page; verify selected language persists.
5. Toggle back VI -> EN and verify update.

### Page Coverage

1. Home (`/`)
2. Browse movie (`/browse/movie`)
3. Browse show (`/browse/show`)
4. Popular (`/popular`)
5. Detail movie (`/browse/movie/[id]`)
6. Detail show (`/browse/show/[id]`)

For each page verify headings, controls, helper text, and empty-state text are localized.

### Data Label Coverage

1. Title name uses locale-aware field (`nameEn`/`nameVi`) where available.
2. Genre labels use locale-aware field (`nameEn`/`nameVi`) where available.
3. Fallback behavior stays readable when localized value is missing.

## MCP Chrome E2E Checks

1. Validate no blocking console errors during language switch.
2. Validate no failed network requests in key flows.
3. Validate mobile viewport readability (`390x844`) in both locales.
