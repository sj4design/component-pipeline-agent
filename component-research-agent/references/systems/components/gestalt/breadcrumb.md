---
system: Gestalt (Pinterest)
component: Breadcrumbs
url: https://gestalt.pinterest.systems/web/breadcrumbs
last_verified: 2026-03-28
confidence: medium
---

# Breadcrumbs

## Approach
Gestalt's Breadcrumbs component provides a navigation trail for hierarchical page structures. It renders as a nav landmark with an ordered list of items. Pinterest uses breadcrumbs in their settings, help center, and admin interfaces. The component supports icon display alongside text labels and handles the current-page state.

## Key Decisions
1. **items array API** (HIGH) — Items are passed as a data array `[{ href, label }]` rather than composed JSX children. This data-driven API is common in Gestalt and ensures consistent rendering of separators and current-page detection automatically.
2. **Current item detection** (HIGH) — The last item in the array is automatically treated as the current page (non-linked, aria-current="page"), simplifying authoring by not requiring a separate prop.

## Notable Props
- `items`: array of `{ href, label }` navigation items
- `accessibilityLabel`: nav aria-label (default "Breadcrumb")

## A11y Highlights
- **Keyboard**: Tab navigates between links
- **Screen reader**: nav with aria-label; last item has aria-current="page"
- **ARIA**: Correct landmark and current page

## Strengths & Gaps
- **Best at**: Data array API for consistent rendering; automatic current-page detection; nav landmark
- **Missing**: No collapseOnMobile; no icon support in items; no custom separator
