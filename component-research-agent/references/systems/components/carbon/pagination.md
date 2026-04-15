---
system: IBM Carbon Design System
component: Pagination
url: https://carbondesignsystem.com/components/pagination/usage/
last_verified: 2026-03-28
---

# Pagination

## Approach
Carbon Design System has one of the most complete and well-documented Pagination implementations in Tier 1, which is entirely appropriate given Carbon's enterprise data context. IBM's products — IBM Cloud resource lists, IBM Security logs, IBM Watson discovery results — routinely display thousands of records in data tables. Carbon's Pagination is designed to work in tight coupling with its DataTable component, though it functions as a standalone component as well. The design philosophy is functional over decorative: Pagination in Carbon includes all the controls that enterprise users actually need — page size selector, current page indicator, total item count display, and previous/next navigation — without visual embellishment.

Carbon provides two visual pagination variants: the standard "full" pagination with a page-size dropdown and item count, and a simpler "previous/next only" variant for contexts where the total count is unknown or irrelevant. The full variant is the more common choice in IBM's products. Notably, Carbon also provides a `Pagination` skeleton component for loading states, consistent with its general approach of providing skeleton variants for all components that display dynamic data.

## Key Decisions
1. **Page size selector as a core feature** (HIGH) — Carbon's Pagination includes a dropdown for selecting how many items appear per page (common options: 10, 20, 30, 40, 50). This is a critical enterprise feature because different users have different productivity workflows: a user building a checklist wants 10 items per page; a user auditing a dataset wants 50. Giving users control over density respects their work mode. The page size selection also persists via the `pageSize` and `pageSizes` props, allowing the host application to remember and restore the user's preference.
2. **Total item count display** (HIGH) — Carbon shows a "1-20 of 1,500 items" or equivalent display by default. When the total count is unknown (e.g., streaming results, search APIs that don't return total count), Carbon supports disabling the total count display. The count gives users two pieces of information at once: their current position in the dataset and the dataset's overall size, both of which affect how they interpret results.
3. **`previous/next only` variant via `pagesUnknown`** (MEDIUM) — When the total number of pages is not known (e.g., an API that returns "next page exists: true" but no total), Carbon supports a simplified UI with only prev/next buttons and the current page number. This addresses a real API constraint in enterprise systems where total counts are expensive to compute.
4. **Skeleton loading state** (MEDIUM) — `PaginationSkeleton` renders a placeholder with the correct dimensions while pagination data loads. This prevents layout shift and maintains visual structure during loading — critical for applications where the table data and pagination data may arrive separately.
5. **Translated labels** (LOW) — Carbon provides props for all user-visible text strings (`itemsPerPageText`, `pageRangeText`, `pageInputTooltip`) to support internationalization. Enterprise IBM products deploy globally and must support multiple languages without component-level hacks.

## Notable Props
- `pageSize`: Current page size — controlled component pattern
- `pageSizes`: Array of available page sizes to offer in the dropdown
- `totalItems`: Total item count for "X of Y" display
- `pagesUnknown`: Switches to prev/next-only mode when total is unavailable
- `itemsPerPageText`: Internationalization prop for the page size label
- `onChange`: Fires with `{ page, pageSize }` object — gives consuming DataTable everything it needs

## A11y Highlights
- **Keyboard**: All controls are keyboard accessible — prev/next buttons via Tab + Enter/Space; page size dropdown via Tab + Enter + arrow keys; current page input field supports typing and Enter to jump
- **Screen reader**: "Previous page" and "Next page" buttons have descriptive `aria-label`; the current page input has a label indicating its function; the total item count is in visible text that is also read by screen readers
- **ARIA**: Nav wrapper uses `<nav aria-label="pagination">` or equivalent landmark; buttons have `aria-label` with directional context; current page item has `aria-current="page"` equivalent in the input's accessible state

## Strengths & Gaps
- **Best at**: The most fully-featured pagination in Tier 1 for enterprise data contexts — page size selector, total count display, unknown total support, skeleton state, and internationalization all covered
- **Missing**: No jump-to-specific-page input in the standard variant (Carbon has a page-number input only in some variants); the component is visually dense and may not suit consumer-facing contexts where a lighter pagination style is preferred
