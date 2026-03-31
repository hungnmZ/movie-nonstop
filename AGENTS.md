# AGENTS.md

## Scope

- This guide defines default behavior for coding agents in this repository.
- Follow these rules unless the user gives explicit, conflicting directions.
- Keep changes consistent with local code and config conventions.

## Mandatory Feature Workflow (Required)

For every feature request, agents must execute this sequence:

1. Planning and task workspace

- Create `.ai/tasks/<YYYY-MM-DD>-<feature-slug>/`.
- Create `01-plan.md`, `02-task-list.md`, and `03-test-plan.md`.

2. Task decomposition

- Break work into small tasks with explicit dependencies.
- Mark each task as `serial` or `parallel`.
- Update task status continuously in `02-task-list.md`.

3. Parallel execution with subagents

- Delegate independent tasks to subagents in parallel.
- Each subagent report must include changed files, rationale, risks, and open items.

4. Implementation

- Implement tasks in dependency order.
- Keep each change scoped to the current task objective.

5. Review and quality checks

- Perform self code review and save findings in `04-code-review.md`.
- Run `pnpm lint`, `npx tsc --noEmit`, and `pnpm build`.

6. E2E validation with MCP Chrome

- Run critical user flows with MCP Chrome.
- Check UI behavior, console errors, and failed network requests.
- Save steps and results in `05-e2e-report.md`.

7. Fix loop and completion

- Fix all review and E2E issues, then rerun checks until clean.
- Write `06-final-summary.md` with completed tasks, deferred items, and risks.
- A feature is done only when lint, type-check, build, and E2E all pass.

## Stack

- Next.js 14 App Router.
- React 18.
- TypeScript with `strict: true`.
- Tailwind CSS for styling.
- Radix UI primitives under `components/ui/`.
- `next-themes` for dark/light theme handling.
- GraphQL backend reached through `helpers/fetch.ts`.
- Preferred package manager is `pnpm` (`pnpm-lock.yaml` present).

## Directory Map

- `app/`: routes, loading states, and error pages.
- `app/api/titles/route.ts`: API route for paginated titles.
- `app/browse/`: browse flows and related components.
- `components/common/`: app-specific reusable components.
- `components/ui/`: low-level UI primitives and hooks.
- `data/`: server-side data access and query composition.
- `helpers/`: low-level utility helpers for IO/network.
- `utils/`: generic utility functions.
- `types/`: shared domain type aliases.
- `constants/`: runtime config values and env mapping.

## Build, Lint, and Run Commands

- Install dependencies: `pnpm install`
- Dev server (turbo, port 3006): `pnpm dev`
- Build app: `pnpm build`
- Start built app: `pnpm start`
- Next lint: `pnpm lint`
- ESLint full project: `pnpm eslint`
- Type-check only: `npx tsc --noEmit`

## Testing

- No test runner is configured in `package.json`.
- No `*.test.*` or `*.spec.*` files were found in source directories.
- `pnpm test` is currently unavailable.
- Running a single test is not possible right now.
- Use lint + type-check + build as quality gates.

## Formatting

- `.prettierrc` is authoritative.
- Use single quotes.
- Use semicolons.
- Keep trailing commas where valid.
- Keep print width `90`.
- Keep `jsxSingleQuote: true`.
- Tailwind classes are auto-sorted by `prettier-plugin-tailwindcss`.

## ESLint

- Base config extends `next/core-web-vitals` and `prettier`.
- Enforce no unnecessary JSX braces via `react/jsx-curly-brace-presence`.
- Enforce sorted imports via `simple-import-sort/imports`.
- Enforce sorted exports via `simple-import-sort/exports`.
- Disallow unused imports via `unused-imports/no-unused-imports`.
- Warn on unused vars via `unused-imports/no-unused-vars`.

## Import Order

- Follow `.eslintrc.json` import sort groups exactly.
- Group 1: React and external packages (`^react`, `^@?\w`).
- Group 2: internal absolute imports (`@/...`, `components...`).
- Group 4: parent relative imports (`..`).
- Group 5: local relative imports (`./`).
- Prefer `@/*` alias over deep relative chains.

## TypeScript

- Keep strict type safety.
- Prefer `type` aliases over `interface` (matches repo style).
- Use `import type` for type-only imports.
- Reuse types from `types/` rather than duplicating shapes.
- Avoid `any`; current `any` in `utils/index.ts` is legacy.

## Naming

- Component names use PascalCase.
- Component folders/files use PascalCase.
- Hooks use `use...` naming.
- Utility, data, and helper files use camelCase.
- Route filenames follow Next conventions (`page.tsx`, `loading.tsx`).
- Barrel exports via `index.ts` are common and preferred.

## React and Next.js

- Default to Server Components.
- Add `'use client';` only when browser APIs/hooks are needed.
- Keep browser-only hooks in client components.
- Use async server pages for route data fetching.
- Use `revalidate` where needed (existing routes use `600`).
- Keep route skeleton/fallback UIs in local `loading.tsx` files.
- Use `notFound()` for invalid dynamic route values.

## Data and API

- Keep GraphQL querying logic in `data/*.ts`.
- Compose query strings with `/* GraphQL */` comments.
- Reuse `sendGraphQLReq` for all remote GraphQL calls.
- Cast response payloads to explicit TS types.
- Normalize poster/backdrop URLs through `utils/image.ts`.
- Keep API route handlers thin; delegate business logic to `data/`.
- Use `Promise.all` for independent server fetches.

## Error Handling

- Throw explicit `Error` objects on request failures.
- Catch API route failures and return proper error responses.
- Surface recoverable UI errors with toast or fallback UI.
- Do not silently ignore exceptions in shared helpers.
- Prefer failing fast over returning partial invalid state.

## Styling

- Use Tailwind utility classes as default.
- Use `cn()` from `lib/utils.ts` for conditional class composition.
- Reuse theme tokens in `app/globals.css`.
- Respect existing breakpoints: `sm`, `md`, `lg`, `xl`, `2xl`.
- Keep custom global CSS additions minimal.
- Reuse `components/ui/` primitives before adding new base controls.

## Workflow

- Inspect nearby files before editing.
- Preserve existing architecture and naming patterns.
- Keep scope focused; avoid unrelated refactors.
- Run broader checks (`pnpm lint`, `pnpm build`) for non-trivial changes.
- If asked to run tests, state clearly that tests are not configured.
- Do not add a test framework unless explicitly requested.

## Cursor/Copilot Rules

- Checked `.cursor/rules/`: not present.
- Checked `.cursorrules`: not present.
- Checked `.github/copilot-instructions.md`: not present.
