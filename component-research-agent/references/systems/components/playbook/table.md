---
system: Playbook (Power Home Remodeling)
component: Table
url: https://playbook.powerapp.cloud/kits/table
last_verified: 2026-03-28
confidence: medium
---

# Table

## Approach
Playbook's Table is used in their CRM and project management tools for displaying job lists, customer records, and scheduling data. The React/Rails dual implementation is present here as with all Playbook components. The table supports the standard data display patterns needed for their internal business applications including sorting and row actions.

## Key Decisions
1. **CRM data display** (HIGH) — Table design prioritizes the data display patterns in Power Home Remodeling's CRM — lists of jobs, customers, scheduling entries — rather than general-purpose data grid scenarios.
2. **Dual framework support** (HIGH) — React and ViewComponent implementations ensure consistent table display across their application stack.
3. **Responsive handling** (MEDIUM) — Table likely has responsive behavior for mobile, as field sales staff access the CRM on mobile devices.

## Notable Props
- `data` / `rows`: Row data
- `columns`: Column definitions
- `sortable`: Sort support per column

## A11y Highlights
- **Keyboard**: Standard table navigation; sort headers as buttons
- **Screen reader**: Semantic table structure; sort state announced
- **ARIA**: aria-sort on sortable headers; proper table semantics

## Strengths & Gaps
- **Best at**: CRM data list patterns; dual framework support
- **Missing**: Medium confidence; advanced feature set uncertain
