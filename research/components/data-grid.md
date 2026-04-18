# Data Grid — Research
**Date:** 2026-04-17 | **Mode:** Max | **Systems:** 24 | **Scope:** All patterns

---

## Sistemas sin componente dedicado

| Sistema | Razón | Workaround |
|---------|-------|------------|
| Material Design 3 | Only visual spec for data tables; no interactive grid component | MUI DataGrid (Community/Pro/Premium — separate commercial product) |
| Spectrum (Adobe) | Hooks-first architecture (useTable, useGridCell); no built-in inline editing or column filtering | React Aria hooks + custom visual layer |
| Gestalt (Pinterest) | Provides Table with sticky columns and expandable rows; not a full data grid | Gestalt Table + external TanStack Table |
| Radix UI | Presentational Table only (Themes); recommends TanStack Table for data grid needs | Radix Table + TanStack Table |
| Chakra UI | Display Table only; data grids require external integration | Chakra Table + TanStack Table or AG Grid |
| GOV.UK | Guidance-first static table; no JS interactivity by design (progressive enhancement) | Native `<table>` with govuk-table CSS |
| Mantine | Presentational core; no built-in sort/filter/selection in core | mantine-datatable community package |
| Orbit (Kiwi.com) | Consumer travel products use card/list patterns for results; no dense tabular data | — |
| GitHub Primer | DataTable (alpha); sort + row selection + row actions; no inline editing or virtualization | Primer DataTable (alpha) |
| shadcn/ui | DataTable is a recipe (not a component) using TanStack Table v8 | TanStack Table + Radix Table + Tailwind |
| REI Cedar | Vue CdrTable; display-only with mobile-first responsive stacking; no interactions | — |
| Wise Design | Display tables for transaction history; minimal interactive features | — |
| Playbook | Advanced Table adds sort/toggle columns/collapsible rows; limited compared to enterprise systems | — |

**Systems WITH full data grid:** MUI DataGrid (T1/M3), Ant Design Table (T1), Carbon DataTable (T1), Polaris IndexTable (T1), Atlassian DynamicTable (T1), Lightning Datatable (T2), Twilio Paste Data Grid (T2), Dell DataGrid (T2), Base Web Data Table (T3), Fluent 2 DataGrid (T3), Evergreen Table (partial, T3), Nord Table (T3) — 12 of 24

---

## How Systems Solve It

### Ant Design Table — "Maximalist single-component absorbing all data grid complexity"

Ant Design's `<Table>` is the most feature-dense data grid in Tier 1, absorbing virtual scrolling, tree data via `children` field, fixed/pinned columns (CSS sticky in v5), expandable rows, per-column filter dropdowns, inline editing (via custom render), drag-and-drop sort, summary rows, nested sub-tables, and row/cell selection into a single component with a column-config-driven API.

The v5 refactor of fixed columns from duplicate DOM to CSS sticky is architecturally significant: it eliminated the screen reader double-reading bug, enabled virtual scroll + pinned columns simultaneously (previously impossible), and reduced DOM size by ~50% for wide tables. The `columns[].filters` array renders a dropdown filter UI directly in the column header — users filter data where they see it, not in a separate panel above the table. Each column defines its own filter type independently, enabling mixed filter UIs (text search in one column, date range in another) without any special configuration.

The `children` field in data objects automatically renders tree structure — no separate TreeTable component needed. This pervasive pattern in Chinese enterprise UIs (org charts, category trees, BOM lists) is handled with zero additional API surface.

**Design Decisions:**
- **Column-level filter dropdowns in headers** → Why: users filter data in the column where they see it; reduces cognitive distance between data and its filter controls → Impact: HIGH → Para tu caso: use for analytics/reporting UIs where users need to filter multiple columns simultaneously
- **CSS sticky for fixed columns (v5)** → Why: duplicate DOM approach caused SR double-reading, blocked virtual scroll + pinning combo, inflated DOM size → Impact: HIGH → Para tu caso: always prefer CSS sticky over DOM duplication; the v5 approach is the correct architecture
- **`children` field for tree data** → Why: Chinese enterprise hierarchical data is pervasive; a declarative field convention avoids a separate TreeTable API → Impact: MED → Para tu caso: if your data has hierarchical structures, use children-field tree data rather than building a separate tree component

