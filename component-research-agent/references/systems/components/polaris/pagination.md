---
system: Shopify Polaris
component: Pagination
url: https://polaris.shopify.com/components/pagination
last_verified: 2026-03-28
---

# Pagination

## Approach
Shopify Polaris includes a Pagination component that is deliberately simple, reflecting the e-commerce admin context for which it was designed. In the Shopify admin, pagination appears primarily on product lists, order lists, and customer lists — contexts where merchants need to move through large inventories but where the total count is often more informative than specific page numbers. Polaris Pagination is a "previous/next only" component — it shows Previous and Next buttons with an optional label indicating what's on the next/previous page (e.g., "1-50 of 200 products"). There is no numbered page list, no jump-to-page input, and no page size selector in the basic component. This simplicity is intentional: Shopify's merchant research showed that most merchants use "next" to browse linearly rather than jumping to specific pages.

The component is designed to be used in two primary contexts: within a card/list view (standard pagination below a product list) and in a resource list where the count display shows how many items are in the full set. Polaris also has a keyboard shortcut awareness built in — when focus is in the pagination area, merchants can use arrow keys to move between pages without clicking, which is a subtle but valuable workflow optimization for merchants managing large catalogs.

## Key Decisions
1. **Previous/next only — no numbered pages** (HIGH) — Polaris deliberately omits numbered page buttons. The reasoning from Shopify's design team is that numbered pages create "page-seeking" behavior (finding where a specific item landed) rather than productive browsing. In e-commerce admin, merchants are either browsing all products or searching for a specific one — the search bar handles the latter, and sequential browsing handles the former. Numbered pages serve a use case (jump to page 7) that rarely occurs in practice for Shopify merchants.
2. **Item range label** (HIGH) — The pagination component shows a label like "1-50 of 200" indicating the current item range rather than the page number. This is more actionable than "Page 1 of 4" because it tells merchants directly how many items they've seen and how many remain — the actual information they need to decide whether to keep browsing.
3. **`hasNext` and `hasPrevious` as the primary state props** (MEDIUM) — Polaris Pagination is driven by boolean props indicating whether forward and backward navigation are available, rather than by a total page count. This is pragmatic for Shopify's cursor-based API pagination model, where knowing the total count is an expensive extra query. The component is designed to work with "is there a next page?" (simple and cheap) rather than "how many pages total?" (expensive).
4. **`label` prop for contextual navigation text** (MEDIUM) — The `label` prop allows teams to display descriptive text between the prev/next buttons (e.g., "1-50 of 200 products" or just "Products"). This flexibility lets teams match the label to their specific context rather than displaying a generic page number.

## Notable Props
- `hasNext`: Boolean — controls whether the Next button is enabled
- `hasPrevious`: Boolean — controls whether the Previous button is enabled
- `label`: String or node — the display between prev/next buttons
- `onNext`: Callback for next page navigation
- `onPrevious`: Callback for previous page navigation
- `nextTooltip` / `previousTooltip`: Tooltip text on the nav buttons

## A11y Highlights
- **Keyboard**: Previous and Next buttons are standard buttons — Tab to focus, Enter/Space to activate; the component also supports keyboard shortcuts (documented for use within merchant workflows)
- **Screen reader**: Prev/Next buttons have descriptive `aria-label`; the label text between buttons is in visible DOM and read inline; disabled state is communicated via `aria-disabled`
- **ARIA**: No `<nav>` landmark by default (the buttons are standalone); `aria-label` on buttons for context; disabled buttons use `aria-disabled="true"` rather than the `disabled` attribute to keep them focusable and announceable

## Strengths & Gaps
- **Best at**: Clean, low-friction pagination for cursor-based APIs where total count is unknown — the `hasNext`/`hasPrevious` model is the most practical for modern API patterns that return cursor tokens rather than page numbers
- **Missing**: No numbered pages for non-linear navigation, no page size selector, no jump-to-page input — unsuitable for data-heavy admin contexts where users need to jump to specific pages in large datasets
