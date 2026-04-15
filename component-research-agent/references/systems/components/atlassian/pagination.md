---
system: Atlassian Design System
component: Pagination
url: https://atlassian.design/components/pagination
last_verified: 2026-03-28
---

# Pagination

## Approach
Atlassian Design System's Pagination component is well-suited to Jira and Confluence's data browsing contexts. In Jira, paginated issue lists (board backlogs, search results, activity feeds) are everyday UI patterns. In Confluence, paginated search results and space/page listings require clear navigation through large result sets. Atlassian's Pagination uses a numbered page list model — showing the current page, a window of adjacent pages, and ellipsis indicators for gaps in the page range. This full page-list model contrasts with Polaris's simplified prev/next approach and is appropriate for Jira users who frequently need to jump to specific pages in a search results list.

The component handles the page range display automatically: given a total page count and current page, it calculates which page numbers to show, where to insert ellipsis indicators, and how large the adjacent-page window should be. This automatic range calculation removes one of the most tedious implementation details from consuming teams.

## Key Decisions
1. **Automatic page range calculation with ellipsis** (HIGH) — Atlassian's Pagination component automatically determines the page window display: it always shows the first and last pages, shows a configurable window of pages around the current page (default: 3 before and after), and inserts "..." indicators for gaps. This logic is surprisingly complex to implement correctly and is done once in the component rather than repeated across all Jira and Confluence features that use pagination.
2. **`onChange` with page number** (HIGH) — The component fires `onChange(event, page)` where `page` is the new page number. This simple interface is deliberately thin — the component doesn't care about items-per-page, total items, or fetching; it only manages the page number selection UI and delegates all data concerns to the parent. This is the right separation of concerns: pagination UI is distinct from data fetching logic.
3. **`max` prop for page window size** (MEDIUM) — The `max` prop controls how many page number buttons appear at most (default 7, counting ellipsis indicators). This allows teams to tune the pagination width for their layout constraints — a narrow sidebar search result panel might use `max={5}`, while a full-width data table might use `max={10}`.
4. **`label` for i18n of navigation buttons** (MEDIUM) — The previous and next navigation buttons have `label` props for their aria-label text, supporting internationalization for Atlassian's global product deployments (Jira and Confluence are used in dozens of languages).

## Notable Props
- `pages`: Total number of pages — drives the component's page range display
- `selectedIndex`: Currently selected page (0-based) — controlled component pattern
- `onChange`: Callback receiving the new page index on selection
- `max`: Maximum number of page controls to display
- `label` / `previousLabel` / `nextLabel`: Accessible label overrides for i18n

## A11y Highlights
- **Keyboard**: Page number buttons are all focusable with Tab; activated with Enter/Space; the previous and next buttons are standard buttons; when ellipsis items are focused, pressing Enter/Space expands or navigates to the nearest skipped pages
- **Screen reader**: Each page button has an `aria-label` of "Page [N]"; the current page button has `aria-current="page"`; previous/next buttons have descriptive labels via props; the pagination region is wrapped in a `<nav aria-label="pagination">` landmark
- **ARIA**: `<nav>` landmark with label; `aria-current="page"` on active page; `aria-label="Page N"` on each numbered button; `aria-disabled` on prev/next when at boundaries

## Strengths & Gaps
- **Best at**: Automatic page range calculation with ellipsis is the most developer-friendly feature in Tier 1 — it handles the complex page-window math so teams don't have to; strong i18n support for global deployments
- **Missing**: No built-in page size selector or jump-to-page input (items-per-page control is outside the component's scope); no "X of Y items" total count display — these features require additional custom components alongside Pagination
