---
component: Table
tier: 3
last_verified: 2026-03-29
---

# Table — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Table (Themes) | Presentational only; maps to semantic HTML (`Table.Header`, `Table.Body`, `Table.Row`, `Table.ColumnHeaderCell`, `Table.Cell`); `size` for density; interactive row via `onClick`; TanStack Table recommended for data management. | high |
| Chakra UI | Table | `TableContainer` wrapper for horizontal overflow scroll; `variant` (simple/striped/unstyled); `colorScheme` for stripe color; semantic HTML structure; presentational only. | high |
| GOV.UK | Table | Guidance-first: caption required; numeric columns right-aligned; `firstCellIsHeader` for row header `<th>`; Nunjucks macro with `head`/`rows` data arrays; no JS, no sorting. | high |
| Base Web | Table / Data Table | Three-tier system: basic HTML Table, grid-layout Table-grid, and full-featured Data Table with sorting, type-aware column filtering, and column resizing; Overrides throughout. | medium |
| Fluent 2 | DataGrid / Table | DataGrid built on TanStack Table v8; virtualization; multi-column sort; single/multiselect rows; column resizing; `focusMode` ("cell" or "row_unstable"); `aria-rowcount`/`aria-colcount` for virtual grids. | high |
| Gestalt | Table | Sticky header and sticky first/last columns; expandable rows for campaign→ad group→ad hierarchy; sortable columns with server-sort callbacks; analytics-focused. | medium |
| Mantine | Table | `stickyHeader` with `stickyHeaderOffset`; `striped` ("odd"/"even"); `highlightOnHover`; `withColumnBorders`; `withTableBorder`; `captionSide`; presentational core, DataTable in community packages. | high |
| Orbit | Not available — card-based layouts | Travel products use card/list patterns for flight results and itineraries; dense tabular data is outside Kiwi.com's consumer-facing scope. | medium |
| Evergreen | Table | `Table.SearchHeaderCell` for inline column filter-as-you-type; `Table.Row` with `isSelectable`/`isSelected` for bulk operations; `onScrolled` for infinite loading detection; analytics-first design. | medium |
| Nord | Table (nord-table) | Web component for clinical data (patient lists, lab results, medication schedules); typography and spacing calibrated for clinical numerical legibility; `sortable` headers; semantic HTML slot structure. | low |

## Key Decision Patterns

The most architecturally significant divide in T3 tables is presentational versus data-management. Radix, Chakra, GOV.UK, Mantine, and Nord all provide styled HTML tables only — no sorting, filtering, or selection. Base Web and Fluent 2 both provide a full data grid with sorting, filtering, selection, and column management. Gestalt and Evergreen sit in between: they add specific high-value features (sticky columns, inline search, expandable rows) without attempting a full data grid. The practical implication is that systems with only presentational tables point to external libraries (TanStack Table) for data management, while systems with data grids absorb that complexity into the design system. Neither approach is universally better — TanStack Table integration avoids reinventing a complex solved problem, while built-in data grids guarantee visual consistency and accessibility correctness across all features.

Fluent 2's DataGrid using TanStack Table v8 as its data layer is the cleanest architecture in the T3 set for a full-featured table. TanStack Table v8 is a headless, framework-agnostic data management library that handles sorting, filtering, grouping, pagination, and virtualization without any UI output. Fluent 2 wraps it with Fluent's visual components and ARIA implementation. The result separates concerns cleanly: TanStack owns "how does the data sort and filter," Fluent owns "how does it look and what ARIA attributes does it have." This is the same architecture Radix recommends (use TanStack + Radix styling), but Fluent 2 builds the integration natively rather than leaving it to consumers.

Evergreen's `Table.SearchHeaderCell` is the most domain-specific table feature in the T3 set, and also the most practically impactful for analytics UIs. Every analytics tool with a list of sources, destinations, or users needs a search input in the header row to filter the visible rows. Evergreen builds this directly into the table structure rather than requiring teams to add a standalone search field above the table. This means the filter UI is visually integrated into the column header, the filter state is co-located with the column definition, and the implementation pattern is consistent across every list view in Segment's product. No other T3 system bakes inline column search into the table component itself.

GOV.UK's guidance-first approach to tables is unique in the T3 set. Rather than just providing a styled component, GOV.UK provides explicit content guidelines alongside the component: always use a caption, right-align numeric columns, use `scope="col"` and `scope="row"` on all header cells, and avoid using tables for layout. These are the most common semantic HTML table mistakes in production, and GOV.UK's co-location of guidance with the component means teams encounter the rules at the point of use rather than in a separate documentation section they may never read.

## A11y Consensus

- Tables must use semantic HTML elements (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) rather than div-based table layouts — screen readers rely on native table semantics for row/column navigation; ARIA role-based table workarounds are error-prone.
- Column headers must have `scope="col"` and row headers `scope="row"` — without scope attributes, screen readers cannot reliably associate header cells with their data cells, especially in tables with both row and column headers.
- `<caption>` is required for standalone tables — without a caption, screen readers announce "table" with no context; a caption provides the equivalent of a heading for the table.
- Sortable column headers must be buttons (not divs) and must communicate sort state via `aria-sort="ascending"` or `aria-sort="descending"` — clicking a column header that isn't a button is inaccessible to keyboard users; the sort state must be conveyed programmatically, not just visually.
- For data grids with interactive cells, `role="grid"` with arrow-key navigation (moving between cells) is the correct ARIA pattern; `role="table"` is for read-only tables where arrow key navigation is not expected.

## Recommended Use

Reference T3 table approaches when deciding on presentation-only vs. data grid architecture, TanStack Table integration, and domain-specific table features. Fluent 2 is the reference for TanStack Table integration as a DataGrid foundation with virtualization and full row selection; Evergreen is the reference for `Table.SearchHeaderCell` for inline column filtering in analytics lists; Gestalt is the reference for sticky header/column and expandable row hierarchy; GOV.UK is the reference for content guidelines (caption, numeric alignment, scope attributes) co-located with the component; Base Web is the reference for the three-tier table complexity model (simple/grid/data table) matching different team needs.
