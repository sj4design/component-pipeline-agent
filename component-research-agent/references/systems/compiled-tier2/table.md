---
component: Table
tier: 2
last_verified: 2026-03-28
---

# Table — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Table | Semantic table; striped/bordered variants; scrollable wrapper; no built-in sort | high |
| Salesforce Lightning | Data Table | Full-featured grid; sort, selection, inline edit, row actions, virtual scroll | high |
| GitHub Primer | DataTable | Sort; row actions; loading skeleton; pagination integration; selection | high |
| shadcn/ui | Table / DataTable (recipe) | Semantic table primitives + TanStack Table recipe for full features | high |
| Playbook | Table | Data display tables; dual React/Rails | medium |
| REI Cedar | CdrTable | Vue table; responsive stacked layout for mobile; WCAG 2.1 AA | medium |
| Wise Design | Table | Transaction history display | low |
| Dell Design System | Table | Enterprise data grid | low |

## Key Decision Patterns

**Semantic vs. data grid:** Paste and Cedar use semantic HTML tables (role="table" implied). Lightning and Primer DataTable use role="grid" for keyboard navigation within cells. shadcn/ui's recipe bridges both via TanStack Table.

**Feature scope:** Paste's Table is display-only (no built-in sort/filter). Lightning's DataTable includes everything — sort, inline edit, row selection, row actions, column resize. Primer DataTable has sort + selection but no inline edit. shadcn/ui's DataTable recipe adds whatever TanStack Table supports (sort, filter, pagination, column visibility).

**Mobile responsiveness:** Cedar's CdrTable uniquely provides a stacked/responsive layout for mobile. Other systems rely on horizontal scroll for tables on small screens.

**Selection pattern:** Lightning and Primer use checkbox column for row selection. shadcn/ui's recipe provides checkbox selection. Selection triggers bulk action toolbars.

## A11y Consensus
- Semantic tables: `<table>`, `<thead>`, `<th scope="col">`, `<tbody>`, `<td>`
- Sortable columns: `<th>` with aria-sort="ascending"|"descending"|"none"
- Row selection: checkbox with aria-label including row identifier
- Grid pattern (for interactive tables): role="grid", role="row", role="gridcell"; arrow key navigation
- Caption/aria-label on table for context

## Recommended Use
Use Paste Table for simple display tables. Use Primer DataTable or Lightning DataTable for sortable/selectable enterprise data. Use shadcn/ui DataTable recipe (TanStack Table) for fully custom feature-rich tables. Cedar for mobile-responsive data tables.
