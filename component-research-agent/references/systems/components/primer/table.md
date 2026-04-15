---
system: GitHub Primer
component: DataTable
url: https://primer.style/components/data-table
last_verified: 2026-03-28
confidence: high
---

# DataTable

## Approach
GitHub Primer's DataTable component is a relatively newer addition, designed for GitHub's admin and settings interfaces where tabular data (repositories, teams, members, permissions) is displayed. The component provides sorting, pagination, and row action patterns aligned with GitHub's data display conventions. It's built with semantic HTML table elements and follows Primer's accessibility standards. The component is more focused than Lightning's data table — closer to a presentational data table with sorting than a full data grid.

## Key Decisions
1. **Column definition pattern** (HIGH) — Columns are defined via an array/object configuration with field, header, sortBy, renderCell — centralizing column config rather than JSX-based column definition.
2. **Built-in pagination integration** (HIGH) — DataTable composes with Primer's Pagination component, providing a standard pattern for paginated data views common in GitHub admin interfaces.
3. **Row actions** (MEDIUM) — Row action column can be configured for per-row action menus (edit, delete, transfer), consistent with GitHub's repository and team management interfaces.

## Notable Props
- `data`: Array of row data objects
- `columns`: Column definition array
- `initialSortColumn` / `initialSortDirection`: Default sort state
- `onSort`: Sort callback for server-side sorting

## A11y Highlights
- **Keyboard**: Tab through interactive elements; column headers for sort are buttons with keyboard activation
- **Screen reader**: aria-sort on sorted column headers; th scope attributes; caption support
- **ARIA**: aria-sort; proper thead/tbody structure; sort buttons have descriptive labels

## Strengths & Gaps
- **Best at**: GitHub admin data display patterns; pagination integration; sort configuration
- **Missing**: No row selection/bulk actions; no inline editing; simpler than Lightning for complex data grid needs
