# E2E Report (Browser Validation)

## Environment

- Target app: `http://localhost:3010`
- Note: default app port `3006` was occupied by another local service, so E2E was executed
  on `3010`.
- Browser automation run covered the same user journeys as planned MCP Chrome checks.

## Critical Flow Results

1. **Movie detail -> watch page**
   - Opened `/browse/movie/67566`.
   - Confirmed `Play now` CTA exists.
   - Clicked CTA and reached `/watch/movie/67566`.
   - Result: **PASS**.

2. **Watch movie layout behavior**
   - Confirmed global header nav is hidden on `/watch/*`.
   - Confirmed watch shell/player area is visible.
   - Result: **PASS**.

3. **Show detail episode -> watch page**
   - Opened `/browse/show/55310`.
   - Clicked first episode row.
   - Landed on `/watch/show/55310?season=1&episode=1`.
   - Result: **PASS**.

4. **Episode switching inside watch page**
   - Clicked episode 2 from the watch episode grid.
   - URL updated to `/watch/show/55310?season=1&episode=2`.
   - Active indicator updated (`Now watching` for selected episode).
   - Result: **PASS**.

5. **Locale validation (VI with accents)**
   - Toggled locale to Vietnamese on non-watch page.
   - Re-opened watch page and verified Vietnamese labels with accents.
   - Example observed: `Luồng phát tạm thời không khả dụng`.
   - Result: **PASS**.

6. **Mobile viewport usability**
   - Emulated `390x844` viewport on watch page.
   - Verified no global header overlap, watch shell visible, no horizontal overflow.
   - Result: **PASS**.

## Console and Network Diagnostics

- Console warnings: `1`
- Console errors: `6`
- Failed network requests: `5`

### Notable messages

- Non-blocking warning: Next Image LCP hint for logo `priority`.
- Stream host errors:
  - CORS blocked requests to `https://m.ffvvv.xyz/...m3u8`
  - `net::ERR_FAILED` for those stream URLs.
- `_rsc` request aborts were observed during route transitions (`net::ERR_ABORTED`) and
  are expected in Next.js navigation.

## Interpretation

- App-level watch flow, routing, localization, and responsive behavior passed.
- Actual media playback can be blocked by external stream host/CORS availability; UI
  fallback message renders correctly in that case.