**Notable Props:** `virtual` (requires scroll.y numeric); `columns[].fixed` ("left"/"right"); `columns[].filters`+`onFilter`; `expandable`; `Table.EXPAND_COLUMN` / `Table.SELECTION_COLUMN`; `summary` (sticky footer); `rowSelection.type`

**Accessibility:** Native `<table>` semantics preserved in virtual scroll; aria-sort on headers; aria-expanded on expandable rows; keyboard a11y less refined than Spectrum/Carbon — no standardized cell navigation; filter dropdown keyboard via Ant Dropdown component; ⚠️ no standardized cell arrow-key navigation

---

### Carbon DataTable — "Enterprise batch operations with composable render-prop architecture"

Carbon's DataTable is optimized for the enterprise pattern of reviewing a set of records and performing bulk operations on them. The batch action bar is a first-class architectural element: when rows are selected, it slides in to replace the toolbar, creating a visually distinct "bulk edit mode" that signals clearly to users that their selection is being held. The render-prop pattern gives consumers full layout control while DataTable manages selection, sort, and expansion state.

No virtualization — Carbon targets enterprise admin panels with paginated server-side data (50–500 rows), where pagination is preferred because users need positional awareness ("I'm looking at rows 51–100 of 847 results"). The philosophy: a well-paginated table is clearer than an infinitely scrolling one.

**Design Decisions:**
- **Batch action bar replaces toolbar on selection** → Why: visual prominence signals "you're in bulk-edit mode"; prevents accidental actions on unselected rows → Impact: HIGH → Para tu caso: use for any grid where bulk operations (delete, assign, export, tag) are primary user tasks
- **Render-prop pattern for layout control** → Why: enterprise contexts have radically different toolbar needs — some have search, some have filter chips, some have download buttons — a fixed slot API would over-constrain → Impact: HIGH → Para tu caso: compose `<TableToolbar>` + `<TableBatchActions>` with your specific toolbar content
- **No virtualization, pagination preferred** → Why: IBM users need positional awareness for audit-trail and compliance workflows → Impact: MED → Para tu caso: use pagination for enterprise compliance grids; use virtualization for analytical/reporting grids where users scroll to explore

**Notable Props:** `isSortable` (table-level); `useZebraStyles`; `stickyHeader`; `<TableToolbar>` + `<TableBatchActions>`; `<TableExpandRow>` + `<TableExpandedRow>`; `radio` for single-select

**Accessibility:** Native `<table>` semantics; aria-sort on headers; batch action bar announces selected count via aria-live; aria-label on checkboxes includes row identifier; expandable rows use aria-expanded; Tab between interactive elements (best practice for display tables)

---

### Atlassian DynamicTable — "Drag-and-drop ranking with full keyboard accessibility"

Atlassian's DynamicTable is unique across all 24 systems for first-class drag-and-drop row ranking with complete keyboard support. The `isRankable` prop enables row reordering with Space to grab, arrow keys to reposition, Space to drop, Escape to cancel — and ARIA live announcements for each move ("Row moved from position 3 to position 1"). This solved a long-standing consistency problem across Jira, Confluence, and Trello where different teams had implemented incompatible drag-to-reorder patterns.

Pagination over virtualization reflects Atlassian's user research in project management: team members navigating sprint backlogs need to know where they are relative to the total ("page 2 of 5" = "I'm in the second sprint's worth of issues"). Seamless infinite scroll removes this positional anchoring.

**Design Decisions:**
- **`isRankable` with full keyboard/SR accessibility** → Why: drag-and-drop without keyboard alternative fails WCAG 2.1 AA; Atlassian standardizes the Space+Arrow+Space pattern across all products → Impact: HIGH → Para tu caso: required if your grid needs row reordering; copy Atlassian's keyboard model exactly
- **Loading state dims to 20% opacity (not skeleton)** → Why: continuity with previous data prevents disorientation during reload; users can still read previous content while new data loads → Impact: MED → Para tu caso: consider dimmed content over skeleton for grids that reload frequently (polling)

**Notable Props:** `isRankable` + `onRankStart`/`onRankEnd`; `isFixedSize`; `emptyView`; `sortKey`/`sortOrder`/`onSort`; `rowsPerPage`/`onSetPage`

