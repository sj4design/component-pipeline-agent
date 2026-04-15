---
system: Salesforce Lightning Design System
component: Breadcrumb
url: https://lightningdesignsystem.com/components/breadcrumbs/
last_verified: 2026-03-28
confidence: high
---

# Breadcrumb

## Approach
Lightning's Breadcrumb is used for navigational context in Salesforce CRM — showing the path from home to the current record or configuration page. Lightning breadcrumbs are typically short (2-3 levels) since CRM pages are usually accessed from list views and record pages within a flat hierarchy. The component uses nav/ol/li semantic structure.

## Key Decisions
1. **Short hierarchy focus** (HIGH) — Lightning's CRM navigation hierarchy is typically shallow (App > Object > Record) so breadcrumbs are kept to 2-3 items, without the need for ellipsis truncation.
2. **nav + ol structure** (HIGH) — Semantic ordered list within a nav element with aria-label="breadcrumb" for correct screen reader navigation.
3. **Item truncation** (MEDIUM) — Long record names in breadcrumb items are truncated with ellipsis and full title in tooltip, preventing layout overflow.

## Notable Props
- `trail`: Array of {label, href} breadcrumb items
- `isCurrentPage`: Marks the final item

## A11y Highlights
- **Keyboard**: Tab through links; current page not a link
- **Screen reader**: nav landmark with "breadcrumb" label; list structure; current page via aria-current
- **ARIA**: aria-label="breadcrumb" on nav; aria-current="page" on current; separator aria-hidden

## Strengths & Gaps
- **Best at**: Clean CRM navigation breadcrumb; tooltip for truncated labels; standard semantic structure
- **Missing**: No ellipsis for long trails; limited to shallow hierarchies
