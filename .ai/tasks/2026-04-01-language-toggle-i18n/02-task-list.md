# Task List

Status legend: `pending` | `in_progress` | `completed` | `blocked`

## Tasks

1. **Create mandatory task workspace docs**
   - Status: `completed`
   - Dependency: none
   - Mode: `serial`

2. **Run parallel subagent discovery for i18n scope and integration**
   - Status: `completed`
   - Dependency: 1
   - Mode: `parallel`

3. **Implement i18n core infrastructure**
   - Status: `completed`
   - Dependency: 2
   - Mode: `serial`

4. **Add header language toggle beside dark mode**
   - Status: `completed`
   - Dependency: 3
   - Mode: `serial`

5. **Refactor pages/components/data for EN/VI rendering**
   - Status: `completed`
   - Dependency: 3
   - Mode: `parallel`

6. **Self code review and fixes**
   - Status: `completed`
   - Dependency: 4, 5
   - Mode: `serial`

7. **Quality gates (`pnpm lint`, `npx tsc --noEmit`, `pnpm build`)**
   - Status: `completed`
   - Dependency: 6
   - Mode: `serial`

8. **MCP Chrome E2E critical flows (EN/VI toggle + browse/detail)**
   - Status: `completed`
   - Dependency: 7
   - Mode: `serial`

9. **Final summary**
   - Status: `completed`
   - Dependency: 8
   - Mode: `serial`

## Parallel Subagent Execution Log

- Subagent A (explore): audited user-facing strings across `app/` and
  `components/common/`.
  - Changed files: none
  - Rationale: identify full localization surface and translation keys
  - Risks: mixed-language strings, pluralization patterns, locale-specific date/region
    formatting
  - Open items: normalize fallback copy and avoid duplicated keys

- Subagent B (general): proposed lightweight cookie-based i18n architecture.
  - Changed files: none
  - Rationale: support server/client rendering without adding third-party i18n library
  - Risks: server/client locale mismatch if cookie/provider diverge
  - Open items: choose dictionary key shape and migration order by page priority
