---
system: Material Design 3
component: Not available natively
url: https://m3.material.io/components
last_verified: 2026-03-28
---

# Pagination

## Approach
Material Design 3 does not include a Pagination component, and this absence is among the most deliberate and philosophically grounded in the entire M3 system. M3 is built around mobile-first interaction models, and pagination is an anti-pattern on mobile. Mobile users scroll — they do not navigate between numbered pages. The infinite scroll and "load more" patterns are the canonical M3-aligned approaches to large data sets on mobile. Adding a pagination component would implicitly endorse a pattern that M3's design guidance discourages for mobile contexts.

The underlying reason infinite scroll is preferred over pagination in M3's philosophy is cognitive: numbered pages require the user to maintain a mental model of "I was on page 4 of 12" in order to resume their position later, which is a high cognitive burden on mobile. Infinite scroll with scroll position persistence (or a "you left off here" indicator) maintains spatial memory more naturally on small screens. M3's engineering documentation for Android and Flutter explicitly recommends lazy loading list patterns rather than paginated results. For web applications built on M3 that genuinely need pagination (data tables, admin interfaces, search results), M3 provides no guidance and no component — teams must build from scratch or adopt a pattern from another system.

This gap is particularly painful for teams building Material-styled enterprise web applications. IBM's Carbon and Shopify's Polaris have mature pagination components precisely because their primary contexts (data tables, product listings) require it. Teams using M3 for web admin tools often find themselves implementing Carbon-style or Ant Design-style pagination while trying to make it visually consistent with M3's design language.

## Key Decisions
1. **Infinite scroll as the canonical pattern** (HIGH) — M3 explicitly endorses infinite scroll for mobile lists and does not document a pagination alternative. This is a strong philosophical stance: pagination introduces page-level thinking that doesn't map well to mobile interaction patterns, and M3 would rather be opinionated about the right pattern than provide a component for the wrong one.
2. **"Load more" button as the pagination-adjacent pattern** (MEDIUM) — For cases where infinite scroll is technically impractical or where users need clear content boundaries, M3's guidance points to a "Load more" button at the bottom of a list. This is paginated loading without numbered pages — it gives users control over when new content loads without exposing the pagination metaphor.
3. **No web-context adaptation** (LOW) — Unlike some mobile-first systems that have begun adding web-specific components as their usage expanded to web, M3 has not added a pagination component for web contexts. This is either a deliberate scope decision or a gap that hasn't been prioritized.

## Notable Props
- No official props — component does not exist

## A11y Highlights
- **Keyboard**: No guidance provided
- **Screen reader**: No guidance provided; infinite scroll and load-more patterns have their own a11y considerations (announcing new content via live regions) that M3 does not document for this component
- **ARIA**: No standardized pattern

## Strengths & Gaps
- **Best at**: Nothing pagination-specific — M3's infinite scroll guidance and "Load more" pattern serve the mobile use case well, but neither is a pagination component
- **Missing**: Entirely absent — no numbered pages, no page size selector, no jump-to-page, no total count display; web applications on M3 must implement pagination entirely without system guidance
