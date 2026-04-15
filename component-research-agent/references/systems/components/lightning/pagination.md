---
system: Salesforce Lightning Design System
component: Pager / Pagination
url: https://lightningdesignsystem.com/components/list-view/
last_verified: 2026-03-28
confidence: medium
---

# Pager / Pagination

## Approach
Salesforce Lightning's pagination is embedded within its List View and Data Table components rather than as a standalone Pagination component. The pager shows record count context (e.g., "1-50 of 1,230 records") and prev/next controls. This reflects Lightning's tight coupling between data display and pagination for CRM list views.

## Key Decisions
1. **Embedded in list context** (HIGH) — Pagination is part of the List View/Data Table rather than standalone, ensuring consistent pagination styling within CRM record lists.
2. **Record count display** (HIGH) — Shows "X-Y of Z records" count alongside navigation, important for CRM users who need to know how many records they're working with (e.g., 1,230 active opportunities).
3. **Items per page control** (MEDIUM) — Allows changing page size (10/25/50/100 records per page), important for CRM power users who may want more records visible.

## Notable Props
- `currentPage`: Current page number
- `pageSize`: Records per page
- `totalItems`: Total record count
- `onPageChange`: Navigation callback

## A11y Highlights
- **Keyboard**: Tab through nav controls; Enter/Space to navigate
- **Screen reader**: nav landmark; current page context; record count information
- **ARIA**: nav aria-label; aria-current or aria-label indicating current position

## Strengths & Gaps
- **Best at**: Record count display; items per page control; CRM list view integration
- **Missing**: Not a standalone component; tight coupling to Lightning data components
