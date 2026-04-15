---
system: Adobe Spectrum
component: Not available natively
url: https://spectrum.adobe.com/page/collections/
last_verified: 2026-03-28
---

# Pagination

## Approach
Adobe Spectrum does not include a standalone Pagination component in its core component library. This absence is somewhat surprising given that Spectrum powers enterprise products like Adobe Analytics, Adobe Experience Manager, and Adobe Experience Platform — all of which have data-heavy interfaces where pagination would be expected. The reason appears to be architectural: Spectrum's approach to large data sets is through its collection components (TableView, ListView, GridView) which use virtualization — rendering only visible rows in the DOM — rather than server-side pagination. When you virtualize a 10,000-row dataset, you don't need to paginate it; you just scroll. The component philosophy is to make the data set feel infinite through virtualization, avoiding the pagination problem entirely for in-memory data.

For cases where data is fetched server-side in pages (which is necessary for truly large datasets that can't be loaded into memory), Spectrum leaves the pagination UI to the consumer. The `TableView` component supports `onLoadMore` callbacks for infinite scroll / progressive loading, but there is no page-number control, no page-size selector, and no "X of Y results" display built into the system. Teams at Adobe who need traditional pagination build custom components using Spectrum's Button, Text, and layout primitives, styled to match the Spectrum visual language. This creates inconsistency across Adobe products in how paginated data controls are presented.

## Key Decisions
1. **Virtualization over pagination** (HIGH) — Spectrum's table and list components use virtual scrolling as the primary strategy for large datasets. This is the correct choice for rich client-side data management, but it sidesteps rather than solves the problem of paginated server-side APIs. Virtualization works for rendering performance; it does not eliminate network requests for data.
2. **`onLoadMore` as the server-pagination hook** (HIGH) — Spectrum's collection components fire an `onLoadMore` event when the user scrolls near the bottom, enabling progressive server-side loading. This is the infinite scroll model applied to server pagination — efficient and user-friendly, but it removes pagination affordances (knowing how many pages exist, jumping to page 5).
3. **No total count display** (MEDIUM) — The absence of a "Showing 1-25 of 1,247 results" display is a significant gap for users who need to understand dataset scale before making decisions. In analytics tools specifically, knowing the total count influences how users interpret partial results.

## Notable Props
- No official Pagination component props
- `TableView` has `onLoadMore` for progressive server-side loading

## A11y Highlights
- **Keyboard**: No pagination component to document; TableView keyboard navigation is fully specified, but page controls are absent
- **Screen reader**: No guidance for pagination — `onLoadMore` implementations should announce new content via aria-live regions, but this is undocumented
- **ARIA**: No standardized pagination ARIA pattern provided

## Strengths & Gaps
- **Best at**: Virtualized rendering of large in-memory datasets in TableView eliminates the pagination problem for client-side data
- **Missing**: No numbered pagination for server-side paginated APIs — no page controls, no page size selector, no total count, no jump-to-page; the gap is acknowledged but unresolved in Spectrum's GitHub issues
