---
system: Ant Design
component: Table
url: https://ant.design/components/table/
last_verified: 2026-03-28
---

# Table

## Approach

Ant Design's Table is the Swiss Army knife of the systems researched -- it attempts to cover every conceivable table use case in a single component. Where Polaris splits into two components and Carbon favors composability, Ant Design takes the maximalist route: virtual scrolling, tree data, fixed columns, expandable rows, cell editing, drag-and-drop sorting, summary rows, and nested sub-tables all live inside one `<Table>` component. This philosophy reflects Ant Design's origin as the design system for Alibaba's enterprise products, where a single admin dashboard might need a table that displays hierarchical product categories (tree data), pins the first column for identification (fixed columns), supports expanding rows to show order details (expandable), and renders 100,000+ rows without browser lag (virtual scroll). Rather than asking developers to choose between components, Ant Design's approach is "configure what you need" via props. The tradeoff is a large API surface -- the Table component has 50+ props -- but Alibaba decided that learning one flexible component is preferable to learning when to use which specialized variant.

## Key Decisions

1. **Virtual scrolling with CSS sticky fixed columns** (HIGH) -- In v5, Ant Design refactored fixed columns from absolute-positioned duplicate tables (the v4 approach) to CSS `position: sticky`. This architectural change was critical because the old approach rendered two hidden copies of the table -- one for the left fixed columns and one for the right -- which doubled DOM nodes and broke screen readers. Sticky positioning means a single table in the DOM, which enables virtual scrolling to work with fixed columns simultaneously. This was a major engineering investment driven by real performance problems in Alibaba's dashboards that routinely display 50,000+ rows.

2. **Tree data via children field convention** (MEDIUM) -- Any row with a `children` array in the data source automatically renders as a collapsible tree node. Ant chose a data-convention approach (rather than a separate TreeTable component) because hierarchical data in Chinese enterprise apps -- organizational structures, product categories, region hierarchies -- is pervasive. Making tree rendering automatic via data shape means developers don't need to think about "is this a tree table or a flat table"; the component figures it out. The `indentSize` prop controls nesting depth visualization.

3. **Expandable rows alongside tree data** (MEDIUM) -- Expandable rows (`expandable` prop) and tree data (`children` field) are independent features that can coexist. This is unusual -- most systems treat expansion and tree nesting as either/or. Ant Design separated them because expandable rows show supplemental detail (a detail panel, a sub-form) while tree data shows hierarchical relationships. A product category tree might also need expandable rows to show category metadata, and forcing a choice between the two would limit real-world usage.

4. **Column-level filter dropdowns** (MEDIUM) -- Each column can define a `filters` array and `onFilter` callback that renders a dropdown filter menu directly in the column header. Ant Design built filtering into the column definition (rather than a separate filter bar) because their user research showed that Chinese enterprise users expect to filter where they see the data -- clicking a column header to filter that column is more intuitive than finding a separate filter panel. This column-local filtering model is unique among the systems researched.

## Notable Props

- `virtual`: Boolean that enables virtual scrolling (requires `scroll.x` and `scroll.y` as numbers) -- notable because it transforms the rendering engine entirely, switching from DOM-based to virtualized rows, and the requirement for numeric scroll dimensions is a deliberate constraint to ensure the virtual container has fixed bounds
- `sticky`: Makes column headers stick during scroll, with `offsetHeader` to account for fixed navbars -- the offset prop exists because Alibaba's admin layouts universally use fixed top navigation
- `Table.EXPAND_COLUMN` and `Table.SELECTION_COLUMN`: Sentinel values that let developers control the order of expand and selection columns in the column array -- exists because the default order (selection then expand) doesn't work for every layout, and explicit ordering via sentinels is less error-prone than numeric indices

## A11y Highlights

- **Keyboard**: Tab navigates interactive elements within cells; expandable rows toggle via Enter on the expand icon; sortable headers activated via Enter or Space; tree nodes expand/collapse via Enter
- **Screen reader**: Column headers associated via scope; sort state conveyed through aria-sort; expansion state announced via aria-expanded on expand triggers
- **ARIA**: Uses native `<table>` elements with `<thead>`, `<tbody>`, `<tfoot>` semantics; virtual scrolling preserves table semantics by rendering rows within the same `<tbody>` (not separate containers)

## Strengths & Gaps

- **Best at**: Feature density in a single component -- virtual scrolling + tree data + fixed columns + expandable rows + column filters is a combination no other system offers out of the box
- **Missing**: Accessibility depth lags behind Spectrum and Carbon -- keyboard navigation between cells is less refined, and screen-reader announcements for virtual scroll position and tree-node depth are minimal compared to React Aria's implementation
