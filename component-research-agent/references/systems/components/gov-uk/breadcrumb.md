---
system: GOV.UK Design System
component: Breadcrumbs
url: https://design-system.service.gov.uk/components/breadcrumbs/
last_verified: 2026-03-28
confidence: high
---

# Breadcrumbs

## Approach
GOV.UK's Breadcrumbs component follows the GOV.UK Frontend HTML pattern with a `<nav aria-label="Breadcrumb">` wrapping an `<ol>` of links. It is typically used only on content pages (not transactional service pages) to show a user's location within the information architecture. The final item is the current page and is rendered as non-linked text.

## Key Decisions
1. **collapseOnMobile** (HIGH) — An option to collapse breadcrumbs on small screens to show only the immediate parent, preventing long breadcrumb trails from overwhelming mobile layouts.
2. **Nunjucks macro for server rendering** (HIGH) — GOV.UK Frontend provides a Nunjucks macro `govukBreadcrumbs({ items: [...] })` for server-side rendering, fitting the progressive enhancement model without requiring JavaScript.
3. **Not for transactional services** (MEDIUM) — GOV.UK guidance explicitly states breadcrumbs should not be used in transactional services (multi-step forms, checkout-style flows) where they might confuse linear task completion.

## Notable Props
- `items`: array of `{ text, href }` objects
- `collapseOnMobile`: show only parent on mobile
- `classes`: additional CSS classes

## A11y Highlights
- **Keyboard**: Standard link navigation
- **Screen reader**: nav with aria-label="Breadcrumb"; last item has aria-current="page"
- **ARIA**: Correct nav landmark, aria-current on current page

## Strengths & Gaps
- **Best at**: collapseOnMobile option; server-side Nunjucks rendering; clear guidance on when not to use
- **Missing**: No collapsible "..." truncation for very deep paths; no custom separator
