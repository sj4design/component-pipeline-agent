---
component: Data Grid
tier: 3
last_verified: 2026-03-31
---

# Data Grid — Tier 3 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Radix UI | Table (Themes) | Presentational only — `Table.Root`, `Table.Header`, `Table.Body`, `Table.Row`, `Table.ColumnHeaderCell`, `Table.Cell`; no built-in sort, filter, or selection; explicitly recommends TanStack Table for data grid needs | high |
| Chakra UI | Table | Display table with `variant` (simple/striped/unstyled), `colorScheme`, and `TableContainer` for overflow scroll; no data grid features; v3 adds `Table.ScrollArea`; data grids require external integration | high |
| GOV.UK | Table | Guidance-first static table — caption required, numeric columns right-aligned, `firstCellIsHeader` for row headers; Nunjucks macro with `head`/`rows` arrays; no JS interactivity, no sorting, no selection; governs 1000+ government services | high |
| Base Web (Uber) | Table / Table-Grid / Data Table | Three-tier system: semantic `Table` (basic HTML), `Table-Grid` (CSS grid layout for column alignment), and `Data Table` with built-in sort, type-aware column filters (categorical/numerical/boolean/datetime), text search, batch actions, column resizing, and row selection | high |
| Fluent 2 (Microsoft) | DataGrid / Table | DataGrid wraps TanStack Table v8 natively; virtualization via `useVirtualizer`; multi-column sort; single/multi row selection; column resizing; `focusMode` ("cell"/"row_unstable"/"composite"); Table is the presentational-only sibling | high |
| Gestalt (Pinterest) | Table | Sticky header and sticky first/last columns via `stickyColumns`; expandable rows for campaign-to-ad-group-to-ad hierarchy; sortable columns with server-sort callbacks; `onExpandedChange` for async child loading; analytics and ad management focused | medium |
| Mantine | Table | Presentational core with `stickyHeader`, `striped`, `highlightOnHover`, `withColumnBorders`; no built-in sort/filter/selection; community `mantine-datatable` package adds sort, filter, pagination, row selection, column toggling, and context menus | high |
| Orbit (Kiwi.com) | Not available | Travel products use card-based and list patterns for flight results and itineraries; dense tabular data is outside Kiwi.com's consumer-facing scope; no table or data grid component | medium |
| Evergreen (Segment) | Table | `Table.SearchHeaderCell` for inline column filter-as-you-type; `Table.Row` with `isSelectable`/`isSelected` for bulk operations; `onScrolled` callback for infinite loading detection; analytics-first design for Segment's data pipeline UIs | medium |
| Nord (Nordhealth) | Table (`nord-table`) | Web component for clinical data (patient lists, lab results, medication schedules); `sortable` attribute on headers; typography and spacing calibrated for clinical numerical legibility; semantic HTML slot structure; limited interactive features | low |

## Key Decision Patterns

The T3 data grid landscape divides into three clear tiers of capability. At the top, Fluent 2's DataGrid and Base Web's Data Table provide full data grid functionality — sort, filter, selection, column resize, and (in Fluent 2's case) virtualization. In the middle, Gestalt and Evergreen add targeted high-value features to basic tables — Gestalt provides sticky columns and expandable row hierarchies for ad campaign management, while Evergreen provides inline column search for analytics lists. At the bottom, Radix, Chakra, GOV.UK, Mantine, Orbit, and Nord provide either presentational-only tables or no table component at all. The practical takeaway is that most design systems do NOT build a data grid — they build a styled table and defer grid complexity to external libraries like TanStack Table.

Fluent 2's DataGrid is the most architecturally significant data grid in the T3 set because it wraps TanStack Table v8 natively. This means TanStack owns data operations (sort, filter, group, paginate) while Fluent owns visuals and ARIA. The `focusMode` prop is particularly notable: "cell" mode enables arrow-key cell navigation (role="grid" behavior), while "row_unstable" mode treats each row as a single tab stop (simpler for tables without interactive cell content). This explicit choice between focus modes acknowledges that role="grid" keyboard navigation is complex and sometimes unnecessary — a design decision most systems avoid by defaulting to one mode.

Base Web's three-tier table model (Table, Table-Grid, Data Table) is the most explicit progressive-complexity approach. Teams choose their entry point based on need: semantic HTML for simple display, CSS grid for aligned columns, or full Data Table for interactive data management. The Data Table's type-aware column filters are a standout — categorical columns get checkbox filter lists, numerical columns get range sliders, boolean columns get toggle filters, and datetime columns get date range pickers, all configured via the column `type` property rather than manual filter UI construction.

Gestalt's sticky columns and expandable row hierarchy reflect Pinterest's ad management domain, where campaign-to-ad-group-to-ad hierarchies are the primary data structure. The `stickyColumns` prop ("first", "last", or both) keeps identifier and action columns visible during horizontal scroll — a critical UX for wide tables with many metrics columns. The expandable row pattern uses `onExpandedChange` with async child loading, meaning child rows are fetched on demand rather than loaded upfront.

## A11y Consensus

- Presentational tables must use semantic HTML (`<table>`, `<thead>`, `<th scope="col">`, `<tbody>`, `<td>`) — screen readers depend on native table semantics for row/column navigation
- Interactive data grids must use `role="grid"` with arrow-key cell navigation; read-only tables use `role="table"` or native `<table>` without grid navigation expectations
- `<caption>` is required for standalone tables (GOV.UK mandates this) — without a caption, screen readers announce "table" with no context
- Sortable headers must use `<button>` elements with `aria-sort="ascending"` | `"descending"` | `"none"` — sort state must be conveyed programmatically
- Virtual scrolling grids must provide `aria-rowcount` and `aria-colcount` on the grid element and `aria-rowindex` on each rendered row (Fluent 2 implements this) so screen readers know the full grid dimensions even when only a subset of rows is in the DOM
- Focus management for inline editing: Enter to begin editing, Escape to cancel, Tab/Shift+Tab to move between editable cells

## Recommended Use

Reference T3 data grid approaches when deciding between building a full data grid versus using presentational tables with TanStack Table. Fluent 2 DataGrid is the reference for TanStack Table v8 integration as a native data grid engine with virtualization, multi-column sort, and focus mode selection. Base Web Data Table is the reference for type-aware column filters (categorical/numerical/boolean/datetime) and progressive table complexity (three-tier model). Gestalt is the reference for sticky columns and expandable row hierarchies in analytics/ad management contexts. Evergreen is the reference for inline column search (`Table.SearchHeaderCell`). GOV.UK is the reference for content guidelines (caption required, numeric alignment, scope attributes). Mantine demonstrates the community-package pattern where the core provides styling and the ecosystem provides data grid features.
