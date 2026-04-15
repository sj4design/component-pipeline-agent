---
system: Gestalt (Pinterest)
component: Table
url: https://gestalt.pinterest.systems/web/table
last_verified: 2026-03-28
confidence: medium
---

# Table

## Approach
Gestalt's Table is built for Pinterest's analytics and advertising dashboard use cases — displaying campaign performance data, pin metrics, and ad group results. It supports sticky headers and columns (important for wide data tables), row expansion for nested data, and sortable columns. The component is more feature-rich than many design system tables because Pinterest's ad manager and analytics products need real data table functionality, not just a styled HTML table.

## Key Decisions
1. **Sticky header and columns** (HIGH) — Gestalt Table supports both sticky column headers and sticky first/last columns, which is critical for wide analytical tables where users need to keep context visible while scrolling horizontally.
2. **Expandable rows** (HIGH) — The Table supports row expansion to show nested data (campaign → ad group → ads hierarchy). This matches Pinterest's analytics data structure where metrics exist at multiple hierarchy levels.
3. **Column sorting** (MEDIUM) — Built-in sort indicators and callbacks per column. Sort state is controlled by the consumer, allowing integration with API-based sorting for server-side data.

## Notable Props
- `borderStyle`: `"sm" | "none"` — table border style
- Table.Header, Table.Body, Table.Row, Table.Cell: composable structure
- `Table.SortableColumn`: sortable column header
- `Table.ExpandableRow`: expandable row pattern

## A11y Highlights
- **Keyboard**: Sortable column headers are interactive; expand/collapse row buttons are keyboard accessible
- **Screen reader**: `aria-sort` on sorted columns; expand/collapse state communicated
- **ARIA**: Table role semantics; expandable rows use aria-expanded on the trigger

## Strengths & Gaps
- **Best at**: Sticky headers/columns; expandable row hierarchies; ad analytics patterns
- **Missing**: No built-in pagination; no row selection; no filter UI
