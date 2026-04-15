---
component: table
compiled: 2026-03-28
systems: material-design-3, spectrum, carbon, polaris, atlassian, ant-design
---

# Table — All Systems Digest

## Material Design 3
**Approach**: M3 provides only visual spec (density, sort indicators, row selection) — no production table component ships. MUI fills the gap with DataGrid in Community/Pro/Premium tiers. Column-centric configuration via GridColDef. v8 Data Source API simplifies server-side integration.
**Key decisions**:
- Intentional spec-vs-implementation gap; Google's own tables are too custom for generic components
- Three commercial tiers (Community/Pro/Premium) fund advanced features (pivoting, aggregation, Excel export)
- `getRows()` single callback (v8) replaces multiple event handlers; grid manages caching/retry internally
**Notable API**: `getRows` (Data Source API); `columnVisibilityModel`; `checkboxSelection` + `disableRowSelectionOnClick` (separate because different a11y implications)
**A11y**: role="grid" + role="row" + role="gridcell"; aria-sort on headers; aria-selected on rows; Tab moves to next interactive element (not next cell, for SR compatibility).
**Best at**: Massive enterprise datasets with commercial-grade features. **Missing**: M3 has no table component; MUI integration required for any real use.

## Spectrum (Adobe)
**Approach**: Two layers — React Aria hooks (behavior/a11y, headless) + React Spectrum TableView (styled). JSX composition API (`<TableHeader><Column><Row><Cell>`) rather than config arrays. Column resizing and async loading as first-class features.
**Key decisions**:
- Hooks layer shares keyboard/selection/ARIA logic across all Adobe products; prevents fragmentation from copy-paste
- JSX composition over config arrays; dynamic columns and async patterns compose naturally as React trees
- `ColumnResizer` and `ResizableTableContainer` as explicit components; resizing has complex pointer + keyboard + ARIA needs
**Notable API**: `sortDescriptor`/`onSortChange` (controlled, table never reorders data itself); `selectionBehavior` (toggle vs. replace); `onLoadMore` (infinite scroll)
**A11y**: Deepest keyboard/SR support researched; role="grid" for interactive, role="treegrid" for tree; aria-live for selection count; full cell navigation with Enter/Space/arrow keys.
**Best at**: Accessible table behavior reusable across any visual framework. **Missing**: No cell editing, inline filtering, or column pinning.

## Carbon (IBM)
**Approach**: Action-oriented — batch operations and toolbar are first-class architectural elements, not add-ons. Render-prop pattern manages selection/sort/expansion state centrally. Uses native `<table>` elements (not role="grid") for better default SR support.
**Key decisions**:
- Batch action bar slides in on row selection; replaces toolbar; standardizes multi-row operations across IBM products
- Toolbar is a separate composable sibling component; monolithic toolbar prop becomes unwieldy config object
- Sort arrows appear on hover only; reduces visual noise in 10+ column dashboards
**Notable API**: `isSortable` (per-table, not per-column); `useZebraStyles`; `stickyHeader`; `dismissable` on rows
**A11y**: Native `<table>` semantics over role="grid"; batch action bar announces selected count via aria-live; Tab between interactive elements (not cell navigation).
**Best at**: Enterprise action workflows — batch operations, composable toolbars, progressive disclosure via expandable rows. **Missing**: No virtualization, column pinning, or cell editing.

## Polaris (Shopify)
**Approach**: Two focused components — DataTable (read-only display with totals, numeric data) vs. IndexTable (resource management with selection, bulk actions). Split prevents combining incompatible features. Sticky headers default on IndexTable.
**Key decisions**:
- DataTable vs. IndexTable split; one for analytics display, one for merchant resource management
- Built-in `totals` row in DataTable; financial summaries are universal in Shopify admin
- `promotedBulkActions` vs. `bulkActions` split reflects 90% of merchants using only 2-3 common actions
**Notable API**: `totals` (summary row); `promotedBulkActions` (always visible); `condensed` (transforms IndexTable to mobile card layout)
**A11y**: Native `<table>` elements; aria-live for selection count; aria-sort on sortable headers; role="rowheader" on first cell to identify the resource.
**Best at**: E-commerce resource management — built-in totals, promoted bulk actions, clear component split. **Missing**: No column resizing, row expansion, drag-reorder, or virtualization.

## Atlassian
**Approach**: Batteries-included with built-in drag-and-drop ranking (unique among all systems), pagination, loading states, and sort. Optimized for Jira/Confluence moderate-size lists (50–200 rows), not massive datasets. Accessible drag-and-drop via keyboard.
**Key decisions**:
- `isRankable` enables drag-and-drop row reordering; unique feature; internalizing it solved inconsistent a11y across teams
- Pagination over virtualization; position awareness ("page 3 of 7") matters more than seamless scroll for project management
- Loading state dims content to 20% (not skeleton); continuity with previous data prevents disorientation during reload
**Notable API**: `isRankable` + `onRankEnd` callbacks; `isFixedSize` (prevents height changes during pagination); `emptyView` (custom empty state node)
**A11y**: Space to grab + arrow keys to move + Space to drop for keyboard ranking; aria-live for rank change announcements; aria-sort on sortable headers.
**Best at**: Drag-and-drop ranking with full keyboard/SR accessibility — only system with built-in accessible ranking. **Missing**: No column resizing, pinning, virtualization, or cell editing.

## Ant Design
**Approach**: Maximalist single component — virtual scrolling, tree data via `children` field, fixed columns (CSS sticky in v5), expandable rows, column-level filter dropdowns, drag-and-drop sort, summary rows, and nested sub-tables all in one `<Table>`.
**Key decisions**:
- v5 refactored fixed columns from duplicate DOM tables to CSS sticky; enables virtual scroll + fixed columns simultaneously + fixes SR double-reading
- `children` field in data automatically renders tree nodes; no separate TreeTable needed; pervasive in Chinese enterprise hierarchies
- Column-level `filters` array renders filter dropdown in header; users filter where they see the data (not a separate panel)
**Notable API**: `virtual` (requires numeric scroll dimensions); `sticky` + `offsetHeader`; `Table.EXPAND_COLUMN`/`Table.SELECTION_COLUMN` (explicit column ordering sentinels)
**A11y**: Native `<table>` semantics preserved in virtual scroll; aria-sort/aria-expanded; keyboard a11y less refined than Spectrum/Carbon; SR announcements for virtual position minimal.
**Best at**: Feature density — virtual scroll + tree + fixed columns + expandable + column filters in one component. **Missing**: A11y depth lags Spectrum/Carbon; 50+ prop API has steep learning curve.
