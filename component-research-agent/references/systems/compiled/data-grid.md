---
component: data-grid
compiled: 2026-03-31
systems: [material-design-3, spectrum, carbon, polaris, atlassian, ant-design]
---

# Data Grid — All Systems Digest

## Material Design 3
**Approach**: M3 provides no data grid component — only a visual spec for data tables (density, sort indicators, row selection). MUI fills the gap with its DataGrid component across Community/Pro/Premium tiers. DataGrid is column-config-driven via `GridColDef[]`, supporting sorting, filtering, grouping, row/cell editing, tree data, master-detail, and Excel export. v8 Data Source API unifies server-side operations behind a single `getRows()` callback.
**Key decisions**:
- [HIGH] Three commercial tiers (Community/Pro/Premium) gate advanced features — pivoting, aggregation, row grouping, Excel export are Premium-only; this funds sustained development of enterprise-grade grid features
- [HIGH] Column-centric configuration (`GridColDef`) with `type` field (string/number/date/singleSelect/actions) drives automatic filter UIs, sort comparators, and cell renderers per column type
- [MED] v8 Data Source API replaces fragmented server-side event handlers (`onSortModelChange`, `onFilterModelChange`) with a single `getRows()` callback; grid manages caching, retry, and abort internally
**Notable API**: `GridColDef.type` (auto-configures filter/sort/render); `processRowUpdate` (inline edit with server validation); `getTreeDataPath` (tree data via flat array with path); `apiRef` (imperative grid control); `rowGroupingModel` (Premium)
**A11y**: role="grid" with role="row" and role="gridcell"; aria-sort on sortable headers; aria-selected on selected rows; Tab moves to next interactive element inside cells (not cell-to-cell); focus management for inline editing with Escape to cancel.
**Best at**: Enterprise-scale datasets with commercial-grade features (virtualization, grouping, pivoting, Excel export). **Missing**: M3 itself has no grid component; MUI DataGrid is the de facto implementation but is a separate commercial product, not part of the M3 spec.

---

## Spectrum (Adobe)
**Approach**: React Aria provides headless hooks (`useTable`, `useGridCell`) for keyboard navigation, selection, and ARIA semantics. React Spectrum's `TableView` is the styled layer for display tables with sort and selection. For advanced data grid needs (inline editing, column pinning, virtual scroll with editing), Spectrum defers to product teams building on the hooks layer. The architecture prioritizes composability — hooks handle behavior, Spectrum handles visuals.
**Key decisions**:
- [HIGH] Hooks-first architecture means the data grid behavior (keyboard nav, selection, ARIA) is reusable across any visual framework — Adobe's own products use different visual layers on the same hooks
- [HIGH] `useTableColumnResize` hook with `ColumnResizer` component — column resizing has complex pointer, keyboard, and ARIA needs that justify a dedicated hook rather than a prop on the table
- [MED] No built-in inline editing or column filtering — Spectrum treats the table as a read-interactive surface (sort, select, navigate) rather than an edit surface; editing is delegated to detail panels or modals
**Notable API**: `sortDescriptor`/`onSortChange` (controlled sort, table never reorders data); `selectionBehavior` ("toggle" vs. "replace"); `onLoadMore` (infinite scroll); `allowsResizing` on Column; `useAsyncList` for server-side data loading
**A11y**: Deepest keyboard/SR implementation — role="grid" for interactive tables, role="treegrid" for hierarchical data; full arrow-key cell navigation; Enter to interact with cell content; aria-live for selection count announcements; `useTableColumnResize` provides keyboard-accessible column resizing via arrow keys.
**Best at**: Accessible grid behavior that can be composed into any visual framework — best hooks layer for building custom data grids. **Missing**: No built-in cell editing, column pinning, column filtering, row grouping, or aggregation. These must be built on top of the hooks.

---

## Carbon (IBM)
**Approach**: Carbon separates `DataTable` (full-featured with batch actions, toolbar, expansion, sort, selection) from basic `Table` (static display). DataTable uses a render-prop pattern that centralizes selection, sort, and expansion state. The batch action bar and toolbar are first-class architectural elements — batch actions slide in to replace the toolbar when rows are selected. No virtualization; designed for moderate datasets (50-500 rows) typical of IBM enterprise dashboards.
**Key decisions**:
- [HIGH] Batch action bar replaces toolbar on selection — standardizes multi-row operations across IBM products; visual prominence signals "you're in bulk-edit mode"
- [HIGH] Render-prop pattern (`<DataTable rows={rows} headers={headers}>{(props) => ...}</DataTable>`) gives full control over layout while DataTable manages state; avoids monolithic prop API
- [MED] No virtualization or infinite scroll — Carbon targets enterprise admin panels with paginated server-side data, not massive client-side datasets
**Notable API**: `isSortable` (table-level, not column-level); `useZebraStyles`; `stickyHeader`; `<TableToolbar>` + `<TableBatchActions>` (composable toolbar/batch); `<TableExpandRow>` + `<TableExpandedRow>` for row expansion; `radio` prop for single-select mode
**A11y**: Native `<table>` semantics (not role="grid"); aria-sort on sortable headers; batch action bar announces selected count via aria-live; aria-label on checkboxes includes row identifier; expandable rows use aria-expanded; Tab between interactive elements.
**Best at**: Enterprise batch operations — composable toolbar, batch action bar, expandable rows, progressive disclosure. **Missing**: No virtualization, column pinning, column resizing, cell editing, column filtering, or drag-and-drop reordering.

