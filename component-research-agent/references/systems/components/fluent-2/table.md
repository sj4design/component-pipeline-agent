---
system: Fluent 2 (Microsoft)
component: DataGrid / Table
url: https://fluent2.microsoft.design/components/web/react/datagrid/usage
last_verified: 2026-03-28
confidence: high
---

# DataGrid / Table

## Approach
Fluent 2 provides both a simple Table component and a full DataGrid. The DataGrid is one of Fluent's most sophisticated components, reflecting Microsoft's extensive data grid needs across Azure Portal, SharePoint, and Office productivity tools. It is built on TanStack Table v8 under the hood, integrating with Fluent's visual design layer. The DataGrid supports virtualization (via TanStack Virtual), multi-column sorting, row selection, column resizing, and contextual row actions — the full enterprise data grid feature set.

## Key Decisions
1. **TanStack Table integration** (HIGH) — Fluent wraps TanStack Table, inheriting its headless data management capabilities (sorting, filtering, grouping, virtualization) while providing Fluent's visual output. This is a smart architecture that avoids reinventing complex data management logic.
2. **Virtualization via onScrolledToEnd** (HIGH) — DataGrid supports load-more and virtualized rendering for large datasets. Azure Portal and SharePoint frequently display lists with thousands of rows, requiring virtualization to maintain performance.
3. **Row selection patterns** (HIGH) — Supports single, multiple (checkbox), and range selection (Shift+click). Row selection is deeply integrated with the ARIA grid pattern — selected rows are communicated correctly to screen readers.

## Notable Props
- `items`: data array
- `columns`: column definitions using createTableColumn utility
- `selectionMode`: `"single" | "multiselect"`
- `columnSizingOptions`: initial column widths with resizable flag
- `sortable`: enables multi-column sorting
- `focusMode`: `"cell" | "row_unstable"` — keyboard navigation mode

## A11y Highlights
- **Keyboard**: Arrow keys navigate cells (cell mode) or rows; Space selects; Sort via keyboard on column headers
- **Screen reader**: `role="grid"` with `aria-rowcount`, `aria-colcount`; `aria-selected` per row; sort state via `aria-sort`
- **ARIA**: Grid role with full grid navigation ARIA; virtualization maintains correct aria-rowindex values

## Strengths & Gaps
- **Best at**: TanStack Table integration; virtualization; multi-select patterns; enterprise data grid feature set
- **Missing**: Filtering UI is not built-in (TanStack Table provides the logic, consumers build the filter UI)
