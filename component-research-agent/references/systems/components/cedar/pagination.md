---
system: REI Cedar
component: Pagination
url: https://cedar.rei.com/components/pagination
last_verified: 2026-03-28
confidence: medium
---

# Pagination

## Approach
REI Cedar's Pagination is used for navigating product search results and category listing pages — core to REI's e-commerce product discovery experience. Cedar provides numbered pagination optimized for search result navigation with prev/next and page number buttons.

## Key Decisions
1. **Product search navigation** (HIGH) — Primary use for navigating product search result pages on REI.com.
2. **Touch-friendly controls** (HIGH) — Prev/Next buttons sized for mobile touch interaction given REI's mobile-heavy traffic.
3. **SEO-aware anchor links** (HIGH) — Links use proper hrefs for crawlability, important for product search page indexing.

## Notable Props
- `currentPage`: Active page
- `totalPages`: Total pages
- `linkGenerator`: Function for generating page URLs

## A11y Highlights
- **Keyboard**: Tab through links; Enter activates
- **Screen reader**: nav landmark; current page marked
- **ARIA**: nav aria-label; aria-current="page"

## Strengths & Gaps
- **Best at**: E-commerce product listing pagination; mobile touch targets; SEO-aware links
- **Missing**: Medium confidence; exact Vue API uncertain
