---
system: REI Cedar
component: Breadcrumb
url: https://cedar.rei.com/components/breadcrumb
last_verified: 2026-03-28
confidence: medium
---

# Breadcrumb

## Approach
REI Cedar's Breadcrumb shows the product category hierarchy on REI.com — (Home > Camping > Sleeping Bags > Down Sleeping Bags). Product category navigation is a primary use case in e-commerce, helping customers understand their position in the product taxonomy and navigate back up.

## Key Decisions
1. **Product category navigation** (HIGH) — Breadcrumb shows product category hierarchy for e-commerce navigation, the primary use case on REI.com.
2. **Mobile truncation** (HIGH) — On mobile, breadcrumbs are likely truncated to show only immediate parent, given space constraints on product detail pages.
3. **nav/ol/li semantics** (HIGH) — Correct semantic structure per WCAG and ARIA breadcrumb specification.

## Notable Props
- `items`: Breadcrumb path array

## A11y Highlights
- **Keyboard**: Tab through links
- **Screen reader**: nav landmark; list structure; current page marked
- **ARIA**: aria-label="breadcrumb"; aria-current="page" on final item

## Strengths & Gaps
- **Best at**: E-commerce product category navigation; mobile truncation handling
- **Missing**: Medium confidence; advanced truncation behavior uncertain
