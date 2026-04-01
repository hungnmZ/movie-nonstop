# Test Plan - Streaming Watch Screen

## Goal

Verify end-to-end streaming navigation and playback-shell behavior for both movie and show
flows, including localization and responsiveness.

## Automated/CLI Quality Gates

1. Run `pnpm lint`.
2. Run `npx tsc --noEmit`.
3. Run `pnpm build`.

## Functional Scenarios

1. **Movie detail -> watch page**
   - Open a movie detail page.
   - Click Play CTA.
   - Verify navigation to `/watch/movie/<id>`.
   - Verify player shell renders and stream URL is resolved.

2. **Show detail -> episode -> watch page**
   - Open a show detail page with season/episode data.
   - Click one episode card/CTA.
   - Verify navigation to `/watch/show/<id>?season=<n>&episode=<n>`.
   - Verify selected episode is highlighted and stream URL resolves for that episode.

3. **Show episode switching inside watch page**
   - While watching a show episode, select another episode from list.
   - Verify URL updates season/episode query.
   - Verify active episode state updates and player source refreshes.

4. **Locale coverage (EN/VI)**
   - Toggle language on non-watch page, navigate into watch page.
   - Verify watch labels/CTA/metadata text are localized.
   - Verify Vietnamese text uses proper accents.

5. **Header behavior**
   - Verify global header is hidden on watch pages.
   - Verify returning to detail/list page restores normal header.

6. **Fallback behavior**
   - Verify unavailable stream source renders graceful fallback message.
   - Verify invalid route params show not found behavior.

7. **Responsive behavior**
   - Validate mobile viewport (390x844) and desktop viewport.
   - Check player shell, metadata, and episode list usability.

## E2E Diagnostics

- Confirm no console errors in critical flows.
- Confirm no failed network requests for app routes/data calls in successful scenarios.
