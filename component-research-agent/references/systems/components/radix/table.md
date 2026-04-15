---
system: Radix UI (WorkOS)
component: Table
url: https://www.radix-ui.com/themes/docs/components/table
last_verified: 2026-03-28
confidence: high
---

# Table

## Approach
Radix UI provides a Table component in Radix Themes (the styled layer on top of the primitives), not in the headless primitives library. It is a presentational table component covering the semantic HTML table structure with Radix's design tokens applied. Radix Themes Table covers static data display — not interactive features like sorting, filtering, or pagination. For complex data tables, the Radix team points to TanStack Table (React Table) as the logical pairing, where Radix Themes provides the visual styling and TanStack provides the data management layer.

## Key Decisions
1. **Presentational-only scope** (HIGH) — Radix deliberately limits Table to display concerns. No built-in sort, filter, or pagination. This is consistent with Radix's philosophy of being a correct primitive layer, not a data grid.
2. **Semantic HTML structure** (HIGH) — Table, Table.Header, Table.Body, Table.Row, Table.ColumnHeaderCell, Table.Cell, Table.RowHeaderCell all map to their HTML table element equivalents. This enforces correct table semantics rather than div-based table layouts.
3. **Row variants** (MEDIUM) — Rows support hover states and interactive variants for clickable rows. This covers the common pattern of clicking a row to navigate to a detail view without requiring a full data grid component.

## Notable Props
- `size`: controls cell padding density (`"1" | "2" | "3"`)
- `variant`: `"surface" | "ghost"` — fill or no-fill for the table background
- `Table.Row > onClick`: makes rows interactive with cursor and hover styling

## A11y Highlights
- **Keyboard**: Not interactive by default; clickable rows are wrapped in `<button>` elements
- **Screen reader**: Proper `<th>` elements with `scope` attributes; `<caption>` support for table titles
- **ARIA**: Semantic HTML means minimal additional ARIA needed; scope attributes on header cells provide column/row association

## Strengths & Gaps
- **Best at**: Semantic HTML table structure; correct header/body/row hierarchy; clean token integration
- **Missing**: No sort, filter, pagination, selection, or virtualization — must use TanStack Table or similar
