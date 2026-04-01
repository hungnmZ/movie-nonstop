# Task List

Status legend: `pending` | `in_progress` | `completed` | `blocked`

## Tasks

1. **Create mandatory task workspace docs**
   - Status: `completed`
   - Dependency: none
   - Mode: `serial`

2. **Research and confirm GraphQL detail fields from xemphim**
   - Status: `completed`
   - Dependency: 1
   - Mode: `serial`
   - Notes: Confirmed title fields, people roles, related titles, season and episode flow.

3. **Design detail types and data normalization contract**
   - Status: `completed`
   - Dependency: 2
   - Mode: `serial`

4. **Implement detail fetchers in data layer**
   - Status: `completed`
   - Dependency: 3
   - Mode: `serial`

5. **Build detail route UI (`movie` + `show`)**
   - Status: `completed`
   - Dependency: 4
   - Mode: `serial`

6. **Update movie card navigation to detail route**
   - Status: `completed`
   - Dependency: 5
   - Mode: `parallel`
   - Notes: Can be done independently once route contract is stable.

7. **Self code review and fix pass**
   - Status: `completed`
   - Dependency: 5, 6
   - Mode: `serial`

8. **Run quality gates (`lint`, `tsc`, `build`) and fix issues**
   - Status: `completed`
   - Dependency: 7
   - Mode: `serial`

9. **Run MCP Chrome E2E critical path and record report**
   - Status: `completed`
   - Dependency: 8
   - Mode: `serial`

10. **Write final summary**
    - Status: `completed`
    - Dependency: 9
    - Mode: `serial`

## Parallel Subagent Execution Log

- Subagent A (general): Researched live GraphQL fields and variable patterns.
  - Changed files: none
  - Rationale: identify exact backend contract for detail screen
  - Risks: role naming inconsistency (`writer` vs `creator`), nullable fields
  - Open items: country code display mapping policy

- Subagent B (explore): Mapped integration points in this repository.
  - Changed files: none
  - Rationale: identify minimal-impact route/data/component touch points
  - Risks: existing `MovieCard` hover layout when wrapped in link/button
  - Open items: final detail route path and header active-state behavior
