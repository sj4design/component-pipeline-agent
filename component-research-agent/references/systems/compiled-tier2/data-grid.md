---
component: Data Grid
tier: 2
last_verified: 2026-03-31
---

# Data Grid — Tier 2 Cross-System Digest

## System Approaches

| System | Component Name | Approach | Confidence |
|--------|---------------|----------|------------|
| Twilio Paste | Data Grid | role="grid" component with column sort, row selection, pagination, and keyboard cell navigation; separate from presentational Table; supports composable headers with custom content | high |
| Salesforce Lightning | Datatable / Tree Grid | Full-featured grid with sort, inline edit, row selection, row actions menu, column resize, infinite scroll, and tree data; `lightning-datatable` is the primary enterprise grid | high |
| GitHub Primer | DataTable (alpha) | Built on top of Table primitives; sort, row selection, row actions, pagination, loading skeleton; designed for repository/issue/PR lists; no inline editing or virtualization | high |
| shadcn/ui | DataTable (recipe) | Not a component — a recipe/guide combining Radix Table primitives with TanStack Table v8 for sort, filter, pagination, column visibility, row selection; fully headless, consumer assembles features | high |
| Playbook (eBay) | Table / Advanced Table | Basic Table for display; Advanced Table adds sort, toggle columns, collapsible rows, loading state; dual React/Rails kits; limited data grid features compared to enterprise systems | medium |
| Cedar (REI) | CdrTable | Vue table focused on responsive stacked layout for mobile; no built-in sort, filter, or selection; display-only with mobile-first responsive transformation | medium |
| Wise Design | Table | Transaction and transfer history display tables; minimal interactive features; display-focused for financial data | low |
| Dell DS | DataGrid | Enterprise data grid with sort, filter, pagination, row selection, column resize, and inline editing; documentation limited in public sources | low |

## Key Decision Patterns

**Full grid vs. display table:** The sharpest architectural divide in T2 is between systems that provide a true data grid (Lightning, Primer, Dell) and those offering display tables with optional features bolted on (Paste, Playbook, Cedar, Wise). Lightning's `datatable` is the most complete — sort, inline edit, row actions, column resize, infinite scroll, and tree data are all built in. Primer's DataTable is intentionally scoped to GitHub's needs: sort, selection, and row actions, but no inline editing or virtualization. Paste's Data Grid bridges the middle — it has role="grid" keyboard navigation and selection but delegates complex features like filtering to external patterns.

**TanStack Table as the grid engine:** shadcn/ui's DataTable recipe explicitly uses TanStack Table v8 as the headless data layer, with consumers assembling sort, filter, pagination, column visibility, and row selection from TanStack's APIs. This architecture means the "design system" provides styling and composition patterns while TanStack owns the data logic. This is the same pattern Fluent 2 (T3) uses natively, and it increasingly represents the industry direction — build data grid behavior once in a headless library, skin it per design system.

**Inline editing:** Only Lightning and Dell provide built-in inline cell editing. Lightning's approach is type-aware — text, number, date, picklist, and URL column types each get appropriate edit controls. All other T2 systems treat the grid as a read-interactive surface (sort/select/navigate) and delegate editing to detail views or modals.

**Mobile responsiveness:** Cedar is the only T2 system with a dedicated responsive table transformation — columns stack vertically on mobile with labels preserved. All other systems rely on horizontal scrolling or truncation. This is a significant gap for data grids, where mobile use cases are increasingly common but table layouts fundamentally don't work on narrow screens.

## A11y Consensus
- Data grids with interactive cells use `role="grid"` with arrow-key cell navigation; display-only tables use `role="table"` or native `<table>` semantics
- Sortable column headers must be `<button>` elements inside `<th>` with `aria-sort="ascending"` | `"descending"` | `"none"`
- Row selection checkboxes require aria-label with row identifier (e.g., "Select order #1234")
- Inline editing must manage focus: Enter to start editing, Escape to cancel, Tab to move to next editable cell
- Pagination must announce page changes via aria-live and provide clear "Page X of Y" context
- Column resize must be keyboard-accessible (Lightning uses arrow keys when resize handle is focused)

## Recommended Use
Use Lightning Datatable for full-featured enterprise grids with inline editing and tree data. Use Primer DataTable for sortable/selectable resource lists without inline editing. Use shadcn/ui DataTable recipe (TanStack Table) for maximum customization with headless data management. Use Paste Data Grid for accessible keyboard-navigable grids in communication platforms. Cedar for mobile-responsive data display without interactive grid features.
