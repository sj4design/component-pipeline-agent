---
system: shadcn/ui
component: Table
url: https://ui.shadcn.com/docs/components/table
last_verified: 2026-03-28
confidence: high
---

# Table

## Approach
shadcn/ui's Table is a set of styled semantic HTML table sub-components (Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption). Like most shadcn/ui components, it's intentionally minimal — providing correct HTML structure with Tailwind styling. For advanced data table needs (sorting, filtering, pagination), the documentation explicitly points to TanStack Table integration examples, embracing the composability philosophy.

## Key Decisions
1. **Thin HTML wrapper philosophy** (HIGH) — Table components are thin Tailwind-styled wrappers around native table elements, giving developers full ownership without abstracting away the table structure.
2. **TanStack Table composition** (HIGH) — shadcn/ui provides a "Data Table" recipe that combines the Table components with TanStack Table (react-table) for sorting, filtering, and pagination — best-in-class approach for complex data grids.
3. **Column definition with TanStack** (MEDIUM) — When using the Data Table recipe, columns are defined using TanStack's ColumnDef type system, providing type-safe column configuration with React cell renderers.

## Notable Props
- No complex props on base components — they are direct element wrappers
- `className`: For custom styling extension via Tailwind
- TanStack Table handles: `sorting`, `filtering`, `pagination`, `row selection` when using recipe

## A11y Highlights
- **Keyboard**: Native table navigation; sort controls are buttons within headers
- **Screen reader**: Native table semantics; caption component for table description
- **ARIA**: Native HTML table ARIA; sort state and row selection managed by TanStack Table integration

## Strengths & Gaps
- **Best at**: Maximum flexibility; TanStack Table integration for advanced features; full code ownership; type-safe with TanStack ColumnDef
- **Missing**: No built-in sort, filter, pagination — requires TanStack Table recipe; more assembly than other systems
