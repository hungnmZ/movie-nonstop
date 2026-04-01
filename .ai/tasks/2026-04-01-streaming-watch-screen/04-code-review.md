# Code Review

## Scope

- Streaming watch route and player shell.
- Detail-page CTA wiring for movie and show playback.
- Episode-level watch data aggregation.
- EN/VI dictionary additions for watch flow.

## Findings

1. **Episode playback targeting is now deterministic**
   - `data/title.ts` enriches show episodes with title ids by querying episode child nodes
     under each season.
   - Detail and watch routes use this id path to resolve stream URLs.

2. **Watch route is safe for rotating stream links**
   - `app/watch/[type]/[id]/page.tsx` uses `dynamic = 'force-dynamic'` and resolves stream
     URL on request instead of relying on stale cached URLs.

3. **UI behavior matches requested flow**
   - Movie detail has explicit play CTA.
   - Show detail episode rows navigate to watch route with season/episode context.
   - Header is hidden on `/watch/*` for immersive watch experience.

4. **Localization coverage is complete for new watch strings**
   - Added watch labels and CTA copy in both dictionaries.
   - Vietnamese copy uses proper accents.

## Adjustments During Review

- Removed unused fallback helper in watch page and reused localized season label key.
- Simplified player markup and retained explicit unavailable/loading states.

## Remaining Risks

- Browser/media-source behavior depends on stream origin and CORS policies.
- Existing repository lint warning in `components/ui/use-toast.ts` remains unchanged.
