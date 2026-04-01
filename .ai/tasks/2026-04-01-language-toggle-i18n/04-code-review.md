# Code Review

## Scope

- i18n infrastructure (`i18n/*`), locale provider/toggle, localized UI text, and localized
  title/genre data fields.

## Findings

1. **Locale architecture is coherent and low-risk**
   - Cookie-based locale state is resolved for server-rendered content and synchronized
     with a client provider for runtime toggling.
   - The language toggle updates locale and refreshes route data correctly.

2. **Localization coverage is broad across user-visible UI**
   - Header navigation, home/browse/popular/detail pages, loading/error states, and shared
     controls were updated.
   - Vietnamese labels include accents and are readable.

3. **Data localization path is correctly wired**
   - GraphQL data access now includes localized title/genre fields (`nameVi`) where
     required.
   - Rendering paths prefer locale-specific names with fallback behavior.

4. **No new blocking issues found in review**
   - Existing repository warning remains in `components/ui/use-toast.ts` (unused `state`)
     and predates this feature.

## Applied Fixes During Review

- No additional code fixes were required after the final review pass.

## Residual Risks

- Some backend records may still miss Vietnamese data; current fallback behavior mitigates
  this by showing available names.
