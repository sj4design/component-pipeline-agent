---
system: shadcn/ui
component: Pagination
url: https://ui.shadcn.com/docs/components/pagination
last_verified: 2026-03-28
confidence: high
---

# Pagination

## Approach
shadcn/ui's Pagination is a set of semantic components (Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext, PaginationEllipsis) using nav/ul/li/a structure. The component is primarily oriented toward anchor-based pagination matching server-rendered page patterns. For client-side pagination, developers wire up onClick handlers on the page links.

## Key Decisions
1. **Anchor-based structure** (HIGH) — PaginationLink renders as anchor (`<a>`) by default with href support, appropriate for server-rendered or URL-based pagination; onClick can be added for SPA patterns.
2. **Composed structure** (HIGH) — Individual components for each part of pagination allow full control over which elements to show and how to render page numbers with ellipsis.
3. **PaginationLink[isActive]** (MEDIUM) — isActive prop on PaginationLink adds aria-current="page" and active styling to the current page button.

## Notable Props
- `PaginationLink[href]`: Page URL for anchor-based pagination
- `PaginationLink[isActive]`: Current page indicator (adds aria-current="page")
- `PaginationPrevious` / `PaginationNext`: Pre-styled prev/next controls with icons

## A11y Highlights
- **Keyboard**: Tab through page links/buttons; Enter activates
- **Screen reader**: nav aria-label="pagination"; aria-current="page" on active; prev/next buttons have labels
- **ARIA**: nav landmark; aria-current="page"; aria-label on PaginationPrevious/Next

## Strengths & Gaps
- **Best at**: Flexible composable structure; anchor-based pagination; developer controls all rendering logic
- **Missing**: No built-in ellipsis algorithm — developer writes page number logic; no items-per-page selector
