---
system: GOV.UK Design System
component: Pagination
url: https://design-system.service.gov.uk/components/pagination/
last_verified: 2026-03-28
confidence: high
---

# Pagination

## Approach
GOV.UK Pagination has two distinct modes: block pagination for navigating between content pages (articles, search results) and numbered pagination for large result sets. The block variant shows a large previous/next with section titles; the numbered variant shows page numbers with ellipsis for large sets. Both are server-rendered with the Nunjucks macro pattern and work without JavaScript.

## Key Decisions
1. **Two distinct pagination patterns** (HIGH) — Block pagination (prev/next with descriptive text) is for sequential content like guidance pages; numbered pagination is for result sets. Using the right pattern for the right context is explicitly documented in usage guidance.
2. **No JavaScript required** (HIGH) — Pagination is pure HTML `<nav>` with links, consistent with GOV.UK's progressive enhancement approach. Page state is managed server-side.
3. **Landmark nav with descriptive aria-label** (MEDIUM) — Each pagination nav has an aria-label (e.g., "Pagination" or "Results") to distinguish it from other nav landmarks on the page.

## Notable Props
- `previous` / `next`: `{ text, href, labelText }` for block mode
- `items`: array of page items for numbered mode
- `landmarkLabel`: nav aria-label

## A11y Highlights
- **Keyboard**: All links keyboard accessible
- **Screen reader**: nav landmark; aria-label distinguishes from other navs; aria-current="page" on current page number
- **ARIA**: Correct pagination landmark and current page

## Strengths & Gaps
- **Best at**: Two distinct patterns for different use cases; no-JS server rendering; strong guidance on which pattern to use
- **Missing**: No items-per-page control; no "go to page" input; limited customization
