---
component: pagination
compiled: 2026-03-28
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

## material-design-3
**Component:** Absent — infinite scroll philosophy
**Approach:** M3 has no Pagination component. Google's design philosophy for mobile-first applications favors infinite scroll or progressive "Load more" patterns over page-numbered pagination. In Google's own products (Search results, Gmail, YouTube), scroll-based or "load more" loading has replaced page numbers. M3's `LinearProgressIndicator` and `CircularProgressIndicator` serve loading states for these patterns.
**Key Decisions:**
- [HIGH] Absent: mobile screens don't have room for numbered pagination controls; infinite scroll and "Load more" are the M3 idioms
- [MED] "Load more" pattern: M3 recommends a Button below the content list that loads the next batch — explicit user-triggered loading rather than auto-scroll infinite load
- [MED] No guidance for desktop pagination: teams building web apps with M3 that need true pagination (admin tables, search results with page jumping) have no M3 reference
**Notable API:** No component. `FilledButton` labeled "Load more" is the recommended pattern.
**A11y:** No pagination-specific guidance. Custom implementations should use `<nav aria-label="Pagination">` with `aria-current="page"` on the active page link.
**Best at:** Nothing for traditional pagination — M3's "Load more" pattern is appropriate for feed-style content on mobile.
**Missing:** The entire pagination component for tabular data, search results, and any context where page-level navigation is required.

---

## spectrum
**Component:** Absent — virtualization over pagination
**Approach:** Spectrum addresses large datasets through virtualization (rendering only visible rows in a ListBox or Table) rather than pagination. The `onLoadMore` callback on ListBox and ComboBox triggers loading more items when the user scrolls to the bottom — progressive loading rather than page-based navigation. For explicit pagination controls, teams must build custom components.
**Key Decisions:**
- [HIGH] Absent: Spectrum's TableView uses virtualized rendering for large datasets — thousands of rows render performantly without pagination
- [HIGH] `onLoadMore` for progressive loading: fires when the user scrolls near the end of a virtualized list — powers infinite scroll-style loading in Spectrum's collection components
- [MED] No numbered page navigation: Spectrum provides no mechanism for jumping to a specific page number in a large dataset
**Notable API:** No Pagination component. `onLoadMore` on `ListBox`, `ComboBox`, and `TableView` for progressive loading.
**A11y:** `onLoadMore` triggers are scroll-based; no keyboard-accessible page navigation for screen reader users who cannot scroll. Custom pagination must implement `aria-current="page"` and navigate semantics.
**Best at:** Virtualized rendering for large datasets — the `onLoadMore` pattern works well with screen readers because the list grows without page navigation.
**Missing:** Page-numbered navigation for administrative UIs, search results, and any context where jumping to a specific page is needed.

---

## carbon
**Component:** Pagination (most complete Tier 1 implementation)
**Approach:** Carbon's Pagination is the most fully-featured in Tier 1: it includes a page size selector (rows per page), total items display, a `pagesUnknown` mode for server-side pagination where the total is not known, a `PaginationSkeleton` for loading states, full i18n with custom label props, and `onChange` that returns both the new `page` and `pageSize`.
**Key Decisions:**
- [HIGH] Page size selector built-in: rows-per-page control is part of the Pagination component, not a separate Select — reflects IBM enterprise table use cases where users switch between 10, 25, 50, and 100 rows
- [HIGH] `pagesUnknown` mode: renders "Page 5 of many" when total items aren't available — essential for server-side pagination of large datasets common in IBM Cloud tables
- [MED] Full i18n: `itemsPerPageText`, `backwardText`, `forwardText`, `pageRangeText`, `totalItems` all accept custom strings — covers IBM's global enterprise product deployments
**Notable API:** `pageSize` / `pageSizes` array; `totalItems`; `pagesUnknown: boolean`; `onChange: ({page, pageSize}) => void`; `PaginationSkeleton`
**A11y:** Page number buttons have `aria-current="page"` on the active page. Nav is wrapped in `<nav aria-label="pagination">`. Previous/Next buttons have descriptive `aria-label`. Page size select is a native `<select>` with associated label.
**Best at:** Enterprise table pagination — page size selector, `pagesUnknown` mode, skeleton state, and i18n make it the best fit for IBM Cloud-style data management UIs.
**Missing:** Quick jumper (type a page number to navigate directly) — Ant Design's `showQuickJumper` feature is absent; large-dataset navigation requires clicking through many pages.

