---
system: Carbon (IBM)
component: DataTable
url: https://carbondesignsystem.com/components/data-table/usage/
last_verified: 2026-03-28
---

# DataTable

## Approach

Carbon's DataTable is built around the philosophy that enterprise tables are primarily action-oriented, not just display-oriented. IBM's products -- Cloud, Watson, Security -- require users to select rows and perform operations on them (delete, export, move, assign). This is why Carbon treats batch actions and the table toolbar as first-class architectural elements rather than optional add-ons. The component uses a render-prop pattern internally, passing state handlers down through a `DataTable` wrapper that manages selection, sorting, expansion, and search state. This design reflects IBM's belief that table behavior should be centrally managed but table rendering should be flexible -- teams can compose different toolbar configurations, row structures, and action patterns without forking the underlying state logic. Carbon's table is deliberately less feature-rich than MUI's DataGrid because IBM prefers composability over monolithic components.

## Key Decisions

1. **Batch action bar as a core pattern** (HIGH) -- When users select one or more rows, a batch action bar slides in above the table, replacing the default toolbar. This bar contains contextual actions (delete, download, move) that operate on the selected set. Carbon made this a built-in pattern rather than a custom add-on because IBM found that every enterprise product eventually needs multi-row operations, and teams that built their own batch UIs produced inconsistent, inaccessible implementations. The batch action bar includes a "cancel" button and selected-count indicator, solving the "how do I deselect all" problem that plagues custom implementations.

2. **Toolbar is a separate composable element** (HIGH) -- The table toolbar (search, filter, add button, settings) is not baked into DataTable but is a sibling component that teams compose alongside it. This separation exists because IBM discovered that different products need radically different toolbar configurations -- some need search but not filter, others need a primary action button but no search. A monolithic toolbar prop would have become an unwieldy configuration object.

3. **Row expansion for progressive disclosure** (MEDIUM) -- Expandable rows reveal additional content (detail panels, nested tables, metadata) without navigating away. Carbon includes a batch expand-all chevron in the header, though it is hidden by default. Why hidden? Because IBM's UX research showed that expanding all rows simultaneously in large datasets causes performance issues and cognitive overload, so the default encourages row-by-row disclosure.

4. **Sort indicators in column headers only on interaction** (MEDIUM) -- Sort arrows appear on hover and when actively sorted, not at rest. This reduces visual noise in data-dense enterprise dashboards where every pixel of space matters. Carbon chose this approach after testing showed that persistent sort icons on every column made headers feel cluttered, especially in tables with 10+ columns.

## Notable Props

- `isSortable`: Applied per-table (not per-column), which is unusual -- Carbon assumes if sorting is needed, it should be available everywhere, reducing configuration overhead
- `useZebraStyles`: Alternating row backgrounds for dense tables -- exists as a named prop because IBM found zebra striping significantly improves scan-ability in tables with many numeric columns
- `stickyHeader`: Keeps headers visible during scroll -- a separate boolean because sticky positioning has performance implications that teams should opt into consciously

## A11y Highlights

- **Keyboard**: Tab moves between interactive elements within the table (checkboxes, buttons, links), not between cells; sort headers are activated via Enter or Space
- **Screen reader**: Batch action bar announces the number of selected items via aria-live; sort state is conveyed through aria-sort on column headers
- **ARIA**: Uses standard `<table>` semantics rather than role="grid" -- Carbon chose native table elements because they provide better default screen-reader support without requiring custom ARIA wiring

## Strengths & Gaps

- **Best at**: Enterprise action workflows -- batch operations, toolbar composition, and progressive disclosure through expandable rows are more mature than any other system researched
- **Missing**: No built-in virtualization, column pinning, or cell editing -- Carbon expects teams handling massive datasets to use a dedicated grid library alongside its design tokens
