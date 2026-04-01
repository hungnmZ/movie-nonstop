# Test Plan - Home Route Migration

## Goal

Validate that home experience is preserved at `/home`, root route redirects correctly, and
non-home route loading states no longer show home-specific skeleton content.

## Automated/CLI Quality Gates

1. Run `pnpm lint`.
2. Run `npx tsc --noEmit`.
3. Run `pnpm build`.

## Functional Scenarios

1. **Root redirect behavior**
   - Visit `/` directly.
   - Verify immediate redirect to `/home`.

2. **Home behavior parity**
   - Open `/home`.
   - Verify same sections/content as previous home route.
   - Verify home loading skeleton appears only for home route loading.

3. **Header/navigation correctness**
   - Click Home nav item and logo.
   - Verify both navigate to `/home`.
   - Verify active nav style still works on `/home`.

4. **Non-home route loading isolation**
   - Navigate between `/browse/movie`, `/browse/show`, `/popular`, and watch/detail
     routes.
   - Verify no home-specific loading UI is shown while child routes load.

5. **Regression smoke checks**
   - Verify key routes still render:
     - `/home`
     - `/browse/movie`
     - `/browse/show`
     - `/popular`
     - `/watch/movie/:id` (with a known id)

## E2E Diagnostics

- Check browser console for runtime errors during route transitions.
- Check failed network requests for app route/navigation calls.
