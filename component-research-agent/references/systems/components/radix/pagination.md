---
system: Radix UI (WorkOS)
component: Pagination (no dedicated primitive)
url: https://www.radix-ui.com/themes/docs/components/pagination
last_verified: 2026-03-28
confidence: high
---

# Pagination

## Approach
Radix Themes includes a Pagination component. The Themes Pagination provides previous/next navigation and numbered page buttons with correct ARIA. Like other Themes components, it is styled with Radix tokens but is not a headless primitive. It handles the display logic (ellipsis for large page counts, current page highlighting) as a first-class concern.

## Key Decisions
1. **Ellipsis for large page counts** (HIGH) — Shows "..." for large ranges (1, 2, ..., 48, 49, 50) rather than all page numbers. The specific display logic (how many pages to show around current) is configurable.
2. **Semantic nav element** (HIGH) — Wrapped in `<nav aria-label="pagination">` for correct landmark semantics.

## Notable Props
- `count`: total pages
- `page` / `onPageChange`: controlled current page
- `siblings`: number of pages to show on each side of current page

## A11y Highlights
- **Keyboard**: All navigation elements are keyboard-navigable buttons/links
- **Screen reader**: nav landmark; current page has `aria-current="page"`; prev/next buttons are labeled
- **ARIA**: Complete pagination ARIA with landmark, current page indicator, and descriptive button labels

## Strengths & Gaps
- **Best at**: Ellipsis logic; correct ARIA structure; configurable siblings count
- **Missing**: No page size selector; no items-per-page control
