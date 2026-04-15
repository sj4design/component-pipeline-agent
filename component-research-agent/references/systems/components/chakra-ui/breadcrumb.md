---
system: Chakra UI
component: Breadcrumb
url: https://chakra-ui.com/docs/components/breadcrumb
last_verified: 2026-03-28
confidence: high
---

# Breadcrumb

## Approach
Chakra UI's Breadcrumb provides correct semantic HTML with Chakra's token system applied. It composes as Breadcrumb, BreadcrumbItem, BreadcrumbLink, and BreadcrumbSeparator. The component renders as a `<nav>` with `<ol>` internally, and the last item is marked as current page with `isCurrentPage` prop.

## Key Decisions
1. **isCurrentPage** (HIGH) — `<BreadcrumbItem isCurrentPage>` applies `aria-current="page"` to the current page item and styles it differently (non-link, current page appearance).
2. **Custom separator** (MEDIUM) — `<BreadcrumbSeparator>` accepts any content as the separator, allowing custom icons or characters.

## Notable Props
- `separator`: default separator character or element
- `BreadcrumbItem > isCurrentPage`: marks current page
- `BreadcrumbLink > as`: polymorphic for router Link

## A11y Highlights
- **Keyboard**: Standard link keyboard navigation
- **Screen reader**: nav landmark with aria-label="breadcrumb"; aria-current="page" on last item
- **ARIA**: Correct landmark and current page markup

## Strengths & Gaps
- **Best at**: isCurrentPage prop; custom separator; router link integration via as prop
- **Missing**: No truncation for deep paths; no collapsible breadcrumb
