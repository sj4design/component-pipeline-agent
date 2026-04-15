---
system: Evergreen (Segment)
component: Table
url: https://evergreen.segment.com/components/table
last_verified: 2026-03-28
confidence: medium
---

# Table

## Approach
Evergreen's Table is one of its most developed components, reflecting the central importance of tabular data in analytics dashboards. It is a composable component with Table, Table.Head, Table.HeaderCell, Table.Body, Table.Row, Table.Cell, and Table.SearchHeaderCell. The Table is designed for listing and managing records — users, sources, destinations, pipelines — which is Segment's core UI pattern. It includes search filtering and sortable columns as first-class features because analytics tools always need these capabilities.

## Key Decisions
1. **Table.SearchHeaderCell** (HIGH) — A search input built into the header cell, enabling filter-as-you-type on any column. This is baked into the table because every analytics list view needs it. The component manages its own search state and calls the consumer's filter function.
2. **Table.Row isSelectable and isSelected** (HIGH) — Row selection is built into the row component with keyboard support. Segment's data management UIs frequently need multi-select for bulk operations (delete multiple sources, export selected users).
3. **Virtual scrolling via onScrolled prop** (MEDIUM) — The table body can detect scroll position to implement infinite loading patterns. This is important for analytics tables that display large datasets loaded incrementally.

## Notable Props
- `Table.SearchHeaderCell`: `onChange`, `value`, `placeholder`
- `Table.Row`: `isSelectable`, `isSelected`, `onSelect`
- `Table.HeaderCell`: `onClick` for sort, `textProps` for alignment
- `height`: explicit table height for virtualization patterns

## A11y Highlights
- **Keyboard**: Selectable rows are keyboard accessible; sort headers are interactive buttons
- **Screen reader**: Semantic table structure; sort and selection states communicated
- **ARIA**: aria-selected on selected rows; sort state on column headers

## Strengths & Gaps
- **Best at**: SearchHeaderCell for inline filtering; row selection for bulk operations; analytics-specific patterns
- **Missing**: No built-in virtualization (just scroll detection); no column resizing; no pagination component