**Accessibility:** Space to grab, arrow keys to reposition, Space to drop, Escape to cancel rank drag; aria-live announcements for rank changes; aria-sort on headers; loading state announced to SR

---

### Fluent 2 DataGrid — "TanStack Table v8 as native grid engine with explicit focus modes"

Fluent 2's DataGrid wraps TanStack Table v8 natively, making TanStack own data operations (sort, filter, group, paginate) while Fluent owns visuals and ARIA semantics. This is the most architecturally influential data grid in T3 because it formalizes TanStack Table as the data layer standard — a pattern already adopted by shadcn/ui's DataTable recipe.

The `focusMode` prop is the standout decision: "cell" enables arrow-key cell navigation (role="grid"), while "row_unstable" treats each row as a single tab stop (simpler for tables without interactive cell content). This explicit acknowledgment that full role="grid" keyboard navigation is sometimes unnecessary is a mature design decision that most systems avoid by committing to one mode.

**Design Decisions:**
- **TanStack Table v8 as native data engine** → Why: data grid behavior (sort, filter, group, paginate) is complex enough that outsourcing it to a battle-tested headless library removes years of bug-fixing from the design system team → Impact: HIGH → Para tu caso: use TanStack Table for data logic; your design system provides visuals and ARIA
- **Explicit focusMode prop (cell vs. row)** → Why: role="grid" cell navigation adds complexity that tables without interactive cells don't need → Impact: MED → Para tu caso: use "cell" only for grids with editable/interactive cells; use "row" for selection-only grids

**Notable Props:** `focusMode` ("cell"/"row_unstable"/"composite"); `useVirtualizer` for virtualization; multi-column sort; column resizing; single/multi row selection

**Accessibility:** `aria-rowcount` and `aria-colcount` on grid element; `aria-rowindex` on each rendered row (virtual scroll); explicit focus mode selection acknowledges that role="grid" cell navigation complexity is optional

---

### Base Web Data Table — "Type-aware column filters and three-tier progressive complexity"

Base Web's three-tier table model (Table → Table-Grid → Data Table) is the most explicit progressive-complexity approach across all systems. Teams choose their entry point based on need. The Data Table's type-aware column filters are the standout feature: categorical columns get checkbox filter lists, numerical columns get range sliders, boolean columns get toggle filters, and datetime columns get date range pickers — all configured via the column `type` property. No manual filter UI construction.

---

### Polaris IndexTable — "Merchant resource management with mobile card layout"

Polaris separates resource management (IndexTable) from read-only display (DataTable). IndexTable is designed for Shopify merchant lists (orders, products, customers). The `condensed` prop transforms the table into a card-based mobile layout — a unique feature reflecting that Shopify admin is heavily used on mobile devices where traditional table layouts fail. `promotedBulkActions` are always visible in the bulk action bar, based on research that 90% of merchants use only 2–3 common bulk actions.

---

## Pipeline Hints

**Archetype recommendation:** grid-tabular
Rationale: Data grid is the canonical grid-tabular component — rows of data items, column headers, interactive sort/filter/selection, potential for inline editing. Distinguished from simple Table (display-only) by interactive data management features.

**Slot consensus:** (12/24 systems with data grid features)
| Slot | Type | Required | Consensus | Notes |
|------|------|----------|-----------|-------|
| column-header | container | yes | 12/12 | Sort button, column label, optional resize handle, optional filter trigger |
| row | container | yes | 12/12 | Data row; may be expandable, selectable, rankable |
| cell | container | yes | 12/12 | Data cell; may be editable; type-aware rendering |
| selection-column | container | no | 10/12 | Checkbox column; select-all in header; individual in cells |
| row-actions | container | no | 8/12 | Per-row actions menu or inline buttons; Polaris/Carbon pattern |
| toolbar | container | no | 8/12 | Above-table: search, filter controls, column visibility toggle |
| batch-actions | container | no | 6/12 | Replaces toolbar on selection; Carbon/Polaris/Lightning pattern |
| expand-row | container | no | 6/12 | Expandable row content below the row; sub-table or detail panel |
| column-filter | container | no | 5/12 | Per-column filter dropdown in header; Ant Design/Base Web |
| empty-state | container | no | 10/12 | No data or no-results state |
| loading-state | container | no | 8/12 | Skeleton rows or dimmed content during load |
| pagination | container | no | 10/12 | Page controls below table; most systems prefer pagination over infinite scroll |
| summary-row | container | no | 4/12 | Totals/aggregate row; Ant Design, Polaris DataTable |
| column-resize-handle | icon-action | no | 5/12 | Drag handle for resizing columns |

