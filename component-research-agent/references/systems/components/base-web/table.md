---
system: Base Web (Uber)
component: Table / Data Table
url: https://baseweb.design/components/table-grid/
last_verified: 2026-03-28
confidence: medium
---

# Table / Data Table

## Approach
Base Web provides multiple table components reflecting different levels of complexity: `Table` (basic HTML table with styling), `Table-grid` (CSS grid-based for flexible column sizing), and the full-featured `Data Table` which includes sorting, filtering, column resizing, and row actions. The Data Table is particularly well-developed because Uber's internal operational tools require complex data display — driver management, trip analytics, financial reporting. This makes Base Web's table offering among the most feature-complete in the Tier 3 systems.

## Key Decisions
1. **Multiple table variants for complexity tiers** (HIGH) — Simple HTML table, grid table, and full data table are separate components. This prevents teams that only need a basic display table from importing the full data table complexity. Each component is sized appropriately for its use case.
2. **Column resizing** (HIGH) — The Data Table supports resizable columns, a feature needed in Uber's operational dashboards where users need to adjust column widths to see different amounts of data. Few other design system tables support this.
3. **Filtering architecture** (MEDIUM) — The Data Table uses a filter model where each column type (string, categorical, numerical, datetime) has its own filter component. This type-aware filtering is critical for operational data where filtering trip times (date range) differs from filtering driver status (category select).

## Notable Props
- `columns`: column definitions with type, header, key, width
- `data`: row data array
- `sortable`: enable column sorting
- `filterable`: enable type-aware column filtering
- `resizable`: enable column resize
- `overrides`: deep customization

## A11y Highlights
- **Keyboard**: Column headers are interactive buttons for sort; full keyboard navigation of table body
- **Screen reader**: `role="grid"` or proper table semantics; sort state communicated via `aria-sort`
- **ARIA**: `aria-sort` on sortable column headers; filtered/visible row count communicated

## Strengths & Gaps
- **Best at**: Column resizing; type-aware filtering; multiple complexity tiers; operational data patterns
- **Missing**: No virtualization built-in for very large datasets; pagination is manual implementation