---

## Polaris (Shopify)
**Approach**: Polaris splits data grid functionality across two components — `IndexTable` (resource management with selection, bulk actions, sort, sticky headers) and `DataTable` (read-only display with totals row, numeric alignment). IndexTable is the primary data grid component for Shopify admin, designed for merchant resource lists (orders, products, customers). No column filtering, cell editing, or virtualization — Shopify's data model pushes complex filtering to dedicated filter bars above the table.
**Key decisions**:
- [HIGH] IndexTable vs. DataTable split prevents combining incompatible interaction models — selection/bulk-actions vs. numeric summaries/totals
- [HIGH] `promotedBulkActions` vs. `bulkActions` — promoted actions are always visible in the bulk action bar, reflecting that 90% of merchants use only 2-3 common actions
- [MED] `condensed` prop transforms IndexTable into a card-based mobile layout — Shopify admin is mobile-heavy; tables don't work on phone screens
**Notable API**: `resourceName` (singular/plural for "1 order selected" / "3 orders selected" announcements); `promotedBulkActions`/`bulkActions`; `totals` (summary row on DataTable); `sortable`/`onSort` (column-level on IndexTable); `hasMoreItems` (pagination signal)
**A11y**: IndexTable uses native `<table>` with aria-live for selection count; aria-sort on sortable headers; role="rowheader" on first cell to identify the resource; bulk action bar keyboard accessible; condensed mobile layout maintains selection a11y.
**Best at**: E-commerce resource management — selection + bulk actions + promoted actions + mobile card layout. **Missing**: No column resizing, cell editing, column filtering, virtualization, row expansion, column pinning, or drag-reorder.

---

## Atlassian
**Approach**: Atlassian's `DynamicTable` is a batteries-included data grid optimized for Jira/Confluence moderate-size lists (50-200 rows). Unique among all systems for built-in drag-and-drop row ranking with full keyboard accessibility. Includes pagination, sort, loading states, and row highlighting. No virtualization — pagination is preferred for position awareness ("page 3 of 7") in project management contexts.
**Key decisions**:
- [HIGH] `isRankable` enables drag-and-drop row reordering with keyboard support (Space to grab, arrow keys to move, Space to drop) — unique feature solving inconsistent drag-and-drop a11y across Atlassian teams
- [HIGH] Pagination over virtualization — position awareness matters more than seamless scroll for project management workflows
- [MED] Loading state dims content to 20% opacity (not skeleton) — continuity with previous data prevents disorientation during reload
**Notable API**: `isRankable` + `onRankStart`/`onRankEnd` callbacks; `isFixedSize` (prevents height changes during pagination); `emptyView` (custom empty state); `sortKey`/`sortOrder`/`onSort` (controlled sort); `rowsPerPage`/`onSetPage` (pagination)
**A11y**: Keyboard ranking: Space to grab, arrow keys to reposition, Space to drop, Escape to cancel; aria-live announcements for rank changes ("Row moved from position 3 to position 1"); aria-sort on sortable headers; loading state announced to SR.
**Best at**: Drag-and-drop ranking with full keyboard/SR accessibility — only system with built-in accessible row ranking in a data grid. **Missing**: No column resizing, column pinning, column filtering, virtualization, cell editing, or row expansion.

---

## Ant Design
**Approach**: Maximalist single `<Table>` component that absorbs virtually every data grid feature — virtual scrolling, tree data via `children` field, fixed/pinned columns (CSS sticky in v5), expandable rows, column-level filter dropdowns, inline editing (via custom render), drag-and-drop sort, summary rows, nested sub-tables, and row/cell selection. Column-config-driven via `columns` array with per-column `sorter`, `filters`, `render`, `fixed`, and `width`. v5 refactored fixed columns from duplicate DOM to CSS sticky, enabling virtual scroll + fixed columns simultaneously.
**Key decisions**:
- [HIGH] Column-level `filters` array renders a dropdown filter UI directly in the column header — users filter data where they see it, not in a separate panel; each column can have its own filter type
- [HIGH] v5 CSS sticky for fixed columns replaced v4's duplicate DOM approach — fixes SR double-reading, enables virtual scroll + pinned columns, and reduces DOM size by ~50% for wide tables
- [MED] `children` field in data objects automatically renders tree structure — no separate TreeTable component; pervasive in Chinese enterprise hierarchical data (org charts, category trees)
**Notable API**: `virtual` (requires `scroll.y` numeric); `columns[].fixed` ("left"/"right" for pinning); `columns[].filters` + `columns[].onFilter`; `expandable` config object; `Table.EXPAND_COLUMN`/`Table.SELECTION_COLUMN` (column ordering sentinels); `summary` (sticky footer); `rowSelection.type` ("checkbox"/"radio")
**A11y**: Native `<table>` semantics preserved even in virtual scroll mode; aria-sort on sortable headers; aria-expanded on expandable rows; keyboard a11y less refined than Spectrum/Carbon — no standardized cell navigation pattern; filter dropdown keyboard support relies on Ant's Dropdown component. SR announcements for virtual scroll position are minimal.
**Best at**: Feature density — virtual scroll + tree data + fixed columns + expandable rows + column filters + summary rows in one component. **Missing**: A11y depth lags Spectrum/Carbon significantly; 50+ prop API has steep learning curve; no built-in cell editing component (requires custom `render`).
