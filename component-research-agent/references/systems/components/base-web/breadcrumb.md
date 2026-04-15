---
system: Base Web (Uber)
component: Breadcrumbs
url: https://baseweb.design/components/breadcrumbs/
last_verified: 2026-03-28
confidence: medium
---

# Breadcrumbs

## Approach
Base Web's Breadcrumbs component provides a navigation trail with a separator between items. It renders as a `<nav>` containing a list of StyledLink items with separators. The component integrates with Base Web's theming for consistent separator and link styles. Custom separators can be provided via the `overrides` pattern.

## Key Decisions
1. **Overrides for separator customization** (HIGH) — The Separator sub-element in `overrides` accepts a custom component, allowing icon separators (chevron, slash) without CSS hacks.
2. **StyledLink integration** (MEDIUM) — Breadcrumb items use Base Web's StyledLink, ensuring link styles are consistent with other links in the application and respect the theme's link color tokens.

## Notable Props
- `overrides`: target List, ListItem, Separator, StyledLink
- Children: pass `<StyledLink>` items directly

## A11y Highlights
- **Keyboard**: Standard link keyboard navigation
- **Screen reader**: nav with aria-label="Breadcrumb"; last item has aria-current="page"
- **ARIA**: Proper nav landmark and current page marking

## Strengths & Gaps
- **Best at**: Overrides for separator; StyledLink integration; theming support
- **Missing**: No collapseOnMobile; no built-in truncation for deep paths