**Property consensus:**
| Property | Type | Values | Consensus | Notes |
|----------|------|--------|-----------|-------|
| Sort | state | none/ascending/descending | 12/12 | aria-sort on headers; controlled sort state |
| Selection | variant | none/single/multi | 10/12 | none=no checkboxes; single=radio; multi=checkboxes |
| Size / Density | variant | default/compact/relaxed | 8/12 | Carbon: wide/narrow/condensed; Ant: default/middle/small |
| Loading | state | idle/loading/error | 10/12 | Skeleton rows or dimmed content |
| Empty | state | empty/filtered-empty | 8/12 | distinct states for "no data" vs "filters returned nothing" |
| Sticky header | variant | true/false | 8/12 | Header stays visible during vertical scroll |
| Sticky columns | variant | none/first/last/both | 6/12 | Fixed columns during horizontal scroll; CSS sticky in modern implementations |
| Virtual scroll | variant | true/false | 5/12 | Required for >500 rows; Fluent 2, MUI DataGrid, Ant Design |

**Boolean properties found:**
| Boolean | Consensus | Default | Notes |
|---------|-----------|---------|-------|
| isSortable | 12/12 | false | Table-level or column-level sort enablement |
| isSelectable | 10/12 | false | Enables checkboxes/radio for row selection |
| hasExpandableRows | 6/12 | false | Enables expand/collapse per row |
| isRankable | 2/12 | false | Drag-to-reorder rows (Atlassian only with full a11y) |
| stickyHeader | 8/12 | false | Fixed header during scroll |
| zebra / striped | 8/12 | false | Alternating row background colors |
| hasColumnResize | 5/12 | false | Draggable column width resizing |
| hasBatchActions | 6/12 | false | Toolbar replaced by batch action bar on selection |
| hasVirtualScroll | 5/12 | false | Row virtualization for performance on large datasets |

**State coverage (comprehensive):**
| State | Consensus | Visual treatment | Notes |
|-------|-----------|-----------------|-------|
| default | 12/12 | base row appearance | |
| hover | 10/12 | row background highlight | |
| selected | 10/12 | checkbox checked + row accent background | multi-select: all checked rows; single: highlighted row |
| focused-cell | 6/12 | cell focus ring | role="grid" arrow-key navigation |
| editing | 4/12 | cell border + input visible | inline editing mode; Lightning, Dell, MUI Premium |
| loading | 10/12 | skeleton rows or dimmed content | |
| empty | 10/12 | empty state component fills table body | |
| dragging | 2/12 | row elevated + drag shadow | isRankable drag in progress |
| sorted-asc | 12/12 | sort icon up in column header | aria-sort="ascending" |
| sorted-desc | 12/12 | sort icon down in column header | aria-sort="descending" |
| filtered | 6/12 | filter icon active in column header | column has active filter |
| error | 4/12 | row or cell error indicator | inline editing validation error |

**Exclusion patterns found:**
- editing × selected — most systems prevent editing while in bulk-select mode
- loading × editing — can't edit while table is loading
- empty × loading — can't be simultaneously empty and loading (empty is post-load)

**Building block candidates:**
- toolbar → `.DataGridToolbar` — 8/12 systems have a structured above-table region (search + filter + column-toggle + export)
- batch-actions → `.DataGridBatchActions` — 6/12 systems replace toolbar with batch actions on selection (Carbon/Polaris pattern)
- column-header → `.DataGridColumnHeader` — 12/12 systems have structured column header (sort button + label + optional resize handle)
- pagination → `.DataGridPagination` — 10/12 systems have standard pagination control below the table

**Enum/configuration properties:**
| Property | Values | Consensus | Notes |
|----------|--------|-----------|-------|
| density | default/compact/relaxed | 8/12 | row height; Carbon: wide/narrow/condensed |
| columnFilterType | text/number/date/select/boolean | 4/12 | Base Web Data Table type-aware filters |
| focusMode | row/cell | 2/12 | Fluent 2 explicit focus mode for ARIA grid behavior |
| selectionType | none/single/multi | 10/12 | row selection model |

