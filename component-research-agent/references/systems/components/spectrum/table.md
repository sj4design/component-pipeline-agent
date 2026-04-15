---
system: Spectrum (Adobe)
component: TableView / Table (React Aria)
url: https://react-spectrum.adobe.com/react-spectrum/TableView.html
last_verified: 2026-03-28
---

# TableView

## Approach

Adobe's Spectrum offers tables at two levels: TableView in React Spectrum (the styled, opinionated component) and Table in React Aria (the headless, behavior-only hooks layer). This separation exists because Adobe's own products -- Analytics, Experience Platform, Lightroom -- have wildly different visual requirements but identical interaction needs. By extracting keyboard navigation, selection, sorting, and accessibility into React Aria hooks, Adobe lets any product build a custom-styled table while guaranteeing consistent behavior. TableView then becomes just one possible consumer of those hooks, optimized for the Spectrum design language. The architecture means that column resizing, async loading, and virtualization are solved once at the hooks level and shared across every Adobe product, preventing the fragmentation that happens when teams copy-paste table logic.

## Key Decisions

1. **Two-layer architecture: hooks vs. styled component** (HIGH) -- React Aria's `useTable`, `useTableCell`, `useTableRow` hooks handle all keyboard, selection, and ARIA logic. React Spectrum's TableView wraps those hooks with Spectrum styling. Why two layers? Because Adobe found that forcing a single visual API on teams building Analytics dashboards vs. Lightroom galleries created constant design-token overrides. The hooks layer lets teams opt out of Spectrum's look while keeping behavior identical.

2. **Collection-based API with JSX composition** (HIGH) -- Instead of passing `columns` and `rows` as data arrays (like MUI), Spectrum uses `<TableHeader>`, `<Column>`, `<Row>`, and `<Cell>` JSX elements. This declarative model was chosen because it lets React handle rendering lifecycle naturally -- dynamic columns, conditional cells, and async loading patterns compose the same way any React component tree does. The tradeoff is verbosity: simple tables require more markup than a config-object approach.

3. **Column resizing as a first-class interaction** (MEDIUM) -- Spectrum ships `ColumnResizer` and `ResizableTableContainer` as explicit components rather than hiding resizing behind a prop flag. This decision reflects Adobe's observation that column resizing involves complex pointer tracking, keyboard support (arrow keys to resize), and ARIA announcements that deserve dedicated component boundaries rather than being bolted onto column headers.

4. **Async loading with useAsyncList** (MEDIUM) -- Spectrum provides `useAsyncList` to handle paginated/infinite data fetching directly in the table. This hook manages loading states, cursors, and error handling so the table can render a loading spinner or "load more" row automatically. Adobe built this because their products routinely display tables with millions of rows fetched from remote APIs, and leaving data fetching to consumers produced inconsistent loading UX.

## Notable Props

- `sortDescriptor` + `onSortChange`: Controlled sorting model where the table itself never reorders data -- it only signals intent. This keeps the data layer pure and prevents the table from becoming a state manager
- `selectionMode="multiple"` with `selectionBehavior="toggle"` vs `"replace"`: Two selection behaviors because toggling (checkbox-style) and replacing (click-to-select) serve different use cases, and mixing them is a common source of bugs
- `onLoadMore`: Callback for infinite scrolling that fires when the user scrolls near the bottom -- exists because pagination buttons vs. infinite scroll is a UX decision Spectrum wants consumers to make explicitly

## A11y Highlights

- **Keyboard**: Arrow keys navigate between cells, Enter activates a row action or link, Space toggles selection, Tab moves focus out of the table entirely (standard grid navigation pattern)
- **Screen reader**: Column headers are announced with each cell, sort direction is conveyed via aria-sort, selection count is announced via aria-live region
- **ARIA**: Uses role="grid" for interactive tables, role="treegrid" for tree tables; aria-selected on rows, aria-colspan for spanning headers

## Strengths & Gaps

- **Best at**: Providing accessible table behavior that works across any visual framework, with the deepest keyboard and screen-reader support of any system researched
- **Missing**: No built-in cell editing, inline filtering, or column pinning -- Spectrum tables are read-oriented, and editing workflows must be built separately
