---
system: Evergreen (Segment/Twilio)
component: Pagination
url: https://evergreen.segment.com/components/pagination
last_verified: 2026-03-29
confidence: high
---

# Pagination

## Approach
Evergreen's Pagination component is used in Segment's data tables to navigate large datasets: event lists, source connection logs, user profiles in audience views, and API call histories. Because Segment's customers can have millions of events and thousands of sources, pagination is a core data management interaction rather than an edge case. Evergreen's Pagination is a controlled component that reports page changes to the application, which handles data fetching — fitting the pattern of a React SPA where pagination triggers API calls rather than full page loads. The component follows Evergreen's minimal aesthetic with numbered pages, prev/next controls, and ellipsis truncation for large page counts.

## Key Decisions
1. **Controlled state model** (HIGH) — The component is fully controlled (`page`, `totalPages`, `onPageChange`), enabling the application to manage loading states, data fetching, and URL synchronization independently.
2. **Ellipsis truncation** (HIGH) — Segment's data tables can span thousands of pages; displaying 1 … 47 48 49 … 2341 keeps the control compact without hiding the total page count context.
3. **`onPageChange` callback** (MEDIUM) — Returns the new page number, allowing teams to integrate URL query parameter updates (e.g., `?page=3`) for shareable paginated views — important in a B2B tool where users share filtered dataset URLs with colleagues.

## Notable Props
- `page`: current page (1-indexed, controlled)
- `totalPages`: total number of pages
- `onPageChange`: callback receiving the new page number
- `onNextPage` / `onPreviousPage`: optional callbacks for finer-grained next/prev handling

## A11y Highlights
- **Keyboard**: All page buttons and prev/next controls are keyboard-focusable and activatable via Enter; current page button is visually and programmatically distinct.
- **Screen reader**: Wrapped in `<nav aria-label="Pagination">`; current page has `aria-current="page"`; prev/next buttons have descriptive `aria-label` values.
- **ARIA**: Each page button uses `aria-label="Page N"`; ellipsis elements are `aria-hidden`.

## Strengths & Gaps
- **Best at**: Large dataset navigation in B2B data tables with controlled state for API integration; URL-synchronization-friendly callback model.
- **Missing**: No "rows per page" selector; no "jump to page" input; no infinite scroll variant; no loading state visual between page transitions.