**A11y consensus:**
- Primary role: `role="grid"` for interactive data grids (cells are interactive); `role="table"` or native `<table>` for display-only
- Required ARIA: `aria-sort` on sortable column headers; `aria-selected` on selected rows; `aria-label` on row checkboxes includes row identifier
- Keyboard (role="grid"): arrow keys for cell navigation; Tab for next interactive element inside cell; Enter to interact with cell content; Escape to cancel edit
- Virtual scroll: `aria-rowcount` on grid + `aria-rowindex` on each rendered row (Fluent 2 implements this correctly)
- Focus: Enter cell to start editing; Escape to cancel; Tab/Shift+Tab for next editable cell
- Batch actions: selected count announced via aria-live when selection changes
- APG pattern: Grid pattern for interactive data grids; Table pattern for display-only
- ⚠️ A11y flag: Ant Design's keyboard cell navigation is unrefined compared to Spectrum/Carbon; filter dropdowns rely on Ant Dropdown a11y; use Carbon or Spectrum hooks as the a11y reference, not Ant

---

## What Everyone Agrees On

1. **Sortable headers are buttons, not divs**: Every system with sortable columns wraps the sort control in a `<button>` inside `<th>` with `aria-sort="ascending"/"descending"/"none"`. Sort state must be conveyed programmatically, not just visually via icons.

2. **Row selection checkboxes need identifiers in aria-label**: "Select order #1234" not just "Select" — this is universal because without the row context, screen reader users cannot distinguish between 20 "Select" checkboxes.

3. **Pagination over infinite scroll for enterprise/management grids**: All enterprise-focused systems (Carbon, Atlassian, Polaris, Primer) choose pagination because positional awareness ("page 3 of 7") matters more than seamless scroll for management workflows.

4. **TanStack Table is becoming the standard data engine**: shadcn/ui, Fluent 2, and Cedar/Radix recommendations all converge on TanStack Table v8 for headless data grid logic. Design systems own the visuals; TanStack owns the data operations.

5. **Drag-and-drop requires a keyboard alternative**: Atlassian's Space+Arrow+Space model is the reference. Any grid with row reordering must provide keyboard-equivalent functionality — not just add `draggable` to rows.

---

## Where They Disagree

**"¿Monolithic component vs. composable primitives?"**
→ Monolithic (Ant Design, MUI DataGrid): one component handles all features via props → Composable (Carbon, Polaris): separate Toolbar/BatchActions/Table composed together
→ Para tu caso: composable for design systems building for varied products; monolithic for teams that need fast implementation of a known feature set

**"¿Pagination vs. virtual scroll?"**
→ Pagination (Carbon, Atlassian): position awareness; works at any scale; simple server integration → Virtual scroll (Ant Design, Fluent 2, MUI): seamless UX for analytical exploration; requires height measurement
→ Para tu caso: pagination for management/admin grids; virtual scroll for analytics/reporting grids; never both simultaneously

**"¿Per-column filters vs. above-table filter bar?"**
→ Per-column (Ant Design, Base Web): filter is located at the data it affects; good for multi-column filtering → Filter bar (Carbon, Polaris): filters are prominent and easy to see/clear; good for single-dimension filtering
→ Para tu caso: per-column for analytical exploration; filter bar for management grids with predefined filter dimensions

**"¿Inline editing vs. edit-in-drawer/modal?"**
→ Inline (Lightning, Dell, MUI Premium): fast for high-frequency editing; stays in context → Drawer/modal (Carbon, Atlassian): cleaner for complex multi-field edits; easier validation
→ Para tu caso: inline for single-cell edits (status, quantity); drawer/modal for multi-field record edits

**"¿Full role="grid" keyboard navigation vs. simplified row-tab navigation?"**
→ Full cell navigation (Spectrum, Fluent 2 cell mode): WCAG grid pattern; arrow keys between cells; matches spreadsheet mental model → Row navigation (Carbon, Fluent 2 row mode): simpler; Tab between interactive elements inside rows; sufficient for most management grids
→ Para tu caso: full cell navigation only if your grid has per-cell interactive content (editable cells, per-cell actions); row navigation for selection-and-action grids

---

## Visual Patterns Found

