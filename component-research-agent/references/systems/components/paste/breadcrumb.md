---
system: Twilio Paste
component: Breadcrumb
url: https://paste.twilio.design/components/breadcrumb
last_verified: 2026-03-28
confidence: high
---

# Breadcrumb

## Approach
Twilio Paste's Breadcrumb implements the standard navigational breadcrumb trail using semantic nav + ordered list structure, consistent with ARIA best practices. Used in the Twilio console for navigating the product hierarchy (e.g., Console > Messaging > Services > [Service Name]). Paste provides Breadcrumb, BreadcrumbItem, and BreadcrumbEllipsis (for truncating long breadcrumb trails).

## Key Decisions
1. **BreadcrumbEllipsis for long trails** (HIGH) — Long navigation hierarchies (Twilio has deeply nested console navigation) are truncated with a clickable ellipsis that expands to show the full path, preventing long breadcrumbs from breaking layouts.
2. **Ordered list semantics** (HIGH) — nav > ol > li structure communicates the ordered nature of breadcrumb hierarchy to screen readers, following ARIA breadcrumb pattern specification.
3. **Current page as span not link** (HIGH) — The current page item renders as a span (not an anchor) with aria-current="page", correctly indicating it's the current location and not a navigable link.

## Notable Props
- `BreadcrumbItem[isCurrentPage]`: Marks the final item as current page (renders as span with aria-current)
- `BreadcrumbSeparator`: Custom separator between items

## A11y Highlights
- **Keyboard**: Tab navigates through breadcrumb links; current page span is not in tab order
- **Screen reader**: nav aria-label="breadcrumb"; ol communicates ordered list of links; aria-current="page" on current item
- **ARIA**: aria-label="breadcrumb" on nav; aria-current="page" on current page item; separator is aria-hidden

## Strengths & Gaps
- **Best at**: BreadcrumbEllipsis for deep hierarchies; correct current page semantics; full ARIA breadcrumb spec implementation
- **Missing**: No responsive collapse to short version (just ellipsis); no custom separator styling beyond prop
