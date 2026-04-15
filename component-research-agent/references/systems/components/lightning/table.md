---
system: Salesforce Lightning Design System
component: Data Table
url: https://lightningdesignsystem.com/components/data-tables/
last_verified: 2026-03-28
confidence: high
---

# Data Table

## Approach
Salesforce Lightning's Data Table is one of the most feature-rich table implementations in any design system, reflecting Salesforce CRM's heavy reliance on tabular data for records, reports, and list views. Lightning provides advanced data table features including row selection (checkboxes), inline editing, column resizing, column reordering, row actions (overflow menus per row), and fixed header scrolling. This is a true data grid component, not just a styled table.

## Key Decisions
1. **Row selection with bulk actions** (HIGH) — Checkbox-based row selection with select-all header is a first-class pattern, enabling the CRM list view bulk action pattern (mass update, delete, reassign records).
2. **Inline editing** (HIGH) — Cells can be made editable inline, supporting Salesforce's "quick edit" record list pattern without navigating to a record detail page.
3. **Row-level actions menu** (HIGH) — Each row has an overflow action menu (edit, delete, view, custom actions) matching the standard Salesforce record list action pattern used throughout CRM.

## Notable Props
- `rows`: Data array for table rows
- `columns`: Column definition array with type, label, field, sortable, editable
- `selectedRows`: Controlled row selection
- `onRowSelection`: Row selection callback
- `defaultSortDirection`: Initial sort state

## A11y Highlights
- **Keyboard**: Full keyboard navigation; row selection via Space; column sorting via Enter on sortable headers
- **Screen reader**: aria-sort on sortable columns; aria-selected on rows; cell content announced with column context
- **ARIA**: aria-multiselectable on table; aria-sort; role="gridcell"; aria-selected on rows

## Strengths & Gaps
- **Best at**: Enterprise data grid features; row selection; inline editing; row actions — the most complete table implementation in this set
- **Missing**: Virtual scrolling for very large datasets; heavy component weight for simple display tables
