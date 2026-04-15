---
system: GitHub Primer
component: Pagination
url: https://primer.style/components/pagination
last_verified: 2026-03-28
confidence: high
---

# Pagination

## Approach
GitHub Primer's Pagination is used for navigating long lists throughout GitHub — search results, repository list views, commit history. The component shows numbered pages with prev/next controls and intelligently renders page numbers with ellipsis for large page counts. It integrates with Primer's server-rendered page generation for generating correct page URLs.

## Key Decisions
1. **Page number generation with ellipsis** (HIGH) — Automatically renders the correct set of page buttons with ellipsis for large page counts (1, 2, ..., 47, 48, 49, 50), which is Primer's standard algorithm for manageable page number display.
2. **URL-based page links** (HIGH) — Pagination renders as anchor links with proper URLs (not button onClick), supporting GitHub's server-rendered page architecture and enabling browser back/forward, link sharing, and crawlability.
3. **hrefBuilder prop** (HIGH) — Function prop that generates page URLs, enabling integration with any routing convention (search params, path params, etc.).

## Notable Props
- `pageCount`: Total number of pages
- `currentPage`: Current active page (1-indexed)
- `hrefBuilder`: Function `(page) => string` generating page URLs
- `surroundingPageCount`: Number of pages shown on each side of current
- `marginPageCount`: Pages shown at start/end

## A11y Highlights
- **Keyboard**: Tab through page links; Enter activates
- **Screen reader**: nav aria-label="Pagination"; aria-current="page" on current; each page link announces page number
- **ARIA**: nav landmark; aria-current="page"; aria-label on prev/next; hidden ellipsis separators

## Strengths & Gaps
- **Best at**: URL-based anchor pagination for server-rendered pages; hrefBuilder for routing flexibility; ellipsis algorithm
- **Missing**: No items-per-page selector; no go-to-page input
