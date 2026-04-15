---
system: Wise Design
component: Breadcrumb
url: https://wise.design/components/breadcrumb
last_verified: 2026-03-28
confidence: low
---

# Breadcrumb

## Approach
Wise's Breadcrumb shows navigation context in their product settings and multi-step flows. Financial product breadcrumbs are typically shallow. Limited documentation means confidence is low.

## Key Decisions
1. **Settings navigation** (MEDIUM) — Used for showing position in settings and account management hierarchy.
2. **Shallow hierarchy** (LOW) — Financial product navigation is typically 2-3 levels deep.

## Notable Props
- `items`: Path items with label and href

## A11y Highlights
- **Keyboard**: Tab through links
- **Screen reader**: nav landmark; aria-current
- **ARIA**: Standard breadcrumb ARIA

## Strengths & Gaps
- **Best at**: Financial product navigation breadcrumbs
- **Missing**: Low confidence — limited documentation
