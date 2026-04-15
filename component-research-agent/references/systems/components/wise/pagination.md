---
system: Wise Design
component: Pagination
url: https://wise.design/components/pagination
last_verified: 2026-03-28
confidence: low
---

# Pagination

## Approach
Wise's Pagination is used for navigating transaction history and account statements in their financial product. Financial pagination often uses simple prev/next for statement periods rather than numbered page navigation.

## Key Decisions
1. **Transaction history navigation** (MEDIUM) — Paginating through transaction history lists.
2. **Simple prev/next** (LOW) — Financial statements often use simple prev/next.
3. **Clean styling** (LOW) — Consistent with Wise's minimal aesthetic.

## Notable Props
- `currentPage`, `totalPages`, `onPageChange`

## A11y Highlights
- **Keyboard**: Standard pagination keyboard behavior
- **Screen reader**: nav landmark; current page
- **ARIA**: Standard pagination ARIA

## Strengths & Gaps
- **Best at**: Financial transaction list pagination
- **Missing**: Low confidence — limited documentation
