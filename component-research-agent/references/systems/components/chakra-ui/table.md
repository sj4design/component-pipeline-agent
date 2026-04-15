---
system: Chakra UI
component: Table
url: https://chakra-ui.com/docs/components/table
last_verified: 2026-03-28
confidence: high
---

# Table

## Approach
Chakra UI's Table is a presentational, semantic HTML table with Chakra's token system applied. It follows Chakra's composable approach: Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, and TableContainer components map directly to HTML table elements with Chakra styling. The component supports `variant` (simple, striped, unstyled) and `size` props, and the TableContainer component handles horizontal overflow scrolling for tables wider than their container — a critical need that many systems handle poorly.

## Key Decisions
1. **TableContainer for overflow** (HIGH) — A dedicated TableContainer wrapper handles horizontal scroll for wide tables. This solves the common responsive table problem where the table overflows its parent and breaks the page layout. Chakra makes this a first-class pattern rather than leaving it to teams.
2. **striped variant** (MEDIUM) — `variant="striped"` applies alternating row background colors. Chakra's striped style uses the `colorScheme` token, so stripe colors adapt to the active theme. This is a data readability enhancement for dense tables.
3. **Presentational-only scope** (HIGH) — Like Radix, Chakra Table is a display component only. No sorting, filtering, pagination, or selection. Chakra recommends pairing with TanStack Table for data management.

## Notable Props
- `variant`: `"simple" | "striped" | "unstyled"`
- `size`: `"sm" | "md" | "lg"` — controls cell padding
- `colorScheme`: affects striped row color
- `TableContainer`: wrapper for overflow scroll handling

## A11y Highlights
- **Keyboard**: Standard table keyboard navigation; no interactive cell behaviors
- **Screen reader**: Semantic HTML elements; `<th scope="col">` for column headers; `<caption>` via TableCaption
- **ARIA**: Minimal ARIA needed due to semantic HTML; `scope` attributes ensure correct header/cell association

## Strengths & Gaps
- **Best at**: TableContainer overflow solution; striped variant with colorScheme; semantic HTML structure
- **Missing**: No sort indicators or sortable columns; no row selection; no sticky header support built-in