---

## polaris
**Component:** Pagination (prev/next only)
**Approach:** Polaris's Pagination is deliberately minimal: only Previous and Next buttons, no page numbers, no page size selector. It uses boolean `hasPrevious` / `hasNext` props to enable/disable the navigation buttons — designed for cursor-based API pagination where total pages are unknown. An `label` slot renders the current page range (e.g., "Showing 1-10 of 50 orders").
**Key Decisions:**
- [HIGH] Cursor-based pagination model: `hasPrevious`/`hasNext` booleans match server APIs that return cursor tokens rather than total page counts — reflects Shopify's API architecture
- [MED] No numbered pages: Shopify merchants paginate through orders and products sequentially; jumping to page 47 is not a merchant workflow
- [MED] `label` for current range: accepts a string or React node — teams render "Showing 1-25 of 150 products" to give context without numbered page buttons
**Notable API:** `hasPrevious: boolean`; `hasNext: boolean`; `onPrevious: () => void`; `onNext: () => void`; `label` for current position text
**A11y:** Previous and Next are `<button>` elements with `aria-label="Previous"` / `aria-label="Next"`. Disabled state uses `disabled` attribute, not `aria-disabled`. No `aria-current` needed since there are no page number buttons.
**Best at:** Cursor-based pagination that maps directly to API pagination tokens — no total-count math required.
**Missing:** Page numbers for navigating to specific pages; page size selector; quick jumper — all required for admin table use cases beyond simple list browsing.

---

## atlassian
**Component:** Pagination
**Approach:** Atlassian's Pagination renders numbered page buttons with automatic ellipsis and range calculation. The `max` prop limits the total visible page buttons (with ellipsis for overflow). `selectedIndex` is 0-based (unlike most systems). `aria-current="page"` is applied automatically to the selected page button.
**Key Decisions:**
- [HIGH] Numbered pages with auto ellipsis: ellipsis appear automatically for large page ranges — e.g., "1 2 3 ... 8 9 10" — Atlassian calculates the visible window without consumer math
- [MED] `max` prop for visible page count: controls how many page buttons show before collapsing to ellipsis — default shows a sensible range without explicit configuration
- [MED] 0-based `selectedIndex`: unconventional but consistent with Atlassian's 0-indexed API patterns elsewhere in the design system
**Notable API:** `pages` array; `selectedIndex` (0-based); `max: number`; `onChange: (event, page) => void`; automatic ellipsis rendering
**A11y:** `<nav aria-label="pagination">` wrapper; `aria-current="page"` on the active page button; Previous/Next have `aria-label`; ellipsis items are `aria-hidden`.
**Best at:** Auto-computed ellipsis ranges — Atlassian handles the visible page window calculation automatically, reducing boilerplate in consumer code.
**Missing:** Page size selector and quick jumper; no `pagesUnknown` mode for server-side pagination without total count.

---

## ant-design
**Component:** Pagination
**Approach:** Ant Design's Pagination is the most configurable in Tier 1: `showQuickJumper` adds a "Go to page" text input for large datasets, `showSizeChanger` adds a rows-per-page Select, `showTotal` is a render function for custom total text, `simple` mode renders just prev/next with a page input, and `responsive` auto-switches to simple mode on small screens.
**Key Decisions:**
- [HIGH] `showQuickJumper`: type a page number and press Enter to jump directly — unique among Tier 1; essential for datasets with hundreds of pages in Alibaba's data-heavy admin interfaces
- [HIGH] `showTotal: (total, range) => ReactNode`: custom render function for total/range display — more flexible than static label strings; renders dynamic content like "Showing 1-10 of 2,847 items"
- [MED] `responsive` auto-switch: on small viewports, automatically switches to simple (prev/next + page input) mode — handles the mobile degradation problem without separate responsive code
**Notable API:** `showQuickJumper: boolean`; `showSizeChanger: boolean`; `showTotal: (total, range) => ReactNode`; `simple: boolean`; `responsive: boolean`; `disabled: boolean`
**A11y:** Page buttons have `aria-current="page"` on the active page. `<ul>` list structure for page items. Quick jumper input has an associated label. Previous/Next buttons have `title` attributes for tooltip text.
**Best at:** Quick jumper for large datasets and `showTotal` render function — the most capable pagination for data-heavy enterprise admin tables.
**Missing:** Cursor-based pagination support (Polaris's boolean model) — Ant Pagination assumes total item count is always known.