| Pattern | Description | Best for | Adopted by |
|---------|-------------|----------|------------|
| Batch action bar | Slides in above table on row selection; replaces toolbar | Bulk operations (delete, export, assign) | Carbon, Polaris, Lightning |
| Per-column filter | Filter dropdown in column header | Multi-column analytical filtering | Ant Design, Base Web |
| Expandable row | Inline detail panel below a row | Sub-tables, detail preview without navigation | Carbon, Atlassian, Ant Design, Gestalt |
| Sticky first/last columns | Fixed columns during horizontal scroll | Wide tables with many metric columns | Ant Design, Gestalt, Base Web |
| Row ranking | Drag (or Space+Arrow) to reorder rows | Priority queues, ordered lists | Atlassian |
| Mobile card layout | Table collapses to cards on narrow viewports | Admin used on mobile | Polaris (IndexTable condensed) |

**Wireframe — batch action bar pattern (Carbon):**
```
┌─────────────────────────────────────────────────────────────┐
│  [✕ 3 items selected]  [Delete] [Export] [Assign]    [×]   │  ← batch action bar
├──────┬──────────────────────┬──────────┬────────────────────┤
│  ☑  │ Name                 │ Status   │ Actions            │
├──────┼──────────────────────┼──────────┼────────────────────┤
│  ☑  │ Alpha Project        │ Active   │ ⋮                  │
│  ☑  │ Beta Campaign        │ Paused   │ ⋮                  │
│  □  │ Gamma Initiative     │ Draft    │ ⋮                  │
│  ☑  │ Delta Task           │ Active   │ ⋮                  │
└──────┴──────────────────────┴──────────┴────────────────────┘
│  ← Previous   1  2  3  4   Next →                           │
└─────────────────────────────────────────────────────────────┘
```

**Wireframe — per-column filter (Ant Design):**
```
┌──────────────────┬───────────────┬──────────────┬──────────┐
│ Name           ↕ │ Status      ▼ │ Date       ↕ │ Size   ↕ │
├──────────────────┼───────────────┼──────────────┼──────────┤
│ Alpha            │ Active        │ 2026-01-15   │ 24 MB    │
│ Beta             │ Draft         │ 2026-02-03   │ 8 MB     │
│ Gamma            │ Active        │ 2026-02-18   │ 156 MB   │
└──────────────────┴───────────────┴──────────────┴──────────┘
  [Status filter popup: ☑ Active ☑ Draft □ Archived]
```

---

## Risks to Consider

**Building a full data grid from scratch is a multi-year project** (HIGH) — sort, filter, virtualization, column resize, keyboard navigation, and accessibility each take months; use TanStack Table or MUI DataGrid as the data engine; never start from zero — mitigation: adopt TanStack Table (free, headless) as your data layer immediately

**Virtualization + fixed columns + ARIA row count is complex** (HIGH) — Fluent 2 implements `aria-rowcount`/`aria-rowindex` correctly for virtual scroll; most systems do not — mitigation: reference Fluent 2's virtual scroll ARIA implementation; test with screen readers in virtual scroll mode specifically

**Ant Design a11y gaps in enterprise contexts** (MEDIUM) — filter dropdowns and cell navigation are not WCAG-complete; do not use Ant Design Table as an a11y reference — mitigation: use Carbon or Spectrum for a11y reference; test every interactive column with keyboard-only navigation

---

## Dimension Scores

| Dimension | MUI DataGrid | Ant Design | Carbon DataTable | Atlassian DynamicTable | Fluent 2 DataGrid | Polaris IndexTable |
|-----------|-------------|-----------|-----------------|----------------------|-------------------|-------------------|
| Feature coverage | 5/5 | 5/5 | 3/5 | 3/5 | 4/5 | 3/5 |
| A11y depth | 4/5 | 2/5 | 5/5 | 5/5 | 5/5 | 4/5 |
| Mobile support | 3/5 | 2/5 | 2/5 | 2/5 | 3/5 | 5/5 |
| API ergonomics | 4/5 | 3/5 | 4/5 | 4/5 | 4/5 | 4/5 |
| Virtualization | 5/5 | 5/5 | 1/5 | 1/5 | 5/5 | 1/5 |

---

## Next Steps

```
/spec data-grid      → outputs/data-grid-config.json
/enrich data-grid    → a11y tokens + interaction spec
/build data-grid     → full pipeline in one command
/build data-grid --max  → use pre-generated config
```
