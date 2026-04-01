# E2E Report (MCP Chrome)

## Environment

- App URL: `http://localhost:3010`
- Browser tool: MCP Chrome DevTools
- Date: 2026-03-31

## Critical Flows Executed

### 1) Home -> Movie Detail

Steps:

1. Opened `/`.
2. Clicked movie card link `Open Avatar: Fire and Ash details`.
3. Landed on `/browse/movie/67566`.
4. Verified required sections are visible:
   - title
   - release year/date
   - country
   - description
   - director
   - writer/script (with fallback text)
   - cast
   - related titles

Result: **pass**

### 2) Show Detail (Season + Episodes)

Steps:

1. Opened `/browse/show/55310`.
2. Verified metadata section is visible.
3. Verified `Danh sach season va tap` section appears.
4. Verified season blocks and episode rows render (`Season 1`, `Season 2`, `Tap ...`).

Result: **pass**

### 3) Responsive Check (Mobile)

Steps:

1. Resized viewport to `390x844`.
2. Re-checked `/browse/show/55310` and `/browse/movie/67566`.
3. Confirmed hero, metadata, cast, related titles, and season/episode sections remain
   accessible and readable.

Result: **pass**

## Console and Network Verification

- On final detail-page runs, no console errors were observed.
- No failed network requests were observed on detail pages (all relevant requests returned
  `200`/`304`).

## Issues Found and Resolution

1. Temporary server error occurred once during E2E after build/dev overlap
   (`Cannot find module ... vendor-chunks ...`).
   - Root cause: stale dev runtime state after concurrent build/dev artifacts.
   - Resolution: restarted local dev server and reran E2E checks.
   - Final status: resolved.

## Final E2E Status

- **Passed** for critical movie and show detail flows.
