---
system: Mantine
component: Pagination
url: https://mantine.dev/core/pagination/
last_verified: 2026-03-29
confidence: high
---

# Pagination

## Approach
Mantine provides a full-featured Pagination component for navigating through paged content. It renders a horizontal row of page number buttons with prev/next controls, first/last page shortcuts, and configurable boundary and sibling page counts. The component is controlled — the consumer owns the current page state and the data fetching logic, while Pagination handles the display and emits change events. Mantine also provides a `usePagination` hook for teams that need the pagination logic but want to render a custom UI. The hook returns the same computed page array (with ellipsis items) used by the component, enabling fully custom pagination rendering.

## Key Decisions
1. **Controlled by default with hook escape hatch** (HIGH) — Pagination requires `value` (current page) and `onChange` handler. This matches the common use case where the current page is determined by URL params or query state. The `usePagination` hook lets teams reuse the page calculation logic (boundary pages, siblings, ellipsis logic) in any custom UI.
2. **Boundary and siblings configuration** (HIGH) — `boundaries` controls how many pages are shown at the start and end (e.g., always show pages 1-2 and 9-10). `siblings` controls how many pages appear around the current page. Both default to 1. This configuration covers the common pagination patterns: "show all boundary pages" for small data sets, "show only current vicinity" for large sets.
3. **`getItemProps` for accessibility** (MEDIUM) — The component spreads correct ARIA attributes on each page button, including `aria-current="page"` on the active page and `aria-label` for prev/next controls. Teams using the hook for custom rendering must apply these themselves.
4. **`withEdges` for first/last buttons** (LOW) — Optional first-page and last-page navigation buttons (`withEdges`) for data sets where jumping to the extremes is common (e.g., admin tables with many pages).

## Notable Props
- `value`: current page (controlled)
- `onChange`: page change callback
- `total`: total number of pages
- `siblings`: pages on each side of current page (default 1)
- `boundaries`: pages at start/end of range (default 1)
- `withEdges`: show first/last page buttons
- `disabled`: disables all controls
- `size`: `"xs"` | `"sm"` | `"md"` | `"lg"` | `"xl"`

## A11y Highlights
- **Keyboard**: Tab navigates between page buttons; Enter/Space activates a page
- **Screen reader**: Each page button labeled with its number; current page has `aria-current="page"`; prev/next buttons have descriptive `aria-label`
- **ARIA**: `role="navigation"` on container with `aria-label="Pagination"`; `aria-current="page"` on active page button; `aria-disabled` on disabled controls

## Strengths & Gaps
- **Best at**: Complete pagination with configurable boundary/sibling display; hook for custom rendering; correct ARIA semantics; size variants
- **Missing**: No built-in items-per-page selector (teams compose with a Select component); no URL binding (teams must synchronize with router); no load-more/infinite scroll variant
