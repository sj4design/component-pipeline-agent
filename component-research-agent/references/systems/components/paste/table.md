---
system: Twilio Paste
component: Table
url: https://paste.twilio.design/components/table
last_verified: 2026-03-28
confidence: high
---

# Table

## Approach
Twilio Paste's Table is a semantic HTML table wrapper with design token styling, emphasizing correct table semantics over custom grid implementations. Paste provides the Table, THead, TBody, TFoot, Tr, Th, and Td sub-components to enforce proper HTML table structure. The component is used in the Twilio console for displaying API keys, phone numbers, logs, and service configurations. Paste deliberately keeps the table relatively simple, providing structure and styling without trying to build a full data grid.

## Key Decisions
1. **Semantic HTML structure enforced** (HIGH) — Sub-components map directly to HTML table elements (thead, tbody, tfoot, tr, th, td), enforcing correct semantics that screen readers rely on to communicate table structure.
2. **Stripe and scroll wrappers** (MEDIUM) — TBody supports striped rows via prop; a separate ScrollableTBody is available for fixed-height scrollable table bodies while keeping header visible.
3. **Sortable column headers** (MEDIUM) — Th accepts sort direction props (ascending/descending/none) and renders a sort indicator, with aria-sort attribute set appropriately for screen readers.

## Notable Props
- `striped`: Boolean on TBody for alternating row colors
- `sortDirection`: "ascending" | "descending" | "none" on Th for sortable columns
- `textAlign`: Column alignment on Th and Td
- `variant`: "default" | "borderless" on Table

## A11y Highlights
- **Keyboard**: Standard table navigation (Tab through interactive elements within cells)
- **Screen reader**: Proper thead/tbody semantics enable row/column headers; caption supported for table summary
- **ARIA**: aria-sort on Th for sorted columns; scope attribute on header cells; caption element support

## Strengths & Gaps
- **Best at**: Semantic HTML table correctness; sort state accessibility; simple data display
- **Missing**: No virtual scrolling for large datasets; no row selection pattern; no column resizing
