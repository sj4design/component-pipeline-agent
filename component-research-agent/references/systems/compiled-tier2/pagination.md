---
component: Pagination
tier: 2
last_verified: 2026-03-28
---

# Pagination — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Pagination | nav landmark; Previous/Next + page numbers; currentPage + pageCount | high |
| Salesforce Lightning | Paginator | Previous/Next arrows; page indicator; no individual page number buttons | high |
| GitHub Primer | Pagination | Page number links; previous/next; URL-based; large page count handling | high |
| shadcn/ui | Pagination | Radix-based; PaginationEllipsis; PreviousPage/NextPage/PageNumber; link-based | high |
| Playbook | Pagination | Data list navigation; dual React/Rails | medium |
| REI Cedar | CdrPagination | Vue; URL-based navigation; WCAG 2.1 AA | medium |
| Wise Design | Pagination | Transaction history navigation | low |
| Dell Design System | Pagination | Enterprise data list navigation | low |

## Key Decision Patterns

**Button vs. link:** Pagination pages can be links (navigate to ?page=2 URL) or buttons (JS-driven page change without URL update). URL-based pagination (links) is preferable for SEO and shareable URLs. Primer and Cedar use link-based pagination. shadcn/ui's Pagination is link-based by default.

**Lightning's simplified paginator:** Lightning's Paginator does not show individual page numbers — only Previous/Next with a current page indicator. Simpler but less navigable for large datasets. All other T2 systems show page numbers.

**Ellipsis handling:** shadcn/ui's PaginationEllipsis and Cedar handle large page ranges with "..." ellipsis to condense the page number list. A common pattern: show first 2, ellipsis, surrounding current, ellipsis, last 2.

**Current page landmark:** All systems require marking the current page with aria-current="page" on the active page link/button.

## A11y Consensus
- `<nav aria-label="Pagination">` wrapping landmark
- Current page button/link: aria-current="page"
- Previous/Next buttons: aria-label="Previous page" / "Next page" (not just "Previous")
- Disabled Previous on page 1, disabled Next on last page: aria-disabled="true"
- Page numbers: each button/link aria-label="Page [n]"

## Recommended Use
Use link-based pagination (shadcn/ui, Primer, Cedar) for URL-driven data lists. Use button-based pagination for client-side filtered tables. Use Lightning Paginator for simple Previous/Next navigation in Salesforce pages. Always mark current page with aria-current="page".
