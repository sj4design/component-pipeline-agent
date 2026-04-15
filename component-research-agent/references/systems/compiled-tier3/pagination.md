---
component: Pagination
tier: 3
last_verified: 2026-03-29
---

# Pagination — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Pagination (Themes) | Themes component with ellipsis logic; `siblings` prop for pages around current; `<nav aria-label="pagination">` landmark; `aria-current="page"` on active page. | high |
| Chakra UI | Pagination | Composable parts (Pagination.Root/PrevTrigger/NextTrigger/Items/PageText); `count` (total items) + `pageSize` drives page count calculation; `siblingCount` for ellipsis control. | high |
| GOV.UK | Pagination | Two distinct modes: block pagination (prev/next with section titles for sequential content) and numbered pagination (result sets); pure HTML links with no JavaScript required. | high |
| Base Web | Pagination | Dropdown page selector instead of numbered buttons — scales to large page counts without layout issues; Overrides for all sub-elements; no numbered button variant. | medium |
| Fluent 2 | Not available — compose from primitives | No standalone component; DataGrid has built-in pagination for table contexts; standalone pagination composed from Button, Select, Text. | medium |
| Gestalt | Pagination | Prev/next only (no numbered buttons); `totalCount` + `pageSize` for page count calculation; required `accessibilityLabel` prop enforces nav labeling. | medium |
| Mantine | Pagination | `boundaries` (pages at start/end) + `siblings` (pages around current) for ellipsis configuration; `withEdges` for first/last buttons; `usePagination` hook for custom UI rendering. | high |
| Orbit | Pagination | Flight search results pagination; mobile collapses to prev/next only; truncation for large page counts; fully controlled for async API data fetching. | high |
| Evergreen | Pagination | B2B data table pagination for large datasets (millions of events); ellipsis truncation for thousands-of-pages datasets; `onPreviousPage`/`onNextPage` granular callbacks. | high |
| Nord | Not available — architecture-specific | Healthcare data APIs use diverse pagination schemes (FHIR bundles, cursor-based); no component prevents architecture constraints; load-more patterns preferred for clinical histories. | high |

## Key Decision Patterns

The most architecturally distinct pagination in the T3 set is Base Web's dropdown-selector approach. Rather than rendering numbered page buttons (which require ellipsis logic and take up horizontal space proportional to page count), Base Web uses a dropdown select for page navigation. This approach scales to arbitrarily large page counts without UI adaptation — page 1 of 1,000 renders identically to page 1 of 10. The trade-off is that users lose the at-a-glance sense of where they are in the range, which matters more for content browsing than for data table navigation.

GOV.UK's two-mode pagination (block vs. numbered) captures a distinction that other T3 systems ignore: sequential content navigation (reading a guidance document section by section) has fundamentally different UX from result-set navigation (scanning through search results). Block pagination shows prev/next with section titles ("Previous: How to apply," "Next: What happens after") — providing contextual navigation with no page numbers needed. Numbered pagination is for result sets where the user needs to see "page 3 of 50" for orientation. No other T3 system formalizes this distinction.

Mantine's `usePagination` hook is the only T3 system that exposes the internal page calculation logic separately from the visual component. The hook returns the same computed page array (which pages to show, which to replace with ellipsis) that the component uses, allowing teams to render a completely custom pagination UI while reusing the correct ellipsis and boundary logic. This is the right abstraction for teams who need custom pagination styling (mobile swipe, vertical list, jump-to-page input) without reimplementing the page windowing math.

Nord's well-reasoned absence touches on a problem that affects all T3 systems: pagination is always coupled to a data-fetching strategy. A pagination component that reports "user clicked page 3" is only useful if the application knows how to fetch the data for that page. For clinical systems using FHIR Bundle pagination (which uses next/prev links in the API response rather than page numbers), a standard numbered pagination component cannot be used at all. Nord's documentation of this architectural constraint is the most explicit statement in the T3 set of why a pagination component might be actively harmful.

## A11y Consensus

- Pagination must be wrapped in a `<nav>` element with a descriptive `aria-label` (e.g., "Pagination," "Search results pages") — without this, it is an unlabeled landmark region that screen reader users cannot distinguish from other navigation.
- The current page button must have `aria-current="page"` — this is the ARIA attribute that tells screen readers the user's current position in the pagination.
- Previous and next buttons require descriptive `aria-label` attributes ("Previous page," "Next page") — not just icon arrows without labels.
- Ellipsis items ("...") must be `aria-hidden="true"` — they are visual decoration that indicates a gap, not interactive or informative content for screen reader users.
- Individual page number buttons benefit from `aria-label="Page N"` to provide full context when the number alone ("3") is announced in isolation from the surrounding navigation.

## Recommended Use

Reference T3 pagination approaches when deciding on numbered-buttons vs. dropdown-selector design, block-mode vs. numbered-mode for content navigation, and hook-based custom rendering. GOV.UK is the reference for the two-mode pagination distinction (sequential content vs. result sets); Base Web is the reference for dropdown page selection for very large page counts; Mantine is the reference for the `usePagination` hook for custom pagination UI with shared ellipsis logic; Nord is the reference for the FHIR/cursor-based pagination argument against a standard pagination component.
