---
system: shadcn/ui
component: Breadcrumb
url: https://ui.shadcn.com/docs/components/breadcrumb
last_verified: 2026-03-28
confidence: high
---

# Breadcrumb

## Approach
shadcn/ui's Breadcrumb is a composed set of semantic components (Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis) following the ARIA breadcrumb pattern. The ellipsis component supports a dropdown for revealing collapsed middle items in long breadcrumb trails, using DropdownMenu for the expansion interaction.

## Key Decisions
1. **BreadcrumbEllipsis with DropdownMenu** (HIGH) — When breadcrumbs are collapsed for long trails, the ellipsis expands into a DropdownMenu showing the hidden middle items — a more feature-complete approach than a simple click-to-expand pattern.
2. **BreadcrumbPage vs BreadcrumbLink** (HIGH) — Explicit component distinction between BreadcrumbLink (navigable previous pages) and BreadcrumbPage (current page, rendered as span with aria-current), enforcing correct semantics.
3. **Custom separator** (MEDIUM) — BreadcrumbSeparator is a slot that accepts any React content — chevron icon, slash, or custom separator, enabling visual customization.

## Notable Props
- BreadcrumbLink `asChild`: Compose with router Link component
- BreadcrumbEllipsis: Triggers DropdownMenu for hidden middle items
- BreadcrumbSeparator: Custom separator content slot

## A11y Highlights
- **Keyboard**: Tab through links; BreadcrumbPage not in tab order; dropdown ellipsis opens with Enter/Space
- **Screen reader**: nav aria-label="breadcrumb"; BreadcrumbPage has aria-current="page"; BreadcrumbSeparator is aria-hidden; list structure
- **ARIA**: aria-label on nav; aria-current on page; aria-hidden on separators; DropdownMenu ARIA for expanded ellipsis

## Strengths & Gaps
- **Best at**: DropdownMenu ellipsis for long trails; BreadcrumbPage/BreadcrumbLink semantic distinction; custom separator slot
- **Missing**: No automatic responsive collapse; developer manually configures when to show ellipsis
