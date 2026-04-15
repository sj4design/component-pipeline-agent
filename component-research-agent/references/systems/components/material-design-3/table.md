---
system: Material Design 3
component: Data Table / MUI DataGrid
url: https://mui.com/x/react-data-grid/
last_verified: 2026-03-28
---

# Data Table (Material Design 3 + MUI DataGrid)

## Approach

Material Design 3 provides only high-level guidance for data tables -- basic layout, density, and interaction principles -- but deliberately stops short of shipping a production-ready table component. Google recognized that enterprise data grids are enormously complex (virtual scrolling, server-side pagination, cell editing, column pinning) and that a one-size-fits-all spec would either be too simple for real products or too prescriptive for the ecosystem. MUI fills this gap with DataGrid, a commercially tiered component that layers Community (MIT), Pro, and Premium plans. This split exists because the cost of maintaining advanced features like pivoting, aggregation, and Excel-style export is substantial, so MUI funds ongoing development through commercial licenses. The result is that M3 covers the "what it should look like" while MUI covers the "how it actually works," creating a two-layer architecture that no other design system requires.

## Key Decisions

1. **Spec-vs-implementation gap is intentional** (HIGH) -- M3 defines visual density (default, comfortable, compact), row selection patterns, and sort indicators, but provides no React/Web component. Why? Because Google ships tables inside products like Sheets and Analytics with deeply custom behavior that a generic component would never cover. They leave the implementation to ecosystem partners like MUI, which means adopters must reconcile M3 visual tokens with MUI's API surface -- a non-trivial integration task.

2. **Three commercial tiers for DataGrid** (HIGH) -- MUI splits features across Community (sorting, filtering, pagination, row selection), Pro (column pinning, row grouping, lazy loading, tree data), and Premium (aggregation, pivoting, Excel export). This tiering exists because enterprise features require dedicated QA and cross-browser testing that open-source funding alone cannot sustain. The tradeoff: teams must decide upfront which tier they need, or risk a mid-project upgrade.

3. **Data Source abstraction layer** (MEDIUM) -- In v8 (2025), MUI promoted the Data Source API to Community tier. Instead of wiring onSortModelChange, onFilterModelChange, and onPaginationModelChange separately, you define a single `getRows()` method. This simplifies server-side integration dramatically because the grid manages caching, deduplication, and retry logic internally. The decision reflects MUI's observation that most bugs in data tables originate from inconsistent client-server synchronization.

4. **Column-centric configuration** (MEDIUM) -- Every behavior (sorting, filtering, rendering, editing) is declared per-column via `GridColDef`. This column-first model differs from row-centric systems like Carbon. MUI chose this because most user mental models for tables revolve around "what does this column do" rather than "what can I do with this row."

## Notable Props

- `getRows`: (v8+) Single callback replacing multiple event handlers for server-side data -- interesting because it inverts the typical "event-driven" pattern into a "data-source" pattern
- `columnVisibilityModel`: Controls which columns are shown/hidden, reflecting MUI's stance that column management is a first-class concern, not an afterthought
- `checkboxSelection` + `disableRowSelectionOnClick`: Two separate props because MUI discovered that checkbox selection and click-to-select have different a11y implications and user expectations

## A11y Highlights

- **Keyboard**: Arrow keys navigate cells, Enter enters edit mode, Escape cancels, Tab moves to next interactive element (not next cell, which is intentional for screen reader compatibility)
- **Screen reader**: Each cell is announced with column header context; sort state is conveyed via aria-sort on column headers
- **ARIA**: Uses role="grid" with role="row" and role="gridcell"; supports aria-selected for selected rows, aria-sort for sorted columns

## Strengths & Gaps

- **Best at**: Handling massive enterprise datasets with server-side operations, commercial-grade features, and a mature ecosystem of extensions
- **Missing**: M3 itself has no table component -- teams must rely entirely on MUI or build their own, creating a fragmented experience for those wanting pure M3 compliance
