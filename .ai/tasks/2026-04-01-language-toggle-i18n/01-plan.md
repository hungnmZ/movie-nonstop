# Language Toggle + Bilingual UI Plan

## Goal

Refactor the app to support two clear UI languages, English and Vietnamese, and add a
language switch button next to the dark mode toggle.

## Functional Requirements

- Add global language switch control in header, beside theme toggle.
- Support two locales: `en` and `vi`.
- Persist locale selection across navigation and refresh.
- Localize all user-facing UI labels currently rendered by the app.
- Vietnamese output must use proper accents (no unaccented Vietnamese strings).

## Technical Strategy

1. Add a lightweight i18n layer with:
   - locale constants and cookie key
   - translation dictionaries (`en`, `vi`)
   - server helper to read locale for Server Components
   - client provider/hook for runtime toggle and re-render
2. Wrap app in locale provider from `app/layout.tsx`.
3. Refactor UI text usage in pages and components to dictionary keys.
4. Extend data shape where needed (`nameVi`, `genre.nameVi`) to render localized content
   in lists/cards.

## UX Direction

- Keep language switch compact and consistent with existing header controls.
- Use short button labels (`EN`/`VI`) with clear active-state styling.
- Keep default locale in English for safe fallback.

## Risks

- Missing localized backend fields for some titles/genres.
- Server/client locale mismatch if cookie and provider state diverge.

## Done Criteria

- Locale toggle works globally and persists.
- UI texts switch correctly between English and Vietnamese.
- Vietnamese strings render with proper accents.
- `pnpm lint`, `npx tsc --noEmit`, `pnpm build` pass.
- E2E confirms language switching on key pages and detail flow.
