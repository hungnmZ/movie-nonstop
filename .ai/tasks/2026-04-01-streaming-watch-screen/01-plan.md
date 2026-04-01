# Plan - Streaming Watch Screen (Movie + Show)

## Objective

- Implement real playback flows for both movie and show content.
- From detail page:
  - Movie: clicking `Play` opens the watch screen.
  - Show: selecting an episode opens the watch screen for that episode.
- Build a Netflix-inspired watch experience with immersive player layout, metadata, and
  episode navigation context.

## Scope

- In scope:
  - Data plumbing for episode-level watch identifiers.
  - New watch route and player UI.
  - Detail page CTA wiring for movie + show episodes.
  - EN/VI localization for new copy.
  - Lint/type-check/build/E2E and task documentation.
- Out of scope:
  - DRM/protected license handling.
  - Account-based watch progress persistence.
  - Billing/subscription behavior.

## Route Contract

- New route: `/watch/[type]/[id]`
  - Movie: `/watch/movie/<movieId>`
  - Show: `/watch/show/<showId>?season=<seasonNumber>&episode=<episodeNumber>`

## Data Strategy

- Reuse `getTitleDetail` for title metadata and show season structure.
- Extend show season aggregation so each episode includes its watch title id and watchable
  flag by querying episode title nodes under each season.
- Reuse `getTitleWatch` for stream URL resolution using selected movie id or selected
  episode id.

## UI Strategy

- Add immersive watch screen with dark cinematic styling:
  - Large 16:9 player area.
  - Gradient/background atmosphere and compact metadata panel.
  - Show-specific episode list with active state and quick switching.
- Hide global header while inside `/watch/*` for full-screen-like experience.
- Player implementation uses HLS strategy for cross-browser support.

## Validation Strategy

- Quality gates: `pnpm lint`, `npx tsc --noEmit`, `pnpm build`.
- MCP Chrome critical flows:
  - Movie detail -> Play -> watch page playback shell.
  - Show detail -> episode click -> watch page selected episode.
  - Episode switching on watch page.
  - EN/VI labels and mobile viewport checks.
